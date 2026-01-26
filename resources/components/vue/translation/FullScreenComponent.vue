<!-- FullScreenComponent.vue -->
<template>
  <div>
    <i 
      class="bi bi-arrows-fullscreen h4" 
      style="color: rgb(0, 191, 166); cursor: pointer;" 
      @click="toggleFullScreen" 
      title="Full screen">
    </i>
    <div ref="targetElement" class="w-100 my-element"  :class="{'full-screen': isFullScreen}">
      <button 
        v-if="isFullScreen" 
        @click="toggleFullScreen" 
        class="close-button mb-3 text-left btn btn-secondary">
        Close
      </button>
      <!-- Slot for dynamic content -->
      <div style="padding:5px"><slot ></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullScreenComponent',
  data() {
    return {
      isFullScreen: false
    };
  },
  methods: {
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    }
  }
};
</script>

<style scoped>
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 1000;
  overflow: auto;
}
</style>
