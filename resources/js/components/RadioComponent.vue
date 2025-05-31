<template>
  <div class="container py-5">
    <h1 class="display-4 fw-bold text-center mb-3 ">Islamic Radio Stations</h1>
    <p class="text-center mb-5 lead ">
      Discover live Quranic radio stations featuring renowned reciters from around the world. Search, like, and revisit
      your favorites effortlessly.
    </p>

    <!-- Liked Stations Section -->
    <div class="row mb-5">
      <section class="row justify-content-center mb-5">
        <div class="col-md-8 col-lg-6 text-center">
          <h2 class="fw-semibold mb-3">Search for Reciter's Station</h2>
          <div class="input-group shadow-sm mb-3">
            <input v-model="searchQuery" @input="handleSearch" type="text"
              class="form-control border-0 rounded-sm px-3 py-2" placeholder="Search by name..."
              aria-label="Search radio stations" />
          </div>
          <div class="input-group shadow-sm">
            <select v-model="selectedCategory" @change="handleSearch" class="form-select border-0 rounded-sm px-3 py-2"
              aria-label="Filter by category">
              <option v-for="category in availableCategories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
        </div>
      </section>
    </div>

    <section v-if="likedStations.length">
      <h4 class="fw-bold mb-3  cursor-pointer section-header" @click="showLiked = !showLiked" role="button"
        :aria-expanded="showLiked" :aria-controls="`liked-stations`">
        Liked Stations ({{ likedStations.length }})
        <i :class="showLiked ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="ms-1"></i>
      </h4>
      <div v-if="showLiked" class="section-animate" id="liked-stations">
        <div class="row row-cols-1 row-cols-md-1 row-cols-lg-6 g-4">
          <div v-for="station in likedStations" :key="station.id" class="col">
            <div class="card border-0 shadow animate-card" style="border-radius: 12px;"
              :class="{ 'active-card': currentAudio?.src === station.url }">
              <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="card-title mb-0 fw-semibold" v-html="highlightSearch(station.name)"></h5>
                  <i class="bi bi-heart-fill  cursor-pointer" @click="toggleLike(station)"
                    aria-label="Unlike station"></i>
                </div>
                <div class="audio-player shadow-sm" :class="{ playing: isPlaying(station.id) }" role="region"
                  aria-label="Audio player">
                  <audio ref="audioPlayer" :src="station.url" @play="handlePlay(station.id, $event)"
                    @pause="handlePause" @timeupdate="updateTime(station.id)"
                    @loadedmetadata="updateDuration(station.id)"></audio>
                  <div class="d-flex align-items-center mb-3">
                    <button class="btn btn-icon me-2" @click="togglePlay(station.id)"
                      :aria-label="isPlaying(station.id) ? 'Pause' : 'Play'">
                      <i :class="isPlaying(station.id) ? 'bi bi-pause-circle' : 'bi bi-play-circle'"></i>
                    </button>
                    <span class="time-display me-2" aria-live="polite">
                      {{ formatTime(currentTimes[station.id] || 0) }}
                    </span>
                    <input type="range" min="0" :max="durations[station.id] || 100"
                      :value="currentTimes[station.id] || 0" @input="seek($event, station.id)"
                      class="seek-bar flex-grow-1 me-2" :disabled="isLive(station.id)" aria-label="Seek bar" />
                    <span class="time-display" aria-live="polite">
                      {{ isLive(station.id) ? 'Live' : formatTime(durations[station.id] || 0) }}
                    </span>
                  </div>
                  <div class="volume-control d-flex align-items-center">
                    <button class="btn btn-icon me-2" @click="toggleMute(station.id)"
                      :aria-label="volume === 0 ? 'Unmute' : 'Mute'">
                      <i :class="volume === 0 ? 'bi bi-volume-mute' : 'bi bi-volume-up-fill'"></i>
                    </button>
                    <input type="range" min="0" max="100" v-model="volume" @input="setVolume($event, station.id)"
                      class="form-range w-100" aria-label="Volume control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Radio Stations -->
    <section>
      <h3 class="fw-bold mb-4 ">All Radio Stations</h3>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="station in paginatedStations" :key="station.id" class="col">
          <div class="card border-0 shadow animate-card" style="border-radius: 12px;"
            :class="{ 'active-card': currentAudio?.src === station.url }">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="card-title mb-0 fw-semibold" v-html="highlightSearch(station.name)"></h6>
                <i :class="isLiked(station.id) ? 'bi bi-heart-fill ' : 'bi bi-heart'" @click="toggleLike(station)"
                  class="cursor-pointer" :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'"></i>
              </div>
              <div class="audio-player" :class="{ 'is-playing': isPlaying(station.id) }" role="region"
                aria-label="Audio player for {{ station.name }}" style="
                background: white;
                border-radius: 12px;
                box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
                padding: 1rem;
                transition: all 0.2s ease;
              ">
                <audio ref="audioPlayer" :src="station.url" @play="handlePlay(station.id, $event)" @pause="handlePause"
                  @timeupdate="updateTime(station.id)" @loadedmetadata="updateDuration(station.id)"
                  :aria-label="'Audio stream for ' + station.name"></audio>

                <!-- Main playback controls -->
                <div class="playback-controls" style="display: flex; align-items: center; margin-bottom: 1rem;">
                  <button @click="togglePlay(station.id)"
                    :aria-label="isPlaying(station.id) ? 'Pause playback' : 'Play playback'" style="
                      background: none;
                      border: none;
                      color: #0d6efd;
                      padding: 0;
                      margin-right: 1rem;
                      width: 48px;
                      height: 48px;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transition: transform 0.2s ease;
                    " :style="{ transform: isPlaying(station.id) ? 'scale(1.05)' : 'scale(1)' }">
                    <i :class="isPlaying(station.id) ? 'bi bi-pause-fill' : 'bi bi-play-fill'"
                      style="font-size: 1.5rem;"></i>
                  </button>

                  <div style="flex-grow: 1;">
                    <div style="display: flex; align-items: center;">
                      <span class="time-current" aria-live="polite" style="
                        font-size: 0.875rem;
                        color: #6c757d;
                        font-family: monospace;
                        min-width: 40px;
                        text-align: center;
                        margin-right: 0.5rem;
                      ">
                        {{ formatTime(currentTimes[station.id] || 0) }}
                      </span>

                      <input type="range" min="0" :max="durations[station.id] || 100"
                        :value="currentTimes[station.id] || 0" @input="seek($event, station.id)"
                        :disabled="isLive(station.id)" :aria-label="'Seek bar for ' + station.name" />

                      <span class="time-total" aria-live="polite" style="
                          font-size: 0.875rem;
                          color: #6c757d;
                          font-family: monospace;
                          min-width: 40px;
                          text-align: center;
                        ">
                        {{ isLive(station.id) ? 'LIVE' : formatTime(durations[station.id] || 0) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Volume controls -->
                <div class="volume-controls"
                  style="display: flex; align-items: center; padding-top: 0.5rem; border-top: 1px solid #f1f1f1;">
                  <button @click="toggleMute(station.id)" :aria-label="volume === 0 ? 'Unmute audio' : 'Mute audio'"
                    style="
                      background: none;
                      border: none;
                      color: #6c757d;
                      padding: 0;
                      margin-right: 0.5rem;
                      width: 32px;
                      height: 32px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    ">
                    <i :class="volume === 0 ? 'bi bi-volume-mute' : (volume < 50 ? 'bi bi-volume-down' : 'bi bi-volume-up')"
                      style="font-size: 1.25rem;"></i>
                  </button>

                  <input type="range" min="0" max="100" v-model="volume" @input="setVolume($event, station.id)"
                    aria-label="Volume level control" style="
                    -webkit-appearance: none;
                    width: 100%;
                    height: 6px;
                    border-radius: 3px;
                    background: #e9ecef;
                    cursor: pointer;
                    background-image: linear-gradient(to right, #0d6efd var(--volume-level), #e9ecef var(--volume-level));
                  " :style="{
                    '--volume-level': volume + '%',
                    'background-image': `linear-gradient(to right, #0d6efd ${volume}%, #e9ecef ${volume}%)`
                  }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-5">
      <button @click="previousPage" :disabled="currentPage === 1" class="btn  rounded-pill px-4 me-3"
        aria-label="Previous page">
        Previous
      </button>
      <span class="fw-semibold ">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn  rounded-pill px-4 ms-3"
        aria-label="Next page">
        Next
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: 'All Categories',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 12,
      stations: [],
      filteredStations: [],
      currentAudio: null,
      volume: 50,
      likedStations: [],
      recentlyPlayed: [],
      showLiked: false,
      showRecentlyPlayed: false,
      currentTimes: {},
      durations: {},
      playingStates: {},
      popularReciters: [
        { id: 1, name: 'Mishary Rashid Alafasy', url: 'https://example.com/alafasy.mp3' },
        { id: 2, name: 'Abdul Rahman Al-Sudais', url: 'https://example.com/sudais.mp3' },
        { id: 3, name: 'Saad Al-Ghamdi', url: 'https://example.com/ghamdi.mp3' },
        { id: 4, name: 'Maher Al-Muaiqly', url: 'https://example.com/muaiqly.mp3' },
        { id: 5, name: 'Yasser Al-Dosari', url: 'https://example.com/dosari.mp3' },
        { id: 6, name: 'Abdul Basit Abdul Samad', url: 'https://example.com/basit.mp3' },
        { id: 7, name: 'Hani Ar-Rifai', url: 'https://example.com/rifai.mp3' },
        { id: 8, name: 'Saud Al-Shuraim', url: 'https://example.com/shuraim.mp3' },
        { id: 9, name: 'Fares Abbad', url: 'https://example.com/abbad.mp3' },
      ],
    };
  },
  computed: {
    availableCategories() {
      const categories = [...new Set(this.stations.map(station => station.category))];
      return ['All Categories', ...categories.filter(category => category)]; // Include "All Categories" option
    },
    totalPages() {
      return Math.ceil(this.filteredStations.length / this.itemsPerPage);
    },
    paginatedStations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredStations.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async fetchStations() {
      try {
        const response = await fetch('https://mp3quran.net/api/v3/radios?language=eng');
        const data = await response.json();
        this.stations = data.radios.map((radio) => ({
          id: radio.id,
          name: radio.name,
          url: radio.url,
          category: radio.category || this.assignCategory(radio.name), // Fallback if API doesn't provide category
        }));
        // Merge popularReciters with fetched stations
        this.stations = [...this.popularReciters, ...this.stations];
        this.filteredStations = this.stations;
        this.loadLikedStations();
        this.loadRecentlyPlayed();
        this.loadVolume();
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      }
    },
    assignCategory(name) {
      name = name.toLowerCase();
      if (name.includes('translation') || name.includes('translate')) return 'Translate';
      if (name.includes('biography') || name.includes('seerah')) return 'Biography';
      if (name.includes('fatwa') || name.includes('ruling')) return 'Fatwa';
      return 'Recitation'; // Default category
    },
    handleSearch() {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredStations = this.stations.filter((station) => {
        const matchesQuery = station.name.toLowerCase().includes(query);
        const matchesCategory = this.selectedCategory && this.selectedCategory !== 'All Categories'
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
    handlePlay(id, event) {
      const allAudios = Array.isArray(this.$refs.audioPlayer) ? this.$refs.audioPlayer : [this.$refs.audioPlayer].filter(Boolean);
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
      this.addToRecentlyPlayed(id);
      this.setVolume({ target: { value: this.volume } }, id);
    },
    handlePause() {
      if (this.currentAudio) {
        const id = this.stations.find((s) => s.url === this.currentAudio.src)?.id;
        if (id) this.playingStates[id] = false;
        this.currentAudio = null;
      }
    },
    togglePlay(id) {
      const audio = this.getAudioForStation(id);
      if (audio) {
        if (this.isPlaying(id)) {
          audio.pause();
        } else {
          audio.play().catch((error) => console.error('Playback failed:', error));
        }
      }
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
      const volume = event.target.value / 100;
      const audio = this.getAudioForStation(id);
      if (audio) audio.volume = volume;
      this.volume = event.target.value;
      localStorage.setItem('playerVolume', this.volume);
    },
    toggleMute(id) {
      this.volume = this.volume === 0 ? 50 : 0;
      const audio = this.getAudioForStation(id);
      if (audio) audio.volume = this.volume / 100;
      localStorage.setItem('playerVolume', this.volume);
    },
    loadVolume() {
      const savedVolume = localStorage.getItem('playerVolume');
      if (savedVolume) {
        this.volume = parseFloat(savedVolume);
        const audios = Array.isArray(this.$refs.audioPlayer) ? this.$refs.audioPlayer : [this.$refs.audioPlayer].filter(Boolean);
        audios.forEach((audio) => {
          audio.volume = this.volume / 100;
        });
      }
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
          audio.play().catch((error) => console.error('Playback failed:', error));
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
      const station = this.stations.find((s) => s.id === id);
      if (!station) return null;
      const audios = Array.isArray(this.$refs.audioPlayer) ? this.$refs.audioPlayer : [this.$refs.audioPlayer].filter(Boolean);
      return audios.find((a) => a.src === station.url) || null;
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
}

.form-select {
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  color: #495057;
  transition: all 0.2s ease;
}

.form-select:focus {
  box-shadow: 0 0 8px rgba(0, 121, 107, 0.2);
  outline: none;
}

.input-group.shadow-sm {
  border-radius: 8px;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  padding: 2rem 1rem;
}

.-emphasis {
  color: #004d40 !important;
}

.card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.animate-card {
  animation: cardFadeIn 0.5s ease-out;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-animate {
  animation: sectionSlide 0.3s ease-out;
}

@keyframes sectionSlide {
  from {
    opacity: 0;
    max-height: 0;
  }

  to {
    opacity: 1;
    max-height: 1000px;
  }
}

.popular-recitors {
  scrollbar-width: thin;
  scrollbar-color: #6c757d transparent;
}

.popular-recitors::-webkit-scrollbar {
  height: 8px;
}

.popular-recitors::-webkit-scrollbar-thumb {
  background-color: #6c757d;
  border-radius: 10px;
}

.popular-recitors::-webkit-scrollbar-track {
  background: transparent;
}

.popular-card {
  flex: 0 0 auto;
}

mark {
  background-color: rgba(0, 121, 107, 0.2);
  color: #004d40;
  padding: 0 4px;
}

.card-title {
  font-size: 1.5rem;
}

.text-muted {
  font-size: 1rem;
}

.audio-player {
  background: #ffffff;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.audio-player.playing {
  background: #f5fafa;
}

.audio-player audio {
  display: none;
}

.btn-icon {
  background: none;
  border: none;
  padding: 0;
  font-size: 1.75rem;
  color: #6c757d;
  transition: color 0.2s ease;
}

.btn-icon:hover,
.btn-icon:focus {
  color: #495057;
}

.seek-bar,
.form-range {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: #e9ecef;
  border-radius: 5px;
  outline: none;
  position: relative;
  overflow: hidden;
}

.seek-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background: #6c757d;
  transition: width 0.2s ease;
}

.seek-bar:not(:disabled)::before {
  width: calc(var(--value) * 1%);
}

.seek-bar::-webkit-slider-thumb,
.form-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #6c757d;
  border-radius: 50%;
  cursor: pointer;
}

.seek-bar::-moz-range-thumb,
.form-range::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: #6c757d;
  border-radius: 50%;
  cursor: pointer;
}

.seek-bar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.time-display {
  font-size: 1.125rem;
  color: #6c757d;
  min-width: 60px;
  text-align: center;
  font-weight: 500;
}

.volume-control {
  margin-top: 12px;
}

.cursor-pointer {
  cursor: pointer;
}

.bi {
  font-size: 1.5rem;
}

.text-secondary {
  color: #6c757d !important;
}

.section-header {
  transition: color 0.2s ease;
}

.section-header:hover {
  color: #004d40;
}

.active-card {
  background-color: #e6f0fa !important;
  border: 1px solid #00796b !important;
}

@media (max-width: 767px) {
  .volume-control {
    flex-direction: column;
    align-items: flex-start;
  }

  .volume-control .btn-icon {
    margin-bottom: 8px;
  }

  .form-range {
    width: 100%;
  }
}

@media (min-width: 992px) {
  .row-cols-lg-3>.col {
    flex: 0 0 auto;
    width: 33.333333%;
  }

  .row-cols-md-1>.col {
    flex: 0 0 auto;
    width: 100%;
  }
}
</style>
