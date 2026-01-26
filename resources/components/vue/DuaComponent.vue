<template>
  <main class="container-fluid py-4 dua-shell" role="main" aria-labelledby="dua-title">
    <!-- Hero Section -->
    <header class="hero-section mb-5">
      <h1 id="dua-title" class="fw-bold text-center mb-3 dua-title">Dua Collection</h1>
      <p class="text-center container lead mb-4 dua-lead">
        Explore a curated selection of authentic Islamic supplications, organized into categories like forgiveness,
        protection, and gratitude.
      </p>
    </header>

    <!-- <div class="container dua-next-step-wrap">
      <div class="mx-auto mb-4 dua-next-step">
        <button type="button" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
          :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'" @click="toggleNextStepMinimized"
          class="next-step-toggle">
          <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
        </button>
        <div class="d-flex align-items-start gap-3 text-start">
          <div class="flex-shrink-0 mt-1">
            <div class="next-step-icon-circle" role="img" aria-label="Gentle audio guide for new Muslims">
              <i class="fas fa-assistive-listening-systems" aria-hidden="true"></i>
            </div>
          </div>
          <div class="flex-grow-1">
            <p class="mb-2 fw-semibold text-uppercase next-step-eyebrow">
              NEXT STEP
            </p>
            -- Minimized teaser --
            <div v-show="nextStepMinimized" class="mb-2 d-inline-flex align-items-center gap-1 next-step-teaser">
              <a href="/name" class="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 next-step-link"
                aria-label="Open the 99 Names of Allah journey">
                Continue to the 99 Names of Allah
                <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
            <p v-show="!nextStepMinimized" class="mb-3 next-step-text">
              Ready for your next gentle step? Explore the
              <a href="/name" class="fw-semibold text-decoration-none next-step-link">
                99 Names of Allah
              </a>
              with Arabic and English names, meanings, descriptions, quick search, and favorites.
            </p>
            <div v-show="!nextStepMinimized" class="d-flex flex-wrap gap-2">
              <a href="/name" class="btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center next-step-cta">
                <span>Explore 99 Names of Allah</span>
                <i class="fas fa-praying-hands ms-2" aria-hidden="true"></i>

                <span class="visually-hidden">Opens the accessible 99 Names of Allah experience</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Error Message -->
    <transition name="fade">
      <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
        {{ errorMessage }}
      </div>
    </transition>

    <!-- Loading/Empty States -->
    <div v-if="isLoading && !errorMessage" class="text-center my-5">
      <div class="spinner-border text-success" role="status" aria-label="Loading"></div>
      <div class="mt-2 text-muted">Loading duas…</div>
    </div>

    <!-- Search Input -->
    <div class="container mb-4">
      <div class="row g-2 align-items-stretch justify-content-center" role="search">
        <div class="col-10 col-sm-10 col-md-11">
          <div class="input-group shadow-sm rounded-4 overflow-hidden h-100 dua-search">
            <span class="input-group-text text-white border-0 search-icon">
              <i class="bi bi-search"></i>
            </span>
            <input v-model="searchQuery" type="text" class="form-control border-0 py-3 h-100"
              placeholder="Search duas by title, Arabic words, translation, or reference" aria-label="Search duas"
              @input="resetPagination" />
          </div>
        </div>
        <div class="col-2 col-sm-2 col-md-1">
          <button type="button"
            class="btn w-100 h-100 d-flex align-items-center justify-content-center shadow-sm rounded-4"
            :class="hasActiveFilters ? 'btn-secondary text-white border-0' : 'btn-outline-secondary'"
            :disabled="!hasActiveFilters" @click="clearSearch" aria-label="Clear search and filters">
            <i class="bi bi-x-lg fs-4"></i>
            <span class="visually-hidden">Clear filters</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Tabs for All Duas and Liked Duas -->
    <div class="container mb-4">
      <ul class="nav nav-tabs justify-content-center" role="tablist">
        <li class="nav-item">
          <a class="nav-link" :class="{ active: viewMode === 'all' }" href="#"
            role="tab"
            id="tab-all"
            aria-controls="dua-panel"
            :aria-selected="viewMode === 'all'"
            @click.prevent="viewMode = 'all'; resetPagination()"
            @keydown.enter.prevent="viewMode = 'all'; resetPagination()"
            @keydown.space.prevent="viewMode = 'all'; resetPagination()">
            All Duas
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: viewMode === 'liked' }" href="#"
            role="tab"
            id="tab-liked"
            aria-controls="dua-panel"
            :aria-selected="viewMode === 'liked'"
            @click.prevent="viewMode = 'liked'; resetPagination()"
            @keydown.enter.prevent="viewMode = 'liked'; resetPagination()"
            @keydown.space.prevent="viewMode = 'liked'; resetPagination()">
            Liked Duas
            <span v-if="likedDuasCount > 0" class="badge bg-danger ms-1">{{ likedDuasCount }}</span>
          </a>
        </li>
      </ul>
      <transition name="fade">
        <div v-if="authWarning" class="alert alert-warning auth-warning text-center mt-3" role="alert">
          <i class="bi bi-shield-lock-fill me-2" aria-hidden="true"></i>
          <span>{{ authWarning }}</span>
          <a class="auth-warning-cta ms-2" href="/login">Log in</a>
        </div>
      </transition>
      <!-- Clear All Liked Duas Button -->
      <div v-if="viewMode === 'liked' && likedDuasCount > 0" class="text-center mt-3">
        <button class="btn btn-outline-danger" :class="{ disabled: likedDuasCount === 0 }" @click="clearAllLikedDuas"
          aria-label="Clear all liked duas">
          <i class="bi bi-trash-fill me-1"></i>
          {{ actionFeedback['clearAll'] ? 'Cleared!' : 'Clear All Liked Duas' }}
        </button>
      </div>
    </div>

    <!-- Category and Reference Dropdowns -->
    <div v-if="viewMode === 'all'" class="container premium-action-button--outline mb-4 dua-filter-panel">
      <div class="row g-3">
        <div class="col-md-6">
          <div class="dropdown-card">
            <h5 class="dropdown-label">
              <div class="fw-bold">Select a Category:</div>
            </h5>
            <select v-model="selectedCategory" class="form-select" @change="resetPagination">
              <option value="">All Categories</option>
              <option v-for="category in duaCollection" :key="category.id" :value="category.id">
                {{ category.name }} ({{ category.duas.length }})
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="dropdown-card">
            <h5 class="dropdown-label">
              <div class="fw-bold">Select a Reference:</div>
            </h5>
            <select v-model="selectedReference" class="form-select" @change="resetPagination">
              <option value="">All References</option>
              <option v-for="reference in uniqueReferences" :key="reference.full" :value="reference.full">
                {{ reference.display }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Copy Success Message -->
    <transition name="slide-fade">
      <div v-if="showCopyMessage" class="alert alert-success alert-dismissible fade show mx-auto copy-message"
        role="alert">
        <i class="bi bi-check-circle-fill me-2"></i>Copied to clipboard
        <button type="button" class="btn-close" @click="showCopyMessage = false" aria-label="Close"></button>
      </div>
    </transition>

    <!-- Duas Display -->
    <div class="container" id="dua-panel" role="tabpanel"
      :aria-labelledby="viewMode === 'all' ? 'tab-all' : 'tab-liked'">
      <div v-if="filteredDuas.length === 0" class="alert no-duas-message text-center position-relative" role="status"
        aria-live="polite" :class="alertClass">
        <div v-if="filteredDuas.length === 0" class="text-center py-5 rounded-4 dua-empty" role="status" aria-live="polite">
          <div class="py-4">
            <!-- Icon -->
            <i class="bi fs-1 mb-4 d-block" :class="viewMode === 'liked' ? 'bi-heart-fill' : 'bi-search'"
              ></i>

            <!-- Message -->
            <p class="mb-4 fw-medium fs-5 dua-empty-text">
              {{ viewMode === 'liked'
                ? 'No liked duas yet. Start liking duas to see them here'
                : 'No duas found for your search' }}
            </p>

            <!-- Explore Button (only in liked mode) -->
            <button v-if="viewMode === 'liked'" @click="viewMode = 'all'; resetPagination()"
              class="btn border-0 fw-semibold px-5 py-3 rounded-pill shadow-lg text-white dua-empty-cta">
              Explore All Duas
            </button>
          </div>
        </div>
      </div>

      <div v-for="category in filteredDuas" :key="category.id" class="mb-5" role="region"
        :aria-labelledby="`category-title-${category.id}`">
          <div class="d-flex align-items-center justify-content-between category-header mb-3">
            <h5 class="fw-semibold text-start mb-3 category-title" :id="`category-title-${category.id}`">
              <img src="images/art.png" width="30px" class="me-2" alt="Category icon" />
              {{ category.name }}
            </h5>
            <div class="d-flex align-items-center gap-3">
              <button type="button" class="category-toggle"
                :class="category.collapsed ? 'collapsed' : 'expanded'"
                @click="toggleCategoryCollapse(category.id)"
                :aria-expanded="!category.collapsed"
                :title="category.collapsed ? 'Expand Category' : 'Collapse Category'">
                <i :class="category.collapsed ? 'bi bi-chevron-down' : 'bi bi-chevron-up'"></i>
              </button>
            </div>
          </div>

        <div v-if="!category.collapsed" class="row g-3" role="list">
          <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-12 col-md-6">
            <div class="card dua-card h-100 border-0 shadow-sm position-relative"
              :class="{ 'border-start border-danger border-3': viewMode === 'liked' }"
              :style="{ '--font-size-base': fontSize + 'px' }" role="listitem" :aria-labelledby="`dua-title-${dua.id}`">

          
              <!-- Card Body -->
              <div class="card-body d-flex flex-column p-3 p-md-4 text-black">
                <div v-if="loginWarnings[dua.id]" class="alert alert-warning dua-login-warning" role="alert">
                  <i class="bi bi-shield-lock-fill me-2" aria-hidden="true"></i>
                  <span>{{ loginWarnings[dua.id] }}</span>
                  <a class="auth-warning-cta ms-2" href="/login">Log in</a>
                </div>
                <!-- Title with icon -->
                <div class="dua-card-title-row mb-3">
                  <span class="dua-card-icon" aria-hidden="true">
                    <img src="images/art.png" width="20" height="20" alt="" />
                  </span>
                  <h4 class="card-title fw-semibold mb-0" :id="`dua-title-${dua.id}`"
                    :style="{ fontSize: 'calc(var(--font-size-base) * 1)' }">
                    <span v-html="highlightText(dua.title)"></span>
                  </h4>
                </div>

                <!-- Arabic Text -->
                <div class="dua-card-arabic-panel shadow-sm mb-3">
                  <p class="mb-0 font-arabic" lang="ar" dir="rtl"
                    :style="{ fontSize: 'calc(var(--font-size-base) * 1.5)', lineHeight: '2.5' }"
                    v-html="highlightText(dua.arabic)" aria-label="Dua in Arabic"></p>
                </div>

                <!-- Translation -->
                <div class="dua-card-translation-wrap mb-2">
                  <p class="mb-0 translation-text text-muted"
                    :style="{ fontSize: 'calc(var(--font-size-base))', lineHeight: '1.6' }"
                    v-html="highlightText(dua.translation)" aria-label="Dua translation"></p>
                </div>

                <!-- Reference -->
                <p class="text-muted mb-0 reference-text" :style="{ fontSize: 'calc(var(--font-size-base) * 0.9)' }"
                  v-html="highlightText('- ' + dua.reference)" aria-label="Dua reference"></p>
              </div>

              <!-- Card Footer with Actions -->
              <div class="card-footer dua-card-footer border-0 px-3 py-2 py-md-3">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <!-- Font Controls -->
                  <div class="d-flex align-items-center rounded-pill px-2 shadow-sm font-control">
                    <button class="btn btn-link p-1 font-control-btn" @click="changeFontSize('decrease')"
                      :disabled="fontSize <= 14" aria-label="Decrease Font Size">
                      <i class="bi bi-dash-circle-fill fs-5"></i>
                    </button>
                    <span class="mx-1 bg-light" style="width: 1px; height: 20px;"></span>
                    <button class="btn btn-link p-1 font-control-btn" @click="changeFontSize('increase')"
                      :disabled="fontSize >= 28" aria-label="Increase Font Size">
                      <i class="bi bi-plus-circle-fill fs-5"></i>
                    </button>
                  </div>

                  <!-- Action Buttons -->
                  <div class="d-flex gap-2">
                    <!-- <button
                      :class="getAudioButtonClasses(dua)"
                      style="width: 36px; height: 36px;" @click="handleAudioPlayback(dua)"
                      :aria-label="isAudioPlaying(dua) ? 'Stop Dua audio' : 'Play Dua audio'">
                      <i :class="isAudioPlaying(dua) ? 'bi bi-stop-fill' : 'bi bi-volume-up-fill'"></i>
                      <span class="action-tooltip">
                        {{ isAudioPlaying(dua) ? 'Stop audio' : hasRecordedAudio(dua) ? 'Play recorded dua' : 'Play spoken dua' }}
                      </span>
                    </button> -->

                    <button
                      class="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn action-circle"
                      @click="toggleLike(dua.id)"
                      :aria-label="likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'">
                      <i :class="likedDuas.includes(dua.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
                      <span class="action-tooltip">{{ likedDuas.includes(dua.id) ? 'Unlike' : 'Like' }}</span>
                    </button>

                    <button
                      class="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn action-circle"
                      @click="shareOnWhatsApp(dua)" aria-label="Share on WhatsApp">
                      <i class="bi bi-share-fill"></i>
                      <span class="action-tooltip">Share</span>
                    </button>

                    <button
                      class="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn action-circle"
                      @click="copyContent(dua)" aria-label="Copy Content">
                      <i class="bi bi-clipboard-fill"></i>
                      <span class="action-tooltip">Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="!category.collapsed && category.duas.length > duasPerPage"
          class="d-flex justify-content-center mt-4">
          <nav aria-label="Dua pagination">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage[category.id] === 1 }">
                <button class="page-link" @click="changePage('prev', category.id)" aria-label="Previous page">
                  <span aria-hidden="true">&laquo; Previous</span>
                </button>
              </li>
              <li v-for="page in totalPages(category.duas)" :key="page" class="page-item"
                :class="{ active: currentPage[category.id] === page }">
                <button class="page-link" @click="currentPage[category.id] = page">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage[category.id] === totalPages(category.duas) }">
                <button class="page-link" @click="changePage('next', category.id)" aria-label="Next page">
                  <span aria-hidden="true">Next &raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>

<script src="../scripts/DuaComponent.script.js"></script>
<style scoped src="../styles/DuaComponent.style.css"></style>
