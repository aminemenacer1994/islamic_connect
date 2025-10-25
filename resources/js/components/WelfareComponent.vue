<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-5 fw-bold text-center">Islamic Charities Finder</h1>
        <p class="text-center container mb-4 lead">
          Discover trusted Islamic charities and welfare organizations near you!
        </p>
        <div v-if="error" class="alert alert-danger text-center" role="alert">
          {{ error }} <button class="btn btn-link p-0" @click="resetSearch">Try again</button>
        </div>
        <div class="shadow" style="border-radius: 20px; padding: 10px; border: 1px solid grey;">
          <div class="card-body" style="padding: 5px;">
            <form class="d-flex align-items-center mb-3" role="search" @submit.prevent="searchLocation"
              style="gap: 0.5rem;">
              <h4 class="card-title pr-2 fw-bold" style="font-size: 25px;">Search location:</h4>
              <input id="searchInput" type="search" class="form-control" placeholder="Enter city..."
                aria-label="Search" v-model="searchQuery" autocomplete="off"
                style="max-width: 300px;" ref="searchInput" />
              <button class="btn btn-primary" style="background: #0b5d4b; color: white; height: 38px"
                type="submit" :disabled="loading">
                <span v-if="!loading">Search</span>
                <span v-else class="spinner-border spinner-border-sm"></span>
              </button>
            </form>

            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for Islamic charities in {{ searchQuery }}...</p>
            </div>

            <div v-if="!loading">
              <div v-if="!searchQuery || charities.length === 0" class="text-center py-5">
                <i class="bi bi-heart-fill display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for Islamic Charities</h3>
                <p class="text-muted">Enter a city to find nearby Islamic charities</p>
              </div>

              <div v-else-if="searchQuery && charities.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No Islamic charities found</h3>
                <p class="text-muted">
                  No charities found in {{ searchQuery }}. Try another city or expand the search radius.<br>
                  <button class="btn btn-link" @click="expandSearchRadius">Expand to {{ (searchRadius + 2000) / 1000 }}km</button><br>
                  <small>For live Islamic events, use a proxy with the Eventbrite API (CORS blocked).</small>
                </p>
              </div>

              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col" v-for="charity in charities" :key="charity.id">
                  <div class="card h-100">
                    <div style="padding: 15px 15px 0 15px;">
                      <h1 class="card-title fw-bold text-dark mb-3" style="font-size: 25px;">
                        {{ charity.name }}
                      </h1>
                    </div>
                    <div class="card-body pt-0">
                      <div class="mb-2 d-flex align-items-start">
                        <i class="bi bi-geo-alt-fill me-2"></i>
                        <span style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                          {{ charity.address || 'Address not specified' }}
                        </span>
                      </div>
                      <div class="mb-2 d-flex align-items-center">
                        <span class="text-warning me-2">
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star-fill"></i>
                          <i class="bi bi-star"></i>
                          <i class="bi bi-star"></i>
                        </span>
                        <h6 class="mb-0">{{ (charity.distance / 1000).toFixed(1) }} km away</h6>
                      </div>
                      <div v-if="charity.description" class="mb-2">
                        <small class="text-muted"><strong>Description:</strong> {{ charity.description }}</small>
                      </div>
                      <div v-if="charity.tags?.opening_hours" class="mb-2">
                        <small class="text-muted"><strong>Opening Times:</strong> {{ charity.tags.opening_hours }}</small>
                      </div>
                      <div class="d-flex justify-content-between gap-2">
                        <button class="btn flex-grow-1" style="background: #0b5d4b; color: white; height: 38px"
                          @click="openGoogleMaps(charity.lat, charity.lon, charity.name)">
                          <b>Get Direction</b>
                        </button>
                        <button class="btn flex-grow-1" style="background: #0e6aa3; color: white; height: 38px"
                          @click="callCharity(charity.phone)" :disabled="!charity.phone">
                          <b>Call Charity</b>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!loading && charities.length > 0" class="d-flex justify-content-between align-items-center"
            style="padding: 10px;">
            <small class="text-muted">Showing {{ charities.length }} charities</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IslamicCharitiesLocator',

  data() {
    return {
      searchQuery: '',
      loading: false,
      charities: [],
      currentLocation: null,
      searchRadius: 5000, // 5km
      maxRadius: 10000, // 10km
      error: null,
      retryAttempts: 0,
      maxRetries: 2,
    };
  },

  mounted() {
    this.$nextTick(() => {
      const input = this.$refs.searchInput;
      if (input?.focus) input.focus();
    });
  },

  methods: {
    async searchLocation() {
      const query = this.searchQuery.trim();
      if (!query) {
        this.error = 'Please enter a city';
        return;
      }

      this.loading = true;
      this.error = null;
      this.charities = [];

      try {
        // Try Nominatim first
        let response = await this.fetchNominatim(query);
        if (!response.ok && this.retryAttempts < this.maxRetries) {
          console.warn(`Nominatim failed (HTTP ${response.status}), retrying (${this.retryAttempts + 1}/${this.maxRetries})...`);
          this.retryAttempts++;
          await new Promise(resolve => setTimeout(resolve, 2000 * this.retryAttempts));
          response = await this.fetchNominatim(query);
        }

        if (!response.ok) {
          if (response.status === 403) {
            this.error = 'Nominatim denied access. Use a valid User-Agent email (e.g., yourname@gmail.com) or try later.';
            console.error('403 Forbidden:', await response.text());
          } else if (response.status === 429) {
            this.error = 'Too many requests to Nominatim. Wait a few seconds and try again.';
            console.error('429 Too Many Requests');
          } else {
            this.error = `Nominatim error (HTTP ${response.status}). Try again later.`;
            console.error(`HTTP ${response.status}:`, await response.text());
          }
          return;
        }

        if (!response.headers.get('Access-Control-Allow-Origin')) {
          this.error = 'CORS error: Nominatim blocked the request. Try again or use a different network.';
          console.error('Missing Access-Control-Allow-Origin header');
          return;
        }

        const data = await response.json();
        console.debug('Nominatim response:', data);

        if (!data.length) {
          this.error = `No location found for "${query}". Try another city.`;
          return;
        }

        this.currentLocation = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
          display_name: data[0].display_name,
        };

        this.retryAttempts = 0;
        await this.fetchNearbyCharities();
      } catch (err) {
        console.error('Search error:', err);
        if (err.message.includes('CORS') || err.message.includes('Access-Control-Allow-Origin')) {
          this.error = 'CORS error: Unable to access Nominatim. Ensure a valid User-Agent or try a different network.';
        } else {
          this.error = 'Failed to geocode city. Try again or use another city.';
        }
        if (this.retryAttempts < this.maxRetries) {
          this.retryAttempts++;
          console.warn(`Retrying search (${this.retryAttempts}/${this.maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 2000 * this.retryAttempts));
          await this.searchLocation();
        }
      } finally {
        this.loading = false;
      }
    },

    async fetchNominatim(query) {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=0`;
      console.debug('Nominatim request:', url);
      return await fetch(url, {
        headers: {
          'User-Agent': 'IslamicConnect/1.0 (your.email@example.com)', // REPLACE WITH YOUR EMAIL
          'Accept-Language': 'en',
        },
      });
    },

    async fetchNearbyCharities() {
      if (!this.currentLocation) return;

      const { lat, lon } = this.currentLocation;
      const radius = this.searchRadius;

      const query = `
        [out:json][timeout:30];
        (
          node["amenity"="social_facility"]["destination"="islamic"](around:${radius},${lat},${lon});
          way["amenity"="social_facility"]["destination"="islamic"](around:${radius},${lat},${lon});
          relation["amenity"="social_facility"]["destination"="islamic"](around:${radius},${lat},${lon});
          node["office"="ngo"]["name"~"[Ii]slamic|[Mm]uslim"](around:${radius},${lat},${lon});
          way["office"="ngo"]["name"~"[Ii]slamic|[Mm]uslim"](around:${radius},${lat},${lon});
          relation["office"="ngo"]["name"~"[Ii]slamic|[Mm]uslim"](around:${radius},${lat},${lon});
        );
        out center;
        >;
        out skel qt;
      `;

      try {
        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
        );
        console.debug('Overpass request:', query);
        if (!response.ok) {
          this.error = `Overpass error (HTTP ${response.status}). Try again later.`;
          console.error(`Overpass HTTP ${response.status}:`, await response.text());
          return;
        }

        const json = await response.json();
        console.debug('Overpass response:', json.elements);
        this.processCharityData(json.elements || []);
      } catch (err) {
        console.error('Overpass error:', err);
        this.error = err.message.includes('Too Many Requests')
          ? 'Overpass rate limit hit. Please try again.'
          : 'Could not load charities';
        this.charities = [];
      }
    },

    processCharityData(elements) {
      const charities = [];
      const seen = new Set();

      elements.forEach(element => {
        try {
          if (!element.tags || seen.has(element.id)) return;

          const coords = element.lat ? element : element.center || {};
          if (!coords.lat || !coords.lon) return;

          const tags = element.tags;
          const name = tags.name || 'Islamic Charity';

          const addressParts = [
            tags['addr:street'],
            tags['addr:housenumber'],
            tags['addr:city'],
            tags['addr:postcode'],
            tags['addr:country'],
          ].filter(Boolean);

          const address = addressParts.length
            ? addressParts.join(', ')
            : tags['addr:full'] || this.currentLocation?.display_name || 'Address not available';

          const distance = this.calculateDistance(
            this.currentLocation.lat,
            this.currentLocation.lon,
            coords.lat,
            coords.lon
          );

          charities.push({
            id: element.id,
            name,
            lat: coords.lat,
            lon: coords.lon,
            address,
            distance,
            phone: tags.phone,
            description: tags.description || (tags.amenity === 'social_facility' ? 'Islamic social facility' : 'Islamic NGO'),
            tags,
          });

          seen.add(element.id);
        } catch (e) {
          console.warn('Error processing charity:', element.id, e);
        }
      });

      this.charities = charities.sort((a, b) => a.distance - b.distance);
      console.debug('Processed charities:', this.charities);
    },

    async expandSearchRadius() {
      const increment = 2000;
      if (this.searchRadius + increment > this.maxRadius) {
        this.error = `Maximum search radius of ${this.maxRadius / 1000}km reached`;
        return;
      }

      this.searchRadius += increment;
      await this.fetchNearbyCharities();
    },

    openGoogleMaps(lat, lon, name = '') {
      if (!lat || !lon) return;

      const baseUrl = 'https://www.google.com/maps';
      const params = new URLSearchParams({
        q: name ? `${encodeURIComponent(name)}@${lat},${lon}` : `${lat},${lon}`,
        layer: 'c',
        cbll: `${lat},${lon}`,
        cbp: '11',
      });

      window.open(`${baseUrl}?${params.toString()}`, '_blank');
    },

    callCharity(phone) {
      if (!phone) return;
      if (confirm(`Call ${phone}?`)) {
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        window.location.href = `tel:${cleanPhone}`;
      }
    },

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // Earth radius in meters
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },

    resetSearch() {
      this.searchQuery = '';
      this.searchRadius = 5000;
      this.currentLocation = null;
      this.charities = [];
      this.error = null;
      this.retryAttempts = 0;
      this.$nextTick(() => {
        const input = this.$refs.searchInput;
        if (input?.focus) input.focus();
      });
    },
  },
};
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';

.card {
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
