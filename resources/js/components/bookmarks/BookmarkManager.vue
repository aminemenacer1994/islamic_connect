<template>
  <div class="container-fluid bookmark-manager shadow-md">
    <div class="row g-4 bookmark-layout">
      <div
        class="col-12 col-lg-4 folder-col"
        :class="{ 'is-collapsed': isFolderCollapsed }"
        :aria-hidden="isFolderCollapsed ? 'true' : 'false'"
      >
        <folder-list ref="folderList" @folder-selected="onFolderSelected" />
      </div>
      <div
        class="col-12 col-lg-8 panel-col"
        :class="{ 'is-expanded': isFolderCollapsed }"
      >
        <div class="bookmark-panel">
          <div class="panel-header">
            <div>
              <div class="panel-eyebrow">Collection</div>
              <h5 class="panel-title">{{ selectedFolder ? selectedFolder.name : 'Folder contents' }}</h5>
              <div class="panel-subtitle">
                {{ panelCountLabel }} · {{ folderDescriptor }}
              </div>
            </div>
            <div class="panel-actions">
              <button
                type="button"
                class="panel-toggle"
                @click="toggleFolderPane"
                :aria-pressed="!isFolderCollapsed"
                :aria-label="isFolderCollapsed ? 'Show folders' : 'Hide folders'"
                :title="isFolderCollapsed ? 'Show folders' : 'Hide folders'"
              >
                <i class="bi" :class="isFolderCollapsed ? 'bi-layout-sidebar-inset' : 'bi-layout-sidebar-inset-reverse'"></i>
              </button>
              <a class="panel-cta" href="/surat">
                Go back to the Holy Quran
                <i class="bi bi-arrow-right ms-2"></i>
              </a>
              <!-- <span v-if="selectedFolder" class="source-pill">{{ sourceLabel }}</span> -->
            </div>
          </div>

          <div class="panel-body">
            <div v-if="panelMessage" class="panel-alert" :class="panelMessageVariant === 'danger' ? 'alert-danger' : 'alert-success'">
              {{ panelMessage }}
            </div>
            <div class="panel-search">
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input v-model="query" class="form-control" placeholder="Search bookmarks..." />
                <button v-if="query" class="btn btn-outline-secondary" type="button" @click="clearSearch">
                  Clear
                </button>
              </div>
            </div>
            <div v-if="loading" class="loading-state">Loading ayat...</div>
            <div v-else-if="filteredItems.length === 0" class="empty-state">
              <div class="empty-title">No ayat match your search</div>
              <div class="empty-subtitle">Try different terms or clear the filters.</div>
            </div>

            <div v-else class="list-wrapper">
              <div class="list-group ayah-list">
                <div v-for="item in filteredItems" :key="item.row_key" class="list-group-item ayah-list-item">
                <div class="ayah-list-head">
                  <div class="ayah-list-meta" v-html="formatMeta(item)"></div>
                  <div class="ayah-list-actions">
                    <select
                      v-if="canMoveFromSelectedFolder"
                      class="form-select form-select-sm move-select"
                      :disabled="movingBookmarkId === item.bookmark_id || moveTargets.length === 0"
                      @change="moveBookmark(item, $event)"
                    >
                      <option value="" selected disabled>
                        {{ moveTargets.length ? 'Move to...' : 'No other folders' }}
                      </option>
                      <option v-for="folder in moveTargets" :key="`move-${folder.id}`" :value="folder.id">
                        {{ folder.name }}
                      </option>
                    </select>
                    <!-- <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary bookmark-quick"
                      data-bs-toggle="modal"
                      data-bs-target="#bookmarkModal"
                      @click="prepareBookmark(item)"
                    >
                      <i class="bi bi-bookmark-plus"></i>
                    </button> -->
                    <!-- <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary open-quick"
                      @click="openInSurat(item)"
                      title="Open in Quran"
                      aria-label="Open ayah in Quran"
                    >
                      <i class="bi bi-box-arrow-up-right"></i>
                    </button> -->
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary copy-quick"
                      @click="copyBookmark(item)"
                      title="Copy"
                      aria-label="Copy ayah"
                    >
                      <i class="bi bi-clipboard"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary share-quick"
                      @click="shareBookmarkOnWhatsApp(item)"
                      title="Share via WhatsApp"
                      aria-label="Share ayah via WhatsApp"
                    >
                      <i class="bi bi-whatsapp"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-danger remove-quick"
                      :disabled="isDeleteBusy(item.bookmark_id) || isSmartSelected"
                      :title="deleteTooltip"
                      @click="openRemoveConfirm(item)"
                    >
                      <span v-if="isDeleteBusy(item.bookmark_id)" class="spinner-border spinner-border-sm"></span>
                      <i v-else class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <div class="ayah-list-ar" v-html="highlightText(item.ayah_verse_ar, 'arabic')"></div>
                <div v-if="item.ayah_verse_en" class="ayah-list-en" v-html="highlightText(item.ayah_verse_en, 'english')"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <bookmark-modal :ayah="activeAyah" @saved="onSaved" />

    <div v-if="removeConfirmOpen" class="modal-backdrop fade show"></div>
    <div
      v-if="removeConfirmOpen"
      class="modal fade show remove-confirm-modal"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      style="display: block;"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title">{{ removeConfirmTitle }}</h6>
            <button type="button" class="btn-close" aria-label="Close" @click="closeRemoveConfirm"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">{{ removeConfirmMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="closeRemoveConfirm">Cancel</button>
            <button type="button" class="btn btn-danger" :disabled="removeBusy" @click="confirmRemoveBookmark">
              <span v-if="removeBusy" class="spinner-border spinner-border-sm me-2"></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AyahRow from './AyahRow.vue';
import FolderList from './FolderList.vue';
import BookmarkModal from './BookmarkModal.vue';

export default {
  name: 'BookmarkManager',
  components: {
    AyahRow,
    FolderList,
    BookmarkModal,
  },
  data() {
    return {
      selectedFolder: null,
      items: [],
      folders: [],
      source: 'manual',
      loading: false,
      activeAyah: null,
      movingBookmarkId: null,
      deleteBusy: {},
      removeConfirmOpen: false,
      removeCandidate: null,
      removeMode: 'folder',
      removeBusy: false,
      panelMessage: '',
      panelMessageVariant: 'success',
      panelMessageTimer: null,
      isFolderCollapsed: false,
      query: '',
    };
  },
  computed: {
    sourceLabel() {
      if (this.source === 'smart') return 'Smart';
      if (this.source === 'all') return 'All';
      return 'Manual';
    },
    normalizedItems() {
      if (!this.items.length) return [];
      return this.items.map((item) => {
        if (this.source === 'smart') {
          return {
            row_key: `smart-${item.id}`,
            bookmark_id: null,
            surah_number: item.surah_id,
            surah_name: item.surah?.name_en || `Surah ${item.surah_id}`,
            ayah_number: item.ayah_id,
            ayah_verse_ar: item.ayah_text,
            ayah_verse_en: '',
          };
        }

        return {
          row_key: `bookmark-${item.id}`,
          bookmark_id: item.id,
          surah_number: item.surah_number || item.ayah?.surah_id,
          surah_name: item.surah_name || item.ayah?.surah?.name_en || 'Surah',
          ayah_number: item.ayah?.ayah_id || item.ayah_number || item.ayah_num,
          ayah_verse_ar: item.ayah_verse_ar || item.ayah?.ayah_text,
          ayah_verse_en: item.ayah_verse_en || '',
        };
      });
    },
    parsedQuery() {
      return this.parseQuery(this.query);
    },
    activeFieldKeys() {
      return ['surah', 'ayah', 'arabic', 'english'];
    },
    highlightMap() {
      const map = {
        surah: [],
        ayah: [],
        arabic: [],
        english: [],
      };
      const tokens = this.parsedQuery.filter((token) => !token.exclude);
      tokens.forEach((token) => {
        let targets = token.field ? this.mapFieldAlias(token.field) : this.activeFieldKeys;
        if (!targets.length) {
          targets = this.activeFieldKeys;
        }
        targets.forEach((fieldKey) => {
          if (!map[fieldKey]) return;
          map[fieldKey].push(token.term);
        });
      });
      Object.keys(map).forEach((key) => {
        const unique = Array.from(new Set(map[key].filter(Boolean)));
        map[key] = unique.sort((a, b) => b.length - a.length);
      });
      return map;
    },
    filteredItems() {
      const tokens = this.parsedQuery;
      const fieldKeys = this.activeFieldKeys;
      return this.normalizedItems.filter((item) => this.matchesItem(item, tokens, fieldKeys));
    },
    panelCountLabel() {
      if (!this.query) {
        return `${this.normalizedItems.length} ayat`;
      }
      return `${this.filteredItems.length} of ${this.normalizedItems.length} ayat`;
    },
    folderDescriptor() {
      if (!this.selectedFolder) return 'Unified library';
      if (this.selectedFolder.isAll) return 'Global collection';
      if (this.selectedFolder.is_smart) return 'Smart folder';
      return 'Curated collection';
    },
    canMoveFromSelectedFolder() {
      return !!this.selectedFolder && !this.selectedFolder.isAll && !this.selectedFolder.is_smart;
    },
    isSmartSelected() {
      return !!this.selectedFolder?.is_smart;
    },
    deleteTooltip() {
      if (this.isSmartSelected) return 'Smart folders cannot be edited.';
      if (this.selectedFolder?.isAll) return 'Delete from all folders';
      return 'Remove from this folder';
    },
    removeConfirmTitle() {
      return this.removeMode === 'all' ? 'Delete bookmark?' : 'Remove from folder?';
    },
    removeConfirmMessage() {
      if (this.removeMode === 'all') {
        return 'Delete this bookmark from all folders?';
      }
      return 'Remove this ayah from the current folder?';
    },
    moveTargets() {
      if (!this.canMoveFromSelectedFolder) return [];
      return this.folders.filter(
        (folder) => !folder.is_smart && folder.id !== this.selectedFolder.id,
      );
    },
  },
  mounted() {
    this.fetchFolders();
  },
  beforeUnmount() {
    clearTimeout(this.panelMessageTimer);
  },
  methods: {
    clearSearch() {
      this.query = '';
    },
    stripHtmlTags(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
    },
    getBookmarkSurahLabel(item) {
      const name = this.stripHtmlTags(item?.surah_name || '');
      if (name) return name;
      if (item?.surah_number) return `Surah ${item.surah_number}`;
      return 'Surah';
    },
    getBookmarkAyahNumber(item) {
      return item?.ayah_number || '';
    },
    buildBookmarkMessage(item) {
      if (!item) return '';
      const surahLabel = this.getBookmarkSurahLabel(item);
      const ayahNumber = this.getBookmarkAyahNumber(item);
      const header = ayahNumber ? `${surahLabel} (Ayah ${ayahNumber})` : surahLabel;
      const arabic = this.stripHtmlTags(item.ayah_verse_ar || '');
      const translation = this.stripHtmlTags(item.ayah_verse_en || '');
      const lines = [header];
      if (arabic) lines.push(`Arabic: ${arabic}`);
      if (translation) lines.push(`Translation: ${translation}`);
      return lines.join('\n\n');
    },
    async copyText(text) {
      if (!text) return false;
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.clipboard?.writeText && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (_) {
          // fall back
        }
      }
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      } catch (_) {
        return false;
      }
    },
    async copyBookmark(item) {
      const message = this.buildBookmarkMessage(item);
      if (!message) return;
      const ok = await this.copyText(message);
      if (ok) {
        this.setPanelMessage('Ayah copied to clipboard.', 'success');
      } else {
        this.setPanelMessage('Unable to copy ayah.', 'danger');
      }
    },
    shareBookmarkOnWhatsApp(item) {
      const message = this.buildBookmarkMessage(item);
      if (!message) return;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    },
    openInSurat(item) {
      const surahNumber = Number(item?.surah_number || item?.surah_id);
      const ayahNumber = Number(item?.ayah_number || item?.ayah_num || item?.ayah_id);
      if (!surahNumber || !ayahNumber) {
        this.setPanelMessage('Unable to open this ayah.', 'danger');
        return;
      }
      const url = `/surat?surah=${surahNumber}&ayah=${ayahNumber}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    escapeHtml(text) {
      return (text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },
    escapeRegExp(text) {
      return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    parseQuery(query) {
      const tokens = [];
      if (!query) return tokens;
      const regex = /(-)?(?:(\w+):)?(?:"([^"]+)"|(\S+))/g;
      let match;
      while ((match = regex.exec(query)) !== null) {
        const exclude = !!match[1];
        const field = match[2] ? match[2].toLowerCase() : null;
        const term = (match[3] || match[4] || '').trim();
        if (!term) continue;
        tokens.push({ exclude, field, term });
      }
      return tokens;
    },
    mapFieldAlias(field) {
      const key = (field || '').toLowerCase();
      if (!key) return [];
      if (['surah', 's'].includes(key)) return ['surah'];
      if (['ayah', 'a', 'num', 'number'].includes(key)) return ['ayah'];
      if (['ar', 'arabic'].includes(key)) return ['arabic'];
      if (['en', 'english'].includes(key)) return ['english'];
      if (['text', 'verse'].includes(key)) return ['arabic', 'english'];
      return [];
    },
    getFieldValue(item, fieldKey) {
      switch (fieldKey) {
        case 'surah':
          return item.surah_name || '';
        case 'ayah':
          return item.ayah?.ayah_id || item.ayah_number || '';
        case 'arabic':
          return item.ayah_verse_ar || '';
        case 'english':
          return item.ayah_verse_en || '';
        default:
          return '';
      }
    },
    tokenMatchesItem(item, token, fieldKeys) {
      const term = token.term.toLowerCase();
      let fields = token.field ? this.mapFieldAlias(token.field) : fieldKeys;
      if (!fields.length) {
        fields = fieldKeys;
      }
      if (!fields.length) return false;
      return fields.some((fieldKey) => {
        const value = this.stripHtmlTags(this.getFieldValue(item, fieldKey)).toLowerCase();
        return value.includes(term);
      });
    },
    matchesItem(item, tokens, fieldKeys) {
      if (!tokens.length) return true;
      for (const token of tokens) {
        const matched = this.tokenMatchesItem(item, token, fieldKeys);
        if (token.exclude) {
          if (matched) return false;
        } else {
          if (!matched) return false;
        }
      }
      return true;
    },
    highlightText(text, fieldKey) {
      const clean = this.stripHtmlTags(text || '');
      const safe = this.escapeHtml(clean);
      const terms = this.highlightMap[fieldKey] || [];
      if (!terms.length) return safe;
      return terms.reduce((acc, term) => {
        const regex = new RegExp(`(${this.escapeRegExp(term)})`, 'gi');
        return acc.replace(regex, '<mark class="search-hit">$1</mark>');
      }, safe);
    },
    formatMeta(item) {
      const surah = this.highlightText(item.surah_name || '', 'surah');
      const ayah = this.highlightText(String(item.ayah?.ayah_id || item.ayah_number || ''), 'ayah');
      return `${surah} • Ayah ${ayah}`;
    },
    refreshFolderSidebar() {
      return this.$refs.folderList?.fetchFolders?.();
    },
    toggleFolderPane() {
      this.isFolderCollapsed = !this.isFolderCollapsed;
    },
    async fetchFolders() {
      try {
        const response = await axios.get('/api/folders');
        this.folders = response.data?.data || [];
      } catch (_) {
        this.folders = [];
      }
    },
    async onFolderSelected(folder) {
      this.selectedFolder = folder;
      this.loading = true;
      try {
        const response = folder.isAll
          ? await axios.get('/api/ayah-bookmarks')
          : await axios.get('/api/ayah-bookmarks', { params: { folder_id: folder.id } });
        const payload = response.data?.data ?? response.data?.bookmarks ?? response.data ?? [];
        this.items = Array.isArray(payload) ? payload : [];
        this.source = folder.isAll ? 'all' : response.data?.source || 'manual';
        this.fetchFolders();
      } catch (error) {
        this.items = [];
      } finally {
        this.loading = false;
      }
    },
    prepareBookmark(payload) {
      this.activeAyah = {
        surah_number: payload.surah_number,
        surah_name: payload.surah_name,
        ayah_number: payload.ayah_number,
        ayah_verse_ar: payload.ayah_verse_ar,
        ayah_verse_en: payload.ayah_verse_en,
      };
    },
    onSaved() {
      if (this.selectedFolder) {
        this.onFolderSelected(this.selectedFolder);
      }
      this.refreshFolderSidebar();
    },
    async moveBookmark(item, event) {
      const targetId = Number(event?.target?.value);
      if (!targetId || !item?.bookmark_id || !this.canMoveFromSelectedFolder) {
        if (event?.target) event.target.value = '';
        return;
      }
      this.movingBookmarkId = item.bookmark_id;
      try {
        await axios.post(`/api/ayah-bookmarks/${item.bookmark_id}/folders`, {
          folder_ids: [targetId],
        });
        await axios.delete(`/api/ayah-bookmarks/${item.bookmark_id}/folders/${this.selectedFolder.id}`);
        const targetName = this.folders.find((folder) => folder.id === targetId)?.name || 'folder';
        this.adjustFolderCount(this.selectedFolder.id, -1);
        this.adjustFolderCount(targetId, 1);
        if (this.source === 'manual') {
          this.items = this.items.filter((row) => row.id !== item.bookmark_id);
        }
        this.setPanelMessage(`Moved to ${targetName}.`, 'success');
      } catch (error) {
        this.setPanelMessage('Unable to move this ayah.', 'danger');
      } finally {
        this.movingBookmarkId = null;
        if (event?.target) {
          event.target.value = '';
        }
      }
    },
    adjustFolderCount(folderId, delta) {
      const folder = this.folders.find((item) => item.id === folderId);
      if (folder) {
        const nextCount = Math.max(0, (folder.ayah_count || 0) + delta);
        folder.ayah_count = nextCount;
      }
      this.$refs.folderList?.adjustFolderCount?.(folderId, delta);
    },
    setPanelMessage(message, variant) {
      this.panelMessage = message;
      this.panelMessageVariant = variant;
      clearTimeout(this.panelMessageTimer);
      this.panelMessageTimer = setTimeout(() => {
        this.panelMessage = '';
      }, 3000);
    },
    isDeleteBusy(id) {
      return !!this.deleteBusy[id];
    },
    openRemoveConfirm(item) {
      if (!item?.bookmark_id || !this.selectedFolder) return;
      if (this.isSmartSelected) {
        this.setPanelMessage('Smart folders cannot be edited.', 'danger');
        return;
      }
      this.removeCandidate = item;
      this.removeMode = this.selectedFolder.isAll ? 'all' : 'folder';
      this.removeConfirmOpen = true;
      document.body.classList.add('modal-open');
    },
    closeRemoveConfirm() {
      this.removeConfirmOpen = false;
      this.removeCandidate = null;
      this.removeBusy = false;
      document.body.classList.remove('modal-open');
    },
    async confirmRemoveBookmark() {
      if (!this.removeCandidate?.bookmark_id || !this.selectedFolder) return;
      this.removeBusy = true;
      const bookmarkId = this.removeCandidate.bookmark_id;
      this.deleteBusy = { ...this.deleteBusy, [bookmarkId]: true };
      try {
        if (this.removeMode === 'all') {
          await axios.delete(`/api/ayah-bookmarks/${bookmarkId}`);
          this.items = this.items.filter((row) => row.id !== bookmarkId);
          this.setPanelMessage('Bookmark deleted.', 'success');
          await this.refreshFolderSidebar();
        } else {
          await axios.delete(`/api/ayah-bookmarks/${bookmarkId}/folders/${this.selectedFolder.id}`);
          this.items = this.items.filter((row) => row.id !== bookmarkId);
          this.adjustFolderCount(this.selectedFolder.id, -1);
          this.setPanelMessage('Ayah removed from folder.', 'success');
        }
      } catch (error) {
        this.setPanelMessage('Unable to remove this ayah.', 'danger');
      } finally {
        this.deleteBusy = { ...this.deleteBusy, [bookmarkId]: false };
        this.closeRemoveConfirm();
      }
    },
  },
};
</script>

<style scoped>
.bookmark-manager {
  
  padding: 1.5rem 1.25rem;
  background: transparent;
  border-radius: 20px;
  
}

.bookmark-manager > .row {
  position: relative;
  z-index: 1;
}

.bookmark-layout {
  align-items: stretch;
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1.5rem;
}

.folder-col,
.panel-col {
  transition: flex-basis 0.3s cubic-bezier(0.22, 1, 0.36, 1), max-width 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: flex-basis, max-width, opacity, transform;
}

.panel-col {
  min-width: 0;
}

@media (min-width: 992px) {
  .folder-col {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }

  .panel-col {
    flex: 0 0 66.6667%;
    max-width: 66.6667%;
  }

  .folder-col.is-collapsed {
    flex: 0 0 0;
    max-width: 0;
    opacity: 0;
    transform: translateX(-12px);
    pointer-events: none;
    padding-left: 0;
    padding-right: 0;
    margin: 0;
  }

  .panel-col.is-expanded {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

.bookmark-panel {
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
}

.panel-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.65rem;
  color: #6b7280;
  font-weight: 700;
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0.1rem 0 0.2rem;
}

.panel-subtitle {
  font-size: 0.85rem;
  color: #6b7280;
}

.panel-actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.panel-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(125deg, #0f855a, #1abc9c);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: none;
  text-decoration: none;
  box-shadow: 0 12px 24px rgba(15, 110, 99, 0.25);
}

.panel-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(15, 110, 99, 0.3);
}

.panel-toggle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(148, 163, 184, 0.6);
  background: #ffffff;
  color: #0f5c50;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 14px rgba(15, 23, 42, 0.12);
}

.panel-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(15, 23, 42, 0.15);
  border-color: rgba(15, 110, 99, 0.4);
}

.panel-body {
  padding: 16px 24px 24px;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.list-wrapper {
  max-height: calc(100vh - 320px);
  overflow-y: auto;
  padding-right: 4px;
}

.list-wrapper::-webkit-scrollbar {
  width: 8px;
}

.list-wrapper::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.06);
  border-radius: 999px;
}

.list-wrapper::-webkit-scrollbar-thumb {
  background: rgba(15, 110, 99, 0.4);
  border-radius: 999px;
}

.panel-body::-webkit-scrollbar {
  width: 8px;
}

.panel-body::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.06);
  border-radius: 999px;
}

.panel-body::-webkit-scrollbar-thumb {
  background: rgba(15, 110, 99, 0.4);
  border-radius: 999px;
}

.panel-search {
  margin-bottom: 16px;
}

.panel-search .input-group {
  width: 100%;
  max-width: 100%;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.panel-search .input-group-text {
  background: transparent;
  border: none;
  color: #8b93a7;
}

.panel-search .form-control {
  border: none;
  background: transparent;
  box-shadow: none;
}

.panel-search .form-control:focus {
  box-shadow: none;
}

.panel-search .btn-outline-secondary {
  border: none;
  background: transparent;
  color: #8b93a7;
}

.panel-alert {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #ffffff;
  color: #0f172a;
  font-weight: 600;
  margin-bottom: 14px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
}

.loading-state,
.empty-state {
  border-radius: 16px;
  padding: 22px;
  text-align: center;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8);
  color: #6b7280;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.empty-state {
  margin-bottom: 16px;
}

.remove-confirm-modal .modal-content {
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.18);
  padding: 1rem;
}

:deep(.modal-backdrop) {
  background: rgba(15, 23, 42, 0.45);
}

.ayah-list {
  display: grid;
  gap: 12px;
}

.ayah-list-item {
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 16px;
  padding: 16px 20px;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.ayah-list-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.ayah-list-meta {
  font-weight: 700;
  color: #0f172a;
}

.ayah-list-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.move-select {
  min-width: 150px;
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: #f8fafc;
  color: #0f172a;
}

.ayah-list-ar {
  margin-top: 12px;
  font-size: 1.9rem;
  font-family: 'Amiri', 'Noto Naskh Arabic', serif;
  direction: rtl;
  text-align: right;
  color: #0f3a2f;
  line-height: 2;
}

.ayah-list-en {
  margin-top: 10px;
  color: #4b5563;
  line-height: 1.7;
}

@media (max-width: 1199.98px) {
  .bookmark-layout {
    --bs-gutter-x: 1rem;
    --bs-gutter-y: 1rem;
  }

  .panel-header {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .bookmark-manager {
    padding: 1.25rem 0.75rem;
  }

  .folder-col,
  .panel-col {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .folder-col {
    order: -1;
  }

  .folder-col.is-collapsed {
    display: none;
  }

  .panel-col.is-expanded {
    max-width: 100%;
  }

  .panel-header {
    padding: 12px 18px;
  }

  .panel-body {
    padding: 14px 18px 20px;
  }

  .ayah-list-item {
    padding: 14px 18px;
  }
}
</style>
