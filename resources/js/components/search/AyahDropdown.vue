<template>
  <!-- Ayah Dropdown -->
  <select
    class="form-control right-side-form card"
    v-model="selectedAyahId"
    @change="handleAyahChange"
    :disabled="isLoading"
    :class="{ 
      'desktop-hidden': true,
      'mobile-visible': true
    }"
  >
    <option value="">Select Ayah</option>
    <option
      v-for="ayah in ayat"
      :key="ayah.id"
      :value="ayah.id"
    >
      {{ formatAyahOption(ayah) }}
    </option>
  </select>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";

export default {
  name: "AyahDropdown",

  props: {
    selectedSurahId: {
      type: Number,
      required: true,
    },
    dropdownHidden: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      selectedAyahId: "",
      ayat: [],
      isLoading: false,
      cachedData: {},
    };
  },

  methods: {
    formatAyahOption(ayah) {
      return `${ayah.ayah_text} : ${ayah.ayah_id}`;
    },

    async handleAyahChange() {
      if (!this.selectedAyahId) return;

      if (this.cachedData[this.selectedAyahId]) {
        this.emitCachedData(this.selectedAyahId);
        return;
      }

      await this.fetchAndEmitAyahData();
    },

    emitCachedData(ayahId) {
      const { tafseer, information } = this.cachedData[ayahId];
      this.$emit("update-tafseer", tafseer);
      this.$emit("update-information", information);
    },

    async fetchAndEmitAyahData() {
      this.isLoading = true;
      try {
        const [tafseer, information] = await Promise.all([
          this.fetchTafseer(),
          this.fetchInformation()
        ]);

        // Cache the new data
        this.cachedData[this.selectedAyahId] = { tafseer, information };

        // Emit the data
        this.$emit("update-tafseer", tafseer);
        this.$emit("update-information", information);
      } catch (error) {
        console.error("Error fetching Ayah data:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchTafseer() {
      const response = await axios.get(`/tafseer/${this.selectedAyahId}/fetch`);
      return response.data;
    },

    async fetchInformation() {
      const response = await axios.get("/get_informations", {
        params: { id: this.selectedAyahId }
      });
      return response.data;
    },

    fetchAyat: debounce(async function() {
      if (!this.selectedSurahId) return;
      
      this.isLoading = true;
      try {
        const response = await axios.get("/get_ayat", {
          params: { surah_id: this.selectedSurahId }
        });

        this.ayat = response.data;

        if (this.ayat.length > 0) {
          this.selectedAyahId = this.ayat[0].id;
          await this.handleAyahChange();
        }
      } catch (error) {
        console.error("Error fetching Ayat:", error);
      } finally {
        this.isLoading = false;
      }
    }, 300),
  },

  watch: {
    selectedSurahId: {
      immediate: true,
      handler(newSurahId) {
        this.ayat = [];
        this.fetchAyat();
      },
    },
  },
};
</script>

<style scoped>
.form-control {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.desktop-hidden {
  display: none;
}

@media (max-width: 767px) {
  .mobile-visible {
    display: block;
  }
}

.highlighted-ayah {
  background-color: #26c789;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 20px;
}
</style>
