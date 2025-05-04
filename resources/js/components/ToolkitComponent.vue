<template>
  <div class="container py-4">
    <h3 class="text-center fw-bold display-4 mb-4">Islamic Utility Toolkit</h3>
    <p class="text-center container mb-3 lead ">
      The Islamic Utility Toolkit is a comprehensive digital suite designed to support Muslims in their daily religious,
      educational, and spiritual needs.
    </p>

    <!-- Grid Wrapper -->
    <div class="pb-2">

      <div class="row g-4">
        <!-- Prayer Times -->
        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
            <img src="/images/pt1.png" alt="Prayer Times" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Prayer Times</h5>
              <p class="card-text text-muted text-center"
                style="max-height: 4.5em; overflow: hidden; text-overflow: ellipsis;">
                Accurate daily prayer times based on your location. View Fajr, Dhuhr, Asr, Maghrib, and Isha timings
                with sunrise and Qibla direction support.
              </p>
              <button class="form-control" @click="showPrayerTimes = true"
                style="background: #00bfa6; color: white; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px;">
                <b>View Prayer Times</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/guides1.png" alt="Islamic guides" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Islamic Guides</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore essential Islamic
                teachings covering beliefs, practices, and morals—ideal for both Muslims and those new to Islam.</p>
              <button class="form-control" onclick="window.location.href='/guide'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Read Guides</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/duaa1.png" alt="Explore Duas" class="w-100 pt-3" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Dua Collection</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Authentic Duas from the Qur’an and
                Sunnah for every occasion—complete with Arabic, translation and audio to help you
                reflect and connect.</p>
              <button class="form-control" onclick="window.location.href='/dua'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Explore Duas</b>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row pt-3 g-4">
        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/mtv2.png" alt="Watch Live" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Live Streaming</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Watch Islamic TV channels and live
                lectures—stream events, khutbahs, educational programs, and spiritual content anytime.</p>
              <button class="form-control" onclick="window.location.href='/streaming'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Watch Live</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/radio1.png" alt="Radio stations" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Radio Stations</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                Tune in to live Islamic radio from around the world, featuring Qur’an recitations, lectures, nasheeds,
                and spiritual reminders—streamed 24/7 in multiple languages.</p>
              <button class="form-control" onclick="window.location.href='/radio'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Explore Radio</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/ml.webp" alt="Mosque Locator" class="w-100 pt-3" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Mosque Locator</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                Find nearby mosques around you based on your location with directions, prayer times, and contact
                details.
              </p>
              <button class="form-control" onclick="window.location.href='/mosques'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Find a Mosque</b>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row pt-3 g-4">
        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/quibla1.png" alt="Qibla finder" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Qibla finder</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
                Find the Qibla direction from anywhere in the world using compass and map support—essential for your
                prayers. </p>
              <button class="form-control" onclick="window.location.href='/qibla'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Find Qibla</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/name_allah1.png" alt="Names of Allah" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Names of Allah</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;"> Discover the 99 beautiful names
                of Allah (Asma’ul Husna) with meanings, benefits, and audio pronunciation.
              </p>
              <button class="form-control" onclick="window.location.href='/blog'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Explore Names</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/calendar2.png" alt="Hijri Calendar" class="w-100 pt-3" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Hijri Calendar</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">View today’s Hijri date alongside
                the Gregorian calendar, with key Islamic dates and fasting reminders.</p>
              <button class="form-control" onclick="window.location.href='/dua'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Open Calendar</b>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row pt-3 g-4">
        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden" style=" background-color: #fff;">
            <img src="/images/calc.png" alt="Zakat Calculator" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Zakat Calculator</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Easily calculate your zakat based
                on your assets and liabilities with up-to-date nisab values and simplified guidance.</p>
              <button class="form-control" onclick="window.location.href='/blog'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Calculate Zakat</b>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="modal fade" id="prayerModal" tabindex="-1" aria-labelledby="prayerModalLabel" aria-hidden="true"
      @shown.bs.modal="onPrayerModalOpen">
      <div class="modal-dialog modal-lg">
        <div class="modal-content p-3">
          <div class="modal-header">
            <h5 class="modal-title" id="prayerModalLabel">Prayer Times</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <PrayerTimes ref="prayerTimesRef" />
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import PrayerTimes from "./translation/PrayerTimes.vue";
import moment from "moment";


export default {
  components: {
    PrayerTimes
  },
  data() {
    return {
      showPrayerTimes: false,
      city: "",
    }
  },
  mounted() {
    this.getPrayerTimes();

    // Add Bootstrap modal event listener
    const modal = document.getElementById("prayerModal");
    if (modal) {
      modal.addEventListener("shown.bs.modal", this.onPrayerModalOpen);
    }
  },
  methods: {
    setCurrentDate() {
      const now = moment().format('YYYY-MM-DD');
      console.log("Current date:", now);
    },
    getPrayerTimes() {
      if (!this.city) {
        console.warn("City is not set");
        return;
      }

      // otherwise fetch using city
    },
    onPrayerModalOpen() {
      this.$refs.prayerTimesRef.getCurrentLocation();
    }
  }
}
</script>
<style>
.custom-card {
  height: 100%;
}

.custom-card img {
  height: 180px;
  /* Fixed image height */
  object-fit: cover;
}
</style>
