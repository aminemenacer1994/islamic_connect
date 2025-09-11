<template>
  <div class="container py-5">
    <!-- Header Section -->
    <h1 class="text-center fw-bold display-4 mb-3">Live Islamic TV Channels</h1>
    <p class="text-center mb-4 lead d-none d-md-block mx-auto" style="max-width: 800px;">
      Watch live Islamic TV channels from around the world. Experience spiritual content including live prayers from Makkah and Madinah, educational programs, Quranic recitations, and Islamic lifestyle content in multiple languages.
    </p>

    <!-- Filter and Search Section -->
    <div class="mb-4 p-4 bg-light rounded-3 shadow-sm">
      <div class="row g-3 align-items-center">
        <div class="col-md-3">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control rounded-pill shadow-sm"
            placeholder="Search channels..."
            @input="filterChannels"
            aria-label="Search channels"
          >
        </div>
        <div class="col-md-3">
          <select v-model="selectedCategory" class="form-select rounded-pill shadow-sm" @change="filterChannels">
            <option value="all">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="selectedLanguage" class="form-select rounded-pill shadow-sm" @change="filterChannels">
            <option value="all">All Languages</option>
            <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="selectedTag" class="form-select rounded-pill shadow-sm" @change="filterChannels">
            <option value="all">All Tags</option>
            <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- YouTube Embed Modal -->
    <div v-if="showYouTubeModal" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.8);" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl modal-dialog-centered animate__animated animate__fadeIn">
        <div class="modal-content rounded-4">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold">{{ selectedChannel.name }}</h5>
            <button type="button" class="btn-close" @click="closeYouTubeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0">
            <div class="ratio ratio-16x9">
              <iframe
                :src="selectedChannel.youtubeEmbed"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="modal-footer border-0">
            <div class="d-flex gap-2 flex-wrap align-items-center">
              <span class="badge bg-primary">{{ selectedChannel.category }}</span>
              <span v-for="lang in selectedChannel.languages" :key="lang" class="badge bg-secondary">{{ lang }}</span>
              <span v-for="tag in selectedChannel.tags" :key="tag" class="badge bg-info">{{ tag }}</span>
              <button class="btn btn-sm btn-outline-warning ms-auto" @click="toggleFavorite(selectedChannel)">
                <i :class="isFavorite(selectedChannel) ? 'fas fa-star' : 'far fa-star'"></i>
                {{ isFavorite(selectedChannel) ? 'Remove Favorite' : 'Add Favorite' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Channels Grid -->
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 mb-5">
      <div class="col" v-for="(channel, index) in paginatedChannels" :key="index">
        <div
          class="card h-100 shadow rounded-4 overflow-hidden position-relative"
          @click="playChannel(channel)"
          style="cursor: pointer;"
          tabindex="0"
          @keydown.enter="playChannel(channel)"
        >
          <img
            :src="channel.thumbnail"
            :alt="`${channel.name} thumbnail`"
            class="w-100"
            style="object-fit: cover; height: 200px;"
            @error="handleImageError"
          >
          <div v-if="isFavorite(channel)" class="position-absolute top-0 end-0 m-2">
            <i class="fas fa-star text-warning"></i>
          </div>
          <div class="card-body p-3">
            <h5 class="fw-bold mb-2 text-dark text-truncate" style="font-size: 1.25rem;">{{ channel.name }}</h5>
            <p class="card-text text-muted text-wrap mb-3" style="font-size: 0.9rem; line-height: 1.4;">
              {{ truncateDescription(channel.description, 100) }}
            </p>
            <div class="mb-3">
              <span class="badge bg-primary me-1">{{ channel.category }}</span>
              <span v-for="lang in channel.languages" :key="lang" class="badge bg-secondary me-1">{{ lang }}</span>
              <span v-for="tag in channel.tags" :key="tag" class="badge bg-info me-1">{{ tag }}</span>
            </div>
            <div class="d-flex gap-2">
              <button
                class="btn btn-primary flex-grow-1 rounded-pill"
                @click.stop="playChannel(channel)"
                :disabled="isLoading"
              >
                <span v-if="isLoading && selectedChannel === channel" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ channel.streamType === 'youtube_embed' ? 'Watch Live' : 'Open Channel' }}
              </button>
              <button
                v-if="channel.youtubeChannel"
                class="btn btn-outline-danger rounded-pill"
                @click.stop="openExternal(channel.youtubeChannel)"
                title="YouTube Channel"
              >
                <i class="fab fa-youtube"></i>
              </button>
              <button
                v-if="channel.websiteUrl"
                class="btn btn-outline-secondary rounded-pill"
                @click.stop="openExternal(channel.websiteUrl)"
                title="Website"
              >
                <i class="fas fa-globe"></i>
              </button>
              <button
                v-if="channel.playlistUrl"
                class="btn btn-outline-success rounded-pill"
                @click.stop="openExternal(channel.playlistUrl)"
                title="Playlist"
              >
                <i class="fas fa-list"></i>
              </button>
              <button
                v-if="channel.liveTvUrl"
                class="btn btn-outline-primary rounded-pill"
                @click.stop="openExternal(channel.liveTvUrl)"
                title="Live TV"
              >
                <i class="fas fa-tv"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <nav aria-label="Channels pagination" class="d-flex justify-content-center mb-5">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
        </li>
      </ul>
    </nav>

    <!-- HLS Video Player Section -->
    <div v-if="selectedChannel && selectedChannel.streamType === 'hls'" class="mt-5 mb-5 px-3" ref="playerSection" :class="{ 'mini-screen': isMiniScreen }">
      <div class="text-center mb-4">
        <h6 class="fw-bold text-dark">🔴 Now Playing: <span>{{ selectedChannel.name }}</span></h6>
        <button class="btn btn-sm btn-outline-secondary me-2 rounded-pill" @click="toggleScreenMode">
          {{ isMiniScreen ? 'Maximize' : 'Minimize' }}
        </button>
        <button class="btn btn-sm btn-outline-info rounded-pill" @click="enterPictureInPicture" :disabled="!document.pictureInPictureEnabled">
          <i class="fas fa-expand"></i> Picture-in-Picture
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="streamError" class="alert alert-danger text-center">
        Failed to load stream. Please try another channel or check your connection.
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="text-center my-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Filter Controls -->
      <div class="row mb-4 g-3" v-if="showFilters && !isLoading">
        <div class="col-md-6">
          <label for="qualitySelect" class="form-label fw-semibold">Stream Quality:</label>
          <select id="qualitySelect" v-model="manualQuality" class="form-select rounded-pill shadow-sm" @change="updateHLSStream">
            <option value="auto">Auto</option>
            <option value="hd">HD</option>
            <option value="sd">SD</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="ratioSelect" class="form-label fw-semibold">Video Ratio:</label>
          <select id="ratioSelect" v-model="videoRatio" class="form-select rounded-pill shadow-sm">
            <option value="16x9">16:9 (Widescreen)</option>
            <option value="21x9">21:9 (Ultrawide)</option>
            <option value="4x3">4:3 (Standard)</option>
            <option value="1x1">1:1 (Square)</option>
          </select>
        </div>
      </div>

      <!-- Video Player -->
      <div class="shadow-lg rounded-3 overflow-hidden" style="max-width: 100%;">
        <div :class="`ratio ratio-${videoRatio}`">
          <video
            id="video"
            ref="video"
            controls
            autoplay
            style="border-radius: 15px;"
            @dragstart="startDrag"
            @dragend="endDrag"
            @drag="dragVideo"
          ></video>
        </div>
      </div>
    </div>

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
      favorites: JSON.parse(localStorage.getItem('favoriteChannels') || '[]'),
      channels: [
        {
          name: 'Makkah Live HD',
          streamUrlHD: 'https://shls-makkah-prod-dub.shahid.net/out/v1/d5bbe570e1514d3d9a142657d33d85e6/index.m3u8',
          streamUrlSD: 'https://shls-makkah-prod-dub.shahid.net/out/v1/d5bbe570e1514d3d9a142657d33d85e6/index.m3u8',
          youtubeEmbed: 'https://www.youtube.com/embed/kLAzWjh6_QQ?autoplay=1&mute=1',
          youtubeChannel: 'https://www.youtube.com/watch?v=kLAzWjh6_QQ',
          websiteUrl: 'https://www.makkah.live',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL8D2A442E7E97F7A3',
          liveTvUrl: 'https://www.makkah.live/stream',
          thumbnail: 'https://i.ytimg.com/vi/kLAzWjh6_QQ/maxresdefault.jpg',
          description: 'Live 24/7 HD stream from Masjid al-Haram in Makkah. Watch the Holy Kaaba, Tawaf, daily prayers, and special Islamic events.',
          languages: ['Arabic'],
          category: 'Live Prayers',
          tags: ['Holy Kaaba', 'Tawaf', 'Hajj'],
          streamType: 'youtube_embed'
        },
        {
          name: 'Madinah Live HD',
          streamUrlHD: 'https://shls-madinah-prod-dub.shahid.net/out/v1/88b4bb4af5f84b3ba5a8d126db181027/index.m3u8',
          streamUrlSD: 'https://shls-madinah-prod-dub.shahid.net/out/v1/88b4bb4af5f84b3ba5a8d126db181027/index.m3u8',
          youtubeEmbed: 'https://www.youtube.com/embed/Jhi1BbdkdPI?autoplay=1&mute=1',
          youtubeChannel: 'https://www.youtube.com/watch?v=Jhi1BbdkdPI',
          websiteUrl: 'https://www.madinah.live',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://www.madinah.live/stream',
          thumbnail: 'https://i.ytimg.com/vi/Jhi1BbdkdPI/maxresdefault.jpg',
          description: 'Live 24/7 HD stream from Masjid an-Nabawi in Madinah. Experience the serenity of the Prophet\'s Mosque and daily prayers.',
          languages: ['Arabic'],
          category: 'Live Prayers',
          tags: ['Prophet\'s Mosque', 'Salah', 'Spirituality'],
          streamType: 'youtube_embed'
        },
        {
          name: 'Islam Channel',
          youtubeChannel: 'https://www.youtube.com/@islamchannel',
          websiteUrl: 'https://watch.islamchannel.tv/live/1025',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://watch.islamchannel.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_nKL6hoP9KF2Fkr0mKYhHwU4EqIGjOdPy9VJ8K0Hw=s176-c-k-c0x00ffffff-no-rj',
          description: 'UK-based Islamic channel providing religious knowledge, news, entertainment, and cultural programming for Muslim families worldwide.',
          languages: ['English', 'Urdu'],
          category: 'General',
          tags: ['News', 'Entertainment', 'Family'],
          streamType: 'external'
        },
        {
          name: 'Peace TV English',
          youtubeChannel: 'https://www.youtube.com/@PeaceTVEnglish',
          websiteUrl: 'https://peacetv.tv',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL8D2A442E7E97F7A3',
          liveTvUrl: 'https://peacetv.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_k7Ztqr_6tYfBN9mAzIE4S4_EFYhMN5qVUHJhzHIg=s176-c-k-c0x00ffffff-no-rj',
          description: 'International Islamic educational channel featuring lectures by Dr. Zakir Naik and other renowned Islamic scholars.',
          languages: ['English'],
          category: 'Educational',
          tags: ['Lectures', 'Dawah', 'Zakir Naik'],
          streamType: 'external'
        },
        {
          name: 'One Islam TV',
          youtubeChannel: 'https://www.youtube.com/@OneIslamProductions',
          websiteUrl: 'https://www.oneislam.tv',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://www.oneislam.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_mK9-cQGQHxoFjCSDt8rWEuFe8VBIzBrRoiPw4k=s176-c-k-c0x00ffffff-no-rj',
          description: 'High-quality Islamic educational content with zero ads, 100% halal programming, and music-free videos.',
          languages: ['English'],
          category: 'Educational',
          tags: ['Halal', 'Education', 'No Ads'],
          streamType: 'external'
        },
        {
          name: 'ARY QTV',
          youtubeChannel: 'https://www.youtube.com/@ARYQTV',
          websiteUrl: 'https://aryqtv.tv',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://aryqtv.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_nJp8F3I4K8XQx1V5FLrK7VDkXPxDhJmAIhHHFA=s176-c-k-c0x00ffffff-no-rj',
          description: 'Popular Pakistani Islamic channel featuring Quranic recitations, religious discussions, and live Islamic events.',
          languages: ['Urdu', 'Arabic'],
          category: 'Quran',
          tags: ['Quran', 'Recitations', 'Events'],
          streamType: 'external'
        },
        {
          name: 'Huda TV',
          youtubeChannel: 'https://www.youtube.com/@HudaTV',
          websiteUrl: 'https://huda.tv',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL8D2A442E7E97F7A3',
          liveTvUrl: 'https://huda.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_kL9X8F4oK7gGrE5ZfJKGb8QU2r6QdwXv5MxIFA=s176-c-k-c0x00ffffff-no-rj',
          description: 'Islamic lifestyle channel focusing on women and family topics, providing guidance on Islamic living and spirituality.',
          languages: ['Arabic', 'English'],
          category: 'Educational',
          tags: ['Women', 'Family', 'Lifestyle'],
          streamType: 'external'
        },
        {
          name: 'Ahlulbayt TV',
          youtubeChannel: 'https://www.youtube.com/@AhlulbaytTV',
          websiteUrl: 'https://ahlulbayt.tv',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://ahlulbayt.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_nMKGHLQHxvN8F6sL9kRGu3wMEhLGnFxPcJ7jKQ=s176-c-k-c0x00ffffff-no-rj',
          description: 'The world\'s first Shia Islamic channel, delivering content based on the teachings of the Prophet Muhammad (PBUH).',
          languages: ['English', 'Arabic'],
          category: 'Sectarian',
          tags: ['Shia', 'Teachings', 'Prophet Muhammad'],
          streamType: 'external'
        },
        {
          name: 'Madani Channel',
          youtubeChannel: 'https://www.youtube.com/@MadaniChannelOfficial',
          websiteUrl: 'https://www.madanichannel.tv',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://www.madanichannel.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_nUQH8pL9rGf3MnBgZqKj4F6Y7kX8aKqL1IH2b8=s176-c-k-c0x00ffffff-no-rj',
          description: 'Popular Pakistani Islamic channel offering diverse Islamic programs, live events, and educational content in Urdu.',
          languages: ['Urdu', 'Arabic'],
          category: 'Educational',
          tags: ['Programs', 'Events', 'Urdu'],
          streamType: 'external'
        },
        {
          name: 'Al Jazeera Mubasher',
          youtubeChannel: 'https://www.youtube.com/@aljazeeramubasher',
          websiteUrl: 'https://mubasher.aljazeera.net',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL8D2A442E7E97F7A3',
          liveTvUrl: 'https://mubasher.aljazeera.net/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_nB8gP5RoL7dQFkVQJ8kI4c3jGH8Q5q4L8TL9iw=s176-c-k-c0x00ffffff-no-rj',
          description: 'Live Arabic news and Islamic programming from Al Jazeera, including daily prayers, religious discussions, and Islamic events.',
          languages: ['Arabic'],
          category: 'News & Current Affairs',
          tags: ['News', 'Prayers', 'Events'],
          streamType: 'external'
        },
        {
          name: 'Iqraa TV',
          youtubeChannel: 'https://www.youtube.com/@IqraaTVChannel',
          websiteUrl: 'https://iqraa.com',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://iqraa.com/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_mH7kI2rJ8FgL9vQJ5mE6jK3nL8dF9sQ4N2M1zA=s176-c-k-c0x00ffffff-no-rj',
          description: 'Leading Arabic Islamic channel offering Quranic recitations, religious programs, and Islamic documentaries.',
          languages: ['Arabic'],
          category: 'Quran',
          tags: ['Quran', 'Documentaries', 'Programs'],
          streamType: 'external'
        },
        {
          name: 'Guide US TV',
          youtubeChannel: 'https://www.youtube.com/@GuideUSTVOfficial',
          websiteUrl: 'https://guideus.tv',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://guideus.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_nP8gH9kL2vQJ4dF8mG7jI5nK6oE3sR1Q8N4M2B=s176-c-k-c0x00ffffff-no-rj',
          description: 'American Islamic channel featuring Islamic lectures, discussions, and educational content for English-speaking Muslims.',
          languages: ['English'],
          category: 'Educational',
          tags: ['Lectures', 'Discussions', 'Education'],
          streamType: 'external'
        },
        {
          name: 'Salam TV',
          youtubeChannel: 'https://www.youtube.com/@SalamTVOfficial',
          websiteUrl: 'https://salamtv.org',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://salamtv.org/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_kM9nL8gH2pQJ5dF7mI6jK4oE2sR0Q9N3M1C=s176-c-k-c0x00ffffff-no-rj',
          description: 'French Islamic channel providing religious education and cultural programming for French-speaking Muslim communities.',
          languages: ['French', 'Arabic'],
          category: 'Educational',
          tags: ['French', 'Culture', 'Education'],
          streamType: 'external'
        },
        {
          name: 'Bayyinah Institute',
          youtubeChannel: 'https://www.youtube.com/@BayyinahInstitute',
          websiteUrl: 'https://bayyinah.com',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://bayyinah.com/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_lN8mH9kL3vQJ6dF8nI7jK5oE4sR2Q0N4M3D=s176-c-k-c0x00ffffff-no-rj',
          description: 'High-quality Quranic studies and Arabic language learning content by Ustadh Nouman Ali Khan and team.',
          languages: ['English'],
          category: 'Educational',
          tags: ['Quran', 'Arabic', 'Nouman Ali Khan'],
          streamType: 'external'
        },
        {
          name: 'Mercy TV',
          youtubeChannel: 'https://www.youtube.com/@MercyTVOfficial',
          websiteUrl: 'https://mercytv.net',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://mercytv.net/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_mO9nM0hL4vQJ7dF9oI8jK6oE5sR3Q1N5M4E=s176-c-k-c0x00ffffff-no-rj',
          description: 'Islamic channel focusing on mercy, compassion, and spiritual guidance through Islamic teachings.',
          languages: ['English', 'Arabic'],
          category: 'Spiritual',
          tags: ['Mercy', 'Spirituality', 'Guidance'],
          streamType: 'external'
        },
        {
          name: 'Al-Resalah TV',
          youtubeChannel: 'https://www.youtube.com/@AlResalahTV',
          websiteUrl: 'https://alresalah.net',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://alresalah.net/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_nP0oN1hL5wQJ8dF0pI9jK7oE6sR4Q2N6M5F=s176-c-k-c0x00ffffff-no-rj',
          description: 'Popular Arabic Islamic channel featuring religious dramas, educational programs, and live Islamic events.',
          languages: ['Arabic'],
          category: 'Entertainment',
          tags: ['Dramas', 'Events', 'Education'],
          streamType: 'external'
        },
        {
          name: 'IslamQA English',
          youtubeChannel: 'https://www.youtube.com/@islamqaenglish',
          websiteUrl: 'https://islamqa.info/en',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://islamqa.info/en/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_oQ1pO2hL6xQJ9dF1qI0jK8oE7sR5Q3N7M6G=s176-c-k-c0x00ffffff-no-rj',
          description: 'Educational Islamic content providing answers to common Islamic questions and contemporary issues.',
          languages: ['English'],
          category: 'Educational',
          tags: ['Q&A', 'Education', 'Issues'],
          streamType: 'external'
        },
        {
          name: 'Dawah Man',
          youtubeChannel: 'https://www.youtube.com/@DawahMan',
          websiteUrl: 'https://dawahman.org',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://dawahman.org/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_pR2qP3hL7yQJ0dF2rI1jK9oE8sR6Q4N8M7H=s176-c-k-c0x00ffffff-no-rj',
          description: 'Islamic dawah content featuring street discussions, debates, and educational videos about Islam.',
          languages: ['English'],
          category: 'Dawah',
          tags: ['Dawah', 'Debates', 'Discussions'],
          streamType: 'external'
        },
        {
          name: 'Mufti Menk',
          youtubeChannel: 'https://www.youtube.com/@muftimenk',
          websiteUrl: 'https://muftimenk.com',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://muftimenk.com/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_qS3rQ4hL8zQJ1dF3sI2jK0oE9sR7Q5N9M8I=s176-c-k-c0x00ffffff-no-rj',
          description: 'Inspirational Islamic lectures and guidance by Mufti Ismail Menk, covering various aspects of Islamic life.',
          languages: ['English', 'Arabic'],
          category: 'Educational',
          tags: ['Lectures', 'Inspiration', 'Mufti Menk'],
          streamType: 'external'
        },
        {
          name: 'Omar Suleiman',
          youtubeChannel: 'https://www.youtube.com/@omarsuleiman',
          websiteUrl: 'https://yaqeeninstitute.org',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://yaqeeninstitute.org/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_rT4sR5hL9AQJ2dF4tI3jK1oF0sR8Q6N0M9J=s176-c-k-c0x00ffffff-no-rj',
          description: 'Islamic lectures and educational content by Imam Omar Suleiman, focusing on contemporary Islamic issues.',
          languages: ['English'],
          category: 'Educational',
          tags: ['Lectures', 'Issues', 'Omar Suleiman'],
          streamType: 'external'
        },
        {
          name: 'Al-Majd TV',
          youtubeChannel: 'https://www.youtube.com/@AlMajdTV',
          websiteUrl: 'https://almajd.tv',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://almajd.tv/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_sU5tS6hM0BQJ3dF5uI4jK2oF1sR9Q7N1M0K=s176-c-k-c0x00ffffff-no-rj',
          description: 'Saudi Arabian Islamic channel offering religious programs, Quranic recitations, and Islamic documentaries.',
          languages: ['Arabic'],
          category: 'General',
          tags: ['Programs', 'Quran', 'Documentaries'],
          streamType: 'external'
        },
        {
          name: 'Digital Mimbar',
          youtubeChannel: 'https://www.youtube.com/@DigitalMimbar',
          websiteUrl: 'https://digitalmimbar.com',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://digitalmimbar.com/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_tV6uT7hM1CQJ4dF6vI5jK3oF2sR0Q8N2M1L=s176-c-k-c0x00ffffff-no-rj',
          description: 'Modern Islamic content platform providing digital Islamic education and spiritual guidance.',
          languages: ['English'],
          category: 'Educational',
          tags: ['Digital', 'Education', 'Guidance'],
          streamType: 'external'
        },
        {
          name: 'Quran Weekly',
          youtubeChannel: 'https://www.youtube.com/@QuranWeekly',
          websiteUrl: 'https://quranweekly.com',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://quranweekly.com/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_uW7vU8hM2DQJ5dF7wI6jK4oF3sR1Q9N3M2M=s176-c-k-c0x00ffffff-no-rj',
          description: 'Weekly Quranic reflections and Islamic educational content featuring various Islamic scholars.',
          languages: ['English'],
          category: 'Quran',
          tags: ['Quran', 'Reflections', 'Scholars'],
          streamType: 'external'
        },
        {
          name: 'Al-Fajr TV',
          youtubeChannel: 'https://www.youtube.com/@AlFajrTV',
          websiteUrl: 'https://alfajrtv.com',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://alfajrtv.com/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_vX8wV9hM3EQJ6dF8xI7jK5oF4sR2Q0N4M3N=s176-c-k-c0x00ffffff-no-rj',
          description: 'Egyptian Islamic channel providing religious education, live prayers, and Islamic cultural programming.',
          languages: ['Arabic'],
          category: 'General',
          tags: ['Prayers', 'Culture', 'Education'],
          streamType: 'external'
        },
        {
          name: 'Islamic Finder',
          youtubeChannel: 'https://www.youtube.com/@IslamicFinder',
          websiteUrl: 'https://islamicfinder.org',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://islamicfinder.org/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_wY9xW0hM4FQJ7dF9yI8jK6oF5sR3Q1N5M4O=s176-c-k-c0x00ffffff-no-rj',
          description: 'Comprehensive Islamic resource providing prayer times, Qibla direction, and Islamic educational content.',
          languages: ['English', 'Arabic', 'Urdu'],
          category: 'Educational',
          tags: ['Prayer Times', 'Qibla', 'Education'],
          streamType: 'external'
        },
        {
          name: 'Islam Net',
          youtubeChannel: 'https://www.youtube.com/@IslamNet',
          websiteUrl: 'https://islamnet.no',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://islamnet.no/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_xZ0yX1hM5GQJ8dF0zI9jK7oF6sR4Q2N6M5P=s176-c-k-c0x00ffffff-no-rj',
          description: 'Norwegian Islamic organization providing Islamic education, lectures, and community content.',
          languages: ['English', 'Norwegian', 'Arabic'],
          category: 'Educational',
          tags: ['Community', 'Lectures', 'Education'],
          streamType: 'external'
        },
        {
          name: 'Al-Hayat TV',
          youtubeChannel: 'https://www.youtube.com/@AlHayatTV',
          websiteUrl: 'https://alhayat-tv.net',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://alhayat-tv.net/live',
          thumbnail: 'https://yt3.googleusercontent.com/ytc/AIdro_yA1zY2hM6HQJ9dF1AI0jK8oF7sR5Q3N7M6Q=s176-c-k-c0x00ffffff-no-rj',
          description: 'Arabic Islamic channel focusing on Islamic lifestyle, family values, and religious education.',
          languages: ['Arabic'],
          category: 'Family & Lifestyle',
          tags: ['Lifestyle', 'Family', 'Education'],
          streamType: 'external'
        },
        {
          name: 'Seekers Guidance',
          youtubeChannel: 'https://www.youtube.com/@SeekersGuidance',
          websiteUrl: 'https://seekersguidance.org',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://seekersguidance.org/live',
          thumbnail: 'https://yt3.ggpht.com/ytc/AIdro_zB2aZ3hM7IQK0dF2BI1jK9oF8sR6Q4N8M7R=s176-c-k-c0x00ffffff-no-rj',
          description: 'Islamic education platform offering courses, lectures, and guidance on Islamic sciences and spirituality.',
          languages: ['English', 'Arabic'],
          category: 'Educational',
          tags: ['Courses', 'Spirituality', 'Lectures'],
          streamType: 'external'
        },
        {
          name: 'Al-Azhar TV',
          youtubeChannel: 'https://www.youtube.com/@AlAzharTV',
          websiteUrl: 'https://alazhar.gov.eg',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL9F2D3E7A8B9C1D2F',
          liveTvUrl: 'https://alazhar.gov.eg/live',
          thumbnail: 'https://yt3.ggpht.com/ytc/AIdro_AC3bA4hM8JQK1dF3CI2jK0oF9sR7Q5N9M8S=s176-c-k-c0x00ffffff-no-rj',
          description: 'Official channel of Al-Azhar University, featuring authentic Islamic teachings and scholarly discussions.',
          languages: ['Arabic'],
          category: 'Educational',
          tags: ['Al-Azhar', 'Teachings', 'Scholarly'],
          streamType: 'external'
        },
        {
          name: 'Muslim Central',
          youtubeChannel: 'https://www.youtube.com/@MuslimCentral',
          websiteUrl: 'https://muslimcentral.com',
          playlistUrl: 'https://www.youtube.com/playlist?list=PL7F2A442E7E97F7A3',
          liveTvUrl: 'https://muslimcentral.com/live',
          thumbnail: 'https://yt3.ggpht.com/ytc/AIdro_BD4cB5hM9KQK2dF4DI3jK1oG0sR8Q6N0M9T=s176-c-k-c0x00ffffff-no-rj',
          description: 'Comprehensive Islamic audio and video library featuring lectures by renowned Islamic scholars worldwide.',
          languages: ['English'],
          category: 'Educational',
          tags: ['Lectures', 'Library', 'Scholars'],
          streamType: 'external'
        }
      ],
      geoQualityMap: ['US', 'CA', 'DE', 'SA', 'AE', 'UK', 'FR']
    }
  },
  computed: {
    filteredChannels() {
      let filtered = this.channels;
      
      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter(channel =>
          channel.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      // Filter by category
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(channel => channel.category === this.selectedCategory);
      }
      
      // Filter by language
      if (this.selectedLanguage !== 'all') {
        filtered = filtered.filter(channel => channel.languages.includes(this.selectedLanguage));
      }
      
      // Filter by tag
      if (this.selectedTag !== 'all') {
        filtered = filtered.filter(channel => channel.tags.includes(this.selectedTag));
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
    }
  },
  watch: {
    currentPage() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    filteredChannels() {
      // Reset to first page when filters change
      this.currentPage = 1;
    }
  },
  mounted() {
    // Fetch user country
    fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then(data => {
        this.userCountry = data.country_code;
      })
      .catch(() => {
        this.userCountry = '';
      });

    // Add keyboard navigation
    document.addEventListener('keydown', this.handleKeyboard);
  },
  beforeUnmount() {
    // Cleanup HLS instance
    if (this.hlsInstance) {
      this.hlsInstance.destroy();
      this.hlsInstance = null;
    }
    // Remove keyboard listener
    document.removeEventListener('keydown', this.handleKeyboard);
  },
  methods: {
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

        // Cleanup existing HLS instance
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
    toggleFavorite(channel) {
      const index = this.favorites.findIndex(fav => fav.name === channel.name);
      if (index === -1) {
        this.favorites.push(channel);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem('favoriteChannels', JSON.stringify(this.favorites));
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
      // Debounce search to improve performance
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
body {
  background-color: #f8f9fa;
  font-family: 'Inter', sans-serif;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  background-color: #fff;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card:focus {
  outline: 2px solid #00bfa6;
  outline-offset: 2px;
}

.mini-screen {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  z-index: 10000;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.btn-primary {
  background-color: #00bfa6;
  border-color: #00bfa6;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #00a58e;
  border-color: #00a58e;
}

.form-control, .form-select {
  border: 1px solid #dee2e6;
  transition: border-color 0.3s ease;
}

.form-control:focus, .form-select:focus {
  border-color: #00bfa6;
  box-shadow: 0 0 0 0.2rem rgba(0, 191, 166, 0.25);
}

.modal-content {
  border: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

@media (max-width: 576px) {
  h1 {
    font-size: 1.8rem;
  }

  .card-body {
    padding: 1rem;
  }

  .card img {
    height: 150px;
  }

  .mini-screen {
    width: 200px;
  }
}
</style>