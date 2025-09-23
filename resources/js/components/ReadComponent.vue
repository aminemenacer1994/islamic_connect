<template>
    <div class="blog-container">
        <!-- Page Header -->
        <div class="page-header">
            <div class="container-fluid">
                <h1>Islamic Insights</h1>
                <p>Delve into a profound collection of spiritual guidance, timeless stories, and divine wisdom drawn
                    from the rich tapestry of the Islamic tradition. Discover insights that illuminate the heart and
                    mind, offering solace, direction, and a deeper connection to faith.</p>
            </div>
        </div>

        <!-- 3-Column Grid Layout -->
        <div class="container py-5">
            <div class="row">
                <div v-for="(blog, index) in paginatedBlogs" :key="blog.id" class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 shadow-lg border-0 animate-card"
                        :style="{ animationDelay: `${index * 0.1}s` }">
                        <div class="card-image-container container">
                            <!-- <img :src="blog.image" class="card-img-top" :alt="blog.title"> -->
                            <!-- <div class="card-date-overlay">
                                <span class="date-day">{{ getDay(blog.date) }}</span>
                                <span class="date-month">{{ getMonth(blog.date) }}</span>
                            </div> -->
                        
                            <h5 class="card-title">{{ blog.title }}</h5>
                            <div class="card-text flex-grow-1" v-html="blog.content"></div>
                            <p class="text-muted mb-3">Published on: {{ formatDate(blog.date) }}</p>
                            <div class="tags-container text-muted">
                                <strong class="d-block mb-2">Tags:</strong>
                                <span v-for="tag in blog.tags" :key="tag" class="badge me-2 mb-2">{{ tag }}</span>
                            </div>
                            <div class="hashtags-container mt-2">
                                <strong class="d-block mb-2">Hashtags:</strong>
                                <span v-for="hashtag in blog.hashtags" :key="hashtag" class="hashtag me-2">{{ hashtag
                                    }}</span>
                            </div>
                            <button class="btn mt-4 align-self-start" @click="openModal(blog)">
                                Read More <i class="ms-1 fas fa-arrow-right"></i>
                            </button>
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
                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ active: currentPage === page }">
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
        <div v-if="selectedBlog" class="modal show d-block animate-modal" tabindex="-1" role="dialog"
            @click="closeModal">
            <div class="modal-dialog modal-xl modal-dialog-centered" role="document" @click.stop>
                <div class="modal-content container">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ selectedBlog.title }}</h4>
                        <i class="bi bi-x-circle-fill h3" style="cursor: pointer;" @click="closeModal"></i>
                    </div>
                    <div class="modal-body ">
                        <div class="modal-meta">
                            <p class="text-muted mb-3">Published on: {{ formatDate(selectedBlog.date) }}</p>
                        </div>
                        <!-- <div class="modal-image-container mb-4">
                            <img :src="selectedBlog.image" class="img-fluid rounded" :alt="selectedBlog.title">
                        </div> -->
                        <div class="modal-content-text" v-html="selectedBlog.content"></div>
                        <div class="modal-tags">
                            <strong class="me-2 fs-5">Tags:</strong>
                            <span v-for="tag in selectedBlog.tags" :key="tag" class="badge me-2 mb-2">{{ tag }}</span>
                        </div>
                        <div class="modal-hashtags mt-2">
                            <strong class="me-2 fs-5">Hashtags:</strong>
                            <span v-for="hashtag in selectedBlog.hashtags" :key="hashtag" class="hashtag me-2">{{hashtag }}</span>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                        <button type="button" class="btn btn-primary position-relative" @click="shareBlog"
                            v-tooltip="'Copy link to clipboard'">
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
            blogs: blogsData.sort((a, b) => new Date(b.date) - new Date(a.date)), // Sort by latest date
            currentPage: 1,
            itemsPerPage: 9,
            selectedBlog: null,
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
        shareBlog() {
            if (this.selectedBlog) {
                const blogUrl = `${window.location.origin}/blog/${this.selectedBlog.id}`;
                navigator.clipboard.writeText(blogUrl).then(() => {
                    alert('Blog link copied to clipboard!');
                }).catch(() => {
                    alert('Failed to copy link. Please try again.');
                });
            }
        },
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
    --primary-color: #00c4b4;
    /* Brighter green for buttons */
    --primary-dark: #00897b;
    /* Darker green for hover */
    --primary-light: #b2dfdb;
    /* Light green for backgrounds */
    --white-color: #ffffff;
    --black-color: #000000;
    --gray-dark: #333333;
    --gray-medium: #555555;
    --gray-light: #f5f5f5;
}

/* General Styles */
.blog-container {
    font-family: 'Roboto', sans-serif;
    color: var(--gray-dark);
    background: linear-gradient(135deg, var(--white-color) 0%, var(--gray-light) 100%);
    min-height: 100vh;
}

/* Page Header */
.page-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
    color: var(--white-color);
    padding: 4rem 0;
    text-align: center;
}

.page-header h1 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.75rem;
    letter-spacing: 0.5px;
}

.page-header p {
    font-size: 1.3rem;
    font-weight: 400;
    margin: 0 auto;
    opacity: 0.9;
}

/* Card Styles */
.card {
    background: var(--white-color);
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 191, 166, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
}

.card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 191, 166, 0.25);
}

/* .card-image-container {
    position: relative;
    overflow: hidden;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
} */

.card-img-top {
    height: 240px;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.card:hover .card-img-top {
    transform: scale(1.08);
}

.card-date-overlay {
    position: absolute;
    top: 20px;
    left: 20px;
    background: var(--primary-dark);
    color: var(--white-color);
    padding: 10px 12px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.date-day {
    display: block;
    font-size: 1.8rem;
    font-weight: 700;
}

.date-month {
    display: block;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-weight: 500;
}

.card-body {
    padding: 2rem;
}

.card-title {
    padding: 15px;
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--black-color);
    margin-bottom: 1rem;
    line-height: 1.4;
}

.card-text {
    padding: 15px;
    font-size: 1.15rem;
    color: var(--gray-dark);
    max-height: 250px;
    overflow: hidden;
    line-height: 1.7;
    margin-bottom: 1.7rem;
    display: grid;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.text-muted {
    font-size: 1rem;
    color: var(--gray-medium);
    font-weight: 400;
}

/* Tags and Hashtags */
.tags-container,
.hashtags-container {
    margin-bottom: 1rem;
}

.tags-container strong,
.hashtags-container strong {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--gray-dark);
}

.badge {
    background: var(--white-color);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    font-size: 0.85rem;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 20px;
    transition: background 0.2s ease, color 0.2s ease;
}

.badge:hover {
    background: var(--primary-light);
    color: var(--primary-dark);
}

.hashtag {
    color: var(--primary-color);
    font-size: 0.85rem;
    font-weight: 500;
    transition: color 0.2s ease;
}

.hashtag:hover {
    color: var(--primary-dark);
}

/* Button Styles */
.btn-primary {
    /* background: linear-gradient(90deg, var(--primary-color), var(--primary-dark)); */
    border: none;
    color: var(--white-color);
    font-size: 1.15rem;
    font-weight: 600;
    border-radius: 8px;
    padding: 12px 24px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.btn-primary:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 191, 166, 0.3);
}

/* Pagination Styles */
.pagination {
    gap: 10px;
}

.page-link {
    color: var(--primary-color);
    font-size: 1.15rem;
    font-weight: 500;
    border-radius: 8px;
    padding: 10px 18px;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.page-item.active .page-link {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--white-color);
}

.page-link:hover {
    background: var(--primary-light);
    color: var(--primary-dark);
    transform: scale(1.1);
}

.page-item.disabled .page-link {
    color: var(--gray-medium);
    cursor: not-allowed;
}

/* Modal Styles */
.modal-content {
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0, 191, 166, 0.3);
    overflow: hidden;
}

.modal-header {
    background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
    border-bottom: none;
    padding: 1.75rem 2rem;
}

.modal-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--white-color);
}

.btn-close {
    filter: invert(1);
    opacity: 0.8;
    transition: opacity 0.2s ease;
}

.btn-close:hover {
    opacity: 1;
}

.modal-body {
    font-size: 1.25rem;
    line-height: 1.8;
    color: var(--gray-dark);
    background: var(--white-color);
}

.modal-meta {
    border-bottom: 1px solid var(--primary-light);
}

.modal-tags strong,
.modal-hashtags strong {
    font-size: 1.1rem;
    font-weight: 600;
}

.modal-image-container img {
    width: 100%;
    max-height: 350px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-content-text>>>h1,
.modal-content-text>>>h2,
.modal-content-text>>>h3,
.modal-content-text>>>h4 {
    color: var(--primary-dark);
    margin-bottom: 1.2rem;
    border-left: 4px solid var(--primary-color);
    padding-left: 12px;
}

.modal-content-text>>>p {
    margin-bottom: 1.8rem;
}

.modal-content-text>>>ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 1.8rem;
}

.modal-content-text>>>ul li {
    position: relative;
    padding-left: 24px;
    margin-bottom: 0.8rem;
}

.modal-content-text>>>ul li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-size: 1.3rem;
}

.modal-content-text>>>blockquote {
    border-left: 4px solid var(--primary-color);
    padding-left: 1.2rem;
    margin: 1.8rem 0;
    font-style: italic;
    color: var(--gray-medium);
    background: var(--gray-light);
    padding: 1rem;
    border-radius: 8px;
}

.modal-footer {
    border-top: none;
    padding: 1.5rem 2rem;
}

.btn-secondary {
    background: var(--gray-medium);
    border: none;
    font-size: 1.15rem;
    font-weight: 600;
    border-radius: 8px;
    padding: 12px 24px;
    transition: transform 0.2s ease, background 0.2s ease;
}

.btn-secondary:hover {
    background: var(--gray-dark);
    transform: scale(1.05);
}

/* Animations */
.animate-card {
    animation: fadeInUp 0.6s ease-out forwards;
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

.animate-modal {
    animation: scaleIn 0.3s ease-out forwards;
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

/* Modal Backdrop */
.modal-backdrop {
    background: rgba(0, 0, 0, 0.7);
}

/* Responsive Adjustments */
@media (max-width: 992px) {
    .page-header h1 {
        font-size: 2.5rem;
    }

    .page-header p {
        font-size: 1.1rem;
    }

    .card-img-top {
        height: 200px;
    }

    .card-title {
        font-size: 1.4rem;
    }
}

@media (max-width: 768px) {
    .page-header {
        padding: 3rem 0;
    }

    .page-header h1 {
        font-size: 2rem;
    }

    .page-header p {
        font-size: 1rem;
    }

    .card-img-top {
        height: 180px;
    }

    .card-body {
        padding: 1.5rem;
    }

    .modal-title {
        font-size: 1.6rem;
    }

    .modal-body {
        padding: 1.75rem;
    }

    .modal-image-container img {
        max-height: 250px;
    }
}

@media (max-width: 576px) {
    .card-date-overlay {
        top: 10px;
        left: 10px;
        padding: 8px 10px;
    }

    .date-day {
        font-size: 1.4rem;
    }

    .date-month {
        font-size: 0.75rem;
    }

    .btn-primary,
    .btn-secondary {
        padding: 10px 20px;
        font-size: 1rem;
    }
}
</style>