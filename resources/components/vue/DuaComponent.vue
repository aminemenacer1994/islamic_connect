<template>
  <main class="container-fluid dua-shell py-4" role="main" aria-labelledby="dua-title">
    <section class="container dua-hero mb-4">
      <div class="dua-hero-text">
        <h1 id="dua-title" class="fw-bold mb-2 dua-title">Dua Library</h1>
        <p class="dua-hero-subtitle mb-0 dua-lead">
          Find authentic duas by theme, then save or share what you need.
        </p>
      </div>
    </section>

    <section class="container dua-tab-panel mb-3">
      <div class="dua-tab-row">
        <button
          type="button"
          class="dua-tab-btn"
          :class="{ active: viewMode === 'all' }"
          aria-controls="dua-panel"
          :aria-selected="viewMode === 'all'"
          @click="viewMode = 'all'; resetPagination()"
          @keydown.enter.prevent="viewMode = 'all'; resetPagination()"
          @keydown.space.prevent="viewMode = 'all'; resetPagination()">
          All Duas
        </button>
        <button
          type="button"
          class="dua-tab-btn"
          :class="{ active: viewMode === 'liked' }"
          aria-controls="dua-panel"
          :aria-selected="viewMode === 'liked'"
          @click="viewMode = 'liked'; resetPagination()"
          @keydown.enter.prevent="viewMode = 'liked'; resetPagination()"
          @keydown.space.prevent="viewMode = 'liked'; resetPagination()">
          Liked Duas
          <span v-if="likedDuasCount > 0" class="badge rounded-pill bg-danger ms-2">{{ likedDuasCount }}</span>
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

    <section class="container mb-3 dua-search-wrapper" role="search">
      <div class="dua-search-card p-3">
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

    <section class="container mb-4" aria-label="Suggested topics">
      <div class="dua-tag-list">
        <button
          v-for="tag in searchTags"
          :key="tag"
          type="button"
          class="dua-tag"
          :class="{ active: tag === 'All' ? !selectedTag : selectedTag === tag }"
          @click="selectedTag = tag === 'All' ? '' : (selectedTag === tag ? '' : tag); resetPagination();">
          <i :class="getTagIcon(tag)" aria-hidden="true"></i>
          <span>{{ tag }}</span>
        </button>
      </div>
    </section>

    <transition name="slide-fade">
      <div v-if="showCopyMessage" class="alert alert-success alert-dismissible fade show mx-auto copy-message" role="alert">
        <i class="bi bi-check-circle-fill me-2"></i>Copied to clipboard
        <button type="button" class="btn-close" @click="showCopyMessage = false" aria-label="Close"></button>
      </div>
    </transition>

    <div class="container">
      <div v-if="isLoading && !errorMessage" class="text-center my-5">
        <div class="spinner-border text-success" role="status" aria-label="Loading"></div>
        <div class="mt-2 text-muted">Loading duas…</div>
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

    <div class="container" id="dua-panel" role="tabpanel" :aria-labelledby="viewMode === 'all' ? 'tab-all' : 'tab-liked'">
      <div v-for="category in filteredDuas" :key="category.id" class="mb-4" role="region"
        :aria-labelledby="`category-title-${category.id}`">
        <div class="dua-category-heading mb-3">
          <div>
            <h2 class="category-title fw-bold mb-0" :id="`category-title-${category.id}`">{{ category.name }}</h2>
          </div>
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
                  :style="{ fontSize: 'calc(var(--font-size-base) * 1.5)', lineHeight: '2.5' }"
                  v-html="highlightText(dua.arabic)"
                  aria-label="Dua in Arabic"></p>
                <p
                  v-if="dua.transliteration"
                  class="dua-card-transliteration mb-1 fst-italic text-muted"
                  v-html="highlightText(dua.transliteration)"
                  aria-label="Dua transliteration"></p>
                <p
                  class="dua-card-translation mb-1"
                  :style="{ fontSize: 'calc(var(--font-size-base) * 0.98)' }"
                  v-html="highlightText(dua.translation)"
                  aria-label="Dua translation"></p>
                <div class="dua-card-meta mt-auto">
                  <span class="dua-card-reference" v-html="highlightText(dua.reference)"></span>
                </div>
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
  </main>
</template>

<script src="../scripts/DuaComponent.script.js"></script>
<style scoped src="../styles/DuaComponent.style.css"></style>
