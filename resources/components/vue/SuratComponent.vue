<template>
    <div class="container surat-premium"
        :class="{
            'has-audio-player': bottomAudioPlayerEnabled && showAudioPlayer && !isSingleWordPreviewActive,
            'has-sidebar': !isMemorisationToolbarVisible,
            'sidebar-collapsed': sidebarCollapsed && !isMemorisationToolbarVisible,
            'memorisation-offcanvas-open': isMemorisationToolbarVisible,
            'mobile-toolbar-pinned': isTabletOrMobile && isToolbarPinned,
            'mobile-toolbar-expanded': isTabletOrMobile && isToolbarPinned && isMobileToolbarExpanded,
            'mobile-compact-layout': isTabletOrMobile,
            'reading-fullscreen': isReadingFullscreen,
            'deep-focus-mode': isDeepFocusMode,
            'surat-theme-dark': isDarkTheme,
            'blur-next-ayah-enabled': isMemorisationToolbarVisible && isBlurNextAyahEnabled,
            'memorisation-mode': isMemorisationModeActive,
            'performance-optimized': isPerformanceModeEnabled
        }"
        :style="quranFontStyle"
        role="main" aria-label="Quran Explorer">
        <div class="row justify-content-center text-center mb-3 reading-fullscreen-chrome quran-reader-hero">
            <div class="col-lg-9 col-xl-8">
                <h1 class="display-5 fw-bold">The Holy Quran</h1>
            </div>
        </div>
        <div
            v-if="desktopSurahContext.englishName || desktopSurahContext.arabicName"
            class="continue-surah-container mb-3">
            <div class="row g-3 justify-content-center continue-surah-row">
            <div class="col-12 col-md-12">
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
                        <div class="quran-toolbar-surah-identity-en d-inline-flex align-items-center text-start">
                            <span class="quran-toolbar-surah-identity-en-main d-inline-flex align-items-center flex-nowrap">
                                <span
                                    v-if="desktopSurahContext.number"
                                    class="quran-toolbar-surah-identity-number">
                                    {{ desktopSurahContext.number }}.
                                </span>
                                <span class="quran-toolbar-surah-identity-title">
                                    {{ desktopSurahContext.englishName }}
                                </span>
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
            <div class="col-12 col-xl-10">
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
                        v-if="isTabletOrMobile && isDeepFocusMode && !isMemorisationToolbarVisible"
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
                            :class="{
                                'has-settings-btn': !isMemorisationToolbarVisible,
                                'has-theme-toggle': true
                            }">
                            <div class="advanced-quran-mobile-select-shell">
                                <label class="advanced-quran-mobile-select-label" for="searchSurahDropdown">
                                    Jump to surah
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
                            </div>
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
                                class="btn advanced-quran-mobile-icon-btn advanced-quran-mobile-theme-btn"
                                :class="{ 'is-active': isDarkTheme }"
                                :aria-pressed="isDarkTheme ? 'true' : 'false'"
                                :aria-label="isDarkTheme
                                    ? 'Switch to light mode for the Surat page'
                                    : 'Switch to dark mode for the Surat page'"
                                :title="isDarkTheme
                                    ? 'Switch to light mode'
                                    : 'Switch to dark mode'"
                                @click="toggleSuratTheme">
                                <i
                                    class="bi"
                                    :class="isDarkTheme ? 'bi-sun-fill' : 'bi-moon-stars-fill'"
                                    aria-hidden="true"></i>
                            </button>
                            <button
                                v-if="!isMemorisationToolbarVisible"
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
                            <div v-if="!isMemorisationToolbarVisible" class="advanced-quran-mobile-select-grid">
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

                            <div class="advanced-quran-mobile-action-grid">
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-memorisation"
                                    @click="toggleMemorisationToolbar"
                                    aria-controls="memorisationOffcanvas"
                                    :aria-label="isMemorisationOffcanvasVisible ? 'Close memorisation tools' : 'Open memorisation tools'"
                                    :class="{ 'is-active': isMemorisationToolbarVisible }"
                                    :title="isMemorisationOffcanvasVisible ? 'Close memorisation tools.' : 'Open memorisation tools to support repetition, focus, and revision.'">
                                    <i class="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">{{ memorisationToolbarButtonLabel }}</span>
                                </button>
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
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
                                    class="btn advanced-quran-mobile-action-btn"
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
                                    <span class="advanced-quran-mobile-action-btn-state">
                                        {{ isTransliterationAllEnabled ? "On" : "Off" }}
                                    </span>
                                </button>
                                <button
                                    v-if="!isMemorisationToolbarVisible"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    :class="{ 'is-enabled': voiceCommandsEnabled }"
                                    @click="toggleVoiceCommands"
                                    :disabled="!speechRecognitionSupported"
                                    :title="!speechRecognitionSupported
                                        ? 'Voice commands are not supported in this browser.'
                                        : voiceCommandsEnabled
                                            ? 'Voice commands are on. Try saying: Bismillah, open surah 2 ayah 255.'
                                            : 'Turn on voice commands. Example: Bismillah, open surah 2 ayah 255.'"
                                    :aria-label="voiceCommandsEnabled
                                        ? 'Turn voice commands off'
                                        : 'Turn voice commands on'">
                                    <i
                                        class="bi"
                                        :class="voiceCommandsEnabled
                                            ? (voiceCommandListening ? 'bi-mic-fill' : 'bi-mic')
                                            : 'bi-mic-mute-fill'"
                                        aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Voice commands</span>
                                    <span class="advanced-quran-mobile-action-btn-state">
                                        {{ voiceCommandsEnabled ? "On" : "Off" }}
                                    </span>
                                </button>
                                <button
                                    v-if="!isMemorisationToolbarVisible"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn voice-command-guide-control-btn"
                                    data-bs-toggle="modal"
                                    :data-bs-target="`#${voiceCommandGuideModalId}`"
                                    aria-label="Open voice command guide"
                                    title="Open voice command guide">
                                    <i class="bi bi-question-circle" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Voice guide</span>
                                </button>
                                <button
                                    v-if="isMemorisationToolbarVisible"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-open-tools"
                                    @click="openMemorisationOffcanvas"
                                    aria-label="Open session tools panel"
                                    title="Open Session Tools for pacing, repeat-after-reciter, and display controls">
                                    <i class="bi bi-layout-sidebar-inset" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Open Session Tools Panel</span>
                                </button>
                                <button
                                    v-if="isMemorisationToolbarVisible && memorisationSessionHistoryEnabled"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="openSessionHistoryModal()"
                                    aria-label="Open session history"
                                    title="Open session history">
                                    <i class="bi bi-clock-history" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">History</span>
                                </button>
                                <button
                                    v-if="!isMemorisationToolbarVisible"
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
                                    v-if="!isMemorisationToolbarVisible"
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
                                    v-if="!isMemorisationToolbarVisible"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click.stop="openFontPicker"
                                    aria-label="Choose Quranic fonts"
                                    title="Open Quran font options to change how Arabic text is displayed.">
                                    <i class="fas fa-font" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Font</span>
                                </button>
                                <button
                                    v-if="!isMemorisationToolbarVisible"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="openGestureGuideModal"
                                    aria-label="Open swipe and tap gestures guide"
                                    title="Open swipe and tap gestures guide">
                                    <i class="bi bi-hand-index-thumb-fill" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Gestures</span>
                                </button>
                                <button
                                    v-if="!isMemorisationToolbarVisible"
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn"
                                    @click="openSuratOnboarding"
                                    aria-label="Open surat onboarding guide"
                                    title="Open onboarding guide">
                                    <i class="fas fa-compass" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Guide</span>
                                </button>
                                <button
                                    v-if="!isMemorisationToolbarVisible"
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
                <span class="quran-toolbar-label"><b>{{ memorisationControlsLabel }}</b></span>
                <div class="quran-toolbar-separator"></div>
                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-memorisation"
                    @click="toggleMemorisationToolbar"
                    aria-controls="memorisationOffcanvas"
                    :class="{
                        'is-active': isMemorisationToolbarVisible,
                        'is-attention': !isMemorisationToolbarVisible
                    }"
                    :aria-label="isMemorisationOffcanvasVisible ? 'Close memorisation tools' : 'Open memorisation tools'">
                    <i class="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">{{ memorisationToolbarButtonLabel }}</span>
                </button>
                <button
                    v-if="isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-open-tools"
                    @click="openMemorisationOffcanvas"
                    aria-label="Open session tools panel">
                    <i class="bi bi-layout-sidebar-inset" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Open Session Tools Panel</span>
                </button>
                <button
                    v-if="isMemorisationToolbarVisible && memorisationSessionHistoryEnabled"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-history"
                    @click="openSessionHistoryModal()"
                    aria-label="Open session history">
                    <i class="bi bi-clock-history" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">History</span>
                </button>
                <div v-if="!isMemorisationToolbarVisible" class="quran-toolbar-reciter">
                    <label class="visually-hidden" for="toolbarReciterSelect">
                        Select audio reciter
                    </label>
                    <select
                        id="toolbarReciterSelect"
                        class="form-select quran-toolbar-select"
                        v-model="selectedReciter"
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
                    aria-label="View tajweed rules">
                    <i class="bi bi-palette-fill" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Tajweed rules</span>
                </button>

                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-toggle"
                    :class="{ 'is-enabled': isTranslationAllEnabled }"
                    @click="toggleToolbarTranslation"
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
                    :aria-label="isTransliterationAllEnabled
                        ? 'Turn transliteration off for all ayahs'
                        : 'Turn transliteration on for all ayahs'">
                    <i class="bi bi-input-cursor-text" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Transliteration</span>
                    <span class="quran-toolbar-btn-state">{{ isTransliterationAllEnabled ? "On" : "Off" }}</span>
                </button>
                <button
                    v-if="!isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-toggle"
                    :class="{ 'is-enabled': voiceCommandsEnabled }"
                    @click="toggleVoiceCommands"
                    :disabled="!speechRecognitionSupported"
                    :aria-label="voiceCommandsEnabled
                        ? 'Turn voice commands off'
                        : 'Turn voice commands on'">
                    <i
                        class="bi"
                        :class="voiceCommandsEnabled
                            ? (voiceCommandListening ? 'bi-mic-fill' : 'bi-mic')
                            : 'bi-mic-mute-fill'"
                        aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Voice commands</span>
                    <span class="quran-toolbar-btn-state">{{ voiceCommandsEnabled ? "On" : "Off" }}</span>
                </button>
                <button
                    v-if="!isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn voice-command-guide-control-btn"
                    data-bs-toggle="modal"
                    :data-bs-target="`#${voiceCommandGuideModalId}`"
                    aria-label="Open voice command guide">
                    <i class="bi bi-question-circle" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Voice guide</span>
                </button>
                <button
                    type="button"
                    class="quran-toolbar-btn"
                    @click="openTranslationCompareModal"
                    aria-label="Compare English translations side by side">
                    <i class="bi bi-columns-gap" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Compare translations</span>
                </button>
                <button
                    v-if="!isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-deep-focus"
                    :class="{ 'is-active': isDeepFocusMode }"
                    @click="toggleDeepFocusMode"
                    :aria-label="isDeepFocusMode ? 'Exit deep focus mode' : 'Enter deep focus mode'">
                    <i class="bi bi-bullseye" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Deep focus mode</span>
                    <span class="quran-toolbar-btn-state">{{ isDeepFocusMode ? "On" : "Off" }}</span>
                </button>
                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-toggle quran-toolbar-btn-theme"
                    :class="{ 'is-enabled': isDarkTheme }"
                    :aria-pressed="isDarkTheme ? 'true' : 'false'"
                    :aria-label="isDarkTheme
                        ? 'Switch to light mode for the Surat page'
                        : 'Switch to dark mode for the Surat page'"
                    @click="toggleSuratTheme">
                    <i
                        class="bi"
                        :class="isDarkTheme ? 'bi-sun-fill' : 'bi-moon-stars-fill'"
                        aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Dark mode</span>
                    <span class="quran-toolbar-btn-state">{{ isDarkTheme ? "On" : "Off" }}</span>
                </button>

                <button
                    v-if="!isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn"
                    @click="toggleCustomPlaylistPanel"
                    :aria-expanded="showCustomPlaylistPanel ? 'true' : 'false'"
                    aria-label="Open custom playlist library">
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
                    class="quran-toolbar-btn quran-toolbar-btn-fullscreen"
                    :class="{ 'is-active': isReadingFullscreen }"
                    @click="toggleReadingFullscreen"
                    :aria-label="isReadingFullscreen
                        ? 'Minimize / Exit Full Screen'
                        : 'Enter full screen Quran reading mode'">
                    <i class="bi"
                        :class="isReadingFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'"
                        aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Full screen</span>
                </button>

                <button
                    v-if="!isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-font"
                    @click.stop="openFontPicker"
                    aria-label="Choose Quranic fonts">
                    <i class="fas fa-font" aria-hidden="true"></i>
                </button>
                <button
                    v-if="hasPinnedAyahs && isPinnedSectionHidden && !isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-pinned-restore"
                    @click="showPinnedSection"
                    aria-label="Show pinned favourite ayat">
                    <i class="bi bi-pin-angle-fill" aria-hidden="true"></i>
                </button>

                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-info"
                    @click="openSurahInfo(currentSurahInfo)"
                    :disabled="!currentSurahInfo"
                    aria-label="Open surah information">
                    <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Surah info</span>
                </button>

                <button
                    v-if="!isMemorisationToolbarVisible"
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
                                : surahDownloadReadyAriaLabel">
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
                    v-if="!isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-onboarding"
                    @click="openSuratOnboarding"
                    aria-label="Open surat onboarding guide">
                    <i class="fas fa-compass" aria-hidden="true"></i>
                </button>

                <button
                    v-if="!isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon"
                    @click="openGestureGuideModal"
                    aria-label="Open swipe and tap gestures guide">
                    <i class="bi bi-hand-index-thumb-fill" aria-hidden="true"></i>
                </button>
                
                <button
                    v-if="!isMemorisationToolbarVisible"
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-icon quran-toolbar-btn-settings"
                    data-bs-toggle="modal"
                    data-bs-target="#surahSettingsModal"
                    @click="prepareSettingsDraft"
                    aria-label="Open display settings">
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
                            >
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

        <!-- Memorisation Offcanvas -->
        <teleport to="body">
            <div
                class="offcanvas offcanvas-end surah-offcanvas memorisation-offcanvas"
                :class="{ 'surat-dark-modal': isDarkTheme }"
                tabindex="-1"
                id="memorisationOffcanvas"
                ref="memorisationOffcanvas"
                data-bs-scroll="false"
                data-bs-backdrop="true"
                data-bs-keyboard="true"
                aria-labelledby="memorisationOffcanvasLabel">
                <div class="offcanvas-header">
                    <h4 class="offcanvas-title" id="memorisationOffcanvasLabel"><b>Memorisation Tools</b></h4>
                    <button type="button" class="btn-close text-reset" @click="closeMemorisationToolsPanel" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="surah-offcanvas-section memorisation-offcanvas-focus">
                        <div class="memorisation-offcanvas-focus-head">
                            <h5 class="memorisation-offcanvas-focus-title mb-1">Memorisation Focus</h5>
                            <p class="memorisation-offcanvas-focus-subtitle mb-0">Focus on one ayah, then advance with calm repetition.</p>
                        </div>
                        <div v-if="desktopSurahContext.englishName" class="memorisation-offcanvas-focus-meta">
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

                    <section
                        class="surah-offcanvas-section memorisation-offcanvas-panel memorisation-hifz-plan-launch"
                        :class="{ 'is-collapsed': isHifzPlanPanelCollapsed }"
                        aria-label="Hifz plan quick access">
                        <div class="memorisation-hifz-plan-launch-head">
                            <div>
                                <h5 class="memorisation-offcanvas-section-title">Hifz Plan</h5>
                                <p class="memorisation-offcanvas-section-subtitle mb-0">
                                    Build structured memorization plans with automatic daily targets and rescheduling.
                                </p>
                            </div>
                            <div class="memorisation-hifz-plan-launch-head-actions">
                                <button
                                    type="button"
                                    class="btn memorisation-hifz-plan-tool-btn memorisation-hifz-plan-tool-btn-primary"
                                    :disabled="hasHifzPlans && (!activeHifzPlanTodayEntry || activeHifzPlanTodayEntry.isRestDay)"
                                    @click="hasHifzPlans ? openActiveHifzTodayTarget({ closeOffcanvas: true, closeDashboard: true }) : openHifzPlanWizard()">
                                    {{ hasHifzPlans ? "Start today's target" : "Create new plan" }}
                                </button>
                                <button
                                    type="button"
                                    class="btn memorisation-panel-seed-btn"
                                    @click="seedHifzPlans({ announce: true })"
                                    aria-label="Restore starter Hifz plans"
                                    title="Restore starter plans">
                                    <i class="bi bi-stars" aria-hidden="true"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn memorisation-hifz-plan-collapse-btn"
                                    @click="toggleHifzPlanPanelCollapsed"
                                    :aria-label="isHifzPlanPanelCollapsed ? 'Expand Hifz Plan' : 'Collapse Hifz Plan'"
                                    :title="isHifzPlanPanelCollapsed ? 'Expand Hifz Plan' : 'Collapse Hifz Plan'"
                                    :aria-expanded="(!isHifzPlanPanelCollapsed).toString()">
                                    <span class="memorisation-preset-count" aria-hidden="true">
                                        {{ hifzPlansSorted.length }}
                                    </span>
                                    <i
                                        class="bi"
                                        :class="isHifzPlanPanelCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'"
                                        aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        <div v-show="!isHifzPlanPanelCollapsed" class="memorisation-hifz-plan-launch-body">
                            <div v-if="hasHifzPlans" class="memorisation-hifz-plan-summary-wrap">
                                <div class="memorisation-hifz-plan-plan-row">
                                    <label class="memorisation-offcanvas-field mb-0">
                                        <span class="form-label surah-offcanvas-label">Active plan</span>
                                        <select
                                            class="form-select surah-offcanvas-select"
                                            v-model="hifzActivePlanId"
                                            @change="onHifzActivePlanChanged"
                                            aria-label="Select active Hifz plan">
                                            <option
                                                v-for="plan in hifzPlansSorted"
                                                :key="plan.id"
                                                :value="plan.id">
                                                {{ plan.name }}
                                            </option>
                                        </select>
                                    </label>
                                    <button
                                        type="button"
                                        class="btn memorisation-hifz-plan-delete-btn"
                                        @click="deleteActiveHifzPlan"
                                        aria-label="Delete active Hifz plan"
                                        title="Delete active plan">
                                        <i class="bi bi-trash3" aria-hidden="true"></i>
                                    </button>
                                </div>
                                    <button
                                        type="button"
                                        class="memorisation-hifz-plan-summary-card"
                                        @click="openHifzPlanDashboard"
                                        aria-label="Open current Hifz plan dashboard">
                                    <div class="memorisation-hifz-plan-summary-head">
                                        <div class="memorisation-hifz-plan-summary-title-row">
                                            <strong>{{ activeHifzPlan?.name || "Hifz Plan" }}</strong>
                                            <span
                                                v-if="activeHifzPlanIsSeeded"
                                                class="memorisation-demo-badge memorisation-demo-badge--inline">
                                                Starter
                                            </span>
                                        </div>
                                        <small>{{ activeHifzPlan?.targetLabel || "" }}</small>
                                    </div>
                                    <div class="memorisation-hifz-plan-summary-progress">
                                        <span>{{ activeHifzPlanProgressLabel }}</span>
                                        <span>{{ activeHifzPlanProgressPercent }}%</span>
                                    </div>
                                    <div class="progress memorisation-hifz-plan-progress-track" role="progressbar" aria-label="Hifz plan progress" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="activeHifzPlanProgressPercent">
                                        <div
                                            class="progress-bar memorisation-hifz-plan-progress-bar"
                                            :style="{ width: `${activeHifzPlanProgressPercent}%` }"></div>
                                    </div>
                                    <p class="memorisation-hifz-plan-summary-target mb-0">
                                        {{ activeHifzPlanTodayTargetSentence }}
                                    </p>
                                    <p class="memorisation-hifz-plan-summary-ahead-behind mb-0">
                                        {{ activeHifzPlanAheadBehindLabel }}
                                    </p>
                                </button>
                                <p class="memorisation-hifz-plan-summary-hint mb-0">
                                    Tap the card to manage schedule and calendar.
                                </p>
                                <p class="memorisation-hifz-plan-sync-note mb-0">
                                    Sync active: Daily Goals and Review Queue update automatically from your current plan.
                                </p>
                                <div v-if="hasOnlySeededHifzPlans" class="memorisation-starter-note">
                                    Starter plans are already loaded. Pick one and adjust or replace it any time.
                                </div>
                                <div v-if="hasOnlySeededHifzPlans" class="memorisation-hifz-plan-starter-grid">
                                    <button
                                        v-for="plan in seededHifzPlans"
                                        :key="`starter-plan-${plan.id}`"
                                        type="button"
                                        class="memorisation-hifz-plan-starter-btn"
                                        :class="{ 'is-active': hifzActivePlanId === plan.id }"
                                        @click="activateHifzPlan(plan.id)">
                                        <span class="memorisation-demo-badge memorisation-demo-badge--inline">Starter</span>
                                        <strong>{{ plan.name }}</strong>
                                        <small>{{ plan.targetLabel }}</small>
                                    </button>
                                </div>
                            </div>
                            <div v-else class="memorisation-hifz-plan-empty-state">
                                <p class="memorisation-hifz-plan-empty mb-0">
                                    No plans yet. Load starter plans or create your own schedule from scratch.
                                </p>
                                <div class="memorisation-empty-actions">
                                    <button
                                        type="button"
                                        class="btn memorisation-hifz-plan-tool-btn memorisation-hifz-plan-tool-btn-primary"
                                        @click="seedHifzPlans({ announce: true })">
                                        Load starter plans
                                    </button>
                                    <button
                                        type="button"
                                        class="btn memorisation-hifz-plan-tool-btn"
                                        @click="openHifzPlanWizard()">
                                        Create my own
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="surah-offcanvas-section memorisation-offcanvas-panel memorisation-preset-panel" aria-label="One-click presets">
                        <div class="memorisation-preset-panel-head">
                            <div>
                                <h5 class="memorisation-offcanvas-section-title">One-Click Presets</h5>
                                <p class="memorisation-offcanvas-section-subtitle mb-0">
                                    Save this full setup and tap any preset card to load instantly.
                                </p>
                            </div>
                            <div class="memorisation-preset-panel-head-actions">
                                <button
                                    type="button"
                                    class="btn memorisation-preset-collapse-btn"
                                    @click="toggleMemorisationPresetPanelCollapsed"
                                    :aria-label="isMemorisationPresetPanelCollapsed ? 'Expand presets' : 'Collapse presets'"
                                    :title="isMemorisationPresetPanelCollapsed ? 'Expand presets' : 'Collapse presets'"
                                    :aria-expanded="(!isMemorisationPresetPanelCollapsed).toString()">
                                    <span class="memorisation-preset-count" aria-hidden="true">
                                        {{ sortedMemorisationPresets.length }}
                                    </span>
                                    <i
                                        class="bi"
                                        :class="isMemorisationPresetPanelCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'"
                                        aria-hidden="true"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn memorisation-panel-seed-btn"
                                    @click="seedMemorisationPresets({ announce: true })"
                                    aria-label="Restore starter one-click presets"
                                    title="Restore starter presets">
                                    <i class="bi bi-stars" aria-hidden="true"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn memorisation-preset-create-icon"
                                    @click="openMemorisationPresetNameEditor()"
                                    aria-label="Create a new one-click preset"
                                    title="Create preset">
                                    <i class="bi bi-plus-lg" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        <div v-show="!isMemorisationPresetPanelCollapsed" class="memorisation-preset-panel-body">
                            <div v-if="isMemorisationPresetEditorVisible" class="memorisation-preset-editor">
                                <label class="form-label surah-offcanvas-label mb-0" for="memorisationPresetNameInput">
                                    {{ memorisationPresetEditorMode === "rename" ? "Rename preset" : "Preset name" }}
                                </label>
                                <input
                                    id="memorisationPresetNameInput"
                                    ref="memorisationPresetNameInput"
                                    type="text"
                                    class="form-control surah-offcanvas-input memorisation-preset-editor-input"
                                    v-model="memorisationPresetEditorName"
                                    maxlength="60"
                                    placeholder="e.g. Fajr Routine"
                                    @keydown.enter.prevent="submitMemorisationPresetNameEditor"
                                    @keydown.esc.prevent="closeMemorisationPresetNameEditor" />
                                <p v-if="memorisationPresetEditorError" class="memorisation-preset-editor-error mb-0" role="status" aria-live="polite">
                                    {{ memorisationPresetEditorError }}
                                </p>
                                <div class="memorisation-preset-editor-actions">
                                    <button
                                        type="button"
                                        class="btn memorisation-preset-editor-btn"
                                        @click="closeMemorisationPresetNameEditor">
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        class="btn memorisation-preset-editor-btn memorisation-preset-editor-btn-submit"
                                        @click="submitMemorisationPresetNameEditor">
                                        {{ memorisationPresetEditorMode === "rename" ? "Update" : "Save" }}
                                    </button>
                                </div>
                            </div>

                            <div v-if="hasMemorisationPresets" class="memorisation-preset-list-wrap">
                                <div v-if="hasOnlySeededMemorisationPresets" class="memorisation-starter-note">
                                    Starter presets are ready. Tap any card to begin, then rename or overwrite it later.
                                </div>
                                <div class="memorisation-preset-list">
                                <article
                                    v-for="preset in sortedMemorisationPresets"
                                    :key="preset.id"
                                    class="memorisation-preset-card"
                                    :class="{
                                        'is-favorite': preset.favorite,
                                        'is-active': memorisationActivePresetId === preset.id
                                    }"
                                    role="button"
                                    tabindex="0"
                                    @click="loadMemorisationPreset(preset.id)"
                                    @keydown.enter.prevent="loadMemorisationPreset(preset.id)"
                                    @keydown.space.prevent="loadMemorisationPreset(preset.id)"
                                    :aria-label="`Load preset ${preset.name}`">
                                    <div class="memorisation-preset-card-head">
                                        <div class="memorisation-preset-card-title-wrap">
                                            <strong class="memorisation-preset-card-name">{{ preset.name }}</strong>
                                            <span
                                                v-if="isSeededMemorisationPreset(preset)"
                                                class="memorisation-demo-badge memorisation-demo-badge--inline">
                                                Starter
                                            </span>
                                        </div>
                                        <div class="memorisation-preset-head-actions">
                                            <button
                                                type="button"
                                                class="btn memorisation-preset-icon-btn"
                                                :class="{ 'is-favorite': preset.favorite }"
                                                @click.stop="toggleMemorisationPresetFavorite(preset.id)"
                                                :aria-label="preset.favorite ? `Unstar preset ${preset.name}` : `Star preset ${preset.name}`"
                                                :title="preset.favorite ? 'Unstar preset' : 'Star preset'">
                                                <i class="bi" :class="preset.favorite ? 'bi-star-fill' : 'bi-star'" aria-hidden="true"></i>
                                            </button>
                                            <button
                                                type="button"
                                                class="btn memorisation-preset-icon-btn"
                                                :disabled="isMemorisationDraftSubmitting"
                                                @click.stop="openMemorisationPresetNameEditor({ presetId: preset.id })"
                                                :aria-label="`Rename preset ${preset.name}`"
                                                title="Rename preset">
                                                <i class="bi bi-pencil" aria-hidden="true"></i>
                                            </button>
                                            <button
                                                type="button"
                                                class="btn memorisation-preset-icon-btn memorisation-preset-icon-btn-delete"
                                                :disabled="isMemorisationDraftSubmitting"
                                                @click.stop="deleteMemorisationPreset(preset.id)"
                                                :aria-label="`Delete preset ${preset.name}`"
                                                title="Delete preset">
                                                <i class="bi bi-trash3" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p class="memorisation-preset-card-meta mb-0">
                                        {{ describeMemorisationPreset(preset) }}
                                    </p>
                                    <div
                                        v-if="isSeededMemorisationPreset(preset)"
                                        class="memorisation-preset-card-footer">
                                        Load this starter, then tweak anything you want.
                                    </div>
                                </article>
                                </div>
                            </div>
                            <div v-else class="memorisation-preset-empty-state">
                                <p class="memorisation-preset-empty mb-0">
                                    No presets yet. Load the starter set or save your current setup.
                                </p>
                                <div class="memorisation-empty-actions">
                                    <button
                                        type="button"
                                        class="btn memorisation-preset-editor-btn memorisation-preset-editor-btn-submit"
                                        @click="seedMemorisationPresets({ announce: true })">
                                        Load starter presets
                                    </button>
                                    <button
                                        type="button"
                                        class="btn memorisation-preset-editor-btn"
                                        @click="openMemorisationPresetNameEditor()">
                                        Create my own
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="surah-offcanvas-section memorisation-offcanvas-panel" aria-label="Session setup">
                        <h5 class="memorisation-offcanvas-section-title">Session Setup</h5>
                        <p class="memorisation-offcanvas-section-subtitle mb-0">
                            Configure your surah, range, reciter, pacing, and playback flow before your memorisation run.
                        </p>
                        <div class="memorisation-offcanvas-grid">
                            <label class="memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                <span class="form-label surah-offcanvas-label">Surah name</span>
                                <select class="form-select surah-offcanvas-select" v-model="memorisationDraft.surahNumber" @change="syncMemorisationDraftRangeForSurah">
                                    <option value="" disabled>Select surah</option>
                                    <option v-for="surah in filteredSurahs" :key="`memorisation-surah-${surah.number}`" :value="String(surah.number)">
                                        {{ surah.number }} · {{ surah.englishName }}
                                    </option>
                                </select>
                            </label>

                            <label class="memorisation-offcanvas-field">
                                <span class="form-label surah-offcanvas-label">Select reciter</span>
                                <select class="form-select surah-offcanvas-select" v-model="memorisationDraft.reciterIdentifier">
                                    <option value="" disabled>Select a reciter</option>
                                    <option v-for="reciter in recitersSorted" :key="`memorisation-draft-reciter-${reciter.identifier}`" :value="reciter.identifier">
                                        {{ reciter.englishName }}
                                    </option>
                                </select>
                            </label>

                            <label class="memorisation-offcanvas-field">
                                <span class="form-label surah-offcanvas-label">Recitation speed</span>
                                <select class="form-select surah-offcanvas-select" v-model.number="memorisationDraft.playbackSpeed">
                                    <option v-for="speed in playbackSpeeds" :key="`memorisation-draft-speed-${speed}`" :value="speed">
                                        {{ speed }}x
                                    </option>
                                </select>
                            </label>

                            <label class="memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                <span class="form-label surah-offcanvas-label">Ayah range from/to</span>
                                <div class="memorisation-offcanvas-range">
                                    <input
                                        type="number"
                                        class="form-control surah-offcanvas-input"
                                        v-model.number="memorisationDraft.rangeStart"
                                        min="1"
                                        :max="memorisationDraftMaxAyah"
                                        aria-label="Memorisation range start ayah">
                                    <span class="memorisation-offcanvas-range-separator">to</span>
                                    <input
                                        type="number"
                                        class="form-control surah-offcanvas-input"
                                        v-model.number="memorisationDraft.rangeEnd"
                                        :min="memorisationDraft.rangeStart || 1"
                                        :max="memorisationDraftMaxAyah"
                                        aria-label="Memorisation range end ayah">
                                </div>
                            </label>

                            <label class="memorisation-offcanvas-field">
                                <span class="form-label surah-offcanvas-label">Delay time per ayah (sec)</span>
                                <input
                                    type="number"
                                    class="form-control surah-offcanvas-input"
                                    v-model.number="memorisationDraft.verseDelay"
                                    min="0"
                                    max="60"
                                    aria-label="Delay time per ayah in seconds">
                            </label>

                            <label class="memorisation-offcanvas-field">
                                <span class="form-label surah-offcanvas-label">Repetitions per ayah</span>
                                <input
                                    type="number"
                                    class="form-control surah-offcanvas-input"
                                    v-model.number="memorisationDraft.repetitionCount"
                                    min="1"
                                    max="99"
                                    aria-label="Repetitions per ayah">
                            </label>

                            <label class="memorisation-offcanvas-field">
                                <span class="form-label surah-offcanvas-label">Playback mode</span>
                                <select class="form-select surah-offcanvas-select" v-model="memorisationDraft.playbackMode">
                                    <option v-for="option in playbackModeOptions" :key="`memorisation-draft-mode-${option.value}`" :value="option.value">
                                        {{ option.value === "continuous" ? "Auto-advance" : option.value === "repeat" ? "Repeat ayah" : "Manual tap" }}
                                    </option>
                                </select>
                            </label>

                            <label class="memorisation-offcanvas-field">
                                <span class="form-label surah-offcanvas-label">Quranic fonts</span>
                                <select class="form-select surah-offcanvas-select" v-model="memorisationDraft.quranFontId">
                                    <option v-if="!quranFonts.length" :value="selectedQuranFontId">
                                        {{ activeQuranFont?.label || "Current font" }}
                                    </option>
                                    <option v-for="font in quranFonts" :key="`memorisation-draft-font-${font.id}`" :value="font.id">
                                        {{ font.label }}
                                    </option>
                                </select>
                            </label>

                            <label class="memorisation-offcanvas-toggle-row memorisation-offcanvas-field memorisation-offcanvas-field--full memorisation-range-loop-field">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Loop Again After Range</strong>
                                    <small>Restart from the first ayah when this selected range is completed.</small>
                                </span>
                                <span class="form-check form-switch mb-0">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        v-model="memorisationDraft.rangeLoopEnabled"
                                        aria-label="Loop range when finished">
                                </span>
                            </label>

                            <div
                                v-if="memorisationDraft.rangeLoopEnabled"
                                class="memorisation-range-loop-settings memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                <span class="form-label surah-offcanvas-label">Delay before restart</span>
                                <div class="memorisation-range-loop-delay-row" role="group" aria-label="Delay before restart">
                                    <button
                                        v-for="seconds in memorisationRangeLoopDelayPresets"
                                        :key="`range-loop-delay-${seconds}`"
                                        type="button"
                                        class="btn memorisation-range-loop-delay-btn"
                                        :class="{ 'is-active': !memorisationDraft.rangeLoopDelayIsCustom && Number(memorisationDraft.rangeLoopDelay) === Number(seconds) }"
                                        @click="memorisationDraft.rangeLoopDelay = Number(seconds); memorisationDraft.rangeLoopDelayIsCustom = false">
                                        {{ seconds }}s
                                    </button>
                                    <button
                                        type="button"
                                        class="btn memorisation-range-loop-delay-btn"
                                        :class="{ 'is-active': memorisationDraft.rangeLoopDelayIsCustom }"
                                        @click="memorisationDraft.rangeLoopDelayIsCustom = true">
                                        Custom
                                    </button>
                                </div>
                                <label v-if="memorisationDraft.rangeLoopDelayIsCustom" class="memorisation-range-loop-custom">
                                    <span class="form-label surah-offcanvas-label">Custom delay (sec)</span>
                                    <input
                                        type="number"
                                        class="form-control surah-offcanvas-input"
                                        v-model.number="memorisationDraft.rangeLoopDelay"
                                        min="0"
                                        max="300"
                                        step="1"
                                        aria-label="Custom delay before range restart in seconds">
                                </label>
                                <label class="memorisation-offcanvas-toggle-row memorisation-offcanvas-toggle-row--nested">
                                    <span class="memorisation-offcanvas-toggle-copy">
                                        <strong>Visual countdown</strong>
                                        <small>Show a countdown before the loop restarts.</small>
                                    </span>
                                    <span class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            v-model="memorisationDraft.rangeLoopShowCountdown"
                                            aria-label="Show loop restart countdown">
                                    </span>
                                </label>
                                <label class="memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                    <span class="form-label surah-offcanvas-label">Sound alert before restart</span>
                                    <select
                                        class="form-select surah-offcanvas-select"
                                        v-model="memorisationDraft.rangeLoopAlertSound"
                                        aria-label="Sound alert before range restarts">
                                        <option value="off">Off</option>
                                        <option value="beep">Beep</option>
                                        <option value="tone">Subtle tone</option>
                                    </select>
                                </label>
                                <p
                                    v-if="isMemorisationRangeLoopCountdownVisible"
                                    class="memorisation-range-loop-countdown-preview mb-0"
                                    role="status"
                                    aria-live="polite">
                                    Restarting from ayah {{ memorisationRangeStart || 1 }} in {{ memorisationRangeLoopCountdownSeconds }}s
                                </p>
                            </div>

                            <label class="memorisation-offcanvas-toggle-row memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Test Mode</strong>
                                    <small>Focus on one ayah at a time so you can recite from memory without the next ayah giving it away.</small>
                                </span>
                                <span class="form-check form-switch mb-0">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        v-model="memorisationDraft.singleAyahFocus"
                                        aria-label="Toggle test mode">
                                </span>
                            </label>
                            <div class="memorisation-test-mode-callout memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                <div class="memorisation-test-mode-callout-copy">
                                    <span class="memorisation-test-mode-callout-badge">Recall support</span>
                                    <strong>Use this after you warm up the range.</strong>
                                    <small>Test Mode is the cleanest way to check if the ayah is really in your memory, not just on the screen.</small>
                                </div>
                                <button
                                    type="button"
                                    class="btn memorisation-test-mode-callout-btn"
                                    @click="memorisationDraft.singleAyahFocus = !memorisationDraft.singleAyahFocus">
                                    {{ memorisationDraft.singleAyahFocus ? "Turn off" : "Turn on" }}
                                </button>
                            </div>
                        </div>
                    </section>

                    <section class="surah-offcanvas-section memorisation-offcanvas-panel" aria-label="Session tools">
                        <h5 class="memorisation-offcanvas-section-title">Session Tools</h5>
                        <p class="memorisation-offcanvas-section-subtitle mb-0">
                            Turn on only the helpers you need. Most sessions work well with one or two.
                        </p>
                        <div class="memorisation-offcanvas-tool-list">
                            <label class="memorisation-offcanvas-toggle-row memorisation-offcanvas-toggle-row--with-action">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Session History</strong>
                                    <small>Auto-save finished sessions so you can look back without doing anything extra.</small>
                                </span>
                                <span class="memorisation-offcanvas-toggle-actions">
                                    <button
                                        type="button"
                                        class="btn memorisation-tool-settings-btn"
                                        aria-label="Open session history"
                                        title="Open session history"
                                        @click.stop.prevent="openSessionHistoryModal()">
                                        <i class="bi bi-clock-history" aria-hidden="true"></i>
                                    </button>
                                    <span class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            v-model="memorisationDraft.sessionHistoryEnabled"
                                            aria-label="Toggle session history">
                                    </span>
                                </span>
                            </label>
                            <div
                                v-if="memorisationDraft.sessionHistoryEnabled"
                                class="memorisation-session-history-preview memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                <div class="memorisation-session-history-preview-head">
                                    <div class="memorisation-session-history-preview-copy">
                                        <span class="memorisation-session-history-preview-eyebrow">{{ sessionHistoryPreviewEyebrow }}</span>
                                        <strong class="memorisation-session-history-preview-title">{{ sessionHistoryPreviewTitle }}</strong>
                                        <small class="d-block">{{ sessionHistoryPreviewSubtitle }}</small>
                                    </div>
                                    <button
                                        type="button"
                                        class="btn memorisation-session-history-preview-btn"
                                        @click="openSessionHistoryModal()">
                                        <i class="bi bi-clock-history" aria-hidden="true"></i>
                                        View history
                                    </button>
                                </div>
                                <div
                                    v-if="sessionHistoryPreviewEntries.length"
                                    class="memorisation-session-history-preview-list"
                                    role="list"
                                    aria-label="Recent session history preview">
                                    <button
                                        v-for="entry in sessionHistoryPreviewEntries"
                                        :key="entry.id"
                                        type="button"
                                        class="memorisation-session-history-preview-item"
                                        @click="openSessionHistoryModal(entry.id)">
                                        <span class="memorisation-session-history-preview-item-main">
                                            <span class="memorisation-session-history-preview-item-title-row">
                                                <strong>{{ formatSessionHistoryRange(entry) }}</strong>
                                                <span
                                                    v-if="isSeededSessionHistoryEntry(entry)"
                                                    class="memorisation-demo-badge memorisation-demo-badge--inline">
                                                    Starter
                                                </span>
                                            </span>
                                            <small>{{ formatSessionHistoryDateTime(entry.endedAt) }}</small>
                                        </span>
                                        <span class="memorisation-session-history-preview-item-meta">
                                            {{ formatSessionHistoryDuration(entry.durationMs, { short: true }) }}
                                        </span>
                                    </button>
                                </div>
                                <div v-else class="memorisation-session-history-preview-empty-state">
                                    <p class="memorisation-session-history-preview-empty mb-0">
                                        No saved sessions yet. Load starter history or finish a session to begin.
                                    </p>
                                    <button
                                        type="button"
                                        class="btn memorisation-session-history-preview-btn"
                                        @click="loadStarterSessionHistory({ announce: true, focusFirst: false })">
                                        <i class="bi bi-stars" aria-hidden="true"></i>
                                        Load starter history
                                    </button>
                                </div>
                            </div>
                            <label class="memorisation-offcanvas-toggle-row memorisation-offcanvas-toggle-row--with-action">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Chaining Method</strong>
                                    <small>Pick one clear flow: learn new ayat first, then smooth the joins.</small>
                                </span>
                                <span class="form-check form-switch mb-0">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        v-model="memorisationDraft.chainingMethodEnabled"
                                        aria-label="Toggle chaining method">
                                </span>
                            </label>
                            <div
                                v-if="memorisationDraft.chainingMethodEnabled"
                                class="memorisation-chaining-settings memorisation-offcanvas-field memorisation-offcanvas-field--full"
                                :class="`is-mode-${memorisationDraft.chainingMethodMode}`">
                                <div class="memorisation-chaining-settings-head">
                                    <div>
                                        <span class="memorisation-chaining-step-label">Choose a flow</span>
                                        <h6 class="memorisation-chaining-settings-title mb-0">Pick how you want to build this range</h6>
                                        <p class="memorisation-chaining-settings-subtitle mb-0">
                                            Start with Learn New Verses. Switch to Smooth Transitions once the words feel familiar.
                                        </p>
                                    </div>
                                </div>

                                <div class="memorisation-chaining-mode-switcher" role="tablist" aria-label="Select chaining method mode">
                                    <button
                                        v-for="option in memorisationChainingModeOptions"
                                        :key="`memorisation-chaining-mode-${option.value}`"
                                        type="button"
                                        class="btn memorisation-chaining-mode-btn"
                                        :class="[
                                            `is-${option.value}`,
                                            { 'is-active': memorisationDraft.chainingMethodMode === option.value }
                                        ]"
                                        :aria-pressed="memorisationDraft.chainingMethodMode === option.value ? 'true' : 'false'"
                                        @click="memorisationDraft.chainingMethodMode = option.value">
                                        <div class="memorisation-chaining-mode-btn-top">
                                            <span class="memorisation-chaining-mode-btn-tag">
                                                {{ option.value === "bridging" ? "Best once wording feels familiar" : "Best for brand-new verses" }}
                                            </span>
                                            <span class="memorisation-chaining-mode-btn-indicator" aria-hidden="true">
                                                <i
                                                    class="bi"
                                                    :class="memorisationDraft.chainingMethodMode === option.value ? 'bi-check-lg' : 'bi-circle'"></i>
                                            </span>
                                        </div>
                                        <span class="memorisation-chaining-mode-btn-label">{{ option.label }}</span>
                                        <small>{{ option.description }}</small>
                                    </button>
                                </div>

                                <section class="memorisation-chaining-hero" :class="`is-${memorisationDraft.chainingMethodMode}`">
                                    <div class="memorisation-chaining-hero-copy">
                                        <span class="memorisation-chaining-step-label">This round looks like</span>
                                        <strong>{{ memorisationChainingSelectedModeMeta.summary }}</strong>
                                        <small>{{ memorisationChainingSelectedModeMeta.description }}</small>
                                    </div>
                                    <div class="memorisation-chaining-preview-links" aria-hidden="true">
                                        <span class="memorisation-chaining-preview-link is-complete">1</span>
                                        <span class="memorisation-chaining-preview-link is-complete">2</span>
                                        <span class="memorisation-chaining-preview-link is-active">3</span>
                                        <span class="memorisation-chaining-preview-link">4</span>
                                        <span class="memorisation-chaining-preview-link">5</span>
                                    </div>
                                </section>

                                <section class="memorisation-chaining-setup-panel">
                                    <div class="memorisation-chaining-setup-head">
                                        <span class="memorisation-chaining-step-label">Start simple</span>
                                        <small>Choose a session style first. Open more options only if you need them.</small>
                                    </div>

                                    <div class="memorisation-chaining-setup-list">
                                        <section class="memorisation-chaining-setup-row">
                                            <div class="memorisation-chaining-setup-copy">
                                                <span class="memorisation-chaining-setup-label">Session style</span>
                                                <small>{{ memorisationChainingQuickSetupSummary }}</small>
                                            </div>
                                            <div class="memorisation-chaining-chip-row" role="group" aria-label="Chaining practice style">
                                                <button
                                                    v-for="option in memorisationChainingQuickSetupOptions"
                                                    :key="`memorisation-chaining-quick-${option.value}`"
                                                    type="button"
                                                    class="btn memorisation-chaining-chip"
                                                    :class="{ 'is-active': memorisationChainingQuickSetupValue === option.value }"
                                                    :aria-pressed="memorisationChainingQuickSetupValue === option.value ? 'true' : 'false'"
                                                    @click="applyMemorisationChainingQuickSetup(option.value)">
                                                    {{ option.label }}
                                                </button>
                                            </div>
                                        </section>
                                    </div>

                                    <details class="memorisation-chaining-advanced">
                                        <summary class="memorisation-chaining-advanced-toggle">
                                            More options
                                        </summary>

                                        <div class="memorisation-chaining-advanced-grid">
                                            <section class="memorisation-chaining-advanced-item">
                                                <div class="memorisation-chaining-setup-copy">
                                                    <span class="memorisation-chaining-setup-label">After the chain ends</span>
                                                    <small>Choose what happens when you finish the range.</small>
                                                </div>
                                                <div class="memorisation-chaining-chip-row" role="group" aria-label="Chaining completion action">
                                                    <button
                                                        v-for="option in memorisationChainingCompletionActionOptions"
                                                        :key="`memorisation-chaining-complete-${option.value}`"
                                                        type="button"
                                                        class="btn memorisation-chaining-chip"
                                                        :class="{ 'is-active': memorisationDraft.chainingMethodCompletionAction === option.value }"
                                                        :aria-pressed="memorisationDraft.chainingMethodCompletionAction === option.value ? 'true' : 'false'"
                                                        @click="memorisationDraft.chainingMethodCompletionAction = option.value">
                                                        {{ option.label }}
                                                    </button>
                                                </div>
                                            </section>

                                            <section class="memorisation-chaining-advanced-item">
                                                <div class="memorisation-chaining-setup-copy">
                                                    <span class="memorisation-chaining-setup-label">Repeats</span>
                                                    <small>New ayah reps</small>
                                                </div>
                                                <div class="memorisation-chaining-chip-row" role="group" aria-label="Chaining repetitions per verse">
                                                    <button
                                                        v-for="option in memorisationChainingRepetitionOptions"
                                                        :key="`memorisation-chaining-repeat-${option.value}`"
                                                        type="button"
                                                        class="btn memorisation-chaining-chip"
                                                        :class="{ 'is-active': memorisationDraft.chainingMethodRepetitionStrategy === option.value }"
                                                        :aria-pressed="memorisationDraft.chainingMethodRepetitionStrategy === option.value ? 'true' : 'false'"
                                                        @click="memorisationDraft.chainingMethodRepetitionStrategy = option.value">
                                                        {{ option.label }}
                                                    </button>
                                                </div>
                                            </section>

                                            <section class="memorisation-chaining-advanced-item">
                                                <div class="memorisation-chaining-setup-copy">
                                                    <span class="memorisation-chaining-setup-label">Audio</span>
                                                    <small>Who leads the round</small>
                                                </div>
                                                <div class="memorisation-chaining-chip-row" role="group" aria-label="Chaining audio guidance mode">
                                                    <button
                                                        v-for="option in memorisationChainingAudioGuidanceOptions"
                                                        :key="`memorisation-chaining-audio-${option.value}`"
                                                        type="button"
                                                        class="btn memorisation-chaining-chip"
                                                        :class="{ 'is-active': memorisationDraft.chainingMethodAudioGuidance === option.value }"
                                                        :aria-pressed="memorisationDraft.chainingMethodAudioGuidance === option.value ? 'true' : 'false'"
                                                        @click="memorisationDraft.chainingMethodAudioGuidance = option.value">
                                                        {{ option.label }}
                                                    </button>
                                                </div>
                                            </section>

                                            <section class="memorisation-chaining-advanced-item memorisation-chaining-advanced-item--toggle">
                                                <div class="memorisation-chaining-setup-copy">
                                                    <span class="memorisation-chaining-setup-label">Auto-next</span>
                                                    <small>{{ memorisationChainingAutoAdvanceHelperLabel }}</small>
                                                </div>
                                                <label class="memorisation-chaining-toggle-inline">
                                                    <span
                                                        class="memorisation-chaining-toggle-state"
                                                        :class="[
                                                            {
                                                                'is-on':
                                                                    isMemorisationChainingAutoAdvanceAvailable &&
                                                                    memorisationDraft.chainingMethodAutoAdvance,
                                                                'is-disabled': !isMemorisationChainingAutoAdvanceAvailable
                                                            }
                                                        ]">
                                                        {{ memorisationChainingAutoAdvanceStatusLabel }}
                                                    </span>
                                                    <span class="form-check form-switch mb-0">
                                                        <input
                                                            class="form-check-input"
                                                            type="checkbox"
                                                            v-model="memorisationDraft.chainingMethodAutoAdvance"
                                                            :disabled="!isMemorisationChainingAutoAdvanceAvailable"
                                                            aria-label="Toggle chaining auto advance">
                                                    </span>
                                                </label>
                                            </section>

                                            <section class="memorisation-chaining-advanced-item">
                                                <div class="memorisation-chaining-setup-copy">
                                                    <span class="memorisation-chaining-setup-label">Blur</span>
                                                    <small>Recall support</small>
                                                </div>
                                                <div class="memorisation-chaining-chip-row" role="group" aria-label="Chaining blur progression">
                                                    <button
                                                        v-for="option in memorisationChainingBlurOptions"
                                                        :key="`memorisation-chaining-blur-${option.value}`"
                                                        type="button"
                                                        class="btn memorisation-chaining-chip"
                                                        :class="{ 'is-active': memorisationDraft.chainingMethodBlurProgression === option.value }"
                                                        :aria-pressed="memorisationDraft.chainingMethodBlurProgression === option.value ? 'true' : 'false'"
                                                        @click="memorisationDraft.chainingMethodBlurProgression = option.value">
                                                        {{ option.label }}
                                                    </button>
                                                </div>
                                            </section>
                                        </div>
                                    </details>
                                </section>

                                <div class="memorisation-chaining-footer-inline">
                                    <span class="memorisation-chaining-start-pill">{{ memorisationChainingDraftRangeLabel }}</span>
                                    <div class="memorisation-chaining-footer-copy">
                                        <strong>{{ memorisationChainingStartActionLabel }}</strong>
                                        <small>{{ memorisationChainingSelectedModeMeta.footer }}</small>
                                    </div>
                                </div>
                            </div>
                            <label class="memorisation-offcanvas-toggle-row memorisation-offcanvas-toggle-row--with-action">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Verse Countdown</strong>
                                    <small>Track remaining verses with live progress, ETA, and completion feedback.</small>
                                </span>
                                <span class="form-check form-switch mb-0">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        v-model="memorisationDraft.verseCountdownEnabled"
                                        aria-label="Toggle verse countdown display">
                                </span>
                            </label>
                            <div
                                v-if="memorisationDraft.verseCountdownEnabled"
                                class="memorisation-verse-countdown-settings memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                <div class="memorisation-verse-countdown-note">
                                    <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
                                    <span>The countdown appears after you press play and follows your live session progress.</span>
                                </div>
                                <label class="memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                    <span class="form-label surah-offcanvas-label">Countdown display style</span>
                                    <select
                                        class="form-select surah-offcanvas-select"
                                        v-model="memorisationDraft.verseCountdownDisplayStyle"
                                        aria-label="Verse countdown display style">
                                        <option value="combined">Combined</option>
                                        <option value="progress">Progress bar</option>
                                        <option value="circle">Circle counter</option>
                                        <option value="text">Text only</option>
                                        <option value="percentage">Percentage only</option>
                                    </select>
                                </label>
                                <label class="memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                    <span class="form-label surah-offcanvas-label">Countdown position</span>
                                    <select
                                        class="form-select surah-offcanvas-select"
                                        v-model="memorisationDraft.verseCountdownPosition"
                                        aria-label="Verse countdown position">
                                        <option value="floating">Floating widget (top right)</option>
                                        <option value="title">Title bar (above verses)</option>
                                    </select>
                                </label>
                            </div>
                            <label class="memorisation-offcanvas-toggle-row">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Tajweed colors</strong>
                                    <small>Show tajweed colouring in Quran text.</small>
                                </span>
                                <span class="form-check form-switch mb-0">
                                    <input class="form-check-input" type="checkbox" v-model="memorisationDraft.showTajweed" aria-label="Toggle tajweed colors">
                                </span>
                            </label>
                            <label class="memorisation-offcanvas-toggle-row">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Word highlight when playing audio</strong>
                                    <small>Highlight words in real time during recitation.</small>
                                </span>
                                <span class="form-check form-switch mb-0">
                                    <input class="form-check-input" type="checkbox" v-model="memorisationDraft.showRealtimeHighlighting" aria-label="Toggle word highlight when playing audio">
                                </span>
                            </label>
                            <label class="memorisation-offcanvas-toggle-row">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>All words meaning</strong>
                                    <small>Show word-level meanings below the ayah text.</small>
                                </span>
                                <span class="form-check form-switch mb-0">
                                    <input class="form-check-input" type="checkbox" v-model="memorisationDraft.showWordTranslation" aria-label="Toggle all words meaning">
                                </span>
                            </label>
                            <label class="memorisation-offcanvas-toggle-row">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Word for word meaning + audio</strong>
                                    <small>Enable tap-to-hear audio with word-by-word meaning.</small>
                                </span>
                                <span class="form-check form-switch mb-0">
                                    <input class="form-check-input" type="checkbox" v-model="memorisationDraft.showWordTranslationTooltip" aria-label="Toggle word for word meaning and audio">
                                </span>
                            </label>
                            <label class="memorisation-offcanvas-toggle-row memorisation-offcanvas-toggle-row--with-action">
                                <span class="memorisation-offcanvas-toggle-copy">
                                    <strong>Repeat After Reciter</strong>
                                    <small>Let the reciter pause after each ayah so you can repeat it yourself.</small>
                                </span>
                                <span class="memorisation-offcanvas-toggle-actions">
                                    <button
                                        type="button"
                                        class="btn memorisation-tool-settings-btn"
                                        :disabled="!memorisationDraft.repeatAfterReciterEnabled"
                                        :aria-expanded="memorisationDraft.repeatAfterReciterEnabled && isMemorisationRepeatAfterSettingsOpen ? 'true' : 'false'"
                                        aria-label="Open Repeat After Reciter settings"
                                        title="Repeat After Reciter settings"
                                        @click.stop.prevent="toggleMemorisationRepeatAfterDraftSettings">
                                        <i class="bi bi-gear-fill" aria-hidden="true"></i>
                                    </button>
                                    <span class="form-check form-switch mb-0">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            v-model="memorisationDraft.repeatAfterReciterEnabled"
                                            @change="onMemorisationRepeatAfterDraftToggle"
                                            aria-label="Toggle Repeat After Reciter">
                                    </span>
                                </span>
                            </label>
                            <div
                                v-if="memorisationDraft.repeatAfterReciterEnabled && isMemorisationRepeatAfterSettingsOpen"
                                class="memorisation-repeat-after-settings memorisation-offcanvas-field memorisation-offcanvas-field--full">
                                <div class="memorisation-repeat-after-head">
                                    <span class="form-label surah-offcanvas-label">Repeat after each ayah</span>
                                    <small class="memorisation-repeat-after-head-copy">
                                        Pick a pause length, then choose how much help stays on screen.
                                    </small>
                                </div>
                                <section class="memorisation-repeat-after-card">
                                    <div class="memorisation-repeat-after-card-head">
                                        <strong>Pause length</strong>
                                        <small>How long you get to repeat</small>
                                    </div>
                                    <div class="memorisation-repeat-after-delay-row" role="group" aria-label="Pause length after each ayah">
                                        <button
                                            type="button"
                                            class="btn memorisation-repeat-after-delay-btn"
                                            :class="{ 'is-active': memorisationDraft.repeatAfterReciterPauseMode === '2' }"
                                            @click="memorisationDraft.repeatAfterReciterPauseMode = '2'">
                                            2s
                                        </button>
                                        <button
                                            type="button"
                                            class="btn memorisation-repeat-after-delay-btn"
                                            :class="{ 'is-active': memorisationDraft.repeatAfterReciterPauseMode === '3' }"
                                            @click="memorisationDraft.repeatAfterReciterPauseMode = '3'">
                                            3s
                                        </button>
                                        <button
                                            type="button"
                                            class="btn memorisation-repeat-after-delay-btn"
                                            :class="{ 'is-active': memorisationDraft.repeatAfterReciterPauseMode === '5' }"
                                            @click="memorisationDraft.repeatAfterReciterPauseMode = '5'">
                                            5s
                                        </button>
                                        <button
                                            type="button"
                                            class="btn memorisation-repeat-after-delay-btn"
                                            :class="{ 'is-active': memorisationDraft.repeatAfterReciterPauseMode === 'manual' }"
                                            @click="memorisationDraft.repeatAfterReciterPauseMode = 'manual'">
                                            Manual
                                        </button>
                                    </div>
                                </section>
                                <section class="memorisation-repeat-after-card">
                                    <div class="memorisation-repeat-after-card-head">
                                        <strong>Screen help</strong>
                                        <small>{{ memorisationRepeatAfterDraftPauseLabel }} · choose the amount of help you want.</small>
                                    </div>
                                    <div class="memorisation-repeat-after-support-row" role="group" aria-label="Repeat After support preset">
                                        <button
                                            type="button"
                                            class="btn memorisation-repeat-after-support-btn"
                                            :class="{ 'is-active': memorisationRepeatAfterDraftSupportPreset === 'full' }"
                                            @click="applyMemorisationRepeatAfterSupportPreset('full')">
                                            Full help
                                        </button>
                                        <button
                                            type="button"
                                            class="btn memorisation-repeat-after-support-btn"
                                            :class="{ 'is-active': memorisationRepeatAfterDraftSupportPreset === 'balanced' }"
                                            @click="applyMemorisationRepeatAfterSupportPreset('balanced')">
                                            Balanced
                                        </button>
                                        <button
                                            type="button"
                                            class="btn memorisation-repeat-after-support-btn"
                                            :class="{ 'is-active': memorisationRepeatAfterDraftSupportPreset === 'recall' }"
                                            @click="applyMemorisationRepeatAfterSupportPreset('recall')">
                                            Recall
                                        </button>
                                    </div>
                                    <p class="memorisation-repeat-after-support-summary mb-0">
                                        {{ memorisationRepeatAfterDraftSupportSummary }}
                                    </p>
                                </section>
                                <details class="memorisation-repeat-after-advanced">
                                    <summary class="memorisation-repeat-after-advanced-toggle">
                                        More options
                                    </summary>
                                    <div class="memorisation-repeat-after-advanced-body">
                                        <div class="memorisation-repeat-after-simple-grid">
                                            <label class="memorisation-repeat-after-card memorisation-repeat-after-card--toggle">
                                                <div class="memorisation-repeat-after-card-head">
                                                    <strong>Meaning</strong>
                                                    <small>Keep translation visible during your pause.</small>
                                                </div>
                                                <span class="form-check form-switch mb-0">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        v-model="memorisationDraft.repeatAfterReciterShowTranslation"
                                                        aria-label="Show translation during repeat pause">
                                                </span>
                                            </label>
                                            <section class="memorisation-repeat-after-card">
                                                <div class="memorisation-repeat-after-card-head">
                                                    <strong>Arabic text</strong>
                                                    <small>How visible the ayah stays while you repeat.</small>
                                                </div>
                                                <div class="memorisation-repeat-after-verse-row" role="group" aria-label="Verse text visibility during pause">
                                                    <button
                                                        type="button"
                                                        class="btn memorisation-repeat-after-verse-btn"
                                                        :class="{ 'is-active': memorisationDraft.repeatAfterReciterVerseTextMode === 'show' }"
                                                        @click="memorisationDraft.repeatAfterReciterVerseTextMode = 'show'">
                                                        Show
                                                    </button>
                                                    <button
                                                        type="button"
                                                        class="btn memorisation-repeat-after-verse-btn"
                                                        :class="{ 'is-active': memorisationDraft.repeatAfterReciterVerseTextMode === 'dimmed' }"
                                                        @click="memorisationDraft.repeatAfterReciterVerseTextMode = 'dimmed'">
                                                        Dim
                                                    </button>
                                                    <button
                                                        type="button"
                                                        class="btn memorisation-repeat-after-verse-btn"
                                                        :class="{ 'is-active': memorisationDraft.repeatAfterReciterVerseTextMode === 'hide' }"
                                                        @click="memorisationDraft.repeatAfterReciterVerseTextMode = 'hide'">
                                                        Hide
                                                    </button>
                                                </div>
                                            </section>
                                        </div>
                                        <label class="memorisation-repeat-after-card memorisation-repeat-after-card--toggle">
                                            <div class="memorisation-repeat-after-card-head">
                                                <strong>Save voice repeats on this device</strong>
                                                <small>Optional. Record during the pause and keep up to 3 clips per ayah.</small>
                                            </div>
                                            <span class="form-check form-switch mb-0">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    v-model="memorisationDraft.repeatAfterReciterRecordEnabled"
                                                    aria-label="Enable repetition recording">
                                            </span>
                                        </label>
                                        <div
                                            v-if="memorisationDraft.repeatAfterReciterRecordEnabled && memorisationRepeatAfterRecordingCount"
                                            class="memorisation-repeat-library">
                                            <div class="memorisation-repeat-library-head">
                                                <span class="form-label surah-offcanvas-label mb-0">Repetition library</span>
                                                <small class="memorisation-repeat-library-count">
                                                    {{ memorisationRepeatAfterRecordingCount }} saved clip{{ memorisationRepeatAfterRecordingCount === 1 ? '' : 's' }}
                                                </small>
                                            </div>
                                            <label class="memorisation-offcanvas-field memorisation-offcanvas-field--full mb-0">
                                                <small class="memorisation-repeat-library-hint mb-0">
                                                    Select an ayah, then listen, compare with ayah audio, or download.
                                                </small>
                                                <select
                                                    class="form-select memorisation-repeat-library-select"
                                                    :value="memorisationRepeatRecordingSelectionKeyResolved"
                                                    @change="onMemorisationRepeatRecordingSelectionChange"
                                                    aria-label="Select saved repetition ayah">
                                                    <option
                                                        v-for="option in memorisationRepeatRecordingAyahOptions"
                                                        :key="option.key"
                                                        :value="option.key">
                                                        {{ option.label }}
                                                    </option>
                                                </select>
                                            </label>
                                            <div
                                                class="memorisation-repeat-library-actions"
                                                role="group"
                                                aria-label="Saved repetition clip actions">
                                                <button
                                                    type="button"
                                                    class="btn memorisation-repeat-library-btn memorisation-repeat-library-btn--primary"
                                                    :disabled="!memorisationRepeatRecordingSelectedLatest"
                                                    @click="listenSelectedMemorisationRepeatRecording">
                                                    <i class="bi bi-play-circle" aria-hidden="true"></i>
                                                    Listen clip
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn memorisation-repeat-library-btn memorisation-repeat-library-btn--primary"
                                                    :disabled="!memorisationRepeatRecordingSelectedLatest"
                                                    @click="compareSelectedMemorisationRepeatRecordingWithAyah">
                                                    <i class="bi bi-arrow-left-right" aria-hidden="true"></i>
                                                    Compare with ayah
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn memorisation-repeat-library-btn"
                                                    :disabled="!memorisationRepeatRecordingSelectedLatest"
                                                    @click="downloadSelectedMemorisationRepeatRecording">
                                                    <i class="bi bi-download" aria-hidden="true"></i>
                                                    Download clip
                                                </button>
                                            </div>
                                            <p
                                                v-if="memorisationRepeatRecordingPlaybackStatusText"
                                                class="memorisation-repeat-library-status mb-0">
                                                {{ memorisationRepeatRecordingPlaybackStatusText }}
                                            </p>
                                        </div>
                                        <p
                                            v-else-if="memorisationDraft.repeatAfterReciterRecordEnabled"
                                            class="memorisation-repeat-after-meta mb-0">
                                            No saved clips yet.
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </section>

                    <div
                        v-if="isMemorisationSubmitAlertVisible"
                        class="alert memorisation-submit-alert"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true">
                        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                        <span>{{ memorisationSubmitAlertMessage }}</span>
                    </div>

                    <div class="memorisation-offcanvas-actions">
                        <button type="button" class="btn btn-outline-secondary memorisation-offcanvas-btn" @click="cancelMemorisationOffcanvas">
                            Cancel
                        </button>
                        <button type="button" class="btn btn-outline-secondary memorisation-offcanvas-btn memorisation-offcanvas-btn-reset" @click="resetMemorisationDraftForm">
                            Reset all changes
                        </button>
                        <button type="button" class="btn memorisation-offcanvas-btn memorisation-offcanvas-btn-submit" :disabled="isMemorisationDraftSubmitting" @click="submitMemorisationOffcanvas">
                            {{ isMemorisationDraftSubmitting ? memorisationOffcanvasSubmittingLabel : memorisationOffcanvasSubmitButtonLabel }}
                        </button>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div
                class="modal fade session-history-modal-shell"
                :id="sessionHistoryModalId"
                tabindex="-1"
                aria-labelledby="sessionHistoryModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable modal-fullscreen-md-down">
                    <div class="modal-content session-history-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
                        <div class="modal-header session-history-modal-header">
                            <div class="session-history-modal-header-main">
                                <div class="session-history-modal-header-copy">
                                    <h4 class="modal-title mb-1" id="sessionHistoryModalLabel">Session History</h4>
                                    <p class="session-history-modal-subtitle mb-0">
                                        Review every saved memorisation session, spot patterns, and reload any setup instantly.
                                    </p>
                                </div>
                                <div class="session-history-modal-header-controls">
                                    <div class="session-history-modal-actions">
                                        <button
                                            type="button"
                                            class="btn session-history-header-btn"
                                            @click="loadStarterSessionHistory({ announce: true })">
                                            <i class="bi bi-stars" aria-hidden="true"></i>
                                            Load starter
                                        </button>
                                        <button
                                            type="button"
                                            class="btn session-history-header-btn"
                                            :disabled="!sessionHistoryFilteredEntries.length"
                                            @click="downloadSessionHistoryCsv()">
                                            <i class="bi bi-filetype-csv" aria-hidden="true"></i>
                                            CSV
                                        </button>
                                        <button
                                            type="button"
                                            class="btn session-history-header-btn"
                                            :disabled="!sessionHistoryFilteredEntries.length"
                                            @click="downloadSessionHistoryPdf()">
                                            <i class="bi bi-file-earmark-pdf" aria-hidden="true"></i>
                                            PDF
                                        </button>
                                        <button
                                            type="button"
                                            class="btn session-history-header-btn"
                                            :disabled="!sessionHistoryFilteredEntries.length"
                                            @click="shareSessionHistoryProgressReport()">
                                            <i class="bi bi-share" aria-hidden="true"></i>
                                            Share report
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        class="btn-close session-history-modal-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                            </div>
                        </div>

                        <div class="modal-body session-history-modal-body">
                            <section class="session-history-overview-strip">
                                <div class="session-history-overview-pills">
                                    <span class="session-history-overview-pill">
                                        <strong>{{ sessionHistorySummaryStats.totalSessions }}</strong>
                                        Sessions
                                    </span>
                                    <span class="session-history-overview-pill">
                                        <strong>{{ formatSessionHistoryDuration(sessionHistorySummaryStats.averageDurationMs) }}</strong>
                                        Average
                                    </span>
                                    <span class="session-history-overview-pill">
                                        <strong>{{ sessionHistorySummaryStats.bestStreak }}</strong>
                                        Best streak
                                    </span>
                                </div>
                                <div class="session-history-overview-meta">
                                    <p class="session-history-overview-note mb-0">
                                        {{ sessionHistoryOverviewNote }}
                                    </p>
                                    <button
                                        type="button"
                                        class="btn session-history-overview-help"
                                        data-bs-toggle="tooltip"
                                        data-session-history-tooltip
                                        data-bs-placement="top"
                                        :data-bs-title="sessionHistoryCalculationTooltip"
                                        aria-label="How session history stats are calculated">
                                        <i class="bi bi-info-circle" aria-hidden="true"></i>
                                        How is this calculated?
                                    </button>
                                </div>
                                <div
                                    v-if="sessionHistoryMilestoneMoments.length"
                                    class="session-history-milestone-row">
                                    <article
                                        v-for="moment in sessionHistoryMilestoneMoments"
                                        :key="moment.id"
                                        class="session-history-milestone-card">
                                        <i class="bi" :class="moment.icon" aria-hidden="true"></i>
                                        <div>
                                            <strong>{{ moment.title }}</strong>
                                            <small>{{ moment.detail }}</small>
                                        </div>
                                    </article>
                                </div>
                                <div
                                    v-if="sessionHistoryForecast.hasForecast"
                                    class="session-history-forecast-block">
                                    <div class="session-history-forecast-head">
                                        <strong>Proactive forecast</strong>
                                        <small>{{ sessionHistoryForecastNote }}</small>
                                    </div>
                                    <div class="session-history-forecast-grid">
                                        <article class="session-history-forecast-card">
                                            <span class="session-history-detail-label">Next 7d sessions</span>
                                            <strong>{{ sessionHistoryForecast.projectedSessions7d }}</strong>
                                        </article>
                                        <article class="session-history-forecast-card">
                                            <span class="session-history-detail-label">Next 7d time</span>
                                            <strong>{{ formatSessionHistoryDuration(sessionHistoryForecast.projectedDurationMs7d) }}</strong>
                                        </article>
                                        <article class="session-history-forecast-card">
                                            <span class="session-history-detail-label">Likely active days</span>
                                            <strong>{{ sessionHistoryForecast.projectedActiveDays7d }}/7</strong>
                                        </article>
                                    </div>
                                </div>
                                <div v-if="sessionHistoryOnThisDayEntries.length" class="session-history-overview-links">
                                    <span class="session-history-insight-label">On this day</span>
                                    <div class="session-history-overview-link-row">
                                        <button
                                            v-for="entry in sessionHistoryOnThisDayEntries.slice(0, 3)"
                                            :key="`on-this-day-${entry.id}`"
                                            type="button"
                                            class="session-history-overview-link"
                                            @click="openSessionHistoryModal(entry.id)">
                                            {{ formatSessionHistoryRange(entry) }}
                                        </button>
                                    </div>
                                </div>
                            </section>
                            <div v-if="hasOnlySeededSessionHistory" class="session-history-seeded-note">
                                Starter history is loaded so you can explore filters, calendar, heatmap, and reload flows before your first real session.
                            </div>

                            <section class="session-history-toolbar-card" aria-label="Session history controls">
                                <div class="session-history-toolbar-row">
                                    <div class="session-history-view-bar" role="tablist" aria-label="Session history views">
                                        <button
                                            type="button"
                                            class="btn session-history-view-btn"
                                            :class="{ 'is-active': sessionHistoryView === 'list' }"
                                            :aria-pressed="sessionHistoryView === 'list' ? 'true' : 'false'"
                                            @click="sessionHistoryView = 'list'">
                                            <i class="bi bi-list-ul" aria-hidden="true"></i>
                                            List
                                        </button>
                                        <button
                                            type="button"
                                            class="btn session-history-view-btn"
                                            :class="{ 'is-active': sessionHistoryView === 'calendar' }"
                                            :aria-pressed="sessionHistoryView === 'calendar' ? 'true' : 'false'"
                                            :disabled="!sessionHistoryHasEntries"
                                            @click="sessionHistoryView = 'calendar'">
                                            <i class="bi bi-calendar3" aria-hidden="true"></i>
                                            Calendar
                                        </button>
                                        <button
                                            type="button"
                                            class="btn session-history-view-btn"
                                            :class="{ 'is-active': sessionHistoryView === 'heatmap' }"
                                            :aria-pressed="sessionHistoryView === 'heatmap' ? 'true' : 'false'"
                                            :disabled="!sessionHistoryHasEntries"
                                            @click="sessionHistoryView = 'heatmap'">
                                            <i class="bi bi-grid-3x7-gap" aria-hidden="true"></i>
                                            Heatmap
                                        </button>
                                        <button
                                            type="button"
                                            class="btn session-history-view-btn"
                                            :class="{ 'is-active': sessionHistoryView === 'surah' }"
                                            :aria-pressed="sessionHistoryView === 'surah' ? 'true' : 'false'"
                                            :disabled="!sessionHistoryHasEntries"
                                            @click="sessionHistoryView = 'surah'">
                                            <i class="bi bi-bar-chart" aria-hidden="true"></i>
                                            Surah
                                        </button>
                                    </div>
                                    <div class="session-history-toolbar-actions">
                                        <button
                                            type="button"
                                            class="btn session-history-header-btn session-history-header-btn--ghost"
                                            @click="sessionHistoryFiltersExpanded = !sessionHistoryFiltersExpanded">
                                            <i class="bi bi-sliders" aria-hidden="true"></i>
                                            {{ sessionHistoryShouldShowAdvancedFilters ? "Less filters" : "More filters" }}
                                            <span
                                                v-if="sessionHistoryActiveFilterCount"
                                                class="session-history-filter-count">
                                                {{ sessionHistoryActiveFilterCount }}
                                            </span>
                                        </button>
                                        <button
                                            v-if="sessionHistoryHasActiveFilters"
                                            type="button"
                                            class="btn session-history-clear-btn"
                                            @click="clearSessionHistoryFilters()">
                                            Clear
                                        </button>
                                    </div>
                                </div>

                                <div class="session-history-search-row">
                                    <div class="session-history-search-summary">
                                        <strong>{{ sessionHistoryResultLabel }}</strong>
                                        <small>Search by surah, ayah range, note, tool, or date.</small>
                                    </div>
                                    <label class="session-history-filter-field session-history-filter-field--search session-history-search-input">
                                        <span class="visually-hidden">Search sessions</span>
                                        <i class="bi bi-search session-history-search-icon" aria-hidden="true"></i>
                                        <input
                                            v-model.trim="sessionHistorySearchQuery"
                                            type="search"
                                            class="form-control"
                                            placeholder="Search surah, range, note, date, or tool">
                                        <button
                                            v-if="sessionHistorySearchQuery"
                                            type="button"
                                            class="btn session-history-search-clear"
                                            @click="sessionHistorySearchQuery = ''">
                                            Clear
                                        </button>
                                    </label>
                                    <label class="session-history-filter-field">
                                        <span class="visually-hidden">Filter by surah</span>
                                        <select v-model="sessionHistoryFilterSurah" class="form-select">
                                            <option value="">All surahs</option>
                                            <option
                                                v-for="option in sessionHistoryAvailableSurahOptions"
                                                :key="`session-history-surah-${option.surahNumber}`"
                                                :value="String(option.surahNumber)">
                                                {{ option.surahNumber }}. {{ option.surahName }}
                                            </option>
                                        </select>
                                    </label>
                                </div>

                                <div v-if="sessionHistoryActiveFilterBadges.length" class="session-history-active-filter-row">
                                    <span class="session-history-active-filter-label">Active filters</span>
                                    <button
                                        v-for="badge in sessionHistoryActiveFilterBadges"
                                        :key="`session-history-filter-badge-${badge.key}`"
                                        type="button"
                                        class="btn session-history-active-filter-chip"
                                        @click="clearSessionHistoryFilter(badge.key)">
                                        <span>{{ badge.label }}</span>
                                        <i class="bi bi-x-lg" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div v-if="sessionHistoryShouldShowAdvancedFilters" class="session-history-advanced-filters">
                                    <label class="session-history-filter-field">
                                        <span class="visually-hidden">Filter by tool</span>
                                        <select v-model="sessionHistoryFilterTool" class="form-select">
                                            <option value="">All tools</option>
                                            <option
                                                v-for="tool in sessionHistoryAvailableToolOptions"
                                                :key="`session-history-tool-${tool.id}`"
                                                :value="tool.id">
                                                {{ tool.label }}
                                            </option>
                                        </select>
                                    </label>
                                    <label class="session-history-filter-field">
                                        <span class="visually-hidden">Start date</span>
                                        <input v-model="sessionHistoryFilterStartDate" type="date" class="form-control">
                                    </label>
                                    <label class="session-history-filter-field">
                                        <span class="visually-hidden">End date</span>
                                        <input v-model="sessionHistoryFilterEndDate" type="date" class="form-control">
                                    </label>
                                    <label class="session-history-filter-field">
                                        <span class="visually-hidden">Duration</span>
                                        <select v-model="sessionHistoryFilterDuration" class="form-select">
                                            <option value="">Any length</option>
                                            <option value="short">Under 10 min</option>
                                            <option value="medium">10-30 min</option>
                                            <option value="long">30+ min</option>
                                        </select>
                                    </label>
                                </div>

                                <div class="session-history-view-copy">
                                    <strong>{{ sessionHistoryViewTitle }}</strong>
                                    <small>{{ sessionHistoryViewSubtitle }}</small>
                                </div>
                            </section>

                            <div v-if="!sessionHistoryFilteredEntries.length" class="session-history-empty-state">
                                <p class="mb-0">
                                    {{ sessionHistoryHasEntries ? "No sessions match the current filters." : "No saved sessions yet." }}
                                </p>
                                <button
                                    v-if="sessionHistoryHasActiveFilters"
                                    type="button"
                                    class="btn session-history-entry-btn"
                                    @click="clearSessionHistoryFilters()">
                                    Clear filters
                                </button>
                                <button
                                    v-else-if="!sessionHistoryHasEntries"
                                    type="button"
                                    class="btn session-history-entry-btn session-history-entry-btn--primary"
                                    @click="loadStarterSessionHistory({ announce: true })">
                                    <i class="bi bi-stars" aria-hidden="true"></i>
                                    Load starter history
                                </button>
                            </div>

                            <div v-else-if="sessionHistoryView === 'list'" class="session-history-list-shell">
                                <p class="session-history-mobile-flow-note mb-0">
                                    Tap a session to open its details below. We will jump you there automatically on smaller screens.
                                </p>
                                <div ref="sessionHistoryList" class="session-history-list">
                                    <button
                                        v-for="entry in sessionHistoryFilteredEntries"
                                        :key="entry.id"
                                        type="button"
                                        class="session-history-entry-card session-history-entry-card--selectable"
                                        :class="{ 'is-active': sessionHistorySelectedEntry && sessionHistorySelectedEntry.id === entry.id }"
                                        @click="setSessionHistorySelectedEntry(entry.id)">
                                        <div class="session-history-entry-summary-main">
                                            <div class="session-history-entry-summary-head">
                                                <strong>{{ formatSessionHistoryRange(entry) }}</strong>
                                                <span
                                                    v-if="isSeededSessionHistoryEntry(entry)"
                                                    class="memorisation-demo-badge memorisation-demo-badge--inline">
                                                    Starter
                                                </span>
                                            </div>
                                            <span class="session-history-entry-date">{{ formatSessionHistoryDateTime(entry.endedAt) }}</span>
                                            <div class="session-history-entry-meta">
                                                <span>{{ formatSessionHistoryDuration(entry.durationMs) }}</span>
                                                <span>{{ formatSessionHistoryVersesCoveredLabel(entry) }}</span>
                                                <span>{{ formatSessionHistoryRepetitionsLabel(entry) }}</span>
                                            </div>
                                            <div v-if="entry.toolsUsed.length" class="session-history-tool-row">
                                                <span
                                                    v-for="tool in entry.toolsUsed"
                                                    :key="`entry-tool-${entry.id}-${tool.id}`"
                                                    class="session-history-tool-pill"
                                                    :title="tool.label">
                                                    <i class="bi" :class="tool.icon" aria-hidden="true"></i>
                                                    <span>{{ tool.label }}</span>
                                                </span>
                                            </div>
                                            <p v-if="entry.note" class="session-history-entry-note-preview mb-0">
                                                {{ entry.note }}
                                            </p>
                                        </div>
                                        <div class="session-history-entry-summary-side">
                                            <span
                                                v-if="entry.accuracyScore !== null && entry.accuracyScore !== undefined"
                                                class="session-history-accuracy-pill">
                                                {{ entry.accuracyScore }}%
                                            </span>
                                            <span class="session-history-entry-open-label">Details</span>
                                        </div>
                                    </button>
                                </div>

                                <aside
                                    v-if="sessionHistorySelectedEntry"
                                    ref="sessionHistorySelectedPanel"
                                    class="session-history-selected-panel">
                                    <div class="session-history-selected-panel-utility">
                                        <span class="session-history-insight-label">Selected session</span>
                                        <button
                                            type="button"
                                            class="btn session-history-selected-panel-back-btn"
                                            @click="scrollSessionHistoryListIntoView()">
                                            <i class="bi bi-arrow-up" aria-hidden="true"></i>
                                            Choose another
                                        </button>
                                    </div>
                                    <div class="session-history-selected-panel-head">
                                        <div class="session-history-selected-panel-copy">
                                            <div class="session-history-entry-summary-head">
                                                <strong>{{ formatSessionHistoryRange(sessionHistorySelectedEntry) }}</strong>
                                                <span
                                                    v-if="isSeededSessionHistoryEntry(sessionHistorySelectedEntry)"
                                                    class="memorisation-demo-badge memorisation-demo-badge--inline">
                                                    Starter
                                                </span>
                                            </div>
                                            <p class="session-history-selected-panel-date mb-0">
                                                {{ formatSessionHistoryDateTime(sessionHistorySelectedEntry.endedAt) }}
                                            </p>
                                        </div>
                                        <span
                                            v-if="sessionHistorySelectedEntry.accuracyScore !== null && sessionHistorySelectedEntry.accuracyScore !== undefined"
                                            class="session-history-accuracy-pill">
                                            {{ sessionHistorySelectedEntry.accuracyScore }}%
                                        </span>
                                    </div>

                                    <div v-if="sessionHistorySelectedEntry.toolsUsed.length" class="session-history-tool-row">
                                        <span
                                            v-for="tool in sessionHistorySelectedEntry.toolsUsed"
                                            :key="`selected-entry-tool-${sessionHistorySelectedEntry.id}-${tool.id}`"
                                            class="session-history-tool-pill"
                                            :title="tool.label">
                                            <i class="bi" :class="tool.icon" aria-hidden="true"></i>
                                            <span>{{ tool.label }}</span>
                                        </span>
                                    </div>

                                    <div class="session-history-detail-grid">
                                        <article class="session-history-detail-card">
                                            <span class="session-history-detail-label">Range</span>
                                            <strong>{{ sessionHistorySelectedEntry.rangeStart }}-{{ sessionHistorySelectedEntry.rangeEnd }}</strong>
                                        </article>
                                        <article class="session-history-detail-card">
                                            <span class="session-history-detail-label">Playback</span>
                                            <strong>{{ sessionHistorySelectedEntry.sessionConfig.playbackMode }} · {{ sessionHistorySelectedEntry.sessionConfig.playbackSpeed }}x</strong>
                                        </article>
                                        <article class="session-history-detail-card">
                                            <span class="session-history-detail-label">Completion</span>
                                            <strong>{{ sessionHistorySelectedEntry.completionReason }}</strong>
                                        </article>
                                        <article class="session-history-detail-card">
                                            <span class="session-history-detail-label">Surah</span>
                                            <strong>{{ sessionHistorySelectedEntry.surahName }}</strong>
                                        </article>
                                    </div>

                                    <label class="session-history-note-field">
                                        <span class="session-history-detail-label">Session note</span>
                                        <small class="session-history-note-help">
                                            Private note for this session. It saves when you tap Save Note or leave the field.
                                        </small>
                                        <textarea
                                            :value="sessionHistoryNoteDrafts[sessionHistorySelectedEntry.id] || ''"
                                            :data-session-history-entry-id="sessionHistorySelectedEntry.id"
                                            class="form-control"
                                            rows="4"
                                            maxlength="280"
                                            placeholder="Add a note about what felt strong, difficult, or worth remembering."
                                            @input="updateSessionHistoryNoteDraft(sessionHistorySelectedEntry.id, $event.target.value)"
                                            @blur="handleSessionHistoryNoteBlur($event)"></textarea>
                                    </label>

                                    <div class="session-history-entry-actions">
                                        <button type="button" class="btn session-history-entry-btn session-history-entry-btn--primary" @click="reloadSessionHistoryEntry(sessionHistorySelectedEntry)">
                                            <i class="bi bi-arrow-clockwise" aria-hidden="true"></i>
                                            Use This Setup
                                        </button>
                                        <button type="button" class="btn session-history-entry-btn" @click="viewSessionHistoryVerses(sessionHistorySelectedEntry)">
                                            <i class="bi bi-book" aria-hidden="true"></i>
                                            Open Verses
                                        </button>
                                        <button type="button" class="btn session-history-entry-btn" @click="saveSessionHistoryNote(sessionHistorySelectedEntry.id)">
                                            <i class="bi bi-journal-check" aria-hidden="true"></i>
                                            Save Note
                                        </button>
                                        <button type="button" class="btn session-history-entry-btn session-history-entry-btn--danger" @click="deleteSessionHistoryEntry(sessionHistorySelectedEntry.id)">
                                            <i class="bi bi-trash" aria-hidden="true"></i>
                                            Delete
                                        </button>
                                    </div>
                                </aside>
                            </div>

                            <div v-else-if="sessionHistoryView === 'calendar'" class="session-history-calendar-panel">
                                <div class="session-history-calendar-head">
                                    <div class="session-history-calendar-month">
                                        <button type="button" class="btn session-history-calendar-nav" @click="changeSessionHistoryCalendarMonth(-1)" aria-label="Previous month">
                                            <i class="bi bi-chevron-left" aria-hidden="true"></i>
                                        </button>
                                        <strong>{{ sessionHistoryCalendarMonthLabel }}</strong>
                                        <button type="button" class="btn session-history-calendar-nav" @click="changeSessionHistoryCalendarMonth(1)" aria-label="Next month">
                                            <i class="bi bi-chevron-right" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <small class="session-history-calendar-hint">Tap a day with activity to review that day's sessions.</small>
                                </div>
                                <div class="session-history-view-explainer">
                                    <strong>How to read Calendar</strong>
                                    <p class="mb-0">{{ sessionHistoryCalendarExplanation }}</p>
                                </div>
                                <div class="session-history-calendar-grid-wrap">
                                    <div class="session-history-calendar-grid" role="grid" aria-label="Session history calendar">
                                        <span
                                            v-for="label in hifzDashboardWeekdayLabels"
                                            :key="`session-history-weekday-${label}`"
                                            class="session-history-calendar-weekday">
                                            {{ label }}
                                        </span>
                                        <button
                                            v-for="cell in sessionHistoryCalendarCells"
                                            :key="`session-history-cell-${cell.dateKey}`"
                                            type="button"
                                            class="session-history-calendar-cell"
                                            :class="{
                                                'is-outside': !cell.isCurrentMonth,
                                                'is-today': cell.isToday,
                                                'has-sessions': !!cell.aggregate,
                                                'is-selected': sessionHistoryEffectiveSelectedDateKey === cell.dateKey
                                            }"
                                            :disabled="!cell.isCurrentMonth"
                                            @click="selectSessionHistoryCalendarDate(cell.dateKey)">
                                            <span class="session-history-calendar-day">{{ cell.dayNumber }}</span>
                                            <small v-if="cell.aggregate" class="session-history-calendar-count">
                                                {{ cell.aggregate.count }} session{{ cell.aggregate.count === 1 ? "" : "s" }}
                                            </small>
                                        </button>
                                    </div>
                                </div>
                                <small class="session-history-scroll-hint">
                                    Swipe sideways on smaller screens if you want to see the full month at once.
                                </small>

                                <div ref="sessionHistoryCalendarDetail" class="session-history-calendar-detail">
                                    <div class="session-history-calendar-detail-head">
                                        <div class="session-history-calendar-detail-summary">
                                            <strong>{{ sessionHistorySelectedDateLabel }}</strong>
                                            <small>{{ sessionHistorySelectedDateSummary }}</small>
                                        </div>
                                    </div>
                                    <div v-if="sessionHistorySelectedDateEntries.length" class="session-history-calendar-detail-list">
                                        <button
                                            v-for="entry in sessionHistorySelectedDateEntries"
                                            :key="`calendar-entry-${entry.id}`"
                                            type="button"
                                            class="session-history-calendar-detail-item"
                                            @click="sessionHistoryView = 'list'; setSessionHistorySelectedEntry(entry.id)">
                                            <strong>{{ formatSessionHistoryRange(entry) }}</strong>
                                            <small>{{ formatSessionHistoryDuration(entry.durationMs, { short: true }) }} · {{ formatSessionHistoryDateTime(entry.endedAt) }}</small>
                                        </button>
                                    </div>
                                    <p v-else class="session-history-empty-state mb-0">
                                        No sessions saved for this day.
                                    </p>
                                </div>
                            </div>

                            <div v-else-if="sessionHistoryView === 'heatmap'" class="session-history-heatmap-panel">
                                <div class="session-history-heatmap-head">
                                    <div class="session-history-heatmap-head-copy">
                                        <strong>Last {{ sessionHistoryHeatmapWindowDays }} days</strong>
                                        <p class="mb-0">Darker squares mean more sessions or longer total time. Tap any square to open that day in Calendar.</p>
                                    </div>
                                    <div class="session-history-heatmap-legend" aria-hidden="true">
                                        <span>Less</span>
                                        <span class="session-history-heatmap-swatch is-level-1"></span>
                                        <span class="session-history-heatmap-swatch is-level-2"></span>
                                        <span class="session-history-heatmap-swatch is-level-3"></span>
                                        <span class="session-history-heatmap-swatch is-level-4"></span>
                                        <span>More</span>
                                    </div>
                                </div>
                                <div class="session-history-view-explainer session-history-view-explainer--heatmap">
                                    <strong>How to read Heatmap</strong>
                                    <p class="mb-0">{{ sessionHistoryHeatmapExplanation }}</p>
                                </div>
                                <div class="session-history-heatmap-grid-wrap">
                                    <div
                                        class="session-history-heatmap-board"
                                        :style="sessionHistoryHeatmapBoardStyle">
                                        <div
                                            class="session-history-heatmap-months"
                                            aria-hidden="true">
                                            <span
                                                v-for="marker in sessionHistoryHeatmapMonthMarkers"
                                                :key="`session-history-heatmap-month-${marker.monthKey}`"
                                                class="session-history-heatmap-month-label"
                                                :style="{ gridColumnStart: String(marker.column) }">
                                                {{ marker.label }}
                                            </span>
                                        </div>
                                        <div class="session-history-heatmap-main">
                                            <div class="session-history-heatmap-weekdays" aria-hidden="true">
                                                <span
                                                    v-for="label in sessionHistoryHeatmapWeekdayLabels"
                                                    :key="`session-history-heatmap-weekday-${label}`">
                                                    {{ label }}
                                                </span>
                                            </div>
                                            <div class="session-history-heatmap-grid" role="list" aria-label="Session frequency heatmap">
                                                <button
                                                    v-for="cell in sessionHistoryHeatmapCells"
                                                    :key="`heatmap-cell-${cell.dateKey || cell.slotKey}`"
                                                    type="button"
                                                    class="session-history-heatmap-cell"
                                                    :class="[
                                                        `is-level-${cell.level}`,
                                                        {
                                                            'is-today': cell.isToday,
                                                            'is-padding': !cell.inWindow,
                                                            'is-empty': cell.inWindow && !cell.count
                                                        }
                                                    ]"
                                                    :disabled="!cell.inWindow"
                                                    :title="getSessionHistoryHeatmapCellTitle(cell)"
                                                    @click="openSessionHistoryHeatmapDate(cell.dateKey)">
                                                    <span class="visually-hidden">{{ getSessionHistoryHeatmapCellTitle(cell) }}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <small class="session-history-scroll-hint">
                                    Swipe sideways to scan earlier weeks, then tap any square to open that day in Calendar.
                                </small>
                                <div class="session-history-heatmap-foot">
                                    <span>{{ sessionHistoryHeatmapSummary }}</span>
                                    <span
                                        v-if="sessionHistoryMilestoneMoments.length"
                                        class="session-history-milestone-inline">
                                        <i class="bi" :class="sessionHistoryMilestoneMoments[0].icon" aria-hidden="true"></i>
                                        {{ sessionHistoryMilestoneMoments[0].title }}
                                    </span>
                                </div>
                            </div>

                            <div v-else class="session-history-surah-panel">
                                <div class="session-history-surah-head">
                                    <div class="session-history-surah-head-copy">
                                        <strong>{{ sessionHistorySelectedAnalyticsSurahLabel }}</strong>
                                        <p class="mb-0">A focused view of where your time, notes, and scores are collecting in this surah.</p>
                                    </div>
                                    <label class="session-history-filter-field session-history-filter-field--surah-analytics">
                                        <span class="visually-hidden">Choose surah for analytics</span>
                                        <select v-model="sessionHistoryAnalyticsSurah" class="form-select">
                                            <option
                                                v-for="option in sessionHistoryAvailableSurahOptions"
                                                :key="`session-history-analytics-surah-${option.surahNumber}`"
                                                :value="String(option.surahNumber)">
                                                {{ option.surahNumber }}. {{ option.surahName }}
                                            </option>
                                        </select>
                                    </label>
                                </div>
                                <div class="session-history-view-explainer">
                                    <strong>How to read Surah view</strong>
                                    <p class="mb-0">This page groups saved sessions for one surah so you can see total time invested, average completion score, and the ayahs your notes mention most often.</p>
                                </div>

                                <div v-if="!sessionHistoryAnalyticsEntries.length" class="session-history-empty-state">
                                    <p class="mb-0">No saved sessions match this surah with the current filters.</p>
                                    <button
                                        v-if="sessionHistoryHasActiveFilters"
                                        type="button"
                                        class="btn session-history-entry-btn"
                                        @click="clearSessionHistoryFilters()">
                                        Clear filters
                                    </button>
                                </div>

                                <template v-else>
                                    <div class="session-history-surah-analytics-grid">
                                        <article class="session-history-detail-card">
                                            <span class="session-history-detail-label">Total time</span>
                                            <strong>{{ formatSessionHistoryDuration(sessionHistorySurahAnalytics.totalDurationMs) }}</strong>
                                        </article>
                                        <article class="session-history-detail-card">
                                            <span class="session-history-detail-label">Average score</span>
                                            <strong>{{ sessionHistorySurahAnalytics.averageAccuracy === null ? 'No AI score yet' : `${sessionHistorySurahAnalytics.averageAccuracy}%` }}</strong>
                                        </article>
                                        <article class="session-history-detail-card">
                                            <span class="session-history-detail-label">Saved sessions</span>
                                            <strong>{{ sessionHistorySurahAnalytics.sessionsCount }}</strong>
                                        </article>
                                        <article class="session-history-detail-card">
                                            <span class="session-history-detail-label">Most revisited range</span>
                                            <strong>{{ sessionHistorySurahAnalytics.topRangeLabel }}</strong>
                                        </article>
                                    </div>

                                    <section class="session-history-surah-section">
                                        <div class="session-history-surah-section-head">
                                            <strong>Ayahs mentioned in notes most often</strong>
                                            <small>Useful for spotting weak points and transition trouble spots.</small>
                                        </div>
                                        <div
                                            v-if="sessionHistorySurahAnalytics.topAyahMentions.length"
                                            class="session-history-surah-ayah-list">
                                            <span
                                                v-for="item in sessionHistorySurahAnalytics.topAyahMentions"
                                                :key="`session-history-ayah-mention-${item.ayahNumber}`"
                                                class="session-history-surah-ayah-pill">
                                                Ayah {{ item.ayahNumber }} · {{ item.count }} note{{ item.count === 1 ? '' : 's' }}
                                            </span>
                                        </div>
                                        <p v-else class="session-history-surah-empty mb-0">
                                            Notes for this surah have not mentioned specific ayahs yet.
                                        </p>
                                    </section>

                                    <section class="session-history-surah-section">
                                        <div class="session-history-surah-section-head">
                                            <strong>Recent notes for this surah</strong>
                                            <small>Open a session from List if you want to edit or reload one of these runs.</small>
                                        </div>
                                        <div
                                            v-if="sessionHistorySurahAnalytics.recentNotedSessions.length"
                                            class="session-history-surah-note-list">
                                            <article
                                                v-for="entry in sessionHistorySurahAnalytics.recentNotedSessions"
                                                :key="`session-history-surah-note-${entry.id}`"
                                                class="session-history-surah-note-card">
                                                <div class="session-history-surah-note-head">
                                                    <div>
                                                        <strong>{{ formatSessionHistoryRange(entry) }}</strong>
                                                        <small>{{ formatSessionHistoryDateTime(entry.endedAt) }}</small>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        class="btn session-history-selected-panel-back-btn"
                                                        @click="sessionHistoryView = 'list'; setSessionHistorySelectedEntry(entry.id)">
                                                        Open session
                                                    </button>
                                                </div>
                                                <p class="mb-0">{{ entry.note }}</p>
                                            </article>
                                        </div>
                                        <p v-else class="session-history-surah-empty mb-0">
                                            No notes are saved for this surah yet.
                                        </p>
                                    </section>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div class="modal fade hifz-plan-wizard-modal" id="hifzPlanWizardModal" tabindex="-1" aria-labelledby="hifzPlanWizardModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content" :class="{ 'surat-dark-modal': isDarkTheme }">
                        <div class="modal-header">
                            <div>
                                <h5 class="modal-title" id="hifzPlanWizardModalLabel">Create Hifz Plan</h5>
                                <p class="hifz-plan-modal-subtitle mb-0">Turn your memorization goal into daily, trackable targets.</p>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <section class="hifz-plan-wizard-section">
                                <h6 class="hifz-plan-wizard-title mb-0">1) Choose Target</h6>
                                <div class="hifz-plan-choice-grid">
                                    <button
                                        type="button"
                                        class="btn hifz-plan-choice-btn"
                                        :class="{ 'is-active': hifzWizard.targetType === 'whole-quran' }"
                                        @click="hifzWizard.targetType = 'whole-quran'">
                                        Whole Quran
                                    </button>
                                    <button
                                        type="button"
                                        class="btn hifz-plan-choice-btn"
                                        :class="{ 'is-active': hifzWizard.targetType === 'specific-juz' }"
                                        @click="hifzWizard.targetType = 'specific-juz'">
                                        Specific Juz
                                    </button>
                                    <button
                                        type="button"
                                        class="btn hifz-plan-choice-btn"
                                        :class="{ 'is-active': hifzWizard.targetType === 'specific-surah' }"
                                        @click="hifzWizard.targetType = 'specific-surah'">
                                        Specific Surah
                                    </button>
                                    <button
                                        type="button"
                                        class="btn hifz-plan-choice-btn"
                                        :class="{ 'is-active': hifzWizard.targetType === 'custom-range' }"
                                        @click="hifzWizard.targetType = 'custom-range'">
                                        Custom Range
                                    </button>
                                </div>

                                <div v-if="hifzWizard.targetType === 'specific-juz'" class="hifz-plan-wizard-field">
                                    <label class="form-label">Juz</label>
                                    <select class="form-select" v-model.number="hifzWizard.targetJuzNumber">
                                        <option v-for="juz in juzMetadata" :key="juz.number" :value="juz.number">
                                            Juz {{ juz.number }} · starts {{ juz.surahName }}:{{ juz.ayahNumber }}
                                        </option>
                                    </select>
                                </div>

                                <div v-if="hifzWizard.targetType === 'specific-surah'" class="hifz-plan-wizard-field">
                                    <label class="form-label">Surah</label>
                                    <select class="form-select" v-model.number="hifzWizard.targetSurahNumber">
                                        <option v-for="surah in surahs" :key="surah.number" :value="surah.number">
                                            {{ surah.number }}. {{ surah.englishName }}
                                        </option>
                                    </select>
                                </div>

                                <div v-if="hifzWizard.targetType === 'custom-range'" class="hifz-plan-wizard-custom-range-grid">
                                    <label class="hifz-plan-wizard-field">
                                        <span class="form-label">Start Surah</span>
                                        <select class="form-select" v-model.number="hifzWizard.customStartSurah">
                                            <option v-for="surah in surahs" :key="`hifz-start-${surah.number}`" :value="surah.number">
                                                {{ surah.number }}. {{ surah.englishName }}
                                            </option>
                                        </select>
                                    </label>
                                    <label class="hifz-plan-wizard-field">
                                        <span class="form-label">Start Ayah</span>
                                        <input
                                            type="number"
                                            min="1"
                                            :max="Math.max(1, Number(getSurahAyahCountByNumber(hifzWizard.customStartSurah) || 1))"
                                            class="form-control"
                                            v-model.number="hifzWizard.customStartAyah">
                                    </label>
                                    <label class="hifz-plan-wizard-field">
                                        <span class="form-label">End Surah</span>
                                        <select class="form-select" v-model.number="hifzWizard.customEndSurah">
                                            <option v-for="surah in surahs" :key="`hifz-end-${surah.number}`" :value="surah.number">
                                                {{ surah.number }}. {{ surah.englishName }}
                                            </option>
                                        </select>
                                    </label>
                                    <label class="hifz-plan-wizard-field">
                                        <span class="form-label">End Ayah</span>
                                        <input
                                            type="number"
                                            min="1"
                                            :max="Math.max(1, Number(getSurahAyahCountByNumber(hifzWizard.customEndSurah) || 1))"
                                            class="form-control"
                                            v-model.number="hifzWizard.customEndAyah">
                                    </label>
                                </div>
                            </section>

                            <section class="hifz-plan-wizard-section">
                                <h6 class="hifz-plan-wizard-title mb-0">2) Set Deadline</h6>
                                <div class="hifz-plan-choice-grid">
                                    <button
                                        type="button"
                                        class="btn hifz-plan-choice-btn"
                                        :class="{ 'is-active': hifzWizard.deadlineType === 'by-ramadan' }"
                                        @click="hifzWizard.deadlineType = 'by-ramadan'">
                                        By Ramadan
                                    </button>
                                    <button
                                        type="button"
                                        class="btn hifz-plan-choice-btn"
                                        :class="{ 'is-active': hifzWizard.deadlineType === 'by-date' }"
                                        @click="hifzWizard.deadlineType = 'by-date'">
                                        By Date
                                    </button>
                                    <button
                                        type="button"
                                        class="btn hifz-plan-choice-btn"
                                        :class="{ 'is-active': hifzWizard.deadlineType === 'in-days' }"
                                        @click="hifzWizard.deadlineType = 'in-days'">
                                        In Days
                                    </button>
                                </div>
                                <label v-if="hifzWizard.deadlineType === 'by-date'" class="hifz-plan-wizard-field">
                                    <span class="form-label">Target date</span>
                                    <input type="date" class="form-control" v-model="hifzWizard.deadlineDate">
                                </label>
                                <label v-if="hifzWizard.deadlineType === 'in-days'" class="hifz-plan-wizard-field">
                                    <span class="form-label">Number of days</span>
                                    <input type="number" min="1" max="3650" class="form-control" v-model.number="hifzWizard.deadlineDays">
                                </label>
                                <div v-if="hifzWizard.deadlineType === 'in-days'" class="hifz-plan-ratio-presets" role="group" aria-label="Deadline quick picks">
                                    <button type="button" class="btn hifz-plan-ratio-preset-btn" @click="hifzWizard.deadlineDays = 30">30 days</button>
                                    <button type="button" class="btn hifz-plan-ratio-preset-btn" @click="hifzWizard.deadlineDays = 60">60 days</button>
                                    <button type="button" class="btn hifz-plan-ratio-preset-btn" @click="hifzWizard.deadlineDays = 90">90 days</button>
                                </div>
                            </section>

                            <section class="hifz-plan-wizard-section">
                                <h6 class="hifz-plan-wizard-title mb-0">3) Optional Settings</h6>
                                <label class="hifz-plan-wizard-field">
                                    <span class="form-label">Plan name (optional)</span>
                                    <input type="text" class="form-control" v-model.trim="hifzWizard.planName" placeholder="Example: Ramadan Hifz Sprint">
                                </label>
                                <button
                                    type="button"
                                    class="btn hifz-plan-inline-toggle-btn"
                                    @click="isHifzWizardAdvancedOpen = !isHifzWizardAdvancedOpen"
                                    :aria-expanded="isHifzWizardAdvancedOpen ? 'true' : 'false'">
                                    <span>{{ isHifzWizardAdvancedOpen ? "Hide" : "Customize" }} schedule settings</span>
                                    <i class="bi" :class="isHifzWizardAdvancedOpen ? 'bi-chevron-up' : 'bi-chevron-down'" aria-hidden="true"></i>
                                </button>
                                <div v-if="isHifzWizardAdvancedOpen" class="hifz-plan-advanced-stack">
                                    <label class="hifz-plan-toggle-row">
                                        <span>
                                            <strong>Include revision days</strong>
                                            <small>Reserve every Nth working day for review only.</small>
                                        </span>
                                        <span class="form-check form-switch mb-0">
                                            <input class="form-check-input" type="checkbox" v-model="hifzWizard.includeRevisionDays">
                                        </span>
                                    </label>
                                    <label v-if="hifzWizard.includeRevisionDays" class="hifz-plan-wizard-field">
                                        <span class="form-label">Revision cadence</span>
                                        <input type="number" min="2" max="30" class="form-control" v-model.number="hifzWizard.revisionEveryDays">
                                    </label>
                                    <div class="hifz-plan-ratio-grid">
                                        <label class="hifz-plan-wizard-field">
                                            <span class="form-label">New verses ratio (%)</span>
                                            <input type="number" min="1" max="100" class="form-control" v-model.number="hifzWizard.newVerseRatio">
                                        </label>
                                        <label class="hifz-plan-wizard-field">
                                            <span class="form-label">Review ratio (%)</span>
                                            <input type="number" min="0" max="100" class="form-control" v-model.number="hifzWizard.reviewVerseRatio">
                                        </label>
                                    </div>
                                    <div class="hifz-plan-ratio-presets" role="group" aria-label="Ratio presets">
                                        <button type="button" class="btn hifz-plan-ratio-preset-btn" @click="applyHifzWizardRatioPreset(70, 30)">Balanced 70/30</button>
                                        <button type="button" class="btn hifz-plan-ratio-preset-btn" @click="applyHifzWizardRatioPreset(85, 15)">New-heavy 85/15</button>
                                        <button type="button" class="btn hifz-plan-ratio-preset-btn" @click="applyHifzWizardRatioPreset(60, 40)">Review-heavy 60/40</button>
                                    </div>
                                    <p class="hifz-plan-ratio-helper mb-0">
                                        {{ hifzWizardRatioStatus }}
                                    </p>
                                    <fieldset class="hifz-plan-rest-days-fieldset">
                                        <legend>Rest days</legend>
                                        <div class="hifz-plan-rest-days-grid">
                                            <button
                                                v-for="option in hifzRestDayOptions"
                                                :key="`hifz-rest-day-${option.value}`"
                                                type="button"
                                                class="btn hifz-plan-rest-day-pill"
                                                :class="{ 'is-active': hifzWizard.restDays.includes(option.value) }"
                                                @click="toggleHifzWizardRestDay(option.value)">
                                                <span>{{ option.label }}</span>
                                                <i
                                                    class="bi"
                                                    :class="hifzWizard.restDays.includes(option.value) ? 'bi-check-circle-fill' : 'bi-circle'"
                                                    aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </fieldset>
                                </div>
                            </section>

                            <section class="hifz-plan-wizard-preview" aria-label="Plan preview">
                                <h6 class="hifz-plan-wizard-title mb-0">Plan Preview</h6>
                                <div class="hifz-plan-preview-grid">
                                    <article class="hifz-plan-preview-card">
                                        <small>Total ayahs</small>
                                        <strong>{{ hifzWizardPreview.totalAyahs }}</strong>
                                    </article>
                                    <article class="hifz-plan-preview-card">
                                        <small>Working days</small>
                                        <strong>{{ hifzWizardPreview.workingDays }}</strong>
                                    </article>
                                    <article class="hifz-plan-preview-card">
                                        <small>Daily ayahs</small>
                                        <strong>{{ hifzWizardPreview.dailyAyahs }}</strong>
                                    </article>
                                    <article class="hifz-plan-preview-card">
                                        <small>Deadline</small>
                                        <strong>{{ hifzWizardPreview.deadlineDateKey ? formatDateKey(hifzWizardPreview.deadlineDateKey) : "Not set" }}</strong>
                                    </article>
                                </div>
                                <p class="hifz-plan-preview-note mb-0">
                                    Daily Goals and Review Queue sync automatically once this plan is active.
                                </p>
                                <p v-if="hifzPlanWizardError" class="hifz-plan-wizard-error mb-0">
                                    {{ hifzPlanWizardError }}
                                </p>
                            </section>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                class="btn hifz-plan-modal-primary-btn"
                                :disabled="!hifzWizardPreview.totalAyahs"
                                @click="createHifzPlanFromWizard">
                                Create Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div class="modal fade hifz-plan-dashboard-modal" id="hifzPlanDashboardModal" tabindex="-1" aria-labelledby="hifzPlanDashboardModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content" :class="{ 'surat-dark-modal': isDarkTheme }">
                        <div class="modal-header">
                            <div>
                                <h5 class="modal-title" id="hifzPlanDashboardModalLabel">Hifz Plan Dashboard</h5>
                                <p class="hifz-plan-modal-subtitle mb-0">Track progress, complete daily targets, and auto-adjust your schedule.</p>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div v-if="!hasHifzPlans" class="hifz-plan-dashboard-empty">
                                <p class="mb-0">No plans yet. Load starter plans or create your first Hifz plan.</p>
                                <div class="hifz-plan-dashboard-empty-actions">
                                    <button type="button" class="btn hifz-plan-modal-primary-btn" @click="seedHifzPlans({ announce: true })">
                                        Load starter plans
                                    </button>
                                    <button type="button" class="btn hifz-plan-dashboard-btn" @click="openHifzPlanWizard">
                                        Create new plan
                                    </button>
                                </div>
                            </div>

                            <div v-else class="hifz-plan-dashboard-content">
                                <div v-if="hasOnlySeededHifzPlans" class="memorisation-starter-note">
                                    Starter plans are loaded so you can explore the planner immediately.
                                </div>
                                <div class="hifz-plan-dashboard-topbar">
                                    <label class="hifz-plan-wizard-field mb-0">
                                        <span class="form-label">Active plan</span>
                                            <select class="form-select" v-model="hifzActivePlanId" @change="onHifzActivePlanChanged">
                                            <option
                                                v-for="plan in hifzPlansSorted"
                                                :key="`hifz-dashboard-${plan.id}`"
                                                :value="plan.id">
                                                {{ plan.name }}
                                            </option>
                                        </select>
                                    </label>
                                    <div class="hifz-plan-dashboard-topbar-actions">
                                        <button
                                            type="button"
                                            class="btn hifz-plan-dashboard-btn hifz-plan-dashboard-btn-primary"
                                            :disabled="!activeHifzPlanTodayEntry || activeHifzPlanTodayEntry.isRestDay"
                                            @click="openActiveHifzTodayTarget">
                                            Start today's target
                                        </button>
                                        <button
                                            type="button"
                                            class="btn hifz-plan-dashboard-btn hifz-plan-dashboard-btn-danger hifz-plan-dashboard-btn-icon"
                                            @click="deleteActiveHifzPlan">
                                            <i class="bi bi-trash3" aria-hidden="true"></i>
                                            <span class="visually-hidden">Delete Active Plan</span>
                                        </button>
                                    </div>
                                </div>

                                <section class="hifz-plan-dashboard-summary">
                                    <div class="hifz-plan-dashboard-summary-head">
                                        <div>
                                            <h6 class="mb-0">{{ activeHifzPlan?.name || "Hifz Plan" }}</h6>
                                            <small>{{ activeHifzPlan?.targetLabel || "Custom target" }} · Deadline {{ activeHifzPlan?.deadlineDateKey ? formatDateKey(activeHifzPlan.deadlineDateKey) : "Not set" }}</small>
                                        </div>
                                        <span class="hifz-plan-dashboard-summary-pill">
                                            {{ activeHifzPlanProgressPercent }}%
                                        </span>
                                    </div>
                                    <div class="progress hifz-plan-dashboard-progress-track" role="progressbar" aria-label="Hifz dashboard progress" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="activeHifzPlanProgressPercent">
                                        <div class="progress-bar hifz-plan-dashboard-progress-bar" :style="{ width: `${activeHifzPlanProgressPercent}%` }"></div>
                                    </div>
                                    <div class="hifz-plan-dashboard-summary-meta">
                                        <span>{{ activeHifzPlanProgressLabel }}</span>
                                        <span>{{ activeHifzPlanAheadBehindLabel }}</span>
                                    </div>
                                    <p class="hifz-plan-dashboard-today-target mb-0">
                                        {{ activeHifzPlanTodayTargetSentence }}
                                    </p>
                                    <p class="hifz-plan-dashboard-auto-adjust-note mb-0">
                                        Auto-adjust enabled: missed days redistribute across the remaining schedule.
                                    </p>
                                </section>

                                <section class="hifz-plan-dashboard-calendar">
                                    <div class="hifz-plan-dashboard-calendar-head">
                                        <h6 class="mb-0">Calendar</h6>
                                        <div class="hifz-plan-dashboard-calendar-controls">
                                            <button type="button" class="btn hifz-plan-dashboard-calendar-btn" @click="shiftHifzDashboardMonth(-1)">
                                                <i class="bi bi-chevron-left" aria-hidden="true"></i>
                                            </button>
                                            <button type="button" class="btn hifz-plan-dashboard-calendar-btn hifz-plan-dashboard-calendar-btn-label" @click="setHifzDashboardMonthToToday()">
                                                {{ hifzDashboardMonthLabel }}
                                            </button>
                                            <button type="button" class="btn hifz-plan-dashboard-calendar-btn" @click="shiftHifzDashboardMonth(1)">
                                                <i class="bi bi-chevron-right" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="hifz-plan-dashboard-calendar-layout">
                                        <div class="hifz-plan-dashboard-calendar-month">
                                            <div class="hifz-plan-dashboard-weekday-row">
                                                <span
                                                    v-for="label in hifzDashboardWeekdayLabels"
                                                    :key="`hifz-weekday-${label}`">
                                                    {{ label }}
                                                </span>
                                            </div>
                                            <div class="hifz-plan-dashboard-month-grid">
                                                <button
                                                    v-for="cell in hifzDashboardCalendarCells"
                                                    :key="`hifz-calendar-${cell.dateKey}`"
                                                    :id="`hifz-dashboard-day-${cell.dateKey}`"
                                                    type="button"
                                                    class="hifz-plan-dashboard-day-cell"
                                                    :class="{
                                                        'is-outside': !cell.isCurrentMonth,
                                                        'is-selected': cell.dateKey === hifzDashboardEffectiveSelectedDateKey,
                                                        'is-today': cell.isToday,
                                                        'is-completed': cell.entry?.completed,
                                                        'is-rest-day': cell.entry?.isRestDay,
                                                        'is-revision-day': cell.entry?.isRevisionDay && !cell.entry?.isRestDay,
                                                        'has-entry': !!cell.entry
                                                    }"
                                                    :disabled="!cell.isCurrentMonth"
                                                    :aria-label="formatDateKey(cell.dateKey)"
                                                    @click="selectHifzDashboardDate(cell.dateKey)"
                                                    @dblclick="cell.entry && openHifzScheduleEntryTarget(cell.entry)">
                                                    <span class="hifz-plan-dashboard-day-cell-head">
                                                        <strong>{{ cell.dayNumber }}</strong>
                                                        <i
                                                            v-if="cell.entry?.completed"
                                                            class="bi bi-check-circle-fill"
                                                            aria-hidden="true"></i>
                                                    </span>
                                                    <small class="hifz-plan-dashboard-day-cell-meta">
                                                        {{ cell.entry ? formatHifzCalendarTargetBadge(cell.entry) : "No target" }}
                                                    </small>
                                                </button>
                                            </div>
                                        </div>

                                        <aside class="hifz-plan-dashboard-day-panel">
                                            <div class="hifz-plan-dashboard-day-panel-head">
                                                <h6 class="mb-0">{{ hifzDashboardSelectedDateLabel || "Selected day" }}</h6>
                                                <span class="hifz-plan-dashboard-day-panel-status">
                                                    {{ hifzDashboardSelectedEntry ? getHifzScheduleEntryStatusLabel(hifzDashboardSelectedEntry) : "No target" }}
                                                </span>
                                            </div>
                                            <p class="hifz-plan-dashboard-day-panel-badge mb-0">
                                                {{ hifzDashboardSelectedEntry ? formatHifzCalendarTargetBadge(hifzDashboardSelectedEntry) : "No memorization target scheduled." }}
                                            </p>
                                            <p class="hifz-plan-dashboard-day-panel-target mb-0">
                                                {{ hifzDashboardSelectedEntry ? formatHifzScheduleEntryTargetSentence(hifzDashboardSelectedEntry) : "Use this day for light review or recovery." }}
                                            </p>
                                            <div class="hifz-plan-dashboard-day-panel-actions">
                                                <button
                                                    type="button"
                                                    class="btn hifz-plan-dashboard-btn hifz-plan-dashboard-btn-primary"
                                                    :disabled="!canOpenHifzScheduleEntry(hifzDashboardSelectedEntry)"
                                                    @click="openHifzScheduleEntryTarget(hifzDashboardSelectedEntry)">
                                                    Open Target
                                                </button>
                                                <label class="form-check hifz-plan-dashboard-day-panel-check">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        :checked="!!hifzDashboardSelectedEntry?.completed"
                                                        :disabled="!hifzDashboardSelectedEntry || hifzDashboardSelectedEntry.isRestDay"
                                                        :aria-label="`Mark ${hifzDashboardEffectiveSelectedDateKey} complete`"
                                                        @change="hifzDashboardSelectedEntry && onHifzScheduleEntryCompletionChange(activeHifzPlan?.id, hifzDashboardSelectedEntry.dateKey, $event.target.checked)">
                                                    <span>Mark complete</span>
                                                </label>
                                            </div>
                                        </aside>
                                    </div>

                                    <div v-if="!hifzDashboardCalendarEntries.length" class="hifz-plan-dashboard-calendar-empty">
                                        No scheduled targets in this month.
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div class="modal fade hifdh-plan-modal" id="hifdhPlanModal" tabindex="-1" aria-labelledby="hifdhPlanModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                    <div class="modal-content" :class="{ 'surat-dark-modal': isDarkTheme }">
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

                            <nav class="hifdh-panel-nav" aria-label="Hifdh quick navigation">
                                <button type="button" class="hifdh-panel-nav-btn" @click="scrollHifdhPanelTo('start')">
                                    <i class="bi bi-play-circle" aria-hidden="true"></i>
                                    Start
                                </button>
                                <button type="button" class="hifdh-panel-nav-btn" @click="scrollHifdhPanelTo('due')">
                                    <i class="bi bi-list-check" aria-hidden="true"></i>
                                    Due
                                </button>
                                <button type="button" class="hifdh-panel-nav-btn" @click="scrollHifdhPanelTo('insights')">
                                    <i class="bi bi-graph-up-arrow" aria-hidden="true"></i>
                                    Insights
                                </button>
                            </nav>

                            <section class="hifdh-glance-grid" aria-label="Hifdh summary snapshot">
                                <article class="hifdh-glance-card">
                                    <small>Due today</small>
                                    <strong>{{ todayHifdhPlanItemsOrdered.length }}</strong>
                                </article>
                                <article class="hifdh-glance-card">
                                    <small>Plan progress</small>
                                    <strong>{{ hifdhCompletionSummary }}</strong>
                                </article>
                                <article class="hifdh-glance-card">
                                    <small>Consistency</small>
                                    <strong>{{ hifdhConsistencyPillLabel }}</strong>
                                </article>
                            </section>

                            <section class="hifdh-flow-overview" aria-label="Hifdh plan navigation">
                                <article class="hifdh-flow-step-card">
                                    <span class="hifdh-flow-step-index">1</span>
                                    <div class="hifdh-flow-step-copy">
                                        <strong>Pick your start</strong>
                                        <small>Use a quick start button or set an ayah range.</small>
                                    </div>
                                </article>
                                <article class="hifdh-flow-step-card">
                                    <span class="hifdh-flow-step-index">2</span>
                                    <div class="hifdh-flow-step-copy">
                                        <strong>Add and begin</strong>
                                        <small>Press <b>Add &amp; Start</b> to open today&apos;s guided recitation.</small>
                                    </div>
                                </article>
                                <article class="hifdh-flow-step-card">
                                    <span class="hifdh-flow-step-index">3</span>
                                    <div class="hifdh-flow-step-copy">
                                        <strong>Review what is due</strong>
                                        <small>Open items in <b>Due Segments</b> to continue your plan.</small>
                                    </div>
                                </article>
                            </section>

                            <section ref="hifdhSectionStart" class="hifdh-onboarding-invite hifdh-onboarding-invite--compact" aria-label="Hifdh quick start">
                                <div class="hifdh-onboarding-invite-content">
                                    <p class="hifdh-onboarding-invite-title mb-1">Quick Start</p>
                                    <p class="hifdh-onboarding-invite-copy mb-2">Choose a shortcut or create your own range below.</p>
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

                            <div class="memorisation-simple-controls hifdh-control-panel hifdh-primary-stack">
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

                            <div ref="hifdhSectionDue" class="memorisation-simple-list hifdh-primary-stack">
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

                            <details ref="hifdhSectionInsights" class="hifdh-insights-disclosure">
                                <summary class="hifdh-insights-summary">
                                    <span class="hifdh-insights-summary-main">
                                        <i class="bi bi-graph-up-arrow" aria-hidden="true"></i>
                                        Progress insights
                                    </span>
                                    <span class="hifdh-insights-summary-meta">
                                        <span class="hifdh-insights-meta-closed">Show details</span>
                                        <span class="hifdh-insights-meta-open">Hide details</span>
                                        <i class="bi bi-chevron-down hifdh-insights-summary-caret" aria-hidden="true"></i>
                                    </span>
                                </summary>
                                <div class="hifdh-insights-body">
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
                                </div>
                            </details>

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
            <div class="playlist-modal-card ltr-text" :class="{ 'surat-dark-modal': isDarkTheme }" @click.stop>
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
            <div
                class="sticky-dropdown"
                ref="stickyDropdown"
                v-show="!isMemorisationToolbarVisible"
                :class="{ collapsed: !isVisible }">
                <div class="filter-header">
                    <div class="filter-actions"></div>
                </div>
                <div class="sidebar-toggle">
                    <button type="button" class="btn btn-sm w-100 d-flex align-items-center justify-content-center gap-2 sidebar-collapse-button" 
                        @click="toggleSidebar"
                        :aria-expanded="!sidebarCollapsed"
                        :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
                        <i class="bi sidebar-collapse-button-icon" :class="sidebarCollapsed ? 'bi-chevron-double-right' : 'bi-chevron-double-left'"></i>
                        <span v-if="!sidebarCollapsed" class="sidebar-collapse-button-label">Collapse Custom Sidebar</span>
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
                                                    <div class="sidebar-surah-name-pair">
                                                        <div class="item-title-en">{{ surah.englishName }}</div>
                                                        <div class="item-title-ar text-end">
                                                            {{ surah.name }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button"
                                                class="btn sidebar-info-button ms-2"
                                                @click.stop="openSurahInfo(surah)"
                                                aria-label="View surah information">
                                                <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
                                            </button>
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
            <div v-show="!isMemorisationToolbarVisible" class="surah-offcanvas-trigger">
                <button type="button" class="btn btn-primary surah-offcanvas-toggle icon-only" data-bs-toggle="offcanvas"
                    data-bs-target="#surahOffcanvas" aria-controls="surahOffcanvas"
                    @click="prepareSettingsDraft">
                    <i class="bi bi-sliders" aria-hidden="true"></i>
                    <span class="visually-hidden">Filters & info</span>
                </button>
            </div>
            <div class="offcanvas offcanvas-start surah-offcanvas" :class="{ 'surat-dark-modal': isDarkTheme }" tabindex="-1" id="surahOffcanvas"
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

            <div
                v-if="isMemorisationChainingActive"
                class="memorisation-chaining-host ltr-text">
                <section
                    class="memorisation-chaining-display"
                    :class="[
                        `is-${memorisationChainingStatusTone}`,
                        `is-mode-${memorisationChainingMode}`
                    ]"
                    role="status"
                    aria-live="polite">
                    <div class="memorisation-chaining-display-head">
                        <div class="memorisation-chaining-display-copy">
                            <div class="memorisation-chaining-display-eyebrow">Chaining Method</div>
                            <div class="memorisation-chaining-display-title-row">
                                <h3 class="memorisation-chaining-display-title mb-0">{{ memorisationChainingModeLabel }}</h3>
                                <span class="memorisation-chaining-display-state-pill" :class="`is-${memorisationChainingStatusTone}`">
                                    {{ memorisationChainingStatusTitle }}
                                </span>
                            </div>
                            <p class="memorisation-chaining-display-text mb-0">
                                {{ memorisationChainingStatusText }}
                            </p>
                        </div>
                        <div class="memorisation-chaining-display-badges">
                            <span class="memorisation-chaining-display-badge">{{ memorisationChainingStageLabel }}</span>
                            <span class="memorisation-chaining-display-badge">{{ memorisationChainingAudioGuidanceLabel }}</span>
                            <span class="memorisation-chaining-display-badge">{{ memorisationChainingBlurProgressionLabel }}</span>
                        </div>
                    </div>

                    <div class="memorisation-chaining-display-metrics">
                        <div class="memorisation-chaining-display-metric">
                            <span>Chain strength</span>
                            <strong>{{ memorisationChainingCurrentChainLength }} verse{{ memorisationChainingCurrentChainLength === 1 ? "" : "s" }}</strong>
                        </div>
                        <div class="memorisation-chaining-display-metric">
                            <span>Estimated time</span>
                            <strong>{{ memorisationChainingEstimatedTimeLabel }}</strong>
                        </div>
                        <div class="memorisation-chaining-display-metric">
                            <span>Completion</span>
                            <strong>{{ memorisationChainingProgressPercent }}%</strong>
                        </div>
                    </div>

                    <div class="memorisation-chaining-progress-track" aria-hidden="true">
                        <span
                            class="memorisation-chaining-progress-fill"
                            :style="{ width: `${memorisationChainingProgressPercent}%` }"></span>
                    </div>

                    <div class="memorisation-chaining-link-row" aria-label="Current memorisation chain">
                        <div
                            v-for="link in memorisationChainingChainLinks"
                            :key="`memorisation-chain-link-${link.index}`"
                            class="memorisation-chaining-link"
                            :class="`is-${link.state}`">
                            <span>{{ link.ayahNumber }}</span>
                        </div>
                    </div>

                    <div class="memorisation-chaining-display-footer">
                        <div class="memorisation-chaining-display-footer-copy">
                            <strong>{{ memorisationChainingChainStrengthLabel }}</strong>
                            <small>{{ memorisationChainingCompletionActionLabel }}</small>
                        </div>
                        <div class="memorisation-chaining-display-actions">
                            <button
                                type="button"
                                class="btn memorisation-chaining-display-btn memorisation-chaining-display-btn-primary"
                                @click="continueMemorisationChaining">
                                {{ memorisationChainingPrimaryActionLabel }}
                            </button>
                            <button
                                v-if="memorisationChainingAudioGuidance !== 'silent'"
                                type="button"
                                class="btn memorisation-chaining-display-btn"
                                @click="replayCurrentMemorisationChainingRound">
                                Replay round
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <div
                v-if="isVerseCountdownVisible && (verseCountdownPositionResolved === 'title' || (verseCountdownPositionResolved === 'floating' && (!verseCountdownUseSideRail || !verseCountdownAnchorVisible)))"
                class="verse-countdown-host ltr-text"
                :class="{
                    'verse-countdown-host--floating': verseCountdownPositionResolved === 'floating',
                    'verse-countdown-host--title': verseCountdownPositionResolved === 'title',
                }">
                <section
                    class="verse-countdown-display"
                    :class="[
                        `verse-countdown-display--${verseCountdownDisplayStyleResolved}`,
                        { 'is-complete': verseCountdownIsCompleted, 'is-celebrating': isVerseCountdownCelebrating },
                    ]"
                    role="status"
                    aria-live="polite">
                    <div class="verse-countdown-main">
                        <div class="verse-countdown-main-head">
                            <div class="verse-countdown-heading">Verse Countdown</div>
                            <span class="verse-countdown-state-pill" :class="{ 'is-complete': verseCountdownIsCompleted }">
                                {{ verseCountdownIsCompleted ? "Completed" : "In progress" }}
                            </span>
                        </div>
                        <p v-if="verseCountdownShowText" class="verse-countdown-meta mb-0">
                            Verse {{ verseCountdownCurrentVerseOrdinal }} of {{ verseCountdownTotalVerses }}
                        </p>
                        <p v-if="verseCountdownShowPercentage" class="verse-countdown-meta mb-0">
                            {{ verseCountdownProgressPercent }}% complete
                        </p>
                        <p class="verse-countdown-subtext mb-0">
                            {{ verseCountdownSubtextLabel }}
                        </p>
                        <p v-if="verseCountdownAlmostThereMessage" class="verse-countdown-callout mb-0">
                            {{ verseCountdownAlmostThereMessage }}
                        </p>
                        <p v-if="verseCountdownIsCompleted" class="verse-countdown-complete mb-0">
                            Range completed. Great consistency.
                        </p>
                    </div>
                    <div v-if="verseCountdownShowCircle" class="verse-countdown-circle" :style="verseCountdownCircleStyle">
                        <span>{{ verseCountdownCompletedVerses }}/{{ verseCountdownTotalVerses }}</span>
                    </div>
                    <div v-if="verseCountdownShowProgress" class="verse-countdown-progress">
                        <div class="verse-countdown-progress-track">
                            <span class="verse-countdown-progress-fill" :style="{ width: `${verseCountdownProgressPercent}%` }"></span>
                        </div>
                        <p class="verse-countdown-progress-blocks mb-0">
                            {{ verseCountdownProgressBlockText }} ({{ verseCountdownCompletedVerses }}/{{ verseCountdownTotalVerses }} verses done)
                        </p>
                    </div>
                </section>
            </div>

            <div class="row rtl-text" ref="listContainer" role="list" aria-label="Ayah verses list"
                :style="!isMemorisationModeActive
                    ? { paddingTop: topSpacerHeight + 'px', paddingBottom: bottomSpacerHeight + 'px' }
                    : null">
                <div ref="audioCard" v-for="item in visibleWindow"
                    :key="getAyahCardRenderKey(item)" class="col-12 col-md-8 mb-2 mt-2 ayah-card ayah-card-container ayah-card-shell" role="listitem"
                    :id="`ayah-card-${item.index}`" :data-ayah-number="item.ayah.numberInSurah" @click="handleAyahCardClick(item.index, $event)"
                    @touchstart.passive="onAyahCardTouchStart(item.index, $event)"
                    @touchmove="onAyahCardTouchMove($event)"
                    @touchend="onAyahCardTouchEnd($event)"
                    @touchcancel="resetAyahCardSwipeGesture()"
                    @pointerdown="onAyahCardPointerDown(item.index, $event)"
                    @pointermove="onAyahCardPointerMove($event)"
                    @pointerup="onAyahCardPointerUp($event)"
                    @pointercancel="resetAyahCardPointerGesture()"
                    @keydown.enter.prevent="toggleAudioPlayer(item.index)"
                    @keydown.space.prevent="toggleAudioPlayer(item.index)"
                    :draggable="isPlaylistEditorVisible && !isTabletOrMobile" tabindex="0"
                    @dragstart="onAyahDragStart(item.ayah, $event)"                     :class="{
                        highlighted:
                            isHighlighted && activeAyahIndex === item.index,
                        'currently-playing': isAudioPlaying[item.index],
                        'memorisation-repetition-active': isMemorisationRepetitionActive && item.index === currentlyPlayingIndex,
                        'swipe-transition': swipeTransitionIndex === item.index,
                        'swipe-transition-next': swipeTransitionIndex === item.index && swipeTransitionDirection > 0,
                        'swipe-transition-prev': swipeTransitionIndex === item.index && swipeTransitionDirection < 0,
                        'is-pinned': isAyahPinned(item.ayah),
                        'memorisation-past': isMemorisationModeActive && item.role === 'past',
                        'memorisation-current': isMemorisationModeActive && item.role === 'current',
                        'memorisation-next': isMemorisationModeActive && item.role === 'next',
                        'ayah-card-container--countdown-anchor': isVerseCountdownSideAnchorItem(item),
                        'ayah-card-container--menu-open':
                            openAyahPlaylistMenuKey === getAyahPlaylistMenuKey(item.ayah),
                    }">
                    <div class="ayah-surface rtl-text d-flex flex-column">
                        <div class="ayah-card-header ltr-text">
                            <div class="ayah-card-reference-wrap">
                                <div class="ayah-card-reference">
                                    <i class="bi bi-book" aria-hidden="true"></i>
                                    <span class="ayah-card-reference-surah">
                                        {{ surahDetails?.surahNumber }}
                                    </span>
                                    <span class="ayah-card-reference-separator">/</span>
                                    <span class="ayah-card-reference-ayah">
                                        {{ getAyahDisplayNumber(item) }}
                                    </span>
                                </div>
                            </div>
                            <div class="ayah-card-header-toolbar">
                                <div class="ayah-card-header-primary">
                                    <button
                                        type="button"
                                        class="btn ayah-tafseer-trigger"
                                        :class="{ 'is-active': isTafsirModalOpenFor(item) }"
                                        @click.stop="toggleAyahTafsir(item)"
                                        aria-label="Open Tafseer"
                                        title="Open Tafseer">
                                        Tafseer
                                    </button>
                                <div class="form-check form-switch translation-toggle ayah-header-toggle ayah-translation-toggle">
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
                                <div class="form-check form-switch translation-toggle ayah-header-toggle ayah-transliteration-toggle">
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
                                </div>
                                <div
                                    class="ayah-card-menu"
                                    @click.stop
                                    @keydown.esc.stop.prevent="closeAyahPlaylistMenu">
                                    <button
                                        type="button"
                                        class="btn ayah-menu-trigger"
                                        @click.stop="toggleAyahPlaylistMenu(item.ayah)"
                                        :aria-expanded="openAyahPlaylistMenuKey === getAyahPlaylistMenuKey(item.ayah) ? 'true' : 'false'"
                                        aria-label="Open ayah options">
                                        <i class="bi bi-three-dots" aria-hidden="true"></i>
                                    </button>
                                    <div
                                        v-if="openAyahPlaylistMenuKey === getAyahPlaylistMenuKey(item.ayah)"
                                        class="ayah-playlist-menu ayah-actions-menu"
                                        @click.stop>
                                        <button
                                            type="button"
                                            class="ayah-playlist-menu-item"
                                            @click.stop="handleAyahMenuSurahInfo()">
                                            <span class="ayah-actions-leading-label">
                                                <i class="bi bi-info-circle" aria-hidden="true"></i>
                                                <span>Surah Info</span>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            class="ayah-playlist-menu-item ayah-playlist-menu-item-copy"
                                            @click.stop="handleAyahMenuCopy(item.ayah)">
                                            <span class="ayah-actions-leading-label">
                                                <i class="bi bi-clipboard" aria-hidden="true"></i>
                                                <span>Copy to Clipboard</span>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            class="ayah-playlist-menu-item d-md-none"
                                            @click.stop="closeAyahPlaylistMenu(); toggleAyahTafsir(item)">
                                            <span class="ayah-actions-leading-label">
                                                <i class="bi bi-journal-richtext" aria-hidden="true"></i>
                                                <span>Tafsir</span>
                                            </span>
                                        </button>
                                        <div class="ayah-playlist-menu-row">
                                            <button
                                                type="button"
                                                class="ayah-playlist-menu-item ayah-playlist-menu-item-submenu"
                                                :class="{ 'is-open': openAyahPlaylistExistingSubmenuKey === getAyahPlaylistMenuKey(item.ayah) }"
                                                @click.stop="toggleAyahExistingPlaylistSubmenu(item.ayah)">
                                                <span class="ayah-actions-leading-label">
                                                    <i class="bi bi-collection-play" aria-hidden="true"></i>
                                                    <span>Playlist</span>
                                                </span>
                                                <i class="bi bi-chevron-left" aria-hidden="true"></i>
                                            </button>
                                            <div
                                                v-if="openAyahPlaylistExistingSubmenuKey === getAyahPlaylistMenuKey(item.ayah)"
                                                class="ayah-playlist-submenu ayah-actions-submenu"
                                                @click.stop>
                                                <p
                                                    v-if="!sortedCustomPlaylists.length"
                                                    class="ayah-playlist-menu-label mb-0">
                                                    No playlists yet.
                                                </p>
                                                <button
                                                    v-for="playlist in sortedCustomPlaylists"
                                                    :key="`ayah-playlist-${playlist.id}-${getAyahPlaylistMenuKey(item.ayah)}`"
                                                    type="button"
                                                    class="ayah-playlist-menu-item ayah-playlist-menu-item-playlist"
                                                    @click.stop="isAyahInCustomPlaylist(item.ayah, playlist.id)
                                                        ? removeAyahFromCustomPlaylist(item.ayah, playlist.id)
                                                        : saveAyahToCustomPlaylist(item.ayah, playlist.id)">
                                                    <span>{{ playlist.name || 'Untitled Playlist' }}</span>
                                                    <i
                                                        class="bi"
                                                        :class="isAyahInCustomPlaylist(item.ayah, playlist.id) ? 'bi-check-circle-fill' : 'bi-plus-circle'"
                                                        aria-hidden="true"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    class="ayah-playlist-menu-item"
                                                    @click.stop="closeAyahPlaylistMenu(); openCreatePlaylistModal(item.ayah)">
                                                    <span>Create playlist</span>
                                                    <i class="bi bi-plus-square" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            class="ayah-playlist-menu-item"
                                            @click.stop="handleAyahMenuPin(item.ayah)">
                                            <span class="ayah-actions-leading-label">
                                                <i
                                                    class="bi"
                                                    :class="isAyahPinned(item.ayah) ? 'bi-pin-angle-fill' : 'bi-pin-angle'"
                                                    aria-hidden="true"></i>
                                                <span>Pin Ayah</span>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            class="ayah-playlist-menu-item"
                                            :disabled="!item.ayah?.audio || isAyahAudioDownloading(item.ayah)"
                                            @click.stop="handleAyahMenuDownload(item.ayah)">
                                            <span class="ayah-actions-leading-label">
                                                <i
                                                    class="bi"
                                                    :class="isAyahAudioDownloading(item.ayah)
                                                        ? 'bi-arrow-repeat ic-spin'
                                                        : isAyahAudioDownloaded(item.ayah)
                                                            ? 'bi-check-circle-fill'
                                                            : 'bi-cloud-arrow-down'"
                                                    aria-hidden="true"></i>
                                                <span>Download Ayah</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            v-if="isAudioPlaying[item.index]
                                || (isMemorisationRangeLoopCountdownVisible && item.index === memorisationRangeLoopCountdownFromIndex)
                                || isMemorisationRepeatPauseActiveForIndex(item.index)"
                            class="ayah-card-status-row ltr-text">
                            <span v-if="isAudioPlaying[item.index]" class="now-playing-tag">
                                Now playing
                            </span>
                            <span
                                v-if="isMemorisationRangeLoopCountdownVisible && item.index === memorisationRangeLoopCountdownFromIndex"
                                class="now-playing-tag now-playing-tag-loop-countdown">
                                Loop restarts in {{ memorisationRangeLoopCountdownSeconds }}s
                            </span>
                            <div
                                v-if="isMemorisationRepeatPauseActiveForIndex(item.index)"
                                class="now-playing-tag now-playing-tag-repeat-after"
                                role="status"
                                aria-live="polite">
                                <span class="now-playing-tag-repeat-after-title">
                                    Your turn to repeat
                                </span>
                                <small>{{ memorisationRepeatPauseStatusText }}</small>
                                <span class="now-playing-tag-repeat-after-actions">
                                    <button
                                        type="button"
                                        class="btn now-playing-tag-repeat-after-btn"
                                        @click.stop="continueMemorisationRepeatAfterPause">
                                        {{ memorisationRepeatAfterPauseMode === "manual" ? "Continue" : "Skip wait" }}
                                    </button>
                                    <button
                                        v-if="memorisationRepeatAfterRecordEnabled"
                                        type="button"
                                        class="btn now-playing-tag-repeat-after-btn now-playing-tag-repeat-after-btn-mic"
                                        @click.stop="toggleMemorisationRepeatAfterRecording"
                                        :aria-label="isMemorisationRepeatRecording ? 'Stop repetition recording' : 'Record repetition'">
                                        <i
                                            class="bi"
                                            :class="isMemorisationRepeatRecording ? 'bi-stop-circle-fill' : 'bi-mic-fill'"
                                            aria-hidden="true"></i>
                                        {{ isMemorisationRepeatRecording ? "Stop" : "Record" }}
                                    </button>
                                    <button
                                        v-if="getLatestMemorisationRepeatRecording(item.index)"
                                        type="button"
                                        class="btn now-playing-tag-repeat-after-btn"
                                        @click.stop="playLatestMemorisationRepeatRecording(item.index)">
                                        Play latest
                                    </button>
                                </span>
                                <small v-if="memorisationRepeatRecordingError">{{ memorisationRepeatRecordingError }}</small>
                            </div>
                        </div>

                        <transition name="feedback-fade">
                            <span v-if="
                                feedbackMessages[
                                    buildAyahKey(
                                        surahDetails?.surahNumber,
                                        item.ayah.numberInSurah || item.ayah.number
                                    )
                                ]
                            " class="badge rounded-pill feedback-badge ayah-feedback-message"
                                :class="feedbackMessages[
                                    buildAyahKey(
                                        surahDetails?.surahNumber,
                                        item.ayah.numberInSurah || item.ayah.number
                                    )
                                ].class">
                                <i v-if="
                                    feedbackMessages[
                                        buildAyahKey(
                                            surahDetails?.surahNumber,
                                            item.ayah.numberInSurah || item.ayah.number
                                        )
                                    ].icon === 'check'
                                " class="bi bi-check-circle-fill feedback-badge-icon"></i>
                                <i v-else-if="
                                    feedbackMessages[
                                        buildAyahKey(
                                            surahDetails?.surahNumber,
                                            item.ayah.numberInSurah || item.ayah.number
                                        )
                                    ].icon === 'trash'
                                " class="bi bi-trash-fill feedback-badge-icon"></i>
                                <i v-else-if="
                                    feedbackMessages[
                                        buildAyahKey(
                                            surahDetails?.surahNumber,
                                            item.ayah.numberInSurah || item.ayah.number
                                        )
                                    ].icon === 'warning'
                                " class="bi bi-exclamation-triangle-fill feedback-badge-icon"></i>
                                {{
                                    feedbackMessages[
                                        buildAyahKey(
                                            surahDetails?.surahNumber,
                                            item.ayah.numberInSurah || item.ayah.number
                                        )
                                    ].text
                                }}
                                <a v-if="
                                    feedbackMessages[
                                        buildAyahKey(
                                            surahDetails?.surahNumber,
                                            item.ayah.numberInSurah || item.ayah.number
                                        )
                                    ].link
                                " class="auth-alert-link ms-1" :href="feedbackMessages[
                                    buildAyahKey(
                                        surahDetails?.surahNumber,
                                        item.ayah.numberInSurah || item.ayah.number
                                    )
                                ].link" @click.stop>
                                    {{
                                        feedbackMessages[
                                            buildAyahKey(
                                                surahDetails?.surahNumber,
                                                item.ayah.numberInSurah || item.ayah.number
                                            )
                                        ].linkText || "Log in"
                                    }}
                                </a>
                            </span>
                        </transition>

                        <div class="ayah-card-body" role="group" aria-label="Ayah text">
                            <div class="ayah-card-copy">
                                <p
                                    v-if="!shouldHideVerseTextForRepeatPause(item.index)"
                                    :class="[
                                        'arabic-text rtl-text text-end mb-3',
                                        {
                                            'arabic-text--active':
                                                currentlyPlayingIndex === item.index &&
                                                isAudioPlaying[item.index],
                                            'repeat-pause-text-dimmed':
                                                shouldDimVerseTextForRepeatPause(item.index),
                                        },
                                    ]"
                                    v-html="highlightedText(item.ayah)"
                                    @click="onAyahWordClick(item, $event)"
                                    :style="getAyahArabicTextStyle(item.index)"
                                ></p>
                                <div
                                    v-if="shouldShowTranslationForRepeatPause(item)"
                                    class="translation-header ltr-text">
                                    <p class="ayah-card-copy-label mb-0">Translation</p>
                                </div>
                                <div
                                    class="translation-row"
                                    :class="{ 'translation-row--collapsed': !shouldShowTranslationForRepeatPause(item) }">
                                    <div class="translation-copy flex-grow-1">
                                        <div v-if="shouldShowTranslationForRepeatPause(item)">
                                            <p
                                                :class="[
                                                    'fw-regular ltr-text flex-grow-1 translation-text',
                                                    {
                                                        'translation-text--active':
                                                            currentlyPlayingIndex === item.index &&
                                                            isAudioPlaying[item.index],
                                                        'translation-text--placeholder':
                                                            !item.ayah.translation,
                                                    },
                                                ]"
                                                v-html="highlightText(getTranslationText(item))"
                                                :style="`font-size: ${effectiveAyahBodyFontSize}px !important;`"
                                            ></p>
                                        </div>
                                        <template v-else></template>
                                        <div
                                            v-if="isTransliterationVisibleFor(item) && !shouldHideVerseTextForRepeatPause(item.index)"
                                            class="transliteration-header ltr-text">
                                            <p class="ayah-card-copy-label mb-0">Transliteration</p>
                                        </div>
                                        <p
                                            v-if="isTransliterationVisibleFor(item) && !shouldHideVerseTextForRepeatPause(item.index)"
                                            :class="[
                                                'fw-regular ltr-text flex-grow-1 transliteration-text',
                                                {
                                                    'transliteration-text--active':
                                                        currentlyPlayingIndex === item.index &&
                                                        isAudioPlaying[item.index],
                                                    'repeat-pause-text-dimmed':
                                                        shouldDimVerseTextForRepeatPause(item.index),
                                                },
                                            ]"
                                            v-html="highlightText(item.ayah.transliteration || transliterationFallbackText)"
                                            :style="`font-size: ${effectiveAyahBodyFontSize}px !important;`"
                                        ></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ayah-card-footer ltr-text" role="group" aria-label="Ayah footer actions">
                            <div class="ayah-card-footer-main">
                                <button
                                    type="button"
                                    class="ayah-footer-action"
                                    :class="{
                                        'is-active': isAudioPlaying[item.index],
                                    }"
                                    data-tooltip-label="Play Audio"
                                    @click.stop.prevent="toggleAudioPlayer(item.index)"
                                    :aria-label="isAudioPlaying[item.index]
                                        ? 'Pause ayah ' + getAyahDisplayNumber(item)
                                        : 'Play ayah ' + getAyahDisplayNumber(item)">
                                    <i
                                        class="bi"
                                        :class="isAudioPlaying[item.index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"
                                        aria-hidden="true"></i>
                                    <span>Play Audio</span>
                                </button>
                                <button
                                    type="button"
                                    class="ayah-footer-action"
                                    :class="{
                                        'is-active': isAyahSaved(item.ayah),
                                    }"
                                    data-tooltip-label="Bookmark"
                                    @click.stop="toggleBookmark(item.ayah)"
                                    :aria-label="isAyahSaved(item.ayah) ? 'Remove bookmark' : 'Bookmark ayah'">
                                    <i
                                        class="bi"
                                        :class="isAyahSaved(item.ayah) ? 'bi-bookmark-fill' : 'bi-bookmark'"
                                        aria-hidden="true"></i>
                                    <span>Bookmark</span>
                                </button>
                                <button
                                    type="button"
                                    class="ayah-footer-action"
                                    :class="{
                                        'is-active': hasReflection(item.ayah),
                                    }"
                                    data-tooltip-label="Reflect"
                                    @click.stop="openReflectionModal(item.ayah)"
                                    :aria-label="hasReflection(item.ayah) ? 'Edit reflection' : 'Add reflection'">
                                    <i
                                        class="bi"
                                        :class="hasReflection(item.ayah) ? 'bi-journal-check' : 'bi-journal-text'"
                                        aria-hidden="true"></i>
                                    <span>Reflect</span>
                                </button>
                                <button
                                    type="button"
                                    class="ayah-footer-action"
                                    data-tooltip-label="Share"
                                    @click.stop="shareAyah(item.ayah)"
                                    aria-label="Share ayah">
                                    <i class="bi bi-share" aria-hidden="true"></i>
                                    <span>Share</span>
                                </button>
                            </div>
                            <div class="ayah-card-footer-text-controls" role="group" aria-label="Text size controls">
                                <button
                                    type="button"
                                    class="ayah-footer-action ayah-footer-action--text"
                                    data-tooltip-label="Decrease Text"
                                    @click.stop="decreaseFontSize"
                                    aria-label="Decrease text size">
                                    <i class="bi bi-dash-circle" aria-hidden="true"></i>
                                    <span>Text -</span>
                                </button>
                                <button
                                    type="button"
                                    class="ayah-footer-action ayah-footer-action--text"
                                    data-tooltip-label="Increase Text"
                                    @click.stop="increaseFontSize"
                                    aria-label="Increase text size">
                                    <i class="bi bi-plus-circle" aria-hidden="true"></i>
                                    <span>Text +</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="isVerseCountdownSideAnchorItem(item)"
                        class="verse-countdown-side-wrap ltr-text">
                        <section
                            class="verse-countdown-display verse-countdown-display--side"
                            :class="[
                                `verse-countdown-display--${verseCountdownDisplayStyleResolved}`,
                                { 'is-complete': verseCountdownIsCompleted, 'is-celebrating': isVerseCountdownCelebrating },
                            ]"
                            role="status"
                            aria-live="polite">
                            <div class="verse-countdown-main">
                                <div class="verse-countdown-main-head">
                                    <div class="verse-countdown-heading">Verse Countdown</div>
                                    <span class="verse-countdown-state-pill" :class="{ 'is-complete': verseCountdownIsCompleted }">
                                        {{ verseCountdownIsCompleted ? "Completed" : "In progress" }}
                                    </span>
                                </div>
                                <p v-if="verseCountdownShowText" class="verse-countdown-meta mb-0">
                                    Verse {{ verseCountdownCurrentVerseOrdinal }} of {{ verseCountdownTotalVerses }}
                                </p>
                                <p v-if="verseCountdownShowPercentage" class="verse-countdown-meta mb-0">
                                    {{ verseCountdownProgressPercent }}% complete
                                </p>
                                <p class="verse-countdown-subtext mb-0">
                                    {{ verseCountdownSubtextLabel }}
                                </p>
                                <p v-if="verseCountdownAlmostThereMessage" class="verse-countdown-callout mb-0">
                                    {{ verseCountdownAlmostThereMessage }}
                                </p>
                                <p v-if="verseCountdownIsCompleted" class="verse-countdown-complete mb-0">
                                    Range completed. Great consistency.
                                </p>
                            </div>
                            <div v-if="verseCountdownShowCircle" class="verse-countdown-circle" :style="verseCountdownCircleStyle">
                                <span>{{ verseCountdownCompletedVerses }}/{{ verseCountdownTotalVerses }}</span>
                            </div>
                            <div v-if="verseCountdownShowProgress" class="verse-countdown-progress">
                                <div class="verse-countdown-progress-track">
                                    <span class="verse-countdown-progress-fill" :style="{ width: `${verseCountdownProgressPercent}%` }"></span>
                                </div>
                                <p class="verse-countdown-progress-blocks mb-0">
                                    {{ verseCountdownProgressBlockText }} ({{ verseCountdownCompletedVerses }}/{{ verseCountdownTotalVerses }} verses done)
                                </p>
                            </div>
                        </section>
                    </div>
                    <hr
                        v-if="item.index !== visibleWindow[visibleWindow.length - 1]?.index"
                        class="ayah-verse-divider"
                        aria-hidden="true">
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

        <bookmark-modal :ayah="activeAyah" :dark-theme="isDarkTheme" @saved="onBookmarkSaved" />

        <teleport to="body">
            <div
                class="modal fade verse-countdown-complete-modal"
                :id="verseCountdownCompleteModalId"
                tabindex="-1"
                aria-labelledby="verseCountdownCompleteModalLabel"
                aria-hidden="true"
                data-bs-backdrop="static">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content verse-countdown-complete-modal-content" :class="{ 'surat-dark-modal': isDarkTheme }">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title" id="verseCountdownCompleteModalLabel">
                                Success Complete
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body pt-2">
                            <div class="verse-countdown-complete-hero">
                                <div class="verse-countdown-complete-icon">
                                    <i class="bi bi-check2-circle" aria-hidden="true"></i>
                                </div>
                                <p class="verse-countdown-complete-title mb-1">
                                    Session completed successfully. 100% complete.
                                </p>
                                <p class="verse-countdown-complete-subtitle mb-0">
                                    {{ verseCountdownCompletionSummaryLabel }}
                                </p>
                            </div>
                            <div class="verse-countdown-complete-metrics">
                                <div class="verse-countdown-complete-metric">
                                    <small>Verses completed</small>
                                    <strong>{{ verseCountdownTotalVerses }}/{{ verseCountdownTotalVerses }}</strong>
                                </div>
                                <div class="verse-countdown-complete-metric">
                                    <small>Playback range</small>
                                    <strong>{{ verseCountdownRangeBounds.start }} - {{ verseCountdownRangeBounds.end }}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0 pt-0">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn verse-countdown-complete-replay-btn" @click="replayVerseCountdownRangeFromModal">
                                Replay range
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div class="modal fade surat-onboarding-shell"
                :id="suratOnboardingModalId"
                tabindex="-1"
                aria-labelledby="suratOnboardingLabel"
                aria-hidden="true"
                data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-2xl">
                    <div class="modal-content surat-onboarding-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
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
                <div class="modal-dialog modal-dialog-centered modal-xxl">
                    <div class="modal-content translation-compare-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
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
                            <section class="translation-compare-controls">
                                <div class="translation-compare-controls-head">
                                    <div class="translation-compare-controls-meta" role="status" aria-live="polite">
                                        Surah {{ translationCompareSurahNumber }} · Ayah {{ translationCompareAyahNumber }} / {{ Math.max(translationCompareTotalAyahs, 1) }}
                                    </div>
                                    <button
                                        type="button"
                                        class="btn translation-compare-collapse-btn"
                                        :aria-expanded="translationCompareInlineCollapsed ? 'false' : 'true'"
                                        :aria-label="translationCompareInlineCollapsed ? 'Show highlight and tools' : 'Hide highlight and tools'"
                                        aria-controls="translationCompareInlineTools"
                                        @click="toggleTranslationCompareInlineCollapsed">
                                        <i
                                            class="bi"
                                            :class="translationCompareInlineCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'"
                                            aria-hidden="true"></i>
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

                                <div
                                    id="translationCompareInlineTools"
                                    v-show="!translationCompareInlineCollapsed"
                                    class="translation-compare-inline-row">
                                    <div class="translation-compare-highlight-row">
                                        <label class="translation-compare-field translation-compare-highlight-field">
                                            <div class="translation-compare-field-head">
                                                <span>Highlight in translations</span>
                                                <span
                                                    v-if="translationCompareHighlightFeedbackLabel"
                                                    class="translation-compare-highlight-feedback">
                                                    {{ translationCompareHighlightFeedbackLabel }}
                                                </span>
                                            </div>
                                            <div class="translation-compare-highlight-input-wrap">
                                                <i class="bi bi-search" aria-hidden="true"></i>
                                                <input
                                                    type="text"
                                                    class="form-control translation-compare-highlight-input"
                                                    v-model="translationCompareHighlightQuery"
                                                    placeholder="Type a word or phrase to highlight in both translations"
                                                    aria-label="Highlight words in translation columns only" />
                                                <button
                                                    v-if="translationCompareHighlightQuery"
                                                    type="button"
                                                    class="btn translation-compare-highlight-clear"
                                                    @click="translationCompareHighlightQuery = ''"
                                                    aria-label="Clear translation highlight search">
                                                    Clear
                                                </button>
                                            </div>
                                        </label>
                                    </div>

                                    <div class="translation-compare-tools-row" role="group" aria-label="Reader tools">
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
                            </section>

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
                                        :style="`font-size: ${effectiveArabicFontSize}px !important;`"></p>
                                    <p
                                        v-if="showWordTranslation"
                                        class="translation-compare-interlinear-note mb-0">
                                        Interlinear gloss follows the Arabic right-to-left reading flow.
                                    </p>
                                </article>

                                <section
                                    class="translation-compare-grid"
                                    :class="{ 'has-two-columns': translationCompareDisplayColumns.length === 2 }"
                                    :style="translationCompareGridStyle">
                                    <article
                                        v-for="column in translationCompareDisplayColumns"
                                        :key="`translation-col-${column.translation.identifier}`"
                                        class="translation-compare-card"
                                        :class="`is-${column.variant}`">
                                        <div class="translation-compare-card-head">
                                            <div class="translation-compare-card-head-copy">
                                                <h6 class="mb-0">{{ column.translation.englishName }}</h6>
                                                <p class="translation-compare-card-subtitle mb-0">{{ column.translation.identifier }}</p>
                                            </div>
                                        </div>
                                        <p
                                            v-if="translationCompareHighlightQuery.trim()"
                                            class="translation-compare-match-count mb-2">
                                            {{ formatTranslationCompareMatchCount(column.matchCount) }}
                                        </p>
                                        <p
                                            class="translation-compare-text mb-0"
                                            v-html="column.html"
                                            :style="`font-size: ${effectiveAyahBodyFontSize}px !important;`"></p>
                                    </article>
                                </section>
                            </div>

                            <div class="translation-compare-pagination-wrap" role="group" aria-label="Ayah pagination">
                                <div class="translation-compare-simple-pagination">
                                    <button
                                        type="button"
                                        class="btn translation-compare-pagination-btn"
                                        :disabled="translationCompareAyahNumber <= 1"
                                        @click="stepTranslationCompareAyah(-1)">
                                        <i class="bi bi-chevron-left" aria-hidden="true"></i>
                                        <span>Prev</span>
                                    </button>
                                    <div class="translation-compare-pagination-counter" aria-live="polite">
                                        {{ translationCompareAyahNumber }} / {{ Math.max(translationCompareTotalAyahs, 1) }}
                                    </div>
                                    <button
                                        type="button"
                                        class="btn translation-compare-pagination-btn"
                                        :disabled="translationCompareAyahNumber >= translationCompareTotalAyahs"
                                        @click="stepTranslationCompareAyah(1)">
                                        <span>Next</span>
                                        <i class="bi bi-chevron-right" aria-hidden="true"></i>
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
                    <div class="modal-content tajweed-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
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
                    <div class="modal-content surah-info-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
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
                    <div class="modal-content surah-settings-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
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
                                <div class="col-12 col-md-6">
                                    <div class="surah-settings-group h-100">
                                        <label class="form-label">Gesture navigation</label>
                                        <select
                                            class="form-select"
                                            v-model="settingsDraft.gestureNavigationEnabled"
                                            aria-label="Gesture navigation">
                                            <option :value="true">Enabled</option>
                                            <option :value="false">Disabled</option>
                                        </select>
                                        <small class="text-muted d-block mt-1">
                                            Use a two-finger swipe on ayah cards: right opens the next surah and left opens the previous surah, then verse 1 is highlighted.
                                        </small>
                                        <button
                                            type="button"
                                            class="btn btn-link surah-gesture-guide-link p-0 mt-2"
                                            @click="openGestureGuideModal"
                                            aria-label="Open swipe and tap gestures guide modal">
                                            <i class="bi bi-info-circle me-1" aria-hidden="true"></i>
                                            Open swipe/tap guide
                                        </button>
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
            <div
                class="modal fade surat-gesture-guide-shell"
                :id="gestureGuideModalId"
                tabindex="-1"
                aria-labelledby="suratGestureGuideLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable surat-gesture-modal-dialog">
                    <div class="modal-content surat-gesture-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
                        <div class="modal-header">
                            <div>
                                <h4 class="modal-title" id="suratGestureGuideLabel">
                                    <b>Swipe &amp; Tap Gestures Guide</b>
                                </h4>
                                <p class="surat-gesture-intro mb-0">
                                    Use these gestures on ayah cards to navigate faster and control playback.
                                </p>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="surat-gesture-grid">
                                <article class="surat-gesture-card">
                                    <h6 class="surat-gesture-card-title">
                                        <i class="bi bi-arrow-left-right" aria-hidden="true"></i>
                                        Swipe Gestures
                                    </h6>
                                    <ul class="surat-gesture-list mb-0">
                                        <li>
                                            <strong>Two-finger swipe right:</strong> open the next surah and highlight verse 1.
                                        </li>
                                        <li>
                                            <strong>Two-finger swipe left:</strong> open the previous surah and highlight verse 1.
                                        </li>
                                        <li>
                                            <strong>At first/last surah:</strong> swipe does not wrap around.
                                        </li>
                                    </ul>
                                </article>

                                <article class="surat-gesture-card">
                                    <h6 class="surat-gesture-card-title">
                                        <i class="bi bi-hand-index-thumb" aria-hidden="true"></i>
                                        Tap &amp; Hold Gestures
                                    </h6>
                                    <ul class="surat-gesture-list mb-0">
                                        <li>
                                            <strong>Single tap ayah card:</strong> select the ayah (or pause if it is currently playing).
                                        </li>
                                        <li>
                                            <strong>Double tap same paused ayah:</strong> resume playback from that ayah.
                                        </li>
                                        <li>
                                            <strong>Long press ayah card:</strong> open the ayah tafsir modal.
                                        </li>
                                        <li>
                                            <strong>Tap a word:</strong> when Word tooltip + tap audio is enabled, the tapped word can play with tooltip support.
                                        </li>
                                    </ul>
                                </article>
                            </div>
                            <p class="surat-gesture-tip mb-0">
                                Tip: You can enable or disable swipe behavior from Display settings using
                                <strong>Gesture navigation</strong>.
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>

        <teleport to="body">
            <div v-if="!isMobile" class="offcanvas offcanvas-end quran-font-offcanvas" :class="{ 'surat-dark-modal': isDarkTheme }" tabindex="-1"
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
                    <div class="modal-content quran-font-modal-content" :class="{ 'surat-dark-modal': isDarkTheme }">
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

        <!-- Ayah Tafsir Modal -->
        <teleport to="body">
            <div
                class="modal fade"
                :id="tafsirModalId"
                tabindex="-1"
                aria-labelledby="ayahTafsirModalLabel"
                aria-hidden="true"
                data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable modal-modern modal-fullscreen-md-down">
                    <div class="modal-content ayah-tafsir-modal-content" :class="{ 'surat-dark-modal': isDarkTheme }">
                        <div class="modal-header">
                            <h6 class="modal-title ayah-tafsir-modal-title" id="ayahTafsirModalLabel">
                                <b>Tafsir</b>
                                <span v-if="tafsirModalReference" class="ayah-tafsir-modal-reference">
                                    • {{ tafsirModalReference }}
                                </span>
                            </h6>
                            <button
                                type="button"
                                class="btn-close"
                                @click="hideAyahTafsirModal"
                                aria-label="Close tafsir modal"></button>
                        </div>
                        <div class="modal-body pt-0">
                            <div class="ayah-tafsir-panel ayah-tafsir-modal-panel" role="status" aria-live="polite">
                                <div class="ayah-tafsir-meta ltr-text">
                                    <div class="ayah-tafsir-meta-item">
                                        <span class="ayah-tafsir-meta-label">Source</span>
                                        <span class="ayah-tafsir-meta-value">{{ getActiveTafsirSourceLabel() }}</span>
                                    </div>
                                    <div class="ayah-tafsir-meta-item">
                                        <span class="ayah-tafsir-meta-label">Proof</span>
                                        <span class="ayah-tafsir-meta-value">{{ getActiveTafsirProofLabel() }}</span>
                                    </div>
                                    <div class="ayah-tafsir-meta-item">
                                        <span class="ayah-tafsir-meta-label">Reference</span>
                                        <span class="ayah-tafsir-meta-value">
                                            {{ getActiveTafsirReferenceLabel() }}
                                        </span>
                                    </div>
                                </div>
                                <p class="ayah-tafsir-label mb-1 ltr-text">Tafsir</p>
                                <p v-if="isActiveTafsirLoading()" class="ayah-tafsir-loading mb-0 ltr-text">
                                    Loading tafsir...
                                </p>
                                <p v-else-if="getActiveTafsirError()" class="ayah-tafsir-error mb-0 ltr-text">
                                    {{ getActiveTafsirError() }}
                                </p>
                                <div v-else-if="getActiveTafsirText()" class="ayah-tafsir-text ayah-tafsir-text-stack">
                                    <p
                                        v-for="(paragraph, index) in getActiveTafsirParagraphs()"
                                        :key="`tafsir-paragraph-${index}`"
                                        class="ayah-tafsir-paragraph mb-0"
                                        :class="[
                                            paragraph.isArabic ? 'ayah-tafsir-paragraph--arabic' : 'ayah-tafsir-paragraph--english',
                                            paragraph.isHeading ? 'ayah-tafsir-paragraph--heading' : ''
                                        ]"
                                        :dir="paragraph.direction"
                                        :lang="paragraph.lang">
                                        {{ paragraph.text }}
                                    </p>
                                </div>
                                <p v-else class="ayah-tafsir-empty mb-0 ltr-text">
                                    No tafsir content available.
                                </p>
                            </div>
                        </div>
                        <div class="modal-footer border-0 pt-0">
                            <button type="button" class="btn btn-outline-secondary" @click="hideAyahTafsirModal">
                                Close
                            </button>
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
                    <div class="modal-content reflection-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
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

        <teleport to="body">
            <div
                class="modal fade voice-command-guide-shell"
                :id="voiceCommandGuideModalId"
                tabindex="-1"
                :aria-labelledby="`${voiceCommandGuideModalId}Label`"
                aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable voice-command-guide-dialog">
                    <div class="modal-content voice-command-guide-modal" :class="{ 'surat-dark-modal': isDarkTheme }">
                        <div class="modal-header">
                            <div>
                                <h4 class="modal-title mb-1" :id="`${voiceCommandGuideModalId}Label`">
                                    <i class="bi bi-mic me-2" aria-hidden="true"></i>
                                    Natural Language Voice Guide
                                </h4>
                                <p class="voice-command-guide-intro mb-0">
                                    {{ voiceCommandGuide.intro }}
                                </p>
                            </div>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close voice command guide"></button>
                        </div>
                        <div class="modal-body">
                            <div class="voice-command-availability-grid">
                                <article
                                    class="voice-command-availability-card"
                                    :class="speechRecognitionSupported ? 'is-ready' : 'is-missing'">
                                    <h6>Browser support</h6>
                                    <p>{{ speechRecognitionSupported ? "Available" : "Unavailable" }}</p>
                                    <small>
                                        {{
                                            speechRecognitionSupported
                                                ? "Speech recognition API is detected."
                                                : "Speech recognition API is not available in this browser."
                                        }}
                                    </small>
                                </article>
                                <article
                                    class="voice-command-availability-card"
                                    :class="isSpeechRecognitionSecureContext() ? 'is-ready' : 'is-missing'">
                                    <h6>Secure context</h6>
                                    <p>{{ isSpeechRecognitionSecureContext() ? "Ready" : "Needs HTTPS" }}</p>
                                    <small>
                                        {{
                                            isSpeechRecognitionSecureContext()
                                                ? "HTTPS or localhost is active."
                                                : "Voice recognition needs HTTPS or localhost."
                                        }}
                                    </small>
                                </article>
                                <article
                                    class="voice-command-availability-card"
                                    :class="voiceCommandsEnabled ? 'is-ready' : 'is-neutral'">
                                    <h6>Current status</h6>
                                    <p>
                                        {{
                                            voiceCommandsEnabled
                                                ? (voiceCommandListening ? "Listening" : "Enabled")
                                                : "Off"
                                        }}
                                    </p>
                                    <small>
                                        Processing delay: {{ voiceCommandCommitDelayMs }}ms after speech pause.
                                    </small>
                                </article>
                            </div>

                            <section class="voice-command-guide-tips-section">
                                <h5>Guidance</h5>
                                <ul class="voice-command-guide-tip-list">
                                    <li v-for="tip in voiceCommandGuide.tips" :key="tip">
                                        {{ tip }}
                                    </li>
                                </ul>
                            </section>

                            <section
                                v-for="group in voiceCommandGuide.groups"
                                :key="group.id"
                                class="voice-command-guide-group">
                                <header class="voice-command-guide-group-header">
                                    <h5>
                                        <i class="bi me-2" :class="group.iconClass" aria-hidden="true"></i>
                                        {{ group.title }}
                                    </h5>
                                    <p>{{ group.summary }}</p>
                                </header>
                                <div class="voice-command-guide-command-grid">
                                    <article
                                        v-for="command in group.commands"
                                        :key="command.id"
                                        class="voice-command-guide-command-card">
                                        <h6>{{ command.label }}</h6>
                                        <div class="voice-command-guide-chip-row">
                                            <span
                                                v-for="keyword in command.keywords"
                                                :key="`${command.id}-${keyword}`"
                                                class="voice-command-guide-chip">
                                                {{ keyword }}
                                            </span>
                                        </div>
                                        <p class="voice-command-guide-example mb-0">
                                            Example: "{{ command.example }}"
                                        </p>
                                    </article>
                                </div>
                            </section>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
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
                            v-if="!isMemorisationToolbarVisible"
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
                    <div v-if="showAudioPlayerQueuePanel && !isMemorisationToolbarVisible" class="audio-player-queue-panel">
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
