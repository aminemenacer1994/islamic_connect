<template>
  <div id="app" class="admin-page">
    <!-- Premium Dashboard Header -->
    <div class="dashboard-header pt-4">
      <div class="row g-4 mb-4">
        <!-- Total Bookmarks Card -->
        <div class="col-md-4">
          <div class="stat-card">
            <div class="stat-icon bg-primary-soft"><i class="bi bi-bookmarks-fill"></i></div>
            <div class="stat-info">
              <span class="stat-label">Total Bookmarks</span>
              <h3 class="stat-value">{{ bookmarks.length }}</h3>
            </div>
            <div class="stat-trend positive">
              <i class="bi bi-arrow-up-short"></i> 12%
            </div>
          </div>
        </div>
        <!-- New Today Card -->
        <div class="col-md-4">
          <div class="stat-card">
            <div class="stat-icon bg-success-soft"><i class="bi bi-calendar-check"></i></div>
            <div class="stat-info">
              <span class="stat-label">Added Today</span>
              <h3 class="stat-value">{{ addedTodayCount }}</h3>
            </div>
            <div class="stat-trend">Fresh</div>
          </div>
        </div>
        <!-- Latest Activity -->
        <div class="col-md-4">
          <div class="stat-card">
            <div class="stat-icon bg-warning-soft"><i class="bi bi-clock-history"></i></div>
            <div class="stat-info">
              <span class="stat-label">Last Saved</span>
              <h3 class="stat-value text-truncate" style="font-size: 1rem; max-width: 150px;">{{ lastSavedSurah }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Control Bar -->
      <div class="control-bar mb-4">
        <div class="row align-items-center g-3">
          <div class="col-lg-6">
            <div class="input-group search-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input v-model="query" class="form-control" placeholder="Search by surah name, ayah, or content..." />
              <button v-if="query" class="btn btn-clear" type="button" @click="clearSearch">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="d-flex justify-content-lg-end gap-3">
              <div class="sort-group d-flex align-items-center gap-2">
                <span class="text-muted small fw-semibold">Sort:</span>
                <select v-model="sortBy" class="form-select sort-select shadow-none">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
              <div class="view-status d-flex align-items-center gap-2">
                <span class="badge bg-soft-dark shadow-none px-3 py-2">
                  <i class="bi bi-funnel me-1"></i> {{ filteredBookmarks.length }} results
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid cards -->
    <div class="row g-4 mb-5">
      <!-- Skeleton Loading State -->
      <template v-if="loading">
        <div class="col-md-4" v-for="i in 6" :key="'skel-' + i">
          <div class="note-card skeleton-card">
            <div class="skeleton-chip"></div>
            <div class="skeleton-line full"></div>
            <div class="skeleton-line half"></div>
            <div class="skeleton-meta mt-4"></div>
          </div>
        </div>
      </template>

      <!-- Results Grid -->
      <template v-else>
        <div class="col-md-4" v-for="bm in filteredBookmarks" :key="bm.id">
          <div class="note-card">
            <div class="note-header">
              <div class="note-chip glass-chip">
                <i class="bi bi-bookmark-star-fill me-1"></i>
                Ayah Reference
              </div>
              <div class="note-date">
                <i class="bi bi-calendar3 me-1"></i>{{ extractDate(bm.created_at) }}
              </div>
            </div>
            
            <div class="note-body">
              <div class="ayah-meta mb-2" v-html="formatMeta(bm)"></div>
              <p class="ayah-preview" v-html="highlightText(truncatedText(bm.ayah_verse_en || bm.ayah_verse_ar), primaryTextField(bm))"></p>
            </div>

            <div class="note-footer">
              <div class="action-group">
                <button class="btn-premium-action" @click="viewModal(bm)" title="View Details">
                  <i class="bi bi-eye"></i>
                </button>
                <button class="btn-premium-action" @click="copyBookmark(bm)" title="Copy Verses">
                  <i class="bi bi-clipboard"></i>
                </button>
                <button class="btn-premium-action" @click="shareBookmarkOnWhatsApp(bm)" title="Share">
                  <i class="bi bi-whatsapp"></i>
                </button>
              </div>
              <button 
                class="btn-delete-ghost" 
                @click="deleteBookmark(bm.id)" 
                :disabled="isBusy(bm.id)"
                :title="isBusy(bm.id) ? 'Deleting…' : 'Delete'"
              >
                <span v-if="isBusy(bm.id)" class="spinner-border spinner-border-sm"></span>
                <i v-else class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div v-if="!loading && filteredBookmarks.length === 0" class="empty-state text-center py-5">
      <div class="empty-icon"><i class="bi bi-search"></i></div>
      <h4 class="mt-3">No bookmarks found</h4>
      <p class="text-muted">Try adjusting your filters or search terms.</p>
    </div>

    <!-- View Bookmark Modal -->
    <div
      class="modal fade"
      id="viewBookmark"
      ref="viewBookmarkModal"
      tabindex="-1"
      aria-labelledby="viewBookmarkLabel"
      aria-hidden="true"
     >
      <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewBookmarkLabel"><strong>Bookmark Details</strong></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div class="detail-grid">
              <div class="detail-item full-width">
                <label>Arabic Verse</label>
                <p class="quran-text text-end">{{ form.ayah_verse_ar }}</p>
              </div>
              <div class="detail-item full-width">
                <label>English Translation</label>
                <p>{{ form.ayah_verse_en }}</p>
              </div>
              <div class="detail-item">
                <label>Surah Name</label>
                <p class="fw-bold">{{ form.surah_name }}</p>
              </div>
              <div class="detail-item">
                <label>Ayah Number</label>
                <p class="fw-bold">{{ form.ayah_num }}</p>
              </div>
              <div class="detail-item">
                <label>Date Saved</label>
                <p>{{ extractDate(form.created_at) }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-light px-4" @click="closeModal" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  name: 'BookmarksApp',
  mounted() {
    fetch("/api/userId")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user ID");
        }
        return response.json();
      })
      .then((data) => {
        const userId = data.userId;
        console.log("UserId:", userId);

        if (userId) {
          this.userId = userId;
          this.fetchBookmarks(this.userId);
        } else {
          console.error("User ID not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
    // Bootstrap modal cleanup to avoid stuck backdrops
    const modalElement = this.$refs.viewBookmarkModal;
    if (modalElement && window.bootstrap?.Modal) {
      modalElement.addEventListener('hidden.bs.modal', this.onModalHidden);
    }
  },
  beforeUnmount() {
    const modalElement = this.$refs.viewBookmarkModal;
    if (modalElement) {
      modalElement.removeEventListener('hidden.bs.modal', this.onModalHidden);
      const instance = window.bootstrap?.Modal?.getInstance(modalElement);
      if (instance) instance.dispose();
    }
  },
  data() {
    return {
      loading: false,
      query: '',
      sortBy: 'newest',
      busy: {},
      bookmarks: [],
      userId: null,
      form: {
        id: "",
        ayah_num: "",
        ayah_text: "",
        surah_name: "",
        ayah_verse_ar: "",
        ayah_verse_en: "",
        ayah_notes: "",
        created_at: ""
      },
      maxLength: 70,
    };
  },
  methods: {
    redirectToBookmark(url) {
      window.location.href = url;
    },
    clearSearch() {
      this.query = '';
    },
    stripHtmlTags(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
    },
    getBookmarkSurahLabel(bookmark) {
      if (!bookmark) return 'Surah';
      if (bookmark.surah_name) return `Surah ${this.stripHtmlTags(bookmark.surah_name)}`;
      if (bookmark.surah_number) return `Surah ${bookmark.surah_number}`;
      if (bookmark.surah_id) return `Surah ${bookmark.surah_id}`;
      return 'Surah';
    },
    getBookmarkAyahNumber(bookmark) {
      return bookmark?.ayah_num || bookmark?.ayah_number || bookmark?.ayah_id || '';
    },
    buildBookmarkMessage(bookmark) {
      if (!bookmark) return '';
      const surahLabel = this.getBookmarkSurahLabel(bookmark);
      const ayahNumber = this.getBookmarkAyahNumber(bookmark);
      const header = ayahNumber ? `${surahLabel} (Ayah ${ayahNumber})` : surahLabel;
      const arabic = this.stripHtmlTags(bookmark.ayah_verse_ar || '');
      const translation = this.stripHtmlTags(bookmark.ayah_verse_en || '');
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
    async copyBookmark(bookmark) {
      const message = this.buildBookmarkMessage(bookmark);
      if (!message) return;
      const ok = await this.copyText(message);
      if (ok) {
        Swal.fire({ position: 'top-end', icon: 'success', title: 'Copied', timer: 1200, showConfirmButton: false });
      } else {
        Swal.fire({ icon: 'error', title: 'Copy failed', timer: 1400, showConfirmButton: false });
      }
    },
    shareBookmarkOnWhatsApp(bookmark) {
      const message = this.buildBookmarkMessage(bookmark);
      if (!message) return;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return '';
      return dateTimeString.split('T')[0];
    },
    async fetchBookmarks(userId) {
      try {
        this.loading = true;
        const res = await axios.get(`/api/fetch-bookmarks/${userId}`);
        // support either array or { data: [...] }
        const payload = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
        this.bookmarks = payload;
        console.log('Loaded bookmarks:', this.bookmarks.length);
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      } finally {
        this.loading = false;
      }
    },
    truncatedText(text) {
      if (!text) return '';
      const clean = this.stripHtmlTags(text);
      return clean.length > this.maxLength
        ? clean.substring(0, this.maxLength) + '...'
        : clean;
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
      if (['date', 'created'].includes(key)) return ['date'];
      return [];
    },
    getFieldValue(bookmark, fieldKey) {
      switch (fieldKey) {
        case 'surah':
          return bookmark.surah_name || '';
        case 'ayah':
          return bookmark.ayah?.ayah_id || bookmark.ayah_num || '';
        case 'arabic':
          return bookmark.ayah_verse_ar || '';
        case 'english':
          return bookmark.ayah_verse_en || '';
        case 'date':
          return this.extractDate(bookmark.created_at) || '';
        default:
          return '';
      }
    },
    tokenMatchesBookmark(bookmark, token, fieldKeys) {
      const term = token.term.toLowerCase();
      let fields = token.field ? this.mapFieldAlias(token.field) : fieldKeys;
      if (!fields.length) {
        fields = fieldKeys;
      }
      if (!fields.length) return false;
      return fields.some((fieldKey) => {
        const value = this.stripHtmlTags(this.getFieldValue(bookmark, fieldKey)).toLowerCase();
        return value.includes(term);
      });
    },
    matchesBookmark(bookmark, tokens, fieldKeys) {
      if (!tokens.length) return true;
      for (const token of tokens) {
        const matched = this.tokenMatchesBookmark(bookmark, token, fieldKeys);
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
    formatMeta(bookmark) {
      const surah = this.highlightText(bookmark.surah_name || '', 'surah');
      const ayahNum = bookmark.ayah?.ayah_id || bookmark.ayah_num || '';
      const ayah = this.highlightText(String(ayahNum), 'ayah');
      return `${surah} • Ayah ${ayah}`;
    },
    primaryTextField(bookmark) {
      return bookmark.ayah_verse_en ? 'english' : 'arabic';
    },
    viewModal(bookmark) {
      this.form = bookmark;
      const el = this.$refs.viewBookmarkModal || document.getElementById('viewBookmark');
      const instance = window.bootstrap?.Modal?.getOrCreateInstance
        ? window.bootstrap.Modal.getOrCreateInstance(el, { backdrop: true })
        : new bootstrap.Modal(el, { backdrop: true });
      instance.show();
    },
    async deleteBookmark(id) {
      const result = await Swal.fire({
        title: "Delete bookmark?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#b00020",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete"
      });
      if (!result.isConfirmed) return;
      try {
        this.$set ? this.$set(this.busy, id, true) : (this.busy[id] = true);
        await axios.delete(`/api/delete-bookmarks/${id}`);
        await this.fetchBookmarks(this.userId);
        Swal.fire({ position: 'top-end', icon: 'success', title: 'Bookmark deleted', timer: 1200, showConfirmButton: false });
      } catch (e) {
        console.error('Delete error:', e);
        Swal.fire({ icon: 'error', title: 'Delete failed', timer: 1400, showConfirmButton: false });
      } finally {
        this.busy[id] = false;
      }
    },
    closeModal() {
      const el = this.$refs.viewBookmarkModal || document.getElementById('viewBookmark');
      const instance = window.bootstrap?.Modal?.getInstance(el) || (window.bootstrap ? null : bootstrap.Modal.getInstance(el));
      if (instance) instance.hide();
      // Fallback cleanup in case instance isn't available
      this.cleanupBackdrops();
    },
    onModalHidden() {
      this.cleanupBackdrops();
    },
    cleanupBackdrops() {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => b.parentNode && b.parentNode.removeChild(b));
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    },
    isBusy(id) { return !!this.busy[id]; },
  },
  computed: {
    parsedQuery() {
      return this.parseQuery(this.query);
    },
    activeFieldKeys() {
      return ['surah', 'ayah', 'arabic', 'english'];
    },
    bootstrapColors() {
      return ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark'];
    },
    addedTodayCount() {
      const today = new Date().toISOString().split('T')[0];
      return this.bookmarks.filter(bm => bm.created_at && bm.created_at.startsWith(today)).length;
    },
    lastSavedSurah() {
      if (!this.bookmarks.length) return 'N/A';
      const sorted = [...this.bookmarks].sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
      return sorted[0].surah_name || 'N/A';
    },
    highlightMap() {
      const map = {
        surah: [],
        ayah: [],
        arabic: [],
        english: [],
        date: [],
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
    filteredBookmarks() {
      const tokens = this.parsedQuery;
      const fieldKeys = this.activeFieldKeys;
      const list = (this.bookmarks || []).filter((bm) => this.matchesBookmark(bm, tokens, fieldKeys));
      return list.sort((a, b) => {
        const da = new Date(a.created_at || 0).getTime();
        const db = new Date(b.created_at || 0).getTime();
        return this.sortBy === 'newest' ? db - da : da - db;
      });
    }
  },
};
</script>

<style scoped>
.admin-page {
  background-color: #f8fafc;
  min-height: 100vh;
}

/* Dashboard Header & Stats */
.stat-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
}

.stat-icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bg-primary-soft { background: rgba(15, 110, 99, 0.1); color: #0f6e63; }
.bg-success-soft { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.bg-warning-soft { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }

.stat-label {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.stat-value {
  margin: 0;
  font-weight: 800;
  color: #0f172a;
}

.stat-trend {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 99px;
  background: #f1f5f9;
  color: #64748b;
}

.stat-trend.positive {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

/* Control Bar */
.control-bar {
  background: #ffffff;
  border-radius: 20px;
  padding: 16px 24px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.03);
}

.search-group {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.search-group:focus-within {
  border-color: #0f6e63;
  box-shadow: 0 0 0 4px rgba(15, 110, 99, 0.1);
}

.search-group .input-group-text {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding-left: 16px;
}

.search-group .form-control {
  background: transparent;
  border: none;
  font-weight: 500;
  color: #0f172a;
  padding: 12px;
}

.btn-clear {
  border: none;
  color: #94a3b8;
  padding: 0 16px;
}

.sort-select {
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  border-color: #e2e8f0;
  padding: 8px 36px 8px 12px;
}

.bg-soft-dark {
  background: #1e293b;
  color: #ffffff;
  font-weight: 600;
  border-radius: 10px;
}

/* Note Card */
.note-card {
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 24px;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.note-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  border-color: rgba(15, 110, 99, 0.2);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.glass-chip {
  background: rgba(15, 110, 99, 0.08);
  color: #0f6e63;
  font-weight: 800;
  font-size: 0.7rem;
  padding: 6px 12px;
  border-radius: 99px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.note-date {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 600;
}

.ayah-meta {
  color: #0f172a;
  font-weight: 700;
  font-size: 1rem;
}

.ayah-preview {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}

.note-footer {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-group {
  display: flex;
  gap: 8px;
}

.btn-premium-action {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-premium-action:hover {
  background: #f8fafc;
  color: #0f6e63;
  border-color: #0f6e63;
  transform: scale(1.05);
}

.btn-delete-ghost {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: #94a3b8;
  transition: all 0.2s ease;
}

.btn-delete-ghost:hover:not(:disabled) {
  background: #fef2f2;
  color: #ef4444;
}

/* Skeleton Loading */
.skeleton-card {
  pointer-events: none;
}

.skeleton-chip, .skeleton-line, .skeleton-meta {
  background: linear-gradient(90deg, #f1f5f9 25%, #f8fafc 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 10px;
}

.skeleton-chip { height: 24px; width: 100px; margin-bottom: 20px; }
.skeleton-line { height: 16px; margin-bottom: 12px; }
.skeleton-line.full { width: 100%; }
.skeleton-line.half { width: 50%; }
.skeleton-meta { height: 40px; border-radius: 12px; }

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Empty State */
.empty-state {
  background: #ffffff;
  border-radius: 24px;
  border: 2px dashed #e2e8f0;
}

.empty-icon {
  font-size: 3rem;
  color: #cbd5e1;
}

/* Modal Professional */
.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.detail-item.full-width {
  grid-column: span 2;
}

.detail-item label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.detail-item p {
  margin: 0;
  color: #0f172a;
}

.quran-text {
  font-size: 2rem;
  line-height: 1.8;
  font-family: 'Amiri', serif;
}


.search-hit {
  background: rgba(15, 110, 99, 0.1);
  color: #0f6e63;
  border-radius: 4px;
  padding: 0 4px;
  font-weight: 600;
}
</style>
