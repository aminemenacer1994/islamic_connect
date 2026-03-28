
import ChatBot from '../vue/translation/ChatBot.vue';
import axios from 'axios';
import { fetchUserIdFromApi, resolveClientUserId } from '../utils/bookmarkAuth';

export default {
  components: {
    ChatBot
  },
  data() {
    const initialUserId = resolveClientUserId();
    return {
      smallScreen: false,
      isVisible: true,
      showAudioPlayer: false,
      showFilters: false,
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
      isDarkMode: false,
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
      favoritesVisibilityStorageKey: 'content_podcast_favourites_visible',
      islamicPodcasts: [
        {
          name: "The Mad Mamluks",
          rssUrl: "https://themadmamluks.libsyn.com/rss",
          desc: `The Mad Mamluks is a podcast that delves into contemporary issues, politics, theology, and culture from a Muslim perspective. Hosted by a group of Muslim men, the show features in-depth discussions with scholars, activists, and community leaders.  
                The topics range from faith, Islamic history, and jurisprudence to social justice, current affairs, and political challenges faced by Muslims today.`,
          image: "./images/mad_mamluk.jpg",
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
      sortOption: 'newest',
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
      isPlayerMinimized: false,
      _tooltipInstances: [],
      _cleanupDone: false,
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
      return podcasts.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    },
    sortedPodcasts() {
      return this.applySorting([...this.filteredPodcasts]);
    },
    totalListeningMinutes() {
      return (this.podcasts || []).reduce((sum, podcast) => {
        const minutes = Number(podcast?.duration);
        return sum + (Number.isFinite(minutes) ? minutes : 0);
      }, 0);
    },
    totalViews() {
      return (this.podcasts || []).reduce((sum, podcast) => {
        const views = Number(podcast?.views);
        return sum + (Number.isFinite(views) ? views : 0);
      }, 0);
    },
    hasActiveFilters() {
      return !!(this.searchQuery || this.durationFilter || this.languageFilter || (this.sortOption && this.sortOption !== 'newest'));
    },
    searchSummaryText() {
      if (!this.searchQuery) {
        return 'Search by title, description, or topic keyword.';
      }
      const total = this.filteredAndSearchedPodcasts.length;
      const suffix = total === 1 ? '' : 's';
      return `${total} result${suffix} for "${this.searchQuery}"`;
    },
  },

  async mounted() {
    this.syncThemeFromBody();
    this._cleanupDone = false;
    // Responsive inline toggles for compact layout
    const setSize = () => { try { this.smallScreen = window.innerWidth <= 576; } catch(e){} };
    setSize();
    window.addEventListener('resize', setSize, { passive: true });
    this._resizeHandler = setSize;
    window.addEventListener('ic-theme-change', this.handleThemeChange);
    this.initializeTooltips();
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
    try {
      const savedFavoritesVisibility = localStorage.getItem(this.favoritesVisibilityStorageKey);
      if (savedFavoritesVisibility !== null) {
        this.isVisible = savedFavoritesVisibility === 'true';
      }
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
    this.cleanupRuntimeResources();
  },

  methods: {
    syncThemeFromBody() {
      this.isDarkMode = document.body.classList.contains('content-route-page')
        && document.body.classList.contains('dark-mode');
    },
    handleThemeChange(event) {
      if (event?.detail && typeof event.detail.isDark === 'boolean') {
        this.isDarkMode = event.detail.isDark;
        return;
      }
      this.syncThemeFromBody();
    },
    initializeTooltips() {
      if (typeof window === 'undefined' || !window.bootstrap?.Tooltip) return;
      const tooltipElements = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      this._tooltipInstances = tooltipElements.map((element) => {
        return window.bootstrap.Tooltip.getInstance(element) || new window.bootstrap.Tooltip(element);
      });
    },
    disposeTooltips() {
      if (!Array.isArray(this._tooltipInstances)) return;
      this._tooltipInstances.forEach((instance) => {
        try { instance?.dispose?.(); } catch (e) {}
      });
      this._tooltipInstances = [];
    },
    cleanupRuntimeResources() {
      if (this._cleanupDone) return;
      this._cleanupDone = true;
      try { window.removeEventListener('resize', this._resizeHandler); } catch (e) {}
      window.removeEventListener('ic-theme-change', this.handleThemeChange);
      window.removeEventListener('mousemove', this.onSeekMove);
      window.removeEventListener('mouseup', this.stopSeek);
      document.removeEventListener('keydown', this.handleKeydown);
      try { this._infiniteObserver && this._infiniteObserver.disconnect && this._infiniteObserver.disconnect(); } catch (e) {}
      if (this.searchDebounceTimer) {
        clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = null;
      }
      if (this.progressSyncTimer) {
        clearTimeout(this.progressSyncTimer);
        this.progressSyncTimer = null;
      }
      try {
        Object.values(this.warningTimers || {}).forEach((t) => clearTimeout(t));
        this.warningTimers = {};
      } catch (e) {}
      this.disposeTooltips();
      this.stopSeek();
      try { this.closeAudioPlayer(); } catch (e) {}
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach((audio) => {
          if (!audio) return;
          try { audio.pause(); } catch (e) {}
          try { audio.src = ''; } catch (e) {}
        });
      }
      this.audioElements = [];
    },
    async resolveStorageScope() {
      const resolvedId = await fetchUserIdFromApi();
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
        const [bookmarks, favourites, recent, progress, played] = await Promise.all([
          this.fetchPreference('podcast_bookmarks'),
          this.fetchPreference('podcast_favourites'),
          this.fetchPreference('podcast_recent'),
          this.fetchPreference('podcast_progress'),
          this.fetchPreference('podcast_played'),
        ]);
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
      if (!this.isAuthenticated) return [];
      const response = await axios.get(`/api/preferences/${key}`);
      return response.data?.value ?? [];
    },
    async savePreference(key, value) {
      if (!this.isAuthenticated) return;
      await axios.put(`/api/preferences/${key}`, { value });
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
      try { localStorage.setItem(this.localRecentPlaysKey, JSON.stringify(this.recentPlays)); } catch (e) {}
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
      try { localStorage.setItem(this.localPlayedKey, JSON.stringify(this.playedEpisodes)); } catch (e) {}
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
    toggleVisibility(nextState = null) {
      const resolvedState = typeof nextState === 'boolean' ? nextState : !this.isVisible;
      this.isVisible = resolvedState;
      try {
        localStorage.setItem(this.favoritesVisibilityStorageKey, String(resolvedState));
      } catch (e) {}
    },
    shortDescription(text, maxLength = 90) {
      if (!text) return '';
      const normalized = text.replace(/\s+/g, ' ').trim();
      if (normalized.length <= maxLength) return normalized;
      return normalized.slice(0, maxLength).replace(/\s+$/, '') + '…';
    },
    getEpisodeKey(podcast) {
      return `${podcast?.title || ''}||${podcast?.audioUrl || ''}`;
    },
    isEpisodePlayed(podcast) {
      return !!this.playedEpisodes[this.getEpisodeKey(podcast)];
    },
    showLoginWarning(podcast, message) {
      const key = this.getEpisodeKey(podcast);
      if (!key) return;
      this.loginWarnings = { ...this.loginWarnings, [key]: message };
      if (this.warningTimers[key]) clearTimeout(this.warningTimers[key]);
      this.warningTimers[key] = setTimeout(() => {
        const next = { ...this.loginWarnings };
        delete next[key];
        this.loginWarnings = next;
        delete this.warningTimers[key];
      }, 5000);
    },
    markAsPlayed(podcast) {
      if (!podcast || !podcast.audioUrl) return;
      const key = this.getEpisodeKey(podcast);
      const playedAt = Date.now();
      this.playedEpisodes = { ...this.playedEpisodes, [key]: playedAt };
      const entry = {
        title: podcast.title,
        audioUrl: podcast.audioUrl,
        pubDate: podcast.pubDate,
        views: podcast.views,
        playedAt,
      };
      this.recentPlays = [
        entry,
        ...this.recentPlays.filter(rp => !(rp.title === podcast.title && rp.audioUrl === podcast.audioUrl)),
      ].slice(0, 50);
      if (this.isAuthenticated) {
        this.savePreference('podcast_played', this.playedEpisodes);
        this.savePreference('podcast_recent', this.recentPlays);
      } else {
        this.saveLocalPlayed();
        this.saveLocalRecentPlays();
      }
    },
    cardAccentGradient(podcast) {
      const primary = (podcast && podcast.accentPrimary) || '#ecfdf5';
      const secondary = (podcast && podcast.accentSecondary) || '#dbeefe';
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
    clearSearchInput() {
      if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
      this.searchInput = '';
      this.searchQuery = '';
      this.visibleCount = this.itemsPerLoad;
    },
    toggleVolume() {
      this.showVolumeBar = !this.showVolumeBar;
    },
    updateVolume() {
      const audio = this.audioElements[this.currentlyPlayingIndex];
      if (audio) audio.volume = this.volume;
      try { localStorage.setItem('content_volume', String(this.volume)); } catch (e) {}
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
      if (!podcast || !podcast.audioUrl) return;
      const rawTitle = podcast.title || 'podcast-episode';
      const sanitized = rawTitle
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
        .replace(/\s+/g, '_')
        .slice(0, 120) || 'podcast-episode';
      const filename = `${sanitized}.mp3`;

      const fallbackOpen = () => {
        const a = document.createElement("a");
        a.href = podcast.audioUrl;
        a.download = filename;
        a.target = "_blank";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      fetch(podcast.audioUrl)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error("Download failed, opening source instead:", error);
          fallbackOpen();
        });
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

    getPublishedTimestamp(pubDate) {
      const published = new Date(pubDate);
      const timestamp = published.getTime();
      return Number.isFinite(timestamp) ? timestamp : -Infinity;
    },
    applySorting(filtered) {
      const podcasts = Array.isArray(filtered) ? filtered.slice() : [];
      const sortNewestFirst = (a, b) => {
        const aIsNew = this.isNewEpisode(a?.pubDate);
        const bIsNew = this.isNewEpisode(b?.pubDate);
        if (aIsNew !== bIsNew) return aIsNew ? -1 : 1;
        return this.getPublishedTimestamp(b?.pubDate) - this.getPublishedTimestamp(a?.pubDate);
      };

      switch (this.sortOption) {
        case "mostViewed":
          return podcasts.sort((a, b) => {
            const viewDiff = Number(b?.views || 0) - Number(a?.views || 0);
            return viewDiff || sortNewestFirst(a, b);
          });
        case "leastViewed":
          return podcasts.sort((a, b) => {
            const viewDiff = Number(a?.views || 0) - Number(b?.views || 0);
            return viewDiff || sortNewestFirst(a, b);
          });
        case "oldest":
          return podcasts.sort((a, b) => this.getPublishedTimestamp(a?.pubDate) - this.getPublishedTimestamp(b?.pubDate));
        case "newest":
        default:
          return podcasts.sort(sortNewestFirst);
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
      const sources = [
        async () => {
          const response = await fetch(rssUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        },
        async () => {
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error(`Proxy HTTP ${response.status}`);
          const data = await response.json();
          if (!data || !data.contents) throw new Error("Proxy response missing contents");
          return data.contents;
        }
      ];

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
        this.podcasts = Array.from(items)
          .map(item => {
            const title = this.getXmlTagText(item, ['title']) || 'No title';
            const pubDate = this.getXmlTagText(item, ['pubDate']) || 'Unknown';
            const description = this.getXmlTagText(item, ['description']) || 'No description available.';
            const enclosure = item.getElementsByTagName('enclosure')[0];
            const rawDuration = this.getXmlTagText(item, ['itunes:duration', 'duration']);
            const duration = this.parseDurationToMinutes(rawDuration);
            const category = this.getXmlTagText(item, ['itunes:category', 'category']) || '';
            const author = this.getXmlTagText(item, ['itunes:author', 'dc:creator', 'author']) || this.selectedPodcast?.name || 'Unknown';
            const episodeType = this.getXmlTagText(item, ['itunes:episodeType']) || 'full';
            const explicit = this.getXmlTagText(item, ['itunes:explicit']) || '';
            const audioUrl = enclosure?.getAttribute('url') || null;
            const audioType = enclosure?.getAttribute('type') || '';
            const audioSizeBytes = Number(enclosure?.getAttribute('length') || 0);

            return {
              title,
              pubDate,
              description,
              audioUrl,
              views: Math.floor(Math.random() * 1000),
              duration,
              durationRaw: rawDuration || '',
              language: this.detectLanguage(title),
              category,
              author,
              episodeType,
              explicit,
              audioType,
              audioSizeBytes: Number.isFinite(audioSizeBytes) ? audioSizeBytes : 0,
            };
          })
          .filter(podcast => podcast.audioUrl)
          .sort((a, b) => {
            const dateA = new Date(a.pubDate);
            const dateB = new Date(b.pubDate);
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;
            return dateB - dateA;
          });

        // Initialize visible list for infinite scroll
        this.visibleCount = Math.min(this.itemsPerLoad, this.podcasts.length);

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
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', options); // Using 'en-GB' for British date format
    },
    getXmlTagText(item, tagNames = []) {
      for (const tagName of tagNames) {
        const node = item.getElementsByTagName(tagName)[0];
        const value = node?.textContent?.trim();
        if (value) return value;
      }
      return '';
    },
    parseDurationToMinutes(value) {
      if (!value) return null;
      const cleaned = String(value).trim();
      if (!cleaned) return null;
      if (/^\d+$/.test(cleaned)) {
        const totalSeconds = Number(cleaned);
        if (!Number.isFinite(totalSeconds)) return null;
        return Math.max(1, Math.round(totalSeconds / 60));
      }
      const parts = cleaned.split(':').map((part) => Number(part));
      if (parts.some((part) => !Number.isFinite(part))) return null;
      let totalSeconds = 0;
      if (parts.length === 3) {
        totalSeconds = (parts[0] * 3600) + (parts[1] * 60) + parts[2];
      } else if (parts.length === 2) {
        totalSeconds = (parts[0] * 60) + parts[1];
      } else {
        return null;
      }
      return Math.max(1, Math.round(totalSeconds / 60));
    },
    formatAudioSize(bytes) {
      const size = Number(bytes);
      if (!Number.isFinite(size) || size <= 0) return 'N/A';
      if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
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
      void rssText;
    },

    selectPodcast(podcast) {
      this.selectedPodcast = podcast;
      try { localStorage.setItem(this.lastSelectedPodcastKey, JSON.stringify(podcast)); } catch (e) {}
      this.fetchPodcasts();
      this.$nextTick(() => {
        const section = this.$refs.podcastDetailSection;
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },

    onSearch() {
      this.visibleCount = this.itemsPerLoad;
      this.$nextTick(() => this.setupInfiniteScroll());
    },

    formatEpisodeCount(count) {
      return typeof count === 'number' ? count : 'Loading…';
    },
    formatNumber(value) {
      const number = Number(value);
      if (!Number.isFinite(number)) return '0';
      try {
        return new Intl.NumberFormat('en-US').format(number);
      } catch (e) {
        return String(Math.round(number));
      }
    },
    formatTotalDuration(totalMinutes) {
      const minutes = Number(totalMinutes);
      if (!Number.isFinite(minutes) || minutes <= 0) return 'N/A';
      const hrs = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      if (hrs <= 0) return `${mins} min`;
      if (mins === 0) return `${hrs} hr`;
      return `${hrs} hr ${mins} min`;
    },
    clearEpisodeFilters() {
      this.searchInput = '';
      this.searchQuery = '';
      this.durationFilter = '';
      this.languageFilter = '';
      this.sortOption = 'newest';
      this.showFilters = false;
      this.applyFilters();
    },

    highlightText(title) {
      if (!this.searchQuery) return title;
      return title.replace(
        new RegExp(`(${this.searchQuery})`, "gi"),
        `<span style="background-color: rgba(0, 191, 166, 0.6); padding: 4px; border-radius: 5px;">$1</span>`
      );
    },

    toggleBookmark(podcast) {
      if (!this.isAuthenticated) return;
      const index = this.bookmarks.findIndex(item => item.title === podcast.title);
      if (index > -1) this.bookmarks.splice(index, 1);
      else this.bookmarks.push(podcast);
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
        try { this._infiniteObserver.disconnect(); } catch (e) {}
      }
      this._infiniteObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          // Defer to animation frame to keep scroll smooth
          requestAnimationFrame(() => this.loadMore());
        }
      }, { root: null, rootMargin: '600px', threshold: 0 });
      this._infiniteObserver.observe(el);
    },

    loadMore() {
      if (this.isLoadingMore) return;
      if (this.visibleCount >= this.filteredAndSearchedPodcasts.length) return;
      this.isLoadingMore = true;
      const next = Math.min(
        this.filteredAndSearchedPodcasts.length,
        this.visibleCount + this.itemsPerLoad
      );
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
        const entries = Object.entries(this.progressMap || {})
          .map(([title, savedTime]) => ({
            title,
            savedTime: Number(savedTime || 0),
          }))
          .filter(entry => !isNaN(entry.savedTime) && entry.savedTime >= 5);

        const withMeta = entries.map(entry => {
          const match = this.podcasts.find(p => p.title === entry.title) || this.filteredPodcasts.find(p => p.title === entry.title);
          return { ...entry, duration: match?.duration || 0 };
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
        try { this.currentlyPlaying.pause(); } catch (e) {}
      }
      // Lazily create Audio instance if missing
      if (!this.audioElements[index]) {
        const audio = new Audio(podcast?.audioUrl || '');
        audio.playbackRate = this.playbackSpeed;
        audio.volume = this.volume;
        audio.addEventListener('timeupdate', () => {
          this.updateProgress(index, audio);
          try {
            if (this.isAuthenticated && podcast?.title) {
              this.progressMap[podcast.title] = Number(audio.currentTime || 0);
              this.queueProgressSync();
            }
          } catch (e) {}
        }, { passive: true });
        audio.addEventListener('loadedmetadata', () => { this.progress[index] = 0; });
        audio.addEventListener('ended', () => this.handlePodcastEnd(index));
        this.audioElements[index] = audio;
      }
      this.isAudioPlaying = this.isAudioPlaying.map((_, i) => i === index);
      this.currentlyPlaying = this.audioElements[index];
      this.currentlyPlayingIndex = index;
      this.playingIndex = index;
      // Restore last position for this episode
      try {
        const podcast = this.visiblePodcasts[index];
        const saved = Number(this.progressMap?.[podcast.title]);
        if (!isNaN(saved) && saved > 0 && this.currentlyPlaying && Math.abs((this.currentlyPlaying.currentTime || 0) - saved) > 1) {
          this.currentlyPlaying.currentTime = saved;
        }
      } catch (e) {}
      this.currentlyPlaying.play().catch((err) => {
        console.error('Play error:', err);
        this.handlePodcastEnd(index);
      });
      this.isAudioPlaying[index] = true;
      this.showAudioPlayer = true;
      this.$nextTick(() => {
        const player = document.querySelector('.audio-player-container');
        if (player) player.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
      this.audioPlayerJustOpened = true;
      setTimeout(() => {
        this.audioPlayerJustOpened = false;
      }, 300);
    },
    pauseAudio(index) {
      const a = this.audioElements[index];
      if (a) {
        try { a.pause(); } catch (e) {}
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
        try { a.pause(); } catch (e) {}
        try { a.currentTime = 0; } catch (e) {}
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
        const progress = (a.currentTime / a.duration) * 100;
        this.progress[index] = Math.min(100, progress);
      }
    },
    formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      return (
        (hrs < 10 ? '0' : '') + hrs + ':' +
        (mins < 10 ? '0' : '') + mins + ':' +
        (secs < 10 ? '0' : '') + secs
      );
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
        this.audioElements.forEach((audio) => {
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
      try { localStorage.setItem('content_volume', String(this.volume)); } catch (e) {}
    },
    updatePlaybackSpeed() {
      try { localStorage.setItem('content_speed', String(this.playbackSpeed)); } catch (e) {}
      if (this.audioElements && this.audioElements.forEach) {
        this.audioElements.forEach((audio) => { if (audio) audio.playbackRate = this.playbackSpeed; });
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
        this.favourites = [{ title: podcast.title, audioUrl: podcast.audioUrl, pubDate: podcast.pubDate, views: podcast.views, likedAt: Date.now() }, ...this.favourites].slice(0, 100);
      }
      this.savePreference('podcast_favourites', this.favourites);
    },
    playFromFavourites(fav) {
      if (this.isCurrentlyPlaying(fav)) {
        this.pauseAudio(this.currentlyPlayingIndex);
        this.playingIndex = null;
        return;
      }
      const fullIndex = this.filteredAndSearchedPodcasts.findIndex(p => p.title === fav.title && p.audioUrl === fav.audioUrl);
      if (fullIndex >= 0) {
        this.ensureVisible(fullIndex);
        this.$nextTick(() => {
          const localIndex = this.visiblePodcasts.findIndex(p => p.title === fav.title && p.audioUrl === fav.audioUrl);
          if (localIndex >= 0) {
            this.playAudio(localIndex);
            this.playingIndex = localIndex;
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
      const publishedTime = published.getTime();
      if (!Number.isFinite(publishedTime)) return false;
      const diffDays = (now - publishedTime) / (1000 * 60 * 60 * 24);
      if (diffDays < 0) return false;
      return diffDays <= 7;
    },
    scrollToFirstEpisode() {
      this.$nextTick(() => {
        const firstEpisode = document.querySelector('.podcast-cards-grid .podcast-card-wrapper');
        if (firstEpisode) {
          firstEpisode.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    },
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
      } else if (newPodcasts.length > (oldPodcasts?.length || 0)) {
        // Append new audio elements for the newly revealed items
        const added = newPodcasts.length - (oldPodcasts?.length || 0);
        this.isAudioPlaying.push(...new Array(added).fill(false));
        this.progress = { ...this.progress };
        this.$nextTick(() => this.initializeAudioElements(true));
      }
    },
  },
};
