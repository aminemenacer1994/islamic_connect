<template>
  <div class="container py-4">
    <h1 class="text-center fw-bold display-4 mb-4">Services</h1>
    <p class="text-center mb-4 lead">
      Islamic Connect offers meaningful support to help Muslims strengthen their spiritual journey and engage more deeply with their faith.
      Our services are designed to assist individuals, families, and communities in nurturing a balanced and fulfilling Islamic life.
    </p>
    <div class="row g-4 ">
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/ml.webp" alt="Mosque Locator" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Mosque Locator</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Find nearby mosques around you based on your location with directions, prayer times, and contact
              details.
            </p>

            <button class="form-control" onclick="window.location.href='/mosque'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Find a Mosque</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/food.png" alt="Islamic Shops" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Halal Butcher Finder</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover delicious and certified
              halal butcher at your fingertips. Whether you're traveling or you're new in town.</p>
            <button class="form-control" onclick="window.location.href='/shop'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Search Butchers</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/store1.jpg" alt="Islamic Shops" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Shops Finder</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover delicious and certified
              halal food at your fingertips. Whether you're traveling or you're new in town.</p>
            <button class="form-control" onclick="window.location.href='/store'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Locate Shops</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/food.jpg" alt="Islamic Shops" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Halal Food Locater</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover delicious and certified
              halal food at your fingertips. Whether you're traveling or you're new in town.</p>
            <button class="form-control" onclick="window.location.href='/shop'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Search Foods</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/school1.png" alt="Donation" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Schools and Classes</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Your donation helps us keep
              Islamic knowledge accessible, ethical, and ad-free. Every contribution supports our efforts
            </p>
            <button class="form-control" onclick="window.location.href='/support'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Find Schools</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/donate111.png" alt="Donation" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Donation</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Your donation helps us keep
              Islamic knowledge accessible, ethical, and ad-free. Every contribution supports our efforts
            </p>
            <button class="form-control" onclick="window.location.href='/support'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Support Us</b></span>
            </button>
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

    }
  },

}
</script>
<style scoped>
.card.custom-card .card-text {
  max-height: 4.5em;
  text-overflow: ellipsis;
}

.card.custom-card button.form-control {
  background: #00bfa6;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  color: white;
  height: 38px;
  padding: 0.375rem 0.75rem;
  border: none;
  /* Good to be explicit */
}


.custom-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.custom-card {
  height: 100%;
}

.custom-card img {
  height: 180px;
  object-fit: cover;
}
</style>
