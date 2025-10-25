<template>
  <div class="container py-5" role="main" aria-label="Quran History"
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
        aria-label="Open all sections"
        style="background-color: #006b5f; color: #ffffff; padding: 0.4rem 0.8rem; border-radius: 0.5rem; border: none; font-size: 0.85rem;">
        <i class="bi bi-plus-circle me-1" style="font-size: 0.9rem;"></i>Open All
      </button>
      <button v-if="areAnyAccordionsOpen" class="btn fw-semibold transition" @click="closeAllSections"
        aria-label="Close all sections"
        style="background-color: #006b5f; color: #ffffff; padding: 0.4rem 0.8rem; border-radius: 0.5rem; border: none; font-size: 0.85rem;">
        <i class="bi bi-x-circle me-1" style="font-size: 0.9rem;"></i>Close All
      </button>
    </div>

    <!-- Live region for announcements -->
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">{{ screenReaderMessage }}</div>

    <!-- Card Sections -->
    <div v-if="accordionItems.length" class="mb-5" role="list" aria-label="History sections list">
      <div v-for="(item, idx) in accordionItems" :key="item.title || idx" class="card mb-3 rounded-3 shadow-sm" role="listitem"
        style="background-color: #ffffff; border: 1px solid #e2e8f0;">
        <!-- Card Header -->
        <div class="card-header px-4 py-3 fw-semibold d-flex align-items-center transition" role="button"
          :id="'section-header-' + idx" :aria-expanded="isOpen[idx]" :aria-controls="'section-content-' + idx"
          :aria-label="`${item.title || 'Untitled Section'} (${wordCounts[idx] || 0} words ${isOpen[idx] ? 'expanded' : 'collapsed'})`"
          @click="toggleSection(idx)" @keydown.enter="toggleSection(idx)" @keydown.space.prevent="toggleSection(idx)"
          @keydown.up.prevent="focusPreviousSection(idx)" @keydown.down.prevent="focusNextSection(idx)" @keydown="onHeaderKeydown(idx, $event)"
          ref="accordionHeaders" tabindex="0">
          <span class="badge rounded-pill me-3 fw-bold"
            style="background-color: #006b5f; color: #ffffff; border: 1px solid #006b5f; font-size: 0.9rem; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center;">
            {{ idx + 1 }}
          </span>
          <span class="flex-grow-1">{{ item.title || 'Untitled Section' }}</span>
          <span class="me-3 text-muted" style="font-size: 0.85rem;">
            {{ wordCounts[idx] || 0 }} words
          </span>
          <i :class="isOpen[idx] ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" style="font-size: 1rem;"></i>
        </div>
        <!-- Card Content -->
        <div v-if="isOpen[idx]" :id="'section-content-' + idx" class="card-body px-4 py-4 rounded-bottom-3" :aria-labelledby="'section-header-' + idx"
          :style="{ 'font-size': fontSizes[idx] + 'rem', 'background-color': '#ffffff', 'line-height': 1.7, 'color': '#4a5568' }">
          <!-- AI Summary, Font Size, Print, Export to PDF, and Share via WhatsApp Buttons -->
          <div class="mb-3">
            <button class="btn btn-sm btn-outline-dark fw-semibold transition ms-2 mb-2" @click="summarizeEvent(idx)" :disabled="summaryLoading[idx]"
              aria-label="Generate AI summary">
              <i class="bi" :class="summaryLoading[idx] ? 'bi-hourglass-split' : 'bi-robot'"></i>
              <span class="ms-1 ms-sm-2">{{ summaryLoading[idx] ? 'Generating...' : 'AI Summary' }}</span>
            </button>
            
            <button class="btn btn-sm btn-outline-dark fw-semibold transition ms-2 mb-2" @click.stop="increaseFontSize(idx)"
              @keydown.enter.stop="increaseFontSize(idx)" @keydown.space.prevent.stop="increaseFontSize(idx)"
              aria-label="Increase font size" title="Increase font size">
              <i class="bi bi-zoom-in mr-2" style="font-size: 0.8rem;"></i> Increase font size
            </button>
            <button class="btn btn-sm btn-outline-dark fw-semibold transition mb-2 ms-2" @click.stop="decreaseFontSize(idx)"
              @keydown.enter.stop="decreaseFontSize(idx)" @keydown.space.prevent.stop="decreaseFontSize(idx)"
              aria-label="Decrease font size" title="Decrease font size">
              <i class="bi bi-zoom-out mr-2" style="font-size: 0.8rem;"></i>Decrease font size
            </button>
            <button class="btn btn-sm btn-outline-dark fw-semibold transition mb-2 ms-2" @click.stop="printSection(idx)"
              @keydown.enter.stop="printSection(idx)" @keydown.space.prevent.stop="printSection(idx)"
              aria-label="Print section" title="Print section">
              <i class="bi bi-printer mr-2" style="font-size: 0.8rem;"></i>Print
            </button>
            <button class="btn btn-sm btn-outline-dark fw-semibold transition mb-2 ms-2" @click.stop="generatePDF(idx)"
              @keydown.enter.stop="generatePDF(idx)" @keydown.space.prevent.stop="generatePDF(idx)"
              aria-label="Export to PDF" title="Export to PDF">
              <i class="bi bi-file-earmark-pdf mr-2" style="font-size: 0.8rem;"></i>Export to PDF
            </button>
            <div v-if="summaries[idx]" class="mt-2 p-3 rounded-3 position-relative" style="background-color: #f7fafc; border: 2px solid rgb(103, 153, 103);">
              <button class="btn btn-sm p-0 position-absolute top-0 end-0 m-2" @click="clearSummary(idx)"
                @keydown.enter="clearSummary(idx)" @keydown.space.prevent="clearSummary(idx)"
                aria-label="Close summary" title="Close">
                <i class="bi bi-x" style="font-size: 1.2rem; color: #4a5568;"></i>
              </button>
              <strong>AI Summary:</strong> {{ summaries[idx] }}
            </div>
          </div>
          <!-- FAQ Content -->
          <div v-if="item.faq">
            <div v-for="(faqItem, faqIdx) in item.faq.slice(0, faqVisibleCount[idx] || item.faq.length)" :key="faqIdx" class="mb-3">
              <div style="font-weight: 600; color: #006b5f; font-size: 1rem; margin-bottom: 0.5rem;">
                <i class="bi bi-question-circle" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>
                {{ faqItem.question }}
              </div>
              <div style="padding-left: 1.75rem;">{{ faqItem.answer }}</div>
            </div>
            <div v-if="(faqVisibleCount[idx] || 0) < item.faq.length" class="text-center mt-2">
              <button class="btn btn-sm btn-outline-dark fw-semibold transition" @click.stop="showMoreFaq(idx)">
                Show more
              </button>
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
                      <span style="font-weight: 600; color: #006b5f; font-size: 1rem;">
                        <i class="bi bi-dot" style="margin-right: 0.25rem; font-size: 1.2rem;"></i>{{ formatKey(key) }}:
                      </span>
                      <div style="margin-top: 0.5rem;">{{ value }}</div>
                    </div>
                  </div>
                </div>
                <div v-else-if="value && Array.isArray(value)"  class="col-12">
                  <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                    style="background-color: #f7fafc; padding: 1.25rem;">
                    <div>
                      <span style="font-weight: 600; color: #006b5f; font-size: 1rem;">
                        <i class="bi bi-list-ul" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>{{ formatKey(key) }}:
                      </span>
                      <ul style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;">
                        <li v-for="(subItem, i) in value" :key="i">{{ subItem }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-else-if="value && typeof value === 'object'"  class="col-12">
                  <div class="card h-100 border-0 rounded-3 shadow-sm transition"
                    style="background-color: #f7fafc; padding: 1.25rem;">
                    <div>
                      <span style="font-weight: 600; color: #006b5f; font-size: 1rem;">
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
            <div style="font-weight: 600; color: #006b5f; font-size: 1rem; margin-bottom: 0.75rem;">
              <i class="bi bi-table" style="margin-right: 0.5rem; font-size: 1.2rem;"></i>Comparative Table
            </div>
            <div class="table-responsive">
              <table class="table table-bordered align-middle mb-0"
                style="background-color: #ffffff; border-color: #e2e8f0;">
                <thead style="background-color: #f7fafc;">
                  <tr>
                    <th v-for="(col, i) in getTableColumns(item.table)" :key="i"
                      style="font-weight: 500; color: #006b5f; font-size: 0.95rem; padding: 1rem;">
                      {{ formatKey(col) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in item.table.slice(0, tableVisibleCount[idx] || item.table.length)" :key="i">
                    <td v-for="(val, k) in row" :key="k" style="padding: 1rem;">
                      {{ val }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="(tableVisibleCount[idx] || 0) < item.table.length" class="text-center mt-2">
                <button class="btn btn-sm btn-outline-dark fw-semibold transition" @click.stop="showMoreTable(idx)">
                  Show more rows
                </button>
              </div>
            </div>
          </div>
          <!-- Insights, Significance, Recommendations, Challenges (for regular sections) -->
          <div v-if="item.significance && isRegularSection(item)"
            class="alert mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
            style="background-color: #f7fafc; color: #2d3748;">
            <i class="bi bi-lightbulb" style="margin-right: 0.5rem; color: #006b5f; font-size: 1.2rem;"></i>
            <strong>Significance:</strong> {{ item.significance }}
          </div>
          <div v-if="item.insights && isRegularSection(item)"
            class="alert alert-info mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
            style="background-color: #edfafa; border-color: #bee3e3; color: #2d3748;">
            <i class="bi bi-info-circle" style="margin-right: 0.5rem; color: #006b5f; font-size: 1.2rem;"></i>
            <strong>Insights:</strong>
            <ul style="margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;">
              <li v-for="(insight, i) in item.insights" :key="i">{{ insight }}</li>
            </ul>
          </div>
          <div v-if="item.details && item.details.recommendations && isRegularSection(item)"
            class="alert alert-secondary mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
            style="background-color: #f7fafc; border-color: #e2e8f0; color: #2d3748;">
            <i class="bi bi-star" style="margin-right: 0.5rem; color: #006b5f; font-size: 1.2rem;"></i>
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
            <i class="bi bi-exclamation-triangle" style="margin-right: 0.5rem; color: #006b5f; font-size: 1.2rem;"></i>
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
                  <div style="font-weight: 600; margin-bottom: 0.5rem; color: #006b5f; font-size: 1rem;">
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
                  <div style="font-weight: 600; margin-bottom: 0.5rem; color: #006b5f; font-size: 1rem;">
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
                  <div style="font-weight: 600; margin-bottom: 0.5rem; color: #006b5f; font-size: 1rem;">
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
                  <div style="font-weight: 600; margin-bottom: 0.75rem; color: #006b5f; font-size: 1rem;">
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
    <!-- Floating Action Button for Scroll to Top -->
    <button v-show="showScrollToTop" class="btn transition shadow-sm" @click="scrollToTop"
      @keydown.enter="scrollToTop" @keydown.space.prevent="scrollToTop"
      aria-label="Scroll to top" title="Scroll to top"
      style="position: fixed; bottom: 20px; right: 20px; background-color: #006b5f; color: #ffffff; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <i class="bi bi-arrow-up" style="font-size: 1.5rem;"></i>
    </button>
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
      showScrollToTop: false, // Tracks FAB visibility
      wordCounts: [], // Tracks word count for each section
      readTimes: [], // Tracks read time for each section
      screenReaderMessage: '',
      // Performance helpers
      scrollTicking: false,
      formatKeyCache: Object.create(null),
      // Virtualization and debounce state
      faqVisibleCount: [],
      tableVisibleCount: [],
      faqPageSize: 5,
      tablePageSize: 20,
      summarizeTimers: [],
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
      if (!this.quranInfo || !this.quranInfo.sections || !Array.isArray(this.quranInfo.sections)) {
        return [];
      }
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
      if (this.faq && Array.isArray(this.faq) && this.faq.length) {
        items.push({
          title: 'FAQ',
          faq: this.faq
        });
      }
      return items;
    },
    areAnyAccordionsOpen() {
      return this.isOpen.some(Boolean);
    },
    areAllAccordionsOpen() {
      return this.isOpen.every(Boolean);
    }
  },
  mounted() {
    if (this.accordionItems.length) {
      this.isOpen = this.accordionItems.map((_, idx) => idx === 0);
      this.fontSizes = this.accordionItems.map(() => 1.05);
      this.summaryLoading = this.accordionItems.map(() => false);
      this.summaries = this.accordionItems.map(() => null);
      // Initialize virtualization counters per section
      this.faqVisibleCount = this.accordionItems.map((item) => item.faq ? this.faqPageSize : 0);
      this.tableVisibleCount = this.accordionItems.map((item) => (item.table && this.isRegularSection(item)) ? this.tablePageSize : 0);
      // Single-pass stats computation
      const stats = this.accordionItems.map(item => this.computeWordCountAndReadTime(item));
      this.wordCounts = stats.map(s => s.wordCount);
      this.readTimes = stats.map(s => s.readTime);
    } else {
      this.isOpen = [];
      this.fontSizes = [];
      this.summaryLoading = [];
      this.summaries = [];
      this.wordCounts = [];
      this.readTimes = [];
    }
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    onHeaderKeydown(idx, e) {
      if (!e || !e.key) return;
      if (e.key === 'Home') {
        e.preventDefault();
        const first = this.$refs.accordionHeaders?.[0];
        first && first.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        const last = this.$refs.accordionHeaders?.[this.accordionItems.length - 1];
        last && last.focus();
      }
    },
    openAllSections() {
      this.isOpen = this.accordionItems.map(() => true);
    },
    closeAllSections() {
      this.isOpen = this.accordionItems.map(() => false);
    },
    toggleSection(idx) {
      this.isOpen[idx] = !this.isOpen[idx];
      const item = this.accordionItems[idx];
      const title = (item && item.title) || `Section ${idx + 1}`;
      this.screenReaderMessage = `${title} ${this.isOpen[idx] ? 'expanded' : 'collapsed'}.`;
      if (this.isOpen[idx]) {
        this.$nextTick(() => {
          const firstButton = this.$el.querySelector(`#section-content-${idx} .btn:first-child`);
          if (firstButton) firstButton.focus();
        });
      }
    },
    focusPreviousSection(idx) {
      const prevIdx = idx === 0 ? this.accordionItems.length - 1 : idx - 1;
      const prevHeader = this.$refs.accordionHeaders[prevIdx];
      if (prevHeader) prevHeader.focus();
    },
    focusNextSection(idx) {
      const nextIdx = idx === this.accordionItems.length - 1 ? 0 : idx + 1;
      const nextHeader = this.$refs.accordionHeaders[nextIdx];
      if (nextHeader) nextHeader.focus();
    },
    increaseFontSize(idx) {
      if (this.fontSizes[idx] < 1.3) {
        this.fontSizes[idx] = Math.min(1.3, this.fontSizes[idx] + 0.05);
      }
    },
    decreaseFontSize(idx) {
      if (this.fontSizes[idx] > 0.8) {
        this.fontSizes[idx] = Math.max(0.8, this.fontSizes[idx] - 0.05);
      }
    },
    summarizeEvent(idx) {
      if (this.summarizeTimers[idx]) clearTimeout(this.summarizeTimers[idx]);
      this.summarizeTimers[idx] = setTimeout(() => this._doSummarize(idx), 400);
    },
    async _doSummarize(idx) {
      if (this.summaryLoading[idx]) return;
      this.summaryLoading[idx] = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const item = this.accordionItems[idx];
        this.summaries[idx] = this.buildHeuristicSummary(item);
      } catch (error) {
        console.error('Error generating summary:', error);
        this.summaries[idx] = 'Failed to generate summary.';
      } finally {
        this.summaryLoading[idx] = false;
      }
    },
    buildHeuristicSummary(item) {
      const pieces = [];

      const pushText = (t) => {
        if (!t) return;
        const s = String(t).trim();
        if (s) pieces.push(s);
      };

      if (item.faq) {
        const qs = item.faq.map(f => f.question).filter(Boolean);
        pushText('FAQ overview: common questions about revelation, preservation, and compilation.');
        if (qs.length) pushText(`Top questions: ${qs.slice(0, 3).join('; ')}${qs.length > 3 ? '…' : ''}`);
      } else if (item.conclusion) {
        pushText(item.conclusion.summary || 'Summary of the Quran’s historical journey.');
        if (item.conclusion.final_thoughts) pushText(`Final thoughts: ${item.conclusion.final_thoughts}`);
        if (item.conclusion.call_to_action) pushText(`Call to action: ${item.conclusion.call_to_action}`);
      } else if (item.references) {
        const groups = Object.entries(item.references || {});
        pushText(`References overview: ${groups.length} categories of sources.`);
        const hints = groups.slice(0, 2).map(([k, v]) => `${this.formatKey(k)} (${(v || []).length})`);
        if (hints.length) pushText(`Notable groups: ${hints.join('; ')}`);
      } else if (this.isRegularSection(item)) {
        const title = item.title || 'Section';
        const stats = this.computeWordCountAndReadTime(item);
        pushText(`${title}: key historical aspects in ~${stats.wordCount} words (~${stats.readTime} min read).`);
        if (item.significance) pushText(`Significance: ${item.significance}`);
        if (Array.isArray(item.insights) && item.insights.length) {
          pushText(`Insights: ${item.insights.slice(0, 3).join('; ')}${item.insights.length > 3 ? '…' : ''}`);
        }
        const details = item.details || {};
        const detailSnippets = [];
        for (const [key, value] of Object.entries(details)) {
          const label = this.formatKey(key);
          if (typeof value === 'string') {
            detailSnippets.push(`${label}: ${value.split(/(?<=[.!?])\s+/)[0]}`);
          } else if (Array.isArray(value)) {
            if (key === 'chronology' || key === 'events') {
              detailSnippets.push(`${label}: ${value.slice(0, 3).join(' → ')}${value.length > 3 ? '…' : ''}`);
            } else {
              detailSnippets.push(`${label}: ${value.slice(0, 3).join('; ')}${value.length > 3 ? '…' : ''}`);
            }
          } else if (value && typeof value === 'object') {
            if (key === 'recommendations') {
              const names = value.map(r => this.formatKey(r.name)).filter(Boolean);
              if (names.length) detailSnippets.push(`Recommendations: ${names.slice(0, 3).join('; ')}${names.length > 3 ? '…' : ''}`);
            } else if (key === 'challenges') {
              detailSnippets.push(`Challenges: ${value.slice(0, 3).join('; ')}${value.length > 3 ? '…' : ''}`);
            } else {
              const pairs = Object.entries(value).slice(0, 3).map(([k, v]) => `${this.formatKey(k)}: ${String(v).split(/(?<=[.!?])\s+/)[0]}`);
              if (pairs.length) detailSnippets.push(`${label}: ${pairs.join('; ')}`);
            }
          }
        }
        if (detailSnippets.length) pushText(detailSnippets.join(' • '));
        if (item.table && Array.isArray(item.table) && item.table.length) {
          const cols = this.getTableColumns(item.table);
          pushText(`Includes comparative table: ${item.table.length} rows × ${cols.length} columns.`);
        }
      }

      // Compose without truncation
      let text = pieces.join(' ');
      text = text.replace(/\s+/g, ' ').trim();
      return text || 'Summary unavailable.';
    },
    clearSummary(idx) {
      this.summaries[idx] = null;
    },
    formatKey(key) {
      if (!key) return '';
      const cached = this.formatKeyCache[key];
      if (cached) return cached;
      const lowercaseWords = ['and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'by'];
      const formatted = key.replace(/_/g, ' ')
        .split(' ')
        .map((word, index) => {
          if (index === 0 || !lowercaseWords.includes(word.toLowerCase())) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }
          return word.toLowerCase();
        })
        .join(' ');
      this.formatKeyCache[key] = formatted;
      return formatted;
    },
    isRegularSection(item) {
      return item && typeof item === 'object' && !item.conclusion && !item.references && !item.faq;
    },
    getTableColumns(table) {
      return table && Array.isArray(table) && table[0] ? Object.keys(table[0]) : [];
    },
    handleScroll() {
      if (this.scrollTicking) return;
      this.scrollTicking = true;
      window.requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
        this.showScrollToTop = scrollPercent > 5;
        this.scrollTicking = false;
      });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    computeWordCountAndReadTime(item) {
      let text = '';
      if (item.faq) {
        text += item.faq.map(faq => `${faq.question} ${faq.answer}`).join(' ');
      } else if (item.conclusion) {
        text += `${item.conclusion.summary || ''} ${item.conclusion.final_thoughts || ''} ${item.conclusion.call_to_action || ''}`;
      } else if (item.references) {
        text += Object.values(item.references)
          .flat()
          .join(' ');
      } else if (this.isRegularSection(item)) {
        const details = item.details || {};
        for (const [key, value] of Object.entries(details)) {
          if (typeof value === 'string') {
            text += `${value} `;
          } else if (Array.isArray(value)) {
            text += value.join(' ') + ' ';
          } else if (typeof value === 'object' && value) {
            if (key === 'recommendations') {
              text += value.map(rec => `${rec.name} ${rec.description}`).join(' ') + ' ';
            } else if (key === 'challenges') {
              text += value.join(' ') + ' ';
            } else {
              text += Object.values(value).join(' ') + ' ';
            }
          }
        }
        if (item.significance) text += `${item.significance} `;
        if (item.insights) text += item.insights.join(' ') + ' ';
        if (item.table) {
          text += item.table
            .map(row => Object.values(row).join(' '))
            .join(' ') + ' ';
        }
      }
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      const readTime = wordCount > 0 ? Math.round(wordCount / 200) || '<1' : '<1';
      return { wordCount, readTime };
    },
    printSection(idx) {
      const item = this.accordionItems[idx];
      const sectionContent = this.$el.querySelector(`#section-content-${idx}`);
      if (!sectionContent) return;

      const printContainer = document.createElement('div');
      printContainer.style.fontFamily = 'Inter, Roboto, sans-serif';

      const title = document.createElement('h2');
      title.textContent = item.title || 'Untitled Section';
      title.style.color = '#2d3748';
      title.style.fontSize = '1.5rem';
      title.style.marginBottom = '1rem';
      printContainer.appendChild(title);

      const contentClone = sectionContent.cloneNode(true);
      const buttons = contentClone.querySelectorAll('.btn');
      buttons.forEach(button => button.remove());
      contentClone.style.fontSize = `${this.fontSizes[idx]}rem`;
      printContainer.appendChild(contentClone);

      const style = document.createElement('style');
      style.textContent = `
        @media print {
          body > *:not(#print-section) { display: none; }
          #print-section { display: block; }
          .card-body { background-color: #ffffff; }
          .alert { border: 1px solid #e2e8f0; }
          table { border-collapse: collapse; }
          th, td { border: 1px solid #e2e8f0; padding: 0.5rem; }
        }
      `;
      printContainer.id = 'print-section';
      document.body.appendChild(style);
      document.body.appendChild(printContainer);

      window.print();

      document.body.removeChild(printContainer);
      document.body.removeChild(style);
    },
    async generatePDF(idx) {
      const jsPDF = await this.ensureJsPdf();
      if (!jsPDF) return;

      const item = this.accordionItems[idx];
      const title = item.title || 'Untitled Section';
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });

      const marginLeft = 40;
      let y = 40;
      const lineHeight = 20;
      const pageHeight = doc.internal.pageSize.height;
      const maxWidth = doc.internal.pageSize.width - 2 * marginLeft;

      const addText = (text, size, bold = false, color = [0, 0, 0]) => {
        doc.setFontSize(size);
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach(line => {
          if (y + lineHeight > pageHeight - 40) {
            doc.addPage();
            y = 40;
          }
          doc.text(line, marginLeft, y);
          y += lineHeight;
        });
        return y;
      };

      y = addText(title, 16, true, [45, 55, 72]);
      y += 10;

      if (item.faq) {
        y = addText('Frequently Asked Questions', 14, true, [0, 191, 166]);
        item.faq.forEach(faq => {
          y = addText(faq.question, 12, true);
          y = addText(faq.answer, 12 * this.fontSizes[idx], false, [74, 85, 104]);
          y += 10;
        });
      } else if (item.conclusion) {
        y = addText('Summary', 14, true, [0, 191, 166]);
        y = addText(item.conclusion.summary || '', 12 * this.fontSizes[idx], false, [74, 85, 104]);
        y += 10;
        y = addText('Final Thoughts', 14, true, [0, 191, 166]);
        y = addText(item.conclusion.final_thoughts || '', 12 * this.fontSizes[idx], false, [74, 85, 104]);
        y += 10;
        y = addText('Call to Action', 14, true, [0, 191, 166]);
        y = addText(item.conclusion.call_to_action || '', 12 * this.fontSizes[idx], false, [74, 85, 104]);
      } else if (item.references) {
        Object.entries(item.references).forEach(([key, refs]) => {
          y = addText(this.formatKey(key), 14, true, [0, 191, 166]);
          refs.forEach(ref => {
            y = addText(`• ${ref}`, 12 * this.fontSizes[idx], false, [74, 85, 104]);
          });
          y += 10;
        });
      } else if (this.isRegularSection(item)) {
        const details = item.details || {};
        for (const [key, value] of Object.entries(details)) {
          y = addText(this.formatKey(key), 14, true, [0, 191, 166]);
          if (typeof value === 'string') {
            y = addText(value, 12 * this.fontSizes[idx], false, [74, 85, 104]);
          } else if (Array.isArray(value)) {
            value.forEach(subItem => {
              y = addText(`• ${subItem}`, 12 * this.fontSizes[idx], false, [74, 85, 104]);
            });
          } else if (typeof value === 'object') {
            if (key === 'recommendations') {
              value.forEach(rec => {
                y = addText(`${this.formatKey(rec.name)}: ${rec.description}`, 12 * this.fontSizes[idx], false, [74, 85, 104]);
              });
            } else if (key === 'challenges') {
              value.forEach(ch => {
                y = addText(`• ${ch}`, 12 * this.fontSizes[idx], false, [74, 85, 104]);
              });
            } else {
              Object.entries(value).forEach(([k, v]) => {
                y = addText(`${this.formatKey(k)}: ${v}`, 12 * this.fontSizes[idx], false, [74, 85, 104]);
              });
            }
          }
          y += 10;
        }
        if (item.significance) {
          y = addText('Significance', 14, true, [0, 191, 166]);
          y = addText(item.significance, 12 * this.fontSizes[idx], false, [74, 85, 104]);
          y += 10;
        }
        if (item.insights) {
          y = addText('Insights', 14, true, [0, 191, 166]);
          item.insights.forEach(insight => {
            y = addText(`• ${insight}`, 12 * this.fontSizes[idx], false, [74, 85, 104]);
          });
          y += 10;
        }
        if (item.table) {
          y = addText('Comparative Table', 14, true, [0, 191, 166]);
          const columns = this.getTableColumns(item.table);
          const tableData = item.table.map(row => columns.map(col => row[col] || ''));
          if (typeof doc.autoTable === 'function') {
            doc.autoTable({
            startY: y,
            head: [columns.map(col => this.formatKey(col))],
            body: tableData,
            theme: 'grid',
            styles: { fontSize: 10 * this.fontSizes[idx], textColor: [74, 85, 104] },
            headStyles: { fillColor: [247, 250, 252], textColor: [0, 191, 166], fontStyle: 'bold' },
            margin: { left: marginLeft, right: marginLeft }
            });
            y = doc.lastAutoTable.finalY + 10;
          }
        }
      }

      try {
        doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    },
    async ensureJsPdf() {
      try {
        if (window.jspdf && window.jspdf.jsPDF) {
          if (!window.jsPDF && window.jspdf.jsPDF) window.jsPDF = window.jspdf.jsPDF;
          await this.ensureJsPdfAutoTable();
          return window.jspdf.jsPDF;
        }
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        if (!(window.jspdf && window.jspdf.jsPDF)) {
          alert('Failed to load PDF library.');
          return null;
        }
        if (!window.jsPDF && window.jspdf.jsPDF) window.jsPDF = window.jspdf.jsPDF;
        await this.ensureJsPdfAutoTable();
        return window.jspdf.jsPDF;
      } catch (e) {
        console.error('Error loading jsPDF:', e);
        alert('PDF generation library not loaded. Please try again.');
        return null;
      }
    },
    async ensureJsPdfAutoTable() {
      if (window.jspdf && window.jspdf.jsPDF && window.jspdf.jsPDF.API && window.jspdf.jsPDF.API.autoTable) return;
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    showMoreFaq(idx) {
      const max = this.accordionItems[idx]?.faq?.length || 0;
      const current = this.faqVisibleCount[idx] || 0;
      if (this.$set) this.$set(this.faqVisibleCount, idx, Math.min(current + this.faqPageSize, max));
      else this.faqVisibleCount[idx] = Math.min(current + this.faqPageSize, max);
    },
    showMoreTable(idx) {
      const max = (this.accordionItems[idx]?.table || []).length;
      const current = this.tableVisibleCount[idx] || 0;
      if (this.$set) this.$set(this.tableVisibleCount, idx, Math.min(current + this.tablePageSize, max));
      else this.tableVisibleCount[idx] = Math.min(current + this.tablePageSize, max);
    },
    shareViaWhatsApp(idx) {
      const item = this.accordionItems[idx];
      const title = item.title || 'Untitled Section';
      let shareText = `Quran History: ${title}\n`;

      // Use AI summary if available, otherwise generate a brief summary
      if (this.summaries[idx]) {
        shareText += `${this.summaries[idx]}\n`;
      } else {
        if (item.faq) {
          const firstFaq = item.faq[0] || {};
          shareText += `FAQ: ${firstFaq.question || 'Questions about the Quran'} - ${firstFaq.answer || 'Learn more about the Quran’s history.'}\n`;
        } else if (item.conclusion) {
          shareText += `Conclusion: ${item.conclusion.summary || 'Summary of the Quran’s historical journey.'}\n`;
        } else if (item.references) {
          const firstRef = Object.values(item.references)[0]?.[0] || 'References for Quran history.';
          shareText += `References: ${firstRef}\n`;
        } else if (this.isRegularSection(item)) {
          const details = item.details || {};
          const firstDetail = Object.values(details)[0];
          if (typeof firstDetail === 'string') {
            shareText += `${this.formatKey(Object.keys(details)[0])}: ${firstDetail.substring(0, 100)}...\n`;
          } else if (Array.isArray(firstDetail)) {
            shareText += `${this.formatKey(Object.keys(details)[0])}: ${firstDetail[0] || 'Details about the Quran.'}\n`;
          } else if (typeof firstDetail === 'object') {
            const [key, value] = Object.entries(firstDetail)[0] || ['Details', 'Learn more.'];
            shareText += `${this.formatKey(Object.keys(details)[0])} - ${this.formatKey(key)}: ${value.substring(0, 100)}...\n`;
          }
        }
      }

      // Add a generic app URL or section anchor (adjust as needed)
      const appUrl = window.location.origin || 'https://example.com';
      const sectionAnchor = `#section-content-${idx}`;
      shareText += `Read more: ${appUrl}${sectionAnchor}`;

      // Truncate to ~4000 characters to stay within WhatsApp limits
      if (shareText.length > 4000) {
        shareText = shareText.substring(0, 3997) + '...';
      }

      // Encode and open WhatsApp
      const encodedText = encodeURIComponent(shareText);
      const whatsappUrl = `https://wa.me/?text=${encodedText}`;
      try {
        window.open(whatsappUrl, '_blank');
      } catch (error) {
        console.error('Error sharing via WhatsApp:', error);
        alert('Failed to share via WhatsApp. Please ensure WhatsApp is accessible.');
      }
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

/* FAB hover effect */
.btn:hover .bi-arrow-up {
  transform: scale(1.1);
}

/* Card header cursor */
.card-header {
  user-select: none;
}

/* Word count and read time styling */
.text-muted {
  color: #6b7280 !important;
}
</style>
