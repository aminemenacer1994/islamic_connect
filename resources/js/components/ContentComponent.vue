<template>
  <div class="container mt-4">
    <h1 class="display-5 fw-bold text-center mb-4">Islamic Podcasts</h1>
    <p class="text-center container mb-4">
      Explore and discover the latest Islamic podcasts, featuring insightful discussions, inspiring content, and topics
      to deepen your understanding and connection with Islam.
    </p>


    <!-- Bookmarks Section -->
    <div v-if="bookmarks.length || favourites.length" class="mb-4">
      <!-- <h3 class="display-6 pb-2 fw-bold fs-4 fs-md-3 fs-lg-2">
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
      </div> -->

      <!-- Favourites -->
      <!-- <h3 class="display-6 fw-bold fs-4 fs-md-3 fs-lg-2 mt-4">
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
      </div> -->


    </div>

    

    <!-- Search Bar -->
    <div class="row">
      <div class="col-md-6">
        <select class="form-select " id="podcastDropdown" v-model="selectedPodcast" @change="fetchPodcasts">
          <option disabled value="">Select a podcast</option>
          <option v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" :value="podcast">
            {{ podcast.name }}
          </option>
        </select>
      </div>
      <div class="mb-3 col-md-6">
        <input type="search" class="form-control" placeholder="Search podcasts..." v-model="searchQuery"
          @input="onSearch" />
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="row mb-3">
      <div class="col-md-3">
        <select class="form-select" v-model="selectedPodcast" @change="fetchPodcasts">
          <option disabled value="">Select a podcast</option>
          <option v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" :value="podcast">
            {{ podcast.name }}
          </option>
        </select>
      </div>
      <div class="col-md-3">
        <input type="search" class="form-control" placeholder="Search podcasts..." v-model="searchQuery" @input="onSearch" />
      </div>
      <div class="col-md-2">
        <select class="form-select" v-model="selectedDateFilter" @change="applyFilters">
          <option value="">Filter by Date</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" v-model="selectedDuration" @change="applyFilters">
          <option value="">Filter by Duration</option>
          <option value="short">Short (&lt; 10 min)</option>
          <option value="medium">Medium (10-30 min)</option>
          <option value="long">Long (&gt; 30 min)</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" v-model="selectedSort" @change="applyFilters">
          <option value="">Sort by</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="leastViewed">Least Viewed</option>
        </select>
      </div>
    </div>


    <!-- Podcast Cards -->
    <div v-if="!loading && paginatedPodcasts.length">
      <div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-4 mb-2">
        <div v-for="podcast in paginatedPodcasts" :key="podcast.title" class="col">
          <div class="card h-100"
            style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <div class="card-body">
              <h4 class="card-title display-5 fw-bold" v-html="highlightText(podcast.title)"></h4>
              <p class="text-muted">Views: {{ podcast.views }}</p>
              <p class="text-muted">Published on: {{ formatDate(podcast.pubDate) }}</p>
              <div class="container text-center d-flex justify-content-between" style="bottom: 0;">
                <i :class="isBookmarked(podcast) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"
                  @click="toggleBookmark(podcast)" style="cursor: pointer; font-size: 1.5rem;"></i>
                <i :class="isFavourite(podcast) ? 'bi bi-heart-fill' : 'bi bi-heart'" @click="toggleFavourite(podcast)"
                  style="cursor: pointer; font-size: 1.5rem;"></i>
                <i class="bi bi-share" style="cursor: pointer; font-size: 1.5rem;"
                  @click="shareOnWhatsApp(podcast)"></i>
                <i class="bi bi-download" style="cursor: pointer; font-size: 1.5rem;"
                  @click="downloadAudio(podcast.audioUrl, podcast.title)"></i>
              </div>
            </div>
            <audio ref="audioPlayer" :controls="true" :src="podcast.audioUrl" v-if="podcast.audioUrl"
              class="w-100 audio" style="border-radius: 0; background: rgb(13, 182, 145);">
              Your browser does not support the audio element.
            </audio>
            <p v-else>No audio available for this podcast.</p>
          </div>
        </div>
        <!-- Spinner Outside Cards -->
        <div v-if="isDownloading" class="spinner-container">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Downloading...</span>
          </div>
        </div>
      </div>

      <nav aria-label="Podcast pagination" class="mt-4 mb-4">
        <ul class="pagination justify-content-center flex-nowrap">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li v-for="page in pages" :key="page" class="page-item" :class="{ 'active': currentPage === page }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
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
      selectedPodcast: "", // Initially empty
      islamicPodcasts: [
        { name: 'The Mad Mamluks', rssUrl: 'https://themadmamluks.libsyn.com/rss' },
        { name: 'The Deen Show', rssUrl: 'https://thedeenshow.com/feed/podcast/' },
        { name: 'SeekersGuidance', rssUrl: 'https://seekersguidance.org/feed/podcast/' }
      ],
      isDownloading: false,
      showToast: false,
      toastType: '',
      podcasts: [],
      filteredPodcasts: [],
      loading: true,
      rssUrl: '',
      searchQuery: '',
      currentPage: 1,
      podcastsPerPage: 12,
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
      selectedDateFilter: "",
      selectedDuration: "",
      selectedSort: "",
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.filteredPodcasts.length / this.podcastsPerPage);
    },
    pages() {
      return Array.from({ length: Math.min(this.totalPages, 8) }, (_, i) => i + 1);
    },
    paginatedPodcasts() {
      const start = (this.currentPage - 1) * this.podcastsPerPage;
      return this.filteredPodcasts.slice(start, start + this.podcastsPerPage);
    },
  },

  methods: {
    async downloadAudio(url, title) {
      this.isDownloading = true;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to download the audio file.");

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${title.replace(/[^\w\s\-]/g, "").replace(/\s+/g, "_") || "audio"}.mp3`;
        link.click();

        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading the file:", error);
        alert("An error occurred while downloading the audio.");
      } finally {
        this.isDownloading = false;
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    },

    async fetchPodcasts() {
      if (!this.selectedPodcast) return;

      this.loading = true;
      this.rssUrl = this.selectedPodcast.rssUrl; // Update the RSS URL

      try {
        const response = await fetch(this.rssUrl);
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');

        this.podcasts = Array.from(items).map(item => ({
          title: item.getElementsByTagName('title')[0]?.textContent || 'No title',
          pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || 'Unknown',
          description: item.getElementsByTagName('description')[0]?.textContent || 'No description available.',
          audioUrl: item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || '',
          views: Math.floor(Math.random() * 1000),
          duration: Math.floor(Math.random() * 3600), // Simulating duration in seconds (for filtering)
        }));

        this.filteredPodcasts = [...this.podcasts];
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        this.loading = false;
        this.applyFilters();
      }
    },

    applyFilters() {
      let filtered = [...this.podcasts];

      // Filter by Date
      if (this.selectedDateFilter) {
        const now = new Date();
        filtered = filtered.filter(podcast => {
          const pubDate = new Date(podcast.pubDate);
          if (this.selectedDateFilter === "weekly") {
            return (now - pubDate) / (1000 * 60 * 60 * 24) <= 7;
          } else if (this.selectedDateFilter === "monthly") {
            return (now - pubDate) / (1000 * 60 * 60 * 24) <= 30;
          } else if (this.selectedDateFilter === "yearly") {
            return (now - pubDate) / (1000 * 60 * 60 * 24) <= 365;
          }
          return true;
        });
      }

      // Filter by Duration
      if (this.selectedDuration) {
        filtered = filtered.filter(podcast => {
          const duration = podcast.duration || 0;
          if (this.selectedDuration === "short") return duration < 600;
          if (this.selectedDuration === "medium") return duration >= 600 && duration <= 1800;
          if (this.selectedDuration === "long") return duration > 1800;
          return true;
        });
      }

      // Sort by Views
      if (this.selectedSort) {
        filtered.sort((a, b) => {
          if (this.selectedSort === "mostViewed") return b.views - a.views;
          if (this.selectedSort === "leastViewed") return a.views - b.views;
          return 0;
        });
      }

      this.filteredPodcasts = filtered;
      this.currentPage = 1; // Reset pagination
    },

    onSearch() {
      this.currentPage = 1;
      const query = this.searchQuery.toLowerCase();
      this.filteredPodcasts = this.podcasts.filter(podcast => podcast.title.toLowerCase().includes(query));
    },

    highlightText(title) {
      if (!this.searchQuery) return title;
      return title.replace(
        new RegExp(`(${this.searchQuery})`, "gi"),
        `<span style="background-color: rgba(0, 191, 166, 0.6); padding: 4px; border-radius: 5px;">$1</span>`
      );
    },

    toggleBookmark(podcast) {
      const index = this.bookmarks.findIndex(item => item.title === podcast.title);
      if (index > -1) this.bookmarks.splice(index, 1);
      else this.bookmarks.push(podcast);
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    },

    toggleFavourite(podcast) {
      const index = this.favourites.findIndex(item => item.title === podcast.title);
      if (index > -1) this.favourites.splice(index, 1);
      else this.favourites.push(podcast);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    },

    isBookmarked(podcast) {
      return this.bookmarks.some(bookmark => bookmark.title === podcast.title);
    },

    isFavourite(podcast) {
      return this.favourites.some(fav => fav.title === podcast.title);
    },

    shareOnWhatsApp(podcast) {
      const message = `${podcast.title}\nListen here: ${podcast.audioUrl}`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, "_blank");
    },

    changePage(page) {
      if (page !== '...') this.currentPage = page;
    },
  },

  mounted() {
    this.fetchPodcasts();
  },

  watch: {
    searchQuery: "onSearch",
    selectedDateFilter: "applyFilters",
    selectedDuration: "applyFilters",
    selectedSort: "applyFilters",
  }
};
</script>



<style scoped>
@media (max-width: 576px) {
  .pagination {
    /* display: flex; */
    flex-wrap: nowrap;
    /* Prevent wrapping */
    justify-content: center;
    /* Centre the pagination */
  }
}

.spinner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
}

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
    /* display: block; */
    text-align: center;
  }
}
</style>
