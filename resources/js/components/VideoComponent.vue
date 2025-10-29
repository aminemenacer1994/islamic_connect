<template>
  <div class="container py-5">
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Animated Videos</h2>
    <p class="text-center text-dark mb-4" style="font-size: 18px;">
      Discover a captivating collection of Islamic animated videos, bringing to life the beauty and spirituality of
      Islamic culture.
      From the grandeur of mosques and intricate calligraphy to the serenity of nature and historical landmarks.
    </p>

    <!-- Search -->
    <div class="row container justify-content-center mb-3">
      <div class="col-12 col-md-12">
        <h3 id="video-gallery-search-label" class="fw-bold text-left pt-2 pb-2 container">Search Animated Videos:</h3>
        <form class="input-group" role="search" aria-labelledby="video-gallery-search-label" @submit.prevent="resetAndSearch">
          <input
            id="video-gallery-search-input"
            v-model="query"
            type="text"
            class="form-control"
            :aria-label="'Search Islamic videos'"
            placeholder="Search for Islamic videos..." />
          <button class="btn" type="submit" style="background-color: #00695c; color: #ffffff;">Search</button>
        </form>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-4 text-center">
      <div class="filter-scroll-wrapper position-relative">
        <div
          class="filter-scroll d-flex justify-content-start gap-2 px-2 py-2"
          style="overflow-x: auto; cursor: pointer; white-space: nowrap; -ms-overflow-style: none; scrollbar-width: none;"
          role="radiogroup"
          aria-label="Filter videos"
          tabindex="0"
        >
          <button
            v-for="(filter, idx) in filters"
            :key="filter"
            class="badge flex-shrink-0 px-3 py-2"
            :class="{ 'bg-dark text-white': activeFilter === filter, 'bg-light text-dark': activeFilter !== filter }"
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
            {{ filter }}
          </button>
        </div>
      </div>
    </div>

    <!-- Video Grid -->
    <div v-if="videos.length">
      <div :style="{ height: topSpacerHeight + 'px' }"></div>
      <div class="row g-3">
      <div v-for="(video, i) in visibleVideos" :key="video.id || (startIndex + i)" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
        <article class="card d-flex flex-column shadow-md p-1 w-100 h-100 card-video" style="border: 2px solid lightgray;">
          <div
            class="ratio ratio-16x9 video-container"
            style="height: 500px; object-fit: cover; border-top-left-radius: 5px; border-top-right-radius: 5px;"
            role="button"
            @click="togglePlayPause($event)"
            tabindex="0"
            :aria-label="'Video: ' + (video.description || 'Islamic animation') + '. Press Enter to play/pause'"
            @keydown.enter.prevent="togglePlayPause($event)"
            @keydown.space.prevent="togglePlayPause($event)"
          >
            <video
              :src="video.loaded ? video.url : ''"
              :poster="video.thumbnail"
              class="w-100 rounded-top video-hover"
              controls
              controlslist="nodownload noplaybackrate"
              loop
              preload="metadata"
              muted
              playsinline
              @click.stop="togglePlayPause($event)"
              @loadedmetadata="updateMetadata($event, video)"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2 mt-auto px-2 pb-2"
          >
            <a
              :href="`https://wa.me/?text=${encodeURIComponent(video.url)}`"
              target="_blank"
              class="btn btn-sm w-100 custom-btn"
              style="font-size: 18px;"
              :aria-label="'Share video via WhatsApp'"
            >
              <i class="bi bi-share-fill" aria-hidden="true"></i> Share
            </a>
            <a
              :href="video.url"
              :download="`video-${video.id}.mp4`"
              class="btn btn-sm w-100 custom-btn"
              style="font-size: 18px;"
              target="_blank"
              :aria-label="'Download video file'"
            >
              <i class="bi bi-download" aria-hidden="true"></i> Download
            </a>
          </div>
        </article>
      </div>
      </div>
      <div :style="{ height: bottomSpacerHeight + 'px' }"></div>
      <!-- Sentinel for infinite scroll -->
      <div ref="infiniteScrollSentinel" class="w-100" style="height: 1px;"></div>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="text-center py-3" role="status" aria-live="polite">
      <div class="spinner-border text-primary" aria-hidden="true"></div>
      <span class="ms-2">Loading videos…</span>
    </div>

    <!-- No videos fallback -->
    <div v-if="!loading && videos.length === 0" class="text-center py-5 text-muted" role="status" aria-live="polite">
      <p class="fs-5">No videos found. Try another keyword.</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      videos: [],
      query: 'mosque',
      loading: false,
      hasMore: true,
      page: 1,
      lastLoadTs: 0,
      filters: [
        'Islamic', 'islamic animation', 'Calligraphy', 'Quran', 'Kaaba', 'Mecca', 'Madina', 'Hijab',
        'Ramadan', 'Eid', 'Arabic Art', 'Islamic Architecture',
      ],
      activeFilter: null,
      perPage: 6,
      totalResults: 0,
      bottomObserver: null,
      videoObserver: null,
      // Smooth loading controls
      maxConcurrentLoads: 1,
      activeLoads: 0,
      loadQueue: [],
      // virtualization
      startIndex: 0,
      endIndex: 0,
      itemsPerRow: 1,
      rowHeight: 560,
      rafId: null,
    };
  },
  computed: {
    visibleVideos() {
      return this.videos.slice(this.startIndex, this.endIndex);
    },
    topSpacerHeight() {
      const perRow = this.itemsPerRow || 1;
      const startRow = Math.floor(this.startIndex / perRow);
      return startRow * this.rowHeight;
    },
    bottomSpacerHeight() {
      const perRow = this.itemsPerRow || 1;
      const totalRows = Math.ceil((this.videos.length || 0) / perRow);
      const endRow = Math.ceil((this.endIndex || 0) / perRow);
      const remaining = Math.max(0, totalRows - endRow);
      return remaining * this.rowHeight;
    }
  },
  methods: {
    // Virtualization helpers
    computeItemsPerRow() {
      const w = window.innerWidth || 1024;
      this.itemsPerRow = w < 576 ? 1 : 3;
    },
    measureRowHeight() {
      try {
        const el = this.$el.querySelector('.card-video');
        if (el) {
          const h = el.offsetHeight;
          if (h && Math.abs(h - this.rowHeight) > 20) this.rowHeight = h + 20;
        }
      } catch (_) {}
    },
    computeVirtualWindow() {
      this.computeItemsPerRow();
      const total = this.videos.length;
      if (!total) { this.startIndex = 0; this.endIndex = 0; return; }
      const perRow = this.itemsPerRow;
      const rowH = this.rowHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const viewportH = window.innerHeight || 800;
      const totalRows = Math.ceil(total / perRow);
      const bufferRows = 1;
      const startRow = Math.max(0, Math.floor(scrollTop / rowH) - bufferRows);
      const endRow = Math.min(totalRows - 1, Math.ceil((scrollTop + viewportH) / rowH) + bufferRows);
      this.startIndex = startRow * perRow;
      this.endIndex = Math.min(total, (endRow + 1) * perRow);
    },
    onScroll() {
      if (this.rafId) return;
      this.rafId = requestAnimationFrame(() => {
        this.computeVirtualWindow();
        this.rafId = null;
      });
    },
    onResize() {
      this.computeVirtualWindow();
    },
    togglePlayPause(event) {
      // Support clicks on either the container or the video element itself
      const target = event.currentTarget;
      const video = target.tagName && target.tagName.toLowerCase() === 'video'
        ? target
        : target.querySelector('video');
      if (!video) return;
      const idx = this.findVideoIndexByEl(video);
      if (idx !== -1 && !this.videos[idx].loaded) {
        this.videos[idx].loaded = true;
        if (!video.src) video.src = this.videos[idx].url;
      }
      // Pause other videos to reduce CPU
      const others = this.$el.querySelectorAll('video');
      others.forEach(v => { if (v !== video && !v.paused) v.pause(); });
      if (video.paused) {
        // Upgrade to HD on first play if available
        if (idx !== -1) {
          const item = this.videos[idx];
          if (item && item.hdUrl && !item.upgraded) {
            video.src = item.hdUrl;
            item.url = item.hdUrl;
            item.upgraded = true;
          }
        }
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    },
    async fetchVideos(append = false) {
      if (this.loading || !this.hasMore) return;
      this.loading = true;

      const apiKey = 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f';
      const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(this.query)}&per_page=${this.perPage}&page=${this.page}`;

      try {
        const response = await fetch(url, { headers: { Authorization: apiKey } });
        const data = await response.json();

        const total = data.total_results || 0;
        this.totalResults = total;

        const newItems = (data.videos || []).map(video => {
          // Choose a sharper default and keep an HD URL for upgrade on play
          const pick = this.pickBestFile(video.video_files);
          const hdPick = this.pickHighResFile(video.video_files);
          return {
            id: video.id,
            url: pick?.link,
            hdUrl: hdPick?.link,
            thumbnail: video.image,
            description: video.user?.name || 'No description',
            loaded: false,
            upgraded: false,
            metadata: { width: null, height: null, duration: null, aspectRatio: null }
          };
        });

        if (append) {
          this.videos = this.videos.concat(newItems);
        } else {
          this.videos = newItems;
        }

        // Prefer API pagination hints over total_results for reliability
        const hasNext = !!data.next_page;
        this.hasMore = hasNext || newItems.length === this.perPage;

        this.$nextTick(() => {
          this.setupBottomObserver();
          this.measureRowHeight();
          this.computeVirtualWindow();
        });
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        this.loading = false;
      }
    },

    resetAndSearch() {
      this.page = 1;
      this.hasMore = true;
      this.videos = [];
      this.fetchVideos(false);
    },

    loadMore() {
      if (this.loading || !this.hasMore) return;
      const now = Date.now();
      if (now - this.lastLoadTs < 800) return; // throttle
      this.lastLoadTs = now;
      this.page += 1;
      this.fetchVideos(true);
    },

    // Removed hover autoplay to reduce decode spikes

    updateMetadata(event, video) {
      const el = event.target;
      video.metadata.width = el.videoWidth;
      video.metadata.height = el.videoHeight;
      video.metadata.duration = el.duration;
      video.metadata.aspectRatio = el.videoWidth / el.videoHeight;
    },

    applyFilter(filter) {
      this.activeFilter = filter;
      this.query = filter;
      this.resetAndSearch();
    },

    focusPrevFilter(idx) {
      const prev = idx > 0 ? idx - 1 : this.filters.length - 1;
      this.activeFilter = this.filters[prev];
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="radiogroup"] [role="radio"]');
        if (buttons[prev]) buttons[prev].focus();
      });
      this.resetAndSearch();
    },
    focusNextFilter(idx) {
      const next = idx < this.filters.length - 1 ? idx + 1 : 0;
      this.activeFilter = this.filters[next];
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="radiogroup"] [role="radio"]');
        if (buttons[next]) buttons[next].focus();
      });
      this.resetAndSearch();
    },

    // IntersectionObserver for bottom sentinel
    setupBottomObserver() {
      if (this.bottomObserver) {
        this.bottomObserver.disconnect();
      }
      const options = { root: null, rootMargin: '600px', threshold: 0 };
      this.bottomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMore();
          }
        });
      }, options);
      if (this.$refs.infiniteScrollSentinel) {
        this.bottomObserver.observe(this.$refs.infiniteScrollSentinel);
      }
    },

    findVideoIndexByEl(el) {
      // Find the index by traversing to the card and reading key via order
      const cards = Array.from(this.$el.querySelectorAll('.card-video'));
      const card = el.closest('.card-video');
      const idx = cards.indexOf(card);
      return idx;
    },

    pickBestFile(files = []) {
      // Prefer a sharper preview (near 1080w) for clarity
      const mp4s = files.filter(f => (f.link || '').includes('.mp4'));
      const sorted = (mp4s.length ? mp4s : files).slice().sort((a, b) => (a.width || 0) - (b.width || 0));
      const target = 1080;
      let best = sorted[0];
      let minDiff = Infinity;
      sorted.forEach(f => {
        const w = f.width || target;
        const diff = Math.abs(w - target);
        if (diff < minDiff) { minDiff = diff; best = f; }
      });
      if (best && best.link) best.link = best.link.replace(/^http:\/\//, 'https://');
      return best || files[0] || null;
    },

    pickHighResFile(files = []) {
      // Highest available MP4 (used on first play)
      const mp4s = files.filter(f => (f.link || '').includes('.mp4'));
      const sorted = (mp4s.length ? mp4s : files).slice().sort((a, b) => (b.width || 0) - (a.width || 0));
      const best = sorted[0] || null;
      if (best && best.link) best.link = best.link.replace(/^http:\/\//, 'https://');
      return best;
    }
  },

  mounted() {
    this.fetchVideos(false); // Load initial set
    this.setupBottomObserver();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
};
</script>


<style scoped>
.video-container {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.video-container:focus {
  outline: 2px solid #0db691;
  outline-offset: 2px;
}

.video-container:hover {
  transform: scale(1.05);
  /* Slight zoom effect on hover */
  opacity: 0.9;
  /* Slight fade effect on hover */
}

.video-container video {
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
}

.video-container video:hover {
  opacity: 1;
  /* Ensure video stays visible during hover */
}

.card-video {
  transition: all 0.3s ease;
}

.video-hover {
  object-fit: cover;
}


.card-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.custom-btn {
  background-color: #00695c;
  color: #ffffff;
  padding: 10px;
  transition: background-color 0.3s, transform 0.2s;
}

.custom-btn:hover,
.custom-btn:focus {
  background-color: #005347;
  transform: translateY(-2px);
  color: #ffffff;
  outline: 2px solid #003c34;
  outline-offset: 2px;
}

.scrollmenu {
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: transparent transparent;
  /* Firefox */
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

.badge.active {
  background-color: rgba(0, 191, 166, 0.2);
  color: rgb(5, 32, 29);
  border: 1px solid rgba(0, 191, 166);

}

.badge {
  background-color: rgba(0, 191, 166);
  font-size: 1em;
  color: #fff;
  border: 1px solid rgba(0, 191, 166);
  border-radius: 2px;
  border-radius: 6px;
  padding: 8px;
}

.badge:hover {
  font-size: 1em;
  color: white;
  border-radius: 6px;
  padding: 8px;
}

.shadow-lg {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.hover-shadow:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.filter-scroll::-webkit-scrollbar {
  display: none;
  cursor: pointer;
}

.filter-scroll:focus {
  outline: 2px solid #0db691;
  outline-offset: 2px;
}

.scroll-fade {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  pointer-events: none;
  z-index: 1;
}

.scroll-fade-left {
  left: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.11), transparent);
}

.scroll-fade-right {
  right: 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 0.11), transparent);
}

.pagination .page-link {
  font-size: 1.1rem;
}

.modal-backdrop {
  display: none;
}

.pointer {
  cursor: pointer;
}

.ratio {
  border-radius: 0.25rem;
  overflow: hidden;
}


video {
  border-radius: 0.25rem;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  content-visibility: auto;
  contain: content;
}


</style>
