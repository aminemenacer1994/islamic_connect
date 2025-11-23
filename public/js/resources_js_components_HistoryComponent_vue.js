"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_HistoryComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _quran_info_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quran_info.json */ "./resources/js/components/quran_info.json");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'HistoryComponent',
  data() {
    return {
      quranInfo: _quran_info_json__WEBPACK_IMPORTED_MODULE_0__ || {},
      // Fallback to empty object if import fails
      isOpen: [],
      // Tracks open state of each section
      fontSizes: [],
      // Tracks font size of each section
      summaryLoading: [],
      // Tracks loading state for each section's summary
      summaries: [],
      // Stores generated summary for each section
      showScrollToTop: false,
      // Tracks FAB visibility
      wordCounts: [],
      // Tracks word count for each section
      readTimes: [],
      // Tracks read time for each section
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
      faq: [{
        question: 'When was the Quran first revealed?',
        answer: 'The Quran was first revealed to Prophet Muhammad in 610 CE during the month of Ramadan in the Cave of Hira.'
      }, {
        question: 'Who compiled the Quran into a single book?',
        answer: 'The Quran was compiled into a single book during the caliphate of Abu Bakr (632-634 CE), with the final standardization under Uthman ibn Affan (644-656 CE).'
      }, {
        question: 'How was the Quran preserved before written compilation?',
        answer: 'The Quran was primarily preserved through memorization by the Prophet’s companions, known as Huffaz, alongside partial written records on various materials.'
      }, {
        question: 'What is the significance of the Uthmanic Codex?',
        answer: 'The Uthmanic Codex standardized the Quranic text, ensuring uniformity across the Muslim world, and serves as the basis for all modern Quranic manuscripts.'
      }, {
        question: 'Why is the Quran considered a miracle?',
        answer: 'The Quran is considered a miracle due to its linguistic excellence, inimitable style, and profound guidance, which Muslims believe could not have been produced by human effort alone.'
      }, {
        question: 'How many verses are in the Quran?',
        answer: 'The Quran contains 6,236 verses (Ayat), though the exact count may vary slightly depending on different methods of verse numbering.'
      }, {
        question: 'What is the role of the Quranic recitations (Qira\'at)?',
        answer: 'The Quranic recitations (Qira\'at) are authentic variations in pronunciation and recitation of the Quran, approved by the Prophet Muhammad, which enrich its oral tradition while maintaining the text’s integrity.'
      }, {
        question: 'How did the Quran influence early Islamic scholarship?',
        answer: 'The Quran served as the foundation for early Islamic scholarship, inspiring disciplines like Tafsir (exegesis), Hadith collection, and Arabic linguistics to preserve and interpret its teachings.'
      }]
    };
  },
  computed: {
    // Combine sections, Conclusion, References, and FAQ, excluding section 9 (index 8)
    accordionItems() {
      if (!this.quranInfo || !this.quranInfo.sections || !Array.isArray(this.quranInfo.sections)) {
        return [];
      }
      const sections = this.quranInfo.sections.map((section, index) => ({
        section,
        index
      })).filter(({
        section,
        index
      }) => section && typeof section === 'object' && index !== 8).map(({
        section
      }) => section);
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
          references: Object.fromEntries(Object.entries(this.quranInfo.references || {}).filter(([key]) => key !== 'note'))
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
      this.faqVisibleCount = this.accordionItems.map(item => item.faq ? this.faqPageSize : 0);
      this.tableVisibleCount = this.accordionItems.map(item => item.table && this.isRegularSection(item) ? this.tablePageSize : 0);
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
    window.addEventListener('scroll', this.handleScroll, {
      passive: true
    });
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
        try {
          localStorage.removeItem('historyNextStepDismissed');
        } catch (_) {}
      }
    } catch (_) {}
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    dismissNextStep() {
      this.showNextStep = false;
      try {
        localStorage.setItem('historyNextStepDismissed', '1');
      } catch (_) {}
    },
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
      try {
        localStorage.setItem('historyNextStepMinimized', this.nextStepMinimized ? '1' : '0');
      } catch (_) {}
    },
    onHeaderKeydown(idx, e) {
      if (!e || !e.key) return;
      if (e.key === 'Home') {
        var _this$$refs$accordion;
        e.preventDefault();
        const first = (_this$$refs$accordion = this.$refs.accordionHeaders) === null || _this$$refs$accordion === void 0 ? void 0 : _this$$refs$accordion[0];
        first && first.focus();
      } else if (e.key === 'End') {
        var _this$$refs$accordion2;
        e.preventDefault();
        const last = (_this$$refs$accordion2 = this.$refs.accordionHeaders) === null || _this$$refs$accordion2 === void 0 ? void 0 : _this$$refs$accordion2[this.accordionItems.length - 1];
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
      const title = item && item.title || `Section ${idx + 1}`;
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
      const pushText = t => {
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
      const formatted = key.replace(/_/g, ' ').split(' ').map((word, index) => {
        if (index === 0 || !lowercaseWords.includes(word.toLowerCase())) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.toLowerCase();
      }).join(' ');
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
        const scrollPercent = documentHeight > 0 ? scrollTop / documentHeight * 100 : 0;
        this.showScrollToTop = scrollPercent > 5;
        this.scrollTicking = false;
      });
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    computeWordCountAndReadTime(item) {
      let text = '';
      if (item.faq) {
        text += item.faq.map(faq => `${faq.question} ${faq.answer}`).join(' ');
      } else if (item.conclusion) {
        text += `${item.conclusion.summary || ''} ${item.conclusion.final_thoughts || ''} ${item.conclusion.call_to_action || ''}`;
      } else if (item.references) {
        text += Object.values(item.references).flat().join(' ');
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
          text += item.table.map(row => Object.values(row).join(' ')).join(' ') + ' ';
        }
      }
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      const readTime = wordCount > 0 ? Math.round(wordCount / 200) || '<1' : '<1';
      return {
        wordCount,
        readTime
      };
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
              styles: {
                fontSize: 10 * this.fontSizes[idx],
                textColor: [74, 85, 104]
              },
              headStyles: {
                fillColor: [247, 250, 252],
                textColor: [0, 191, 166],
                fontStyle: 'bold'
              },
              margin: {
                left: marginLeft,
                right: marginLeft
              }
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
      var _this$accordionItems$;
      const max = ((_this$accordionItems$ = this.accordionItems[idx]) === null || _this$accordionItems$ === void 0 || (_this$accordionItems$ = _this$accordionItems$.faq) === null || _this$accordionItems$ === void 0 ? void 0 : _this$accordionItems$.length) || 0;
      const current = this.faqVisibleCount[idx] || 0;
      if (this.$set) this.$set(this.faqVisibleCount, idx, Math.min(current + this.faqPageSize, max));else this.faqVisibleCount[idx] = Math.min(current + this.faqPageSize, max);
    },
    showMoreTable(idx) {
      var _this$accordionItems$2;
      const max = (((_this$accordionItems$2 = this.accordionItems[idx]) === null || _this$accordionItems$2 === void 0 ? void 0 : _this$accordionItems$2.table) || []).length;
      const current = this.tableVisibleCount[idx] || 0;
      if (this.$set) this.$set(this.tableVisibleCount, idx, Math.min(current + this.tablePageSize, max));else this.tableVisibleCount[idx] = Math.min(current + this.tablePageSize, max);
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
          var _Object$values$;
          const firstRef = ((_Object$values$ = Object.values(item.references)[0]) === null || _Object$values$ === void 0 ? void 0 : _Object$values$[0]) || 'References for Quran history.';
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
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=template&id=8d557698&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=template&id=8d557698&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "container py-4 history-ui",
  role: "main",
  "aria-label": "Quran History"
};
const _hoisted_2 = {
  class: "px-2"
};
const _hoisted_3 = {
  class: "mx-auto mb-4 next-step-banner"
};
const _hoisted_4 = ["title", "aria-label"];
const _hoisted_5 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_6 = {
  style: {
    "flex": "1"
  }
};
const _hoisted_7 = {
  class: "mb-2 next-step-teaser"
};
const _hoisted_8 = {
  class: "mb-3 next-step-text"
};
const _hoisted_9 = {
  href: "/mission",
  class: "btn btn-sm fw-semibold cta-btn px-3 py-2"
};
const _hoisted_10 = {
  class: "text-end mb-3"
};
const _hoisted_11 = {
  class: "visually-hidden",
  "aria-live": "polite",
  "aria-atomic": "true"
};
const _hoisted_12 = {
  key: 0,
  class: "mb-5",
  role: "list",
  "aria-label": "History sections list"
};
const _hoisted_13 = ["id", "aria-expanded", "aria-controls", "aria-label", "onClick", "onKeydown"];
const _hoisted_14 = {
  class: "badge rounded-pill me-3 fw-bold section-index"
};
const _hoisted_15 = {
  class: "flex-grow-1 section-title"
};
const _hoisted_16 = {
  class: "me-3 text-muted muted-meta"
};
const _hoisted_17 = ["id", "aria-labelledby"];
const _hoisted_18 = {
  class: "mb-3"
};
const _hoisted_19 = {
  class: "btn-toolbar flex-wrap gap-2 d-none d-sm-flex tool-actions"
};
const _hoisted_20 = {
  class: "btn-group btn-group-sm flex-wrap",
  role: "group",
  "aria-label": "Content actions"
};
const _hoisted_21 = ["onClick", "disabled"];
const _hoisted_22 = {
  class: "ms-1"
};
const _hoisted_23 = ["onClick", "onKeydown"];
const _hoisted_24 = ["onClick", "onKeydown"];
const _hoisted_25 = ["onClick", "onKeydown"];
const _hoisted_26 = ["onClick", "onKeydown"];
const _hoisted_27 = {
  class: "d-sm-none"
};
const _hoisted_28 = {
  class: "d-flex gap-2 tool-actions",
  role: "group",
  "aria-label": "Content actions (mobile)"
};
const _hoisted_29 = ["onClick", "disabled"];
const _hoisted_30 = {
  class: "visually-hidden"
};
const _hoisted_31 = ["onClick", "onKeydown"];
const _hoisted_32 = ["onClick", "onKeydown"];
const _hoisted_33 = ["onClick", "onKeydown"];
const _hoisted_34 = ["onClick", "onKeydown"];
const _hoisted_35 = {
  key: 0,
  class: "mt-3 p-3 rounded-3 position-relative summary-box"
};
const _hoisted_36 = ["onClick", "onKeydown"];
const _hoisted_37 = {
  class: "mt-1"
};
const _hoisted_38 = {
  key: 0
};
const _hoisted_39 = {
  class: "section-label mb-2"
};
const _hoisted_40 = {
  class: "section-answer"
};
const _hoisted_41 = {
  key: 0,
  class: "text-center mt-2"
};
const _hoisted_42 = ["onClick"];
const _hoisted_43 = {
  key: 1
};
const _hoisted_44 = {
  class: "row g-4"
};
const _hoisted_45 = {
  class: "card h-100 section-card transition"
};
const _hoisted_46 = {
  class: "section-label"
};
const _hoisted_47 = {
  class: "section-text"
};
const _hoisted_48 = {
  key: 1,
  class: "col-12"
};
const _hoisted_49 = {
  class: "card h-100 section-card transition"
};
const _hoisted_50 = {
  class: "section-label"
};
const _hoisted_51 = {
  class: "list-clean"
};
const _hoisted_52 = {
  key: 2,
  class: "col-12"
};
const _hoisted_53 = {
  class: "card h-100 section-card transition"
};
const _hoisted_54 = {
  class: "section-label"
};
const _hoisted_55 = {
  class: "list-clean"
};
const _hoisted_56 = {
  style: {
    "font-weight": "600"
  }
};
const _hoisted_57 = {
  key: 2,
  class: "mt-4"
};
const _hoisted_58 = {
  class: "table-responsive"
};
const _hoisted_59 = {
  class: "table table-bordered align-middle mb-0 table-clean"
};
const _hoisted_60 = {
  key: 0,
  class: "text-center mt-2"
};
const _hoisted_61 = ["onClick"];
const _hoisted_62 = {
  key: 3,
  class: "alert mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
};
const _hoisted_63 = {
  key: 4,
  class: "alert alert-info mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
};
const _hoisted_64 = {
  class: "list-clean mt-2"
};
const _hoisted_65 = {
  key: 5,
  class: "alert alert-secondary mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
};
const _hoisted_66 = {
  class: "list-clean mt-2"
};
const _hoisted_67 = {
  style: {
    "font-weight": "600"
  }
};
const _hoisted_68 = {
  key: 6,
  class: "alert alert-warning mt-4 border-0 rounded-3 shadow-sm py-3 px-4"
};
const _hoisted_69 = {
  class: "list-clean mt-2"
};
const _hoisted_70 = {
  key: 7,
  class: "row g-4"
};
const _hoisted_71 = {
  class: "col-12 col-md-4"
};
const _hoisted_72 = {
  class: "card h-100 reference-card transition"
};
const _hoisted_73 = {
  class: "section-text"
};
const _hoisted_74 = {
  class: "col-12 col-md-4"
};
const _hoisted_75 = {
  class: "card h-100 reference-card transition"
};
const _hoisted_76 = {
  class: "section-text"
};
const _hoisted_77 = {
  class: "col-12 col-md-4"
};
const _hoisted_78 = {
  class: "card h-100 reference-card transition"
};
const _hoisted_79 = {
  class: "section-text"
};
const _hoisted_80 = {
  key: 8,
  class: "row g-4"
};
const _hoisted_81 = {
  class: "card h-100 reference-card transition"
};
const _hoisted_82 = {
  class: "section-label mb-2"
};
const _hoisted_83 = {
  class: "list-clean"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header "), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold history-title"
  }, "Quran History"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead"
  }, " Explore the Quran’s journey, its revelation, memorization, and codification as a unifying force for the global Muslim community. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Next Step: From Qur'an History to Seerah Timeline "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <button\n          type=\"button\"\n          class=\"btn-close\"\n          aria-label=\"Dismiss next step\"\n          @click=\"dismissNextStep\"\n          style=\"position: absolute; right: 14px; top: 14px; opacity: 0.8; filter: none; color: #6b8b91; z-index:2;\">\n        </button> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimize / Restore toggle "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: $data.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": $data.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args)),
    class: "next-step-toggle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "icon-circle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-compass"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase next-step-eyebrow"
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/mission",
    class: "fw-semibold text-decoration-none",
    style: {
      "color": "#0b806f"
    }
  }, " Explore the Seerah timeline ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-1",
    style: {
      "color": "#0b806f"
    }
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Learning how the Qur’an was preserved is a beautiful beginning. When you’re ready, gently continue with the life of the Messenger who lived its message. Walk through a simple, welcoming ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/mission",
    class: "fw-semibold text-decoration-none",
    style: {
      "color": "#0b806f"
    }
  }, " Seerah timeline ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" to see the journey unfold. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_9, [...(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Explore Seerah ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square ms-2"
  }, null, -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Open All and Close All Buttons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [!$options.areAllAccordionsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "btn fw-semibold transition me-2 btn-primary-soft",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.openAllSections && $options.openAllSections(...args)),
    "aria-label": "Open all sections"
  }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle me-1",
    style: {
      "font-size": "0.9rem"
    }
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Open All ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.areAnyAccordionsOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 1,
    class: "btn fw-semibold transition btn-primary-soft",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.closeAllSections && $options.closeAllSections(...args)),
    "aria-label": "Close all sections"
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-x-circle me-1",
    style: {
      "font-size": "0.9rem"
    }
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Close All ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Live region for announcements "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.screenReaderMessage), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card Sections "), $options.accordionItems.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.accordionItems, (item, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title || idx,
      class: "card mb-3 rounded-3 shadow-sm history-card",
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["card-header px-4 py-3 fw-semibold d-flex align-items-center transition history-card-header", {
        'is-open': $data.isOpen[idx]
      }]),
      role: "button",
      id: 'section-header-' + idx,
      "aria-expanded": $data.isOpen[idx],
      "aria-controls": 'section-content-' + idx,
      "aria-label": `${item.title || 'Untitled Section'} (${$data.wordCounts[idx] || 0} words ${$data.isOpen[idx] ? 'expanded' : 'collapsed'})`,
      onClick: $event => $options.toggleSection(idx),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => $options.toggleSection(idx), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.toggleSection(idx), ["prevent"]), ["space"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.focusPreviousSection(idx), ["prevent"]), ["up"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.focusNextSection(idx), ["prevent"]), ["down"]), $event => $options.onHeaderKeydown(idx, $event)],
      ref_for: true,
      ref: "accordionHeaders",
      tabindex: "0"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(idx + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title || 'Untitled Section'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.wordCounts[idx] || 0) + " words ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$data.isOpen[idx] ? 'bi bi-chevron-up' : 'bi bi-chevron-down', "chev"])
    }, null, 2 /* CLASS */)], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_13), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card Content "), $data.isOpen[idx] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      id: 'section-content-' + idx,
      class: "card-body px-4 py-4 rounded-bottom-3",
      "aria-labelledby": 'section-header-' + idx,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        'font-size': $data.fontSizes[idx] + 'rem',
        'background-color': '#ffffff',
        'line-height': 1.7,
        'color': '#4a5568'
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" AI Summary, Font Size, Print, Export to PDF, and Share via WhatsApp Buttons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark fw-semibold transition",
      onClick: $event => $options.summarizeEvent(idx),
      disabled: $data.summaryLoading[idx],
      "aria-label": "Generate AI summary"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.summaryLoading[idx] ? 'bi-hourglass-split' : 'bi-robot']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summaryLoading[idx] ? 'Generating...' : 'AI Summary'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_21), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark fw-semibold transition",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.increaseFontSize(idx), ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.increaseFontSize(idx), ["stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.increaseFontSize(idx), ["prevent", "stop"]), ["space"])],
      "aria-label": "Increase font size",
      title: "Increase font size"
    }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-zoom-in me-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Increase font size ", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_23), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark fw-semibold transition",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.decreaseFontSize(idx), ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.decreaseFontSize(idx), ["stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.decreaseFontSize(idx), ["prevent", "stop"]), ["space"])],
      "aria-label": "Decrease font size",
      title: "Decrease font size"
    }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-zoom-out me-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Decrease font size ", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_24), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark fw-semibold transition",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.printSection(idx), ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.printSection(idx), ["stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.printSection(idx), ["prevent", "stop"]), ["space"])],
      "aria-label": "Print section",
      title: "Print section"
    }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-printer me-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Print ", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_25), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark fw-semibold transition",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.generatePDF(idx), ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.generatePDF(idx), ["stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.generatePDF(idx), ["prevent", "stop"]), ["space"])],
      "aria-label": "Export to PDF",
      title: "Export to PDF"
    }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-file-earmark-pdf me-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Export to PDF ", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_26)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark flex-fill py-2",
      onClick: $event => $options.summarizeEvent(idx),
      disabled: $data.summaryLoading[idx],
      "aria-label": "Generate AI summary",
      title: "AI Summary"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $data.summaryLoading[idx] ? 'bi-hourglass-split' : 'bi-robot']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summaryLoading[idx] ? 'Generating...' : 'AI Summary'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_29), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark flex-fill py-2",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.increaseFontSize(idx), ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.increaseFontSize(idx), ["stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.increaseFontSize(idx), ["prevent", "stop"]), ["space"])],
      "aria-label": "Increase font size",
      title: "Increase font size"
    }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-zoom-in",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "visually-hidden"
    }, "Increase font size", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_31), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark flex-fill py-2",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.decreaseFontSize(idx), ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.decreaseFontSize(idx), ["stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.decreaseFontSize(idx), ["prevent", "stop"]), ["space"])],
      "aria-label": "Decrease font size",
      title: "Decrease font size"
    }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-zoom-out",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "visually-hidden"
    }, "Decrease font size", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_32), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark flex-fill py-2",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.printSection(idx), ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.printSection(idx), ["stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.printSection(idx), ["prevent", "stop"]), ["space"])],
      "aria-label": "Print section",
      title: "Print section"
    }, [...(_cache[19] || (_cache[19] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-printer",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "visually-hidden"
    }, "Print section", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_33), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-dark flex-fill py-2",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.generatePDF(idx), ["stop"]),
      onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.generatePDF(idx), ["stop"]), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.generatePDF(idx), ["prevent", "stop"]), ["space"])],
      "aria-label": "Export to PDF",
      title: "Export to PDF"
    }, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-file-earmark-pdf",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "visually-hidden"
    }, "Export to PDF", -1 /* CACHED */)]))], 40 /* PROPS, NEED_HYDRATION */, _hoisted_34)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "fade"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.summaries[idx] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        type: "button",
        class: "btn-close position-absolute top-0 end-0 m-2",
        onClick: $event => $options.clearSummary(idx),
        onKeydown: [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => $options.clearSummary(idx), ["enter"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.clearSummary(idx), ["prevent"]), ["space"])],
        "aria-label": "Close summary",
        title: "Close"
      }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_36), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "AI Summary:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.summaries[idx]), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Content "), item.faq ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_38, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.faq.slice(0, $data.faqVisibleCount[idx] || item.faq.length), (faqItem, faqIdx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: faqIdx,
        class: "mb-3"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-question-circle section-label-icon"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faqItem.question), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faqItem.answer), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */)), ($data.faqVisibleCount[idx] || 0) < item.faq.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-dark fw-semibold transition",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.showMoreFaq(idx), ["stop"])
    }, " Show more ", 8 /* PROPS */, _hoisted_42)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Details (for regular sections) "), $options.isRegularSection(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.details, (value, key, index) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [value && typeof value === 'string' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: `${key}-${index}`,
        class: "col-12 col-md-6"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatKey(key)) + ": ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(value), 1 /* TEXT */)])])])) : value && Array.isArray(value) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_50, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-list-ul section-label-icon"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatKey(key)) + ": ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_51, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(value, (subItem, i) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
          key: i
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(subItem), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))])])])])) : value && typeof value === 'object' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_54, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-diagram-3 section-label-icon"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatKey(key)) + ": ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_55, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(value, (v, k) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
          key: k
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatKey(k)) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(v), 1 /* TEXT */)]);
      }), 128 /* KEYED_FRAGMENT */))])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 64 /* STABLE_FRAGMENT */);
    }), 256 /* UNKEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Table (for regular sections) "), item.table && $options.isRegularSection(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-label mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-table section-label-icon"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Comparative Table")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.getTableColumns(item.table), (col, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", {
        key: i,
        style: {
          "font-weight": "500",
          "color": "#228B22",
          "font-size": "0.95rem",
          "padding": "1rem"
        }
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatKey(col)), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.table.slice(0, $data.tableVisibleCount[idx] || item.table.length), (row, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
        key: i
      }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(row, (val, k) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("td", {
          key: k,
          style: {
            "padding": "1rem"
          }
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(val), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))]);
    }), 128 /* KEYED_FRAGMENT */))])]), ($data.tableVisibleCount[idx] || 0) < item.table.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-dark fw-semibold transition",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.showMoreTable(idx), ["stop"])
    }, " Show more rows ", 8 /* PROPS */, _hoisted_61)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Insights, Significance, Recommendations, Challenges (for regular sections) "), item.significance && $options.isRegularSection(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_62, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-lightbulb section-label-icon",
      style: {
        "color": "#228B22"
      }
    }, null, -1 /* CACHED */)), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Significance:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.significance), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), item.insights && $options.isRegularSection(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_63, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-info-circle section-label-icon",
      style: {
        "color": "#228B22"
      }
    }, null, -1 /* CACHED */)), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Insights:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_64, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.insights, (insight, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: i
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(insight), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), item.details && item.details.recommendations && $options.isRegularSection(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-star section-label-icon",
      style: {
        "color": "#228B22"
      }
    }, null, -1 /* CACHED */)), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Recommendations:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_66, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.details.recommendations, (rec, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: i
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatKey(rec.name)) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(rec.description), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), item.details && item.details.challenges && $options.isRegularSection(item) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_68, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-exclamation-triangle section-label-icon",
      style: {
        "color": "#228B22"
      }
    }, null, -1 /* CACHED */)), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Challenges:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_69, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.details.challenges, (ch, i) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: i
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Conclusion Content "), item.conclusion ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-label mb-2"
    }, " Summary ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.conclusion.summary), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-label mb-2"
    }, " Final Thoughts ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.conclusion.final_thoughts), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "section-label mb-2"
    }, " Call to Action ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.conclusion.call_to_action), 1 /* TEXT */)])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" References Content "), item.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_80, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(item.references, (refs, key) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: key,
        class: "col-12 col-md-6"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatKey(key)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_83, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(refs, (ref, i) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
          key: i
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))])])])]);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 12 /* STYLE, PROPS */, _hoisted_17)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Fallback for empty data "), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "alert alert-warning text-center py-4",
    style: {
      "background-color": "#fefcbf",
      "color": "#744210",
      "font-size": "1.1rem"
    }
  }, " No content available. Please check the data source. ", -1 /* CACHED */))], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Floating Action Button for Scroll to Top "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn transition shadow-sm scroll-top-btn",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.scrollToTop && $options.scrollToTop(...args)),
    onKeydown: [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.scrollToTop && $options.scrollToTop(...args), ["enter"])), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.scrollToTop && $options.scrollToTop(...args), ["prevent"]), ["space"]))],
    "aria-label": "Scroll to top",
    title: "Scroll to top"
  }, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-up"
  }, null, -1 /* CACHED */)]))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.showScrollToTop]])]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n/* Theming variables scoped under top container */\n.history-ui[data-v-8d557698] {\n  --hc-accent: #0b806f;\n  --hc-accent-2: #1a5f7a;\n  --hc-surface: #ffffff;\n  --hc-muted: #e2e8f0;\n  --hc-soft: #f7fafc;\n  --hc-text: #2d3748;\n  --hc-muted-text: #6b7280;\n}\n/* Mobile tweaks: keep actions compact and aligned */\n@media (max-width: 576px) {\n.text-end.mb-3[data-v-8d557698] { text-align: center !important;\n}\n.text-end.mb-3 .btn[data-v-8d557698] { width: auto; display: inline-flex; margin-bottom: 6px;\n}\n}\n/* Enhanced hover and focus effects for interactivity */\n.transition[data-v-8d557698] {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.transition[data-v-8d557698]:hover,\n.transition[data-v-8d557698]:focus {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;\n}\n/* Focus state for accessibility */\n.card-header[data-v-8d557698]:focus,\n.btn[data-v-8d557698]:focus {\n  box-shadow: 0 0 0 3px rgba(0, 191, 166, 0.3);\n  outline: none;\n}\n/* Button hover effect */\n.btn[data-v-8d557698]:hover:not(.btn-outline-dark) {\n  background-color: #009688;\n}\n/* Button hover effect for outline-dark */\n.btn-outline-dark[data-v-8d557698] { color: var(--hc-text); border-color: var(--hc-muted);\n}\n.btn-outline-dark[data-v-8d557698]:hover { background-color: #2d3748; color: #000;\n}\n/* Close button hover effect */\n.btn-sm:hover .bi-x[data-v-8d557698] {\n  color: #2d3748;\n}\n/* FAB hover effect */\n.btn:hover .bi-arrow-up[data-v-8d557698] {\n  transform: scale(1.1);\n}\n/* Card header cursor */\n.card-header[data-v-8d557698] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n/* Word count and read time styling */\n.text-muted[data-v-8d557698] { color: var(--hc-muted-text) !important;\n}\n/* Subtle fade for summary appear/disappear */\n.fade-enter-active[data-v-8d557698], .fade-leave-active[data-v-8d557698] { transition: opacity .2s ease;\n}\n.fade-enter-from[data-v-8d557698], .fade-leave-to[data-v-8d557698] { opacity: 0;\n}\n/* Clean summary box styles without inline CSS */\n.summary-box[data-v-8d557698] { background-color: var(--hc-soft); border: 2px solid rgb(103, 153, 103); border-radius: 20px;\n}\n/* Consistent, compact icon sizing and spacing */\n.btn i[data-v-8d557698] { font-size: 0.9rem;\n}\n/* Card polish */\n.card[data-v-8d557698] { border-radius: 20px;\n}\n.card-header[data-v-8d557698] { background: #fff; border-bottom: 1px solid var(--hc-muted);\n}\n.card[data-v-8d557698]:hover { box-shadow: 0 10px 18px rgba(26,95,122,0.10) !important;\n}\n.card-header .badge[data-v-8d557698] { background: var(--hc-accent) !important; border-color: var(--hc-accent) !important;\n}\n/* Title */\n/* .history-title { color: var(--hc-accent-2); letter-spacing: -0.01em; } */\n/* Section shell */\n.history-card[data-v-8d557698] { background: var(--hc-surface); border: 1px solid rgba(226,232,240,.6); box-shadow: 0 1px 4px rgba(0,0,0,0.03); margin-bottom: 0.875rem !important; border-radius: 20px; overflow: hidden;\n}\n.history-card-header[data-v-8d557698] { background: #ffffff; transition: background-color .15s ease; padding-top: .6rem !important; padding-bottom: .6rem !important;\n}\n.history-card-header[data-v-8d557698]:hover { background: #f9fbfc;\n}\n.history-card-header.is-open[data-v-8d557698] { background: #f7fbfa;\n}\n.section-index[data-v-8d557698] { color: #fff; background: var(--hc-accent) !important; border: 1px solid var(--hc-accent) !important; width: 36px; height: 36px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; box-shadow: 0 4px 10px rgba(11,128,111,0.18);\n}\n.muted-meta[data-v-8d557698] { font-size: 0.8rem;\n}\n.section-title[data-v-8d557698] { color: #1f2d3d; letter-spacing: 0;\n}\n.chev[data-v-8d557698] { font-size: .95rem; color: #5b6777; transition: transform .2s ease;\n}\n.history-card-header.is-open .chev[data-v-8d557698] { transform: rotate(180deg);\n}\n/* Action toolbar (segmented look) */\n.tool-actions[data-v-8d557698] { border-radius: 20px; overflow: hidden;\n}\n.tool-actions .btn[data-v-8d557698] { background: #fff; border-color: #e5eaf0; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-radius: 0; padding: .55rem .9rem;\n}\n.tool-actions .btn + .btn[data-v-8d557698] { border-left-color: #eef2f6;\n}\n.tool-actions .btn[data-v-8d557698]:hover { transform: translateY(-1px); box-shadow: 0 6px 14px rgba(26,95,122,0.12);\n}\n.tool-actions .btn i[data-v-8d557698] { color: #1f2d3d;\n}\n.tool-actions .btn[data-v-8d557698]:first-child { border-top-left-radius: 20px; border-bottom-left-radius: 20px;\n}\n.tool-actions .btn[data-v-8d557698]:last-child { border-top-right-radius: 20px; border-bottom-right-radius: 20px;\n}\n/* Open/Close soft primary button */\n.btn-primary-soft[data-v-8d557698] {\n  background: linear-gradient(135deg, var(--hc-accent), var(--hc-accent-2));\n  color: #fff; border: none; border-radius: 10px; padding: 0.4rem 0.8rem; font-size: 0.85rem;\n  box-shadow: 0 8px 18px rgba(26,95,122,0.18);\n}\n.btn-primary-soft[data-v-8d557698]:hover { transform: translateY(-1px); box-shadow: 0 12px 26px rgba(26,95,122,0.22);\n}\n/* Next step banner */\n.next-step-banner[data-v-8d557698] { position: relative; background: #eaf3f1; border: 1px solid rgba(11, 128, 111, 0.20); border-radius: 20px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.03), 0 10px 28px rgba(26,95,122,0.09); padding: 1.25rem 1.75rem;\n}\n.next-step-toggle[data-v-8d557698] { position: absolute; right: 14px; top: 14px; opacity: 0.95; background: transparent; border: 0; color: #6b8b91; z-index:3; cursor: pointer;\n}\n.icon-circle[data-v-8d557698] { width: 46px; height: 46px; border-radius: 50%; background: rgba(11, 128, 111, 0.20); display: flex; align-items: center; justify-content: center; color: var(--hc-accent); font-size: 1.35rem; box-shadow: inset 0 0 0 1px rgba(11, 128, 111, 0.26), 0 6px 14px rgba(26,95,122,0.10);\n}\n.next-step-eyebrow[data-v-8d557698] { letter-spacing: 0.1em; color: var(--hc-accent-2); font-size: 0.78rem;\n}\n.next-step-teaser[data-v-8d557698] { color: #1f2933;\n}\n.next-step-text[data-v-8d557698] { color: #1f2933; line-height: 1.8; font-size: 1.1rem;\n}\n.cta-btn[data-v-8d557698] { background: linear-gradient(135deg, var(--hc-accent), var(--hc-accent-2)); color: #fff; border: none; border-radius: 999px; box-shadow: 0 10px 20px rgba(26, 95, 122, 0.25); transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n.cta-btn[data-v-8d557698]:hover { transform: translateY(-2px); box-shadow: 0 14px 28px rgba(26, 95, 122, 0.28); color: #fff;\n}\n/* Section cards and labels */\n.section-card[data-v-8d557698] { background-color: var(--hc-soft); padding: 1.25rem 1.25rem; border: 0; border-radius: 20px;\n}\n.reference-card[data-v-8d557698] { background-color: #ffffff; padding: 1.25rem 1.25rem; border: 0; border-radius: 20px;\n}\n.section-label[data-v-8d557698] { font-weight: 600; color: var(--hc-accent); font-size: 1rem;\n}\n.section-label-icon[data-v-8d557698] { margin-right: 0.5rem; font-size: 1.1rem; vertical-align: -0.125rem;\n}\n.section-text[data-v-8d557698] { margin-top: 0.5rem; line-height: 1.7;\n}\n.section-answer[data-v-8d557698] { padding-left: 1.75rem; line-height: 1.7;\n}\n.list-clean[data-v-8d557698] { margin-bottom: 0; margin-top: 0.75rem; padding-left: 1.5rem; line-height: 1.7;\n}\n/* Tables */\ntable.table[data-v-8d557698] { border-color: var(--hc-muted);\n}\ntable.table thead[data-v-8d557698] { background: var(--hc-soft);\n}\ntable.table tbody tr[data-v-8d557698]:nth-child(odd) { background-color: #fbfdff;\n}\ntable.table tbody tr[data-v-8d557698]:hover { background: #f6fbfe;\n}\n.table-clean[data-v-8d557698] { background: #fff; border-color: var(--hc-muted);\n}\n.table-responsive[data-v-8d557698] { border-radius: 20px; overflow: hidden;\n}\n/* FAB */\n.scroll-top-btn[data-v-8d557698] { position: fixed; bottom: 20px; right: 20px; background: var(--hc-accent); color: #fff; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; z-index: 1000; box-shadow: 0 10px 22px rgba(26,95,122,0.25);\n}\n.scroll-top-btn i[data-v-8d557698] { font-size: 1.4rem;\n}\n.scroll-top-btn[data-v-8d557698]:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(26,95,122,0.3);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HistoryComponent_vue_vue_type_style_index_0_id_8d557698_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HistoryComponent_vue_vue_type_style_index_0_id_8d557698_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HistoryComponent_vue_vue_type_style_index_0_id_8d557698_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/HistoryComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/HistoryComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HistoryComponent_vue_vue_type_template_id_8d557698_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HistoryComponent.vue?vue&type=template&id=8d557698&scoped=true */ "./resources/js/components/HistoryComponent.vue?vue&type=template&id=8d557698&scoped=true");
/* harmony import */ var _HistoryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HistoryComponent.vue?vue&type=script&lang=js */ "./resources/js/components/HistoryComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _HistoryComponent_vue_vue_type_style_index_0_id_8d557698_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css */ "./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_HistoryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HistoryComponent_vue_vue_type_template_id_8d557698_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-8d557698"],['__file',"resources/js/components/HistoryComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/HistoryComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/HistoryComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HistoryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HistoryComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HistoryComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HistoryComponent_vue_vue_type_style_index_0_id_8d557698_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=style&index=0&id=8d557698&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/HistoryComponent.vue?vue&type=template&id=8d557698&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/HistoryComponent.vue?vue&type=template&id=8d557698&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HistoryComponent_vue_vue_type_template_id_8d557698_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HistoryComponent_vue_vue_type_template_id_8d557698_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HistoryComponent.vue?vue&type=template&id=8d557698&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/HistoryComponent.vue?vue&type=template&id=8d557698&scoped=true");


/***/ }),

/***/ "./resources/js/components/quran_info.json":
/*!*************************************************!*\
  !*** ./resources/js/components/quran_info.json ***!
  \*************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"title":"History of the Quran","introduction":{"purpose":"This document provides an in-depth exploration of the history of the Quran, the central religious text of Islam, revered by Muslims as the literal word of God (Allah) revealed to the Prophet Muhammad.","scope":"The response covers the revelation, compilation, standardization, preservation, historical significance, linguistic development, and global influence of the Quran, with a focus on its historical journey and enduring impact.","context":"The Quran is not only a spiritual guide but also a historical, linguistic, and cultural artifact that has shaped Islamic civilization for over 1,400 years. Its history reflects meticulous efforts to preserve its authenticity and its role as a cornerstone of Islamic identity."},"sections":[{"title":"Revelation of the Quran","overview":"The Quran was revealed to the Prophet Muhammad over approximately 23 years, from 610 CE to 632 CE, in the Arabian cities of Mecca and Medina.","details":{"initial_revelation":"The first revelation occurred in 610 CE in the Cave of Hira, where the angel Gabriel (Jibril) conveyed the first verses of Surah Al-Alaq (96:1–5) to Muhammad, who was 40 years old. This event, known as Laylat al-Qadr (Night of Power), marks the beginning of Muhammad’s prophethood.","gradual_process":"The Quran was revealed in stages, addressing specific events, questions, or needs of the early Muslim community. This incremental approach, known as tadrij, allowed for practical implementation and adaptation of its teachings.","meccan_and_medinan_phases":{"meccan_phase_610_622_ce":"Comprising roughly 86 surahs, these revelations focused on monotheism (tawhid), morality, stories of past prophets, and spiritual guidance. They addressed a largely hostile, polytheistic audience in Mecca.","medinan_phase_622_632_ce":"Comprising about 28 surahs, these revelations included legal, social, and governance guidelines, reflecting the establishment of a Muslim community in Medina after the Hijra (migration)."},"oral_transmission":"In a largely illiterate 7th-century Arabian society, the Quran was primarily transmitted orally. Muhammad memorized and recited the revelations, and his followers, known as the Sahaba (Companions), committed them to memory.","role_of_recitation":"The term \'Quran\' means \'recitation\' in Arabic, emphasizing its oral nature. Its rhythmic and poetic structure facilitated memorization and public recitation."},"significance":"The oral tradition ensured rapid dissemination and preservation, with the Quran’s unique linguistic style serving as a mnemonic device for early Muslims."},{"title":"Early Compilation (During and After Muhammad’s Lifetime)","overview":"While primarily oral during Muhammad’s lifetime, written efforts began early, with a formal compilation initiated shortly after his death in 632 CE.","details":{"during_muhammad’s_lifetime":{"scribes":"Muhammad dictated revelations to scribes, including Zayd ibn Thabit, Ali ibn Abi Talib, Umar ibn al-Khattab, and Uthman ibn Affan, who recorded them on materials like parchment, bones, leather, and palm leaves.","review":"The Prophet reviewed the arrangement of verses and surahs under divine guidance, ensuring their correct order.","personal_copies":"Some Companions, like Abdullah ibn Mas’ud, maintained personal copies for study, though these were not standardized."},"after_muhammad’s_death":{"need_for_compilation":"The death of many Quran memorizers (huffaz) in the Battle of Yamama (632–633 CE) during the Ridda Wars prompted fears of losing parts of the Quran.","abu_bakr’s_initiative_632_634_ce":"The first caliph, Abu Bakr, tasked Zayd ibn Thabit with compiling a complete written version. Zayd, known for his meticulousness, collected oral recitations and written fragments, verifying them with multiple witnesses.","methodology":"Zayd only accepted texts that were written in Muhammad’s presence and corroborated by at least two memorizers, ensuring authenticity.","result":"A single collection of sheets (suhuf) was compiled and entrusted to Abu Bakr, later passed to Umar, and then to Umar’s daughter, Hafsa, for safekeeping."},"challenges":["Variations in recitation due to regional Arabic dialects (e.g., Quraysh, Hudhayl).","Limited writing materials and low literacy rates in early Islamic society.","Ensuring the inclusion of all revelations, including those revealed late in Muhammad’s life."]},"significance":"This effort preserved the Quran’s text during a critical period, preventing loss amid political and military turmoil."},{"title":"Standardization Under Uthman (644–656 CE)","overview":"The third caliph, Uthman ibn Affan, standardized the Quran to resolve disputes over recitations and ensure textual uniformity across the expanding Islamic empire.","details":{"motivation":"By the 640s CE, the Islamic empire spanned regions with diverse Arabic dialects, leading to variations in pronunciation and recitation (qira’at). Disputes, particularly between reciters in Iraq and Syria, necessitated a unified text.","uthman’s_compilation":{"committee":"Uthman formed a committee led by Zayd ibn Thabit, with members like Abdullah ibn Zubayr and Sa’id ibn al-As, to produce a standardized text.","source":"The committee used Hafsa’s suhuf as the primary source, cross-verifying with oral recitations and written records from other Companions.","dialect":"The text was written in the Quraysh dialect, considered the most authoritative as it was Muhammad’s dialect.","script":"The script used was an early Arabic script without diacritical marks (dots or vowels), as these were not yet standardized."},"distribution_and_standardization":["Around 650 CE, Uthman distributed copies of the standardized mushaf to major Islamic centers, including Mecca, Medina, Kufa, Basra, and Damascus.","He ordered the destruction of non-standardized texts to prevent confusion, though some variant recitations were later recognized as valid.","Each copy was accompanied by a reciter to teach the correct pronunciation, ensuring consistency."],"impact":"The Uthmanic codex became the definitive written Quran, eliminating major textual disputes and fostering unity."},"significance":"Uthman’s standardization preserved the Quran’s integrity, making it one of the most consistently transmitted ancient texts."},{"title":"Preservation and Transmission","overview":"The Quran’s preservation relies on a robust dual system of oral memorization and written records, ensuring its unchanged transmission for over 14 centuries.","details":{"oral_tradition":{"memorization":"Memorization (hifz) is a central Islamic practice. Millions of Muslims, known as hafiz, memorize the entire Quran (approximately 604 pages in standard editions).","structure":"The Quran’s poetic structure, including rhyme, rhythm, and assonance, aids memorization. Its division into 30 parts (juz) and 114 surahs facilitates learning.","transmission":"Chains of transmission (isnad) for recitation ensure accuracy, with students learning from certified teachers tracing back to the Prophet."},"written_tradition":{"copying":"The Uthmanic codex was copied with strict protocols to avoid errors. Scribes followed rules for letter placement and page layout.","manuscripts":"Early manuscripts, such as the Sana’a manuscripts (7th–8th century), Topkapi Codex (8th century), and Samarkand Codex, confirm the Uthmanic text’s consistency.","diacritical_marks":"The development of diacritical marks and vowel signs (tashkil) in the 8th–9th centuries by scholars like Abu al-Aswad al-Du’ali enhanced readability without altering the text."},"qira_at_variant_readings":{"formalization":"Seven canonical recitation styles (qira’at) were formalized by Ibn Mujahid in the 10th century, accommodating minor vocal variations (e.g., pronunciation or emphasis) while preserving the text’s meaning.","examples":"Examples include the Qira’at of Nafi’ (Medina) and Asim (Kufa), which remain widely used today.","basis":"These variations are considered divinely sanctioned, based on a hadith where Muhammad stated the Quran was revealed in seven ahruf (modes)."},"modern_preservation":{"printed_edition":"The 1924 Cairo edition, based on the Asim recitation, is the standard printed Quran today, widely adopted globally.","digital_tools":"Digital platforms, such as Quran.com and mobile apps, provide accurate texts and recitations, often with translations and tafsir (exegesis).","verification":"Modern studies, including carbon-dated manuscripts (e.g., Birmingham Quran manuscript, dated to 568–645 CE), confirm the Quran’s early and consistent transmission."}},"significance":"The dual oral-written system, combined with rigorous scholarly oversight, has made the Quran uniquely resistant to textual corruption."},{"title":"Linguistic Development and the Quran’s Role in Arabic","overview":"The Quran standardized and enriched the Arabic language, shaping its grammar, vocabulary, and literary tradition.","details":{"pre_islamic_arabic":"Before the Quran, Arabic was primarily an oral language with regional dialects and limited written standardization.","quranic_influence":{"style":"The Quran’s eloquent style, known as i’jaz (inimitability), set a new standard for Arabic literature, blending poetic rhythm with prose-like clarity.","impact":"It introduced new linguistic constructs, enriched vocabulary, and standardized grammar, particularly through the Quraysh dialect."},"script_development":{"early_script":"Early Quranic manuscripts used a script without diacritical marks or vowels, leading to potential ambiguities in reading.","advancements":"By the 8th century, scholars like Abu al-Aswad al-Du’ali and Khalil ibn Ahmad al-Farahidi developed diacritical marks and vowel signs, improving accessibility.","evolution":"The Kufic script, used in early manuscripts, evolved into more readable scripts like Naskh, now standard for printed Qurans."},"literary_impact":{"inspiration":"The Quran inspired Arabic poetry, prose, and calligraphy, with its verses serving as a model for literary excellence.","grammar":"It influenced the development of Arabic grammar texts, such as Sibawayh’s Al-Kitab (8th century), the first systematic grammar of Arabic."},"cultural_legacy":"The Quran’s linguistic standardization unified diverse Arab tribes and facilitated communication across the Islamic empire."},"significance":"The Quran’s linguistic contributions elevated Arabic to a global language of religion, science, and culture, a status it retains today."},{"title":"Historical Significance and Impact","overview":"The Quran’s history is a story of textual preservation and a catalyst for religious, cultural, and intellectual developments in Islamic civilization.","details":{"religious_impact":{"guidance":"The Quran is the primary source of Islamic theology, law (Sharia), and ethics, guiding over 1.9 billion Muslims in worship, morality, and daily life.","sciences":"It inspired Islamic sciences, including: Tafsir (exegesis, e.g., Tafsir Ibn Kathir and Tafsir al-Tabari), Fiqh (jurisprudence, forming the basis of legal schools like Hanafi, Maliki), Hadith (Prophetic traditions, compiled to contextualize Quranic verses)."},"cultural_and_intellectual_impact":{"standardization":"The Quran standardized Arabic, influencing literature, poetry, and calligraphy. Masterpieces like the Blue Quran (9th–10th century) showcase its artistic legacy.","education":"It spurred educational institutions (madrasas), where Quranic studies were central, fostering scholarship in theology, astronomy, and medicine.","golden_age":"The Quran’s emphasis on knowledge (e.g., Surah Al-Alaq: \'Read!\') inspired the Islamic Golden Age (8th–13th centuries)."},"global_influence":{"spread":"The Quran’s spread accompanied Islamic conquests, influencing regions from Spain (Al-Andalus) to Indonesia.","translations":"Translations into over 100 languages, starting with Salman the Persian’s partial Persian translation in the 7th century, have made it globally accessible, though the Arabic text remains authoritative for worship."},"challenges_and_controversies":{"scholarly_debates":"Western scholars, like Patricia Crone, have questioned the Quran’s origins, though mainstream Islamic scholarship upholds its divine and historical authenticity.","manuscripts":"Variant manuscripts, like the Sana’a palimpsest, show minor differences (e.g., word order) that align with known qira’at, reinforcing the text’s stability."}},"significance":"The Quran’s history reflects its role as a unifying force in Islam and a foundational text for one of the world’s major religions."},{"title":"Comparative Analysis of Preservation Methods","overview":"The Quran’s preservation is unique compared to other ancient religious texts, such as the Bible, Torah, or Vedas.","table":[{"text":"Quran","primary_preservation_method":"Oral and written","standardization_timeline":"~650 CE (Uthmanic codex)","variants":"Minimal, canonical qira’at"},{"text":"Bible","primary_preservation_method":"Written manuscripts","standardization_timeline":"4th CE (e.g., Codex Sinaiticus)","variants":"Numerous textual variants (e.g., 400,000 in New Testament)"},{"text":"Torah","primary_preservation_method":"Written scrolls","standardization_timeline":"~4th CE (Masoretic Text)","variants":"Minor variants, standardized later"},{"text":"Vedas","primary_preservation_method":"Oral tradition","standardization_timeline":"Written ~1000 CE","variants":"Regional recitation variations"}],"insights":["The Quran’s dual oral-written preservation, with early standardization, contrasts with the Bible’s reliance on later manuscript traditions and the Vedas’ delayed written record.","The Quran’s minimal variants (within qira’at) enhance its textual reliability compared to texts with more significant variations.","The emphasis on memorization distinguishes the Quran, as no other major text maintains such a widespread, continuous oral tradition."]},{"title":"Archaeological and Manuscript Evidence","overview":"Archaeological findings and early manuscripts provide tangible evidence of the Quran’s early compilation and preservation.","details":{"birmingham_quran_manuscript":{"description":"Contains parts of Surahs 18–20, written in Hijazi script.","dating":"Carbon dating places it within or shortly after Muhammad’s lifetime (568–645 CE), confirming early written transmission."},"sana_a_manuscripts":{"description":"Discovered in 1972 in Yemen, these include a lower text (palimpsest) with minor variations and an upper text aligning with the Uthmanic codex.","significance":"Variations are consistent with known qira’at, supporting the text’s stability."},"topkapi_codex":{"description":"A nearly complete Quran manuscript in Istanbul, closely matching the modern standard text.","dating":"8th century, features early Kufic script, reflecting the artistic and scribal standards of the time."},"samarkand_codex":{"description":"In Tashkent, attributed to Uthman’s era (though likely a later copy), it demonstrates the continuity of the Uthmanic text.","dating":"8th–9th century."},"other_evidence":["Inscriptions on the Dome of the Rock (691 CE) quote Quranic verses, confirming their early circulation.","Papyri fragments from Egypt (7th century) align with the standardized text."]},"significance":"These artifacts validate the Quran’s early written record and its consistency with the oral tradition, countering claims of later composition."},{"title":"Practical Applications and Modern Relevance","overview":"The Quran remains central to Islamic practice, education, and cultural preservation, with applications in modern contexts.","details":{"applications":[{"name":"Religious Practice","description":"The Quran guides daily prayers (salah), Ramadan recitations (taraweeh), and life events (e.g., marriage, funerals)."},{"name":"Education","description":"Quranic studies form the core of Islamic curricula, with institutions like Al-Azhar (Egypt) and Darul Uloom (India) training scholars."},{"name":"Interfaith Dialogue","description":"Understanding the Quran’s history fosters discussions with other religious communities, emphasizing shared values like monotheism."},{"name":"Cultural Preservation","description":"Calligraphy and recitation competitions preserve the Quran’s artistic and oral traditions."}],"recommendations":[{"name":"Study the Quran","description":"Use reputable tafsir (e.g., Tafsir Ibn Kathir, Tafsir al-Jalalayn) for contextual understanding."},{"name":"Learn Arabic","description":"To appreciate the Quran’s linguistic nuances and engage with its original text."},{"name":"Explore Manuscripts","description":"Visit digital archives (e.g., British Library, UNESCO Memory of the World) or exhibitions to study early Quranic manuscripts."},{"name":"Engage with Technology","description":"Use apps like Quran Explorer or Ayat for accurate recitations and translations."}],"challenges":["Misinterpretations can arise without scholarly guidance, especially in translations lacking context.","Cultural and political uses of the Quran can lead to polarized interpretations.","Balancing traditional memorization with modern educational methods in Islamic schools."]}}],"conclusion":{"summary":"The Quran’s history spans its revelation to Muhammad (610–632 CE), early compilation under Abu Bakr (632–634 CE), standardization under Uthman (650 CE), and meticulous preservation through oral and written traditions. Its linguistic contributions standardized Arabic, while its religious and cultural impact shaped Islamic civilization and beyond. Archaeological evidence, like the Birmingham and Sana’a manuscripts, confirms its early and consistent transmission.","final_thoughts":"The Quran’s preservation, through a unique dual system of memorization and transcription, sets it apart as a remarkably stable text. Its influence on language, law, and culture underscores its enduring legacy as a global religious and historical artifact.","call_to_action":"Engage with the Quran through study, recitation, or exploration of its historical manuscripts. Consult scholarly resources to deepen understanding and appreciate its role in shaping human history."},"references":{"islamic_sources":["Sahih al-Bukhari, Sahih Muslim (hadiths on compilation)","Tafsir Ibn Kathir, Tafsir al-Tabari"],"historical_studies":["Theodor Nöldeke, \'The History of the Qur’an\'","Fred Donner, \'Narratives of Islamic Origins\'"],"manuscripts":["Birmingham Quran Manuscript (University of Birmingham)","Sana’a Manuscripts (Yemen)","Topkapi Codex (Istanbul)"],"other":["UNESCO Memory of the World Register","Islamic calligraphy collections (e.g., Metropolitan Museum of Art)"],"note":"No real-time web or X searches were needed, as the Quran’s history is well-documented in classical and modern sources."}}');

/***/ })

}]);