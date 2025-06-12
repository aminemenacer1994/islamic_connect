<template>
  <div class="dictionary-app" :style="{ fontSize: `${baseFontSize}rem` }">
    <header class=" py-3 py-md-4 ">
      <div class="container-fluid px-3 px-md-4">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">
            <div class="text-center mb-3 mb-md-4">
              <h1 class="display-4 display-md-5 fw-bold text-dark mb-2">
                Islamic Dictionary
              </h1>
              <p class="text-black-50 display-5 mb-0 fs-6 fs-md-5">
                A comprehensive resource for exploring Islamic terms and their meanings
              </p>
            </div>
            <div class="search-section">
              <div class="row g-2 g-md-3">
                <div class="col-12 col-md-4">
                  <label for="subjectFilter" class="form-label fw-bold text-dark">Subject</label>
                  <select
                    id="subjectFilter"
                    v-model="selectedSubject"
                    class="form-select border-0 shadow-sm"
                    :class="{ 'form-select-lg': $isLargeScreen }"
                    aria-label="Filter by subject"
                    @change="debouncedSearch"
                  >
                    <option value="">All Subjects</option>
                    <option v-for="subject in subjects" :key="subject" :value="subject">
                      {{ subject }}
                    </option>
                  </select>
                </div>
                <div class="col-12 col-md-8">
                  <label for="searchQuery" class="form-label fw-bold text-dark">Search Query</label>
                  <div class="search-bar position-relative">
                    <div class="input-group shadow-sm" :class="{ 'input-group-lg': $isLargeScreen }">
                      <span class="input-group-text bg-white border-0">
                        <i class="bi bi-search text-secondary"></i>
                      </span>
                      <input
                        id="searchQuery"
                        type="text"
                        v-model="searchQuery"
                        class="form-control border-0 py-2 py-md-3"
                        :class="{ 'fs-5': $isLargeScreen }"
                        placeholder="Search terms, meanings, or references..."
                        aria-label="Search Islamic Dictionary"
                        @input="debouncedSearch"
                        @focus="showSuggestions = true"
                        @blur="delayHideSuggestions"
                        @keydown.down.prevent="navigateSuggestions(1)"
                        @keydown.up.prevent="navigateSuggestions(-1)"
                        @keydown.enter.prevent="selectSuggestion(highlightedIndex)"
                      />
                      <button
                        v-if="searchQuery"
                        class="btn btn-outline-secondary border-0 touch-friendly"
                        type="button"
                        @click="clearSearch"
                        aria-label="Clear search"
                      >
                        <i class="bi bi-x-lg"></i>
                      </button>
                      <button
                        class="btn btn-outline-secondary border-0 touch-friendly"
                        type="button"
                        :disabled="!isSpeechSupported"
                        :title="isSpeechSupported ? 'Start voice search' : 'Voice search not supported'"
                        @click="toggleVoiceSearch"
                        aria-label="Toggle voice search"
                      >
                        <i class="bi bi-mic" :class="{ 'text-danger pulse': isListening }"></i>
                      </button>
                    </div>
                    <div
                      v-if="showSuggestions && suggestions.length && searchQuery.length >= 2"
                      class="suggestions-dropdown shadow-lg rounded-bottom"
                    >
                      <div class="list-group">
                        <button
                          v-for="(suggestion, index) in suggestions"
                          :key="index"
                          type="button"
                          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          :class="{ 'active': index === highlightedIndex }"
                          @mousedown.prevent="selectSuggestion(index)"
                          @mouseover="highlightedIndex = index"
                        >
                          <span>{{ suggestion.term }}</span>
                          <small class="text-muted">{{ suggestion.subject }}</small>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main class="container-fluid py-3 py-md-4 px-3 px-md-4">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <div v-if="paginatedTerms.length === 0" class="empty-state text-center py-4 py-md-5">
            <div class="empty-icon mb-3 mb-md-4">
              <i class="bi bi-search-heart fs-2 fs-md-1 text-muted"></i>
            </div>
            <h3 class="fw-bold mb-2 mb-md-3 fs-5 fs-md-4">No terms found</h3>
            <p class="text-muted mb-3 mb-md-4 fs-6 fs-md-5">Try adjusting your search or filter criteria</p>
            <button class="btn btn-primary px-3 px-md-4 touch-friendly" @click="clearSearch">
              <i class="bi bi-arrow-counterclockwise me-2"></i>Reset Search
            </button>
          </div>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 g-md-4">
            <div v-for="term in paginatedTerms" :key="term.id" class="col">
              <div class="card h-100 border-0 shadow-sm hover-effect">
                <div class="card-body d-flex flex-column p-3 p-md-4" :style="{ fontSize: `${termFontSizes[term.id]}rem` }">
                  <span class="badge bg-primary-subtle text-primary rounded-pill mb-2 mb-md-3">
                    {{ term.subject }}
                  </span>
                  <h5 class="card-title fw-bold mb-2 mb-md-3">{{ term.term }}</h5>
                  <p class="card-text text-muted mb-2 mb-md-3">
                    <small>"{{ term.phrase }}"</small>
                  </p>
                  <div class="mb-2 mb-md-3">
                    <h6 class="fw-bold text-primary">Meaning</h6>
                    <p>{{ term.meaning }}</p>
                  </div>
                  <div class="mb-2 mb-md-3">
                    <h6 class="fw-bold text-primary">Example</h6>
                    <p>{{ term.example }}</p>
                  </div>
                  <div class="mb-2 mb-md-3">
                    <h6 class="fw-bold text-primary">Reference</h6>
                    <p>{{ term.reference }}</p>
                  </div>
                </div>
                <div class="card-bottom bg-light d-flex  gap-1 gap-md-2 p-2 p-md-3">
                  <button
                    class="btn btn-outline-secondary btn-sm touch-friendly"
                    @click="adjustFontSize(term.id, -1)"
                    :disabled="termFontSizes[term.id] <= minFontSize"
                    title="Decrease font size"
                    aria-label="Decrease font size"
                  >
                    <i class="bi bi-dash-lg"></i>
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm touch-friendly"
                    @click="adjustFontSize(term.id, 1)"
                    :disabled="termFontSizes[term.id] >= maxFontSize"
                    title="Increase font size"
                    aria-label="Increase font size"
                  >
                    <i class="bi bi-plus-lg"></i>
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm touch-friendly"
                    @click="resetFontSize(term.id)"
                    title="Reset font size"
                    aria-label="Reset font size"
                  >
                    <i class="bi bi-fonts"></i>
                  </button>
                  <a
                    class="btn btn-outline-success btn-sm touch-friendly"
                    :href="getWhatsAppShareLink(term)"
                    target="_blank"
                    title="Share via WhatsApp"
                    aria-label="Share via WhatsApp"
                  >
                    <i class="bi bi-whatsapp"></i>
                  </a>
                  <button
                    class="btn btn-outline-secondary btn-sm touch-friendly"
                    @click="copyToClipboard(term)"
                    title="Copy to clipboard"
                    aria-label="Copy term details"
                  >
                    <i class="bi bi-clipboard"></i>
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm touch-friendly"
                    @click="speakTerm(term)"
                    :disabled="!isSpeechSynthesisSupported"
                    :title="isSpeechSynthesisSupported ? 'Read aloud' : 'Text-to-speech not supported'"
                    aria-label="Read term aloud"
                  >
                    <i class="bi bi-volume-up"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <nav v-if="filteredTerms.length > termsPerPage" class="mt-3 mt-md-4" aria-label="Page navigation">
            <ul class="pagination justify-content-center flex-wrap">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link touch-friendly" @click="currentPage--" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </button>
              </li>
              <li class="page-item disabled">
                <span class="page-link">Page {{ currentPage }} of {{ totalPages }}</span>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link touch-friendly" @click="currentPage++" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import islamicTerms from './islamic_terms.json';

export default {
  name: 'IslamicDictionary',
  data() {
    return {
      searchQuery: '',
      selectedSubject: '',
      terms: islamicTerms.terms || [],
      isListening: false,
      isSpeechSupported: false,
      isSpeechSynthesisSupported: false,
      recognition: null,
      suggestions: [],
      showSuggestions: false,
      highlightedIndex: -1,
      subjects: [
        'Worship',
        'Jurisprudence',
        'Eschatology',
        'Ethics',
        'History',
        'Pilgrimage',
        'Marriage',
        'Theology',
        'Quranic Studies',
        'Hadith',
        'Islamic Law',
        'Spirituality',
        'Biography',
        'Economics',
        'Culture',
        'Prophetic Tradition',
        'Islamic Philosophy',
        'Mysticism',
        'Education',
        'Science',
        'Politics',
        'Community',
        'Charity',
        'Fasting',
        'Prayer'
      ],
      baseFontSize: 1,
      termFontSizes: {},
      minFontSize: 0.875,
      maxFontSize: 1.375,
      currentPage: 1,
      termsPerPage: 6
    };
  },
  computed: {
    filteredTerms() {
      let filtered = this.terms;
      const query = this.searchQuery.toLowerCase().trim();

      if (this.selectedSubject) {
        filtered = filtered.filter(term => term.subject.toLowerCase() === this.selectedSubject.toLowerCase());
      }

      if (query) {
        filtered = filtered.filter(term =>
          term.term.toLowerCase().includes(query) ||
          term.meaning.toLowerCase().includes(query) ||
          term.reference.toLowerCase().includes(query)
        );
      }

      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredTerms.length / this.termsPerPage);
    },
    paginatedTerms() {
      const start = (this.currentPage - 1) * this.termsPerPage;
      const end = start + this.termsPerPage;
      return this.filteredTerms.slice(start, end);
    },
    $isLargeScreen() {
      return window.innerWidth >= 768;
    }
  },
  watch: {
    selectedSubject() {
      this.debouncedSearch();
    }
  },
  methods: {
    truncate(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    debounce(fn, delay) {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
      };
    },
    debouncedSearch() {
      this.debounce(() => {
        this.updateSuggestions();
        this.currentPage = 1;
      }, 300)();
    },
    updateSuggestions() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query.length < 2) {
        this.suggestions = [];
        return;
      }

      let filtered = this.terms;
      if (this.selectedSubject) {
        filtered = filtered.filter(term => term.subject.toLowerCase() === this.selectedSubject.toLowerCase());
      }

      this.suggestions = filtered
        .filter(term =>
          term.term.toLowerCase().includes(query) ||
          term.meaning.toLowerCase().includes(query) ||
          term.reference.toLowerCase().includes(query)
        )
        .slice(0, 5);
    },
    selectSuggestion(index) {
      if (index >= 0 && index < this.suggestions.length) {
        this.searchQuery = this.suggestions[index].term;
        this.suggestions = [];
        this.showSuggestions = false;
        this.highlightedIndex = -1;
        this.currentPage = 1;
      }
    },
    navigateSuggestions(direction) {
      if (!this.suggestions.length) return;
      this.highlightedIndex = Math.max(
        0,
        Math.min(this.suggestions.length - 1, this.highlightedIndex + direction)
      );
    },
    delayHideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 200);
    },
    clearSearch() {
      this.searchQuery = '';
      this.selectedSubject = '';
      this.suggestions = [];
      this.showSuggestions = false;
      this.highlightedIndex = -1;
      this.currentPage = 1;
    },
    initSpeechRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.isSpeechSupported = true;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.onresult = event => {
          this.searchQuery = event.results[0][0].transcript;
          this.updateSuggestions();
          this.isListening = false;
        };
        this.recognition.onend = () => (this.isListening = false);
        this.recognition.onerror = event => {
          console.error('Speech recognition error:', event.error);
          this.isListening = false;
          alert('Voice search error: ' + event.error);
        };
      } else {
        this.isSpeechSupported = false;
        console.warn('SpeechRecognition API not supported in this browser.');
      }

      this.isSpeechSynthesisSupported = 'speechSynthesis' in window;
    },
    toggleVoiceSearch() {
      if (!this.isSpeechSupported) return;
      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      } else {
        this.recognition.start();
        this.isListening = true;
      }
    },
    adjustFontSize(termId, change) {
      this.termFontSizes[termId] = Math.min(this.maxFontSize, Math.max(this.minFontSize, (this.termFontSizes[termId] || 1) + change * 0.125));
      this.$forceUpdate();
    },
    resetFontSize(termId) {
      this.termFontSizes[termId] = 1;
      this.$forceUpdate();
    },
    copyToClipboard(term) {
      const text = `Term: ${term.term}\nPhrase: ${term.phrase}\nMeaning: ${term.meaning}\nExample: ${term.example}\nReference: ${term.reference}\nSubject: ${term.subject}`;
      navigator.clipboard.writeText(text).then(() => {
        const toast = new bootstrap.Toast(document.getElementById('copyToast'));
        toast.show();
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    },
    getWhatsAppShareLink(term) {
      const text = `Islamic Term: ${term.term}\n\n"${term.phrase}"\n\nMeaning: ${term.meaning}\n\nExample: ${term.example}\n\nReference: ${term.reference}`;
      return `https://wa.me/?text=${encodeURIComponent(text)}`;
    },
    speakTerm(term) {
      if (!this.isSpeechSynthesisSupported) return;
      const utterance = new SpeechSynthesisUtterance(
        `term=${term.term}. Phrase: ${term.phrase}. Meaning: ${term.meaning}. Example: ${term.example}. Reference: ${term.reference}. Subject: ${term.subject}.`
      );
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  },
  mounted() {
    this.initSpeechRecognition();
    
    this.terms.forEach(term => {
      this.termFontSizes[term.id] = 1;
    });

    const toastEl = document.createElement('div');
    toastEl.id = 'copyToast';
    toastEl.className = 'toast align-items-center text-white bg-success position-fixed bottom-0 end-0 m-3';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi bi-check-circle me-2"></i> Copied to clipboard!
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    document.body.appendChild(toastEl);
  }
};
</script>

<style scoped>
.dictionary-app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);
}

.search-section {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.search-bar .form-control {
  border-radius: 8px !important;
}

.suggestions-dropdown {
  position: absolute;
  width: 100%;
  z-index: 1050;
  background: white;
  max-height: 40vh;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: none;
}

.suggestions-dropdown .list-group-item {
  border-left: none;
  border-right: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.suggestions-dropdown .list-group-item:last-child {
  border-bottom: none;
}

.suggestions-dropdown .list-group-item.active {
  background-color: #4e4376;
  border-color: #4e4376;
}

.card {
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.hover-effect:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.touch-friendly {
  min-width: 40px;
  min-height: 40px;
  padding: 0.5rem;
  touch-action: manipulation;
}

.empty-state {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  color: #e9ecef;
}

@media (max-width: 768px) {
  .dictionary-app {
    font-size: 0.9rem;
  }

  .search-section {
    padding: 0.75rem;
  }

  .card-header {
    gap: 0.5rem !important;
    padding: 0.5rem !important;
  }

  .card-body {
    padding: 0.75rem !important;
  }

  .pagination {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .dictionary-app {
    font-size: 0.85rem;
  }

  .display-6 {
    font-size: 1.5rem !important;
  }

  .fs-6 {
    font-size: 0.9rem !important;
  }

  .card-title {
    font-size: 1.1rem !important;
  }

  .card-text,
  .card-body p,
  .card-body small {
    font-size: 0.9rem !important;
  }
}

:focus {
  outline: 2px solid #4e4376;
  outline-offset: 2px;
}

.btn:focus,
.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(78, 67, 118, 0.25);
}

.pagination .page-link {
  border-radius: 8px;
  margin: 0 0.2rem;
  padding: 0.5rem 1rem;
}

.pagination .page-item.active .page-link {
  background-color: #4e4376;
  border-color: #4e4376;
}

.pagination .page-item.disabled .page-link {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>