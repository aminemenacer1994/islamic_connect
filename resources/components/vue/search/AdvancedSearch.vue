<template>
  <div>
    <!-- Search Input Group -->
    <div>
      <!-- Unified input group to align input and mic button on all screens -->
      <div class="container pb-3 px-3" ref="searchRoot">
        <div class="input-group w-100 search-input-group position-relative elegant-search">
          <input
            type="search"
            @input="onInput"
            @keydown="onKeyDown"
            v-model="searchTerm"
            placeholder="Search for a word in the quran..."
            class="form-control search-pill"
            style="padding: 12px 16px; height: 50px;"
          />
          <button
            type="button"
            class="btn mic-btn d-flex align-items-center justify-content-center"
            aria-label="Voice search"
            title="Voice search"
            @click="isListening ? stopVoiceRecognition() : startVoiceRecognition()"
            style="height: 50px; min-width: 56px;"
          >
            <i class="bi bi-mic-fill"></i>
          </button>

          <!-- Suggestions Dropdown (full width under the input group) -->
          <ul
            v-if="showSuggestions && suggestions.length"
            class="suggestions menu position-absolute"
            style="top: 100%; left: 0; right: 0; width: 100%; z-index: 1000; max-height: 60vh; overflow-y: auto;"
          >
            <li
              class="suggestion-item"
              v-for="(suggestion, index) in suggestions"
              :key="index"
              @click="selectSuggestion(suggestion)"
              @mouseenter="activeIndex = index"
              :class="{ active: index === activeIndex }"
            >
              {{ suggestion }}
            </li>
          </ul>
        </div>
        <div v-if="errorMessage" class="error-message mt-2">{{ errorMessage }}</div>
      </div>
    </div>


    <!-- show a message when recording starts -->
    <div v-if="isListening" class="listening-container listening-status-card">
      <div class="listening-icon-wrapper">
        <div class="listening-icon-ring"></div>
        <i class="bi bi-mic-fill listening-icon"></i>
      </div>
      <div class="listening-copy">
        <p class="listening-title">Listening</p>
        <small class="listening-subtitle">Speak now and we’ll fetch the verses.</small>
      </div>
    </div>
    <!-- Offcanvas for Search Results -->
    <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="offcanvasResults">
      <div class="offcanvas-header search-results-header">
        <div class="search-results-title">
          <span class="search-results-eyebrow">Quran Search</span>
          <h5 class="offcanvas-title">Search Results</h5>
          <p class="search-results-subtitle">Matched ayat with translations ready to share.</p>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close search results"></button>
      </div>
      <div ref="targetTafseerElement" class="offcanvas-body search-results-body">
        <div v-if="filteredResults.length && !loading" class="results-stack">
          <div class="results-summary">
            <div class="summary-card">
              <span class="summary-label">Surahs</span>
              <span class="summary-value">{{ totalSurahs }}</span>
            </div>
            <div class="summary-card">
              <span class="summary-label">Ayat</span>
              <span class="summary-value">{{ totalAyahs }}</span>
            </div>
            <p v-if="searchTerm" class="summary-note">
              Results for "<span>{{ searchTerm }}</span>"
            </p>
          </div>

          <article
            v-for="(result, index) in filteredResults"
            :key="result.id"
            class="result-card"
            :style="{ '--result-index': index }"
          >
            <div :id="'result-' + result.id">
              <header class="result-card-header">
                <div class="result-ref">
                  <span class="result-label">Ayah</span>
                  <span class="result-id">{{ result.ayah.surah_id }} : {{ result.ayah.ayah_id }}</span>
                </div>
                <span class="result-chip">Match</span>
              </header>
              <p class="result-arabic" dir="rtl">{{ result.ayah.ayah_text }}</p>
              <div class="result-translation">
                <span class="translation-label">Translation</span>
                <span
                  class="translation-text"
                  v-html="highlightSearch(expanded ? result.translation : result.translation)"
                ></span>
              </div>
            </div>
            <div class="result-actions">
              <button @click="shareOnWhatsApp(result)" type="button" class="btn result-btn result-btn--whatsapp">
                <i class="bi bi-whatsapp" aria-hidden="true"></i>
                Share on WhatsApp
              </button>
              <button @click="shareOnTwitter(result)" type="button" class="btn result-btn result-btn--x">
                <i class="bi bi-twitter-x" aria-hidden="true"></i>
                Share on X
              </button>
            </div>
          </article>
        </div>
        <div v-else-if="!loading" class="results-empty">
          <div class="results-empty-card">
            <i class="bi bi-search" aria-hidden="true"></i>
            <h5>No search results found.</h5>
            <p>Try a different word or a longer phrase.</p>
          </div>
        </div>
        <div v-if="loading" class="results-loading" role="status" aria-live="polite">
          <div class="results-loading-card">
            <span class="loading-spinner" aria-hidden="true"></span>
            <p>Gathering matches...</p>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios';

export default {
  props: {
    translation: { type: String, required: true },
    information: { type: Object, required: true },
    targetTranslationRef: { type: String, default: 'targetTranslationElement' },
  },
  data() {
    return {
      errorMessage: '',
      selectedAyah: null,
      loading: false,
      searchTerm: '',
      suggestions: [],
      showSuggestions: false,
      activeIndex: -1,
      tafseer: '',
      filteredResults: [],
      expanded: false,
      showMoreLink: true,
      filters: { translation: true, tafseer: false, transliteration: false },
      isListening: false,
      recognition: null,
    };
  },
  computed: {
    totalSurahs() {
      const ids = this.filteredResults.map(r => (r && r.ayah ? r.ayah.surah_id : null)).filter(Boolean);
      return new Set(ids).size;
    },
    totalAyahs() { return this.filteredResults.length; },
  },
  watch: {
    'information.ayah.id': {
      immediate: true,
      handler(newId) { if (newId) this.fetchTafseer(newId); },
    },
  },
  mounted() {
    if (this.information && this.information.ayah && this.information.ayah.id) {
      this.fetchTafseer(this.information.ayah.id);
    }
    // Close suggestions when clicking outside
    this._onDocClick = (e) => {
      const root = this.$refs.searchRoot;
      if (!root) return;
      if (!root.contains(e.target)) {
        this.showSuggestions = false;
        this.activeIndex = -1;
      }
    };
    document.addEventListener('click', this._onDocClick, { passive: true });
  },
  beforeUnmount() {
    if (this._onDocClick) {
      document.removeEventListener('click', this._onDocClick, { passive: true });
      this._onDocClick = null;
    }
  },
  methods: {
    async fetchTafseer(ayahId) {
      try { const { data } = await axios.get(`/tafseer/${ayahId}/fetch`); this.tafseer = data; }
      catch (e) { console.error('Error fetching tafseer:', e); }
    },
    onInput() {
      if (this.searchTerm && this.searchTerm.length > 2) {
        this.fetchSuggestions();
        this.showSuggestions = true;
      } else {
        this.suggestions = [];
        this.showSuggestions = false;
        this.activeIndex = -1;
      }
    },
    onKeyDown(e) {
      if (!this.suggestions.length) return;
      const max = this.suggestions.length - 1;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.showSuggestions = true;
        this.activeIndex = this.activeIndex < max ? this.activeIndex + 1 : 0;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.showSuggestions = true;
        this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : max;
      } else if (e.key === 'Enter') {
        if (this.activeIndex >= 0) {
          e.preventDefault();
          this.selectSuggestion(this.suggestions[this.activeIndex]);
        }
      } else if (e.key === 'Escape') {
        this.showSuggestions = false;
        this.activeIndex = -1;
      }
    },
    fetchSuggestions() {
      this.loading = true;
      axios.get('/search-translations', { params: { query: this.searchTerm, filters: this.filters } })
        .then(({ data }) => { this.suggestions = data.suggestions || []; this.activeIndex = this.suggestions.length ? 0 : -1; })
        .catch(err => { console.error('Error fetching suggestions:', err); this.suggestions = []; })
        .finally(() => { this.loading = false; });
    },
    selectSuggestion(s) { this.searchTerm = s; this.suggestions = []; this.showSuggestions = false; this.activeIndex = -1; this.fetchResults(s); this.showOffcanvas(); },
    startVoiceRecognition() {
      this.isListening = true; this.errorMessage = '';
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { alert('Speech Recognition not supported.'); this.isListening = false; return; }
      this.recognition = new SR(); this.recognition.lang = 'en-US'; this.recognition.continuous = false;
      this.recognition.onresult = (e) => {
        const transcript = (e.results[0][0].transcript || '').trim();
        this.isListening = false;
        if (transcript) this.handleVoiceSearchTerm(transcript);
      };
      this.recognition.onend = () => { this.isListening = false; };
      this.recognition.onerror = (e) => { console.error('Speech recognition error:', e.error); this.isListening = false; };
      this.recognition.start();
    },
    stopVoiceRecognition() { if (this.recognition) { this.recognition.stop(); this.isListening = false; if (this.searchTerm) { this.fetchResults(this.searchTerm); this.showOffcanvas(); } } },
    handleVoiceSearchTerm(term) {
      const normalized = term && term.trim();
      if (!normalized) return;
      this.searchTerm = normalized;
      this.fetchResults(normalized);
      this.showOffcanvas();
    },
    fetchResults(query) {
      this.loading = true;
      axios.get('/search-translations', { params: { query, filters: this.filters } })
        .then(({ data }) => { this.filteredResults = data.results || []; })
        .catch(err => { console.error('Error fetching results:', err); this.filteredResults = []; })
        .finally(() => { this.loading = false; });
    },
    searchWord() { if (!this.searchTerm) return; this.fetchResults(this.searchTerm); this.showOffcanvas(); },
    showOffcanvas() { const el = document.getElementById('offcanvasResults'); if (!el) return; const oc = new bootstrap.Offcanvas(el); oc.show(); },
    highlightSearch(text) { if (!text || !this.searchTerm) return text; const t = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); return String(text).replace(new RegExp(`(${t})`, 'gi'), '<mark>$1</mark>'); },
    shareOnWhatsApp(r) { const m = `Ayah: ${r.ayah.surah_id}:${r.ayah.ayah_id}\n\n${r.ayah.ayah_text}\n\nTranslation: ${r.translation}\n\nVisit our website : www.islamiconnect.com for more`; window.open(`https://wa.me/?text=${encodeURIComponent(m)}`, '_blank'); },
    shareOnTwitter(r) { const m = `Ayah: ${r.ayah.surah_id}:${r.ayah.ayah_id}\n\n${r.ayah.ayah_text}\n\nTranslation: ${r.translation}\n\nVisit our website : www.islamiconnect.com for more`; window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(m)}`, '_blank'); },
  },
};
</script>

<style scoped>
/* Ensure input and mic button align cleanly on mobile and desktop */
.search-input-group { position: relative; overflow: visible; }
.search-input-group > .form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  /* Make input fill available space */
  flex: 1 1 auto;
  min-width: 0;
}
.search-input-group > .btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex: 0 0 auto;
}
/* Prevent container overflow causing misalignment */
.search-input-group {
  width: 100%;
  flex-wrap: nowrap;
}
/* Improve list item text alignment on small screens */
.suggestions .list-group-item {
  text-align: left;
}
@media (max-width: 576px) {
  .search-input-group > .form-control {
    font-size: 0.95rem;
  }
}
</style>

<style scoped>
.elegant-search {
  border-radius: 16px;
  overflow: visible;
  box-shadow: 0 12px 30px rgba(38, 41, 46, 0.12);
  position: relative;
  border: 1px solid rgba(15, 110, 99, 0.18);
  background: rgba(255, 255, 255, 0.98);
}
.search-pill {
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #0f172a;
}
.search-pill::placeholder { color: #7c8a97; }
.search-pill:focus { box-shadow: none; }
.mic-btn {
  background-image: linear-gradient(135deg, #0f6e63 0%, #0b4c45 100%);
  color: #fff;
  border: none;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18), 0 10px 18px rgba(11, 76, 69, 0.35);
  transition: transform 0.2s ease, filter 0.2s ease;
}
.mic-btn:hover { filter: brightness(1.08); transform: translateY(-1px); }
.mic-btn .bi { font-size: 1.1rem; }
.error-message {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  font-size: 0.9em;
}

.listening-container {
  margin-top: 1.25rem;
}

.listening-status-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 420px;
  width: min(420px, 90vw);
  margin: 0 auto 2rem;
  padding: 1.25rem 1.5rem 1.75rem;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(15, 118, 110, 0.08), rgba(255, 255, 255, 0.95));
  border: 1px solid rgba(15, 118, 110, 0.25);
  box-shadow: 0 20px 30px rgba(11, 76, 69, 0.12), 0 12px 20px rgba(15, 118, 110, 0.15);
}

.listening-icon-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listening-icon-ring {
  position: absolute;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 3px solid rgba(15, 118, 110, 0.25);
  border-top-color: transparent;
  animation: spin 1.4s linear infinite;
}

.listening-icon {
  position: relative;
  font-size: 1.75rem;
  color: #0f766e;
}

.listening-copy {
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.listening-title {
  margin: 0;
  font-weight: 700;
  font-size: 1.35rem;
  color: #0f2f23;
  white-space: nowrap;
  line-height: 1.2;
}

.listening-subtitle {
  margin: 0;
  color: #3c5560;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* CSS */
.button-36 {
  background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: "Inter UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: 2.4rem;
  padding: 0 1.3rem;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  transition: all .5s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-36:hover {
  box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
  transition-duration: .1s;
}

.custom-link {
  color: white;
  font-size: bold;
}

@media (max-width: 576px) {
  .mobile-only {
    display: block;
    display: flex;
    width: 100%;
  }

  .custom-offcanvas {
    --bs-offcanvas-width: 100%;
  }

  .hide-on-mobile {
    display: none;
  }
}



/* Base positioning for suggestions menu */
.suggestions { position: absolute; z-index: 1055; width: 100%; }

.highlight {
  background-color: #3EB489;
  font-weight: bold;
}

.recent-searches {
  position: relative;
  width: 300px;
  /* Adjust the width as needed */
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.suggestions {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  width: 80%;
  max-height: 150px;
  /* Limit dropdown height */
  overflow-y: auto;
  /* Enable scrolling */
  z-index: 10;
  /* Ensure dropdown appears above other content */
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
  /* Highlight on hover */
}

/* Make sure dropdown appears above surrounding content */
.suggestions { z-index: 1055; background: #fff; }

.btn-primary {
  background-color: #0b5d4b !important;
  border-radius: 10px;
}

.btn-primary:focus {
  box-shadow: none;
}

.text {
  font-size: 13px;
}

.flex-row {
  border: 1px solid #F2F2F4;
  border-radius: 10px;
  margin: 0 1px 0;
}


.dropdown-menu {
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
}

/* High-contrast menu style */
.suggestions.menu {
  background: #f3fbfa; /* light teal panel (not pure white) */
  border: 1px solid rgba(11, 128, 111, 0.22);
  border-radius: 12px;
  box-shadow: 0 14px 30px rgba(26, 95, 122, 0.15);
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 4px; /* tight edge padding to reduce left gap */
}

.suggestions.menu .suggestion-item {
  list-style: none;
  color: #0f172a; /* readable dark text */
  padding: 8px 10px; /* reduced internal padding */
  cursor: pointer;
  transition: background-color .12s ease, color .12s ease, transform .06s ease, box-shadow .12s ease;
  border-bottom: 1px solid rgba(30, 33, 38, 0.06);
  border-radius: 8px;
  display: block;
}

.suggestions.menu .suggestion-item:last-child { border-bottom: 0; }

.suggestions.menu .suggestion-item:hover {
  background: rgba(11, 128, 111, 0.12); /* light teal wash */
  color: #0b806f;
  box-shadow: inset 3px 0 0 #0b806f; /* slim left accent, no big gap */
}

.suggestions.menu .suggestion-item.active {
  background: rgba(11, 128, 111, 0.16);
  color: #0b806f;
  box-shadow: inset 3px 0 0 #0b806f;
}

/* Highlighted match: subtle, high-contrast */
.suggestions.menu mark {
  background: transparent;
  color: #0b806f;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: rgba(11, 128, 111, 0.55);
}

@media (max-width: 576px) {
  .suggestions.menu { border-radius: 10px; }
  .suggestions.menu .suggestion-item { padding: 11px 12px; }
}

.list-group-item {
  border: none;
}

.alert-container {
  position: absolute;
  /* Position it absolutely */
  top: 10px;
  /* Adjust this value to control vertical position */
  left: 10px;
  /* Adjust this value to control horizontal position */
  z-index: 1000;
  /* Ensure it appears above other content */
}

.alert {
  margin-bottom: 10px;
  /* Add some spacing between alerts */
}

.custom-offcanvas {
  --offcanvas-ink: #0f2a27;
  --offcanvas-teal: #0b806f;
  --offcanvas-gold: #d6a54d;
  --bs-offcanvas-width: min(42rem, 92vw);
  background:
    radial-gradient(circle at 15% 10%, rgba(214, 165, 77, 0.22), transparent 45%),
    radial-gradient(circle at 85% 20%, rgba(14, 165, 150, 0.18), transparent 45%),
    linear-gradient(180deg, #0f5f56 0%, #0b3a35 58%, #082724 100%);
  color: #f8fafc;
}

.search-results-header {
  padding: 1.4rem 1.5rem 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  gap: 1rem;
}

.search-results-title {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.search-results-eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(248, 250, 252, 0.75);
  font-weight: 700;
}

.custom-offcanvas .offcanvas-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0;
}

.search-results-subtitle {
  margin: 0;
  color: rgba(248, 250, 252, 0.75);
  font-size: 0.95rem;
}

.custom-offcanvas .btn-close {
  filter: invert(1);
  opacity: 0.8;
}

.custom-offcanvas .btn-close:hover { opacity: 1; }

.search-results-body {
  padding: 1.2rem 1.5rem 1.8rem;
}

.results-stack {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.results-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.summary-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 14px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--offcanvas-ink);
  box-shadow: 0 12px 26px rgba(8, 30, 28, 0.22);
}

.summary-label {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  color: #3a4a45;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f4f48;
}

.summary-note {
  grid-column: 1 / -1;
  margin: 0;
  font-size: 0.85rem;
  color: rgba(248, 250, 252, 0.75);
}

.summary-note span {
  color: #fff;
  font-weight: 600;
}

.result-card {
  position: relative;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 20px;
  padding: 1rem 1.15rem 1.2rem;
  color: var(--offcanvas-ink);
  border: 1px solid rgba(11, 128, 111, 0.16);
  box-shadow: 0 18px 35px rgba(8, 30, 28, 0.25);
  overflow: hidden;
  animation: result-rise 0.45s ease both;
  animation-delay: calc(var(--result-index) * 0.05s);
}

.result-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1rem;
  bottom: 1rem;
  width: 4px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--offcanvas-gold), var(--offcanvas-teal));
}

.result-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.result-ref {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.result-label {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-weight: 700;
  color: #60726c;
}

.result-id {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #0b4c45;
}

.result-chip {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--offcanvas-teal);
  background: rgba(11, 128, 111, 0.12);
  border: 1px solid rgba(11, 128, 111, 0.2);
}

.result-arabic {
  margin: 0.8rem 0 0.9rem;
  font-size: 1.55rem;
  line-height: 1.85;
  text-align: right;
  color: #0b2f2b;
  background: rgba(15, 110, 99, 0.08);
  border-radius: 16px;
  padding: 0.85rem 1rem;
  font-family: "Noto Naskh Arabic", "Amiri", serif;
}

.result-translation {
  border-radius: 16px;
  padding: 0.75rem 0.95rem;
  background: rgba(15, 110, 99, 0.06);
  border: 1px solid rgba(15, 110, 99, 0.12);
}

.translation-label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;
  color: #0b5b53;
  margin-bottom: 0.35rem;
}

.translation-text {
  display: block;
  color: #1a3a35;
  font-size: 1rem;
  line-height: 1.6;
}

.translation-text mark {
  background: rgba(214, 165, 77, 0.35);
  color: #5a3606;
  padding: 0 0.2rem;
  border-radius: 0.35rem;
}

.result-actions {
  margin-top: 0.9rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.65rem;
}

.result-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  padding: 0.65rem 0.95rem;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-size: 0.95rem;
}

.result-btn--whatsapp {
  background: linear-gradient(135deg, #1fcf85, #0f8b61);
  color: #fff;
  box-shadow: 0 12px 24px rgba(16, 140, 93, 0.35);
}

.result-btn--x {
  background: #1c1f22;
  color: #fff;
  box-shadow: 0 12px 24px rgba(5, 8, 10, 0.35);
}

.result-btn:hover {
  transform: translateY(-1px);
}

.result-btn:focus-visible {
  outline: 3px solid rgba(11, 128, 111, 0.35);
  outline-offset: 2px;
}

.results-empty,
.results-loading {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.results-empty-card,
.results-loading-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 1.4rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.results-empty-card i {
  font-size: 1.6rem;
  color: var(--offcanvas-gold);
}

.results-empty-card h5 {
  margin: 0;
  font-weight: 700;
}

.results-empty-card p,
.results-loading-card p {
  margin: 0;
  color: rgba(248, 250, 252, 0.8);
}

.loading-spinner {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes result-rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .result-card { animation: none; }
  .result-btn,
  .mic-btn { transition: none; }
}

@media (max-width: 576px) {
  .search-results-body {
    padding: 1rem 1rem 1.5rem;
  }

  .result-card {
    padding: 0.9rem 0.95rem 1rem;
  }

  .result-arabic {
    font-size: 1.35rem;
    padding: 0.75rem 0.85rem;
  }

  .result-actions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .mobile-only {
    display: flex;
    flex-direction: column !important;
  }

  .custom-offcanvas {
    --bs-offcanvas-width: 100%;
  }
}

.pdf-content {
  /* Adjust text properties */
  font-family: Arial, sans-serif;
  /* Set a specific font */
  font-size: 14px;
  /* Set a base font size */
  line-height: 1.5;
  /* Set line height for readability */
  color: black;
  /* Set default text color to black */
  padding: 10px;
  /* Add padding for better layout */
}

.suggestions-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f1f1f1;
}
</style>
