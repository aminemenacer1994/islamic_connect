export const VOICE_COMMAND_DATA = {
    voiceCommandsPreferenceBaseKey: "surat_voice_commands_enabled",
    voiceCommandsEnabled: false,
    voiceCommandListening: false,
    voiceCommandError: "",
    voiceCommandLastTranscript: "",
    voiceCommandRecognitionInstance: null,
    voiceCommandRestartTimer: null,
    voiceCommandLocale: "en-US",
};

export const voiceCommandMethods = {
    normalizeVoiceCommandTranscript(value = "") {
        return String(value || "")
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    },
    parseSpokenNumber(value = "") {
        const normalized = this.normalizeVoiceCommandTranscript(value);
        if (!normalized) return null;
        const digitMatch = normalized.match(/\b(\d{1,3})\b/);
        if (digitMatch?.[1]) {
            const parsedDigits = Number(digitMatch[1]);
            return Number.isFinite(parsedDigits) ? parsedDigits : null;
        }

        const ones = {
            zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
            eleven: 11,
            twelve: 12,
            thirteen: 13,
            fourteen: 14,
            fifteen: 15,
            sixteen: 16,
            seventeen: 17,
            eighteen: 18,
            nineteen: 19,
        };
        const tens = {
            twenty: 20,
            thirty: 30,
            forty: 40,
            fifty: 50,
            sixty: 60,
            seventy: 70,
            eighty: 80,
            ninety: 90,
        };

        const tokens = normalized
            .replace(/-/g, " ")
            .split(/\s+/)
            .filter(Boolean);
        if (!tokens.length) return null;

        let total = 0;
        let current = 0;
        let found = false;
        for (const token of tokens) {
            if (token === "and") continue;
            if (Object.prototype.hasOwnProperty.call(ones, token)) {
                current += ones[token];
                found = true;
                continue;
            }
            if (Object.prototype.hasOwnProperty.call(tens, token)) {
                current += tens[token];
                found = true;
                continue;
            }
            if (token === "hundred") {
                current = (current || 1) * 100;
                found = true;
                continue;
            }
            if (token === "thousand") {
                total += (current || 1) * 1000;
                current = 0;
                found = true;
                continue;
            }
            if (found) break;
        }

        if (!found) return null;
        const parsed = total + current;
        return Number.isFinite(parsed) ? parsed : null;
    },
    extractVoiceCommandAyahNumber(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return null;

        const digitMatch = normalized.match(
            /\b(?:verse|ayah|aya)\s*(?:number\s*)?(\d{1,3})\b/
        );
        if (digitMatch?.[1]) {
            const parsedDigits = Number(digitMatch[1]);
            return Number.isFinite(parsedDigits) ? parsedDigits : null;
        }

        const phraseMatch = normalized.match(
            /\b(?:verse|ayah|aya)\s*(?:number\s*)?([a-z0-9\s-]+)/i
        );
        if (!phraseMatch?.[1]) return null;
        const candidate = String(phraseMatch[1] || "")
            .split(
                /\b(?:play|pause|stop|next|previous|prev|back|surah|chapter|resume|start|please|thanks)\b/i
            )[0]
            .trim();
        return this.parseSpokenNumber(candidate);
    },
    getVoiceCommandCurrentIndex() {
        const total = Array.isArray(this.filteredAyahs)
            ? this.filteredAyahs.length
            : 0;
        if (!total) return -1;
        const playingIndex = Number(this.currentlyPlayingIndex);
        if (
            this.isAnyAudioPlaying &&
            Number.isInteger(playingIndex) &&
            playingIndex >= 0 &&
            playingIndex < total
        ) {
            return playingIndex;
        }
        const selectedIndex = Number(this.selectedCardIndex);
        if (
            Number.isInteger(selectedIndex) &&
            selectedIndex >= 0 &&
            selectedIndex < total
        ) {
            return selectedIndex;
        }
        return 0;
    },
    getAyahNumberByIndex(index) {
        const safeIndex = Number(index);
        const ayah = this.filteredAyahs?.[safeIndex];
        return Number(ayah?.numberInSurah || ayah?.number || safeIndex + 1);
    },
    playVoiceCommandRelativeAyah(step = 1) {
        const total = Array.isArray(this.filteredAyahs)
            ? this.filteredAyahs.length
            : 0;
        if (!total) return false;
        const currentIndex = this.getVoiceCommandCurrentIndex();
        if (currentIndex < 0) return false;
        const direction = step >= 0 ? 1 : -1;
        const targetIndex = Math.max(
            0,
            Math.min(total - 1, currentIndex + direction)
        );
        if (targetIndex === currentIndex) {
            this.showToast(
                direction > 0
                    ? "You are already on the last ayah."
                    : "You are already on the first ayah.",
                2200
            );
            return false;
        }
        if (this.isAnyAudioPlaying && currentIndex >= 0) {
            this.stopAudio(currentIndex);
        }
        this.selectCard(targetIndex);
        this.scrollToAyahIndex(targetIndex, {
            settle: true,
            force: true,
            behavior: "smooth",
        });
        this.playAudio(targetIndex);
        const ayahNumber = this.getAyahNumberByIndex(targetIndex);
        this.showToast(`Voice command: ayah ${ayahNumber}.`, 2200);
        this.announce(`Playing ayah ${ayahNumber}.`);
        return true;
    },
    async playVoiceCommandAyahNumber(ayahNumber, options = {}) {
        const { autoplay = true } = options;
        const targetAyah = Number(ayahNumber);
        const totalAyahs = Number(
            this.totalAyahs ||
                (Array.isArray(this.filteredAyahs)
                    ? this.filteredAyahs.length
                    : 0)
        );
        if (!targetAyah || !totalAyahs) return false;
        if (targetAyah < 1 || targetAyah > totalAyahs) {
            this.showToast(
                `Ayah ${targetAyah} is not in this surah.`,
                2400
            );
            return false;
        }

        const hasSearchFilter = !!String(
            this.searchQuery || this.debouncedQuery || ""
        ).trim();
        if (hasSearchFilter) {
            this.clearMainAyahSearchFilter();
            await this.$nextTick();
        }

        let targetIndex = this.resolveAyahIndexByNumber(targetAyah);
        if (targetIndex < 0) {
            targetIndex = Math.max(0, targetAyah - 1);
        }
        this.selectCard(targetIndex);
        this.navigateToAyahNumber(targetAyah, {
            clearMainFilter: false,
            precise: true,
        });
        if (autoplay) {
            this.playAudio(targetIndex);
            this.showToast(`Voice command: play ayah ${targetAyah}.`, 2400);
            this.announce(`Playing ayah ${targetAyah}.`);
        } else {
            this.showToast(`Voice command: ayah ${targetAyah}.`, 2200);
            this.announce(`Opened ayah ${targetAyah}.`);
        }
        return true;
    },
    async playVoiceCommandRelativeSurah(step = 1) {
        const currentSurah = Number(
            this.surahDetails?.surahNumber || this.selectedSurah || 1
        );
        const direction = step >= 0 ? 1 : -1;
        const targetSurah = Math.max(
            1,
            Math.min(114, currentSurah + direction)
        );
        if (targetSurah === currentSurah) {
            this.showToast(
                direction > 0
                    ? "You are already on the last surah."
                    : "You are already on the first surah.",
                2200
            );
            return false;
        }
        await this.selectSurah(String(targetSurah), { skipScroll: true });
        this.selectCard(0);
        this.playAudio(0);
        this.showToast(`Voice command: Surah ${targetSurah}.`, 2400);
        this.announce(`Opened Surah ${targetSurah}.`);
        return true;
    },
    handleVoiceCommandPlay() {
        const targetIndex = this.getVoiceCommandCurrentIndex();
        if (targetIndex < 0) return false;
        const ayahNumber = this.getAyahNumberByIndex(targetIndex);
        this.selectCard(targetIndex);
        this.playAudio(targetIndex);
        this.showToast(`Voice command: play ayah ${ayahNumber}.`, 2200);
        this.announce(`Playing ayah ${ayahNumber}.`);
        return true;
    },
    handleVoiceCommandPause() {
        const targetIndex = this.getVoiceCommandCurrentIndex();
        if (targetIndex < 0 || !this.isAnyAudioPlaying) return false;
        this.pauseAudio(targetIndex);
        this.showToast("Voice command: pause.", 1800);
        this.announce("Audio paused.");
        return true;
    },
    handleVoiceCommandStop() {
        const targetIndex = this.getVoiceCommandCurrentIndex();
        if (targetIndex < 0) return false;
        this.stopAudio(targetIndex);
        this.showToast("Voice command: stop.", 1800);
        this.announce("Audio stopped.");
        return true;
    },
    async executeVoiceCommandTranscript(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return false;
        this.voiceCommandLastTranscript = normalized;

        const hasNext = /\b(next|forward|skip)\b/.test(normalized);
        const hasPrevious = /\b(previous|prev|back)\b/.test(normalized);
        const hasSurahWord = /\b(surah|surahs|chapter)\b/.test(normalized);
        const hasStop = /\bstop\b/.test(normalized);
        const hasPause = /\bpause\b/.test(normalized);
        const hasPlay = /\b(play|resume|start)\b/.test(normalized);
        const ayahNumber = this.extractVoiceCommandAyahNumber(normalized);

        if (hasNext && hasSurahWord) {
            return this.playVoiceCommandRelativeSurah(1);
        }
        if (hasPrevious && hasSurahWord) {
            return this.playVoiceCommandRelativeSurah(-1);
        }
        if (Number.isFinite(Number(ayahNumber)) && Number(ayahNumber) > 0) {
            return this.playVoiceCommandAyahNumber(ayahNumber, {
                autoplay: true,
            });
        }
        if (hasNext) {
            return this.playVoiceCommandRelativeAyah(1);
        }
        if (hasPrevious) {
            return this.playVoiceCommandRelativeAyah(-1);
        }
        if (hasStop) {
            return this.handleVoiceCommandStop();
        }
        if (hasPause) {
            return this.handleVoiceCommandPause();
        }
        if (hasPlay) {
            return this.handleVoiceCommandPlay();
        }
        this.showToast(
            `Voice command not recognized: "${normalized}". Try "play verse 5".`,
            2600
        );
        return false;
    },
    initializeVoiceCommandRecognition() {
        if (typeof window === "undefined") return false;
        if (this.voiceCommandRecognitionInstance) return true;
        const SpeechRecognition = this.getSpeechRecognitionConstructor();
        if (!SpeechRecognition) {
            this.speechRecognitionSupported = false;
            this.voiceCommandError = this.getSpeechRecognitionErrorMessage(
                "not-supported"
            );
            return false;
        }
        let recognition = null;
        try {
            recognition = new SpeechRecognition();
        } catch (_) {
            this.voiceCommandError = this.getSpeechRecognitionErrorMessage(
                "not-supported"
            );
            return false;
        }

        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.continuous = true;
        recognition.lang =
            (typeof navigator !== "undefined" &&
                navigator.language) ||
            this.voiceCommandLocale ||
            "en-US";

        recognition.onstart = () => {
            this.voiceCommandListening = true;
            this.voiceCommandError = "";
        };

        recognition.onresult = (event) => {
            if (!this.voiceCommandsEnabled || !event?.results) return;
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const text = result?.[0]?.transcript || "";
                if (!text || !result?.isFinal) continue;
                finalTranscript += `${text} `;
            }
            const transcript = finalTranscript.trim();
            if (!transcript) return;
            void this.executeVoiceCommandTranscript(transcript);
        };

        recognition.onerror = (event) => {
            const code = String(event?.error || "").toLowerCase();
            this.voiceCommandListening = false;
            if (code === "aborted") return;
            this.voiceCommandError = this.getSpeechRecognitionErrorMessage(code);
            if (code === "not-allowed" || code === "service-not-allowed") {
                this.disableVoiceCommands({ announce: false });
                return;
            }
            if (this.voiceCommandsEnabled) {
                clearTimeout(this.voiceCommandRestartTimer);
                this.voiceCommandRestartTimer = setTimeout(() => {
                    this.startVoiceCommandListening({ silentError: true });
                }, 650);
            }
        };

        recognition.onend = () => {
            this.voiceCommandListening = false;
            if (!this.voiceCommandsEnabled || !this.isComponentAlive) return;
            if (
                typeof document !== "undefined" &&
                document.visibilityState !== "visible"
            ) {
                return;
            }
            clearTimeout(this.voiceCommandRestartTimer);
            this.voiceCommandRestartTimer = setTimeout(() => {
                this.startVoiceCommandListening({ silentError: true });
            }, 220);
        };

        this.voiceCommandRecognitionInstance = recognition;
        this.voiceCommandLocale = recognition.lang || "en-US";
        this.speechRecognitionSupported = true;
        return true;
    },
    startVoiceCommandListening(options = {}) {
        const { silentError = false } = options;
        if (!this.speechRecognitionSupported) {
            this.detectSpeechRecognitionSupport();
        }
        if (!this.speechRecognitionSupported) {
            this.voiceCommandError = this.getSpeechRecognitionErrorMessage(
                "not-supported"
            );
            if (!silentError) this.showToast(this.voiceCommandError, 2800);
            return false;
        }
        if (!this.isSpeechRecognitionSecureContext()) {
            this.voiceCommandError = this.getSpeechRecognitionErrorMessage(
                "insecure-context"
            );
            if (!silentError) this.showToast(this.voiceCommandError, 2800);
            return false;
        }
        if (!this.voiceCommandRecognitionInstance) {
            const initialized = this.initializeVoiceCommandRecognition();
            if (!initialized) {
                if (!silentError && this.voiceCommandError) {
                    this.showToast(this.voiceCommandError, 2800);
                }
                return false;
            }
        }
        if (!this.voiceCommandRecognitionInstance) return false;
        if (this.speechRecognitionListening) {
            this.stopVoiceSearch();
        }
        if (this.voiceCommandListening) return true;
        this.voiceCommandError = "";
        try {
            this.voiceCommandRecognitionInstance.lang =
                (typeof navigator !== "undefined" &&
                    navigator.language) ||
                this.voiceCommandLocale ||
                "en-US";
            this.voiceCommandLocale =
                this.voiceCommandRecognitionInstance.lang;
            this.voiceCommandRecognitionInstance.start();
            this.voiceCommandListening = true;
            return true;
        } catch (error) {
            const name = String(error?.name || "").toLowerCase();
            if (name === "invalidstateerror") {
                this.voiceCommandListening = true;
                return true;
            }
            if (name === "notallowederror" || name === "securityerror") {
                this.voiceCommandError = this.getSpeechRecognitionErrorMessage(
                    "not-allowed"
                );
            } else {
                this.voiceCommandError = this.getSpeechRecognitionErrorMessage();
            }
            if (!silentError) this.showToast(this.voiceCommandError, 2800);
            return false;
        }
    },
    stopVoiceCommandListening(options = {}) {
        const { keepEnabled = false } = options;
        if (!keepEnabled) {
            this.voiceCommandsEnabled = false;
        }
        clearTimeout(this.voiceCommandRestartTimer);
        this.voiceCommandRestartTimer = null;
        if (!this.voiceCommandRecognitionInstance) {
            this.voiceCommandListening = false;
            return;
        }
        try {
            this.voiceCommandRecognitionInstance.stop();
        } catch (_) {
            // ignore stop race conditions
        }
        this.voiceCommandListening = false;
    },
    enableVoiceCommands(options = {}) {
        const { announce = true } = options;
        const started = this.startVoiceCommandListening({
            silentError: !announce,
        });
        if (!started) {
            this.voiceCommandsEnabled = false;
            this.writeScopedBooleanPreference(
                this.voiceCommandsPreferenceBaseKey,
                false
            );
            return false;
        }
        this.voiceCommandsEnabled = true;
        this.writeScopedBooleanPreference(
            this.voiceCommandsPreferenceBaseKey,
            true
        );
        if (announce) {
            this.showToast(
                "Voice commands: On. Try saying: play verse 5.",
                3600
            );
            this.announce("Voice commands enabled.");
        }
        return true;
    },
    disableVoiceCommands(options = {}) {
        const { announce = true, persist = true } = options;
        this.stopVoiceCommandListening({ keepEnabled: false });
        if (persist) {
            this.writeScopedBooleanPreference(
                this.voiceCommandsPreferenceBaseKey,
                false
            );
        }
        if (announce) {
            this.showToast("Voice commands: Off.", 2200);
            this.announce("Voice commands disabled.");
        }
    },
    toggleVoiceCommands() {
        if (this.voiceCommandsEnabled) {
            this.disableVoiceCommands();
            return;
        }
        this.enableVoiceCommands();
    },
    teardownVoiceCommandRecognition() {
        clearTimeout(this.voiceCommandRestartTimer);
        this.voiceCommandRestartTimer = null;
        if (!this.voiceCommandRecognitionInstance) return;
        try {
            this.voiceCommandRecognitionInstance.onstart = null;
            this.voiceCommandRecognitionInstance.onresult = null;
            this.voiceCommandRecognitionInstance.onerror = null;
            this.voiceCommandRecognitionInstance.onend = null;
            this.voiceCommandRecognitionInstance.stop();
        } catch (_) {
            // ignore teardown failures
        }
        this.voiceCommandRecognitionInstance = null;
        this.voiceCommandListening = false;
    },
    async initializeVoiceCommandPreference() {
        if (
            this.bookmarkAuthenticated &&
            !this.bookmarkStorageUserId
        ) {
            try {
                await this.fetchBookmarkStorageUserId();
            } catch (_) {
                // ignore preference scope lookup errors
            }
        }

        const enabled = this.readScopedBooleanPreference(
            this.voiceCommandsPreferenceBaseKey,
            false
        );
        this.voiceCommandsEnabled = !!enabled;
        if (!this.voiceCommandsEnabled) {
            this.voiceCommandError = "";
            return;
        }
        const started = this.startVoiceCommandListening({
            silentError: true,
        });
        if (!started) {
            this.voiceCommandsEnabled = false;
            this.writeScopedBooleanPreference(
                this.voiceCommandsPreferenceBaseKey,
                false
            );
        }
    },
};
