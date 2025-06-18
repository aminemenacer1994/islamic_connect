<template>
  <div class="container py-4">
    <h1 class="display-5 fw-bold text-center">Islamic Video Podcasts</h1>
    <p class="text-center container mb-4 lead">
      Explore a collection of Islamic video podcasts featuring lectures, sermons, and educational content on topics like Seerah, Quran, and spirituality.
    </p>

    <!-- Error Message -->
    <div v-if="errorMessage" class="alert alert-danger text-center">
      {{ errorMessage }} <a href="#" @click="fetchPodcasts">Retry</a>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="container" v-else>
      <h2 class="fw-bold text-left pt-2 pb-4">Select a Video Podcast:</h2>

      <div v-if="islamicPodcasts.length" class="row">
        <div v-for="podcast in islamicPodcasts" :key="podcast.id" class="col-6 col-md-2 mb-4 text-center"
          @click="selectPodcast(podcast)" style="cursor: pointer;">
          <img :src="podcast.thumbnail" alt="Podcast Thumbnail" class="img-fluid"
            style="height: 180px; width: 100%; object-fit: cover; border-radius: 18px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;"
            @error="handleImageError">
          <h5 class="mt-3" style="font-size: 1.2rem; font-weight: 600;">
            {{ podcast.title }}
          </h5>
          <p class="text-muted" style="font-size: 0.9rem;">{{ podcast.creator }}</p>
        </div>
      </div>
      <div v-else class="text-center text-muted">
        No video podcasts found. Try refreshing or adjusting the search query.
      </div>
    </div>

    <div class="pt-3" v-if="selectedPodcast" ref="podcastDetailSection">
      <hr class="container" />
      <p class="fw-bold display-5">{{ selectedPodcast.title }}</p>
      <img style="border-radius: 15px;" class="col-md-2" :src="selectedPodcast.thumbnail" :alt="selectedPodcast.title"
        @error="handleImageError">
      <h5 class="col-md-10 mt-3 pb-3 text-muted" style="line-height: 1.8em;">
        {{ selectedPodcast.description || 'An Islamic lecture or sermon.' }}
      </h5>
      <h4 class="fw-bold ml-2 pb-3">
        Creator: {{ selectedPodcast.creator || 'Unknown' }}
      </h4>
      <h4 class="fw-bold ml-2 pb-3">
        Uploaded: {{ formatDate(selectedPodcast.uploadDate) || 'Unknown' }}
      </h4>
      <h4 class="fw-bold ml-2 pb-3">
        Genre: {{ selectedPodcast.genre || 'Islamic' }}
      </h4>
      <div class="mb-3">
        <button class="btn btn-primary me-2" @click="playVideo(selectedPodcast)">
          Play Video
        </button>
        <button class="btn btn-outline-success" @click="toggleBookmark(selectedPodcast)">
          {{ isBookmarked(selectedPodcast) ? 'Remove Bookmark' : 'Bookmark' }}
        </button>
      </div>
      <!-- Video Player -->
      <div v-if="selectedPodcast.videoUrl" class="ratio ratio-16x9 mb-3">
        <video controls :src="selectedPodcast.videoUrl" class="w-100"
          style="border-radius: 8px;" @error="handleVideoError">
          Your browser does not support the video element.
        </video>
      </div>
      <div v-else class="text-danger mb-3">Video unavailable for this podcast.</div>
    </div>

    <div class="row pb-3 g-2 g-md-3">
      <!-- Genre Filter -->
      <div class="col-md-6 px-2 px-md-3">
        <h4 for="genreFilter" class="form-label fw-bold">Genre:</h4>
        <select id="genreFilter" class="form-select" v-model="genreFilter" @change="filterPodcasts">
          <option value="">All Genres</option>
          <option value="Seerah">Seerah</option>
          <option value="Quran">Quran</option>
          <option value="Spirituality">Spirituality</option>
          <option value="Islamic History">Islamic History</option>
        </select>
      </div>

      <!-- Date Filter -->
      <div class="col-md-6 px-2 px-md-3 pb-2">
        <h4 for="dateFilter" class="form-label fw-bold">Upload Date:</h4>
        <select id="dateFilter" class="form-select" v-model="dateFilter" @change="filterPodcasts">
          <option value="">All Dates</option>
          <option value="recent">Last 2 Years</option>
          <option value="past">2–10 Years Ago</option>
          <option value="older">Over 10 Years Ago</option>
        </select>
      </div>
    </div>

    <!-- Podcast List -->
    <div v-if="!loading && paginatedPodcasts.length">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4 mb-2">
        <div v-for="podcast in paginatedPodcasts" :key="podcast.id" class="col">
          <div :class="['card', { 'highlighted': selectedPodcast && selectedPodcast.id === podcast.id }]"
            style="border-radius: 8px;">
            <div class="card-body">
              <h4 class="card-title pb-2 display-5 fw-bold" v-html="highlightText(podcast.title)"></h4>
              <h6>Creator: {{ podcast.creator || 'Unknown' }}</h6>
              <h6>Uploaded: {{ formatDate(podcast.uploadDate) || 'Unknown' }}</h6>
              <hr>
              <div class="text-center d-flex justify-content-between align-items-center">
                <div class="icon-container">
                  <i class="bi bi-share icon-tooltip" @click="sharePodcast(podcast)" data-bs-toggle="tooltip"
                    data-bs-placement="top" title="Share"></i>
                  <span class="icon-text">Share</span>
                </div>
                <div class="icon-container">
                  <i :class="['bi', isBookmarked(podcast) ? 'bi-bookmark-fill' : 'bi-bookmark', 'icon-tooltip']"
                    @click="toggleBookmark(podcast)" data-bs-toggle="tooltip" data-bs-placement="top" title="Bookmark"></i>
                  <span class="icon-text">Bookmark</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav aria-label="Podcast pagination" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"
              style="background-color: rgb(13, 182, 145); color: white; border-color: rgb(13, 182, 145);">
              Previous
            </a>
          </li>
          <li v-for="page in pages" :key="page" class="page-item" :class="{ 'active': currentPage === page }">
            <a class="page-link" href="#" @click.prevent="changePage(page)"
              :style="currentPage === page ? 'background-color: white; color: rgb(13, 182, 145); border-color: rgb(13, 182, 145);' : 'background-color: rgb(13, 182, 145); color: white; border-color: rgb(13, 182, 145);'">
              {{ page }}
            </a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)"
              style="background-color: rgb(13, 182, 145); color: white; border-color: rgb(13, 182, 145);">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div v-else-if="!loading" class="text-center text-muted">No filtered video podcasts found.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      genreFilter: '',
      dateFilter: '',
      currentPage: 1,
      podcastsPerPage: 8,
      bookmarks: JSON.parse(localStorage.getItem('podcastBookmarks')) || [],
      selectedPodcast: null,
      islamicPodcasts: [],
      paginatedPodcasts: [],
      errorMessage: null,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.filteredPodcasts.length / this.podcastsPerPage);
    },
    pages() {
      return Array.from({ length: Math.min(this.totalPages, 8) }, (_, i) => i + 1);
    },
    filteredPodcasts() {
      let podcasts = [...this.islamicPodcasts];
      if (this.genreFilter) {
        podcasts = podcasts.filter(podcast => podcast.genre === this.genreFilter);
      }
      if (this.dateFilter) {
        podcasts = this.applyDateFilter(podcasts);
      }
      return podcasts;
    },
  },

  methods: {
    async fetchPodcasts() {
      this.loading = true;
      this.errorMessage = null;
      try {
        // Check cache
        const cacheKey = `podcasts_page_${this.currentPage}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          this.islamicPodcasts = JSON.parse(cached);
          console.log('Loaded from cache:', this.islamicPodcasts.length, 'podcasts');
          this.loading = false;
          this.filterPodcasts();
          return;
        }

        // Fetch from Internet Archive API
        const response = await fetch(
          `https://corsproxy.io/?${encodeURIComponent(
            `https://archive.org/advancedsearch.php?q=Islamic+(lecture+OR+sermon+OR+podcast)+format:(mp4+OR+mpeg)&fl[]=identifier,title,creator,description,date,subject&rows=20&page=${this.currentPage}&output=json`
          )}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API raw response:', data);

        // Map API data to podcast format
        this.islamicPodcasts = data.response?.docs
          ?.filter(doc => doc.identifier && doc.title) // Ensure valid entries
          .map(doc => ({
            id: doc.identifier,
            title: doc.title,
            creator: Array.isArray(doc.creator) ? doc.creator.join(', ') : doc.creator || 'Unknown',
            description: Array.isArray(doc.description) ? doc.description.join(' ') : doc.description || null,
            thumbnail: `https://archive.org/services/img/${doc.identifier}`,
            uploadDate: doc.date ? new Date(doc.date) : null,
            genre: this.inferGenre(doc.subject ? (Array.isArray(doc.subject) ? doc.subject.join(' ') : doc.subject) : doc.title),
            videoUrl: null, // Set dynamically
            directVideoUrl: `https://archive.org/download/${doc.identifier}/${doc.identifier}.mp4`,
          })) || [];
        console.log('Mapped podcasts:', this.islamicPodcasts);

        // Cache results
        localStorage.setItem(cacheKey, JSON.stringify(this.islamicPodcasts));
      } catch (error) {
        console.error('Error fetching video podcasts:', error);
        this.errorMessage = 'Failed to load video podcasts. Please try again.';
      } finally {
        this.loading = false;
        this.filterPodcasts();
      }
    },

    inferGenre(text) {
      if (!text) return 'Islamic';
      const lowerText = text.toLowerCase();
      if (lowerText.includes('quran') || lowerText.includes('koran')) return 'Quran';
      if (lowerText.includes('seerah') || lowerText.includes('prophet muhammad')) return 'Seerah';
      if (lowerText.includes('spirituality') || lowerText.includes('sufism')) return 'Spirituality';
      if (lowerText.includes('history') || lowerText.includes('islamic history')) return 'Islamic History';
      return 'Islamic';
    },

    selectPodcast(podcast) {
      this.selectedPodcast = podcast;
      this.currentPage = 1;
      this.filterPodcasts();
      this.$nextTick(() => {
        const section = this.$refs.podcastDetailSection;
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },

    playVideo(podcast) {
      this.selectedPodcast = { ...podcast, videoUrl: podcast.directVideoUrl };
    },

    filterPodcasts() {
      this.paginatedPodcasts = this.filteredPodcasts.slice(
        (this.currentPage - 1) * this.podcastsPerPage,
        this.currentPage * this.podcastsPerPage
      );
      console.log('Paginated podcasts:', this.paginatedPodcasts);
    },

    applyDateFilter(podcasts) {
      const now = new Date();
      const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate());
      const tenYearsAgo = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
      switch (this.dateFilter) {
        case 'recent':
          return podcasts.filter(podcast => podcast.uploadDate && podcast.uploadDate >= twoYearsAgo);
        case 'past':
          return podcasts.filter(podcast => podcast.uploadDate && podcast.uploadDate >= tenYearsAgo && podcast.uploadDate < twoYearsAgo);
        case 'older':
          return podcasts.filter(podcast => podcast.uploadDate && podcast.uploadDate < tenYearsAgo);
        default:
          return podcasts;
      }
    },

    sharePodcast(podcast) {
      if (!podcast || !podcast.directVideoUrl) {
        alert('This video podcast cannot be shared due to missing video.');
        return;
      }
      const text = `Watch this Islamic video podcast: ${podcast.title} by ${podcast.creator}\nVideo: ${podcast.directVideoUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    },

    toggleBookmark(podcast) {
      const bookmark = {
        id: podcast.id,
        title: podcast.title,
        creator: podcast.creator,
        directVideoUrl: podcast.directVideoUrl,
      };
      const index = this.bookmarks.findIndex(item => item.id === podcast.id);
      if (index > -1) {
        this.bookmarks.splice(index, 1);
      } else {
        this.bookmarks.push(bookmark);
      }
      localStorage.setItem('podcastBookmarks', JSON.stringify(this.bookmarks));
    },

    isBookmarked(podcast) {
      return this.bookmarks.some(bookmark => bookmark.id === podcast.id);
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchPodcasts(); // Re-fetch for new page
      }
    },

    formatDate(date) {
      if (!date) return 'Unknown';
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },

    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/180x180?text=Thumbnail+Not+Available';
    },

    handleVideoError() {
      this.errorMessage = 'Video file is unavailable for this podcast.';
    },

    highlightText(title) {
      return title; // Placeholder for future search highlighting
    },
  },

  mounted() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
    // Fetch video podcasts
    this.fetchPodcasts();
  },

  watch: {
    genreFilter: 'filterPodcasts',
    dateFilter: 'filterPodcasts',
  },
};
</script>

<style scoped>
.highlighted {
  border: 2px solid rgb(13, 182, 145);
  background-color: rgba(10, 228, 181, 0.232);
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.icon-tooltip {
  font-size: 1.3rem;
  transition: color 0.3s ease-in-out;
}

.icon-tooltip:hover {
  color: rgb(13, 182, 145);
}

.icon-text {
  font-size: 0.875rem;
  color: #333;
}

img {
  max-width: 180px;
  height: auto;
}

.card {
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.02);
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
}

.pagination .page-link {
  cursor: pointer;
}

@media (max-width: 576px) {
  .pagination {
    flex-wrap: nowrap;
    justify-content: center;
  }
}
</style>