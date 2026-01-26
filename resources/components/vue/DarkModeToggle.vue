<template>
  <div class="dark-mode-toggle">
    <label>
      <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" />
      Dark Mode
    </label>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggle',
  inject: ['darkModeState'], // Inject the global dark mode state
  data() {
    return {
      isDarkMode: this.darkModeState.isDarkMode, // Initialize from injected state
    };
  },
  methods: {
    toggleDarkMode() {
      // Update the global dark mode state
      this.darkModeState.setDarkMode(this.isDarkMode);
    },
  },
};
</script>

<style scoped>
.dark-mode-toggle {
  margin: 10px 0;
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

input[type="checkbox"] {
  cursor: pointer;
}
</style>