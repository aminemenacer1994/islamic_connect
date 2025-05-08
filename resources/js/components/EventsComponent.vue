<template>
  <div class="halal-finance-app">
    <div class="row justify-content-center text-center py-4">
      <div class="col-lg-8 col-xl-7">
        <h2 class="display-5 fw-bold">Islamic Finance</h2>
        <p class="lead">Islamic finance refers to a financial system that operates in accordance with Shariah (Islamic
          law). It is rooted in ethical principles and aims to promote fairness, transparency, and social justice in
          financial transactions.</p>
      </div>
    </div>
    <div class="app-container container">
      <div class="row g-4">
        <!-- Categories -->
        <div class="col-md-3">
          <div class="sidebar-card">
            <div class="card-header">
              <h2><i class="bi bi-filter-circle"></i> Categories</h2>
            </div>
            <div class="card-body">
              <div class="categories-list">
                <button v-for="category in categories" :key="category.id" @click="setActiveCategory(category.id)"
                  :class="['category-btn', activeCategory === category.id ? 'active' : '']">
                  <i :class="getCategoryIcon(category.id)"></i>
                  {{ category.name }}
                  <span class="badge">{{ getCategoryTipCount(category.id) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tips Content -->
        <div class="col-md-9">
          <div class="main-card">
            <div class="card-header">
              <h2>
                <i :class="getCategoryIcon(activeCategory)"></i>
                {{ getActiveCategoryName() }}
              </h2>
            </div>

            <div class="card-body">
              <div v-if="filteredTips.length === 0" class="empty-state">
                <p>No content available for this category.</p>
              </div>

              <div v-else class="tips-list">
                <div class="tip-item" v-for="tip in filteredTips" :key="tip.id">
                  <h3 class="tip-title">{{ tip.title }}</h3>
                  <div class="tip-badge" :class="getCategoryBadgeClass(tip.category)">
                    {{ getCategoryName(tip.category) }}
                  </div>

                  <p class="tip-description">{{ tip.description }}</p>

                  <div v-if="tip.example" class="tip-section">
                    <h4><i class="bi bi-lightbulb"></i> Example</h4>
                    <p>{{ tip.example }}</p>
                  </div>

                  <div v-if="tip.benefits" class="tip-section">
                    <h4><i class="bi bi-check-circle"></i> Benefits</h4>
                    <ul>
                      <li v-for="(benefit, i) in tip.benefits" :key="i">{{ benefit }}</li>
                    </ul>
                  </div>

                  <div v-if="tip.references" class="tip-section">
                    <h4><i class="bi bi-book"></i> References</h4>
                    <ul>
                      <li v-for="(ref, i) in tip.references" :key="i">{{ ref }}</li>
                    </ul>
                  </div>

                  <div class="tip-meta">
                    <span :class="getImportanceClass(tip.importance)">
                      Importance: {{ tip.importance }}/5
                    </span>
                    <span class="date">
                      <i class="bi bi-calendar"></i> {{ formatDate(tip.date) }}
                    </span>
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
      const category = this.categories?.find(c => c.id === categoryId);
      return category?.name || 'Uncategorized';
    },
    getActiveCategoryName() {
      const category = this.categories?.find(c => c.id === this.activeCategory);
      return category?.name || 'All Categories';
    },
    getCategoryTipCount(categoryId) {
      return this.tips?.filter(tip => tip.category === categoryId).length || 0;
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
/* Color Scheme */
:root {
  --primary-color: #2c5e92;
  --secondary-color: #6c8ebf;
  --accent-color: #d6b161;
  --dark-color: #1a3a5a;
  --light-color: #f5f8fa;
}

/* Base Styles */
.halal-finance-app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
}

.app-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-color) 100%);
  color: white;
  padding: 3rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
}

.app-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.app-subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
}

/* Cards */
.sidebar-card,
.main-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.card-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1.25rem 1.75rem;
  border-radius: 12px 12px 0 0;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-body {
  padding: 1.75rem;
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
  background-color: var(--light-color);
  color: #333;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: left;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background-color: #e1e8ed;
}

.category-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.category-btn i {
  font-size: 1.2rem;
}

.category-btn.active i {
  color: white;
}

.category-btn .badge {
  margin-left: auto;
  background-color: white;
  color: var(--primary-color);
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
}

.category-btn.active .badge {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Tips Content */
.tips-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tip-item {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.tip-title {
  font-size: 1.5rem;
  color: var(--dark-color);
  margin-bottom: 0.5rem;
}

.tip-badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.tip-description {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.tip-section {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background-color: var(--light-color);
  border-radius: 8px;
}

.tip-section h4 {
  margin-top: 0;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tip-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #666;
}

.importance {
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }

  .app-subtitle {
    font-size: 1.1rem;
  }

  .card-header h2 {
    font-size: 1.25rem;
  }

  .category-btn {
    font-size: 1rem;
    padding: 0.75rem 1rem;
  }
}
</style>