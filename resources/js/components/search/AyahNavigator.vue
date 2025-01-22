<template>
  <div class="icon-container pb-2">
    <i class="bi bi-chevron-bar-left h5" style="color: rgb(0, 191, 166); cursor: pointer;" @click="goToFirstAyah" title="First verse"></i>
    <i class="bi bi-arrow-left-circle h5" style="color: rgb(0, 191, 166); cursor: pointer;" @click="goToPreviousAyah" title="Previous verse"></i>
    <i class="bi bi-arrow-right-circle h5" style="color: rgb(0, 191, 166); cursor: pointer;" @click="goToNextAyah" title="Next verse"></i>
    <i class="bi bi-chevron-bar-right h5" style="color: rgb(0, 191, 166); cursor: pointer;" @click="goToLastAyah" title="Last verse"></i>
  </div>
</template>

<script>
export default {
  props: {
    ayat: Array,
    selectedIndexAyah: Number
  },
  methods: {
    goToFirstAyah() {
      this.selectAyah(0);
    },
    goToPreviousAyah() {
      if (this.selectedIndexAyah > 0) {
        this.selectAyah(this.selectedIndexAyah - 1);
      } else {
        this.selectAyah(this.ayat.length - 1);
      }
    },
    goToNextAyah() {
      if (this.selectedIndexAyah < this.ayat.length - 1) {
        this.selectAyah(this.selectedIndexAyah + 1);
      } else {
        this.selectAyah(0);
      }
    },
    goToLastAyah() {
      this.selectAyah(this.ayat.length - 1);
    },
    selectAyah(index) {
      console.log('Selected ayah index:', index);
      console.log('Ayat array:', this.ayat);

      if (this.ayat && this.ayat[index]) {
        this.$emit('ayah-selected', index); // Emit the index to the parent
        this.scrollToSelectedAyah();
        this.getTafseers(this.ayat[index].id, index);
      } else {
        console.error('Invalid ayah index or ayat array:', index, this.ayat);
      }
    },
    scrollToSelectedAyah() {
      // Add logic to scroll to the selected ayah
      console.log('Scrolling to ayah index:', this.selectedIndexAyah);
    },
    getTafseers(id, index) {
      // Add logic to fetch tafseer for the selected ayah
      console.log('Fetching tafseer for ayah id:', id);
    }
  }
};
</script>

<style scoped>
.icon-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-container i {
  cursor: pointer;
  color: rgb(0, 191, 166);
}

.icon-container i:hover {
  color: rgb(0, 171, 146);
}
</style>
