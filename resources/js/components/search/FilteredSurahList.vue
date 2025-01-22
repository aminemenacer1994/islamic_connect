<template>
  <div v-if="filteredSurah.length">
    <ul class="col-md-12 mt-1 scrollable-list" style="list-style-type: none; overflow-y: auto; max-height: 400px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
      <li v-for="surah in filteredSurah" :key="surah.id" @click="selectSurah(surah)" style="cursor: pointer; padding:5px;  border-radius:5px;" class="highlight-on-hover">
        <div style="display: flex; align-items: center;">
          <img src="/images/art.png" style="width: 23px" class="mb-1 mr-2" loading="lazy"/>
          <p style="font-size: 18px;" class="mt-2">{{ surah.name_en }} - {{ surah.name_ar }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilteredSurahList',
  props: {
    filteredSurah: Array
  },
  methods: {
    selectSurah(surah) {
      this.$emit('select-surah', surah);
    }
  }
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
