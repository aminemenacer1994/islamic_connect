<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-5 fw-bold text-center">Mosque Locater</h1>
        <p class="text-center container mb-4 lead">
          Find nearby mosques around you based on your location with directions, prayer times, and contact details.
        </p>
        <div class="shadow" style="border-radius: 20px; padding: 10px;">
          <div class="card-body container-fluid" style="padding: 5px;">
            <!-- Search Section -->
            <div class="row mb-4">
              <div class="col-md-12" >
                <!-- Inline Search Bar with Label, Input, and Button -->
                <form class="d-flex align-items-center mb-3" role="search" @submit.prevent="searchMosques"
                  style="gap: 0.5rem;">
                  <!-- <label for="searchInput" class="form-label fw-bold mb-0"></label> -->
                  <h4 class="card-title pr-2 fw-bold">Search location:</h4>
                  <input id="searchInput" type="search" class="form-control" placeholder="Enter city or country..."
                    aria-label="Search" v-model="searchQuery" @input="handleTyping" autocomplete="off"
                    style="max-width: 300px;" />
                  <button class="btn btn-outline-success" type="submit" :disabled="loading">
                    <span v-if="!loading">Search</span>
                    <span v-else class="spinner-border spinner-border-sm"></span>
                  </button>
                </form>
              </div>
              <!-- <div class="col-md-4">
                <h4 class="card-title pr-2 fw-bold">Search radius:</h4>
                <select id="radiusSelect" class="form-select" v-model="radius" :disabled="loading">
                  <option value="1000">1 km</option>
                  <option value="5000">5 km</option>
                  <option value="10000">10 km</option>
                  <option value="20000">20 km</option>
                </select>
              </div> -->
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
                  <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden">
                    <div class="card-body p-4">
                      <div class="d-flex justify-content-between align-items-start mb-3">
                        <h3 class="h5 card-title mb-0 fw-bold text-dark">{{ mosque.name }}</h3>
                        <span class="badge rounded-pill" style="background-color: #00bfa6; color: white">{{ mosque.city
                          }}</span>
                      </div>

                      <div class="mb-3">
                        <p class="card-text text-muted mb-2">
                          <i class="bi bi-geo-alt-fill me-2"></i>
                          <span
                            style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            {{ mosque.address }}
                          </span>
                        </p>
                        <p class="card-text text-muted mb-2">
                          <i class="bi bi-geo me-2"></i>
                          <small>{{ mosque.lat.toFixed(4) }}, {{ mosque.lon.toFixed(4) }}</small>
                        </p>
                      </div>

                      <div class="mb-3">
                        <div class="d-flex align-items-center mb-3">
                          <span class="text-warning me-2">
                            <i class="bi bi-star-fill" v-for="n in mosque.rating" :key="'star-' + n"></i>
                            <i class="bi bi-star" v-for="n in (5 - mosque.rating)" :key="'empty-' + n"></i>
                          </span>
                          <small class="text-muted">Capacity: {{ mosque.capacity.toLocaleString() }}</small>
                        </div>

                        <div class="facilities mb-3" style="min-height: 2.5rem;">
                          <span class="badge rounded-pill me-1 mb-1" style="background-color: #f0f0f0; color: #333;"
                            v-for="facility in mosque.facilities" :key="facility">
                            {{ facility }}
                          </span>
                        </div>
                      </div>

                      <div class="d-flex justify-content-between align-items-center mt-3">
                        <small class="text-muted">{{ mosque.country }}</small>
                        <a :href="`https://www.google.com/maps?q=${mosque.lat},${mosque.lon}`" target="_blank"
                          rel="noopener noreferrer" class="btn btn-sm rounded-pill"
                          style="background: #00bfa6; color: white; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
                          <i class="bi bi-map me-1"></i> View Map
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer bg-light" style="border-radius: 20px;">
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