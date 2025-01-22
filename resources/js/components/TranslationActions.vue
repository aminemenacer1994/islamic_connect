<template>
<div class="row">
  <!-- Success Message Alert -->
  <div v-if="showAlert" class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Success!</strong> {{ successMessage }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="showAlert = false"></button>
  </div>

  <div class="d-flex flex-wrap justify-content-between align-items-center">
    <!-- Note Icon -->
    <div class="icon-container">
      <i class="bi bi-file-earmark-text h3" aria-expanded="false" data-bs-placement="top" title="Write a note" @click="handleAction('open-modal', 'translationNote')"></i>
    </div>

    <!-- Screenshot Icon -->
    <!-- <div class="icon-container">
      <i class="bi bi-camera text-right mr-2 h3" @click="captureTranslation" aria-expanded="false" data-bs-placement="top" title="Screenshot verse"></i>
    </div> -->

    <!-- Surah Info Icon -->
    <div class="icon-container">
      <i class="bi bi-info-circle h4 mr-2 pl-2" data-bs-toggle="modal" data-bs-target="#translationInfo" aria-expanded="false" data-bs-placement="top" title="Surah info" style="cursor: pointer;"></i>
    </div>

    <!-- Bug Report Icon -->
    <div class="icon-container">
      <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-chat-left-text h4" aria-expanded="false" data-bs-placement="top"></i>
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
  components: {
    FolderSelectionModal,
    ScreenTranslationCapture
  },
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

    // Debounced version of captureTranslation to limit repeated calls
    debouncedCaptureTranslation: debounce(function () {
      this.captureTranslation();
    }, 500), // Adjust debounce time as necessary

    captureTranslation() {
      const targetTranslationElement = this.$parent.$refs[this.targetTranslationRef];
      if (!targetTranslationElement) {
        console.error("Target translation element not found.");
        return;
      }

      // Save original styles and prepare for capture
      const originalPadding = targetTranslationElement.style.padding || "";
      targetTranslationElement.style.padding = "5px"; // Adjust as needed

      const applyTemporaryStyles = () => {
        document.body.classList.add("hide-unwanted-elements");
      };

      const removeTemporaryStyles = () => {
        document.body.classList.remove("hide-unwanted-elements");
      };

      applyTemporaryStyles();

      setTimeout(() => {
        html2canvas(targetTranslationElement, {
          scale: 2,
          useCORS: true,
        }).then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "screenshot.png";
          link.click();
          removeTemporaryStyles();
        }).catch((error) => {
          console.error("Failed to capture screenshot:", error);
          removeTemporaryStyles();
        });
      }, 500); // Adjust timeout for mobile rendering

      // Restore original styles
      targetTranslationElement.style.padding = originalPadding;
    },

    toggleElements(selectors, displayValue) {
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.style.display = displayValue);
      });
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
