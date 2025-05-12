<template>
  <div class="container py-4">
    <h3 class="text-center fw-bold display-4 mb-4">Islamic Utility Toolkit</h3>
    <p class="text-center mb-3 lead ">
      The Islamic Utility Toolkit is a comprehensive digital suite designed to support Muslims in their daily religious,
      educational, and spiritual needs.
    </p>



    <!-- Grid Wrapper -->
    <div class="pb-2">
      <h1 class="fw-bold text-left pt-3 pb-2 container">Worship & Prayer Essentials:</h1>

      <div class="scroll-container-wrapper">
        <div class="row g-4 flex-nowrap overflow-x-auto horizontal-scroll-cards"
          style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">

          <div class="col-md-6 col-lg-4">
            <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
              <img src="/images/qf1.png" alt="Qibla finder" class="w-100" style="object-fit: contain;" />
              <div class="p-3">
                <h5 class="mb-2 fw-bold display-6 text-dark text-center">Qibla finder</h5>
                <p class="card-text text-muted text-center"
                  style="max-height: 4.5em; overflow: hidden; text-overflow: ellipsis;">
                  Find the Qibla direction from anywhere in the world using compass and map support—essential for your
                  prayers.
                </p>
                <button class="form-control" onclick="window.location.href='/qibla'"
                  style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                  type="submit">
                  <span class="text-center w-100"><b>Find Qibla</b></span>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-4">
            <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
              <img src="/images/duaa1.png" alt="Explore Duas" class="w-100 pt-3" style="object-fit: contain;" />
              <div class="p-3">
                <h5 class="mb-2 fw-bold display-6 text-dark text-center">Dua Collection</h5>
                <p class="card-text text-muted text-wrap text-center"
                  style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Authentic Duas from the Qur’an
                  and
                  Sunnah for every occasion—complete with Arabic, translation and audio to help you
                  reflect and connect.</p>
                <button class="form-control" onclick="window.location.href='/dua'"
                  style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                  type="submit">
                  <span class="text-center w-100"><b>Explore Duas</b></span>
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
                <button class="form-control" onclick="window.location.href='/prayers'"
                  style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                  type="submit">
                  <span class="text-center w-100"><b>View Prayer Times</b></span>
                </button>
              </div>
            </div>
          </div>

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
        </div>
      </div>
    </div>

    <h1 class="fw-bold text-left pb-2 container">Islamic Knowledge:</h1>
    <div class="row g-4 flex-nowrap overflow-x-auto"
      style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">


      <div class="col-md-6 col-lg-4 d-flex pb-3">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/quran_1.png" alt="Quran Eplorer" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Quran Eplorer</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Browse by surah or verse, listen
              to beautiful recitations, read translations and tafsir, and discover the meaning behind every ayah.
            </p>
            <button class="form-control" onclick="window.location.href='/surat'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Read & Listen</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4 d-flex pb-3">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/guides1.png" alt="Islamic guides" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Islamic Guides</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore essential Islamic
              teachings covering beliefs, practices, and morals—ideal for both Muslims and those new to Islam.</p>
            <button class="form-control" onclick="window.location.href='/guide'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Read Guides</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4 d-flex pb-3">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/sr.png" alt="Seerah Timeline" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Seerah Timeline</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Seerah is the life story of
              Prophet Muhammad ﷺ, covering his birth, prophethood, teachings, events like battles, and his role in
              establishing Islam and more.
            </p>
            <button class="form-control" onclick="window.location.href='/mission'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>View Seerah</b></span>
            </button>
          </div>
        </div>
      </div>


    </div>

    <h1 class="fw-bold text-left pt-4 pb-2 container">Media & Live Content:</h1>

    <div class="row g-4 flex-nowrap overflow-x-auto"
      style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/ip.png" alt="Qibla finder" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Audio Podcasts</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Islamic podcasts offer insightful discussions and teachings from speakers on various aspects of Islamic
              faith, history, and daily life.</p>
            <button class="form-control" onclick="window.location.href='/content'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Stream Podcasts</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/mtv2.png" alt="Watch Live" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Live Streaming</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Watch Islamic TV channels and live
              lectures—stream events, khutbahs, educational programs, and spiritual content anytime.</p>

            <button class="form-control" onclick="window.location.href='/streaming'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Watch Live</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/radio1.png" alt="Radio stations" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Radio Stations</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Tune in to live Islamic radio from around the world, featuring Qur’an recitations, lectures, nasheeds,
              and spiritual reminders—streamed 24/7 in multiple languages.</p>
            <button class="form-control" onclick="window.location.href='/radio'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Explore Radio</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/vide_g.png" alt="Video Gallery" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Video Gallery</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore a curated collection of
              short Islamic videos featuring reminders, duas, stories of the Prophets and Quranic reflections to
              deepen your understanding of Islam.</p>

            <button class="form-control" onclick="window.location.href='/video'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Watch Videos</b></span>
            </button>

          </div>
        </div>
      </div>
    </div>


    <h1 class="fw-bold text-left pt-4 pb-2 container">Lifestyle & Halal Living:</h1>
    <div class="row g-4 flex-nowrap overflow-x-auto"
      style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/calc.png" alt="Zakat Calculator" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Zakat Calculator</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Easily calculate your zakat based
              on your assets and liabilities with up-to-date nisab values and simplified guidance.</p>

            <button class="form-control" onclick="window.location.href='/blog'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Calculate Zakat</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/food.png" alt="Islamic Shops" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Halal Restaurants</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover delicious and certified
              halal restaurants at your fingertips. Whether you're traveling, new in town.</p>
            <button class="form-control" onclick="window.location.href='/shop'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Search Restaurants</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
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
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/donate111.png" alt="Donation" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Donation</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Your donation helps us keep
              Islamic knowledge accessible, ethical, and ad-free. Every contribution supports our efforts to deliver
              Quranic recitation, learning tools, accessibility features, and authentic Islamic content to a global
              audience.
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

    <h1 class="fw-bold text-left pt-4 pb-2 container">Tools & Utilities:</h1>
    <div class="row g-4 flex-nowrap overflow-x-auto"
      style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/dates.png" alt="Date Converter" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Date Converter</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">An Islamic Date Converter lets you
              switch between Gregorian and Hijri dates, helping track important events like Ramadan, Eid, and Hajj.
            </p>

            <button class="form-control" onclick="window.location.href='/date'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Convert Date</b></span>
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
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Open Calendar</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/img_g.png" alt="Image Gallery" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Image Gallery</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore a beautiful collection of
              high-quality Islamic images capturing the essence of faith, culture, and tradition.</p>

            <button class="form-control" onclick="window.location.href='/gallery'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>View Gallery</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/tb.png" alt="Names of Allah" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Tasbeeh Counter</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Count your dhikr effortlessly with
              our digital Tasbeeh counter. Keep track of your recitations anytime, anywhere.
            </p>
            <button class="form-control" onclick="window.location.href='/tasbeeh'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Start Counting</b></span>
            </button>
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
      selectedCategory: 'Select a Category',
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
    selectCategory(category) {
      this.selectedCategory = category;
    },
    navigateTo(link) {
      window.location.href = link;
    },
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
<style scoped>
.scroll-container-wrapper {
  position: relative;
  /* Context for the gradient overlay */
  padding-bottom: 1rem;
  /* Optional: if you have snapping and want to avoid cutoff by x-axis scrollbar space if it were visible */
}

.card.custom-card .card-text {
  max-height: 4.5em;
  /* Your existing style */
  overflow: hidden;
  /* Your existing style */
  text-overflow: ellipsis;
  /* Your existing style */
  /* Optional: For more precise line clamping if needed */
  /* display: -webkit-box;
    -webkit-line-clamp: 3; /* Adjust line count based on 4.5em and font size */
  /* -webkit-box-orient: vertical; */
}

/* Your existing button style from inline moved here for completeness example */
.card.custom-card button.form-control {
  background: #00bfa6;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  color: white;
  height: 38px;
  padding: 0.375rem 0.75rem;
  border: none;
  /* Good to be explicit */
}

.horizontal-scroll-cards>.card-column {
  scroll-snap-align: start;
  flex-shrink: 0;
  /* Prevent columns from shrinking if not using standard Bootstrap col widths */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Hide scrollbar but keep functionality */
.row::-webkit-scrollbar {
  height: 8px;
}

.row::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.row::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}


.custom-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.custom-card {
  height: 100%;
}

.custom-card img {
  height: 180px;
  /* Fixed image height */
  object-fit: cover;
}
</style>
