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
                        :result-count="filteredItems.length"
                        :reader-filter="readerFilter"
                        :type-options="typeOptions"
                        @update:searchQuery="searchQuery = $event"
                        @update:activeType="activeType = $event"
                        @update:sortBy="sortBy = $event"
                        @update:readerFilter="readerFilter = $event"
                    />
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

                        <div v-else class="row g-3">
                            <div v-for="item in filteredItems" :key="item.key" class="col-12 col-md-6 col-xl-4">
                                <article class="library-card card shadow-sm border-0 h-100">
                                    <div class="card-body p-4 d-flex flex-column">
                                        <div class="card-type-chip" :class="{ 'card-type-chip--pdf': isPdfCard(item) }">
                                            {{ getCardChipLabel(item) }}
                                        </div>
                                        <h2 class="card-title mb-2" v-html="highlightText(item.title)"></h2>
                                        <template v-if="getCardExcerpt(item)">
                                            <p class="card-excerpt mb-0" v-html="getHighlightedExcerpt(item)"></p>
                                            <p v-if="getCardExcerptSecondary(item)" class="card-excerpt-secondary mb-0">
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
                                    <div class="card-footer bg-transparent border-0 px-4 pb-4 pt-0">
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
            <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down library-modal-dialog">
                <div class="modal-content shadow-lg border-0">
                    <div v-if="activeItem" class="modal-header border-0 pb-0 px-3 px-md-4 pt-3 pt-md-4">
                        <div class="pe-3">
                            <div class="modal-kicker mb-2">
                                {{ activeItem.typeLabel }}
                                <span aria-hidden="true">&middot;</span>
                                {{ activeItem.dateLabel }}
                            </div>
                            <h2
                                id="islamicLibraryModalTitle"
                                class="modal-title h4 fw-semibold mb-0"
                                v-html="highlightText(activeItem.title)"
                            ></h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div v-if="activeItem" class="modal-body px-3 px-md-4 pb-3 pb-md-4 pt-3">
                        <div class="reader-toolbar shadow-sm">
                            <div class="reader-toolbar-group reader-toolbar-group--font">
                                <button type="button" class="reader-icon" @click="decreaseFontSize" aria-label="Decrease text size">
                                    <i class="bi bi-dash-lg"></i>
                                </button>
                                <button type="button" class="reader-icon" @click="resetFontSize" aria-label="Reset text size">
                                    <i class="bi bi-type"></i>
                                </button>
                                <button type="button" class="reader-icon" @click="increaseFontSize" aria-label="Increase text size">
                                    <i class="bi bi-plus-lg"></i>
                                </button>
                            </div>
                            <span class="toolbar-divider" aria-hidden="true"></span>
                            <div class="reader-toolbar-group reader-toolbar-group--actions">
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
                                <button type="button" class="reader-tool-btn" @click="shareActiveItem" aria-label="Share this item">
                                    <i class="bi bi-share" aria-hidden="true"></i>
                                    <span>Share</span>
                                </button>
                                <button type="button" class="reader-tool-btn" @click="printActiveItem" aria-label="Print this item">
                                    <i class="bi bi-printer" aria-hidden="true"></i>
                                    <span>Print</span>
                                </button>
                            </div>
                        </div>

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

                        <div v-if="detailLoading" class="reader-state py-5 text-center">
                            <div class="spinner-border text-primary mb-3" aria-hidden="true"></div>
                            <div>Loading the full text...</div>
                        </div>

                        <div v-else-if="detailError" class="alert alert-warning border-0 shadow-sm mt-3 mb-0">
                            {{ detailError }}
                        </div>

                        <div v-else class="reader-shell mt-3">
                            <div class="reader-surface shadow-sm">
                                <div
                                    class="reader-content"
                                    :style="{ fontSize: contentFontSize + 'px' }"
                                    v-html="activeRenderedContentHtml"
                                ></div>
                                <div v-if="activeItem.sourceUrl" class="reader-footer">
                                    <a :href="activeItem.sourceUrl" target="_blank" rel="noopener noreferrer" class="continue-link">
                                        Open original source
                                        <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
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
            readerFilter: "all",
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
            showSummary: false,
            showAudioPanel: false,
            speechSupported: false,
            voiceGroups: { male: [], female: [], other: [] },
            speechRates: [
                { label: "0.75x", value: 0.75 },
                { label: "1x", value: 1 },
                { label: "1.25x", value: 1.25 },
                { label: "1.5x", value: 1.5 },
                { label: "2x", value: 2 },
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
        activeRenderedContentHtml() {
            if (!this.activeItem || !this.activeItem.contentHtml) {
                return "";
            }

            return this.highlightHtmlContent(this.activeItem.contentHtml, this.searchQuery);
        },
        filteredItems() {
            const query = this.searchQuery.toLowerCase();

            return this.items
                .filter((item) => {
                    if (this.activeType !== "all" && item.type !== this.activeType) {
                        return false;
                    }

                    if (this.readerFilter === "reader" && !item.readerReady) {
                        return false;
                    }

                    if (this.readerFilter === "detail" && item.readerReady) {
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
    },
    mounted() {
        this.speechSupported =
            typeof window !== "undefined" &&
            "speechSynthesis" in window &&
            typeof window.SpeechSynthesisUtterance !== "undefined";
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
    },
    methods: {
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
                this.$refs.detailModal.addEventListener("hidden.bs.modal", () => {
                    this.stopSpeech();
                    this.showSummary = false;
                    this.showAudioPanel = false;
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
        cleanText(value) {
            return String(value || "").replace(/\s+/g, " ").replace(/\u00a0/g, " ").trim();
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
            let text = this.cleanText(value);
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
        getCardPublisher(item) {
            return this.cleanText(item.publishedBy) || "IslamHouse";
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
        async openItem(item) {
            this.activeItem = { ...item };
            this.showSummary = false;
            this.showAudioPanel = false;
            this.detailLoading = true;
            this.detailError = "";
            this.modalInstance && this.modalInstance.show();

            try {
                const detail = await this.fetchItemDetail(item);
                this.activeItem = { ...this.activeItem, ...detail, detailLoaded: true };
                this.items = this.mergeItems(this.items, [this.activeItem]);
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
                const plainText = this.cleanText(cleaned.textContent);
                const previewText = this.extractContentPreviewText(cleaned) || plainText;

                return {
                    title: pageTitle,
                    summary: this.normalizeOverviewText(descriptionText || previewText, pageTitle) || item.summary,
                    contentHtml: cleaned.innerHTML,
                    contentText: plainText,
                    publishedBy,
                    sourceUrl: item.url,
                    readerReady: true,
                    hasPdf: !!(primaryAttachment && primaryAttachment.extension === "pdf"),
                    formatLabel: primaryAttachment && primaryAttachment.extension ? primaryAttachment.extension.toUpperCase() : item.formatLabel,
                };
            }

            if (primaryAttachment) {
                const fallbackText =
                    descriptionText ||
                    this.buildFallbackOverview(item, publishedBy, pageTitle);
                const contentHtml = this.buildAttachmentPreview(primaryAttachment, fallbackText);

                return {
                    title: pageTitle,
                    summary: this.normalizeOverviewText(descriptionText || fallbackText, pageTitle) || item.summary,
                    contentHtml,
                    contentText: fallbackText,
                    publishedBy,
                    sourceUrl: primaryAttachment.url,
                    readerReady: false,
                    hasPdf: primaryAttachment.extension === "pdf",
                    formatLabel: primaryAttachment.extension ? primaryAttachment.extension.toUpperCase() : item.formatLabel,
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
            return this.cleanText(bodyNode ? bodyNode.textContent : sectionNode.textContent);
        },
        extractContentPreviewText(rootNode) {
            if (!rootNode) {
                return "";
            }

            const candidates = Array.from(rootNode.querySelectorAll("p, li"))
                .map((node) => this.cleanText(node.textContent))
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
            const safeText = this.escapeHtml(this.cleanText(fallbackText));
            const isPdf = attachment.extension === "pdf";

            return `
                <div class="attachment-preview">
                    <p class="attachment-summary">${safeText}</p>
                    <div class="attachment-actions">
                        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="continue-link">
                            Open ${safeLabel}
                            <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                        </a>
                    </div>
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

            return mostlyLinks && (mostlyInternal || titleMatches >= Math.max(2, Math.floor(items.length / 2)));
        },
        escapeHtml(text) {
            return String(text || "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
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

            const sentences = this.splitIntoSentences(this.activeItem.contentText);

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
                male: male.slice(0, 6),
                female: female.slice(0, 6),
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
            if (!this.activeItem || !this.activeItem.contentText) {
                return [];
            }

            return this.splitIntoSentences(this.activeItem.contentText);
        },
        splitIntoSentences(text) {
            return (String(text || "").match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [])
                .map((sentence) => this.cleanText(sentence))
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
            } catch (error) {
                const input = document.createElement("textarea");
                input.value = value;
                input.style.position = "absolute";
                input.style.left = "-9999px";
                document.body.appendChild(input);
                input.select();
                document.execCommand("copy");
                document.body.removeChild(input);
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

.card-type-chip--pdf {
    background: color-mix(in srgb, var(--library-accent) 18%, var(--library-soft));
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

.card-meta-item {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    color: var(--library-muted);
    font-size: 0.83rem;
    line-height: 1.4;
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: min(88vh, calc(100vh - 6.25rem));
}

.modal-body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
}

.library-modal-dialog {
    max-width: min(760px, calc(100vw - 2.4rem));
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

.modal-kicker {
    font-size: 0.78rem;
    color: var(--library-muted);
    font-weight: 700;
    letter-spacing: 0.02em;
}

.modal-title {
    font-size: clamp(1.55rem, 2.2vw, 2.15rem);
    line-height: 1.16;
    letter-spacing: -0.02em;
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

.reader-toolbar-group {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.42rem;
}

.reader-icon {
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 20px;
    background: var(--library-soft);
    color: var(--library-text);
    box-shadow: var(--library-shadow-soft);
}

.reader-tool-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.42rem;
    min-height: 34px;
    padding: 0 0.8rem;
    border: 0;
    border-radius: 999px;
    background: var(--library-soft);
    color: var(--library-text);
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: var(--library-shadow-soft);
    transition: transform 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease, color 0.16s ease;
}

.reader-tool-btn.is-active {
    background: linear-gradient(135deg, color-mix(in srgb, var(--library-accent) 86%, #ffffff 14%), var(--library-accent-strong));
    color: #ffffff;
    box-shadow: 0 12px 28px color-mix(in srgb, var(--library-accent) 32%, transparent);
}

.islamic-library.is-dark .reader-tool-btn.is-active {
    background: linear-gradient(135deg, color-mix(in srgb, var(--library-accent) 72%, #ffffff 10%), color-mix(in srgb, var(--library-accent-strong) 86%, #000000 14%));
    color: #ffffff;
}

.reader-icon,
.audio-dock-close {
    transition: transform 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease, color 0.16s ease;
}

.reader-icon:hover,
.reader-icon:focus-visible,
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

.toolbar-divider {
    width: 1px;
    height: 24px;
    background: rgba(148, 163, 184, 0.28);
    margin: 0 0.2rem;
}

.reader-panel {
    padding: 0.8rem 0.95rem;
    margin-top: 0.9rem;
    box-shadow: var(--library-shadow-soft);
    border-inline-start: 4px solid color-mix(in srgb, var(--library-accent) 72%, transparent);
    background: color-mix(in srgb, var(--library-accent) 5%, var(--library-surface));
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
    flex: 1 1 auto;
    min-height: 0;
}

.reader-surface {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
    padding: 0;
    overflow: hidden;
}

.reader-content {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    padding: 1.25rem 1.2rem 1.35rem;
    line-height: 1.82;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 1rem;
    text-wrap: pretty;
    text-align: left;
}

.reader-content :deep(div) {
    max-width: 100%;
}

.reader-content :deep(p) {
    margin-bottom: 1rem;
    color: var(--library-text);
    line-height: 1.78;
    text-align: left !important;
    font-size: 1rem;
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
    margin: 1.45rem 0 0.9rem;
    color: var(--library-text);
    font-weight: 800;
    letter-spacing: -0.01em;
    line-height: 1.24;
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
    margin-bottom: 0.42rem;
    line-height: 1.72;
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
    grid-template-columns: minmax(220px, 320px) minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.5rem;
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

    .audio-dock {
        border-radius: 20px 20px 0 0;
    }

    .audio-dock-bar {
        grid-template-columns: minmax(0, 1fr) auto;
        grid-template-areas:
            "meta close"
            "transport transport";
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
        grid-template-columns: auto minmax(0, 1fr) auto;
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
        grid-area: unset;
        align-items: center;
        gap: 0.55rem;
    }

    .audio-volume {
        min-width: 0;
        width: 108px;
        gap: 0.45rem;
    }

    .audio-volume-range {
        width: 100%;
    }

    .audio-volume i {
        font-size: 0.8rem;
    }

    .audio-dock-close {
        grid-area: close;
        width: 34px;
        height: 34px;
        align-self: start;
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
}
</style>
