<template>
  <div class="modal fade" id="translationNote" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true"
    ref="modal">
    <!-- Milestone Alert for Notes -->
    <div v-if="milestoneMessage" class="alert alert-success" role="alert" style="position: fixed; top: 10px; right: 10px; z-index: 1100;">
      {{ milestoneMessage }}
    </div>
    <div class="modal-dialog modal-dialog-centered modal-lg">
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
                  <input class="form-check-input" type="radio" name="inputMode" id="basicMode" value="basic"
                    v-model="inputMode">
                  <label class="form-check-label" for="basicMode">Basic</label>
                </div>
                <div v-if="!isVisible" class="col">
                  <input class="form-check-input" type="radio" name="inputMode" id="audioMode" value="audio"
                    v-model="inputMode">
                  <label class="form-check-label" for="audioMode">Audio Note Recording</label>
                </div>
                <div v-if="!isVisible" class="col">
                  <input class="form-check-input" type="radio" name="inputMode" id="editorMode" value="editor"
                    v-model="inputMode">
                  <label class="form-check-label" for="editorMode">Editor Keyboard</label>
                </div>
              </div>
            </div>

            <!-- Basic Mode -->
            <div v-if="inputMode === 'basic'">
              <textarea v-model="form.ayah_notes" class="form-control pb-2 mt-3" rows="5"
                placeholder="Save your notes and personal reflections privately. Oftentimes your reflections can deeply resonate with your connection to the Quran, and your relationship with Allah."></textarea>
            </div>

            <!-- Audio Recording Mode -->
            <div v-if="inputMode === 'audio'">
              <div class="container text-center mt-3">
                <div class="row">
                  <div class="col">
                    <button type="button" class="btn btn-success me-2" @click="startRecognition"
                      :disabled="isListening">
                      <i class="bi bi-play-circle"></i> Start Recording
                    </button>
                  </div>
                  <div class="col">
                    <button type="button" class="btn btn-danger" @click="stopRecognition"
                      :disabled="!isListening && !isPaused">
                      <i class="bi bi-stop-circle"></i> Stop Recording
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-3">
                <h3 v-if="isListening" class="text-success"><b>Listening...</b></h3>
              </div>

              <textarea v-model="form.ayah_notes" class="form-control pb-2 mt-3" rows="5"
                placeholder="Your speech will appear here..." :readonly="isListening"></textarea>
            </div>

            <!-- Rich Text Editor Mode -->
            <div v-if="inputMode === 'editor'" class="pt-3">
              <Editor v-model="form.ayah_notes" name="ayah_notes" :placeholder="editorPlaceholder"
                editorStyle="height: 300px"></Editor>
            </div>

            <!-- <div class="pt-3 pb-2" style="display: flex; align-items: center;">
              <b style="margin-right: 10px;">Make your note either:</b>
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
import { onMounted, ref } from 'vue';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default/icons';
import 'tinymce/plugins/lists';
import { Modal } from 'bootstrap';
import { checkSubscriptionStatus, redirectToSubscription } from '../../../../../../utils/subscriptionUtils.js';
import { trackAndDetect } from '../../../../utils/milestones';


export default {
  data() {
    return {
      isVisible: false,
      isAuthenticated: false,
      editorPlaceholder: "Write your personal reflections and notes here. Let your connection to the Quran grow.",
      inputMode: 'basic',
      option: 0,
      isListening: false,
      recognition: null,
      isPaused: false,
      milestoneMessage: '',
      form: {
        ayah_notes: "",
        surah_name: ""
      }
    };
  },
  components: {
    Editor,
  },
  mounted() {
    const { success, subscriptionType } = checkSubscriptionStatus();
    if (success) {
      this.isVisible = true; // Show premium features
      if (subscriptionType) {
        this.showSuccessMessage = true; // Show success message
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
    this.initRecognition();
    this.isAuthenticated = !!localStorage.getItem('authToken');
    this.initModalReset();
  },
  methods: {
    redirectToMonthlySubscription() {
      redirectToSubscription('monthly');
    },
    redirectToYearlySubscription() {
      redirectToSubscription('yearly');
    },
    initRecognition() {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
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
    startRecognition() {
      if (!this.isListening) {
        this.form.ayah_notes = '';
        this.isListening = true;
        this.recognition.start();
      }
    },
    stopRecognition() {
      if (this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    },
    createNote() {
      const formData = {
        surah_name: this.form.surah_name,
        ayah_notes: this.form.ayah_notes,
        option: this.option,
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
                // Milestone tracking: notes created
                const hit = trackAndDetect('notes_saved', [1,5,10,25,100], 'persistent');
                if (hit && hit.threshold) {
                  if (hit.threshold === 1) {
                    this.milestoneMessage = "First note saved — reflections deepen understanding.";
                  } else {
                    this.milestoneMessage = `Beautiful progress — ${hit.threshold} notes captured. Keep reflecting.`;
                  }
                  this.hideMilestoneAfterDelay();
                }
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
    hideMilestoneAfterDelay() {
      setTimeout(() => {
        this.milestoneMessage = '';
      }, 3500);
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

      const modalBackdrops = document.querySelectorAll('.modal-backdrop');
      modalBackdrops.forEach(backdrop => {
        backdrop.parentNode.removeChild(backdrop);
      });

      document.body.classList.remove('modal-open');
    }
  },
  watch: {
    inputMode(newVal) {
      console.log("Input Mode Changed To:", newVal);
    },
    isListening(newVal) {
      console.log("Listening State Changed:", newVal);
    }
  }
};
</script>

<style scoped>
.editor-container {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}

button {
  margin: 10px;
}
</style>
