<template>
  <div class="container py-4">
    <h1 class="text-center fw-bold display-5 mb-4">Services</h1>
    <p class="text-center mb-4 lead">
      Islamic Connect offers meaningful support to help Muslims strengthen their spiritual journey and engage more deeply with their faith.
      Our services are designed to assist individuals, families, and communities in nurturing a balanced and fulfilling Islamic life.
    </p>
    <div class="row g-4 ">
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/ml.webp" alt="Mosque Locator" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Mosque Locator</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Find nearby mosques around you based on your location with directions, prayer times, and contact
              details.
            </p>

            <button class="form-control" onclick="window.location.href='/mosque'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Find a Mosque</b></span>
            </button> 

            <!-- <button  v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/mosque')" type="button" style="background: rgb(11, 93, 75);box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
              <span class="text-center w-100"><b>Find a Mosque</b></span>
            </button>
            <div v-else class="restricted-access text-center p-2" style=" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
              <p class="mb-1 text-muted small">You must be subscribed to access</p>
              <a href="/subscribe" class="text-decoration-none" style="color: rgb(0, 107, 95); font-weight: bold;">Subscribe Now</a>
            </div> -->
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/food.png" alt="Islamic Shops" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Halal Butchers</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover delicious and certified
              halal butcher at your fingertips. Whether you're traveling or you're new in town.</p>

            <button class="form-control" onclick="window.location.href='/shop'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Search Butchers</b></span>
            </button>
            
            <!-- <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/shop')" type="button" style="background: rgb(11, 93, 75); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
              <span class="text-center w-100"><b>Search Butchers</b></span>
            </button>
            <div v-else class="restricted-access text-center p-2" style=" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
              <p class="mb-1 text-muted small">You must be subscribed to access</p>
              <a href="/subscribe" class="text-decoration-none" style="color: rgb(0, 107, 95); font-weight: bold;">Subscribe Now</a>
            </div> -->
          </div>
        </div>
      </div>

      <!-- <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/store1.jpg" alt="Islamic Shops" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Shops Finder</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover delicious and certified
              halal food at your fingertips. Whether you're traveling or you're new in town.</p>
            <button class="form-control" onclick="window.location.href='/store'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Locate Shops</b></span>
            </button>
          </div>
        </div>
      </div> -->

      <!-- <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/food.jpg" alt="Islamic Shops" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Halal Food Locater</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover delicious and certified
              halal food at your fingertips. Whether you're traveling or you're new in town.</p>
            <button class="form-control" onclick="window.location.href='/food'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Search Foods</b></span>
            </button>
          </div>
        </div>
      </div> -->

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/school1.png" alt="Islamic Shops" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Islamic Schools</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover trusted Islamic schools, madrassas, and educational centers near you with ease for the knowledge of islam.</p>
            
            <button class="form-control" onclick="window.location.href='/school'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Visit Schools</b></span>
            </button>

            <!-- <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/school')" type="button" style="background: rgb(11, 93, 75); box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
              <span class="text-center w-100"><b>Visit Schools</b></span>
            </button>
            <div v-else class="restricted-access text-center p-2" style=" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
              <p class="mb-1 text-muted small">You must be subscribed to access</p>
              <a href="/subscribe" class="text-decoration-none" style="color: rgb(0, 107, 95); font-weight: bold;">Subscribe Now</a>
            </div> -->
            
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
              style="background: rgb(11, 93, 75);box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
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
    props: {
        isAuthenticated: { type: Boolean, required: true },
        isSubscribed: { type: Boolean, required: true },
    },
    methods: {
        goTo(path) {
            window.location.href = path;
        },
    },
};
</script>

<style scoped>
.card.custom-card .card-text {
    max-height: 4.5em;
    text-overflow: ellipsis;
}

.card.custom-card button.form-control {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: white;
    height: 38px;
    padding: 0.375rem 0.75rem;
    border: none;
}

.custom-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.custom-card {
    height: 100%;
    transition: all 0.3s ease;
}

.custom-card img {
    height: 180px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.custom-card:hover img {
    transform: scale(1.05);
}

@keyframes borderPulse {
    0% {
        border-color: lightseagreen;
        box-shadow: 0 0 5px rgba(32, 178, 170, 0.5);
    }
    50% {
        border-color: rgb(0, 107, 95);
        box-shadow: 0 0 15px rgba(0, 191, 166, 0.8);
    }
    100% {
        border-color: lightseagreen;
        box-shadow: 0 0 5px rgba(32, 178, 170, 0.5);
    }
}

.card.custom-card {
    animation: borderPulse 2s infinite ease-in-out;
}

.restricted-access {
    background: #28b66324;
    transition: all 0.3s ease;
}

.restricted-access:hover {
    background: #28b66324;
    transform: translateY(-2px);
}

.restricted-access a:hover {
    color: #009e87;
    text-decoration: underline;
}
</style>