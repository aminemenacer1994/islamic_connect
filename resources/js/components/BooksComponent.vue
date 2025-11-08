<template>
  <div class="min-vh-100 bg-light p-0 m-0" :style="{ fontSize: `${baseFontSize}rem` }">
    <!-- Accessibility: Skip to main content -->
    <a href="#mainContent"
      class="visually-hidden-focusable position-absolute top-0 start-50 translate-middle-x bg-primary text-white text-decoration-none rounded p-2 opacity-0"
      style="z-index: 1000;" @click.prevent="skipToContent">Skip to main content</a>

    <header class="py-4 border-bottom mb-4 px-2 px-md-4">
      <div class="container-fluid px-3 px-md-4">
        <div class="row justify-content-center mx-0">
          <div class="col-12 col-lg-10 col-xl-8 px-0">

            <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Dictionary</h2>
            <p class="text-center text-dark mb-4" style="font-size: 18px;">
              A comprehensive resource for exploring Islamic terms and their meanings
            </p>

            <div class="container" style="padding: 10px;">
              <div class="mx-auto mb-4" style="
                  position: relative;
                  background: #eaf3f1;
                  border: 1px solid rgba(11, 128, 111, 0.20);
                  border-radius: 24px;
                  box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.03), 0 10px 28px rgba(26,95,122,0.09);
                  padding: 1.25rem 1.75rem;
                ">
                <button type="button" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
                  :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'" @click="toggleNextStepMinimized"
                  style="position: absolute; right: 44px; top: 14px; opacity: 0.9; background: transparent; border: 0; color: #6b8b91; z-index: 3; cursor: pointer;">
                  <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
                </button>
                <div class="d-flex align-items-start gap-3 text-start">
                  <div class="flex-shrink-0 mt-1">
                    <div class="next-step-icon-circle" role="img" aria-label="Calm Islamic finance guide" style="
                      width: 48px; height: 48px;
                      border-radius: 50%;
                      background: linear-gradient(145deg, rgba(11, 128, 111, 0.22), rgba(26, 95, 122, 0.14));
                      display: flex; align-items: center; justify-content: center;
                      color: #0b806f; font-size: 1.25rem;
                      box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.22), 0 6px 16px rgba(26,95,122,0.12);
                    ">
                      <i class="fas fa-scale-balanced" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div style="flex:1;">
                    <p class="mb-2 fw-semibold text-uppercase"
                      style="letter-spacing: 0.1em; color: #1a5f7a; font-size: 0.78rem;">
                      NEXT STEP
                    </p>
                    <!-- Minimized teaser -->
                    <div v-show="nextStepMinimized" class="mb-2 d-inline-flex align-items-center gap-1"
                      style="color: #1f2933;">
                      <a href="/finance" class="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1"
                        style="color:#0b806f;" aria-label="Open the Islamic finance guide">
                        Move from definitions to Islamic finance
                        <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"
                          style="color:#0b806f; font-size: 0.82rem; opacity: 0.85;"></i>
                      </a>
                    </div>
                    <p v-show="!nextStepMinimized" class="mb-3"
                      style="color: #1f2933; line-height: 1.7; font-size: 1.02rem;">
                      Still learning the words and curious about halal money choices? This English-only, screen-reader
                      friendly Islamic Finance path offers gentle cues for visually impaired reverts moving on from the
                      dictionary.
                      <a href="/finance" class="fw-semibold text-decoration-none" style="color:#0b806f;">
                        Visit Islamic Finance
                      </a>
                      when you feel ready.
                    </p>
                    <div v-show="!nextStepMinimized" class="d-flex flex-wrap gap-2">
                      <a href="/finance"
                        class="btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center" style="
                          background: linear-gradient(135deg, #0b806f, #1a5f7a);
                          border: none; border-radius: 999px;
                          box-shadow: 0 10px 20px rgba(26, 95, 122, 0.22);
                          transition: transform 0.2s ease, box-shadow 0.2s ease;
                          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 14px 26px rgba(26, 95, 122, 0.26)';"
                        onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(26, 95, 122, 0.22)';">
                        <span>Explore Islamic Finance</span>
                        <i class="fas fa-coins ms-2" aria-hidden="true"></i>
                        <span class="visually-hidden">Open the accessible Islamic finance guide for new Muslims</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <!-- Search Stats -->
              <div class="mb-4" v-if="searchQuery || selectedSubject">
                <div class="d-flex flex-wrap align-items-center gap-3 px-1" aria-live="polite">
                  <span class="badge fs-6 px-3 py-2" style="background-color: #e0fff8; color: #00796b;">
                    <i class="bi bi-search me-2" aria-hidden="true"></i>{{ filteredTerms?.length || 0 }} results
                  </span>
                  <span v-if="selectedSubject" class="badge fs-6 px-3 py-2"
                    style="background-color: #e0fff8; color: #00796b;">
                    <i class="bi bi-tag me-2"></i>{{ selectedSubject }}
                  </span>
                  <button class="btn btn-outline-secondary btn-sm rounded-pill px-3 py-2" @click="clearSearch"
                    title="Clear all filters" aria-label="Clear all filters">
                    <i class="bi bi-x-circle me-1"></i>Clear
                  </button>
                </div>
              </div>

              <!-- Cleaned Up Search Controls -->
              <div class="mb-3">
                <div class="row g-2 align-items-center flex-nowrap">
                  <div class="col-12 col-md-12">
                    <div class="input-group shadow-sm" style="--primary-color: #00796b; --spacing: 0.5rem;">
                      <input id="searchQuery" type="text" v-model="searchQuery"
                        class="form-control border-0 ps-4 pe-0 py-3" placeholder="Search terms, meanings, references..."
                        aria-label="Search Islamic Dictionary" :aria-controls="'results-region'"
                        @input="updateSuggestions" @focus="updateSuggestions" @blur="delayHideSuggestions"
                        @keydown.down.prevent="navigateSuggestions(1)" @keydown.up.prevent="navigateSuggestions(-1)"
                        @keydown.enter.prevent="selectSuggestion(highlightedIndex)"
                        @keydown.escape="showSuggestions = false" autocomplete="off" spellcheck="false"
                        style="box-shadow: none;" />
                      <span class="input-group-text bg-white border-0 pe-3 ps-2 d-flex align-items-center">
                        <i class="bi bi-search fs-5" style="color: var(--primary-color); transition: color 0.2s;"
                          @mouseover="this.style.color = '#00a68f'" @mouseout="this.style.color = '#00bfa6'"></i>
                      </span>
                      <span v-if="searchQuery" class="input-group-text bg-white border-0 px-2">
                        <button class="btn btn-link p-0" style="color: var(--primary-color); transition: color 0.2s;"
                          @click="clearSearch" aria-label="Clear search" title="Clear search"
                          @mouseover="this.style.color = '#00a68f'" @mouseout="this.style.color = '#00bfa6'">
                          <i class="bi bi-x-lg fs-5"></i>
                        </button>
                      </span>
                    </div>
                    <!-- Suggestions Dropdown -->
                    <div v-if="showSuggestions && filteredSuggestions.length && searchQuery.length >= 2"
                      class="position-absolute w-100 shadow-lg rounded-bottom border mt-1 bg-white" role="listbox"
                      :aria-activedescendant="highlightedIndex >= 0 ? 'suggestion-' + highlightedIndex : null"
                      style="z-index: 1050; max-height: 40vh; overflow-y: auto; border-top: none;">
                      <div class="p-2 border-bottom bg-light">
                        <small class="text-muted">
                          <i class="bi bi-lightbulb me-1" aria-hidden="true"></i>Search tips: Use quotes for exact
                          phrases, + for required
                          words
                        </small>
                      </div>
                      <div class="list-group list-group-flush">
                        <button v-for="(suggestion, index) in filteredSuggestions" :key="index" type="button"
                          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0 px-3 py-2"
                          :class="{ 'active': index === highlightedIndex }" @mousedown.prevent="selectSuggestion(index)"
                          @mouseover="highlightedIndex = index" :id="'suggestion-' + index" role="option"
                          :aria-selected="index === highlightedIndex ? 'true' : 'false'">
                          <div class="d-flex flex-column">
                            <span class="fw-bold">{{ suggestion.term }}</span>
                            <small class="text-muted">{{ suggestion.meaning.substring(0, 60) }}...</small>
                          </div>
                          <div class="d-flex flex-column align-items-end">
                            <span class="badge" style="background-color: #e0fff8; color: #00796b;">{{ suggestion.subject
                            }}</span>
                            <small class="text-muted">{{ getMatchType(suggestion) }}</small>
                          </div>
                        </button>
                      </div>
                      <div class="p-2 border-top bg-light">
                        <small class="text-muted">
                          <i class="bi bi-arrow-up me-1" aria-hidden="true"></i><i class="bi bi-arrow-down me-1"
                            aria-hidden="true"></i>Navigate • Enter to
                          select • Esc to clear
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Advanced Search Panel -->
              <!-- <transition name="fade">
                <div v-if="showAdvancedSearch" class="mt-3 p-3 bg-light rounded border">
                  <h6 class="fw-bold mb-3">
                    <i class="bi bi-gear me-1"></i>Advanced Search Options
                  </h6>
                  <div class="row g-3">
                    <div class="col-12 col-md-6">
                      <label class="form-label">Search Syntax</label>
                      <div class="small">
                        <div class="mb-2">
                          <code class="bg-light px-2 py-1 rounded">"exact phrase"</code> - Exact match
                        </div>
                        <div class="mb-2">
                          <code class="bg-light px-2 py-1 rounded">+required</code> - Must include
                        </div>
                        <div class="mb-2">
                          <code class="bg-light px-2 py-1 rounded">-excluded</code> - Must not include
                        </div>
                        <div class="mb-2">
                          <code class="bg-light px-2 py-1 rounded">term*</code> - Wildcard search
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label">Quick Filters</label>
                      <div class="d-flex flex-wrap gap-2">
                        <button
                          v-for="filter in quickFilters"
                          :key="filter.key"
                          class="btn btn-sm btn-outline-secondary px-3 py-2"
                          @click="applyQuickFilter(filter.key)"
                        >
                          {{ filter.label }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </transition> -->
            </div>

            <!-- Navigation toggles -->
            <!-- <div class="d-flex justify-content-center mt-4 mb-3">
              <div class="nav nav-pills gap-2">
                <button class="nav-link px-4 py-2" :class="{ 'active': currentPage === 1 }" @click="currentPage = 1"
                  title="Show all terms" aria-label="Show all terms"
                  :style="currentPage === 1 ? 'background-color: #00bfa6; color: #fff;' : 'color: #00bfa6; border: 1px solid #00bfa6;'">
                  <i class="bi bi-book me-2"></i>All Terms
                </button>
                <button class="nav-link px-4 py-2" :class="{ 'active': currentPage === 'favorites' }"
                  @click="currentPage = 'favorites'" title="Show favorites" aria-label="Show favorites"
                  :style="currentPage === 'favorites' ? 'background-color: #00bfa6; color: #fff;' : 'color: #00bfa6; border: 1px solid #00bfa6;'">
                  <i class="bi bi-heart-fill me-2"></i>Favorites
                </button>
                <button class="nav-link px-4 py-2" 
                   :class="{ 'active': currentPage === 'recent' }" 
                   @click="currentPage = 'recent'" 
                   title="Show recently viewed" 
                   aria-label="Show recently viewed"
                   :style="currentPage === 'recent' ? 'background-color: #00bfa6; color: #fff;' : 'color: #00bfa6; border: 1px solid #00bfa6;'">
                  <i class="bi bi-clock-history me-2"></i>Recent
                </button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </header>

    <main class="container-fluid py-4 px-3 px-md-4" :id="skipToContentId" tabindex="-1">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <!-- Empty state -->
          <div v-if="displayedTerms.length === 0">
            <div class="mb-4">
              <i class="bi bi-search-heart display-1" style="color: #00796b; opacity: 0.75;"></i>
            </div>
            <h3 class="fw-bold mb-3 fs-4 text-dark">No terms found</h3>
            <p class="text-muted mb-4 fs-5">Try adjusting your search criteria or browse all terms</p>
            <button class="btn btn-lg rounded-pill px-4 py-3 mb-2" @click="clearSearch"
              style="background-color: #00bfa6; color: #fff;">
              <i class="bi bi-arrow-counterclockwise me-2"></i>Reset Search
            </button>
          </div>

          <!-- Terms grid -->
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4" role="region" id="results-region"
            aria-label="Dictionary results" :aria-busy="isLoading ? 'true' : 'false'">
            <div v-for="term in displayedTerms" :key="term.id" class="col mb-4">
              <div class="card h-100 shadow-sm border-3 border shadow-md"
                style="border:2px solid #d1e0e7; border-radius: 10px;"
                :class="{ 'border-primary border-3': favorites.includes(term.id) }"
                :style="{ fontSize: `${termFontSizes[term.id]}rem` }" @click.self="handleCardClick(term.id)"
                tabindex="0" role="article" :aria-labelledby="'term-title-' + term.id"
                @keydown.enter="handleCardClick(term.id)" @keydown.space.prevent="handleCardClick(term.id)">
                <div class="card-body d-flex flex-column p-4 gap-2">
                  <span class="badge rounded-pill mb-3 px-3 py-2" style="background-color: #e0fff8; color: #00796b;">
                    {{ term.subject }}
                  </span>
                  <h5 class="card-title fw-bold mb-3 fs-4" :id="'term-title-' + term.id" style="color: #00796b;">{{
                    term.term }}</h5>
                  <p class="card-text mb-3" style="color: #00796b;">
                    <em>"{{ term.phrase }}"</em>
                  </p>
                  <div class="mb-3">
                    <h6 class="fw-bold mb-2" style="color: #00796b;">Meaning</h6>
                    <p class="mb-0">{{ term.meaning }}</p>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold mb-2" style="color: #00796b;">Example</h6>
                    <p class="mb-0">{{ term.example }}</p>
                  </div>
                  <div class="mb-3">
                    <h6 class="fw-bold mb-2" style="color: #00796b;">Reference</h6>
                    <p class="mb-0">{{ term.reference }}</p>
                  </div>
                </div>
                <div style="bottom: 0px;" class="card-footer bg-light border-top d-flex align-items-center px-3 py-2"
                  @click.stop>
                  <div class="d-flex gap-3 w-100 justify-content-evenly px-2 py-1">
                    <button type="button"
                      class="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0"
                      style="width: 48px; height: 48px;" @click="shareViaWhatsApp(term)" aria-label="Share via WhatsApp"
                      title="Share via WhatsApp">
                      <i class="bi bi-whatsapp fs-4"></i>
                    </button>
                    <button type="button"
                      class="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0"
                      style="width: 48px; height: 48px;" @click="adjustFontSize(term.id, -1)"
                      :disabled="termFontSizes[term.id] <= minFontSize" aria-label="Decrease font size"
                      title="Decrease font size">
                      <i class="bi bi-dash-lg fs-4"></i>
                    </button>
                    <button type="button"
                      class="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0"
                      style="width: 48px; height: 48px;" @click="adjustFontSize(term.id, 1)"
                      :disabled="termFontSizes[term.id] >= maxFontSize" aria-label="Increase font size"
                      title="Increase font size">
                      <i class="bi bi-plus-lg fs-4"></i>
                    </button>
                    <button type="button"
                      class="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0"
                      style="width: 48px; height: 48px;" @click="copyToClipboard(term)" aria-label="Copy to clipboard"
                      title="Copy to clipboard">
                      <i class="bi bi-clipboard fs-4"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Infinite Scroll Sentinel and Indicators -->
          <div class="d-flex justify-content-center my-3" v-if="isLoading">
            <div class="spinner-border text-success" role="status" aria-live="polite" aria-label="Loading more">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="text-center text-muted my-3" v-if="!isLoading && !hasMore && totalTerms > 0" aria-live="polite">
            No more results
          </div>
          <div ref="infiniteScrollSentinel" aria-hidden="true" style="height: 1px;"></div>

          <!-- Back to Top Button -->
          <!-- <button v-if="displayedTerms.length > 0" class="btn btn-lg rounded-circle position-fixed shadow-lg"
            @click="scrollToTop" title="Back to top" aria-label="Back to top"
            style="background-color: #00bfa6; color: #fff; bottom: 30px; right: 30px; z-index: 100; width: 60px; height: 60px;">
            <i class="bi bi-arrow-up fs-5"></i>
          </button> -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import islamicTerms from './islamic_terms.json';

function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

export default {
  data() {
    return {
      terms: Array.isArray(islamicTerms?.terms) ? islamicTerms.terms : [],
      indexedTerms: [],
      searchQuery: '',
      selectedSubject: '',
      sortBy: 'relevance',
      showAdvancedSearch: false,
      showSuggestions: false,
      highlightedIndex: -1,
      suggestions: [],
      favorites: [],
      currentPage: 1,
      itemsPerLoad: 12,
      loadedCount: 0,
      isLoading: false,
      observer: null,
      termFontSizes: {},
      baseFontSize: 1,
      minFontSize: 0.8,
      maxFontSize: 2.0,
      isSpeechSupported: false,
      isSpeechSynthesisSupported: false,
      isListening: false,
      voiceSearchActive: false,
      skipToContentId: 'mainContent',
      quickFilters: [],
      nextStepMinimized: false,
    };
  },
  computed: {
    filteredTerms() {
      const q = this.searchQuery.trim().toLowerCase();
      const subjectFilter = this.selectedSubject && this.selectedSubject !== 'all' ? this.selectedSubject : null;
      const seen = new Set();
      // Filter using prebuilt lowercase index, then map back to original term objects.
      let filtered = this.terms.filter((term, idx) => {
        if (!term) return false;
        if (subjectFilter && term.subject !== subjectFilter) return false;
        if (!q) {
          // Deduplicate by term text even when no query
          const key = (term.term || '').toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        }
        const it = this.indexedTerms[idx];
        if (!it) return false;
        const match = (
          (it.termL && it.termL.includes(q)) ||
          (it.meaningL && it.meaningL.includes(q)) ||
          (it.phraseL && it.phraseL.includes(q)) ||
          (it.referenceL && it.referenceL.includes(q))
        );
        if (!match) return false;
        const key = it.termL || '';
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Sort on a cloned array to avoid mutating reactive source
      const out = filtered.slice();
      if (this.sortBy === 'term') {
        out.sort((a, b) => a.term.localeCompare(b.term));
      } else if (this.sortBy === 'term-desc') {
        out.sort((a, b) => b.term.localeCompare(a.term));
      } else if (this.sortBy === 'subject') {
        out.sort((a, b) => a.subject.localeCompare(b.subject));
      } else if (this.sortBy === 'recent') {
        out.sort((a, b) => new Date(b.lastViewed || 0) - new Date(a.lastViewed || 0));
      } else if (this.sortBy === 'favorites') {
        const favs = new Set(this.favorites);
        out.sort((a, b) => {
          const aFav = favs.has(a.id);
          const bFav = favs.has(b.id);
          if (aFav && !bFav) return -1;
          if (!aFav && bFav) return 1;
          return 0;
        });
      }
      return out;
    },
    filteredSuggestions() {
      const q = this.searchQuery.trim().toLowerCase();
      if (!q) return [];
      const seen = new Set();
      const results = [];
      for (let i = 0; i < this.terms.length && results.length < 5; i++) {
        const term = this.terms[i];
        const it = this.indexedTerms[i];
        if (!term || !it) continue;
        if (
          (it.termL && it.termL.includes(q)) ||
          (it.meaningL && it.meaningL.includes(q)) ||
          (it.referenceL && it.referenceL.includes(q))
        ) {
          const key = it.termL || '';
          if (!seen.has(key)) {
            seen.add(key);
            results.push(term);
          }
        }
      }
      return results;
    },
    displayedTerms() {
      // Infinite scroll: filteredTerms already deduped
      return this.filteredTerms.slice(0, this.loadedCount || this.itemsPerLoad);
    },
    totalTerms() {
      return this.filteredTerms.length;
    },
    hasMore() {
      return this.loadedCount < this.totalTerms;
    },
    subjects() {
      const validSubjects = this.terms
        .filter(t => t && typeof t.subject === 'string' && t.subject.trim() !== '')
        .map(t => t.subject);
      return ['all', ...Array.from(new Set(validSubjects))];
    }
  },
  watch: {
    searchQuery: {
      handler: debounce(function (val) {
        this.showSuggestions = !!val && val.length >= 2 && this.filteredSuggestions.length > 0;
        this.highlightedIndex = -1;
        this.currentPage = 1;
        this.resetInfiniteScroll();
      }, 250),
      immediate: false
    },
    selectedSubject() {
      this.currentPage = 1;
      this.resetInfiniteScroll();
    },
    sortBy() {
      this.currentPage = 1;
      this.resetInfiniteScroll();
    }
  },
  mounted() {
    this.initialize();
    this.loadFavorites();
    this.loadRecentTerms();
    this.isSpeechSupported = 'SpeechRecognition' in window;
    this.isSpeechSynthesisSupported = 'SpeechSynthesisUtterance' in window;
    this.buildIndex();
    if (this.subjects.length > 1) {
      this.quickFilters = this.subjects.map(s => ({
        key: s,
        label: typeof s === 'string' ? s.charAt(0).toUpperCase() + s.slice(1) : s
      }));
    } else {
      console.warn('No valid subjects found for quickFilters');
      this.quickFilters = [];
    }
    // Initialize infinite scroll
    this.loadedCount = this.itemsPerLoad;
    this.$nextTick(() => {
      this.setupInfiniteScroll();
    });
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    buildIndex() {
      // Build a lowercase index aligned with this.terms for fast matching
      this.indexedTerms = (this.terms || []).map(t => {
        if (!t) return null;
        return {
          id: t.id,
          termL: (t.term || '').toLowerCase(),
          phraseL: (t.phrase || '').toLowerCase(),
          meaningL: (t.meaning || '').toLowerCase(),
          referenceL: (t.reference || '').toLowerCase(),
        };
      });
    },
    loadSuggestions() {
      this.suggestions = this.terms.slice(0, 5);
      this.updateSuggestions();
    },
    shareViaWhatsApp(term) {
      const text = encodeURIComponent(
        `Word: "${term.term}\n\n` +
        `Phrase: "${term.phrase}"\n` +
        `Meaning: ${term.meaning}\n` +
        `Example: ${term.example}\n` +
        `Reference: ${term.reference}`
      );
      const whatsappUrl = `https://wa.me/?text=${text}`;
      window.open(whatsappUrl, '_blank');
    },
    adjustFontSize(termId, change) {
      const currentSize = this.termFontSizes[termId] || 1;
      const newSize = currentSize + change * 0.1;
      const bounded = Math.max(this.minFontSize, Math.min(this.maxFontSize, newSize));
      // Clone to keep Vue 3 reactivity happy when adding new keys
      this.termFontSizes = {
        ...this.termFontSizes,
        [termId]: Number(bounded.toFixed(2)),
      };
    },
    initialize() {
      this.baseFontSize = parseFloat(localStorage.getItem('fontSize') || '1');
      this.loadFavorites();
      this.loadRecentTerms();
      this.loadSuggestions();
    },
    showToast(message, type = 'success') {
      let toastContainer = document.getElementById('toastContainer');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = 1090;
        document.body.appendChild(toastContainer);
      }
      const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
      const toastEl = document.createElement('div');
      toastEl.className = `toast align-items-center text-white ${bgClass} border-0`;
      toastEl.setAttribute('role', 'alert');
      toastEl.setAttribute('aria-live', 'assertive');
      toastEl.setAttribute('aria-atomic', 'true');
      toastEl.innerHTML = `
          <div class="d-flex">
            <div class="toast-body">
            ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        `;
      toastContainer.appendChild(toastEl);
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
      toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
      });
    },
    performSearch() {
      this.currentPage = 1;
      this.resetInfiniteScroll();
      this.loadSuggestions();
    },
    // Debounce helper removed: use the top-level debounce already used in watchers
    clearSearch() {
      this.searchQuery = '';
      this.selectedSubject = '';
      this.showAdvancedSearch = false;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
      this.resetInfiniteScroll();
      this.performSearch();
    },
    toggleAdvancedSearch() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
    },
    applyQuickFilter(filterKey) {
      this.selectedSubject = filterKey;
      this.showAdvancedSearch = false;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
      this.performSearch();
    },
    setupInfiniteScroll() {
      const sentinel = this.$refs.infiniteScrollSentinel;
      if (!sentinel || typeof IntersectionObserver === 'undefined') return;
      if (this.observer) {
        this.observer.disconnect();
      }
      this.observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && this.hasMore && !this.isLoading) {
          this.isLoading = true;
          const remaining = this.totalTerms - this.loadedCount;
          const toAdd = Math.min(this.itemsPerLoad, remaining);
          if (toAdd > 0) this.loadedCount += toAdd;
          this.isLoading = false;
        }
      }, { root: null, rootMargin: '0px 0px 200px 0px', threshold: 0 });
      this.observer.observe(sentinel);
    },
    teardownInfiniteScroll() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    },
    resetInfiniteScroll() {
      this.loadedCount = Math.min(this.itemsPerLoad, this.totalTerms || this.itemsPerLoad);
      this.isLoading = false;
      this.$nextTick(() => {
        this.setupInfiniteScroll();
      });
    },
    getMatchType(term) {
      if (term.matchType === 'exact') return 'Exact match';
      if (term.matchType === 'partial') return 'Partial match';
      if (term.matchType === 'wildcard') return 'Wildcard match';
      return 'No match';
    },
    navigateSuggestions(direction) {
      if (this.suggestions.length === 0) return;
      this.highlightedIndex = (this.highlightedIndex + direction + this.suggestions.length) % this.suggestions.length;
    },
    selectSuggestion(index) {
      if (this.filteredSuggestions.length === 0) return;
      const suggestion = this.filteredSuggestions[index];
      this.searchQuery = suggestion.term;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
      this.performSearch();
    },
    delayHideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false;
        this.highlightedIndex = -1;
      }, 100);
    },
    handleCardClick(termId) {
      const term = this.terms.find(t => t && t.id === termId);
      if (term) {
        this.handleTermClick(term);
      }
    },
    handleTermClick(term) {
      this.searchQuery = term.term;
      this.selectedSubject = term.subject;
      this.showAdvancedSearch = false;
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
      this.performSearch();
    },
    toggleFavorite(termId) {
      const idx = this.favorites.indexOf(termId);
      if (idx === -1) {
        this.favorites.push(termId);
      } else {
        this.favorites.splice(idx, 1);
      }
      this.saveFavorites();
      this.$forceUpdate();
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    loadFavorites() {
      const favs = localStorage.getItem('favorites');
      this.favorites = favs ? JSON.parse(favs) : [];
    },
    loadRecentTerms() {
      const recentTerms = JSON.parse(localStorage.getItem('recentTerms') || '[]');
      this.terms.forEach(term => {
        if (term && recentTerms.includes(term.id)) {
          term.lastViewed = new Date().toISOString();
        }
      });
    },
    speakTerm(term) {
      if (!this.isSpeechSynthesisSupported) return;
      const utterance = new SpeechSynthesisUtterance(term.meaning);
      utterance.lang = 'ar-SA';
      utterance.pitch = 1;
      utterance.rate = 0.9;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    },
    copyToClipboard(term) {
      const textToCopy = `Word: ${term.term}\n\nMeaning: ${term.meaning}\nExample: ${term.example}\nReference: ${term.reference}`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showToast('Term copied to clipboard!');
      }).catch(() => {
        this.showToast('Failed to copy term to clipboard.', 'danger');
      });
    },
    exportToCSV() {
      const csvContent = this.filteredTerms.map(term => [
        term.term,
        term.subject,
        term.meaning,
        term.example,
        term.reference,
        term.phrase,
        term.id
      ].map(field => `"${field || ''}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'islamic_dictionary.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    exportToJSON() {
      const jsonContent = JSON.stringify(this.filteredTerms, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'islamic_dictionary.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.scrollToTop();
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    skipToContent() {
      document.getElementById(this.skipToContentId).focus();
    },
    toggleVoiceSearch() {
      if (this.voiceSearchActive) {
        this.stopVoiceSearch();
      } else {
        this.startVoiceSearch();
      }
    },
    startVoiceSearch() {
      if (!this.isSpeechSupported) return;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.searchQuery = transcript;
        this.currentPage = 1;
        this.performSearch();
        this.isListening = false;
        this.voiceSearchActive = false;
      };

      recognition.onerror = (event) => {
        this.isListening = false;
        this.voiceSearchActive = false;
        this.showToast('Voice search error: ' + event.error, 'danger');
      };

      recognition.onend = () => {
        this.isListening = false;
        this.voiceSearchActive = false;
      };

      recognition.start();
      this.isListening = true;
      this.voiceSearchActive = true;
    },
    stopVoiceSearch() {
      if (this.voiceSearchActive) {
        this.isListening = false;
        this.voiceSearchActive = false;
        if (window.SpeechRecognition) {
          window.SpeechRecognition.stop();
        }
      }
    },
    updateSuggestions() {
      this.showSuggestions = this.searchQuery.length >= 2 && this.filteredSuggestions.length > 0;
    }
  },
  beforeDestroy() {
    if (this.debouncedSearch && typeof this.debouncedSearch.cancel === 'function') {
      this.debouncedSearch.cancel();
    }
    this.teardownInfiniteScroll();
    this.stopVoiceSearch();
  },
};
</script>

<style scoped>
.input-group {
  border-radius: 0.5rem;
  overflow: hidden;
}

.input-group-text {
  transition: background-color 0.2s;
}

.input-group-text:hover {
  background-color: #f8f9fa;
}

.input-group .bi-search,
.input-group .bi-x-lg {
  cursor: pointer;
}

.skip-link:focus {
  top: 20px !important;
  opacity: 1 !important;
}

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

.pulse {
  animation: pulse 1.5s infinite;
}

.list-group-item.active,
.list-group-item:active {
  background-color: #0b5d4b !important;
  color: #fff !important;
  border-color: #094c3f !important;
}

@media (max-width: 768px) {
  .nav-pills .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>
