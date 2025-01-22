<!-- NoteModal.vue -->
<template>
<div class="modal fade" id="translationNote" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true" ref="exampleModal1">
 <div class="modal-dialog modal-lg">
  <div class="modal-content">
   <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel1">Write a Note</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
    <!-- Note Form -->
    <form @submit.prevent="createNote">
     <div class="row container mt-3">
      <h5 class="text-left pb-2 font-weight-bold">Notes & Reflections</h5>
      <div class="col">
       <textarea v-model="form1.ayah_notes" class="form-control container mb-3" name="ayah_notes" placeholder="Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah." rows="8"></textarea>
      </div>
     </div>
     <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-success">Submit</button>
     </div>
    </form>
   </div>
  </div>
 </div>
</div>
</template>

<script defer>
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap';

export default {
 name: 'NotesTranslationModal',
 props: {
  information: {
   type: Object,
   required: true
  }
 },
 data() {
  return {
   form1: {
    ayah_notes: ''
   }
  };
 },
 methods: {
  handleNoteClick() {
   if (this.isLoggedIn) {
    this.showAlertTextNote = false;
    this.$refs.noteModal.openNoteModal();
   } else {
    this.showAlertTextNote = true;
   }
  },
  createNote() {
   const formData = {
    surah_name: this.information.ayah.surah.name_en,
    ayah_num: this.information.ayah_id,
    ayah_verse_ar: this.information.ayah.ayah_text,
    ayah_verse_en: this.information.translation,
    ayah_notes: this.form1.ayah_notes
   };

   Swal.fire({
    title: "Are you sure?",
    text: "You want to submit note!",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit!"
   }).then(result => {
    if (result.isConfirmed) {
     axios.post("/api/submit-note", formData)
      .then(res => {
       if (res.data.success) {
        Swal.fire({
         icon: "success",
         title: "Success!",
         text: "Your note has been submitted.",
         timer: 1500,
         showConfirmButton: false
        }).then(() => {
         this.hideNoteModal();
         this.resetNoteForm();
        });
       } else {
        Swal.fire({
         icon: "error",
         title: "Error!",
         text: "Failed to submit note. Please try again.",
         timer: 1500,
         showConfirmButton: false
        }).then(() => {
         this.hideNoteModal();
         this.resetNoteForm();
        });
       }
      })
      .catch(err => {
       console.error(err);
       Swal.fire("Error!", "Failed to submit note. Please try again.", "error");
      });
    }
   });
  },
  resetNoteForm() {
   this.form1.ayah_notes = '';
  },
  hideNoteModal() {
   const modalElement = this.$refs.exampleModal1;
   const modalInstance = new bootstrap.Modal(modalElement);
   modalInstance.hide();

   // Ensure modal-open class is removed from body
   document.body.classList.remove('modal-open');

   // Remove any existing modal backdrops
   const modalBackdrops = document.querySelectorAll('.modal-backdrop');
   modalBackdrops.forEach(backdrop => {
    backdrop.parentNode.removeChild(backdrop);
   });
  },
  openNoteModal() {
   $('#exampleModal1').modal('show');
  },
  openNoteModal() {
   const modalElement = this.$refs.exampleModal1;
   const modalInstance = new bootstrap.Modal(modalElement);
   modalInstance.show();
  }
 }
};
</script>

<style scoped>
.container {
 padding: 10px;
}
</style>
