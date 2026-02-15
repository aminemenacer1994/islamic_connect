<template>
    <div class="container  surat-premium"
        :class="{
            'has-audio-player': showAudioPlayer,
            'has-sidebar': true,
            'sidebar-collapsed': sidebarCollapsed,
            'mobile-toolbar-pinned': isTabletOrMobile && isToolbarPinned,
            'mobile-toolbar-expanded': isTabletOrMobile && isToolbarPinned && isMobileToolbarExpanded,
            'reading-fullscreen': isReadingFullscreen,
            'deep-focus-mode': isDeepFocusMode
        }"
        :style="quranFontStyle"
        role="main" aria-label="Quran Explorer">
        <div class="row justify-content-center text-center mb-3 reading-fullscreen-chrome quran-reader-hero">
            <div class="col-lg-10 col-xl-10">
                <h1 class="display-5 fw-bold">The Holy Quran</h1>
                <p class="holy-book-description mb-0">Explore the Holy Quran with clear recitations, trusted translations, and practical tools that help you read with focus, listen with understanding, and reflect on each ayah in your daily life.</p>
            </div>
        </div>
        
        <div class="row justify-content-center mb-4">
             <div class="col-md-6">
                 <ContinueReadingCard />
             </div>
        </div>

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
                            class="advanced-quran-mobile-controls"
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
                            class="advanced-quran-mobile-expanded"
                            role="group"
                            aria-label="Extended surah controls">
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
                                    <span class="advanced-quran-mobile-action-btn-state">
                                        {{ isTransliterationAllEnabled ? "On" : "Off" }}
                                    </span>
                                </button>
                            </div>

                            <div class="advanced-quran-mobile-action-grid">
                                <button
                                    type="button"
                                    class="btn advanced-quran-mobile-action-btn advanced-quran-mobile-action-btn-memorisation"
                                    @click="openSuratOnboarding"
                                    aria-label="Open memorisation tools"
                                    title="Open memorisation tools to support repetition, focus, and revision.">
                                    <i class="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
                                    <span class="advanced-quran-mobile-action-label">Memorisation Tools</span>
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
                        <div
                            v-if="desktopSurahContext.englishName || desktopSurahContext.arabicName"
                            class="quran-toolbar-surah-identity quran-toolbar-surah-identity-mobile ltr-text"
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
        <div v-if="(surahDetails || currentSurahInfo) && !isTabletOrMobile && (showDesktopToolbar || showDesktopSurahContext)"
            class="quran-toolbar-sticky ltr-text"
            :class="{
                'quran-toolbar-fixed-shell': showDesktopToolbar,
                'is-pinned': showDesktopToolbar && isToolbarPinned
            }"
            role="region"
            aria-label="Quran quick controls">
            <div v-if="showDesktopToolbar" class="quran-toolbar">
                <button
                    type="button"
                    class="quran-toolbar-btn quran-toolbar-btn-memorisation"
                    @click="openSuratOnboarding"
                    aria-label="Open memorisation tools"
                    title="Open memorisation tools to support repetition, focus, and revision.">
                    <i class="bi bi-journal-bookmark-fill" aria-hidden="true"></i>
                    <span class="quran-toolbar-btn-text">Memorisation Tools</span>
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
                    <span class="quran-toolbar-btn-state">{{ isTransliterationAllEnabled ? "On" : "Off" }}</span>
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
            <div
                v-if="showDesktopToolbar && (desktopSurahContext.englishName || desktopSurahContext.arabicName)"
                class="quran-toolbar-surah-identity ltr-text reading-fullscreen-chrome"
                role="status"
                aria-live="polite"
                aria-atomic="true">
                <transition name="surah-context-fade" mode="out-in">
                    <div
                        :key="desktopSurahContextKey"
                        class="quran-toolbar-surah-identity-inner d-flex align-items-center flex-nowrap">
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
                </transition>
            </div>
            <div v-if="showDesktopSurahContext" class="desktop-surah-context-wrapper ltr-text">
                <transition name="surah-context-fade" mode="out-in">
                    <div
                        :key="desktopSurahContextKey"
                        class="desktop-surah-context-card"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true">
                        <div class="desktop-surah-context-header">
                            <button
                                type="button"
                                class="desktop-surah-context-close"
                                @click.stop="showDesktopSurahContext = false"
                                aria-label="Close surah context"
                                title="Close surah context">
                                <i class="bi bi-x-lg" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="desktop-surah-context-main">
                            <span class="desktop-surah-context-number">
                                {{ desktopSurahContext.number || "—" }}
                            </span>
                            <div class="desktop-surah-context-names">
                                <span class="desktop-surah-context-name">
                                    {{ desktopSurahContext.englishName }}
                                </span>
                                <span
                                    v-if="desktopSurahContext.translationName"
                                    class="desktop-surah-context-translation">
                                    {{ desktopSurahContext.translationName }}
                                </span>
                            </div>
                            <span
                                v-if="desktopSurahContext.arabicName"
                                class="desktop-surah-context-arabic">
                                {{ desktopSurahContext.arabicName }}
                            </span>
                        </div>
                        <div class="desktop-surah-context-meta">
                            <span v-if="desktopSurahContext.ayahCount" class="desktop-surah-context-chip">
                                {{ desktopSurahContext.ayahCount }} ayahs
                            </span>
                            <span v-if="desktopSurahContext.origin" class="desktop-surah-context-chip">
                                Origin: {{ desktopSurahContext.origin }}
                            </span>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div
            v-if="!isTabletOrMobile && (surahDetails || currentSurahInfo) && (!showDesktopToolbar || !showDesktopSurahContext)"
            class="desktop-sticky-restore ltr-text reading-fullscreen-chrome">
            <button
                v-if="!showDesktopToolbar && !showDesktopSurahContext"
                type="button"
                class="desktop-sticky-restore-btn"
                @click="showDesktopToolbar = true; showDesktopSurahContext = true">
                Show toolbar and surah context
            </button>
            <template v-else>
                <button
                    v-if="!showDesktopToolbar"
                    type="button"
                    class="desktop-sticky-restore-btn"
                    @click="showDesktopToolbar = true">
                    Show toolbar
                </button>
                <button
                    v-if="!showDesktopSurahContext"
                    type="button"
                    class="desktop-sticky-restore-btn"
                    @click="showDesktopSurahContext = true">
                    Show surah context
                </button>
            </template>
        </div>
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
                            <div class="sidebar-list-container flex-grow-1 px-0 pb-5">
                                
                                <!-- Surah List -->
                                <div v-if="activeSidebarTab === 'surah'" class="list-group list-group-flush">
                                    <div class="sidebar-item" v-for="surah in filteredSurahs_sidebar" :key="surah.number"
                                        :class="{ active: String(selectedSurah) === String(surah.number) }"
                                        role="button" @click="selectSurah(surah.number)">
                                        <div class="d-flex align-items-center w-100">
                                            <span class="item-number me-3">{{ surah.number }}</span>
                                            <div class="flex-grow-1 text-start">
                                                <div class="item-title-en">{{ surah.englishName }}</div>
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
                                    <div class="sidebar-item" v-for="verse in filteredVersesList" :key="verse.key"
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
                :style="{ paddingTop: topSpacerHeight + 'px', paddingBottom: bottomSpacerHeight + 'px' }">
                <div style="padding: 12px; border-radius: 8px" ref="audioCard" v-for="item in visibleWindow"
                    :key="item.ayah.number" class="col-md-12 mb-2 mt-2 ayah-card ayah-card-container shadow-md" role="listitem"
                    :id="`ayah-card-${item.index}`" :data-ayah-number="item.ayah.numberInSurah" @click="selectCard(item.index)"
                    @keydown.enter.prevent="toggleAudioPlayer(item.index)"
                    @keydown.space.prevent="toggleAudioPlayer(item.index)" draggable="true" tabindex="0"
                    @dragstart="onAyahDragStart(item.ayah, $event)" :class="{
                        highlighted:
                            isHighlighted && activeAyahIndex === item.index,
                        'currently-playing': isAudioPlaying[item.index],
                        'is-pinned': isAyahPinned(item.ayah),
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
                            <div class="row card-teal mb-3 py-2 ayah-inline-controls" style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: 0 -5px;
                            ">
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--font-down" @click="decreaseFontSize" aria-label="Decrease font size"
                                        title="Decrease Font Size">
                                        <i class="bi bi-dash-circle-fill" style="font-size: 1.6rem"
                                            aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">Decrease font size</span>
                                    </button>
                                </div>
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--font-up" @click="increaseFontSize" aria-label="Increase font size"
                                        title="Increase Font Size">
                                        <i class="bi bi-plus-circle-fill" style="font-size: 1.6rem"
                                            aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">Increase font size</span>
                                    </button>
                                </div>
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--rewind" @click="rewindAudio(item.index)"
                                        aria-label="Rewind 15 seconds" title="Rewind">
                                        <i class="bi bi-skip-backward-circle-fill" style="font-size: 1.6rem"
                                            aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">Rewind 15 seconds</span>
                                    </button>
                                </div>
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--play" :class="{
                                        'is-active': isAudioPlaying[item.index],
                                    }" @click="toggleAudioPlayer(item.index)" :aria-label="isAudioPlaying[item.index]
                                        ? 'Pause ayah ' + (item.index + 1)
                                        : 'Play ayah ' + (item.index + 1)
                                        " :title="isAudioPlaying[item.index]
                                            ? 'Pause'
                                            : 'Play'
                                            ">
                                        <i class="bi" :class="isAudioPlaying[item.index]
                                            ? 'bi-pause-circle-fill'
                                            : 'bi-play-circle-fill'
                                            " style="font-size: 1.8rem" aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">{{
                                            isAudioPlaying[item.index]
                                                ? "Pause current verse"
                                                : "Play current verse"
                                        }}</span>
                                    </button>
                                </div>
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--forward" @click="fastForwardAudio(item.index)"
                                        aria-label="Fast forward 20 seconds" title="Fast Forward">
                                        <i class="bi bi-skip-forward-circle-fill" style="font-size: 1.6rem"
                                            aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">Fast forward 20 seconds</span>
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
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn ayah-inline-btn ayah-inline-btn--bookmark" :class="{
                                        'is-saved': isAyahSaved(item.ayah),
                                    }" @click.stop="toggleBookmark(item.ayah)" :title="isAyahSaved(item.ayah)
                                        ? 'Remove bookmark'
                                        : 'Quick save bookmark'
                                        ">
                                        <i class="bi" :class="isAyahSaved(item.ayah)
                                            ? 'bi-bookmark-check-fill'
                                            : 'bi-bookmark-plus-fill'
                                            " style="font-size: 1.6rem" aria-hidden="true"></i>
                                        <span class="ayah-inline-control-label">{{
                                            isAyahSaved(item.ayah)
                                                ? "Remove verse bookmark"
                                                : "Save verse bookmark"
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

        <teleport v-if="showTajweed" to="body">
            <div class="modal fade" id="tajweedRulesModal" tabindex="-1" aria-labelledby="tajweedRulesLabel"
                aria-hidden="true" data-bs-backdrop="true">
                <div class="modal-dialog modal-dialog-centered modal-lg modal-modern">
                    <div class="modal-content tajweed-modal">
                        <div class="modal-header">
                            <h6 class="modal-title" id="tajweedRulesLabel">
                                <b>Tajweed rules</b>
                            </h6>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div v-if="tajweedLegend.length" class="tajweed-rules-grid">
                                <div v-for="item in tajweedLegend" :key="item.name" class="tajweed-rule-row">
                                    <div class="tajweed-rule-en">
                                        <div class="tajweed-rule-title">
                                            <span class="tajweed-rule-code">{{ item.code }}</span>
                                            <span class="tajweed-rule-label">{{ item.label }}</span>
                                        </div>
                                        <div class="tajweed-rule-desc" v-if="item.desc">
                                            {{ item.desc }}
                                        </div>
                                    </div>
                                    <div class="tajweed-rule-color">
                                        <span class="tajweed-swatch" :class="`tajweed-${item.name}`"
                                            aria-hidden="true"></span>
                                    </div>
                                    <div class="tajweed-rule-ar" v-if="item.ar">
                                        <div class="tajweed-rule-ar-title">{{ item.ar }}</div>
                                        <div class="tajweed-rule-ar-desc" v-if="item.arDesc">
                                            {{ item.arDesc }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-muted small">Tajweed rules will appear once a surah loads.</div>
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
                <div class="modal-dialog modal-dialog-centered modal-md modal-modern">
                    <div class="modal-content surah-settings-modal">
                        <div class="modal-header">
                            <h4 class="modal-title" id="surahSettingsLabel">
                                <b>Display settings</b>
                            </h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="surah-settings-group">
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
                            <div class="surah-settings-group">
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
                            <div class="surah-settings-group">
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
                            <div class="surah-settings-group">
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
                            <div class="surah-settings-group">
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
                            <div class="surah-settings-group">
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
                                <b>Reflect and Save a Thought</b>
                            </h6>
                            <button type="button" class="btn-close" @click="hideReflectionModal"
                                aria-label="Close reflection modal"></button>
                        </div>
                        <div class="modal-body pt-0">
                            <div class="reflection-intro">
                                <p class="reflection-intro-title">Why reflections matter</p>
                                <p class="reflection-intro-copy">
                                    Capturing what moves you about this verse keeps its guidance fresh, anchors your
                                    spiritual
                                    growth, and helps the community spot inspirations worth sharing.
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
            <div v-if="showAudioPlayer" class="audio-player-container">
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
