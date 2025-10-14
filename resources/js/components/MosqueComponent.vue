<template>
  <div class="container-fluid py-4" role="main" aria-labelledby="mosque-finder-heading">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 id="mosque-finder-heading" class="display-4 fw-bold text-center">Mosque Locater</h1>
        <p class="text-center container mb-4 lead">
          Easily find nearby mosques based on your current location, complete with detailed directions to help you
          connect with your local community.
        </p>

        <div class="shadow" style="border-radius: 12px; padding: 10px; ">
          <!-- Search Section -->
          <div class="card-body container-fluid" style="padding: 5px;">
            <div class="row mb-4 justify-content-center">
              <div>
                <!-- Inline Search Bar with Label, Input, and Button -->
                <form class="d-flex align-items-center mb-3" role="search" aria-label="Search for mosques by city" @submit.prevent="searchMosques"
                  style="gap: 0.5rem;">
                  <label for="mosque-search-input" class="card-title pr-2 fw-bold" style="font-size: 20px;">Search location:</label>
                  <input id="mosque-search-input" type="search" class="form-control" placeholder="Enter city or country..."
                    aria-label="Search city or country" v-model="searchQuery" @input="handleTyping" autocomplete="off"
                    style="max-width: 300px;" />
                  <button class="btn  align-items-center justify-content-center "
                    style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px"
                    type="submit" :disabled="loading">
                    <span v-if="!loading">Search</span>
                    <span v-else class="spinner-border spinner-border-sm"></span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Loading State -->

            <div v-if="loading" class="text-center py-5" aria-live="polite" aria-busy="true">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status" aria-label="Loading results">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for mosques in {{ searchQuery }}...</p>
            </div>

            <!-- Results -->
            <div v-if="!loading">
              <div v-if="!searchQuery || !searchSubmitted && mosques.length === 0" class="text-center py-5">
                <i class="bi bi-compass display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for mosques worldwide</h3>
                <p class="text-muted">Enter a city or town name to begin</p>
              </div>

              <!-- No Results State -->
              <div v-else-if="searchSubmitted && searchQuery && mosques.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No mosques found</h3>
                <p class="text-muted">Try adjusting your search or increasing the radius.</p>

              </div>

              <!-- Results Grid -->
              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
                   role="list"
                   aria-label="Search results">
                <div class="col" v-for="(mosque, index) in mosques" :key="mosque.id">
                  <div class="card" role="article"
                       :aria-label="`${mosque.name}, ${mosque.address}`"
                       tabindex="0"
                       @keydown="handleCardKeydown(index, $event)">
                    <div style="padding: 15px 15px 0 15px;" class="text-center">
                      <h1 class="card-title fw-bold text-dark text-center mb-3" style="font-size: 25px;">{{ mosque.name }}</h1>
                    </div>
                    <div class="card-body pt-0">
                      <div class="mb-2">
                        <div class="d-flex align-items-start">
                          <i class="bi bi-geo-alt-fill me-2 flex-shrink-0"></i>
                          <span class="text-truncate"
                            style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            {{ mosque.address }}
                          </span>
                        </div>
                      </div>

                      <div class="mb-2">
                        <p class="text-muted mb-0">
                          <i class="bi bi-geo me-2"></i>
                          <small>{{ mosque.lat.toFixed(4) }}, {{ mosque.lon.toFixed(4) }}</small>
                        </p>
                      </div>

                      <div class="mb-2 d-flex align-items-center">
                        <span class="text-warning me-2">
                          <i class="bi bi-star-fill" v-for="n in mosque.rating" :key="'star-' + n"></i>
                          <i class="bi bi-star" v-for="n in (5 - mosque.rating)" :key="'empty-' + n"></i>
                        </span>
                        <h6 class="mb-0">Capacity: {{ mosque.capacity.toLocaleString() }}</h6>
                      </div>

                      <div class="mb-2 facilities">
                        <div class="d-flex flex-wrap align-items-center" style="gap: 0.4rem;">
                          <span class="badge rounded-pill d-flex align-items-center"
                            v-for="facility in mosque.facilities" :key="facility"
                            :class="getFacilityBadgeClass(facility)" style="padding: 0.5em 0.8em;">
                            {{ facility }}
                          </span>
                        </div>
                      </div>

                      <div v-if="mosque.tags?.opening_hours" class="opening-hours mb-2 mt-2">
                        <small class="text-muted">
                          <strong>Opening Times:</strong> {{ mosque.tags.opening_hours }}
                        </small>
                      </div>

                      <div class="d-flex justify-content-between align-items-center gap-2">
                        <!-- Get Directions Button -->
                        <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                          @click="openGoogleMaps(mosque.lat, mosque.lon)"
                          style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px"
                          :aria-label="`Get directions to ${mosque.name}`">
                          <i class="bi bi-geo-alt me-2"></i>
                          <b>Get Direction</b>
                        </button>

                        <!-- WhatsApp Share Button -->
                        <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                          @click="shareViaWhatsApp(mosque)"
                          style="background: #1881b9; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px"
                          :aria-label="`Share ${mosque.name} details via WhatsApp`">
                          <i class="bi bi-whatsapp me-2"></i>
                          <b>Share Details</b>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!loading && mosques.length > 0" class="d-flex justify-content-between align-items-center"
            style="padding: 10px;">
            <small class="text-muted" aria-live="polite">
              Showing {{ mosques.length }} mosques
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MosqueFinder",
  data() {
    return {
      searchQuery: "",
      radius: "5000", // Default 5km radius
      mosques: [],
      loading: false,
      lastSearchLocation: null,
      focusedIndex: -1
    };
  },
  computed: {
    hasResults() {
      return this.mosques.length > 0;
    },
    attributionText() {
      return `Data © ${new Date().getFullYear()} OpenStreetMap contributors`;
    }
  },
  methods: {
    handleCardKeydown(index, event) {
      const key = event.key;
      const last = this.mosques.length - 1;
      if (key === 'ArrowDown' || key === 'ArrowRight') {
        event.preventDefault();
        const next = Math.min(last, index + 1);
        this.focusedIndex = next;
        this.$nextTick(() => {
          const cards = event.currentTarget.parentElement.parentElement.querySelectorAll('.card');
          cards[next]?.focus();
        });
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        event.preventDefault();
        const prev = Math.max(0, index - 1);
        this.focusedIndex = prev;
        this.$nextTick(() => {
          const cards = event.currentTarget.parentElement.parentElement.querySelectorAll('.card');
          cards[prev]?.focus();
        });
      } else if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        const actionable = event.currentTarget.querySelector('button, a[href]:not(.disabled)');
        actionable?.click();
      }
    },
    handleTyping() {
      this.error = ""; // Clear error on typing
    },
    shareViaWhatsApp(mosque) {
      // Format the mosque details
      const message = `Mosque name: *${mosque.name}*\n\n` +
        `Address: ${mosque.address}\n` +
        `Lat & Long: ${mosque.lat.toFixed(4)}, ${mosque.lon.toFixed(4)}\n` +
        `Rating: ${'★'.repeat(mosque.rating)}${'☆'.repeat(5 - mosque.rating)}\n` +
        `Capacity: ${mosque.capacity.toLocaleString()}\n\n` +
        (mosque.tags?.opening_hours ? `Opening Hours: ${mosque.tags.opening_hours}\n\n` : '') +
        `Google Maps: https://www.google.com/maps?q=${mosque.lat},${mosque.lon}`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message);

      // Open WhatsApp with the message
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    },
    openGoogleMaps(lat, lon) {
      window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank', 'noopener,noreferrer');
    },

    async searchMosques() {
      if (!this.searchQuery.trim()) return;

      this.loading = true;
      this.mosques = [];
      this.lastSearchLocation = this.searchQuery;

      try {
        const coords = await this.geocodeLocation(this.searchQuery);
        if (!coords) return;

        const mosques = await this.fetchMosquesFromOverpass(
          coords.lat,
          coords.lon,
          parseInt(this.radius)
        );

        // Filter out mosques with "unnamed" or "prayer room" in their name
        const filteredMosques = mosques.filter(mosque => {
          const name = (mosque.tags?.name || '').toLowerCase();
          return !name.includes('unnamed') &&
            !name.includes('prayer room') &&
            !name.includes('musallah') &&  // common alternative for prayer room
            !name.includes('salaah') &&   // common misspelling
            name.trim().length > 0;        // ensure name isn't empty
        });

        this.mosques = filteredMosques.map(mosque => this.processMosqueData(mosque, coords));
      } catch (error) {
        console.error("Error in mosque search:", error);
        this.mosques = [];
      } finally {
        this.loading = false;
      }
    },

    async geocodeLocation(query) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
        );
        const data = await response.json();
        return data.length > 0 ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
      } catch (error) {
        console.error("Geocoding error:", error);
        return null;
      }
    },

    async fetchMosquesFromOverpass(lat, lon, radius) {
      const radiusInDegrees = radius / 111320;
      const south = Math.min(lat - radiusInDegrees, lat + radiusInDegrees);
      const north = Math.max(lat - radiusInDegrees, lat + radiusInDegrees);
      const west = Math.min(lon - radiusInDegrees, lon + radiusInDegrees);
      const east = Math.max(lon - radiusInDegrees, lon + radiusInDegrees);

      const query = `
        [out:json];
        (
          node["amenity"="place_of_worship"]["religion"="muslim"](${south},${west},${north},${east});
          way["amenity"="place_of_worship"]["religion"="muslim"](${south},${west},${north},${east});
          relation["amenity"="place_of_worship"]["religion"="muslim"](${south},${west},${north},${east});
        );
        out body;
        >;
        out skel qt;
      `;

      try {
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
          { headers: { 'Accept': 'application/json' } }
        );
        const data = await response.json();
        return data.elements || [];
      } catch (error) {
        console.error("Overpass API error:", error);
        return [];
      }
    },

    processMosqueData(mosque, coords) {
      return {
        id: mosque.id,
        name: mosque.tags?.name || "Unnamed Mosque",
        address: this.getAddress(mosque.tags),
        city: mosque.tags?.["addr:city"] || this.lastSearchLocation,
        country: mosque.tags?.["addr:country"] || "",
        lat: mosque.lat || (mosque.center?.lat || coords.lat),
        lon: mosque.lon || (mosque.center?.lon || coords.lon),
        capacity: this.estimateCapacity(mosque),
        facilities: this.detectFacilities(mosque),
        rating: this.generateRandomRating(),
        tags: mosque.tags || {}
      };
    },

    getAddress(tags) {
      if (!tags) return "Address not specified";
      const parts = [];
      if (tags["addr:housenumber"]) parts.push(tags["addr:housenumber"]);
      if (tags["addr:street"]) parts.push(tags["addr:street"]);
      if (tags["addr:city"]) parts.push(tags["addr:city"]);
      if (tags["addr:country"]) parts.push(tags["addr:country"]);
      return parts.length > 0 ? parts.join(", ") : "Address not specified";
    },

    estimateCapacity(mosque) {
      if (mosque.tags?.capacity) return parseInt(mosque.tags.capacity);
      if (mosque.tags?.building === "mosque") return Math.floor(100 + Math.random() * 400);
      if (mosque.tags?.building === "yes") return Math.floor(50 + Math.random() * 150);
      return Math.floor(50 + Math.random() * 300);
    },

    detectFacilities(mosque) {
      const tags = mosque.tags || {};
      const facilities = [];

      // Basic info
      if (tags.amenity === 'place_of_worship') facilities.push('Mosque');
      if (tags.religion === 'muslim') facilities.push('Muslim');

      // Accessibility
      if (tags.wheelchair === 'yes') facilities.push('♿ Wheelchair Access');
      else if (tags.wheelchair === 'limited') facilities.push('♿ Limited Access');

      // Prayer spaces
      if (tags.female_prayer_space === 'yes') facilities.push('♀ Women\'s Area');
      if (tags.male_prayer_space === 'yes') facilities.push('♂ Men\'s Area');
      if (tags.prayer_space === 'yes') facilities.push('🕌 Prayer Hall');

      // Services
      if (tags.toilets === 'yes') facilities.push('🚻 Toilets');
      if (tags.ablation_space === 'yes' || tags.wudu === 'yes') facilities.push('💦 Ablution Area');
      if (tags.parking === 'yes') facilities.push('🅿 Parking');

      // Educational
      if (tags.islamic_school === 'yes') facilities.push('📚 Islamic School');
      if (tags.quran_classes === 'yes') facilities.push('📖 Quran Classes');

      // Timing
      if (tags.opening_hours) facilities.push('🕒 Opening Times');

      // Architecture
      if (tags.minaret === 'yes') facilities.push('🕌 Minaret');
      if (tags.dome === 'yes') facilities.push('🕌 Dome');

      // Other amenities
      if (tags.internet_access === 'yes') facilities.push('📶 WiFi');
      if (tags.air_conditioning === 'yes') facilities.push('❄️ AC');
      if (tags.carpet === 'yes') facilities.push('🧎 Prayer Carpets');

      return facilities.length > 0 ? facilities : ['Basic Facilities'];
    },

    getFacilityBadgeClass(facility) {
      if (facility.includes('Wheelchair')) return 'bg-success text-white';
      if (facility.includes('Women') || facility.includes('Men')) return 'bg-info text-white';
      if (facility.includes('Opening Times')) return 'bg-primary text-white';
      if (facility.includes('Parking') || facility.includes('Toilets')) return 'bg-warning text-dark';
      if (facility.includes('School') || facility.includes('Classes')) return 'bg-dark text-white';
      return 'bg-light text-dark';
    },

    formatOpeningHours(hours) {
      // Simple formatting - could be enhanced with more complex parsing
      return hours
        .replace(/;/g, '; ')
        .replace(/,/g, ', ')
        .replace(/\s+/g, ' ')
        .trim();
    },

    generateRandomRating() {
      let rating = 3;
      if (Math.random() > 0.7) rating += 1;
      if (Math.random() > 0.9) rating += 1;
      return Math.min(5, Math.max(1, rating));
    }
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css');

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.facilities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.badge {
  font-size: 0.8rem;
  padding: 0.35em 0.65em;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}



.card-header {
  padding: 1.25rem 1.5rem;
  background-color: #2c3e50 !important;
}

.card-header .attribution small {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
}



.mosque-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.1) !important;
}

.form-control,
.form-select {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem !important;
}

.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-outline-primary {
  border-color: #3498db;
  color: #3498db;
}

.btn-outline-primary:hover {
  background-color: #3498db;
  color: white;
}

.bi-star-fill {
  color: #f39c12;
}

.bi-star {
  color: #ddd;
}

.badge {
  font-weight: 500;
  padding: 0.35em 0.65em;
  border-radius: 0.25rem;
}

.bg-success {
  background-color: #27ae60 !important;
}

.facilities {
  min-height: 2.5rem;
}

.spinner-border {
  width: 1.5rem;
  height: 1.5rem;
  border-width: 0.15em;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    text-align: center;
  }

  .attribution {
    margin-top: 0.5rem;
  }
}
</style>
