<template>
    <section
        class="islamic-library py-4 py-lg-5"
        :class="{
            'is-dark': isDarkMode,
            'has-audio-dock': showAudioPanel && activeItem,
        }"
    >
        <div class="container">
            <div class="row justify-content-center mb-3">
                <div class="col-12 col-xl-10">
                    <div class="library-hero shadow-sm">
                        <div class="library-head text-center">
                            <h1 class="library-title mb-1">Articles, fatawa, and books</h1>
                            <p class="library-subtitle mb-0 mx-auto">
                                Search and read the latest English material from IslamHouse in a cleaner, lighter reading experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center mb-3">
                <div class="col-12 col-xl-10">
                    <LibrarySearchControls
                        :search-query="searchQuery"
                        :active-type="activeType"
                        :sort-by="sortBy"
                        :density="cardDensity"
                        :suggestions="searchSuggestions"
                        :popular-searches="popularSearches"
                        :trending-topics="trendingTopics"
                        :result-count="filteredItems.length"
                        :type-options="typeOptions"
                        @update:searchQuery="handleSearchQueryUpdate"
                        @update:activeType="activeType = $event"
                        @update:sortBy="sortBy = $event"
                        @update:density="cardDensity = $event"
                        @apply-search="applySearchTerm"
                    />
                </div>
            </div>

            <div class="row justify-content-center mb-3">
                <div class="col-12 col-xl-10">
                    <section class="collections-shell shadow-sm">
                        <div class="collections-head">
                            <div>
                                <div class="collections-kicker">Collections</div>
                                <h2 class="collections-title mb-0">Browse by topic, not just by chronology</h2>
                            </div>
                            <div class="collections-actions">
                                <button
                                    v-if="activeCollectionId"
                                    type="button"
                                    class="collections-action-btn"
                                    @click="clearActiveCollection"
                                    aria-label="Clear active collection"
                                >
                                    <i class="bi bi-x-lg" aria-hidden="true"></i>
                                </button>
                                <button
                                    type="button"
                                    class="collections-action-btn"
                                    @click="collectionsCollapsed = !collectionsCollapsed"
                                    :aria-label="collectionsCollapsed ? 'Show collections' : 'Hide collections'"
                                >
                                    <i class="bi" :class="collectionsCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div v-if="!collectionsCollapsed" class="collections-track" aria-label="Collections">
                            <button
                                v-for="collection in collectionSections"
                                :key="collection.id"
                                type="button"
                                class="collection-card"
                                :class="{ 'is-active': activeCollectionId === collection.id }"
                                @click="activateCollection(collection)"
                            >
                                <span class="collection-icon">
                                    <i class="bi" :class="collection.icon" aria-hidden="true"></i>
                                </span>
                                <span class="collection-name">{{ collection.title }}</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-12 col-xl-10">
                    <div class="library-shell">
                        <div v-if="loadingInitial" class="row g-3">
                            <div v-for="n in 6" :key="'skeleton-' + n" class="col-12 col-md-6 col-xl-4">
                                <div class="library-card card shadow-sm border-0">
                                    <div class="card-body p-4">
                                        <div class="placeholder-glow">
                                            <span class="placeholder col-10 mb-2"></span>
                                            <span class="placeholder col-7 mb-4"></span>
                                            <span class="placeholder col-12 mb-2"></span>
                                            <span class="placeholder col-12 mb-2"></span>
                                            <span class="placeholder col-8 mb-0"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="error" class="library-message alert alert-warning border-0 shadow-sm mb-0">
                            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                                <div>
                                    <strong class="d-block mb-1">Unable to load the IslamHouse library</strong>
                                    <span class="small">{{ error }}</span>
                                </div>
                                <button type="button" class="btn btn-primary btn-sm" @click="loadInitial">Retry</button>
                            </div>
                        </div>

                        <div v-else-if="!filteredItems.length" class="library-message card shadow-sm border-0">
                            <div class="card-body py-5 text-center">
                                <h2 class="h6 fw-semibold mb-2">No matching items found</h2>
                                <p class="text-muted mb-0">Adjust the search or filters to broaden the result set.</p>
                            </div>
                        </div>

                        <div v-else class="row g-3" :class="{ 'library-grid--compact': isCompactView }">
                            <div v-for="item in filteredItems" :key="item.key" class="col-12 col-md-6 col-xl-4">
                                <article class="library-card card shadow-sm border-0 h-100" :class="[getCardThemeClass(item), { 'library-card--compact': isCompactView }]">
                                    <div class="card-body d-flex flex-column" :class="isCompactView ? 'p-3' : 'p-4'">
                                        <div class="card-type-chip" :class="getCardThemeClass(item)">
                                            <i class="bi" :class="getCardTypeIcon(item)" aria-hidden="true"></i>
                                            {{ getCardChipLabel(item) }}
                                        </div>
                                        <h2 class="card-title mb-2" v-html="highlightText(item.title)"></h2>
                                        <template v-if="getCardExcerpt(item)">
                                            <p class="card-excerpt mb-0" v-html="getHighlightedExcerpt(item)"></p>
                                            <p v-if="!isCompactView && getCardExcerptSecondary(item)" class="card-excerpt-secondary mb-0">
                                                {{ getCardExcerptSecondary(item) }}
                                            </p>
                                        </template>
                                        <div v-else class="card-excerpt-placeholder" aria-hidden="true">
                                            <span class="placeholder col-12 mb-2"></span>
                                            <span class="placeholder col-12 mb-2"></span>
                                            <span class="placeholder col-8"></span>
                                        </div>
                                        <div class="card-read-more">
                                            <button type="button" class="continue-link continue-link--inline" @click="openItem(item)">
                                                Read more
                                            </button>
                                        </div>
                                    </div>
                                    <div class="card-footer bg-transparent border-0 pt-0" :class="isCompactView ? 'px-3 pb-3' : 'px-4 pb-4'">
                                        <div class="card-meta-grid">
                                            <div class="card-meta-item">
                                                <i class="bi bi-person-circle" aria-hidden="true"></i>
                                                <span>Published by {{ getCardPublisher(item) }}</span>
                                            </div>
                                            <div class="card-meta-item">
                                                <i class="bi bi-calendar3" aria-hidden="true"></i>
                                                <span>{{ item.dateLabel }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <div
                            v-if="!loadingInitial && !error && hasMoreItems"
                            ref="loadMoreSentinel"
                            class="library-scroll-sentinel"
                            aria-hidden="true"
                        >
                            <div v-if="isLoadingMoreActive" class="scroll-sentinel-state">
                                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span>Loading more material</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="modal fade"
            id="islamicLibraryModal"
            ref="detailModal"
            tabindex="-1"
            aria-labelledby="islamicLibraryModalTitle"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down library-modal-dialog"
                :class="{ 'library-modal-dialog--pdf': isActivePdf }"
            >
                <div class="modal-content shadow-lg border-0">
                    <button type="button" class="btn-close library-modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="reader-progress-track" aria-hidden="true">
                        <span class="reader-progress-fill" :style="{ width: `${readerProgress}%` }"></span>
                    </div>
                    <div v-if="activeItem" class="modal-header border-0 pb-0 px-3 px-md-4 pt-3 pt-md-4">
                        <div class="pe-3 modal-head-copy">
                            <div class="modal-title-row">
                                <h2
                                    id="islamicLibraryModalTitle"
                                    class="modal-title h4 fw-semibold mb-0"
                                    v-html="highlightText(activeItem.title)"
                                ></h2>
                            </div>
                            <div class="modal-title-meta">
                                <span
                                    class="verified-badge"
                                    title="Content sourced from authenticated Islamic scholars via IslamHouse"
                                >
                                    <i class="bi bi-patch-check-fill" aria-hidden="true"></i>
                                    <span>Scholarly Verified</span>
                                </span>
                            </div>
                            <div class="metrics-pills">
                                <span class="metric-pill">
                                    <i class="bi bi-clock-history" aria-hidden="true"></i>
                                    <span>{{ activeReadMinutes }} min read</span>
                                </span>
                                <span class="metric-pill">
                                    <i class="bi bi-headphones" aria-hidden="true"></i>
                                    <span>{{ activeListenMinutes }} min listen</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div v-if="activeItem" class="modal-body px-3 px-md-4 pb-3 pb-md-4 pt-3">
                        <div class="reader-toolbar reader-toolbar--primary shadow-sm">
                            <button
                                type="button"
                                class="reader-tool-btn"
                                :class="{ 'is-active': showSummary }"
                                @click="toggleSummary"
                                aria-label="Toggle AI summary"
                            >
                                <i class="bi bi-stars" aria-hidden="true"></i>
                                <span>Summary</span>
                            </button>
                            <button
                                type="button"
                                class="reader-tool-btn"
                                :class="{ 'is-active': showAudioPanel }"
                                @click="toggleAudioPanel"
                                aria-label="Open audio reader settings"
                            >
                                <i class="bi bi-headphones" aria-hidden="true"></i>
                                <span>Listen</span>
                            </button>
                            <button
                                type="button"
                                class="reader-tool-btn reader-tool-btn--save"
                                :class="{ 'is-active': isActiveItemSaved }"
                                @click="toggleSavedItem"
                                :aria-label="isActiveItemSaved ? 'Remove saved item' : 'Save this item'"
                            >
                                <i class="bi" :class="isActiveItemSaved ? 'bi-bookmark-fill' : 'bi-bookmark'" aria-hidden="true"></i>
                                <span>{{ isActiveItemSaved ? "Saved" : "Save" }}</span>
                            </button>
                        </div>

                        <div v-if="showAudioPanel && speechSupported" class="audio-settings-panel shadow-sm">
                            <div class="audio-settings-panel-grid">
                                <div class="audio-setting">
                                    <label for="voiceSelect" class="audio-setting-label">Voice</label>
                                    <select id="voiceSelect" v-model="speech.selectedVoiceURI" class="audio-setting-select" @change="restartSpeechIfActive">
                                        <option v-for="voice in availableVoices" :key="voice.voiceURI" :value="voice.voiceURI">
                                            {{ voice.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="audio-setting">
                                    <label for="speedSelect" class="audio-setting-label">Speed</label>
                                    <select id="speedSelect" v-model.number="speech.rate" class="audio-setting-select" @change="restartSpeechIfActive">
                                        <option v-for="speed in speechRates" :key="speed.value" :value="speed.value">{{ speed.label }}</option>
                                    </select>
                                </div>
                                <div class="audio-state-chip" :class="{ 'is-speaking': speech.isSpeaking && !speech.isPaused }">
                                    <span class="audio-state-pulse" aria-hidden="true"></span>
                                    <i class="bi bi-mic-fill" aria-hidden="true"></i>
                                    <span>{{ speech.isSpeaking ? (speech.isPaused ? "Paused" : "Reading aloud") : "Ready to read" }}</span>
                                </div>
                            </div>
                        </div>

                        <section class="reader-shell mt-3">
                            <div class="reader-surface shadow-sm" :class="{ 'reader-surface--pdf': isActivePdf }">
                                <div v-if="showReaderSourceLink" class="reader-surface-actions">
                                    <a
                                        :href="activeItem.sourceUrl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="continue-link"
                                    >
                                        {{ isPdfCard(activeItem) ? "Open PDF source" : "Open original source" }}
                                        <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                    </a>
                                </div>

                                <div v-if="detailLoading" class="reader-state py-5 text-center">
                                    <div class="spinner-border text-primary mb-3" aria-hidden="true"></div>
                                    <div>Loading the full text...</div>
                                </div>

                                <div v-else-if="detailError" class="reader-inline-alert alert alert-warning border-0 shadow-sm mb-0 mx-3 mx-md-4">
                                    {{ detailError }}
                                </div>

                                <div
                                    v-else-if="activeRenderedContentHtml"
                                    ref="readerContent"
                                    class="reader-content"
                                    :class="{ 'reader-content--pdf': isActivePdf }"
                                    :style="{ fontSize: contentFontSize + 'px' }"
                                    v-html="activeRenderedContentHtml"
                                ></div>

                                <div v-else class="reader-empty-state">
                                    The full text is not available in a readable format for this item.
                                </div>
                            </div>
                        </section>

                        <div v-if="showSummary" class="reader-panel shadow-sm">
                            <div class="summary-head d-flex justify-content-between align-items-start gap-3 mb-3">
                                <div>
                                    <div class="summary-kicker">AI summary</div>
                                    <h3 class="h6 fw-semibold mb-1">Quick overview of the article</h3>
                                    <p class="small text-muted mb-0">AI-generated summary. Verify with the original text.</p>
                                </div>
                                <div class="summary-actions">
                                    <button
                                        v-if="!activeItem.aiSummary"
                                        type="button"
                                        class="summary-generate-btn"
                                        @click="generateSummary"
                                        :disabled="detailLoading || !activeItem.contentText"
                                    >
                                        Generate
                                    </button>
                                    <button
                                        type="button"
                                        class="summary-collapse-btn"
                                        @click="toggleSummary"
                                        aria-label="Minimize AI summary"
                                    >
                                        <i class="bi bi-chevron-up" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div v-if="activeItem.aiSummary">
                                <p class="summary-overview mb-3">{{ activeItem.aiSummary.overview }}</p>
                                <ul class="summary-points mb-0">
                                    <li v-for="(point, index) in activeItem.aiSummary.points" :key="'summary-' + index">{{ point }}</li>
                                </ul>
                            </div>
                            <p v-else class="small text-muted mb-0">No summary has been generated yet.</p>
                        </div>

                        <div class="team-box shadow-sm" :class="{ 'is-collapsed': !teamInsightExpanded }">
                            <button type="button" class="team-box-head" @click="toggleTeamInsight">
                                <span class="team-box-title">
                                    <i class="bi bi-heart-fill" aria-hidden="true"></i>
                                    <span>From the Islamic Connect Team</span>
                                </span>
                                <i class="bi" :class="teamInsightExpanded ? 'bi-chevron-up' : 'bi-chevron-down'" aria-hidden="true"></i>
                            </button>
                            <div v-if="teamInsightExpanded" class="team-box-body">
                                <p
                                    v-for="(line, index) in activeTeamReflection"
                                    :key="`team-line-${index}`"
                                    class="mb-0"
                                >
                                    {{ line }}
                                </p>
                            </div>
                        </div>

                        <section v-if="relatedItems.length" class="related-content-section mt-3">
                            <div class="related-content-head">
                                <h3 class="related-content-title mb-0">
                                    <i class="bi bi-heart-fill" aria-hidden="true"></i>
                                    <span>You May Also Like</span>
                                </h3>
                            </div>
                            <div class="row g-3 mt-0">
                                <div v-for="related in relatedItems" :key="`related-${related.key}`" class="col-12 col-md-6">
                                    <article class="related-card shadow-sm">
                                        <div class="related-card-body">
                                            <span class="related-card-chip">{{ getCardChipLabel(related) }}</span>
                                            <h4 class="related-card-title mb-1">{{ truncateText(related.title, 60) }}</h4>
                                            <p class="related-card-copy mb-0">{{ truncateText(getCardExcerpt(related), 100) }}</p>
                                            <button type="button" class="continue-link continue-link--inline mt-2" @click="openItem(related)">
                                                Read More
                                            </button>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showAudioPanel && activeItem" class="audio-dock shadow-sm">
            <div class="audio-dock-bar" :class="{ 'audio-dock-bar--active': speech.isSpeaking && !speech.isPaused }">
                <div class="audio-meta">
                    <div class="audio-title">{{ activeItem.title }}</div>
                    <div class="audio-subtitle">{{ activeItem.typeLabel }} reader</div>
                </div>

                <template v-if="speechSupported">
                    <div class="audio-main-controls">
                        <div class="audio-controls-cluster">
                            <button type="button" class="audio-bar-btn" @click="skipSpeechBackward" aria-label="Previous section">
                                <i class="bi bi-skip-backward-fill" aria-hidden="true"></i>
                            </button>
                            <button
                                type="button"
                                class="audio-bar-btn"
                                @click="speech.isSpeaking && !speech.isPaused ? pauseSpeech() : playSpeech()"
                                :aria-label="speech.isSpeaking && !speech.isPaused ? 'Pause audio' : 'Play audio'"
                            >
                                <i class="bi" :class="speech.isSpeaking && !speech.isPaused ? 'bi-pause-fill' : 'bi-play-fill'" aria-hidden="true"></i>
                            </button>
                            <button type="button" class="audio-bar-btn" @click="skipSpeechForward" aria-label="Next section">
                                <i class="bi bi-skip-forward-fill" aria-hidden="true"></i>
                            </button>
                            <button type="button" class="audio-bar-btn" @click="stopSpeech" aria-label="Stop audio">
                                <i class="bi bi-stop-fill" aria-hidden="true"></i>
                            </button>
                        </div>

                        <div class="audio-progress-inline">
                            <input
                                id="audioProgress"
                                type="range"
                                class="form-range audio-progress-range"
                                min="0"
                                max="100"
                                step="1"
                                :value="speech.progressPercent"
                                @change="seekSpeech"
                                :aria-label="`Playback progress ${formatDuration(speech.elapsedSeconds)} of ${formatDuration(speech.totalSeconds)}`"
                            >
                        </div>
                    </div>

                    <div class="audio-side-controls">
                        <div class="audio-time">{{ formatDuration(speech.elapsedSeconds) }} / {{ formatDuration(speech.totalSeconds) }}</div>
                        <div class="audio-volume">
                            <i class="bi bi-volume-up-fill" aria-hidden="true"></i>
                            <input
                                type="range"
                                class="form-range audio-volume-range"
                                min="0"
                                max="1"
                                step="0.05"
                                :value="speech.volume"
                                @input="updateSpeechVolume"
                                aria-label="Volume"
                            >
                        </div>
                    </div>

                    <button type="button" class="audio-dock-close" @click="showAudioPanel = false" aria-label="Close audio reader">
                        <i class="bi bi-x-lg" aria-hidden="true"></i>
                    </button>
                </template>

                <div v-else class="audio-unsupported">
                    Speech synthesis is not supported in this browser.
                </div>
            </div>
        </div>

        <button
            v-if="showScrollTopFab"
            type="button"
            class="scroll-top-fab"
            aria-label="Scroll back to top"
            @click="scrollToTop"
        >
            <i class="bi bi-arrow-up" aria-hidden="true"></i>
        </button>

        <div v-if="toast.show" class="library-toast" :class="`is-${toast.variant}`" role="status" aria-live="polite">
            {{ toast.message }}
        </div>
    </section>
</template>

<script>
import { Modal } from "bootstrap";
import LibrarySearchControls from "./islamic_library/LibrarySearchControls.vue";

export default {
    name: "IslamicBlogComponent",
    components: {
        LibrarySearchControls,
    },
    inject: {
        darkModeState: {
            default: null,
        },
    },
    data() {
        return {
            baseUrl: "https://islamhouse.com/en",
            typeOptions: [
                { value: "all", label: "All types" },
                { value: "articles", label: "Articles" },
                { value: "fatwa", label: "Fatawa" },
                { value: "books", label: "Books" },
            ],
            searchQuery: "",
            activeType: "all",
            sortBy: "newest",
            cardDensity: "comfortable",
            activeCollectionId: null,
            collectionsCollapsed: false,
            savedItemKeys: [],
            items: [],
            loadingInitial: true,
            loadMoreBusy: false,
            error: "",
            pages: {
                articles: 1,
                fatwa: 1,
                books: 1,
            },
            maxPages: {
                articles: 1,
                fatwa: 1,
                books: 1,
            },
            activeItem: null,
            detailLoading: false,
            detailError: "",
            modalInstance: null,
            contentFontSize: 16,
            readerProgress: 0,
            showSummary: false,
            showAudioPanel: false,
            teamInsightExpanded: false,
            toast: {
                show: false,
                message: "",
                variant: "success",
            },
            speechSupported: false,
            voiceGroups: { male: [], female: [], other: [] },
            speechRates: [
                { label: "0.5x", value: 0.5 },
                { label: "0.75x", value: 0.75 },
                { label: "1x", value: 1 },
                { label: "1.25x", value: 1.25 },
                { label: "1.5x", value: 1.5 },
                { label: "2x", value: 2 },
            ],
            collectionDefinitions: [
                {
                    id: "ramadan",
                    title: "Ramadan",
                    icon: "bi-moon-stars-fill",
                    description: "Fasting, worship, patience, and spiritual reset for Ramadan and beyond.",
                    query: "Ramadan",
                    tags: ["Fasting", "Night prayer", "Mercy"],
                    keywords: ["ramadan", "fasting", "fast", "iftar", "suhoor", "taraweeh", "laylat", "eid"],
                },
                {
                    id: "marriage",
                    title: "Marriage",
                    icon: "bi-heart-fill",
                    description: "Guidance on family life, rights, character, and building a healthy Muslim home.",
                    query: "Marriage",
                    tags: ["Family", "Rights", "Character"],
                    keywords: ["marriage", "wife", "husband", "spouse", "family", "divorce", "nikah", "home"],
                },
                {
                    id: "aqeedah",
                    title: "Aqeedah",
                    icon: "bi-journal-bookmark-fill",
                    description: "Core Islamic belief, tawhid, the names of Allah, and sound creed.",
                    query: "Aqeedah",
                    tags: ["Tawhid", "Belief", "Creed"],
                    keywords: ["aqeedah", "creed", "tawhid", "belief", "allah", "shirk", "faith", "iman"],
                },
                {
                    id: "women",
                    title: "Women",
                    icon: "bi-person-hearts",
                    description: "Topics focused on women, dignity, worship, family, and practical questions.",
                    query: "Women",
                    tags: ["Women", "Modesty", "Family"],
                    keywords: ["women", "woman", "female", "sister", "hijab", "mother", "mary", "wives"],
                },
                {
                    id: "prayer",
                    title: "Prayer",
                    icon: "bi-alarm-fill",
                    description: "Prayer, khushu, adhkar, and practical guidance around salah.",
                    query: "Prayer",
                    tags: ["Salah", "Khushu", "Adhkar"],
                    keywords: ["prayer", "salah", "adhan", "wudu", "khushu", "mosque", "fajr", "dua"],
                },
                {
                    id: "seerah",
                    title: "Seerah",
                    icon: "bi-book-fill",
                    description: "The life of the Prophet, key moments, and lessons from the seerah.",
                    query: "Seerah",
                    tags: ["Prophet", "History", "Lessons"],
                    keywords: ["seerah", "prophet", "muhammad", "madinah", "mecca", "hijrah", "companions"],
                },
                {
                    id: "quran",
                    title: "Quran",
                    icon: "bi-journal-richtext",
                    description: "Tafsir, Quranic themes, reflection, and guidance from revelation.",
                    query: "Quran",
                    tags: ["Tafsir", "Reflection", "Revelation"],
                    keywords: ["quran", "tafsir", "surah", "ayah", "verses", "revelation", "recitation"],
                },
                {
                    id: "character",
                    title: "Character",
                    icon: "bi-flower1",
                    description: "Patience, sincerity, gratitude, and purification of character.",
                    query: "Character",
                    tags: ["Patience", "Sincerity", "Manners"],
                    keywords: ["character", "manners", "patience", "gratitude", "sincerity", "heart", "akhlaq"],
                },
                {
                    id: "new-muslims",
                    title: "New Muslims",
                    icon: "bi-compass-fill",
                    description: "Foundational guidance and practical help for those new to Islam.",
                    query: "New Muslims",
                    tags: ["Basics", "Guidance", "Faith"],
                    keywords: ["new muslim", "revert", "convert", "basics", "beginner", "islam", "faith"],
                },
                {
                    id: "hajj-umrah",
                    title: "Hajj & Umrah",
                    icon: "bi-geo-alt-fill",
                    description: "Pilgrimage guidance, preparation, and rites for Hajj and Umrah.",
                    query: "Umrah",
                    tags: ["Pilgrimage", "Rites", "Travel"],
                    keywords: ["hajj", "umrah", "pilgrimage", "mecca", "ihram", "tawaf", "sa'i"],
                },
            ],
            speech: {
                allVoices: [],
                selectedVoiceURI: "",
                rate: 1,
                volume: 0.75,
                isSpeaking: false,
                isPaused: false,
                currentSentenceIndex: 0,
                elapsedSeconds: 0,
                totalSeconds: 0,
                progressPercent: 0,
                sentenceDurations: [],
                intervalId: null,
                sentenceStartedAt: 0,
                baseElapsedBeforeSentence: 0,
                pausedSentenceElapsed: 0,
                stopRequested: false,
            },
            loadMoreObserver: null,
            showScrollTopFab: false,
            previewHydrationQueue: [],
            previewHydrationActiveCount: 0,
            previewHydrationKeys: {},
            toastTimeoutId: null,
        };
    },
    computed: {
        isDarkMode() {
            return !!(this.darkModeState && this.darkModeState.isDarkMode);
        },
        availableVoices() {
            return [
                ...this.voiceGroups.female,
                ...this.voiceGroups.male,
                ...this.voiceGroups.other,
            ];
        },
        isCompactView() {
            return this.cardDensity === "compact";
        },
        isActiveItemSaved() {
            return !!(this.activeItem && this.savedItemKeys.includes(this.activeItem.key));
        },
        isActivePdf() {
            return this.isPdfCard(this.activeItem);
        },
        showReaderSourceLink() {
            if (!this.activeItem || !this.activeItem.sourceUrl) {
                return false;
            }

            return this.isActivePdf || !!this.detailError || !this.activeRenderedContentHtml;
        },
        activeRenderedContentHtml() {
            if (!this.activeItem) {
                return "";
            }

            const baseHtml =
                this.activeItem.contentHtml ||
                this.plainTextToHtml(this.activeItem.contentText || "");
            if (!baseHtml) {
                return "";
            }

            const highlighted = this.highlightHtmlContent(baseHtml, this.searchQuery);
            return highlighted || baseHtml;
        },
        activeWordCount() {
            return this.countWords(this.activeItem && this.activeItem.contentText);
        },
        activeReadMinutes() {
            return this.calculateEstimatedMinutes(this.activeWordCount, 200);
        },
        activeListenMinutes() {
            return this.calculateEstimatedMinutes(this.activeWordCount, 150);
        },
        activeTeamReflection() {
            return this.buildTeamReflection(this.activeItem);
        },
        popularSearches() {
            return ["Ramadan", "Prayer", "Marriage", "Aqeedah", "Women", "Tawhid"];
        },
        trendingTopics() {
            const scores = {};
            this.items
                .slice()
                .sort((left, right) => right.sortTimestamp - left.sortTimestamp)
                .slice(0, 48)
                .forEach((item, index) => {
                    const weight = Math.max(1, 12 - Math.floor(index / 4));
                    this.extractKeywords(`${item.title} ${item.summary || ""}`)
                        .filter((keyword) => keyword.length >= 5)
                        .slice(0, 6)
                        .forEach((keyword) => {
                            scores[keyword] = (scores[keyword] || 0) + weight;
                        });
                });

            return Object.entries(scores)
                .sort((left, right) => right[1] - left[1])
                .slice(0, 6)
                .map(([keyword]) => this.formatTopicLabel(keyword));
        },
        searchSuggestions() {
            const query = this.cleanText(this.searchQuery).toLowerCase();
            if (query.length < 2) {
                return [];
            }

            const suggestions = [];
            const seen = new Set();

            this.items.forEach((item) => {
                if (suggestions.length >= 6) {
                    return;
                }

                const haystack = `${item.title} ${item.summary || ""} ${item.publishedBy || ""}`.toLowerCase();
                if (!haystack.includes(query)) {
                    return;
                }

                if (!seen.has(item.title)) {
                    suggestions.push({
                        label: item.title,
                        meta: item.typeLabel,
                        kind: "item",
                    });
                    seen.add(item.title);
                }
            });

            this.collectionDefinitions.forEach((collection) => {
                if (suggestions.length >= 8) {
                    return;
                }

                if ((collection.title.toLowerCase().includes(query) || collection.keywords.some((keyword) => keyword.includes(query))) && !seen.has(collection.title)) {
                    suggestions.push({
                        label: collection.title,
                        meta: "Collection",
                        kind: "collection",
                    });
                    seen.add(collection.title);
                }
            });

            return suggestions;
        },
        collectionSections() {
            return this.collectionDefinitions.map((collection) => {
                const items = this.items
                    .filter((item) => this.matchesCollection(item, collection))
                    .sort((left, right) => right.sortTimestamp - left.sortTimestamp)
                    .slice(0, 4);

                return {
                    ...collection,
                    count: this.items.filter((item) => this.matchesCollection(item, collection)).length,
                    items,
                };
            });
        },
        relatedItems() {
            if (!this.activeItem) {
                return [];
            }

            const activeCategory = this.getRelatedCategory(this.activeItem);
            const keywordSet = new Set(this.extractKeywords(this.activeItem.title));
            const activeTags = new Set(this.getItemTags(this.activeItem));
            return this.items
                .filter((item) => item && this.activeItem && item.key !== this.activeItem.key)
                .map((item) => {
                    let score = 0;
                    if (this.getRelatedCategory(item) === activeCategory) {
                        score += 48;
                    }

                    const relatedKeywords = this.extractKeywords(item.title);
                    const matches = relatedKeywords.filter((keyword) => keywordSet.has(keyword));
                    score += matches.length * 10;

                    const tagMatches = this.getItemTags(item).filter((tag) => activeTags.has(tag));
                    score += Math.min(20, tagMatches.length * 4);

                    if (item.summary && this.activeItem.summary) {
                        const summaryMatches = this.extractKeywords(item.summary).filter((keyword) => keywordSet.has(keyword));
                        score += Math.min(12, summaryMatches.length * 2);
                    }

                    score += Math.max(0, 8 - Math.abs((item.sortTimestamp || 0) - (this.activeItem.sortTimestamp || 0)) / 86400000 / 30);

                    return { item, score };
                })
                .sort((left, right) => right.score - left.score)
                .slice(0, 4)
                .map((entry) => entry.item);
        },
        filteredItems() {
            const query = this.searchQuery.toLowerCase();
            const activeCollection = this.collectionDefinitions.find((collection) => collection.id === this.activeCollectionId) || null;

            return this.items
                .filter((item) => {
                    if (this.activeType !== "all" && item.type !== this.activeType) {
                        return false;
                    }

                     if (activeCollection && !this.matchesCollection(item, activeCollection)) {
                        return false;
                    }

                    if (!query) {
                        return true;
                    }

                    return [item.title, item.summary, item.typeLabel, item.publishedBy]
                        .join(" ")
                        .toLowerCase()
                        .includes(query);
                })
                .sort((left, right) => {
                    if (this.sortBy === "oldest") {
                        return left.sortTimestamp - right.sortTimestamp;
                    }

                    if (this.sortBy === "title") {
                        return left.title.localeCompare(right.title);
                    }

                    return right.sortTimestamp - left.sortTimestamp;
                });
        },
        hasMoreItems() {
            return this.getTypesToLoad().some((type) => this.pages[type] < this.maxPages[type]);
        },
        isLoadMoreDisabled() {
            return this.loadMoreBusy || !this.getTypesToLoad().some((type) => this.pages[type] < this.maxPages[type]);
        },
        isLoadingMoreActive() {
            return this.loadMoreBusy;
        },
        loadMoreLabel() {
            if (this.loadMoreBusy) {
                return "Loading more";
            }

            return this.isLoadMoreDisabled ? "No more items" : "Load more";
        },
    },
    watch: {
        filteredItems: {
            handler(items) {
                this.queuePreviewHydration((items || []).filter((item) => this.shouldHydratePreview(item)));
                this.observeLoadMoreSentinel();
            },
            deep: false,
        },
        activeRenderedContentHtml() {
            this.$nextTick(() => {
                this.bindReaderScroll();
                this.applyCurrentSentenceHighlight();
            });
        },
        "speech.currentSentenceIndex"() {
            this.$nextTick(() => this.applyCurrentSentenceHighlight());
        },
        "speech.isSpeaking"(isSpeaking) {
            if (!isSpeaking) {
                this.clearCurrentSentenceHighlight();
                return;
            }
            this.$nextTick(() => this.applyCurrentSentenceHighlight());
        },
    },
    mounted() {
        this.speechSupported =
            typeof window !== "undefined" &&
            "speechSynthesis" in window &&
            typeof window.SpeechSynthesisUtterance !== "undefined";
        this.loadSavedItems();
        this.initializeModal();
        this.initializeInfiniteScroll();
        this.loadVoices();
        this.loadInitial();
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", this.handleWindowScroll, { passive: true });
            this.handleWindowScroll();
        }
    },
    beforeUnmount() {
        this.stopSpeech();
        if (this.loadMoreObserver) {
            this.loadMoreObserver.disconnect();
        }
        if (typeof window !== "undefined") {
            window.removeEventListener("scroll", this.handleWindowScroll);
        }
        if (this.toastTimeoutId) {
            clearTimeout(this.toastTimeoutId);
        }
    },
    methods: {
        handleSearchQueryUpdate(value) {
            this.searchQuery = value;

            const activeCollection = this.collectionDefinitions.find((collection) => collection.id === this.activeCollectionId);
            if (!activeCollection) {
                return;
            }

            if (this.cleanText(value).toLowerCase() !== activeCollection.query.toLowerCase()) {
                this.activeCollectionId = null;
            }
        },
        applySearchTerm(term) {
            const nextTerm = this.cleanText(term);
            this.searchQuery = nextTerm;
            const matchingCollection = this.collectionDefinitions.find((collection) => collection.title.toLowerCase() === nextTerm.toLowerCase());
            this.activeCollectionId = matchingCollection ? matchingCollection.id : null;
        },
        activateCollection(collection) {
            if (!collection) {
                return;
            }

            if (this.activeCollectionId === collection.id) {
                this.activeCollectionId = null;
                this.searchQuery = "";
                return;
            }

            this.activeCollectionId = collection.id;
            this.searchQuery = collection.query;
            this.activeType = "all";
        },
        clearActiveCollection() {
            this.activeCollectionId = null;
            this.searchQuery = "";
        },
        initializeInfiniteScroll() {
            if (typeof window === "undefined" || typeof window.IntersectionObserver === "undefined") {
                return;
            }

            this.loadMoreObserver = new window.IntersectionObserver(
                (entries) => {
                    const shouldLoad = entries.some((entry) => entry.isIntersecting);
                    if (!shouldLoad || this.loadingInitial || this.error || this.isLoadMoreDisabled) {
                        return;
                    }

                    this.loadMore();
                },
                {
                    rootMargin: "720px 0px 720px 0px",
                }
            );
        },
        observeLoadMoreSentinel() {
            this.$nextTick(() => {
                if (!this.loadMoreObserver) {
                    return;
                }

                this.loadMoreObserver.disconnect();
                if (this.$refs.loadMoreSentinel) {
                    this.loadMoreObserver.observe(this.$refs.loadMoreSentinel);
                }
            });
        },
        handleWindowScroll() {
            if (typeof window === "undefined" || typeof document === "undefined") {
                return;
            }

            const maxScroll = Math.max(
                1,
                document.documentElement.scrollHeight - window.innerHeight
            );
            const progress = window.scrollY / maxScroll;
            this.showScrollTopFab = progress >= 0.3;
        },
        scrollToTop() {
            if (typeof window === "undefined") {
                return;
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        initializeModal() {
            this.$nextTick(() => {
                if (!this.$refs.detailModal) {
                    return;
                }

                this.modalInstance = new Modal(this.$refs.detailModal);
                this.$refs.detailModal.addEventListener("shown.bs.modal", () => {
                    this.bindReaderScroll();
                    this.applyCurrentSentenceHighlight();
                });
                this.$refs.detailModal.addEventListener("hidden.bs.modal", () => {
                    this.stopSpeech();
                    this.showSummary = false;
                    this.showAudioPanel = false;
                    this.readerProgress = 0;
                    this.detailError = "";
                });
            });
        },
        getTypesToLoad() {
            if (this.activeType !== "all") {
                return [this.activeType];
            }

            return ["articles", "fatwa", "books"];
        },
        async loadInitial() {
            this.loadingInitial = true;
            this.error = "";
            this.items = [];
            this.pages = { articles: 1, fatwa: 1, books: 1 };

            try {
                const results = await Promise.all([
                    this.fetchTypePage("articles", 1),
                    this.fetchTypePage("fatwa", 1),
                    this.fetchTypePage("books", 1),
                ]);

                this.items = this.mergeItems([], results.flatMap((result) => result.items));
                this.maxPages.articles = results[0].maxPages;
                this.maxPages.fatwa = results[1].maxPages;
                this.maxPages.books = results[2].maxPages;
                this.queuePreviewHydration(this.items);
            } catch (error) {
                this.error = error.message || "The IslamHouse library pages could not be loaded.";
            } finally {
                this.loadingInitial = false;
                this.observeLoadMoreSentinel();
            }
        },
        async loadMore() {
            const targets = this.getTypesToLoad().filter((type) => this.pages[type] < this.maxPages[type]);
            if (!targets.length || this.loadMoreBusy) {
                return;
            }

            this.loadMoreBusy = true;

            try {
                const results = await Promise.all(
                    targets.map((type) => this.fetchTypePage(type, this.pages[type] + 1))
                );

                results.forEach((result, index) => {
                    const type = targets[index];
                    this.pages[type] += 1;
                    this.maxPages[type] = result.maxPages;
                    this.items = this.mergeItems(this.items, result.items);
                    this.queuePreviewHydration(result.items);
                });
            } catch (error) {
                this.error = error.message || "Additional items could not be loaded.";
            } finally {
                this.loadMoreBusy = false;
                this.observeLoadMoreSentinel();
            }
        },
        queuePreviewHydration(items) {
            items
                .filter((item) => item && this.shouldHydratePreview(item))
                .forEach((item) => {
                    if (this.previewHydrationKeys[item.key]) {
                        return;
                    }
                    this.previewHydrationKeys[item.key] = true;
                    this.previewHydrationQueue.push(item);
                });

            this.processPreviewHydrationQueue();
        },
        shouldHydratePreview(item) {
            return !this.normalizeOverviewText(item.summary, item.title) || !this.cleanText(item.publishedBy);
        },
        async processPreviewHydrationQueue() {
            const maxConcurrent = 4;
            if (this.previewHydrationActiveCount >= maxConcurrent || !this.previewHydrationQueue.length) {
                return;
            }

            while (this.previewHydrationActiveCount < maxConcurrent && this.previewHydrationQueue.length) {
                const item = this.previewHydrationQueue.shift();
                if (!item) {
                    continue;
                }

                this.previewHydrationActiveCount += 1;
                this.fetchItemPreview(item)
                    .then((preview) => {
                        const merged = {
                            ...item,
                            summary: preview.summary || item.summary,
                            publishedBy: preview.publishedBy || item.publishedBy,
                            sourceUrl: preview.sourceUrl || item.sourceUrl,
                            hasPdf: typeof preview.hasPdf === "boolean" ? preview.hasPdf : item.hasPdf,
                            formatLabel: preview.formatLabel || item.formatLabel,
                        };
                        this.items = this.mergeItems(this.items, [merged]);
                    })
                    .catch(() => {})
                    .finally(() => {
                        this.previewHydrationActiveCount = Math.max(0, this.previewHydrationActiveCount - 1);
                        this.processPreviewHydrationQueue();
                    });
            }
        },
        buildListUrl(type, page) {
            return `${this.baseUrl}/${type}/en/${page}`;
        },
        async fetchTypePage(type, page) {
            const html = await this.fetchTextWithCache(
                this.buildListUrl(type, page),
                `islamhouse-list-${type}-${page}`
            );
            return this.parseListingHtml(html, type, page);
        },
        async fetchTextWithCache(url, cacheKey) {
            const cached = this.readCache(cacheKey);
            if (cached) {
                return cached;
            }

            const response = await fetch(url, {
                headers: { Accept: "text/html" },
            });

            if (!response.ok) {
                throw new Error(`IslamHouse returned ${response.status} for ${url}`);
            }

            const text = await response.text();
            this.writeCache(cacheKey, text);
            return text;
        },
        parseListingHtml(html, type, page) {
            const doc = new DOMParser().parseFromString(html, "text/html");
            const links = Array.from(doc.querySelectorAll(`h3.media-heading a[href*="/en/${type}/"]`));

            const items = links
                .map((link, index) => {
                    const body = link.closest(".media-body");
                    if (!body) {
                        return null;
                    }

                    const title = this.cleanText(link.textContent);
                    const href = link.getAttribute("href") || "";
                    const absoluteUrl = href.startsWith("http") ? href : `https://islamhouse.com${href}`;
                    const id = this.extractIdFromUrl(href);
                    const metaInfo = body.querySelector(".meta-info");
                    const timeNode = metaInfo ? metaInfo.querySelector("time") : null;
                    const detailsRow = body.querySelector(".row.author");
                    const summaryNode = detailsRow ? detailsRow.querySelector("p.lead") : null;
                    const contributorNode = detailsRow ? detailsRow.querySelector("em a") : null;
                    const rawDate = this.cleanText(timeNode ? timeNode.textContent : "");
                    const parsedDate = this.parseListingDate(rawDate);

                    return {
                        key: `${type}-${id || index}-${page}`,
                        id,
                        type,
                        typeLabel: type === "fatwa" ? "Fatwa" : type.charAt(0).toUpperCase() + type.slice(1, -1),
                        category: type === "fatwa" ? "Fatwa" : type.charAt(0).toUpperCase() + type.slice(1, -1),
                        title,
                        url: absoluteUrl,
                        sourceUrl: absoluteUrl,
                        summary: this.normalizeOverviewText(summaryNode ? summaryNode.textContent : "", title),
                        publishedBy: this.cleanText(contributorNode ? contributorNode.textContent : ""),
                        formatLabel: this.cleanText(metaInfo ? metaInfo.querySelector(".badge strong, .badge b, .badge")?.textContent : ""),
                        hasPdf: /pdf/i.test(this.cleanText(metaInfo ? metaInfo.querySelector(".badge strong, .badge b, .badge")?.textContent : "")),
                        dateLabel: parsedDate.label || "Date unavailable",
                        sortTimestamp: parsedDate.timestamp,
                        page,
                        readerReady: type !== "books",
                        detailLoaded: false,
                        contentHtml: "",
                        contentText: "",
                        speechSentences: [],
                        tags: this.extractKeywords(`${title} ${summaryNode ? summaryNode.textContent : ""}`),
                        aiSummary: null,
                    };
                })
                .filter(Boolean);

            const pageNumbers = Array.from(doc.querySelectorAll(".pagination a"))
                .map((node) => Number.parseInt(this.cleanText(node.textContent), 10))
                .filter((value) => Number.isFinite(value));

            return {
                items,
                maxPages: pageNumbers.length ? Math.max(...pageNumbers) : page,
            };
        },
        mergeItems(current, incoming) {
            const map = new Map();
            current.forEach((item) => map.set(item.key, item));
            incoming.forEach((item) => {
                const previous = map.get(item.key) || {};
                map.set(item.key, { ...previous, ...item });
            });
            return Array.from(map.values());
        },
        extractIdFromUrl(url) {
            const match = String(url).match(/\/(\d+)\/?$/);
            return match ? match[1] : "";
        },
        parseListingDate(rawDate) {
            const match = String(rawDate).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (!match) {
                return { timestamp: 0, label: "" };
            }

            const day = Number.parseInt(match[1], 10);
            const month = Number.parseInt(match[2], 10) - 1;
            const year = Number.parseInt(match[3], 10);
            const date = new Date(year, month, day);
            return {
                timestamp: date.getTime(),
                label: new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }).format(date),
            };
        },
        buildItemKey(item) {
            if (!item) {
                return "";
            }

            return String(item.key || `${item.type || "item"}-${item.id || item.sourceUrl || item.url || item.title}`);
        },
        cleanText(value) {
            return String(value || "").replace(/\s+/g, " ").replace(/\u00a0/g, " ").trim();
        },
        stripSpeakerCredits(value) {
            return String(value || "")
                .replace(/\b(narrated by|said by|presented by|translated by|reviewed by|prepared by|speaker|lecturer|voice over|recited by)\b[^.:\n]*(?:[.:\n]|$)/gi, " ")
                .replace(/\b(shaykh|sheikh|ustadh|imam|dr\.)\s+[A-Z][A-Za-z' -]+/g, " ")
                .replace(/\S+@\S+\.\S+/g, " ")
                .replace(/www\.[^\s]+/gi, " ")
                .replace(/\s{2,}/g, " ")
                .trim();
        },
        cleanMultilineText(value) {
            return String(value || "")
                .replace(/\u00a0/g, " ")
                .replace(/\r\n/g, "\n")
                .replace(/[ \t]+\n/g, "\n")
                .replace(/\n{3,}/g, "\n\n")
                .replace(/[ \t]{2,}/g, " ")
                .trim();
        },
        normalizeOverviewText(value, title = "") {
            let text = this.cleanText(this.stripSpeakerCredits(value));
            if (!text) {
                return "";
            }

            if (title) {
                const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                text = text.replace(new RegExp(`^${escapedTitle}\\s*`, "i"), "");
            }

            return text
                .replace(/^description\s*/i, "")
                .replace(/^[\s:;.,-]+/, "")
                .replace(/\s+/g, " ")
                .trim();
        },
        countWords(value) {
            const text = this.cleanText(this.stripSpeakerCredits(value));
            if (!text) {
                return 0;
            }

            return text.split(/\s+/).filter(Boolean).length;
        },
        calculateEstimatedMinutes(wordCount, wordsPerMinute) {
            if (!wordCount || !wordsPerMinute) {
                return 1;
            }

            return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
        },
        extractKeywords(value) {
            return this.cleanText(value)
                .toLowerCase()
                .split(/\s+/)
                .map((word) => word.replace(/[^a-z0-9]/g, ""))
                .filter((word) => word.length >= 4 && !["from", "with", "that", "this", "have", "what", "your", "into", "about", "read"].includes(word));
        },
        formatTopicLabel(value) {
            const clean = this.cleanText(value);
            if (!clean) {
                return "";
            }

            return clean.charAt(0).toUpperCase() + clean.slice(1);
        },
        matchesCollection(item, collection) {
            if (!item || !collection) {
                return false;
            }

            const haystack = this.cleanText(
                `${item.title || ""} ${item.summary || ""} ${item.publishedBy || ""} ${(item.tags || []).join(" ")} ${item.category || ""}`
            ).toLowerCase();

            return collection.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()));
        },
        buildFallbackOverview(item, publishedBy, title) {
            const author = this.cleanText(publishedBy);
            const typeLabel = this.cleanText(item.typeLabel || item.type || "item").toLowerCase();
            if (author) {
                return `${title} by ${author}. Open to read the full ${typeLabel} from IslamHouse.`;
            }
            return `Open to read the full ${typeLabel} from IslamHouse.`;
        },
        buildCompactFallbackExcerpt(item) {
            const author = this.cleanText(item.publishedBy);
            const typeLabel = this.cleanText(item.typeLabel || item.type || "item").toLowerCase();
            const parts = [];

            if (author) {
                parts.push(`Published by ${author}.`);
            }
            if (this.isPdfCard(item)) {
                parts.push("Includes PDF access.");
            }
            parts.push(`Continue reading the full ${typeLabel} on IslamHouse.`);

            return this.cleanText(parts.join(" "));
        },
        buildCardExcerptText(item) {
            const base = this.normalizeOverviewText(item.summary || item.contentText || "", item.title);
            if (!base) {
                return this.buildCompactFallbackExcerpt(item);
            }

            if (base.length >= 150) {
                return base;
            }

            const suffix = this.cleanText(
                [
                    this.cleanText(item.publishedBy) ? `Published by ${this.getCardPublisher(item)}.` : "",
                    this.isPdfCard(item) ? "Includes PDF access." : "",
                    `Continue reading the full ${this.cleanText(item.typeLabel || item.type || "item").toLowerCase()} on IslamHouse.`,
                ].join(" ")
            );

            return this.cleanText(`${base} ${suffix}`);
        },
        getCardExcerptSecondary(item) {
            return this.isPdfCard(item) ? "Built-in PDF reader in modal" : "";
        },
        truncateText(value, limit = 180) {
            const text = this.cleanText(value);
            if (!text || text.length <= limit) {
                return text;
            }

            const slice = text.slice(0, limit);
            const cut = slice.lastIndexOf(" ");
            return this.cleanText(cut > 90 ? slice.slice(0, cut) : slice);
        },
        getCardExcerpt(item) {
            return this.truncateText(this.buildCardExcerptText(item), 240);
        },
        getHighlightedExcerpt(item) {
            return this.highlightText(this.getCardExcerpt(item));
        },
        isPdfCard(item) {
            return !!(item && !item.readerReady && (item.hasPdf || /pdf/i.test(item.formatLabel || "")));
        },
        getCardChipLabel(item) {
            return this.isPdfCard(item) ? "PDF" : item.typeLabel;
        },
        getCardThemeClass(item) {
            if (this.isPdfCard(item)) {
                return "library-card--pdf";
            }

            if (item && item.type === "books") {
                return "library-card--book";
            }

            if (item && item.type === "fatwa") {
                return "library-card--fatwa";
            }

            return "library-card--article";
        },
        getCardTypeIcon(item) {
            if (this.isPdfCard(item)) {
                return "bi-file-earmark-pdf";
            }

            if (item && item.type === "books") {
                return "bi-book";
            }

            if (item && item.type === "fatwa") {
                return "bi-patch-question";
            }

            return "bi-journal-text";
        },
        getCardPublisher(item) {
            return this.cleanText(item.publishedBy) || "IslamHouse";
        },
        getRelatedCategory(item) {
            if (!item) {
                return "";
            }
            return this.cleanText(item.category || this.getCardChipLabel(item) || item.typeLabel || item.type).toLowerCase();
        },
        getItemTags(item) {
            if (!item) {
                return [];
            }
            if (Array.isArray(item.tags) && item.tags.length) {
                return item.tags;
            }
            return this.extractKeywords(`${item.title || ""} ${item.summary || ""}`);
        },
        getSearchTerms(query = this.searchQuery) {
            return Array.from(
                new Set(
                    this.cleanText(query)
                        .split(/\s+/)
                        .map((term) => term.trim())
                        .filter((term) => term.length >= 2)
                )
            );
        },
        escapeRegExp(value) {
            return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        },
        highlightText(text, query = this.searchQuery) {
            const value = String(text || "");
            const terms = this.getSearchTerms(query);
            if (!value || !terms.length) {
                return this.escapeHtml(value);
            }

            const regex = new RegExp(`(${terms.map((term) => this.escapeRegExp(term)).join("|")})`, "gi");
            return value
                .split(regex)
                .map((part) => {
                    if (!part) {
                        return "";
                    }

                    const isMatch = terms.some((term) => part.toLowerCase() === term.toLowerCase());
                    return isMatch
                        ? `<mark class="search-highlight">${this.escapeHtml(part)}</mark>`
                        : this.escapeHtml(part);
                })
                .join("");
        },
        highlightHtmlContent(html, query = this.searchQuery) {
            if (typeof document === "undefined") {
                return html;
            }

            const terms = this.getSearchTerms(query);
            if (!terms.length) {
                return html;
            }

            const wrapper = document.createElement("div");
            wrapper.innerHTML = html;
            const regex = new RegExp(`(${terms.map((term) => this.escapeRegExp(term)).join("|")})`, "gi");
            const walker = document.createTreeWalker(wrapper, window.NodeFilter.SHOW_TEXT, null);
            const nodes = [];

            while (walker.nextNode()) {
                const node = walker.currentNode;
                const parent = node.parentElement;
                if (!parent) {
                    continue;
                }
                if (["SCRIPT", "STYLE", "MARK", "IFRAME"].includes(parent.tagName)) {
                    continue;
                }
                if (!this.cleanText(node.nodeValue)) {
                    continue;
                }
                nodes.push(node);
            }

            nodes.forEach((node) => {
                if (!regex.test(node.nodeValue)) {
                    regex.lastIndex = 0;
                    return;
                }

                regex.lastIndex = 0;
                const span = document.createElement("span");
                span.innerHTML = this.highlightText(node.nodeValue, query);
                node.parentNode.replaceChild(span, node);
            });

            return wrapper.innerHTML;
        },
        resolveCacheKey(key) {
            return `islamhouse-library-v2::${key}`;
        },
        readCache(key) {
            try {
                const raw = localStorage.getItem(this.resolveCacheKey(key));
                if (!raw) {
                    return null;
                }
                const parsed = JSON.parse(raw);
                if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
                    localStorage.removeItem(this.resolveCacheKey(key));
                    return null;
                }
                return parsed.value;
            } catch (error) {
                return null;
            }
        },
        writeCache(key, value) {
            try {
                localStorage.setItem(
                    this.resolveCacheKey(key),
                    JSON.stringify({
                        value,
                        expiresAt: Date.now() + 60 * 60 * 1000,
                    })
                );
            } catch (error) {}
        },
        loadSavedItems() {
            if (typeof window === "undefined") {
                return;
            }

            try {
                const raw = localStorage.getItem("islamhouse-library-saved-items");
                const parsed = raw ? JSON.parse(raw) : [];
                this.savedItemKeys = Array.isArray(parsed) ? parsed : [];
            } catch (error) {
                this.savedItemKeys = [];
            }
        },
        persistSavedItems() {
            if (typeof window === "undefined") {
                return;
            }

            try {
                localStorage.setItem("islamhouse-library-saved-items", JSON.stringify(this.savedItemKeys));
            } catch (error) {}
        },
        buildTeamReflection(item) {
            const title = this.cleanText(item && item.title);
            const keywords = this.extractKeywords(title);
            const leadTopic = keywords[0] || "this reminder";
            const secondTopic = keywords[1] || "steady faith";

            return [
                `This reflection on ${leadTopic} speaks directly to modern life, where constant pressure can pull the heart away from calm remembrance and thoughtful action.`,
                `Use this lesson to slow down, filter noise, and make daily choices with more sincerity, discipline, and trust in Allah.`,
                `Even in busy routines, returning to ${secondTopic} can turn ordinary moments into worship, clarity, and quiet strength.`,
            ];
        },
        showToast(message, variant = "success") {
            if (this.toastTimeoutId) {
                clearTimeout(this.toastTimeoutId);
            }

            this.toast = {
                show: true,
                message,
                variant,
            };

            this.toastTimeoutId = setTimeout(() => {
                this.toast.show = false;
            }, 2400);
        },
        toggleTeamInsight() {
            this.teamInsightExpanded = !this.teamInsightExpanded;
        },
        toggleSavedItem() {
            if (!this.activeItem || !this.activeItem.key) {
                return;
            }

            if (this.savedItemKeys.includes(this.activeItem.key)) {
                this.savedItemKeys = this.savedItemKeys.filter((key) => key !== this.activeItem.key);
                this.persistSavedItems();
                this.showToast("Removed from saved items.");
                return;
            }

            this.savedItemKeys = [this.activeItem.key, ...this.savedItemKeys].slice(0, 50);
            this.persistSavedItems();
            this.showToast("Saved for later.");
        },
        bindReaderScroll() {
            const reader = this.$refs.readerContent;
            if (!reader) {
                this.readerProgress = 0;
                return;
            }

            reader.removeEventListener("scroll", this.handleReaderScroll);
            reader.addEventListener("scroll", this.handleReaderScroll, { passive: true });
            this.handleReaderScroll();
        },
        handleReaderScroll() {
            const reader = this.$refs.readerContent;
            if (!reader) {
                this.readerProgress = 0;
                return;
            }

            const scrollableHeight = Math.max(1, reader.scrollHeight - reader.clientHeight);
            this.readerProgress = Math.min(100, Math.max(0, Math.round((reader.scrollTop / scrollableHeight) * 100)));
        },
        applyCurrentSentenceHighlight() {
            const reader = this.$refs.readerContent;
            if (!reader) {
                return;
            }

            const nextIndex = this.speech.currentSentenceIndex;
            reader.querySelectorAll(".reader-sentence.is-speaking").forEach((node) => node.classList.remove("is-speaking"));

            if (!this.speech.isSpeaking || this.speech.isPaused) {
                return;
            }

            const nextNode = reader.querySelector(`.reader-sentence[data-sentence-index="${nextIndex}"]`);
            if (!nextNode) {
                return;
            }

            nextNode.classList.add("is-speaking");
            if (typeof nextNode.scrollIntoView === "function") {
                nextNode.scrollIntoView({ block: "nearest", behavior: "smooth" });
            }
        },
        clearCurrentSentenceHighlight() {
            const reader = this.$refs.readerContent;
            if (!reader) {
                return;
            }
            reader.querySelectorAll(".reader-sentence.is-speaking").forEach((node) => node.classList.remove("is-speaking"));
        },
        async openItem(item) {
            this.activeItem = { ...item };
            this.showSummary = false;
            this.showAudioPanel = false;
            this.teamInsightExpanded = false;
            this.detailLoading = true;
            this.detailError = "";
            this.modalInstance && this.modalInstance.show();

            try {
                const detail = await this.fetchItemDetail(item);
                this.activeItem = { ...this.activeItem, ...detail, detailLoaded: true };
                this.items = this.mergeItems(this.items, [this.activeItem]);
                this.$nextTick(() => {
                    this.bindReaderScroll();
                    this.applyCurrentSentenceHighlight();
                });
            } catch (error) {
                this.detailError = error.message || "The full text could not be loaded.";
            } finally {
                this.detailLoading = false;
            }
        },
        async fetchItemDetail(item) {
            if (item.detailLoaded && item.contentHtml) {
                return item;
            }

            return this.fetchPageDetail(item);
        },
        async fetchItemPreview(item) {
            const html = await this.fetchTextWithCache(item.url, `islamhouse-detail-${item.type}-${item.id}`);
            const doc = new DOMParser().parseFromString(html, "text/html");
            const titleNode = doc.querySelector("h1.text-center b, h1.text-center, h1 b, h1");
            const pageTitle = this.cleanText(titleNode ? titleNode.textContent : item.title);
            const descriptionNode = this.findDetailSection(doc, "Description");
            const contentRoot = doc.querySelector(".full-description");
            const metaDescription = doc.querySelector('meta[name="description"]');
            const metaAuthor = doc.querySelector('meta[name="author"]');
            const primaryAttachment = this.getPrimaryAttachment(doc);
            const publishedBy =
                this.extractContributor(doc) ||
                this.cleanText(metaAuthor ? metaAuthor.getAttribute("content") : "") ||
                item.publishedBy;
            const summary =
                this.normalizeOverviewText(this.extractSectionText(descriptionNode), pageTitle) ||
                this.normalizeOverviewText(this.extractContentPreviewText(contentRoot), pageTitle) ||
                this.normalizeOverviewText(metaDescription ? metaDescription.getAttribute("content") : "", pageTitle) ||
                this.buildFallbackOverview(item, publishedBy, pageTitle);

            return {
                title: pageTitle,
                summary,
                publishedBy,
                sourceUrl: item.url,
                hasPdf: !!(primaryAttachment && primaryAttachment.extension === "pdf"),
                formatLabel: primaryAttachment && primaryAttachment.extension ? primaryAttachment.extension.toUpperCase() : item.formatLabel,
            };
        },
        async fetchPageDetail(item) {
            const html = await this.fetchTextWithCache(item.url, `islamhouse-detail-${item.type}-${item.id}`);
            const doc = new DOMParser().parseFromString(html, "text/html");
            const titleNode = doc.querySelector("h1.text-center b, h1.text-center, h1 b, h1");
            const descriptionNode = this.findDetailSection(doc, "Description");
            const contentRoot = doc.querySelector(".full-description");
            const pageTitle = this.cleanText(titleNode ? titleNode.textContent : item.title);
            const descriptionText = this.extractSectionText(descriptionNode) || item.summary;
            const primaryAttachment = this.getPrimaryAttachment(doc);
            const publishedBy = this.extractContributor(doc) || item.publishedBy;

            if (contentRoot) {
                const cleaned = this.cleanReaderHtml(contentRoot, pageTitle);
                const sentenceMarkup = this.decorateReaderContent(cleaned);
                const plainText = this.cleanText(this.stripSpeakerCredits(sentenceMarkup.plainText || cleaned.textContent));
                const previewText = this.extractContentPreviewText(cleaned) || plainText;

                return {
                    title: pageTitle,
                    category: item.category || item.typeLabel,
                    summary: this.normalizeOverviewText(descriptionText || previewText, pageTitle) || item.summary,
                    contentHtml: sentenceMarkup.html,
                    contentText: plainText,
                    speechSentences: sentenceMarkup.sentences,
                    publishedBy,
                    sourceUrl: item.url,
                    readerReady: true,
                    hasPdf: !!(primaryAttachment && primaryAttachment.extension === "pdf"),
                    formatLabel: primaryAttachment && primaryAttachment.extension ? primaryAttachment.extension.toUpperCase() : item.formatLabel,
                    tags: this.extractKeywords(`${pageTitle} ${descriptionText || previewText}`),
                };
            }

            if (primaryAttachment) {
                const fallbackText =
                    descriptionText ||
                    this.buildFallbackOverview(item, publishedBy, pageTitle);
                const contentHtml = this.decorateAttachmentPreview(this.buildAttachmentPreview(primaryAttachment, fallbackText));

                return {
                    title: pageTitle,
                    category: primaryAttachment.extension === "pdf" ? "PDF" : (item.category || item.typeLabel),
                    summary: this.normalizeOverviewText(descriptionText || fallbackText, pageTitle) || item.summary,
                    contentHtml,
                    contentText: this.stripSpeakerCredits(fallbackText),
                    speechSentences: this.splitIntoSentences(this.stripSpeakerCredits(fallbackText)),
                    publishedBy,
                    sourceUrl: primaryAttachment.url,
                    readerReady: false,
                    hasPdf: primaryAttachment.extension === "pdf",
                    formatLabel: primaryAttachment.extension ? primaryAttachment.extension.toUpperCase() : item.formatLabel,
                    tags: this.extractKeywords(`${pageTitle} ${fallbackText}`),
                };
            }

            throw new Error("The IslamHouse detail page did not expose readable content.");
        },
        extractContributor(doc) {
            const contributorLink = doc.querySelector(".panel-heading .class a, .panel-heading .class em a");
            return this.cleanText(contributorLink ? contributorLink.textContent : "");
        },
        findDetailSection(doc, headingText) {
            return Array.from(doc.querySelectorAll(".bg-default.padding.bordered-bottom"))
                .find((node) => {
                    const heading = node.querySelector("h3");
                    return heading && this.cleanText(heading.textContent).toLowerCase() === headingText.toLowerCase();
                });
        },
        extractSectionText(sectionNode) {
            if (!sectionNode) {
                return "";
            }

            const bodyNode = sectionNode.querySelector("p");
            return this.cleanText(this.stripSpeakerCredits(bodyNode ? bodyNode.textContent : sectionNode.textContent));
        },
        extractContentPreviewText(rootNode) {
            if (!rootNode) {
                return "";
            }

            const candidates = Array.from(rootNode.querySelectorAll("p, li"))
                .map((node) => this.cleanText(this.stripSpeakerCredits(node.textContent)))
                .filter((text) => this.isMeaningfulPreviewText(text));

            if (!candidates.length) {
                return "";
            }

            const preview = [candidates[0]];
            if (candidates[1] && candidates[0].length < 150) {
                preview.push(candidates[1]);
            }

            return this.cleanText(preview.join(" "));
        },
        isMeaningfulPreviewText(text) {
            const value = this.cleanText(text);
            if (!value) {
                return false;
            }

            return !(
                /^english$/i.test(value) ||
                /www\.islamreligion\.com/i.test(value) ||
                /^[0-9]{4}\s*-\s*[0-9]{4}$/.test(value) ||
                /^[0-9]+\s*-\s*[0-9]+$/.test(value) ||
                /^[\[\(]?\s*english\s*[-–]/i.test(value)
            );
        },
        getPrimaryAttachment(doc) {
            const attachments = Array.from(
                doc.querySelectorAll('#attachs a[href*="d1.islamhouse.com"], a[href*="d1.islamhouse.com"]')
            )
                .map((link) => {
                    const url = link.href;
                    if (!url) {
                        return null;
                    }

                    const label = this.cleanText(link.textContent);
                    const extensionMatch = url.match(/\.([a-z0-9]+)(?:$|\?)/i);
                    return {
                        url,
                        label: label || "Source file",
                        extension: extensionMatch ? extensionMatch[1].toLowerCase() : "",
                    };
                })
                .filter(Boolean);

            return attachments[0] || null;
        },
        buildAttachmentPreview(attachment, fallbackText) {
            const safeUrl = this.escapeHtml(attachment.url);
            const safeLabel = this.escapeHtml(attachment.label || "Source file");
            const safeText = this.escapeHtml(this.cleanText(this.stripSpeakerCredits(fallbackText)));
            const isPdf = attachment.extension === "pdf";

            return `
                <div class="attachment-preview">
                    <p class="attachment-summary">${safeText}</p>
                    ${
                        isPdf
                            ? ""
                            : `<div class="attachment-actions">
                                <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="continue-link">
                                    Open ${safeLabel}
                                    <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                </a>
                            </div>`
                    }
                    ${
                        isPdf
                            ? `<iframe class="attachment-frame" src="${safeUrl}#view=FitH" title="${safeLabel}" loading="lazy"></iframe>`
                            : `<div class="attachment-note">Preview is unavailable for this file type. Open the source document to read it.</div>`
                    }
                </div>
            `;
        },
        cleanReaderHtml(rootNode, title) {
            const clone = rootNode.cloneNode(true);
            clone.querySelectorAll("script, style, iframe, img, svg, button, form").forEach((node) => node.remove());
            clone.querySelectorAll("a.fnote, .fnote").forEach((node) => node.remove());
            clone.querySelectorAll("ul:empty, ol:empty, p:empty, div:empty, span:empty, br").forEach((node) => node.remove());

            const paragraphs = Array.from(clone.querySelectorAll("p"));
            let shouldTrimFrontMatter = true;
            paragraphs.forEach((paragraph) => {
                if (!shouldTrimFrontMatter) {
                    return;
                }

                const text = this.cleanText(paragraph.textContent);
                const classes = paragraph.className || "";
                const isCenter = classes.includes("center");
                const removable =
                    !text ||
                    text === title ||
                    /\b(narrated by|said by|presented by|translated by|prepared by|reviewed by|speaker|lecturer)\b/i.test(text) ||
                    /www\.islamreligion\.com/i.test(text) ||
                    /^english$/i.test(text) ||
                    /^[0-9]{4}\s*-\s*[0-9]{4}$/.test(text) ||
                    /^[0-9]+\s*-\s*[0-9]+$/.test(text) ||
                    isCenter;

                if (removable) {
                    paragraph.remove();
                    return;
                }

                shouldTrimFrontMatter = false;
            });

            this.removeLeadingNavigationBlocks(clone, title);

            clone.querySelectorAll("hr").forEach((node) => {
                if (!node.previousElementSibling || node.previousElementSibling.tagName === "P") {
                    node.remove();
                }
            });

            clone.querySelectorAll("div").forEach((node) => {
                const text = this.cleanText(node.textContent);
                if (!text && !node.children.length) {
                    node.remove();
                    return;
                }

                if (text && node.children.length === 1 && node.firstElementChild && node.classList.length === 0) {
                    node.replaceWith(node.firstElementChild);
                }
            });

            clone.querySelectorAll("*").forEach((node) => {
                [...node.attributes].forEach((attribute) => {
                    if (!["href", "target", "rel", "dir", "class"].includes(attribute.name)) {
                        node.removeAttribute(attribute.name);
                    }
                });
            });

            return clone;
        },
        decorateReaderContent(rootNode) {
            if (typeof document === "undefined" || typeof Node === "undefined") {
                return {
                    html: rootNode.innerHTML,
                    sentences: this.splitIntoSentences(rootNode.textContent || ""),
                    plainText: this.cleanText(rootNode.textContent),
                };
            }

            let sentenceIndex = 0;
            const sentences = [];

            const processNode = (node) => {
                Array.from(node.childNodes).forEach((child) => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        const rawText = String(child.nodeValue || "");
                        const parts = rawText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [rawText];
                        if (!parts.length) {
                            return;
                        }

                        const fragment = document.createDocumentFragment();
                        parts.forEach((part) => {
                            if (!part) {
                                return;
                            }

                            if (!this.cleanText(part)) {
                                fragment.appendChild(document.createTextNode(part));
                                return;
                            }

                            const span = document.createElement("span");
                            span.className = "reader-sentence";
                            span.setAttribute("data-sentence-index", String(sentenceIndex));
                            span.textContent = part;
                            fragment.appendChild(span);
                            sentences.push(this.cleanText(this.stripSpeakerCredits(part)));
                            sentenceIndex += 1;
                        });

                        child.parentNode && child.parentNode.replaceChild(fragment, child);
                        return;
                    }

                    if (child.nodeType === Node.ELEMENT_NODE && !["IFRAME", "SCRIPT", "STYLE"].includes(child.tagName)) {
                        processNode(child);
                    }
                });
            };

            processNode(rootNode);

            return {
                html: rootNode.innerHTML,
                sentences: sentences.filter(Boolean),
                plainText: this.cleanText(rootNode.textContent),
            };
        },
        decorateAttachmentPreview(html) {
            if (typeof document === "undefined") {
                return html;
            }

            const wrapper = document.createElement("div");
            wrapper.innerHTML = html;
            return this.decorateReaderContent(wrapper).html;
        },
        removeLeadingNavigationBlocks(rootNode, title) {
            if (!rootNode || typeof Node === "undefined") {
                return;
            }

            const firstBlock = rootNode.querySelector("p, h1, h2, h3");
            const leadingLists = Array.from(rootNode.querySelectorAll("ul, ol")).filter((list) => {
                if (!firstBlock) {
                    return true;
                }
                return !!(list.compareDocumentPosition(firstBlock) & Node.DOCUMENT_POSITION_FOLLOWING);
            });

            const firstList = leadingLists[0];
            if (firstList && this.isLikelyTableOfContents(firstList, title)) {
                firstList.remove();
            }
        },
        isLikelyTableOfContents(listNode, title) {
            const items = Array.from(listNode.querySelectorAll("li"))
                .map((node) => this.cleanText(node.textContent))
                .filter(Boolean);

            if (items.length < 3) {
                return false;
            }

            const links = Array.from(listNode.querySelectorAll("a[href]"));
            const mostlyLinks = links.length >= Math.max(3, Math.ceil(items.length * 0.6));
            const mostlyInternal = links.length > 0 && links.every((link) => {
                const href = link.getAttribute("href") || "";
                return !href || href.startsWith("#") || href.includes("#note_") || href.includes("#ref_");
            });
            const significantWords = this.cleanText(title)
                .toLowerCase()
                .split(/\s+/)
                .filter((word) => word.length > 3);
            const titleMatches = items.filter((item) => significantWords.some((word) => item.toLowerCase().includes(word))).length;
            const shortItems = items.filter((item) => item.length <= 90).length;
            const colonEndedItems = items.filter((item) => /[:;!?]$/.test(item)).length;
            const headingLikeItems = items.filter((item) => {
                const words = item.split(/\s+/).filter(Boolean);
                if (!words.length || words.length > 16) {
                    return false;
                }

                const capitalized = words.filter((word) => /^[A-Z][a-z]+/.test(word)).length;
                return capitalized >= Math.max(2, Math.floor(words.length / 2));
            }).length;

            const titleDrivenOutline =
                shortItems >= Math.ceil(items.length * 0.7) &&
                (
                    colonEndedItems >= Math.max(2, Math.floor(items.length * 0.4)) ||
                    headingLikeItems >= Math.max(3, Math.floor(items.length * 0.6)) ||
                    titleMatches >= Math.max(2, Math.floor(items.length / 3))
                );

            return (mostlyLinks && (mostlyInternal || titleMatches >= Math.max(2, Math.floor(items.length / 2)))) || titleDrivenOutline;
        },
        escapeHtml(text) {
            return String(text || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
        },
        plainTextToHtml(text) {
            const clean = this.cleanMultilineText(this.stripSpeakerCredits(text));
            if (!clean) {
                return "";
            }

            const blocks = clean
                .split(/\n{2,}/)
                .map((block) => this.cleanText(block))
                .filter(Boolean)
                .map((block) => `<p>${this.escapeHtml(block)}</p>`);

            const html = blocks.join("");
            if (typeof document === "undefined") {
                return html;
            }

            const wrapper = document.createElement("div");
            wrapper.innerHTML = html;
            return this.decorateReaderContent(wrapper).html;
        },
        increaseFontSize() {
            this.contentFontSize = Math.min(24, this.contentFontSize + 1);
        },
        decreaseFontSize() {
            this.contentFontSize = Math.max(13, this.contentFontSize - 1);
        },
        resetFontSize() {
            this.contentFontSize = 16;
        },
        toggleSummary() {
            this.showSummary = !this.showSummary;
            if (this.showSummary && this.activeItem && !this.activeItem.aiSummary) {
                this.generateSummary();
            }
        },
        generateSummary() {
            if (!this.activeItem || !this.activeItem.contentText) {
                return;
            }

            const sentences = this.getSpeechSentences();

            const overview = sentences.slice(0, 3).join(" ");
            const keywords = ["allah", "prayer", "faith", "quran", "prophet", "islam", "worship", "knowledge"];
            const points = sentences
                .filter((sentence) => keywords.some((keyword) => sentence.toLowerCase().includes(keyword)))
                .slice(0, 4);

            this.activeItem.aiSummary = {
                overview: overview || "Summary unavailable from the current text.",
                points: (points.length ? points : sentences.slice(0, 4)).map((sentence) =>
                    sentence.length > 180 ? `${sentence.slice(0, 177)}...` : sentence
                ),
            };

            this.items = this.mergeItems(this.items, [this.activeItem]);
        },
        toggleAudioPanel() {
            this.showAudioPanel = !this.showAudioPanel;
            if (this.showAudioPanel && !this.speech.isSpeaking) {
                this.startSpeech();
            }
        },
        loadVoices() {
            if (!this.speechSupported) {
                return;
            }

            const populate = () => {
                const voices = window.speechSynthesis.getVoices().slice();
                this.speech.allVoices = voices;
                this.voiceGroups = this.groupVoices(voices);
                if (!this.speech.selectedVoiceURI) {
                    const firstVoice =
                        this.voiceGroups.female[0] ||
                        this.voiceGroups.male[0] ||
                        this.voiceGroups.other[0];
                    this.speech.selectedVoiceURI = firstVoice ? firstVoice.voiceURI : "";
                }
            };

            populate();
            window.speechSynthesis.onvoiceschanged = populate;
        },
        groupVoices(voices) {
            const femaleHints = ["female", "zira", "samantha", "victoria", "karen", "serena", "fiona", "helena"];
            const maleHints = ["male", "david", "daniel", "alex", "fred", "george", "mark", "tom", "john", "james"];
            const female = [];
            const male = [];
            const other = [];

            voices.forEach((voice) => {
                const name = (voice.name || "").toLowerCase();
                if (femaleHints.some((hint) => name.includes(hint))) {
                    female.push(voice);
                } else if (maleHints.some((hint) => name.includes(hint))) {
                    male.push(voice);
                } else {
                    other.push(voice);
                }
            });

            return {
                male: male.slice(0, 3),
                female: female.slice(0, 3),
                other: other.slice(0, 10),
            };
        },
        getSelectedVoice() {
            return this.speech.allVoices.find((voice) => voice.voiceURI === this.speech.selectedVoiceURI) || null;
        },
        prepareSpeechDurations(sentences) {
            this.speech.sentenceDurations = sentences.map((sentence) => {
                const words = this.cleanText(sentence).split(/\s+/).filter(Boolean).length;
                return Math.max(0.8, (words / (150 * this.speech.rate)) * 60);
            });
            this.speech.totalSeconds = this.speech.sentenceDurations.reduce((sum, value) => sum + value, 0);
        },
        getSpeechSentences() {
            if (!this.activeItem) {
                return [];
            }

            if (Array.isArray(this.activeItem.speechSentences) && this.activeItem.speechSentences.length) {
                return this.activeItem.speechSentences;
            }

            if (!this.activeItem.contentText) {
                return [];
            }

            return this.splitIntoSentences(this.activeItem.contentText);
        },
        splitIntoSentences(text) {
            return (String(text || "").match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [])
                .map((sentence) => this.cleanText(this.stripSpeakerCredits(sentence)))
                .filter(Boolean);
        },
        startSpeech(fromIndex = 0) {
            if (!this.speechSupported) {
                return;
            }

            const sentences = this.getSpeechSentences();
            if (!sentences.length) {
                return;
            }

            this.stopSpeech();
            this.prepareSpeechDurations(sentences);
            this.speech.stopRequested = false;
            this.speech.isSpeaking = true;
            this.speech.isPaused = false;
            this.speech.currentSentenceIndex = fromIndex;
            this.speech.baseElapsedBeforeSentence = this.sumDurationsBefore(fromIndex);
            this.speech.elapsedSeconds = this.speech.baseElapsedBeforeSentence;
            this.speech.sentenceStartedAt = Date.now();
            this.startSpeechInterval();
            this.speakSentence(sentences, fromIndex);
        },
        playSpeech() {
            const sentences = this.getSpeechSentences();
            if (!sentences.length) {
                return;
            }

            if (this.speech.isSpeaking && this.speech.isPaused) {
                window.speechSynthesis.resume();
                this.speech.isPaused = false;
                this.speech.sentenceStartedAt = Date.now() - (this.speech.pausedSentenceElapsed * 1000);
                return;
            }

            const startIndex = this.speech.progressPercent >= 100 ? 0 : this.speech.currentSentenceIndex || 0;
            this.startSpeech(startIndex);
        },
        speakSentence(sentences, index) {
            if (index >= sentences.length) {
                this.finishSpeech();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(sentences[index]);
            const selectedVoice = this.getSelectedVoice();
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
            utterance.rate = this.speech.rate;
            utterance.volume = this.speech.volume;
            this.speech.currentSentenceIndex = index;
            this.speech.baseElapsedBeforeSentence = this.sumDurationsBefore(index);
            this.speech.sentenceStartedAt = Date.now();
            utterance.onend = () => {
                if (!this.speech.stopRequested) {
                    this.speakSentence(sentences, index + 1);
                }
            };
            utterance.onerror = () => this.finishSpeech();
            window.speechSynthesis.speak(utterance);
        },
        pauseSpeech() {
            if (!this.speech.isSpeaking || this.speech.isPaused) {
                return;
            }
            this.speech.pausedSentenceElapsed = Math.max(0, (Date.now() - this.speech.sentenceStartedAt) / 1000);
            this.speech.isPaused = true;
            window.speechSynthesis.pause();
        },
        skipSpeechBackward() {
            const sentences = this.getSpeechSentences();
            if (!sentences.length) {
                return;
            }

            const targetIndex = Math.max(0, (this.speech.currentSentenceIndex || 0) - 1);
            this.startSpeech(targetIndex);
        },
        skipSpeechForward() {
            const sentences = this.getSpeechSentences();
            if (!sentences.length) {
                return;
            }

            const targetIndex = Math.min(sentences.length - 1, (this.speech.currentSentenceIndex || 0) + 1);
            this.startSpeech(targetIndex);
        },
        restartSpeechIfActive() {
            if (this.speech.isSpeaking) {
                this.startSpeech(this.speech.currentSentenceIndex || 0);
            }
        },
        updateSpeechVolume(event) {
            const nextVolume = Number(event && event.target ? event.target.value : this.speech.volume);
            this.speech.volume = Number.isFinite(nextVolume) ? Math.min(1, Math.max(0, nextVolume)) : this.speech.volume;
            if (this.speech.isSpeaking) {
                this.startSpeech(this.speech.currentSentenceIndex || 0);
            }
        },
        stopSpeech() {
            if (this.speech.intervalId) {
                clearInterval(this.speech.intervalId);
                this.speech.intervalId = null;
            }
            if (this.speechSupported) {
                this.speech.stopRequested = true;
                window.speechSynthesis.cancel();
            }
            this.speech.isSpeaking = false;
            this.speech.isPaused = false;
            this.speech.elapsedSeconds = 0;
            this.speech.totalSeconds = 0;
            this.speech.progressPercent = 0;
            this.speech.currentSentenceIndex = 0;
            this.clearCurrentSentenceHighlight();
        },
        finishSpeech() {
            if (this.speech.intervalId) {
                clearInterval(this.speech.intervalId);
                this.speech.intervalId = null;
            }
            this.speech.isSpeaking = false;
            this.speech.isPaused = false;
            this.speech.elapsedSeconds = this.speech.totalSeconds;
            this.speech.progressPercent = 100;
            this.clearCurrentSentenceHighlight();
        },
        startSpeechInterval() {
            if (this.speech.intervalId) {
                clearInterval(this.speech.intervalId);
            }
            this.speech.intervalId = setInterval(() => {
                let elapsed = this.speech.baseElapsedBeforeSentence;
                if (this.speech.isPaused) {
                    elapsed += this.speech.pausedSentenceElapsed;
                } else {
                    elapsed += Math.max(0, (Date.now() - this.speech.sentenceStartedAt) / 1000);
                }
                this.speech.elapsedSeconds = Math.min(this.speech.totalSeconds, elapsed);
                this.speech.progressPercent = this.speech.totalSeconds
                    ? Math.min(100, Math.round((this.speech.elapsedSeconds / this.speech.totalSeconds) * 100))
                    : 0;
            }, 250);
        },
        sumDurationsBefore(index) {
            return this.speech.sentenceDurations.slice(0, index).reduce((sum, value) => sum + value, 0);
        },
        seekSpeech(event) {
            const sentences = this.getSpeechSentences();
            if (!sentences.length || !this.speech.totalSeconds) {
                return;
            }

            const targetPercent = Number(event.target.value) || 0;
            const targetSeconds = (targetPercent / 100) * this.speech.totalSeconds;
            let accumulated = 0;
            let targetIndex = 0;

            for (let index = 0; index < this.speech.sentenceDurations.length; index += 1) {
                accumulated += this.speech.sentenceDurations[index];
                if (accumulated >= targetSeconds) {
                    targetIndex = index;
                    break;
                }
            }

            this.startSpeech(targetIndex);
        },
        formatDuration(seconds) {
            const total = Math.max(0, Math.round(seconds || 0));
            const minutes = Math.floor(total / 60);
            const remaining = String(total % 60).padStart(2, "0");
            return `${minutes}:${remaining}`;
        },
        async shareActiveItem() {
            if (!this.activeItem) {
                return;
            }

            const data = {
                title: this.activeItem.title,
                text: this.activeItem.title,
                url: this.activeItem.sourceUrl,
            };

            try {
                if (navigator.share) {
                    await navigator.share(data);
                    this.showToast("Share sheet opened.", "success");
                    return;
                }
            } catch (error) {
                if (error && error.name === "AbortError") {
                    return;
                }
            }

            await this.copyToClipboard(this.activeItem.sourceUrl);
        },
        async copyToClipboard(value) {
            try {
                await navigator.clipboard.writeText(value);
                this.showToast("Link copied to clipboard.", "success");
            } catch (error) {
                const input = document.createElement("textarea");
                input.value = value;
                input.style.position = "absolute";
                input.style.left = "-9999px";
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
                this.showToast("Link copied to clipboard.", "success");
            }
        },
        printActiveItem() {
            if (!this.activeItem) {
                return;
            }

            const printWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=800");
            if (!printWindow) {
                return;
            }

            printWindow.document.write(`
                <!doctype html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>${this.escapeHtml(this.activeItem.title)}</title>
                    <style>
                        body { font-family: Georgia, serif; line-height: 1.7; margin: 40px; color: #111; }
                        h1 { margin-bottom: 12px; }
                        .meta { color: #666; margin-bottom: 24px; }
                        p { margin-bottom: 1rem; }
                    </style>
                </head>
                <body>
                    <h1>${this.escapeHtml(this.activeItem.title)}</h1>
                    <div class="meta">${this.escapeHtml(this.activeItem.typeLabel)} · ${this.escapeHtml(this.activeItem.dateLabel)}</div>
                    ${this.activeItem.contentHtml}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        },
    },
};
</script>

<style scoped>
.islamic-library {
    --library-bg: linear-gradient(180deg, rgba(241, 247, 244, 0.98), rgba(232, 242, 238, 0.98));
    --library-surface: rgba(255, 255, 255, 0.96);
    --library-soft: #edf4f1;
    --library-text: #0f172a;
    --library-muted: #53655d;
    --library-accent: #0a7a66;
    --library-accent-strong: #075b4c;
    --library-shadow: 0 18px 40px rgba(12, 44, 33, 0.09);
    --library-shadow-soft: 0 10px 26px rgba(12, 44, 33, 0.06);
    --bs-primary: #0a7a66;
    --bs-primary-rgb: 10, 122, 102;
    color: var(--library-text);
}

.islamic-library.is-dark {
    --library-bg: linear-gradient(180deg, rgba(35, 37, 41, 1), rgba(29, 32, 35, 1));
    --library-surface: rgba(41, 45, 50, 0.98);
    --library-soft: rgba(31, 35, 39, 0.96);
    --library-text: #eef3f1;
    --library-muted: #b4c0bc;
    --library-accent: #23a38d;
    --library-accent-strong: #177a69;
    --library-shadow: 0 22px 42px rgba(0, 0, 0, 0.34);
    --library-shadow-soft: 0 12px 30px rgba(0, 0, 0, 0.28);
}

.islamic-library {
    background: var(--library-bg);
    min-height: 100%;
}

.islamic-library.has-audio-dock {
    padding-bottom: 10.5rem;
}

.library-shell {
    background: transparent;
}

.library-hero {
    padding: 1rem 1.2rem;
    border-radius: 20px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.library-title {
    font-size: clamp(1.72rem, 2.5vw, 2.35rem);
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 1.05;
}

.islamic-library.is-dark .library-title {
    color: #ffffff;
}

.library-subtitle {
    max-width: 38rem;
    color: var(--library-muted);
    font-size: 0.86rem;
    line-height: 1.5;
}

.collections-shell {
    padding: 0.9rem 0.95rem;
    border-radius: 22px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.collections-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.85rem;
}

.collections-kicker {
    margin-bottom: 0.28rem;
    color: var(--library-accent);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.collections-title {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: -0.01em;
}

.collections-actions {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
}

.collections-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 999px;
    background: var(--library-soft);
    color: var(--library-muted);
    box-shadow: var(--library-shadow-soft);
    transition: transform 0.16s ease, color 0.16s ease, background-color 0.16s ease;
}

.collections-action-btn:hover,
.collections-action-btn:focus-visible {
    transform: translateY(-1px);
    color: var(--library-accent);
}

.collections-track {
    display: flex;
    gap: 0.65rem;
    overflow-x: auto;
    padding-bottom: 0.2rem;
    scrollbar-width: thin;
}

.collection-card {
    flex: 0 0 auto;
    width: 136px;
    min-height: 112px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.72rem;
    padding: 0.88rem 0.82rem;
    border: 0;
    border-radius: 18px;
    background: color-mix(in srgb, var(--library-soft) 94%, transparent);
    color: var(--library-text);
    text-align: left;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

.collection-card:hover,
.collection-card:focus-visible {
    transform: translateY(-2px);
    box-shadow: var(--library-shadow-soft);
}

.collection-card.is-active {
    background: color-mix(in srgb, var(--library-accent) 9%, var(--library-soft));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--library-accent) 18%, transparent), var(--library-shadow-soft);
}

.collection-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-surface));
    color: var(--library-accent);
    font-size: 1.02rem;
}

.collection-name {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 800;
    line-height: 1.25;
}

.library-card,
.reader-toolbar,
.reader-panel,
.reader-surface,
.modal-content {
    border: 0;
    border-radius: 20px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.islamic-library :deep(.btn) {
    border: 0;
    border-radius: 20px;
    box-shadow: var(--library-shadow-soft);
}

.library-card {
    min-height: 252px;
    transition: transform 0.16s ease, box-shadow 0.16s ease;
    overflow: hidden;
}

.library-grid--compact .col-xl-4 {
    display: flex;
}

.library-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 36px rgba(12, 44, 33, 0.12);
}

.library-card::before {
    content: "";
    display: block;
    height: 4px;
    background: linear-gradient(90deg, var(--library-accent), var(--library-accent-strong));
}

.library-card--article::before {
    background: linear-gradient(90deg, #0a7a66, #0b5f50);
}

.library-card--book::before {
    background: linear-gradient(90deg, #2563eb, #1d4ed8);
}

.library-card--fatwa::before {
    background: linear-gradient(90deg, #7c3aed, #6d28d9);
}

.library-card--pdf::before {
    background: linear-gradient(90deg, #c2410c, #9a3412);
}

.card-title {
    font-size: 1.24rem;
    line-height: 1.33;
    font-weight: 900;
    letter-spacing: -0.01em;
    min-height: 3.35rem;
}

.card-type-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.38rem;
    width: fit-content;
    margin-bottom: 0.9rem;
    padding: 0.26rem 0.72rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--library-accent) 11%, var(--library-soft));
    color: var(--library-accent);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.card-type-chip.library-card--article {
    background: color-mix(in srgb, #0a7a66 12%, var(--library-soft));
    color: #0a7a66;
}

.card-type-chip.library-card--book {
    background: color-mix(in srgb, #2563eb 12%, var(--library-soft));
    color: #2563eb;
}

.card-type-chip.library-card--fatwa {
    background: color-mix(in srgb, #7c3aed 12%, var(--library-soft));
    color: #7c3aed;
}

.card-type-chip.library-card--pdf {
    background: color-mix(in srgb, #c2410c 13%, var(--library-soft));
    color: #c2410c;
}

.islamic-library.is-dark .card-type-chip.library-card--article {
    color: #4fd2bc;
}

.islamic-library.is-dark .card-type-chip.library-card--book {
    color: #7bb3ff;
}

.islamic-library.is-dark .card-type-chip.library-card--fatwa {
    color: #c19cff;
}

.islamic-library.is-dark .card-type-chip.library-card--pdf {
    color: #ffb084;
}

.card-excerpt {
    color: var(--library-muted);
    font-size: 0.9rem;
    line-height: 1.7;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 4.7rem;
}

.library-card--compact {
    min-height: 210px;
}

.library-card--compact .card-title {
    font-size: 1.08rem;
    min-height: 2.8rem;
    margin-bottom: 0.45rem !important;
}

.library-card--compact .card-type-chip {
    margin-bottom: 0.65rem;
    padding: 0.22rem 0.62rem;
    font-size: 0.67rem;
}

.library-card--compact .card-excerpt {
    -webkit-line-clamp: 2;
    min-height: 3.05rem;
    font-size: 0.84rem;
    line-height: 1.55;
}

.library-card--compact .card-read-more {
    margin-top: 0.5rem;
    font-size: 0.78rem;
}

.library-card--compact .continue-link--inline {
    font-size: 0.78rem;
}

.card-excerpt-secondary {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    margin-top: 0.55rem;
    max-width: 100%;
    padding: 0.34rem 0.58rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-soft));
    color: color-mix(in srgb, var(--library-accent-strong) 82%, var(--library-accent));
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--library-accent) 10%, transparent);
}

.card-excerpt-placeholder .placeholder {
    display: block;
    height: 0.82rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-soft));
}

.card-read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.65rem;
    color: var(--library-accent);
    font-size: 0.84rem;
    font-weight: 600;
}

.continue-link--inline {
    font-size: 0.84rem;
}

.card-meta-grid {
    display: grid;
    gap: 0.5rem;
    padding-top: 0.95rem;
    border-top: 1px solid color-mix(in srgb, var(--library-accent) 12%, transparent);
}

.library-card--compact .card-meta-grid {
    gap: 0.32rem;
    padding-top: 0.72rem;
}

.card-meta-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    color: var(--library-muted);
    font-size: 0.83rem;
    line-height: 1.4;
}

.library-card--compact .card-meta-item {
    gap: 0.42rem;
    font-size: 0.76rem;
    line-height: 1.3;
}

.card-meta-item i {
    color: var(--library-accent);
}

.continue-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--library-accent);
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
}

.continue-link:hover {
    color: var(--library-accent);
}

.library-message,
.reader-state {
    border-radius: 10px;
}

.library-scroll-sentinel {
    display: flex;
    justify-content: center;
    padding: 1.25rem 0 0.25rem;
}

.scroll-sentinel-state {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    background: var(--library-surface);
    color: var(--library-muted);
    box-shadow: var(--library-shadow-soft);
    font-size: 0.88rem;
}

.scroll-top-fab {
    position: fixed;
    right: 1.25rem;
    bottom: 1.25rem;
    z-index: 1040;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--library-accent), var(--library-accent-strong));
    color: #fff;
    box-shadow: 0 18px 38px rgba(0, 191, 166, 0.28);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.scroll-top-fab:hover,
.scroll-top-fab:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 22px 42px rgba(0, 191, 166, 0.34);
}

.modal-content {
    background: var(--library-surface);
    color: var(--library-text);
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: min(88vh, calc(100vh - 6.25rem));
}

.reader-progress-track {
    width: 100%;
    height: 4px;
    background: color-mix(in srgb, var(--library-accent) 10%, transparent);
}

.reader-progress-fill {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, var(--library-accent), color-mix(in srgb, var(--library-accent) 70%, #ffffff 30%));
    transition: width 0.18s ease;
}

.modal-body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
}

.library-modal-dialog {
    max-width: min(780px, calc(100vw - 2.4rem));
    margin: 1.4rem auto !important;
}

.library-modal-dialog--pdf {
    max-width: min(1120px, calc(100vw - 2rem));
}

.library-modal-close {
    position: absolute;
    top: 1.15rem;
    right: 1.15rem;
    z-index: 3;
    opacity: 0.72;
}

.library-modal-close:hover,
.library-modal-close:focus-visible {
    opacity: 1;
}

.modal-head-copy {
    width: 100%;
    padding-right: 2.6rem;
}

.modal-title {
    font-size: clamp(1.36rem, 1.8vw, 1.8rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
}

.modal-title-row {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
}

.modal-title-meta {
    margin-top: 0.5rem;
}

.verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.34rem 0.62rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-soft));
    color: color-mix(in srgb, var(--library-accent-strong) 82%, var(--library-accent));
    font-size: 0.74rem;
    font-weight: 800;
}

.metrics-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin-top: 0.72rem;
}

.metric-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.42rem;
    padding: 0.42rem 0.68rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--library-soft) 88%, transparent);
    color: color-mix(in srgb, var(--library-text) 88%, var(--library-muted));
    font-size: 0.77rem;
    font-weight: 700;
}

.metric-pill i {
    color: var(--library-accent);
}

.team-box {
    margin-top: 0.9rem;
    border-radius: 18px;
    background: color-mix(in srgb, var(--library-accent) 8%, var(--library-surface));
    border: 1px solid color-mix(in srgb, var(--library-accent) 12%, transparent);
    overflow: hidden;
}

.team-box-head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.78rem 0.9rem;
    border: 0;
    background: transparent;
    color: var(--library-text);
}

.team-box-title {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.88rem;
    font-weight: 800;
}

.team-box-title i {
    color: var(--library-accent);
}

.team-box-body {
    display: grid;
    gap: 0.55rem;
    padding: 0 0.9rem 0.9rem;
    color: var(--library-muted);
    font-size: 0.88rem;
    line-height: 1.65;
}

.reader-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.55rem;
    padding: 0.5rem 0.6rem;
    background: color-mix(in srgb, var(--library-soft) 88%, transparent);
}

.reader-toolbar--primary {
    justify-content: flex-start;
    gap: 0.6rem;
    padding: 0.38rem;
    border-radius: 18px;
    background: color-mix(in srgb, var(--library-soft) 76%, transparent);
    box-shadow: none;
}

.reader-toolbar--primary .reader-tool-btn {
    min-width: 102px;
}

.audio-settings-panel {
    margin-top: 0.8rem;
    padding: 0.78rem 0.88rem;
    border-radius: 18px;
    background: color-mix(in srgb, var(--library-soft) 86%, transparent);
}

.audio-settings-panel-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(140px, 180px) auto;
    gap: 0.7rem;
    align-items: end;
}

.audio-setting-label {
    display: block;
    margin-bottom: 0.24rem;
    color: var(--library-muted);
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.audio-setting-select {
    width: 100%;
    min-height: 38px;
    padding: 0.48rem 0.72rem;
    border: 0;
    border-radius: 14px;
    background: var(--library-surface);
    color: var(--library-text);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--library-accent) 10%, transparent);
}

.audio-state-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.46rem;
    min-height: 38px;
    padding: 0 0.82rem;
    border-radius: 999px;
    background: var(--library-surface);
    color: var(--library-muted);
    font-size: 0.78rem;
    font-weight: 700;
}

.audio-state-chip.is-speaking {
    color: var(--library-accent);
}

.audio-state-pulse {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.9;
}

.audio-state-chip.is-speaking .audio-state-pulse {
    animation: audioPulse 1.2s ease-in-out infinite;
}

.reader-tool-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.42rem;
    min-height: 36px;
    padding: 0 0.92rem;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    color: color-mix(in srgb, var(--library-text) 90%, var(--library-muted));
    font-size: 0.8rem;
    font-weight: 700;
    box-shadow: 0 8px 22px rgba(12, 44, 33, 0.05);
    transition: transform 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease, color 0.16s ease;
}

.islamic-library.is-dark .reader-tool-btn {
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.92);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
}

.reader-tool-btn.is-active {
    background: linear-gradient(135deg, color-mix(in srgb, var(--library-accent) 86%, #ffffff 14%), var(--library-accent-strong));
    color: #ffffff;
    box-shadow: 0 12px 28px color-mix(in srgb, var(--library-accent) 32%, transparent);
}

.reader-tool-btn--save.is-active {
    background: linear-gradient(135deg, #d7a625, #b8860b);
    box-shadow: 0 12px 28px rgba(184, 134, 11, 0.24);
}

.islamic-library.is-dark .reader-tool-btn.is-active {
    background: linear-gradient(135deg, color-mix(in srgb, var(--library-accent) 72%, #ffffff 10%), color-mix(in srgb, var(--library-accent-strong) 86%, #000000 14%));
    color: #ffffff;
}

.islamic-library.is-dark .reader-tool-btn--save.is-active {
    background: linear-gradient(135deg, #e2b84b, #c79418);
    color: #111827;
}

.audio-dock-close {
    transition: transform 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease, color 0.16s ease;
}

.reader-tool-btn:hover,
.reader-tool-btn:focus-visible,
.audio-dock-close:hover,
.audio-dock-close:focus-visible {
    transform: translateY(-1px);
    box-shadow: 0 14px 30px rgba(12, 44, 33, 0.12);
}

.reader-tool-btn:hover,
.reader-tool-btn:focus-visible {
    background: color-mix(in srgb, var(--library-accent) 12%, var(--library-soft));
    color: var(--library-accent);
}

.reader-tool-btn.is-active:hover,
.reader-tool-btn.is-active:focus-visible {
    color: #ffffff;
    background: linear-gradient(135deg, var(--library-accent), var(--library-accent-strong));
}

.reader-panel {
    padding: 0.85rem 1rem;
    margin-top: 0.9rem;
    box-shadow: var(--library-shadow-soft);
    border-inline-start: 4px solid color-mix(in srgb, var(--library-accent) 72%, transparent);
    background: color-mix(in srgb, var(--library-accent) 5%, var(--library-surface));
}

.related-content-section {
    padding: 0.95rem 1rem;
    border-radius: 20px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow-soft);
}

.related-content-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
}

.related-content-title {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 1rem;
    font-weight: 800;
}

.related-content-title i {
    color: var(--library-accent);
}

.related-card {
    display: block;
    height: 100%;
    padding: 0.85rem;
    border-radius: 18px;
    background: color-mix(in srgb, var(--library-soft) 88%, transparent);
}

.related-card-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
}

.related-card-chip {
    display: inline-flex;
    width: fit-content;
    padding: 0.22rem 0.54rem;
    border-radius: 999px;
    background: var(--library-surface);
    color: var(--library-accent);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.related-card-title {
    margin-top: 0.6rem;
    font-size: 0.96rem;
    font-weight: 800;
    line-height: 1.3;
}

.related-card-copy {
    color: var(--library-muted);
    font-size: 0.82rem;
    line-height: 1.6;
}

.summary-head {
    padding-bottom: 0.6rem;
    border-bottom: 1px solid color-mix(in srgb, var(--library-accent) 12%, transparent);
}

.summary-kicker {
    margin-bottom: 0.35rem;
    color: var(--library-accent);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.summary-overview {
    margin-bottom: 0.85rem;
    color: var(--library-text);
    line-height: 1.65;
    font-size: 0.92rem;
}

.summary-points {
    margin: 0;
    padding-left: 1rem;
}

.summary-points li {
    margin-bottom: 0.45rem;
    color: var(--library-text);
    line-height: 1.58;
    font-size: 0.88rem;
}

.summary-actions {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.summary-generate-btn,
.summary-collapse-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
    border: 0;
    border-radius: 999px;
    box-shadow: var(--library-shadow-soft);
}

.summary-generate-btn {
    padding: 0 0.85rem;
    background: color-mix(in srgb, var(--library-accent) 92%, white 8%);
    color: #ffffff;
    font-size: 0.78rem;
    font-weight: 700;
}

.summary-collapse-btn {
    width: 32px;
    background: var(--library-soft);
    color: var(--library-accent);
}

.reader-shell {
    display: flex;
    flex: 0 0 auto;
    width: 100%;
    min-height: 0;
}

.reader-surface {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    width: 100%;
    min-height: clamp(360px, 55vh, 700px);
    max-height: min(64vh, 760px);
    padding: 0;
    overflow: hidden;
    box-shadow: 0 24px 48px rgba(12, 44, 33, 0.08);
}

.reader-surface--pdf {
    min-height: min(72vh, 860px);
    max-height: min(72vh, 860px);
}

.reader-surface-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.9rem 1rem 0;
}

.reader-content {
    flex: 1 1 auto;
    min-height: 320px;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
    padding: 1.4rem 1.35rem 1.5rem;
    line-height: 1.88;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1.03rem;
    text-wrap: pretty;
    text-align: left;
    color: color-mix(in srgb, var(--library-text) 96%, #000000 4%);
}

.reader-content--pdf {
    padding: 0.9rem 1rem 1rem;
    overflow: hidden;
}

.reader-empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    padding: 1.5rem;
    color: var(--library-muted);
    font-size: 0.92rem;
    text-align: center;
}

.reader-inline-alert {
    margin-top: 0.8rem;
}

.reader-content :deep(div) {
    max-width: 100%;
}

.reader-content :deep(p) {
    margin-bottom: 1.08rem;
    color: var(--library-text);
    line-height: 1.84;
    text-align: left !important;
    font-size: 1.01rem;
}

.reader-content :deep(.reader-sentence) {
    transition: background-color 0.18s ease, box-shadow 0.18s ease;
    border-radius: 0.3rem;
}

.reader-content :deep(.reader-sentence.is-speaking) {
    background: rgba(255, 224, 102, 0.62);
    box-shadow: 0 0 0 2px rgba(255, 224, 102, 0.22);
}

.reader-content :deep(a) {
    color: var(--library-accent);
    text-decoration: none;
    font-weight: 600;
}

.reader-content :deep(h1),
.reader-content :deep(h2),
.reader-content :deep(h3),
.reader-content :deep(h4) {
    margin: 1.7rem 0 0.95rem;
    color: var(--library-text);
    font-weight: 800;
    letter-spacing: -0.01em;
    line-height: 1.18;
    text-align: left;
}

.reader-content :deep(h1) {
    font-size: clamp(1.85rem, 3vw, 2.55rem);
}

.reader-content :deep(h2) {
    font-size: clamp(1.45rem, 2.4vw, 2.05rem);
}

.reader-content :deep(h3) {
    font-size: clamp(1.18rem, 2vw, 1.6rem);
}

.reader-content :deep(ul),
.reader-content :deep(ol) {
    margin: 0.15rem 0 1rem 1rem;
    padding-left: 1rem;
}

.reader-content :deep(li) {
    margin-bottom: 0.5rem;
    line-height: 1.76;
    color: var(--library-text);
}

.reader-content :deep(ul li::marker),
.reader-content :deep(ol li::marker) {
    color: var(--library-accent);
}

.reader-content :deep(strong),
.reader-content :deep(b) {
    color: var(--library-text);
    font-weight: 700;
}

.reader-content :deep(blockquote) {
    margin: 1.2rem 0;
    padding: 0.85rem 1rem;
    border-inline-start: 3px solid color-mix(in srgb, var(--library-accent) 65%, transparent);
    background: color-mix(in srgb, var(--library-accent) 6%, transparent);
    border-radius: 0 14px 14px 0;
    color: var(--library-text);
}

.reader-content :deep(hr) {
    margin: 1.4rem 0;
    border: 0;
    border-top: 1px solid color-mix(in srgb, var(--library-accent) 14%, transparent);
}

.reader-content :deep(.attachment-preview) {
    display: grid;
    gap: 1rem;
}

.reader-content--pdf :deep(.attachment-preview) {
    height: 100%;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0.85rem;
}

.reader-content :deep(.attachment-actions) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.reader-content :deep(.attachment-frame) {
    width: 100%;
    min-height: clamp(340px, 48vh, 560px);
    border: 0;
    border-radius: 16px;
    background: #fff;
    box-shadow: var(--library-shadow-soft);
}

.reader-content--pdf :deep(.attachment-frame) {
    min-height: 0;
    height: 100%;
}

.reader-content :deep(.attachment-summary) {
    margin-bottom: 0;
    color: var(--library-muted);
    font-size: 0.94rem;
    line-height: 1.7;
}

.reader-content :deep(.attachment-note) {
    padding: 1rem 1.1rem;
    border-radius: 16px;
    background: var(--library-soft);
    color: var(--library-muted);
}

.reader-content :deep(.reader-block-rtl),
.reader-content :deep(.rtl),
.reader-content :deep([dir="rtl"]),
.reader-content :deep(.reader-list-rtl) {
    direction: rtl;
    text-align: right;
    font-family: "Noto Naskh Arabic", "Amiri", "Scheherazade New", "Geeza Pro", Tahoma, serif;
    font-size: 1.08em;
    line-height: 2.05;
}

.reader-content :deep(.center) {
    text-align: center;
}

.islamic-library :deep(.btn-primary) {
    background: linear-gradient(135deg, var(--library-accent), var(--library-accent-strong));
    color: #fff;
}

.islamic-library :deep(.btn-primary:hover),
.islamic-library :deep(.btn-primary:focus-visible) {
    background: linear-gradient(135deg, var(--library-accent-strong), var(--library-accent));
    color: #fff;
}

.islamic-library :deep(.text-primary),
.islamic-library :deep(.spinner-border.text-primary) {
    color: var(--library-accent) !important;
}

.islamic-library :deep(mark.search-highlight) {
    padding: 0.06em 0.28em;
    border-radius: 0.42rem;
    background: rgba(255, 214, 10, 0.42);
    color: inherit;
}

.islamic-library :deep(#islamicLibraryModal) {
    z-index: 2005;
}

.islamic-library :deep(#islamicLibraryModal .modal-dialog) {
    min-height: calc(100vh - 6.25rem);
}

:deep(.modal-backdrop.show) {
    z-index: 2000;
}

.audio-dock {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2015;
    width: 100%;
    margin-top: 0;
    padding: 0;
    border-radius: 26px 26px 0 0;
    background: linear-gradient(180deg, rgba(19, 43, 37, 0.995), rgba(15, 34, 29, 0.995));
    color: #ffffff;
    box-shadow: 0 -18px 40px rgba(4, 18, 14, 0.34);
    overflow: hidden;
    backdrop-filter: blur(18px);
}

.islamic-library.is-dark .audio-dock {
    background: linear-gradient(180deg, rgba(36, 39, 43, 0.995), rgba(29, 31, 35, 0.995));
}

.audio-dock-bar {
    display: grid;
    grid-template-columns: minmax(220px, 320px) minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 1.2rem;
    width: min(100%, 1920px);
    margin: 0 auto;
    padding: 1rem 1.9rem;
}

.audio-dock-bar--active {
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.audio-meta {
    min-width: 0;
}

.audio-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 0.98rem;
    font-weight: 700;
    line-height: 1.2;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.audio-subtitle {
    margin-top: 0.18rem;
    color: rgba(255, 255, 255, 0.74);
    font-size: 0.74rem;
    font-weight: 600;
}

.audio-main-controls {
    display: flex;
    align-items: center;
    gap: 1.15rem;
    min-width: 0;
}

.audio-dock-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: rgba(255, 255, 255, 0.9);
    box-shadow: none;
}

.audio-controls-cluster {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    flex: 0 0 auto;
}

.audio-side-controls {
    display: inline-flex;
    align-items: center;
    gap: 1.05rem;
    flex: 0 0 auto;
    justify-self: end;
}

.audio-time {
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.76rem;
    font-weight: 700;
}

.audio-bar-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: rgba(255, 255, 255, 0.95);
    font-size: 1.08rem;
    transition: transform 0.16s ease, background-color 0.16s ease, color 0.16s ease, box-shadow 0.16s ease;
}

.audio-bar-btn:hover,
.audio-bar-btn:focus-visible {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.06);
}

.audio-progress-inline {
    display: flex;
    align-items: center;
    min-width: 0;
    flex: 1 1 auto;
}

.audio-progress-inline .audio-progress-range {
    width: 100%;
    min-width: 0;
    flex: 1 1 auto;
}

.audio-volume {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    color: rgba(255, 255, 255, 0.92);
    min-width: 190px;
}

.audio-progress-range {
    margin-bottom: 0;
    --bs-form-range-track-height: 0.22rem;
    --bs-form-range-thumb-width: 1.05rem;
    --bs-form-range-thumb-height: 1.05rem;
    --bs-form-range-thumb-bg: #19d2be;
    --bs-form-range-track-bg: rgba(255, 255, 255, 0.18);
}

.audio-volume-range {
    width: 140px;
    margin-bottom: 0;
    --bs-form-range-track-height: 0.22rem;
    --bs-form-range-thumb-width: 1.05rem;
    --bs-form-range-thumb-height: 1.05rem;
    --bs-form-range-thumb-bg: #19d2be;
    --bs-form-range-track-bg: rgba(255, 255, 255, 0.18);
}

.audio-unsupported {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.84rem;
    font-weight: 600;
}

.library-toast {
    position: fixed;
    left: 50%;
    bottom: 1rem;
    z-index: 2100;
    transform: translateX(-50%);
    padding: 0.72rem 1rem;
    border-radius: 999px;
    color: #ffffff;
    font-size: 0.84rem;
    font-weight: 700;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
}

.library-toast.is-success {
    background: linear-gradient(135deg, var(--library-accent), var(--library-accent-strong));
}

.library-toast.is-warning {
    background: linear-gradient(135deg, #b9891f, #8b6110);
}

.library-toast.is-danger {
    background: linear-gradient(135deg, #c64d42, #9f362d);
}

@keyframes audioPulse {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.35); opacity: 0.45; }
}

@media (max-width: 767.98px) {
    .islamic-library.has-audio-dock {
        padding-bottom: 8.25rem;
    }

    .scroll-top-fab {
        right: 1rem;
        bottom: 7rem;
    }

    .islamic-library :deep(#islamicLibraryModal .modal-dialog.modal-fullscreen-sm-down) {
        min-height: 100dvh;
    }

    .islamic-library :deep(#islamicLibraryModal .modal-dialog.modal-fullscreen-sm-down .modal-content) {
        max-height: 100dvh;
        padding-top: 3.35rem;
        border-radius: 0;
    }

    .reader-toolbar {
        justify-content: flex-start;
    }

    .reader-tool-btn span {
        display: none;
    }

    .reader-toolbar--primary {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.4rem;
    }

    .reader-toolbar--primary .reader-tool-btn {
        min-width: 0;
        padding: 0 0.55rem;
        font-size: 0.76rem;
    }

    .reader-toolbar--primary .reader-tool-btn span {
        display: inline;
    }

    .metrics-pills {
        gap: 0.45rem;
    }

    .metric-pill {
        font-size: 0.74rem;
        padding: 0.42rem 0.62rem;
    }

    .team-box-head,
    .team-box-body,
    .related-content-section {
        padding-left: 0.8rem;
        padding-right: 0.8rem;
    }

    .audio-settings-panel {
        padding: 0.7rem 0.75rem;
    }

    .audio-settings-panel-grid {
        grid-template-columns: 1fr;
    }

    .reader-surface {
        min-height: 300px;
        max-height: min(56vh, 560px);
    }

    .reader-surface--pdf {
        min-height: min(62vh, 640px);
        max-height: min(62vh, 640px);
    }

    .reader-content {
        min-height: 240px;
        padding: 1rem 0.95rem 1.1rem;
    }

    .reader-content--pdf {
        padding: 0.75rem 0.8rem 0.85rem;
    }

    .audio-dock {
        border-radius: 20px 20px 0 0;
    }

    .audio-dock-bar {
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-areas:
            "meta close"
            "transport time";
        align-items: start;
        gap: 0.72rem 0.85rem;
        padding: 0.9rem 0.95rem 0.85rem;
    }

    .audio-meta {
        grid-area: meta;
        min-width: 0;
    }

    .audio-title {
        font-size: 0.92rem;
        line-height: 1.15;
    }

    .audio-subtitle {
        margin-top: 0.18rem;
        font-size: 0.68rem;
    }

    .audio-main-controls {
        grid-area: transport;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: 0.7rem;
        padding: 0.6rem 0.65rem;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.04);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    }

    .audio-progress-inline {
        width: 100%;
        flex: 1 1 auto;
        min-width: 0;
    }

    .audio-controls-cluster {
        gap: 0.16rem;
        flex: 0 0 auto;
    }

    .audio-bar-btn {
        width: 34px;
        height: 34px;
        font-size: 0.9rem;
    }

    .audio-side-controls {
        grid-area: time;
        align-items: center;
        justify-self: end;
        align-self: center;
        gap: 0;
    }

    .audio-time {
        font-size: 0.72rem;
    }

    .audio-dock-close {
        grid-area: close;
        width: 34px;
        height: 34px;
        align-self: start;
    }

    .audio-volume {
        display: none;
    }

    .library-toast {
        width: calc(100vw - 1.5rem);
        text-align: center;
        border-radius: 16px;
    }
}

.reader-content :deep(.rtl) {
    direction: rtl;
    text-align: right;
}

.reader-content :deep(.ltr) {
    direction: ltr;
    text-align: left !important;
}

.reader-content :deep(.ltr.justify),
.reader-content :deep(.justify.ltr),
.reader-content :deep(.start.ltr) {
    text-align: left !important;
}

.reader-footer {
    flex: 0 0 auto;
    margin-top: 0;
    padding: 0.9rem 1.1rem 1rem;
    border-top: 1px solid color-mix(in srgb, var(--library-accent) 12%, transparent);
}

@media (max-width: 767.98px) {
    .collections-shell {
        padding: 0.85rem;
    }

    .collection-card {
        width: 122px;
        min-height: 102px;
        padding: 0.8rem 0.76rem;
        border-radius: 18px;
    }

    .collection-name {
        font-size: 0.84rem;
    }

    .library-hero {
        padding: 0.9rem 0.85rem;
    }

    .library-card .card-body,
    .library-card .card-footer {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
    }

    .library-modal-dialog {
        max-width: 100vw;
    }

    .library-title {
        font-size: 1.7rem;
    }

    .library-subtitle {
        font-size: 0.82rem;
    }

    .library-modal-close {
        top: 0.9rem;
        right: 0.9rem;
    }
}
</style>
