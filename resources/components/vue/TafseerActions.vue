<template>
  <div class="row">

    <div class="d-flex flex-wrap justify-content-between align-items-center text-center">
  <!-- Note Icon -->
  <div class="icon-container d-flex flex-column align-items-center">
    <i class="bi bi-file-earmark-text h3" aria-expanded="false" data-bs-placement="top" title="Write a note"
      @click="$emit('openModal', 'tafseerNote')"></i>
    <span class="small mt-1">Write a note</span>
  </div>

  <!-- Surah Info -->
  <div class="icon-container d-flex flex-column align-items-center">
    <i class="bi bi-info-circle h4 mr-2 pl-2" data-bs-toggle="modal" data-bs-target="#translationInfo"
      aria-expanded="false" data-bs-placement="top" title="Surah info"></i>
    <span class="small mt-1">Surah info</span>
  </div>

  <!-- Bug Report Icon -->
  <div class="icon-container d-flex flex-column align-items-center">
    <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-chat-left-text h4"
      aria-expanded="false" data-bs-placement="top"></i>
    <span class="small mt-1">Report a bug</span>
  </div>
</div>

  </div>
</template>

<script>
import { debounce } from 'lodash';
import FolderSelectionModal from './folder_manager/FolderSelectionModal.vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  name: 'TafseerActions',

  props: {
    tafseer: {
      type: String,
      required: true,
    },
    information: {
      type: Object,
      required: true,
    },
    targetTafseerRef: {
      type: String,
      default: 'targetTafseerElement',
    },
  },
  data() {
    return {
      surat: [],
      ayat: [],
      tafseers: [],
      showAlert: false, // Controls the visibility of the success message
      showErrorAlert: false,
      isSubmitting: false,
      successMessage: "", // Holds the success message text
    };
  },
  computed: {
    combinedText() {
      return `Tafseer: ${this.tafseer}`;
    }
  },
  methods: {
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000); // Hide alerts after 3 seconds
    },
    isFormDataIncomplete(formData1) {
      return !formData1.surah_name || !formData1.ayah_num || !formData1.ayah_verse_ar || !formData1.ayah_verse_en || !formData1.user_id;
    },

    // Debounced version of captureTafseer to limit repeated calls
    debouncedCaptureTafseer: debounce(function () {
      this.captureTafseer();
    }, 500), // Adjust debounce time as necessary


  },
};
</script>

<style scoped></style>
