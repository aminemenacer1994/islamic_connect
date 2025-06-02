<template>
  <div class="container py-5">
    <h1 class="text-center fw-bold display-4 mb-4">Islamic Radio Stations</h1>
    
    <p class="text-center mb-4 lead">
      Discover live Quranic radio stations from renowned reciters worldwide.
    </p>

    <!-- Search Bar and Category Dropdown -->
    <section class="reciter-browser mb-5">
      
      <!-- Improved search section with visual grouping -->
      <div class="search-section bg-light rounded-4 p-4 mb-5 shadow-sm">
        <h2 class="visually-hidden">Search Reciters</h2>
        <div class="row g-3">
          <div class="col-md-8">
            <label for="reciterSearch" class="form-label fw-semibold">Search by name</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-0">
                <i class="fas fa-search text-muted"></i>
              </span>
              <input v-model="searchQuery" @input="handleSearch" id="reciterSearch" type="text"
                class="form-control border-0 rounded-pill px-3 py-2 fs-5" placeholder="Example: Abdul Basit..."
                aria-label="Search reciters by name" />
            </div>
          </div>
          <div class="col-md-4">
            <label for="reciterCategory" class="form-label fw-semibold">Filter by style</label>
            <select v-model="selectedCategory" @change="handleSearch" id="reciterCategory"
              class="form-select border-0 rounded-pill px-3 py-2 fs-5" aria-label="Filter reciters by style">
              <option value="All Categories">All Recitation Styles</option>
              <option v-for="category in availableCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Popular Reciters Section with better visual hierarchy -->
      <section class="popular-reciters mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold fs-3 text-dark mb-0">Popular Reciters</h2>
        </div>

        <div class="popular-reciter-grid row g-3">
          <div v-for="(reciter, index) in popularReciters.slice(0, 8)" :key="reciter.id"
            class="col-6 col-sm-4 col-md-3">
            <div class="reciter-card card h-100 shadow-sm border-0 rounded-3 overflow-hidden"
              :style="{ animationDelay: `${index * 0.1}s` }" @click="playAndScrollToStation(reciter.id)" role="button"
              tabindex="0" @keydown.enter="playAndScrollToStation(reciter.id)"
              :aria-label="'Play ' + reciter.name + ' recitations'">
              <div class="reciter-img-container bg-light">
                <div class="placeholder-img d-flex align-items-center justify-content-center">
                  <i class="fas fa-user fa-3x text-secondary"></i>
                </div>
              </div>
              <div class="reciter-content p-3 text-center">
                <h3 class="reciter-name fs-5 fw-semibold mb-1">{{ reciter.name }}</h3>
                <p class="text-muted small mb-0">{{ reciter.style || 'Various styles' }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="card-title mb-0 fw-semibold text-truncate fs-5" :id="'station-title-' + station.id"
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
        <h3 class="fw-bold fs-3 text-dark">All Radio Stations</h3>
        <!-- <span class="badge bg-primary fs-6">
          {{ paginatedStations.length }} Station{{ paginatedStations.length !== 1 ? 's' : '' }}
        </span> -->
      </div>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="station in paginatedStations" :key="station.id" class="col">
          <div class="card radio-card shadow-sm border-0" :class="{ 'active-card': currentAudio?.src === station.url }"
            :id="'station-' + station.id" role="article" :aria-labelledby="'station-title-' + station.id">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="card-title mb-0 fw-semibold text-truncate fs-5" :id="'station-title-' + station.id"
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
                  @loadedmetadata="updateDuration(station.id)" :aria-label="'Audio stream for ' + station.name"></audio>
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
                  <input type="range" min="0" :max="durations[station.id] || 100" :value="currentTimes[station.id] || 0"
                    @input="seek($event, station.id)" class="seek-bar flex-grow-1" :disabled="isLive(station.id)"
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
      currentTimes: {},
      durations: {},
      playingStates: {},
      playbackErrors: {},
      defaultPopularReciters: [
        { id: 1, name: 'Mishary Rashid Alafasy', url: 'https://server8.mp3quran.net/afs/001.mp3', category: 'Recitation', image: 'https://via.placeholder.com/80?text=Alafasy' },
        { id: 2, name: 'Abdul Rahman Al-Sudais', url: 'https://server8.mp3quran.net/sds/001.mp3', category: 'Recitation', image: 'https://via.placeholder.com/80?text=Sudais' },
        { id: 3, name: 'Saad Al-Ghamdi', url: 'https://server8.mp3quran.net/s_gmd/001.mp3', category: 'Recitation', image: 'https://via.placeholder.com/80?text=Ghamdi' },
        { id: 4, name: 'Maher Al-Muaiqly', url: 'https://server8.mp3quran.net/maher/001.mp3', category: 'Recitation', image: 'https://via.placeholder.com/80?text=Muaiqly' },
        { id: 5, name: 'Yasser Al-Dosari', url: 'https://server8.mp3quran.net/yasser/001.mp3', category: 'Recitation', image: 'https://via.placeholder.com/80?text=Dosari' },
        { id: 6, name: 'Abdul Basit Abdul Samad', url: 'https://server8.mp3quran.net/basit/001.mp3', category: 'Recitation', image: 'https://via.placeholder.com/80?text=Basit' },
        { id: 7, name: 'Saud Al-Shuraim', url: 'https://server8.mp3quran.net/shur/001.mp3', category: 'Recitation', image: 'https://via.placeholder.com/80?text=Shuraim' },
        { id: 8, name: 'Ahmad Al-Ajmi', url: 'https://server8.mp3quran.net/ajm/001.mp3', category: 'Recitation', image: 'https://via.placeholder.com/80?text=Ajmi' },
      ],
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
    async fetchStations() {
      try {
        const response = await fetch('https://mp3quran.net/api/v3/radios?language=eng');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        const apiStations = data.radios.map((radio) => ({
          id: radio.id,
          name: radio.name,
          url: radio.url,
          category: radio.category || this.assignCategory(radio.name),
          image: radio.image || 'https://via.placeholder.com/80',
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
        this.stations = [...this.defaultPopularReciters].filter(station => this.isValidUrl(station.url));
        this.filteredStations = this.stations;
        this.initializeVolumes();
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
    handleSearch() {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredStations = this.stations.filter((station) => {
        const matchesQuery = station.name.toLowerCase().includes(query);
        const matchesCategory = this.selectedCategory !== 'All Categories'
          ? station.category === this.selectedCategory
          : true;
        return matchesQuery && matchesCategory;
      });
      this.currentPage = 1;
    },
    highlightSearch(name) {
      if (!this.searchQuery) return name;
      const regex = new RegExp(`(${this.searchQuery})`, 'gi');
      return name.replace(regex, '<mark>$1</mark>');
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
      }
    },
    handlePause(id) {
      if (this.currentAudio) {
        const stationId = this.stations.find((s) => s.url === this.currentAudio.src)?.id;
        if (stationId) {
          this.playingStates[stationId] = false;
          this.playbackErrors[stationId] = null;
        }
        this.currentAudio = null;
      }
    },
    async togglePlay(id) {
      const audio = this.getAudioForStation(id);
      if (!audio) {
        console.error(`No audio element found for station ${id}`);
        this.playbackErrors[id] = 'No audio element available';
        return;
      }

      if (this.isPlaying(id)) {
        audio.pause();
      } else {
        try {
          await audio.play();
          this.playingStates[id] = true;
          this.currentAudio = audio;
          this.playbackErrors[id] = null;
          this.addToRecentlyPlayed(id);
          this.applyVolume(id);
        } catch (error) {
          console.error(`Playback failed for station ${id}:`, error);
          this.playbackErrors[id] = error.message || 'Failed to play audio';
        }
      }
    },
    async playAndScrollToStation(id) {
      const stationElement = document.getElementById(`station-${id}`);
      if (stationElement) {
        const stationIndex = this.filteredStations.findIndex(station => station.id === id);
        if (stationIndex !== -1) {
          this.currentPage = Math.floor(stationIndex / this.itemsPerPage) + 1;
          await this.$nextTick();
          stationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      await this.togglePlay(id);
    },
    isPlaying(id) {
      return !!this.playingStates[id];
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
    applyVolume(id) {
      const audio = this.getAudioForStation(id);
      if (audio && this.volumes[id] !== undefined) {
        audio.volume = this.volumes[id] / 100;
      }
      const volumeBars = document.querySelectorAll(`.volume-bar[data-station-id="${id}"]`);
      volumeBars.forEach(bar => {
        bar.style.setProperty('--volume-level', `${this.volumes[id] || 50}%`);
      });
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
    addToRecentlyPlayed(id) {
      const station = this.stations.find((s) => s.id === id);
      if (!station) return;
      this.recentlyPlayed = this.recentlyPlayed.filter((s) => s.id !== id);
      this.recentlyPlayed.unshift({ ...station, lastPlayed: new Date().toISOString() });
      if (this.recentlyPlayed.length > 10) this.recentlyPlayed.pop();
      localStorage.setItem('recentlyPlayed', JSON.stringify(this.recentlyPlayed));
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
    playStation(url) {
      const station = this.stations.find((s) => s.url === url);
      if (station) {
        const audio = this.getAudioForStation(station.id);
        if (audio) {
          audio.play().catch((error) => {
            console.error(`Playback failed for ${url}:`, error);
            this.playbackErrors[station.id] = error.message || 'Failed to play audio';
          });
          this.handlePlay(station.id, { target: audio });
        }
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    getAudioForStation(id) {
      return this.$refs[`audioPlayer-${id}`]?.[0] || null;
    },
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.radio-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 191, 166, 0.12);
}

.radio-card.active-card {
  border: 2px solid #00bfa6;
  background: linear-gradient(180deg, #f5fffe 0%, #ffffff 100%);
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

.volume-icon.bi-volume-up,
.volume-icon.bi-volume-down {
  color: #00bfa6;
}

.volume-bar {
  background: linear-gradient(to right, #00bfa6 calc(var(--volume-level, 50%)), #e9ecef calc(var(--volume-level, 50%)));
}

.form-control,
.form-select {
  background-color: #ffffff;
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

.reciter-card {
  background: #f8f9fa;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.reciter-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.reciter-image {
  transition: transform 0.3s ease;
}

.reciter-card:hover .reciter-image {
  transform: scale(1.1);
}

.reciter-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.reciter-name {
  color: #1a3c34;
  margin: 0;
  font-size: 1rem;
  white-space: normal;
  overflow-wrap: break-word;
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