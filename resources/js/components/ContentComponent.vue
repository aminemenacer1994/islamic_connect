<template>
  <div class="container py-4">
    <h1 class="display-5 fw-bold text-center">Islamic Podcasts</h1>
    <!-- <ChatBot /> -->
    <p class="text-center container mb-4 lead">
      Explore and discover the latest Islamic podcasts offering a diverse range of insightful discussions,
      thought-provoking reflections, and inspiring content. These podcasts cover various topics designed to deepen your
      understanding of Islam.
    </p>

    <div class="container">
      <h2 class="fw-bold text-left pt-2 pb-4">Select a Podcast:</h2>

      <div class="row">
        <div v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" class="col-6 col-md-2 mb-4 text-center"
          @click="selectPodcast(podcast)" style="cursor: pointer;">
          <img :src="podcast.image" alt="Podcast Logo" class="img-fluid"
            style="height: 180px; width: 100%; object-fit: cover; border-radius: 18px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
          <h5 class="mt-3" style="font-size: 1.2rem; font-weight: 600;">
            {{ podcast.name }}
          </h5>
        </div>
      </div>


    </div>




    <div class="pt-3" v-if="selectedPodcast" ref="podcastDetailSection">
      <hr class="container" />
      <p class="fw-bold display-5 ">{{ selectedPodcast.name }}</p>
      <img style=" border-radius: 15px;" class="col-md-2" :src="selectedPodcast.image" :alt="selectedPodcast.name">

      <div class="d-flex justify-content-between align-items-start">
      </div>
      <h5 class="col-md-10 mt-3 pb-3 text-muted" style="line-height: 1.8em;">{{ selectedPodcast.desc }}</h5>
      <h4 class="fw-bold ml-2 pb-3">
        Amount of Episodes:
        {{ selectedPodcast.episodeCount > 0 ? selectedPodcast.episodeCount : 'Data not available' }}
      </h4>
    </div>


    <div class="row pb-3 g-2 g-md-3">
      <!-- <div class="col-md-6 px-2 px-md-3" v-if="selectedPodcast">
        <h4 for="sortPodcasts" class="form-label fw-bold">Views:</h4>
        <select id="sortPodcasts" class="form-select" v-model="sortBy" @change="sortPodcasts">
          <option value="most-viewed">Most Viewed</option>
          <option value="least-viewed">Least Viewed</option>
        </select>
      </div> -->

      <!-- <div class="col-md-6 px-2 px-md-3 pb-2" v-if="selectedPodcast">
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
            <div :class="['card', { 'highlighted': playingIndex === index }]"
              style=" border-radius: 8px;">

              <div class="card-body">
                <h4 class="card-title pb-2 display-5 fw-bold" v-html="highlightText(podcast.title)"></h4><br /><br />
                <h6>Views: {{ podcast.views }}</h6>
                <h6>Published on: {{ formatDate(podcast.pubDate) }}</h6>
                <hr>

                <div class=" text-center d-flex justify-content-between align-items-center">
                  <!-- Rewind -->
                  <div class="icon-container">
                    <i class="bi bi-skip-backward-circle icon-tooltip" @click="rewindAudio(index)"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Rewind"></i>
                    <span class="icon-text">Rewind</span>
                  </div>

                  <!-- Share -->
                  <div class="icon-container">
                    <i class="bi bi-share icon-tooltip " @click="shareOnWhatsApp(podcast)" data-bs-toggle="tooltip"
                      data-bs-placement="top" title="Share"></i>
                    <span class="icon-text">Share</span>
                  </div>

                  <!-- Play/Pause -->
                  <div class="icon-container">
                    <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'" @click="toggleAudioPlayer(index)"
                      data-bs-toggle="tooltip" data-bs-placement="top" :title="isAudioPlaying[index] ? 'Pause' : 'Play'"></i>
                    <span class="icon-text">{{ isAudioPlaying[index] ? 'Pause' : 'Play' }}</span>
                  </div>

                  <!-- Fast Forward -->
                  <div class="icon-container">
                    <i class="bi bi-skip-forward-circle icon-tooltip" @click="fastForwardAudio(index)"
                      data-bs-toggle="tooltip" data-bs-placement="top" title="Fast Forward"></i>
                    <span class="icon-text">Forward</span>
                  </div>
                </div>
              </div>

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

    <!-- Global Custom Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container">
      <div class="custom-audio-player">
        <div class="controls">
          <button @click="rewindAudio(currentlyPlayingIndex)" class="control-btn" title="Rewind">
            <i class="bi bi-skip-backward-fill"></i>
          </button>
          <button @click="toggleAudioPlayer(currentlyPlayingIndex)" class="control-btn play-pause" title="Play/Pause">
            <i v-if="isAudioPlaying[currentlyPlayingIndex]" class="bi bi-pause-fill"></i>
            <i v-else class="bi bi-play-fill"></i>
          </button>
          <button @click="fastForwardAudio(currentlyPlayingIndex)" class="control-btn" title="Fast Forward">
            <i class="bi bi-skip-forward-fill"></i>
          </button>
          <button @click="stopAudio(currentlyPlayingIndex)" class="control-btn" title="Stop">
            <i class="bi bi-stop-fill"></i>
          </button>
          <button @click="toggleVolume" class="control-btn" title="Volume">
            <i class="bi" :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`"></i>
          </button>
          <div v-if="showVolumeBar" class="volume-bar-container">
            <input type="range" v-model="volume" min="0" max="1" step="0.1" @input="updateVolume"
              class="volume-slider" />
          </div>
          <span class="time">{{ formatTime(audioElements[currentlyPlayingIndex]?.currentTime || 0) }} / {{
            formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
          <button @click="closeAudioPlayer" class="control-btn" title="Close" style="margin-left: auto;">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
        </div>
      </div>
    </div>
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
      playingIndex: null,
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
          name: "Muslim Footprints",
          rssUrl: "https://footprints.podcast.ismaili/feed.xml",
          desc: "Exploring Muslim narratives and stories across cultures, presented by The Ismaili & Kalima Communications.",
          image: "./images/mf.png",
        },
        {
          name: "The Greed for Ilm",
          rssUrl: "https://greedforilm.libsyn.com/rss",
          desc: `This podcast is dedicated to the pursuit of knowledge (Ilm) from an Islamic perspective. It explores various aspects of Islamic education, the importance of seeking knowledge, and provides insights on how to live a life based on the teachings of Islam.`,
          image: "./images/ilm.jpg",
        },
        {
          name: "Thinking Muslim",
          rssUrl: "https://anchor.fm/s/4c6115d8/podcast/rss",
          desc: `A podcast that engages in thoughtful discussions on Islamic beliefs, contemporary issues, and interviews with experts in various fields.`,
          image: "./images/tm.png",
        },
        {
          name: "Sultans and Sneakers",
          rssUrl: "https://sultansandsneakers.libsyn.com/rss",
          desc: `Hosted by Mahin Islam, Sultans and Sneakers explores the intersection of faith, culture, and modern life through conversations with scholars, athletes, and influencers.  
          The podcast covers topics like masculinity, spirituality, and navigating Islam in the West.`,
          image: "./images/ss.jpg",
        },
        {
          name: "Wives of Jannah",
          rssUrl: "https://wivesofjannah.libsyn.com/rss",
          desc: `Hosted by Megan Wyatt, Wives of Jannah offers Islamic-based relationship coaching for Muslim women.  
          Focusing on love, mercy, and tranquility in marriage, it provides practical advice drawn from Quranic principles to strengthen relationships.`,
          image: "./images/woj.jpeg",
        },
        {
          name: "The Light of Reflection",
          rssUrl: "https://feeds.buzzsprout.com/1658500.rss",
          desc: `The Light of Reflection offers daily Quranic reflections and short reminders to inspire spiritual growth.  
          It provides practical insights for Muslims seeking to connect with the Quran.`,
          image: "./images/rl.jpeg",
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
      isAudioPlaying: [],
      currentlyPlaying: null,
      currentlyPlayingIndex: 0,
      audioElements: [],
      showAudioPlayer: false,
      showVolumeBar: false,
      volume: 1.0,
      playbackSpeed: 1.0,
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
    this.$nextTick(() => {
      this.initializeAudioElements();
    });
  },

  methods: {
    onPlay(index) {
      this.$refs.audioPlayers.forEach((audio, i) => {
        if (i !== index && !audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      this.playingIndex = index;
    },
    onPause(index) {
      if (this.playingIndex === index) {
        this.playingIndex = null;
      }
    },
    onEnded(index) {
      if (this.playingIndex === index) {
        this.playingIndex = null;
      }
    },
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
      this.$nextTick(() => {
        const section = this.$refs.podcastDetailSection;
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
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

    // --- GLOBAL AUDIO PLAYER LOGIC ---
    initializeAudioElements() {
      this.audioElements = this.paginatedPodcasts.map((podcast, index) => {
        const audio = new Audio(podcast.audioUrl || '');
        audio.playbackRate = this.playbackSpeed;
        audio.volume = this.volume;
        audio.addEventListener('timeupdate', () => this.updateProgress(index));
        audio.addEventListener('loadedmetadata', () => { this.progress[index] = 0; });
        audio.addEventListener('ended', () => this.handlePodcastEnd(index));
        return audio;
      });
    },
    playAudio(index) {
      if (!this.audioElements[index] || index >= this.paginatedPodcasts.length) return;
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        this.currentlyPlaying.pause();
        this.currentlyPlaying.currentTime = 0;
      }
      this.isAudioPlaying = this.isAudioPlaying.map((state, i) => i === index);
      this.currentlyPlaying = this.audioElements[index];
      this.currentlyPlayingIndex = index;
      this.currentlyPlaying.play().catch((err) => {
        console.error('Play error:', err);
        this.handlePodcastEnd(index);
      });
      this.isAudioPlaying[index] = true;
      this.showAudioPlayer = true;
    },
    pauseAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].pause();
        this.isAudioPlaying[index] = false;
      }
    },
    toggleAudioPlayer(index) {
      if (!this.audioElements[index]) return;
      if (!this.isAudioPlaying[index]) {
        this.playAudio(index);
      } else {
        this.pauseAudio(index);
      }
    },
    stopAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].pause();
        this.audioElements[index].currentTime = 0;
        this.isAudioPlaying[index] = false;
        this.progress[index] = 0;
      }
    },
    rewindAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].currentTime = Math.max(0, this.audioElements[index].currentTime - 15);
      }
    },
    fastForwardAudio(index) {
      if (this.audioElements[index]) {
        this.audioElements[index].currentTime = Math.min(this.audioElements[index].duration, this.audioElements[index].currentTime + 20);
      }
    },
    updateProgress(index) {
      if (this.audioElements[index] && this.audioElements[index].duration) {
        const progress = (this.audioElements[index].currentTime / this.audioElements[index].duration) * 100;
        this.progress[index] = Math.min(100, progress);
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return (minutes < 10 ? '0' : '') + minutes + ':' + (secs < 10 ? '0' : '') + secs;
    },
    handlePodcastEnd(index) {
      if (this.isAudioPlaying[index]) {
        this.stopAudio(index);
        this.playNextPodcast();
      }
    },
    playNextPodcast() {
      if (this.paginatedPodcasts.length > 0) {
        const nextIndex = (this.currentlyPlayingIndex + 1) % this.paginatedPodcasts.length;
        this.playAudio(nextIndex);
      }
    },
    toggleVolume() {
      this.showVolumeBar = !this.showVolumeBar;
    },
    updateVolume() {
      if (this.currentlyPlaying) {
        this.currentlyPlaying.volume = this.volume;
      }
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach((audio) => {
          if (audio) audio.volume = this.volume;
        });
      }
    },
    closeAudioPlayer() {
      if (this.currentlyPlayingIndex !== null) {
        this.stopAudio(this.currentlyPlayingIndex);
      }
      this.showAudioPlayer = false;
      this.currentlyPlayingIndex = 0;
      this.currentlyPlaying = null;
    },
    // --- END GLOBAL AUDIO PLAYER LOGIC ---
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
    paginatedPodcasts(newPodcasts) {
      this.isAudioPlaying = new Array(newPodcasts.length).fill(false);
      this.progress = new Array(newPodcasts.length).fill(0);
      this.$nextTick(() => {
        this.initializeAudioElements();
      });
    },
  },
};
</script>

<style scoped>
.highlighted {
  /* background-color: #f0f8ff; */
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
  font-size: 1.4rem;
  transition: color 0.2s;
}

.icon-tooltip:hover, .icon-tooltip:focus {
  color: #0db6a1;
}

.icon-text {
  font-size: 0.85rem;
  color: #555;
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
  background-color: rgba(10, 228, 181, 0.232);
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
  .card-title {
    font-size: 1.1rem;
  }
  .icon-tooltip {
    font-size: 1.2rem;
  }
  .icon-text {
    font-size: 0.75rem;
  }
  .pagination {
    font-size: 0.875rem;
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
  border-bottom-left-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-bottom-right-radius: 20px;
  background: rgb(13, 182, 145);
}

audio::-webkit-media-controls-panel {
  background: rgb(13, 182, 145);
  border-bottom-left-radius: 8px;
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

.audio-player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1001;
  background-color: rgba(33, 33, 33, 0.95);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px 15px 0 0;
  padding: 10px;
  transition: transform 0.3s ease-in-out;
}

.custom-audio-player {
  display: flex;
  flex-direction: column;
  color: white;
  padding: 5px 10px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .controls {
    gap: 10px;
  }

  .control-btn {
    padding: 5px !important;
    font-size: 1.2rem !important;
  }

  .time {
    font-size: 0.8rem !important;
    min-width: 100px;
    text-align: center;
  }

  .volume-bar-container {
    position: fixed;
    bottom: 100%;
    left: 0;
    width: 100%;
    background-color: rgba(33, 33, 33, 0.95);
    padding: 10px;
    border-radius: 15px 15px 0 0;
  }

  .volume-slider {
    width: 100%;
  }
}

.control-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  color: #00bfa6;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #00bfa6;
  transition: width 0.1s linear;
}

.volume-slider {
  width: 100px;
  height: 4px;
}
</style>