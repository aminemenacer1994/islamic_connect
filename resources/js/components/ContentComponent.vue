<template>
  <div class="container mt-4">
    <h1 class="display-5 fw-bold text-center mb-4">Islamic Podcasts</h1>

    <!-- Main description (non-bold) -->
    <p class="text-center container mb-4">Discover and explore the latest Islamic podcasts, covering a range of topics from Islamic teachings to contemporary issues. Whether you are looking to deepen your understanding of the Quran, learn more about Seerah, or stay updated on Islamic affairs, you'll find a podcast that suits your interests.</p>

    <!-- Filter Section -->
    <div  class="row container mb-4">
      <!-- Topic Filter -->
      <div class="col-md-3" style="padding: 5px;">
        <select v-model="filters.topic" class="form-select" @change="applyFilters">
          <option value="">All Topics</option>
          <option value="Islamic">Islamic</option>
          <option value="Education">Education</option>
          <option value="History">History</option>
          <option value="Fiqh">Fiqh</option>
          <option value="Seerah">Seerah</option>
          <option value="Aqeedah">Aqeedah</option>
          <option value="Current Affairs">Current Affairs</option>
          <option value="Islamic Law">Islamic Law</option>
          <!-- Add more topics here -->
        </select>
      </div>

      <!-- Date Filter -->
      <div class="col-md-3" style="padding: 5px;">
        <select v-model="filters.dateRange" class="form-select" @change="applyFilters">
          <option value="">All Time</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <!-- Time Filter -->
      <div class="col-md-3" style="padding: 5px;">
        <select v-model="filters.time" class="form-select" @change="applyFilters">
          <option value="">All Time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      <!-- Search Filter -->
      <div class="col-md-3" style="padding: 5px;">
        <input v-model="filters.search" type="text" class="form-control" placeholder="Search podcasts..." @input="applyFilters">
      </div>
    </div>

    <!-- Pagination and Grid for podcast items -->
    <div v-if="loading" class="text-center">Loading podcasts...</div>

    <div v-if="!loading && podcasts.length">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">
        <!-- Display podcasts in a responsive grid -->
        <div v-for="podcast in paginatedPodcasts" :key="podcast.title" class="col">
          <div class="card h-100">
            <div class="card-body">
              <!-- Podcast Title -->
              <h5 class="card-title fw-bold">{{ podcast.title }}</h5>

              <!-- Podcast Description -->
              <p class="card-text">{{ podcast.description }}</p>

              <!-- Audio Player -->
              <audio :controls="true" :src="podcast.audioUrl" v-if="podcast.audioUrl" class="w-100 audio">
                Your browser does not support the audio element.
              </audio>
              <p v-else>No audio available for this podcast.</p>

              <!-- Publication Date -->
              <p class="text-muted">Published on: {{ formatDate(podcast.pubDate) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination controls -->
      <div class="d-flex justify-content-center mt-4">
        <ul class="pagination justify-content-center">
          <!-- Previous Button -->
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
          </li>

          <!-- Pagination Buttons -->
          <li v-for="page in pages" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>

          <!-- Next Button -->
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
          </li>

          <!-- Last Button -->
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="changePage(totalPages)" :disabled="currentPage === totalPages">End</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- No podcasts found message -->
    <div v-if="!loading && !filteredPodcasts.length" class="text-center">No podcasts found</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      podcasts: [],
      filteredPodcasts: [],
      loading: true,
      rssUrl: 'https://themadmamluks.libsyn.com/rss', // Example RSS feed URL
      currentPage: 1,
      podcastsPerPage: 10,
      filters: {
        topic: '',
        dateRange: '',
        time: '',
        search: '',
      },
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
      return pageNumbers.slice(0, 5); // Show only 5 pagination buttons
    },
    paginatedPodcasts() {
      const start = (this.currentPage - 1) * this.podcastsPerPage;
      const end = start + this.podcastsPerPage;
      return this.filteredPodcasts.slice(start, end);
    },
  },
  methods: {
    // Method to remove HTML tags from a string
    removeHtmlTags(inputString) {
      return inputString.replace(/<\/?[^>]+(>|$)/g, "");
    },

    // Method to clean up the description by removing unwanted URLs, hashtags, and specific text
    cleanDescription(description) {
      // Remove URLs (https://, http://)
      description = description.replace(/https?:\/\/[^\s]+/g, "");

      // Remove hashtags (#)
      description = description.replace(/#\w+/g, "");

      // Define donation-related patterns and social media links to remove
      const donationPatterns = [
        /donate[\s\S]*?(?:on|here|to)[\s\S]*?/gi,   // 'donate' followed by donation request
        /support[\s\S]*?(?:us|on)[\s\S]*?/gi,        // 'support' followed by support request
        /patreon[\s\S]*?(?:here|on)[\s\S]*?/gi,      // 'patreon' followed by support request
        /paypal[\s\S]*?(?:here|on)[\s\S]*?/gi,       // 'paypal' followed by donation request
        /gofund[^\w]*?[\w\s]+/gi,                    // 'gofund' followed by text
        /buy\s*(?:us|our)\s*[\w\s]+/gi,              // 'buy' followed by support request
        /(?:Follow\s+|Visit\s+)?\s*(?:our\s+)?(?:social\s+)?(?:media\s+)?(?:on\s+)?\S+/gi, // Generic social media
      ];

      // Apply all donation-related patterns to the description
      donationPatterns.forEach(pattern => {
        description = description.replace(pattern, "");
      });

      return description.trim(); // Trim leading/trailing spaces
    },

    // Function to apply the selected filters
    applyFilters() {
      let filtered = this.podcasts;

      // Filter by Topic
      if (this.filters.topic) {
        filtered = filtered.filter(podcast => podcast.title.includes(this.filters.topic));
      }

      // Filter by Date Range (Daily, Weekly, Monthly, Yearly)
      if (this.filters.dateRange) {
        const currentDate = new Date();
        filtered = filtered.filter(podcast => {
          const pubDate = new Date(podcast.pubDate);
          const timeDifference = currentDate - pubDate;
          switch (this.filters.dateRange) {
            case 'daily':
              return timeDifference <= 86400000; // 24 hours
            case 'weekly':
              return timeDifference <= 604800000; // 7 days
            case 'monthly':
              return timeDifference <= 2592000000; // 30 days
            case 'yearly':
              return timeDifference <= 31536000000; // 365 days
            default:
              return true;
          }
        });
      }

      // Filter by Time (Morning, Afternoon, Evening)
      if (this.filters.time) {
        filtered = filtered.filter(podcast => {
          const hours = new Date(podcast.pubDate).getHours();
          switch (this.filters.time) {
            case 'morning':
              return hours >= 5 && hours < 12;
            case 'afternoon':
              return hours >= 12 && hours < 18;
            case 'evening':
              return hours >= 18 && hours < 22;
            default:
              return true;
          }
        });
      }

      // Search Filter (Title and Description)
      if (this.filters.search) {
        filtered = filtered.filter(podcast =>
          podcast.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          podcast.description.toLowerCase().includes(this.filters.search.toLowerCase())
        );
      }

      // Set the filtered podcasts
      this.filteredPodcasts = filtered;
      this.currentPage = 1; // Reset to the first page when filters change
    },

    // Change the page
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    // Fetch and parse the RSS feed
    fetchPodcasts() {
      this.loading = true;
      fetch(this.rssUrl)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, "application/xml");
          const items = xmlDoc.querySelectorAll("item");

          // Extract and clean podcast data
          this.podcasts = Array.from(items).map(item => {
            return {
              title: this.removeHtmlTags(item.querySelector("title").textContent),
              description: this.cleanDescription(item.querySelector("description").textContent),
              audioUrl: item.querySelector("enclosure") ? item.querySelector("enclosure").getAttribute("url") : '',
              pubDate: item.querySelector("pubDate").textContent,
            };
          });

          // Apply filters after fetching data
          this.applyFilters();
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching RSS feed:', error);
          this.loading = false;
        });
    },

    // Format date into a more readable form
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  },

  created() {
    this.fetchPodcasts();
  },
};
</script>

<style scoped>

.audio{
  .hide-unwanted-elements .dropdown,
  .hide-unwanted-elements .custom-icon-increase,
  .hide-unwanted-elements .custom-icon-decrease,
  .hide-unwanted-elements .settings,
  .hide-unwanted-elements .custom-icon-play,
  .hide-unwanted-elements .summary,
  .hide-unwanted-elements .count {
    display: none !important;
  }

  .custom-switch {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 20px;
    border-radius: 50px;
    background-color: rgba(0, 191, 166); /* Green background by default */
    transition: background-color 0.3s ease; /* Smooth transition for background */
  }

  .custom-prev-ayah:hover,
  .custom-last-verse:hover {
    color: black; /* Default color */
    transition: color 0.3s ease; /* Smooth transition */
  }

  .custom-audio::-webkit-media-controls-play-button,
  .custom-audio::-webkit-media-controls-mute-button,
  .custom-audio::-webkit-media-controls-seek-back-button,
  .custom-audio::-webkit-media-controls-seek-forward-button,
  .custom-audio::-webkit-media-controls-fullscreen-button,
  .custom-audio::-webkit-media-controls-rewind-button,
  .custom-audio::-webkit-media-controls-return-to-realtime-button,
  .custom-audio::-webkit-media-controls-toggle-closed-captions-button {
    color: white !important;
  }

  .custom-audio::-webkit-media-controls-timeline-container {
    background-color: #ebebeb !important;
  }

  .custom-audio::-webkit-media-controls-current-time-display,
  .custom-audio::-webkit-media-controls-time-remaining-display {
    color: rgb(0, 0, 0) !important;
  }

  .custom-audio::-webkit-media-controls-timeline {
    background-color: #00574a !important;
  }

  .custom-audio::-webkit-media-controls-volume-slider-container {
    background-color: #ffffff !important;
  }

  .custom-audio::-webkit-media-controls-volume-slider {
    background-color: #008c7a !important;
  }
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
