<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-5 fw-bold text-center">Halal Food Locator</h1>
        <p class="text-center container mb-4 lead">
          Find halal restaurants, grocery stores, and food shops near you
        </p>
        <div class="shadow" style="border-radius: 20px; padding: 10px; border: 1px solid #eee;">
          <!-- Search Section -->
          <div class="card-body container-fluid" style="padding: 5px;">
            <div class="row mb-4 justify-content-center">
              <div>
                <form class="d-flex align-items-center mb-3" role="search" @submit.prevent="searchLocation"
                  style="gap: 0.5rem;">
                  <h4 class="card-title pr-2 fw-bold" style="font-size: 25px;">Search location:</h4>
                  <input type="search" class="form-control" placeholder="Enter city or address..." v-model="searchQuery"
                    style="max-width: 300px;" />
                  

                  <button class="btn btn-outline-success" type="submit" :disabled="loading">
                    <span v-if="!loading">Search</span>
                    <span v-else class="spinner-border spinner-border-sm"></span>
                  </button>
                </form>

              </div><!-- Food Type Filters -->
              <!-- <div class="row mb-3 justify-content-center">
                <div class="col-auto" v-for="type in foodTypes" :key="type.value">
                  <button @click="setActiveType(type.value)" class="btn btn-outline-primary"
                    :class="{ 'active': activeType === type.value }">
                    <i :class="type.icon"></i> {{ type.label }}
                  </button>
                </div>
              </div> -->
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for halal food in {{ searchQuery }}...</p>
            </div>

            <!-- Results -->
            <div v-if="!loading">
              <!-- No Search State -->
              <div v-if="!searchQuery && shops.length === 0" class="text-center py-5">
                <i class="bi bi-shop display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for halal food</h3>
                <p class="text-muted">Enter a city or address to find nearby halal restaurants and shops</p>
              </div>

              <!-- No Results State -->
              <div v-else-if="searchQuery && shops.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No halal food places found</h3>
                <button class="btn btn-link" @click="expandSearchRadius">
                  Try expanding search radius
                </button>
              </div>

              <!-- Results Grid -->
              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col" v-for="shop in filteredShops" :key="shop.id">
                  <div class="card h-100">
                    <div style="padding: 15px 15px 0 15px;">
                      <h1 class="card-title fw-bold text-dark mb-3" style="font-size: 25px;">
                        {{ shop.name || 'Halal Food Place' }}
                      </h1>
                      <!-- <span class="badge bg-success">
                        <i class="bi bi-check-circle-fill me-1"></i> Halal Certified
                      </span> -->
                    </div>
                    <div class="card-body pt-0">
                      <div class="mb-2">
                        <div class="d-flex align-items-start">
                          <i class="bi bi-geo-alt-fill me-2 flex-shrink-0"></i>
                          <span class="text-truncate"
                            style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            {{ shop.address || 'Address not specified' }}
                          </span>
                        </div>
                      </div>

                      <!-- <div class="mb-2">
                        <p class="text-muted mb-0">
                          <i class="bi bi-tag me-2"></i>
                          <small>{{ getShopTypeLabel(shop.type) }}</small>
                        </p>
                      </div> -->

                      <div class="mb-2 d-flex align-items-center">
                        <span class="text-warning me-2">
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star"></i>
                          <i class="bi bi-star"></i>
                        </span>
                        <h6 class="mb-0">{{ (shop.distance / 1000).toFixed(1) }} km away</h6>
                      </div>

                      <div v-if="shop.cuisine" class="mb-2">
                        <small class="text-muted">
                          <strong>Cuisine:</strong> {{ shop.cuisine }}
                        </small>
                      </div>

                      <div v-if="shop.tags?.opening_hours" class="opening-hours mb-2 mt-2">
                        <small class="text-muted">
                          <strong>Opening Times:</strong> {{ shop.tags.opening_hours }}
                        </small>
                      </div>

                      <div class="d-flex justify-content-between align-items-center gap-2 mt-3">

                        <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                          @click="openGoogleMaps(shop.lat, shop.lon)"
                          style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px">
                          <span class="text-center w-100">
                            <i class="bi bi-geo-alt me-1"></i><b>Get Direction</b>
                          </span>
                        </button>

                        <!-- Call Button -->
                        <button v-if="shop.phone"
                          class="btn d-flex align-items-center justify-content-center flex-grow-1"
                          @click="callShop(shop.phone)" style="background: #2c5fa8; color: white; height: 38px">
                          <i class="bi bi-telephone me-1"></i><b>Call</b>
                        </button>
                        
                      </div>
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

      domElementsLoaded: false,
      searchQuery: '',
      activeType: 'all',
      loading: false,
      shops: [],
      currentLocation: null,
      searchRadius: 5000,
      debounceTimeout: null,
      foodTypes: [
        { value: 'all', label: 'All', icon: 'bi bi-shop' },
        { value: 'restaurant', label: 'Restaurants', icon: 'bi bi-egg-fried' },
        { value: 'grocery', label: 'Grocery', icon: 'bi bi-basket' },
        { value: 'butcher', label: 'Butchers', icon: 'bi bi-droplet' }
      ]
    }
  },



  mounted() {
    this.$nextTick(() => {
      this.domElementsLoaded = true;
    });
  },

  computed: {
    filteredShops() {
      let results = this.shops;
      if (this.activeType !== 'all') {
        results = results.filter(shop => shop.type === this.activeType);
      }
      return results;
    },
    labeledShops() {
      return this.filteredShops.map(shop => ({
        ...shop,
        typeLabel: this.getShopTypeLabel(shop.type)
      }));
    }
  },

  methods: {

    safeFocusInput() {
      this.$nextTick(() => {
        const input = this.$refs.searchInput;
        if (input?.focus) input.focus();
      });
    },

    setActiveType(type) {
      this.activeType = type;
    },

    // getShopTypeLabel(type) {
    //   return shopTypeLabels[type] || 'Halal Food Place';
    // },

    validateSearchQuery() {
      if (!this.searchQuery || typeof this.searchQuery !== 'string') {
        throw new Error("Invalid search query");
      }
      return this.searchQuery.trim();
    },

    debounceSearch() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => this.searchLocation(), 800);
    },

    async searchLocation() {
      const query = this.searchQuery.trim();
      if (!query) return;

      this.loading = true;
      this.shops = [];

      try {
        const headers = new Headers({
          'User-Agent': 'HalalFoodLocator/1.0'
        });

        const geocodeRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
          { headers }
        );
        if (!geocodeRes.ok) throw new Error("Location search failed");
        const data = await geocodeRes.json();
        if (!data.length) throw new Error("Location not found");

        const location = data[0];
        this.currentLocation = {
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon),
          display_name: location.display_name
        };

        await this.fetchNearbyShops();
      } catch (err) {
        console.error("Search error:", err);
        alert(err.message || 'Could not find location');
      } finally {
        this.loading = false;
      }
    },

    async fetchNearbyShops() {
      if (!this.currentLocation) return;

      const { lat, lon } = this.currentLocation;
      const radius = this.searchRadius;

      const query = `
        [out:json][timeout:25];
        (
          node["diet:halal"="yes"](around:${radius},${lat},${lon});
          node["cuisine"~"halal|muslim"](around:${radius},${lat},${lon});
          node["shop"~"halal|butcher"](around:${radius},${lat},${lon});
          way["diet:halal"="yes"](around:${radius},${lat},${lon});
          way["cuisine"~"halal|muslim"](around:${radius},${lat},${lon});
          way["shop"~"halal|butcher"](around:${radius},${lat},${lon});
        );
        out center;
      `;

      try {
        const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch food places");

        const json = await res.json();
        this.processShopData(json.elements || []);
      } catch (err) {
        console.error("Fetch error:", err);
        alert(err.message.includes('Too Many Requests')
          ? 'Rate limit hit. Please wait and try again.'
          : 'Could not load halal places');
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

          let type = 'other';
          const tags = element.tags;

          if (tags.shop === 'halal') type = 'grocery';
          else if (tags.shop === 'butcher') type = 'butcher';
          else if (tags.cuisine?.includes('halal') || tags.cuisine?.includes('muslim')) type = 'restaurant';

          const address = [
            tags['addr:street'],
            tags['addr:housenumber'],
            tags['addr:city']
          ].filter(Boolean).join(' ') || tags['addr:full'] || 'Address not specified';

          const distance = this.calculateDistance(
            this.currentLocation.lat, this.currentLocation.lon,
            coords.lat, coords.lon
          );

          shops.push({
            id: element.id,
            name: tags.name || 'Halal Food Place',
            type,
            lat: coords.lat,
            lon: coords.lon,
            address,
            distance,
            cuisine: tags.cuisine || 'Halal',
            phone: tags.phone,
            tags
          });

          seen.add(element.id);
        } catch (e) {
          console.warn("Processing error:", e);
        }
      });

      this.shops = shops.sort((a, b) => a.distance - b.distance);
    },

    expandSearchRadius() {
      this.searchRadius += 2000;
      this.fetchNearbyShops();
    },

    openGoogleMaps(lat, lon) {
      if (!lat || !lon) return;
      window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank');
    },

    callShop(phone) {
      if (phone) {
        window.location.href = `tel:${phone}`;
      }
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3;
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
  }
}
</script>


<style scoped>
.card {
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-outline-primary.active {
  background-color: #2c5fa8;
  color: white;
}

.badge.bg-success {
  background-color: #28a745 !important;
}

@media (max-width: 768px) {
  .d-flex.align-items-center {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
  }
}
</style>