<template>
  <div>
  
   <!-- Notes Container -->
   <div class="pt-4">
    <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
      <div class="input-group" style="max-width:380px">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input v-model="query" class="form-control" placeholder="Search notes..." />
      </div>
      <div class="d-flex align-items-center gap-2">
        <select v-model="sortBy" class="form-select">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <!-- <button type="button" class="btn btn-add outline" @click="openCreateModal"><i class="bi bi-plus-lg me-1"></i>New Note</button> -->
      </div>
    </div>
    <h3 class="pb-3 text-center">
     <strong>You have:</strong> <b style="color:rgb(0, 191, 166)">{{ notes.length }}</b> <strong>notes</strong>
    </h3>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="note in filteredNotes" :key="note.id">
        <div class="note-card">
          <div class="note-chip">
            <i class="bi bi-journal-text me-1"></i>
            Note
          </div>
          <div class="note-body" v-html="truncatedHtml(note.ayah_notes, 220)"></div>
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
          </div>
        </div>
      </div>
    </div>
   </div>

  <!-- Create Note Modal -->
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

   <!-- Edit Note Modal -->
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
  
   <!-- View Note Modal -->
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
  
  </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { QuillEditor as Editor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

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
        const response = await fetch('/api/userId');
        if (!response.ok) throw new Error('Failed to fetch user ID');
        const data = await response.json();
        if (data.userId) {
          this.userId = data.userId;
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
      this.form = {
        id: note.id,
        surah_name: note.surah_name || '',
        ayah_verse_ar: note.ayah_verse_ar || '',
        ayah_verse_en: note.ayah_verse_en || '',
        ayah_notes: note.ayah_notes || '',
        option: typeof note.option !== 'undefined' ? note.option : '',
        visibility_option: typeof note.visibility_option !== 'undefined' ? Number(note.visibility_option) : (typeof note.option !== 'undefined' ? Number(note.option) : 0),
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
      this.form = {
        id: note.id,
        surah_name: note.surah_name || '',
        ayah_verse_ar: note.ayah_verse_ar || '',
        ayah_verse_en: note.ayah_verse_en || '',
        ayah_notes: note.ayah_notes || '',
        option: typeof note.option !== 'undefined' ? note.option : '',
        visibility_option: typeof note.visibility_option !== 'undefined' ? Number(note.visibility_option) : (typeof note.option !== 'undefined' ? Number(note.option) : 0),
        created_at: note.created_at || '',
      };
      this.cleanupModalBackdrops();
      this.$nextTick(() => {
        try {
          const modalEl = document.getElementById('editNotes');
          if (modalEl && window.bootstrap?.Modal) {
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
          }
        } catch (e) {
          console.error('Error opening edit modal:', e);
        }
      });
    },
    truncatedHtml(html, maxLength = 150) {
      const div = document.createElement("div");
      div.innerHTML = html || '';
      const plainText = div.textContent || div.innerText || "";
      if (plainText.length > maxLength) {
        return plainText.substring(0, maxLength) + '...';
      }
      return plainText;
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
        const payload = { ...this.form, visibility_option: Number(this.form.visibility_option ?? 0) };
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
    filteredNotes() {
      const q = (this.query || '').toLowerCase();
      const list = this.notes.filter(n => {
        const plain = this.stripHtmlTags((n.ayah_notes || '').toString()).toLowerCase();
        return !q || plain.includes(q);
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
.note-card {
  position: relative;
  background: #fff;
  border: 1px solid #e6e8eb;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  cursor: default;
  /* Ensure pointer events work */
  pointer-events: auto;
}

.note-card:before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(120deg, rgba(0, 191, 166, 0.4), rgba(0, 191, 166, 0) 40%, rgba(124, 77, 255, 0.15));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  /* Critical: prevent pseudo-element from blocking clicks */
  pointer-events: none;
}

.note-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
}

.note-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #e6fcf7;
  color: #0f766e;
  border: 1px solid #b3efe3;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 4px 10px;
  margin-bottom: 10px;
  pointer-events: none;
}

.note-body {
  color: #0f172a;
  min-height: 96px;
  margin-bottom: 8px;
  pointer-events: none;
}

.note-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  color: #64748b;
  font-size: 0.85rem;
  pointer-events: none;
}

.note-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 10px;
  /* Ensure buttons are clickable */
  position: relative;
  z-index: 10;
}

.btn-icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 10px;
  /* Ensure buttons are clickable */
  pointer-events: auto;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-icon:hover:not(:disabled) {
  transform: scale(1.05);
}

.btn-icon:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-success.outline {
  background: #fff !important;
  color: #198754 !important;
  border: 2px solid #198754 !important;
  box-shadow: none;
}

.btn-success.outline:hover:not(:disabled) {
  background: #198754 !important;
  color: #fff !important;
}

.btn-danger.outline {
  background: #fff !important;
  color: #b00020 !important;
  border: 2px solid #b00020 !important;
  box-shadow: none;
}

.btn-danger.outline:hover:not(:disabled) {
  background: #b00020 !important;
  color: #fff !important;
}

.btn-ghost {
  background: #fff;
  border: 1px solid #e6e8eb;
  color: #0f172a;
}

.btn-ghost:hover {
  background: #f7faf9;
}

.btn-add {
  background: #00bfa6;
  color: #fff;
  border: none;
}

.btn-add:hover {
  background: #009688;
}

/* Ensure visually-hidden elements don't block clicks */
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
