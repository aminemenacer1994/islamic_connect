<template>
    <div>
        <!-- Dropdown to select Ayah -->
        <select
            class="form-control mobile-only hide-on-full-screen hide-on-tablet right-side-form card"
            v-model="selectedAyahId"
            @change="handleAyahChange"
            style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
        >
            <option disabled value="">Select Ayah</option>
            <option
                v-for="(ayah, index) in ayat"
                :key="index"
                :value="index"
            >
                {{ ayah.ayah_text }} : {{ ayah.ayah_id }}
            </option>
        </select>

        <!-- Display highlighted Ayah information -->
        <div v-if="highlightedAyah" class="highlighted-ayah">
            <p><strong>Ayah Text:</strong> {{ highlightedAyah.ayah_text }}</p>
            <p v-if="information"><strong>Additional Information:</strong> {{ information }}</p>
            <p v-if="tafseer"><strong>Tafseer:</strong> {{ tafseer }}</p>
        </div>

        <!-- List of Ayat with highlighting for selected Ayah -->
        <div class="custom-scrollbar pb-5" style="overflow-y: auto; max-height: 600px; background: white; border-radius:10px; box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;">
            <ul class="col-md-12 list-group container-fluid root" id="toggle" ref="ayahList" style="list-style-type: none; padding: 8px">
                <li v-for="(ayah, index) in ayat" 
                    :key="index" 
                    @click="selectAyah(index)" 
                    :class="{ selected: selectedAyahId === index, highlighted: highlightedAyahId === ayah.id }"
                    style="padding: 10px; border-radius:10px"
                >
                    <h5 class="text-right" style="display: flex;"> Verse: {{ ayah.ayah_id }} </h5>
                    <h5 class="text-right">{{ ayah.ayah_text }}</h5>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        selectedSurahId: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            selectedAyahId: null, // Initially null
            ayat: [],
            tafseer: null,
            information: null,
            highlightedAyahId: null,
            highlightedAyah: null,
        };
    },
    methods: {
        handleAyahChange() {
            const selectedAyahIndex = parseInt(this.selectedAyahId);
            this.selectAyah(selectedAyahIndex);
        },
        async fetchAyat() {
            try {
                const response = await axios.get("/get_ayat", {
                    params: { surah_id: this.selectedSurahId },
                });
                this.ayat = response.data;

                // Automatically select and highlight the first Ayah if available
                if (this.ayat.length > 0) {
                    this.selectAyah(0); // Select and highlight the first Ayah
                } else {
                    this.selectedAyahId = null; // Reset if no ayat are available
                }
            } catch (error) {
                console.error("Error fetching ayat:", error);
            }
        },
        async selectAyah(index) {
            const selectedAyah = this.ayat[index];
            if (selectedAyah) {
                const ayahId = selectedAyah.id;
                this.selectedAyahId = index;  // Sync dropdown with selected ayah
                this.highlightedAyahId = ayahId;
                this.highlightedAyah = selectedAyah;

                try {
                    const tafseerResponse = await axios.get(`/tafseer/${ayahId}/fetch`);
                    this.tafseer = tafseerResponse.data;

                    const infoResponse = await axios.get("/get_informations", {
                        params: { id: ayahId },
                    });
                    this.information = infoResponse.data;

                    // Emit the information and tafseer data to the parent component
                    this.$emit("update-information", this.information);
                    this.$emit("update-tafseer", this.tafseer);
                } catch (error) {
                    console.error("Error fetching information or tafseer:", error);
                }
            }
        },
    },
    watch: {
        selectedSurahId: {
            handler(newValue) {
                if (newValue) {
                    this.selectedAyahId = null; // Reset selected ayah when surah changes
                    this.fetchAyat();
                }
            },
            immediate: true,
        },
    },
};
</script>

<style>
.highlighted-ayah {
    background-color: #f0f8ff;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 20px;
}

.selected {
    background-color: #d0f0c0; /* Light green to indicate selection */
}

.highlighted {
    background-color: #f0f8ff; /* Light blue for highlighted Ayah */
}
</style>
