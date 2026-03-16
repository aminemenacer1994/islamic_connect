const VOICE_COMMAND_SURAH_TOKEN =
    "(?:surah|surahs|sura|suras|surat|sorah|soorah|chapter|chapters)";
const VOICE_COMMAND_AYAH_TOKEN =
    "(?:ayah|ayahs|aya|ayas|ayat|verse|verses)";
const VOICE_COMMAND_NEXT_TOKEN = "(?:next|forward|skip|ahead)";
const VOICE_COMMAND_PREVIOUS_TOKEN = "(?:previous|prev|back|backward)";
const VOICE_COMMAND_NAVIGATE_TOKEN = "(?:go|move|jump|open|take|navigate)";
const VOICE_COMMAND_FILLER_PATTERN =
    /\b(?:bismillah|bismi allah|assalamu alaykum|as salamu alaykum|salam|insha ?allah|in shaa allah|alhamdulillah|subhanallah|jazakallah(?:u khayran)?|barakallahu feek(?:um)?|allahumma|ya allah|ya rab|akhi|ukhti)\b/g;

export const VOICE_COMMAND_DATA = {
    voiceCommandsPreferenceBaseKey: "surat_voice_commands_enabled",
    voiceCommandsEnabled: false,
    voiceCommandListening: false,
    voiceCommandError: "",
    voiceCommandLastTranscript: "",
    voiceCommandPendingTranscript: "",
    voiceCommandProcessTimer: null,
    voiceCommandInterimTranscript: "",
    voiceCommandInterimTimer: null,
    voiceCommandCommitDelayMs: 350,
    voiceCommandFastCommitDelayMs: 150,
    voiceCommandImmediateCommitDelayMs: 90,
    voiceCommandSurahFollowupDelayMs: 520,
    voiceCommandInterimCommitDelayMs: 560,
    voiceCommandMaxTranscriptLength: 320,
    voiceCommandMinIntentScore: 2,
    voiceCommandDuplicateWindowMs: 900,
    voiceCommandLastExecutedTranscript: "",
    voiceCommandLastExecutedAt: 0,
    voiceCommandRecognitionInstance: null,
    voiceCommandRestartTimer: null,
    voiceCommandLocale: "en-US",
};

export const VOICE_COMMAND_GUIDE = {
    intro:
        "Speak naturally, even with Islamic phrases. Words like Bismillah or inshaAllah are ignored so the command still lands cleanly.",
    tips: [
        "Turn voice commands on from the microphone button, then wait for the mic indicator.",
        "Say the full command, then pause briefly. Commands are processed after a short silence.",
        "Use clear number phrases like 2, 21, twenty one, or 21st.",
        "Islamic filler phrases such as Bismillah, alhamdulillah, or jazakAllah do not interrupt the command.",
    ],
    groups: [
        {
            id: "playback",
            title: "Playback controls",
            iconClass: "bi-play-circle",
            summary: "Control the current recitation without reaching for the playback buttons.",
            commands: [
                {
                    id: "play",
                    label: "Play or resume",
                    keywords: ["play", "resume", "start", "continue"],
                    example: "bismillah, continue the recitation",
                },
                {
                    id: "pause",
                    label: "Pause playback",
                    keywords: ["pause", "hold"],
                    example: "pause for a moment please",
                },
                {
                    id: "stop",
                    label: "Stop playback",
                    keywords: ["stop", "halt"],
                    example: "jazakAllah, stop now",
                },
            ],
        },
        {
            id: "ayah-navigation",
            title: "Ayah navigation",
            iconClass: "bi-signpost-2",
            summary:
                "Move through ayahs in the current surah or jump straight to the ayah you want to revise.",
            commands: [
                {
                    id: "next-ayah",
                    label: "Next ayah",
                    keywords: ["next", "forward", "skip", "next ayah", "next verse"],
                    example: "inshaAllah, go to the next ayah",
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
                    example: "take me to the previous ayah",
                },
                {
                    id: "ayah-number",
                    label: "Open ayah by number",
                    keywords: ["ayah X", "verse X", "ayah number X"],
                    example: "play ayah twenty one",
                },
            ],
        },
        {
            id: "surah-navigation",
            title: "Surah navigation",
            iconClass: "bi-compass",
            summary:
                "Move between surahs or jump directly to the exact place you want to read or review.",
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
                    example: "go to the previous surah",
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
                    example: "bismillah, take me to surah 2 ayah 255",
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
            .replace(VOICE_COMMAND_FILLER_PATTERN, " ")
            .replace(/\s+/g, " ")
            .trim();
    },
    getVoiceCommandRecognitionLocale() {
        const configured = String(this.voiceCommandLocale || "").trim();
        if (configured) return configured;
        if (typeof navigator !== "undefined" && navigator.language) {
            const browserLocale = String(navigator.language).trim();
            if (browserLocale) return browserLocale;
        }
        return "en-US";
    },
    getVoiceCommandIntentScore(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return 0;
        let score = 0;
        if (new RegExp(`\\b${VOICE_COMMAND_SURAH_TOKEN}\\b`).test(normalized)) {
            score += 2;
        }
        if (new RegExp(`\\b${VOICE_COMMAND_AYAH_TOKEN}\\b`).test(normalized)) {
            score += 2;
        }
        if (new RegExp(`\\b${VOICE_COMMAND_NEXT_TOKEN}\\b`).test(normalized)) {
            score += 2;
        }
        if (new RegExp(`\\b${VOICE_COMMAND_PREVIOUS_TOKEN}\\b`).test(normalized)) {
            score += 2;
        }
        if (/\b(play|resume|start|continue|pause|hold|stop|halt)\b/.test(normalized)) {
            score += 2;
        }
        if (/\b\d{1,3}(?:st|nd|rd|th)?\b/.test(normalized)) {
            score += 2;
        }
        if (
            new RegExp(
                `\\b${VOICE_COMMAND_SURAH_TOKEN}\\s*(?:number\\s*)?\\d{1,3}(?:st|nd|rd|th)?\\b`
            ).test(normalized)
        ) {
            score += 5;
        }
        if (
            new RegExp(
                `\\b${VOICE_COMMAND_AYAH_TOKEN}\\s*(?:number\\s*)?\\d{1,3}(?:st|nd|rd|th)?\\b`
            ).test(normalized)
        ) {
            score += 4;
        }
        if (
            new RegExp(
                `\\b${VOICE_COMMAND_SURAH_TOKEN}\\b[\\s\\w-]{0,36}\\b${VOICE_COMMAND_AYAH_TOKEN}\\b`
            ).test(normalized)
        ) {
            score += 5;
        }
        return score;
    },
    pickBestVoiceCommandTranscriptFromResult(result) {
        if (!result) return "";
        const alternatives = [];
        const count = Number(result.length || 0);
        for (let i = 0; i < count; i += 1) {
            const alternative = result[i];
            const transcript = String(alternative?.transcript || "").trim();
            if (!transcript) continue;
            alternatives.push({
                transcript,
                confidence: Number(alternative?.confidence || 0),
                score: this.getVoiceCommandIntentScore(transcript),
            });
        }
        if (!alternatives.length) return "";
        alternatives.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.confidence !== a.confidence) return b.confidence - a.confidence;
            return b.transcript.length - a.transcript.length;
        });
        return alternatives[0].transcript;
    },
    mergeVoiceCommandTranscript(currentValue = "", incomingValue = "") {
        const current = this.normalizeVoiceCommandTranscript(currentValue);
        const incoming = this.normalizeVoiceCommandTranscript(incomingValue);
        if (!incoming) return current;
        if (!current) return incoming;
        if (current === incoming) return current;
        if (incoming.includes(current)) return incoming;
        if (current.includes(incoming)) return current;

        const currentTokens = current.split(/\s+/).filter(Boolean);
        const incomingTokens = incoming.split(/\s+/).filter(Boolean);
        if (!currentTokens.length) return incoming;
        if (!incomingTokens.length) return current;

        let overlap = 0;
        const maxOverlap = Math.min(currentTokens.length, incomingTokens.length);
        for (let size = maxOverlap; size >= 1; size -= 1) {
            const left = currentTokens.slice(currentTokens.length - size).join(" ");
            const right = incomingTokens.slice(0, size).join(" ");
            if (left === right) {
                overlap = size;
                break;
            }
        }

        if (!overlap) {
            return `${current} ${incoming}`.trim();
        }
        return currentTokens.concat(incomingTokens.slice(overlap)).join(" ").trim();
    },
    isVoiceCommandLikelyDuplicate(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return false;
        const previous = this.normalizeVoiceCommandTranscript(
            this.voiceCommandLastExecutedTranscript
        );
        if (!previous || previous !== normalized) return false;
        const now = Date.now();
        const lastAt = Number(this.voiceCommandLastExecutedAt || 0);
        const windowMs = Number(this.voiceCommandDuplicateWindowMs) || 900;
        return lastAt > 0 && now - lastAt <= windowMs;
    },
    markVoiceCommandExecuted(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return;
        this.voiceCommandLastExecutedTranscript = normalized;
        this.voiceCommandLastExecutedAt = Date.now();
    },
    hasVoiceCommandMinIntent(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return false;
        const hasCommandToken =
            /\b(play|resume|start|continue|pause|hold|stop|halt)\b/.test(
                normalized
            ) ||
            new RegExp(`\\b${VOICE_COMMAND_NEXT_TOKEN}\\b`).test(normalized) ||
            new RegExp(`\\b${VOICE_COMMAND_PREVIOUS_TOKEN}\\b`).test(
                normalized
            ) ||
            new RegExp(`\\b${VOICE_COMMAND_SURAH_TOKEN}\\b`).test(normalized) ||
            new RegExp(`\\b${VOICE_COMMAND_AYAH_TOKEN}\\b`).test(normalized);
        if (!hasCommandToken) return false;
        const minScore = Number(this.voiceCommandMinIntentScore) || 2;
        return this.getVoiceCommandIntentScore(normalized) >= minScore;
    },
    shouldWaitForAyahFollowup(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return false;
        const hasSurahWithNumber = new RegExp(
            `\\b${VOICE_COMMAND_SURAH_TOKEN}\\s*(?:number\\s*)?\\d{1,3}(?:st|nd|rd|th)?\\b`
        ).test(normalized);
        const hasAyahWithNumber = new RegExp(
            `\\b${VOICE_COMMAND_AYAH_TOKEN}\\s*(?:number\\s*)?\\d{1,3}(?:st|nd|rd|th)?\\b`
        ).test(normalized);
        if (!hasSurahWithNumber || hasAyahWithNumber) return false;
        if (/\b(play|pause|stop|resume|start|continue)\b/.test(normalized)) {
            return false;
        }
        return true;
    },
    shouldFastTrackVoiceCommandTranscript(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return false;
        if (/^(play|pause|stop|next|previous|back|resume|start|continue|halt)\b/.test(normalized)) {
            return true;
        }
        if (
            new RegExp(
                `\\b${VOICE_COMMAND_SURAH_TOKEN}\\s*(?:number\\s*)?\\d{1,3}(?:st|nd|rd|th)?\\b`
            ).test(normalized)
        ) {
            return true;
        }
        if (
            new RegExp(
                `\\b${VOICE_COMMAND_AYAH_TOKEN}\\s*(?:number\\s*)?\\d{1,3}(?:st|nd|rd|th)?\\b`
            ).test(normalized)
        ) {
            return true;
        }
        if (
            new RegExp(
                `\\b${VOICE_COMMAND_NEXT_TOKEN}\\s+${VOICE_COMMAND_SURAH_TOKEN}\\b`
            ).test(normalized)
        ) {
            return true;
        }
        if (
            new RegExp(
                `\\b${VOICE_COMMAND_PREVIOUS_TOKEN}\\s+${VOICE_COMMAND_SURAH_TOKEN}\\b`
            ).test(normalized)
        ) {
            return true;
        }
        return false;
    },
    getVoiceCommandCommitDelayMs(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) {
            return Number(this.voiceCommandCommitDelayMs) || 350;
        }
        if (this.shouldWaitForAyahFollowup(normalized)) {
            return Number(this.voiceCommandSurahFollowupDelayMs) || 520;
        }
        if (
            /^(play|pause|stop|next|previous|back|resume|start|continue|halt)\b/.test(
                normalized
            ) &&
            !new RegExp(`\\b${VOICE_COMMAND_SURAH_TOKEN}\\b`).test(normalized) &&
            !new RegExp(`\\b${VOICE_COMMAND_AYAH_TOKEN}\\b`).test(normalized) &&
            !/\b\d{1,3}(?:st|nd|rd|th)?\b/.test(normalized)
        ) {
            return Number(this.voiceCommandImmediateCommitDelayMs) || 90;
        }
        const normalDelay = Number(this.voiceCommandCommitDelayMs) || 350;
        const fastDelay = Number(this.voiceCommandFastCommitDelayMs) || 150;
        return this.shouldFastTrackVoiceCommandTranscript(transcript)
            ? fastDelay
            : normalDelay;
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
            new RegExp(
                `\\b${VOICE_COMMAND_AYAH_TOKEN}\\s*(?:number\\s*)?(\\d{1,3})(?:st|nd|rd|th)?\\b`
            )
        );
        if (digitMatch?.[1]) {
            const parsedDigits = Number(digitMatch[1]);
            return Number.isFinite(parsedDigits) ? parsedDigits : null;
        }

        const phraseMatch = normalized.match(
            new RegExp(
                `\\b${VOICE_COMMAND_AYAH_TOKEN}\\s*(?:number\\s*)?([a-z0-9\\s-]+)`,
                "i"
            )
        );
        if (!phraseMatch?.[1]) return null;
        const candidate = String(phraseMatch[1] || "")
            .split(
                new RegExp(
                    `\\b(?:play|pause|stop|next|forward|skip|ahead|previous|prev|back|backward|${VOICE_COMMAND_SURAH_TOKEN}|resume|start|continue|please|thanks|${VOICE_COMMAND_NAVIGATE_TOKEN})\\b`,
                    "i"
                )
            )[0]
            .trim();
        return this.parseSpokenNumber(candidate);
    },
    extractVoiceCommandSurahNumber(transcript = "") {
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return null;

        const digitMatch = normalized.match(
            new RegExp(
                `\\b${VOICE_COMMAND_SURAH_TOKEN}\\s*(?:number\\s*)?(\\d{1,3})(?:st|nd|rd|th)?\\b`
            )
        );
        if (digitMatch?.[1]) {
            const parsedDigits = Number(digitMatch[1]);
            return Number.isFinite(parsedDigits) ? parsedDigits : null;
        }

        const phraseMatch = normalized.match(
            new RegExp(
                `\\b${VOICE_COMMAND_SURAH_TOKEN}\\s*(?:number\\s*)?([a-z0-9\\s-]+)`,
                "i"
            )
        );
        if (!phraseMatch?.[1]) return null;
        const candidate = String(phraseMatch[1] || "")
            .split(
                new RegExp(
                    `\\b(?:${VOICE_COMMAND_AYAH_TOKEN}|play|pause|stop|next|forward|skip|ahead|previous|prev|back|backward|resume|start|continue|please|thanks|${VOICE_COMMAND_NAVIGATE_TOKEN})\\b`,
                    "i"
                )
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
        this.playAudio(targetIndex, { hideAudioPlayer: true });
        const ayahNumber = this.getAyahNumberByIndex(targetIndex);
        this.showToast(`Voice command: ayah ${ayahNumber}.`, 2200);
        this.announce(`Playing ayah ${ayahNumber}.`);
        return true;
    },
    async playVoiceCommandAyahNumber(ayahNumber, options = {}) {
        const { autoplay = true, hideAudioPlayer = true } = options;
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
            this.playAudio(targetIndex, { hideAudioPlayer });
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
        this.playAudio(0, { hideAudioPlayer: true });
        this.showToast(`Voice command: Surah ${targetSurah}.`, 2400);
        this.announce(`Opened Surah ${targetSurah}.`);
        return true;
    },
    async goToVoiceCommandSurah(surahNumber, options = {}) {
        const { ayahNumber = 1, autoplay = true, hideAudioPlayer = true } =
            options;
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
            this.playAudio(targetIndex, { hideAudioPlayer });
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
        this.playAudio(targetIndex, { hideAudioPlayer: true });
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
    async executeVoiceCommandTranscript(transcript = "", options = {}) {
        const { silentUnknown = false } = options;
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return false;
        this.voiceCommandLastTranscript = normalized;

        const hasStop = /\b(stop|halt)\b/.test(normalized);
        const hasPause = /\b(pause|hold)\b/.test(normalized);
        const hasPlay = /\b(play|resume|start|continue)\b/.test(normalized);
        const hasNext = new RegExp(`\\b${VOICE_COMMAND_NEXT_TOKEN}\\b`).test(
            normalized
        );
        const hasPrevious = new RegExp(
            `\\b${VOICE_COMMAND_PREVIOUS_TOKEN}\\b`
        ).test(normalized);
        const hasNextSurahCommand = this.hasVoiceCommandPattern(normalized, [
            new RegExp(
                `\\b${VOICE_COMMAND_NEXT_TOKEN}\\s+${VOICE_COMMAND_SURAH_TOKEN}\\b`
            ),
            new RegExp(
                `\\b${VOICE_COMMAND_SURAH_TOKEN}\\s+${VOICE_COMMAND_NEXT_TOKEN}\\b`
            ),
            new RegExp(
                `\\b${VOICE_COMMAND_NAVIGATE_TOKEN}\\s+(?:me\\s+)?(?:to\\s+)?(?:the\\s+)?${VOICE_COMMAND_NEXT_TOKEN}\\s+${VOICE_COMMAND_SURAH_TOKEN}\\b`
            ),
        ]);
        const hasPreviousSurahCommand = this.hasVoiceCommandPattern(
            normalized,
            [
                new RegExp(
                    `\\b${VOICE_COMMAND_PREVIOUS_TOKEN}\\s+${VOICE_COMMAND_SURAH_TOKEN}\\b`
                ),
                new RegExp(
                    `\\b${VOICE_COMMAND_SURAH_TOKEN}\\s+${VOICE_COMMAND_PREVIOUS_TOKEN}\\b`
                ),
                new RegExp(
                    `\\b${VOICE_COMMAND_NAVIGATE_TOKEN}\\s+(?:me\\s+)?(?:to\\s+)?(?:the\\s+)?${VOICE_COMMAND_PREVIOUS_TOKEN}\\s+${VOICE_COMMAND_SURAH_TOKEN}\\b`
                ),
            ]
        );
        const hasNextAyahCommand = this.hasVoiceCommandPattern(normalized, [
            new RegExp(
                `\\b${VOICE_COMMAND_NEXT_TOKEN}\\s+${VOICE_COMMAND_AYAH_TOKEN}\\b`
            ),
            new RegExp(
                `\\b${VOICE_COMMAND_AYAH_TOKEN}\\s+${VOICE_COMMAND_NEXT_TOKEN}\\b`
            ),
            new RegExp(
                `\\b${VOICE_COMMAND_NAVIGATE_TOKEN}\\s+(?:me\\s+)?(?:to\\s+)?(?:the\\s+)?${VOICE_COMMAND_NEXT_TOKEN}\\s+${VOICE_COMMAND_AYAH_TOKEN}\\b`
            ),
        ]);
        const hasPreviousAyahCommand = this.hasVoiceCommandPattern(
            normalized,
            [
                new RegExp(
                    `\\b${VOICE_COMMAND_PREVIOUS_TOKEN}\\s+${VOICE_COMMAND_AYAH_TOKEN}\\b`
                ),
                new RegExp(
                    `\\b${VOICE_COMMAND_AYAH_TOKEN}\\s+${VOICE_COMMAND_PREVIOUS_TOKEN}\\b`
                ),
                new RegExp(
                    `\\b${VOICE_COMMAND_NAVIGATE_TOKEN}\\s+(?:me\\s+)?(?:to\\s+)?(?:the\\s+)?${VOICE_COMMAND_PREVIOUS_TOKEN}\\s+${VOICE_COMMAND_AYAH_TOKEN}\\b`
                ),
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
        if (!silentUnknown) {
            this.showToast(
                `Voice command not recognized: "${normalized}". Try "next surah", "play verse 5", or "surah 2 ayah 255".`,
                2600
            );
        }
        return false;
    },
    queueVoiceCommandTranscript(transcript = "", options = {}) {
        const { immediate = false } = options;
        const text = String(transcript || "").trim();
        if (!text) return;
        this.clearVoiceCommandInterimQueue();
        const merged = this.mergeVoiceCommandTranscript(
            this.voiceCommandPendingTranscript,
            text
        );
        const maxLength = Number(this.voiceCommandMaxTranscriptLength) || 320;
        this.voiceCommandPendingTranscript = String(merged || "")
            .trim()
            .slice(0, maxLength);
        clearTimeout(this.voiceCommandProcessTimer);
        if (
            immediate &&
            !this.shouldWaitForAyahFollowup(this.voiceCommandPendingTranscript)
        ) {
            void this.flushVoiceCommandTranscriptQueue({ force: true });
            return;
        }
        const commitDelay = this.getVoiceCommandCommitDelayMs(
            this.voiceCommandPendingTranscript
        );
        this.voiceCommandProcessTimer = setTimeout(() => {
            void this.flushVoiceCommandTranscriptQueue();
        }, commitDelay);
    },
    queueVoiceCommandInterimTranscript(transcript = "") {
        const text = String(transcript || "").trim();
        if (!text) return;
        const merged = this.mergeVoiceCommandTranscript(
            this.voiceCommandInterimTranscript,
            text
        );
        const normalized = this.normalizeVoiceCommandTranscript(merged);
        if (!normalized || !this.hasVoiceCommandMinIntent(normalized)) return;
        const maxLength = Number(this.voiceCommandMaxTranscriptLength) || 320;
        this.voiceCommandInterimTranscript = String(normalized || "")
            .trim()
            .slice(0, maxLength);
        clearTimeout(this.voiceCommandInterimTimer);
        const baseDelay = Number(this.voiceCommandInterimCommitDelayMs) || 560;
        const transcriptDelay = this.getVoiceCommandCommitDelayMs(
            this.voiceCommandInterimTranscript
        );
        const commitDelay = Math.max(baseDelay, transcriptDelay);
        this.voiceCommandInterimTimer = setTimeout(() => {
            void this.flushVoiceCommandInterimTranscriptQueue();
        }, commitDelay);
    },
    async flushVoiceCommandInterimTranscriptQueue(options = {}) {
        const { force = false } = options;
        if (!force && !this.voiceCommandsEnabled) return false;
        const transcript = String(this.voiceCommandInterimTranscript || "").trim();
        clearTimeout(this.voiceCommandInterimTimer);
        this.voiceCommandInterimTimer = null;
        this.voiceCommandInterimTranscript = "";
        if (!transcript) return false;
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return false;
        if (!this.hasVoiceCommandMinIntent(normalized)) return false;
        if (this.isVoiceCommandLikelyDuplicate(normalized)) return false;
        const handled = await this.executeVoiceCommandTranscript(normalized, {
            silentUnknown: true,
        });
        if (handled) {
            this.markVoiceCommandExecuted(normalized);
        }
        return handled;
    },
    async flushVoiceCommandTranscriptQueue(options = {}) {
        const { force = false } = options;
        if (!force && !this.voiceCommandsEnabled) return false;
        const transcript = String(this.voiceCommandPendingTranscript || "").trim();
        clearTimeout(this.voiceCommandProcessTimer);
        this.voiceCommandProcessTimer = null;
        this.voiceCommandPendingTranscript = "";
        if (!transcript) return false;
        const normalized = this.normalizeVoiceCommandTranscript(transcript);
        if (!normalized) return false;
        if (!this.hasVoiceCommandMinIntent(normalized)) {
            return false;
        }
        if (this.isVoiceCommandLikelyDuplicate(normalized)) {
            return false;
        }
        const intentScore = this.getVoiceCommandIntentScore(normalized);
        const handled = await this.executeVoiceCommandTranscript(normalized, {
            silentUnknown: intentScore <= Number(this.voiceCommandMinIntentScore || 2),
        });
        if (handled) {
            this.markVoiceCommandExecuted(normalized);
        }
        return handled;
    },
    clearVoiceCommandInterimQueue() {
        clearTimeout(this.voiceCommandInterimTimer);
        this.voiceCommandInterimTimer = null;
        this.voiceCommandInterimTranscript = "";
    },
    clearVoiceCommandTranscriptQueue() {
        this.clearVoiceCommandInterimQueue();
        clearTimeout(this.voiceCommandProcessTimer);
        this.voiceCommandProcessTimer = null;
        this.voiceCommandPendingTranscript = "";
    },
    resetVoiceCommandExecutionDeduper() {
        this.voiceCommandLastExecutedTranscript = "";
        this.voiceCommandLastExecutedAt = 0;
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
        recognition.maxAlternatives = 3;
        recognition.continuous = true;
        recognition.lang = this.getVoiceCommandRecognitionLocale();

        recognition.onstart = () => {
            this.voiceCommandListening = true;
            this.voiceCommandError = "";
        };

        recognition.onresult = (event) => {
            if (!this.voiceCommandsEnabled || !event?.results) return;
            let finalTranscript = "";
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const text = this.pickBestVoiceCommandTranscriptFromResult(result);
                if (!text) continue;
                if (result?.isFinal) {
                    finalTranscript += `${text} `;
                    continue;
                }
                interimTranscript = this.mergeVoiceCommandTranscript(
                    interimTranscript,
                    text
                );
            }
            const finalText = finalTranscript.trim();
            if (finalText) {
                this.queueVoiceCommandTranscript(finalText, { immediate: true });
                return;
            }
            const interimText = interimTranscript.trim();
            if (!interimText) return;
            this.queueVoiceCommandInterimTranscript(interimText);
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
            void this.flushVoiceCommandInterimTranscriptQueue({ force: true });
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
        const insecureContext = !this.isSpeechRecognitionSecureContext();
        if (insecureContext) {
            this.voiceCommandError = this.getSpeechRecognitionErrorMessage(
                "insecure-context"
            );
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
        if (!insecureContext) {
            this.voiceCommandError = "";
        }
        try {
            this.voiceCommandRecognitionInstance.lang =
                this.getVoiceCommandRecognitionLocale();
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
        this.resetVoiceCommandExecutionDeduper();
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
        this.resetVoiceCommandExecutionDeduper();
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
