<template>
    <div class="blog-container" :class="{ compact: compactMode }">
        <!-- Page Header -->
        <div class="page-header" v-once>
            <div class="container">
                <h1>Islamic Insights</h1>
                <p>Delve into a profound collection of spiritual guidance, timeless stories, and divine wisdom drawn
                    from the rich tapestry of the Islamic tradition. Discover insights that illuminate the heart and
                    mind, offering solace, direction, and a deeper connection to faith.</p>
                <div class="layout-toggle">
                    <div class="btn-group" role="group" aria-label="Layout toggle">
                        <button type="button" class="btn btn-layout" :class="{ 'btn-active': layoutMode === 'grid' }"
                            @click="layoutMode = 'grid'" aria-label="Switch to grid layout"
                            :aria-pressed="layoutMode === 'grid'">
                            <i class="fas fa-th-large me-1"></i> Grid
                        </button>
                        <button type="button" class="btn btn-layout" :class="{ 'btn-active': layoutMode === 'list' }"
                            @click="layoutMode = 'list'" aria-label="Switch to list layout"
                            :aria-pressed="layoutMode === 'list'">
                            <i class="fas fa-list me-1"></i> List
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Category Pills Section -->
        <div class="category-pills-container mb-3">
            <div class="container">
                <div class="pills-wrapper">
                    <button v-if="showLeftArrow" @click="scrollLeft" class="scroll-arrow scroll-arrow-left"
                        aria-label="Scroll categories left">
                        <i class="fas fa-chevron-left" v-if="hasFontAwesome" aria-hidden="true"></i>
                        <span v-else class="fallback-arrow">←</span>
                    </button>

                    <div ref="pillsContainer" class="pills-scroll-container" @scroll="updateArrowVisibility">
                        <div class="pills-list" role="tablist" aria-label="Categories" @keydown.left.prevent="focusAdjacentTab(-1)" @keydown.right.prevent="focusAdjacentTab(1)">
                            <button v-for="(category, idx) in categories" :key="category.id" @click="selectCategory(category)"
                                :class="['category-pill', { 'active': selectedCategory.id === category.id }]" role="tab"
                                :aria-selected="selectedCategory.id === category.id ? 'true' : 'false'"
                                :tabindex="selectedCategory.id === category.id ? 0 : -1" :ref="el => categoryTabRefs[idx] = el">
                                <i :class="category.icon" class="me-2"></i>
                                {{ category.name }}
                            </button>
                        </div>
                    </div>

                    <button v-if="showRightArrow" @click="scrollRight" class="scroll-arrow scroll-arrow-right"
                        aria-label="Scroll categories right">
                        <i class="fas fa-chevron-right" v-if="hasFontAwesome" aria-hidden="true"></i>
                        <span v-else class="fallback-arrow">→</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Search and Filters -->
        <div class="filter-container mt-3">
            <div class="container">
                <div class="filter-card">
                    <div class="filter-header d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0 fw-bold">Search & Filters</h5>
                        <button class="btn btn-sm btn-outline-secondary toggle-btn" @click="toggleFilters">
                            <i :class="filtersVisible ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                            <span class="ml-2">{{ filtersVisible ? 'Hide Filters' : 'Show Filters' }}</span>
                        </button>
                    </div>
                    <div class="filter-content" :class="{ 'd-none': !filtersVisible }">
                        <div class="row g-3 align-items-center justify-content-center">
                            <div class="col-12 col-md-6 ">
                                <div class="input-group">
                                    <input v-model="searchTerm" @input="debounceSearch" type="text"
                                        class="form-control form-control-lg" placeholder="Search blogs (min 3 chars)..."
                                        aria-label="Search blogs">
                                    <span class="input-group-text">
                                        <i class="fas fa-search text-white"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="col-12 col-md-3 ">
                                <select v-model="selectedTag" class="form-select form-select-lg"
                                    aria-label="Filter by tag">
                                    <option value="all">Categories</option>
                                    <option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-3 ">
                                <select v-model="sortBy" class="form-select form-select-lg" aria-label="Sort blogs"
                                    @change="handleSortChange">
                                    <option value="newest" selected>Newest</option>
                                    <option value="nameAZ">Name A-Z</option>
                                    <option value="nameZA">Name Z-A</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Blog Layout -->
        <div class="container py-5">
            <div class="row" :class="{ 'list-layout': layoutMode === 'list' }">
                <div :style="{ height: topSpacer + 'px' }" aria-hidden="true"></div>
                <div v-for="(blog, index) in visibleBlogs" :key="blog.id"
                    :class="layoutMode === 'grid' ? 'col-lg-6 col-md-6 mb-5' : 'col-12 mb-4'"
                    :ref="el => observeBlog(el, blog.id)"
                    @mouseenter="onCardMouseEnter(blog)">
                    <div class="card h-100 animate-card">
                        <div class="card-image-container"
                            :class="{ 'container': layoutMode === 'grid', 'container-fluid': layoutMode === 'list' }">
                            <template v-if="isVisible(blog.id)">
                                <img :src="blog.image" :srcset="generateSrcSet(blog.image)" :sizes="cardSizes"
                                    class="card-img-top mb-4 rounded-20"
                                    :alt="blog.title" :loading="index < 4 ? 'eager' : 'lazy'" decoding="async"
                                    :fetchpriority="index < 4 ? 'high' : 'auto'">
                            </template>


                            <h5 class="card-title" @click="openModal(blog)" aria-label="Read full blog post"
                                v-html="highlight(blog.title)"></h5>

                            <div class="card-text" :class="{ 'list-content': layoutMode === 'list' }"
                                v-html="highlight(blog.excerpt)"></div>

                            <p class="text-muted">Published on: {{ formatDate(blog.date) }}</p>

                            <div class="card-tags">
                                <strong class="me-2">Tags:</strong>
                                <span v-if="blog.tags && blog.tags.length" v-for="tag in blog.tags" :key="tag"
                                    class="badge me-2 mb-2" v-html="highlight(tag)"></span>
                                <span v-else class="text-muted">No tags available</span>
                            </div>

                            <div class="action-row mt-4">
                                <button type="button" class="action-btn" @click="openModal(blog)" aria-label="Read full blog post">
                                    <i class="fas fa-book-open" aria-hidden="true"></i>
                                    <span>Read</span>
                                </button>
                                <button type="button" class="action-btn" @click="shareToWhatsApp(blog)" aria-label="Share to WhatsApp">
                                    <i class="fas fa-share" aria-hidden="true"></i>
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Infinite Scroll Sentinel + Loader -->
            <div ref="infiniteSentinel" class="infinite-sentinel" aria-hidden="true"></div>
            <div v-if="loadingMore" class="infinite-loading text-center mt-4">
                <i class="fas fa-spinner fa-spin me-2"></i> Loading more…
            </div>
        </div>

        <!-- Modal for Full Blog Content -->
        <div v-if="selectedBlog" class="modal show d-block animate-modal" tabindex="-1" role="dialog"
            @click="closeModal">
            <div class="modal-dialog modal-xl modal-dialog-centered" role="document" @click.stop>
                <div class="modal-content container">
                    <div class="modal-header">
                        <h4 class="modal-title" v-html="highlight(selectedBlog.title)"></h4>
                        <i class="bi bi-x-circle-fill h3 modal-close" @click="closeModal" aria-label="Close modal"></i>
                    </div>
                    <div class="modal-body">
                        <div class="modal-meta modal-section">
                            <p class="text-muted mb-3">Published on: {{ formatDate(selectedBlog.date) }}</p>
                        </div>
                        <div class="modal-image-container mb-4 modal-section">
                            <img :src="selectedBlog.image" :srcset="generateSrcSet(selectedBlog.image)" :sizes="modalSizes"
                                class="img-fluid rounded" :alt="selectedBlog.title"
                                decoding="async" fetchpriority="high">
                        </div>
                        <div class="modal-content-text prose modal-section" :class="{ wide: readerWide, 'extra-compact': extraCompact }" v-html="highlight(selectedBlog.content)"></div>
                        <div class="modal-tags mt-3 modal-section">
                            <strong class="me-2 fs-5">Tags:</strong>
                            <span v-if="selectedBlog.tags && selectedBlog.tags.length" v-for="tag in selectedBlog.tags"
                                :key="tag" class="badge me-2 mb-2" v-html="highlight(tag)"></span>
                            <span v-else class="text-muted">No tags available</span>
                        </div>
                        <div class="modal-hashtags mt-2 modal-section">
                            <strong class="me-2 fs-5">Hashtags:</strong>
                            <span v-if="selectedBlog.hashtags && selectedBlog.hashtags.length"
                                v-for="hashtag in selectedBlog.hashtags" :key="hashtag" class="hashtag me-2"
                                v-html="highlight(hashtag)"></span>
                            <span v-else class="text-muted">No hashtags available</span>
                        </div>
                        <div v-if="summaryText && showSummary" ref="summarySection" class="modal-summary mt-4 modal-section">
                            <div class="d-flex align-items-center justify-content-between mb-2">
                                <h5 class="mb-0 fw-bold">Summary</h5>
                                <i class="bi bi-x-circle-fill" aria-hidden="true" @click="showSummary = false"></i>
                            </div>
                            <div v-html="summaryText"></div>
                        </div>
                    </div>
                    <div class="modal-footer actions">
                        <button type="button" class="action-btn" @click="shareToWhatsApp(selectedBlog)"
                            v-tooltip="'Share to WhatsApp'" aria-label="Share blog to WhatsApp">
                            <i class="fas fa-share" aria-hidden="true"></i>
                            <span>Share</span>
                        </button>
                        <button type="button" class="action-btn" @click="summarizeBlog" :disabled="summaryLoading"
                            v-tooltip="'Generate summary'" aria-label="Generate summary">
                            <i v-if="summaryLoading" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                            <i v-else class="fas fa-book" aria-hidden="true"></i>
                            <span>{{ summaryLoading ? 'Generating…' : 'Summary' }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="selectedBlog" class="modal-backdrop fade show"></div>
    </div>
</template>

<script>
import blogsData from '../components/blogs.json';
import _ from 'lodash'; // For debounce
import { markRaw } from 'vue';

export default {
    data() {
        return {
            blogs: markRaw(blogsData.map(b => ({
                ...b,
                tags: b.tags || [],
                hashtags: b.hashtags || [],
                // precomputed, normalized fields for fast filtering/sorting/highlighting
                title_lc: (b.title || '').toLowerCase(),
                content_lc: this.stripHtml(b.content || '').toLowerCase(),
                tags_lc: (b.tags || []).map(t => (t || '').toLowerCase()),
                hashtags_lc: (b.hashtags || []).map(h => (h || '').toLowerCase()),
                dateMs: new Date(b.date).getTime(),
                wordCount: this.getWordCount(b.content),
                excerpt: this.getExcerpt(b.content, 280)
            }))),
            filtersVisible: true,
            uniqueTags: [],
            // Infinite scroll state
            visibleCount: 6,
            batchSize: 6,
            // Virtualization windowing
            renderStart: 0,
            maxRender: 30,
            topSpacer: 0,
            loadingMore: false,
            sentinelIO: null,
            selectedBlog: null,
            layoutMode: 'grid',
            searchTerm: '',
            searchTermDebounced: '',
            selectedTag: 'all',
            sortBy: 'newest',
            summaryText: '',
            summaryLoading: false,
            summaryError: '',
            showSummary: true,
            // perf helpers
            visibleIds: new Set(),
            io: null,
            compactMode: true,
            readerWide: false,
            extraCompact: false,
            // Category pills data
            categories: [
                { id: 1, name: 'Prayers', icon: 'fas fa-pray', tag: 'prayer' },
                { id: 2, name: 'Fasting', icon: 'fas fa-moon', tag: 'fasting' },
                { id: 3, name: 'Kindness', icon: 'fas fa-heart', tag: 'kindness' },
                { id: 4, name: 'Quran', icon: 'fas fa-book-open', tag: 'quran' },
                { id: 5, name: 'Hadith', icon: 'fas fa-scroll', tag: 'hadith' },
                { id: 6, name: 'Charity', icon: 'fas fa-hand-holding-heart', tag: 'charity' },
                { id: 7, name: 'Wisdom', icon: 'fas fa-lightbulb', tag: 'wisdom' },
                { id: 8, name: 'Spirituality', icon: 'fas fa-star-and-crescent', tag: 'spirituality' }
            ],
            selectedCategory: { id: 0, name: 'All Categories', icon: 'fas fa-list', tag: 'all' },
            showLeftArrow: false,
            showRightArrow: true,
            hasFontAwesome: true, // Flag to check Font Awesome availability
            preRenderedContent: {},
            categoryTabRefs: [],
        };
    },
    computed: {
        uniqueTags() {
            const tags = new Set(this.blogs.flatMap(blog => blog.tags || []));
            return ['all', ...Array.from(tags)];
        },
        cardSizes() {
            return this.layoutMode === 'list'
                ? '100vw'
                : '(min-width: 1200px) 540px, (min-width: 992px) 480px, (min-width: 768px) 50vw, 100vw';
        },
        modalSizes() {
            return '(min-width: 1200px) 1140px, 90vw';
        },
        highlightRegex() {
            const term = this.searchTermDebounced;
            if (!term || term.length < 3) return null;
            return new RegExp('(' + _.escapeRegExp(term) + ')', 'gi');
        },
        filteredBlogs() {
            let result = Array.isArray(this.blogs) ? this.blogs.slice() : [...this.blogs];

            // Category filter
            if (this.selectedCategory.tag !== 'all') {
                const cat = this.selectedCategory.tag.toLowerCase();
                result = result.filter(b => (b.tags_lc && b.tags_lc.some(t => t.includes(cat))));
            }

            // Tag dropdown filter
            if (this.selectedTag !== 'all') {
                const tagLc = (this.selectedTag || '').toLowerCase();
                result = result.filter(b => b.tags_lc && b.tags_lc.includes(tagLc));
            }

            // Search term filter (debounced)
            if (this.searchTermDebounced && this.searchTermDebounced.length >= 3) {
                const q = this.searchTermDebounced.toLowerCase();
                result = result.filter(b =>
                    (b.title_lc && b.title_lc.includes(q)) ||
                    (b.content_lc && b.content_lc.includes(q)) ||
                    (b.tags_lc && b.tags_lc.some(t => t.includes(q))) ||
                    (b.hashtags_lc && b.hashtags_lc.some(h => h.includes(q)))
                );
            }

            return this.sortBlogs(result);
        },
        renderEnd() {
            return Math.min(this.visibleCount, this.renderStart + this.maxRender);
        },
        visibleBlogs() {
            return this.filteredBlogs.slice(this.renderStart, this.renderEnd);
        }
    },
    watch: {
        searchTerm() { this.resetInfinite(); },
        selectedTag() { this.resetInfinite(); },
        sortBy() { this.resetInfinite(); },
        selectedCategory() { this.resetInfinite(); },
        layoutMode() { this.resetInfinite(); },
        compactMode(newVal) {
            try { localStorage.setItem('read.compactMode', JSON.stringify(!!newVal)); } catch (_) {}
        }
    },
    mounted() {
        // Add all categories option at the beginning
        this.categories.unshift({ id: 0, name: 'All Categories', icon: 'fas fa-list', tag: 'all' });
        this.selectedCategory = this.categories[0];
        // categories are static; mark raw to reduce deep reactivity cost
        this.categories = markRaw(this.categories);

        // Prevent browser scroll restoration and ensure top on load
        try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

        // Initialize arrow visibility and check Font Awesome
        this.$nextTick(() => {
            this.updateArrowVisibility();
            this.checkFontAwesome();
        });
        // Restore compact mode preference
        try {
            const saved = localStorage.getItem('read.compactMode');
            if (saved !== null) this.compactMode = JSON.parse(saved);
        } catch (_) {}

        // Setup IntersectionObserver for lazy rendering
        if ('IntersectionObserver' in window) {
            this.io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const id = entry.target?.dataset?.blogId;
                    if (!id) return;
                    if (entry.isIntersecting) {
                        this.visibleIds.add(Number(id));
                        // Avoid prefetching multiple srcset images on intersection to reduce network contention
                        this.io.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '600px 0px', threshold: 0.01 });
        }
        // Setup IntersectionObserver for infinite scroll sentinel
        this.$nextTick(() => {
            const sentinel = this.$refs.infiniteSentinel;
            if (sentinel && 'IntersectionObserver' in window) {
                let ticking = false;
                this.sentinelIO = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !ticking) {
                            ticking = true;
                            requestAnimationFrame(() => {
                                this.loadMore();
                                ticking = false;
                            });
                        }
                    });
                }, { rootMargin: '1000px 0px', threshold: 0.01 });
                this.sentinelIO.observe(sentinel);
            } else {
                // Fallback: simple infinite-scroll trigger will be handled in shared scroll listener below
            }
        });

        // Shared scroll listener (virtualization + fallback infinite trigger)
        let ticking = false;
        this._onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const avg = this.getAvgItemHeight();
                const approxIndex = Math.max(0, Math.floor(window.scrollY / avg) - 10);
                const maxStart = Math.max(0, this.visibleCount - this.maxRender);
                const nextStart = Math.min(approxIndex, maxStart);
                if (nextStart !== this.renderStart) {
                    this.renderStart = nextStart;
                    this.topSpacer = this.renderStart * avg;
                }
                // Fallback load-more when near bottom
                const scrollBottom = window.innerHeight + window.scrollY;
                const docHeight = document.body.offsetHeight;
                if (docHeight - scrollBottom < 800) this.loadMore();
                ticking = false;
            });
        };
        window.addEventListener('scroll', this._onScroll, { passive: true });
    },
    unmounted() {
        if (this.io) {
            try { this.io.disconnect(); } catch (e) { /* noop */ }
        }
        if (this.sentinelIO) {
            try { this.sentinelIO.disconnect(); } catch (e) { /* noop */ }
        }
        if (this._onScroll) {
            window.removeEventListener('scroll', this._onScroll);
        }
    },
    methods: {
        focusAdjacentTab(delta) {
            if (!this.categories || this.categories.length === 0) return;
            const currentIndex = this.categories.findIndex(c => c.id === this.selectedCategory.id);
            const nextIndex = (currentIndex + delta + this.categories.length) % this.categories.length;
            const next = this.categories[nextIndex];
            if (next) {
                this.selectCategory(next);
                this.$nextTick(() => {
                    const btn = this.categoryTabRefs[nextIndex];
                    if (btn && typeof btn.focus === 'function') btn.focus();
                });
            }
        },
        getAvgItemHeight() {
            return this.layoutMode === 'list' ? 600 : 520;
        },
        toggleFilters() {
            this.filtersVisible = !this.filtersVisible;
        },
        selectCategory(category) {
            this.selectedCategory = category;
        },
        observeBlog(el, id) {
            if (!el) return;
            el.dataset.blogId = id;
            if (this.io) {
                this.io.observe(el);
            } else {
                // Fallback: mark visible immediately if IO not supported
                this.visibleIds.add(id);
            }
        },
        isVisible(id) {
            return this.visibleIds.has(id);
        },
        onCardMouseEnter(blog) {
            // Prefetch disabled to reduce network contention on large lists
        },
        paramJoin(url, param) {
            if (!url) return url;
            return url.includes('?') ? `${url}&${param}` : `${url}?${param}`;
        },
        generateSrcSet(src) {
            if (!src) return '';
            const widths = [480, 768, 1080, 1440];
            return widths.map(w => `${this.paramJoin(src, `w=${w}`)} ${w}w`).join(', ');
        },
        scrollLeft() {
            const container = this.$refs.pillsContainer;
            container.scrollBy({ left: -200, behavior: 'smooth' });
        },
        scrollRight() {
            const container = this.$refs.pillsContainer;
            container.scrollBy({ left: 200, behavior: 'smooth' });
        },
        updateArrowVisibility() {
            const container = this.$refs.pillsContainer;
            if (!container) return;

            this.showLeftArrow = container.scrollLeft > 0;
            this.showRightArrow = container.scrollLeft < (container.scrollWidth - container.clientWidth);
        },
        openModal(blog) {
            this.selectedBlog = blog;
            this.summaryText = '';
            this.summaryError = '';
            this.showSummary = true;
            document.body.classList.add('modal-open');
        },
        closeModal() {
            this.selectedBlog = null;
            this.summaryText = '';
            this.summaryLoading = false;
            this.summaryError = '';
            this.showSummary = true;
            document.body.classList.remove('modal-open');
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
        },
        getWordCount(content) {
            const text = content.replace(/<[^>]+>/g, '').trim();
            return text ? text.split(/\s+/).filter(word => word.length > 0).length : 0;
        },
        getExcerpt(content, maxLen = 220) {
            const text = this.stripHtml(content || '').replace(/\s+/g, ' ').trim();
            if (text.length <= maxLen) return text;
            const slice = text.slice(0, maxLen);
            const cut = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf(' '));
            return (cut > 60 ? slice.slice(0, cut) : slice).trim() + '…';
        },
        sortBlogs(blogs) {
            return [...blogs].sort((a, b) => {
                switch (this.sortBy) {
                    case 'id':
                        return a.id - b.id;
                    case 'nameZA':
                        return b.title.localeCompare(a.title);
                    case 'oldest':
                        return (a.dateMs || new Date(a.date).getTime()) - (b.dateMs || new Date(b.date).getTime());
                    case 'newest':
                    default:
                        return (b.dateMs || new Date(b.date).getTime()) - (a.dateMs || new Date(a.date).getTime());
                }
            });
        },
        highlight(text) {
            if (!this.highlightRegex || typeof text !== 'string') return text;
            return text.replace(this.highlightRegex, '<span class="highlight">$1</span>');
        },
        debounceSearch: _.debounce(function () {
            this.searchTermDebounced = (this.searchTerm || '').trim();
        }, 200),
        stripHtml(html) {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            return temp.textContent || temp.innerText || '';
        },
        summarizeBlog() {
            if (!this.selectedBlog || this.summaryLoading) return;

            this.summaryLoading = true;
            this.summaryText = '';
            this.summaryError = '';

            try {
                new Promise(resolve => setTimeout(resolve, 700)).then(() => {
                    const description = this.stripHtml(this.selectedBlog.content || '');
                    if (!description) {
                        this.summaryText = '<em>No summary available for this blog.</em>';
                        this.summaryLoading = false;
                        return;
                    }

                    const sentences = description.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 20);
                    const keywords = this.uniqueTags.filter(tag => tag !== 'all');

                    const scored = sentences.map((sentence, idx) => {
                        let score = 0;
                        keywords.forEach(kw => {
                            if (sentence.toLowerCase().includes(kw.toLowerCase())) score += 2;
                        });
                        if (idx === 0) score += 1.5;
                        if (idx === sentences.length - 1) score += 1;
                        return { sentence, score };
                    });

                    scored.sort((a, b) => b.score - a.score || sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence));

                    const seen = new Set();
                    const unique = scored.filter(({ sentence }) => {
                        const s = sentence.trim();
                        if (seen.has(s)) return false;
                        seen.add(s);
                        return true;
                    });

                    const summarySentences = [unique[0]?.sentence]
                        .concat(unique.slice(1, 4).map(s => s.sentence))
                        .filter(Boolean);

                    const highlight = s =>
                        s.replace(new RegExp(`(${keywords.join('|')}|\\b\\d{3,4}\\b)`, 'gi'), '<b>$1</b>');

                    let summary = '';
                    summarySentences.forEach(sentence => {
                        summary += `<p class=\"summary-line\">${highlight(sentence.trim())}</p>`;
                    });
                    if (summarySentences.length === 0) {
                        summary = '<em>No summary available for this blog.</em>';
                    }

                    this.summaryText = summary;
                });
            } catch (err) {
                this.summaryError = err.message || 'Error generating summary.';
            } finally {
                this.summaryLoading = false;
            }
        },
        toggleSummary() {
            this.showSummary = !this.showSummary;
        },
        shareToWhatsApp(blog) {
            const url = window.location.href + '?blog=' + blog.id;

            // Take the full modal content (already loaded into your modal)
            const cleanContent = blog.fullContent
                ? blog.fullContent.replace(/<[^>]*>/g, '') // if you store full content separately
                : blog.content.replace(/<[^>]*>/g, '');    // fallback to card content

            // Format message
            const message = `${blog.title}\n\n${cleanContent}\n\n`;

            window.open(
                `https://wa.me/?text=${encodeURIComponent(message)}`,
                '_blank'
            );
        },
        loadMore() {
            if (this.loadingMore) return;
            const total = this.filteredBlogs.length;
            if (this.visibleCount >= total) return;
            this.loadingMore = true;
            setTimeout(() => {
                this.visibleCount = Math.min(this.visibleCount + this.batchSize, total);
                this.loadingMore = false;
            }, 150);
        },
        resetInfinite() {
            this.visibleCount = this.batchSize;
            this.renderStart = 0;
            this.topSpacer = 0;
            window.scrollTo({ top: 0, behavior: 'auto' });
        },
        checkFontAwesome() {
            // Check if Font Awesome is loaded by testing an icon
            const testElement = document.createElement('i');
            testElement.className = 'fas fa-check';
            document.body.appendChild(testElement);
            this.hasFontAwesome = window.getComputedStyle(testElement).fontFamily.includes('FontAwesome');
            document.body.removeChild(testElement);
        }
    },
    directives: {
        tooltip: {
            mounted(el, binding) {
                el.setAttribute('data-bs-toggle', 'tooltip');
                el.setAttribute('data-bs-placement', 'top');
                el.setAttribute('title', binding.value);
                new bootstrap.Tooltip(el);
            },
            unmounted(el) {
                const tooltip = bootstrap.Tooltip.getInstance(el);
                if (tooltip) tooltip.dispose();
            }
        }
    }
};
</script>

<style scoped>
/* Color Scheme */
:root {
    --primary-color: #00c4b4;
    --primary-dark: #00897b;
    --primary-light: #b2dfdb;
    --white-color: #ffffff;
    --black-color: #000000;
    --gray-dark: #2a2a2a;
    --gray-medium: #4a4a4a;
    --gray-light: #f5f5f5;
}

.filter-container {
    padding: 1rem 0;
}

.filter-card {
    background: #fff;
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-header {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
}

.toggle-btn {
    transition: all 0.3s ease;
}

.filter-content {
    transition: all 0.3s ease;
    overflow: hidden;
}

.filter-content.d-none {
    display: none !important;
}

.pills-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.pills-scroll-container {
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.pills-scroll-container::-webkit-scrollbar {
    display: none;
}

.pills-list {
    display: flex;
    gap: 1rem;
    padding: 0.5rem 0;
    white-space: nowrap;
    min-width: max-content;
}

.category-pill {
    background: transparent;
    color: #00897b;
    border: 1px solid #00897b;
    border-radius: 20px;
    padding: 0.45rem 0.9rem;
    font-size: 0.92rem;
    font-weight: 700;
    transition: all 0.25s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    white-space: nowrap;
    min-width: max-content;
}

.category-pill:hover {
    background: #00897b;
    color: var(--white-color);
}

.category-pill.active {
    background: #00897b;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 196, 180, 0.3);
}

.category-pill.active:hover {
    background: var(--primary-dark);
    color: var(--white-color);
}

.category-pill i {
    font-size: 0.9rem;
}

.scroll-arrow {
    background: transparent;
    color: #00897b;
    border: 2px solid #00897b;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: none;
    flex-shrink: 0;
    outline: none;
}

.scroll-arrow:hover {
    background: #00897b;
    color: var(--white-color);
}

.scroll-arrow:active {
    transform: scale(0.95);
}

.scroll-arrow i {
    font-size: 1rem;
}

/* General Styles */
.blog-container {
    font-family: 'Roboto', 'Open Sans', sans-serif;
    color: var(--gray-dark);
    background: linear-gradient(135deg, var(--white-color) 0%, var(--gray-light) 100%);
    min-height: 100vh;
}

/* Premium rounded utility */
.rounded-20 { border-radius: 20px !important; }

/* Page Header */
.page-header {
    color: var(--gray-dark);
    padding: 1.5rem 0;
    text-align: center;
}

.page-header h1 {
    font-size: 2.6rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    letter-spacing: 0.3px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.page-header p {
    font-size: 1.05rem;
    font-weight: 400;
    margin: 0.5rem auto 0;
    opacity: 0.95;
    line-height: 1.6;
    max-width: 960px;
}

/* Layout Toggle */
.layout-toggle {
    display: flex;
    justify-content: center;
    margin-top: 1.2rem;
}

.btn-group {
    overflow: hidden;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.btn-layout {
    background: #ffffff;
    color: #00897b;
    border: 1px solid #00897b;
    padding: 6px 14px;
    font-size: 0.95rem;
    font-weight: 700;
    transition: all 0.25s ease;
    border-radius: 20px;
}

.btn-layout:hover { background: #e9f6f4; color: #007a6e; }

.btn-layout:focus {
    outline: 2px solid #00897b;
    outline-offset: 2px;
}

.btn-layout i { color: currentColor; }

.btn-active { background: #00897b; color: #ffffff; border-color: #00897b; }

/* Compact density toggle */
.btn-compact {
    background: #ffffff;
    color: #0d3b3a;
    border: 1px solid rgba(0,137,123,0.25);
    padding: 6px 12px;
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 20px;
    transition: all 0.25s ease;
    box-shadow: 0 6px 14px rgba(0,0,0,0.06);
}
.btn-compact:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(0,0,0,0.1); }
.btn-compact i { color: #00897b; }

.btn-active:hover {
    background: var(--primary-dark);
    color: var(--white-color);
    transform: translateY(-1px);
}

.btn-active i {
    color: var(--white-color);
}

/* Filter Container */
.filter-container {
    padding-top: 6px;
    background: linear-gradient(135deg, var(--white-color) 0%, var(--gray-light) 100%);
}

.filter-card {
    background: linear-gradient(135deg, var(--white-color) 0%, #f0f4f8 100%);
    border-radius: 20px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    border: 1px solid var(--primary-light);
    padding: 0.6rem 0.8rem;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.filter-card:hover {}

/* Search and Filters */
.input-group {
    position: relative;
    width: 100%;
}

.form-control,
.form-select {
    border: 1px solid #00897b;
    border-radius: 20px;
    padding: 10px 12px;
    font-size: 1rem;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.form-control-lg { font-size: 1.05rem; }

.form-select-lg { font-size: 1.05rem; padding: 10px 12px; }

.form-control:focus,
.form-select:focus {
    border-color: var(--primary-dark);
    box-shadow: 0 0 8px rgba(0, 196, 180, 0.4);
    outline: none;
}

.form-control::placeholder {
    color: var(--gray-medium);
}

.input-group-text {
    background: #00897b;
    color: var(--white-color);
    border: none;
    border-radius: 0 20px 20px 0;
    padding: 8px 12px;
    transition: background 0.25s ease;
}

.input-group-text:hover {
    background: var(--primary-dark);
}

.input-group-text i {
    font-size: 1.2rem;
}

/* Card Styles */
.card {
    background: linear-gradient(180deg, var(--white-color) 0%, #f8fafc 100%);
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 191, 166, 0.15);
    transition: box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0, 191, 166, 0.1);
    content-visibility: auto;
    contain-intrinsic-size: 800px 600px;
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #00897b, var(--primary-dark));
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 191, 166, 0.18);
}

.card-image-container {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.card-img-top {
    height: 260px;
    object-fit: cover;
    border-radius: 10px;
}

.card-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--black-color);
    margin-bottom: 1rem;
    line-height: 1.4;
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0;
}

.card-title:hover {
    color: #00897b;
}

.card-title:focus {
    outline: 2px solid #00897b;
    outline-offset: 2px;
}

.card-text {
    font-size: 1.05rem;
    color: var(--gray-dark);
    max-height: 300px;
    overflow: hidden;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    padding: 0;
}

.list-layout .card-text.list-content {
    -webkit-line-clamp: 8;
    max-height: 480px;
}

.text-muted {
    font-size: 0.95rem;
    color: var(--gray-medium);
    font-weight: 400;
    padding: 0;
}

.card-tags,
.modal-tags,
.modal-hashtags {
    margin-top: 0.75rem;
}

.card-tags strong,
.modal-tags strong,
.modal-hashtags strong {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--gray-dark);
}

.badge {
    background: var(--white-color);
    color: #00897b;
    border: 1px solid rgba(0,137,123,0.6);
    font-size: 0.88rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    transition: background 0.2s ease, color 0.2s ease;
}

.badge:hover {
    background: var(--primary-light);
    color: var(--primary-dark);
}

.hashtag {
    color: #00897b;
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s ease;
}

.hashtag:hover {
    color: var(--primary-dark);
}

.read-more {
    color: #00897b;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s ease;
    padding: 0;
}

.read-more:hover {
    color: var(--primary-dark);
}

.read-more:focus {
    outline: 2px solid #00897b;
    outline-offset: 2px;
}

.read-more .fa-arrow-right {}
.read-more:hover .fa-arrow-right {}

/* List Layout Specific Styles */
.list-layout .card {
    display: flex;
    flex-direction: column;
}

.list-layout .card-image-container {
    padding: 1.5rem;
}

.list-layout .card-title {
    font-size: 2rem;
}

.list-layout .card-text {
    font-size: 1.25rem;
}

/* Pagination styles removed */

/* Infinite scroll */
.infinite-sentinel {
    width: 100%;
    height: 1px;
}

.infinite-loading {
    color: var(--primary-dark);
}

/* Modal Styles */
.modal-content {
    border-radius: 20px;
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.14);
    overflow: hidden;
}

.modal-header {
    color: var(--primary-dark);
    border-bottom: 1px solid rgba(0,0,0,0.05);
    padding: 1.2rem 1.4rem;
}

.modal-close {
    cursor: pointer;
    transition: transform 160ms ease, color 160ms ease;
}

.modal-close:focus,
.modal-close:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
}

.modal-title {
    font-size: 1.6rem;
    font-weight: 700;
    color: black;
}

.bi-x-circle-fill {
    color: black;
    transition: all 0.3s ease;
}

.bi-x-circle-fill:hover {
    color: var(--primary-light);
    transform: scale(1.15);
}

.bi-x-circle-fill:focus {
    outline: 2px solid var(--white-color);
    outline-offset: 2px;
}

.modal-body {
    font-size: 1.08rem;
    line-height: 1.75;
    color: var(--gray-dark);
    padding: 1rem;
}

.modal-meta {
    border-bottom: 1px solid rgba(0,0,0,0.06);
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
}

.modal-image-container img {
    width: 100%;
    max-height: 360px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

/* Prevent CLS and show smooth loading */
.card-img-top {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    background-color: #eef6f6;
    border-radius: 20px;
}



/* Modal content typography (use :deep for scoped CSS) */
.modal-content-text { max-width: 860px; margin: 0 auto; }
.modal-content-text.wide { max-width: 1200px; }
.modal-content-text :deep(h1),
.modal-content-text :deep(h2),
.modal-content-text :deep(h3),
.modal-content-text :deep(h4) {
    color: var(--gray-dark);
    margin: 0 0 0.9rem 0;
    padding-left: 12px;
    border-left: 3px solid #00897b;
    line-height: 1.3;
}
.modal-content-text :deep(h1) { font-size: 1.6rem; }
.modal-content-text :deep(h2) { font-size: 1.35rem; }
.modal-content-text :deep(h3) { font-size: 1.2rem; }
.modal-content-text :deep(h4) { font-size: 1.1rem; }

.modal-content-text.extra-compact :deep(h1) { font-size: 1.35rem; }
.modal-content-text.extra-compact :deep(h2) { font-size: 1.18rem; }
.modal-content-text.extra-compact :deep(h3) { font-size: 1.06rem; }
.modal-content-text.extra-compact :deep(h4) { font-size: 0.98rem; }

.modal-content-text :deep(p) {
    margin: 0 0 0.8rem 0;
    text-align: justify;
    text-justify: inter-word;
    hyphens: auto;
}

.modal-content-text :deep(ul) {
    list-style: none;
    padding-left: 0;
    margin: 0 0 1rem 0;
}
.modal-content-text :deep(ul li) {
    position: relative;
    padding-left: 22px;
    margin: 0 0 0.6rem 0;
}
.modal-content-text :deep(ul li::before) {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00a395;
}

.modal-content-text :deep(blockquote) {
    border-left: 3px solid #00897b;
    padding: 0.8rem 1rem;
    margin: 1.2rem 0;
    font-style: italic;
    color: var(--gray-medium);
    background: #f6fbfb;
    border-radius: 12px;
}

.modal-content-text :deep(img) {
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
    max-width: 100%;
    height: auto;
}

.modal-content-text :deep(a) {
    color: #00796b;
    text-decoration: underline;
    text-underline-offset: 2px;
}
.modal-content-text :deep(code),
.modal-content-text :deep(pre) {
    background: #f4f7f7;
    border-radius: 12px;
    padding: 0.2rem 0.4rem;
}

/* Summary lines (generated) */
.summary-line { margin-bottom: 1em; }

.modal-footer {
    border-top: none;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 10px;
}

.btn-primary {
    background: linear-gradient(90deg, #00897b, var(--primary-dark));
    border: none;
    color: var(--white-color);
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    padding: 12px 28px;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: var(--primary-dark);
}

.btn-primary:focus {
    outline: 2px solid #00897b;
    outline-offset: 2px;
}

.btn-secondary {
    background: var(--gray-medium);
    border: none;
    color: var(--white-color);
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    padding: 12px 28px;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: var(--gray-dark);
}

.btn-secondary:focus {
    outline: 2px solid var(--gray-dark);
    outline-offset: 2px;
}

.btn-info {
    background: var(--primary-light);
    border: none;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    padding: 12px 28px;
    transition: all 0.3s ease;
}

.btn-info:hover {
    background: #00897b;
}

.btn-info:focus {
    outline: 2px solid #00897b;
    outline-offset: 2px;
}

.btn-info:disabled {
    background: var(--gray-medium);
    cursor: not-allowed;
    opacity: 0.7;
}

/* Modal Summary */
.modal-summary {
    background: var(--gray-light);
    padding: 1rem;
    border-radius: 10px;
    border-left: 4px solid #00897b;
}

.modal-summary h5 {
    color: var(--primary-dark);
    font-size: 1.3rem;
}

.modal-summary b {
    color: var(--primary-dark);
    font-weight: 700;
}

/* Highlight Style */
.highlight {
    background-color: #ffeb3b;
    color: #000;
    padding: 0 2px;
    border-radius: 2px;
}

/* Blog List Transition */
.blog-list-enter-active,
.blog-list-leave-active {
    transition: all 0.5s ease-out;
}

.blog-list-enter-from,
.blog-list-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

/* Animations */
.animate-card {
    animation: fadeInUp 0.5s ease-out;
}

.animate-modal {
    animation: scaleIn 0.3s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Action row: clean, evenly spaced, premium */
.action-row {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 100%;
}

.actions { justify-content: flex-end; }

.action-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border: 1px solid rgba(0, 137, 123, 0.25);
    background: #ffffff;
    color: #0d3b3a;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    transition: transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease, color 160ms ease;
    font-weight: 600;
}

.action-btn i { color: #00897b; }

.action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
    background: #f7fcfb;
}

.action-btn:active { transform: translateY(0); }

.action-btn:focus,
.action-btn:focus-visible {
    outline: 3px solid rgba(0, 137, 123, 0.3);
    outline-offset: 2px;
}

/* Subtle hover lift for cards */
.card {
    border-radius: 20px;
    transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);
}

/* Scroll arrows focus/hover polish */
.scroll-arrow:hover { box-shadow: 0 6px 14px rgba(0, 137, 123, 0.25); }
.scroll-arrow:focus,
.scroll-arrow:focus-visible { outline: 3px solid rgba(0, 137, 123, 0.35); }

/* Compact mode overrides */
.blog-container.compact .page-header { padding: 1rem 0; }
.blog-container.compact .page-header h1 { font-size: 2.2rem; margin-bottom: 0.35rem; }
.blog-container.compact .page-header p { font-size: 0.98rem; line-height: 1.55; }
.blog-container.compact .btn-layout { padding: 5px 12px; font-size: 0.9rem; }
.blog-container.compact .btn-compact { padding: 5px 10px; font-size: 0.88rem; }
.blog-container.compact .pills-wrapper { gap: 0.6rem; }
.blog-container.compact .category-pill { padding: 0.35rem 0.8rem; font-size: 0.88rem; }
.blog-container.compact .filter-card { padding: 0.5rem 0.6rem; box-shadow: 0 6px 12px rgba(0,0,0,0.06); }
.blog-container.compact .form-control, .blog-container.compact .form-select { padding: 8px 10px; font-size: 0.95rem; }
.blog-container.compact .input-group-text { padding: 6px 10px; }
.blog-container.compact .card-image-container { padding: 1rem; }
.blog-container.compact .card-title { font-size: 1.4rem; }
.blog-container.compact .card-text { font-size: 1rem; -webkit-line-clamp: 5; }
.blog-container.compact .badge { padding: 4px 8px; font-size: 0.84rem; }
.blog-container.compact .modal-header { padding: 1rem 1.2rem; }
.blog-container.compact .modal-title { font-size: 1.4rem; }
.blog-container.compact .modal-body { padding: 1.1rem; font-size: 1.02rem; }
.blog-container.compact .modal-image-container img { max-height: 320px; }
.blog-container.compact .action-btn { padding: 8px 12px; gap: 8px; }

/* Responsive Adjustments */
@media (max-width: 992px) {
    .page-header h1 {
        font-size: 3rem;
    }

    .page-header p {
        font-size: 1.2rem;
    }

    .card-img-top {
        height: 220px;
    }

    .card-title {
        font-size: 1.6rem;
    }

    .filter-card {
        padding: 1.5rem;
    }

    .category-pill {
        background: transparent;
        padding: 0.7rem 1.2rem;
        font-size: 0.95rem;
        min-height: 40px;
        border-width: 2px;
    }

    .category-pill:hover {
        background: #00897b;
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.4);
    }

    .scroll-arrow {
        width: 38px;
        height: 38px;
        background: transparent;
        border: 2px solid #00897b;
        box-shadow: none;
    }

    .scroll-arrow:hover {
        background: #00897b;
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.4);
    }

    .scroll-arrow i {
        font-size: 1.1rem;
    }
}

@media (max-width: 768px) {
    .page-header {
        padding: 4rem 0;
    }

    .page-header h1 {
        font-size: 2.5rem;
    }

    .page-header p {
        font-size: 1.1rem;
    }

    .card-img-top {
        height: 200px;
    }

    .card-image-container {
        padding: 1.5rem;
    }

    .card-title {
        font-size: 1.5rem;
    }

    .list-layout .card-title {
        font-size: 1.8rem;
    }

    .filter-card .row {
        flex-direction: column;
        align-items: stretch;
    }

    .filter-card .col-md-6,
    .filter-card .col-md-2,
    .filter-card .col-12 {
        width: 100%;
        margin-bottom: 1rem;
    }

    .input-group {
        width: 100%;
    }

    .category-pill {
        background: transparent;
        padding: 0.8rem 1.3rem;
        font-size: 1rem;
        min-height: 44px;
        border-width: 2px;
        font-weight: 700;
    }

    .category-pill:hover {
        background: #00897b;
        color: var(--white-color);
    }

    .category-pill.active {
        background: #00897b;
        color: white;
    }

    .category-pill i {
        font-size: 1rem;
        margin-right: 0.5rem;
    }

    .pills-wrapper {
        gap: 0.8rem;
    }

    .pills-list {
        gap: 1rem;
    }

    .scroll-arrow {
        width: 40px;
        height: 40px;
        background: transparent;
        border: 2px solid #00897b;
        box-shadow: none;
    }

    .scroll-arrow:hover {
        background: #00897b;
        color: var(--white-color);
    }

    .scroll-arrow i {
        font-size: 1.2rem;
    }

    /* .category-pills-container {
        padding: 2.5rem 0;
        background: linear-gradient(135deg, #f8fffe 0%, #e0f7f5 100%);
    } */
}

@media (max-width: 767.98px) {
    .category-pill {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }

    .scroll-arrow {
        padding: 0.3rem;
    }

    .filter-card {
        padding: 1rem;
    }

    .form-control-lg,
    .form-select-lg {
        font-size: 0.9rem;
        padding: 0.5rem;
    }

    .input-group-text {
        padding: 0.5rem;
    }

    .toggle-btn {
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
    }

    .filter-header h5 {
        font-size: 1rem;
    }
}

/* Ensure proper stacking on mobile */
@media (max-width: 575.98px) {
    .row.g-3 {
        flex-direction: column;
    }

    .col-12 {
        width: 100%;
    }
}

@media (max-width: 576px) {
    .page-header {
        padding: 3rem 0;
    }

    .page-header h1 {
        font-size: 2rem;
    }

    .page-header p {
        font-size: 1rem;
    }

    .btn-layout {
        padding: 8px 16px;
        font-size: 0.95rem;
    }

    .card-img-top {
        height: 180px;
    }

    .card-title {
        font-size: 1.4rem;
    }

    .card-text {
        font-size: 1.1rem;
        -webkit-line-clamp: 4;
        max-height: 320px;
    }

    .list-layout .card-title {
        font-size: 1.6rem;
    }

    .list-layout .card-text {
        font-size: 1.15rem;
        -webkit-line-clamp: 6;
        max-height: 360px;
    }

    .read-more {
        font-size: 1.1rem;
    }

    .btn-primary,
    .btn-secondary,
    .btn-info {
        padding: 10px 20px;
        font-size: 1rem;
    }

    .card-tags strong,
    .modal-tags strong,
    .modal-hashtags strong {
        font-size: 1rem;
    }

    .badge,
    .hashtag {
        font-size: 0.85rem;
        padding: 5px 10px;
    }

    .form-control,
    .form-select {
        font-size: 1rem;
        padding: 8px 12px;
    }

    .form-control-lg,
    .form-select-lg {
        font-size: 1.1rem;
        padding: 10px 15px;
    }

    .category-pill {
        background: transparent;
        padding: 1rem 1.4rem;
        font-size: 1.05rem;
        min-height: 46px;
        border-width: 2px;
        font-weight: 700;
        box-shadow: none;
        white-space: nowrap;
    }

    .category-pill:hover {
        background: #00897b;
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.25);
        transform: translateY(-2px);
    }

    .category-pill.active {
        background: #00897b;
        color: white;
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.3);
        transform: translateY(-1px);
    }

    .category-pill i {
        font-size: 1.05rem;
        margin-right: 0.5rem;
    }

    /* .category-pills-container {
        padding: 2.5rem 0;
        background: linear-gradient(135deg, #f0fffd 0%, #d1f5f0 100%);
        border-bottom: 2px solid rgba(0, 196, 180, 0.2);
    } */

    .pills-list {
        gap: 1rem;
        padding: 0.8rem 0;
    }

    .pills-wrapper {
        gap: 1rem;
    }

    .scroll-arrow {
        width: 42px;
        height: 42px;
        background: transparent;
        border: 2px solid #00897b;
        box-shadow: none;
    }

    .scroll-arrow:hover {
        background: #00897b;
        color: var(--white-color);
    }

    .scroll-arrow i {
        font-size: 1.1rem;
        font-weight: 700;
    }

    .pills-scroll-container {
        padding: 0.5rem 0;
    }
}

/* Extra small devices */
@media (max-width: 375px) {
    .category-pill {
        background: transparent;
        padding: 0.8rem 1.2rem;
        font-size: 1rem;
        min-height: 42px;
    }

    .category-pill:hover {
        background: #00897b;
        color: var(--white-color);
    }

    .category-pill.active {
        background: #00897b;
        color: var(--white-color);
    }

    .category-pill i {
        font-size: 1rem;
        margin-right: 0.4rem;
    }

    .scroll-arrow {
        width: 38px;
        height: 38px;
        background: transparent;
        border: 2px solid #00897b;
        box-shadow: none;
    }

    .scroll-arrow:hover {
        background: #00897b;
        color: var(--white-color);
    }

    .scroll-arrow i {
        font-size: 1rem;
    }

    .pills-list {
        gap: 0.8rem;
    }

    .fallback-arrow {
        font-size: 1rem;
        font-weight: bold;
    }
}
</style>
