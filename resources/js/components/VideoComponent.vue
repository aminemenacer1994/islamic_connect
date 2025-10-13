<template>
  <div class="container py-4">
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Animated Videos</h2>
    <p class="text-center text-muted mb-4" style="font-size: 18px;">
      Discover a captivating collection of Islamic animated videos, bringing to life the beauty and spirituality of
      Islamic culture.
      From the grandeur of mosques and intricate calligraphy to the serenity of nature and historical landmarks.
    </p>

    <!-- Search -->
    <div class="row container justify-content-center mb-3">
      <div class="col-12 col-md-12">
        <h3 class="fw-bold text-left pt-2 pb-2 container">Search Animated Videos:</h3>
        <div class="input-group">
          <input v-model="query" @keyup.enter="searchVideos" type="text" class="form-control"
            placeholder="Search for Islamic videos..." />
          <button @click="searchVideos" class="btn" type="button" style="background-color: #0db691; color: white;">
            Search
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-4 text-center">
      <div class="filter-scroll-wrapper position-relative">
        <div class="filter-scroll d-flex justify-content-start gap-2 px-2 py-2"
          style="overflow-x: auto; cursor: pointer; white-space: nowrap; -ms-overflow-style: none; scrollbar-width: none;">
          <span class="badge flex-shrink-0 px-3 py-2" v-for="filter in filters" :key="filter"
            @click="applyFilter(filter)" :class="{
              'bg-dark text-white': activeFilter === filter,
              'bg-light text-dark': activeFilter !== filter
            }">
            {{ filter }}
          </span>
        </div>
      </div>
    </div>

    <!-- Video Grid -->
    <div class="row g-3" v-if="videos.length">
      <div v-for="video in videos" :key="video.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
        <div class="card d-flex flex-column shadow-md p-1 w-100 h-100 card-video" style="border: 2px solid lightgray;">
          <div class="ratio ratio-16x9 video-container"
            style="height: 500px; object-fit: cover; border-top-left-radius: 5px; border-top-right-radius: 5px;"
            @mouseenter="playOnHover($event)" @mouseleave="pauseOnLeave($event)">
            <video :src="video.loaded ? video.url : ''" :poster="video.thumbnail" class="w-100 rounded-top video-hover" controls loop preload="none"
              muted playsinline @loadedmetadata="updateMetadata($event, video)">
              Your browser does not support the video tag.
            </video>
          </div>
          <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2 mt-auto px-2 pb-2">
            <a :href="`https://wa.me/?text=${encodeURIComponent(video.url)}`" target="_blank"
              class="btn btn-sm w-100 custom-btn" style="font-size: 18px;"><i class="bi bi-share-fill"></i> Share</a>
            <a :href="video.url" :download="`video-${video.id}.mp4`" class="btn btn-sm w-100 custom-btn"
              style="font-size: 18px;" target="_blank">
              <i class="bi bi-download"></i> Download
            </a>
          </div>
        </div>
      </div>
      <!-- Sentinel for infinite scroll -->
      <div ref="infiniteScrollSentinel" class="w-100" style="height: 1px;"></div>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- No videos fallback -->
    <div v-if="!loading && videos.length === 0" class="text-center py-5 text-muted">
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
      filters: [
        'Islamic', 'islamic animation', 'Calligraphy', 'Quran', 'Kaaba', 'Mecca', 'Madina', 'Hijab',
        'Ramadan', 'Eid', 'Arabic Art', 'Islamic Architecture',
      ],
      activeFilter: null,
      perPage: 9,
      totalResults: 0,
      bottomObserver: null,
      videoObserver: null,
      // Smooth loading controls
      maxConcurrentLoads: 3,
      activeLoads: 0,
      loadQueue: [],
    };
  },
  computed: {},
  methods: {
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
          // Prefer a smaller file (around 540p/360p) for smoother scrolling
          const pick = this.pickBestFile(video.video_files);
          return {
            id: video.id,
            url: pick?.link,
            thumbnail: video.image,
            description: video.user?.name || 'No description',
            loaded: false,
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
          this.observeVisibleVideos();
          this.setupBottomObserver();
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
      this.page += 1;
      this.fetchVideos(true);
    },

    playOnHover(event) {
      const video = event.currentTarget.querySelector('video');
      if (video) video.play().catch(err => console.warn("Autoplay failed:", err));
    },

    pauseOnLeave(event) {
      const video = event.currentTarget.querySelector('video');
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      }
    },

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

    // IntersectionObserver for bottom sentinel
    setupBottomObserver() {
      if (this.bottomObserver) {
        this.bottomObserver.disconnect();
      }
      const options = { root: null, rootMargin: '400px', threshold: 0 };
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

    // Lazy-load videos: set src only when visible
    observeVisibleVideos() {
      if (this.videoObserver) this.videoObserver.disconnect();
      const options = { root: null, rootMargin: '150px', threshold: 0.01 };
      this.videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const el = entry.target;
          const idx = this.findVideoIndexByEl(el);
          if (!entry.isIntersecting) return;
          if (idx !== -1 && !this.videos[idx].loaded) {
            this.enqueueLoad(idx, el);
          }
          this.videoObserver.unobserve(el);
        });
      }, options);

      const nodes = this.$el.querySelectorAll('video.video-hover');
      nodes.forEach(node => this.videoObserver.observe(node));
    },

    findVideoIndexByEl(el) {
      // Find the index by traversing to the card and reading key via order
      const cards = Array.from(this.$el.querySelectorAll('.card-video'));
      const card = el.closest('.card-video');
      const idx = cards.indexOf(card);
      return idx;
    },

    enqueueLoad(idx, el) {
      this.loadQueue.push({ idx, el });
      this.processQueue();
    },

    processQueue() {
      while (this.activeLoads < this.maxConcurrentLoads && this.loadQueue.length) {
        const { idx, el } = this.loadQueue.shift();
        if (!this.videos[idx] || this.videos[idx].loaded) continue;
        this.videos[idx].loaded = true;
        this.activeLoads++;
        const onDone = () => {
          el.removeEventListener('loadeddata', onDone);
          el.removeEventListener('error', onDone);
          this.activeLoads = Math.max(0, this.activeLoads - 1);
          // Drain more once a load completes
          this.processQueue();
        };
        el.addEventListener('loadeddata', onDone, { once: true });
        el.addEventListener('error', onDone, { once: true });
      }
    },

    pickBestFile(files = []) {
      // Choose an MP4 around 360-540p if available, else fallback to first
      const mp4s = files.filter(f => (f.link || '').includes('.mp4'));
      const byWidth = (a, b) => (a.width || 0) - (b.width || 0);
      const sorted = (mp4s.length ? mp4s : files).slice().sort(byWidth);
      // Find closest to 540 width, fallback to mid or first
      const target = 540;
      let best = sorted[0];
      let minDiff = Infinity;
      sorted.forEach(f => {
        const diff = Math.abs((f.width || target) - target);
        if (diff < minDiff) { minDiff = diff; best = f; }
      });
      return best || files[0] || null;
    }
  },

  mounted() {
    this.fetchVideos(false); // Load initial set
    this.setupBottomObserver();
  }
};
</script>


<style scoped>
.video-container {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.video-container:hover {
  transform: scale(1.05);
  /* Slight zoom effect on hover */
  opacity: 0.9;
  /* Slight fade effect on hover */
}

.video-container video {
  transition: opacity 0.3s ease-in-out;
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
  background-color: #0db691;
  color: white;
  padding: 10px;
  transition: background-color 0.3s, transform 0.2s;
}

.custom-btn:hover {
  background-color: #0aa07f;
  transform: translateY(-2px);
  color: #fff;
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
}
</style>
