<template>
    <section class="islamic-library py-4 py-lg-5" :class="{ 'is-dark': isDarkMode }">
        <div class="container">
            <div class="row justify-content-center mb-4">
                <div class="col-12 col-xl-10">
                    <div class="library-hero shadow-sm">
                        <div class="library-head text-center">
                            <h1 class="library-title mb-2">Articles, fatawa, and books</h1>
                            <p class="library-subtitle mb-0 mx-auto">
                                Search and read the latest English material from IslamHouse in a cleaner, lighter reading experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center mb-4">
                <div class="col-12 col-xl-10">
                    <LibrarySearchControls
                        :search-query="searchQuery"
                        :active-type="activeType"
                        :sort-by="sortBy"
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
                                        <h2 class="card-title mb-2">{{ item.title }}</h2>
                                        <p class="card-excerpt mb-0">
                                            {{ item.summary || "No summary was available on the source page." }}
                                        </p>
                                    </div>
                                    <div class="card-footer bg-transparent border-0 px-4 pb-4 pt-0">
                                        <button type="button" class="continue-link" @click="openItem(item)">
                                            Continue reading
                                            <i class="bi bi-arrow-right-short" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <div v-if="!loadingInitial && !error" class="text-center mt-4">
                            <button
                                type="button"
                                class="btn btn-outline-primary btn-sm px-4"
                                :disabled="isLoadMoreDisabled"
                                @click="loadMore"
                            >
                                <span v-if="isLoadingMoreActive" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                {{ loadMoreLabel }}
                            </button>
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
            <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-md-down">
                <div class="modal-content shadow-lg border-0">
                    <div v-if="activeItem" class="modal-header border-0 pb-0 px-4 pt-4">
                        <div class="pe-3">
                            <div class="modal-kicker mb-2">
                                {{ activeItem.typeLabel }}
                                <span aria-hidden="true">&middot;</span>
                                {{ activeItem.dateLabel }}
                            </div>
                            <h2 id="islamicLibraryModalTitle" class="modal-title h4 fw-semibold mb-0">
                                {{ activeItem.title }}
                            </h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div v-if="activeItem" class="modal-body px-4 pb-4">
                        <div class="reader-toolbar shadow-sm">
                            <button type="button" class="reader-icon" @click="decreaseFontSize" aria-label="Decrease text size">
                                <i class="bi bi-dash-lg"></i>
                            </button>
                            <button type="button" class="reader-icon" @click="resetFontSize" aria-label="Reset text size">
                                <i class="bi bi-type"></i>
                            </button>
                            <button type="button" class="reader-icon" @click="increaseFontSize" aria-label="Increase text size">
                                <i class="bi bi-plus-lg"></i>
                            </button>
                            <span class="toolbar-divider" aria-hidden="true"></span>
                            <button type="button" class="reader-icon" @click="toggleSummary" aria-label="Toggle AI summary">
                                <i class="bi bi-stars"></i>
                            </button>
                            <button type="button" class="reader-icon" @click="toggleAudioPanel" aria-label="Open audio reader settings">
                                <i class="bi bi-headphones"></i>
                            </button>
                            <button type="button" class="reader-icon" @click="shareActiveItem" aria-label="Share this item">
                                <i class="bi bi-share"></i>
                            </button>
                            <button type="button" class="reader-icon" @click="printActiveItem" aria-label="Print this item">
                                <i class="bi bi-printer"></i>
                            </button>
                        </div>

                        <div v-if="showSummary" class="reader-panel shadow-sm">
                            <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
                                <div>
                                    <h3 class="h6 fw-semibold mb-1">AI Summary</h3>
                                    <p class="small text-muted mb-0">AI-generated summary. Verify with the original text.</p>
                                </div>
                                <button
                                    v-if="!activeItem.aiSummary"
                                    type="button"
                                    class="btn btn-sm btn-primary"
                                    @click="generateSummary"
                                    :disabled="detailLoading || !activeItem.contentText"
                                >
                                    Generate
                                </button>
                            </div>
                            <div v-if="activeItem.aiSummary">
                                <p class="mb-2">{{ activeItem.aiSummary.overview }}</p>
                                <ul class="mb-0">
                                    <li v-for="(point, index) in activeItem.aiSummary.points" :key="'summary-' + index">{{ point }}</li>
                                </ul>
                            </div>
                            <p v-else class="small text-muted mb-0">No summary has been generated yet.</p>
                        </div>

                        <div v-if="showAudioPanel" class="reader-panel shadow-sm">
                            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-3">
                                <div>
                                    <h3 class="h6 fw-semibold mb-1">Audio Reader</h3>
                                    <p class="small text-muted mb-0">Listen with your browser voice settings.</p>
                                </div>
                                <div class="d-flex gap-2">
                                    <button type="button" class="btn btn-sm btn-primary" @click="playSpeech">
                                        Play
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="pauseSpeech" :disabled="!speech.isSpeaking || speech.isPaused">
                                        Pause
                                    </button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="stopSpeech">
                                        Stop
                                    </button>
                                </div>
                            </div>

                            <div v-if="speechSupported" class="row g-3 align-items-end">
                                <div class="col-12 col-lg-6">
                                    <label for="voiceSelect" class="filter-label">Voice</label>
                                    <select id="voiceSelect" v-model="speech.selectedVoiceURI" class="filter-select" @change="restartSpeechIfActive">
                                        <optgroup v-if="voiceGroups.male.length" label="Male voices">
                                            <option v-for="voice in voiceGroups.male" :key="voice.voiceURI" :value="voice.voiceURI">
                                                {{ voice.name }}
                                            </option>
                                        </optgroup>
                                        <optgroup v-if="voiceGroups.female.length" label="Female voices">
                                            <option v-for="voice in voiceGroups.female" :key="voice.voiceURI" :value="voice.voiceURI">
                                                {{ voice.name }}
                                            </option>
                                        </optgroup>
                                        <optgroup v-if="voiceGroups.other.length" label="Other voices">
                                            <option v-for="voice in voiceGroups.other" :key="voice.voiceURI" :value="voice.voiceURI">
                                                {{ voice.name }}
                                            </option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div class="col-12 col-lg-3">
                                    <label for="speedSelect" class="filter-label">Speed</label>
                                    <select id="speedSelect" v-model.number="speech.rate" class="filter-select" @change="restartSpeechIfActive">
                                        <option v-for="speed in speechRates" :key="speed.value" :value="speed.value">{{ speed.label }}</option>
                                    </select>
                                </div>
                                <div class="col-12 col-lg-3">
                                    <label for="audioProgress" class="filter-label">Progress</label>
                                    <input
                                        id="audioProgress"
                                        type="range"
                                        class="form-range mb-1"
                                        min="0"
                                        max="100"
                                        step="1"
                                        :value="speech.progressPercent"
                                        @change="seekSpeech"
                                    >
                                    <div class="small text-muted">{{ formatDuration(speech.elapsedSeconds) }} / {{ formatDuration(speech.totalSeconds) }}</div>
                                </div>
                            </div>
                            <p v-else class="small text-muted mb-0">Speech synthesis is not supported in this browser.</p>
                        </div>

                        <div v-if="detailLoading" class="reader-state py-5 text-center">
                            <div class="spinner-border text-primary mb-3" aria-hidden="true"></div>
                            <div>Loading the full text...</div>
                        </div>

                        <div v-else-if="detailError" class="alert alert-warning border-0 shadow-sm mt-3 mb-0">
                            {{ detailError }}
                        </div>

                        <div v-else class="reader-surface shadow-sm mt-3">
                            <div class="reader-content" :style="{ fontSize: contentFontSize + 'px' }" v-html="activeItem.contentHtml"></div>
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
            pdfJsLoader: null,
        };
    },
    computed: {
        isDarkMode() {
            return !!(this.darkModeState && this.darkModeState.isDarkMode);
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

                    return [item.title, item.summary, item.typeLabel]
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
    mounted() {
        this.speechSupported =
            typeof window !== "undefined" &&
            "speechSynthesis" in window &&
            typeof window.SpeechSynthesisUtterance !== "undefined";
        this.initializeModal();
        this.loadVoices();
        this.loadInitial();
    },
    beforeUnmount() {
        this.stopSpeech();
    },
    methods: {
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
            } catch (error) {
                this.error = error.message || "The IslamHouse library pages could not be loaded.";
            } finally {
                this.loadingInitial = false;
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
                });
            } catch (error) {
                this.error = error.message || "Additional items could not be loaded.";
            } finally {
                this.loadMoreBusy = false;
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
                    const summaryNode = body.parentElement && body.parentElement.nextElementSibling
                        ? body.parentElement.nextElementSibling.querySelector("p.lead")
                        : null;
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
                        summary: this.cleanText(summaryNode ? summaryNode.textContent : ""),
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
        async fetchPageDetail(item) {
            const html = await this.fetchTextWithCache(item.url, `islamhouse-detail-${item.type}-${item.id}`);
            const doc = new DOMParser().parseFromString(html, "text/html");
            const titleNode = doc.querySelector("h1.text-center b, h1.text-center, h1 b, h1");
            const descriptionNode = this.findDetailSection(doc, "Description");
            const contentRoot = doc.querySelector(".full-description");
            const pageTitle = this.cleanText(titleNode ? titleNode.textContent : item.title);
            const descriptionText = this.extractSectionText(descriptionNode) || item.summary;
            const primaryAttachment = this.getPrimaryAttachment(doc);

            if (contentRoot) {
                const cleaned = this.cleanReaderHtml(contentRoot, pageTitle);
                const plainText = this.cleanText(cleaned.textContent);

                return {
                    title: pageTitle,
                    summary: descriptionText || item.summary,
                    contentHtml: cleaned.innerHTML,
                    contentText: plainText,
                    sourceUrl: item.url,
                    readerReady: true,
                };
            }

            if (primaryAttachment) {
                if (primaryAttachment.extension === "pdf") {
                    try {
                        const extracted = await this.extractPdfText(primaryAttachment.url);
                        if (extracted && extracted.text) {
                            return {
                                title: pageTitle,
                                summary: descriptionText || item.summary,
                                contentHtml: this.buildExtractedTextHtml(extracted.text, primaryAttachment.url, extracted.truncated),
                                contentText: extracted.text,
                                sourceUrl: primaryAttachment.url,
                                readerReady: false,
                            };
                        }
                    } catch (error) {}
                }

                const fallbackText =
                    descriptionText ||
                    "IslamHouse does not publish inline text for this item on the detail page. The source document is available below.";
                const contentHtml = this.buildAttachmentPreview(primaryAttachment, fallbackText);

                return {
                    title: pageTitle,
                    summary: descriptionText || item.summary,
                    contentHtml,
                    contentText: fallbackText,
                    sourceUrl: primaryAttachment.url,
                    readerReady: false,
                };
            }

            throw new Error("The IslamHouse detail page did not expose readable content.");
        },
        async ensurePdfJs() {
            if (typeof window === "undefined") {
                throw new Error("PDF extraction is only available in the browser.");
            }

            if (window.pdfjsLib) {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                return window.pdfjsLib;
            }

            if (!this.pdfJsLoader) {
                this.pdfJsLoader = new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
                    script.async = true;
                    script.onload = () => {
                        if (!window.pdfjsLib) {
                            reject(new Error("PDF.js did not initialize."));
                            return;
                        }

                        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                        resolve(window.pdfjsLib);
                    };
                    script.onerror = () => reject(new Error("PDF.js failed to load."));
                    document.head.appendChild(script);
                });
            }

            return this.pdfJsLoader;
        },
        async extractPdfText(url) {
            const cacheKey = `islamhouse-pdf-text-${this.hashString(url)}`;
            const cached = this.readCache(cacheKey);
            if (cached) {
                return cached;
            }

            const pdfjsLib = await this.ensurePdfJs();
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`PDF fetch failed with ${response.status}`);
            }

            const data = await response.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data }).promise;
            const maxPages = Math.min(pdf.numPages, 40);
            const pages = [];

            for (let pageNumber = 1; pageNumber <= maxPages; pageNumber += 1) {
                const page = await pdf.getPage(pageNumber);
                const content = await page.getTextContent();
                const pageText = this.normalizePdfItems(content.items || []);
                if (pageText) {
                    pages.push(pageText);
                }
            }

            const result = {
                text: this.cleanText(pages.join("\n\n")),
                truncated: pdf.numPages > maxPages,
            };
            this.writeCache(cacheKey, result);
            return result;
        },
        normalizePdfItems(items) {
            if (!Array.isArray(items) || !items.length) {
                return "";
            }

            const lines = [];
            let currentY = null;
            let currentLine = [];

            items.forEach((item) => {
                const value = this.cleanText(item.str);
                if (!value) {
                    return;
                }

                const y = item.transform && typeof item.transform[5] === "number"
                    ? Math.round(item.transform[5])
                    : currentY;

                if (currentY === null) {
                    currentY = y;
                }

                if (Math.abs((y || 0) - (currentY || 0)) > 2) {
                    if (currentLine.length) {
                        lines.push(currentLine.join(" "));
                    }
                    currentLine = [value];
                    currentY = y;
                    return;
                }

                currentLine.push(value);
            });

            if (currentLine.length) {
                lines.push(currentLine.join(" "));
            }

            return lines
                .map((line) => line.replace(/\s+([,.;:?])/g, "$1"))
                .join("\n");
        },
        buildExtractedTextHtml(text, sourceUrl, truncated) {
            const paragraphs = String(text || "")
                .split(/\n{2,}/)
                .map((paragraph) => this.cleanText(paragraph))
                .filter(Boolean)
                .map((paragraph) => `<p>${this.escapeHtml(paragraph)}</p>`)
                .join("");

            return `
                <div class="attachment-preview">
                    <div class="attachment-note">
                        Text extracted from the source PDF${truncated ? " (first 40 pages)." : "."}
                    </div>
                    <div class="attachment-actions">
                        <a href="${this.escapeHtml(sourceUrl)}" target="_blank" rel="noopener noreferrer" class="continue-link">
                            Open original PDF
                            <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div class="extracted-text">${paragraphs}</div>
                </div>
            `;
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
        hashString(value) {
            let hash = 0;
            const text = String(value || "");
            for (let index = 0; index < text.length; index += 1) {
                hash = ((hash << 5) - hash) + text.charCodeAt(index);
                hash |= 0;
            }
            return Math.abs(hash).toString(36);
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
                    <p>${safeText}</p>
                    <div class="attachment-actions">
                        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="continue-link">
                            Open ${safeLabel}
                            <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                        </a>
                    </div>
                    ${
                        isPdf
                            ? `<iframe class="attachment-frame" src="${safeUrl}" title="${safeLabel}" loading="lazy"></iframe>`
                            : `<div class="attachment-note">Preview is unavailable for this file type. Open the source document to read it.</div>`
                    }
                </div>
            `;
        },
        cleanReaderHtml(rootNode, title) {
            const clone = rootNode.cloneNode(true);
            clone.querySelectorAll("script, style, iframe, img, svg, button, form").forEach((node) => node.remove());
            clone.querySelectorAll("a.fnote, .fnote").forEach((node) => node.remove());

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
                    /English/i.test(text) ||
                    /^[0-9]{4}\s*-\s*[0-9]{4}$/.test(text) ||
                    /^[0-9]+\s*-\s*[0-9]+$/.test(text) ||
                    isCenter;

                if (removable) {
                    paragraph.remove();
                    return;
                }

                shouldTrimFrontMatter = false;
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
        restartSpeechIfActive() {
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
    --library-bg: linear-gradient(180deg, rgba(243, 250, 245, 0.96), rgba(236, 248, 240, 0.98));
    --library-surface: rgba(255, 255, 255, 0.94);
    --library-soft: #f3f7f4;
    --library-text: #0f172a;
    --library-muted: #5f6f67;
    --library-accent: #1f7a4d;
    --library-shadow: 0 14px 34px rgba(18, 54, 34, 0.08);
    --library-shadow-soft: 0 8px 24px rgba(18, 54, 34, 0.05);
    color: var(--library-text);
}

.islamic-library.is-dark {
    --library-bg: linear-gradient(180deg, rgba(10, 26, 18, 0.92), rgba(14, 32, 22, 0.98));
    --library-surface: rgba(20, 37, 27, 0.9);
    --library-soft: rgba(12, 24, 17, 0.72);
    --library-text: #e2e8f0;
    --library-muted: #9ab0a3;
    --library-accent: #7bd19f;
    --library-shadow: 0 18px 36px rgba(2, 12, 6, 0.28);
    --library-shadow-soft: 0 10px 24px rgba(2, 12, 6, 0.22);
}

.islamic-library {
    background: var(--library-bg);
}

.library-shell {
    background: transparent;
}

.library-hero {
    padding: 1.6rem 1.5rem;
    border-radius: 20px;
    background: var(--library-surface);
    box-shadow: var(--library-shadow);
}

.library-title {
    font-size: clamp(1.45rem, 2vw, 1.9rem);
    font-weight: 700;
    letter-spacing: -0.02em;
}

.library-subtitle {
    max-width: 42rem;
    color: var(--library-muted);
    font-size: 0.93rem;
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
    min-height: 218px;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.library-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 36px rgba(18, 54, 34, 0.1);
}

.card-title {
    font-size: 1rem;
    line-height: 1.45;
    font-weight: 600;
    letter-spacing: -0.01em;
}

.card-excerpt {
    color: var(--library-muted);
    font-size: 0.9rem;
    line-height: 1.65;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
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

.modal-content {
    background: var(--library-surface);
    color: var(--library-text);
}

.modal-kicker {
    font-size: 0.78rem;
    color: var(--library-muted);
}

.reader-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.55rem;
}

.reader-icon {
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 20px;
    background: var(--library-soft);
    color: var(--library-text);
    box-shadow: var(--library-shadow-soft);
}

.toolbar-divider {
    width: 1px;
    height: 24px;
    background: rgba(148, 163, 184, 0.28);
    margin: 0 0.2rem;
}

.reader-panel {
    padding: 1rem;
    margin-top: 1rem;
}

.reader-surface {
    padding: 1.25rem;
}

.reader-content {
    line-height: 1.85;
}

.reader-content :deep(p) {
    margin-bottom: 1rem;
    color: var(--library-text);
}

.reader-content :deep(a) {
    color: var(--library-accent);
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
    min-height: 70vh;
    border: 0;
    border-radius: 16px;
    background: #fff;
    box-shadow: var(--library-shadow-soft);
}

.reader-content :deep(.attachment-note) {
    padding: 1rem 1.1rem;
    border-radius: 16px;
    background: var(--library-soft);
    color: var(--library-muted);
}

.reader-content :deep(.center) {
    text-align: center;
}

.reader-content :deep(.justify) {
    text-align: justify;
}

.reader-content :deep(.rtl) {
    direction: rtl;
    text-align: right;
}

.reader-content :deep(.ltr) {
    direction: ltr;
    text-align: left;
}

.reader-footer {
    margin-top: 1rem;
    padding-top: 1rem;
}

@media (max-width: 767.98px) {
    .library-hero {
        padding: 1.3rem 1rem;
    }
}
</style>
