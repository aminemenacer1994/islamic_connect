<template>
<div>
 <h2 class="pt-4 pb-3 text-center"><strong>Notes</strong></h2>

 <!-- Container visible only on mobile screens -->
 <div class="container text-center mt-3 d-md-none">
  <div class="row pb-2 text-center">
   <div class="col">
    <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#B70D52;background:#ead1dc">
     <a href="/bookmarks" style="text-decoration:none;color:#B70D52;background:#ead1dc">Bookmarks</a>
    </span>
   </div>
   <div class="col">
    <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#0263FF;background:#c2d8fb">
     <a href="/profile" style="text-decoration:none;color:#0263FF;background:#c2d8fb">Profile</a>
    </span>
   </div>
   <div class="col">
      <span class="badge h3" style="width:100%;font-size:18px;border-radius:10px; color:#3D8F67;background:#d1f4d0">
        <a href="/home" style="text-decoration:none;color:#3D8F67;background:#d1f4d0">Home</a>
      </span>
    </div>
  </div>
 </div>

 <!-- Notes Container -->
 <div class="container">
  <h3 class="pb-3 text-center">
   <strong>You have:</strong> <b style="color:rgb(0, 191, 166)">{{ notes.length }}</b> <strong>notes</strong>

  </h3>
  <div class="row">
   <div class="col-md-4 mb-4 collage-item" v-for="note in notes" :key="note.id">
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
  <div class="modal-dialog modal-lg">
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

      
      <div class="pt-3 pb-2" style="display: flex; align-items: center;">
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
 <div class="modal fade" id="viewNotes" tabindex="-1" aria-labelledby="viewNotesLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
   <div class="modal-content">
    <div class="modal-header">
     <h5 class="modal-title text-dark" id="viewNotesLabel"><b>View Note</b></h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
     <div class="container">
      <!-- <div class="mb-3">
       <label for="formGroupExampleInput" class="form-label"><strong>Surah Name:</strong></label>
       <p class="mt-2 text-dark text-left">
        {{ form.surah_name }}
       </p>
      </div>
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
  viewModal(note) {
   // Populate the form object with the note's data
   console.log("Note Data:", note);
   this.form = {
    surah_name: note.surah_name || '',
    ayah_verse_ar: note.ayah_verse_ar || '',
    ayah_verse_en: note.ayah_verse_en || '',
    ayah_notes: note.ayah_notes || '',
    option: note.option || '',
    created_at: note.created_at || '',
   };

   // Open the modal using Bootstrap 5
  //  const viewNotesModal = new bootstrap.Modal(document.getElementById('viewNotes'));
  //  viewNotesModal.show();
  },
  extractDate(dateTimeString) {
   return dateTimeString.split('T')[0];
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
    ...note
   };
   $('#viewNotes').modal('show');
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
   this.selectedNote = note;
   this.form.ayah_notes = note.content;
   this.form.ayah_notes = this.sanitizeInput(this.form.ayah_notes);
   // Initialize the modal if not already done
   const editModal = new bootstrap.Modal(document.getElementById('editNotes'));
   editModal.show();
  },
  editModal(note) {
   this.form = {
    ...note
   }; // Make sure form is populated
   $('#editNotes').modal('show');
  },

 }
};
</script>

<style>
.editor {
 height: 320px;
}
</style>
