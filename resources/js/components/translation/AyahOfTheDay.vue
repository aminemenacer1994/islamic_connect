<template>
  <!-- Ayah of the Day Message Box -->
  <div v-if="isVisible" style="padding: 10px; border-radius: 15px;">
    <h3 class="pt-2 fw-bold container mb-2 text-dark text-left">Ayah of the Day:</h3>
    <div
      class="shadow-md"
      v-if="ayah"
      style="padding: 12px; position: relative; border-radius: 8px;">
      <!-- Close Icon -->
      
      <div class="row " style="padding: 15px;">
        <div class="col-md-6">
          <h4
            class="pt-2 text-dark fw-bold text-left"
            style="text-align: center;">
            {{ ayah.surahNumber }} : {{ ayah.ayahNumber }} - {{ ayah.surah }}
          </h4>
        </div>
      </div>

      <!-- Ayah Content -->
      <div style="padding: 5px;" class="pb-1 card-body text-dark fw-bold">
        <h4 class="arabic text-dark text-dark text-right">{{ ayah.arabic }}</h4>
      </div>
    </div>
  </div>

  
</template>

<script>
export default {
  data() {
    return {
      ayah: null, // Holds the fetched Ayah details
      isVisible: true, // Controls visibility of the Ayah box
      apiUrl: "https://api.alquran.cloud/v1/ayah", // API endpoint
      translationLang: "ar.asad", // Translation language
    };
  },
  methods: {
    // Method to close the message box
    closeMessageBox() {
      console.log("Close button clicked."); // Debugging log
      this.isVisible = false; // Hide the message box
    },
    // Method to open the message box
    openMessageBox() {
      console.log("Open button clicked."); // Debugging log
      this.isVisible = true; // Show the message box
    },
    // Method to fetch and display the Ayah of the Day
    fetchAyahOfTheDay() {
      const currentDate = new Date().toLocaleDateString(); // Current date to check if a new Ayah is needed
      const storedDate = localStorage.getItem('ayahDate'); // Retrieve the stored date from localStorage

      // Check if we have already displayed an Ayah today
      if (storedDate !== currentDate) {
        const randomAyah = Math.floor(Math.random() * 6236) + 1; // Random Ayah number
        const url = `${this.apiUrl}/${randomAyah}/${this.translationLang}`; // API URL with parameters

        console.log("Fetching new Ayah..."); // Debugging log
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Fetched Ayah Data:", data); // Log fetched data
            if (data && data.data) {
              this.ayah = {
                arabic: data.data.text || "N/A", // Arabic text of Ayah
                translation: data.data.translation?.text || "Translation not available",
                surah: data.data.surah?.englishName || "Unknown Surah",
                surahNumber: data.data.surah?.number || "N/A",
                ayahNumber: data.data.numberInSurah || "N/A",
              };
              // Store today's date in localStorage
              localStorage.setItem('ayahDate', currentDate);
              localStorage.setItem('ayahData', JSON.stringify(this.ayah)); // Store the Ayah data for today
            } else {
              throw new Error("Invalid API response structure");
            }
          })
          .catch((error) => {
            console.error("Error fetching Ayah:", error);
            this.ayah = null; // Reset Ayah data in case of an error
          });
      } else {
        // If the same date, retrieve the previously stored Ayah data
        this.ayah = JSON.parse(localStorage.getItem('ayahData'));
      }
    },
  },
  created() {
    this.fetchAyahOfTheDay(); // Fetch Ayah of the Day on component creation
  },
};
</script>

<style scoped>
/* Styles for the Ayah of the Day box */
/* .arabic {
  font-family: "Amiri", "Scheherazade", "Arial", sans-serif;
  direction: rtl;
  text-align: right;
} */

.text-center {
  text-align: center;
}

button {
  outline: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

/* Button hover effect */
button:hover {
  color: #f5f5f5;
}

@media (min-width: 768px) {
  .col-md-6 {
      flex: 0 0 auto;
      width: 100%;
  }
}
</style>

