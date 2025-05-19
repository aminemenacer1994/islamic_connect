<template>
  <div class="container py-4">
    <h1 class="display-5 fw-bold text-center">Islamic Radio Stations</h1>
    <p class="text-center container-fluid mb-4 lead">This page provides a seamless and user-friendly experience for listening to live Quranic radio stations from various renowned reciters around the world. Users can browse all available stations, search by reciter name, and play audio streams directly on the page. </p>
    <!-- Search Bar -->
    <div class="row justify-content-center mb-4">
      <div class="col-md-10 col-lg-8 text-center">
        <h4 class="fw-semibold mt-3 mb-3">Search for Reciter's Station</h4>
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          class="form-control rounded-pill px-4 py-2 shadow-sm"
          placeholder="Search by name..."
        />
      </div>
    </div>

    <!-- Reciters -->
    <div>
      <h4 class="fw-bold mb-4">Reciter's Radio Stations:</h4>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="station in paginatedStations" :key="station.id" class="col">
          <div
            class="card h-100 border-0 shadow-md"
            :class="{
              'bg-success-subtle text-success-emphasis border border-success': currentAudio && currentAudio.src === station.url,
              'bg-light': !(currentAudio && currentAudio.src === station.url)
            }" style="border-radius: 10px;"
          >
            <div class="card-body shadow-lg" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; background-color: rgba(13, 182, 145, 0.528); border-radius: 15px;">
              <h5 class="card-title" style="font-weight: bold;" v-html="highlightSearch(station.name)"></h5>
              <audio
                ref="audioPlayer"
                :src="station.url"
                controls
                class="w-100 mt-3"
                style="border-radius: 10px;"
                @play="handlePlay(station.id, $event)"
                @pause="handlePause"
              ></audio>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-5">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="btn btn-outline-dark rounded-pill px-4 me-3"
      >
        Previous
      </button>
      <span class="fw-semibold">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="btn btn-outline-dark rounded-pill px-4 ms-3"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 12,
      stations: [],
      filteredStations: [],
      currentAudio: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredStations.length / this.itemsPerPage);
    },
    paginatedStations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredStations.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    async fetchStations() {
      try {
        const response = await fetch("https://mp3quran.net/api/v3/radios?language=eng");
        const data = await response.json();
        this.stations = data.radios.map((radio) => ({
          id: radio.id,
          name: radio.name,
          url: radio.url,
        }));
        this.filteredStations = this.stations;
      } catch (error) {
        console.error("Failed to fetch stations:", error);
      }
    },
    handleSearch() {
      const query = this.searchQuery.toLowerCase();
      this.filteredStations = this.stations.filter((station) =>
        station.name.toLowerCase().includes(query)
      );
      this.currentPage = 1;
    },
    highlightSearch(name) {
      if (!this.searchQuery) return name;
      const regex = new RegExp(`(${this.searchQuery})`, "gi");
      return name.replace(regex, `<mark>$1</mark>`);
    },
    handlePlay(id, event) {
      const allAudios = this.$refs.audioPlayer;
      const current = event.target;

      if (Array.isArray(allAudios)) {
        allAudios.forEach((audio) => {
          if (audio !== current) audio.pause();
        });
      }

      this.currentAudio = current;
    },
    handlePause() {
      this.currentAudio = null;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  mounted() {
    this.fetchStations();
  },
};
</script>


<style scoped>

mark {
  background-color: rgba(13, 182, 145, 0.528);
  color: #fff;
  padding: 0 2px;
  border-radius: 3px;
}

audio::-webkit-media-controls-current-time-display,
audio::-webkit-media-controls-time-remaining-display {
  display: none;
}

@keyframes fadeInOut {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}

.animate-text {
  animation: fadeInOut 2s infinite;
}

.audio {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
