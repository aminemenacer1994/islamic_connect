<template>
  <div class="row">
    <!-- Success Message Alert -->
    <div v-if="showAlert" class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success!</strong> {{ successMessage }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
        @click="showAlert = false"></button>
    </div>

    <div class="d-flex flex-wrap justify-content-between align-items-center text-center">
      <!-- Note Icon -->
      <div class="icon-container d-flex flex-column align-items-center">
        <i class="bi bi-file-earmark-text h3" aria-expanded="false" data-bs-placement="top" title="Write a note"
          @click="handleAction('open-modal', 'translationNote')"></i>
        <span class="mt-1">Write a note</span>
      </div>

      <!-- Surah Info Icon -->
      <div class="icon-container d-flex flex-column align-items-center">
        <i class="bi bi-info-circle h4 mr-2 pl-2" data-bs-toggle="modal" data-bs-target="#translationInfo"
          aria-expanded="false" data-bs-placement="top" title="Surah info" style="cursor: pointer;"></i>
        <span class="mt-1">Surah info</span>
      </div>

      <!-- Bug Report Icon -->
      <div class="icon-container d-flex flex-column align-items-center">
        <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-chat-left-text h4"
          aria-expanded="false" data-bs-placement="top"></i>
        <span class="mt-1">Report a bug</span>
      </div>
    </div>

  </div>
</template>

<script>
import {
  debounce
} from 'lodash';
import FolderSelectionModal from "./folder_manager/FolderSelectionModal.vue";
import ScreenTranslationCapture from './translation/features/screen_capture/ScreenTranslationCapture.vue';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

export default {
  name: "TranslationActions",

  props: {
    translation: {
      type: String,
      required: true,
    },
    information: {
      type: Object,
      required: true,
    },
    targetTranslationRef: {
      type: String,
      default: 'targetTranslationElement',
    },
  },
  data() {
    return {
      targetTranslationRef: "targetTranslation",
      showAlert: false, // Controls the visibility of the success message
      showErrorAlert: false,
      isSubmitting: false,
      successMessage: "", // Holds the success message text
    };
  },
  computed: {
    combinedText() {
      return `Translation: ${this.information.translation}`;
    }
  },
  mounted() {
    const modalElement = document.getElementById('translationInfo');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
      });
    }
  },
  methods: {
    handleAction(action, modalId) {
      this.$emit(action, modalId);
    },

    isFormDataIncomplete(formData) {
      return !formData.surah_name || !formData.ayah_num || !formData.ayah_verse_ar || !formData.ayah_verse_en || !formData.user_id;
    },
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000); // Hide alerts after 3 seconds
    },

  },
};
</script>
