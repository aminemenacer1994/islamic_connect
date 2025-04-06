<template>
  <div class="container mt-4">
    <h1 class="display-5 fw-bold text-center mb-5">Islamic Podcasts</h1>
    <ChatBot />
    <!-- <p class="text-center container mb-4 lead">
      Explore and discover the latest Islamic podcasts that offer a diverse range of insightful discussions,
      thought-provoking reflections, and inspiring content. These podcasts delve into a variety of topics that aim to
      deepen your understanding of Islam, from spiritual guidance and personal development to contemporary issues facing
      the Muslim community.
    </p> -->

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

    <div class="container mt-5">
      <h2 class="fw-bold text-left pt-2 pb-2 container">Select a Podcast:</h2>

      <div class="d-flex overflow-auto text-center px-3 shadow-md"
        style="white-space: nowrap; gap: 40px; border-radius: 15px; padding-bottom: 15px;">
        <div v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" class="text-center flex-shrink-0"
          style="width: 160px; cursor: pointer;" @click="selectPodcast(podcast)">
          <img :src="podcast.image" alt="Podcast Logo"
            style="width: 200px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; height: 180px; object-fit: cover; border-radius: 18px;">
          <h5 class="text-center mt-3" style="font-size: 1.3rem; font-weight: 600;">
            <span class="text-center">{{ podcast.name }}</span>
          </h5>
        </div>
      </div>
    </div>



    <!-- <div class="container text-center">
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
    </div> -->

    <div class="pb- pt-3" v-if="selectedPodcast">
      <hr class="container" />
      <p class="fw-bold display-5 ">{{ selectedPodcast.name }}</p>
      <img style=" border-radius: 15px;" class="col-md-2" :src="selectedPodcast.image" :alt="selectedPodcast.name">

      <div class="d-flex justify-content-between align-items-start">
      </div>
      <h5 class="col-md-10 mt-3 pb-3" style="line-height: 1.6em;">{{ selectedPodcast.desc }}</h5>
      <h4 class="fw-bold ml-2 pb-3">
        Amount of Episodes:
        {{ selectedPodcast.episodeCount > 0 ? selectedPodcast.episodeCount : 'Data not available' }}
      </h4>
    </div>


    <div class="row g-2 g-md-3">
      <div class="col-md-6 px-2 px-md-3" v-if="selectedPodcast">
        <h4 for="sortPodcasts" class="form-label fw-bold">Views:</h4>
        <select id="sortPodcasts" class="form-select" v-model="sortBy" @change="sortPodcasts">
          <option value="most-viewed">Most Viewed</option>
          <option value="least-viewed">Least Viewed</option>
        </select>
      </div>

      <div class="col-md-6 px-2 px-md-3 pb-2" v-if="selectedPodcast">
        <h4 for="durationFilter" class="form-label fw-bold">Duration:</h4>
        <select id="durationFilter" class="form-select" v-model="durationFilter" @change="filterPodcasts">
          <option value="">All Durations</option>
          <option value="longest">Longest</option>
          <option value="shortest">Shortest</option>
          <option value="0-10">0 - 10 min</option>
          <option value="10-30">10 - 30 min</option>
          <option value="30-60">30 - 60 min</option>
          <option value="more-than-60">More than 1 hour</option>
        </select>
      </div>

      <!-- <div class="col-md-6 px-2 px-md-3 mb-3" v-if="selectedPodcast">
        <h4 for="searchPodcasts" class="form-label fw-bold">Search Episode:</h4>
        <input id="searchPodcasts" type="search" class="form-control" placeholder="Search podcast keyword..."
          v-model="searchQuery" @input="onSearch" />
      </div> -->
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
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4 mb-2">
          <div v-for="(podcast, index) in paginatedPodcasts" :key="podcast.title" class="col">
            <div :class="['card h-100', { 'highlighted': playingIndex === index }]"
              style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; bottom: 0px; border-radius: 20px;">

              <div class="card-body ">
                <h4 class="card-title pb-2 display-5 fw-bold" v-html="highlightText(podcast.title)"></h4><br /><br />
                <h6>Views: {{ podcast.views }}</h6>
                <h6>Published on: {{ formatDate(podcast.pubDate) }}</h6>
                <hr>
                <div class="container-fluid text-center d-flex justify-content-between align-items-center">
                  <!-- Rewind -->
                  <div class="icon-container">
                    <i class="bi bi-skip-backward-circle icon-tooltip" @click="rewindAudio(index)"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Rewind"></i>
                    <span class="icon-text">Rewind</span>
                  </div>

                  <!-- Share -->
                  <div class="icon-container">
                    <i class="bi bi-share icon-tooltip" @click="shareOnWhatsApp(podcast)" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Share"></i>
                    <span class="icon-text">Share</span>
                  </div>

                  <!-- Replay -->
                  <div class="icon-container">
                    <i class="bi bi-repeat icon-tooltip" @click="replayAudio(index)" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Replay"></i>
                    <span class="icon-text">Replay</span>
                  </div>

                  <!-- Fast Forward -->
                  <div class="icon-container">
                    <i class="bi bi-skip-forward-circle icon-tooltip" @click="fastForwardAudio(index)"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Fast Forward"></i>
                    <span class="icon-text">Forward</span>
                  </div>
                </div>
              </div>

              <!-- Audio Player -->
              <audio ref="audioPlayer" :controls="true" :src="podcast.audioUrl" v-if="podcast.audioUrl"
                class="w-100 audio" :key="index"
                style="height: 60px; font-size: 20px; padding: 10px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-bottom-right-radius: 20px;"
                @play="playAudio(index)" @pause="handleAudioEnd(index)" @ended="handleAudioEnd(index)"
                @timeupdate="updateProgress(index)" @loadedmetadata="updateDuration(index)">
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
import ChatBot from './translation/ChatBot.vue';

export default {
  components: {
    ChatBot
  },
  data() {
    return {
      repeatStates: {},
      showProgress: {}, // Tracks which progress bars should be shown
      progress: {}, // To track the progress of each audio
      playedPercentage: {}, // To track the played percentage for each audio
      remainingPercentage: {}, // To track the remaining percentage for each audio
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
                The topics range from faith, Islamic history, and jurisprudence to social justice, current affairs, and political challenges faced by Muslims today.`,
          image: "./images/mad_mamluk.jpg",
        },

        {
          name: "The Deen Show",
          rssUrl: "https://thedeenshow.com/feed/podcast/",
          desc: `The Deen Show is an American Islamic talk show hosted by Eddie, a convert to Islam, who engages with scholars, experts, and influential speakers to educate both Muslims and non-Muslims about Islam.  
                With a focus on dawah (Islamic outreach), Eddie explores fundamental beliefs, misconceptions about Islam, and the lives of prominent Muslim figures.`,
          image: "./images/deen_show.png",
        },
        {
          name: "Yaqeen",
          rssUrl: "https://feeds.buzzsprout.com/1014445.rss",
          desc: `The Yaqeen Podcast, produced by Yaqeen Institute, features discussions led by scholars such as Dr. Omar Suleiman and others.  
                Topics range from Islamic theology, spirituality, and social justice to modern challenges facing the Muslim community.  
                This podcast aims to provide deep insights into faith and identity while addressing contemporary issues.`,
          image: "./images/yaqueen_pc.jpg",
        },
        {
          name: "SeekersGuidance",
          rssUrl: "https://seekersguidance.org/feed/podcast/",
          desc: `SeekersGuidance is a global Islamic educational platform dedicated to providing high-quality, accessible, and free Islamic knowledge to students worldwide.  
                Founded by Shaykh Faraz Rabbani, it offers structured online courses, scholarly guidance, and spiritual mentorship.`,
          image: "./images/seekers_guidance.png",
        },

        {
          name: "Qalam",
          rssUrl: "https://www.qalaminstitute.org/feed/podcast/",
          desc: `The Qalam Podcast, hosted by scholars like Mufti Hussain Kamani and Shaykh Abdul Nasir Jangda, provides authentic Islamic knowledge in a way that is relevant to modern life.  
                Covering tafsir (Quranic explanation), hadith, spirituality, and daily Muslim struggles, this podcast offers practical guidance for Muslims seeking to grow in their faith. `,
          image: "./images/qalam_pc.jpg",
        },

        {
          name: "Islamic History",
          rssUrl: "https://islamichistorypodcast.podbean.com/feed.xml​",
          desc: `The Islamic History Podcast, hosted by Muttahir Sabree, explores key historical events from the Islamic world.  
                Covering everything from the life of the Prophet Muhammad (peace be upon him) to the Ottoman Empire and modern Islamic movements, this podcast is perfect for history lovers.  
                It provides well-researched, engaging storytelling that brings Islamic history to life.`,
          image: "./images/islamic_history_pc.jpeg",
        },
        {
          name: "Hijabi Diaries",
          rssUrl: "https://anchor.fm/s/89366ff8/podcast/rss",
          desc: `Assalamualaikum everyone in this podcast I talk about the path to spiritual growth, give out advice, Islam, stories, and much more! Come with me on this islamic journey as we strengthen our relationship with Allah :)
                The Prophet ﷺ said, "Convey (my teachings) to the people even if it were a single sentence.”`,
          image: "./images/hijabis.jpeg",
        },
        {
          name: "What is Islam",
          rssUrl: "https://feeds.buzzsprout.com/2076265.rss",
          desc: `A podcast that explores various topics related to Islam and the Muslim experience, featuring interviews with scholars, activists, and artists.`,
          image: "./images/islamic_pc.png",
        },
        {
          name: "The Greed for Ilm",
          rssUrl: "https://greedforilm.libsyn.com/rss",
          desc: `This podcast is dedicated to the pursuit of knowledge (Ilm) from an Islamic perspective. It explores various aspects of Islamic education, the importance of seeking knowledge, and provides insights on how to live a life based on the teachings of Islam.`,
          image: "./images/ilm.jpg",
        },

      ],

      playingIndex: null,
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
      podcastsPerPage: 8,
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
    // filteredPodcasts() {
    //   // Filter out podcasts with the specific phrase in the description
    //   return this.islamicPodcasts.filter(podcast =>
    //     !podcast.description.includes("No audio available for this podcast.")
    //   );
    // },
    filteredPodcasts() {
      return this.applyDurationFilter(this.islamicPodcasts);
    },
    sortedPodcasts() {
      return this.applySorting([...this.filteredPodcasts]);
    }
  },

  mounted() {
    // Initialize Bootstrap tooltips
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  },

  methods: {
    replayAudio(index) {
      const audio = this.$refs.audioPlayer[index];
      if (audio) {
        audio.currentTime = 0; // Set time to start
        audio.play(); // Play from the beginning
      }
    },
    toggleRepeat(index) {
      this.repeatStates = { ...this.repeatStates, [index]: !this.repeatStates[index] };
    },
    handleAudioEnd(index) {
      if (this.repeatStates[index]) { // Check if repeat is enabled
        const audioElement = this.$refs.audio[index];
        if (audioElement) {
          audioElement.currentTime = 0;
          audioElement.play();
        }
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

    updateDuration(index) {
      const audioPlayer = this.$refs.audioPlayer[index];
      if (audioPlayer) {
        const newDuration = Math.round(audioPlayer.duration); // Convert to whole minutes

        // Replace the entire object in the array to trigger reactivity
        this.podcasts = this.podcasts.map((podcast, i) =>
          i === index ? { ...podcast, duration: newDuration } : podcast
        );
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
      fetch(podcast.audioUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = podcast.title.replace(/\s+/g, "_") + ".mp3";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error("Download failed:", error));
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

        // Store the number of episodes
        this.selectedPodcast.episodeCount = items.length;

        // Process and sort podcasts
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

        // Assign sorted podcasts to paginatedPodcasts
        this.paginatedPodcasts = [...this.podcasts];

        this.applyFilters(); // Apply filters after fetching
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        this.loading = false;
      }
    },

    playAudio(index) {
      // Check if there's another audio playing
      if (this.currentlyPlaying !== null && this.currentlyPlaying !== index) {
        const currentAudio = this.$refs.audioPlayer[this.currentlyPlaying];
        if (currentAudio) {
          currentAudio.pause(); // Pause the currently playing audio
          currentAudio.currentTime = 0; // Reset the time
        }
      }

      // Play the new audio
      const audio = this.$refs.audioPlayer[index];
      if (audio) {
        audio.currentTime = 0; // Reset playback
        audio.play().catch((err) => console.error("Audio play error:", err));

        // Set the currently playing audio index and highlight the card
        this.currentlyPlaying = index;
        this.playingIndex = index;
      }
    },

    handleAudioEnd(index) {
      // Repeat audio if the repeat state is true
      if (this.repeatStates[index]) {
        const audioElement = this.$refs.audioPlayer[index];
        if (audioElement) {
          audioElement.currentTime = 0;
          audioElement.play();
        }
      }

      // Reset the highlighted card when the audio ends
      if (this.currentlyPlaying === index) {
        this.playingIndex = null; // Reset the playing index
      }
    },

    // Handle when pagination occurs
    handlePageChange() {
      // Pause the audio before changing the page
      if (this.currentlyPlaying !== null) {
        const audioElement = this.$refs.audioPlayer[this.currentlyPlaying];
        if (audioElement) {
          audioElement.pause(); // Pause the audio
        }
      }

      // Reset the playing index on page change
      this.playingIndex = null;
    },

    handlePagination() {
      // Pause the audio before changing page
      this.handlePageChange();
      // Your pagination logic here (e.g., fetch new data or change page)
    },

    // Update progress during playback
    updateProgress(index, audioPlayer) {
      if (audioPlayer && audioPlayer.duration) {
        const played = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        const remaining = 100 - played;

        // Update the progress for the current audio
        this.progress = { ...this.progress, [index]: played };
        this.playedPercentage = { ...this.playedPercentage, [index]: played.toFixed(1) };
        this.remainingPercentage = { ...this.remainingPercentage, [index]: remaining.toFixed(1) };
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
      const now = new Date();
      return filtered.filter(podcast => {
        const pubDate = new Date(podcast.pubDate);
        if (this.selectedDateFilter === "weekly") {
          return (now - pubDate) / (1000 * 60 * 60 * 24) <= 7;
        } else if (this.selectedDateFilter === "monthly") {
          return (now - pubDate) / (1000 * 60 * 60 * 24) <= 30;
        }
        return true;
      });
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
    currentlyPlaying(newValue) {
      if (newValue !== null) {
        this.playingIndex = newValue; // Keep the highlighted card when page changes
      }
    },
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
.highlighted {
  background-color: #f0f8ff;
  /* Light blue background to highlight */
  box-shadow: rgba(0, 123, 255, 0.5) 0px 7px 29px 0px;
  /* Example of highlight effect */
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.icon-tooltip {
  font-size: 1.3rem;
}

.icon-text {
  font-size: 0.875rem;
  color: #333;
}

.icon-tooltip {
  cursor: pointer;
  font-size: 1.3rem;
  transition: color 0.3s ease-in-out;
}

.icon-tooltip:hover {
  color: rgb(13, 182, 145);
}

img {
  max-width: 180px;
  /* Adjust as needed */
  height: auto;
}

.highlighted {
  border: 2px solid rgb(13, 182, 145);
  /* Highlight border */
  background-color: rgba(13, 182, 145, 0.1);
  /* Light highlight effect */
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
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
  border-bottom-left-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-bottom-right-radius: 20px;
  background: rgb(13, 182, 145);
}

audio::-webkit-media-controls-panel {
  background: rgb(13, 182, 145);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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