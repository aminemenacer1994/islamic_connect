<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-4 fw-bold text-center">Islamic Store Finder</h1>
        <p class="text-center container mb-4 lead">
          Easily find nearby Islamic stores, such as bookstores, clothing, and religious goods, with detailed
          directions.
        </p>

        <div class="shadow" style="border-radius: 8px; padding: 10px;">
          <!-- Search Section -->
          <div class="card-body container-fluid" style="padding: 5px;">
            <div class="row mb-4 justify-content-center">
              <div>
                <!-- Inline Search Bar with Label, Input, Radius Dropdown, and Button -->
                <form class="d-flex align-items-center mb-3 flex-wrap" role="search" @submit.prevent="searchStores"
                  style="gap: 0.5rem;">
                  <h4 class="card-title pr-2 fw-bold" style="font-size: 25px;">Search location:</h4>
                  <input id="searchInput" type="search" class="form-control" placeholder="Select a city ..."
                    aria-label="Search" v-model="searchQuery" @input="handleTyping" autocomplete="off"
                    style="max-width: 300px;" />
                  <button class="btn  align-items-center justify-content-center " style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px" type="submit" :disabled="loading">
                    <span v-if="!loading">Search</span>
                    <span v-else class="spinner-border spinner-border-sm"></span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="text-center text-danger py-3">{{ error }}</div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for Islamic stores in {{ searchQuery }}...</p>
            </div>

            <!-- Results -->
            <div v-if="!loading">
              <!-- No Search State -->
              <div v-if="!searchQuery || stores.length === 0" class="text-center py-5">
                <i class="bi bi-compass display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for Islamic stores worldwide</h3>
                <p class="text-muted">Enter a city or town name to begin</p>
              </div>

              <!-- No Results State -->
              <div v-else-if="searchQuery && stores.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No Islamic stores found</h3>
                <p class="text-muted">Try increasing the search radius, using a larger city, or searching for
                  bookstores, clothing, or religious goods.</p>
              </div>

              <!-- Results Grid -->
              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col" v-for="store in stores" :key="store.id">
                  <div class="card">
                    <div style="padding: 15px 15px 0 15px;">
                      <h1 class="card-title fw-bold text-dark mb-3" style="font-size: 25px;">{{ store.name }}</h1>
                    </div>
                    <div class="card-body pt-0">
                      <div class="mb-2">
                        <div class="d-flex align-items-start">
                          <i class="bi bi-geo-alt-fill me-2 flex-shrink-0"></i>
                          <span class="text-truncate"
                            style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            {{ store.address }}
                          </span>
                        </div>
                      </div>

                      <div class="mb-2">
                        <p class="text-muted mb-0">
                          <i class="bi bi-geo me-2"></i>
                          <small>{{ store.lat.toFixed(4) }}, {{ store.lon.toFixed(4) }}</small>
                        </p>
                      </div>

                      <div class="mb-2 d-flex align-items-center">
                        <span class="text-warning me-2">
                          <i class="bi bi-star-fill" v-for="n in store.rating" :key="'star-' + n"></i>
                          <i class="bi bi-star" v-for="i in (5 - store.rating)" :key="'empty-' + i"></i>
                        </span>
                        <h6 class="mb-0">Inventory: {{ store.inventory.toLocaleString() }}</h6>
                      </div>

                      <div class="mb-2 facilities">
                        <div class="d-flex flex-wrap">
                          <span v-for="facility in store.facilities"
                            class="badge rounded-pill d-flex align-items-center" :key="facility"
                            :class="getFacilityBadgeClass(facility)" style="padding: 0.5em 0.8em;">
                            {{ facility }}
                          </span>
                        </div>
                      </div>

                      <div v-if="store.tags?.opening_hours" class="opening-hours mb-2 mt-2">
                        <small class="text-muted">
                          <strong>Opening hours: </strong> {{ formatOpeningHours(store.tags.opening_hours) }}
                        </small>
                      </div>

                      <div class="d-flex justify-content-between align-items-center gap-2">
                        <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                          @click="openGoogleMaps(store.lat, store.lon)"
                          style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px">
                          <span class="text-center w-100">
                            <b>Get Directions</b>
                          </span>
                        </button>

                        <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                          @click="shareViaWhatsApp(store)"
                          style="background: #1881b9; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px">
                          <b>Share Details</b>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!loading && stores.length > 0" class="d-flex justify-content-between align-items-center"
            style="padding: 10px;">
            <small class="text-muted">
              Showing {{ stores.length }} Islamic stores
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "IslamicStoreFinder",
  data() {
    return {
      searchQuery: "",
      stores: [],
      loading: false,
      error: '',
      lastSearchQuery: null,
      selectedRadius: 10000, // Default 10km radius
      bbox: null,
      geocodedLocationName: null, // To store the accurate location name
      // Replace with your own email for Nominatim API
      nominatimEmail: 'your.email@example.com',
    };
  },
  computed: {
    hasResults() {
      return this.stores.length > 0;
    },
    attributionText() {
      return `Data © ${new Date().getFullYear()} OpenStreetMap contributors`;
    },
  },
  methods: {
    handleTyping() {
      this.error = ""; // Clear error on typing
    },
    shareViaWhatsApp(store) {
      const message = `Islamic Store: *${store.name}*\n\n` +
        `Address: ${store.address}\n` +
        `Lat & Long: ${store.lat.toFixed(4)}, ${store.lon.toFixed(4)}\n` +
        `Rating: ${'★'.repeat(store.rating)}${'☆'.repeat(5 - store.rating)}\n` +
        `Inventory: ${store.inventory.toLocaleString()}\n\n` +
        (store.tags?.opening_hours ? `Opening Hours: ${store.tags.opening_hours}\n\n` : '') +
        `Google Maps: https://www.google.com/maps?q=${store.lat},${store.lon}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    },
    openGoogleMaps(lat, lon) {
      window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank', 'noopener,noreferrer');
    },
    async searchStores() {
      if (!this.searchQuery.trim()) {
        this.error = "Please enter a city or country.";
        return;
      }

      this.loading = true;
      this.error = "";
      this.stores = [];
      this.lastSearchQuery = this.searchQuery;

      try {
        let coords = await this.geocodeLocation(this.searchQuery, 'settlement');
        if (!coords) {
          // Fallback to country-level search
          coords = await this.geocodeLocation(this.searchQuery, 'country');
          if (!coords) {
            this.error = `Location "${this.searchQuery}" not found. Please try another city or country.`;
            return;
          }
        }

        if (!this.bbox || !Array.isArray(this.bbox) || this.bbox.length !== 4) {
          this.error = "Unable to determine search area. Using default radius.";
          const radiusInDegrees = this.selectedRadius / 111320; // Convert meters to degrees
          this.bbox = [
            coords.lat - radiusInDegrees, // south
            coords.lat + radiusInDegrees, // north
            coords.lon - radiusInDegrees, // west
            coords.lon + radiusInDegrees, // east
          ];
        } else {
          // Expand bounding box by 20%
          const latDiff = (this.bbox[1] - this.bbox[0]) * 0.2;
          const lonDiff = (this.bbox[3] - this.bbox[2]) * 0.2;
          this.bbox = [
            this.bbox[0] - latDiff, // south
            this.bbox[1] + latDiff, // north
            this.bbox[2] - lonDiff, // west
            this.bbox[3] + lonDiff, // east
          ];
        }

        const stores = await this.fetchStoresFromOverpass(coords);

        // Filter out unwanted stores
        const filteredStores = stores.filter(store => {
          const name = (store.tags?.name || '').toLowerCase();
          const shopType = store.tags?.shop || '';
          const isUnwanted = [
            'butcher', 'food', 'grocery', 'supermarket', 'convenience', 'restaurant', 'fast_food', 'deli', 'bakery'
          ].includes(shopType) ||
            store.tags?.['diet:halal'] === 'yes' ||
            name.includes('butcher') ||
            name.includes('meat');
          return name.trim().length > 0 && !name.includes('unnamed') && !isUnwanted;
        });

        this.stores = filteredStores.map(s => this.processStoreData(s, coords));
        if (this.stores.length === 0 && !this.error) {
          this.error = "No Islamic stores found. Try increasing the search radius or using a larger city.";
        }
      } catch (error) {
        this.error = "Failed to fetch Islamic stores. Please try again later.";
        console.error("Error in store search:", error);
      } finally {
        this.loading = false;
      }
    },
    async geocodeLocation(query, featuretype) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
            limit: 1,
            'accept-language': 'en',
            featuretype: featuretype,
            email: this.nominatimEmail,
          }
        });
        if (response.data && response.data.length > 0) {
          const result = response.data[0];
          this.bbox = result.boundingbox ? result.boundingbox.map(Number) : null;
          this.geocodedLocationName = result.display_name.split(',')[0] || query;
          return {
            lat: parseFloat(result.lat),
            lon: parseFloat(result.lon),
          };
        }
        return null;
      } catch (error) {
        console.error("Geocoding error:", error);
        return null;
      }
    },
    async fetchStoresFromOverpass(coords) {
      // Generate cache key based on coordinates and radius
      const cacheKey = `${coords.lat}:${coords.lon}:${this.selectedRadius}`;
      if (this.queryCache.has(cacheKey)) {
        console.log('Returning cached results for', cacheKey);
        return this.queryCache.get(cacheKey);
      }

      let bbox = this.bbox;
      if (!bbox || !Array.isArray(bbox) || bbox.length !== 4) {
        const radiusInDegrees = this.selectedRadius / 111320; // Convert meters to degrees
        bbox = [
          Math.max(-90, coords.lat - radiusInDegrees), // south
          Math.min(90, coords.lat + radiusInDegrees), // north
          Math.max(-180, coords.lon - radiusInDegrees), // west
          Math.min(180, coords.lon + radiusInDegrees), // east
        ];
      } else {
        // Ensure bounding box stays within valid geographic ranges
        bbox = [
          Math.max(-90, Math.min(bbox[0], bbox[1])), // south
          Math.min(90, Math.max(bbox[0], bbox[1])), // north
          Math.max(-180, Math.min(bbox[2], bbox[3])), // west
          Math.min(180, Math.max(bbox[2], bbox[3])), // east
        ];
      }

      const [south, north, west, east] = bbox;

      const unwantedShopTypes = "butcher|food|grocery|supermarket|convenience|restaurant|fast_food|deli|bakery|cafe|bar|pub|alcohol";
      const query = `
        [out:json][timeout:90][maxsize:1073741824];
        (
          nwr["shop"~"books|clothes|religion|gift|variety_store|general|jewelry|electronics|stationery|art|craft|perfumery|cosmetics|department_store|kiosk|textiles|toys|charity"]
             ["name"~"islam|muslim|quran|koran|hijab|arabic|deen|halal|sunnah|abaya|thobe|miswak|oud|ramadan|eid|salah|prayer|madrasa|dawah", "i"]
             ["shop"!~"${unwantedShopTypes}"]
             ["diet:halal"!="yes"]
             (${south},${west},${north},${east});

          nwr["shop"]["religion"~"islam|muslim"]
             ["shop"!~"${unwantedShopTypes}"]
             ["diet:halal"!="yes"]
             (${south},${west},${north},${east});

          nwr["shop"]["keywords"~"islamic|muslim|quran|koran|hijab|halal|religious|ramadan|eid|salah|prayer|madrasa|dawah", "i"]
             ["shop"!~"${unwantedShopTypes}"]
             ["diet:halal"!="yes"]
             (${south},${west},${north},${east});

          nwr["shop"]["description"~"islamic|muslim|halal|religious|ramadan|eid|salah|prayer|madrasa|dawah", "i"]
             ["shop"!~"${unwantedShopTypes}"]
             ["diet:halal"!="yes"]
             (${south},${west},${north},${east});

          nwr["access"~"muslim|islamic"]
             ["shop"!~"${unwantedShopTypes}"]
             ["diet:halal"!="yes"]
             (${south},${west},${north},${east});

          nwr["amenity"="marketplace"]
             ["name"~"islam|muslim|quran|koran|hijab|arabic|deen|halal|sunnah|abaya|thobe|miswak|oud|ramadan|eid|salah|prayer|madrasa|dawah", "i"]
             ["diet:halal"!="yes"]
             (${south},${west},${north},${east});

          nwr["destination"~"religious|islamic|muslim"]
             ["shop"!~"${unwantedShopTypes}"]
             ["diet:halal"!="yes"]
             (${south},${west},${north},${east});
        );
        out body limit 1000;
      `;

      console.log('Executing Overpass query:', query);

      const maxRetries = 3;
      let attempts = 0;
      let elements = [];

      while (attempts < maxRetries) {
        try {
          const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
            headers: { 'Content-Type': 'text/plain' },
            timeout: 90000, // 90 seconds timeout for axios
          });

          elements = response.data.elements || [];
          if (elements.length > 0) {
            this.queryCache.set(cacheKey, elements);
            return elements;
          }

          // If no results, try expanding the radius slightly for the next attempt
          this.selectedRadius *= 1.5;
          const radiusInDegrees = this.selectedRadius / 111320;
          bbox = [
            Math.max(-90, coords.lat - radiusInDegrees),
            Math.min(90, coords.lat + radiusInDegrees),
            Math.max(-180, coords.lon - radiusInDegrees),
            Math.min(180, coords.lon + radiusInDegrees),
          ];
          attempts++;
        } catch (error) {
          console.error(`Overpass API error (attempt ${attempts + 1}/${maxRetries}):`, error);
          if (attempts === maxRetries - 1) {
            this.error = "Failed to fetch stores after multiple attempts. Please try again later.";
            return [];
          }
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempts + 1)));
          attempts++;
        }
      }
      return elements;
    },
    processStoreData(data, coords) {
      return {
        id: data.id,
        name: data.tags?.name || "Unnamed Store",
        address: this.getAddress(data.tags),
        city: data.tags?.["addr:city"] || this.geocodedLocationName || this.lastSearchQuery,
        country: data.tags?.["addr:country"] || "",
        lat: data.lat || (data.center?.lat || coords.lat),
        lon: data.lon || (data.center?.lon || coords.lon),
        inventory: this.estimateInventory(data),
        facilities: this.detectFacilities(data),
        rating: this.generateRandomRating(),
        tags: data.tags || {},
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
    estimateInventory(data) {
      if (data.tags?.inventory) return parseInt(data.tags.inventory);
      if (data.tags?.shop === "books") return Math.floor(100 + Math.random() * 500);
      return Math.floor(50 + Math.random() * 300);
    },
    detectFacilities(data) {
      const tags = data.tags || {};
      const facilities = [];

      // Shop Type
      if (tags.shop === "books") facilities.push("Islamic Books");
      if (tags.shop === "clothes") facilities.push("Islamic Clothing");
      if (tags.shop === "religion") facilities.push("Religious Goods");
      if (tags.shop === "gift") facilities.push("Islamic Gifts");
      if (tags.shop === "variety_store") facilities.push("Variety Store");
      if (tags.shop === "general") facilities.push("General Retail");
      if (tags.shop === "jewelry") facilities.push("Islamic Jewelry");
      if (tags.shop === "electronics") facilities.push("Islamic Electronics");
      if (tags.shop === "stationery") facilities.push("Islamic Stationery");
      if (tags.shop === "art") facilities.push("Islamic Art");
      if (tags.shop === "craft") facilities.push("Islamic Crafts");
      if (tags.shop) facilities.push("Retail");

      // Certifications
      if (tags.certification === "islamic") facilities.push("Islamic Certification");

      // Accessibility
      if (tags.wheelchair === "yes") facilities.push("♿ Wheelchair Access");
      if (tags.wheelchair === "limited") facilities.push("♿ Limited Access");

      // Amenities
      if (tags.parking === "yes") facilities.push("🅿 Parking");
      if (tags.internet_access === "yes") facilities.push("📶 WiFi");
      if (tags.air_conditioning === "yes") facilities.push("❄️ AC");

      // Services
      if (tags.online_ordering === "yes") facilities.push("🛒 Online Ordering");
      if (tags.delivery === "yes") facilities.push("🚚 Delivery");

      // Opening Hours
      if (tags.opening_hours) facilities.push("🕒 Opening Hours");

      return facilities.length > 0 ? facilities : ["Basic Retail"];
    },
    getFacilityBadgeClass(facility) {
      if (facility.includes("Wheelchair")) return "bg-success text-white";
      if (facility.includes("Islamic") || facility.includes("Religious")) return "bg-info text-white";
      if (facility.includes("Opening Hours")) return "bg-primary text-white";
      if (facility.includes("Parking") || facility.includes("WiFi")) return "bg-warning text-dark";
      if (facility.includes("Online") || facility.includes("Delivery")) return "bg-dark text-white";
      return "bg-light text-dark";
    },
    formatOpeningHours(hours) {
      return hours
        .replace(/;/g, "; ")
        .replace(/,/g, ", ")
        .replace(/\s+/g, " ")
        .trim();
    },
    generateRandomRating() {
      let rating = 3;
      if (Math.random() > 0.7) rating += 1;
      if (Math.random() > 0.9) rating += 1;
      return Math.min(5, Math.max(1, rating));
    },
  },
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css');

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 8px;
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