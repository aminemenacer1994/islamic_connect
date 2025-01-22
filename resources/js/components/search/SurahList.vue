<!-- SurahList.vue -->
<template>
  <div>
    <ul class="col-md-12 mt-1 scrollable-list" style="list-style-type: none; overflow-y: auto; max-height: 400px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
      <li v-for="item in filteredSurah" :key="item.id" @click="selectSurah(item.id)" style="cursor: pointer; padding: 5px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; border-radius: 5px;" class="highlight-on-hover">
        <div style="display: flex; align-items: center;">
          <img src="/images/art.png" style="width: 23px;" class="mb-1 mr-2" loading="lazy"/>
          <p style="font-size: 18px;" class="mt-2">{{ item.name_en }} - {{ item.name_ar }}</p>
        </div>
      </li>
    </ul>
    <div v-if="selectedSurah">
      <h2>Selected Surah: {{ selectedSurah.name_en }}</h2>
      <p>Ayahs:</p>
      <ul>
        <li v-for="ayah in ayahs" :key="ayah.id">{{ ayah.text }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurahList',
  props: {
    surah: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filteredSurah: this.surah,
      selectedSurah: null,
      ayahs: []
    };
  },
  methods: {
    selectSurah(surahId) {
      this.selectedSurah = this.surah.find(surah => surah.id === surahId);
      this.getAyat(surahId);
    },
    getAyat(surahId) {
      // Placeholder logic to fetch Ayahs for a selected Surah
      // Replace with actual logic for fetching Ayahs
      this.ayahs = [
        
        // Add more Ayahs as needed
      ];
    }
  }
};
</script>

<style scoped>
/* Media query for mobile screens */
@media screen and (max-width: 768px) {
 #movingDiv {
  /* Adjust positioning for smaller screens */
  /* For example, center the div horizontally */
  transform: translateX(-50%);
  /* You can adjust other styles as needed for mobile */
 }

 /* Initially visible */
 .targetDiv {
  display: block;
 }

 /* Hide when the corresponding anchor link is targeted */
 .targetDiv:target {
  display: none;
 }

 .scrollable-list {
  overflow-x: hidden;
 }
}
.highlight-on-hover:hover {
  background-color: #f0f0f0;
}
</style>