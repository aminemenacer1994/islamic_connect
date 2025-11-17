<template>
  <div class="soft-bg">
  <div class="container py-5">
    <!-- Title -->
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Gallery</h2>
    <p class="text-center text-muted mb-4" style="font-size: 18px;">
      Explore beautiful Islamic visuals including majestic mosques, intricate calligraphy, Quranic themes, serene
      landscapes, timeless architecture, vibrant traditions, cultural festivals, spiritual gatherings, historical sites,
      daily life, artistic expressions, and more.
    </p>

    <!-- Search -->
    <div class="row container justify-content-center mb-3">
      <div class="col-12 col-md-12">
        <h3 id="ai-gallery-search-label" class="fw-bold text-left pt-2 pb-2 container">Search Images in Gallery:</h3>
        <form class="row g-2 align-items-stretch" @submit.prevent="fetchGallery" role="search" aria-labelledby="ai-gallery-search-label">
          <div class="col-12 col-md-11">
            <input
              id="ai-gallery-search-input"
              v-model="searchTerm"
              type="text"
              class="form-control h-100 rounded-20"
              :aria-label="'Search Islamic images'"
              placeholder="Search for Islamic images..." />
          </div>
          <div class="col-12 col-md-1 d-grid">
            <button class="btn w-100 h-100 btn-teal rounded-20" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-4 text-center">
      <div
        class="d-flex text-center overflow-x-auto gap-2 px-1 py-2 filter-scroll"
        role="radiogroup"
        aria-label="Filter images"
        style="cursor: pointer; white-space: nowrap;">
        <button
          v-for="(filter, idx) in filters"
          :key="filter"
          class="badge flex-shrink-0 text-center px-3 py-2 d-flex align-items-center gap-2"
          :class="{ 'active': activeFilter === filter, 'bg-light text-dark': activeFilter !== filter }"
          role="radio"
          :aria-checked="String(activeFilter === filter)"
          :tabindex="activeFilter === filter ? 0 : -1"
          type="button"
          @click="applyFilter(filter)"
          @keydown.left.prevent="focusPrevFilter(idx)"
          @keydown.right.prevent="focusNextFilter(idx)"
          @keydown.enter.prevent="applyFilter(filter)"
          @keydown.space.prevent="applyFilter(filter)"
        >
          <i :class="getFilterIcon(filter)"></i> {{ filter }}
        </button>
      </div>
    </div>

    <!-- Image Grid -->
    <div v-if="loading" class="text-center my-5" role="status" aria-live="polite">
      <div class="spinner-border text-success mb-3" aria-hidden="true"></div>
      <p class="fw-semibold fs-4 text-muted">Images loading, please wait...</p>
    </div>

    <div v-if="!loading">
      <div :style="{ height: topSpacerHeight + 'px' }"></div>
      <div class="row g-3">
      <div v-for="(image, index) in visibleImages" :key="image.id || (startIndex + index)"
        class="col-12 col-sm-6 col-md-6 col-lg-4 d-flex">
        <figure
          class="card card-teal d-flex flex-column shadow-md p-2 w-100 h-100 card-20 card-float"
        >
          <div class="image-wrapper rounded-20 overflow-hidden media-frame">
            <img
              :src="image.src.medium"
              :srcset="`${image.src.small} 400w, ${image.src.medium} 800w, ${image.src.large} 1200w`"
              sizes="(max-width: 576px) 100vw, (max-width: 992px) 33vw, 33vw"
              :alt="image.alt || 'Islamic image'"
              class="img-fluid image-zoom gallery-img "
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              data-bs-toggle="modal"
              data-bs-target="#imageModal"
              tabindex="0"
              :aria-label="(image.alt || 'Islamic image') + '. Press Enter to enlarge'"
              @click.stop="selectedImage = image"
              @keydown.enter.stop.prevent="selectedImage = image"
              @keydown.space.stop.prevent="selectedImage = image"
            />
          </div>
          <figcaption class="mt-2 text-center figcaption-compact">
            {{ image.alt || 'Islamic Image' }}
          </figcaption>
          <div class="flex-grow-1" aria-hidden="true"></div>
          <div class="action-row mt-auto px-2 pt-2 pb-2">
            <a
              :href="`https://wa.me/?text=${encodeURIComponent(image.src.original)}`"
              target="_blank"
              class="btn btn-sm w-100 custom-btn btn-action rounded-20 d-flex align-items-center justify-content-center gap-2"
              :aria-label="'Share image: ' + (image.alt || 'Islamic image') + ' via WhatsApp'"
            >
              <i class="bi bi-share-fill" aria-hidden="true"></i> Share
            </a>
            <button
              type="button"
              @click.prevent="downloadImage(image.src.original, `image-${image.id}.jpg`)"
              class=" pt-2 btn btn-sm w-100 custom-btn btn-action rounded-20 d-flex align-items-center justify-content-center gap-2"
              :aria-label="'Download image: ' + (image.alt || 'Islamic image')"
            >
              <i class="bi bi-download" aria-hidden="true"></i> {{ 'Download' }}
            </button>
          </div>
        </figure>
      </div>
      </div>
      <div :style="{ height: bottomSpacerHeight + 'px' }"></div>
    </div>

    <!-- Infinite Scroll Sentinel / Status -->
    <div class="mt-4 d-flex justify-content-center" aria-live="polite">
      <div v-if="isLoadingMore" class="text-center my-3" role="status">
        <div class="spinner-border text-success" aria-hidden="true"></div>
        <span class="ms-2">Loading more images…</span>
      </div>
      <div v-else-if="!hasMore && allImages.length" class="text-muted" role="status">No more results</div>
    </div>
    <div ref="loadMoreTrigger" style="height: 1px;"></div>

    <!-- Modal -->
    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="dialog" aria-modal="true">
        <div class="modal-content">
          <div class="modal-header">
            <div id="imageModalLabel" class="modal-title" style="font-size: 24px; font-weight: bold;">Islamic Image</div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="selectedImage && selectedImage.src ? selectedImage.src.original : ''" :alt="selectedImage && selectedImage.alt ? selectedImage.alt : 'Islamic Image'" class="img-fluid mx-auto d-block"
              style="max-width: 100%; max-height: 80vh; object-fit: contain; padding: 5px;" />
            <p class="mt-2 text-center" style="padding: 0 5px; font-size: 20px; color: #444;">
              {{ (selectedImage && selectedImage.alt) ? selectedImage.alt : 'Islamic Image' }}
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    cacheLimitOverride: { type: Number, default: null },
  },
  data() {
    return {
      downloading: false,
      searchTerm: '',
      selectedImage: null,
      allImages: [],
      images: [],
      // Infinite scroll state
      apiPage: 1,
      perPage: 18,
      hasMore: true,
      isLoadingMore: false,
      lastLoadMoreTs: 0,
      observer: null,
      activeFilter: 'Islamic',
      isModalOpen: false,
      loading: true,
      apiKey: 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f',
      // request controllers and caching to avoid wasted work
      fetchAborter: null,
      loadMoreAborter: null,
      cache: new Map(),
      cacheLimit: 60,
      // virtualization state
      startIndex: 0,
      endIndex: 0,
      itemsPerRow: 1,
      rowHeight: 620,
      rafId: null,
      resizeRafId: null,
      filters: [
        'Islamic', 'Mosque', 'Calligraphy', 'Quran', 'Kaaba', 'Mecca', 'Madina', 'Hijab',
        'Ramadan', 'Eid', 'Arabic Art', 'Islamic Architecture',
      ],
    };
  },
  computed: {
    visibleImages() {
      return this.allImages.slice(this.startIndex, this.endIndex);
    },
    topSpacerHeight() {
      const perRow = this.itemsPerRow || 1;
      const startRow = Math.floor(this.startIndex / perRow);
      return startRow * this.rowHeight;
    },
    bottomSpacerHeight() {
      const perRow = this.itemsPerRow || 1;
      const totalRows = Math.ceil((this.allImages.length || 0) / perRow);
      const endRow = Math.ceil((this.endIndex || 0) / perRow);
      const remaining = Math.max(0, totalRows - endRow);
      return remaining * this.rowHeight;
    }
  },
  mounted() {
    // set cache limit: prop override > adaptive heuristic
    try {
      this.cacheLimit = (this.cacheLimitOverride != null)
        ? this.cacheLimitOverride
        : this.computeAdaptiveCacheLimit();
    } catch (_) {}
    // compute initial layout once
    this.itemsPerRow = this.computeItemsPerRow();
    this.$nextTick(() => {
      this.measureRowHeight();
      this.computeVirtualWindow();
    });
    this.fetchGallery();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
    // listen to network changes if available
    if (navigator && navigator.connection && navigator.connection.addEventListener) {
      try { navigator.connection.addEventListener('change', this.onConnectionChange); } catch (_) {}
    }
  },
  beforeUnmount() {
    if (this.observer) {
      try { this.observer.disconnect(); } catch (e) {}
      this.observer = null;
    }
    if (this.fetchAborter) { try { this.fetchAborter.abort(); } catch (_) {} }
    if (this.loadMoreAborter) { try { this.loadMoreAborter.abort(); } catch (_) {} }
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    if (navigator && navigator.connection && navigator.connection.removeEventListener) {
      try { navigator.connection.removeEventListener('change', this.onConnectionChange); } catch (_) {}
    }
  },
  methods: {
    computeAdaptiveCacheLimit() {
      const mem = (navigator && navigator.deviceMemory) ? navigator.deviceMemory : undefined; // in GB
      const conn = (navigator && navigator.connection && navigator.connection.effectiveType)
        ? navigator.connection.effectiveType : undefined;
      // Baseline
      let limit = 60;
      // Memory-based tuning
      if (mem !== undefined) {
        if (mem <= 1) limit = 24;
        else if (mem <= 2) limit = 40;
        else if (mem >= 8) limit = 120;
        else if (mem >= 4) limit = 90;
      }
      // Network-based tuning (bias down on slow links)
      if (conn) {
        if (conn === 'slow-2g' || conn === '2g') limit = Math.min(limit, 24);
        else if (conn === '3g') limit = Math.min(limit, 40);
      }
      // Viewport hint: small screens tend to scroll fewer items
      const vw = window && window.innerWidth ? window.innerWidth : 1024;
      if (vw < 576) limit = Math.min(limit, 48);
      return limit;
    },
    onConnectionChange() {
      // honor explicit override
      if (this.cacheLimitOverride != null) return;
      try { this.cacheLimit = this.computeAdaptiveCacheLimit(); } catch (_) {}
    },
    // Simple LRU cache helpers
    cacheGet(key) {
      if (!this.cache) return undefined;
      const has = this.cache.has(key);
      if (!has) return undefined;
      const value = this.cache.get(key);
      // refresh recency
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    },
    cacheSet(key, value) {
      if (!this.cache) this.cache = new Map();
      if (this.cache.has(key)) this.cache.delete(key);
      this.cache.set(key, value);
      if (this.cache.size > this.cacheLimit) {
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }
    },
    focusPrevFilter(idx) {
      const prev = idx > 0 ? idx - 1 : this.filters.length - 1;
      this.activeFilter = this.filters[prev];
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="radiogroup"] [role="radio"]');
        if (buttons[prev]) buttons[prev].focus();
      });
      this.applyFilter(this.activeFilter);
    },
    focusNextFilter(idx) {
      const next = idx < this.filters.length - 1 ? idx + 1 : 0;
      this.activeFilter = this.filters[next];
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="radiogroup"] [role="radio"]');
        if (buttons[next]) buttons[next].focus();
      });
      this.applyFilter(this.activeFilter);
    },
    async downloadImage(url, filename) {
      this.downloading = true;
      try {
        const response = await fetch(url, { method: 'GET', mode: 'cors' });
        if (!response.ok) throw new Error('Failed to fetch image');
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Download failed:', error);
        alert('Unable to download the image. Please try again later.');
      } finally {
        this.downloading = false;
      }
    },
    async fetchGallery() {
      this.loading = true;
      this.allImages = [];
      this.apiPage = 1;
      this.hasMore = true;
      try {
        const query = `Islamic ${this.searchTerm}`.trim();
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${this.perPage}&page=${this.apiPage}`;
        const cacheKey = `${query}:1:${this.perPage}`;
        // abort any in-flight fetch
        if (this.fetchAborter) {
          try { this.fetchAborter.abort(); } catch (_) {}
        }
        this.fetchAborter = new AbortController();
        const cached = this.cacheGet(cacheKey);
        if (cached) {
          this.allImages = cached.photos || [];
          this.hasMore = Boolean(cached.hasMore);
        } else {
          const response = await fetch(url, {
            headers: { Authorization: this.apiKey },
            signal: this.fetchAborter.signal,
          });
          const data = await response.json();
          this.allImages = data.photos || [];
          this.hasMore = Boolean(data.next_page);
          this.cacheSet(cacheKey, { photos: this.allImages.slice(), hasMore: this.hasMore });
        }
        // Ensure observer is set up after first paint
        this.$nextTick(() => {
          if (!this.observer) this.setupObserver();
          this.measureRowHeight();
          this.computeVirtualWindow();
        });
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        this.loading = false;
      }
    },
    setupObserver() {
      const target = this.$refs.loadMoreTrigger;
      if (!target) return;
      this.observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          this.loadMore();
        }
      }, {
        root: null,
        rootMargin: '0px 0px 600px 0px',
        threshold: 0,
      });
      this.observer.observe(target);
    },
    async loadMore() {
      if (this.loading || this.isLoadingMore || !this.hasMore) return;
      const now = Date.now();
      if (now - this.lastLoadMoreTs < 800) return; // throttle
      this.lastLoadMoreTs = now;
      this.isLoadingMore = true;
      try {
        const query = `Islamic ${this.searchTerm}`.trim();
        const nextPage = this.apiPage + 1;
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${this.perPage}&page=${nextPage}`;
        const cacheKey = `${query}:${nextPage}:${this.perPage}`;
        // abort any in-flight load-more request
        if (this.loadMoreAborter) {
          try { this.loadMoreAborter.abort(); } catch (_) {}
        }
        this.loadMoreAborter = new AbortController();
        let photos = [];
        let nextHasMore = true;
        const cached = this.cacheGet(cacheKey);
        if (cached) {
          photos = cached.photos || [];
          nextHasMore = Boolean(cached.hasMore);
        } else {
          const response = await fetch(url, {
            headers: { Authorization: this.apiKey },
            signal: this.loadMoreAborter.signal,
          });
          const data = await response.json();
          photos = data.photos || [];
          nextHasMore = Boolean(data.next_page);
          this.cacheSet(cacheKey, { photos: photos.slice(), hasMore: nextHasMore });
        }
        if (photos.length) {
          this.allImages.push(...photos);
          this.apiPage = nextPage;
        }
        this.hasMore = Boolean(nextHasMore);
        this.$nextTick(() => { this.measureRowHeight(); this.computeVirtualWindow(); });
      } catch (error) {
        console.error('Error loading more images:', error);
      } finally {
        this.isLoadingMore = false;
      }
    },
    // Virtualization helpers
    computeItemsPerRow() {
      const w = window.innerWidth || 1024;
      return w < 576 ? 1 : 3;
    },
    computeVirtualWindow() {
      const total = this.allImages.length;
      if (!total) { this.startIndex = 0; this.endIndex = 0; return; }
      const perRow = this.itemsPerRow;
      const rowH = this.rowHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const viewportH = window.innerHeight || 800;
      const totalRows = Math.ceil(total / perRow);
      const bufferRows = 2;
      const startRow = Math.max(0, Math.floor(scrollTop / rowH) - bufferRows);
      const endRow = Math.min(totalRows - 1, Math.ceil((scrollTop + viewportH) / rowH) + bufferRows);
      this.startIndex = startRow * perRow;
      this.endIndex = Math.min(total, (endRow + 1) * perRow);
    },
    measureRowHeight() {
      try {
        const el = this.$el.querySelector('.card');
        if (el) {
          const h = el.offsetHeight;
          if (h && Math.abs(h - this.rowHeight) > 20) this.rowHeight = h + 20; // add small buffer
        }
      } catch (_) {}
    },
    onScroll() {
      if (this.rafId) return;
      this.rafId = requestAnimationFrame(() => {
        this.computeVirtualWindow();
        this.rafId = null;
      });
    },
    onResize() {
      if (this.resizeRafId) return;
      this.resizeRafId = requestAnimationFrame(() => {
        const newPerRow = this.computeItemsPerRow();
        if (newPerRow !== this.itemsPerRow) {
          this.itemsPerRow = newPerRow;
          this.measureRowHeight();
        }
        this.computeVirtualWindow();
        this.resizeRafId = null;
      });
    },
    applyFilter(keyword) {
      this.activeFilter = keyword;
      this.searchTerm = keyword;
      this.fetchGallery();
    },
    openModal(image) {
      this.selectedImage = image;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    // Pagination removed in favor of infinite scroll
    hoverCard(index) {
      const card = document.querySelectorAll('.card')[index];
      if (card) {
        card.style.transform = 'scale(1.03)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
      }
    },
    leaveCard(index) {
      const card = document.querySelectorAll('.card')[index];
      if (card) {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }
    },
    getFilterIcon(filter) {
      const iconMap = {
        'Islamic': 'bi-star-fill',
        'Mosque': 'bi-building',
        'Calligraphy': 'bi-pen-nib',
        'Quran': 'bi-book',
        'Kaaba': 'bi-box',
        'Mecca': 'bi-geo-alt',
        'Madina': 'bi-geo-alt-fill',
        'Hijab': 'bi-person',
        'Ramadan': 'bi-moon-stars',
        'Eid': 'bi-gift',
        'Arabic Art': 'bi-brush',
        'Islamic Architecture': 'bi-columns'
      };
      return iconMap[filter] || 'bi-image';
    }
  },
};
</script>

<style scoped>
.card-teal {
  border-radius: 20px;
  border: 1px solid rgba(20, 184, 166, 0.22);
  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.card-teal:hover { 
  transform: translateY(-2px); box-shadow: 0 18px 40px rgba(2,44,34,0.12); 
}
.text-muted {
  /* Increase contrast on light backgrounds (#f5f5f5) to meet WCAG AA */
  color: #495057 !important; /* Bootstrap gray-700, contrast > 4.5:1 on #f5f5f5 */
}

.img-fluid {
  width: 100%;
  height: auto;
}

.card {
  content-visibility: auto;
  contain-intrinsic-size: 480px 320px;
  contain: content;
}

.custom-btn {
  background-color: #0db691;
  color: #fff; /* White text for better visibility */
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

  .custom-btn:hover {
    background-color: #0aa07f;
    transform: translateY(-2px);
    color: #fff; /* maintain visibility on hover */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

.custom-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.4s ease, height 0.4s ease;
}

.custom-btn:hover::after {
  width: 200px;
  height: 200px;
}

.image-zoom:hover { /* disable heavy hover zoom to reduce paints */ }

.scrollmenu {
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.scrollmenu::-webkit-scrollbar {
  width: 0px;
}

.scrollmenu.scrolling::-webkit-scrollbar {
  width: 8px;
}

.scrollmenu::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.scrollmenu a {
  display: inline-block;
  text-align: center;
  text-decoration: none;
}

.badge {
  background-color: black;
  color: #fff; /* ensure high contrast on default black badge */
  font-size: 1em;
  border: 1px solid #0db69175;
  border-radius: 8px;
  padding: 8px 12px;
  transition: all 0.3s ease;
}

.badge.active {
  background-color: #0db691; /* active teal */
  color: #fff; /* white text for better visibility */
  transform: scale(1.05);
}

.badge:hover {
  background-color: #0aa07f;
  color: #fff; /* maintain contrast on hover */
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.shadow-sm {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.filter-scroll {
  scrollbar-color: #17a085 transparent;
  scrollbar-width: thin;
}

.filter-scroll::-webkit-scrollbar {
  height: 8px;
}

.filter-scroll::-webkit-scrollbar-thumb {
  background-color: #17a085;
  border-radius: 10px;
}

.filter-scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

.pagination .page-link {
  font-size: 1.1rem;
}

.modal-backdrop {
  display: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate__fadeIn {
  animation: fadeIn 0.5s ease-out;
  animation-fill-mode: backwards;
}

/* New: 20px rounded aesthetic and clean action rows */
.soft-bg {
  /* softer, less prominent accents */
  background:
    radial-gradient(1200px 600px at 10% -10%, rgba(13, 182, 145, 0.05), transparent 60%),
    radial-gradient(900px 500px at 110% 10%, rgba(26, 95, 122, 0.05), transparent 60%),
    radial-gradient(800px 400px at 50% 120%, rgba(13, 182, 145, 0.04), transparent 60%),
    linear-gradient(180deg, #ffffff, #fafcfc),
    repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 12px),
    repeating-linear-gradient(0deg, rgba(0,0,0,0.008) 0, rgba(0,0,0,0.008) 1px, transparent 1px, transparent 12px);
  background-size: auto, auto, auto, 800px 800px, 800px 800px;
  background-attachment: scroll, scroll, scroll, fixed, fixed;
  position: relative;
}
.soft-bg::before,
.soft-bg::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.35;
  z-index: 0;
  animation: floatBlob 18s ease-in-out infinite;
}
.soft-bg::before { width: 360px; height: 360px; background: radial-gradient(circle at 30% 30%, rgba(13,182,145,.35), transparent 60%); top: -120px; left: -80px; }
.soft-bg::after { width: 300px; height: 300px; background: radial-gradient(circle at 70% 70%, rgba(26,95,122,.35), transparent 60%); bottom: -100px; right: -60px; animation-delay: 6s; }

@keyframes floatBlob { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-14px) translateX(8px); } }
.rounded-20 { border-radius: 20px !important; }
.card-20 { border-radius: 20px; overflow: hidden; }
.glow-card {
  background: #fff;
  border: 1px solid rgba(13, 182, 145, 0.18);
  box-shadow: 0 10px 24px rgba(0,0,0,0.08);
}
.glow-card:hover { box-shadow: 0 16px 30px rgba(0,0,0,0.12), 0 0 0 3px rgba(13,182,145,0.08) inset; }
.gallery-img {
  height: 480px;
  object-fit: cover;
  transition: transform 0.3s ease;
  will-change: transform;
}
.figcaption-compact { padding: 0 10px; font-size: 18px; color: #444; }
/* Keep caption heights consistent across cards */
.figcaption-compact { min-height: 96px; display: flex; align-items: center; justify-content: center; text-align: center; }

.action-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: stretch;
  margin-top: 12px;
}
.btn-action { font-size: 18px; }

/* Subtle card float animation */
@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
.card-float { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.card-float:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
/* Reset figure default margins to avoid layout gaps */
figure.card { margin: 0; }

/* Button pulse on focus-visible for accessibility feedback */
@keyframes focusPulse {
  0% { box-shadow: 0 0 0 0 rgba(13,182,145,0.45); }
  100% { box-shadow: 0 0 0 8px rgba(13,182,145,0); }
}
.btn-action:focus-visible { outline: none; animation: focusPulse 0.6s ease; }

/* Primary teal button utility */
.btn-teal { background-color: #0db691; color: #fff; transition: background-color .2s ease; }
.btn-teal:hover { background-color: #0aa07f; color: #fff; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card-float, .gallery-img, .btn-action { transition: none !important; animation: none !important; }
}

/* Extra polish for visual interest without noise */
.glow-card { position: relative; }
.glow-card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 20px;
  box-shadow: 0 0 0 0 rgba(13,182,145,0.0);
  transition: box-shadow .3s ease;
}
.glow-card:hover::after { box-shadow: 0 0 0 3px rgba(13,182,145,0.15); }

/* Gradient stroke + soft fade for media */
.media-frame { position: relative; z-index: 0; }
.media-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px; /* hairline gradient stroke */
  background: linear-gradient(135deg, rgba(13,182,145,.5), rgba(26,95,122,.4));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  pointer-events: none;
}
.media-frame::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 12%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.18) 100%);
  opacity: .12;
  pointer-events: none;
}

/* Cross-browser fallback when CSS masking isn't supported (e.g., Firefox) */
@supports not (mask-composite: exclude) {
  .media-frame { border: 1px solid rgba(13,182,145,.18); }
  .media-frame::before { display: none; }
}
@supports not (-webkit-mask-composite: xor) {
  .media-frame { border: 1px solid rgba(13,182,145,.18); }
  .media-frame::before { display: none; }
}

/* Button icon micro-motion */
.btn-action i { transition: transform .2s ease; }
.btn-action:hover i { transform: translateY(-1px); }
</style>
