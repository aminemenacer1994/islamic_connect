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
          style="overflow-x: auto; white-space: nowrap; -ms-overflow-style: none; scrollbar-width: none;">
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
    <div class="row g-3" v-if="!loading && videos.length">
      <div v-for="video in videos" :key="video.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
        <div class="card d-flex flex-column shadow-md p-1 w-100 h-100 card-video shadow-sm">
          <div class="ratio ratio-16x9 video-container"
            style="height: 500px; object-fit: cover; border-top-left-radius: 5px; border-top-right-radius: 5px;"
            @mouseenter="playOnHover($event)" @mouseleave="pauseOnLeave($event)">
            <video :src="video.url" :poster="video.thumbnail" class="w-100 rounded-top video-hover" controls loop preload="none"
              muted playsinline @loadedmetadata="updateMetadata($event, video)">
              Your browser does not support the video tag.
            </video>
          </div>
          <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2 mt-auto px-2 pb-2">
            <a :href="`https://wa.me/?text=${encodeURIComponent(video.url)}`" target="_blank"
              class="btn btn-sm w-100 custom-btn" style="font-size: 18px;">Share</a>
            <a :href="video.url" :download="`video-${video.id}.mp4`" class="btn btn-sm w-100 custom-btn"
              style="font-size: 18px;" target="_blank">
              Download
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="videos.length" class="mt-4 d-flex justify-content-center align-items-center gap-2 flex-wrap">
      <button class="btn"
        :style="currentPage === 1 ? 'color: gray; border-color: gray;' : 'color: #17a085; border-color: #17a085;'"
        :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        Previous
      </button>

      <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" class="btn"
        :style="page === currentPage ? 'background-color: #17a085; color: white;' : ''"
        :class="page === currentPage ? '' : 'btn-outline-success'">
        {{ page }}
      </button>

      <button class="btn"
        :style="currentPage === totalPages ? 'color: gray; border-color: gray;' : 'color: #17a085; border-color: #17a085;'"
        :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
        Next
      </button>
    </div>




    <!-- Loading indicator -->
    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- No videos fallback -->
    <div v-else-if="!loading && videos.length === 0" class="text-center py-5 text-muted">
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
      filters: [
        'Islamic', 'islamic animation', 'Calligraphy', 'Quran', 'Kaaba', 'Mecca', 'Madina', 'Hijab',
        'Ramadan', 'Eid', 'Arabic Art', 'Islamic Architecture',
      ],
      activeFilter: null,
      currentPage: 1,
      perPage: 9,
      totalResults: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalResults / this.perPage);
    },
    visiblePages() {
      const maxVisible = 5;
      let start = Math.max(this.currentPage - Math.floor(maxVisible / 2), 1);
      let end = start + maxVisible - 1;

      if (end > this.totalPages) {
        end = this.totalPages;
        start = Math.max(end - maxVisible + 1, 1);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.searchVideos();
      }
    },

    async searchVideos() {
      this.loading = true;

      const apiKey = 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f';
      const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(this.query)}&per_page=${this.perPage}&page=${this.currentPage}`;

      try {
        const response = await fetch(url, {
          headers: { Authorization: apiKey }
        });
        const data = await response.json();

        this.totalResults = data.total_results || 0;

        this.videos = data.videos.map(video => {
          const file = video.video_files.find(f => f.quality === 'hd') || video.video_files[0];
          return {
            id: video.id,
            url: file?.link,
            thumbnail: video.image,
            description: video.user?.name || 'No description',
            metadata: {
              width: null,
              height: null,
              duration: null,
              aspectRatio: null,
            }
          };
        });
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        this.loading = false;
      }
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
      this.searchVideos();
    },
  },

  mounted() {
    this.searchVideos(); // Load initial set
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
