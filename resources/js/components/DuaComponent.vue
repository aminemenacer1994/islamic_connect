<template>
  <div class="container-fluid py-4 dua-collection">
    <h1 class="fw-bold text-center mb-3">
      <i class="bi bi-book-half me-2" aria-hidden="true"></i>Dua Collection
    </h1>
    <p class="text-center lead text-muted mb-5">
      Explore a curated collection of Islamic supplications, organized by themes such as forgiveness, protection, and gratitude.
    </p>

    <!-- Error Message -->
    <div v-if="errorMessage" class="alert alert-danger text-center" role="alert" aria-live="assertive">
      {{ errorMessage }}
    </div>

    <!-- Custom Search Tags with Sideways Scroll -->
    <div class="container mb-5">
      <div class="search-tags d-flex flex-nowrap gap-2 pb-3" role="listbox" aria-label="Filter tags">
        <button v-for="tag in searchTags" :key="tag" class="tag-btn"
                :class="{ active: selectedTag === tag || (tag === 'All' && !selectedTag) }"
                @click="toggleTag(tag)"
                :aria-label="`Filter by ${tag}`"
                :aria-pressed="selectedTag === tag || (tag === 'All' && !selectedTag)"
                role="option"
                :aria-selected="selectedTag === tag || (tag === 'All' && !selectedTag)">
          <i :class="getTagIcon(tag)" class="me-1" aria-hidden="true"></i>{{ tag }}
        </button>
      </div>
    </div>

    <!-- Search Input -->
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="search-container mb-3">
            <div class="input-group">
              <span class="input-group-text text-white bg-teal">
                <i class="bi bi-search" aria-hidden="true"></i>
              </span>
              <input v-model="searchQuery" type="text" class="form-control search-input"
                     placeholder="Search duas by title, Arabic, translation, or reference"
                     aria-label="Search Duas" @input="resetPagination" />
              <button v-if="searchQuery || selectedTag || selectedReference" class="btn btn-outline-teal"
                      @click="clearSearch" aria-label="Clear search">
                <i class="bi bi-x-lg" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs for All Duas and Liked Duas -->
    <div class="container mb-5">
      <ul class="nav nav-tabs justify-content-center gap-2" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link" :class="{ active: viewMode === 'all' }" href="#"
             @click.prevent="viewMode = 'all'; resetPagination()"
             role="tab" :aria-selected="viewMode === 'all'" aria-controls="all-duas">
            <i class="bi bi-list-ul me-1" aria-hidden="true"></i>All Duas
          </a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" :class="{ active: viewMode === 'liked' }" href="#"
             @click.prevent="viewMode = 'liked'; resetPagination()"
             role="tab" :aria-selected="viewMode === 'liked'" aria-controls="liked-duas">
            <i class="bi bi-heart-fill me-1" aria-hidden="true"></i>Liked Duas
            <span v-if="likedDuasCount > 0" class="badge bg-accent ms-1">{{ likedDuasCount }}</span>
          </a>
        </li>
      </ul>
      <div v-if="viewMode === 'liked'" class="text-center mt-3">
        <button class="icon-btn" :class="{ disabled: likedDuasCount === 0 }" @click="clearAllLikedDuas"
                data-bs-toggle="tooltip" data-bs-placement="top" title="Clear all liked duas"
                aria-label="Clear all liked duas" :disabled="likedDuasCount === 0">
          <i class="bi bi-trash me-1" aria-hidden="true"></i>
          {{ actionFeedback['clearAll'] ? 'Cleared!' : 'Clear All Liked Duas' }}
        </button>
      </div>
    </div>

    <!-- Category and Reference Dropdowns -->
    <div v-if="viewMode === 'all'" class="container mb-5">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="category-select" class="form-label fw-bold"><i class="bi bi-tags me-1" aria-hidden="true"></i>Select a Category:</label>
          <select v-model="selectedCategory" id="category-select" class="form-select" @change="resetPagination"
                  aria-label="Select a category">
            <option value="">All Categories</option>
            <option v-for="category in duaCollection" :key="category.id" :value="category.id">
              {{ category.name }} ({{ category.duas.length }})
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="reference-select" class="form-label fw-bold"><i class="bi bi-book me-1" aria-hidden="true"></i>Select a Reference:</label>
          <select v-model="selectedReference" id="reference-select" class="form-select" @change="resetPagination"
                  aria-label="Select a reference">
            <option value="">All References</option>
            <option v-for="reference in uniqueReferences" :key="reference.full" :value="reference.full">
              {{ reference.display }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Copy Success Message -->
    <div v-if="showCopyMessage" class="alert alert-success alert-dismissible fade show mx-auto" role="alert" aria-live="polite">
      <i class="bi bi-check-circle me-1" aria-hidden="true"></i>Copied to clipboard
      <button type="button" class="btn-close" @click="showCopyMessage = false" aria-label="Close"></button>
    </div>

    <!-- Scroll to Top FAB -->
    <button v-if="showScrollToTop" class="fab btn btn-teal" @click="scrollToTop" aria-label="Scroll to top">
      <i class="bi bi-arrow-up-circle-fill fab-icon" aria-hidden="true"></i>
    </button>

    <!-- Duas Display -->
    <div class="container">
      <div v-if="filteredDuas.length === 0" class="alert alert-info text-center" role="alert">
        {{ viewMode === 'liked' ? 'No liked duas yet. Start liking duas!' : 'No duas found.' }}
        <button v-if="viewMode === 'liked'" class="btn btn-link p-0 ms-1 text-teal" @click="viewMode = 'all'; resetPagination()"
                aria-label="Explore All Duas">
          Explore All Duas
        </button>
      </div>
      <div v-for="category in filteredDuas" :key="category.id" class="mb-5 category-section" :id="'category-' + category.id">
        <div >
          <div class="-header bg-white d-flex align-items-center justify-content-between sticky-header"
               @click="toggleCategoryCollapse(category.id)"
               role="button" :aria-expanded="!category.collapsed" :aria-controls="'category-content-' + category.id"
               tabindex="0" @keydown.enter="toggleCategoryCollapse(category.id)">
            <h2 class="fw-bold mb-0 category-title">
              <i class="bi bi-bookmark-star me-2" aria-hidden="true"></i>{{ category.name }}
            </h2>
            <div class="d-flex align-items-center gap-3">
              <button class="icon-btn me-2" :class="{ disabled: !category.duas.length }" @click.stop="toggleAllInCategory(category.id)"
                      data-bs-toggle="tooltip" data-bs-placement="top"
                      :title="allDuasLikedInCategory(category.id) ? 'Unlike all duas in this category' : 'Like all duas in this category'"
                      :aria-label="allDuasLikedInCategory(category.id) ? 'Unlike all duas in this category' : 'Like all duas in this category'">
                <i :class="allDuasLikedInCategory(category.id) ? 'bi bi-heart-fill me-1' : 'bi bi-heart me-1'" aria-hidden="true"></i>
                {{ actionFeedback[category.id] ? (allDuasLikedInCategory(category.id) ? 'Unliked!' : 'Liked!') : 'Like All' }}
              </button>
              <i :class="category.collapsed ? 'bi bi-chevron-down action-icon' : 'bi bi-chevron-up action-icon'"
                 :aria-label="category.collapsed ? 'Expand Category' : 'Collapse Category'"></i>
            </div>
          </div>
          <transition name="fade">
            <div v-if="!category.collapsed" class="-body" :id="'category-content-' + category.id">
              <div class="row g-4">
                <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-12 col-md-6 col-lg-4">
                  <div class=" dua- h-100 border-light">
                    <div class="-body">
                      <h3 class="fw-semibold text-start title-text mb-3" v-html="highlightText(dua.title)"></h3>
                      <p class="text-end arabic-text mb-3" v-html="highlightText(dua.arabic)"></p>
                      <p class="text-start translation-text mb-3" v-html="highlightText(dua.translation)"></p>
                      <p class="text-start reference-text text-muted mb-0" v-html="highlightText('- ' + dua.reference)"></p>
                    </div>
                    <div class="-footer bg-transparent d-flex justify-content-start gap-3 flex-wrap">
                      <button class="icon-btn" @click="changeFontSize('decrease')" data-bs-toggle="tooltip" data-bs-placement="top"
                              title="Decrease Font Size" aria-label="Decrease Font Size">
                        <i class="bi bi-dash-circle" aria-hidden="true"></i>
                      </button>
                      <button class="icon-btn" @click="changeFontSize('increase')" data-bs-toggle="tooltip" data-bs-placement="top"
                              title="Increase Font Size" aria-label="Increase Font Size">
                        <i class="bi bi-plus-circle" aria-hidden="true"></i>
                      </button>
                      <button class="icon-btn" @click="shareOnWhatsApp(dua)" data-bs-toggle="tooltip" data-bs-placement="top"
                              title="Share on WhatsApp" aria-label="Share on WhatsApp">
                        <i class="bi bi-whatsapp" aria-hidden="true"></i>
                      </button>
                      <button class="icon-btn" @click="copyContent(dua)" data-bs-toggle="tooltip" data-bs-placement="top"
                              title="Copy Content" aria-label="Copy Content">
                        <i class="bi bi-clipboard" aria-hidden="true"></i>
                      </button>
                      <button class="icon-btn" @click="toggleLike(dua.id)" data-bs-toggle="tooltip" data-bs-placement="top"
                              :title="likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'"
                              :aria-label="likedDuas.includes(dua.id) ? 'Unlike Dua' : 'Like Dua'">
                        <i :class="likedDuas.includes(dua.id) ? 'bi bi-heart-fill liked' : 'bi bi-heart'" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-4">
                <div class="pagination d-flex align-items-center">
                  <button class="btn btn-outline-teal me-2" :disabled="currentPage[category.id] === 1"
                          @click="changePage('prev', category.id)" aria-label="Previous Page">
                    <i class="bi bi-chevron-left" aria-hidden="true"></i>
                  </button>
                  <span class="pagination-text">{{ currentPage[category.id] }} / {{ totalPages(category.duas) }}</span>
                  <button class="btn btn-outline-teal ms-2" :disabled="currentPage[category.id] >= totalPages(category.duas)"
                          @click="changePage('next', category.id)" aria-label="Next Page">
                    <i class="bi bi-chevron-right" aria-hidden="true"></i>
                  </button>
                </div>
                <a href="#" class="text-teal small" @click.prevent="scrollToTop(category.id)" aria-label="Back to top of category">
                  <i class="bi bi-arrow-up me-1" aria-hidden="true"></i>Back to Top
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DuaCollection',
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
          if (dua.reference) references.add(dua.reference);
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
      return this.likedDuas.filter(id => {
        const [categoryId] = id.split('-');
        const category = this.duaCollection.find(c => c.id === parseInt(categoryId));
        return category && category.duas.some(dua => dua.id === id);
      }).length;
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
      if (!this.searchQuery.trim() && !this.selectedTag) return filteredCollection;
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
    getTagIcon(tag) {
      const iconMap = {
        All: 'bi bi-grid-fill',
        Forgiveness: 'bi bi-heart',
        Protection: 'bi bi-shield',
        Gratitude: 'bi bi-hand-thumbs-up',
        Healing: 'bi bi-band-aid',
        Guidance: 'bi bi-compass',
        Patience: 'bi bi-hourglass',
        Success: 'bi bi-trophy',
        Mercy: 'bi bi-droplet',
        Peace: 'bi bi-peace',
        Provision: 'bi bi-wallet',
        Strength: 'bi bi-lightning',
        Repentance: 'bi bi-arrow-repeat'
      };
      return iconMap[tag] || 'bi bi-tag';
    },
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
        setTimeout(() => this.showCopyMessage = false, 2000);
      }).catch(err => console.error('Failed to copy content: ', err));
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
      setTimeout(() => this.actionFeedback[categoryId] = false, 1000);
    },
    clearAllLikedDuas() {
      this.actionFeedback['clearAll'] = true;
      this.likedDuas = [];
      localStorage.setItem('likedDuas', JSON.stringify(this.likedDuas));
      setTimeout(() => this.actionFeedback['clearAll'] = false, 1000);
    },
    toggleCategoryCollapse(categoryId) {
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (category) category.collapsed = !category.collapsed;
    },
    scrollToTop(categoryId = null) {
      if (categoryId) {
        const element = document.getElementById(`category-${categoryId}`);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    handleScroll() {
      this.showScrollToTop = window.scrollY > document.documentElement.scrollHeight * 0.05;
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
      this.duaCollection.forEach(category => this.currentPage[category.id] = 1);
    },
  },
  created() {
    const storedLikedDuas = localStorage.getItem('likedDuas');
    if (storedLikedDuas) this.likedDuas = JSON.parse(storedLikedDuas);
    fetch('/duaCollection.json')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');

.dua-collection {
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  color: #333;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: #0db691;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.fab:hover {
  transform: scale(1.1);
}

.fab-icon {
  font-size: 1.8rem;
  color: white;
}

.action-icon {
  font-size: 1.4rem;
  color: #333;
  transition: transform 0.3s ease, color 0.3s ease;
}

.action-icon:hover {
  transform: scale(1.15);
  color: #0db691;
}

.action-icon.liked {
  color: #dc3545;
  animation: pulse 0.3s ease;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.icon-btn {
  background: none;
  border: 1px solid #0db691;
  color: #0db691;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  min-width: 48px;
  min-height: 48px;
}

.icon-btn:hover:not(.disabled) {
  background-color: #0db691;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.icon-btn:active:not(.disabled) {
  transform: scale(0.95);
}

.icon-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

h1 {
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: 0.02em;
}

h2.category-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
}

h3.title-text {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 600;
}

.lead {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
}

.category- {
  border-radius: 12px;
  border: 1px solid #e9ecef;
  background: #ffffff;
}

.-header {
  cursor: pointer;
  padding: 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #e9ecef;
}

.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.dua- {
  border-radius: 10px;
  border: 1px solid #e9ecef;
  background: #ffffff;
  transition: transform 0.3s ease;
}

.dua-:hover {
  transform: translateY(-3px);
}

.-body {
  padding: 1.5rem;
}

.-footer {
  padding: 1rem 1.5rem;
  border-top: none;
  background: transparent;
}

.arabic-text {
  font-family: 'Amiri', serif;
  font-size: clamp(18px, calc(var(--font-size-base) * 1.1), 26px);
  line-height: 1.6;
  direction: rtl;
}

.translation-text {
  font-size: clamp(16px, calc(var(--font-size-base) * 1), 24px);
  line-height: 1.5;
}

.reference-text {
  font-size: clamp(14px, calc(var(--font-size-base) * 0.9), 22px);
  line-height: 1.4;
}

.nav-tabs {
  border: none;
}

.nav-link {
  font-weight: 500;
  color: #333;
  background-color: #e9ecef;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #dee2e6;
}

.nav-link.active {
  background-color: #0db691;
  color: white;
}

.badge.bg-accent {
  background-color: #dc3545;
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
  border-radius: 999px;
}

.pagination button {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border-color: #0db691;
  color: #0db691;
  min-width: 48px;
  min-height: 48px;
  transition: all 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background-color: #0db691;
  color: white;
}

.pagination-text {
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: #6b7280;
  margin: 0 1rem;
}

.search-container {
  transition: transform 0.3s ease;
}

.input-group {
  height: 3.2rem;
  border-radius: 10px;
  overflow: hidden;
}

.input-group-text.bg-teal {
  background-color: #0db691;
  border: none;
  padding: 0.8rem;
  height: 3.2rem;
}

.input-group-text i {
  font-size: 1.5rem;
  color: white;
}

.search-input {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  padding: 0.8rem 1rem;
  border: 1px solid #0db691;
  height: 3.2rem;
}

.search-input:focus {
  border-color: #0db691;
  box-shadow: 0 0 0 3px rgba(13, 182, 145, 0.1);
}

.btn-outline-teal {
  padding: 0.8rem;
  height: 3.2rem;
  border: 1px solid #0db691;
  color: #0db691;
}

.btn-outline-teal:hover {
  background-color: #0db691;
  color: white;
}

.btn-outline-teal i {
  font-size: 1.5rem;
}

.form-select {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  padding: 0.8rem;
  border-radius: 10px;
  border-color: #0db691;
}

.form-select:focus {
  border-color: #0db691;
  box-shadow: 0 0 0 3px rgba(13, 182, 145, 0.1);
}

.alert {
  max-width: 600px;
  margin: 0 auto 1rem;
  border-radius: 10px;
}

.search-tags {
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 0.5rem;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  position: relative;
}

.search-tags::-webkit-scrollbar {
  display: none;
}

.search-tags::before,
.search-tags::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  z-index: 1;
}

.search-tags::before {
  left: 0;
  background: linear-gradient(to right, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

.search-tags::after {
  right: 0;
  background: linear-gradient(to left, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
}

.tag-btn {
  background-color: #e9ecef;
  color: #333;
  border: 1px solid #0db691;
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-right: 0.5rem;
}

.tag-btn:hover {
  background-color: #0db691;
  color: white;
}

.tag-btn.active {
  background-color: #0db691;
  color: white;
}

.text-teal {
  color: #0db691;
  transition: color 0.3s ease;
}

.text-teal:hover {
  color: #0a8c6b;
}

.mark-search, .mark-tag {
  background: #0db691 !important;
  color: white !important;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 767.98px) {
  .dua-collection {
    padding: 1.5rem 0.5rem;
  }
  h1 {
    font-size: clamp(1.75rem, 4.5vw, 2.25rem);
  }
  h2.category-title {
    font-size: clamp(1.5rem, 3.5vw, 1.75rem);
  }
  h3.title-text {
    font-size: clamp(1.125rem, 2.5vw, 1.25rem);
  }
  .action-icon {
    font-size: 1.2rem;
  }
  .icon-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    min-width: 44px;
    min-height: 44px;
  }
  .dua- {
    margin-bottom: 1rem;
  }
  .pagination button {
    padding: 0.5rem 1rem;
    min-width: 44px;
    min-height: 44px;
  }
  .nav-link {
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    padding: 0.6rem 1.2rem;
  }
  .tag-btn {
    font-size: clamp(0.85rem, 2.5vw, 0.95rem);
    padding: 0.5rem 1rem;
    min-height: 40px;
  }
  .fab {
    width: 3rem;
    height: 3rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }
  .fab-icon {
    font-size: 1.5rem;
  }
  .col-lg-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .col-lg-4 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>