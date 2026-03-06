<template>
  <main class="container-fluid dua-shell py-4" role="main" aria-labelledby="dua-title">
    <section class="container-fluid dua-content-shell dua-hero mb-4">
      <div class="dua-hero-text">
        <p class="dua-kicker mb-2">Dua Collection</p>
        <h1 id="dua-title" class="fw-bold mb-2 dua-title">Dua Library</h1>
        <p class="dua-hero-subtitle mb-0 dua-lead">
          Find authentic duas by theme, then save or share what you need.
        </p>
      </div>
    </section>

    <section class="container-fluid dua-content-shell mb-3" aria-label="Sources and authenticity disclaimer">
      <div class="dua-disclaimer-banner">
        <p class="dua-disclaimer-note mb-0">
          <strong>Resources & Attribution | Sources & Authenticity:</strong>
          We do not claim ownership of this content. These duas are compiled from authentic Islamic sources including the Qur'an, Sahih al-Bukhari, Sahih Muslim, and other trusted hadith collections.
        </p>
      </div>
    </section>

    <section class="container-fluid dua-content-shell dua-tab-panel mb-3">
      <div class="dua-tab-row" role="tablist" aria-label="Dua view">
        <button
          id="tab-all"
          type="button"
          class="dua-tab-btn"
          role="tab"
          :class="{ active: viewMode === 'all' }"
          aria-controls="dua-panel"
          :aria-selected="viewMode === 'all'"
          @click="viewMode = 'all'; resetPagination()"
          @keydown.enter.prevent="viewMode = 'all'; resetPagination()"
          @keydown.space.prevent="viewMode = 'all'; resetPagination()">
          <span class="dua-tab-btn-icon" aria-hidden="true">
            <i class="bi bi-collection-fill"></i>
          </span>
          <span class="dua-tab-btn-copy">
            <span class="dua-tab-btn-label">All Duas</span>
            <span class="dua-tab-btn-meta">{{ allDuasCount }} total</span>
          </span>
        </button>
        <button
          id="tab-liked"
          type="button"
          class="dua-tab-btn"
          role="tab"
          :class="{ active: viewMode === 'liked' }"
          aria-controls="dua-panel"
          :aria-selected="viewMode === 'liked'"
          @click="viewMode = 'liked'; resetPagination()"
          @keydown.enter.prevent="viewMode = 'liked'; resetPagination()"
          @keydown.space.prevent="viewMode = 'liked'; resetPagination()">
          <span class="dua-tab-btn-icon" aria-hidden="true">
            <i class="bi bi-heart-fill"></i>
          </span>
          <span class="dua-tab-btn-copy">
            <span class="dua-tab-btn-label">Liked Duas</span>
            <span class="dua-tab-btn-meta">{{ likedDuasCount }} saved</span>
          </span>
        </button>
      </div>
      <transition name="fade">
        <div v-if="authWarning" class="alert alert-warning auth-warning text-center mt-3" role="alert">
          <i class="bi bi-shield-lock-fill me-2" aria-hidden="true"></i>
          <span>{{ authWarning }}</span>
          <a class="auth-warning-cta ms-2" href="/login">Log in</a>
        </div>
      </transition>
      <div v-if="viewMode === 'liked' && likedDuasCount > 0" class="text-end mt-3">
        <button class="btn btn-sm btn-outline-danger rounded-pill action-pill" :class="{ disabled: likedDuasCount === 0 }"
          @click="clearAllLikedDuas" aria-label="Clear all liked duas">
          <i class="bi bi-trash-fill me-1"></i>
          {{ actionFeedback['clearAll'] ? 'Cleared!' : 'Clear All Liked Duas' }}
        </button>
      </div>
    </section>

    <section class="container-fluid dua-content-shell mb-3 dua-search-wrapper" role="search">
      <div class="dua-search-card p-3">
        <div class="d-flex justify-content-between align-items-center gap-2 mb-3 flex-wrap">
          <p class="dua-results-note mb-0">
            <strong>{{ visibleDuasCount }}</strong>
            {{ visibleDuasCount === 1 ? 'dua matches your current view' : 'duas match your current view' }}
          </p>
          <button
            v-if="hasActiveFilters"
            type="button"
            class="btn btn-sm btn-outline-secondary rounded-pill px-3"
            @click="clearSearch">
            Reset filters
          </button>
        </div>
        <div class="row g-3 align-items-stretch">
          <div class="col-md-6">
            <label class="form-label visually-hidden" for="dua-search-input">Search duas</label>
            <div class="dua-search-input">
              <input
                id="dua-search-input"
                v-model="searchQuery"
                type="text"
                class="form-control border-0 py-2"
                placeholder="Search by title, Arabic, translation, or reference"
                aria-label="Search duas"
                @input="resetPagination" />
              <button
                type="button"
                class="dua-clear-btn"
                :disabled="!hasActiveFilters"
                @click="clearSearch"
                aria-label="Clear filters">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
          <div class="col-6 col-md-3" v-if="viewMode === 'all'">
            <label class="form-label visually-hidden" for="dua-category-select">Select category</label>
            <select
              id="dua-category-select"
              v-model="selectedCategory"
              class="form-select dua-filter-select"
              @change="resetPagination">
              <option value="">All Categories</option>
              <option v-for="category in duaCollection" :key="category.id" :value="category.id">
                {{ category.name }} ({{ category.duas.length }})
              </option>
            </select>
          </div>
          <div class="col-6 col-md-3" v-if="viewMode === 'all'">
            <label class="form-label visually-hidden" for="dua-reference-select">Select reference</label>
            <select
              id="dua-reference-select"
              v-model="selectedReference"
              class="form-select dua-filter-select"
              @change="resetPagination">
              <option value="">All References</option>
              <option v-for="reference in uniqueReferences" :key="reference.full" :value="reference.full">
                {{ reference.display }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="showDuaRecommender"
      class="container-fluid dua-content-shell mb-4"
      aria-labelledby="dua-recommender-title">
      <div class="dua-recommender-panel">
        <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-2">
          <div>
            <h2 id="dua-recommender-title" class="dua-recommender-title mb-1">Dua Recommender</h2>
            <p class="dua-recommender-subtitle mb-0">
              Share how you feel and get relevant duas you can read right away.
            </p>
          </div>
          <button
            v-if="recommendationInput || recommendationDuas.length || recommendationError"
            type="button"
            class="btn btn-sm btn-outline-secondary rounded-pill px-3"
            @click="clearDuaRecommendation">
            Clear
          </button>
        </div>

        <div class="row g-2">
          <div class="col-12 col-md-9">
            <input
              v-model="recommendationInput"
              type="text"
              class="form-control dua-recommender-input"
              placeholder="Example: I'm really stressed about my exams"
              aria-label="Describe how you feel"
              @keydown.enter.prevent="runDuaRecommendation" />
          </div>
          <div class="col-12 col-md-3 d-grid">
            <button
              type="button"
              class="btn dua-recommender-btn"
              :disabled="recommendationLoading"
              @click="runDuaRecommendation">
              <span v-if="recommendationLoading" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              {{ recommendationLoading ? 'Finding...' : 'Find Recommendations' }}
            </button>
          </div>
        </div>

        <div v-if="recommendationKeywords.length" class="d-flex flex-wrap gap-2 mt-3">
          <span class="dua-keyword-chip" v-for="tag in recommendationKeywords" :key="tag">{{ tag }}</span>
        </div>

        <div v-if="recommendationError" class="alert alert-warning mt-3 mb-0" role="alert">
          {{ recommendationError }}
        </div>

        <div
          v-if="!recommendationLoading"
          class="mt-2 dua-recommender-results">
          <h3 class="dua-recommender-group-title">
            Recommended Duas <span class="text-muted">({{ recommendationDuas.length }})</span>
          </h3>
          <ul v-if="recommendationDuas.length" class="dua-recommender-list dua-recommender-dua-grid mb-0">
            <li v-for="dua in recommendationDuas" :key="dua.id" class="dua-recommender-item">
              <p class="dua-recommender-item-title mb-1">{{ dua.title }}</p>
              <p class="dua-recommender-item-meta mb-1">{{ dua.categoryName }}</p>
              <p class="dua-recommender-item-text mb-2">{{ dua.translation }}</p>
              <p class="dua-recommender-item-reference mb-0">
                <span>Reference:</span> {{ dua.reference || 'Not available' }}
              </p>
            </li>
          </ul>
          <p v-else class="dua-recommender-empty mb-0">
            No local dua tags matched this feeling.
          </p>
        </div>
      </div>
    </section>

    <section v-if="activeFilterPills.length" class="container-fluid dua-content-shell mb-5" aria-label="Active filters">
      <div class="dua-active-filters">
        <span class="dua-active-filters-label">Active filters:</span>
        <button
          v-for="pill in activeFilterPills"
          :key="pill.key"
          type="button"
          class="dua-filter-pill"
          @click="removeFilter(pill.key)">
          <span>{{ pill.label }}</span>
          <i class="bi bi-x"></i>
        </button>
      </div>
    </section>

    <transition name="slide-fade">
      <div v-if="showCopyMessage" class="alert alert-success alert-dismissible fade show mx-auto copy-message" role="alert">
        <i class="bi bi-check-circle-fill me-2"></i>Copied to clipboard
        <button type="button" class="btn-close" @click="showCopyMessage = false" aria-label="Close"></button>
      </div>
    </transition>

    <div class="container-fluid dua-content-shell">
      <div v-if="isLoading && !errorMessage" class="text-center my-5">
        <div class="spinner-border text-success" role="status" aria-label="Loading"></div>
        <div class="mt-2 text-muted">Loading duas...</div>
      </div>

      <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
        {{ errorMessage }}
      </div>

      <div v-if="filteredDuas.length === 0 && !isLoading && !errorMessage" class="alert no-duas-message text-center">
        <div class="py-4">
          <i class="bi fs-1 mb-3 d-block" :class="viewMode === 'liked' ? 'bi-heart-fill' : 'bi-search'"></i>
          <p class="fw-medium fs-5">
            {{ viewMode === 'liked'
              ? 'No liked duas yet. Start liking duas to see them here.'
              : 'No duas found for your filters. Try different keywords or tags.' }}
          </p>
          <button v-if="viewMode === 'liked'" @click="viewMode = 'all'; resetPagination()"
            class="btn btn-primary rounded-pill px-4 py-2 mt-3">
            Explore All Duas
          </button>
        </div>
      </div>
    </div>

    <div class="container-fluid dua-content-shell" id="dua-panel" role="tabpanel" :aria-labelledby="viewMode === 'all' ? 'tab-all' : 'tab-liked'">
      <div v-for="category in filteredDuas" :key="category.id" class="mb-4 dua-category-panel" role="region"
        :aria-labelledby="`category-title-${category.id}`">
        <div class="dua-category-heading mb-3">
          <div>
            <h2 class="category-title fw-bold mb-1" :id="`category-title-${category.id}`">{{ category.name }}</h2>
            <p class="category-meta mb-0">{{ category.duas.length }} duas in this section</p>
          </div>
          <div class="category-actions">
            <button
              type="button"
              class="category-download-btn"
              @click="downloadCategoryDuas(category)"
              :aria-label="`Download ${category.name} section as text`"
              title="Download section as text">
              <i class="bi bi-download" aria-hidden="true"></i>
              <span>Download TXT</span>
            </button>
            <button
              type="button"
              class="category-toggle"
              :class="{ expanded: !category.collapsed }"
              @click="toggleCategoryCollapse(category.id)"
              :aria-expanded="!category.collapsed"
              :title="category.collapsed ? 'Expand category' : 'Collapse category'">
              <i :class="category.collapsed ? 'bi bi-chevron-down' : 'bi bi-chevron-up'"></i>
            </button>
          </div>
        </div>

        <div v-if="!category.collapsed" class="row g-3 dua-card-grid" role="list">
          <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-12 col-md-6">
            <article
              class="dua-card h-100 position-relative"
              :class="{ 'dua-card-liked': viewMode === 'liked' }"
              :style="{ '--font-size-base': fontSize + 'px' }"
              role="listitem"
              :aria-labelledby="`dua-title-${dua.id}`">
              <div class="dua-card-content">
                <div v-if="loginWarnings[dua.id]" class="alert alert-warning dua-login-warning" role="alert">
                  <i class="bi bi-shield-lock-fill me-2" aria-hidden="true"></i>
                  <span>{{ loginWarnings[dua.id] }}</span>
                  <a class="auth-warning-cta ms-2" href="/login">Log in</a>
                </div>
                <h3 class="dua-card-title fw-bold mb-2" :id="`dua-title-${dua.id}`">
                  <span v-html="highlightText(dua.title)"></span>
                </h3>
                <p
                  v-if="dua.arabic"
                  class="dua-card-arabic mb-2 font-arabic"
                  lang="ar"
                  dir="rtl"
                  :style="{ fontSize: 'calc(var(--font-size-base) * 1.42)', lineHeight: '2.05' }"
                  v-html="highlightText(dua.arabic)"
                  aria-label="Dua in Arabic"></p>
                <section v-if="dua.transliteration" class="dua-section-block">
                  <button
                    type="button"
                    class="dua-section-toggle"
                    @click="toggleDuaSection(dua, 'transliteration')"
                    :aria-expanded="!isDuaSectionCollapsed(dua, 'transliteration')"
                    :aria-controls="`dua-transliteration-${dua.id}`">
                    <span class="dua-section-label">Transliteration</span>
                    <i :class="isDuaSectionCollapsed(dua, 'transliteration') ? 'bi bi-chevron-down' : 'bi bi-chevron-up'" aria-hidden="true"></i>
                  </button>
                  <p
                    v-if="!isDuaSectionCollapsed(dua, 'transliteration')"
                    :id="`dua-transliteration-${dua.id}`"
                    class="dua-card-transliteration fst-italic text-muted"
                    v-html="highlightText(dua.transliteration)"
                    aria-label="Dua transliteration"></p>
                </section>

                <section v-if="dua.translation" class="dua-section-block">
                  <button
                    type="button"
                    class="dua-section-toggle"
                    @click="toggleDuaSection(dua, 'translation')"
                    :aria-expanded="!isDuaSectionCollapsed(dua, 'translation')"
                    :aria-controls="`dua-translation-${dua.id}`">
                    <span class="dua-section-label">Translation</span>
                    <i :class="isDuaSectionCollapsed(dua, 'translation') ? 'bi bi-chevron-down' : 'bi bi-chevron-up'" aria-hidden="true"></i>
                  </button>
                  <p
                    v-if="!isDuaSectionCollapsed(dua, 'translation')"
                    :id="`dua-translation-${dua.id}`"
                    class="dua-card-translation"
                    :style="{ fontSize: 'calc(var(--font-size-base) * 0.86)' }"
                    v-html="highlightText(dua.translation)"
                    aria-label="Dua translation"></p>
                </section>

                <section v-if="dua.reference" class="dua-section-block dua-section-block-reference mt-auto">
                  <button
                    type="button"
                    class="dua-section-toggle"
                    @click="toggleDuaSection(dua, 'reference')"
                    :aria-expanded="!isDuaSectionCollapsed(dua, 'reference')"
                    :aria-controls="`dua-reference-${dua.id}`">
                    <span class="dua-section-label">Reference</span>
                    <i :class="isDuaSectionCollapsed(dua, 'reference') ? 'bi bi-chevron-down' : 'bi bi-chevron-up'" aria-hidden="true"></i>
                  </button>
                  <div
                    v-if="!isDuaSectionCollapsed(dua, 'reference')"
                    :id="`dua-reference-${dua.id}`"
                    class="dua-card-meta">
                    <span class="dua-card-reference" v-html="highlightText(dua.reference)"></span>
                  </div>
                </section>
              </div>
              <div class="dua-card-actions">
                <div class="dua-font-controls me-auto">
                  <button class="dua-font-btn" @click="changeFontSize('decrease')" :disabled="fontSize <= 14"
                    aria-label="Decrease font size">
                    <i class="bi bi-dash-circle-fill"></i>
                  </button>
                  <button class="dua-font-btn" @click="changeFontSize('increase')" :disabled="fontSize >= 28"
                    aria-label="Increase font size">
                    <i class="bi bi-plus-circle-fill"></i>
                  </button>
                </div>
                <div class="dua-action-group">
                  <button
                    class="dua-action-btn"
                    @click="toggleLike(dua.id)"
                    :aria-label="likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'">
                    <i :class="likedDuas.includes(dua.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
                  </button>
                  <button class="dua-action-btn" @click="shareOnWhatsApp(dua)" aria-label="Share on WhatsApp">
                    <i class="bi bi-share-fill"></i>
                  </button>
                  <button class="dua-action-btn" @click="copyContent(dua)" aria-label="Copy Content">
                    <i class="bi bi-clipboard-fill"></i>
                  </button>
                  <button class="dua-action-btn" @click="downloadSingleDua(dua, category.name)" aria-label="Download Dua as text">
                    <i class="bi bi-download"></i>
                  </button>
                  <button class="dua-action-btn" @click="printDua(dua)" aria-label="Print Dua">
                    <i class="bi bi-printer-fill"></i>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div v-if="!category.collapsed && category.duas.length > duasPerPage" class="d-flex justify-content-center mt-4">
          <nav aria-label="Dua pagination">
            <ul class="pagination dua-pagination">
              <li class="page-item" :class="{ disabled: currentPage[category.id] === 1 }">
                <button class="page-link" @click="changePage('prev', category.id)" aria-label="Previous page">
                  <span aria-hidden="true">&laquo; Previous</span>
                </button>
              </li>
              <li
                v-for="page in totalPages(category.duas)"
                :key="page"
                class="page-item"
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

    <transition name="fade">
      <button
        v-if="showScrollToTop"
        type="button"
        class="dua-fab-scroll"
        @click="scrollToTop"
        aria-label="Scroll to top"
        title="Scroll to top">
        <i class="bi bi-arrow-up-short" aria-hidden="true"></i>
      </button>
    </transition>
  </main>
</template>

<script src="../scripts/DuaComponent.script.js"></script>
<style scoped src="../styles/DuaComponent.style.css"></style>
