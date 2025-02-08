<template>
<div class="modal fade" id="translationNote" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true" ref="modal">
 <div class="modal-dialog modal-lg">
  <div class="modal-content">
   <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel1"><b>Notes & Reflections</b></h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
    <form @submit.prevent="createNote">
     <div class="container text-center">
      
      <div class="row">
       <div class="col">
        <input class="form-check-input" type="radio" name="inputMode" id="basicMode" value="basic" v-model="inputMode">
        <label class="form-check-label" for="basicMode">
         Basic
        </label>
       </div> 
       <div v-if="!isPremium" class="col" >
        <input class="form-check-input" type="radio" name="inputMode" id="audioMode" value="audio" v-model="inputMode">
        <label class="form-check-label" for="audioMode">
         Audio Note Recording
        </label>
       </div>
       <div v-if="!isPremium" class="col">
        <input class="form-check-input" type="radio" name="inputMode" id="editorMode" value="editor" v-model="inputMode">
        <label class="form-check-label" for="editorMode">
         Editor Keyboard
        </label>
       </div>
      </div>

     </div>

     <div class="mt-3">
      <!-- Audio Recording Mode -->
      <div v-if=" inputMode === 'audio'">
       <div class="container text-center">
        <div class="row">
         <div class="col">
          <!-- Start Button -->
          <button type="button" class="btn btn-success me-2" @click="startRecognition" :disabled="isListening">
           <i class="bi bi-play-circle"></i> Start Recording
          </button>
         </div>
         <!-- <div class="col">
          <button type="button" class="btn btn-warning me-2" @click="pauseRecognition" :disabled="!isListening">
           <i class="bi bi-pause-circle"></i> Pause Recording
          </button>
         </div> -->
         <div class="col">
          <!-- Stop Button -->
          <button type="button" class="btn btn-danger" @click="stopRecognition" :disabled="!isListening && !isPaused">
           <i class="bi bi-stop-circle"></i> Stop Recording
          </button>
         </div>
        </div>
       </div>

       <!-- Status -->
        <div class="mt-3">
          <h3 v-if="isListening" class="text-success"><b class="pt-3">Listening...</b></h3>
        </div>

       <textarea v-model="form.ayah_notes" class="form-control pb-2" rows="5" placeholder="Your speech will appear here..." :readonly="isListening"></textarea>

      </div>

      <!-- Rich Text Editor Mode -->
      <Editor v-if=" inputMode === 'editor'" v-model="form.ayah_notes" editorStyle="height: 400px" name="ayah_notes" placeholder="Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah."></Editor>

      <!-- Basic Mode -->
      <textarea v-if=" inputMode === 'basic'" v-model="form.ayah_notes" class="form-control pb-2" rows="5" placeholder="Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah."></textarea>
     </div>

     <!-- <div class="pt-3 pb-2" style="display: flex; align-items: center;">
      <b style="margin-right: 10px;" class="pr-2">Make your note either:</b>
      <div style="display: flex; align-items: center;">
       <div class="form-check form-check-inline" style="margin-right: 15px;">
        <input class="form-check-input" type="radio" name="option" v-model="option" id="public" value="0">
        <label class="form-check-label" for="public" style="margin-left: 5px;">Public</label>
       </div>
       <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="option" v-model="option" id="private" value="1">
        <label class="form-check-label" for="private" style="margin-left: 5px;">Private</label>
       </div>
      </div>
     </div> -->

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

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Editor from 'primevue/editor';
import {
 Modal
} from 'bootstrap';


export default {
 data() {
  return {
   inputMode: 'basic',
   option: 0,
   isListening: false,
   isPaused: false,
   recognition: null,
  //  isPremium:false,
   form: {
    ayah_notes: "",
    surah_name: ""
   },
   loggedIn: false,
  };
 },
 components: {
  Editor,
 },
 computed:{
  isPremium() {
  },
 },
 mounted() {
  this.initRecognition();
  this.isAuthenticated = !!localStorage.getItem('authToken');
  this.initModalReset();
 },
 onMounted() {
    tinymce.init({
      target: this.$refs.editor.$el,
      height: 400,
      plugins: ['lists', 'link'],
      toolbar: 'undo redo | bold italic | bullist numlist | link ', // added media and link to toolbar
      setup: (editor) => {
        editor.on('Change', () => {
          this.form.ayah_notes = editor.getContent(); // sync content with form
        });
      },
    });
  },
  beforeUnmount() {
    tinymce.remove(this.$refs.editor.$el); // cleanup on unmount
  },
 methods: {
  initRecognition() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      this.form.ayah_notes = transcript;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      this.isListening = false;
    };
  },
   // Start speech recognition
  startRecognition() {
    if (!this.isListening) {
      this.form.ayah_notes = '';
      this.isListening = true;
      this.recognition.start();
    }
  },
  // Stop speech recognition
  stopRecognition() {
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  },
  createNote() {
    
   const formData = {
    surah_name: this.form.surah_name,
    ayah_num: this.form.ayah_num,
    ayah_verse_ar: this.form.ayah_verse_ar,
    ayah_verse_en: this.form.ayah_verse_en,
    ayah_info: this.form.ayah_info,
    ayah_notes: this.form.ayah_notes,
    option: this.option, // Ensure the option field is sent
   };

   Swal.fire({
    title: "Are you sure?",
    text: "You want to submit this note!",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit!"
   }).then(result => {
    if (result.isConfirmed) {
     axios.post("api/submit-note", formData)
      .then(res => {
       Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your note has been submitted.",
        timer: 1500,
        showConfirmButton: false
       }).then(() => {
        this.resetNoteForm();
        this.closeModal();
       });
      })
      .catch(err => {
       console.error(err);
       Swal.fire("Error", "Login to your account to submit a note.", "error");
       this.resetNoteForm();
       this.closeModal();
      });
    }
   });
  },
  resetNoteForm() {
   this.form.ayah_notes = '';
   this.form.surah_name = '';
   this.inputMode = 'basic';
  },
  showModal() {
   const modalElement = this.$refs.modal;
   const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
   modalInstance.show();
  },
  initModalReset() {
    const modalElement = this.$refs.modal;
    modalElement.addEventListener('hidden.bs.modal', () => {
      this.resetNoteForm();
    });
  },
  closeModal() {
   const modalElement = this.$refs.modal;
   const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
   modalInstance.hide();

   // Clean up any backdrops
   const modalBackdrops = document.querySelectorAll('.modal-backdrop');
   modalBackdrops.forEach(backdrop => {
    backdrop.parentNode.removeChild(backdrop);
   });

   document.body.classList.remove('modal-open');
  }
 },
};
</script>

<style scoped>
button {
 margin: 10px;
}
</style>
