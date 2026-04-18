"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_IslamComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var _data_discover_islam_content_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/discover-islam-content.json */ "./resources/data/discover-islam-content.json");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'DiscoverIslam',
  data() {
    return {
      configData: _data_discover_islam_content_json__WEBPACK_IMPORTED_MODULE_2__,
      navScrolled: false,
      mobileMenuOpen: false,
      searchQuery: '',
      searchFocused: false,
      copiedSectionId: null,
      showScrollTop: false,
      aiSummarySectionId: null,
      aiSummaryPoints: [],
      // Fixed: single definition with intended default scale
      sectionFontScale: {
        shahada: 1.15,
        allah_quote: 1.15,
        prophet: 1.15,
        quran: 1.15,
        salah: 1.15,
        zakat: 1.15,
        sawm: 1.15,
        hajj: 1.15,
        afterlife: 1.15
      },
      // Fixed: reactive FAQs (was mutating a computed property)
      faqs: _data_discover_islam_content_json__WEBPACK_IMPORTED_MODULE_2__.faqs ? _data_discover_islam_content_json__WEBPACK_IMPORTED_MODULE_2__.faqs.map(faq => _objectSpread(_objectSpread({}, faq), {}, {
        open: false
      })) : [],
      sections: _data_discover_islam_content_json__WEBPACK_IMPORTED_MODULE_2__.searchSections || [],
      beforeUnloadHandler: null,
      scrollSaveHandler: null,
      documentClickHandler: null,
      sectionObserver: null
    };
  },
  computed: {
    filteredSections() {
      const q = this.searchQuery.trim().toLowerCase();
      if (!q) return [];
      return this.sections.filter(s => s.title.toLowerCase().includes(q) || s.excerpt.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)).slice(0, 5);
    },
    // Fixed: now returns the reactive data array
    faqsList() {
      return this.faqs;
    },
    websitesList() {
      const sites = [];
      if (this.configData.appsAndResources && this.configData.appsAndResources.websites) {
        sites.push(...this.configData.appsAndResources.websites.map(site => _objectSpread(_objectSpread({}, site), {}, {
          icon: '🌐'
        })));
      }
      if (this.configData.sources) {
        sites.push(...this.configData.sources.map(source => _objectSpread(_objectSpread({}, source), {}, {
          icon: '📚',
          description: 'Authoritative source'
        })));
      }
      return sites;
    }
  },
  methods: {
    getToolEl(id) {
      const map = {
        shahada: 'tool_shahada',
        allah_quote: 'tool_allah_quote',
        prophet: 'tool_prophet',
        quran: 'tool_quran',
        salah: 'tool_salah',
        zakat: 'tool_zakat',
        sawm: 'tool_sawm',
        hajj: 'tool_hajj',
        afterlife: 'tool_afterlife'
      };
      const refKey = map[id];
      if (refKey && this.$refs[refKey]) return this.$refs[refKey];
      return document.getElementById(id);
    },
    getToolText(id) {
      const el = this.getToolEl(id);
      if (!el) return '';
      return (el.innerText || '').trim();
    },
    triggerSearch() {
      if (this.filteredSections.length > 0) {
        this.scrollToSection(this.filteredSections[0].id);
      }
    },
    scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      this.searchQuery = '';
      this.mobileMenuOpen = false;
    },
    // Fixed: now mutates the reactive data array instead of computed
    toggleFaq(index) {
      const wasOpen = this.faqs[index].open;
      this.faqs.forEach(f => f.open = false);
      if (!wasOpen) this.faqs[index].open = true;
    },
    shareWhatsApp(sectionId) {
      const text = this.getToolText(sectionId);
      const url = `${window.location.origin}${window.location.pathname}#${sectionId === 'allah_quote' ? 'allah' : sectionId}`;
      const payload = [text, '', url].filter(Boolean).join('\n');
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(payload)}`, '_blank', 'noopener,noreferrer');
    },
    async copyToClipboard(sectionId) {
      const text = this.getToolText(sectionId);
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        this.copiedSectionId = sectionId;
        window.setTimeout(() => {
          if (this.copiedSectionId === sectionId) this.copiedSectionId = null;
        }, 1400);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
        } catch (_) {}
        document.body.removeChild(ta);
        this.copiedSectionId = sectionId;
        window.setTimeout(() => {
          if (this.copiedSectionId === sectionId) this.copiedSectionId = null;
        }, 1400);
      }
    },
    printSection(sectionId) {
      const targetEl = this.getToolEl(sectionId);
      if (!targetEl) return;
      const section = targetEl.closest('.di-section');
      if (!section) return;
      const cloneSection = section.cloneNode(true);
      cloneSection.classList.add('print-target');
      cloneSection.style.display = 'block';
      cloneSection.style.padding = '20px';
      cloneSection.style.backgroundColor = '#ffffff';
      cloneSection.style.color = '#000000';
      const printContainer = document.createElement('div');
      printContainer.id = 'print-container';
      printContainer.className = 'print-target';
      printContainer.appendChild(cloneSection);
      const existingContainer = document.getElementById('print-container');
      if (existingContainer) existingContainer.remove();
      document.body.appendChild(printContainer);
      document.body.classList.add('print-mode');
      let printStyles = document.getElementById('temp-print-styles');
      if (!printStyles) {
        printStyles = document.createElement('style');
        printStyles.id = 'temp-print-styles';
        document.head.appendChild(printStyles);
      }
      printStyles.textContent = `
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-container, #print-container * {
            visibility: visible !important;
          }
          #print-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
          }
          .section-tools, .ai-summary-inline, .scroll-top-fab, .tool-pill, .tool-circle {
            display: none !important;
          }
          .di-section {
            opacity: 1 !important;
            transform: none !important;
          }
          img {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      `;
      const cleanupPrint = () => {
        document.body.classList.remove('print-mode');
        if (printContainer.parentNode) printContainer.remove();
        if (printStyles) printStyles.remove();
      };
      window.addEventListener('afterprint', cleanupPrint, {
        once: true
      });
      window.setTimeout(() => {
        window.print();
        window.setTimeout(cleanupPrint, 500);
      }, 0);
    },
    async downloadPdf(sectionId) {
      const el = this.getToolEl(sectionId);
      if (!el) return;
      const mediaToHide = el.querySelectorAll('iframe, video');
      mediaToHide.forEach(media => {
        media.dataset.origDisplay = media.style.display;
        media.style.display = 'none';
      });
      const origPadding = el.style.padding;
      const origBg = el.style.background;
      el.style.padding = '32px';
      el.style.background = '#ffffff';
      let canvas;
      try {
        canvas = await html2canvas__WEBPACK_IMPORTED_MODULE_0___default()(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          ignoreElements: element => {
            return element.tagName === 'IFRAME' || element.tagName === 'VIDEO';
          }
        });
      } finally {
        el.style.padding = origPadding;
        el.style.background = origBg;
        mediaToHide.forEach(media => {
          media.style.display = media.dataset.origDisplay || '';
          delete media.dataset.origDisplay;
        });
      }
      const pdf = new jspdf__WEBPACK_IMPORTED_MODULE_1__.jsPDF('p', 'pt', 'a4');
      const margin = 48;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Draw title
      const titleMap = {
        shahada: 'The Shahada — First Pillar',
        allah_quote: 'Who is Allah? — Theology',
        prophet: 'Prophet Muhammad ﷺ — Prophethood',
        quran: 'The Holy Quran — Scripture',
        salah: 'Salah — Five Daily Prayers',
        zakat: 'Zakat — Obligatory Charity',
        sawm: 'Sawm — Fasting in Ramadan',
        hajj: 'Hajj — Pilgrimage to Makkah',
        afterlife: 'The Afterlife (Akhirah)'
      };
      const title = titleMap[sectionId] || sectionId;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(22, 101, 52); // green-800
      pdf.text(title, margin, margin);
      pdf.setDrawColor(22, 101, 52);
      pdf.setLineWidth(0.5);
      pdf.line(margin, margin + 8, pageWidth - margin, margin + 8);
      const contentY = margin + 24;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - contentY - margin;
      const ratio = Math.min(availableWidth / canvas.width, availableHeight / canvas.height);
      const imgWidth = canvas.width * ratio;

      // Paginate slices
      let sourceY = 0;
      let firstPage = true;
      const sliceHeightPx = availableHeight / ratio;
      while (sourceY < canvas.height) {
        if (!firstPage) {
          pdf.addPage();
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(11);
          pdf.setTextColor(150, 150, 150);
          pdf.text(title, margin, margin - 12);
        }
        const startY = firstPage ? contentY : margin;
        firstPage = false;
        const remainingSource = canvas.height - sourceY;
        const thisSliceH = Math.min(sliceHeightPx, remainingSource);
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = thisSliceH;
        const ctx = sliceCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(canvas, 0, sourceY, canvas.width, thisSliceH, 0, 0, canvas.width, thisSliceH);
        const sliceData = sliceCanvas.toDataURL('image/png');
        const renderedH = thisSliceH * ratio;
        pdf.addImage(sliceData, 'PNG', margin, startY, imgWidth, renderedH);
        sourceY += thisSliceH;
      }
      const safeName = sectionId.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
      pdf.save(`discover-islam-${safeName}.pdf`);
    },
    increaseFont(sectionId) {
      const cur = this.sectionFontScale[sectionId] || 1;
      this.sectionFontScale[sectionId] = Math.min(1.25, Math.round((cur + 0.05) * 100) / 100);
    },
    decreaseFont(sectionId) {
      const cur = this.sectionFontScale[sectionId] || 1;
      this.sectionFontScale[sectionId] = Math.max(0.9, Math.round((cur - 0.05) * 100) / 100);
    },
    toggleAiSummary(sectionId) {
      if (this.aiSummarySectionId === sectionId) {
        this.aiSummarySectionId = null;
        this.aiSummaryPoints = [];
        return;
      }
      const text = this.getToolText(sectionId);
      const cleaned = text.replace(/\s+/g, ' ').trim();
      const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
      const points = [];
      // Fixed: removed ellipsis truncation — now shows full sentences (no "...")
      for (const s of sentences.slice(0, 5)) {
        const fullSentence = s.trim();
        if (fullSentence && !points.includes(fullSentence)) points.push(fullSentence);
      }
      this.aiSummarySectionId = sectionId;
      this.aiSummaryPoints = points.length ? points : ['No summary available for this section yet.'];
    },
    reportSection(sectionId) {
      const text = this.getToolText(sectionId).slice(0, 1200);
      const title = sectionId === 'allah_quote' ? 'Quran quote' : sectionId;
      const url = `${window.location.origin}${window.location.pathname}#${sectionId === 'allah_quote' ? 'allah' : sectionId}`;
      const params = new URLSearchParams({
        subject: `Report issue: ${title}`,
        message: `${url}\n\n${text}`
      });
      window.location.href = `/contact?${params.toString()}`;
    },
    handleScroll() {
      this.navScrolled = window.scrollY > 60;
      this.showScrollTop = window.scrollY > 700;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  mounted() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Restore saved scroll position
    const savedScroll = sessionStorage.getItem('discover-islam-scroll');
    if (savedScroll && !window.location.hash) {
      this.$nextTick(() => {
        window.scrollTo(0, parseInt(savedScroll));
      });
    }
    this.beforeUnloadHandler = () => {
      sessionStorage.setItem('discover-islam-scroll', window.scrollY);
    };
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    let scrollTimer;
    this.scrollSaveHandler = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        sessionStorage.setItem('discover-islam-scroll', window.scrollY);
      }, 200);
    };
    window.addEventListener('scroll', this.scrollSaveHandler, {
      passive: true
    });

    // Handle hash links (don't override manual scroll)
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    }
    window.addEventListener('scroll', this.handleScroll, {
      passive: true
    });
    this.sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          this.sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -50px 0px'
    });
    document.querySelectorAll('.di-section').forEach(el => this.sectionObserver.observe(el));
    this.documentClickHandler = e => {
      if (!e.target.closest('.hero-search-wrap')) this.searchQuery = '';
    };
    document.addEventListener('click', this.documentClickHandler);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.beforeUnloadHandler) window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    if (this.scrollSaveHandler) window.removeEventListener('scroll', this.scrollSaveHandler);
    if (this.documentClickHandler) document.removeEventListener('click', this.documentClickHandler);
    if (this.sectionObserver) this.sectionObserver.disconnect();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "discover-islam"
};
const _hoisted_2 = {
  class: "di-hero"
};
const _hoisted_3 = {
  class: "container-fluid hero-container"
};
const _hoisted_4 = {
  class: "hero-grid"
};
const _hoisted_5 = {
  class: "hero-content"
};
const _hoisted_6 = {
  class: "hero-eyebrow"
};
const _hoisted_7 = {
  class: "eyebrow-text"
};
const _hoisted_8 = {
  class: "hero-headline"
};
const _hoisted_9 = {
  class: "headline-main"
};
const _hoisted_10 = {
  class: "hero-desc"
};
const _hoisted_11 = {
  class: "hero-actions"
};
const _hoisted_12 = {
  class: "hero-search-wrap"
};
const _hoisted_13 = {
  key: 0,
  class: "search-dropdown"
};
const _hoisted_14 = ["onClick"];
const _hoisted_15 = {
  class: "hit-icon"
};
const _hoisted_16 = {
  class: "hit-info"
};
const _hoisted_17 = {
  class: "hit-title"
};
const _hoisted_18 = {
  class: "hit-excerpt"
};
const _hoisted_19 = {
  class: "hero-pillars"
};
const _hoisted_20 = {
  class: "chip-num text-white"
};
const _hoisted_21 = {
  class: "chip-label text-white"
};
const _hoisted_22 = {
  class: "di-main"
};
const _hoisted_23 = {
  class: "di-disclaimer"
};
const _hoisted_24 = {
  class: "disclaimer-text"
};
const _hoisted_25 = {
  class: "di-section",
  id: "basics"
};
const _hoisted_26 = {
  class: "section-lead"
};
const _hoisted_27 = {
  class: "section-tools section-tools--secondary",
  "aria-label": "Section tools"
};
const _hoisted_28 = {
  class: "twin-grid"
};
const _hoisted_29 = {
  class: "twin-card card-faith"
};
const _hoisted_30 = {
  class: "twin-card-header"
};
const _hoisted_31 = {
  class: "check-list"
};
const _hoisted_32 = {
  class: "ref-pill"
};
const _hoisted_33 = {
  class: "twin-card card-pillars"
};
const _hoisted_34 = {
  class: "twin-card-header"
};
const _hoisted_35 = {
  class: "check-list"
};
const _hoisted_36 = {
  class: "ref-pill"
};
const _hoisted_37 = {
  class: "di-section",
  id: "shahada"
};
const _hoisted_38 = {
  class: "section-tools",
  "aria-label": "Section tools"
};
const _hoisted_39 = {
  key: 0,
  class: "ai-summary-inline",
  role: "note"
};
const _hoisted_40 = {
  class: "ai-summary-points"
};
const _hoisted_41 = {
  class: "shahada-inner"
};
const _hoisted_42 = {
  class: "shd-arabic"
};
const _hoisted_43 = {
  class: "shd-roman"
};
const _hoisted_44 = {
  class: "shd-trans"
};
const _hoisted_45 = {
  class: "shd-body"
};
const _hoisted_46 = {
  class: "ref-pill centered"
};
const _hoisted_47 = {
  class: "di-section",
  id: "allah"
};
const _hoisted_48 = {
  class: "split-text"
};
const _hoisted_49 = {
  class: "section-lead"
};
const _hoisted_50 = {
  class: "section-tools section-tools--compact",
  "aria-label": "Quote tools"
};
const _hoisted_51 = {
  class: "quran-quote"
};
const _hoisted_52 = {
  class: "split-names"
};
const _hoisted_53 = {
  class: "names-title"
};
const _hoisted_54 = {
  class: "names-cloud"
};
const _hoisted_55 = ["title"];
const _hoisted_56 = {
  class: "name-ar"
};
const _hoisted_57 = {
  class: "name-en"
};
const _hoisted_58 = {
  class: "di-section",
  id: "prophet"
};
const _hoisted_59 = {
  class: "section-tools",
  "aria-label": "Section tools"
};
const _hoisted_60 = {
  key: 0,
  class: "ai-summary-inline",
  role: "note"
};
const _hoisted_61 = {
  class: "ai-summary-points"
};
const _hoisted_62 = {
  class: "prophet-img-col"
};
const _hoisted_63 = {
  class: "prophet-img-frame"
};
const _hoisted_64 = ["src"];
const _hoisted_65 = {
  class: "prophet-text-col"
};
const _hoisted_66 = {
  class: "body-copy"
};
const _hoisted_67 = {
  class: "star-list"
};
const _hoisted_68 = {
  class: "twin-refs"
};
const _hoisted_69 = {
  class: "ref-pill"
};
const _hoisted_70 = {
  class: "ref-pill"
};
const _hoisted_71 = {
  class: "di-section",
  id: "quran"
};
const _hoisted_72 = {
  class: "section-tools",
  "aria-label": "Section tools"
};
const _hoisted_73 = {
  key: 0,
  class: "ai-summary-inline",
  role: "note"
};
const _hoisted_74 = {
  class: "ai-summary-points"
};
const _hoisted_75 = {
  class: "split-text"
};
const _hoisted_76 = {
  class: "section-lead"
};
const _hoisted_77 = {
  class: "fact-strips"
};
const _hoisted_78 = {
  class: "fs-num"
};
const _hoisted_79 = {
  class: "fs-label"
};
const _hoisted_80 = {
  class: "quran-quote"
};
const _hoisted_81 = {
  class: "split-img"
};
const _hoisted_82 = {
  class: "img-frame-green"
};
const _hoisted_83 = ["src"];
const _hoisted_84 = {
  class: "di-section",
  id: "salah"
};
const _hoisted_85 = {
  class: "section-tools",
  "aria-label": "Section tools"
};
const _hoisted_86 = {
  key: 0,
  class: "ai-summary-inline",
  role: "note"
};
const _hoisted_87 = {
  class: "ai-summary-points"
};
const _hoisted_88 = {
  class: "prayer-timeline"
};
const _hoisted_89 = {
  class: "prayer-sky"
};
const _hoisted_90 = {
  class: "prayer-time-badge"
};
const _hoisted_91 = {
  class: "prayer-name"
};
const _hoisted_92 = {
  class: "prayer-arabic"
};
const _hoisted_93 = {
  class: "prayer-rakah"
};
const _hoisted_94 = {
  class: "split-layout",
  style: {
    "margin-top": "3rem"
  }
};
const _hoisted_95 = {
  class: "split-text"
};
const _hoisted_96 = {
  class: "body-copy"
};
const _hoisted_97 = {
  class: "quran-quote"
};
const _hoisted_98 = {
  class: "split-img"
};
const _hoisted_99 = {
  class: "img-frame-green"
};
const _hoisted_100 = ["src"];
const _hoisted_101 = {
  class: "di-section",
  id: "zakat"
};
const _hoisted_102 = {
  class: "section-tools",
  "aria-label": "Section tools"
};
const _hoisted_103 = {
  key: 0,
  class: "ai-summary-inline",
  role: "note"
};
const _hoisted_104 = {
  class: "ai-summary-points"
};
const _hoisted_105 = {
  class: "split-text"
};
const _hoisted_106 = {
  class: "section-lead"
};
const _hoisted_107 = {
  class: "quran-quote"
};
const _hoisted_108 = {
  class: "split-text"
};
const _hoisted_109 = {
  class: "zakat-grid"
};
const _hoisted_110 = {
  class: "di-section",
  id: "sawm"
};
const _hoisted_111 = {
  class: "section-tools",
  "aria-label": "Section tools"
};
const _hoisted_112 = {
  key: 0,
  class: "ai-summary-inline",
  role: "note"
};
const _hoisted_113 = {
  class: "ai-summary-points"
};
const _hoisted_114 = {
  class: "split-text"
};
const _hoisted_115 = {
  class: "section-lead"
};
const _hoisted_116 = {
  class: "star-list"
};
const _hoisted_117 = {
  class: "quran-quote"
};
const _hoisted_118 = {
  class: "split-img"
};
const _hoisted_119 = {
  class: "img-frame-green"
};
const _hoisted_120 = ["src"];
const _hoisted_121 = {
  class: "di-section",
  id: "hajj"
};
const _hoisted_122 = {
  class: "section-tools",
  "aria-label": "Section tools"
};
const _hoisted_123 = {
  key: 0,
  class: "ai-summary-inline",
  role: "note"
};
const _hoisted_124 = {
  class: "ai-summary-points"
};
const _hoisted_125 = {
  class: "split-layout"
};
const _hoisted_126 = {
  class: "split-text"
};
const _hoisted_127 = {
  class: "section-lead"
};
const _hoisted_128 = {
  class: "quran-quote"
};
const _hoisted_129 = {
  class: "split-text"
};
const _hoisted_130 = {
  class: "hajj-steps"
};
const _hoisted_131 = {
  class: "step-num"
};
const _hoisted_132 = {
  class: "hero-photo"
};
const _hoisted_133 = ["src"];
const _hoisted_134 = {
  class: "di-section",
  id: "afterlife"
};
const _hoisted_135 = {
  class: "section-tools",
  "aria-label": "Section tools"
};
const _hoisted_136 = {
  key: 0,
  class: "ai-summary-inline",
  role: "note"
};
const _hoisted_137 = {
  class: "ai-summary-points"
};
const _hoisted_138 = {
  class: "split-text"
};
const _hoisted_139 = {
  class: "section-lead"
};
const _hoisted_140 = {
  class: "quran-quote"
};
const _hoisted_141 = {
  class: "split-text"
};
const _hoisted_142 = {
  class: "afterlife-stages"
};
const _hoisted_143 = {
  class: "stage-icon"
};
const _hoisted_144 = {
  class: "di-section",
  id: "dosdonts"
};
const _hoisted_145 = {
  class: "section-tools section-tools--secondary",
  "aria-label": "Section tools"
};
const _hoisted_146 = {
  class: "twin-grid"
};
const _hoisted_147 = {
  class: "twin-card card-dos"
};
const _hoisted_148 = {
  class: "check-list"
};
const _hoisted_149 = {
  class: "twin-card card-donts"
};
const _hoisted_150 = {
  class: "check-list"
};
const _hoisted_151 = {
  class: "di-section",
  id: "faq"
};
const _hoisted_152 = {
  class: "section-tools section-tools--secondary",
  "aria-label": "Section tools"
};
const _hoisted_153 = {
  class: "faq-accordion"
};
const _hoisted_154 = ["onClick"];
const _hoisted_155 = {
  class: "faq-q-num"
};
const _hoisted_156 = {
  class: "faq-q-text"
};
const _hoisted_157 = {
  class: "faq-toggle-icon"
};
const _hoisted_158 = {
  key: 0,
  class: "faq-body"
};
const _hoisted_159 = {
  class: "di-section",
  id: "resources"
};
const _hoisted_160 = {
  class: "section-tools section-tools--secondary",
  "aria-label": "Section tools"
};
const _hoisted_161 = {
  class: "twin-grid"
};
const _hoisted_162 = {
  class: "twin-card"
};
const _hoisted_163 = {
  class: "resource-list"
};
const _hoisted_164 = {
  class: "res-icon"
};
const _hoisted_165 = {
  class: "twin-card"
};
const _hoisted_166 = {
  class: "resource-list"
};
const _hoisted_167 = {
  class: "res-icon"
};
const _hoisted_168 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ─── HERO ─── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [_cache[93] || (_cache[93] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-geo-bg\"><svg class=\"geo-svg\" viewBox=\"0 0 800 800\" xmlns=\"http://www.w3.org/2000/svg\"><defs><pattern id=\"star-pattern\" x=\"0\" y=\"0\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><polygon points=\"50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35\" fill=\"none\" stroke=\"rgba(255,255,255,0.10)\" stroke-width=\"0.8\"></polygon><polygon points=\"50,15 58,38 82,38 63,52 70,75 50,62 30,75 37,52 18,38 42,38\" fill=\"none\" stroke=\"rgba(255,255,255,0.05)\" stroke-width=\"0.5\"></polygon></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(#star-pattern)\"></rect></svg><div class=\"hero-orb orb-1\"></div><div class=\"hero-orb orb-2\"></div><div class=\"hero-orb orb-3\"></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "eyebrow-line"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.hero.badge), 1 /* TEXT */), _cache[86] || (_cache[86] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "eyebrow-line"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_8, [_cache[89] || (_cache[89] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "headline-arabic"
  }, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_9, [_cache[87] || (_cache[87] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Discover", -1 /* CACHED */)), _cache[88] || (_cache[88] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.hero.title), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.hero.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["hero-search-box", {
      focused: $data.searchFocused
    }])
  }, [_cache[91] || (_cache[91] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    class: "search-ico",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "m21 21-4.35-4.35"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    type: "text",
    class: "search-inp",
    placeholder: "Search pillars, prayers, prophets…",
    onFocus: _cache[1] || (_cache[1] = $event => $data.searchFocused = true),
    onBlur: _cache[2] || (_cache[2] = $event => $data.searchFocused = false),
    onKeydown: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => $data.searchQuery = '', ["escape"]))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "search-go",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.triggerSearch && $options.triggerSearch(...args))
  }, [...(_cache[90] || (_cache[90] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2.5"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M5 12h14M12 5l7 7-7 7"
  })], -1 /* CACHED */)]))])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "dropdown"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$options.filteredSections.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredSections, h => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: h.id,
        class: "search-hit",
        onClick: $event => $options.scrollToSection(h.id)
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(h.emoji), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(h.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(h.excerpt), 1 /* TEXT */)]), _cache[92] || (_cache[92] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
        class: "hit-arrow",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "2"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
        d: "M5 12h14M12 5l7 7-7 7"
      })], -1 /* CACHED */))], 8 /* PROPS */, _hoisted_14);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.hero.stats, chip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "pillar-chip",
      key: chip.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chip.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chip.label), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), _cache[94] || (_cache[94] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-scroll-hint\"><div class=\"scroll-dot\"></div><span>Scroll to explore</span></div><div class=\"hero-wave-bottom\"><svg viewBox=\"0 0 1440 100\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><path d=\"M0,40 C240,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,100 L0,100Z\" fill=\"#f4f9f5\"></path></svg></div>", 2))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ─── MAIN ─── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Disclaimer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[95] || (_cache[95] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "disclaimer-shield"
  }, "🛡", -1 /* CACHED */)), _cache[96] || (_cache[96] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Scholarly Verified:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.disclaimer.text), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── WHAT IS ISLAM ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_25, [_cache[101] || (_cache[101] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">01</span><span class=\"section-rule\"></span><span class=\"section-tag\">Foundation</span></div><h2 class=\"section-title\">What is <em>Islam?</em></h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.basics.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[5] || (_cache[5] = $event => $options.printSection('basics'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[6] || (_cache[6] = $event => $options.reportSection('basics'))
  }, "Report")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_cache[97] || (_cache[97] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tc-icon"
  }, "✦", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.basics.coreBeliefs.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_31, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.basics.coreBeliefs.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, [_cache[98] || (_cache[98] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "cl-dot"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.basics.coreBeliefs.reference), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [_cache[99] || (_cache[99] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tc-icon"
  }, "🕌", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.basics.corePractices.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_35, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.basics.corePractices.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, [_cache[100] || (_cache[100] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "cl-dot gold"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.basics.corePractices.reference), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── SHAHADA ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_37, [_cache[104] || (_cache[104] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">02</span><span class=\"section-rule\"></span><span class=\"section-tag\">First Pillar</span></div><h2 class=\"section-title\">The <em>Shahada</em></h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[7] || (_cache[7] = $event => $options.shareWhatsApp('shahada'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[8] || (_cache[8] = $event => $options.copyToClipboard('shahada'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'shahada' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[9] || (_cache[9] = $event => $options.printSection('shahada'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[10] || (_cache[10] = $event => $options.downloadPdf('shahada'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[11] || (_cache[11] = $event => $options.reportSection('shahada'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[12] || (_cache[12] = $event => $options.decreaseFont('shahada'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[13] || (_cache[13] = $event => $options.increaseFont('shahada'))
  }, "A+"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--ai",
    onClick: _cache[14] || (_cache[14] = $event => $options.toggleAiSummary('shahada'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.aiSummarySectionId === 'shahada' ? 'Hide Summary' : 'AI Summary'), 1 /* TEXT */)]), $data.aiSummarySectionId === 'shahada' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_39, [_cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-summary-title"
  }, "Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.aiSummaryPoints, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: p
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    ref: "tool_shahada",
    class: "shahada-monument section-tool-target",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.shahada
    })
  }, [_cache[103] || (_cache[103] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "shahada-geo-ring"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.shahada.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.shahada.transliteration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.shahada.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.shahada.explanation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, "📖 " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.shahada.reference), 1 /* TEXT */)])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── ALLAH ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_47, [_cache[107] || (_cache[107] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">03</span><span class=\"section-rule\"></span><span class=\"section-tag\">Theology</span></div><h2 class=\"section-title\">Who is <em>Allah?</em></h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "split-layout section-tool-target",
    ref: "tool_allah_quote",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.allah_quote
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.allah.description), 1 /* TEXT */), _cache[106] || (_cache[106] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "body-copy"
  }, "He is all-knowing (Al-ʿAlim), all-powerful (Al-Qadir), and ever-merciful (Ar-Rahman, Ar-Rahim). Allah communicates with humanity through prophets and revealed scriptures.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[15] || (_cache[15] = $event => $options.shareWhatsApp('allah_quote'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[16] || (_cache[16] = $event => $options.copyToClipboard('allah_quote'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'allah_quote' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[17] || (_cache[17] = $event => $options.printSection('allah_quote'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[18] || (_cache[18] = $event => $options.downloadPdf('allah_quote'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[19] || (_cache[19] = $event => $options.reportSection('allah_quote'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[20] || (_cache[20] = $event => $options.decreaseFont('allah_quote'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[21] || (_cache[21] = $event => $options.increaseFont('allah_quote'))
  }, "A+")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[105] || (_cache[105] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "qq-mark"
  }, "\"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.allah.quranReference), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.asmaUlHusna.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.asmaUlHusna.names, name => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      class: "name-tag",
      key: name.ar,
      title: name.en
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(name.ar), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(name.en), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_55);
  }), 128 /* KEYED_FRAGMENT */))])])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── PROPHET ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_58, [_cache[111] || (_cache[111] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">04</span><span class=\"section-rule\"></span><span class=\"section-tag\">Prophethood</span></div><h2 class=\"section-title\">Prophet <em>Muhammad ﷺ</em></h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[22] || (_cache[22] = $event => $options.shareWhatsApp('prophet'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[23] || (_cache[23] = $event => $options.copyToClipboard('prophet'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'prophet' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[24] || (_cache[24] = $event => $options.printSection('prophet'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[25] || (_cache[25] = $event => $options.downloadPdf('prophet'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[26] || (_cache[26] = $event => $options.reportSection('prophet'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[27] || (_cache[27] = $event => $options.decreaseFont('prophet'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[28] || (_cache[28] = $event => $options.increaseFont('prophet'))
  }, "A+"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--ai",
    onClick: _cache[29] || (_cache[29] = $event => $options.toggleAiSummary('prophet'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.aiSummarySectionId === 'prophet' ? 'Hide Summary' : 'AI Summary'), 1 /* TEXT */)]), $data.aiSummarySectionId === 'prophet' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, [_cache[108] || (_cache[108] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-summary-title"
  }, "Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_61, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.aiSummaryPoints, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: p
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    ref: "tool_prophet",
    class: "prophet-layout section-tool-target",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.prophet
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.configData.prophet.image,
    alt: "Masjid an-Nabawi",
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_64), _cache[109] || (_cache[109] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "img-caption-overlay"
  }, "Masjid an-Nabawi — Madinah", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.prophet.description), 1 /* TEXT */), _cache[110] || (_cache[110] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "sub-heading"
  }, "Key Teachings ﷺ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_67, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.prophet.keyTeachings, teaching => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: teaching
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(teaching), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, "📖 " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.prophet.quranReference), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, "📖 " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.prophet.hadithReference), 1 /* TEXT */)])])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── QURAN ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_71, [_cache[114] || (_cache[114] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">05</span><span class=\"section-rule\"></span><span class=\"section-tag\">Scripture</span></div><h2 class=\"section-title\">The Holy <em>Quran</em></h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[30] || (_cache[30] = $event => $options.shareWhatsApp('quran'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[31] || (_cache[31] = $event => $options.copyToClipboard('quran'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'quran' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[32] || (_cache[32] = $event => $options.printSection('quran'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[33] || (_cache[33] = $event => $options.downloadPdf('quran'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[34] || (_cache[34] = $event => $options.reportSection('quran'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[35] || (_cache[35] = $event => $options.decreaseFont('quran'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[36] || (_cache[36] = $event => $options.increaseFont('quran'))
  }, "A+"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--ai",
    onClick: _cache[37] || (_cache[37] = $event => $options.toggleAiSummary('quran'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.aiSummarySectionId === 'quran' ? 'Hide Summary' : 'AI Summary'), 1 /* TEXT */)]), $data.aiSummarySectionId === 'quran' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_73, [_cache[112] || (_cache[112] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-summary-title"
  }, "Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_74, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.aiSummaryPoints, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: p
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    ref: "tool_quran",
    class: "split-layout reverse section-tool-target",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.quran
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_76, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.quran.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_77, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.quran.facts, fact => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: fact
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_78, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(fact.split(' ')[0]), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(fact.split(' ').slice(1).join(' ')), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [_cache[113] || (_cache[113] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "qq-mark"
  }, "\"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.quran.reference), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.configData.quran.image,
    alt: "Open Quran",
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_83)])])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── SALAH ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_84, [_cache[117] || (_cache[117] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">06</span><span class=\"section-rule\"></span><span class=\"section-tag\">Second Pillar</span></div><h2 class=\"section-title\"><em>Salah</em> — Five Daily Prayers</h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[38] || (_cache[38] = $event => $options.shareWhatsApp('salah'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[39] || (_cache[39] = $event => $options.copyToClipboard('salah'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'salah' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[40] || (_cache[40] = $event => $options.printSection('salah'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[41] || (_cache[41] = $event => $options.downloadPdf('salah'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[42] || (_cache[42] = $event => $options.reportSection('salah'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[43] || (_cache[43] = $event => $options.decreaseFont('salah'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[44] || (_cache[44] = $event => $options.increaseFont('salah'))
  }, "A+"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--ai",
    onClick: _cache[45] || (_cache[45] = $event => $options.toggleAiSummary('salah'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.aiSummarySectionId === 'salah' ? 'Hide Summary' : 'AI Summary'), 1 /* TEXT */)]), $data.aiSummarySectionId === 'salah' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_86, [_cache[115] || (_cache[115] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-summary-title"
  }, "Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_87, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.aiSummaryPoints, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: p
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    ref: "tool_salah",
    class: "section-tool-target",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.salah
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.salah.prayers, prayer => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "prayer-card",
      key: prayer.name,
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        '--prayer-color': prayer.color,
        '--prayer-bg': prayer.bg
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.sky), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.time), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_91, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(prayer.rakah) + " Rak'ahs", 1 /* TEXT */)], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_96, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.salah.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [_cache[116] || (_cache[116] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "qq-mark"
  }, "\"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.salah.reference), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.configData.salah.image,
    alt: "Muslim praying",
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_100)])])])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── ZAKAT ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_101, [_cache[122] || (_cache[122] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">07</span><span class=\"section-rule\"></span><span class=\"section-tag\">Third Pillar</span></div><h2 class=\"section-title\"><em>Zakat</em> — Obligatory Charity</h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[46] || (_cache[46] = $event => $options.shareWhatsApp('zakat'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[47] || (_cache[47] = $event => $options.copyToClipboard('zakat'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'zakat' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[48] || (_cache[48] = $event => $options.printSection('zakat'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[49] || (_cache[49] = $event => $options.downloadPdf('zakat'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[50] || (_cache[50] = $event => $options.reportSection('zakat'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[51] || (_cache[51] = $event => $options.decreaseFont('zakat'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[52] || (_cache[52] = $event => $options.increaseFont('zakat'))
  }, "A+"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--ai",
    onClick: _cache[53] || (_cache[53] = $event => $options.toggleAiSummary('zakat'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.aiSummarySectionId === 'zakat' ? 'Hide Summary' : 'AI Summary'), 1 /* TEXT */)]), $data.aiSummarySectionId === 'zakat' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_103, [_cache[118] || (_cache[118] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-summary-title"
  }, "Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_104, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.aiSummaryPoints, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: p
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    ref: "tool_zakat",
    class: "split-layout section-tool-target",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.zakat
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_106, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.zakat.description), 1 /* TEXT */), _cache[120] || (_cache[120] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "body-copy"
  }, "It is due once a year and distinct from voluntary charity (Sadaqah). The Nisab threshold equals approximately 87.48g of gold in value.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_107, [_cache[119] || (_cache[119] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "qq-mark"
  }, "\"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.zakat.reference), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [_cache[121] || (_cache[121] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "sub-heading"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("8 Eligible Recipients "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "(Quran 9:60)")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_109, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.zakat.eligibleRecipients, recipient => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: recipient
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(recipient), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── SAWM ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_110, [_cache[125] || (_cache[125] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">08</span><span class=\"section-rule\"></span><span class=\"section-tag\">Fourth Pillar</span></div><h2 class=\"section-title\"><em>Sawm</em> — Fasting in Ramadan</h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[54] || (_cache[54] = $event => $options.shareWhatsApp('sawm'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[55] || (_cache[55] = $event => $options.copyToClipboard('sawm'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'sawm' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[56] || (_cache[56] = $event => $options.printSection('sawm'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[57] || (_cache[57] = $event => $options.downloadPdf('sawm'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[58] || (_cache[58] = $event => $options.reportSection('sawm'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[59] || (_cache[59] = $event => $options.decreaseFont('sawm'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[60] || (_cache[60] = $event => $options.increaseFont('sawm'))
  }, "A+"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--ai",
    onClick: _cache[61] || (_cache[61] = $event => $options.toggleAiSummary('sawm'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.aiSummarySectionId === 'sawm' ? 'Hide Summary' : 'AI Summary'), 1 /* TEXT */)]), $data.aiSummarySectionId === 'sawm' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_112, [_cache[123] || (_cache[123] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-summary-title"
  }, "Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_113, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.aiSummaryPoints, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: p
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    ref: "tool_sawm",
    class: "split-layout reverse section-tool-target",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.sawm
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_114, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_115, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.sawm.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_116, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.sawm.benefits, benefit => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: benefit
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(benefit), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [_cache[124] || (_cache[124] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "qq-mark"
  }, "\"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.sawm.reference), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.configData.sawm.image,
    alt: "Iftar meal at sunset",
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_120)])])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── HAJJ ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_121, [_cache[131] || (_cache[131] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">09</span><span class=\"section-rule\"></span><span class=\"section-tag\">Fifth Pillar</span></div><h2 class=\"section-title\"><em>Hajj</em> — Pilgrimage to Makkah</h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_122, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[62] || (_cache[62] = $event => $options.shareWhatsApp('hajj'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[63] || (_cache[63] = $event => $options.copyToClipboard('hajj'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'hajj' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[64] || (_cache[64] = $event => $options.printSection('hajj'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[65] || (_cache[65] = $event => $options.downloadPdf('hajj'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[66] || (_cache[66] = $event => $options.reportSection('hajj'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[67] || (_cache[67] = $event => $options.decreaseFont('hajj'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[68] || (_cache[68] = $event => $options.increaseFont('hajj'))
  }, "A+"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--ai",
    onClick: _cache[69] || (_cache[69] = $event => $options.toggleAiSummary('hajj'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.aiSummarySectionId === 'hajj' ? 'Hide Summary' : 'AI Summary'), 1 /* TEXT */)]), $data.aiSummarySectionId === 'hajj' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_123, [_cache[126] || (_cache[126] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-summary-title"
  }, "Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_124, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.aiSummaryPoints, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: p
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    ref: "tool_hajj",
    class: "section-tool-target",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.hajj
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_125, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_126, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_127, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.hajj.description), 1 /* TEXT */), _cache[128] || (_cache[128] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "body-copy"
  }, "Pilgrims wear simple white garments (Ihram) symbolising equality before Allah, commemorating the trials of Prophet Ibrahim ﷺ and his family.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [_cache[127] || (_cache[127] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "qq-mark"
  }, "\"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.hajj.reference), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_129, [_cache[129] || (_cache[129] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "sub-heading"
  }, "Key Rituals", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_130, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.hajj.keyRituals, (step, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: step
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_131, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("figure", _hoisted_132, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $data.configData.hajj.image,
    alt: "Ka'bah – Makkah",
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_133), _cache[130] || (_cache[130] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("figcaption", null, "The Ka'bah — Al-Masjid Al-Haram, Makkah", -1 /* CACHED */))])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── AFTERLIFE ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_134, [_cache[136] || (_cache[136] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">10</span><span class=\"section-rule\"></span><span class=\"section-tag\">Eschatology</span></div><h2 class=\"section-title\">The <em>Afterlife</em> (Akhirah)</h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_135, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--wa",
    onClick: _cache[70] || (_cache[70] = $event => $options.shareWhatsApp('afterlife'))
  }, "WhatsApp"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--copy",
    onClick: _cache[71] || (_cache[71] = $event => $options.copyToClipboard('afterlife'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.copiedSectionId === 'afterlife' ? 'Copied' : 'Copy'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[72] || (_cache[72] = $event => $options.printSection('afterlife'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--pdf",
    onClick: _cache[73] || (_cache[73] = $event => $options.downloadPdf('afterlife'))
  }, "Download PDF"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[74] || (_cache[74] = $event => $options.reportSection('afterlife'))
  }, "Report"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[75] || (_cache[75] = $event => $options.decreaseFont('afterlife'))
  }, "A-"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-circle",
    onClick: _cache[76] || (_cache[76] = $event => $options.increaseFont('afterlife'))
  }, "A+"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--ai",
    onClick: _cache[77] || (_cache[77] = $event => $options.toggleAiSummary('afterlife'))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.aiSummarySectionId === 'afterlife' ? 'Hide Summary' : 'AI Summary'), 1 /* TEXT */)]), $data.aiSummarySectionId === 'afterlife' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_136, [_cache[132] || (_cache[132] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ai-summary-title"
  }, "Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_137, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.aiSummaryPoints, p => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: p
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(p), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    ref: "tool_afterlife",
    class: "split-layout reverse section-tool-target",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      '--tool-scale': $data.sectionFontScale.afterlife
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_138, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_139, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.afterlife.description), 1 /* TEXT */), _cache[134] || (_cache[134] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "body-copy"
  }, "The afterlife (Akhirah) is eternal and far greater than this world. The Quran describes Jannah (Paradise) as a place of unimaginable bliss and Jahannam (Hell) as a place of punishment.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_140, [_cache[133] || (_cache[133] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "qq-mark"
  }, "\"", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.configData.afterlife.reference), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_141, [_cache[135] || (_cache[135] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "sub-heading"
  }, "Stages of the Afterlife", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_142, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.afterlife.concepts, stage => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: stage.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_143, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stage.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stage.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(stage.desc), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])], 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── DO'S & DON'TS ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_144, [_cache[141] || (_cache[141] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">11</span><span class=\"section-rule\"></span><span class=\"section-tag\">Islamic Law</span></div><h2 class=\"section-title\">Do&#39;s &amp; <em>Don&#39;ts</em></h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_145, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[78] || (_cache[78] = $event => $options.printSection('dosdonts'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[79] || (_cache[79] = $event => $options.reportSection('dosdonts'))
  }, "Report")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_146, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_147, [_cache[138] || (_cache[138] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "twin-card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tc-icon"
  }, "✓"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Recommended "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "(Mustahabb / Fard)")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_148, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.dosAndDonts.dos, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, [_cache[137] || (_cache[137] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "cl-dot"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_149, [_cache[140] || (_cache[140] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "twin-card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tc-icon red"
  }, "✕"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Prohibited "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "(Haram)")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_150, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.dosAndDonts.donts, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, [_cache[139] || (_cache[139] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "cl-dot red"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── FAQ ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_151, [_cache[142] || (_cache[142] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">12</span><span class=\"section-rule\"></span><span class=\"section-tag\">Questions</span></div><h2 class=\"section-title\">Common <em>Questions</em></h2><p class=\"section-lead\" style=\"margin-bottom:2.5rem;\">Answered with care, nuance, and scholarly grounding.</p>", 3)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_152, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[80] || (_cache[80] = $event => $options.printSection('faq'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[81] || (_cache[81] = $event => $options.reportSection('faq'))
  }, "Report")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.faqsList, (faq, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: i,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-entry", {
        open: faq.open
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "faq-trigger",
      onClick: $event => $options.toggleFaq(i)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_155, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(String(i + 1).padStart(2, '0')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_156, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_157, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.open ? '−' : '+'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_154), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "faq-expand"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [faq.open ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_158, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.answer), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ── RESOURCES ── "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_159, [_cache[145] || (_cache[145] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"section-label-row\"><span class=\"section-num\">13</span><span class=\"section-rule\"></span><span class=\"section-tag\">Resources</span></div><h2 class=\"section-title\">Apps &amp; <em>Learning Resources</em></h2>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_160, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--print",
    onClick: _cache[82] || (_cache[82] = $event => $options.printSection('resources'))
  }, "Print"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "tool-pill tool-pill--report",
    onClick: _cache[83] || (_cache[83] = $event => $options.reportSection('resources'))
  }, "Report")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_161, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_162, [_cache[143] || (_cache[143] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "twin-card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tc-icon"
  }, "📱"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Recommended Apps")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_163, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.configData.appsAndResources.apps, app => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: app.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_164, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(app.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(app.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(app.description), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_165, [_cache[144] || (_cache[144] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "twin-card-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tc-icon"
  }, "🌐"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Trusted Websites & Channels")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_166, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.websitesList, site => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: site.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_167, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(site.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: site.url,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(site.name), 9 /* TEXT, PROPS */, _hoisted_168), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(site.description), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), $data.showScrollTop ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "scroll-top-fab",
    "aria-label": "Scroll to top",
    onClick: _cache[84] || (_cache[84] = (...args) => $options.scrollToTop && $options.scrollToTop(...args))
  }, " ↑ ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/data/discover-islam-content.json":
/*!****************************************************!*\
  !*** ./resources/data/discover-islam-content.json ***!
  \****************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"disclaimer":{"text":"This guide is for educational purposes only. All information has been verified from the most trusted Islamic sources: Quran.com (Sahih International translation), Sunnah.com (authentic Hadith collections), Islamweb.net, Dar Al-Iftaa Al-Misriyyah, and Saudi Ministry of Islamic Affairs. Always consult a qualified scholar for specific religious rulings."},"attribution":"Content compiled from: Quran (Sahih International), Sahih Bukhari, Sahih Muslim, al-Muwatta, Sunan al-Tirmidhi, Islamweb (Fatwa Committee), Dar Al-Iftaa Al-Misriyyah. All references are cited inline. Images sourced from Pexels (free for use). Videos from respected educational Islamic YouTube channels.","theme":{"backgroundColor":"#2E9F90","titleColor":"#006D5B","accentColor":"#006D5B","textColor":"#2C3E50","description":"Light teal green background with deep teal titles for a calm, peaceful Islamic aesthetic."},"hero":{"title":"Discover Islam","subtitle":"A complete introduction to the faith of over 2 billion Muslims","badge":"Scholarly Verified","stats":[{"num":"6","label":"Pillars of Faith"},{"num":"5","label":"Pillars of Islam"},{"num":"114","label":"Surahs in Quran"},{"num":"99","label":"Names of Allah"}]},"searchSections":[{"id":"basics","emoji":"☪","title":"What is Islam?","excerpt":"The complete way of life — submission to Allah, covering core beliefs and five pillars."},{"id":"shahada","emoji":"🌙","title":"The Shahada","excerpt":"The declaration of faith — the first and most fundamental pillar."},{"id":"allah","emoji":"✦","title":"Who is Allah?","excerpt":"The One, Unique, Eternal Creator — 99 names, no partners."},{"id":"prophet","emoji":"⭐","title":"Prophet Muhammad ﷺ","excerpt":"The final messenger of Allah, born in Makkah 570 CE."},{"id":"quran","emoji":"📖","title":"The Holy Quran","excerpt":"114 chapters, 6,236 verses — literal word of Allah."},{"id":"salah","emoji":"🕌","title":"Salah — Daily Prayers","excerpt":"Five prayers daily: Fajr, Dhuhr, Asr, Maghrib, Isha."},{"id":"zakat","emoji":"💛","title":"Zakat — Charity","excerpt":"2.5% of savings given to those in need each year."},{"id":"sawm","emoji":"🌙","title":"Sawm — Fasting","excerpt":"Month-long fast during Ramadan, the 9th Islamic month."},{"id":"hajj","emoji":"🕋","title":"Hajj — Pilgrimage","excerpt":"Once-in-a-lifetime journey to Makkah in Dhul Hijjah."},{"id":"afterlife","emoji":"⏳","title":"The Afterlife","excerpt":"Resurrection, Judgement, Jannah and Jahannam."},{"id":"dosdonts","emoji":"📋","title":"Do\'s & Don\'ts","excerpt":"Recommended and prohibited actions in Islamic law."},{"id":"faq","emoji":"❓","title":"FAQ","excerpt":"Common questions answered with scholarly grounding."},{"id":"resources","emoji":"📱","title":"Apps & Resources","excerpt":"Muslim Pro, Quran.com, SeekersGuidance, Yaqeen and more."}],"basics":{"title":"What is Islam?","icon":"fas fa-star-of-life","description":"Islam is the final and complete revelation from Allah (God) to humanity. It means \'submission to the will of Allah\' and is a religion of peace, mercy, and justice.","coreBeliefs":{"title":"The Six Pillars of Iman (Faith)","items":["Belief in Allah (The One and Only God)","Belief in the Angels","Belief in the Revealed Books (Quran as final)","Belief in the Messengers (Muhammad ﷺ as final)","Belief in the Day of Judgment","Belief in Divine Decree (Qadr)"],"reference":"📖 Sahih Muslim 8 — Hadith of Jibril"},"corePractices":{"title":"The Five Pillars of Islam","items":["Shahada (Declaration of Faith)","Salah (Five Daily Prayers)","Zakat (Charity - 2.5% of qualifying savings)","Sawm (Fasting in Ramadan)","Hajj (Pilgrimage to Mecca)"],"reference":"📖 Sahih Bukhari 8 — Pillars of Islam"},"image":"https://images.pexels.com/photos/2715373/pexels-photo-2715373.jpeg?auto=compress&cs=tinysrgb&w=800","video":"https://www.youtube.com/embed/_DhI-yvhsLA"},"shahada":{"title":"The Shahada (Declaration of Faith)","arabic":"أشهد أن لا إله إلا الله وأشهد أن محمدًا رسول الله","transliteration":"Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan Rasul Allah","translation":"I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah","explanation":"The Shahada is the gateway into Islam. Uttering it with sincere conviction — understanding that Allah alone deserves worship and that Muhammad ﷺ is His final messenger — makes one a Muslim. It echoes through the Adhan five times daily.","reference":"Sahih Muslim (via Riyad as-Salihin 412) - The Prophet ﷺ said: \'Whoever testifies that there is no god but Allah alone, without partner, and that Muhammad is His servant and Messenger... Allah will forbid the Fire from touching him\' (or admit him to Paradise according to narrations).","image":"https://images.pexels.com/photos/2695984/pexels-photo-2695984.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/ecUX3l5iGYg?rel=0"},"allah":{"title":"Who is Allah?","description":"Allah is the Arabic word for God — the One, Unique, Eternal Creator of all existence. Islam teaches that Allah has no partners, no children, no equals, and is unlike anything in creation.","quranReference":"He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed. He is the Entirely Merciful, the Especially Merciful. — Quran 59:22","image":"https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/YDhs1B9p4yw"},"asmaUlHusna":{"title":"99 Beautiful Names of Allah (Asma ul-Husna)","description":"Allah has 99 Beautiful Names. Learning and calling upon Him by these names is highly recommended. Here is the complete authentic list with meanings:","names":[{"ar":"الرَّحْمَٰن","en":"Ar-Rahman — The Most Gracious"},{"ar":"الرَّحِيم","en":"Ar-Rahim — The Most Merciful"},{"ar":"الْمَلِك","en":"Al-Malik — The King"},{"ar":"الْقُدُّوس","en":"Al-Quddus — The Most Holy"},{"ar":"السَّلَام","en":"As-Salam — The Source of Peace"},{"ar":"الْمُؤْمِن","en":"Al-Mumin — The Guardian of Faith"},{"ar":"الْمُهَيْمِن","en":"Al-Muhaymin — The Protector"},{"ar":"الْعَزِيز","en":"Al-Aziz — The Almighty"},{"ar":"الْجَبَّار","en":"Al-Jabbar — The Compeller"},{"ar":"الْمُتَكَبِّر","en":"Al-Mutakabbir — The Majestic"},{"ar":"الْخَالِق","en":"Al-Khaliq — The Creator"},{"ar":"الْبَارِئ","en":"Al-Bari\' — The Originator"},{"ar":"الْمُصَوِّر","en":"Al-Musawwir — The Fashioner"},{"ar":"الْغَفَّار","en":"Al-Ghaffar — The Forgiving"},{"ar":"الْقَهَّار","en":"Al-Qahhar — The Subduer"},{"ar":"الْوَهَّاب","en":"Al-Wahhab — The Bestower"},{"ar":"الرَّزَّاق","en":"Ar-Razzaq — The Provider"},{"ar":"الْفَتَّاح","en":"Al-Fattah — The Opener"},{"ar":"الْعَلِيم","en":"Al-\'Alim — The All-Knowing"},{"ar":"الْقَابِض","en":"Al-Qabid — The Withholder"},{"ar":"الْبَاسِط","en":"Al-Basit — The Extender"},{"ar":"الْخَافِض","en":"Al-Khafid — The Reducer"},{"ar":"الرَّافِع","en":"Al-Rafi\' — The Exalter"},{"ar":"الْمُعِزّ","en":"Al-Mu\'izz — The Honourer"},{"ar":"الْمُذِلّ","en":"Al-Mudhill — The Humiliator"},{"ar":"السَّمِيع","en":"As-Sami — The All-Hearing"},{"ar":"الْبَصِير","en":"Al-Basir — The All-Seeing"},{"ar":"الْحَكَم","en":"Al-Hakam — The Judge"},{"ar":"الْعَدْل","en":"Al-Adl — The Just"},{"ar":"اللَّطِيف","en":"Al-Latif — The Subtle"},{"ar":"الْخَبِير","en":"Al-Khabir — The Aware"},{"ar":"الْحَلِيم","en":"Al-Halim — The Forbearing"},{"ar":"الْعَظِيم","en":"Al-Azim — The Magnificent"},{"ar":"الْغَفُور","en":"Al-Ghafur — The Forgiving"},{"ar":"الشَّكُور","en":"Ash-Shakur — The Appreciative"},{"ar":"الْعَلِيّ","en":"Al-\'Ali — The Most High"},{"ar":"الْكَبِير","en":"Al-Kabir — The Grand"},{"ar":"الْحَفِيظ","en":"Al-Hafiz — The Preserver"},{"ar":"الْمُقِيت","en":"Al-Muqit — The Sustainer"},{"ar":"الْحَسِيب","en":"Al-Hasib — The Reckoner"},{"ar":"الْجَلِيل","en":"Al-Jalil — The Majestic"},{"ar":"الْكَرِيم","en":"Al-Karim — The Generous"},{"ar":"الرَّقِيب","en":"Ar-Raqib — The Watchful"},{"ar":"الْمُجِيب","en":"Al-Mujib — The Responder"},{"ar":"الْوَاسِع","en":"Al-Wasi — The Vast"},{"ar":"الْحَكِيم","en":"Al-Hakim — The Wise"},{"ar":"الْوَدُود","en":"Al-Wadud — The Loving"},{"ar":"الْمَجِيد","en":"Al-Majid — The Glorious"},{"ar":"الْبَاعِث","en":"Al-Baith — The Resurrector"},{"ar":"الشَّهِيد","en":"Ash-Shahid — The Witness"},{"ar":"الْحَقّ","en":"Al-Haqq — The Truth"},{"ar":"الْوَكِيل","en":"Al-Wakil — The Trustee"},{"ar":"الْقَوِيّ","en":"Al-Qawiyy — The Strong"},{"ar":"الْمَتِين","en":"Al-Matin — The Firm"},{"ar":"الْوَلِيّ","en":"Al-Waliyy — The Protecting Friend"},{"ar":"الْحَمِيد","en":"Al-Hamid — The Praiseworthy"},{"ar":"الْمُحْصِي","en":"Al-Muhsi — The Counter"},{"ar":"الْمُبْدِئ","en":"Al-Mubdi\' — The Originator"},{"ar":"الْمُعِيد","en":"Al-Muid — The Restorer"},{"ar":"الْمُحْيِي","en":"Al-Muhyi — The Giver of Life"},{"ar":"الْمُمِيت","en":"Al-Mumit — The Taker of Life"},{"ar":"الْحَيّ","en":"Al-Hayy — The Ever-Living"},{"ar":"الْقَيُّوم","en":"Al-Qayyum — The Self-Subsisting"},{"ar":"الْوَاجِد","en":"Al-Wajid — The Finder"},{"ar":"الْمَاجِد","en":"Al-Majid — The Noble"},{"ar":"الْوَاحِد","en":"Al-Wahid — The One"},{"ar":"الصَّمَد","en":"As-Samad — The Eternal"},{"ar":"الْقَادِر","en":"Al-Qadir — The Able"},{"ar":"الْمُقْتَدِر","en":"Al-Muqtadir — The Powerful"},{"ar":"الْمُقَدِّم","en":"Al-Muqaddim — The Expediter"},{"ar":"الْمُؤَخِّر","en":"Al-Muakhkhir — The Delayer"},{"ar":"الأَوَّل","en":"Al-Awwal — The First"},{"ar":"الآخِر","en":"Al-Akhir — The Last"},{"ar":"الظَّاهِر","en":"Az-Zahir — The Manifest"},{"ar":"الْبَاطِن","en":"Al-Batin — The Hidden"},{"ar":"الْوَالِي","en":"Al-Wali — The Governor"},{"ar":"الْمُتَعَالِي","en":"Al-Muta\'ali — The Most Exalted"},{"ar":"الْبَرّ","en":"Al-Barr — The Source of Goodness"},{"ar":"التَّوَّاب","en":"At-Tawwab — The Ever-Pardoning"},{"ar":"الْمُنْتَقِم","en":"Al-Muntaqim — The Avenger"},{"ar":"الْعَفُوّ","en":"Al-\'Afuww — The Pardoner"},{"ar":"الرَّؤُوف","en":"Ar-Ra\'uf — The Compassionate"},{"ar":"مَالِكُ الْمُلْك","en":"Malik-ul-Mulk — Master of the Kingdom"},{"ar":"ذُو الْجَلَال","en":"Dhul Jalali — Lord of Majesty"},{"ar":"الْمُقْسِط","en":"Al-Muqsit — The Equitable"},{"ar":"الْجَامِع","en":"Al-Jami\' — The Gatherer"},{"ar":"الْغَنِيّ","en":"Al-Ghani — The Self-Sufficient"},{"ar":"الْمُغْنِي","en":"Al-Mughni — The Enricher"},{"ar":"الْمَانِع","en":"Al-Mani\' — The Preventer"},{"ar":"الضَّارّ","en":"Ad-Darr — The Distresser"},{"ar":"النَّافِع","en":"An-Nafi — The Propitious"},{"ar":"النُّور","en":"An-Nur — The Light"},{"ar":"الْهَادِي","en":"Al-Hadi — The Guide"},{"ar":"الْبَدِيع","en":"Al-Badi\' — The Originator"},{"ar":"الْبَاقِي","en":"Al-Baqi — The Everlasting"},{"ar":"الْوَارِث","en":"Al-Warith — The Inheritor"},{"ar":"الرَّشِيد","en":"Ar-Rashid — The Righteous Teacher"},{"ar":"الصَّبُور","en":"As-Sabur — The Patient"}],"image":"https://images.pexels.com/photos/3832028/pexels-photo-3832028.jpeg?auto=compress&cs=tinysrgb&w=1200"},"prophet":{"title":"Prophet Muhammad ﷺ","description":"Muhammad ibn Abdullah ﷺ was born in Makkah in 570 CE. At 40, he received his first revelation through Angel Jibreel. Over 23 years he conveyed the complete message of Islam. He is the Seal of the Prophets — no messenger will come after him.","keyTeachings":["Monotheism - worship Allah alone without partners","Kindness to family, neighbours, and all creation","Honesty and trustworthiness in all dealings","Justice, equality, and the rights of the poor","Seeking knowledge as a duty upon every Muslim","\\"I was only sent as a mercy to the worlds\\""],"quranReference":"Quran 21:107 — Mercy to the worlds","hadithReference":"Sahih Muslim 2564 — Love for others","image":"https://images.pexels.com/photos/12593672/pexels-photo-12593672.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/GOPiPx5tvB0?rel=0"},"quran":{"title":"The Holy Quran","description":"The Quran is the literal word of Allah (SWT), revealed to Prophet Muhammad ﷺ over 23 years through Angel Jibreel — the primary source of Islamic law, ethics, and spiritual guidance.","facts":["114 Surahs (Chapters)","6,236 Ayaat (Verses)","30 Juz (Parts)","10M+ Huffaz worldwide"],"reference":"This is the Book about which there is no doubt, a guidance for those conscious of Allah. — Quran 2:2","image":"https://images.pexels.com/photos/8522573/pexels-photo-8522573.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/YDNT2R5_nbE?rel=0"},"salah":{"title":"Salah (The Five Daily Prayers)","description":"Salah is the ritual prayer performed five times daily at prescribed times, involving specific postures, Quranic recitations, and remembrance of Allah. Wudu (ritual ablution) must be observed beforehand. Prayer faces the Qiblah — the direction of the Ka\'bah in Makkah.","prayers":[{"name":"Fajr","arabic":"الفجر","time":"Dawn","rakah":2,"sky":"🌤","color":"#e8956d","bg":"#fff5ef"},{"name":"Dhuhr","arabic":"الظهر","time":"Midday","rakah":4,"sky":"☀️","color":"#c49a1a","bg":"#fffbec"},{"name":"Asr","arabic":"العصر","time":"Afternoon","rakah":4,"sky":"🌅","color":"#d47a44","bg":"#fff3e8"},{"name":"Maghrib","arabic":"المغرب","time":"Sunset","rakah":3,"sky":"🌆","color":"#9d60d4","bg":"#f8f0ff"},{"name":"Isha","arabic":"العشاء","time":"Night","rakah":4,"sky":"🌙","color":"#3a5fa8","bg":"#eef3ff"}],"reference":"Maintain with care the [obligatory] prayers and stand before Allah, devoutly obedient. — Quran 2:238","image":"https://images.pexels.com/photos/36211997/pexels-photo-36211997.jpeg"},"zakat":{"title":"Zakat (Charity)","description":"Zakat is the compulsory giving of 2.5% of one\'s total accumulated wealth above the Nisab threshold to eligible recipients — purifying wealth and reducing inequality.","eligibleRecipients":["The poor (Fuqara)","The needy (Masakin)","Zakat administrators","Those to be reconciled","To free captives","Those in debt (Gharimin)","In the cause of Allah","The stranded traveller"],"reference":"Take from their wealth a charity by which you purify them and cause them to increase. — Quran 9:103","image":"https://images.pexels.com/photos/5997945/pexels-photo-5997945.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/27_NFmvwrpM?rel=0"},"sawm":{"title":"Sawm (Fasting in Ramadan)","description":"Muslims abstain from food, drink, smoking, and sexual relations from Fajr (dawn) to Maghrib (sunset) during Ramadan — the 9th month of the Hijri calendar.","benefits":["Spiritual purification and closeness to Allah","Development of self-discipline and gratitude","Empathy for those who suffer from hunger","Laylat al-Qadr — better than 1,000 months","Increased Quran recitation and Tarawih prayers","Community gathering and spiritual renewal"],"reference":"Decreed upon you is fasting as it was decreed upon those before you that you may become righteous. — Quran 2:183","image":"https://images.pexels.com/photos/7956566/pexels-photo-7956566.jpeg?auto=compress&cs=tinysrgb&w=800","video":"https://www.youtube.com/embed/lm6VL54f0os?rel=0"},"hajj":{"title":"Hajj (Pilgrimage)","description":"Obligatory at least once in a lifetime for every adult Muslim who is physically and financially able, Hajj takes place in Dhul Hijjah — the 12th Islamic month.","keyRituals":["Entering Ihram — sacred state of purity","Tawaf — circling the Ka\'bah 7 times","Sa\'i — walking between Safa & Marwa","Standing at Arafat — Day of Arafah","Overnight stay at Muzdalifah","Stoning of the Jamarat"],"reference":"And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way. — Quran 3:97","image":"https://images.pexels.com/photos/35315919/pexels-photo-35315919.jpeg?auto=compress&cs=tinysrgb&w=800","video":"https://www.youtube.com/embed/jd9AVwtyp4Y?rel=0"},"afterlife":{"title":"Belief in the Afterlife","description":"Islam teaches that this worldly life is temporary and that every soul will be resurrected and judged for their deeds on the Day of Judgement (Yawm al-Qiyama).","concepts":[{"icon":"⚰","name":"Barzakh","desc":"The intermediate state in the grave after death."},{"icon":"📯","name":"The Trumpet Blow","desc":"The end of this world — all creation perishes."},{"icon":"🌅","name":"Resurrection","desc":"All souls raised on the plains of Mahshar."},{"icon":"⚖","name":"The Scales","desc":"Deeds weighed on the Mizan with perfect justice."},{"icon":"🌉","name":"Al-Sirat","desc":"The bridge over Hell crossed by all souls."},{"icon":"🌺","name":"Jannah or Jahannam","desc":"Eternal Paradise or Hell based on the reckoning."}],"reference":"Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection. — Quran 3:185","image":"https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1200","video":"https://www.youtube.com/embed/dffncQrws1I?rel=0"},"dosAndDonts":{"dos":["Pray the five daily prayers on time","Recite Bismillah before any action","Greet others with \\"As-salamu alaykum\\"","Be kind and respectful to parents","Give in charity — obligatory and voluntary","Maintain family ties (Silat ar-Rahim)","Seek knowledge throughout life","Eat only Halal food","Maintain ritual purity (Taharah)"],"donts":["Associating partners with Allah (Shirk)","Consuming alcohol, intoxicants, or pork","Riba (interest/usury) in financial dealings","Zina (adultery or fornication)","Stealing, cheating, or dishonest dealings","Backbiting (Gheebah) and slander","Murder or harming innocent people","Arrogance and pride (Kibr)","Breaking family ties without just cause"]},"faqs":[{"question":"How does one become a Muslim?","answer":"To become a Muslim, one must sincerely recite the Shahada with full understanding and conviction."},{"question":"What is the difference between Islam, Iman, and Ihsan?","answer":"Islam refers to the outward actions (the 5 pillars). Iman refers to the inner beliefs (the 6 pillars of faith). Ihsan refers to worshipping Allah as if you see Him, knowing He sees you (Sahih Muslim 8)."},{"question":"Do Muslims worship the same God as other religions?","answer":"Muslims worship Allah — the One and Only God. He has no partners, no children, and no equals (Surah Al-Ikhlas 112:1)."},{"question":"Why do Muslims pray five times a day?","answer":"The five daily prayers were ordained during the Isra and Mi\'raj. They provide spiritual discipline and connection to Allah (Surah Al-Ankabut 29:45)."},{"question":"What is the role of women in Islam?","answer":"Islam elevated women\'s status with rights to inheritance, education, and consent. Men and women are equal in spiritual reward. \'The best of you are those best to their women\' (Sunan al-Tirmidhi 3895)."},{"question":"Are all Muslims Arab?","answer":"No. Only about 20% of Muslims are Arab. The largest Muslim populations are in Indonesia, Pakistan, India, Bangladesh, and Nigeria."}],"appsAndResources":{"apps":[{"icon":"🕌","name":"Muslim Pro","description":"Prayer times, Quran, Qibla, Adhan alerts"},{"icon":"📖","name":"Quran Companion","description":"Memorisation tools, Tajweed, progress tracking"},{"icon":"⭐","name":"Seerah App","description":"Life of the Prophet ﷺ in full detail"},{"icon":"🤖","name":"Tarteel AI","description":"AI-powered Quran recitation correction"},{"icon":"🔔","name":"Athan (Azan)","description":"Prayer times, Quran audio, Dhikr counter"}],"websites":[{"icon":"📚","name":"islamqa.info","url":"https://islamqa.info","description":"Scholarly Q&A — fatawa and rulings"},{"icon":"📜","name":"sunnah.com","url":"https://sunnah.com","description":"Complete Hadith collections online"},{"icon":"📖","name":"quran.com","url":"https://quran.com","description":"Quran with translation and tafsir"},{"icon":"🎓","name":"yaqeeninstitute.org","url":"https://yaqeeninstitute.org","description":"Academic Islamic research papers"},{"icon":"🌿","name":"seekersguidance.org","url":"https://seekersguidance.org","description":"Free Islamic learning courses"}]}}');

/***/ }),

/***/ "./resources/js/components/IslamComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/IslamComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IslamComponent_vue_vue_type_template_id_0d93bfcc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IslamComponent.vue?vue&type=template&id=0d93bfcc */ "./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc");
/* harmony import */ var _IslamComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IslamComponent.vue?vue&type=script&lang=js */ "./resources/js/components/IslamComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _IslamComponent_vue_vue_type_style_index_0_id_0d93bfcc_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&lang=css */ "./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_IslamComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_IslamComponent_vue_vue_type_template_id_0d93bfcc__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/IslamComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/IslamComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/IslamComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&lang=css":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&lang=css ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_style_index_0_id_0d93bfcc_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=style&index=0&id=0d93bfcc&lang=css");


/***/ }),

/***/ "./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_template_id_0d93bfcc__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_IslamComponent_vue_vue_type_template_id_0d93bfcc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./IslamComponent.vue?vue&type=template&id=0d93bfcc */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/IslamComponent.vue?vue&type=template&id=0d93bfcc");


/***/ })

}]);