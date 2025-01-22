<template>
    <div class="surah-dropdown">
        <select
            class="form-control custom-dropdown card"
            aria-label="Select a Surah"
            :value="selectedSurahLocal"
            @change="handleChange"
        >
            <option value="0" disabled>Select a Surah:</option>
            <option
                v-for="(surah, index) in displayedSurahs"
                :key="index"
                :value="surah.id"
            >
                {{ formatSurahOption(surah) }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "SurahDropdown",

    props: {
        selectedSurah: {
            type: Number,
            default: null,
        },
        filteredSurah: {
            type: Array,
            default: () => [],
        },
        surat: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            selectedSurahLocal: this.selectedSurah || 0,
        };
    },

    computed: {
        displayedSurahs() {
            return this.filteredSurah.length ? this.filteredSurah : this.surat;
        },
    },

    methods: {
        handleChange(event) {
            const newValue = Number(event.target.value);
            this.selectedSurahLocal = newValue;

            // Emit both events at once
            this.$emit("update:selectedSurah", newValue);
            this.$emit("fetchAyat", newValue);
        },

        formatSurahOption(surah) {
            return `${surah.id} : ${surah.name_en} - ${surah.name_ar}`;
        },
    },
};
</script>

<style scoped>
.surah-dropdown {
    width: 100%;
}

.form-control {
    width: 100%;
    padding: 8px 12px;
    font-size: 1rem;
    line-height: 1.5;
    background-color: #fff;
    border-radius: 5px;
    border: 3px solid #00bfa6;
    transition: border-color 0.15s ease-in-out;
}

.custom-dropdown {
    appearance: auto;
    outline: none;
}

.card {
    display: flex;
    border: 3px solid #00bfa6;
    border-radius: 8px;
}

.card:focus {
    border-color: #00bfa6;
    box-shadow: 0 0 0 0.2rem rgba(0, 191, 166, 0.25);
}
</style>
