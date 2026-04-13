export const PRONUNCIATION_GUIDES = [
    {
        id: "ghunnah",
        title: "Ghunnah (Nasalization)",
        tip: "Hold the nasal sound for 2 counts on Noon and Meem Mushaddad (with a shaddah).",
        icon: "bi-ear"
    },
    {
        id: "qalqalah",
        title: "Qalqalah (Echo)",
        tip: "Apply a slight echoing sound when stopping on the letters: Qaaf, Taa, Baa, Jeem, Daal.",
        icon: "bi-soundwave"
    },
    {
        id: "heavy-letters",
        title: "Heavy Letters",
        tip: "Letters like Kha, Saad, Daad, Ghayn, Qaaf should be pronounced with a full mouth.",
        icon: "bi-volume-up"
    }
];

export const pronunciationMethods = {
    showPronunciationTip(id) {
        const guide = PRONUNCIATION_GUIDES.find(g => g.id === id);
        if (guide) {
            this.showToast(guide.tip, 4000);
        }
    }
};
