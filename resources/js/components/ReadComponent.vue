<template>
    <div class="blog-container">
        <!-- Page Header -->
        <div class="page-header">
            <div class="container">
                <h1>Islamic Insights</h1>
                <p>Delve into a profound collection of spiritual guidance, timeless stories, and divine wisdom drawn
                    from the rich tapestry of the Islamic tradition. Discover insights that illuminate the heart and
                    mind, offering solace, direction, and a deeper connection to faith.</p>
                <div class="layout-toggle mt-4">
                    <div class="btn-group" role="group" aria-label="Layout toggle">
                        <button type="button" class="btn btn-layout" :class="{ 'btn-active': layoutMode === 'grid' }" @click="layoutMode = 'grid'" aria-label="Switch to grid layout" :aria-pressed="layoutMode === 'grid'">
                            <i class="fas fa-th-large me-1"></i> Grid
                        </button>
                        <button type="button" class="btn btn-layout" :class="{ 'btn-active': layoutMode === 'list' }" @click="layoutMode = 'list'" aria-label="Switch to list layout" :aria-pressed="layoutMode === 'list'">
                            <i class="fas fa-list me-1"></i> List
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Blog Layout -->
        <div class="container py-5">
            <div class="row" :class="{ 'list-layout': layoutMode === 'list' }">
                <div v-for="(blog, index) in paginatedBlogs" :key="blog.id" :class="layoutMode === 'grid' ? 'col-lg-6 col-md-6 mb-5' : 'col-12 mb-4'">
                    <div class="card h-100 animate-card" :style="{ animationDelay: `${index * 0.1}s` }">
                        <div class="card-image-container" :class="{ 'container': layoutMode === 'grid', 'container-fluid': layoutMode === 'list' }">
                            <img :src="blog.image" class="card-img-top mb-4" style="border-radius: 10px;" :alt="blog.title">
                            <h5 class="card-title" @click="openModal(blog)" aria-label="Read full blog post">{{ blog.title }}</h5>
                            <div class="card-text" :class="{ 'list-content': layoutMode === 'list' }" v-html="blog.content"></div>
                            <p class="text-muted">Published on: {{ formatDate(blog.date) }}</p>
                            <div class="card-tags">
                                <strong class="me-2">Tags:</strong>
                                <span v-if="blog.tags && blog.tags.length" v-for="tag in blog.tags" :key="tag" class="badge me-2 mb-2">{{ tag }}</span>
                                <span v-else class="text-muted">No tags available</span>
                            </div>
                            <p class="read-more mt-4" @click="openModal(blog)" aria-label="Read full blog post">
                                Read More <i class="ms-1 fas fa-arrow-right"></i>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <nav aria-label="Blog pagination" v-if="totalPages > 1">
                <ul class="pagination justify-content-center mt-5">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="currentPage--">
                            <i class="fas fa-chevron-left me-1"></i> Previous
                        </a>
                    </li>
                    <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                        <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="currentPage++">
                            Next <i class="ms-1 fas fa-chevron-right"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <!-- Modal for Full Blog Content -->
        <div v-if="selectedBlog" class="modal show d-block animate-modal" tabindex="-1" role="dialog" @click="closeModal">
            <div class="modal-dialog modal-xl modal-dialog-centered" role="document" @click.stop>
                <div class="modal-content container">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ selectedBlog.title }}</h4>
                        <i class="bi bi-x-circle-fill h3" style="cursor: pointer;" @click="closeModal" aria-label="Close modal"></i>
                    </div>
                    <div class="modal-body">
                        <div class="modal-meta">
                            <p class="text-muted mb-3">Published on: {{ formatDate(selectedBlog.date) }}</p>
                        </div>
                        <div class="modal-image-container mb-4">
                            <img :src="selectedBlog.image" class="img-fluid rounded" :alt="selectedBlog.title">
                        </div>
                        <div class="modal-content-text" v-html="selectedBlog.content"></div>
                        <b class="text-muted mb-3"><b>Word Count:</b> {{ getWordCount(selectedBlog.content) }}</b>
                        <div class="modal-tags mt-3">
                            <strong class="me-2 fs-5">Tags:</strong>
                            <span v-if="selectedBlog.tags && selectedBlog.tags.length" v-for="tag in selectedBlog.tags" :key="tag" class="badge me-2 mb-2">{{ tag }}</span>
                            <span v-else class="text-muted">No tags available</span>
                        </div>
                        <div class="modal-hashtags mt-2">
                            <strong class="me-2 fs-5">Hashtags:</strong>
                            <span v-if="selectedBlog.hashtags && selectedBlog.hashtags.length" v-for="hashtag in selectedBlog.hashtags" :key="hashtag" class="hashtag me-2">{{ hashtag }}</span>
                            <span v-else class="text-muted">No hashtags available</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        
                        <button type="button" class="btn btn-primary" @click="shareToWhatsApp(selectedBlog)" v-tooltip="'Share to WhatsApp'" aria-label="Share blog to WhatsApp">
                            Share <i class="ms-1 fas fa-share"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="selectedBlog" class="modal-backdrop fade show"></div>
    </div>
</template>

<script>
import blogsData from '../components/blogs.json'; // Corrected path to match previous setup

export default {
    data() {
        return {
            blogs: blogsData
                .map(blog => ({
                    ...blog,
                    tags: blog.tags || [], // Ensure tags is always an array
                    hashtags: blog.hashtags || [], // Ensure hashtags is always an array
                }))
                .sort((a, b) => new Date(b.date) - new Date(a.date)), // Sort by latest date
            currentPage: 1,
            itemsPerPage: 9,
            selectedBlog: null,
            layoutMode: 'grid', // Default to grid layout
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.blogs.length / this.itemsPerPage);
        },
        paginatedBlogs() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.blogs.slice(start, start + this.itemsPerPage);
        },
    },
    methods: {
        openModal(blog) {
            console.log('Selected Blog:', blog); // Debug to verify tags and hashtags
            this.selectedBlog = blog;
            document.body.classList.add('modal-open');
        },
        closeModal() {
            this.selectedBlog = null;
            document.body.classList.remove('modal-open');
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        },
        getDay(date) {
            return new Date(date).getDate();
        },
        getMonth(date) {
            return new Date(date).toLocaleDateString('en-US', { month: 'short' });
        },
        shareBlog(blog) {
            const blogUrl = `${window.location.origin}/blog/${blog.id}`;
            navigator.clipboard.writeText(blogUrl).then(() => {
                alert('Blog link copied to clipboard!');
            }).catch(() => {
                alert('Failed to copy link. Please try again.');
            });
        },
        shareToWhatsApp(blog) {
            const blogUrl = `${window.location.origin}/blog/${blog.id}`;
            const cleanContent = blog.content.replace(/<[^>]+>/g, '').trim();
            const message = `Check out this blog: ${blog.title} ${cleanContent}`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
        },
        getWordCount(content) {
            const text = content.replace(/<[^>]+>/g, '').trim();
            return text ? text.split(/\s+/).filter(word => word.length > 0).length : 0;
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
            },
        },
    },
};
</script>

<style scoped>
/* Color Scheme */
:root {
    --primary-color: #00c4b4; /* Brighter green for buttons */
    --primary-dark: #00897b; /* Darker green for hover */
    --primary-light: #b2dfdb; /* Light green for backgrounds */
    --white-color: #ffffff;
    --black-color: #000000; /* Corrected from #fff to #000000 */
    --gray-dark: #2a2a2a; /* Darker for better contrast */
    --gray-medium: #4a4a4a; /* Darker for accessibility */
    --gray-light: #f5f5f5;
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
    padding: 5rem 0;
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
    color: var(--gray-dark);
    border: 1px solid var(--primary-color);
    padding: 10px 20px;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-layout:hover {
    background: var(--primary-light);
    color: var(--primary-dark);
    transform: translateY(-2px);
}

.btn-layout:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.btn-active {
    background: var(--primary-color);
    color: var(--white-color);
    border-color: var(--primary-color);
}

.btn-active:hover {
    background: var(--primary-dark);
    color: var(--white-color);
    transform: translateY(-2px);
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
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
}

.card-img-top {
    height: 260px;
    object-fit: cover;
    transition: transform 0.5s ease;
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
    padding: 2rem;
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
    color: var(--white-color);
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

.modal-content-text >>> h1,
.modal-content-text >>> h2,
.modal-content-text >>> h3,
.modal-content-text >>> h4 {
    color: var(--primary-dark);
    margin-bottom: 1.5rem;
    border-left: 4px solid var(--primary-color);
    padding-left: 14px;
}

.modal-content-text >>> p {
    margin-bottom: 2rem;
}

.modal-content-text >>> ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 2rem;
}

.modal-content-text >>> ul li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 1rem;
}

.modal-content-text >>> ul li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-size: 1.4rem;
}

.modal-content-text >>> blockquote {
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
    gap: 10px; /* Add spacing between buttons */
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
    .card-text {
        font-size: 1.15rem;
    }
    .list-layout .card-title {
        font-size: 1.8rem;
    }
    .list-layout .card-text {
        font-size: 1.2rem;
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
    .btn-secondary {
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
}
</style>