<template>
  <div class="row">
    <div class="d-flex flex-wrap justify-content-between align-items-center">
      <!-- Note Icon -->
      <div class="icon-container">
        <i class="bi bi-file-earmark-text h3" aria-expanded="false" data-bs-placement="top" title="Write a note"
          @click="$emit('open-modal', 'transliterationNote')"></i>
      </div>

      <!-- Surah info -->
      <div class="icon-container">
        <i style="cursor:pointer" class="bi bi-info-circle h4 mr-2 pl-2" data-bs-toggle="modal"
          data-bs-target="#translationInfo" aria-expanded="false" data-bs-placement="top" title="Surah info"></i>
      </div>

      <!-- Bug Report Icon -->
      <div class="icon-container">
        <i title="Report a bug" data-bs-toggle="modal" data-bs-target="#exampleModal" class="bi bi-chat-left-text h4"
          aria-expanded="false" data-bs-placement="top"></i>
      </div>
    </div>

  </div>
</template>

<script defer>
import { debounce } from 'lodash';
import TransliterationNote from './translation/features/notes/TransliterationNote';
import WhatsAppShareTransliteration from './translation/features/whatsapp/WhatsAppShareTransliteration.vue';
import TwitterShareTransliteration from './translation/features/twitter/TwitterShareTransliteration.vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  name: 'TransliterationActions',
  components: {
    TransliterationNote,
    WhatsAppShareTransliteration,
    TwitterShareTransliteration,
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
