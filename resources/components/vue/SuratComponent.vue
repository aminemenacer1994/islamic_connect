<template>
    <div class="container  surat-premium"
        :class="{ 'has-audio-player': showAudioPlayer, 'has-sidebar': true, 'sidebar-collapsed': sidebarCollapsed }"
        role="main" aria-label="Quran Explorer">
        <div class="row justify-content-center text-center mb-3">
            <div class="col-lg-10 col-xl-10">
                <h1 class="display-5 fw-bold">The Holy Quran</h1>
            </div>
        </div>
        <div v-show="showNextStep" class="next-step-wrapper">
            <div class="mx-auto mb-4 next-step-card">
                <button type="button" :title="nextStepMinimized ? 'Restore' : 'Minimize'" :aria-label="nextStepMinimized
                    ? 'Restore next step'
                    : 'Minimize next step'
                    " @click="toggleNextStepMinimized" class="next-step-toggle">
                    <i class="fas" :class="nextStepMinimized
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
                        <div v-show="nextStepMinimized" class="mb-2 next-step-teaser">
                            <a href="/history" class="fw-semibold text-decoration-none next-step-link">
                                Explore the Seerah timeline
                            </a>
                            <i class="fas fa-arrow-up-right-from-square ms-1 next-step-link-icon"></i>
                        </div>
                        <p v-show="!nextStepMinimized" class="mb-3 next-step-text">
                            Learning how the Qur’an was preserved is a beautiful beginning. When you’re ready, gently
                            continue with the life of the Messenger who lived its message. Walk through a simple,
                            welcoming
                            <a href="/mission" class="fw-semibold text-decoration-none next-step-link">
                                Seerah timeline
                            </a>
                            to see the journey unfold.
                        </p>
                        <a v-show="!nextStepMinimized" href="/mission"
                            class="btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta">
                            Explore Seerah
                            <i class="fas fa-arrow-up-right-from-square ms-2"></i>
                        </a>
                    </div>
                    
                </div>
            </div>
        </div>
        <div v-if="isTabletOrMobile" class="mobile-surah-dropdown-wrapper px-3 mt-3">
            <label class="visually-hidden" for="mobileSurahDropdown">
                Select surah
            </label>
            <div class="d-flex w-100 align-items-center gap-2">
                <select v-if="isMobile" id="mobileSurahDropdown"
                    class="form-select mobile-surah-dropdown shadow-sm flex-grow-1"
                    v-model="selectedSurah"
                    @change="selectSurah(selectedSurah)"
                    aria-label="Select surah">
                    <option v-if="!surahs.length" disabled>Loading surahs...</option>
                    <option v-for="surah in surahs" :key="surah.number" :value="String(surah.number)">
                        {{ surah.number }}. {{ surah.englishName }}
                    </option>
                </select>
                <button type="button"
                    class="btn btn-light shadow-sm next-step-settings-btn-standalone px-3 py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#surahSettingsModal"
                    @click="prepareSettingsDraft"
                    aria-label="Open display settings"
                    title="Display settings">
                    <i class="bi bi-gear-fill"></i>
                </button>
            </div>
        </div>
        <div v-if="isTabletOrMobile && (surahDetails || currentSurahInfo)" class="mobile-surah-info-wrapper px-3">
            <div class="mobile-surah-info-card">
                <div class="mobile-surah-info-text">
                    <p class="mobile-surah-info-eyebrow">Current surah</p>
                    <div class="mobile-surah-info-title">
                        <span class="mobile-surah-info-number">
                            {{
                                currentSurahMeta.number ||
                                surahDetails?.surahNumber ||
                                currentSurahInfo?.number ||
                                selectedSurah ||
                                "—"
                            }}
                        </span>
                        <span class="mobile-surah-info-name">
                            {{
                                surahDetails?.englishName ||
                                surahDetails?.name ||
                                currentSurahInfo?.englishName ||
                                currentSurahInfo?.name ||
                                "Surah"
                            }}
                        </span>
                    </div>
                    <div v-if="currentSurahInfo?.englishNameTranslation" class="mobile-surah-info-translation">
                        {{ currentSurahInfo.englishNameTranslation }}
                    </div>
                    <div v-if="currentSurahInfo?.name" class="mobile-surah-info-arabic">
                        {{ currentSurahInfo.name }}
                    </div>
                    <div class="mobile-surah-info-meta">
                        <span class="mobile-surah-info-chip">
                            {{
                                (currentSurahMeta.ayahCount ||
                                    currentSurahInfo?.numberOfAyahs ||
                                    surahDetails?.ayahs?.length)
                                    ? `${currentSurahMeta.ayahCount ||
                                        currentSurahInfo?.numberOfAyahs ||
                                        surahDetails?.ayahs?.length} ayahs`
                                    : "Ayahs —"
                            }}
                        </span>
                        <span v-if="currentSurahMeta.origin" class="mobile-surah-info-chip">
                            Origin: {{ currentSurahMeta.origin }}
                        </span>
                    </div>
                </div>
                <div class="mobile-surah-info-actions">
                    <button type="button" class="btn mobile-surah-info-btn"
                        @click="openSurahInfo(currentSurahInfo)"
                        :disabled="!currentSurahInfo"
                        aria-label="Open surah information">
                        <i class="bi bi-info-circle" aria-hidden="true"></i>
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
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
                                    <button v-if="!isMobile" type="button" class="tab-btn sidebar-settings-tab ms-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target="#surahSettingsModal"
                                        aria-label="Open sidebar settings"
                                        @click="prepareSettingsDraft">
                                        <i class="bi bi-gear-fill"></i>
                                    </button>
                                </div>

                                

                                <!-- Search Input -->
                                <div class="search-container">
                                    <input type="search" class="form-control sidebar-search-input" 
                                        v-model="sidebarSearchQuery"
                                        :placeholder="`Search ${activeSidebarTab}...`"
                                        aria-label="Search content" />
                                </div>
                                <div v-if="isMobile" class="mobile-sidebar-settings mt-2">
                                    <button type="button" class="btn btn-link text-white p-0 d-flex align-items-center gap-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#surahSettingsModal"
                                        @click="prepareSettingsDraft">
                                        <i class="bi bi-gear-fill"></i>
                                        <span>Display settings</span>
                                    </button>
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
                                                    <i class="bi bi-info-circle"></i>
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
                                         :class="{ active: currentlyPlayingIndex === (verse.number - 1) }"
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
            <!-- <div class="surah-header-sticky" :class="{ 'is-collapsed': headerCollapsed }">
                <transition name="header-slide">
                    <div v-show="!headerCollapsed">
                        <div v-if="isMobile" class="surat-mobile-header">
                            <div class="surat-mobile-header-meta">
                                <span class="mobile-page-label">{{ mobilePageLabel }}</span>
                                <span v-if="mobileJuzLabel && mobileHizbLabel" class="mobile-juz-label">
                                    {{ mobileJuzLabel }} / {{ mobileHizbLabel }}
                                </span>
                                <span v-else-if="mobileJuzLabel" class="mobile-juz-label">
                                    {{ mobileJuzLabel }}
                                </span>
                            </div>
                            <div class="surat-mobile-header-main">
                                <select class="form-select mobile-surah-select"
                                    v-model="selectedSurah"
                                    @change="selectSurah(selectedSurah)"
                                    aria-label="Select surah">
                                    <option value="" disabled>Select surah</option>
                                    <option v-for="surah in filteredSurahs" :key="surah.number"
                                        :value="String(surah.number)">
                                        {{ surah.number }}. {{ surah.englishName }}
                                    </option>
                                </select>
                                <div class="mobile-toolbar-icons">
                                    -- <button type="button"
                                        class="icon-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#tajweedRulesModal"
                                        aria-label="View tajweed rules">
                                        <i class="bi bi-list-columns-reverse"></i>
                                    </button> --
                                    <button type="button"
                                        class="icon-btn"
                                        @click="openSurahInfo(currentSurahInfo)"
                                        :disabled="!currentSurahInfo"
                                        aria-label="View surah information"
                                        title="Surah info">
                                        <i class="bi bi-info-circle"></i>
                                    </button>
                                    <button type="button"
                                        class="icon-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#surahSettingsModal"
                                        @click="prepareSettingsDraft"
                                        aria-label="Display settings"
                                        title="Display settings">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="surahDetails" class="surah-playback-bar surah-toolbar">
                                <div class="surah-toolbar-main">
                                    <div class="surah-title-block pb-2">
                                        <span class="surah-eyebrow">Now viewing</span>
                                        <div class="surah-title-row">
                                            <span class="surah-title">
                                                Surah {{ surahDetails.surahNumber }} · {{ surahDetails.englishName || surahDetails.name
                                                }}
                                            </span>
                                            <button type="button" class="surah-info-inline" @click="openSurahInfo(currentSurahInfo)"
                                                :disabled="!currentSurahInfo" aria-label="View surah information"
                                                title="Surah info">
                                                <i class="bi bi-info-circle" aria-hidden="true"></i>
                                            </button>
                                            <span class="surah-dot" aria-hidden="true">•</span>
                                            <span class="surah-badge">
                                                {{ surahDetails.ayahs ? surahDetails.ayahs.length : filteredAyahs.length }} verses
                                            </span>
                                            <div class="surah-title-actions d-none d-md-flex align-items-center gap-2"
                                                v-if="currentActionAyah">
                                                <button type="button"
                                                    class="icon-btn header-control-btn"
                                                    @click.stop="openBookmarkModal(currentActionAyah)"
                                                    aria-label="Save current ayah to folder"
                                                    title="Save to folder">
                                                    <i class="bi bi-folder-plus" aria-hidden="true"></i>
                                                </button>
                                                <button type="button"
                                                    class="icon-btn header-control-btn"
                                                    :class="{ 'is-saved': isAyahSaved(currentActionAyah) }"
                                                    @click.stop="toggleBookmark(currentActionAyah)"
                                                    :aria-label="isAyahSaved(currentActionAyah)
                                                        ? 'Remove bookmark from current ayah'
                                                        : 'Bookmark current ayah'"
                                                    :title="isAyahSaved(currentActionAyah)
                                                        ? 'Remove bookmark'
                                                        : 'Quick save bookmark'
                                                        ">
                                                    <i class="bi"
                                                        :class="isAyahSaved(currentActionAyah)
                                                            ? 'bi-bookmark-check-fill'
                                                            : 'bi-bookmark-plus-fill'
                                                            "
                                                        aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="surah-playback-controls">
                                        <div class="surah-control-group">
                                            <label class="surah-control-label" for="surahReciterSelect">Reciter</label>
                                            <select id="surahReciterSelect" class="form-select shadow-sm surah-select"
                                                v-model="selectedReciter" aria-label="Select reciter">
                                                <option value="" disabled>Select a reciter</option>
                                                <option v-for="reciter in recitersSorted" :key="reciter.identifier"
                                                    :value="reciter.identifier">
                                                    {{ reciter.englishName }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="surah-control-group">
                                            <label class="surah-control-label" for="surahTranslationSelect">Translation</label>
                                            <select id="surahTranslationSelect" class="form-select shadow-sm surah-select"
                                                v-model="selectedTranslation" aria-label="Select translation">
                                                <option value="" disabled>Select Translation</option>
                                                <option v-for="translation in translationsSorted" :key="translation.identifier"
                                                    :value="translation.identifier">
                                                    {{
                                                        `${translation.flag} ${translation.englishName} (${translation.language})`
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <button type="button"
                                            class="icon-btn surah-settings-btn d-none d-md-flex"
                                            data-bs-toggle="modal"
                                            data-bs-target="#surahSettingsModal"
                                            @click="prepareSettingsDraft"
                                            aria-label="Open display settings"
                                            title="Display settings">
                                            <i class="fas fa-cog" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="ayah-links-bar" v-if="isMobile">
                                <button type="button" class="btn tajweed-rules-trigger" data-bs-toggle="modal"
                                    data-bs-target="#tajweedRulesModal" aria-label="View tajweed rules">
                                    <i class="bi bi-palette-fill" aria-hidden="true"></i>
                                    <span class="tajweed-rules-label">Tajweed Rules</span>
                                </button>
                                <button type="button" class="btn surah-offcanvas-inline" data-bs-toggle="offcanvas"
                                    data-bs-target="#surahOffcanvas" aria-controls="surahOffcanvas"
                                    aria-label="Open filters and info" @click="prepareSettingsDraft">
                                    <i class="bi bi-sliders" aria-hidden="true"></i>
                                </button>
                                <button type="button" class="btn surah-info-inline surah-info-inline-mobile"
                                    @click="openSurahInfo(currentSurahInfo)" :disabled="!currentSurahInfo"
                                    aria-label="View surah information" title="Surah info">
                                    <i class="bi bi-info-circle" aria-hidden="true"></i>
                                </button>
                                <a href="/bookmarks" class="bookmark-cta-link pr-3" @click.prevent="onBookmarksLinkClick">
                                    <i class="bi bi-bookmark-heart-fill me-2" aria-hidden="true"></i>
                                    View saved bookmarks
                                </a>
                                <a href="/notes" class="bookmark-cta-link notes-cta-link" @click.prevent="onNotesLinkClick">
                                    <i class="bi bi-journal-text me-2" aria-hidden="true"></i>
                                    View notes & reflections
                                </a>
                            </div>
                        </div>
                    </div>
                </transition>
                
                <div class="header-collapse-toggle" @click="toggleHeader">
                    <i :class="headerCollapsed ? 'bi bi-chevron-down' : 'bi bi-chevron-up'"></i>
                </div>
            </div> -->



            <div v-if="isLoading" class="loading-placeholder">Loading Surah...</div>

            <div class="row rtl-text" ref="listContainer" role="list" aria-label="Ayah cards list"
                :style="{ paddingTop: topSpacerHeight + 'px', paddingBottom: bottomSpacerHeight + 'px' }">
                <div style="padding: 12px; border-radius: 8px" ref="audioCard" v-for="item in visibleWindow"
                    :key="item.ayah.number" class="col-md-12 mb-2 mt-2 ayah-card-container shadow-md" role="listitem"
                    :id="`ayah-card-${item.index}`" @click="selectCard(item.index)"
                    @keydown.enter.prevent="toggleAudioPlayer(item.index)"
                    @keydown.space.prevent="toggleAudioPlayer(item.index)" draggable="true" tabindex="0"
                    @dragstart="onAyahDragStart(item.ayah, $event)" :class="{
                        highlighted:
                            isHighlighted && currentlyPlayingIndex === item.index,
                        'currently-playing': isAudioPlaying[item.index],
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
                            <div class="d-flex align-items-center ayah-card-header-actions">
                                <div class="form-check form-switch translation-toggle ayah-translation-toggle">
                                    <input class="form-check-input" type="checkbox"
                                        :checked="isTranslationVisibleFor(item)"
                                        :id="`surat-translation-toggle-${item.index}`"
                                        :aria-label="isTranslationVisibleFor(item) ? 'Hide translation' : 'Show translation'"
                                        @change="onTranslationToggle(item, $event)"
                                        @click.stop>
                                    <label class="form-check-label mt-1"
                                        :for="`surat-translation-toggle-${item.index}`"
                                        @click.stop>
                                        Translation {{ isTranslationVisibleFor(item) ? 'on' : 'off' }}
                                    </label>
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
                                    " class="me-3 badge rounded-pill shadow-lg border-0 px-4 py-2 fs-6 fw-bold feedback-badge"
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
                                        " class="bi bi-check-circle-fill me-2 fs-5"></i>
                                        <i v-else-if="
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                    item.ayah.number
                                                )
                                            ].icon === 'trash'
                                        " class="bi bi-trash-fill me-2 fs-5"></i>
                                        <i v-else-if="
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                    item.ayah.number
                                                )
                                            ].icon === 'warning'
                                        " class="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
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
                                        " class="auth-alert-link ms-2" :href="feedbackMessages[
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
                                    :style="{ fontSize: arabicFontSize + 'px' }"
                                ></p>
                                <h2 v-if="isTranslationVisibleFor(item)" class="pt-2 ltr-text hide-on-mobile-tablet ml-2">
                                    Translation:
                                </h2>
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
                                                    fontSize: translationFontSize + 'px',
                                                }"
                                            ></p>
                                        </div>
                                        <template v-else></template>
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
                                    :style="{ fontSize: arabicFontSize + 'px' }"
                                ></p>
                                <h4 v-if="isTranslationVisibleFor(item)" class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2">
                                    Translation:
                                </h4>
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
                                            fontSize: translationFontSize + 'px',
                                        }"
                                    ></p>
                                </div>
                                <template v-else></template>
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
                                    <!-- <button type="button" class="action-pill reflection-pill-fill"
                                    :class="{ 'has-reflection': hasReflection(item.ayah) }"
                                    @click.stop="openReflectionModal(item.ayah)" :aria-label="hasReflection(item.ayah)
                                        ? 'Edit reflection'
                                        : 'Add reflection'" :title="hasReflection(item.ayah)
                                            ? 'Edit reflection'
                                            : 'Add reflection'">
                                    <i class="bi bi-journal-text" aria-hidden="true"></i>
                                    <span>{{ hasReflection(item.ayah) ? 'Reflected' : 'Reflect' }}</span>
                                </button> -->
                                </div>
                            </div>
                            <div class="row card-teal mb-3 py-2" style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: 0 -5px;
                            ">
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn" @click="decreaseFontSize" aria-label="Decrease font size"
                                        title="Decrease Font Size">
                                        <i class="bi bi-dash-circle-fill" style="font-size: 1.6rem"
                                            aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn" @click="increaseFontSize" aria-label="Increase font size"
                                        title="Increase Font Size">
                                        <i class="bi bi-plus-circle-fill" style="font-size: 1.6rem"
                                            aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn" @click="rewindAudio(item.index)"
                                        aria-label="Rewind 15 seconds" title="Rewind">
                                        <i class="bi bi-skip-backward-circle-fill" style="font-size: 1.6rem"
                                            aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn" @click="toggleAudioPlayer(item.index)" :aria-label="isAudioPlaying[item.index]
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
                                    </button>
                                </div>
                                <div class="col text-center" style="padding: 2px">
                                    <button class="icon-btn" @click="fastForwardAudio(item.index)"
                                        aria-label="Fast forward 20 seconds" title="Fast Forward">
                                        <i class="bi bi-skip-forward-circle-fill" style="font-size: 1.6rem"
                                            aria-hidden="true"></i>
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
                                    <button class="icon-btn" :class="{
                                        'is-saved': isAyahSaved(item.ayah),
                                    }" @click.stop="toggleBookmark(item.ayah)" :title="isAyahSaved(item.ayah)
                                        ? 'Remove bookmark'
                                        : 'Quick save bookmark'
                                        ">
                                        <i class="bi" :class="isAyahSaved(item.ayah)
                                            ? 'bi-bookmark-check-fill'
                                            : 'bi-bookmark-plus-fill'
                                            " style="font-size: 1.6rem" aria-hidden="true"></i>
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
                                <label class="form-label">Reciter</label>
                                <select class="form-select" v-model="selectedReciter"
                                    aria-label="Select reciter">
                                    <option value="" disabled>Select a reciter</option>
                                    <option v-for="reciter in recitersSorted" :key="reciter.identifier"
                                        :value="reciter.identifier">
                                        {{ reciter.englishName }}
                                    </option>
                                </select>
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
                            </div>
                            <div class="surah-settings-group">
                                <label class="form-label">Word-for-word translation</label>
                                <select class="form-select" v-model="settingsDraft.showWordTranslation"
                                    aria-label="Word-for-word translation">
                                    <option :value="true">Enabled</option>
                                    <option :value="false">Disabled</option>
                                </select>
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
t</template>
<script src="../scripts/SuratComponent.script.js"></script>
<style scoped src="../styles/SuratComponent.style.css"></style>
