<template>
<form class="search-form d-flex container h1" style="border-radius: 6px;" @submit.prevent="search">
 
 <input style="border: 3px solid #00bfa6" class="form-control me-2 display-3" type="search" id="search" name="search" v-model="searchTerm" placeholder="What Surah do you want to read today?" autocomplete="off" @keyup="search">
 <button v-if="showClearButton" class="btn btn-outline-secondary h2" @click="clearResults">
  Clear
 </button>
</form>
</template>

<script>
export default {
 name: 'SearchForm',
 props: {
  surat: {
   type: Array,
   required: true
  }
 },
 data() {
  return {
   searchTerm: '',
   showClearButton: false,
   filteredSurah: []
  };
 },
 methods: {
  clearResults() {
   this.searchTerm = '';
   this.filteredSurah = [];
   this.showClearButton = false;
   this.$emit('clear-results');
  },
  search() {
   const searchTerm = this.searchTerm.trim().toLowerCase();
   if (searchTerm === '') {
    this.filteredSurah = [];
    this.showClearButton = false;
    this.$emit('update-results', []);
    return;
   }
   this.filteredSurah = this.surat.filter(surah => {
    const nameEn = surah.name_en.toLowerCase();
    const nameAr = surah.name_ar.toLowerCase();
    return nameEn.includes(searchTerm) || nameAr.includes(searchTerm);
   });
   this.showClearButton = true;
   this.$emit('update-results', this.filteredSurah);
  }
 }
};
</script>
