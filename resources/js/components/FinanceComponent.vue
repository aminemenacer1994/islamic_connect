<template>
  <div class="container">
    <div class="fw-bold display-5 text-center py-3">Islamic Finance</div>
    <p class="text-center container  lead ">
      Rooted in ethical principles, Islamic finance ensures fairness and transparency in financial transactions in accordance with Shariah.</p>
    
    <!-- Main Container -->
    <div class="container mb-4">
      <div class="row g-4">
        <!-- Sidebar Categories -->
        <div class="col-md-4 col-lg-3">
          <div class="card shadow-sm h-80">
            <div class="card-header text-white" style="background-color: #0db691;">
              <h5 class="mb-0"><i class="bi bi-filter-circle me-2"></i>Categories</h5>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <button
                  v-for="category in categories"
                  :key="category.id"
                  @click="setActiveCategory(category.id)"
                  :class="['btn text-start', activeCategory === category.id ? 'text-white' : 'btn-outline-light']"
                  :style="activeCategory === category.id ? 'background-color: #0db691;' : 'border-color: #0db691; color: #0db691;'"
                >
                  <i :class="getCategoryIcon(category.id)" class="me-2"></i>
                  {{ category.name }}
                  <span class="badge bg-white text-dark float-end">{{ getCategoryTipCount(category.id) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="col-md-8 col-lg-9">
          <div class="card shadow-sm">
            <div class="card-header text-white" style="background-color: #0db691;">
              <h5 class="mb-0 d-flex align-items-center">
                <i :class="getCategoryIcon(activeCategory)" class="me-2"></i>
                {{ getActiveCategoryName() }}
              </h5>
            </div>

            <div class="card-body">
              <div v-if="filteredTips.length === 0" class="alert alert-warning text-center">
                No content available for this category.
              </div>

              <div v-else class="row g-4">
                <div class="col-md-6" v-for="tip in filteredTips" :key="tip.id">
                  <div class="card h-100 border-0 shadow-sm">
                    <div class="card-header text-white" :style="`background-color: ${getCategoryColor(tip.category)}`">
                      <h6 class="mb-0">{{ tip.title }}</h6>
                    </div>
                    <div class="card-body">
                      <div class="mb-2 d-flex align-items-center justify-content-between small">
                        <span class="badge text-white" :style="`background-color: ${getCategoryColor(tip.category)}`">
                          {{ getCategoryName(tip.category) }}
                        </span>
                        <span class="text-muted">
                          <i class="bi bi-star-fill me-1"></i>{{ tip.importance }}/5
                        </span>
                      </div>

                      <h6 class="small text-muted">{{ tip.description }}</h6>

                      <div v-if="tip.example" class="p-2 rounded mb-2" style="background-color: #e6f9f4;">
                        <h6 class="mb-1" style="color: #0db691;"><i class="bi bi-lightbulb me-1"></i>Practical Example</h6>
                        <p class="mb-0 small">{{ tip.example }}</p>
                      </div>

                      <div v-if="tip.benefits" class="p-2 rounded mb-2" style="background-color: #e6f9f4;">
                        <h6 class="mb-1" style="color: #0db691;"><i class="bi bi-check-circle me-1"></i>Key Benefits</h6>
                        <ul class="mb-0 small ps-3">
                          <li v-for="(benefit, i) in tip.benefits" :key="i">{{ benefit }}</li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="tip.references" class="card-footer bg-white border-top small">
                      <h6 class="mb-1" style="color: #0db691;"><i class="bi bi-book me-1"></i>Islamic References</h6>
                      <ul class="mb-0 ps-3">
                        <li v-for="(ref, i) in tip.references" :key="i">{{ ref }}</li>
                      </ul>
                    </div>
                  </div>
                </div> <!-- end col -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>



<script>
import halalFinanceData from './halalFinanceData.json';

export default {
  data() {
    return {
      categories: [],
      tips: [],
      activeCategory: 1,
      isLoading: false,
      error: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    filteredTips() {
      return this.tips.filter(tip => tip.category === this.activeCategory);
    }
  },
  methods: {
    getCategoryColor(categoryId) {
      const shades = {
        
        default: '#0db691',
      };
      return shades[categoryId] || shades.default;
    },
    async loadData() {
      this.isLoading = true;
      try {
        this.categories = halalFinanceData.categories || [];
        this.tips = halalFinanceData.tips || [];
      } catch (err) {
        this.error = 'Failed to load content. Please try again later.';
        console.error('Error loading data:', err);
      } finally {
        this.isLoading = false;
      }
    },
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId;
    },
    getImportanceClass(importance) {
      if (importance >= 5) return 'text-danger';
      if (importance >= 4) return 'text-warning';
      if (importance >= 3) return 'text-info';
      return 'text-success';
    },
    getCategoryIcon(categoryId) {
      const icons = [
        'bi-lightbulb', 'bi-gem', 'bi-graph-up', 'bi-bank',
        'bi-heart', 'bi-people', 'bi-file-text', 'bi-shake-hands'
      ];
      return icons[categoryId - 1] || 'bi-info-circle';
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id === categoryId);
      return category?.name || 'Uncategorized';
    },
    getActiveCategoryName() {
      const category = this.categories.find(c => c.id === this.activeCategory);
      return category?.name || 'All Categories';
    },
    getCategoryTipCount(categoryId) {
      return this.tips.filter(tip => tip.category === categoryId).length || 0;
    },
    getCategoryBadgeClass(categoryId) {
      const colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning',
        'bg-danger', 'bg-secondary', 'bg-dark', 'bg-purple'];
      return colors[categoryId % colors.length] || 'bg-secondary';
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
body {
  font-size: 1rem; /* Increased slightly from 1rem (base) */
  line-height: 1.8;
}

.card,
.btn,
.card-body,
.card-header,
.card-footer,
.alert {
  font-size: 1.05rem; /* Make content slightly larger */
}

h2,
h5,
h6 {
  font-size: 1.5rem;
}

.lead {
  font-size: 1.25rem;
}

.category-btn,
.tip-title,
.tip-description {
  font-size: 1.2rem;
}

.card-header h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Cards */
.sidebar-card,
.main-card {
  background: white;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

/* Categories */
.categories-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  border: none;
  background-color: #f7f7f7;
  color: #333;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background-color: #e1e8ed;
}

.category-btn.active {
  background-color: #0db691; /* green */
  color: white;
}

.category-btn .badge {
  margin-left: auto;
  background-color: white;
  color: #0db691;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
}

.category-btn.active .badge {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Tips */
.tip-title {
  font-size: 1.3rem;
}

.tip-description {
  font-size: 1.1rem;
  margin: 1rem 0;
}

.tip-section {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.importance {
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .tip-title {
    font-size: 1.15rem;
  }

  .category-btn {
    font-size: 1.1rem;
  }

  .lead {
    font-size: 1.1rem;
  }
}
</style>
