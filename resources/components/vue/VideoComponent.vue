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
        <form class="row g-2 align-items-stretch" role="search" aria-labelledby="video-gallery-search-label" @submit.prevent="resetAndSearch">
          <div class="col-12 col-md-11">
            <input
              id="video-gallery-search-input"
              v-model="query"
              type="text"
              class="form-control h-100 rounded-20"
              :aria-label="'Search Islamic videos'"
              placeholder="Search for Islamic videos..." />
          </div>
          <div class="col-12 col-md-1 d-grid">
            <button class="btn w-100 h-100 btn-teal rounded-20" type="submit">Search</button>
          </div>
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
            class="badge flex-shrink-0 d-flex align-items-center gap-2 px-3 py-2"
            :class="{ 'active': activeFilter === filter }"
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
    </div>

    <!-- Video Grid -->
    <div v-if="videos.length">
      <div :style="{ height: topSpacerHeight + 'px' }"></div>
      <div class="row g-3">
      <div v-for="(video, i) in visibleVideos" :key="video.id || (startIndex + i)" class="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
        <article class="card d-flex flex-column shadow-sm p-2 w-100 h-100 card-video card-20 card-float glow-card">
          <div
            class="ratio ratio-16x9 pb-2 video-container rounded-20 overflow-hidden video-frame media-frame"
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
              class="w-100 mb-2 rounded-20 video-hover"
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
          <div class="action-row  px-2 pb-2">
            <a
              :href="`https://wa.me/?text=${encodeURIComponent(video.url)}`"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-sm w-100 custom-btn btn-action rounded-20 d-flex align-items-center justify-content-center gap-2"
              :aria-label="'Share video via WhatsApp'"
            >
              <i class="bi bi-share-fill" aria-hidden="true"></i> Share
            </a>
            <a
              :href="video.url"
              :download="`video-${video.id}.mp4`"
              class="btn btn-sm w-100 custom-btn btn-action rounded-20 d-flex align-items-center justify-content-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
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
    getFilterIcon(filter) {
      const iconMap = {
        'Islamic': 'bi-star-fill',
        'islamic animation': 'bi-play-btn',
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
    },
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

.custom-btn { background-color: #0db691; color: #fff; padding: 10px; transition: all 0.3s ease; position: relative; overflow: hidden; }
.custom-btn:hover, .custom-btn:focus { background-color: #0aa07f; transform: translateY(-2px); color: #fff; outline: 2px solid rgba(13,182,145,.4); outline-offset: 2px; box-shadow: 0 4px 12px rgba(0,0,0,.2); }
.custom-btn::after { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; background: rgba(255,255,255,.2); border-radius: 50%; transform: translate(-50%,-50%); transition: width .4s ease, height .4s ease; }
.custom-btn:hover::after { width: 200px; height: 200px; }

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

.badge { background-color: white; color: #000; font-size: 1em; border: 1px solid #0db69175; border-radius: 8px; padding: 8px 12px; transition: all .3s ease; }
.badge.active { background-color: #0db691; color: #fff; transform: scale(1.05); }
.badge:hover { background-color: #0aa07f; color: #fff; transform: scale(1.05); box-shadow: 0 2px 8px rgba(0,0,0,.15); }

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

.ratio { border-radius: 20px; overflow: hidden; }
.video-frame { height: 500px; }


video { border-radius: 20px; }

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  content-visibility: auto;
  contain: content;
}

/* Shared utilities to match AiComponent */
.soft-bg {
  background:
    radial-gradient(1200px 600px at 10% -10%, rgba(13, 182, 145, 0.05), transparent 60%),
    radial-gradient(900px 500px at 110% 10%, rgba(26, 95, 122, 0.05), transparent 60%),
    radial-gradient(800px 400px at 50% 120%, rgba(13, 182, 145, 0.04), transparent 60%),
    linear-gradient(180deg, #ffffff, #fafcfc),
    repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 12px),
    repeating-linear-gradient(0deg, rgba(0,0,0,0.008) 0, rgba(0,0,0,0.008) 1px, transparent 1px, transparent 12px);
  background-size: auto, auto, auto, auto, 800px 800px, 800px 800px;
  background-attachment: scroll, scroll, scroll, scroll, fixed, fixed;
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
.soft-bg::before { width: 340px; height: 340px; background: radial-gradient(circle at 30% 30%, rgba(13,182,145,.35), transparent 60%); top: -110px; left: -70px; }
.soft-bg::after { width: 280px; height: 280px; background: radial-gradient(circle at 70% 70%, rgba(26,95,122,.35), transparent 60%); bottom: -90px; right: -50px; animation-delay: 6s; }

@keyframes floatBlob { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-14px) translateX(8px); } }
.rounded-20 { border-radius: 20px !important; }
.card-20 { border-radius: 20px; overflow: hidden; }
.card-float { transition: transform .25s ease, box-shadow .25s ease; }
.card-float:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,.15); }
.glow-card { background: #fff; border: 1px solid rgba(13,182,145,.18); box-shadow: 0 10px 24px rgba(0,0,0,.08); }
.glow-card:hover { box-shadow: 0 16px 30px rgba(0,0,0,.12), 0 0 0 3px rgba(13,182,145,.08) inset; }
.btn-teal { background-color: #0db691; color: #fff; border: none; transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease; }
.btn-teal:hover { background-color: #0aa07f; color: #fff; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,.15); }
.action-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: stretch; }
.action-row { margin-top: 12px; }
.btn-action { font-size: 18px; }
/* Reset default figure/article spacing and enforce column layout */
article.card { margin: 0; display: flex; flex-direction: column; }

@keyframes focusPulse { 0% { box-shadow: 0 0 0 0 rgba(13,182,145,.45);} 100% { box-shadow: 0 0 0 8px rgba(13,182,145,0);} }
.btn-action:focus-visible { outline: none; animation: focusPulse .6s ease; }
@keyframes cardFloat { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-3px);} }
.video-frame:hover { animation: cardFloat 3s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) { .card-float, .btn-teal, .btn-action, .video-frame, .soft-bg::before, .soft-bg::after { transition: none !important; animation: none !important; } }

/* Gradient stroke + soft fade for media */
.media-frame { position: relative; z-index: 0; }
.media-frame::before {
  content: '';
  position: absolute; inset: 0; border-radius: inherit; padding: 1px;
  background: linear-gradient(135deg, rgba(13,182,145,.5), rgba(26,95,122,.4));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
}
.media-frame::after {
  content: '';
  position: absolute; left: 0; right: 0; bottom: 0; height: 18%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,.18) 100%);
  height: 22%; opacity: .22; pointer-events: none;
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
