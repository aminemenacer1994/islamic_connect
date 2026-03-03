<template>
    <div class="container  surat-premium"
        :class="{
            'has-audio-player': bottomAudioPlayerEnabled && showAudioPlayer && !isSingleWordPreviewActive,
            'has-sidebar': true,
            'sidebar-collapsed': sidebarCollapsed,
            'mobile-toolbar-pinned': isTabletOrMobile && isToolbarPinned,
            'mobile-toolbar-expanded': isTabletOrMobile && isToolbarPinned && isMobileToolbarExpanded,
            'reading-fullscreen': isReadingFullscreen,
            'deep-focus-mode': isDeepFocusMode,
            'blur-next-ayah-enabled': isBlurNextAyahEnabled,
            'memorisation-mode': isMemorisationMode
        }"
        :style="quranFontStyle"
        role="main" aria-label="Quran Explorer">
        <div class="row justify-content-center text-center mb-3 reading-fullscreen-chrome quran-reader-hero">
            <div class="col-lg-10 col-xl-10">
                <h1 class="display-5 fw-bold">The Holy Quran</h1>
                <p class="holy-book-description mb-0">Explore the Holy Quran with clear recitations, trusted translations, and practical tools that help you read with focus, listen with understanding, and reflect on each ayah in your daily life.</p>
            </div>
        </div>
        <div
            v-if="continueProgress || desktopSurahContext.englishName || desktopSurahContext.arabicName"
            class="continue-surah-container mb-3">
            <div class="row g-3 align-items-stretch continue-surah-row">
            <div class="col-12 col-md-6">
                <div
                    v-if="continueProgress && !continueProgressHidden"
                    class="continue-progress-banner ltr-text h-100"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true">
                    <div class="continue-progress-banner-icon" aria-hidden="true">
                        <i class="bi" :class="continueProgress?.mode === 'listening' ? 'bi-headphones' : 'bi-book-half'"></i>
                    </div>
                    <div class="continue-progress-banner-main">
                        <div class="continue-progress-banner-topline">
                            <span class="continue-progress-banner-eyebrow">Continue</span>
                            <span class="continue-progress-banner-mode">{{ continueProgress?.mode === "listening" ? "Listening" : "Reading" }}</span>
                        </div>
                        <div class="continue-progress-banner-title">
                            Surah {{ continueProgress?.surahNumber }} · {{ getContinueProgressSurahName() }} · Ayah {{ continueProgress?.ayahNumber }}
                        </div>
                        <div class="continue-progress-banner-subtitle">
                            Jump back exactly where you paused.
                        </div>
                    </div>
                    <div class="continue-progress-banner-actions">
                        <button
                            type="button"
                            class="btn continue-progress-banner-btn"
                            @click="resumeContinueProgress({ autoplay: continueProgress?.mode === 'listening' })">
                            Resume now
                        </button>
                        <button
                            type="button"
                            class="btn continue-progress-banner-btn-secondary"
                            @click="hideContinueProgressBanner()">
                            Hide
                        </button>
                    </div>
                </div>
                <div
                    v-else-if="continueProgress && continueProgressHidden"
                    class="continue-progress-restore-wrap ltr-text">
                    <button
                        type="button"
                        class="btn continue-progress-restore-btn"
                        @click="showContinueProgressBanner()">
                        Show continue card
                    </button>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div
                    v-if="desktopSurahContext.englishName || desktopSurahContext.arabicName"
                    class="quran-toolbar-surah-identity quran-toolbar-surah-identity-mobile ltr-text pb-0"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true">
                    <div class="quran-toolbar-surah-identity-inner d-flex align-items-center flex-nowrap">
                        <span
                            v-if="desktopSurahContext.arabicName"
                            class="quran-toolbar-surah-identity-ar text-end"
                            dir="rtl">
                            {{ desktopSurahContext.arabicName }}
                        </span>
                        <div class="quran-toolbar-surah-identity-en d-flex flex-column text-start flex-grow-1">
                            <span class="quran-toolbar-surah-identity-en-main d-inline-flex align-items-center">
                                <span
                                    v-if="desktopSurahContext.number"
                                    class="quran-toolbar-surah-identity-number">
                                    {{ desktopSurahContext.number }}.
                                </span>
                                <span class="quran-toolbar-surah-identity-title">
                                    {{ desktopSurahContext.englishName }}
                                </span>
                            </span>
                            <span
                                v-if="desktopSurahContext.translationName"
                                class="quran-toolbar-surah-identity-en-sub">
                                {{ desktopSurahContext.translationName }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
            <transition name="fade">
                <div
                    v-if="bookmarkToast"
                    class="alert mode-toggle-toast bookmark-toast shadow-lg d-flex align-items-center justify-content-between"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true">
                    <div class="d-inline-flex align-items-center gap-2">
                        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                        <span>{{ bookmarkToast }}</span>
                    </div>
                    <button
                        v-if="bookmarkToastAction && bookmarkToastAction.text"
                        type="button"
                        class="btn btn-sm btn-light mode-toggle-toast-action"
                        @click="handleBookmarkToastAction">
                        {{ bookmarkToastAction.text }}
                    </button>
                </div>
            </transition>
            <div
                id="advancedQuranSearchSection"
                v-show="isAdvancedSearchVisible || isTabletOrMobile"
                class="row justify-content-center mb-4">
            <div class="col-12">
               <section class="advanced-quran-search ltr-text"
                    :class="{
                        'is-panel-hidden': !isAdvancedSearchPanelVisible,
                        'is-search-hidden': !isAdvancedSearchVisible
                    }"
                    role="search"
                    aria-label="Advanced Quran search">
                     <div v-if="isAdvancedSearchVisible && !(isDeepFocusMode && isTabletOrMobile)" class="advanced-quran-search-top">
                        <div class="advanced-quran-search-head">
                            <h2 class="advanced-quran-search-title mb-0">Search Quran</h2>
                            <p class="advanced-quran-search-subtitle mb-0">
                                Ayah matches with translation.
                            </p>
                        </div>
                        <div class="advanced-quran-search-top-actions">
                            <div class="advanced-quran-search-top-pills">
                                <button
                                    type="button"
                                    class="btn btn-link advanced-quran-search-visibility-btn advanced-quran-search-top-pill"
                                    :aria-expanded="isAdvancedSearchVisible ? 'true' : 'false'"
                                    aria-controls="advancedQuranSearchSection"
                                    @click="toggleAdvancedSearchVisibility">
                                    <i class="bi"
                                        :class="isAdvancedSearchVisible ? 'bi-eye-slash' : 'bi-eye'"
                                        aria-hidden="true"></i>
                                    <span>{{ isAdvancedSearchVisible ? "Hide search" : "Show search" }}</span>
                                </button>
                            </div>
                            <button
                                v-if="isAdvancedSearchVisible && isAdvancedSearchPanelVisible && hasAdvancedSearchPanelContent"
                                type="button"
                                class="btn btn-link advanced-quran-search-close-panel"
                                @click="closeAdvancedSearchPanel"
                                aria-label="Close and clear search results panel">
                                <i class="bi bi-x-lg" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                
                    <div v-if="!(isDeepFocusMode && isTabletOrMobile) && isAdvancedSearchVisible" class="advanced-quran-search-input-wrap">
                        <i class="bi bi-search advanced-quran-search-icon" aria-hidden="true" style="display:none;"></i>
                        <input type="search" class="form-control advanced-quran-search-input"
                            ref="advancedSearchInput"
                            v-model="advancedSearchQuery"
                            placeholder="Search across all ayahs..."
                            aria-label="Search across all Quran verses"
                            @keydown.enter.prevent="runAdvancedSearch({ force: true })"
                            @keydown.esc.prevent="clearAdvancedSearch()" />
                        <div class="advanced-quran-search-actions">
                            <button
                                v-if="speechRecognitionSupported"
                                type="button"
                                class="btn btn-link advanced-quran-search-voice"
                                :class="{ 'is-listening': speechRecognitionListening }"
                                @click="toggleVoiceSearch"
                                :aria-label="speechRecognitionListening
                                    ? 'Stop voice search'
                                    : 'Start voice search'">
                                <i class="bi"
                                    :class="speechRecognitionListening ? 'bi-mic-fill' : 'bi-mic'"
                                    aria-hidden="true"></i>
                            </button>
                            <button v-if="advancedSearchQuery" type="button"
                                class="btn btn-link advanced-quran-search-clear"
                                @click="clearAdvancedSearch()"
                                aria-label="Clear advanced search">
                                <i class="bi bi-x-circle" aria-hidden="true"></i>
                                <span class="advanced-quran-search-clear-text">Clear</span>
                            </button>
                        </div>
                    </div>
                    <div
                        v-if="isTabletOrMobile && isDeepFocusMode"
                        class="advanced-quran-mobile-deep-focus-bar"
                        role="group"
                        aria-label="Deep focus mode controls">
                        <button
                            type="button"
                            class="btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-deep-focus"
                            :class="{ 'is-enabled': isDeepFocusMode }"
                            @click="toggleDeepFocusMode"
                            :aria-label="isDeepFocusMode ? 'Turn deep focus mode off' : 'Turn deep focus mode on'"
                            :title="isDeepFocusMode ? 'Turn deep focus mode off' : 'Turn deep focus mode on'">
                            <i class="bi bi-bullseye" aria-hidden="true"></i>
                            <span class="advanced-quran-mobile-action-label">Deep focus mode</span>
                            <span class="advanced-quran-mobile-action-btn-state">
                                {{ isDeepFocusMode ? "On" : "Off" }}
                            </span>
                        </button>
                    </div>
                    <template v-else-if="isTabletOrMobile">
                        <div
                            class="advanced-quran-mobile-controls border-shadow-xl"
                            :class="{
                                'is-pinned': isToolbarPinned,
                                'is-expanded': isMobileToolbarExpanded
                            }"
                            role="group"
                            aria-label="Surah quick controls">
                        <div
                            class="advanced-quran-mobile-main-row"
                            :class="{ 'has-search-toggle': !isAdvancedSearchVisible }">
                            <label class="visually-hidden" for="searchSurahDropdown">
                                Select surah
                            </label>
                            <select
                                id="searchSurahDropdown"
                                class="form-select advanced-quran-mobile-surah-select"
                                v-model="selectedSurah"
                                @change="selectSurah(selectedSurah)"
                                aria-label="Select surah">
                                <option v-if="!surahs.length" disabled>Loading surahs...</option>
                                <option v-for="surah in surahs" :key="surah.number" :value="String(surah.number)">
                                    {{ surah.number }}. {{ surah.englishName }}
                                </option>
                            </select>
                            <button
                                v-if="false"
                                type="button"
                                class="btn advanced-quran-mobile-icon-btn advanced-quran-mobile-search-toggle-btn"
                                @click="toggleAdvancedSearchVisibility"
                                aria-label="Show search"
                                title="Show search">
                                <i class="bi bi-eye" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn advanced-quran-mobile-icon-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#surahSettingsModal"
                                @click="prepareSettingsDraft"
                                aria-label="Open display settings"
                                title="Display settings">
                                <i class="bi bi-gear" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="btn advanced-quran-mobile-icon-btn advanced-quran-mobile-expand-btn"
                                :aria-expanded="isMobileToolbarExpanded ? 'true' : 'false'"
                                aria-controls="advancedQuranMobileExpandedControls"
                                :aria-label="isMobileToolbarExpanded
                                    ? 'Collapse more toolbar controls'
                                    : 'Expand more toolbar controls'"
                                :title="isMobileToolbarExpanded
                                    ? 'Collapse controls'
                                    : 'More controls'"
                                @click="toggleMobileToolbarExpanded">
                                <i class="bi"
                                    :class="isMobileToolbarExpanded ? 'bi-chevron-up' : 'bi-chevron-down'"
                                    aria-hidden="true"></i>
                            </button>
                        </div>
                        <div
                            v-if="isMobileToolbarExpanded"
                            id="advancedQuranMobileExpandedControls"
                            aria-label="Extended surah controls">
                            <div class="advanced-quran-mobile-label-row d-flex align-items-center">
                                <span class="quran-toolbar-label"><b>Reader Controls</b></span>
                                <div class="quran-toolbar-separator"></div>
                            </div>
                            <div class="advanced-quran-mobile-select-grid">
                                <div class="advanced-quran-mobile-select-field">
                                    <label class="visually-hidden" for="mobileToolbarReciterSelect">
                                        Select audio reciter
                                    </label>
                                    <select
                                        id="mobileToolbarReciterSelect"
                                        class="form-select advanced-quran-mobile-select"
                                        v-model="selectedReciter"
                                        aria-label="Select audio reciter">
                                        <option value="" disabled>Select reciter</option>
                                        <option v-for="reciter in recitersSorted" :key="reciter.identifier" :value="reciter.identifier">
                                            {{ reciter.englishName }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div
                                class="advanced-quran-mobile-toggle-row"
                                role="group"
                                aria-label="Global translation controls">
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-toggle"
                                    :class="{ 'is-enabled': isTranslationAllEnabled }"
                                    @click="toggleToolbarTranslation"
                                    :title="isTranslationAllEnabled
                                        ? 'Turn translation off for all visible ayahs.'
                                        : 'Turn translation on for all visible ayahs.'"
                                    :aria-label="isTranslationAllEnabled
                                        ? 'Turn translation off for all ayahs'
                                        : 'Turn translation on for all ayahs'">
                                    <i class="bi bi-translate" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Translation</span>
                                    <span class="advanced-quran-mobile-action-btn-state">
                                        {{ isTranslationAllEnabled ? "On" : "Off" }}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-toggle"
                                    :class="{ 'is-enabled': isTransliterationAllEnabled }"
                                    @click="toggleToolbarTransliteration"
                                    :title="isTransliterationAllEnabled
                                        ? 'Turn transliteration off for all visible ayahs.'
                                        : 'Turn transliteration on for all visible ayahs.'"
                                    :aria-label="isTransliterationAllEnabled
                                        ? 'Turn transliteration off for all ayahs'
                                        : 'Turn transliteration on for all ayahs'">
                                    <i class="bi bi-input-cursor-text" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Transliteration</span>
                                </button>
                            </div>

                            <div class="advanced-quran-mobile-action-grid">
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-memorisation"
                                    @click="toggleMemorisationToolbar"
                                    aria-label="Open memorisation tools"
                                    :class="{ 'is-active': isMemorisationToolbarVisible }"
                                    title="Open memorisation tools to support repetition, focus, and revision.">
                                    <i class="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">{{ isMemorisationToolbarVisible ? 'Close Memorisation Tools' : 'Memorisation Tools' }}</span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="toggleCustomPlaylistPanel"
                                    :aria-expanded="showCustomPlaylistPanel ? 'true' : 'false'"
                                    :aria-label="showCustomPlaylistPanel ? 'Close custom playlist library' : 'Open custom playlist library'"
                                    :title="showCustomPlaylistPanel ? 'Close playlist library' : 'Open playlist library'">
                                    <i class="bi bi-music-note-list" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">{{ showCustomPlaylistPanel ? 'Close playlist' : 'Playlist' }}</span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="openSurahInfo(currentSurahInfo)"
                                    :disabled="!currentSurahInfo"
                                    aria-label="Open surah information"
                                    title="Open surah information">
                                    <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Surah info</span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="openTranslationCompareModal"
                                    aria-label="Compare English translations side by side"
                                    title="Compare multiple English translations side by side in one view.">
                                    <i class="bi bi-columns-gap" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Compare translations</span>
                                </button>
                                <button
                                    v-if="showTajweed"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#tajweedRulesModal"
                                    aria-label="View tajweed rules"
                                    title="Open the tajweed color guide to understand pronunciation and reading rules.">
                                    <i class="bi bi-palette-fill" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Tajweed rules</span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="toggleDeepFocusMode"
                                    aria-label="Toggle deep focus mode"
                                    title="Toggle deep focus mode">
                                    <i class="bi bi-bullseye" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Deep focus mode</span>
                                    <span class="advanced-quran-mobile-action-btn-state">
                                        {{ isDeepFocusMode ? "On" : "Off" }}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click.stop="openFontPicker"
                                    aria-label="Choose Quranic fonts"
                                    title="Open Quran font options to change how Arabic text is displayed.">
                                    <i class="fas fa-font" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Font</span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="openSuratOnboarding"
                                    aria-label="Open surat onboarding guide"
                                    title="Open onboarding guide">
                                    <i class="fas fa-compass" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Guide</span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-download"
                                    :class="{ 'is-downloaded': isSurahAudioDownloaded }"
                                    @click.stop="downloadSurahAudio()"
                                    :disabled="isSurahAudioDownloading || !canDownloadSurahAudio()"
                                    :aria-label="!canDownloadSurahAudio()
                                        ? 'Full surah download unavailable for this reciter'
                                        : isSurahAudioDownloading
                                            ? 'Downloading full surah MP3'
                                            : isSurahAudioDownloaded
                                                ? 'Surah MP3 downloaded'
                                                : surahDownloadReadyAriaLabel"
                                    :title="!canDownloadSurahAudio()
                                        ? 'This reciter does not provide a full-surah MP3 file for download.'
                                        : isSurahAudioDownloading
                                            ? 'Downloading the full surah MP3 to your device for offline listening.'
                                            : isSurahAudioDownloaded
                                                ? 'The full surah MP3 is already downloaded. Click to download it again.'
                                                : surahDownloadReadyLabel">
                                    <i
                                        class="bi advanced-quran-mobile-download-icon"
                                        :class="isSurahAudioDownloading
                                            ? 'bi-arrow-repeat ic-spin'
                                            : isSurahAudioDownloaded
                                                ? 'bi-check-circle-fill'
                                                : 'bi-cloud-arrow-down-fill'"
                                        aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Download</span>
                                </button>
                                <button
                                    v-if="hasPinnedAyahs && isPinnedSectionHidden"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="showPinnedSection"
                                    aria-label="Show pinned favourite ayat"
                                    title="Show pinned favourite ayat">
                                    <i class="bi bi-pin-angle-fill" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Pins</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    </template>

                    <div
                        v-if="isAdvancedSearchVisible && isAdvancedSearchPanelVisible && !(isDeepFocusMode && isTabletOrMobile)"
                        id="advancedQuranSearchPanel"
                        class="advanced-quran-search-panel">
                        <div class="advanced-quran-search-meta" aria-live="polite">
                            <span v-if="advancedSearchLoading">
                                Searching ayahs...
                            </span>
                            <span v-else-if="advancedSearchError" class="text-danger">
                                {{ advancedSearchError }}
                            </span>
                            <span v-else-if="hasAdvancedSearchQuery && hasAdvancedSearchResults">
                                Showing {{ advancedSearchResults.length }} of {{ advancedSearchTotalMatches }} matches across {{ advancedSearchMatchedSurahCount }} surahs.
                                <span v-if="isAdvancedSearchResultCapReached">
                                    Refine your query to view fewer matches.
                                </span>
                            </span>
                            <span v-else-if="hasAdvancedSearchQuery && !advancedSearchLoading">
                                No matches found for "{{ advancedSearchTrimmedQuery }}".
                            </span>
                        </div>
                        <div v-if="speechRecognitionError" class="advanced-quran-search-speech-error" aria-live="polite">
                            {{ speechRecognitionError }}
                        </div>

                        <div v-if="hasAdvancedSearchResults" class="advanced-quran-search-results"
                            role="list" aria-label="Advanced Quran search results by surah">
                            <section
                                v-for="group in advancedSearchGroupedResults"
                                :key="`advanced-surah-${group.surahNumber}`"
                                class="advanced-quran-search-surah-group"
                                role="listitem">
                                <div class="advanced-quran-search-surah-head">
                                    <div class="advanced-quran-search-surah-ref">
                                        <span class="advanced-quran-search-result-chip">
                                            {{ group.surahNumber }}
                                        </span>
                                        <span class="advanced-quran-search-result-surah">
                                            {{ group.surahEnglishName }}
                                        </span>
                                        <span v-if="group.surahArabicName"
                                            class="advanced-quran-search-result-arabic-name">
                                            {{ group.surahArabicName }}
                                        </span>
                                        <span class="advanced-quran-search-result-meta">
                                            {{ group.results.length }} match{{ group.results.length === 1 ? "" : "es" }}
                                        </span>
                                    </div>
                                    <button
                                        v-if="group.results.length > advancedSearchSurahPreviewLimit"
                                        type="button"
                                        class="btn btn-sm advanced-quran-search-expand-surah"
                                        @click="toggleAdvancedSearchSurahExpansion(group.surahNumber)"
                                        :aria-expanded="isAdvancedSearchSurahExpanded(group.surahNumber) ? 'true' : 'false'">
                                        {{ isAdvancedSearchSurahExpanded(group.surahNumber)
                                            ? "Collapse"
                                            : "Expand (" + group.results.length + ")" }}
                                    </button>
                                </div>
                                <article
                                    v-for="result in getVisibleAdvancedSearchMatchesForSurah(group)"
                                    :key="result.key"
                                    class="advanced-quran-search-result">
                                    <div class="advanced-quran-search-result-head">
                                        <div class="advanced-quran-search-result-ref">
                                            <span class="advanced-quran-search-result-chip">
                                                {{ result.surahNumber }}:{{ result.ayahNumber }}
                                            </span>
                                            <span v-if="result.page" class="advanced-quran-search-result-meta">
                                                Page {{ result.page }}
                                            </span>
                                            <span v-if="result.juz" class="advanced-quran-search-result-meta">
                                                Juz {{ result.juz }}
                                            </span>
                                        </div>
                                        <button type="button" class="btn btn-sm advanced-quran-search-open"
                                            @click="openAdvancedSearchResult(result)"
                                            :aria-label="`Open Surah ${result.surahNumber}, Ayah ${result.ayahNumber}`">
                                            <i class="bi bi-box-arrow-up-right me-1" aria-hidden="true"></i>
                                            Open
                                        </button>
                                    </div>
                                    <p class="advanced-quran-search-arabic mb-2"
                                        v-html="highlightAdvancedSearchText(result.text)"></p>
                                    <div class="advanced-quran-search-detail-grid">
                                        <div class="advanced-quran-search-detail">
                                            <span class="advanced-quran-search-detail-label">Translation</span>
                                            <p class="advanced-quran-search-translation mb-0"
                                                v-html="highlightAdvancedSearchText(result.translation)"></p>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        </div>
                    </div>
                   
                </section> 
            </div>
        </div>
        <div v-if="(surahDetails || currentSurahInfo) && ((!isTabletOrMobile && (showDesktopToolbar || showDesktopSurahContext)) || (isTabletOrMobile && showCustomPlaylistPanel))"
            class="quran-toolbar-sticky ltr-text"
            :class="{
                'quran-toolbar-fixed-shell': showDesktopToolbar && !isTabletOrMobile,
                'is-pinned': showDesktopToolbar && isToolbarPinned && !isTabletOrMobile,
                'is-mobile-playlist-shell': isTabletOrMobile && showCustomPlaylistPanel
            }"
            role="region"
            aria-label="Quran quick controls">
            <div v-if="showDesktopToolbar && !isTabletOrMobile" class="quran-toolbar border-shadow-xl">
                <span class="quran-toolbar-label"><b>Reader Controls</b></span>
                <div class="quran-toolbar-separator"></div>
                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-memorisation"
                    @click="toggleMemorisationToolbar"
                    :class="{
                        'is-active': isMemorisationToolbarVisible,
                        'is-attention': !isMemorisationToolbarVisible
                    }"
                    aria-label="Open memorisation tools"
                    title="Open memorisation tools to support repetition, focus, and revision.">
                    <i class="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">{{ isMemorisationToolbarVisible ? 'Close Memorisation Tools' : 'Memorisation Tools' }}</span>
                </button>

                <div class="quran-toolbar-reciter">
                    <label class="visually-hidden" for="toolbarReciterSelect">
                        Select audio reciter
                    </label>
                    <select
                        id="toolbarReciterSelect"
                        class="form-select quran-toolbar-select"
                        v-model="selectedReciter"
                        title="Choose which reciter's voice will be used for the surah audio."
                        aria-label="Select audio reciter">
                        <option value="" disabled>Select reciter</option>
                        <option v-for="reciter in recitersSorted" :key="reciter.identifier" :value="reciter.identifier">
                            {{ reciter.englishName }}
                        </option>
                    </select>
                </div>

                <button
                    v-if="showTajweed"
                    type="button"
                    class="quran-toolbar-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#tajweedRulesModal"
                    aria-label="View tajweed rules"
                    title="Open the tajweed color guide to understand pronunciation and reading rules.">
                    <i class="bi bi-palette-fill" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Tajweed rules</span>
                </button>

                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-toggle"
                    :class="{ 'is-enabled': isTranslationAllEnabled }"
                    @click="toggleToolbarTranslation"
                    :title="isTranslationAllEnabled
                        ? 'Turn translation off for all visible ayahs.'
                        : 'Turn translation on for all visible ayahs.'"
                    :aria-label="isTranslationAllEnabled
                        ? 'Turn translation off for all ayahs'
                        : 'Turn translation on for all ayahs'">
                    <i class="bi bi-translate" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Translation</span>
                    <span class="quran-toolbar-btn-state">{{ isTranslationAllEnabled ? "On" : "Off" }}</span>
                </button>

                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-toggle"
                    :class="{ 'is-enabled': isTransliterationAllEnabled }"
                    @click="toggleToolbarTransliteration"
                    :title="isTransliterationAllEnabled
                        ? 'Turn transliteration off for all visible ayahs.'
                        : 'Turn transliteration on for all visible ayahs.'"
                    :aria-label="isTransliterationAllEnabled
                        ? 'Turn transliteration off for all ayahs'
                        : 'Turn transliteration on for all ayahs'">
                    <i class="bi bi-input-cursor-text" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Transliteration</span>
                </button>
                <button
                    type="button"
                    class="quran-toolbar-btn"
                    @click="openTranslationCompareModal"
                    aria-label="Compare English translations side by side"
                    title="Compare multiple English translations side by side in one view.">
                    <i class="bi bi-columns-gap" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Compare translations</span>
                </button>
                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-deep-focus"
                    :class="{ 'is-active': isDeepFocusMode }"
                    @click="toggleDeepFocusMode"
                    :aria-label="isDeepFocusMode ? 'Exit deep focus mode' : 'Enter deep focus mode'"
                    :title="isDeepFocusMode ? 'Exit deep focus mode and restore tools' : 'Enter deep focus mode for distraction-free reading'">
                    <i class="bi bi-bullseye" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Deep focus mode</span>
                    <span class="quran-toolbar-btn-state">{{ isDeepFocusMode ? "On" : "Off" }}</span>
                </button>
                <button
                    type="button"
                    class="quran-toolbar-btn"
                    @click="toggleCustomPlaylistPanel"
                    :aria-expanded="showCustomPlaylistPanel ? 'true' : 'false'"
                    aria-label="Open custom playlist library"
                    title="Open custom playlist library">
                    <i class="bi bi-music-note-list" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Playlist</span>
                </button>

                <!-- <button
                    v-if="!isAdvancedSearchVisible && !isTabletOrMobile"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-search-toggle quran-toolbar-btn-icon"
                    @click="toggleAdvancedSearchVisibility"
                    aria-label="Show search"
                    title="Show search">
                    <i class="fas fa-magnifying-glass quran-toolbar-search-icon" aria-hidden="true"></i>
                </button> -->

                <button
                    v-if="!isTabletOrMobile"
                    ref="readingFullscreenToggleButton"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-fullscreen quran-toolbar-btn-icon"
                    :class="{ 'is-active': isReadingFullscreen }"
                    @click="toggleReadingFullscreen"
                    :aria-label="isReadingFullscreen
                        ? 'Minimize / Exit Full Screen'
                        : 'Enter full screen Quran reading mode'"
                    :title="isReadingFullscreen
                        ? 'Minimize / Exit Full Screen'
                        : 'Enter full screen Quran reading mode'">
                    <i class="bi"
                        :class="isReadingFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'"
                        aria-hidden="true"></i>
                </button>

                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-font"
                    @click.stop="openFontPicker"
                    aria-label="Choose Quranic fonts"
                    title="Open Quran font options to change how Arabic text is displayed.">
                    <i class="fas fa-font" aria-hidden="true"></i>
                </button>
                <button
                    v-if="hasPinnedAyahs && isPinnedSectionHidden"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-pinned-restore"
                    @click="showPinnedSection"
                    aria-label="Show pinned favourite ayat"
                    title="Show pinned favourite ayat">
                    <i class="bi bi-pin-angle-fill" aria-hidden="true"></i>
                </button>

                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-info quran-toolbar-btn-icon"
                    @click="openSurahInfo(currentSurahInfo)"
                    :disabled="!currentSurahInfo"
                    aria-label="Open surah information"
                    title="View this surah's details, including its name, origin, and total ayah count.">
                    <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
                </button>

                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-sm quran-toolbar-btn-download quran-toolbar-btn-download-size-only"
                    :class="{ 'is-downloaded': isSurahAudioDownloaded }"
                    @click.stop="downloadSurahAudio()"
                    :disabled="isSurahAudioDownloading || !canDownloadSurahAudio()"
                    :aria-label="!canDownloadSurahAudio()
                        ? 'Full surah download unavailable for this reciter'
                        : isSurahAudioDownloading
                            ? 'Downloading full surah MP3'
                            : isSurahAudioDownloaded
                                ? 'Surah MP3 downloaded'
                                : surahDownloadReadyAriaLabel"
                    :title="!canDownloadSurahAudio()
                        ? 'This reciter does not provide a full-surah MP3 file for download.'
                        : isSurahAudioDownloading
                            ? 'Downloading the full surah MP3 to your device for offline listening.'
                            : isSurahAudioDownloaded
                                ? 'The full surah MP3 is already downloaded. Click to download it again.'
                                : surahDownloadReadyLabel">
                    <i
                        class="bi quran-toolbar-download-icon"
                        :class="isSurahAudioDownloading
                            ? 'bi-arrow-repeat ic-spin'
                            : isSurahAudioDownloaded
                                ? 'bi-check-circle-fill'
                            : 'bi-cloud-arrow-down-fill'"
                        aria-hidden="true"></i>
                </button>

                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-onboarding"
                    @click="openSuratOnboarding"
                    aria-label="Open surat onboarding guide"
                    title="Open onboarding guide">
                    <i class="fas fa-compass" aria-hidden="true"></i>
                </button>
                
                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-settings"
                    data-bs-toggle="modal"
                    data-bs-target="#surahSettingsModal"
                    @click="prepareSettingsDraft"
                    aria-label="Open display settings"
                    title="Open reading and display settings such as layout, card style, and typography.">
                    <i class="bi bi-gear-fill" aria-hidden="true"></i>
                </button>
            </div>
            <div v-if="showCustomPlaylistPanel" class="reader-custom-playlist-panel">
                <div class="reader-custom-playlist-header">
                    <div class="reader-custom-playlist-header-copy">
                        <div class="reader-custom-playlist-title-row">
                            <h3 class="reader-custom-playlist-title mb-0">Custom Playlist Library</h3>
                        </div>
                        <p class="reader-custom-playlist-subtitle mb-0">Pick a playlist, then play or manage its items.</p>
                    </div>
                    <div class="reader-custom-playlist-header-actions">
                        <span class="reader-custom-playlist-count">
                            {{ selectedPlaylistItemCount }} selected
                        </span>
                        <button
                            type="button"
                            class="reader-custom-playlist-close"
                            @click="toggleCustomPlaylistPanel"
                            aria-label="Close custom playlist panel"
                            title="Close playlist">
                            <i class="bi bi-x-lg" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div class="reader-custom-playlist-layout">
                    <aside class="reader-custom-playlist-nav" aria-label="Playlist list">
                        <div class="reader-custom-playlist-nav-header">
                            <label class="reader-custom-playlist-field-label mb-0">Playlists</label>
                            <button
                                type="button"
                                class="reader-custom-playlist-btn is-add-surah reader-custom-playlist-nav-add"
                                @click="openCreatePlaylistModal()">
                                <i class="bi bi-plus-circle" aria-hidden="true"></i>
                                New playlist
                            </button>
                        </div>
                        <div class="reader-custom-playlist-nav-tools">
                            <div class="reader-custom-playlist-search-wrap">
                                <i class="bi bi-search reader-custom-playlist-search-icon" aria-hidden="true"></i>
                                <input
                                    v-model.trim="playlistSearchQuery"
                                    type="search"
                                    class="form-control reader-custom-playlist-search-input"
                                    placeholder="Search playlists"
                                    aria-label="Search playlists">
                                <button
                                    v-if="playlistSearchQuery"
                                    type="button"
                                    class="reader-custom-playlist-search-clear"
                                    @click="playlistSearchQuery = ''"
                                    aria-label="Clear playlist search">
                                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div class="reader-custom-playlist-nav-list" role="tablist" aria-label="Saved playlists">
                            <button
                                v-for="playlist in filteredCustomPlaylists"
                                :key="`playlist-pill-${playlist.id}`"
                                type="button"
                                class="reader-custom-playlist-nav-item"
                                :class="{ 'is-active': String(activePlaylistId) === String(playlist.id) }"
                                :aria-selected="String(activePlaylistId) === String(playlist.id) ? 'true' : 'false'"
                                @click="selectPlaylist(playlist.id)">
                                <span class="reader-custom-playlist-nav-item-main">
                                    <span
                                        class="reader-custom-playlist-nav-item-accent"
                                        :style="{ backgroundColor: getPlaylistAccentColor(playlist) }"
                                        aria-hidden="true"></span>
                                    <i class="bi bi-music-note-list reader-custom-playlist-nav-item-icon" aria-hidden="true"></i>
                                    <span class="reader-custom-playlist-nav-item-name">
                                        {{ playlist.name || "Untitled Playlist" }}
                                    </span>
                                </span>
                                <span class="reader-custom-playlist-nav-item-count">
                                    {{ Array.isArray(playlist.items) ? playlist.items.length : 0 }}
                                </span>
                            </button>
                            <span v-if="!filteredCustomPlaylists.length" class="reader-custom-playlist-empty-inline">
                                {{ playlistSearchQuery ? "No playlists match your search." : "No playlists yet." }}
                            </span>
                        </div>
                    </aside>

                    <section v-if="activePlaylist" class="reader-custom-playlist-content">
                        <div class="reader-custom-playlist-content-header">
                            <div>
                                <div class="reader-custom-playlist-content-title-row">
                                    <h4 class="reader-custom-playlist-content-title mb-0">
                                        {{ activePlaylist.name || "Untitled Playlist" }}
                                    </h4>
                                    <span class="reader-custom-playlist-content-badge">
                                        {{ customPlaylistItemCount }} ayah{{ customPlaylistItemCount === 1 ? "" : "s" }}
                                    </span>
                                </div>
                                <p class="reader-custom-playlist-content-subtitle mb-0">
                                    {{ activePlaylistSubtitle }}
                                </p>
                            </div>
                            <div class="reader-custom-playlist-content-actions">
                                <button
                                    type="button"
                                    class="reader-custom-playlist-btn"
                                    :disabled="!activePlaylist"
                                    @click="togglePlaylistEditor">
                                    <i
                                        class="bi"
                                        :class="isPlaylistEditorVisible ? 'bi-x-circle' : 'bi-pencil-square'"
                                        aria-hidden="true"></i>
                                    {{ isPlaylistEditorVisible ? "Close edit" : "Edit playlist" }}
                                </button>
                                <button
                                    type="button"
                                    class="reader-custom-playlist-btn is-clear"
                                    :disabled="!hasAnyPlaylist"
                                    @click="removeActivePlaylist">
                                    <i class="bi bi-trash me-1" aria-hidden="true"></i>
                                    Delete playlist
                                </button>
                            </div>
                        </div>

                        <div v-if="isPlaylistEditorVisible" class="reader-custom-playlist-editor-card">
                            <div class="reader-custom-playlist-meta">
                                <div class="reader-custom-playlist-field">
                                    <label class="reader-custom-playlist-field-label">Name</label>
                                    <input
                                        v-model="playlistEditorName"
                                        type="text"
                                        class="form-control reader-custom-playlist-input"
                                        placeholder="Type playlist name">
                                </div>
                                <div class="reader-custom-playlist-field">
                                    <label class="reader-custom-playlist-field-label">Description</label>
                                    <input
                                        v-model="playlistEditorDescription"
                                        type="text"
                                        class="form-control reader-custom-playlist-input"
                                        placeholder="Type short description">
                                </div>
                                <div class="reader-custom-playlist-field reader-custom-playlist-field-save">
                                    <label class="reader-custom-playlist-field-label visually-hidden">Save</label>
                                    <button
                                        type="button"
                                        class="reader-custom-playlist-btn is-play reader-custom-playlist-save-btn"
                                        :disabled="!activePlaylist || !playlistEditorHasChanges"
                                        @click="saveAllPlaylistChanges">
                                        <i class="bi bi-check2-circle me-1" aria-hidden="true"></i>
                                        Save changes
                                    </button>
                                    <button
                                        v-if="showPlaylistEditorConfirmAction"
                                        type="button"
                                        class="reader-custom-playlist-btn reader-custom-playlist-confirm-btn"
                                        @click="confirmPlaylistEditorChanges">
                                        <i class="bi bi-patch-check me-1" aria-hidden="true"></i>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="reader-custom-playlist-items-card">
                            <div class="reader-custom-playlist-bulk-bar">
                                <div class="reader-custom-playlist-bulk-meta">
                                    <span>{{ customPlaylistItemCount }} ayah{{ customPlaylistItemCount === 1 ? "" : "s" }}</span>
                                    <span class="reader-custom-playlist-bulk-selected">{{ selectedPlaylistItemCount }} selected</span>
                                    <span class="reader-custom-playlist-bulk-status" role="status" aria-label="Auto-save reorder is on">
                                        <i class="bi bi-arrow-left-right" aria-hidden="true"></i>
                                        Auto-save reorder: On
                                    </span>
                                </div>
                                <div class="reader-custom-playlist-bulk-actions">
                                    <div class="reader-custom-playlist-bulk-actions-group" role="group" aria-label="Playlist quick actions">
                                        <button
                                            type="button"
                                            class="reader-custom-playlist-btn reader-custom-playlist-icon-btn"
                                            @click="toggleAllActivePlaylistSelections"
                                            :aria-label="allActivePlaylistItemsSelected ? 'Clear all selected playlist items' : 'Select all playlist items'"
                                            :title="allActivePlaylistItemsSelected ? 'Clear selection' : 'Select all'">
                                            <i
                                                class="bi"
                                                :class="allActivePlaylistItemsSelected ? 'bi-x-square' : 'bi-check2-square'"
                                                aria-hidden="true"></i>
                                            <span class="reader-custom-playlist-tool-label">{{ allActivePlaylistItemsSelected ? "Clear all" : "Select all" }}</span>
                                        </button>
                                        <button
                                            type="button"
                                            class="reader-custom-playlist-btn reader-custom-playlist-icon-btn"
                                            @click="togglePlaylistAyahListCollapsed"
                                            :aria-label="isPlaylistAyahListCollapsed ? 'Expand ayah list' : 'Collapse ayah list'"
                                            :title="isPlaylistAyahListCollapsed ? 'Expand list' : 'Collapse list'">
                                            <i
                                                class="bi"
                                                :class="isPlaylistAyahListCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'"
                                                aria-hidden="true"></i>
                                            <span class="reader-custom-playlist-tool-label">{{ isPlaylistAyahListCollapsed ? "Expand list" : "Collapse list" }}</span>
                                        </button>
                                        <button
                                            type="button"
                                            class="reader-custom-playlist-btn is-remove reader-custom-playlist-icon-btn"
                                            :disabled="!hasSelectedPlaylistItems"
                                            @click="removeSelectedPlaylistItems"
                                            aria-label="Delete selected playlist items"
                                            title="Delete selected">
                                            <i class="bi bi-trash" aria-hidden="true"></i>
                                            <span class="reader-custom-playlist-tool-label">Delete selected</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div v-if="!customPlaylistAyahItems.length" class="reader-custom-playlist-empty">
                                <p class="mb-2">No ayahs saved yet.</p>
                                <button
                                    type="button"
                                    class="reader-custom-playlist-btn is-add-surah"
                                    @click="closePlaylistAndBrowse">
                                    Browse to add ayahs
                                </button>
                            </div>
                            <template v-else>
                                <div v-if="customPlaylistAyahItems.length === 1" class="reader-custom-playlist-guidance">
                                    <div class="reader-custom-playlist-guidance-art" aria-hidden="true">
                                        <i class="bi bi-compass"></i>
                                    </div>
                                    <div class="reader-custom-playlist-guidance-copy">
                                        <h5 class="mb-1">Build your flow</h5>
                                        <p class="mb-0">Add a few more ayahs to unlock smoother playback and easier reorder patterns.</p>
                                    </div>
                                    <button
                                        type="button"
                                        class="reader-custom-playlist-btn is-add-surah reader-custom-playlist-guidance-btn"
                                        @click="closePlaylistAndBrowse">
                                        <i class="bi bi-plus-circle me-1" aria-hidden="true"></i>
                                        Add more ayahs
                                    </button>
                                </div>
                                <div class="reader-custom-playlist-list-tools">
                                    <div class="reader-custom-playlist-search-wrap reader-custom-playlist-search-wrap--items">
                                        <i class="bi bi-search reader-custom-playlist-search-icon" aria-hidden="true"></i>
                                        <input
                                            v-model.trim="playlistAyahSearchQuery"
                                            type="search"
                                            class="form-control reader-custom-playlist-search-input"
                                            placeholder="Search ayahs in this playlist"
                                            aria-label="Search ayahs in active playlist">
                                        <button
                                            v-if="playlistAyahSearchQuery"
                                            type="button"
                                            class="reader-custom-playlist-search-clear"
                                            @click="playlistAyahSearchQuery = ''"
                                            aria-label="Clear ayah search">
                                            <i class="bi bi-x-lg" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div class="reader-custom-playlist-filter-wrap">
                                        <label class="reader-custom-playlist-filter-label mb-0" for="playlistAyahFilterMode">Show</label>
                                        <select
                                            id="playlistAyahFilterMode"
                                            v-model="playlistAyahFilterMode"
                                            class="form-select reader-custom-playlist-filter-select"
                                            aria-label="Show playlist ayahs by filter">
                                            <option value="all">All ayahs</option>
                                            <option value="selected">Selected only</option>
                                            <option value="now-playing">Now playing only</option>
                                        </select>
                                    </div>
                                </div>
                                <div
                                    v-if="!isPlaylistAyahListCollapsed"
                                    class="reader-custom-playlist-list-scroll"
                                    :class="{ 'is-scroll-limited': shouldLimitPlaylistAyahListScroll }">
                                    <article
                                        v-for="item in filteredOrderedCustomPlaylistAyahItems"
                                        :key="item.id"
                                        class="reader-custom-playlist-item"
                                        :class="{
                                            'is-selected': isPlaylistItemSelected(item.id),
                                            'is-now-playing': isCustomPlaylistItemNowPlaying(item),
                                            'is-dragging': playlistDragItemId === String(item.id),
                                            'is-drag-over': playlistDragOverItemId === String(item.id)
                                        }"
                                        draggable="true"
                                        @click="togglePlaylistItemSelection(item.id)"
                                        @dragstart="onPlaylistItemDragStart(item, $event)"
                                        @dragover.prevent="onPlaylistItemDragOver(item, $event)"
                                        @dragleave="onPlaylistItemDragLeave(item, $event)"
                                        @drop.prevent="onPlaylistItemDrop(item, $event)"
                                        @dragend="onPlaylistItemDragEnd">
                                        <div class="reader-custom-playlist-item-select">
                                            <span class="reader-custom-playlist-drag-handle reader-custom-playlist-drag-handle--leading" aria-hidden="true" title="Reorder by dragging">
                                                <i class="bi bi-grip-horizontal"></i>
                                            </span>
                                            <input
                                                type="checkbox"
                                                class="form-check-input reader-custom-playlist-checkbox"
                                                :checked="isPlaylistItemSelected(item.id)"
                                                :aria-label="`Select ${getCustomPlaylistItemMain(item)}`"
                                                @click.stop="togglePlaylistItemSelection(item.id)">
                                        </div>
                                        <div class="reader-custom-playlist-item-text">
                                            <div class="reader-custom-playlist-item-primary">
                                                <div class="reader-custom-playlist-item-latin-wrap">
                                                    <span class="reader-custom-playlist-item-ref">
                                                        {{ item.surahNumber && item.ayahNumber ? `${item.surahNumber}:${item.ayahNumber}` : "Ayah" }}
                                                    </span>
                                                    <span class="reader-custom-playlist-item-title">
                                                        <i v-if="isCustomPlaylistItemNowPlaying(item)" class="bi bi-volume-up-fill reader-custom-playlist-now-playing-icon" aria-hidden="true"></i>
                                                        {{ String(item.description || "").trim() || getCustomPlaylistItemMain(item) }}
                                                    </span>
                                                </div>
                                                <span
                                                    v-if="getCustomPlaylistItemArabicName(item)"
                                                    class="reader-custom-playlist-item-arabic"
                                                    dir="rtl">
                                                    {{ getCustomPlaylistItemArabicName(item) }}
                                                </span>
                                            </div>
                                            <span v-if="getCustomPlaylistItemMeta(item)" class="reader-custom-playlist-item-desc">
                                                {{ getCustomPlaylistItemMeta(item) }}
                                            </span>
                                        </div>
                                        <div class="reader-custom-playlist-item-actions">
                                            <button
                                                type="button"
                                                class="reader-custom-playlist-btn is-play reader-custom-playlist-icon-btn"
                                                @click.stop="playCustomPlaylistItem(item)"
                                                aria-label="Play ayah audio"
                                                title="Play ayah">
                                                <i class="bi bi-play-fill" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </article>
                                    <div
                                        v-if="!filteredOrderedCustomPlaylistAyahItems.length"
                                        class="reader-custom-playlist-empty reader-custom-playlist-empty-filtered">
                                        <p class="mb-0">No ayahs match the current search or filter.</p>
                                    </div>
                                </div>
                                <div v-else class="reader-custom-playlist-list-collapsed-note">
                                    Ayah list is collapsed.
                                </div>
                            </template>

                        </div>
                    </section>

                    <section v-else class="reader-custom-playlist-content reader-custom-playlist-content-empty">
                        <div class="reader-custom-playlist-empty-state">
                            <h4 class="mb-1">No playlist selected</h4>
                            <p class="mb-0">Create a playlist to start saving surahs and ayahs.</p>
                            <button
                                type="button"
                                class="reader-custom-playlist-btn is-add-surah mt-2"
                                @click="openCreatePlaylistModal()">
                                <i class="bi bi-plus-circle me-1" aria-hidden="true"></i>
                                Create first playlist
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <!-- Memorisation Toolbar -->
        <transition name="mem-toolbar-slide">
            <div
                v-if="isMemorisationToolbarVisible"
                class="quran-toolbar-sticky memorisation-toolbar-sticky memorisation-toolbar-active ltr-text mb-4"
                :class="{ 'is-pinned': isToolbarPinned }"
                role="group"
                aria-label="Memorisation tools expanded">
                <div class="quran-toolbar memorisation-toolbar-purple memorisation-toolbar-two-rows">
                    <div class="memorisation-toolbar-row memorisation-toolbar-row-1 memorisation-row-clean-header">
                        <div class="memorisation-toolbar-group memorisation-toolbar-group--header">
                            <button
                                type="button"
                                class="quran-toolbar-btn memorisation-close-action quran-toolbar-close-btn-purple"
                                @click="toggleMemorisationToolbar"
                                title="Exit memorisation focus">
                                <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
                            </button>
                            <div class="memorisation-clean-title-wrap">
                                <span class="quran-toolbar-label quran-toolbar-label-purple"><b>Memorisation Focus</b></span>
                                <small class="memorisation-clean-subtitle">Focus on one ayah, then advance with calm repetition.</small>
                            </div>
                        </div>
                        <div
                            v-if="desktopSurahContext.englishName"
                            class="memorisation-header-context"
                            aria-live="polite">
                            <span class="memorisation-context-pill">
                                {{ desktopSurahContext.number }}. {{ desktopSurahContext.englishName }}
                            </span>
                            <span class="memorisation-context-pill memorisation-context-pill--ayah">
                                Ayah {{ memorisationCurrentAyahNumber }} / {{ totalAyahs || "—" }}
                            </span>
                        </div>
                        <div
                            class="memorisation-header-progress"
                            role="progressbar"
                            aria-label="Memorisation progress in selected range"
                            :aria-valuemin="0"
                            :aria-valuemax="100"
                            :aria-valuenow="memorisationProgressPercent"
                            :aria-valuetext="memorisationProgressLabel">
                            <span
                                class="memorisation-header-progress-fill"
                                :style="{ width: `${memorisationProgressPercent}%` }"></span>
                        </div>
                    </div>

                        <div class="memorisation-toolbar-row memorisation-toolbar-row-2 memorisation-row-clean-core">
                        <div class="memorisation-row-section-heading memorisation-row-section-heading--core">
                            <div class="memorisation-row-section-title">Live Session Controls</div>
                            <p class="memorisation-row-section-subtitle mb-0">These controls affect playback immediately while you recite.</p>
                        </div>

                        <div class="memorisation-core-slot memorisation-core-slot--primary memorisation-core-slot--play">
                            <button
                                type="button"
                                class="btn btn-link memorisation-inline-action memorisation-inline-action--play"
                                :class="{
                                    'is-playing': isAnyAudioPlaying,
                                    'is-attention': !isAnyAudioPlaying
                                }"
                                @click="toggleAudioPlayer(memorisationPlayIndex)"
                                :title="isAnyAudioPlaying ? 'Pause focused ayah audio' : 'Play focused ayah audio'"
                                :aria-label="isAnyAudioPlaying ? 'Pause focused ayah audio' : `Play focused ayah audio, ayah ${memorisationPlayIndex + 1}`">
                                <i class="bi" :class="isAnyAudioPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'" aria-hidden="true"></i>
                                <span>{{ isAnyAudioPlaying ? "Pause Current Ayah" : "Play Current Ayah" }}</span>
                            </button>
                            <small class="memorisation-core-slot-note mb-0">{{ isAnyAudioPlaying ? "Pause to review quietly, then resume when ready." : "Play the currently selected ayah with your active settings." }}</small>
                        </div>

                        <p v-if="isTabletOrMobile" class="memorisation-step-help mb-0">
                            Start with these live controls, then open Session Setup for focus, playback mode, range, and pacing.
                        </p>

                        <div class="memorisation-mobile-sections memorisation-mobile-sections--secondary memorisation-desktop-section-toggles">
                            <button
                                type="button"
                                class="memorisation-mobile-section-toggle"
                                :class="{ 'is-open': isMemorisationAdvancedOpen }"
                                @click="toggleMemorisationAdvanced"
                                :aria-expanded="isMemorisationAdvancedOpen ? 'true' : 'false'"
                                aria-controls="memorisationMobileSessionPanel">
                                <span class="memorisation-mobile-section-toggle-copy">
                                    <span class="memorisation-mobile-section-toggle-label">Session Setup</span>
                                    <span class="memorisation-mobile-section-toggle-desc">Range, reciter, speed, and pacing</span>
                                </span>
                                <i class="bi" :class="isMemorisationAdvancedOpen ? 'bi-chevron-up' : 'bi-chevron-down'" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="memorisation-mobile-section-toggle"
                                :class="{ 'is-open': isMemorisationReadingAidsOpen }"
                                @click="toggleMemorisationReadingAidsDropdown"
                                :aria-expanded="isMemorisationReadingAidsOpen ? 'true' : 'false'"
                                aria-controls="memorisationMobileAidsPanel">
                                <span class="memorisation-mobile-section-toggle-copy">
                                    <span class="memorisation-mobile-section-toggle-label">Progress Tools</span>
                                    <span class="memorisation-mobile-section-toggle-desc">Display helpers, audio aids, and tools</span>
                                </span>
                                <i class="bi" :class="isMemorisationReadingAidsOpen ? 'bi-chevron-up' : 'bi-chevron-down'" aria-hidden="true"></i>
                            </button>
                        </div>

                        <div
                            v-if="isMemorisationAdvancedOpen"
                            class="memorisation-row-section-heading memorisation-row-section-heading--setup">
                            <div class="memorisation-row-section-title">Session Setup</div>
                            <p class="memorisation-row-section-subtitle mb-0">Set focus mode, playback flow, range, reciter, speed, and pacing before your memorisation run starts.</p>
                        </div>

                        <div
                            id="memorisationMobileSessionPanel"
                            v-if="isMemorisationAdvancedOpen"
                            class="memorisation-row2-secondary">
                            <div class="memorisation-feature-row memorisation-feature-row--setup memorisation-session-card memorisation-session-card--mode" role="group" aria-label="Focus and playback setup">
                                <label class="memorisation-switch-control mb-0" :title="isMemorisationMode ? 'Turn off single-ayah focus' : 'Turn on single-ayah focus'">
                                    <span class="memorisation-switch-label">Single ayah focus</span>
                                    <input
                                        type="checkbox"
                                        class="memorisation-switch-input"
                                        :checked="isMemorisationMode"
                                        @change="toggleMemorisationMode"
                                        :aria-label="isMemorisationMode ? 'Turn off single ayah focus' : 'Turn on single ayah focus'">
                                    <span class="memorisation-switch-ui" aria-hidden="true"></span>
                                </label>
                                <label class="memorisation-inline-field mb-0" title="Set playback flow after each ayah">
                                    <span>Playback mode</span>
                                    <select
                                        id="memorisationPlaybackModeSelectInline"
                                        class="form-select quran-toolbar-select"
                                        v-model="playbackMode"
                                        aria-label="Playback flow mode"
                                        title="Auto-advance moves to the next ayah, Repeat loops one ayah, and Manual waits for your next tap.">
                                        <option v-for="option in playbackModeOptions" :key="option.value" :value="option.value">
                                            {{ option.value === "continuous" ? "Auto-advance" : option.value === "repeat" ? "Repeat ayah" : "Manual tap" }}
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div class="memorisation-toolbar-group memorisation-toolbar-group--range memorisation-session-card memorisation-session-card--range">
                                <div class="d-flex align-items-center gap-2 memorisation-range-main">
                                    <span class="quran-toolbar-label d-none d-sm-inline-block" style="color: #064e3b; margin-right: 0;">Range</span>
                                    <div class="d-flex align-items-center gap-1 memorisation-range-inputs">
                                        <input
                                            type="number"
                                            v-model.number="memorisationRangeStart"
                                            class="quran-toolbar-select text-center"
                                            style="width: 55px; padding: 0; background-image: none !important; border-color: rgba(6, 78, 59, 0.2);"
                                            min="1"
                                            :max="totalAyahs || 1"
                                            @change="applyMemorisationRange"
                                            @keyup.enter="applyMemorisationRange"
                                            aria-label="Start ayah number for memorisation range"
                                            title="Start ayah number">
                                        <span class="opacity-50" style="color: #064e3b; font-weight: 900;">-</span>
                                        <input
                                            type="number"
                                            v-model.number="memorisationRangeEnd"
                                            class="quran-toolbar-select text-center"
                                            style="width: 55px; padding: 0; background-image: none !important; border-color: rgba(6, 78, 59, 0.2);"
                                            min="1"
                                            :max="totalAyahs || 1"
                                            @change="applyMemorisationRange"
                                            @keyup.enter="applyMemorisationRange"
                                            :placeholder="totalAyahs"
                                            aria-label="End ayah number for memorisation range"
                                            title="End ayah number">
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    class="btn btn-link memorisation-range-reset-link"
                                    @click="resetMemorisationRange"
                                    title="Use the full surah range">
                                    <i class="bi bi-book-half me-1" aria-hidden="true"></i>
                                    Full surah
                                </button>
                            </div>
                            <div class="memorisation-feature-row memorisation-feature-row--setup memorisation-session-card memorisation-session-card--audio" role="group" aria-label="Audio setup">
                                <label class="memorisation-inline-field mb-0" title="Select reciter for memorisation audio">
                                    <span>Reciter</span>
                                    <select
                                        class="quran-toolbar-select text-start"
                                        v-model="selectedReciter"
                                        aria-label="Select reciter for memorisation mode">
                                        <option v-for="reciter in recitersSorted" :key="`memorisation-reciter-${reciter.identifier}`" :value="reciter.identifier">
                                            {{ reciter.englishName }}
                                        </option>
                                    </select>
                                </label>
                                <label class="memorisation-inline-field mb-0" title="Select playback speed for memorisation audio">
                                    <span>Speed</span>
                                    <select
                                        class="quran-toolbar-select text-center"
                                        v-model.number="playbackSpeed"
                                        @change="setPlaybackSpeed(playbackSpeed)"
                                        aria-label="Playback speed in memorisation mode">
                                        <option v-for="speed in playbackSpeeds" :key="`memorisation-speed-${speed}`" :value="speed">
                                            {{ speed }}x
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div
                                class="memorisation-feature-row memorisation-feature-row--controls memorisation-session-card memorisation-session-card--pacing"
                                role="group"
                                aria-label="Pacing controls">
                                <template v-if="!isTabletOrMobile">
                                    <label class="memorisation-inline-field mb-0" title="Delay before next ayah">
                                        <span>Delay (sec)</span>
                                        <input type="number" v-model.number="memorisationVerseDelay" class="quran-toolbar-select text-center" min="0" max="60" @change="notifyAyahDelayChange" aria-label="Ayah delay in seconds">
                                    </label>
                                    <label class="memorisation-inline-field mb-0" title="Repetitions per ayah">
                                        <span>Reps</span>
                                        <input type="number" v-model.number="memorisationRepetitionCount" class="quran-toolbar-select text-center" min="1" max="99" aria-label="Repetitions per ayah">
                                    </label>
                                </template>
                                <details v-else class="memorisation-mobile-pacing">
                                    <summary>Pacing</summary>
                                    <div class="memorisation-mobile-pacing-fields">
                                        <label class="memorisation-inline-field mb-0" title="Delay before next ayah">
                                            <span>Delay (sec)</span>
                                            <input type="number" v-model.number="memorisationVerseDelay" class="quran-toolbar-select text-center" min="0" max="60" @change="notifyAyahDelayChange" aria-label="Ayah delay in seconds">
                                        </label>
                                        <label class="memorisation-inline-field mb-0" title="Repetitions per ayah">
                                            <span>Reps</span>
                                            <input type="number" v-model.number="memorisationRepetitionCount" class="quran-toolbar-select text-center" min="1" max="99" aria-label="Repetitions per ayah">
                                        </label>
                                    </div>
                                </details>
                                <span
                                    v-if="isMemorisationRepetitionActive"
                                    class="quran-toolbar-label memorisation-repetition-inline"
                                    aria-live="polite">
                                    Repetition {{ memorisationRepetitionCurrent }} / {{ memorisationRepetitionCount }}
                                </span>
                            </div>
                        </div>

                    </div>

                    <div
                        id="memorisationMobileAidsPanel"
                        v-if="isMemorisationReadingAidsOpen"
                        class="memorisation-toolbar-row memorisation-toolbar-row-3 memorisation-row-clean-settings">
                            <div
                                id="memorisationAdvancedSettings"
                                class="memorisation-toolbar-row memorisation-toolbar-row-advanced"
                                role="group"
                                aria-label="Session setup and pacing settings">
                                <div class="memorisation-row-title">Progress Tools</div>
                                <p class="memorisation-row-subtitle mb-0">Choose what appears while reciting, adjust supporting audio, and manage your memorisation checkpoint.</p>
                            <div class="memorisation-advanced-reading">
                                <section class="memorisation-aids-section" aria-label="Display options">
                                    <p class="memorisation-aids-section-subtitle mb-0">Show only the visual helpers that improve your focus.</p>
                                    <div class="memorisation-feature-row memorisation-feature-row--feature-panel" role="group" aria-label="Display options">
                                        <button type="button" class="memorisation-icon-text-action" :class="{ 'is-enabled': isTranslationVisible }" @click="isTranslationVisible = !isTranslationVisible" :aria-pressed="isTranslationVisible ? 'true' : 'false'" title="Toggle translation">
                                            <i class="bi bi-chat-quote-fill" aria-hidden="true"></i>
                                            <span class="memorisation-icon-text-label">Translation</span>
                                            <span class="memorisation-icon-text-state">{{ isTranslationVisible ? "On" : "Off" }}</span>
                                        </button>
                                        <button type="button" class="memorisation-icon-text-action" :class="{ 'is-enabled': showTajweed }" @click="showTajweed = !showTajweed" :aria-pressed="showTajweed ? 'true' : 'false'" title="Toggle tajweed guidance">
                                            <i class="bi bi-palette-fill" aria-hidden="true"></i>
                                            <span class="memorisation-icon-text-label">Tajweed</span>
                                            <span class="memorisation-icon-text-state">{{ showTajweed ? "On" : "Off" }}</span>
                                        </button>
                                        <button type="button" class="memorisation-icon-text-action" :class="{ 'is-enabled': showRealtimeHighlighting }" @click="showRealtimeHighlighting = !showRealtimeHighlighting" :aria-pressed="showRealtimeHighlighting ? 'true' : 'false'" title="Toggle word highlight">
                                            <i class="bi bi-highlighter" aria-hidden="true"></i>
                                            <span class="memorisation-icon-text-label">Word Highlight</span>
                                            <span class="memorisation-icon-text-state">{{ showRealtimeHighlighting ? "On" : "Off" }}</span>
                                        </button>
                                        <button type="button" class="memorisation-icon-text-action" :class="{ 'is-enabled': showWordTranslation }" @click="showWordTranslation = !showWordTranslation" :aria-pressed="showWordTranslation ? 'true' : 'false'" title="Toggle word meanings">
                                            <i class="bi bi-translate" aria-hidden="true"></i>
                                            <span class="memorisation-icon-text-label">Word Meanings</span>
                                            <span class="memorisation-icon-text-state">{{ showWordTranslation ? "On" : "Off" }}</span>
                                        </button>
                                    </div>
                                </section>
                                <section class="memorisation-aids-section" aria-label="Audio options">
                                    <p class="memorisation-aids-section-subtitle mb-0">Fine-tune supporting audio features for memorisation.</p>
                                    <div class="memorisation-feature-row memorisation-feature-row--feature-panel" role="group" aria-label="Audio options">
                                        <button type="button" class="memorisation-icon-text-action" :class="{ 'is-enabled': showWordTranslationTooltip }" @click="toggleWordAudioMode" :aria-pressed="showWordTranslationTooltip ? 'true' : 'false'" title="Toggle word tap audio">
                                            <i class="bi bi-volume-up-fill" aria-hidden="true"></i>
                                            <span class="memorisation-icon-text-label">Word Tap Audio</span>
                                            <span class="memorisation-icon-text-state">{{ showWordTranslationTooltip ? "On" : "Off" }}</span>
                                        </button>
                                        <button type="button" class="memorisation-icon-text-action" :class="{ 'is-enabled': isAudioPlayerVisible }" @click="toggleAudioPlayerVisibility" :aria-pressed="isAudioPlayerVisible ? 'true' : 'false'" title="Turn bottom audio player on or off">
                                            <i class="bi bi-music-player-fill" aria-hidden="true"></i>
                                            <span class="memorisation-icon-text-label">Audio Player</span>
                                            <span class="memorisation-icon-text-state">{{ isAudioPlayerVisible ? "On" : "Off" }}</span>
                                        </button>
                                    </div>
                                </section>
                                <!-- <section class="memorisation-aids-section memorisation-aids-section--session" aria-label="Session tools">
                                    <p class="memorisation-aids-section-subtitle mb-0">Track your plan and save your exact ayah checkpoint.</p>
                                    <div class="memorisation-feature-row memorisation-feature-row--feature-panel" role="group" aria-label="Session tools">
                                        <button type="button" class="memorisation-icon-text-action memorisation-icon-text-action--hifdhplan is-enabled" @click="openHifdhPlanModalGuarded" title="Open Hifdh review plan">
                                            <i class="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
                                            <span class="memorisation-icon-text-label">Hifdh Plan</span>
                                            <span class="memorisation-icon-text-state">{{ todayHifdhPlanItemsOrdered.length }} due</span>
                                        </button>
                                        <button
                                            type="button"
                                            class="memorisation-icon-text-action"
                                            :class="{ 'is-enabled': isMemorisationCurrentAyahSaved }"
                                            :disabled="!memorisationCurrentAyah"
                                            @click="toggleCurrentMemorisationBookmark"
                                            :title="isMemorisationCurrentAyahSaved ? 'Remove bookmark from current ayah' : 'Save current ayah as a bookmark'">
                                            <i class="bi" :class="isMemorisationCurrentAyahSaved ? 'bi-bookmark-fill' : 'bi-bookmark'" aria-hidden="true"></i>
                                            <span class="memorisation-icon-text-label">Bookmark Ayah</span>
                                            <span class="memorisation-icon-text-state">{{ isMemorisationCurrentAyahSaved ? "Bookmarked" : "Save" }}</span>
                                        </button>
                                    </div>
                                </section> -->
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
        </transition>

        <teleport to="body">
            <div class="modal fade hifdh-plan-modal" id="hifdhPlanModal" tabindex="-1" aria-labelledby="hifdhPlanModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div>
                                <h5 class="modal-title" id="hifdhPlanModalLabel">Today's Hifdh Plan</h5>
                                <p class="hifdh-plan-modal-subtitle mb-0">A gentle daily ritual to preserve what you memorise and return with consistency.</p>
                                <span v-if="isHifdhDemoModeActive" class="memorisation-demo-badge">Demo ON (dates overridden)</span>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="hifdh-modal-summary">
                                <span class="hifdh-summary-pill">Due Today: {{ todayHifdhPlanItemsOrdered.length }}</span>
                                <p class="hifdh-streak-micro mb-0">
                                    <i class="bi" :class="hifdhConsistencyStreakDays > 0 ? 'bi-fire' : 'bi-heart'" aria-hidden="true"></i>
                                    <span v-if="hifdhConsistencyStreakDays > 0">{{ hifdhConsistencyStreakDays }} days consistent — mashaAllah!</span>
                                    <span v-else>{{ hifdhConsistencyNudge }}</span>
                                </p>
                            </div>
                            <p class="hifdh-next-step-inline mb-0">
                                <i class="bi bi-arrow-right-circle" aria-hidden="true"></i>
                                <span>{{ nextHifdhDueSummary }}</span>
                            </p>
                            <div class="hifdh-history-strip" role="status" aria-live="polite">
                                <span class="hifdh-history-title">Last {{ hifdhRecentPerformance.windowDays }} days</span>
                                <span class="hifdh-history-chip">
                                    <i class="bi bi-check2-circle" aria-hidden="true"></i>
                                    {{ hifdhRecentPerformance.completedCount }}/{{ hifdhRecentPerformance.dueCount }} done
                                </span>
                                <span class="hifdh-history-chip">
                                    <i class="bi bi-graph-up-arrow" aria-hidden="true"></i>
                                    {{ hifdhRecentPerformance.completionRate }}% completion
                                </span>
                                <span class="hifdh-history-chip">
                                    Strong {{ hifdhRecentPerformance.feedbackCounts.strong }}
                                </span>
                                <span class="hifdh-history-chip">
                                    Minor {{ hifdhRecentPerformance.feedbackCounts.minor }}
                                </span>
                                <span class="hifdh-history-chip">
                                    Weak {{ hifdhRecentPerformance.feedbackCounts.weak }}
                                </span>
                            </div>
                            <section class="hifdh-analytics-panel" aria-label="Hifdh analytics and progress trackers">
                                <article class="hifdh-analytics-card">
                                    <div class="hifdh-analytics-head">
                                        <h6 class="hifdh-performance-title mb-0">Current surah progress</h6>
                                        <small>{{ hifdhCoverageStats.surahReviewedCount }}/{{ hifdhCoverageStats.surahTotalAyahs || hifdhCoverageStats.surahPlannedCount }} reviewed</small>
                                    </div>
                                    <div class="hifdh-analytics-track" role="img" :aria-label="`${hifdhCoverageStats.surahPercent}% completed in current surah`">
                                        <span class="hifdh-analytics-track-fill" :style="{ width: `${hifdhCoverageStats.surahPercent}%` }"></span>
                                    </div>
                                    <div class="hifdh-analytics-meta">
                                        <span>{{ hifdhCoverageStats.surahRemainingCount }} ayahs remain in this surah</span>
                                        <strong>{{ hifdhCoverageStats.surahPercent }}%</strong>
                                    </div>
                                </article>
                                <article class="hifdh-analytics-card">
                                    <div class="hifdh-analytics-head">
                                        <h6 class="hifdh-performance-title mb-0">Overall Quran progress</h6>
                                        <small>{{ hifdhCoverageStats.overallReviewedCount }}/{{ hifdhCoverageStats.quranTotalAyahs }} reviewed</small>
                                    </div>
                                    <div class="hifdh-analytics-track" role="img" :aria-label="`${hifdhCoverageStats.overallPercent}% completed in overall Quran tracker`">
                                        <span class="hifdh-analytics-track-fill hifdh-analytics-track-fill-overall" :style="{ width: `${hifdhCoverageStats.overallPercent}%` }"></span>
                                    </div>
                                    <div class="hifdh-analytics-meta">
                                        <span>{{ hifdhCoverageStats.overallRemainingCount }} ayahs remain overall</span>
                                        <strong>{{ hifdhCoverageStats.overallPercent }}%</strong>
                                    </div>
                                </article>
                            </section>
                            <section class="hifdh-performance-dashboard" aria-label="Performance dashboard">
                                <div class="hifdh-performance-card hifdh-performance-card--tracker">
                                    <div class="hifdh-performance-card-head">
                                        <h6 class="hifdh-performance-title mb-0">7-day tracker</h6>
                                        <small>{{ hifdhRecentPerformance.completedCount }}/{{ hifdhRecentPerformance.dueCount }} done</small>
                                    </div>
                                    <div class="hifdh-tracker-grid" role="list" aria-label="7 day hifdh progress tracker">
                                        <article
                                            v-for="day in hifdhTrackerCards"
                                            :key="day.key"
                                            class="hifdh-tracker-day-card"
                                            :class="{
                                                'is-today': day.isToday,
                                                'is-complete': day.isComplete,
                                                'is-empty': day.isEmpty
                                            }"
                                            role="listitem">
                                            <div class="hifdh-tracker-day-head">
                                                <span class="hifdh-tracker-day-label">{{ day.label }}</span>
                                                <span class="hifdh-tracker-day-date">{{ day.shortDate }}</span>
                                            </div>
                                            <div
                                                class="hifdh-tracker-day-progress"
                                                role="img"
                                                :aria-label="`${day.label}: ${day.completedCount}/${day.dueCount} completed`">
                                                <span
                                                    class="hifdh-tracker-day-progress-fill"
                                                    :style="{ width: `${day.progressPercent}%` }"></span>
                                            </div>
                                            <div class="hifdh-tracker-day-meta">
                                                <strong>{{ day.completedCount }}/{{ day.dueCount }}</strong>
                                                <span>{{ day.statusLabel }}</span>
                                            </div>
                                        </article>
                                    </div>
                                    <p class="hifdh-performance-chart-help mb-0">Live over the last 7 days. Aim for one completed segment daily to keep retention strong.</p>
                                </div>
                                <div class="hifdh-performance-card">
                                    <div class="hifdh-performance-card-head">
                                        <h6 class="hifdh-performance-title mb-0">Weak spots</h6>
                                        <small>Needs extra review</small>
                                    </div>
                                    <div v-if="hifdhWeakSpots.length" class="hifdh-weak-list">
                                        <div v-for="spot in hifdhWeakSpots" :key="spot.label" class="hifdh-weak-item">
                                            <span class="hifdh-weak-item-main">{{ spot.label }}</span>
                                            <span class="hifdh-weak-item-meta">{{ spot.weakCount }} weak · {{ spot.lastSeenLabel }}</span>
                                        </div>
                                    </div>
                                    <p v-else class="hifdh-weak-empty mb-0">No weak segments logged yet. Keep going.</p>
                                </div>
                                <div class="hifdh-performance-card">
                                    <div class="hifdh-performance-card-head">
                                        <h6 class="hifdh-performance-title mb-0">Streak tracking</h6>
                                        <small>Consistency matters</small>
                                    </div>
                                    <div class="hifdh-streak-grid">
                                        <div class="hifdh-streak-stat">
                                            <span>Current</span>
                                            <strong>{{ hifdhStreakTracking.currentStreak }}d</strong>
                                        </div>
                                        <div class="hifdh-streak-stat">
                                            <span>Best</span>
                                            <strong>{{ hifdhStreakTracking.bestStreak }}d</strong>
                                        </div>
                                        <div class="hifdh-streak-stat">
                                            <span>Active</span>
                                            <strong>{{ hifdhStreakTracking.activeDays }}/{{ hifdhStreakTracking.windowDays }}</strong>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="hifdh-onboarding-invite" aria-label="Hifdh onboarding invitation">
                                <div class="hifdh-onboarding-ring-wrap">
                                    <div
                                        class="hifdh-onboarding-ring"
                                        :style="{ '--hifdh-progress': `${hifdhCompletionPercent}%` }"
                                        role="img"
                                        :aria-label="`${hifdhCompletionPercent}% completed`">
                                        <span>{{ hifdhCompletionPercent }}%</span>
                                    </div>
                                </div>
                                <div class="hifdh-onboarding-invite-content">
                                    <p class="hifdh-onboarding-invite-title mb-1">What will you memorise today?</p>
                                    <p class="hifdh-onboarding-invite-copy mb-2">Start with one short range, then keep your rhythm by reviewing what is due.</p>
                                    <div class="hifdh-onboarding-suggestions">
                                        <button
                                            type="button"
                                            class="quran-toolbar-btn quran-toolbar-btn-sm"
                                            @click="quickStartAlFatihaToday"
                                            title="Start with Surah Al-Fatiha"
                                            data-hifdh-tooltip="true">
                                            <i class="bi bi-bookmark-heart" aria-hidden="true"></i>
                                            <span class="quran-toolbar-btn-text">Start with Al-Fatiha</span>
                                        </button>
                                        <button
                                            v-if="continueProgress"
                                            type="button"
                                            class="quran-toolbar-btn quran-toolbar-btn-sm"
                                            @click="resumeContinueProgress({ autoplay: continueProgress?.mode === 'listening' })"
                                            title="Continue from your last read position"
                                            data-hifdh-tooltip="true">
                                            <i class="bi bi-arrow-repeat" aria-hidden="true"></i>
                                            <span class="quran-toolbar-btn-text">Continue where I left off</span>
                                        </button>
                                    </div>
                                </div>
                            </section>

                            <div class="memorisation-simple-controls hifdh-control-panel">
                                <div class="hifdh-control-panel-title">Begin Today's Ritual</div>
                                <div class="memorisation-review-add-controls hifdh-control-primary">
                                    <input type="number" class="quran-toolbar-select text-center" v-model.number="hifdhNewRangeStart" min="1" :max="totalAyahs || 1" aria-label="Start ayah" title="Start ayah number for the memorisation range" data-hifdh-tooltip="true">
                                    <span class="opacity-50">-</span>
                                    <input type="number" class="quran-toolbar-select text-center" v-model.number="hifdhNewRangeEnd" min="1" :max="totalAyahs || 1" aria-label="End ayah" title="End ayah number for the memorisation range" data-hifdh-tooltip="true">
                                    <button type="button" class="quran-toolbar-btn quran-toolbar-btn-sm hifdh-add-start-btn" @click="addRangeAndStartHifdhSession" title="Add this range and immediately start today's guided session" data-hifdh-tooltip="true">
                                        <i class="bi bi-play-circle-fill" aria-hidden="true"></i>
                                        <span class="quran-toolbar-btn-text">Add &amp; Start</span>
                                    </button>
                                    <button type="button" class="quran-toolbar-btn quran-toolbar-btn-sm" @click="quickStartSurahTwoDemoRange" title="Load Surah 2 and queue a demo range instantly" data-hifdh-tooltip="true">
                                        <i class="bi bi-stars" aria-hidden="true"></i>
                                        <span class="quran-toolbar-btn-text">Quick Demo</span>
                                    </button>
                                </div>
                                <details class="hifdh-onboarding-disclosure hifdh-secondary-disclosure">
                                    <summary
                                        class="hifdh-onboarding-summary"
                                        title="Optional demo and reset tools"
                                        data-hifdh-tooltip="true">
                                        <span class="hifdh-onboarding-summary-main">
                                            <i class="bi bi-sliders" aria-hidden="true"></i>
                                            <span class="hifdh-onboarding-title">Advanced actions</span>
                                        </span>
                                        <span class="hifdh-onboarding-summary-meta">
                                            <span class="hifdh-onboarding-meta-closed">Show optional tools</span>
                                            <span class="hifdh-onboarding-meta-open">Hide optional tools</span>
                                            <i class="bi bi-chevron-down hifdh-onboarding-summary-caret" aria-hidden="true"></i>
                                        </span>
                                    </summary>
                                    <div class="hifdh-onboarding-panel hifdh-secondary-panel">
                                        <div class="memorisation-review-add-controls hifdh-control-secondary">
                                            <button type="button" class="quran-toolbar-btn quran-toolbar-btn-sm" :disabled="!canRunHifdhDemo" @click="markAllPendingHifdhDueToday" title="Bring future pending items into today for demo testing" data-hifdh-tooltip="true">
                                                <i class="bi bi-lightning-charge-fill" aria-hidden="true"></i>
                                                <span class="quran-toolbar-btn-text">Due Now</span>
                                            </button>
                                            <button type="button" class="quran-toolbar-btn quran-toolbar-btn-sm" @click="isHifdhResetConfirmVisible = !isHifdhResetConfirmVisible" title="Clear all queued ranges and restart from scratch" data-hifdh-tooltip="true">
                                                <i class="bi bi-trash3" aria-hidden="true"></i>
                                                <span class="quran-toolbar-btn-text">Reset Plan</span>
                                            </button>
                                        </div>
                                        <div v-if="isHifdhResetConfirmVisible" class="hifdh-reset-confirm mb-0" role="alert">
                                            <p class="mb-2">Reset Hifdh plan? This removes all queued ranges and review progress.</p>
                                            <div class="d-flex gap-2 flex-wrap">
                                                <button type="button" class="btn btn-sm btn-outline-secondary" @click="isHifdhResetConfirmVisible = false">Cancel</button>
                                                <button type="button" class="btn btn-sm btn-danger" @click="confirmResetHifdhPlan">Reset plan</button>
                                            </div>
                                        </div>
                                        <small class="memorisation-simple-help mb-0">
                                            Optional testing shortcuts for demo runs and fast plan cleanup.
                                        </small>
                                    </div>
                                </details>
                                <small class="memorisation-simple-help">
                                    Start with one range and continue calmly. Keep advanced tools for occasional adjustments.
                                </small>
                            </div>

                            <div class="memorisation-simple-list">
                                <h6 class="hifdh-list-title mb-0">Due Segments ({{ todayHifdhPlanItemsOrdered.length }})</h6>
                                <small class="memorisation-simple-help">Tap <strong>Open</strong> to jump to the segment and close this modal.</small>
                                <div v-if="!hasTodayHifdhPlan" class="hifdh-empty-state">
                                    <i class="bi bi-calendar2-check" aria-hidden="true"></i>
                                    <div class="hifdh-empty-state-content">
                                        <p class="memorisation-plan-empty mb-1">No segments due right now.</p>
                                        <p class="memorisation-plan-empty-note mb-0">Try a guided first step to start momentum.</p>
                                        <button
                                            type="button"
                                            class="quran-toolbar-btn quran-toolbar-btn-sm hifdh-empty-state-cta"
                                            @click="quickStartAlFatihaToday"
                                            title="Jump to Surah Al-Fatiha and start memorising today"
                                            data-hifdh-tooltip="true">
                                            <i class="bi bi-lightning-charge-fill" aria-hidden="true"></i>
                                            <span class="quran-toolbar-btn-text">Try memorising Al-Fatiha today</span>
                                        </button>
                                    </div>
                                </div>
                                <button
                                    v-for="item in todayHifdhPlanItemsOrdered"
                                    :key="item.id"
                                    type="button"
                                    class="memorisation-plan-item"
                                    :class="{ 'is-active': hifdhActiveItemId === item.id }"
                                    @click="openHifdhPlanItemAndCloseModal(item)">
                                    <span class="hifdh-item-main">
                                        <span class="memorisation-plan-item-title">{{ hifdhEntrySummary(item) }}</span>
                                        <span class="memorisation-plan-item-meta">
                                            {{ hifdhCategoryTitle(classifyHifdhEntry(item)) }} • {{ hifdhCheckpointLabel(item) }} • {{ formatDateKey(item.scheduledDate) }}
                                        </span>
                                    </span>
                                    <span class="hifdh-item-open">Open</span>
                                </button>
                            </div>

                            <div
                                v-if="hifdhSessionStarted && activeHifdhSessionItem"
                                class="memorisation-session-card"
                                role="group"
                                aria-label="Current hifdh review segment">
                                <p class="memorisation-session-heading mb-1">
                                    Current recitation: {{ hifdhEntrySummary(activeHifdhSessionItem) }}
                                </p>
                                <p class="memorisation-session-meta mb-2">
                                    {{ hifdhCheckpointLabel(activeHifdhSessionItem) }} · Due {{ formatDateKey(activeHifdhSessionItem.scheduledDate) }}
                                </p>
                                <div class="memorisation-session-actions">
                                    <button type="button" class="quran-toolbar-btn quran-toolbar-btn-sm" @click="openHifdhPlanItemAndCloseModal(activeHifdhSessionItem)">
                                        <i class="bi bi-eye-fill" aria-hidden="true"></i>
                                        <span class="quran-toolbar-btn-text">Open Segment</span>
                                    </button>
                                    <button
                                        v-for="choice in hifdhFeedbackChoices"
                                        :key="choice.value"
                                        type="button"
                                        class="quran-toolbar-btn quran-toolbar-btn-sm"
                                        @click="completeActiveHifdhItem(choice.value)">
                                        {{ choice.label }}
                                    </button>
                                </div>
                            </div>
                            <p
                                v-else-if="hifdhSessionStarted && !activeHifdhSessionItem"
                                class="memorisation-session-done mb-0">
                                Ritual complete for today. {{ nextHifdhDueSummary }}
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>


        <div
            v-if="hasPinnedAyahs && isPinnedSectionHidden && !isMobile && (isTabletOrMobile || !showDesktopToolbar)"
            class="pinned-ayahs-restore ltr-text reading-fullscreen-chrome">
            <button
                type="button"
                class="pinned-ayahs-icon-btn"
                @click="showPinnedSection"
                aria-label="Show pinned favourite ayat"
                title="Show pinned favourite ayat">
                <i class="bi bi-pin-angle-fill" aria-hidden="true"></i>
            </button>
        </div>
        <section
            v-if="hasPinnedAyahs && !isPinnedSectionHidden"
            class="pinned-ayahs-section ltr-text"
            :class="{ 'is-collapsed': isPinnedSectionCollapsed }"
            role="region"
            aria-label="Pinned favourite ayahs">
            <div class="pinned-ayahs-header">
                <div>
                    <h2 class="pinned-ayahs-title mb-1">Pinned favourite ayat</h2>
                    <p class="pinned-ayahs-description mb-0">
                        Quick access to the verses you marked for reflection.
                    </p>
                </div>
                <div class="pinned-ayahs-header-actions">
                    <button
                        type="button"
                        class="pinned-ayahs-icon-btn"
                        @click="togglePinnedSectionCollapsed"
                        :aria-label="isPinnedSectionCollapsed
                            ? 'Expand pinned section'
                            : 'Collapse pinned section'"
                        :title="isPinnedSectionCollapsed
                            ? 'Expand pinned section'
                            : 'Collapse pinned section'">
                        <i
                            class="bi"
                            :class="isPinnedSectionCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'"
                            aria-hidden="true"></i>
                    </button>
                    <button
                        type="button"
                        class="pinned-ayahs-icon-btn pinned-ayahs-icon-btn-close"
                        @click="hidePinnedSection"
                        aria-label="Hide pinned section"
                        title="Hide pinned section">
                        <i class="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <div
                v-show="!isPinnedSectionCollapsed"
                class="pinned-ayahs-scroll"
                role="region"
                aria-label="Pinned ayat horizontal list">
                <div class="pinned-ayahs-list" role="list">
                    <article
                        v-for="pinned in pinnedAyahsList"
                        :key="pinned.key"
                        class="pinned-ayah-item"
                        role="listitem">
                        <button
                            type="button"
                            class="pinned-ayah-open"
                            @click="openPinnedAyah(pinned)"
                            :aria-label="`Open pinned ayah ${pinned.surahNumber}:${pinned.ayahNumber}`">
                            <span class="pinned-ayah-ref">
                                <i class="bi bi-pin-angle-fill" aria-hidden="true"></i>
                                {{ pinned.surahNumber }}:{{ pinned.ayahNumber }}
                                <span class="pinned-ayah-name">· {{ getPinnedSurahName(pinned) }}</span>
                            </span>
                            <p class="pinned-ayah-preview mb-0">{{ getPinnedAyahPreview(pinned) }}</p>
                        </button>
                        <button
                            type="button"
                            class="pinned-ayah-remove"
                            @click.stop="removePinnedAyahByKey(pinned.key)"
                            aria-label="Remove pinned ayah"
                            title="Remove pin">
                            <i class="bi bi-x-lg" aria-hidden="true"></i>
                        </button>
                    </article>
                </div>
            </div>
        </section>
        <div
            v-if="showCreatePlaylistModal"
            class="playlist-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Create playlist"
            @click.self="closeCreatePlaylistModal">
            <div class="playlist-modal-card ltr-text" @click.stop>
                <div class="playlist-modal-header">
                    <div>
                        <h5 class="mb-1">Create Playlist</h5>
                        <p class="mb-0 text-muted">Title and description can be updated later.</p>
                    </div>
                    <button
                        type="button"
                        class="reader-custom-playlist-close"
                        @click="closeCreatePlaylistModal"
                        aria-label="Close create playlist modal">
                        <i class="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="reader-custom-playlist-meta">
                    <div class="reader-custom-playlist-field">
                        <label class="reader-custom-playlist-field-label">Title</label>
                        <input
                            v-model="createPlaylistName"
                            type="text"
                            class="form-control reader-custom-playlist-input"
                            placeholder="Playlist title">
                    </div>
                    <div class="reader-custom-playlist-field">
                        <label class="reader-custom-playlist-field-label">Description</label>
                        <input
                            v-model="createPlaylistDescription"
                            type="text"
                            class="form-control reader-custom-playlist-input"
                            placeholder="Playlist description">
                    </div>
                    <div class="reader-custom-playlist-field reader-custom-playlist-field-save">
                        <label class="reader-custom-playlist-field-label visually-hidden">Create</label>
                        <button
                            type="button"
                            class="reader-custom-playlist-btn is-play reader-custom-playlist-save-btn"
                            @click="createPlaylistFromModal">
                            <i class="bi bi-plus-circle me-1" aria-hidden="true"></i>
                            <span>Create playlist</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div v-show="showNextStep" class="next-step-wrapper">
            <div class="mx-auto mb-4 next-step-card">
                <button v-if="canMinimizeNextStep" type="button" :title="isNextStepMinimized ? 'Restore' : 'Minimize'" :aria-label="isNextStepMinimized
                    ? 'Restore next step'
                    : 'Minimize next step'
                    " @click="toggleNextStepMinimized" class="next-step-toggle">
                    <i class="fas" :class="isNextStepMinimized
                        ? 'fa-expand-alt'
                        : 'fa-compress-alt'
                        " aria-hidden="true"></i>
                </button>
                <div class="d-flex align-items-start gap-3 text-start">
                    <div class="flex-shrink-0 mt-1">
                        <div class="next-step-icon-circle">
                            <i class="fas fa-quran"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <p class="mb-2 fw-semibold text-uppercase next-step-eyebrow">
                            NEXT STEP
                        </p>
                        <div v-show="isNextStepMinimized" class="mb-2 next-step-teaser">
                            <a href="/history" class="fw-semibold text-decoration-none next-step-link">
                                Explore the Seerah timeline
                            </a>
                            <i class="fas fa-arrow-up-right-from-square ms-1 next-step-link-icon"></i>
                        </div>
                        <p v-show="!isNextStepMinimized" class="mb-3 next-step-text">
                            Learning how the Qur’an was preserved is a beautiful beginning. When you’re ready, gently
                            continue with the life of the Messenger who lived its message. Walk through a simple,
                            welcoming
                            <a href="/mission" class="fw-semibold text-decoration-none next-step-link">
                                Seerah timeline
                            </a>
                            to see the journey unfold.
                        </p>
                        <a v-show="!isNextStepMinimized" href="/mission"
                            class="btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta">
                            Explore Seerah
                            <i class="fas fa-arrow-up-right-from-square ms-2"></i>
                        </a>
                    </div>
                    
                </div>
            </div>
        </div> -->
        <div class="surah-layout">
            <div class="sticky-dropdown" ref="stickyDropdown" :class="{ collapsed: !isVisible }">
                <div class="filter-header">
                    <div class="filter-actions"></div>
                </div>
                <div class="sidebar-toggle mt-3 mb-2 px-3">
                    <button type="button" class="btn btn-sm btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2" 
                        @click="toggleSidebar"
                        :aria-expanded="!sidebarCollapsed"
                        :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
                        <i class="bi" :class="sidebarCollapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'"></i>
                        <span v-if="!sidebarCollapsed">Collapse Custom Sidebar</span>
                    </button>
                </div>
                <div id="surat-filters" class="row g-3" v-show="isVisible && !sidebarCollapsed">
                    <div class="col-12 col-md-12 filter-item surah-list p-0">
                         <!-- Dark Sidebar Content -->
                    <div class="sidebar-dark-content d-flex flex-column h-100">
                        
                        <!-- Sidebar Header: Tabs & Search -->
                            <div class="sidebar-header pt-3 px-3 pb-2 sidebar-header-sticky">
                                <!-- Navigation Tabs -->
                                <div class="sidebar-tabs d-flex gap-2 mb-3 align-items-center">
                                    <button class="tab-btn flex-fill" 
                                        :class="{ active: activeSidebarTab === 'surah' }"
                                        @click="setActiveSidebarTab('surah')">Surah</button>
                                    <!-- <button class="tab-btn flex-fill" 
                                        :class="{ active: activeSidebarTab === 'verse' }"
                                        @click="setActiveSidebarTab('verse')">Verse</button>
                                    <button class="tab-btn flex-fill" 
                                        :class="{ active: activeSidebarTab === 'juz' }"
                                        @click="setActiveSidebarTab('juz')">Juz</button> -->
                                </div>

                                

                                
                                <!-- Search Input -->
                                <div class="search-container">
                                    <input type="search" class="form-control sidebar-search-input" 
                                        v-model="sidebarSearchQuery"
                                        :placeholder="`Search ${activeSidebarTab}...`"
                                        aria-label="Search content" />
                                </div>
                            </div>

                            <!-- Lists Container -->
                            <div
                                class="sidebar-list-container flex-grow-1 px-0 pb-5"
                                @scroll.passive="handleSidebarListScroll">
                                
                                <!-- Surah List -->
                                <div v-if="activeSidebarTab === 'surah'" class="list-group list-group-flush">
                                    <div class="sidebar-item" v-for="surah in filteredSurahs_sidebar" :key="surah.number"
                                        :class="{ active: String(selectedSurah) === String(surah.number) }"
                                        role="button" @click="selectSurahFromSidebar(surah.number)">
                                        <div class="d-flex align-items-center w-100">
                                            <span class="item-number me-3">{{ surah.number }}</span>
                                            <div class="flex-grow-1 text-start">
                                                <div class="sidebar-surah-title-row">
                                                    <button
                                                        v-if="shouldShowContinueCardForSurah(surah)"
                                                        type="button"
                                                        class="continue-progress-chip"
                                                        @click.stop="resumeContinueProgress()"
                                                        :aria-label="`Continue reading or listening from Surah ${continueProgress?.surahNumber}, Ayah ${continueProgress?.ayahNumber}`"
                                                        :title="`Continue reading/listening from Surah ${continueProgress?.surahNumber}, Ayah ${continueProgress?.ayahNumber}`">
                                                        <i class="bi bi-play-circle-fill" aria-hidden="true"></i>
                                                        <span>
                                                            Continue {{ continueProgress?.mode === "listening" ? "listening" : "reading" }} · Ayah {{ continueProgress?.ayahNumber }}
                                                        </span>
                                                    </button>
                                                    <div class="item-title-en">{{ surah.englishName }}</div>
                                                </div>
                                                <div class="sidebar-item-meta">
                                                    <span v-if="surah.numberOfAyahs || surah.number_ayahs">
                                                        {{ surah.numberOfAyahs || surah.number_ayahs }} ayahs
                                                    </span>
                                                    <span v-if="surah.revelationType">
                                                        · Origin: {{ surah.revelationType }}
                                                    </span>
                                                </div>
                                                <div class="sidebar-item-extra" v-if="surah.englishNameTranslation">
                                                    <span>{{ surah.englishNameTranslation }}</span>
                                                    <span v-if="surah.numberOfAyahs || surah.number_ayahs">
                                                        · {{ surah.numberOfAyahs || surah.number_ayahs }} total verses
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="surah-info-group ms-auto">
                                                <div class="item-title-ar text-end">
                                                    {{ surah.name }}
                                                </div>
                                                <button type="button"
                                                    class="btn btn-link text-white p-0 opacity-50 hover-opacity-100 sidebar-info-button"
                                                    @click.stop="openSurahInfo(surah)"
                                                    aria-label="View surah information">
                                                    <i class="bi bi-info-circle-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Verse List -->
                                <div v-if="activeSidebarTab === 'verse'" class="list-group list-group-flush">
                                    <div class="p-3 text-white-50 small text-center border-bottom border-white-10" v-if="surahDetails">
                                        Surah {{ surahDetails.englishName }}
                                    </div>
                                    <div class="sidebar-item" v-for="verse in visibleFilteredVersesList" :key="verse.key"
                                         :class="{ active: activeAyahIndex === (verse.number - 1) }"
                                         @click="selectVerseFromSidebar(verse.number)">
                                         <div class="d-flex w-100 align-items-center">
                                             <div class="item-number-container me-2">
                                                 <span class="item-number">{{ verse.number }}</span>
                                             </div>
                                             <div class="flex-grow-1 overflow-hidden d-flex align-items-center py-2">
                                                 <!-- English (Left) (50%) -->
                                                 <div class="items-text-preview text-start text-truncate pe-2 border-end border-white-10" 
                                                      style="color: #ffffff; font-weight: 700; font-size: 0.85rem; flex: 0 0 50%; max-width: 50%;">
                                                     {{ verse.translation || 'Loading...' }}
                                                 </div>
                                                 <!-- Arabic (Right) (50%) -->
                                                 <div class="item-title-ar text-end text-truncate ps-2" 
                                                      style="font-size: 1.2rem; color: #ffffff; font-weight: normal; flex: 0 0 50%; max-width: 50%; font-family: var(--ic-quran-arabic-font) !important;">
                                                     {{ verse.text }}
                                                 </div>
                                             </div>
                                         </div>
                                    </div>
                                    <div v-if="filteredVersesList.length === 0" class="text-center text-white-50 py-4">
                                        No verses found.
                                    </div>
                                    <button
                                        v-else-if="hasMoreFilteredVerses"
                                        type="button"
                                        class="btn sidebar-load-more-btn"
                                        @click="loadMoreSidebarVerses">
                                        Load more verses ({{ visibleFilteredVersesList.length }}/{{ filteredVersesList.length }})
                                    </button>
                                </div>

                                <!-- Juz List -->
                                <div v-if="activeSidebarTab === 'juz'" class="list-group list-group-flush">
                                    <div class="sidebar-item" v-for="juz in filteredJuzs" :key="juz.number"
                                         :class="{ active: selectedJuz === juz.number }"
                                         @click="selectJuz(juz.number)">
                                         <div class="d-flex w-100 align-items-center justify-content-between">
                                             <div class="text-start">
                                                 <span class="item-title-en">Juz {{ juz.number }}</span>
                                                 <div class="small text-white-50" style="font-size: 0.75rem;">
                                                     Starts at: {{ juz.surahName }}:{{ juz.ayahNumber }}
                                                 </div>
                                             </div>
                                              <i class="bi bi-chevron-right text-white-50 small"></i>
                                         </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-12 col-md-4 filter-item"></div>
                    <div class="col-12 col-md-4 filter-item"></div> -->
                </div>
            </div>
            <div class="surah-offcanvas-trigger">
                <button type="button" class="btn btn-primary surah-offcanvas-toggle icon-only" data-bs-toggle="offcanvas"
                    data-bs-target="#surahOffcanvas" aria-controls="surahOffcanvas"
                    @click="prepareSettingsDraft">
                    <i class="bi bi-sliders" aria-hidden="true"></i>
                    <span class="visually-hidden">Filters & info</span>
                </button>
            </div>
            <div class="offcanvas offcanvas-start surah-offcanvas" tabindex="-1" id="surahOffcanvas"
                ref="surahOffcanvas" aria-labelledby="surahOffcanvasLabel">
                <div class="offcanvas-header">
                    <h4 class="offcanvas-title" id="surahOffcanvasLabel"><b>Surah controls</b></h4>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="surah-offcanvas-section surah-offcanvas-search" v-if="false">
                        <div v-if="surahDetails" class="surah-offcanvas-title">
                            Surah {{ surahDetails.surahNumber }} {{ surahDetails.englishName || surahDetails.name }}
                        </div>
                        <div v-else class="surah-offcanvas-title">Select a surah to begin</div>
                        <div v-if="surahDetails" class="surah-offcanvas-badge">
                            {{ surahDetails.ayahs ? surahDetails.ayahs.length : filteredAyahs.length }} verses
                        </div>
                    </div>
                    <div class="surah-offcanvas-section">
                        <label class="form-label surah-offcanvas-label">Select surah</label>
                        <select class="form-select surah-offcanvas-select" v-model="selectedSurah"
                            @change="selectSurah(selectedSurah)" aria-label="Select surah">
                            <option value="" disabled>Select surah</option>
                            <option v-for="surah in filteredSurahs" :key="surah.number" :value="String(surah.number)">
                                {{ surah.number }} · {{ surah.englishName }}
                            </option>
                        </select>
                    </div>
                    <div class="surah-offcanvas-section">
                        <label class="form-label surah-offcanvas-label">Select reciter</label>
                        <select class="form-select surah-offcanvas-select" v-model="selectedReciter"
                            aria-label="Select reciter">
                            <option value="" disabled>Select a reciter</option>
                            <option v-for="reciter in recitersSorted" :key="reciter.identifier"
                                :value="reciter.identifier">
                                {{ reciter.englishName }}
                            </option>
                        </select>
                        <div class="surah-offcanvas-row mt-3">
                            <div class="surah-offcanvas-field">
                                <label class="form-label surah-offcanvas-label">Select translation</label>
                                <select class="form-select surah-offcanvas-select" v-model="selectedTranslation"
                                    aria-label="Select translation">
                                    <option value="" disabled>Select Translation</option>
                                    <option v-for="translation in translationsSorted" :key="translation.identifier"
                                        :value="translation.identifier">
                                        {{ `${translation.flag} ${translation.englishName} (${translation.language})` }}
                                    </option>
                                </select>
                            </div>
                            <div class="surah-offcanvas-toggle-group">
                            </div>
                        </div>
                        <button v-if="false" type="button" class="btn btn-primary surah-offcanvas-play"
                            :disabled="!canPlaySurah" @click="playSurahContinuously"
                            aria-label="Play every ayah in this surah">
                            <i class="bi bi-play-fill me-2" aria-hidden="true"></i>
                            Play full surah
                        </button>
                        <button type="button" class="btn btn-outline-primary surah-offcanvas-submit"
                            @click="closeOffcanvas" aria-label="Close filters and info">
                            <i class="bi bi-check me-2" aria-hidden="true"></i>
                            Done
                        </button>
                    </div>
                    
                </div>
            </div>
            <div v-if="isLoading" class="loading-placeholder">Loading Surah...</div>

            <div class="row rtl-text" ref="listContainer" role="list" aria-label="Ayah cards list"
                :style="!isMemorisationMode
                    ? { paddingTop: topSpacerHeight + 'px', paddingBottom: bottomSpacerHeight + 'px' }
                    : null">
                <div style="padding: 12px; border-radius: 8px" ref="audioCard" v-for="item in visibleWindow"
                    :key="item.ayah.number" class="col-md-12 mb-2 mt-2 ayah-card ayah-card-container shadow-md" role="listitem"
                    :id="`ayah-card-${item.index}`" :data-ayah-number="item.ayah.numberInSurah" @click="selectCard(item.index)"
                    @keydown.enter.prevent="toggleAudioPlayer(item.index)"
                    @keydown.space.prevent="toggleAudioPlayer(item.index)" draggable="true" tabindex="0"
                    @dragstart="onAyahDragStart(item.ayah, $event)"                     :class="{
                        highlighted:
                            isHighlighted && activeAyahIndex === item.index,
                        'currently-playing': isAudioPlaying[item.index],
                        'memorisation-repetition-active': isMemorisationRepetitionActive && item.index === currentlyPlayingIndex,
                        'is-pinned': isAyahPinned(item.ayah),
                        'memorisation-past': isMemorisationMode && item.role === 'past',
                        'memorisation-current': isMemorisationMode && item.role === 'current',
                        'memorisation-next': isMemorisationMode && item.role === 'next',
                    }">
                    <div class="ayah-surface rtl-text d-flex flex-column">
                        <!-- Surah and Ayah Number -->
                        <div class="d-flex justify-content-between text-muted ltr-text ayah-card-header">
                            <div class="d-flex align-items-center gap-2">
                                <h4>
                                    <img src="/images/art.png" width="35px" alt="Art Icon" />
                                    {{ surahDetails?.surahNumber }} :
                                    {{ item.index + 1 }}
                                    <span v-if="isAyahSaved(item.ayah)" class="saved-pill">Saved</span>
                                </h4>
                                <span v-if="isAudioPlaying[item.index]" class="now-playing-tag">
                                    Now playing
                                </span>
                            </div>
                            <div class="ayah-card-header-actions">
                                <div class="form-check form-switch translation-toggle ayah-translation-toggle">
                                    <input class="form-check-input" type="checkbox"
                                        :checked="isTranslationVisibleFor(item)"
                                        :id="`surat-translation-toggle-${item.index}`"
                                        :aria-label="isTranslationVisibleFor(item) ? 'Hide translation' : 'Show translation'"
                                        @change="onTranslationToggle(item, $event)"
                                        @click.stop>
                                    <label class="form-check-label"
                                        :for="`surat-translation-toggle-${item.index}`"
                                        @click.stop>
                                        Translation
                                    </label>
                                </div>
                                <div class="form-check form-switch translation-toggle ayah-transliteration-toggle">
                                    <input class="form-check-input" type="checkbox"
                                        :checked="isTransliterationVisibleFor(item)"
                                        :id="`surat-transliteration-toggle-${item.index}`"
                                        :aria-label="isTransliterationVisibleFor(item) ? 'Hide transliteration' : 'Show transliteration'"
                                        @change="onTransliterationToggle(item, $event)"
                                        @click.stop>
                                    <label class="form-check-label"
                                        :for="`surat-transliteration-toggle-${item.index}`"
                                        @click.stop>
                                        Transliteration
                                    </label>
                                </div>
                                <div class="ayah-pin-feedback-group">
                                    <button
                                        type="button"
                                        class="icon-btn ayah-playlist-btn"
                                        :class="{
                                            'is-in-playlist': isAyahInAnyCustomPlaylist(item.ayah),
                                            'is-in-active-playlist': isAyahInCustomPlaylist(item.ayah)
                                        }"
                                        @click.stop="onAyahPlaylistPrimaryAction(item.ayah)"
                                        :aria-label="isAyahInCustomPlaylist(item.ayah)
                                            ? 'Remove ayah from active playlist'
                                            : isAyahInAnyCustomPlaylist(item.ayah)
                                                ? 'Saved in another playlist, open playlist options'
                                                : 'Open playlist options'"
                                        :title="isAyahInCustomPlaylist(item.ayah)
                                            ? 'Remove from active playlist'
                                            : isAyahInAnyCustomPlaylist(item.ayah)
                                                ? 'Saved in another playlist'
                                                : 'Save to playlist'">
                                        <i class="bi bi-music-note-list" aria-hidden="true"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="icon-btn ayah-pin-btn"
                                        :class="{ 'is-pinned': isAyahPinned(item.ayah) }"
                                        @click.stop="togglePinnedAyah(item.ayah)"
                                        :aria-label="isAyahPinned(item.ayah)
                                            ? 'Unpin favourite ayah'
                                            : 'Pin ayah as favourite'"
                                        :title="isAyahPinned(item.ayah)
                                            ? 'Unpin favourite ayah'
                                            : 'Pin ayah as favourite'">
                                        <i
                                            class="bi"
                                            :class="isAyahPinned(item.ayah)
                                                ? 'bi-pin-angle-fill'
                                                : 'bi-pin-angle'"
                                            aria-hidden="true"></i>
                                    </button>
                                    <button
                                        type="button"
                                        class="icon-btn ayah-download-btn"
                                        :class="{ 'is-downloaded': isAyahAudioDownloaded(item.ayah) }"
                                        @click.stop="downloadAyahAudio(item.ayah)"
                                        :disabled="!item.ayah?.audio || isAyahAudioDownloading(item.ayah)"
                                        :aria-label="!item.ayah?.audio
                                            ? 'Audio unavailable for this ayah'
                                            : isAyahAudioDownloading(item.ayah)
                                                ? 'Downloading ayah audio'
                                                : isAyahAudioDownloaded(item.ayah)
                                                    ? 'Ayah MP3 downloaded'
                                                : 'Download ayah audio as MP3'"
                                        :title="!item.ayah?.audio
                                            ? 'Audio unavailable'
                                            : isAyahAudioDownloading(item.ayah)
                                                ? 'Downloading...'
                                                : isAyahAudioDownloaded(item.ayah)
                                                    ? 'Downloaded'
                                                : 'Download MP3'">
                                        <i
                                            class="bi"
                                            :class="isAyahAudioDownloading(item.ayah)
                                                ? 'bi-arrow-repeat ic-spin'
                                                : isAyahAudioDownloaded(item.ayah)
                                                    ? 'bi-check-circle-fill'
                                                    : 'bi-cloud-arrow-down-fill'"
                                            aria-hidden="true"></i>
                                    </button>
                                    <div
                                        v-if="openAyahPlaylistMenuKey === buildAyahKey(
                                            surahDetails?.surahNumber,
                                            item.ayah.numberInSurah || item.ayah.number
                                        )"
                                        class="ayah-playlist-menu"
                                        @click.stop>
                                        <template v-if="isAyahInAnyCustomPlaylist(item.ayah)">
                                            <button
                                                type="button"
                                                class="ayah-playlist-menu-item is-danger"
                                                @click.stop="removeAyahFromAllCustomPlaylists(item.ayah)">
                                                <span>Remove from all playlists</span>
                                                <i class="bi bi-trash" aria-hidden="true"></i>
                                            </button>
                                            <div
                                                class="ayah-playlist-menu-row"
                                                v-if="getAyahPlaylistsContainingAyah(item.ayah).length">
                                                <button
                                                    type="button"
                                                    class="ayah-playlist-menu-item ayah-playlist-menu-item-submenu is-danger"
                                                    :class="{ 'is-open': openAyahPlaylistExistingSubmenuKey === buildAyahKey(
                                                        surahDetails?.surahNumber,
                                                        item.ayah.numberInSurah || item.ayah.number
                                                    ) }"
                                                    @click.stop="toggleAyahExistingPlaylistSubmenu(item.ayah)">
                                                    <span>Remove from selected playlist</span>
                                                    <i class="bi bi-chevron-left" aria-hidden="true"></i>
                                                </button>
                                                <div
                                                    v-if="openAyahPlaylistExistingSubmenuKey === buildAyahKey(
                                                        surahDetails?.surahNumber,
                                                        item.ayah.numberInSurah || item.ayah.number
                                                    )"
                                                    class="ayah-playlist-submenu"
                                                    @click.stop>
                                                    <button
                                                        v-for="playlist in getAyahPlaylistsContainingAyah(item.ayah)"
                                                        :key="`ayah-remove-${playlist.id}-${buildAyahKey(
                                                            surahDetails?.surahNumber,
                                                            item.ayah.numberInSurah || item.ayah.number
                                                        )}`"
                                                        type="button"
                                                        class="ayah-playlist-menu-item ayah-playlist-menu-item-playlist is-danger"
                                                        @click.stop="removeAyahFromCustomPlaylist(item.ayah, playlist.id)">
                                                        <span>{{ playlist.name || "Untitled Playlist" }}</span>
                                                        <i class="bi bi-dash-circle" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="ayah-playlist-menu-row" v-if="sortedCustomPlaylists.length">
                                                <button
                                                    type="button"
                                                    class="ayah-playlist-menu-item ayah-playlist-menu-item-submenu"
                                                    :class="{ 'is-open': openAyahPlaylistExistingSubmenuKey === buildAyahKey(
                                                        surahDetails?.surahNumber,
                                                        item.ayah.numberInSurah || item.ayah.number
                                                    ) }"
                                                    @click.stop="toggleAyahExistingPlaylistSubmenu(item.ayah)">
                                                    <span>Save to existing playlist</span>
                                                    <i class="bi bi-chevron-left" aria-hidden="true"></i>
                                                </button>
                                                <div
                                                    v-if="openAyahPlaylistExistingSubmenuKey === buildAyahKey(
                                                        surahDetails?.surahNumber,
                                                        item.ayah.numberInSurah || item.ayah.number
                                                    )"
                                                    class="ayah-playlist-submenu"
                                                    @click.stop>
                                                    <button
                                                        v-for="playlist in sortedCustomPlaylists"
                                                        :key="`ayah-${playlist.id}-${buildAyahKey(
                                                            surahDetails?.surahNumber,
                                                            item.ayah.numberInSurah || item.ayah.number
                                                        )}`"
                                                        type="button"
                                                        class="ayah-playlist-menu-item ayah-playlist-menu-item-playlist"
                                                        :disabled="isAyahInCustomPlaylist(item.ayah, playlist.id)"
                                                        @click.stop="saveAyahToCustomPlaylist(item.ayah, playlist.id)">
                                                        <span>{{ playlist.name || "Untitled Playlist" }}</span>
                                                        <i
                                                            class="bi"
                                                            :class="isAyahInCustomPlaylist(item.ayah, playlist.id) ? 'bi-check-circle-fill' : 'bi-plus-circle'"
                                                            aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                class="ayah-playlist-menu-item"
                                                @click.stop="openCreatePlaylistModal(item.ayah)">
                                                Save to new playlist
                                            </button>
                                        </template>
                                    </div>
                                </div>
                                <transition name="feedback-fade">
                                    <span v-if="
                                        feedbackMessages[
                                        buildAyahKey(
                                            surahDetails?.surahNumber,
                                            item.ayah.numberInSurah ||
                                            item.ayah.number
                                        )
                                        ]
                                    " class="badge rounded-pill feedback-badge ayah-feedback-message"
                                        :class="feedbackMessages[
                                            buildAyahKey(
                                                surahDetails?.surahNumber,
                                                item.ayah.numberInSurah ||
                                                item.ayah.number
                                            )
                                        ].class
                                            ">
                                        <i v-if="
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                    item.ayah.number
                                                )
                                            ].icon === 'check'
                                        " class="bi bi-check-circle-fill feedback-badge-icon"></i>
                                        <i v-else-if="
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                    item.ayah.number
                                                )
                                            ].icon === 'trash'
                                        " class="bi bi-trash-fill feedback-badge-icon"></i>
                                        <i v-else-if="
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                    item.ayah.number
                                                )
                                            ].icon === 'warning'
                                        " class="bi bi-exclamation-triangle-fill feedback-badge-icon"></i>
                                        {{
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                    item.ayah.number
                                                )
                                            ].text
                                        }}
                                        <a v-if="
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                    item.ayah.number
                                                )
                                            ].link
                                        " class="auth-alert-link ms-1" :href="feedbackMessages[
                                            buildAyahKey(
                                                surahDetails?.surahNumber,
                                                item.ayah.numberInSurah ||
                                                item.ayah.number
                                            )
                                        ].link" @click.stop>
                                            {{
                                                feedbackMessages[
                                                    buildAyahKey(
                                                        surahDetails?.surahNumber,
                                                        item.ayah.numberInSurah ||
                                                        item.ayah.number
                                                    )
                                                ].linkText || "Log in"
                                            }}
                                        </a>
                                    </span>
                                </transition>
                            </div>
                        </div>

                        <!-- Desktop Layout: Icons on Left -->
                        <div class="row d-none d-md-flex" role="group" aria-label="Ayah controls (desktop)"
                            :aria-hidden="isMobile">
                            <div class="col-md-11">
                                <div style="padding: 4px">
                                <p
                                    :class="[
                                        'arabic-text rtl-text text-end mb-3',
                                        {
                                            'arabic-text--active':
                                                currentlyPlayingIndex === item.index &&
                                                isAudioPlaying[item.index],
                                        },
                                    ]"
                                    v-html="highlightedText(item.ayah)"
                                    @click="onAyahWordClick(item, $event)"
                                    :style="{ fontSize: effectiveArabicFontSize + 'px' }"
                                ></p>
                                <div v-if="isTranslationVisibleFor(item)" class="translation-header pt-2 ltr-text hide-on-mobile-tablet ml-2">
                                    <h2 class="mb-0">
                                        Translation:
                                    </h2>
                                </div>
                                <div class="translation-row" :class="{ 'translation-row--collapsed': !isTranslationVisibleFor(item) }">
                                    <div class="translation-copy flex-grow-1">
                                        <div v-if="isTranslationVisibleFor(item)">
                                            <p
                                                :class="[
                                                    'fw-regular ltr-text flex-grow-1 translation-text',
                                                    {
                                                        'translation-text--active':
                                                            currentlyPlayingIndex === item.index &&
                                                            isAudioPlaying[item.index],
                                                    },
                                                ]"
                                                v-html="highlightText(item.ayah.translation)"
                                                :style="{
                                                    fontSize: effectiveAyahBodyFontSize + 'px',
                                                }"
                                            ></p>
                                        </div>
                                        <template v-else></template>
                                        <div v-if="isTransliterationVisibleFor(item)" class="transliteration-header pt-2 ltr-text hide-on-mobile-tablet ml-2">
                                            <h2 class="mb-0">
                                                Transliteration:
                                            </h2>
                                        </div>
                                        <p
                                            v-if="isTransliterationVisibleFor(item)"
                                            :class="[
                                                'fw-regular ltr-text flex-grow-1 transliteration-text',
                                                {
                                                    'transliteration-text--active':
                                                        currentlyPlayingIndex === item.index &&
                                                        isAudioPlaying[item.index],
                                                },
                                            ]"
                                            v-html="highlightText(item.ayah.transliteration || transliterationFallbackText)"
                                            :style="{
                                                fontSize: effectiveAyahBodyFontSize + 'px',
                                            }"
                                        ></p>
                                        <div class="ayah-quick-actions ltr-text" role="group" aria-label="Quick actions">
                                            <button type="button" class="action-pill" @click.stop="copyAyah(item.ayah)"
                                                aria-label="Copy ayah" title="Copy ayah">
                                                <i class="bi bi-clipboard" aria-hidden="true"></i>
                                                <span>Copy</span>
                                            </button>
                                            <button type="button" class="action-pill"
                                                @click.stop="shareOnWhatsApp(item.ayah)" aria-label="Share ayah"
                                                title="Share ayah">
                                                <i class="bi bi-send" aria-hidden="true"></i>
                                                <span>Share</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div class="col-md-1 text-center">
                                <div class="d-flex flex-column align-items-center">
                                    <button class="icon-btn mb-3" @click="toggleAudioPlayer(item.index)" :aria-label="isAudioPlaying[item.index]
                                        ? 'Pause ayah ' + (item.index + 1)
                                        : 'Play ayah ' + (item.index + 1)
                                        " :title="isAudioPlaying[item.index]
                                            ? 'Pause'
                                            : 'Play'
                                            ">
                                        <i class="bi" :class="isAudioPlaying[item.index]
                                            ? 'bi-pause-circle-fill'
                                            : 'bi-play-circle-fill'
                                            " aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- Mobile/Tablet Layout: Text then Icons -->

                        <div style="" class="d-block d-md-none" role="group" aria-label="Ayah controls (mobile)"
                            :aria-hidden="!isMobile">
                            <div>
                                <p
                                    :class="[
                                        'arabic-text rtl-text text-end mb-3',
                                        {
                                            'arabic-text--active':
                                                currentlyPlayingIndex === item.index &&
                                                isAudioPlaying[item.index],
                                        },
                                    ]"
                                    v-html="highlightedText(item.ayah)"
                                    @click="onAyahWordClick(item, $event)"
                                    :style="{ fontSize: effectiveArabicFontSize + 'px' }"
                                ></p>
                                <div v-if="isTranslationVisibleFor(item)" class="d-flex align-items-center fw-bold pt-2 ltr-text ml-2">
                                    <h4 class="mb-0">
                                        Translation:
                                    </h4>
                                </div>
                                <div v-if="isTranslationVisibleFor(item)">
                                    <p
                                        :class="[
                                            'fw-regular ltr-text flex-grow-1 translation-text',
                                            {
                                                'translation-text--active':
                                                    currentlyPlayingIndex === item.index &&
                                                    isAudioPlaying[item.index],
                                            },
                                        ]"
                                        v-html="highlightText(item.ayah.translation)"
                                        :style="{
                                            fontSize: effectiveAyahBodyFontSize + 'px',
                                        }"
                                    ></p>
                                </div>
                                <template v-else></template>
                                <div v-if="isTransliterationVisibleFor(item)" class="d-flex align-items-center fw-bold pt-2 ltr-text ml-2 transliteration-header">
                                    <h4 class="mb-0">
                                        Transliteration:
                                    </h4>
                                </div>
                                <p
                                    v-if="isTransliterationVisibleFor(item)"
                                    :class="[
                                        'fw-regular ltr-text flex-grow-1 transliteration-text',
                                        {
                                            'transliteration-text--active':
                                                currentlyPlayingIndex === item.index &&
                                                isAudioPlaying[item.index],
                                        },
                                    ]"
                                    v-html="highlightText(item.ayah.transliteration || transliterationFallbackText)"
                                    :style="{
                                        fontSize: effectiveAyahBodyFontSize + 'px',
                                    }"
                                ></p>
                                <div class="ayah-quick-actions ltr-text" role="group" aria-label="Quick actions">
                                    <button type="button" class="action-pill" @click.stop="copyAyah(item.ayah)"
                                        aria-label="Copy ayah" title="Copy ayah">
                                        <i class="bi bi-clipboard" aria-hidden="true"></i>
                                        <span>Copy</span>
                                    </button>
                                    <button type="button" class="action-pill" @click.stop="shareOnWhatsApp(item.ayah)"
                                        aria-label="Share ayah" title="Share ayah">
                                        <i class="bi bi-send" aria-hidden="true"></i>
                                        <span>Share</span>
                                    </button>
                                    <button type="button" class="action-pill reflection-pill-fill"
                                    :class="{ 'has-reflection': hasReflection(item.ayah) }"
                                    @click.stop="openReflectionModal(item.ayah)" :aria-label="hasReflection(item.ayah)
                                        ? 'Edit reflection'
                                        : 'Add reflection'" :title="hasReflection(item.ayah)
                                            ? 'Edit reflection'
                                            : 'Add reflection'">
                                    <i class="bi bi-journal-text" aria-hidden="true"></i>
                                    <span>{{ hasReflection(item.ayah) ? 'Reflected' : 'Reflect' }}</span>
                                </button>
                                </div>
                            </div>
                            <div class="row card-teal mb-3 py-2 ayah-inline-controls">
                                <div class="col text-center ayah-inline-control-item">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--font-down" @click="decreaseFontSize" aria-label="Decrease font size"
                                        title="Decrease Font Size">
                                        <i class="bi bi-dash-circle-fill ayah-inline-icon"
                                            aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">Text size -</span>
                                    </button>
                                </div>
                                <div class="col text-center ayah-inline-control-item">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--font-up" @click="increaseFontSize" aria-label="Increase font size"
                                        title="Increase Font Size">
                                        <i class="bi bi-plus-circle-fill ayah-inline-icon"
                                            aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">Text size +</span>
                                    </button>
                                </div>
                                <div class="col text-center ayah-inline-control-item">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--rewind" @click="rewindAudio(item.index)"
                                        aria-label="Rewind 15 seconds" title="Rewind">
                                        <i class="bi bi-skip-backward-circle-fill ayah-inline-icon"
                                            aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">Rewind 15s</span>
                                    </button>
                                </div>
                                <div class="col text-center ayah-inline-control-item">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--play" :class="{
                                        'is-active': isAudioPlaying[item.index],
                                    }" @click="toggleAudioPlayer(item.index)" :aria-label="isAudioPlaying[item.index]
                                        ? 'Pause ayah ' + (item.index + 1)
                                        : 'Play ayah ' + (item.index + 1)
                                        " :title="isAudioPlaying[item.index]
                                            ? 'Pause'
                                            : 'Play'
                                            ">
                                        <i class="bi ayah-inline-icon ayah-inline-icon--play" :class="isAudioPlaying[item.index]
                                            ? 'bi-pause-circle-fill'
                                            : 'bi-play-circle-fill'" aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">{{
                                            isAudioPlaying[item.index]
                                                ? "Pause verse"
                                                : "Play verse"
                                        }}</span>
                                    </button>
                                </div>
                                <div class="col text-center ayah-inline-control-item">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--forward" @click="fastForwardAudio(item.index)"
                                        aria-label="Fast forward 20 seconds" title="Fast Forward">
                                        <i class="bi bi-skip-forward-circle-fill ayah-inline-icon"
                                            aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">Forward 20s</span>
                                    </button>
                                </div>
                                <!-- <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn reflection-btn"
                                        :class="{ 'has-reflection': hasReflection(item.ayah) }"
                                        @click.stop="openReflectionModal(item.ayah)"
                                        :aria-label="hasReflection(item.ayah)
                                            ? 'Edit reflection'
                                            : 'Add reflection'"
                                        :title="hasReflection(item.ayah)
                                            ? 'Edit reflection'
                                            : 'Add reflection'">
                                        <i class="bi bi-journal-text" style="font-size: 1.6rem" aria-hidden="true"></i>
                                    </button>
                                </div> -->
                                <div class="col text-center ayah-inline-control-item">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--bookmark" :class="{
                                        'is-saved': isAyahSaved(item.ayah),
                                    }" @click.stop="toggleBookmark(item.ayah)" :title="isAyahSaved(item.ayah)
                                        ? 'Remove bookmark'
                                        : 'Quick save bookmark'
                                        " :aria-label="isAyahSaved(item.ayah)
                                            ? 'Remove verse bookmark'
                                            : 'Save verse bookmark'">
                                        <i class="bi ayah-inline-icon" :class="isAyahSaved(item.ayah)
                                            ? 'bi-bookmark-check-fill'
                                            : 'bi-bookmark-plus-fill'
                                            " aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">{{
                                            isAyahSaved(item.ayah)
                                                ? "Remove bookmark"
                                                : "Save bookmark"
                                        }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Screen reader live region -->
            <div class="visually-hidden" aria-live="polite" aria-atomic="true">
                {{ screenReaderMessage }}
            </div>
            <!-- Empty state -->
            <div v-if="!isLoading && surahDetails && filteredAyahs.length === 0"
                class="empty-state text-center text-muted py-4">
                No verses match your current search or filters.
            </div>
        </div>

        <bookmark-modal :ayah="activeAyah" @saved="onBookmarkSaved" />

        <teleport to="body">
            <div class="modal fade surat-onboarding-shell"
                :id="suratOnboardingModalId"
                tabindex="-1"
                aria-labelledby="suratOnboardingLabel"
                aria-hidden="true"
                data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-2xl">
                    <div class="modal-content surat-onboarding-modal">
                        <div class="modal-header">
                            <div>
                                <h4 class="modal-title" id="suratOnboardingLabel">
                                    <i class="fas fa-map-marked-alt me-2" aria-hidden="true"></i>
                                    <b>Surat onboarding guide</b>
                                </h4>
                                <p class="surat-onboarding-subtitle mb-0">
                                    Most important features first, with simple explanations.
                                </p>
                            </div>
                            <div class="surat-onboarding-header-actions">
                                <button type="button" class="surat-onboarding-font-btn"
                                    @click="decreaseSuratOnboardingFontSize"
                                    :disabled="suratOnboardingFontSize <= suratOnboardingFontSizeMin"
                                    aria-label="Decrease onboarding font size"
                                    title="Decrease font size">
                                    <i class="fas fa-minus" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="surat-onboarding-font-btn"
                                    @click="increaseSuratOnboardingFontSize"
                                    :disabled="suratOnboardingFontSize >= suratOnboardingFontSizeMax"
                                    aria-label="Increase onboarding font size"
                                    title="Increase font size">
                                    <i class="fas fa-plus" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close onboarding modal"></button>
                            </div>
                        </div>
                        <div class="modal-body"
                            :style="{ '--surat-onboarding-font-size': suratOnboardingFontSize + 'px' }">
                            <div class="surat-onboarding-search-wrap">
                                <i class="fas fa-search surat-onboarding-search-icon" aria-hidden="true"></i>
                                <input type="search"
                                    class="form-control surat-onboarding-search-input"
                                    v-model="suratOnboardingSearchQuery"
                                    placeholder="Search onboarding features..."
                                    aria-label="Search surat onboarding features" />
                                <button
                                    v-if="suratOnboardingSearchQuery"
                                    type="button"
                                    class="btn btn-link surat-onboarding-search-clear"
                                    @click="clearSuratOnboardingSearch"
                                    aria-label="Clear onboarding search">
                                    <i class="fas fa-times" aria-hidden="true"></i>
                                    Clear
                                </button>
                            </div>
                            <p class="surat-onboarding-meta mb-3">
                                Showing {{ filteredSuratOnboardingFeatures.length }} of {{ suratOnboardingFeatures.length }}
                                features
                            </p>
                            <div v-if="filteredSuratOnboardingFeatures.length" class="surat-onboarding-grid">
                                <article v-for="feature in filteredSuratOnboardingFeatures"
                                    :key="feature.id"
                                    class="surat-onboarding-card">
                                    <div class="surat-onboarding-card-top">
                                        <div class="surat-onboarding-card-meta">
                                            <span class="surat-onboarding-icon" aria-hidden="true">
                                                <i class="fas" :class="feature.iconClass || 'fa-info-circle'"></i>
                                            </span>
                                            <span class="surat-onboarding-area">{{ feature.area }}</span>
                                        </div>
                                        <span class="surat-onboarding-rank">#{{ feature.priority }}</span>
                                    </div>
                                    <h5 class="surat-onboarding-title"
                                        v-html="highlightSuratOnboardingText(feature.title)"></h5>
                                    <p class="surat-onboarding-summary mb-2"
                                        v-html="highlightSuratOnboardingText(feature.summary)"></p>
                                    <p class="surat-onboarding-how mb-0">
                                        <span class="surat-onboarding-how-label">How to use:</span>
                                        <span v-html="highlightSuratOnboardingText(feature.howTo)"></span>
                                    </p>
                                </article>
                            </div>
                            <div v-else class="surat-onboarding-empty">
                                No features matched "{{ suratOnboardingSearchQuery }}".
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div
                class="modal fade translation-compare-shell"
                :id="translationCompareModalId"
                tabindex="-1"
                aria-labelledby="translationCompareLabel"
                aria-hidden="true"
                data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xxl">
                    <div class="modal-content translation-compare-modal">
                        <div class="modal-header">
                            <div class="translation-compare-header-copy">
                                <h4 class="modal-title mb-1" id="translationCompareLabel">
                                    <b>Compare English translations</b>
                                </h4>
                                <p class="translation-compare-subtitle mb-0">
                                    Keep tajweed and word tools active while comparing side by side.
                                </p>
                            </div>
                            <div class="translation-compare-header-actions">
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close compare translations modal"></button>
                            </div>
                        </div>
                        <div
                            class="modal-body"
                            tabindex="0"
                            @keydown.left.prevent="stepTranslationCompareAyah(-1)"
                            @keydown.right.prevent="stepTranslationCompareAyah(1)">
                            <div class="translation-compare-sticky-tools">
                                <div class="translation-compare-sticky-head">
                                    <h5 class="translation-compare-sticky-title mb-0">Controls</h5>
                                    <div class="translation-compare-sticky-meta">
                                        Surah {{ translationCompareSurahNumber }} · Ayah {{ translationCompareAyahNumber }} / {{ Math.max(translationCompareTotalAyahs, 1) }}
                                    </div>
                                    <button
                                        type="button"
                                        class="btn translation-compare-collapse-btn"
                                        :aria-expanded="translationCompareControlsCollapsed ? 'false' : 'true'"
                                        @click="toggleTranslationCompareControlsCollapsed">
                                        <i
                                            class="bi"
                                            :class="translationCompareControlsCollapsed ? 'bi-sliders' : 'bi-x-lg'"
                                            aria-hidden="true"></i>
                                        <span>{{ translationCompareControlsCollapsed ? "More" : "Less" }}</span>
                                    </button>
                                </div>

                                <div class="translation-compare-compact-grid">
                                    <label class="translation-compare-field">
                                        <span>Surah</span>
                                        <select
                                            class="form-select translation-compare-select"
                                            v-model.number="translationCompareSurahNumber"
                                            @change="applyTranslationCompareSurahSelection"
                                            aria-label="Select surah for translation comparison">
                                            <option
                                                v-for="surah in surahs"
                                                :key="`compare-surah-${surah.number}`"
                                                :value="Number(surah.number)">
                                                {{ surah.number }}. {{ surah.englishName }}
                                            </option>
                                        </select>
                                    </label>

                                    <label class="translation-compare-field">
                                        <span>Ayah</span>
                                        <div class="translation-compare-field-row">
                                            <button
                                                type="button"
                                                class="btn translation-compare-nav-btn"
                                                @click="stepTranslationCompareAyah(-1)"
                                                :disabled="translationCompareAyahNumber <= 1"
                                                aria-label="Go to previous ayah">
                                                <i class="bi bi-chevron-left" aria-hidden="true"></i>
                                            </button>
                                            <input
                                                type="number"
                                                class="form-control translation-compare-ayah-input"
                                                :value="translationCompareAyahNumber"
                                                :min="1"
                                                :max="Math.max(translationCompareTotalAyahs, 1)"
                                                @change="onTranslationCompareAyahInputChange"
                                                aria-label="Ayah number for comparison" />
                                            <button
                                                type="button"
                                                class="btn translation-compare-nav-btn"
                                                @click="stepTranslationCompareAyah(1)"
                                                :disabled="translationCompareAyahNumber >= translationCompareTotalAyahs"
                                                aria-label="Go to next ayah">
                                                <i class="bi bi-chevron-right" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </label>

                                    <label class="translation-compare-field">
                                        <span>Translation A</span>
                                        <select
                                            class="form-select translation-compare-select"
                                            v-model="translationComparePrimaryTranslation"
                                            @change="onTranslationComparePrimaryChange"
                                            aria-label="Select first translation">
                                            <option
                                                v-for="translation in englishTranslationsSorted"
                                                :key="`compare-primary-${translation.identifier}`"
                                                :value="translation.identifier"
                                                :disabled="
                                                    translation.identifier === translationCompareSecondaryTranslation &&
                                                    translation.identifier !== translationComparePrimaryTranslation
                                                ">
                                                {{ translation.englishName }}
                                            </option>
                                        </select>
                                    </label>

                                    <label class="translation-compare-field">
                                        <span>Translation B</span>
                                        <select
                                            class="form-select translation-compare-select"
                                            v-model="translationCompareSecondaryTranslation"
                                            @change="onTranslationCompareSecondaryChange"
                                            aria-label="Select second translation">
                                            <option
                                                v-for="translation in englishTranslationsSorted"
                                                :key="`compare-secondary-${translation.identifier}`"
                                                :value="translation.identifier"
                                                :disabled="
                                                    translation.identifier === translationComparePrimaryTranslation &&
                                                    translation.identifier !== translationCompareSecondaryTranslation
                                                ">
                                                {{ translation.englishName }}
                                            </option>
                                        </select>
                                    </label>
                                </div>

                                <div v-show="!translationCompareControlsCollapsed" class="translation-compare-inline-actions">
                                    <button
                                        type="button"
                                        class="btn translation-compare-header-btn"
                                        @click="jumpTranslationCompareToReaderContext">
                                        <i class="bi bi-cursor-fill me-1" aria-hidden="true"></i>
                                        Current ayah
                                    </button>
                                    <button
                                        type="button"
                                        class="btn translation-compare-open-reader-btn"
                                        @click="openComparedAyahInReader">
                                        <i class="bi bi-box-arrow-up-right me-1" aria-hidden="true"></i>
                                        Open in reader
                                    </button>
                                    <button
                                        type="button"
                                        class="btn translation-compare-tool-btn"
                                        :class="{ 'is-enabled': showTajweed }"
                                        @click="showTajweed = !showTajweed">
                                        <i class="bi bi-palette-fill" aria-hidden="true"></i>
                                        <span>Tajweed</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn translation-compare-tool-btn"
                                        :class="{ 'is-enabled': showWordTranslation }"
                                        @click="showWordTranslation = !showWordTranslation">
                                        <i class="bi bi-translate" aria-hidden="true"></i>
                                        <span>Word meanings</span>
                                    </button>
                                    <button
                                        type="button"
                                        class="btn translation-compare-tool-btn"
                                        :class="{ 'is-enabled': showWordTranslationTooltip }"
                                        @click="toggleWordAudioMode">
                                        <i class="bi bi-volume-up-fill" aria-hidden="true"></i>
                                        <span>Word tap audio</span>
                                    </button>
                                </div>
                            </div>

                            <div v-if="translationCompareError" class="alert alert-warning translation-compare-alert" role="status">
                                {{ translationCompareError }}
                            </div>

                            <div v-if="translationCompareCurrentAyah" class="translation-compare-content">
                                <article class="translation-compare-arabic-panel">
                                    <div class="translation-compare-meta">
                                        Surah {{ translationCompareSurahNumber }} · Ayah {{ translationCompareAyahNumber }}
                                    </div>
                                    <p
                                        class="translation-compare-arabic-text arabic-text text-end mb-3"
                                        dir="rtl"
                                        v-html="highlightedText(translationCompareCurrentAyah)"
                                        @click="onTranslationCompareWordClick"
                                        :style="{ fontSize: effectiveArabicFontSize + 'px' }"></p>
                                </article>

                                <section class="translation-compare-grid" :style="translationCompareGridStyle">
                                    <article
                                        v-for="translation in translationCompareSelectedTranslationObjects"
                                        :key="`translation-col-${translation.identifier}`"
                                        class="translation-compare-card">
                                        <div class="translation-compare-card-head">
                                            <h6 class="mb-0">{{ translation.englishName }}</h6>
                                        </div>
                                        <p
                                            class="translation-compare-text mb-0"
                                            v-html="highlightText(getTranslationCompareText(translation.identifier, translationCompareAyahNumber))"
                                            :style="{ fontSize: effectiveAyahBodyFontSize + 'px' }"></p>
                                    </article>
                                </section>
                            </div>

                            <div class="translation-compare-pagination-wrap" role="group" aria-label="Ayah pagination">
                                <div class="translation-compare-pagination-group">
                                    <button
                                        type="button"
                                        class="btn translation-compare-pagination-btn"
                                        :disabled="translationCompareAyahNumber <= 1"
                                        @click="setTranslationCompareAyahNumber(1)">
                                        First
                                    </button>
                                    <button
                                        type="button"
                                        class="btn translation-compare-pagination-btn"
                                        :disabled="translationCompareAyahNumber <= 1"
                                        @click="stepTranslationCompareAyah(-1)">
                                        Prev
                                    </button>
                                </div>
                                <div class="translation-compare-pagination-numbers">
                                    <button
                                        v-for="ayahNumber in translationCompareNearbyAyahs"
                                        :key="`compare-nearby-${ayahNumber}`"
                                        type="button"
                                        class="btn translation-compare-pagination-btn translation-compare-pagination-btn-number"
                                        :class="{ 'is-active': ayahNumber === translationCompareAyahNumber }"
                                        @click="setTranslationCompareAyahNumber(ayahNumber)">
                                        {{ ayahNumber }}
                                    </button>
                                </div>
                                <div class="translation-compare-pagination-group">
                                    <button
                                        type="button"
                                        class="btn translation-compare-pagination-btn"
                                        :disabled="translationCompareAyahNumber >= translationCompareTotalAyahs"
                                        @click="stepTranslationCompareAyah(1)">
                                        Next
                                    </button>
                                    <button
                                        type="button"
                                        class="btn translation-compare-pagination-btn"
                                        :disabled="translationCompareAyahNumber >= translationCompareTotalAyahs"
                                        @click="setTranslationCompareAyahNumber(translationCompareTotalAyahs)">
                                        Last
                                    </button>
                                </div>
                            </div>

                            <div v-if="translationCompareLoading" class="translation-compare-loading text-muted">
                                Loading selected translations...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport v-if="showTajweed" to="body">
            <div class="modal fade" id="tajweedRulesModal" tabindex="-1" aria-labelledby="tajweedRulesLabel"
                aria-hidden="true" data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-xl modal-modern tajweed-rules-modal-dialog">
                    <div class="modal-content tajweed-modal">
                        <div class="modal-header">
                            <h6 class="modal-title" id="tajweedRulesLabel">
                                <b>Tajweed rules</b>
                            </h6>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div v-if="tajweedRulesWithExamples.length" class="tajweed-rules-grid">
                                <article v-for="rule in tajweedRulesWithExamples" :key="rule.id" class="tajweed-rule-card">
                                    <div class="tajweed-rule-card-header">
                                        <h6 class="tajweed-rule-card-title mb-0">{{ rule.name }}</h6>
                                        <span class="tajweed-rule-card-ref">Ayah {{ rule.exampleRef }}</span>
                                    </div>
                                    <div class="tajweed-rule-example-text" dir="rtl" v-html="formatTajweedText(rule.exampleTajweedText || rule.exampleText)"></div>
                                </article>
                            </div>
                            <div v-else class="text-muted small">Tajweed rules are currently unavailable.</div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div class="modal fade" id="surahInfoModal" tabindex="-1" aria-labelledby="surahInfoLabel"
                aria-hidden="true" data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-modern">
                    <div class="modal-content surah-info-modal">
                        <div class="modal-header">
                            <h4 class="modal-title" id="surahInfoLabel">
                                <b>Surah information</b>
                            </h4>
                            <div class="surah-info-actions">
                                <button type="button" class="surah-info-font-btn" @click="decreaseSurahInfoFontSize"
                                    :disabled="surahInfoFontSize <= surahInfoFontSizeMin"
                                    aria-label="Decrease surah info font size" title="Decrease font size">
                                    <i class="bi bi-dash-lg" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="surah-info-font-btn" @click="increaseSurahInfoFontSize"
                                    :disabled="surahInfoFontSize >= surahInfoFontSizeMax"
                                    aria-label="Increase surah info font size" title="Increase font size">
                                    <i class="bi bi-plus-lg" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div v-if="surahInfo" :style="{
                                '--surah-info-font-size': surahInfoFontSize + 'px'
                            }">
                                <div class="surah-info-hero">
                                    <div class="surah-info-arabic-large" v-if="surahInfo.name">
                                        {{ surahInfo.name }}
                                    </div>
                                    <div class="surah-info-english">
                                        {{ surahInfo.englishName }}
                                    </div>
                                    <div class="surah-info-meta">
                                        <span class="surah-info-chip">
                                            Ayahs: {{ surahInfo.numberOfAyahs || surahDetails?.ayahs?.length || "Unknown" }}
                                        </span>
                                        <span class="surah-info-chip">
                                            Revelation Place: {{ surahInfo.revelationType || "Unknown" }}
                                        </span>
                                    </div>
                                </div>

                                <div v-if="surahInfoShortText" class="surah-info-lead" v-html="surahInfoShortText">
                                </div>

                                <div v-if="surahInfoLoading" class="surah-info-loading">
                                    Loading surah details...
                                </div>
                                <div v-else-if="surahInfoError" class="surah-info-error">
                                    {{ surahInfoError }}
                                </div>
                                <div v-else-if="surahInfoText" class="surah-info-content" v-html="surahInfoText">
                                </div>
                                <div v-else class="surah-info-empty">
                                    Detailed info is not available yet.
                                </div>

                                <div class="surah-info-source">
                                    Reference:
                                    <a v-if="surahInfoSourceUrl" :href="surahInfoSourceUrl" target="_blank"
                                        rel="noopener noreferrer">
                                        {{ surahInfoSourceLabel }}
                                    </a>
                                    <span v-else>{{ surahInfoSourceLabel }}</span>
                                    <span v-if="surahInfoSourceHost">({{ surahInfoSourceHost }})</span>
                                </div>
                            </div>
                            <div v-else class="text-muted small">
                                Surah details are not available yet. Please try again in a moment.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div class="modal fade" id="surahSettingsModal" tabindex="-1" aria-labelledby="surahSettingsLabel"
                aria-hidden="true" data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-xl modal-modern surah-settings-dialog">
                    <div class="modal-content surah-settings-modal">
                        <div class="modal-header">
                            <h4 class="modal-title" id="surahSettingsLabel">
                                <b>Display settings</b>
                            </h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row g-3 surah-settings-grid">
                                <div class="col-12 col-md-6">
                                    <div class="surah-settings-group h-100">
                                        <label class="form-label">Audio reciter</label>
                                        <select class="form-select" v-model="selectedReciter"
                                            aria-label="Select reciter">
                                            <option value="" disabled>Select a reciter</option>
                                            <option v-for="reciter in recitersSorted" :key="reciter.identifier"
                                                :value="reciter.identifier">
                                                {{ reciter.englishName }}
                                            </option>
                                        </select>
                                        <small class="text-muted d-block mt-1">
                                            Pick the reciter voice for audio playback.
                                        </small>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="surah-settings-group h-100">
                                        <label class="form-label">Translation</label>
                                        <select class="form-select" v-model="selectedTranslation"
                                            aria-label="Select translation">
                                            <option value="" disabled>Select translation</option>
                                            <option v-for="translation in translationsSorted" :key="translation.identifier"
                                                :value="translation.identifier">
                                                {{ translation.flag }} {{ translation.englishName }}
                                            </option>
                                        </select>
                                        <small class="text-muted d-block mt-1">
                                            Choose the translation shown under each ayah.
                                        </small>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="surah-settings-group h-100">
                                        <label class="form-label">Tajweed colors &amp; rules</label>
                                        <select class="form-select" v-model="settingsDraft.showTajweed"
                                            aria-label="Enable tajweed colors and rules">
                                            <option :value="true">Enabled</option>
                                            <option :value="false">Disabled</option>
                                        </select>
                                        <small class="text-muted d-block mt-1">
                                            Toggle the tajweed-colored text in the Quran and access the tajweed rules legend.
                                        </small>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="surah-settings-group h-100">
                                        <label class="form-label">Audio playback mode</label>
                                        <select class="form-select" v-model="settingsDraft.playbackMode"
                                            aria-label="Select audio playback mode">
                                            <option v-for="option in playbackModeOptions" :key="option.value"
                                                :value="option.value">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                        <small v-if="draftPlaybackModeOption && draftPlaybackModeOption.description" class="text-muted d-block mt-1">
                                            {{ draftPlaybackModeOption.description }}
                                        </small>
                                        <small v-else class="text-muted d-block mt-1">
                                            Decide whether audio plays continuously, repeats, or stays manual.
                                        </small>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="surah-settings-group h-100">
                                        <label class="form-label">Word-for-word highlighting</label>
                                        <select class="form-select" v-model="settingsDraft.showRealtimeHighlighting"
                                            aria-label="Word-for-word highlighting">
                                            <option :value="true">Enabled</option>
                                            <option :value="false">Disabled</option>
                                        </select>
                                        <small class="text-muted d-block mt-1">
                                            Highlight each word as it is recited.
                                        </small>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="surah-settings-group h-100">
                                        <label class="form-label">Word-for-word translation</label>
                                        <select class="form-select" v-model="settingsDraft.showWordTranslation"
                                            aria-label="Word-for-word translation">
                                            <option :value="true">Enabled</option>
                                            <option :value="false">Disabled</option>
                                        </select>
                                        <small class="text-muted d-block mt-1">
                                            Show a brief translation beneath each Arabic word.
                                        </small>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="surah-settings-group h-100">
                                        <label class="form-label">Word tooltip + tap audio</label>
                                        <select
                                            class="form-select"
                                            v-model="settingsDraft.showWordTranslationTooltip"
                                            aria-label="Word tooltip and tap audio">
                                            <option :value="true">Enabled</option>
                                            <option :value="false">Disabled</option>
                                        </select>
                                        <small class="text-muted d-block mt-1">
                                            When enabled, hovering shows word translation and tapping a word plays only that word.
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn surah-settings-submit"
                                @click="applySettingsModal"
                                aria-label="Apply settings">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div v-if="!isMobile" class="offcanvas offcanvas-end quran-font-offcanvas" tabindex="-1"
                :id="fontPickerOffcanvasId" ref="fontPickerOffcanvas" aria-labelledby="quranFontOffcanvasLabel">
                <div class="offcanvas-header">
                    <div>
                        <h4 class="offcanvas-title" id="quranFontOffcanvasLabel">
                            <b>Quran fonts</b>
                        </h4>
                        <p class="quran-font-subtitle mb-0">
                            Select a Quranic script. Preview uses Al-Fatiha 1 with tajweed colors.
                        </p>
                    </div>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="quran-font-panel">
                        <div v-if="quranFontsLoading" class="quran-font-loading">
                            Loading Quran fonts...
                        </div>
                        <div v-else>
                            <div v-if="quranFontsError" class="quran-font-error">
                                {{ quranFontsError }}
                            </div>
                            <div class="quran-font-list">
                                <div v-for="font in quranFonts" :key="font.id" class="quran-font-option"
                                    :class="{ selected: quranFontDraftId === font.id }"
                                    @click="selectQuranFontDraft(font.id)">
                                    <div class="quran-font-option-header">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                :id="`quran-font-${font.inputId}`" :value="font.id"
                                                v-model="quranFontDraftId" @click.stop />
                                            <label class="form-check-label"
                                                :for="`quran-font-${font.inputId}`"
                                                :style="{ fontFamily: font.cssStack }">
                                                {{ font.label }}
                                            </label>
                                        </div>
                                        <span v-if="font.source" class="quran-font-source">
                                            {{ font.source }}
                                        </span>
                                    </div>
                                    <div class="quran-font-preview" :style="{ fontFamily: font.cssStack }">
                                        <div v-if="fontPreviewLoading" class="quran-font-preview-loading">
                                            Loading preview...
                                        </div>
                                        <div v-else class="quran-font-preview-text" v-html="getFontPreviewHtml(font)"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="fontPickerAlert" class="alert alert-soft-success quran-font-alert" role="status">
                            <i class="bi bi-check-circle-fill"></i>
                            <span>{{ fontPickerAlert }}</span>
                        </div>
                        <div class="quran-font-actions">
                            <button type="button" class="btn btn-outline-secondary" @click="closeFontPicker">
                                Cancel
                            </button>
                            <button type="button" class="btn surah-settings-submit"
                                :disabled="!quranFontDraftId" @click="applyQuranFontSelection">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div v-if="isMobile" class="modal fade quran-font-modal" :id="fontPickerModalId" tabindex="-1"
                aria-labelledby="quranFontModalLabel" aria-hidden="true" data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable modal-fullscreen-sm-down">
                    <div class="modal-content quran-font-modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="quranFontModalLabel">
                                <b>Quran fonts</b>
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p class="quran-font-subtitle">
                                Select a Quranic script. Preview uses Al-Fatiha 1 with tajweed colors.
                            </p>
                            <div class="quran-font-panel">
                                <div v-if="quranFontsLoading" class="quran-font-loading">
                                    Loading Quran fonts...
                                </div>
                                <div v-else>
                                    <div v-if="quranFontsError" class="quran-font-error">
                                        {{ quranFontsError }}
                                    </div>
                                    <div class="quran-font-list">
                                        <div v-for="font in quranFonts" :key="font.id" class="quran-font-option"
                                            :class="{ selected: quranFontDraftId === font.id }"
                                            @click="selectQuranFontDraft(font.id)">
                                            <div class="quran-font-option-header">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio"
                                                        :id="`quran-font-mobile-${font.inputId}`" :value="font.id"
                                                        v-model="quranFontDraftId" @click.stop />
                                                    <label class="form-check-label"
                                                        :for="`quran-font-mobile-${font.inputId}`"
                                                        :style="{ fontFamily: font.cssStack }">
                                                        {{ font.label }}
                                                    </label>
                                                </div>
                                                <span v-if="font.source" class="quran-font-source">
                                                    {{ font.source }}
                                                </span>
                                            </div>
                                            <div class="quran-font-preview" :style="{ fontFamily: font.cssStack }">
                                                <div v-if="fontPreviewLoading" class="quran-font-preview-loading">
                                                    Loading preview...
                                                </div>
                                                <div v-else class="quran-font-preview-text" v-html="getFontPreviewHtml(font)"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="fontPickerAlert" class="alert alert-soft-success quran-font-alert" role="status">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>{{ fontPickerAlert }}</span>
                                </div>
                                <div class="quran-font-actions">
                                    <button type="button" class="btn btn-outline-secondary" @click="closeFontPicker">
                                        Cancel
                                    </button>
                                    <button type="button" class="btn surah-settings-submit"
                                        :disabled="!quranFontDraftId" @click="applyQuranFontSelection">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <!-- Notes & Reflections Modal -->
        <teleport to="body">
            <div class="modal fade" id="ayahReflectionModal" tabindex="-1" aria-labelledby="reflectionModalLabel"
                aria-hidden="true" data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
                    <div class="modal-content reflection-modal">
                        <div class="modal-header">
                            <h6 class="modal-title" id="reflectionModalLabel">
                                <b>Sacred Reflection</b>
                            </h6>
                            <button type="button" class="btn-close" @click="hideReflectionModal"
                                aria-label="Close reflection modal"></button>
                        </div>
                        <div class="modal-body pt-0">
                            <div class="reflection-intro">
                                <p class="reflection-intro-title">Why reflection matters</p>
                                <p class="reflection-intro-copy">
                                    Capture what the ayah stirs in your heart. Returning to these notes keeps guidance
                                    close, deepens remembrance, and turns reading into lived practice.
                                </p>
                            </div>
                            <form class="d-flex flex-column gap-3 mt-3" @submit.prevent="submitReflectionForm"
                                novalidate>
                                <div v-if="reflectionSuccessMessage"
                                    class="reflection-success-banner reflection-success-top">
                                    <i class="bi bi-check-circle-fill"></i>
                                    <span>{{ reflectionSuccessMessage }}</span>
                                </div>
                                <div>
                                    <label class="form-label fw-bold mb-1 medium-label">Title</label>
                                    <input type="text" class="form-control form-control-lg"
                                        v-model="reflectionForm.subject"
                                        placeholder="Give this reflection a guiding intention" required />
                                </div>
                                <div>
                                    <label class="form-label fw-bold mb-1 medium-label">Message</label>
                                    <textarea class="form-control form-control-lg" v-model="reflectionForm.message"
                                        rows="5" :minlength="reflectionMessageMinLength"
                                        placeholder="Type how this verse moved you today..." required></textarea>
                                    <div class="d-flex justify-content-between align-items-center mt-2">
                                        <small class="text-muted">Message must be at least {{ reflectionMessageMinLength
                                        }} characters.</small>
                                        <span class="text-muted small">{{ (reflectionForm.message || '').trim().length
                                        }} characters</span>
                                    </div>
                                </div>
                                <div v-if="editingReflectionId"
                                    class="alert alert-info d-flex justify-content-between align-items-center small">
                                    <span>Editing saved reflection</span>
                                    <button type="button"
                                        class="btn btn-link btn-sm text-decoration-underline p-0 small"
                                        @click="cancelReflectionEdit">Cancel edit</button>
                                </div>
                                <div class="note-suggestions" :class="{ collapsed: carouselCollapsed }">
                                    <div
                                        class="note-suggestions-header d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                            <span class="fw-semibold text-dark me-2">Message prompts</span>
                                            <small class="text-muted">Tap to adapt</small>
                                        </div>
                                        <button type="button" class="btn btn-ghost p-0 small"
                                            @click="carouselCollapsed = !carouselCollapsed">
                                            <i class="bi"
                                                :class="carouselCollapsed ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                                            {{ carouselCollapsed ? 'show prompts' : 'collapse' }}
                                        </button>
                                    </div>
                                    <div class="suggestion-marquee-stack">
                                        <div v-for="(rowPrompts, rowIndex) in reflectionMessagePromptRows"
                                            :key="`row-${rowIndex}`" class="suggestion-marquee-row">
                                            <div class="suggestion-marquee">
                                                <div class="suggestion-track"
                                                    :class="{ 'is-paused': carouselCollapsed }"
                                                    :style="suggestionTrackStyle(rowIndex + 1)">
                                                    <div class="suggestion-track-group" :aria-hidden="false">
                                                        <button type="button" class="suggestion-pill light"
                                                            v-for="(prompt, idx) in rowPrompts"
                                                            :key="`msg-${rowIndex}-${idx}`"
                                                            @click="applyMessageSuggestion(prompt.text)">
                                                            <span class="lead">{{ prompt.icon }}</span>
                                                            <span>{{ prompt.text }}</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="carouselCollapsed"
                                    class="note-suggestions-collapsed d-flex justify-content-between align-items-center">
                                    <span class="text-muted small">Message prompts are hidden</span>
                                    <button type="button" class="btn note-suggestions-toggle p-0"
                                        @click="carouselCollapsed = false">
                                        <i class="bi bi-chevron-down me-1"></i>
                                        Show prompts
                                    </button>
                                </div>
                                <div v-if="reflectionErrorMessage" class="alert alert-danger py-2 small">
                                    {{ reflectionErrorMessage }}
                                </div>
                                <div v-if="currentAyahReflections.length"
                                    class="reflection-history reflection-history-card mt-4">
                                    <div class="reflection-history-header">
                                        <span class="reflection-history-title">
                                            <i class="bi bi-journal-text me-1 reflection-title-icon"
                                                aria-hidden="true"></i>
                                            Saved reflections
                                        </span>
                                        <span class="reflection-history-count">
                                            {{ currentAyahReflections.length }} {{ currentAyahReflections.length === 1 ?
                                                'reflection' : 'reflections' }}
                                        </span>
                                    </div>
                                    <div class="reflection-history-list">
                                        <article v-for="(note, index) in currentAyahReflections" :key="note.id || index"
                                            class="reflection-history-entry">
                                            <p class="reflection-history-subject">
                                                {{ note.subject || 'Untitled reflection' }}
                                            </p>
                                            <p class="reflection-history-message">
                                                {{ note.message }}
                                            </p>
                                            <div class="reflection-history-entry-actions">
                                                <button type="button" class="btn reflection-action edit-action"
                                                    @click="startEditingReflection(note, index)">
                                                    <i class="bi bi-pencil" aria-hidden="true"></i>
                                                    <span>Edit</span>
                                                </button>
                                                <button type="button" class="btn reflection-action delete-action"
                                                    @click="deleteReflection(note, index)">
                                                    <i class="bi bi-trash" aria-hidden="true"></i>
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                                <div class="modal-footer justify-content-end border-0 p-0 mt-2 gap-2 small-actions">
                                    <button type="button" class="btn btn-outline-secondary btn-lg"
                                        @click="hideReflectionModal">
                                        Cancel
                                    </button>
                                    <button type="submit" class="btn btn-lg btn-primary ms-2"
                                        :disabled="!canSubmitReflection || isSavingReflection">
                                        <span v-if="isSavingReflection" class="spinner-border spinner-border-sm me-2"
                                            role="status" aria-hidden="true"></span>
                                        Save reflection
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <!-- Global Custom Audio Player -->
        <teleport to="body">
            <div v-if="bottomAudioPlayerEnabled && showAudioPlayer && !isSingleWordPreviewActive" class="audio-player-container">
                <div class="custom-audio-player">
                    <div class="controls">
                        <button @click="rewindAudio(currentlyPlayingIndex)" class="control-btn" title="Rewind"
                            aria-label="Rewind 15 seconds">
                            <i class="bi bi-skip-backward-fill"></i>
                        </button>
                        <button @click="toggleAudioPlayer(currentlyPlayingIndex)" class="control-btn play-pause"
                            title="Play/Pause" aria-label="Play or Pause">
                            <i :class="isAudioPlaying[currentlyPlayingIndex]
                                ? 'bi bi-pause-fill'
                                : 'bi bi-play-fill'
                                "></i>
                        </button>
                        <button @click="fastForwardAudio(currentlyPlayingIndex)" class="control-btn"
                            title="Fast Forward" aria-label="Fast forward 20 seconds">
                            <i class="bi bi-skip-forward-fill"></i>
                        </button>
                        <button @click="stopAudio(currentlyPlayingIndex)" class="control-btn" title="Stop"
                            aria-label="Stop">
                            <i class="bi bi-stop-fill"></i>
                        </button>
                        <button @click="toggleVolume" class="control-btn" title="Volume"
                            aria-label="Toggle volume slider">
                            <i class="bi" :class="`bi-volume-${volume > 0.5
                                ? 'up'
                                : volume > 0
                                    ? 'down'
                                    : 'mute'
                                }-fill`"></i>
                        </button>
                        <button @click="cyclePlaybackSpeed" class="control-btn speed-control"
                            :title="'Speed: ' + playbackSpeed + 'x'">
                            <i class="bi bi-speedometer2" :style="{
                                color:
                                    playbackSpeed !== 1
                                        ? '#ff6b6b'
                                        : '#ccc',
                            }"></i>
                            <span class="speed-indicator">{{ playbackSpeed }}x</span>
                        </button>
                        <button @click="toggleRepeat" class="control-btn repeat-control" :title="repeatCurrent
                            ? 'Repeat current ayah: on'
                            : 'Repeat current ayah: off'
                            " :aria-pressed="repeatCurrent" aria-label="Toggle repeat current ayah">
                            <i class="bi bi-arrow-repeat" :style="{
                                color: repeatCurrent ? '#00bfa6' : '#ccc',
                            }"></i>
                        </button>
                        <button
                            @click="toggleAudioPlayerQueuePanel"
                            class="control-btn"
                            :title="showAudioPlayerQueuePanel ? 'Hide queue' : 'Show queue'"
                            :aria-expanded="showAudioPlayerQueuePanel ? 'true' : 'false'"
                            aria-label="Toggle audio queue panel">
                            <i class="bi bi-music-note-list"></i>
                            <span v-if="audioPlayerQueueCount" class="speed-indicator">{{ audioPlayerQueueCount }}</span>
                        </button>
                        <div v-if="showVolumeBar" class="volume-bar-container">
                            <input type="range" v-model="volume" min="0" max="1" step="0.1" @input="updateVolume"
                                class="volume-slider" />
                        </div>
                        <span class="time" aria-live="polite">{{
                            formatTime(
                                audioElements[currentlyPlayingIndex]
                                    ?.currentTime || 0
                            )
                        }}
                            /
                            {{
                                formatTime(
                                    audioElements[currentlyPlayingIndex]
                                        ?.duration || 0
                                )
                            }}</span>
                        <button @click="closeAudioPlayer" class="control-btn" title="Close" aria-label="Close player"
                            style="margin-left: auto">
                            <i class="bi bi-x-lg mb-2"></i>
                        </button>
                    </div>
                    <div v-if="showAudioPlayerQueuePanel" class="audio-player-queue-panel">
                        <div class="audio-player-queue-header">
                            <div>
                                <strong>Queue</strong>
                                <small>{{ audioPlayerQueueCount }} item{{ audioPlayerQueueCount === 1 ? '' : 's' }}</small>
                            </div>
                            <button
                                type="button"
                                class="control-btn"
                                @click="toggleAudioQueueMinimized"
                                :title="audioQueueMinimized ? 'Expand queue' : 'Minimize queue'"
                                :aria-expanded="audioQueueMinimized ? 'false' : 'true'"
                                aria-label="Minimize or expand queue">
                                <i class="bi" :class="audioQueueMinimized ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                            </button>
                        </div>
                        <div v-show="!audioQueueMinimized">
                            <div v-if="!audioPlayerQueueCount" class="audio-player-queue-empty">
                                No queued ayahs yet.
                            </div>
                            <div
                                v-for="item in audioPlayerQueueItems"
                                :key="item.id"
                                class="audio-player-queue-item">
                                <div>
                                    <strong>{{ item.title }}</strong>
                                    <div>{{ item.description }}</div>
                                </div>
                                <div class="audio-player-queue-item-actions">
                                    <button
                                        type="button"
                                        class="control-btn"
                                        @click="playAudioQueueItem(item.id)"
                                        title="Play queued item"
                                        aria-label="Play queued item">
                                        <i class="bi bi-play-fill"></i>
                                    </button>
                                    <button
                                        v-if="item.source === 'manual'"
                                        type="button"
                                        class="control-btn"
                                        @click="removeAudioQueueItem(item.id)"
                                        title="Remove queued item"
                                        aria-label="Remove queued item">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            </div>
                            <div v-if="audioPlayerQueue.length" class="audio-player-queue-item-actions">
                                <button type="button" class="control-btn" @click="clearAudioPlayerQueue" title="Clear queue" aria-label="Clear queue">
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="progress-bar" role="progressbar" aria-label="Audio playback progress" :aria-valuemin="0"
                        :aria-valuemax="100" :aria-valuenow="progress[currentlyPlayingIndex] || 0" :aria-valuetext="`Progress ${Math.round(
                            progress[currentlyPlayingIndex] || 0
                        )} percent`" @click="seekToPosition" @mousedown.prevent="onProgressDown"
                        @touchstart.prevent.passive="onProgressDown" ref="progressBar">
                        <div class="progress" :style="{
                            width: progress[currentlyPlayingIndex] + '%',
                        }"></div>
                        <div class="audio-visualizer" ref="visualizer">
                            <div v-for="(bar, index) in visualizerBars" :key="index" class="visualizer-bar" :style="{
                                height: bar + '%',
                                animationDelay: index * 0.1 + 's',
                            }"></div>
                        </div>
                    </div>
                    <div v-if="false" class="ayah-scrollbar" role="group" aria-label="Surah verse navigator">
                        <span class="ayah-scrollbar-label">Ayah</span>
                        <input class="ayah-scrollbar-input" type="range" min="1" :max="Math.max(totalItems, 1)"
                            :value="ayahScrubValue" @input="onAyahScrubInput" @change="onAyahScrubChange"
                            :aria-valuemin="1" :aria-valuemax="Math.max(totalItems, 1)" :aria-valuenow="ayahScrubValue"
                            :aria-valuetext="`Ayah ${ayahScrubValue} of ${Math.max(totalItems, 1)}`" />
                        <span class="ayah-scrollbar-count">{{ ayahScrubValue }} / {{ Math.max(totalItems, 1) }}</span>
                    </div>
                </div>
            </div>
        </teleport>
        <button
            v-show="showScrollTop"
            @click="scrollToTop"
            class="surah-scroll-top"
            aria-label="Scroll to top">
            <i class="bi bi-arrow-up"></i>
        </button>
    </div>
</template>
<script src="../scripts/SuratComponent.script.js"></script>
<style scoped src="../styles/SuratComponent.style.css"></style>
