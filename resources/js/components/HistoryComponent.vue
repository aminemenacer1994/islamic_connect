<template>
  <div class="container py-4 history-ui" role="main" aria-label="Quran History">
    <!-- Header -->

    <div class="row justify-content-center text-center mb-3 ">
      <div class="col-lg-10 col-xl-10 history-hero__inner">
        <h1 class="display-5 fw-bold history-title">Quran History</h1>
        <p class="lead history-lead">
          Explore the Quran’s journey, its revelation, memorization, and codification as a unifying force for the global
          Muslim community.
        </p>
      </div>
    </div>

    <!-- Next Step: From Qur'an History to Seerah Timeline -->
    <div class="px-2">
      <div class="mx-auto mb-4 next-step-banner">
        <!-- <button
          type="button"
          class="btn-close"
          aria-label="Dismiss next step"
          @click="dismissNextStep"
          style="position: absolute; right: 14px; top: 14px; opacity: 0.8; filter: none; color: #6b8b91; z-index:2;">
        </button> -->
        <!-- Minimize / Restore toggle -->
        <button
          type="button"
          :title="nextStepMinimized ? 'Restore' : 'Minimize'"
          :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'"
          @click="toggleNextStepMinimized"
          class="next-step-toggle">
          <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
        </button>
        <div class="d-flex align-items-start gap-3 text-start">
          <div class="flex-shrink-0 mt-1">
            <div class="icon-circle">
              <i class="fas fa-compass"></i>
            </div>
          </div>
          <div class="flex-grow-1">
            <p class="mb-2 fw-semibold text-uppercase next-step-eyebrow">
              NEXT STEP
            </p>
            <!-- Minimized teaser -->
            <div v-show="nextStepMinimized" class="mb-2 next-step-teaser">
              <a href="/mission" class="fw-semibold text-decoration-none next-step-link">
                Explore the Seerah timeline
              </a>
              <i class="fas fa-arrow-up-right-from-square ms-1 next-step-link-icon"></i>
            </div>
            <p v-show="!nextStepMinimized" class="mb-3 next-step-text">
              Learning how the Qur’an was preserved is a beautiful beginning. When you’re ready, gently continue with the life of the Messenger who lived its message. Walk through a simple, welcoming
              <a href="/mission" class="fw-semibold text-decoration-none next-step-link">
                Seerah timeline
              </a>
              to see the journey unfold.
            </p>
            <a v-show="!nextStepMinimized" href="/mission"
               class="btn btn-sm fw-semibold cta-btn px-3 py-2">
              Explore Seerah
              <i class="fas fa-arrow-up-right-from-square ms-2"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Open All and Close All Buttons -->
    <div class="text-end mb-3">
      <button v-if="!areAllAccordionsOpen" class="btn fw-semibold transition me-2 btn-primary-soft" @click="openAllSections"
        aria-label="Open all sections">
        <i class="bi bi-plus-circle me-1 action-icon-sm"></i>Open All
      </button>
      <button v-if="areAnyAccordionsOpen" class="btn fw-semibold transition btn-primary-soft" @click="closeAllSections"
        aria-label="Close all sections">
        <i class="bi bi-x-circle me-1 action-icon-sm"></i>Close All
      </button>
    </div>

    <!-- Live region for announcements -->
    <div class="visually-hidden" aria-live="polite" aria-atomic="true">{{ screenReaderMessage }}</div>

    <!-- Card Sections -->
    <div v-if="accordionItems.length" class="mb-5" role="list" aria-label="History sections list">
      <div v-for="(item, idx) in accordionItems" :key="item.title || idx" class="card mb-3 rounded-3 shadow-sm history-card" role="listitem">
        <!-- Card Header -->
        <div class="card-header px-4 py-3 fw-semibold d-flex align-items-center transition history-card-header"
          :class="{ 'is-open': isOpen[idx] }" role="button"
          :id="'section-header-' + idx" :aria-expanded="isOpen[idx]" :aria-controls="'section-content-' + idx"
          :aria-label="`${item.title || 'Untitled Section'} (${wordCounts[idx] || 0} words ${isOpen[idx] ? 'expanded' : 'collapsed'})`"
          @click="toggleSection(idx)" @keydown.enter="toggleSection(idx)" @keydown.space.prevent="toggleSection(idx)"
          @keydown.up.prevent="focusPreviousSection(idx)" @keydown.down.prevent="focusNextSection(idx)" @keydown="onHeaderKeydown(idx, $event)"
          ref="accordionHeaders" tabindex="0">
          <span class="badge rounded-pill me-3 fw-bold section-index">
            {{ idx + 1 }}
          </span>
          <span class="flex-grow-1 section-title">{{ item.title || 'Untitled Section' }}</span>
          <span class="me-3 text-muted muted-meta">
            {{ wordCounts[idx] || 0 }} words
          </span>
          <i :class="isOpen[idx] ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="chev"></i>
        </div>
        <!-- Card Content -->
        <div v-if="isOpen[idx]" :id="'section-content-' + idx" class="card-body px-4 py-4 rounded-bottom-3" :aria-labelledby="'section-header-' + idx"
          :style="{ 'font-size': fontSizes[idx] + 'rem', 'background-color': 'var(--hc-surface)', 'line-height': 1.7, 'color': 'var(--hc-text)' }">
          <!-- AI Summary, Font Size, Print, Export to PDF, and Share via WhatsApp Buttons -->
          <div class="mb-3">
            <div class="btn-toolbar flex-wrap gap-2 d-none d-sm-flex tool-actions">
              <div class="btn-group btn-group-sm flex-wrap" role="group" aria-label="Content actions">
                <button class="btn btn-outline-dark fw-semibold transition"
                  @click="summarizeEvent(idx)"
                  :disabled="summaryLoading[idx]"
                  aria-label="Generate AI summary">
                  <i class="bi" :class="summaryLoading[idx] ? 'bi-hourglass-split' : 'bi-robot'" aria-hidden="true"></i>
                  <span class="ms-1">{{ summaryLoading[idx] ? 'Generating...' : 'AI Summary' }}</span>
                </button>

                <button class="btn btn-outline-dark fw-semibold transition"
                  @click.stop="increaseFontSize(idx)"
                  @keydown.enter.stop="increaseFontSize(idx)"
                  @keydown.space.prevent.stop="increaseFontSize(idx)"
                  aria-label="Increase font size" title="Increase font size">
                  <i class="bi bi-zoom-in me-1" aria-hidden="true"></i>
                  Increase font size
                </button>

                <button class="btn btn-outline-dark fw-semibold transition"
                  @click.stop="decreaseFontSize(idx)"
                  @keydown.enter.stop="decreaseFontSize(idx)"
                  @keydown.space.prevent.stop="decreaseFontSize(idx)"
                  aria-label="Decrease font size" title="Decrease font size">
                  <i class="bi bi-zoom-out me-1" aria-hidden="true"></i>
                  Decrease font size
                </button>

                <button class="btn btn-outline-dark fw-semibold transition"
                  @click.stop="printSection(idx)"
                  @keydown.enter.stop="printSection(idx)"
                  @keydown.space.prevent.stop="printSection(idx)"
                  aria-label="Print section" title="Print section">
                  <i class="bi bi-printer me-1" aria-hidden="true"></i>
                  Print
                </button>

                <button class="btn btn-outline-dark fw-semibold transition"
                  @click.stop="generatePDF(idx)"
                  @keydown.enter.stop="generatePDF(idx)"
                  @keydown.space.prevent.stop="generatePDF(idx)"
                  aria-label="Export to PDF" title="Export to PDF">
                  <i class="bi bi-file-earmark-pdf me-1" aria-hidden="true"></i>
                  Export to PDF
                </button>
              </div>
            </div>
            <div class="d-sm-none">
              <div class="d-flex gap-2 tool-actions" role="group" aria-label="Content actions (mobile)">
                <button class="btn btn-outline-dark flex-fill py-2"
                  @click="summarizeEvent(idx)"
                  :disabled="summaryLoading[idx]"
                  aria-label="Generate AI summary" title="AI Summary">
                  <i class="bi" :class="summaryLoading[idx] ? 'bi-hourglass-split' : 'bi-robot'" aria-hidden="true"></i>
                  <span class="visually-hidden">{{ summaryLoading[idx] ? 'Generating...' : 'AI Summary' }}</span>
                </button>

                <button class="btn btn-outline-dark flex-fill py-2"
                  @click.stop="increaseFontSize(idx)"
                  @keydown.enter.stop="increaseFontSize(idx)"
                  @keydown.space.prevent.stop="increaseFontSize(idx)"
                  aria-label="Increase font size" title="Increase font size">
                  <i class="bi bi-zoom-in" aria-hidden="true"></i>
                  <span class="visually-hidden">Increase font size</span>
                </button>

                <button class="btn btn-outline-dark flex-fill py-2"
                  @click.stop="decreaseFontSize(idx)"
                  @keydown.enter.stop="decreaseFontSize(idx)"
                  @keydown.space.prevent.stop="decreaseFontSize(idx)"
                  aria-label="Decrease font size" title="Decrease font size">
                  <i class="bi bi-zoom-out" aria-hidden="true"></i>
                  <span class="visually-hidden">Decrease font size</span>
                </button>

                <button class="btn btn-outline-dark flex-fill py-2"
                  @click.stop="printSection(idx)"
                  @keydown.enter.stop="printSection(idx)"
                  @keydown.space.prevent.stop="printSection(idx)"
                  aria-label="Print section" title="Print section">
                  <i class="bi bi-printer" aria-hidden="true"></i>
                  <span class="visually-hidden">Print section</span>
                </button>

                <button class="btn btn-outline-dark flex-fill py-2"
                  @click.stop="generatePDF(idx)"
                  @keydown.enter.stop="generatePDF(idx)"
                  @keydown.space.prevent.stop="generatePDF(idx)"
                  aria-label="Export to PDF" title="Export to PDF">
                  <i class="bi bi-file-earmark-pdf" aria-hidden="true"></i>
                  <span class="visually-hidden">Export to PDF</span>
                </button>
              </div>
            </div>

            <Transition name="fade">
              <div v-if="summaries[idx]" class="mt-3 p-3 rounded-3 position-relative summary-box">
                <button type="button"
                  class="btn-close position-absolute top-0 end-0 m-2"
                  @click="clearSummary(idx)"
                  @keydown.enter="clearSummary(idx)"
                  @keydown.space.prevent="clearSummary(idx)"
                  aria-label="Close summary"
                  title="Close"></button>
                <strong>AI Summary:</strong>
                <div class="mt-1">{{ summaries[idx] }}</div>
              </div>
            </Transition>
          </div>
          <!-- FAQ Content -->
          <div v-if="item.faq">
            <div v-for="(faqItem, faqIdx) in item.faq.slice(0, faqVisibleCount[idx] || item.faq.length)" :key="faqIdx" class="mb-3">
              <div class="section-label mb-2">
                <i class="bi bi-question-circle section-label-icon"></i>
                {{ faqItem.question }}
              </div>
              <div class="section-answer">{{ faqItem.answer }}</div>
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
                  <div class="card h-100 section-card transition">
                    <div>
                      <span class="section-label">
                        {{ formatKey(key) }}:
                      </span>
                      <div class="section-text">{{ value }}</div>
                    </div>
                  </div>
                </div>
                <div v-else-if="value && Array.isArray(value)"  class="col-12">
                  <div class="card h-100 section-card transition">
                    <div>
                      <span class="section-label">
                        <i class="bi bi-list-ul section-label-icon"></i>{{ formatKey(key) }}:
                      </span>
                      <ul class="list-clean">
                        <li v-for="(subItem, i) in value" :key="i">{{ subItem }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-else-if="value && typeof value === 'object'"  class="col-12">
                  <div class="card h-100 section-card transition">
                    <div>
                      <span class="section-label">
                        <i class="bi bi-diagram-3 section-label-icon"></i>{{ formatKey(key) }}:
                      </span>
                      <ul class="list-clean">
                        <li v-for="(v, k) in value" :key="k">
                          <span class="data-key">{{ formatKey(k) }}:</span> {{ v }}
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
            <div class="section-label mb-2"><i class="bi bi-table section-label-icon"></i>Comparative Table</div>
            <div class="table-responsive">
              <table class="table table-bordered align-middle mb-0 table-clean">
                <thead>
                  <tr>
                    <th v-for="(col, i) in getTableColumns(item.table)" :key="i" class="table-head-cell">
                      {{ formatKey(col) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in item.table.slice(0, tableVisibleCount[idx] || item.table.length)" :key="i">
                    <td v-for="(val, k) in row" :key="k" class="table-body-cell">
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
            class="alert mt-4 border-0 rounded-3 shadow-sm py-3 px-4">
            <i class="bi bi-lightbulb section-label-icon"></i>
            <strong>Significance:</strong> {{ item.significance }}
          </div>
          <div v-if="item.insights && isRegularSection(item)"
            class="alert alert-info mt-4 border-0 rounded-3 shadow-sm py-3 px-4">
            <i class="bi bi-info-circle section-label-icon"></i>
            <strong>Insights:</strong>
            <ul class="list-clean mt-2">
              <li v-for="(insight, i) in item.insights" :key="i">{{ insight }}</li>
            </ul>
          </div>
          <div v-if="item.details && item.details.recommendations && isRegularSection(item)"
            class="alert alert-secondary mt-4 border-0 rounded-3 shadow-sm py-3 px-4">
            <i class="bi bi-star section-label-icon"></i>
            <strong>Recommendations:</strong>
            <ul class="list-clean mt-2">
              <li v-for="(rec, i) in item.details.recommendations" :key="i">
                <span class="data-key">{{ formatKey(rec.name) }}:</span> {{ rec.description }}
              </li>
            </ul>
          </div>
          <div v-if="item.details && item.details.challenges && isRegularSection(item)"
            class="alert alert-warning mt-4 border-0 rounded-3 shadow-sm py-3 px-4">
            <i class="bi bi-exclamation-triangle section-label-icon"></i>
            <strong>Challenges:</strong>
            <ul class="list-clean mt-2">
              <li v-for="(ch, i) in item.details.challenges" :key="i">{{ ch }}</li>
            </ul>
          </div>
          <!-- Conclusion Content -->
          <div v-if="item.conclusion" class="row g-4">
            <div class="col-12 col-md-4">
              <div class="card h-100 reference-card transition">
                <div>
                  <div class="section-label mb-2">
                    Summary
                  </div>
                  <div class="section-text">{{ item.conclusion.summary }}</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="card h-100 reference-card transition">
                <div>
                  <div class="section-label mb-2">
                    Final Thoughts
                  </div>
                  <div class="section-text">{{ item.conclusion.final_thoughts }}</div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="card h-100 reference-card transition">
                <div>
                  <div class="section-label mb-2">
                    Call to Action
                  </div>
                  <div class="section-text">{{ item.conclusion.call_to_action }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- References Content -->
          <div v-if="item.references" class="row g-4">
            <div v-for="(refs, key) in item.references" :key="key" class="col-12 col-md-6">
              <div class="card h-100 reference-card transition">
                <div>
                  <div class="section-label mb-2">{{ formatKey(key) }}</div>
                  <ul class="list-clean">
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
    <div v-else class="alert alert-warning text-center py-4 history-empty">
      No content available. Please check the data source.
    </div>
    <!-- Floating Action Button for Scroll to Top -->
    <button v-show="showScrollToTop" class="btn transition shadow-sm scroll-top-btn" @click="scrollToTop"
      @keydown.enter="scrollToTop" @keydown.space.prevent="scrollToTop"
      aria-label="Scroll to top" title="Scroll to top">
      <i class="bi bi-arrow-up"></i>
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
      // Next step banner
      showNextStep: true,
      nextStepMinimized: true,
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
    // Restore dismissal/minimized state for Next Step
    try {
      if (localStorage.getItem('historyNextStepDismissed') === '1') this.showNextStep = false;
      this.nextStepMinimized = localStorage.getItem('historyNextStepMinimized') === '1';
    } catch (_) {}
    // Fallback: if not explicitly dismissed, ensure it's visible
    try {
      if (localStorage.getItem('historyNextStepDismissed') !== '1') {
        this.showNextStep = true;
      }
    } catch (_) {}
    // Force-show override via query param: /history?banner=1
    try {
      const params = new URLSearchParams(window.location.search || '');
      if (params.get('banner') === '1') {
        this.showNextStep = true;
        this.nextStepMinimized = false;
        try { localStorage.removeItem('historyNextStepDismissed'); } catch (_) {}
      }
    } catch (_) {}
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    dismissNextStep() {
      this.showNextStep = false;
      try { localStorage.setItem('historyNextStepDismissed', '1'); } catch (_) {}
    },
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
      try { localStorage.setItem('historyNextStepMinimized', this.nextStepMinimized ? '1' : '0'); } catch (_) {}
    },
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
/* Theming variables scoped under top container */
.history-ui {
  --hc-accent: #0b806f;
  --hc-accent-2: #1a5f7a;
  --hc-surface: #ffffff;
  --hc-muted: #e2e8f0;
  --hc-soft: #f7f5f0;
  --hc-text: #1f2937;
  --hc-muted-text: #5b6470;
  --hc-border: #e5e0d6;
  --hc-shadow: 0 18px 36px rgba(15, 41, 32, 0.08);
  background: transparent;
  border: 0;
  border-radius: 28px;
}

/* .history-hero__inner {
  background: var(--hc-surface);
  border: 1px solid var(--hc-border);
  border-radius: 24px;
  padding: 2.2rem 1.8rem;
  box-shadow: var(--hc-shadow);
} */

.history-title {
  color: var(--hc-text);
  letter-spacing: -0.02em;
}

.history-lead {
  color: var(--hc-muted-text);
  max-width: 760px;
  margin: 0 auto;
}
/* Mobile tweaks: keep actions compact and aligned */
@media (max-width: 576px) {
  .text-end.mb-3 { text-align: center !important; }
  .text-end.mb-3 .btn { width: auto; display: inline-flex; margin-bottom: 6px; }
}
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
  box-shadow: 0 0 0 3px rgba(11, 128, 111, 0.3);
  outline: none;
}

/* Button hover effect */
.btn:hover:not(.btn-outline-dark) {
  background-color: var(--hc-accent);
}

/* Button hover effect for outline-dark */
.btn-outline-dark { color: var(--hc-text); border-color: var(--hc-muted); }
.btn-outline-dark:hover { background-color: var(--hc-accent); color: #fff; border-color: var(--hc-accent); }

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
.text-muted { color: var(--hc-muted-text) !important; }

/* Subtle fade for summary appear/disappear */
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Clean summary box styles without inline CSS */
.summary-box { background-color: var(--hc-soft); border: 2px solid rgba(11, 128, 111, 0.3); border-radius: 20px; box-shadow: 0 10px 20px rgba(15, 41, 32, 0.08); }

/* Consistent, compact icon sizing and spacing */
.btn i { font-size: 0.9rem; }

/* Card polish */
.card { border-radius: 20px; }
.card-header { background: #fff; border-bottom: 1px solid var(--hc-border); }
.card:hover { box-shadow: 0 14px 26px rgba(15,41,32,0.12) !important; }
.card-header .badge { background: var(--hc-accent) !important; border-color: var(--hc-accent) !important; }

/* Title */
/* .history-title { color: var(--hc-accent-2); letter-spacing: -0.01em; } */

/* Section shell */
.history-card { background: var(--hc-surface); border: 1px solid var(--hc-border); box-shadow: 0 6px 14px rgba(15,41,32,0.06); margin-bottom: 0.875rem !important; border-radius: 20px; overflow: hidden; }
.history-card-header { background: #ffffff; transition: background-color .15s ease; padding-top: .6rem !important; padding-bottom: .6rem !important; }
.history-card-header:hover { background: #f9fbfc; }
.history-card-header.is-open { background: #f7f5f0; }
.section-index { color: #fff; background: var(--hc-accent) !important; border: 1px solid var(--hc-accent) !important; width: 36px; height: 36px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(11,128,111,0.18); }
.muted-meta { font-size: 0.8rem; }
.section-title { color: var(--hc-text); letter-spacing: 0; }
.chev { font-size: .95rem; color: #5b6777; transition: transform .2s ease; }
.history-card-header.is-open .chev { transform: rotate(180deg); }

/* Action toolbar (segmented look) */
.tool-actions { border-radius: 999px; overflow: hidden; }
.tool-actions .btn { background: #fff; border-color: var(--hc-border); box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-radius: 0; padding: .55rem .9rem; }
.tool-actions .btn + .btn { border-left-color: #eef2f6; }
.tool-actions .btn:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(15,41,32,0.12); }
.tool-actions .btn i { color: #1f2d3d; }
.tool-actions .btn:first-child { border-top-left-radius: 20px; border-bottom-left-radius: 20px; }
.tool-actions .btn:last-child { border-top-right-radius: 20px; border-bottom-right-radius: 20px; }

/* Open/Close soft primary button */
.btn-primary-soft {
  background: var(--hc-accent);
  color: #fff; border: none; border-radius: 999px; padding: 0.45rem 0.9rem; font-size: 0.85rem;
  box-shadow: 0 8px 18px rgba(11,128,111,0.18);
}
.btn-primary-soft:hover { transform: translateY(-1px); box-shadow: 0 12px 26px rgba(11,128,111,0.22); }

/* Next step banner */
.next-step-banner { position: relative; background: var(--hc-surface); border: 1px solid var(--hc-border); border-radius: 22px; box-shadow: 0 12px 28px rgba(15,41,32,0.08); padding: 1.25rem 1.75rem; overflow: hidden; }
.next-step-banner::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: var(--hc-accent); opacity: 0.6; }
.next-step-toggle { position: absolute; right: 14px; top: 14px; opacity: 0.95; background: transparent; border: 0; color: #6b8b91; z-index:3; cursor: pointer; }
.icon-circle { width: 46px; height: 46px; border-radius: 50%; background: rgba(11, 128, 111, 0.16); display: flex; align-items: center; justify-content: center; color: var(--hc-accent); font-size: 1.35rem; box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.22), 0 6px 14px rgba(26,95,122,0.10); }
.next-step-eyebrow { letter-spacing: 0.1em; color: var(--hc-accent-2); font-size: 0.78rem; }
.next-step-teaser { color: #1f2933; }
.next-step-text { color: var(--hc-text); line-height: 1.8; font-size: 1.05rem; }
.next-step-link { color: var(--hc-accent); }
.next-step-link-icon { color: var(--hc-accent); }
.cta-btn { background: var(--hc-accent); color: #fff; border: none; border-radius: 999px; box-shadow: 0 10px 20px rgba(11, 128, 111, 0.25); transition: transform 0.2s ease, box-shadow 0.2s ease; }
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(11, 128, 111, 0.28); color: #fff; }

/* Section cards and labels */
.section-card { background-color: var(--hc-soft); padding: 1.25rem 1.25rem; border: 1px solid var(--hc-border); border-radius: 20px; }
.reference-card { background-color: #ffffff; padding: 1.25rem 1.25rem; border: 1px solid var(--hc-border); border-radius: 20px; }
.section-label { font-weight: 600; color: var(--hc-accent); font-size: 1rem; }
.section-label-icon { margin-right: 0.5rem; font-size: 1.1rem; vertical-align: -0.125rem; color: var(--hc-accent); }
.section-text { margin-top: 0.5rem; line-height: 1.7; }
.section-answer { padding-left: 1.75rem; line-height: 1.7; }
.list-clean { margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7; }

.data-key {
  font-weight: 600;
}

.table-head-cell {
  font-weight: 500;
  color: var(--hc-accent);
  font-size: 0.95rem;
  padding: 1rem;
}

.table-body-cell {
  padding: 1rem;
}

.history-empty {
  background-color: #fef3c7;
  color: #78350f;
  font-size: 1.05rem;
  border: 1px solid #fde68a;
}

.action-icon-sm {
  font-size: 0.9rem;
}

/* Tables */
table.table { border-color: var(--hc-muted); }
table.table thead { background: var(--hc-soft); }
table.table tbody tr:nth-child(odd) { background-color: #fbfdff; }
table.table tbody tr:hover { background: #f6fbfe; }
.table-clean { background: #fff; border-color: var(--hc-muted); }
.table-responsive { border-radius: 20px; overflow: hidden; }

/* FAB */
.scroll-top-btn { position: fixed; bottom: 20px; right: 20px; background: var(--hc-accent); color: #fff; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; z-index: 1000; box-shadow: 0 10px 22px rgba(26,95,122,0.25); }
.scroll-top-btn i { font-size: 1.4rem; }
.scroll-top-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(26,95,122,0.3); }
</style>
