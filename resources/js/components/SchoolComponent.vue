<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-5 fw-bold text-center">Islamic Education Finder</h1>
        <p class="text-center container mb-4 lead">
          Discover trusted Islamic schools, madrassas, and education centers near you with ease!
        </p>
        <div class="shadow" style="border-radius: 8px; padding: 10px;">
          <!-- Search Section -->
          <div class="card-body container-fluid" style="padding: 5px;">
            <div class="row mb-4 justify-content-center">
              <div>
                <form class="d-flex align-items-center mb-3" role="search" @submit.prevent="searchLocation"
                  style="gap: 0.5rem;">
                  <h4 class="card-title pr-2 fw-bold" style="font-size: 20px;">Search location:</h4>
                  <input id="searchInput" type="search" class="form-control" placeholder="Enter a city"
                    aria-label="Search" v-model="searchQuery" @input="handleTyping" autocomplete="off"
                    style="max-width: 300px;" />
                  <button class="btn align-items-center justify-content-center"
                    style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px"
                    type="submit" :disabled="loading">
                    <span v-if="!loading">Search</span>
                    <span v-else class="spinner-border spinner-border-sm"></span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for Islamic schools & centers in {{ searchQuery }}...</p>
            </div>

            <!-- Results -->
            <div v-if="!loading">
              <!-- No Search State -->
              <div v-if="!searchQuery || schools.length === 0" class="text-center py-5">
                <i class="bi bi-book display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for Islamic Schools & Centers</h3>
                <p class="text-center text-muted">Enter a city to find nearby Islamic schools, madrassas, or education
                  centers.</p>
              </div>

              <!-- No Results State -->
              <div v-else-if="searchQuery && schools.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No Islamic schools found</h3>
                <p class="text-center text-muted">
                  No Islamic schools or education centers found in {{ searchQuery }}. This may be due to
                  incomplete OpenStreetMap data. Try another city, contribute to <a href="https://www.openstreetmap.org"
                    target="_blank">OpenStreetMap</a>, or check directories like <a href="https://madrassah.co.uk"
                    target="_blank">Madrassah.co.uk</a>.<br>
                </p>
              </div>

              <!-- Results Grid -->
              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col" v-for="school in schools" :key="school.id">
                  <div class="card h-100" style="display: flex; flex-direction: column;">
                    <!-- Badges -->
                    <div style="padding: 15px 15px 0 15px;">
                      <h1 class="card-title text-left fw-bold text-dark mb-3" style="font-size: 25px;">
                        {{ school.name }}
                      </h1>
                    </div>
                    <div class="card-body pt-0" style="flex: 1;">
                      <div class="mb-2">
                        <div class="d-flex align-items-start">
                          <i class="bi bi-geo-alt-fill me-2 flex-shrink-0"></i>
                          <span class="text-truncate"
                            style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            {{ school.address || 'Address not specified' }}
                          </span>
                        </div>
                      </div>

                      <!-- Dynamic Star Rating -->
                      <div class="mb-2 d-flex align-items-center">
                        <span class="text-warning me-2">
                          <i v-for="n in 5" :key="n" :class="getStarClass(n, school.rating || 0)"></i>
                        </span>
                        <small class="text-muted">({{ school.rating ? school.rating.toFixed(1) : 'N/A' }}/5)</small>
                      </div>

                      <div v-if="school.type" class="mb-2">
                        <small class="text-muted">
                          <strong>Type:</strong> {{ school.type }}
                        </small>
                      </div>

                      <div v-if="school.tags?.opening_hours" class="opening-hours mb-2 mt-2">
                        <small class="text-muted">
                          <strong>Opening Times:</strong> {{ school.tags.opening_hours }}
                        </small>
                      </div>

                      <!-- Button container pushed to the bottom -->

                    </div>
                    <div class="d-flex justify-content-between align-items-center gap-2" style="padding: 10px;">
                      <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                        @click="openGoogleMaps(school.lat, school.lon, school.name)"
                        style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px">
                        <i class="bi bi-geo-alt me-2"></i>
                        <b>Get Directions</b>
                      </button>
                      <a :href="school.website" target="_blank"
                        class="btn d-flex align-items-center justify-content-center flex-grow-1"
                        style="background: #1881b9; color: white; height: 38px" :class="{ disabled: !school.website }">
                        <i class="bi bi-globe me-2"></i>
                        <b>Visit Website</b>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!loading && schools.length > 0" class="d-flex justify-content-between align-items-center"
            style="padding: 10px;">
            <small class="text-muted">
              Showing {{ schools.length }} Islamic educational schools & centers
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IslamicEducationLocator',
  data() {
    return {
      searchQuery: '',
      loading: false,
      schools: [],
      searchHistory: [],
      currentLocation: null,
      bbox: null,
      error: '',
    };
  },
  methods: {
    async searchLocation() {
      const query = this.searchQuery.trim();
      if (!query) {
        this.error = 'Please enter a city';
        return;
      }

      const cachedSearch = this.searchHistory.find(s => s.query === query);
      if (cachedSearch) {
        this.currentLocation = cachedSearch.location;
        this.bbox = cachedSearch.bbox;
        await this.fetchNearbySchools();
        return;
      }

      this.loading = true;
      this.error = '';
      this.schools = [];

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1&bounded=1`,
          {
            headers: {
              'User-Agent': 'IslamicConnect/1.0 (your.email@example.com)',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          }
        );

        if (!response.ok) throw new Error('Location search service unavailable');

        const data = await response.json();
        if (!data.length) throw new Error('City not found');

        const location = data[0];
        this.currentLocation = {
          lat: parseFloat(location.lat),
          lon: parseFloat(location.lon),
          display_name: location.display_name,
          address: location.address,
        };
        this.bbox = location.boundingbox.map(Number);

        this.searchHistory.unshift({
          query,
          location: this.currentLocation,
          bbox: this.bbox,
          timestamp: new Date(),
        });
        if (this.searchHistory.length > 5) this.searchHistory.pop();

        await this.fetchNearbySchools();
      } catch (err) {
        console.error('Search error:', err);
        this.error = err.message || 'Could not find city';
        this.schools = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchNearbySchools() {
      if (!this.bbox) return;

      const [south, north, west, east] = this.bbox;
      const query = `
        [out:json][timeout:30];
        (
          node["amenity"~"school|college|university"]["religion"="islam"](${south},${west},${north},${east});
          way["amenity"~"school|college|university"]["religion"="islam"](${south},${west},${north},${east});
          node["amenity"~"school|college|university"]["name"~"[Ii]slamic|[Mm]adrasah|[Mm]uslim|[Qq]uran|[Aa]l-[Aa]zhar"](${south},${west},${north},${east});
          way["amenity"~"school|college|university"]["name"~"[Ii]slamic|[Mm]adrasah|[Mm]uslim|[Qq]uran|[Aa]l-[Aa]zhar"](${south},${west},${north},${east});
          node["amenity"="community_centre"]["destination"="islamic"](${south},${west},${north},${east});
          way["amenity"="community_centre"]["destination"="islamic"](${south},${west},${north},${east});
          node["amenity"="community_centre"]["name"~"[Ii]slamic|[Mm]adrasah|[Mm]uslim|[Qq]uran|[Aa]l-[Aa]zhar"](${south},${west},${north},${east});
          way["amenity"="community_centre"]["name"~"[Ii]slamic|[Mm]adrasah|[Mm]uslim|[Qq]uran|[Aa]l-[Aa]zhar"](${south},${west},${north},${east});
          node["amenity"="place_of_worship"]["religion"="islam"]["name"~"[Mm]adrasah|[Qq]uran|[Aa]l-[Aa]zhar"](${south},${west},${north},${east});
          way["amenity"="place_of_worship"]["religion"="islam"]["name"~"[Mm]adrasah|[Qq]uran|[Aa]l-[Aa]zhar"](${south},${west},${north},${east});
        );
        out center;
        >;
        out skel qt;
      `;

      try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Failed to fetch Islamic schools');

        const json = await response.json();
        this.processSchoolData(json.elements || []);
      } catch (err) {
        console.error('Fetch error:', err);
        this.error = err.message.includes('Too Many Requests')
          ? 'Rate limit hit. Please wait and try again.'
          : 'Could not load Islamic schools';
        this.schools = [];
      }
    },
    processSchoolData(elements) {
      const seen = new Set();
      const schools = [];

      elements.forEach(element => {
        if (!element.tags || seen.has(element.id)) return;

        const coords = element.lat ? element : element.center || {};
        if (!coords.lat || !coords.lon) return;

        const tags = element.tags;
        const name = tags.name || 'Islamic Education Center';

        let type = 'School';
        if (tags.name && tags.name.match(/[Mm]adrasah/i)) type = 'Madrassa';
        else if (tags.amenity === 'community_centre') type = 'Education Center';
        else if (tags.amenity === 'place_of_worship') type = 'Madrassa';
        else if (tags.amenity === 'college' || tags.amenity === 'university') type = 'College/University';

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

        // Generate placeholder rating (3.5 to 5.0) since OpenStreetMap doesn't provide ratings
        const rating = this.generatePlaceholderRating(tags, distance);

        // Assign badges based on tags or random for placeholders
        const badges = this.assignBadges(tags, rating);

        schools.push({
          id: element.id,
          name,
          type,
          lat: coords.lat,
          lon: coords.lon,
          address,
          distance,
          phone: tags.phone,
          website: tags.website,
          opening_hours: tags.opening_hours,
          tags,
          rating, // Add rating
          badges, // Add badges
        });

        seen.add(element.id);
      });

      this.schools = schools.sort((a, b) => a.distance - b.distance);
    },
    generatePlaceholderRating(tags, distance) {
      // Simulate a rating based on heuristics (e.g., closer schools or specific types get higher ratings)
      let baseRating = 3.5 + Math.random() * 1.5; // Random between 3.5 and 5.0
      if (tags.amenity === 'college' || tags.amenity === 'university') baseRating += 0.3; // Boost for higher education
      if (distance < 5000) baseRating += 0.2; // Boost for proximity (within 5km)
      return Math.min(5.0, Math.max(3.5, parseFloat(baseRating.toFixed(1))));
    },
    assignBadges(tags, rating) {
      const badges = [];
      // Assign "Top Rated" for high ratings
      if (rating >= 4.5) badges.push('Top Rated');
      // Assign "New" based on tags or random chance (simulating recent establishment)
      if (tags['opening_year'] || Math.random() < 0.3) badges.push('New');
      // Assign "Family Friendly" for community centers or specific tags
      if (tags.amenity === 'community_centre' || tags.access === 'customers') badges.push('Family Friendly');
      return badges;
    },
    getStarClass(index, rating) {
      if (rating >= index) return 'bi bi-star-fill';
      if (rating >= index - 0.5) return 'bi bi-star-half';
      return 'bi bi-star';
    },
    getBadgeClass(badge) {
      switch (badge) {
        case 'Top Rated': return 'bg-success';
        case 'New': return 'bg-info';
        case 'Family Friendly': return 'bg-primary';
        default: return 'bg-secondary';
      }
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
    callSchool(phone) {
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

      const a = Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    resetSearch() {
      this.searchQuery = '';
      this.currentLocation = null;
      this.bbox = null;
      this.schools = [];
      this.error = '';
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.card-header {
  padding: 1.25rem 1.5rem;
  background-color: #2c3e50 !important;
}

.card-header .attribution small {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
}

.bg-success {
  background-color: #00bfa6;
  /* Match your button color */
}

.bg-info {
  background-color: #17a2b8;
  /* Bootstrap info color for "New" */
}

.bg-primary {
  background-color: #1881b9;
  /* Match your website button color */
}

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