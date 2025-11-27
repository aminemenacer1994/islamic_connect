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


