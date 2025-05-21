<template>
  <div class="container-fluid islamic-travel-locator">
    <header class="text-center py-4 bg-primary text-white">
      <h1>Worldwide Islamic Travel Agency Locator</h1>
      <p class="lead">Find Halal-friendly travel services around the world</p>
    </header>

    <main class="my-4">
      <div class="row">
        <div class="col-md-4">
          <div class="card search-card">
            <div class="card-body">
              <div class="mb-3">
                <label for="locationInput" class="form-label">Search Location</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="locationInput" 
                  v-model="searchQuery"
                  placeholder="City, Country or Address"
                  @keyup.enter="searchLocation"
                >
              </div>
              <div class="mb-3">
                <label for="searchRadius" class="form-label">Search Radius (km)</label>
                <select class="form-select" id="searchRadius" v-model="searchRadius">
                  <option value="1">1 km</option>
                  <option value="5">5 km</option>
                  <option value="10" selected>10 km</option>
                  <option value="20">20 km</option>
                  <option value="50">50 km</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="businessType" class="form-label">Business Type</label>
                <select class="form-select" id="businessType" v-model="businessType">
                  <option value="travel_agency">Travel Agencies</option>
                  <option value="restaurant">Halal Restaurants</option>
                  <option value="hotel">Halal Hotels</option>
                  <option value="mosque">Mosques</option>
                  <option value="all">All Islamic Services</option>
                </select>
              </div>
              <button 
                class="btn btn-primary w-100" 
                @click="searchLocation"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isLoading ? 'Searching...' : 'Search' }}
              </button>
            </div>
          </div>

          <div class="card mt-3 results-card" v-if="results.length > 0">
            <div class="card-header bg-secondary text-white">
              <h5 class="mb-0">Search Results ({{ results.length }})</h5>
            </div>
            <div class="card-body p-0">
              <ul class="list-group list-group-flush result-list">
                <li 
                  v-for="(result, index) in results" 
                  :key="index"
                  class="list-group-item result-item"
                  :class="{ active: activeResultIndex === index }"
                  @click="setActiveResult(index)"
                >
                  <h6 class="mb-1">{{ result.tags.name || 'Unnamed Location' }}</h6>
                  <p class="mb-1 text-muted small">{{ getBusinessType(result.tags) }}</p>
                  <p class="mb-1 small">{{ result.tags['addr:street'] || '' }} {{ result.tags['addr:housenumber'] || '' }}</p>
                  <p class="mb-0 small">{{ result.tags['addr:city'] || '' }} {{ result.tags['addr:postcode'] || '' }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card map-container">
            <div class="card-body p-0 position-relative">
              <div id="map" class="map" ref="mapElement"></div>
              <div v-if="isLoadingMap" class="map-loading-overlay">
                <div class="spinner-container">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading map...</span>
                  </div>
                </div>
              </div>
              <div v-if="noResults" class="no-results-overlay">
                <div class="alert alert-warning m-3">
                  No results found for your search. Try a different location or wider radius.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="text-center py-3 bg-light mt-4">
      <p class="mb-0">© {{ currentYear }} Islamic Travel Locator - Find Halal-friendly travel services worldwide</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'IslamicTravelLocator',
  data() {
    return {
      searchQuery: '',
      searchRadius: '10',
      businessType: 'travel_agency',
      isLoading: false,
      isLoadingMap: false,
      noResults: false,
      results: [],
      activeResultIndex: null,
      map: null,
      markers: [],
      currentYear: new Date().getFullYear()
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.isLoadingMap = true;
      
      // Load Leaflet CSS and JS dynamically
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      leafletCSS.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
      leafletCSS.crossOrigin = '';
      document.head.appendChild(leafletCSS);
      
      const leafletJS = document.createElement('script');
      leafletJS.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      leafletJS.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
      leafletJS.crossOrigin = '';
      leafletJS.onload = () => {
        this.setupMap();
      };
      document.head.appendChild(leafletJS);
    },
    setupMap() {
      // Create map centered on Mecca by default
      this.map = L.map(this.$refs.mapElement).setView([21.3891, 39.8579], 3);
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(this.map);
      
      this.isLoadingMap = false;
    },
    async searchLocation() {
      if (!this.searchQuery.trim()) {
        alert('Please enter a location to search');
        return;
      }
      
      this.isLoading = true;
      this.noResults = false;
      this.clearMarkers();
      
      try {
        // First geocode the search query to get coordinates
        const geocodeResponse = await this.geocodeLocation(this.searchQuery);
        
        if (geocodeResponse.length === 0) {
          this.noResults = true;
          this.isLoading = false;
          return;
        }
        
        const { lat, lon } = geocodeResponse[0];
        
        // Center map on the searched location
        this.map.setView([lat, lon], 13);
        
        // Add marker for searched location
        const marker = L.marker([lat, lon]).addTo(this.map)
          .bindPopup(`<b>Search Location:</b><br>${this.searchQuery}`);
        this.markers.push(marker);
        
        // Now search for Islamic businesses around this location
        await this.searchIslamicBusinesses(lat, lon);
        
      } catch (error) {
        console.error('Search error:', error);
        alert('An error occurred during search. Please try again.');
      } finally {
        this.isLoading = false;
      }
    },
    async geocodeLocation(query) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      return await response.json();
    },
    async searchIslamicBusinesses(lat, lon) {
      const radius = this.searchRadius * 1000; // Convert km to meters
      
      let overpassQuery = `
        [out:json];
        (
      `;
      
      // Build query based on selected business type
      if (this.businessType === 'travel_agency' || this.businessType === 'all') {
        overpassQuery += `
          node["tourism"="travel_agency"](around:${radius},${lat},${lon});
          way["tourism"="travel_agency"](around:${radius},${lat},${lon});
          relation["tourism"="travel_agency"](around:${radius},${lat},${lon});
        `;
      }
      
      if (this.businessType === 'restaurant' || this.businessType === 'all') {
        overpassQuery += `
          node["cuisine"="halal"](around:${radius},${lat},${lon});
          way["cuisine"="halal"](around:${radius},${lat},${lon});
          relation["cuisine"="halal"](around:${radius},${lat},${lon});
          node["diet:halal"="yes"](around:${radius},${lat},${lon});
          way["diet:halal"="yes"](around:${radius},${lat},${lon});
          relation["diet:halal"="yes"](around:${radius},${lat},${lon});
        `;
      }
      
      if (this.businessType === 'hotel' || this.businessType === 'all') {
        overpassQuery += `
          node["tourism"="hotel"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          way["tourism"="hotel"]["diet:halal"="yes"](around:${radius},${lat},${lon});
          relation["tourism"="hotel"]["diet:halal"="yes"](around:${radius},${lat},${lon});
        `;
      }
      
      if (this.businessType === 'mosque' || this.businessType === 'all') {
        overpassQuery += `
          node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
          way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
          relation["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
        `;
      }
      
      overpassQuery += `
        );
        out center;
      `;
      
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
      );
      
      const data = await response.json();
      this.results = data.elements || [];
      
      if (this.results.length === 0) {
        this.noResults = true;
      } else {
        this.plotResultsOnMap();
        this.setActiveResult(0); // Auto-select first result
      }
    },
    plotResultsOnMap() {
      this.clearMarkers();
      
      this.results.forEach((result, index) => {
        let lat, lon;
        
        if (result.center) {
          lat = result.center.lat;
          lon = result.center.lon;
        } else {
          lat = result.lat;
          lon = result.lon;
        }
        
        const marker = L.marker([lat, lon]).addTo(this.map)
          .bindPopup(`<b>${result.tags.name || 'Unnamed Location'}</b><br>${this.getBusinessType(result.tags)}`);
        
        marker.on('click', () => {
          this.setActiveResult(index);
        });
        
        this.markers.push(marker);
      });
      
      // Create a feature group and fit bounds to show all markers
      if (this.markers.length > 0) {
        const group = new L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds().pad(0.1));
      }
    },
    clearMarkers() {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];
    },
    setActiveResult(index) {
      this.activeResultIndex = index;
      const result = this.results[index];
      
      let lat, lon;
      if (result.center) {
        lat = result.center.lat;
        lon = result.center.lon;
      } else {
        lat = result.lat;
        lon = result.lon;
      }
      
      // Center on the selected result
      this.map.setView([lat, lon], 15);
      
      // Open the marker's popup
      this.markers[index].openPopup();
    },
    getBusinessType(tags) {
      if (tags['tourism'] === 'travel_agency') return 'Travel Agency';
      if (tags['amenity'] === 'place_of_worship' && tags['religion'] === 'muslim') return 'Mosque';
      if (tags['cuisine'] === 'halal' || tags['diet:halal'] === 'yes') {
        if (tags['amenity'] === 'restaurant') return 'Halal Restaurant';
        return 'Halal Food Service';
      }
      if (tags['tourism'] === 'hotel' && tags['diet:halal'] === 'yes') return 'Halal Hotel';
      
      return 'Islamic Service';
    }
  }
};
</script>

<style scoped>
.islamic-travel-locator {
  min-height: 100vh;
  background-color: #f8f9fa;
}

header {
  background: linear-gradient(135deg, #0d6efd 0%, #198754 100%);
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-card, .results-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 8px;
}

.search-card .card-body {
  padding: 1.5rem;
}

.map-container {
  height: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 8px;
}

.map {
  height: 70vh;
  width: 100%;
  border-radius: 8px;
  z-index: 1;
}

.map-loading-overlay, .no-results-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 2;
  border-radius: 8px;
}

.spinner-container {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}

.result-list {
  max-height: 60vh;
  overflow-y: auto;
}

.result-item {
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.result-item:hover {
  background-color: #f1f1f1;
  border-left: 3px solid #0d6efd;
}

.result-item.active {
  background-color: #e7f1ff;
  border-left: 3px solid #0d6efd;
}

footer {
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .map {
    height: 50vh;
  }
  
  .result-list {
    max-height: 40vh;
  }
}
</style>