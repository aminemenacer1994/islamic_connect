<template>
  <div class="container-fluid py-5">
    <!-- Header -->
    <header class="text-center my-6">
      <h1 class="display-3 fw-bold ">Islamic Radio</h1>
      <p class="lead text-muted mb-5 mx-auto" style="max-width: 700px;">
        Listen to live Quranic recitations by renowned reciters from around the world.
      </p>
      <div class="row">
        <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
          <div v-if="isLoading" class="spinner-border " role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
          <input v-else v-model="searchQuery" @input="debouncedSearch" type="text" class="form-control form-control-lg"
            placeholder="Search for a reciter..." aria-label="Search radio stations" />
        </div>
      </div>
    </header>

    <!-- Popular Reciters -->
    <section class="my-6">
      <h2 class="h1 fw-semibold  mb-5">Popular Reciters</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
        <div v-for="reciter in popularReciters" :key="reciter.id" class="col">
          <div class="card h-100">
            <div class="card-body p-5">
              <h5 class="card-title fw-bold mb-4" v-html="highlightSearch(reciter.name)"></h5>
              <button class="btn  btn-lg w-100" @click="playStation(reciter.url)" :aria-label="`Play ${reciter.name}`">
                <i class="bi bi-play-fill me-2"></i> Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Liked Stations -->
    <section v-if="likedStations.length" class="my-6">
      <h2 class="h1 fw-semibold  mb-5 d-flex align-items-center cursor-pointer" @click="showLiked = !showLiked"
        role="button" :aria-expanded="showLiked">
        Liked Stations ({{ likedStations.length }})
        <i :class="showLiked ? 'bi bi-chevron-up ms-2' : 'bi bi-chevron-down ms-2'"></i>
      </h2>
      <div v-if="showLiked" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
        <div v-for="station in likedStations" :key="station.id" class="col">
          <div class="card h-100" :class="{ 'active': currentAudio?.src === station.url }">
            <div class="card-body p-5">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="card-title fw-bold mb-0" v-html="highlightSearch(station.name)"></h5>
                <i class="bi bi-heart-fill  cursor-pointer" @click="toggleLike(station)"
                  :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'"></i>
              </div>
              <div v-if="currentAudio?.src === station.url" class="audio-player">
                <audio ref="audioPlayer" :src="station.url" @play="handlePlay(station.id, $event)" @pause="handlePause"
                  @timeupdate="updateTime(station.id)" @loadedmetadata="updateDuration(station.id)"
                  :aria-label="`Audio stream for ${station.name}`" preload="none"></audio>
                <div class="d-flex align-items-center gap-3">
                  <button class="btn btn-outline-primary" @click="togglePlay(station.id)"
                    :aria-label="isPlaying(station.id) ? 'Pause' : 'Play'">
                    <i :class="isPlaying(station.id) ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
                  </button>
                  <span class="text-muted small">{{ formatTime(currentTimes[station.id] || 0) }}</span>
                  <input type="range" class="form-range flex-grow-1" min="0" :max="durations[station.id] || 100"
                    :value="currentTimes[station.id] || 0" @input="seek($event, station.id)"
                    :disabled="isLive(station.id)" :aria-label="`Seek bar for ${station.name}`" />
                  <span class="text-muted small">{{ isLive(station.id) ? 'LIVE' : formatTime(durations[station.id] || 0)
                  }}</span>
                </div>
                <div v-if="showVolume[station.id]" class="d-flex align-items-center gap-3 mt-3">
                  <button class="btn btn-outline-primary" @click="toggleMute(station.id)"
                    :aria-label="volume === 0 ? 'Unmute' : 'Mute'">
                    <i :class="volume === 0 ? 'bi bi-volume-mute' : 'bi bi-volume-up'"></i>
                  </button>
                  <input type="range" class="form-range flex-grow-1" min="0" max="100" v-model="volume"
                    @input="setVolume($event, station.id)" aria-label="Volume control" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently Played -->
    <section v-if="recentlyPlayed.length" class="my-6">
      <h2 class="h1 fw-semibold  mb-5 d-flex align-items-center cursor-pointer"
        @click="showRecentlyPlayed = !showRecentlyPlayed" role="button" :aria-expanded="showRecentlyPlayed">
        Recently Played ({{ recentlyPlayed.length }})
        <i :class="showRecentlyPlayed ? 'bi bi-chevron-up ms-2' : 'bi bi-chevron-down ms-2'"></i>
      </h2>
      <div v-if="showRecentlyPlayed" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
        <div v-for="station in recentlyPlayed" :key="station.id" class="col">
          <div class="card h-100" :class="{ 'active': currentAudio?.src === station.url }">
            <div class="card-body p-5">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="card-title fw-bold mb-0" v-html="highlightSearch(station.name)"></h5>
                <i :class="isLiked(station.id) ? 'bi bi-heart-fill ' : 'bi bi-heart'" @click="toggleLike(station)"
                  class="cursor-pointer" :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'"></i>
              </div>
              <p class="text-muted small mb-4">Last Played: {{ formatDate(station.lastPlayed) }}</p>
              <div v-if="currentAudio?.src === station.url" class="audio-player">
                <audio ref="audioPlayer" :src="station.url" @play="handlePlay(station.id, $event)" @pause="handlePause"
                  @timeupdate="updateTime(station.id)" @loadedmetadata="updateDuration(station.id)"
                  :aria-label="`Audio stream for ${station.name}`" preload="none"></audio>
                <div class="d-flex align-items-center gap-3">
                  <button class="btn btn-outline-primary" @click="togglePlay(station.id)"
                    :aria-label="isPlaying(station.id) ? 'Pause' : 'Play'">
                    <i :class="isPlaying(station.id) ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
                  </button>
                  <span class="text-muted small">{{ formatTime(currentTimes[station.id] || 0) }}</span>
                  <input type="range" class="form-range flex-grow-1" min="0" :max="durations[station.id] || 100"
                    :value="currentTimes[station.id] || 0" @input="seek($event, station.id)"
                    :disabled="isLive(station.id)" :aria-label="`Seek bar for ${station.name}`" />
                  <span class="text-muted small">{{ isLive(station.id) ? 'LIVE' : formatTime(durations[station.id] || 0)
                  }}</span>
                </div>
                <div v-if="showVolume[station.id]" class="d-flex align-items-center gap-3 mt-3">
                  <button class="btn btn-outline-primary" @click="toggleMute(station.id)"
                    :aria-label="volume === 0 ? 'Unmute' : 'Mute'">
                    <i :class="volume === 0 ? 'bi bi-volume-mute' : 'bi bi-volume-up'"></i>
                  </button>
                  <input type="range" class="form-range flex-grow-1" min="0" max="100" v-model="volume"
                    @input="setVolume($event, station.id)" aria-label="Volume control" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Radio Stations -->
    <section class="my-6">
      <h2 class="h1 fw-semibold  mb-5">All Radio Stations</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
        <div v-for="station in paginatedStations" :key="station.id" class="col">
          <div class="card radio-card shadow-sm" :class="{ 'active-card': currentAudio?.src === station.url }"
            role="article" :aria-labelledby="'station-title-' + station.id">
            <div class="card-body p-4">
              <!-- Station Header -->
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="card-title mb-0 fw-semibold text-truncate" :id="'station-title-' + station.id"
                  v-html="highlightSearch(station.name)"></h5>
                <button class="btn btn-icon like-button" @click="toggleLike(station)"
                  :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'">
                  <i :class="isLiked(station.id) ? 'bi bi-heart-fill' : 'bi bi-heart'" class="like-icon"></i>
                </button>
              </div>

              <!-- Audio Player -->
              <div class="audio-player" :class="{ playing: isPlaying(station.id) }" role="region"
                :aria-label="'Audio player for ' + station.name">
                <audio ref="audioPlayer" :src="station.url" @play="handlePlay(station.id, $event)" @pause="handlePause"
                  @timeupdate="updateTime(station.id)" @loadedmetadata="updateDuration(station.id)"
                  :aria-label="'Audio stream for ' + station.name"></audio>

                <!-- Playback Controls -->
                <div class="playback-controls d-flex align-items-center mb-3 gap-3">
                  <button class="btn btn-icon play-button" @click="togglePlay(station.id)"
                    :aria-label="isPlaying(station.id) ? 'Pause playback' : 'Play playback'">
                    <i :class="isPlaying(station.id) ? 'bi bi-pause-fill' : 'bi bi-play-fill'" class="play-icon"></i>
                  </button>
                  <span class="time-display" aria-live="polite">
                    {{ formatTime(currentTimes[station.id] || 0) }}
                  </span>
                  <input type="range" min="0" :max="durations[station.id] || 100" :value="currentTimes[station.id] || 0"
                    @input="seek($event, station.id)" class="seek-bar flex-grow-1" :disabled="isLive(station.id)"
                    :aria-label="'Seek bar for ' + station.name" />
                  <span class="time-display" aria-live="polite">
                    {{ isLive(station.id) ? 'LIVE' : formatTime(durations[station.id] || 0) }}
                  </span>
                </div>

                <!-- Volume Controls -->
                <div class="volume-controls d-flex align-items-center gap-2">
                  <button class="btn btn-icon volume-button" @click="toggleMute(station.id)"
                    :aria-label="volume === 0 ? 'Unmute audio' : 'Mute audio'">
                    <i :class="volume === 0 ? 'bi bi-volume-mute' : (volume < 50 ? 'bi bi-volume-down' : 'bi bi-volume-up')"
                      class="volume-icon"></i>
                  </button>
                  <input type="range" min="0" max="100" v-model="volume" @input="setVolume($event, station.id)"
                    class="volume-bar" :aria-label="'Volume control for ' + station.name" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" class="d-flex justify-content-center align-items-center gap-4 mt-6">
      <button class="btn btn-outline-primary px-5" @click="previousPage" :disabled="currentPage === 1"
        aria-label="Previous page">
        <i class="bi bi-chevron-left"></i> Previous
      </button>
      <span class=" fw-medium fs-5">Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-outline-primary px-5" @click="nextPage" :disabled="currentPage === totalPages"
        aria-label="Next page">
        Next <i class="bi bi-chevron-right"></i>
      </button>
    </nav>
  </div>
</template>

<script>
import { debounce } from 'lodash';

export default {
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 6,
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
      showVolume: {},
      isLoading: false,
      error: null,
      popularReciters: [
        { id: 1, name: 'Mishary Rashid Alafasy', url: 'https://example.com/alafasy.mp3' },
        { id: 2, name: 'Abdul Rahman Al-Sudais', url: 'https://example.com/sudais.mp3' },
        { id: 3, name: 'Saad Al-Ghamdi', url: 'https://example.com/ghamdi.mp3' },
        { id: 4, name: 'Maher Al-Muaiqly', url: 'https://example.com/muaiqly.mp3' },
        { id: 5, name: 'Yasser Al-Dosari', url: 'https://example.com/dosari.mp3' },
        { id: 6, name: 'Abdul Basit Abdul Samad', url: 'https://example.com/basit.mp3' },
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
  },
  methods: {
    debouncedSearch: debounce(function () {
      this.handleSearch();
    }, 300),
    async fetchStations() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch('https://mp3quran.net/api/v3/radios?language=eng');
        if (!response.ok) throw new Error('Failed to fetch stations');
        const data = await response.json();
        this.stations = data.radios.map((radio) => ({
          id: radio.id,
          name: radio.name,
          url: radio.url,
        }));
        this.filteredStations = this.stations;
        this.loadLikedStations();
        this.loadRecentlyPlayed();
        this.loadVolume();
      } catch (error) {
        this.error = 'Unable to load radio stations. Please try again later.';
        console.error('Failed to fetch stations:', error);
      } finally {
        this.isLoading = false;
      }
    },
    handleSearch() {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredStations = this.stations.filter((station) =>
        station.name.toLowerCase().includes(query)
      );
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
          audio.play().catch((error) => {
            this.error = 'Playback failed. Please try again.';
            console.error('Playback failed:', error);
          });
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
      // Update CSS variable for volume bar
      const volumeBar = event.target;
      volumeBar.style.setProperty('--volume-level', `${this.volume}%`);
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
      return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    },
    playStation(url) {
      const station = this.stations.find((s) => s.url === url);
      if (station) {
        const audio = this.getAudioForStation(station.id);
        if (audio) {
          audio.play().catch((error) => {
            this.error = 'Playback failed. Please try again.';
            console.error('Playback failed:', error);
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
.radio-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.2s ease;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.radio-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(0, 191, 166, 0.15);
}

.radio-card.active-card {
  border: 2px solid #00bfa6;
  background: linear-gradient(180deg, #f5fffe 0%, #ffffff 100%);
}

.card-title {
  font-size: 1.25rem;
  color: #1a3c34;
  max-width: 80%;
}

.like-button {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s ease, color 0.2s ease;
}

.like-button:hover {
  background: rgba(0, 191, 166, 0.1);
}

.like-icon {
  font-size: 1.25rem;
  color: #6c757d;
  transition: color 0.2s ease;
}

.like-icon.bi-heart-fill {
  color: #00bfa6;
}

.audio-player {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
  transition: background 0.2s ease;
}

.audio-player.playing {
  background: rgba(0, 191, 166, 0.05);
}

.audio-player audio {
  display: none;
}

.playback-controls {
  gap: 1rem;
}

.play-button {
  background: #00bfa6;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease;
}

.play-button:hover {
  background: #009d8a;
  transform: scale(1.05);
}

.play-icon {
  font-size: 1.75rem;
  color: #ffffff;
}

.time-display {
  font-size: 0.875rem;
  color: #6c757d;
  font-family: 'Inter', monospace;
  min-width: 50px;
  text-align: center;
}

.seek-bar {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #e9ecef;
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease;
}

.seek-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: #00bfa6;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.seek-bar::-moz-range-thumb {
  width: 14px;
  height: 14px;
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
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e9ecef;
}

.volume-button {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s ease;
}

.volume-button:hover {
  background: rgba(0, 191, 166, 0.1);
}

.volume-icon {
  font-size: 1.25rem;
  color: #6c757d;
}

.volume-icon.bi-volume-up,
.volume-icon.bi-volume-down {
  color: #00bfa6;
}

.volume-bar {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #e9ecef;
  cursor: pointer;
  width: 100%;
}

.volume-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #00bfa6;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.volume-bar::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #00bfa6;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.volume-bar {
  background: linear-gradient(to right, #00bfa6 calc(var(--volume-level, 0%)), #e9ecef calc(var(--volume-level, 0%)));
}

@media (max-width: 576px) {
  .radio-card {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.125rem;
  }

  .play-button {
    width: 40px;
    height: 40px;
  }

  .play-icon {
    font-size: 1.5rem;
  }

  .time-display {
    font-size: 0.75rem;
    min-width: 40px;
  }

  .volume-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .volume-button {
    margin-bottom: 0.5rem;
  }
}
</style>