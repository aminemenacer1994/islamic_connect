<template>
  <div class="container-fluid py-4">
    <h1 class="display-4 fw-bold text-center mb-4">Dua Collection</h1>
    <p class="text-center container lead">
      The Dua Collection presents a thoughtfully curated selection of authentic Islamic supplications (duas), carefully
      organized into meaningful categories such as forgiveness, protection, healing, gratitude, and many more. Each dua
      is sourced from reliable traditional texts to help you connect spiritually and seek guidance in various aspects of
      life.
    </p>

    <div class="container">
      <div class="row mb-4">

        <!-- Category Dropdown -->
        <div class="col-md-8">
          <div class="mb-3">
            <h4 class="fw-bold text-left pt-2 pb-2 container">Select a Category:</h4>

            <select v-model="selectedCategory" class="form-select">
              <option value="">Select a Dua Category</option>
              <option v-for="category in duaCollection" :key="category.id" :value="category.id">
                {{ category.name }} ({{ category.duas.length }} Duas)
              </option>
            </select>
          </div>
        </div>

      </div>
    </div>

    <div v-if="showCopyMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      Content copied to clipboard!
      <button type="button" class="btn-close" @click="showCopyMessage = false" aria-label="Close"></button>
    </div>

    <div class="container text-center">
      <div v-for="category in filteredDuas" :key="category.id" class="row mb-4">
        <div v-for="dua in getPaginatedDuas(category.duas)" :key="dua.id" class="col-md-6">
          <div class="card dua-card text-dark rounded-3 p-3 shadow-sm">
            <!-- Highlighted Title -->
            <div>
              <h3 class="pb-2" :style="{ fontSize: fontSize + 'px' }" v-html="highlightText(dua.title)"></h3>
            </div>

            <!-- Arabic Section with TTS Icon -->
            <div class="row align-items-center mt-3">
              <div class="col-md-2 text-center">
                <!-- TTS Icon (currently commented out) -->
                <!-- <i class="bi bi-volume-up h3 icon-hover" style="cursor:pointer" @click="speak(dua.arabic, 'ar')" data-bs-toggle="tooltip" data-bs-placement="top" title="Play Arabic"></i> -->
              </div>
              <div class="col-md-10">
                <!-- Highlighted Arabic Text -->
                <h1 :style="{ fontSize: fontSize + 'px' }" class="text-right" v-html="highlightText(dua.arabic)"></h1>
              </div>
            </div>

            <!-- Translation Section with TTS Icon -->
            <div class="row align-items-center">
              <div class="col-md-10">
                <!-- Highlighted Translation Text -->
                <h4 :style="{ fontSize: fontSize + 'px' }" class="text-left" v-html="highlightText(dua.translation)">
                </h4>
              </div>
              <div class="col-md-2 text-center">
                <!-- TTS Icon (currently commented out) -->
                <!-- <i class="bi bi-volume-up h3 icon-hover" style="cursor:pointer" @click="speak(dua.translation, 'en')" data-bs-toggle="tooltip" data-bs-placement="top" title="Play English"></i> -->
              </div>
              <!-- Reference -->
              <p :style="{ fontSize: fontSize + 'px' }" class="text-left mt-1 small-text text-secondary">-{{
                dua.reference }}</p>
            </div>

            <!-- Action Icons: Share & Copy -->
            <div class="d-flex justify-content-between align-items-center">
              <!-- Font Size Decrease -->
              <div class="text-center">
                <i class="bi bi-dash-circle icon-hover" @click="changeFontSize('decrease')" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Decrease Font Size" aria-label="Decrease Font Size" role="button"></i>
                <div class="small">Decrease</div>
              </div>

              <!-- Font Size Increase -->
              <div class="text-center">
                <i class="bi bi-plus-circle icon-hover" @click="changeFontSize('increase')" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Increase Font Size" aria-label="Increase Font Size" role="button"></i>
                <div class="small">Increase</div>
              </div>

              <!-- Share Icon -->
              <div class="text-center">
                <i @click="shareOnWhatsApp(dua)" class="bi bi-share icon-hover" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Share" aria-label="Share content" role="button"></i>
                <div class="small">Share</div>
              </div>

              <!-- Copy Icon -->
              <div class="text-center">
                <i class="bi bi-clipboard icon-hover" @click="copyContent(dua)" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="Copy Content" aria-label="Copy content" role="button"></i>
                <div class="small">Copy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      duaCollection: [],
      searchQuery: '',
      selectedCategory: "", // Track selected category
      currentPage: {},
      duasPerPage: 20, // Number of duas per page
      showCopyMessage: false,
      fontSize: 18,
    };
  },
  computed: {
    // Filter categories based on the search query and selected category
    filteredCategories() {
      const filteredByCategory = this.selectedCategory
        ? this.duaCollection.filter(category => category.id === parseInt(this.selectedCategory))
        : this.duaCollection;

      return filteredByCategory.filter(category => {
        const searchQueryLower = this.searchQuery.toLowerCase();
        return category.duas.some(dua =>
          dua.title.toLowerCase().includes(searchQueryLower) ||
          dua.arabic.toLowerCase().includes(searchQueryLower) ||
          dua.transliteration.toLowerCase().includes(searchQueryLower) ||
          dua.translation.toLowerCase().includes(searchQueryLower)
        );
      });
    },
    filteredDuas() {
      if (!this.searchQuery.trim()) {
        return this.filteredCategories; // Return all cards if searchQuery is empty
      }
      return this.filteredCategories.map(category => {
        // Filter each dua in the category by checking if the searchQuery is present in title, arabic, or translation
        const filteredDuas = category.duas.filter(dua => {
          const regex = new RegExp(this.searchQuery, 'gi');
          return regex.test(dua.title) || regex.test(dua.arabic) || regex.test(dua.translation);
        });

        // Return the category with only the filtered duas
        return { ...category, duas: filteredDuas };
      }).filter(category => category.duas.length > 0); // Remove empty categories
    }

  },
  methods: {
    highlightText(text) {
      if (!this.searchQuery.trim()) return text;  // Return original text if search is empty
      const regex = new RegExp(`(${this.searchQuery})`, 'gi');
      return text.replace(regex, '<span style="background-color: rgb(13, 182, 145); font-weight:bold; color: white;">$1</span>');  // Custom highlight with color
    },
    changeFontSize(action) {
      if (action === 'increase' && this.fontSize < 30) {
        this.fontSize += 2;  // Increase font size
      } else if (action === 'decrease' && this.fontSize > 10) {
        this.fontSize -= 2;  // Decrease font size
      }
    },
    // TTS Function for Arabic and English
    speak(text, lang) {
      if ('speechSynthesis' in window) {
        // Cancel any ongoing speech to prevent overlap
        if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-GB';
        utterance.pitch = 0.8;  // Default pitch (range: 0 - 2)
        utterance.rate = 0.8;   // Default rate (range: 0.1 - 10)

        // Handle start, error, and end events
        utterance.onstart = () => console.log("TTS started.");
        utterance.onerror = (e) => console.error("TTS error:", e);
        utterance.onend = () => console.log("TTS ended.");

        speechSynthesis.speak(utterance);
      } else {
        console.error("TTS is not supported in this browser.");
      }
    },

    copyContent(dua) {
      const text = `Dua title: ${dua.title}\n\n${dua.arabic}\n\n${dua.translation}\n\n- ${dua.reference}`;
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyMessage = true;  // Show success message
        setTimeout(() => {
          this.showCopyMessage = false; // Hide message after 3 seconds
        }, 3000);
      }).catch(err => {
        console.error("Failed to copy content: ", err);
      });
    },
    shareOnWhatsApp(dua) {
      const text = `Dua title: ${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nReference: ${dua.reference}`;
      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/?text=${encodedText}`;

      // Open the WhatsApp URL in a new tab
      window.open(url, '_blank');
    },
    // Pagination logic
    getPaginatedDuas(duas) {
      const start = (this.currentPage[duas[0].id] - 1) * this.duasPerPage;
      const end = start + this.duasPerPage;
      return duas.slice(start, end);
    },
    changePage(direction, categoryId) {
      const totalPages = this.totalPages(this.duaCollection.find(c => c.id === categoryId).duas);
      if (direction === 'next' && this.currentPage[categoryId] < totalPages) {
        this.currentPage[categoryId]++;
      } else if (direction === 'prev' && this.currentPage[categoryId] > 1) {
        this.currentPage[categoryId]--;
      }
    },
    totalPages(duas) {
      return Math.ceil(duas.length / this.duasPerPage);
    },
    resetPagination() {
      // Reset pagination when category changes
      this.duaCollection.forEach(category => {
        // Directly set currentPage for each category
        this.currentPage[category.id] = 1;
      });
    }
  },
  created() {
    fetch("/duaCollection.json")
      .then(response => response.json())
      .then(data => {
        this.duaCollection = data.categories;
        // Initialize currentPage for each category
        this.duaCollection.forEach(category => {
          this.currentPage[category.id] = 1; // No need for this.$set()
        });
      })
      .catch(error => console.error("Error loading dua collection:", error));
  }
};
</script>

<style scoped>
/* Default font size for mobile devices */
.dua-card-content {
  font-size: 18px;
  /* Increased mobile default font size */
}

/* Increase font size for tablets (768px and above) */
@media (min-width: 768px) {
  .dua-card-content {
    font-size: 22px;
    /* Increased tablet font size */
  }
}

/* Increase font size further for desktop screens (1024px and above) */
@media (min-width: 1024px) {
  .dua-card-content {
    font-size: 26px;
    /* Increased desktop font size */
  }
}

.dua-card {
  border: 2px solid rgb(13, 182, 145);
  /* Highlight border */
  background-color: rgba(13, 182, 145, 0.1);
  /* Light highlight effect */
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
  border-bottom-left-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-bottom-right-radius: 10px;
  background: rgb(13, 182, 145);
}

.dua-description {
  color: #000000;
}

.container {
  margin: auto;
}

mark {
  background-color: rgb(13, 182, 145);
  /* Your desired highlight color */
  color: white;
  /* Optional: Change text color inside the highlight */
}

.icon-hover:hover {
  color: rgb(13, 182, 145) !important;
  /* Change color on hover */
}

.card {
  border: 2px solid rgb(13, 182, 145);
  /* Highlight border */
  background-color: rgba(13, 182, 145, 0.1);
  /* Light highlight effect */
  transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
  border-bottom-left-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-bottom-right-radius: 20px;
  background: rgba(148, 208, 195, 0.179);
  padding: 10px;
  border-radius: 20%;
  border: 4px solid rgb(164, 197, 190);
  color: white;
  font-style: bolder;
}

.dua-card {
  text-align: center;
  color: black;
}

.pagination button {
  margin: 5px;
}

.pagination button:disabled {
  cursor: not-allowed;
}
</style>