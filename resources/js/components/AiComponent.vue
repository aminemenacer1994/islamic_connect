<template>
  <div class="container py-3">
    <!-- Title -->
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Gallery</h2>
    <p class="text-center text-muted mb-4">
      Explore beautiful Islamic visuals including mosques, calligraphy, Quranic themes, and more.
    </p>

    <!-- Search -->

    <div class="row container justify-content-center mb-3">
      <div class="col-12 col-md-12">
        <h3 class="fw-bold text-left pt-2 pb-2 container">Search Islamic images:</h3>
        <input @keyup.enter="fetchGallery" type="text" class="form-control" placeholder="Search for images..." />
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-4 text-center">
      <div class="d-flex text-center overflow-x-auto gap-2 px-1 py-2" style="cursor: pointer; white-space: nowrap;">
        <span class="badge 0 flex-shrink-0 text-center" v-for="filter in filters" :key="filter"
          @click="applyFilter(filter)">
          {{ filter }}
        </span>
      </div>
    </div>



    <!-- Image Grid -->
    <div class="row g-3">
      <div v-for="(image, index) in images" :key="index" class="col-12 col-sm-4 col-md-4 col-lg-4 d-flex">
        <div class="card d-flex flex-column shadow-md p-1" style="height: 100%; transition: box-shadow 0.3s;">
          <img :src="image.src.large2x" :alt="image.alt" class="img-fluid"
            style="height: 480px; width: 100%; object-fit: cover; border-top-right-radius: 5px; border-top-left-radius: 5px;" @click="openModal(image)"  />

          <p class="mt-2 text-center" style="padding: 0 10px; font-size: 20px; color: #444;">
            {{ image.alt || 'Islamic Image' }}
          </p>


          <div class="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2 mt-3 px-2">
            <a :href="`https://wa.me/?text=${encodeURIComponent(image.src.original)}`" target="_blank"
              class="btn btn-sm w-100 custom-btn">
              WhatsApp
            </a>
            <a href="#" @click="openModal(image)" role="button" class="btn btn-sm w-100 custom-btn"
              data-bs-toggle="button" aria-pressed="true">
              Enlarge
            </a>
          </div>
        </div>
      </div>


      <!-- Pagination -->
      <div class="mt-5">
        <nav class="d-flex justify-content-center">
          <ul class="pagination flex-wrap">
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
              <button class="page-link" @click="changePage(page)">
                {{ page }}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Modal -->
      <div v-if="isModalOpen" class="modal fade show" style="display: block; background-color: rgba(0, 0, 0, 0.8);"
        @click.self="closeModal">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-dark text-white">
            <div class="modal-body p-0">
              <img :src="selectedImage.src.original" :alt="selectedImage.alt" class="img-fluid w-100" />
            </div>
            <div class="modal-footer justify-content-between bg-secondary">
              <span>{{ selectedImage.alt }}</span>
              <button class="btn btn-light" @click="closeModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      images: [],
      searchTerm: 'islam',
      currentPage: 1,
      totalPages: 1,
      perPage: 12,
      isModalOpen: false,
      selectedImage: {},
      apiKey: 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f',
      filters: [
        'Islamic',
        'Mosque',
        'Calligraphy',
        'Quran',
        'Kaaba',
        'Mecca',
        'Madina',
        'Dome',
        'Ramadan',
        'Prayer',
        'Ramadan',
        'Eid',
        'Arabic Art',
        'Islamic Architecture',
      ],
    };
  },
  mounted() {
    this.fetchGallery();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.images.length / this.perPage);
    },
    paginatedImages() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.images.slice(start, start + this.perPage);
    }
  },
  methods: {
    async fetchGallery() {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${this.searchTerm}&page=${this.currentPage}&per_page=${this.perPage}`,
          {
            headers: {
              Authorization: this.apiKey,
            },
          }
        );
        const data = await response.json();
        this.images = data.photos;
        this.totalPages = Math.ceil(data.total_results / this.perPage);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    applyFilter(keyword) {
      this.searchTerm = keyword;
      this.currentPage = 1;
      this.fetchGallery();
    },
    openModal(image) {
      this.selectedImage = image;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.custom-btn {
  background-color: #0db691;
  color: white;
  padding: 10px;
  transition: background-color 0.3s, transform 0.2s;
}

.custom-btn:hover {
  background-color: #0aa07f;
  transform: translateY(-2px);
  color: #fff;
}

.scrollmenu {
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: transparent transparent;
  /* Firefox */
}

.scrollmenu::-webkit-scrollbar {
  width: 0px;
}

.scrollmenu.scrolling::-webkit-scrollbar {
  width: 8px;
}

.scrollmenu::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.scrollmenu a {
  display: inline-block;
  text-align: center;
  text-decoration: none;
}

.badge.active {
  background-color: rgba(0, 191, 166, 0.2);
  color: rgb(5, 32, 29);
  border: 1px solid rgba(0, 191, 166);
}

.badge {
  background-color: rgba(0, 191, 166);
  font-size: 1em;
  border-radius: 6px;
  padding: 8px;
}

.badge:hover {
  background: rgb(9, 94, 68);
  font-size: 1em;
  color: white;
  border-radius: 6px;
  padding: 8px;
}

.shadow-lg {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.hover-shadow:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.filter-scroll {
  scrollbar-color: #17a085 transparent;
  scrollbar-width: thin;
}

/* For Webkit (Chrome, Edge, Safari) */
.filter-scroll::-webkit-scrollbar {
  height: 8px;
}

.filter-scroll::-webkit-scrollbar-thumb {
  background-color: #17a085;
  border-radius: 10px;
}

.filter-scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

.pagination .page-link {
  font-size: 1.1rem;
}

.modal-backdrop {
  display: none;
}
</style>
