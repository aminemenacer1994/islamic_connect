<template>
  <div class="container py-3">
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Animated Videos</h2>
    <p class="text-center text-muted mb-4" style="font-size: 18px;">
      Explore beautiful Islamic visuals including majestic mosques, intricate calligraphy, Quranic themes, serene
      landscapes, timeless architecture, vibrant traditions, cultural festivals, spiritual gatherings, historical sites,
      daily life, artistic expressions, and more.
    </p>

    <!-- Search Bar -->
    <div class="input-group mb-3">
      <input v-model="query" @keyup.enter="searchVideos" type="text" class="form-control"
        placeholder="Search Islamic videos...">
      <button class="btn btn-primary" @click="searchVideos">Search</button>
    </div>

    <!-- Filters -->
    <div class="mb-4 text-center">
      <div class="d-flex justify-content-center overflow-x-auto gap-2 " style="cursor: pointer; white-space: nowrap;">
        <span class="badge shadow-lg flex-shrink-0" v-for="filter in filters" :key="filter" @click="applyFilter(filter)"
          :class="{ active: activeFilter === filter }">
          {{ filter }}
        </span>
      </div>
    </div>

    <!-- Video Grid -->
    <div class="row g-3" v-if="!loading && paginatedVideos.length">
      <div v-for="video in videos" :key="video.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
        <div class="card d-flex flex-column shadow-md p-1 w-100 h-100 card-video shadow-sm">
          <div class="ratio ratio-16x9"
            style="height: 420px; object-fit: cover; border-top-left-radius: 5px; border-top-right-radius: 5px;"
            @mouseenter="playOnHover($event)" @mouseleave="pauseOnLeave($event)">
            <video :src="video.url" :poster="video.thumbnail" v-if="video.url" class="w-100 rounded-top video-hover"
              loop preload="none" muted playsinline>
              Your browser does not support the video tag.
            </video>

          </div>
          <div class="px-2 mt-2 text-muted" style="font-size: 14px;">
            {{ video.description || 'This is a beautiful Islamic animation.' }}
          </div>
          <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2 mt-auto px-2 pb-2">
            <a :href="`https://wa.me/?text=${encodeURIComponent(video.url)}`" target="_blank"
              class="btn btn-sm w-100 custom-btn" style="font-size: 18px;">Share</a>
            <a href="#" role="button" class="btn btn-sm w-100 custom-btn" style="font-size: 18px;"
              data-bs-toggle="modal" data-bs-target="#videoModal" @click="selectedVideo = video.url">
              Expand
            </a>
          </div>
        </div>
      </div>
    </div>




    <!-- No videos fallback -->
    <div v-else-if="!loading && videos.length === 0" class="text-center py-5 text-muted">
      <p class="fs-5">No videos found. Try another keyword.</p>
    </div>

    <div class="mt-4 d-flex justify-content-center align-items-center gap-2 flex-wrap">
      <button class="btn"
        :style="currentPage === 1 ? 'color: gray; border-color: gray;' : 'color: #17a085; border-color: #17a085;'"
        :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        Previous
      </button>

      <button v-for="page in totalPages" :key="page" @click="goToPage(page)" class="btn"
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


    <!-- Modal -->
    <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content bg-dark">
          <div class="modal-header border-0">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0">
            <video :src="selectedVideo" controls autoplay style="width: 100%; height: 100vh;"></video>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [],
      query: 'mosque',
      page: 1,
      perPage: 9,
      totalPages: 0,
      loading: false,
      filters: [
        'Islamic', 'islamic animation', 'Calligraphy', 'Quran', 'Kaaba', 'Mecca', 'Madina', 'Hijab',
        'Ramadan', 'Eid', 'Arabic Art', 'Islamic Architecture',
      ],
      activeFilter: null,
    };
  },
  computed: {
    paginatedVideos() {
      const start = (this.page - 1) * this.perPage;
      const end = start + this.perPage;
      return this.videos.slice(start, end);
    },
  },
  methods: {
    playOnHover(event) {
      const video = event.currentTarget.querySelector('video');
      if (video) {
        video.play().catch((err) => console.warn("Autoplay failed:", err));
      }
    },
    pauseOnLeave(event) {
      const video = event.currentTarget.querySelector('video');
      if (video) {
        video.pause();
      }
    },
    async searchVideos() {
      this.loading = true;
      const apiKey = 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f';
      const url = `https://api.pexels.com/videos/search?query=${encodeURIComponent(this.query)}&per_page=${this.perPage}&page=${this.page}`;

      try {
        const response = await fetch(url, { headers: { Authorization: apiKey } });
        const data = await response.json();
        this.videos = data.videos.map(video => ({
          id: video.id,
          url: video.video_files.find(f => f.quality === 'sd')?.link || video.video_files[0]?.link
        }));
        this.totalPages = Math.ceil(data.total_results / this.perPage);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        this.loading = false;
      }
    },
    goToPage(pageNumber) {
      this.page = pageNumber;
      this.searchVideos();
    },
    applyFilter(filter) {
      this.activeFilter = filter;
      this.query = filter;
      this.page = 1;
      this.searchVideos();
    },
    applySuggested(keyword) {
      this.query = keyword;
      this.page = 1;
      this.searchVideos();
    },
  },
  mounted() {
    this.searchVideos();

    this.$nextTick(() => {
      // Attach hover play/pause events after DOM update
      this.$el.querySelectorAll('.video-hover').forEach(video => {
        video.addEventListener('mouseenter', () => {
          video.muted = false;
          video.play();
        });
        video.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      });
    });
  },

};

</script>

<style scoped>
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

.filter-scroll {
  scrollbar-color: #17a085 transparent;
  scrollbar-width: thin;
}

/* For Webkit (Chrome, Edge, Safari) */
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
