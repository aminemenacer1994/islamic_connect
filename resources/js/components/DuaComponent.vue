<template>
  <div class="container-fluid py-4">
    <h1 class="display-4 fw-bold text-center mb-4">Dua Collection</h1>
    <p class="text-center container lead">
      The Dua Collection presents a thoughtfully curated selection of authentic Islamic supplications (duas), carefully
      organized into meaningful categories such as forgiveness, protection, healing, gratitude, and many more.
    </p>

    <!-- Search Input (Prominent and Top of Hierarchy) -->
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="search-container mb-4">
            <h4 class="fw-bold text-center mb-3">Search Duas</h4>
            <div class="input-group">
              <span class="input-group-text bg-primary text-white">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control form-control-lg search-input"
                placeholder="Search by title, Arabic, translation, or reference..."
                aria-label="Search Duas"
                @input="resetPagination"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row mb-4">
        <!-- Category Dropdown -->
        <div class="col-md-6">
          <div class="mb-3">
            <h4 class="fw-bold text-left pt-2 pb-2 container">Select a Category:</h4>
            <select v-model="selectedCategory" class="form-select" @change="resetPagination">
              <option value="">Select a Dua Category</option>
              <option v-for="category in duaCollection" :key="category.id" :value="category.id">
                {{ category.name }} ({{ category.duas.length }} Duas)
              </option>
            </select>
          </div>
        </div>

        <!-- Reference Dropdown -->
        <div class="col-md-6">
          <div class="mb-3">
            <h4 class="fw-bold text-left pt-2 pb-2 container">Select a Reference:</h4>
            <select v-model="selectedReference" class="form-select" @change="resetPagination">
              <option value="">Select a Reference</option>
              <option v-for="reference in uniqueReferences" :key="reference" :value="reference">
                {{ reference }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCopyMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      Content copied to clipboard!
      <button type="button" class="btn-close" @click="showCopyMessage = false" aria-label="Close"></button>
    </div>

    <div class="container text-center">
      <div v-if="filteredDuas.length === 0" class="alert alert-info">
        No duas found matching your search criteria.
      </div>
      <div v-for="category in filteredDuas" :key="category.id" class="row mb-5">
        <h3 class="fw-bold text-left mb-4 category-title">{{ category.name }}</h3>
        <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-md-6 mb-4">
          <div class="card dua-card shadow-sm">
            <!-- Highlighted Title -->
            <div class="card-header">
              <h3 class="mb-0 fw-bold text-left title-text" v-html="highlightText(dua.title)"></h3>
            </div>

            <div class="card-body">
              <!-- Arabic Section with TTS Icon -->
              <div class="row align-items-center mb-3">
                <div class="col-2 text-center">
                  <!-- TTS Icon (uncomment to enable) -->
                  <!-- <i class="bi bi-volume-up h4 icon-hover" style="cursor:pointer" @click="speak(dua.arabic, 'ar')" data-bs-toggle="tooltip" data-bs-placement="top" title="Play Arabic"></i> -->
                </div>
                <div class="col-10">
                  <!-- Highlighted Arabic Text -->
                  <p :style="{ fontSize: fontSize + 'px' }" class="text-right arabic-text" v-html="highlightText(dua.arabic)"></p>
                </div>
              </div>

              <!-- Translation Section -->
              <div class="row align-items-center mb-3">
                <div class="col-12">
                  <!-- Highlighted Translation Text -->
                  <p :style="{ fontSize: fontSize * 0.9 + 'px' }" class="text-left translation-text" v-html="highlightText(dua.translation)"></p>
                </div>
              </div>

              <!-- Reference Section -->
              <div class="row align-items-center">
                <div class="col-12">
                  <!-- Highlighted Reference Text -->
                  <p :style="{ fontSize: fontSize * 0.8 + 'px' }" class="text-left reference-text text-secondary" v-html="highlightText('- ' + dua.reference)"></p>
                </div>
              </div>
            </div>

            <!-- Action Icons -->
            <div class="card-footer d-flex justify-content-between align-items-center">
              <div class="text-center action-item">
                <button
                  class="btn btn-circle action-btn"
                  @click="changeFontSize('decrease')"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Decrease Font Size"
                  aria-label="Decrease Font Size"
                >
                  <i class="bi bi-dash-circle"></i>
                </button>
                <div class="action-label">Decrease</div>
              </div>
              <div class="text-center action-item">
                <button
                  class="btn btn-circle action-btn"
                  @click="changeFontSize('increase')"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Increase Font Size"
                  aria-label="Increase Font Size"
                >
                  <i class="bi bi-plus-circle"></i>
                </button>
                <div class="action-label">Increase</div>
              </div>
              <div class="text-center action-item">
                <button
                  class="btn btn-circle action-btn"
                  @click="shareOnWhatsApp(dua)"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Share"
                  aria-label="Share content"
                >
                  <i class="bi bi-share"></i>
                </button>
                <div class="action-label">Share</div>
              </div>
              <div class="text-center action-item">
                <button
                  class="btn btn-circle action-btn"
                  @click="copyContent(dua)"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Copy Content"
                  aria-label="Copy content"
                >
                  <i class="bi bi-clipboard"></i>
                </button>
                <div class="action-label">Copy</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination d-flex justify-content-center mt-4">
          <button
            class="btn btn-outline-primary me-2"
            :disabled="currentPage[category.id] === 1"
            @click="changePage('prev', category.id)"
          >
            Previous
          </button>
          <span class="align-self-center pagination-text">Page {{ currentPage[category.id] }} of {{ totalPages(category.duas) }}</span>
          <button
            class="btn btn-outline-primary ms-2"
            :disabled="currentPage[category.id] >= totalPages(category.duas)"
            @click="changePage('next', category.id)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      duaCollection: [],
      searchQuery: '',
      selectedCategory: '',
      selectedReference: '',
      currentPage: {},
      duasPerPage: 20,
      showCopyMessage: false,
      fontSize: 18,
    };
  },
  computed: {
    uniqueReferences() {
      const references = new Set();
      this.duaCollection.forEach(category => {
        category.duas.forEach(dua => {
          if (dua.reference) references.add(dua.reference);
        });
      });
      return [...references].sort();
    },
    filteredCategories() {
      let filteredByCategory = this.selectedCategory
        ? this.duaCollection.filter(category => category.id === parseInt(this.selectedCategory))
        : this.duaCollection;

      if (this.selectedReference) {
        filteredByCategory = filteredByCategory.map(category => {
          const filteredDuas = category.duas.filter(dua => dua.reference === this.selectedReference);
          return { ...category, duas: filteredDuas };
        }).filter(category => category.duas.length > 0);
      }

      if (!this.searchQuery.trim()) {
        return filteredByCategory;
      }

      return filteredByCategory.map(category => {
        const filteredDuas = category.duas.filter(dua => {
          const searchQueryLower = this.searchQuery.toLowerCase();
          return (
            dua.title.toLowerCase().includes(searchQueryLower) ||
            dua.arabic.toLowerCase().includes(searchQueryLower) ||
            dua.transliteration.toLowerCase().includes(searchQueryLower) ||
            dua.translation.toLowerCase().includes(searchQueryLower) ||
            dua.reference.toLowerCase().includes(searchQueryLower)
          );
        });
        return { ...category, duas: filteredDuas };
      }).filter(category => category.duas.length > 0);
    },
    filteredDuas() {
      return this.filteredCategories;
    },
  },
  methods: {
    highlightText(text) {
      if (!this.searchQuery.trim()) return text;
      const regex = new RegExp(`(${this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    },
    changeFontSize(action) {
      if (action === 'increase') {
        this.fontSize += 2;
      } else if (action === 'decrease' && this.fontSize > 12) {
        this.fontSize -= 2;
      }
    },
    speak(text, lang) {
      if ('speechSynthesis' in window) {
        if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-GB';
        utterance.pitch = 0.8;
        utterance.rate = 0.8;
        utterance.onstart = () => console.log('TTS started.');
        utterance.onerror = e => console.error('TTS error:', e);
        utterance.onend = () => console.log('TTS ended.');
        speechSynthesis.speak(utterance);
      } else {
        console.error('TTS is not supported in this browser.');
      }
    },
    copyContent(dua) {
      const text = `Dua title: ${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\n- ${dua.reference}`;
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyMessage = true;
        setTimeout(() => {
          this.showCopyMessage = false;
        }, 3000);
      }).catch(err => {
        console.error('Failed to copy content: ', err);
      });
    },
    shareOnWhatsApp(dua) {
      const text = `Dua title: ${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nReference: ${dua.reference}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/?text=${encodedText}`;
      window.open(url, '_blank');
    },
    getPaginatedDuas(duas) {
      const start = ((this.currentPage[duas[0]?.id] || 1) - 1) * this.duasPerPage;
      const end = start + this.duasPerPage;
      return duas.slice(start, end);
    },
    changePage(direction, categoryId) {
      const totalPages = this.totalPages(this.duaCollection.find(c => c.id === categoryId).duas);
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
      this.duaCollection.forEach(category => {
        this.currentPage[category.id] = 1;
      });
    },
  },
  created() {
    fetch('/duaCollection.json')
      .then(response => response.json())
      .then(data => {
        this.duaCollection = data.categories;
        this.duaCollection.forEach(category => {
          this.currentPage[category.id] = 1;
        });
      })
      .catch(error => console.error('Error loading dua collection:', error));
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');

@media (min-width: 1024px) {
  .dua-card-content {
    font-size: 26px;
  }
}

.dua-description {
  color: #333333;
}

.container {
  margin: auto;
}

mark {
  background-color: rgb(13, 182, 145);
  color: white;
  padding: 0.1em 0.2em;
  border-radius: 3px;
}

.dua-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.dua-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 1.25rem;
  border-radius: 12px 12px 0 0;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  padding: 0.75rem 1.25rem;
  border-radius: 0 0 12px 12px;
}

.title-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
}

.arabic-text {
  font-family: 'Amiri', serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: #1a1a1a;
  line-height: 1.6;
  direction: rtl;
}

.translation-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  color: #333333;
  line-height: 1.5;
}

.reference-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #6c757d;
  line-height: 1.4;
}

.category-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a;
}



.action-btn {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;
}

.action-btn:hover {
  background-color: rgb(13, 182, 145);
  color: #ffffff;
}

.action-btn i {
  font-size: 1.1rem;
}

.action-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #333333;
  margin-top: 0.25rem;
}

.pagination button {
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s;
}

.pagination button:hover:not(:disabled) {
  background-color: rgb(13, 182, 145);
  color: #ffffff;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.pagination-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #333333;
  margin: 0 1rem;
}

.search-container {
  transition: transform 0.2s ease-in-out;
}

.search-container:hover {
  transform: scale(1.02);
}

.search-input {
  border-radius: 0 0.375rem 0.375rem 0;
  padding: 0.75rem;
  font-size: 1.1rem;
}

.search-input:focus {
  border-color: rgb(13, 182, 145);
  box-shadow: 0 0 8px rgba(13, 182, 145, 0.3);
}

.input-group-text {
  background-color: rgb(13, 182, 145);
  border: none;
}

.input-group-text i {
  font-size: 1.2rem;
}

.form-select:focus {
  border-color: rgb(13, 182, 145);
  box-shadow: 0 0 5px rgba(13, 182, 145, 0.5);
}
</style>