<template>
  <div class="container mt-4">
    <h1 class="display-5 fw-bold text-center mb-4">Islamic Podcasts</h1>
    <p class="text-center container mb-4">
      Explore and discover the latest Islamic podcasts, featuring insightful discussions, inspiring content, and topics
      to deepen your understanding and connection with Islam.
    </p>

    <!-- Bookmarks Section -->
    <div v-if="bookmarks.length || favourites.length" class="mb-4">
      <!-- Bookmarks -->
      <h3 class="display-6 pb-2 fw-bold fs-4 fs-md-3 fs-lg-2">
        Bookmark Podcasts
        <span class="badge bg-secondary ms-2">{{ bookmarks.length }}</span>
        <button class="btn btn-link btn-sm ms-3" type="button" data-bs-toggle="collapse"
          data-bs-target="#bookmarksCollapse" aria-expanded="false" aria-controls="bookmarksCollapse">
          <i class="bi bi-chevron-down"></i>
        </button>
      </h3>
      <div id="bookmarksCollapse" class="collapse">
        <div v-if="bookmarks.length" class="list-group">
          <div v-for="podcast in bookmarks" :key="podcast.title"
            class="list-group-item d-flex justify-content-between align-items-center row">
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
          <div class="alert alert-info" role="alert">No bookmarked podcasts found.</div>
        </div>
      </div>

      <!-- Favourites -->
      <h3 class="display-6 fw-bold fs-4 fs-md-3 fs-lg-2 mt-4">
        Favourite Podcasts
        <span class="badge bg-secondary ms-2">{{ favourites.length }}</span>
        <button class="btn btn-link btn-sm ms-3" type="button" data-bs-toggle="collapse"
          data-bs-target="#favouritesCollapse" aria-expanded="false" aria-controls="favouritesCollapse">
          <i class="bi bi-chevron-down"></i>
        </button>
      </h3>
      <div id="favouritesCollapse" class="collapse">
        <div v-if="favourites.length" class="list-group">
          <div v-for="podcast in favourites" :key="podcast.title"
            class="list-group-item d-flex justify-content-between align-items-center row">
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
          <div class="alert alert-info" role="alert">No favourite podcasts found.</div>
        </div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="row">
      <div class="col-md-6"></div>
      <div class="mb-3 col-md-6">
        <input type="search" class="form-control" placeholder="Search podcasts..." v-model="searchQuery"
          @input="onSearch" />
      </div>
    </div>

    <!-- Podcast Cards -->
    <div v-if="!loading && paginatedPodcasts.length" class="mb-3">
      <div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-4 mb-2">
        <div v-for="podcast in paginatedPodcasts" :key="podcast.title" class="col">
          <div class="card h-100" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; 
                 border-top-left-radius: 10px; 
                 border-top-right-radius: 10px;">
            <div class="card-body">
              <h4 class="card-title display-5 fw-bold" v-html="highlightText(podcast.title)"></h4>
              <p class="text-muted">Views: {{ podcast.views }}</p>
              <p class="text-muted">Published on: {{ formatDate(podcast.pubDate) }}</p>
              <div class="container text-center d-flex justify-content-between" style="bottom: 0;">
                <i :class="isBookmarked(podcast) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"
                  @click="toggleBookmark(podcast)" style="cursor: pointer; font-size: 1.5rem;"></i>
                <i :class="isFavourite(podcast) ? 'bi bi-heart-fill' : 'bi bi-heart'" @click="toggleFavourite(podcast)"
                  style="cursor: pointer; font-size: 1.5rem;"></i>
                <!-- <i class="bi bi-share" style="cursor: pointer; font-size: 1.5rem;" @click="sharePodcast(podcast)"></i> -->
                <i
                  class="bi bi-share-fill"
                  style="cursor: pointer; font-size: 1.5rem;"
                  @click="shareOnWhatsApp(podcast)"
                ></i>
              </div>
            </div>
            <audio ref="audioPlayer" :controls="true" :src="podcast.audioUrl" v-if="podcast.audioUrl"
              class="w-100 audio" style="border-radius: 0; background: rgb(13, 182, 145);">
              Your browser does not support the audio element.
            </audio>
            <p v-else>No audio available for this podcast.</p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav aria-label="Podcast pagination " class="mt-4 mb-4">
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

    <div v-else-if="!loading" class="text-center">No podcasts found</div>
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
      return pageNumbers.slice(0, 8);
    },
    paginatedPodcasts() {
      const start = (this.currentPage - 1) * this.podcastsPerPage;
      const end = start + this.podcastsPerPage;
      return this.filteredPodcasts.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page === '...') return; // Ignore click on ellipsis
      this.currentPage = page;
    },
    shareOnWhatsApp(podcast) {
      const message = `${podcast.title}\nListen here: ${podcast.audioUrl}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");

    },
    onSearch() {
      // Normalise the search query for comparison
      const query = this.searchQuery.toLowerCase();

      // Dynamically filter podcasts based on the search query
      this.filteredPodcasts = this.podcasts.filter((podcast) =>
        podcast.title.toLowerCase().includes(query)
      );

      // Example: Log the search query (could also trigger analytics events)
      console.log("User searched for:", this.searchQuery);

      // Example: Additional dynamic action
      if (this.filteredPodcasts.length === 0) {
        console.log("No podcasts found for the search term.");
      } else {
        console.log(`${this.filteredPodcasts.length} podcast(s) found.`);
      }
    },
    highlightText(title) {
      if (!this.searchQuery) {
        return title; // Return the original title if no search query
      }
      const query = this.searchQuery;
      const regex = new RegExp(`(${query})`, "gi"); // Case-insensitive match
      return title.replace(regex, `<span style="background-color: rgba(0, 191, 166, 0.6); padding: 4px; border-radius: 5px;">$1</span>`);
    },
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

    },
    removeFavourite(podcast) {
      this.favourites = this.favourites.filter(item => item.title !== podcast.title);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    },
    goToPodcast(podcast) {
      window.location.href = podcast.audioUrl;
    },
    changePage(page) {
      this.currentPage = page;
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
  background: rgb(13, 182, 145)
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
