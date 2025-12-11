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
    <div v-if="isListening" class="listening-container d-flex align-items-center justify-content-center">
      <!-- Spinner -->
      <div class="spinner-border text-secondary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <!-- Listening Text -->
      <span class="listening-text ml-3 mt-3" style="color: black;">
        <p>Listening</p>
      </span>
    </div>
    <!-- Offcanvas for Search Results -->
    <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="offcanvasResults">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Search Results</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close search results"></button>
      </div>
      <div ref="targetTafseerElement" class="offcanvas-body text-left">
        <!-- Display Results -->


        <div v-if="filteredResults.length && !loading">
          <div>
            <h5>Total Number of Surat: {{ totalSurahs }}</h5>
            <h5>Total Number of Ayat: {{ totalAyahs }}</h5>
          </div>
          <hr>
          <div v-for="result in filteredResults" :key="result.id" class="result-item">
            <div :id="'result-' + result.id">


              <div class="text-left pb-2">
                <h4>{{ result.ayah.surah_id }} : {{ result.ayah.ayah_id }}</h4>
              </div>
              <!--
            <div class="container pt-3 pb-3">
              <button type="button" class=" w-100 btn btn-light"><b>Go To Ayah</b></button>
            </div>
            -->
              <h3 class="text-right">{{ result.ayah.ayah_text }}</h3>
              <div>
                <h5><b>Translation: </b></h5>
                <span v-html="highlightSearch(expanded ? result.translation : result.translation)"></span>

              </div>
              <!-- <div>
              <h5 class="pt-2"><b>Tafseer: </b></h5>
              <span v-html="highlightSearch(expanded ? result.originalTafseer : result.originalTafseer)"></span>
              
            </div>
            <div>
              <h5 class="pt-2"><b>Transliteration: </b></h5>
              <span v-html="highlightSearch(expanded ? result.transliteration : result.transliteration)"></span>
            </div> -->

            </div>
            <div class="pt-2 row" style="padding:5px">
              <div class="col-md-6 pb-1">
                <button @click="shareOnWhatsApp(result)" type="button" class="container btn btn-success w-100">
                  <i @click="fastForwardSpeech" style="cursor: pointer;" aria-label="Fast forward audio"
                    class="bi bi-whatsapp ml-2 mr-2 custom-icon-play h5"></i><b>Share on WhatsApp</b>
                </button>
              </div>
              <div class="col-md-6">
                <button @click="shareOnTwitter(result)" type="button" class="container btn btn-dark w-100">
                  <i @click="fastForwardSpeech" style="cursor: pointer;" aria-label="Fast forward audio"
                    class="bi bi-twitter-x ml-2 mr-2 custom-icon-play h5"></i><b>Share on X</b>
                </button>
              </div>
              <!-- <div class="col-md-12 mt-2">
              <button @click="openModal(result)" type="button" class="btn btn-light w-100">
                <b>View Ayah Details</b>
              </button>
            </div> -->
            </div>


            <hr />
          </div>

        </div>
        <div v-else-if="!loading" class="text-center">
          <h5>No search results found.</h5>
        </div>
        <div v-if="loading" class="text-center">
          <h5>Loading...</h5>
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
.elegant-search { border-radius: 12px; overflow: visible; box-shadow: 0 1px 0 rgba(0,0,0,.02), 0 2px 8px rgba(0,0,0,.06); position: relative; }
.search-pill { border: 1px solid #e6eaee; background:#fff; font-size: 1rem; }
.search-pill::placeholder { color:#9aa4b2; }
.mic-btn { background-image: linear-gradient(135deg,#6a7cf7 0%, #6b4df2 50%, #6b3ef0 100%); color:#fff; border:none; width:56px; display:flex; align-items:center; justify-content:center; }
.mic-btn:hover { filter: brightness(1.05); }
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
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  font-weight: 300;
  color: rgb(0, 0, 0);
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}

.listening-icon {
  font-size: 1.3em;
  color: #000000;
}

.listening-text {
  color: #000000;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.dot-typing {
  padding-left: 10px;
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #119457;
  border-radius: 50%;
  animation: blink 1.4s infinite ease-in-out both;
}

.dot-typing:before,
.dot-typing:after {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  padding-left: 10px;
  background-color: #000000;
  border-radius: 50%;
  animation: blink 1.4s infinite ease-in-out both;
}

.dot-typing:before {
  animation-delay: 0.2s;
}

.dot-typing:after {
  animation-delay: 0.4s;
}

/* Blinking dots animation */
@keyframes blink {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
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
    background-color: #10584f;
    color: white;
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
  border-bottom: 1px solid rgba(2, 6, 23, 0.06);
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
  background-color: #10584f;
  color: white;
  width: 40%;
}

@media (max-width: 768px) {

  /* Adjust this width as needed for your breakpoint */
  .mobile-only {
    display: flex;
    flex-direction: column !important;
    /* Show only on mobile */
  }

  .custom-offcanvas {
    background-color: #10584f;
    color: white;
    width: 100%;
  }
}

.custom-offcanvas .result-item {
  margin-bottom: 15px;
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

.translation-text {
  color: black;
  /* Ensure translation text is visible */
  margin-top: 10px;
  /* Add spacing above the translation */
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