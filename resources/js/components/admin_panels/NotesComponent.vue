<template>
  <div class="admin-page">
  
   <!-- Notes Container -->
  <div class="pt-4">
    <div class="toolbar-row mb-3">
      <div class="input-group admin-search">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input v-model="query" class="form-control" placeholder="Search notes..." />
      </div>
      <div class="filters d-flex align-items-center gap-2">
        <select v-model="surahFilter" class="form-select">
          <option value="all">All surahs</option>
          <option v-for="(surah, idx) in surahFilterOptions" :key="`filter-${surah}-${idx}`" :value="surah">
            {{ surah }}
          </option>
        </select>
        <select v-model="sortBy" class="form-select">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <select v-model="lengthFilter" class="form-select">
          <option value="all">Any length</option>
          <option value="short">Short (under 100 chars)</option>
          <option value="medium">Medium (100‑199 chars)</option>
          <option value="long">Long (200+ chars)</option>
        </select>
      </div>
    </div>
    <h3 class="pb-3 text-center admin-count">
     <span class="count-label">You have</span>
     <span class="count-pill">{{ notes.length }}</span>
     <span class="count-label">notes</span>
    </h3>
    <div class="row">
        <div class="col-md-4 mb-4" v-for="note in filteredNotes" :key="note.id">
          <div class="note-card">
          <div class="note-chip">
            <i class="bi bi-journal-text me-1"></i>
            Note
          </div>
          <div v-if="note.ayah_info" class="note-title" v-html="highlightMatches(note.ayah_info)"></div>
          <div v-if="note.surah_name || note.ayah_num" class="note-reference">
            <span v-if="note.surah_name">{{ displaySurahName(note.surah_name) }}</span>
            <span v-if="note.ayah_num"> • Ayah {{ note.ayah_num }}</span>
          </div>
          <div class="note-body" v-html="renderNoteExcerpt(note)"></div>
            <div class="note-meta">
              <span class="date"><i class="bi bi-calendar3 me-1"></i>{{ extractDate(note.created_at) }}</span>
            </div>
          <div class="note-actions" role="group" aria-label="Note actions">
            <button 
              type="button" 
              class="btn btn-icon btn-ghost" 
              @click="viewModal(note)"
              title="View"
              aria-label="View note">
              <i class="bi bi-eye"></i>
            </button>
            <button 
              type="button" 
              class="btn btn-icon btn-success outline" 
              data-bs-toggle="modal"
              data-bs-target="#editNotes"
              @click="editModal(note)"
              title="Edit"
              aria-label="Edit note">
              <i class="bi bi-pencil"></i>
            </button>
            <button 
              type="button" 
              class="btn btn-icon btn-danger outline" 
              :disabled="isBusy(note.id)" 
              @click="deleteNote(note.id)"
              :title="isBusy(note.id) ? 'Deleting…' : 'Delete'"
              aria-label="Delete note">
              <span v-if="isBusy(note.id)" class="spinner-border spinner-border-sm"></span>
              <i v-else class="bi bi-trash"></i>
            </button>
            <button 
              type="button" 
              class="btn btn-icon btn-ghost" 
              @click="copyNoteToClipboard(note)"
              title="Copy note"
              aria-label="Copy note to clipboard">
              <i class="bi bi-clipboard"></i>
            </button>
            <button 
              type="button" 
              class="btn btn-icon btn-ghost" 
              @click="shareNoteOnWhatsApp(note)"
              title="Share on WhatsApp"
              aria-label="Share note on WhatsApp">
              <i class="bi bi-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>

    <!-- Create Note Modal -->
    <teleport to="body">
      <div class="modal fade" id="createNote" tabindex="-1" aria-labelledby="createNoteLabel" aria-hidden="true" data-bs-backdrop="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark" id="createNoteLabel"><strong>Create Note</strong></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createNote">
                <div class="mb-3">
                  <label class="form-label">Notes</label>
                  <Editor theme="snow" v-model:content="newNote" contentType="html" class="editor"/>
                </div>
                <div class="d-flex justify-content-end gap-2">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </teleport>

   <!-- Edit Note Modal -->
   <teleport to="body">
     <div class="modal fade" id="editNotes" tabindex="-1" aria-labelledby="editNotesLabel" aria-hidden="true" data-bs-backdrop="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
       <div class="modal-content">
        <div class="modal-header">
         <h5 class="modal-title text-dark" id="editNotesLabel"><strong>Edit Note</strong></h5>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <form @submit.prevent="updateNotes">
          <div class="mb-3">
           <label class="form-label"><b>Edit your note:</b></label>
           <Editor theme="snow" v-model:content="form.ayah_notes" contentType="html" class="editor"/>
          </div>
          <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="submit" class="btn btn-success">Update</button>
          </div>
         </form>
        </div>
       </div>
      </div>
     </div>
   </teleport>
  
   <!-- View Note Modal -->
   <teleport to="body">
     <div class="modal fade" id="viewNotes" tabindex="-1" aria-labelledby="viewNotesLabel" aria-hidden="true" data-bs-backdrop="true">
      <div class="modal-dialog modal-dialog-centered modal-lg modal-modern modal-fullscreen-md-down">
       <div class="modal-content">
        <div class="modal-header">
         <h5 class="modal-title text-dark" id="viewNotesLabel"><b>View Note</b></h5>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <div class="container">
          <div class="mb-3" v-if="form.surah_name">
           <label class="form-label"><strong>Surah Name:</strong></label>
           <p class="mt-2 text-dark text-left">{{ form.surah_name }}</p>
          </div>
          <div class="mb-3">
           <label class="form-label"><strong>Notes:</strong></label>
           <div class="mt-2 text-dark text-left" v-html="form.ayah_notes"></div>
          </div>
          <div class="mb-3">
           <label class="form-label"><strong>Date Created:</strong></label>
           <p class="mt-2 text-dark text-left">{{ extractDate(form.created_at) }}</p>
          </div>
         </div>
        </div>
        <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
       </div>
      </div>
     </div>
   </teleport>
  </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { QuillEditor as Editor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { fetchUserIdFromApi } from '../../utils/bookmarkAuth';

export default {
  components: {
    Editor
  },
  data() {
    return {
      notes: [],
      userId: null,
      query: '',
      sortBy: 'newest',
      newNote: '',
      surahFilter: 'all',
      lengthFilter: 'all',
      busy: {},
      form: {
        id: null,
        surah_name: '',
        ayah_verse_ar: '',
        ayah_verse_en: '',
        ayah_notes: '',
        created_at: '',
        option: '',
        visibility_option: 0,
      },
    };
  },
  mounted() {
    this.initializeUser();
    this.cleanupModalBackdrops();
  },
  methods: {
    cleanupModalBackdrops() {
      // Remove any stray modal backdrops on mount
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => b.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    },
    async initializeUser() {
      try {
        const userId = await fetchUserIdFromApi();
        if (userId) {
          this.userId = userId;
          await this.fetchNotes(this.userId);
        } else {
          console.error('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    },
    openCreateModal() {
      this.newNote = '';
      this.cleanupModalBackdrops();
      this.$nextTick(() => {
        try {
          const el = document.getElementById('createNote');
          if (el && window.bootstrap?.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(el);
            modal.show();
          }
        } catch (e) {
          console.error('Error opening modal:', e);
        }
      });
    },
    async createNote() {
      const strippedContent = this.stripHtmlTags(this.newNote || '');
      if (!strippedContent.trim()) {
        Swal.fire({ icon: 'warning', title: 'Please enter a note', timer: 1200, showConfirmButton: false });
        return;
      }
      try {
        await axios.post('api/submit-note', { 
          ayah_notes: this.newNote, 
          is_speech_to_text: false 
        });
        this.newNote = '';
        this.closeModal('createNote');
        await this.fetchNotes(this.userId);
        Swal.fire({ icon: 'success', title: 'Note created', timer: 1200, showConfirmButton: false });
      } catch (e) {
        console.error('Create error:', e);
        Swal.fire({ icon: 'error', title: 'Create failed', timer: 1400, showConfirmButton: false });
      }
    },
    closeModal(modalId) {
      try {
        const el = document.getElementById(modalId);
        if (el && window.bootstrap?.Modal) {
          const modal = window.bootstrap.Modal.getInstance(el);
          if (modal) {
            modal.hide();
          }
        }
        // Force cleanup after modal close
        setTimeout(() => this.cleanupModalBackdrops(), 300);
      } catch (e) {
        console.error('Error closing modal:', e);
      }
    },
    stripHtmlTags(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.innerHTML = text;
      return div.textContent || div.innerText || '';
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return '';
      try {
        const d = new Date(dateTimeString);
        if (!isNaN(d.getTime())) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${y}-${m}-${day}`;
        }
        return (dateTimeString.split('T')[0] || dateTimeString).trim();
      } catch (_) {
        return String(dateTimeString).split('T')[0];
      }
    },
    async fetchNotes(userId) {
      try {
        const response = await fetch(`/api/fetch-notes/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        this.notes = await response.json();
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    },
    viewModal(note) {
      console.log('View clicked:', note.id);
      const vis = this.normalizeVisibility(note.visibility_option ?? note.option);
      this.form = {
        id: note.id,
        surah_name: note.surah_name || '',
        ayah_verse_ar: note.ayah_verse_ar || '',
        ayah_verse_en: note.ayah_verse_en || '',
        ayah_notes: note.ayah_notes || '',
        option: typeof note.option !== 'undefined' ? note.option : '',
        visibility_option: vis,
        created_at: note.created_at || '',
      };
      this.cleanupModalBackdrops();
      this.$nextTick(() => {
        try {
          const modalEl = document.getElementById('viewNotes');
          if (modalEl && window.bootstrap?.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
          }
        } catch (e) {
          console.error('Error opening view modal:', e);
        }
      });
    },
    editModal(note) {
      console.log('Edit clicked:', note.id);
      // hydrate reactive form with selected note
      const vis = this.normalizeVisibility(note.visibility_option ?? note.option);
      this.form = {
        id: note.id,
        surah_name: note.surah_name || '',
        ayah_verse_ar: note.ayah_verse_ar || '',
        ayah_verse_en: note.ayah_verse_en || '',
        ayah_notes: note.ayah_notes || '',
        option: typeof note.option !== 'undefined' ? note.option : '',
        visibility_option: vis,
        created_at: note.created_at || '',
      };
      // no programmatic show; rely on data-bs-toggle for reliability
    },
    displaySurahName(name) {
      const clean = this.stripSurahPrefix(name || "");
      return clean || (name || "");
    },
    stripSurahPrefix(name) {
      if (!name) return "";
      return name.replace(/^\s*\d+\s*[-–—]\s*/, "").trim();
    },
    escapeHtml(value = "") {
      return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },
    escapeRegExp(value = "") {
      return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    highlightMatches(text = "") {
      const escaped = this.escapeHtml(text);
      const query = (this.query || "").trim();
      if (!query) {
        return escaped;
      }
      const regex = new RegExp(`(${this.escapeRegExp(query)})`, "gi");
      return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
    },
    renderNoteExcerpt(note, maxLength = 220) {
      const plain = this.stripHtmlTags(note.ayah_notes || "");
      const truncated =
        plain.length > maxLength ? plain.slice(0, maxLength).trim() + "..." : plain;
      return this.highlightMatches(truncated);
    },
    composeNoteText(note) {
      const segments = [];
      if (note.ayah_info) {
        segments.push(note.ayah_info);
      }
      const surahName = this.displaySurahName(note.surah_name);
      if (surahName || note.ayah_num) {
        const reference = [surahName, note.ayah_num ? `Ayah ${note.ayah_num}` : ""]
          .filter(Boolean)
          .join(" • ");
        if (reference) {
          segments.push(reference);
        }
      }
      const body = this.stripHtmlTags(note.ayah_notes || "");
      if (body) {
        segments.push(body);
      }
      return segments.join("\n");
    },
    async copyNoteToClipboard(note) {
      const text = this.composeNoteText(note);
      if (!text) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }
        Swal.fire({
          icon: "success",
          title: "Copied to clipboard",
          timer: 1200,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Clipboard copy failed", error);
        Swal.fire({
          icon: "error",
          title: "Unable to copy",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    },
    shareNoteOnWhatsApp(note) {
      const text = this.composeNoteText(note);
      if (!text) return;
      const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener");
    },
    async updateNotes() {
      const strippedContent = this.stripHtmlTags(this.form.ayah_notes || '');
      if (!strippedContent.trim()) {
        Swal.fire({ icon: 'warning', title: 'Note cannot be empty', timer: 1200, showConfirmButton: false });
        return;
      }

      const result = await Swal.fire({
        title: "Are you sure you want to update?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update note!",
      });

      if (!result.isConfirmed) return;

      try {
        const payload = { ...this.form, visibility_option: this.normalizeVisibility(this.form.visibility_option) };
        await axios.post(`api/update-notes/${this.form.id}`, payload);
        this.closeModal('editNotes');
        await this.fetchNotes(this.userId);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error('Update error:', error);
        Swal.fire({ icon: 'error', title: 'Update failed', timer: 1400, showConfirmButton: false });
      }
    },
    isBusy(id) {
      return !!this.busy[id];
    },
    normalizeVisibility(val){
      if (val === 'private' || val === 1 || val === '1') return 1;
      if (val === 'public' || val === 0 || val === '0' || val === undefined || val === null) return 0;
      return val ? 1 : 0;
    },
    async deleteNote(id) {
      console.log('Delete clicked:', id);
      const result = await Swal.fire({
        title: "Delete note?",
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
        await axios.delete(`/api/delete-notes/${id}`);
        await this.fetchNotes(this.userId);
        Swal.fire({ icon: 'success', title: 'Note deleted', timer: 1200, showConfirmButton: false });
      } catch (e) {
        console.error('Delete error:', e);
        Swal.fire({ icon: 'error', title: 'Delete failed', timer: 1400, showConfirmButton: false });
      } finally {
        this.busy[id] = false;
      }
    },
  },
  computed: {
    surahFilterOptions() {
      const set = new Set();
      this.notes.forEach(note => {
        const name = this.displaySurahName(note.surah_name);
        if (name) {
          set.add(name);
        }
      });
      return Array.from(set).sort((a, b) => a.localeCompare(b));
    },
    filteredNotes() {
      const query = (this.query || '').toLowerCase().trim();
      const list = this.notes.filter(note => {
        const noteText = [
          note.ayah_info,
          note.surah_name,
          note.ayah_verse_en,
          this.stripHtmlTags(note.ayah_notes || '')
        ]
          .map(val => (val || '').toString().toLowerCase())
          .join(" ");
        if (query && !noteText.includes(query)) {
          return false;
        }

        if (this.surahFilter !== 'all') {
          const filteredSurah = this.displaySurahName(note.surah_name).toLowerCase();
          if (!filteredSurah || filteredSurah !== this.surahFilter.toLowerCase()) {
            return false;
          }
        }

        if (this.lengthFilter !== 'all') {
          const length = this.stripHtmlTags(note.ayah_notes || '').length;
          if (this.lengthFilter === 'short' && length >= 100) return false;
          if (this.lengthFilter === 'medium' && (length < 100 || length >= 200))
            return false;
          if (this.lengthFilter === 'long' && length < 200) return false;
        }

        return true;
      });

      return list.sort((a, b) => {
        const da = new Date(a.created_at || 0).getTime();
        const db = new Date(b.created_at || 0).getTime();
        return this.sortBy === 'newest' ? db - da : da - db;
      });
    }
  }
};
</script>

<style scoped>
.admin-search {
  max-width: 380px;
}

.toolbar-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.toolbar-row .filters {
  margin-left: auto;
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

.note-card:before {
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

.note-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: var(--admin-ink);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-reference {
  font-size: 0.85rem;
  color: var(--admin-muted);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
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

.search-highlight {
  background: rgba(15, 110, 99, 0.15);
  color: #0f6e63;
  padding: 1px 4px;
  border-radius: 4px;
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

.btn-success.outline {
  background: #fff !important;
  color: var(--admin-accent-strong) !important;
  border: 1px solid rgba(15, 110, 99, 0.5) !important;
  box-shadow: none;
}

.btn-success.outline:hover:not(:disabled) {
  background: rgba(15, 110, 99, 0.12) !important;
  color: var(--admin-accent-strong) !important;
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

.btn-add {
  background: linear-gradient(135deg, var(--admin-accent), var(--admin-accent-strong));
  color: #fff;
  border: none;
}

.btn-add:hover {
  filter: brightness(0.95);
}

.visually-hidden {
  pointer-events: none;
}
</style>
  
<style>
.editor {
  height: 320px;
}

/* Ensure modal backdrops don't linger */
.modal-backdrop {
  pointer-events: auto;
}

body.modal-open {
  overflow: hidden;
}
</style>
