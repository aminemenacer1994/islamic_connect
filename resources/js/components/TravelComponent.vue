<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h1 class="display-4 fw-bold text-center">Islamic Travel Agency Finder</h1>
        <p class="text-center container mb-4 lead">
          Discover trusted Islamic travel agencies worldwide, offering Hajj, Umrah, and halal travel packages tailored to your needs.
        </p>

        <div class="shadow" style="border-radius: 20px; padding: 10px; border: 1px solid grey;">
          <!-- Search and Filter Section -->
          <div class="card-body container-fluid" style="padding: 5px;">
            <div class="row mb-4 justify-content-center">
              <div class="col-md-8">
                <!-- Search Bar -->
                <form class="d-flex align-items-center mb-3" role="search" @submit.prevent="searchAgencies"
                  style="gap: 0.5rem;">
                  <h4 class="card-title pr-2 fw-bold" style="font-size: 25px;">Search location:</h4>
                  <input id="searchInput" type="search" class="form-control" placeholder="Enter city or country..."
                    aria-label="Search" v-model="searchQuery" @input="debounceSearch" autocomplete="off"
                    style="max-width: 300px;" />
                  <button class="btn btn-outline-success" type="submit" :disabled="loading">
                    <span v-if="!loading">Search</span>
                    <span v-else class="spinner-border spinner-border-sm"></span>
                  </button>
                </form>

                <!-- Filters -->
                <div class="d-flex flex-wrap align-items-center mb-3" style="gap: 1rem;">
                  <div>
                    <label for="radiusSlider" class="form-label">Search Radius (km):</label>
                    <input type="range" class="form-range" id="radiusSlider" v-model.number="radius"
                      min="1" max="50" step="1" @change="searchAgencies">
                    <small>{{ radius }} km</small>
                  </div>
                  <div v-if="availableServices.length">
                    <label class="form-label">Services:</label>
                    <div class="d-flex flex-wrap" style="gap: 0.5rem;">
                      <div v-for="service in availableServices" :key="service">
                        <input type="checkbox" :id="service" :value="service" v-model="selectedServices"
                          @change="searchAgencies">
                        <label :for="service" class="ms-1">{{ service }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3">Searching for Islamic travel agencies in {{ searchQuery }}...</p>
            </div>

            <!-- Results -->
            <div v-if="!loading">
              <!-- No Search State -->
              <div v-if="!searchQuery && agencies.length === 0" class="text-center py-5">
                <i class="bi bi-compass display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">Search for Islamic travel agencies worldwide</h3>
                <p class="text-muted">Enter a city or country name to begin</p>
              </div>

              <!-- No Results State -->
              <div v-else-if="searchQuery && agencies.length === 0" class="text-center py-5">
                <i class="bi bi-binoculars display-4 text-muted mb-3"></i>
                <h3 class="h4 text-muted">No travel agencies found</h3>
                <p class="text-muted">Try adjusting your search, radius, or services</p>
              </div>

              <!-- Results Grid -->
              <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col" v-for="agency in paginatedAgencies" :key="agency.id">
                  <div class="card">
                    <div style="padding: 15px 15px 0 15px;">
                      <h1 class="card-title fw-bold text-dark mb-3" style="font-size: 25px;">{{ agency.name }}</h1>
                    </div>
                    <div class="card-body pt-0">
                      <div class="mb-2">
                        <div class="d-flex align-items-start">
                          <i class="bi bi-geo-alt-fill me-2 flex-shrink-0"></i>
                          <span class="text-truncate"
                            style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            {{ agency.address }}
                          </span>
                        </div>
                      </div>

                      <div class="mb-2">
                        <p class="text-muted mb-0">
                          <i class="bi bi-geo me-2"></i>
                          <small>{{ agency.lat.toFixed(4) }}, {{ agency.lon.toFixed(4) }}</small>
                        </p>
                      </div>

                      <div class="mb-2 d-flex align-items-center">
                        <span class="text-warning me-2">
                          <i class="bi bi-star-fill" v-for="n in agency.rating" :key="'star-' + n"></i>
                          <i class="bi bi-star" v-for="n in (5 - agency.rating)" :key="'empty-' + n"></i>
                        </span>
                        <h6 class="mb-0">Packages: {{ agency.packageCount }}</h6>
                      </div>

                      <div class="mb-2 services">
                        <div class="d-flex flex-wrap align-items-center" style="gap: 0.4rem;">
                          <span class="badge rounded-pill d-flex align-items-center"
                            v-for="service in agency.services" :key="service"
                            :class="getServiceBadgeClass(service)" style="padding: 0.5em 0.8em;">
                            {{ service }}
                          </span>
                        </div>
                      </div>

                      <div v-if="agency.opening_hours" class="opening-hours mb-2 mt-2">
                        <small class="text-muted">
                          <strong>Opening Times:</strong> {{ agency.opening_hours }}
                        </small>
                      </div>

                      <div class="d-flex justify-content-between align-items-center gap-2">
                        <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                          @click="openWebsite(agency.website)"
                          style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px"
                          :disabled="!agency.website">
                          <span class="text-center w-100">
                            <b>Visit Website</b>
                          </span>
                        </button>
                        <button class="btn d-flex align-items-center justify-content-center flex-grow-1"
                          @click="shareViaWhatsApp(agency)"
                          style="background: #1881b9; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px">
                          <b>Share Details</b>
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
                      <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          <div v-if="!loading && agencies.length > 0" class="d-flex justify-content-between align-items-center"
            style="padding: 10px;">
            <small class="text-muted">
              Showing {{ paginatedAgencies.length }} of {{ agencies.length }} travel agencies
            </small>
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
      radius: 5, // Default radius in km
      selectedServices: [],
      availableServices: ["Hajj Packages", "Umrah Packages", "Halal Tours", "Visa Services", "Hotel Booking", "Flights"],
      agencies: [],
      loading: false,
      lastSearchLocation: null,
      currentPage: 1,
      itemsPerPage: 6
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
    },
    attributionText() {
      return `Data © ${new Date().getFullYear()} Islamic Travel Agency Finder`;
    }
  },
  methods: {
    shareViaWhatsApp(agency) {
      const message = `Travel Agency: *${agency.name}*\n\n` +
        `Address: ${agency.address}\n` +
        `Lat & Long: ${agency.lat.toFixed(4)}, ${agency.lon.toFixed(4)}\n` +
        `Rating: ${'★'.repeat(agency.rating)}${'☆'.repeat(5 - agency.rating)}\n` +
        `Packages: ${agency.packageCount}\n` +
        (agency.opening_hours ? `Opening Hours: ${agency.opening_hours}\n` : '') +
        (agency.website ? `Website: ${agency.website}\n` : '') +
        `Google Maps: https://www.google.com/maps?q=${agency.lat},${agency.lon}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    },
    openWebsite(url) {
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
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
        const coords = await this.geocodeLocation(this.searchQuery);
        if (!coords) {
          alert("Could not find the specified location. Please try another city or country.");
          return;
        }

        this.lastSearchLocation = this.searchQuery;
        this.agencies = this.generateAgencies(coords.lat, coords.lon)
          .filter(agency => {
            if (!this.selectedServices.length) return true;
            return agency.services.some(service => this.selectedServices.includes(service));
          })
          .filter(agency => agency !== null);
      } catch (error) {
        console.error("Search error:", error);
        alert("Unable to generate agency data. Please try again later or check another location.");
        this.agencies = [];
      } finally {
        this.loading = false;
      }
    },
    async geocodeLocation(query) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.length > 0 ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
      } catch (error) {
        console.error("Geocoding error:", error);
        throw error;
      }
    },
    generateAgencies(lat, lon) {
      const agencyCount = Math.floor(5 + Math.random() * 10); // Dynamic number of agencies (5-15)
      const agencies = [];
      const islamicServices = ["Hajj Packages", "Umrah Packages", "Halal Tours"];
      const otherServices = ["Visa Services", "Hotel Booking", "Flights"];
      const allServices = [...islamicServices, ...otherServices];
      const prefixes = ["Al-", "Noor ", "Safa ", "Makkah ", "Medina ", "Haramain ", "Ziarat ", "Rahman "];

      for (let i = 0; i < agencyCount; i++) {
        // Generate random coordinates within radius
        const radiusInDegrees = (this.radius * 1000) / 111320; // Convert km to degrees
        const latOffset = (Math.random() - 0.5) * radiusInDegrees;
        const lonOffset = (Math.random() - 0.5) * radiusInDegrees;

        // Generate dynamic services (at least one Islamic service)
        const serviceCount = Math.floor(1 + Math.random() * 3); // 1-4 services
        const shuffledServices = allServices.sort(() => 0.5 - Math.random());
        const selectedServices = [islamicServices[Math.floor(Math.random() * islamicServices.length)]];
        for (let j = 1; j < serviceCount; j++) {
          if (Math.random() > 0.3 && selectedServices.length < serviceCount) {
            selectedServices.push(shuffledServices[j]);
          }
        }

        // Ensure only Islamic agencies
        if (!selectedServices.some(service => islamicServices.includes(service))) {
          continue; // Skip if no Islamic services
        }

        // Generate dynamic name and address
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const name = `${prefix}Travel Agency ${Math.floor(Math.random() * 1000)}`;
        const address = this.generateAddress(this.lastSearchLocation);

        // Generate dynamic opening hours
        const hoursOptions = [
          `Mon-Fri ${Math.floor(8 + Math.random() * 2)}:00-${Math.floor(16 + Math.random() * 4)}:00`,
          `Mon-Sat ${Math.floor(9 + Math.random() * 2)}:00-${Math.floor(17 + Math.random() * 3)}:00`,
          `Daily ${Math.floor(8 + Math.random() * 3)}:00-${Math.floor(16 + Math.random() * 4)}:00`
        ];
        const openingHours = hoursOptions[Math.floor(Math.random() * hoursOptions.length)];

        // Generate dynamic website
        const website = Math.random() > 0.3 ? `https://www.${name.toLowerCase().replace(/\s/g, '')}.com` : "";

        const agency = {
          id: Date.now() + i + Math.random(), // Unique ID
          name,
          address,
          city: this.lastSearchLocation || "Unknown City",
          country: this.lastSearchLocation ? this.lastSearchLocation.split(',').pop().trim() : "Unknown Country",
          lat: lat + latOffset,
          lon: lon + lonOffset,
          packageCount: Math.floor(3 + Math.random() * 7), // 3-10 packages
          services: selectedServices,
          rating: Math.floor(3 + Math.random() * 2), // 3-5 rating
          opening_hours: openingHours,
          website
        };

        agencies.push(agency);
      }

      return agencies;
    },
    generateAddress(location) {
      const streets = ["Main St", "Islamic Ave", "Halal Rd", "Pilgrim Way", "Makkah Blvd", "Medina St"];
      const houseNumber = Math.floor(Math.random() * 1000) + 1;
      const street = streets[Math.floor(Math.random() * streets.length)];
      return `${houseNumber} ${street}, ${location || "Unknown Location"}`;
    },
    getServiceBadgeClass(service) {
      if (service.includes("Hajj") || service.includes("Umrah")) return "bg-success text-white";
      if (service.includes("Halal Tours")) return "bg-info text-white";
      if (service.includes("Visa") || service.includes("Hotel") || service.includes("Flights")) return "bg-warning text-dark";
      return "bg-light text-dark";
    }
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css');

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 10px;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.badge {
  font-size: 0.8rem;
  padding: 0.35em 0.65em;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.card {
  border-radius: 0.75rem;
  overflow: hidden;
  border: none;
}

.form-control,
.form-range {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem !important;
}

.btn-primary {
  background-color: #3498db;
  border-color: #3498db;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #2980b9;
  border-color: #2980b9;
}

.btn-outline-primary {
  border-color: #3498db;
  color: #3498db;
}

.btn-outline-primary:hover {
  background-color: #3498db;
  color: white;
}

.bi-star-fill {
  color: #f39c12;
}

.bi-star {
  color: #ddd;
}

.badge {
  font-weight: 500;
  padding: 0.35em 0.65em;
  border-radius: 0.25rem;
}

.bg-success {
  background-color: #27ae60 !important;
}

.services {
  min-height: 2.5rem;
}

.spinner-border {
  width: 1.5rem;
  height: 1.5rem;
  border-width: 0.15em;
}

.pagination {
  margin-bottom: 0;
}

.page-link {
  cursor: pointer;
}

@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>
```