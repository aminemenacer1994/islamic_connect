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
        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/pt1.png" alt="Prayer Times" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Prayer Times</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Accurate daily prayer times based
                on your location. View Fajr, Dhuhr, Asr, Maghrib, and Isha timings with sunrise and Qibla direction
                support.</p>
              <button class="form-control" onclick="window.location.href='/content'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Select Utility</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/guides1.png" alt="Madinah TV" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Islamic Guides</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Islamic guides offer clear
                insights into the core beliefs, practices, and morals of Islam, helping both Muslims
                and non-Muslims understand the faith more deeply.</p>
              <button class="form-control" onclick="window.location.href='/guide'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Select Utility</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/duas.png" alt="Eman Channel" class="w-100 pt-3" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Dua Collection</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Authentic Duas from the Qur’an and
                Sunnah for every occasion—complete with Arabic, translation, transliteration, and audio to help you
                reflect and connect.</p>
              <button class="form-control" onclick="window.location.href='/dua'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Select Utility</b>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row pt-3 g-4">
        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/tv.png" alt="Prayer Times" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Live Streaming</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Accurate daily prayer times based
                on your location. View Fajr, Dhuhr, Asr, Maghrib, and Isha timings with sunrise and Qibla direction
                support.</p>
              <button class="form-control" onclick="window.location.href='/streaming'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Select Utility</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/calc.png" alt="Madinah TV" class="w-100" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Zakat Calculator</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Islamic guides offer clear
                insights into the core beliefs, practices, and morals of Islam, helping both Muslims
                and non-Muslims understand the faith more deeply.</p>
              <button class="form-control" onclick="window.location.href='/blog'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Select Utility</b>
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-4">
          <div class="card custom-card shadow-sm border-0 rounded-4 overflow-hidden"
            style="cursor: pointer; background-color: #fff;">
            <img src="/images/aotd1.png" alt="Eman Channel" class="w-100 pt-3" style="object-fit: contain;" />
            <div class="p-3">
              <h5 class="mb-2 fw-bold display-6 text-dark text-center">Ayah of the Day</h5>
              <p class="card-text text-muted text-wrap text-center"
                style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Authentic Duas from the Qur’an and
                Sunnah for every occasion—complete with Arabic, translation, transliteration, and audio to help you
                reflect and connect.</p>
              <button class="form-control" onclick="window.location.href='/dua'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white"
                type="submit">
                <b>Select Utility</b>
              </button>
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
    }
  },
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
