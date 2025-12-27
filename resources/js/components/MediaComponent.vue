<template>
  <div class="container py-4">
    <h1 class="text-center fw-bold display-5 mb-4">Media Center</h1>
    <p class="text-center mb-4 lead">The Media Center at Islamic Connect is a central hub for inspiring and educational
      Islamic content. It brings together voices, stories, and teachings from across the Muslim world, helping you stay
      connected, informed, and uplifted.</p>
    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden">
          <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
          <img src="/images/ap.avif" alt="Qibla finder" class="w-90 mt-1" style="object-fit: contain; padding: 20px;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Audio Podcasts</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Islamic podcasts offer insightful discussions and teachings from speakers on various aspects of Islamic
              faith, history, and daily life.
            </p>
            <!-- <button class="form-control" onclick="window.location.href='/content'" type="submit">
                            <span class="text-center w-100"><b>Stream Podcasts</b></span>
                        </button>  -->
            <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/content')" type="button">
              <span class="text-center w-100"><b>Stream Podcasts</b></span>
            </button>
            <div v-else class="restricted-access text-center p-2">
              <p class="mb-1 text-muted small">You must be subscribed to access</p>
              <a href="/subscribe" class="text-decoration-none">Subscribe Now</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden">
          <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
          <img src="/images/mtv2.png" alt="Watch Live" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Channel Guide</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Find Islamic channels and access their posts, channel, website, playlists, and videos directly on YouTube.
            </p>
            <!-- <button class="form-control" onclick="window.location.href='/streaming'" type="submit">
                            <span class="text-center w-100"><b>View Channels</b></span>
                        </button>  -->
            <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/streaming')"
              type="button">
              <span class="text-center w-100"><b>View Channels</b></span>
            </button>
            <div v-else class="restricted-access text-center p-2">
              <p class="mb-1 text-muted small">You must be subscribed to access</p>
              <a href="/subscribe" class="text-decoration-none">Subscribe Now</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden">
          <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
          <img src="/images/radio5.jpg" alt="Radio stations" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Reciters Stations</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Tune in to live Islamic radio from around the world, featuring Qur'an recitations, lectures, nasheeds, and
              spiritual reminders streamed 24/7 in multiple languages.
            </p>
            <!-- <button class="form-control" onclick="window.location.href='/radio'"
                            style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="submit">
                            <span class="text-center w-100"><b>Explore Reciters</b></span>
                        </button>  -->
            <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/radio')" type="button">
              <span class="text-center w-100"><b>Explore Reciters</b></span>
            </button>
            <div v-else class="restricted-access text-center p-2">
              <p class="mb-1 text-muted small">You must be subscribed to access</p>
              <a href="/subscribe" class="text-decoration-none">Subscribe Now</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card overflow-hidden rounded-4">
          <img src="/images/img_g.png" alt="Image Gallery" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Image Gallery</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Explore a beautiful collection of high-quality Islamic images capturing the essence of faith, culture, and
              tradition.
            </p>
            <button class="form-control" onclick="window.location.href='/gallery'" type="submit">
              <span class="text-center w-100"><b>View Gallery</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card overflow-hidden rounded-4">
          <img src="/images/vide_g.png" alt="Video Gallery" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Video Gallery</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">
              Explore a curated collection of short Islamic videos featuring reminders, duas, stories of the Prophets
              and Quranic reflections.
            </p>
            <!-- <button class="form-control" onclick="window.location.href='/video'"
                            style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
                            type="submit">
                            <span class="text-center w-100"><b>Watch Videos</b></span>
                        </button>   -->
            <button v-if="isAuthenticated && isSubscribed" class="form-control" @click="goTo('/video')" type="button">
              <span class="text-center w-100"><b>Watch Videos</b></span>
            </button>
            <div v-else class="restricted-access text-center p-2">
              <p class="mb-1 text-muted small">You must be subscribed to access</p>
              <a href="/subscribe" class="text-decoration-none">Subscribe Now</a>
            </div>
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
.container {
  --section-ink: #1e2e33;
  --section-muted: #586a70;
  --card-ink: #1b2c30;
  --card-muted: #57686f;
  --card-accent: #0b5d4b;
  --card-accent-2: #1a5f7a;
  --card-gold: #e8c98a;
  --card-sand: #fcf7ee;
  --card-border: rgba(15, 70, 63, 0.12);
  --card-shadow: 0 12px 28px rgba(12, 43, 47, 0.1), 0 4px 10px rgba(12, 43, 47, 0.06);
  --card-shadow-hover: 0 20px 45px rgba(12, 43, 47, 0.16), 0 8px 16px rgba(12, 43, 47, 0.1);
  --card-glow: rgba(11, 93, 75, 0.22);
}

.container>h1.display-5 {
  letter-spacing: -0.01em;
  font-weight: 700;
  color: var(--section-ink);
  margin-bottom: 0.75rem;
}

.lead {
  color: var(--section-muted);
  line-height: 1.75;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;
}

.custom-card {
  border-radius: 22px;
  border: 1px solid var(--card-border);
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(232, 201, 138, 0.45) 0%, rgba(255, 255, 255, 0) 60%),
    radial-gradient(120% 120% at 100% 0%, rgba(26, 95, 122, 0.18) 0%, rgba(255, 255, 255, 0) 55%),
    linear-gradient(180deg, #ffffff 0%, var(--card-sand) 100%);
  box-shadow: var(--card-shadow);
  position: relative;
  z-index: 0;
  overflow: hidden;
  height: 100%;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  animation: cardReveal 0.6s ease both;
}

.custom-card::before {
  content: "";
  position: absolute;
  top: -70px;
  right: -60px;
  width: 190px;
  height: 190px;
  background: radial-gradient(circle at 35% 35%, rgba(11, 93, 75, 0.22), rgba(11, 93, 75, 0));
  opacity: 0.7;
  transition: transform 0.45s ease, opacity 0.45s ease;
}

.custom-card::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 6px;
  width: 100%;
  background: linear-gradient(90deg, var(--card-accent), var(--card-accent-2), var(--card-gold));
  transform: scaleX(0.2);
  transform-origin: left;
  transition: transform 0.45s ease;
}

.custom-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
  border-color: rgba(11, 93, 75, 0.35);
}

.custom-card:hover::before {
  transform: translate(-10px, 12px) scale(1.05);
  opacity: 1;
}

.custom-card:hover::after {
  transform: scaleX(1);
}

.custom-card img {
  height: 180px;
  width: 100%;
  object-fit: contain;
  filter: drop-shadow(0 14px 22px rgba(18, 42, 45, 0.18));
  transition: transform 0.45s ease, filter 0.45s ease;
}

.custom-card:hover img {
  transform: translateY(-4px) scale(1.03);
  filter: drop-shadow(0 18px 26px rgba(18, 42, 45, 0.22));
}

.custom-card .p-3 {
  padding: 1.35rem 1.35rem 1.5rem;
}

.custom-card img,
.custom-card .p-3 {
  position: relative;
  z-index: 1;
}

.custom-card h1,
.custom-card .display-6 {
  font-size: clamp(1.5rem, 2.3vw, 2.1rem);
  letter-spacing: -0.01em;
  font-weight: 700;
  color: var(--card-ink) !important;
}

.card.custom-card .card-text {
  color: var(--card-muted) !important;
  font-size: 0.96rem;
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 4.8em;
}

.card.custom-card button.form-control {
  background: linear-gradient(135deg, var(--card-accent) 0%, #0f6d5a 45%, var(--card-accent-2) 100%);
  border: 1px solid rgba(11, 93, 75, 0.45);
  border-radius: 999px;
  box-shadow: 0 12px 22px var(--card-glow), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  color: #fff;
  font-weight: 700;
  height: 42px;
  padding: 0.4rem 1rem;
  letter-spacing: 0.02em;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
}

.card.custom-card button.form-control::after {
  content: "";
  position: absolute;
  top: -60%;
  left: -20%;
  width: 140%;
  height: 220%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0));
  opacity: 0.6;
  transition: opacity 0.3s ease, transform 0.5s ease;
  pointer-events: none;
}

.card.custom-card button.form-control:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 30px rgba(11, 93, 75, 0.28);
  filter: brightness(1.04);
}

.card.custom-card button.form-control:hover::after {
  opacity: 0.9;
  transform: translateX(8%);
}

.card.custom-card button.form-control:active {
  transform: translateY(0);
}

.card.custom-card button.form-control:focus-visible {
  outline: 3px solid rgba(26, 95, 122, 0.35);
  outline-offset: 3px;
}

.restricted-access {
  border-radius: 12px;
  border: 1px dashed rgba(11, 93, 75, 0.35);
  background: linear-gradient(135deg, rgba(255, 251, 240, 0.95), rgba(232, 250, 245, 0.9));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
  animation: borderPulse 2.4s ease-in-out infinite;
  transition: transform 0.2s ease, background 0.2s ease;
}

.restricted-access:hover {
  transform: translateY(-2px);
}

.restricted-access a {
  color: var(--card-accent);
  font-weight: 700;
}

.restricted-access a:hover {
  color: var(--card-accent-2);
  text-decoration: underline;
}

@keyframes cardReveal {
  0% {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes borderPulse {
  0% {
    border-color: rgba(11, 93, 75, 0.35);
    box-shadow: 0 0 0 0 rgba(11, 93, 75, 0.18);
  }

  50% {
    border-color: rgba(11, 93, 75, 0.65);
    box-shadow: 0 0 0 6px rgba(11, 93, 75, 0.12);
  }

  100% {
    border-color: rgba(11, 93, 75, 0.35);
    box-shadow: 0 0 0 0 rgba(11, 93, 75, 0.18);
  }
}

.row>div:nth-child(1) .custom-card {
  animation-delay: 0.05s;
}

.row>div:nth-child(2) .custom-card {
  animation-delay: 0.12s;
}

.row>div:nth-child(3) .custom-card {
  animation-delay: 0.19s;
}

.row>div:nth-child(4) .custom-card {
  animation-delay: 0.26s;
}

.row>div:nth-child(5) .custom-card {
  animation-delay: 0.33s;
}

.row>div:nth-child(6) .custom-card {
  animation-delay: 0.4s;
}

@media (max-width: 768px) {
  .container>h1.display-5 {
    font-size: 2rem !important;
  }

  .custom-card img {
    height: 150px;
  }

  .lead {
    font-size: 1rem;
  }

  .card.custom-card button.form-control {
    height: 40px;
  }
}

@media (min-width: 992px) {
  .custom-card img {
    height: 190px;
  }
}

@media (prefers-reduced-motion: reduce) {

  .custom-card,
  .custom-card img,
  .card.custom-card button.form-control,
  .card.custom-card button.form-control::after,
  .restricted-access {
    transition: none !important;
    animation: none !important;
  }
}
</style>
