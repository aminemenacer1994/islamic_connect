<template>
  <div class="container-fluid travel-agency-locator">
    <header class="text-center py-4 bg-primary text-white">
      <h1>Islamic Travel Agency Finder</h1>
      <p class="lead">Locate halal-friendly travel services worldwide</p>
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
                <label class="form-label">Search Type</label>
                <div class="form-check">
                  <input class="form-check-input" type="radio" v-model="searchPreference" id="islamicOnly" value="islamic">
                  <label class="form-check-label" for="islamicOnly">
                    Islamic Agencies Only
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" v-model="searchPreference" id="allAgencies" value="all" checked>
                  <label class="form-check-label" for="allAgencies">
                    All Travel Agencies
                  </label>
                </div>
              </div>
              <button 
                class="btn btn-primary w-100" 
                @click="searchLocation"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                {{ isLoading ? 'Searching...' : 'Find Travel Agencies' }}
              </button>
            </div>
          </div>

          <div class="card mt-3 results-card" v-if="results.length > 0">
            <div class="card-header bg-secondary text-white">
              <h5 class="mb-0">Found Agencies ({{ results.length }})</h5>
            </div>
            <div class="card-body p-0">
              <ul class="list-group list-group-flush result-list">
                <li 
                  v-for="(result, index) in results" 
                  :key="index"
                  class="list-group-item result-item"
                  :class="{ 
                    active: activeResultIndex === index,
                    'islamic-agency': isIslamicAgency(result.tags)
                  }"
                  @click="setActiveResult(index)"
                >
                  <h6 class="mb-1">{{ result.tags.name || 'Unnamed Travel Agency' }}</h6>
                  <span v-if="isIslamicAgency(result.tags)" class="badge bg-success mb-2">Islamic</span>
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
                  No travel agencies found in this area. Try a different location or wider radius.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'TravelAgencyLocator',
  data() {
    return {
      searchQuery: '',
      searchRadius: '10',
      searchPreference: 'all',
      isLoading: false,
      isLoadingMap: false,
      noResults: false,
      results: [],
      activeResultIndex: null,
      map: null,
      markers: [],
      currentSource: 'Overpass',
      currentLocation: { lat: 21.3891, lng: 39.8579 }
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.isLoadingMap = true;
      
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      document.head.appendChild(leafletCSS);
      
      const leafletJS = document.createElement('script');
      leafletJS.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      leafletJS.onload = () => {
        this.setupMap();
      };
      document.head.appendChild(leafletJS);
    },
    setupMap() {
      // Use the currentLocation data property
      this.map = L.map(this.$refs.mapElement).setView(
        [this.currentLocation.lat, this.currentLocation.lng], 
        3
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
        const geocodeResponse = await this.geocodeLocation(this.searchQuery);
        
        if (geocodeResponse.length === 0) {
          this.noResults = true;
          this.isLoading = false;
          return;
        }
        
        // Store the current location
        this.currentLocation = {
          lat: parseFloat(geocodeResponse[0].lat),
          lng: parseFloat(geocodeResponse[0].lon)
        };
        
        // Safely set map view
        if (this.map) {
          this.map.setView(
            [this.currentLocation.lat, this.currentLocation.lng], 
            13
          );
          
          // Add center marker
          const marker = L.marker([this.currentLocation.lat, this.currentLocation.lng])
            .addTo(this.map)
            .bindPopup(`<b>Search Center:</b><br>${this.searchQuery}`);
          this.markers.push(marker);
        }
        
        await this.searchAllSources(this.currentLocation.lat, this.currentLocation.lng);
        
      } catch (error) {
        console.error('Search error:', error);
        alert('An error occurred during search. Please try again.');
      } finally {
        this.isLoading = false;
      }
    },
    
     // Modified to ensure valid coordinates
     async searchAllSources(lat, lng) {
      const radius = this.searchRadius * 1000;
      
      // Validate coordinates
      if (isNaN(lat)) lat = this.currentLocation.lat;
      if (isNaN(lng)) lng = this.currentLocation.lng;
      
      // 1. First try Overpass API
      this.currentSource = 'Overpass';
      this.results = await this.searchOverpass(lat, lng, radius);
      
      // 2. If no results, try Wikidata
      if (this.results.length === 0) {
        this.currentSource = 'Wikidata';
        this.results = await this.searchWikidata(lat, lng, radius);
      }
      
      // 3. If still no results, try GeoNames
      if (this.results.length === 0) {
        this.currentSource = 'GeoNames';
        const nearbyCities = await this.getNearbyCities(lat, lng);
        if (nearbyCities.length > 0) {
          for (const city of nearbyCities.slice(0, 3)) {
            const cityLat = parseFloat(city.lat);
            const cityLng = parseFloat(city.lng);
            if (!isNaN(cityLat) && !isNaN(cityLng)) {
              this.results = await this.searchOverpass(cityLat, cityLng, radius);
              if (this.results.length > 0) break;
            }
          }
        }
      }
      
      if (this.results.length === 0) {
        this.noResults = true;
        this.suggestAlternativeLocations();
      } else {
        this.plotResultsOnMap();
        this.setActiveResult(0);
      }
    },
    
    async geocodeLocation(query) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      return await response.json();
    },
    
    async searchOverpass(lat, lon, radius) {
      let query = `
        [out:json];
        (
          node["tourism"~"travel_agency|tour_operator"](around:${radius},${lat},${lon});
          way["tourism"~"travel_agency|tour_operator"](around:${radius},${lat},${lon});
      `;
      
      if (this.searchPreference === 'islamic') {
        query += `
          node["tourism"~"travel_agency|tour_operator"]["name"~"islamic|muslim|halal|hajj|umrah",i](around:${radius},${lat},${lon});
          node["tourism"~"travel_agency|tour_operator"]["description"~"islamic|muslim|halal|hajj|umrah",i](around:${radius},${lat},${lon});
        `;
      }
      
      query += `); out center;`;
      
      try {
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        return data.elements || [];
      } catch (error) {
        console.error('Overpass error:', error);
        return [];
      }
    },
    
    async searchWikidata(lat, lon, radius) {
      // Convert radius to degrees (approximate)
      const radiusDeg = radius / 111000;
      
      try {
        const query = `
          SELECT ?item ?itemLabel ?location WHERE {
            SERVICE wikibase:around {
              ?item wdt:P625 ?location.
              bd:serviceParam wikibase:center "Point(${lon} ${lat})"^^geo:wktLiteral.
              bd:serviceParam wikibase:radius "${radiusDeg}".
            }
            ?item wdt:P31 wd:Q16334295.  # Travel agency
            OPTIONAL { ?item wdt:P17 ?country. }
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          }
        `;
        
        const response = await fetch(
          `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}`,
          { headers: { Accept: 'application/json' } }
        );
        
        const data = await response.json();
        return data.results.bindings.map(item => {
          const coords = item.location.value.match(/Point\(([^ ]+) ([^ ]+)\)/);
          return {
            type: 'node',
            lat: parseFloat(coords[2]),
            lon: parseFloat(coords[1]),
            tags: {
              name: item.itemLabel.value,
              wikidata: item.item.value.split('/').pop()
            }
          };
        });
      } catch (error) {
        console.error('Wikidata error:', error);
        return [];
      }
    },
    
    async getNearbyCities(lat, lon) {
      try {
        const response = await fetch(
          `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&radius=${this.searchRadius}&maxRows=5&username=demo`
        );
        const data = await response.json();
        return data.geonames || [];
      } catch (error) {
        console.error('GeoNames error:', error);
        return [];
      }
    },
    
    suggestAlternativeLocations() {
      const suggestions = {
        'London': ['Whitechapel', 'Edgware Road', 'Brick Lane'],
        'Dubai': ['Deira', 'Bur Dubai', 'Al Barsha'],
        'Kuala Lumpur': ['Ampang', 'Bangsar', 'Putrajaya']
      };
      
      const cityMatch = Object.keys(suggestions).find(city => 
        this.searchQuery.toLowerCase().includes(city.toLowerCase())
      );
      
      if (cityMatch) {
        this.results = suggestions[cityMatch].map(area => ({
          type: 'suggestion',
          tags: {
            name: `Try searching in ${area}, ${cityMatch}`,
            suggestion: true
          }
        }));
      }
    },
    plotResultsOnMap() {
      this.clearMarkers();
      
      this.results.forEach((result, index) => {
        let lat, lng;
        
        if (result.center) {
          lat = parseFloat(result.center.lat);
          lng = parseFloat(result.center.lon);
        } else if (result.lat && result.lon) {
          lat = parseFloat(result.lat);
          lng = parseFloat(result.lon);
        } else if (result.lat && result.lng) {
          lat = parseFloat(result.lat);
          lng = parseFloat(result.lng);
        } else {
          console.warn('Invalid coordinates for result:', result);
          return; // Skip this result
        }
        
        if (isNaN(lat) || isNaN(lng)) {
          console.warn('Invalid coordinates for result:', result);
          return;
        }
        
        const isIslamic = this.isIslamicAgency(result.tags);
        const icon = L.divIcon({
          className: `custom-marker ${isIslamic ? 'islamic-marker' : 'regular-marker'}`,
          html: isIslamic ? '🕋' : '✈️',
          iconSize: [30, 30]
        });
        
        const marker = L.marker([lat, lng], {icon}).addTo(this.map)
          .bindPopup(this.createAgencyPopup(result));
        
        marker.on('click', () => {
          this.setActiveResult(index);
        });
        
        this.markers.push(marker);
      });
      
      if (this.markers.length > 0) {
        const group = new L.featureGroup(this.markers);
        this.map.fitBounds(group.getBounds().pad(0.1));
      }
    },
    createAgencyPopup(result) {
      const name = result.tags.name || 'Unnamed Travel Agency';
      const isIslamic = this.isIslamicAgency(result.tags);
      const address = [
        result.tags['addr:street'],
        result.tags['addr:housenumber'],
        result.tags['addr:city'],
        result.tags['addr:postcode']
      ].filter(Boolean).join(' ');
      
      return `
        <div class="map-popup">
          <h6 class="popup-title">${name}</h6>
          ${isIslamic ? '<span class="badge bg-success mb-1">Islamic Travel Agency</span>' : ''}
          ${address ? `<p class="popup-address">${address}</p>` : ''}
          ${result.tags.phone ? `<p class="popup-phone">📞 ${result.tags.phone}</p>` : ''}
          ${result.tags.website ? `<a href="${this.ensureHttp(result.tags.website)}" target="_blank">🌐 Visit Website</a>` : ''}
        </div>
      `;
    },
    ensureHttp(url) {
      return url.startsWith('http') ? url : `https://${url}`;
    },
    clearMarkers() {
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];
    },
    setActiveResult(index) {
      if (index < 0 || index >= this.results.length) return;
      
      this.activeResultIndex = index;
      const result = this.results[index];
      
      let lat, lng;
      if (result.center) {
        lat = parseFloat(result.center.lat);
        lng = parseFloat(result.center.lon);
      } else if (result.lat && result.lon) {
        lat = parseFloat(result.lat);
        lng = parseFloat(result.lon);
      } else if (result.lat && result.lng) {
        lat = parseFloat(result.lat);
        lng = parseFloat(result.lng);
      }
      
      if (!isNaN(lat) && !isNaN(lng) && this.map) {
        this.map.setView([lat, lng], 15);
        if (this.markers[index]) {
          this.markers[index].openPopup();
        }
      }
    },
    isIslamicAgency(tags) {
      return (
        tags['tourism'] === 'travel_agency' && 
        (tags['name']?.match(/islamic|muslim|halal|hajj|umrah/i) || 
         tags['description']?.match(/islamic|muslim|halal|hajj|umrah/i))
      );
    }
  }
};
</script>

<style scoped>
.travel-agency-locator {
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

.result-item.islamic-agency {
  border-left: 3px solid #198754;
}

.result-item.islamic-agency:hover {
  background-color: #e8f7f0;
}

.result-item.islamic-agency.active {
  background-color: #d1f0e0;
}

.custom-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.regular-marker {
  color: #0d6efd;
  border: 2px solid #0d6efd;
}

.islamic-marker {
  color: #198754;
  border: 2px solid #198754;
}

.map-popup {
  min-width: 200px;
}

.popup-title {
  font-weight: bold;
  margin-bottom: 5px;
  color: #0d6efd;
}

.popup-address {
  font-size: 0.9em;
  margin-bottom: 5px;
}

.popup-phone {
  font-size: 0.9em;
  margin-bottom: 5px;
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