<template>
  <div class="container py-3">
    <!-- Title -->
    <h2 class="mb-2 text-center fw-bold display-5 display-md-4">Islamic Gallery</h2>
    <p class="text-center text-muted mb-4" style="font-size: 18px;">
      Explore beautiful Islamic visuals including majestic mosques, intricate calligraphy, Quranic themes, serene
      landscapes, timeless architecture, vibrant traditions, cultural festivals, spiritual gatherings, historical sites,
      daily life, artistic expressions, and more. </p>

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
        <span class="badge flex-shrink-0 text-center px-3 py-2" v-for="filter in filters" :key="filter"
          @click="applyFilter(filter)" :class="{
            ' text-white': activeFilter === filter,
            'bg-light text-dark': activeFilter !== filter
          }">
          {{ filter }}
        </span>
      </div>
    </div>


    <!-- Image Grid -->
    <div class="row g-3">
      <!-- Loop through images -->
      <div v-for="(image, index) in images" :key="index" class="col-12 col-sm-4 col-md-4 col-lg-4 d-flex">
        <div class="card d-flex flex-column shadow-md p-1 w-100 h-100" style="transition: box-shadow 0.3s;">
          <!-- Image -->
          <img :src="image.src.large2x" :alt="image.alt" class="img-fluid"
            style="height: 480px; object-fit: cover; border-top-left-radius: 5px; border-top-right-radius: 5px;"
            data-bs-toggle="modal" data-bs-target="#imageModal" @click="selectedImage = image" />

          <!-- Caption -->
          <p class="mt-2 text-center" style="padding: 0 10px; font-size: 20px; color: #444;">
            {{ image.alt || 'Islamic Image' }}
          </p>

          <!-- Push buttons to bottom -->
          <div class="flex-grow-1"></div>

          <!-- Bottom Buttons -->
          <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2 mt-auto px-2 pb-2">
            <a :href="`https://wa.me/?text=${encodeURIComponent(image.src.original)}`" target="_blank"
              class="btn btn-sm w-100 custom-btn" style="font-size: 20px;">
              Share
            </a>
            <a href="#" role="button" class="btn btn-sm w-100 custom-btn" style="font-size: 20px;"
              data-bs-toggle="modal" data-bs-target="#imageModal" @click="selectedImage = image">
              Expand
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Image</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="selectedImage?.src?.original" :alt="selectedImage?.alt" class="img-fluid w-100 h-100"
              style="object-fit: cover; padding: 5px;" />
            <p class="mt-2 text-center" style="padding: 0 5px; font-size: 20px; color: #444;">
              {{ selectedImage?.alt || 'Islamic Image' }}
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
      selectedImage: null,
      images: [],
      searchTerm: 'Islamic',
      activeFilter: 'Islamic',
      isModalOpen: false,
      apiKey: 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f',
      filters: [
        'Islamic',
        'Mosque',
        'Calligraphy',
        'Quran',
        'Kaaba',
        'Mecca',
        'Madina',
        'Hijab',
        'Ramadan',
        'Prayer',
        'Eid',
        'Arabic Art',
        'Islamic Architecture',
      ],
    };
  },
  mounted() {
    this.fetchGallery();
  },
  methods: {
    async fetchGallery() {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${this.searchTerm}`,
          {
            headers: {
              Authorization: this.apiKey,
            },
          }
        );
        const data = await response.json();
        this.images = data.photos;
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    },
    applyFilter(keyword) {
      this.activeFilter = keyword;
      this.searchTerm = keyword;
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
  color: #fff;
  border: 1px solid rgba(0, 191, 166);
  border-radius: 2px;
  border-radius: 6px;
  padding: 8px;
}

.badge:hover {
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
