<!-- FullScreenToggle.vue -->
<template>
  <div>
    <button v-if="isFullScreen" @click="toggleFullScreen" class="close-button mb-3 text-left btn btn-secondary">Close</button>
    <i v-else class="bi bi-arrows-fullscreen h4" style="color: rgb(0, 191, 166); cursor:pointer" @click="toggleFullScreen" title="Full screen"></i>
  </div>
</template>

<script>
export default {
  name: 'FullScreenToggle',
  data() {
    return {
      isFullScreen: false
    };
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
      this.$emit('toggle', this.isFullScreen);
    }
  }
};
</script>

<style scoped>
.close-button {
  margin-bottom: 10px;
  text-align: left;
}

.bi-arrows-fullscreen {
  cursor: pointer;
}
</style>
