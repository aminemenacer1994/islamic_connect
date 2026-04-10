"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_components_vue_HajjComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/hajj-umrah-content.json */ "./resources/data/hajj-umrah-content.json");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



const DEFAULT_SECTION_FONT_SCALE = 1;
const MIN_SECTION_FONT_SCALE = 0.9;
const MAX_SECTION_FONT_SCALE = 1.2;
const SECTION_FONT_STEP = 0.08;
const SEARCH_SKIP_SELECTOR = '.hero, .section-tools, .ai-summary-panel, .ai-summary-fab, button, a, input, textarea, select, svg, mark[data-search-highlight], script, style, noscript';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'HajjComponent',
  setup(__props, {
    expose: __expose
  }) {
    __expose();
    const content = _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_2__;
    const labels = _objectSpread({
      downloadPdf: 'Download PDF',
      keyReferences: 'Key references',
      imageCreditPrefix: 'Image source:',
      faqTitle: 'Common questions',
      shareWhatsApp: 'WhatsApp',
      copyToClipboard: 'Copy',
      copied: 'Copied',
      printSection: 'Print',
      aiSummaryFab: 'AI Summary',
      textSize: 'Text size',
      decreaseTextSize: 'A-',
      increaseTextSize: 'A+',
      wordCount: 'Word count',
      readTime: 'Read time'
    }, content.labels || {});
    const hero = _objectSpread({
      kicker: 'Hajj & Umrah Guide',
      title: 'The rites and references you actually need.',
      subtitle: '',
      proofPills: [],
      primaryButton: {
        label: 'Open guide',
        target: 'guides'
      },
      secondaryButton: {
        label: 'Start with Umrah',
        target: 'umrah'
      },
      trustItems: []
    }, content.hero || {});
    const guidesSection = _objectSpread({
      eyebrow: 'Downloads',
      title: 'PDF guides',
      description: ''
    }, content.guidesSection || {});
    const sections = _objectSpread({
      basics: {
        eyebrow: '',
        title: 'Foundations',
        description: ''
      },
      umrah: {
        eyebrow: '',
        title: 'Umrah',
        description: '',
        conclusion: {
          title: '',
          text: ''
        }
      },
      hajj: {
        eyebrow: '',
        title: 'Hajj',
        description: '',
        farewell: {
          arabic: '',
          title: '',
          text: '',
          reference: ''
        }
      },
      mistakes: {
        eyebrow: '',
        title: 'Common mistakes',
        description: ''
      },
      health: {
        eyebrow: '',
        title: 'Health and readiness',
        description: '',
        note: ''
      },
      rules: {
        eyebrow: '',
        title: 'Ihram rules',
        description: '',
        permissibleTitle: '',
        prohibitedTitle: '',
        note: ''
      },
      spiritual: {
        eyebrow: '',
        title: 'Spiritual preparation',
        description: ''
      },
      shorts: {
        eyebrow: 'Shorts',
        title: 'Educational shorts',
        description: ''
      },
      resources: {
        eyebrow: '',
        title: 'Resources',
        description: ''
      },
      postHajj: {
        eyebrow: '',
        title: 'After Hajj',
        description: ''
      },
      summary: {
        eyebrow: '',
        title: '',
        description: ''
      }
    }, content.sections || {});
    const defaultSectionImage = {
      src: 'https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg?cs=srgb&dl=pexels-busrasahjn-13459175.jpg&fm=jpg',
      alt: 'A mosque and courtyard scene suited to worship and reflection',
      credit: 'Pexels'
    };
    const sectionImages = _objectSpread({
      basics: defaultSectionImage,
      umrah: defaultSectionImage,
      hajj: defaultSectionImage,
      mistakes: defaultSectionImage,
      health: defaultSectionImage,
      rules: defaultSectionImage,
      spiritual: defaultSectionImage,
      postHajj: defaultSectionImage
    }, content.sectionImages || {});
    const pdfGuides = content.pdfGuides || [];
    const basicsCards = content.basicsCards || [];
    const hajjTypes = content.hajjTypes || [];
    const umrahSteps = content.umrahSteps || [];
    const hajjDays = content.hajjDays || [];
    const commonMistakes = content.commonMistakes || [];
    const healthReadiness = content.healthReadiness || [];
    const rules = _objectSpread({
      permissible: [],
      prohibited: []
    }, content.rules || {});
    const spiritualPrep = content.spiritualPrep || [];
    const shorts = content.shorts || [];
    const resources = content.resources || [];
    const faqs = content.faqs || [];
    const postHajjSteps = content.postHajjSteps || [];
    const summarySection = _objectSpread({
      kicker: 'Summary',
      title: 'The page in one clear recap',
      intro: '',
      points: [],
      footer: ''
    }, content.summarySection || {});
    const sectionReferences = _objectSpread({
      basics: [],
      umrah: [],
      hajj: [],
      mistakes: [],
      health: [],
      rules: [],
      spiritual: []
    }, content.sectionReferences || {});
    const disclaimer = _objectSpread({
      title: '',
      text: '',
      items: [],
      warningTitle: '',
      warningText: ''
    }, content.disclaimer || {});
    const closing = _objectSpread({
      arabic: '',
      translation: '',
      reference: '',
      message: ''
    }, content.closing || {});
    const sectionIds = ['basics', 'umrah', 'hajj', 'mistakes', 'health', 'rules', 'spiritual', 'resources', 'post-hajj'];
    const activeFaq = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const copiedSectionId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const printSectionId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const isDarkMode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const isAiSummaryOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const isAiSummaryMaximized = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const searchQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const searchMatchCount = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const searchMatchedSectionIds = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const searchFirstMatchSectionId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const sectionFontScales = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(sectionIds.reduce((accumulator, id) => {
      accumulator[id] = DEFAULT_SECTION_FONT_SCALE;
      return accumulator;
    }, {}));
    let copyFeedbackTimeout;
    let themeObserver;
    const searchableSectionIds = ['guides', 'basics', 'spiritual', 'umrah', 'hajj', 'rules', 'health', 'mistakes', 'resources', 'post-hajj', 'shorts'];
    const searchMatchLabel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!searchQuery.value) {
        return 'Type one or more keywords to search the guide';
      }
      if (!searchMatchCount.value) {
        return 'No matches found';
      }
      const sectionCount = searchMatchedSectionIds.value.length;
      const sectionLabel = sectionCount ? ` across ${sectionCount} section${sectionCount === 1 ? '' : 's'}` : '';
      return `${searchMatchCount.value} match${searchMatchCount.value === 1 ? '' : 'es'} highlighted${sectionLabel}`;
    });
    const summaryMetrics = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const text = [summarySection.intro, ...summarySection.points, summarySection.footer].join(' ').trim();
      const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
      const readTime = Math.max(1, Math.ceil(words / 180));
      return {
        words,
        readTime
      };
    });
    const scrollToSection = id => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
    const clearSearchHighlights = root => {
      if (!root) {
        return;
      }
      root.querySelectorAll('mark[data-search-highlight]').forEach(mark => {
        var _mark$textContent;
        const parent = mark.parentNode;
        if (!parent) {
          return;
        }
        parent.replaceChild(document.createTextNode((_mark$textContent = mark.textContent) !== null && _mark$textContent !== void 0 ? _mark$textContent : ''), mark);
        parent.normalize();
      });
    };
    const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const applySearchHighlights = () => {
      const root = document.querySelector('.main-container');
      if (!root) {
        searchMatchCount.value = 0;
        searchMatchedSectionIds.value = [];
        searchFirstMatchSectionId.value = '';
        return;
      }
      clearSearchHighlights(root);
      const term = searchQuery.value.trim();
      if (!term) {
        searchMatchCount.value = 0;
        searchMatchedSectionIds.value = [];
        searchFirstMatchSectionId.value = '';
        return;
      }
      const terms = Array.from(new Set(term.split(/\s+/).map(item => item.trim()).filter(item => item.length >= 2)));
      if (!terms.length) {
        searchMatchCount.value = 0;
        searchMatchedSectionIds.value = [];
        searchFirstMatchSectionId.value = '';
        return;
      }
      const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi');
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          var _node$textContent;
          const parent = node.parentElement;
          if (!parent || !((_node$textContent = node.textContent) !== null && _node$textContent !== void 0 && _node$textContent.trim())) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest(SEARCH_SKIP_SELECTOR)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const textNodes = [];
      let currentNode = walker.nextNode();
      while (currentNode) {
        textNodes.push(currentNode);
        currentNode = walker.nextNode();
      }
      let matches = 0;
      const matchedSections = new Set();
      let firstMatchSectionId = '';
      textNodes.forEach(node => {
        var _node$textContent2, _node$parentNode;
        const text = (_node$textContent2 = node.textContent) !== null && _node$textContent2 !== void 0 ? _node$textContent2 : '';
        if (!pattern.test(text)) {
          pattern.lastIndex = 0;
          return;
        }
        pattern.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        text.replace(pattern, (match, _group, offset) => {
          var _node$parentElement;
          if (offset > lastIndex) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
          }
          const mark = document.createElement('mark');
          mark.dataset.searchHighlight = 'true';
          mark.textContent = match;
          fragment.appendChild(mark);
          matches += 1;
          const section = (_node$parentElement = node.parentElement) === null || _node$parentElement === void 0 ? void 0 : _node$parentElement.closest('section[id]');
          const sectionId = section === null || section === void 0 ? void 0 : section.id;
          if (sectionId) {
            matchedSections.add(sectionId);
            if (!firstMatchSectionId) {
              firstMatchSectionId = sectionId;
            }
          }
          lastIndex = offset + match.length;
          return match;
        });
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        (_node$parentNode = node.parentNode) === null || _node$parentNode === void 0 || _node$parentNode.replaceChild(fragment, node);
      });
      searchMatchCount.value = matches;
      searchMatchedSectionIds.value = searchableSectionIds.filter(id => matchedSections.has(id));
      searchFirstMatchSectionId.value = firstMatchSectionId;
    };
    const clearSearch = () => {
      searchQuery.value = '';
    };
    const focusFirstSearchResult = () => {
      if (!searchFirstMatchSectionId.value) {
        return;
      }
      scrollToSection(searchFirstMatchSectionId.value);
    };
    const toggleFaq = index => {
      activeFaq.value = activeFaq.value === index ? null : index;
    };
    const getSectionScale = sectionId => {
      var _sectionFontScales$va;
      return (_sectionFontScales$va = sectionFontScales.value[sectionId]) !== null && _sectionFontScales$va !== void 0 ? _sectionFontScales$va : DEFAULT_SECTION_FONT_SCALE;
    };
    const getSectionStyle = sectionId => ({
      '--section-font-scale': getSectionScale(sectionId)
    });
    const formatSectionScale = sectionId => `${Math.round(getSectionScale(sectionId) * 100)}%`;
    const changeSectionFontSize = (sectionId, delta) => {
      const nextScale = Math.min(MAX_SECTION_FONT_SCALE, Math.max(MIN_SECTION_FONT_SCALE, Number((getSectionScale(sectionId) + delta).toFixed(2))));
      sectionFontScales.value = _objectSpread(_objectSpread({}, sectionFontScales.value), {}, {
        [sectionId]: nextScale
      });
    };
    const getSectionElement = sectionId => document.getElementById(sectionId);
    const getSectionDescription = sectionId => {
      var _section$querySelecto, _section$querySelecto2;
      const section = getSectionElement(sectionId);
      return (_section$querySelecto = section === null || section === void 0 || (_section$querySelecto2 = section.querySelector('.sec-desc')) === null || _section$querySelecto2 === void 0 || (_section$querySelecto2 = _section$querySelecto2.textContent) === null || _section$querySelecto2 === void 0 ? void 0 : _section$querySelecto2.trim()) !== null && _section$querySelecto !== void 0 ? _section$querySelecto : '';
    };
    const slugifyFileName = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-');
    const buildSectionText = sectionId => {
      const section = getSectionElement(sectionId);
      if (!section) {
        return '';
      }
      const clone = section.cloneNode(true);
      clone.querySelectorAll('[data-section-tools], .image-credit').forEach(element => element.remove());
      return clone.innerText.replace(/\n{3,}/g, '\n\n').trim();
    };
    const normalizePdfText = value => value.replace(/\s+/g, ' ').trim();
    const buildSectionPdfBlocks = sectionId => {
      const section = getSectionElement(sectionId);
      if (!section) {
        return [];
      }
      const clone = section.cloneNode(true);
      clone.querySelectorAll('[data-section-tools], .image-credit, .sec-head, .eyebrow, .sec-title, .sec-desc').forEach(element => {
        element.remove();
      });
      const blocks = [];
      const pushBlock = (kind, lines) => {
        const text = (Array.isArray(lines) ? lines : [lines]).map(line => normalizePdfText(String(line !== null && line !== void 0 ? line : ''))).filter(Boolean).join('\n');
        if (text) {
          blocks.push({
            kind,
            text
          });
        }
      };
      const readText = (element, selector) => {
        var _element$querySelecto, _element$querySelecto2, _element$textContent;
        return normalizePdfText(selector ? (_element$querySelecto = (_element$querySelecto2 = element.querySelector(selector)) === null || _element$querySelecto2 === void 0 ? void 0 : _element$querySelecto2.textContent) !== null && _element$querySelecto !== void 0 ? _element$querySelecto : '' : (_element$textContent = element === null || element === void 0 ? void 0 : element.textContent) !== null && _element$textContent !== void 0 ? _element$textContent : '');
      };
      const addCardCollection = (container, noteLabel = 'Note') => {
        container.querySelectorAll('article').forEach(article => {
          const number = readText(article, '.card-num, .tl-num, .day-date');
          const title = readText(article, 'h3');
          const body = readText(article, 'p');
          const note = readText(article, '.card-note, .type-note, .day-reminder, .tl-tip, .section-note, .resource-url');
          const reference = readText(article, '.tl-ref, .day-ref');
          pushBlock('body', [number && title ? `${number}. ${title}` : title || number, body, note ? `${noteLabel}: ${note}` : '', reference ? `Reference: ${reference}` : '']);
        });
      };
      Array.from(clone.children).forEach(child => {
        var _child$textContent2;
        if (child.classList.contains('sec-header-with-image') || child.matches('[data-section-tools], .sec-image')) {
          return;
        }
        if (child.classList.contains('cards-grid')) {
          addCardCollection(child);
          return;
        }
        if (child.classList.contains('types-grid')) {
          addCardCollection(child);
          return;
        }
        if (child.classList.contains('tl')) {
          addCardCollection(child, 'Reminder');
          return;
        }
        if (child.classList.contains('days-grid')) {
          addCardCollection(child, 'Reminder');
          return;
        }
        if (child.classList.contains('rules-grid')) {
          child.querySelectorAll('.rules-card').forEach(card => {
            const heading = readText(card, '.rules-hdr');
            const items = Array.from(card.querySelectorAll('.rules-list li')).map(item => `- ${readText(item)}`);
            pushBlock('body', [heading, ...items]);
          });
          return;
        }
        if (child.classList.contains('resource-grid')) {
          child.querySelectorAll('.resource-card').forEach(card => {
            pushBlock('body', [readText(card, '.resource-label'), readText(card, 'h3'), readText(card, 'p'), readText(card, '.resource-url')]);
          });
          return;
        }
        if (child.classList.contains('reference-panel')) {
          const heading = readText(child, 'h4');
          if (heading) {
            pushBlock('heading', heading);
          }
          child.querySelectorAll('.reference-item').forEach(item => {
            pushBlock('reference', [readText(item, 'strong'), readText(item, 'span')]);
          });
          return;
        }
        if (child.classList.contains('faq-wrap')) {
          const heading = readText(child, 'h4');
          if (heading) {
            pushBlock('heading', heading);
          }
          child.querySelectorAll('.faq-item').forEach(item => {
            pushBlock('body', [`Q: ${readText(item, '.faq-q span')}`, `A: ${readText(item, '.faq-a p')}`, readText(item, '.faq-ref') ? `Reference: ${readText(item, '.faq-ref')}` : '']);
          });
          return;
        }
        if (child.classList.contains('conclusion') || child.classList.contains('farewell') || child.classList.contains('disclaimer-box') || child.classList.contains('warning-box')) {
          pushBlock('body', [readText(child, 'h4'), readText(child, '.farewell-arabic'), readText(child, '.ref-text, p'), ...Array.from(child.querySelectorAll('li')).map(item => `- ${readText(item)}`), readText(child, 'cite, .closing-ref')]);
          return;
        }
        if (child.classList.contains('section-note')) {
          var _child$textContent;
          pushBlock('note', (_child$textContent = child.textContent) !== null && _child$textContent !== void 0 ? _child$textContent : '');
          return;
        }
        const fallbackText = normalizePdfText((_child$textContent2 = child.textContent) !== null && _child$textContent2 !== void 0 ? _child$textContent2 : '');
        if (fallbackText) {
          pushBlock('body', fallbackText);
        }
      });
      return blocks;
    };
    const fallbackCopyText = text => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };
    const setCopiedState = sectionId => {
      copiedSectionId.value = sectionId;
      window.clearTimeout(copyFeedbackTimeout);
      copyFeedbackTimeout = window.setTimeout(() => {
        copiedSectionId.value = null;
      }, 1800);
    };
    const copySectionText = async sectionId => {
      const text = buildSectionText(sectionId);
      if (!text) {
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        fallbackCopyText(text);
      }
      setCopiedState(sectionId);
    };
    const shareSectionOnWhatsApp = (sectionId, title) => {
      const description = getSectionDescription(sectionId);
      const baseUrl = window.location.href.split('#')[0];
      const shareUrl = `${baseUrl}#${sectionId}`;
      const text = description ? `${title}\n\n${description}\n\n${shareUrl}` : `${title}\n\n${shareUrl}`;
      window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    };
    const clearPrintTarget = () => {
      printSectionId.value = null;
    };
    const printSection = sectionId => {
      printSectionId.value = sectionId;
      window.setTimeout(() => {
        window.print();
      }, 80);
    };
    const downloadSectionPdf = (sectionId, title) => {
      const bodyBlocks = buildSectionPdfBlocks(sectionId);
      if (!bodyBlocks.length) {
        return;
      }
      const pdf = new jspdf__WEBPACK_IMPORTED_MODULE_1__.jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 52;
      const contentWidth = pageWidth - margin * 2;
      const pageInnerBottom = pageHeight - margin;
      const baseLineHeight = 18;
      let cursorY = margin;
      const baseUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
      const sectionUrl = baseUrl ? `${baseUrl}#${sectionId}` : '';
      const ensureSpace = (heightNeeded = baseLineHeight) => {
        if (cursorY + heightNeeded <= pageInnerBottom) {
          return;
        }
        pdf.addPage();
        cursorY = margin;
      };
      const addWrappedText = (content, options = {}) => {
        const {
          fontSize = 12,
          fontStyle = 'normal',
          color = [28, 40, 34],
          gapAfter = 14,
          lineHeight = baseLineHeight
        } = options;
        pdf.setFont('helvetica', fontStyle);
        pdf.setFontSize(fontSize);
        pdf.setTextColor(...color);
        pdf.setLineHeightFactor(lineHeight / fontSize);
        const lines = pdf.splitTextToSize(content, contentWidth);
        const blockHeight = lines.length * lineHeight;
        ensureSpace(blockHeight + gapAfter);
        pdf.text(lines, margin, cursorY);
        cursorY += blockHeight + gapAfter;
      };
      pdf.setDrawColor(23, 102, 95);
      pdf.setFillColor(237, 246, 245);
      pdf.roundedRect(margin, cursorY, contentWidth, 56, 14, 14, 'FD');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(23, 102, 95);
      pdf.text('Islamic Connect', margin + 16, cursorY + 20);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor(93, 109, 98);
      pdf.text('Hajj & Umrah Guide', margin + 16, cursorY + 37);
      cursorY += 76;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(15, 73, 68);
      const titleLines = pdf.splitTextToSize(title, contentWidth);
      ensureSpace(titleLines.length * 26 + 12);
      pdf.text(titleLines, margin, cursorY);
      cursorY += titleLines.length * 26 + 10;
      const description = getSectionDescription(sectionId);
      if (description) {
        addWrappedText(description, {
          fontSize: 11.5,
          color: [93, 109, 98],
          gapAfter: 18,
          lineHeight: 17
        });
      }
      pdf.setDrawColor(210, 227, 223);
      pdf.line(margin, cursorY, margin + contentWidth, cursorY);
      cursorY += 18;
      bodyBlocks.forEach(block => {
        if (block.kind === 'heading') {
          addWrappedText(block.text, {
            fontSize: 13,
            fontStyle: 'bold',
            color: [15, 73, 68],
            gapAfter: 10,
            lineHeight: 17
          });
          return;
        }
        if (block.kind === 'reference') {
          addWrappedText(block.text, {
            fontSize: 10.5,
            color: [93, 109, 98],
            gapAfter: 12,
            lineHeight: 15
          });
          return;
        }
        if (block.kind === 'note') {
          addWrappedText(block.text, {
            fontSize: 11,
            color: [93, 109, 98],
            gapAfter: 14,
            lineHeight: 16
          });
          return;
        }
        addWrappedText(block.text, {
          fontSize: 11.5,
          color: [28, 40, 34],
          gapAfter: 14,
          lineHeight: 17
        });
      });
      if (sectionUrl) {
        cursorY += 4;
        ensureSpace(30);
        pdf.setDrawColor(210, 227, 223);
        pdf.line(margin, cursorY, margin + contentWidth, cursorY);
        cursorY += 18;
        addWrappedText(`Section link: ${sectionUrl}`, {
          fontSize: 10,
          color: [93, 109, 98],
          gapAfter: 0,
          lineHeight: 14
        });
      }
      const pageCount = pdf.getNumberOfPages();
      for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
        pdf.setPage(pageNumber);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.5);
        pdf.setTextColor(120, 132, 125);
        pdf.text(`${title}  •  Page ${pageNumber} of ${pageCount}`, margin, pageHeight - 24);
      }
      pdf.save(`${slugifyFileName(title)}.pdf`);
    };
    const openAiSummary = () => {
      isAiSummaryOpen.value = true;
    };
    const closeAiSummary = () => {
      isAiSummaryOpen.value = false;
      isAiSummaryMaximized.value = false;
    };
    const toggleAiSummaryMaximize = () => {
      isAiSummaryMaximized.value = !isAiSummaryMaximized.value;
    };
    const downloadPdf = guide => {
      const link = document.createElement('a');
      link.href = guide.url;
      link.download = guide.filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const syncDarkMode = () => {
      var _document$body;
      const rootTheme = document.documentElement.getAttribute('data-bs-theme');
      isDarkMode.value = ((_document$body = document.body) === null || _document$body === void 0 ? void 0 : _document$body.classList.contains('dark-mode')) || document.documentElement.classList.contains('dark-mode') || rootTheme === 'dark';
    };
    let sectionObserver;
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      syncDarkMode();
      window.addEventListener('afterprint', clearPrintTarget);
      themeObserver = new MutationObserver(() => {
        syncDarkMode();
      });
      if (document.body) {
        themeObserver.observe(document.body, {
          attributes: true,
          attributeFilter: ['class', 'data-bs-theme', 'data-theme']
        });
      }
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-bs-theme', 'data-theme']
      });
      const animatedSections = Array.from(document.querySelectorAll('.fade-in-section'));
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const compactViewport = window.matchMedia('(max-width: 768px)').matches;
      if (prefersReducedMotion || compactViewport) {
        animatedSections.forEach(element => {
          element.classList.add('visible');
        });
        return;
      }
      sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.12
      });
      animatedSections.forEach(element => {
        sectionObserver.observe(element);
      });
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(searchQuery, async () => {
      await (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)();
      applySearchHighlights();
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(activeFaq, async () => {
      if (!searchQuery.value) {
        return;
      }
      await (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)();
      applySearchHighlights();
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
      window.removeEventListener('afterprint', clearPrintTarget);
      clearSearchHighlights(document.querySelector('.main-container'));
      if (themeObserver) {
        themeObserver.disconnect();
      }
      if (sectionObserver) {
        sectionObserver.disconnect();
      }
      window.clearTimeout(copyFeedbackTimeout);
    });
    const __returned__ = {
      content,
      labels,
      hero,
      guidesSection,
      sections,
      defaultSectionImage,
      sectionImages,
      pdfGuides,
      basicsCards,
      hajjTypes,
      umrahSteps,
      hajjDays,
      commonMistakes,
      healthReadiness,
      rules,
      spiritualPrep,
      shorts,
      resources,
      faqs,
      postHajjSteps,
      summarySection,
      sectionReferences,
      disclaimer,
      closing,
      DEFAULT_SECTION_FONT_SCALE,
      MIN_SECTION_FONT_SCALE,
      MAX_SECTION_FONT_SCALE,
      SECTION_FONT_STEP,
      sectionIds,
      SEARCH_SKIP_SELECTOR,
      activeFaq,
      copiedSectionId,
      printSectionId,
      isDarkMode,
      isAiSummaryOpen,
      isAiSummaryMaximized,
      searchQuery,
      searchMatchCount,
      searchMatchedSectionIds,
      searchFirstMatchSectionId,
      sectionFontScales,
      get copyFeedbackTimeout() {
        return copyFeedbackTimeout;
      },
      set copyFeedbackTimeout(v) {
        copyFeedbackTimeout = v;
      },
      get themeObserver() {
        return themeObserver;
      },
      set themeObserver(v) {
        themeObserver = v;
      },
      searchableSectionIds,
      searchMatchLabel,
      summaryMetrics,
      scrollToSection,
      clearSearchHighlights,
      escapeRegExp,
      applySearchHighlights,
      clearSearch,
      focusFirstSearchResult,
      toggleFaq,
      getSectionScale,
      getSectionStyle,
      formatSectionScale,
      changeSectionFontSize,
      getSectionElement,
      getSectionDescription,
      slugifyFileName,
      buildSectionText,
      normalizePdfText,
      buildSectionPdfBlocks,
      fallbackCopyText,
      setCopiedState,
      copySectionText,
      shareSectionOnWhatsApp,
      clearPrintTarget,
      printSection,
      downloadSectionPdf,
      openAiSummary,
      closeAiSummary,
      toggleAiSummaryMaximize,
      downloadPdf,
      syncDarkMode,
      get sectionObserver() {
        return sectionObserver;
      },
      set sectionObserver(v) {
        sectionObserver = v;
      },
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      nextTick: vue__WEBPACK_IMPORTED_MODULE_0__.nextTick,
      onBeforeUnmount: vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      watch: vue__WEBPACK_IMPORTED_MODULE_0__.watch,
      get jsPDF() {
        return jspdf__WEBPACK_IMPORTED_MODULE_1__.jsPDF;
      },
      get hajjUmrahContent() {
        return _data_hajj_umrah_content_json__WEBPACK_IMPORTED_MODULE_2__;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "main-container"
};
const _hoisted_2 = {
  class: "hero fade-in-section"
};
const _hoisted_3 = {
  class: "hero-shell"
};
const _hoisted_4 = {
  class: "hero-copy hero-copy--full"
};
const _hoisted_5 = {
  class: "hero-copy-inner"
};
const _hoisted_6 = {
  class: "hero-heading-block"
};
const _hoisted_7 = {
  class: "hero-topline"
};
const _hoisted_8 = {
  class: "hero-kicker"
};
const _hoisted_9 = {
  class: "hero-title"
};
const _hoisted_10 = {
  class: "hero-subtitle"
};
const _hoisted_11 = {
  class: "hero-proof",
  "aria-label": "Key references"
};
const _hoisted_12 = {
  class: "hero-actions"
};
const _hoisted_13 = {
  class: "hero-tools-panel"
};
const _hoisted_14 = {
  class: "hero-panel-head"
};
const _hoisted_15 = {
  class: "hero-search-meta hero-search-meta--live"
};
const _hoisted_16 = {
  class: "hero-search-panel"
};
const _hoisted_17 = {
  class: "hero-search-field"
};
const _hoisted_18 = ["onKeydown"];
const _hoisted_19 = {
  class: "hero-search-feedback"
};
const _hoisted_20 = {
  class: "sec fade-in-section",
  id: "guides"
};
const _hoisted_21 = {
  class: "sec-hd sec-hd-center"
};
const _hoisted_22 = {
  class: "eyebrow"
};
const _hoisted_23 = {
  class: "sec-title"
};
const _hoisted_24 = {
  class: "sec-desc"
};
const _hoisted_25 = {
  class: "pdf-grid"
};
const _hoisted_26 = {
  class: "pdf-card-copy"
};
const _hoisted_27 = {
  class: "pdf-label"
};
const _hoisted_28 = ["onClick"];
const _hoisted_29 = {
  class: "sec-header-with-image"
};
const _hoisted_30 = {
  class: "sec-hd"
};
const _hoisted_31 = {
  class: "eyebrow"
};
const _hoisted_32 = {
  class: "sec-title"
};
const _hoisted_33 = {
  class: "sec-desc"
};
const _hoisted_34 = {
  class: "section-tools",
  "data-section-tools": ""
};
const _hoisted_35 = {
  class: "font-controls"
};
const _hoisted_36 = {
  class: "font-chip"
};
const _hoisted_37 = {
  class: "font-label"
};
const _hoisted_38 = {
  class: "font-actions"
};
const _hoisted_39 = ["disabled", "aria-label"];
const _hoisted_40 = {
  class: "font-scale"
};
const _hoisted_41 = ["disabled", "aria-label"];
const _hoisted_42 = {
  class: "sec-image"
};
const _hoisted_43 = ["src", "alt"];
const _hoisted_44 = {
  class: "image-credit"
};
const _hoisted_45 = {
  class: "cards-grid"
};
const _hoisted_46 = {
  class: "card-num"
};
const _hoisted_47 = {
  class: "card-note"
};
const _hoisted_48 = {
  class: "types-grid"
};
const _hoisted_49 = {
  class: "type-note"
};
const _hoisted_50 = {
  class: "reference-panel"
};
const _hoisted_51 = {
  class: "reference-list"
};
const _hoisted_52 = {
  class: "sec-header-with-image"
};
const _hoisted_53 = {
  class: "sec-hd"
};
const _hoisted_54 = {
  class: "eyebrow"
};
const _hoisted_55 = {
  class: "sec-title"
};
const _hoisted_56 = {
  class: "sec-desc"
};
const _hoisted_57 = {
  class: "section-tools",
  "data-section-tools": ""
};
const _hoisted_58 = {
  class: "font-controls"
};
const _hoisted_59 = {
  class: "font-chip"
};
const _hoisted_60 = {
  class: "font-label"
};
const _hoisted_61 = {
  class: "font-actions"
};
const _hoisted_62 = ["disabled", "aria-label"];
const _hoisted_63 = {
  class: "font-scale"
};
const _hoisted_64 = ["disabled", "aria-label"];
const _hoisted_65 = {
  class: "sec-image"
};
const _hoisted_66 = ["src", "alt"];
const _hoisted_67 = {
  class: "image-credit"
};
const _hoisted_68 = {
  class: "tl"
};
const _hoisted_69 = {
  class: "tl-left"
};
const _hoisted_70 = {
  class: "tl-num"
};
const _hoisted_71 = {
  key: 0,
  class: "tl-line"
};
const _hoisted_72 = {
  class: "tl-body"
};
const _hoisted_73 = {
  class: "tl-tip"
};
const _hoisted_74 = {
  class: "tl-ref"
};
const _hoisted_75 = {
  class: "conclusion"
};
const _hoisted_76 = {
  class: "reference-panel"
};
const _hoisted_77 = {
  class: "reference-list"
};
const _hoisted_78 = {
  class: "sec-header-with-image"
};
const _hoisted_79 = {
  class: "sec-hd"
};
const _hoisted_80 = {
  class: "eyebrow"
};
const _hoisted_81 = {
  class: "sec-title"
};
const _hoisted_82 = {
  class: "sec-desc"
};
const _hoisted_83 = {
  class: "section-tools",
  "data-section-tools": ""
};
const _hoisted_84 = {
  class: "font-controls"
};
const _hoisted_85 = {
  class: "font-chip"
};
const _hoisted_86 = {
  class: "font-label"
};
const _hoisted_87 = {
  class: "font-actions"
};
const _hoisted_88 = ["disabled", "aria-label"];
const _hoisted_89 = {
  class: "font-scale"
};
const _hoisted_90 = ["disabled", "aria-label"];
const _hoisted_91 = {
  class: "sec-image"
};
const _hoisted_92 = ["src", "alt"];
const _hoisted_93 = {
  class: "image-credit"
};
const _hoisted_94 = {
  class: "days-grid"
};
const _hoisted_95 = {
  class: "day-head"
};
const _hoisted_96 = {
  class: "day-date"
};
const _hoisted_97 = {
  class: "day-body"
};
const _hoisted_98 = {
  class: "day-reminder"
};
const _hoisted_99 = {
  class: "day-ref"
};
const _hoisted_100 = {
  class: "farewell"
};
const _hoisted_101 = {
  class: "farewell-arabic"
};
const _hoisted_102 = {
  class: "reference-panel"
};
const _hoisted_103 = {
  class: "reference-list"
};
const _hoisted_104 = {
  class: "sec-header-with-image"
};
const _hoisted_105 = {
  class: "sec-hd"
};
const _hoisted_106 = {
  class: "eyebrow"
};
const _hoisted_107 = {
  class: "sec-title"
};
const _hoisted_108 = {
  class: "sec-desc"
};
const _hoisted_109 = {
  class: "section-tools",
  "data-section-tools": ""
};
const _hoisted_110 = {
  class: "font-controls"
};
const _hoisted_111 = {
  class: "font-chip"
};
const _hoisted_112 = {
  class: "font-label"
};
const _hoisted_113 = {
  class: "font-actions"
};
const _hoisted_114 = ["disabled", "aria-label"];
const _hoisted_115 = {
  class: "font-scale"
};
const _hoisted_116 = ["disabled", "aria-label"];
const _hoisted_117 = {
  class: "sec-image"
};
const _hoisted_118 = ["src", "alt"];
const _hoisted_119 = {
  class: "image-credit"
};
const _hoisted_120 = {
  class: "cards-grid"
};
const _hoisted_121 = {
  class: "card-note"
};
const _hoisted_122 = {
  class: "reference-panel"
};
const _hoisted_123 = {
  class: "reference-list"
};
const _hoisted_124 = {
  class: "sec-header-with-image"
};
const _hoisted_125 = {
  class: "sec-hd"
};
const _hoisted_126 = {
  class: "eyebrow"
};
const _hoisted_127 = {
  class: "sec-title"
};
const _hoisted_128 = {
  class: "sec-desc"
};
const _hoisted_129 = {
  class: "section-tools",
  "data-section-tools": ""
};
const _hoisted_130 = {
  class: "font-controls"
};
const _hoisted_131 = {
  class: "font-chip"
};
const _hoisted_132 = {
  class: "font-label"
};
const _hoisted_133 = {
  class: "font-actions"
};
const _hoisted_134 = ["disabled", "aria-label"];
const _hoisted_135 = {
  class: "font-scale"
};
const _hoisted_136 = ["disabled", "aria-label"];
const _hoisted_137 = {
  class: "sec-image"
};
const _hoisted_138 = ["src", "alt"];
const _hoisted_139 = {
  class: "image-credit"
};
const _hoisted_140 = {
  class: "rules-grid"
};
const _hoisted_141 = {
  class: "rules-hdr pos"
};
const _hoisted_142 = {
  class: "rules-list"
};
const _hoisted_143 = {
  class: "section-note"
};
const _hoisted_144 = {
  class: "reference-panel"
};
const _hoisted_145 = {
  class: "reference-list"
};
const _hoisted_146 = {
  class: "sec-header-with-image"
};
const _hoisted_147 = {
  class: "sec-hd"
};
const _hoisted_148 = {
  class: "eyebrow"
};
const _hoisted_149 = {
  class: "sec-title"
};
const _hoisted_150 = {
  class: "sec-desc"
};
const _hoisted_151 = {
  class: "section-tools",
  "data-section-tools": ""
};
const _hoisted_152 = {
  class: "font-controls"
};
const _hoisted_153 = {
  class: "font-chip"
};
const _hoisted_154 = {
  class: "font-label"
};
const _hoisted_155 = {
  class: "font-actions"
};
const _hoisted_156 = ["disabled", "aria-label"];
const _hoisted_157 = {
  class: "font-scale"
};
const _hoisted_158 = ["disabled", "aria-label"];
const _hoisted_159 = {
  class: "sec-image"
};
const _hoisted_160 = ["src", "alt"];
const _hoisted_161 = {
  class: "image-credit"
};
const _hoisted_162 = {
  class: "rules-grid"
};
const _hoisted_163 = {
  class: "rules-card"
};
const _hoisted_164 = {
  class: "rules-hdr pos"
};
const _hoisted_165 = {
  class: "rules-list"
};
const _hoisted_166 = {
  class: "rules-card"
};
const _hoisted_167 = {
  class: "rules-hdr neg"
};
const _hoisted_168 = {
  class: "rules-list"
};
const _hoisted_169 = {
  class: "section-note"
};
const _hoisted_170 = {
  class: "reference-panel"
};
const _hoisted_171 = {
  class: "reference-list"
};
const _hoisted_172 = {
  class: "sec-header-with-image"
};
const _hoisted_173 = {
  class: "sec-hd"
};
const _hoisted_174 = {
  class: "eyebrow"
};
const _hoisted_175 = {
  class: "sec-title"
};
const _hoisted_176 = {
  class: "sec-desc"
};
const _hoisted_177 = {
  class: "section-tools",
  "data-section-tools": ""
};
const _hoisted_178 = {
  class: "font-controls"
};
const _hoisted_179 = {
  class: "font-chip"
};
const _hoisted_180 = {
  class: "font-label"
};
const _hoisted_181 = {
  class: "font-actions"
};
const _hoisted_182 = ["disabled", "aria-label"];
const _hoisted_183 = {
  class: "font-scale"
};
const _hoisted_184 = ["disabled", "aria-label"];
const _hoisted_185 = {
  class: "sec-image"
};
const _hoisted_186 = ["src", "alt"];
const _hoisted_187 = {
  class: "image-credit"
};
const _hoisted_188 = {
  class: "cards-grid"
};
const _hoisted_189 = {
  class: "card-num"
};
const _hoisted_190 = {
  class: "card-note"
};
const _hoisted_191 = {
  class: "reference-panel"
};
const _hoisted_192 = {
  class: "reference-list"
};
const _hoisted_193 = {
  class: "sec fade-in-section",
  id: "shorts"
};
const _hoisted_194 = {
  class: "sec-hd sec-hd-center"
};
const _hoisted_195 = {
  class: "eyebrow"
};
const _hoisted_196 = {
  class: "sec-title"
};
const _hoisted_197 = {
  class: "sec-desc"
};
const _hoisted_198 = {
  class: "shorts-grid"
};
const _hoisted_199 = {
  class: "short-frame"
};
const _hoisted_200 = ["src", "title"];
const _hoisted_201 = {
  class: "short-copy"
};
const _hoisted_202 = {
  class: "resource-label"
};
const _hoisted_203 = {
  class: "sec-hd sec-hd-center"
};
const _hoisted_204 = {
  class: "eyebrow"
};
const _hoisted_205 = {
  class: "sec-title"
};
const _hoisted_206 = {
  class: "sec-desc"
};
const _hoisted_207 = {
  class: "section-tools section-tools-center",
  "data-section-tools": ""
};
const _hoisted_208 = {
  class: "font-controls"
};
const _hoisted_209 = {
  class: "font-chip"
};
const _hoisted_210 = {
  class: "font-label"
};
const _hoisted_211 = {
  class: "font-actions"
};
const _hoisted_212 = ["disabled", "aria-label"];
const _hoisted_213 = {
  class: "font-scale"
};
const _hoisted_214 = ["disabled", "aria-label"];
const _hoisted_215 = {
  class: "resource-grid"
};
const _hoisted_216 = {
  class: "resource-label"
};
const _hoisted_217 = {
  class: "resource-url"
};
const _hoisted_218 = {
  class: "faq-wrap"
};
const _hoisted_219 = ["onClick"];
const _hoisted_220 = {
  class: "faq-a"
};
const _hoisted_221 = {
  class: "faq-ref"
};
const _hoisted_222 = {
  class: "sec-header-with-image"
};
const _hoisted_223 = {
  class: "sec-hd"
};
const _hoisted_224 = {
  class: "eyebrow"
};
const _hoisted_225 = {
  class: "sec-title"
};
const _hoisted_226 = {
  class: "sec-desc"
};
const _hoisted_227 = {
  class: "section-tools",
  "data-section-tools": ""
};
const _hoisted_228 = {
  class: "font-controls"
};
const _hoisted_229 = {
  class: "font-chip"
};
const _hoisted_230 = {
  class: "font-label"
};
const _hoisted_231 = {
  class: "font-actions"
};
const _hoisted_232 = ["disabled", "aria-label"];
const _hoisted_233 = {
  class: "font-scale"
};
const _hoisted_234 = ["disabled", "aria-label"];
const _hoisted_235 = {
  class: "sec-image"
};
const _hoisted_236 = ["src", "alt"];
const _hoisted_237 = {
  class: "image-credit"
};
const _hoisted_238 = {
  class: "tl"
};
const _hoisted_239 = {
  class: "tl-left"
};
const _hoisted_240 = {
  class: "tl-num"
};
const _hoisted_241 = {
  key: 0,
  class: "tl-line"
};
const _hoisted_242 = {
  class: "tl-body"
};
const _hoisted_243 = {
  class: "tl-tip"
};
const _hoisted_244 = {
  class: "tl-ref"
};
const _hoisted_245 = {
  class: "disclaimer-section fade-in-section"
};
const _hoisted_246 = {
  class: "disclaimer-box"
};
const _hoisted_247 = {
  class: "ref-text"
};
const _hoisted_248 = {
  class: "ref-list"
};
const _hoisted_249 = {
  class: "warning-box"
};
const _hoisted_250 = {
  class: "warning-content"
};
const _hoisted_251 = {
  class: "closing fade-in-section"
};
const _hoisted_252 = {
  class: "closing-arabic"
};
const _hoisted_253 = {
  class: "closing-en"
};
const _hoisted_254 = {
  class: "closing-ref"
};
const _hoisted_255 = {
  class: "closing-msg"
};
const _hoisted_256 = ["aria-label"];
const _hoisted_257 = {
  class: "ai-summary-panel-header"
};
const _hoisted_258 = {
  class: "eyebrow"
};
const _hoisted_259 = {
  class: "ai-summary-panel-title"
};
const _hoisted_260 = {
  class: "ai-summary-panel-actions"
};
const _hoisted_261 = ["aria-label"];
const _hoisted_262 = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
};
const _hoisted_263 = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "currentColor"
};
const _hoisted_264 = {
  class: "ai-summary-panel-body"
};
const _hoisted_265 = {
  class: "summary-pills ai-summary-panel-pills"
};
const _hoisted_266 = {
  class: "summary-pill"
};
const _hoisted_267 = {
  class: "summary-pill"
};
const _hoisted_268 = {
  class: "summary-card ai-summary-card"
};
const _hoisted_269 = {
  class: "summary-intro"
};
const _hoisted_270 = {
  class: "summary-points"
};
const _hoisted_271 = {
  class: "summary-footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["pg", {
      'is-dark': $setup.isDarkMode
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.hero.kicker), 1 /* TEXT */), _cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hero-search-meta"
  }, "Source-led guide", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.hero.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.hero.subtitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.hero.proofPills, pill => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: pill,
      class: "hero-proof-pill"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(pill), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "hero-btn-primary",
    onClick: _cache[0] || (_cache[0] = $event => $setup.scrollToSection($setup.hero.primaryButton.target))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.hero.primaryButton.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "hero-btn-secondary",
    onClick: _cache[1] || (_cache[1] = $event => $setup.scrollToSection($setup.hero.secondaryButton.target))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.hero.secondaryButton.label), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hero-search-kicker"
  }, "Search the guide"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-panel-copy"
  }, "Find a rite, rule, or health topic and jump straight to the first relevant section.")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.searchMatchLabel), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hero-search-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M10 4a6 6 0 1 0 3.9 10.56l4.27 4.27 1.41-1.41-4.27-4.27A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.searchQuery = $event),
    type: "search",
    class: "hero-search-input",
    placeholder: "Search rites, health, Ihram, Arafah...",
    "aria-label": "Search this guide",
    onKeydown: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($setup.focusFirstSearchResult, ["prevent"]), ["enter"])
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_18), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.searchQuery, void 0, {
    trim: true
  }]]), $setup.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "hero-search-clear",
    onClick: $setup.clearSearch
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hero-search-hint"
  }, "Press Enter to jump to the first match.", -1 /* CACHED */)), $setup.searchFirstMatchSectionId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    type: "button",
    class: "hero-search-jump-btn",
    onClick: $setup.focusFirstSearchResult
  }, " Jump to first result ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.guidesSection.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.guidesSection.title), 1 /* TEXT */), _cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.guidesSection.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.pdfGuides, guide => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: guide.url,
      class: "pdf-card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.desc), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "download-btn",
      onClick: $event => $setup.downloadPdf(guide)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 9 /* TEXT, PROPS */, _hoisted_28)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "basics",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec alt fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'basics'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('basics'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.basics.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.basics.title), 1 /* TEXT */), _cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.basics.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[3] || (_cache[3] = $event => $setup.shareSectionOnWhatsApp('basics', $setup.sections.basics.title))
  }, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[4] || (_cache[4] = $event => $setup.copySectionText('basics'))
  }, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'basics' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[5] || (_cache[5] = $event => $setup.printSection('basics'))
  }, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[6] || (_cache[6] = $event => $setup.downloadSectionPdf('basics', $setup.sections.basics.title))
  }, [_cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('basics') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.basics.title}`,
    onClick: _cache[7] || (_cache[7] = $event => $setup.changeSectionFontSize('basics', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_39), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('basics')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('basics') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.basics.title}`,
    onClick: _cache[8] || (_cache[8] = $event => $setup.changeSectionFontSize('basics', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_41)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.basics.src,
    alt: $setup.sectionImages.basics.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_43), _cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.imageCreditPrefix) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.basics.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.basicsCards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.num,
      class: "card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.note), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.hajjTypes, type => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: type.title,
      class: "type-card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(type.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(type.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(type.note), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.keyReferences), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.basics, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "umrah",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'umrah'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('umrah'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.umrah.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.umrah.title), 1 /* TEXT */), _cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.umrah.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[9] || (_cache[9] = $event => $setup.shareSectionOnWhatsApp('umrah', $setup.sections.umrah.title))
  }, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[10] || (_cache[10] = $event => $setup.copySectionText('umrah'))
  }, [_cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'umrah' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[11] || (_cache[11] = $event => $setup.printSection('umrah'))
  }, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[12] || (_cache[12] = $event => $setup.downloadSectionPdf('umrah', $setup.sections.umrah.title))
  }, [_cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [_cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_60, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('umrah') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.umrah.title}`,
    onClick: _cache[13] || (_cache[13] = $event => $setup.changeSectionFontSize('umrah', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_62), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('umrah')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('umrah') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.umrah.title}`,
    onClick: _cache[14] || (_cache[14] = $event => $setup.changeSectionFontSize('umrah', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_64)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.umrah.src,
    alt: $setup.sectionImages.umrah.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_66), _cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.imageCreditPrefix) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.umrah.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.umrahSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: step.num,
      class: "tl-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.num), 1 /* TEXT */), index !== $setup.umrahSteps.length - 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_71)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.tip), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.ref), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.umrah.conclusion.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.umrah.conclusion.text), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.keyReferences), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.umrah, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "hajj",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec alt fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'hajj'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('hajj'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_80, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.hajj.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_81, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.hajj.title), 1 /* TEXT */), _cache[81] || (_cache[81] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_82, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.hajj.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[15] || (_cache[15] = $event => $setup.shareSectionOnWhatsApp('hajj', $setup.sections.hajj.title))
  }, [_cache[76] || (_cache[76] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[16] || (_cache[16] = $event => $setup.copySectionText('hajj'))
  }, [_cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'hajj' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[17] || (_cache[17] = $event => $setup.printSection('hajj'))
  }, [_cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[18] || (_cache[18] = $event => $setup.downloadSectionPdf('hajj', $setup.sections.hajj.title))
  }, [_cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [_cache[80] || (_cache[80] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_86, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('hajj') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.hajj.title}`,
    onClick: _cache[19] || (_cache[19] = $event => $setup.changeSectionFontSize('hajj', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_88), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_89, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('hajj')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('hajj') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.hajj.title}`,
    onClick: _cache[20] || (_cache[20] = $event => $setup.changeSectionFontSize('hajj', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_90)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_91, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.hajj.src,
    alt: $setup.sectionImages.hajj.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_92), _cache[82] || (_cache[82] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.imageCreditPrefix) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.hajj.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.hajjDays, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: day.date,
      class: "day-card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_96, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.reminder), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.ref), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.hajj.farewell.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.hajj.farewell.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.hajj.farewell.text), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.hajj.farewell.reference), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.keyReferences), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.hajj, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "mistakes",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'mistakes'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('mistakes'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_106, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.mistakes.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_107, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.mistakes.title), 1 /* TEXT */), _cache[88] || (_cache[88] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_108, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.mistakes.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[21] || (_cache[21] = $event => $setup.shareSectionOnWhatsApp('mistakes', $setup.sections.mistakes.title))
  }, [_cache[83] || (_cache[83] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[22] || (_cache[22] = $event => $setup.copySectionText('mistakes'))
  }, [_cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'mistakes' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[23] || (_cache[23] = $event => $setup.printSection('mistakes'))
  }, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[24] || (_cache[24] = $event => $setup.downloadSectionPdf('mistakes', $setup.sections.mistakes.title))
  }, [_cache[86] || (_cache[86] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [_cache[87] || (_cache[87] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_112, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('mistakes') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.mistakes.title}`,
    onClick: _cache[25] || (_cache[25] = $event => $setup.changeSectionFontSize('mistakes', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_114), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_115, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('mistakes')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('mistakes') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.mistakes.title}`,
    onClick: _cache[26] || (_cache[26] = $event => $setup.changeSectionFontSize('mistakes', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_116)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.mistakes.src,
    alt: $setup.sectionImages.mistakes.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_118), _cache[89] || (_cache[89] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.imageCreditPrefix) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.mistakes.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_120, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.commonMistakes, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.title,
      class: "card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_121, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.note), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_122, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.keyReferences), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_123, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.mistakes, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "health",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec alt fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'health'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('health'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_124, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_125, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_126, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.health.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_127, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.health.title), 1 /* TEXT */), _cache[95] || (_cache[95] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_128, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.health.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_129, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[27] || (_cache[27] = $event => $setup.shareSectionOnWhatsApp('health', $setup.sections.health.title))
  }, [_cache[90] || (_cache[90] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[28] || (_cache[28] = $event => $setup.copySectionText('health'))
  }, [_cache[91] || (_cache[91] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'health' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[29] || (_cache[29] = $event => $setup.printSection('health'))
  }, [_cache[92] || (_cache[92] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[30] || (_cache[30] = $event => $setup.downloadSectionPdf('health', $setup.sections.health.title))
  }, [_cache[93] || (_cache[93] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_130, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_131, [_cache[94] || (_cache[94] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_132, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('health') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.health.title}`,
    onClick: _cache[31] || (_cache[31] = $event => $setup.changeSectionFontSize('health', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_134), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_135, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('health')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('health') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.health.title}`,
    onClick: _cache[32] || (_cache[32] = $event => $setup.changeSectionFontSize('health', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_136)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_137, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.health.src,
    alt: $setup.sectionImages.health.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_138), _cache[96] || (_cache[96] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_139, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.imageCreditPrefix) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.health.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_140, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.healthReadiness, group => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: group.title,
      class: "rules-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_141, [_cache[97] || (_cache[97] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M12 2 3 7v5c0 5.1 3.4 9.8 9 11 5.6-1.2 9-5.9 9-11V7zm-1 14-4-4 1.4-1.4 2.6 2.6 5.6-5.6L18 9z"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_142, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(group.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, [_cache[98] || (_cache[98] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "dot-y"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
        d: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
      })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_143, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.health.note), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_144, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.keyReferences), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_145, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.health, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "rules",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'rules'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('rules'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_146, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_147, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_148, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.rules.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_149, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.rules.title), 1 /* TEXT */), _cache[104] || (_cache[104] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_150, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.rules.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_151, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[33] || (_cache[33] = $event => $setup.shareSectionOnWhatsApp('rules', $setup.sections.rules.title))
  }, [_cache[99] || (_cache[99] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[34] || (_cache[34] = $event => $setup.copySectionText('rules'))
  }, [_cache[100] || (_cache[100] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'rules' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[35] || (_cache[35] = $event => $setup.printSection('rules'))
  }, [_cache[101] || (_cache[101] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[36] || (_cache[36] = $event => $setup.downloadSectionPdf('rules', $setup.sections.rules.title))
  }, [_cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_152, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [_cache[103] || (_cache[103] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_154, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_155, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('rules') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.rules.title}`,
    onClick: _cache[37] || (_cache[37] = $event => $setup.changeSectionFontSize('rules', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_156), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_157, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('rules')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('rules') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.rules.title}`,
    onClick: _cache[38] || (_cache[38] = $event => $setup.changeSectionFontSize('rules', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_158)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_159, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.rules.src,
    alt: $setup.sectionImages.rules.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_160), _cache[105] || (_cache[105] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_161, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.imageCreditPrefix) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.rules.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_162, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_163, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_164, [_cache[106] || (_cache[106] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.rules.permissibleTitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_165, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.rules.permissible, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, [_cache[107] || (_cache[107] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "dot-y"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
    })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_166, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_167, [_cache[108] || (_cache[108] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.rules.prohibitedTitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_168, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.rules.prohibited, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, [_cache[109] || (_cache[109] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "dot-n"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_169, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.rules.note), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_170, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.keyReferences), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_171, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.rules, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "spiritual",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec alt fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'spiritual'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('spiritual'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_172, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_173, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_174, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.spiritual.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_175, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.spiritual.title), 1 /* TEXT */), _cache[115] || (_cache[115] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_176, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.spiritual.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_177, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[39] || (_cache[39] = $event => $setup.shareSectionOnWhatsApp('spiritual', $setup.sections.spiritual.title))
  }, [_cache[110] || (_cache[110] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[40] || (_cache[40] = $event => $setup.copySectionText('spiritual'))
  }, [_cache[111] || (_cache[111] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'spiritual' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[41] || (_cache[41] = $event => $setup.printSection('spiritual'))
  }, [_cache[112] || (_cache[112] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[42] || (_cache[42] = $event => $setup.downloadSectionPdf('spiritual', $setup.sections.spiritual.title))
  }, [_cache[113] || (_cache[113] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_178, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_179, [_cache[114] || (_cache[114] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_180, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_181, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('spiritual') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.spiritual.title}`,
    onClick: _cache[43] || (_cache[43] = $event => $setup.changeSectionFontSize('spiritual', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_182), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_183, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('spiritual')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('spiritual') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.spiritual.title}`,
    onClick: _cache[44] || (_cache[44] = $event => $setup.changeSectionFontSize('spiritual', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_184)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_185, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.spiritual.src,
    alt: $setup.sectionImages.spiritual.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_186), _cache[116] || (_cache[116] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_187, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.imageCreditPrefix) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.spiritual.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_188, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.spiritualPrep, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.step,
      class: "card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_189, "Step " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.step), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_190, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ref), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_191, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.keyReferences), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_192, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.spiritual, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_193, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_194, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_195, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.shorts.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_196, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.shorts.title), 1 /* TEXT */), _cache[117] || (_cache[117] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_197, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.shorts.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_198, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.shorts, video => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: video.id,
      class: "short-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_199, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
      src: `https://www.youtube-nocookie.com/embed/${video.id}`,
      title: video.title,
      loading: "lazy",
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: ""
    }, null, 8 /* PROPS */, _hoisted_200)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_201, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_202, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.channel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.note), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "resources",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec alt fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'resources'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('resources'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_203, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_204, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.resources.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_205, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.resources.title), 1 /* TEXT */), _cache[123] || (_cache[123] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_206, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.resources.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_207, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[45] || (_cache[45] = $event => $setup.shareSectionOnWhatsApp('resources', $setup.sections.resources.title))
  }, [_cache[118] || (_cache[118] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[46] || (_cache[46] = $event => $setup.copySectionText('resources'))
  }, [_cache[119] || (_cache[119] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'resources' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[47] || (_cache[47] = $event => $setup.printSection('resources'))
  }, [_cache[120] || (_cache[120] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[48] || (_cache[48] = $event => $setup.downloadSectionPdf('resources', $setup.sections.resources.title))
  }, [_cache[121] || (_cache[121] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_208, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_209, [_cache[122] || (_cache[122] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_210, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_211, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('resources') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.resources.title}`,
    onClick: _cache[49] || (_cache[49] = $event => $setup.changeSectionFontSize('resources', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_212), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_213, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('resources')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('resources') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.resources.title}`,
    onClick: _cache[50] || (_cache[50] = $event => $setup.changeSectionFontSize('resources', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_214)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_215, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.resources, resource => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: resource.title,
      class: "resource-card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_216, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_217, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_218, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.faqTitle), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.faqs, (faq, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: faq.q,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-item", {
        open: $setup.activeFaq === index
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "faq-q",
      onClick: $event => $setup.toggleFaq(index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.q), 1 /* TEXT */), _cache[124] || (_cache[124] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "m7 10 5 5 5-5z"
    })], -1 /* CACHED */))], 8 /* PROPS */, _hoisted_219), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_220, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.a), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_221, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.ref), 1 /* TEXT */)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    id: "post-hajj",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["sec fade-in-section study-section", {
      'print-target': $setup.printSectionId === 'post-hajj'
    }]),
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.getSectionStyle('post-hajj'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_222, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_223, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_224, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.postHajj.eyebrow), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_225, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.postHajj.title), 1 /* TEXT */), _cache[130] || (_cache[130] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "sec-ornament"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_226, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sections.postHajj.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_227, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--whatsapp",
    onClick: _cache[51] || (_cache[51] = $event => $setup.shareSectionOnWhatsApp('post-hajj', $setup.sections.postHajj.title))
  }, [_cache[125] || (_cache[125] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 2a10 10 0 0 0-8.8 14.8L2 22l5.4-1.2A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3.2.7.7-3.1-.2-.3A8 8 0 1 1 12 20Zm4-5.5c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.6.1-.6.7-.7.8-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.5c.2-.3.1-.4 0-.5l-.6-1.5c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.4s-.9.9-.9 2.1 1 2.4 1.1 2.6c.1.2 2 3 4.9 4.1.7.3 1.2.4 1.7.5.7.1 1.4.1 1.9-.1.6-.2 1.3-.6 1.4-1.1.2-.5.2-1 .1-1.1s-.2-.1-.4-.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.shareWhatsApp), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--copy",
    onClick: _cache[52] || (_cache[52] = $event => $setup.copySectionText('post-hajj'))
  }, [_cache[126] || (_cache[126] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M16 1H6a2 2 0 0 0-2 2v12h2V3h10zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.copiedSectionId === 'post-hajj' ? $setup.labels.copied : $setup.labels.copyToClipboard), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--print",
    onClick: _cache[53] || (_cache[53] = $event => $setup.printSection('post-hajj'))
  }, [_cache[127] || (_cache[127] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 8V3H6v5h12Zm-2-3v1H8V5Zm2 4H6a4 4 0 0 0-4 4v4h4v4h12v-4h4v-4a4 4 0 0 0-4-4Zm-2 10H8v-5h8Zm2-7.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.printSection), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-tool-btn section-tool-btn--pdf",
    onClick: _cache[54] || (_cache[54] = $event => $setup.downloadSectionPdf('post-hajj', $setup.sections.postHajj.title))
  }, [_cache[128] || (_cache[128] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Zm0 2.5L16.5 7H14ZM8.5 13.5h1.6c1.3 0 2.1-.8 2.1-2s-.8-2-2.1-2H8.5Zm1.4-2.9h.3c.6 0 1 .3 1 .9s-.4.9-1 .9h-.3Zm3.3 4.9h1.4v-2h.4c1.3 0 2.2-.8 2.2-2s-.9-2-2.2-2h-1.8Zm1.4-4.9h.4c.6 0 1 .3 1 .9s-.4.9-1 .9h-.4Zm3.2 4.9h1.4v-1.9h1.6v-1.2h-1.6v-.9h1.8V10.3h-3.2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.downloadPdf), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_228, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_229, [_cache[129] || (_cache[129] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M4 20h2.6l1.7-4h7.4l1.7 4H20L13.7 5h-3.4Zm5.1-6 2.9-6.9 2.9 6.9ZM3 4v2h4.5v10h2V6H14V4Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_230, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.textSize), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_231, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('post-hajj') <= $setup.MIN_SECTION_FONT_SCALE,
    "aria-label": `Decrease text size for ${$setup.sections.postHajj.title}`,
    onClick: _cache[55] || (_cache[55] = $event => $setup.changeSectionFontSize('post-hajj', -$setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.decreaseTextSize), 9 /* TEXT, PROPS */, _hoisted_232), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_233, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatSectionScale('post-hajj')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "font-btn",
    disabled: $setup.getSectionScale('post-hajj') >= $setup.MAX_SECTION_FONT_SCALE,
    "aria-label": `Increase text size for ${$setup.sections.postHajj.title}`,
    onClick: _cache[56] || (_cache[56] = $event => $setup.changeSectionFontSize('post-hajj', $setup.SECTION_FONT_STEP))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.increaseTextSize), 9 /* TEXT, PROPS */, _hoisted_234)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_235, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.postHajj.src,
    alt: $setup.sectionImages.postHajj.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_236), _cache[131] || (_cache[131] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_237, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.labels.imageCreditPrefix) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.postHajj.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_238, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.postHajjSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: step.num,
      class: "tl-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_239, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_240, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.num), 1 /* TEXT */), index !== $setup.postHajjSteps.length - 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_241)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_242, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_243, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.tip), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_244, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.ref), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])], 6 /* CLASS, STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_245, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_246, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.disclaimer.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_247, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.disclaimer.text), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_248, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.disclaimer.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_249, [_cache[132] || (_cache[132] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "warning-icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M1 21h22L12 2 1 21zm11-3h-1v-1h1zm0-3h-1v-4h1z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_250, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.disclaimer.warningTitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.disclaimer.warningText), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_251, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_252, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.closing.arabic), 1 /* TEXT */), _cache[133] || (_cache[133] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "closing-div"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "sec-ornament-dot"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_253, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.closing.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_254, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.closing.reference), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_255, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.closing.message), 1 /* TEXT */)])]), !$setup.isAiSummaryOpen ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "ai-summary-fab",
    "aria-label": $setup.labels.aiSummaryFab,
    onClick: $setup.openAiSummary
  }, [...(_cache[134] || (_cache[134] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "m12 2.8 1.9 5.3 5.3 1.9-5.3 1.9-1.9 5.3-1.9-5.3-5.3-1.9 5.3-1.9Zm6.2 10.9.9 2.5 2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9Z"
  })])], -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_256)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("aside", {
    key: 1,
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["ai-summary-panel", {
      'ai-summary-panel--maximized': $setup.isAiSummaryMaximized
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_257, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_258, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.summarySection.kicker), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_259, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.summarySection.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_260, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "ai-summary-panel-btn",
    "aria-label": $setup.isAiSummaryMaximized ? 'Restore AI summary size' : 'Maximize AI summary',
    onClick: $setup.toggleAiSummaryMaximize
  }, [!$setup.isAiSummaryMaximized ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_262, [...(_cache[135] || (_cache[135] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M7 7h10v10H7zm2 2v6h6V9z"
  }, null, -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", _hoisted_263, [...(_cache[136] || (_cache[136] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M7 10h7V3h3v11H7zm3 4h7v7H10zm-3 0h2v7H2v-7zm11-4h4v4h-2v-2h-2z"
  }, null, -1 /* CACHED */)]))]))], 8 /* PROPS */, _hoisted_261), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "ai-summary-panel-btn ai-summary-panel-btn--close",
    "aria-label": "Close AI summary",
    onClick: $setup.closeAiSummary
  }, [...(_cache[137] || (_cache[137] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "m18.3 5.7-1-1L12 10l-5.3-5.3-1 1L11 11l-5.3 5.3 1 1L12 12l5.3 5.3 1-1L13 11z"
  })], -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_264, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_265, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_266, [_cache[138] || (_cache[138] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M5 4h14v2H5Zm0 7h14v2H5Zm0 7h10v2H5Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.summaryMetrics.words) + " words ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_267, [_cache[139] || (_cache[139] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm1 11.4 4.1 2.4-1 1.7L11 13V6h2Z"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.summaryMetrics.readTime) + " min read ", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_268, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_269, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.summarySection.intro), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_270, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.summarySection.points, point => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: point,
      class: "summary-point"
    }, [_cache[140] || (_cache[140] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "summary-point-icon",
      "aria-hidden": "true"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
    })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(point), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_271, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.summarySection.footer), 1 /* TEXT */)])])], 2 /* CLASS */))], 2 /* CLASS */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue":
/*!****************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true */ "./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true");
/* harmony import */ var _HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=script&setup=true&lang=js */ "./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _HajjComponent_vue_vue_type_style_index_0_id_44a8361a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css */ "./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-44a8361a"],['__file',"resources/components/vue/HajjComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_style_index_0_id_44a8361a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true");


/***/ }),

/***/ "./resources/data/hajj-umrah-content.json":
/*!************************************************!*\
  !*** ./resources/data/hajj-umrah-content.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"labels":{"downloadPdf":"Download PDF","keyReferences":"Key references","imageCreditPrefix":"Image source:","faqTitle":"Common questions","shareWhatsApp":"WhatsApp","copyToClipboard":"Copy","copied":"Copied","printSection":"Print","aiSummaryFab":"AI Summary","textSize":"Text size","decreaseTextSize":"A-","increaseTextSize":"A+","wordCount":"Word count","readTime":"Read time"},"hero":{"arabic":"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ","title":"The complete Hajj & Umrah guide you actually need.","subtitle":"A clear, source-led Hajj and Umrah guide built around the core Hajj & Umrah, common errors, official health requirements, and the references pilgrims return to most.","primaryButton":{"label":"Download the guides","target":"guides"},"secondaryButton":{"label":"Start with Umrah","target":"umrah"},"trustItems":[{"title":"Primary texts","text":"Core verses and hadith are surfaced directly in the guide."},{"title":"Official travel guidance","text":"Nusuk and Saudi MOH requirements are included and separated from general reminders."},{"title":"Focused structure","text":"Fewer downloads, clearer tools, and less visual clutter."}]},"heroImage":{"src":"https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg","alt":"A calm mosque and courtyard scene suited to worship and reflection"},"sectionImages":{"basics":{"src":"https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg","alt":"Pilgrims gathered for worship near the Sacred Mosque","credit":"Pexels"},"umrah":{"src":"https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg","alt":"Mosque and courtyard scene suited to worship and reflection","credit":"Pexels"},"hajj":{"src":"https://images.pexels.com/photos/12662176/pexels-photo-12662176.jpeg","alt":"Large gathering of worshippers in congregational prayer","credit":"Pexels"},"mistakes":{"src":"https://images.pexels.com/photos/19657349/pexels-photo-19657349.jpeg","alt":"Worshippers praying inside a mosque","credit":"Pexels"},"health":{"src":"https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg","alt":"Pilgrims resting and moving carefully in a sacred setting","credit":"Pexels"},"rules":{"src":"https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg","alt":"Mosque architecture and calm prayer environment","credit":"Pexels"},"spiritual":{"src":"https://images.pexels.com/photos/19657349/pexels-photo-19657349.jpeg","alt":"Interior mosque scene suitable to reflection and worship","credit":"Pexels"},"postHajj":{"src":"https://images.pexels.com/photos/12662176/pexels-photo-12662176.jpeg","alt":"Congregational prayer after a gathering of worshippers","credit":"Pexels"}},"guidesSection":{"eyebrow":"Downloads","title":"Essential PDF guides","description":"These downloads point to authoritative guides from trusted Islamic sources and official Saudi health requirements."},"pdfGuides":[{"label":"Comprehensive manual","title":"How to perform the manasik of Hajj and Umrah","desc":"Detailed instructional manual by Shaykh Muhammad ibn Sālih al-\'Uthaymīn, a renowned Islamic scholar.","url":"https://d1.islamhouse.com/data/en/ih_books/single/en-dalil-98.pdf","filename":"manasik-of-hajj-and-umrah-al-uthaymeen.pdf"},{"label":"Step-by-step guide","title":"Hajj and Umrah step by step","desc":"A practical manasik guide prepared by the Agency of Islamic Enlightenment in Hajj.","url":"https://d1.islamhouse.com/data/en/ih_books/single2/en-hajj-umrah.pdf","filename":"hajj-umrah-step-by-step.pdf"},{"label":"Official health PDF","title":"Saudi Hajj health requirements 1447H / 2026","desc":"Official Ministry of Health requirements and recommendations. Verify with the live MOH website before travel.","url":"https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf","filename":"saudi-hajj-health-requirements-1447H-2026.pdf"}],"sections":{"basics":{"eyebrow":"Chapter I","title":"Foundations before the journey","description":"Learn the obligation, the categories of Hajj, and the difference between foundational rulings and personal cases that require a scholar."},"umrah":{"eyebrow":"Chapter II","title":"Umrah step by step","description":"The Umrah sequence is short, but errors usually happen through haste, crowd pressure, or uncertainty at the miqat and during tawaf.","conclusion":{"title":"After Umrah","text":"When the hair is trimmed or shaved, Ihram ends. For Tamattu\', the pilgrim remains out of Ihram until entering Ihram again for Hajj on the 8th of Dhul-Hijjah."}},"hajj":{"eyebrow":"Chapter III","title":"The major days of Hajj","description":"The order of the days matters, but the greatest misunderstanding is forgetting that Arafah is the center of the pilgrimage.","farewell":{"arabic":"طواف الوداع","title":"Tawaf al-Wada (Farewell Tawaf)","text":"Before leaving Makkah, the pilgrim makes a final tawaf unless exempted by a recognized reason. Keep the ending dignified and avoid turning it into a rushed photo stop.","reference":"Reference: Sahih Muslim 1327"}},"mistakes":{"eyebrow":"Chapter IV","title":"Common errors to avoid","description":"These are recurring problems that do not come from lack of sincerity, but from poor preparation, pressure, and imitation without knowledge."},"health":{"eyebrow":"Chapter V","title":"Health, safety, and readiness","description":"Physical ability and official health requirements are part of real-world Hajj preparation. Recheck them close to travel because they can change.","note":"The Ministry of Health requires the meningococcal vaccine for all pilgrims. The seasonal flu vaccine and COVID-19 vaccine are recommended."},"rules":{"eyebrow":"Chapter VI","title":"Ihram rules and etiquette","description":"Know the difference between what remains permitted, what is prohibited, and what should be taken to a scholar when an error happens.","permissibleTitle":"Permissible acts","prohibitedTitle":"Prohibited acts","note":"If an error happened because of illness, forgetfulness, or necessity, do not improvise the ruling. Ask a qualified scholar about validity, fidyah, and what must be repeated."},"spiritual":{"eyebrow":"Chapter VII","title":"Spiritual preparation","description":"The outward manasik are stronger when repentance, humility, patience, and learning have already started before travel."},"shorts":{"eyebrow":"Supplementary Media","title":"Short visual refreshers","description":"These short videos are supplementary visual refreshers only. They are not the standard for legal rulings. Keep the Qur\'an, hadith, and the PDF guides below above any short clip."},"resources":{"eyebrow":"Chapter VIII","title":"Key references and official resources","description":"These are displayed as reference blocks, with one reference per card, so the page behaves more like a study guide than a link directory. The PDF buttons above remain downloadable."},"postHajj":{"eyebrow":"Closing","title":"Returning home with acceptance in mind","description":"The journey is not measured by photographs or stories, but by repentance, steadier prayer, better conduct, and a sincere hope that Allah accepted it."},"summary":{"eyebrow":"AI summary","title":"A concise end summary","description":"Use this as a fast recap after reading the full guide, not as a replacement for the primary texts, the PDF guides, or a scholar in personal cases."}},"basicsCards":[{"num":"01","title":"Hajj is obligatory for the one who is able","desc":"The obligation is tied to ability: physical capacity, financial capacity, and a safe route to the pilgrimage.","note":"Reference: Qur\'an 3:97."},{"num":"02","title":"Umrah is not casual travel","desc":"The Qur\'an joins Hajj and Umrah in one verse. It is a legislated act of worship, not tourism.","note":"Reference: Qur\'an 2:196."},{"num":"03","title":"Accepted Hajj brings immense reward","desc":"The Prophet ﷺ taught that an accepted Hajj has no reward except Paradise, and one Umrah to the next expiates what came between them.","note":"Reference: Sunan an-Nasa\'i 2622."},{"num":"04","title":"Learning the manasik is part of the obligation","desc":"A pilgrim should not rely on crowd movement alone. Study before travel and ask when the issue affects validity or fidyah.","note":"Reference: Sunan an-Nasa\'i 3062."}],"hajjTypes":[{"title":"Tamattu\'","desc":"Perform Umrah in the months of Hajj, leave Ihram, then re-enter Ihram for Hajj on the 8th of Dhul-Hijjah.","note":"Often the clearest path for many first-time pilgrims."},{"title":"Qiran","desc":"Enter Ihram for Umrah and Hajj together and remain in Ihram until the major manasik are completed.","note":"Keeps the pilgrim in Ihram longer than Tamattu\'."},{"title":"Ifrad","desc":"Enter Ihram for Hajj alone without combining Umrah into the same Ihram.","note":"The practical choice depends on circumstances, group planning, and fiqh guidance."}],"umrahSteps":[{"num":"01","title":"Enter Ihram at the miqat","desc":"Make intention and begin Talbiyah at or before the appointed miqat. Do not cross the miqat without Ihram.","tip":"Prepare clothing and intention before reaching the boundary.","ref":"Reference: Sahih al-Bukhari 1524."},{"num":"02","title":"Perform Tawaf with calmness","desc":"Circle the Kaaba seven times, beginning from the Black Stone area. The purpose is worship, not speed or crowd aggression.","tip":"If reaching the Black Stone is difficult, pointing from a distance is sufficient. Do not harm others.","ref":"Reference: The instruction to learn the manasik in Sunan an-Nasa\'i 3062."},{"num":"03","title":"Complete Sa\'i between Safa and Marwah","desc":"Walk the required lengths between Safa and Marwah. The Qur\'an names them among the symbols of Allah.","tip":"Keep your dua and dhikr steady even when the space is crowded.","ref":"Reference: Qur\'an 2:158."},{"num":"04","title":"Trim or shave the hair","desc":"Men shave or shorten the hair; women cut a small amount from the ends. This ends the state of Ihram for Umrah.","tip":"This is the closing act of the Umrah.","ref":"Reference: Established Prophetic practice in the manasik."}],"hajjDays":[{"date":"8 Dhul-Hijjah","title":"Mina","desc":"Pilgrims go to Mina and spend the day and night there in prayer and preparation. Tamattu\' pilgrims enter Ihram for Hajj on this day.","reminder":"Use the day to settle your mind before Arafah.","ref":"Reference: The Farewell Pilgrimage sequence in the hadith corpus."},{"date":"9 Dhul-Hijjah","title":"Arafah","desc":"Standing at Arafah is the central pillar of Hajj. The pilgrim remains within the boundaries of Arafah until sunset in repentance and supplication.","reminder":"Missing Arafah is not a small error. It is the defining station of Hajj.","ref":"Reference: \'Hajj is Arafah\' in Sunan Ibn Majah 3015."},{"date":"Night of 10 Dhul-Hijjah","title":"Muzdalifah","desc":"After sunset, pilgrims move to Muzdalifah, combine Maghrib and Isha there, rest, and prepare for the next day.","reminder":"Stay with your group safely and keep movement orderly.","ref":"Reference: The Farewell Pilgrimage sequence in the hadith corpus."},{"date":"10 Dhul-Hijjah","title":"Stoning, sacrifice, shaving, and Tawaf al-Ifadah","desc":"Pilgrims stone Jamrat al-Aqabah, arrange sacrifice, shave or trim the hair, and perform Tawaf al-Ifadah.","reminder":"Some ordering concessions exist in the Sunnah.","ref":"Reference: Qur\'an 2:196 and the Prophetic manasik sequence."},{"date":"11 to 13 Dhul-Hijjah","title":"Days of Tashriq","desc":"The pilgrim stays in Mina and stones the three Jamarat on the appointed days.","reminder":"The Qur\'an allows leaving after two days or staying for a third.","ref":"Reference: Qur\'an 2:203."}],"commonMistakes":[{"title":"Crossing the miqat without entering Ihram","desc":"This is a common practical error for travellers who are distracted or unprepared.","note":"Ask a scholar promptly about how to rectify this."},{"title":"Harming others during the manasik","desc":"Pushing and elbowing at the Black Stone area is not devotion. Harming believers is prohibited while kissing the Black Stone is Sunnah.","note":"Preserving the dignity of Muslims is obligatory."},{"title":"Copying actions without knowing what is essential","desc":"Many pilgrims imitate others without knowing whether an act is a pillar, a duty, or a recommended Sunnah.","note":"Use the guides and hadith anchors on this page instead of crowd imitation."},{"title":"Assuming every violation invalidates the pilgrimage","desc":"Some errors require repentance, some require fidyah, and some affect validity more seriously than others.","note":"This is exactly where qualified scholarly advice becomes necessary."}],"healthReadiness":[{"title":"Official readiness checks","items":["The meningococcal vaccine is mandatory for all pilgrims. The seasonal flu and COVID-19 vaccines are recommended.","Pilgrims must be free from infectious diseases and serious chronic conditions such as chronic kidney failure, chronic heart failure, and active cancer.","Review whether age, pregnancy, severe illness, or chronic conditions affect your ability to travel.","Keep official booking, visa, and identification records organized before departure."]},{"title":"On-the-ground practical care","items":["Hydrate consistently and avoid leaving basic fatigue or heat stress untreated.","Use unscented hygiene items while in Ihram.","Carry only what you can realistically manage in crowds and long walks.","If you are medically vulnerable, speak to your doctor and your scholar before travel."]}],"rules":{"permissible":["Using an umbrella, belt, bag, watch, glasses, and shade.","Bathing and washing with unscented products when needed.","Seeking medical care, rest, and crowd safety.","Reciting Qur\'an, making dua, and helping fellow pilgrims."],"prohibited":["Applying perfume after entering Ihram.","Cutting hair or trimming nails without a recognized excuse and ruling.","Marital relations and conduct leading directly to them.","For men: stitched regular clothing and covering the head.","For women: treating the niqab and gloves as Ihram wear.","Hunting land game while in the sacred state."]},"spiritualPrep":[{"step":"01","title":"Repair wrongs before travel","desc":"Return what belongs to people, settle what you can, and ask forgiveness where you have harmed others.","ref":"A sacred journey should not begin carelessly with neglected rights."},{"step":"02","title":"Learn the manasik before the crowd teaches you badly","desc":"Study the order, the common errors, and the places where you must stop and ask a scholar.","ref":"Reference: \'Learn your manasik from me\' in Sunan an-Nasa\'i 3062."},{"step":"03","title":"Train for patience","desc":"Crowds, heat, waiting, and exhaustion are part of the test. The heart should prepare for restraint before the body arrives there.","ref":"Accepted Hajj is tied to upright conduct, not just outward movement."},{"step":"04","title":"Keep the intention simple","desc":"Do not turn pilgrimage into a performance, travel trophy, or social showcase. Intend worship, repentance, and acceptance.","ref":"Reference: Qur\'an 2:127 as a model dua for acceptance."}],"shorts":[{"id":"HfUhWfYsnsA","channel":"Tajweed Online","title":"Step by step guide on how to perform Umrah","note":"Useful as a visual refresher for sequence. Check fiqh details against the PDF guides and textual references."},{"id":"xIgK2ahrXL8","channel":"Brief visual guide","title":"How to perform Umrah step by step","note":"Included as a short visual walkthrough, not as an independent legal authority."},{"id":"nsns8wfR-nE","channel":"English reminder clip","title":"These 7 things are forbidden in Ihram","note":"Useful as a quick English refresher on common Ihram restrictions. Keep the written guide and scholarly references above short clips."}],"resources":[{"label":"Official planning","title":"Nusuk Platform","desc":"The official Saudi government platform for planning Hajj and Umrah, including visa applications, permits, and booking services.","url":"https://www.nusuk.sa/en"},{"label":"Official health","title":"Saudi Ministry of Health - Pilgrim\'s Health","desc":"The official source for all health requirements, vaccinations, and public health guidance for pilgrims.","url":"https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Pages/default.aspx"},{"label":"Scholarly Reference","title":"Islam Question & Answer (IslamQA)","desc":"Educational website supervised by Shaykh Muhammad Salih Al-Munajjid, providing authoritative answers to Islamic questions based on the Qur\'an and Sunnah.","url":"https://islamqa.info/en"},{"label":"Hadith Reference","title":"Sunnah.com","desc":"Comprehensive online collection of the six major hadith books (Kutub al-Sittah) with English translations and authentic chains of narration.","url":"https://sunnah.com"},{"label":"Qur\'an Reference","title":"Quran.com","desc":"Complete Qur\'an with multiple translations, tafsir, and recitations from trusted scholars and reciters.","url":"https://quran.com"}],"faqs":[{"q":"What if I miss standing at Arafah?","a":"Standing at Arafah is central to Hajj. A pilgrim who misses it faces a serious validity issue and should seek immediate scholarly guidance.","ref":"Reference: \'Hajj is Arafah\' in Sunan Ibn Majah 3015."},{"q":"Can I leave Mina after two days?","a":"Yes. The Qur\'an allows departure after two days of the appointed days or staying longer when done properly.","ref":"Reference: Qur\'an 2:203."},{"q":"Are the short videos enough to learn the manasik?","a":"No. They can help visualize the sequence, but should not replace the Qur\'an, hadith, trusted scholars, and structured written guides.","ref":"Use the short videos only as supplementary refreshers."},{"q":"Where should I verify health and travel rules near departure?","a":"Check Nusuk and the Saudi Ministry of Health close to your travel date. Do not rely on old screenshots or group messages.","ref":"Operational guidance can change from season to season."}],"postHajjSteps":[{"num":"01","title":"Ask for acceptance, not praise","desc":"The right response after worship is humility and dua that Allah accepted it.","tip":"Keep the dua of acceptance on your tongue.","ref":"Reference: Qur\'an 2:127."},{"num":"02","title":"Protect the obligations first","desc":"The strongest sign of benefit is steadier prayer, better honesty, and more guarded speech when you return.","tip":"Start with salah, family rights, and daily dhikr.","ref":"Accepted Hajj should leave a trace in conduct."},{"num":"03","title":"Carry the manners of pilgrimage home","desc":"Patience, gentleness, and restraint in crowded sacred places should not disappear at the airport.","tip":"Bring the softened character home, not just souvenirs and stories.","ref":"Reference: Sunan an-Nasa\'i 2622 for the reward of accepted Hajj."}],"summarySection":{"kicker":"AI summary","title":"The page in one clear recap","intro":"This guide starts with the obligation of Hajj, then walks through Umrah, the major days of Hajj, common errors, health readiness, Ihram rules, spiritual preparation, and what should remain after the journey.","points":["Hajj is tied to ability, and serious personal cases still need a qualified scholar.","Arafah is the central station of Hajj. Tawaf, Sa\'i, and the order of the manasik must be learned before travel.","Crowd pressure, health neglect, and imitation without knowledge are among the most common causes of errors.","Official planning through Nusuk and health checks through the Saudi Ministry of Health should be verified close to departure.","The strongest sign of benefit after Hajj or Umrah is better worship, steadier character, and sincere hope for acceptance."],"footer":"Read the full sections for detail, then return to this recap for the essentials."},"sectionReferences":{"basics":[{"title":"Qur\'an 3:97","url":"https://quran.com/3/97"},{"title":"Qur\'an 2:196","url":"https://quran.com/2/196"},{"title":"Sunan an-Nasa\'i 2622","url":"https://sunnah.com/nasai:2622"},{"title":"Sunan an-Nasa\'i 3062","url":"https://sunnah.com/nasai:3062"}],"umrah":[{"title":"Sahih al-Bukhari 1524","url":"https://sunnah.com/bukhari:1524"},{"title":"Qur\'an 2:158","url":"https://quran.com/2/158"},{"title":"Sunan an-Nasa\'i 3062","url":"https://sunnah.com/nasai:3062"}],"hajj":[{"title":"Sunan Ibn Majah 3015","url":"https://sunnah.com/ibnmajah:3015"},{"title":"Qur\'an 2:196","url":"https://quran.com/2/196"},{"title":"Qur\'an 2:203","url":"https://quran.com/2/203"},{"title":"Sahih Muslim 1327","url":"https://sunnah.com/muslim:1327"}],"mistakes":[{"title":"Sunan an-Nasa\'i 3062","url":"https://sunnah.com/nasai:3062"}],"health":[{"title":"Saudi MOH pilgrim health page","url":"https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Pages/default.aspx"},{"title":"Saudi Hajj Health Requirements PDF","url":"https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf"}],"rules":[{"title":"Qur\'an 2:196","url":"https://quran.com/2/196"},{"title":"Sunan an-Nasa\'i 3062","url":"https://sunnah.com/nasai:3062"}],"spiritual":[{"title":"Sunan an-Nasa\'i 3062","url":"https://sunnah.com/nasai:3062"},{"title":"Sunan an-Nasa\'i 2622","url":"https://sunnah.com/nasai:2622"},{"title":"Qur\'an 2:127","url":"https://quran.com/2/127"}]},"disclaimer":{"title":"Scope of this page","text":"This guide aims to stay close to primary texts, established instructional guides, and official Saudi health and logistics sources. It does not replace a scholar for illness, menstruation, fidyah, missed manasik, disputes between madhhabs, or complicated travel restrictions.","items":["Qur\'anic anchors used here: 3:97, 2:158, 2:196, 2:203, 2:127.","Hadith anchors used here: Bukhari 1524, Ibn Majah 3015, Muslim 1327, Nasa\'i 3062, Nasa\'i 2622.","Official operational guidance: Nusuk, Saudi Ministry of Health, and Saudi Ministry of Hajj and Umrah."],"warningTitle":"Important note","warningText":"This page provides a mainstream structure and source trail, not a personalized fatwa. For personal cases, consult a qualified scholar. Verified sources like IslamQA or official authorities can provide reliable guidance."},"closing":{"arabic":"رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ","translation":"Our Lord, accept this from us. You are the All-Hearing, the All-Knowing.","reference":"Qur\'an 2:127","message":"May Allah grant every pilgrim a sound journey, a valid pilgrimage, and a return marked by humility, gratitude, and firmer obedience."}}');

/***/ })

}]);