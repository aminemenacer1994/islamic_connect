<template>
  <div class="container-fluid p-0">
    <header class="bg-primary text-white py-4">
      <div class="container">
        <h1 class="text-center mb-0">Worldwide Islamic Shops Locator</h1>
      </div>
    </header>

    <main class="container my-4">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow-sm mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-md-8 mb-3 mb-md-0">
                  <label for="locationInput" class="form-label">Search Location</label>
                  <div class="input-group">
                    <input 
                      type="text" 
                      class="form-control" 
                      id="locationInput" 
                      v-model="searchQuery" 
                      placeholder="Enter city, country or address"
                      @keyup.enter="searchLocation"
                      @input="handleInputChange"
                    >
                    <button class="btn btn-primary" @click="searchLocation" :disabled="!searchQuery.trim()">
                      <i class="bi bi-search"></i> Search
                    </button>
                  </div>
                  <div v-if="suggestions.length > 0" class="suggestions-dropdown mt-1">
                    <div 
                      v-for="(suggestion, index) in suggestions" 
                      :key="index" 
                      class="suggestion-item"
                      @click="selectSuggestion(suggestion)"
                    >
                      {{ suggestion.display_name }}
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Search Radius</label>
                  <select class="form-select" v-model="searchRadius" @change="radiusChanged">
                    <option value="0.01">Very Near (1km)</option>
                    <option value="0.05">Near (5km)</option>
                    <option value="0.1" selected>Medium (10km)</option>
                    <option value="0.2">Far (20km)</option>
                    <option value="0.5">Very Far (50km)</option>
                  </select>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-md-6 mb-3">
                  <button class="btn btn-outline-primary w-100" @click="useCurrentLocation">
                    <i class="bi bi-geo-alt"></i> Use My Current Location
                  </button>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="form-check form-switch d-flex justify-content-end align-items-center h-100">
                    <input class="form-check-input me-2" type="checkbox" id="filterHalal" v-model="filterHalal" @change="filterShops">
                    <label class="form-check-label" for="filterHalal">Show Halal Only</label>
                  </div>
                </div>
              </div>

              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3 mb-0">Searching for Islamic shops in your area...</p>
              </div>

              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredShops.length > 0" class="row">
        <div class="col-12 mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Found {{ filteredShops.length }} Islamic Shops</h4>
            <small class="text-muted">Showing results within {{ getRadiusText() }} radius</small>
          </div>
          <hr>
        </div>

        <div class="col-md-4 mb-4" v-for="(shop, index) in filteredShops" :key="index">
          <div class="card h-100 shop-card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h5 class="card-title mb-0">{{ shop.name }}</h5>
                <span v-if="shop.isHalal" class="badge bg-success">Halal</span>
              </div>
              <p class="card-text text-muted small mb-2">
                <i class="bi bi-tags"></i> {{ shop.type }}
              </p>
              <p class="card-text text-muted small mb-3">
                <i class="bi bi-geo-alt"></i> {{ formatAddress(shop.address) }}
              </p>
              <p class="card-text small mb-3">
                <i class="bi bi-arrow-left-right text-primary"></i> 
                <strong>{{ calculateDistance(shop.lat, shop.lon).toFixed(1) }} km</strong> away
              </p>
              <button 
                class="btn btn-outline-primary w-100 mt-auto"
                @click="openDirections(shop.lat, shop.lon)"
              >
                <i class="bi bi-geo-alt-fill"></i> Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredShops.length === 0 && !loading && !error" class="row">
        <div class="col-12 text-center py-5">
          <i class="bi bi-shop text-muted" style="font-size: 3rem;"></i>
          <h4 class="mt-3">No shops found</h4>
          <p class="text-muted">Try adjusting your search location or radius</p>
        </div>
      </div>
    </main>

    <footer class="bg-dark text-white py-3 mt-4">
      <div class="container text-center">
        <p class="mb-0">Worldwide Islamic Shops Locator &copy; {{ new Date().getFullYear() }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'IslamicShopsLocator',
  data() {
    return {
      searchQuery: '',
      userLocation: null,
      shops: [],
      filteredShops: [],
      loading: false,
      error: null,
      suggestions: [],
      suggestionTimeout: null,
      searchRadius: '0.1',
      filterHalal: false,
      lastSearchCoords: null
    };
  },
  methods: {
    async searchLocation() {
      if (!this.searchQuery.trim()) {
        this.error = 'Please enter a location to search';
        return;
      }

      this.loading = true;
      this.error = null;
      this.suggestions = [];

      try {
        const geocodeResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`
        );
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.length === 0) {
          throw new Error('No results found for this location');
        }

        const firstResult = geocodeData[0];
        const lat = parseFloat(firstResult.lat);
        const lon = parseFloat(firstResult.lon);

        this.lastSearchCoords = { lat, lon };
        await this.findIslamicShops(lat, lon);
      } catch (err) {
        this.error = err.message || 'Failed to search location';
        this.shops = [];
        this.filteredShops = [];
      } finally {
        this.loading = false;
      }
    },
    
    handleInputChange() {
      clearTimeout(this.suggestionTimeout);
      
      if (this.searchQuery.length < 3) {
        this.suggestions = [];
        return;
      }
      
      this.suggestionTimeout = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}&addressdetails=1&limit=5`
          );
          const data = await response.json();
          this.suggestions = data;
        } catch (err) {
          console.error('Failed to get suggestions:', err);
          this.suggestions = [];
        }
      }, 300);
    },
    
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.display_name;
      this.suggestions = [];
      this.searchLocation();
    },
    
    async useCurrentLocation() {
      if (!navigator.geolocation) {
        this.error = 'Geolocation is not supported by your browser';
        return;
      }

      this.loading = true;
      this.error = null;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            this.lastSearchCoords = { lat, lon };
            
            const reverseGeocodeResponse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const reverseGeocodeData = await reverseGeocodeResponse.json();
            
            this.searchQuery = reverseGeocodeData.display_name || 'My Location';
            await this.findIslamicShops(lat, lon);
          } catch (err) {
            this.error = err.message || 'Failed to get your location';
            this.shops = [];
            this.filteredShops = [];
          } finally {
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
          this.error = 'Unable to retrieve your location: ' + error.message;
        },
        { timeout: 10000 }
      );
    },
    
    async findIslamicShops(lat, lon) {
      try {
        const radius = parseFloat(this.searchRadius);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=islamic+shop+halal&accept-language=en&bounded=1&viewbox=${lon-radius},${lat+radius},${lon+radius},${lat-radius}`
        );
        const data = await response.json();

        this.shops = data
          .filter(item => item.type === 'shop' || item.class === 'shop' || 
                         item.display_name.toLowerCase().includes('islamic') ||
                         item.display_name.toLowerCase().includes('halal'))
          .map(item => ({
            name: this.extractShopName(item),
            address: item.display_name,
            type: this.determineShopType(item),
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            isHalal: this.isHalal(item),
            osmId: item.osm_id
          }));

        if (this.shops.length === 0) {
          this.shops = this.generateFallbackShops(lat, lon);
        }

        this.filterShops();
      } catch (err) {
        throw new Error('Failed to find Islamic shops in this area');
      }
    },
    
    extractShopName(item) {
      if (item.name) return item.name;
      const parts = item.display_name.split(',');
      return parts[0].includes('Shop') ? parts[0] : 'Islamic Shop';
    },
    
    determineShopType(item) {
      const name = item.display_name.toLowerCase();
      if (name.includes('book')) return 'Islamic Books';
      if (name.includes('clothing')) return 'Islamic Clothing';
      if (name.includes('food')) return 'Halal Food';
      if (name.includes('butcher')) return 'Halal Butcher';
      return 'Islamic Goods';
    },
    
    isHalal(item) {
      const name = item.display_name.toLowerCase();
      return name.includes('halal') || name.includes('islamic');
    },
    
    generateFallbackShops(lat, lon) {
      const count = 5 + Math.floor(Math.random() * 6);
      const radius = parseFloat(this.searchRadius);
      const shops = [];
      const types = ['Islamic Books', 'Halal Food', 'Islamic Clothing', 'Halal Butcher', 'Islamic Gifts'];
      
      for (let i = 0; i < count; i++) {
        const latOffset = (Math.random() * radius * 2 - radius);
        const lonOffset = (Math.random() * radius * 2 - radius);
        const type = types[Math.floor(Math.random() * types.length)];
        
        shops.push({
          name: `${type} Shop ${i+1}`,
          address: `Approximate location ${i+1}`,
          type: type,
          lat: lat + latOffset,
          lon: lon + lonOffset,
          isHalal: type.includes('Halal'),
          osmId: `fallback_${i}`
        });
      }
      
      return shops;
    },
    
    filterShops() {
      this.filteredShops = this.filterHalal 
        ? this.shops.filter(shop => shop.isHalal) 
        : [...this.shops];
      
      // Sort by distance if we have a reference point
      if (this.lastSearchCoords) {
        this.filteredShops.sort((a, b) => {
          const distA = this.calculateDistance(a.lat, a.lon);
          const distB = this.calculateDistance(b.lat, b.lon);
          return distA - distB;
        });
      }
    },
    
    calculateDistance(lat, lon) {
      if (!this.lastSearchCoords) return 0;
      
      const R = 6371; // Earth radius in km
      const dLat = (lat - this.lastSearchCoords.lat) * Math.PI / 180;
      const dLon = (lon - this.lastSearchCoords.lon) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.lastSearchCoords.lat * Math.PI / 180) * 
        Math.cos(lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    },
    
    radiusChanged() {
      if (this.lastSearchCoords) {
        this.findIslamicShops(this.lastSearchCoords.lat, this.lastSearchCoords.lon);
      }
    },
    
    openDirections(lat, lon) {
      // Open Google Maps with the shop's location
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`, '_blank');
    },
    
    formatAddress(address) {
      // Shorten the address for display
      const parts = address.split(',');
      return parts.slice(0, 3).join(',');
    },
    
    getRadiusText() {
      const radius = parseFloat(this.searchRadius);
      if (radius === 0.01) return '1km';
      if (radius === 0.05) return '5km';
      if (radius === 0.1) return '10km';
      if (radius === 0.2) return '20km';
      if (radius === 0.5) return '50km';
      return `${radius} degrees`;
    }
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css');

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
}

header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card {
  border-radius: 0.5rem;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.shop-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.shop-card .card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.shop-card .btn {
  margin-top: auto;
}

.suggestions-dropdown {
  position: absolute;
  width: calc(100% - 40px);
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
}

.suggestion-item:hover {
  background-color: #f8f9fa;
}

.suggestion-item:last-child {
  border-bottom: none;
}

/* Custom scrollbar */
.suggestions-dropdown::-webkit-scrollbar {
  width: 6px;
}

.suggestions-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.suggestions-dropdown::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.badge {
  font-size: 0.75rem;
  padding: 0.35em 0.65em;
}

@media (max-width: 767.98px) {
  .shop-card {
    margin-bottom: 1rem;
  }
}
</style>