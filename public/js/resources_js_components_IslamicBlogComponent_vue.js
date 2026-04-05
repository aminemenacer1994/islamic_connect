"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_IslamicBlogComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _islamic_library_LibrarySearchControls_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./islamic_library/LibrarySearchControls.vue */ "./resources/components/vue/islamic_library/LibrarySearchControls.vue");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "IslamicBlogComponent",
  components: {
    LibrarySearchControls: _islamic_library_LibrarySearchControls_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  inject: {
    darkModeState: {
      default: null
    }
  },
  data() {
    return {
      baseUrl: "https://islamhouse.com/en",
      typeOptions: [{
        value: "all",
        label: "All types"
      }, {
        value: "articles",
        label: "Articles"
      }, {
        value: "fatwa",
        label: "Fatawa"
      }, {
        value: "books",
        label: "Books"
      }],
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
        books: 1
      },
      maxPages: {
        articles: 1,
        fatwa: 1,
        books: 1
      },
      activeItem: null,
      detailLoading: false,
      detailError: "",
      modalInstance: null,
      contentFontSize: 16,
      showSummary: false,
      showAudioPanel: false,
      speechSupported: false,
      voiceGroups: {
        male: [],
        female: [],
        other: []
      },
      speechRates: [{
        label: "0.75x",
        value: 0.75
      }, {
        label: "1x",
        value: 1
      }, {
        label: "1.25x",
        value: 1.25
      }, {
        label: "1.5x",
        value: 1.5
      }, {
        label: "2x",
        value: 2
      }],
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
        stopRequested: false
      },
      loadMoreObserver: null,
      showScrollTopFab: false,
      previewHydrationQueue: [],
      previewHydrationActiveCount: 0,
      previewHydrationKeys: {}
    };
  },
  computed: {
    isDarkMode() {
      return !!(this.darkModeState && this.darkModeState.isDarkMode);
    },
    availableVoices() {
      return [...this.voiceGroups.female, ...this.voiceGroups.male, ...this.voiceGroups.other];
    },
    activeRenderedContentHtml() {
      if (!this.activeItem || !this.activeItem.contentHtml) {
        return "";
      }
      return this.highlightHtmlContent(this.activeItem.contentHtml, this.searchQuery);
    },
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.items.filter(item => {
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
        return [item.title, item.summary, item.typeLabel, item.publishedBy].join(" ").toLowerCase().includes(query);
      }).sort((left, right) => {
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
      return this.getTypesToLoad().some(type => this.pages[type] < this.maxPages[type]);
    },
    isLoadMoreDisabled() {
      return this.loadMoreBusy || !this.getTypesToLoad().some(type => this.pages[type] < this.maxPages[type]);
    },
    isLoadingMoreActive() {
      return this.loadMoreBusy;
    },
    loadMoreLabel() {
      if (this.loadMoreBusy) {
        return "Loading more";
      }
      return this.isLoadMoreDisabled ? "No more items" : "Load more";
    }
  },
  watch: {
    filteredItems: {
      handler(items) {
        this.queuePreviewHydration((items || []).filter(item => this.shouldHydratePreview(item)));
        this.observeLoadMoreSentinel();
      },
      deep: false
    }
  },
  mounted() {
    this.speechSupported = typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance !== "undefined";
    this.initializeModal();
    this.initializeInfiniteScroll();
    this.loadVoices();
    this.loadInitial();
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", this.handleWindowScroll, {
        passive: true
      });
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
      this.loadMoreObserver = new window.IntersectionObserver(entries => {
        const shouldLoad = entries.some(entry => entry.isIntersecting);
        if (!shouldLoad || this.loadingInitial || this.error || this.isLoadMoreDisabled) {
          return;
        }
        this.loadMore();
      }, {
        rootMargin: "720px 0px 720px 0px"
      });
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
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = window.scrollY / maxScroll;
      this.showScrollTopFab = progress >= 0.3;
    },
    scrollToTop() {
      if (typeof window === "undefined") {
        return;
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    initializeModal() {
      this.$nextTick(() => {
        if (!this.$refs.detailModal) {
          return;
        }
        this.modalInstance = new bootstrap__WEBPACK_IMPORTED_MODULE_0__.Modal(this.$refs.detailModal);
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
      this.pages = {
        articles: 1,
        fatwa: 1,
        books: 1
      };
      try {
        const results = await Promise.all([this.fetchTypePage("articles", 1), this.fetchTypePage("fatwa", 1), this.fetchTypePage("books", 1)]);
        this.items = this.mergeItems([], results.flatMap(result => result.items));
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
      const targets = this.getTypesToLoad().filter(type => this.pages[type] < this.maxPages[type]);
      if (!targets.length || this.loadMoreBusy) {
        return;
      }
      this.loadMoreBusy = true;
      try {
        const results = await Promise.all(targets.map(type => this.fetchTypePage(type, this.pages[type] + 1)));
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
      items.filter(item => item && this.shouldHydratePreview(item)).forEach(item => {
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
        this.fetchItemPreview(item).then(preview => {
          const merged = _objectSpread(_objectSpread({}, item), {}, {
            summary: preview.summary || item.summary,
            publishedBy: preview.publishedBy || item.publishedBy,
            sourceUrl: preview.sourceUrl || item.sourceUrl,
            hasPdf: typeof preview.hasPdf === "boolean" ? preview.hasPdf : item.hasPdf,
            formatLabel: preview.formatLabel || item.formatLabel
          });
          this.items = this.mergeItems(this.items, [merged]);
        }).catch(() => {}).finally(() => {
          this.previewHydrationActiveCount = Math.max(0, this.previewHydrationActiveCount - 1);
          this.processPreviewHydrationQueue();
        });
      }
    },
    buildListUrl(type, page) {
      return `${this.baseUrl}/${type}/en/${page}`;
    },
    async fetchTypePage(type, page) {
      const html = await this.fetchTextWithCache(this.buildListUrl(type, page), `islamhouse-list-${type}-${page}`);
      return this.parseListingHtml(html, type, page);
    },
    async fetchTextWithCache(url, cacheKey) {
      const cached = this.readCache(cacheKey);
      if (cached) {
        return cached;
      }
      const response = await fetch(url, {
        headers: {
          Accept: "text/html"
        }
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
      const items = links.map((link, index) => {
        var _metaInfo$querySelect, _metaInfo$querySelect2;
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
          formatLabel: this.cleanText(metaInfo ? (_metaInfo$querySelect = metaInfo.querySelector(".badge strong, .badge b, .badge")) === null || _metaInfo$querySelect === void 0 ? void 0 : _metaInfo$querySelect.textContent : ""),
          hasPdf: /pdf/i.test(this.cleanText(metaInfo ? (_metaInfo$querySelect2 = metaInfo.querySelector(".badge strong, .badge b, .badge")) === null || _metaInfo$querySelect2 === void 0 ? void 0 : _metaInfo$querySelect2.textContent : "")),
          dateLabel: parsedDate.label || "Date unavailable",
          sortTimestamp: parsedDate.timestamp,
          page,
          readerReady: type !== "books",
          detailLoaded: false,
          contentHtml: "",
          contentText: "",
          aiSummary: null
        };
      }).filter(Boolean);
      const pageNumbers = Array.from(doc.querySelectorAll(".pagination a")).map(node => Number.parseInt(this.cleanText(node.textContent), 10)).filter(value => Number.isFinite(value));
      return {
        items,
        maxPages: pageNumbers.length ? Math.max(...pageNumbers) : page
      };
    },
    mergeItems(current, incoming) {
      const map = new Map();
      current.forEach(item => map.set(item.key, item));
      incoming.forEach(item => {
        const previous = map.get(item.key) || {};
        map.set(item.key, _objectSpread(_objectSpread({}, previous), item));
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
        return {
          timestamp: 0,
          label: ""
        };
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
          year: "numeric"
        }).format(date)
      };
    },
    cleanText(value) {
      return String(value || "").replace(/\s+/g, " ").replace(/\u00a0/g, " ").trim();
    },
    cleanMultilineText(value) {
      return String(value || "").replace(/\u00a0/g, " ").replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ").trim();
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
      return text.replace(/^description\s*/i, "").replace(/^[\s:;.,-]+/, "").replace(/\s+/g, " ").trim();
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
      const suffix = this.cleanText([this.cleanText(item.publishedBy) ? `Published by ${this.getCardPublisher(item)}.` : "", this.isPdfCard(item) ? "Includes PDF access." : "", `Continue reading the full ${this.cleanText(item.typeLabel || item.type || "item").toLowerCase()} on IslamHouse.`].join(" "));
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
      return Array.from(new Set(this.cleanText(query).split(/\s+/).map(term => term.trim()).filter(term => term.length >= 2)));
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
      const regex = new RegExp(`(${terms.map(term => this.escapeRegExp(term)).join("|")})`, "gi");
      return value.split(regex).map(part => {
        if (!part) {
          return "";
        }
        const isMatch = terms.some(term => part.toLowerCase() === term.toLowerCase());
        return isMatch ? `<mark class="search-highlight">${this.escapeHtml(part)}</mark>` : this.escapeHtml(part);
      }).join("");
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
      const regex = new RegExp(`(${terms.map(term => this.escapeRegExp(term)).join("|")})`, "gi");
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
      nodes.forEach(node => {
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
        localStorage.setItem(this.resolveCacheKey(key), JSON.stringify({
          value,
          expiresAt: Date.now() + 60 * 60 * 1000
        }));
      } catch (error) {}
    },
    async openItem(item) {
      this.activeItem = _objectSpread({}, item);
      this.showSummary = false;
      this.showAudioPanel = false;
      this.detailLoading = true;
      this.detailError = "";
      this.modalInstance && this.modalInstance.show();
      try {
        const detail = await this.fetchItemDetail(item);
        this.activeItem = _objectSpread(_objectSpread(_objectSpread({}, this.activeItem), detail), {}, {
          detailLoaded: true
        });
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
      const publishedBy = this.extractContributor(doc) || this.cleanText(metaAuthor ? metaAuthor.getAttribute("content") : "") || item.publishedBy;
      const summary = this.normalizeOverviewText(this.extractSectionText(descriptionNode), pageTitle) || this.normalizeOverviewText(this.extractContentPreviewText(contentRoot), pageTitle) || this.normalizeOverviewText(metaDescription ? metaDescription.getAttribute("content") : "", pageTitle) || this.buildFallbackOverview(item, publishedBy, pageTitle);
      return {
        title: pageTitle,
        summary,
        publishedBy,
        sourceUrl: item.url,
        hasPdf: !!(primaryAttachment && primaryAttachment.extension === "pdf"),
        formatLabel: primaryAttachment && primaryAttachment.extension ? primaryAttachment.extension.toUpperCase() : item.formatLabel
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
          formatLabel: primaryAttachment && primaryAttachment.extension ? primaryAttachment.extension.toUpperCase() : item.formatLabel
        };
      }
      if (primaryAttachment) {
        const fallbackText = descriptionText || this.buildFallbackOverview(item, publishedBy, pageTitle);
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
          formatLabel: primaryAttachment.extension ? primaryAttachment.extension.toUpperCase() : item.formatLabel
        };
      }
      throw new Error("The IslamHouse detail page did not expose readable content.");
    },
    extractContributor(doc) {
      const contributorLink = doc.querySelector(".panel-heading .class a, .panel-heading .class em a");
      return this.cleanText(contributorLink ? contributorLink.textContent : "");
    },
    findDetailSection(doc, headingText) {
      return Array.from(doc.querySelectorAll(".bg-default.padding.bordered-bottom")).find(node => {
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
      const candidates = Array.from(rootNode.querySelectorAll("p, li")).map(node => this.cleanText(node.textContent)).filter(text => this.isMeaningfulPreviewText(text));
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
      return !(/^english$/i.test(value) || /www\.islamreligion\.com/i.test(value) || /^[0-9]{4}\s*-\s*[0-9]{4}$/.test(value) || /^[0-9]+\s*-\s*[0-9]+$/.test(value) || /^[\[\(]?\s*english\s*[-–]/i.test(value));
    },
    getPrimaryAttachment(doc) {
      const attachments = Array.from(doc.querySelectorAll('#attachs a[href*="d1.islamhouse.com"], a[href*="d1.islamhouse.com"]')).map(link => {
        const url = link.href;
        if (!url) {
          return null;
        }
        const label = this.cleanText(link.textContent);
        const extensionMatch = url.match(/\.([a-z0-9]+)(?:$|\?)/i);
        return {
          url,
          label: label || "Source file",
          extension: extensionMatch ? extensionMatch[1].toLowerCase() : ""
        };
      }).filter(Boolean);
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
                    ${isPdf ? `<iframe class="attachment-frame" src="${safeUrl}#view=FitH" title="${safeLabel}" loading="lazy"></iframe>` : `<div class="attachment-note">Preview is unavailable for this file type. Open the source document to read it.</div>`}
                </div>
            `;
    },
    cleanReaderHtml(rootNode, title) {
      const clone = rootNode.cloneNode(true);
      clone.querySelectorAll("script, style, iframe, img, svg, button, form").forEach(node => node.remove());
      clone.querySelectorAll("a.fnote, .fnote").forEach(node => node.remove());
      clone.querySelectorAll("ul:empty, ol:empty, p:empty, div:empty, span:empty, br").forEach(node => node.remove());
      const paragraphs = Array.from(clone.querySelectorAll("p"));
      let shouldTrimFrontMatter = true;
      paragraphs.forEach(paragraph => {
        if (!shouldTrimFrontMatter) {
          return;
        }
        const text = this.cleanText(paragraph.textContent);
        const classes = paragraph.className || "";
        const isCenter = classes.includes("center");
        const removable = !text || text === title || /www\.islamreligion\.com/i.test(text) || /^english$/i.test(text) || /^[0-9]{4}\s*-\s*[0-9]{4}$/.test(text) || /^[0-9]+\s*-\s*[0-9]+$/.test(text) || isCenter;
        if (removable) {
          paragraph.remove();
          return;
        }
        shouldTrimFrontMatter = false;
      });
      this.removeLeadingNavigationBlocks(clone, title);
      clone.querySelectorAll("hr").forEach(node => {
        if (!node.previousElementSibling || node.previousElementSibling.tagName === "P") {
          node.remove();
        }
      });
      clone.querySelectorAll("div").forEach(node => {
        const text = this.cleanText(node.textContent);
        if (!text && !node.children.length) {
          node.remove();
          return;
        }
        if (text && node.children.length === 1 && node.firstElementChild && node.classList.length === 0) {
          node.replaceWith(node.firstElementChild);
        }
      });
      clone.querySelectorAll("*").forEach(node => {
        [...node.attributes].forEach(attribute => {
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
      const leadingLists = Array.from(rootNode.querySelectorAll("ul, ol")).filter(list => {
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
      const items = Array.from(listNode.querySelectorAll("li")).map(node => this.cleanText(node.textContent)).filter(Boolean);
      if (items.length < 3) {
        return false;
      }
      const links = Array.from(listNode.querySelectorAll("a[href]"));
      const mostlyLinks = links.length >= Math.max(3, Math.ceil(items.length * 0.6));
      const mostlyInternal = links.length > 0 && links.every(link => {
        const href = link.getAttribute("href") || "";
        return !href || href.startsWith("#") || href.includes("#note_") || href.includes("#ref_");
      });
      const significantWords = this.cleanText(title).toLowerCase().split(/\s+/).filter(word => word.length > 3);
      const titleMatches = items.filter(item => significantWords.some(word => item.toLowerCase().includes(word))).length;
      return mostlyLinks && (mostlyInternal || titleMatches >= Math.max(2, Math.floor(items.length / 2)));
    },
    escapeHtml(text) {
      return String(text || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
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
      const points = sentences.filter(sentence => keywords.some(keyword => sentence.toLowerCase().includes(keyword))).slice(0, 4);
      this.activeItem.aiSummary = {
        overview: overview || "Summary unavailable from the current text.",
        points: (points.length ? points : sentences.slice(0, 4)).map(sentence => sentence.length > 180 ? `${sentence.slice(0, 177)}...` : sentence)
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
          const firstVoice = this.voiceGroups.female[0] || this.voiceGroups.male[0] || this.voiceGroups.other[0];
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
      voices.forEach(voice => {
        const name = (voice.name || "").toLowerCase();
        if (femaleHints.some(hint => name.includes(hint))) {
          female.push(voice);
        } else if (maleHints.some(hint => name.includes(hint))) {
          male.push(voice);
        } else {
          other.push(voice);
        }
      });
      return {
        male: male.slice(0, 6),
        female: female.slice(0, 6),
        other: other.slice(0, 10)
      };
    },
    getSelectedVoice() {
      return this.speech.allVoices.find(voice => voice.voiceURI === this.speech.selectedVoiceURI) || null;
    },
    prepareSpeechDurations(sentences) {
      this.speech.sentenceDurations = sentences.map(sentence => {
        const words = this.cleanText(sentence).split(/\s+/).filter(Boolean).length;
        return Math.max(0.8, words / (150 * this.speech.rate) * 60);
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
      return (String(text || "").match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map(sentence => this.cleanText(sentence)).filter(Boolean);
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
        this.speech.sentenceStartedAt = Date.now() - this.speech.pausedSentenceElapsed * 1000;
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
        this.speech.progressPercent = this.speech.totalSeconds ? Math.min(100, Math.round(this.speech.elapsedSeconds / this.speech.totalSeconds * 100)) : 0;
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
      const targetSeconds = targetPercent / 100 * this.speech.totalSeconds;
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
        url: this.activeItem.sourceUrl
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
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "LibrarySearchControls",
  props: {
    searchQuery: {
      type: String,
      default: ""
    },
    activeType: {
      type: String,
      default: "all"
    },
    sortBy: {
      type: String,
      default: "newest"
    },
    resultCount: {
      type: Number,
      default: 0
    },
    readerFilter: {
      type: String,
      default: "all"
    },
    typeOptions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: ["update:searchQuery", "update:activeType", "update:sortBy", "update:readerFilter"]
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamicBlogComponent.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamicBlogComponent.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_IslamicBlogComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_IslamicBlogComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/IslamicBlogComponent.vue */ "./resources/components/vue/IslamicBlogComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=template&id=f111cd26&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=template&id=f111cd26&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container"
};
const _hoisted_2 = {
  class: "row justify-content-center mb-3"
};
const _hoisted_3 = {
  class: "col-12 col-xl-10"
};
const _hoisted_4 = {
  class: "row justify-content-center"
};
const _hoisted_5 = {
  class: "col-12 col-xl-10"
};
const _hoisted_6 = {
  class: "library-shell"
};
const _hoisted_7 = {
  key: 0,
  class: "row g-3"
};
const _hoisted_8 = {
  key: 1,
  class: "library-message alert alert-warning border-0 shadow-sm mb-0"
};
const _hoisted_9 = {
  class: "d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
};
const _hoisted_10 = {
  class: "small"
};
const _hoisted_11 = {
  key: 2,
  class: "library-message card shadow-sm border-0"
};
const _hoisted_12 = {
  key: 3,
  class: "row g-3"
};
const _hoisted_13 = {
  class: "library-card card shadow-sm border-0 h-100"
};
const _hoisted_14 = {
  class: "card-body p-4 d-flex flex-column"
};
const _hoisted_15 = ["innerHTML"];
const _hoisted_16 = ["innerHTML"];
const _hoisted_17 = {
  key: 0,
  class: "card-excerpt-secondary mb-0"
};
const _hoisted_18 = {
  key: 1,
  class: "card-excerpt-placeholder",
  "aria-hidden": "true"
};
const _hoisted_19 = {
  class: "card-read-more"
};
const _hoisted_20 = ["onClick"];
const _hoisted_21 = {
  class: "card-footer bg-transparent border-0 px-4 pb-4 pt-0"
};
const _hoisted_22 = {
  class: "card-meta-grid"
};
const _hoisted_23 = {
  class: "card-meta-item"
};
const _hoisted_24 = {
  class: "card-meta-item"
};
const _hoisted_25 = {
  key: 4,
  ref: "loadMoreSentinel",
  class: "library-scroll-sentinel",
  "aria-hidden": "true"
};
const _hoisted_26 = {
  key: 0,
  class: "scroll-sentinel-state"
};
const _hoisted_27 = {
  class: "modal fade",
  id: "islamicLibraryModal",
  ref: "detailModal",
  tabindex: "-1",
  "aria-labelledby": "islamicLibraryModalTitle",
  "aria-hidden": "true"
};
const _hoisted_28 = {
  class: "modal-dialog modal-dialog-centered modal-fullscreen-sm-down library-modal-dialog"
};
const _hoisted_29 = {
  class: "modal-content shadow-lg border-0"
};
const _hoisted_30 = {
  key: 0,
  class: "modal-header border-0 pb-0 px-3 px-md-4 pt-3 pt-md-4"
};
const _hoisted_31 = {
  class: "pe-3"
};
const _hoisted_32 = {
  class: "modal-kicker mb-2"
};
const _hoisted_33 = ["innerHTML"];
const _hoisted_34 = {
  key: 1,
  class: "modal-body px-3 px-md-4 pb-3 pb-md-4 pt-3"
};
const _hoisted_35 = {
  class: "reader-toolbar shadow-sm"
};
const _hoisted_36 = {
  class: "reader-toolbar-group reader-toolbar-group--font"
};
const _hoisted_37 = {
  class: "reader-toolbar-group reader-toolbar-group--actions"
};
const _hoisted_38 = {
  key: 0,
  class: "reader-panel shadow-sm"
};
const _hoisted_39 = {
  class: "summary-head d-flex justify-content-between align-items-start gap-3 mb-3"
};
const _hoisted_40 = {
  class: "summary-actions"
};
const _hoisted_41 = ["disabled"];
const _hoisted_42 = {
  key: 0
};
const _hoisted_43 = {
  class: "summary-overview mb-3"
};
const _hoisted_44 = {
  class: "summary-points mb-0"
};
const _hoisted_45 = {
  key: 1,
  class: "small text-muted mb-0"
};
const _hoisted_46 = {
  key: 1,
  class: "reader-state py-5 text-center"
};
const _hoisted_47 = {
  key: 2,
  class: "alert alert-warning border-0 shadow-sm mt-3 mb-0"
};
const _hoisted_48 = {
  key: 3,
  class: "reader-shell mt-3"
};
const _hoisted_49 = {
  class: "reader-surface shadow-sm"
};
const _hoisted_50 = ["innerHTML"];
const _hoisted_51 = {
  key: 0,
  class: "reader-footer"
};
const _hoisted_52 = ["href"];
const _hoisted_53 = {
  key: 0,
  class: "audio-dock shadow-sm"
};
const _hoisted_54 = {
  class: "audio-meta"
};
const _hoisted_55 = {
  class: "audio-title"
};
const _hoisted_56 = {
  class: "audio-subtitle"
};
const _hoisted_57 = {
  class: "audio-main-controls"
};
const _hoisted_58 = {
  class: "audio-controls-cluster"
};
const _hoisted_59 = ["aria-label"];
const _hoisted_60 = {
  class: "audio-progress-inline"
};
const _hoisted_61 = ["value", "aria-label"];
const _hoisted_62 = {
  class: "audio-side-controls"
};
const _hoisted_63 = {
  class: "audio-volume"
};
const _hoisted_64 = ["value"];
const _hoisted_65 = {
  key: 1,
  class: "audio-unsupported"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_LibrarySearchControls = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("LibrarySearchControls");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["islamic-library py-4 py-lg-5", {
      'is-dark': $options.isDarkMode,
      'has-audio-dock': $data.showAudioPanel && $data.activeItem
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row justify-content-center mb-3\" data-v-f111cd26><div class=\"col-12 col-xl-10\" data-v-f111cd26><div class=\"library-hero shadow-sm\" data-v-f111cd26><div class=\"library-head text-center\" data-v-f111cd26><h1 class=\"library-title mb-1\" data-v-f111cd26>Articles, fatawa, and books</h1><p class=\"library-subtitle mb-0 mx-auto\" data-v-f111cd26> Search and read the latest English material from IslamHouse in a cleaner, lighter reading experience. </p></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_LibrarySearchControls, {
    "search-query": $data.searchQuery,
    "active-type": $data.activeType,
    "sort-by": $data.sortBy,
    "result-count": $options.filteredItems.length,
    "reader-filter": $data.readerFilter,
    "type-options": $data.typeOptions,
    "onUpdate:searchQuery": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    "onUpdate:activeType": _cache[1] || (_cache[1] = $event => $data.activeType = $event),
    "onUpdate:sortBy": _cache[2] || (_cache[2] = $event => $data.sortBy = $event),
    "onUpdate:readerFilter": _cache[3] || (_cache[3] = $event => $data.readerFilter = $event)
  }, null, 8 /* PROPS */, ["search-query", "active-type", "sort-by", "result-count", "reader-filter", "type-options"])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [$data.loadingInitial ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(6, n => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: 'skeleton-' + n,
      class: "col-12 col-md-6 col-xl-4"
    }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"library-card card shadow-sm border-0\" data-v-f111cd26><div class=\"card-body p-4\" data-v-f111cd26><div class=\"placeholder-glow\" data-v-f111cd26><span class=\"placeholder col-10 mb-2\" data-v-f111cd26></span><span class=\"placeholder col-7 mb-4\" data-v-f111cd26></span><span class=\"placeholder col-12 mb-2\" data-v-f111cd26></span><span class=\"placeholder col-12 mb-2\" data-v-f111cd26></span><span class=\"placeholder col-8 mb-0\" data-v-f111cd26></span></div></div></div>", 1)]))]);
  }), 64 /* STABLE_FRAGMENT */))])) : $data.error ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
    class: "d-block mb-1"
  }, "Unable to load the IslamHouse library", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.error), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-primary btn-sm",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.loadInitial && $options.loadInitial(...args))
  }, "Retry")])])) : !$options.filteredItems.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_11, [...(_cache[24] || (_cache[24] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-body py-5 text-center"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "h6 fw-semibold mb-2"
  }, "No matching items found"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0"
  }, "Adjust the search or filters to broaden the result set.")], -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredItems, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.key,
      class: "col-12 col-md-6 col-xl-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["card-type-chip", {
        'card-type-chip--pdf': $options.isPdfCard(item)
      }])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getCardChipLabel(item)), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "card-title mb-2",
      innerHTML: $options.highlightText(item.title)
    }, null, 8 /* PROPS */, _hoisted_15), $options.getCardExcerpt(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: 0
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "card-excerpt mb-0",
      innerHTML: $options.getHighlightedExcerpt(item)
    }, null, 8 /* PROPS */, _hoisted_16), $options.getCardExcerptSecondary(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getCardExcerptSecondary(item)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [...(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "placeholder col-12 mb-2"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "placeholder col-12 mb-2"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "placeholder col-8"
    }, null, -1 /* CACHED */)]))])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "continue-link continue-link--inline",
      onClick: $event => $options.openItem(item)
    }, " Read more ", 8 /* PROPS */, _hoisted_20)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-person-circle",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Published by " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getCardPublisher(item)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-calendar3",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.dateLabel), 1 /* TEXT */)])])])])]);
  }), 128 /* KEYED_FRAGMENT */))])), !$data.loadingInitial && !$data.error && $options.hasMoreItems ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [$options.isLoadingMoreActive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [...(_cache[28] || (_cache[28] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "spinner-border spinner-border-sm",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Loading more material", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [$data.activeItem ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.activeItem.typeLabel) + " ", 1 /* TEXT */), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "aria-hidden": "true"
  }, "·", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.activeItem.dateLabel), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "islamicLibraryModalTitle",
    class: "modal-title h4 fw-semibold mb-0",
    innerHTML: $options.highlightText($data.activeItem.title)
  }, null, 8 /* PROPS */, _hoisted_33)]), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.activeItem ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-icon",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.decreaseFontSize && $options.decreaseFontSize(...args)),
    "aria-label": "Decrease text size"
  }, [...(_cache[32] || (_cache[32] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-dash-lg"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-icon",
    onClick: _cache[6] || (_cache[6] = (...args) => $options.resetFontSize && $options.resetFontSize(...args)),
    "aria-label": "Reset text size"
  }, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-type"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-icon",
    onClick: _cache[7] || (_cache[7] = (...args) => $options.increaseFontSize && $options.increaseFontSize(...args)),
    "aria-label": "Increase text size"
  }, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg"
  }, null, -1 /* CACHED */)]))])]), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "toolbar-divider",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["reader-tool-btn", {
      'is-active': $data.showSummary
    }]),
    onClick: _cache[8] || (_cache[8] = (...args) => $options.toggleSummary && $options.toggleSummary(...args)),
    "aria-label": "Toggle AI summary"
  }, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stars",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Summary", -1 /* CACHED */)]))], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["reader-tool-btn", {
      'is-active': $data.showAudioPanel
    }]),
    onClick: _cache[9] || (_cache[9] = (...args) => $options.toggleAudioPanel && $options.toggleAudioPanel(...args)),
    "aria-label": "Open audio reader settings"
  }, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-headphones",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Listen", -1 /* CACHED */)]))], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-tool-btn",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.shareActiveItem && $options.shareActiveItem(...args)),
    "aria-label": "Share this item"
  }, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-share",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "reader-tool-btn",
    onClick: _cache[11] || (_cache[11] = (...args) => $options.printActiveItem && $options.printActiveItem(...args)),
    "aria-label": "Print this item"
  }, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-printer",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))])])]), $data.showSummary ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "summary-kicker"
  }, "AI summary"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "h6 fw-semibold mb-1"
  }, "Quick overview of the article"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "small text-muted mb-0"
  }, "AI-generated summary. Verify with the original text.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [!$data.activeItem.aiSummary ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "summary-generate-btn",
    onClick: _cache[12] || (_cache[12] = (...args) => $options.generateSummary && $options.generateSummary(...args)),
    disabled: $data.detailLoading || !$data.activeItem.contentText
  }, " Generate ", 8 /* PROPS */, _hoisted_41)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "summary-collapse-btn",
    onClick: _cache[13] || (_cache[13] = (...args) => $options.toggleSummary && $options.toggleSummary(...args)),
    "aria-label": "Minimize AI summary"
  }, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-up",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])])]), $data.activeItem.aiSummary ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.activeItem.aiSummary.overview), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.activeItem.aiSummary.points, (point, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: 'summary-' + index
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(point), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_45, "No summary has been generated yet."))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.detailLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_46, [...(_cache[42] || (_cache[42] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary mb-3",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, "Loading the full text...", -1 /* CACHED */)]))])) : $data.detailError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.detailError), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reader-content",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      fontSize: $data.contentFontSize + 'px'
    }),
    innerHTML: $options.activeRenderedContentHtml
  }, null, 12 /* STYLE, PROPS */, _hoisted_50), $data.activeItem.sourceUrl ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: $data.activeItem.sourceUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    class: "continue-link"
  }, [...(_cache[43] || (_cache[43] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Open original source ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-box-arrow-up-right",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_52)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])], 512 /* NEED_PATCH */), $data.showAudioPanel && $data.activeItem ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["audio-dock-bar", {
      'audio-dock-bar--active': $data.speech.isSpeaking && !$data.speech.isPaused
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.activeItem.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.activeItem.typeLabel) + " reader", 1 /* TEXT */)]), $data.speechSupported ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 0
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "audio-bar-btn",
    onClick: _cache[14] || (_cache[14] = (...args) => $options.skipSpeechBackward && $options.skipSpeechBackward(...args)),
    "aria-label": "Previous section"
  }, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-backward-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "audio-bar-btn",
    onClick: _cache[15] || (_cache[15] = $event => $data.speech.isSpeaking && !$data.speech.isPaused ? $options.pauseSpeech() : $options.playSpeech()),
    "aria-label": $data.speech.isSpeaking && !$data.speech.isPaused ? 'Pause audio' : 'Play audio'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.speech.isSpeaking && !$data.speech.isPaused ? 'bi-pause-fill' : 'bi-play-fill']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_59), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "audio-bar-btn",
    onClick: _cache[16] || (_cache[16] = (...args) => $options.skipSpeechForward && $options.skipSpeechForward(...args)),
    "aria-label": "Next section"
  }, [...(_cache[45] || (_cache[45] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-forward-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "audio-bar-btn",
    onClick: _cache[17] || (_cache[17] = (...args) => $options.stopSpeech && $options.stopSpeech(...args)),
    "aria-label": "Stop audio"
  }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "audioProgress",
    type: "range",
    class: "form-range audio-progress-range",
    min: "0",
    max: "100",
    step: "1",
    value: $data.speech.progressPercent,
    onChange: _cache[18] || (_cache[18] = (...args) => $options.seekSpeech && $options.seekSpeech(...args)),
    "aria-label": `Playback progress ${$options.formatDuration($data.speech.elapsedSeconds)} of ${$options.formatDuration($data.speech.totalSeconds)}`
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_61)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-volume-up-fill",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    class: "form-range audio-volume-range",
    min: "0",
    max: "1",
    step: "0.05",
    value: $data.speech.volume,
    onInput: _cache[19] || (_cache[19] = (...args) => $options.updateSpeechVolume && $options.updateSpeechVolume(...args)),
    "aria-label": "Volume"
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_64)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "audio-dock-close",
    onClick: _cache[20] || (_cache[20] = $event => $data.showAudioPanel = false),
    "aria-label": "Close audio reader"
  }, [...(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])], 64 /* STABLE_FRAGMENT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, " Speech synthesis is not supported in this browser. "))], 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.showScrollTopFab ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 1,
    type: "button",
    class: "scroll-top-fab",
    "aria-label": "Scroll back to top",
    onClick: _cache[21] || (_cache[21] = (...args) => $options.scrollToTop && $options.scrollToTop(...args))
  }, [...(_cache[49] || (_cache[49] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-up",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=template&id=73ccccb8&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=template&id=73ccccb8&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "library-search-section"
};
const _hoisted_2 = {
  class: "search-shell shadow-sm"
};
const _hoisted_3 = {
  class: "search-row"
};
const _hoisted_4 = {
  class: "search-main"
};
const _hoisted_5 = ["value"];
const _hoisted_6 = {
  class: "filter-row"
};
const _hoisted_7 = {
  class: "filter-control"
};
const _hoisted_8 = ["value"];
const _hoisted_9 = ["value"];
const _hoisted_10 = {
  class: "filter-control"
};
const _hoisted_11 = ["value"];
const _hoisted_12 = {
  class: "filter-control"
};
const _hoisted_13 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search search-icon",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    value: $props.searchQuery,
    type: "search",
    class: "search-input",
    placeholder: "Search titles, summaries, publishers, and topics",
    "aria-label": "Search IslamHouse library",
    onInput: _cache[0] || (_cache[0] = $event => _ctx.$emit('update:searchQuery', $event.target.value))
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_5)]), $props.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "search-clear",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('update:searchQuery', '')),
    "aria-label": "Clear search"
  }, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Clear", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "filter-type",
    class: "filter-label"
  }, "Type", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "filter-type",
    value: $props.activeType,
    class: "filter-select",
    onChange: _cache[2] || (_cache[2] = $event => _ctx.$emit('update:activeType', $event.target.value))
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.typeOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_9);
  }), 128 /* KEYED_FRAGMENT */))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_8)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "filter-sort",
    class: "filter-label"
  }, "Sort", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "filter-sort",
    value: $props.sortBy,
    class: "filter-select",
    onChange: _cache[3] || (_cache[3] = $event => _ctx.$emit('update:sortBy', $event.target.value))
  }, [...(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "newest"
  }, "Newest to oldest", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "oldest"
  }, "Oldest to newest", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "title"
  }, "Title A to Z", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_11)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "filter-reader",
    class: "filter-label"
  }, "Reading Mode", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "filter-reader",
    value: $props.readerFilter,
    class: "filter-select",
    onChange: _cache[4] || (_cache[4] = $event => _ctx.$emit('update:readerFilter', $event.target.value))
  }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "all"
  }, "All items", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "reader"
  }, "Reader ready", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "detail"
  }, "Detail page only", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_13)])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=style&index=0&id=f111cd26&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=style&index=0&id=f111cd26&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=style&index=0&id=73ccccb8&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=style&index=0&id=73ccccb8&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/IslamicBlogComponent.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/IslamicBlogComponent.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IslamicBlogComponent_vue_vue_type_template_id_f111cd26_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IslamicBlogComponent.vue?vue&type=template&id=f111cd26&scoped=true */ "./resources/components/vue/IslamicBlogComponent.vue?vue&type=template&id=f111cd26&scoped=true");
/* harmony import */ var _IslamicBlogComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IslamicBlogComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/IslamicBlogComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _IslamicBlogComponent_vue_vue_type_style_index_0_id_f111cd26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IslamicBlogComponent.vue?vue&type=style&index=0&id=f111cd26&scoped=true&lang=css */ "./resources/components/vue/IslamicBlogComponent.vue?vue&type=style&index=0&id=f111cd26&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_IslamicBlogComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_IslamicBlogComponent_vue_vue_type_template_id_f111cd26_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-f111cd26"],['__file',"resources/components/vue/IslamicBlogComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/IslamicBlogComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/IslamicBlogComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamicBlogComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamicBlogComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamicBlogComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/IslamicBlogComponent.vue?vue&type=style&index=0&id=f111cd26&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/IslamicBlogComponent.vue?vue&type=style&index=0&id=f111cd26&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamicBlogComponent_vue_vue_type_style_index_0_id_f111cd26_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamicBlogComponent.vue?vue&type=style&index=0&id=f111cd26&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=style&index=0&id=f111cd26&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/IslamicBlogComponent.vue?vue&type=template&id=f111cd26&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/IslamicBlogComponent.vue?vue&type=template&id=f111cd26&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamicBlogComponent_vue_vue_type_template_id_f111cd26_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamicBlogComponent_vue_vue_type_template_id_f111cd26_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamicBlogComponent.vue?vue&type=template&id=f111cd26&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/IslamicBlogComponent.vue?vue&type=template&id=f111cd26&scoped=true");


/***/ }),

/***/ "./resources/components/vue/islamic_library/LibrarySearchControls.vue":
/*!****************************************************************************!*\
  !*** ./resources/components/vue/islamic_library/LibrarySearchControls.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LibrarySearchControls_vue_vue_type_template_id_73ccccb8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LibrarySearchControls.vue?vue&type=template&id=73ccccb8&scoped=true */ "./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=template&id=73ccccb8&scoped=true");
/* harmony import */ var _LibrarySearchControls_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LibrarySearchControls.vue?vue&type=script&lang=js */ "./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=script&lang=js");
/* harmony import */ var _LibrarySearchControls_vue_vue_type_style_index_0_id_73ccccb8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LibrarySearchControls.vue?vue&type=style&index=0&id=73ccccb8&scoped=true&lang=css */ "./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=style&index=0&id=73ccccb8&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_LibrarySearchControls_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_LibrarySearchControls_vue_vue_type_template_id_73ccccb8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-73ccccb8"],['__file',"resources/components/vue/islamic_library/LibrarySearchControls.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LibrarySearchControls_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LibrarySearchControls_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LibrarySearchControls.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=style&index=0&id=73ccccb8&scoped=true&lang=css":
/*!************************************************************************************************************************************!*\
  !*** ./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=style&index=0&id=73ccccb8&scoped=true&lang=css ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LibrarySearchControls_vue_vue_type_style_index_0_id_73ccccb8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LibrarySearchControls.vue?vue&type=style&index=0&id=73ccccb8&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=style&index=0&id=73ccccb8&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=template&id=73ccccb8&scoped=true":
/*!**********************************************************************************************************************!*\
  !*** ./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=template&id=73ccccb8&scoped=true ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LibrarySearchControls_vue_vue_type_template_id_73ccccb8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_LibrarySearchControls_vue_vue_type_template_id_73ccccb8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./LibrarySearchControls.vue?vue&type=template&id=73ccccb8&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/islamic_library/LibrarySearchControls.vue?vue&type=template&id=73ccccb8&scoped=true");


/***/ }),

/***/ "./resources/js/components/IslamicBlogComponent.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/IslamicBlogComponent.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IslamicBlogComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IslamicBlogComponent.vue?vue&type=script&lang=js */ "./resources/js/components/IslamicBlogComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_IslamicBlogComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/IslamicBlogComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/IslamicBlogComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/IslamicBlogComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamicBlogComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamicBlogComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamicBlogComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamicBlogComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);