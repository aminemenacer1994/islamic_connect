export const LEARNING_PATHS = [
    {
        id: "short-surahs",
        title: "Short Surahs First",
        description: "Perfect for beginners. Master the shortest surahs of the Quran (Ad-Duha to An-Nas).",
        icon: "bi-lightning-charge",
        surahs: [93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114]
    },
    {
        id: "juz-amma",
        title: "Juz Amma Journey",
        description: "The classic path for students. Memorise the entire 30th Juz.",
        icon: "bi-book",
        surahs: Array.from({ length: 37 }, (_, i) => 78 + i)
    },
    {
        id: "daily-recitations",
        title: "Daily Essentials",
        description: "Surahs frequently recited for protection and blessing (Al-Mulk, Al-Waqi'ah).",
        icon: "bi-sun",
        surahs: [1, 36, 56, 67]
    },
    {
        id: "the-big-ten",
        title: "The Visionary Path",
        description: "Tackle the longest surahs to deepen your spiritual connection.",
        icon: "bi-trophy",
        surahs: [2, 3, 4, 5, 6, 7]
    }
];

export const learningPathMethods = {
    selectLearningPath(path) {
        this.activeLearningPath = path;
        // Optionally trigger a filter or a specific UI view
        this.showToast(`Path selected: ${path.title}`, 2000);
    }
};
