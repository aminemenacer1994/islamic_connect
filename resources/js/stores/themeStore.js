import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
    state: () => ({
        isDark: localStorage.getItem('theme') === 'dark'
    }),

    actions: {
        toggleTheme() {
            this.isDark = !this.isDark;
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
            this.applyTheme();
        },

        initTheme() {
            // Check system preference if no theme is set
            if (!localStorage.getItem('theme')) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.isDark = prefersDark;
                localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
            }
            this.applyTheme();
        },

        applyTheme() {
            document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
        }
    }
}); 