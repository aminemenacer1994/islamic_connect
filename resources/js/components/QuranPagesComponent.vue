<template>
    <div class="quran-pages-container" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <!-- Header -->
        <div class="page-header">
            <div class="container">
                <h1 class="display-5 fw-bold text-center mb-4">Quran Page Viewer</h1>
                <p class="text-center text-muted mb-4">Browse all 604 pages of the Holy Quran</p>
            </div>
        </div>

        <!-- Main Layout -->
        <div class="page-layout">
            <!-- Sidebar -->
            <div class="page-sidebar" :class="{ 'collapsed': sidebarCollapsed }">
                <div class="sidebar-header">
                    <h5 class="sidebar-title" v-if="!sidebarCollapsed">Pages</h5>
                    <button @click="toggleSidebar" class="sidebar-toggle-btn" :title="sidebarCollapsed ? 'Expand' : 'Collapse'">
                        <i class="fas" :class="sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'"></i>
                    </button>
                </div>
                
                <div class="sidebar-content" v-if="!sidebarCollapsed">
                    <!-- Quick Jump -->
                    <div class="quick-jump mb-3">
                        <label class="form-label">Jump to Page</label>
                        <input 
                            type="number" 
                            class="form-control" 
                            v-model.number="jumpToPageInput"
                            @keyup.enter="jumpToPage"
                            min="1" 
                            max="604" 
                            placeholder="1-604"
                        />
                        <button @click="jumpToPage" class="btn btn-primary btn-sm mt-2 w-100">Go</button>
                    </div>

                    <!-- Page List -->
                    <div class="page-list">
                        <div 
                            v-for="page in pageRange" 
                            :key="page"
                            class="page-item"
                            :class="{ 'active': page === currentPage }"
                            @click="goToPage(page)"
                        >
                            <span class="page-number">Page {{ page }}</span>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="page-content">
                <!-- Page Info Bar -->
                <div class="page-info-bar" v-if="pageMetadata">
                    <div class="info-item">
                        <i class="fas fa-book"></i>
                        <span>Page {{ currentPage }} of 604</span>
                    </div>
                    <div class="info-item" v-if="pageMetadata.juz">
                        <i class="fas fa-bookmark"></i>
                        <span>Juz {{ pageMetadata.juz }}</span>
                    </div>
                    <div class="info-item" v-if="pageMetadata.surahs && pageMetadata.surahs.length > 0">
                        <i class="fas fa-quran"></i>
                        <span>{{ pageMetadata.surahs.map(s => s.englishName).join(', ') }}</span>
                    </div>
                </div>

                <!-- Navigation Controls (Desktop) -->
                <div class="navigation-controls desktop-only">
                    <button 
                        @click="goToPage(1)" 
                        class="nav-btn"
                        :disabled="currentPage === 1"
                        title="First Page"
                    >
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button 
                        @click="previousPage" 
                        class="nav-btn"
                        :disabled="currentPage === 1"
                        title="Previous Page"
                    >
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    
                    <div class="page-indicator">
                        <input 
                            type="number" 
                            v-model.number="currentPageInput"
                            @keyup.enter="goToPageFromInput"
                            @blur="goToPageFromInput"
                            class="page-input"
                            min="1"
                            max="604"
                        />
                        <span class="page-total">/ 604</span>
                    </div>

                    <button 
                        @click="nextPage" 
                        class="nav-btn"
                        :disabled="currentPage === 604"
                        title="Next Page"
                    >
                        <i class="fas fa-chevron-right"></i>
                    </button>
                    <button 
                        @click="goToPage(604)" 
                        class="nav-btn"
                        :disabled="currentPage === 604"
                        title="Last Page"
                    >
                        <i class="fas fa-step-forward"></i>
                    </button>
                </div>

                <!-- Image Viewer -->
                <div class="image-viewer" 
                     @touchstart="handleTouchStart"
                     @touchmove="handleTouchMove"
                     @touchend="handleTouchEnd"
                >
                    <div v-if="loading" class="loading-spinner">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="mt-3">Loading page {{ currentPage }}...</p>
                    </div>
                    
                    <div v-else-if="error" class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>{{ error }}</p>
                        <button @click="loadPage(currentPage)" class="btn btn-primary">Retry</button>
                    </div>

                    <transition :name="transitionName" mode="out-in">
                        <div 
                            v-if="!loading && !error && pageMetadata"
                            :key="currentPage"
                            class="quran-page-text"
                        >
                            <div class="page-header-info">
                                <div class="surah-info" v-for="surah in pageMetadata.surahs" :key="surah.number">
                                    <div class="surah-name">{{ surah.name }}</div>
                                    <div class="surah-english">{{ surah.englishName }} - {{ surah.englishNameTranslation }}</div>
                                    <div class="bismillah" v-if="shouldShowBismillah(surah)">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                                </div>
                            </div>
                            <div class="ayahs-container">
                                <span 
                                    v-for="(ayah, index) in pageMetadata.ayahs" 
                                    :key="ayah.number"
                                    class="ayah-text"
                                >
                                    {{ ayah.text }}
                                    <span class="ayah-number">﴿{{ ayah.numberInSurah }}﴾</span>
                                    {{ index < pageMetadata.ayahs.length - 1 ? ' ' : '' }}
                                </span>
                            </div>
                        </div>
                    </transition>
                </div>

                <!-- Mobile Navigation -->
                <div class="navigation-controls mobile-only">
                    <button 
                        @click="previousPage" 
                        class="nav-btn mobile-nav"
                        :disabled="currentPage === 1"
                    >
                        <i class="fas fa-chevron-left"></i>
                        <span>Previous</span>
                    </button>
                    
                    <div class="page-indicator-mobile">
                        {{ currentPage }} / 604
                    </div>

                    <button 
                        @click="nextPage" 
                        class="nav-btn mobile-nav"
                        :disabled="currentPage === 604"
                    >
                        <span>Next</span>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>

                <!-- Swipe Tip (Mobile) -->
                <div v-if="showSwipeTip" class="swipe-tip alert alert-info">
                    <span>💡 Swipe left or right to navigate between pages</span>
                    <button @click="dismissSwipeTip" class="btn-close"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'QuranPagesComponent',
    
    data() {
        return {
            currentPage: 1,
            currentPageInput: 1,
            jumpToPageInput: '',
            pageMetadata: null,
            loading: false,
            error: null,
            sidebarCollapsed: false,
            showSwipeTip: true,
            transitionName: 'slide-next',
            
            // Touch handling
            touchStartX: 0,
            touchEndX: 0,
            minSwipeDistance: 50,
        };
    },

    computed: {
        pageRange() {
            // Show pages around current page in sidebar
            const range = [];
            const start = Math.max(1, this.currentPage - 10);
            const end = Math.min(604, this.currentPage + 10);
            
            for (let i = start; i <= end; i++) {
                range.push(i);
            }
            
            return range;
        }
    },

    mounted() {
        // Check URL for page parameter
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        
        if (pageParam) {
            const page = parseInt(pageParam);
            if (page >= 1 && page <= 604) {
                this.currentPage = page;
                this.currentPageInput = page;
            }
        }
        
        this.loadPage(this.currentPage);
        
        // Keyboard navigation
        window.addEventListener('keydown', this.handleKeyPress);
        
        // Check if swipe tip was dismissed
        if (localStorage.getItem('quran-pages-swipe-tip-dismissed')) {
            this.showSwipeTip = false;
        }
    },

    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    },

    methods: {
        async loadPage(pageNumber) {
            if (pageNumber < 1 || pageNumber > 604) {
                this.error = 'Invalid page number. Please enter a number between 1 and 604.';
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(`/api/quran-pages/${pageNumber}`);
                this.pageMetadata = response.data;
                this.currentPage = pageNumber;
                this.currentPageInput = pageNumber;
                
                // Update URL without reload
                const url = new URL(window.location);
                url.searchParams.set('page', pageNumber);
                window.history.pushState({}, '', url);
                
            } catch (err) {
                console.error('Error loading page:', err);
                this.error = err.response?.data?.error || 'Failed to load page metadata. Please try again.';
            } finally {
                this.loading = false;
            }
        },

        goToPage(pageNumber) {
            if (pageNumber === this.currentPage) return;
            
            this.transitionName = pageNumber > this.currentPage ? 'slide-next' : 'slide-prev';
            this.loadPage(pageNumber);
        },

        previousPage() {
            if (this.currentPage > 1) {
                this.transitionName = 'slide-prev';
                this.loadPage(this.currentPage - 1);
            }
        },

        nextPage() {
            if (this.currentPage < 604) {
                this.transitionName = 'slide-next';
                this.loadPage(this.currentPage + 1);
            }
        },

        jumpToPage() {
            const page = parseInt(this.jumpToPageInput);
            if (page >= 1 && page <= 604) {
                this.goToPage(page);
                this.jumpToPageInput = '';
            }
        },

        goToPageFromInput() {
            const page = parseInt(this.currentPageInput);
            if (page >= 1 && page <= 604 && page !== this.currentPage) {
                this.goToPage(page);
            } else {
                this.currentPageInput = this.currentPage;
            }
        },

        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },

        handleKeyPress(e) {
            // Ignore if user is typing in an input
            if (e.target.tagName === 'INPUT') return;

            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousPage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextPage();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToPage(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToPage(604);
                    break;
            }
        },

        // Touch handling for mobile swipe
        handleTouchStart(e) {
            this.touchStartX = e.changedTouches[0].screenX;
        },

        handleTouchMove(e) {
            // Prevent default to avoid scrolling while swiping
            if (Math.abs(e.changedTouches[0].screenX - this.touchStartX) > 10) {
                e.preventDefault();
            }
        },

        handleTouchEnd(e) {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        },

        handleSwipe() {
            const swipeDistance = this.touchEndX - this.touchStartX;
            
            if (Math.abs(swipeDistance) > this.minSwipeDistance) {
                if (swipeDistance > 0) {
                    // Swipe right - previous page
                    this.previousPage();
                } else {
                    // Swipe left - next page
                    this.nextPage();
                }
            }
        },

        dismissSwipeTip() {
            this.showSwipeTip = false;
            localStorage.setItem('quran-pages-swipe-tip-dismissed', 'true');
        },

        shouldShowBismillah(surah) {
            // Show Bismillah for all surahs except Al-Fatiha (1) and At-Tawbah (9)
            // And only show at the beginning of the surah
            if (surah.number === 1 || surah.number === 9) {
                return false;
            }
            // Check if this is the first page of the surah
            if (this.pageMetadata && this.pageMetadata.ayahs && this.pageMetadata.ayahs.length > 0) {
                const firstAyah = this.pageMetadata.ayahs[0];
                return firstAyah.surahNumber === surah.number && firstAyah.numberInSurah === 1;
            }
            return false;
        }
    }
};
</script>

<style scoped>
.quran-pages-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding-bottom: 2rem;
}

.page-header {
    background: linear-gradient(135deg, #1a5f7a 0%, #0b806f 100%);
    color: white;
    padding: 3rem 0 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
    margin: 0;
    font-weight: 700;
}

.page-layout {
    display: flex;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Sidebar */
.page-sidebar {
    width: 280px;
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    height: fit-content;
    position: sticky;
    top: 2rem;
    transition: all 0.3s ease;
}

.page-sidebar.collapsed {
    width: 60px;
    padding: 1rem 0.5rem;
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.sidebar-title {
    font-weight: 600;
    margin: 0;
    color: #1a5f7a;
}

.sidebar-toggle-btn {
    background: #f8fafc;
    border: none;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    color: #1a5f7a;
}

.sidebar-toggle-btn:hover {
    background: #e2e8f0;
    transform: scale(1.1);
}

.quick-jump label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.5rem;
}

.quick-jump input {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    padding: 0.5rem;
}

.quick-jump input:focus {
    border-color: #1a5f7a;
    box-shadow: 0 0 0 3px rgba(26, 95, 122, 0.1);
}

.page-list {
    max-height: 500px;
    overflow-y: auto;
    margin-top: 1rem;
}

.page-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    background: #f8fafc;
}

.page-item:hover {
    background: #e2e8f0;
    transform: translateX(4px);
}

.page-item.active {
    background: linear-gradient(135deg, #1a5f7a 0%, #0b806f 100%);
    color: white;
    font-weight: 600;
}

.page-number {
    font-size: 0.9rem;
}

/* Main Content */
.page-content {
    flex: 1;
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.page-info-bar {
    display: flex;
    gap: 2rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #475569;
    font-weight: 500;
}

.info-item i {
    color: #1a5f7a;
}

/* Navigation Controls */
.navigation-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.nav-btn {
    background: linear-gradient(135deg, #1a5f7a 0%, #0b806f 100%);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.25rem;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 95, 122, 0.3);
}

.nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f8fafc;
    padding: 0.5rem 1rem;
    border-radius: 10px;
}

.page-input {
    width: 60px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.25rem 0.5rem;
    text-align: center;
    font-weight: 600;
}

.page-total {
    color: #64748b;
    font-weight: 600;
}

/* Text Page Viewer */
.image-viewer {
    position: relative;
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background: #f8fafc;
    border-radius: 12px;
    overflow: hidden;
    padding: 2rem;
}

.quran-page-text {
    max-width: 800px;
    width: 100%;
    background: white;
    padding: 3rem 2.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    min-height: 500px;
    direction: rtl;
    text-align: justify;
}

.page-header-info {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #e2e8f0;
}

.surah-info {
    margin-bottom: 1.5rem;
}

.surah-info:last-child {
    margin-bottom: 0;
}

.surah-name {
    font-family: 'Amiri', 'Traditional Arabic', serif;
    font-size: 2rem;
    font-weight: 700;
    color: #1a5f7a;
    text-align: center;
    margin-bottom: 0.5rem;
}

.surah-english {
    font-size: 1rem;
    color: #64748b;
    text-align: center;
    margin-bottom: 1rem;
    direction: ltr;
}

.bismillah {
    font-family: 'Amiri', 'Traditional Arabic', serif;
    font-size: 1.75rem;
    color: #0b806f;
    text-align: center;
    margin-top: 1rem;
    padding: 1rem;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
    border-radius: 8px;
}

.ayahs-container {
    font-family: 'Amiri', 'Traditional Arabic', serif;
    font-size: 1.75rem;
    line-height: 2.5;
    color: #1e293b;
    text-align: justify;
}

.ayah-text {
    display: inline;
}

.ayah-number {
    display: inline-block;
    font-size: 1.25rem;
    color: #1a5f7a;
    font-weight: 700;
    margin: 0 0.25rem;
    vertical-align: middle;
}


.loading-spinner,
.error-message {
    text-align: center;
    padding: 3rem;
}

.error-message {
    color: #dc2626;
}

.error-message i {
    font-size: 3rem;
    margin-bottom: 1rem;
}

/* Transitions */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
    transition: all 0.3s ease;
}

.slide-next-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-next-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-prev-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-prev-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

/* Swipe Tip */
.swipe-tip {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #3b82f6;
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
    z-index: 1000;
}

.swipe-tip .btn-close {
    filter: brightness(0) invert(1);
}

/* Mobile Styles */
@media (max-width: 768px) {
    .page-layout {
        flex-direction: column;
    }

    .page-sidebar {
        width: 100%;
        position: static;
    }

    .desktop-only {
        display: none !important;
    }

    .mobile-only {
        display: flex !important;
    }

    .mobile-nav {
        flex: 1;
        justify-content: center;
    }

    .page-indicator-mobile {
        font-weight: 600;
        color: #1a5f7a;
        font-size: 1.1rem;
    }

    .image-viewer {
        min-height: 400px;
    }
}

@media (min-width: 769px) {
    .mobile-only {
        display: none !important;
    }
}
</style>
