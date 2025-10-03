<template>
  <div class="container py-4">
    <!-- Title -->
    <div class="display-4 fw-bold text-center mb-3">Islamic Finance</div>
    <p class="lead text-center text-muted mb-4">
      Rooted in ethical principles, Islamic finance ensures fairness and transparency in financial transactions in
      accordance with Shariah.
    </p>

    <div class="row g-4">
      <!-- Sidebar Categories -->
      <div class="col-lg-3">
        <div class="card shadow rounded-4">
          <div class="card-header text-white rounded-top-4"
            style="background: linear-gradient(135deg, #0db691, #0aa07e);">
            <h5 class="mb-0"><i class="bi bi-filter-circle me-2"></i>Categories</h5>
          </div>
          <div class="card-body p-3">
            <!-- Dropdown for mobile screens -->
            <div class="d-md-none">
              <select v-model="activeCategory" @change="setActiveCategory($event.target.value)"
                class="form-select rounded-pill" style="border-color: #0db691; color: #0db691;">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }} ({{ getCategoryTipCount(category.id) }})
                </option>
              </select>
            </div>
            <!-- Sidebar buttons for larger screens -->
            <div class="d-none d-md-block">
              <div class="d-grid gap-2">
                <button v-for="category in categories" :key="category.id" @click="setActiveCategory(category.id)"
                  class="btn btn-light border rounded-pill text-start d-flex justify-content-between align-items-center"
                  :class="{ 'btn-gradient text-white': activeCategory === category.id }"
                  :style="activeCategory === category.id ? 'border: none;' : 'border-color: #0db691; color: #0db691;'">
                  <span><i :class="getCategoryIcon(category.id)" class="me-2"></i>{{ category.name }}</span>
                  <span class="badge bg-white text-dark">{{ getCategoryTipCount(category.id) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-lg-9">
        <div class="card shadow rounded-4">
          <div class="card-header text-white rounded-top-4"
            style="background: linear-gradient(135deg, #0db691, #0aa07e);">
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
                <div class="card h-100 shadow-sm border-0 rounded-4">
                  <div class="card-header text-white" :style="`background-color: ${getCategoryColor(tip.category)}`">
                    <h6 class="mb-0">{{ tip.title }}</h6>
                  </div>
                  <div class="card-body">
                    <p class="small text-muted">{{ tip.description }}</p>

                    <div v-if="tip.example" class="p-3 rounded-3 bg-light border mb-2">
                      <h6 class="text-success"><i class="bi bi-lightbulb me-1"></i> Practical Example</h6>
                      <p class="small mb-0">{{ tip.example }}</p>
                    </div>

                    <div v-if="tip.benefits" class="p-3 rounded-3 bg-light border mb-2">
                      <h6 class="text-success"><i class="bi bi-check-circle me-1"></i> Key Benefits</h6>
                      <ul class="small ps-3 mb-0">
                        <li v-for="(benefit, i) in tip.benefits" :key="i">{{ benefit }}</li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="tip.references" class="card-footer bg-white border-top small">
                    <h6 class="text-success"><i class="bi bi-book me-1"></i> Islamic References</h6>
                    <ul class="ps-3 mb-0">
                      <li v-for="(ref, i) in tip.references" :key="i">{{ ref }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> <!-- card-body -->
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
      activeCategory: null, // Initialize as null to avoid invalid initial state
      isLoading: false,
      error: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    filteredTips() {
      if (!this.activeCategory) return [];
      return this.tips.filter(tip => tip.category === parseInt(this.activeCategory));
    }
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      try {
        this.categories = halalFinanceData.categories || [];
        this.tips = halalFinanceData.tips || [];
        // Set default activeCategory to the first category if available
        if (this.categories.length > 0) {
          this.activeCategory = this.categories[0].id;
        }
      } catch (err) {
        this.error = 'Failed to load content. Please try again later.';
        console.error('Error loading data:', err);
      } finally {
        this.isLoading = false;
      }
    },
    setActiveCategory(categoryId) {
      this.activeCategory = parseInt(categoryId); // Ensure categoryId is an integer
    },
    getCategoryColor(categoryId) {
      const shades = {
        default: '#0db691',
      };
      return shades[categoryId] || shades.default;
    },
    getCategoryIcon(categoryId) {
      const icons = [
        'bi-lightbulb', 'bi-gem', 'bi-graph-up', 'bi-bank',
        'bi-heart', 'bi-people', 'bi-file-text', 'bi-shake-hands'
      ];
      return icons[categoryId - 1] || 'bi-info-circle';
    },
    getCategoryName(categoryId) {
      return this.categories.find(c => c.id === categoryId)?.name || 'Uncategorized';
    },
    getActiveCategoryName() {
      return this.categories.find(c => c.id === this.activeCategory)?.name || 'All Categories';
    },
    getCategoryTipCount(categoryId) {
      return this.tips.filter(tip => tip.category === categoryId).length || 0;
    }
  }
};
</script>
<style scoped>
.text-gradient {
  background: linear-gradient(to right, #0db691, #0aa07e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-gradient {
  background: linear-gradient(to right, #0db691, #0aa07e);
  color: white !important;
  font-weight: 600;
}

.btn-gradient:hover {
  filter: brightness(1.05);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.card {
  border-radius: 1rem;
}

.card-header {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.card-footer {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.form-select {
  background: white;
  font-weight: 500;
  padding: 0.75rem 1rem;
}

.form-select:focus {
  border-color: #0db691;
  box-shadow: 0 0 0 0.2rem rgba(13, 182, 145, 0.25);
}

@media (max-width: 768px) {
  .display-5 {
    font-size: 2rem;
  }

  .lead {
    font-size: 1rem;
  }

  .btn {
    font-size: 0.95rem;
  }

  .card-body, .card-footer {
    padding: 1rem;
  }

  .form-select {
    font-size: 0.95rem;
  }

  /* Ensure main content takes full width on mobile */
  .col-lg-9 {
    margin-top: 1rem;
  }
}
</style>