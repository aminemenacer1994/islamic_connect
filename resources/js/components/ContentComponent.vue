<template>
  <div class="container mt-4">
    <h1 class="display-5 fw-bold text-center mb-4">Islamic Podcasts</h1>
    <p class="text-center container mb-4">Explore and discover the latest Islamic podcasts, featuring insightful discussions, inspiring content, and topics to deepen your understanding and connection with Islam.</p>

    <div v-if="bookmarks.length || favourites.length" class="mb-4">
    
    <!-- Section Header with Collapsible Toggle for Bookmarks -->
    <h3 class="display-6 pb-2 fw-bold fs-4 fs-md-3 fs-lg-2">
      Bookmarked Podcasts
      <span class="badge bg-secondary ms-2">{{ bookmarks.length }}</span>
      <button class="btn btn-link btn-sm ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#bookmarksCollapse" aria-expanded="false" aria-controls="bookmarksCollapse">
        <i class="bi bi-chevron-down"></i>
      </button>
    </h3>

    <!-- Collapsible Bookmarks Section -->
    <div id="bookmarksCollapse" class="collapse">
      <div v-if="bookmarks.length" class="list-group">
        <div v-for="podcast in bookmarks" :key="podcast.title" class="list-group-item d-flex justify-content-between align-items-center row">
          <div class="col-12 col-md-8">
            <span class="fs-6">{{ podcast.title }}</span>
          </div>
          <div class="col-12 col-md-4 text-md-end">
            <button @click="goToPodcast(podcast)" class="btn btn-sm btn-outline-primary me-2">
              <i class="bi bi-play-circle"></i> Play Podcast
            </button>
            <button @click="removeBookmark(podcast)" class="btn btn-sm btn-outline-danger">
              <i class="bi bi-trash-fill"></i> Remove Bookmark
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-info" role="alert">
          No bookmarked podcasts found.
        </div>
      </div>
    </div>

    <!-- Section Header with Collapsible Toggle for Favourites -->
    <h3 class="display-6 fw-bold fs-4 fs-md-3 fs-lg-2 mt-4">
      Favourite Podcasts
      <span class="badge bg-secondary ms-2">{{ favourites.length }}</span>
      <button class="btn btn-link btn-sm ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#favouritesCollapse" aria-expanded="false" aria-controls="favouritesCollapse">
        <i class="bi bi-chevron-down"></i>
      </button>
    </h3>

    <!-- Collapsible Favourites Section -->
    <div id="favouritesCollapse" class="collapse">
      <div v-if="favourites.length" class="list-group">
        <div v-for="podcast in favourites" :key="podcast.title" class="list-group-item d-flex justify-content-between align-items-center row">
          <div class="col-12 col-md-8">
            <span class="fs-6">{{ podcast.title }}</span>
          </div>
          <div class="col-12 col-md-4 text-md-end">
            <button @click="goToPodcast(podcast)" class="btn btn-sm btn-outline-primary me-2">
              <i class="bi bi-play-circle"></i> Play Podcast
            </button>
            <button @click="removeFavourite(podcast)" class="btn btn-sm btn-outline-danger">
              <i class="bi bi-trash-fill"></i> Remove Favourite
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-info" role="alert">
          No favourite podcasts found.
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Message for Confirmation -->
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div v-if="showToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-body">
        Podcast has been saved to {{ toastType }}.
      </div>
    </div>
  </div>


    <div v-if="!loading && podcasts.length">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4 mb-4">
        <div v-for="podcast in paginatedPodcasts" :key="podcast.title" class="col">
          <div class="card h-100" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <div class="card-body" style="border: 2px solid rgb(13, 182, 145); border-top-left-radius: 10px; border-top-right-radius: 10px;">
              <h5 class="card-title fw-bold">{{ podcast.title }}</h5>
              <p class="text-muted">Views: {{ podcast.views }}</p>
              <p class="text-muted">Published on: {{ formatDate(podcast.pubDate) }}</p>
              <div class="container text-center d-flex justify-content-between">
                <i :class="isBookmarked(podcast) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'" @click="toggleBookmark(podcast)" style="cursor: pointer; font-size: 1.5rem;"></i>
                <i :class="isFavourite(podcast) ? 'bi bi-heart-fill' : 'bi bi-heart'" @click="toggleFavourite(podcast)" style="cursor: pointer; font-size: 1.5rem;"></i>
                <i class="bi bi-share" style="cursor: pointer; font-size: 1.5rem;"></i>
              </div>
            </div>
            <audio ref="audioPlayer" :controls="true" :src="podcast.audioUrl" v-if="podcast.audioUrl" class="w-100 audio" style="border-radius: 0;background:rgb(13, 182, 145);">
              Your browser does not support the audio element.
            </audio>
            <p v-else>No audio available for this podcast.</p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav aria-label="Podcast pagination mt-3">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{'disabled': currentPage === 1}">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li v-for="page in pages" :key="page" class="page-item" :class="{'active': currentPage === page}">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled': currentPage === totalPages}">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>

    <div v-if="!loading && !filteredPodcasts.length" class="text-center">No podcasts found</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showToast: false, 
      toastType: '',
      podcasts: [],
      filteredPodcasts: [],
      loading: true,
      rssUrl: 'https://themadmamluks.libsyn.com/rss',
      currentPage: 1,
      podcastsPerPage: 12,
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredPodcasts.length / this.podcastsPerPage);
    },
    pages() {
      let pageNumbers = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers.slice(0, 5);
    },
    paginatedPodcasts() {
      const start = (this.currentPage - 1) * this.podcastsPerPage;
      const end = start + this.podcastsPerPage;
      return this.filteredPodcasts.slice(start, end);
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    },
    async fetchPodcasts() {
      const response = await fetch(this.rssUrl);
      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const items = xmlDoc.getElementsByTagName('item');

      let podcasts = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const podcast = {
          title: item.getElementsByTagName('title')[0].textContent,
          pubDate: item.getElementsByTagName('pubDate')[0].textContent,
          description: item.getElementsByTagName('description')[0].textContent,
          audioUrl: item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || '',
          views: Math.floor(Math.random() * 1000),
        };
        podcasts.push(podcast);
      }

      this.podcasts = podcasts;
      this.filteredPodcasts = podcasts;
      this.loading = false;
    },
    toggleBookmark(podcast) {
      if (this.isBookmarked(podcast)) {
        this.bookmarks = this.bookmarks.filter(item => item.title !== podcast.title);
      } else {
        this.bookmarks.push(podcast);
      }
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    },
    toggleFavourite(podcast) {
      if (this.isFavourite(podcast)) {
        this.favourites = this.favourites.filter(item => item.title !== podcast.title);
      } else {
        this.favourites.push(podcast);
      }
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    },
    isBookmarked(podcast) {
      return this.bookmarks.some(bookmark => bookmark.title === podcast.title);
    },
    isFavourite(podcast) {
      return this.favourites.some(fav => fav.title === podcast.title);
    },
    addBookmark(podcast) {
      this.bookmarks.push(podcast);
      this.showConfirmationToast('bookmarks');
    },
    addFavourite(podcast) {
      this.favourites.push(podcast);
      this.showConfirmationToast('favourites');
    },
    showConfirmationToast(type) {
      this.toastType = type;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000); // Automatically close the toast after 3 seconds
    },
    removeBookmark(podcast) {
      this.bookmarks = this.bookmarks.filter(item => item.title !== podcast.title);
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
      const index = this.bookmarks.findIndex(b => b.title === podcast.title);
      if (index !== -1) {
        this.bookmarks.splice(index, 1);
      }
    },
    removeFavourite(podcast) {
      this.favourites = this.favourites.filter(item => item.title !== podcast.title);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
      const index = this.favourites.findIndex(f => f.title === podcast.title);
      if (index !== -1) {
        this.favourites.splice(index, 1);
      }
    },
    goToPodcast(podcast) {
      window.location.href = podcast.audioUrl;
    },
    changePage(pageNumber) {
      if (pageNumber < 1 || pageNumber > this.totalPages) return;
      this.currentPage = pageNumber;
    },
  },
  mounted() {
    this.fetchPodcasts();
  },
};
</script>

<style scoped>
.toast-container {
  z-index: 1050;
}
.audio {
  border-radius: 0 !important;
}

audio::-webkit-media-controls-panel {
  background:rgb(13, 182, 145)
}

.card {
  height: 100%;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #333;
}

.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
}

.pagination .page-link {
  cursor: pointer;
}

@media (max-width: 767px) {
  .pagination {
    display: block;
    text-align: center;
  }
}
</style>
