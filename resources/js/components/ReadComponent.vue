<template>
    <div class="blog-container">
        <!-- Page Header -->
        <div class="page-header">
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
                        <i class="fas fa-chevron-left"></i>
                    </button>

                    <div ref="pillsContainer" class="pills-scroll-container" @scroll="updateArrowVisibility">
                        <div class="pills-list">
                            <button v-for="category in categories" :key="category.id" @click="selectCategory(category)"
                                :class="['category-pill', { 'active': selectedCategory.id === category.id }]">
                                <i :class="category.icon" class="me-2"></i>
                                {{ category.name }}
                            </button>
                        </div>
                    </div>

                    <button v-if="showRightArrow" @click="scrollRight" class="scroll-arrow scroll-arrow-right"
                        aria-label="Scroll categories right">
                        <i class="fas fa-chevron-right"></i>
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
            <transition-group name="blog-list" tag="div" class="row" :class="{ 'list-layout': layoutMode === 'list' }">
                <div v-for="(blog, index) in paginatedBlogs" :key="blog.id"
                    :class="layoutMode === 'grid' ? 'col-lg-6 col-md-6 mb-5' : 'col-12 mb-4'" :ref="`blog-${blog.id}`">
                    <div class="card h-100 animate-card" :style="{ animationDelay: `${index * 0.05}s` }">
                        <div class="card-image-container"
                            :class="{ 'container': layoutMode === 'grid', 'container-fluid': layoutMode === 'list' }">
                            <img :src="blog.image" class="card-img-top mb-4" style="border-radius: 10px;"
                                :alt="blog.title">
                            <h5 class="card-title" @click="openModal(blog)" aria-label="Read full blog post"
                                v-html="highlight(blog.title)"></h5>
                            <div class="card-text" :class="{ 'list-content': layoutMode === 'list' }"
                                v-html="highlight(blog.content)"></div>
                            <p class="text-muted">Published on: {{ formatDate(blog.date) }}</p>
                            <div class="card-tags">
                                <strong class="me-2">Tags:</strong>
                                <span v-if="blog.tags && blog.tags.length" v-for="tag in blog.tags" :key="tag"
                                    class="badge me-2 mb-2" v-html="highlight(tag)"></span>
                                <span v-else class="text-muted">No tags available</span>
                            </div>
                            <p class="read-more mt-4" @click="openModal(blog)" aria-label="Read full blog post">
                                Read More <i class="ms-1 fas fa-arrow-right"></i>
                            </p>
                        </div>
                    </div>
                </div>
            </transition-group>

            <!-- Pagination -->
            <nav aria-label="Blog pagination" v-if="totalPages > 1">
                <ul class="pagination justify-content-center mt-5">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                            <i class="fas fa-chevron-left me-1"></i> Previous
                        </a>
                    </li>
                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ active: currentPage === page }">
                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                            Next <i class="ms-1 fas fa-chevron-right"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Modal for Full Blog Content -->
        <div v-if="selectedBlog" class="modal show d-block animate-modal" tabindex="-1" role="dialog"
            @click="closeModal">
            <div class="modal-dialog modal-xl modal-dialog-centered" role="document" @click.stop>
                <div class="modal-content container">
                    <div class="modal-header">
                        <h4 class="modal-title" v-html="highlight(selectedBlog.title)"></h4>
                        <i class="bi bi-x-circle-fill h3" style="cursor: pointer;" @click="closeModal"
                            aria-label="Close modal"></i>
                    </div>
                    <div class="modal-body">
                        <div class="modal-meta">
                            <p class="text-muted mb-3">Published on: {{ formatDate(selectedBlog.date) }}</p>
                        </div>
                        <div class="modal-image-container mb-4">
                            <img :src="selectedBlog.image" class="img-fluid rounded" :alt="selectedBlog.title">
                        </div>
                        <div class="modal-content-text" v-html="highlight(selectedBlog.content)"></div>
                        <div class="modal-tags mt-3">
                            <strong class="me-2 fs-5">Tags:</strong>
                            <span v-if="selectedBlog.tags && selectedBlog.tags.length" v-for="tag in selectedBlog.tags"
                                :key="tag" class="badge me-2 mb-2" v-html="highlight(tag)"></span>
                            <span v-else class="text-muted">No tags available</span>
                        </div>
                        <div class="modal-hashtags mt-2">
                            <strong class="me-2 fs-5">Hashtags:</strong>
                            <span v-if="selectedBlog.hashtags && selectedBlog.hashtags.length"
                                v-for="hashtag in selectedBlog.hashtags" :key="hashtag" class="hashtag me-2"
                                v-html="highlight(hashtag)"></span>
                            <span v-else class="text-muted">No hashtags available</span>
                        </div>
                        <div v-if="summaryText" ref="summarySection" class="modal-summary mt-4">
                            <h5 class="mb-2"><strong>Summary:</strong></h5>
                            <div v-html="summaryText"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn " @click="shareToWhatsApp(selectedBlog)"
                            v-tooltip="'Share to WhatsApp'" aria-label="Share blog to WhatsApp">
                            <b>Share <i class="ms-1 fas fa-share"></i></b>
                        </button>
                        <button type="button" class="btn " @click="summarizeBlog" :disabled="summaryLoading"
                            v-tooltip="'Generate summary'" aria-label="Generate summary">
                            <span v-if="summaryLoading"><i class="fas fa-spinner fa-spin"></i> Generating...</span>
                            <span v-else><b>Generate Summary <i class="ms-1 fas fa-book"></i></b></span>
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

export default {
    data() {
        return {
            blogs: blogsData.map(blog => ({
                ...blog,
                tags: blog.tags || [],
                hashtags: blog.hashtags || [],
                wordCount: this.getWordCount(blog.content)
            })),
            filtersVisible: true,
            uniqueTags: [],
            currentPage: 1,
            itemsPerPage: 8,
            selectedBlog: null,
            layoutMode: 'grid',
            searchTerm: '',
            selectedTag: 'all',
            sortBy: 'newest',
            summaryText: '',
            summaryLoading: false,
            summaryError: '',
            showSummary: true,
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
            showRightArrow: true
        };
    },
    computed: {
        uniqueTags() {
            const tags = new Set(this.blogs.flatMap(blog => blog.tags || []));
            return ['all', ...Array.from(tags)];
        },
        filteredBlogs() {
            let result = [...this.blogs];

            // Filter by category pill selection
            if (this.selectedCategory.tag !== 'all') {
                result = result.filter(blog =>
                    blog.tags && blog.tags.some(tag =>
                        tag.toLowerCase().includes(this.selectedCategory.tag.toLowerCase())
                    )
                );
            }

            // Filter by tag dropdown
            if (this.selectedTag !== 'all') {
                result = result.filter(blog => blog.tags && blog.tags.includes(this.selectedTag));
            }

            // Filter by search term
            if (this.searchTerm.length >= 3) {
                const searchLower = this.searchTerm.toLowerCase();
                result = result.filter(blog =>
                    blog.title.toLowerCase().includes(searchLower) ||
                    blog.content.toLowerCase().includes(searchLower) ||
                    (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
                    (blog.hashtags && blog.hashtags.some(hashtag => hashtag.toLowerCase().includes(searchLower)))
                );
            }

            result = this.sortBlogs(result);
            return result;
        },
        paginatedBlogs() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredBlogs.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredBlogs.length / this.itemsPerPage);
        }
    },
    watch: {
        searchTerm() { this.currentPage = 1; },
        selectedTag() { this.currentPage = 1; },
        sortBy() { this.currentPage = 1; },
        selectedCategory() { this.currentPage = 1; }
    },
    mounted() {
        // Add all categories option at the beginning
        this.categories.unshift({ id: 0, name: 'All Categories', icon: 'fas fa-list', tag: 'all' });
        this.selectedCategory = this.categories[0];

        // Initialize arrow visibility
        this.$nextTick(() => {
            this.updateArrowVisibility();
        });
    },
    methods: {
        toggleFilters() {
            this.filtersVisible = !this.filtersVisible;
        },
        selectCategory(category) {
            this.selectedCategory = category;
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
        sortBlogs(blogs) {
            return [...blogs].sort((a, b) => {
                switch (this.sortBy) {
                    case 'id':
                        return a.id - b.id;
                    case 'nameZA':
                        return b.title.localeCompare(a.title);
                    case 'oldest':
                        return new Date(a.date) - new Date(b.date);
                    case 'newest':
                    default:
                        return new Date(b.date) - new Date(a.date);
                }
            });
        },
        highlight(text) {
            if (!this.searchTerm || this.searchTerm.length < 3) return text;
            const regex = new RegExp(`(${_.escapeRegExp(this.searchTerm)})`, 'gi');
            return typeof text === 'string' ? text.replace(regex, '<span class="highlight">$1</span>') : text;
        },
        debounceSearch: _.debounce(function () { this.$forceUpdate(); }, 200),
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
                        summary += `<p style="margin-bottom:1em;">${highlight(sentence.trim())}</p>`;
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
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
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
    border-radius: 8px;
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
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    border-radius: 20px;
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    white-space: nowrap;
    min-width: max-content;
}

.category-pill:hover {
    background: var(--primary-color);
    color: var(--white-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 196, 180, 0.2);
}

.category-pill.active {
    background: var(--primary-color);
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
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
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
}

.scroll-arrow:hover {
    background: var(--primary-color);
    color: var(--white-color);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 196, 180, 0.4);
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

/* Page Header */
.page-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
    color: var(--white-color);
    padding: 2rem 0;
    text-align: center;
}

.page-header h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-header p {
    font-size: 1.4rem;
    font-weight: 400;
    margin: 0 auto;
    opacity: 0.95;
    line-height: 1.8;
}

/* Layout Toggle */
.layout-toggle {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.btn-group {
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-layout {
    background: var(--gray-light);
    color: var(--white-color);
    border: 1px solid var(--primary-color);
    padding: 10px 20px;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-layout:hover {
    background: var(--primary-light);
    color: var(--white-color);
    transform: translateY(-2px);
}

.btn-layout:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.btn-layout i {
    color: var(--white-color);
}

.btn-active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.btn-active:hover {
    background: var(--primary-dark);
    color: var(--white-color);
    transform: translateY(-2px);
}

.btn-active i {
    color: var(--white-color);
}

/* Filter Container */
.filter-container {
    padding-top: 5px;
    background: linear-gradient(135deg, var(--white-color) 0%, var(--gray-light) 100%);
}

.filter-card {
    background: linear-gradient(135deg, var(--white-color) 0%, #f0f4f8 100%);
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--primary-light);
    padding: 0.8rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.filter-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 191, 166, 0.2);
}

/* Search and Filters */
.input-group {
    position: relative;
    width: 100%;
}

.form-control,
.form-select {
    border: 1px solid var(--primary-color);
    border-radius: 10px;
    padding: 12px 15px;
    font-size: 1.1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control-lg {
    font-size: 1.2rem;
}

.form-select-lg {
    font-size: 1.2rem;
    padding: 14px 20px;
}

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
    background: var(--primary-color);
    color: var(--white-color);
    border: none;
    border-radius: 0 10px 10px 0;
    padding: 12px 15px;
    transition: background 0.3s ease;
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
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0, 191, 166, 0.1);
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
}

.card:hover {
    transform: translateY(-12px) scale(1.03);
    box-shadow: 0 16px 32px rgba(0, 191, 166, 0.25);
}

.card-image-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.card-img-top {
    height: 260px;
    object-fit: cover;
    transition: transform 0.5s ease;
    border-radius: 10px;
}

.card:hover .card-img-top {
    transform: scale(1.1);
}

.card-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--black-color);
    margin-bottom: 1rem;
    line-height: 1.4;
    cursor: pointer;
    transition: color 0.3s ease;
    padding: 0;
}

.card-title:hover {
    color: var(--primary-color);
}

.card-title:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.card-text {
    font-size: 1.2rem;
    color: var(--gray-dark);
    max-height: 360px;
    overflow: hidden;
    line-height: 1.8;
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
    margin-top: 1.5rem;
}

.card-tags strong,
.modal-tags strong,
.modal-hashtags strong {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--gray-dark);
}

.badge {
    background: var(--white-color);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 20px;
    transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.badge:hover {
    background: var(--primary-light);
    color: var(--primary-dark);
    transform: scale(1.05);
}

.hashtag {
    color: var(--primary-color);
    font-size: 0.9rem;
    font-weight: 500;
    transition: color 0.3s ease;
}

.hashtag:hover {
    color: var(--primary-dark);
}

.read-more {
    color: var(--primary-color);
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;
    padding: 0;
}

.read-more:hover {
    color: var(--primary-dark);
    transform: translateX(6px);
}

.read-more:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.read-more .fa-arrow-right {
    transition: transform 0.3s ease;
}

.read-more:hover .fa-arrow-right {
    transform: translateX(5px);
}

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

/* Pagination Styles */
.pagination {
    gap: 12px;
}

.page-link {
    color: var(--primary-color);
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    padding: 12px 20px;
    transition: all 0.3s ease;
    border: 1px solid var(--primary-color);
}

.page-item.active .page-link {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
}

.page-link:hover {
    background: var(--primary-light);
    color: var(--primary-dark);
    transform: translateY(-2px);
}

.page-link:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.page-item.disabled .page-link {
    color: var(--gray-medium);
    cursor: not-allowed;
    border-color: var(--gray-medium);
}

/* Modal Styles */
.modal-content {
    border-radius: 20px;
    box-shadow: 0 16px 40px rgba(0, 191, 166, 0.3);
    overflow: hidden;
}

.modal-header {
    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
    border-bottom: none;
    padding: 2rem;
}

.modal-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--white-color);
}

.bi-x-circle-fill {
    color: var(--white-color);
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
    font-size: 1.3rem;
    line-height: 1.9;
    color: var(--gray-dark);
    padding: 2rem;
}

.modal-meta {
    border-bottom: 1px solid var(--primary-light);
    padding-bottom: 1rem;
}

.modal-image-container img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-content-text>>>h1,
.modal-content-text>>>h2,
.modal-content-text>>>h3,
.modal-content-text>>>h4 {
    color: var(--primary-dark);
    margin-bottom: 1.5rem;
    border-left: 4px solid var(--primary-color);
    padding-left: 14px;
}

.modal-content-text>>>p {
    margin-bottom: 2rem;
}

.modal-content-text>>>ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 2rem;
}

.modal-content-text>>>ul li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 1rem;
}

.modal-content-text>>>ul li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-size: 1.4rem;
}

.modal-content-text>>>blockquote {
    border-left: 4px solid var(--primary-color);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--gray-medium);
    background: var(--gray-light);
    padding: 1.2rem;
    border-radius: 10px;
}

.modal-footer {
    border-top: none;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 10px;
}

.btn-primary {
    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
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
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 191, 166, 0.3);
}

.btn-primary:focus {
    outline: 2px solid var(--primary-color);
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
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
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
    background: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 191, 166, 0.3);
}

.btn-info:focus {
    outline: 2px solid var(--primary-color);
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
    border-left: 4px solid var(--primary-color);
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
        background: var(--primary-color);
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.4);
    }

    .scroll-arrow {
        width: 38px;
        height: 38px;
        background: transparent;
        border: 2px solid var(--primary-color);
        box-shadow: none;
    }

    .scroll-arrow:hover {
        background: var(--primary-color);
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
        background: var(--primary-color);
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.25);
        transform: translateY(-2px);
    }

    .category-pill.active {
        background: var(--primary-color);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.3);
        transform: translateY(-1px);
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
        border: 2px solid var(--primary-color);
        box-shadow: none;
    }

    .scroll-arrow:hover {
        background: var(--primary-color);
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.4);
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
        background: var(--primary-color);
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.25);
        transform: translateY(-2px);
    }

    .category-pill.active {
        background: var(--primary-color);
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
        border: 2px solid var(--primary-color);
        box-shadow: none;
    }

    .scroll-arrow:hover {
        background: var(--primary-color);
        color: var(--white-color);
        box-shadow: 0 6px 16px rgba(0, 196, 180, 0.5);
        transform: scale(1.1);
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
        background: var(--primary-color);
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.4);
    }

    .category-pill.active {
        background: var(--primary-color);
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.4);
    }

    .category-pill i {
        font-size: 1rem;
        margin-right: 0.4rem;
    }

    .scroll-arrow {
        width: 38px;
        height: 38px;
        background: transparent;
        border: 2px solid var(--primary-color);
        box-shadow: none;
    }

    .scroll-arrow:hover {
        background: var(--primary-color);
        color: var(--white-color);
        box-shadow: 0 4px 12px rgba(0, 196, 180, 0.4);
    }

    .scroll-arrow i {
        font-size: 1rem;
    }

    .pills-list {
        gap: 0.8rem;
    }

    /* .category-pills-container {
        padding: 2rem 0;
    } */
}
</style>