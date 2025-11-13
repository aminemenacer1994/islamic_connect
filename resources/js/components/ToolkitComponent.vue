<template>
  <div class="container py-4">
    <h1 class="text-center fw-bold display-5 mb-4">Utility Toolkit</h1>
    <p class="text-center mb-4 lead">
      The Islamic Utility Toolkit is an all-encompassing digital platform thoughtfully designed to assist Muslims in
      fulfilling their daily religious obligations, advancing their educational pursuits, and nurturing their spiritual
      growth.
    </p>

    <div class="row g-4 ">
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/qf1.png" alt="Qibla finder" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Qibla finder</h5>
            <p class="card-text text-muted text-center"
              style="max-height: 4.5em; overflow: hidden; text-overflow: ellipsis;">
              Find the Qibla direction from anywhere in the world using compass and map support—essential for your
              prayers.
            </p>
            <button class="form-control" onclick="window.location.href='/qibla'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Find Qibla</b></span>
            </button>
          </div>
        </div>
      </div>


      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/pt1.png" alt="Prayer Times" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Prayer Times</h5>
            <p class="card-text text-muted text-center"
              style="max-height: 4.5em; overflow: hidden; text-overflow: ellipsis;">
              Accurate daily prayer times based on your location. View Fajr, Dhuhr, Asr, Maghrib, and Isha timings
              with sunrise and Qibla direction support.
            </p>
            <button class="form-control" onclick="window.location.href='/prayer'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>View Prayer Times</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/duaa1.png" alt="Explore Duas" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Dua Collection</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Authentic Duas from the Qur’an
              and
              Sunnah for every occasion—complete with Arabic, translation and audio to help you
              reflect and connect.</p>
            <button class="form-control" onclick="window.location.href='/dua'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Explore Duas</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/calc.png" alt="Zakat Calculator" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Zakat Calculator</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Easily calculate your zakat based
              on your assets and liabilities with up-to-date nisab values and simplified guidance.</p>

                  <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/zakat')" type="button" style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;">
                <span class="text-center w-100"><b>Calculate Zakat</b></span>
              </button>
              <div v-else class="restricted-access text-center p-2" style=" border-radius: 5px; animation: borderPulse 2s infinite ease-in-out;">
                  <p class="mb-1 text-muted small">You must be subscribed to access</p>
                  <a href="/subscribe" class="text-decoration-none" style="color: rgb(0, 107, 95); font-weight: bold;">Subscribe Now</a>
              </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/dates.png" alt="Date Converter" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Date Converter</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              An Islamic Date Converter lets you switch between Gregorian and Hijri dates, helping track important
              events like Ramadan, Eid, and Hajj.
            </p>
            <button class="form-control" onclick="window.location.href='/date'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 38px; padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Convert Date</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/hug.png" alt="Hajj & Umrah guides" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class=" fw-bold display-6 text-dark text-center">Hajj & Umrah guides</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Hajj and Umrah are two important
              Islamic pilgrimages to the holy city of Makkah</p>

            <button class="form-control" onclick="window.location.href='/umrah'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Read Guides</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/calendar2.png" alt="Hijri Calendar" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Hijri Calendar</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">View today’s Hijri date alongside
              the Gregorian calendar, with key Islamic dates and fasting reminders.</p>

            <button class="form-control" onclick="window.location.href='/calendar'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Open Calendar</b></span>
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
    background: #0b5d4b;
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