<template>
  <div class="container py-5">
    <h1 class="text-center fw-bold display-4 mb-4">Islamic Radio Stations</h1>

    <p class="text-center mb-4 lead">
      Discover live Quranic radio stations from renowned reciters worldwide.
    </p>

    <!-- Search Bar and Category Dropdown -->
    <section class=" mb-5">
      
      <div class="fixed-footer p-4 mb-5 shadow-lg border-md" style="border-radius: 25px; background-color:lightgray; box-shadow: #00bfa6; ">
        <h2 class="visually-hidden">Search Reciters</h2>
        <div class="row g-4 align-items-end" >
          <div class="col-md-8">
            <div for="reciterSearch" style="font-size: 1.5em;" class="form-label fw-bold display-4  text-dark mb-2">Search by Name</div>
            <div class="input-group align-items-center">
              <input v-model="searchQuery" @input="handleSearch" id="reciterSearch" type="text"
                class="form-control border-0 rounded-3 shadow-sm px-4 py-2 fs-6" placeholder="e.g., Abdul Basit"
                aria-label="Search reciters by name" style="background-color: #f8f9fa;" />
            </div>
          </div>
          <div class="col-md-4">
            <div for="reciterCategory" style="font-size: 1.5em;" class="form-label fw-bold display-4 text-dark mb-2">Select a Category</div>
            <select v-model="selectedCategory" @change="handleSearch" id="reciterCategory"
              class="form-select border-0 rounded-3 shadow-sm px-4 py-2 fs-6" aria-label="Select a Category"
              style="background-color: #f8f9fa;">
              <option value="All Categories">All Categories</option>
              <option v-for="category in availableCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Popular Reciters Section with better visual hierarchy -->
      <!-- <section class="popular-reciters mb-5 section-animate">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold fs-4 text-heading">Popular Reciters</h2>
          <button @click="toggleReciters" class="btn btn-outline-success d-flex align-items-center gap-2"
            :aria-expanded="showReciters" aria-controls="reciterGrid"
            :aria-label="showReciters ? 'Hide Popular Reciters' : 'Show Popular Reciters'">
            <i :class="showReciters ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
            {{ showReciters ? 'Hide' : 'Show' }}
          </button>
        </div>
        <div id="reciterGrid" class="popular-reciter-grid row g-4" v-show="showReciters">
          <div v-for="(reciter, index) in popularReciters.slice(0, 6)" :key="reciter.id"
            class="col-6 col-sm-3 col-md-3">
            <div class="reciter-card rounded-3 overflow-hidden shadow-sm" :style="{ animationDelay: `${index * 0.1}s` }"
              @click="playAndScrollToStation(reciter.id)" role="button" tabindex="0"
              :aria-label="'Play ' + reciter.name + ' recitations'">
              <div class="reciter-img-container position-relative">
                <img v-if="reciter.imageLoaded !== false" :src="reciter.imageUrl" :alt="reciter.name + ' profile image'"
                  class="reciter-image img-fluid" loading="lazy" @error="handleImageError(reciter)" />
                <div v-else class="placeholder-img d-flex align-items-center justify-content-center bg-light">
                  <div class="avatar-initials fs-2 fw-bold text-muted" aria-hidden="true">
                    {{ getInitials(reciter.name) }}
                  </div>
                </div>
                <div class="play-overlay d-flex align-items-center justify-content-center">
                  <i class="bi bi-play-circle-fill play-icon" style="font-size: 2.5rem; color: #fff;"></i>
                </div>
              </div>
              <div class="reciter-content p-3 text-center">
                <h6 class="reciter-name fw-semibold fs-6 mb-1">{{ reciter.name }}</h6>
                <p class="text-style text-muted fs-6 mb-0">{{ reciter.style || 'Various styles' }}</p>
              </div>
            </div>
          </div>
        </div>
      </section> -->
    </section>

    <!-- Liked Stations Section -->
    <section v-if="likedStations.length" class="mb-5">
      <h3 class="fw-bold mb-3 fs-4 cursor-pointer section-header text-dark" @click="showLiked = !showLiked"
        role="button" :aria-expanded="showLiked" :aria-controls="`liked-stations`">
        Liked Stations ({{ likedStations.length }})
        <i :class="showLiked ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="ms-1"></i>
      </h3>

      <div v-if="showLiked" class="section-animate" id="liked-stations">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div v-for="station in likedStations" :key="station.id" class="col">
            <div class="card radio-card shadow-sm border-0"
              :class="{ 'active-card': currentAudio?.src === station.url }" :id="'station-' + station.id" role="article"
              :aria-labelledby="'station-title-' + station.id">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h2 class="card-title mb-0 fw-bold text-truncate display-5 " :id="'station-title-' + station.id"
                    v-html="highlightSearch(station.name)"></h2>
                  <button class="btn btn-icon like-button p-2" @click="toggleLike(station)"
                    :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'">
                    <i :class="isLiked(station.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"
                      class="like-icon fs-5"></i>
                  </button>
                </div>
                <div class="audio-player" :class="{ playing: isPlaying(station.id) }" role="region"
                  :aria-label="'Audio player for ' + station.name">
                  <audio :ref="'audioPlayer-' + station.id" :src="station.url" @play="handlePlay(station.id, $event)"
                    @pause="handlePause(station.id)" @timeupdate="updateTime(station.id)"
                    @loadedmetadata="updateDuration(station.id)"
                    :aria-label="'Audio stream for ' + station.name"></audio>
                  <div class="playback-controls d-flex align-items-center gap-2 mb-3">
                    <button class="btn btn-icon play-button p-2" @click="togglePlay(station.id)"
                      :aria-label="isPlaying(station.id) ? 'Pause playback' : 'Play playback'"
                      :disabled="!!playbackErrors[station.id]">
                      <i :class="isPlaying(station.id) ? 'bi bi-pause-fill' : 'bi bi-play-fill'"
                        class="play-icon fs-5"></i>
                    </button>
                    <span class="time-display fs-6" aria-live="polite">
                      {{ formatTime(currentTimes[station.id] || 0) }}
                    </span>
                    <input type="range" min="0" :max="durations[station.id] || 100"
                      :value="currentTimes[station.id] || 0" @input="seek($event, station.id)"
                      class="seek-bar flex-grow-1" :disabled="isLive(station.id)"
                      :aria-label="'Seek bar for ' + station.name" />
                    <span class="time-display fs-6" aria-live="polite">
                      {{ isLive(station.id) ? 'LIVE' : formatTime(durations[station.id] || 0) }}
                    </span>
                  </div>
                  <div v-if="playbackErrors[station.id]" class="text-danger fs-6 mb-3" role="alert">
                    {{ playbackErrors[station.id] }}
                  </div>
                  <div class="volume-controls d-flex align-items-center gap-2 px-2 py-1">
                    <button class="btn btn-icon volume-button p-2" @click="toggleMute(station.id)"
                      :aria-label="volumes[station.id] === 0 ? 'Unmute audio' : 'Mute audio'">
                      <i :class="volumes[station.id] === 0 ? 'bi bi-volume-mute' : (volumes[station.id] < 50 ? 'bi bi-volume-down' : 'bi bi-volume-up')"
                        class="volume-icon fs-5"></i>
                    </button>
                    <input type="range" min="0" max="100" v-model.number="volumes[station.id]"
                      @input="setVolume($event, station.id)" class="volume-bar flex-grow-1"
                      :aria-label="'Volume control for ' + station.name" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </section>

    <!-- All Radio Stations -->
    <section class="mb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold fs-3 text-dark"><img src="images/art.png" width="30px" class="mb-1" /> Radio Stations:</h3>
      </div>
      <div v-if="isLoading" class="text-center my-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading stations...</span>
        </div>
      </div>
      <div v-else-if="fetchError" class="alert alert-danger" role="alert">
        {{ fetchError }}
        <button class="btn btn-sm btn-outline-danger ms-2" @click="fetchStations" aria-label="Retry loading stations">
          Retry
        </button>
      </div>
      <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="station in paginatedStations" :key="station.id" class="col">
          <div class="card radio-card shadow-sm border-0"
            :class="{ 'active-card': currentPlayingStationId === station.id }" :id="'station-' + station.id"
            role="article" :aria-labelledby="'station-title-' + station.id" style="border-radius: 25px; box-shadow: #00bfa6; ">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="card-title mb-0 fw-semibold fs-5" :id="'station-title-' + station.id"
                  v-html="highlightSearch(station.name)"></h5>
                <button class="btn btn-icon like-button p-2" @click="toggleLike(station)"
                  :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'">
                  <i :class="isLiked(station.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"
                    class="like-icon fs-5"></i>
                </button>
              </div>
              <div class="audio-player" :class="{ playing: isPlaying(station.id) }" role="region"
                :aria-label="'Audio player for ' + station.name">
                <audio :ref="'audioPlayer-' + station.id" :src="station.url" @play="handlePlay(station.id, $event)"
                  @pause="handlePause(station.id)" @timeupdate="updateTime(station.id)"
                  @loadedmetadata="updateDuration(station.id)" @error="handleAudioError(station.id, $event)"
                  :aria-label="'Audio stream for ' + station.name"></audio>
                <div class="playback-controls d-flex align-items-center gap-2 mb-3">
                  <button class="btn btn-icon play-button p-2" @click="togglePlay(station.id)"
                    :aria-label="isPlaying(station.id) ? 'Pause playback' : 'Play playback'"
                    :disabled="!!playbackErrors[station.id]">
                    <i :class="isPlaying(station.id) ? 'bi bi-pause-fill' : 'bi bi-play-fill'"
                      class="play-icon fs-5"></i>
                  </button>
                  <input type="range" min="0" :max="durations[station.id] || 100" :value="currentTimes[station.id] || 0"
                    @input="seek($event, station.id)" class="seek-bar flex-grow-1" :disabled="isLive(station.id)"
                    :aria-label="'Seek bar for ' + station.name" />
                  <span class="time-display fs-6" aria-live="polite">
                    {{ isLive(station.id) ? 'LIVE' : formatTime(durations[station.id] || 0) }}
                  </span>
                </div>
                <div v-if="playbackErrors[station.id]" class="text-danger fs-6 mb-3 d-flex align-items-center gap-2"
                  role="alert">
                  {{ playbackErrors[station.id] }}
                  <button class="btn btn-sm btn-outline-danger" @click="retryPlayback(station.id)"
                    aria-label="Retry playback">
                    Retry
                  </button>
                </div>
                <div class="volume-controls d-flex align-items-center gap-2 px-2 py-1">
                  <button class="btn btn-icon volume-button p-2" @click="toggleMute(station.id)"
                    :aria-label="volumes[station.id] === 0 ? 'Unmute audio' : 'Mute audio'">
                    <i :class="volumes[station.id] === 0 ? 'bi bi-volume-mute' : (volumes[station.id] < 50 ? 'bi bi-volume-down' : 'bi bi-volume-up')"
                      class="volume-icon fs-5"></i>
                  </button>
                  <input type="range" min="0" max="100" v-model.number="volumes[station.id]"
                    @input="setVolume($event, station.id)" class="volume-bar flex-grow-1"
                    :aria-label="'Volume control for ' + station.name" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-4 pagination-nav">
      <button @click="previousPage" :disabled="currentPage === 1"
        class="btn btn-outline-teal rounded-pill px-4 me-3 fs-6" aria-label="Previous page">
        <b>Previous</b>
      </button>
      <span class="fw-semibold fs-6 mx-3">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="btn btn-outline-teal rounded-pill px-4 ms-3 fs-6" aria-label="Next page">
        <b>Next</b>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultPopularReciters: [],
      showSuggestions: false,
      filteredSuggestions: [],
      highlightIndex: -1,
      searchQuery: '',
      selectedCategory: 'All Categories',
      currentPage: 1,
      itemsPerPage: 9,
      stations: [],
      filteredStations: [],
      currentAudio: null,
      volumes: {}, // Per-station volume
      likedStations: [],
      recentlyPlayed: [],
      showLiked: false,
      showReciters: true,
      currentTimes: {},
      durations: {},
      playingStates: {},
      playbackErrors: {},
      isLoading: false,
      fetchError: null,
      currentPlayingStationId: null,
      defaultPopularReciters: [
        {
          id: 1,
          name: 'Mishary Rashid Alafasy',
          url: 'https://qurango.net/radio/mishary_alafasy',
          fallbackUrl: 'https://backup.qurango.net/mishary_alafasy.mp3',
          style: 'Murattal',
          imageUrl: 'images/mra.jpeg',
          imageLoaded: true
        },
        {
          id: 2,
          name: 'Yasser Al-Dosari',
          url: 'https://qurango.net/radio/yasser_aldosari',
          fallbackUrl: 'https://backup.qurango.net/yasser_aldosari.mp3',
          style: 'Murattal',
          imageUrl: 'images/yad.webp',
          imageLoaded: true
        },
        {  
          id: 6,
          name: 'Abdul Basit Abdul Samad',
          url: 'https://qurango.net/radio/abdulbasit_abdulsamad_mujawwad',
          fallbackUrl: 'https://backup.qurango.net/abdulbasit_abdulsamad.mp3',
          style: 'Mujawwad',
          imageUrl: 'images/abas.jpeg',
          imageLoaded: true
        },
        {
          id: 3,
          name: 'Saad Al-Ghamdi',
          url: 'https://qurango.net/radio/saad_alghamdi',
          fallbackUrl: 'https://backup.qurango.net/saad_alghamdi.mp3',
          style: 'Murattal',
          imageUrl: 'images/sag.webp',
          imageLoaded: true
        },
        {
          id: 4,
          name: 'Maher Al-Muaiqly',
          url: 'https://qurango.net/radio/maher_almuaiqly',
          fallbackUrl: 'https://backup.qurango.net/maher_almuaiqly.mp3',
          style: 'Murattal',
          imageUrl: 'images/mam.webp',
          imageLoaded: true
        },
        {
          id: 5,
          name: 'Abdul Rahman Al-Sudais',
          url: 'https://qurango.net/radio/abdurrahman_alsudais',
          fallbackUrl: 'https://backup.qurango.net/abdurrahman_alsudais.mp3',
          style: 'Murattal',
          imageUrl: 'images/asds.jpeg',
          imageLoaded: true
        },
        
        {
          id: 7,
          name: 'Saud Al-Shuraim',
          url: 'https://qurango.net/radio/saud_alshuraim',
          fallbackUrl: 'https://backup.qurango.net/saud_alshuraim.mp3',
          style: 'Murattal',
          imageUrl: 'images/sas.jpeg',
          imageLoaded: true
        },
        {
          id: 8,
          name: 'Ahmad Al-Ajmi',
          url: 'https://qurango.net/radio/ahmad_alajmi',
          fallbackUrl: 'https://backup.qurango.net/ahmad_alajmi.mp3',
          style: 'Murattal',
          imageUrl: 'images/aaa.webp',
          imageLoaded: true
        }
      ]
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredStations.length / this.itemsPerPage);
    },
    paginatedStations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredStations.slice(start, start + this.itemsPerPage);
    },
    availableCategories() {
      return [...new Set(this.stations.map(station => station.category || 'Recitation'))];
    },
    popularReciters() {
      const liked = this.likedStations.map(s => ({ ...s, source: 'liked' }));
      const recent = this.recentlyPlayed.map(s => ({ ...s, source: 'recent' }));
      const combined = [...liked, ...recent.filter(r => !liked.some(l => l.id === r.id))];
      
      const interactionCounts = this.stations.reduce((acc, station) => {
        acc[station.id] = {
          likes: this.likedStations.some(s => s.id === station.id) ? 1 : 0,
          plays: this.recentlyPlayed.filter(s => s.id === station.id).length,
        };
        return acc;
      }, {});

      const sorted = combined
        .sort((a, b) => {
          const aScore = (interactionCounts[a.id]?.likes || 0) * 2 + (interactionCounts[a.id]?.plays || 0);
          const bScore = (interactionCounts[b.id]?.likes || 0) * 2 + (interactionCounts[b.id]?.plays || 0);
          return bScore - aScore;
        })
        .slice(0, 8);

      const remainingSlots = 8 - sorted.length;
      if (remainingSlots > 0) {
        const defaults = this.defaultPopularReciters
          .filter(d => !sorted.some(s => s.id === d.id))
          .slice(0, remainingSlots);
        sorted.push(...defaults);
      }
      return sorted;
    },
  },
  methods: {
    toggleReciters() {
      this.showReciters = !this.showReciters;
    },
    handleImageError(reciter) {
      reciter.imageLoaded = false;
    },
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').substring(0, 2);
    },
    initializeAudio(id) {
      const audio = this.getAudioForStation(id);
      if (audio && !audio.src) {
        const station = this.defaultPopularReciters.find(s => s.id === id) || this.stations.find(s => s.id === id);
        if (station) {
          audio.src = station.url;
        }
      }
    },
    pauseAllAudio() {
      // Pause any currently playing audio
      if (this.currentAudio) {
        const currentId = Object.keys(this.$refs).find(key => {
          const ref = this.$refs[key];
          return Array.isArray(ref) && ref[0] === this.currentAudio;
        })?.replace('audioPlayer-', '');
        if (currentId) {
          this.currentAudio.pause();
          this.playingStates[currentId] = false;
          this.playbackErrors[currentId] = null;
          this.currentPlayingStationId = null;
        }
        this.currentAudio = null;
      }
      // Ensure all playing states are reset
      Object.keys(this.playingStates).forEach(id => {
        if (this.playingStates[id]) {
          const audio = this.getAudioForStation(id);
          if (audio) audio.pause();
          this.playingStates[id] = false;
        }
      });
    },
    async togglePlay(id) {
      this.initializeAudio(id);
      const audio = this.getAudioForStation(id);
      if (!audio) {
        console.error(`No audio element found for station ${id}`);
        this.playbackErrors[id] = 'No audio element available';
        return;
      }

      // If this station is already playing, pause it
      if (this.isPlaying(id)) {
        audio.pause();
        this.playingStates[id] = false;
        this.currentAudio = null;
        this.currentPlayingStationId = null;
        this.playbackErrors[id] = null;
        return;
      }

      // Pause any other playing audio
      this.pauseAllAudio();

      // Play the new station
      try {
        await audio.play();
        this.playingStates[id] = true;
        this.currentAudio = audio;
        this.currentPlayingStationId = id;
        this.playbackErrors[id] = null;
        this.addToRecentlyPlayed(id);
        this.applyVolume(id);
      } catch (error) {
        console.error(`Playback failed for station ${id}:`, error);
        this.playbackErrors[id] = error.message || 'Failed to play audio';
        this.playingStates[id] = false;
        this.currentAudio = null;
        this.currentPlayingStationId = null;
        
        // Try fallback URL if available
        const station = this.defaultPopularReciters.find(s => s.id === id) || this.stations.find(s => s.id === id);
        if (station?.fallbackUrl) {
          console.log(`Trying fallback URL for station ${id}`);
          audio.src = station.fallbackUrl;
          try {
            await audio.play();
            this.playingStates[id] = true;
            this.currentAudio = audio;
            this.currentPlayingStationId = id;
            this.playbackErrors[id] = null;
            this.addToRecentlyPlayed(id);
            this.applyVolume(id);
          } catch (fallbackError) {
            console.error(`Fallback playback failed for station ${id}:`, fallbackError);
            this.playbackErrors[id] = fallbackError.message || 'Failed to play fallback audio';
          }
        }
      }
    },
    async playAndScrollToStation(id) {
      // Scroll to the station if it's in the "All Radio Stations" or "Liked Stations" section
      const stationElement = document.getElementById(`station-${id}`);
      if (stationElement) {
        const stationIndex = this.filteredStations.findIndex(station => station.id === id);
        if (stationIndex !== -1) {
          this.currentPage = Math.floor(stationIndex / this.itemsPerPage) + 1;
          await this.$nextTick();
          stationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      // Toggle playback (will handle pausing other players)
      await this.togglePlay(id);
    },
    isPlaying(id) {
      return !!this.playingStates[id];
    },
    getAudioForStation(id) {
      return this.$refs[`audioPlayer-${id}`]?.[0] || null;
    },
    applyVolume(id) {
      const audio = this.getAudioForStation(id);
      if (audio && this.volumes[id] !== undefined) {
        audio.volume = this.volumes[id] / 100;
      }
    },
    addToRecentlyPlayed(id) {
      const station = this.defaultPopularReciters.find(s => s.id === id) || this.stations.find(s => s.id === id);
      if (!station) return;
      this.recentlyPlayed = this.recentlyPlayed.filter(s => s.id !== id);
      this.recentlyPlayed.unshift({ ...station, lastPlayed: new Date().toISOString() });
      if (this.recentlyPlayed.length > 10) this.recentlyPlayed.pop();
      localStorage.setItem('recentlyPlayed', JSON.stringify(this.recentlyPlayed));
    },
    async fetchStations() {
      this.isLoading = true;
      this.fetchError = null;
      try {
        const response = await fetch('https://mp3quran.net/api/v3/radios?language=eng');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        const apiStations = data.radios.map((radio) => ({
          id: radio.id + 1000,
          name: radio.name,
          url: radio.url,
          category: radio.category || this.assignCategory(radio.name),
          imageUrl: radio.image || 'https://via.placeholder.com/80',
          imageLoaded: true
        }));
        this.stations = [
          ...this.defaultPopularReciters,
          ...apiStations.filter(apiStation => !this.defaultPopularReciters.some(pr => pr.id === apiStation.id)),
        ].filter(station => this.isValidUrl(station.url));
        this.filteredStations = this.stations;
        this.initializeVolumes();
        this.loadLikedStations();
        this.loadRecentlyPlayed();
      } catch (error) {
        console.error('Failed to fetch stations:', error);
        this.fetchError = 'Failed to load stations. Using default reciters.';
        this.stations = [...this.defaultPopularReciters].filter(station => this.isValidUrl(station.url));
        this.filteredStations = this.stations;
        this.initializeVolumes();
      } finally {
        this.isLoading = false;
      }
    },
    isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch {
        console.warn(`Invalid URL: ${url}`);
        return false;
      }
    },
    assignCategory(name) {
      name = name.toLowerCase();
      if (name.includes('translation') || name.includes('translate')) return 'Translation';
      if (name.includes('biography') || name.includes('seerah')) return 'Biography';
      if (name.includes('fatwa') || name.includes('ruling')) return 'Fatwa';
      return 'Recitation';
    },
    selectSuggestion(name) {
      this.searchQuery = name;
      this.filteredSuggestions = [];
      this.showSuggestions = false;
      this.handleSearch(); // Trigger search with selected name
    },
    hideSuggestions() {
      // Delay to allow click on suggestion
      setTimeout(() => {
        this.showSuggestions = false;
        this.highlightIndex = -1;
      }, 200);
    },
    handleKeydown(event) {
      if (!this.showSuggestions || !this.filteredSuggestions.length) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.highlightIndex = (this.highlightIndex + 1) % this.filteredSuggestions.length;
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.highlightIndex = (this.highlightIndex - 1 + this.filteredSuggestions.length) % this.filteredSuggestions.length;
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (this.highlightIndex >= 0 && this.filteredSuggestions[this.highlightIndex]) {
          this.selectSuggestion(this.filteredSuggestions[this.highlightIndex].name);
        }
      } else if (event.key === 'Escape') {
        this.showSuggestions = false;
        this.highlightIndex = -1;
      }
    },
    handleSearch() {
      // Reset highlight index
      this.highlightIndex = -1;

      // Autocomplete logic: show suggestions after 2 characters
      if (this.searchQuery.length >= 2) {
        this.filteredSuggestions = this.stations.filter(station =>
          station.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ).slice(0, 5); // Limit to 5 suggestions
        this.showSuggestions = true;
      } else {
        this.filteredSuggestions = [];
        this.showSuggestions = false;
      }

      // Existing search filtering logic
      this.currentPage = 1; // Reset to first page
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredStations = this.stations.filter(station => {
        const matchesName = station.name.toLowerCase().includes(query);
        const matchesCategory = this.selectedCategory === 'All Categories' || station.category === this.selectedCategory;
        return matchesName && matchesCategory;
      });
    },
    highlightSearch(name) {
      if (!this.searchQuery) return name;
      const regex = new RegExp(`(${this.searchQuery})`, 'gi');
      return name.replace(regex, '<mark style="background:#0db691;color:white" >$1</mark>');
    },
    async handlePlay(id, event) {
      const allAudios = Object.values(this.$refs).filter(el => el && el.tagName === 'AUDIO');
      const current = event.target;

      allAudios.forEach((audio) => {
        if (audio !== current) {
          audio.pause();
          const stationId = this.stations.find((s) => s.url === audio.src)?.id;
          if (stationId) this.playingStates[stationId] = false;
        }
      });

      this.currentAudio = current;
      this.currentPlayingStationId = id;
      this.playingStates[id] = true;
      this.playbackErrors[id] = null;
      this.addToRecentlyPlayed(id);
      this.applyVolume(id);

      try {
        await current.play();
      } catch (error) {
        console.error(`Playback failed for station ${id}:`, error);
        this.playbackErrors[id] = error.message || 'Failed to play audio';
        this.playingStates[id] = false;
        this.currentAudio = null;
        this.currentPlayingStationId = null;
      }
    },
    handlePause(id) {
      if (this.currentAudio) {
        const stationId = this.stations.find((s) => s.url === this.currentAudio.src)?.id;
        if (stationId) {
          this.playingStates[stationId] = false;
          this.playbackErrors[stationId] = null;
          this.currentPlayingStationId = null;
        }
        this.currentAudio = null;
      }
    },
    handleAudioError(stationId, event) {
      const error = event.target.error;
      let errorMessage = "Failed to load audio.";
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Audio source not supported or invalid.";
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = "Network error while loading audio.";
            break;
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = "Audio playback was aborted.";
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = "Error decoding audio.";
            break;
          default:
            errorMessage = `Audio error: ${error.message || 'Unknown error'}`;
        }
      }
      this.$set(this.playbackErrors, stationId, errorMessage);
      console.error(`Audio error for station ${stationId}:`, error);
    },
    isLive(id) {
      return isNaN(this.durations[id]) || this.durations[id] === Infinity;
    },
    updateTime(id) {
      const audio = this.getAudioForStation(id);
      if (audio && this.isPlaying(id)) {
        this.currentTimes = { ...this.currentTimes, [id]: audio.currentTime };
      }
    },
    updateDuration(id) {
      const audio = this.getAudioForStation(id);
      if (audio) {
        this.durations = { ...this.durations, [id]: audio.duration || Infinity };
      }
    },
    seek(event, id) {
      const audio = this.getAudioForStation(id);
      if (audio && !this.isLive(id)) {
        const value = parseFloat(event.target.value);
        audio.currentTime = value;
        this.currentTimes = { ...this.currentTimes, [id]: value };
      }
    },
    formatTime(seconds) {
      if (isNaN(seconds) || seconds === Infinity) return 'Live';
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    },
    setVolume(event, id) {
      const volume = parseFloat(event.target.value);
      this.volumes = { ...this.volumes, [id]: volume };
      const audio = this.getAudioForStation(id);
      if (audio) {
        audio.volume = volume / 100;
      }
      localStorage.setItem(`volume-${id}`, volume);
      if (event.target instanceof HTMLElement) {
        event.target.style.setProperty('--volume-level', `${volume}%`);
      }
    },
    toggleMute(id) {
      this.volumes = { ...this.volumes, [id]: this.volumes[id] === 0 ? 50 : 0 };
      this.applyVolume(id);
      localStorage.setItem(`volume-${id}`, this.volumes[id]);
    },
    initializeVolumes() {
      this.stations.forEach(station => {
        const savedVolume = localStorage.getItem(`volume-${station.id}`);
        this.volumes = { ...this.volumes, [station.id]: savedVolume ? parseFloat(savedVolume) : 50 };
      });
    },
    toggleLike(station) {
      const index = this.likedStations.findIndex((s) => s.id === station.id);
      if (index === -1) {
        this.likedStations.push(station);
      } else {
        this.likedStations.splice(index, 1);
      }
      localStorage.setItem('likedStations', JSON.stringify(this.likedStations));
    },
    isLiked(id) {
      return this.likedStations.some((s) => s.id === id);
    },
    loadLikedStations() {
      const liked = JSON.parse(localStorage.getItem('likedStations') || '[]');
      this.likedStations = liked.filter((s) => this.stations.some((station) => station.id === s.id));
    },
    loadRecentlyPlayed() {
      const recent = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
      this.recentlyPlayed = recent.filter((s) => this.stations.some((station) => station.id === s.id));
    },
    formatDate(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    handlePlaybackError(id, error) {
      this.playbackErrors[id] = {
        message: error.message || 'Failed to play audio',
        hidden: true // Hide station on error
      };
      this.setPlayingState(id, false);
    },
    retryPlayback(id) {
      this.playbackErrors[id] = null;
      this.togglePlay(id);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  mounted() {
    this.fetchStations();
  },
};
</script>

<style scoped>
body {
  background-color: #fafafa;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
}

.container {
  max-width: 1400px;
  padding: 1.5rem 1rem;
}

.radio-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #00bfa6;
}

/* .radio-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 191, 166, 0.12);
} */

.reciter-card:hover .play-overlay {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
}

.play-icon {
  font-size: 2rem;
  color: white;
}

.radio-card.active-card {
  border: 2px solid #00bfa6;
}

.card-title {
  font-size: clamp(1.125rem, 3.5vw, 1.25rem);
  color: #1a3c34;
  max-width: 85%;
}

.like-button {
  background: none;
  border: none;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background 0.2s ease, transform 0.2s ease;
}

.like-button:hover {
  background: rgba(0, 191, 166, 0.1);
  transform: scale(1.1);
}

.like-button:active {
  transform: scale(0.95);
}

.like-icon {
  color: #6c757d;
  transition: color 0.2s ease;
}

.like-icon.bi-heart-fill {
  color: #dc3545;
}


.playback-controls {
  gap: 0.5rem;
}

.play-button {
  background: #00bfa6;
  border-radius: 50%;
  width: clamp(40px, 10vw, 44px);
  height: clamp(40px, 10vw, 44px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease;
}

.play-button:hover {
  background: #00897b;
  transform: scale(1.05);
}

.play-button:active {
  transform: scale(0.95);
}

.play-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.play-icon {
  font-size: clamp(1.5rem, 5vw, 1.75rem);
  color: #ffffff;
}

.time-display {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: #6c757d;
  font-family: 'Inter', monospace;
  min-width: 40px;
  text-align: center;
}

.seek-bar,
.volume-bar {
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  border-radius: 2.5px;
  background: #e9ecef;
  cursor: pointer;
  transition: background 0.2s ease;
  accent-color: #00bfa6;
}

.seek-bar::-webkit-slider-thumb,
.volume-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #00bfa6;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.seek-bar::-moz-range-thumb,
.volume-bar::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #00bfa6;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.seek-bar:not(:disabled) {
  background: linear-gradient(to right, #00bfa6 var(--value, 0%), #e9ecef var(--value, 0%));
}

.seek-bar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.volume-controls {
  gap: 0.5rem;
}

.volume-button {
  background: none;
  border: none;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background 0.2s ease, transform 0.2s ease;
}

.volume-button:hover {
  background: rgba(0, 191, 166, 0.1);
  transform: scale(1.1);
}

.volume-button:active {
  transform: scale(0.95);
}

.volume-icon {
  color: #6c757d;
  font-size: clamp(1.25rem, 4vw, 1.5rem);
}


.volume-bar {
  background: linear-gradient(to right, #00bfa6 calc(var(--volume-level, 50%)), #e9ecef calc(var(--volume-level, 50%)));
}

.form-control,
.form-select {
  border: none;
  border-radius: 20px;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: #495057;
  transition: box-shadow 0.2s ease;
}

.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 6px rgba(0, 191, 166, 0.3);
  outline: none;
}

.input-group.shadow-sm {
  border-radius: 20px;
  overflow: hidden;
}

mark {
  background-color: rgba(0, 191, 166, 0.2);
  color: #1a3c34;
  padding: 0 2px;
}

.section-animate {
  animation: sectionSlide 0.3s ease-out;
}

@keyframes sectionSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  transition: color 0.2s ease;
}

.section-header:hover {
  color: #00bfa6;
}

.text-danger {
  color: #d32f2f;
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
}

.btn-outline-teal {
  border-color: #00bfa6;
  color: #00bfa6;
  background: transparent;
  transition: background 0.2s ease, color 0.2s ease;
}

.btn-outline-teal:hover {
  background: #00bfa6;
  color: #ffffff;
}

.btn-outline-teal:active {
  background: #00897b;
}

.btn-outline-teal:disabled {
  border-color: #6c757d;
  color: #6c757d;
  background: transparent;
  cursor: not-allowed;
}

.pagination-nav {
  background: transparent;
  gap: 1rem;
}

/* Search and Filter Styles */
.search-filter-container {
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.search-filter-container .input-group {
  flex: 1;
}

/* Popular Reciters Styles */
.popular-reciter-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 191, 166, 0.4) transparent;
}

.popular-reciter-scroll::-webkit-scrollbar {
  height: 6px;
}

.popular-reciter-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.popular-reciter-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 191, 166, 0.4);
  border-radius: 3px;
}

.popular-reciter-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 191, 166, 0.6);
}

.radio-card {
  transition: all 0.3s ease;
  background-color: #ffffff;
  border-radius: 8px;
}

.radio-card.active-card {
  background-color: rgba(0, 191, 166, 0.161); /* Light blue background for active station */
  border: 2px solid #007bff; /* Blue border to highlight */
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3); /* Subtle shadow for emphasis */
}



.radio-card.active-card .play-icon {
  color: #fff; /* Darker color for play icon when active */
}


.reciter-card {
  background: #f8f9fa;
  border: 2px solid #00897b;
  /* transition: transform 0.3s ease, box-shadow 0.3s ease; */
}

.reciter-card:hover {
  /* transform: translateY(-5px); */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* .reciter-image {
  transition: transform 0.3s ease;
}

.reciter-card:hover .reciter-image {
  transform: scale(1.1);
} */

.reciter-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reciter-name {
  color: #1a3c34;
  margin: 0;
  white-space: normal;
  overflow-wrap: break-word;
  font-size: 2em;
}



/* Responsive Design */
@media (max-width: 576px) {
  .container {
    padding: 1rem 0.5rem;
  }

  .radio-card {
    margin-bottom: 0.75rem;
  }


  .card-title {
    font-size: 1rem;
    max-width: 80%;
  }

  .like-icon,
  .volume-icon {
    font-size: 1.3rem;
  }

  .play-button {
    width: 36px;
    height: 36px;
  }

  .play-icon {
    font-size: 1.25rem;
  }

  .time-display {
    font-size: 0.75rem;
    min-width: 35px;
  }

  .volume-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .volume-button {
    margin-bottom: 0.25rem;
  }

  .seek-bar,
  .volume-bar {
    height: 4px;
  }

  .seek-bar::-webkit-slider-thumb,
  .seek-bar::-moz-range-thumb {
    width: 10px;
    height: 10px;
  }

  .volume-bar::-webkit-slider-thumb,
  .volume-bar::-moz-range-thumb {
    width: 8px;
    height: 8px;
  }

  .form-control,
  .form-select {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }

  .btn-outline-teal {
    font-size: 0.875rem;
    padding: 0.25rem 1rem;
  }

  .search-filter-container {
    flex-direction: column;
    gap: 0.75rem;
  }

  .reciter-card {
    min-width: 120px;
    padding: 0.75rem;
  }

  .reciter-name {
    font-size: 0.875rem;
  }

  .reciter-station {
    font-size: 0.75rem;
  }

  .popular-reciter-scroll {
    gap: 1rem;
    padding: 1rem 0.5rem;
  }

  .pagination-nav {
    flex-direction: column;
    gap: 0.75rem;
  }
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
.radio-card.active-card {
  animation: pulse 1.5s infinite ease-in-out;
}

@media (min-width: 768px) and (max-width: 991px) {
  .row-cols-md-2>.col {
    flex: 0 0 auto;
    width: 50%;
  }
}

@media (min-width: 992px) {
  .row-cols-lg-3>.col {
    flex: 0 0 auto;
    width: 33.333333%;
  }
}
</style>