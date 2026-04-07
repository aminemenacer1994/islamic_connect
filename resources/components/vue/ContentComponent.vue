<template>
  <div class="container py-4 podcast-page" :class="{ 'is-dark': isDarkMode }">
    <!-- Header Section -->
    <div class="row justify-content-center text-center mb-3 podcast-hero">
      <div class="col-lg-10 col-xl-10">
        <h1 class="display-5 fw-bold podcast-hero__title">Audio Podcasts</h1>
      </div>
      <p class="lead podcast-hero__description">
        Tune into thoughtfully curated Islamic audio that brings together scholars, storytellers, and community voices.  Explore episodes on tafsir, seerah, daily reminders, and practical faith conversations to learn, reflect, and
        stay connected.
      </p>
    </div>

    <!-- Podcast Selection Section -->
    <div class="selection-section">
      <div class="section-header">
        <p class="section-subtitle">
          Tap on a podcast to unlock immersive audio journeys, practical guidance, and fresh perspectives for everyday
          Muslim life.
        </p>
      </div>
      <div class="podcast-selection-grid">
        <button v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" type="button" class="podcast-selection-item"
          :class="{ 'is-selected': selectedPodcast && selectedPodcast.rssUrl === podcast.rssUrl }"
          @click="selectPodcast(podcast)" :aria-label="`Select podcast ${podcast.name}`"
          :aria-pressed="selectedPodcast && selectedPodcast.rssUrl === podcast.rssUrl ? 'true' : 'false'">
          <div class="podcast-image-wrapper">
            <img :src="podcast.image" :alt="podcast.name" class="podcast-selection-image" loading="lazy">
            <div class="podcast-overlay">
              <i class="bi" :class="selectedPodcast && selectedPodcast.rssUrl === podcast.rssUrl ? 'bi-check-circle-fill' : 'bi-play-circle-fill'"></i>
              <span class="play-text">{{ selectedPodcast && selectedPodcast.rssUrl === podcast.rssUrl ? 'Selected' : 'Click to Select' }}</span>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Selected Podcast Details -->
    <div class="selected-podcast-section selected-podcast-shell card-teal" v-if="selectedPodcast" ref="podcastDetailSection">
      <div class="selected-podcast-header">
        <div class="selected-podcast-info">
          <h3 class="selected-podcast-title">{{ selectedPodcast.name }}</h3>
          <p class="selected-podcast-stats">
            {{ formatEpisodeCount(selectedPodcast.episodeCount) }} episodes ·
            {{ formatTotalDuration(totalListeningMinutes) }} total ·
            {{ formatNumber(totalViews) }} views
          </p>
        </div>
        <div class="selected-podcast-image-container">
          <img :src="selectedPodcast.image" :alt="selectedPodcast.name" class="selected-podcast-image" loading="lazy">
        </div>
      </div>
      <p class="selected-podcast-description__text">{{ selectedPodcast.desc }}</p>
    </div>

    <!-- Continue Listening Section -->
    <div v-if="selectedPodcast && continueListening.length" class="continue-listening-section">
      <div class="section-header">
        <h2 class="section-title" style="background-image:none;-webkit-text-fill-color:initial;color:#0b1320;">Continue
          Listening</h2>
        <p class="section-subtitle">Pick up where you left off</p>
      </div>
      <div class="podcast-cards-grid border-md card-teal continue-grid">
        <div v-for="(item, idx) in continueListening" :key="item.title" class="podcast-card-wrapper">
          <div class="podcast-card continue-card">
            <div class="card-body">
              <div class="podcast-card-top">
                <img v-if="selectedPodcast && selectedPodcast.image" :src="selectedPodcast.image"
                  :alt="selectedPodcast.name" class="episode-avatar" loading="lazy" />
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
      <div class="favorites-hero">
        <div class="favorites-hero__text">
          <p class="favorites-kicker">Saved for you</p>
          <h2 class="favorites-title">Favorites</h2>
          <p class="favorites-subtitle">Quick access to episodes you loved</p>
        </div>
        <div class="favorites-hero__actions">
          <span class="favorites-count">{{ favourites.length }} saved</span>
            <button type="button" class="favorites-toggle" @click="toggleVisibility()"
              :aria-expanded="isVisible ? 'true' : 'false'" aria-controls="favoritesGrid">
            <i class="fas" :class="isVisible ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            {{ isVisible ? 'Close favorites' : 'Open favorites' }}
          </button>
        </div>
      </div>

      <transition name="favorites-collapse">
        <div v-if="isVisible" id="favoritesGrid" class="favorites-grid">
          <div v-for="fav in favourites" :key="fav.title + fav.audioUrl" class="podcast-card-wrapper">
            <div :class="['podcast-card', 'favorite-card', { 'highlighted': isCurrentlyPlaying(fav) }]">
              <div class="card-body">
                <div class="podcast-card-top">
                  <img v-if="selectedPodcast && selectedPodcast.image" :src="selectedPodcast.image"
                    :alt="selectedPodcast.name" class="episode-avatar" loading="lazy" />
                  <div class="podcast-card-info">
                    <h4 class="podcast-title">{{ fav.title }}</h4>
                    <div class="podcast-extra-info favorites-meta">
                      <span class="favorite-chip" :title="'Published'">
                        <i class="fas fa-calendar-alt"></i>
                        {{ formatDate(fav.pubDate) }}
                      </span>
                      <span v-if="fav.likedAt" class="favorite-chip" :title="'Liked on'">
                        <i class="fas fa-heart"></i>
                        {{ new Date(fav.likedAt).toLocaleString() }}
                      </span>
                    </div>
                  </div>
                  <div class="audio-controls-inline favorites-actions">
                    <button class="control-button play-btn favorite-play" :class="{ 'is-active': isCurrentlyPlaying(fav) }"
                      @click="playFromFavourites(fav)" :title="isCurrentlyPlaying(fav) ? 'Pause' : 'Play'"
                      :aria-pressed="isCurrentlyPlaying(fav) ? 'true' : 'false'">
                      <i class="fas" :class="isCurrentlyPlaying(fav) ? 'fa-pause' : 'fa-play'"></i>
                    </button>
                    <button class="control-button favorite-remove" @click="toggleFavourite(fav)"
                      title="Remove from favorites">
                      <i class="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Podcast Episodes Section -->
    <div v-if="selectedPodcast" class="episodes-section">
      <div class="section-header episodes-header">
        <h2 class="section-title section-title-plain">Episodes</h2>
        
        <div class="episodes-header__meta">
          <button v-if="hasActiveFilters" type="button" class="clear-filters-btn" @click="clearEpisodeFilters">
            Clear filters
          </button>
        </div>
      </div>
      <div v-if="fetchError" class="alert alert-danger" role="alert">
        {{ fetchError }}
      </div>
      <div class="episodes-filters-bar-wrapper">
        <div class="row g-2 align-items-center">
          <!-- Search -->
          <div class="col-12 col-md-6 order-2 order-md-1">
            <div class="podcast-search-shell">
              <label class="visually-hidden" for="podcastSearchInput">Search episodes</label>
              <div class="input-group podcast-search-input">
                <span class="input-group-text bg-white border-end-0">
                  <i class="bi bi-search"></i>
                </span>
                <input id="podcastSearchInput" v-model="searchInput" @input="onSearchInput" type="text"
                  class="form-control border-start-0" placeholder="Search by title, topic, or keyword..." />
                <button v-if="searchInput" type="button" class="search-clear-btn" @click="clearSearchInput"
                  aria-label="Clear search">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <p class="podcast-search-helper" :class="{ 'podcast-search-helper--active': !!searchQuery }">
                {{ searchSummaryText }}
              </p>
            </div>
          </div>

          <!-- Inline filters on md+, compact -->
          <div class="col-md-6 d-none d-md-flex order-1 order-md-2 justify-content-end align-items-stretch gap-2">
            <select v-model="durationFilter" class="form-select filter-select" aria-label="Filter by duration">
              <option value="" disabled selected hidden>Duration</option>
              <option value="0-10">0-10 min</option>
              <option value="10-30">10-30 min</option>
              <option value="30-60">30-60 min</option>
              <option value="more-than-60">60+ min</option>
            </select>
            <select v-model="languageFilter" class="form-select filter-select" aria-label="Filter by language">
              <option value="">Languages</option>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="Unknown">Unknown</option>
            </select>
            <select v-model="sortOption" class="form-select filter-select" aria-label="Sort episodes">
              <option value="mostViewed">Most Viewed</option>
              <option value="leastViewed">Least Viewed</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <!-- Mobile toggle button -->
          <div class="col-12 d-flex d-md-none justify-content-between order-1">
            <button type="button" class="btn btn-light w-100 filter-toggle-btn" :class="{ 'is-active': showFilters }" @click="showFilters = !showFilters">
              <i class="bi bi-funnel me-2"></i> Filters
            </button>
          </div>
        </div>

        <!-- Collapsible mobile filters -->
        <transition name="fade">
          <div v-if="showFilters" class="mt-2 d-md-none">
            <div class="d-grid gap-2">
              <select v-model="durationFilter" class="form-select filter-select" aria-label="Filter by duration">
                <option value="" disabled selected hidden>Duration</option>
                <option value="0-10">0-10 min</option>
                <option value="10-30">10-30 min</option>
                <option value="30-60">30-60 min</option>
                <option value="more-than-60">60+ min</option>
              </select>
              <select v-model="languageFilter" class="form-select filter-select" aria-label="Filter by language">
                <option value="">Languages</option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Unknown">Unknown</option>
              </select>
              <select v-model="sortOption" class="form-select filter-select" aria-label="Sort episodes">
                <option value="mostViewed">Most Viewed</option>
                <option value="leastViewed">Least Viewed</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </transition>
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
      <div v-else class="podcast-cards-grid border-md episodes-grid">
        <div v-for="(podcast, index) in visiblePodcasts" :key="podcast.title" class="podcast-card-wrapper">
          <div :class="['podcast-card', 'episode-card', { 'highlighted': playingIndex === index }]">
            <div class="card-header">
              <div v-if="loginWarnings[getEpisodeKey(podcast)]" class="alert alert-warning episode-warning"
                role="alert">
                <i class="bi bi-shield-lock-fill" aria-hidden="true"></i>
                <span class="episode-warning-text">{{ loginWarnings[getEpisodeKey(podcast)] }}</span>
                <a class="episode-warning-cta" href="/login">Log in</a>
              </div>
              <div class="podcast-meta">
                <div class="views-badge" :title="'Views'">
                  <i class="bi bi-eye-fill"></i>
                  <span class="meta-text">{{ podcast.views }} views</span>
                </div>
                <div class="date-badge" :title="'Published date'">
                  <i class="bi bi-calendar3"></i>
                  <span class="meta-text">{{ formatDate(podcast.pubDate) }}</span>
                  <span v-if="isNewEpisode(podcast.pubDate)" class="new-badge" aria-label="New episode">NEW</span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="podcast-card-top episode-card-top">
                <img v-if="selectedPodcast && selectedPodcast.image" :src="selectedPodcast.image"
                  :alt="selectedPodcast.name" class="episode-avatar podcast-image-clickable"
                  decoding="async" fetchpriority="low" @click="scrollToFirstEpisode" style="cursor:pointer;"
                  loading="lazy" />
                <div class="podcast-card-info">
                  <h4 class="podcast-title" v-html="highlightText(podcast.title)"></h4>
                  <div class="podcast-extra-info podcast-extra-info--compact">
                    <span class="duration-badge">
                      <i class="bi bi-clock-history" aria-hidden="true"></i>
                      {{ podcast.duration ? podcast.duration + ' min' : 'N/A' }}
                    </span>
                    <span class="lang-badge">
                      <i class="bi bi-translate" aria-hidden="true"></i>
                      {{ podcast.language }}
                    </span>
                  </div>
                  <div class="episode-metadata-grid">
                    <span class="meta-chip" :title="'File size'">
                      <i class="bi bi-hdd-network"></i>
                      {{ formatAudioSize(podcast.audioSizeBytes) }}
                    </span>
                  </div>

                </div>
                <div class="audio-controls-inline">
                  <button class="control-button play-btn" @click="toggleAudioPlayer(index)"
                    :class="{ 'playing': isAudioPlaying[index] }"
                    :aria-label="isAudioPlaying[index] ? 'Pause' : 'Play'">
                    <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-fill' : 'bi-play-fill'"
                      style="font-size:1.5rem; cursor:pointer;"></i>
                  </button>
                  <button class="control-button" :class="{ 'is-active': isFavourite(podcast) }" :aria-pressed="isFavourite(podcast) ? 'true' : 'false'"
                    :title="isFavourite(podcast) ? 'Unfavorite' : 'Favorite'"
                    :aria-label="isFavourite(podcast) ? 'Unfavorite' : 'Favorite'"
                    @click.stop="toggleFavourite(podcast)">
                    <i class="bi" :class="isFavourite(podcast) ? 'bi-heart-fill text-danger' : 'bi-heart'"
                      style="font-size:1.3rem;"></i>
                  </button>
                  <button class="download-button" type="button" @click.stop="downloadAudio(podcast)"
                    :aria-label="`Download ${podcast.title} to listen offline`">
                    <i class="bi bi-download" aria-hidden="true"></i>
                    <span class="download-button__text">Download to listen offline</span>
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
    <!-- empty state hidden by request -->

    <!-- Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container">
      <div class="custom-audio-player" :class="{ minimized: isPlayerMinimized }">
        <div class="controls">
          <div class="controls-left">
            <div class="artwork" v-if="selectedPodcast && selectedPodcast.image">
              <img :src="selectedPodcast.image" :alt="selectedPodcast.name" />
            </div>
            <div class="control-group">
              <button @click="rewindAudio(currentlyPlayingIndex)" class="control-btn" title="Rewind 15 seconds"
                aria-label="Rewind 15 seconds">
                <i class="bi bi-skip-backward-fill"></i>
              </button>
              <button @click="toggleAudioPlayer(currentlyPlayingIndex)" class="control-btn play-pause"
                :aria-pressed="!!isAudioPlaying[currentlyPlayingIndex]"
                :aria-label="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'"
                :title="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'">
                <i v-if="isAudioPlaying[currentlyPlayingIndex]" class="bi bi-pause-fill" aria-hidden="true"></i>
                <i v-else class="bi bi-play-fill" aria-hidden="true"></i>
              </button>
              <button @click="fastForwardAudio(currentlyPlayingIndex)" class="control-btn" title="Forward 20 seconds"
                aria-label="Forward 20 seconds">
                <i class="bi bi-skip-forward-fill"></i>
              </button>
              <button @click="stopAudio(currentlyPlayingIndex)" class="control-btn" title="Stop" aria-label="Stop">
                <i class="bi bi-stop-fill"></i>
              </button>

            </div>
          </div>
          <div class="info-section" aria-live="polite">
            <span class="episode-title" v-if="visiblePodcasts[currentlyPlayingIndex]">{{
              visiblePodcasts[currentlyPlayingIndex].title }}</span>
            <span class="time">{{ formatTime(audioElements[currentlyPlayingIndex]?.currentTime || 0) }} / {{
              formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
          </div>
          <div class="audio-actions">
            <div class="audio-actions__group">
              <button @click="toggleVolume" class="control-btn" title="Volume"
                :aria-expanded="showVolumeBar ? 'true' : 'false'" aria-controls="player-volume">
                <i class="bi" :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`"></i>
              </button>
              <input v-if="showVolumeBar" id="player-volume" type="range" min="0" max="1" step="0.01"
                v-model.number="volume" @input="updateVolume" class="volume-slider" aria-label="Volume" />
            </div>
            <div class="audio-actions__group">
              <label for="speedSelect" class="visually-hidden">Speed</label>
              <select id="speedSelect" v-model.number="playbackSpeed" @change="updatePlaybackSpeed"
                class="form-select form-select-sm audio-speed-select">
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
          <div class="progress"
            :style="{ width: progress[currentlyPlayingIndex] + '%' }">
          </div>
          <div class="progress-handle"
            :style="{ left: progress[currentlyPlayingIndex] + '%' }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../scripts/ContentComponent.script.js"></script>
<style scoped src="../styles/ContentComponent.style.css"></style>
