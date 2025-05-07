<template>
  <div class="islamic-locator">
    <!-- Header with Search -->
    <header class="locator-header">
      <div class="header-content">
        <h1>
          <i class="bi bi-shop"></i> Islamic Shops Finder
        </h1>
        <div class="search-container">
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Enter city, address or postal code"
              @keyup.enter="searchLocation"
            >
            <button @click="searchLocation" class="search-btn">
              <i class="bi bi-search"></i>
            </button>
          </div>
          <div class="quick-filters">
            <button 
              v-for="type in shopTypes" 
              :key="type.value"
              @click="setActiveType(type.value)"
              :class="{ active: activeType === type.value }"
            >
              <i :class="type.icon"></i> {{ type.label }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="locator-main">
      <!-- Map View -->
      <div class="map-view" v-if="currentLocation">
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          :src="osmIframeUrl"
          allowfullscreen
        ></iframe>
        <div class="map-controls">
          <button @click="recenterMap" class="control-btn">
            <i class="bi bi-geo-alt"></i>
          </button>
          <button @click="zoomIn" class="control-btn">
            <i class="bi bi-plus-lg"></i>
          </button>
          <button @click="zoomOut" class="control-btn">
            <i class="bi bi-dash-lg"></i>
          </button>
        </div>
      </div>
      <div class="map-placeholder" v-else>
        <i class="bi bi-map"></i>
        <p>Search for a location to view the map</p>
      </div>

      <!-- Results List -->
      <div class="results-panel">
        <div class="results-header">
          <h3 v-if="currentLocation">
            <i class="bi bi-geo-fill"></i> {{ currentLocation.display_name }}
          </h3>
          <div class="results-filter">
            <select v-model="radius" class="radius-select">
              <option value="1000">Within 1 km</option>
              <option value="3000">Within 3 km</option>
              <option value="5000">Within 5 km</option>
            </select>
            <span class="results-count">{{ filteredShops.length }} shops</span>
          </div>
        </div>

        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Finding Islamic shops...</p>
        </div>

        <div v-else-if="!currentLocation" class="empty-state">
          <i class="bi bi-compass"></i>
          <p>Enter a location to find nearby Islamic shops</p>
        </div>

        <div v-else-if="filteredShops.length === 0" class="empty-state">
          <i class="bi bi-shop"></i>
          <p>No Islamic shops found in this area</p>
          <button @click="expandSearch" class="expand-btn">
            Expand search radius
          </button>
        </div>

        <ul v-else class="shop-list">
          <li 
            v-for="shop in filteredShops" 
            :key="shop.id"
            @click="focusOnShop(shop)"
            :class="{ highlighted: highlightedShop === shop.id }"
          >
            <div class="shop-icon">
              <i :class="getShopIcon(shop)"></i>
            </div>
            <div class="shop-details">
              <h4>{{ shop.name || 'Islamic Shop' }}</h4>
              <p class="shop-address">
                <i class="bi bi-geo-alt"></i> {{ shop.address }}
              </p>
              <p class="shop-distance">
                {{ (shop.distance / 1000).toFixed(1) }} km away
              </p>
            </div>
            <div class="shop-actions">
              <a 
                :href="`https://www.openstreetmap.org/?mlat=${shop.lat}&mlon=${shop.lon}&#map=18/${shop.lat}/${shop.lon}`" 
                target="_blank"
                class="action-btn"
                title="View on Map"
              >
                <i class="bi bi-map"></i>
              </a>
              <a 
                :href="`https://www.google.com/maps?q=${shop.lat},${shop.lon}`" 
                target="_blank"
                class="action-btn primary"
                title="Get Directions"
              >
                <i class="bi bi-signpost"></i>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'IslamicShopsLocator',
  data() {
    return {
      searchQuery: '',
      activeType: 'all',
      radius: 3000,
      currentLocation: null,
      shops: [],
      isLoading: false,
      zoomLevel: 15,
      highlightedShop: null,
      shopTypes: [
        { value: 'all', label: 'All', icon: 'bi bi-shop' },
        { value: 'halal', label: 'Halal', icon: 'bi bi-egg-fried' },
        { value: 'bookstore', label: 'Books', icon: 'bi bi-book' },
        { value: 'clothing', label: 'Clothing', icon: 'bi bi-person' }
      ]
    }
  },
  computed: {
    filteredShops() {
      return this.shops
        .filter(shop => {
          if (this.activeType === 'all') return true;
          return this.getShopType(shop) === this.activeType;
        })
        .filter(shop => shop.distance <= this.radius)
        .sort((a, b) => a.distance - b.distance);
    },
    osmIframeUrl() {
      if (!this.currentLocation) return '';
      const { lat, lon } = this.currentLocation;
      return `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lon}`;
    }
  },
  methods: {
    async searchLocation() {
      if (!this.searchQuery.trim()) return;
      
      this.isLoading = true;
      try {
        // Use Nominatim for geocoding (free, no API key needed)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(this.searchQuery)}&format=json&addressdetails=1&limit=1`
        );
        
        if (!response.ok) throw new Error('Location search failed');
        
        const data = await response.json();
        if (data.length === 0) throw new Error('Location not found');
        
        this.currentLocation = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          display_name: data[0].display_name.split(',').slice(0, 3).join(',')
        };
        
        this.findNearbyShops();
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async findNearbyShops() {
      if (!this.currentLocation) return;
      
      this.isLoading = true;
      try {
        // Use Overpass API to find Islamic shops (free, no API key needed)
        const { lat, lon } = this.currentLocation;
        const radius = this.radius;
        const overpassQuery = `
          [out:json];
          (
            node["shop"="halal"](around:${radius},${lat},${lon});
            node["shop"="books"]["religion"="muslim"](around:${radius},${lat},${lon});
            node["shop"="clothing"]["religion"="muslim"](around:${radius},${lat},${lon});
            node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lon});
          );
          out body;
          >;
          out skel qt;
        `;
        
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
        );
        
        if (!response.ok) throw new Error('Shop search failed');
        
        const data = await response.json();
        this.processShopData(data.elements);
      } catch (error) {
        console.error("Shop search error:", error);
      } finally {
        this.isLoading = false;
      }
    },
    
    processShopData(elements) {
      const shops = [];
      const seenIds = new Set();
      const { lat: centerLat, lon: centerLon } = this.currentLocation;
      
      elements.forEach(element => {
        if (!element.tags || seenIds.has(element.id)) return;
        
        const shop = {
          id: element.id,
          lat: element.lat,
          lon: element.lon,
          name: element.tags.name || '',
          address: this.getAddress(element),
          distance: this.calculateDistance(
            centerLat, centerLon, 
            element.lat, element.lon
          )
        };
        
        shops.push(shop);
        seenIds.add(element.id);
      });
      
      this.shops = shops;
    },
    
    getAddress(element) {
      const { tags } = element;
      if (tags['addr:street']) {
        return `${tags['addr:street']}${tags['addr:housenumber'] ? ' ' + tags['addr:housenumber'] : ''}, ${tags['addr:city'] || ''}`;
      }
      return tags['addr:full'] || '';
    },
    
    calculateDistance(lat1, lon1, lat2, lon2) {
      // Haversine formula (meters)
      const R = 6371e3;
      const φ1 = lat1 * Math.PI/180;
      const φ2 = lat2 * Math.PI/180;
      const Δφ = (lat2-lat1) * Math.PI/180;
      const Δλ = (lon2-lon1) * Math.PI/180;
      
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      
      return R * c;
    },
    
    getShopType(shop) {
      // Determine type based on OSM tags (would be implemented with real data)
      return 'halal'; // Simplified for example
    },
    
    getShopIcon(shop) {
      switch (this.getShopType(shop)) {
        case 'halal': return 'bi bi-egg-fried';
        case 'bookstore': return 'bi bi-book';
        case 'clothing': return 'bi bi-person';
        default: return 'bi bi-shop';
      }
    },
    
    setActiveType(type) {
      this.activeType = type;
    },
    
    focusOnShop(shop) {
      this.highlightedShop = shop.id;
      // Center map on this shop
      this.currentLocation = { ...this.currentLocation, lat: shop.lat, lon: shop.lon };
    },
    
    recenterMap() {
      if (this.currentLocation) {
        // Reset to original search location
        this.searchLocation();
      }
    },
    
    zoomIn() {
      this.zoomLevel = Math.min(this.zoomLevel + 1, 18);
    },
    
    zoomOut() {
      this.zoomLevel = Math.max(this.zoomLevel - 1, 12);
    },
    
    expandSearch() {
      this.radius = parseInt(this.radius) + 2000;
      this.findNearbyShops();
    }
  }
}
</script>

<style scoped>
.islamic-locator {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
}

.locator-header {
  background: #2c5fa8;
  color: white;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header-content h1 {
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-box {
  display: flex;
  background: white;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-box input {
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: none;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
}

.search-btn {
  background: #234a87;
  color: white;
  border: none;
  padding: 0 1.2rem;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #1a3a6e;
}

.quick-filters {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.quick-filters button {
  background: rgba(255,255,255,0.1);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.quick-filters button:hover {
  background: rgba(255,255,255,0.2);
}

.quick-filters button.active {
  background: white;
  color: #2c5fa8;
  font-weight: 500;
}

.locator-main {
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
}

.map-view, .map-placeholder {
  flex: 1;
  position: relative;
}

.map-view iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  background: #f0f0f0;
}

.map-placeholder i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.map-placeholder p {
  margin: 0;
  font-size: 1.1rem;
}

.map-controls {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-btn {
  background: white;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  cursor: pointer;
  color: #2c5fa8;
  font-size: 1.1rem;
}

.results-panel {
  width: 350px;
  background: white;
  border-left: 1px solid #eee;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.results-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.results-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
}

.results-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.radius-select {
  padding: 0.3rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.results-count {
  font-size: 0.9rem;
  color: #666;
}

.loading-state, .empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #666;
  text-align: center;
}

.loading-state .spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(44, 95, 168, 0.2);
  border-top: 3px solid #2c5fa8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.empty-state i {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #999;
}

.empty-state p {
  margin: 0 0 1rem 0;
}

.expand-btn {
  background: #2c5fa8;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.shop-list {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}

.shop-list li {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.shop-list li:hover {
  background: #f8f9fa;
}

.shop-list li.highlighted {
  background: #e8f0fe;
}

.shop-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: #e8f0fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c5fa8;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.shop-details {
  flex: 1;
  min-width: 0;
}

.shop-details h4 {
  margin: 0 0 0.3rem 0;
  font-size: 1rem;
  color: #2c5fa8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shop-address {
  margin: 0 0 0.3rem 0;
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.shop-distance {
  margin: 0;
  font-size: 0.8rem;
  color: #2c5fa8;
  font-weight: 500;
}

.shop-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  color: #666;
  text-decoration: none;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #e0e0e0;
}

.action-btn.primary {
  background: #2c5fa8;
  color: white;
}

.action-btn.primary:hover {
  background: #234a87;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .locator-main {
    flex-direction: column;
  }
  
  .results-panel {
    width: 100%;
    height: 300px;
  }
  
  .map-view {
    height: 300px;
  }
}
</style>