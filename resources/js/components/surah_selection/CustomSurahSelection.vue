<template>
  <div
    class="scrollmenu"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <a
      href="#"
      v-for="data in customSurat"
      :key="data.id"
      @click.prevent="selectSurah(data.id)"
    >
      <div class="flex justify-content-center mr-1">
        <span class="badge button-23" :class="{ active: surah === data.id }">{{ data.name }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    customSurahs: Array,
    modelValue: Number,
  },
  data() {
    return {
      customSurat: [
        { id: 1, name: 'Al-Fatiha' },
        { id: 2, name: 'Al-Baqarah' },
        { id: 18, name: 'Al-Kahf' },
        { id: 67, name: 'Al-Mulk' },
        { id: 108, name: 'Al-Kawthar' },
        { id: 36, name: 'Ya Seen' },
        { id: 109, name: 'Al-Kafiroon' },
        { id: 112, name: 'Al-Ikhlas' },
        { id: 113, name: 'Al-Falaq' },
        { id: 114, name: 'Al-Nas' },
      ],
      touchStartX: 0,
      touchEndX: 0,
      touchStartTime: 0,
    };
  },
  computed: {
    surah() {
      return this.modelValue;
    },
  },
  methods: {
    selectSurah(surahId) {
      this.$emit('update:modelValue', surahId);
      localStorage.setItem('selectedSurah', surahId); // Save to local storage
    },
  },

};
</script>

<style scoped>
.scrollmenu {
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /* Firefox */
}

.scrollmenu::-webkit-scrollbar {
  width: 0px;
}

.scrollmenu.scrolling::-webkit-scrollbar {
  width: 8px;
}

.scrollmenu::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.scrollmenu a {
  display: inline-block;
  text-align: center;
  text-decoration: none;
}

.badge.active {
  background-color: rgba(0, 191, 166, 0.2);
  color: rgb(5, 32, 29);
  border: 1px solid rgba(0, 191, 166);
}

.badge {
  background-color: rgba(0, 191, 166);
  font-size: 1em;
  border-radius: 8px;
  padding: 8px;
}

.badge:hover {
  background: rgb(9, 94, 68);
  font-size: 1em;
  color: white;
  border-radius: 8px;
  padding: 8px;
}
</style>
