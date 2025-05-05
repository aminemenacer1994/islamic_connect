<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-5 fw-bold text-center">Mosque Locater</h1>
        <p class="text-center container mb-4 lead">
          Find nearby mosques around you based on your location with directions, prayer times, and contact details.
        </p>
        <div class="shadow" style="border-radius: 20px; padding: 10px; border: 1px solid grey;">
            <!-- Search Section -->
          <div class="card-body container-fluid" style="padding: 5px;">
            <div class="row mb-4 justify-content-center">
              <div>
                <!-- Inline Search Bar with Label, Input, and Button -->
                <form class="d-flex align-items-center mb-3" role="search" @submit.prevent="searchMosques"
                  style="gap: 0.5rem;">
                  <h4 class="card-title pr-2 fw-bold" style="font-size: 25px;">Search location:</h4>
                  <input id="searchInput" type="search" class="form-control" placeholder="Enter city or country..."
                    aria-label="Search" v-model="searchQuery" @input="handleTyping" autocomplete="off"
                    style="max-width: 300px;" />
                  <button class="btn btn-outline-success" type="submit" :disabled="loading">
                    <span v-if="!loading">Search</span>
                    <span v-else class="spinner-border spinner-border-sm"></span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for mosques in {{ searchQuery }}...</p>
            </div>

            <!-- Results -->
            <div v-if="!loading">
              <!-- No Search State -->
              <div v-if="!searchQuery && mosques.length === 0" class="text-center py-5">
                <i class="bi bi-compass display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for mosques worldwide</h3>
                <p class="text-muted">Enter a city or town name to begin</p>
              </div>

              <!-- No Results State -->
              <div v-else-if="searchQuery && mosques.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No mosques found</h3>
                <p class="text-muted">Try adjusting your search or increasing the radius</p>
              </div>

              <!-- Results Grid -->
              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col" v-for="mosque in mosques" :key="mosque.id">
                  <div class="card">
                    <div style="padding: 15px 15px 0 15px;">
                      <h1 class="card-title fw-bold text-dark mb-3" style="font-size: 25px;">{{ mosque.name }}</h1>
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

                      <div class="mb-2 facilities" style="min-height: 2.5rem;">
                        <span class="badge rounded-pill me-1 mb-1" style="background-color: #f0f0f0; color: #333;"
                          v-for="facility in mosque.facilities" :key="facility">
                          {{ facility }}
                        </span>
                      </div>

                      <div class="d-flex justify-content-between align-items-center">
                        <button class="form-control d-flex align-items-center justify-content-center"
                          @click="openGoogleMaps(mosque.lat, mosque.lon)"
                          style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; min-width: 150px; height: 38px"
                          type="button">
                          <span class="text-center w-100">
                            <b>Get Direction</b>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer" style="border-radius: 20px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
            <div class="d-flex justify-content-between align-items-center" style="padding: 10px;">
              <small class="text-muted">
                Showing {{ mosques.length }} mosques
              </small>
            </div>
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
      lastSearchLocation: null
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
    openGoogleMaps(lat, lon) {
      window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank', 'noopener,noreferrer');
    },
    async searchMosques() {
      if (!this.searchQuery.trim()) return;

      this.loading = true;
      this.mosques = [];
      this.lastSearchLocation = this.searchQuery;

      try {
        // Step 1: Geocode the location to get coordinates
        const coords = await this.geocodeLocation(this.searchQuery);
        if (!coords) return;

        // Step 2: Fetch mosques from Overpass API
        const mosques = await this.fetchMosquesFromOverpass(
          coords.lat,
          coords.lon,
          parseInt(this.radius)
        );

        // Step 3: Process and store results
        this.mosques = mosques.map(mosque => this.processMosqueData(mosque, coords));
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
      // Convert meters to degrees (approximate)
      const radiusInDegrees = radius / 111320;

      // Calculate bounding box ensuring correct coordinate order
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
          {
            headers: {
              'Accept': 'application/json'
            }
          }
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
        rating: this.generateRandomRating()
      };
    },

    getAddress(tags) {
      if (!tags) return "Address not specified";
      const parts = [];
      if (tags["addr:housenumber"]) parts.push(tags["addr:housenumber"]);
      if (tags["addr:street"]) parts.push(tags["addr:street"]);
      return parts.length > 0 ? parts.join(" ") : "Address not specified";
    },

    estimateCapacity(mosque) {
      if (mosque.tags?.capacity) return parseInt(mosque.tags.capacity);
      // Estimate based on mosque type if available
      if (mosque.tags?.building === "mosque") return Math.floor(100 + Math.random() * 400);
      if (mosque.tags?.building === "yes") return Math.floor(50 + Math.random() * 150);
      return Math.floor(50 + Math.random() * 300); // Default estimate
    },

    detectFacilities(mosque) {
      const facilities = [];
      const tags = mosque.tags || {};

      // Core facilities
      if (tags["prayer:jummah"] === "yes") facilities.push("Jummah Prayer");
      if (tags["toilets"] === "yes") facilities.push("Toilets");
      if (tags["wudu"] === "yes") facilities.push("Wudu Area");

      // Additional amenities
      if (tags["parking"] === "yes") facilities.push("Parking");
      if (tags["female"] === "yes" || tags["amenity"] === "toilets:female") facilities.push("Women's Section");
      if (tags["wheelchair"] === "yes") facilities.push("Wheelchair Access");
      if (tags["internet_access"] === "yes") facilities.push("WiFi");

      return facilities.length > 0 ? facilities : ["Basic Facilities"];
    },

    generateRandomRating() {
      // Base rating with some randomness
      let rating = 3; // Default
      if (Math.random() > 0.7) rating += 1; // 30% chance for 4 stars
      if (Math.random() > 0.9) rating += 1; // 10% chance for 5 stars
      return Math.min(5, Math.max(1, rating)); // Ensure 1-5 range
    }
  }
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css');

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.card {
  border-radius: 0.75rem;
  overflow: hidden;
  border: none;
}

.card-header {
  padding: 1.25rem 1.5rem;
  background-color: #2c3e50 !important;
}

.card-header .attribution small {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
}

.mosque-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
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