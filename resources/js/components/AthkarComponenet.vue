<template>
  <div class="athkar-app container py-4">
    <!-- Header Section -->
    <header class="text-center mb-5">
      <h1 class="text-primary fw-bold mb-3">Daily Athkar</h1>
      <p class="lead text-muted">Remember Allah throughout your day</p>
    </header>

    <!-- Controls Section -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="input-group">
          <span class="input-group-text bg-primary text-white">
            <i class="bi bi-search"></i>
          </span>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search Athkar..." 
            v-model="searchQuery"
          >
        </div>
      </div>
      
      <div class="col-md-3">
        <select class="form-select" v-model="selectedCategory">
          <option value="">All Categories</option>
          <option v-for="category in categories" :value="category" :key="category">
            {{ category }}
          </option>
        </select>
      </div>
      
      <div class="col-md-3">
        <select class="form-select" v-model="selectedCollection">
          <option value="">All Collections</option>
          <option v-for="collection in collections" :value="collection.id" :key="collection.id">
            {{ collection.name }}
          </option>
        </select>
      </div>
      
      <div class="col-md-2">
        <button class="btn btn-outline-primary w-100" @click="refreshData">
          <i class="bi bi-arrow-clockwise"></i> Refresh
        </button>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex flex-wrap justify-content-between p-3 bg-light rounded">
          <div class="text-center px-3">
            <h5 class="text-primary mb-0">{{ filteredAthkar.length }}</h5>
            <small class="text-muted">Displayed</small>
          </div>
          <div class="text-center px-3">
            <h5 class="text-primary mb-0">{{ totalCount }}</h5>
            <small class="text-muted">Total Count</small>
          </div>
          <div class="text-center px-3">
            <h5 class="text-primary mb-0">{{ favorites.length }}</h5>
            <small class="text-muted">Favorites</small>
          </div>
          <div class="text-center px-3">
            <h5 class="text-primary mb-0">{{ completedCount }}</h5>
            <small class="text-muted">Completed</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3">Loading Athkar...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      {{ error }}
      <button class="btn btn-sm btn-outline-danger ms-3" @click="fetchAthkar">Retry</button>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Tabs Navigation -->
      <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
          <button 
            class="nav-link" 
            :class="{active: activeTab === 'all'}"
            @click="activeTab = 'all'"
          >
            All Athkar
          </button>
        </li>
        <li class="nav-item">
          <button 
            class="nav-link" 
            :class="{active: activeTab === 'favorites'}"
            @click="activeTab = 'favorites'"
          >
            Favorites
          </button>
        </li>
        <li class="nav-item">
          <button 
            class="nav-link" 
            :class="{active: activeTab === 'completed'}"
            @click="activeTab = 'completed'"
          >
            Completed
          </button>
        </li>
      </ul>

      <!-- Athkar Grid -->
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="thikr in displayedAthkar" :key="thikr.id">
          <div class="card h-100 shadow-sm" :class="{'border-success': thikr.completed}">
            <div class="card-header d-flex justify-content-between align-items-center" 
                 :class="{'bg-primary text-white': !thikr.completed, 'bg-success text-white': thikr.completed}">
              <div>
                <h5 class="card-title mb-0">{{ thikr.category }}</h5>
                <small v-if="thikr.reference" class="fst-italic">{{ thikr.reference }}</small>
              </div>
              <span class="badge bg-light" :class="{'text-primary': !thikr.completed, 'text-success': thikr.completed}">
                {{ thikr.count }}x
              </span>
            </div>
            
            <div class="card-body">
              <p class="card-text arabic-text mb-3">{{ thikr.content }}</p>
              <p class="card-text text-muted small" v-if="thikr.description">{{ thikr.description }}</p>
              
              <div class="progress mt-3" v-if="thikr.repeat > 1">
                <div class="progress-bar" 
                     :class="{'bg-primary': !thikr.completed, 'bg-success': thikr.completed}"
                     role="progressbar" 
                     :style="{width: `${(thikr.count / thikr.repeat) * 100}%`}" 
                     :aria-valuenow="thikr.count" 
                     aria-valuemin="0" 
                     :aria-valuemax="thikr.repeat">
                  {{ thikr.count }} / {{ thikr.repeat }}
                </div>
              </div>
            </div>
            
            <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
              <button 
                class="btn btn-sm" 
                :class="{'btn-outline-primary': !isFavorite(thikr), 'btn-danger': isFavorite(thikr)}"
                @click="toggleFavorite(thikr)"
                :title="isFavorite(thikr) ? 'Remove from favorites' : 'Add to favorites'"
              >
                <i class="bi" :class="{'bi-heart-fill': isFavorite(thikr), 'bi-heart': !isFavorite(thikr)}"></i>
              </button>
              
              <div class="d-flex align-items-center">
                <button 
                  class="btn btn-sm btn-outline-secondary"
                  @click="decrementCount(thikr)"
                  :disabled="thikr.count <= 0"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <span class="mx-2">{{ thikr.count }}</span>
                <button 
                  class="btn btn-sm btn-outline-secondary"
                  @click="incrementCount(thikr)"
                  :disabled="thikr.completed"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              
              <div>
                <button 
                  class="btn btn-sm btn-outline-success me-2"
                  @click="copyToClipboard(thikr.content)"
                  title="Copy to clipboard"
                >
                  <i class="bi bi-clipboard"></i>
                </button>
                <button 
                  class="btn btn-sm" 
                  :class="{'btn-outline-success': !thikr.completed, 'btn-success': thikr.completed}"
                  @click="toggleCompleted(thikr)"
                  :title="thikr.completed ? 'Mark as incomplete' : 'Mark as completed'"
                >
                  <i class="bi" :class="{'bi-check-circle-fill': thikr.completed, 'bi-check-circle': !thikr.completed}"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="alert alert-info mt-4" v-if="displayedAthkar.length === 0">
        <i class="bi bi-info-circle-fill me-2"></i>
        No Athkar found matching your criteria.
      </div>

      <!-- Pagination -->
      <nav aria-label="Athkar pagination" class="mt-4" v-if="filteredAthkar.length > itemsPerPage">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{disabled: currentPage === 1}">
            <button class="page-link" @click="currentPage--">
              &laquo; Previous
            </button>
          </li>
          
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{active: currentPage === page}">
            <button class="page-link" @click="currentPage = page">
              {{ page }}
            </button>
          </li>
          
          <li class="page-item" :class="{disabled: currentPage === totalPages}">
            <button class="page-link" @click="currentPage++">
              Next &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Toast Notification -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div class="toast align-items-center text-white" 
           :class="`bg-${toastType}`" 
           role="alert" 
           aria-live="assertive" 
           aria-atomic="true"
           :style="{display: showToast ? 'flex' : 'none'}">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center">
            <i class="bi me-2" :class="toastIcon"></i>
            {{ toastMessage }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="showToast = false"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnhancedAthkarApp',
  data() {
    return {
      // API Data
      athkar: [],
      collections: [
        { id: 'morning', name: 'Morning Athkar' },
        { id: 'evening', name: 'Evening Athkar' },
        { id: 'prayer', name: 'Prayer Athkar' },
        { id: 'sleep', name: 'Sleep Athkar' },
        { id: 'waking', name: 'Waking Up Athkar' }
      ],
      
      // UI State
      isLoading: true,
      error: null,
      activeTab: 'all',
      searchQuery: '',
      selectedCategory: '',
      selectedCollection: '',
      currentPage: 1,
      itemsPerPage: 9,
      
      // User Data
      favorites: JSON.parse(localStorage.getItem('favoriteAthkar')) || [],
      completed: JSON.parse(localStorage.getItem('completedAthkar')) || [],
      
      // Toast
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      toastIcon: 'bi-check-circle-fill'
    }
  },
  computed: {
    categories() {
      return [...new Set(this.athkar.map(item => item.category))];
    },
    
    filteredAthkar() {
      let filtered = this.athkar;
      
      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(thikr => 
          thikr.content.toLowerCase().includes(query) || 
          (thikr.description && thikr.description.toLowerCase().includes(query)) ||
          (thikr.reference && thikr.reference.toLowerCase().includes(query))
        );
      }
      
      // Filter by category
      if (this.selectedCategory) {
        filtered = filtered.filter(thikr => thikr.category === this.selectedCategory);
      }
      
      // Filter by collection
      if (this.selectedCollection) {
        filtered = filtered.filter(thikr => thikr.collection === this.selectedCollection);
      }
      
      // Filter by tab
      if (this.activeTab === 'favorites') {
        const favoriteIds = this.favorites.map(f => f.id);
        filtered = filtered.filter(thikr => favoriteIds.includes(thikr.id));
      } else if (this.activeTab === 'completed') {
        const completedIds = this.completed.map(c => c.id);
        filtered = filtered.filter(thikr => completedIds.includes(thikr.id));
      }
      
      // Mark completed items
      return filtered.map(thikr => ({
        ...thikr,
        completed: this.completed.some(c => c.id === thikr.id)
      }));
    },
    
    displayedAthkar() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAthkar.slice(start, end);
    },
    
    totalPages() {
      return Math.ceil(this.filteredAthkar.length / this.itemsPerPage);
    },
    
    totalCount() {
      return this.athkar.reduce((sum, thikr) => sum + thikr.count, 0);
    },
    
    completedCount() {
      return this.completed.length;
    }
  },
  watch: {
    currentPage() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    filteredAthkar() {
      // Reset to first page when filters change
      if (this.currentPage > 1 && this.displayedAthkar.length === 0) {
        this.currentPage = 1;
      }
    },
    
    favorites: {
      handler(newVal) {
        localStorage.setItem('favoriteAthkar', JSON.stringify(newVal));
      },
      deep: true
    },
    
    completed: {
      handler(newVal) {
        localStorage.setItem('completedAthkar', JSON.stringify(newVal));
      },
      deep: true
    }
  },
  methods: {
    async fetchAthkar() {
      this.isLoading = true;
      this.error = null;
      
      try {
        // Fetch from multiple endpoints
        const endpoints = [
          'https://ayah.nawafdev.com/api/athkar/morning',
          'https://ayah.nawafdev.com/api/athkar/evening',
          'https://ayah.nawafdev.com/api/athkar/prayer',
          'https://ayah.nawafdev.com/api/athkar/sleep',
          'https://ayah.nawafdev.com/api/athkar/waking'
        ];
        
        const responses = await Promise.all(endpoints.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        
        // Combine all data with collection info
        this.athkar = data.flatMap((collectionData, index) => 
          collectionData.map(item => ({
            ...item,
            id: `${this.collections[index].id}-${item.id || Math.random().toString(36).substr(2, 9)}`,
            collection: this.collections[index].id,
            repeat: item.repeat || 1,
            count: 0 // Start from 0 to show progress
          }))
        );
      } catch (err) {
        console.error('Error fetching athkar:', err);
        this.error = 'Failed to load Athkar. Please check your internet connection and try again.';
        
        // Fallback data
        this.athkar = this.getFallbackData();
      } finally {
        this.isLoading = false;
      }
    },
    
    getFallbackData() {
      return [
        {
          id: 'morning-1',
          collection: 'morning',
          category: 'Morning',
          content: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
          description: 'Seeking refuge with Allah from Satan',
          reference: 'Quran 16:98',
          repeat: 3,
          count: 0
        },
        {
          id: 'evening-1',
          collection: 'evening',
          category: 'Evening',
          content: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
          description: 'Ayat al-Kursi',
          reference: 'Quran 2:255',
          repeat: 1,
          count: 0
        },
        // Add more fallback data as needed
      ];
    },
    
    refreshData() {
      this.fetchAthkar();
      this.showToastMessage('Data refreshed', 'info', 'bi-arrow-repeat');
    },
    
    incrementCount(thikr) {
      if (thikr.count < thikr.repeat) {
        thikr.count++;
        
        // Check if completed after increment
        if (thikr.count === thikr.repeat && !this.completed.some(c => c.id === thikr.id)) {
          this.toggleCompleted(thikr);
        }
      }
    },
    
    decrementCount(thikr) {
      if (thikr.count > 0) {
        thikr.count--;
        
        // If count goes below repeat, mark as incomplete
        if (thikr.count < thikr.repeat && this.completed.some(c => c.id === thikr.id)) {
          this.toggleCompleted(thikr);
        }
      }
    },
    
    toggleFavorite(thikr) {
      const index = this.favorites.findIndex(fav => fav.id === thikr.id);
      if (index === -1) {
        this.favorites.push({ id: thikr.id });
        this.showToastMessage('Added to favorites', 'success', 'bi-heart-fill');
      } else {
        this.favorites.splice(index, 1);
        this.showToastMessage('Removed from favorites', 'warning', 'bi-heart');
      }
    },
    
    toggleCompleted(thikr) {
      const index = this.completed.findIndex(comp => comp.id === thikr.id);
      if (index === -1) {
        this.completed.push({ id: thikr.id });
        this.showToastMessage('Marked as completed', 'success', 'bi-check-circle-fill');
      } else {
        this.completed.splice(index, 1);
        this.showToastMessage('Marked as incomplete', 'info', 'bi-check-circle');
      }
    },
    
    isFavorite(thikr) {
      return this.favorites.some(fav => fav.id === thikr.id);
    },
    
    copyToClipboard(text) {
      navigator.clipboard.writeText(text);
      this.showToastMessage('Copied to clipboard!', 'success', 'bi-clipboard-check');
    },
    
    showToastMessage(message, type = 'success', icon = 'bi-check-circle-fill') {
      this.toastMessage = message;
      this.toastType = type;
      this.toastIcon = icon;
      this.showToast = true;
      
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    }
  },
  mounted() {
    this.fetchAthkar();
  }
}
</script>

<style scoped>
.athkar-app {
  max-width: 1400px;
}

.arabic-text {
  font-size: 1.3rem;
  text-align: right;
  direction: rtl;
  font-family: 'Traditional Arabic', 'Arial', sans-serif;
  line-height: 2;
  margin-bottom: 1rem;
}

.card {
  transition: all 0.2s ease;
  border-radius: 12px;
  overflow: hidden;
  border-width: 2px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-bottom: none;
  padding: 1rem 1.25rem;
}

.card-footer {
  border-top: none;
  padding: 0.75rem 1.25rem;
}

.progress {
  height: 1.5rem;
  border-radius: 0.75rem;
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.nav-tabs {
  border-bottom: 2px solid #dee2e6;
}

.nav-tabs .nav-link {
  border: none;
  color: #6c757d;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s;
}

.nav-tabs .nav-link:hover {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.05);
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  background-color: transparent;
  border-bottom: 3px solid #0d6efd;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-link {
  color: #0d6efd;
}

@media (max-width: 768px) {
  .arabic-text {
    font-size: 1.1rem;
    line-height: 1.8;
  }
  
  .card-header, .card-footer {
    padding: 0.75rem;
  }
  
  .nav-tabs .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>