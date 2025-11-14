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
        <div class="card custom-card rounded-4 overflow-hidden">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/sr.png" alt="Seerah Timeline" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Seerah Timeline</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Seerah is the life story of
              Prophet Muhammad ﷺ, covering his birth, prophethood, teachings, events like battles, and his role in
              establishing Islam.
            </p>
            <button class="form-control" onclick="window.location.href='/mission'" type="submit">
              <span class="text-center w-100"><b>View Seerah</b></span>
            </button>
          </div>
        </div>
      </div>

      <!-- <div class="col-md-6 col-lg-4 d-flex pb-3">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden">
          <img src="/images/rug.png" alt="Seerah Timeline" class="w-100 mt-1" style="object-fit: contain;" />
          <div class="p-3">
            <h5 class="mb-2 fw-bold display-6 text-dark text-center">Salat Teachings</h5>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover the beauty of Islamic
              prayer with our Salat Guide. This walks you through each of the five daily prayers
            </p>
            <button class="form-control" onclick="window.location.href='/athkar'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Learn Salat</b></span>
            </button>
          </div>
        </div>
      </div> -->



      <div class="col-md-6 col-lg-4">
        <div class="card custom-card shadow-sm rounded-4 overflow-hidden">
          <img src="/images/name_allah1.png" alt="Names of Allah" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Names of Allah</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">The Names of Allah (Asma’ul Husna)
              are 99 beautiful names that describe Allah’s attributes, such as mercy, wisdom, power, and justice.</p>

            <button class="form-control" onclick="window.location.href='/name'" type="submit">
              <span class="text-center w-100"><b>Search Names</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/book2.png" alt="guides" class="w-100 pt-3" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Islamic Guides</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Discover a comprehensive collection
              of clear and reliable Islamic guides designed to support every stage of your spiritual journey.</p>
            <button class="form-control" onclick="window.location.href='/guide'" type="submit">
              <span class="text-center w-100"><b>Read Guides</b></span>
            </button>

          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style=" ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/fn.png" alt="Islamic Finance" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Islamic Finance</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Islamic finance refers to a
              financial system that operates in accordance with Shariah (Islamic law) and is rooted in ethical
              principles.
            </p>
            <button class="form-control" onclick="window.location.href='/finance'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Read More</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style=" ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/copywriter.png" alt="Islamic Finance" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Islamic Blogs</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Islamic finance refers to a
              financial system that operates in accordance with Shariah (Islamic law) and is rooted in ethical
              principles.
            </p>
            <button class="form-control" onclick="window.location.href='/read'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
              type="submit">
              <span class="text-center w-100"><b>Seach Blogs</b></span>
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-4">
        <div class="card custom-card rounded-4 overflow-hidden" style=" ">
          <span class="badge rounded-pill bg-success text-white position-absolute top-0 start-0 m-2">New</span>
          <img src="/images/idic.png" alt="Islamic Finance" class="w-100" style="object-fit: contain;" />
          <div class="p-3">
            <h1 class="mb-2 fw-bold text-dark text-center">Dictionary</h1>
            <p class="card-text text-muted text-wrap text-center"
              style="overflow: hidden; text-overflow: ellipsis; max-height: 4.5em;">Islamic dictionary is a
              specialized reference resource that provides definitions and explanations of terms, concepts, and phrases
              related to Islam
            </p>
            <button class="form-control" onclick="window.location.href='/books'"
              style="background: #0b5d4b; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white;height: 38px;padding: 0.375rem 0.75rem;"
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
/* Design tokens */
:root {
  --brand-1: #1a5f7a;
  --brand-2: #0b5d4b;
  --accent: #00bfa6;
  --text-1: #2c3e50;
  --text-2: #6c757d;
  --surface: #ffffff;
  --surface-muted: #f8f9fa;
  --border: #e9ecef;
  --shadow-sm: 0 4px 14px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 24px rgba(0, 0, 0, 0.10);
}

/* Typography & spacing */
.container>h1.display-5 {
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
  color: var(--text-1);
}

.lead {
  color: var(--text-2);
  line-height: 1.75;
  margin-left: auto;
  margin-right: auto;
}

.custom-card .display-6 {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--text-1);
}

.card.custom-card .card-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-2);
}

@media (max-width: 768px) {
  .container>h1.display-5 {
    font-size: 2rem !important;
  }

  .custom-card .display-6 {
    font-size: 1.1rem;
  }

  .custom-card img {
    height: 160px;
  }

  .lead {
    font-size: 1rem;
  }
}

@media (min-width: 992px) {
  .custom-card img {
    height: 190px;
  }
}

.card.custom-card .card-text {
  max-height: 4.5em;
  text-overflow: ellipsis;
}

.card.custom-card button.form-control {
  background: #0b5d4b;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  color: #fff;
  height: 38px;
  padding: 0.375rem 0.75rem;
  border: none;
}

.card.custom-card button.form-control:focus-visible {
  outline: 3px solid rgba(0, 191, 166, 0.45);
  outline-offset: 2px;
}

.custom-card {
  border: none;
  border-radius: 16px;
  background: #fff;
  height: 100%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
}

.custom-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.16);
}

.custom-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--brand-2), var(--brand-1));
  transform: scaleX(0.4);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.custom-card:hover::before {
  transform: scaleX(1);
}

.custom-card img {
  height: 180px;
  object-fit: contain;
  transition: transform 0.25s ease;
  border: none;
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
  animation: none;
}

.restricted-access {
  background: #28b66324;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.restricted-access:hover {
  background: #28b66333;
  transform: translateY(-2px);
}

.restricted-access a:hover {
  color: var(--brand-2);
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {

  .custom-card,
  .custom-card img,
  .card.custom-card button.form-control {
    transition: none !important;
  }
}
</style>
