<template>
  <div class="container mt-4">
    <h1 class="display-5 fw-bold text-center mb-4">Islamic Podcasts</h1>
    <p class="text-center container mb-4">
      Explore and discover the latest Islamic podcasts that offer a diverse range of insightful discussions,
      thought-provoking reflections, and inspiring content. These podcasts delve into a variety of topics that aim to
      deepen your understanding of Islam, from spiritual guidance and personal development to contemporary issues facing
      the Muslim community.
    </p>

    <!-- Bookmarks Section -->
    <!-- <div v-if="bookmarks.length || favourites.length" class="mb-4">
      <h4 class="display-6 pb-2 fw-bold fs-4 fs-md-3 fs-lg-2">
        Bookmark Podcasts
        <span class="badge bg-secondary ms-2">{{ bookmarks.length }}</span>
        <button class="btn btn-link btn-sm ms-3" type="button" data-bs-toggle="collapse"
          data-bs-target="#bookmarksCollapse" aria-expanded="false" aria-controls="bookmarksCollapse">
          <i class="bi bi-chevron-down"></i>
        </button>
      </h4>
      <div id="bookmarksCollapse" class="collapse">
        <div v-if="bookmarks.length" class="list-group">
          <div v-for="podcast in bookmarks" :key="podcast.title"
            class="list-group-item d-flex justify-content-between align-items-center row">
            <div class="col-12 col-md-6">
              <span class="fs-6">{{ podcast.title }}</span>
            </div>
            <div class="col-12 col-md-6 text-md-end">
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
    <!-- <h4 class="display-6 fw-bold fs-4 fs-md-3 fs-lg-2 mt-4">
        Favourite Podcasts
        <span class="badge bg-secondary ms-2">{{ favourites.length }}</span>
        <button class="btn btn-link btn-sm ms-3" type="button" data-bs-toggle="collapse"
          data-bs-target="#favouritesCollapse" aria-expanded="false" aria-controls="favouritesCollapse">
          <i class="bi bi-chevron-down"></i>
        </button>
      </h4>
      <div id="favouritesCollapse" class="collapse">
        <div v-if="favourites.length" class="list-group">
          <div v-for="podcast in favourites" :key="podcast.title"
            class="list-group-item d-flex justify-content-between align-items-center row">
            <div class="col-12 col-md-6">
              <span class="fs-6">{{ podcast.title }}</span>
            </div>
            <div class="col-12 col-md-6 text-md-end">
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
    <!-- </div> -->


    <!-- Search Bar -->
    <!-- <div class="row">
      <div class="col-md-6 pb-3 text-center">
        <p style="display: flex;">Select a podcast</p>
        <select class="form-select" id="podcastDropdown" v-model="selectedPodcast" @change="fetchPodcasts">
          <option disabled value="">Select a podcast</option>
          <option v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" :value="podcast">
            {{ podcast.name }}
          </option>
        </select>
      </div>
    </div> -->

    <div class="container text-center">
      <div class="row">
        <div class="col-md-2">
          <h5 class="pt-1" style="display: flex;"><b>Select a podcast:</b></h5>
        </div>
        <div class="col-md-5">
          <select class="form-select" id="podcastDropdown" v-model="selectedPodcast" @change="fetchPodcasts">
            <option disabled value="">Select a podcast</option>
            <option v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" :value="podcast">
              {{ podcast.name }}
            </option>
          </select>
        </div>
        <div class="col-md-3">
        </div>
      </div>
    </div>


    <div class="pb-3 pt-3" v-if="selectedPodcast">
      <p class="fw-bold display-5">{{ selectedPodcast.name }}</p>
      <div class="d-flex justify-content-between align-items-start">
        <p class="col-md-10 display-7">{{ selectedPodcast.desc }}</p>
        <img class="col-md-2" :src="selectedPodcast.image" :alt="selectedPodcast.name">
      </div>
    </div>


    <div class="row g-2 g-md-3">
      <div class="col-md-3 px-2 px-md-3" v-if="selectedPodcast">
        <select class="form-select" v-model="sortBy" @change="sortPodcasts">
          <option value="most-viewed">Most Viewed</option>
          <option value="least-viewed">Least Viewed</option>
        </select>
      </div>
      <div class="col-md-3 px-2 px-md-3" v-if="selectedPodcast">
        <select class="form-select" v-model="durationFilter" @change="filterPodcasts">
          <option value="">All Durations</option>
          <option value="longest">Longest</option>
          <option value="shortest">Shortest</option>
          <option value="0-10">0 - 10 min</option>
          <option value="10-30">10 - 30 min</option>
          <option value="30-60">30 - 60 min</option>
          <option value="more-than-60">More than 1 hour</option>
        </select>
      </div>
      <div class="col-md-6 px-2 px-md-3 mb-3" v-if="selectedPodcast">
        <input type="search" class="form-control" placeholder="Search podcasts..." v-model="searchQuery"
          @input="onSearch" />
      </div>
    </div>



    <!-- Podcast Cards -->
    <div v-if="!loading && paginatedPodcasts.length">
      <div v-if="!loading && paginatedPodcasts.length">
        <!-- Loading Spinner -->
        <div v-if="loading" class="text-center mt-4">
          <p class="mt-2 fw-bold">Loading podcasts, please wait...</p>
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-4 mb-2">
          <div v-for="(podcast, index) in paginatedPodcasts" :key="podcast.title" class="col">
            <div :class="['card h-100', { highlighted: highlightedIndex === index }]"
              style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
              <div class="card-body pb-2">
                <h4 class="card-title display-5 fw-bold" v-html="highlightText(podcast.title)"></h4><br /><br />
                Views: {{ podcast.views }}<br />
                Duration: {{ podcast.duration ? podcast.duration + ' min' : 'Loading...' }}<br />
                Published on: {{ formatDate(podcast.pubDate) }}

                <div class="container pt-3 text-center d-flex justify-content-between">
                  <i class="bi bi-skip-backward-circle" style="cursor: pointer; font-size: 1.5rem;"
                    @click="rewindAudio(index)"></i>
                  <i class="bi bi-share" style="cursor: pointer; font-size: 1.5rem;"
                    @click="shareOnWhatsApp(podcast)"></i>
                  <i class="bi bi-download" style="cursor: pointer; font-size: 1.5rem;"
                    @click="downloadAudio(podcast)"></i>
                  <i class="bi bi-skip-forward-circle" style="cursor: pointer; font-size: 1.5rem;"
                    @click="fastForwardAudio(index)"></i>
                </div>
              </div>

              <!-- Audio Player -->
              <audio ref="audioPlayer" :controls="true" :src="podcast.audioUrl" v-if="podcast.audioUrl"
                class="w-100 audio" style="border-radius: 0; background: rgb(13, 182, 145);" @play="playAudio(index)"
                @loadedmetadata="updateDuration(podcast, $event)">
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>

      </div>

      <!-- No Podcasts Found Message -->
      <div v-else-if="!loading" class="text-center">No podcasts found</div>


      <nav aria-label="Podcast pagination" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"
              style="background-color: rgb(13, 182, 145); color: white; border-color: rgb(13, 182, 145);">
              Previous
            </a>
          </li>
          <li v-for="page in pages" :key="page" class="page-item" :class="{ 'active': currentPage === page }">
            <a class="page-link" href="#" @click.prevent="changePage(page)" :style="currentPage === page ? 'background-color: white; color: rgb(13, 182, 145); border-color: rgb(13, 182, 145);'
              : 'background-color: rgb(13, 182, 145); color: white; border-color: rgb(13, 182, 145);'">
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

    <div v-else-if="!loading" class="text-center">No podcasts found</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      highlightedIndex: null, // Track the highlighted card index
      loading: false,
      currentlyPlaying: null,
      podcastMeta: new Map(),
      ddurationFilter: "",
      selectedYear: "",
      selectedMonth: "",
      selectedWeek: "",
      selectedDay: "",
      years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weeks: ['1-7 days', '8-14 days', '15-21 days', '22-31 days'],
      days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      selectedDateFilter: 'Select a Date filter',
      currentDate: new Date(),
      sortBy: 'most-viewed',
      selectedDateFilter: 'select date filter',
      selectedPodcast: "",
      islamicPodcasts: [
        {
          name: "The Mad Mamluks",
          rssUrl: "https://themadmamluks.libsyn.com/rss",
          desc: `The Mad Mamluks is a podcast that delves into contemporary issues, politics, theology, and culture from a Muslim perspective. Hosted by a group of Muslim men, the show features in-depth discussions with scholars, activists, and community leaders.  
            The topics range from faith, Islamic history, and jurisprudence to social justice, current affairs, and political challenges faced by Muslims today.  

            With a mix of humor, critical thinking, and candid conversations, The Mad Mamluks offers a platform for diverse voices within the Muslim community, addressing issues that are often overlooked in mainstream media.`,
          image: "./images/mad_mamluk.jpg",
        },

        {
          name: "The Deen Show",
          rssUrl: "https://thedeenshow.com/feed/podcast/",
          desc: `The Deen Show is an American Islamic talk show hosted by Eddie, a convert to Islam, who engages with scholars, experts, and influential speakers to educate both Muslims and non-Muslims about Islam.  
            With a focus on dawah (Islamic outreach), Eddie explores fundamental beliefs, misconceptions about Islam, and the lives of prominent Muslim figures.  

            The show aims to provide clear, authentic knowledge about Islam, tackling topics such as spirituality, faith, science, relationships, and contemporary issues affecting the Muslim community worldwide.`,
          image: "./images/deen_show.png",
        },

        {
          name: "SeekersGuidance",
          rssUrl: "https://seekersguidance.org/feed/podcast/",
          desc: `SeekersGuidance is a global Islamic educational platform dedicated to providing high-quality, accessible, and free Islamic knowledge to students worldwide.  
            Founded by Shaykh Faraz Rabbani, it offers structured online courses, scholarly guidance, and spiritual mentorship.  

            The podcast covers various aspects of Islam, including theology, Quranic exegesis, hadith studies, Islamic law, spirituality, and contemporary challenges.  

            With a strong emphasis on authentic traditional scholarship, SeekersGuidance aims to empower individuals with the knowledge they need to lead a life rooted in faith, ethics, and service to humanity.`,
          image: "./images/seekers_guidance.png",
        },

      ],
      selectedPodcast: "", // Stores the selected podcast object
      isDownloading: false,
      showToast: false,
      toastType: '',
      podcasts: [],
      filteredPodcasts: [],
      loading: true,
      rssUrl: 'https://themadmamluks.libsyn.com/rss',
      searchQuery: '',
      currentPage: 1,
      podcastsPerPage: 9,
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
      sortOption: 'mostViewed',
      dateFilter: 'weekly',
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
    },
    sortedPodcasts() {
      return this.applySorting([...this.filteredPodcasts]);
    }
  },

  methods: {
    // Rewind 15 seconds
    rewindAudio(index) {
      const audio = this.$refs.audioPlayer[index];
      if (audio) {
        audio.currentTime = Math.max(0, audio.currentTime - 15); // Ensure it doesn't go below 0
      }
    },

    // Fast forward 15 seconds
    fastForwardAudio(index) {
      const audio = this.$refs.audioPlayer[index];
      if (audio) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 15); // Ensure it doesn't exceed duration
      }
    },

    // Update podcast duration
    updateDuration(podcast, event) {
      if (event && event.target && event.target.duration) {
        podcast.duration = Math.floor(event.target.duration / 60); // Convert seconds to minutes
        this.applyFilters(); // Re-apply filters after durations are set
      }
    },
    shareOnWhatsApp(podcast) {
      if (!podcast || !podcast.audioUrl) {
        alert("Podcast information is missing!");
        return;
      }

      const text = `Listen to this Podcast:\n\n ${podcast.title}\n\n Listen here: ${podcast.audioUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    },

    downloadAudio(podcast) {
      const link = document.createElement('a');
      link.href = podcast.audioUrl;
      link.download = podcast.title + '.mp3';
      link.click();
    },
    // When a year is selected, reset other filters and update podcasts
    onYearSelect() {
      this.selectedMonth = "";
      this.selectedWeek = "";
      this.selectedDay = "";
      this.updatePodcasts();
    },

    // When a month is selected, reset week/day and update podcasts
    onMonthSelect() {
      this.selectedWeek = "";
      this.selectedDay = "";
      this.updatePodcasts();
    },

    // When a week is selected, reset day and update podcasts
    onWeekSelect() {
      this.selectedDay = "";
      this.updatePodcasts();
    },

    // Fetch and update podcasts when filters change
    updatePodcasts() {
      console.log("Updating podcasts...");
      console.log("Year:", this.selectedYear);
      console.log("Month:", this.selectedMonth);
      console.log("Week:", this.selectedWeek);
      console.log("Day:", this.selectedDay);

      // Fetch the updated podcast list based on selected filters
      this.fetchPodcasts();
    },

    fetchPodcasts() {
      let filter = {
        year: this.selectedYear,
        month: this.selectedMonth,
        week: this.selectedWeek,
        day: this.selectedDay
      };

      console.log("Fetching podcasts with filter:", filter);
      // TODO: Replace with actual API call
    },

    sortPodcasts() {
      this.filteredPodcasts = this.applySorting(this.filteredPodcasts);
    },
    filterPodcasts() {
      this.filteredPodcasts = this.applyDurationFilter([...this.podcasts]);
    },

    applySorting(filtered) {
      switch (this.sortBy) {
        case "most-viewed":
          return filtered.sort((a, b) => b.views - a.views);
        case "least-viewed":
          return filtered.sort((a, b) => a.views - b.views);
        default:
          return filtered;
      }
    },

    updatePodcasts() {
      console.log("Updating podcasts...");
      this.fetchPodcasts();
    },

    applyDateFilter(filtered) {
      const now = new Date();
      return filtered.filter(podcast => {
        const pubDate = new Date(podcast.pubDate);
        switch (this.selectedDateFilter) {
          case "yearly":
            return pubDate.getFullYear() === now.getFullYear();
          case "monthly":
            return pubDate.getFullYear() === now.getFullYear() && pubDate.getMonth() === now.getMonth();
          case "weekly":
            return now - pubDate <= 7 * 24 * 60 * 60 * 1000;
          case "daily":
            return now.toDateString() === pubDate.toDateString();
          default:
            return true;
        }
      });
    },

    updatePodcasts() {
      console.log("Updating podcasts...");
      console.log("Selected Year:", this.selectedYear);
      console.log("Selected Month:", this.selectedMonth);
      console.log("Selected Week:", this.selectedWeek);
      console.log("Selected Day:", this.selectedDay);

      // Fetch audio podcasts based on selected filters
      this.fetchPodcasts();
    },

    // Fetch podcasts from RSS feed
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

        // Simulate API call delay
        setTimeout(async () => {
          this.paginatedPodcasts = await getPodcastsFromAPI();
          this.loading = false;
        }, 2000); // Simulated delay for better UX

        // Map and filter podcasts
        this.podcasts = Array.from(items)
          .map(item => ({
            title: item.getElementsByTagName('title')[0]?.textContent || 'No title',
            pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || 'Unknown',
            description: item.getElementsByTagName('description')[0]?.textContent || 'No description available.',
            audioUrl: item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || null,
            views: Math.floor(Math.random() * 1000),
            duration: Math.floor(Math.random() * 60) + 5, // Simulated duration
            language: this.detectLanguage(item.getElementsByTagName('title')[0]?.textContent || '') // Detect language
          }))
          .filter(podcast => podcast.audioUrl) // Remove items without audio
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)); // Sort by pubDate (newest to oldest)

        this.applyFilters(); // Apply filters after fetching
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        this.loading = false;
      }
    },


    // Rewind 15 seconds
    rewindAudio(index) {
      const audio = this.$refs.audioPlayer[index];
      if (audio) {
        audio.currentTime = Math.max(0, audio.currentTime - 15); // Ensure it doesn't go below 0
      }
    },

    // Fast forward 15 seconds
    fastForwardAudio(index) {
      const audio = this.$refs.audioPlayer[index];
      if (audio) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 15); // Ensure it doesn't exceed duration
      }
    },

    // Play or pause audio
    playAudio(index) {
      const audioPlayer = this.$refs.audioPlayer[index];

      // Pause the currently playing audio (if any)
      if (this.currentlyPlaying && this.currentlyPlaying !== audioPlayer) {
        this.currentlyPlaying.pause();
        this.currentlyPlaying = null;
        this.highlightedIndex = null; // Reset highlight
      }

      // Toggle play/pause for the clicked audio
      if (this.currentlyPlaying === audioPlayer) {
        audioPlayer.pause();
        this.currentlyPlaying = null;
        this.highlightedIndex = null; // Reset highlight
      } else {
        audioPlayer.play();
        this.currentlyPlaying = audioPlayer;
        this.highlightedIndex = index; // Highlight the new audio
      }
    },

    // Handle audio end event
    handleAudioEnd(index) {
      if (this.currentlyPlaying === this.$refs.audioPlayer[index]) {
        this.currentlyPlaying = null;
        this.highlightedIndex = null; // Reset highlight when audio ends
      }
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', options); // Using 'en-GB' for British date format
    },

    applyFilters() {
      let filtered = [...this.podcasts];

      // Apply language filter
      if (this.selectedLanguageFilter) {
        filtered = filtered.filter(podcast => podcast.language === this.selectedLanguageFilter);
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

    detectLanguage(text) {
      if (/[؀-ۿ]/.test(text)) {
        return 'Arabic';
      } else if (/[A-Za-z]/.test(text)) {
        return 'English';
      } else {
        return 'Unknown';
      }
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

    applyDurationFilter(podcasts) {
      switch (this.durationFilter) {
        case "longest":
          return podcasts.slice().sort((a, b) => b.duration - a.duration);
        case "shortest":
          return podcasts.slice().sort((a, b) => a.duration - b.duration);
        case "0-10":
          return podcasts.filter(podcast => podcast.duration <= 10);
        case "10-30":
          return podcasts.filter(podcast => podcast.duration > 10 && podcast.duration <= 30);
        case "30-60":
          return podcasts.filter(podcast => podcast.duration > 30 && podcast.duration <= 60);
        case "more-than-60":
          return podcasts.filter(podcast => podcast.duration > 60);
        default:
          return podcasts;
      }
    },

    async fetchEpisodeCounts() {
      for (let podcast of this.islamicPodcasts) {
        try {
          const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(podcast.rssUrl)}`);
          const data = await response.json();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data.contents, "text/xml");
          const episodeCount = xmlDoc.getElementsByTagName("item").length;

          podcast.episodeCount = episodeCount;
        } catch (error) {
          console.error(`Error fetching episode count for ${podcast.name}:`, error);
        }
      }
    },

    processRSSFeed(rssText) {
      // TODO: Implement RSS parsing logic
      console.log("Processing RSS Feed...");
    },

    selectPodcast(podcast) {
      this.selectedPodcast = podcast;
      this.fetchPodcasts();
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
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedPodcasts();
      }
    },

    updatePaginatedPodcasts() {
      const start = (this.currentPage - 1) * 9; // Assuming 9 items per page
      const end = start + 9;
      this.paginatedPodcasts = this.podcasts.slice(start, end);
    },
  },

  mounted() {
    this.fetchPodcasts().then(() => {
      this.applyFilters(); // Apply filters once podcasts are loaded
      this.fetchEpisodeCounts();
    });
  },

  watch: {
    searchQuery: "onSearch",
    selectedYear: 'applyFilters',
    selectedMonth: 'applyFilters',
    selectedWeek: 'applyFilters',
    selectedDay: 'applyFilters',
    sortOption: 'applyFilters',
    durationFilter: 'applyFilters',
    dateFilter: 'applyFilters',
  },
};
</script>

<style scoped>
img {
  max-width: 150px;
  /* Adjust as needed */
  height: auto;
}

/* .highlighted {
  border: 2px solid rgb(13, 182, 145);
  box-shadow: 0 0 10px rgba(13, 182, 145, 0.5);
} */

.highlighted {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  box-shadow: 0 0 15px rgba(13, 182, 145, 0.5);
  transform: scale(1.02);
}

.mobile-padding {
  padding: 10px;
  /* Adjust as needed */
}

@media (min-width: 768px) {
  .mobile-padding {
    padding: 20px;
    /* Increased padding for larger screens */
  }
}


@media (max-width: 576px) {
  .pagination {
    /* display: flex; */
    flex-wrap: nowrap;
    /* Prevent wrapping */
    justify-content: center;
    /* Centre the pagination */
  }
}

@media (max-width: 767.98px) {
  .mobile-padding {
    margin-bottom: 1rem;
    /* Adjust as needed */
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