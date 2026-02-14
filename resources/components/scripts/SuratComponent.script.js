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
            isTablet: false,
            isDesktopWide: false,
            isReadingFullscreen: false,
            isDeepFocusMode: false,
            readingFullscreenBodyClass: "quran-reading-fullscreen-active",
            readingFullscreenPreferenceBaseKey: "surat_reading_fullscreen_mode",
            readingFullscreenLastFocusedEl: null,
            fullscreenChangeHandler: null,
            // a11y
            selectedCardIndex: 0,
            screenReaderMessage: "",
            isComponentAlive: true,
            isInitialLoad: true,
            selectedSurah: "1",
            selectedReciter: "ar.alafasy",
            selectedTranslation: "en.ahmedali",
            transliterationEditionIdentifier: "en.transliteration",
            isAudioPlaying: [],
            isAudioLoading: [],
            isAudioDownloading: {},
            isAudioDownloaded: {},
            isSurahAudioDownloading: false,
            isSurahAudioDownloaded: false,
            surahAudioMetaByKey: {},
            surahAudioMetaLoadingByKey: {},
            surahAudioDownloadedTimer: null,
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
            fontPickerOffcanvasId: "quranFontOffcanvas",
            fontPickerModalId: "quranFontModal",
            fontPickerOffcanvasInstance: null,
            fontPickerModalInstance: null,
            quranFonts: [],
            quranFontsLoading: false,
            quranFontsError: "",
            selectedQuranFontId: "",
            quranFontDraftId: "",
            quranFontPreferenceKey: "suratSelectedFont",
            quranFontStackPreferenceKey: "suratSelectedFontStack",
            storedQuranFontStack: "",
            fontPreviewText: "",
            fontPreviewTajweedText: "",
            fontPreviewFallbackText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            fontPreviewLoading: false,
            fontPreviewError: "",
            fontPickerAlert: "",
            fontPickerAlertTimer: null,
            defaultQuranFontStack:
                "'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif",
            surahInfoFontSize: 16,
            surahInfoFontSizeMin: 14,
            surahInfoFontSizeMax: 22,
            surahInfoFontSizePreferenceBaseKey: "surat_surah_info_font_size",
            deepFocusModePreferenceBaseKey: "surat_deep_focus_mode",
            advancedSearchQuery: "",
            advancedSearchDebounceTimer: null,
            advancedSearchAbortController: null,
            advancedSearchResults: [],
            advancedSearchLoading: false,
            advancedSearchError: "",
            advancedSearchTotalMatches: 0,
            advancedSearchMaxResults: 18,
            advancedSearchHydrationSurahLimit: 10,
            advancedSearchMinLength: 2,
            isAdvancedSearchVisible: true,
            isAdvancedSearchPanelVisible: true,
            speechRecognitionSupported: false,
            speechRecognitionListening: false,
            speechRecognitionError: "",
            speechRecognitionInstance: null,
            speechRecognitionLocale: "en-US",
            suratOnboardingModalId: "suratOnboardingModal",
            suratOnboardingModalInstance: null,
            suratOnboardingSearchQuery: "",
            suratOnboardingFontSize: 15,
            suratOnboardingFontSizeMin: 13,
            suratOnboardingFontSizeMax: 20,
            suratOnboardingFontSizePreferenceBaseKey: "surat_onboarding_font_size",
            suratReaderFontSizePreferenceBaseKey: "surat_reader_font_sizes",
            suratPreferenceAnonStorageKey: "ic_surat_pref_anon_id",
            suratPreferenceAnonId: "",
            suratOnboardingFeatures: [
                {
                    id: "feature-read-flow",
                    priority: 1,
                    area: "Reading",
                    iconClass: "fa-book-open",
                    title: "Read ayahs with Arabic, translation, and transliteration",
                    summary:
                        "Each ayah card is built for focused reading, with Arabic text first and optional translation/transliteration beneath it.",
                    howTo:
                        "Select any surah from the sidebar or mobile dropdown, then scroll the ayah cards and toggle translation/transliteration per ayah.",
                    keywords: [
                        "read",
                        "arabic",
                        "translation",
                        "transliteration",
                        "ayah",
                        "surah",
                    ],
                },
                {
                    id: "feature-audio-playback",
                    priority: 2,
                    area: "Audio",
                    iconClass: "fa-headphones",
                    title: "Play ayah audio with full playback controls",
                    summary:
                        "You can play a single ayah or continue through the surah with controls for pause, rewind, forward, speed, volume, and stop.",
                    howTo:
                        "Use the play button on any ayah card. The bottom audio player gives timeline scrubbing and advanced playback controls.",
                    keywords: [
                        "audio",
                        "play",
                        "pause",
                        "rewind",
                        "speed",
                        "volume",
                    ],
                },
                {
                    id: "feature-advanced-search",
                    priority: 3,
                    area: "Search",
                    iconClass: "fa-search",
                    title: "Search across the full Quran instantly",
                    summary:
                        "The advanced search bar scans ayahs and translation content across surahs and shows matched references in a result panel.",
                    howTo:
                        "Use the Search Quran box at the top, type at least 2 characters, then open any result to jump directly to that ayah.",
                    keywords: [
                        "search",
                        "all",
                        "quran",
                        "result",
                        "jump",
                    ],
                },
                {
                    id: "feature-voice-search",
                    priority: 4,
                    area: "Search",
                    iconClass: "fa-microphone",
                    title: "Use voice search for hands-free discovery",
                    summary:
                        "If your browser supports speech recognition, you can speak your query and run advanced Quran search without typing.",
                    howTo:
                        "Tap the microphone icon inside the advanced search input, speak clearly, then review highlighted matches.",
                    keywords: [
                        "voice",
                        "microphone",
                        "speech",
                        "search",
                    ],
                },
                {
                    id: "feature-reciter-selection",
                    priority: 5,
                    area: "Audio",
                    iconClass: "fa-user",
                    title: "Switch reciters to match your listening preference",
                    summary:
                        "You can choose a reciter voice and the audio stream updates to that reciter for surah playback and ayah playback.",
                    howTo:
                        "Change reciter from the sticky toolbar, settings modal, or offcanvas controls.",
                    keywords: [
                        "reciter",
                        "voice",
                        "audio",
                        "selection",
                    ],
                },
                {
                    id: "feature-translation-selection",
                    priority: 6,
                    area: "Understanding",
                    iconClass: "fa-language",
                    title: "Choose translation language/version",
                    summary:
                        "Translations can be switched at any time so you read the tafsir-friendly wording that suits your study style.",
                    howTo:
                        "Pick a translation from toolbar settings or offcanvas controls, then ayah cards refresh with the new translation.",
                    keywords: [
                        "translation",
                        "language",
                        "meaning",
                        "study",
                    ],
                },
                {
                    id: "feature-translation-toggle",
                    priority: 7,
                    area: "Reading",
                    iconClass: "fa-toggle-on",
                    title: "Toggle translation and transliteration visibility",
                    summary:
                        "You can hide or show translation/transliteration for each ayah and also use global toggles for all visible ayahs.",
                    howTo:
                        "Use the Translation and Transliteration switches in ayah headers, or the toolbar global switch for all cards.",
                    keywords: [
                        "toggle",
                        "translation",
                        "transliteration",
                        "show",
                        "hide",
                    ],
                },
                {
                    id: "feature-font-size",
                    priority: 8,
                    area: "Accessibility",
                    iconClass: "fa-text-height",
                    title: "Adjust reading font size with + and - controls",
                    summary:
                        "Arabic and supporting text can be scaled up or down, helping you read comfortably on desktop and mobile.",
                    howTo:
                        "Use the +/- icon controls on ayah cards (mobile) to increase or decrease Arabic and translation font sizes.",
                    keywords: [
                        "font",
                        "size",
                        "increase",
                        "decrease",
                        "plus",
                        "minus",
                    ],
                },
                {
                    id: "feature-quran-font-picker",
                    priority: 9,
                    area: "Accessibility",
                    iconClass: "fa-font",
                    title: "Apply Quranic font styles with live preview",
                    summary:
                        "The Quran font picker lets you select a script style and preview it before applying it across the page.",
                    howTo:
                        "Open Quranic fonts from the toolbar, choose a style in the preview list, then submit to apply.",
                    keywords: [
                        "font",
                        "quranic",
                        "script",
                        "preview",
                    ],
                },
                {
                    id: "feature-tajweed",
                    priority: 10,
                    area: "Learning",
                    iconClass: "fa-palette",
                    title: "Enable tajweed colors and view tajweed rules",
                    summary:
                        "Tajweed coloring can be turned on for recitation guidance, with a dedicated modal explaining each rule color.",
                    howTo:
                        "Enable tajweed in settings, then open Tajweed rules from the toolbar to learn each highlighted rule.",
                    keywords: [
                        "tajweed",
                        "rules",
                        "color",
                        "recitation",
                    ],
                },
                {
                    id: "feature-word-highlight",
                    priority: 11,
                    area: "Learning",
                    iconClass: "fa-highlighter",
                    title: "Turn on word-for-word highlighting during playback",
                    summary:
                        "As audio plays, each spoken word can highlight in sync, helping you track pronunciation and pacing.",
                    howTo:
                        "Enable Word-for-word highlighting in display settings, then play an ayah to follow active word highlights.",
                    keywords: [
                        "word",
                        "highlight",
                        "word-for-word",
                        "realtime",
                    ],
                },
                {
                    id: "feature-word-translation",
                    priority: 12,
                    area: "Learning",
                    iconClass: "fa-spell-check",
                    title: "Enable word-for-word translation support",
                    summary:
                        "Word-level translation can be shown so each Arabic segment is easier to connect with meaning while reading.",
                    howTo:
                        "Turn on Word-for-word translation in display settings to render extra guidance beneath Arabic words.",
                    keywords: [
                        "word",
                        "translation",
                        "meaning",
                        "learning",
                    ],
                },
                {
                    id: "feature-bookmarks",
                    priority: 13,
                    area: "Study",
                    iconClass: "fa-bookmark",
                    title: "Save ayahs with quick bookmarks",
                    summary:
                        "Any ayah can be bookmarked for later review, creating a fast way to return to verses you are reflecting on.",
                    howTo:
                        "Tap the bookmark icon on an ayah card to save or remove it quickly.",
                    keywords: [
                        "bookmark",
                        "save",
                        "favorite",
                        "ayah",
                    ],
                },
                {
                    id: "feature-share-copy",
                    priority: 14,
                    area: "Sharing",
                    iconClass: "fa-share-alt",
                    title: "Copy or share ayahs in one tap",
                    summary:
                        "Built-in quick actions let you copy an ayah text or share it directly to WhatsApp without leaving the page.",
                    howTo:
                        "Use the Copy and Share action pills under each ayah block.",
                    keywords: [
                        "copy",
                        "share",
                        "whatsapp",
                        "text",
                    ],
                },
                {
                    id: "feature-download",
                    priority: 15,
                    area: "Offline",
                    iconClass: "fa-download",
                    title: "Download ayah audio and full surah audio",
                    summary:
                        "You can download individual ayah MP3 files or full surah MP3 files for offline listening.",
                    howTo:
                        "Use the download icon on an ayah card, or the toolbar download button for full-surah audio.",
                    keywords: [
                        "download",
                        "offline",
                        "mp3",
                        "surah",
                        "ayah",
                    ],
                },
                {
                    id: "feature-surah-info",
                    priority: 16,
                    area: "Context",
                    iconClass: "fa-info-circle",
                    title: "Open surah information and metadata",
                    summary:
                        "Surah info gives context such as name, revelation place, ayah count, and additional explanatory content.",
                    howTo:
                        "Press the Info button from toolbar/sidebar/mobile card to open the surah information modal.",
                    keywords: [
                        "surah",
                        "information",
                        "metadata",
                        "context",
                    ],
                },
                {
                    id: "feature-navigation",
                    priority: 17,
                    area: "Navigation",
                    iconClass: "fa-compass",
                    title: "Navigate quickly with sidebar and mobile controls",
                    summary:
                        "Desktop sidebar and mobile offcanvas controls help you jump between surahs and keep navigation simple.",
                    howTo:
                        "Use the left sidebar on desktop, or open the sliders icon on mobile/tablet for offcanvas controls.",
                    keywords: [
                        "sidebar",
                        "navigation",
                        "mobile",
                        "offcanvas",
                        "surah",
                    ],
                },
                {
                    id: "feature-ui-utilities",
                    priority: 18,
                    area: "Utility",
                    iconClass: "fa-sliders-h",
                    title: "Use quick utility controls for focus",
                    summary:
                        "You can hide/show the search panel, collapse/restore sticky tools, and jump back to top with one click.",
                    howTo:
                        "Use top pills and restore buttons around the toolbar area, plus the floating scroll-to-top button.",
                    keywords: [
                        "hide",
                        "show",
                        "toolbar",
                        "scroll",
                        "top",
                    ],
                },
            ],
            searchQuery: "",
            debouncedQuery: "",
            debounceTimer: null,
            arabicFontSize: 28,
            translationFontSize: 18,
            transliterationFallbackText: "Transliteration not available",
            isTranslationVisible: true,
            translationVisibility: {},
            isTransliterationVisible: true,
            transliterationVisibility: {},
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
            isToolbarPinned: false,
            isMobileToolbarExpanded: false,
            firstAyahTop: 0,
            showDesktopToolbar: true,
            showDesktopSurahContext: true,
            showMobileSurahInfoCard: true,
            mobileSurahInfoCardStorageKey: "suratMobileSurahInfoCardHidden",
            continuousPlayback: false, // Legacy flag; new playbackMode supersedes it
            visualizerBars: Array(20).fill(10),
            playbackSpeeds: [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5],
            currentSpeedIndex: 2,
            playbackMode: "continuous",
            preferredPlaybackMode: "continuous",
            playbackModeOptions: [
                {
                    value: "continuous",
                    label: "Play the entire surah continuously",
                    description: "Navigate from ayah to ayah without stopping until the surah ends."
                },
                {
                    value: "repeat",
                    label: "Repeat the current ayah",
                    description: "Loop just the ayah you are on until you pause or switch it off."
                },
                {
                    value: "manual",
                    label: "Play single ayah manually",
                    description: "Listen to one ayah at a time and tap play again when you are ready."
                },
            ],
            highlightLeadSeconds: 0.05,
            _lastSegmentIndex: -1,
            currentAudioIndex: -1,
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
            lastManualNavigationAt: 0,
            isManualScrolling: false,
            manualScrollTimer: null,
            autoSyncLockUntil: 0,
            ayahScrubValue: 1,
            // perf throttles
            lastProgressAt: 0,
            lastVizAt: 0,
            // track last programmatic scroll to avoid jitter
            lastAutoScrollIndex: null,
            lastProgrammaticScrollAt: 0,
            preferredPlaybackScrollFactor: 0.38,
            _scrollCorrectionTimer: null,
            _scrollCorrectionToken: 0,
            _navigationSettleTimer: null,
            _navigationSettleToken: 0,
            navigationTargetIndex: null,
            navigationTargetTolerance: 12,
            windowLockUntil: 0,
            windowLockIndex: null,
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
            _virtualWindowRaf: null,
            itemHeightCalibrated: false,
            // Next-step card visibility
            showNextStep: true,
            nextStepMinimized: false,
            activeAyah: null,
            savedAyahKeys: {},
            savedAyahsLoaded: false,
            savedAyahClearTimer: null,
            pinnedAyahs: {},
            pinnedAyahStorageKeyBase: "ic_surat_pinned_ayahs",
            pinnedAyahStorageKey: "",
            pinnedSectionUiStateStorageKeyBase: "ic_surat_pinned_ayahs_ui",
            pinnedSectionUiStateStorageKey: "",
            isPinnedSectionCollapsed: false,
            isPinnedSectionHidden: false,
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
                playbackMode: "continuous",
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
        isAnyAudioPlaying() {
            return Array.isArray(this.isAudioPlaying)
                ? this.isAudioPlaying.some(Boolean)
                : false;
        },
        activeAyahIndex() {
            return this.isAnyAudioPlaying
                ? this.currentlyPlayingIndex
                : this.selectedCardIndex;
        },
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
                    (a.lowerTranslation && a.lowerTranslation.includes(query)) ||
                    (a.lowerTransliteration &&
                        a.lowerTransliteration.includes(query))
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
        isRepeatMode() {
            return this.playbackMode === "repeat";
        },
        currentPlaybackModeOption() {
            return (
                this.playbackModeOptions.find(
                    (option) => option.value === this.playbackMode
                ) || this.playbackModeOptions[0]
            );
        },
        draftPlaybackModeOption() {
            const selected = this.settingsDraft?.playbackMode;
            return (
                this.playbackModeOptions.find(
                    (option) => option.value === selected
                ) || this.currentPlaybackModeOption
            );
        },
        activeQuranFont() {
            if (!Array.isArray(this.quranFonts) || !this.quranFonts.length)
                return null;
            return (
                this.quranFonts.find(
                    (font) => font.id === this.selectedQuranFontId
                ) ||
                this.quranFonts[0] ||
                null
            );
        },
        quranFontStyle() {
            const stack =
                this.storedQuranFontStack ||
                this.activeQuranFont?.cssStack ||
                this.defaultQuranFontStack;
            return {
                "--ic-quran-arabic-font": stack,
            };
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
                        ayah.lowerTranslation.includes(query)) ||
                    (ayah.lowerTransliteration &&
                        ayah.lowerTransliteration.includes(query))
            );
        },
        advancedSearchTrimmedQuery() {
            return (this.advancedSearchQuery || "").trim();
        },
        hasAdvancedSearchQuery() {
            return (
                this.advancedSearchTrimmedQuery.length >=
                this.advancedSearchMinLength
            );
        },
        hasAdvancedSearchResults() {
            return (
                Array.isArray(this.advancedSearchResults) &&
                this.advancedSearchResults.length > 0
            );
        },
        hasAdvancedSearchPanelContent() {
            return (
                this.advancedSearchLoading ||
                this.hasAdvancedSearchResults ||
                this.hasAdvancedSearchQuery ||
                !!this.advancedSearchError ||
                !!this.speechRecognitionError
            );
        },
        suratOnboardingSearchTerms() {
            const raw = (this.suratOnboardingSearchQuery || "").trim().toLowerCase();
            if (!raw) return [];
            return raw
                .split(/\s+/)
                .map((term) => term.trim())
                .filter(Boolean);
        },
        filteredSuratOnboardingFeatures() {
            const features = Array.isArray(this.suratOnboardingFeatures)
                ? this.suratOnboardingFeatures
                : [];
            const terms = this.suratOnboardingSearchTerms;
            if (!terms.length) return features;
            return features.filter((feature) => {
                const haystack = [
                    feature.title,
                    feature.summary,
                    feature.howTo,
                    feature.area,
                    ...(Array.isArray(feature.keywords) ? feature.keywords : []),
                ]
                    .join(" ")
                    .toLowerCase();
                return terms.every((term) => haystack.includes(term));
            });
        },
        ayahBodyFontSize() {
            const baseSize = Number(this.translationFontSize);
            if (!Number.isFinite(baseSize)) return 15;
            return Math.max(10, Math.min(baseSize - 2, 17));
        },
        effectiveArabicFontSize() {
            const baseSize = Number(this.arabicFontSize);
            const safeBase = Number.isFinite(baseSize) ? baseSize : 28;
            if (!this.isDeepFocusMode) return safeBase;
            return Math.round(safeBase * 1.08 * 10) / 10;
        },
        effectiveAyahBodyFontSize() {
            const baseSize = Number(this.ayahBodyFontSize);
            const safeBase = Number.isFinite(baseSize) ? baseSize : 15;
            if (!this.isDeepFocusMode) return safeBase;
            return Math.round(safeBase * 1.06 * 10) / 10;
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
        desktopSurahContext() {
            return {
                number:
                    this.currentSurahMeta?.number ||
                    this.surahDetails?.surahNumber ||
                    this.currentSurahInfo?.number ||
                    this.selectedSurah ||
                    "",
                englishName:
                    this.surahDetails?.englishName ||
                    this.currentSurahInfo?.englishName ||
                    this.surahDetails?.name ||
                    this.currentSurahInfo?.name ||
                    "Surah",
                arabicName:
                    this.currentSurahInfo?.name ||
                    this.surahDetails?.name ||
                    "",
                translationName:
                    this.currentSurahInfo?.englishNameTranslation || "",
                ayahCount:
                    this.currentSurahMeta?.ayahCount ||
                    this.currentSurahInfo?.numberOfAyahs ||
                    this.surahDetails?.ayahs?.length ||
                    null,
                origin:
                    this.currentSurahMeta?.origin ||
                    this.currentSurahInfo?.revelationType ||
                    "",
            };
        },
        desktopSurahContextKey() {
            const ctx = this.desktopSurahContext || {};
            return `${ctx.number || "surah"}-${ctx.englishName || "name"}-${ctx.arabicName || "ar"}`;
        },
        currentSurahAudioMetaKey() {
            const surahNumber = Number(
                this.selectedSurah || this.surahDetails?.surahNumber
            );
            return this.getSurahAudioMetaKey(surahNumber, this.selectedReciter);
        },
        currentSurahAudioMeta() {
            const key = this.currentSurahAudioMetaKey;
            if (!key) return null;
            return this.surahAudioMetaByKey[key] || null;
        },
        isCurrentSurahAudioMetaLoading() {
            const key = this.currentSurahAudioMetaKey;
            if (!key) return false;
            return !!this.surahAudioMetaLoadingByKey[key];
        },
        currentSurahAudioSizeLabel() {
            const sizeBytes = this.currentSurahAudioMeta?.sizeBytes;
            if (!sizeBytes) return "";
            return this.formatBytesToMegabytes(sizeBytes);
        },
        surahDownloadReadyLabel() {
            if (this.currentSurahAudioSizeLabel) {
                return `Download the full surah MP3 for offline listening (${this.currentSurahAudioSizeLabel}).`;
            }
            if (this.isCurrentSurahAudioMetaLoading) {
                return "Download the full surah MP3 for offline listening (estimating file size...).";
            }
            return "Download the full surah MP3 for offline listening.";
        },
        surahDownloadReadyAriaLabel() {
            if (this.currentSurahAudioSizeLabel) {
                return `Download full surah MP3 for offline listening (${this.currentSurahAudioSizeLabel})`;
            }
            return "Download full surah MP3 for offline listening";
        },
        isTranslationAllEnabled() {
            if (!Array.isArray(this.filteredAyahs) || !this.filteredAyahs.length) {
                return !!this.isTranslationVisible;
            }
            return this.filteredAyahs.every((ayah) =>
                this.isTranslationVisibleFor({ ayah })
            );
        },
        isTransliterationAllEnabled() {
            if (!Array.isArray(this.filteredAyahs) || !this.filteredAyahs.length) {
                return !!this.isTransliterationVisible;
            }
            return this.filteredAyahs.every((ayah) =>
                this.isTransliterationVisibleFor({ ayah })
            );
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
        currentActionAyah() {
            if (!Array.isArray(this.filteredAyahs) || this.filteredAyahs.length === 0)
                return null;
            const index = Math.min(
                Math.max(this.selectedCardIndex, 0),
                this.filteredAyahs.length - 1
            );
            return this.filteredAyahs[index] || this.filteredAyahs[0] || null;
        },
        totalItems() {
            return Array.isArray(this.filteredAyahs)
                ? this.filteredAyahs.length
                : 0;
        },
        canMinimizeNextStep() {
            return this.isMobile || this.isTablet;
        },
        isNextStepMinimized() {
            return this.canMinimizeNextStep && this.nextStepMinimized;
        },
        currentHeaderOffset() {
            return this.getScrollTopOffset();
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
        pinnedAyahsList() {
            if (!this.pinnedAyahs || typeof this.pinnedAyahs !== "object") {
                return [];
            }
            return Object.entries(this.pinnedAyahs)
                .map(([key, value]) => {
                    if (!value || typeof value !== "object") return null;
                    const surahNumber = Number(value.surahNumber);
                    const ayahNumber = Number(value.ayahNumber);
                    if (!surahNumber || !ayahNumber) return null;
                    return {
                        ...value,
                        key: key || this.buildAyahKey(surahNumber, ayahNumber),
                        surahNumber,
                        ayahNumber,
                        pinnedAt: Number(value.pinnedAt) || 0,
                    };
                })
                .filter(Boolean)
                .sort((a, b) => b.pinnedAt - a.pinnedAt);
        },
        hasPinnedAyahs() {
            return this.bookmarkAuthenticated && this.pinnedAyahsList.length > 0;
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
        pinnedAyahs: {
            deep: true,
            handler(next) {
                this.persistPinnedAyahs(next);
            },
        },
        searchQuery: function (val) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                this.debouncedQuery = val;
            }, 300);
        },
        advancedSearchQuery: function (val) {
            clearTimeout(this.advancedSearchDebounceTimer);
            if (!(val || "").trim()) {
                this.clearAdvancedSearch(false);
                return;
            }
            if (!this.isAdvancedSearchPanelVisible) {
                this.isAdvancedSearchPanelVisible = true;
            }
            this.advancedSearchDebounceTimer = setTimeout(() => {
                this.runAdvancedSearch();
            }, 420);
        },
        selectedQuranFontId(newVal) {
            if (!newVal) return;
            this.persistLocalSetting(this.quranFontPreferenceKey, newVal);
            this.syncQuranFontStack(newVal);
        },
        selectedReciter: function (newVal) {
            if (newVal && !this.isLoading) {
                this.isSurahAudioDownloading = false;
                this.isSurahAudioDownloaded = false;
                clearTimeout(this.surahAudioDownloadedTimer);
                this.surahAudioDownloadedTimer = null;
                this.persistLocalSetting("suratSelectedReciter", newVal);
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
                this.persistLocalSetting("suratSelectedTranslation", newVal);
                this.isLoading = true;
                this.savePreference("selectedTranslation", newVal);
                this.currentlyPlayingIndex = 0;
                this.isHighlighted = false;

                this.fetchSurahDetails()
                    .then(() => {
                        this.isLoading = false;
                        this.resetAllAudioPlayers();
                        this.syncVirtualWindowAfterSelection();
                        if (
                            this.hasAdvancedSearchQuery &&
                            this.isAdvancedSearchPanelVisible
                        ) {
                            this.runAdvancedSearch({ force: true });
                        }
                    })
                    .catch(() => {
                        this.isLoading = false;
                    });
            }
        },
        selectedSurah: function (newVal) {
            if (newVal && !this.isLoading) {
                this.isSurahAudioDownloading = false;
                this.isSurahAudioDownloaded = false;
                clearTimeout(this.surahAudioDownloadedTimer);
                this.surahAudioDownloadedTimer = null;
                this.persistLocalSetting("suratSelectedSurah", newVal);
                this.isLoading = true;
                this.translationVisibility = {};
                this.transliterationVisibility = {};
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
            if (
                typeof this.currentAudioIndex !== "number" ||
                this.currentAudioIndex < 0
            ) {
                const playingIndex = Array.isArray(this.isAudioPlaying)
                    ? this.isAudioPlaying.findIndex(Boolean)
                    : -1;
                if (playingIndex >= 0) {
                    this.currentAudioIndex = playingIndex;
                }
            }
            const idx =
                typeof this.currentAudioIndex === "number" &&
                this.currentAudioIndex >= 0
                    ? this.currentAudioIndex
                    : this.currentlyPlayingIndex;
            if (this.isAudioPlaying[idx]) {
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
            if ("scrollRestoration" in window.history) {
                window.history.scrollRestoration = "manual";
            }
            this.isNavigating = true;
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
        this.fullscreenChangeHandler = () =>
            this.handleNativeFullscreenChange();
            if (typeof document !== "undefined") {
                document.addEventListener(
                    "fullscreenchange",
                    this.fullscreenChangeHandler
                );
                document.addEventListener(
                    "webkitfullscreenchange",
                    this.fullscreenChangeHandler
                );
            }
            this.syncReadingFullscreenBodyClass(false);
            this.updateIsMobile();
        window.addEventListener("resize", this.updateIsMobile);
        this.detectSpeechRecognitionSupport();
        // Restore dismissal state for next-step card
        try {
            if (localStorage.getItem("suratNextStepDismissed") === "1")
                this.showNextStep = false;
        } catch (_) { }
        await this.initializeBookmarkAuth();
        await this.initializeFontSizePreferences();
        await this.initializeDeepFocusModePreference();
        await this.initializeReadingFullscreenPreference();
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
        try {
            this.showMobileSurahInfoCard =
                localStorage.getItem(this.mobileSurahInfoCardStorageKey) !== "1";
        } catch (_) { }
        await this.loadPinnedAyahs();
        await this.loadPinnedSectionUiPreference();
        let storedSurah = null;
        let storedReciter = null;
        let storedTranslation = null;
        let storedFont = null;
        let storedFontStack = null;
        try {
            storedSurah = localStorage.getItem("suratSelectedSurah");
        } catch (_) {}
        try {
            storedReciter = localStorage.getItem("suratSelectedReciter");
        } catch (_) {}
        try {
            storedTranslation = localStorage.getItem("suratSelectedTranslation");
        } catch (_) {}
        try {
            storedFont = localStorage.getItem(this.quranFontPreferenceKey);
        } catch (_) {}
        try {
            storedFontStack = localStorage.getItem(this.quranFontStackPreferenceKey);
        } catch (_) {}
        this.selectedSurah = storedSurah || "1";
        this.selectedReciter = storedReciter || "ar.alafasy";
        this.selectedTranslation = storedTranslation || "en.ahmedali";
        this.selectedQuranFontId = this.coerceLegacyFontId(storedFont) || "";
        this.quranFontDraftId = this.selectedQuranFontId;
        this.storedQuranFontStack = storedFontStack || "";
        this.quranFonts = this.getQuranComFonts();
        this.ensureSelectedQuranFont();
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.continuousPlayback =
            JSON.parse(localStorage.getItem("continuousPlayback")) ?? false;
        this.playbackSpeed =
            JSON.parse(localStorage.getItem("playbackSpeed")) ?? 1;
        let storedPreferredPlaybackMode = null;
        let storedPlaybackMode = null;
        try {
            storedPreferredPlaybackMode = localStorage.getItem(
                "lastNonRepeatPlaybackMode"
            );
        } catch (_) {}
        try {
            storedPlaybackMode = localStorage.getItem("playbackMode");
        } catch (_) {}
        this.preferredPlaybackMode =
            storedPreferredPlaybackMode || this.preferredPlaybackMode;
        this.setPlaybackMode(
            storedPlaybackMode || this.preferredPlaybackMode
        );
        try {
            const storedTajweed = localStorage.getItem("suratShowTajweed");
            if (storedTajweed !== null)
                this.showTajweed = storedTajweed === "1";
        } catch (_) {}
        try {
            const storedWordTranslation = localStorage.getItem(
                "suratShowWordTranslation"
            );
            if (storedWordTranslation !== null)
                this.showWordTranslation = storedWordTranslation === "1";
        } catch (_) { }
        try {
            const storedRealtimeHighlighting = localStorage.getItem(
                "suratShowRealtimeHighlighting"
            );
            if (storedRealtimeHighlighting !== null)
                this.showRealtimeHighlighting = storedRealtimeHighlighting === "1";
        } catch (_) { }
        Promise.all([
            this.fetchReciters(),
            this.fetchSurahs(),
            this.fetchTranslations(),
            this.fetchSurahDetails(),
            this.fetchQuranFonts(),
            this.fetchFontPreviewAyah(),
        ])
            .then(() => {
                this.isInitialLoad = false;
            })
            .finally(() => {
                if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "auto" });
                }
                this.isNavigating = false;
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
        this.syncReadingFullscreenBodyClass(false);
        this.exitReadingFullscreen({
            restoreFocus: false,
            skipNativeExit: false,
            persistPreference: false,
        });
        window.removeEventListener("keydown", this.onKeydown);
        if (this._keydownHandler)
            window.removeEventListener("keydown", this._keydownHandler);
        if (typeof document !== "undefined" && this.fullscreenChangeHandler) {
            document.removeEventListener(
                "fullscreenchange",
                this.fullscreenChangeHandler
            );
            document.removeEventListener(
                "webkitfullscreenchange",
                this.fullscreenChangeHandler
            );
            this.fullscreenChangeHandler = null;
        }
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
        this.teardownSpeechRecognition();
        clearTimeout(this.advancedSearchDebounceTimer);
        this.abortAdvancedSearchRequest();
        clearTimeout(this.savedAyahClearTimer);
        clearTimeout(this.surahAudioDownloadedTimer);
        this.surahAudioDownloadedTimer = null;
        clearTimeout(this.bookmarkToastTimer);
        this.bookmarkToastAction = null;
        clearTimeout(this.fontPickerAlertTimer);
        this.fontPickerAlertTimer = null;
        clearTimeout(this.authAlertTimer);
        clearTimeout(this._scrollCorrectionTimer);
        this._scrollCorrectionTimer = null;
        clearTimeout(this._navigationSettleTimer);
        this._navigationSettleTimer = null;
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
        if (this.suratOnboardingModalInstance) {
            try {
                this.suratOnboardingModalInstance.hide();
            } catch (_) {
                // ignore modal teardown errors
            }
            this.suratOnboardingModalInstance = null;
        }
        if (this._heightMeasureRaf && typeof window !== "undefined") {
            window.cancelAnimationFrame(this._heightMeasureRaf);
            this._heightMeasureRaf = null;
        }
    },
        beforeDestroy() {
            this.stopHighlightLoop();
            this.syncReadingFullscreenBodyClass(false);
            this.exitReadingFullscreen({
                restoreFocus: false,
                skipNativeExit: false,
                persistPreference: false,
            });
            window.removeEventListener("keydown", this.onKeydown);
        if (this._keydownHandler)
            window.removeEventListener("keydown", this._keydownHandler);
        if (typeof document !== "undefined" && this.fullscreenChangeHandler) {
            document.removeEventListener(
                "fullscreenchange",
                this.fullscreenChangeHandler
            );
            document.removeEventListener(
                "webkitfullscreenchange",
                this.fullscreenChangeHandler
            );
            this.fullscreenChangeHandler = null;
        }
        window.removeEventListener("resize", this.updateIsMobile);
        window.removeEventListener("scroll", this.onScrollVirtual);
        window.removeEventListener("resize", this.computeListTop);
        window.removeEventListener("resize", this.calibrateItemHeight);
        this.teardownSpeechRecognition();
        clearTimeout(this.advancedSearchDebounceTimer);
        this.abortAdvancedSearchRequest();
        clearTimeout(this.savedAyahClearTimer);
        clearTimeout(this.surahAudioDownloadedTimer);
        this.surahAudioDownloadedTimer = null;
            clearTimeout(this.bookmarkToastTimer);
            this.bookmarkToastAction = null;
            clearTimeout(this.fontPickerAlertTimer);
            this.fontPickerAlertTimer = null;
            clearTimeout(this.authAlertTimer);
            clearTimeout(this._scrollCorrectionTimer);
            this._scrollCorrectionTimer = null;
            clearTimeout(this._navigationSettleTimer);
            this._navigationSettleTimer = null;
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
            if (this.suratOnboardingModalInstance) {
                try {
                    this.suratOnboardingModalInstance.hide();
                } catch (_) {
                    // ignore modal teardown errors
                }
                this.suratOnboardingModalInstance = null;
            }
            if (this._heightMeasureRaf && typeof window !== "undefined") {
                window.cancelAnimationFrame(this._heightMeasureRaf);
                this._heightMeasureRaf = null;
            }
            if (this._virtualWindowRaf && typeof window !== "undefined") {
                window.cancelAnimationFrame(this._virtualWindowRaf);
                this._virtualWindowRaf = null;
            }
        },
    methods: {
        syncReadingFullscreenBodyClass(enabled = this.isReadingFullscreen) {
            if (typeof document === "undefined") return;
            const body = document.body;
            if (!body || !body.classList) return;
            body.classList.toggle(
                this.readingFullscreenBodyClass,
                !!enabled
            );
        },
        getNativeFullscreenElement() {
            if (typeof document === "undefined") return null;
            return (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                null
            );
        },
        supportsNativeFullscreen() {
            if (typeof document === "undefined") return false;
            const root = document.documentElement;
            return !!(
                root &&
                (typeof root.requestFullscreen === "function" ||
                    typeof root.webkitRequestFullscreen === "function")
            );
        },
        async requestNativeFullscreen() {
            if (!this.supportsNativeFullscreen()) return false;
            const root = document.documentElement;
            const request =
                root.requestFullscreen || root.webkitRequestFullscreen;
            if (typeof request !== "function") return false;
            try {
                await request.call(root);
                return true;
            } catch (_) {
                return false;
            }
        },
        async exitNativeFullscreen() {
            if (typeof document === "undefined") return false;
            const exit = document.exitFullscreen || document.webkitExitFullscreen;
            if (typeof exit !== "function") return false;
            try {
                await exit.call(document);
                return true;
            } catch (_) {
                return false;
            }
        },
        handleNativeFullscreenChange() {
            const isNativeFullscreen = !!this.getNativeFullscreenElement();
            if (!isNativeFullscreen && this.isReadingFullscreen) {
                this.exitReadingFullscreen({
                    skipNativeExit: true,
                });
            }
        },
        focusReadingFullscreenToggleButton() {
            this.$nextTick(() => {
                const toggleButton = this.$refs.readingFullscreenToggleButton;
                if (
                    toggleButton &&
                    typeof toggleButton.focus === "function"
                ) {
                    toggleButton.focus();
                }
            });
        },
        async enterReadingFullscreen() {
            if (this.isReadingFullscreen || !this.isDesktopWide) return;
            if (typeof document !== "undefined") {
                const active = document.activeElement;
                this.readingFullscreenLastFocusedEl =
                    active && typeof active.focus === "function"
                        ? active
                        : null;
            } else {
                this.readingFullscreenLastFocusedEl = null;
            }

            this.isReadingFullscreen = true;
            this.syncReadingFullscreenBodyClass(true);
            this.writeScopedBooleanPreference(
                this.readingFullscreenPreferenceBaseKey,
                true
            );
            this.focusReadingFullscreenToggleButton();

            await this.requestNativeFullscreen();
        },
        async exitReadingFullscreen(options = {}) {
            const {
                restoreFocus = true,
                skipNativeExit = false,
                persistPreference = true,
            } = options || {};
            if (!this.isReadingFullscreen && !this.getNativeFullscreenElement()) {
                return;
            }

            this.isReadingFullscreen = false;
            this.syncReadingFullscreenBodyClass(false);
            if (persistPreference) {
                this.writeScopedBooleanPreference(
                    this.readingFullscreenPreferenceBaseKey,
                    false
                );
            }

            if (!skipNativeExit && this.getNativeFullscreenElement()) {
                await this.exitNativeFullscreen();
            }

            if (!restoreFocus) {
                this.readingFullscreenLastFocusedEl = null;
                return;
            }

            this.$nextTick(() => {
                const previous = this.readingFullscreenLastFocusedEl;
                const fallback = this.$refs.readingFullscreenToggleButton;
                const canFocusPrevious =
                    previous &&
                    typeof previous.focus === "function" &&
                    (typeof previous.isConnected !== "boolean" ||
                        previous.isConnected);
                if (canFocusPrevious) {
                    previous.focus();
                } else if (
                    fallback &&
                    typeof fallback.focus === "function"
                ) {
                    fallback.focus();
                }
                this.readingFullscreenLastFocusedEl = null;
            });
        },
        async toggleReadingFullscreen() {
            if (this.isReadingFullscreen) {
                await this.exitReadingFullscreen();
                return;
            }
            await this.enterReadingFullscreen();
        },
        showToast(message, timeout = 3500, action = null) {
            this.bookmarkToast = message;
            this.bookmarkToastAction = action;
            clearTimeout(this.bookmarkToastTimer);
            this.bookmarkToastTimer = setTimeout(() => {
                this.bookmarkToast = "";
                this.bookmarkToastAction = null;
            }, timeout);
        },
        abortAdvancedSearchRequest() {
            if (!this.advancedSearchAbortController) return;
            try {
                this.advancedSearchAbortController.abort();
            } catch (_) {
                // ignore aborted controller issues
            }
            this.advancedSearchAbortController = null;
        },
        clearAdvancedSearch(resetInput = true) {
            clearTimeout(this.advancedSearchDebounceTimer);
            this.abortAdvancedSearchRequest();
            if (resetInput) {
                this.advancedSearchQuery = "";
            }
            this.advancedSearchResults = [];
            this.advancedSearchLoading = false;
            this.advancedSearchError = "";
            this.advancedSearchTotalMatches = 0;
        },
        toggleAdvancedSearchVisibility() {
            const nextState = !this.isAdvancedSearchVisible;
            this.isAdvancedSearchVisible = nextState;
            if (!nextState) {
                this.stopVoiceSearch();
                this.abortAdvancedSearchRequest();
                this.speechRecognitionError = "";
                return;
            }
            if (this.hasAdvancedSearchQuery && this.isAdvancedSearchPanelVisible) {
                this.runAdvancedSearch({ force: true });
            }
        },
        closeAdvancedSearchPanel() {
            this.stopVoiceSearch();
            this.speechRecognitionError = "";
            this.clearAdvancedSearch(false);
            this.isAdvancedSearchPanelVisible = false;
        },
        openSuratOnboarding() {
            const modalEl = document.getElementById(this.suratOnboardingModalId);
            if (!modalEl) return;
            this.suratOnboardingModalInstance =
                this.suratOnboardingModalInstance ||
                Modal.getInstance(modalEl) ||
                new Modal(modalEl);
            this.suratOnboardingModalInstance.show();
        },
        clearSuratOnboardingSearch() {
            this.suratOnboardingSearchQuery = "";
        },
        increaseSuratOnboardingFontSize() {
            if (this.suratOnboardingFontSize < this.suratOnboardingFontSizeMax) {
                this.suratOnboardingFontSize += 1;
            }
        },
        decreaseSuratOnboardingFontSize() {
            if (this.suratOnboardingFontSize > this.suratOnboardingFontSizeMin) {
                this.suratOnboardingFontSize -= 1;
            }
        },
        highlightSuratOnboardingText(value) {
            const safeValue = this.escapeHtml(value || "");
            const terms = this.suratOnboardingSearchTerms;
            if (!terms.length) return safeValue;

            let highlighted = safeValue;
            terms.forEach((term) => {
                const regex = new RegExp(`(${this.escapeRegExp(term)})`, "gi");
                highlighted = highlighted.replace(
                    regex,
                    '<span class="surat-onboarding-highlight">$1</span>'
                );
            });

            return highlighted;
        },
        getSpeechRecognitionErrorMessage(code = "") {
            const normalized = String(code || "").toLowerCase();
            if (normalized === "not-supported")
                return "Voice search is not supported in this browser.";
            if (normalized === "insecure-context")
                return "Voice search requires HTTPS (or localhost).";
            if (normalized === "no-speech")
                return "No speech detected. Try speaking again.";
            if (normalized === "audio-capture")
                return "Microphone unavailable. Check microphone access.";
            if (normalized === "not-allowed" || normalized === "service-not-allowed")
                return "Microphone permission denied by browser settings.";
            if (normalized === "network")
                return "Speech recognition network issue. Please retry.";
            if (normalized === "language-not-supported")
                return "Speech language is not supported in this browser.";
            return "Speech recognition failed. Please try again.";
        },
        getSpeechRecognitionConstructor() {
            if (typeof window === "undefined") return null;
            return window.SpeechRecognition || window.webkitSpeechRecognition || null;
        },
        detectSpeechRecognitionSupport() {
            this.speechRecognitionSupported = !!this.getSpeechRecognitionConstructor();
        },
        isSpeechRecognitionSecureContext() {
            if (typeof window === "undefined") return false;
            if (window.isSecureContext) return true;
            const host = String(window.location?.hostname || "").toLowerCase();
            return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
        },
        initializeSpeechRecognition() {
            if (typeof window === "undefined") return;
            if (this.speechRecognitionInstance) return;

            const SpeechRecognition = this.getSpeechRecognitionConstructor();
            if (!SpeechRecognition) {
                this.speechRecognitionSupported = false;
                return;
            }

            let recognition = null;
            try {
                recognition = new SpeechRecognition();
            } catch (_) {
                this.speechRecognitionSupported = false;
                this.speechRecognitionError = this.getSpeechRecognitionErrorMessage(
                    "not-supported"
                );
                return;
            }
            recognition.interimResults = true;
            recognition.maxAlternatives = 1;
            recognition.continuous = false;
            recognition.lang =
                (typeof navigator !== "undefined" &&
                    navigator.language) ||
                "en-US";

            recognition.onstart = () => {
                this.speechRecognitionListening = true;
                this.speechRecognitionError = "";
            };

            recognition.onresult = (event) => {
                if (!event?.results) return;
                let transcript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const text = event.results[i]?.[0]?.transcript || "";
                    if (!text) continue;
                    transcript += `${text} `;
                }
                const normalizedTranscript = transcript.trim();
                if (!normalizedTranscript) return;

                this.advancedSearchQuery = normalizedTranscript;
                let hasFinalResult = false;
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i]?.isFinal) {
                        hasFinalResult = true;
                        break;
                    }
                }
                if (hasFinalResult) {
                    this.runAdvancedSearch({ force: true });
                }
            };

            recognition.onerror = (event) => {
                const code = event?.error || "";
                this.speechRecognitionListening = false;
                if (code === "aborted") return;
                this.speechRecognitionError = this.getSpeechRecognitionErrorMessage(
                    code
                );
            };

            recognition.onend = () => {
                this.speechRecognitionListening = false;
            };

            this.speechRecognitionInstance = recognition;
            this.speechRecognitionSupported = true;
            this.speechRecognitionLocale = recognition.lang || "en-US";
        },
        startVoiceSearch() {
            if (!this.speechRecognitionSupported) {
                this.detectSpeechRecognitionSupport();
            }
            if (!this.speechRecognitionSupported) {
                this.speechRecognitionError =
                    this.getSpeechRecognitionErrorMessage("not-supported");
                return;
            }
            if (!this.isSpeechRecognitionSecureContext()) {
                this.speechRecognitionError =
                    this.getSpeechRecognitionErrorMessage("insecure-context");
                return;
            }
            if (!this.speechRecognitionInstance) {
                this.initializeSpeechRecognition();
            }
            if (!this.speechRecognitionInstance) {
                this.speechRecognitionError =
                    this.getSpeechRecognitionErrorMessage("not-supported");
                return;
            }
            this.speechRecognitionError = "";
            try {
                this.speechRecognitionInstance.lang =
                    (typeof navigator !== "undefined" &&
                        navigator.language) ||
                    this.speechRecognitionLocale ||
                    "en-US";
                this.speechRecognitionLocale =
                    this.speechRecognitionInstance.lang;
                this.speechRecognitionInstance.start();
            } catch (error) {
                const name = String(error?.name || "").toLowerCase();
                if (name === "invalidstateerror") return;
                if (name === "notallowederror" || name === "securityerror") {
                    this.speechRecognitionError =
                        this.getSpeechRecognitionErrorMessage("not-allowed");
                    return;
                }
                this.speechRecognitionError =
                    this.getSpeechRecognitionErrorMessage();
            }
        },
        stopVoiceSearch() {
            if (!this.speechRecognitionInstance) return;
            try {
                this.speechRecognitionInstance.stop();
            } catch (_) {
                // ignore stop race conditions
            }
            this.speechRecognitionListening = false;
        },
        toggleVoiceSearch() {
            if (this.speechRecognitionListening) {
                this.stopVoiceSearch();
                return;
            }
            this.startVoiceSearch();
        },
        teardownSpeechRecognition() {
            if (!this.speechRecognitionInstance) return;
            try {
                this.speechRecognitionInstance.onstart = null;
                this.speechRecognitionInstance.onresult = null;
                this.speechRecognitionInstance.onerror = null;
                this.speechRecognitionInstance.onend = null;
                this.speechRecognitionInstance.stop();
            } catch (_) {
                // ignore teardown failures
            }
            this.speechRecognitionInstance = null;
            this.speechRecognitionListening = false;
        },
        getScrollTopOffset() {
            if (typeof window === "undefined" || typeof document === "undefined") {
                return this.headerCollapsed ? 56 : 92;
            }

            let offset = 72;
            try {
                const rootStyle = window.getComputedStyle(
                    document.documentElement
                );
                const cssOffset = parseFloat(
                    rootStyle.getPropertyValue("--nav-offset")
                );
                if (Number.isFinite(cssOffset) && cssOffset > 0) {
                    offset = cssOffset;
                }
            } catch (_) {
                // fall back to default nav offset
            }

            let total = offset + 10;
            const stickyToolbar = document.querySelector(".quran-toolbar-sticky");
            if (stickyToolbar && stickyToolbar.getBoundingClientRect) {
                const style = window.getComputedStyle(stickyToolbar);
                if (style.display !== "none" && style.visibility !== "hidden") {
                    const rect = stickyToolbar.getBoundingClientRect();
                    const overlapsTopBand =
                        rect.height > 0 &&
                        rect.bottom > offset &&
                        rect.top <= offset + 28;
                    if (overlapsTopBand) {
                        total += rect.height + 10;
                    }
                }
            }

            return Math.min(Math.max(total, 56), 340);
        },
        getAdvancedSearchEditions(query) {
            const hasArabic = /[\u0600-\u06FF]/.test(query || "");
            const translationId = this.selectedTranslation || "en.ahmedali";
            const ordered = hasArabic
                ? ["quran-uthmani", translationId]
                : [translationId];

            return Array.from(
                new Set(
                    ordered.filter((edition) => typeof edition === "string" && edition.trim())
                )
            );
        },
        escapeRegExp(value) {
            return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        },
        getAdvancedSearchTerms() {
            const query = (this.advancedSearchQuery || "").trim();
            if (!query) return [];
            return query
                .split(/\s+/)
                .map((term) => term.trim())
                .filter(Boolean);
        },
        highlightAdvancedSearchText(text) {
            const safeText = this.escapeHtml(text || "");
            const terms = this.getAdvancedSearchTerms();
            if (!terms.length) return safeText;

            let highlighted = safeText;
            terms.forEach((term) => {
                const regex = new RegExp(
                    `(${this.escapeRegExp(term)})`,
                    "gi"
                );
                highlighted = highlighted.replace(
                    regex,
                    '<span class="advanced-search-highlight">$1</span>'
                );
            });
            return highlighted;
        },
        readAdvancedSearchCache(cacheKey, ttlMs) {
            if (typeof window === "undefined") return null;
            try {
                const raw = localStorage.getItem(cacheKey);
                if (!raw) return null;
                const parsed = JSON.parse(raw);
                if (
                    !parsed ||
                    !parsed.ts ||
                    typeof parsed.data === "undefined"
                )
                    return null;
                if (Date.now() - parsed.ts > ttlMs) return null;
                return parsed.data;
            } catch (_) {
                return null;
            }
        },
        writeAdvancedSearchCache(cacheKey, data) {
            if (typeof window === "undefined") return;
            try {
                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({ ts: Date.now(), data })
                );
            } catch (_) {
                // ignore storage limits
            }
        },
        async fetchAdvancedSearchJSON(url, cacheKey, ttlMs, signal) {
            const cached = this.readAdvancedSearchCache(cacheKey, ttlMs);
            if (cached) return cached;

            const response = await fetch(url, { signal });
            if (!response.ok) {
                const error = new Error(`HTTP_${response.status}`);
                error.status = response.status;
                throw error;
            }
            const json = await response.json();
            this.writeAdvancedSearchCache(cacheKey, json);
            return json;
        },
        getHttpStatusFromError(error) {
            const explicitStatus = Number(error?.response?.status || error?.status || 0);
            if (explicitStatus > 0) return explicitStatus;
            const message = String(error?.message || error || "");
            const statusMatch = message.match(/\b(\d{3})\b/);
            return statusMatch ? Number(statusMatch[1]) : 0;
        },
        parseAdvancedSearchMatches(payload, fallbackEdition = "") {
            const rawMatches = Array.isArray(payload?.data?.matches)
                ? payload.data.matches
                : [];
            const editionFromPayload =
                payload?.data?.edition?.identifier || fallbackEdition || "";
            return rawMatches
                .map((raw) => {
                    const surahNumber = Number(
                        raw?.surah?.number || raw?.surahNumber || 0
                    );
                    const ayahNumber = Number(
                        raw?.numberInSurah || raw?.ayahNumber || 0
                    );
                    if (!surahNumber || !ayahNumber) return null;

                    const editionIdentifier =
                        raw?.edition?.identifier || editionFromPayload;
                    const snippet = String(raw?.text || "");
                    const isArabicEdition =
                        editionIdentifier === "quran-uthmani" ||
                        editionIdentifier.startsWith("ar.");
                    const isTransliterationEdition =
                        editionIdentifier ===
                            this.transliterationEditionIdentifier ||
                        /translit/i.test(editionIdentifier);

                    return {
                        key: this.buildAyahKey(surahNumber, ayahNumber),
                        surahNumber,
                        ayahNumber,
                        surahEnglishName:
                            raw?.surah?.englishName || `Surah ${surahNumber}`,
                        surahArabicName: raw?.surah?.name || "",
                        surahTranslationName:
                            raw?.surah?.englishNameTranslation || "",
                        arabicSnippet: isArabicEdition ? snippet : "",
                        translationSnippet:
                            !isArabicEdition && !isTransliterationEdition
                                ? snippet
                                : "",
                        transliterationSnippet: isTransliterationEdition
                            ? snippet
                            : "",
                    };
                })
                .filter(Boolean);
        },
        mergeAdvancedSearchMatches(...collections) {
            const merged = new Map();
            collections.forEach((collection) => {
                if (!Array.isArray(collection)) return;
                collection.forEach((match) => {
                    if (!match?.key) return;
                    if (!merged.has(match.key)) {
                        merged.set(match.key, { ...match });
                        return;
                    }
                    const existing = merged.get(match.key);
                    merged.set(match.key, {
                        ...existing,
                        surahEnglishName:
                            existing.surahEnglishName ||
                            match.surahEnglishName,
                        surahArabicName:
                            existing.surahArabicName || match.surahArabicName,
                        surahTranslationName:
                            existing.surahTranslationName ||
                            match.surahTranslationName,
                        arabicSnippet:
                            existing.arabicSnippet || match.arabicSnippet,
                        translationSnippet:
                            existing.translationSnippet ||
                            match.translationSnippet,
                        transliterationSnippet:
                            existing.transliterationSnippet ||
                            match.transliterationSnippet,
                    });
                });
            });
            return Array.from(merged.values()).sort((a, b) => {
                if (a.surahNumber !== b.surahNumber)
                    return a.surahNumber - b.surahNumber;
                return a.ayahNumber - b.ayahNumber;
            });
        },
        buildAdvancedSearchResult(match, surahPayload, translationId) {
            const editions = Array.isArray(surahPayload?.data?.data)
                ? surahPayload.data.data
                : [];

            const arabicEdition =
                editions.find(
                    (item) => item?.edition?.identifier === "quran-uthmani"
                ) || editions[0];
            const translationEdition =
                editions.find(
                    (item) => item?.edition?.identifier === translationId
                ) || editions[1];
            const transliterationEdition =
                editions.find(
                    (item) =>
                        item?.edition?.identifier ===
                            this.transliterationEditionIdentifier ||
                        item?.edition?.type === "transliteration"
                ) || null;

            const index = Math.max(0, Number(match.ayahNumber) - 1);
            const arabicAyah = arabicEdition?.ayahs?.[index];
            const translationAyah = translationEdition?.ayahs?.[index];
            const transliterationAyah = transliterationEdition?.ayahs?.[index];

            const arabicText =
                arabicAyah?.text || match.arabicSnippet || "";
            const translationText =
                translationAyah?.text ||
                match.translationSnippet ||
                "Translation not available";
            const transliterationText =
                transliterationAyah?.text ||
                match.transliterationSnippet ||
                this.transliterationFallbackText;

            const surahEnglishName =
                arabicEdition?.englishName ||
                match.surahEnglishName ||
                `Surah ${match.surahNumber}`;
            const surahArabicName =
                arabicEdition?.name || match.surahArabicName || "";
            const surahTranslationName =
                arabicEdition?.englishNameTranslation ||
                match.surahTranslationName ||
                "";

            return {
                key: this.buildAyahKey(match.surahNumber, match.ayahNumber),
                surahNumber: match.surahNumber,
                ayahNumber: match.ayahNumber,
                surahEnglishName,
                surahArabicName,
                surahTranslationName,
                text: arabicText,
                translation: translationText,
                transliteration: transliterationText,
                page: Number(arabicAyah?.page || 0) || null,
                juz: Number(arabicAyah?.juz || 0) || null,
            };
        },
        async hydrateAdvancedSearchMatches(
            matches,
            translationId,
            transliterationId,
            signal
        ) {
            const bySurah = new Map();
            matches.forEach((match) => {
                if (!bySurah.has(match.surahNumber)) {
                    bySurah.set(match.surahNumber, true);
                }
            });

            const surahNumbers = Array.from(bySurah.keys()).slice(
                0,
                Math.max(1, Number(this.advancedSearchHydrationSurahLimit) || 1)
            );
            const payloadBySurah = new Map();

            for (const surahNumber of surahNumbers) {
                if (signal?.aborted) break;
                const endpoint =
                    `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/` +
                    `quran-uthmani,${translationId},${transliterationId}`;
                const cacheKey =
                    `cache:advanced-search:surah:${surahNumber}:` +
                    `${translationId}:${transliterationId}`;
                try {
                    const payload = await this.fetchAdvancedSearchJSON(
                        endpoint,
                        cacheKey,
                        12 * 60 * 60 * 1000,
                        signal
                    );
                    payloadBySurah.set(surahNumber, payload);
                } catch (error) {
                    const status = this.getHttpStatusFromError(error);
                    if (status === 429) {
                        break;
                    }
                }
            }

            return matches.map((match) => {
                const payload = payloadBySurah.get(match.surahNumber);
                return this.buildAdvancedSearchResult(
                    match,
                    payload,
                    translationId
                );
            });
        },
        async runAdvancedSearch(options = {}) {
            const { force = false } = options;
            const query = (this.advancedSearchQuery || "").trim();
            if (query.length < this.advancedSearchMinLength) {
                this.clearAdvancedSearch(false);
                return;
            }
            if (!this.isAdvancedSearchPanelVisible) {
                this.isAdvancedSearchPanelVisible = true;
            }

            const normalizedQuery = query.toLowerCase();
            const translationId = this.selectedTranslation || "en.ahmedali";
            const transliterationId =
                this.transliterationEditionIdentifier || "en.transliteration";

            if (!force && this.advancedSearchLoading) {
                this.abortAdvancedSearchRequest();
            }

            this.abortAdvancedSearchRequest();
            const controller = new AbortController();
            const { signal } = controller;
            this.advancedSearchAbortController = controller;
            this.advancedSearchLoading = true;
            this.advancedSearchError = "";
            this.advancedSearchResults = [];
            this.advancedSearchTotalMatches = 0;

            try {
                const editions = this.getAdvancedSearchEditions(query);
                const requests = editions.map(async (edition) => {
                    const endpoint =
                        `https://api.alquran.cloud/v1/search/` +
                        `${encodeURIComponent(query)}/all/${edition}`;
                    let payload = null;
                    try {
                        payload = await this.fetchAdvancedSearchJSON(
                            endpoint,
                            `cache:advanced-search:query:${edition}:${normalizedQuery}`,
                            3 * 60 * 60 * 1000,
                            signal
                        );
                    } catch (error) {
                        const status = this.getHttpStatusFromError(error);
                        if (status === 404) {
                            payload = {
                                data: {
                                    matches: [],
                                    edition: { identifier: edition },
                                },
                            };
                        } else {
                            throw error;
                        }
                    }
                    return { edition, payload };
                });

                const searchResponses = await Promise.allSettled(requests);
                if (signal.aborted) return;

                const parsedCollections = searchResponses
                    .filter((result) => result.status === "fulfilled")
                    .map((result) =>
                        this.parseAdvancedSearchMatches(
                            result.value.payload,
                            result.value.edition
                        )
                    );

                if (!parsedCollections.length) {
                    const rejected = searchResponses.filter(
                        (result) => result.status === "rejected"
                    );
                    const hasRateLimit = rejected.some(
                        (result) =>
                            this.getHttpStatusFromError(result.reason) === 429
                    );
                    if (hasRateLimit) {
                        throw new Error("RATE_LIMIT");
                    }
                    throw new Error("NO_SUCCESSFUL_RESPONSES");
                }

                const mergedMatches = this.mergeAdvancedSearchMatches(
                    ...parsedCollections
                );
                this.advancedSearchTotalMatches = mergedMatches.length;

                if (!mergedMatches.length) {
                    this.advancedSearchResults = [];
                    return;
                }

                const limitedMatches = mergedMatches.slice(
                    0,
                    this.advancedSearchMaxResults
                );

                const hydrated = await this.hydrateAdvancedSearchMatches(
                    limitedMatches,
                    translationId,
                    transliterationId,
                    signal
                );

                if (signal.aborted) return;
                this.advancedSearchResults = hydrated;
            } catch (error) {
                if (error?.name === "AbortError") return;
                console.error("Advanced search failed:", error);
                this.advancedSearchResults = [];
                this.advancedSearchTotalMatches = 0;
                const status = this.getHttpStatusFromError(error);
                const message = String(error?.message || "").toUpperCase();
                if (status === 429 || message.includes("RATE_LIMIT")) {
                    this.advancedSearchError =
                        "Quran search is temporarily rate-limited. Please wait a moment and try again.";
                    return;
                }
                if (message.includes("FAILED TO FETCH")) {
                    this.advancedSearchError =
                        "Unable to reach Quran search right now. Please retry in a moment.";
                    return;
                }
                this.advancedSearchError =
                    "Unable to search verses right now. Please try again.";
            } finally {
                if (this.advancedSearchAbortController === controller) {
                    this.advancedSearchAbortController = null;
                    this.advancedSearchLoading = false;
                }
            }
        },
        alignAyahCardAfterSearch(index, behavior = "auto") {
            if (
                typeof index !== "number" ||
                index < 0 ||
                typeof window === "undefined"
            ) {
                return;
            }
            this.$nextTick(() => {
                const align = () => {
                    const cardEl = document.getElementById(`ayah-card-${index}`);
                    if (!cardEl || !cardEl.getBoundingClientRect) return;

                    const rect = cardEl.getBoundingClientRect();
                    const offset = this.currentHeaderOffset;
                    const viewportHeight = window.innerHeight;
                    const audioHeight = this.getAudioPlayerHeight();
                    const availableHeight = Math.max(
                        viewportHeight - offset - audioHeight,
                        0
                    );
                    const centerFactor =
                        typeof this.preferredPlaybackScrollFactor === "number"
                            ? this.preferredPlaybackScrollFactor
                            : 0.38;
                    const desiredCenter = offset + availableHeight * centerFactor;
                    const delta = rect.top + rect.height / 2 - desiredCenter;
                    if (Math.abs(delta) <= 8) return;

                    const maxScroll = Math.max(
                        document.documentElement.scrollHeight -
                            window.innerHeight,
                        0
                    );
                    const target = Math.min(
                        Math.max(0, window.scrollY + delta),
                        maxScroll
                    );
                    window.scrollTo({ top: target, behavior });
                };

                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(align);
                } else {
                    align();
                }
            });
        },
        async openAdvancedSearchResult(result) {
            if (!result) return;
            const surahNumber = Number(result.surahNumber);
            const ayahNumber = Number(result.ayahNumber);
            if (!surahNumber || !ayahNumber) return;

            this.isNavigating = true;
            this.lastManualNavigationAt = Date.now();

            try {
                if (String(this.selectedSurah) !== String(surahNumber)) {
                    await this.selectSurah(surahNumber, { skipScroll: true });
                }

                const targetIndex = Math.max(0, ayahNumber - 1);
                this.searchQuery = "";
                this.debouncedQuery = "";

                const total = Array.isArray(this.filteredAyahs)
                    ? this.filteredAyahs.length
                    : 0;
                const safeIndex = Math.min(
                    targetIndex,
                    Math.max(total - 1, 0)
                );
                const start = Math.max(0, safeIndex - this.buffer);
                this.visibleStart = start;
                this.visibleEnd = Math.min(
                    total,
                    start + this.windowSize + this.buffer * 2
                );

                await this.$nextTick();
                this.scrollToAyahIndex(safeIndex, {
                    settle: true,
                    settleDelay: 260,
                    force: true,
                    behavior: "auto",
                    lock: true,
                });
                this.alignAyahCardAfterSearch(safeIndex, "smooth");
                setTimeout(() => {
                    this.alignAyahCardAfterSearch(safeIndex, "auto");
                }, 520);
                this.announce(
                    `Opened Surah ${surahNumber}, Ayah ${ayahNumber}.`
                );
            } catch (error) {
                console.error("Unable to open advanced search result:", error);
                this.announce("Unable to open this ayah right now.");
            }
        },
        prepareSettingsDraft() {
            if (!this.settingsDraft) return;
            this.settingsDraft.showTajweed = !!this.showTajweed;
            this.settingsDraft.showRealtimeHighlighting = !!this.showRealtimeHighlighting;
            this.settingsDraft.showWordTranslation = !!this.showWordTranslation;
            this.settingsDraft.playbackMode = this.playbackMode;
        },
        applySettingsDraft() {
            if (!this.settingsDraft) return;
            this.showTajweed = !!this.settingsDraft.showTajweed;
            this.showRealtimeHighlighting = !!this.settingsDraft.showRealtimeHighlighting;
            this.showWordTranslation = !!this.settingsDraft.showWordTranslation;
            if (this.settingsDraft.playbackMode) {
                this.setPlaybackMode(this.settingsDraft.playbackMode);
            }
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
        prepareFontPicker() {
            this.fontPickerAlert = "";
            this.clearFontPickerTimer();
            if (
                !this.quranFontDraftId &&
                Array.isArray(this.quranFonts) &&
                this.quranFonts.length
            ) {
                this.quranFontDraftId = this.selectedQuranFontId || this.quranFonts[0].id;
            } else if (!this.quranFontDraftId) {
                this.quranFontDraftId = this.selectedQuranFontId || "";
            } else if (!this.selectedQuranFontId) {
                this.selectedQuranFontId = this.quranFontDraftId;
            }
            if (!this.quranFonts.length && !this.quranFontsLoading) {
                this.fetchQuranFonts();
            }
            if (!this.fontPreviewTajweedText && !this.fontPreviewLoading) {
                this.fetchFontPreviewAyah();
            }
        },
        openFontPicker() {
            this.prepareFontPicker();
            if (this.isMobile) {
                const modalEl = document.getElementById(
                    this.fontPickerModalId
                );
                if (!modalEl) return;
                this.fontPickerModalInstance =
                    this.fontPickerModalInstance ||
                    Modal.getInstance(modalEl) ||
                    new Modal(modalEl);
                this.fontPickerModalInstance.show();
                return;
            }
            const offcanvasEl = this.$refs.fontPickerOffcanvas;
            if (
                !offcanvasEl ||
                !(window && window.bootstrap && window.bootstrap.Offcanvas)
            )
                return;
            this.fontPickerOffcanvasInstance =
                window.bootstrap.Offcanvas.getInstance(offcanvasEl) ||
                window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
            this.fontPickerOffcanvasInstance.show();
        },
        closeFontPicker() {
            const modalEl = document.getElementById(this.fontPickerModalId);
            if (modalEl) {
                const modal =
                    Modal.getInstance(modalEl) ||
                    this.fontPickerModalInstance;
                if (modal) modal.hide();
            }
            const offcanvasEl = this.$refs.fontPickerOffcanvas;
            if (
                offcanvasEl &&
                window &&
                window.bootstrap &&
                window.bootstrap.Offcanvas
            ) {
                const instance =
                    window.bootstrap.Offcanvas.getInstance(offcanvasEl) ||
                    this.fontPickerOffcanvasInstance;
                if (instance) instance.hide();
            }
            this.clearFontPickerTimer();
        },
        selectQuranFontDraft(id) {
            this.quranFontDraftId = id;
        },
        applyQuranFontSelection() {
            if (!this.quranFontDraftId) return;
            this.selectedQuranFontId = this.quranFontDraftId;
            this.persistLocalSetting(
                this.quranFontPreferenceKey,
                this.selectedQuranFontId
            );
            this.syncQuranFontStack();
            const selected =
                this.quranFonts.find(
                    (font) => font.id === this.selectedQuranFontId
                ) || this.activeQuranFont;
            const fontSupportsTajweed = !!selected?.isTajweed;
            const wasTajweedEnabled = !!this.showTajweed;
            if (fontSupportsTajweed && !wasTajweedEnabled) {
                this.showTajweed = true;
                if (this.settingsDraft)
                    this.settingsDraft.showTajweed = true;
            }
            const label = selected?.label || "Quran font";
            const tajweedNotice =
                fontSupportsTajweed && !wasTajweedEnabled
                    ? " Tajweed colors enabled."
                    : "";
            this.fontPickerAlert = `Font applied: ${label}.${tajweedNotice}`;
            this.clearFontPickerTimer();
            this.fontPickerAlertTimer = setTimeout(() => {
                this.fontPickerAlert = "";
                this.closeFontPicker();
            }, 3000);
        },
        clearFontPickerTimer() {
            if (this.fontPickerAlertTimer) {
                clearTimeout(this.fontPickerAlertTimer);
                this.fontPickerAlertTimer = null;
            }
        },
        ensureSelectedQuranFont() {
            if (!Array.isArray(this.quranFonts) || !this.quranFonts.length) {
                return;
            }
            const normalized = this.coerceLegacyFontId(this.selectedQuranFontId);
            if (normalized && normalized !== this.selectedQuranFontId) {
                this.selectedQuranFontId = normalized;
            }
            const exists = this.quranFonts.some(
                (font) => font.id === this.selectedQuranFontId
            );
            if (!exists) {
                this.selectedQuranFontId = this.quranFonts[0].id;
            }
            const draftExists = this.quranFonts.some(
                (font) => font.id === this.quranFontDraftId
            );
            if (!draftExists) {
                this.quranFontDraftId = this.selectedQuranFontId;
            }
            this.persistLocalSetting(
                this.quranFontPreferenceKey,
                this.selectedQuranFontId
            );
            this.syncQuranFontStack();
        },
        syncQuranFontStack(fontId = "") {
            const targetId = fontId || this.selectedQuranFontId;
            const selected =
                this.quranFonts.find((font) => font.id === targetId) ||
                this.activeQuranFont;
            const stack =
                selected?.cssStack ||
                this.storedQuranFontStack ||
                this.defaultQuranFontStack;
            if (!stack) return;
            this.storedQuranFontStack = stack;
            this.persistLocalSetting(this.quranFontStackPreferenceKey, stack);
            if (typeof document !== "undefined") {
                document.documentElement.style.setProperty(
                    "--ic-quran-arabic-font",
                    stack
                );
            }
        },
        coerceLegacyFontId(value) {
            if (!value) return "";
            const raw = String(value).toLowerCase();
            if (this.quranFonts?.some((font) => font.id === raw)) return raw;
            if (raw.includes("tajweed")) return "tajweed-mushaf";
            if (raw.includes("indopak") || raw.includes("indo") || raw.includes("nastaliq"))
                return "indopak";
            if (raw.includes("uthmani") || raw.includes("uthmanic"))
                return "uthmani";
            if (raw.includes("qpc") || raw.includes("hafs") || raw.includes("simple"))
                return "qpc-hafs";
            return raw;
        },
        getQuranComFonts() {
            return [
                {
                    id: "qpc-hafs",
                    label: "QPC Hafs",
                    cssStack:
                        "'UthmanicHafs', 'Noto Naskh Arabic', 'Amiri', serif",
                    source: "Quran.com",
                    inputId: "qpc-hafs",
                    isTajweed: false,
                },
                {
                    id: "uthmani",
                    label: "Uthmani",
                    cssStack:
                        "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",
                    source: "Quran.com",
                    inputId: "uthmani",
                    isTajweed: false,
                },
                {
                    id: "indopak",
                    label: "IndoPak",
                    cssStack:
                        "'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif",
                    source: "Quran.com",
                    inputId: "indopak",
                    isTajweed: false,
                },
                {
                    id: "tajweed-mushaf",
                    label: "Tajweed Mushaf (QCF V4)",
                    cssStack:
                        "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",
                    source: "Quran.com",
                    inputId: "tajweed-mushaf",
                    isTajweed: true,
                },
            ];
        },
        getFallbackQuranFonts() {
            return [
                {
                    id: "scheherazade-new",
                    label: "Scheherazade New",
                    cssStack:
                        "'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif",
                    source: "Local",
                    inputId: "scheherazade-new",
                    isTajweed: false,
                },
                {
                    id: "uthmanic-hafs",
                    label: "Uthmanic Hafs",
                    cssStack: "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",
                    source: "Local",
                    inputId: "uthmanic-hafs",
                    isTajweed: true,
                },
                {
                    id: "noto-naskh-arabic",
                    label: "Noto Naskh Arabic",
                    cssStack: "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif",
                    source: "Google Fonts",
                    inputId: "noto-naskh-arabic",
                    isTajweed: false,
                },
                {
                    id: "noto-nastaliq-urdu",
                    label: "Noto Nastaliq Urdu",
                    cssStack: "'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif",
                    source: "Google Fonts",
                    inputId: "noto-nastaliq-urdu",
                    isTajweed: false,
                },
                {
                    id: "reem-kufi",
                    label: "Reem Kufi",
                    cssStack: "'Reem Kufi', 'Cairo', 'Amiri', serif",
                    source: "Google Fonts",
                    inputId: "reem-kufi",
                    isTajweed: false,
                },
                {
                    id: "amiri",
                    label: "Amiri",
                    cssStack: "'Amiri', 'Scheherazade New', serif",
                    source: "Local",
                    inputId: "amiri",
                    isTajweed: false,
                },
            ];
        },
        getFontStackFallback(identifier = "", label = "") {
            const options = [
                "'Scheherazade New', 'Noto Naskh Arabic', 'Amiri', serif",
                "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif",
                "'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif",
                "'Reem Kufi', 'Cairo', 'Amiri', serif",
                "'Aref Ruqaa', 'Amiri', serif",
                "'Lateef', 'Amiri', serif",
                "'Cairo', 'Amiri', serif",
                "'Amiri', 'Scheherazade New', serif",
            ];
            const key = `${identifier} ${label}`.trim().toLowerCase();
            if (!key) return this.defaultQuranFontStack;
            let hash = 0;
            for (let i = 0; i < key.length; i += 1) {
                hash = (hash * 31 + key.charCodeAt(i)) | 0;
            }
            const index = Math.abs(hash) % options.length;
            return options[index] || this.defaultQuranFontStack;
        },
        getFontStackForEdition(identifier = "", label = "") {
            const id = `${identifier}`.toLowerCase();
            const name = `${label}`.toLowerCase();
            const token = `${id} ${name}`;
            if (token.includes("uthmani") || token.includes("uthmanic")) {
                return "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif";
            }
            if (token.includes("tajweed")) {
                return "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif";
            }
            if (token.includes("warsh")) {
                return "'Amiri', 'Noto Naskh Arabic', 'Scheherazade New', serif";
            }
            if (token.includes("nastaliq") || token.includes("indopak") || token.includes("indo")) {
                return "'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif";
            }
            if (token.includes("ruqaa") || token.includes("ruqa")) {
                return "'Aref Ruqaa', 'Amiri', serif";
            }
            if (token.includes("kufi") || token.includes("kufic")) {
                return "'Reem Kufi', 'Cairo', 'Amiri', serif";
            }
            if (token.includes("cairo")) {
                return "'Cairo', 'Amiri', serif";
            }
            if (token.includes("lateef")) {
                return "'Lateef', 'Amiri', serif";
            }
            if (token.includes("naskh")) {
                return "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";
            }
            if (token.includes("imlaei") || token.includes("imla")) {
                return "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";
            }
            if (token.includes("amiri")) {
                return "'Amiri', 'Scheherazade New', serif";
            }
            if (token.includes("khaled")) {
                return "'Amiri', 'Scheherazade New', serif";
            }
            if (token.includes("scheherazade")) {
                return "'Scheherazade New', 'Amiri', serif";
            }
            if (token.includes("simple")) {
                return "'Noto Naskh Arabic', 'Scheherazade New', 'Amiri', serif";
            }
            return this.getFontStackFallback(identifier, label);
        },
        isTajweedEdition(identifier = "", label = "") {
            const token = `${identifier} ${label}`.toLowerCase();
            return token.includes("tajweed");
        },
        getFontPreviewHtml(font) {
            const raw =
                this.fontPreviewTajweedText ||
                this.fontPreviewText ||
                this.fontPreviewFallbackText;
            if (!raw) return "";
            if (font?.isTajweed) {
                return this.formatTajweedText(raw);
            }
            const plain = this.fontPreviewText || this.fontPreviewFallbackText;
            return this.escapeHtml(plain);
        },
        normalizeQuranFonts(editions) {
            const out = [];
            const seen = new Set();
            (editions || []).forEach((edition) => {
                const identifier = edition?.identifier || edition?.name || "";
                if (!identifier || seen.has(identifier)) return;
                const label =
                    edition?.englishName ||
                    edition?.name ||
                    edition?.identifier ||
                    "Quran font";
                const cssStack = this.getFontStackForEdition(
                    edition?.identifier || "",
                    label
                );
                const isTajweed = this.isTajweedEdition(
                    edition?.identifier || "",
                    label
                );
                const inputId = identifier
                    .toString()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-+|-+$)/g, "");
                const sourceLabel =
                    edition?.type ||
                    edition?.format ||
                    edition?.language ||
                    "API";
                out.push({
                    id: identifier,
                    label,
                    cssStack,
                    isTajweed,
                    source: sourceLabel,
                    inputId: inputId || identifier,
                });
                seen.add(identifier);
            });
            out.sort((a, b) => a.label.localeCompare(b.label));
            return out;
        },
        async fetchQuranFonts() {
            this.quranFontsLoading = true;
            this.quranFontsError = "";
            try {
                this.quranFonts = this.getQuranComFonts();
                this.ensureSelectedQuranFont();
            } catch (error) {
                console.error("Error fetching Quran fonts:", error);
                this.quranFontsError =
                    "Unable to load fonts right now. Showing available defaults.";
                this.quranFonts = this.getQuranComFonts();
                this.ensureSelectedQuranFont();
            } finally {
                this.quranFontsLoading = false;
            }
        },
        async fetchFontPreviewAyah() {
            this.fontPreviewLoading = true;
            this.fontPreviewError = "";
            try {
                const { data } = await this.cachedFetchJSON(
                    "https://api.alquran.cloud/v1/ayah/1/quran-tajweed",
                    "cache:quran-font-preview",
                    30 * 24 * 60 * 60 * 1000
                );
                const previewText = data?.data?.text || "";
                if (previewText) {
                    this.fontPreviewTajweedText = previewText;
                    this.fontPreviewText = this.stripTajweedMarkers(previewText);
                } else {
                    this.fontPreviewText = this.fontPreviewFallbackText;
                }
            } catch (error) {
                console.error("Error fetching font preview ayah:", error);
                this.fontPreviewError =
                    "Preview unavailable. Using default ayah.";
                this.fontPreviewText = this.fontPreviewFallbackText;
            } finally {
                this.fontPreviewLoading = false;
            }
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
        persistLocalSetting(key, value) {
            if (typeof window === "undefined") return;
            try {
                localStorage.setItem(key, value);
            } catch (_) {}
        },
        getOrCreateSuratPreferenceAnonId() {
            if (this.suratPreferenceAnonId) {
                return this.suratPreferenceAnonId;
            }
            if (typeof window === "undefined") return "";
            try {
                const key = this.suratPreferenceAnonStorageKey;
                let anonId = localStorage.getItem(key);
                if (!anonId) {
                    anonId = `anon-${Math.random().toString(36).slice(2, 12)}`;
                    localStorage.setItem(key, anonId);
                }
                this.suratPreferenceAnonId = anonId;
                return anonId;
            } catch (_) {
                return "";
            }
        },
        buildScopedFontPreferenceKey(baseKey) {
            if (this.bookmarkStorageUserId) {
                return `${baseKey}_user_${this.bookmarkStorageUserId}`;
            }
            const anonId = this.getOrCreateSuratPreferenceAnonId();
            return `${baseKey}_anon_${anonId || "local"}`;
        },
        readScopedFontPreference(baseKey, options = {}) {
            const { json = false } = options;
            if (typeof window === "undefined") return null;
            try {
                const key = this.buildScopedFontPreferenceKey(baseKey);
                const raw = localStorage.getItem(key);
                if (raw === null || raw === undefined || raw === "") return null;
                if (!json) return raw;
                return JSON.parse(raw);
            } catch (_) {
                return null;
            }
        },
        writeScopedFontPreference(baseKey, value, options = {}) {
            const { json = false } = options;
            if (typeof window === "undefined") return;
            try {
                const key = this.buildScopedFontPreferenceKey(baseKey);
                const payload = json ? JSON.stringify(value) : String(value);
                localStorage.setItem(key, payload);
            } catch (_) {
                // ignore storage errors
            }
        },
        readScopedBooleanPreference(baseKey, fallback = false) {
            const raw = this.readScopedFontPreference(baseKey);
            if (raw === null || raw === undefined || raw === "") {
                return !!fallback;
            }
            const normalized = String(raw).trim().toLowerCase();
            if (["1", "true", "on", "yes"].includes(normalized)) return true;
            if (["0", "false", "off", "no"].includes(normalized)) return false;
            return !!fallback;
        },
        writeScopedBooleanPreference(baseKey, value) {
            this.writeScopedFontPreference(baseKey, value ? "1" : "0");
        },
        async initializeDeepFocusModePreference() {
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

            const currentValue = !!this.isDeepFocusMode;
            const hasScopedValue =
                this.readScopedFontPreference(
                    this.deepFocusModePreferenceBaseKey
                ) !== null;
            this.isDeepFocusMode = this.readScopedBooleanPreference(
                this.deepFocusModePreferenceBaseKey,
                currentValue
            );
            if (!hasScopedValue) {
                // Preserve the current runtime mode when scope changes (anon<->user).
                this.isDeepFocusMode = currentValue;
            }
            this.writeScopedBooleanPreference(
                this.deepFocusModePreferenceBaseKey,
                this.isDeepFocusMode
            );
        },
        async initializeReadingFullscreenPreference() {
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

            const currentValue = !!this.isReadingFullscreen;
            const hasScopedValue =
                this.readScopedFontPreference(
                    this.readingFullscreenPreferenceBaseKey
                ) !== null;
            const scopedValue = this.readScopedBooleanPreference(
                this.readingFullscreenPreferenceBaseKey,
                currentValue
            );
            const preferredValue = hasScopedValue ? scopedValue : currentValue;

            // Keep mobile behavior untouched while still retaining the desktop preference.
            this.isReadingFullscreen = !!preferredValue && !!this.isDesktopWide;
            this.syncReadingFullscreenBodyClass(this.isReadingFullscreen);
            this.writeScopedBooleanPreference(
                this.readingFullscreenPreferenceBaseKey,
                !!preferredValue
            );
        },
        clampFontSizeValue(value, min, max, fallback) {
            const parsed = Number(value);
            if (!Number.isFinite(parsed)) return fallback;
            return Math.min(max, Math.max(min, parsed));
        },
        persistReaderFontSizePreferences() {
            this.writeScopedFontPreference(
                this.suratReaderFontSizePreferenceBaseKey,
                {
                    arabicFontSize: this.clampFontSizeValue(
                        this.arabicFontSize,
                        16,
                        40,
                        28
                    ),
                    translationFontSize: this.clampFontSizeValue(
                        this.translationFontSize,
                        12,
                        30,
                        18
                    ),
                },
                { json: true }
            );
        },
        persistSurahInfoFontSizePreference() {
            this.writeScopedFontPreference(
                this.surahInfoFontSizePreferenceBaseKey,
                this.clampFontSizeValue(
                    this.surahInfoFontSize,
                    this.surahInfoFontSizeMin,
                    this.surahInfoFontSizeMax,
                    16
                )
            );
        },
        persistOnboardingFontSizePreference() {
            this.writeScopedFontPreference(
                this.suratOnboardingFontSizePreferenceBaseKey,
                this.clampFontSizeValue(
                    this.suratOnboardingFontSize,
                    this.suratOnboardingFontSizeMin,
                    this.suratOnboardingFontSizeMax,
                    15
                )
            );
        },
        async initializeFontSizePreferences() {
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

            const storedReaderSizes = this.readScopedFontPreference(
                this.suratReaderFontSizePreferenceBaseKey,
                { json: true }
            );
            if (storedReaderSizes && typeof storedReaderSizes === "object") {
                this.arabicFontSize = this.clampFontSizeValue(
                    storedReaderSizes.arabicFontSize,
                    16,
                    40,
                    this.arabicFontSize
                );
                this.translationFontSize = this.clampFontSizeValue(
                    storedReaderSizes.translationFontSize,
                    12,
                    30,
                    this.translationFontSize
                );
            }

            const storedSurahInfoFontSize = this.readScopedFontPreference(
                this.surahInfoFontSizePreferenceBaseKey
            );
            if (storedSurahInfoFontSize !== null) {
                this.surahInfoFontSize = this.clampFontSizeValue(
                    storedSurahInfoFontSize,
                    this.surahInfoFontSizeMin,
                    this.surahInfoFontSizeMax,
                    this.surahInfoFontSize
                );
            }

            const storedOnboardingFontSize = this.readScopedFontPreference(
                this.suratOnboardingFontSizePreferenceBaseKey
            );
            if (storedOnboardingFontSize !== null) {
                this.suratOnboardingFontSize = this.clampFontSizeValue(
                    storedOnboardingFontSize,
                    this.suratOnboardingFontSizeMin,
                    this.suratOnboardingFontSizeMax,
                    this.suratOnboardingFontSize
                );
            }

            this.persistReaderFontSizePreferences();
            this.persistSurahInfoFontSizePreference();
            this.persistOnboardingFontSizePreference();
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
        buildPinnedSectionUiStorageKey() {
            if (!this.bookmarkStorageUserId) {
                return "";
            }
            return `${this.pinnedSectionUiStateStorageKeyBase}_user_${this.bookmarkStorageUserId}`;
        },
        async initializePinnedSectionUiStorageKey() {
            if (!this.bookmarkAuthenticated) {
                this.pinnedSectionUiStateStorageKey = "";
                return "";
            }
            if (
                this.pinnedSectionUiStateStorageKey &&
                this.pinnedSectionUiStateStorageKey.startsWith(
                    `${this.pinnedSectionUiStateStorageKeyBase}_user_`
                ) &&
                this.bookmarkStorageUserId
            ) {
                return this.pinnedSectionUiStateStorageKey;
            }
            await this.fetchBookmarkStorageUserId();
            this.pinnedSectionUiStateStorageKey =
                this.buildPinnedSectionUiStorageKey();
            return this.pinnedSectionUiStateStorageKey;
        },
        async loadPinnedSectionUiPreference() {
            if (!this.bookmarkAuthenticated) {
                this.pinnedSectionUiStateStorageKey = "";
                this.isPinnedSectionCollapsed = false;
                this.isPinnedSectionHidden = false;
                return;
            }
            const key = await this.initializePinnedSectionUiStorageKey();
            if (!key) {
                this.isPinnedSectionCollapsed = false;
                this.isPinnedSectionHidden = false;
                return;
            }
            try {
                const raw = localStorage.getItem(key);
                if (!raw) {
                    this.isPinnedSectionCollapsed = false;
                    this.isPinnedSectionHidden = false;
                    return;
                }
                const parsed = JSON.parse(raw);
                this.isPinnedSectionCollapsed = !!parsed?.collapsed;
                this.isPinnedSectionHidden = !!parsed?.hidden;
            } catch (_) {
                this.isPinnedSectionCollapsed = false;
                this.isPinnedSectionHidden = false;
            }
        },
        persistPinnedSectionUiPreference() {
            if (!this.bookmarkAuthenticated) return;
            const key = this.pinnedSectionUiStateStorageKey;
            if (!key) return;
            try {
                localStorage.setItem(
                    key,
                    JSON.stringify({
                        collapsed: !!this.isPinnedSectionCollapsed,
                        hidden: !!this.isPinnedSectionHidden,
                    })
                );
            } catch (_) {
                // ignore storage quota errors
            }
        },
        togglePinnedSectionCollapsed() {
            this.isPinnedSectionCollapsed = !this.isPinnedSectionCollapsed;
            this.persistPinnedSectionUiPreference();
        },
        hidePinnedSection() {
            this.isPinnedSectionHidden = true;
            this.persistPinnedSectionUiPreference();
        },
        showPinnedSection() {
            this.isPinnedSectionHidden = false;
            this.persistPinnedSectionUiPreference();
        },
        buildPinnedAyahStorageKey() {
            if (!this.bookmarkStorageUserId) {
                return "";
            }
            return `${this.pinnedAyahStorageKeyBase}_user_${this.bookmarkStorageUserId}`;
        },
        async initializePinnedAyahStorageKey() {
            if (!this.bookmarkAuthenticated) {
                this.pinnedAyahStorageKey = "";
                return "";
            }
            if (
                this.pinnedAyahStorageKey &&
                this.pinnedAyahStorageKey.startsWith(
                    `${this.pinnedAyahStorageKeyBase}_user_`
                ) &&
                this.bookmarkStorageUserId
            ) {
                return this.pinnedAyahStorageKey;
            }
            await this.fetchBookmarkStorageUserId();
            this.pinnedAyahStorageKey = this.buildPinnedAyahStorageKey();
            return this.pinnedAyahStorageKey;
        },
        async loadPinnedAyahs() {
            const emptyState = {};
            if (!this.bookmarkAuthenticated) {
                this.pinnedAyahStorageKey = "";
                this.pinnedAyahs = emptyState;
                return;
            }
            const scopedStorageKey = await this.initializePinnedAyahStorageKey();
            if (!scopedStorageKey) {
                this.pinnedAyahs = emptyState;
                return;
            }
            try {
                const raw = localStorage.getItem(scopedStorageKey);
                if (!raw) {
                    this.pinnedAyahs = emptyState;
                    return;
                }
                const parsed = JSON.parse(raw);
                if (!parsed || typeof parsed !== "object") {
                    this.pinnedAyahs = emptyState;
                    return;
                }

                const source = Array.isArray(parsed)
                    ? parsed.reduce((acc, item) => {
                        if (!item || typeof item !== "object") return acc;
                        const surahNumber = Number(item.surahNumber);
                        const ayahNumber = Number(item.ayahNumber);
                        if (!surahNumber || !ayahNumber) return acc;
                        const key = this.buildAyahKey(surahNumber, ayahNumber);
                        acc[key] = item;
                        return acc;
                    }, {})
                    : parsed;

                const normalized = {};
                Object.entries(source).forEach(([rawKey, value]) => {
                    if (!value || typeof value !== "object") return;
                    const keyParts = String(rawKey || "").split(":");
                    const surahNumber = Number(value.surahNumber || keyParts[0]);
                    const ayahNumber = Number(value.ayahNumber || keyParts[1]);
                    if (!surahNumber || !ayahNumber) return;

                    const key = this.buildAyahKey(surahNumber, ayahNumber);
                    const translation = String(value.translation || "")
                        .replace(/\s+/g, " ")
                        .trim();
                    const text = String(value.text || "")
                        .replace(/\s+/g, " ")
                        .trim();
                    const previewSource = String(
                        value.preview || translation || text || ""
                    )
                        .replace(/\s+/g, " ")
                        .trim();

                    normalized[key] = {
                        key,
                        surahNumber,
                        ayahNumber,
                        surahEnglishName: String(
                            value.surahEnglishName || value.surahName || ""
                        ).trim(),
                        surahArabicName: String(value.surahArabicName || "").trim(),
                        translation,
                        text,
                        preview:
                            previewSource ||
                            `Surah ${surahNumber}, Ayah ${ayahNumber}`,
                        pinnedAt:
                            Number(value.pinnedAt) ||
                            Number(value.createdAt) ||
                            0,
                    };
                });
                this.pinnedAyahs = normalized;
            } catch (_) {
                this.pinnedAyahs = emptyState;
            }
        },
        persistPinnedAyahs(next = this.pinnedAyahs) {
            if (!this.bookmarkAuthenticated) return;
            const scopedStorageKey = this.pinnedAyahStorageKey;
            if (!scopedStorageKey) return;
            try {
                localStorage.setItem(
                    scopedStorageKey,
                    JSON.stringify(next || {})
                );
            } catch (_) {
                // ignore storage quota errors
            }
        },
        buildPinnedAyahEntry(ayah, options = {}) {
            const surahNumber = Number(
                options.surahNumber ||
                    this.surahDetails?.surahNumber ||
                    this.selectedSurah
            );
            const ayahNumber = Number(
                options.ayahNumber || ayah?.numberInSurah || ayah?.number
            );
            if (!surahNumber || !ayahNumber) return null;

            const key = this.buildAyahKey(surahNumber, ayahNumber);
            const surahLookup = Array.isArray(this.surahs)
                ? this.surahs.find(
                    (surah) => Number(surah.number) === surahNumber
                )
                : null;
            const translation = String(
                options.translation || ayah?.translation || ""
            )
                .replace(/\s+/g, " ")
                .trim();
            const text = String(options.text || ayah?.text || "")
                .replace(/\s+/g, " ")
                .trim();
            const previewSource = translation || text || "";
            const preview =
                previewSource.length > 170
                    ? `${previewSource.slice(0, 167).trimEnd()}...`
                    : previewSource;

            return {
                key,
                surahNumber,
                ayahNumber,
                surahEnglishName: String(
                    options.surahEnglishName ||
                        this.surahDetails?.englishName ||
                        surahLookup?.englishName ||
                        ""
                ).trim(),
                surahArabicName: String(
                    options.surahArabicName ||
                        this.surahDetails?.name ||
                        surahLookup?.name ||
                        ""
                ).trim(),
                translation,
                text,
                preview: preview || `Surah ${surahNumber}, Ayah ${ayahNumber}`,
                pinnedAt: Number(options.pinnedAt) || Date.now(),
            };
        },
        syncPinnedAyahsForCurrentSurah() {
            if (
                !this.surahDetails ||
                !Array.isArray(this.surahDetails.ayahs) ||
                !this.surahDetails.ayahs.length ||
                !this.pinnedAyahs ||
                typeof this.pinnedAyahs !== "object"
            ) {
                return;
            }
            const surahNumber = Number(this.surahDetails.surahNumber);
            if (!surahNumber) return;

            let changed = false;
            const next = { ...this.pinnedAyahs };
            this.surahDetails.ayahs.forEach((ayah) => {
                const ayahNumber = Number(ayah?.numberInSurah || ayah?.number);
                if (!ayahNumber) return;
                const key = this.buildAyahKey(surahNumber, ayahNumber);
                const existing = next[key];
                if (!existing) return;

                const refreshed = this.buildPinnedAyahEntry(ayah, {
                    pinnedAt: existing.pinnedAt || existing.createdAt || 0,
                    surahEnglishName:
                        existing.surahEnglishName ||
                        this.surahDetails?.englishName ||
                        "",
                    surahArabicName:
                        existing.surahArabicName || this.surahDetails?.name || "",
                });
                if (!refreshed) return;

                if (
                    existing.translation !== refreshed.translation ||
                    existing.text !== refreshed.text ||
                    existing.preview !== refreshed.preview ||
                    existing.surahEnglishName !== refreshed.surahEnglishName ||
                    existing.surahArabicName !== refreshed.surahArabicName
                ) {
                    next[key] = {
                        ...existing,
                        ...refreshed,
                        pinnedAt: existing.pinnedAt || refreshed.pinnedAt,
                    };
                    changed = true;
                }
            });

            if (changed) {
                this.pinnedAyahs = next;
            }
        },
        isAyahPinned(ayah) {
            const key = this.getAyahKeyForAyah(ayah);
            return !!(key && this.pinnedAyahs[key]);
        },
        async togglePinnedAyah(ayah) {
            if (!this.bookmarkAuthenticated) {
                const isAuthed = await this.ensureAuthenticated(
                    "Please log in to manage pinned ayat.",
                    { ayah }
                );
                if (!isAuthed) return;
            }
            await this.initializePinnedAyahStorageKey();
            if (!this.pinnedAyahStorageKey) return;
            const entry = this.buildPinnedAyahEntry(ayah);
            if (!entry) return;

            if (this.pinnedAyahs[entry.key]) {
                this.removePinnedAyahByKey(entry.key, {
                    announceRemoval: true,
                });
                return;
            }

            this.pinnedAyahs = {
                ...this.pinnedAyahs,
                [entry.key]: entry,
            };
            this.triggerAyahFeedback(
                entry.key,
                "Pin saved",
                "feedback-pin-saved",
                "check",
                "",
                "",
                3000
            );
            this.announce(
                `Pinned Surah ${entry.surahNumber}, Ayah ${entry.ayahNumber}.`
            );
        },
        removePinnedAyahByKey(key, options = {}) {
            const { announceRemoval = true } = options;
            if (!key || !this.pinnedAyahs[key]) return;

            const removed = this.pinnedAyahs[key];
            const next = { ...this.pinnedAyahs };
            delete next[key];
            this.pinnedAyahs = next;
            this.triggerAyahFeedback(
                key,
                "Pin removed",
                "feedback-pin-removed",
                "trash",
                "",
                "",
                3000
            );

            if (announceRemoval) {
                const ref =
                    removed?.surahNumber && removed?.ayahNumber
                        ? `Surah ${removed.surahNumber}, Ayah ${removed.ayahNumber}`
                        : "selected ayah";
                this.announce(`Removed ${ref} from pinned ayahs.`);
            }
        },
        getPinnedSurahName(pinnedAyah) {
            const explicit = String(pinnedAyah?.surahEnglishName || "").trim();
            if (explicit) return explicit;
            const surahNumber = Number(pinnedAyah?.surahNumber);
            if (!surahNumber) return "Surah";
            const match = Array.isArray(this.surahs)
                ? this.surahs.find(
                    (surah) => Number(surah.number) === surahNumber
                )
                : null;
            return match?.englishName || `Surah ${surahNumber}`;
        },
        getPinnedAyahPreview(pinnedAyah) {
            const preview = String(
                pinnedAyah?.preview ||
                    pinnedAyah?.translation ||
                    pinnedAyah?.text ||
                    ""
            )
                .replace(/\s+/g, " ")
                .trim();
            return preview || "Pinned for quick access.";
        },
        async openPinnedAyah(pinnedAyah) {
            const surahNumber = Number(pinnedAyah?.surahNumber);
            const ayahNumber = Number(pinnedAyah?.ayahNumber);
            if (!surahNumber || !ayahNumber) return;

            try {
                if (String(this.selectedSurah) !== String(surahNumber)) {
                    await this.selectSurah(surahNumber, { skipScroll: true });
                }
                this.searchQuery = "";
                this.debouncedQuery = "";
                const targetIndex = Math.max(0, ayahNumber - 1);
                this.selectCard(targetIndex);
                this.$nextTick(() => {
                    this.scrollToAyahIndex(targetIndex, {
                        settle: true,
                        force: true,
                        behavior: "smooth",
                        lock: true,
                    });
                });
                this.announce(`Opened Surah ${surahNumber}, Ayah ${ayahNumber}.`);
            } catch (_) {
                // ignore navigation errors
            }
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
            if (ayah.transliteration)
                lines.push(`Transliteration: ${ayah.transliteration}`);
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
        getAyahKeyForAyah(ayah) {
            if (!this.surahDetails || !ayah) return "";
            const surahNumber = Number(this.surahDetails.surahNumber);
            const ayahNumber = Number(ayah.numberInSurah || ayah.number);
            if (!surahNumber || !ayahNumber) return "";
            return this.buildAyahKey(surahNumber, ayahNumber);
        },
        isAyahAudioDownloading(ayah) {
            const key = this.getAyahKeyForAyah(ayah);
            if (!key) return false;
            return !!this.isAudioDownloading[key];
        },
        isAyahAudioDownloaded(ayah) {
            const key = this.getAyahKeyForAyah(ayah);
            if (!key) return false;
            return !!this.isAudioDownloaded[key];
        },
        markAyahAudioDownloaded(key, duration = 5000) {
            if (!key) return;
            if (typeof this.$set === "function") {
                this.$set(this.isAudioDownloaded, key, true);
            } else {
                this.isAudioDownloaded[key] = true;
            }
            setTimeout(() => {
                if (typeof this.$set === "function") {
                    this.$set(this.isAudioDownloaded, key, false);
                } else {
                    this.isAudioDownloaded[key] = false;
                }
            }, duration);
        },
        sanitizeFilenamePart(value) {
            return String(value || "")
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^a-zA-Z0-9._-]/g, "_")
                .replace(/_+/g, "_")
                .replace(/-+/g, "-");
        },
        buildAyahAudioFilename(ayah) {
            const surahNumber = Number(this.surahDetails?.surahNumber || this.selectedSurah);
            const ayahNumber = Number(ayah?.numberInSurah || ayah?.number);
            const reciter = this.sanitizeFilenamePart(this.selectedReciter || "reciter");
            const parts = [
                "surah",
                surahNumber || "unknown",
                "ayah",
                ayahNumber || "unknown",
                reciter,
            ];
            return `${parts.join("-")}.mp3`;
        },
        buildSurahAudioFilename() {
            const surahNumber = Number(this.surahDetails?.surahNumber || this.selectedSurah);
            const reciter = this.sanitizeFilenamePart(this.selectedReciter || "reciter");
            const parts = ["surah", surahNumber || "unknown", reciter];
            return `${parts.join("-")}.mp3`;
        },
        getSurahAudioMetaKey(surahNumber = this.selectedSurah, reciterId = this.selectedReciter) {
            const normalizedSurah = Number(surahNumber);
            if (!normalizedSurah || !reciterId) return "";
            return `${reciterId}:${normalizedSurah}`;
        },
        setSurahAudioMetaCache(key, value) {
            if (!key) return;
            if (typeof this.$set === "function") {
                this.$set(this.surahAudioMetaByKey, key, value);
            } else {
                this.surahAudioMetaByKey[key] = value;
            }
        },
        setSurahAudioMetaLoading(key, value) {
            if (!key) return;
            if (typeof this.$set === "function") {
                this.$set(this.surahAudioMetaLoadingByKey, key, !!value);
            } else {
                this.surahAudioMetaLoadingByKey[key] = !!value;
            }
        },
        normalizeFileSizeBytes(value) {
            if (typeof value === "number" && Number.isFinite(value) && value > 0) {
                return Math.round(value);
            }
            if (typeof value !== "string") return null;
            const normalized = value.trim().toLowerCase().replace(/,/g, "");
            if (!normalized) return null;
            const match = normalized.match(/(\d+(\.\d+)?)/);
            if (!match) return null;
            const numeric = Number(match[1]);
            if (!Number.isFinite(numeric) || numeric <= 0) return null;
            if (normalized.includes("gb")) return Math.round(numeric * 1024 * 1024 * 1024);
            if (normalized.includes("mb")) return Math.round(numeric * 1024 * 1024);
            if (normalized.includes("kb")) return Math.round(numeric * 1024);
            return Math.round(numeric);
        },
        formatBytesToMegabytes(bytes, decimals = 1) {
            const size = Number(bytes);
            if (!Number.isFinite(size) || size <= 0) return "";
            return `${(size / (1024 * 1024)).toFixed(decimals)} MB`;
        },
        canDownloadSurahAudio() {
            return !!this.getQuranRecitationId(this.selectedReciter);
        },
        markSurahAudioDownloaded(duration = 6000) {
            this.isSurahAudioDownloaded = true;
            clearTimeout(this.surahAudioDownloadedTimer);
            this.surahAudioDownloadedTimer = setTimeout(() => {
                this.isSurahAudioDownloaded = false;
                this.surahAudioDownloadedTimer = null;
            }, duration);
        },
        extractChapterRecitationAudioFile(payload) {
            if (!payload || typeof payload !== "object") return null;
            return (
                payload.audio_file ||
                payload.audioFile ||
                payload.chapter_recitation ||
                payload.chapterRecitation ||
                null
            );
        },
        extractChapterRecitationAudioUrl(payload, baseUrl) {
            if (!payload) return "";
            const audioFile = this.extractChapterRecitationAudioFile(payload);
            const raw =
                audioFile?.audio_url ||
                audioFile?.audioUrl ||
                audioFile?.url ||
                audioFile?.file_url ||
                "";
            if (!raw || typeof raw !== "string") return "";
            if (raw.startsWith("//")) return `https:${raw}`;
            if (raw.startsWith("/")) return `${baseUrl}${raw}`;
            return raw;
        },
        extractChapterRecitationFileSizeBytes(payload) {
            if (!payload) return null;
            const audioFile = this.extractChapterRecitationAudioFile(payload);
            const candidates = [
                audioFile?.file_size,
                audioFile?.fileSize,
                audioFile?.filesize,
                audioFile?.size,
                payload?.file_size,
                payload?.fileSize,
                payload?.filesize,
                payload?.size,
            ];
            for (const candidate of candidates) {
                const bytes = this.normalizeFileSizeBytes(candidate);
                if (bytes) return bytes;
            }
            return null;
        },
        async fetchAudioContentLength(audioUrl) {
            if (!audioUrl) return null;
            try {
                const response = await fetch(audioUrl, {
                    method: "HEAD",
                    mode: "cors",
                });
                if (!response.ok) return null;
                return this.normalizeFileSizeBytes(
                    response.headers.get("content-length")
                );
            } catch (_) {
                return null;
            }
        },
        async resolveChapterRecitationMeta(
            surahNumber = this.selectedSurah,
            reciterId = this.selectedReciter,
            options = {}
        ) {
            const { force = false } = options;
            const normalizedSurah = Number(surahNumber);
            const recitationId = this.getQuranRecitationId(reciterId);
            if (!normalizedSurah || !recitationId) {
                return { audioUrl: "", sizeBytes: null };
            }

            const key = this.getSurahAudioMetaKey(normalizedSurah, reciterId);
            const cachedMeta = key ? this.surahAudioMetaByKey[key] : null;
            if (!force && cachedMeta?.audioUrl) {
                return cachedMeta;
            }

            if (key) this.setSurahAudioMetaLoading(key, true);
            try {
                const endpoint = `https://api.quran.com/api/v4/chapter_recitations/${recitationId}/${normalizedSurah}`;
                const response = await fetch(endpoint, { mode: "cors" });
                if (!response.ok) {
                    throw new Error(
                        `Surah audio lookup failed: ${response.status}`
                    );
                }
                const payload = await response.json();
                const audioUrl = this.extractChapterRecitationAudioUrl(
                    payload,
                    "https://api.quran.com"
                );
                let sizeBytes =
                    this.extractChapterRecitationFileSizeBytes(payload);

                if (!sizeBytes && audioUrl) {
                    sizeBytes = await this.fetchAudioContentLength(audioUrl);
                }

                const meta = {
                    audioUrl: audioUrl || "",
                    sizeBytes: sizeBytes || null,
                    updatedAt: Date.now(),
                };
                if (key && meta.audioUrl) {
                    this.setSurahAudioMetaCache(key, meta);
                }
                return meta;
            } finally {
                if (key) this.setSurahAudioMetaLoading(key, false);
            }
        },
        prefetchCurrentSurahAudioMeta() {
            const surahNumber = Number(
                this.selectedSurah || this.surahDetails?.surahNumber
            );
            if (!surahNumber || !this.canDownloadSurahAudio()) return;
            this.resolveChapterRecitationMeta(
                surahNumber,
                this.selectedReciter
            ).catch((error) => {
                console.warn("Unable to prefetch surah audio metadata:", error);
            });
        },
        async downloadSurahAudio() {
            const surahNumber = Number(this.surahDetails?.surahNumber || this.selectedSurah);
            if (!surahNumber) return;
            const firstAyahKey = this.buildAyahKey(surahNumber, 1);
            if (this.isSurahAudioDownloading) return;

            const recitationId = this.getQuranRecitationId(this.selectedReciter);
            if (!recitationId) {
                this.triggerAyahFeedback(
                    firstAyahKey,
                    "Full surah download isn't available for this reciter.",
                    "feedback-warning",
                    "warning"
                );
                this.announce("Full surah download isn't available for this reciter.");
                return;
            }

            this.isSurahAudioDownloading = true;
            this.isSurahAudioDownloaded = false;
            clearTimeout(this.surahAudioDownloadedTimer);
            this.surahAudioDownloadedTimer = null;
            this.announce("Downloading full surah audio.");

            let audioUrl = "";

            try {
                let meta = await this.resolveChapterRecitationMeta(
                    surahNumber,
                    this.selectedReciter
                );
                audioUrl = meta?.audioUrl || "";
                if (!audioUrl) {
                    meta = await this.resolveChapterRecitationMeta(
                        surahNumber,
                        this.selectedReciter,
                        { force: true }
                    );
                    audioUrl = meta?.audioUrl || "";
                }
            } catch (error) {
                console.warn("Unable to resolve full surah audio URL:", error);
            }

            if (!audioUrl) {
                this.triggerAyahFeedback(
                    firstAyahKey,
                    "Unable to fetch a full-surah MP3 for this reciter. You can still download individual ayahs.",
                    "feedback-warning",
                    "warning"
                );
                this.announce("Unable to fetch a full surah MP3. You can download individual ayahs.");
                this.isSurahAudioDownloading = false;
                return;
            }

            const filename = this.buildSurahAudioFilename();

            try {
                const response = await fetch(audioUrl, { mode: "cors" });
                if (!response.ok) {
                    throw new Error(`Surah audio download failed: ${response.status}`);
                }
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = filename;
                a.rel = "noopener";
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                a.remove();

                setTimeout(() => {
                    try {
                        window.URL.revokeObjectURL(blobUrl);
                    } catch (_) {}
                }, 2000);

                this.markSurahAudioDownloaded();
                this.triggerAyahFeedback(
                    firstAyahKey,
                    "Surah MP3 downloaded.",
                    "bg-dark text-white",
                    "check"
                );
                this.announce("Surah MP3 downloaded.");
            } catch (error) {
                console.warn("Unable to download full surah audio as a blob:", error);
                this.triggerAyahFeedback(
                    firstAyahKey,
                    "Unable to download directly. Open the surah audio and use your browser to save it.",
                    "feedback-warning",
                    "warning",
                    audioUrl,
                    "Open audio",
                    15000
                );
                this.announce("Unable to download directly. Open the surah audio to save it.");
            } finally {
                this.isSurahAudioDownloading = false;
            }
        },
        async downloadAyahAudio(ayah) {
            if (!ayah) return;
            const key = this.getAyahKeyForAyah(ayah);
            if (!key) return;
            if (this.isAudioDownloading[key]) return;

            const audioUrl = ayah.audio || "";
            if (!audioUrl) {
                this.triggerAyahFeedback(
                    key,
                    "Audio unavailable for this ayah.",
                    "feedback-warning",
                    "warning"
                );
                this.announce("Audio unavailable for this ayah.");
                return;
            }

            const setDownloading = (value) => {
                if (typeof this.$set === "function") {
                    this.$set(this.isAudioDownloading, key, !!value);
                } else {
                    this.isAudioDownloading[key] = !!value;
                }
            };

            setDownloading(true);
            this.announce("Downloading ayah audio.");

            const filename = this.buildAyahAudioFilename(ayah);

            try {
                const response = await fetch(audioUrl, { mode: "cors" });
                if (!response.ok) {
                    throw new Error(`Audio download failed: ${response.status}`);
                }
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = filename;
                a.rel = "noopener";
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                a.remove();

                setTimeout(() => {
                    try {
                        window.URL.revokeObjectURL(blobUrl);
                    } catch (_) {}
                }, 2000);

                this.markAyahAudioDownloaded(key);
                this.triggerAyahFeedback(
                    key,
                    "MP3 downloaded.",
                    "bg-dark text-white",
                    "check"
                );
                this.announce("MP3 downloaded.");
            } catch (error) {
                console.warn("Unable to download audio as a blob:", error);
                this.triggerAyahFeedback(
                    key,
                    "Unable to download directly. Open the audio and use your browser to save it.",
                    "feedback-warning",
                    "warning",
                    audioUrl,
                    "Open audio",
                    15000
                );
                this.announce("Unable to download directly. Open the audio link to save it.");
            } finally {
                setDownloading(false);
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
                this.pinnedAyahs = {};
                this.pinnedAyahStorageKey = "";
                this.pinnedSectionUiStateStorageKey = "";
                this.isPinnedSectionCollapsed = false;
                this.isPinnedSectionHidden = false;
                return;
            }
            await this.loadSavedAyahs();
            await this.loadPinnedAyahs();
            await this.loadPinnedSectionUiPreference();
            await this.initializeReflectionCacheKey();
            await this.syncSavedAyahsFromApi();
            if (this.bookmarkAuthenticated) {
                await this.loadAyahReflections();
            }
        },
        async evaluateBookmarkAuth() {
            const userId = await fetchUserIdFromApi();
            this.bookmarkStorageUserId = userId || null;
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
        triggerAyahFeedback(key, text, cssClass, icon, link = "", linkText = "", timeout = 6000) {
            // Use reactive assignment
            this.feedbackMessages = {
                ...this.feedbackMessages,
                [key]: { text, class: cssClass, icon, link, linkText },
            };

            setTimeout(() => {
                const next = { ...this.feedbackMessages };
                delete next[key];
                this.feedbackMessages = next;
            }, timeout);
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
            if (typeof document === "undefined") {
                return String(value).replace(/<[^>]+>/g, " ").trim();
            }
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
                await this.initializeDeepFocusModePreference();
                await this.initializeReadingFullscreenPreference();
                await this.initializePinnedAyahStorageKey();
                await this.loadPinnedAyahs();
                await this.initializePinnedSectionUiStorageKey();
                await this.loadPinnedSectionUiPreference();
                await this.initializeReflectionCacheKey();
                return true;
            }
            this.bookmarkAuthenticated = false;
            this.bookmarkStorageUserId = null;
            await this.initializeDeepFocusModePreference();
            await this.initializeReadingFullscreenPreference();
            this.pinnedAyahs = {};
            this.pinnedAyahStorageKey = "";
            this.pinnedSectionUiStateStorageKey = "";
            this.isPinnedSectionCollapsed = false;
            this.isPinnedSectionHidden = false;
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
            if (!this.canMinimizeNextStep) return;
            this.nextStepMinimized = !this.nextStepMinimized;
            try {
                localStorage.setItem(
                    "suratNextStepMinimized",
                    this.nextStepMinimized ? "1" : "0"
                );
            } catch (_) { }
        },
        closeMobileSurahInfoCard() {
            this.showMobileSurahInfoCard = false;
            try {
                localStorage.setItem(this.mobileSurahInfoCardStorageKey, "1");
            } catch (_) { }
        },
        showMobileSurahInfoCardAgain() {
            this.showMobileSurahInfoCard = true;
            try {
                localStorage.removeItem(this.mobileSurahInfoCardStorageKey);
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
                if (!this.itemHeightCalibrated) {
                    this.itemHeightCalibrated = true;
                }
            });
        },
        computeListTop() {
            try {
                const el = this.$refs.listContainer;
                if (!el) {
                    this.listTop = 0;
                    this.updateToolbarPinState();
                    return;
                }
                const rect = el.getBoundingClientRect();
                this.listTop = rect.top + window.scrollY;
            } catch (_) {
                this.listTop = 0;
            }
            this.updateToolbarPinState();
        },
        getToolbarPinTriggerOffset() {
            if (typeof window === "undefined" || typeof document === "undefined") {
                return 82;
            }
            let navOffset = 72;
            try {
                const rootStyle = window.getComputedStyle(document.documentElement);
                const navOffsetCss = parseFloat(
                    rootStyle.getPropertyValue("--nav-offset")
                );
                const navbarHeightCss = parseFloat(
                    rootStyle.getPropertyValue("--navbar-h")
                );
                if (Number.isFinite(navOffsetCss) && navOffsetCss > 0) {
                    navOffset = navOffsetCss;
                } else if (Number.isFinite(navbarHeightCss) && navbarHeightCss > 0) {
                    navOffset = navbarHeightCss;
                }
            } catch (_) {
                // fall back to default offset
            }
            return navOffset + 8;
        },
        updateToolbarPinState() {
            if (typeof window === "undefined") return;
            const firstCard = document.getElementById("ayah-card-0");
            if (firstCard && firstCard.getBoundingClientRect) {
                const rect = firstCard.getBoundingClientRect();
                this.firstAyahTop = rect.top + window.scrollY;
            } else if (!this.firstAyahTop) {
                this.firstAyahTop = Number(this.listTop) || 0;
            }
            const triggerTop = Number(this.firstAyahTop) || 0;
            if (!triggerTop) {
                if (this.isToolbarPinned) this.isToolbarPinned = false;
                return;
            }
            const triggerOffset = this.getToolbarPinTriggerOffset();
            const shouldPin = window.scrollY >= Math.max(0, triggerTop - triggerOffset);
            if (this.isToolbarPinned !== shouldPin) {
                this.isToolbarPinned = shouldPin;
            }
        },
        onScrollVirtual() {
            this.updateToolbarPinState();
            const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
            const listTop = Number(this.listTop) || 0;
            const threshold = listTop + Math.max(320, window.innerHeight * 0.4);
            let show = scrollY > threshold;
            const firstCard = document.getElementById("ayah-card-0");
            if (firstCard) {
                const rect = firstCard.getBoundingClientRect();
                if (rect.bottom < window.innerHeight - 24) show = true;
            }
            if (this.showScrollTop !== show) this.showScrollTop = show;
            this.isManualScrolling = true;
            clearTimeout(this.manualScrollTimer);
            this.manualScrollTimer = setTimeout(() => {
                this.isManualScrolling = false;
            }, 1000);
            if (typeof window !== "undefined") {
                if (this._virtualWindowRaf) {
                    window.cancelAnimationFrame(this._virtualWindowRaf);
                }
                this._virtualWindowRaf = window.requestAnimationFrame(() => {
                    this._virtualWindowRaf = null;
                    this.updateVirtualWindow();
                    if (this.isNavigating) {
                        this.checkNavigationSettled();
                    }
                });
            } else {
                this.updateVirtualWindow();
            }
        },
        updateVirtualWindow() {
            const n = this.filteredAyahs ? this.filteredAyahs.length : 0;
            if (n === 0) {
                this.visibleStart = 0;
                this.visibleEnd = 0;
                return;
            }
            const now = Date.now();
            if (
                this.isNavigating &&
                this.windowLockUntil &&
                now < this.windowLockUntil &&
                typeof this.windowLockIndex === "number"
            ) {
                const start = Math.max(0, this.windowLockIndex - this.buffer);
                const end = Math.min(n, start + this.windowSize + this.buffer * 2);
                if (start !== this.visibleStart || end !== this.visibleEnd) {
                    this.visibleStart = start;
                    this.visibleEnd = end;
                    if (!this.itemHeightCalibrated) {
                        this.scheduleHeightCalibration(true);
                    }
                }
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
                    if (!this.itemHeightCalibrated) {
                        this.scheduleHeightCalibration(true);
                    }
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
                if (
                    !this.isNavigating &&
                    !this.isAutoSyncLocked() &&
                    this.isManualScrolling &&
                    !isPlayingAny &&
                    this.filteredAyahs?.[approxIndex]
                ) {
                    // Critical: Use a silent update or check isManualScrolling 
                    // to prevent syncPlaybackScroll from snap-jumping during user scroll.
                    this.currentlyPlayingIndex = approxIndex;
                    this.isHighlighted = true;
                    this.selectedJuz = this.filteredAyahs[approxIndex].juz;
                }
                if (!this.itemHeightCalibrated) {
                    this.scheduleHeightCalibration(true);
                }
            }
        },
        syncVirtualWindowAfterSelection() {
            const total = this.filteredAyahs ? this.filteredAyahs.length : 0;
            this.firstAyahTop = 0;
            this.isToolbarPinned = false;
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
        isAutoSyncLocked() {
            return Date.now() < (this.autoSyncLockUntil || 0);
        },
        lockAutoSync(durationMs) {
            const nextUntil = Date.now() + Math.max(0, durationMs || 0);
            if (!this.autoSyncLockUntil || nextUntil > this.autoSyncLockUntil) {
                this.autoSyncLockUntil = nextUntil;
            }
        },
        getScrollBehavior(preferred = "smooth") {
            if (preferred === "auto") return "auto";
            try {
                if (
                    typeof window !== "undefined" &&
                    window.matchMedia &&
                    window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ) {
                    return "auto";
                }
            } catch (_) { }
            return preferred;
        },
        beginManualNavigation(index, options = {}) {
            const { duration = 2200, tolerance = 12 } = options || {};
            this.isNavigating = true;
            this.navigationTargetIndex = index;
            this.navigationTargetTolerance = tolerance;
            this.windowLockIndex = index;
            this.windowLockUntil = Date.now() + duration;
            this.lockAutoSync(duration + 400);
            if (this._navigationSettleTimer) {
                clearTimeout(this._navigationSettleTimer);
                this._navigationSettleTimer = null;
            }
            const token = (this._navigationSettleToken || 0) + 1;
            this._navigationSettleToken = token;
            this._navigationSettleTimer = setTimeout(() => {
                if (token !== this._navigationSettleToken) return;
                this.finishManualNavigation();
            }, duration);
        },
        finishManualNavigation() {
            const index = this.navigationTargetIndex;
            this.navigationTargetIndex = null;
            this.windowLockIndex = null;
            this.windowLockUntil = 0;
            this.isNavigating = false;
            const now = Date.now();
            const minUnlockAt = now + 250;
            if (!this.autoSyncLockUntil || this.autoSyncLockUntil < minUnlockAt) {
                this.autoSyncLockUntil = minUnlockAt;
            }
            if (typeof index === "number" && index >= 0) {
                this.selectCard(index);
            }
        },
        checkNavigationSettled() {
            if (this.navigationTargetIndex == null) return;
            const index = this.navigationTargetIndex;
            const cardEl = document.getElementById(`ayah-card-${index}`);
            if (!cardEl || !cardEl.getBoundingClientRect) return;
            const rect = cardEl.getBoundingClientRect();
            const offset = this.currentHeaderOffset;
            const viewportHeight = window.innerHeight;
            const audioHeight = this.getAudioPlayerHeight();
            const availableHeight = Math.max(
                viewportHeight - offset - audioHeight,
                0
            );
            const centerFactor =
                typeof this.preferredPlaybackScrollFactor === "number"
                    ? this.preferredPlaybackScrollFactor
                    : 0.5;
            const desiredCenter = offset + availableHeight * centerFactor;
            const delta = rect.top + rect.height / 2 - desiredCenter;
            if (Math.abs(delta) <= (this.navigationTargetTolerance || 12)) {
                this.finishManualNavigation();
            }
        },
        scrollToAyahIndex(index, options = {}) {
            const {
                behavior = "smooth",
                settle = false,
                settleDelay = null,
                force = false,
                lock = false,
            } = options || {};
            const resolvedBehavior = this.getScrollBehavior(behavior);
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
                const runScroll = () => {
                    this.computeListTop();
                    this.calibrateItemHeight();

                    const offset = this.currentHeaderOffset;
                    const viewportHeight = window.innerHeight;
                    const audioHeight = this.getAudioPlayerHeight();
                    const availableHeight = Math.max(
                        viewportHeight - offset - audioHeight,
                        0
                    );
                    if (
                        !force &&
                        this.lastAutoScrollIndex === index &&
                        Date.now() - this.lastProgrammaticScrollAt < 650
                    ) {
                        this.lastProgrammaticScrollAt = Date.now();
                        this.lastAutoScrollIndex = index;
                        this.selectCard(index);
                        this.isNavigating = false;
                        return;
                    }
                    const cardEl = document.getElementById(
                        `ayah-card-${index}`
                    );
                    const hadCardEl = !!cardEl;
                    let targetTop;

                    if (cardEl && cardEl.getBoundingClientRect) {
                        const rect = cardEl.getBoundingClientRect();
                        const cardCenter =
                            window.scrollY + rect.top + rect.height / 2;
                        const centerFactor =
                            typeof this.preferredPlaybackScrollFactor === "number"
                                ? this.preferredPlaybackScrollFactor
                                : 0.5;
                        const centerOffset =
                            offset + availableHeight * centerFactor;
                        targetTop = cardCenter - centerOffset;
                    } else {
                        targetTop =
                            this.listTop + index * this.itemHeight - offset;
                    }

                    const maxScroll = Math.max(
                        document.documentElement.scrollHeight -
                            window.innerHeight,
                        0
                    );
                    const safeTarget = Math.min(
                        Math.max(0, targetTop),
                        maxScroll
                    );

                    const scrollableHeight = maxScroll;
                    const minimalScrollableHeight = Math.max(
                        32,
                        availableHeight * 0.35
                    );
                    if (scrollableHeight <= minimalScrollableHeight) {
                        this.lastProgrammaticScrollAt = Date.now();
                        this.lastAutoScrollIndex = index;
                        this.selectCard(index);
                        this.isNavigating = false;
                        return;
                    }

                    let finalTarget = safeTarget;
                    if (targetTop > maxScroll && index < total - 1) {
                        const topAligned =
                            this.listTop + index * this.itemHeight - offset;
                        finalTarget = Math.min(
                            Math.max(0, topAligned),
                            maxScroll
                        );
                    }

                    this.lastProgrammaticScrollAt = Date.now();
                    this.lastAutoScrollIndex = index;
                    const distance = Math.abs(finalTarget - window.scrollY);
                    const correctionDelay =
                        settleDelay != null
                            ? settleDelay
                            : Math.min(900, Math.max(320, distance * 0.35));
                    if (lock) {
                        const lockDuration = Math.max(
                            1400,
                            correctionDelay + 900
                        );
                        this.beginManualNavigation(index, {
                            duration: lockDuration,
                            tolerance: 12,
                        });
                    }
                    const shouldPrime = lock && !hadCardEl;
                    window.scrollTo({
                        top: finalTarget,
                        behavior: shouldPrime ? "auto" : resolvedBehavior,
                    });
                    this.selectCard(index);
                    if (lock) {
                        this.$nextTick(() => {
                            this.checkNavigationSettled();
                        });
                    }
                    if (shouldPrime) {
                        this.$nextTick(() => {
                            if (
                                typeof window !== "undefined" &&
                                window.requestAnimationFrame
                            ) {
                                window.requestAnimationFrame(() => {
                                    const nextEl = document.getElementById(
                                        `ayah-card-${index}`
                                    );
                                    if (!nextEl || !nextEl.getBoundingClientRect) return;
                                    const rect = nextEl.getBoundingClientRect();
                                    const nextOffset = this.currentHeaderOffset;
                                    const nextViewport = window.innerHeight;
                                    const nextAudio = this.getAudioPlayerHeight();
                                    const nextAvailable = Math.max(
                                        nextViewport - nextOffset - nextAudio,
                                        0
                                    );
                                    const centerFactor =
                                        typeof this.preferredPlaybackScrollFactor === "number"
                                            ? this.preferredPlaybackScrollFactor
                                            : 0.5;
                                    const nextCenterOffset =
                                        nextOffset + nextAvailable * centerFactor;
                                    const nextTarget =
                                        window.scrollY + rect.top + rect.height / 2 - nextCenterOffset;
                                    const maxScroll = Math.max(
                                        document.documentElement.scrollHeight -
                                            window.innerHeight,
                                        0
                                    );
                                    const safeNextTarget = Math.min(
                                        Math.max(0, nextTarget),
                                        maxScroll
                                    );
                                    window.scrollTo({
                                        top: safeNextTarget,
                                        behavior: resolvedBehavior,
                                    });
                                });
                            }
                        });
                    }
                    if (settle) {
                        this.scheduleScrollCorrection(index, {
                            delay: correctionDelay,
                            behavior: resolvedBehavior,
                            passes: 2,
                        });
                    }

                    if (!lock) {
                        // Delay resetting the navigation flag to let scrolls settle fully.
                        // 1000ms ensures smooth scroll completes before auto-locking resumes.
                        setTimeout(() => {
                            this.isNavigating = false;
                        }, settle ? Math.max(1000, correctionDelay + 200) : 1000);
                    }
                };

                if (
                    typeof window !== "undefined" &&
                    window.requestAnimationFrame
                ) {
                    window.requestAnimationFrame(runScroll);
                } else {
                    runScroll();
                }
            });
        },
        scheduleScrollCorrection(index, options = {}) {
            const {
                delay = 420,
                tolerance = 8,
                behavior = "smooth",
                passes = 1,
            } = options || {};
            if (this._scrollCorrectionTimer) {
                clearTimeout(this._scrollCorrectionTimer);
                this._scrollCorrectionTimer = null;
            }
            const token = (this._scrollCorrectionToken || 0) + 1;
            this._scrollCorrectionToken = token;
            const runCorrection = (attempt) => {
                if (token !== this._scrollCorrectionToken) return;
                this.$nextTick(() => {
                    if (token !== this._scrollCorrectionToken) return;
                    const cardEl = document.getElementById(
                        `ayah-card-${index}`
                    );
                    if (!cardEl || !cardEl.getBoundingClientRect) return;
                    const rect = cardEl.getBoundingClientRect();
                    const offset = this.currentHeaderOffset;
                    const viewportHeight = window.innerHeight;
                    const audioHeight = this.getAudioPlayerHeight();
                    const availableHeight = Math.max(
                        viewportHeight - offset - audioHeight,
                        0
                    );
                    const centerFactor =
                        typeof this.preferredPlaybackScrollFactor === "number"
                            ? this.preferredPlaybackScrollFactor
                            : 0.5;
                    const desiredCenter =
                        offset + availableHeight * centerFactor;
                    const delta =
                        rect.top + rect.height / 2 - desiredCenter;
                    if (Math.abs(delta) <= tolerance) return;
                    const maxScroll = Math.max(
                        document.documentElement.scrollHeight -
                            window.innerHeight,
                        0
                    );
                    const target = Math.min(
                        Math.max(0, window.scrollY + delta),
                        maxScroll
                    );
                    window.scrollTo({ top: target, behavior });
                    if (attempt < passes) {
                        this._scrollCorrectionTimer = setTimeout(() => {
                            runCorrection(attempt + 1);
                        }, 180);
                    }
                });
            };
            this._scrollCorrectionTimer = setTimeout(() => {
                runCorrection(1);
            }, delay);
        },
        getAudioPlayerHeight() {
            if (!this.showAudioPlayer) return 0;
            if (typeof document !== "undefined") {
                const container = document.querySelector(".audio-player-container");
                if (container) {
                    const rect = container.getBoundingClientRect();
                    if (rect && rect.height) {
                        return rect.height;
                    }
                }
            }
            // Match the fixed audio player height plus safe area allowance.
            return 220;
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
            const key = (e && e.key) || "";
            const normalizedKey = key.toLowerCase();
            const isFullscreenShortcut =
                normalizedKey === "f" &&
                e.ctrlKey &&
                e.shiftKey &&
                !e.metaKey &&
                !e.altKey;
            if (isFullscreenShortcut && this.isDesktopWide) {
                e.preventDefault();
                this.toggleReadingFullscreen();
                return;
            }
            if (key === "Escape" && this.isReadingFullscreen) {
                e.preventDefault();
                this.exitReadingFullscreen();
                return;
            }
            const tag = ((e.target && e.target.tagName) || "").toLowerCase();
            const isTypingContext =
                e.target?.isContentEditable ||
                ["input", "textarea", "select"].includes(tag);
            if (isTypingContext) {
                return;
            }
            if (
                key === "/" &&
                !e.metaKey &&
                !e.ctrlKey &&
                !e.altKey &&
                this.isAdvancedSearchVisible
            ) {
                e.preventDefault();
                const input = this.$refs.advancedSearchInput;
                if (input && typeof input.focus === "function") {
                    input.focus();
                    if (typeof input.select === "function") {
                        input.select();
                    }
                }
                if (!this.isAdvancedSearchPanelVisible) {
                    this.isAdvancedSearchPanelVisible = true;
                }
                return;
            }
            if (key === "Escape" && this.hasAdvancedSearchQuery) {
                this.clearAdvancedSearch();
                return;
            }
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
                this.isTablet = window.matchMedia(
                    "(min-width: 768px) and (max-width: 991px)"
                ).matches;
                this.isDesktopWide = window.matchMedia(
                    "(min-width: 1024px)"
                ).matches;
            } catch (e) {
                const width = window.innerWidth;
                this.isMobile = width <= 767;
                this.isTabletOrMobile = width <= 991;
                this.isTablet = width >= 768 && width <= 991;
                this.isDesktopWide = width >= 1024;
            }
            if (!this.isTabletOrMobile && this.isMobileToolbarExpanded) {
                this.isMobileToolbarExpanded = false;
            }
            if (!this.isDesktopWide && this.isReadingFullscreen) {
                this.exitReadingFullscreen({
                    restoreFocus: false,
                    persistPreference: false,
                });
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
                if (
                    typeof this.currentAudioIndex !== "number" ||
                    this.currentAudioIndex < 0
                ) {
                    const playingIndex = Array.isArray(this.isAudioPlaying)
                        ? this.isAudioPlaying.findIndex(Boolean)
                        : -1;
                    if (playingIndex >= 0) {
                        this.currentAudioIndex = playingIndex;
                    }
                }
                const idx =
                    typeof this.currentAudioIndex === "number" &&
                    this.currentAudioIndex >= 0
                        ? this.currentAudioIndex
                        : this.currentlyPlayingIndex;
                if (!this.isAudioPlaying[idx]) {
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
            if (
                typeof this.currentAudioIndex !== "number" ||
                this.currentAudioIndex < 0
            ) {
                const playingIndex = Array.isArray(this.isAudioPlaying)
                    ? this.isAudioPlaying.findIndex(Boolean)
                    : -1;
                if (playingIndex >= 0) {
                    this.currentAudioIndex = playingIndex;
                }
            }
            const idx =
                typeof this.currentAudioIndex === "number" &&
                this.currentAudioIndex >= 0
                    ? this.currentAudioIndex
                    : this.currentlyPlayingIndex;
            const ayah = this.filteredAyahs[idx];
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
            const idx =
                typeof this.currentAudioIndex === "number" &&
                this.currentAudioIndex >= 0
                    ? this.currentAudioIndex
                    : this.currentlyPlayingIndex;
            const card = document.getElementById(
                `ayah-card-${idx}`
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
            this.currentAudioIndex = index;
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
                this.currentAudioIndex = -1;
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
        getTranslationVisibilityKey(item) {
            if (!item || !item.ayah) return "";
            return this.buildAyahKey(
                this.surahDetails?.surahNumber,
                item.ayah.numberInSurah || item.ayah.number
            );
        },
        isTranslationVisibleFor(item) {
            const key = this.getTranslationVisibilityKey(item);
            if (!key) return true;
            const value = this.translationVisibility[key];
            if (value === undefined) return this.isTranslationVisible;
            return !!value;
        },
        setTranslationVisibleFor(item, value) {
            const key = this.getTranslationVisibilityKey(item);
            if (!key) return;
            if (typeof this.$set === "function") {
                this.$set(this.translationVisibility, key, !!value);
            } else {
                this.translationVisibility[key] = !!value;
            }
            this.itemHeightCalibrated = false;
            this.$nextTick(() => this.scheduleHeightCalibration(true));
        },
        onTranslationToggle(item, event) {
            const checked = !!event.target.checked;
            this.setTranslationVisibleFor(item, checked);
        },
        applyGlobalTextVisibility({
            translation = this.isTranslationVisible,
            transliteration = this.isTransliterationVisible,
        } = {}) {
            this.isTranslationVisible = !!translation;
            this.isTransliterationVisible = !!transliteration;
            this.translationVisibility = {};
            this.transliterationVisibility = {};
            this.itemHeightCalibrated = false;
            this.$nextTick(() => this.scheduleHeightCalibration(true));
        },
        getTransliterationVisibilityKey(item) {
            if (!item || !item.ayah) return "";
            return this.buildAyahKey(
                this.surahDetails?.surahNumber,
                item.ayah.numberInSurah || item.ayah.number
            );
        },
        isTransliterationVisibleFor(item) {
            const key = this.getTransliterationVisibilityKey(item);
            if (!key) return true;
            const value = this.transliterationVisibility[key];
            if (value === undefined) return this.isTransliterationVisible;
            return !!value;
        },
        setTransliterationVisibleFor(item, value) {
            const key = this.getTransliterationVisibilityKey(item);
            if (!key) return;
            if (typeof this.$set === "function") {
                this.$set(this.transliterationVisibility, key, !!value);
            } else {
                this.transliterationVisibility[key] = !!value;
            }
            this.itemHeightCalibrated = false;
            this.$nextTick(() => this.scheduleHeightCalibration(true));
        },
        onTransliterationToggle(item, event) {
            const checked = !!event.target.checked;
            this.setTransliterationVisibleFor(item, checked);
        },
        toggleMobileToolbarExpanded() {
            this.isMobileToolbarExpanded = !this.isMobileToolbarExpanded;
            this.announce(
                this.isMobileToolbarExpanded
                    ? "Expanded mobile toolbar controls."
                    : "Collapsed mobile toolbar controls."
            );
        },
        toggleToolbarTranslation() {
            const checked = !this.isTranslationAllEnabled;
            this.applyGlobalTextVisibility({
                translation: checked,
                transliteration: this.isTransliterationAllEnabled,
            });
            this.announce(
                checked
                    ? "Translation enabled for all ayahs."
                    : "Translation disabled for all ayahs."
            );
        },
        toggleToolbarTransliteration() {
            const checked = !this.isTransliterationAllEnabled;
            this.applyGlobalTextVisibility({
                translation: this.isTranslationAllEnabled,
                transliteration: checked,
            });
            this.announce(
                checked
                    ? "Transliteration enabled for all ayahs."
                    : "Transliteration disabled for all ayahs."
            );
        },
        setDeepFocusMode(enabled, options = {}) {
            const { announce = true } = options;
            const nextState = !!enabled;
            if (this.isDeepFocusMode === nextState) return;

            this.isDeepFocusMode = nextState;
            this.writeScopedBooleanPreference(
                this.deepFocusModePreferenceBaseKey,
                this.isDeepFocusMode
            );
            this.itemHeightCalibrated = false;
            this.$nextTick(() => this.scheduleHeightCalibration(true));

            if (announce) {
                this.announce(
                    nextState
                        ? "Deep focus mode enabled."
                        : "Deep focus mode disabled."
                );
            }
        },
        toggleDeepFocusMode() {
            this.setDeepFocusMode(!this.isDeepFocusMode);
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
        async fetchSurahTransliteration(surahNumber = this.selectedSurah) {
            const requestedSurah = String(surahNumber || "");
            if (!requestedSurah) return;

            const transliterationIdentifier =
                this.transliterationEditionIdentifier || "en.transliteration";
            const transliterationCacheKey = `cache:surah-transliteration:${requestedSurah}:${transliterationIdentifier}`;

            try {
                const { data } = await this.cachedFetchJSON(
                    `https://api.alquran.cloud/v1/surah/${requestedSurah}/${transliterationIdentifier}`,
                    transliterationCacheKey,
                    14 * 24 * 60 * 60 * 1000
                );
                if (this._isDestroyed) return;

                const activeSurah = String(
                    this.surahDetails?.surahNumber || this.selectedSurah || ""
                );
                if (activeSurah !== requestedSurah) return;

                const transliterationAyahs = Array.isArray(data?.data?.ayahs)
                    ? data.data.ayahs
                    : [];
                if (
                    !transliterationAyahs.length ||
                    !Array.isArray(this.surahDetails?.ayahs)
                )
                    return;

                this.surahDetails.ayahs = this.surahDetails.ayahs.map(
                    (ayah, index) => {
                        const fetchedText =
                            transliterationAyahs?.[index]?.text;
                        const normalizedFetchedText =
                            typeof fetchedText === "string"
                                ? fetchedText
                                : "";
                        if (!normalizedFetchedText) return ayah;
                        return {
                            ...ayah,
                            transliteration: normalizedFetchedText,
                            lowerTransliteration:
                                normalizedFetchedText.toLowerCase(),
                        };
                    }
                );
                this.itemHeightCalibrated = false;
                this.$nextTick(() => this.scheduleHeightCalibration(true));
            } catch (error) {
                const status = String(error?.message || "");
                if (status === "404" || status === "400") return;
                console.warn("Unable to load transliteration:", error);
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
            this.prefetchCurrentSurahAudioMeta();
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
                        const transliteration = editions.find(
                            (item) =>
                                item?.edition?.identifier ===
                                this.transliterationEditionIdentifier ||
                                item?.edition?.type === "transliteration"
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
                                    const transliterationTextRaw =
                                        transliteration?.ayahs?.[index]?.text ||
                                        "";
                                    const transliterationText =
                                        typeof transliterationTextRaw ===
                                        "string"
                                            ? transliterationTextRaw
                                            : "";
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
                                        transliteration: transliterationText,
                                        lowerTransliteration:
                                            transliterationText.toLowerCase(),
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
                        this.syncPinnedAyahsForCurrentSurah();
                        this.isLoading = false;
                        this.fetchSurahTransliteration(this.selectedSurah);
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
                    const transliteration = editions.find(
                        (item) =>
                            item?.edition?.identifier ===
                            this.transliterationEditionIdentifier ||
                            item?.edition?.type === "transliteration"
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
                            const transliterationTextRaw =
                                transliteration?.ayahs?.[index]?.text || "";
                            const transliterationText =
                                typeof transliterationTextRaw === "string"
                                    ? transliterationTextRaw
                                    : "";
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
                                transliteration: transliterationText,
                                lowerTransliteration:
                                    transliterationText.toLowerCase(),
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
                    this.syncPinnedAyahsForCurrentSurah();
                    console.log("Surah details fetched:", this.surahDetails);
                    this.isLoading = false;
                    this.fetchSurahTransliteration(this.selectedSurah);
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
                    this.currentAudioIndex = -1;
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
            if (this.playbackMode === "repeat") {
                this.playAudio(index);
                return;
            }
            if (this.playbackMode === "continuous") {
                const nextIndex = index + 1;
                if (nextIndex < this.filteredAyahs.length) {
                    setTimeout(() => this.playAudio(nextIndex), 50);
                    return;
                }
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
            this.setPlaybackMode("continuous");
            this.continuousPlayback = true;
            this.savePreference("continuousPlayback", true);
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
            this.lastManualNavigationAt = Date.now();
            this.selectedJuz = juzNumber;
            const start = getJuzStart(juzNumber);
            if (start) {
                // Ensure surah is loaded first (selectSurah returns a promise)
                await this.selectSurah(start.surah, { skipScroll: true });
                // No search clearing needed here as we are jumping to a specific Juz start
                this.selectCard(start.ayah - 1);
                this.scrollToAyahIndex(start.ayah - 1, {
                    settle: true,
                    force: true,
                    behavior: "smooth",
                    lock: true,
                });
            }
        },
        async selectPage(pageNumber) {
            this.isNavigating = true;
            this.lastManualNavigationAt = Date.now();
            const start = getPageStart(pageNumber);
            if (start) {
                // Ensure surah is loaded first (selectSurah returns a promise)
                await this.selectSurah(start.surah, { skipScroll: true });
                this.selectCard(start.ayah - 1);
                this.scrollToAyahIndex(start.ayah - 1, {
                    settle: true,
                    force: true,
                    behavior: "smooth",
                    lock: true,
                });
            } else {
                 console.log("Page navigation mapping incomplete");
                 this.isNavigating = false;
             }
         },
        selectVerseFromSidebar(verseIndex) {
            this.isNavigating = true;
            this.lastManualNavigationAt = Date.now();
            // Clear main view search to ensure verse is visible
            this.searchQuery = "";
            this.debouncedQuery = "";
            this.selectCard(verseIndex - 1);
            
            const runScroll = () => {
                this.$nextTick(() => {
                    this.scrollToAyahIndex(verseIndex - 1, {
                        settle: true,
                        force: true,
                        behavior: "smooth",
                        lock: true,
                    });
                });
            };

            if (this.isMobile && !this.sidebarCollapsed) {
                this.toggleSidebar();
                this.$nextTick(runScroll);
            } else {
                runScroll();
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
            if (this.isAutoSyncLocked()) return;
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
            this.lastManualNavigationAt = Date.now();
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
                this.scrollToAyahIndex(targetIndex, {
                    settle: true,
                    force: true,
                    behavior: "smooth",
                    lock: true,
                });
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
            this.currentAudioIndex = -1;
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
        setPlaybackMode(mode) {
            const validModes = ["continuous", "repeat", "manual"];
            const normalized = validModes.includes(mode) ? mode : "continuous";
            this.playbackMode = normalized;
            try {
                localStorage.setItem("playbackMode", normalized);
            } catch (_) {}
            if (normalized !== "repeat") {
                this.preferredPlaybackMode = normalized;
                try {
                    localStorage.setItem(
                        "lastNonRepeatPlaybackMode",
                        normalized
                    );
                } catch (_) {}
            }
        },
        toggleRepeat() {
            if (this.isRepeatMode) {
                this.setPlaybackMode(
                    this.preferredPlaybackMode || "continuous"
                );
            } else {
                this.setPlaybackMode("repeat");
            }
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
