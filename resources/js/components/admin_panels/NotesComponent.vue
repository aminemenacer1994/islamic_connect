<template>
  <div>
  
   <!-- removed mobile quick-links to keep the page minimal -->
  
   <!-- Notes Container -->
   <div class=" pt-4">
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
      </div>
    </div>
    <h3 class="pb-3 text-center">
     <strong>You have:</strong> <b style="color:rgb(0, 191, 166)">{{ notes.length }}</b> <strong>notes</strong>
  
    </h3>
    <div class="row">
     <div class="col-md-4 mb-4 collage-item" v-for="note in filteredNotes" :key="note.id">
      <!-- Note Card -->
      <div class="card" style="border-radius:8px;padding:10px; border: 2px solid rgba(0, 191, 166);">
       <div class="card-body">
        <!-- Note details -->
        <!-- <div>
         <h5><strong>Surah Name:</strong></h5>
         <p>{{ note.surah_name }}</p>
        </div> -->
        <div class="mt-2 pb-2">
         <h5><strong>Note:</strong></h5>
         <div class="mt-2 text-dark text-left" v-text="stripHtmlTags(note.ayah_notes)"></div>
        </div>
        <div class="text-muted small mt-2">{{ extractDate(note.created_at) }}</div>
        <!-- <div>
         <b>This note is: <b style="color:rgba(0, 191, 166);">{{ parseInt(note.option) === 0 ? 'public' : 'private' }}</b></b>
        </div> -->
        <hr />
        <div class="container-fluid text-center">
         <div class="row">
          <div class="col">
           <i class="bi bi-eye h4" style="color:rgb(0, 191, 166); cursor:pointer" @click="viewModal(note)"></i>
          </div>
          <!-- <div class="col">
           <i class="bi bi-pencil-square ml-3 h4" style="color:rgb(0, 191, 166); cursor:pointer" @click="editModal(note)"></i>
          </div> -->
          <div class="col">
           <i class="bi bi-x-circle h4 ml-3" style="color:rgb(0, 191, 166); cursor:pointer" @click="deleteNote(note.id)"></i>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
  
    </div>
   </div>
  
   <!-- Edit Note Modal -->
   <div class="modal fade" id="editNotes" tabindex="-1" aria-labelledby="editNotesLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-modern">
     <div class="modal-content">
      <div class="modal-header">
       <h5 class="modal-title text-dark" id="editNotesLabel"><strong>Edit Note</strong></h5>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
  
       <form @submit.prevent="updateNotes">
        <div class="row mb-3">
         <b style="margin-right: 10px;" class="pr-2 pb-2">Ayah notes:</b>
         <div style="display: flex; align-items: center;" class="pt-2">
          <textarea v-model="form.ayah_notes" class="form-control pb-2" rows="5" @input="sanitizeInput"></textarea>
         </div>
        </div>
  
        
        <!-- <div class="pt-3 pb-2" style="display: flex; align-items: center;">
         <b style="margin-right: 10px;" class="pr-2">Make your note either:</b>
         <div style="display: flex; align-items: center;">
          <div class="form-check form-check-inline" style="margin-right: 15px;">
           <input class="form-check-input" type="radio" name="option" v-model="form.option" id="public" value="0">
           <label class="form-check-label" for="public" style="margin-left: 5px;">Public</label>
          </div>
          <div class="form-check form-check-inline">
           <input class="form-check-input" type="radio" name="option" v-model="form.option" id="private" value="1">
           <label class="form-check-label" for="private" style="margin-left: 5px;">Private</label>
          </div>
         </div>
        </div> -->
       
  
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
   <div class="modal fade" id="viewNotes" tabindex="-1" aria-labelledby="viewNotesLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-modern">
     <div class="modal-content">
      <div class="modal-header">
       <h5 class="modal-title text-dark" id="viewNotesLabel"><b>View Note</b></h5>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <div class="container">
        <div class="mb-3">
         <label for="formGroupExampleInput" class="form-label"><strong>Surah Name:</strong></label>
         <p class="mt-2 text-dark text-left">
          {{ form.surah_name }}
         </p>
        </div>
        <!-- 
        <div class="mb-3">
         <label for="formGroupExampleInput" class="form-label"><strong>Ayah Verse Arabic:</strong></label>
         <p class="mt-2 text-dark text-left">
          {{ form.ayah_verse_ar }}
         </p>
        </div>
        <div class="mb-3">
         <label for="formGroupExampleInput" class="form-label"><strong>English Info:</strong></label>
         <p class="mt-2 text-dark text-left">
          {{ form.ayah_verse_en }}
         </p>
        </div> -->
        <div class="mb-3">
         <label for="formGroupExampleInput" class="form-label"><strong>Notes:</strong></label>
         <div class="mt-2 text-dark text-left" v-html="form.ayah_notes"></div>
        </div>
        <div class="mb-3">
         <label for="formGroupExampleInput" class="form-label"><strong>Date Created:</strong></label>
         <p class="mt-2 text-dark text-left">
          {{ extractDate(form.created_at) }}
         </p>
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
  import {
   QuillEditor as Editor
  } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  
  export default {
   components: {
    Editor
   },
  data() {
    return {
     notes: [],
     option: 0,
     userId: null,
     query: '',
     sortBy: 'newest',
     form: {
      surah_name: '',
      ayah_verse_ar: '',
      ayah_verse_en: '',
      ayah_notes: '',
      created_at: '',
      option: '',
     },
  
    };
   },
   mounted() {
    fetch('/api/userId')
     .then(response => {
      if (!response.ok) {
       throw new Error('Failed to fetch user ID');
      }
      return response.json();
     })
     .then(data => {
      const userId = data.userId;
      console.log('UserId:', userId);
      if (userId) {
       this.userId = userId;
       this.fetchNotes(this.userId);
      } else {
       console.error('User ID not found');
      }
     })
     .catch(error => {
      console.error('Error fetching user ID:', error);
     });
   },
   methods: {
    sanitizeInput() {
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = this.form.ayah_notes;
      this.form.ayah_notes = tempDiv.textContent || tempDiv.innerText || "";
    },
    stripHtmlTags(text) {
      return text ? text.replace(/<\/?[^>]+(>|$)/g, "") : '';
    },
    extractDate(dateTimeString) {
      if (!dateTimeString) return '';
      try {
        const d = new Date(dateTimeString);
        if (!isNaN(d.getTime())) {
          const y = d.getFullYear();
          const m = String(d.getMonth()+1).padStart(2,'0');
          const day = String(d.getDate()).padStart(2,'0');
          return `${y}-${m}-${day}`;
        }
        // Fallback to split when not parseable
        return (dateTimeString.split('T')[0] || dateTimeString).trim();
      } catch(_) { return String(dateTimeString).split('T')[0]; }
    },
    async fetchNotes(userId) {
     try {
      const response = await fetch(`/api/fetch-notes/${userId}`);
      if (!response.ok) {
       throw new Error('Network response was not ok');
      }
      this.notes = await response.json();
     } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
     }
    },
    viewModal(note) {
      this.form = {
        surah_name: note.surah_name || '',
        ayah_verse_ar: note.ayah_verse_ar || '',
        ayah_verse_en: note.ayah_verse_en || '',
        ayah_notes: note.ayah_notes || '',
        option: note.option || '',
        created_at: note.created_at || '',
        id: note.id
      };
      try {
        const modalEl = document.getElementById('viewNotes');
        if (modalEl) {
          const instance = bootstrap.Modal.getOrCreateInstance(modalEl);
          instance.show();
        }
      } catch(_) {}
    },
    truncatedHtml(html, maxLength = 150) {
     const div = document.createElement("div");
     div.innerHTML = html;
     const plainText = div.textContent || div.innerText || "";
     if (plainText.length > maxLength) {
      const truncatedText = plainText.substring(0, maxLength) + '...';
      div.innerHTML = truncatedText;
      return div.innerHTML;
     }
     return html;
    },
    updateNotes() {
     Swal.fire({
      title: "Are you sure you want to update?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update notes!",
     }).then((result) => {
      if (result.isConfirmed) {
       axios
        .post(`api/update-notes/${this.form.id}`, this.form)
        .then(() => {
         Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note updated successfully",
          showConfirmButton: false,
          timer: 1500,
         }).then(() => {
          this.fetchNotes(this.userId);
  
          // Re-initialize and close the modal properly
          const editNotesModal = bootstrap.Modal.getInstance(document.getElementById('editNotes'));
          if (editNotesModal) {
           editNotesModal.hide(); // Close the modal
          } else {
           const modalInstance = new bootstrap.Modal(document.getElementById('editNotes'));
           modalInstance.hide();
          }
         });
        })
        .catch((error) => {
         console.error(error);
        });
      }
     });
    },
    deleteNote(id) {
     Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
     }).then(result => {
      if (result.isConfirmed) {
       axios.delete(`/api/delete-notes/${id}`)
        .then(() => {
         Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note deleted successfully",
          showConfirmButton: false,
          timer: 1500,
         });
         this.fetchNotes(this.userId);
        })
        .catch((error) => {
         console.error(error);
        });
      }
     });
    },
    openEditModal(note) {
      this.form = {
        ...this.form,
        ...note,
        ayah_notes: note.ayah_notes || ''
      };
      try {
        const editEl = document.getElementById('editNotes');
        if (editEl) {
          const instance = bootstrap.Modal.getOrCreateInstance(editEl);
          instance.show();
        }
      } catch(_) {}
    },
    editModal(note) {
      // Keep a single bootstrap-5 path (no jQuery)
      this.openEditModal(note);
    },
  
   },
   computed: {
    filteredNotes(){
      const q=(this.query||'').toLowerCase();
      const list=this.notes.filter(n=>{
        const plain=this.stripHtmlTags((n.ayah_notes||'').toString()).toLowerCase();
        return !q || plain.includes(q);
      });
      return list.sort((a,b)=>{
        const da=new Date(a.created_at||0).getTime();
        const db=new Date(b.created_at||0).getTime();
        return this.sortBy==='newest'? db-da : da-db;
      });
    }
   }
  };
  </script>

<style scoped>
.page-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 0 18px}
.page-title{font-weight:700}
.count-chip{background:#f7f7f8;border:1px solid #e6e8eb;padding:6px 10px;border-radius:999px;font-weight:600;color:#0b5d4b}
.card{border:1px solid #e6e8eb !important;border-radius:12px !important;box-shadow:0 1px 2px rgba(0,0,0,.06);transition:transform .12s ease, box-shadow .12s ease}
.card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.10)}
.card .small{color:#6b7280}
.card h5{font-weight:700}
</style>
  
  <style>
  .editor {
   height: 320px;
  }
  </style>
