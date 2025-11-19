<template>
  <div class="container py-4">
    <!-- Title -->
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Finance</h2>
    <p class="text-center text-dark mb-4" style="font-size: 18px;">
      Rooted in ethical principles, Islamic finance ensures fairness and transparency in financial transactions in
      accordance with Shariah.
    </p>

    <div class="container" style="padding: 10px;">
      <div class="mx-auto mb-4" style="
          position: relative;
          background: #eaf3f1;
          border: 1px solid rgba(11, 128, 111, 0.20);
          border-radius: 24px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.03), 0 10px 28px rgba(26,95,122,0.09);
          padding: 1.25rem 1.75rem;
        ">
        <button type="button" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
          :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'" @click="toggleNextStepMinimized"
          style="position: absolute; right: 44px; top: 14px; opacity: 0.9; background: transparent; border: 0; color: #6b8b91; z-index: 3; cursor: pointer;">
          <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
        </button>
        <div class="d-flex align-items-start gap-3 text-start">
          <div class="flex-shrink-0 mt-1">
            <div class="next-step-icon-circle" role="img" aria-label="Gentle Islamic blog guide" style="
              width: 48px; height: 48px;
              border-radius: 50%;
              background: linear-gradient(145deg, rgba(11, 128, 111, 0.24), rgba(26, 95, 122, 0.12));
              display: flex; align-items: center; justify-content: center;
              color: rgb(0, 121, 107); font-size: 1.25rem;
              box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.24), 0 6px 16px rgba(26,95,122,0.12);
            ">
              <i class="fas fa-feather-alt" aria-hidden="true"></i>
            </div>
          </div>
          <div style="flex:1;">
            <p class="mb-2 fw-semibold text-uppercase"
              style="letter-spacing: 0.1em; color: #1a5f7a; font-size: 0.78rem;">
              NEXT STEP
            </p>
            <!-- Minimized teaser -->
            <div v-show="nextStepMinimized" class="mb-2 d-inline-flex align-items-center gap-1" style="color: #1f2933;">
              <a href="/read" class="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1"
                style="color:rgb(0, 121, 107);" aria-label="Open the Islamic blogs guide">
                Continue with gentle Islamic blogs
                <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"
                  style="color:rgb(0, 121, 107); font-size: 0.82rem; opacity: 0.85;"></i>
              </a>
            </div>
            <p v-show="!nextStepMinimized" class="mb-3" style="color: #1f2933; line-height: 1.7; font-size: 1.02rem;">
              Finished exploring Islamic finance terms and seeking gentle next steps? Slide into our curated collection of
              Islamic blogs.
              <a href="/read" class="fw-semibold text-decoration-none" style="color:rgb(0, 121, 107);">
                Visit Islamic Blogs
              </a>
              whenever you feel ready.
            </p>
            <div v-show="!nextStepMinimized" class="d-flex flex-wrap gap-2">
              <a href="/read" class="btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center"
                style="
                  background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);
                  border: none; border-radius: 999px;
                  box-shadow: 0 10px 20px rgba(26, 95, 122, 0.22);
                  transition: transform 0.2s ease, box-shadow 0.2s ease;
                  "
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 14px 26px rgba(26, 95, 122, 0.26)';"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(26, 95, 122, 0.22)';">
                <span>Explore Islamic Blogs</span>
                <i class="fas fa-book-open ms-2" aria-hidden="true"></i>
                <span class="visually-hidden">Open the accessible Islamic blogs for new Muslims</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Sidebar Categories -->
      <div class="col-lg-3" role="navigation" aria-label="Finance categories">
        <div class="card card-teal shadow rounded-4">
          <div class="card-header text-white rounded-top-4"
            style="background: linear-gradient(135deg, rgb(0, 121, 107), rgb(0, 121, 107));">
            <h5 class="mb-0"><i class="bi bi-filter-circle me-2"></i>Categories</h5>
          </div>
          <div class="card-body p-3">
            <!-- Dropdown for mobile screens -->
            <div class="d-md-none">
              <label for="finance-category-select" class="form-label visually-hidden">Select category</label>
              <select id="finance-category-select" v-model.number="activeCategory" class="form-select rounded-pill"
                style="border-color: rgb(0, 121, 107);" aria-label="Select finance category">
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }} ({{ tipCountsByCategory[category.id] || 0 }})
                </option>
              </select>
            </div>
            <!-- Sidebar buttons for larger screens -->
            <div class="d-none d-md-block">
              <div class="d-grid gap-2">
                <button v-for="category in categories" :key="category.id" @click="setActiveCategory(category.id)"
                  class="btn btn-light border rounded-pill text-start d-flex justify-content-between align-items-center"
                  :class="{ 'btn-gradient text-white': activeCategory === category.id }"
                  :style="activeCategory === category.id ? 'border: none;' : 'border-color: rgb(0, 121, 107); color: rgb(0, 121, 107);'">
                  <span><i :class="getCategoryIcon(category.id)" class="me-2" aria-hidden="true"></i>{{ category.name
                    }}</span>
                  <span class="badge bg-white text-dark">{{ tipCountsByCategory[category.id] || 0 }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-lg-9">
        <div class="card card-teal shadow rounded-4">
          <div class="card-header text-white rounded-top-4"
            style="background: linear-gradient(135deg, rgb(0, 121, 107), rgb(0, 121, 107));">
            <h5 class="mb-0 d-flex align-items-center">
              <i :class="getCategoryIcon(activeCategory)" class="me-2"></i>
              {{ activeCategoryName }}
            </h5>
          </div>
          <div class="card-body">
            <div v-if="filteredTips.length === 0" class="alert alert-warning text-center">
              No content available for this category.
            </div>
            <div v-else class="row g-4">
              <div class="col-md-6" v-for="tip in paginatedTips" :key="tip.id">
                <div class="card card-teal h-100 shadow-sm border-0 rounded-4" role="article"
                  :aria-labelledby="'tip-title-' + tip.id">
                  <div class="card-header text-white" :style="`background-color: ${getCategoryColor(tip.category)}`">
                    <h6 class="mb-0" :id="'tip-title-' + tip.id">{{ tip.title }}</h6>
                  </div>
                  <div class="card-body">
                    <p class="small text-muted">{{ tip.description }}</p>

                    <div v-if="tip.example" class="p-3 rounded-3 bg-light border mb-2">
                      <h6 class="text-dark"><i class="bi bi-lightbulb me-1"></i> Practical Example</h6>
                      <p class="small mb-0">{{ tip.example }}</p>
                    </div>

                    <div v-if="tip.benefits" class="p-3 rounded-3 bg-light border mb-2">
                      <h6 class="text-dark"><i class="bi bi-check-circle me-1"></i> Key Benefits</h6>
                      <ul class="small ps-3 mb-0">
                        <li v-for="(benefit, i) in tip.benefits" :key="i">{{ benefit }}</li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="tip.references" class="card-footer bg-white border-top small">
                    <h6 class="text-dark"><i class="bi bi-book me-1"></i> Islamic References</h6>
                    <ul class="ps-3 mb-0">
                      <li v-for="(ref, i) in tip.references" :key="i">{{ ref }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Pagination -->
            <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-3 gap-2">
              <button class="btn btn-outline-success btn-sm" :disabled="currentPage === 1" @click="currentPage--">
                <i class="bi bi-chevron-left"></i>
              </button>
              <span class="small">Page {{ currentPage }} of {{ totalPages }}</span>
              <button class="btn btn-outline-success btn-sm" :disabled="currentPage === totalPages"
                @click="currentPage++">
                <i class="bi bi-chevron-right"></i>
              </button>
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
      nextStepMinimized: false,
      activeCategory: null, // will be set after load
      currentPage: 1,
      pageSize: 8,
      isLoading: false,
      error: null
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    // Map category id -> name for O(1) lookups
    categoryNameById() {
      const map = Object.create(null);
      for (const c of this.categories) map[c.id] = c.name;
      return map;
    },
    // Precompute counts once per tips change
    tipCountsByCategory() {
      const counts = Object.create(null);
      for (const t of this.tips) counts[t.category] = (counts[t.category] || 0) + 1;
      return counts;
    },
    activeCategoryName() {
      if (!this.activeCategory) return 'All Categories';
      return this.categoryNameById[this.activeCategory] || 'Uncategorized';
    },
    filteredTips() {
      if (!this.activeCategory) return [];
      return this.tips.filter(tip => tip.category === this.activeCategory);
    },
    paginatedTips() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredTips.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredTips.length / this.pageSize) || 1);
    }
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
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
      // Buttons pass numbers; select casts via v-model.number
      this.activeCategory = categoryId;
      this.currentPage = 1;
    },
    getCategoryColor(categoryId) {
      const shades = {
        default: 'rgb(0, 121, 107)',
      };
      return shades[categoryId] || shades.default;
    },
    getCategoryIcon(categoryId) {
      const icons = [
        'bi-lightbulb', 'bi-gem', 'bi-graph-up', 'bi-bank',
        'bi-heart', 'bi-people', 'bi-file-text', 'bi-shake-hands'
      ];
      return icons[categoryId - 1] || 'bi-info-circle';
    }
  },
  watch: {
    activeCategory() {
      this.currentPage = 1;
    }
  }
};
</script>
<style scoped>
.card-teal {
  border-radius: 20px;
  border: 1px solid rgba(20, 184, 165, 0);
  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.card-teal:hover { 
  transform: translateY(-2px); box-shadow: 0 18px 40px rgba(2,44,34,0.12); 
}
.lead.text-muted {
  /* Improve contrast on light backgrounds (#f5f5f5 body) */
  color: #495057 !important;
  /* darker than Bootstrap's #6c757d */
}

/* Force accessible text color for the mobile category select */
#finance-category-select {
  color: rgb(0, 121, 107) !important;
  /* ≥ 4.5:1 on white */
  border-color: rgb(0, 121, 107) !important;
  background-color: #ffffff;
}

#finance-category-select option {
  color: rgb(0, 121, 107);
}

.text-gradient {
  background: linear-gradient(to right, rgb(0, 121, 107), rgb(0, 121, 107));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-gradient {
  background: linear-gradient(to right, rgb(0, 121, 107), rgb(0, 121, 107));
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
  border-color: rgb(0, 121, 107);
  box-shadow: 0 0 0 0.2rem rgba(0, 121, 107, 0.25);
}

.text-success {
  color: #006400 !important;
  font-weight: 700;
}

.btn-outline-success {
  color: #28a745;
  border-color: #28a745;
}

.btn-outline-success:hover,
.btn-outline-success:focus {
  background-color: #28a745;
  color: #ffffff;
  border-color: #28a745;
  box-shadow: 0 0.25rem 0.75rem rgba(40, 167, 69, 0.25);
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

  .card-body,
  .card-footer {
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
