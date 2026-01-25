"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ContentComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _translation_ChatBot_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translation/ChatBot.vue */ "./resources/js/components/translation/ChatBot.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    ChatBot: _translation_ChatBot_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data() {
    const initialUserId = (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.resolveClientUserId)();
    return {
      smallScreen: false,
      isVisible: true,
      showAudioPlayer: false,
      showFilters: false,
      repeatStates: {},
      playingIndex: null,
      showProgress: {},
      // Tracks which progress bars should be shown
      progress: {},
      // To track the progress of each audio
      playedPercentage: {},
      // To track the played percentage for each audio
      remainingPercentage: {},
      // To track the remaining percentage for each audio
      highlightedIndex: null,
      // Track the highlighted card index
      loading: false,
      currentlyPlaying: null,
      podcastMeta: new Map(),
      // fixed: remove stray ddurationFilter, use unified durationFilter
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
      // fixed: remove duplicate selectedDateFilter declaration
      selectedPodcast: "",
      lastSelectedPodcastKey: 'content_last_selected_podcast',
      continueListening: [],
      volume: 1,
      showVolumeBar: false,
      // error state for fetch failures
      fetchError: null,
      storageUserId: initialUserId,
      isAuthenticated: !!initialUserId,
      preferencesLoaded: false,
      progressMap: {},
      progressSyncTimer: null,
      playedEpisodes: {},
      loginWarnings: {},
      warningTimers: {},
      localRecentPlaysKey: 'content_podcast_recent_local',
      localPlayedKey: 'content_podcast_played_local',
      islamicPodcasts: [{
        name: "The Mad Mamluks",
        rssUrl: "https://themadmamluks.libsyn.com/rss",
        desc: `The Mad Mamluks is a podcast that delves into contemporary issues, politics, theology, and culture from a Muslim perspective. Hosted by a group of Muslim men, the show features in-depth discussions with scholars, activists, and community leaders.  
                The topics range from faith, Islamic history, and jurisprudence to social justice, current affairs, and political challenges faced by Muslims today.`,
        image: "./images/mad_mamluk.jpg"
      },
      // {
      //   name: "The Deen Show",
      //   rssUrl: "https://muslimcentral.com/audio/wahaj-tarin/feed/",
      //   desc: `The Deen Show is an American Islamic talk show hosted by Eddie, a convert to Islam, who engages with scholars, experts, and influential speakers to educate both Muslims and non-Muslims about Islam.  
      //         With a focus on dawah (Islamic outreach), Eddie explores fundamental beliefs, misconceptions about Islam, and the lives of prominent Muslim figures.`,
      //   image: "./images/deen_show.png",
      // },
      {
        name: "Yaqeen",
        rssUrl: "https://feeds.buzzsprout.com/1014445.rss",
        desc: `The Yaqeen Podcast, produced by Yaqeen Institute, features discussions led by scholars such as Dr. Omar Suleiman and others.  
                Topics range from Islamic theology, spirituality, and social justice to modern challenges facing the Muslim community.  
                This podcast aims to provide deep insights into faith and identity while addressing contemporary issues.`,
        image: "./images/yaqueen_pc.jpg"
      }, {
        name: "SeekersGuidance",
        rssUrl: "https://seekersguidance.org/feed/podcast/",
        desc: `SeekersGuidance is a global Islamic educational platform dedicated to providing high-quality, accessible, and free Islamic knowledge to students worldwide.  
                Founded by Shaykh Faraz Rabbani, it offers structured online courses, scholarly guidance, and spiritual mentorship.`,
        image: "./images/seekers_guidance.png"
      }, {
        name: "Qalam",
        rssUrl: "https://www.qalaminstitute.org/feed/podcast/",
        desc: `The Qalam Podcast, hosted by scholars like Mufti Hussain Kamani and Shaykh Abdul Nasir Jangda, provides authentic Islamic knowledge in a way that is relevant to modern life.  
                Covering tafsir (Quranic explanation), hadith, spirituality, and daily Muslim struggles, this podcast offers practical guidance for Muslims seeking to grow in their faith. `,
        image: "./images/qalam_pc.jpg"
      }, {
        name: "Islamic History",
        rssUrl: "https://islamichistorypodcast.podbean.com/feed.xml​",
        desc: `The Islamic History Podcast, hosted by Muttahir Sabree, explores key historical events from the Islamic world.  
                Covering everything from the life of the Prophet Muhammad (peace be upon him) to the Ottoman Empire and modern Islamic movements, this podcast is perfect for history lovers.  
                It provides well-researched, engaging storytelling that brings Islamic history to life.`,
        image: "./images/islamic_history_pc.jpeg"
      }, {
        name: "Hijabi Diaries",
        rssUrl: "https://anchor.fm/s/89366ff8/podcast/rss",
        desc: `Assalamualaikum everyone in this podcast I talk about the path to spiritual growth, give out advice, Islam, stories, and much more! Come with me on this islamic journey as we strengthen our relationship with Allah :)
                The Prophet ﷺ said, "Convey (my teachings) to the people even if it were a single sentence.”`,
        image: "./images/hijabis.jpeg"
      }, {
        name: "What is Islam",
        rssUrl: "https://feeds.buzzsprout.com/2076265.rss",
        desc: `A podcast that explores various topics related to Islam and the Muslim experience, featuring interviews with scholars, activists, and artists.`,
        image: "./images/islamic_pc.png"
      }, {
        name: "Muslim Footprints",
        rssUrl: "https://footprints.podcast.ismaili/feed.xml",
        desc: "Exploring Muslim narratives and stories across cultures, presented by The Ismaili & Kalima Communications.",
        image: "./images/mf.png"
      }, {
        name: "The Greed for Ilm",
        rssUrl: "https://greedforilm.libsyn.com/rss",
        desc: `This podcast is dedicated to the pursuit of knowledge (Ilm) from an Islamic perspective. It explores various aspects of Islamic education, the importance of seeking knowledge, and provides insights on how to live a life based on the teachings of Islam.`,
        image: "./images/ilm.jpg"
      }, {
        name: "Thinking Muslim",
        rssUrl: "https://anchor.fm/s/4c6115d8/podcast/rss",
        desc: `A podcast that engages in thoughtful discussions on Islamic beliefs, contemporary issues, and interviews with experts in various fields.`,
        image: "./images/tm.png"
      },
      // {
      //   name: "Sultans and Sneakers",
      //   rssUrl: "https://sultansandsneakers.libsyn.com/rss",
      //   desc: `Hosted by Mahin Islam, Sultans and Sneakers explores the intersection of faith, culture, and modern life through conversations with scholars, athletes, and influencers.  
      //   The podcast covers topics like masculinity, spirituality, and navigating Islam in the West.`,
      //   image: "./images/ss.jpg",
      // },
      {
        name: "Wives of Jannah",
        rssUrl: "https://wivesofjannah.libsyn.com/rss",
        desc: `Hosted by Megan Wyatt, Wives of Jannah offers Islamic-based relationship coaching for Muslim women.  
          Focusing on love, mercy, and tranquility in marriage, it provides practical advice drawn from Quranic principles to strengthen relationships.`,
        image: "./images/woj.jpeg"
      }, {
        name: "The Light of Reflection",
        rssUrl: "https://feeds.buzzsprout.com/1658500.rss",
        desc: `The Light of Reflection offers daily Quranic reflections and short reminders to inspire spiritual growth.  
          It provides practical insights for Muslims seeking to connect with the Quran.`,
        image: "./images/rl.jpeg"
      }],
      playingIndex: null,
      selectedPodcast: "",
      // Stores the selected podcast object
      isDownloading: false,
      showToast: false,
      toastType: '',
      podcasts: [],
      filteredPodcasts: [],
      loading: false,
      rssUrl: 'https://themadmamluks.libsyn.com/rss',
      searchQuery: '',
      searchInput: '',
      searchDebounceTimer: null,
      // Infinite scroll state
      itemsPerLoad: 8,
      visibleCount: 0,
      isLoadingMore: false,
      bookmarks: [],
      favourites: [],
      recentPlays: [],
      sortOption: 'mostViewed',
      dateFilter: 'weekly',
      durationFilter: '',
      isAudioPlaying: [],
      currentlyPlaying: null,
      currentlyPlayingIndex: 0,
      audioElements: [],
      showAudioPlayer: false,
      showVolumeBar: false,
      volume: 1.0,
      playbackSpeed: 1.0,
      audioPlayerJustOpened: false,
      isSeeking: false,
      languageFilter: '',
      isPlayerMinimized: false
    };
  },
  computed: {
    // Visible slice for infinite scrolling
    visiblePodcasts() {
      return this.filteredAndSearchedPodcasts.slice(0, Math.max(0, this.visibleCount));
    },
    // Keep this lightweight: filteredPodcasts already has filters + sorting applied.
    // Only apply quick text search here to avoid heavy recomputation.
    filteredAndSearchedPodcasts() {
      const podcasts = this.filteredPodcasts || [];
      if (!this.searchQuery) return podcasts;
      const q = this.searchQuery.toLowerCase();
      return podcasts.filter(p => p.title && p.title.toLowerCase().includes(q) || p.description && p.description.toLowerCase().includes(q));
    },
    sortedPodcasts() {
      return this.applySorting([...this.filteredPodcasts]);
    }
  },
  async mounted() {
    // Responsive inline toggles for compact layout
    const setSize = () => {
      try {
        this.smallScreen = window.innerWidth <= 576;
      } catch (e) {}
    };
    setSize();
    window.addEventListener('resize', setSize, {
      passive: true
    });
    this._resizeHandler = setSize;
    // Initialize Bootstrap tooltips
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
    this.$nextTick(() => {
      // Initialize infinite scroll starting window
      this.visibleCount = this.itemsPerLoad;
      this.initializeAudioElements();
      this.setupInfiniteScroll();
    });

    // Add keyboard event listener for closing audio player
    document.addEventListener('keydown', this.handleKeydown);

    // Restore persisted settings
    try {
      const savedVolume = localStorage.getItem('content_volume');
      if (savedVolume !== null) this.volume = Number(savedVolume);
    } catch (e) {}
    try {
      const savedSpeed = localStorage.getItem('content_speed');
      if (savedSpeed !== null) this.playbackSpeed = Number(savedSpeed) || 1.0;
    } catch (e) {}
    await this.resolveStorageScope();

    // Do not auto-select a podcast on page load.

    // Build Continue Listening list from saved progress
    this.buildContinueListening();

    // Prune recent plays to last 50
    if (Array.isArray(this.recentPlays) && this.recentPlays.length > 50) {
      this.recentPlays = this.recentPlays.slice(0, 50);
      if (this.isAuthenticated) {
        this.savePreference('podcast_recent', this.recentPlays);
      } else {
        this.saveLocalRecentPlays();
      }
    }
    this.fetchPodcasts().then(() => {
      this.applyFilters();
      this.fetchEpisodeCounts();
      this.$nextTick(() => {
        this.visibleCount = Math.min(this.itemsPerLoad, this.filteredAndSearchedPodcasts.length || 0);
        this.setupInfiniteScroll();
        this.buildContinueListening();
      });
    });
  },
  beforeUnmount() {
    try {
      window.removeEventListener('resize', this._resizeHandler);
    } catch (e) {}
    // Remove keyboard event listener and disconnect observer
    document.removeEventListener('keydown', this.handleKeydown);
    try {
      this._infiniteObserver && this._infiniteObserver.disconnect && this._infiniteObserver.disconnect();
    } catch (e) {}
    try {
      Object.values(this.warningTimers || {}).forEach(t => clearTimeout(t));
      this.warningTimers = {};
    } catch (e) {}
  },
  methods: {
    async resolveStorageScope() {
      const resolvedId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      this.storageUserId = resolvedId;
      this.isAuthenticated = !!resolvedId;
      if (this.isAuthenticated) {
        await this.loadPreferences();
      } else {
        this.bookmarks = [];
        this.favourites = [];
        this.recentPlays = this.loadLocalRecentPlays();
        this.playedEpisodes = this.loadLocalPlayed();
        this.progressMap = {};
        this.continueListening = [];
        this.preferencesLoaded = true;
      }
    },
    async loadPreferences() {
      try {
        const [bookmarks, favourites, recent, progress, played] = await Promise.all([this.fetchPreference('podcast_bookmarks'), this.fetchPreference('podcast_favourites'), this.fetchPreference('podcast_recent'), this.fetchPreference('podcast_progress'), this.fetchPreference('podcast_played')]);
        this.bookmarks = Array.isArray(bookmarks) ? bookmarks : [];
        this.favourites = Array.isArray(favourites) ? favourites : [];
        this.recentPlays = Array.isArray(recent) ? recent : [];
        this.progressMap = progress && typeof progress === 'object' ? progress : {};
        this.playedEpisodes = played && typeof played === 'object' ? played : {};
        this.buildContinueListening();
      } catch (e) {
        this.bookmarks = [];
        this.favourites = [];
        this.recentPlays = [];
        this.progressMap = {};
        this.playedEpisodes = {};
        this.continueListening = [];
      } finally {
        this.preferencesLoaded = true;
      }
    },
    async fetchPreference(key) {
      var _response$data$value, _response$data;
      if (!this.isAuthenticated) return [];
      const response = await axios__WEBPACK_IMPORTED_MODULE_1__["default"].get(`/api/preferences/${key}`);
      return (_response$data$value = (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.value) !== null && _response$data$value !== void 0 ? _response$data$value : [];
    },
    async savePreference(key, value) {
      if (!this.isAuthenticated) return;
      await axios__WEBPACK_IMPORTED_MODULE_1__["default"].put(`/api/preferences/${key}`, {
        value
      });
    },
    loadLocalRecentPlays() {
      try {
        const raw = localStorage.getItem(this.localRecentPlaysKey);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    },
    saveLocalRecentPlays() {
      try {
        localStorage.setItem(this.localRecentPlaysKey, JSON.stringify(this.recentPlays));
      } catch (e) {}
    },
    loadLocalPlayed() {
      try {
        const raw = localStorage.getItem(this.localPlayedKey);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (e) {
        return {};
      }
    },
    saveLocalPlayed() {
      try {
        localStorage.setItem(this.localPlayedKey, JSON.stringify(this.playedEpisodes));
      } catch (e) {}
    },
    queueProgressSync() {
      if (!this.isAuthenticated) return;
      if (this.progressSyncTimer) return;
      this.progressSyncTimer = setTimeout(async () => {
        this.progressSyncTimer = null;
        try {
          await this.savePreference('podcast_progress', this.progressMap);
        } catch (e) {}
      }, 1500);
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    shortDescription(text, maxLength = 90) {
      if (!text) return '';
      const normalized = text.replace(/\s+/g, ' ').trim();
      if (normalized.length <= maxLength) return normalized;
      return normalized.slice(0, maxLength).replace(/\s+$/, '') + '…';
    },
    getEpisodeKey(podcast) {
      return `${(podcast === null || podcast === void 0 ? void 0 : podcast.title) || ''}||${(podcast === null || podcast === void 0 ? void 0 : podcast.audioUrl) || ''}`;
    },
    isEpisodePlayed(podcast) {
      return !!this.playedEpisodes[this.getEpisodeKey(podcast)];
    },
    showLoginWarning(podcast, message) {
      const key = this.getEpisodeKey(podcast);
      if (!key) return;
      this.loginWarnings = _objectSpread(_objectSpread({}, this.loginWarnings), {}, {
        [key]: message
      });
      if (this.warningTimers[key]) clearTimeout(this.warningTimers[key]);
      this.warningTimers[key] = setTimeout(() => {
        const next = _objectSpread({}, this.loginWarnings);
        delete next[key];
        this.loginWarnings = next;
        delete this.warningTimers[key];
      }, 5000);
    },
    markAsPlayed(podcast) {
      if (!podcast || !podcast.audioUrl) return;
      const key = this.getEpisodeKey(podcast);
      const playedAt = Date.now();
      this.playedEpisodes = _objectSpread(_objectSpread({}, this.playedEpisodes), {}, {
        [key]: playedAt
      });
      const entry = {
        title: podcast.title,
        audioUrl: podcast.audioUrl,
        pubDate: podcast.pubDate,
        views: podcast.views,
        playedAt
      };
      this.recentPlays = [entry, ...this.recentPlays.filter(rp => !(rp.title === podcast.title && rp.audioUrl === podcast.audioUrl))].slice(0, 50);
      if (this.isAuthenticated) {
        this.savePreference('podcast_played', this.playedEpisodes);
        this.savePreference('podcast_recent', this.recentPlays);
      } else {
        this.saveLocalPlayed();
        this.saveLocalRecentPlays();
      }
    },
    cardAccentGradient(podcast) {
      const primary = podcast && podcast.accentPrimary || '#ecfdf5';
      const secondary = podcast && podcast.accentSecondary || '#dbeefe';
      return `linear-gradient(135deg, ${primary}, ${secondary})`;
    },
    onSearchInput() {
      if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = setTimeout(() => {
        this.searchQuery = (this.searchInput || '').trim();
        // Reset visible window on new search
        this.visibleCount = this.itemsPerLoad;
      }, 250);
    },
    toggleVolume() {
      this.showVolumeBar = !this.showVolumeBar;
    },
    updateVolume() {
      const audio = this.audioElements[this.currentlyPlayingIndex];
      if (audio) audio.volume = this.volume;
      try {
        localStorage.setItem('content_volume', String(this.volume));
      } catch (e) {}
    },
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
      this.repeatStates = _objectSpread(_objectSpread({}, this.repeatStates), {}, {
        [index]: !this.repeatStates[index]
      });
    },
    handleAudioEnd(index) {
      if (this.repeatStates[index]) {
        // Check if repeat is enabled
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
        this.podcasts = this.podcasts.map((podcast, i) => i === index ? _objectSpread(_objectSpread({}, podcast), {}, {
          duration: newDuration
        }) : podcast);
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
      fetch(podcast.audioUrl).then(response => response.blob()).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = podcast.title.replace(/\s+/g, "_") + ".mp3";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }).catch(error => console.error("Download failed:", error));
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
    // Fetch and update podcasts when filters change (unified)
    updatePodcasts() {
      this.fetchPodcasts();
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
    // duplicate removed

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
    // duplicate removed

    // Fetch podcasts from RSS feed
    async fetchRssText(rssUrl) {
      const sources = [async () => {
        const response = await fetch(rssUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      }, async () => {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`Proxy HTTP ${response.status}`);
        const data = await response.json();
        if (!data || !data.contents) throw new Error("Proxy response missing contents");
        return data.contents;
      }];
      let lastError = null;
      for (const source of sources) {
        try {
          return await source();
        } catch (error) {
          lastError = error;
        }
      }
      throw lastError || new Error("Failed to fetch RSS feed");
    },
    async fetchPodcasts() {
      if (!this.selectedPodcast) return;
      this.loading = true;
      this.rssUrl = this.selectedPodcast.rssUrl;
      this.fetchError = null;
      try {
        const data = await this.fetchRssText(this.rssUrl);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');

        // Store the number of episodes
        this.selectedPodcast.episodeCount = items.length;

        // Process and sort podcasts
        this.podcasts = Array.from(items).map(item => {
          var _item$getElementsByTa, _item$getElementsByTa2, _item$getElementsByTa3, _item$getElementsByTa4, _item$getElementsByTa5;
          const pubDate = ((_item$getElementsByTa = item.getElementsByTagName('pubDate')[0]) === null || _item$getElementsByTa === void 0 ? void 0 : _item$getElementsByTa.textContent) || 'Unknown';
          console.log('Raw pubDate:', pubDate); // Log raw value
          return {
            title: ((_item$getElementsByTa2 = item.getElementsByTagName('title')[0]) === null || _item$getElementsByTa2 === void 0 ? void 0 : _item$getElementsByTa2.textContent) || 'No title',
            pubDate,
            description: ((_item$getElementsByTa3 = item.getElementsByTagName('description')[0]) === null || _item$getElementsByTa3 === void 0 ? void 0 : _item$getElementsByTa3.textContent) || 'No description available.',
            audioUrl: ((_item$getElementsByTa4 = item.getElementsByTagName('enclosure')[0]) === null || _item$getElementsByTa4 === void 0 ? void 0 : _item$getElementsByTa4.getAttribute('url')) || null,
            views: Math.floor(Math.random() * 1000),
            duration: Math.floor(Math.random() * 60) + 5,
            language: this.detectLanguage(((_item$getElementsByTa5 = item.getElementsByTagName('title')[0]) === null || _item$getElementsByTa5 === void 0 ? void 0 : _item$getElementsByTa5.textContent) || '')
          };
        }).filter(podcast => podcast.audioUrl).sort((a, b) => {
          const dateA = new Date(a.pubDate);
          const dateB = new Date(b.pubDate);
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;
          return dateB - dateA;
        });

        // Initialize visible list for infinite scroll
        this.visibleCount = Math.min(this.itemsPerLoad, this.podcasts.length);
        console.log('Sorted podcasts:', this.podcasts.map(p => ({
          title: p.title,
          pubDate: p.pubDate
        })));
        this.applyFilters(); // Apply filters after fetching
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        this.fetchError = 'Failed to fetch episodes. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    isCurrentlyPlaying(item) {
      const cur = this.visiblePodcasts[this.currentlyPlayingIndex];
      if (!cur || !item) return false;
      return cur.title === item.title && cur.audioUrl === item.audioUrl && this.isAudioPlaying[this.currentlyPlayingIndex];
    },
    // removed duplicate early player/pagination helpers; keep unified versions below

    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', options); // Using 'en-GB' for British date format
    },
    applyFilters() {
      let filtered = [...this.podcasts];

      // Apply language filter
      if (this.languageFilter) {
        filtered = filtered.filter(podcast => podcast.language === this.languageFilter);
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
      // Reset infinite scroll window after filters change
      this.visibleCount = Math.min(this.itemsPerLoad, this.filteredPodcasts.length || 0);
      this.$nextTick(() => this.setupInfiniteScroll());
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
          const data = await this.fetchRssText(podcast.rssUrl);
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, "text/xml");
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
      try {
        localStorage.setItem(this.lastSelectedPodcastKey, JSON.stringify(podcast));
      } catch (e) {}
      this.fetchPodcasts();
      this.$nextTick(() => {
        const section = this.$refs.podcastDetailSection;
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    },
    onSearch() {
      this.visibleCount = this.itemsPerLoad;
      const query = this.searchQuery.toLowerCase();
      this.filteredPodcasts = this.podcasts.filter(podcast => podcast.title.toLowerCase().includes(query));
      this.$nextTick(() => this.setupInfiniteScroll());
    },
    highlightText(title) {
      if (!this.searchQuery) return title;
      return title.replace(new RegExp(`(${this.searchQuery})`, "gi"), `<span style="background-color: rgba(0, 191, 166, 0.6); padding: 4px; border-radius: 5px;">$1</span>`);
    },
    toggleBookmark(podcast) {
      if (!this.isAuthenticated) return;
      const index = this.bookmarks.findIndex(item => item.title === podcast.title);
      if (index > -1) this.bookmarks.splice(index, 1);else this.bookmarks.push(podcast);
      this.savePreference('podcast_bookmarks', this.bookmarks);
    },
    isBookmarked(podcast) {
      return this.bookmarks.some(bookmark => bookmark.title === podcast.title);
    },
    // favouriting handled by unified methods below (audioUrl-based)

    // Ensure an index in the full filtered list is visible
    ensureVisible(fullIndex) {
      const need = fullIndex + 1;
      if (need > this.visibleCount) {
        this.visibleCount = Math.min(this.filteredAndSearchedPodcasts.length, need);
      }
    },
    setupInfiniteScroll() {
      const el = this.$refs.infiniteScrollTrigger;
      if (!el || typeof IntersectionObserver === 'undefined') return;
      if (this._infiniteObserver) {
        try {
          this._infiniteObserver.disconnect();
        } catch (e) {}
      }
      this._infiniteObserver = new IntersectionObserver(entries => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          // Defer to animation frame to keep scroll smooth
          requestAnimationFrame(() => this.loadMore());
        }
      }, {
        root: null,
        rootMargin: '600px',
        threshold: 0
      });
      this._infiniteObserver.observe(el);
    },
    loadMore() {
      if (this.isLoadingMore) return;
      if (this.visibleCount >= this.filteredAndSearchedPodcasts.length) return;
      this.isLoadingMore = true;
      const next = Math.min(this.filteredAndSearchedPodcasts.length, this.visibleCount + this.itemsPerLoad);
      this.visibleCount = next;
      // Append audio elements only for newly visible items
      this.$nextTick(() => {
        this.initializeAudioElements(true);
        this.isLoadingMore = false;
      });
    },
    // Prepare arrays; do not create Audio objects until play is requested
    initializeAudioElements(incremental = false) {
      if (!incremental) {
        this.audioElements = [];
      }
      const needed = this.visiblePodcasts.length;
      while (this.audioElements.length < needed) this.audioElements.push(null);
    },
    buildContinueListening() {
      if (!this.isAuthenticated) {
        this.continueListening = [];
        return;
      }
      try {
        const entries = Object.entries(this.progressMap || {}).map(([title, savedTime]) => ({
          title,
          savedTime: Number(savedTime || 0)
        })).filter(entry => !isNaN(entry.savedTime) && entry.savedTime >= 5);
        const withMeta = entries.map(entry => {
          const match = this.podcasts.find(p => p.title === entry.title) || this.filteredPodcasts.find(p => p.title === entry.title);
          return _objectSpread(_objectSpread({}, entry), {}, {
            duration: (match === null || match === void 0 ? void 0 : match.duration) || 0
          });
        });
        this.continueListening = withMeta.slice(0, 6);
      } catch (e) {
        this.continueListening = [];
      }
    },
    resumeFromSaved(item) {
      // Find index in current paginated list; if not present, attempt to locate in full list and adjust pagination
      const fullIndex = this.filteredAndSearchedPodcasts.findIndex(p => p.title === item.title);
      if (fullIndex >= 0) {
        this.ensureVisible(fullIndex);
        this.$nextTick(() => {
          const localIndex = this.visiblePodcasts.findIndex(p => p.title === item.title);
          if (localIndex >= 0) {
            this.playAudio(localIndex);
            if (this.currentlyPlaying) this.currentlyPlaying.currentTime = item.savedTime;
            this.showAudioPlayer = true;
          }
        });
      }
    },
    playAudio(index) {
      const podcast = this.visiblePodcasts[index];
      this.markAsPlayed(podcast);
      // Stop and reset previous
      if (this.currentlyPlaying && this.currentlyPlaying !== this.audioElements[index]) {
        try {
          this.currentlyPlaying.pause();
        } catch (e) {}
      }
      // Lazily create Audio instance if missing
      if (!this.audioElements[index]) {
        const audio = new Audio((podcast === null || podcast === void 0 ? void 0 : podcast.audioUrl) || '');
        audio.playbackRate = this.playbackSpeed;
        audio.volume = this.volume;
        audio.addEventListener('timeupdate', () => {
          this.updateProgress(index, audio);
          try {
            if (this.isAuthenticated && podcast !== null && podcast !== void 0 && podcast.title) {
              this.progressMap[podcast.title] = Number(audio.currentTime || 0);
              this.queueProgressSync();
            }
          } catch (e) {}
        }, {
          passive: true
        });
        audio.addEventListener('loadedmetadata', () => {
          this.progress[index] = 0;
        });
        audio.addEventListener('ended', () => this.handlePodcastEnd(index));
        this.audioElements[index] = audio;
      }
      this.isAudioPlaying = this.isAudioPlaying.map((_, i) => i === index);
      this.currentlyPlaying = this.audioElements[index];
      this.currentlyPlayingIndex = index;
      this.playingIndex = index;
      // Restore last position for this episode
      try {
        var _this$progressMap;
        const _podcast = this.visiblePodcasts[index];
        const saved = Number((_this$progressMap = this.progressMap) === null || _this$progressMap === void 0 ? void 0 : _this$progressMap[_podcast.title]);
        if (!isNaN(saved) && saved > 0 && this.currentlyPlaying && Math.abs((this.currentlyPlaying.currentTime || 0) - saved) > 1) {
          this.currentlyPlaying.currentTime = saved;
        }
      } catch (e) {}
      this.currentlyPlaying.play().catch(err => {
        console.error('Play error:', err);
        this.handlePodcastEnd(index);
      });
      this.isAudioPlaying[index] = true;
      this.showAudioPlayer = true;
      this.$nextTick(() => {
        const player = document.querySelector('.audio-player-container');
        if (player) player.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      });
      this.audioPlayerJustOpened = true;
      setTimeout(() => {
        this.audioPlayerJustOpened = false;
      }, 300);
    },
    pauseAudio(index) {
      const a = this.audioElements[index];
      if (a) {
        try {
          a.pause();
        } catch (e) {}
        this.isAudioPlaying[index] = false;
      }
    },
    toggleAudioPlayer(index) {
      if (!this.visiblePodcasts[index]) return;
      if (!this.isAudioPlaying[index]) {
        this.playAudio(index);
        this.playingIndex = index;
      } else {
        this.pauseAudio(index);
        this.playingIndex = null;
      }
    },
    stopAudio(index) {
      const a = this.audioElements[index];
      if (a) {
        try {
          a.pause();
        } catch (e) {}
        try {
          a.currentTime = 0;
        } catch (e) {}
        this.isAudioPlaying[index] = false;
        this.progress[index] = 0;
      }
    },
    rewindAudio(index) {
      const a = this.audioElements[index];
      if (a) a.currentTime = Math.max(0, a.currentTime - 15);
    },
    fastForwardAudio(index) {
      const a = this.audioElements[index];
      if (a) a.currentTime = Math.min(a.duration || 0, (a.currentTime || 0) + 20);
    },
    updateProgress(index) {
      const a = this.audioElements[index];
      if (a && a.duration) {
        const progress = a.currentTime / a.duration * 100;
        this.progress[index] = Math.min(100, progress);
      }
    },
    formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor(seconds % 3600 / 60);
      const secs = Math.floor(seconds % 60);
      return (hrs < 10 ? '0' : '') + hrs + ':' + (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
    },
    handlePodcastEnd(index) {
      if (this.isAudioPlaying[index]) {
        this.stopAudio(index);
        this.playingIndex = null;
        this.playNextPodcast();
      }
    },
    playNextPodcast() {
      if (this.visiblePodcasts.length > 0) {
        const nextIndex = (this.currentlyPlayingIndex + 1) % this.visiblePodcasts.length;
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
        this.audioElements.forEach(audio => {
          if (audio) audio.volume = this.volume;
        });
      }
      // Update the --val CSS variable for the volume slider
      this.$nextTick(() => {
        const slider = document.querySelector('.volume-slider');
        if (slider) {
          slider.style.setProperty('--val', this.volume);
        }
      });
      try {
        localStorage.setItem('content_volume', String(this.volume));
      } catch (e) {}
    },
    updatePlaybackSpeed() {
      try {
        localStorage.setItem('content_speed', String(this.playbackSpeed));
      } catch (e) {}
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach(audio => {
          if (audio) audio.playbackRate = this.playbackSpeed;
        });
      }
      if (this.currentlyPlaying) this.currentlyPlaying.playbackRate = this.playbackSpeed;
    },
    isFavourite(podcast) {
      return this.favourites.some(f => f.title === podcast.title && f.audioUrl === podcast.audioUrl);
    },
    toggleFavourite(podcast) {
      if (!this.isAuthenticated) {
        this.showLoginWarning(podcast, 'Please log in to save this episode.');
        return;
      }
      const exists = this.isFavourite(podcast);
      if (exists) {
        this.favourites = this.favourites.filter(f => !(f.title === podcast.title && f.audioUrl === podcast.audioUrl));
      } else {
        this.favourites = [{
          title: podcast.title,
          audioUrl: podcast.audioUrl,
          pubDate: podcast.pubDate,
          views: podcast.views,
          likedAt: Date.now()
        }, ...this.favourites].slice(0, 100);
      }
      this.savePreference('podcast_favourites', this.favourites);
    },
    playFromFavourites(fav) {
      const fullIndex = this.filteredAndSearchedPodcasts.findIndex(p => p.title === fav.title && p.audioUrl === fav.audioUrl);
      if (fullIndex >= 0) {
        this.ensureVisible(fullIndex);
        this.$nextTick(() => {
          const localIndex = this.visiblePodcasts.findIndex(p => p.title === fav.title && p.audioUrl === fav.audioUrl);
          if (localIndex >= 0) {
            this.playAudio(localIndex);
            this.showAudioPlayer = true;
          }
        });
      }
    },
    playFromHistory(item) {
      const fullIndex = this.filteredAndSearchedPodcasts.findIndex(p => p.title === item.title && p.audioUrl === item.audioUrl);
      if (fullIndex >= 0) {
        this.ensureVisible(fullIndex);
        this.$nextTick(() => {
          const localIndex = this.visiblePodcasts.findIndex(p => p.title === item.title && p.audioUrl === item.audioUrl);
          if (localIndex >= 0) {
            this.playAudio(localIndex);
            this.showAudioPlayer = true;
          }
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
      this.audioPlayerJustOpened = false;
    },
    handleAudioPlayerClick(event) {
      if (this.audioPlayerJustOpened) {
        this.audioPlayerJustOpened = false;
        return;
      }
      this.closeAudioPlayer();
    },
    handleKeydown(event) {
      if (event.key === 'Escape' && this.showAudioPlayer) {
        this.closeAudioPlayer();
      }
    },
    isNewEpisode(pubDate) {
      const now = new Date();
      const published = new Date(pubDate);
      const diffDays = (now - published) / (1000 * 60 * 60 * 24);
      return diffDays <= 7;
    },
    scrollToFirstEpisode() {
      this.$nextTick(() => {
        const firstEpisode = document.querySelector('.podcast-cards-grid .podcast-card-wrapper');
        if (firstEpisode) {
          firstEpisode.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    },
    seekAudio(event) {
      const bar = event.currentTarget;
      const rect = bar.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      const audio = this.audioElements[this.currentlyPlayingIndex];
      if (audio && audio.duration) {
        audio.currentTime = percent * audio.duration;
      }
    },
    startSeek(event) {
      this.isSeeking = true;
      this.seekAudio(event);
      window.addEventListener('mousemove', this.onSeekMove);
      window.addEventListener('mouseup', this.stopSeek);
    },
    onSeekMove(event) {
      if (this.isSeeking) {
        this.seekAudio(event);
      }
    },
    stopSeek() {
      this.isSeeking = false;
      window.removeEventListener('mousemove', this.onSeekMove);
      window.removeEventListener('mouseup', this.stopSeek);
    }
  },
  watch: {
    volume(newVal) {
      const audio = this.audioElements[this.currentlyPlayingIndex];
      if (audio) audio.volume = newVal;
    },
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
    visiblePodcasts(newPodcasts, oldPodcasts) {
      // If list shrank (filters changed), reset audio arrays; else append only
      if (!oldPodcasts || newPodcasts.length < oldPodcasts.length) {
        this.isAudioPlaying = new Array(newPodcasts.length).fill(false);
        this.progress = new Array(newPodcasts.length).fill(0);
        this.$nextTick(() => this.initializeAudioElements(false));
      } else if (newPodcasts.length > ((oldPodcasts === null || oldPodcasts === void 0 ? void 0 : oldPodcasts.length) || 0)) {
        // Append new audio elements for the newly revealed items
        const added = newPodcasts.length - ((oldPodcasts === null || oldPodcasts === void 0 ? void 0 : oldPodcasts.length) || 0);
        this.isAudioPlaying.push(...new Array(added).fill(false));
        this.progress = _objectSpread({}, this.progress);
        this.$nextTick(() => this.initializeAudioElements(true));
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      question: "",
      loading: false,
      chatHistory: [],
      // Store the entire conversation history
      showChat: false,
      // Flag to toggle chat visibility
      isExpanded: false,
      // Flag to toggle expanded state
      apiToken: process.env.HF_API_KEY || "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",
      // API token
      editingIndex: null,
      // Track the index of the message being edited
      defaultMessage: {
        type: "bot",
        text: "Assalamu Alaikum! How can I assist you with Islamic knowledge today?"
      },
      commonQuestions: ["What are the Five Pillars of Islam?", "What is the significance of Ramadan?", "Who is Prophet Muhammad (PBUH)?", "What is the Quran?", "What is the importance of Salah (prayer)?", "What is Zakat and who is it for?", "What is Hajj and why is it important?", "What is the meaning of Tawheed?", "What are the major sins in Islam?", "What is the Day of Judgment in Islam?"]
    };
  },
  methods: {
    sanitizeText(text) {
      // Removes special characters except common punctuation
      return text.replace(/[^a-zA-Z0-9\s.,'"/:;-]/g, '');
    },
    formatTimestamp(timestamp) {
      if (!timestamp) {
        return new Date().toLocaleString(); // Use the current date/time if timestamp is missing
      }
      return new Date(timestamp).toLocaleString(); // Format existing timestamp
    },
    // Save chat history to localStorage
    saveChat() {
      const chatName = prompt('Enter a name for this conversation:');
      if (chatName) {
        const savedChats = JSON.parse(localStorage.getItem('savedChats') || {});
        savedChats[chatName] = this.chatHistory;
        localStorage.setItem('savedChats', JSON.stringify(savedChats));
        alert('Chat saved successfully!');
      } else {
        alert('Please provide a name for the conversation.');
      }
    },
    // Retrieve a list of saved conversations
    getSavedChats() {
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || {});
      return Object.keys(savedChats);
    },
    // Download chat history as a text file
    downloadChat() {
      const chatText = this.chatHistory.map(message => `${message.timestamp} - ${message.type === 'user' ? 'Question: ' : 'Answer: '}: ${message.text}`).join('\n');

      // Generate a filename with the current date and time
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
      const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS
      const fileName = `chat_history_${formattedDate}_${formattedTime}.txt`;
      const blob = new Blob([chatText], {
        type: 'text/plain'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Use the generated filename
      a.click();
      URL.revokeObjectURL(url);
    },
    // Load chat history from localStorage
    loadChat(chatName) {
      const savedChats = JSON.parse(localStorage.getItem('savedChats') || {});
      if (savedChats[chatName]) {
        this.chatHistory = savedChats[chatName];
        alert(`Chat "${chatName}" loaded successfully!`);
      } else {
        alert('No saved chat found with that name.');
      }
    },
    // Copy question and answer to clipboard
    copyQuestionAndAnswer(index) {
      if (index > 0 && this.chatHistory[index - 1].type === 'user') {
        const question = this.chatHistory[index - 1].text;
        const answer = this.chatHistory[index].text;
        const textToCopy = `Question: ${question}\nAnswer: ${answer}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert('Copied to clipboard!');
        }).catch(err => {
          console.error('Failed to copy:', err);
          alert('Failed to copy. Please try again.');
        });
      } else {
        alert('No question found to copy.');
      }
    },
    // Share question and answer on WhatsApp
    shareOnWhatsApp(index) {
      const questionIndex = index - 1;
      if (questionIndex >= 0 && this.chatHistory[questionIndex].type === 'user') {
        const question = this.chatHistory[questionIndex].text;
        const answer = this.chatHistory[index].text;

        // Format the message
        const message = `Question: ${question}\nAnswer: ${answer}`;

        // Encode the message for the WhatsApp URL
        const encodedMessage = encodeURIComponent(message);

        // Generate the WhatsApp share link
        const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;

        // Open the link in a new tab
        window.open(whatsappURL, "_blank");
      } else {
        console.warn("Invalid message index for sharing.");
      }
    },
    // Initialize Speech Recognition
    startSpeechRecognition() {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; // Set language
        recognition.interimResults = false; // Only final results
        recognition.maxAlternatives = 1; // Only one result

        // Start recognition
        recognition.start();

        // Handle result event
        recognition.onresult = event => {
          const transcript = event.results[0][0].transcript;
          this.question = transcript; // Set the recognized text to the input field
        };

        // Handle error event
        recognition.onerror = event => {
          console.error('Speech recognition error:', event.error);
          alert('Speech recognition failed. Please try again.');
        };

        // Handle end event
        recognition.onend = () => {
          console.log('Speech recognition ended.');
        };
      } else {
        alert('Speech recognition is not supported in this browser.');
      }
    },
    // Text-to-Speech for bot answers
    speakText(text) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Set language (optional)
        utterance.rate = 1; // Speed of speech (optional)
        utterance.pitch = 1; // Pitch of speech (optional)
        window.speechSynthesis.speak(utterance); // Speak the text
      } else {
        console.warn('Text-to-Speech is not supported in this browser.');
      }
    },
    // Toggles the visibility of the chatbox
    toggleChat() {
      this.showChat = !this.showChat;
      this.isExpanded = false; // Reset expanded state when toggling chat

      // Add a default message when opening the chat for the first time
      if (this.showChat && this.chatHistory.length === 0) {
        this.addMessage("bot", "Assalamu Alaikum! How can I assist you with Islamic knowledge today?");
      }
    },
    // Toggles the expanded state of the chatbox
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    // Auto-send a common question
    autoSendQuestion(question) {
      this.question = question;
      this.getAnswer();
    },
    // Adds a message to the chat history
    addMessage(type, text) {
      const timestamp = new Date().toLocaleString(); // Get current date and time
      this.chatHistory.push({
        type,
        text,
        timestamp
      }); // Add timestamp to the message
    },
    // Scroll to the latest message and always keep it at the bottom
    scrollToBottom() {
      const messagesContainer = this.$refs.messagesContainer;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
    // Edit a question
    editQuestion(index) {
      this.question = this.chatHistory[index].text; // Load the question into the input field
      this.editingIndex = index; // Track which message is being edited
    },
    async getAnswer() {
      if (!this.question.trim()) {
        return; // Don't fetch if the question is empty
      }

      // If editing, remove the old bot response and update the question
      if (this.editingIndex !== null) {
        var _this$chatHistory;
        // Remove the bot's response that follows the edited question
        if (((_this$chatHistory = this.chatHistory[this.editingIndex + 1]) === null || _this$chatHistory === void 0 ? void 0 : _this$chatHistory.type) === 'bot') {
          this.chatHistory.splice(this.editingIndex + 1, 1); // Remove the bot's response
        }
        // Update the user's question
        this.chatHistory[this.editingIndex].text = this.question;
        this.editingIndex = null; // Reset editing state
      } else {
        // Add user question to chat history
        this.addMessage('user', this.question);
      }
      this.loading = true;
      const userQuestion = this.question;
      this.question = ""; // Clear input field

      try {
        const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiToken}`
          },
          body: JSON.stringify({
            inputs: userQuestion,
            parameters: {
              max_new_tokens: 600
            }
          })
        });
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
          let answerText = data[0].generated_text.trim();

          // Remove the question from the answer if included
          if (answerText.toLowerCase().startsWith(userQuestion.toLowerCase())) {
            answerText = answerText.slice(userQuestion.length).trim();
          }

          // Add bot's response to chat history
          this.addMessage('bot', answerText);
        } else {
          // If no answer is found
          this.addMessage('bot', "Sorry, I couldn't find an answer. Try rephrasing your question.");
        }
      } catch (err) {
        this.addMessage('bot', "Failed to fetch the answer. Please try again.");
        console.error(err);
      } finally {
        this.loading = false;
        this.scrollToBottom(); // Scroll to the latest answer
      }
    },
    // Clears the entire chat history
    clearChat() {
      this.chatHistory = [];
    }
  },
  watch: {
    // Automatically scroll to bottom when a new message is added
    chatHistory() {
      this.$nextTick(this.scrollToBottom);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=template&id=e4489e22&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=template&id=e4489e22&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-4"
};
const _hoisted_2 = {
  class: "selection-section"
};
const _hoisted_3 = {
  class: "podcast-selection-grid"
};
const _hoisted_4 = ["onClick"];
const _hoisted_5 = {
  class: "podcast-image-wrapper",
  style: {
    "position": "relative",
    "overflow": "hidden",
    "aspect-ratio": "1"
  }
};
const _hoisted_6 = ["src", "alt"];
const _hoisted_7 = {
  key: 0,
  class: "selected-podcast-section card-teal",
  ref: "podcastDetailSection",
  style: 'position:relative;overflow:hidden;padding:2rem;box-shadow:0 10px 40px rgba(0,0,0,.12);border:2px solid rgba(11,179,154,.12)'
};
const _hoisted_8 = {
  class: "selected-podcast-header",
  style: 'display:flex;align-items:center;gap:1.5rem;margin-bottom:1rem'
};
const _hoisted_9 = {
  class: "selected-podcast-info"
};
const _hoisted_10 = {
  class: "selected-podcast-title",
  style: 'font-size:2rem;font-weight:800;color:#0b1320;margin:0 0 .5rem'
};
const _hoisted_11 = {
  class: "selected-podcast-meta",
  style: 'display:flex;gap:.75rem;flex-wrap:wrap'
};
const _hoisted_12 = {
  class: "episode-count",
  style: 'display:flex;align-items:center;gap:.5rem;padding:.5rem 1rem;background:rgba(11,179,154,.15);border-radius:20px;color:#0bb39a;border:2px solid rgba(11,179,154,.2);font-weight:600'
};
const _hoisted_13 = {
  class: "selected-podcast-image-container"
};
const _hoisted_14 = ["src", "alt"];
const _hoisted_15 = {
  class: "selected-podcast-description",
  style: 'color:#495057;line-height:1.7;font-size:1.05rem'
};
const _hoisted_16 = {
  key: 1,
  class: "continue-listening-section"
};
const _hoisted_17 = {
  class: "podcast-cards-grid border-md card-teal",
  style: {
    "padding": "5px"
  }
};
const _hoisted_18 = {
  class: "podcast-card",
  style: {
    "padding": "1.2rem"
  }
};
const _hoisted_19 = {
  class: "card-body"
};
const _hoisted_20 = {
  class: "podcast-card-top"
};
const _hoisted_21 = ["src", "alt"];
const _hoisted_22 = {
  class: "podcast-card-info"
};
const _hoisted_23 = {
  class: "podcast-title"
};
const _hoisted_24 = {
  class: "podcast-extra-info"
};
const _hoisted_25 = {
  class: "duration-badge"
};
const _hoisted_26 = {
  class: "audio-controls-inline"
};
const _hoisted_27 = ["onClick"];
const _hoisted_28 = {
  key: 2,
  class: "favorites-section"
};
const _hoisted_29 = {
  class: "favorites-hero"
};
const _hoisted_30 = {
  class: "favorites-hero__actions"
};
const _hoisted_31 = {
  class: "favorites-count"
};
const _hoisted_32 = {
  class: "favorites-grid"
};
const _hoisted_33 = {
  class: "card-body"
};
const _hoisted_34 = {
  class: "podcast-card-top"
};
const _hoisted_35 = ["src", "alt"];
const _hoisted_36 = {
  class: "podcast-card-info"
};
const _hoisted_37 = {
  class: "podcast-title"
};
const _hoisted_38 = {
  class: "podcast-extra-info favorites-meta"
};
const _hoisted_39 = {
  class: "favorite-chip",
  title: 'Published'
};
const _hoisted_40 = {
  key: 0,
  class: "favorite-chip",
  title: 'Liked on'
};
const _hoisted_41 = {
  class: "audio-controls-inline favorites-actions"
};
const _hoisted_42 = ["onClick"];
const _hoisted_43 = ["onClick"];
const _hoisted_44 = {
  key: 3,
  class: "episodes-section"
};
const _hoisted_45 = {
  key: 0,
  class: "alert alert-danger",
  role: "alert"
};
const _hoisted_46 = {
  class: "episodes-filters-bar-wrapper",
  style: 'background:linear-gradient(135deg,#f5fff1 0%,#e0f6ec 60%,#d3edf5 100%);border:1px solid rgba(11,179,154,0.25);border-radius:10px;padding:.5rem .75rem;margin-bottom:1rem;position:sticky;top:8px;z-index:50'
};
const _hoisted_47 = {
  class: "row g-2 align-items-center"
};
const _hoisted_48 = {
  class: "col-12 col-md-6 order-2 order-md-1"
};
const _hoisted_49 = {
  class: "input-group",
  style: 'display:flex;align-items:center;background:#fff;border:1px solid #dbe5e8;border-radius:10px;height:40px'
};
const _hoisted_50 = {
  class: "col-md-6 d-none d-md-flex order-1 order-md-2 justify-content-end gap-2"
};
const _hoisted_51 = {
  class: "col-12 d-flex d-md-none justify-content-between order-1"
};
const _hoisted_52 = {
  key: 0,
  class: "mt-2 d-md-none"
};
const _hoisted_53 = {
  class: "d-grid gap-2"
};
const _hoisted_54 = {
  key: 1,
  class: "loading-container"
};
const _hoisted_55 = {
  key: 2,
  class: "podcast-cards-grid border-md",
  style: {
    "padding": "5px"
  }
};
const _hoisted_56 = {
  class: "card-header",
  style: 'border-bottom:1px solid rgba(0,0,0,.06);padding-bottom:.5rem'
};
const _hoisted_57 = {
  key: 0,
  class: "alert alert-warning episode-warning",
  role: "alert"
};
const _hoisted_58 = {
  class: "episode-warning-text"
};
const _hoisted_59 = {
  class: "meta-text",
  style: 'color:#0b1320;font-weight:600'
};
const _hoisted_60 = {
  class: "meta-text",
  style: 'color:#0b1320;font-weight:600'
};
const _hoisted_61 = {
  key: 0,
  class: "new-badge",
  "aria-label": "New episode"
};
const _hoisted_62 = {
  class: "card-body",
  style: 'padding-top:1rem'
};
const _hoisted_63 = ["src", "alt"];
const _hoisted_64 = {
  class: "podcast-card-info"
};
const _hoisted_65 = ["innerHTML"];
const _hoisted_66 = {
  class: "podcast-extra-info"
};
const _hoisted_67 = {
  class: "lang-badge",
  title: 'Language',
  style: 'display:flex;align-items:center;gap:.35rem;background:#f8f9fa;border-radius:20px;padding:2px 10px;box-shadow:0 1px 4px rgba(0,0,0,.04);border:1px solid rgba(11,179,154,.18);color:#0b1320;font-weight:600'
};
const _hoisted_68 = {
  class: "audio-controls-inline"
};
const _hoisted_69 = ["onClick", "aria-label"];
const _hoisted_70 = ["aria-pressed", "title", "aria-label", "onClick"];
const _hoisted_71 = {
  ref: "infiniteScrollTrigger",
  style: {
    "height": "1px"
  }
};
const _hoisted_72 = {
  key: 3,
  class: "loading-container",
  style: {
    "margin-top": "8px"
  }
};
const _hoisted_73 = {
  key: 4,
  class: "audio-player-container",
  style: 'border-radius:20px 20px 0 0;position:fixed;bottom:0;left:0;width:100%;background:linear-gradient(180deg,#2b3a3f 0%,#1e262a 100%);box-shadow:0 -10px 30px rgba(0,0,0,.35);z-index:1000;padding:12px 16px;border-top:1px solid rgba(255,255,255,.06)'
};
const _hoisted_74 = {
  class: "controls"
};
const _hoisted_75 = {
  class: "controls-left"
};
const _hoisted_76 = {
  key: 0,
  class: "artwork"
};
const _hoisted_77 = ["src", "alt"];
const _hoisted_78 = {
  class: "control-group"
};
const _hoisted_79 = ["aria-pressed", "aria-label", "title"];
const _hoisted_80 = {
  key: 0,
  class: "bi bi-pause-fill",
  "aria-hidden": "true"
};
const _hoisted_81 = {
  key: 1,
  class: "bi bi-play-fill",
  "aria-hidden": "true"
};
const _hoisted_82 = {
  class: "info-section",
  "aria-live": "polite"
};
const _hoisted_83 = {
  key: 0,
  class: "episode-title"
};
const _hoisted_84 = {
  class: "time"
};
const _hoisted_85 = {
  class: "audio-actions"
};
const _hoisted_86 = {
  class: "audio-actions__group"
};
const _hoisted_87 = ["aria-expanded"];
const _hoisted_88 = {
  class: "audio-actions__group"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$data$audioElements$, _$data$audioElements$2;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header Section "), _cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold"
  }, "Islamic Audio Library"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead"
  }, " Tune into thoughtfully curated Islamic audio that brings together scholars, storytellers, and community voices. Every episode blends reflection, practical guidance, and inspiration to help deepen your connection and spark meaningful conversations throughout your day. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Podcast Selection Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-subtitle"
  }, "Tap on a podcast to unlock immersive audio journeys and fresh perspectives.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.islamicPodcasts, podcast => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: podcast.rssUrl,
      class: "podcast-selection-item",
      onClick: $event => $options.selectPodcast(podcast),
      style: 'border-radius:20px;background:linear-gradient(135deg,#ffffff,#ecfff7);border:1px solid rgba(11,179,154,.18);box-shadow:0 12px 26px rgba(11,179,154,.12),0 6px 14px rgba(0,0,0,.04);overflow:hidden;transition:transform .12s ease-out, box-shadow .12s ease-out;cursor:pointer'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: podcast.image,
      alt: podcast.name,
      class: "podcast-selection-image",
      loading: "lazy",
      style: {
        "width": "100%",
        "height": "100%",
        "object-fit": "cover",
        "transition": "transform .12s ease-out, filter .12s ease-out"
      }
    }, null, 8 /* PROPS */, _hoisted_6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "podcast-overlay",
      style: 'position:absolute;inset:0;background:linear-gradient(180deg, rgba(10,155,209,.78), rgba(11,179,154,.88));display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.4rem;opacity:0;transition:opacity .12s ease-out',
      onMouseenter: _cache[0] || (_cache[0] = $event => {
        $event.currentTarget.previousElementSibling.style.transform = 'scale(1.04)';
        $event.currentTarget.previousElementSibling.style.filter = 'saturate(1.03)';
        $event.currentTarget.style.opacity = 1;
      }),
      onMouseleave: _cache[1] || (_cache[1] = $event => {
        $event.currentTarget.previousElementSibling.style.transform = 'scale(1)';
        $event.currentTarget.previousElementSibling.style.filter = 'saturate(1)';
        $event.currentTarget.style.opacity = 0;
      })
    }, [...(_cache[25] || (_cache[25] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-circle-fill"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "play-text"
    }, "Click to Select", -1 /* CACHED */)]))], 32 /* NEED_HYDRATION */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <h5 class=\"podcast-selection-name fw-bold\" :style=\"'padding:1.25rem;margin:0;font-size:1.15rem;color:#0b1320;text-align:center;background:#fff'\">{{ podcast.name }}</h5> ")], 8 /* PROPS */, _hoisted_4);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Selected Podcast Details "), $data.selectedPodcast ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedPodcast.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-collection-play"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedPodcast.episodeCount > 0 ? $data.selectedPodcast.episodeCount : 'Data not available') + " Episodes Available ", 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.selectedPodcast.image,
    alt: $data.selectedPodcast.name,
    class: "selected-podcast-image",
    loading: "lazy",
    style: 'width:120px;height:120px;object-fit:cover;border-radius:20px;border:3px solid #fff;box-shadow:0 10px 30px rgba(0,0,0,.2)'
  }, null, 8 /* PROPS */, _hoisted_14)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedPodcast.desc), 1 /* TEXT */)])], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Continue Listening Section "), $data.selectedPodcast && $data.continueListening.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title",
    style: {
      "background-image": "none",
      "-webkit-text-fill-color": "initial",
      "color": "#0b1320"
    }
  }, "Continue Listening"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-subtitle"
  }, "Pick up where you left off")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.continueListening, (item, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "podcast-card-wrapper"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [$data.selectedPodcast && $data.selectedPodcast.image ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
      key: 0,
      src: $data.selectedPodcast.image,
      alt: $data.selectedPodcast.name,
      class: "episode-avatar",
      loading: "lazy"
    }, null, 8 /* PROPS */, _hoisted_21)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clock",
      style: {
        "font-size": "1.1rem"
      }
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(item.savedTime)) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(item.duration || 0)), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "control-button play-btn",
      onClick: $event => $options.resumeFromSaved(item),
      "aria-label": "Resume"
    }, [...(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-fill",
      style: {
        "font-size": "1.5rem",
        "cursor": "pointer"
      }
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_27)])])])])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Favorites Section "), $data.favourites && $data.favourites.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "favorites-hero__text"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "favorites-kicker"
  }, "Saved for you"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "favorites-title"
  }, "Favorites"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "favorites-subtitle"
  }, "Quick access to episodes you loved")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.favourites.length) + " saved", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "favorites-toggle",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleVisibility && $options.toggleVisibility(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.isVisible ? 'fa-eye-slash' : 'fa-eye'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isVisible ? 'Hide favorites' : 'Show favorites'), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade",
    persisted: ""
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.favourites, fav => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: fav.title + fav.audioUrl,
        class: "podcast-card-wrapper"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['podcast-card', 'favorite-card', {
          'highlighted': $options.isCurrentlyPlaying(fav)
        }])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [$data.selectedPodcast && $data.selectedPodcast.image ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
        key: 0,
        src: $data.selectedPodcast.image,
        alt: $data.selectedPodcast.name,
        class: "episode-avatar",
        loading: "lazy"
      }, null, 8 /* PROPS */, _hoisted_35)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(fav.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-calendar-alt"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(fav.pubDate)), 1 /* TEXT */)]), fav.likedAt ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_40, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-heart"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(new Date(fav.likedAt).toLocaleString()), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "control-button play-btn favorite-play",
        onClick: $event => $options.playFromFavourites(fav),
        title: "Play"
      }, [...(_cache[34] || (_cache[34] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-play"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_42), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "control-button favorite-remove",
        onClick: $event => $options.toggleFavourite(fav),
        title: "Remove from favorites"
      }, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-heart"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_43)])])])], 2 /* CLASS */)]);
    }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.isVisible]])]),
    _: 1 /* STABLE */
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Podcast Episodes Section "), !$data.loading && $options.visiblePodcasts.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "section-title",
    style: {
      "background-image": "none",
      "-webkit-text-fill-color": "initial",
      "color": "#0b1320"
    }
  }, "Episodes"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "section-subtitle"
  }, "Press play to experience each episode’s rich audio storytelling.")], -1 /* CACHED */)), $data.fetchError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.fetchError), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text bg-white border-end-0",
    style: 'border:0;border-right:1px solid #eef2f4;border-radius:10px 0 0 10px;color:#06b6ac;font-size:1rem'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.searchInput = $event),
    onInput: _cache[4] || (_cache[4] = (...args) => $options.onSearchInput && $options.onSearchInput(...args)),
    type: "text",
    class: "form-control border-start-0",
    placeholder: "Search episodes...",
    style: 'border:0;border-radius:0 10px 10px 0;padding:6px 10px;font-size:.95rem'
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchInput]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Inline filters on md+, compact "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.durationFilter = $event),
    class: "form-select",
    "aria-label": "Filter by duration",
    style: 'max-width:160px;height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'
  }, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" disabled selected hidden data-v-e4489e22>Duration</option><option value=\"0-10\" data-v-e4489e22>0-10 min</option><option value=\"10-30\" data-v-e4489e22>10-30 min</option><option value=\"30-60\" data-v-e4489e22>30-60 min</option><option value=\"more-than-60\" data-v-e4489e22>60+ min</option>", 5)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.durationFilter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.languageFilter = $event),
    class: "form-select",
    "aria-label": "Filter by language",
    style: 'max-width:150px;height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'
  }, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: ""
  }, "Languages", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "English"
  }, "English", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "Arabic"
  }, "Arabic", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "Unknown"
  }, "Unknown", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.languageFilter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.sortOption = $event),
    class: "form-select",
    "aria-label": "Sort episodes",
    style: 'max-width:150px;height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'
  }, [...(_cache[39] || (_cache[39] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "mostViewed"
  }, "Most Viewed", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "leastViewed"
  }, "Least Viewed", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "newest"
  }, "Newest", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "oldest"
  }, "Oldest", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sortOption]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Mobile toggle button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-light w-100",
    onClick: _cache[8] || (_cache[8] = $event => $data.showFilters = !$data.showFilters),
    style: 'border:1px solid #dbe5e8;border-radius:10px;height:40px'
  }, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-funnel me-2"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Filters ", -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Collapsible mobile filters "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.showFilters ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.durationFilter = $event),
      class: "form-select",
      "aria-label": "Filter by duration",
      style: 'height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'
    }, [...(_cache[41] || (_cache[41] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "",
      disabled: "",
      selected: "",
      hidden: ""
    }, "Duration", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "0-10"
    }, "0-10 min", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "10-30"
    }, "10-30 min", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "30-60"
    }, "30-60 min", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "more-than-60"
    }, "60+ min", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.durationFilter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $data.languageFilter = $event),
      class: "form-select",
      "aria-label": "Filter by language",
      style: 'height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'
    }, [...(_cache[42] || (_cache[42] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: ""
    }, "Languages", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "English"
    }, "English", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "Arabic"
    }, "Arabic", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "Unknown"
    }, "Unknown", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.languageFilter]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => $data.sortOption = $event),
      class: "form-select",
      "aria-label": "Sort episodes",
      style: 'height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'
    }, [...(_cache[43] || (_cache[43] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "mostViewed"
    }, "Most Viewed", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "leastViewed"
    }, "Least Viewed", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "newest"
    }, "Newest", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      value: "oldest"
    }, "Oldest", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.sortOption]])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, [...(_cache[44] || (_cache[44] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "loading-spinner"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")])], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "loading-text"
  }, "Loading episodes, please wait...", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "loading-subtext"
  }, "This may take a few moments", -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.visiblePodcasts, (podcast, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: podcast.title,
      class: "podcast-card-wrapper"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['podcast-card', {
        'highlighted': $data.playingIndex === index
      }]),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(($data.playingIndex === index ? 'outline:2px solid #0bb39a;background:linear-gradient(135deg,#f0fffb 0%,#ddfff5 100%);box-shadow:0 14px 30px rgba(11,179,154,.26),0 1.5px 8px rgba(0,0,0,.06);' : '') + 'padding:1.2rem;border-radius:20px;background:linear-gradient(135deg,#ffffff,#eefef9);border:1px solid rgba(11,179,154,.18);box-shadow:0 8px 18px rgba(0,0,0,.08);transition:transform .12s ease-out, box-shadow .12s ease-out')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [$data.loginWarnings[$options.getEpisodeKey(podcast)] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-shield-lock-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.loginWarnings[$options.getEpisodeKey(podcast)]), 1 /* TEXT */), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "episode-warning-cta",
      href: "/login"
    }, "Log in", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "podcast-meta",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)('display:flex;justify-content:space-between;align-items:center;gap:' + ($data.smallScreen ? '8px' : '16px'))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "views-badge",
      title: 'Views',
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)('display:flex;align-items:center;gap:8px;padding:' + ($data.smallScreen ? '6px 10px' : '8px 14px') + ';background:#fff;border-radius:20px;border:1px solid rgba(11,179,154,.18);box-shadow:0 4px 10px rgba(0,0,0,.06)')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-eye-fill",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)('font-size:' + ($data.smallScreen ? '1rem' : '1.1rem') + ';color:#0bb39a')
    }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_59, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(podcast.views) + " views", 1 /* TEXT */)], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "date-badge",
      title: 'Published date',
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)('display:flex;align-items:center;gap:8px;padding:' + ($data.smallScreen ? '6px 10px' : '8px 14px') + ';background:#fff;border-radius:20px;border:1px solid rgba(11,179,154,.18);box-shadow:0 4px 10px rgba(0,0,0,.06)')
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-calendar3",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)('font-size:' + ($data.smallScreen ? '1rem' : '1.1rem') + ';color:#0bb39a')
    }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatDate(podcast.pubDate)), 1 /* TEXT */), $options.isNewEpisode(podcast.pubDate) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_61, "NEW")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */)], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "podcast-card-top",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)('display:flex;align-items:center;gap:' + ($data.smallScreen ? '.5rem' : '1rem') + ';justify-content:space-between;' + ($data.smallScreen ? 'flex-direction:column;align-items:stretch;' : ''))
    }, [$data.selectedPodcast && $data.selectedPodcast.image ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
      key: 0,
      src: $data.selectedPodcast.image,
      alt: $data.selectedPodcast.name,
      class: "episode-avatar podcast-image-clickable",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(['width:100px;height:100px;object-fit:cover;margin-right:1rem;border:2px solid #e9ecef;border-radius:20px;box-shadow:0 8px 22px rgba(0,0,0,.10);background:#fff', {
        "cursor": "pointer"
      }]),
      decoding: "async",
      fetchpriority: "low",
      onClick: _cache[12] || (_cache[12] = (...args) => $options.scrollToFirstEpisode && $options.scrollToFirstEpisode(...args)),
      loading: "lazy"
    }, null, 8 /* PROPS */, _hoisted_63)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: "podcast-title",
      innerHTML: $options.highlightText(podcast.title),
      style: 'color:#0b1320;font-weight:800'
    }, null, 8 /* PROPS */, _hoisted_65), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <span class=\"duration-badge\" :title=\"'Duration'\">\n                      <i class=\"bi bi-clock\" style=\"font-size:1.1rem;\"></i>\n                      {{ podcast.duration ? podcast.duration + ' min' : 'N/A' }}\n                    </span> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_67, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-translate",
      style: 'font-size:1.05rem;color:#0bb39a'
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(podcast.language), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["control-button play-btn", {
        'playing': $data.isAudioPlaying[index]
      }]),
      onClick: $event => $options.toggleAudioPlayer(index),
      "aria-label": $data.isAudioPlaying[index] ? 'Pause' : 'Play'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.isAudioPlaying[index] ? 'bi-pause-fill' : 'bi-play-fill']),
      style: {
        "font-size": "1.5rem",
        "cursor": "pointer",
        "color": "#0b1320"
      }
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_69), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "control-button",
      "aria-pressed": $options.isFavourite(podcast) ? 'true' : 'false',
      title: $options.isFavourite(podcast) ? 'Unfavorite' : 'Favorite',
      "aria-label": $options.isFavourite(podcast) ? 'Unfavorite' : 'Favorite',
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleFavourite(podcast), ["stop"])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $options.isFavourite(podcast) ? 'bi-heart-fill text-danger' : 'bi-heart']),
      style: {
        "font-size": "1.3rem"
      }
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_70)])], 4 /* STYLE */)])], 6 /* CLASS, STYLE */)]);
  }), 128 /* KEYED_FRAGMENT */))])), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Infinite scroll sentinel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, null, 512 /* NEED_PATCH */), $data.isLoadingMore ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_72, [...(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success",
    role: "status",
    style: {
      "width": "1.5rem",
      "height": "1.5rem"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" empty state hidden by request "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Audio Player "), $data.showAudioPlayer ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["custom-audio-player", {
      minimized: $data.isPlayerMinimized
    }]),
    style: 'max-width:100%;margin:0 auto;padding:12px;color:#e8f0f2;display:flex;flex-direction:column;gap:10px'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [$data.selectedPodcast && $data.selectedPodcast.image ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.selectedPodcast.image,
    alt: $data.selectedPodcast.name
  }, null, 8 /* PROPS */, _hoisted_77)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[13] || (_cache[13] = $event => $options.rewindAudio($data.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Rewind 15 seconds",
    "aria-label": "Rewind 15 seconds"
  }, [...(_cache[50] || (_cache[50] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-backward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[14] || (_cache[14] = $event => $options.toggleAudioPlayer($data.currentlyPlayingIndex)),
    class: "control-btn play-pause",
    "aria-pressed": !!$data.isAudioPlaying[$data.currentlyPlayingIndex],
    "aria-label": $data.isAudioPlaying[$data.currentlyPlayingIndex] ? 'Pause' : 'Play',
    title: $data.isAudioPlaying[$data.currentlyPlayingIndex] ? 'Pause' : 'Play'
  }, [$data.isAudioPlaying[$data.currentlyPlayingIndex] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_80)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("i", _hoisted_81))], 8 /* PROPS */, _hoisted_79), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[15] || (_cache[15] = $event => $options.fastForwardAudio($data.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Forward 20 seconds",
    "aria-label": "Forward 20 seconds"
  }, [...(_cache[51] || (_cache[51] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-skip-forward-fill"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[16] || (_cache[16] = $event => $options.stopAudio($data.currentlyPlayingIndex)),
    class: "control-btn",
    title: "Stop",
    "aria-label": "Stop"
  }, [...(_cache[52] || (_cache[52] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-stop-fill"
  }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [$options.visiblePodcasts[$data.currentlyPlayingIndex] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_83, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.visiblePodcasts[$data.currentlyPlayingIndex].title), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_84, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(((_$data$audioElements$ = $data.audioElements[$data.currentlyPlayingIndex]) === null || _$data$audioElements$ === void 0 ? void 0 : _$data$audioElements$.currentTime) || 0)) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTime(((_$data$audioElements$2 = $data.audioElements[$data.currentlyPlayingIndex]) === null || _$data$audioElements$2 === void 0 ? void 0 : _$data$audioElements$2.duration) || 0)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[17] || (_cache[17] = (...args) => $options.toggleVolume && $options.toggleVolume(...args)),
    class: "control-btn",
    title: "Volume",
    "aria-expanded": $data.showVolumeBar ? 'true' : 'false',
    "aria-controls": "player-volume"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", `bi-volume-${$data.volume > 0.5 ? 'up' : $data.volume > 0 ? 'down' : 'mute'}-fill`])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_87), $data.showVolumeBar ? (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)(((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("input", {
    key: 0,
    id: "player-volume",
    type: "range",
    min: "0",
    max: "1",
    step: "0.01",
    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => $data.volume = $event),
    onInput: _cache[19] || (_cache[19] = (...args) => $options.updateVolume && $options.updateVolume(...args)),
    class: "volume-slider",
    "aria-label": "Volume"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */)), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.volume, void 0, {
    number: true
  }]]) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "speedSelect",
    class: "visually-hidden"
  }, "Speed", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "speedSelect",
    "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => $data.playbackSpeed = $event),
    onChange: _cache[21] || (_cache[21] = (...args) => $options.updatePlaybackSpeed && $options.updatePlaybackSpeed(...args)),
    class: "form-select form-select-sm audio-speed-select"
  }, [...(_cache[53] || (_cache[53] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 0.75
  }, "0.75x", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 1
  }, "1x", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 1.25
  }, "1.25x", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 1.5
  }, "1.5x", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: 2
  }, "2x", -1 /* CACHED */)]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.playbackSpeed, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[22] || (_cache[22] = (...args) => $options.closeAudioPlayer && $options.closeAudioPlayer(...args)),
    class: "control-btn close-btn",
    title: "Close"
  }, [...(_cache[55] || (_cache[55] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-lg"
  }, null, -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    onMousedown: _cache[23] || (_cache[23] = (...args) => $options.startSeek && $options.startSeek(...args)),
    onClick: _cache[24] || (_cache[24] = (...args) => $options.seekAudio && $options.seekAudio(...args)),
    style: 'width:100%;height:6px;background:linear-gradient(90deg,rgba(255,255,255,.18),rgba(255,255,255,.08));cursor:pointer;position:relative;margin:6px 0;border-radius:999px'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $data.progress[$data.currentlyPlayingIndex] + '%',
      height: '100%',
      background: 'linear-gradient(90deg,#0bb39a,#0a9bd1)',
      position: 'absolute',
      borderRadius: '999px'
    })
  }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-handle",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      left: $data.progress[$data.currentlyPlayingIndex] + '%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 0 0 3px rgba(11,179,154,.25)',
      pointerEvents: 'none'
    })
  }, null, 4 /* STYLE */)], 32 /* NEED_HYDRATION */)], 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=template&id=14b64f56&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=template&id=14b64f56&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container"
};
const _hoisted_2 = {
  class: "chat-header"
};
const _hoisted_3 = {
  class: "header-buttons"
};
const _hoisted_4 = {
  class: "chat-content",
  style: {
    "display": "flex",
    "flex-direction": "column",
    "flex": "1",
    "overflow": "hidden"
  }
};
const _hoisted_5 = {
  class: "common-questions-container"
};
const _hoisted_6 = {
  class: "common-questions"
};
const _hoisted_7 = {
  class: "question-row"
};
const _hoisted_8 = ["onClick"];
const _hoisted_9 = {
  class: "messages",
  ref: "messagesContainer",
  style: {
    "flex": "1",
    "overflow-y": "auto",
    "margin-bottom": "10px"
  }
};
const _hoisted_10 = {
  key: 0,
  class: "user-message"
};
const _hoisted_11 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_12 = {
  class: "d-flex align-items-center gap-2 mt-2"
};
const _hoisted_13 = {
  class: "timestamp",
  style: {
    "color": "black"
  }
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = {
  key: 1,
  class: "bot-message"
};
const _hoisted_16 = {
  class: "timestamp"
};
const _hoisted_17 = {
  class: "d-flex justify-content-between align-items-center container"
};
const _hoisted_18 = ["onClick"];
const _hoisted_19 = ["onClick"];
const _hoisted_20 = ["onClick"];
const _hoisted_21 = {
  class: "input-container",
  style: {
    "display": "flex",
    "gap": "10px",
    "align-items": "center",
    "padding": "10px"
  }
};
const _hoisted_22 = ["disabled"];
const _hoisted_23 = {
  class: "d-flex gap-2 flex-wrap",
  style: {
    "padding": "0 10px 10px"
  }
};
const _hoisted_24 = ["disabled"];
const _hoisted_25 = {
  key: 0,
  class: "loading"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Floating Action Button (FAB) with icon "), !$data.showChat ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "fab",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleChat && $options.toggleChat(...args))
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chat-left-text-fill"
  }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chatbox that opens when FAB is clicked "), $data.showChat ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["chatbox", {
      expanded: $data.isExpanded
    }]),
    style: {
      "box-shadow": "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "title"
  }, "Islamic Connect AI Assistant", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleExpand && $options.toggleExpand(...args)),
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["expand-btn pr-2", $data.isExpanded ? 'bi bi-arrows-angle-contract' : 'bi bi-arrows-angle-expand'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[2] || (_cache[2] = (...args) => $options.downloadChat && $options.downloadChat(...args)),
    class: "download-btn bi bi-download pr-2",
    title: "Download Chat"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleChat && $options.toggleChat(...args)),
    class: "close-btn bi bi-x-circle-fill"
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content Area "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Common Islamic Questions (Fixed at the Top) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.commonQuestions, (question, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "question-wrapper"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.autoSendQuestion(question),
      class: "question-btn"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(question), 9 /* TEXT, PROPS */, _hoisted_8)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chat History: Display questions and answers "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chatHistory, (message, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: index,
      class: "message"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" User Question "), message.type === 'user' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", {
      class: "text-left"
    }, "You:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(message.text), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(message.timestamp), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.editQuestion(index),
      class: "btn btn-secondary btn-sm"
    }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-pencil"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Edit Question ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_14)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Bot Answer "), message.type === 'bot' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.sanitizeText(message.text)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(message.timestamp), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.shareOnWhatsApp(index),
      class: "btn btn-light btn-md"
    }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-whatsapp"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Share ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_18), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.copyQuestionAndAnswer(index),
      class: "btn btn-light btn-md"
    }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-clipboard"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $options.speakText($options.sanitizeText(message.text)),
      class: "btn btn-light btn-md"
    }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-volume-up"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Listen ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_20)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Input and Button for asking new questions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.question = $event),
    placeholder: "What do you want to know about Islam?",
    class: "input-box",
    disabled: $data.loading,
    style: {
      "flex": "1",
      "padding": "8px"
    }
  }, null, 8 /* PROPS */, _hoisted_22), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.question]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button @click=\"startSpeechRecognition\" class=\"mic-btn\" :disabled=\"loading\">\n          <i class=\"bi bi-mic\"></i>\n        </button> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[5] || (_cache[5] = (...args) => $options.getAnswer && $options.getAnswer(...args)),
    disabled: $data.loading || !$data.question.trim(),
    class: "btn btn-success flex-grow-1",
    style: {
      "min-width": "120px"
    }
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.loading ? "Fetching..." : "Send"), 9 /* TEXT, PROPS */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Clear Button "), $data.chatHistory.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    onClick: _cache[6] || (_cache[6] = (...args) => $options.clearChat && $options.clearChat(...args)),
    class: "btn btn-danger flex-grow-1",
    style: {
      "min-width": "120px"
    }
  }, " Clear Conversation ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, "Fetching response...")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=style&index=0&id=e4489e22&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=style&index=0&id=e4489e22&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=style&index=0&id=14b64f56&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=style&index=0&id=14b64f56&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/ContentComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/ContentComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ContentComponent_vue_vue_type_template_id_e4489e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContentComponent.vue?vue&type=template&id=e4489e22&scoped=true */ "./resources/js/components/ContentComponent.vue?vue&type=template&id=e4489e22&scoped=true");
/* harmony import */ var _ContentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ContentComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ContentComponent_vue_vue_type_style_index_0_id_e4489e22_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContentComponent.vue?vue&type=style&index=0&id=e4489e22&scoped=true&lang=css */ "./resources/js/components/ContentComponent.vue?vue&type=style&index=0&id=e4489e22&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ContentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ContentComponent_vue_vue_type_template_id_e4489e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-e4489e22"],['__file',"resources/js/components/ContentComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ContentComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/ContentComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContentComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ContentComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/ContentComponent.vue?vue&type=style&index=0&id=e4489e22&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/ContentComponent.vue?vue&type=style&index=0&id=e4489e22&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContentComponent_vue_vue_type_style_index_0_id_e4489e22_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ContentComponent.vue?vue&type=style&index=0&id=e4489e22&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=style&index=0&id=e4489e22&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/ContentComponent.vue?vue&type=template&id=e4489e22&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/ContentComponent.vue?vue&type=template&id=e4489e22&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContentComponent_vue_vue_type_template_id_e4489e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ContentComponent_vue_vue_type_template_id_e4489e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ContentComponent.vue?vue&type=template&id=e4489e22&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ContentComponent.vue?vue&type=template&id=e4489e22&scoped=true");


/***/ }),

/***/ "./resources/js/components/translation/ChatBot.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/translation/ChatBot.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ChatBot_vue_vue_type_template_id_14b64f56_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChatBot.vue?vue&type=template&id=14b64f56&scoped=true */ "./resources/js/components/translation/ChatBot.vue?vue&type=template&id=14b64f56&scoped=true");
/* harmony import */ var _ChatBot_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChatBot.vue?vue&type=script&lang=js */ "./resources/js/components/translation/ChatBot.vue?vue&type=script&lang=js");
/* harmony import */ var _ChatBot_vue_vue_type_style_index_0_id_14b64f56_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChatBot.vue?vue&type=style&index=0&id=14b64f56&scoped=true&lang=css */ "./resources/js/components/translation/ChatBot.vue?vue&type=style&index=0&id=14b64f56&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ChatBot_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ChatBot_vue_vue_type_template_id_14b64f56_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-14b64f56"],['__file',"resources/js/components/translation/ChatBot.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/translation/ChatBot.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/translation/ChatBot.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChatBot_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChatBot_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ChatBot.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/translation/ChatBot.vue?vue&type=style&index=0&id=14b64f56&scoped=true&lang=css":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/translation/ChatBot.vue?vue&type=style&index=0&id=14b64f56&scoped=true&lang=css ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChatBot_vue_vue_type_style_index_0_id_14b64f56_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ChatBot.vue?vue&type=style&index=0&id=14b64f56&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=style&index=0&id=14b64f56&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/translation/ChatBot.vue?vue&type=template&id=14b64f56&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/translation/ChatBot.vue?vue&type=template&id=14b64f56&scoped=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChatBot_vue_vue_type_template_id_14b64f56_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ChatBot_vue_vue_type_template_id_14b64f56_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ChatBot.vue?vue&type=template&id=14b64f56&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/translation/ChatBot.vue?vue&type=template&id=14b64f56&scoped=true");


/***/ })

}]);