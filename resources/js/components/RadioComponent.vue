<template>
  <div>
    <div class="container py-5">
      <h1 class="main-title fw-bold">Islamic Reciters Stations</h1>

      <p class="text-center lead" style="font-size: 1.25rem;">
        Discover live Quranic reciters stations from renowned reciters worldwide.
      </p>

      <!-- Search Bar and Category Dropdown -->
      <section class="mb-5" role="search" aria-label="Search and filter stations">
        <div class="fixed-footer p-4 mb-5 border-md" style="border-radius: 8px;">
          <h2 class="visually-hidden">Search and Filter</h2>
          <div class="row g-4 align-items-end">
            <!-- Search by Name -->
            <div class="col-md-6">
              <label for="reciterSearch" style="font-size: 1.5em;"
                class="form-label fw-bold display-4 text-dark mb-2">Search by Name</label>
              <div class="input-group align-items-center">
                <input v-model="searchQuery" @input="handleSearch" id="reciterSearch" type="text"
                  class="form-control border-0 rounded-3 shadow-sm px-4 py-2 fs-6" placeholder="e.g., Abdul Basit"
                  aria-label="Search reciters by name" style="background-color: #f8f9fa;" />
              </div>
            </div>
            <!-- Category Filter -->
            <div class="col-md-3">
              <label for="reciterCategory" style="font-size: 1.5em;"
                class="form-label fw-bold display-4 text-dark mb-2">Category</label>
              <select v-model="selectedCategory" @change="handleSearch" id="reciterCategory"
                class="form-select border-0 rounded-3 shadow-sm px-4 py-2 fs-6" aria-label="Select a Category"
                style="background-color: #f8f9fa;">
                <option value="All Categories">All Categories</option>
                <option v-for="category in availableCategories" :key="category" :value="category">{{ category }}
                </option>
              </select>
            </div>
            <!-- Sort By Filter -->
            <div class="col-md-3">
              <label for="sortBy" style="font-size: 1.5em;" class="form-label fw-bold display-4 text-dark mb-2">Sort
                By</label>
              <select v-model="sortBy" id="sortBy" class="form-select border-0 rounded-3 shadow-sm px-4 py-2 fs-6"
                aria-label="Sort stations">
                <option value="default">Default</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="listeners_desc">Most Listeners</option>
              </select>
            </div>
          </div>
        </div>
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
                :class="{ 'active-card': currentAudio?.src === station.url }" :id="'station-' + station.id"
                role="article" :aria-labelledby="'station-title-' + station.id">
                <div class="d-flex justify-content-between align-items-center p-4">
                  <div class="station-info">
                    <h5 class="card-title mb-1 fw-bold" :id="'station-title-' + station.id"
                      v-html="highlightSearch(station.name)"></h5>
                    <p class="card-text text-muted mb-0">{{ station.category || 'Recitation' }}</p>
                    <!-- Debug: Show online status -->
                    <p class="card-text text-muted mb-0 fs-sm">Status: {{ station.online === false ? 'Offline' : 'Online' }}</p>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <button v-if="station.online !== false" @click="togglePlay(station.id)" class="control-btn play-pause p-0"
                      :aria-label="isPlaying(station.id) ? 'Pause ' + station.name : 'Play ' + station.name"
                      :disabled="!station.url"
                      :title="station.online === false ? 'Station is offline' : ''">
                      <i class="bi fs-1" :class="{
                        'bi-pause-circle-fill text-theme-teal': currentPlayingStationId === station.id && isPlaying(station.id),
                        'bi-play-circle-fill': currentPlayingStationId !== station.id || !isPlaying(station.id)
                      }"></i>
                    </button>
                    <button class="btn btn-icon like-button p-2" @click="toggleLike(station)"
                      :aria-label="isLiked(station.id) ? 'Unlike ' + station.name : 'Like ' + station.name">
                      <i :class="{
                        'bi-heart-fill text-danger': isLiked(station.id),
                        'bi-heart': !isLiked(station.id)
                      }" class="like-icon fs-5"></i>
                    </button>
                    <div class="audio-player d-none">
                      <audio :ref="(el) => audioRefs[station.id] = el" :src="station.url"
                        @play="handlePlay(station.id, $event)" @pause="handlePause(station.id)"
                        @timeupdate="updateTime(station.id)" @loadedmetadata="updateDuration(station.id)"
                        :aria-label="'Audio stream for ' + station.name"></audio>
                    </div>
                  </div>
                </div>
                <div v-if="playbackErrors[station.id] && currentPlayingStationId === station.id"
                  class="text-danger fs-6 p-3 d-flex align-items-center gap-2" role="alert">
                  {{ playbackErrors[station.id] }}
                  <button class="btn btn-sm btn-outline-danger" @click="retryPlayback(station.id)"
                    aria-label="Retry playback">Retry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </section>

      <!-- All Reciters Stations -->
      <section class="mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold fs-3 text-dark"><img src="images/art.png" width="30" height="30" loading="lazy" decoding="async" alt="decorative" class="mb-1" /> Reciters Stations:</h3>
          <div class="d-flex align-items-center gap-2">
            <button @click="viewMode = 'grid'" class="btn btn-outline-dark" :class="{ active: viewMode === 'grid' }"
              aria-label="Grid View">
              <i class="bi bi-grid-fill"></i>
            </button>
            <button @click="viewMode = 'list'" class="btn btn-outline-dark" :class="{ active: viewMode === 'list' }"
              aria-label="List View">
              <i class="bi bi-list-ul"></i>
            </button>
          </div>
        </div>
        <div v-if="isLoading" class="text-center my-4" aria-live="polite">
          <div class="spinner-border text-primary" role="status" aria-label="Loading">
            <span class="visually-hidden">Loading stations...</span>
          </div>
        </div>
        <div v-else-if="fetchError" class="alert alert-danger" role="alert">
          {{ fetchError }}
          <button class="btn btn-sm btn-outline-danger ms-2" @click="fetchStations"
            aria-label="Retry loading stations">Retry</button>
        </div>
        <div v-else>
          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" class="row" role="list" aria-label="Stations">
            <div v-for="station in visibleStations" :key="station.id" class="col-md-4 mb-4">
              <div class="station-list-item h-100" style="border:2px solid lightgrey; border-radius:8px;"
                :class="{ 'active-card': currentPlayingStationId === station.id }" :id="'station-' + station.id"
                role="listitem" :tabindex="focusedStationId === station.id ? 0 : -1" :aria-labelledby="'station-title-' + station.id"
                :data-station-id="station.id" @keydown="onStationKeydown(station.id, $event)" @focus="focusedStationId = station.id">
                <div class="card-body">
                  <div class="d-flex align-items-center gap-3">
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 class="card-title mb-1 fw-semibold" :id="'station-title-' + station.id"
                            v-html="highlightSearch(station.name)"></h5>
                          <p class="text-muted mb-1 fs-sm">
                            {{ station.category || 'Recitation' }}
                            <span v-if="station.country" class="ms-1">· {{ station.country }}</span>
                          </p>
                          <!-- Debug: Show online status -->
                          <p class="text-muted mb-1 fs-sm">Status: {{ station.online === false ? 'Offline' : 'Online' }}</p>
                        </div>
                        <button class="btn btn-icon like-button p-2" @click="toggleLike(station)"
                          :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'" :aria-pressed="isLiked(station.id)">
                          <i :class="isLiked(station.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"
                            class="like-icon fs-5"></i>
                        </button>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center gap-2 text-muted fs-sm">
                          <span :title="`${station.listeners} listeners`">
                            <i class="bi bi-headphones"></i> {{ station.listeners }}
                          </span>
                          <span v-if="currentPlayingStationId === station.id && isPlaying(station.id)"
                            class="text-theme-teal fw-semibold">
                            Currently listening
                          </span>
                          <span class="badge" :class="getStationStatus(station.id).class">
                            {{ getStationStatus(station.id).text }}
                          </span>
                        </div>
                        <button v-if="station.online !== false" @click="togglePlay(station.id)" class="control-btn play-pause p-0"
                          :aria-label="isPlaying(station.id) ? 'Pause playback' : 'Play playback'" :aria-pressed="isPlaying(station.id)"
                          :disabled="!station.url"
                          :title="station.online === false ? 'Station is offline' : ''">
                          <i class="bi fs-1" :class="{
                            'bi-pause-circle-fill text-theme-teal': currentPlayingStationId === station.id && isPlaying(station.id),
                            'bi-play-circle-fill': currentPlayingStationId !== station.id || !isPlaying(station.id)
                          }"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="audio-player d-none">
                    <audio v-if="audioMountForId === station.id"
                      :ref="(el) => audioRefs[station.id] = el" :src="station.url"
                      @play="handlePlay(station.id, $event)" @pause="handlePause(station.id)"
                      @timeupdate="updateTime(station.id)" @loadedmetadata="updateDuration(station.id)"
                      @error="handleAudioError(station.id, $event)"
                      :aria-label="'Audio stream for ' + station.name"></audio>
                  </div>
                  <div v-if="playbackErrors[station.id] && currentPlayingStationId === station.id"
                    class="text-danger fs-6 mt-2 d-flex align-items-center gap-2" role="alert">
                    {{ playbackErrors[station.id] }}
                    <button class="btn btn-sm btn-outline-danger" @click="retryPlayback(station.id)"
                      aria-label="Retry playback">Retry</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- List View -->
          <div v-else class="list-container view-list" role="list" aria-label="Stations">
            <div v-for="station in visibleStations" :key="station.id" class="station-list-item"
              style="border:2px solid lightgrey; border-radius:8px;"
              :class="{ 'active-card': currentPlayingStationId === station.id }" :id="'station-' + station.id"
              role="listitem" :tabindex="focusedStationId === station.id ? 0 : -1" :aria-labelledby="'station-title-' + station.id"
              :data-station-id="station.id" @keydown="onStationKeydown(station.id, $event)" @focus="focusedStationId = station.id">
              <div class="card-body">
                <div class="d-flex align-items-center gap-3">
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 class="card-title mb-1 fw-semibold" :id="'station-title-' + station.id"
                          v-html="highlightSearch(station.name)"></h5>
                        <p class="text-muted mb-1 fs-sm">
                          {{ station.category || 'Recitation' }}
                          <span v-if="station.country" class="ms-1">· {{ station.country }}</span>
                        </p>
                        <!-- Debug: Show online status -->
                        <p class="text-muted mb-1 fs-sm">Status: {{ station.online === false ? 'Offline' : 'Online' }}</p>
                      </div>
                      <button class="btn btn-icon like-button p-2" @click="toggleLike(station)"
                        :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'" :aria-pressed="isLiked(station.id)">
                        <i :class="isLiked(station.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"
                          class="like-icon fs-5"></i>
                      </button>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                      <div class="d-flex align-items-center gap-2 text-muted fs-sm">
                        <span v-if="isPlaying(station.id)" :title="`${station.listeners} listeners`">
                          <i class="bi bi-headphones"></i> {{ station.listeners }}
                        </span>
                        <span v-if="currentPlayingStationId === station.id && isPlaying(station.id)"
                          class="text-theme-teal fw-semibold">
                          Currently listening
                        </span>
                        <span class="badge" :class="getStationStatus(station.id).class">
                          {{ getStationStatus(station.id).text }}
                        </span>
                      </div>
                      <button v-if="station.online !== false" @click="togglePlay(station.id)" class="control-btn play-pause p-0"
                        :aria-label="isPlaying(station.id) ? 'Pause playback' : 'Play playback'" :aria-pressed="isPlaying(station.id)"
                        :disabled="!station.url"
                        :title="station.online === false ? 'Station is offline' : ''">
                        <i class="bi fs-1" :class="{
                          'bi-pause-circle-fill text-theme-teal': currentPlayingStationId === station.id && isPlaying(station.id),
                          'bi-play-circle-fill': currentPlayingStationId !== station.id || !isPlaying(station.id)
                        }"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="audio-player d-none">
                  <audio v-if="audioMountForId === station.id"
                    :ref="(el) => audioRefs[station.id] = el" :src="station.url"
                    @play="handlePlay(station.id, $event)" @pause="handlePause(station.id)"
                    @timeupdate="updateTime(station.id)" @loadedmetadata="updateDuration(station.id)"
                    @error="handleAudioError(station.id, $event)"
                    :aria-label="'Audio stream for ' + station.name"></audio>
                </div>
                <div v-if="playbackErrors[station.id] && currentPlayingStationId === station.id"
                  class="text-danger fs-6 mt-2 d-flex align-items-center gap-2" role="alert">
                  {{ playbackErrors[station.id] }}
                  <button class="btn btn-sm btn-outline-danger" @click="retryPlayback(station.id)"
                    aria-label="Retry playback">Retry</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Infinite Scroll Sentinel -->
          <div v-if="!allLoaded" ref="infiniteScrollSentinel" class="infinite-sentinel d-flex justify-content-center my-3" aria-hidden="true">
            <div v-if="isLoadingMore" class="spinner-border text-theme-teal" role="status" style="width: 2rem; height: 2rem;">
              <span class="visually-hidden">Loading more...</span>
            </div>
          </div>
        </div>
  </section>

    </div>

    <!-- Global Audio Player -->
    <transition name="global-audio-player">
      <div v-if="currentlyPlayingStation" class="global-audio-player shadow-lg" role="region" aria-label="Global audio player" aria-live="polite">
        <div class="d-flex align-items-center" style="flex: 1 1 0px; justify-content: flex-start;">
          <div>
            <h6 class="mb-0 fw-bold text-white" style="font-size: 1.1rem; font-weight: 600; letter-spacing: 0.4px;">{{
              currentlyPlayingStation.name }}</h6>
            <small class="text-white-50" style="letter-spacing: 0.4px;">{{ currentlyPlayingStation.category ||
              'Recitation' }}</small>
          </div>
        </div>
        <div class="d-flex align-items-center" style="flex: 2 1 0px; justify-content: center;">
          <button @click="previousStation" class="control-btn mx-2" title="Previous Station">
            <i class="bi bi-rewind-fill text-white"></i>
          </button>
          <button @click="togglePlay(currentPlayingStationId)" class="control-btn play-pause fs-2 mx-2"
            :aria-label="isPlaying(currentPlayingStationId) ? 'Pause playback' : 'Play playback'"
            :aria-pressed="isPlaying(currentPlayingStationId)">
            <i class="bi text-white" :class="isPlaying(currentPlayingStationId) ? 'bi-pause-fill' : 'bi-play-fill'"></i>
          </button>
          <button @click="nextStation" class="control-btn mx-2" title="Next Station">
            <i class="bi bi-fast-forward-fill text-white"></i>
          </button>
          <button @click="stopPlayback" class="control-btn mx-2" title="Stop">
            <i class="bi bi-stop-fill text-white"></i>
          </button>
          <div class="progress-bar-container flex-grow-1 mx-4">
            <input type="range" min="0" :max="durations[currentPlayingStationId] || 100"
              :value="currentTimes[currentPlayingStationId] || 0" @input="seek($event, currentPlayingStationId)"
              class="progress-bar" :disabled="isLive(currentPlayingStationId)"
              :aria-label="'Seek bar for ' + currentlyPlayingStation.name" />
          </div>
        </div>
        <div class="d-flex align-items-center" style="flex: 1 1 0px; justify-content: flex-end;">
          <button @click="toggleMute(currentPlayingStationId)" class="control-btn"
            :aria-label="volumes[currentPlayingStationId] === 0 ? 'Unmute audio' : 'Mute audio'"
            :aria-pressed="volumes[currentPlayingStationId] === 0">
            <i class="bi fs-4 text-white"
              :class="`bi-volume-${volumes[currentPlayingStationId] > 50 ? 'up' : volumes[currentPlayingStationId] > 0 ? 'down' : 'mute'}-fill`"></i>
          </button>
          <input type="range" min="0" max="100" v-model.number="volumes[currentPlayingStationId]"
            @input="setVolume($event, currentPlayingStationId)" class="volume-slider mx-3"
            :aria-label="'Volume control for ' + currentlyPlayingStation.name" />
          <button @click="closePlayer" class="control-btn ms-4" title="Close player">
            <i class="bi bi-x-lg fs-5 text-white"></i>
          </button>
        </div>
      </div>
    </transition>
    <!-- Live region for announcing play/pause changes -->
    <div class="visually-hidden" role="status" aria-live="polite">{{ liveAnnouncement }}</div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, reactive, nextTick, onBeforeUnmount, watch, markRaw } from 'vue';

const defaultPopularReciters = markRaw([
  {
    id: 1,
    name: 'Mishary Rashid Alafasy',
    url: 'https://qurango.net/radio/mishary_alafasy',
    fallbackUrl: 'https://backup.qurango.net/mishary_alafasy.mp3',
    style: 'Murattal',
    country: 'Kuwait',
    imageUrl: 'images/mra.jpeg',
    imageLoaded: true
  },
  {
    id: 2,
    name: 'Yasser Al-Dosari',
    url: 'https://qurango.net/radio/yasser_aldosari',
    fallbackUrl: 'https://backup.qurango.net/yasser_aldosari.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/yad.webp',
    imageLoaded: true
  },
  {
    id: 6,
    name: 'Abdul Basit Abdul Samad',
    url: 'https://qurango.net/radio/abdulbasit_abdulsamad_mujawwad',
    fallbackUrl: 'https://backup.qurango.net/abdulbasit_abdulsamad.mp3',
    style: 'Mujawwad',
    country: 'Egypt',
    imageUrl: 'images/abas.jpeg',
    imageLoaded: true
  },
  {
    id: 3,
    name: 'Saad Al-Ghamdi',
    url: 'https://qurango.net/radio/saad_alghamdi',
    fallbackUrl: 'https://backup.qurango.net/saad_alghamdi.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/sag.webp',
    imageLoaded: true
  },
  {
    id: 4,
    name: 'Maher Al-Muaiqly',
    url: 'https://qurango.net/radio/maher_almuaiqly',
    fallbackUrl: 'https://backup.qurango.net/maher_almuaiqly.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/mam.webp',
    imageLoaded: true
  },
  {
    id: 5,
    name: 'Abdul Rahman Al-Sudais',
    url: 'https://qurango.net/radio/abdurrahman_alsudais',
    fallbackUrl: 'https://backup.qurango.net/abdurrahman_alsudais.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/asds.jpeg',
    imageLoaded: true
  },
  {
    id: 7,
    name: 'Saud Al-Shuraim',
    url: 'https://qurango.net/radio/saud_alshuraim',
    fallbackUrl: 'https://backup.qurango.net/saud_alshuraim.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/sas.jpeg',
    imageLoaded: true
  },
  {
    id: 8,
    name: 'Ahmad Al-Ajmi',
    url: 'https://qurango.net/radio/ahmad_alajmi',
    fallbackUrl: 'https://backup.qurango.net/ahmad_alajmi.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/aaa.webp',
    imageLoaded: true
  },
  {
    id: 9,
    name: 'Mahmoud Khalil Al-Hussary',
    url: 'https://qurango.net/radio/mahmoud_khalil_alhussary',
    fallbackUrl: 'https://backup.qurango.net/mahmoud_khalil_alhussary.mp3',
    style: 'Murattal',
    country: 'Egypt',
    imageUrl: 'images/mkh.webp',
    imageLoaded: true
  },
  {
    id: 10,
    name: 'Nasser Al Qatami',
    url: 'https://qurango.net/radio/nasser_alqatami',
    fallbackUrl: 'https://backup.qurango.net/nasser_alqatami.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/naq.webp',
    imageLoaded: true
  },
  {
    id: 11,
    name: 'Ali Jaber',
    url: 'https://qurango.net/radio/ali_jaber',
    fallbackUrl: 'https://backup.qurango.net/ali_jaber.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/aj.webp',
    imageLoaded: true
  },
  {
    id: 12,
    name: 'Muhammad Al-Luhaidan',
    url: 'https://qurango.net/radio/muhammad_alluhaidan',
    fallbackUrl: 'https://backup.qurango.net/muhammad_alluhaidan.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: 'images/mal.webp',
    imageLoaded: true
  }
]);

// State
const showSuggestions = ref(false);
const filteredSuggestions = ref([]);
const highlightIndex = ref(-1);
const searchQuery = ref('');
const selectedCategory = ref('All Categories');
// Infinite scroll state
const itemsPerPage = ref(8);
const itemsToShow = ref(itemsPerPage.value);
const isLoadingMore = ref(false);
const infiniteScrollSentinel = ref(null);
const audioMountForId = ref(null); // only mount audio element for active station
let observer = null;
const stations = ref([]);
const filteredStations = ref([]);
const currentAudio = ref(null);
const volumes = ref({}); // Per-station volume
const likedStations = ref([]);
const recentlyPlayed = ref([]);
const showLiked = ref(false);
const showRecentlyPlayed = ref(false);
const currentTimes = ref({});
const durations = ref({});
const playingStates = ref({});
const playbackErrors = ref({});
const isLoading = ref(false);
const fetchError = ref(null);
const currentPlayingStationId = ref(null);
const audioRefs = reactive({});
const viewMode = ref('grid'); // 'grid' or 'list'
const sortBy = ref('default'); // 'default', 'name_asc', 'name_desc', 'listeners_desc'
let listenerInterval = null;
const audioPlayerJustOpened = ref(false);
const focusedStationId = ref(null);
const liveAnnouncement = ref('');

// Cached search helpers
const lowerSearchQuery = computed(() => searchQuery.value.trim().toLowerCase());
const searchRegex = computed(() => {
  const raw = searchQuery.value || '';
  if (!raw) return null;
  // Keep previous behavior: use raw query in regex (case-insensitive)
  try {
    return new RegExp(`(${raw})`, 'gi');
  } catch {
    return null;
  }
});

// Keyboard navigation helpers
const onStationKeydown = (id, event) => {
  const key = event.key;
  // Activate
  if (key === 'Enter' || key === ' ') {
    event.preventDefault();
    togglePlay(id);
    return;
  }
  // Like/Unlike
  if (key.toLowerCase() === 'l') {
    event.preventDefault();
    const station = stations.value.find(s => s.id === id) || visibleStations.value.find(s => s.id === id);
    if (station) toggleLike(station);
    return;
  }
  // Mute/Unmute current if same station
  if (key.toLowerCase() === 'm' && currentPlayingStationId.value) {
    event.preventDefault();
    toggleMute(currentPlayingStationId.value);
    return;
  }
  // Focus movement
  if (['ArrowDown', 'ArrowRight'].includes(key)) {
    event.preventDefault();
    focusStationByOffset(id, +1);
  } else if (['ArrowUp', 'ArrowLeft'].includes(key)) {
    event.preventDefault();
    focusStationByOffset(id, -1);
  } else if (key === 'Home') {
    event.preventDefault();
    focusStationByIndex(0);
  } else if (key === 'End') {
    event.preventDefault();
    const nodes = getStationNodes();
    if (nodes.length) nodes[nodes.length - 1].focus();
  }
};

const getStationNodes = () => {
  return Array.from(document.querySelectorAll('[data-station-id]'));
};

const focusStationByOffset = (currentId, delta) => {
  const nodes = getStationNodes();
  const idx = nodes.findIndex(n => String(n.getAttribute('data-station-id')) === String(currentId));
  if (idx === -1) return;
  let next = idx + delta;
  if (next < 0) next = 0;
  if (next >= nodes.length) next = nodes.length - 1;
  const nextNode = nodes[next];
  nextNode?.focus();
  const attrId = nextNode?.getAttribute('data-station-id');
  if (attrId) focusedStationId.value = Number(attrId);
};

const focusStationByIndex = (index) => {
  const nodes = getStationNodes();
  if (!nodes.length) return;
  const i = Math.max(0, Math.min(index, nodes.length - 1));
  const node = nodes[i];
  node.focus();
  const attrId = node.getAttribute('data-station-id');
  if (attrId) focusedStationId.value = Number(attrId);
};

// (moved below) Keep roving tabindex aligned with data

onMounted(() => {
  // Initialize focus after stations load
  nextTick(() => {
    if (visibleStations.value.length && !focusedStationId.value) {
      focusedStationId.value = visibleStations.value[0].id;
    }
  });
});

// Computed
const sortedStations = computed(() => {
  // Avoid extra array cloning when default sort
  if (sortBy.value === 'default') return filteredStations.value;
  const stationsToSort = [...filteredStations.value];
  switch (sortBy.value) {
    case 'name_asc':
      return stationsToSort.sort((a, b) => a.name.localeCompare(b.name));
    case 'name_desc':
      return stationsToSort.sort((a, b) => b.name.localeCompare(a.name));
    case 'listeners_desc':
      return stationsToSort.sort((a, b) => (b.listeners || 0) - (a.listeners || 0));
    default:
      return stationsToSort;
  }
});

const visibleStations = computed(() => sortedStations.value.slice(0, itemsToShow.value));
const allLoaded = computed(() => itemsToShow.value >= sortedStations.value.length);

// Keep roving tabindex aligned with data
watch(visibleStations, (list) => {
  const ids = list.map(s => s.id);
  if (!ids.length) return;
  if (!focusedStationId.value || !ids.includes(focusedStationId.value)) {
    focusedStationId.value = ids[0];
    nextTick(() => focusStationByIndex(0));
  }
});

const availableCategories = computed(() => [...new Set(stations.value.map(station => station.category || 'Recitation'))]);

const currentlyPlayingStation = computed(() => {
  if (!currentPlayingStationId.value) return null;
  return stations.value.find(s => s.id === currentPlayingStationId.value);
});

// Infinite scroll helpers
const loadMore = () => {
  if (isLoadingMore.value) return;
  if (itemsToShow.value >= sortedStations.value.length) {
    if (observer) observer.disconnect();
    return;
  }
  isLoadingMore.value = true;
  setTimeout(() => {
    itemsToShow.value = Math.min(itemsToShow.value + itemsPerPage.value, sortedStations.value.length);
    isLoadingMore.value = false;
    if (itemsToShow.value >= sortedStations.value.length && observer) observer.disconnect();
  }, 120);
};

const setupObserver = async () => {
  await nextTick();
  if (!infiniteScrollSentinel.value) return;
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry && entry.isIntersecting) {
      loadMore();
    }
  }, { root: null, rootMargin: '0px 0px 400px 0px', threshold: 0 });
  observer.observe(infiniteScrollSentinel.value);
};

watch(sortedStations, () => {
  itemsToShow.value = itemsPerPage.value;
  setupObserver();
  // if current playing is no longer in the list view, keep audio mounted but ensure ref remains
});

// Methods
const getAudioForStation = (id) => audioRefs[id];

const closePlayer = () => {
  if (currentPlayingStationId.value) {
    const audio = getAudioForStation(currentPlayingStationId.value);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    playingStates.value[currentPlayingStationId.value] = false;
    currentAudio.value = null;
    currentPlayingStationId.value = null;
    audioMountForId.value = null;
  }
};

const initializeAudio = async (id) => {
  if (audioMountForId.value !== id) {
    audioMountForId.value = id;
    await nextTick();
  }
  const audio = getAudioForStation(id);
  if (audio && !audio.src) {
    const station = defaultPopularReciters.find(s => s.id === id) || stations.value.find(s => s.id === id);
    if (station) {
      audio.src = station.url;
    }
  }
};

const pauseAllAudio = () => {
  if (currentAudio.value) {
    // Find id of current audio
    let currentId = null;
    for (const id in audioRefs) {
      if (audioRefs[id] === currentAudio.value) {
        currentId = id;
        break;
      }
    }

    if (currentId) {
      currentAudio.value.pause();
      currentAudio.value.currentTime = 0;
      playingStates.value[currentId] = false;
      playbackErrors.value[currentId] = null;
      currentPlayingStationId.value = null;
    }
    currentAudio.value = null;
  }
  // Ensure all playing states are reset
  Object.keys(playingStates.value).forEach(id => {
    if (playingStates.value[id]) {
      const audio = getAudioForStation(id);
      if (audio) audio.pause();
      playingStates.value[id] = false;
    }
  });
};

const isPlaying = (id) => !!playingStates.value[id];

const applyVolume = (id) => {
  const audio = getAudioForStation(id);
  if (audio && volumes.value[id] !== undefined) {
    audio.volume = volumes.value[id] / 100;
  }
};

const addToRecentlyPlayed = (id) => {
  const station = defaultPopularReciters.find(s => s.id === id) || stations.value.find(s => s.id === id);
  if (!station) return;
  recentlyPlayed.value = recentlyPlayed.value.filter(s => s.id !== id);
  recentlyPlayed.value.unshift({ ...station, lastPlayed: new Date().toISOString() });
  if (recentlyPlayed.value.length > 10) recentlyPlayed.value.pop();
  localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed.value));
};

const togglePlay = async (id) => {
  await initializeAudio(id);
  const audio = getAudioForStation(id);
  if (!audio) {
    console.error(`No audio element found for station ${id}`);
    playbackErrors.value[id] = 'This station is currently unavailable. Please try again later.';
    return;
  }

  if (isPlaying(id)) {
    audio.pause();
    playingStates.value[id] = false;
    // Unmount audio to free resources
    if (audioMountForId.value === id) audioMountForId.value = null;
    return;
  }

  // If we are playing another station, pause it.
  if (currentPlayingStationId.value && currentPlayingStationId.value !== id) {
    const oldAudio = getAudioForStation(currentPlayingStationId.value);
    if (oldAudio) {
      oldAudio.pause();
      playingStates.value[currentPlayingStationId.value] = false;
    }
    // switch mount to new station
    if (audioMountForId.value !== id) {
      audioMountForId.value = id;
      await nextTick();
    }
  }

  try {
    await audio.play();
    playingStates.value[id] = true;
    currentAudio.value = audio;
    currentPlayingStationId.value = id;
    playbackErrors.value[id] = null;
    addToRecentlyPlayed(id);
    applyVolume(id);
  } catch (error) {
    console.error(`Playback failed for station ${id}:`, error);
    playbackErrors.value[id] = 'This station is currently unavailable. Please try again later.';
    playingStates.value[id] = false;

    const station = defaultPopularReciters.find(s => s.id === id) || stations.value.find(s => s.id === id);
    if (station?.fallbackUrl) {
      console.log(`Trying fallback URL for station ${id}`);
      audio.src = station.fallbackUrl;
      try {
        await audio.play();
        playingStates.value[id] = true;
        currentAudio.value = audio;
        currentPlayingStationId.value = id;
        playbackErrors.value[id] = null;
        addToRecentlyPlayed(id);
        applyVolume(id);
      } catch (fallbackError) {
        console.error(`Fallback playback failed for station ${id}:`, fallbackError);
        playbackErrors.value[id] = 'This station is currently unavailable. Please try again later.';
      }
    }
  }
};

const fetchStations = async () => {
  isLoading.value = true;
  fetchError.value = null;
  try {
    const response = await fetch('https://mp3quran.net/api/v3/radios?language=eng');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    const apiStations = data.radios.map((radio) => ({
      id: radio.id + 1000,
      name: radio.name,
      url: radio.url,
      category: radio.category || assignCategory(radio.name),
      imageUrl: radio.image || 'https://via.placeholder.com/80',
      imageLoaded: true,
      listeners: Math.floor(Math.random() * (1500 - 50) + 50) // Simulated listeners
    }));
    const defaultStationsWithListeners = defaultPopularReciters.map(station => ({
      ...station,
      listeners: Math.floor(Math.random() * (2500 - 200) + 200) // Higher listener count for popular ones
    }));

    stations.value = [
      ...defaultStationsWithListeners,
      ...apiStations.filter(apiStation => !defaultStationsWithListeners.some(pr => pr.id === apiStation.id)),
    ].filter(station => isValidUrl(station.url));

    filteredStations.value = stations.value;
    initializeVolumes();
    loadLikedStations();
    loadRecentlyPlayed();
  } catch (error) {
    console.error('Failed to fetch stations:', error);
    fetchError.value = 'Failed to load stations. Using default reciters.';
    stations.value = [...defaultPopularReciters].filter(station => isValidUrl(station.url));
    filteredStations.value = stations.value;
    initializeVolumes();
  } finally {
    isLoading.value = false;
  }
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    console.warn(`Invalid URL: ${url}`);
    return false;
  }
};

const assignCategory = (name) => {
  name = name.toLowerCase();
  if (name.includes('translation') || name.includes('translate')) return 'Translation';
  if (name.includes('biography') || name.includes('seerah')) return 'Biography';
  if (name.includes('fatwa') || name.includes('ruling')) return 'Fatwa';
  return 'Recitation';
};

const selectSuggestion = (name) => {
  searchQuery.value = name;
  filteredSuggestions.value = [];
  showSuggestions.value = false;
  handleSearch();
};

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false;
    highlightIndex.value = -1;
  }, 200);
};

const handleKeydown = (event) => {
  if (!showSuggestions.value || !filteredSuggestions.value.length) return;
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    highlightIndex.value = (highlightIndex.value + 1) % filteredSuggestions.value.length;
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    highlightIndex.value = (highlightIndex.value - 1 + filteredSuggestions.value.length) % filteredSuggestions.value.length;
  } else if (event.key === 'Enter') {
    event.preventDefault();
    if (highlightIndex.value >= 0 && filteredSuggestions.value[highlightIndex.value]) {
      selectSuggestion(filteredSuggestions.value[highlightIndex.value].name);
    }
  } else if (event.key === 'Escape') {
    showSuggestions.value = false;
    highlightIndex.value = -1;
  }
};

// Debounced search to reduce re-computations while typing
let searchDebounce = null;
const handleSearch = () => {
  if (searchDebounce) clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    runSearch();
  }, 180);
};

// Keep filters in sync with same debounce
watch(selectedCategory, () => handleSearch());

const runSearch = () => {
  highlightIndex.value = -1;
  if (lowerSearchQuery.value.length >= 2) {
    const q = lowerSearchQuery.value;
    filteredSuggestions.value = stations.value
      .filter(station => station.name.toLowerCase().includes(q))
      .slice(0, 5);
    showSuggestions.value = true;
  } else {
    filteredSuggestions.value = [];
    showSuggestions.value = false;
  }

  // Reset visible window for new results
  itemsToShow.value = itemsPerPage.value;
  const query = lowerSearchQuery.value;
  filteredStations.value = stations.value.filter(station => {
    const matchesName = query ? station.name.toLowerCase().includes(query) : true;
    const matchesCategory = selectedCategory.value === 'All Categories' || station.category === selectedCategory.value;
    return matchesName && matchesCategory;
  });
};

const highlightSearch = (name) => {
  const rx = searchRegex.value;
  if (!rx) return name;
  return name.replace(rx, '<mark style="background:#0db691;color:white">$1</mark>');
};

const handlePlay = async (id, event) => {
  // Pause only the currently playing audio if different
  if (currentPlayingStationId.value && currentPlayingStationId.value !== id) {
    const prevAudio = audioRefs[currentPlayingStationId.value];
    if (prevAudio && prevAudio !== event.target) {
      prevAudio.pause();
      playingStates.value[currentPlayingStationId.value] = false;
    }
  }

  currentAudio.value = event.target;
  currentPlayingStationId.value = id;
  playingStates.value[id] = true;
  playbackErrors.value[id] = null;
  addToRecentlyPlayed(id);
  applyVolume(id);

  try {
    await currentAudio.value.play();
  } catch (error) {
    console.error(`Playback failed for station ${id}:`, error);
    playbackErrors.value[id] = 'This station is currently unavailable. Please try again later.';
    playingStates.value[id] = false;
    currentAudio.value = null;
    currentPlayingStationId.value = null;
  }
  const played = stations.value.find(s => s.id === id) || defaultPopularReciters.find(s => s.id === id);
  if (played) liveAnnouncement.value = `Playing ${played.name}`;
};

const handlePause = (id) => {
  playingStates.value[id] = false;
  if (currentPlayingStationId.value === id) {
    currentPlayingStationId.value = null;
    currentAudio.value = null;
    if (audioMountForId.value === id) audioMountForId.value = null;
  }
  const st = stations.value.find(s => s.id === id) || defaultPopularReciters.find(s => s.id === id);
  if (st) liveAnnouncement.value = `Paused ${st.name}`;
};

const handleAudioError = (stationId, event) => {
  const error = event.target.error;
  let errorMessage = "Failed to load audio.";
  if (error) {
    switch (error.code) {
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        errorMessage = "The audio format is not supported by your browser.";
        break;
      case MediaError.MEDIA_ERR_NETWORK:
        errorMessage = "A network error occurred. Please check your connection.";
        break;
      case MediaError.MEDIA_ERR_ABORTED:
        errorMessage = "Playback was aborted.";
        break;
      case MediaError.MEDIA_ERR_DECODE:
        errorMessage = "An error occurred while decoding the audio.";
        break;
      default:
        errorMessage = 'This station is currently unavailable. Please try again later.';
    }
  }
  playbackErrors.value[stationId] = errorMessage;
  console.error(`Audio error for station ${stationId}:`, error);
};

const getStationStatus = (id) => {
  if (playbackErrors.value[id]) {
    return { text: 'Offline', class: 'bg-danger' };
  }
  if (isPlaying(id)) {
    return { text: 'live', class: 'bg-theme-teal text-dark' };
  }
  return { text: 'live', class: 'bg-theme-teal text-dark' };
};

const isLive = (id) => isNaN(durations.value[id]) || durations.value[id] === Infinity;

const updateTime = (id) => {
  const audio = getAudioForStation(id);
  if (audio && isPlaying(id)) {
    currentTimes.value[id] = audio.currentTime;
  }
};

const updateDuration = (id) => {
  const audio = getAudioForStation(id);
  if (audio) {
    durations.value[id] = audio.duration || Infinity;
  }
};

const seek = (event, id) => {
  const audio = getAudioForStation(id);
  if (audio && !isLive(id)) {
    const value = parseFloat(event.target.value);
    audio.currentTime = value;
    currentTimes.value[id] = value;
  }
};

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds === Infinity) return 'Live';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const setVolume = (event, id) => {
  const volume = parseFloat(event.target.value);
  volumes.value[id] = volume;
  const audio = getAudioForStation(id);
  if (audio) {
    audio.volume = volume / 100;
  }
  localStorage.setItem(`volume-${id}`, volume);
  if (event.target instanceof HTMLElement) {
    event.target.style.setProperty('--volume-level', `${volume}%`);
  }
};

const toggleMute = (id) => {
  const newVolume = volumes.value[id] === 0 ? 50 : 0;
  volumes.value[id] = newVolume;
  applyVolume(id);
  localStorage.setItem(`volume-${id}`, newVolume);
};

const initializeVolumes = () => {
  stations.value.forEach(station => {
    const savedVolume = localStorage.getItem(`volume-${station.id}`);
    volumes.value[station.id] = savedVolume ? parseFloat(savedVolume) : 50;
  });
};

const toggleLike = (station) => {
  const index = likedStations.value.findIndex((s) => s.id === station.id);
  if (index === -1) {
    likedStations.value.push(station);
  } else {
    likedStations.value.splice(index, 1);
  }
  localStorage.setItem('likedStations', JSON.stringify(likedStations.value));
};

const isLiked = (id) => likedStations.value.some((s) => s.id === id);

const loadLikedStations = () => {
  const liked = JSON.parse(localStorage.getItem('likedStations') || '[]');
  likedStations.value = liked.filter((s) => stations.value.some((station) => station.id === s.id));
};

const loadRecentlyPlayed = () => {
  const recent = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
  recentlyPlayed.value = recent.filter((s) => stations.value.some((station) => station.id === s.id));
};

const retryPlayback = (id) => {
  playbackErrors.value[id] = null;
  togglePlay(id);
};

// Removed pagination handlers (replaced by infinite scroll)

const updateListenerCounts = () => {
  // Update only visible items to reduce DOM churn
  visibleStations.value.forEach(station => {
    const change = Math.floor(Math.random() * 10) - 5; // Fluctuate by -5 to +4
    station.listeners = Math.max(0, (station.listeners || 0) + change);
  });
};

const stopPlayback = () => {
  if (currentPlayingStationId.value) {
    const audio = getAudioForStation(currentPlayingStationId.value);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      playingStates.value[currentPlayingStationId.value] = false;
    }
  }
};

const previousStation = () => {
  if (!currentPlayingStationId.value) return;

  // Get the current filtered stations
  const currentStations = sortedStations.value;
  const currentIndex = currentStations.findIndex(station => station.id === currentPlayingStationId.value);

  if (currentIndex === -1) return;

  // Calculate previous index (wrap around to last if at beginning)
  const prevIndex = currentIndex === 0 ? currentStations.length - 1 : currentIndex - 1;
  const prevStation = currentStations[prevIndex];

  // Play the previous station
  if (prevStation) {
    togglePlay(prevStation.id);
  }
};

const nextStation = () => {
  if (!currentPlayingStationId.value) return;

  // Get the current filtered stations
  const currentStations = sortedStations.value;
  const currentIndex = currentStations.findIndex(station => station.id === currentPlayingStationId.value);

  if (currentIndex === -1) return;

  // Calculate next index (wrap around to first if at end)
  const nextIndex = (currentIndex + 1) % currentStations.length;
  const nextStation = currentStations[nextIndex];

  // Play the next station
  if (nextStation) {
    togglePlay(nextStation.id);
  }
};

onMounted(() => {
  fetchStations();
  // Initialize infinite scroll observer after initial fetch completes
  // A slight delay ensures the sentinel is in the DOM
  setTimeout(() => setupObserver(), 0);
  listenerInterval = setInterval(updateListenerCounts, 5000); // Update every 5 seconds
});

onBeforeUnmount(() => {
  clearInterval(listenerInterval);
  if (observer) observer.disconnect();
});

const handleAudioPlayerClick = (event) => {
  // Prevent closing if the audio player was just opened
  if (audioPlayerJustOpened.value) {
    audioPlayerJustOpened.value = false;
    return;
  }

  // Close audio player when clicking on the backdrop
  closeAudioPlayer();
};

const playAudio = (index) => {
  // ... existing code ...
  showAudioPlayer = true;

  // Set flag to prevent immediate dismissal
  audioPlayerJustOpened.value = true;

  // Clear the flag after a short delay
  setTimeout(() => {
    audioPlayerJustOpened.value = false;
  }, 300);
}
</script>
<style scoped>
button.control-btn.play-pause:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
button.control-btn.play-pause:disabled i.bi-play-circle-fill {
  color: #6c757d !important; /* Force gray color for disabled play buttons */
}

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

/* Focus visibility for keyboard navigation */
.station-list-item[tabindex="0"]:focus {
  outline: 3px solid #0db691;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(13, 182, 145, 0.15);
}

.card-title {
  font-size: clamp(1.125rem, 3.5vw, 1.25rem);
  color: #1a3c34;
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
  background: #0b5d4b;
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
  font-size: 0.95rem;
  color: #6c757d;
  font-family: 'Inter', monospace;
  min-width: 40px;
  text-align: center;
  font-weight: 500;
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
  background: #0b5d4b;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.seek-bar::-moz-range-thumb,
.volume-bar::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #0b5d4b;
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
  background: #0b5d4b;
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
  gap: 0.5rem;
}

.infinite-sentinel {
  min-height: 2rem;
}

.player-station-name {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.4px;
}

.player-station-category {
  letter-spacing: 0.4px;
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
  background-color: rgba(0, 191, 166, 0.161);
  /* Light blue background for active station */
  border: 2px solid #007bff;
  /* Blue border to highlight */
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  /* Subtle shadow for emphasis */
}



.radio-card.active-card .play-icon {
  color: #fff;
  /* Darker color for play icon when active */
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

  .pagination-nav .btn,
  .pagination-nav span {
    font-size: 0.875rem;
    /* Slightly smaller font size on mobile */
  }

  .container {
    padding: 1rem 0.5rem;
  }

  .radio-card {
    margin-bottom: 0.75rem;
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


}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
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

.custom-audio-player {
  padding: 10px;
  border-radius: 8px;
  background: #f8f9fa;
  margin-top: 10px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #00bfa6;
}

.control-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #00bfa6;
}

.play-pause {
  font-size: 2rem;
}

.progress-bar-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.progress-bar {
  accent-color: #00bfa6;
  width: 100%;
  height: 4px;
  /* background-color: rgba(255, 255, 255, 0.2); */
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #00bfa6;
  transition: width 0.1s linear;
}

.volume-slider {
  width: 120px;
  accent-color: #00bfa6;
}

.global-audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(33, 33, 33, 0.95);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px 15px 0 0;
  padding: 1.25rem 2.5rem;
  transition: transform 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.global-audio-player-enter-active,
.global-audio-player-leave-active {
  transition: transform 0.3s ease-in-out;
}

.global-audio-player-enter-from,
.global-audio-player-leave-to {
  transform: translateY(100%);
}

@media (max-width: 768px) {
  .global-audio-player {
    flex-direction: column;
    padding: 1rem;
    gap: 0.75rem;
  }

  .global-audio-player .mx-4 {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
}

.fs-sm {
  font-size: 0.875rem;
}

.btn-outline-teal.active {
  background-color: #0db691;
  color: white;
}

.list-container.view-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.list-container.view-list .station-list-item {
  margin-bottom: 1rem;
}

.station-list-item {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 2px solid lightgrey;
}

.station-list-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 191, 166, 0.12);
}

.station-list-item.active-card {
  border-color: #00bfa6;
  box-shadow: 0 0 15px rgba(13, 182, 145, 0.3);
  background-color: rgba(0, 191, 166, 0.05);
}

.station-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.view-grid .station-image {
  width: 80px;
  height: 80px;
}

.view-grid .card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4rem;
  padding: 1.5rem;
}

.view-grid .d-flex.align-items-center.gap-3 {
  flex-direction: column;
  width: 100%;
}

.view-grid .flex-grow-1 {
  width: 100%;
}

.view-grid .d-flex.justify-content-between.align-items-start {
  flex-direction: column;
  align-items: center !important;
  width: 100%;
}

.view-grid .like-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.view-grid .card-title {
  margin-top: 0.5rem;
}

.view-grid .d-flex.align-items-center.justify-content-between {
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.list-container.view-list .station-list-item {
  margin-bottom: 1rem;
}

.station-list-item .card-body {
  padding: 1.5rem;
}

.station-list-item .card-title {
  font-size: 1.3rem;
  font-weight: 700;
}

.station-list-item .fs-sm {
  font-size: 1rem;
}

.bg-theme-teal {
  background-color: #00bfa6;
}

/* Accessibility: ensure sufficient contrast for teal text on light backgrounds */
.text-theme-teal {
  color: #006b5f;
}

/* In station cards specifically, enforce darker teal for readability over light tiles */
.station-list-item .text-theme-teal {
  color: #006b5f;
}
</style>
