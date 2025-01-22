<template>
  <div class="modal fade" id="translationInfo" tabindex="-1" aria-labelledby="surahInfoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="surahInfoModalLabel"><strong>Surah Information</strong></h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="container text-left">
            <div class="mb-3 container" v-if="information.ayah && information.ayah.surah">
              <h2 for="formGroupExampleInput" class="form-label">Surah Name (English):</h2>
              <p class="mt-2 text-dark text-left">{{ information.ayah.surah.name_en }}</p>
            </div>
            <div class="mb-3 container" v-if="information.ayah && information.ayah.surah">
              <h2 for="formGroupExampleInput" class="form-label text-left">Surah Information:</h2>
              <p class="text-left" style="font-size:8px">
                {{ information.ayah.surah.text }}
              </p>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'SurahInfoModal',
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false,
      showMoreLink: true,
      modalInstance: null
    };
  },
  mounted() {
    const modalElement = document.getElementById('translationInfo');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    truncatedText(text) {
      if (!text) return '';
      if (text.length > 400) {
        this.showMoreLink = true;
        return text.slice(0, 400) + '...';
      }
      this.showMoreLink = false;
      return text;
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    }
  }
};
</script>

<style scoped>
.modal.fade.show {
  display: block;
}
</style>
