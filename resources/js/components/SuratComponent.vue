<template>
    <div class="container py-4 surat-premium" :class="{ 'has-audio-player': showAudioPlayer, 'has-sidebar': true }"
        role="main" aria-label="Quran Explorer">
        <div class="row justify-content-center text-center mb-3">
            <div class="col-lg-10 col-xl-10">
                <h1 class="display-5 fw-bold">Quran Explorer</h1>
                <p class="lead">
                    Explore the Quran in Arabic, accompanied by translations and
                    recitations from world-renowned Qaris. Listen to beautiful
                    recitations to deepen your understanding.
                </p>
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
                        <!-- Minimized teaser -->
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
        <div class="surah-layout">
            <div class="sticky-dropdown" ref="stickyDropdown" :class="{ collapsed: !isVisible }">
                <div class="filter-header">
                    <div class="filter-actions"></div>
                </div>
                <div v-if="authAlert" class="alert alert-warning auth-alert" role="status">
                    <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                    <span>{{ authAlert }}</span>
                    <a href="/login" class="btn btn-sm btn-light auth-alert-link">Log in</a>
                </div>
                <div id="surat-filters" class="row g-3" v-show="isVisible">
                    <div class="col-12 col-md-12 filter-item surah-list">
                        <div class="surah-search">
                            <input type="search" class="form-control surah-search-input"
                                v-model="surahSearchQuery"
                                placeholder="Search surah (English or Arabic)"
                                aria-label="Search surah by English or Arabic name" />
                        </div>
                        <div class="filter-list">
                            <button type="button" class="filter-option" v-for="surah in filteredSurahs"
                                :key="surah.number"
                                :class="{ active: String(selectedSurah) === String(surah.number) }"
                                @click="selectSurah(surah.number)">
                                <span class="filter-option-number">{{ surah.number }}</span>
                                <span class="filter-option-title">{{ surah.englishName }}</span>
                                <span class="filter-option-subtitle">{{ surah.name }}</span>
                            </button>
                        </div>
                    </div>
                    <!-- <div class="col-12 col-md-4 filter-item"></div>
                    <div class="col-12 col-md-4 filter-item"></div> -->
                </div>
            </div>
            <div v-if="surahDetails" class="surah-playback-bar surah-toolbar">
                <div class="surah-toolbar-main">
                    <div class="surah-title-block">
                        <span class="surah-eyebrow">Now viewing</span>
                        <div class="surah-title-row">
                            <span class="surah-title">
                                Surah {{ surahDetails.surahNumber }} · {{ surahDetails.englishName || surahDetails.name
                                }}
                            </span>
                            <span class="surah-dot" aria-hidden="true">•</span>
                            <span class="surah-badge">
                                {{ surahDetails.ayahs ? surahDetails.ayahs.length : filteredAyahs.length }} verses
                            </span>
                        </div>
                    </div>
                    <div class="surah-playback-controls">
                        <select class="form-select shadow-sm surah-select" v-model="selectedReciter"
                            aria-label="Select reciter">
                            <option value="" disabled>Select a reciter</option>
                            <option v-for="reciter in recitersSorted" :key="reciter.identifier"
                                :value="reciter.identifier">
                                {{ reciter.englishName }}
                            </option>
                        </select>
                        <select class="form-select shadow-sm surah-select" v-model="selectedTranslation"
                            aria-label="Select translation">
                            <option value="" disabled>Select Translation</option>
                            <option v-for="translation in translationsSorted" :key="translation.identifier"
                                :value="translation.identifier">
                                {{
                                    `${translation.flag} ${translation.englishName} (${translation.language})`
                                }}
                            </option>
                        </select>
                        <button type="button" class="btn btn-primary btn-lg surah-play-button"
                            :disabled="!canPlaySurah"
                            @click="playSurahContinuously" aria-label="Play every ayah in this surah">
                            <i class="bi bi-play-fill me-2" aria-hidden="true"></i>
                            Play full surah
                        </button>
                    </div>
                </div>
            </div>

            <div class="ayah-links-bar">
                <a href="/bookmarks" class="bookmark-cta-link pr-3" @click.prevent="onBookmarksLinkClick">
                    <i class="bi bi-bookmark-heart-fill me-2" aria-hidden="true"></i>
                    View saved bookmarks
                </a>
                <a href="/notes" class="bookmark-cta-link notes-cta-link" @click.prevent="onNotesLinkClick">
                    <i class="bi bi-journal-text me-2" aria-hidden="true"></i>
                    View notes & reflections
                </a>
            </div>



            <div v-if="isLoading" class="loading-placeholder">Loading Surah...</div>

            <div class="row rtl-text" ref="listContainer" role="list" aria-label="Ayah cards list">
                <div :style="{ height: topSpacerHeight + 'px' }"></div>

                <div style="padding: 12px; border-radius: 8px" ref="audioCard" v-for="item in visibleWindow"
                    :key="item.ayah.number" class="col-md-12 mb-2 mt-2 ayah-card-container shadow-md" role="listitem"
                    :id="`ayah-card-${item.index}`" @click="selectCard(item.index)"
                    @keydown.enter.prevent="toggleAudioPlayer(item.index)"
                    @keydown.space.prevent="toggleAudioPlayer(item.index)" draggable="true"
                    @dragstart="onAyahDragStart(item.ayah, $event)" :class="{
                        highlighted:
                            isHighlighted && currentlyPlayingIndex === item.index,
                        'currently-playing': isAudioPlaying[item.index],
                    }">
                    <div class="ayah-surface h-100 rtl-text d-flex flex-column">
                        <!-- Surah and Ayah Number -->
                        <div class="d-flex justify-content-between text-muted ltr-text">
                            <h4>
                                <img src="/images/art.png" width="35px" alt="Art Icon" />
                                {{ surahDetails?.surahNumber }} :
                                {{ item.index + 1 }}
                                <span v-if="isAyahSaved(item.ayah)" class="saved-pill">Saved</span>
                            </h4>
                            <div class="d-flex align-items-center">
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
                                        {{
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                    item.ayah.number
                                                )
                                            ].text
                                        }}
                                    </span>
                                </transition>
                                <button type="button" class="icon-btn ms-2" @click.stop="openBookmarkModal(item.ayah)"
                                    title="Save to folder / Organize" aria-label="Save to folder or organize bookmark">
                                    <i class="bi bi-folder-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Desktop Layout: Icons on Left -->
                        <div class="row d-none d-md-flex" role="group" aria-label="Ayah controls (desktop)"
                            :aria-hidden="isMobile">
                            <div class="col-md-11">
                                <div style="padding: 4px">
                                    <p class="arabic-text rtl-text fw-bold text-end mb-3"
                                        v-html="highlightedText(item.ayah)"
                                        :style="{ fontSize: arabicFontSize + 'px' }">
                                    </p>
                                    <h2 class="pt-2 ltr-text hide-on-mobile-tablet ml-2">
                                        Translation:
                                    </h2>
                                    <p class="fw-regular ltr-text flex-grow-1" v-html="highlightText(item.ayah.translation)
                                        " :style="{
                                        fontSize: translationFontSize + 'px',
                                    }"></p>
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
                                    <button class="icon-btn mb-3" @click="decreaseFontSize"
                                        aria-label="Decrease font size" title="Decrease Font Size">
                                        <i class="bi bi-dash-circle-fill" aria-hidden="true"></i>
                                    </button>
                                    <button class="icon-btn mb-3" :class="{
                                        'is-saved': isAyahSaved(item.ayah),
                                    }" @click.stop="toggleBookmark(item.ayah)" :title="isAyahSaved(item.ayah)
                                    ? 'Remove bookmark'
                                    : 'Quick save bookmark'
                                    ">
                                        <i class="bi" :class="isAyahSaved(item.ayah)
                                            ? 'bi-bookmark-check-fill'
                                            : 'bi-bookmark-plus-fill'
                                            " aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- Mobile/Tablet Layout: Text then Icons -->

                        <div style="" class="d-block d-md-none" role="group" aria-label="Ayah controls (mobile)"
                            :aria-hidden="!isMobile">
                            <div>
                                <p class="arabic-text rtl-text fw-bold text-end mb-3"
                                    v-html="highlightedText(item.ayah)" :style="{ fontSize: arabicFontSize + 'px' }">
                                </p>
                                <h4 class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2">
                                    Translation:
                                </h4>
                                <p class="fw-regular ltr-text flex-grow-1" v-html="highlightText(item.ayah.translation)"
                                    :style="{
                                        fontSize: translationFontSize + 'px',
                                    }"></p>
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

                <div :style="{ height: bottomSpacerHeight + 'px' }"></div>
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
                        <button @click="cyclePlaybackSpeed" class="control-btn"
                            :title="'Speed: ' + playbackSpeed + 'x'">
                            <i class="bi bi-speedometer2" :style="{
                                color:
                                    playbackSpeed !== 1
                                        ? '#ff6b6b'
                                        : '#ccc',
                            }"></i>
                            <span class="speed-indicator">{{ playbackSpeed }}x</span>
                        </button>
                        <button @click="toggleRepeat" class="control-btn" :title="repeatCurrent
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
                    <!-- <div class="ayah-scrollbar" role="group" aria-label="Surah verse navigator">
                        <span class="ayah-scrollbar-label">Ayah</span>
                        <input class="ayah-scrollbar-input" type="range" min="1" :max="Math.max(totalItems, 1)"
                            :value="ayahScrubValue" @input="onAyahScrubInput" @change="onAyahScrubChange"
                            :aria-valuemin="1" :aria-valuemax="Math.max(totalItems, 1)" :aria-valuenow="ayahScrubValue"
                            :aria-valuetext="`Ayah ${ayahScrubValue} of ${Math.max(totalItems, 1)}`" />
                        <span class="ayah-scrollbar-count">{{ ayahScrubValue }} / {{ Math.max(totalItems, 1) }}</span>
                    </div> -->
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
import axios from "axios";
import { Modal } from "bootstrap";
import BookmarkModal from "./bookmarks/BookmarkModal.vue";
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
            searchQuery: "",
            debouncedQuery: "",
            debounceTimer: null,
            arabicFontSize: 28,
            translationFontSize: 20,
            highlightedWordIndex: -1,
            progress: [],
            audioElements: [],
            playbackSpeed: 1.0,
            volume: 1.0,
            showVolumeBar: false,
            showAudioPlayer: false,
            isHighlighted: false,
            // scrubbing state
            isScrubbing: false,
            _boundMove: null,
            _boundUp: null,
            wordTimings: [],
            isLoading: false,
            continuousPlayback: true, // New data property for playback mode
            visualizerBars: Array(20).fill(10),
            playbackSpeeds: [0.5, 0.75, 1, 1.25, 1.5, 2],
            currentSpeedIndex: 2,
            repeatCurrent: JSON.parse(
                localStorage.getItem("repeatCurrent") || "false"
            ),
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
        };
    },
    computed: {
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
        recitersSorted() {
            if (!Array.isArray(this.reciters)) return [];
            const fav = new Set(this.favoriteReciters);
            return [...this.reciters].sort((a, b) => {
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
        totalItems() {
            return Array.isArray(this.filteredAyahs)
                ? this.filteredAyahs.length
                : 0;
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
            // Reset virtualization window to top
            this.visibleStart = 0;
            this.visibleEnd = Math.min(this.windowSize + this.buffer * 2, n);
            this.ayahScrubValue = Math.min(Math.max(1, this.ayahScrubValue), Math.max(n, 1));
            this.$nextTick(this.updateVirtualWindow);
        },
        currentlyPlayingIndex(next) {
            if (typeof next !== "number" || next < 0) return;
            this.ayahScrubValue = next + 1;
            this.syncPlaybackScroll(next);
        },
    },
    created() {
        // postpone loading until we know the authentication status
    },
    async mounted() {
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
            JSON.parse(localStorage.getItem("continuousPlayback")) ?? true;
        this.playbackSpeed =
            JSON.parse(localStorage.getItem("playbackSpeed")) ?? 1;
        Promise.all([
            this.fetchReciters(),
            this.fetchSurahs(),
            this.fetchTranslations(),
            this.fetchSurahDetails(),
        ]).then(() => {
            this.isInitialLoad = false;
        });
    },
    beforeUnmount() {
        this.isComponentAlive = false;
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
    },
    beforeDestroy() {
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
        announce(message, timeout = 5000) {
            this.screenReaderMessage = message;
            clearTimeout(this.savedAyahClearTimer);
            this.savedAyahClearTimer = setTimeout(() => {
                this.screenReaderMessage = "";
            }, timeout);
        },
        async loadSavedAyahs() {
            if (this.savedAyahsLoaded) return;
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
            if (this.isAyahSaved(ayah)) {
                this.removeBookmark(ayah);
            } else {
                this.quickSaveBookmark(ayah);
            }
        },
        triggerAyahFeedback(key, text, cssClass, icon) {
            // Use reactive assignment
            this.feedbackMessages = {
                ...this.feedbackMessages,
                [key]: { text, class: cssClass, icon },
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
                window.location.href = "/bookmarks";
            }
        },
        async onNotesLinkClick() {
            const isAuthed = await this.ensureAuthenticated(
                "Please log in to save and view reflections."
            );
            if (isAuthed) {
                window.location.href = "/notes";
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
                "Please log in to save reflections."
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
            message = "Please log in to access bookmarks & reflections."
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
            this.showAuthAlert(message);
            return false;
        },
        showAuthAlert(message = "Please log in to access bookmarks & reflections.") {
            this.authAlert = message;
            clearTimeout(this.authAlertTimer);
            this.authAlertTimer = setTimeout(() => {
                this.authAlert = "";
            }, 6000);
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
        calibrateItemHeight() {
            try {
                const el = this.$el.querySelector(".ayah-card-container");
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect && rect.height > 0) {
                    this.itemHeight = Math.round(rect.height + 24); // include margins/padding buffer
                    this.updateVirtualWindow();
                }
            } catch (_) { }
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
            this.updateVirtualWindow();
        },
        updateVirtualWindow() {
            const n = this.filteredAyahs ? this.filteredAyahs.length : 0;
            if (n === 0) {
                this.visibleStart = 0;
                this.visibleEnd = 0;
                return;
            }
            const y = window.scrollY - this.listTop;
            // If we are at or above the list top, pin to start
            if (window.scrollY <= this.listTop + 5) {
                this.visibleStart = 0;
                this.visibleEnd = Math.min(
                    n,
                    this.windowSize + this.buffer * 2
                );
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
            if (!total || index < 0 || index >= total) return;
            const start = Math.max(0, index - this.buffer);
            const end = Math.min(
                total,
                start + this.windowSize + this.buffer * 2
            );
            this.visibleStart = start;
            this.visibleEnd = end;
            this.$nextTick(() => {
                this.computeListTop();
                this.calibrateItemHeight();
                this.$nextTick(() => {
                    const offset = this.isVisible ? 140 : 100;
                    const targetTop =
                        this.listTop + index * this.itemHeight - offset;
                    window.scrollTo({
                        top: Math.max(0, targetTop),
                        behavior: "smooth",
                    });
                    this.selectCard(index);
                });
            });
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
            } catch (e) {
                this.isMobile = window.innerWidth <= 767;
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
            if (!ayah || (!ayah.text && !ayah.words)) return "";
            const words = ayah.words || (ayah.text ? ayah.text.split(" ") : []);
            return words
                .map((word, index) => {
                    const isHighlighted =
                        index === this.highlightedWordIndex
                            ? "highlighted-word"
                            : "";
                    return `<span class="${isHighlighted}">${word}</span>`;
                })
                .join(" ");
        },
        // removed bulk initialization and preloading for performance
        playAudio: function (index) {
            console.log("Attempting to play audio for index:", index);
            if (index < 0 || index >= this.filteredAyahs.length) return;

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
                const duration = this.currentlyPlaying.duration;
                const wordCount = (
                    ayah.words || (ayah.text ? ayah.text.split(" ") : [])
                ).length;
                if (wordCount > 0 && duration > 0) {
                    const step = duration / wordCount;
                    this.wordTimings = Array.from(
                        { length: wordCount },
                        (_, i) => i * step
                    );
                } else {
                    this.wordTimings = [];
                }
            };

            this.highlightedWordIndex = -1;
            audio.ontimeupdate = () => {
                this.syncHighlight();
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
            const cacheKey = `cache:surah:${this.selectedSurah}:${this.selectedReciter}:${this.selectedTranslation}`;

            // Serve from cache immediately if available
            try {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    const obj = JSON.parse(cached);
                    if (obj && obj.ts) {
                        const data = obj.data;
                        const arabicText = data.data[0];
                        const translation = data.data[1];
                        this.surahDetails = {
                            surahNumber: this.selectedSurah,
                            englishName: arabicText.englishName,
                            name: arabicText.name,
                            ayahs: arabicText.ayahs.map((ayah, index) => {
                                const text = ayah.text || "";
                                const transText =
                                    translation.ayahs[index] &&
                                        translation.ayahs[index].text
                                        ? translation.ayahs[index].text
                                        : "Translation not available";
                                const words = text ? text.split(" ") : [];
                                return {
                                    number: ayah.numberInSurah || ayah.number,
                                    numberInSurah: ayah.numberInSurah,
                                    globalNumber: ayah.number,
                                    text,
                                    lowerText: text.toLowerCase(),
                                    translation: transText,
                                    lowerTranslation: transText.toLowerCase(),
                                    audio: ayah.audio || "",
                                    words,
                                };
                            }),
                        };
                        this.isLoading = false;
                        // Pre-warm current and next from cache path as well
                        this.$nextTick(() => {
                            this.prepareNextAudio(0);
                            this.prepareNextAudio(1);
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
                `https://api.alquran.cloud/v1/surah/${this.selectedSurah}/editions/${this.selectedReciter},${this.selectedTranslation}`,
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
                    const arabicText = data.data[0];
                    const translation = data.data[1];
                    this.surahDetails = {
                        surahNumber: this.selectedSurah,
                        englishName: arabicText.englishName,
                        name: arabicText.name,
                        ayahs: arabicText.ayahs.map((ayah, index) => {
                            const text = ayah.text || "";
                            const transText =
                                translation.ayahs[index] &&
                                    translation.ayahs[index].text
                                    ? translation.ayahs[index].text
                                    : "Translation not available";
                            const words = text ? text.split(" ") : [];
                            return {
                                number: ayah.numberInSurah || ayah.number,
                                numberInSurah: ayah.numberInSurah,
                                globalNumber: ayah.number,
                                text,
                                lowerText: text.toLowerCase(),
                                translation: transText,
                                lowerTranslation: transText.toLowerCase(),
                                audio: ayah.audio || "",
                                words,
                            };
                        }),
                    };
                    console.log("Surah details fetched:", this.surahDetails);
                    this.isLoading = false;
                    // Pre-warm the first and next ayah for instant playback
                    this.$nextTick(() => {
                        this.prepareNextAudio(0);
                        this.prepareNextAudio(1);
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
            if (this.continuousPlayback) {
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
        selectSurah(number) {
            this.selectedSurah = String(number);
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        selectReciter(identifier) {
            this.selectedReciter = identifier;
        },
        selectTranslation(identifier) {
            this.selectedTranslation = identifier;
        },
        syncPlaybackScroll(index) {
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
            const raw = Number(event.target?.value || 1);
            const targetIndex = Math.min(
                Math.max(0, raw - 1),
                Math.max(this.totalItems - 1, 0)
            );
            this.ayahScrubValue = targetIndex + 1;
            this.selectCard(targetIndex);
            this.scrollToAyahIndex(targetIndex);
            this.playAudio(targetIndex);
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
        syncHighlight: function () {
            const audio = this.currentlyPlaying;
            if (!audio || !this.wordTimings.length) return;
            const currentTime = audio.currentTime;
            const index = this.wordTimings.findIndex((t, i, arr) => {
                return (
                    currentTime >= t &&
                    (i === arr.length - 1 || currentTime < arr[i + 1])
                );
            });
            this.highlightedWordIndex = index;
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
    },
};
</script>

<style scoped>
.reflection-pill.has-reflection {
    color: #0f766e;
    border-color: #0f766e;
    background-color: rgba(15, 118, 110, 0.1);
}

.reflection-pill-fill.has-reflection {
    color: #0f766e;
    border-color: #0f766e;
    background-color: rgba(15, 118, 110, 0.12);
}

.reflection-pill-fill.has-reflection i,
.reflection-pill-fill.has-reflection span {
    color: #0f766e;
}

.reflection-btn.has-reflection i {
    color: #0f766e;
}

.reflection-btn.has-reflection {
    border-color: rgba(15, 118, 110, 0.4);
    background: rgba(15, 118, 110, 0.08);
    box-shadow: 0 5px 12px rgba(15, 118, 110, 0.15);
}

.reflection-modal .modal-body {
    padding: 1.6rem 1.8rem 1.5rem;
}

.reflection-modal .modal-content {
    border-radius: 28px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow:
        0 15px 25px rgba(15, 23, 42, 0.1),
        0 35px 80px rgba(15, 23, 42, 0.15);
}

.reflection-modal .modal-header {
    border-bottom: 0;
    padding-bottom: 0.6rem;
}

.reflection-modal .modal-title b {
    font-size: 1.75rem;
    font-weight: 600;
}

.reflection-intro {
    border-radius: 16px;
    padding: 1rem 1.3rem;
    background: rgba(15, 118, 110, 0.05);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.reflection-intro-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #0f766e;
}

.reflection-intro-copy {
    margin: 0.35rem 0 0;
    font-size: 0.9rem;
    color: #475467;
}

.reflection-history {
    border-radius: 20px;
    padding: 1rem 1.2rem;
    background: #f5fdf9;
}

.reflection-history-list {
    display: flex;
    flex-direction: column;
}

.reflection-history-entry {
    background: #fff;
    border-radius: 14px;
    padding: 0.9rem 1.05rem 0.7rem;
    margin-bottom: 0.85rem;
    border: 1px solid rgba(15, 118, 110, 0.15);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.reflection-history-entry:last-child {
    margin-bottom: 0;
}

.reflection-history-subject {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f766e;
}

.reflection-history-message {
    margin: 0;
    font-size: 0.95rem;
    color: #1f2937;
    white-space: pre-wrap;
}

.reflection-history-entry-actions {
    margin-top: 0.75rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding-top: 0.35rem;
    border-top: 1px solid rgba(15, 118, 110, 0.12);
}

.reflection-history-entry-actions button {
    font-size: 0.8rem;
    padding: 0;
}

.reflection-action {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 1.1rem;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    border: 1px solid transparent;
    transition: background 0.2s ease, color 0.2s ease;
    white-space: nowrap;
    line-height: 1.2;
}

.reflection-action i {
    font-size: 1rem;
}

.reflection-action span {
    font-weight: 600;
}

.reflection-action.edit-action {
    color: #0f766e;

}

.reflection-action.edit-action:hover {
    background: rgba(15, 118, 110, 0.16);
}

.reflection-action.delete-action {
    color: #b91c1c;

}

.reflection-action.delete-action:hover {
    background: rgba(185, 28, 28, 0.18);
}

.reflection-title-icon {
    font-size: 1.1rem;
    color: #0f766e;
}

.reflection-history-card {
    border-radius: 18px;
    padding: 1.1rem 1.3rem;
    background: #f2f8f6;
    border: 1px solid rgba(15, 118, 110, 0.2);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.reflection-history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.reflection-history-title {
    font-size: 1rem;
    font-weight: 600;
    color: #0f2f23;
}

.reflection-history-count {
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0f766e;
}

.reflection-highlight {
    background: linear-gradient(135deg, rgba(11, 128, 111, 0.08), rgba(15, 110, 99, 0.15));
    border: 1px solid rgba(11, 128, 111, 0.2);
    position: relative;
}

.reflection-badge {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(11, 128, 111, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #0b806f;
}

.note-suggestions {
    padding-top: 0.75rem;
    padding-bottom: 0.25rem;
}

.note-suggestions.collapsed {
    display: none;
}

.note-suggestions .btn-ghost {
    border: none;
    background: none;
    color: #0f766e;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.85rem;
    padding: 0;
}

.suggestion-marquee-stack {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.suggestion-marquee-stack.collapsed {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
}

.suggestion-marquee-row {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.suggestion-marquee {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    background: rgba(13, 110, 253, 0.04);
    padding: 0.4rem 0;
    transition: height 0.4s ease, opacity 0.4s ease;
}

.suggestion-marquee.collapsed {
    height: 0;
    opacity: 0;
    pointer-events: none;
    padding: 0;
}

.suggestion-marquee::before,
.suggestion-marquee::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60px;
    pointer-events: none;
    z-index: 2;
    background: linear-gradient(to right,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0));
}

.suggestion-marquee::after {
    right: 0;
    transform: rotate(180deg);
}

.suggestion-marquee::before {
    left: 0;
}

.suggestion-track {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 200%;
    animation-name: suggestionScroll;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.suggestion-track.is-paused {
    animation-play-state: paused;
}

.suggestion-track-group {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.suggestion-track-group[aria-hidden="true"] {
    pointer-events: none;
}

.suggestion-pill {
    border-radius: 999px;
    border: 1px solid rgba(11, 128, 111, 0.35);
    background: rgba(255, 255, 255, 0.95);
    padding: 0.4rem 1rem;
    color: #0b766f;
    font-size: 0.9rem;
    font-weight: 500;
    transition: transform 0.3s ease, border-color 0.2s ease;
    white-space: nowrap;
    display: inline-flex;
    gap: 0.3rem;
    align-items: center;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.suggestion-pill span {
    display: inline-block;
}

.suggestion-pill.light {
    border-color: rgba(15, 110, 99, 0.2);
    color: #0f766e;
}

.suggestion-pill:hover {
    background: rgba(11, 128, 111, 0.1);
    border-color: rgba(11, 128, 111, 0.55);
    transform: translateY(-1px);
}

.note-suggestions-collapsed {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-top: 1px solid rgba(15, 118, 110, 0.15);
}

.note-suggestions-toggle {
    color: #475467;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.85rem;
    font-weight: 500;
    border: none;
    background: none;
    padding: 0;
}

.note-suggestions-toggle:focus-visible {
    outline: 2px solid rgba(12, 166, 141, 0.6);
    outline-offset: 2px;
}

.reflection-success-banner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 14px;
    padding: 0.4rem 0.8rem;
    border: 1px solid rgba(15, 118, 110, 0.3);
    background: linear-gradient(135deg, rgba(15, 118, 110, 0.12), rgba(255, 255, 255, 0.8));
    color: #0f766e;
    font-weight: 500;
    font-size: 0.9rem;
}

.reflection-success-top {
    margin-bottom: 0.5rem;
}

.suggestion-tip {
    font-size: 0.75rem;
}

.suggestion-marquee.collapsed .suggestion-track {
    animation: none;
}

@keyframes suggestionScroll {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

.modal-footer .btn {
    font-size: 1rem;
    padding: 0.6rem 1.75rem;
    border-radius: 14px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.modal-footer .btn-primary {
    font-size: 1rem;
    padding: 0.65rem 1.8rem;
}

.small-label {
    font-size: 0.85rem;
    color: #475467;
}

.btn-ghost {
    border: none;
    background: none;
    color: #0f766e;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.85rem;
    padding: 0;
}

.modal-body input,
.modal-body textarea {
    font-size: 0.95rem;
}

.modal-body input::placeholder,
.modal-body textarea::placeholder {
    font-size: 0.9rem;
    color: #6b7280;
}

.card-teal {
    border-radius: 999px;
    border: 1px solid rgba(15, 110, 99, 0.12);
    box-shadow: 0 12px 26px rgba(15, 53, 48, 0.1);
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.98),
            rgba(246, 249, 248, 0.94));
    transition: transform 180ms ease, box-shadow 180ms ease,
        border-color 180ms ease;
}

.card-teal:hover {
    transform: translateY(-1px);
    border-color: rgba(15, 110, 99, 0.2);
    box-shadow: 0 16px 32px rgba(15, 53, 48, 0.14);
}

.surat-premium {
    position: relative;
    border-radius: 24px;
    /* border: 1px solid rgba(15, 110, 99, 0.06); */
    /* box-shadow: 0 18px 40px rgba(15, 53, 48, 0.08); */
    padding: 26px 22px 32px;
    width: min(1500px, calc(100% - 32px));
    max-width: none;
    margin-inline: auto;
}

.surat-premium.has-sidebar {
    width: calc(100% - 360px);
    margin-left: 360px;
    margin-right: 0;
}

.surah-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    align-items: start;
}

.surah-layout>.sticky-dropdown,
.surah-layout>.surah-playback-bar,
.surah-layout>.next-step-wrapper {
    grid-column: 1;
}

.surah-layout>.loading-placeholder,
.surah-layout>.row.rtl-text,
.surah-layout>.visually-hidden,
.surah-layout>.empty-state {
    grid-column: 1;
}

.surah-layout>.sticky-dropdown {
    position: fixed;
    top: var(--nav-offset, 72px);
    left: 0;
    width: 360px;
    height: calc(100vh - var(--nav-offset, 72px));
    max-height: none;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 0;
    margin-bottom: 0;
    background: linear-gradient(180deg, rgba(14, 74, 66, 0.98), rgba(11, 41, 38, 0.98));
    box-shadow: 10px 0 32px rgba(10, 32, 30, 0.25);
    padding-bottom: 24px;
}

.surah-layout>.sticky-dropdown .filter-item {
    flex: 1;
    min-height: 0;
}

.surah-layout>.sticky-dropdown #surat-filters {
    flex: 1;
    min-height: 0;
}

.surah-layout>.sticky-dropdown .filter-list {
    max-height: none;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
}

.surat-premium.has-audio-player {
    padding-bottom: calc(32px + 220px + env(safe-area-inset-bottom));
}

.surat-premium>* {
    position: relative;
    z-index: 1;
}

.bookmark-cta-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.16);
    color: #ffffff;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 14px 24px rgba(10, 30, 28, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease,
        border-color 0.2s ease;
    white-space: nowrap;
}

.bookmark-cta-link:hover {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0 18px 30px rgba(10, 30, 28, 0.45);
    color: #ffffff;
}

.notes-cta-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.16);
    color: #ffffff;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 14px 24px rgba(10, 30, 28, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease,
        border-color 0.2s ease;
    white-space: nowrap;
}

.notes-cta-link i {
    color: #ffffff;
}

.notes-cta-link:hover {
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0 18px 30px rgba(10, 30, 28, 0.45);
    color: #ffffff;
}

.bookmark-toast {
    max-width: 520px;
    margin: 0 auto 16px;
    border-radius: 14px;
    box-shadow: 0 12px 22px rgba(15, 53, 48, 0.12);
}

.filter-actions {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.auth-alert {
    margin: 0 0 12px;
    border-radius: 16px;
    box-shadow: 0 12px 22px rgba(15, 53, 48, 0.12);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border: 1px solid rgba(217, 119, 6, 0.35);
    background: rgba(255, 241, 214, 0.95);
    color: #7a4b00;
}

.auth-alert .bi {
    font-size: 1.1rem;
}

.auth-alert-link {
    margin-left: auto;
    font-weight: 700;
    border-radius: 999px;
    padding: 6px 12px;
    border: 1px solid rgba(15, 110, 99, 0.2);
    color: #0b5c53;
}

@media (max-width: 768px) {
    .surat-premium {
        padding: 18px 14px 24px;
        border-radius: 18px;
    }

    .surat-premium.has-audio-player {
        padding-bottom: calc(24px + 240px + env(safe-area-inset-bottom));
    }

    .sticky-dropdown {
        padding: 10px 12px;
        border-radius: 18px;
    }

    .filter-header {
        gap: 10px;
    }

    .filter-icon {
        width: 38px;
        height: 38px;
        border-radius: 12px;
    }

    .filter-subtitle {
        font-size: 0.9rem;
    }

    .filter-actions {
        gap: 8px;
    }

    .filter-actions {
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    .bookmark-cta-link {
        padding: 7px 12px;
        font-size: 0.85rem;
    }
}

@media (max-width: 992px) {
    .surah-layout {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .surah-layout>* {
        grid-column: 1;
    }

    .sticky-dropdown {
        position: relative;
        top: auto;
        left: auto;
        width: 100%;
        height: auto;
    }

    .surat-premium.has-sidebar {
        width: calc(100% - 32px);
        margin-left: auto;
        margin-right: auto;
    }
}

/* Consolidated base rules */
.surat-page {
    --surat-ink: #1d2b2f;
    --surat-muted: #4e5f5f;
    --surat-teal: #0f6e63;
    --surat-teal-dark: #0a4b45;
    --surat-amber: #d2a24b;
    --surat-sand: #fff7ea;
    --surat-card: #ffffff;
    --surat-border: rgba(15, 110, 99, 0.18);
    --surat-shadow: 0 20px 46px rgba(15, 53, 48, 0.12);
    min-height: 100vh;
    max-width: min(1800px, calc(100% - 24px));
    margin: 0 auto;
    color: var(--surat-ink);
    position: relative;
    border-radius: 28px;
    background: radial-gradient(320px 220px at 8% 8%,
            rgba(210, 162, 75, 0.16),
            transparent 65%),
        radial-gradient(320px 220px at 92% 0%,
            rgba(15, 110, 99, 0.15),
            transparent 68%),
        linear-gradient(180deg, #fffdf7 0%, #f7fbf7 55%, #f0f6f4 100%);
    box-shadow: var(--surat-shadow);
    overflow: hidden;
}

.surat-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 15% 20%,
            rgba(255, 255, 255, 0.6),
            transparent 55%),
        repeating-linear-gradient(125deg,
            rgba(15, 110, 99, 0.06) 0 12px,
            transparent 12px 26px);
    opacity: 0.6;
    pointer-events: none;
}

.surat-page>* {
    position: relative;
    z-index: 1;
}

.ayah-card-container {
    border-radius: 20px;
    transition: transform 0.2s ease;
}

.ayah-surface {
    border-radius: 18px;
    /* background: #ffffff; */
    border: 1px solid rgba(15, 110, 99, 0.07);
    box-shadow: 0 10px 26px rgba(15, 53, 48, 0.06);
    padding: 18px 20px;
    transition: transform 0.2s ease, box-shadow 0.2s ease,
        border-color 0.2s ease;
    position: relative;
}

.ayah-surface::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 18px;
    border-top: 3px solid rgba(15, 110, 99, 0.18);
    opacity: 0.65;
    pointer-events: none;
}

.ayah-card-container:hover .ayah-surface {
    transform: translateY(-1px);
    border-color: rgba(15, 110, 99, 0.16);
    box-shadow: 0 16px 32px rgba(15, 53, 48, 0.1);
}

.highlighted .ayah-surface {
    background: rgba(15, 110, 99, 0.05);
    border-color: rgba(15, 110, 99, 0.28);
    box-shadow: 0 18px 36px rgba(15, 53, 48, 0.14);
    animation: pulse 0.6s ease-in-out;
}

.currently-playing .ayah-surface {
    background: linear-gradient(135deg,
            rgba(15, 110, 99, 0.08),
            rgba(210, 162, 75, 0.08));
    border-color: rgba(15, 110, 99, 0.28);
    box-shadow: 0 18px 34px rgba(15, 53, 48, 0.14);
    transform: translateY(-1px);
}

@keyframes pulse {
    0% {
        border-color: rgba(15, 110, 99, 0.45);
    }

    100% {
        border-color: transparent;
    }
}

.rtl-text {
    direction: rtl;
}

.ltr-text {
    direction: ltr;
}

.sticky-dropdown {
    position: sticky;
    z-index: 1000;
    padding: 14px 18px;
    border-radius: 22px;
    margin-bottom: 1rem;
    top:0px;
    overflow: hidden;
    max-height: 500px;
    /* expanded */
    border: 1px solid rgba(15, 110, 99, 0.14);
    background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.98),
            rgba(245, 250, 248, 0.94));
    box-shadow: 0 18px 36px rgba(15, 53, 48, 0.12);
    backdrop-filter: blur(12px) saturate(120%);
}

.sticky-dropdown::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 12% 12%,
            rgba(255, 255, 255, 0.7),
            transparent 55%),
        radial-gradient(circle at 88% 0%,
            rgba(15, 110, 99, 0.16),
            transparent 60%);
    opacity: 0.45;
    pointer-events: none;
}

.sticky-dropdown>* {
    position: relative;
    z-index: 1;
}

.filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
}

.filter-option {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2px 10px;
    align-items: center;
    text-align: left;
    padding: 10px 12px;
    width: 100%;
    border-radius: 12px;
    border: 1px solid transparent;
    background: rgba(15, 110, 99, 0.06);
    color: #1d2b2f;
    transition: background 0.2s ease, border-color 0.2s ease,
        transform 0.2s ease;
}

.filter-option:hover {
    transform: translateY(-1px);
    background: rgba(15, 110, 99, 0.1);
    border-color: rgba(15, 110, 99, 0.18);
}

.filter-option.active {
    background: rgba(15, 110, 99, 0.16);
    border-color: rgba(15, 110, 99, 0.3);
    font-weight: 600;
}

.filter-option-number {
    font-weight: 700;
    color: #0f6e63;
}

.filter-option-title {
    font-weight: 600;
}

.filter-option-subtitle {
    grid-column: 2;
    font-size: 0.85rem;
    color: rgba(29, 43, 47, 0.7);
}

.surah-layout .surah-list .filter-option,
.surah-layout .surah-list .filter-option-title,
.surah-layout .surah-list .filter-option-subtitle,
.surah-layout .surah-list .filter-option-number {
    color: #ffffff;
}

.surah-layout .surah-list .filter-option {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.12);
}

.surah-layout .surah-list .filter-option-title {
    flex: 1 1 auto;
    min-width: 0;
}

.surah-layout .surah-list .filter-option-subtitle {
    margin-left: auto;
    white-space: nowrap;
    text-align: right;
    direction: rtl;
}

.surah-layout .surah-list .filter-option.active {
    background: rgba(255, 255, 255, 0.16);
    border-color: rgba(255, 255, 255, 0.24);
}

.surah-layout .surah-list .filter-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    overflow-x: hidden;
}

.surah-toolbar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
    padding: 12px 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(238, 247, 244, 0.72));
    border: 1px solid rgba(15, 110, 99, 0.16);
    box-shadow: 0 14px 26px rgba(15, 53, 48, 0.08);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
    position: sticky;
    top: var(--nav-offset, 72px);
    z-index: 900;
}

.surah-toolbar::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 8% 20%, rgba(210, 162, 75, 0.16), transparent 55%),
        radial-gradient(circle at 92% 0%, rgba(15, 110, 99, 0.18), transparent 60%);
    opacity: 0.65;
    pointer-events: none;
}

.surah-toolbar::after {
    content: "";
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 0;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(15, 110, 99, 0.5), rgba(210, 162, 75, 0.6), rgba(15, 110, 99, 0.35));
    opacity: 0.7;
}

.surah-toolbar-main {
    display: grid;
    grid-template-columns: minmax(240px, 1fr) auto;
    align-items: center;
    gap: 16px;
}

.surah-title-block {
    min-width: 0;
}

.surah-eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #5a6b6b;
    font-weight: 700;
    background: rgba(15, 110, 99, 0.1);
    padding: 4px 8px;
    border-radius: 999px;
    width: fit-content;
}

.surah-title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
}

.surah-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #153532;
}

.surah-dot {
    color: #95a5a6;
    font-weight: 700;
}

.surah-badge {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(15, 110, 99, 0.16);
    color: #0b5c53;
}

.surah-playback-controls {
    display: grid;
    grid-template-columns: minmax(200px, 240px) minmax(240px, 300px) auto;
    align-items: center;
    gap: 12px;
    width: auto;
}

.surah-playback-controls .form-select {
    min-width: 0;
    width: 100%;
}

.surah-playback-controls .surah-select {
    height: 40px;
    padding: 6px 12px;
    border-radius: 8px;
    border-color: rgba(15, 110, 99, 0.18);
    box-shadow: 0 6px 12px rgba(15, 53, 48, 0.08);
    background-color: #ffffff;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.surah-playback-controls .surah-select:focus {
    border-color: rgba(15, 110, 99, 0.4);
    box-shadow: 0 8px 16px rgba(15, 53, 48, 0.14);
}

.surah-playback-controls .btn {
    flex: 0 0 auto;
    border-radius: 10px;
}

.surah-play-button {
    height: 40px;
    padding: 8px 18px;
    font-weight: 600;
    border-radius: 10px;
    box-shadow: 0 10px 18px rgba(8, 94, 84, 0.18);
}

.ayah-links-bar {

    gap: 12px;
}

.ayah-links-bar .bookmark-cta-link,
.ayah-links-bar .notes-cta-link {
    color: #0b5c53;
    background: rgba(11, 92, 83, 0.12);
    border-color: rgba(11, 92, 83, 0.25);
    box-shadow: 0 12px 20px rgba(11, 92, 83, 0.16);
    border-radius: 10px;
}

.ayah-links-bar .bookmark-cta-link:hover,
.ayah-links-bar .notes-cta-link:hover {
    color: #08433e;
    background: rgba(11, 92, 83, 0.18);
    border-color: rgba(11, 92, 83, 0.35);
}

.ayah-links-bar .bookmark-cta-link i,
.ayah-links-bar .notes-cta-link i {
    color: inherit;
}

.filter-title {
    display: inline-flex;
    align-items: center;
    gap: 12px;
}

.filter-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 110, 99, 0.12);
    color: #0f6e63;
    box-shadow: inset 0 0 0 1px rgba(15, 110, 99, 0.2);
    font-size: 1.1rem;
}

.filter-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #6b7280;
    font-weight: 700;
}

.filter-subtitle {
    font-size: 0.95rem;
    font-weight: 600;
    color: #111827;
}

.filter-toggle {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    border: 1px solid rgba(15, 110, 99, 0.2);
    background: rgba(255, 255, 255, 0.9);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #0f6e63;
    transition: background-color 0.2s ease, border-color 0.2s ease,
        transform 0.2s ease;
}

.filter-toggle:hover {
    border-color: rgba(15, 110, 99, 0.4);
    background: #ffffff;
    transform: translateY(-1px);
}

.sticky-dropdown .form-select {
    font-size: 0.95rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    border: 1px solid rgba(15, 110, 99, 0.2);
    color: #1c2b2f;
    box-shadow: 0 8px 16px rgba(15, 53, 48, 0.06);
}

.sticky-dropdown label.form-label {
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.82);
    position: relative;
    padding-left: 14px;
    margin-bottom: 12px;
    position: sticky;
    top: 0;
    z-index: 5;
    padding-top: 12px;
    padding-bottom: 10px;
    display: block;
    margin-right: -18px;
    padding-left: 32px;
    padding-right: 18px;
    background: linear-gradient(180deg, rgba(35, 108, 98, 0.9), rgba(35, 108, 98, 0.7));
}

.sticky-dropdown label.form-label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #d2a24b;
    transform: translateY(-50%);
    box-shadow: 0 0 0 4px rgba(210, 162, 75, 0.18);
}

.sticky-dropdown label.form-label::after {
    content: "";
    display: block;
    margin-top: 8px;
    width: 72px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(210, 162, 75, 0.9), rgba(210, 162, 75, 0));
}

.surah-search {
    position: sticky;
    top: 0;
    z-index: 6;
    padding: 12px 18px;
    margin: 0 -18px 12px;
    background: linear-gradient(180deg, rgba(35, 108, 98, 0.95), rgba(35, 108, 98, 0.75));
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.surah-search-input {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(12, 35, 33, 0.28);
    color: #ffffff;
    padding: 10px 12px;
}

.surah-search-input::placeholder {
    color: rgba(255, 255, 255, 0.65);
}

.surah-search-input::-webkit-search-cancel-button {
    filter: invert(1);
}

.surah-search-input::-ms-clear {
    filter: invert(1);
}

.filter-item .form-label {
    margin-bottom: 6px;
}

.sticky-dropdown option {
    color: #1f2933;
}

.sticky-dropdown.collapsed {
    padding-top: 10px;
    padding-bottom: 10px;
    max-height: 86px;
    margin-bottom: 0.65rem;
    /* fully hide any children besides the toggle icon */
    overflow: hidden;
}

/* Belt-and-suspenders: force inner content hidden when collapsed */
.sticky-dropdown.collapsed .row,
.sticky-dropdown.collapsed .form-label,
.sticky-dropdown.collapsed .form-select {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
}

@media (max-width: 768px) {
    .surat-page {
        padding-bottom: calc(100px + env(safe-area-inset-bottom));
    }
}

.audio-player-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1001;
    background: linear-gradient(135deg,
            rgba(15, 47, 43, 0.98),
            rgba(20, 60, 55, 0.95));
    box-shadow: 0 -10px 24px rgba(10, 32, 30, 0.35);
    border-top: 1px solid rgba(210, 162, 75, 0.35);
    border-radius: 20px 20px 0 0;
    padding: 12px 14px calc(12px + env(safe-area-inset-bottom)) 14px;
    transition: transform 0.3s ease-in-out;
}

.surat-page {
    padding-bottom: calc(190px + env(safe-area-inset-bottom));
}

.custom-audio-player {
    display: flex;
    flex-direction: column;
    color: white;
    padding: 6px 12px;
}

.ayah-scrollbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 14px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
}

.ayah-scrollbar-label {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.65);
}

.ayah-scrollbar-input {
    flex: 1;
    accent-color: #d2a24b;
}

.ayah-scrollbar-count {
    font-weight: 600;
    color: #fff;
    min-width: 64px;
    text-align: right;
}

.controls {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
}

.control-btn {
    padding: 12px;
    border-radius: 14px;
}

/* Align close button to the end on wider screens */
.controls .control-btn[title="Close"] {
    margin-left: auto;
}

@media (max-width: 768px) {
    .controls .control-btn[title="Close"] {
        margin-left: 0;
        /* Remove the margin-left: auto to align with other buttons */
    }

    .time {
        font-size: 0.8rem !important;
        min-width: 100px;
        text-align: center;
    }

    .volume-bar-container {
        position: fixed;
        bottom: 100%;
        left: 0;
        width: 100%;
        background-color: rgba(33, 33, 33, 0.95);
        padding: 10px;
        border-radius: 15px 15px 0 0;
    }

    .volume-slider {
        width: 100%;
    }
}

@media (max-width: 576px) {
    .controls {
        gap: 8px;
    }

    .controls .control-btn {
        font-size: 1.5rem;
        padding: 6px;
    }

    .controls .time {
        flex-basis: 100%;
    }
}

.control-btn {
    background: none;
    border: none;
    color: #f8fbf9;
    font-size: 1.75rem;
    cursor: pointer;
    border-radius: 12px;
    padding: 4px;
    transition: color 0.2s, transform 0.18s ease, background-color 0.18s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.control-btn:hover {
    color: #f9d98f;
    background-color: rgba(210, 162, 75, 0.16);
    transform: translateY(-1px);
}

.icon-btn {
    background: rgba(15, 110, 99, 0.06);
    border: 1px solid rgba(15, 110, 99, 0.12);
    color: #0b6e63;
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.18s ease, border-color 0.18s ease,
        transform 0.18s ease;
}

/* Increase icon sizes for per-ayah actions (desktop) */
.ayah-card-container .icon-btn i {
    font-size: 1.4rem;
}

/* Make sticky toggle icon a bit larger */
.filter-toggle i {
    font-size: 1rem;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    border: 1px solid rgba(210, 162, 75, 0.2);
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s ease;
}

.progress-bar:active {
    cursor: ew-resize;
}

.progress-bar:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.progress {
    height: 100%;
    background: linear-gradient(90deg, #f0b65a, #0f6e63);
    transition: width 0.1s linear;
}

/* Progress handle (visual affordance) */
.progress::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -6px;
    width: 12px;
    height: 12px;
    transform: translateY(-50%);
    background: #ffffff;
    border-radius: 50%;
    border: 2px solid #f0b65a;
    box-shadow: 0 2px 6px rgba(9, 25, 22, 0.3);
    opacity: 0.85;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.progress-bar:hover .progress::after,
.progress-bar:focus-within .progress::after {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
}

.volume-slider {
    width: 100px;
    height: 4px;
}

/* removed scroll-margin to avoid scroll coupling */

.ayah-card {
    padding: 15px;
    margin-bottom: 1rem;
    border-radius: 10px;
    background-color: var(--bs-body-bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.18s ease, transform 0.18s ease,
        border-color 0.18s ease;
    animation: fadeInUp 0.4s ease both;
}

.ayah-card:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
    border-color: rgba(0, 0, 0, 0.06);
}

@media (max-width: 768px) {
    .ayah-card {
        padding: 10px;
    }

    .arabic-text {
        font-size: 1.7rem !important;
        /* line-height: 5.8vh; */
    }

    .translation-text {
        font-size: 0.9rem !important;
        /* line-height: 1.6; */
    }

    .mobile-controls {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 10px;
    }

    .mobile-controls .control-btn {
        font-size: 1.3rem;
    }
}

@media (max-width: 576px) {
    .display-5 {
        font-size: 1.8rem;
    }

    .lead {
        font-size: 1rem;
    }

    h4 {
        font-size: 1.1rem;
    }
}

/* Mobile compact filters: 2-row grid (more efficient than stacked) */
@media (max-width: 576px) {
    .sticky-dropdown {
        padding: 6px 8px !important;
        border-radius: 12px;
    }

    .filter-header {
        margin-bottom: 8px;
        flex-direction: column;
        align-items: stretch;
        position: relative;
        padding-right: 52px;
    }

    .filter-icon {
        width: 38px;
        height: 38px;
    }

    .filter-subtitle {
        font-size: 0.85rem;
    }

    .filter-title {
        width: 100%;
    }

    .filter-actions {
        width: 100%;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin-top: 8px;
    }

    .filter-toggle {
        position: absolute;
        right: 0;
        top: 0;
    }

    .bookmark-cta-link {
        order: 2;
        width: 100%;
        white-space: normal;
        text-align: center;
        justify-content: center;
    }

    .auth-alert {
        flex-wrap: wrap;
        text-align: left;
    }

    .auth-alert-link {
        margin-left: 0;
        width: 100%;
        text-align: center;
    }

    .sticky-dropdown.collapsed {
        max-height: 120px;
    }

    /* Grid layout: Surah full width, Reciter + Translation side by side */
    .sticky-dropdown .row.g-3 {
        display: grid !important;
        grid-template-columns: 3fr 2fr;
        /* Reciter wider (60/40) */
        grid-auto-rows: minmax(40px, auto);
        gap: 6px !important;
    }

    .sticky-dropdown .row.g-3>.col-12,
    .sticky-dropdown .row.g-3>.col-12.col-md-4 {
        margin-top: 0 !important;
    }

    /* First block (Surah) spans two columns */
    .sticky-dropdown .row.g-3>.col-12.col-md-4:first-child {
        grid-column: 1 / -1;
    }

    /* Ensure 2nd (Reciter) and 3rd (Translation) sit left/right respectively */
    .sticky-dropdown .row.g-3>.col-12.col-md-4:nth-child(2) {
        grid-column: 1;
    }

    .sticky-dropdown .row.g-3>.col-12.col-md-4:nth-child(3) {
        grid-column: 2;
    }

    /* Labels: small but visible to preserve clarity */
    .sticky-dropdown label.form-label {
        font-size: 0.78rem;
        margin-bottom: 2px;
        opacity: 0.85;
    }

    /* Compact select appearance */
    .sticky-dropdown .form-select {
        font-size: 0.9rem !important;
        padding: 8px 10px !important;
        height: 40px !important;
        border-radius: 10px !important;
        background-color: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(15, 110, 99, 0.2);
    }
}

@media (max-width: 420px) {
    .sticky-dropdown .row.g-3 {
        grid-template-columns: 1fr;
    }

    .sticky-dropdown .row.g-3>.col-12.col-md-4:nth-child(2),
    .sticky-dropdown .row.g-3>.col-12.col-md-4:nth-child(3) {
        grid-column: 1 / -1;
    }

    .bookmark-cta-link {
        font-size: 0.82rem;
    }
}

@media (prefers-color-scheme: dark) {
    .ayah-card {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.06);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    }

    .sticky-dropdown {
        background: linear-gradient(180deg,
                rgba(24, 28, 32, 0.96),
                rgba(20, 24, 28, 0.94));
        border-color: rgba(255, 255, 255, 0.08);
        box-shadow: 0 18px 36px rgba(0, 0, 0, 0.35);
        backdrop-filter: saturate(120%) blur(8px);
    }

    .filter-subtitle {
        color: #e5e7eb;
    }

    .filter-eyebrow,
    .sticky-dropdown label.form-label {
        color: rgba(229, 231, 235, 0.7);
    }

    .filter-icon {
        background: rgba(15, 110, 99, 0.24);
        color: #7ce0d0;
    }

    .filter-toggle {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.12);
        color: #cfeee8;
    }

    .sticky-dropdown .form-select {
        background: rgba(255, 255, 255, 0.08);
        color: #e5e7eb;
        border-color: rgba(255, 255, 255, 0.16);
    }
}

@media (hover: none) {
    .control-btn {
        padding: 12px;
        margin: 0 5px;
    }

    .control-btn:active {
        transform: scale(0.95);
    }
}

.loading-placeholder {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
    background: linear-gradient(90deg, #fff7ea 25%, #f2f6f3 50%, #fff7ea 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

.empty-state {
    border: 1px dashed rgba(0, 0, 0, 0.15);
    border-radius: 8px;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

@media (max-width: 991px) {
    .hide-on-mobile-tablet {
        display: none;
    }
}

/* Mobile icon sizing overrides */
@media (max-width: 768px) {
    .control-btn {
        font-size: 2rem;
    }

    .ayah-card-container .icon-btn i {
        font-size: 1.8rem;
    }
}

.highlighted-word {
    background: #0f6e63;
    color: #fff;
    border-radius: 4px;
    padding: 0 2px;
    box-shadow: 0 1px 0 rgba(15, 110, 99, 0.25);
    transition: background 0.2s, box-shadow 0.2s;
}

/* Audio Visualizer Styles */
.audio-visualizer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 0 2px;
    opacity: 0.7;
    pointer-events: none;
}

.visualizer-bar {
    width: 2px;
    background: linear-gradient(to top, #0f6e63, #f0b65a);
    border-radius: 1px;
    animation: pulse-visualizer 0.6s ease-in-out infinite alternate;
}

@keyframes pulse-visualizer {
    0% {
        opacity: 0.4;
    }

    100% {
        opacity: 1;
    }
}

/* Speed Indicator */
.speed-indicator {
    font-size: 0.7rem;
    font-weight: bold;
    margin-left: 2px;
    color: #f0b65a;
}

/* Enhanced Control Buttons */
.control-btn {
    transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
    border-radius: 12px;
}

.control-btn:hover {
    background-color: rgba(210, 162, 75, 0.16);
    transform: translateY(-2px);
}

.control-btn:active {
    transform: translateY(0);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .speed-indicator {
        font-size: 0.6rem;
    }

    .visualizer-bar {
        width: 1px;
    }

    .audio-visualizer {
        padding: 0 1px;
    }
}

/* Next Step spacing */
.next-step-wrapper {
    padding: 10px;
}

/* Theme tokens (scoped to this component container) */
.surat-page {
    --ic-primary: #0f6e63;
    --ic-secondary: #0a4b45;
    --ic-accent: #d2a24b;
    --ic-bg-elev: #ffffff;
    --ic-text-muted: #4e5f5f;
    --ic-border: rgba(15, 110, 99, 0.18);
    --ic-shadow: 0 16px 32px rgba(15, 53, 48, 0.12);
}

/* Palette variants: apply alongside `.surat-page` (CSS-only) */
.surat-page.theme-sand {
    --ic-primary: #a06927;
    --ic-secondary: #7a5130;
    --ic-accent: #d2a24b;
    --ic-bg-elev: #fffaf3;
    --ic-text-muted: #463f3a;
    --ic-border: rgba(160, 105, 39, 0.18);
    --ic-shadow: 0 14px 30px rgba(160, 105, 39, 0.12);
}

.surat-page.theme-rose {
    --ic-primary: #b3547a;
    --ic-secondary: #7a3a59;
    --ic-accent: #ff80a6;
    --ic-bg-elev: #fff6f9;
    --ic-text-muted: #49313e;
    --ic-border: rgba(179, 84, 122, 0.18);
    --ic-shadow: 0 14px 30px rgba(179, 84, 122, 0.12);
}

.surat-page.theme-ink {
    --ic-primary: #1e293b;
    --ic-secondary: #0f172a;
    --ic-accent: #60a5fa;
    --ic-bg-elev: #0b1220;
    --ic-text-muted: #cbd5e1;
    --ic-border: rgba(96, 165, 250, 0.2);
    --ic-shadow: 0 16px 32px rgba(2, 6, 23, 0.45);
}

/* Density presets: add to `.surat-page` */
.surat-page.density-compact {
    --ic-space-y: 0.65rem;
}

.surat-page.density-comfortable {
    --ic-space-y: 1rem;
}

.surat-page.density-spacious {
    --ic-space-y: 1.35rem;
}

/* Wire density to components */
.surat-page.density-compact .ayah-card {
    padding: 10px;
    margin-bottom: var(--ic-space-y, 0.65rem);
}

.surat-page.density-comfortable .ayah-card {
    padding: 14px;
    margin-bottom: var(--ic-space-y, 1rem);
}

.surat-page.density-spacious .ayah-card {
    padding: 18px;
    margin-bottom: var(--ic-space-y, 1.35rem);
}

/* Minimal style variant: reduce shadows and borders */
.surat-page.style-minimal .ayah-card {
    box-shadow: none;
    border: 1px solid var(--ic-border);
}

.surat-page.style-minimal .audio-player-container {
    box-shadow: none;
    background: linear-gradient(135deg,
            rgba(15, 47, 43, 0.92),
            rgba(20, 60, 55, 0.92));
}

.surat-page.style-minimal .sticky-dropdown {
    box-shadow: 0 6px 16px rgba(15, 53, 48, 0.12);
    border: 1px solid rgba(15, 110, 99, 0.16);
}

.surat-page.style-minimal .icon-btn:hover,
.surat-page.style-minimal .control-btn:hover {
    transform: none;
    box-shadow: none;
}

/* Typography finesse */
.surat-page {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.surat-page ::selection {
    background: rgba(210, 162, 75, 0.25);
}

.lead {
    color: var(--ic-text-muted);
}

h1.display-5 {
    letter-spacing: -0.01em;
}

/* Arabic/translation rhythm and contrast */
.arabic-text {
    color: #123532;
    line-height: 1.9;
}

.translation-text {
    color: #2f3f42;
    border-top: 1px solid rgba(15, 110, 99, 0.12);
    padding-top: 8px;
}

@media (prefers-color-scheme: dark) {
    .translation-text {
        border-top-color: rgba(255, 255, 255, 0.12);
    }
}

/* Focus-visible states */
.control-btn:focus-visible,
.icon-btn:focus-visible,
.sticky-dropdown .form-select:focus-visible,
.filter-toggle:focus-visible {
    outline: 2px solid var(--ic-accent);
    outline-offset: 2px;
    border-radius: 10px;
}

/* Sticky toggle affordance */
.filter-toggle:focus-visible {
    box-shadow: 0 0 0 0.15rem rgba(210, 162, 75, 0.25);
}

/* Enhanced selects without markup change */
.sticky-dropdown .form-select {
    border-radius: 12px;
    border: 1px solid rgba(15, 110, 99, 0.2);
    background-color: rgba(255, 255, 255, 0.95);
    color: #1c2b2f;
    transition: border-color 0.2s ease, background-color 0.2s ease,
        box-shadow 0.2s ease;
}

.sticky-dropdown .form-select:focus {
    border-color: rgba(15, 110, 99, 0.6);
    background-color: rgba(255, 255, 255, 0.98);
    box-shadow: 0 0 0 0.15rem rgba(15, 110, 99, 0.2);
}

/* Per-ayah action icons polish */
.ayah-card-container .icon-btn {
    box-shadow: 0 6px 14px rgba(15, 53, 48, 0.08);
    transition: background-color 0.18s ease, border-color 0.18s ease,
        transform 0.18s ease, box-shadow 0.18s ease;
}

.ayah-card-container .icon-btn:hover {
    background-color: rgba(15, 110, 99, 0.12);
    border-color: rgba(15, 110, 99, 0.22);
    box-shadow: 0 10px 20px rgba(15, 53, 48, 0.12);
    transform: translateY(-1px);
}

/* Ayah quick actions */
.ayah-quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 12px 0 10px;
}

.action-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid rgba(15, 110, 99, 0.2);
    background: rgba(255, 255, 255, 0.92);
    color: #0b6e63;
    font-weight: 600;
    font-size: 0.85rem;
    transition: transform 0.18s ease, box-shadow 0.18s ease,
        border-color 0.18s ease;
}

.action-pill i {
    font-size: 1rem;
}

.action-pill:hover {
    transform: translateY(-1px);
    border-color: rgba(15, 110, 99, 0.35);
    box-shadow: 0 8px 18px rgba(15, 53, 48, 0.12);
}

.action-pill:focus-visible {
    outline: 2px solid var(--ic-accent);
    outline-offset: 2px;
}

/* Entrance motion for ayah cards */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Density presets: add `density-compact` to `.surat-page` to activate */
.density-compact .ayah-card {
    padding: 10px;
    margin-bottom: 0.65rem;
}

.density-compact .controls {
    gap: 8px;
}

.density-compact .arabic-text {
    font-size: 0.95em;
}

.density-compact .translation-text {
    font-size: 0.95em;
}

.density-compact .sticky-dropdown {}

.feedback-fade-enter-active,
.feedback-fade-leave-active {
    transition: opacity 0.5s ease;
}

.feedback-fade-enter-from,
.feedback-fade-leave-to {
    opacity: 0;
}

/* Reduce motion politely */
@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
        animation: none !important;
    }
}

/* Subtle global typography tuning */
.lead {
    color: var(--ic-text-muted);
    max-width: 72ch;
    margin-left: auto;
    margin-right: auto;
}

h1.display-5 {
    letter-spacing: -0.02em;
    color: #0f2f2b;
    transform: translateY(-1px);
}

/* Translation and Arabic text subtle contrast */
.arabic-text {
    color: #0a2e2a;
}

.translation-text {
    color: #334155;
}

@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
        animation: none !important;
    }
}

/* Ayah card polish: typography, layout, toolbar */
.ayah-card-container .arabic-text {
    line-height: 2.1;
    letter-spacing: 0.2px;
    color: #082b27;
}

.ayah-card-container .ltr-text {
    color: #334155;
}

.ayah-card-container h4.fw-bold.hide-on-mobile-tablet {
    color: #1f2a37;
    opacity: 0.85;
}

.ayah-card-container h2,
.ayah-card-container h4 {
    font-weight: 700;
    letter-spacing: -0.01em;
}

.ayah-card-container h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(31, 41, 55, 0.6);
}

/* Constrain reading width for better legibility */
.ayah-card-container .rtl-text,
.ayah-card-container .ltr-text {
    /* Keep content readable and centered instead of crammed */
    /* --reading-width: clamp(56ch, 86vw, 96ch); */
    /* max-width: var(--reading-width); */
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

/* Unified toolbar on all sizes: show mobile toolbar on desktop, hide desktop icon column */
@media (min-width: 768px) {
    .ayah-card-container .d-none.d-md-flex {
        display: none !important;
    }

    .ayah-card-container .d-block.d-md-none {
        display: block !important;
    }
}

/* Toolbar styling */
.ayah-card-container .d-block.d-md-none .row.mb-3 {
    background: linear-gradient(135deg,
            rgba(248, 250, 251, 0.95),
            rgba(236, 245, 242, 0.9));
    border: 1px solid rgba(11, 128, 111, 0.14);
    border-radius: 999px;
    padding: 8px 6px;
    gap: 0;
    width: 100%;
    /* Match text width and center for balance */
    max-width: var(--reading-width);
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 12px 22px rgba(15, 53, 48, 0.08);
}

/* On narrow screens, let content breathe edge-to-edge */
@media (max-width: 576px) {

    .ayah-card-container .rtl-text,
    .ayah-card-container .ltr-text,
    .ayah-card-container .d-block.d-md-none .row.mb-3 {
        --reading-width: 100%;
        max-width: 100%;
        margin-left: 0;
        margin-right: 0;
    }
}

@media (max-width: 576px) {
    .ayah-card-container .d-flex.justify-content-between.text-muted.ltr-text {
        flex-wrap: wrap;
        gap: 8px;
    }

    .ayah-card-container .d-flex.justify-content-between.text-muted.ltr-text h4 {
        flex: 1 1 100%;
        font-size: 1rem;
    }

    .ayah-card-container .d-flex.justify-content-between.text-muted.ltr-text .bookmark-btn {
        width: 40px;
        height: 40px;
        border-radius: 12px;
    }

    .ayah-card-container .d-flex.justify-content-between.text-muted.ltr-text .bookmark-btn i {
        font-size: 1.4rem;
    }

    .ayah-card-container .d-flex.justify-content-between.text-muted.ltr-text img {
        width: 28px;
    }
}

@media (max-width: 420px) {
    .ayah-card-container .d-block.d-md-none .row.mb-3 {
        flex-wrap: wrap;
        border-radius: 18px;
        padding: 10px 6px;
    }

    .ayah-card-container .d-block.d-md-none .row.mb-3 .col-2 {
        flex: 0 0 33.333%;
        max-width: 33.333%;
        padding: 4px;
    }

    .ayah-card-container .icon-btn {
        width: 42px;
        height: 42px;
    }
}

.ayah-card-container .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #0b6e63;
}

.ayah-card-container .icon-btn i {
    font-size: 1.4rem;
}

.ayah-card-container .icon-btn:hover {
    background: rgba(11, 128, 111, 0.1);
}

.ayah-card-container .bookmark-btn {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    background: #ffffff;
    border: 1px solid rgba(15, 110, 99, 0.25);
    box-shadow: 0 10px 22px rgba(15, 53, 48, 0.12);
}

.ayah-card-container .bookmark-btn i {
    font-size: 1.6rem;
}

.ayah-card-container .bookmark-btn:hover {
    background: rgba(15, 110, 99, 0.12);
    border-color: rgba(15, 110, 99, 0.45);
    transform: translateY(-1px);
}

.ayah-card-container .icon-btn.is-saved {
    background: linear-gradient(135deg, #0f6e63 0%, #0a4b45 100%) !important;
    border-color: #0b5c53 !important;
    color: #ffffff !important;
    box-shadow: 0 8px 16px rgba(15, 110, 99, 0.2) !important;
    transform: translateY(-1px) scale(1.04) !important;
    z-index: 2;
}

.ayah-card-container .icon-btn.is-saved i {
    color: #ffffff !important;
    font-weight: 500;
    font-size: 1.6rem !important;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.ayah-card-container .d-flex.justify-content-between.text-muted.ltr-text {
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(15, 23, 42, 0.06);
    margin-bottom: 12px;
}

.ayah-card-container .d-flex.justify-content-between.text-muted.ltr-text h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    color: #1f2937;
}

.saved-pill {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: rgba(15, 110, 99, 0.12);
    color: #0f6e63;
    border: 1px solid rgba(15, 110, 99, 0.3);
    border-radius: 999px;
    padding: 2px 8px;
}

.ayah-card-container .d-flex.justify-content-between.text-muted.ltr-text img {
    filter: drop-shadow(0 6px 10px rgba(15, 53, 48, 0.15));
}

/* Subtle divider above toolbar */
.ayah-card-container .d-block.d-md-none .row.mb-3::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -10px;
    height: 1px;
    background: linear-gradient(90deg,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.08),
            rgba(0, 0, 0, 0));
}

/* Desktop spacing tightening */
@media (min-width: 992px) {
    .ayah-card {
        padding: 16px 18px;
    }

    .ayah-card-container .arabic-text {
        font-size: 2rem;
    }

    .ayah-surface {
        padding: 22px 26px;
    }
}
</style>
