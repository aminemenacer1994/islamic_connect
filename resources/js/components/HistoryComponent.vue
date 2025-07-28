<template>
  <div class="container py-5"
    style="font-family: 'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 1200px;">
    <!-- Header -->
    <header class="text-center mb-5">
      <h1 class="fw-bold display-4 mb-3" style="color: #2d3748; letter-spacing: -0.02rem;">
        Quran History
      </h1>
      <p class="lead mb-0"
        style="color: #4a5568; font-size: 1.15rem; line-height: 1.6; max-width: 800px; margin: 0 auto;">
        Explore the Quran’s journey—its revelation, memorization, and codification—as a unifying force for the global
        Muslim community.
      </p>
    </header>

    <!-- Open All and Close All Buttons -->
    <div class="text-end mb-3">
      <button v-if="!areAllAccordionsOpen" class="btn fw-semibold transition me-2" @click="openAllSections"
        style="background-color: #00bfa6; color: #ffffff; padding: 0.4rem 0.8rem; border-radius: 0.5rem; border: none; font-size: 0.85rem;">
        <i class="bi bi-plus-circle me-1" style="font-size: 0.9rem;"></i>Open All
      </button>
      <button v-if="areAnyAccordionsOpen" class="btn fw-semibold transition" @click="closeAllSections"
        style="background-color: #00bfa6; color: #ffffff; padding: 0.4rem 0.8rem; border-radius: 0.5rem; border: none; font-size: 0.85rem;">
        <i class="bi bi-x-circle me-1" style="font-size: 0.9rem;"></i>Close All
      </button>
    </div>

    <!-- Card Sections -->
    <div v-if="accordionItems.length" class="mb-5">
      <div v-for="(item, idx) in accordionItems" :key="item.title || idx" class="card mb-3 rounded-3 shadow-sm"
        style="background-color: #ffffff; border: 1px solid #e2e8f0;">
        <!-- Card Header -->
        <div class="card-header px-4 py-3 fw-semibold d-flex align-items-center transition" role="button"
          :aria-expanded="isOpen[idx]" :aria-controls="'section-content-' + idx" @click="toggleSection(idx)"
          @keydown.enter="toggleSection(idx)" @keydown.space.prevent="toggleSection(idx)">
          <span class="badge rounded-pill me-3 fw-bold"
            style="background-color: #00bfa6; color: #ffffff; border: 1px solid #00bfa6; font-size: 0.9rem; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center;">
            {{ idx + 1 }}
          </span>
          <span class="flex-grow-1">{{ item.title || 'Untitled Section' }}</span>
          <button class="btn fw-semibold transition me-2" @click.stop="increaseFontSize(idx)"
            style="background-color: #00bfa6; color: #ffffff; padding: 0.3rem 0.6rem; border-radius: 0.4rem; border: none; font-size: 0.75rem;">
            <i class="bi bi-zoom-in" style="font-size: 0.8rem;"></i>
          </button>
          <button class="btn fw-semibold transition me-2" @click.stop="decreaseFontSize(idx)"
            style="background-color: #00bfa6; color: #ffffff; padding: 0.3rem 0.6rem; border-radius: 0.4rem; border: none; font-size: 0.75rem;">
            <i class="bi bi-zoom-out" style="font-size: 0.8rem;"></i>
          </button>
          <i :class="isOpen[idx] ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" style="font-size: 1rem;"></i>
        </div>
        <!-- Card Content -->
        <div v-show="isOpen[idx]" :id="'section-content-' + idx" class="card-body px-4 py-4 rounded-bottom-3"
          :style="{ 'font-size': fontSizes[idx] + 'rem', 'background-color': '#ffffff', 'line-height': 1.7, 'color': '#4a5568' }">
          <!-- AI Summary Button and Summary -->
          <div class="mb-3">
            <button class="btn btn-sm btn-outline-dark" @click="summarizeEvent(idx)" :disabled="summaryLoading[idx]">
              <i class="bi" :class="summaryLoading[idx] ? 'bi-hourglass-split' : 'bi-robot'"></i>
              <span class="ms-1 ms-sm-2">{{ summaryLoading[idx] ? 'Generating...' : 'AI Summary' }}</span>
            </button>
            <div v-if="summaries[idx]" class="mt-2 p-3 rounded-3 position-relative" style="background-color: #f7fafc; border: 1px solid #e2e8f0;">
              <button class="btn btn-sm p-0 position-absolute top-0 end-0 m-2" @click="clearSummary(idx)"
                aria-label="Close summary" title="Close">
                <i class="bi bi-x" style="font-size: 1.2rem; color: #4a5568;"></i>
              </button>
              <strong>AI Summary:</strong> {{ summaries[idx] }}
            </div>
          </div>
          <!-- FAQ Content -->
          <div v-if="item.faq">
            <div v-for="(faqItem, faqIdx) in item.faq" :key="faqIdx" class="mb-3">
              <div style="font-weight: 600; color: #00bfa6; font-size: 1rem; margin-bottom: 0.5rem;">
                <i class="bi bi-question-circle" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>
                {{ faqItem.question }}
              </div>
              <div style="padding-left: 1.75rem;">{{ faqItem.answer }}</div>
            </div>
          </div>
          <!-- Details (for regular sections) -->
          <div v-if="isRegularSection(item)">
            <div class="row g-4">
              <template v-for="(value, key, index) in item.details">
                <div v-if="value && typeof value === 'string'" :key="`${key}-${index}`" class="col-12 col-md-6">
                  <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                    style="background-color: #f7fafc; padding: 1.25rem;">
                    <div>
                      <span style="font-weight: 600; color: #00bfa6; font-size: 1rem;">
                        <i class="bi bi-dot" style="margin-right: 0.25rem; font-size: 1.2rem;"></i>{{ formatKey(key) }}:
                      </span>
                      <div style="margin-top: 0.5rem;">{{ value }}</div>
                    </div>
                  </div>
                </div>
                <div v-else-if="value && Array.isArray(value)" class="col-12">
                  <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                    style="background-color: #f7fafc; padding: 1.25rem;">
                    <div>
                      <span style="font-weight: 600; color: #00bfa6; font-size: 1rem;">
                        <i class="bi bi-list-ul" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>{{ formatKey(key) }}:
                      </span>
                      <ul style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;">
                        <li v-for="(subItem, i) in value" :key="i">{{ subItem }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-else-if="value && typeof value === 'object'" class="col-12">
                  <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                    style="background-color: #f7fafc; padding: 1.25rem;">
                    <div>
                      <span style="font-weight: 600; color: #00bfa6; font-size: 1rem;">
                        <i class="bi bi-diagram-3" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>{{ formatKey(key) }}:
                      </span>
                      <ul style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;">
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
          <div v-if="item.table && isRegularSection(item)" class="mt-4">
            <div style="font-weight: 600; color: #00bfa6; font-size: 1rem; margin-bottom: 0.75rem;">
              <i class="bi bi-table" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>Comparative Table
            </div>
            <div class="table-responsive">
              <table class="table table-bordered align-middle mb-0"
                style="background-color: #ffffff; border-color: #e2e8f0;">
                <thead style="background-color: #f7fafc;">
                  <tr>
                    <th v-for="(col, i) in getTableColumns(item.table)" :key="i"
                      style="font-weight: 500; color: #00bfa6; font-size: 0.95rem; padding: 1rem;">
                      {{ formatKey(col) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in item.table" :key="i">
                    <td v-for="(val, k) in row" :key="k" style="padding: 1rem;">
                      {{ val }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Insights, Significance, Recommendations, Challenges (for regular sections) -->
          <div v-if="item.significance && isRegularSection(item)"
            class="alert mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
            style="background-color: #f7fafc; color: #2d3748;">
            <i class="bi bi-lightbulb" style="margin-right: 0.5rem; color: #00bfa6; font-size: 1.2rem;"></i>
            <strong>Significance:</strong> {{ item.significance }}
          </div>
          <div v-if="item.insights && isRegularSection(item)"
            class="alert alert-info mt-4 border-0 Rounded-3 shadow-sm py-3 px-4"
            style="background-color: #edfafa; border-color: #bee3e3; color: #2d3748;">
            <i class="bi bi-info-circle" style="margin-right: 0.5rem; color: #00bfa6; font-size: 1.2rem;"></i>
            <strong>Insights:</strong>
            <ul style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;">
              <li v-for="(insight, i) in item.insights" :key="i">{{ insight }}</li>
            </ul>
          </div>
          <div v-if="item.details && item.details.recommendations && isRegularSection(item)"
            class="alert alert-secondary mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
            style="background-color: #f7fafc; border-color: #e2e8f0; color: #2d3748;">
            <i class="bi bi-star" style="margin-right: 0.5rem; color: #00bfa6; font-size: 1.2rem;"></i>
            <strong>Recommendations:</strong>
            <ul style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;">
              <li v-for="(rec, i) in item.details.recommendations" :key="i">
                <span style="font-weight: 600;">{{ formatKey(rec.name) }}:</span> {{ rec.description }}
              </li>
            </ul>
          </div>
          <div v-if="item.details && item.details.challenges && isRegularSection(item)"
            class="alert alert-warning mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
            style="background-color: #fefcbf; border-color: #fefcbf; color: #744210;">
            <i class="bi bi-exclamation-triangle" style="margin-right: 0.5rem; color: #00bfa6; font-size: 1.2rem;"></i>
            <strong>Challenges:</strong>
            <ul style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;">
              <li v-for="(ch, i) in item.details.challenges" :key="i">{{ ch }}</li>
            </ul>
          </div>
          <!-- Conclusion Content -->
          <div v-if="item.conclusion" class="row g-4">
            <div class="col-12 col-md-4">
              <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                style="background-color: #ffffff; padding: 1.25rem;">
                <div>
                  <div style="font-weight: 600; margin-bottom: 0.5rem; color: #00bfa6; font-size: 1rem;">
                    Summary
                  </div>
                  <div style="line-height: 1.7;">{{ item.conclusion.summary }}</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                style="background-color: #ffffff; padding: 1.25rem;">
                <div>
                  <div style="font-weight: 600; margin-bottom: 0.5rem; color: #00bfa6; font-size: 1rem;">
                    Final Thoughts
                  </div>
                  <div style="line-height: 1.7;">{{ item.conclusion.final_thoughts }}</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                style="background-color: #ffffff; padding: 1.25rem;">
                <div>
                  <div style="font-weight: 600; margin-bottom: 0.5rem; color: #00bfa6; font-size: 1rem;">
                    Call to Action
                  </div>
                  <div style="line-height: 1.7;">{{ item.conclusion.call_to_action }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- References Content -->
          <div v-if="item.references" class="row g-4">
            <div v-for="(refs, key) in item.references" :key="key" class="col-12 col-md-6">
              <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                style="background-color: #ffffff; padding: 1.25rem;">
                <div>
                  <div style="font-weight: 600; margin-bottom: 0.75rem; color: #00bfa6; font-size: 1rem;">
                    {{ formatKey(key) }}
                  </div>
                  <ul style="margin-bottom: 0; padding-left: 1.5rem; line-height: 1.7;">
                    <li v-for="(ref, i) in refs" :key="i">{{ ref }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fallback for empty data -->
    <div v-else class="alert alert-warning text-center py-4"
      style="background-color: #fefcbf; color: #744210; font-size: 1.1rem;">
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
      quranInfo: quranInfo || {}, // Fallback to empty object if import fails
      isOpen: [], // Tracks open state of each section
      fontSizes: [], // Tracks font size of each section
      summaryLoading: [], // Tracks loading state for each section's summary
      summaries: [], // Stores generated summary for each section
      faq: [
        {
          question: 'When was the Quran first revealed?',
          answer: 'The Quran was first revealed to Prophet Muhammad in 610 CE during the month of Ramadan in the Cave of Hira.'
        },
        {
          question: 'Who compiled the Quran into a single book?',
          answer: 'The Quran was compiled into a single book during the caliphate of Abu Bakr (632-634 CE), with the final standardization under Uthman ibn Affan (644-656 CE).'
        },
        {
          question: 'How was the Quran preserved before written compilation?',
          answer: 'The Quran was primarily preserved through memorization by the Prophet’s companions, known as Huffaz, alongside partial written records on various materials.'
        },
        {
          question: 'What is the significance of the Uthmanic Codex?',
          answer: 'The Uthmanic Codex standardized the Quranic text, ensuring uniformity across the Muslim world, and serves as the basis for all modern Quranic manuscripts.'
        },
        {
          question: 'Why is the Quran considered a miracle?',
          answer: 'The Quran is considered a miracle due to its linguistic excellence, inimitable style, and profound guidance, which Muslims believe could not have been produced by human effort alone.'
        },
        {
          question: 'How many verses are in the Quran?',
          answer: 'The Quran contains 6,236 verses (Ayat), though the exact count may vary slightly depending on different methods of verse numbering.'
        },
        {
          question: 'What is the role of the Quranic recitations (Qira\'at)?',
          answer: 'The Quranic recitations (Qira\'at) are authentic variations in pronunciation and recitation of the Quran, approved by the Prophet Muhammad, which enrich its oral tradition while maintaining the text’s integrity.'
        },
        {
          question: 'How did the Quran influence early Islamic scholarship?',
          answer: 'The Quran served as the foundation for early Islamic scholarship, inspiring disciplines like Tafsir (exegesis), Hadith collection, and Arabic linguistics to preserve and interpret its teachings.'
        }
      ]
    };
  },
  computed: {
    // Combine sections, Conclusion, References, and FAQ, excluding section 9 (index 8)
    accordionItems() {
      // Return empty array if quranInfo or sections is undefined
      if (!this.quranInfo || !this.quranInfo.sections || !Array.isArray(this.quranInfo.sections)) {
        return [];
      }
      // Filter out undefined or invalid sections and exclude index 8
      const sections = this.quranInfo.sections
        .map((section, index) => ({ section, index }))
        .filter(({ section, index }) => section && typeof section === 'object' && index !== 8)
        .map(({ section }) => section);
      const items = [...sections];
      if (this.quranInfo.conclusion && typeof this.quranInfo.conclusion === 'object') {
        items.push({
          title: 'Conclusion',
          conclusion: this.quranInfo.conclusion
        });
      }
      if (this.quranInfo.references && typeof this.quranInfo.references === 'object') {
        items.push({
          title: 'References',
          references: Object.fromEntries(
            Object.entries(this.quranInfo.references || {}).filter(([key]) => key !== 'note')
          )
        });
      }
      // Add FAQ section
      if (this.faq && Array.isArray(this.faq) && this.faq.length) {
        items.push({
          title: 'FAQ',
          faq: this.faq
        });
      }
      return items;
    },
    // Check if any sections are open
    areAnyAccordionsOpen() {
      return this.isOpen.some(Boolean);
    },
    // Check if all sections are open
    areAllAccordionsOpen() {
      return this.isOpen.every(Boolean);
    }
  },
  mounted() {
    // Initialize isOpen, fontSizes, summaryLoading, and summaries only if accordionItems exists
    if (this.accordionItems.length) {
      this.isOpen = this.accordionItems.map((_, idx) => idx === 0);
      this.fontSizes = this.accordionItems.map(() => 1.05);
      this.summaryLoading = this.accordionItems.map(() => false);
      this.summaries = this.accordionItems.map(() => null);
    } else {
      this.isOpen = [];
      this.fontSizes = [];
      this.summaryLoading = [];
      this.summaries = [];
    }
  },
  methods: {
    // Open all sections
    openAllSections() {
      this.isOpen = this.accordionItems.map(() => true);
    },
    // Close all sections
    closeAllSections() {
      this.isOpen = this.accordionItems.map(() => false);
    },
    // Toggle section open state
    toggleSection(idx) {
      this.isOpen[idx] = !this.isOpen[idx];
    },
    // Increase font size for a specific section
    increaseFontSize(idx) {
      if (this.fontSizes[idx] < 1.3) {
        this.fontSizes[idx] = Math.min(1.3, this.fontSizes[idx] + 0.05);
      }
    },
    // Decrease font size for a specific section
    decreaseFontSize(idx) {
      if (this.fontSizes[idx] > 0.8) {
        this.fontSizes[idx] = Math.max(0.8, this.fontSizes[idx] - 0.05);
      }
    },
    // Placeholder for generating AI summary
    async summarizeEvent(idx) {
      this.summaryLoading[idx] = true;
      try {
        // Simulate async AI summary generation (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1000));
        const item = this.accordionItems[idx];
        const detailsKeys = Object.keys(item.details || {});
        const summaryText = item.faq
          ? `Summary of FAQ: This section addresses common questions about the Quran's history, such as its revelation, compilation, and significance.`
          : item.conclusion
          ? `Summary of Conclusion: This section summarizes the Quran's historical journey, final thoughts, and a call to action.`
          : item.references
          ? `Summary of References: This section lists sources used to document the Quran's history.`
          : `Summary of ${item.title || 'Section'}: This section covers key aspects of the Quran's history${detailsKeys.length ? `, including ${detailsKeys.map(key => this.formatKey(key)).join(', ')}.` : '.'}`;
        this.summaries[idx] = summaryText;
      } catch (error) {
        console.error('Error generating summary:', error);
        this.summaries[idx] = 'Failed to generate summary.';
      } finally {
        this.summaryLoading[idx] = false;
      }
    },
    // Clear summary for a specific section
    clearSummary(idx) {
      this.summaries[idx] = null;
    },
    // Format keys for display (e.g., 'key_name' -> 'key name')
    formatKey(key) {
      return key ? key.replace(/_/g, ' ') : '';
    },
    // Check if item is a regular section (not Conclusion, References, or FAQ)
    isRegularSection(item) {
      return item && typeof item === 'object' && !item.conclusion && !item.references && !item.faq;
    },
    // Safely get table columns
    getTableColumns(table) {
      return table && Array.isArray(table) && table[0] ? Object.keys(table[0]) : [];
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
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

/* Focus state for accessibility */
.card-header:focus,
.btn:focus {
  box-shadow: 0 0 0 3px rgba(0, 191, 166, 0.3);
  outline: none;
}

/* Button hover effect */
.btn:hover:not(.btn-outline-dark) {
  background-color: #009688;
}

/* Button hover effect for outline-dark */
.btn-outline-dark:hover {
  background-color: #2d3748;
  color: #ffffff;
}

/* Close button hover effect */
.btn-sm:hover .bi-x {
  color: #2d3748;
}

/* Card header cursor */
.card-header {
  user-select: none;
}
</style>