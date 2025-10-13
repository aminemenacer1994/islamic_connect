<template>
  <div class="container py-4">
    <!-- Header Section -->
    <div>
      <h1 class="display-4 fw-bold text-center">Islamic Podcasts</h1>
      <p class="text-center container mb-4 lead">
        Explore and discover the latest Islamic podcasts offering a diverse range of insightful discussions,
        thought-provoking reflections, and inspiring content. These podcasts cover various topics designed to deepen
        your understanding of Islam.
      </p>
    </div>

    <!-- Podcast Selection Section -->
    <div class="selection-section">
      <div class="section-header">
        <h2 class="section-title">Choose Your Podcast</h2>
        <p class="section-subtitle">Click on any podcast below to start listening</p>
      </div>
      <div class="podcast-selection-grid">
        <div v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" class="podcast-selection-item"
          @click="selectPodcast(podcast)">
          <div class="podcast-image-wrapper">
            <img :src="podcast.image" :alt="podcast.name" class="podcast-selection-image" loading="lazy">
            <div class="podcast-overlay">
              <i class="bi bi-play-circle-fill"></i>
              <span class="play-text">Click to Select</span>
            </div>
          </div>
          <h5 class="podcast-selection-name fw-bold">{{ podcast.name }}</h5>
        </div>
      </div>
    </div>

    <!-- Selected Podcast Details -->
    <div class="selected-podcast-section" v-if="selectedPodcast" ref="podcastDetailSection">
      <div class="section-header">
        <h2 class="section-title">Now Playing</h2>
        <p class="section-subtitle">Episodes from {{ selectedPodcast.name }}</p>
      </div>
      <div class="selected-podcast-header">
        <div class="selected-podcast-info">
          <h3 class="selected-podcast-title">{{ selectedPodcast.name }}</h3>
          <div class="selected-podcast-meta">
            <span class="episode-count">
              <i class="bi bi-collection-play"></i>
              {{ selectedPodcast.episodeCount > 0 ? selectedPodcast.episodeCount : 'Data not available' }} Episodes
              Available
            </span>
          </div>
        </div>
        <div class="selected-podcast-image-container">
          <img :src="selectedPodcast.image" :alt="selectedPodcast.name" class="selected-podcast-image" loading="lazy">
        </div>
      </div>
      <div class="selected-podcast-description">
        <p>{{ selectedPodcast.desc }}</p>
      </div>
    </div>

    <!-- Continue Listening Section -->
    <div v-if="selectedPodcast && continueListening.length" class="continue-listening-section">
      <div class="section-header">
        <h2 class="section-title">Continue Listening</h2>
        <p class="section-subtitle">Pick up where you left off</p>
      </div>
      <div class="podcast-cards-grid border-md" style="padding: 5px;">
        <div v-for="(item, idx) in continueListening" :key="item.title" class="podcast-card-wrapper">
          <div class="podcast-card" style="padding: 1.2rem;">
            <div class="card-body">
              <div class="podcast-card-top">
                <img v-if="selectedPodcast && selectedPodcast.image" :src="selectedPodcast.image" :alt="selectedPodcast.name" class="episode-avatar" loading="lazy" />
                <div class="podcast-card-info">
                  <h4 class="podcast-title">{{ item.title }}</h4>
                  <div class="podcast-extra-info">
                    <span class="duration-badge">
                      <i class="bi bi-clock" style="font-size:1.1rem;"></i>
                      {{ formatTime(item.savedTime) }} / {{ formatTime(item.duration || 0) }}
                    </span>
                  </div>
                </div>
                <div class="audio-controls-inline">
                  <button class="control-button play-btn" @click="resumeFromSaved(item)" aria-label="Resume">
                    <i class="bi bi-play-fill" style="font-size:1.5rem; cursor:pointer;"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Favorites Section -->
    <div v-if="favourites && favourites.length" class="favorites-section">
      <div class="section-header">
        <h2 class="section-title">Your Favorites</h2>
        <p class="section-subtitle">Quick access to episodes you loved</p>
      </div>
      <div>
    <button 
      class="toggle-button" 
      @click="toggleVisibility" 
      style="margin-bottom: 10px; padding: 8px 16px; cursor: pointer;"
    >
      {{ isVisible ? 'Hide Favourites' : 'Show Favourites' }}
    </button>
    <div v-if="isVisible" class="podcast-cards-grid border-md" style="padding: 5px;">
      <div v-for="fav in favourites" :key="fav.title + fav.audioUrl" class="podcast-card-wrapper">
        <div :class="['podcast-card', { 'highlighted': isCurrentlyPlaying(fav) }]" style="padding: 1.2rem;">
          <div class="card-body">
            <div class="podcast-card-top">
              <img v-if="selectedPodcast && selectedPodcast.image" :src="selectedPodcast.image" :alt="selectedPodcast.name" class="episode-avatar" loading="lazy" />
              <div class="podcast-card-info">
                <h4 class="podcast-title">{{ fav.title }}</h4>
                <div class="podcast-extra-info">
                  <span class="lang-badge" :title="'Published'">
                    <i class="bi bi-calendar3" style="font-size:1.1rem;"></i>
                    {{ formatDate(fav.pubDate) }}
                  </span>
                  <span v-if="fav.likedAt" class="lang-badge" :title="'Liked on'" style="margin-left:8px;">
                    <i class="bi bi-heart-fill" style="font-size:1.1rem;"></i>
                    {{ new Date(fav.likedAt).toLocaleString() }}
                  </span>
                </div>
              </div>
              <div class="audio-controls-inline">
                <button class="control-button play-btn" @click="playFromFavourites(fav)" title="Play">
                  <i class="bi bi-play-fill" style="font-size:1.5rem; cursor:pointer;"></i>
                </button>
                <button class="control-button" @click="toggleFavourite(fav)" title="Remove from favorites">
                  <i class="bi bi-heart-fill text-danger" style="font-size:1.3rem;"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>

    <!-- Recently Played Section -->
    <div v-if="recentPlays && recentPlays.length" class="recently-played-section">
      <div class="section-header">
        <h2 class="section-title">Recently Played</h2>
        <p class="section-subtitle">Your recent listening history</p>
      </div>
      <div class="podcast-cards-grid border-md" style="padding: 5px;">
        <div v-for="rp in recentPlays" :key="rp.title + rp.audioUrl + rp.playedAt" class="podcast-card-wrapper">
          <div :class="['podcast-card', { 'highlighted': isCurrentlyPlaying(rp) }]" style="padding: 1.2rem;">
            <div class="card-body">
              <div class="podcast-card-top">
                <img v-if="selectedPodcast && selectedPodcast.image" :src="selectedPodcast.image" :alt="selectedPodcast.name" class="episode-avatar" loading="lazy" />
                <div class="podcast-card-info">
                  <h4 class="podcast-title">{{ rp.title }}</h4>
                  <div class="podcast-extra-info">
                    <span class="lang-badge" :title="'Played at'">
                      <i class="bi bi-clock" style="font-size:1.1rem;"></i>
                      {{ new Date(rp.playedAt).toLocaleString() }}
                    </span>
                  </div>
                </div>
                <div class="audio-controls-inline">
                  <button class="control-button play-btn" @click="playFromHistory(rp)" title="Play">
                    <i class="bi bi-play-fill" style="font-size:1.5rem; cursor:pointer;"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Podcast Episodes Section -->
    <div v-if="!loading && visiblePodcasts.length" class="episodes-section">
      <div class="section-header">
        <h2 class="section-title">Available Episodes</h2>
        <p class="section-subtitle">Click the play button to start listening</p>
      </div>
      <div v-if="fetchError" class="alert alert-danger" role="alert">
        {{ fetchError }}
      </div>
      <div class="episodes-filters-bar-wrapper">
        <div class="row g-3">
          <div class="col-12 col-md-3">
            <div class="input-group search-group">
              <span class="input-group-text bg-white border-end-0"><i class="bi bi-search"></i></span>
              <input v-model="searchInput" @input="onSearchInput" type="text" class="form-control border-start-0"
                placeholder="Search episodes..." />
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="input-group filter-group">
              <span class="input-group-text bg-white border-end-0"><i class="bi bi-hourglass-split"></i></span>
              <select v-model="durationFilter" class="form-select border-start-0">
                <option value="" disabled selected hidden>Select Duration</option>
                <option value="0-10">0-10 min</option>
                <option value="10-30">10-30 min</option>
                <option value="30-60">30-60 min</option>
                <option value="more-than-60">60+ min</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="input-group filter-group">
              <span class="input-group-text bg-white border-end-0"><i class="bi bi-translate"></i></span>
              <select v-model="languageFilter" class="form-select border-start-0">
                <option value="">All Languages</option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="input-group filter-group">
              <span class="input-group-text bg-white border-end-0"><i class="bi bi-funnel"></i></span>
              <select v-model="sortOption" class="form-select border-start-0">
                <option value="mostViewed">Most Viewed</option>
                <option value="leastViewed">Least Viewed</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <p class="loading-text">Loading episodes, please wait...</p>
        <p class="loading-subtext">This may take a few moments</p>
      </div>
      <div v-else class="podcast-cards-grid border-md" style="padding: 5px;">
        <div v-for="(podcast, index) in visiblePodcasts" :key="podcast.title" class="podcast-card-wrapper">
          <div :class="['podcast-card', { 'highlighted': playingIndex === index }]" style="padding: 1.2rem;">
            <div class="card-header">
              <div class="podcast-meta">
                <div class="views-badge" :title="'Views'">
                  <i class="bi bi-eye-fill" style="font-size:1.2rem;"></i>
                  <span class="meta-text">{{ podcast.views }} views</span>
                </div>
                <div class="date-badge" :title="'Published date'">
                  <i class="bi bi-calendar3" style="font-size:1.2rem;"></i>
                  <span class="meta-text">{{ formatDate(podcast.pubDate) }}</span>
                  <span v-if="isNewEpisode(podcast.pubDate)" class="new-badge" aria-label="New episode">NEW</span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="podcast-card-top">
                <img v-if="selectedPodcast && selectedPodcast.image" :src="selectedPodcast.image"
                  :alt="selectedPodcast.name" class="episode-avatar podcast-image-clickable"
                  decoding="async" fetchpriority="low"
                  @click="scrollToFirstEpisode" style="cursor:pointer;" loading="lazy" />
                <div class="podcast-card-info">
                  <h4 class="podcast-title" v-html="highlightText(podcast.title)"></h4>
                  <div class="podcast-extra-info">
                    <!-- <span class="duration-badge" :title="'Duration'">
                      <i class="bi bi-clock" style="font-size:1.1rem;"></i>
                      {{ podcast.duration ? podcast.duration + ' min' : 'N/A' }}
                    </span> -->
                    <span class="lang-badge" :title="'Language'">
                      <i class="bi bi-translate" style="font-size:1.1rem;"></i>
                      {{ podcast.language }}
                    </span>
                  </div>

                </div>
                <div class="audio-controls-inline">
                  <button class="control-button play-btn" @click="toggleAudioPlayer(index)"
                    :class="{ 'playing': isAudioPlaying[index] }"
                    :aria-label="isAudioPlaying[index] ? 'Pause' : 'Play'">
                    <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-fill' : 'bi-play-fill'" style="font-size:1.5rem; cursor:pointer;"></i>
                  </button>
                <button class="control-button" :aria-pressed="isFavourite(podcast) ? 'true' : 'false'" :title="isFavourite(podcast) ? 'Unfavorite' : 'Favorite'" :aria-label="isFavourite(podcast) ? 'Unfavorite' : 'Favorite'" @click.stop="toggleFavourite(podcast)">
                  <i class="bi" :class="isFavourite(podcast) ? 'bi-heart-fill text-danger' : 'bi-heart'" style="font-size:1.3rem;"></i>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Infinite scroll sentinel -->
      <div ref="infiniteScrollTrigger" style="height: 1px;"></div>
      <div v-if="isLoadingMore" class="loading-container" style="margin-top:8px;">
        <div class="spinner-border text-success" role="status" style="width: 1.5rem; height: 1.5rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else-if="!loading && !visiblePodcasts.length" class="empty-state">
      <div class="empty-state-content text-center mb-2">
        <i class="bi bi-headphones empty-state-icon"></i>
        <h3 class="empty-state-title">No Episodes Found</h3>
        <p class="empty-state-description">Try selecting a different podcast or check back later for new episodes.</p>
        <button class="empty-state-button btn btn-success text-white mb-2" @click="selectedPodcast = null">
          <i class="bi bi-arrow-left"></i>
          <span>Choose Another Podcast</span>
        </button>
      </div>
    </div>

    <!-- Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container">
      <div class="custom-audio-player" :class="{ minimized: isPlayerMinimized }">
        <div class="controls">
          <div class="control-group">
            <button @click="rewindAudio(currentlyPlayingIndex)" class="control-btn" title="Rewind 15 seconds" aria-label="Rewind 15 seconds">
              <i class="bi bi-skip-backward-fill"></i>
            </button>
            <button @click="toggleAudioPlayer(currentlyPlayingIndex)" class="control-btn play-pause" :aria-pressed="!!isAudioPlaying[currentlyPlayingIndex]" :aria-label="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'" :title="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'">
              <i v-if="isAudioPlaying[currentlyPlayingIndex]" class="bi bi-pause-fill" aria-hidden="true"></i>
              <i v-else class="bi bi-play-fill" aria-hidden="true"></i>
            </button>
            <button @click="fastForwardAudio(currentlyPlayingIndex)" class="control-btn" title="Forward 20 seconds" aria-label="Forward 20 seconds">
              <i class="bi bi-skip-forward-fill"></i>
            </button>
            <button @click="stopAudio(currentlyPlayingIndex)" class="control-btn" title="Stop" aria-label="Stop">
              <i class="bi bi-stop-fill"></i>
            </button>

          </div>
          <div class="info-section" aria-live="polite">
            <span class="time">{{ formatTime(audioElements[currentlyPlayingIndex]?.currentTime || 0) }} / {{ formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
            <span class="episode-title" v-if="visiblePodcasts[currentlyPlayingIndex]">• {{ visiblePodcasts[currentlyPlayingIndex].title }}</span>
          </div>
          <div class="audio-actions" style="display: flex; align-items: center; gap: 18px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <button @click="toggleVolume" class="control-btn" title="Volume" :aria-expanded="showVolumeBar ? 'true' : 'false'" aria-controls="player-volume">
                <i class="bi" :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`"></i>
              </button>
              <input v-if="showVolumeBar" id="player-volume" type="range" min="0" max="1" step="0.01" v-model.number="volume"
                @input="updateVolume" class="volume-slider" style="width: 80px;" aria-label="Volume" />
              </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <label for="speedSelect" class="visually-hidden">Speed</label>
              <select id="speedSelect" v-model.number="playbackSpeed" @change="updatePlaybackSpeed" class="form-select form-select-sm" style="width: 90px;">
                <option :value="0.75">0.75x</option>
                <option :value="1">1x</option>
                <option :value="1.25">1.25x</option>
                <option :value="1.5">1.5x</option>
                <option :value="2">2x</option>
              </select>
            </div>
            
            <button @click="closeAudioPlayer" class="control-btn close-btn" title="Close">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

        </div>
        <div class="progress-bar" @mousedown="startSeek" @click="seekAudio">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatBot from './translation/ChatBot.vue';

export default {
  components: {
    ChatBot
  },
  data() {
    return {
      isVisible: true,
      showAudioPlayer: false,
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
      // error state for fetch failures
      fetchError: null,
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
      loading: true,
      rssUrl: 'https://themadmamluks.libsyn.com/rss',
      searchQuery: '',
      searchInput: '',
      searchDebounceTimer: null,
      // Infinite scroll state
      itemsPerLoad: 8,
      visibleCount: 0,
      isLoadingMore: false,
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
      recentPlays: JSON.parse(localStorage.getItem('recentPlays') || '[]'),
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
      isPlayerMinimized: false,
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
    }
  },

  mounted() {
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

    // Restore last selected podcast
    try {
      const savedPodcast = localStorage.getItem(this.lastSelectedPodcastKey);
      if (savedPodcast) {
        const parsed = JSON.parse(savedPodcast);
        if (parsed && parsed.rssUrl) this.selectedPodcast = parsed;
      }
    } catch (e) {}

    // Build Continue Listening list from localStorage for current selection
    this.buildContinueListening();

    // Prune recent plays to last 50
    if (Array.isArray(this.recentPlays) && this.recentPlays.length > 50) {
      this.recentPlays = this.recentPlays.slice(0, 50);
      try { localStorage.setItem('recentPlays', JSON.stringify(this.recentPlays)); } catch (e) {}
    }
  },

  beforeUnmount() {
    // Remove keyboard event listener and disconnect observer
    document.removeEventListener('keydown', this.handleKeydown);
    try { this._infiniteObserver && this._infiniteObserver.disconnect && this._infiniteObserver.disconnect(); } catch (e) {}
  },

  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
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
      fetch(podcast.audioUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = podcast.title.replace(/\s+/g, "_") + ".mp3";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error("Download failed:", error));
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
    async fetchPodcasts() {
      if (!this.selectedPodcast) return;
      this.loading = true;
      this.rssUrl = this.selectedPodcast.rssUrl;
      this.fetchError = null;

      try {
        const response = await fetch(this.rssUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');

        // Store the number of episodes
        this.selectedPodcast.episodeCount = items.length;

        // Process and sort podcasts
        this.podcasts = Array.from(items)
          .map(item => {
            const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || 'Unknown';
            console.log('Raw pubDate:', pubDate); // Log raw value
            return {
              title: item.getElementsByTagName('title')[0]?.textContent || 'No title',
              pubDate,
              description: item.getElementsByTagName('description')[0]?.textContent || 'No description available.',
              audioUrl: item.getElementsByTagName('enclosure')[0]?.getAttribute('url') || null,
              views: Math.floor(Math.random() * 1000),
              duration: Math.floor(Math.random() * 60) + 5,
              language: this.detectLanguage(item.getElementsByTagName('title')[0]?.textContent || '')
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
        console.log('Sorted podcasts:', this.podcasts.map(p => ({ title: p.title, pubDate: p.pubDate })));

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

    applyFilters() {
      let filtered = [...this.podcasts];

      // Apply language filter
      if (this.selectedLanguageFilter) {
        filtered = filtered.filter(podcast => podcast.language === this.selectedLanguageFilter);
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
          const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(podcast.rssUrl)}`);
          const data = await response.json();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data.contents, "text/xml");
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
      const query = this.searchQuery.toLowerCase();
      this.filteredPodcasts = this.podcasts.filter(podcast => podcast.title.toLowerCase().includes(query));
      this.$nextTick(() => this.setupInfiniteScroll());
    },

    highlightText(title) {
      if (!this.searchQuery) return title;
      return title.replace(
        new RegExp(`(${this.searchQuery})`, "gi"),
        `<span style="background-color: rgba(0, 191, 166, 0.6); padding: 4px; border-radius: 5px;">$1</span>`
      );
    },

    toggleBookmark(podcast) {
      const index = this.bookmarks.findIndex(item => item.title === podcast.title);
      if (index > -1) this.bookmarks.splice(index, 1);
      else this.bookmarks.push(podcast);
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
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
      try {
        const entries = [];
        const prefix = 'content_progress_';
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key || !key.startsWith(prefix)) continue;
          const title = key.substring(prefix.length);
          const savedTime = Number(localStorage.getItem(key));
          if (isNaN(savedTime) || savedTime < 5) continue;
          const match = this.podcasts.find(p => p.title === title) || this.filteredPodcasts.find(p => p.title === title);
          entries.push({ title, savedTime, duration: match?.duration || 0 });
        }
        // Sort by most recent progress (approx by storage order not guaranteed) then limit
        this.continueListening = entries.slice(0, 6);
      } catch (e) { this.continueListening = []; }
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
            const key = `content_progress_${podcast?.title}`;
            localStorage.setItem(key, String(audio.currentTime || 0));
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
        const key = `content_progress_${podcast.title}`;
        const saved = Number(localStorage.getItem(key));
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
      const exists = this.isFavourite(podcast);
      if (exists) {
        this.favourites = this.favourites.filter(f => !(f.title === podcast.title && f.audioUrl === podcast.audioUrl));
      } else {
        this.favourites = [{ title: podcast.title, audioUrl: podcast.audioUrl, pubDate: podcast.pubDate, views: podcast.views, likedAt: Date.now() }, ...this.favourites].slice(0, 100);
      }
      try { localStorage.setItem('favourites', JSON.stringify(this.favourites)); } catch (e) {}
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

  mounted() {
    this.fetchPodcasts().then(() => {
      this.applyFilters();
      this.fetchEpisodeCounts();
      this.$nextTick(() => {
        this.visibleCount = Math.min(this.itemsPerLoad, this.filteredAndSearchedPodcasts.length || 0);
        this.setupInfiniteScroll();
      });
    });
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
</script>

<style scoped>
.toggle-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.toggle-button:hover {
  background-color: #e0e0e0;
}
.audio-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.volume-slider {
  accent-color: #0db691;
  vertical-align: middle;
}

.podcast-card-wrapper {
  padding: 10px;
}

/* Main Layout Styles */
.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 1rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.main-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #0db6a1 0%, #00d4aa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.main-description {
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #495057;
  max-width: 900px;
  margin: 0 auto;
  font-weight: 400;
}

/* Section Headers */
.selection-section,
.episodes-section {
  margin-bottom: 3rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 0 1rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
}

/* Podcast Selection Grid */
.podcast-selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Mobile-specific 2-column grid for screens smaller than 768px */
@media (max-width: 767.98px) {
  .podcast-selection-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.podcast-selection-item {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 20px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  position: relative;
}

.podcast-selection-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(13, 182, 145, 0.2);
  border-color: #0db6a1;
}

.podcast-selection-item:active {
  transform: translateY(-4px);
}

.podcast-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
}

.podcast-selection-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.podcast-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(13, 182, 145, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  gap: 0.5rem;
}

.podcast-overlay i {
  font-size: 3.5rem;
  color: white;
}

.play-text {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
}

.podcast-selection-item:hover .podcast-overlay {
  opacity: 1;
}

.podcast-selection-item:hover .podcast-selection-image {
  transform: scale(1.1);
}

.podcast-selection-name {
  padding: 1.5rem;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 300;
  color: #2c3e50;
  text-align: center;
  line-height: 1.4;
  background: #ffffff;
}

/* Selected Podcast Section */
.selected-podcast-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  border: 2px solid rgba(13, 182, 145, 0.1);
}

.selected-podcast-header {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

.selected-podcast-info {
  flex: 1;
}

.selected-podcast-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.selected-podcast-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.episode-count {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(13, 182, 145, 0.15);
  border-radius: 30px;
  color: #0db6a1;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid rgba(13, 182, 145, 0.2);
}

.episode-count i {
  font-size: 1.2rem;
}

.selected-podcast-image-container {
  flex-shrink: 0;
}

.selected-podcast-image {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 3px solid #ffffff;
}

.selected-podcast-description {
  color: #495057;
  line-height: 1.8;
  font-size: 1.1rem;
  font-weight: 400;
}

.selected-podcast-description p {
  margin: 0;
}

/* Enhanced Card Styles */
.highlighted {
  box-shadow: 0 0 0 4px rgba(13, 182, 145, 0.3), 0 15px 40px rgba(13, 182, 145, 0.25);
  transform: translateY(-3px);
  background: linear-gradient(135deg, #ffffff 0%, #f0fffd 100%);
}

.podcast-card {
  background: #ffffff;
  border-radius: 35px;
  box-shadow: 0 0 16px 4px rgba(13, 182, 145, 0.18);
  border: 5px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 100%;
  position: relative;
  padding: 2rem 1.5rem;
  /* Performance hints for large lists */
  content-visibility: auto;
  contain-intrinsic-size: 320px 1px;
  will-change: transform;
}

.podcast-card:hover {
  transform: none;
  box-shadow: none;
}

.podcast-card.highlighted {
  border-color: #0db6a1;
  background: linear-gradient(135deg, #f2fffc 0%, #e6fcf7 100%);
  border-width: 2.5px;
  outline: 2px solid #0db6a1;
  box-shadow: 0 8px 32px 0 rgba(13, 182, 145, 0.10), 0 1.5px 8px 0 rgba(0, 0, 0, 0.06);
  z-index: 2;
}

.podcast-card.highlighted::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  pointer-events: none;
  box-shadow: 0 0 16px 4px rgba(13, 182, 145, 0.18);
  animation: playing-glow 1.5s infinite alternate;
}

@keyframes playing-glow {
  0% {
    box-shadow: 0 0 8px 2px rgba(13, 182, 145, 0.10);
  }

  100% {
    box-shadow: 0 0 24px 8px rgba(13, 182, 145, 0.22);
  }
}

/* Card Header */
.podcast-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.views-badge,
.date-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.views-badge i,
.date-badge i {
  font-size: 1rem;
  color: #0db6a1;
}

/* Card Body */
.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.podcast-title {
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.4;
  color: #2c3e50;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3.6rem;
}

.meta-text {
  font-size: 0.98rem;
  font-weight: 500;
  color: #6c757d;
}

/* Audio Controls */
.audio-controls {
  display: none !important;
}

.control-button {
  background: none;
  border: none;
  padding: 16px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 60px;
  min-height: 60px;
  gap: 12px;
}

.control-button:hover {
  background: rgba(13, 182, 145, 0.1);
  transform: scale(1.05);
}

.control-button i {
  font-size: 1.8rem;
  color: #495057;
  transition: color 0.2s ease;
}

.control-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6c757d;
  text-align: center;
  line-height: 1.2;
}

.rewind-btn,
.forward-btn {
  background: rgba(108, 117, 125, 0.1);
  border: 2px solid rgba(108, 117, 125, 0.1);
}

.rewind-btn:hover,
.forward-btn:hover {
  background: rgba(13, 182, 145, 0.15);
  border-color: rgba(13, 182, 145, 0.2);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(13, 182, 145, 0.1);
  border: 2px solid rgba(13, 182, 145, 0.2);
  border-radius: 30px;
  color: #0db6a1;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  min-height: 48px;
}

.action-button:hover {
  background: rgba(13, 182, 145, 0.15);
  border-color: rgba(13, 182, 145, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(13, 182, 145, 0.25);
}

.action-button i {
  font-size: 1.1rem;
}

.share-btn {
  background: rgba(25, 135, 84, 0.1);
  border-color: rgba(25, 135, 84, 0.2);
  color: #198754;
}

.share-btn:hover {
  background: rgba(25, 135, 84, 0.15);
  border-color: rgba(25, 135, 84, 0.3);
  box-shadow: 0 6px 16px rgba(25, 135, 84, 0.25);
}

/* Enhanced Responsive Design for Cards */
@media (min-width: 769px) and (max-width: 1024px) {
  .pagination-btn {
    padding: 0.7rem 1.1rem;
    font-size: 0.9rem;
    min-width: 95px;
  }

  .page-number {
    width: 42px;
    height: 42px;
    font-size: 0.9rem;
    min-width: 42px;
    min-height: 42px;
  }
}

/* Focus states for accessibility */
.pagination-btn:focus,
.page-number:focus {
  outline: 2px solid #0db6a1;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .pagination-btn {
    border: 2px solid #0db6a1;
  }

  .page-number {
    border-width: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

  .pagination-btn,
  .page-number {
    transition: none;
  }

  .pagination-btn:hover:not(.disabled),
  .page-number:hover:not(.active) {
    transform: none;
  }
}

/* Audio Player Styles */
.audio-player-container {
  border-radius: 12px 12px 0 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #2c2c2c;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 8px 12px;
}

.custom-audio-player {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px;
  color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-section {
  align-items: center;
  gap: 12px;
  flex-grow: 1;
  justify-content: center;
}

.control-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.play-pause {
  font-size: 1.5rem;
  padding: 6px;
  width: 40px;
  height: 40px;
}

.time {
  font-size: 0.9rem;
  font-weight: 500;
  color: #ccc;
  min-width: 70px;
  text-align: center;
  white-space: nowrap;
}

.title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #ccc;
  min-width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.close-btn {
  font-size: 1.2rem;
  padding: 6px;
  width: 36px;
  height: 36px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #555;
  cursor: pointer;
  position: relative;
  margin: 4px 0;
}

.progress {
  height: 100%;
  background: #00ffcc;
  position: absolute;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .custom-audio-player {
    padding: 6px;
  }

  .controls {
    gap: 8px;
  }

  .control-group {
    gap: 8px;
  }

  .info-section {
    gap: 8px;
  }

  .control-btn {
    font-size: 1.1rem;
    width: 32px;
    height: 32px;
  }

  .play-pause {
    font-size: 1.3rem;
    width: 36px;
    height: 36px;
  }

  .time {
    font-size: 0.85rem;
    min-width: 60px;
  }

  .episode-title {
    font-size: 0.85rem;
    min-width: 80px;
  }

  .close-btn {
    font-size: 1.1rem;
    width: 32px;
    height: 32px;
  }

  .progress-bar {
    height: 3px;
  }
}

@media (max-width: 768px) {
  .audio-player-container {
    padding: 6px 8px;
  }

  .controls {
    gap: 6px;
    justify-content: flex-start;
  }

  .info-section {
    flex-grow: 0;
    order: 1;
  }

  .control-btn {
    font-size: 1rem;
    width: 30px;
    height: 30px;
  }

  .play-pause {
    font-size: 1.2rem;
    width: 34px;
    height: 34px;
  }

  .time {
    font-size: 0.8rem;
    min-width: 50px;
  }

  .episode-title {
    display: none; /* Hide title on mobile */
  }

  .close-btn {
    order: 2;
    font-size: 1rem;
    width: 30px;
    height: 30px;
  }

  .progress-bar {
    height: 3px;
  }
}

@media (max-width: 576px) {
  .audio-player-container {
    padding: 4px 6px;
  }

  .info-section {
    flex-direction: column;
    align-items: flex-start;
    order: 1;
  }

  .control-btn {
    font-size: 0.9rem;
    width: 28px;
    height: 28px;
  }

  .play-pause {
    font-size: 1.1rem;
    width: 32px;
    height: 32px;
  }

  .time {
    font-size: 0.7rem;
    min-width: 40px;
  }

  .episode-title {
    display: none; /* Ensure title remains hidden on smaller screens */
  }

  .close-btn {
    order: 2;
    font-size: 0.9rem;
    width: 28px;
    height: 28px;
  }

  .progress-bar {
    height: 2px;
  }
}

/* Mobile-Friendly Pagination Styles */
.pagination-container {
  margin-top: 2rem;
  padding: 1rem 0;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #0db6a1 0%, #00d4aa 100%);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 100px;
  box-shadow: 0 4px 12px rgba(13, 182, 145, 0.3);
}

.pagination-btn:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(13, 182, 145, 0.4);
  background: linear-gradient(135deg, #00d4aa 0%, #0db6a1 100%);
}

.pagination-btn:active:not(.disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(13, 182, 145, 0.3);
}

.pagination-btn.disabled {
  background: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.6;
}

.pagination-btn i {
  font-size: 1rem;
}

.btn-text {
  font-weight: 600;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.page-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 2px solid #e9ecef;
  background: white;
  color: #6c757d;
  border-radius: 50%;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 44px;
  min-height: 44px;
}

.page-number:hover:not(.active) {
  border-color: #0db6a1;
  color: #0db6a1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(13, 182, 145, 0.2);
}

.page-number.active {
  background: linear-gradient(135deg, #0db6a1 0%, #00d4aa 100%);
  border-color: #0db6a1;
  color: white;
  box-shadow: 0 4px 12px rgba(13, 182, 145, 0.3);
}

.page-number:active:not(.active) {
  transform: translateY(0);
}

.page-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: #6c757d;
  font-weight: 600;
  font-size: 1rem;
  min-width: 44px;
  min-height: 44px;
}

.mobile-page-info {
  text-align: center;
  margin-top: 1rem;
}

.page-info-text {
  color: #6c757d;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: rgba(13, 182, 145, 0.1);
  border-radius: 20px;
  display: inline-block;
}

/* Responsive Design for Pagination */
@media (max-width: 768px) {
  .pagination-wrapper {
    gap: 0.25rem;
    margin-bottom: 0.75rem;
  }

  .pagination-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    min-width: 90px;
    min-height: 40px;
  }

  .pagination-btn i {
    font-size: 0.9rem;
  }

  .page-numbers {
    gap: 0.2rem;
  }

  .page-number {
    width: 40px;
    height: 40px;
    font-size: 0.85rem;
    min-width: 40px;
    min-height: 40px;
  }

  .page-ellipsis {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
    min-width: 40px;
    min-height: 40px;
  }

  .page-info-text {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 576px) {
  .pagination-wrapper {
    flex-direction: column;
    gap: 0.75rem;
  }

  .pagination-btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
    padding: 0.75rem 1rem;
    min-height: 44px;
  }

  .page-numbers {
    order: -1;
    margin-bottom: 0.5rem;
  }

  .page-number {
    width: 36px;
    height: 36px;
    font-size: 0.8rem;
    min-width: 36px;
    min-height: 36px;
  }

  .page-ellipsis {
    width: 36px;
    height: 36px;
    font-size: 0.85rem;
    min-width: 36px;
    min-height: 36px;
  }

  .mobile-page-info {
    margin-top: 0.75rem;
  }

  .page-info-text {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .pagination-btn {
    padding: 0.7rem 1.1rem;
    font-size: 0.9rem;
    min-width: 95px;
  }

  .page-number {
    width: 42px;
    height: 42px;
    font-size: 0.9rem;
    min-width: 42px;
    min-height: 42px;
  }
}

/* Focus states for accessibility */
.pagination-btn:focus,
.page-number:focus {
  outline: 2px solid #0db6a1;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .pagination-btn {
    border: 2px solid #0db6a1;
  }

  .page-number {
    border-width: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

  .pagination-btn,
  .page-number {
    transition: none;
  }

  .pagination-btn:hover:not(.disabled),
  .page-number:hover:not(.active) {
    transform: none;
  }
}

/* Audio Player Styles */
.audio-player-container {
  border-radius: 12px 12px 0 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #2c2c2c;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 8px 12px;
}

.custom-audio-player {
  max-width: 1200px;
  margin: 0 auto;
  padding: 8px;
  color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-section {
  align-items: center;
  gap: 12px;
  flex-grow: 1;
  justify-content: center;
}

.control-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.play-pause {
  font-size: 1.5rem;
  padding: 6px;
  width: 40px;
  height: 40px;
}

.time {
  font-size: 0.9rem;
  font-weight: 500;
  color: #ccc;
  min-width: 70px;
  text-align: center;
  white-space: nowrap;
}

.title {
  font-size: 0.9rem;
  font-weight: 500;
  color: #ccc;
  min-width: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.close-btn {
  font-size: 1.2rem;
  padding: 6px;
  width: 36px;
  height: 36px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #555;
  cursor: pointer;
  position: relative;
  margin: 4px 0;
}

.progress {
  height: 100%;
  background: #00ffcc;
  position: absolute;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .custom-audio-player {
    padding: 6px;
  }

  .controls {
    gap: 8px;
  }

  .control-group {
    gap: 8px;
  }

  .info-section {
    gap: 8px;
  }

  .control-btn {
    font-size: 1.1rem;
    width: 32px;
    height: 32px;
  }

  .play-pause {
    font-size: 1.3rem;
    width: 36px;
    height: 36px;
  }

  .time {
    font-size: 0.85rem;
    min-width: 60px;
  }

  .title {
    font-size: 0.85rem;
    min-width: 80px;
  }

  .close-btn {
    font-size: 1.1rem;
    width: 32px;
    height: 32px;
  }

  .progress-bar {
    height: 3px;
  }
}

@media (max-width: 768px) {
  .audio-player-container {
    padding: 6px 8px;
  }

  .controls {
    gap: 6px;
    justify-content: flex-start;
  }

  .info-section {
    flex-grow: 0;
    order: 1;
  }

  .control-btn {
    font-size: 1rem;
    width: 30px;
    height: 30px;
  }

  .play-pause {
    font-size: 1.2rem;
    width: 34px;
    height: 34px;
  }

  .time {
    font-size: 0.8rem;
    min-width: 50px;
  }

  .title {
    font-size: 0.8rem;
    min-width: 70px;
  }

  .close-btn {
    order: 2;
    font-size: 1rem;
    width: 30px;
    height: 30px;
  }

  .progress-bar {
    height: 3px;
  }
}

@media (max-width: 576px) {
  .audio-player-container {
    padding: 4px 6px;
  }

  .info-section {
    flex-direction: column;
    align-items: flex-start;
    order: 1;
  }

  .control-btn {
    font-size: 0.9rem;
    width: 28px;
    height: 28px;
  }

  .play-pause {
    font-size: 1.1rem;
    width: 32px;
    height: 32px;
  }

  .time {
    font-size: 0.7rem;
    min-width: 40px;
  }

  .title {
    font-size: 0.7rem;
    min-width: 60px;
  }

  .close-btn {
    order: 2;
    font-size: 0.9rem;
    width: 28px;
    height: 28px;
  }

  .progress-bar {
    height: 2px;
  }
}

/* Utility Classes */
.mt-1 {
  margin-top: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}

.mb-1 {
  margin-bottom: 0.25rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.w-100 {
  width: 100%;
}

/* Remove old styles */
.icon-container,
.icon-tooltip,
.icon-text {
  display: none;
}

.card {
  height: 100%;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #333;
}

.mobile-padding {
  padding: 10px;
}

@media (min-width: 768px) {
  .mobile-padding {
    padding: 20px;
  }
  .podcast-card-wrapper {
    width: 100%;
  }
}

@media (max-width: 767.98px) {
  .mobile-padding {
    margin-bottom: 1rem;
  }
  .podcast-card-wrapper {
    width: 100%;
  }
}

.spinner-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.loading-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 1rem;
  text-align: center;
}

.empty-state {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.empty-state-content {
  text-align: center;
  max-width: 400px;
}

.empty-state-icon {
  font-size: 4rem;
  color: #0db6a1;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.empty-state-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.empty-state-description {
  font-size: 1rem;
  color: #6c757d;
  line-height: 1.6;
}

.episode-avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
  box-shadow: none;
  border: 2px solid #e9ecef;
}

.podcast-card-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  justify-content: space-between;
}

.podcast-card-info {
  flex: 1;
}

.podcast-extra-info {
  display: flex;
  gap: 1.2rem;
  margin-top: 0.2rem;
  font-size: 0.98rem;
  color: #6c757d;
}

.duration-badge,
.lang-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 0.95rem;
  font-weight: 500;
}

.new-badge {
  background: #0db6a1;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 2px 8px;
  letter-spacing: 0.5px;
}

.podcast-desc {
  color: #495057;
  font-size: 1.02rem;
  margin: 0.5rem 0 0.7rem 0;
  line-height: 1.5;
  min-height: 2.2em;
}

@media (max-width: 768px) {
  .podcast-extra-info {
    font-size: 0.85rem;
  }

  .podcast-title {
    font-size: 1.2rem;
  }

  .podcast-desc {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .podcast-card-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .podcast-title {
    font-size: 1rem;
  }

  .podcast-desc {
    font-size: 0.8rem;
  }
}

.search-group .form-control,
.filter-group .form-select {
  font-size: 1rem;
  padding: 10px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .search-group .form-control,
  .filter-group .form-select {
    font-size: 0.9rem;
    padding: 8px;
  }
}

.podcast-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-width: 100%;
}

.action-button {
  padding: 10px 20px;
  font-size: 1rem;
  min-height: 44px;
  min-width: 100px;
}

.action-button:hover {
  background: rgba(13, 182, 145, 0.15);
  border-color: rgba(13, 182, 145, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(13, 182, 145, 0.25);
}

.audio-controls-inline {
  display: flex;
  align-items: center;
}

.podcast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.episodes-filters-bar-wrapper {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(13, 182, 145, 0.07);
  padding: 1.2rem 1.5rem 1rem 1.5rem;
  margin-bottom: 2.2rem;
}

.episodes-filters-bar {
  gap: 1.2rem;
}

.input-group-text {
  background: #fff;
  border-radius: 12px 0 0 12px;
  border: 1px solid #e9ecef;
  border-right: none;
  color: #0db6a1;
  font-size: 1.2rem;
}

.search-group .form-control,
.filter-group .form-select {
  border-radius: 0 12px 12px 0;
  border: 1px solid #e9ecef;
  border-left: none;
  background: #fff;
  font-size: 1rem;
}

.filter-group .form-select {
  min-width: 120px;
}

@media (max-width: 900px) {
  .episodes-filters-bar-wrapper {
    padding: 1rem 0.7rem 0.7rem 0.7rem;
  }

  .episodes-filters-bar {
    gap: 0.7rem;
  }
}

@media (max-width: 768px) {
  .episodes-filters-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
  }

  .episodes-filters-bar-wrapper {
    padding: 0.7rem 0.3rem 0.3rem 0.3rem;
  }

  .row.g-3>[class^='col-'] {
    margin-bottom: 0.7rem;
  }
}
</style>
