<template>
  <div id="app" class="admin-page">
    <!-- Header: search & sort -->
    <div class="pt-4">
      <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2 admin-toolbar">
        <div class="input-group admin-search">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input v-model="query" class="form-control" placeholder="Search bookmarks..." />
        </div>
        <div class="d-flex align-items-center gap-2">
          <select v-model="sortBy" class="form-select">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
      <h3 class="pb-3 text-center admin-count">
        <span class="count-label">You have</span>
        <span class="count-pill">{{ bookmarks.length }}</span>
        <span class="count-label">bookmarks</span>
      </h3>

      <!-- Grid cards -->
      <div class="row">
        <div class="col-md-4 mb-4" v-for="bm in filteredBookmarks" :key="bm.id">
          <div class="note-card">
            <div class="note-chip">
              <i class="bi bi-bookmark-fill me-1"></i>
              Bookmark
            </div>
            <div class="note-body">
              <div class="fw-semibold mb-1">{{ bm.surah_name }} • Ayah {{ bm.ayah_num }}</div>
              <div>{{ truncatedText(bm.ayah_verse_en || bm.ayah_verse_ar) }}</div>
            </div>
            <div class="note-meta">
              <span class="date"><i class="bi bi-calendar3 me-1"></i>{{ extractDate(bm.created_at) }}</span>
            </div>
            <div class="note-actions" role="group" aria-label="Bookmark actions">
              <button
                type="button"
                class="btn btn-icon btn-ghost"
                @click="viewModal(bm)"
                title="View"
                aria-label="View bookmark">
                <i class="bi bi-eye"></i>
              </button>
              <button
                type="button"
                class="btn btn-icon btn-danger outline"
                :disabled="isBusy(bm.id)"
                @click="deleteBookmark(bm.id)"
                :title="isBusy(bm.id) ? 'Deleting…' : 'Delete'"
                aria-label="Delete bookmark">
                <span v-if="isBusy(bm.id)" class="spinner-border spinner-border-sm"></span>
                <i v-else class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!loading && filteredBookmarks.length === 0" class="empty text-center py-4">
        No bookmarks yet. Save favorite ayahs from the Quran page to see them here.
      </div>
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
            <h5 class="modal-title" id="viewBookmarkLabel"><strong>View Bookmark</strong></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="mb-3">
                <label class="form-label"><strong>Surah Name:</strong></label>
                <p class="mt-2 text-dark">
                  {{ form.surah_name }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Ayah Number:</strong></label>
                <p class="mt-2 text-dark">
                  {{ form.ayah_num }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Arabic Verse:</strong></label>
                <p class="mt-2 text-dark">
                  {{ form.ayah_verse_ar }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>English Info:</strong></label>
                <p class="mt-2 text-dark">
                  {{ form.ayah_verse_en }}
                </p>
              </div>
              <div class="mb-3">
                <label class="form-label"><strong>Date Created:</strong></label>
                <p class="mt-2 text-dark">
                  {{ extractDate(form.created_at) }}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal" data-bs-dismiss="modal">Close</button>
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
    stripHtmlTags(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
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
      return text.length > this.maxLength
        ? text.substring(0, this.maxLength) + '...'
        : text;
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
    filteredBookmarks() {
      const q = (this.query || '').toLowerCase();
      const list = (this.bookmarks || []).filter(bm => {
        const parts = [bm.surah_name, String(bm.ayah_num), bm.ayah_verse_ar, bm.ayah_verse_en]
          .map(v => this.stripHtmlTags((v || '').toString()).toLowerCase());
        return !q || parts.some(p => p.includes(q));
      });
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
.admin-search {
  max-width: 380px;
}

.modal-modern .modal-content {
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
}

.modal-modern .modal-header {
  background: linear-gradient(90deg, rgba(15, 110, 99, 0.12), rgba(255, 255, 255, 0));
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.btn-close {
  outline: none;
  box-shadow: none;
}

.note-card {
  position: relative;
  background: var(--admin-card);
  border: 1px solid var(--admin-border);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
  pointer-events: auto;
  overflow: hidden;
}

.note-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 18px;
  padding: 1px;
  background: linear-gradient(120deg, rgba(15, 110, 99, 0.35), rgba(15, 110, 99, 0) 45%, rgba(12, 92, 83, 0.18));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
}

.note-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(15, 110, 99, 0.12);
  color: var(--admin-accent-strong);
  border: 1px solid rgba(15, 110, 99, 0.3);
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 4px 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  pointer-events: none;
}

.note-body {
  color: var(--admin-ink);
  min-height: 96px;
  margin-bottom: 8px;
  pointer-events: none;
}

.note-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  color: var(--admin-muted);
  font-size: 0.85rem;
  pointer-events: none;
}

.note-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 12px;
  position: relative;
  z-index: 10;
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 12px;
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.btn-icon:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
}

.btn-icon:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-danger.outline {
  background: #fff !important;
  color: #b42318 !important;
  border: 1px solid rgba(180, 35, 24, 0.5) !important;
  box-shadow: none;
}

.btn-danger.outline:hover:not(:disabled) {
  background: rgba(180, 35, 24, 0.1) !important;
  color: #b42318 !important;
}

.btn-ghost {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  color: var(--admin-ink);
}

.btn-ghost:hover {
  background: #f7fbfa;
  border-color: rgba(15, 110, 99, 0.3);
  color: var(--admin-accent-strong);
}

.empty {
  color: var(--admin-muted);
  padding: 1rem;
}

.truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
