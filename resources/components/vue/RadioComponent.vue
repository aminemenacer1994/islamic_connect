<template>
  <div>
    <div class="container py-5 radio-shell">
      <div class="row justify-content-center text-center mb-3">
        <div class="col-lg-10 col-xl-10">
          <h1 class="display-5 fw-bold" style="color:#0b1320;letter-spacing:-.02em;margin-bottom:.25rem;">The World of Quranic Recitation</h1>
          <p class="lead mb-2 mt-1" style="color:#475569;margin:0 auto;">Discover live Quranic reciters, Biographies, Fatwas and Translations stations
            from renowned reciters worldwide.</p>
        </div>
      </div>

      <!-- Search Bar and Category Dropdown -->
      <section class="mb-4" role="search" aria-label="Search and filter stations">
        <div class="fixed-footer mb-4 border-md filters-panel">
          <div class="d-flex justify-content-between align-items-center gap-2 cursor-pointer filter-header"
            @click="isFilterOpen = !isFilterOpen" role="button" :aria-expanded="isFilterOpen"
            :aria-controls="'filter-panel'" tabindex="0" @keydown.enter.prevent="isFilterOpen = !isFilterOpen"
            @keydown.space.prevent="isFilterOpen = !isFilterOpen">
            <div class="d-flex align-items-center gap-2">
              <span class="filter-header-icon" aria-hidden="true">
                <i class="bi bi-sliders2"></i>
              </span>
              <div>
                <h4 class="filter-title mb-0">Find Stations</h4>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2 filter-meta">
              <span v-if="hasActiveFilters" class="badge bg-primary rounded-pill filter-badge">
                {{ activeFilterCount }} active
              </span>
              <button type="button" class="advanced-toggle-btn advanced-toggle-icon"
                :class="{ 'is-active': hasAdvancedFiltersActive || showAdvancedFilters }"
                @click.stop="showAdvancedFilters = !showAdvancedFilters"
                @keydown.enter.stop.prevent="showAdvancedFilters = !showAdvancedFilters"
                @keydown.space.stop.prevent="showAdvancedFilters = !showAdvancedFilters"
                :aria-expanded="showAdvancedFilters" aria-controls="advanced-filter-panel"
                :title="showAdvancedFilters ? 'Hide advanced filters' : 'Show advanced filters'"
                :aria-label="showAdvancedFilters ? 'Hide advanced filters' : 'Show advanced filters'">
                <i :class="showAdvancedFilters ? 'bi bi-funnel-fill' : 'bi bi-funnel'"></i>
              </button>
              <span class="filter-chevron" aria-hidden="true">
                <i :class="isFilterOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
              </span>
            </div>
          </div>

          <transition name="slide-fade">
            <div v-show="isFilterOpen" id="filter-panel" class="filter-panel-body">
              <div class="row g-2 align-items-end">
                <div class="col-12">
                  <label for="reciterSearch" class="form-label fw-semibold text-dark mb-1 filter-label">
                    Search by Name
                  </label>
                  <div class="search-input-wrap">
                    <span class="search-input-icon" aria-hidden="true">
                      <i class="bi bi-search"></i>
                    </span>
                    <input v-model="searchQuery" @input="handleSearch" @keydown="handleKeydown"
                      @focus="showSuggestions = lowerSearchQuery.length >= 2 && filteredSuggestions.length > 0"
                      @blur="hideSuggestions" id="reciterSearch" type="text" class="form-control filter-input filter-input-search"
                      placeholder="Search reciter..." aria-label="Search reciters by name" />
                    <button v-if="searchQuery" type="button" class="search-clear-btn" @click="clearSearch"
                      aria-label="Clear search query">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <div v-if="showSuggestions && filteredSuggestions.length" class="search-suggestions" role="listbox"
                    aria-label="Suggested reciters">
                    <button v-for="(suggestion, index) in filteredSuggestions" :key="`${suggestion.id}-${suggestion.name}`"
                      type="button" class="search-suggestion-item" :class="{ active: index === highlightIndex }"
                      @mousedown.prevent @click="selectSuggestion(suggestion.name)">
                      <i class="bi bi-broadcast-pin" aria-hidden="true"></i>
                      <span>{{ suggestion.name }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <transition name="slide-fade">
                <div v-show="showAdvancedFilters" id="advanced-filter-panel" class="row g-2 mt-1 advanced-filter-grid">
                  <div class="col-12 d-flex justify-content-end">
                    <button v-if="hasActiveFilters" type="button" class="filter-reset-btn" @click="clearAllFilters">
                      Reset
                    </button>
                  </div>
                  <div class="col-md-6">
                    <label for="reciterCategory" class="form-label fw-semibold text-dark mb-1 filter-label">
                      Category
                    </label>
                    <div class="select-wrap">
                      <span class="select-icon" aria-hidden="true">
                        <i class="bi bi-tags"></i>
                      </span>
                      <select v-model="selectedCategory" @change="handleSearch" id="reciterCategory"
                        class="form-select filter-select filter-select-with-icon" aria-label="Select a category">
                        <option value="All Categories">All Categories</option>
                        <option v-for="category in availableCategories" :key="category" :value="category">
                          {{ category }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="sortBy" class="form-label fw-semibold text-dark mb-1 filter-label">
                      Sort By
                    </label>
                    <div class="select-wrap">
                      <span class="select-icon" aria-hidden="true">
                        <i class="bi bi-sort-down"></i>
                      </span>
                      <select v-model="sortBy" id="sortBy" class="form-select filter-select filter-select-with-icon"
                        aria-label="Sort stations">
                        <option value="default">Default</option>
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                        <option value="listeners_desc">Most Listeners</option>
                      </select>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </transition>
        </div>
      </section>

      <!-- Liked Stations Section -->
      <section v-if="likedStations.length" class="mb-5">
        <button @click="showLiked = !showLiked" type="button"
          class="favorite-section-toggle fw-bold mb-3 fs-4" :aria-expanded="showLiked"
          :aria-controls="`liked-stations`">
          <span
            style="display:inline-flex;border-radius:50%;align-items:center;justify-content:center;color:#0bb39a;">
            <i class="bi bi-heart-fill"></i>
          </span>
          Favorite Stations ({{ likedStations.length }})
          <i :class="showLiked ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="ms-1"></i>
        </button>
        <div v-if="showLiked" class="section-animate" id="liked-stations">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div v-for="station in likedStations" :key="station.id" class="col">
              <div :id="'station-' + station.id" role="article" :aria-labelledby="'station-title-' + station.id"
                :class="[{ 'active-card': currentAudio?.src === station.url }, 'station-card-focusable']"
                tabindex="0"
                style="border-radius:20px;background:#ffffff;border:1px solid rgba(6,182,172,.18);box-shadow:0 6px 14px rgba(0,0,0,.06);transition:transform .12s ease, box-shadow .12s ease;"
                @mouseenter="$event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.22)'; $event.currentTarget.style.transform = 'translateY(-2px)';"
                @mouseleave="$event.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,.06)'; $event.currentTarget.style.transform = '';">
                <div class="d-flex justify-content-between align-items-start p-4 card-teal station-content">
                  <div class="station-info d-flex align-items-start gap-3">
                    <img
                      :src="station.imageUrl"
                      :alt="`${station.name} image`"
                      class="station-avatar"
                      loading="lazy"
                      decoding="async"
                      @error="handleStationImageError(station)"
                    />
                    <div>
                    <div v-if="loginWarnings[station.id]" class="alert alert-warning station-login-warning" role="alert">
                      <i class="bi bi-shield-lock-fill" aria-hidden="true"></i>
                      <span>{{ loginWarnings[station.id] }}</span>
                      <a class="station-login-cta" href="/login">Log in</a>
                    </div>
                    <h5 class="card-title station-title mb-1 fw-bold" :id="'station-title-' + station.id"
                      v-html="highlightSearch(station.name)" style="color:#0b1320"></h5>
                    <p v-if="station.category || station.country" class="text-muted mb-1 fs-sm recitation-meta">
                      <span v-if="station.category">{{ station.category }}</span>
                      <span v-if="station.category && station.country" class="ms-1">·</span>
                      <span v-if="station.country" :class="{ 'ms-1': station.category }">{{ station.country }}</span>
                    </p>
                    <p v-if="station.shortInfo" class="mb-0 station-short-info">{{ station.shortInfo }}</p>
                    <p class="station-meta-line mt-2 mb-0">
                      <i class="bi bi-headphones me-1" aria-hidden="true"></i>{{ station.listeners || 0 }} listeners
                      <span class="ms-2">{{ station.online !== false ? 'Live' : 'Offline' }}</span>
                    </p>
                  </div>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <button v-if="station.online !== false" @click="togglePlay(station.id)"
                      class="control-btn play-pause p-0"
                      :aria-label="isPlaying(station.id) ? 'Pause ' + station.name : 'Play ' + station.name"
                      :disabled="!station.url" :title="station.online === false ? 'Station is offline' : ''"
                      :style="'width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#10b981,#06b6ac);display:inline-flex;align-items:center;justify-content:center;border:none;box-shadow:0 10px 22px rgba(6,182,172,.25);transition:transform .12s ease, box-shadow .12s ease;'"
                      @mouseenter="$event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.32)'; $event.currentTarget.style.transform = 'translateY(-1px)';"
                      @mouseleave="$event.currentTarget.style.boxShadow = '0 10px 22px rgba(6,182,172,.25)'; $event.currentTarget.style.transform = '';">
                      <i class="bi"
                        :class="{ 'bi-pause-fill text-white': currentPlayingStationId === station.id && isPlaying(station.id), 'bi-play-fill text-white': currentPlayingStationId !== station.id || !isPlaying(station.id) }"
                        style="font-size:1.4rem;"></i>
                    </button>
                    <button class="btn btn-icon like-button p-2" @click="toggleLike(station)"
                      :aria-label="isLiked(station.id) ? 'Unlike ' + station.name : 'Like ' + station.name"
                      :title="isLiked(station.id) ? 'Unlike' : 'Like'"
                      style="border-radius:12px;border:1px solid #e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,.04);">
                      <i :class="{ 'bi-heart-fill text-danger': isLiked(station.id), 'bi-heart': !isLiked(station.id) }"
                        class="like-icon fs-5"></i>
                    </button>
                    <button class="btn btn-icon station-info-btn p-2" @click="openStationInfo(station)"
                      :aria-label="`More info about ${station.name}`" title="More info">
                      <i class="bi bi-info-circle"></i>
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
      <section id="reciters" class="mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold fs-3 text-dark"><img src="images/art.png" width="30" height="30" loading="lazy"
              decoding="async" alt="decorative" class="mb-1" /> Reciter Stations:</h3>
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
              <div class="station-list-item card-teal h-100"
                style="border-radius:20px;border:1px solid rgba(6,182,172,.18);box-shadow:0 6px 14px rgba(0,0,0,.06);transition:transform .12s ease, box-shadow .12s ease;"
                @mouseenter="$event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.22)'; $event.currentTarget.style.transform = 'translateY(-2px)';"
                @mouseleave="$event.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,.06)'; $event.currentTarget.style.transform = '';"
                :class="{ 'active-card': currentPlayingStationId === station.id }" :id="'station-' + station.id"
                role="listitem" :tabindex="focusedStationId === station.id ? 0 : -1"
                :aria-labelledby="'station-title-' + station.id" :data-station-id="station.id"
                @keydown="onStationKeydown(station.id, $event)" @focus="focusedStationId = station.id">
                <div class="card-body">
                  <div v-if="loginWarnings[station.id]" class="alert alert-warning station-login-warning" role="alert">
                    <i class="bi bi-shield-lock-fill" aria-hidden="true"></i>
                    <span>{{ loginWarnings[station.id] }}</span>
                    <a class="station-login-cta" href="/login">Log in</a>
                  </div>
                  <div class="d-flex align-items-start gap-3">
                    <img
                      :src="station.imageUrl"
                      :alt="`${station.name} image`"
                      class="station-avatar"
                      loading="lazy"
                      decoding="async"
                      @error="handleStationImageError(station)"
                    />
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 class="card-title station-title mb-1 fw-semibold" :id="'station-title-' + station.id"
                            v-html="highlightSearch(station.name)"></h5>
                          <p v-if="station.category || station.country" class="text-muted mb-1 fs-sm recitation-meta">
                            <span v-if="station.category">{{ station.category }}</span>
                            <span v-if="station.category && station.country" class="ms-1">·</span>
                            <span v-if="station.country" :class="{ 'ms-1': station.category }">{{ station.country }}</span>
                          </p>
                          <p v-if="station.shortInfo" class="station-short-info mb-2">{{ station.shortInfo }}</p>
                          <p class="station-meta-line mb-2">{{ station.style || 'Murattal' }}</p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                          <button class="btn btn-icon like-button p-2" @click="toggleLike(station)"
                            :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'"
                            :aria-pressed="isLiked(station.id)">
                            <i :class="isLiked(station.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"
                              class="like-icon fs-5"></i>
                          </button>
                          <button class="btn btn-icon station-info-btn p-2" @click="openStationInfo(station)"
                            :aria-label="`More info about ${station.name}`" title="More info">
                            <i class="bi bi-info-circle"></i>
                          </button>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center gap-2 fs-sm station-meta-line">
                          <span :title="`${station.listeners} listeners`"><i class="bi bi-headphones me-1" aria-hidden="true"></i>{{ station.listeners }}</span>
                          <span v-if="currentPlayingStationId === station.id && isPlaying(station.id)" class="fw-semibold">Now Playing</span>
                          <span>{{ getStationStatus(station.id).text }}</span>
                        </div>
                        <button v-if="station.online !== false" @click="togglePlay(station.id)"
                          class="control-btn play-pause p-0"
                          :aria-label="isPlaying(station.id) ? 'Pause playback' : 'Play playback'"
                          :aria-pressed="isPlaying(station.id)" :disabled="!station.url"
                          :title="station.online === false ? 'Station is offline' : ''"
                          :style="'width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#10b981,#06b6ac);display:inline-flex;align-items:center;justify-content:center;border:none;box-shadow:0 10px 22px rgba(6,182,172,.25);transition:transform .12s ease, box-shadow .12s ease;position:relative;overflow:hidden'"
                          @mouseenter="$event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.32)'; $event.currentTarget.style.transform = 'translateY(-1px)';"
                          @mouseleave="$event.currentTarget.style.boxShadow = '0 10px 22px rgba(6,182,172,.25)'; $event.currentTarget.style.transform = '';">
                          <i class="bi"
                            :class="{ 'bi-pause-fill text-white': currentPlayingStationId === station.id && isPlaying(station.id), 'bi-play-fill text-white': currentPlayingStationId !== station.id || !isPlaying(station.id) }"
                            style="font-size:1.4rem;"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="audio-player d-none">
                    <audio v-if="audioMountForId === station.id" :ref="(el) => audioRefs[station.id] = el"
                      :src="station.url" @play="handlePlay(station.id, $event)" @pause="handlePause(station.id)"
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
              style="border-radius:20px;background:#ffffff;border:1px solid rgba(6,182,172,.18);box-shadow:0 6px 14px rgba(0,0,0,.06);transition:transform .12s ease, box-shadow .12s ease;"
              @mouseenter="$event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.22)'; $event.currentTarget.style.transform = 'translateY(-2px)';"
              @mouseleave="$event.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,.06)'; $event.currentTarget.style.transform = '';"
              :class="{ 'active-card': currentPlayingStationId === station.id }" :id="'station-' + station.id"
              role="listitem" :tabindex="focusedStationId === station.id ? 0 : -1"
              :aria-labelledby="'station-title-' + station.id" :data-station-id="station.id"
              @keydown="onStationKeydown(station.id, $event)" @focus="focusedStationId = station.id">
                    <div class="card-body">
                      <div v-if="loginWarnings[station.id]" class="alert alert-warning station-login-warning" role="alert">
                        <i class="bi bi-shield-lock-fill" aria-hidden="true"></i>
                        <span>{{ loginWarnings[station.id] }}</span>
                        <a class="station-login-cta" href="/login">Log in</a>
                      </div>
                      <div class="d-flex align-items-start gap-3">
                  <img
                    :src="station.imageUrl"
                    :alt="`${station.name} image`"
                    class="station-avatar"
                    loading="lazy"
                    decoding="async"
                    @error="handleStationImageError(station)"
                  />
                  <div class="flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 class="card-title station-title mb-1 fw-semibold" :id="'station-title-' + station.id"
                          v-html="highlightSearch(station.name)"></h5>
                        <p v-if="station.category || station.country" class="text-muted mb-1 fs-sm recitation-meta">
                          <span v-if="station.category">{{ station.category }}</span>
                          <span v-if="station.category && station.country" class="ms-1">·</span>
                          <span v-if="station.country" :class="{ 'ms-1': station.category }">{{ station.country }}</span>
                        </p>
                        <p v-if="station.shortInfo" class="station-short-info mb-2">{{ station.shortInfo }}</p>
                        <p class="station-meta-line mb-2">{{ station.style || 'Murattal' }}</p>
                      </div>
                      <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-icon like-button p-2" @click="toggleLike(station)"
                          :aria-label="isLiked(station.id) ? 'Unlike station' : 'Like station'"
                          :aria-pressed="isLiked(station.id)">
                          <i :class="isLiked(station.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"
                            class="like-icon fs-5"></i>
                        </button>
                        <button class="btn btn-icon station-info-btn p-2" @click="openStationInfo(station)"
                          :aria-label="`More info about ${station.name}`" title="More info">
                          <i class="bi bi-info-circle"></i>
                        </button>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mt-2">
                      <div class="d-flex align-items-center gap-2 fs-sm station-meta-line">
                        <span :title="`${station.listeners} listeners`"><i class="bi bi-headphones me-1" aria-hidden="true"></i>{{ station.listeners }}</span>
                        <span v-if="currentPlayingStationId === station.id && isPlaying(station.id)" class="fw-semibold">Now Playing</span>
                        <span>{{ getStationStatus(station.id).text }}</span>
                      </div>
                      <button v-if="station.online !== false" @click="togglePlay(station.id)"
                        class="control-btn play-pause p-0"
                        :aria-label="isPlaying(station.id) ? 'Pause playback' : 'Play playback'"
                        :aria-pressed="isPlaying(station.id)" :disabled="!station.url"
                        :title="station.online === false ? 'Station is offline' : ''"
                        :style="'width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#10b981,#06b6ac);display:inline-flex;align-items:center;justify-content:center;border:none;box-shadow:0 10px 22px rgba(6,182,172,.25);transition:transform .12s ease, box-shadow .12s ease;position:relative;overflow:hidden'"
                        @mouseenter="$event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.32)'; $event.currentTarget.style.transform = 'translateY(-1px)';"
                        @mouseleave="$event.currentTarget.style.boxShadow = '0 10px 22px rgba(6,182,172,.25)'; $event.currentTarget.style.transform = '';">
                        <i class="bi"
                          :class="{ 'bi-pause-fill text-white': currentPlayingStationId === station.id && isPlaying(station.id), 'bi-play-fill text-white': currentPlayingStationId !== station.id || !isPlaying(station.id) }"
                          style="font-size:1.4rem;"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="audio-player d-none">
                  <audio v-if="audioMountForId === station.id" :ref="(el) => audioRefs[station.id] = el"
                    :src="station.url" @play="handlePlay(station.id, $event)" @pause="handlePause(station.id)"
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
          <div v-if="!allLoaded" ref="infiniteScrollSentinel"
            class="infinite-sentinel d-flex justify-content-center my-3" aria-hidden="true">
            <div v-if="isLoadingMore" class="spinner-border text-theme-teal" role="status"
              style="width: 2rem; height: 2rem;">
              <span class="visually-hidden">Loading more...</span>
            </div>
          </div>
        </div>
      </section>

    </div>

    <transition name="fade">
      <div
        v-if="selectedStationForInfo"
        class="imam-modal-backdrop"
        @click.self="closeStationInfo"
      >
        <div class="imam-modal" role="dialog" aria-modal="true" :aria-label="`About ${selectedStationForInfo.name}`">
          <div class="d-flex align-items-start justify-content-between gap-3 mb-3">
            <div class="d-flex align-items-start gap-3">
              <img
                :src="selectedStationForInfo.imageUrl"
                :alt="`${selectedStationForInfo.name} image`"
                class="station-avatar station-avatar-lg"
                @error="handleStationImageError(selectedStationForInfo)"
              />
              <div>
                <h4 class="mb-1">{{ selectedStationForInfo.name }}</h4>
                <p v-if="selectedStationForInfo.category || selectedStationForInfo.country" class="text-muted mb-2 recitation-meta">
                  <span v-if="selectedStationForInfo.category">{{ selectedStationForInfo.category }}</span>
                  <span v-if="selectedStationForInfo.category && selectedStationForInfo.country" class="ms-1">·</span>
                  <span v-if="selectedStationForInfo.country" :class="{ 'ms-1': selectedStationForInfo.category }">{{ selectedStationForInfo.country }}</span>
                </p>
                <p class="station-meta-line mb-0">{{ selectedStationForInfo.style || 'Murattal' }}</p>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-secondary" @click="closeStationInfo" aria-label="Close imam details">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <p class="mb-0 imam-long-info">{{ selectedStationLongInfo }}</p>
        </div>
      </div>
    </transition>

    <!-- Global Audio Player -->
    <transition name="global-audio-player">
      <div v-if="currentlyPlayingStation" class="global-audio-player shadow-lg" role="region"
        aria-label="Global audio player" aria-live="polite"
        :style="'position:fixed;left:0;right:0;bottom:0;padding:1.1rem 1.6rem;background:linear-gradient(180deg,#1d2f2a,#132520);border-top:1px solid rgba(255,255,255,.08);border-radius:18px 18px 0 0;box-shadow:0 -12px 34px rgba(0,0,0,.38);z-index:1000'">
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
import axios from 'axios';
import { fetchUserIdFromApi, resolveClientUserId } from '../utils/bookmarkAuth';

const storageUserId = ref(resolveClientUserId());
const isAuthenticated = ref(!!storageUserId.value);
const loginWarnings = reactive({});
const warningTimers = {};
const selectedStationForInfo = ref(null);

const sanitizeName = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const RECITER_IMAGE_PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
const buildReciterImageUrl = () => RECITER_IMAGE_PLACEHOLDER;
const imageLookupCache = new Map();
const reciterWikipediaTitles = markRaw({
  'mishary rashid alafasy': ['Mishary_Rashid_Alafasy'],
  'yasser al dosari': ['Yasser_Al-Dosari'],
  'abdul basit abdul samad': ["Abdul_Basit_'Abd_us-Samad"],
  'saad al ghamdi': ['Saad_Al-Ghamdi'],
  'maher al muaiqly': ['Maher_Al_Muaiqly'],
  'abdul rahman al sudais': ['Abdul-Rahman_Al-Sudais'],
  'saud al shuraim': ['Saud_Al-Shuraim'],
  'ahmad al ajmi': ['Ahmed_bin_Ali_Al-Ajmi'],
  'mahmoud khalil al hussary': ['Mahmoud_Khalil_Al-Hussary'],
  'nasser al qatami': ['Nasser_Al-Qatami'],
  'ali jaber': ['Ali_Jaber'],
  'muhammad al luhaidan': ['Muhammad_Al-Luhaidan']
});

const buildWikipediaTitleCandidates = (name = '') => {
  const normalized = sanitizeName(name);
  const mapped = reciterWikipediaTitles[normalized] || [];
  const generic = [
    name.trim().replace(/\s+/g, '_'),
    name.trim().replace(/\s+/g, '_').replace(/-/g, '_')
  ].filter(Boolean);
  return [...new Set([...mapped, ...generic])];
};

const fetchWikipediaImage = async (title) => {
  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const { data } = await axios.get(endpoint, { timeout: 5000 });
  return data?.thumbnail?.source || data?.originalimage?.source || '';
};

const resolveImamImageUrl = async (name = '') => {
  const key = sanitizeName(name);
  if (!key) return RECITER_IMAGE_PLACEHOLDER;
  if (imageLookupCache.has(key)) return imageLookupCache.get(key);
  const titles = buildWikipediaTitleCandidates(name);
  for (const title of titles) {
    try {
      const imageUrl = await fetchWikipediaImage(title);
      if (imageUrl) {
        imageLookupCache.set(key, imageUrl);
        return imageUrl;
      }
    } catch (error) {
      // keep trying next candidate title
    }
  }
  imageLookupCache.set(key, RECITER_IMAGE_PLACEHOLDER);
  return RECITER_IMAGE_PLACEHOLDER;
};

const imamProfileIndex = markRaw({
  'mishary rashid alafasy': {
    imageUrl: buildReciterImageUrl('Mishary Rashid Alafasy'),
    shortInfo: 'Kuwaiti reciter known for clear articulation and balanced murattal flow.',
    longInfo: 'Mishary Rashid Alafasy is widely recognized for precise tajwid and a steady pace that supports memorization and attentive listening. His recitation style is often used by students who want consistent rhythm and clear pronunciation.'
  },
  'yasser al dosari': {
    imageUrl: buildReciterImageUrl('Yasser Al-Dosari'),
    shortInfo: 'Saudi reciter with emotive, reflective delivery.',
    longInfo: 'Yasser Al-Dosari is known for expressive recitation that blends clarity with emotional depth. His station is often preferred for reflective listening and focused revision sessions.'
  },
  'abdul basit abdul samad': {
    imageUrl: buildReciterImageUrl('Abdul Basit Abdul Samad'),
    shortInfo: 'Legendary Egyptian reciter with a classic mujawwad tradition.',
    longInfo: 'Abdul Basit Abdul Samad remains one of the most influential Qur an reciters globally. His powerful breath control and distinct tonal style shaped generations of recitation practice.'
  },
  'saad al ghamdi': {
    imageUrl: buildReciterImageUrl('Saad Al-Ghamdi'),
    shortInfo: 'Saudi reciter known for smooth pacing and classroom-friendly style.',
    longInfo: 'Saad Al-Ghamdi is frequently chosen for daily review and repetition because his recitation is stable and easy to follow over longer sessions.'
  },
  'maher al muaiqly': {
    imageUrl: buildReciterImageUrl('Maher Al-Muaiqly'),
    shortInfo: 'Saudi imam with measured, calm, and highly structured recitation.',
    longInfo: 'Maher Al-Muaiqly is known for balanced tempo and clean articulation. Many learners use his recordings to support tajwid correction and consistent memorization cycles.'
  },
  'abdul rahman al sudais': {
    imageUrl: buildReciterImageUrl('Abdul Rahman Al-Sudais'),
    shortInfo: 'Makkah imam with recognizable tone and strong cadence.',
    longInfo: 'Abdul Rahman Al-Sudais is globally recognized through his leadership in the Haram. His recitation style emphasizes strong cadence and clear phrase boundaries.'
  },
  'saud al shuraim': {
    imageUrl: buildReciterImageUrl('Saud Al-Shuraim'),
    shortInfo: 'Saudi reciter with deliberate timing and well-marked stops.',
    longInfo: 'Saud Al-Shuraim is known for disciplined pacing and a recitation pattern that helps listeners identify waqf points and verse structure.'
  },
  'ahmad al ajmi': {
    imageUrl: buildReciterImageUrl('Ahmad Al-Ajmi'),
    shortInfo: 'Saudi reciter with soft, melodic murattal delivery.',
    longInfo: 'Ahmad Al-Ajmi is appreciated for a calm voice profile and smooth transitions, making his station useful for both passive listening and active review.'
  },
  'mahmoud khalil al hussary': {
    imageUrl: buildReciterImageUrl('Mahmoud Khalil Al-Hussary'),
    shortInfo: 'Egyptian master reciter famous for tajwid precision.',
    longInfo: 'Mahmoud Khalil Al-Hussary is often used as a reference for tajwid accuracy. His recitation is methodical and widely trusted for pronunciation training.'
  },
  'nasser al qatami': {
    imageUrl: buildReciterImageUrl('Nasser Al Qatami'),
    shortInfo: 'Saudi reciter with strong vocal texture and clear rhythm.',
    longInfo: 'Nasser Al-Qatami combines clear rhythm with expressive tone, making his station suitable for users who prefer energetic yet controlled delivery.'
  },
  'ali jaber': {
    imageUrl: buildReciterImageUrl('Ali Jaber'),
    shortInfo: 'Classic Makkah style with composed and dignified cadence.',
    longInfo: 'Ali Jaber remains highly respected for his elegant, measured recitation style. His recordings are often revisited for traditional cadence and clarity.'
  },
  'muhammad al luhaidan': {
    imageUrl: buildReciterImageUrl('Muhammad Al-Luhaidan'),
    shortInfo: 'Saudi reciter with reflective tone and balanced tempo.',
    longInfo: 'Muhammad Al-Luhaidan is known for reflective pacing and smooth tonal movement across longer passages, useful for sustained listening sessions.'
  }
});

const alquranMetaByIdentifier = ref({});
const alquranMetaByName = ref({});

const defaultPopularReciters = markRaw([
  {
    id: 1,
    name: 'Mishary Rashid Alafasy',
    url: 'https://qurango.net/radio/mishary_alafasy',
    fallbackUrl: 'https://backup.qurango.net/mishary_alafasy.mp3',
    style: 'Murattal',
    country: 'Kuwait',
    imageUrl: buildReciterImageUrl('Mishary Rashid Alafasy'),
    imageLoaded: true
  },
  {
    id: 2,
    name: 'Yasser Al-Dosari',
    url: 'https://qurango.net/radio/yasser_aldosari',
    fallbackUrl: 'https://backup.qurango.net/yasser_aldosari.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Yasser Al-Dosari'),
    imageLoaded: true
  },
  {
    id: 6,
    name: 'Abdul Basit Abdul Samad',
    url: 'https://qurango.net/radio/abdulbasit_abdulsamad_mujawwad',
    fallbackUrl: 'https://backup.qurango.net/abdulbasit_abdulsamad.mp3',
    style: 'Mujawwad',
    country: 'Egypt',
    imageUrl: buildReciterImageUrl('Abdul Basit Abdul Samad'),
    imageLoaded: true
  },
  {
    id: 3,
    name: 'Saad Al-Ghamdi',
    url: 'https://qurango.net/radio/saad_alghamdi',
    fallbackUrl: 'https://backup.qurango.net/saad_alghamdi.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Saad Al-Ghamdi'),
    imageLoaded: true
  },
  {
    id: 4,
    name: 'Maher Al-Muaiqly',
    url: 'https://qurango.net/radio/maher_almuaiqly',
    fallbackUrl: 'https://backup.qurango.net/maher_almuaiqly.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Maher Al-Muaiqly'),
    imageLoaded: true
  },
  {
    id: 5,
    name: 'Abdul Rahman Al-Sudais',
    url: 'https://qurango.net/radio/abdurrahman_alsudais',
    fallbackUrl: 'https://backup.qurango.net/abdurrahman_alsudais.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Abdul Rahman Al-Sudais'),
    imageLoaded: true
  },
  {
    id: 7,
    name: 'Saud Al-Shuraim',
    url: 'https://qurango.net/radio/saud_alshuraim',
    fallbackUrl: 'https://backup.qurango.net/saud_alshuraim.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Saud Al-Shuraim'),
    imageLoaded: true
  },
  {
    id: 8,
    name: 'Ahmad Al-Ajmi',
    url: 'https://qurango.net/radio/ahmad_alajmi',
    fallbackUrl: 'https://backup.qurango.net/ahmad_alajmi.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Ahmad Al-Ajmi'),
    imageLoaded: true
  },
  {
    id: 9,
    name: 'Mahmoud Khalil Al-Hussary',
    url: 'https://qurango.net/radio/mahmoud_khalil_alhussary',
    fallbackUrl: 'https://backup.qurango.net/mahmoud_khalil_alhussary.mp3',
    style: 'Murattal',
    country: 'Egypt',
    imageUrl: buildReciterImageUrl('Mahmoud Khalil Al-Hussary'),
    imageLoaded: true
  },
  {
    id: 10,
    name: 'Nasser Al Qatami',
    url: 'https://qurango.net/radio/nasser_alqatami',
    fallbackUrl: 'https://backup.qurango.net/nasser_alqatami.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Nasser Al Qatami'),
    imageLoaded: true
  },
  {
    id: 11,
    name: 'Ali Jaber',
    url: 'https://qurango.net/radio/ali_jaber',
    fallbackUrl: 'https://backup.qurango.net/ali_jaber.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Ali Jaber'),
    imageLoaded: true
  },
  {
    id: 12,
    name: 'Muhammad Al-Luhaidan',
    url: 'https://qurango.net/radio/muhammad_alluhaidan',
    fallbackUrl: 'https://backup.qurango.net/muhammad_alluhaidan.mp3',
    style: 'Murattal',
    country: 'Saudi Arabia',
    imageUrl: buildReciterImageUrl('Muhammad Al-Luhaidan'),
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
const selectedStationLongInfo = computed(() => {
  const station = selectedStationForInfo.value;
  if (!station) return '';
  return station.longInfo || station.shortInfo || 'Biography is not available yet for this reciter.';
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

const isFilterOpen = ref(true) // Start open by default (or false if you prefer collapsed)
const showAdvancedFilters = ref(false)

// Optional: computed to show active filter count
const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value !== 'All Categories' || sortBy.value !== 'default'
})

const hasAdvancedFiltersActive = computed(() => {
  return selectedCategory.value !== 'All Categories' || sortBy.value !== 'default'
})

const activeFilterCount = computed(() => {
  let count = 0
  if (searchQuery.value) count++
  if (selectedCategory.value !== 'All Categories') count++
  if (sortBy.value !== 'default') count++
  return count
})

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

const resolveProfile = (name) => {
  const normalized = sanitizeName(name);
  if (!normalized) return null;
  if (imamProfileIndex[normalized]) return imamProfileIndex[normalized];
  const foundKey = Object.keys(imamProfileIndex).find((key) => normalized.includes(key) || key.includes(normalized));
  return foundKey ? imamProfileIndex[foundKey] : null;
};

const resolveAlquranMeta = (station) => {
  const normalized = sanitizeName(station.name);
  if (!normalized) return null;
  if (alquranMetaByName.value[normalized]) return alquranMetaByName.value[normalized];
  const foundKey = Object.keys(alquranMetaByName.value).find((key) => normalized.includes(key) || key.includes(normalized));
  return foundKey ? alquranMetaByName.value[foundKey] : null;
};

const enrichStation = (station) => {
  const profile = resolveProfile(station.name);
  const meta = resolveAlquranMeta(station);
  const primaryImage =
    typeof station.imageUrl === 'string' && station.imageUrl.startsWith('http')
      ? station.imageUrl
      : profile?.imageUrl || buildReciterImageUrl();
  const metadata = {
    source: 'Quran Radio',
    identifier: (meta?.identifier || 'reciter').replace(/^ar\./i, ''),
    language: meta?.language || 'ar',
    format: meta?.format || 'audio',
    type: meta?.type || station.category || 'recitation'
  };

  return {
    ...station,
    imageUrl: primaryImage || buildReciterImageUrl(),
    shortInfo: profile?.shortInfo || station.shortInfo || '',
    longInfo: profile?.longInfo || station.longInfo || '',
    metadata
  };
};

const hydrateStationImages = async (stationList = []) => {
  await Promise.all(
    stationList.map(async (station) => {
      if (!station?.name) return;
      const resolvedImage = await resolveImamImageUrl(station.name);
      if (resolvedImage) station.imageUrl = resolvedImage;
    })
  );
};

const fetchAlquranReciterMetadata = async () => {
  try {
    const response = await fetch('https://api.alquran.cloud/v1/edition/format/audio');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const editions = Array.isArray(payload?.data) ? payload.data : [];
    const identifierMap = {};
    const nameMap = {};

    editions.forEach((edition) => {
      if (!edition?.identifier) return;
      const item = {
        identifier: edition.identifier,
        englishName: edition.englishName || edition.name || 'Unknown',
        language: edition.language || 'ar',
        format: edition.format || 'audio',
        type: edition.type || 'recitation'
      };
      identifierMap[item.identifier] = item;
      const nameKey = sanitizeName(item.englishName);
      if (nameKey && !nameMap[nameKey]) {
        nameMap[nameKey] = item;
      }
    });

    alquranMetaByIdentifier.value = identifierMap;
    alquranMetaByName.value = nameMap;
  } catch (error) {
    console.warn('Unable to fetch reciter metadata', error);
  }
};

const openStationInfo = async (station) => {
  const enriched = enrichStation(station);
  selectedStationForInfo.value = {
    ...enriched,
    longInfo: enriched.longInfo || enriched.shortInfo || 'Biography is not available yet for this reciter.'
  };
  const resolvedImage = await resolveImamImageUrl(enriched.name);
  if (!resolvedImage) return;
  station.imageUrl = resolvedImage;
  if (selectedStationForInfo.value && selectedStationForInfo.value.id === station.id) {
    selectedStationForInfo.value = {
      ...selectedStationForInfo.value,
      imageUrl: resolvedImage
    };
  }
};

const closeStationInfo = () => {
  selectedStationForInfo.value = null;
};

const onGlobalKeydown = (event) => {
  if (event.key === 'Escape' && selectedStationForInfo.value) {
    closeStationInfo();
  }
};

const handleStationImageError = (station) => {
  station.imageUrl = RECITER_IMAGE_PLACEHOLDER;
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
  if (!isAuthenticated.value) return;
  const station = defaultPopularReciters.find(s => s.id === id) || stations.value.find(s => s.id === id);
  if (!station) return;
  recentlyPlayed.value = recentlyPlayed.value.filter(s => s.id !== id);
  recentlyPlayed.value.unshift({ ...station, lastPlayed: new Date().toISOString() });
  if (recentlyPlayed.value.length > 10) recentlyPlayed.value.pop();
  saveRecentlyPlayed();
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
    await fetchAlquranReciterMetadata();
    const response = await fetch('https://mp3quran.net/api/v3/radios?language=eng');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    const apiStations = data.radios.map((radio) => ({
      id: radio.id + 1000,
      name: radio.name,
      url: radio.url,
      category: radio.category || assignCategory(radio.name),
      imageUrl: radio.image || buildReciterImageUrl(radio.name),
      imageLoaded: true,
      listeners: Math.floor(Math.random() * (1500 - 50) + 50) // Simulated listeners
    })).map(enrichStation);
    const defaultStationsWithListeners = defaultPopularReciters.map(station => ({
      ...station,
      listeners: Math.floor(Math.random() * (2500 - 200) + 200) // Higher listener count for popular ones
    })).map(enrichStation);

    stations.value = [
      ...defaultStationsWithListeners,
      ...apiStations.filter(apiStation => !defaultStationsWithListeners.some(pr => pr.id === apiStation.id)),
    ].filter(station => isValidUrl(station.url));

    filteredStations.value = stations.value;
    await hydrateStationImages(stations.value);
    initializeVolumes();
    loadLikedStations();
    loadRecentlyPlayed();
  } catch (error) {
    console.error('Failed to fetch stations:', error);
    fetchError.value = 'Failed to load stations. Using default reciters.';
    stations.value = [...defaultPopularReciters].map(enrichStation).filter(station => isValidUrl(station.url));
    filteredStations.value = stations.value;
    await hydrateStationImages(stations.value);
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

const clearSearch = () => {
  if (!searchQuery.value) return;
  searchQuery.value = '';
  filteredSuggestions.value = [];
  showSuggestions.value = false;
  highlightIndex.value = -1;
  handleSearch();
};

const clearAllFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'All Categories';
  sortBy.value = 'default';
  filteredSuggestions.value = [];
  showSuggestions.value = false;
  highlightIndex.value = -1;
  handleSearch();
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

const showLoginWarning = (station) => {
  const stationId = station?.id;
  if (!stationId) return;
  loginWarnings[stationId] = 'Please log in to save this station.';
  if (warningTimers[stationId]) clearTimeout(warningTimers[stationId]);
  warningTimers[stationId] = setTimeout(() => {
    delete loginWarnings[stationId];
    delete warningTimers[stationId];
  }, 5000);
};

const toggleLike = (station) => {
  if (!isAuthenticated.value) {
    showLoginWarning(station);
    return;
  }
  const index = likedStations.value.findIndex((s) => s.id === station.id);
  if (index === -1) {
    likedStations.value.push(station);
  } else {
    likedStations.value.splice(index, 1);
  }
  saveLikedStations();
};

const isLiked = (id) => likedStations.value.some((s) => s.id === id);

const loadLikedStations = () => {
  if (!isAuthenticated.value) {
    likedStations.value = [];
    return;
  }
  axios.get('/api/preferences/liked_reciters')
    .then((response) => {
      const liked = Array.isArray(response.data?.value) ? response.data.value : [];
      likedStations.value = liked.filter((s) => stations.value.some((station) => station.id === s.id));
    })
    .catch(() => {
      likedStations.value = [];
    });
};

const loadRecentlyPlayed = () => {
  if (!isAuthenticated.value) {
    recentlyPlayed.value = [];
    return;
  }
  axios.get('/api/preferences/reciter_recent')
    .then((response) => {
      const recent = Array.isArray(response.data?.value) ? response.data.value : [];
      recentlyPlayed.value = recent.filter((s) => stations.value.some((station) => station.id === s.id));
    })
    .catch(() => {
      recentlyPlayed.value = [];
    });
};

const saveLikedStations = () => {
  if (!isAuthenticated.value) return;
  axios.put('/api/preferences/liked_reciters', { value: likedStations.value }).catch(() => {});
};

const saveRecentlyPlayed = () => {
  if (!isAuthenticated.value) return;
  axios.put('/api/preferences/reciter_recent', { value: recentlyPlayed.value }).catch(() => {});
};

const resolveStorageScope = async () => {
  const resolvedId = await fetchUserIdFromApi();
  storageUserId.value = resolvedId;
  isAuthenticated.value = !!resolvedId;
  loadLikedStations();
  loadRecentlyPlayed();
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
  resolveStorageScope();
  fetchStations();
  window.addEventListener('keydown', onGlobalKeydown);
  // Initialize infinite scroll observer after initial fetch completes
  // A slight delay ensures the sentinel is in the DOM
  setTimeout(() => setupObserver(), 0);
  listenerInterval = setInterval(updateListenerCounts, 5000); // Update every 5 seconds
});

onBeforeUnmount(() => {
  clearInterval(listenerInterval);
  window.removeEventListener('keydown', onGlobalKeydown);
  Object.values(warningTimers).forEach((timerId) => clearTimeout(timerId));
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
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.35s ease;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.radio-shell {
  border-radius: 28px;
  background:
    radial-gradient(1200px 420px at 12% -18%, rgba(16, 185, 129, 0.12), transparent 52%),
    radial-gradient(980px 380px at 95% -26%, rgba(14, 165, 233, 0.12), transparent 58%),
    linear-gradient(180deg, #f8fbff 0%, #f6fffc 48%, #f7fafc 100%);
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);
}

.station-content {
  gap: 0.75rem;
}

.station-title {
  display: block;
  line-height: 1.2;
  margin-bottom: 0.28rem;
  color: #0b1320;
  font-weight: 800 !important;
  letter-spacing: -0.01em;
}

.station-avatar {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  object-fit: cover;
  border: 1px solid rgba(6, 182, 172, 0.2);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
  flex-shrink: 0;
}

.station-avatar-lg {
  width: 74px;
  height: 74px;
}

.station-short-info {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.35;
}

.recitation-meta {
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}

.station-meta-line {
  font-size: 0.8rem;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.station-info-btn {
  border-radius: 12px;
  border: 1px solid #dbe3ef;
  color: #0f766e;
}

.station-info-btn:hover {
  background: #ecfdf5;
}

.station-list-item,
.station-card-focusable {
  border-radius: 20px !important;
  border: 1px solid rgba(14, 116, 144, 0.2) !important;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 255, 252, 0.98) 100%) !important;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08) !important;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease !important;
}

.station-list-item:hover,
.station-card-focusable:hover {
  transform: translateY(-3px);
  border-color: rgba(20, 184, 166, 0.35) !important;
  box-shadow: 0 20px 35px rgba(2, 44, 34, 0.14) !important;
}

.station-list-item.active-card,
.station-card-focusable.active-card {
  border-color: rgba(13, 148, 136, 0.58) !important;
  box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.14), 0 16px 30px rgba(2, 44, 34, 0.16) !important;
}

.imam-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1500;
  background: rgba(2, 6, 23, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.imam-modal {
  width: min(720px, 100%);
  max-height: 88vh;
  overflow-y: auto;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: linear-gradient(155deg, #ffffff 0%, #f8fffe 55%, #eefcf9 100%);
  box-shadow: 0 24px 45px rgba(2, 6, 23, 0.3);
  padding: 1.2rem;
}

.imam-long-info {
  color: #1e293b;
  line-height: 1.6;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
  max-height: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}

.cursor-pointer {
  cursor: pointer;
  user-select: none;
}

/* Optional: make header look clickable */
.cursor-pointer:hover {
  opacity: 0.9;
}

.station-login-warning {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  border: 1px solid rgba(217, 119, 6, 0.35);
  background: linear-gradient(135deg, rgba(255, 242, 214, 0.98), rgba(255, 235, 205, 0.92));
  color: #7a4b00;
  box-shadow: 0 10px 18px rgba(217, 119, 6, 0.12);
  font-weight: 600;
  font-size: 0.92rem;
  margin-bottom: 0.75rem;
}

.station-login-warning i {
  font-size: 1.05rem;
}

.station-login-cta {
  margin-left: auto;
  text-decoration: none;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(122, 75, 0, 0.3);
  background: #fff7e6;
  color: #7a4b00;
  font-weight: 700;
  font-size: 0.76rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.station-login-cta:hover {
  background: #fff1cf;
  color: #6a3f00;
}

.filters-panel {
  border-radius: 16px;
  padding: 0.75rem 0.8rem 0.82rem;
  border: 1px solid rgba(14, 116, 144, 0.24);
  background: linear-gradient(140deg, rgba(248, 252, 255, 0.94) 0%, rgba(236, 253, 250, 0.92) 45%, rgba(245, 250, 255, 0.95) 100%);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.62);
  position: sticky;
  top: 6px;
  z-index: 40;
  backdrop-filter: saturate(130%) blur(9px);
  -webkit-backdrop-filter: saturate(130%) blur(9px);
}

.favorite-section-toggle {
  display:flex;
  align-items:center;
  gap:.5rem;
  background:none;
  border:none;
  padding:0;
  color:#0b1320;
  cursor:pointer;
  font-weight:700;
}

.favorite-section-toggle:focus-visible {
  outline:2px dashed rgba(11, 128, 111, 0.7);
  outline-offset:4px;
}

.filter-header {
  padding: 0.24rem 0.28rem;
  border-radius: 10px;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-header:hover {
  background: rgba(255, 255, 255, 0.48);
}

.filter-header:focus-visible {
  outline: 2px solid rgba(20, 184, 166, 0.38);
  outline-offset: 2px;
}

.filter-header-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0ea5a3, #06b6d4);
  color: #ffffff;
  box-shadow: 0 5px 12px rgba(14, 165, 163, 0.2);
}

.filter-title {
  font-size: 0.96rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #0f172a;
}

.filter-meta {
  flex-shrink: 0;
}

.station-card-focusable {
  border-radius: 20px;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.station-card-focusable:focus-visible {
  outline: 2px solid rgba(11, 128, 111, 0.6);
  outline-offset: 4px;
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(6, 182, 172, 0.25);
}

.filter-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.35);
  color: #0f766e;
  font-size: 0.82rem;
}

.filter-panel-body {
  padding: 0.45rem 0.28rem 0.1rem;
}

.filter-badge {
  font-size: 0.66rem;
  padding: 0.18rem 0.52rem;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.18);
}

.filter-label {
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #334155;
}

.search-input-wrap,
.select-wrap {
  position: relative;
}

.search-input-icon,
.select-icon {
  position: absolute;
  left: 0.68rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 0.82rem;
  pointer-events: none;
}

.filters-panel .filter-input,
.filters-panel .filter-select {
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
  min-height: 40px;
  font-size: 0.9rem;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filters-panel .filter-input:focus,
.filters-panel .filter-select:focus {
  border-color: rgba(13, 148, 136, 0.8);
  box-shadow: 0 0 0 0.24rem rgba(20, 184, 166, 0.16);
}

.filter-input-search {
  padding: 0.45rem 2rem 0.45rem 1.95rem;
}

.filter-select-with-icon {
  padding-left: 1.95rem;
  padding-right: 1.8rem;
}

.search-clear-btn {
  position: absolute;
  right: 0.42rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  width: 23px;
  height: 23px;
  border-radius: 999px;
  background: rgba(226, 232, 240, 0.8);
  color: #334155;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
}

.search-clear-btn:hover {
  background: rgba(203, 213, 225, 0.95);
}

.search-suggestions {
  margin-top: 0.36rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(15, 23, 42, 0.08);
  max-height: 180px;
  overflow-y: auto;
}

.search-suggestion-item {
  width: 100%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.38rem;
  padding: 0.45rem 0.62rem;
  color: #1e293b;
  font-size: 0.84rem;
  text-align: left;
}

.search-suggestion-item:hover,
.search-suggestion-item.active {
  background: rgba(20, 184, 166, 0.14);
  color: #0f172a;
}

.advanced-toggle-btn {
  border: 1px solid rgba(148, 163, 184, 0.42);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  color: #0f172a;
  width: 26px;
  height: 26px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.76rem;
  line-height: 1;
  flex-shrink: 0;
}

.advanced-toggle-btn:hover {
  border-color: rgba(13, 148, 136, 0.52);
  background: #ffffff;
}

.advanced-toggle-btn.is-active {
  border-color: rgba(13, 148, 136, 0.62);
  background: rgba(204, 251, 241, 0.8);
  color: #0f766e;
}

.advanced-toggle-btn:focus-visible {
  outline: 2px solid rgba(20, 184, 166, 0.28);
  outline-offset: 2px;
}

.advanced-filter-grid {
  padding-top: 0.15rem;
}

.filter-reset-btn {
  border: none;
  background: transparent;
  color: #0f766e;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.filter-reset-btn:hover {
  color: #115e59;
}

.card-teal {
  border-radius: 20px;
  border: 1px solid rgba(20, 184, 166, 0.22);
  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.card-teal:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(2, 44, 34, 0.12);
}

button.control-btn.play-pause:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button.control-btn.play-pause:disabled i.bi-play-circle-fill {
  color: #6c757d !important;
  /* Force gray color for disabled play buttons */
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

.form-control:not(.filter-input),
.form-select:not(.filter-select) {
  border: none;
  border-radius: 20px;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: #495057;
  transition: box-shadow 0.2s ease;
}

.form-control:not(.filter-input):focus,
.form-select:not(.filter-select):focus {
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
  border: 2px solid #228B22;
  /* Blue border to highlight */
  box-shadow: 0 4px 12px rgba(34, 139, 34, 0.3);
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

  .radio-shell {
    border-radius: 18px;
  }

  .station-avatar {
    width: 48px;
    height: 48px;
    border-radius: 14px;
  }

  .station-avatar-lg {
    width: 60px;
    height: 60px;
  }

  .station-short-info {
    font-size: 0.84rem;
  }

  .station-meta-line {
    font-size: 0.72rem;
  }

  .imam-modal {
    padding: 0.9rem;
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

  .form-control:not(.filter-input),
  .form-select:not(.filter-select) {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }

  .filters-panel {
    padding: 0.65rem;
    top: 6px;
  }

  .filter-title {
    font-size: 0.88rem;
  }

  .filter-meta {
    margin-left: auto;
  }

  .filter-header-icon {
    width: 24px;
    height: 24px;
  }

  .filter-chevron {
    width: 22px;
    height: 22px;
    font-size: 0.72rem;
  }

  .filter-badge {
    font-size: 0.62rem;
    padding: 0.14rem 0.45rem;
  }

  .filter-panel-body {
    padding: 0.48rem 0.05rem 0.08rem;
  }

  .filters-panel .filter-input,
  .filters-panel .filter-select {
    min-height: 38px;
    font-size: 0.86rem;
  }

  .filter-input-search {
    padding-right: 1.95rem;
  }

  .advanced-toggle-btn {
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
  }

  .filter-reset-btn {
    font-size: 0.68rem;
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
  color: #228B22;
}

/* In station cards specifically, enforce darker teal for readability over light tiles */
.station-list-item .text-theme-teal {
  color: #228B22;
}
</style>
