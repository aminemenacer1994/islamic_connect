<template>
  <div class="container-fluid my-5" role="main" aria-labelledby="shop-finder-heading">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 id="shop-finder-heading" class="display-5 fw-bold text-center">Halal Butcher Finder</h1>
        <div class="premium-panel shadow">
          <!-- Search Section -->
          <div class="card-body container-fluid px-2 py-1">
            <div class="row mb-4 justify-content-center">
              <!-- Search form -->
              <form class="d-flex align-items-center mb-3 search-row" role="search" aria-label="Search for halal butchers by city" @submit.prevent="searchLocation">
                <label for="shop-search-input" class="card-title pr-2 fw-bold label-lg">Search location:</label>
                <input id="shop-search-input" type="search" class="form-control search-input" placeholder="Enter city..."
                  aria-label="Search city" v-model="searchQuery" autocomplete="off" ref="searchInput" />
                <button class="btn btn-action btn-primary-brand align-items-center justify-content-center" type="submit" :disabled="loading">
                  <span v-if="!loading">Search</span>
                  <span v-else class="spinner-border spinner-border-sm"></span>
                </button>
              </form>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5" aria-live="polite" aria-busy="true">
              <div class="spinner-border text-primary spinner-lg" role="status" aria-label="Loading results">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for halal butchers in {{ searchQuery }}...</p>
            </div>

            <!-- Results -->
            <div v-if="!loading">
              <!-- No Search State -->
              <div v-if="!searchQuery" class="text-center py-5">
                <i class="bi bi-shop display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for halal butchers</h3>
                <p class="text-muted">Enter a city or address to find nearby halal butchers</p>
              </div>

              <!-- No Results State -->
              <div v-else-if="searchQuery && shops.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No halal butchers found</h3>
              </div>

              <!-- Results Grid -->
              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
                   role="list"
                   aria-label="Search results">
                <div class="col" v-for="(shop, index) in displayedShops" :key="shop.id">
                  <div class="card h-100 premium-card animate-in" role="article"
                       :aria-label="`${shop.name}, ${shop.address || 'address not specified'}`"
                       tabindex="0"
                       @keydown="handleCardKeydown(index, $event)">
                    <div class="px-3 pt-3">
                      <h1 class="card-title fw-bold text-dark mb-3 title-lg">
                        {{ shop.name }}
                      </h1>
                    </div>
                    <div class="card-body pt-0">
                      <div class="mb-2">
                        <div class="d-flex align-items-start">
                          <i class="bi bi-geo-alt-fill me-2 flex-shrink-0"></i>
                          <span class="text-truncate line-clamp-2">
                            {{ shop.address || 'Address not specified' }}
                          </span>
                        </div>
                      </div>

                      <div class="mb-2 d-flex align-items-center">
                        <span class="text-warning me-2">
                          <i v-for="n in 5" :key="n" :class="getStarClass(shop.rating, n)" class="bi"></i>
                        </span>
                        <h6 class="mb-0">{{ shop.rating }}/5</h6>
                      </div>

                      <div v-if="shop.cuisine" class="mb-2">
                        <small class="text-muted">
                          <strong>Cuisine:</strong> {{ shop.cuisine }}
                        </small>
                      </div>

                      <div class="opening-hours mb-2 mt-2">
                        <small class="text-muted">
                          <strong>Opening Times:</strong> {{ shop.opening_hours_formatted || 'Not specified' }}
                          <span v-if="shop.isOpen" class="badge bg-success ms-2">Open Now</span>
                          <span v-else-if="shop.isOpen === false" class="badge bg-danger ms-2">Closed</span>
                        </small>
                      </div>

                      <div class="action-row d-flex justify-content-between align-items-center gap-2">
                        <!-- Get Directions Button -->
                        <button class="btn btn-action btn-primary-brand d-flex align-items-center justify-content-center flex-grow-1"
                          @click="openMaps(shop.lat, shop.lon, shop.name)"
                          :aria-label="`Get directions to ${shop.name}`">
                          <i class="bi bi-geo-alt me-2"></i>
                          <b>Get Direction</b>
                        </button>

                        <!-- Call Shop Button -->
                        <button class="btn btn-action btn-secondary-brand d-flex align-items-center justify-content-center flex-grow-1"
                          @click="callShop(shop.phone)" :disabled="!shop.phone"
                          :class="['btn-call', { 'btn-call--disabled': !shop.phone }]"
                          :aria-disabled="!shop.phone"
                          :aria-label="shop.phone ? `Call ${shop.name}` : `Phone number not available for ${shop.name}`">
                          <i class="bi bi-telephone me-2"></i>
                          <b>Call Shop</b>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!loading && filteredShops.length > 0 && searchQuery" class="d-flex justify-content-between align-items-center flex-wrap gap-2 px-3 py-2">
            <small class="text-muted" aria-live="polite">
              Showing {{ displayedShops.length }} of {{ filteredShops.length }} places
            </small>
            <button v-if="filteredShops.length > resultLimit" class="btn btn-sm btn-outline-secondary" @click="resultLimit += loadMoreStep">
              Load more
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HalalButcherFinder',
  data() {
    return {
      searchQuery: '',
      activeType: 'all',
      loading: false,
      shops: [],
      focusedIndex: -1,
      searchHistory: [],
      currentLocation: null,
      searchRadius: 5000,
      maxRadius: 10000,
      
      error: null,
      // Networking controllers for aborting in-flight requests
      geocodeController: null,
      overpassController: null,
      // Simple in-memory cache
      cache: {
        geocode: new Map(),
        shops: new Map(),
      },
      // Rendering limits
      resultLimit: 60,
      loadMoreStep: 60,
      _openStatusIntervalId: null,
      filters: {
        verifiedOnly: false,
        minRating: 0,
        openNow: false,
        paymentMethods: [],
      },
      foodTypes: [
        { value: 'all', label: 'All', icon: 'bi bi-shop' },
        { value: 'food', label: 'Restaurants', icon: 'bi bi-egg-fried' },
        { value: 'supermarket', label: 'Grocery', icon: 'bi bi-basket' },
        { value: 'butcher', label: 'Butchers', icon: 'bi bi-droplet' },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      const input = this.$refs.searchInput;
      if (input?.focus) input.focus();
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/opening_hours@3.7.0/opening_hours.min.js';
      script.async = true;
      document.head.appendChild(script);
      // Refresh open status every minute
      this._openStatusIntervalId = setInterval(this.refreshOpenStatus, 60000);
    });
  },
  beforeUnmount() {
    if (this._openStatusIntervalId) clearInterval(this._openStatusIntervalId);
    if (this.geocodeController) this.geocodeController.abort();
    if (this.overpassController) this.overpassController.abort();
  },
  // For Vue 2 backward compatibility
  beforeDestroy() {
    if (this._openStatusIntervalId) clearInterval(this._openStatusIntervalId);
    if (this.geocodeController) this.geocodeController.abort();
    if (this.overpassController) this.overpassController.abort();
  },
  computed: {
    filteredShops() {
      let results = this.shops;
      if (this.activeType !== 'all') {
        results = results.filter(shop => shop.type === this.activeType);
      }
      return results;
    },
    displayedShops() {
      return this.filteredShops.slice(0, this.resultLimit);
    },
  },
  methods: {
    handleCardKeydown(index, event) {
      const key = event.key;
      const last = this.filteredShops.length - 1;
      if (key === 'ArrowDown' || key === 'ArrowRight') {
        event.preventDefault();
        const next = Math.min(last, index + 1);
        this.focusedIndex = next;
        this.$nextTick(() => {
          const cards = event.currentTarget.parentElement.parentElement.querySelectorAll('.card.h-100');
          cards[next]?.focus();
        });
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        event.preventDefault();
        const prev = Math.max(0, index - 1);
        this.focusedIndex = prev;
        this.$nextTick(() => {
          const cards = event.currentTarget.parentElement.parentElement.querySelectorAll('.card.h-100');
          cards[prev]?.focus();
        });
      } else if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        const actionable = event.currentTarget.querySelector('button:not([disabled]), a[href]:not(.disabled)');
        actionable?.click();
      }
    },
    refreshOpenStatus() {
      this.shops = this.shops.map(shop => {
        if (shop.opening_hours && typeof opening_hours === 'function') {
          try {
            const oh = new opening_hours(shop.opening_hours, {
              lat: shop.lat,
              lon: shop.lon,
            });
            return { ...shop, isOpen: oh.getState() };
          } catch (e) {
            console.warn('Error refreshing open status:', e);
          }
        }
        return shop;
      });
    },
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
      this.error = null;
      this.shops = [];

      try {
        const headers = new Headers({
          'User-Agent': 'HalalButcherFinder/1.0',
          'Accept-Language': 'en-US,en;q=0.9',
        });

        // Abort any in-flight geocode
        if (this.geocodeController) this.geocodeController.abort();
        this.geocodeController = new AbortController();
        const signal = this.geocodeController.signal;

        // Geocode cache check
        if (this.cache.geocode.has(query.toLowerCase())) {
          const location = this.cache.geocode.get(query.toLowerCase());
          this.currentLocation = location;
          this.searchHistory.unshift({ query, location: this.currentLocation, timestamp: new Date() });
          if (this.searchHistory.length > 5) this.searchHistory.pop();
          await this.fetchNearbyShops();
          return;
        }

        let geocodeRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`,
          { headers, signal }
        );

        if (!geocodeRes.ok) throw new Error('Location search service unavailable');

        let data = await geocodeRes.json();
        if (!data.length) {
          // Note: Mapbox fallback is commented out as MAPBOX_TOKEN is not defined
          throw new Error('Location not found');
        }

        const location = data[0];
        this.currentLocation = {
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon),
          display_name: location.display_name,
          address: location.address,
        };

        // Cache geocode result
        this.cache.geocode.set(query.toLowerCase(), this.currentLocation);

        this.searchHistory.unshift({
          query,
          location: this.currentLocation,
          timestamp: new Date(),
        });
        if (this.searchHistory.length > 5) this.searchHistory.pop();

        await this.fetchNearbyShops();
      } catch (err) {
        console.error('Search error:', err);
        if (err.name === 'AbortError') return;
        this.error = err.message || 'Could not find location';
        this.shops = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchNearbyShops() {
      if (!this.currentLocation) return;

      const { lat, lon } = this.currentLocation;
      const radius = this.searchRadius;

      const cacheKey = `${lat.toFixed(3)},${lon.toFixed(3)}:${radius}`;
      if (this.cache.shops.has(cacheKey)) {
        this.shops = this.cache.shops.get(cacheKey);
        return;
      }

      const query = `
        [out:json][timeout:30];
        (
          node["shop"="butcher"][~"^(diet:halal|halal|certified:halal)$"~"yes"](around:${radius},${lat},${lon});
          way["shop"="butcher"][~"^(diet:halal|halal|certified:halal)$"~"yes"](around:${radius},${lat},${lon});
          relation["shop"="butcher"][~"^(diet:halal|halal|certified:halal)$"~"yes"](around:${radius},${lat},${lon});
        );
        out center;
        >;
        out skel qt;
      `;

      // List of Overpass mirrors to improve reliability
      const endpoints = [
        'https://overpass-api.de/api/interpreter',
        'https://overpass.kumi.systems/api/interpreter',
        'https://overpass.nchc.org.tw/api/interpreter',
        'https://overpass.osm.ch/api/interpreter',
      ];

      // Helper to try a single endpoint with timeout and abort support
      const tryEndpoint = async (baseUrl, timeoutMs = 15000) => {
        // Abort any in-flight overpass
        if (this.overpassController) this.overpassController.abort();
        this.overpassController = new AbortController();
        const ac = this.overpassController;

        const timer = setTimeout(() => {
          try { ac.abort(); } catch (_) {}
        }, timeoutMs);

        try {
          const res = await fetch(`${baseUrl}?data=${encodeURIComponent(query)}`, { signal: ac.signal });
          if (!res.ok) {
            // Treat 429/504 specially to allow fallback
            const status = res.status;
            throw new Error(status === 429 ? 'Too Many Requests' : `HTTP ${status}`);
          }
          const json = await res.json();
          return json;
        } finally {
          clearTimeout(timer);
        }
      };

      try {
        let lastError = null;
        for (let i = 0; i < endpoints.length; i++) {
          try {
            const json = await tryEndpoint(endpoints[i]);
            this.processShopData((json && json.elements) || [], cacheKey);
            lastError = null;
            break;
          } catch (e) {
            lastError = e;
            // If aborted manually, stop looping
            if (e && e.name === 'AbortError') throw e;
            // Otherwise, try next mirror after a short backoff
            await new Promise(r => setTimeout(r, 500));
          }
        }

        if (lastError) {
          throw lastError;
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.name === 'AbortError') return;
        const msg = typeof err.message === 'string' ? err.message : '';
        if (msg.includes('Too Many Requests')) {
          this.error = 'Rate limit hit. Please wait and try again.';
        } else if (msg.includes('HTTP 504') || msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
          this.error = 'Overpass service timed out. Please try again or change the location.';
        } else {
          this.error = 'Could not load halal butchers';
        }
        this.shops = [];
      }
    },
    processShopData(elements, cacheKey = null) {
      const seen = new Set();
      const shops = [];

      elements.forEach(element => {
        try {
          if (!element.tags || seen.has(element.id)) return;

          const coords = element.lat ? element : element.center || {};
          if (!coords.lat || !coords.lon) return;

          const tags = element.tags;
          const name = tags.name || 'Halal Butcher';
          let type = 'butcher';
          if (tags.shop === 'meat') type = 'meat_shop';
          if (tags['butcher:type']) type = tags['butcher:type'];

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
          if (tags.opening_hours && typeof window !== 'undefined' && typeof window.opening_hours === 'function') {
            try {
              const oh = new window.opening_hours(tags.opening_hours, {
                lat: coords.lat,
                lon: coords.lon,
              });
              isOpen = oh.getState();
              opening_hours_formatted = this.parseOpeningHours(tags.opening_hours);
            } catch (e) {
              // Non-fatal
            }
          }

          shops.push({
            id: element.id,
            name,
            type,
            lat: coords.lat,
            lon: coords.lon,
            address,
            distanceKm: Number((distance / 1000).toFixed(2)),
            phone: tags.phone,
            website: tags.website,
            cuisine: tags.cuisine || null,
            opening_hours: tags.opening_hours,
            opening_hours_formatted,
            isOpen,
            rating: parseFloat(tags['review:score']) || this.generatePlaceholderRating(),
            certification: tags['certified:halal'] ? 'Certified Halal' : 'Self-reported Halal',
            payment_methods: tags.payment ? tags.payment.split(';') : [],
            features: [
              tags.delivery === 'yes' ? 'delivery' : null,
              tags.takeaway === 'yes' ? 'takeaway' : null,
              tags['wheelchair'] === 'yes' ? 'wheelchair_accessible' : null,
            ].filter(Boolean),
            tags,
          });

          seen.add(element.id);
        } catch (e) {
          console.warn('Error processing shop:', element.id, e);
        }
      });

      let filteredShops = shops;
      if (this.filters.verifiedOnly) {
        filteredShops = filteredShops.filter(shop => shop.certification === 'Certified Halal');
      }
      if (this.filters.openNow) {
        filteredShops = filteredShops.filter(shop => shop.isOpen === true);
      }
      if (this.filters.minRating > 0) {
        filteredShops = filteredShops.filter(shop => shop.rating >= this.filters.minRating);
      }
      if (this.filters.paymentMethods.length > 0) {
        filteredShops = filteredShops.filter(shop =>
          this.filters.paymentMethods.some(method => shop.payment_methods.includes(method))
        );
      }
      this.shops = filteredShops.sort((a, b) => a.distanceKm - b.distanceKm);
      if (cacheKey) this.cache.shops.set(cacheKey, this.shops);
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
    openMaps(lat, lon, name = '') {
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
    parseOpeningHours(hoursString) {
      if (!hoursString) return 'Not specified';
      try {
        return hoursString
          .replace(/;/g, ', ')
          .replace(/Mo/g, 'Mon')
          .replace(/Tu/g, 'Tue')
          .replace(/We/g, 'Wed')
          .replace(/Th/g, 'Thu')
          .replace(/Fr/g, 'Fri')
          .replace(/Sa/g, 'Sat')
          .replace(/Su/g, 'Sun');
      } catch (e) {
        console.warn('Error formatting opening hours:', e);
        return hoursString;
      }
    },
    checkIfOpen(openingHours) {
      if (!openingHours || typeof window === 'undefined' || typeof window.opening_hours !== 'function') return null;
      try {
        const oh = new window.opening_hours(openingHours);
        return oh.getState();
      } catch (e) {
        console.warn('Error checking open status:', e);
        return null;
      }
    },
    resetSearch() {
      this.searchQuery = '';
      this.searchRadius = 5000;
      this.currentLocation = null;
      this.shops = [];
      this.error = null;
      this.activeType = 'all';
      this.filters = {
        verifiedOnly: false,
        minRating: 0,
        openNow: false,
        paymentMethods: [],
      };
    },
  },
};
</script>

<style scoped>
@keyframes fadeInUp { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }

.premium-panel { border-radius: 20px; padding: 12px; }
.premium-card { border-radius: 20px; overflow: hidden; transition: transform 180ms ease, box-shadow 180ms ease; }
.premium-card:hover, .premium-card:focus-within { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.12); }
.animate-in { animation: fadeInUp 320ms ease both; }

.label-lg { font-size: 20px; }
.title-lg { font-size: 25px; }
.search-row { gap: 0.5rem; flex-wrap: wrap; }
.search-input { max-width: 300px; }

.action-row .btn-action { border-radius: 20px; height: 42px; box-shadow: rgba(16,24,40,0.14) 0 8px 24px; }
.btn-action:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(24,129,185,0.25); }
.btn-primary-brand { background: #0b5d4b; color: #fff; }
.btn-secondary-brand { background: #1881b9; color: #fff; }
.btn-primary-brand:hover, .btn-secondary-brand:hover { filter: brightness(1.05); }

.form-control,
.form-select { padding: 0.75rem 1rem; border-radius: 20px !important; }

.btn-outline-primary.active {
  background-color: #2c5fa8;
  color: white;
}

.badge.bg-success {
  background-color: #28a745 !important;
}

.text-warning i { margin-right: 4px; }

.btn-call--disabled,
.btn-call:disabled {
  background: #6c757d !important;
  cursor: not-allowed;
}

.spinner-lg { width: 3rem; height: 3rem; }

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
