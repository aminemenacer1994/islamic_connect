import axios from "axios";
import { JUZ_START_MAPPING, PAGE_START_MAPPING, getJuzStart, getPageStart } from "../utils/quran-mappings";
import { Modal } from "bootstrap";
import BookmarkModal from "../vue/bookmarks/BookmarkModal.vue";
import { fetchUserIdFromApi } from "../utils/bookmarkAuth";
export default {
    name: "SuratComponent",
    components: {
        BookmarkModal,
    },
    data: function () {
        return {
            // responsive a11y
            isMobile: false,
            isTabletOrMobile: false,
            // a11y
            selectedCardIndex: 0,
            screenReaderMessage: "",
            isComponentAlive: true,
            isInitialLoad: true,
            selectedSurah: "1",
            selectedReciter: "ar.alafasy",
            selectedTranslation: "en.ahmedali",
            isAudioPlaying: [],
            isAudioLoading: [],
            currentlyPlaying: null,
            currentlyPlayingIndex: 0,
            isVisible: true,
            surahs: [],
            reciters: [],
            translations: [],
            surahDetails: null,
            surahInfo: null,
            surahInfoText: "",
            surahInfoShortText: "",
            surahInfoSource: "",
            surahInfoSourceUrl: "",
            surahInfoLoading: false,
            surahInfoError: "",
            surahInfoModalId: "surahInfoModal",
            surahInfoModalInstance: null,
            settingsModalId: "surahSettingsModal",
            settingsModalInstance: null,
            surahInfoFontSize: 16,
            surahInfoFontSizeMin: 14,
            surahInfoFontSizeMax: 22,
            searchQuery: "",
            debouncedQuery: "",
            debounceTimer: null,
            arabicFontSize: 28,
            translationFontSize: 20,
            showTajweed: false,
            showRealtimeHighlighting: false,
            showWordTranslation: false,
            realtimeHighlightPreferenceKey: "surat_realtime_highlighting",
            wordTranslationPreferenceKey: "surat_show_word_translation",
            progress: [],
            audioElements: [],
            playbackSpeed: 1.0,
            volume: 1.0,
            showVolumeBar: false,
            showAudioPlayer: false,
            isHighlighted: false,
            showScrollTop: false,
            // scrubbing state
            isScrubbing: false,
            _boundMove: null,
            _boundUp: null,
            wordTimings: [],
            isLoading: false,
            isNavigating: false, // Prevents scroll conflicts during jumps
            headerCollapsed: false, // Controls whether the toolbar/links are visible
            continuousPlayback: false, // New data property for playback mode
            visualizerBars: Array(20).fill(10),
            playbackSpeeds: [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5],
            currentSpeedIndex: 2,
            repeatCurrent: JSON.parse(
                localStorage.getItem("repeatCurrent") || "false"
            ),
            highlightLeadSeconds: 0.05,
            _lastSegmentIndex: -1,
            reciterLeadOffsets: {},
            reciterDefaultLeadOffsets: {
                "ar.abdulbasitmurattal": 0.05,
                "ar.abdurrahmaansudais": 0.05,
                "ar.hanirifai": 0.05,
                "ar.husary": 0.05,
                "ar.alafasy": 0.05,
                "ar.minshawi": 0.05,
                "ar.saoodshuraym": 0.05,
            },
            reciterTimingMap: {
                "ar.abdulbasitmurattal": 2,
                "ar.abdurrahmaansudais": 3,
                "ar.hanirifai": 5,
                "ar.husary": 6,
                "ar.alafasy": 7,
                "ar.minshawi": 9,
                "ar.saoodshuraym": 10,
            },
            favoriteReciters: ["ar.alafasy", "ar.abdulbasitmurattal"],
            favoriteTranslations: ["en.ahmedali", "en.sahih"],
            lastAutoScrollAt: 0,
            isManualScrolling: false,
            manualScrollTimer: null,
            ayahScrubValue: 1,
            // perf throttles
            lastProgressAt: 0,
            lastVizAt: 0,
            // request control
            _surahAborter: null,
            // delayed spinner timers per index
            loadingTimers: [],
            // virtualization
            itemHeight: 280,
            windowSize: 22,
            buffer: 6,
            visibleStart: 0,
            visibleEnd: 0,
            listTop: 0,
            _heightMeasureRaf: null,
            // Next-step card visibility
            showNextStep: true,
            nextStepMinimized: false,
            activeAyah: null,
            savedAyahKeys: {},
            savedAyahsLoaded: false,
            savedAyahClearTimer: null,
            bookmarkStorageUserId: null,
            bookmarkAnonId: null,
            savedAyahStorageKey: "ic_saved_ayahs_session",
            feedbackMessages: {}, // Keyed by ayahID, value: { text, class }
            bookmarkToast: "",
            bookmarkToastAction: null,
            bookmarkToastTimer: null,
            bookmarkInstanceId: `surat-${Math.random().toString(36).slice(2)}`,
            bookmarkEventHandler: null,
            bookmarkStorageHandler: null,
            visibilityHandler: null,
            authAlert: "",
            authAlertTimer: null,
            deepLinkTarget: null,
            deepLinkHandled: false,
            bookmarkAuthenticated: false,
            ayahReflections: {}, // key -> array of reflection entries
            reflectionModalId: "ayahReflectionModal",
            reflectionModalInstance: null,
            reflectionModalHiddenHandler: null,
            selectedAyahForReflection: null,
            selectedReflectionKey: "",
            reflectionForm: {
                subject: "",
                message: "",
            },
            reflectionSubjectSuggestions: [
                "Gratitude for divine guidance",
                "How this verse comforts me",
                "Commitment to the lesson",
            ],
            reflectionMessagePrompts: [
                { icon: "✨", text: "This reminded me to pause and thank Allah for His mercy." },
                { icon: "🌿", text: "I can implement this by showing patience with my family today." },
                { icon: "🕊️", text: "I feel my trust in Allah growing every time I read this." },
                { icon: "🔥", text: "Let this verse guide the way I handle challenges." },
                { icon: "💭", text: "I promise to keep this verse in mind during moments of doubt." },
                { icon: "🌙", text: "It gave me strength to keep my prayers steady tonight." },
                { icon: "🧭", text: "The advice feels like a compass when I need direction." },
                { icon: "🌟", text: "I am taking this lesson with me into today’s actions." },
                { icon: "🤲", text: "This verse inspires me to make dua for others." },
            ],
            reflectionMessageMinLength: 10,
            reflectionErrorMessage: "",
            reflectionSuccessMessage: "",
            reflectionSuccessTimeout: null,
            ayahReflectionKeys: {},
            editingReflectionId: null,
            editingReflectionIndex: null,
            reflectionCacheKey: "",
            reflectionGeneralStorageKey: "ic_reflection_keys",
            isSavingReflection: false,
            showReflectionHighlight: true,
            carouselCollapsed: false,
            promptRowCount: 3,
            surahSearchQuery: "",
            activeSidebarTab: "surah",
            sidebarSearchQuery: "",
            selectedJuz: null,
            sidebarCollapsed: false,
            settingsDraft: {
                showTajweed: false,
            showRealtimeHighlighting: false,
            showWordTranslation: false,
            },
            tajweedRuleMap: {
                h: {
                    en: "Hamzat Wasl",
                    ar: "همزة وصل",
                    desc: "Pronounced only when starting the word; dropped when connected.",
                    arDesc: "تُنطق في بداية الكلمة وتسقط عند الوصل.",
                },
                l: {
                    en: "Lam Shamsiyyah",
                    ar: "لام شمسية",
                    desc: "The lam is silent and the next letter is doubled.",
                    arDesc: "تُسقط اللام ويُشدَّد الحرف الذي بعدها.",
                },
                n: {
                    en: "Madd Normal",
                    ar: "مد طبيعي",
                    desc: "Basic stretch of 2 counts.",
                    arDesc: "مد طبيعي بمقدار حركتين.",
                },
                p: {
                    en: "Madd Permissible",
                    ar: "مد جائز",
                    desc: "Stretch 2, 4, or 6 counts when a hamzah comes in the next word.",
                    arDesc: "يمد ٢ أو ٤ أو ٦ حركات عند وجود همزة في الكلمة التالية.",
                },
                m: {
                    en: "Madd Necessary",
                    ar: "مد لازم",
                    desc: "Stretch 6 counts because of a permanent sukun.",
                    arDesc: "يمد ٦ حركات لوجود سكون لازم.",
                },
                o: {
                    en: "Madd Obligatory",
                    ar: "مد واجب",
                    desc: "Stretch 4 or 5 counts when a hamzah is in the same word.",
                    arDesc: "يمد ٤ أو ٥ حركات لوجود همزة في نفس الكلمة.",
                },
                a: {
                    en: "Idgham with Ghunnah",
                    ar: "إدغام بغنة",
                    desc: "Merge the noon or tanwin into the next letter with a nasal sound.",
                    arDesc: "إدماج النون أو التنوين مع غنة.",
                },
                u: {
                    en: "Idgham without Ghunnah",
                    ar: "إدغام بدون غنة",
                    desc: "Merge the noon or tanwin into the next letter without nasal sound.",
                    arDesc: "إدماج النون أو التنوين بدون غنة.",
                },
                g: {
                    en: "Ghunnah",
                    ar: "غنة",
                    desc: "Hold a nasal sound for about 2 counts.",
                    arDesc: "غنة بمقدار حركتين.",
                },
                q: {
                    en: "Qalqalah",
                    ar: "قلقلة",
                    desc: "Give a light echo on ق ط ب ج د when they are sakin.",
                    arDesc: "قلقلة خفيفة لحروف قطب جد عند السكون.",
                },
                f: {
                    en: "Ikhfa",
                    ar: "إخفاء",
                    desc: "Hide the noon or tanwin with a nasal sound before certain letters.",
                    arDesc: "إخفاء النون أو التنوين مع غنة قبل حروف الإخفاء.",
                },
                c: {
                    en: "Ikhfa Shafawi",
                    ar: "إخفاء شفوي",
                    desc: "Lightly hide م before ب with a nasal sound.",
                    arDesc: "إخفاء الميم قبل الباء مع غنة خفيفة.",
                },
                w: {
                    en: "Idgham Shafawi",
                    ar: "إدغام شفوي",
                    desc: "Merge م into the next م with a nasal sound.",
                    arDesc: "إدغام الميم في الميم مع غنة.",
                },
                i: {
                    en: "Iqlab",
                    ar: "إقلاب",
                    desc: "Change noon or tanwin to a hidden م sound before ب.",
                    arDesc: "قلب النون أو التنوين إلى ميم مخفاة قبل الباء.",
                },
                d: {
                    en: "Idgham Mutajanisayn",
                    ar: "إدغام متجانسين",
                    desc: "Merge letters from the same articulation group.",
                    arDesc: "إدغام حرفين من مخرج واحد.",
                },
                b: {
                    en: "Idgham Mutaqaribayn",
                    ar: "إدغام متقاربين",
                    desc: "Merge letters that are close in articulation.",
                    arDesc: "إدغام حرفين متقاربين في المخرج.",
                },
                s: {
                    en: "Silent",
                    ar: "ساكن",
                    desc: "No vowel sound on the letter.",
                    arDesc: "حرف بلا حركة صوتية.",
                },
            },
        };
    },
    computed: {
        filteredJuzs() {
            const query = (this.sidebarSearchQuery || "").trim().toLowerCase();
            const allJuz = Array.from({ length: 30 }, (_, i) => i + 1);
            
            // Map to objects with metadata
            const juzWithMetadata = allJuz.map(j => {
                const start = JUZ_START_MAPPING[j];
                let surahName = "";
                if (start && this.surahs.length > 0) {
                    const s = this.surahs.find(s => s.number === start.surah);
                    surahName = s ? s.englishName : `Surah ${start.surah}`;
                }
                return {
                    number: j,
                    surahNumber: start ? start.surah : 0,
                    ayahNumber: start ? start.ayah : 0,
                    surahName: surahName
                };
            });

            if (!query) return juzWithMetadata;

            return juzWithMetadata.filter(j => 
                j.number.toString().includes(query) || 
                `juz ${j.number}`.includes(query) ||
                j.surahName.toLowerCase().includes(query)
            );
        },
        filteredPages() {
             const query = (this.sidebarSearchQuery || "").trim().toLowerCase();
             const allPages = Array.from({ length: 604 }, (_, i) => i + 1);
             if (!query) return allPages;
             return allPages.filter(p => 
                 p.toString().includes(query) || 
                 `page ${p}`.includes(query)
             );
        },
        filteredVersesList() {
             if (!this.surahDetails || !this.surahDetails.ayahs) return [];
             const query = (this.sidebarSearchQuery || "").trim().toLowerCase();
             
             if (!query) {
                 return this.surahDetails.ayahs.map(a => ({
                     number: a.numberInSurah,
                     text: a.text,
                     translation: a.translation,
                     key: a.numberInSurah
                 }));
             }

             return this.surahDetails.ayahs
                .filter(a => 
                    String(a.numberInSurah).includes(query) ||
                    (a.lowerText && a.lowerText.includes(query)) ||
                    (a.lowerTranslation && a.lowerTranslation.includes(query))
                )
                .map(a => ({
                     number: a.numberInSurah,
                     text: a.text,
                     translation: a.translation,
                     key: a.numberInSurah
                 }));
        },
        filteredSurahs_sidebar() {
             if (!Array.isArray(this.surahs)) return [];
             const raw = (this.sidebarSearchQuery || "").trim().toLowerCase();
             if (!raw) return this.surahs;
             return this.surahs.filter((surah) => {
                 const english = (surah.englishName || "").toLowerCase();
                 const arabic = (surah.name || "").toLowerCase();
                 const number = String(surah.number || "");
                 return (
                     english.includes(raw) ||
                     arabic.includes(raw) ||
                     number.includes(raw)
                 );
             });
        },
        tajweedLegend() {
            return Object.keys(this.tajweedRuleMap)
                .sort()
                .map((name) => ({
                    name,
                    code: name,
                    label: this.tajweedRuleMap[name]?.en || name,
                    ar: this.tajweedRuleMap[name]?.ar || "",
                    desc: this.tajweedRuleMap[name]?.desc || "",
                    arDesc: this.tajweedRuleMap[name]?.arDesc || "",
                }));
        },
        surahInfoSourceLabel() {
            return this.surahInfoSource || "Quran.com";
        },
        surahInfoSourceHost() {
            const rawUrl = this.surahInfoSourceUrl || "https://quran.com";
            try {
                return new URL(rawUrl).hostname.replace(/^www\./, "");
            } catch (_) {
                return "";
            }
        },
        reflectionMessagePromptRows() {
            const prompts = this.reflectionMessagePrompts || [];
            const perRow = 5;
            const rows = [];
            if (!prompts.length) return rows;
            for (let rowIndex = 0; rowIndex < this.promptRowCount; rowIndex++) {
                const start = (rowIndex * perRow) % prompts.length;
                const rowPrompts = [];
                for (let offset = 0; offset < perRow; offset++) {
                    const prompt = prompts[(start + offset) % prompts.length];
                    if (!rowPrompts.some((p) => p.text === prompt.text)) {
                        rowPrompts.push(prompt);
                    }
                    if (rowPrompts.length >= perRow) break;
                }
                rows.push(rowPrompts);
            }
            return rows;
        },
        filteredAyahs: function () {
            if (!this.surahDetails) return [];
            if (!this.debouncedQuery) return this.surahDetails.ayahs;
            const query = this.debouncedQuery.toLowerCase();
            return this.surahDetails.ayahs.filter(
                (ayah) =>
                    (ayah.lowerText && ayah.lowerText.includes(query)) ||
                    (ayah.lowerTranslation &&
                        ayah.lowerTranslation.includes(query))
            );
        },
        filteredSurahs() {
            if (!Array.isArray(this.surahs)) return [];
            const raw = (this.surahSearchQuery || "").trim().toLowerCase();
            if (!raw) return this.surahs;
            return this.surahs.filter((surah) => {
                const english = (surah.englishName || "").toLowerCase();
                const arabic = (surah.name || "").toLowerCase();
                const number = String(surah.number || "");
                return (
                    english.includes(raw) ||
                    arabic.includes(raw) ||
                    number.includes(raw)
                );
            });
        },
        currentSurahInfo() {
            const target = Number(this.surahDetails?.surahNumber || this.selectedSurah);
            if (!target || !Array.isArray(this.surahs)) return null;
            return this.surahs.find((surah) => Number(surah.number) === target) || null;
        },
        currentSurahMeta() {
            if (!this.surahDetails && !this.surahInfo) return {};
            const inSurah = this.surahDetails?.ayahs?.length || 0;
            const cached = this.surahInfo;
            const surahNumber = Number(this.surahDetails?.surahNumber || this.selectedSurah);
            return {
                ayahCount:
                    cached?.numberOfAyahs ||
                    inSurah ||
                    this.currentSurahInfo?.numberOfAyahs ||
                    (this.currentSurahInfo?.ayahs?.length || 0),
                origin: cached?.revelationType || this.currentSurahInfo?.revelationType,
                number: surahNumber || this.currentSurahInfo?.number,
            };
        },
        currentMobileAyah() {
            const ayahs = Array.isArray(this.filteredAyahs)
                ? this.filteredAyahs
                : [];
            if (!ayahs.length) return null;
            const index = Math.min(
                Math.max(0, Number(this.currentlyPlayingIndex) || 0),
                ayahs.length - 1
            );
            return ayahs[index] || ayahs[0];
        },
        mobilePageLabel() {
            const page = this.currentMobileAyah?.page;
            if (page) return `Page ${page}`;
            return "Page —";
        },
        mobileJuzLabel() {
            const juz = this.currentMobileAyah?.juz;
            return juz ? `Juz ${juz}` : "";
        },
        mobileHizbLabel() {
            const hizb =
                this.currentMobileAyah?.hizb ||
                (typeof this.currentMobileAyah?.hizbQuarter === "number"
                    ? Math.ceil(this.currentMobileAyah.hizbQuarter / 4)
                    : null);
            return hizb ? `Hizb ${hizb}` : "";
        },
        mobileSurahLabel() {
            const surahNumber =
                this.surahDetails?.surahNumber || this.selectedSurah;
            const surahName =
                this.surahDetails?.englishName ||
                this.surahDetails?.name ||
                this.currentSurahInfo?.englishName ||
                this.currentSurahInfo?.name ||
                "Surah";
            if (surahNumber && surahName) {
                return `${surahNumber}. ${surahName}`;
            }
            return surahName;
        },
        mainReciterIds() {
            const primary = this.reciterTimingMap
                ? Object.keys(this.reciterTimingMap)
                : [];
            if (primary.length) return new Set(primary);
            return new Set(this.favoriteReciters || []);
        },
        recitersSorted() {
            if (!Array.isArray(this.reciters)) return [];
            const mainIds = this.mainReciterIds;
            const reciters = mainIds.size
                ? this.reciters.filter((reciter) =>
                    mainIds.has(reciter.identifier)
                )
                : this.reciters;
            const fav = new Set(this.favoriteReciters);
            const synced = new Set(
                this.reciterTimingMap
                    ? Object.keys(this.reciterTimingMap)
                    : []
            );
            return [...reciters].sort((a, b) => {
                const as = synced.has(a.identifier) ? 0 : 1;
                const bs = synced.has(b.identifier) ? 0 : 1;
                if (as !== bs) return as - bs;
                const ap = fav.has(a.identifier) ? 0 : 1;
                const bp = fav.has(b.identifier) ? 0 : 1;
                if (ap !== bp) return ap - bp;
                return (a.englishName || "").localeCompare(b.englishName || "");
            });
        },
        translationsSorted() {
            if (!Array.isArray(this.translations)) return [];
            const fav = new Set(this.favoriteTranslations);
            return [...this.translations].sort((a, b) => {
                const ap = fav.has(a.identifier) ? 0 : 1;
                const bp = fav.has(b.identifier) ? 0 : 1;
                if (ap !== bp) return ap - bp;
                if ((a.flag || "") !== (b.flag || ""))
                    return (a.flag || "").localeCompare(b.flag || "");
                return (a.englishName || "").localeCompare(b.englishName || "");
            });
        },
        currentTranslationName() {
            if (!Array.isArray(this.translations)) return "Translation";
            const match = this.translations.find(
                (t) => t.identifier === this.selectedTranslation
            );
            return match?.englishName || "Translation";
        },
        totalItems() {
            return Array.isArray(this.filteredAyahs)
                ? this.filteredAyahs.length
                : 0;
        },
        currentHeaderOffset() {
            // Precise pixel calculations for the sticky header in both states
            return this.headerCollapsed ? 40 : 180;
        },
        visibleWindow() {
            const start = Math.max(
                0,
                Math.min(this.visibleStart, this.totalItems)
            );
            const end = Math.max(
                start,
                Math.min(this.visibleEnd, this.totalItems)
            );
            const out = [];
            if (!this.surahDetails || !Array.isArray(this.filteredAyahs))
                return out;
            for (let i = start; i < end; i++)
                out.push({ index: i, ayah: this.filteredAyahs[i] });
            return out;
        },
        topSpacerHeight() {
            return Math.max(0, this.visibleStart * this.itemHeight);
        },
        bottomSpacerHeight() {
            const end = Math.max(this.visibleEnd, this.visibleStart);
            const remaining = Math.max(0, this.totalItems - end);
            return remaining * this.itemHeight;
        },
        currentAyahReflections() {
            if (!this.selectedReflectionKey) return [];
            const reflections = this.ayahReflections[this.selectedReflectionKey];
            return Array.isArray(reflections) ? reflections : [];
        },
        canPlaySurah() {
            return (
                !this.isLoading &&
                Array.isArray(this.filteredAyahs) &&
                this.filteredAyahs.length > 0
            );
        },
        canSubmitReflection() {
            const subject = (this.reflectionForm.subject || "").trim();
            const message = (this.reflectionForm.message || "").trim();
            return subject.length > 0 && message.length >= this.reflectionMessageMinLength;
        },
    },
    watch: {
        savedAyahKeys: {
            deep: true,
            handler(next) {
                this.persistSavedAyahs(next);
            },
        },
        searchQuery: function (val) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.debouncedQuery = val;
            }, 300);
        },
        selectedReciter: function (newVal) {
            if (newVal && !this.isLoading) {
                this.isLoading = true;
                this.savePreference("selectedReciter", newVal);
                this.highlightLeadSeconds = this.getReciterLeadOffset(newVal);
                this.currentlyPlayingIndex = 0;
                this.isHighlighted = false;

                this.fetchSurahDetails()
                    .then(() => {
                        this.resetAllAudioPlayers();
                        this.isLoading = false;
                        this.syncVirtualWindowAfterSelection();
                    })
                    .catch(() => {
                        this.isLoading = false;
                    });
            }
        },
        selectedTranslation: function (newVal) {
            if (newVal && !this.isLoading) {
                this.isLoading = true;
                this.savePreference("selectedTranslation", newVal);
                this.currentlyPlayingIndex = 0;
                this.isHighlighted = false;

                this.fetchSurahDetails()
                    .then(() => {
                        this.isLoading = false;
                        this.resetAllAudioPlayers();
                        this.syncVirtualWindowAfterSelection();
                    })
                    .catch(() => {
                        this.isLoading = false;
                    });
            }
        },
        selectedSurah: function (newVal) {
            if (newVal && !this.isLoading) {
                this.isLoading = true;
                this.savePreference("selectedSurah", newVal);
                this.currentlyPlayingIndex = 0;
                this.isHighlighted = false;

                this.fetchSurahDetails()
                    .then(() => {
                        this.resetAllAudioPlayers();
                        this.isLoading = false;
                        this.syncVirtualWindowAfterSelection();
                    })
                    .catch(() => {
                        this.isLoading = false;
                    });
            }
        },
        filteredAyahs: function (newAyahs) {
            const n = newAyahs.length;
            // Reuse arrays to reduce reactive churn
            this.isAudioPlaying.length = n;
            this.isAudioPlaying.fill(false);
            this.isAudioLoading.length = n;
            this.isAudioLoading.fill(false);
            this.progress.length = n;
            this.progress.fill(0);
            this.audioElements.length = n;
            for (let i = 0; i < n; i++)
                if (this.audioElements[i] === undefined)
                    this.audioElements[i] = null;
            // Do not pre-create audio elements; create on-demand for faster starts
            // Reset virtualization window to top ONLY if not navigating
            if (!this.isNavigating) {
                this.visibleStart = 0;
                this.visibleEnd = Math.min(this.windowSize + this.buffer * 2, n);
            }
            this.ayahScrubValue = Math.min(Math.max(1, this.ayahScrubValue), Math.max(n, 1));
            this.$nextTick(this.updateVirtualWindow);
        },
        currentlyPlayingIndex(next) {
            if (typeof next !== "number" || next < 0) return;
            this.ayahScrubValue = next + 1;
            this.syncPlaybackScroll(next);
        },
        showTajweed(next) {
            try {
                localStorage.setItem("suratShowTajweed", next ? "1" : "0");
            } catch (_) { }
            const index = this.currentlyPlayingIndex;
            const audio = this.audioElements[index];
            const ayah = this.filteredAyahs[index];
            if (audio && ayah && audio.duration) {
                this.updateWordTimings(ayah, audio.duration);
            }
            this._lastHighlightIndex = -1;
            this.clearActiveWordHighlight();
        },
        showRealtimeHighlighting(next) {
            try {
                localStorage.setItem(
                    "suratShowRealtimeHighlighting",
                    next ? "1" : "0"
                );
            } catch (_) { }
            if (this.bookmarkAuthenticated) {
                this.savePreference(this.realtimeHighlightPreferenceKey, {
                    enabled: !!next,
                });
            }
            if (!next) {
                this.stopHighlightLoop();
                return;
            }
            this._lastHighlightIndex = -1;
            if (this.isAudioPlaying[this.currentlyPlayingIndex]) {
                this.startHighlightLoop();
            }
        },
        showWordTranslation(next) {
            try {
                localStorage.setItem(
                    "suratShowWordTranslation",
                    next ? "1" : "0"
                );
            } catch (_) { }
        },
    },
    created() {
        // postpone loading until we know the authentication status
    },
    async mounted() {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "auto" });
        }
        window.addEventListener("keydown", this.onKeydown);
        this._keydownHandler = (e) => {
            if (!this.showAudioPlayer) return;
            if (["INPUT", "TEXTAREA"].includes((e.target || {}).tagName))
                return;
            switch (e.key) {
                case " ":
                    e.preventDefault();
                    this.toggleAudioPlayer(this.currentlyPlayingIndex);
                    break;
                case "ArrowRight":
                    this.fastForwardAudio(this.currentlyPlayingIndex);
                    break;
                case "ArrowLeft":
                    this.rewindAudio(this.currentlyPlayingIndex);
                    break;
                case "ArrowDown":
                    this.playNextAyah(this.currentlyPlayingIndex);
                    break;
                case "ArrowUp":
                    this.playPrevAyah(this.currentlyPlayingIndex);
                    break;
            }
        };
        window.addEventListener("keydown", this._keydownHandler);
        this.updateIsMobile();
        window.addEventListener("resize", this.updateIsMobile);
        // Restore dismissal state for next-step card
        try {
            if (localStorage.getItem("suratNextStepDismissed") === "1")
                this.showNextStep = false;
        } catch (_) { }
        await this.initializeBookmarkAuth();
        this.bookmarkEventHandler = (event) =>
            this.handleBookmarksUpdated(event);
        this.bookmarkStorageHandler = (event) =>
            this.handleStorageBookmarksUpdated(event);
        this.visibilityHandler = () => this.handleVisibilityChange();
        window.addEventListener("bookmarks-updated", this.bookmarkEventHandler);
        window.addEventListener("storage", this.bookmarkStorageHandler);
        window.addEventListener("visibilitychange", this.visibilityHandler);
        // Virtualization hooks
        this.$nextTick(() => {
            this.computeListTop();
            this.updateVirtualWindow();
            this.$nextTick(this.calibrateItemHeight);
            window.addEventListener("scroll", this.onScrollVirtual, {
                passive: true,
            });
            window.addEventListener("resize", this.computeListTop, {
                passive: true,
            });
            window.addEventListener("resize", this.calibrateItemHeight, {
                passive: true,
            });
        });
        // Restore next-step minimized state
        try {
            this.nextStepMinimized =
                localStorage.getItem("suratNextStepMinimized") === "1";
        } catch (_) { }
        this.selectedSurah = "1";
        this.selectedReciter = "ar.alafasy";
        this.selectedTranslation = "en.ahmedali";
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.continuousPlayback =
            JSON.parse(localStorage.getItem("continuousPlayback")) ?? false;
        this.playbackSpeed =
            JSON.parse(localStorage.getItem("playbackSpeed")) ?? 1;
        try {
            const storedWordTranslation = localStorage.getItem(
                "suratShowWordTranslation"
            );
            if (storedWordTranslation !== null)
                this.showWordTranslation = storedWordTranslation === "1";
        } catch (_) { }
        Promise.all([
            this.fetchReciters(),
            this.fetchSurahs(),
            this.fetchTranslations(),
            this.fetchSurahDetails(),
        ]).then(() => {
            this.isInitialLoad = false;
        });
        this.loadReciterLeadOffsets();
        this.highlightLeadSeconds = this.getReciterLeadOffset(
            this.selectedReciter
        );
        this.prepareSettingsDraft();
    },
        beforeUnmount() {
            this.isComponentAlive = false;
            this.stopHighlightLoop();
        window.removeEventListener("keydown", this.onKeydown);
        if (this._keydownHandler)
            window.removeEventListener("keydown", this._keydownHandler);
        window.removeEventListener("resize", this.updateIsMobile);
        window.removeEventListener("scroll", this.onScrollVirtual);
        window.removeEventListener("resize", this.computeListTop);
        window.removeEventListener("resize", this.calibrateItemHeight);
        if (this._boundMove) {
            window.removeEventListener("mousemove", this._boundMove);
            window.removeEventListener("touchmove", this._boundMove);
        }
        if (this._boundUp) {
            window.removeEventListener("mouseup", this._boundUp);
            window.removeEventListener("touchend", this._boundUp);
        }
        if (this.bookmarkEventHandler)
            window.removeEventListener(
                "bookmarks-updated",
                this.bookmarkEventHandler
            );
        if (this.bookmarkStorageHandler)
            window.removeEventListener("storage", this.bookmarkStorageHandler);
        if (this.visibilityHandler)
            window.removeEventListener(
                "visibilitychange",
                this.visibilityHandler
            );
        if (this.audioElements && this.audioElements.forEach) {
            this.audioElements.forEach((audio) => {
                if (audio && audio.pause) audio.pause();
                if (audio && audio.remove) audio.remove();
            });
        }
        clearTimeout(this.savedAyahClearTimer);
        clearTimeout(this.bookmarkToastTimer);
        this.bookmarkToastAction = null;
        clearTimeout(this.authAlertTimer);
        if (this._heightMeasureRaf && typeof window !== "undefined") {
            window.cancelAnimationFrame(this._heightMeasureRaf);
            this._heightMeasureRaf = null;
        }
    },
        beforeDestroy() {
            this.stopHighlightLoop();
            window.removeEventListener("keydown", this.onKeydown);
        if (this._keydownHandler)
            window.removeEventListener("keydown", this._keydownHandler);
        window.removeEventListener("resize", this.updateIsMobile);
        window.removeEventListener("scroll", this.onScrollVirtual);
        window.removeEventListener("resize", this.computeListTop);
        window.removeEventListener("resize", this.calibrateItemHeight);
        clearTimeout(this.savedAyahClearTimer);
        clearTimeout(this.bookmarkToastTimer);
            this.bookmarkToastAction = null;
            clearTimeout(this.authAlertTimer);
            if (this.reflectionModalHiddenHandler) {
                const modalEl = document.getElementById(this.reflectionModalId);
                if (modalEl) {
                    modalEl.removeEventListener(
                        "hidden.bs.modal",
                        this.reflectionModalHiddenHandler
                    );
                }
                this.reflectionModalHiddenHandler = null;
            }
            if (this._heightMeasureRaf && typeof window !== "undefined") {
                window.cancelAnimationFrame(this._heightMeasureRaf);
                this._heightMeasureRaf = null;
            }
        },
    methods: {
        showToast(message, timeout = 3500, action = null) {
            this.bookmarkToast = message;
            this.bookmarkToastAction = action;
            clearTimeout(this.bookmarkToastTimer);
            this.bookmarkToastTimer = setTimeout(() => {
                this.bookmarkToast = "";
                this.bookmarkToastAction = null;
            }, timeout);
        },
        prepareSettingsDraft() {
            if (!this.settingsDraft) return;
            this.settingsDraft.showTajweed = !!this.showTajweed;
            this.settingsDraft.showRealtimeHighlighting = !!this.showRealtimeHighlighting;
            this.settingsDraft.showWordTranslation = !!this.showWordTranslation;
        },
        applySettingsDraft() {
            if (!this.settingsDraft) return;
            this.showTajweed = !!this.settingsDraft.showTajweed;
            this.showRealtimeHighlighting = !!this.settingsDraft.showRealtimeHighlighting;
            this.showWordTranslation = !!this.settingsDraft.showWordTranslation;
        },
        applySettingsModal() {
            this.applySettingsDraft();
            const modalEl = document.getElementById(this.settingsModalId);
            if (!modalEl) return;
            this.settingsModalInstance =
                this.settingsModalInstance ||
                Modal.getInstance(modalEl) ||
                new Modal(modalEl);
            this.settingsModalInstance.hide();
        },
        async fetchPreference(key) {
            if (!this.bookmarkAuthenticated) return null;
            const response = await axios.get(`/api/preferences/${key}`);
            return response.data?.value ?? null;
        },
        async savePreference(key, value) {
            if (!this.bookmarkAuthenticated) return;
            try {
                await axios.put(`/api/preferences/${key}`, { value });
            } catch (_) { }
        },
        loadReciterLeadOffsets() {
            try {
                const stored = localStorage.getItem("reciterLeadOffsets");
                this.reciterLeadOffsets = stored ? JSON.parse(stored) : {};
            } catch (_) {
                this.reciterLeadOffsets = {};
            }
        },
        getReciterLeadOffset(reciterId) {
            if (!reciterId) return this.highlightLeadSeconds;
            const raw = this.reciterLeadOffsets[reciterId];
            const parsed = Number(raw);
            if (Number.isFinite(parsed)) return parsed;
            const fallback = this.reciterDefaultLeadOffsets
                ? this.reciterDefaultLeadOffsets[reciterId]
                : null;
            if (Number.isFinite(Number(fallback))) return Number(fallback);
            return this.highlightLeadSeconds;
        },
        announce(message, timeout = 5000) {
            this.screenReaderMessage = message;
            clearTimeout(this.savedAyahClearTimer);
            this.savedAyahClearTimer = setTimeout(() => {
                this.screenReaderMessage = "";
            }, timeout);
        },
        async loadSavedAyahs() {
            if (this.savedAyahsLoaded) return;
            if (!this.bookmarkAuthenticated) {
                this.savedAyahKeys = {};
                this.savedAyahsLoaded = true;
                return;
            }
            await this.initializeSavedAyahStorageKey();
            try {
                const stored =
                    sessionStorage.getItem(this.savedAyahStorageKey) ||
                    localStorage.getItem(this.savedAyahStorageKey);
                if (stored) {
                    this.savedAyahKeys = JSON.parse(stored) || {};
                } else {
                    const legacySession = sessionStorage.getItem(
                        "ic_saved_ayahs_session"
                    );
                    const legacyGlobal = localStorage.getItem("ic_saved_ayahs");
                    const fallback = legacySession || legacyGlobal;
                    this.savedAyahKeys = fallback ? JSON.parse(fallback) : {};
                    if (fallback) {
                        sessionStorage.setItem(
                            this.savedAyahStorageKey,
                            fallback
                        );
                        localStorage.setItem(
                            this.savedAyahStorageKey,
                            fallback
                        );
                    }
                }
            } catch (_) {
                this.savedAyahKeys = {};
            }
            this.savedAyahsLoaded = true;
        },
        buildAyahMessage(ayah, options = {}) {
            if (!ayah) return "";
            const includeAudio = options.includeAudio !== false;
            const surahNumber = this.surahDetails?.surahNumber;
            const surahName =
                this.surahDetails?.englishName || this.surahDetails?.name;
            const ayahNumber = ayah.numberInSurah || ayah.number;
            let header = "Surah";
            if (surahNumber) header += ` ${surahNumber}`;
            if (surahName) header += ` - ${surahName}`;
            if (ayahNumber) header += ` (Ayah ${ayahNumber})`;
            const lines = [header];
            if (ayah.text) lines.push(`Arabic: ${ayah.text}`);
            if (ayah.translation)
                lines.push(`Translation: ${ayah.translation}`);
            if (includeAudio && ayah.audio)
                lines.push(`Listen here: ${ayah.audio}`);
            return lines.filter(Boolean).join("\n\n");
        },
        async copyText(text) {
            if (!text) return false;
            if (
                typeof window !== "undefined" &&
                typeof navigator !== "undefined" &&
                navigator.clipboard?.writeText &&
                window.isSecureContext
            ) {
                try {
                    await navigator.clipboard.writeText(text);
                    return true;
                } catch (_) {
                    // fall back
                }
            }
            try {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "fixed";
                textarea.style.top = "-9999px";
                document.body.appendChild(textarea);
                textarea.select();
                const success = document.execCommand("copy");
                document.body.removeChild(textarea);
                return success;
            } catch (_) {
                return false;
            }
        },
        async copyAyah(ayah) {
            const message = this.buildAyahMessage(ayah, { includeAudio: true });
            if (!message) return;
            const ok = await this.copyText(message);
            if (ok) {
                this.showToast("Ayah copied to clipboard.");
                this.announce("Ayah copied to clipboard.");
            } else {
                this.$toast?.error("Unable to copy ayah.");
                this.announce("Unable to copy ayah.");
            }
        },
        async syncSavedAyahsFromApi() {
            if (!this.bookmarkAuthenticated) return;
            try {
                const response = await axios.get("/api/ayah-bookmarks");
                const bookmarks = response.data?.data || [];
                if (!Array.isArray(bookmarks)) return;
                const next = {};
                bookmarks.forEach((bookmark) => {
                    const surahNumber = Number(
                        bookmark.surah_number || bookmark.ayah?.surah_id
                    );
                    const ayahNumber = Number(
                        bookmark.ayah_number || bookmark.ayah_num
                    );
                    const ayahInSurah = Number(bookmark.ayah?.ayah_id);
                    if (surahNumber && ayahNumber) {
                        next[this.buildAyahKey(surahNumber, ayahNumber)] =
                            bookmark.id || true;
                    }
                    if (surahNumber && ayahInSurah) {
                        next[this.buildAyahKey(surahNumber, ayahInSurah)] =
                            bookmark.id || true;
                    }
                });
                this.savedAyahKeys = next;
            } catch (_) {
                // Ignore sync failures; local state still works.
            }
        },
        notifyBookmarkChange(source = this.bookmarkInstanceId) {
            if (typeof window === "undefined") return;
            const token = `${Date.now()}-${source}`;
            try {
                localStorage.setItem("bookmarkRefresh", token);
            } catch (_) {
                // ignore private mode errors
            }
            window.dispatchEvent(
                new CustomEvent("bookmarks-updated", {
                    detail: { token, instance: source },
                })
            );
        },
        handleBookmarksUpdated(event) {
            if (event?.detail?.instance === this.bookmarkInstanceId) return;
            this.syncSavedAyahsFromApi();
        },
        handleStorageBookmarksUpdated(event) {
            if (event.key !== "bookmarkRefresh") return;
            this.syncSavedAyahsFromApi();
        },
        handleVisibilityChange() {
            if (document.visibilityState === "visible") {
                this.syncSavedAyahsFromApi();
            }
        },
        async initializeBookmarkAuth() {
            await this.evaluateBookmarkAuth();
            if (!this.bookmarkAuthenticated) {
                this.savedAyahKeys = {};
                this.savedAyahsLoaded = true;
                return;
            }
            await this.loadSavedAyahs();
            await this.initializeReflectionCacheKey();
            await this.syncSavedAyahsFromApi();
            if (this.bookmarkAuthenticated) {
                await this.loadAyahReflections();
            }
        },
        async evaluateBookmarkAuth() {
            const userId = await fetchUserIdFromApi();
            this.bookmarkAuthenticated = !!userId;
            return this.bookmarkAuthenticated;
        },
        clearSavedBookmarks() {
            this.savedAyahKeys = {};
            try {
                const key =
                    this.savedAyahStorageKey || "ic_saved_ayahs_session";
                sessionStorage.removeItem(key);
                localStorage.removeItem(key);
            } catch (_) {
                // ignore
            }
        },
        buildAyahKey(surahNumber, ayahNumber) {
            return `${surahNumber}:${ayahNumber}`;
        },
        isAyahSaved(ayah) {
            if (!ayah || !this.surahDetails) return false;
            const surahNumber = Number(this.surahDetails.surahNumber);
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            return !!this.savedAyahKeys[
                this.buildAyahKey(surahNumber, ayahNumber)
            ];
        },
        getBookmarkId(ayah) {
            if (!ayah || !this.surahDetails) return null;
            const surahNumber = Number(this.surahDetails.surahNumber);
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            const val =
                this.savedAyahKeys[this.buildAyahKey(surahNumber, ayahNumber)];
            return val === true ? null : val; // handle historic boolean values
        },
        async toggleBookmark(ayah) {
            if (!this.bookmarkAuthenticated) {
                const isAuthed = await this.ensureAuthenticated(
                    "Please log in to manage bookmarks.",
                    { ayah }
                );
                if (!isAuthed) return;
            }
            if (this.isAyahSaved(ayah)) {
                this.removeBookmark(ayah);
            } else {
                this.quickSaveBookmark(ayah);
            }
        },
        triggerAyahFeedback(key, text, cssClass, icon, link = "", linkText = "") {
            // Use reactive assignment
            this.feedbackMessages = {
                ...this.feedbackMessages,
                [key]: { text, class: cssClass, icon, link, linkText },
            };

            setTimeout(() => {
                const next = { ...this.feedbackMessages };
                delete next[key];
                this.feedbackMessages = next;
            }, 6000);
        },
        async quickSaveBookmark(ayah) {
            if (!this.surahDetails || !ayah) return;
            const surahNumber = Number(this.surahDetails.surahNumber);
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            const key = this.buildAyahKey(surahNumber, ayahNumber);

            // Optimistic update
            const prevKeys = { ...this.savedAyahKeys };
            this.savedAyahKeys = { ...this.savedAyahKeys, [key]: true };

            // Local feedback
            this.triggerAyahFeedback(
                key,
                "Bookmark saved successfully",
                "bg-dark text-white",
                "check"
            );

            try {
                const payload = {
                    surah_number: surahNumber,
                    ayah_number: ayahNumber,
                    surah_name:
                        this.surahDetails.englishName ||
                        this.surahDetails.name ||
                        "Surah",
                    ayah_verse_ar: ayah.text || "",
                    ayah_verse_en: ayah.translation || "",
                    folder_ids: [],
                };
                const response = await axios.post(
                    "/api/ayah-bookmarks",
                    payload
                );
                const bookmark = response.data?.bookmark;

                if (bookmark && bookmark.id) {
                    this.savedAyahKeys = {
                        ...this.savedAyahKeys,
                        [key]: bookmark.id,
                    };
                    this.showToast("Bookmark saved.", 4000, {
                        text: "Edit",
                        handler: () => {
                            this.openBookmarkModal(ayah);
                            const modalEl =
                                document.getElementById("bookmarkModal");
                            if (modalEl) {
                                const modal =
                                    Modal.getInstance(modalEl) ||
                                    new Modal(modalEl);
                                modal.show();
                            }
                        },
                    });
                    this.announce("Ayah saved to bookmarks.");
                    this.notifyBookmarkChange();
                }
            } catch (error) {
                // Revert
                this.savedAyahKeys = prevKeys;
                this.triggerAyahFeedback(
                    key,
                    "Error saving",
                    "bg-danger text-white",
                    "trash"
                );
                this.showToast("Failed to save bookmark.", 3000);
            }
        },
        async removeBookmark(ayah) {
            if (!this.surahDetails || !ayah) return;
            const surahNumber = Number(this.surahDetails.surahNumber);
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            const key = this.buildAyahKey(surahNumber, ayahNumber);
            const bookmarkId = this.getBookmarkId(ayah);

            if (!bookmarkId) {
                // fallback handling
                const next = { ...this.savedAyahKeys };
                delete next[key];
                this.savedAyahKeys = next;
                this.triggerAyahFeedback(
                    key,
                    "Bookmark removed",
                    "bg-dark text-white",
                    "trash"
                );
                return;
            }

            // Optimistic update
            const prevKeys = { ...this.savedAyahKeys };
            const next = { ...this.savedAyahKeys };
            delete next[key];
            this.savedAyahKeys = next;

            // Local feedback
            this.triggerAyahFeedback(
                key,
                "Bookmark removed",
                "bg-dark text-white",
                "trash"
            );

            try {
                await axios.delete(`/api/ayah-bookmarks/${bookmarkId}`);
                this.showToast("Bookmark removed.", 2000);
                this.announce("Bookmark removed.");
                this.notifyBookmarkChange();
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Already deleted on server, so this is a success state for us.
                    this.showToast("Bookmark removed.", 2000);
                    this.announce("Bookmark removed.");
                    this.notifyBookmarkChange();
                } else {
                    // Revert
                    this.savedAyahKeys = prevKeys;
                    this.triggerAyahFeedback(
                        key,
                        "Error removing",
                        "bg-danger text-white",
                        "trash"
                    );
                    this.showToast("Failed to remove bookmark.", 3000);
                }
            }
        },
        async openBookmarkModal(ayah) {
            if (!this.surahDetails || !ayah) return;
            if (!this.bookmarkAuthenticated) {
                const isAuthed = await this.ensureAuthenticated(
                    "Please log in to manage bookmarks.",
                    { ayah }
                );
                if (!isAuthed) return;
            }
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            this.activeAyah = {
                surah_number: Number(this.surahDetails.surahNumber),
                surah_name:
                    this.surahDetails.englishName ||
                    this.surahDetails.name ||
                    "Surah",
                ayah_number: ayahNumber,
                ayah_verse_ar: ayah.text || "",
                ayah_verse_en: ayah.translation || "",
            };

            this.$nextTick(() => {
                const modalEl = document.getElementById("bookmarkModal");
                if (modalEl) {
                    const modal =
                        Modal.getInstance(modalEl) || new Modal(modalEl);
                    modal.show();
                }
            });
        },
        openSurahInfo(surah) {
            if (!surah) return;
            this.surahInfo = { ...surah };
            this.surahInfoText = "";
            this.surahInfoShortText = "";
            this.surahInfoSource = "";
            this.surahInfoSourceUrl = "";
            this.surahInfoError = "";
            this.surahInfoLoading = true;
            this.surahInfoFontSize =
                Number(this.surahInfoFontSize) || 16;
            this.$nextTick(() => {
                const modalEl = document.getElementById(this.surahInfoModalId);
                if (!modalEl) return;
                this.surahInfoModalInstance =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                this.surahInfoModalInstance.show();
            });
            this.fetchSurahInfoDetails(Number(surah.number));
        },
        increaseSurahInfoFontSize() {
            const next = Math.min(
                this.surahInfoFontSize + 1,
                this.surahInfoFontSizeMax
            );
            this.surahInfoFontSize = next;
        },
        decreaseSurahInfoFontSize() {
            const next = Math.max(
                this.surahInfoFontSize - 1,
                this.surahInfoFontSizeMin
            );
            this.surahInfoFontSize = next;
        },
        async fetchSurahInfoDetails(surahNumber) {
            if (!surahNumber) return;
            try {
                const { data } = await this.cachedFetchJSON(
                    `https://api.quran.com/api/v4/chapters/${surahNumber}/info?language=en`,
                    `cache:surah-info:${surahNumber}`,
                    7 * 24 * 60 * 60 * 1000
                );
                const info = data?.chapter_info || {};
                this.surahInfoText = this.normalizeSurahInfoHtml(info.text);
                this.surahInfoShortText = this.normalizeSurahInfoHtml(
                    info.short_text
                );
                this.surahInfoSource = info.source || "";
                this.surahInfoSourceUrl = info.source_url || "";
                if (!this.surahInfoSource) {
                    this.surahInfoSource = "Quran.com";
                    this.surahInfoSourceUrl = "https://quran.com";
                }
                this.surahInfoLoading = false;
            } catch (error) {
                this.surahInfoLoading = false;
                this.surahInfoError =
                    "Unable to load detailed surah info right now.";
                console.error("Error fetching surah info:", error);
            }
        },
        normalizeSurahInfoHtml(html) {
            if (!html) return "";
            if (typeof window === "undefined" || !window.DOMParser)
                return html;
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                doc.querySelectorAll("a[href]").forEach((link) => {
                    const text = (link.textContent || "").toLowerCase();
                    const href = link.getAttribute("href") || "";
                    let targetHref = href;
                    let hostOverride = "";

                    if (href.startsWith("http")) {
                        try {
                            const url = new URL(href);
                            if (
                                url.hostname.includes("quran.com") ||
                                url.hostname.includes("api.quran.com")
                            ) {
                                hostOverride = "quran.com";
                            } else if (url.hostname.includes("sunnah.com")) {
                                hostOverride = "sunnah.com";
                            }
                            if (hostOverride) {
                                url.hostname = hostOverride;
                                url.protocol = "https:";
                                targetHref = url.toString();
                            }
                        } catch (_) { }
                    } else {
                        const isHadith =
                            text.includes("hadith") ||
                            text.includes("sunnah") ||
                            href.includes("sunnah") ||
                            href.includes("hadith");
                        const base = isHadith
                            ? "https://sunnah.com"
                            : "https://quran.com";
                        targetHref = `${base}${href.startsWith("/") ? "" : "/"}${href}`;
                    }

                    link.setAttribute("href", targetHref);
                    link.setAttribute("target", "_blank");
                    link.setAttribute("rel", "noopener noreferrer");
                });
                return doc.body.innerHTML;
            } catch (_) {
                return html;
            }
        },
        onBookmarkSaved(payload) {
            if (!payload) return;
            const source = payload.bookmark || payload;
            const surahNumber = Number(source.surah_number);
            const ayahNumber = Number(source.ayah_number || source.ayah_num);
            if (!surahNumber || !ayahNumber) return;

            this.announce("Ayah saved to bookmarks.");
            this.showToast("Bookmark saved successfully.", 4000);

            const next = { ...this.savedAyahKeys };
            next[this.buildAyahKey(surahNumber, ayahNumber)] =
                source.id || true;
            this.savedAyahKeys = next;
        },
        async onBookmarksLinkClick() {
            const isAuthed = await this.ensureAuthenticated();
            if (isAuthed) {
                window.open("/bookmarks", "_blank");
            }
        },
        async onNotesLinkClick() {
            const isAuthed = await this.ensureAuthenticated(
                "Please log in to save and view reflections."
            );
            if (isAuthed) {
                window.open("/notes", "_blank");
            }
        },
        hasReflection(ayah) {
            if (!ayah) return false;
            const surahNumber = Number(this.surahDetails?.surahNumber || this.selectedSurah);
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            if (!surahNumber || !ayahNumber) return false;
            const key = this.buildAyahKey(surahNumber, ayahNumber);
            const stored = this.ayahReflections[key];
            if (Array.isArray(stored)) {
                return stored.length > 0;
            }
            if (stored && typeof stored === "object" && Object.keys(stored).length) {
                return true;
            }
            return false;
        },
        async openReflectionModal(ayah) {
            if (!ayah) return;
            const surahNumber = Number(this.surahDetails?.surahNumber || this.selectedSurah);
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            if (!surahNumber || !ayahNumber) return;

            const isAuthed = await this.ensureAuthenticated(
                "Please log in to save reflections.",
                { ayah }
            );
            if (!isAuthed) return;

            if (this.bookmarkAuthenticated && !Object.keys(this.ayahReflections).length) {
                await this.loadAyahReflections();
            }

            const surahLabel =
                this.surahDetails?.englishName ||
                this.surahDetails?.name ||
                "Surah";
            const surahName = `${surahNumber} - ${surahLabel}`;

            this.selectedAyahForReflection = {
                surahNumber,
                ayahNumber,
                surahName,
                ayahArabic: ayah.text || "",
                ayahTranslation: ayah.translation || "",
            };

            const key = this.buildAyahKey(surahNumber, ayahNumber);
            this.selectedReflectionKey = key;
            this.clearReflectionForm();
            this.reflectionErrorMessage = "";
            this.isSavingReflection = false;

            this.$nextTick(() => {
                const modalEl = document.getElementById(this.reflectionModalId);
                if (!modalEl) return;
                this.reflectionModalInstance =
                    Modal.getInstance(modalEl) || new Modal(modalEl);
                if (this.reflectionModalHiddenHandler) {
                    modalEl.removeEventListener("hidden.bs.modal", this.reflectionModalHiddenHandler);
                }
                const handler = () => this.onReflectionModalHidden();
                modalEl.addEventListener("hidden.bs.modal", handler);
                this.reflectionModalHiddenHandler = handler;
                this.reflectionModalInstance.show();
            });
        },
        hideReflectionModal() {
            const modalEl = document.getElementById(this.reflectionModalId);
            const modal =
                this.reflectionModalInstance ||
                (modalEl ? Modal.getInstance(modalEl) : null);
            if (modal) {
                modal.hide();
            }
            this.cancelReflectionEdit();
        },
        onReflectionModalHidden() {
            const modalEl = document.getElementById(this.reflectionModalId);
            if (modalEl && this.reflectionModalHiddenHandler) {
                modalEl.removeEventListener(
                    "hidden.bs.modal",
                    this.reflectionModalHiddenHandler
                );
            }
            this.reflectionModalHiddenHandler = null;
            this.reflectionModalInstance = null;
            this.selectedAyahForReflection = null;
            this.selectedReflectionKey = "";
            this.clearReflectionForm();
            this.reflectionErrorMessage = "";
            this.reflectionSuccessMessage = "";
            if (this.reflectionSuccessTimeout) {
                clearTimeout(this.reflectionSuccessTimeout);
                this.reflectionSuccessTimeout = null;
            }
        },
        clearReflectionForm() {
            this.reflectionForm.subject = "";
            this.reflectionForm.message = "";
        },
        applySubjectSuggestion(text) {
            this.reflectionForm.subject = text;
        },
        applyMessageSuggestion(text) {
            this.reflectionForm.message = text;
        },
        startEditingReflection(note, index) {
            if (!note) return;
            this.editingReflectionId = note.id || null;
            this.editingReflectionIndex = typeof index === "number" ? index : null;
            this.reflectionForm.subject = note.subject || "";
            this.reflectionForm.message = note.message || "";
            this.reflectionErrorMessage = "";
            this.reflectionSuccessMessage = "";
        },
        cancelReflectionEdit() {
            this.editingReflectionId = null;
            this.editingReflectionIndex = null;
            this.clearReflectionForm();
        },
        async deleteReflection(note, index) {
            if (!note) return;
            const proceed = confirm("Delete this reflection?");
            if (!proceed) return;
            if (note.id) {
                try {
                    await axios.delete(`/api/delete-notes/${note.id}`);
                } catch (error) {
                    console.error("Delete reflection failed", error);
                    this.showToast("Unable to delete reflection.", 3000);
                    return;
                }
            }
            const key = this.selectedReflectionKey;
            if (!key) return;
            const current = Array.isArray(this.ayahReflections[key]) ? [...this.ayahReflections[key]] : [];
            current.splice(index, 1);
            this.ayahReflections = {
                ...this.ayahReflections,
                [key]: current,
            };
            if (this.editingReflectionIndex === index) {
                this.cancelReflectionEdit();
            }
            this.showToast("Reflection deleted.", 2000);
        },
        toggleReflectionHelp() {
            this.showReflectionHighlight = false;
        },
        suggestionTrackStyle(rowIndex) {
            const base = 32 + (rowIndex - 1) * 5;
            return {
                animationDuration: `${base}s`,
                animationDirection: rowIndex % 2 === 0 ? "reverse" : "normal",
            };
        },
        async submitReflectionForm() {
            const subject = (this.reflectionForm.subject || "").trim();
            const message = (this.reflectionForm.message || "").trim();
            if (!subject) {
                this.reflectionErrorMessage = "Please enter a subject for your reflection.";
                return;
            }
            if (!message) {
                this.reflectionErrorMessage = "Add a reflection message to continue.";
                return;
            }
            if (message.length < this.reflectionMessageMinLength) {
                this.reflectionErrorMessage = `Reflection must be at least ${this.reflectionMessageMinLength} characters.`;
                return;
            }
            if (!this.selectedAyahForReflection) return;

            this.reflectionErrorMessage = "";
            this.isSavingReflection = true;
            const {
                surahNumber,
                ayahNumber,
                surahName,
                ayahArabic,
                ayahTranslation,
            } = this.selectedAyahForReflection;
            const payload = {
                surah_name: surahName,
                ayah_num: String(ayahNumber),
                ayah_verse_ar: ayahArabic,
                ayah_verse_en: ayahTranslation,
                ayah_info: subject,
                ayah_notes: message,
                is_speech_to_text: false,
            };

            const isEditing = !!this.editingReflectionId;
            try {
                const response = isEditing
                    ? await axios.post(`/api/update-notes/${this.editingReflectionId}`, payload)
                    : await axios.post("/api/submit-note", payload);
                const note = response.data?.note || null;
                const key = this.buildAyahKey(surahNumber, ayahNumber);
                const entryPayload = {
                    id: note?.id || this.editingReflectionId || null,
                    subject,
                    message,
                    surah_name: payload.surah_name,
                    ayah_verse_ar: ayahArabic,
                    ayah_verse_en: ayahTranslation,
                };
                const existing = Array.isArray(this.ayahReflections[key])
                    ? [...this.ayahReflections[key]]
                    : [];
                if (!isEditing) {
                    this.ayahReflections = {
                        ...this.ayahReflections,
                        [key]: [...existing, entryPayload],
                    };
                } else {
                    const targetIndex =
                        typeof this.editingReflectionIndex === "number"
                            ? this.editingReflectionIndex
                            : existing.findIndex((item) => item.id === this.editingReflectionId);
                    if (targetIndex >= 0) {
                        existing[targetIndex] = {
                            ...existing[targetIndex],
                            ...entryPayload,
                        };
                    }
                    this.ayahReflections = {
                        ...this.ayahReflections,
                        [key]: existing,
                    };
                    this.cancelReflectionEdit();
                    this.reflectionSuccessMessage = "Reflection updated.";
                }
                if (!isEditing) {
                    this.flagReflectionKey(key);
                    this.showToast("Reflection saved.", 4000);
                    this.announce("Reflection saved.");
                    this.reflectionSuccessMessage = "Your reflection has been saved.";
                    if (this.reflectionSuccessTimeout) {
                        clearTimeout(this.reflectionSuccessTimeout);
                    }
                    this.reflectionSuccessTimeout = setTimeout(() => {
                        this.hideReflectionModal();
                        this.reflectionSuccessTimeout = null;
                    }, 1200);
                }
            } catch (error) {
                console.error("Error saving reflection", error);
                this.reflectionErrorMessage =
                    error?.response?.data?.message ||
                    "Unable to save reflection right now.";
                this.showToast(
                    "Unable to save reflection. Please try again.",
                    3000
                );
            } finally {
                this.isSavingReflection = false;
            }
        },
        async loadAyahReflections() {
            if (!this.bookmarkAuthenticated) return;
            try {
                const response = await axios.get("/api/fetch-notes");
                const notes = Array.isArray(response.data)
                    ? response.data
                    : response.data?.notes || [];
                const next = {};
                notes.forEach((note) => {
                    const surahNumber = this.extractSurahNumberFromNoteName(
                        note.surah_name
                    );
                    const ayahNumber = Number(note.ayah_num);
                    if (!surahNumber || !ayahNumber) return;
                    const key = this.buildAyahKey(surahNumber, ayahNumber);
                    const entry = {
                        id: note.id,
                        subject: (note.ayah_info || "").trim(),
                        message: this.stripHtmlTags(note.ayah_notes),
                        surah_name: note.surah_name,
                        ayah_verse_ar: note.ayah_verse_ar,
                        ayah_verse_en: note.ayah_verse_en,
                    };
                    const existingEntries = next[key];
                    next[key] = Array.isArray(existingEntries)
                        ? [...existingEntries, entry]
                        : [entry];
                });
                const cachedKeys = {};
                Object.keys(next).forEach((key) => {
                    cachedKeys[key] = true;
                });
                this.ayahReflectionKeys = {
                    ...(this.ayahReflectionKeys || {}),
                    ...cachedKeys,
                };
                this.persistReflectionKeys(this.ayahReflectionKeys);
                this.persistGeneralReflectionKeys(this.ayahReflectionKeys);
                this.ayahReflections = next;
            } catch (error) {
                console.error("Error loading reflections", error);
            }
        },
        extractSurahNumberFromNoteName(name) {
            if (!name) return null;
            const trimmed = name.trim();
            const match = /^(\d+)/.exec(trimmed);
            if (match) {
                return Number(match[1]);
            }
            const fallback = trimmed.split(/\D+/);
            for (const part of fallback) {
                const num = Number(part);
                if (!Number.isNaN(num)) return num;
            }
            return null;
        },
        stripHtmlTags(value) {
            if (!value) return "";
            const div = document.createElement("div");
            div.innerHTML = value;
            return (div.textContent || div.innerText || "").trim();
        },
        async ensureAuthenticated(
            message = "Please log in to access bookmarks & reflections.",
            options = {}
        ) {
            const userId = await fetchUserIdFromApi();
            const isAuthed = !!userId;
            if (isAuthed) {
                this.bookmarkAuthenticated = true;
                this.bookmarkStorageUserId = userId;
                await this.initializeReflectionCacheKey();
                return true;
            }
            this.bookmarkAuthenticated = false;
            if (options.ayah) {
                this.showAyahAuthWarning(options.ayah, message);
            } else {
                this.showAuthAlert(message);
            }
            return false;
        },
        showAyahAuthWarning(ayah, message) {
            if (!ayah) return;
            const surahNumber = Number(this.surahDetails?.surahNumber || this.selectedSurah);
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            if (!surahNumber || !ayahNumber) return;
            const key = this.buildAyahKey(surahNumber, ayahNumber);
            this.triggerAyahFeedback(
                key,
                message,
                "feedback-warning",
                "warning",
                "/login",
                "Log in"
            );
        },
        showAuthAlert(message = "Please log in to access bookmarks & reflections.") {
            const fallbackAyah =
                this.filteredAyahs?.[this.selectedCardIndex] ||
                this.filteredAyahs?.[this.currentlyPlayingIndex] ||
                this.filteredAyahs?.[0];
            if (fallbackAyah) {
                this.showAyahAuthWarning(fallbackAyah, message);
                return;
            }
            this.showToast(message, 6000);
        },
        async persistSavedAyahs(next) {
            if (!this.bookmarkAuthenticated) return;
            try {
                await this.initializeSavedAyahStorageKey();
                const key =
                    this.savedAyahStorageKey || "ic_saved_ayahs_session";
                const payload = JSON.stringify(next);
                sessionStorage.setItem(key, payload);
                localStorage.setItem(key, payload);
            } catch (_) {
                // no-op
            }
        },
        async initializeSavedAyahStorageKey() {
            if (
                this.savedAyahStorageKey &&
                this.savedAyahStorageKey.startsWith("ic_saved_ayahs_user_") &&
                this.bookmarkStorageUserId
            ) {
                return;
            }
            await this.fetchBookmarkStorageUserId();
            this.savedAyahStorageKey = this.buildSavedAyahStorageKey();
        },
        buildReflectionCacheKey() {
            if (this.bookmarkStorageUserId) {
                return `ic_reflection_keys_user_${this.bookmarkStorageUserId}`;
            }
            if (!this.bookmarkAnonId) {
                return "";
            }
            return `ic_reflection_keys_anon_${this.bookmarkAnonId}`;
        },
        async initializeReflectionCacheKey() {
            await this.fetchBookmarkStorageUserId();
            const nextKey = this.buildReflectionCacheKey();
            if (nextKey && this.reflectionCacheKey === nextKey) {
                this.loadReflectionKeyCache();
                return;
            }
            this.reflectionCacheKey = nextKey;
            this.loadReflectionKeyCache();
        },
        loadReflectionKeyCache() {
            const generalKeys = this.loadGeneralReflectionKeyCache();
            let combined = { ...(generalKeys || {}) };
            if (this.reflectionCacheKey) {
                try {
                    const stored = localStorage.getItem(this.reflectionCacheKey);
                    if (stored) {
                        const parsed = JSON.parse(stored || "{}");
                        combined = {
                            ...combined,
                            ...parsed,
                        };
                    }
                } catch (_) {
                    // ignore JSON errors
                }
            }
            this.ayahReflectionKeys = combined;
        },
        loadGeneralReflectionKeyCache() {
            if (!this.reflectionGeneralStorageKey) return {};
            try {
                const stored = localStorage.getItem(this.reflectionGeneralStorageKey);
                return stored ? JSON.parse(stored) : {};
            } catch (_) {
                return {};
            }
        },
        persistReflectionKeys(keys = this.ayahReflectionKeys) {
            if (!this.reflectionCacheKey) return;
            try {
                const payload = JSON.stringify(keys || {});
                localStorage.setItem(this.reflectionCacheKey, payload);
            } catch (_) {
                // no-op
            }
        },
        persistGeneralReflectionKeys(keys = this.ayahReflectionKeys) {
            if (!this.reflectionGeneralStorageKey) return;
            try {
                const payload = JSON.stringify(keys || {});
                localStorage.setItem(this.reflectionGeneralStorageKey, payload);
            } catch (_) {
                // no-op
            }
        },
        flagReflectionKey(key) {
            if (!key) return;
            const next = {
                ...(this.ayahReflectionKeys || {}),
                [key]: true,
            };
            this.ayahReflectionKeys = next;
            this.persistReflectionKeys(next);
            this.persistGeneralReflectionKeys(next);
        },
        buildSavedAyahStorageKey() {
            const base = "ic_saved_ayahs";
            if (this.bookmarkStorageUserId) {
                return `${base}_user_${this.bookmarkStorageUserId}`;
            }
            if (!this.bookmarkAnonId) {
                let anon = sessionStorage.getItem("ic_saved_ayahs_anon_id");
                if (!anon) {
                    anon = `anon-${Math.random().toString(36).slice(2)}`;
                    sessionStorage.setItem("ic_saved_ayahs_anon_id", anon);
                }
                this.bookmarkAnonId = anon;
            }
            return `${base}_anon_${this.bookmarkAnonId}`;
        },
        async fetchBookmarkStorageUserId() {
            if (this.bookmarkStorageUserId) {
                return this.bookmarkStorageUserId;
            }
            const userId = await fetchUserIdFromApi();
            if (userId) {
                this.bookmarkStorageUserId = userId;
            }
            return this.bookmarkStorageUserId;
        },
        onAyahDragStart(ayah, event) {
            if (!event || !this.surahDetails || !ayah) return;
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            const payload = {
                surah_number: Number(this.surahDetails.surahNumber),
                surah_name:
                    this.surahDetails.englishName ||
                    this.surahDetails.name ||
                    "Surah",
                ayah_number: ayahNumber,
                ayah_verse_ar: ayah.text || "",
                ayah_verse_en: ayah.translation || "",
            };
            event.dataTransfer.setData("text/plain", JSON.stringify(payload));
            event.dataTransfer.effectAllowed = "copyMove";
        },
        toggleNextStepMinimized() {
            this.nextStepMinimized = !this.nextStepMinimized;
            try {
                localStorage.setItem(
                    "suratNextStepMinimized",
                    this.nextStepMinimized ? "1" : "0"
                );
            } catch (_) { }
        },
        dismissNextStep() {
            this.showNextStep = false;
            try {
                localStorage.setItem("suratNextStepDismissed", "1");
            } catch (_) { }
        },
        calibrateItemHeight(force = false) {
            try {
                const nodes = this.$refs.audioCard;
                if (!nodes) return;
                const refs = Array.isArray(nodes) ? nodes : [nodes];
                const maxHeight = refs.reduce((max, node) => {
                    if (!node) return max;
                    const rect = node.getBoundingClientRect();
                    return rect.height > max ? rect.height : max;
                }, 0);
                if (!maxHeight) return;
                const candidate = Math.round(maxHeight + 24);
                if (!force && Math.abs(this.itemHeight - candidate) < 2) return;
                this.itemHeight = candidate;
                this.updateVirtualWindow();
            } catch (_) { }
        },
        scheduleHeightCalibration(force = false) {
            if (typeof window === "undefined" || !window.requestAnimationFrame) return;
            if (this._heightMeasureRaf) {
                window.cancelAnimationFrame(this._heightMeasureRaf);
                this._heightMeasureRaf = null;
            }
            this._heightMeasureRaf = window.requestAnimationFrame(() => {
                this._heightMeasureRaf = null;
                this.calibrateItemHeight(force);
            });
        },
        computeListTop() {
            try {
                const el = this.$refs.listContainer;
                if (!el) {
                    this.listTop = 0;
                    return;
                }
                const rect = el.getBoundingClientRect();
                this.listTop = rect.top + window.scrollY;
            } catch (_) {
                this.listTop = 0;
            }
        },
        onScrollVirtual() {
            const maxScroll =
                Math.max(
                    document.documentElement.scrollHeight - window.innerHeight,
                    0
                ) || 1;
            const show = window.scrollY > maxScroll * 0.3;
            if (this.showScrollTop !== show) this.showScrollTop = show;
            this.isManualScrolling = true;
            clearTimeout(this.manualScrollTimer);
            this.manualScrollTimer = setTimeout(() => {
                this.isManualScrolling = false;
            }, 1000);
            this.updateVirtualWindow();
        },
        updateVirtualWindow() {
            const n = this.filteredAyahs ? this.filteredAyahs.length : 0;
            if (n === 0) {
                this.visibleStart = 0;
                this.visibleEnd = 0;
                return;
            }
            // Account for the dynamic sticky header offset when determining which card is "active" at the top
            const offset = this.currentHeaderOffset;
            const y = window.scrollY - this.listTop + offset;
            
            // If we are at or above the list top, pin to start
            if (window.scrollY <= this.listTop + 5) {
                const start = 0;
                const end = Math.min(
                    n,
                    this.windowSize + this.buffer * 2
                );
                if (start !== this.visibleStart || end !== this.visibleEnd) {
                    this.visibleStart = start;
                    this.visibleEnd = end;
                    this.scheduleHeightCalibration(true);
                }
                return;
            }
            const approxIndex = Math.max(
                0,
                Math.floor(y / Math.max(1, this.itemHeight))
            );
            const start = Math.max(0, approxIndex - this.buffer);
            const end = Math.min(n, start + this.windowSize + this.buffer * 2);
            if (start !== this.visibleStart || end !== this.visibleEnd) {
                this.visibleStart = start;
                this.visibleEnd = end;
                
                // UX Improvement: Sync sidebar highlights on scroll (if not playing)
                const isPlayingAny = Object.values(this.isAudioPlaying).some(v => v);
                if (!this.isNavigating && !isPlayingAny && this.filteredAyahs?.[approxIndex]) {
                    // Critical: Use a silent update or check isManualScrolling 
                    // to prevent syncPlaybackScroll from snap-jumping during user scroll.
                    this.currentlyPlayingIndex = approxIndex;
                    this.isHighlighted = true;
                    this.selectedJuz = this.filteredAyahs[approxIndex].juz;
                }
                this.scheduleHeightCalibration(true);
            }
        },
        syncVirtualWindowAfterSelection() {
            const total = this.filteredAyahs ? this.filteredAyahs.length : 0;
            this.visibleStart = 0;
            this.visibleEnd = Math.min(
                total,
                this.windowSize + this.buffer * 2
            );
            this.$nextTick(() => {
                this.computeListTop();
                this.updateVirtualWindow();
            });
        },
        readDeepLinkTarget() {
            if (typeof window === "undefined") return null;
            const params = new URLSearchParams(window.location.search || "");
            const surah = Number(params.get("surah"));
            const ayah = Number(params.get("ayah"));
            if (!surah) return null;
            return { surah, ayah: ayah || null };
        },
        maybeScrollToDeepLink() {
            if (
                this.deepLinkHandled ||
                !this.deepLinkTarget ||
                !this.surahDetails
            )
                return;
            const surahNumber = Number(this.deepLinkTarget.surah);
            if (
                !surahNumber ||
                Number(this.surahDetails.surahNumber) !== surahNumber
            )
                return;
            const ayahNumber = Number(this.deepLinkTarget.ayah);
            if (!ayahNumber) {
                this.deepLinkHandled = true;
                return;
            }
            const index = ayahNumber - 1;
            if (
                !Array.isArray(this.surahDetails.ayahs) ||
                index < 0 ||
                index >= this.surahDetails.ayahs.length
            ) {
                this.deepLinkHandled = true;
                return;
            }
            this.deepLinkHandled = true;
            this.scrollToAyahIndex(index);
        },
        scrollToAyahIndex(index) {
            const total = Array.isArray(this.filteredAyahs)
                ? this.filteredAyahs.length
                : 0;
            if (!total || index < 0 || index >= total) {
                this.isNavigating = false;
                return;
            }
            
            // Ensure target is in visible start/end for virtual scroll
            const start = Math.max(0, index - this.buffer);
            const end = Math.min(
                total,
                start + this.windowSize + this.buffer * 2
            );
            
            if (index < this.visibleStart || index >= this.visibleEnd) {
                this.visibleStart = start;
                this.visibleEnd = end;
            }

            // Reduced nested ticks for an "instant" jump feel
            this.$nextTick(() => {
                this.computeListTop();
                this.calibrateItemHeight();

                const offset = this.currentHeaderOffset;
                const targetTop = this.listTop + index * this.itemHeight - offset;
                
                window.scrollTo({
                    top: Math.max(0, targetTop),
                    behavior: "smooth",
                });
                setTimeout(() => this.ensureHighlightedCardVisible(index), 200);

                this.selectCard(index);

                // Delay resetting the navigation flag to let scrolls settle fully.
                // 1000ms ensures smooth scroll completes before auto-locking resumes.
                setTimeout(() => {
                    this.isNavigating = false;
                }, 1000);
            });
        },
        getAudioPlayerHeight() {
            if (!this.showAudioPlayer) return 0;
            // Match the fixed audio player height plus safe area allowance.
            return 220;
        },
        ensureHighlightedCardVisible(index) {
            if (typeof window === "undefined") return;
            const el = document.getElementById(`ayah-card-${index}`);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const headerOffset = this.currentHeaderOffset + 12;
            const bottomLimit = window.innerHeight - this.getAudioPlayerHeight();
            if (rect.top < headerOffset) {
                window.scrollBy({
                    top: rect.top - headerOffset - 12,
                    behavior: "smooth",
                });
            } else if (rect.bottom > bottomLimit) {
                window.scrollBy({
                    top: rect.bottom - bottomLimit + 12,
                    behavior: "smooth",
                });
            }
        },
        // simple localStorage cache with TTL and SWR
        async cachedFetchJSON(url, cacheKey, ttlMs = 24 * 60 * 60 * 1000) {
            try {
                const raw = localStorage.getItem(cacheKey);
                if (raw) {
                    const { ts, data } = JSON.parse(raw);
                    if (Date.now() - ts < ttlMs) {
                        // return cached immediately
                        return { data, fromCache: true };
                    }
                }
            } catch (_) { }

            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status}`);
            const json = await res.json();
            try {
                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({ ts: Date.now(), data: json })
                );
            } catch (_) { }
            return { data: json, fromCache: false };
        },
        onKeydown(e) {
            const tag = ((e.target && e.target.tagName) || "").toLowerCase();
            if (
                e.target?.isContentEditable ||
                ["input", "textarea", "select"].includes(tag)
            )
                return;
            if (
                !Array.isArray(this.filteredAyahs) ||
                this.filteredAyahs.length === 0
            )
                return;
            switch (e.key) {
                case "ArrowDown":
                case "ArrowRight":
                    e.preventDefault();
                    this.goToNextCard();
                    break;
                case "ArrowUp":
                case "ArrowLeft":
                    e.preventDefault();
                    this.goToPreviousCard();
                    break;
                case "Home":
                    e.preventDefault();
                    this.goToFirstCard();
                    break;
                case "End":
                    e.preventDefault();
                    this.goToLastCard();
                    break;
            }
        },
        selectCard(index) {
            this.selectedCardIndex = index;
            this.currentlyPlayingIndex = index;
            this.isHighlighted = true;
            // ensure card is visible
            // removed programmatic scrolling
            const verseNum = index + 1;
            this.screenReaderMessage = `Selected verse ${verseNum}.`;
        },
        goToNextCard() {
            const next =
                (this.selectedCardIndex + 1) % this.filteredAyahs.length;
            this.selectCard(next);
        },
        goToPreviousCard() {
            const prev =
                (this.selectedCardIndex - 1 + this.filteredAyahs.length) %
                this.filteredAyahs.length;
            this.selectCard(prev);
        },
        goToFirstCard() {
            this.selectCard(0);
        },
        goToLastCard() {
            this.selectCard(this.filteredAyahs.length - 1);
        },
        updateIsMobile() {
            try {
                this.isMobile = window.matchMedia("(max-width: 767px)").matches;
                this.isTabletOrMobile = window.matchMedia("(max-width: 991px)").matches;
            } catch (e) {
                const width = window.innerWidth;
                this.isMobile = width <= 767;
                this.isTabletOrMobile = width <= 991;
            }
        },
        // removed ensureCardPositionsCached and fallbackCardPositions (scrollbar-related)

        isElementVisible: function (element) {
            if (!element) return false;

            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            // Check if element has valid dimensions
            if (rect.height <= 0 || rect.width <= 0) return false;

            // Check if element is within viewport bounds
            const isInViewport =
                rect.top < windowHeight &&
                rect.bottom > 0 &&
                rect.left < windowWidth &&
                rect.right > 0;

            return isInViewport;
        },

        isElementValid: function (element) {
            if (!element) return false;

            const rect = element.getBoundingClientRect();

            // Check if element has valid dimensions
            if (rect.height <= 0 || rect.width <= 0) return false;

            // Check if element exists in the DOM (basic check)
            if (!element.offsetParent && element !== document.body)
                return false;

            return true;
        },

        getElementPosition: function (element) {
            if (!element || !this.isElementValid(element)) {
                return null;
            }

            try {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.scrollY;

                // Basic sanity check
                if (isNaN(elementTop) || elementTop < 0) {
                    return null;
                }

                // Additional check for unreasonably high positions (might indicate loading issue)
                const documentHeight = document.documentElement.scrollHeight;
                if (elementTop > documentHeight * 0.9) {
                    console.warn(
                        `Element position seems too high: ${elementTop}, document height: ${documentHeight}`
                    );
                    return null;
                }

                return elementTop;
            } catch (error) {
                console.error("Error getting element position:", error);
                return null;
            }
        },

        // removed scrollToElement and smoothScrollToAyah
        highlightedText: function (ayah) {
            if (!ayah || (!ayah.text && !ayah.words && !ayah.tajweedText))
                return "";
            const words = this.getAyahDisplayWords(ayah);
            const wordTranslations = this.mapWordTranslations(
                words,
                this.getAyahWordTranslations(ayah)
            );
            const useTajweed = this.shouldUseTajweedWords(ayah, words.length);
            return words
                .map((word, index) => {
                    const content = useTajweed
                        ? this.formatTajweedText(word)
                        : this.escapeHtml(word);
                    const translation = this.showWordTranslation && wordTranslations.length
                        ? this.escapeHtml(
                            this.cleanWordTranslation(
                                wordTranslations[index] || ""
                            )
                        )
                        : "";
                    return `<span class="ayah-word" data-word-index="${index}"><span class="ayah-word-ar">${content}</span>${translation ? `<span class="ayah-word-translation text-muted">${translation}</span>` : ""}</span>`;
                })
                .join(" ");
        },
        getAyahBaseWords(ayah) {
            if (!ayah) return [];
            if (Array.isArray(ayah.words) && ayah.words.length)
                return this.normalizeAyahWords(ayah.words);
            if (ayah.text) return this.normalizeAyahWords(ayah.text.split(" "));
            return [];
        },
        getAyahIntroWordCount(ayah, baseWords) {
            const words = Array.isArray(baseWords)
                ? baseWords
                : this.getAyahBaseWords(ayah);
            if (words.length < 4) return 0;
            const normalized = words
                .slice(0, 4)
                .map((word) => this.normalizeArabicToken(word));
            const expected = ["بسم", "الله", "الرحمن", "الرحيم"];
            for (let i = 0; i < expected.length; i++) {
                if (normalized[i] !== expected[i]) return 0;
            }
            return 4;
        },
        normalizeArabicToken(token) {
            return this.cleanAyahToken(token)
                .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627")
                .replace(/[\u064B-\u0652\u0653-\u0655\u0670]/g, "")
                .replace(/\u0640/g, "")
                .trim();
        },
        normalizeAyahWords(tokens) {
            if (!Array.isArray(tokens)) return [];
            const out = [];
            const letterRegex =
                /[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;
            tokens.forEach((token) => {
                if (!token) return;
                const cleaned = this.cleanAyahToken(token);
                if (!cleaned) return;
                const hasLetter = letterRegex.test(cleaned);
                if (!hasLetter) return;
                out.push(cleaned);
            });
            return out;
        },
        cleanAyahToken(token) {
            return String(token)
                .replace(/[\u0615-\u061A\u06D6-\u06ED\u06DD]/g, "")
                .trim();
        },
        normalizeTajweedWords(tokens) {
            if (!Array.isArray(tokens)) return [];
            const out = [];
            const letterRegex =
                /[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;
            tokens.forEach((token) => {
                if (!token) return;
                const plain = this.cleanAyahToken(
                    this.stripTajweedMarkers(token)
                );
                if (!plain) return;
                const hasLetter = letterRegex.test(plain);
                if (!hasLetter) return;
                out.push(token);
            });
            return out;
        },
        stripTajweedMarkers(value) {
            return String(value)
                .replace(/\[[a-z]+(?::\d+)?\[/g, "")
                .replace(/]/g, "");
        },
        shouldUseTajweedWords(ayah, fallbackLength = 0) {
            if (!this.showTajweed || !ayah) return false;
            if (!Array.isArray(ayah.tajweedWords) || !ayah.tajweedWords.length)
                return false;
            const normalized = this.normalizeTajweedWords(ayah.tajweedWords);
            const baseWords = this.getAyahBaseWords(ayah);
            const introCount = this.getAyahIntroWordCount(ayah, baseWords);
            const matchesFull =
                fallbackLength && normalized.length === fallbackLength;
            const matchesIntro =
                fallbackLength &&
                introCount &&
                normalized.length === fallbackLength - introCount;
            if (!matchesFull && !matchesIntro)
                return false;
            return true;
        },
        getAyahDisplayWords(ayah) {
            if (!ayah) return [];
            const baseWords = this.getAyahBaseWords(ayah);
            if (!this.showTajweed || !ayah.tajweedWords?.length)
                return baseWords;
            const tajweedWords = this.normalizeTajweedWords(ayah.tajweedWords);
            const introCount = this.getAyahIntroWordCount(ayah, baseWords);
            if (introCount && tajweedWords.length === baseWords.length - introCount) {
                return [
                    ...baseWords.slice(0, introCount),
                    ...tajweedWords,
                ];
            }
            if (this.shouldUseTajweedWords(ayah, baseWords.length))
                return tajweedWords;
            return baseWords;
        },
        getAyahWordTranslations(ayah) {
            if (!ayah || !Array.isArray(ayah.wordTranslations))
                return [];
            return ayah.wordTranslations;
        },
        cleanWordTranslation(text) {
            return String(text)
                .replace(/[\[\]\(\)]/g, "")
                .replace(/\s{2,}/g, " ")
                .trim();
        },
        mapWordTranslations(words, translations) {
            if (!Array.isArray(words)) return [];
            if (!Array.isArray(translations) || !translations.length)
                return [];
            const introCount = this.getAyahIntroWordCount(null, words);
            if (
                introCount &&
                translations.length === words.length - introCount
            ) {
                return [
                    "In (the) name",
                    "Allah",
                    "the Most Gracious",
                    "the Most Merciful",
                    ...translations,
                ];
            }
            const letterRegex =
                /[\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06FA-\u06FC]/;
            const mapped = [];
            let tIndex = 0;
            words.forEach((word) => {
                const hasLetter = letterRegex.test(
                    this.stripTajweedMarkers(word)
                );
                if (hasLetter && tIndex < translations.length) {
                    mapped.push(translations[tIndex]);
                    tIndex += 1;
                } else {
                    mapped.push("");
                }
            });
            return mapped;
        },
        getAyahWordList(ayah) {
            if (!ayah) return [];
            const baseWords = this.getAyahBaseWords(ayah);
            if (baseWords.length) return baseWords;
            if (this.showTajweed && Array.isArray(ayah.tajweedWords))
                return this.normalizeTajweedWords(ayah.tajweedWords);
            return [];
        },
        getAyahAudioWordCount(ayah) {
            if (!ayah) return 0;
            if (Array.isArray(ayah.audioSegments) && ayah.audioSegments.length) {
                const maxIndex = ayah.audioSegments.reduce(
                    (acc, seg) =>
                        typeof seg?.wordIndex === "number" && seg.wordIndex > acc
                            ? seg.wordIndex
                            : acc,
                    -1
                );
                return Math.max(0, maxIndex + 1);
            }
            if (Array.isArray(ayah.wordTranslations) && ayah.wordTranslations.length)
                return ayah.wordTranslations.length;
            return this.getAyahBaseWords(ayah).length;
        },
        getAyahHighlightOffset(ayah, audioWordCount) {
            const baseWords = this.getAyahBaseWords(ayah);
            const introCount = this.getAyahIntroWordCount(ayah, baseWords);
            if (!introCount) return 0;
            const displayCount = this.getAyahDisplayWords(ayah).length;
            if (displayCount === audioWordCount + introCount) return introCount;
            return 0;
        },
        getHighlightDisplayIndex(ayah, audioIndex, audioWordCount) {
            const baseWords = this.getAyahBaseWords(ayah);
            const introCount = this.getAyahIntroWordCount(ayah, baseWords);
            const displayCount = this.getAyahDisplayWords(ayah).length;
            if (!introCount) return audioIndex;
            if (displayCount === audioWordCount) {
                if (audioIndex < introCount) return null;
                return audioIndex;
            }
            if (displayCount === audioWordCount + introCount)
                return audioIndex + introCount;
            return audioIndex;
        },
        updateWordTimings(ayah, duration) {
            const wordCount = this.getAyahAudioWordCount(ayah);
            if (wordCount > 0 && duration > 0) {
                const step = duration / wordCount;
                this.wordTimings = Array.from(
                    { length: wordCount },
                    (_, i) => i * step
                );
            } else {
                this.wordTimings = [];
            }
        },
        getQuranRecitationId(reciterId) {
            if (!reciterId) return null;
            return this.reciterTimingMap
                ? this.reciterTimingMap[reciterId]
                : null;
        },
        async enrichSurahWithQuranSegments() {
            if (!this.surahDetails?.ayahs?.length) return;
            const recitationId = this.getQuranRecitationId(
                this.selectedReciter
            );
            const audioParam = recitationId ? `audio=${recitationId}&` : "";
            try {
                const { data } = await this.cachedFetchJSON(
                    `https://api.quran.com/api/v4/verses/by_chapter/${this.selectedSurah}?${audioParam}words=true&per_page=300`,
                    `cache:quran-timing:${this.selectedSurah}:${recitationId || "noaudio"}`,
                    7 * 24 * 60 * 60 * 1000
                );
                const verses = Array.isArray(data?.verses) ? data.verses : [];
                const byKey = new Map();
                verses.forEach((verse) => {
                    if (verse?.verse_key) byKey.set(verse.verse_key, verse);
                });
                this.surahDetails.ayahs = this.surahDetails.ayahs.map(
                    (ayah, index) => {
                        const key = `${this.selectedSurah}:${ayah.numberInSurah || index + 1}`;
                        const match = byKey.get(key);
                        const verseWords = Array.isArray(match?.words)
                            ? match.words.filter(
                                (word) => word?.char_type_name === "word"
                            )
                            : [];
                        const quranWords = verseWords.map(
                            (word) => word?.text || word?.code_v1 || ""
                        );
                        const wordTranslations = verseWords.map(
                            (word) => word?.translation?.text || ""
                        );
                        const audioUrl = match?.audio?.url
                            ? `https://audio.qurancdn.com/${match.audio.url}`
                            : ayah.audio;
                        const segments = Array.isArray(match?.audio?.segments)
                            ? match.audio.segments
                                .filter((seg) => Array.isArray(seg) && seg.length >= 4)
                                .map((seg) => ({
                                    wordIndex: seg[0],
                                    start: seg[2] / 1000,
                                    end: seg[3] / 1000,
                                }))
                            : null;
                        return {
                            ...ayah,
                            audio: audioUrl,
                            audioSegments: segments,
                            quranWords,
                            wordTranslations,
                        };
                    }
                );
            } catch (error) {
                console.warn("Unable to load Quran.com timing data:", error);
            }
        },
        startHighlightLoop() {
            if (!this.showRealtimeHighlighting) return;
            if (this._highlightRafId) return;
            const step = () => {
                if (!this.isAudioPlaying[this.currentlyPlayingIndex]) {
                    this.stopHighlightLoop();
                    return;
                }
                this.updateHighlightFrame();
                this._highlightRafId = requestAnimationFrame(step);
            };
            this._highlightRafId = requestAnimationFrame(step);
        },
        stopHighlightLoop() {
            if (this._highlightRafId) {
                cancelAnimationFrame(this._highlightRafId);
                this._highlightRafId = null;
            }
            this._lastHighlightIndex = -1;
            this.clearActiveWordHighlight();
        },
        updateHighlightFrame() {
            const audio = this.currentlyPlaying;
            if (!audio) return;
            const duration = audio.duration || 0;
            if (!duration || !isFinite(duration)) return;
            const ayah = this.filteredAyahs[this.currentlyPlayingIndex];
            const wordCount = this.getAyahAudioWordCount(ayah);
            if (!wordCount) return;
            const currentTime = audio.currentTime;
            const lead = this.highlightLeadSeconds || 0;
            const adjustedTime = Math.min(
                duration,
                Math.max(0, currentTime + lead)
            );
            let index = -1;
            if (Array.isArray(ayah?.audioSegments) && ayah.audioSegments.length) {
                const segments = ayah.audioSegments;
                let segIndex = this._lastSegmentIndex;
                if (segIndex >= 0 && segIndex < segments.length) {
                    const seg = segments[segIndex];
                    if (seg && adjustedTime >= seg.start && adjustedTime < seg.end) {
                        index = seg.wordIndex;
                    }
                }
                if (index === -1) {
                    if (segIndex < 0) segIndex = 0;
                    if (segments[segIndex] && adjustedTime >= segments[segIndex].end) {
                        while (
                            segIndex < segments.length - 1 &&
                            adjustedTime >= segments[segIndex].end
                        ) {
                            segIndex += 1;
                        }
                    } else if (segments[segIndex] && adjustedTime < segments[segIndex].start) {
                        while (
                            segIndex > 0 &&
                            adjustedTime < segments[segIndex].start
                        ) {
                            segIndex -= 1;
                        }
                    }
                    const seg = segments[segIndex] || segments[segments.length - 1];
                    if (seg) {
                        index = seg.wordIndex;
                        this._lastSegmentIndex = segIndex;
                    }
                }
            } else if (this.wordTimings.length === wordCount) {
                index = this.wordTimings.findIndex((t, i, arr) => {
                    return (
                        adjustedTime >= t &&
                        (i === arr.length - 1 || adjustedTime < arr[i + 1])
                    );
                });
            } else {
                index = Math.min(
                    wordCount - 1,
                    Math.floor((adjustedTime / duration) * wordCount)
                );
            }
            if (index === this._lastHighlightIndex) return;
            this._lastHighlightIndex = index;
            const targetIndex = this.getHighlightDisplayIndex(
                ayah,
                index,
                wordCount
            );
            if (targetIndex == null) {
                this.clearActiveWordHighlight();
                return;
            }
            const displayCount = this.getAyahDisplayWords(ayah).length;
            const clamped = Math.min(
                displayCount - 1,
                Math.max(0, targetIndex)
            );
            this.applyWordHighlight(clamped);
        },
        clearActiveWordHighlight() {
            if (Array.isArray(this._lastHighlightEls)) {
                this._lastHighlightEls.forEach((el) =>
                    el.classList.remove("highlighted-word")
                );
            }
            this._lastHighlightEls = [];
        },
        applyWordHighlight(wordIndex) {
            const card = document.getElementById(
                `ayah-card-${this.currentlyPlayingIndex}`
            );
            if (!card) return;
            this.clearActiveWordHighlight();
            const matches = Array.from(
                card.querySelectorAll(
                    `.arabic-text [data-word-index="${wordIndex}"]`
                )
            );
            if (!matches.length) return;
            matches.forEach((el) => el.classList.add("highlighted-word"));
            this._lastHighlightEls = matches;
        },
        escapeHtml(value) {
            return String(value)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
        },
        formatTajweedText(value) {
            if (!value) return "";
            let output = "";
            let i = 0;
            const stack = [];

            while (i < value.length) {
                if (value[i] === "[") {
                    const marker = value
                        .slice(i)
                        .match(/^\[([a-z]+)(?::\d+)?\[/);
                    if (marker) {
                        output += `<span class="tajweed tajweed-${marker[1]}">`;
                        stack.push(marker[1]);
                        i += marker[0].length;
                        continue;
                    }
                    const closeIndex = value.indexOf("]", i + 1);
                    if (closeIndex !== -1) {
                        const inner = value.slice(i + 1, closeIndex);
                        output += this.escapeHtml(inner);
                        i = closeIndex + 1;
                        continue;
                    }
                }
                if (value[i] === "]") {
                    if (stack.length) {
                        output += "</span>";
                        stack.pop();
                    }
                    i += 1;
                    continue;
                }
                output += this.escapeHtml(value[i]);
                i += 1;
            }

            while (stack.length) {
                output += "</span>";
                stack.pop();
            }

            return output;
        },
        // removed bulk initialization and preloading for performance
        playAudio: function (index) {
            console.log("Attempting to play audio for index:", index);
            if (index < 0 || index >= this.filteredAyahs.length) return;
            this._lastHighlightIndex = -1;
            this._lastSegmentIndex = -1;
            this.clearActiveWordHighlight();

            // Defer showing loading spinner to avoid flicker; only show if slow (>200ms)
            clearTimeout(this.loadingTimers[index]);
            this.loadingTimers[index] = setTimeout(() => {
                this.$set
                    ? this.$set(this.isAudioLoading, index, true)
                    : (this.isAudioLoading[index] = true);
            }, 200);

            // Stop any currently playing audio and ensure exclusivity
            if (
                this.currentlyPlaying &&
                this.currentlyPlaying !== this.audioElements[index]
            ) {
                console.log("Pausing currently playing audio");
                try {
                    this.currentlyPlaying.pause();
                } catch (_) { }
                try {
                    this.currentlyPlaying.currentTime = 0;
                } catch (_) { }
            }
            // Pause any stray audios just in case
            if (Array.isArray(this.audioElements)) {
                this.audioElements.forEach((a, i) => {
                    if (a && i !== index) {
                        try {
                            a.pause();
                        } catch (_) { }
                    }
                });
            }

            // Build or update audio element on-demand
            const ayah = this.filteredAyahs[index];
            let audio = this.audioElements[index];
            if (!audio) {
                audio = new Audio();
                audio.preload = "auto";
                this.audioElements[index] = audio;
            }
            audio.onended = () => this.handleAyahEnd(index);
            audio.onerror = (e) => {
                console.error(`Audio error for ayah ${index + 1}:`, e);
                clearTimeout(this.loadingTimers[index]);
                this.isAudioLoading[index] = false;
                this.isAudioPlaying[index] = false;
                this.$toast?.error(
                    `Failed to load audio for ayah ${index + 1}`
                );
            };
            if (audio.src !== ayah.audio) {
                try {
                    audio.pause();
                } catch (_) { }
                audio.src = ayah.audio || "";
            }
            audio.playbackRate = this.playbackSpeed;
            audio.volume = this.volume;

            // Update playing states
            this.isAudioPlaying = this.isAudioPlaying.map(
                (_, i) => i === index
            );
            this.currentlyPlaying = audio;
            this.currentlyPlayingIndex = index;
            this.isHighlighted = true;

            // Setup metadata and word timing
            audio.onloadedmetadata = () => {
                console.log(
                    `Metadata loaded for ayah ${index + 1}, duration: ${this.currentlyPlaying.duration}`
                );
                this.updateWordTimings(ayah, this.currentlyPlaying.duration);
            };

            audio.ontimeupdate = () => {
                const now = window.performance ? performance.now() : Date.now();
                if (now - this.lastProgressAt > 100) {
                    // ~10fps progress updates
                    this.lastProgressAt = now;
                    this.updateProgress(index);
                }
                // Removed continuous auto-scroll here to prevent jumpiness.
            };

            // Optimistic immediate play, fallback to 'canplay' (faster than 'canplaythrough')
            const markPlaying = () => {
                clearTimeout(this.loadingTimers[index]);
                this.isAudioPlaying[index] = true;
                this.isAudioLoading[index] = false;
                this.isHighlighted = true;
                this.showAudioPlayer = true;
                if (this.showRealtimeHighlighting) {
                    this.startHighlightLoop();
                } else {
                    this.stopHighlightLoop();
                }
                this.animateVisualizer();
                // Opportunistically warm next ayah
                this.prepareNextAudio(index + 1);
            };

            const tryPlay = () => {
                const p = audio.play();
                if (p && typeof p.then === "function") {
                    p.then(() => {
                        markPlaying();
                    }).catch((err) => {
                        // If playback fails (e.g., not enough data), wait for 'canplay' and retry once
                        const onCanPlay = () => {
                            audio.removeEventListener("canplay", onCanPlay);
                            const p2 = audio.play();
                            if (p2 && typeof p2.then === "function") {
                                p2.then(() => markPlaying()).catch(() => { });
                            } else {
                                markPlaying();
                            }
                        };
                        audio.addEventListener("canplay", onCanPlay, {
                            once: true,
                        });
                    });
                } else {
                    markPlaying();
                }
            };

            tryPlay();
        },
        pauseAudio: function (index) {
            if (this.audioElements[index]) {
                console.log(`Pausing audio for ayah ${index + 1}`);
                this.audioElements[index].pause();
                clearTimeout(this.loadingTimers[index]);
                this.isAudioPlaying[index] = false;
                this.isAudioLoading[index] = false;
                this.stopHighlightLoop();
            }
        },
        toggleAudioPlayer: function (index) {
            console.log("Toggling audio player for index:", index);
            if (!this.isAudioPlaying[index]) {
                this.playAudio(index);
            } else {
                this.pauseAudio(index);
            }
        },
        stopAudio: function (index) {
            if (this.audioElements[index]) {
                console.log(`Stopping audio for ayah ${index + 1}`);
                this.audioElements[index].pause();
                this.audioElements[index].currentTime = 0;
                clearTimeout(this.loadingTimers[index]);
                this.isAudioPlaying[index] = false;
                this.isAudioLoading[index] = false;
                this.progress[index] = 0;
                this.isHighlighted = false;
                this.stopHighlightLoop();
            }
        },
        rewindAudio: function (index) {
            if (this.audioElements[index]) {
                console.log(`Rewinding audio for ayah ${index + 1}`);
                this.audioElements[index].currentTime = Math.max(
                    0,
                    this.audioElements[index].currentTime - 15
                );
                // removed auto-scroll on rewind
            }
        },
        fastForwardAudio: function (index) {
            if (this.audioElements[index]) {
                console.log(`Fast forwarding audio for ayah ${index + 1}`);
                this.audioElements[index].currentTime = Math.min(
                    this.audioElements[index].duration,
                    this.audioElements[index].currentTime + 20
                );
                // removed auto-scroll on fast-forward
            }
        },
        // Prepare next audio element to reduce start latency on next ayah
        prepareNextAudio(nextIndex) {
            if (nextIndex == null || nextIndex >= this.filteredAyahs.length)
                return;
            const nextAyah = this.filteredAyahs[nextIndex];
            if (!nextAyah || !nextAyah.audio) return;
            let a = this.audioElements[nextIndex];
            if (!a) {
                a = new Audio();
                a.preload = "metadata";
                this.audioElements[nextIndex] = a;
            }
            if (a.src !== nextAyah.audio) {
                try {
                    a.pause();
                } catch (_) { }
                a.src = nextAyah.audio;
                try {
                    a.load();
                } catch (_) { }
            }
            a.volume = this.volume;
            a.playbackRate = this.playbackSpeed;
        },
        updateProgress: function (index) {
            if (
                this.audioElements[index] &&
                this.audioElements[index].duration
            ) {
                const progress =
                    (this.audioElements[index].currentTime /
                        this.audioElements[index].duration) *
                    100;
                this.progress[index] = Math.min(100, progress);
            }
        },
        formatTime: function (seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return (
                (minutes < 10 ? "0" : "") +
                minutes +
                ":" +
                (secs < 10 ? "0" : "") +
                secs
            );
        },
        highlightText(text) {
            if (!this.debouncedQuery.trim()) return text;

            let highlightedText = text;

            const escapeRegExp = (string) => {
                return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            };

            const searchTerms = this.debouncedQuery.trim()
                ? this.debouncedQuery.trim().split(/\s+/)
                : [];
            searchTerms.forEach((term) => {
                const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
                highlightedText = highlightedText.replace(
                    regex,
                    '<span class="highlight-search">$1</span>'
                );
            });

            return highlightedText;
        },
        toggleVisibility: function () {
            this.isVisible = !this.isVisible;
        },
        increaseFontSize: function () {
            if (this.arabicFontSize < 40) this.arabicFontSize += 2;
            if (this.translationFontSize < 30) this.translationFontSize += 2;
        },
        decreaseFontSize: function () {
            if (this.arabicFontSize > 16) this.arabicFontSize -= 2;
            if (this.translationFontSize > 12) this.translationFontSize -= 2;
        },
        shareOnWhatsApp: function (ayah) {
            const message = this.buildAyahMessage(ayah, { includeAudio: true });
            if (!message) return;
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink =
                "https://api.whatsapp.com/send?text=" + encodedMessage;
            window.open(whatsappLink, "_blank", "noopener,noreferrer");
        },
        getFlagFromLanguage: function (lang) {
            const languageFlags = {
                en: "🇬🇧",
                ar: "🇸🇦",
                fr: "🇫🇷",
                es: "🇪🇸",
                ur: "🇵🇰",
                tr: "🇹🇷",
                id: "🇮🇩",
                bn: "🇧🇩",
                fa: "🇮🇷",
                ru: "🇷🇺",
                de: "🇩🇪",
                it: "🇮🇹",
                sw: "🇹🇿",
                zh: "🇨🇳",
                hi: "🇮🇳",
            };
            return languageFlags[lang.toLowerCase()] || "🌐";
        },
        fetchSurahs: async function () {
            this.isLoading = true;
            try {
                const { data, fromCache } = await this.cachedFetchJSON(
                    "https://api.alquran.cloud/v1/surah",
                    "cache:surahs"
                );
                if (!this._isDestroyed) this.surahs = data.data || [];
                this.isLoading = false;
                // Revalidate in background if served from cache
                if (fromCache)
                    setTimeout(
                        () =>
                            this.cachedFetchJSON(
                                "https://api.alquran.cloud/v1/surah",
                                "cache:surahs"
                            ).then(({ data }) => {
                                if (!this._isDestroyed)
                                    this.surahs = data.data || [];
                            }),
                        0
                    );
            } catch (error) {
                console.error("Error fetching Surahs:", error);
                this.isLoading = false;
            }
        },
        async fetchReciters() {
            this.isLoading = true;
            try {
                const { data, fromCache } = await this.cachedFetchJSON(
                    "https://api.alquran.cloud/v1/edition/format/audio",
                    "cache:reciters"
                );
                if (!this._isDestroyed) {
                    this.reciters = data.data
                        .filter(
                            (reciter) =>
                                reciter.identifier && reciter.englishName
                        )
                        .map((reciter) => ({
                            identifier: reciter.identifier,
                            englishName:
                                reciter.englishName || "Unknown Reciter",
                        }))
                        .filter(
                            (reciter) =>
                                ![
                                    "elmir kuliev 2 by 1muslimapp",
                                    "elmir kuliev by 1muslimapp",
                                    "elmir kuliev elevatemuslim",
                                    "elmir kuliev 1muslim",
                                    "elmir kuliev 2muslim",
                                    "chinese",
                                    "ibrahim walk",
                                    "fooladvand - hedayatfar",
                                    "shamshad ali khan",
                                    "youssouf leclerc",
                                ].includes(reciter.englishName.toLowerCase())
                        );
                }
                this.isLoading = false;
                if (fromCache)
                    setTimeout(async () => {
                        try {
                            const fresh = await this.cachedFetchJSON(
                                "https://api.alquran.cloud/v1/edition/format/audio",
                                "cache:reciters"
                            );
                            if (!this._isDestroyed)
                                this.reciters = fresh.data.data
                                    .filter(
                                        (r) => r.identifier && r.englishName
                                    )
                                    .map((r) => ({
                                        identifier: r.identifier,
                                        englishName:
                                            r.englishName || "Unknown Reciter",
                                    }))
                                    .filter(
                                        (r) =>
                                            ![
                                                "elmir kuliev 2 by 1muslimapp",
                                                "elmir kuliev by 1muslimapp",
                                                "elmir kuliev elevatemuslim",
                                                "elmir kuliev 1muslim",
                                                "elmir kuliev 2muslim",
                                                "chinese",
                                                "ibrahim walk",
                                                "fooladvand - hedayatfar",
                                                "shamshad ali khan",
                                                "youssouf leclerc",
                                            ].includes(
                                                r.englishName.toLowerCase()
                                            )
                                    );
                        } catch (_) { }
                    }, 0);
            } catch (error) {
                console.error("Error fetching Reciters:", error);
                this.isLoading = false;
            }
        },
        async fetchTranslations() {
            this.isLoading = true;
            try {
                const { data, fromCache } = await this.cachedFetchJSON(
                    "https://api.alquran.cloud/v1/edition/type/translation",
                    "cache:translations"
                );
                if (this._isDestroyed) return;
                if (!data.data) {
                    console.error("No translation data received from API");
                    this.translations = [];
                    this.isLoading = false;
                    return;
                }
                const translations = data.data
                    .map((translation) => ({
                        identifier: translation.identifier,
                        englishName:
                            translation.englishName || "Unknown Translation",
                        language: translation.language || "Unknown",
                        flag: this.getFlagFromLanguage(
                            translation.language || "Unknown"
                        ),
                    }))
                    .filter((translation) => translation.flag !== "🌐");
                translations.sort((a, b) => {
                    if (a.flag < b.flag) return -1;
                    if (a.flag > b.flag) return 1;
                    if (a.englishName < b.englishName) return -1;
                    if (a.englishName > b.englishName) return 1;
                    return 0;
                });
                this.translations = translations;
                console.log("Translations fetched:", translations);
                this.isLoading = false;
                if (fromCache)
                    setTimeout(async () => {
                        try {
                            const fresh = await this.cachedFetchJSON(
                                "https://api.alquran.cloud/v1/edition/type/translation",
                                "cache:translations"
                            );
                            if (this._isDestroyed) return;
                            const trs = fresh.data.data
                                .map((t) => ({
                                    identifier: t.identifier,
                                    englishName:
                                        t.englishName || "Unknown Translation",
                                    language: t.language || "Unknown",
                                    flag: this.getFlagFromLanguage(
                                        t.language || "Unknown"
                                    ),
                                }))
                                .filter((t) => t.flag !== "🌐");
                            trs.sort((a, b) =>
                                a.flag < b.flag
                                    ? -1
                                    : a.flag > b.flag
                                        ? 1
                                        : a.englishName < b.englishName
                                            ? -1
                                            : a.englishName > b.englishName
                                                ? 1
                                                : 0
                            );
                            this.translations = trs;
                        } catch (_) { }
                    }, 0);
            } catch (error) {
                console.error("Error fetching Translations:", error);
                this.translations = [];
                this.$toast?.error("Failed to load translations");
                this.isLoading = false;
            }
        },
        fetchSurahDetails: function () {
            if (
                !this.selectedSurah ||
                !this.selectedReciter ||
                !this.selectedTranslation
            )
                return Promise.resolve();
            this.isLoading = true;
            const cacheKey = `cache:surah:${this.selectedSurah}:${this.selectedReciter}:${this.selectedTranslation}:tajweed`;

            // Serve from cache immediately if available
            try {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const obj = JSON.parse(cached);
                    if (obj && obj.ts) {
                        const data = obj.data;
                        const editions = Array.isArray(data?.data)
                            ? data.data
                            : [];
                        const arabicText =
                            editions.find(
                                (item) =>
                                    item?.edition?.identifier ===
                                    this.selectedReciter
                            ) || editions[0];
                        const translation =
                            editions.find(
                                (item) =>
                                    item?.edition?.identifier ===
                                    this.selectedTranslation
                            ) || editions[1];
                        const tajweed = editions.find(
                            (item) =>
                                item?.edition?.identifier === "quran-tajweed"
                        );
                        this.surahDetails = {
                            surahNumber: this.selectedSurah,
                            englishName: arabicText?.englishName,
                            name: arabicText?.name,
                            ayahs: (arabicText?.ayahs || []).map(
                                (ayah, index) => {
                                    const tajweedText =
                                        tajweed?.ayahs?.[index]?.text || "";
                                    const text = ayah.text || "";
                                    const transText =
                                        translation?.ayahs?.[index]?.text
                                            ? translation.ayahs[index].text
                                            : "Translation not available";
                                    const words = text ? text.split(" ") : [];
                                    const tajweedWords = tajweedText
                                        ? tajweedText.split(" ")
                                        : [];
                                    return {
                                        number: ayah.numberInSurah || ayah.number,
                                        numberInSurah: ayah.numberInSurah,
                                        globalNumber: ayah.number,
                                        text,
                                        lowerText: text.toLowerCase(),
                                        translation: transText,
                                        lowerTranslation: transText.toLowerCase(),
                                        juz: ayah.juz,
                                        hizb: ayah.hizb,
                                        hizbQuarter: ayah.hizbQuarter,
                                        page: ayah.page,
                                        audio: ayah.audio || "",
                                        words,
                                        tajweedText,
                                        tajweedWords,
                                        quranWords: [],
                                        wordTranslations: [],
                                    };
                                }
                            ),
                        };
                        this.isLoading = false;
                        this.enrichSurahWithQuranSegments()
                            .finally(() => {
                                // Pre-warm current and next from cache path as well
                                this.$nextTick(() => {
                                    this.prepareNextAudio(0);
                                    this.prepareNextAudio(1);
                                });
                            });
                    }
                }
            } catch (_) { }

            // Abort any in-flight request
            try {
                if (this._surahAborter) this._surahAborter.abort();
            } catch (_) { }
            this._surahAborter = new AbortController();
            const { signal } = this._surahAborter;
            return fetch(
                `https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation},quran-tajweed`,
                { signal }
            )
                .then((response) => {
                    if (!response.ok)
                        throw new Error(
                            `Failed to fetch Surah details: ${response.status}`
                        );
                    return response.json();
                })
                .then((data) => {
                    if (this._isDestroyed) return;
                    // persist cache
                    try {
                        localStorage.setItem(
                            cacheKey,
                            JSON.stringify({ ts: Date.now(), data })
                        );
                    } catch (_) { }
                    const editions = Array.isArray(data?.data)
                        ? data.data
                        : [];
                    const arabicText =
                        editions.find(
                            (item) =>
                                item?.edition?.identifier ===
                                this.selectedReciter
                        ) || editions[0];
                    const translation =
                        editions.find(
                            (item) =>
                                item?.edition?.identifier ===
                                this.selectedTranslation
                        ) || editions[1];
                    const tajweed = editions.find(
                        (item) =>
                            item?.edition?.identifier === "quran-tajweed"
                    );
                    this.surahDetails = {
                        surahNumber: this.selectedSurah,
                        englishName: arabicText?.englishName,
                        name: arabicText?.name,
                        ayahs: (arabicText?.ayahs || []).map((ayah, index) => {
                            const tajweedText =
                                tajweed?.ayahs?.[index]?.text || "";
                            const text = ayah.text || "";
                            const transText =
                                translation?.ayahs?.[index]?.text
                                    ? translation.ayahs[index].text
                                    : "Translation not available";
                            const words = text ? text.split(" ") : [];
                            const tajweedWords = tajweedText
                                ? tajweedText.split(" ")
                                : [];
                            return {
                                number: ayah.numberInSurah || ayah.number,
                                numberInSurah: ayah.numberInSurah,
                                globalNumber: ayah.number,
                                text,
                                lowerText: text.toLowerCase(),
                                translation: transText,
                                lowerTranslation: transText.toLowerCase(),
                                juz: ayah.juz,
                                hizb: ayah.hizb,
                                hizbQuarter: ayah.hizbQuarter,
                                page: ayah.page,
                                audio: ayah.audio || "",
                                words,
                                tajweedText,
                                tajweedWords,
                                quranWords: [],
                                wordTranslations: [],
                            };
                        }),
                    };
                    console.log("Surah details fetched:", this.surahDetails);
                    this.isLoading = false;
                    this.enrichSurahWithQuranSegments()
                        .finally(() => {
                            // Pre-warm the first and next ayah for instant playback
                            this.$nextTick(() => {
                                this.prepareNextAudio(0);
                                this.prepareNextAudio(1);
                            });
                        });
                })
                .catch((error) => {
                    if (error?.name === "AbortError") return; // expected on change
                    console.error("Error fetching Surah details:", error);
                    this.isLoading = false;
                });
        },
        resetAllAudioPlayers: function () {
            this.$nextTick(() => {
                if (this.currentlyPlaying) {
                    this.currentlyPlaying.pause();
                    this.currentlyPlaying = null;
                    this.currentlyPlayingIndex = 0;
                }
                // Clear references; recreate on-demand for speed
                if (this.audioElements && this.audioElements.forEach) {
                    this.audioElements.forEach((audio) => {
                        try {
                            if (audio && audio.pause) audio.pause();
                        } catch (_) { }
                    });
                }
                this.audioElements = new Array(this.filteredAyahs.length).fill(
                    null
                );
                this.isAudioPlaying = new Array(this.filteredAyahs.length).fill(
                    false
                );
                this.isAudioLoading = new Array(this.filteredAyahs.length).fill(
                    false
                );
                this.progress = new Array(this.filteredAyahs.length).fill(0);
            });
        },
        savePreference: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        handleAyahEnd: function (index) {
            this.stopAudio(index);
            if (this.repeatCurrent) {
                this.toggleAudioPlayer(index);
                return;
            }
            const nextIndex = index + 1;
            if (nextIndex < this.filteredAyahs.length) {
                setTimeout(() => this.playAudio(nextIndex), 50);
                return;
            }
            this.showAudioPlayer = false;
            this.currentlyPlayingIndex = -1;
        },
        // playNextAyah: function () {
        //   if (this.filteredAyahs.length > 0) {
        //     const nextIndex = (this.currentlyPlayingIndex + 1) % this.filteredAyahs.length;
        //     if (nextIndex < this.filteredAyahs.length && this.audioElements[nextIndex]) {
        //       console.log(`Playing next ayah: ${nextIndex + 1}`);

        //       // Stop current auto-scroll before starting new one
        //       this.stopAutoScroll();

        //       // Small delay to ensure smooth transition
        //       setTimeout(() => {
        //         this.playAudio(nextIndex);
        //       }, 100);
        //     } else {
        //       console.warn(`Cannot play next ayah: index ${nextIndex} invalid or no audio element`);
        //     }
        //   }
        // },
        playNextAyah(currentIndex) {
            if (currentIndex + 1 < this.filteredAyahs.length) {
                this.stopAudio(currentIndex);
                this.toggleAudioPlayer(currentIndex + 1); // Play next ayah
            } else {
                // End of surah: do not auto-stop if continuousPlaybackLoop is desired.
                // Default: stop at the end of the surah.
                this.stopAudio(currentIndex);
                this.showAudioPlayer = false;
                this.currentlyPlayingIndex = -1;
            }
        },
        playPrevAyah(currentIndex) {
            const prev = Math.max(0, currentIndex - 1);
            if (this.filteredAyahs.length > 0 && this.audioElements[prev]) {
                if (currentIndex !== prev) this.stopAudio(currentIndex);
                this.toggleAudioPlayer(prev);
            }
        },
        playSurahContinuously() {
            if (!this.canPlaySurah) return;
            this.continuousPlayback = true;
            this.savePreference("continuousPlayback", true);
            this.repeatCurrent = false;
            localStorage.setItem("repeatCurrent", JSON.stringify(this.repeatCurrent));
            const startIndex = 0;
            if (
                typeof this.currentlyPlayingIndex === "number" &&
                this.currentlyPlayingIndex >= 0 &&
                this.currentlyPlayingIndex < this.filteredAyahs.length
            ) {
                this.stopAudio(this.currentlyPlayingIndex);
            }
            this.currentlyPlayingIndex = startIndex;
            this.selectCard(startIndex);
            this.playAudio(startIndex);
        },
        setActiveSidebarTab(tab) {
            this.activeSidebarTab = tab;
            this.sidebarSearchQuery = "";
        },
        async selectJuz(juzNumber) {
            this.isNavigating = true;
            this.selectedJuz = juzNumber;
            const start = getJuzStart(juzNumber);
            if (start) {
                // Ensure surah is loaded first (selectSurah returns a promise)
                await this.selectSurah(start.surah, { skipScroll: true });
                // No search clearing needed here as we are jumping to a specific Juz start
                this.scrollToAyah(start.ayah - 1);
            }
        },
        async selectPage(pageNumber) {
            this.isNavigating = true;
            const start = getPageStart(pageNumber);
            if (start) {
                // Ensure surah is loaded first (selectSurah returns a promise)
                await this.selectSurah(start.surah, { skipScroll: true });
                this.scrollToAyah(start.ayah - 1);
            } else {
                 console.log("Page navigation mapping incomplete");
                 this.isNavigating = false;
             }
        },
        selectVerseFromSidebar(verseIndex) {
            this.isNavigating = true;
            // Clear main view search to ensure verse is visible
            this.searchQuery = "";
            this.debouncedQuery = "";
            
            this.$nextTick(() => {
                this.scrollToAyahIndex(verseIndex - 1);
            });

            if (this.isMobile && !this.sidebarCollapsed) {
                this.toggleSidebar();
            }
        },
        scrollToAyah(index) {
            this.scrollToAyahIndex(index);
        },
        scrollToSection(id) {
            this.$nextTick(() => {
                const el = document.getElementById(id);
                if (!el) return;
                const navHeight =
                    parseFloat(
                        getComputedStyle(document.documentElement).getPropertyValue(
                            "--nav-offset"
                        )
                    ) || 72;
                const targetTop = Math.max(
                    el.getBoundingClientRect().top +
                        window.scrollY -
                        navHeight -
                        12,
                    0
                );
                window.scrollTo({ top: targetTop, behavior: "smooth" });
            });
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        selectSurah(number, options = {}) {
            return new Promise((resolve, reject) => {
                const { skipScroll = false } = options;
                
                if (String(this.selectedSurah) === String(number) && !this.isLoading) {
                    resolve();
                    return;
                }

                // Set loading true to bypass watcher
                this.isLoading = true;
                this.selectedSurah = String(number);
                this.savePreference("selectedSurah", this.selectedSurah);
                
                // Reset state
                this.currentlyPlayingIndex = 0;
                this.isHighlighted = false;
                
                if (!skipScroll) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }

                this.fetchSurahDetails()
                    .then(() => {
                        this.resetAllAudioPlayers();
                        this.isLoading = false;
                        this.syncVirtualWindowAfterSelection();
                        resolve();
                    })
                    .catch((error) => {
                        this.isLoading = false;
                        reject(error);
                    });
            });
        },
        selectReciter(identifier) {
            this.selectedReciter = identifier;
        },
        selectTranslation(identifier) {
            this.selectedTranslation = identifier;
        },
        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
        toggleHeader() {
            this.headerCollapsed = !this.headerCollapsed;
            // Recalculate list top after header height change
            this.$nextTick(() => {
                this.computeListTop();
            });
        },
        syncPlaybackScroll(index) {
            // If user is manually scrolling or we are in the middle of a nav jump, 
            // don't force a "snap-back" scroll.
            if (this.isManualScrolling || this.isNavigating) return;
            const manualNavCooldown = 800;
            if (Date.now() - this.lastManualNavigationAt < manualNavCooldown) return;

            const now = window.performance ? performance.now() : Date.now();
            if (now - this.lastAutoScrollAt < 400) return;
            this.lastAutoScrollAt = now;
            this.scrollToAyahIndex(index);
        },
        onAyahScrubInput(event) {
            const raw = Number(event.target?.value || 1);
            this.ayahScrubValue = Math.min(
                Math.max(1, raw),
                Math.max(this.totalItems, 1)
            );
        },
        onAyahScrubChange(event) {
            this.isNavigating = true;
            const raw = Number(event.target?.value || 1);
            const targetIndex = Math.min(
                Math.max(0, raw - 1),
                Math.max(this.totalItems - 1, 0)
            );

            // Clear search filter so the jumped ayah is actually in the DOM
            this.searchQuery = "";
            this.debouncedQuery = "";

            this.$nextTick(() => {
                this.ayahScrubValue = targetIndex + 1;
                this.selectCard(targetIndex);
                this.scrollToAyahIndex(targetIndex);
                this.playAudio(targetIndex);
            });
        },
        toggleVolume: function () {
            this.showVolumeBar = !this.showVolumeBar;
        },
        updateVolume: function () {
            if (this.currentlyPlaying) {
                this.currentlyPlaying.volume = this.volume;
            }
            if (this.audioElements && this.audioElements.forEach) {
                this.audioElements.forEach((audio) => {
                    if (audio) audio.volume = this.volume;
                });
            }
        },
        closeAudioPlayer: function () {
            if (this.currentlyPlayingIndex !== null) {
                this.stopAudio(this.currentlyPlayingIndex);
            }
            this.showAudioPlayer = false;
            this.currentlyPlayingIndex = 0;
            this.currentlyPlaying = null;
            this.isHighlighted = false;
        },
        seekToPosition: function (event) {
            const audio = this.audioElements[this.currentlyPlayingIndex];
            if (!audio || !audio.duration) return;

            const progressBar = this.$refs.progressBar;
            if (!progressBar) return;

            const rect = progressBar.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * audio.duration;

            audio.currentTime = Math.max(0, Math.min(newTime, audio.duration));

            // Update progress immediately
            this.updateProgress(this.currentlyPlayingIndex);

            console.log(
                `Seeking to ${newTime.toFixed(2)}s (${(
                    percentage * 100
                ).toFixed(1)}%)`
            );
        },
        onProgressDown(e) {
            if (!this.$refs.progressBar) return;
            const isTouch = e.type === "touchstart";
            const clientX = isTouch
                ? e.touches && e.touches[0]?.clientX
                : e.clientX;
            this.isScrubbing = true;
            // bind listeners once
            this._boundMove = this.onProgressMove;
            this._boundUp = this.onProgressUp;
            window.addEventListener("mousemove", this._boundMove, {
                passive: false,
            });
            window.addEventListener("touchmove", this._boundMove, {
                passive: false,
            });
            window.addEventListener("mouseup", this._boundUp, {
                passive: true,
            });
            window.addEventListener("touchend", this._boundUp, {
                passive: true,
            });
            this._updateScrubAt(clientX);
        },
        onProgressMove(e) {
            if (!this.isScrubbing) return;
            const isTouch = e.type === "touchmove";
            const clientX = isTouch
                ? e.touches && e.touches[0]?.clientX
                : e.clientX;
            if (clientX == null) return;
            e.preventDefault?.();
            this._updateScrubAt(clientX);
        },
        onProgressUp() {
            this.isScrubbing = false;
            window.removeEventListener("mousemove", this._boundMove);
            window.removeEventListener("touchmove", this._boundMove);
            window.removeEventListener("mouseup", this._boundUp);
            window.removeEventListener("touchend", this._boundUp);
            this._boundMove = null;
            this._boundUp = null;
        },
        _updateScrubAt(clientX) {
            const audio = this.audioElements[this.currentlyPlayingIndex];
            if (!audio || !audio.duration) return;
            const bar = this.$refs.progressBar;
            if (!bar) return;
            const rect = bar.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const pct = rect.width > 0 ? x / rect.width : 0;
            const newTime = pct * audio.duration;
            audio.currentTime = Math.max(0, Math.min(newTime, audio.duration));
            this.updateProgress(this.currentlyPlayingIndex);
        },
        cyclePlaybackSpeed: function () {
            this.currentSpeedIndex =
                (this.currentSpeedIndex + 1) % this.playbackSpeeds.length;
            this.playbackSpeed = this.playbackSpeeds[this.currentSpeedIndex];

            // Update all audio elements
            if (this.audioElements && this.audioElements.forEach) {
                this.audioElements.forEach((audio) => {
                    if (audio) audio.playbackRate = this.playbackSpeed;
                });
            }

            this.savePreference("playbackSpeed", this.playbackSpeed);
            console.log(`Playback speed set to ${this.playbackSpeed}x`);
        },
        animateVisualizer: function () {
            if (!this.isAudioPlaying[this.currentlyPlayingIndex]) return;

            const now = window.performance ? performance.now() : Date.now();
            if (now - this.lastVizAt < 33) {
                // ~30fps cap
                return requestAnimationFrame(() => this.animateVisualizer());
            }
            this.lastVizAt = now;

            // Create animated bars based on audio volume (simulated)
            const audio = this.audioElements[this.currentlyPlayingIndex];
            const volume = audio ? Math.min(audio.volume * 2, 1) : 0.3;

            this.visualizerBars = this.visualizerBars.map(
                () => Math.random() * 80 * volume + 10
            );

            requestAnimationFrame(() => this.animateVisualizer());
        },
        toggleRepeat() {
            this.repeatCurrent = !this.repeatCurrent;
            localStorage.setItem(
                "repeatCurrent",
                JSON.stringify(this.repeatCurrent)
            );
        },
        closeOffcanvas() {
            this.prepareSettingsDraft();
            const el = this.$refs.surahOffcanvas;
            if (!el || !(window && window.bootstrap && window.bootstrap.Offcanvas)) return;
            const instance = window.bootstrap.Offcanvas.getInstance(el) ||
                window.bootstrap.Offcanvas.getOrCreateInstance(el);
            instance.hide();
        },
    },
};
