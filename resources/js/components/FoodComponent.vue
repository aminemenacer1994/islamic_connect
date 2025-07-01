<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-5 fw-bold text-center">Halal Restaurants & Supermarkets Finder</h1>
        <p class="text-center container mb-4 lead">
          Discover the best halal restaurants and supermarkets near you with ease! Our platform connects you to trusted,
          local halal establishments.
        </p>
        <div class="shadow" style="border-radius: 8px; padding: 10px; ">
          <!-- Search Section -->
          <div class="card-body" style="padding: 5px;">
            <div class="flex-wrap align-items-center justify-content-center gap-3 mb-4">
              <!-- Search form -->
              <form class="d-flex align-items-center mb-3" role="search" @submit.prevent="searchLocation"
                style="gap: 0.5rem;">
                <h4 class="card-title pr-2 fw-bold" style="font-size: 25px;">Search location:</h4>
                <input id="searchInput" type="search" class="form-control" placeholder="Enter city..."
                  aria-label="Search" v-model="searchQuery" autocomplete="off" style="max-width: 300px;"
                  ref="searchInput" />
                <button class="btn align-items-center justify-content-center"
                  style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px"
                  type="submit" :disabled="loading">
                  <span v-if="!loading">Search</span>
                  <span v-else class="spinner-border spinner-border-sm"></span>
                </button>
              </form>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for halal restaurants and supermarkets in {{ searchQuery }}...</p>
            </div>

            <!-- Results -->
            <div v-if="!loading">
              <!-- No Search State -->
              <div v-if="!searchQuery || shops.length === 0" class="text-center py-5">
                <i class="bi bi-shop display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for halal restaurants & supermarkets</h3>
                <p class="text-muted">Enter a city or address to find nearby halal establishments</p>
              </div>

              <!-- No Results State -->
              <div v-else-if="searchQuery && shops.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No halal restaurants or supermarkets found</h3>
              </div>

              <!-- Results Grid -->
              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col" v-for="shop in filteredShops" :key="shop.id">
                  <div class="card h-100 d-flex flex-column">
                    <div style="padding: 15px 15px 0 15px;">
                      <h1 class="card-title fw-bold text-dark mb-3" style="font-size: 1.5rem;">
                        {{ shop.name }}
                      </h1>
                    </div>
                    <div class="card-body pt-0 flex-grow-1">
                      <div class="mb-2">
                        <div class="d-flex align-items-start">
                          <i class="bi bi-geo-alt-fill me-2 flex-shrink-0"></i>
                          <span class="text-truncate"
                            style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            {{ shop.address || 'Address not specified' }}
                          </span>
                        </div>
                      </div>

                      <div class="mb-2 d-flex align-items-center">
                        <span class="text-warning me-2">
                          <i v-for="n in 5" :key="n" :class="getStarClass(shop.rating, n)" class="bi"></i>
                        </span>
                        <h6 class="mb-0">{{ shop.rating }}/5 </h6>
                      </div>

                      <div v-if="shop.cuisine" class="mb-2">
                        <small class="text-muted">
                          <strong>Cuisine:</strong> {{ shop.cuisine }}
                        </small>
                      </div>

                      <div class="opening-hours mb-2 mt-2">
                        <small class="text-muted">
                          <!-- <strong>Opening Times:</strong> {{ shop.opening_hours_formatted || 'Not specified' }} -->
                          <span v-if="shop.isOpen" class="badge bg-success ms-2">Open Now</span>
                          <span v-else-if="shop.isOpen === false" class="badge bg-danger ms-2">Closed</span>
                        </small>
                      </div>
                    </div>

                    <div
                      class="card-footer mt-auto border-top-0 d-flex justify-content-between align-items-center gap-2">
                      <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                        @click="openGoogleMaps(shop.lat, shop.lon, shop.name)"
                        style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px">
                        <span class="text-center w-100">
                          <b>Get Direction</b>
                        </span>
                      </button>

                      <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                        @click="callShop(shop.phone)" :disabled="!shop.phone" :style="{
                          background: shop.phone ? '#1881b9' : '#6c757d',
                          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                          color: 'white',
                          height: '38px',
                          cursor: shop.phone ? 'pointer' : 'not-allowed'
                        }">
                        <b>Call Shop</b>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!loading && shops.length > 0" class="d-flex justify-content-between align-items-center"
            style="padding: 10px;">
            <small class="text-muted">
              Showing {{ filteredShops.length }} of {{ shops.length }} places
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HalalFoodLocator',
  data() {
    return {
      searchQuery: '',
      loading: false,
      error: '',
      shops: [],
      searchHistory: [],
      currentLocation: null,
      searchRadius: 5000,
      maxRadius: 10000,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.safeFocusInput();
    });
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/opening_hours@3.7.0/opening_hours.min.js';
    script.async = true;
    document.head.appendChild(script);
  },
  computed: {
    filteredShops() {
      return this.shops;
    },
  },
  methods: {
    generatePlaceholderRating() {
      const min = 3.0;
      const max = 5.0;
      const bias = 4.2;
      const variation = (Math.random() - 0.5) * 0.8;
      let rating = bias + variation;
      rating = Math.max(min, Math.min(max, rating));
      return Number(rating.toFixed(1));
    },
    getStarClass(rating, starIndex) {
      if (!rating) return 'bi-star';
      const fullStarThreshold = starIndex;
      const halfStarThreshold = starIndex - 0.5;
      if (rating >= fullStarThreshold) return 'bi-star-fill';
      if (rating >= halfStarThreshold) return 'bi-star-half';
      return 'bi-star';
    },
    safeFocusInput() {
      this.$nextTick(() => {
        const input = this.$refs.searchInput;
        if (input?.focus) input.focus();
      });
    },
    validateSearchQuery() {
      if (!this.searchQuery || typeof this.searchQuery !== 'string') {
        throw new Error('Invalid search query');
      }
      return this.searchQuery.trim();
    },
    async searchLocation() {
      const query = this.validateSearchQuery();
      if (!query) {
        this.error = 'Please enter a location';
        return;
      }

      const cachedSearch = this.searchHistory.find(s => s.query.toLowerCase() === query.toLowerCase());
      if (cachedSearch) {
        this.currentLocation = cachedSearch.location;
        await this.fetchNearbyShops();
        return;
      }

      this.loading = true;
      this.error = '';
      this.shops = [];

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'IslamicConnect/1.0 (your.email@example.com)',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          }
        );
        if (!response.ok) throw new Error('Location search service unavailable');
        const data = await response.json();
        if (!data.length) throw new Error('Location not found');

        const location = data[0];
        this.currentLocation = {
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon),
          display_name: location.display_name,
          address: location.address,
        };

        this.searchHistory.unshift({
          query,
          location: this.currentLocation,
          timestamp: new Date(),
        });
        if (this.searchHistory.length > 5) this.searchHistory.pop();

        await this.fetchNearbyShops();
      } catch (err) {
        this.error = err.message || 'Could not find location';
        console.error('Search error:', err);
        this.shops = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchNearbyShops() {
      if (!this.currentLocation) return;

      const { lat, lon } = this.currentLocation;
      const radius = this.searchRadius;

      const query = `
        [out:json][timeout:30];
        (
          node["amenity"~"restaurant|fast_food"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          way["amenity"~"restaurant|fast_food"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          node["shop"="supermarket"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          way["shop"="supermarket"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          node["shop"="supermarket"]["name"~"[Hh]alal"](around:${radius},${lat},${lon});
          way["shop"="supermarket"]["name"~"[Hh]alal"](around:${radius},${lat},${lon});
        );
        out center;
        >;
        out skel qt;
      `;

      try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch halal places');
        const json = await response.json();
        this.processShopData(json.elements || []);
      } catch (err) {
        this.error = err.message.includes('Too Many Requests')
          ? 'Rate limit hit. Please wait and try again.'
          : 'Could not load halal places';
        console.error('Fetch error:', err);
        this.shops = [];
      }
    },
    processShopData(elements) {
      const seen = new Set();
      const shops = [];

      elements.forEach(element => {
        try {
          if (!element.tags || seen.has(element.id)) return;

          const coords = element.lat ? element : element.center || {};
          if (!coords.lat || !coords.lon) return;

          const tags = element.tags;
          const name = tags.name || (tags.amenity ? 'Halal Restaurant' : 'Halal Supermarket');
          const type = tags.amenity ? 'restaurant' : 'supermarket';

          const addressParts = [
            tags['addr:street'],
            tags['addr:housenumber'],
            tags['addr:city'],
            tags['addr:postcode'],
            tags['addr:country'],
          ].filter(Boolean);
          const address = addressParts.length
            ? addressParts.join(', ')
            : tags['addr:full'] || this.currentLocation.display_name || 'Address not available';

          const distance = this.calculateDistance(
            this.currentLocation.lat, this.currentLocation.lon,
            coords.lat, coords.lon
          );

          let opening_hours_formatted = tags.opening_hours || 'Not specified';
          let isOpen = null;
          if (tags.opening_hours && typeof opening_hours === 'function') {
            try {
              const oh = new opening_hours(tags.opening_hours, {
                lat: coords.lat,
                lon: coords.lon,
              });
              isOpen = oh.getState();
              opening_hours_formatted = tags.opening_hours
                .replace(/;/g, ', ')
                .replace(/Mo/g, 'Mon')
                .replace(/Tu/g, 'Tue')
                .replace(/We/g, 'Wed')
                .replace(/Th/g, 'Thu')
                .replace(/Fr/g, 'Fri')
                .replace(/Sa/g, 'Sat')
                .replace(/Su/g, 'Sun');
            } catch (e) {
              console.warn('Opening hours parsing error:', e);
            }
          }

          const rating = tags.rating ? parseFloat(tags.rating) : this.generatePlaceholderRating();

          shops.push({
            id: element.id,
            name,
            type,
            lat: coords.lat,
            lon: coords.lon,
            address,
            distance: (distance / 1000).toFixed(1),
            phone: tags.phone,
            website: tags.website,
            cuisine: tags.cuisine || (type === 'restaurant' ? 'Halal' : null),
            opening_hours: tags.opening_hours,
            opening_hours_formatted,
            isOpen,
            rating,
            tags,
          });

          seen.add(element.id);
        } catch (e) {
          console.warn('Error processing shop:', element.id, e);
        }
      });

      this.shops = shops.sort((a, b) => a.distance - b.distance);
    },
    async expandSearchRadius() {
      const increment = 2000;
      if (this.searchRadius + increment > this.maxRadius) {
        this.error = `Maximum search radius of ${this.maxRadius / 1000}km reached`;
        return;
      }
      this.searchRadius += increment;
      this.error = `Expanding search to ${this.searchRadius / 1000}km radius...`;
      await this.fetchNearbyShops();
    },
    openGoogleMaps(lat, lon, name = '') {
      if (!lat || !lon) return;
      const baseUrl = 'https://www.google.com/maps';
      const params = new URLSearchParams({
        q: name ? `${name}@${lat},${lon}` : `${lat},${lon}`,
        layer: 'c',
        cbll: `${lat},${lon}`,
        cbp: '11',
      });
      window.open(`${baseUrl}?${params.toString()}`, '_blank');
    },
    callShop(phone) {
      if (!phone) return;
      if (confirm(`Call ${phone}?`)) {
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        window.location.href = `tel:${cleanPhone}`;
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3;
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    resetSearch() {
      this.searchQuery = '';
      this.searchRadius = 5000;
      this.currentLocation = null;
      this.shops = [];
      this.error = '';
    },
  },
};
</script>

<style scoped>
.card-footer {
  padding: 0.5rem 0.75rem;
  background-color: white !important;
  border-top: 0;
  position: sticky;
  bottom: 0;
}


.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.badge.bg-success {
  background-color: #28a745 !important;
}

.text-warning i {
  margin-right: 4px; /* Add spacing between stars */
}

@media (max-width: 768px) {
  .d-flex.align-items-center {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
  }

  .card-footer {
    padding: 0.5rem 0.75rem;
    background-color: white !important;
    border-top: 0;
    position: sticky;
    bottom: 0;
  }
}
</style>