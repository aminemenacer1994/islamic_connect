<template>
    <div class="continue-reading-card-wrapper" v-if="lastRead">
        <div class="continue-reading-card" @click="navigateToSurah" role="button" tabindex="0">
            <div class="card-content">
                <div class="card-icon">
                    <i class="bi bi-book-half"></i>
                </div>
                <div class="card-details">
                    <span class="label">Continue Reading</span>
                    <h3 class="surah-name">
                        {{ lastRead.surahNameEn }}
                        <span class="surah-name-ar">{{ lastRead.surahNameAr }}</span>
                    </h3>
                    <span class="ayah-info">Ayah {{ lastRead.ayahId }}</span>
                </div>
                <div class="card-action">
                    <i class="bi bi-arrow-right-circle-fill"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { JUZ_START_MAPPING, PAGE_START_MAPPING } from "../../utils/quran-mappings";

export default {
    name: "ContinueReadingCard",
    data() {
        return {
            lastRead: null,
            userId: null
        };
    },
    mounted() {
        this.fetchUserId();
        this.loadLastRead();
        window.addEventListener("storage", this.loadLastRead);
    },
    beforeUnmount() {
        window.removeEventListener("storage", this.loadLastRead);
    },
    watch: {
        userId() {
            this.loadLastRead();
        }
    },
    methods: {
        async fetchUserId() {
             try {
                if (window.Laravel && window.Laravel.userId) {
                    this.userId = window.Laravel.userId;
                }
            } catch (e) {
                // Silent catch
            }
            this.loadLastRead();
        },
        loadLastRead() {
            const storageKey = this.userId ? `continue_reading_${this.userId}` : 'continue_reading_guest';
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try {
                    this.lastRead = JSON.parse(saved);
                } catch (e) {
                    console.error("Error parsing reading progress", e);
                }
            }
        },
        navigateToSurah() {
            if (this.lastRead) {
                window.location.href = `/surat?surah=${this.lastRead.surahId}&verse=${this.lastRead.ayahId}`;
            }
        }
    }
};
</script>

<style scoped>
.continue-reading-card-wrapper {
    padding: 0 15px;
}

.continue-reading-card {
    background: linear-gradient(135deg, #2ca4ab 0%, #208085 100%);
    border-radius: 12px;
    padding: 16px 20px;
    color: white;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 15px rgba(44, 164, 171, 0.2);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.continue-reading-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(44, 164, 171, 0.3);
}

.card-content {
    display: flex;
    align-items: center;
    width: 100%;
    z-index: 1;
}

.card-icon {
    font-size: 2rem;
    margin-right: 15px;
    opacity: 0.9;
}

.card-details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.8;
    margin-bottom: 4px;
}

.surah-name {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
}

.surah-name-ar {
    font-family: "Amiri", serif;
    font-weight: 400;
    opacity: 0.9;
}

.ayah-info {
    font-size: 0.9rem;
    opacity: 0.9;
}

.card-action {
    font-size: 1.5rem;
    opacity: 0.8;
    transition: transform 0.2s;
}

.continue-reading-card:hover .card-action {
    transform: translateX(5px);
    opacity: 1;
}

/* Mobile responsiveness matching col-md-6 behavior implicitly via flex usage in parent if needed, 
   but specific card styles here */
@media (max-width: 768px) {
    .surah-name {
        font-size: 1.1rem;
    }
}
</style>
