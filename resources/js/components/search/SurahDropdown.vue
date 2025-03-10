<template>
    <div class="container-fluid">
        <!-- Cards Section -->
        <div v-if="!dropdownVisible" class="row g-3">
            <div v-for="(surah, index) in displayedSurahs" :key="index" >

                <div class="row">
                    <ul class="list-group col-md-4 w-100 mb-3" >
                        <li class="list-group-item list-group-item-success active"
                            style="border: 2px solid rgb(0, 191, 166); cursor: pointer; border-radius: 5px" aria-current="true"
                            @click="handleCardClick(surah.id)">
                            <div class="text-center" style="cursor: pointer; padding: 10px;">
                                <img src="/images/art.png" style="width: 23px;" class="mb-1 mr-2" loading="lazy" />
                                {{ surah.name_en }} {{ surah.name_ar }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Dropdown Section -->
        <div v-else class="surah-dropdown">
            <select class="form-control custom-dropdown card" aria-label="Select a Surah" :value="selectedSurahLocal"
                style="border: 3px solid #31464338; border-radius: 15px;" @change="handleChange">
                <option value="0" disabled>Select a Surah:</option>
                <option v-for="(surah, index) in displayedSurahs" :key="index" :value="surah.id">
                    {{ formatSurahOption(surah) }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: "SurahCardGrid",

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
            dropdownVisible: false,
        };
    },

    computed: {
        displayedSurahs() {
            return this.filteredSurah.length
                ? this.filteredSurah
                : this.surat;
        },
    },

    methods: {
        handleCardClick(surahId) {
            this.selectedSurahLocal = surahId;
            this.dropdownVisible = true; // Show dropdown
            this.$emit("update:selectedSurah", surahId);
            this.$emit("fetchAyat", surahId);
        },
        handleChange(event) {
            const newValue = Number(event.target.value);
            this.selectedSurahLocal = newValue;
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
.border-warning {
  border-width: 3px !important;
}

.card-title {
  font-weight: bold;
}

.card-text {
  font-size: 1.2rem;
}

.custom-card {
    border: 3px solid #31464338;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.custom-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 191, 166, 0.5);
}

.card-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.card-text {
    font-size: 1rem;
    color: #555;
}

.surah-dropdown {
    width: 100%;
}

.form-control {
    width: 100%;
    padding: 8px 12px;
    font-size: 1rem;
    line-height: 1.5;
    /* background-color: #fff; */
    border-radius: 5px;
    border: 3px solid #00bfa6;
    transition: border-color 0.15s ease-in-out;
}

.custom-dropdown {
    appearance: auto;
    outline: none;
}

.card:focus {
    border-color: #00bfa6;
    box-shadow: 0 0 0 0.2rem rgba(0, 191, 166, 0.25);
}
</style>
