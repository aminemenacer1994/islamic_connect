```vue
<template>
  <div 
    class="container py-5" 
    style="font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 1200px;"
  >
    <!-- Header -->
    <header class="text-center mb-5">
      <h1 
        class="fw-bold display-4 mb-3" 
        style="color: #2d3748; letter-spacing: -0.02rem;"
      >
        Quran History
      </h1>
      <p 
        class="lead mb-0" 
        style="color: #4a5568; font-size: 1.15rem; line-height: 1.6; max-width: 800px; margin: 0 auto;"
      >
        Explore the Quran’s journey—its revelation, memorization, and codification—as a unifying force for the global Muslim community.
      </p>
    </header>

    <!-- Accordion -->
    <div v-if="accordionItems.length" class="accordion mb-5" id="historyAccordion">
      <div 
        v-for="(item, idx) in accordionItems" 
        :key="item.title" 
        class="accordion-item mb-3 rounded-3 shadow-sm" 
        style="background-color: #ffffff; border: 1px solid #e2e8f0;"
      >
        <h2 class="accordion-header" :id="'heading' + idx">
          <button 
            class="accordion-button px-4 py-3 fw-semibold" 
            :class="{ 'collapsed': idx !== 0 }" 
            type="button" 
            data-bs-toggle="collapse" 
            :data-bs-target="'#collapse' + idx" 
            :aria-expanded="idx === 0" 
            :aria-controls="'collapse' + idx" 
          >
            <span 
              class="badge rounded-pill me-3 fw-bold" 
              style="background-color: #00bfa6; color: #ffffff; border: 1px solid #00bfa6; font-size: 0.9rem; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center;"
            >
              {{ idx + 1 }}
            </span>
            <span>{{ item.title }}</span>
          </button>
        </h2>
        <div 
          :id="'collapse' + idx" 
          class="accordion-collapse collapse" 
          :class="{ show: idx === 0 }" 
          :aria-labelledby="'heading' + idx" 
          data-bs-parent="#historyAccordion"
        >
          <div 
            class="accordion-body px-4 py-4 rounded-bottom-3" 
            style="background-color: #ffffff; font-size: 1.05rem; line-height: 1.7; color: #4a5568;"
          >
            <!-- Details (for regular sections) -->
            <div v-if="isRegularSection(item)">
              <div class="row g-4">
                <template v-for="(value, key, index) in item.details">
                  <div 
                    v-if="value && typeof value === 'string'" 
                    class="col-12 col-md-6" 
                    :key="`${key}-${index}`"
                  >
                    <div 
                      class="card h-100 border-0 rounded-3 shadow-sm transition" 
                      style="background-color: #f7fafc; padding: 1.25rem;"
                    >
                      <div>
                        <span 
                          style="font-weight: 600; color: #00bfa6; font-size: 1rem;"
                        >
                          <i class="bi bi-dot" style="margin-right: 0.25rem; font-size: 1.2rem;"></i>{{ formatKey(key) }}:
                        </span>
                        <div style="margin-top: 0.5rem;">{{ value }}</div>
                      </div>
                    </div>
                  </div>
                  <div 
                    v-else-if="value && Array.isArray(value)" 
                    class="col-12"
                  >
                    <div 
                      class="card h-100 border-0 rounded-3 shadow-sm transition" 
                      style="background-color: #f7fafc; padding: 1.25rem;"
                    >
                      <div>
                        <span 
                          style="font-weight: 600; color: #00bfa6; font-size: 1rem;"
                        >
                          <i class="bi bi-list-ul" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>{{ formatKey(key) }}:
                        </span>
                        <ul 
                          style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;"
                        >
                          <li v-for="(subItem, i) in value" :key="i">{{ subItem }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div 
                    v-else-if="value && typeof value === 'object'" 
                    class="col-12"
                  >
                    <div 
                      class="card h-100 border-0 rounded-3 shadow-sm transition" 
                      style="background-color: #f7fafc; padding: 1.25rem;"
                    >
                      <div>
                        <span 
                          style="font-weight: 600; color: #00bfa6; font-size: 1rem;"
                        >
                          <i class="bi bi-diagram-3" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>{{ formatKey(key) }}:
                        </span>
                        <ul 
                          style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;"
                        >
                          <li v-for="(v, k) in value" :key="k">
                            <span style="font-weight: 600;">{{ formatKey(k) }}:</span> {{ v }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <!-- Table (for regular sections) -->
            <div 
              v-if="item.table && isRegularSection(item)" 
              class="mt-4"
            >
              <div 
                style="font-weight: 600; color: #00bfa6; font-size: 1rem; margin-bottom: 0.75rem;"
              >
                <i class="bi bi-table" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>Comparative Table
              </div>
              <div class="table-responsive">
                <table 
                  class="table table-bordered align-middle mb-0" 
                  style="background-color: #ffffff; font-size: 1rem; border-color: #e2e8f0;"
                >
                  <thead style="background-color: #f7fafc;">
                    <tr>
                      <th 
                        v-for="(col, i) in getTableColumns(item.table)" 
                        :key="i" 
                        style="font-weight: 500; color: #00bfa6; font-size: 0.95rem; padding: 1rem;"
                      >
                        {{ formatKey(col) }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, i) in item.table" :key="i">
                      <td 
                        v-for="(val, k) in row" 
                        :key="k" 
                        style="padding: 1rem;"
                      >
                        {{ val }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- Insights, Significance, Recommendations, Challenges (for regular sections) -->
            <div 
              v-if="item.significance && isRegularSection(item)" 
              class="alert mt-4 border-0 rounded-3 shadow-sm py-3 px-4" 
              style="background-color: #f7fafc; color: #2d3748;"
            >
              <i 
                class="bi bi-lightbulb" 
                style="margin-right: 0.5rem; color: #00bfa6; font-size: 1.2rem;"
              ></i>
              <strong>Significance:</strong> {{ item.significance }}
            </div>
            <div 
              v-if="item.insights && isRegularSection(item)" 
              class="alert alert-info mt-4 border-0 rounded-3 shadow-sm py-3 px-4" 
              style="background-color: #edfafa; border-color: #bee3e3; color: #2d3748;"
            >
              <i 
                class="bi bi-info-circle" 
                style="margin-right: 0.5rem; color: #00bfa6; font-size: 1.2rem;"
              ></i>
              <strong>Insights:</strong>
              <ul 
                style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;"
              >
                <li v-for="(insight, i) in item.insights" :key="i">{{ insight }}</li>
              </ul>
            </div>
            <div 
              v-if="item.details && item.details.recommendations && isRegularSection(item)" 
              class="alert alert-secondary mt-4 border-0 rounded-3 shadow-sm py-3 px-4" 
              style="background-color: #f7fafc; border-color: #e2e8f0; color: #2d3748;"
            >
              <i 
                class="bi bi-star" 
                style="margin-right: 0.5rem; color: #00bfa6; font-size: 1.2rem;"
              ></i>
              <strong>Recommendations:</strong>
              <ul 
                style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;"
              >
                <li v-for="(rec, i) in item.details.recommendations" :key="i">
                  <span style="font-weight: 600;">{{ rec.name }}:</span> {{ rec.description }}
                </li>
              </ul>
            </div>
            <div 
              v-if="item.details && item.details.challenges && isRegularSection(item)" 
              class="alert alert-warning mt-4 border-0 rounded-3 shadow-sm py-3 px-4" 
              style="background-color: #fefcbf; border-color: #fefcbf; color: #744210;"
            >
              <i 
                class="bi bi-exclamation-triangle" 
                style="margin-right: 0.5rem; color: #00bfa6; font-size: 1.2rem;"
              ></i>
              <strong>Challenges:</strong>
              <ul 
                style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;"
              >
                <li v-for="(ch, i) in item.details.challenges" :key="i">{{ ch }}</li>
              </ul>
            </div>
            <!-- Conclusion Content -->
            <div v-if="item.conclusion" class="row g-4">
              <div class="col-12 col-md-4">
                <div 
                  class="card h-100 border-0 rounded-3 shadow-sm transition" 
                  style="background-color: #ffffff; padding: 1.25rem;"
                >
                  <div>
                    <div 
                      style="font-weight: 600; margin-bottom: 0.5rem; color: #00bfa6; font-size: 1rem;"
                    >
                      Summary
                    </div>
                    <div style="font-size: 1.05rem; line-height: 1.7;">{{ item.conclusion.summary }}</div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div 
                  class="card h-100 border-0 rounded-3 shadow-sm transition" 
                  style="background-color: #ffffff; padding: 1.25rem;"
                >
                  <div>
                    <div 
                      style="font-weight: 600; margin-bottom: 0.5rem; color: #00bfa6; font-size: 1rem;"
                    >
                      Final Thoughts
                    </div>
                    <div style="font-size: 1.05rem; line-height: 1.7;">{{ item.conclusion.final_thoughts }}</div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div 
                  class="card h-100 border-0 rounded-3 shadow-sm transition" 
                  style="background-color: #ffffff; padding: 1.25rem;"
                >
                  <div>
                    <div 
                      style="font-weight: 600; margin-bottom: 0.5rem; color: #00bfa6; font-size: 1rem;"
                    >
                      Call to Action
                    </div>
                    <div style="font-size: 1.05rem; line-height: 1.7;">{{ item.conclusion.call_to_action }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- References Content -->
            <div v-if="item.references" class="row g-4">
              <div 
                v-for="(refs, key) in item.references" 
                :key="key" 
                class="col-12 col-md-6"
              >
                <div 
                  class="card h-100 border-0 rounded-3 shadow-sm transition" 
                  style="background-color: #ffffff; padding: 1.25rem;"
                >
                  <div>
                    <div 
                      style="font-weight: 600; margin-bottom: 0.75rem; color: #00bfa6; font-size: 1rem;"
                    >
                      {{ formatKey(key) }}
                    </div>
                    <ul 
                      style="margin-bottom: 0; padding-left: 1.5rem; line-height: 1.7;"
                    >
                      <li v-for="(ref, i) in refs" :key="i">{{ ref }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fallback for empty data -->
    <div 
      v-else 
      class="alert alert-warning text-center py-4" 
      style="background-color: #fefcbf; color: #744210; font-size: 1.1rem;"
    >
      No content available. Please check the data source.
    </div>
  </div>
</template>

<script>
import quranInfo from './quran_info.json';

export default {
  name: 'HistoryComponent',
  data() {
    return {
      quranInfo: quranInfo || {}
    };
  },
  computed: {
    // Combine sections, Conclusion, and References, excluding section 9 (index 8)
    accordionItems() {
      if (!this.quranInfo.sections || !Array.isArray(this.quranInfo.sections)) {
        return [];
      }
      // Filter out section 9 (index 8, 1-based numbering)
      const sections = this.quranInfo.sections.filter((_, index) => index !== 8);
      const items = [...sections];
      if (this.quranInfo.conclusion) {
        items.push({
          title: 'Conclusion',
          conclusion: this.quranInfo.conclusion
        });
      }
      if (this.quranInfo.references) {
        items.push({
          title: 'References',
          references: Object.fromEntries(
            Object.entries(this.quranInfo.references).filter(([key]) => key !== 'note')
          )
        });
      }
      return items;
    }
  },
  methods: {
    // Format keys for display (e.g., 'key_name' -> 'Key Name')
    formatKey(key) {
      return key
        ? key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        : '';
    },
    // Check if item is a regular section (not Conclusion or References)
    isRegularSection(item) {
      return !item.conclusion && !item.references;
    },
    // Safely get table columns
    getTableColumns(table) {
      return table && table[0] ? Object.keys(table[0]) : [];
    }
  }
};
</script>

<style scoped>
/* Enhanced hover and focus effects for interactivity */
.transition {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.transition:hover,
.transition:focus {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1) !important;
}

/* Focus state for accessibility */
.accordion-button:focus {
  box-shadow: 0 0 0 3px rgba(0, 191, 166, 0.3);
  outline: none;
}
</style>
```