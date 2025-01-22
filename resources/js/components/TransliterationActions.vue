<template>
  <div class="row">
    <div class="d-flex flex-wrap justify-content-between align-items-center">
      <!-- Note Icon -->
      <div class="icon-container">
        <i class="bi bi-file-earmark-text h3" aria-expanded="false" data-bs-placement="top" title="Write a note" @click="$emit('open-modal', 'transliterationNote')"></i>
      </div>

      <!-- Screenshot Icon -->
      <!-- <div class="icon-container">
        <i class="bi bi-camera text-right mr-2 h3" @click="captureTransliteration" aria-expanded="false" data-bs-placement="top" title="Screenshot verse" :style="{ cursor: 'pointer' }"></i>
      </div> -->

      <!-- Surah info -->
      <div class="icon-container">
        <i style="cursor:pointer" class="bi bi-info-circle h4 mr-2 pl-2" data-bs-toggle="modal" data-bs-target="#translationInfo" aria-expanded="false" data-bs-placement="top" title="Surah info"></i>
      </div>

      <!-- Bug Report Icon -->
      <div class="icon-container">
        <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-chat-left-text h4" aria-expanded="false" data-bs-placement="top"></i>
      </div>
    </div>

    <!-- Folder Selection Modal -->
    <FolderSelectionModal ref="folderSelectionModal" />
  </div>
</template>

<script defer>
import { debounce } from 'lodash';
import TransliterationNote from './translation/features/notes/TransliterationNote';
import WhatsAppShareTransliteration from './translation/features/whatsapp/WhatsAppShareTransliteration.vue';
import TwitterShareTransliteration from './translation/features/twitter/TwitterShareTransliteration.vue';
import ScreenTransliterationCapture from './translation/features/screen_capture/ScreenTransliterationCapture.vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  name: 'TransliterationActions',
  components: {
    TransliterationNote,
    WhatsAppShareTransliteration,
    TwitterShareTransliteration,
    ScreenTransliterationCapture
  },
  props: {
    transliteration: { type: String, required: true },
    isVisible: { type: Boolean, required: true },
    targetTransliterationRef: { type: String, default: 'targetTransliterationElement' }
  },
  data() {
    return {
      isSubmitting: false,
      showAlert: false,
      showErrorAlert: false
    };
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    
    hideAlertAfterDelay() {
      setTimeout(() => {
        this.showAlert = false;
        this.showErrorAlert = false;
      }, 3000); // Hide alerts after 3 seconds
    },
    captureTransliteration() {
      this._captureContent('screenshot.png', html2canvas);
    },
    downloadTransliterationPdf() {
      this._captureContent('download.pdf', (targetElement) => {
        const canvas = html2canvas(targetElement);
        return canvas.then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
          pdf.save('download.pdf');
        });
      });
    },
    // Debounced version of captureTafseer to limit repeated calls
    debouncedCaptureTransliteration: debounce(function() {
      this.captureTransliteration();
    }, 500), // Adjust debounce time as necessary

    captureTransliteration() {
      // Log the reference and element
      console.log("Target Reference:", this.targetTransliterationRef);
      console.log("Resolved Element:", this.$refs[this.targetTransliterationRef]);

      const targetTransliterationElement = this.$refs[this.targetTransliterationRef];

      if (!targetTransliterationElement) {
        console.error("Target transliteration element not found. Check if the ref exists and is rendered.");
        return;
      }
      // Proceed with screenshot logic if element is found
      targetTransliterationElement.style.padding = "5px";

      // Hide unwanted elements
      const hideElements = () => {
        document.body.classList.add("hide-unwanted-elements");
      };

      const showElements = () => {
        document.body.classList.remove("hide-unwanted-elements");
    };

    hideElements();

    setTimeout(() => {
      html2canvas(targetTransliterationElement, { scale: 2 })
        .then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "screenshot.png";
          link.click();
        })
        .catch((error) => console.error("Screenshot error:", error))
        .finally(() => {
          showElements();
          targetTransliterationElement.style.padding = "";
        });
      }, 300);
    },
  _toggleElementsVisibility(selectors, displayStyle) {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.style.display = displayStyle);
    });
  },
  showSettingsOffcanvas() {
    new bootstrap.Offcanvas(document.getElementById('offcanvasRight')).show();
  }
  },
  watch: {
    isVisible() {
      this.$emit('toggle-change');
    }
  }
};
</script>
