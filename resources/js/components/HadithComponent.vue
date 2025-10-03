<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h2 class="text-center mb-0">Hadith Explorer</h2>
          </div>
          
          <div class="card-body">
            <!-- Collection Selection -->
            <div class="mb-4">
              <label for="collection" class="form-label">Select Hadith Collection:</label>
              <select 
                id="collection" 
                class="form-select" 
                v-model="selectedCollection"
                @change="fetchBooks"
              >
                <option value="" disabled>Choose a collection</option>
                <option 
                  v-for="collection in collections" 
                  :key="collection.name" 
                  :value="collection.name"
                >
                  {{ collection.name }} ({{ collection.hasBooks ? collection.books + ' books' : collection.total + ' hadiths' }})
                </option>
              </select>
            </div>
            
            <!-- Book Selection (if available) -->
            <div class="mb-4" v-if="books.length > 0">
              <label for="book" class="form-label">Select Book:</label>
              <select 
                id="book" 
                class="form-select" 
                v-model="selectedBook"
                @change="fetchHadiths"
              >
                <option value="" disabled>Choose a book</option>
                <option 
                  v-for="book in books" 
                  :key="book.id" 
                  :value="book.id"
                >
                  {{ book.name }} ({{ book.hasChapters ? book.hadiths + ' hadiths' : '' }})
                </option>
              </select>
            </div>
            
            <!-- Chapter Selection (if available) -->
            <div class="mb-4" v-if="chapters.length > 0">
              <label for="chapter" class="form-label">Select Chapter:</label>
              <select 
                id="chapter" 
                class="form-select" 
                v-model="selectedChapter"
                @change="fetchHadiths"
              >
                <option value="" disabled>Choose a chapter</option>
                <option 
                  v-for="chapter in chapters" 
                  :key="chapter.id" 
                  :value="chapter.id"
                >
                  {{ chapter.title }}
                </option>
              </select>
            </div>
            
            <!-- Hadith Range -->
            <div class="mb-4" v-if="showHadithRange">
              <label class="form-label">Hadith Range:</label>
              <div class="row g-2">
                <div class="col-md-6">
                  <input 
                    type="number" 
                    class="form-control" 
                    placeholder="From" 
                    v-model="hadithRange.from"
                    min="1"
                  >
                </div>
                <div class="col-md-6">
                  <input 
                    type="number" 
                    class="form-control" 
                    placeholder="To" 
                    v-model="hadithRange.to"
                    min="1"
                  >
                </div>
              </div>
              <button 
                class="btn btn-primary mt-2 w-100"
                @click="fetchHadiths"
                :disabled="!hadithRange.from || !hadithRange.to || hadithRange.from > hadithRange.to"
              >
                Fetch Hadiths
              </button>
            </div>
            
            <!-- Search -->
            <div class="mb-4">
              <label for="search" class="form-label">Search Hadiths:</label>
              <div class="input-group">
                <input 
                  type="text" 
                  id="search" 
                  class="form-control" 
                  placeholder="Search in hadith text..."
                  v-model="searchQuery"
                >
                <button 
                  class="btn btn-outline-secondary" 
                  type="button"
                  @click="searchHadiths"
                  :disabled="!searchQuery || !selectedCollection"
                >
                  Search
                </button>
              </div>
            </div>
            
            <!-- Loading Indicator -->
            <div class="text-center my-4" v-if="loading">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-2">Loading data...</p>
            </div>
            
            <!-- Error Message -->
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            
            <!-- Hadith List -->
            <div v-if="hadiths.length > 0">
              <h4 class="mb-3">Hadith Results ({{ hadiths.length }})</h4>
              <div class="list-group">
                <div 
                  class="list-group-item list-group-item-action mb-3 shadow-sm" 
                  v-for="hadith in filteredHadiths" 
                  :key="hadith.hadithNumber"
                >
                  <div class="d-flex justify-content-between align-items-start">
                    <h5 class="mb-1">Hadith #{{ hadith.hadithNumber }}</h5>
                    <small class="text-muted">{{ selectedCollection }}</small>
                  </div>
                  <p class="mb-1 text-end arabic-text" dir="rtl">{{ hadith.arabic }}</p>
                  <hr>
                  <p class="mb-1">{{ hadith.english }}</p>
                  <small class="text-muted" v-if="hadith.grades && hadith.grades.length > 0">
                    Grade: {{ hadith.grades[0].grade }}
                  </small>
                </div>
              </div>
              
              <!-- Pagination -->
              <nav aria-label="Hadith pagination" v-if="totalPages > 1">
                <ul class="pagination justify-content-center mt-4">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
                  </li>
                  <li 
                    class="page-item" 
                    v-for="page in displayedPages" 
                    :key="page"
                    :class="{ active: page === currentPage }"
                  >
                    <button class="page-link" @click="changePage(page)">{{ page }}</button>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
                  </li>
                </ul>
              </nav>
            </div>
            
            <!-- Empty State -->
            <div class="text-center text-muted py-4" v-if="!loading && hadiths.length === 0 && selectedCollection">
              <p>No hadiths found. Select a collection and other filters to view hadiths.</p>
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
      collections: [],
      selectedCollection: '',
      books: [],
      selectedBook: '',
      chapters: [],
      selectedChapter: '',
      hadiths: [],
      loading: false,
      error: null,
      searchQuery: '',
      isSearchMode: false,
      hadithRange: {
        from: null,
        to: null
      },
      currentPage: 1,
      itemsPerPage: 5,
      totalHadiths: 0
    };
  },
  computed: {
    showHadithRange() {
      return this.selectedCollection && this.books.length === 0;
    },
    filteredHadiths() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.hadiths.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.hadiths.length / this.itemsPerPage);
    },
    displayedPages() {
      const pages = [];
      const maxPages = 5;
      
      if (this.totalPages <= maxPages) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        let start = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
        let end = Math.min(this.totalPages, start + maxPages - 1);
        
        if (end - start + 1 < maxPages) {
          start = Math.max(1, end - maxPages + 1);
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    }
  },
  created() {
    this.fetchCollections();
  },
  methods: {
    async fetchCollections() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('https://api.sunnah.com/v1/collections', {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch collections');
        }
        
        const data = await response.json();
        this.collections = data.data.map(collection => ({
          name: collection.name,
          hasBooks: collection.hasBooks,
          books: collection.totalNumberofBooks,
          total: collection.totalNumberofHadith
        }));
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching collections';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchBooks() {
      this.resetHadithData();
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(`https://api.sunnah.com/v1/collections/${this.selectedCollection}/books`, {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();
        this.books = data.data.map(book => ({
          id: book.bookNumber,
          name: book.bookName,
          hasChapters: book.numberOfChapters > 0,
          hadiths: book.numberOfHadith
        }));
        
        // If no books, show hadith range input
        if (this.books.length === 0) {
          this.hadithRange.from = 1;
          this.hadithRange.to = 10;
        }
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching books';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchChapters() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(`https://api.sunnah.com/v1/collections/${this.selectedCollection}/books/${this.selectedBook}/chapters`, {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch chapters');
        }
        
        const data = await response.json();
        this.chapters = data.data.map(chapter => ({
          id: chapter.chapterNumber,
          title: chapter.chapterTitle
        }));
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching chapters';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchHadiths() {
      this.isSearchMode = false;
      this.loading = true;
      this.error = null;
      this.currentPage = 1;
      
      try {
        let url;
        
        if (this.selectedBook) {
          if (this.selectedChapter) {
            url = `https://api.sunnah.com/v1/collections/${this.selectedCollection}/books/${this.selectedBook}/chapters/${this.selectedChapter}/hadiths`;
          } else {
            url = `https://api.sunnah.com/v1/collections/${this.selectedCollection}/books/${this.selectedBook}/hadiths`;
          }
        } else {
          url = `https://api.sunnah.com/v1/collections/${this.selectedCollection}/hadiths/${this.hadithRange.from}-${this.hadithRange.to}`;
        }
        
        const response = await fetch(url, {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch hadiths');
        }
        
        const data = await response.json();
        this.hadiths = data.data.map(hadith => ({
          hadithNumber: hadith.hadithNumber,
          arabic: hadith.arabic,
          english: hadith.english,
          grades: hadith.grades
        }));
        
        this.totalHadiths = this.hadiths.length;
      } catch (err) {
        this.error = err.message || 'An error occurred while fetching hadiths';
      } finally {
        this.loading = false;
      }
    },
    
    async searchHadiths() {
      if (!this.searchQuery || !this.selectedCollection) return;
      
      this.isSearchMode = true;
      this.loading = true;
      this.error = null;
      this.currentPage = 1;
      
      try {
        const response = await fetch(`https://api.sunnah.com/v1/collections/${this.selectedCollection}/search?query=${encodeURIComponent(this.searchQuery)}`, {
          headers: {
            'X-API-Key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to search hadiths');
        }
        
        const data = await response.json();
        this.hadiths = data.data.map(hadith => ({
          hadithNumber: hadith.hadithNumber,
          arabic: hadith.arabic,
          english: hadith.english,
          grades: hadith.grades
        }));
        
        this.totalHadiths = this.hadiths.length;
      } catch (err) {
        this.error = err.message || 'An error occurred while searching hadiths';
      } finally {
        this.loading = false;
      }
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    
    resetHadithData() {
      this.books = [];
      this.selectedBook = '';
      this.chapters = [];
      this.selectedChapter = '';
      this.hadiths = [];
      this.hadithRange.from = null;
      this.hadithRange.to = null;
      this.searchQuery = '';
      this.isSearchMode = false;
      this.currentPage = 1;
    }
  },
  watch: {
    selectedBook(newVal) {
      if (newVal) {
        this.fetchChapters();
      } else {
        this.chapters = [];
        this.selectedChapter = '';
      }
    }
  }
};
</script>

<style scoped>
.arabic-text {
  font-size: 1.2rem;
  line-height: 2;
  font-family: 'Traditional Arabic', 'Arial', sans-serif;
}

.card {
  border-radius: 0.5rem;
  overflow: hidden;
}

.list-group-item {
  border-radius: 0.5rem;
  transition: transform 0.2s;
}

.list-group-item:hover {
  transform: translateY(-2px);
}

.form-select, .form-control {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}

.btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
}

.alert {
  border-radius: 0.5rem;
}
</style>