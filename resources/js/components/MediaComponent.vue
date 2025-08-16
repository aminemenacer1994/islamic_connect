<template>
  <div class="container py-4">
    <h1 class="text-center fw-bold display-5 mb-4">Media Center</h1>
    <p class="text-center mb-4 lead">
      The Media Center at Islamic Connect is a central hub for inspiring and educational Islamic content.
      It brings together voices, stories, and teachings from across the Muslim world, helping you stay connected, informed, and uplifted.
    </p>




    <div class="row g-4 ">
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/ap.avif" alt="Qibla finder" class="w-90 mt-1" style="object-fit: contain; padding: 20px;" />
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
        <div class="card custom-card shadow-sm rounded-4 " style="border: 1px solid grey; background:whitesmoke">
          <span class="badge rounded-pill bg-black text-white position-absolute top-0 start-0 m-2">Under development</span>
          <img src="/images/mtv2.png" alt="Watch Live" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Live Streaming</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Watch Islamic TV channels and live
              lectures—stream events, khutbahs, educational programs, and spiritual content anytime.</p>

            <!-- <button class="form-control" onclick="window.location.href='/streaming'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit" disabled>
              <span class="text-center w-100"><b>Watch Live</b></span>
            </button> -->
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style="border: 1px solid grey; ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/radio5.jpg" alt="Radio stations" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Reciters Stations</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Tune in to live Islamic radio from around the world, featuring Qur’an recitations, lectures, nasheeds,
              and spiritual reminders—streamed 24/7 in multiple languages.</p>
            <button class="form-control" onclick="window.location.href='/radio'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Explore Reciters</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 " style="border: 1px solid grey;">
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
        <div class="card custom-card shadow-sm rounded-4 " style="border: 1px solid grey;">
          <img src="/images/vide_g.png" alt="Video Gallery" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Video Gallery</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore a curated collection of
              short Islamic videos featuring reminders, duas, stories of the Prophets and Quranic reflections</p>

            <button class="form-control" onclick="window.location.href='/video'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Watch Videos</b></span>
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
  -webkit-animation: borderPulse 2s infinite ease-in-out;
  /* For Safari/Chrome */
  -moz-animation: borderPulse 2s infinite ease-in-out;
  /* For Firefox */
}
</style>
