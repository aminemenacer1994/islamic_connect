<template>
  <div class="container py-5">
    <!-- Alert Section -->
    <section class="mb-3">
      <div v-if="alertMessage" class="alert alert-success position-fixed" role="alert"
        style="top: 70px; right: 15px; z-index: 1050; max-width: 400px; margin: 0;">
        {{ alertMessage }}
        <button type="button" class="btn-close" @click="alertMessage = ''" aria-label="Close"></button>
      </div>
    </section>

    <!-- Header -->
    <header class="text-center mb-5">
      <h1 class="fw-bold display-4 mb-3">Live Islamic TV Channels</h1>
      <p class="lead text-muted mx-auto">
        Watch live Islamic TV channels from around the world. Experience spiritual content including live prayers from
        Makkah and Madinah, educational programs, Quranic recitations, and Islamic lifestyle content in multiple
        languages.
      </p>
    </header>

    <!-- Filter/Search Section -->
    <section class="mb-5 p-3 bg-light rounded-3 shadow-sm" style="background: #f8f9fa; border: 1px solid #e0e0e0;"
      aria-label="Channel filters">
      <div class="row g-3 text-center text-md-start">
        <div class="col-12 col-md-3">
          <div class="input-group">
            <span class="input-group-text bg-white border-0"
              style="border-radius: 12px 0 0 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <i class="fas fa-search"></i>
            </span>
            <input v-model="searchQuery" type="text" class="form-control"
              style="border-radius: 0 12px 12px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: box-shadow 0.3s;"
              placeholder="Search channels..." @input="filterChannels"
              @mouseover="this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'"
              @mouseout="this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'">
          </div>
        </div>
        <div class="col-12 col-md-3">
          <select v-model="selectedCategory" class="form-select"
            style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: box-shadow 0.3s;"
            @change="filterChannels" @mouseover="this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'"
            @mouseout="this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'">
            <option value="all">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="col-12 col-md-3">
          <select v-model="selectedLanguage" class="form-select"
            style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: box-shadow 0.3s;"
            @change="filterChannels" @mouseover="this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'"
            @mouseout="this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'">
            <option value="all">All Languages</option>
            <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
          </select>
        </div>
        <div class="col-12 col-md-3">
          <select v-model="selectedTag" class="form-select"
            style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: box-shadow 0.3s;"
            @change="filterChannels" @mouseover="this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'"
            @mouseout="this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'">
            <option value="all">All Tags</option>
            <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
        <div class="col-12 col-md-3">
          <select v-model="sortBy" class="form-select"
            style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: box-shadow 0.3s;"
            @change="filterChannels" @mouseover="this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'"
            @mouseout="this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'">
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="viewers-desc">Viewers (High to Low)</option>
            <option value="viewers-asc">Viewers (Low to High)</option>
          </select>
        </div>
        <div class="col-12 col-md-3">
          <button class="btn btn-outline-secondary w-100"
            style="border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: box-shadow 0.3s;"
            @click="clearFilters" @mouseover="this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'"
            @mouseout="this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'">
            Clear All Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Favorites Section -->
    <section v-if="favorites.length > 0" class="mb-5" aria-label="Favorite channels">
      <h4 class="fw-bold mb-3 d-flex align-items-center" style="cursor: pointer;" @click="toggleFavoritesSection">
        Favorite Channels ({{ favorites.length }})
        <i :class="showFavorites ? 'fas fa-chevron-up ms-2' : 'fas fa-chevron-down ms-2'"></i>
      </h4>
      <div v-if="showFavorites" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <article class="col" v-for="(channel, index) in favorites" :key="channel.name">
          <div class="channel-card" :class="{ 'is-live': channel.isLive }"
            style="border-radius: 8px; overflow: hidden; transition: transform 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div class="channel-img-wrapper" style="position: relative; overflow: hidden;">
              <img :src="channel.thumbnail" :alt="`${channel.name} thumbnail`" class="channel-img"
                style="width: 100%; height: 100%; object-fit: contain;" @error="handleImageError">
              <div class="channel-gradient"
                style="position: absolute; bottom: 0; left: 0; right: 0; height: 35%;">
              </div>
              <span v-if="channel.isLive" class="badge bg-danger"
                style="position: absolute; top: 8px; right: 8px; z-index: 10;">Live Now</span>
              <button @click="toggleFavorite(channel)"
                :aria-label="isFavorite(channel) ? 'Remove from favorites' : 'Add to favorites'"
                style="position: absolute; top: 8px; left: 8px; z-index: 10; background: none; border: none; cursor: pointer; color: #6c757d; transition: color 0.3s;">
                <i :class="isFavorite(channel) ? 'fas fa-star' : 'far fa-star'"
                  style="font-size: 1.2rem; color: #ffc107;"></i>
              </button>
            </div>
            <div class="channel-body" style="padding: 12px;">
              <h5 class="fw-bold mb-2">{{ channel.name }}</h5>
              <p class="small mb-2">{{ truncateDescription(channel.description, 60) }}</p>
              <div class="mb-2 d-flex justify-content-between small text-muted">
                <span><i class="fas fa-globe me-1"></i>{{ channel.streamType === 'youtube_embed' ? 'YouTube Live' : 'Online Channel' }}</span>
                <span><i class="fas fa-users me-1"></i>{{ channel.viewers || 'N/A' }} viewers</span>
                <span><i class="fas fa-clock me-1"></i>{{ channel.schedule ? channel.schedule : 'No schedule' }}</span>
              </div>
              <div class="mb-2 small text-muted">
                <span><i class="fas fa-map-marker-alt me-1"></i>{{ channel.location || 'Not specified' }}</span>
              </div>
              <div class="mb-2">
                <span class="badge bg-primary me-1">{{ channel.category }}</span>
                <span v-for="lang in channel.languages" :key="lang" class="badge bg-secondary me-1">{{ lang }}</span>
                <span v-for="tag in channel.tags" :key="tag" class="badge bg-info text-dark me-1">{{ tag }}</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(5, minmax(50px, 1fr)); gap: 4px; justify-content: center; justify-items: center;">
                <a v-if="channel.youtubeChannel" :href="channel.youtubeChannel" target="_blank"
                  style="display: flex; flex-direction: column; align-items: center; padding: 6px; border-radius: 5px; transition: background-color 0.3s, transform 0.2s; min-width: 50px; text-decoration: none; color: #6c757d;"
                  title="YouTube Channel" aria-label="Visit YouTube Channel">
                  <i style="font-size: 1rem; margin-bottom: 3px; color: #6c757d;" class="fab fa-youtube"></i>
                  <small style="font-size: 0.7rem;">Channel</small>
                </a>
                <a v-if="channel.playlistUrl" :href="channel.playlistUrl" target="_blank"
                  style="display: flex; flex-direction: column; align-items: center; padding: 6px; border-radius: 5px; transition: background-color 0.3s, transform 0.2s; min-width: 50px; text-decoration: none; color: #6c757d;"
                  title="Playlists" aria-label="View Playlists">
                  <i style="font-size: 1rem; margin-bottom: 3px; color: #6c757d;" class="fas fa-list-ul"></i>
                  <small style="font-size: 0.7rem;">Playlists</small>
                </a>
                <a v-if="channel.liveTvUrl && channel.isLive" :href="channel.liveTvUrl" target="_blank"
                  style="display: flex; flex-direction: column; align-items: center; padding: 6px; border-radius: 5px; transition: background-color 0.3s, transform 0.2s; min-width: 50px; text-decoration: none; color: #6c757d;"
                  title="Live TV" aria-label="Watch Live TV">
                  <i style="font-size: 1rem; margin-bottom: 3px; color: #6c757d;" class="fas fa-broadcast-tower"></i>
                  <small style="font-size: 0.7rem;">Live TV</small>
                </a>
                <a v-if="channel.websiteUrl" :href="channel.websiteUrl" target="_blank"
                  style="display: flex; flex-direction: column; align-items: center; padding: 6px; border-radius: 5px; transition: background-color 0.3s, transform 0.2s; min-width: 50px; text-decoration: none; color: #6c757d;"
                  title="Website" aria-label="Visit Website">
                  <i style="font-size: 1rem; margin-bottom: 3px; color: #6c757d;" class="fas fa-link"></i>
                  <small style="font-size: 0.7rem;">Website</small>
                </a>
                <a v-if="channel.youtubeChannel" :href="channel.youtubeChannel + '/videos'" target="_blank"
                  style="display: flex; flex-direction: column; align-items: center; padding: 6px; border-radius: 5px; transition: background-color 0.3s, transform 0.2s; min-width: 50px; text-decoration: none; color: #6c757d;"
                  title="Videos" aria-label="View Videos">
                  <i style="font-size: 1rem; margin-bottom: 3px; color: #6c757d;" class="fas fa-video"></i>
                  <small style="font-size: 0.7rem;">Videos</small>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- All Channels Section -->
    <h4 class="fw-bold mb-3 d-flex align-items-center">All Channels</h4>
    <section class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-3" aria-label="Channel grid">
      <article class="col" v-for="(channel, index) in paginatedChannels" :key="index">
        <div class="channel-card" :class="{ 'is-live': channel.isLive }"
          style="border-radius: 8px; overflow: hidden; transition: transform 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <div class="channel-img-wrapper" style="position: relative; height: 300px; overflow: hidden;">
            <img :src="channel.thumbnail" :alt="`${channel.name} thumbnail`" class="channel-img"
              style="width: 100%; height: 100%; object-fit: contain;" @error="handleImageError">
            <div class="channel-gradient"
              style="position: absolute; bottom: 0; left: 0; right: 0; height: 35%;">
            </div>
            <span v-if="channel.isLive" class="badge bg-danger"
              style="position: absolute; top: 10px; right: 10px; z-index: 10;">Live Now</span>
            <button @click="toggleFavorite(channel)"
              :aria-label="isFavorite(channel) ? 'Remove from favorites' : 'Add to favorites'"
              style="position: absolute; top: 10px; left: 10px; z-index: 10; background: none; border: none; cursor: pointer; color: #6c757d; transition: color 0.3s;">
              <i :class="isFavorite(channel) ? 'fas fa-star' : 'far fa-star'"
                style="font-size: 1.5rem; color: #ffc107;"></i>
            </button>
          </div>
          <div class="channel-body" style="padding: 15px;">
            <h5 class="fw-bold mb-2">{{ channel.name }}</h5>
            <p class="small mb-2">{{ truncateDescription(channel.description, 80) }}</p>
            <div class="mb-2 d-flex justify-content-between small text-muted">
              <span><i class="fas fa-globe me-1"></i>{{ channel.streamType === 'youtube_embed' ? 'YouTube Live' : 'Online Channel' }}</span>
              <span><i class="fas fa-users me-1"></i>{{ channel.viewers || 'N/A' }} viewers</span>
              <span><i class="fas fa-clock me-1"></i>{{ channel.schedule ? channel.schedule : 'No schedule' }}</span>
            </div>
            <div class="mb-3 small text-muted">
              <span><i class="fas fa-map-marker-alt me-1"></i>{{ channel.location || 'Not specified' }}</span>
            </div>
            <div class="mb-3">
              <span class="badge bg-primary me-1">{{ channel.category }}</span>
              <span v-for="lang in channel.languages" :key="lang" class="badge bg-secondary me-1">{{ lang }}</span>
              <span v-for="tag in channel.tags" :key="tag" class="badge bg-info text-dark me-1">{{ tag }}</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5, minmax(60px, 1fr)); gap: 5px; justify-content: center; justify-items: center;">
              <a v-if="channel.youtubeChannel" :href="channel.youtubeChannel" target="_blank"
                style="display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 6px; transition: background-color 0.3s, transform 0.2s; min-width: 60px; text-decoration: none; color: #6c757d;"
                title="YouTube Channel" aria-label="Visit YouTube Channel">
                <i style="font-size: 1.2rem; margin-bottom: 4px; color: #6c757d;" class="fab fa-youtube"></i>
                <small style="font-size: 0.8rem;">Channel</small>
              </a>
              <a v-if="channel.playlistUrl" :href="channel.playlistUrl" target="_blank"
                style="display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 6px; transition: background-color 0.3s, transform 0.2s; min-width: 60px; text-decoration: none; color: #6c757d;"
                title="Playlists" aria-label="View Playlists">
                <i style="font-size: 1.2rem; margin-bottom: 4px; color: #6c757d;" class="fas fa-list-ul"></i>
                <small style="font-size: 0.8rem;">Playlists</small>
              </a>
              <a v-if="channel.liveTvUrl && channel.isLive" :href="channel.liveTvUrl" target="_blank"
                style="display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 6px; transition: background-color 0.3s, transform 0.2s; min-width: 60px; text-decoration: none; color: #6c757d;"
                title="Live TV" aria-label="Watch Live TV">
                <i style="font-size: 1.2rem; margin-bottom: 4px; color: #6c757d;" class="fas fa-broadcast-tower"></i>
                <small style="font-size: 0.8rem;">Live TV</small>
              </a>
              <a v-if="channel.websiteUrl" :href="channel.websiteUrl" target="_blank"
                style="display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 6px; transition: background-color 0.3s, transform 0.2s; min-width: 60px; text-decoration: none; color: #6c757d;"
                title="Website" aria-label="Visit Website">
                <i style="font-size: 1.2rem; margin-bottom: 4px; color: #6c757d;" class="fas fa-link"></i>
                <small style="font-size: 0.8rem;">Website</small>
              </a>
              <a v-if="channel.youtubeChannel" :href="channel.youtubeChannel + '/videos'" target="_blank"
                style="display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 6px; transition: background-color 0.3s, transform 0.2s; min-width: 60px; text-decoration: none; color: #6c757d;"
                title="Videos" aria-label="View Videos">
                <i style="font-size: 1.2rem; margin-bottom: 4px; color: #6c757d;" class="fas fa-video"></i>
                <small style="font-size: 0.8rem;">Videos</small>
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- Pagination -->
    <nav aria-label="Channels pagination" class="d-flex justify-content-center mb-4">
      <ul class="pagination pagination-lg">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1" aria-label="Previous page">
            Previous
          </button>
        </li>
        <li v-if="showFirstPage" class="page-item" :class="{ active: currentPage === 1 }">
          <button class="page-link" @click="currentPage = 1" :aria-current="currentPage === 1 ? 'page' : null">1</button>
        </li>
        <li v-if="showLeftEllipsis" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        <li class="page-item" v-for="page in displayedPages" :key="page" :class="{ active: currentPage === page }">
          <button class="page-link" @click="currentPage = page" :aria-current="currentPage === page ? 'page' : null">{{ page }}</button>
        </li>
        <li v-if="showRightEllipsis" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        <li v-if="showLastPage" class="page-item" :class="{ active: currentPage === totalPages }">
          <button class="page-link" @click="currentPage = totalPages" :aria-current="currentPage === totalPages ? 'page' : null">{{ totalPages }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages" aria-label="Next page">
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Hls from 'hls.js'

export default {
  name: 'LiveChannels',
  data() {
    return {
      showFilters: false,
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
      currentPage: 1,
      itemsPerPage: 9,
      debounceTimer: null,
      favorites: [],
      showFavorites: true,
      alertMessage: '',
      channels: [
        {
          "name": "Peace TV English",
          "youtubeChannel": "https://www.youtube.com/@PeaceTVEnglish",
          "websiteUrl": "https://peacetv.tv",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL8D2A442E7E97F7A3",
          "liveTvUrl": "https://peacetv.tv/live",
          "thumbnail": "/images/food.png",
          "description": "International Islamic educational channel featuring lectures by Dr. Zakir Naik and other renowned Islamic scholars.",
          "languages": ["English"],
          "category": "Educational",
          "tags": ["Lectures", "Dawah", "Zakir Naik"],
          "streamType": "external",
          "isLive": false,
          "viewers": 1200,
          "schedule": "Daily 8 PM",
          "location": "Global"
        },
        {
          "name": "One Islam TV",
          "youtubeChannel": "https://www.youtube.com/@OneIslamProductions",
          "websiteUrl": "https://www.oneislam.tv",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F",
          "liveTvUrl": "https://www.oneislam.tv/live",
          "thumbnail": "/images/food.png",
          "description": "High-quality Islamic educational content with zero ads, 100% halal programming, and music-free videos.",
          "languages": ["English"],
          "category": "Educational",
          "tags": ["Halal", "Education", "No Ads"],
          "streamType": "external",
          "isLive": true,
          "viewers": 850,
          "schedule": "24/7",
          "location": "Global"
        },
        {
          "name": "Madani Channel",
          "youtubeChannel": "https://www.youtube.com/@MadaniChannelOfficial",
          "websiteUrl": "https://www.madanichannel.tv",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3",
          "liveTvUrl": "https://www.madanichannel.tv/live",
          "thumbnail": "/images/food.png",
          "description": "Popular Pakistani Islamic channel offering diverse Islamic programs, live events, and educational content in Urdu.",
          "languages": ["Urdu", "Arabic"],
          "category": "Educational",
          "tags": ["Programs", "Events", "Urdu"],
          "streamType": "external",
          "isLive": false,
          "viewers": 2000,
          "schedule": "Daily 6 PM",
          "location": "Pakistan"
        },
        {
          "name": "Al Jazeera Mubasher",
          "youtubeChannel": "https://www.youtube.com/@aljazeeramubasher",
          "websiteUrl": "https://mubasher.aljazeera.net",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL8D2A442E7E97F7A3",
          "liveTvUrl": "https://mubasher.aljazeera.net/live",
          "thumbnail": "/images/food.png",
          "description": "Live Arabic news and Islamic programming from Al Jazeera, including daily prayers, religious discussions, and Islamic events.",
          "languages": ["Arabic"],
          "category": "News & Current Affairs",
          "tags": ["News", "Prayers", "Events"],
          "streamType": "external",
          "isLive": true,
          "viewers": 5000,
          "schedule": "24/7",
          "location": "Qatar"
        },
        {
          "name": "Iqraa TV",
          "youtubeChannel": "https://www.youtube.com/@IqraaTVChannel",
          "websiteUrl": "https://iqraa.com",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F",
          "liveTvUrl": "https://iqraa.com/live",
          "thumbnail": "/images/food.png",
          "description": "Leading Arabic Islamic channel offering Quranic recitations, religious programs, and Islamic documentaries.",
          "languages": ["Arabic"],
          "category": "Quran",
          "tags": ["Quran", "Documentaries", "Programs"],
          "streamType": "external",
          "isLive": false,
          "viewers": 1500,
          "schedule": "Daily 7 AM",
          "location": "Saudi Arabia"
        },
        {
          "name": "Al-Resalah TV",
          "youtubeChannel": "https://www.youtube.com/@AlResalahTV",
          "websiteUrl": "https://alresalah.net",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3",
          "liveTvUrl": "https://alresalah.net/live",
          "thumbnail": "/images/food.png",
          "description": "Popular Arabic Islamic channel featuring religious dramas, educational programs, and live Islamic events.",
          "languages": ["Arabic"],
          "category": "Entertainment",
          "tags": ["Dramas", "Events", "Education"],
          "streamType": "external",
          "isLive": true,
          "viewers": 3000,
          "schedule": "24/7",
          "location": "Saudi Arabia"
        },
        {
          "name": "Dawah Man",
          "youtubeChannel": "https://www.youtube.com/@DawahMan",
          "websiteUrl": "https://dawahman.org",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3",
          "liveTvUrl": "https://dawahman.org/live",
          "thumbnail": "/images/food.png",
          "description": "Islamic dawah content featuring street discussions, debates, and educational videos about Islam.",
          "languages": ["English"],
          "category": "Dawah",
          "tags": ["Dawah", "Debates", "Discussions"],
          "streamType": "external",
          "isLive": false,
          "viewers": 900,
          "schedule": "Weekly",
          "location": "UK"
        },
        {
          "name": "Mufti Menk",
          "youtubeChannel": "https://www.youtube.com/@muftimenkofficial",
          "websiteUrl": "https://muftimenk.com",
          "playlistUrl": "@muftimenkofficial/playlists",
          "liveTvUrl": "https://muftimenk.com/live",
          "thumbnail": "/images/food.png",
          "description": "Inspirational Islamic lectures and guidance by Mufti Ismail Menk, covering various aspects of Islamic life.",
          "languages": ["English", "Arabic"],
          "category": "Educational",
          "tags": ["Lectures", "Inspiration", "Mufti Menk"],
          "streamType": "external",
          "isLive": false,
          "viewers": 2500,
          "schedule": "Daily 9 PM",
          "location": "Zimbabwe"
        },
        {
          "name": "Digital Mimbar",
          "youtubeChannel": "https://www.youtube.com/@DigitalMimbar",
          "websiteUrl": "https://digitalmimbar.com",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3",
          "liveTvUrl": "https://digitalmimbar.com/live",
          "thumbnail": "/images/food.png",
          "description": "Modern Islamic content platform providing digital Islamic education and spiritual guidance.",
          "languages": ["English"],
          "category": "Educational",
          "tags": ["Digital", "Education", "Guidance"],
          "streamType": "external",
          "isLive": false,
          "viewers": 1100,
          "schedule": "Weekly",
          "location": "Global"
        },
        {
          "name": "Quran Weekly",
          "youtubeChannel": "https://www.youtube.com/@QuranWeekly",
          "websiteUrl": "https://quranweekly.com",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F",
          "liveTvUrl": "https://quranweekly.com/live",
          "thumbnail": "/images/food.png",
          "description": "Weekly Quranic reflections and Islamic educational content featuring various Islamic scholars.",
          "languages": ["English"],
          "category": "Quran",
          "tags": ["Quran", "Reflections", "Scholars"],
          "streamType": "external",
          "isLive": false,
          "viewers": 1300,
          "schedule": "Weekly",
          "location": "USA"
        },
        {
          "name": "Islamic Finder",
          "youtubeChannel": "https://www.youtube.com/@IslamicFinder",
          "websiteUrl": "https://islamicfinder.org",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F",
          "liveTvUrl": "https://islamicfinder.org/live",
          "thumbnail": "/images/food.png",
          "description": "Comprehensive Islamic resource providing prayer times, Qibla direction, and Islamic educational content.",
          "languages": ["English", "Arabic", "Urdu"],
          "category": "Educational",
          "tags": ["Prayer Times", "Qibla", "Education"],
          "streamType": "external",
          "isLive": false,
          "viewers": 1700,
          "schedule": "24/7",
          "location": "Global"
        },
        {
          "name": "Muslim Central",
          "youtubeChannel": "https://www.youtube.com/@MuslimCentral",
          "websiteUrl": "https://muslimcentral.com",
          "playlistUrl": "https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3",
          "liveTvUrl": "https://muslimcentral.com/live",
          "thumbnail": "/images/food.png",
          "description": "Comprehensive Islamic audio and video library featuring lectures by renowned Islamic scholars worldwide.",
          "languages": ["English"],
          "category": "Educational",
          "tags": ["Lectures", "Library", "Scholars"],
          "streamType": "external",
          "isLive": true,
          "viewers": 2200,
          "schedule": "24/7",
          "location": "Global"
        }
      ],
      geoQualityMap: ['US', 'CA', 'DE', 'SA', 'AE', 'UK', 'FR']
    }
  },
  computed: {
    filteredChannels() {
      let filtered = [...this.channels];

      if (this.searchQuery) {
        filtered = filtered.filter(channel =>
          channel.name.toLowerCase().includes(this.searchQuery.toLowerCase())
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
    paginatedChannels() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredChannels.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredChannels.length / this.itemsPerPage);
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
    displayedPages() {
      const maxPagesToShow = 5; // Show current page ±2
      const pages = [];
      const startPage = Math.max(2, this.currentPage - 2);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

      for (let page = startPage; page <= endPage; page++) {
        pages.push(page);
      }
      return pages;
    },
    showFirstPage() {
      return this.currentPage > 3 && this.totalPages > 5;
    },
    showLastPage() {
      return this.currentPage < this.totalPages - 2 && this.totalPages > 5;
    },
    showLeftEllipsis() {
      return this.currentPage > 3 && this.totalPages > 5;
    },
    showRightEllipsis() {
      return this.currentPage < this.totalPages - 2 && this.totalPages > 5;
    }
  },
  watch: {
    alertMessage(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.alertMessage = '';
        }, 3000);
      }
    },
    currentPage() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    filteredChannels() {
      this.currentPage = 1;
    }
  },
  mounted() {
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
  },
  beforeUnmount() {
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    document.removeEventListener('keydown', this.handleKeyboard);
  },
  methods: {
    toggleFavoritesSection() {
      this.showFavorites = !this.showFavorites;
    },
    toggleFavorite(channel) {
      const wasFavorite = this.isFavorite(channel);
      this.favorites = this.favorites.filter(fav => fav.name !== channel.name);
      if (!wasFavorite) {
        this.favorites.push(channel);
        this.alertMessage = `${channel.name} has been added to favorites.`;
      } else {
        this.alertMessage = `${channel.name} has been removed from favorites.`;
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
      this.filterChannels();
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
            lowLatencyMode: true
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
    filterChannels() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.$forceUpdate();
      }, 300);
    },
    truncateDescription(text, maxLength) {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },
    handleKeyboard(event) {
      if (event.key === 'Escape' && this.showYouTubeModal) {
        this.closeYouTubeModal();
      }
    }
  }
}
</script>

<style scoped>
.channel-card {
  transition: transform 0.2s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.channel-card:hover {
  transform: translateY(-5px);
}

.channel-card.is-live {
  animation: pulse-shadow 1.5s ease-in-out infinite;
}

.channel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.channel-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}

.badge {
  font-size: 0.75rem;
}

.channel-body a:hover {
  background-color: #f1f1f1;
  transform: scale(1.1);
}

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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  cursor: not-allowed;
  background-color: #ffffff;
  border-color: #000000;
}

@keyframes pulse-shadow {
  0% {
    box-shadow: 0 4px 12px rgba(255,0,0,0.3);
  }
  50% {
    box-shadow: 0 8px 24px rgba(255,0,0,0.5);
  }
  100% {
    box-shadow: 0 4px 12px rgba(255,0,0,0.3);
  }
}

/* Mobile-specific adjustments */
@media (max-width: 576px) {
  .pagination .page-item .page-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    min-width: 32px;
  }
  .container {
    padding: 15px;
  }
  .channel-card {
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .channel-card.is-live {
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3) !important;
  }
  .channel-img-wrapper {
    height: 220px;
  }
  .favorites-section .channel-img-wrapper {
    height: 160px;
  }
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
  .channel-body p, .channel-body .small {
    font-size: 0.85rem;
  }
  .favorites-section .channel-body p, .favorites-section .channel-body .small {
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
  }
  .favorites-section .channel-body a {
    min-width: 45px;
    padding: 5px;
  }
  .channel-body a i {
    font-size: 1rem;
  }
  .favorites-section .channel-body a i {
    font-size: 0.9rem;
  }
  .channel-body a small {
    font-size: 0.7rem;
  }
  .favorites-section .channel-body a small {
    font-size: 0.65rem;
  }
  .bg-light {
    padding: 15px !important;
  }
  .form-control, .form-select, .input-group-text {
    font-size: 0.9rem;
    border-radius: 8px !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  .form-control:hover, .form-select:hover, .input-group-text:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
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

/* Badge styles */
.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.4em 0.65em;
  border-radius: 8px;
}

.badge.bg-primary {
  background-color: #00bfa6 !important;
}

.badge.bg-secondary {
  background-color: #6c757d !important;
}

.badge.bg-info {
  background-color: #e0f7f4 !important;
  color: #004d43 !important;
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
</style>