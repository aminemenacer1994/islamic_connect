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
      <ul class="nav nav-tabs justify-content-center">
        <li class="nav-item">
          <a class="nav-link" :class="{ active: viewMode === 'all' }" href="#"
            @click.prevent="viewMode = 'all'; resetPagination()" aria-current="page">
            All Duas
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: viewMode === 'liked' }" href="#"
            @click.prevent="viewMode = 'liked'; resetPagination()">
            Liked Duas
            <span v-if="likedDuasCount > 0" class="badge bg-danger ms-1">{{ likedDuasCount }}</span>
          </a>
        </li>
      </ul>
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
    <div class="container">
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
            <i :class="category.collapsed ? 'bi bi-chevron-down action-icon' : 'bi bi-chevron-up action-icon'"
              @click="toggleCategoryCollapse(category.id)" data-bs-toggle="tooltip" data-bs-placement="top"
              :title="category.collapsed ? 'Expand Category' : 'Collapse Category'"
              :aria-label="category.collapsed ? 'Expand Category' : 'Collapse Category'" role="button"></i>
          </div>
        </div>

        <div v-if="!category.collapsed" class="row g-3" role="list">
          <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-12 col-md-6">
            <div class="card dua-card h-100 border-0 shadow-sm position-relative"
              :class="{ 'border-start border-danger border-3': viewMode === 'liked' }"
              :style="{ '--font-size-base': fontSize + 'px' }" role="listitem" :aria-labelledby="`dua-title-${dua.id}`">

              <!-- Liked Badge -->
              <div v-if="viewMode === 'liked'"
                class="position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center m-2 liked-badge">
                <i class="bi bi-heart-fill text-danger"></i>
              </div>

              <!-- Card Body -->
              <div class="card-body d-flex flex-column p-3 p-md-4 text-black">
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

<script>
import axios from 'axios';
import { fetchUserIdFromApi, resolveClientUserId } from '../utils/bookmarkAuth';
const { createDuaMetadata } = require('../utils/duaSlugs');
export default {
  data() {
    const initialUserId = resolveClientUserId();
    return {
      duaCollection: [],
      searchQuery: '',
      selectedCategory: '',
      selectedReference: '',
      currentPage: {},
      duasPerPage: 20,
      showCopyMessage: false,
      fontSize: 18,
      storageUserId: initialUserId,
      isAuthenticated: !!initialUserId,
      preferencesLoaded: false,
      likedDuas: [],
      viewMode: 'all',
      searchTags: [
        'All', 'Forgiveness', 'Protection', 'Gratitude', 'Healing', 'Guidance', 'Patience',
        'Success', 'Mercy', 'Peace', 'Provision', 'Strength', 'Repentance'
      ],
      selectedTag: '',
      tagSynonyms: {
        Forgiveness: ['pardon', 'mercy', 'forgive'],
        Protection: ['safety', 'guard', 'shield'],
        Gratitude: ['thanks', 'appreciation', 'thankful'],
        Healing: ['cure', 'recovery', 'health'],
        Guidance: ['direction', 'path', 'lead'],
        Patience: ['endurance', 'perseverance', 'calm'],
        Success: ['achievement', 'victory', 'prosperity'],
        Mercy: ['compassion', 'kindness', 'forgiveness'],
        Peace: ['tranquility', 'calm', 'serenity'],
        Provision: ['sustenance', 'wealth', 'blessings'],
        Strength: ['power', 'resilience', 'fortitude'],
        Repentance: ['regret', 'atonement', 'penitence'],
        Faith: ['belief', 'trust', 'devotion'],
        Knowledge: ['wisdom', 'understanding', 'learning'],
        Family: ['kin', 'household', 'relatives'],
        Justice: ['fairness', 'equity', 'righteousness'],
        Hope: ['optimism', 'aspiration', 'expectation'],
        Charity: ['generosity', 'almsgiving', 'benevolence']
      },
      showScrollToTop: false,
      actionFeedback: {},
      errorMessage: null,
      isLoading: true,
      nextStepMinimized: false,
      staticDuaSlug: typeof window !== 'undefined' ? window.__duaSlug || '' : '',
      staticDuaMatch: null,
      currentlyPlayingAudioId: null,
      audioElement: null,
      speechUtterance: null,
      speechSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
      speechVoices: [],
    };
  },
  computed: {
    uniqueReferences() {
      const references = new Set();
      this.duaCollection.forEach(category => {
        category.duas.forEach(dua => {
          if (dua.reference) {
            references.add(dua.reference);
          }
        });
      });
      return [...references]
        .map(ref => ({
          full: ref,
          display: ref.split(',')[0].trim()
        }))
        .sort((a, b) => a.display.localeCompare(b.display));
    },
    likedDuasCount() {
      const validIds = this.likedDuas.filter(id => {
        const [categoryId, duaId] = id.split('-');
        const category = this.duaCollection.find(c => c.id === parseInt(categoryId));
        return category && category.duas.some(dua => dua.id === id);
      });
      return validIds.length;
    },
    filteredCategories() {
      if (this.staticDuaSlug) {
        if (!this.staticDuaMatch) {
          return [];
        }
        const target = this.staticDuaMatch;
        return this.duaCollection
          .map(category => {
            if (category.id !== target.categoryId) {
              return { ...category, duas: [] };
            }
            return { ...category, duas: category.duas.filter(dua => dua.slug === target.slug) };
          })
          .filter(category => category.duas.length > 0);
      }

      let filteredCollection = this.duaCollection;

      if (this.viewMode === 'liked') {
        filteredCollection = filteredCollection.map(category => ({
          ...category,
          duas: category.duas.filter(dua => this.likedDuas.includes(dua.id)),
        })).filter(category => category.duas.length > 0);
        return filteredCollection;
      }

      if (this.selectedCategory) {
        filteredCollection = filteredCollection.filter(category => category.id === parseInt(this.selectedCategory));
      }

      if (this.selectedReference) {
        filteredCollection = filteredCollection.map(category => ({
          ...category,
          duas: category.duas.filter(dua => dua.reference === this.selectedReference),
        })).filter(category => category.duas.length > 0);
      }

      if (!this.searchQuery.trim() && !this.selectedTag) {
        return filteredCollection;
      }

      return filteredCollection.map(category => {
        const filteredDuas = category.duas.filter(dua => {
          const searchQueryLower = this.searchQuery.trim().toLowerCase();
          const tagLower = this.selectedTag.toLowerCase();
          const synonyms = this.tagSynonyms[this.selectedTag] || [];
          const synonymLower = synonyms.map(s => s.toLowerCase());

          const queryMatch = this.searchQuery.trim() ? (
            (dua.title || '').toLowerCase().includes(searchQueryLower) ||
            (dua.arabic || '').toLowerCase().includes(searchQueryLower) ||
            (dua.transliteration || '').toLowerCase().includes(searchQueryLower) ||
            (dua.translation || '').toLowerCase().includes(searchQueryLower) ||
            (dua.reference || '').toLowerCase().includes(searchQueryLower)
          ) : true;

          const tagMatch = this.selectedTag ? (
            (dua.title || '').toLowerCase().includes(tagLower) ||
            (dua.arabic || '').toLowerCase().includes(tagLower) ||
            (dua.transliteration || '').toLowerCase().includes(tagLower) ||
            (dua.translation || '').toLowerCase().includes(tagLower) ||
            (dua.reference || '').toLowerCase().includes(tagLower) ||
            synonymLower.some(syn => (
              (dua.title || '').toLowerCase().includes(syn) ||
              (dua.arabic || '').toLowerCase().includes(syn) ||
              (dua.transliteration || '').toLowerCase().includes(syn) ||
              (dua.translation || '').toLowerCase().includes(syn) ||
              (dua.reference || '').toLowerCase().includes(syn)
            ))
          ) : true;

          return queryMatch && tagMatch;
        });
        return { ...category, duas: filteredDuas };
      }).filter(category => category.duas.length > 0);
    },
    filteredDuas() {
      return this.filteredCategories;
    },
    hasActiveFilters() {
      return Boolean(this.searchQuery || this.selectedTag || this.selectedReference);
    },
    allDuasLikedInCategory() {
      return (categoryId) => {
        const category = this.duaCollection.find(c => c.id === categoryId);
        if (!category || !category.duas.length) return false;
        return category.duas.every(dua => this.likedDuas.includes(dua.id));
      };
    },
  },
  methods: {
    async resolveStorageScope() {
      const resolvedId = await fetchUserIdFromApi();
      this.storageUserId = resolvedId;
      this.isAuthenticated = !!resolvedId;
      if (this.isAuthenticated) {
        await this.loadPreferences();
      } else {
        this.likedDuas = [];
        this.preferencesLoaded = true;
      }
    },
    async loadPreferences() {
      try {
        const response = await axios.get('/api/preferences/liked_duas');
        this.likedDuas = Array.isArray(response.data?.value) ? response.data.value : [];
      } catch (e) {
        this.likedDuas = [];
      } finally {
        this.preferencesLoaded = true;
      }
    },
    async savePreferences() {
      if (!this.isAuthenticated) return;
      try {
        await axios.put('/api/preferences/liked_duas', { value: this.likedDuas });
      } catch (e) {}
    },
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    getTagIcon(tag) {
      const icons = {
        'All': 'bi-grid-fill',
        'Forgiveness': 'bi-heart-fill',
        'Protection': 'bi-shield-fill',
        'Gratitude': 'bi-emoji-smile-fill',
        'Healing': 'bi-heart-pulse-fill',
        'Guidance': 'bi-signpost-fill',
        'Patience': 'bi-hourglass-split',
        'Success': 'bi-trophy-fill',
        'Mercy': 'bi-hand-thumbs-up-fill',
        'Peace': 'bi-peace-fill',
        'Provision': 'bi-basket-fill',
        'Strength': 'bi-lightning-charge-fill',
        'Repentance': 'bi-arrow-counterclockwise'
      };
      return `bi ${icons[tag] || 'bi-tag-fill'}`;
    },
    highlightText(text) {
      if (!text) return '';
      const raw = text.toString();

      // If no search or tag filters, return escaped text
      if (!this.searchQuery.trim() && !this.selectedTag) {
        return raw
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      // Escape first to avoid injecting existing markup, then re-inject highlights
      let escaped = raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Highlight search terms
      const searchTerms = this.searchQuery.trim() ? [this.searchQuery] : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
        escaped = escaped.replace(regex, '<mark class="mark-search">$1</mark>');
      });

      // Highlight selected tag and its synonyms
      const tagTerms = this.selectedTag ? [this.selectedTag, ...(this.tagSynonyms[this.selectedTag] || [])] : [];
      tagTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
        escaped = escaped.replace(regex, '<mark class="mark-tag">$1</mark>');
      });

      return escaped;
    },
    toggleTag(tag) {
      this.selectedTag = (tag === 'All' || this.selectedTag === tag) ? '' : tag;
      this.resetPagination();
    },
    clearSearch() {
      this.searchQuery = '';
      this.selectedTag = '';
      this.selectedReference = '';
      this.resetPagination();
    },
    changeFontSize(action) {
      if (action === 'increase') {
        this.fontSize = Math.min(this.fontSize + 2, 28);
      } else if (action === 'decrease' && this.fontSize > 14) {
        this.fontSize -= 2;
      }
    },
    copyContent(dua) {
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\nReference: ${dua.reference}`;
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyMessage = true;
        setTimeout(() => {
          this.showCopyMessage = false;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy content: ', err);
      });
    },
    shareOnWhatsApp(dua) {
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nReference: ${dua.reference}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/?text=${encodedText}`;
      window.open(url, '_blank');
    },
    hasRecordedAudio(dua) {
      return Boolean(dua && dua.audio);
    },
    getAudioButtonClasses(dua) {
      const base = [
        'btn',
        'btn-sm',
        'rounded-circle',
        'p-0',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'action-btn',
      ];
      if (this.hasRecordedAudio(dua)) {
        base.push('btn-outline-secondary');
      } else {
      base.push('audio-action-btn', 'speech');
      }
      return base;
    },
    initializeSpeechVoices() {
      if (!this.speechSupported || typeof window === 'undefined') return;
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length) {
          this.speechVoices = voices;
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
    },
    selectArabicVoice() {
      if (!this.speechVoices.length) return null;
      const arabicVoice = this.speechVoices.find(voice => voice.lang?.startsWith('ar'));
      return arabicVoice || this.speechVoices[0];
    },
    canPlayAudio(dua) {
      return Boolean(dua && (dua.audio || this.speechSupported));
    },
    isAudioPlaying(dua) {
      return !!dua && this.currentlyPlayingAudioId === dua.id;
    },
    handleAudioPlayback(dua) {
      if (!dua) return;
      if (!this.canPlayAudio(dua)) return;
      if (this.currentlyPlayingAudioId === dua.id) {
        this.stopAudioPlayback();
        return;
      }
      this.stopAudioPlayback();
      if (dua.audio) {
        const audio = new Audio(dua.audio);
        audio.preload = 'auto';
        audio.addEventListener('ended', () => {
          if (this.currentlyPlayingAudioId === dua.id) {
            this.stopAudioPlayback();
          }
        });
        audio.addEventListener('error', () => this.stopAudioPlayback());
        this.audioElement = audio;
        this.currentlyPlayingAudioId = dua.id;
        audio.play().catch(() => this.stopAudioPlayback());
        return;
      }
      if (this.speechSupported) {
        this.playSpeechForDua(dua);
      }
    },
    playSpeechForDua(dua) {
      if (!dua) return;
      const text = dua.arabic || dua.transliteration || dua.translation || dua.title;
      if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      const preferredVoice = this.selectArabicVoice();
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        utterance.lang = preferredVoice.lang || 'ar-SA';
      } else {
        utterance.lang = 'ar-SA';
      }
      utterance.rate = 0.88;
      utterance.pitch = 1.15;
      utterance.volume = 0.95;
      utterance.addEventListener('end', () => {
        if (this.currentlyPlayingAudioId === dua.id) {
          this.stopAudioPlayback();
        }
      });
      utterance.addEventListener('error', () => {
        if (this.currentlyPlayingAudioId === dua.id) {
          this.stopAudioPlayback();
        }
      });
      this.speechUtterance = utterance;
      this.currentlyPlayingAudioId = dua.id;
      window.speechSynthesis.speak(utterance);
    },
    stopAudioPlayback() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement = null;
      }
      if (this.speechUtterance && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        this.speechUtterance = null;
      }
      this.currentlyPlayingAudioId = null;
    },
    toggleLike(duaId) {
      if (!this.isAuthenticated) return;
      if (!duaId) return;
      const updatedLikedDuas = [...this.likedDuas];
      if (updatedLikedDuas.includes(duaId)) {
        updatedLikedDuas.splice(updatedLikedDuas.indexOf(duaId), 1);
      } else {
        updatedLikedDuas.push(duaId);
      }
      this.likedDuas = updatedLikedDuas;
      this.savePreferences();
    },
    toggleAllInCategory(categoryId) {
      if (!this.isAuthenticated) return;
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (!category) return;
      this.actionFeedback[categoryId] = true;
      const allLiked = this.allDuasLikedInCategory(categoryId);
      let updatedLikedDuas = [...this.likedDuas];
      if (allLiked) {
        updatedLikedDuas = updatedLikedDuas.filter(id => !category.duas.some(dua => dua.id === id));
      } else {
        updatedLikedDuas = [...new Set([...updatedLikedDuas, ...category.duas.map(dua => dua.id)])];
      }
      this.likedDuas = updatedLikedDuas;
      this.savePreferences();
      setTimeout(() => {
        this.actionFeedback[categoryId] = false;
      }, 1000);
    },
    clearAllLikedDuas() {
      if (!this.isAuthenticated) return;
      this.actionFeedback['clearAll'] = true;
      this.likedDuas = [];
      this.savePreferences();
      setTimeout(() => {
        this.actionFeedback['clearAll'] = false;
      }, 1000);
    },
    toggleCategoryCollapse(categoryId) {
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (category) {
        category.collapsed = !category.collapsed;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollThreshold = windowHeight * 0.05;
      this.showScrollToTop = scrollPosition > scrollThreshold;
    },
    getPaginatedDuas(duas) {
      if (!duas || !duas.length) return [];
      const start = ((this.currentPage[duas[0].id.split('-')[0]] || 1) - 1) * this.duasPerPage;
      const end = start + this.duasPerPage;
      return duas.slice(start, end);
    },
    changePage(direction, categoryId) {
      const totalPages = this.totalPages(this.duaCollection.find(c => c.id === categoryId)?.duas || []);
      if (direction === 'next' && this.currentPage[categoryId] < totalPages) {
        this.currentPage[categoryId]++;
      } else if (direction === 'prev' && this.currentPage[categoryId] > 1) {
        this.currentPage[categoryId]--;
      }
    },
    totalPages(duas) {
      return Math.ceil(duas.length / this.duasPerPage);
    },
    resetPagination() {
      this.currentPage = {};
      this.duaCollection.forEach(category => {
        this.currentPage[category.id] = 1;
      });
    },
    applyStaticDuaSlug() {
      if (!this.staticDuaSlug || !this.duaCollection.length) {
        return;
      }
      const metadata = createDuaMetadata({ categories: this.duaCollection }, { assignSlugToDua: true });
      const match = metadata.find(entry => entry.slug === this.staticDuaSlug);
      if (!match) {
        this.staticDuaMatch = null;
        this.errorMessage = 'The Dua you requested could not be found.';
        return;
      }
      this.errorMessage = null;
      this.staticDuaMatch = match;
      this.selectedCategory = match.categoryId ? match.categoryId.toString() : '';
    },
  },
  created() {
    try { console.debug('[DuaComponent] created()'); } catch (e) { }
    this.resolveStorageScope();

    // Robust path for JSON under public/
    fetch(`${window.location.origin}/duaCollection.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data.categories || !Array.isArray(data.categories)) {
          throw new Error('Invalid JSON structure: categories not found or not an array');
        }
        try { console.debug('[DuaComponent] loaded categories:', data.categories.length); } catch (e) { }
        this.duaCollection = data.categories.map(category => ({
          ...category,
          collapsed: false,
          duas: category.duas.map((dua, index) => {
            const originalId = dua.id || index + 1;
            return {
              ...dua,
              id: `${category.id}-${originalId}`,
              originalId,
            };
          }),
        }));
        const ids = new Set();
        this.duaCollection.forEach(category => {
          category.duas.forEach(dua => {
            if (ids.has(dua.id)) {
              console.warn(`Duplicate dua ID found: ${dua.id}`);
            }
            ids.add(dua.id);
          });
        });
        this.resetPagination();
        this.applyStaticDuaSlug();
      })
      .catch(error => {
        console.error('Error loading dua collection:', error);
        this.errorMessage = 'Failed to load dua collection. Please try again later.';
      })
      .finally(() => {
        this.isLoading = false;
      });
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.initializeSpeechVoices();
  },
  beforeDestroy() {
    this.stopAudioPlayback();
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.dua-shell {
  --dua-accent: #0b806f;
  --dua-accent-2: #1a5f7a;
  --dua-ink: #0f172a;
  --dua-muted: #5b6470;
  --dua-surface: #ffffff;
  --dua-soft: #fdf9f1;
  --dua-border: #e5e0d6;
  background: transparent;
  border: 0;
  border-radius: 28px;
  padding: 3rem 1rem 3.5rem;
  box-shadow: 0 35px 70px rgba(11, 38, 34, 0.12);
}

.dua-hero {
  background: var(--dua-surface);
  border: 1px solid var(--dua-border);
  border-radius: 26px;
  padding: 2.5rem 2rem;
  box-shadow: 0 18px 36px rgba(15, 41, 32, 0.08);
  position: relative;
  overflow: hidden;
}

.dua-hero::after {
  content: '';
  position: absolute;
  left: 2rem;
  right: 2rem;
  bottom: 1.25rem;
  height: 3px;
  border-radius: 999px;
  background: var(--dua-accent);
  opacity: 0.35;
}

.dua-title {
  color: var(--dua-ink);
  letter-spacing: -0.02em;
}

.dua-lead {
  color: var(--dua-muted);
  max-width: 760px;
  margin: 0 auto;
}

.dua-next-step-wrap {
  padding: 0 10px;
}

.dua-next-step {
  position: relative;
  background: var(--dua-surface);
  border: 1px solid var(--dua-border);
  border-radius: 22px;
  box-shadow: 0 12px 28px rgba(15, 41, 32, 0.08);
  padding: 1.25rem 1.75rem;
  overflow: hidden;
}

.dua-next-step::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: var(--dua-accent);
  opacity: 0.6;
}

.next-step-toggle {
  position: absolute;
  right: 16px;
  top: 14px;
  opacity: 0.9;
  background: transparent;
  border: 0;
  color: #6b8b91;
  z-index: 3;
  cursor: pointer;
}

.next-step-icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(11, 128, 111, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dua-accent);
  font-size: 1.4rem;
  box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.22), 0 8px 18px rgba(26,95,122,0.12);
}

.next-step-eyebrow {
  letter-spacing: 0.1em;
  color: var(--dua-accent-2);
  font-size: 0.78rem;
}

.next-step-text {
  color: var(--dua-ink);
  line-height: 1.8;
  font-size: 1.05rem;
}

.next-step-teaser {
  color: var(--dua-ink);
}

.next-step-link {
  color: var(--dua-accent);
}

.next-step-link i {
  font-size: 0.85rem;
  opacity: 0.85;
}

.next-step-cta {
  background: linear-gradient(135deg, var(--dua-accent), var(--dua-accent-2));
  border: none;
  border-radius: 999px;
  box-shadow: 0 10px 20px rgba(26, 95, 122, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.next-step-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(26, 95, 122, 0.28);
  filter: brightness(1.02);
}

.dua-search {
  border: 1px solid var(--dua-border);
  box-shadow: 0 12px 22px rgba(15, 41, 32, 0.08);
  background: var(--dua-surface);
}

.dua-search .search-icon {
  background-color: var(--dua-accent);
  position: static;
  transform: none;
  margin: 0;
  left: auto;
  top: auto;
  height: 100%;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  padding: 0;
}

.dua-search .search-icon i {
  color: var(--dua-surface);
  font-size: 1.2rem;
}

.dua-filter-panel {
  position: relative;
  background: var(--dua-surface);
  border: 1px solid var(--dua-border);
  border-radius: 22px;
  box-shadow: 0 12px 28px rgba(15, 41, 32, 0.08);
  padding: 1.25rem 1.75rem;
}

.dua-empty {
  background: var(--dua-soft);
  border: 1px solid var(--dua-border);
  margin: 2rem 1rem;
  box-shadow: 0 12px 28px rgba(15, 41, 32, 0.08);
}

.dua-empty i {
  color: var(--dua-accent);
  text-shadow: 0 4px 12px rgba(11, 128, 111, 0.25);
}

.dua-empty-text {
  color: var(--dua-accent);
}

.dua-empty-cta {
  background: var(--dua-accent);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
  font-size: 1.05rem;
  box-shadow: 0 10px 22px rgba(11, 128, 111, 0.25);
}

.dua-empty-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 26px rgba(11, 128, 111, 0.35);
  filter: brightness(1.03);
}

.premium-action-button--outline {
  background: rgba(15, 118, 110, 0.08);
  border-color: rgba(15, 118, 110, 0.35);
  color: #0c7867;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.08), 0 10px 24px rgba(15, 23, 42, 0.12);
  border-radius: 22px;
}

.nav-tabs {
  border-bottom: none;
}

.nav-link {
  color: var(--dua-ink);
  background-color: var(--dua-soft);
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  margin: 0 0.25rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: var(--dua-accent);
  color: white;
}

.nav-link.active {
  background-color: var(--dua-accent);
  color: white;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
}

.search-tags {
  white-space: nowrap;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.search-tags::-webkit-scrollbar {
  display: none;
}

.tag-btn {
  background-color: var(--dua-soft);
  color: var(--dua-ink);
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.tag-btn:hover {
  background-color: var(--dua-accent);
  color: white;
}

.tag-btn.active {
  background-color: var(--dua-accent);
  color: white;
}

/* Base Card Styles */
.dua-card {
  border-radius: 24px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: var(--dua-surface);
  margin-bottom: 1.5rem;
  border: 1px solid rgba(15, 41, 32, 0.08);
  box-shadow: 0 24px 45px rgba(15, 41, 32, 0.1);
}

.dua-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 34px 60px rgba(15, 41, 32, 0.16) !important;
}

.dua-card-title-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid rgba(15, 41, 32, 0.07);
}

.dua-card-icon {
  width: 46px;
  height: 46px;
  border-radius: 16px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
}

.dua-card-icon img {
  filter: drop-shadow(0 2px 6px rgba(2, 17, 18, 0.5));
}

.dua-card-arabic-panel {
  border-radius: 20px;
  padding: 1.75rem 1.5rem;
  background: #f7f7fb;
  border: 1px solid rgba(15, 41, 32, 0.08);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  text-align: right;
}

.dua-card-translation-wrap {
  border-left: 3px solid rgba(11, 128, 111, 0.25);
  padding-left: 1rem;
}

.dua-card-footer {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0 0;
  border-top: 1px solid rgba(15, 41, 32, 0.08);
  margin-top: 1.25rem;
}

.dua-card-footer .font-control {
  border: none;
  background: rgba(11, 128, 111, 0.08);
}

.dua-card-footer .action-btn {
  background: rgba(11, 128, 111, 0.07);
  border: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.dua-card-footer .action-btn:hover {
  background: rgba(11, 128, 111, 0.25);
}

.liked-badge {
  width: 32px;
  height: 32px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1;
}

/* Arabic Font */
.font-arabic {
  font-family: 'Amiri', serif;
  font-size: calc(var(--font-size-base) * 1.5) !important;
  line-height: 2.5 !important;
}

/* Translation and Reference Styling */
.translation-text {
  color: var(--dua-muted);
  font-style: italic;
  font-weight: 500;
  opacity: 0.9;
}

.reference-text {
  font-style: italic;
  opacity: 0.8;
}

.font-control {
  border: 1px solid var(--dua-border);
}

.font-control-btn {
  color: var(--dua-accent);
}

.action-circle {
  width: 36px;
  height: 36px;
}

/* Highlight Text */
mark {
  background-color: rgba(11, 128, 111, 0.2);
  color: var(--dua-ink);
  padding: 0 0.125rem;
  border-radius: 0.125rem;
}

/* Liked Badge Animation */
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.position-absolute.bi-heart-fill {
  animation: pulse 2s infinite;
}

/* Action Buttons */
.action-btn {
  position: relative;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: var(--dua-accent) !important;
  color: white !important;
}

.action-btn:hover i {
  transform: scale(1.1);
}

.action-btn i {
  transition: transform 0.2s ease;
}

.audio-action-btn {
  background: linear-gradient(135deg, var(--dua-accent), #2dd4bf);
  border: none;
  color: #022a24;
  box-shadow: 0 6px 18px rgba(11, 128, 111, 0.3);
}

.audio-action-btn.speech:hover {
  background: linear-gradient(135deg, #0f766e, #2dd4bf);
}

.audio-action-btn.speech .bi {
  transition: transform 0.2s ease;
}

/* Tooltips */
.action-tooltip {
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2d3748;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  font-family: inherit;
  font-weight: 500;
  z-index: 10;
}

.action-btn:hover .action-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -2.25rem;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .dua-card {
    background-color: var(--dua-surface);
    color: #e2e8f0;
  }

  .translation-text {
    color: #cbd5e0;
  }

  .reference-text {
    color: #a0aec0;
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .dua-hero {
    padding: 2rem 1.4rem;
  }

  .dua-next-step {
    padding: 1.1rem 1.25rem;
  }

  .card-body {
    padding: 1.25rem !important;
  }

  .font-arabic {
    font-size: calc(var(--font-size-base) * 1.3) !important;
    line-height: 2 !important;
  }

  .action-btn {
    width: 32px !important;
    height: 32px !important;
  }

  .action-tooltip {
    font-size: 0.65rem;
    bottom: -1.75rem;
  }

  .action-btn:hover .action-tooltip {
    bottom: -2rem;
  }
}

@media (max-width: 576px) {
  .dua-shell {
    border-radius: 20px;
  }

  .dua-hero {
    padding: 1.6rem 1rem;
  }
}
</style>
