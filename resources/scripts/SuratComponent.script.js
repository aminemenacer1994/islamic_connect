// Add to the data() return object:
lastReadPosition: null,
lastReadPositionCheckInterval: null,

// ...existing code...

// Add to computed properties:
computed: {
    // ...existing computed...
    
    isCurrentPositionLastRead() {
        if (!this.lastReadPosition) return false;
        return (
            this.lastReadPosition.surahNumber === this.surahDetails?.surahNumber &&
            this.lastReadPosition.ayahNumber === this.activeAyahIndex + 1
        );
    },
},

// Add these methods:
methods: {
    // ...existing methods...

    /**
     * Save current reading position to localStorage
     */
    saveReadingPosition() {
        if (!this.surahDetails || this.activeAyahIndex === null) return;

        const position = {
            surahNumber: this.surahDetails.surahNumber,
            surahName: this.surahDetails.englishName || this.surahDetails.name,
            ayahNumber: this.activeAyahIndex + 1,
            timestamp: Date.now(),
            reciter: this.selectedReciter,
            translation: this.selectedTranslation,
        };

        try {
            localStorage.setItem('quran-last-read-position', JSON.stringify(position));
            this.lastReadPosition = position;
        } catch (e) {
            console.warn('Failed to save reading position:', e);
        }
    },

    /**
     * Load last reading position from localStorage
     */
    loadReadingPosition() {
        try {
            const saved = localStorage.getItem('quran-last-read-position');
            if (saved) {
                this.lastReadPosition = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Failed to load reading position:', e);
            this.lastReadPosition = null;
        }
    },

    /**
     * Get a preview text of the last read ayah
     */
    getLastReadPreview() {
        if (!this.lastReadPosition) return '';
        
        // Try to get the ayah text from cache or data
        const key = `${this.lastReadPosition.surahNumber}:${this.lastReadPosition.ayahNumber}`;
        
        // If we have the data in memory, show it
        if (this.surahDetails?.surahNumber === this.lastReadPosition.surahNumber) {
            const ayah = this.surahDetails.ayahs?.[this.lastReadPosition.ayahNumber - 1];
            if (ayah?.translation) {
                return this.truncateText(ayah.translation, 100);
            }
        }
        
        return 'Tap to continue where you left off...';
    },

    /**
     * Truncate text to specified length
     */
    truncateText(text, length) {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    },

    /**
     * Navigate to the last read position
     */
    async goToLastReadPosition() {
        if (!this.lastReadPosition) return;

        try {
            // Select the surah
            await this.selectSurah(String(this.lastReadPosition.surahNumber));

            // Wait for surah to load
            await this.$nextTick();

            // Scroll to the specific ayah
            const ayahCard = document.getElementById(`ayah-card-${this.lastReadPosition.ayahNumber - 1}`);
            if (ayahCard) {
                ayahCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                ayahCard.focus();
                
                // Highlight the card briefly
                ayahCard.classList.add('highlight-pulse');
                setTimeout(() => {
                    ayahCard.classList.remove('highlight-pulse');
                }, 2000);
            }

            // Select the ayah
            this.selectCard(this.lastReadPosition.ayahNumber - 1);
        } catch (error) {
            console.error('Failed to navigate to last read position:', error);
        }
    },

    /**
     * Initialize position tracking - call in mounted()
     */
    initializePositionTracking() {
        this.loadReadingPosition();

        // Update position every time activeAyahIndex changes
        this.$watch('activeAyahIndex', () => {
            this.saveReadingPosition();
        });

        // Also watch surahDetails changes
        this.$watch('surahDetails', () => {
            this.saveReadingPosition();
        });

        // Optional: Auto-save every 30 seconds as well
        this.lastReadPositionCheckInterval = setInterval(() => {
            this.saveReadingPosition();
        }, 30000);
    },

    /**
     * Clean up position tracking - call in beforeUnmount()
     */
    cleanupPositionTracking() {
        if (this.lastReadPositionCheckInterval) {
            clearInterval(this.lastReadPositionCheckInterval);
        }
    },

    // ...rest of existing methods...
},

// Add to mounted() hook:
mounted() {
    // ...existing mounted code...
    this.initializePositionTracking();
},

// Add to beforeUnmount() hook:
beforeUnmount() {
    // ...existing beforeUnmount code...
    this.cleanupPositionTracking();
},
