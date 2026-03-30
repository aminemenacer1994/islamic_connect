import axios from "axios";
import Title from "../vue/Intro/Title.vue";
import AdvancedSearch from "../vue/search/AdvancedSearch.vue";
import SurahDropdown from "../vue/search/SurahDropdown.vue";
import AyahDropdown from "../vue/search/AyahDropdown.vue";
import ErrorAlert from "../vue/search/ErrorAlert.vue";
import NavTabs from "../vue/tabs/NavTabs.vue";
import TranslationSection from "../vue/TranslationSection.vue";
import TafseerSection from "../vue/TafseerSection.vue";
import TransliterationSection from "../vue/TransliterationSection.vue";
import TranslationActions from "../vue/TranslationActions.vue";
import TafseerActions from "../vue/TafseerActions.vue";
import TransliterationActions from "../vue/TransliterationActions.vue";
import TranslationNote from "../vue/translation/features/notes/TranslationNote.vue";
import TafseerNote from "../vue/translation/features/notes/TafseerNote.vue";
import TransliterationNote from "../vue/translation/features/notes/TransliterationNote.vue";
import SurahInfoModal from "../vue/modals/SurahInfoModal.vue";
import Welcome from "../vue/Intro/Welcome.vue";
import HelpGuideModal from "../vue/translation/HelpGuideModal.vue";

const STORAGE_KEYS = {
    toggle: "toggleState",
    swipeTip: "quran.swipeTipDismissed",
    gestureNavigation: "quran.gestureNavigationEnabled",
};

const PREFETCH_OFFSETS = [-2, -1, 1, 2];

function toNumber(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
}

export default {
    name: "QuranComponent",
    components: {
        Title,
        AdvancedSearch,
        SurahDropdown,
        AyahDropdown,
        ErrorAlert,
        NavTabs,
        TranslationSection,
        TafseerSection,
        TransliterationSection,
        TranslationActions,
        TafseerActions,
        TransliterationActions,
        TranslationNote,
        TafseerNote,
        TransliterationNote,
        SurahInfoModal,
        Welcome,
        HelpGuideModal,
    },
    data() {
        return {
            // UI state
            isVisible: false,
            isOpen: false,
            isFullScreen: false,
            activeTab: "home",
            isMobile: false,
            isPlaying: false,
            expanded: false,
            showSwipeTip: false,
            showSwipeNotice: false,
            swipeNoticeText: "",
            swipeNoticeDir: "next",
            lastSwipeDir: "next",
            nextStepMinimized: false,
            screenReaderMessage: "",
            modalInformation: null,
            dropdownHidden: true,
            // Surah / Ayah data
            surat: [],
            filteredSurah: [],
            selectedSurahId: null,
            ayat: [],
            selectedIndexAyah: -1,
            selectedAyahId: null,
            selectedAyah: null,
            verseNumber: "",
            ayahJumpInput: "",
            ayahJumpError: "",
            information: null,
            tafseer: null,
            translation: "",
            currentAyah: null,

            // Additional UI helpers consumed by child components
            showMoreLink: false,
            showAlertText: false,
            showAlert: false,
            showErrorAlert: false,
            showAlertTextNote: false,
            showAlert1: false,
            showError: false,

            // Network + cache state
            isLoading: false,
            ayahCache: Object.create(null),
            infoCache: Object.create(null),
            tafseerCache: Object.create(null),
            ayatInflight: null,
            fetchAyatTimer: null,

            // Alert + feedback
            alertMessage: "",
            alertType: "success",

            // Session data
            userId: null,

            // Gesture tracking
            gestureNavigationEnabled: true,
            deviceSupportsGestures: true,
            allowGestures: true,
            activeSwipeSource: null,
            gestureHandled: false,
            touchStartX: 0,
            touchStartY: 0,
            touchEndX: 0,
            touchEndY: 0,
            touchStartTime: 0,
            pointerActive: false,
            pointerStartX: 0,
            pointerStartY: 0,
            pointerStartTime: 0,
            lastGestureTs: 0,
            wheelAccumX: 0,
            wheelLastTime: 0,
            swipeMinDistance: 20,
            swipeMaxDuration: 800,
            wheelThreshold: 35,
            wheelVertLeak: 30,
            wheelResetMs: 160,
            gestureCooldownMs: 300,
            // Next-step minimized state
        };
    },
    computed: {
        combinedText() {
            const translation = typeof this.information?.translation === "object"
                ? this.information.translation?.text
                : this.information?.translation;
            return translation ? `Translation: ${translation}` : "";
        },
        selectedSurahMeta() {
            const surahId = Number(this.selectedSurahId);
            if (!surahId || !Array.isArray(this.surat) || !this.surat.length) {
                return null;
            }
            const found =
                this.surat.find((item) => Number(item?.id) === surahId) || null;
            if (!found) return null;
            return {
                number: Number(found.id) || surahId,
                englishName:
                    found.name_en ||
                    found.englishName ||
                    found.surah_name_en ||
                    "Surah",
                translationName:
                    found.englishNameTranslation ||
                    found.name_translation ||
                    found.surah_name_translation ||
                    "",
                arabicName:
                    found.name_ar ||
                    found.name ||
                    found.surah_name_ar ||
                    "",
            };
        },
        selectedSurahAyahTotal() {
            return Array.isArray(this.ayat) ? this.ayat.length : 0;
        },
    },
    created() {
        this.bootstrapComponent();
    },
    mounted() {
        this.updateIsMobile();
        this.updateInputModalityGestureGate();

        this._onResize = () => {
            this.updateIsMobile();
            this.updateInputModalityGestureGate();
        };
        window.addEventListener("resize", this._onResize, { passive: true });

        this._onWheel = (event) => this.handleWindowWheel(event);
        window.addEventListener("wheel", this._onWheel, { passive: true });
    },
    beforeUnmount() {
        if (this._onResize) {
            window.removeEventListener("resize", this._onResize, { passive: true });
            this._onResize = null;
        }
        if (this._onWheel) {
            window.removeEventListener("wheel", this._onWheel, { passive: true });
            this._onWheel = null;
        }
        if (this.fetchAyatTimer) {
            clearTimeout(this.fetchAyatTimer);
            this.fetchAyatTimer = null;
        }
        if (this._swipeNoticeTimer) {
            clearTimeout(this._swipeNoticeTimer);
            this._swipeNoticeTimer = null;
        }
    },
    methods: {
        async bootstrapComponent() {
            this.restoreToggleState();
            this.restoreGestureNavigationState();
            this.userId = this.safeGetLocalStorage("userId");
            await this.fetchSurahList();
        },
        safeGetLocalStorage(key) {
            try {
                return window.localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },
        restoreToggleState() {
            const raw = this.safeGetLocalStorage(STORAGE_KEYS.toggle);
            if (raw !== null) {
                try {
                    this.isVisible = JSON.parse(raw);
                } catch (error) {
                    this.isVisible = raw === "true";
                }
            }
        },
        restoreGestureNavigationState() {
            const raw = this.safeGetLocalStorage(STORAGE_KEYS.gestureNavigation);
            if (raw === null) return;
            if (raw === "true" || raw === "1") {
                this.gestureNavigationEnabled = true;
                return;
            }
            if (raw === "false" || raw === "0") {
                this.gestureNavigationEnabled = false;
                return;
            }
            try {
                this.gestureNavigationEnabled = !!JSON.parse(raw);
            } catch (error) {
                this.gestureNavigationEnabled = raw !== "false";
            }
        },
        saveGestureNavigationState() {
            try {
                window.localStorage.setItem(
                    STORAGE_KEYS.gestureNavigation,
                    JSON.stringify(this.gestureNavigationEnabled)
                );
            } catch (error) {
                // ignore storage issues gracefully
            }
        },
        setupSwipeTip() {
            const dismissed = this.safeGetLocalStorage(STORAGE_KEYS.swipeTip);
            this.showSwipeTip = dismissed !== "1" && this.allowGestures;
        },
        async fetchSurahList() {
            try {
                const { data } = await axios.get("/get_surat");
                this.surat = Array.isArray(data) ? data : [];
                this.filteredSurah = this.surat;
            } catch (error) {
                console.error("Error fetching surahs:", error);
            }
        },
        saveToggleState() {
            try {
                window.localStorage.setItem(STORAGE_KEYS.toggle, JSON.stringify(this.isVisible));
            } catch (error) {
                // ignore storage issues gracefully
            }
        },
        toggleNextStepMinimized() {
            this.nextStepMinimized = !this.nextStepMinimized;
        },
        updateIsMobile() {
            this.isMobile = (window.innerWidth || 0) <= 767;
        },
        handleGestureNavigationToggle(event) {
            this.gestureNavigationEnabled = !!event?.target?.checked;
            this.saveGestureNavigationState();
            this.updateInputModalityGestureGate();
        },
        updateInputModalityGestureGate() {
            let hasTouch = false;
            try {
                hasTouch = "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0;
            } catch (error) {
                hasTouch = false;
            }
            this.deviceSupportsGestures = hasTouch || this.isMobile;
            this.allowGestures = this.gestureNavigationEnabled;
            if (!this.allowGestures) {
                this.activeSwipeSource = null;
                this.pointerActive = false;
                this.gestureHandled = false;
                this.wheelAccumX = 0;
                this.showSwipeNotice = false;
            }
            this.setupSwipeTip();
        },
        updateSelectedSurah(id) {
            const numeric = toNumber(id);
            if (!numeric || numeric === this.selectedSurahId) {
                return;
            }
            this.selectedSurahId = numeric;
            this.selectedIndexAyah = -1;
            this.selectedAyahId = null;
            this.selectedAyah = null;
            this.currentAyah = null;
            this.dropdownHidden = false;
            this.information = null;
            this.tafseer = null;
            this.scheduleFetchAyat(numeric);
        },
        scheduleFetchAyat(id = this.selectedSurahId) {
            if (!id) return;
            if (this.fetchAyatTimer) {
                clearTimeout(this.fetchAyatTimer);
            }
            this.fetchAyatTimer = setTimeout(() => this.fetchAyat(id), 150);
        },
        async fetchAyat(id = this.selectedSurahId) {
            if (!id) return;
            if (this.ayahCache[id]) {
                this.ayat = this.ayahCache[id];
                this.dropdownHidden = !this.ayat.length;
                if (this.ayat.length) {
                    this.selectAyah(Math.max(0, this.selectedIndexAyah));
                }
                return;
            }
            if (this.ayatInflight) return;
            try {
                this.isLoading = true;
                this.ayatInflight = axios.get("/get_ayat", { params: { surah_id: id } });
                const { data } = await this.ayatInflight;
                const ayat = Array.isArray(data) ? data : [];
                this.ayahCache[id] = ayat;
                this.ayat = ayat;
                this.dropdownHidden = !ayat.length;
                if (ayat.length) {
                    this.selectAyah(0);
                } else {
                    this.information = null;
                    this.tafseer = null;
                }
            } catch (error) {
                console.error("Error fetching ayat:", error);
            } finally {
                this.isLoading = false;
                this.ayatInflight = null;
            }
        },
        selectAyah(index) {
            if (!Array.isArray(this.ayat) || !this.ayat.length) return;
            const clamped = Math.max(0, Math.min(index, this.ayat.length - 1));
            if (this.selectedIndexAyah === clamped && this.information) {
                this.scrollToSelectedAyah();
                return;
            }
            this.selectedIndexAyah = clamped;
            const ayah = this.ayat[clamped];
            this.selectedAyah = ayah;
            this.currentAyah = ayah;
            this.selectedAyahId = ayah?.id ?? null;
            if (!ayah) return;
            this.updateCardSection(ayah);
            this.screenReaderMessage = `Selected verse ${ayah.ayah_id}`;
            this.scrollToSelectedAyah();
            this.ensureAyahPayload(ayah, clamped);
        },
        async ensureAyahPayload(ayah, index) {
            if (!ayah?.id) return;
            const cachedInfo = this.infoCache[ayah.id];
            const cachedTafseer = this.tafseerCache[ayah.id];
            if (cachedInfo && cachedTafseer) {
                this.applyAyahPayload(cachedInfo, cachedTafseer);
                this.prefetchAdjacentAyahData(index);
                return;
            }
            try {
                this.isLoading = true;
                const [info, tafseer] = await Promise.all([
                    this.fetchInformation(ayah.id),
                    this.fetchTafseer(ayah.id),
                ]);
                this.infoCache[ayah.id] = info;
                this.tafseerCache[ayah.id] = tafseer;
                this.applyAyahPayload(info, tafseer);
                this.prefetchAdjacentAyahData(index);
            } catch (error) {
                console.error("Error fetching ayah payload:", error);
            } finally {
                this.isLoading = false;
            }
        },
        applyAyahPayload(info, tafseer) {
            if (info) {
                this.information = info;
                this.modalInformation = info;
                this.translation = typeof info.translation === "object"
                    ? info.translation?.text
                    : info.translation;
            }
            if (tafseer) {
                this.tafseer = tafseer;
            }
        },
        prefetchAdjacentAyahData(index) {
            PREFETCH_OFFSETS.forEach((offset) => {
                const targetIndex = index + offset;
                if (targetIndex < 0 || targetIndex >= this.ayat.length) return;
                const target = this.ayat[targetIndex];
                if (!target?.id) return;
                if (!this.infoCache[target.id]) {
                    this.fetchInformation(target.id)
                        .then((info) => {
                            this.infoCache[target.id] = info;
                        })
                        .catch(() => { });
                }
                if (!this.tafseerCache[target.id]) {
                    this.fetchTafseer(target.id)
                        .then((tafseer) => {
                            this.tafseerCache[target.id] = tafseer;
                        })
                        .catch(() => { });
                }
            });
        },
        async fetchInformation(id) {
            const { data } = await axios.get("/get_informations", { params: { id } });
            return data;
        },
        async fetchTafseer(id) {
            const { data } = await axios.get(`/tafseer/${id}/fetch`);
            return data;
        },
        scrollToSelectedAyah() {
            this.$nextTick(() => {
                const list = this.$refs.ayahList;
                if (!list) return;
                const selected = list.querySelector(".selected");
                if (selected) {
                    selected.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
            });
        },
        clearAyahJumpError() {
            this.ayahJumpError = "";
        },
        parseAyahJumpInput(rawValue) {
            if (!this.selectedSurahAyahTotal) {
                return {
                    error: "Select a surah with available verses first.",
                };
            }

            const value = String(rawValue ?? "").trim().replace(/\s+/g, "");
            if (!value) {
                return {
                    error: "Enter an ayah number or a range.",
                };
            }

            const rangeMatch = value.match(/^(\d+)-(\d+)$/);
            if (rangeMatch) {
                const start = Number(rangeMatch[1]);
                const end = Number(rangeMatch[2]);

                if (!start || !end) {
                    return {
                        error: "Use numbers only in the ayah range.",
                    };
                }

                if (start > end) {
                    return {
                        error: "The range must start with the smaller ayah number.",
                    };
                }

                if (start < 1 || end > this.selectedSurahAyahTotal) {
                    return {
                        error: `Choose a range between 1 and ${this.selectedSurahAyahTotal}.`,
                    };
                }

                return {
                    start,
                    end,
                    normalized: `${start}-${end}`,
                };
            }

            if (!/^\d+$/.test(value)) {
                return {
                    error: "Use a single ayah number or a range like 25-30.",
                };
            }

            const start = Number(value);
            if (start < 1 || start > this.selectedSurahAyahTotal) {
                return {
                    error: `Choose an ayah between 1 and ${this.selectedSurahAyahTotal}.`,
                };
            }

            return {
                start,
                end: start,
                normalized: String(start),
            };
        },
        submitAyahJump() {
            const parsed = this.parseAyahJumpInput(this.ayahJumpInput);
            if (parsed.error) {
                this.ayahJumpError = parsed.error;
                return;
            }

            this.ayahJumpError = "";
            this.ayahJumpInput = parsed.normalized;
            this.selectAyah(parsed.start - 1);
        },
        updateCardSection(ayah) {
            this.currentAyah = ayah;
        },
        dismissError() {
            this.showError = false;
        },
        goToFirstAyah() {
            this.selectAyah(0);
        },
        goToPreviousAyah() {
            if (!this.ayat.length) return;
            const nextIndex = (this.selectedIndexAyah - 1 + this.ayat.length) % this.ayat.length;
            this.selectAyah(nextIndex);
        },
        goToNextAyah() {
            if (!this.ayat.length) return;
            const nextIndex = (this.selectedIndexAyah + 1) % this.ayat.length;
            this.selectAyah(nextIndex);
        },
        goToLastAyah() {
            if (!this.ayat.length) return;
            this.selectAyah(this.ayat.length - 1);
        },
        handleInputChange(payload) {
            if (payload && Array.isArray(payload.results)) {
                this.filteredResults = payload.results;
            }
        },
        toggleContent() {
            this.isOpen = !this.isOpen;
        },
        toggleExpand() {
            this.expanded = !this.expanded;
        },
        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen;
        },
        toggleAudioPlayback() {
            const sections = [
                this.$refs.translationSection,
                this.$refs.tafseerSection,
                this.$refs.transliterationSection,
            ].filter(Boolean);
            sections.forEach((section) => {
                if (typeof section?.toggleSpeech === "function") {
                    try {
                        section.toggleSpeech();
                    } catch (error) {
                        console.warn("toggleSpeech failed", error);
                    }
                }
            });
        },
        updateInformation(info) {
            if (!info) return;
            this.information = info;
            this.modalInformation = info;
            this.translation = typeof info.translation === "object"
                ? info.translation?.text
                : info.translation;
            if (info.ayah?.id) {
                this.infoCache[info.ayah.id] = info;
            }
        },
        updateTafseer(tafseer) {
            this.tafseer = tafseer;
            if (this.selectedAyahId) {
                this.tafseerCache[this.selectedAyahId] = tafseer;
            }
        },
        releaseSwipeSource(source) {
            if (this.activeSwipeSource === source) {
                this.activeSwipeSource = null;
            }
            const finalize = () => {
                this.touchEndX = 0;
                this.touchEndY = 0;
            };
            if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
                window.requestAnimationFrame(finalize);
            } else {
                setTimeout(finalize, 0);
            }
        },
        shouldProcessGesture() {
            const now = Date.now();
            if (now - this.lastGestureTs < this.gestureCooldownMs) {
                return false;
            }
            this.lastGestureTs = now;
            return true;
        },
        handleTouchStart(event) {
            if (!this.allowGestures) return;
            if (this.activeSwipeSource && this.activeSwipeSource !== "touch") return;
            this.activeSwipeSource = "touch";
            this.gestureHandled = false;
            const touch = event.changedTouches ? event.changedTouches[0] : event;
            this.touchStartX = touch.clientX ?? 0;
            this.touchStartY = touch.clientY ?? 0;
            this.touchStartTime = Date.now();
        },
        handleTouchMove(event) {
            if (!this.allowGestures || this.activeSwipeSource !== "touch") return;
            const touch = event.changedTouches ? event.changedTouches[0] : event;
            this.touchEndX = touch.clientX ?? 0;
            this.touchEndY = touch.clientY ?? 0;
        },
        handleTouchEnd(event) {
            if (!this.allowGestures || (this.activeSwipeSource && this.activeSwipeSource !== "touch")) return;
            const deltaX = (this.touchEndX || this.touchStartX) - this.touchStartX;
            const deltaY = (this.touchEndY || this.touchStartY) - this.touchStartY;
            const duration = Date.now() - this.touchStartTime;
            if (this.gestureHandled) {
                this.releaseSwipeSource("touch");
                return;
            }
            if (
                Math.abs(deltaX) < this.swipeMinDistance ||
                Math.abs(deltaY) > this.wheelVertLeak ||
                duration > this.swipeMaxDuration
            ) {
                this.releaseSwipeSource("touch");
                return;
            }
            if (!this.shouldProcessGesture()) {
                this.releaseSwipeSource("touch");
                return;
            }
            this.gestureHandled = true;
            if (event?.cancelable) {
                event.preventDefault();
            }
            event?.stopPropagation?.();
            // Swipe right (deltaX > 0) should advance to next; swipe left to previous
            if (deltaX > 0) {
                this.goToNextAyah();
                this.triggerSwipeFeedback("next");
            } else {
                this.goToPreviousAyah();
                this.triggerSwipeFeedback("prev");
            }
            this.releaseSwipeSource("touch");
        },
        handlePointerDown(event) {
            if (!this.allowGestures || event.pointerType === "mouse" || event.pointerType === "touch") return;
            if (this.activeSwipeSource && this.activeSwipeSource !== "pointer") return;
            this.activeSwipeSource = "pointer";
            this.pointerActive = true;
            this.gestureHandled = false;
            this.pointerStartX = event.clientX;
            this.pointerStartY = event.clientY;
            this.pointerStartTime = Date.now();
        },
        handlePointerMove(event) {
            if (
                !this.allowGestures ||
                !this.pointerActive ||
                this.activeSwipeSource !== "pointer" ||
                event.pointerType === "touch"
            ) {
                return;
            }
            this.touchEndX = event.clientX;
            this.touchEndY = event.clientY;
        },
        handlePointerUp(event) {
            if (
                !this.allowGestures ||
                !this.pointerActive ||
                this.activeSwipeSource !== "pointer" ||
                event.pointerType === "touch"
            ) {
                return;
            }
            this.pointerActive = false;
            const deltaX = (this.touchEndX || this.pointerStartX) - this.pointerStartX;
            const duration = Date.now() - this.pointerStartTime;
            if (this.gestureHandled) {
                this.releaseSwipeSource("pointer");
                return;
            }
            if (Math.abs(deltaX) < this.swipeMinDistance || duration > this.swipeMaxDuration) {
                this.releaseSwipeSource("pointer");
                return;
            }
            if (!this.shouldProcessGesture()) {
                this.releaseSwipeSource("pointer");
                return;
            }
            this.gestureHandled = true;
            // Swipe right (deltaX > 0) should advance to next; swipe left to previous
            if (deltaX > 0) {
                this.goToNextAyah();
                this.triggerSwipeFeedback("next");
            } else {
                this.goToPreviousAyah();
                this.triggerSwipeFeedback("prev");
            }
            this.releaseSwipeSource("pointer");
        },
        handleWindowWheel(event) {
            if (!this.allowGestures) return;
            const now = Date.now();
            if (now - this.wheelLastTime > this.wheelResetMs) {
                this.wheelAccumX = 0;
            }
            this.wheelAccumX += event.deltaX;
            this.wheelLastTime = now;
            if (Math.abs(this.wheelAccumX) < this.wheelThreshold) return;
            if (!this.shouldProcessGesture()) {
                this.wheelAccumX = 0;
                return;
            }
            if (this.wheelAccumX > 0) {
                this.goToNextAyah();
                this.triggerSwipeFeedback("next");
            } else {
                this.goToPreviousAyah();
                this.triggerSwipeFeedback("prev");
            }
            this.wheelAccumX = 0;
        },
        handleWheelTranslation(event) {
            this.handleWindowWheel(event);
        },
        handleWheelTafseer(event) {
            this.handleWindowWheel(event);
        },
        handleWheelTransliteration(event) {
            this.handleWindowWheel(event);
        },
        triggerSwipeFeedback(direction) {
            this.lastSwipeDir = direction;
            this.swipeNoticeDir = direction;
            this.swipeNoticeText = direction === "next" ? "Next verse" : "Previous verse";
            this.showSwipeNotice = true;
            if (this._swipeNoticeTimer) {
                clearTimeout(this._swipeNoticeTimer);
            }
            this._swipeNoticeTimer = setTimeout(() => {
                this.showSwipeNotice = false;
                this._swipeNoticeTimer = null;
            }, 500);
        },
        dismissSwipeTip() {
            this.showSwipeTip = false;
            try {
                window.localStorage.setItem(STORAGE_KEYS.swipeTip, "1");
            } catch (error) {
                // ignore
            }
        },
        clearHighlight() {
            // placeholder for child callback
        },
        highlightText(charIndex, currentWord) {
            if (this.$refs.translationSection?.highlightText) {
                this.$refs.translationSection.highlightText(charIndex, currentWord);
            }
        },
        closeModal() {
            this.modalInformation = null;
        },
        openModal(refName) {
            const ref = this.$refs[refName];
            if (ref && typeof ref.showModal === "function") {
                ref.showModal();
            }
        },
        closeAlertText() {
            this.showAlertText = false;
        },
        updateSuccessMessage(message) {
            this.alertMessage = message;
            this.showAlertText = !!message;
        },
        async sendBookmark(payload, successMessage) {
            try {
                await axios.post("/bookmarks", payload);
                this.alertMessage = successMessage;
                this.alertType = "success";
                this.showAlert = true;
                this.scheduleAlertDismiss();
            } catch (error) {
                console.error("Error submitting bookmark:", error);
                this.showErrorAlert = true;
                this.scheduleAlertDismiss("error");
            }
        },
        submitBookmarkPayload(content, successMessage) {
            const ayah = this.information?.ayah;
            if (!ayah || !content) {
                this.showErrorAlert = true;
                this.scheduleAlertDismiss("error");
                return;
            }
            const payload = {
                surah_name: ayah.surah?.name_en,
                ayah_num: this.information?.ayah_id,
                ayah_verse_ar: ayah.ayah_text,
                ayah_verse_en: content,
                user_id: this.userId,
            };
            this.sendBookmark(payload, successMessage);
        },
        submitForm() {
            this.submitBookmarkPayload(this.translation, "Ayah bookmarked successfully!");
        },
        submitFormTafseer() {
            this.submitBookmarkPayload(this.tafseer, "Tafseer bookmarked successfully!");
        },
        submitFormTransliteration() {
            const transliteration = this.information?.transliteration;
            this.submitBookmarkPayload(transliteration, "Transliteration bookmarked successfully!");
        },
        scheduleAlertDismiss(type = "success") {
            setTimeout(() => {
                if (type === "success") {
                    this.showAlert = false;
                } else {
                    this.showErrorAlert = false;
                }
            }, 3000);
        },
        getAyat() {
            this.scheduleFetchAyat();
        },
        selectSurahFromResults(surah) {
            if (!surah) return;
            this.updateSelectedSurah(surah.id || surah);
        },
    },
    watch: {
        ayat(newAyat) {
            if (Array.isArray(newAyat) && newAyat.length) {
                this.selectAyah(0);
            }
        },
        verseNumber(newVal, oldVal) {
            if (newVal !== oldVal) {
                const numeric = toNumber(newVal);
                if (numeric && numeric >= 1 && numeric <= this.ayat.length) {
                    this.selectAyah(numeric - 1);
                }
            }
        },
        selectedSurahId(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.ayahJumpInput = "";
                this.ayahJumpError = "";
                this.scheduleFetchAyat(newVal);
            }
        },
    },
};
