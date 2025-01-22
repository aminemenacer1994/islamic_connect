<template>
  <div
    v-if="isVisible"
    class="magnifier"
    :style="magnifierStyle"
  ></div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    zoomLevel: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      isVisible: false,
      magnifierStyle: {
        position: 'absolute',
        width: '200px', // You can adjust this size
        height: '200px', // You can adjust this size
        border: '2px solid #000',
        borderRadius: '50%',
        pointerEvents: 'none',
        display: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${this.zoomLevel * 100}%`,
      },
    };
  },
  methods: {
    showMagnifier(event) {
      const { clientX, clientY } = event;

      this.magnifierStyle.left = `${clientX - 100}px`; // Adjust as necessary
      this.magnifierStyle.top = `${clientY - 100}px`; // Adjust as necessary
      this.isVisible = true;
    },
    hideMagnifier() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
.magnifier {
  transition: opacity 0.3s ease;
}
</style>
