<template>
  <h6 class="text-left mt-3"><img src="/images/art.png" class="pr-2" width="30px" alt="lamp" loading="lazy"/><strong>Translation:</strong> {{ translator }}</h6>
</template>

<script>
export default {
  name: 'Translator',
  props: {
    translator: {
      type: String,
      required: true
    }
  },
  methods: {
    // You can add methods specific to this component here if needed
  }
};
</script>

<style scoped>
/* Add specific styles for TranslationInfo component here */
.text-left {
  text-align: left;
}
.mt-3 {
  margin-top: 1rem;
}
</style>
