<template>
    <button 
        class="theme-toggle" 
        @click="toggleTheme"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
        <i class="bi" :class="isDark ? 'bi-sun' : 'bi-moon'"></i>
        <span class="visually-hidden">
            {{ isDark ? 'Switch to light mode' : 'Switch to dark mode' }}
        </span>
    </button>
</template>

<script>
import { useThemeStore } from '@/stores/themeStore';

export default {
    name: 'ThemeToggle',

    data() {
        return {
            themeStore: useThemeStore()
        };
    },

    computed: {
        isDark() {
            return this.themeStore.isDark;
        }
    },

    methods: {
        toggleTheme() {
            this.themeStore.toggleTheme();
        }
    },

    mounted() {
        this.themeStore.initTheme();
    }
};
</script>

<style scoped>
.theme-toggle {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.3s;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.theme-toggle:hover {
    background-color: var(--hover-bg);
}

.theme-toggle i {
    font-size: 1.25rem;
    color: var(--text-primary);
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
</style> 