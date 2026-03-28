
import axios from 'axios';
import { ref } from 'vue';
import { fetchUserIdFromApi, resolveClientUserId } from '../utils/bookmarkAuth';
import { useDuaRecommender } from '../../js/composables/useDuaRecommender';
import duaCollectionData from '../vue/duaCollection.json';
const { createDuaMetadata } = require('../utils/duaSlugs');
export default {
  setup() {
    const recommendationInput = ref('');
    const {
      matchedDuas: recommendationDuas,
      matchedKeywords: recommendationKeywords,
      loading: recommendationLoading,
      error: recommendationError,
      recommend,
      clearResults,
    } = useDuaRecommender(duaCollectionData);

    const runDuaRecommendation = async () => {
      await recommend(recommendationInput.value);
    };

    const clearDuaRecommendation = () => {
      recommendationInput.value = '';
      clearResults();
    };

    return {
      recommendationInput,
      recommendationDuas,
      recommendationKeywords,
      recommendationLoading,
      recommendationError,
      runDuaRecommendation,
      clearDuaRecommendation,
    };
  },
  data() {
    const initialUserId = resolveClientUserId();
    return {
      duaCollection: [],
      searchQuery: '',
      selectedCategory: '',
      selectedReference: '',
      currentPage: {},
      duasPerPage: 20,
      showCopyMessage: false,
      fontSize: 18,
      storageUserId: initialUserId,
      isAuthenticated: !!initialUserId,
      preferencesLoaded: false,
      likedDuas: [],
      loginWarnings: {},
      warningTimers: {},
      authWarning: '',
      authWarningTimer: null,
      viewMode: 'all',
      searchTags: [
        'All', 'Forgiveness', 'Protection', 'Gratitude', 'Healing', 'Guidance', 'Patience',
        'Success', 'Mercy', 'Peace', 'Provision', 'Strength', 'Repentance'
      ],
      selectedTag: '',
      tagSynonyms: {
        Forgiveness: ['pardon', 'mercy', 'forgive'],
        Protection: ['safety', 'guard', 'shield'],
        Gratitude: ['thanks', 'appreciation', 'thankful'],
        Healing: ['cure', 'recovery', 'health'],
        Guidance: ['direction', 'path', 'lead'],
        Patience: ['endurance', 'perseverance', 'calm'],
        Success: ['achievement', 'victory', 'prosperity'],
        Mercy: ['compassion', 'kindness', 'forgiveness'],
        Peace: ['tranquility', 'calm', 'serenity'],
        Provision: ['sustenance', 'wealth', 'blessings'],
        Strength: ['power', 'resilience', 'fortitude'],
        Repentance: ['regret', 'atonement', 'penitence'],
        Faith: ['belief', 'trust', 'devotion'],
        Knowledge: ['wisdom', 'understanding', 'learning'],
        Family: ['kin', 'household', 'relatives'],
        Justice: ['fairness', 'equity', 'righteousness'],
        Hope: ['optimism', 'aspiration', 'expectation'],
        Charity: ['generosity', 'almsgiving', 'benevolence']
      },
      showScrollToTop: false,
      actionFeedback: {},
      errorMessage: null,
      isLoading: true,
      nextStepMinimized: false,
      staticDuaSlug: typeof window !== 'undefined' ? window.__duaSlug || '' : '',
      staticDuaMatch: null,
      showDuaRecommender: false,
      currentlyPlayingAudioId: null,
      audioElement: null,
      speechUtterance: null,
      speechSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
      speechVoices: [],
      isDarkMode: false,
    };
  },
  computed: {
    allDuasCount() {
      return this.duaCollection.reduce((sum, category) => sum + (category.duas?.length || 0), 0);
    },
    visibleDuasCount() {
      return this.filteredDuas.reduce((sum, category) => sum + (category.duas?.length || 0), 0);
    },
    activeFilterPills() {
      const pills = [];
      if (this.searchQuery.trim()) {
        pills.push({ key: 'query', label: `Search: ${this.searchQuery.trim()}` });
      }
      if (this.selectedCategory) {
        const category = this.duaCollection.find(item => item.id === parseInt(this.selectedCategory));
        pills.push({
          key: 'category',
          label: `Category: ${category ? category.name : this.selectedCategory}`,
        });
      }
      if (this.selectedReference) {
        pills.push({ key: 'reference', label: `Reference: ${this.selectedReference}` });
      }
      if (this.selectedTag) {
        pills.push({ key: 'tag', label: `Tag: ${this.selectedTag}` });
      }
      if (this.viewMode === 'liked') {
        pills.push({ key: 'view', label: 'View: Liked' });
      }
      return pills;
    },
    uniqueReferences() {
      const references = new Set();
      this.duaCollection.forEach(category => {
        category.duas.forEach(dua => {
          if (dua.reference) {
            references.add(dua.reference);
          }
        });
      });
      return [...references]
        .map(ref => ({
          full: ref,
          display: ref.split(',')[0].trim()
        }))
        .sort((a, b) => a.display.localeCompare(b.display));
    },
    likedDuasCount() {
      const validIds = this.likedDuas.filter(id => {
        const [categoryId, duaId] = id.split('-');
        const category = this.duaCollection.find(c => c.id === parseInt(categoryId));
        return category && category.duas.some(dua => dua.id === id);
      });
      return validIds.length;
    },
    filteredCategories() {
      if (this.staticDuaSlug) {
        if (!this.staticDuaMatch) {
          return [];
        }
        const target = this.staticDuaMatch;
        return this.duaCollection
          .map(category => {
            if (category.id !== target.categoryId) {
              return { ...category, duas: [] };
            }
            return { ...category, duas: category.duas.filter(dua => dua.slug === target.slug) };
          })
          .filter(category => category.duas.length > 0);
      }

      let filteredCollection = this.duaCollection;

      if (this.viewMode === 'liked') {
        filteredCollection = filteredCollection.map(category => ({
          ...category,
          duas: category.duas.filter(dua => this.likedDuas.includes(dua.id)),
        })).filter(category => category.duas.length > 0);
        return filteredCollection;
      }

      if (this.selectedCategory) {
        filteredCollection = filteredCollection.filter(category => category.id === parseInt(this.selectedCategory));
      }

      if (this.selectedReference) {
        filteredCollection = filteredCollection.map(category => ({
          ...category,
          duas: category.duas.filter(dua => dua.reference === this.selectedReference),
        })).filter(category => category.duas.length > 0);
      }

      if (!this.searchQuery.trim() && !this.selectedTag) {
        return filteredCollection;
      }

      return filteredCollection.map(category => {
        const filteredDuas = category.duas.filter(dua => {
          const searchQueryLower = this.searchQuery.trim().toLowerCase();
          const tagLower = this.selectedTag.toLowerCase();
          const synonyms = this.tagSynonyms[this.selectedTag] || [];
          const synonymLower = synonyms.map(s => s.toLowerCase());

          const queryMatch = this.searchQuery.trim() ? (
            (dua.title || '').toLowerCase().includes(searchQueryLower) ||
            (dua.arabic || '').toLowerCase().includes(searchQueryLower) ||
            (dua.transliteration || '').toLowerCase().includes(searchQueryLower) ||
            (dua.translation || '').toLowerCase().includes(searchQueryLower) ||
            (dua.reference || '').toLowerCase().includes(searchQueryLower)
          ) : true;

          const tagMatch = this.selectedTag ? (
            (dua.title || '').toLowerCase().includes(tagLower) ||
            (dua.arabic || '').toLowerCase().includes(tagLower) ||
            (dua.transliteration || '').toLowerCase().includes(tagLower) ||
            (dua.translation || '').toLowerCase().includes(tagLower) ||
            (dua.reference || '').toLowerCase().includes(tagLower) ||
            synonymLower.some(syn => (
              (dua.title || '').toLowerCase().includes(syn) ||
              (dua.arabic || '').toLowerCase().includes(syn) ||
              (dua.transliteration || '').toLowerCase().includes(syn) ||
              (dua.translation || '').toLowerCase().includes(syn) ||
              (dua.reference || '').toLowerCase().includes(syn)
            ))
          ) : true;

          return queryMatch && tagMatch;
        });
        return { ...category, duas: filteredDuas };
      }).filter(category => category.duas.length > 0);
    },
    filteredDuas() {
      return this.filteredCategories;
    },
    hasActiveFilters() {
      return Boolean(this.searchQuery || this.selectedTag || this.selectedReference);
    },
    allDuasLikedInCategory() {
      return (categoryId) => {
        const category = this.duaCollection.find(c => c.id === categoryId);
        if (!category || !category.duas.length) return false;
        return category.duas.every(dua => this.likedDuas.includes(dua.id));
      };
    },
  },
  methods: {
    hydrateDuaCollection(data) {
      if (!data || !Array.isArray(data.categories)) {
        throw new Error('Invalid JSON structure: categories not found or not an array');
      }
      try { console.debug('[DuaComponent] loaded categories:', data.categories.length); } catch (e) { }
      this.duaCollection = data.categories.map(category => ({
        ...category,
        collapsed: false,
        duas: category.duas.map((dua, index) => {
          const originalId = dua.id || index + 1;
          return {
            ...dua,
            id: `${category.id}-${originalId}`,
            originalId,
            collapsedSections: {
              transliteration: false,
              translation: false,
              reference: false,
            },
          };
        }),
      }));
      const ids = new Set();
      this.duaCollection.forEach(category => {
        category.duas.forEach(dua => {
          if (ids.has(dua.id)) {
            console.warn(`Duplicate dua ID found: ${dua.id}`);
          }
          ids.add(dua.id);
        });
      });
      this.resetPagination();
      this.applyStaticDuaSlug();
    },
    removeFilter(filterType) {
      if (filterType === 'query') this.searchQuery = '';
      if (filterType === 'category') this.selectedCategory = '';
      if (filterType === 'reference') this.selectedReference = '';
      if (filterType === 'tag') this.selectedTag = '';
      if (filterType === 'view') this.viewMode = 'all';
      this.resetPagination();
    },
    async resolveStorageScope() {
      const resolvedId = await fetchUserIdFromApi();
      this.storageUserId = resolvedId;
      this.isAuthenticated = !!resolvedId;
      if (this.isAuthenticated) {
        await this.loadPreferences();
      } else {
        this.likedDuas = [];
        this.preferencesLoaded = true;
      }
    },
    async loadPreferences() {
      try {
        const response = await axios.get('/api/preferences/liked_duas');
        this.likedDuas = Array.isArray(response.data?.value) ? response.data.value : [];
      } catch (e) {
        this.likedDuas = [];
      } finally {
        this.preferencesLoaded = true;
      }
    },
    async savePreferences() {
      if (!this.isAuthenticated) return;
      try {
        await axios.put('/api/preferences/liked_duas', { value: this.likedDuas });
      } catch (e) {}
    },
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    getTagIcon(tag) {
      const icons = {
        'All': 'bi-grid-fill',
        'Forgiveness': 'bi-heart-fill',
        'Protection': 'bi-shield-fill',
        'Gratitude': 'bi-emoji-smile-fill',
        'Healing': 'bi-heart-pulse-fill',
        'Guidance': 'bi-signpost-fill',
        'Patience': 'bi-hourglass-split',
        'Success': 'bi-trophy-fill',
        'Mercy': 'bi-hand-thumbs-up-fill',
        'Peace': 'bi-peace-fill',
        'Provision': 'bi-basket-fill',
        'Strength': 'bi-lightning-charge-fill',
        'Repentance': 'bi-arrow-counterclockwise'
      };
      return `bi ${icons[tag] || 'bi-tag-fill'}`;
    },
    highlightText(text) {
      if (!text) return '';
      const raw = text.toString();

      // If no search or tag filters, return escaped text
      if (!this.searchQuery.trim() && !this.selectedTag) {
        return raw
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      // Escape first to avoid injecting existing markup, then re-inject highlights
      let escaped = raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Highlight search terms
      const searchTerms = this.searchQuery.trim() ? [this.searchQuery] : [];
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
        escaped = escaped.replace(regex, '<mark class="mark-search">$1</mark>');
      });

      // Highlight selected tag and its synonyms
      const tagTerms = this.selectedTag ? [this.selectedTag, ...(this.tagSynonyms[this.selectedTag] || [])] : [];
      tagTerms.forEach(term => {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'gi');
        escaped = escaped.replace(regex, '<mark class="mark-tag">$1</mark>');
      });

      return escaped;
    },
    toggleTag(tag) {
      this.selectedTag = (tag === 'All' || this.selectedTag === tag) ? '' : tag;
      this.resetPagination();
    },
    clearSearch() {
      this.searchQuery = '';
      this.selectedTag = '';
      this.selectedReference = '';
      this.resetPagination();
    },
    changeFontSize(action) {
      if (action === 'increase') {
        this.fontSize = Math.min(this.fontSize + 2, 28);
      } else if (action === 'decrease' && this.fontSize > 14) {
        this.fontSize -= 2;
      }
    },
    sanitizeFileName(value = '') {
      const normalized = String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
      return normalized || 'dua';
    },
    buildDuaTextContent(dua = {}, index = null) {
      const lines = [];
      if (Number.isInteger(index)) {
        lines.push(`Dua ${index + 1}`);
      }
      lines.push(`Title: ${dua.title || ''}`);
      lines.push(`Arabic: ${dua.arabic || ''}`);
      lines.push(`Transliteration: ${dua.transliteration || ''}`);
      lines.push(`Translation: ${dua.translation || ''}`);
      lines.push(`Reference: ${dua.reference || ''}`);
      return lines.join('\n');
    },
    downloadTextFile(content = '', fileName = 'dua.txt') {
      if (typeof window === 'undefined') return;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 200);
    },
    downloadSingleDua(dua, categoryName = '') {
      if (!dua) return;
      const header = [
        'Islamic Connect - Dua Export',
        categoryName ? `Category: ${categoryName}` : '',
      ].filter(Boolean).join('\n');
      const body = this.buildDuaTextContent(dua);
      const content = `${header}\n\n${body}\n`;
      const fileName = `${this.sanitizeFileName(dua.title || 'dua')}.txt`;
      this.downloadTextFile(content, fileName);
    },
    downloadCategoryDuas(category) {
      if (!category || !Array.isArray(category.duas) || !category.duas.length) return;
      const header = [
        'Islamic Connect - Dua Section Export',
        `Section: ${category.name || 'Dua Section'}`,
        `Total Duas: ${category.duas.length}`,
      ].join('\n');
      const blocks = category.duas.map((dua, index) => this.buildDuaTextContent(dua, index));
      const content = `${header}\n\n${blocks.join('\n\n------------------------------\n\n')}\n`;
      const fileName = `${this.sanitizeFileName(category.name || 'dua-section')}-section.txt`;
      this.downloadTextFile(content, fileName);
    },
    copyContent(dua) {
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\nReference: ${dua.reference}`;
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyMessage = true;
        setTimeout(() => {
          this.showCopyMessage = false;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy content: ', err);
      });
    },
    shareOnWhatsApp(dua) {
      const text = `Dua: ${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nReference: ${dua.reference}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/?text=${encodedText}`;
      window.open(url, '_blank');
    },
    escapePrintHtml(value = '') {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },
    formatPrintText(value = '') {
      return this.escapePrintHtml(value).replace(/\r?\n/g, '<br>');
    },
    printDua(dua) {
      if (!dua || typeof window === 'undefined') return;

      const title = this.formatPrintText(dua.title || '');
      const arabic = this.formatPrintText(dua.arabic || '');
      const transliteration = this.formatPrintText(dua.transliteration || '');
      const translation = this.formatPrintText(dua.translation || '');
      const reference = this.formatPrintText(dua.reference || '');

      const printMarkup = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Print Dua</title>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 1.2rem;
        font-family: Georgia, "Times New Roman", serif;
        color: #111827;
        background: #fff;
      }
      .sheet {
        max-width: 900px;
        margin: 0 auto;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 1rem 1.1rem;
      }
      h1 {
        margin: 0 0 0.9rem;
        font-size: 1.32rem;
        line-height: 1.35;
      }
      .section { margin-bottom: 0.95rem; }
      .label {
        font-size: 0.74rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #4b5563;
        margin-bottom: 0.28rem;
        font-weight: 700;
      }
      .value {
        font-size: 1rem;
        line-height: 1.65;
        white-space: normal;
        word-break: break-word;
      }
      .arabic {
        direction: rtl;
        text-align: right;
        font-family: "Amiri", "Noto Naskh Arabic", serif;
        font-size: 1.2rem;
        line-height: 2;
      }
      .muted {
        color: #6b7280;
      }
      @media print {
        body { padding: 0; }
        .sheet {
          max-width: 100%;
          border: none;
          border-radius: 0;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <article class="sheet">
      <h1>${title || 'Dua'}</h1>
      <section class="section">
        <div class="label">Arabic</div>
        <div class="value arabic">${arabic || '<span class="muted">Not available</span>'}</div>
      </section>
      <section class="section">
        <div class="label">Transliteration</div>
        <div class="value">${transliteration || '<span class="muted">Not available</span>'}</div>
      </section>
      <section class="section">
        <div class="label">Translation</div>
        <div class="value">${translation || '<span class="muted">Not available</span>'}</div>
      </section>
      <section class="section">
        <div class="label">Reference</div>
        <div class="value">${reference || '<span class="muted">Not available</span>'}</div>
      </section>
    </article>
  </body>
</html>`;

      const frame = document.createElement('iframe');
      frame.setAttribute('aria-hidden', 'true');
      frame.style.position = 'fixed';
      frame.style.right = '0';
      frame.style.bottom = '0';
      frame.style.width = '0';
      frame.style.height = '0';
      frame.style.border = '0';
      frame.style.opacity = '0';
      document.body.appendChild(frame);

      const cleanup = () => {
        setTimeout(() => {
          if (frame && frame.parentNode) {
            frame.parentNode.removeChild(frame);
          }
        }, 400);
      };

      const win = frame.contentWindow;
      if (!win) {
        cleanup();
        return;
      }

      const doc = win.document;
      doc.open();
      doc.write(printMarkup);
      doc.close();

      frame.onload = () => {
        win.focus();
        win.print();
        cleanup();
      };

      // Fallback for browsers that may not fire iframe onload reliably.
      setTimeout(() => {
        try {
          win.focus();
          win.print();
        } catch (e) {}
        cleanup();
      }, 450);
    },
    hasRecordedAudio(dua) {
      return Boolean(dua && dua.audio);
    },
    getAudioButtonClasses(dua) {
      const base = [
        'btn',
        'btn-sm',
        'rounded-circle',
        'p-0',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'action-btn',
      ];
      if (this.hasRecordedAudio(dua)) {
        base.push('btn-outline-secondary');
      } else {
      base.push('audio-action-btn', 'speech');
      }
      return base;
    },
    initializeSpeechVoices() {
      if (!this.speechSupported || typeof window === 'undefined') return;
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length) {
          this.speechVoices = voices;
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
    },
    selectArabicVoice() {
      if (!this.speechVoices.length) return null;
      const arabicVoice = this.speechVoices.find(voice => voice.lang?.startsWith('ar'));
      return arabicVoice || this.speechVoices[0];
    },
    canPlayAudio(dua) {
      return Boolean(dua && (dua.audio || this.speechSupported));
    },
    isAudioPlaying(dua) {
      return !!dua && this.currentlyPlayingAudioId === dua.id;
    },
    handleAudioPlayback(dua) {
      if (!dua) return;
      if (!this.canPlayAudio(dua)) return;
      if (this.currentlyPlayingAudioId === dua.id) {
        this.stopAudioPlayback();
        return;
      }
      this.stopAudioPlayback();
      if (dua.audio) {
        const audio = new Audio(dua.audio);
        audio.preload = 'auto';
        audio.addEventListener('ended', () => {
          if (this.currentlyPlayingAudioId === dua.id) {
            this.stopAudioPlayback();
          }
        });
        audio.addEventListener('error', () => this.stopAudioPlayback());
        this.audioElement = audio;
        this.currentlyPlayingAudioId = dua.id;
        audio.play().catch(() => this.stopAudioPlayback());
        return;
      }
      if (this.speechSupported) {
        this.playSpeechForDua(dua);
      }
    },
    playSpeechForDua(dua) {
      if (!dua) return;
      const text = dua.arabic || dua.transliteration || dua.translation || dua.title;
      if (!text || typeof window === 'undefined' || !window.speechSynthesis) return;
      const utterance = new SpeechSynthesisUtterance(text);
      const preferredVoice = this.selectArabicVoice();
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        utterance.lang = preferredVoice.lang || 'ar-SA';
      } else {
        utterance.lang = 'ar-SA';
      }
      utterance.rate = 0.88;
      utterance.pitch = 1.15;
      utterance.volume = 0.95;
      utterance.addEventListener('end', () => {
        if (this.currentlyPlayingAudioId === dua.id) {
          this.stopAudioPlayback();
        }
      });
      utterance.addEventListener('error', () => {
        if (this.currentlyPlayingAudioId === dua.id) {
          this.stopAudioPlayback();
        }
      });
      this.speechUtterance = utterance;
      this.currentlyPlayingAudioId = dua.id;
      window.speechSynthesis.speak(utterance);
    },
    stopAudioPlayback() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.audioElement = null;
      }
      if (this.speechUtterance && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        this.speechUtterance = null;
      }
      this.currentlyPlayingAudioId = null;
    },
    showLoginWarning(duaId) {
      if (!duaId) return;
      this.loginWarnings = {
        ...this.loginWarnings,
        [duaId]: 'Please log in to save this dua.',
      };
      if (this.warningTimers[duaId]) {
        clearTimeout(this.warningTimers[duaId]);
      }
      this.warningTimers[duaId] = setTimeout(() => {
        const next = { ...this.loginWarnings };
        delete next[duaId];
        this.loginWarnings = next;
        delete this.warningTimers[duaId];
      }, 5000);
    },
    showAuthWarning(message = 'Please log in to save your liked duas.') {
      this.authWarning = message;
      if (this.authWarningTimer) {
        clearTimeout(this.authWarningTimer);
      }
      this.authWarningTimer = setTimeout(() => {
        this.authWarning = '';
        this.authWarningTimer = null;
      }, 5000);
    },
    toggleLike(duaId) {
      if (!this.isAuthenticated) {
        this.showLoginWarning(duaId);
        this.showAuthWarning();
        return;
      }
      if (!duaId) return;
      const updatedLikedDuas = [...this.likedDuas];
      if (updatedLikedDuas.includes(duaId)) {
        updatedLikedDuas.splice(updatedLikedDuas.indexOf(duaId), 1);
      } else {
        updatedLikedDuas.push(duaId);
      }
      this.likedDuas = updatedLikedDuas;
      this.savePreferences();
    },
    toggleAllInCategory(categoryId) {
      if (!this.isAuthenticated) {
        this.showAuthWarning();
        return;
      }
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (!category) return;
      this.actionFeedback[categoryId] = true;
      const allLiked = this.allDuasLikedInCategory(categoryId);
      let updatedLikedDuas = [...this.likedDuas];
      if (allLiked) {
        updatedLikedDuas = updatedLikedDuas.filter(id => !category.duas.some(dua => dua.id === id));
      } else {
        updatedLikedDuas = [...new Set([...updatedLikedDuas, ...category.duas.map(dua => dua.id)])];
      }
      this.likedDuas = updatedLikedDuas;
      this.savePreferences();
      setTimeout(() => {
        this.actionFeedback[categoryId] = false;
      }, 1000);
    },
    clearAllLikedDuas() {
      if (!this.isAuthenticated) {
        this.showAuthWarning();
        return;
      }
      this.actionFeedback['clearAll'] = true;
      this.likedDuas = [];
      this.savePreferences();
      setTimeout(() => {
        this.actionFeedback['clearAll'] = false;
      }, 1000);
    },
    toggleDuaSection(dua, sectionKey) {
      if (!dua || !dua.collapsedSections) return;
      if (!(sectionKey in dua.collapsedSections)) return;
      dua.collapsedSections[sectionKey] = !dua.collapsedSections[sectionKey];
    },
    isDuaSectionCollapsed(dua, sectionKey) {
      if (!dua || !dua.collapsedSections) return false;
      return !!dua.collapsedSections[sectionKey];
    },
    toggleCategoryCollapse(categoryId) {
      const category = this.duaCollection.find(c => c.id === categoryId);
      if (category) {
        category.collapsed = !category.collapsed;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    syncThemeFromBody() {
      this.isDarkMode = document.body.classList.contains('dua-route-page')
        && document.body.classList.contains('dark-mode');
    },
    handleThemeChange(event) {
      if (event?.detail && typeof event.detail.isDark === 'boolean') {
        this.isDarkMode = event.detail.isDark;
        return;
      }
      this.syncThemeFromBody();
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollThreshold = windowHeight * 0.05;
      this.showScrollToTop = scrollPosition > scrollThreshold;
    },
    getPaginatedDuas(duas) {
      if (!duas || !duas.length) return [];
      const start = ((this.currentPage[duas[0].id.split('-')[0]] || 1) - 1) * this.duasPerPage;
      const end = start + this.duasPerPage;
      return duas.slice(start, end);
    },
    changePage(direction, categoryId) {
      const totalPages = this.totalPages(this.duaCollection.find(c => c.id === categoryId)?.duas || []);
      if (direction === 'next' && this.currentPage[categoryId] < totalPages) {
        this.currentPage[categoryId]++;
      } else if (direction === 'prev' && this.currentPage[categoryId] > 1) {
        this.currentPage[categoryId]--;
      }
    },
    totalPages(duas) {
      return Math.ceil(duas.length / this.duasPerPage);
    },
    resetPagination() {
      this.currentPage = {};
      this.duaCollection.forEach(category => {
        this.currentPage[category.id] = 1;
      });
    },
    applyStaticDuaSlug() {
      if (!this.staticDuaSlug || !this.duaCollection.length) {
        return;
      }
      const metadata = createDuaMetadata({ categories: this.duaCollection }, { assignSlugToDua: true });
      const match = metadata.find(entry => entry.slug === this.staticDuaSlug);
      if (!match) {
        this.staticDuaMatch = null;
        this.errorMessage = 'The Dua you requested could not be found.';
        return;
      }
      this.errorMessage = null;
      this.staticDuaMatch = match;
      this.selectedCategory = match.categoryId ? match.categoryId.toString() : '';
    },
  },
  created() {
    try { console.debug('[DuaComponent] created()'); } catch (e) { }
    this.resolveStorageScope();
    try {
      this.hydrateDuaCollection(duaCollectionData);
    } catch (error) {
      console.error('Error loading dua collection:', error);
      this.errorMessage = 'Failed to load dua collection. Please try again later.';
    } finally {
      this.isLoading = false;
    }
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.initializeSpeechVoices();
  },
  mounted() {
    this.syncThemeFromBody();
    window.addEventListener('ic-theme-change', this.handleThemeChange);
  },
  beforeUnmount() {
    window.removeEventListener('ic-theme-change', this.handleThemeChange);
  },
  beforeDestroy() {
    this.stopAudioPlayback();
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('ic-theme-change', this.handleThemeChange);
    Object.values(this.warningTimers || {}).forEach(timerId => clearTimeout(timerId));
    if (this.authWarningTimer) clearTimeout(this.authWarningTimer);
  },
};
