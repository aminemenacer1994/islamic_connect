// src/composables/theme.js
import { ref, onMounted } from 'vue';

export function useTheme() {
  const isDarkMode = ref(false);

  // Toggle theme
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('dark', isDarkMode.value);
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  };

  // Initialize theme from localStorage or system preference
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      isDarkMode.value = true;
      document.documentElement.classList.add('dark');
    }
  });

  return {
    isDarkMode,
    toggleTheme,
  };
}