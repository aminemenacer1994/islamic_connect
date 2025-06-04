<template>
  <div class="container-fluid py-3">
    <h1 class="fw-semibold text-center mb-3">Dua Collection</h1>
    <p class="text-center container lead text-muted mb-4">
      Explore a curated selection of authentic Islamic supplications, organized into categories like forgiveness, protection, and gratitude.
    </p>

    <!-- Custom Search Tags -->
    <div class="container mb-4">
      <div class="search-tags d-flex overflow-auto pb-2">
        <button
          v-for="tag in searchTags"
          :key="tag"
          class="tag-btn me-2"
          :class="{ active: selectedTag === tag || (tag === 'All' && !selectedTag) }"
          @click="toggleTag(tag)"
          :aria-label="`Filter by ${tag}`"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- Search Input -->
    <div class="container mb-4">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <div class="search-container mb-3">
            <div class="input-group">
              <span class="input-group-text bg-primary text-white">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control search-input"
                placeholder="Search duas by title, Arabic, transliteration, translation, or reference"
                aria-label="Search Duas"
                @input="resetPagination"
              />
              <button
                v-if="searchQuery || selectedTag"
                class="btn btn-outline-secondary"
                @click="clearSearch"
                aria-label="Clear search"
              >
                <i class="bi bi-x"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs for All Duas and Liked Duas -->
    <div class="container mb-4">
      <div class="tabs-container">
        <ul class="nav nav-tabs justify-content-center gap-2">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: viewMode === 'all' }"
              @click.prevent="viewMode = 'all'; resetPagination()"
              aria-current="page"
            >
              All Duas
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: viewMode === 'liked' }"
              @click.prevent="viewMode = 'liked'; resetPagination()"
            >
              Liked Duas
              <span v-if="likedDuasCount > 0" class="badge ms-1">{{ likedDuasCount }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Category and Reference Dropdowns -->
    <div v-if="viewMode === 'all'" class="container mb-4">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label fw-semibold">Category</label>
          <select v-model="selectedCategory" class="form-select" @change="resetPagination">
            <option value="">All Categories</option>
            <option v-for="category in duaCollection" :key="category.id" :value="category.id">
              {{ category.name }} ({{ category.duas.length }})
            </option>
          </select>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label fw-semibold">Reference</label>
          <select v-model="selectedReference" class="form-select" @change="resetPagination">
            <option value="">All References</option>
            <option v-for="reference in uniqueReferences" :key="reference" :value="reference">
              {{ reference }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Copy Success Message -->
    <div v-if="showCopyMessage" class="alert alert-success alert-dismissible fade show mx-auto" role="alert">
      Copied to clipboard
      <button type="button" class="btn-close" @click="showCopyMessage = false" aria-label="Close"></button>
    </div>

    <!-- Duas Display -->
    <div class="container">
      <div v-if="filteredDuas.length === 0" class="alert alert-info text-center">
        {{ viewMode === 'liked' ? 'No liked duas yet. Start liking duas' : 'No duas found' }}
        <button
          v-if="viewMode === 'liked'"
          class="btn btn-link p-0 ms-1"
          @click="viewMode = 'all'; resetPagination()"
        >
          Explore All Duas
        </button>
      </div>
      <div v-for="category in filteredDuas" :key="category.id" class="mb-4">
        <h3 style="display: flex;" class="fw-semibold text-start mb-3 category-title">{{ category.name }}</h3>
        <div class="row">
          <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-12 col-md-6 mb-3">
            <div class="card dua-card shadow-md" :style="{ '--font-size-base': fontSize + 'px' }">
              <div class="card-body" >
                <h5 class="fw-semibold text-start title-text mb-3" v-html="highlightText(dua.title)"></h5>
                <p class="text-end arabic-text mb-3" v-html="highlightText(dua.arabic)"></p>
                <p class="text-start translation-text mb-3" v-html="highlightText(dua.translation)"></p>
                <p class="text-start reference-text text-muted mb-0" v-html="highlightText('- ' + dua.reference)"></p>
              </div>
              <div class="card-footer d-flex justify-content-between align-items-center">
                <div class="icon-wrapper">
                  <i
                    class="bi bi-dash-circle action-icon"
                    @click="changeFontSize('decrease')"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Decrease Font Size"
                    aria-label="Decrease Font Size"
                    role="button"
                  ></i>
                </div>
                <div class="icon-wrapper">
                  <i
                    class="bi bi-plus-circle action-icon"
                    @click="changeFontSize('increase')"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Increase Font Size"
                    aria-label="Increase Font Size"
                    role="button"
                  ></i>
                </div>
                <div class="icon-wrapper">
                  <i
                    class="bi bi-share action-icon"
                    @click="shareOnWhatsApp(dua)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Share Content"
                    aria-label="Share Content"
                    role="button"
                  ></i>
                </div>
                <div class="icon-wrapper">
                  <i
                    class="bi bi-clipboard action-icon"
                    @click="copyContent(dua)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Copy Content"
                    aria-label="Copy Content"
                    role="button"
                  ></i>
                </div>
                <div class="icon-wrapper">
                  <i
                    :class="likedDuas.includes(dua.id) ? 'bi bi-heart action-icon liked' : 'bi bi-heart action-icon'"
                    @click="toggleLike(dua.id)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    :title="likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'"
                    :aria-label="likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'"
                    role="button"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination d-flex justify-content-center align-items-center mt-3">
          <button
            class="btn btn-outline-primary me-2"
            :disabled="currentPage[category.id] === 1"
            @click="changePage('prev', category.id)"
            aria-label="Previous Page"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <span class="pagination-text">{{ currentPage[category.id] }} / {{ totalPages(category.duas) }}</span>
          <button
            class="btn btn-outline-primary ms-2"
            :disabled="currentPage[category.id] >= totalPages(category.duas)"
            @click="changePage('next', category.id)"
            aria-label="Next Page"
          >
            <i class="bi bi-chevron-right"></i>
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
        Repentance: ['regret', 'atonement', 'penitence']
      }
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
    likedDuasCount() {
      return this.likedDuas.length;
    },
    filteredCategories() {
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
  },
  methods: {
    highlightText(text) {
      if (!this.searchQuery.trim() && !this.selectedTag) return text;
      const terms = [
        ...(this.searchQuery.trim() ? [this.searchQuery] : []),
        ...(this.selectedTag ? [this.selectedTag, ...(this.tagSynonyms[this.selectedTag] || [])] : [])
      ];
      let highlightedText = text;
      terms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
      });
      return highlightedText;
    },
    toggleTag(tag) {
      this.selectedTag = (tag === 'All' || this.selectedTag === tag) ? '' : tag;
      this.resetPagination();
    },
    clearSearch() {
      this.searchQuery = '';
      this.selectedTag = '';
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
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\n- ${dua.reference}`;
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
    toggleLike(duaId) {
      if (!duaId) return;
      const updatedLikedDuas = [...this.likedDuas];
      if (updatedLikedDuas.includes(duaId)) {
        updatedLikedDuas.splice(updatedLikedDuas.indexOf(duaId), 1);
      } else {
        updatedLikedDuas.push(duaId);
      }
      this.likedDuas = updatedLikedDuas;
      localStorage.setItem('likedDuas', JSON.stringify(this.likedDuas));
    },
    getPaginatedDuas(duas) {
      if (!duas || !duas.length) return [];
      const start = ((this.currentPage[duas[0].id] || 1) - 1) * this.duasPerPage;
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
  },
  created() {
    fetch('/duaCollection.json')
      .then(response => response.json())
      .then(data => {
        this.duaCollection = data.categories || [];
        this.resetPagination();
      })
      .catch(error => console.error('Error loading dua collection:', error));
    try {
      const storedLikedDuas = localStorage.getItem('likedDuas');
      if (storedLikedDuas) {
        this.likedDuas = JSON.parse(storedLikedDuas);
      }
    } catch (error) {
      console.error('Error parsing likedDuas from localStorage:', error);
      this.likedDuas = [];
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');

/* :root {
  --primary: rgb(10, 160, 130);
  --primary-dark: rgb(8, 128, 104);
  --text-dark: #111827;
  --text-muted: #374151;
  --bg-card: #f9fafb;
  --bg-body: #ffffff;
} */


h1 {
  font-weight: 600;
}

.lead {
  font-weight: 400;
}


mark {
  color: white;
  padding: 0.1em 0.2em;
  border-radius: 3px;
}

.dua-card {
  background-color: var(--bg-card);
  border: none;
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dua-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  background-color: transparent;
  border-top: none;
  padding: 1rem 1.5rem;
}

.title-text {
  font-size: clamp(1.125rem, 3vw, 1.25rem);
  font-weight: 600;
  line-height: 1.4;
}

.arabic-text {
  font-family: 'Amiri', serif;
  font-weight: 400;
  font-size: clamp(18px, calc(var(--font-size-base) * 1.1), 24px);
  line-height: 1.6;
  direction: rtl;
}

.translation-text {
  font-weight: 400;
  font-size: clamp(16px, calc(var(--font-size-base) * 1.0), 22px);
  line-height: 1.5;
}

.reference-text {
  font-weight: 400;
  font-size: clamp(14px, calc(var(--font-size-base) * 0.9), 20px);
  line-height: 1.4;
}

.category-title {
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  font-weight: 600;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon {
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
}

.action-icon:hover {
  color: var(--primary);
  transform: scale(1.15);
}

.action-icon.liked {
  color: #dc3545;
  animation: pulse 0.3s ease;
}

.action-icon.liked:hover {
  color: #c82333;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.nav-tabs {
  border: none;
}

.nav-link {
  font-size: clamp(1.125rem, 3vw, 1.375rem);
  font-weight: 600;
  padding: 1rem 2rem;
  border-radius: 999px;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-link:hover {
  color: var(--text-dark);
  background-color: #000000;
  color: #ffffff;
}

.nav-link.active {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(10, 160, 130, 0.3);
}

.badge {
  background-color: var(--primary);
  color: white;
  font-size: 0.875rem;
  padding: 0.375rem 0.625rem;
  border-radius: 999px;
  vertical-align: middle;
}

.pagination button {
  font-size: clamp(0.875rem, 3vw, 1rem);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  min-height: 44px;
}

.pagination button:hover:not(:disabled) {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.pagination-text {
  font-size: clamp(0.875rem, 3vw, 1rem);
  color: var(--text-muted);
  margin: 0 1rem;
}

.search-container {
  transition: transform 0.3s ease;
}

.input-group {
  height: 48px;
}

.input-group-text {
  background-color: var(--primary);
  border: none;
  border-radius: 8px 0 0 8px;
  padding: 0.75rem;
  height: 48px;
  display: flex;
  align-items: center;
}

.input-group-text i {
  font-size: 1.25rem;
}

.search-input {
  font-size: 1.25rem;
  padding: 0.75rem 1rem;
  border-radius: 0;
  border-color: #d1d5db;
  height: 48px;
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(10, 160, 130, 0.1);
}

.btn-outline-secondary {
  border-radius: 0 8px 8px 0;
  padding: 0.75rem;
  height: 48px;
  display: flex;
  align-items: center;
}

.btn-outline-secondary i {
  font-size: 1.25rem;
}

.form-select {
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
}

.form-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(10, 160, 130, 0.1);
}

.form-label {
  font-size: 1rem;
  color: var(--text-dark);
}

.alert {
  max-width: 500px;
  margin: 0 auto 1rem;
  border-radius: 8px;
}

/* .search-tags {
  display: flex;
  white-space: nowrap;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
} */

.search-tags::-webkit-scrollbar {
  display: none;
}

.tag-btn {
  color: white;
  background-color: #0db691;
  border: none;
  border-radius: 999px;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.tag-btn:hover {
  background-color: #bfdbfe;
  color: var(--text-dark);
}

.tag-btn.active {
  background-color: var(--primary-dark);
  color: white;
}

@media (max-width: 767.98px) {
  .action-icon {
    font-size: 1.75rem;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .dua-card {
    margin-bottom: 1rem;
  }

  .pagination button {
    padding: 0.5rem 0.75rem;
  }

  .nav-link {
    font-size: 1.125rem;
    padding: 0.75rem 1.5rem;
  }

  .tag-btn {
    font-size: 0.8125rem;
    padding: 0.5rem 1rem;
    min-width: 90px;
  }
}
</style>