<template>
  <div class="container py-4">
    <h1 class="text-center fw-bold display-5 mb-4">Islamic Knowledge</h1>
    <p class="text-center mb-4 lead">
      Islamic Connect provides a rich collection of authentic knowledge to guide, educate, and inspire.
      Whether you’re seeking to learn, reflect, or explore, this space is dedicated to sharing timeless Islamic wisdom
      and insights.
    </p>

    <div class="row g-4 ">
      <div class="col-md-6 col-lg-4 ">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/sr.png" alt="Seerah Timeline" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Seerah Timeline</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Seerah is the life story of
              Prophet Muhammad ﷺ, covering his birth, prophethood, teachings, events like battles, and his role in
              establishing Islam.
            </p>
            <button class="form-control" onclick="window.location.href='/mission'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>View Seerah</b></span>
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="col-md-6 col-lg-4 d-flex pb-3">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/rug.png" alt="Seerah Timeline" class="w-100 mt-1" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Salat Teachings</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover the beauty of Islamic
              prayer with our Salat Guide. This walks you through each of the five daily prayers
            </p>
            <button class="form-control" onclick="window.location.href='/athkar'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Learn Salat</b></span>
            </button>
          </div>
        </div>
      </div> -->



      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/name_allah1.png" alt="Names of Allah" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Names of Allah</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">The Names of Allah (Asma’ul Husna)
              are 99 beautiful names that describe Allah’s attributes, such as mercy, wisdom, power, and justice.</p>

            <button class="form-control" onclick="window.location.href='/name'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Search Names</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/book2.png" alt="guides" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Islamic Guides</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover a comprehensive collection
              of clear and reliable Islamic guides designed to support every stage of your spiritual journey.</p>
            <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/guide')" type="button"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
              <span class="text-center w-100"><b>Read Guides</b></span>
            </button>
            <div v-else class="restricted-access text-center p-2"
              style=" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
              <p class="mb-1 text-muted small">You must be subscribed to access</p>
              <a href="/subscribe" class="text-decoration-none" style="color: #00bfa6; font-weight: bold;">Subscribe
                Now</a>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/fn.png" alt="Islamic Finance" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Islamic Finance</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Islamic finance refers to a
              financial system that operates in accordance with Shariah (Islamic law) and is rooted in ethical
              principles.
            </p>
            <button class="form-control" onclick="window.location.href='/finance'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Read More</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/copywriter.png" alt="Islamic Finance" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Islamic Blogs</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Islamic finance refers to a
              financial system that operates in accordance with Shariah (Islamic law) and is rooted in ethical
              principles.
            </p>
            <button class="form-control" onclick="window.location.href='/read'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Seach Blogs</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/idic.png" alt="Islamic Finance" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Dictionary</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Islamic dictionary is a
              specialized reference resource that provides definitions and explanations of terms, concepts, and phrases
              related to Islam
            </p>
            <button class="form-control" onclick="window.location.href='/books'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Explore Words</b></span>
            </button>
          </div>
        </div>
      </div>


    </div>

  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isAuthenticated: false,
      isSubscribed: false,
      loading: true,
    };
  },
  methods: {
    goTo(path) {
      window.location.href = path;
    },
    async checkSubscription() {
      this.loading = true;
      try {
        const response = await axios.get('/user');
        this.isAuthenticated = !!response.data;

        if (this.isAuthenticated) {
          const subscription = await axios.get('/subscription-status');
          console.log('Subscription data:', subscription.data); // Debug

          // Fix: Just check is_subscribed
          this.isSubscribed = subscription.data.is_subscribed;
        }
      } catch (error) {
        console.error('Subscription check failed:', error);
        this.isAuthenticated = false;
        this.isSubscribed = false;
      }
      this.loading = false;
    }
  },
  mounted() {
    this.checkSubscription();
  },
};
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
    border-color: #00bfa6;
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