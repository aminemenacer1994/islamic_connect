<template>
  <div class="container-fluid py-4">
    <!-- Hero Section -->
    <div class="hero-section mb-5">
      <h1 class="fw-bold text-center mb-3">Dua Collection</h1>
      <p class="text-center container lead text-muted mb-4">
        Explore a curated selection of authentic Islamic supplications, organized into categories like forgiveness,
        protection, and gratitude.
      </p>
    </div>

    <!-- Error Message -->
    <transition name="fade">
      <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
        {{ errorMessage }}
      </div>
    </transition>

    <!-- Custom Search Tags -->
    <div class="container mb-4">
      <div class="search-tags-wrapper">
        <div class="search-tags d-flex overflow-auto pb-2">
          <button v-for="tag in searchTags" :key="tag" class="tag-btn me-2"
            :class="{ active: selectedTag === tag || (tag === 'All' && !selectedTag) }" @click="toggleTag(tag)"
            :aria-label="`Filter by ${tag}`">
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search Input -->
    <div class="container mb-4">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="search-container mb-3">
            <div class="input-group search-input-group">
              <span class="input-group-text text-white" style="background-color: #0db691;">
                <i class="bi bi-search"></i>
              </span>
              <input v-model="searchQuery" type="text" class="form-control search-input"
                placeholder="Search duas by title, Arabic words, translation, or reference" aria-label="Search Duas"
                @input="resetPagination" />
              <button v-if="searchQuery || selectedTag || selectedReference" class="btn btn-outline-secondary"
                @click="clearSearch" aria-label="Clear search">
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
            <a class="nav-link" :class="{ active: viewMode === 'all' }" href="#"
              @click.prevent="viewMode = 'all'; resetPagination()" aria-current="page">
              <i class="bi bi-collection me-1"></i>All Duas
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link liked-tab" :class="{ active: viewMode === 'liked' }" href="#"
              @click.prevent="viewMode = 'liked'; resetPagination()">
              <i class="bi bi-heart me-1"></i>Liked Duas
              <span v-if="likedDuasCount > 0" class="badge ms-1">{{ likedDuasCount }}</span>
            </a>
          </li>
        </ul>
        <!-- Clear All Liked Duas Button -->
        <div v-if="viewMode === 'liked'" class="text-center mt-3">
          <button class="btn btn-outline-danger" :class="{ disabled: likedDuasCount === 0 }" @click="clearAllLikedDuas"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Clear all liked duas"
            aria-label="Clear all liked duas">
            <i class="bi bi-trash-fill me-1"></i>
            {{ actionFeedback['clearAll'] ? 'Cleared!' : 'Clear All' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Category and Reference Dropdowns -->
    <div v-if="viewMode === 'all'" class="container mb-4">
      <div class="row g-3">
        <div class="col-md-6">
          <div class="dropdown-card">
            <h5 class="dropdown-label"><i class="bi bi-bookmark me-2"></i>Select a Category:</h5>
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
            <h5 class="dropdown-label"><i class="bi bi-journal-bookmark me-2"></i>Select a Reference:</h5>
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

    <!-- Scroll to Top FAB -->
    <transition name="fade">
      <button v-if="showScrollToTop" class="fab btn" style="background-color: #0db691;" @click="scrollToTop"
        aria-label="Scroll to top">
        <i class="bi bi-arrow-up-circle-fill fab-icon text-white"></i>
      </button>
    </transition>

    <!-- Duas Display -->
    <div class="container">
      <div v-if="filteredDuas.length === 0" class="alert alert-info text-center no-duas-message">
        <i class="bi" :class="viewMode === 'liked' ? 'bi-heart' : 'bi-search'"></i>
        {{ viewMode === 'liked' ? 'No liked duas yet. Start liking duas' : 'No duas found' }}
        <button v-if="viewMode === 'liked'" class="btn btn-link p-0 ms-1" @click="viewMode = 'all'; resetPagination()">
          Explore All Duas
        </button>
      </div>

      <div v-for="category in filteredDuas" :key="category.id" class="mb-5">
        <div class="d-flex align-items-center justify-content-between category-header">
          <h3 class="fw-semibold text-start mb-3 category-title">
            <img src="images/art.png" width="30px" class="me-2" alt="Category icon" />
            {{ category.name }}
          </h3>
          <div class="d-flex align-items-center gap-3">
            <i :class="category.collapsed ? 'bi bi-chevron-down action-icon' : 'bi bi-chevron-up action-icon'"
              @click="toggleCategoryCollapse(category.id)" data-bs-toggle="tooltip" data-bs-placement="top"
              :title="category.collapsed ? 'Expand Category' : 'Collapse Category'"
              :aria-label="category.collapsed ? 'Expand Category' : 'Collapse Category'" role="button"></i>
          </div>
        </div>

        <div v-if="!category.collapsed" class="row g-3">
          <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-12 col-md-6">
            <div class="card dua-card h-100 border-0 shadow-sm position-relative"
              :class="{ 'border-start border-danger border-3': viewMode === 'liked' }"
              :style="{ '--font-size-base': fontSize + 'px' }">

              <!-- Liked Badge -->
              <div v-if="viewMode === 'liked'"
                class="position-absolute top-0 end-0 bg-white rounded-circle d-flex align-items-center justify-content-center m-2"
                style="width: 32px; height: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 1;">
                <i class="bi bi-heart-fill text-danger"></i>
              </div>

              <!-- Card Body -->
              <div class="card-body d-flex flex-column p-3 p-md-4">
                <!-- Title -->
                <h5 class="card-title fw-semibold mb-3 position-relative pb-2"
                  :style="{ fontSize: 'calc(var(--font-size-base) * 1.2)' }">{{ highlightText(dua.title) }}
                  <span class="position-absolute bottom-0 start-0"
                    style="width: 40px; height: 3px; background-color: #0db691;"></span>
                </h5>

                <!-- Arabic Text -->
                <div class="bg-light rounded-3 p-3 mb-3 text-center">
                  <p class="mb-0 font-arabic" lang="ar" dir="rtl"
                    :style="{ fontSize: 'calc(var(--font-size-base) * 1.3)', lineHeight: '2' }"
                    v-html="highlightText(dua.arabic)" aria-label="Dua in Arabic"></p>
                </div>

                <!-- Translation -->
                <p class="mb-3" :style="{ fontSize: 'calc(var(--font-size-base))', lineHeight: '1.6' }"
                  v-html="highlightText(dua.translation)" aria-label="Dua translation"></p>

                <!-- Reference -->
                <p class="text-muted mb-0 fst-italic" :style="{ fontSize: 'calc(var(--font-size-base) * 0.9)' }"
                  v-html="highlightText('- ' + dua.reference)" aria-label="Dua reference"></p>
              </div>

              <!-- Card Footer with Actions -->
              <div class="card-footer bg-light p-2 p-md-3">
                <div class="d-flex justify-content-between align-items-center w-100">
                  <!-- Font Controls -->
                  <div class="d-flex align-items-center bg-white rounded-pill px-2 shadow-sm">
                    <button class="btn btn-link p-1 text-secondary" @click="changeFontSize('decrease')"
                      :disabled="fontSize <= 14" aria-label="Decrease Font Size">
                      <i class="bi bi-dash-circle-fill fs-5"></i>
                    </button>
                    <span class="mx-1 bg-light" style="width: 1px; height: 20px;"></span>
                    <button class="btn btn-link p-1 text-secondary" @click="changeFontSize('increase')"
                      :disabled="fontSize >= 28" aria-label="Increase Font Size">
                      <i class="bi bi-plus-circle-fill fs-5"></i>
                    </button>
                  </div>

                  <!-- Action Buttons -->
                  <div class="d-flex gap-2">
                    <button
                      class="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn"
                      style="width: 36px; height: 36px;" @click="toggleLike(dua.id)"
                      :aria-label="likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'">
                      <i :class="likedDuas.includes(dua.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart'"></i>
                      <span class="action-tooltip">{{ likedDuas.includes(dua.id) ? 'Unlike' : 'Like' }}</span>
                    </button>

                    <button
                      class="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn"
                      style="width: 36px; height: 36px;" @click="shareOnWhatsApp(dua)" aria-label="Share on WhatsApp">
                      <i class="bi bi-share-fill"></i>
                      <span class="action-tooltip">Share</span>
                    </button>

                    <button
                      class="btn btn-sm btn-outline-secondary rounded-circle p-0 d-flex align-items-center justify-content-center action-btn"
                      style="width: 36px; height: 36px;" @click="copyContent(dua)" aria-label="Copy Content">
                      <i class="bi bi-clipboard-fill"></i>
                      <span class="action-tooltip">Copy</span>
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
    allDuasLikedInCategory() {
      return (categoryId) => {
        const category = this.duaCollection.find(c => c.id === categoryId);
        if (!category || !category.duas.length) return false;
        return category.duas.every(dua => this.likedDuas.includes(dua.id));
      };
    },
  },
  methods: {
    highlightText(text) {
      if (!this.searchQuery.trim() && !this.selectedTag) return text;

      let highlightedText = text;

      const searchTerms = this.searchQuery.trim() ? [this.searchQuery] : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark class="mark-search">$1</mark>');
      });

      const tagTerms = this.selectedTag ? [this.selectedTag, ...(this.tagSynonyms[this.selectedTag] || [])] : [];
      tagTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark class="mark-tag">$1</mark>');
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
    toggleAllInCategory(categoryId) {
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
      localStorage.setItem('likedDuas', JSON.stringify(this.likedDuas));
      setTimeout(() => {
        this.actionFeedback[categoryId] = false;
      }, 1000);
    },
    clearAllLikedDuas() {
      this.actionFeedback['clearAll'] = true;
      this.likedDuas = [];
      localStorage.setItem('likedDuas', JSON.stringify(this.likedDuas));
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
  },
  created() {
    const storedLikedDuas = localStorage.getItem('likedDuas');
    if (storedLikedDuas) {
      this.likedDuas = JSON.parse(storedLikedDuas);
    }

    fetch('/duaCollection.json')
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
        this.duaCollection = data.categories.map(category => ({
          ...category,
          collapsed: false,
          duas: category.duas.map((dua, index) => ({
            ...dua,
            id: `${category.id}-${dua.id || index + 1}`,
          })),
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
      })
      .catch(error => {
        console.error('Error loading dua collection:', error);
        this.errorMessage = 'Failed to load dua collection. Please try again later.';
      });
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
<style scoped>
/* Base Card Styles */
.dua-card {
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #ffffff;
}

.dua-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
}

/* Arabic Font */
.font-arabic {
  font-family: 'Amiri', serif;
}

/* Highlight Text */
mark {
  background-color: rgba(13, 182, 145, 0.3);
  color: inherit;
  padding: 0 0.125rem;
  border-radius: 0.125rem;
}

/* Liked Badge Animation */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
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
  background-color: #f8f9fa !important;
}

.action-btn:hover i {
  transform: scale(1.1);
}

.action-btn i {
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
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  z-index: 10;
}

.action-btn:hover .action-tooltip {
  opacity: 1;
  visibility: visible;
  bottom: -2.25rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .card-body {
    padding: 1.25rem !important;
  }
  
  .font-arabic {
    font-size: calc(var(--font-size-base) * 1.1) !important;
    line-height: 1.8 !important;
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
</style>