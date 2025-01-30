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

    <!-- Topics Filter -->
    <div class="col-md-3 mb-3">
      <select class="form-select" v-model="selectedTopic" @change="fetchPodcasts">
        <option value="">Select a Topic</option>
        <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
      </select>
    </div>

    <!-- Sort Filter -->
    <div class="col-md-3 mb-3">
      <select class="form-select" v-model="sortBy" @change="sortPodcasts">
        <option value="most-viewed">Most Viewed</option>
        <option value="least-viewed">Least Viewed</option>
      </select>
    </div>

    <!-- Duration Filter -->
    <div class="col-md-3 mb-3">
      <select class="form-select" v-model="durationFilter" @change="fetchPodcasts">
        <option value="longest">Longest</option>
        <option value="shortest">Shortest</option>
        <option value="range">Duration Range</option>
      </select>
    </div>

    <!-- Date Filter -->
    <div class="col-md-3 mb-3">
      <select class="form-select" v-model="selectedDateFilter" @change="filterByDate">
        <option value="">Select a Date Filter</option>
        <option value="yearly">This Year</option>
        <option value="monthly">This Month</option>
        <option value="weekly">This Week</option>
        <option value="daily">Today</option>
      </select>
    </div>

    <!-- Select Date Filter -->
    <div class="row">
      <!-- Dynamic Yearly Filter -->
      <div v-if="selectedDateFilter === 'yearly'" class="col-md-3 mb-3">
        <select class="form-select" v-model="selectedYear" @change="filterByDate">
          <option value="" disabled>Select Year</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>

      <!-- Dynamic Monthly Filter -->
      <div v-if="selectedDateFilter === 'monthly'" class="col-md-3 mb-3">
        <select class="form-select" v-model="selectedMonth" @change="filterByDate">
          <option value="" disabled>Select Month</option>
          <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
        </select>
      </div>

      <!-- Dynamic Weekly Filter -->
      <div v-if="selectedDateFilter === 'weekly'" class="col-md-3 mb-3">
        <select class="form-select" v-model="selectedWeek" @change="filterByDate">
          <option value="" disabled>Select Week</option>
          <option v-for="week in weeks" :key="week" :value="week">{{ week }}</option>
        </select>
      </div>

      <!-- Dynamic Daily Filter -->
      <div v-if="selectedDateFilter === 'daily'" class="col-md-3 mb-3">
        <select class="form-select" v-model="selectedDay" @change="filterByDate">
          <option value="" disabled>Select Day</option>
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
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
      selectedYear: null,
      selectedMonth: null,
      selectedWeek: null,
      selectedDay: null,
      years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weeks: ['1-7 days', '8-14 days', '15-21 days', '22-31 days'],
      days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      selectedDateFilter: 'yearly',
      currentDate: new Date(),
      sortBy: 'most-viewed',
      topics: [],
      selectedTopic: '',
      selectedPodcast: "",
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
      rssUrl: 'https://themadmamluks.libsyn.com/rss',
      searchQuery: '',
      currentPage: 1,
      podcastsPerPage: 12,
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
      sortOption: 'mostViewed',
      dateFilter: 'weekly',
      topicFilter: '',
      durationFilter: 'longest',
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
    filteredPodcasts() {
      // Filter out podcasts with the specific phrase in the description
      return this.islamicPodcasts.filter(podcast =>
        !podcast.description.includes("No audio available for this podcast.")
      );
    }
  },

  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', options); // Using 'en-GB' for British date format
    },
    async fetchPodcasts() {
      if (!this.selectedPodcast) return;

      this.loading = true;
      this.rssUrl = this.selectedPodcast.rssUrl;

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
          duration: Math.floor(Math.random() * 60) + 5,
          topic: 'Islamic',
        }));

        this.filteredPodcasts = [...this.podcasts];
        this.applyFilters();
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        this.loading = false;
      }
    },

    fetchTopics() {
      this.topics = this.islamicPodcasts.map(podcast => podcast.topic).filter((value, index, self) => self.indexOf(value) === index);
    },

    applyFilters() {
      let filtered = [...this.podcasts]; // Start with the full podcast list

      // Apply topic filter
      if (this.selectedTopic) {
        filtered = filtered.filter(podcast => podcast.topic === this.selectedTopic);
      }

      // Apply date filter
      if (this.selectedDateFilter) {
        filtered = this.applyDateFilter(filtered);
      }

      // Apply duration filter
      if (this.durationFilter) {
        filtered = this.applyDurationFilter(filtered);
      }

      // Apply sorting
      if (this.sortOption) {
        filtered = this.applySorting(filtered);
      }

      this.filteredPodcasts = filtered; // Update filtered podcasts
    },

    applyDateFilter(filtered) {
      const currentDate = new Date();

      if (this.selectedDateFilter === 'yearly' && this.selectedYear) {
        return filtered.filter(podcast => new Date(podcast.pubDate).getFullYear() === this.selectedYear);
      } else if (this.selectedDateFilter === 'monthly' && this.selectedMonth) {
        const monthIndex = this.months.indexOf(this.selectedMonth);
        return filtered.filter(podcast => new Date(podcast.pubDate).getMonth() === monthIndex);
      } else if (this.selectedDateFilter === 'weekly' && this.selectedWeek) {
        // Handle weekly logic here if applicable
        return filtered; // Update with weekly logic
      } else if (this.selectedDateFilter === 'daily' && this.selectedDay) {
        return filtered.filter(podcast => new Date(podcast.pubDate).getDate() === parseInt(this.selectedDay));
      }
      return filtered; // Return unmodified if no valid filter
    },

    applyDurationFilter(filtered) {
      if (this.durationFilter === 'longest') {
        return filtered.sort((a, b) => b.duration - a.duration);
      } else if (this.durationFilter === 'shortest') {
        return filtered.sort((a, b) => a.duration - b.duration);
      }
      return filtered; // Return unmodified if no duration filter
    },

    applySorting(filtered) {
      if (this.sortOption === 'mostViewed') {
        return filtered.sort((a, b) => b.views - a.views);
      } else if (this.sortOption === 'leastViewed') {
        return filtered.sort((a, b) => a.views - b.views);
      }
      return filtered; // Return unmodified if no sorting
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

    changePage(page) {
      if (page !== '...') this.currentPage = page;
    },
  },

  mounted() {
    this.fetchPodcasts().then(() => {
      this.applyFilters(); // Apply filters once podcasts are loaded
    });
  },

  created() {
    this.fetchTopics();
  },

  watch: {
    searchQuery: "onSearch",
    selectedTopic: 'applyFilters',
    selectedYear: 'applyFilters',
    selectedMonth: 'applyFilters',
    selectedWeek: 'applyFilters',
    selectedDay: 'applyFilters',
    sortOption: 'applyFilters',
    durationFilter: 'applyFilters',
    dateFilter: 'applyFilters',
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
