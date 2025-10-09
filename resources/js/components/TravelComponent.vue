<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-4 fw-bold text-center">Islamic Travel Agency Finder</h1>
        <p class="text-center container mb-4 lead">
          Discover trusted Islamic travel agencies worldwide for Hajj, Umrah, and halal travel packages.
        </p>

        <div class="search-container shadow" style="border-radius: 20px; padding: 15px; border: 1px solid #ddd;">
          <!-- Search Bar -->
          <div class="search-filter-container d-flex align-items-center flex-wrap gap-3">
            <form class="d-flex align-items-center flex-grow-1" role="search" @submit.prevent="searchAgencies">
              <label for="searchInput" class="form-label me-2 fw-bold">Search Location:</label>
              <input id="searchInput" type="search" class="form-control" placeholder="Enter city..."
                     aria-label="Search location" v-model="searchQuery" @input="debounceSearch" autocomplete="off" />
              <button class="btn btn-primary ms-2" type="submit" :disabled="loading">
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
            <p class="mt-3">Searching for agencies in {{ searchQuery }}...</p>
          </div>

          <!-- Results -->
          <div v-if="!loading">
            <!-- No Search State -->
            <div v-if="!searchQuery && agencies.length === 0" class="text-center py-5">
              <i class="bi bi-compass display-4 text-muted mb-3"></i>
              <h3 class="h4 text-muted">Search for Islamic travel agencies worldwide</h3>
              <p class="text-muted">Enter a city to begin</p>
            </div>

            <!-- No Results State -->
            <div v-else-if="searchQuery && agencies.length === 0" class="text-center py-5">
              <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
              <h3 class="h4 text-muted">No agencies found</h3>
              <p class="text-muted">Try another city</p>
            </div>

            <!-- Results Grid -->
            <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
              <div class="col" v-for="agency in paginatedAgencies" :key="agency.id">
                <div class="card h-100">
                  <div class="card-header">
                    <h2 class="card-title fw-bold text-dark mb-0">{{ agency.name }}</h2>
                  </div>
                  <div class="card-body">
                    <div class="mb-2 d-flex align-items-start">
                      <i class="bi bi-geo-alt-fill me-2"></i>
                      <span class="text-truncate">{{ agency.address }}</span>
                    </div>
                    <div class="mb-2 text-muted">
                      <i class="bi bi-geo me-2"></i>
                      <small>{{ agency.lat.toFixed(4) }}, {{ agency.lon.toFixed(4) }}</small>
                    </div>
                    <div class="mb-2 d-flex align-items-center">
                      <span class="text-warning me-2">
                        <i class="bi bi-star-fill" v-for="n in Math.round(agency.rating)" :key="'star-' + n"></i>
                        <i class="bi bi-star" v-for="n in (5 - Math.round(agency.rating))" :key="'empty-' + n"></i>
                      </span>
                      <small>Packages: {{ agency.packageCount }}</small>
                    </div>
                    <div class="mb-2 services d-flex flex-wrap gap-2">
                      <span class="badge rounded-pill bg-success text-white" v-for="service in agency.services" :key="service">
                        {{ service }}
                      </span>
                    </div>
                    <div v-if="agency.opening_hours" class="mb-2 text-muted">
                      <small><strong>Opening Times:</strong> {{ agency.opening_hours }}</small>
                    </div>
                    <div class="d-flex flex-wrap gap-2">
                      <button class="btn btn-visit" @click="openWebsite(agency.website)"
                              :disabled="!isValidUrl(agency.website)">
                        Visit Website
                      </button>
                      <button class="btn btn-directions" @click="openGoogleMaps(agency.lat, agency.lon)">
                        Get Directions
                      </button>
                      <button class="btn btn-share" @click="shareViaWhatsApp(agency)">
                        Share Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="hasResults" class="d-flex justify-content-center mt-4">
              <nav>
                <ul class="pagination">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
                  </li>
                  <li class="page-item" v-for="page in totalPages" :key="page"
                      :class="{ active: currentPage === page }">
                    <button class="page-link" @click="currentPage = page">{{ page }}</button>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="currentPage++"
                            :disabled="currentPage === totalPages">Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  name: "IslamicTravelAgencyFinder",
  data() {
    return {
      searchQuery: "",
      agencies: [],
      loading: false,
      lastSearchLocation: null,
      currentPage: 1,
      itemsPerPage: 6,
      apiConfig: {
        endpoint: "https://api.yelp.com/v3/businesses/search",
        apiKey: "eYbvtuOVRssBqdLhZn3WUmSfKDBGmRg7P5kZtO2NP1CK9D0m1GmWCndMJ1YdYX8YsB7w_1eqBb_5AGZFpA6LWljtcPK-yCxDvkXN3vUfCZtFUo9QzDyIKThcKlI0aHYx",
        fallbackToMock: false
      }
    };
  },
  computed: {
    hasResults() {
      return this.agencies.length > 0;
    },
    totalPages() {
      return Math.ceil(this.agencies.length / this.itemsPerPage);
    },
    paginatedAgencies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.agencies.slice(start, end);
    }
  },
  methods: {
    shareViaWhatsApp(agency) {
      const message = `Travel Agency: *${agency.name}*\n` +
        `Address: ${agency.address}\n` +
        `Coordinates: ${agency.lat.toFixed(4)}, ${agency.lon.toFixed(4)}\n` +
        `Rating: ${'★'.repeat(Math.round(agency.rating))}${'☆'.repeat(5 - Math.round(agency.rating))}\n` +
        `Packages: ${agency.packageCount}\n` +
        (agency.opening_hours ? `Opening Hours: ${agency.opening_hours}\n` : '') +
        (agency.website && this.isValidUrl(agency.website) ? `Website: ${agency.website}\n` : '') +
        `Google Maps: https://www.google.com/maps?q=${agency.lat},${agency.lon}`;
      const encodedMessage = encodeURIComponent(message);
      try {
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
      } catch (error) {
        console.error("Error opening WhatsApp:", error);
        alert("Unable to open WhatsApp. Please allow pop-ups or try again.");
      }
    },
    isValidUrl(url) {
      if (!url) return false;
      try {
        const parsedUrl = new URL(url);
        return ['http:', 'https:'].includes(parsedUrl.protocol);
      } catch {
        return false;
      }
    },
    openWebsite(url) {
      if (this.isValidUrl(url)) {
        try {
          window.open(url, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error("Error opening website:", error);
          alert("Unable to open website. Please allow pop-ups or try again.");
        }
      } else {
        alert("No valid website available for this agency.");
      }
    },
    openGoogleMaps(lat, lon) {
      if (typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon)) {
        try {
          window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error("Error opening Google Maps:", error);
          alert("Unable to open Google Maps. Please allow pop-ups or try again.");
        }
      } else {
        alert("Invalid coordinates for this agency.");
      }
    },
    debounceSearch: debounce(function () {
      this.searchAgencies();
    }, 500),
    async searchAgencies() {
      if (!this.searchQuery.trim()) return;

      this.loading = true;
      this.agencies = [];
      this.currentPage = 1;

      try {
        const response = await fetch(
          `${this.apiConfig.endpoint}?` +
          `term=islamic+travel+hajj+umrah&` +
          `location=${encodeURIComponent(this.searchQuery)}&` +
          `categories=travelservices&limit=50`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiConfig.apiKey}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Yelp API error:', errorData);
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error?.description || 'Unknown error'}`);
        }

        const data = await response.json();

        this.agencies = data.businesses?.map(business => ({
          id: business.id,
          name: business.name,
          address: business.location?.address1 || business.location?.display_address?.join(', ') || 'No address available',
          lat: business.coordinates?.latitude || 0,
          lon: business.coordinates?.longitude || 0,
          packageCount: business.review_count || 0,
          services: business.categories?.map(cat => cat.title) || ['Travel Services'],
          rating: business.rating || 0,
          website: business.url || '',
          opening_hours: business.hours?.[0]?.open?.map(h => `${this.getDayName(h.day)}: ${this.formatTime(h.start)}-${this.formatTime(h.end)}`).join('; ') || ''
        })) || [];

        this.lastSearchLocation = this.searchQuery;

        if (this.agencies.length === 0) {
          alert("No agencies found for this location. Try another city.");
        }
      } catch (error) {
        console.error("Search error:", error);
        alert(`Unable to load agency data: ${error.message}. Please try again later.`);
      } finally {
        this.loading = false;
      }
    },
    getDayName(day) {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return days[day] || 'Unknown';
    },
    formatTime(time) {
      if (!time || time.length !== 4) return time;
      const hour = parseInt(time.slice(0, 2));
      const minute = time.slice(2);
      const period = hour >= 12 ? 'PM' : 'AM';
      const adjustedHour = hour % 12 || 12;
      return `${adjustedHour}:${minute} ${period}`;
    }
  }
};
</script>

<style scoped>
/* Bootstrap Icons are provided globally via /css/app.css; avoid CDN import */

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
}

.btn-visit {
  background-color: #007bff;
  color: white;
}
.btn-directions {
  background-color: #28a745;
  color: white;
}
.btn-share {
  background-color: #17a2b8;
  color: white;
}
.btn-visit:hover, .btn-directions:hover, .btn-share:hover {
  opacity: 0.9;
}

.search-container {
  background: #fff;
  transition: box-shadow 0.3s ease;
}

.search-container:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-filter-container {
  gap: 12px !important;
}

.form-control {
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 16px;
  max-width: 100%;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.form-range {
  width: 100px;
  height: 5px;
  background: #e9ecef;
  border-radius: 4px;
  cursor: pointer;
}

.form-range::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  background: #007bff;
  border-radius: 50%;
  transition: background 0.2s ease;
}

.form-range::-webkit-slider-thumb:hover {
  background: #0056b3;
}

.radius-value {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  display: block;
}

.form-check-input {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  cursor: pointer;
}

.form-check-label {
  font-size: 14px;
  cursor: pointer;
}

.btn {
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: #007bff;
  border: none;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-visit {
  background: #00bfa6;
  color: white;
  flex: 1;
}

.btn-directions {
  background: #34c759;
  color: white;
  flex: 1;
}

.btn-share {
  background: #1881b9;
  color: white;
  flex: 1;
}

.card {
  border-radius: 8px;
  border: none;
  transition: all 0.2s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
  padding: 12px 16px;
}

.card-title {
  font-size: 20px;
}

.services {
  gap: 6px;
}

.badge {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
}

.spinner-border {
  width: 24px;
  height: 24px;
}

.pagination .page-link {
  font-size: 14px;
  padding: 8px 12px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .search-filter-container {
    flex-direction: column !important;
    align-items: stretch;
    gap: 8px !important;
  }

  .form-control,
  .btn {
    font-size: 14px;
    padding: 8px 12px;
  }

  .form-range {
    width: 100%;
  }

  .radius-filter,
  .service-filter {
    width: 100%;
  }

  .form-check-label {
    font-size: 13px;
  }

  .btn-visit,
  .btn-directions,
  .btn-share {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .search-filter-container {
    flex-direction: row;
    justify-content: space-between;
  }

  .radius-filter,
  .service-filter {
    flex: 0 0 auto;
  }
}
</style>
