<template>
  <main class="container py-5" role="main">
    <div class="row justify-content-center text-center mb-3">
      <div class="col-lg-10 col-xl-10">
        <h1 class="display-4 fw-bold">Channel Guide</h1>
        <p class="lead">
          Discover and explore Islamic channels easily. This feature helps you connect with authentic Islamic content by
          directing you to each channel’s posts, playlists, and videos on YouTube, you can quickly find and access
          valuable resources all in one place.
        </p>
      </div>
    </div>

    <!-- Screen reader live region for polite updates -->
    <div aria-live="polite" role="status" class="visually-hidden" ref="liveRegion">{{ liveMessage }}</div>
    <!-- Alert Section (unchanged) -->
    <section class="mb-3">
      <div v-if="alertMessage" class="alert alert-success position-fixed alert-floating" role="alert">
        {{ alertMessage }}
      </div>
    </section>

    <!-- Filter/Search Section with Min/Max (collapse/expand) -->
    <section class="mb-5 p-3 filter-bar" aria-label="Channel filters" role="region">
      <div class="filters-header d-flex justify-content-between align-items-center mb-2">
        <h4 class="fw-semibold pt-2 pl-2">Filters</h4>
        <button class="btn btn-sm btn-outline-secondary toggle-filters" @click="toggleFilters" :aria-expanded="showFilters" :aria-controls="'filters-body'">
          <i :class="showFilters ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
          <span class="ms-1">{{ showFilters ? 'Hide' : 'Show' }}</span>
        </button>
      </div>
      <div :id="'filters-body'" class="filters-body" :class="{ 'is-open': showFilters }">
      <div class="filter-grid text-center text-md-start">
        <div class="fg-item fg-cat">
          <label for="filterCategory" class="visually-hidden">Filter by category</label>
          <select id="filterCategory" v-model="selectedCategory" class="form-select fancy-field">
            <option value="all">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="fg-item fg-lang">
          <label for="filterLanguage" class="visually-hidden">Filter by language</label>
          <select id="filterLanguage" v-model="selectedLanguage" class="form-select fancy-field">
            <option value="all">All Languages</option>
            <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
          </select>
        </div>
        <div class="fg-item fg-tag">
          <label for="filterTag" class="visually-hidden">Filter by tag</label>
          <select id="filterTag" v-model="selectedTag" class="form-select fancy-field">
            <option value="all">All Tags</option>
            <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
        <div class="fg-item fg-sort">
          <label for="sortBy" class="visually-hidden">Sort channels</label>
          <select id="sortBy" v-model="sortBy" class="form-select fancy-field">
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="viewers-desc">Viewers (High to Low)</option>
            <option value="viewers-asc">Viewers (Low to High)</option>
          </select>
        </div>
        <div class="fg-item fg-search">
          <div class="input-group search-capsule">
            <span class="input-group-text bg-white border-0">
              <i class="fas fa-search"></i>
            </span>
            <label for="channelSearch" class="visually-hidden">Search channels</label>
            <input ref="searchInput" id="channelSearch" v-model="searchQuery" type="text"
              class="form-control fancy-field" placeholder="Search channels...">
          </div>
        </div>
        <div class="fg-item fg-clear">
          <button class="btn btn-outline-secondary w-100 clear-btn" aria-label="Clear all filters"
            @click="clearFilters">
            Clear All Filters
          </button>
        </div>
      </div>
      </div>
    </section>

    <!-- <section v-if="favorites.length > 0" class="mb-5" aria-label="Favorite channels" role="region"
      :aria-expanded="showFavorites" :aria-labelledby="'favorites-heading'">
      <h2 class="fw-bold mb-3 d-flex align-items-center">
        <h2 aria-label="Toggle favorite channels section" class="fw-bold mb-4 d-flex align-items-center" @click="toggleFavoritesSection" :aria-expanded="showFavorites" aria-controls="favorites-panel" id="all-channels-heading">Favorite Channels ({{ favorites.length }}) <i :class="showFavorites ? 'fas fa-chevron-up ms-2' : 'fas fa-chevron-down ms-2'"></i></h2>  
      </h2>
      <div v-if="showFavorites" id="favorites-panel"
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4" role="list">
        <article class="col" v-for="(channel, index) in favorites" :key="channel.name" role="listitem"
          :aria-labelledby="`fav-title-${index}`">
          <div class="channel-card shadow-lg">
            <div class="ucard" :class="{'ucard--compact': compactView}">
              -- Media/logo removed by request --
              <button class="star-toggle ucard__star" @click="toggleFavorite(channel)" :aria-pressed="isFavorite(channel)"
                :aria-label="isFavorite(channel) ? 'Remove from favorites' : 'Add to favorites'">
                <i :class="isFavorite(channel) ? 'fas fa-star' : 'far fa-star'" class="star-icon"></i>
              </button>
              <div class="channel-body body--compact ucard__body">
              <h5 class="fw-bold mb-2" :id="`fav-title-${index}`">{{ channel.name }}</h5>
              <div class="description-wrapper small mb-2">
                <p class="description-text">{{ channel.description }}</p>
              </div>
              <div class="container mb-2 d-flex justify-content-between small text-muted meta-row">
                <span><i class="fas fa-users me-1"></i>{{ channel.viewers || 'N/A' }} Joined</span>
                <span><i class="fas fa-map-marker-alt me-1"></i>{{ channel.location || 'Not specified' }}</span>
                <span><i class="fas fa-clock me-1"></i>{{ channel.schedule || 'No schedule' }}</span>
              </div>
              <div class="mb-2 chips-row">
                <span class="badge chip me-1">{{ channel.category }}</span>
                <span v-for="lang in channel.languages" :key="lang" class="badge chip me-1">{{ lang }}</span>
                <span v-for="tag in channel.tags" :key="tag" class="badge chip me-1">{{ tag }}</span>
              </div>
              <div class="card-actions">
                <a v-if="channel.youtubeChannel" :href="channel.youtubeChannel || '#'" target="_blank"
                  rel="noopener noreferrer" class="action-link"
                  title="YouTube Channel" aria-label="Visit YouTube Channel"
                  @click="debugLink(channel.youtubeChannel, 'YouTube Channel')">
                  <i class="fab fa-youtube"></i>
                  <small>Channel</small>
                </a>
                <a v-if="channel.playlistUrl" :href="channel.playlistUrl || '#'" target="_blank"
                  rel="noopener noreferrer" class="action-link"
                  title="Playlists" aria-label="View Playlists" @click="debugLink(channel.playlistUrl, 'Playlists')">
                  <i class="fas fa-list-ul"></i>
                  <small>Playlists</small>
                </a>
                <a v-if="channel.websiteUrl" :href="channel.websiteUrl || '#'" target="_blank" rel="noopener noreferrer" class="action-link"
                  title="Website" aria-label="Visit Website" @click="debugLink(channel.websiteUrl, 'Website')">
                  <i class="fas fa-link"></i>
                  <small>Website</small>
                </a>
                <a v-if="channel.youtubeChannel"
                  :href="channel.youtubeChannel ? channel.youtubeChannel + '/videos' : '#'" target="_blank"
                  rel="noopener noreferrer" class="action-link"
                  title="Videos" aria-label="View Videos"
                  @click="debugLink(channel.youtubeChannel + '/videos', 'Videos')">
                  <i class="fas fa-video"></i>
                  <small>Videos</small>
                </a>
                <a :href="getWhatsAppShareUrl(channel)" target="_blank" rel="noopener noreferrer" class="action-link"
                title="Videos" aria-label="View Videos"
                @click.prevent="shareToWhatsApp(channel)">
                <i class="fas fa-share"></i>
                <small>Share</small>
              </a>
              </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section> -->

    <!-- All Channels Section -->
    <h1 class="fw-bold mb-4 d-flex align-items-center" id="all-channels-heading">All Channels:</h1>
    <p class="visually-hidden" id="kbd-help">Use arrow keys to move between channels. Press Enter to activate, F to
      toggle favorite, and slash to focus search.</p>
    <section class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4 mb-2" aria-label="Channel grid" role="list"
      aria-labelledby="all-channels-heading">
      <article class="col" v-for="(channel, index) in visibleChannels" :key="channel.name" role="listitem"
        ref="channelItems" tabindex="0" :aria-labelledby="`chan-title-${index}`" @focus="onCardFocus(index)"
        @keydown="onCardKeydown(index, $event)">
        <div class=" card-teal shadow-lg">
          <div class="ucard" :class="{ 'ucard--compact': compactView }">
            <!-- Media/logo removed by request -->
            <!-- <button class="star-toggle ucard__star" @click="toggleFavorite(channel)" :aria-pressed="isFavorite(channel)"
              :aria-label="isFavorite(channel) ? 'Remove from favorites' : 'Add to favorites'">
              <i :class="isFavorite(channel) ? 'fas fa-star' : 'far fa-star'" class="star-icon"></i>
            </button> -->

            <div class="channel-body body--regular ucard__body">
              <h5 class="fw-bold mb-2" :id="`chan-title-${index}`">{{ channel.name }}</h5>
              <div class="description-wrapper small mb-2">
                <p class="description-text">{{ channel.description }}</p>
              </div>
              <div class="container mt-3 d-flex justify-content-between small text-muted meta-row">
                <span><i class="fas fa-users me-1"></i>{{ channel.viewers || 'N/A' }} Joined</span>
                <span><i class="fas fa-clock me-1"></i>{{ channel.schedule ? channel.schedule : 'No schedule' }}</span>
                <span><i class="fas fa-map-marker-alt me-1"></i>{{ channel.location || 'Not specified' }}</span>
              </div>
              <div class="mt-3">
                <span class="badge bg-primary me-1">{{ channel.category }}</span>
                <span v-for="lang in channel.languages" :key="lang" class="badge bg-secondary me-1">{{ lang }}</span>
                <span v-for="tag in channel.tags" :key="tag" class="badge bg-info text-dark me-1">{{ tag }}</span>
              </div>
              <div class="card-actions text-center mt-3" role="group" aria-label="Channel actions">
                <a v-if="channel.youtubeChannel" :href="channel.youtubeChannel || '#'" target="_blank"
                  rel="noopener noreferrer" class="action-link" title="YouTube Channel"
                  aria-label="Visit YouTube Channel" @click="debugLink(channel.youtubeChannel, 'YouTube Channel')">
                  <i class="fab fa-youtube"></i>
                  <small>Channel</small>
                </a>
                <a v-if="channel.playlistUrl" :href="channel.playlistUrl || '#'" target="_blank"
                  rel="noopener noreferrer" class="action-link" title="Playlists" aria-label="View Playlists"
                  @click="debugLink(channel.playlistUrl, 'Playlists')">
                  <i class="fas fa-list-ul"></i>
                  <small>Playlists</small>
                </a>
                <!-- <a v-if="channel.playlistUrl" :href="channel.playlistUrl || '#'" target="_blank" rel="noopener noreferrer"
                style="display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 6px; transition: background-color 0.3s, transform 0.2s; min-width: 60px; text-decoration: none; color: #6c757d;"
                title="Playlists" aria-label="View Playlists" @click="debugLink(channel.playlistUrl, 'Playlists')">
                <i style="font-size: 1.2rem; margin-bottom: 4px; color: #6c757d;" class="fas fa-inbox"></i>
                <small style="font-size: 0.8rem;">Posts</small>
              </a> -->
                <a v-if="channel.websiteUrl" :href="channel.websiteUrl || '#'" target="_blank" rel="noopener noreferrer"
                  class="action-link" title="Website" aria-label="Visit Website"
                  @click="debugLink(channel.websiteUrl, 'Website')">
                  <i class="fas fa-link"></i>
                  <small>Website</small>
                </a>
                <a v-if="channel.youtubeChannel"
                  :href="channel.youtubeChannel ? channel.youtubeChannel + '/videos' : '#'" target="_blank"
                  rel="noopener noreferrer" class="action-link" title="Videos" aria-label="View Videos"
                  @click="debugLink(channel.youtubeChannel + '/videos', 'Videos')">
                  <i class="fas fa-video"></i>
                  <small>Videos</small>
                </a>
                <a :href="getWhatsAppShareUrl(channel)" target="_blank" rel="noopener noreferrer" class="action-link"
                  title="Share" aria-label="Share channel via WhatsApp" @click.prevent="shareToWhatsApp(channel)">
                  <i class="fas fa-share"></i>
                  <small>Share</small>
                </a>

              </div>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- Infinite Scroll Sentinel -->
    <div ref="infiniteScrollSentinel" class="w-100 sentinel" aria-hidden="true"></div>
    <div v-if="isFetchingMore" class="text-center py-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </main>
</template>

<script>
import Hls from 'hls.js'
import channelsData from '../streaming.json'

export default {
  name: 'LiveChannels',
  data() {
    return {
      showFilters: true,
      showYouTubeModal: false,
      manualQuality: 'auto',
      userCountry: '',
      videoRatio: '16x9',
      selectedLanguage: 'all',
      selectedCategory: 'all',
      selectedTag: 'all',
      searchQuery: '',
      sortBy: 'name-asc',
      isLoading: false,
      streamError: false,
      selectedChannel: null,
      hlsInstance: null,
      isMiniScreen: false,
      isDragging: false,
      initialX: 0,
      initialY: 0,
      currentX: 0,
      currentY: 0,
      // Keyboard navigation state
      focusedIndex: 0,
      gridCols: 1,
      // Infinite scroll state
      visibleCount: 12,
      increaseBy: 8,
      isFetchingMore: false,
      bottomObserver: null,
      // Debounced search input
      debouncedQuery: '',
      searchDebounce: null,
      // Live region message for a11y
      liveMessage: '',
      favorites: [],
      showFavorites: true,
      alertMessage: '',
      
      channels: channelsData,
      geoQualityMap: ['US', 'CA', 'DE', 'SA', 'AE', 'UK', 'FR'],
      compactView: false
    }
  },
  computed: {
    filteredChannels() {
      let filtered = [...this.channels];

      if (this.debouncedQuery) {
        filtered = filtered.filter(channel =>
          channel.name.toLowerCase().includes(this.debouncedQuery.toLowerCase())
        );
      }

      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(channel => channel.category === this.selectedCategory);
      }

      if (this.selectedLanguage !== 'all') {
        filtered = filtered.filter(channel => channel.languages.includes(this.selectedLanguage));
      }

      if (this.selectedTag !== 'all') {
        filtered = filtered.filter(channel => channel.tags.includes(this.selectedTag));
      }

      switch (this.sortBy) {
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'viewers-desc':
          filtered.sort((a, b) => (b.viewers || 0) - (a.viewers || 0));
          break;
        case 'viewers-asc':
          filtered.sort((a, b) => (a.viewers || 0) - (b.viewers || 0));
          break;
      }

      return filtered;
    },
    visibleChannels() {
      return this.filteredChannels.slice(0, this.visibleCount);
    },
    hasMore() {
      return this.visibleCount < this.filteredChannels.length;
    },
    categories() {
      return [...new Set(this.channels.map(channel => channel.category))].sort();
    },
    languages() {
      return [...new Set(this.channels.flatMap(channel => channel.languages))].sort();
    },
    tags() {
      return [...new Set(this.channels.flatMap(channel => channel.tags))].sort();
    },
    // Removed page list computeds in favor of infinite scroll
  },
  watch: {
    alertMessage(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.alertMessage = '';
        }, 3000);
      }
    },
    // Debounce search input to reduce recomputes per keystroke
    searchQuery(newVal) {
      clearTimeout(this.searchDebounce);
      this.searchDebounce = setTimeout(() => {
        this.debouncedQuery = newVal || '';
      }, 300);
    },
    filteredChannels() {
      // Reset infinite scroll window on filter/search change
      this.visibleCount = 12;
      this.$nextTick(() => this.setupBottomObserver());
    }
  },
  mounted() {
    // Initialize debounced query
    this.debouncedQuery = this.searchQuery || '';
    // Load persisted filter visibility
    try {
      const v = localStorage.getItem('showFilters')
      if (v !== null) this.showFilters = JSON.parse(v)
    } catch (e) {}
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteChannels') || '[]');
      this.favorites = storedFavorites.filter(fav =>
        this.channels.some(channel => channel.name === fav.name)
      );
      localStorage.setItem('favoriteChannels', JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      this.favorites = [];
    }
    fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then(data => {
        this.userCountry = data.country_code;
      })
      .catch(() => {
        this.userCountry = '';
      });

    

    document.addEventListener('keydown', this.handleKeyboard);
    // Responsive columns for keyboard navigation
    this.updateGridCols();
    window.addEventListener('resize', this.updateGridCols);
    this.setupBottomObserver();
  },
  beforeUnmount() {
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    document.removeEventListener('keydown', this.handleKeyboard);
    window.removeEventListener('resize', this.updateGridCols);
    try { this.bottomObserver && this.bottomObserver.disconnect && this.bottomObserver.disconnect(); } catch (e) { }
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters
      try { localStorage.setItem('showFilters', JSON.stringify(this.showFilters)) } catch (e) {}
    },

    focusSearch() {
      if (this.$refs.searchInput) {
        this.$refs.searchInput.focus();
      }
    },
    updateGridCols() {
      try {
        // Bootstrap breakpoints: sm>=576px has 2 columns in this grid config
        this.gridCols = window.matchMedia('(min-width: 576px)').matches ? 2 : 1;
      } catch (e) {
        this.gridCols = 2;
      }
    },
    onCardFocus(index) {
      this.focusedIndex = index;
    },
    focusCard(index) {
      const items = this.$refs.channelItems || [];
      const el = items[index];
      if (el && typeof el.focus === 'function') {
        el.focus();
      }
      this.focusedIndex = index;
    },
    onCardKeydown(index, event) {
      const key = event.key;
      const cols = this.gridCols;
      const max = this.visibleChannels.length - 1;
      let target = null;
      if (key === 'ArrowRight') {
        target = Math.min(index + 1, max);
      } else if (key === 'ArrowLeft') {
        target = Math.max(index - 1, 0);
      } else if (key === 'ArrowDown') {
        target = Math.min(index + cols, max);
      } else if (key === 'ArrowUp') {
        target = Math.max(index - cols, 0);
      } else if (key === 'f' || key === 'F') {
        // Toggle favorite on focused card
        const channel = this.visibleChannels[index];
        if (channel) this.toggleFavorite(channel);
        event.preventDefault();
        return;
      } else if (key === '/') {
        // Quick focus search
        event.preventDefault();
        this.focusSearch();
        return;
      } else if (key === 'Enter' || key === ' ') {
        // Activate primary action in card (first interactive element)
        const items = this.$refs.channelItems || [];
        const el = items[index];
        if (el) {
          const interactive = el.querySelector('button, a');
          if (interactive && typeof interactive.click === 'function') {
            interactive.click();
          }
        }
        event.preventDefault();
        return;
      }
      if (target !== null && target !== index) {
        event.preventDefault();
        this.focusCard(target);
      }
    },
    setupBottomObserver() {
      if (this.bottomObserver) this.bottomObserver.disconnect();
      const options = { root: null, rootMargin: '400px', threshold: 0 };
      this.bottomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (!this.hasMore || this.isFetchingMore) return;
          this.isFetchingMore = true;
          requestAnimationFrame(() => {
            this.visibleCount = Math.min(this.visibleCount + this.increaseBy, this.filteredChannels.length);
            this.isFetchingMore = false;
          });
        });
      }, options);
      if (this.$refs.infiniteScrollSentinel) {
        this.bottomObserver.observe(this.$refs.infiniteScrollSentinel);
      }
    },
    // New WhatsApp Share Methods
    getWhatsAppShareUrl(channel) {
      const channelName = encodeURIComponent(channel.name);
      // Adjust the base URL to your actual channel page URL structure
      const baseUrl = encodeURIComponent(`https://yourwebsite.com/channel/${channel.name}`);
      const message = `Check out ${channelName} on our site! ${baseUrl}`;
      return `https://wa.me/?text=${message}`;
    },
    shareToWhatsApp(channel) {
      const url = this.getWhatsAppShareUrl(channel);
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    toggleFavoritesSection() {
      this.showFavorites = !this.showFavorites;
    },
    toggleFavorite(channel) {
      const wasFavorite = this.isFavorite(channel);
      this.favorites = this.favorites.filter(fav => fav.name !== channel.name);
      if (!wasFavorite) {
        this.favorites.push(channel);
        this.alertMessage = `${channel.name} has been added to favorites.`;
        this.liveMessage = `${channel.name} added to favorites`;
      } else {
        this.alertMessage = `${channel.name} has been removed from favorites.`;
        this.liveMessage = `${channel.name} removed from favorites`;
      }
      try {
        localStorage.setItem('favoriteChannels', JSON.stringify(this.favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    },
    
    clearFilters() {
      this.searchQuery = '';
      this.selectedCategory = 'all';
      this.selectedLanguage = 'all';
      this.selectedTag = 'all';
      this.sortBy = 'name-asc';
      this.liveMessage = 'All filters cleared';
    },
    playChannel(channel) {
      this.selectedChannel = channel;
      this.streamError = false;
      this.isLoading = true;

      if (channel.streamType === 'youtube_embed') {
        this.showYouTubeModal = true;
        this.isLoading = false;
      } else if (channel.streamType === 'hls') {
        this.playHLSStream(channel);
      } else {
        window.open(channel.youtubeChannel || channel.websiteUrl, '_blank');
        this.isLoading = false;
      }
    },
    playHLSStream(channel) {
      this.$nextTick(() => {
        const video = this.$refs.video;
        if (!video) {
          this.streamError = true;
          this.isLoading = false;
          return;
        }

        if (this.hlsInstance) {
          this.hlsInstance.destroy();
          this.hlsInstance = null;
        }

        video.pause();
        video.removeAttribute('src');

        let source = this.manualQuality === 'sd' ? channel.streamUrlSD :
          this.manualQuality === 'hd' ? channel.streamUrlHD :
            this.geoQualityMap.includes(this.userCountry) ? channel.streamUrlHD : channel.streamUrlSD;

        if (Hls.isSupported()) {
          this.hlsInstance = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            capLevelToPlayerSize: true,
            backBufferLength: 30
          });

          this.hlsInstance.loadSource(source);
          this.hlsInstance.attachMedia(video);

          this.hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(() => {
              this.streamError = true;
            });
            this.isLoading = false;
          });

          this.hlsInstance.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              this.streamError = true;
              this.isLoading = false;
            }
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = source;
          video.play().then(() => {
            this.isLoading = false;
          }).catch(() => {
            this.streamError = true;
            this.isLoading = false;
          });
        } else {
          this.streamError = true;
          this.isLoading = false;
        }

        this.scrollToPlayer();
      });
    },
    updateHLSStream() {
      if (this.selectedChannel && this.selectedChannel.streamType === 'hls') {
        this.playHLSStream(this.selectedChannel);
      }
    },
    closeYouTubeModal() {
      this.showYouTubeModal = false;
      this.selectedChannel = null;
      this.isLoading = false;
    },
    openExternal(url) {
      window.open(url, '_blank');
    },
    handleImageError(event) {
      const channelName = event.target.alt.replace(' thumbnail', '');
      event.target.src = `https://via.placeholder.com/400x200/4B5563/FFFFFF?text=${encodeURIComponent(channelName)}`;
    },
    scrollToPlayer() {
      const el = this.$refs.playerSection;
      if (el && !this.isMiniScreen) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    toggleScreenMode() {
      this.isMiniScreen = !this.isMiniScreen;
      if (!this.isMiniScreen) {
        this.currentX = 0;
        this.currentY = 0;
        if (this.$refs.video) {
          this.$refs.video.style.transform = 'none';
        }
        this.scrollToPlayer();
      }
    },
    startDrag(event) {
      if (this.isMiniScreen) {
        this.isDragging = true;
        this.initialX = event.clientX - this.currentX;
        this.initialY = event.clientY - this.currentY;
      }
    },
    endDrag() {
      this.isDragging = false;
    },
    dragVideo(event) {
      if (this.isDragging && this.isMiniScreen) {
        event.preventDefault();
        this.currentX = event.clientX - this.initialX;
        this.currentY = event.clientY - this.initialY;
        this.$refs.video.parentElement.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
      }
    },
    isFavorite(channel) {
      return this.favorites.some(fav => fav.name === channel.name);
    },
    enterPictureInPicture() {
      const video = this.$refs.video;
      if (document.pictureInPictureEnabled && video) {
        video.requestPictureInPicture().catch(err => {
          console.error('PiP failed:', err);
        });
      }
    },
    
    handleKeyboard(event) {
      // Global keyboard handler
      if (event.key === 'Escape' && this.showYouTubeModal) {
        this.closeYouTubeModal();
        return;
      }
      // Global shortcut to focus search from anywhere
      if (event.key === '/' && !event.target.closest('input, textarea')) {
        event.preventDefault();
        this.focusSearch();
      }
    },
    debugLink(url, linkType) {
      console.log(`Clicked ${linkType} link: ${url}`);
    }
  }
}
</script>

<style scoped>
:root {
  --teal: #0bb89f;
  --teal-600: #079e89;
  --teal-700: #067e6e;
  --mint-50: #e9fbf6;
  --mint-100: #d3f7ef;
  --ink: #0f172a;
  --muted: #5b6470;
}

/* Modern filter bar */
.filter-bar {
  background: linear-gradient(180deg, #ffffff, #f6fffc);
  border: 1px solid var(--mint-100);
  border-radius: 20px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  backdrop-filter: saturate(1.1) blur(6px);
  animation: barIn 360ms ease-out both;
}

@keyframes barIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fancy-field {
  border-radius: 20px !important;
  border: 1.5px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(16, 24, 40, 0.06);
  transition: box-shadow .16s ease, transform .16s ease, border-color .16s ease;
}

.fancy-field:focus {
  border-color: var(--teal);
  box-shadow: 0 6px 16px rgba(11, 184, 159, .20), 0 0 0 4px rgba(11, 184, 159, .15);
  transform: translateY(-1px);
}

.search-capsule .input-group-text {
  border-radius: 20px 0 0 20px !important;
}

.clear-btn {
  border-radius: 20px !important;
  box-shadow: 0 2px 8px rgba(16, 24, 40, .08);
  transition: transform .16s, box-shadow .16s;
}

.clear-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(16, 24, 40, .12);
}

.clear-btn:active {
  transform: translateY(0);
}

.filters-header .toggle-filters { border-radius: 20px; padding: 4px 10px; }
.filters-body { max-height: 0; overflow: hidden; transition: max-height .25s ease; }
.filters-body.is-open { max-height: 1200px; }

.filter-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 12px;
  align-items: center;
}

.fg-item {
  width: 100%;
}

@media (min-width: 992px) {

  /* lg+ */
  .fg-cat,
  .fg-lang,
  .fg-tag,
  .fg-sort {
    grid-column: span 3;
  }

  .fg-search {
    grid-column: span 9;
  }

  .fg-clear {
    grid-column: span 3;
  }
}

@media (min-width: 576px) and (max-width: 991.98px) {

  /* sm–md */
  .fg-cat,
  .fg-lang,
  .fg-tag,
  .fg-sort {
    grid-column: span 6;
  }

  .fg-search {
    grid-column: span 8;
  }

  .fg-clear {
    grid-column: span 4;
  }
}

@media (max-width: 575.98px) {

  /* xs */
  .filter-grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .fg-cat,
  .fg-lang,
  .fg-tag,
  .fg-sort {
    grid-column: span 6;
  }

  .fg-search {
    grid-column: span 6;
  }

  .fg-clear {
    grid-column: span 6;
  }
}

.card-teal {
  border-radius: 20px;
  border: 1px solid rgba(20, 184, 166, 0.22);
  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.card-teal:hover { 
  transform: translateY(-2px); box-shadow: 0 18px 40px rgba(2,44,34,0.12); 
}

/* .channel-card {
  transition: transform 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  border: 2px solid rgba(11, 184, 159, 0.22);
  animation: cardIn 420ms cubic-bezier(.2, .8, .2, 1) both;
   Solid background to remove bottom tint 
  background: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 320px;
  overflow: hidden;
}

.channel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.16);
} */

/* Reusable Card module */
.ucard {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 12px 12px 8px;
  flex: 1 1 auto;
}

.ucard__media {
  width: 72px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
  position: relative;
  flex: 0 0 auto;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
}

.ucard__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ucard__star {
  position: absolute;
  top: 10px;
  right: 10px;
  left: auto;
  z-index: 2;
}

.ucard__body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* Compact variant */
.ucard--compact .ucard__media {
  width: 56px;
  border-radius: 10px;
}

.ucard--compact .ucard__body .description-wrapper {
  max-height: none;
  overflow: visible;
}

.ucard--compact .badge {
  font-size: 0.72rem !important;
  padding: 0.32em 0.6em !important;
}

.ucard--compact .card-actions {
  gap: 8px;
}



.channel-img {
  width: 100%;
  height: 250px;
  object-fit: contain;
}

/* Lightweight hover effects without JS handlers */
.form-control:hover,
.form-select:hover,
.input-group-text:hover,
.btn:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Link actions under cards */
.channel-body a {
  transition: transform .16s ease, background-color .16s ease;
  border-radius: 12px;
}

.channel-body a:hover {
  transform: translateY(-2px);
  background-color: #f6fffc;
}

/* Decorative subtle glow */
.channel-card::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 22px;
  pointer-events: none;
  background: radial-gradient(120px 80px at 8% 6%, rgba(11, 184, 159, .18), transparent 60%),
    radial-gradient(160px 100px at 96% 8%, rgba(11, 184, 159, .10), transparent 60%);
  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  padding: 2px;
}

/* Shared action grid for favorites and all */
.card-actions {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* desktop default: single row */
  gap: 8px;
  justify-items: center;
  align-items: end;
  /* reduce extra whitespace under icons */
}

.card-actions .action-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 8px;
  /* tighter vertical padding */
  min-width: 60px;
  text-decoration: none;
  color: var(--muted);
  border-radius: 12px;
  transition: transform .16s ease, background-color .16s ease;
  text-align: center;
}

.card-actions .action-link:hover {
  background-color: var(--mint-50);
  color: var(--teal-600);
  transform: translateY(-1px);
}

.card-actions .action-link i {
  font-size: .95rem;
  margin-bottom: 0;
  line-height: 1;
  color: currentColor;
}

.card-actions .action-link small {
  font-size: 0.8rem;
  line-height: 1.1;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: block;
}

/* Denser actions */
.card-actions {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding: .4rem 10px 0;
  margin-top: auto;
  width: 100%;
  min-height: 60px;
  box-sizing: border-box;
}

.card-actions .action-link {
  padding: 6px;
}

/* Tidy text & meta */
.channel-body h5 {
  margin-bottom: .35rem;
  letter-spacing: .2px;
  color: var(--ink);
}

.channel-body .description-wrapper {
  color: #475569;
}

.meta-row {
  margin-top: .35rem !important;
  padding-top: .5rem !important;
  border-top: 1px dashed rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  column-gap: 16px;
  row-gap: 6px;
  align-items: center;
}

.meta-row span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .meta-row {
    grid-template-columns: repeat(3, max-content);
  }

  .meta-row span+span::before {
    content: '•';
    margin: 0 8px 0 0;
    color: #cbd5e1;
  }
}

.meta-row i {
  color: #94a3b8;
}

.card-actions {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding-top: .5rem;
}

/* Image wrapper sizing helpers */
.img-wrapper--sm {
  width: 20%;
  height: 50px;
}

.img-wrapper--md {
  width: 50px;
  height: 50px;
}

/* Star toggle explicit classes (work with generic overrides) */
.star-toggle {
  background: none;
  border: 0;
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, .6);
  border-radius: 999px;
  padding: 4px;
}

.star-icon {
  color: #ffc107;
  font-size: 1.6rem;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, .12));
}

/* Focus-within elevation for keyboard users */
.channel-card:focus-within {
  box-shadow: 0 0 0 4px rgba(11, 184, 159, .18), 0 14px 30px rgba(0, 0, 0, .16);
}

/* Underlined link utility for Read More/Less */
.link-underline {
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Infinite scroll sentinel */
.sentinel {
  height: 1px;
}

/* Floating alert position */
.alert-floating {
  top: 70px;
  right: 15px;
  z-index: 1050;
  max-width: 400px;
  margin: 0;
}

/* Action grid + links (override inline via !important) */
[role="group"][aria-label="Channel actions"] {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  /* desktop default: single row */
  gap: 10px !important;
  justify-items: center !important;
  align-items: center !important;
}

[role="group"][aria-label="Channel actions"] a {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  padding: 4px 8px !important;
  min-width: 60px !important;
  text-decoration: none !important;
  color: var(--muted) !important;
  border-radius: 12px !important;
  transition: transform .16s ease, background-color .16s ease !important;
  text-align: center !important;
}

[role="group"][aria-label="Channel actions"] a:hover {
  background-color: var(--mint-50) !important;
  color: var(--teal-600) !important;
  transform: translateY(-1px) !important;
}

[role="group"][aria-label="Channel actions"] a i {
  font-size: 1rem !important;
  margin-bottom: 2px !important;
  color: currentColor !important;
}

[role="group"][aria-label="Channel actions"] a small {
  font-size: 0.78rem !important;
}

/* Legacy image-wrapper star styles removed in favour of .ucard__star */

/* Body paddings */
.body--regular {
  padding: 15px !important;
}

.body--compact {
  padding: 12px !important;
}

/* .channel-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 15%;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
} */

.badge {
  border-radius: 20px !important;
  padding: 0.45em 0.8em !important;
  font-weight: 600;
  font-size: 0.8rem;
}

.badge.bg-primary {
  background-color: var(--teal) !important;
  color: #083a36 !important;
}

.badge.bg-secondary {
  background-color: #747e89 !important;
  color: #fff !important;
}

.badge.bg-info {
  background-color: var(--mint-50) !important;
  color: var(--teal-700) !important;
}

/* Compact chips */
.chips-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: .25rem;
  padding-bottom: .25rem;
}

.chip {
  background: var(--mint-50) !important;
  color: var(--teal-700) !important;
  border-radius: 999px !important;
  padding: .3em .7em !important;
  font-weight: 600;
}

.chips-row .chip:first-child {
  background: var(--teal) !important;
  color: #083a36 !important;
}

/* Description clamp removed: full text shown */
.clamp-1 { display: block; overflow: visible; }

/* Keep text visible on all sizes; force two-line action layout on xs */
/* Phones: two columns (2 x 3 layout if 6 items) */
@media (max-width: 575.98px) {
  .card-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .card-actions .action-link {
    padding: 6px 6px;
  }
}

/* Tablet: keep two rows (3 + 2) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .card-actions {
    grid-template-columns: repeat(3, 1fr);
    min-height: 84px;
  }

  [role="group"][aria-label="Channel actions"] {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

/* Remove overly strong hover scale from old styles */

/* Pagination Styles */
.pagination {
  margin-top: 1.5rem;
}

.pagination .page-item .page-link {
  border-radius: 8px;
  margin: 0 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  border: 1px solid #000000;
  transition: all 0.2s ease;
  min-width: 40px;
  text-align: center;
}

/* ===== Responsive layout polish ===== */
@media (max-width: 575.98px) {
  .card-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .card-actions .action-link {
    padding: 6px 6px;
  }

  .card-actions .action-link i {
    font-size: 1rem;
  }

  .card-actions .action-link small {
    font-size: 0.78rem;
  }

  .badge {
    font-size: 0.78rem !important;
    padding: 0.35em 0.7em !important;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .card-actions {
    grid-template-columns: repeat(3, 1fr);
  }

  [role="group"][aria-label="Channel actions"] {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

/* Motion safety */
@media (prefers-reduced-motion: reduce) {

  .filter-bar,
  .channel-card,
  .card-actions .action-link,
  [role="group"][aria-label="Channel actions"] a {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

.pagination .page-item.active .page-link {
  background-color: #00bfa6;
  border-color: #00bfa6;
  color: #ffffff;
}

.pagination .page-item:not(.disabled) .page-link:hover {
  background-color: #e6f7f5;
  border-color: #00bfa6;
  color: #00bfa6;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  cursor: not-allowed;
  background-color: #ffffff;
  border-color: #000000;
}

@keyframes pulse-shadow {
  0% {
    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);
  }

  50% {
    box-shadow: 0 8px 24px rgba(255, 0, 0, 0.5);
  }

  100% {
    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.3);
  }
}

.description-wrapper {
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: 6em;
}

.description-wrapper.expanded {
  max-height: 23em;
}

.description-text {
  margin: 0;
  display: inline;
}

.read-more {
  color: #00695c;
  /* darker teal for better contrast on light bg */
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s, text-decoration-color 0.2s;
}

.read-more:hover,
.read-more:focus,
.read-more:focus-visible {
  color: #00564d;
  text-decoration: underline;
  text-decoration-color: currentColor;
}

@media (max-width: 576px) {
  .pagination .page-item .page-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    min-width: 32px;
  }

  .description-wrapper {
    max-height: 3em;
  }

  .description-wrapper.expanded {
    max-height: 15em;
  }

  .container {
    padding: 15px;
  }

  .channel-card {
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* .channel-img-wrapper {
    height: 280px;
  } */
  /* .favorites-section .channel-img-wrapper {
    height: 160px;
  } */
  .channel-body {
    padding: 10px;
  }

  .favorites-section .channel-body {
    padding: 8px;
  }

  .fw-bold.display-4 {
    font-size: 1.8rem;
  }

  .lead {
    font-size: 1rem;
    max-width: 100%;
  }

  .alert {
    max-width: calc(100% - 30px);
    font-size: 0.9rem;
    top: 70px;
    right: 15px;
  }

  .channel-body h5 {
    font-size: 1.1rem;
  }

  .favorites-section .channel-body h5 {
    font-size: 1rem;
  }

  .channel-body p,
  .channel-body .small {
    font-size: 0.85rem;
  }

  .favorites-section .channel-body p,
  .favorites-section .channel-body .small {
    font-size: 0.8rem;
  }

  .channel-body .badge {
    font-size: 0.65rem;
  }

  .favorites-section .channel-body .badge {
    font-size: 0.6rem;
  }

  .channel-body a {
    min-width: 50px;
    padding: 6px;
    color: #495057 !important;
    /* improve contrast vs light backgrounds */
  }

  .favorites-section .channel-body a {
    min-width: 45px;
    padding: 5px;
  }

  .channel-body a i {
    font-size: 1rem;
    color: #495057 !important;
    /* sync icon color with text for contrast */
  }

  .favorites-section .channel-body a i {
    font-size: 0.9rem;
  }

  .channel-body a small {
    font-size: 0.7rem;
    color: inherit;
    /* inherit the higher-contrast link color */
  }

  .favorites-section .channel-body a small {
    font-size: 0.65rem;
  }

  .bg-light {
    padding: 15px !important;
  }

  .form-control,
  .form-select,
  .input-group-text {
    font-size: 0.9rem;
    border-radius: 8px !important;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  .form-control:hover,
  .form-select:hover,
  .input-group-text:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}

input.form-control,
select.form-select {
  font-size: 0.9rem;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: none;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .btn-primary:hover,
  .btn-outline-danger:hover,
  .btn-outline-secondary:hover,
  .btn-outline-success:hover,
  .btn-outline-primary:hover {
    transform: none;
  }

  .mini-screen {
    transition: none;
    animation: none;
  }

  .animate__fadeInDown,
  .animate__fadeInUp,
  .animate__zoomIn,
  .animate__shakeX,
  .animate__rotate {
    animation: none;
  }
}

.channel-body a {
  color: #495057 !important;
}

.channel-body a i {
  color: inherit !important;
}

.channel-body a small {
  color: inherit;
}

.channel-card h5 {
  font-size: 1.4rem;
  /* larger title */
}

.channel-card .description {
  font-size: 1rem;
}

.channel-card .small-text {
  font-size: 0.95rem;
}

.channel-card .btn {
  font-size: 1rem;
}

.card h5 {
  font-size: 1.25rem;
  /* slightly larger */
  font-weight: 700;
  /* bold, stronger emphasis */
  color: #212529;
  /* consistent dark text */
  margin-bottom: 0.5rem;
}

/* Card meta info (address, viewers, stream type) */
.card p {
  font-size: 0.9rem;
  font-weight: 400;
  color: #6c757d;
  /* muted gray */
  margin-bottom: 0.35rem;
  line-height: 1.4;
}

.card p i {
  font-size: 0.9rem;
  margin-right: 0.35rem;
}

/* Emphasis for important numbers */
.card p span {
  font-weight: 600;
  color: #212529;
}

/* Accessibility: ensure outline-secondary has sufficient contrast on bg-light */
.btn.btn-outline-secondary {
  color: #495057 !important;
  /* darker than #6c757d for 4.5:1 on #f8f9fa */
  border-color: #495057 !important;
}

.btn.btn-outline-secondary:focus,
.btn.btn-outline-secondary:hover {
  color: #ffffff !important;
  background-color: #495057 !important;
  border-color: #495057 !important;
}

/* Badge styles */
.badge {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.45em 0.8em;
  border-radius: 20px;
}

.badge.bg-primary {
  background-color: var(--teal) !important;
  color: #083a36 !important;
}

.badge.bg-secondary {
  background-color: #747e89 !important;
  color: #ffffff !important;
}

.badge.bg-info {
  background-color: var(--mint-50) !important;
  color: var(--teal-700) !important;
}

/* Buttons inside cards */
.card .btn {
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 50px;
  padding: 0.5rem 1rem;
}

.card .btn-success {
  background-color: #00bfa6;
  border-color: #00bfa6;
}

.card .btn-success:hover {
  background-color: #009688;
  border-color: #009688;
}

/* Card hover enhancement */
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Subtle reveal for cards when entering viewport */
.row[aria-label="Channel grid"] [role="listitem"] .channel-card {
  animation: cardIn 420ms cubic-bezier(.2, .8, .2, 1) both;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
