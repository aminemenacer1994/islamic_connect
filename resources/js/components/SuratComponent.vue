<template>
    <div
        class="container py-4 surat-premium"
        :class="{ 'has-audio-player': showAudioPlayer }"
        role="main"
        aria-label="Quran Explorer"
    >
        <div class="row justify-content-center text-center mb-3">
            <div class="col-lg-10 col-xl-10">
                <h1 class="display-5 fw-bold">The Holy Quran</h1>
                <p class="lead">
                    Explore the Quran in Arabic, accompanied by translations and
                    recitations from world-renowned Qaris. Listen to beautiful
                    recitations to deepen your understanding.
                </p>
            </div>
        </div>
        <div
            class="sticky-dropdown"
            :style="{ top: isVisible ? '80px' : '60px' }"
            ref="stickyDropdown"
            :class="{ collapsed: !isVisible }"
        >
            <div class="filter-header">
                <div class="filter-title">
                    <span class="filter-icon"
                        ><i class="fas fa-sliders-h" aria-hidden="true"></i
                    ></span>
                    <div>
                        <div class="filter-eyebrow">Filters</div>
                        <div class="filter-subtitle">
                            Surah, reciter, and translation
                        </div>
                    </div>
                </div>
                <div class="filter-actions">
                    <a
                        href="/bookmarks"
                        class="bookmark-cta-link"
                        @click.prevent="onBookmarksLinkClick"
                    >
                        <i
                            class="bi bi-bookmark-heart-fill me-2"
                            aria-hidden="true"
                        ></i>
                        View saved bookmarks
                    </a>
                    <button
                        type="button"
                        class="filter-toggle"
                        @click="toggleVisibility"
                        :aria-expanded="isVisible"
                        aria-controls="surat-filters"
                        :aria-label="
                            isVisible ? 'Hide filters' : 'Show filters'
                        "
                    >
                        <i
                            v-if="isVisible"
                            class="bi bi-chevron-up"
                            aria-hidden="true"
                        ></i>
                        <i
                            v-else
                            class="bi bi-chevron-down"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
            </div>
            <div
                v-if="authAlert"
                class="alert alert-warning auth-alert"
                role="status"
            >
                <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
                <span>{{ authAlert }}</span>
                <a href="/login" class="btn btn-sm btn-light auth-alert-link"
                    >Log in</a
                >
            </div>
            <div id="surat-filters" class="row g-3" v-show="isVisible">
                <div class="col-12 col-md-4 filter-item">
                    <label for="surah-select" class="form-label mt-2"
                        >Select Surah</label
                    >
                    <select
                        id="surah-select"
                        class="form-select shadow-sm"
                        v-model="selectedSurah"
                        @change="fetchSurahDetails"
                    >
                        <option value="" disabled>Select a Surah</option>
                        <option
                            v-for="surah in surahs"
                            :key="surah.number"
                            :value="surah.number"
                        >
                            {{ surah.number }}. {{ surah.englishName }} ({{
                                surah.name
                            }})
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-4 filter-item">
                    <label for="reciter-select" class="form-label mt-2"
                        >Select Reciter</label
                    >
                    <select
                        id="reciter-select"
                        class="form-select shadow-sm"
                        v-model="selectedReciter"
                    >
                        <option value="" disabled>Select a reciter</option>
                        <option
                            v-for="reciter in recitersSorted"
                            :key="reciter.identifier"
                            :value="reciter.identifier"
                        >
                            {{ reciter.englishName }}
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-4 filter-item">
                    <label for="translation-select" class="form-label mt-2"
                        >Select Translation</label
                    >
                    <select
                        id="translation-select"
                        class="form-select shadow-sm"
                        v-model="selectedTranslation"
                    >
                        <option value="" disabled>Select Translation</option>
                        <option
                            v-for="translation in translationsSorted"
                            :key="translation.identifier"
                            :value="translation.identifier"
                        >
                            {{
                                `${translation.flag} ${translation.englishName} (${translation.language})`
                            }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div v-show="showNextStep" class="next-step-wrapper">
            <div class="mx-auto mb-4 next-step-card">
                <button
                    type="button"
                    :title="nextStepMinimized ? 'Restore' : 'Minimize'"
                    :aria-label="
                        nextStepMinimized
                            ? 'Restore next step'
                            : 'Minimize next step'
                    "
                    @click="toggleNextStepMinimized"
                    class="next-step-toggle"
                >
                    <i
                        class="fas"
                        :class="
                            nextStepMinimized
                                ? 'fa-expand-alt'
                                : 'fa-compress-alt'
                        "
                        aria-hidden="true"
                    ></i>
                </button>
                <div class="d-flex align-items-start gap-3 text-start">
                    <div class="flex-shrink-0 mt-1">
                        <div class="next-step-icon-circle">
                            <i class="fas fa-quran"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <p
                            class="mb-2 fw-semibold text-uppercase next-step-eyebrow"
                        >
                            NEXT STEP
                        </p>
                        <!-- Minimized teaser -->
                        <div
                            v-show="nextStepMinimized"
                            class="mb-2 next-step-teaser"
                        >
                            <a
                                href="/history"
                                class="fw-semibold text-decoration-none next-step-link"
                            >
                                Explore Qur’an history
                            </a>
                            <i
                                class="fas fa-arrow-up-right-from-square ms-1 next-step-link-icon"
                            ></i>
                        </div>
                        <p
                            v-show="!nextStepMinimized"
                            class="mb-3 next-step-text"
                        >
                            If you feel ready to move from listening to
                            learning? Explore key milestones, preservation
                            efforts, and scholars in
                            <a
                                href="/history"
                                class="fw-semibold text-decoration-none next-step-link"
                            >
                                the history of the Qur’an
                            </a>
                            to deepen your understanding.
                        </p>
                        <a
                            v-show="!nextStepMinimized"
                            href="/history"
                            class="btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta"
                        >
                            Explore History
                            <i
                                class="fas fa-arrow-up-right-from-square ms-2"
                            ></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="loading-placeholder">Loading Surah...</div>

        <div
            class="row rtl-text"
            ref="listContainer"
            role="list"
            aria-label="Ayah cards list"
        >
            <div :style="{ height: topSpacerHeight + 'px' }"></div>

            <div
                style="padding: 12px; border-radius: 8px"
                ref="audioCard"
                v-for="item in visibleWindow"
                :key="item.ayah.number"
                class="col-md-12 mb-2 mt-2 ayah-card-container shadow-md"
                role="listitem"
                :id="`ayah-card-${item.index}`"
                @click="selectCard(item.index)"
                @keydown.enter.prevent="toggleAudioPlayer(item.index)"
                @keydown.space.prevent="toggleAudioPlayer(item.index)"
                draggable="true"
                @dragstart="onAyahDragStart(item.ayah, $event)"
                :class="{
                    highlighted:
                        isHighlighted && currentlyPlayingIndex === item.index,
                    'currently-playing': isAudioPlaying[item.index],
                }"
            >
                <div class="ayah-surface h-100 rtl-text d-flex flex-column">
                    <!-- Surah and Ayah Number -->
                    <div
                        class="d-flex justify-content-between text-muted ltr-text"
                    >
                        <h4>
                            <img
                                src="/images/art.png"
                                width="35px"
                                alt="Art Icon"
                            />
                            {{ surahDetails?.surahNumber }} :
                            {{ item.index + 1 }}
                            <span
                                v-if="isAyahSaved(item.ayah)"
                                class="saved-pill"
                                >Saved</span
                            >
                        </h4>
                            <div class="d-flex align-items-center">
                                <transition name="feedback-fade">
                                    <span
                                        v-if="
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                        item.ayah.number
                                                )
                                            ]
                                        "
                                        class="me-3 badge rounded-pill shadow-lg border-0 px-4 py-2 fs-6 fw-bold feedback-badge"
                                        :class="
                                            feedbackMessages[
                                                buildAyahKey(
                                                    surahDetails?.surahNumber,
                                                    item.ayah.numberInSurah ||
                                                        item.ayah.number
                                                )
                                            ].class
                                        "
                                    >
                                        <i
                                            v-if="
                                                feedbackMessages[
                                                    buildAyahKey(
                                                        surahDetails?.surahNumber,
                                                        item.ayah.numberInSurah ||
                                                            item.ayah.number
                                                    )
                                                ].icon === 'check'
                                            "
                                            class="bi bi-check-circle-fill me-2 fs-5"
                                        ></i>
                                        <i
                                            v-else-if="
                                                feedbackMessages[
                                                    buildAyahKey(
                                                        surahDetails?.surahNumber,
                                                        item.ayah.numberInSurah ||
                                                            item.ayah.number
                                                    )
                                                ].icon === 'trash'
                                            "
                                            class="bi bi-trash-fill me-2 fs-5"
                                        ></i>
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
                                <button
                                    type="button"
                                    class="icon-btn ms-2"
                                    @click.stop="openBookmarkModal(item.ayah)"
                                    title="Save to folder / Organize"
                                    aria-label="Save to folder or organize bookmark"
                                >
                                    <i class="bi bi-folder-plus" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                    <!-- Desktop Layout: Icons on Left -->
                    <div
                        class="row d-none d-md-flex"
                        role="group"
                        aria-label="Ayah controls (desktop)"
                        :aria-hidden="isMobile"
                    >
                        <div class="col-md-11">
                            <div style="padding: 4px">
                                <p
                                    class="arabic-text rtl-text fw-bold text-end mb-3"
                                    v-html="highlightedText(item.ayah)"
                                    :style="{ fontSize: arabicFontSize + 'px' }"
                                ></p>
                                <h2
                                    class="pt-2 ltr-text hide-on-mobile-tablet ml-2"
                                >
                                    Translation:
                                </h2>
                                <p
                                    class="fw-regular ltr-text flex-grow-1"
                                    v-html="
                                        highlightText(item.ayah.translation)
                                    "
                                    :style="{
                                        fontSize: translationFontSize + 'px',
                                    }"
                                ></p>
                                <div
                                    class="ayah-quick-actions ltr-text"
                                    role="group"
                                    aria-label="Quick actions"
                                >
                                    <button
                                        type="button"
                                        class="action-pill"
                                        @click.stop="copyAyah(item.ayah)"
                                        aria-label="Copy ayah"
                                        title="Copy ayah"
                                    >
                                        <i
                                            class="bi bi-clipboard"
                                            aria-hidden="true"
                                        ></i>
                                        <span>Copy</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-1 text-center">
                            <div class="d-flex flex-column align-items-center">
                                <button
                                    class="icon-btn mb-3"
                                    @click="toggleAudioPlayer(item.index)"
                                    :aria-label="
                                        isAudioPlaying[item.index]
                                            ? 'Pause ayah ' + (item.index + 1)
                                            : 'Play ayah ' + (item.index + 1)
                                    "
                                    :title="
                                        isAudioPlaying[item.index]
                                            ? 'Pause'
                                            : 'Play'
                                    "
                                >
                                    <i
                                        class="bi"
                                        :class="
                                            isAudioPlaying[item.index]
                                                ? 'bi-pause-circle-fill'
                                                : 'bi-play-circle-fill'
                                        "
                                        aria-hidden="true"
                                    ></i>
                                </button>
                                <button
                                    class="icon-btn mb-3"
                                    @click="decreaseFontSize"
                                    aria-label="Decrease font size"
                                    title="Decrease Font Size"
                                >
                                    <i
                                        class="bi bi-dash-circle-fill"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                                <button
                                    class="icon-btn mb-3"
                                    :class="{ 'is-saved': isAyahSaved(item.ayah) }"
                                    @click.stop="toggleBookmark(item.ayah)"
                                    :title="isAyahSaved(item.ayah) ? 'Remove bookmark' : 'Quick save bookmark'"
                                >
                                    <i
                                        class="bi"
                                        :class="isAyahSaved(item.ayah) ? 'bi-bookmark-check-fill' : 'bi-bookmark-plus-fill'"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Mobile/Tablet Layout: Text then Icons -->

                    <div
                        style=""
                        class="d-block d-md-none"
                        role="group"
                        aria-label="Ayah controls (mobile)"
                        :aria-hidden="!isMobile"
                    >
                        <div>
                            <p
                                class="arabic-text rtl-text fw-bold text-end mb-3"
                                v-html="highlightedText(item.ayah)"
                                :style="{ fontSize: arabicFontSize + 'px' }"
                            ></p>
                            <h4
                                class="fw-bold pt-2 ltr-text hide-on-mobile-tablet ml-2"
                            >
                                Translation:
                            </h4>
                            <p
                                class="fw-regular ltr-text flex-grow-1"
                                v-html="highlightText(item.ayah.translation)"
                                :style="{
                                    fontSize: translationFontSize + 'px',
                                }"
                            ></p>
                            <div
                                class="ayah-quick-actions ltr-text"
                                role="group"
                                aria-label="Quick actions"
                            >
                                <button
                                    type="button"
                                    class="action-pill"
                                    @click.stop="copyAyah(item.ayah)"
                                    aria-label="Copy ayah"
                                    title="Copy ayah"
                                >
                                    <i
                                        class="bi bi-clipboard"
                                        aria-hidden="true"
                                    ></i>
                                    <span>Copy</span>
                                </button>
                            </div>
                        </div>
                        <div
                            class="row card-teal mb-3 py-2"
                            style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin: 0 -5px;
                            "
                        >
                            <div class="col text-center" style="padding: 2px">
                                <button
                                    class="icon-btn"
                                    @click="decreaseFontSize"
                                    aria-label="Decrease font size"
                                    title="Decrease Font Size"
                                >
                                    <i
                                        class="bi bi-dash-circle-fill"
                                        style="font-size: 1.6rem"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                            <div class="col text-center" style="padding: 2px">
                                <button
                                    class="icon-btn"
                                    @click="increaseFontSize"
                                    aria-label="Increase font size"
                                    title="Increase Font Size"
                                >
                                    <i
                                        class="bi bi-plus-circle-fill"
                                        style="font-size: 1.6rem"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                            <div class="col text-center" style="padding: 2px">
                                <button
                                    class="icon-btn"
                                    @click="rewindAudio(item.index)"
                                    aria-label="Rewind 15 seconds"
                                    title="Rewind"
                                >
                                    <i
                                        class="bi bi-skip-backward-circle-fill"
                                        style="font-size: 1.6rem"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                            <div class="col text-center" style="padding: 2px">
                                <button
                                    class="icon-btn"
                                    @click="toggleAudioPlayer(item.index)"
                                    :aria-label="
                                        isAudioPlaying[item.index]
                                            ? 'Pause ayah ' + (item.index + 1)
                                            : 'Play ayah ' + (item.index + 1)
                                    "
                                    :title="
                                        isAudioPlaying[item.index]
                                            ? 'Pause'
                                            : 'Play'
                                    "
                                >
                                    <i
                                        class="bi"
                                        :class="
                                            isAudioPlaying[item.index]
                                                ? 'bi-pause-circle-fill'
                                                : 'bi-play-circle-fill'
                                        "
                                        style="font-size: 1.8rem"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                            <div class="col text-center" style="padding: 2px">
                                <button
                                    class="icon-btn"
                                    @click="fastForwardAudio(item.index)"
                                    aria-label="Fast forward 20 seconds"
                                    title="Fast Forward"
                                >
                                    <i
                                        class="bi bi-skip-forward-circle-fill"
                                        style="font-size: 1.6rem"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                            <div class="col text-center" style="padding: 2px">
                                <button
                                    class="icon-btn"
                                    @click.stop="toggleBookmark(item.ayah)"
                                    :title="isAyahSaved(item.ayah) ? 'Remove bookmark' : 'Quick save bookmark'"
                                >
                                    <i
                                        class="bi"
                                        :class="isAyahSaved(item.ayah) ? 'bi-bookmark-check-fill' : 'bi-bookmark-plus-fill'"
                                        style="font-size: 1.6rem"
                                        aria-hidden="true"
                                    ></i>
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
        <div
            v-if="!isLoading && surahDetails && filteredAyahs.length === 0"
            class="empty-state text-center text-muted py-4"
        >
            No verses match your current search or filters.
        </div>

        <bookmark-modal :ayah="activeAyah" @saved="onBookmarkSaved" />

        <!-- Global Custom Audio Player -->
        <teleport to="body">
            <div v-if="showAudioPlayer" class="audio-player-container">
                <div class="custom-audio-player">
                    <div class="controls">
                        <button
                            @click="rewindAudio(currentlyPlayingIndex)"
                            class="control-btn"
                            title="Rewind"
                            aria-label="Rewind 15 seconds"
                        >
                            <i class="bi bi-skip-backward-fill"></i>
                        </button>
                        <button
                            @click="toggleAudioPlayer(currentlyPlayingIndex)"
                            class="control-btn play-pause"
                            title="Play/Pause"
                            aria-label="Play or Pause"
                        >
                            <i
                                :class="
                                    isAudioPlaying[currentlyPlayingIndex]
                                        ? 'bi bi-pause-fill'
                                        : 'bi bi-play-fill'
                                "
                            ></i>
                        </button>
                        <button
                            @click="fastForwardAudio(currentlyPlayingIndex)"
                            class="control-btn"
                            title="Fast Forward"
                            aria-label="Fast forward 20 seconds"
                        >
                            <i class="bi bi-skip-forward-fill"></i>
                        </button>
                        <button
                            @click="stopAudio(currentlyPlayingIndex)"
                            class="control-btn"
                            title="Stop"
                            aria-label="Stop"
                        >
                            <i class="bi bi-stop-fill"></i>
                        </button>
                        <button
                            @click="toggleVolume"
                            class="control-btn"
                            title="Volume"
                            aria-label="Toggle volume slider"
                        >
                            <i
                                class="bi"
                                :class="`bi-volume-${
                                    volume > 0.5
                                        ? 'up'
                                        : volume > 0
                                        ? 'down'
                                        : 'mute'
                                }-fill`"
                            ></i>
                        </button>
                        <button
                            @click="cyclePlaybackSpeed"
                            class="control-btn"
                            :title="'Speed: ' + playbackSpeed + 'x'"
                        >
                            <i
                                class="bi bi-speedometer2"
                                :style="{
                                    color:
                                        playbackSpeed !== 1
                                            ? '#ff6b6b'
                                            : '#ccc',
                                }"
                            ></i>
                            <span class="speed-indicator"
                                >{{ playbackSpeed }}x</span
                            >
                        </button>
                        <button
                            @click="toggleRepeat"
                            class="control-btn"
                            :title="
                                repeatCurrent
                                    ? 'Repeat current ayah: on'
                                    : 'Repeat current ayah: off'
                            "
                            :aria-pressed="repeatCurrent"
                            aria-label="Toggle repeat current ayah"
                        >
                            <i
                                class="bi bi-arrow-repeat"
                                :style="{
                                    color: repeatCurrent ? '#00bfa6' : '#ccc',
                                }"
                            ></i>
                        </button>
                        <div v-if="showVolumeBar" class="volume-bar-container">
                            <input
                                type="range"
                                v-model="volume"
                                min="0"
                                max="1"
                                step="0.1"
                                @input="updateVolume"
                                class="volume-slider"
                            />
                        </div>
                        <span class="time" aria-live="polite"
                            >{{
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
                            }}</span
                        >
                        <button
                            @click="closeAudioPlayer"
                            class="control-btn"
                            title="Close"
                            aria-label="Close player"
                            style="margin-left: auto"
                        >
                            <i class="bi bi-x-lg mb-2"></i>
                        </button>
                    </div>
                    <div
                        class="progress-bar"
                        role="progressbar"
                        aria-label="Audio playback progress"
                        :aria-valuemin="0"
                        :aria-valuemax="100"
                        :aria-valuenow="progress[currentlyPlayingIndex] || 0"
                        :aria-valuetext="`Progress ${Math.round(
                            progress[currentlyPlayingIndex] || 0
                        )} percent`"
                        @click="seekToPosition"
                        @mousedown.prevent="onProgressDown"
                        @touchstart.prevent.passive="onProgressDown"
                        ref="progressBar"
                    >
                        <div
                            class="progress"
                            :style="{
                                width: progress[currentlyPlayingIndex] + '%',
                            }"
                        ></div>
                        <div class="audio-visualizer" ref="visualizer">
                            <div
                                v-for="(bar, index) in visualizerBars"
                                :key="index"
                                class="visualizer-bar"
                                :style="{
                                    height: bar + '%',
                                    animationDelay: index * 0.1 + 's',
                                }"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
import axios from "axios";
import { Modal } from "bootstrap";
import BookmarkModal from "./bookmarks/BookmarkModal.vue";
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
            feedbackMessages: {}, // Keyed by ayahID, value: { text, class }
            bookmarkToast: "",
            bookmarkToastAction: null,
            bookmarkToastTimer: null,
            authAlert: "",
            authAlertTimer: null,
            deepLinkTarget: null,
            deepLinkHandled: false,
        };
    },
    computed: {
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
            this.$nextTick(this.updateVirtualWindow);
        },
    },
    created() {
        this.loadSavedAyahs();
    },
    mounted() {
        window.addEventListener("keydown", this.onKeydown);
        this.updateIsMobile();
        window.addEventListener("resize", this.updateIsMobile);
        // Restore dismissal state for next-step card
        try {
            if (localStorage.getItem("suratNextStepDismissed") === "1")
                this.showNextStep = false;
        } catch (_) {}
        this.syncSavedAyahsFromApi();
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
        } catch (_) {}
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.onKeydown);
        window.removeEventListener("resize", this.updateIsMobile);
        window.removeEventListener("scroll", this.onScrollVirtual);
        window.removeEventListener("resize", this.computeListTop);
        window.removeEventListener("resize", this.calibrateItemHeight);
        clearTimeout(this.savedAyahClearTimer);
        clearTimeout(this.bookmarkToastTimer);
        this.bookmarkToastAction = null;
        clearTimeout(this.authAlertTimer);
    },
    beforeDestroy() {
        window.removeEventListener("keydown", this.onKeydown);
        window.removeEventListener("resize", this.updateIsMobile);
        window.removeEventListener("scroll", this.onScrollVirtual);
        window.removeEventListener("resize", this.computeListTop);
        window.removeEventListener("resize", this.calibrateItemHeight);
        clearTimeout(this.savedAyahClearTimer);
        clearTimeout(this.bookmarkToastTimer);
        this.bookmarkToastAction = null;
        clearTimeout(this.authAlertTimer);
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
        loadSavedAyahs() {
            if (this.savedAyahsLoaded) return;
            try {
                const sessionStored = sessionStorage.getItem(
                    "ic_saved_ayahs_session"
                );
                if (sessionStored) {
                    this.savedAyahKeys = JSON.parse(sessionStored) || {};
                } else {
                    const legacyStored = localStorage.getItem("ic_saved_ayahs");
                    this.savedAyahKeys = legacyStored
                        ? JSON.parse(legacyStored)
                        : {};
                    if (legacyStored) {
                        sessionStorage.setItem(
                            "ic_saved_ayahs_session",
                            legacyStored
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
            const isAuthed = await this.ensureAuthenticated();
            if (!isAuthed) return;

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
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Already deleted on server, so this is a success state for us.
                    this.showToast("Bookmark removed.", 2000);
                    this.announce("Bookmark removed.");
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
            const isAuthed = await this.ensureAuthenticated();
            if (!isAuthed) return;
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
                const modalEl = document.getElementById('bookmarkModal');
                if (modalEl) {
                    const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
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
        async ensureAuthenticated() {
            try {
                const response = await axios.get("/api/userId");
                if (response.data?.userId) {
                    return true;
                }
            } catch (_) {
                // fall through
            }
            this.showAuthAlert();
            return false;
        },
        showAuthAlert() {
            this.authAlert = "Please log in to use bookmarks.";
            clearTimeout(this.authAlertTimer);
            this.authAlertTimer = setTimeout(() => {
                this.authAlert = "";
            }, 6000);
        },
        persistSavedAyahs(next) {
            try {
                sessionStorage.setItem(
                    "ic_saved_ayahs_session",
                    JSON.stringify(next)
                );
                localStorage.setItem("ic_saved_ayahs", JSON.stringify(next));
            } catch (_) {
                // no-op
            }
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
            } catch (_) {}
        },
        dismissNextStep() {
            this.showNextStep = false;
            try {
                localStorage.setItem("suratNextStepDismissed", "1");
            } catch (_) {}
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
            } catch (_) {}
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
            } catch (_) {}

            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status}`);
            const json = await res.json();
            try {
                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({ ts: Date.now(), data: json })
                );
            } catch (_) {}
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
                } catch (_) {}
                try {
                    this.currentlyPlaying.currentTime = 0;
                } catch (_) {}
            }
            // Pause any stray audios just in case
            if (Array.isArray(this.audioElements)) {
                this.audioElements.forEach((a, i) => {
                    if (a && i !== index) {
                        try {
                            a.pause();
                        } catch (_) {}
                    }
                });
            }

            // Build or update audio element on-demand
            const ayah = this.filteredAyahs[index];
            let audio = this.audioElements[index];
            if (!audio) {
                audio = new Audio();
                // use auto for current, metadata for preloaded next
                audio.preload = "auto";
                audio.addEventListener("timeupdate", () =>
                    this.updateProgress(index)
                );
                audio.addEventListener("ended", () =>
                    this.handleAyahEnd(index)
                );
                audio.addEventListener("error", (e) => {
                    console.error(`Audio error for ayah ${index + 1}:`, e);
                    clearTimeout(this.loadingTimers[index]);
                    this.isAudioLoading[index] = false;
                    this.isAudioPlaying[index] = false;
                    this.$toast?.error(
                        `Failed to load audio for ayah ${index + 1}`
                    );
                });
                this.audioElements[index] = audio;
            }
            if (audio.src !== ayah.audio) {
                try {
                    audio.pause();
                } catch (_) {}
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
                    `Metadata loaded for ayah ${index + 1}, duration: ${
                        this.currentlyPlaying.duration
                    }`
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
                                p2.then(() => markPlaying()).catch(() => {});
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
                } catch (_) {}
                a.src = nextAyah.audio;
                try {
                    a.load();
                } catch (_) {}
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
                        } catch (_) {}
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
                        } catch (_) {}
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
            } catch (_) {}

            // Abort any in-flight request
            try {
                if (this._surahAborter) this._surahAborter.abort();
            } catch (_) {}
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
                    } catch (_) {}
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
                        } catch (_) {}
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
            if (this.isAudioPlaying[index]) {
                this.stopAudio(index);
                if (this.repeatCurrent) {
                    this.toggleAudioPlayer(index);
                } else if (this.continuousPlayback) {
                    this.playNextAyah(index);
                } else {
                    console.log(
                        `Continuous playback disabled, stopping after ayah ${
                            index + 1
                        }`
                    );
                }
            }
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
    mounted: function () {
        // Keyboard shortcuts for better UX
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
        // removed scroll listeners and auto-scroll locking

        this.selectedSurah = "1";
        this.selectedReciter = "ar.alafasy";
        this.selectedTranslation = "en.ahmedali";
        this.currentlyPlayingIndex = 0;
        this.isHighlighted = false;
        this.continuousPlayback =
            JSON.parse(localStorage.getItem("continuousPlayback")) ?? true; // Load preference
        this.playbackSpeed =
            JSON.parse(localStorage.getItem("playbackSpeed")) ?? 1; // Load playback speed preference

        // removed programmatic scroll to top

        Promise.all([
            this.fetchReciters(),
            this.fetchSurahs(),
            this.fetchTranslations(),
            this.fetchSurahDetails(),
        ]).then(() => {
            this.isInitialLoad = false;
            this.$nextTick(() => {
                // removed scroll-to-top after initial load
            });
        });
    },
    beforeUnmount: function () {
        this.isComponentAlive = false;
        window.removeEventListener("keydown", this._keydownHandler);
        // clean up scrub listeners
        if (this._boundMove) {
            window.removeEventListener("mousemove", this._boundMove);
            window.removeEventListener("touchmove", this._boundMove);
        }
        if (this._boundUp) {
            window.removeEventListener("mouseup", this._boundUp);
            window.removeEventListener("touchend", this._boundUp);
        }
        // removed scroll-related event listeners
        if (this.audioElements && this.audioElements.forEach) {
            this.audioElements.forEach((audio) => {
                if (audio && audio.pause) audio.pause();
                if (audio && audio.remove) audio.remove();
            });
        }
    },
};
</script>

<style scoped>
.card-teal {
    border-radius: 999px;
    border: 1px solid rgba(15, 110, 99, 0.12);
    box-shadow: 0 12px 26px rgba(15, 53, 48, 0.1);
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.98),
        rgba(246, 249, 248, 0.94)
    );
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
    border: 1px solid rgba(15, 110, 99, 0.06);
    background: linear-gradient(180deg, #ffffff 0%, #f7f7f3 55%, #f2f5f4 100%);
    box-shadow: 0 18px 40px rgba(15, 53, 48, 0.08);
    padding: 26px 22px 32px;
}

.surat-premium.has-audio-player {
    padding-bottom: calc(32px + 140px + env(safe-area-inset-bottom));
}

.surat-premium > * {
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
        padding-bottom: calc(24px + 170px + env(safe-area-inset-bottom));
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
    max-width: 1180px;
    margin: 0 auto;
    color: var(--surat-ink);
    position: relative;
    border-radius: 28px;
    background: radial-gradient(
            320px 220px at 8% 8%,
            rgba(210, 162, 75, 0.16),
            transparent 65%
        ),
        radial-gradient(
            320px 220px at 92% 0%,
            rgba(15, 110, 99, 0.15),
            transparent 68%
        ),
        linear-gradient(180deg, #fffdf7 0%, #f7fbf7 55%, #f0f6f4 100%);
    box-shadow: var(--surat-shadow);
    overflow: hidden;
}

.surat-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
            circle at 15% 20%,
            rgba(255, 255, 255, 0.6),
            transparent 55%
        ),
        repeating-linear-gradient(
            125deg,
            rgba(15, 110, 99, 0.06) 0 12px,
            transparent 12px 26px
        );
    opacity: 0.6;
    pointer-events: none;
}

.surat-page > * {
    position: relative;
    z-index: 1;
}

.ayah-card-container {
    border-radius: 20px;
    transition: transform 0.2s ease;
}

.ayah-surface {
    border-radius: 18px;
    background: #ffffff;
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
    background: linear-gradient(
        135deg,
        rgba(15, 110, 99, 0.08),
        rgba(210, 162, 75, 0.08)
    );
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
    overflow: hidden;
    max-height: 500px;
    /* expanded */
    border: 1px solid rgba(15, 110, 99, 0.14);
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.98),
        rgba(245, 250, 248, 0.94)
    );
    box-shadow: 0 18px 36px rgba(15, 53, 48, 0.12);
    backdrop-filter: blur(12px) saturate(120%);
}

.sticky-dropdown::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
            circle at 12% 12%,
            rgba(255, 255, 255, 0.7),
            transparent 55%
        ),
        radial-gradient(
            circle at 88% 0%,
            rgba(15, 110, 99, 0.16),
            transparent 60%
        );
    opacity: 0.45;
    pointer-events: none;
}

.sticky-dropdown > * {
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
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.7rem;
    color: #4b5563;
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
    background: linear-gradient(
        135deg,
        rgba(15, 47, 43, 0.98),
        rgba(20, 60, 55, 0.95)
    );
    box-shadow: 0 -10px 24px rgba(10, 32, 30, 0.35);
    border-top: 1px solid rgba(210, 162, 75, 0.35);
    border-radius: 20px 20px 0 0;
    padding: 12px 14px calc(12px + env(safe-area-inset-bottom)) 14px;
    transition: transform 0.3s ease-in-out;
}

.surat-page {
    padding-bottom: calc(120px + env(safe-area-inset-bottom));
}

.custom-audio-player {
    display: flex;
    flex-direction: column;
    color: white;
    padding: 6px 12px;
}

.controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
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

    .sticky-dropdown .row.g-3 > .col-12,
    .sticky-dropdown .row.g-3 > .col-12.col-md-4 {
        margin-top: 0 !important;
    }

    /* First block (Surah) spans two columns */
    .sticky-dropdown .row.g-3 > .col-12.col-md-4:first-child {
        grid-column: 1 / -1;
    }

    /* Ensure 2nd (Reciter) and 3rd (Translation) sit left/right respectively */
    .sticky-dropdown .row.g-3 > .col-12.col-md-4:nth-child(2) {
        grid-column: 1;
    }

    .sticky-dropdown .row.g-3 > .col-12.col-md-4:nth-child(3) {
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

    .sticky-dropdown .row.g-3 > .col-12.col-md-4:nth-child(2),
    .sticky-dropdown .row.g-3 > .col-12.col-md-4:nth-child(3) {
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
        background: linear-gradient(
            180deg,
            rgba(24, 28, 32, 0.96),
            rgba(20, 24, 28, 0.94)
        );
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
    background: linear-gradient(
        135deg,
        rgba(15, 47, 43, 0.92),
        rgba(20, 60, 55, 0.92)
    );
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

.density-compact .sticky-dropdown {
}
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
    background: linear-gradient(
        135deg,
        rgba(248, 250, 251, 0.95),
        rgba(236, 245, 242, 0.9)
    );
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

    .ayah-card-container
        .d-flex.justify-content-between.text-muted.ltr-text
        h4 {
        flex: 1 1 100%;
        font-size: 1rem;
    }

    .ayah-card-container
        .d-flex.justify-content-between.text-muted.ltr-text
        .bookmark-btn {
        width: 40px;
        height: 40px;
        border-radius: 12px;
    }

    .ayah-card-container
        .d-flex.justify-content-between.text-muted.ltr-text
        .bookmark-btn
        i {
        font-size: 1.4rem;
    }

    .ayah-card-container
        .d-flex.justify-content-between.text-muted.ltr-text
        img {
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
    background: linear-gradient(
        135deg,
        rgba(15, 110, 99, 0.22),
        rgba(210, 162, 75, 0.28)
    );
    border-color: rgba(210, 162, 75, 0.7);
    color: #0b5c53;
    box-shadow: 0 12px 26px rgba(15, 53, 48, 0.18),
        0 0 0 3px rgba(210, 162, 75, 0.15);
    transform: translateY(-1px) scale(1.02);
}

.ayah-card-container .icon-btn.is-saved i {
    color: #0b5c53;
    font-size: 1.6rem;
    text-shadow: 0 2px 6px rgba(15, 53, 48, 0.18);
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
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.08),
        rgba(0, 0, 0, 0)
    );
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
