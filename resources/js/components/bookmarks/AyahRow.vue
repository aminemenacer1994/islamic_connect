<template>
  <div
    class="card ayah-row mb-3"
    draggable="true"
    @dragstart="onDragStart"
  >
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start gap-2">
        <div>
          <div class="text-muted small">{{ surahLabel }} • Ayah {{ ayah.ayah_number }}</div>
          <div class="ayah-arabic" v-html="ayah.ayah_verse_ar"></div>
          <div v-if="ayah.ayah_verse_en" class="ayah-translation">{{ ayah.ayah_verse_en }}</div>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#bookmarkModal"
          @click="emitBookmark"
        >
          <i class="bi bi-bookmark-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AyahRow',
  props: {
    ayah: {
      type: Object,
      required: true,
    },
    surahName: {
      type: String,
      default: '',
    },
    surahNumber: {
      type: [String, Number],
      default: '',
    },
    bookmarkId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    surahLabel() {
      return this.surahName || `Surah ${this.surahNumber}`;
    },
  },
  methods: {
    emitBookmark() {
      this.$emit('bookmark', this.payload());
    },
    payload() {
      return {
        bookmark_id: this.bookmarkId,
        surah_number: this.ayah.surah_number || this.surahNumber,
        surah_name: this.ayah.surah_name || this.surahName,
        ayah_number: this.ayah.ayah_number,
        ayah_verse_ar: this.ayah.ayah_verse_ar,
        ayah_verse_en: this.ayah.ayah_verse_en,
      };
    },
    onDragStart(event) {
      event.dataTransfer.setData('text/plain', JSON.stringify(this.payload()));
      event.dataTransfer.effectAllowed = 'copyMove';
    },
  },
};
</script>

<style scoped>
.ayah-row {
  border: 0;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}
.ayah-arabic {
  font-size: 1.6rem;
  direction: rtl;
  text-align: right;
  margin: 0.5rem 0 0.25rem;
}
.ayah-translation {
  color: #475569;
  line-height: 1.7;
}
</style>
