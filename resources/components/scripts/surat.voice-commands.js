export const VOICE_COMMAND_DATA = {
    voiceCommandsPreferenceBaseKey: "surat_voice_commands_enabled",
    voiceCommandsEnabled: false,
    voiceCommandListening: false,
    voiceCommandError: "",
    voiceCommandLastTranscript: "",
    voiceCommandPendingTranscript: "",
    voiceCommandProcessTimer: null,
    voiceCommandCommitDelayMs: 1400,
    voiceCommandRecognitionInstance: null,
    voiceCommandRestartTimer: null,
    voiceCommandLocale: "en-US",
};

export const VOICE_COMMAND_GUIDE = {
    intro:
        "Speak naturally. The parser listens for keywords, so extra words before or after still work.",
    tips: [
        "Turn voice commands on from the microphone button, then wait for the mic indicator.",
        "Say the full command, then pause briefly. Commands are processed after a short silence.",
        "Use clear number phrases like 2, 21, twenty one, or 21st.",
    ],
    groups: [
        {
            id: "playback",
            title: "Playback controls",
            iconClass: "bi-play-circle",
            summary: "Control the current ayah audio without touching playback buttons.",
            commands: [
                {
                    id: "play",
                    label: "Play or resume",
                    keywords: ["play", "resume", "start", "continue"],
                    example: "please continue the recitation",
                },
                {
                    id: "pause",
                    label: "Pause playback",
                    keywords: ["pause", "hold"],
                    example: "pause for a moment",
                },
                {
                    id: "stop",
                    label: "Stop playback",
                    keywords: ["stop", "halt"],
                    example: "stop now",
                },
            ],
        },
        {
            id: "ayah-navigation",
            title: "Ayah navigation",
            iconClass: "bi-signpost-2",
            summary:
                "Move around ayahs inside the current surah or jump directly to an ayah number.",
            commands: [
                {
                    id: "next-ayah",
                    label: "Next ayah",
                    keywords: ["next", "forward", "skip", "next ayah", "next verse"],
                    example: "go to the next ayah",
                },
                {
                    id: "previous-ayah",
                    label: "Previous ayah",
                    keywords: [
                        "previous",
                        "prev",
                        "back",
                        "previous ayah",
                        "previous verse",
                    ],
                    example: "move me to the previous verse",
                },
                {
                    id: "ayah-number",
                    label: "Open ayah by number",
                    keywords: ["ayah X", "verse X", "ayah number X"],
                    example: "play verse twenty one",
                },
            ],
        },
        {
            id: "surah-navigation",
            title: "Surah navigation",
            iconClass: "bi-compass",
            summary:
                "Switch surahs relatively or jump directly to an exact surah and ayah.",
            commands: [
                {
                    id: "next-surah",
                    label: "Next surah",
                    keywords: ["next surah", "next chapter", "surah next"],
                    example: "take me to the next surah",
                },
                {
                    id: "previous-surah",
                    label: "Previous surah",
                    keywords: [
                        "previous surah",
                        "previous chapter",
                        "surah previous",
                    ],
                    example: "go to previous chapter",
                },
                {
                    id: "surah-number",
                    label: "Open surah by number",
                    keywords: ["surah X", "chapter X", "surah number X"],
                    example: "open surah thirty six",
                },
                {
                    id: "surah-ayah",
                    label: "Open exact location",
                    keywords: ["surah X ayah Y", "chapter X verse Y"],
                    example: "take me to surah 2 ayah 255",
                },
            ],
        },
    ],
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
        const digitMatch = normalized.match(/\b(\d{1,3})(?:st|nd|rd|th)?\b/);
        if (digitMatch?.[1]) {
            const parsedDigits = Number(digitMatch[1]);
            return Number.isFinite(parsedDigits) ? parsedDigits : null;
        }

        const ones = {
            zero: 0,
            one: 1,
            first: 1,
            two: 2,
            second: 2,
            three: 3,
            third: 3,
            four: 4,
            fourth: 4,
            five: 5,
            fifth: 5,
            six: 6,
            sixth: 6,
            seven: 7,
            seventh: 7,
            eight: 8,
            eighth: 8,
            nine: 9,
            ninth: 9,
            ten: 10,
            tenth: 10,
            eleven: 11,
            eleventh: 11,
            twelve: 12,
            twelfth: 12,
            thirteen: 13,
            thirteenth: 13,
            fourteen: 14,
            fourteenth: 14,
            fifteen: 15,
            fifteenth: 15,
            sixteen: 16,
            sixteenth: 16,
            seventeen: 17,
            seventeenth: 17,
            eighteen: 18,
            eighteenth: 18,
            nineteen: 19,
            nineteenth: 19,
        };
        const tens = {
            twenty: 20,
            twentieth: 20,
            thirty: 30,
            thirtieth: 30,
            forty: 40,
            fortieth: 40,
            fifty: 50,
            fiftieth: 50,
            sixty: 60,
            sixtieth: 60,
            seventy: 70,
            seventieth: 70,
            eighty: 80,
            eightieth: 80,
            ninety: 90,
            ninetieth: 90,
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
            /\b(?:verse|verses|ayah|ayahs|aya|ayas)\s*(?:number\s*)?(\d{1,3})(?:st|nd|rd|th)?\b/
        );
        if (digitMatch?.[1]) {
            const parsedDigits = Number(digitMatch[1]);
            return Number.isFinite(parsedDigits) ? parsedDigits : null;
        }

        const phraseMatch = normalized.match(
            /\b(?:verse|verses|ayah|ayahs|aya|ayas)\s*(?:number\s*)?([a-z0-9\s-]+)/i
        );
        if (!phraseMatch?.[1]) return null;
        const candidate = String(phraseMatch[1] || "")
            .split(
                /\b(?:play|pause|stop|next|forward|skip|previous|prev|back|surah|surahs|sura|suras|chapter|chapters|resume|start|continue|please|thanks|go|move|take|jump|open|navigate)\b/i
            )[0]
            .trim();
        return this.parseSpokenNumber(candidate);
    },
    extractVoiceCommandSurahNumber(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return null;

        const digitMatch = normalized.match(
            /\b(?:surah|surahs|sura|suras|chapter|chapters)\s*(?:number\s*)?(\d{1,3})(?:st|nd|rd|th)?\b/
        );
        if (digitMatch?.[1]) {
            const parsedDigits = Number(digitMatch[1]);
            return Number.isFinite(parsedDigits) ? parsedDigits : null;
        }

        const phraseMatch = normalized.match(
            /\b(?:surah|surahs|sura|suras|chapter|chapters)\s*(?:number\s*)?([a-z0-9\s-]+)/i
        );
        if (!phraseMatch?.[1]) return null;
        const candidate = String(phraseMatch[1] || "")
            .split(
                /\b(?:ayah|ayahs|aya|ayas|verse|verses|play|pause|stop|next|forward|skip|previous|prev|back|resume|start|continue|please|thanks|go|move|take|jump|open|navigate)\b/i
            )[0]
            .trim();
        return this.parseSpokenNumber(candidate);
    },
    hasVoiceCommandPattern(transcript = "", patterns = []) {
        if (!transcript || !Array.isArray(patterns) || !patterns.length) {
            return false;
        }
        return patterns.some((pattern) => pattern.test(transcript));
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
    async goToVoiceCommandSurah(surahNumber, options = {}) {
        const { ayahNumber = 1, autoplay = true } = options;
        const targetSurah = Number(surahNumber);
        const targetAyah = Number(ayahNumber || 1);
        if (!targetSurah || targetSurah < 1 || targetSurah > 114) {
            this.showToast(`Surah ${surahNumber} is invalid. Use 1 to 114.`, 2600);
            return false;
        }
        if (!targetAyah || targetAyah < 1) {
            this.showToast(`Ayah ${ayahNumber} is invalid.`, 2200);
            return false;
        }

        await this.selectSurah(String(targetSurah), { skipScroll: true });

        const totalAyahs = Number(
            this.totalAyahs ||
                (Array.isArray(this.filteredAyahs)
                    ? this.filteredAyahs.length
                    : 0)
        );
        if (!totalAyahs || targetAyah > totalAyahs) {
            this.showToast(
                `Surah ${targetSurah} does not have ayah ${targetAyah}.`,
                2600
            );
            return false;
        }

        let targetIndex = this.resolveAyahIndexByNumber(targetAyah);
        if (targetIndex < 0) {
            targetIndex = Math.max(0, targetAyah - 1);
        }

        this.selectCard(targetIndex);
        this.navigateToAyahNumber(targetAyah, {
            clearMainFilter: true,
            precise: true,
        });

        if (autoplay) {
            this.playAudio(targetIndex);
        }
        this.showToast(
            `Voice command: Surah ${targetSurah}, ayah ${targetAyah}.`,
            2600
        );
        this.announce(`Opened Surah ${targetSurah}, ayah ${targetAyah}.`);
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

        const hasStop = /\b(stop|halt)\b/.test(normalized);
        const hasPause = /\b(pause|hold)\b/.test(normalized);
        const hasPlay = /\b(play|resume|start|continue)\b/.test(normalized);
        const hasNext = /\b(next|forward|skip)\b/.test(normalized);
        const hasPrevious = /\b(previous|prev|back)\b/.test(normalized);
        const hasNextSurahCommand = this.hasVoiceCommandPattern(normalized, [
            /\b(?:next|forward|skip)\s+(?:surah|surahs|sura|suras|chapter|chapters)\b/,
            /\b(?:surah|surahs|sura|suras|chapter|chapters)\s+(?:next|forward|skip)\b/,
            /\b(?:go|move|jump|open|take|navigate)\s+(?:me\s+)?(?:to\s+)?(?:the\s+)?(?:next|forward|skip)\s+(?:surah|surahs|sura|suras|chapter|chapters)\b/,
        ]);
        const hasPreviousSurahCommand = this.hasVoiceCommandPattern(
            normalized,
            [
                /\b(?:previous|prev|back)\s+(?:surah|surahs|sura|suras|chapter|chapters)\b/,
                /\b(?:surah|surahs|sura|suras|chapter|chapters)\s+(?:previous|prev|back)\b/,
                /\b(?:go|move|jump|open|take|navigate)\s+(?:me\s+)?(?:to\s+)?(?:the\s+)?(?:previous|prev|back)\s+(?:surah|surahs|sura|suras|chapter|chapters)\b/,
            ]
        );
        const hasNextAyahCommand = this.hasVoiceCommandPattern(normalized, [
            /\b(?:next|forward|skip)\s+(?:ayah|ayahs|aya|ayas|verse|verses)\b/,
            /\b(?:ayah|ayahs|aya|ayas|verse|verses)\s+(?:next|forward|skip)\b/,
            /\b(?:go|move|jump|open|take|navigate)\s+(?:me\s+)?(?:to\s+)?(?:the\s+)?(?:next|forward|skip)\s+(?:ayah|ayahs|aya|ayas|verse|verses)\b/,
        ]);
        const hasPreviousAyahCommand = this.hasVoiceCommandPattern(
            normalized,
            [
                /\b(?:previous|prev|back)\s+(?:ayah|ayahs|aya|ayas|verse|verses)\b/,
                /\b(?:ayah|ayahs|aya|ayas|verse|verses)\s+(?:previous|prev|back)\b/,
                /\b(?:go|move|jump|open|take|navigate)\s+(?:me\s+)?(?:to\s+)?(?:the\s+)?(?:previous|prev|back)\s+(?:ayah|ayahs|aya|ayas|verse|verses)\b/,
            ]
        );
        const surahNumber = this.extractVoiceCommandSurahNumber(normalized);
        const ayahNumber = this.extractVoiceCommandAyahNumber(normalized);

        if (hasStop) {
            return this.handleVoiceCommandStop();
        }
        if (hasPause) {
            return this.handleVoiceCommandPause();
        }
        if (hasNextSurahCommand) {
            return this.playVoiceCommandRelativeSurah(1);
        }
        if (hasPreviousSurahCommand) {
            return this.playVoiceCommandRelativeSurah(-1);
        }
        if (Number.isFinite(Number(surahNumber)) && Number(surahNumber) > 0) {
            return this.goToVoiceCommandSurah(surahNumber, {
                ayahNumber:
                    Number.isFinite(Number(ayahNumber)) && Number(ayahNumber) > 0
                        ? ayahNumber
                        : 1,
                autoplay: true,
            });
        }
        if (Number.isFinite(Number(ayahNumber)) && Number(ayahNumber) > 0) {
            return this.playVoiceCommandAyahNumber(ayahNumber, {
                autoplay: true,
            });
        }
        if (hasNextAyahCommand) {
            return this.playVoiceCommandRelativeAyah(1);
        }
        if (hasPreviousAyahCommand) {
            return this.playVoiceCommandRelativeAyah(-1);
        }
        if (hasNext) {
            return this.playVoiceCommandRelativeAyah(1);
        }
        if (hasPrevious) {
            return this.playVoiceCommandRelativeAyah(-1);
        }
        if (hasPlay) {
            return this.handleVoiceCommandPlay();
        }
        this.showToast(
            `Voice command not recognized: "${normalized}". Try "next surah", "play verse 5", or "surah 2 ayah 255".`,
            2600
        );
        return false;
    },
    queueVoiceCommandTranscript(transcript = "") {
        const text = String(transcript || "").trim();
        if (!text) return;
        this.voiceCommandPendingTranscript = String(
            `${this.voiceCommandPendingTranscript || ""} ${text}`
        )
            .trim()
            .slice(0, 520);
        clearTimeout(this.voiceCommandProcessTimer);
        this.voiceCommandProcessTimer = setTimeout(() => {
            void this.flushVoiceCommandTranscriptQueue();
        }, Number(this.voiceCommandCommitDelayMs) || 1400);
    },
    async flushVoiceCommandTranscriptQueue(options = {}) {
        const { force = false } = options;
        if (!force && !this.voiceCommandsEnabled) return false;
        const transcript = String(this.voiceCommandPendingTranscript || "").trim();
        clearTimeout(this.voiceCommandProcessTimer);
        this.voiceCommandProcessTimer = null;
        this.voiceCommandPendingTranscript = "";
        if (!transcript) return false;
        return this.executeVoiceCommandTranscript(transcript);
    },
    clearVoiceCommandTranscriptQueue() {
        clearTimeout(this.voiceCommandProcessTimer);
        this.voiceCommandProcessTimer = null;
        this.voiceCommandPendingTranscript = "";
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
            this.queueVoiceCommandTranscript(transcript);
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
            void this.flushVoiceCommandTranscriptQueue({ force: true });
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
        this.clearVoiceCommandTranscriptQueue();
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
        this.clearVoiceCommandTranscriptQueue();
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
                "Voice commands: On. Try saying: play verse 5, next surah, or surah 2 ayah 255.",
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
        this.clearVoiceCommandTranscriptQueue();
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
