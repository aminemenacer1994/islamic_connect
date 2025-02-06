<template>
  <div>
    <!-- Search Input Group -->
    <div v-if="!isPremium">

      <div class="container input-group pb-2" style="position: relative; width: 100%;">
        <input type="search" @keyup="onInput" v-model="searchTerm" placeholder="Explore the words of the Quran"
          class="form-control pb-2 mobile-only"
          style="flex: 1;box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;" />

        <!-- Suggestions Dropdown -->
        <ul v-if="suggestions.length" class="list-group suggestions"
          style="position: absolute; top: 100%; left: 0; width: 95%; z-index: 1000; max-height: 600px; overflow-y: auto;">
          <li class="list-group-item text-left list-group-item-success" v-for="(suggestion, index) in suggestions"
            :key="index" @click="selectSuggestion(suggestion)">
            {{ suggestion }}
          </li>
        </ul>


        <!-- Dropdown for Filter Selection -->
        <!-- <div class="dropdown me-2">
        <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="filters.translation" id="translationCheckbox" @change="updateSuggestions" />
                  <label class="form-check-label" for="translationCheckbox">Translation</label>
                </div>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="filters.tafseer" id="tafseerCheckbox" @change="updateSuggestions" />
                  <label class="form-check-label" for="tafseerCheckbox">Tafseer</label>
                </div>
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" v-model="filters.transliteration" id="transliterationCheckbox" @change="updateSuggestions" />
                  <label class="form-check-label" for="transliterationCheckbox">Transliteration</label>
                </div>
              </a>
            </li>
          </ul>
        </div> -->



        <!-- Voice input button -->
        <button type="button" class="btn button-36"
          @click="isListening ? stopVoiceRecognition() : startVoiceRecognition()">
          <span style="color:white"><b>Voice Search</b></span>
        </button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <!--
      <button class="btn btn-info text-white" @click="searchWord"><i class="bi bi-search h4 text-white"></i></button>
      -->
      </div>
    </div>


    <!-- show a message when recording starts -->
    <div v-if="isListening" class="listening-container d-flex align-items-center justify-content-center">
      <!-- Spinner -->
      <div class="spinner-border text-success" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
      <!-- Listening Text -->
      <span class="listening-text ms-3" style="color: black;">
        <p>Listening</p>
      </span>
    </div>
    <!-- Offcanvas for Search Results -->
    <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="offcanvasResults">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Search Results</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div ref="targetTafseerElement" class="offcanvas-body text-left">
        <!-- Display Results -->


        <div v-if="filteredResults.length && !loading">
          <div>
            <h5>Total Number of Surat: {{ totalSurahs }}</h5>
            <h5>Total Number of Ayat: {{ totalAyahs }}</h5>
          </div>
          <hr>
          <div v-for="result in filteredResults" :key="result.id" class="result-item">
            <div :id="'result-' + result.id">


              <div class="text-left pb-2">
                <h4>{{ result.ayah.surah_id }} : {{ result.ayah.ayah_id }}</h4>
              </div>
              <!--
            <div class="container pt-3 pb-3">
              <button type="button" class=" w-100 btn btn-light"><b>Go To Ayah</b></button>
            </div>
            -->
              <h3 class="text-right">{{ result.ayah.ayah_text }}</h3>
              <div>
                <h5><b>Translation: </b></h5>
                <span v-html="highlightSearch(expanded ? result.translation : result.translation)"></span>

              </div>
              <!-- <div>
              <h5 class="pt-2"><b>Tafseer: </b></h5>
              <span v-html="highlightSearch(expanded ? result.originalTafseer : result.originalTafseer)"></span>
              
            </div>
            <div>
              <h5 class="pt-2"><b>Transliteration: </b></h5>
              <span v-html="highlightSearch(expanded ? result.transliteration : result.transliteration)"></span>
            </div> -->

            </div>
            <div class="pt-2 row" style="padding:5px">
              <div class="col-md-6 pb-1">
                <button @click="shareOnWhatsApp(result)" type="button" class="container btn btn-success w-100">
                  <i @click="fastForwardSpeech" style="cursor: pointer;" aria-label="Fast forward audio"
                    class="bi bi-whatsapp ml-2 mr-2 custom-icon-play h5"></i><b>Share on WhatsApp</b>
                </button>
              </div>
              <div class="col-md-6">
                <button @click="shareOnTwitter(result)" type="button" class="container btn btn-dark w-100">
                  <i @click="fastForwardSpeech" style="cursor: pointer;" aria-label="Fast forward audio"
                    class="bi bi-twitter-x ml-2 mr-2 custom-icon-play h5"></i><b>Share on X</b>
                </button>
              </div>
              <!-- <div class="col-md-12 mt-2">
              <button @click="openModal(result)" type="button" class="btn btn-light w-100">
                <b>View Ayah Details</b>
              </button>
            </div> -->
            </div>


            <hr />
          </div>

        </div>
        <div v-else-if="!loading" class="text-center">
          <h5>No search results found.</h5>
        </div>
        <div v-if="loading" class="text-center">
          <h5>Loading...</h5>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  debounce
} from 'lodash';
import axios from 'axios';


export default {
  mounted() {
    const searchTerm = this.searchTerm.trim().toLowerCase();
    const dropdown = document.querySelector('.dropdown');
    if (this.information?.ayah?.id) {
      this.fetchTafseer(this.information.ayah.id);
    }
    if (dropdown) {
      dropdown.addEventListener('click', this.toggleDropdown);
    }
  },
  props: {
    translation: {
      type: String,
      required: true,
    },
    information: {
      type: Object,
      required: true
    },
    targetTranslationRef: {
      type: String,
      default: 'targetTranslationElement',
    },
  },

  data() {
    return {
      isPremium: true,
      data: [],
      errorMessage: '',
      selectedAyah: null,
      loading: false,
      searchTerm: '',
      suggestions: [],
      tafseer: "",
      filteredResults: [],
      expanded: false,
      showMoreLink: true,
      information: {
        translation: '', // Ensure translation is initialized
        ayah_id: null,   // Ensure ayah_id is initialized
      },
      filters: {
        translation: true, // Default filter for translation enabled
        tafseer: false, // Default filter for tafseer disabled
        transliteration: false // Default filter for transliteration disabled
      },
      isListening: false,
      recognition: null,
      timer: null,
    };
  },
  computed: {
    totalSurahs() {
      const surahIds = this.filteredResults.map(result => result.ayah.surah_id);
      return new Set(surahIds).size; // Calculate unique surahs
    },
    totalAyahs() {
      return this.filteredResults.length; // Calculate total ayahs
    }
  },

  watch: {
    // Watch for changes to `information.ayah.id`
    "information.ayah.id": {
      immediate: true, // Run on initial component mount as well
      handler(newId, oldId) {
        if (newId !== oldId) {
          this.fetchTafseer(newId); // Refetch tafseer when ayah ID changes
        }
      },
    },
  },
  props: {
    result: Object,
    information: Object,
  },
  methods: {
    methods: {
    redirectToMonthlySubscription() {
      // Replace with your Stripe Payment Link for monthly subscription
      window.location.href = "https://buy.stripe.com/dR6fZC0BWd7ubvO8wz";
    },
    redirectToYearlySubscription() {
      // Replace with your Stripe Payment Link for yearly subscription
      window.location.href = "https://buy.stripe.com/00g7t63O8d7uczS6os";
    },
    redirectToRegister() {
      location.assign("/register");
    },
    async donate() {
      if (this.amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      try {
        // Send the dynamically selected donation amount to the backend
        const response = await axios.post('/create-checkout-session', {
          amount: this.amount,
        });

        const {
          id
        } = response.data;

        // Redirect to Stripe Checkout page
        const {
          error
        } = await this.stripe.redirectToCheckout({
          sessionId: id,
        });

        if (error) {
          console.error('Error redirecting to checkout:', error.message);
        }
      } catch (error) {
        console.error('Error creating checkout session:', error.message);
      }
    },
  },
    filterResults() {
      console.log(this.searchTerm); // Log the search term
      // Example of filtering logic
      this.filteredResults = this.allResults.filter(result => {
        // Match on ayah_text, translation, or any field that might contain the search term
        return result.ayah.ayah_text.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          result.translation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          result.originalTafseer.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
    openModal(result) {
      this.selectedAyah = result; // Set the selected Ayah data
      const modalElement = document.getElementById('ayahModal');
      const modal = new bootstrap.Modal(modalElement, {
        backdrop: false, // Disable the gray overlay
      });
      modal.show(); // Show the modal
    },

    highlightSearch(text) {
      // Your implementation for highlighting search terms
      return text; // Replace this with your actual search highlighting logic
    },
    shareOnWhatsApp(result) {
      // Construct the message you want to share
      const message = `Ayah: ${result.ayah.surah_id}:${result.ayah.ayah_id}\n\n` + `${result.ayah.ayah_text}\n\n` + `Translation: ${result.translation}\n\n` + 'Visit our website : www.islamiconnect.com for more';
      // Encode the message to be used in a URL
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      // Open WhatsApp with the pre-populated message
      window.open(whatsappUrl, '_blank');
    },
    shareOnTwitter(result) {
      // Construct the message you want to share
      const message = `Ayah: ${result.ayah.surah_id}:${result.ayah.ayah_id}\n\n` +
        `${result.ayah.ayah_text}\n\n` +
        `Translation: ${result.translation}\n\n` +
        'Visit our website : www.islamiconnect.com for more'
      // `Tafseer: ${result.originalTafseer}\n\n` + 
      // `Transliteration: ${result.transliteration}`;


      // Encode the message to be used in a URL
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;

      // Open Twitter with the pre-populated message
      window.open(twitterUrl, '_blank');
    },
    totalSurahs() {
      const surahIds = this.filteredResults.map(result => result.ayah.surah_id);
      return new Set(surahIds).size; // Unique surahs
    },
    totalAyahs() {
      return this.filteredResults.length; // Total ayahs
    },
    async fetchTafseer(ayahId) {
      try {
        const tafseerResponse = await axios.get(
          `/tafseer/${ayahId}/fetch`
        );
        this.tafseer = tafseerResponse.data; // Assign the fetched data to the local state
      } catch (error) {
        console.error("Error fetching tafseer:", error);
      }
    },
    toggleExpand() {
      this.expanded = !this.expanded; // Toggle the expanded state
    },
    highlightSearch(text) {
      // Your logic for highlighting search terms
      return text; // Return the text with highlights
    },
    // Trigger suggestions based on input length
    onInput() {
      if (this.searchTerm.length > 2) {
        this.fetchSuggestions();
      } else {
        this.suggestions = [];
        this.filteredResults = [];
      }
    },
    fetchSuggestions() {
      const params = {
        query: this.searchTerm,
        filters: this.filters,
      };

      this.loading = true; // Start loading

      axios.get('/search-translations', {
        params
      })
        .then((response) => {
          this.suggestions = response.data.suggestions || []; // Fallback to empty array
          this.filteredResults = response.data.results || []; // Fallback to empty array
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
          this.suggestions = []; // Reset suggestions on error
          this.filteredResults = []; // Reset filtered results on error
        })
        .finally(() => {
          this.loading = false; // Stop loading
        });
    },

    // Select a suggestion and fetch its results
    selectSuggestion(suggestion) {
      this.searchTerm = suggestion;
      this.suggestions = [];
      this.fetchResults(suggestion); // Fetch results based on selected suggestion
      this.showOffcanvas();
    },

    // Select a search result
    selectResult(result) {
      this.searchTerm = result.content; // Update searchTerm with the result content
      this.filteredResults = []; // Clear search results
      this.suggestions = []; // Clear suggestions
      this.saveSearch(result.content); // Save the search term
    },

    // Submit search and save term if not already present
    submitSearch() {
      const query = this.searchTerm.toLowerCase();
      if (query && !this.recentSearches.includes(query)) {
        this.recentSearches.push(query);
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
      }
      this.filterSuggestions(); // Trigger suggestions based on updated searchTerm
    },

    // Start voice recognition
    startVoiceRecognition() {
      this.isListening = true;
      this.errorMessage = '';
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert('Speech Recognition is not supported in this browser. Please use Google Chrome or a compatible browser.');
        this.isListening = false;
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      //  this.recognition.lang = "ar-SA";
      this.recognition.continuous = false;

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.searchTerm = transcript;
        this.isListening = false;
        this.fetchSuggestions(); // Fetch suggestions immediately after speech input
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
      };

      this.recognition.start();
    },

    // Stop voice recognition
    stopVoiceRecognition() {
      if (this.recognition) {
        this.recognition.stop();
        this.isListening = false;
        this.searchWord();
        this.showOffcanvas();
      }
    },

    async fetchResults() {
      const response = await axios.get('/api/quran/ayat');
      this.allResults = response.data;  // Ensure all results are loaded before filtering
      this.filterResults();
    },

    fetchResults(suggestion) {
      const params = {
        query: suggestion,
        filters: this.filters,
      };

      // Use POST if you prefer sending larger payloads, otherwise keep GET
      axios.get('/search-translations', {
        params
      })
        .then((response) => {
          this.filteredResults = response.data.results || []; // Ensure fallback
          console.log('Filtered results:', this.filteredResults); // Log filtered results for debugging
        })
        .catch((error) => {
          console.error('Error fetching results:', error);
          this.filteredResults = []; // Reset filtered results on error
        });
    },

    // Highlight the search term in the text
    highlightSearch(text) {
      if (!text || !this.searchTerm) return text;
      const searchTerm = this.searchTerm.trim().toLowerCase();
      const regExp = new RegExp(`(${searchTerm})`, 'gi');
      return text.replace(regExp, '<mark>$1</mark>');
    },

    searchWord() {
      this.loading = true;

      // Get the active filters
      const activeFilters = {
        translation: this.filters.translation,
        tafseer: this.filters.tafseer,
        transliteration: this.filters.transliteration,
      };

      // Prepare the request payload
      const payload = {
        query: this.searchTerm, // Use 'query' instead of 'searchTerm'
        filters: activeFilters
      };

      // Fetch results from the backend based on selected filters and searchTerm
      axios.post('/search-translations', payload)
        .then(response => {
          this.filteredResults = response.data; // Adjust to match your response structure
          this.loading = false;
          this.showOffcanvas();
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
          this.loading = false;
        });
    },

    // Show the offcanvas component for results
    showOffcanvas() {
      // Use Bootstrap JS to programmatically open the offcanvas
      let offcanvasElement = document.getElementById('offcanvasResults');
      let offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    },

    debouncedSearch() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.filterResults();  // Filter results based on the current search term
      }, 300);  // Adjust debounce time as needed
    }
  },

};
</script>

<style scoped>
.error-message {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  font-size: 0.9em;
}

.listening-container {
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
  font-weight: 300;
  color: rgb(0, 0, 0);
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  max-width: 300px;
  margin: 0 auto;
  text-align: center;
}

.listening-icon {
  font-size: 1.3em;
  color: #000000;
}

.listening-text {
  color: #000000;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.dot-typing {
  padding-left: 10px;
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #119457;
  border-radius: 50%;
  animation: blink 1.4s infinite ease-in-out both;
}

.dot-typing:before,
.dot-typing:after {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  padding-left: 10px;
  background-color: #000000;
  border-radius: 50%;
  animation: blink 1.4s infinite ease-in-out both;
}

.dot-typing:before {
  animation-delay: 0.2s;
}

.dot-typing:after {
  animation-delay: 0.4s;
}

/* Blinking dots animation */
@keyframes blink {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

/* CSS */
.button-36 {
  background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: "Inter UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
  height: 2.4rem;
  padding: 0 1.3rem;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  transition: all .5s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-36:hover {
  box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
  transition-duration: .1s;
}

.custom-link {
  color: white;
  font-size: bold;
}

@media (max-width: 576px) {
  .mobile-only {
    display: block;
    display: flex;
    width: 100%;
  }

  .custom-offcanvas {
    background-color: #10584f;
    color: white;
  }

  .hide-on-mobile {
    display: none;
  }
}



.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 80%;
  z-index: 1000;
  max-height: 600px;
  overflow-y: auto;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.highlight {
  background-color: #3EB489;
  font-weight: bold;
}

.recent-searches {
  position: relative;
  width: 300px;
  /* Adjust the width as needed */
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.suggestions {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  width: 80%;
  max-height: 150px;
  /* Limit dropdown height */
  overflow-y: auto;
  /* Enable scrolling */
  z-index: 10;
  /* Ensure dropdown appears above other content */
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
  /* Highlight on hover */
}

.btn-primary {
  background-color: #00BFA6 !important;
  border-radius: 10px;
}

.btn-primary:focus {
  box-shadow: none;
}

.text {
  font-size: 13px;
}

.flex-row {
  border: 1px solid #F2F2F4;
  border-radius: 10px;
  margin: 0 1px 0;
}


.dropdown-menu {
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 5px;
}

.list-group-item {
  border: none;
}

.alert-container {
  position: absolute;
  /* Position it absolutely */
  top: 10px;
  /* Adjust this value to control vertical position */
  left: 10px;
  /* Adjust this value to control horizontal position */
  z-index: 1000;
  /* Ensure it appears above other content */
}

.alert {
  margin-bottom: 10px;
  /* Add some spacing between alerts */
}

.custom-offcanvas {
  background-color: #10584f;
  color: white;
  width: 40%;
}

@media (max-width: 768px) {

  /* Adjust this width as needed for your breakpoint */
  .mobile-only {
    display: flex;
    flex-direction: column !important;
    /* Show only on mobile */
  }

  .custom-offcanvas {
    background-color: #10584f;
    color: white;
    width: 100%;
  }
}

.custom-offcanvas .result-item {
  margin-bottom: 15px;
}

.pdf-content {
  /* Adjust text properties */
  font-family: Arial, sans-serif;
  /* Set a specific font */
  font-size: 14px;
  /* Set a base font size */
  line-height: 1.5;
  /* Set line height for readability */
  color: black;
  /* Set default text color to black */
  padding: 10px;
  /* Add padding for better layout */
}

.translation-text {
  color: black;
  /* Ensure translation text is visible */
  margin-top: 10px;
  /* Add spacing above the translation */
}

.suggestions-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f1f1f1;
}
</style>