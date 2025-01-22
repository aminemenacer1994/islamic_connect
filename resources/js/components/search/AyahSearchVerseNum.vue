<template>
  <form class="d-flex pb-2 card" role="search" @submit.prevent="onSubmit">
    <input 
      class="form-control me-2" 
      type="number" 
      placeholder="Enter Verse Number" 
      v-model.number="localVerseNumber" 
      required 
      min="1" 
    />
    <button class="btn btn-success mb-1 ms-2" type="submit">Search</button>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    verseNumber: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      localVerseNumber: this.verseNumber || ''  // default to empty string if verseNumber is not provided
    };
  },
  methods: {
    onSubmit() {
      if (this.localVerseNumber) {
        this.$emit('submit', this.localVerseNumber);
      } else {
        alert('Please enter a valid verse number.');
      }
    }
  },
  watch: {
    verseNumber(newValue) {
      this.localVerseNumber = newValue || '';  // Handle undefined or null values
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  border: 3px solid #00BFA6;
  border-radius: 10px;
}

button {
  margin-left: 0.5rem;  /* Adjust the button's margin for better spacing */
}

input {
  width: auto; /* Ensure input width adjusts properly */
}
</style>
