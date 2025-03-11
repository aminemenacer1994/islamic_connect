<template>
  <div class="container my-4">
    <h1 class="display-5 fw-bold text-center mb-4 mt-4">Islamic Radio Stations</h1>

    <!-- Search Bar -->
    <div class="mb-4 text-center">
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="handleSearch" 
        placeholder="Search for radio station..." 
        class="form-control w-50 mx-auto"
      />
    </div>

    <div class="row g-4">
      <div 
        v-for="station in paginatedStations" 
        :key="station.id" 
        class="col-md-4"
      >
        <div 
          class="card" 
          :class="{
            'bg-success-subtle text-success-emphasis border-success': currentAudio && currentAudio.src === station.url,
            'bg-secondary-subtle text-secondary-emphasis border-secondary-subtle': !(currentAudio && currentAudio.src === station.url)
          }"
        >
          <div class="card-body">
            <h5 class="card-title mb-3">
              <b v-html="highlightSearch(station.name)"></b>
            </h5>
            <audio 
              ref="audioPlayer" 
              :src="station.url" 
              controls 
              class="w-100 mb-2"
              style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; border-radius: 20px;"
              @play="handlePlay(station.id, $event)"
            ></audio>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center my-3">
      <button @click="previousPage" :disabled="currentPage === 1" class="btn btn-outline-secondary me-2">
        Previous
      </button>
      <span class="mx-2"><b>Page {{ currentPage }} of {{ totalPages }}</b></span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-outline-secondary ms-2">
        Next
      </button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      radioStations: [],
      currentPage: 1,
      perPage: 15, // Number of stations per page
      currentAudio: null, // To keep track of the current playing audio
      searchQuery: "", // The search query input
    };
  },
  mounted() {
    fetch('https://mp3quran.net/api/v3/radios?language=eng')
      .then(response => response.json())
      .then(data => {
        // Debug: Check data structure
        console.log('Fetched Data:', data);

        // Assuming the Imam name is in the station's name or it's available in the API response
        this.radioStations = data.radios.map(station => ({
          ...station,
          imamName: station.name.split(" - ")[0] // Adjust this if Imam name is available differently
        }));

        // Debug: Check transformed data
        console.log('Processed Stations:', this.radioStations);
      })
      .catch(error => console.error('Error fetching radio stations:', error));
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredStations.length / this.perPage);
    },
    paginatedStations() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredStations.slice(start, end);
    },
    filteredStations() {
      if (!this.searchQuery) {
        return this.radioStations;
      }
      return this.radioStations.filter(station => 
        station.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    handlePlay(stationId, event) {
      // Stop the current audio if there's any playing
      if (this.currentAudio && this.currentAudio !== event.target) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0; // Reset playback time
      }
      // Set the current playing audio
      this.currentAudio = event.target;
    },
    highlightSearch(text) {
      if (!this.searchQuery) return text; // No highlighting if search is empty

      const regex = new RegExp(`(${this.searchQuery})`, 'gi');
      return text.replace(regex, '<span style="background-color: rgb(13, 182, 145); color: white;">$1</span>');
    },
    handleSearch() {
      // Reset to first page when a search is performed
      this.currentPage = 1;
    },
  },
};
</script>


<style scoped>
.audio {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: rgba(13, 182, 145, 0.09);
}

audio::-webkit-media-controls-panel {
  background: rgba(13, 182, 145, 0);
}

.radio-description {
  font-size: 1.2rem;
  color: #555;
  margin-top: 10px;
  margin-bottom: 20px;
  line-height: 1.6;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 1rem;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.text-danger {
  color: rgb(13, 182, 145);
  font-weight: bold;
}
</style>
