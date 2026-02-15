// Run this in the browser console on the /surat page to test the card visibility

// 1. Set dummy data for guest
localStorage.setItem('continue_reading_guest', JSON.stringify({
    surahId: 1,
    ayahId: 1,
    surahNameEn: "Al-Fatiha",
    surahNameAr: "الفاتحة",
    timestamp: Date.now()
}));

// 2. Dispatch storage event to trigger reactivity if listeners are active
window.dispatchEvent(new Event('storage'));

console.log("Dummy reading progress set. Please refresh the page if the card does not appear immediately.");
