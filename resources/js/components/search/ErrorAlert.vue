<template>
  <div v-if="showError" class="alert alert-danger alert-dismissible fade show" role="alert">
    Please enter a valid ayah number.
    <button type="button" class="btn-close" @click="dismissError" aria-label="Close"></button>
  </div>
</template>

<script>
export default {
  props: {
    showError: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    dismissError() {
      this.$emit('dismiss-error');
    }
  }
};
</script>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  right: 20px;
}
.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #000;
}
</style>