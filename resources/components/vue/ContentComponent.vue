<template>
  <div class="container py-4">
    <!-- Header Section -->
    <div class="row justify-content-center text-center mb-3">
      <div class="col-lg-10 col-xl-10">
        <h1 class="display-5 fw-bold">Islamic Audio Library</h1>
        <p class="lead">
          Tune into thoughtfully curated Islamic audio that brings together scholars, storytellers, and community voices.
          Every episode blends reflection, practical guidance, and inspiration to help deepen your connection and spark
          meaningful conversations throughout your day.
        </p>
      </div>
    </div>

    <!-- Podcast Selection Section -->
    <div class="selection-section">
      <div class="section-header">
        <p class="section-subtitle">Tap on a podcast to unlock immersive audio journeys and fresh perspectives.</p>
      </div>
    <div class="podcast-selection-grid">
      <button v-for="podcast in islamicPodcasts" :key="podcast.rssUrl" type="button"
        class="podcast-selection-item"
        @click="selectPodcast(podcast)"
        :aria-label="`Select podcast ${podcast.name}`">
        <div class="podcast-image-wrapper">
          <img :src="podcast.image" :alt="podcast.name" class="podcast-selection-image" loading="lazy">
          <div class="podcast-overlay">
            <i class="bi bi-play-circle-fill"></i>
            <span class="play-text">Click to Select</span>
          </div>
        </div>
      </button>
    </div>
    </div>

    <!-- Selected Podcast Details -->
    <div class="selected-podcast-section card-teal" v-if="selectedPodcast" ref="podcastDetailSection"
         :style="'position:relative;overflow:hidden;padding:2rem;box-shadow:0 10px 40px rgba(0,0,0,.12);border:2px solid rgba(11,179,154,.12)'">
      <div class="selected-podcast-header" :style="'display:flex;align-items:center;gap:1.5rem;margin-bottom:1rem'">
        <div class="selected-podcast-info">
          <h3 class="selected-podcast-title" :style="'font-size:2rem;font-weight:800;color:#0b1320;margin:0 0 .5rem'">{{ selectedPodcast.name }}</h3>
          <div class="selected-podcast-meta" :style="'display:flex;gap:.75rem;flex-wrap:wrap'">
          <span class="episode-count">
            <i class="bi bi-collection-play"></i>
              {{ formatEpisodeCount(selectedPodcast.episodeCount) }} Episodes
              Available
            </span>
          </div>
        </div>
        <div class="selected-podcast-image-container">
          <img :src="selectedPodcast.image" :alt="selectedPodcast.name" class="selected-podcast-image" loading="lazy"
               :style="'width:120px;height:120px;object-fit:cover;border-radius:20px;border:3px solid #fff;box-shadow:0 10px 30px rgba(0,0,0,.2)'">
        </div>
      </div>
      <div class="selected-podcast-description" :style="'color:#495057;line-height:1.7;font-size:1.05rem'">
        <p>{{ selectedPodcast.desc }}</p>
      </div>
    </div>

    <!-- Continue Listening Section -->
    <div v-if="selectedPodcast && continueListening.length" class="continue-listening-section">
      <div class="section-header">
        <h2 class="section-title" style="background-image:none;-webkit-text-fill-color:initial;color:#0b1320;">Continue Listening</h2>
        <p class="section-subtitle">Pick up where you left off</p>
      </div>
      <div class="podcast-cards-grid border-md card-teal" style="padding: 5px;">
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
      <div class="favorites-hero">
        <div class="favorites-hero__text">
          <p class="favorites-kicker">Saved for you</p>
          <h2 class="favorites-title">Favorites</h2>
          <p class="favorites-subtitle">Quick access to episodes you loved</p>
        </div>
        <div class="favorites-hero__actions">
          <span class="favorites-count">{{ favourites.length }} saved</span>
          <button class="favorites-toggle" @click="toggleVisibility">
            <i class="fas" :class="isVisible ? 'fa-eye-slash' : 'fa-eye'"></i>
            {{ isVisible ? 'Hide favorites' : 'Show favorites' }}
          </button>
        </div>
      </div>

      <transition name="fade">
        <div v-show="isVisible" class="favorites-grid">
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
                    <button class="control-button play-btn favorite-play" @click="playFromFavourites(fav)" title="Play">
                      <i class="fas fa-play"></i>
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
    <div v-if="!loading && visiblePodcasts.length" class="episodes-section">
      <div class="section-header">
        <h2 class="section-title" style="background-image:none;-webkit-text-fill-color:initial;color:#0b1320;">Episodes</h2>
        <p class="section-subtitle">Press play to experience each episode’s rich audio storytelling.</p>
      </div>
      <div v-if="fetchError" class="alert alert-danger" role="alert">
        {{ fetchError }}
      </div>
      <div class="episodes-filters-bar-wrapper"
           :style="'background:linear-gradient(135deg,#f5fff1 0%,#e0f6ec 60%,#d3edf5 100%);border:1px solid rgba(11,179,154,0.25);border-radius:10px;padding:.5rem .75rem;margin-bottom:1rem;position:sticky;top:8px;z-index:50'">
        <div class="row g-2 align-items-center">
          <!-- Search -->
          <div class="col-12 col-md-6 order-2 order-md-1">
            <div class="input-group"
                 :style="'display:flex;align-items:center;background:#fff;border:1px solid #dbe5e8;border-radius:10px;height:40px'">
              <span class="input-group-text bg-white border-end-0" :style="'border:0;border-right:1px solid #eef2f4;border-radius:10px 0 0 10px;color:#06b6ac;font-size:1rem'">
                <i class="bi bi-search"></i>
              </span>
              <input v-model="searchInput" @input="onSearchInput" type="text" class="form-control border-start-0"
                placeholder="Search episodes..." :style="'border:0;border-radius:0 10px 10px 0;padding:6px 10px;font-size:.95rem'" />
            </div>
          </div>

          <!-- Inline filters on md+, compact -->
          <div class="col-md-6 d-none d-md-flex order-1 order-md-2 justify-content-end gap-2">
            <select v-model="durationFilter" class="form-select" aria-label="Filter by duration"
                    :style="'max-width:160px;height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'">
              <option value="" disabled selected hidden>Duration</option>
              <option value="0-10">0-10 min</option>
              <option value="10-30">10-30 min</option>
              <option value="30-60">30-60 min</option>
              <option value="more-than-60">60+ min</option>
            </select>
            <select v-model="languageFilter" class="form-select" aria-label="Filter by language"
                    :style="'max-width:150px;height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'">
              <option value="">Languages</option>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="Unknown">Unknown</option>
            </select>
            <select v-model="sortOption" class="form-select" aria-label="Sort episodes"
                    :style="'max-width:150px;height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'">
              <option value="mostViewed">Most Viewed</option>
              <option value="leastViewed">Least Viewed</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <!-- Mobile toggle button -->
          <div class="col-12 d-flex d-md-none justify-content-between order-1">
            <button type="button" class="btn btn-light w-100" @click="showFilters = !showFilters"
                    :style="'border:1px solid #dbe5e8;border-radius:10px;height:40px'">
              <i class="bi bi-funnel me-2"></i> Filters
            </button>
          </div>
        </div>

        <!-- Collapsible mobile filters -->
        <transition name="fade">
          <div v-if="showFilters" class="mt-2 d-md-none">
            <div class="d-grid gap-2">
              <select v-model="durationFilter" class="form-select" aria-label="Filter by duration"
                      :style="'height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'">
                <option value="" disabled selected hidden>Duration</option>
                <option value="0-10">0-10 min</option>
                <option value="10-30">10-30 min</option>
                <option value="30-60">30-60 min</option>
                <option value="more-than-60">60+ min</option>
              </select>
              <select v-model="languageFilter" class="form-select" aria-label="Filter by language"
                      :style="'height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'">
                <option value="">Languages</option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Unknown">Unknown</option>
              </select>
              <select v-model="sortOption" class="form-select" aria-label="Sort episodes"
                      :style="'height:40px;border:1px solid #dbe5e8;border-radius:10px;font-size:.95rem'">
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
      <div v-else class="podcast-cards-grid border-md" style="padding: 5px;">
        <div v-for="(podcast, index) in visiblePodcasts" :key="podcast.title" class="podcast-card-wrapper">
          <div :class="['podcast-card', { 'highlighted': playingIndex === index }]"
               :style="((playingIndex===index)?'outline:2px solid #0bb39a;background:linear-gradient(135deg,#f0fffb 0%,#ddfff5 100%);box-shadow:0 14px 30px rgba(11,179,154,.26),0 1.5px 8px rgba(0,0,0,.06);':'') + 'padding:1.2rem;border-radius:20px;background:linear-gradient(135deg,#ffffff,#eefef9);border:1px solid rgba(11,179,154,.18);box-shadow:0 8px 18px rgba(0,0,0,.08);transition:transform .12s ease-out, box-shadow .12s ease-out'">
            <div class="card-header" :style="'border-bottom:1px solid rgba(0,0,0,.06);padding-bottom:.5rem'">
              <div v-if="loginWarnings[getEpisodeKey(podcast)]" class="alert alert-warning episode-warning" role="alert">
                <i class="bi bi-shield-lock-fill" aria-hidden="true"></i>
                <span class="episode-warning-text">{{ loginWarnings[getEpisodeKey(podcast)] }}</span>
                <a class="episode-warning-cta" href="/login">Log in</a>
              </div>
              <div class="podcast-meta" :style="'display:flex;justify-content:space-between;align-items:center;gap:' + (smallScreen? '8px':'16px')">
                <div class="views-badge" :title="'Views'"
                     :style="'display:flex;align-items:center;gap:8px;padding:' + (smallScreen? '6px 10px':'8px 14px') + ';background:#fff;border-radius:20px;border:1px solid rgba(11,179,154,.18);box-shadow:0 4px 10px rgba(0,0,0,.06)'">
                  <i class="bi bi-eye-fill" :style="'font-size:' + (smallScreen? '1rem':'1.1rem') + ';color:#0bb39a'"></i>
                  <span class="meta-text" :style="'color:#0b1320;font-weight:600'">{{ podcast.views }} views</span>
                </div>
                <div class="date-badge" :title="'Published date'"
                     :style="'display:flex;align-items:center;gap:8px;padding:' + (smallScreen? '6px 10px':'8px 14px') + ';background:#fff;border-radius:20px;border:1px solid rgba(11,179,154,.18);box-shadow:0 4px 10px rgba(0,0,0,.06)'">
                  <i class="bi bi-calendar3" :style="'font-size:' + (smallScreen? '1rem':'1.1rem') + ';color:#0bb39a'"></i>
                  <span class="meta-text" :style="'color:#0b1320;font-weight:600'">{{ formatDate(podcast.pubDate) }}</span>
                  <span v-if="isNewEpisode(podcast.pubDate)" class="new-badge" aria-label="New episode">NEW</span>

                </div>
              </div>
            </div>
            <div class="card-body" :style="'padding-top:1rem'">
              <div class="podcast-card-top" :style="'display:flex;align-items:center;gap:' + (smallScreen? '.5rem':'1rem') + ';justify-content:space-between;' + (smallScreen? 'flex-direction:column;align-items:stretch;':'')">
                <img v-if="selectedPodcast && selectedPodcast.image" :src="selectedPodcast.image"
                  :alt="selectedPodcast.name" class="episode-avatar podcast-image-clickable" :style="'width:100px;height:100px;object-fit:cover;margin-right:1rem;border:2px solid #e9ecef;border-radius:20px;box-shadow:0 8px 22px rgba(0,0,0,.10);background:#fff'"
                  decoding="async" fetchpriority="low"
                  @click="scrollToFirstEpisode" style="cursor:pointer;" loading="lazy" />
                <div class="podcast-card-info">
                  <h4 class="podcast-title" v-html="highlightText(podcast.title)" :style="'color:#0b1320;font-weight:800'"></h4>
                  <div class="podcast-extra-info">
                    <!-- <span class="duration-badge" :title="'Duration'">
                      <i class="bi bi-clock" style="font-size:1.1rem;"></i>
                      {{ podcast.duration ? podcast.duration + ' min' : 'N/A' }}
                    </span> -->
                    <span class="lang-badge" :title="'Language'" :style="'display:flex;align-items:center;gap:.35rem;background:#f8f9fa;border-radius:20px;padding:2px 10px;box-shadow:0 1px 4px rgba(0,0,0,.04);border:1px solid rgba(11,179,154,.18);color:#0b1320;font-weight:600'">
                      <i class="bi bi-translate" :style="'font-size:1.05rem;color:#0bb39a'" ></i>
                      <span>{{ podcast.language }}</span>
                    </span>
                  </div>

                </div>
                <div class="audio-controls-inline">
                  <button class="control-button play-btn" @click="toggleAudioPlayer(index)"
                    :class="{ 'playing': isAudioPlaying[index] }"
                    :aria-label="isAudioPlaying[index] ? 'Pause' : 'Play'">
                    <i class="bi" :class="isAudioPlaying[index] ? 'bi-pause-fill' : 'bi-play-fill'" style="font-size:1.5rem; cursor:pointer;color:#0b1320"></i>
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
    <!-- empty state hidden by request -->

    <!-- Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container" :style="'border-radius:20px 20px 0 0;position:fixed;bottom:0;left:0;width:100%;background:linear-gradient(180deg,#2b3a3f 0%,#1e262a 100%);box-shadow:0 -10px 30px rgba(0,0,0,.35);z-index:1000;padding:12px 16px;border-top:1px solid rgba(255,255,255,.06)'">
      <div class="custom-audio-player" :class="{ minimized: isPlayerMinimized }" :style="'max-width:100%;margin:0 auto;padding:12px;color:#e8f0f2;display:flex;flex-direction:column;gap:10px'">
        <div class="controls">
          <div class="controls-left">
            <div class="artwork" v-if="selectedPodcast && selectedPodcast.image">
              <img :src="selectedPodcast.image" :alt="selectedPodcast.name" />
            </div>
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
          </div>
          <div class="info-section" aria-live="polite">
            <span class="episode-title" v-if="visiblePodcasts[currentlyPlayingIndex]">{{ visiblePodcasts[currentlyPlayingIndex].title }}</span>
            <span class="time">{{ formatTime(audioElements[currentlyPlayingIndex]?.currentTime || 0) }} / {{ formatTime(audioElements[currentlyPlayingIndex]?.duration || 0) }}</span>
          </div>
          <div class="audio-actions">
            <div class="audio-actions__group">
              <button @click="toggleVolume" class="control-btn" title="Volume" :aria-expanded="showVolumeBar ? 'true' : 'false'" aria-controls="player-volume">
                <i class="bi" :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`"></i>
              </button>
              <input v-if="showVolumeBar" id="player-volume" type="range" min="0" max="1" step="0.01" v-model.number="volume"
                @input="updateVolume" class="volume-slider" aria-label="Volume" />
            </div>
            <div class="audio-actions__group">
              <label for="speedSelect" class="visually-hidden">Speed</label>
              <select id="speedSelect" v-model.number="playbackSpeed" @change="updatePlaybackSpeed" class="form-select form-select-sm audio-speed-select">
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
        <div class="progress-bar" @mousedown="startSeek" @click="seekAudio"
             :style="'width:100%;height:6px;background:linear-gradient(90deg,rgba(255,255,255,.18),rgba(255,255,255,.08));cursor:pointer;position:relative;margin:6px 0;border-radius:999px'">
          <div class="progress" :style="{ width: progress[currentlyPlayingIndex] + '%', height:'100%', background:'linear-gradient(90deg,#0bb39a,#0a9bd1)', position:'absolute', borderRadius:'999px' }"></div>
          <div class="progress-handle" :style="{ left: progress[currentlyPlayingIndex] + '%', position:'absolute', top:'50%', transform:'translate(-50%, -50%)', width:'14px', height:'14px', borderRadius:'50%', background:'#fff', boxShadow:'0 0 0 3px rgba(11,179,154,.25)', pointerEvents:'none' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../scripts/ContentComponent.script.js"></script>
<style scoped src="../styles/ContentComponent.style.css"></style>
