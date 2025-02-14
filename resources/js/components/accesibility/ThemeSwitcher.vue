<template>
  <div class="theme-switcher">
    <label for="theme-select">Choose a theme:</label>
    <select id="theme-select" v-model="selectedTheme" @change="onThemeChange">
      <option value="default">Default</option>
      <option value="dyslexia-friendly">Dyslexia Friendly</option>
      <option value="color-blind-friendly">Color Blind Friendly</option>
      <option value="epilepsy-friendly">Epilepsy Friendly</option>
      <option value="dysphoria-friendly">Dysphoria Friendly</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTheme: 'default',
    };
  },
  methods: {
    onThemeChange() {
      // Emit the selected theme to the parent component
      this.$emit('theme-change', this.selectedTheme);
    },
  },
};
</script>

<style scoped>
.theme-switcher {
  margin: 20px;
}
</style>