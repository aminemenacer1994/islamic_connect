export const GUIDED_TOUR_DATA = {
    isTourActive: false,
    currentTourStep: 0,
    hasSeenTour: (() => {
        if (typeof window === "undefined") return true;
        return localStorage.getItem("ic_surat_has_seen_tour_v1") === "true";
    })(),
    tourSteps: [
        {
            id: "welcome",
            title: "Welcome to Quran Explorer",
            content: "We've redesigned your experience to be more intuitive and focused. Let us show you around!",
            target: null, // Center of screen
            position: "center"
        },
        {
            id: "surah-selector",
            title: "Quick Navigation",
            content: "Jump to any Surah, Juz, or Page instantly. Use the search to find exactly what you're looking for.",
            target: ".quran-toolbar-surah-identity",
            position: "bottom"
        },
        {
            id: "memo-tools",
            title: "Memorisation Sidekick",
            content: "Our new memorisation tools help you master verses with advanced repetition and focus modes.",
            target: ".memorisation-toolbar-tools-strip",
            position: "bottom"
        },
        {
            id: "ayah-actions",
            title: "Verse Actions",
            content: "Bookmark ayahs, add them to playlists, or share them with friends. Every verse is at your fingertips.",
            target: ".ayah-card-footer",
            position: "top"
        },
        {
            id: "audio-player",
            title: "Immersive Audio",
            content: "Control recitation flow, repeat ranges, and change reciters from our premium player.",
            target: ".audio-player-container",
            position: "top"
        }
    ]
};

export const guidedTourMethods = {
    startGuidedTour() {
        this.isTourActive = true;
        this.currentTourStep = 0;
        document.body.classList.add("guided-tour-active");
    },
    nextTourStep() {
        if (this.currentTourStep < this.tourSteps.length - 1) {
            this.currentTourStep++;
        } else {
            this.completeTour();
        }
    },
    prevTourStep() {
        if (this.currentTourStep > 0) {
            this.currentTourStep--;
        }
    },
    completeTour() {
        this.isTourActive = false;
        this.hasSeenTour = true;
        localStorage.setItem("ic_surat_has_seen_tour_v1", "true");
        document.body.classList.remove("guided-tour-active");
    },
    skipTour() {
        this.completeTour();
    }
};
