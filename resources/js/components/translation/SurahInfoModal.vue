<template>
  <div class="modal fade show" tabindex="-1" aria-labelledby="surahInfoModalLabel" aria-hidden="true" style="display: block;" @click.self="closeModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="surahInfoModalLabel"><strong>Information</strong></h1>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form class="container text-left">
            <div class="mb-3 container" v-if="information.ayah && information.ayah.surah">
              <label for="formGroupExampleInput" class="form-label">Surah Name (English):</label>
              <p class="mt-2 text-dark text-left">{{ information.ayah.surah.name_en }}</p>
            </div>
            <div class="mb-3 container" v-if="information.ayah && information.ayah.surah">
              <label for="formGroupExampleInput" class="form-label text-left">Surah Information:</label>
              <p class="text-left">
                {{ expanded ? information.ayah.surah.text : truncatedText(information.ayah.surah.text) }}
                <template v-if="showMoreLink">
                  <a href="#" @click.prevent="toggleExpand">{{ expanded ? 'Show Less' : 'Show More' }}</a>
                </template>
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
      showMoreLink: true
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    truncatedText(text) {
      const maxLength = 300; // Define your desired max length here
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      } else {
        return text;
      }
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>
<style scoped>
.modal.fade.show {
  display: block;
}
</style>
