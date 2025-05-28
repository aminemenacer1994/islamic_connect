<template>
  <div class="container py-4">
    <h1 class="text-center fw-bold display-4 mb-4">Utility Toolkit</h1>
    <p class="text-center mb-4 lead">
      The Islamic Utility Toolkit is an all-encompassing digital platform thoughtfully designed to assist Muslims in
      fulfilling their daily religious obligations, advancing their educational pursuits, and nurturing their spiritual
      growth.
    </p>




    <div class="row g-4 ">
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card  rounded-4 overflow-hidden" style="border: 1px solid grey; ">
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
          <img src="/images/pt1.png" alt="Prayer Times" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Prayer Times</h5>
            <p class="card-text text-muted text-center"
              style="max-height: 4.5em; overflow: hidden; text-overflow: ellipsis;">
              Accurate daily prayer times based on your location. View Fajr, Dhuhr, Asr, Maghrib, and Isha timings
              with sunrise and Qibla direction support.
            </p>
            <button class="form-control" onclick="window.location.href='/prayer'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>View Prayer Times</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden" style="border: 1px solid grey;">
          <img src="/images/calc.png" alt="Zakat Calculator" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Zakat Calculator</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Easily calculate your zakat based
              on your assets and liabilities with up-to-date nisab values and simplified guidance.</p>

            <button class="form-control" onclick="window.location.href='/zakat'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Calculate Zakat</b></span>
            </button>
          </div>
        </div>
      </div>

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
