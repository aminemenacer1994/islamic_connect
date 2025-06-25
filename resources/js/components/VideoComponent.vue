<template>
  <div class="container py-5">
    <h2 class="mb-3 text-center fw-bold display-5 display-md-4 animate__animated animate__fadeInDown">
      Islamic Animated Videos
    </h2>
    <p class="text-center text-muted mb-5 lead animate__animated animate__fadeInUp" style="font-size: 1.2rem;">
      Discover a captivating collection of Islamic animated videos, bringing to life the beauty and spirituality of
      Islamic culture. From the grandeur of mosques and intricate calligraphy to the serenity of nature and historical landmarks.
    </p>

    <!-- Search -->
    <div class="row justify-content-center mb-4 animate__animated animate__fadeIn">
      <div class="col-12 col-md-10">
        <h3 class="fw-bold text-left pt-3 pb-2">Search Animated Videos</h3>
        <div class="input-group shadow-sm search-container">
          <span class="input-group-text border-light"><i class="fas fa-search"></i></span>
          <input v-model="query" @keyup.enter="searchVideos" type="text" class="form-control border-light search-input"
            placeholder="Search for Islamic videos..." />
          <button @click="searchVideos" class="btn btn-custom search-btn" type="button">
            <i class="fas fa-search me-2"></i>Search
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-3 text-center animate__animated animate__fadeIn">
      <div class="filter-scroll-wrapper position-relative">
        <div class="filter-scroll d-flex justify-content-start gap-2 px-3 py-2">
          <span class="badge filter-badge animate__animated animate__bounceIn" v-for="(filter, index) in filters" :key="filter"
            @click="applyFilter(filter)" :class="{
              'bg-custom text-white': activeFilter === filter,
              'bg-light text-dark border-custom': activeFilter !== filter
            }" :style="{ animationDelay: `${index * 0.1}s` }">
            <i :class="getFilterIcon(filter) || 'fas fa-video'" class="me-1"></i>{{ filter }}
          </span>
        </div>
      </div>
    </div>

    <!-- Video Grid -->
    <div class="row g-4" v-if="!loading && videos.length">
      <div v-for="(video, index) in videos" :key="video.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
        <div class="card border-light shadow-sm h-100 card-video animate__animated animate__fadeInUp"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="ratio ratio-16x9 video-container">
            <video :src="video.url" :poster="video.thumbnail" class="w-100 rounded-top video-hover" controls loop preload="none"
              muted playsinline @loadedmetadata="updateMetadata($event, video)"
              @mouseenter="playOnHover($event)" @mouseleave="pauseOnLeave($event)">
              Your browser does not support the video tag.
            </video>
            <div class="video-overlay">
              <i class="fas fa-play-circle fa-3x"></i>
            </div>
          </div>
          <div class="card-body d-flex flex-column ">
            <div class="d-flex gap-2 mt-auto">
              <a :href="`https://wa.me/?text=${encodeURIComponent(video.url)}`" target="_blank"
                class="btn btn-sm btn-outline-custom w-50">
                <i class="fas fa-share-alt me-2"></i>Share
              </a>
              <a :href="video.url" :download="`video-${video.id}.mp4`" class="btn btn-sm btn-custom w-50"
                target="_blank">
                <i class="fas fa-download me-2"></i>Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="videos.length" class=" d-flex justify-content-center align-items-center gap-2 flex-wrap animate__animated animate__fadeIn">
      <button class="btn btn-outline-custom pagination-btn" :class="{ 'disabled': currentPage === 1 }"
        @click="goToPage(currentPage - 1)">
        <i class="fas fa-chevron-left me-2"></i>Previous
      </button>
      <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
        class="btn pagination-btn" :class="{ 'btn-custom text-white': page === currentPage, 'btn-outline-custom': page !== currentPage }">
        {{ page }}
      </button>
      <button class="btn btn-outline-custom pagination-btn" :class="{ 'disabled': currentPage === totalPages }"
        @click="goToPage(currentPage + 1)">
        Next<i class="fas fa-chevron-right ms-2"></i>
      </button>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-custom" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- No videos fallback -->
    <div v-else-if="!loading && videos.length === 0" class="text-center py-5 text-muted animate__animated animate__fadeIn">
      <p class="fs-5"><i class="fas fa-exclamation-circle me-2"></i>No videos found. Try another keyword.</p>
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
        'Islamic', 'Islamic Animation', 'Calligraphy', 'Quran', 'Kaaba', 'Mecca', 'Madina', 'Hijab',
        'Ramadan', 'Eid', 'Arabic Art', 'Islamic Architecture'
      ],
      activeFilter: null,
      currentPage: 1,
      perPage: 9,
      totalResults: 0
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
    getFilterIcon(filter) {
      const iconMap = {
        'Islamic': 'fas fa-mosque',
        'Islamic Animation': 'fas fa-film',
        'Calligraphy': 'fas fa-pen-nib',
        'Quran': 'fas fa-book-quran',
        'Kaaba': 'fas fa-kaaba',
        'Mecca': 'fas fa-place-of-worship',
        'Madina': 'fas fa-mosque',
        'Hijab': 'fas fa-headscarf',
        'Ramadan': 'fas fa-moon',
        'Eid': 'fas fa-star-and-crescent',
        'Arabic Art': 'fas fa-palette',
        'Islamic Architecture': 'fas fa-archway'
      };
      return iconMap[filter] || 'fas fa-video';
    },
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
          const tag = video.video_tags?.[0]?.tag || this.query.toLowerCase();
          return {
            id: video.id,
            url: file?.link,
            thumbnail: video.image,
            description: `A video capturing the essence of ${tag} in Islamic culture`,
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
      this.currentPage = 1;
      this.searchVideos();
    }
  },
  mounted() {
    this.searchVideos();
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

.container {
  max-width: 1400px;
}

.card-video {
  border: 1px solid #e9ecef;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation-duration: 0.6s;
  min-height: 500px;
}

.card-video:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.video-container {
  position: relative;
  border-radius: 10px 10px 0 0;
  z-index: 1;
  min-height: 300px;
}

.video-container:hover .video-overlay {
  opacity: 0.8;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 10px 10px 0 0;
}

.video-hover {
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 10px 10px 0 0;
  z-index: 2;
  height: 100%;
}

.video-container:hover .video-hover {
  transform: scale(1);
}

.filter-scroll-wrapper {
  position: relative;
}

.filter-scroll {
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}

.filter-scroll::-webkit-scrollbar {
  display: none;
}

.filter-badge {
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #0db691;
}

.filter-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bg-custom {
  background-color: #0db691;
  border: 2px solid #0db691;
}

.border-custom {
  border: 2px solid #0db691;
}

.btn-custom {
  background-color: #0db691;
  color: white;
  border: 2px solid #0db691;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.btn-outline-custom {
  border: 2px solid #0db691;
  color: #0db691;
  border-radius: 10px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.btn-custom:hover, .btn-outline-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #0aa07f;
  border-color: #0aa07f;
}

.btn-outline-custom:hover {
  background-color: #0db691;
  color: white;
}

.text-custom {
  color: #0db691;
}

.spinner-border.text-custom {
  border-color: #0db691;
  border-right-color: transparent;
}

.search-container {
  border-radius: 10px;
  transition: box-shadow 0.3s ease;
  background: transparent;
}

.search-container:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-input {
  border-radius: 10px 0 0 10px;
  font-size: 1.1rem;
  padding: 12px;
  background: transparent;
}

.search-btn {
  border-radius: 0 10px 10px 0;
}

.description-text {
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 700;
  color: #6c757d;
  letter-spacing: 0.02em;
}
</style>