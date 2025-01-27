<template>
  <div class="container mt-4">
    <h1 class="display-5 fw-bold text-center mb-4">Islamic Podcasts</h1>
    <p class="text-center container mb-4">Explore and discover the latest Islamic podcasts, featuring insightful discussions, inspiring content, and topics to deepen your understanding and connection with Islam.</p>


    <div v-if="!loading && podcasts.length">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4 mb-4">
        <div v-for="podcast in paginatedPodcasts" :key="podcast.title" class="col">
          <div class="card h-100 " style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
            <div class="card-body" style="border: 2px solid rgb(13, 182, 145); ">
              <h5 class="card-title fw-bold">{{ podcast.title }}</h5>

              
              <p class="text-muted">Views: {{ podcast.views }}</p>
              <p class="text-muted">Published on: {{ formatDate(podcast.pubDate) }}</p>

              <div class="container text-center d-flex justify-content-between">
                <!-- Bookmark Icon -->
                <i 
                  :class="isBookmarked(podcast) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'" 
                  @click="toggleBookmark(podcast)" 
                  style="cursor: pointer; font-size: 1.5rem;"
                ></i>
                <!-- Favourite Icon -->
                <i 
                  :class="isFavourite(podcast) ? 'bi bi-heart-fill' : 'bi bi-heart'" 
                  @click="toggleFavourite(podcast)" 
                  style="cursor: pointer; font-size: 1.5rem;"
                ></i>
                <!-- share Icon -->
                <i 
                  class="bi bi-share"        
                  style="cursor: pointer; font-size: 1.5rem;"
                ></i>
              </div>
            </div>

            <!-- Audio Player -->
            <audio
              ref="audioPlayer"
              :controls="true"
              :src="podcast.audioUrl"
              v-if="podcast.audioUrl"
              class="w-100 audio"
              @timeupdate="updateTimeLeft(podcast)"
              style="border-radius: 0;background:rgb(13, 182, 145);"
            >
              Your browser does not support the audio element.
            </audio>
            <p v-else>No audio available for this podcast.</p>

            <!-- Display Time Left -->
            <div v-if="currentTimeLeft[podcast.title] !== undefined" class="time-left">
              Time left: {{ currentTimeLeft[podcast.title] }} seconds
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav aria-label="Podcast pagination mt-3">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{'disabled': currentPage === 1}">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li 
            v-for="page in pages" 
            :key="page" 
            class="page-item" 
            :class="{'active': currentPage === page}"
          >
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
      podcasts: [],
      filteredPodcasts: [],
      loading: true,
      rssUrl: 'https://themadmamluks.libsyn.com/rss',
      currentPage: 1,
      podcastsPerPage: 12,
      filters: {
        topic: '',
        dateRange: '',
        duration: '',
        search: '',
      },
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
      currentTimeLeft: {}, // Store the time left for each podcast
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
      return pageNumbers.slice(0, 5); // Show only the first 5 pages for simplicity
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
          duration: Math.floor(Math.random() * 60) + 15,
          summary: '',
          summaryLoading: true,
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

    // Update time left for the currently playing podcast
    updateTimeLeft(podcast) {
      const audioElement = this.$refs.audioPlayer;
      if (audioElement && podcast.audioUrl === audioElement.src) {
        const timeLeft = audioElement.duration - audioElement.currentTime;
        this.$set(this.currentTimeLeft, podcast.title, Math.ceil(timeLeft)); // Round to nearest second
        console.log(`Time left for ${podcast.title}: ${Math.ceil(timeLeft)} seconds`);
      }
    },

    applyFilters() {
      let filtered = this.podcasts;

      if (this.filters.topic) {
        filtered = filtered.filter(podcast => podcast.title.includes(this.filters.topic));
      }

      if (this.filters.search) {
        filtered = filtered.filter(podcast =>
          podcast.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          podcast.description.toLowerCase().includes(this.filters.search.toLowerCase())
        );
      }

      if (this.filters.dateRange) {
        const now = new Date();
        filtered = filtered.filter(podcast => {
          const pubDate = new Date(podcast.pubDate);
          if (this.filters.dateRange === 'last-week') {
            return now - pubDate <= 7 * 24 * 60 * 60 * 1000;
          }
          if (this.filters.dateRange === 'last-month') {
            return now - pubDate <= 30 * 24 * 60 * 60 * 1000;
          }
          if (this.filters.dateRange === 'last-year') {
            return now - pubDate <= 365 * 24 * 60 * 60 * 1000;
          }
          return true;
        });
      }

      if (this.filters.duration) {
        filtered = filtered.filter(podcast => podcast.duration <= this.filters.duration);
      }

      this.filteredPodcasts = filtered;
      this.currentPage = 1; // Reset to first page
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
.audio {
  border-radius: 0 !important;
}

audio::-webkit-media-controls-panel {
  background:rgb(13, 182, 145)
}

audio::-webkit-media-controls-current-time-display
audio::-webkit-media-controls-time-remaining-display
audio::-webkit-media-controls-timeline
audio::-webkit-media-controls-volume-slider-container
audio::-webkit-media-controls-volume-slider
audio::-webkit-media-controls-seek-back-button
audio::-webkit-media-controls-seek-forward-button
audio::-webkit-media-controls-fullscreen-button
audio::-webkit-media-controls-rewind-button
audio::-webkit-media-controls-return-to-realtime-button
audio::-webkit-media-controls-toggle-closed-captions-button

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
