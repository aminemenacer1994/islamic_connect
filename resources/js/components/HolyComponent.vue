<template>
    <div class="container py-4">
        <h1 class="text-center fw-bold display-5 mb-4">Quran Portal</h1>
        <p class="text-center mb-4 lead">
            Islamic Connect provides seamless access to the Qur’an, enabling Muslims to read, listen, and reflect on its
            divine message. Our platform is dedicated to helping individuals connect with the words of Allah.
        </p>
        <div class="row g-4 ">

            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden">
                    <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
                    <img src="/images/qc.png" alt="Islamic Shops" class="w-100 pt-4" style="object-fit: contain;" />
                    <div class="p-3">
                        <h1 class="mb-2 fw-bold text-dark text-center">Quran Explorer</h1>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore the beauty and
                            guidance of the Quran at your fingertips — perfect for seekers,
                            travelers, and newcomers alike.</p>
                        <button class="form-control" onclick="window.location.href='/quran'" type="submit">
                            <span class="text-center w-100"><b>Explore Quran</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden">
                    <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
                    <img src="/images/qe.png" alt="Islamic Shops" class="w-100 pt-4" style="object-fit: contain;" />
                    <div class="p-3">
                        <h1 class="mb-2 fw-bold text-dark text-center single-line-title">Quran Companion</h1>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore the beauty and
                            guidance of the Quran at your fingertips. Whether you're deepening your faith or discovering
                            its wisdom for the first time.</p>
                        <button class="form-control" onclick="window.location.href='/surat'" type="submit">
                            <span class="text-center w-100"><b>Search Recitations</b></span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-lg-4">
                <div class="card custom-card rounded-4 overflow-hidden">
                    <!-- <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span> -->
                    <img src="/images/history.png" alt="Islamic Shops" class="w-100 pt-4"
                        style="object-fit: contain;" />
                    <div class="p-3">
                        <h1 class="mb-2 fw-bold text-dark text-center">Quran History</h1>
                        <p class="card-text text-muted text-wrap text-center"
                            style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Explore the rich
                            history of the Quran from its divine revelation to its meticulous preservation right at your
                            fingertips.</p>
                        <button class="form-control" onclick="window.location.href='/history'" type="submit">
                            <span class="text-center w-100"><b>Discover History</b></span>
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
.container {
  --section-ink: #1d2b2f;
  --section-muted: #576765;
  --card-ink: #1b2c30;
  --card-muted: #5b6c6b;
  --card-accent: #0f6e63;
  --card-accent-2: #0a4b45;
  --card-gold: #d2a24b;
  --card-sand: #fff7ea;
  --card-border: rgba(15, 110, 99, 0.14);
  --card-shadow: 0 14px 30px rgba(15, 53, 48, 0.12), 0 4px 10px rgba(15, 53, 48, 0.08);
  --card-shadow-hover: 0 22px 46px rgba(15, 53, 48, 0.16), 0 8px 16px rgba(15, 53, 48, 0.1);
  --card-glow: rgba(210, 162, 75, 0.22);
  border-radius: 26px;
  padding: 2rem 1.5rem;
}

.container > h1.display-5 {
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
    radial-gradient(120% 120% at 0% 0%, rgba(210, 162, 75, 0.28) 0%, rgba(255, 255, 255, 0) 60%),
    radial-gradient(120% 120% at 100% 0%, rgba(15, 110, 99, 0.18) 0%, rgba(255, 255, 255, 0) 55%),
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
  background: radial-gradient(circle at 35% 35%, rgba(15, 110, 99, 0.22), rgba(15, 110, 99, 0));
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
  background: linear-gradient(90deg, var(--card-accent), var(--card-gold), var(--card-accent-2));
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
  background: linear-gradient(135deg, var(--card-accent) 0%, #0f6a60 45%, var(--card-accent-2) 100%);
  border: 1px solid rgba(15, 110, 99, 0.45);
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

.single-line-title {
  white-space: normal;
  line-height: 1.1;
  font-size: clamp(1.6rem, 2.5vw, 2.2rem);
  word-break: break-word;
  overflow-wrap: anywhere;
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

.row > div:nth-child(1) .custom-card { animation-delay: 0.05s; }
.row > div:nth-child(2) .custom-card { animation-delay: 0.12s; }
.row > div:nth-child(3) .custom-card { animation-delay: 0.19s; }
.row > div:nth-child(4) .custom-card { animation-delay: 0.26s; }
.row > div:nth-child(5) .custom-card { animation-delay: 0.33s; }
.row > div:nth-child(6) .custom-card { animation-delay: 0.4s; }

@media (max-width: 768px) {
  .container > h1.display-5 { font-size: 2rem !important; }
  .custom-card img { height: 150px; }
  .lead { font-size: 1rem; }
  .card.custom-card button.form-control { height: 40px; }
}

@media (min-width: 992px) {
  .custom-card img { height: 190px; }
}

@media (prefers-reduced-motion: reduce) {
  .custom-card,
  .custom-card img,
  .card.custom-card button.form-control,
  .card.custom-card button.form-control::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>
