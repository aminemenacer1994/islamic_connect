<template>
  <div class="row">
    
    <div class="d-flex flex-wrap justify-content-between align-items-center">
      <!-- Note Icon -->
      <div class="icon-container">
        <i class="bi bi-file-earmark-text h3" aria-expanded="false" data-bs-placement="top" title="Write a note" @click="$emit('openModal', 'tafseerNote')"></i>
      </div>

      <!-- Screenshot Icon -->
      <!-- <div class="icon-container">
        <i class="bi bi-camera text-right mr-2 h3" @click="debouncedCaptureTafseer" aria-expanded="false" data-bs-placement="top" title="Screenshot verse" :style="{ cursor: 'pointer' }"></i>
      </div> -->

      <!-- Surah Info -->
      <div class="icon-container">
        <i class="bi bi-info-circle h4 mr-2 pl-2" data-bs-toggle="modal" data-bs-target="#translationInfo" aria-expanded="false" data-bs-placement="top" title="Surah info"></i>
      </div>

      <!-- Bug Report Icon -->
      <div class="icon-container">
        <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-chat-left-text h4" aria-expanded="false" data-bs-placement="top"></i>
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
  components: {
    FolderSelectionModal,
  },
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
    debouncedCaptureTafseer: debounce(function() {
      this.captureTafseer();
    }, 500), // Adjust debounce time as necessary

    captureTafseer() {
      // Access the target translation element using the ref passed as a prop
      const targetTafseerElement = this.$parent.$refs[this.targetTafseerRef];

      if (!targetTafseerElement) {
        console.error("Invalid element provided as targetTafseerRef");
        return;
      }

      // Store the original padding of the target element
      const originalPadding = targetTafseerElement.style.padding;

      // Set the desired padding
      targetTafseerElement.style.padding = "10px"; // Adjust this value as needed

      const unwantedElements = [
        '.icon-container, .settings, .summary, .href, .mobile-only, .bar, .pitch, .rate, .container.text-center, ' +
        '.custom-icon-play, .bi-rewind-circle-fill, .bi-plus-circle-fill, .bi-dash-circle-fill, ' +
        '.bi-play-circle-fill, .bi-pause-circle-fill, .bi-stop-circle-fill, .custom-icon-decrease, .word-count'
      ];

      // Function to hide elements
      const hideElements = (selectorArray) => {
        selectorArray.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            el.style.display = 'none';
          });
        });
      };

      // Function to show elements
      const showElements = (selectorArray) => {
        selectorArray.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            el.style.display = '';
          });
        });
      };

      // Hide unwanted elements before capturing
      hideElements(unwantedElements);

      setTimeout(() => {
        html2canvas(targetTafseerElement, {
          allowTaint: true,
          useCORS: true,
        }).then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");

          // Automatically trigger download of the image
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "screenshot.png";
          link.click();

          // Show success message after download
          this.showSuccessMessage = true;

          // Hide success message after 5 seconds
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);

          // Restore visibility of unwanted elements
          showElements(unwantedElements);
        }).catch((error) => {
          console.error("Failed to capture screenshot:", error);
          // Ensure to show elements if an error occurs
          showElements(unwantedElements);
        });
      }, 200);
    },
  },
};
</script>

<style scoped>
.hide-unwanted-elements .icon-container,
.hide-unwanted-elements .href,
.hide-unwanted-elements .mobile-only,
.hide-unwanted-elements .bar {
  display: none !important;
}
</style>
