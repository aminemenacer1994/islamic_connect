<template>
  <div>
    <!-- header -->
    <div class="jumbotron" style=" box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">

      <!-- Content -->
      <div class="container-fluid" style="position: relative; z-index: 2">
        <div class="container-fluid text-center">
          <div class="row mb-2 ">
            <div class="col-md-6">
              <h1 class="display-4 mt-1 fw-bold text-left container">
                Connecting You to Islamic Knowledge Seamlessly and Accessibly
              </h1>
              <h2 class="lead container pt-3 text-left" style="line-height: 1.8em">
                <strong>
                  Islamic Connect is your all-in-one Islamic platform designed to help you explore the Quran, learn from
                  trusted Islamic content, and access AI-powered tools for a better spiritual experience anytime,
                  anywhere.</strong>
              </h2>
              <div class="col-lg-12">
                <div class="container controls d-block d-md-flex justify-content-start text-left">
                  <button style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" class="btn btn-lg me-2"
                    onclick="window.location.href='/quran'">Get Started</button>
                  <button style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" class="btn btn-lg"
                    onclick="window.location.href='/support'">Donate Today</button>
                </div>
              </div>
            </div>
            <div class="col-md-6">

              <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active" data-bs-interval="3000">
                    <img src="/images/quran.png" class="d-block w-100 img-mobile-bigger" alt="Quran companion">
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="/images/surat.png" class="d-block w-100 img-mobile-bigger" alt="Quran explorer">
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="/images/podcast1.png" class="d-block w-100 img-mobile-bigger" alt="Audio podcasts">
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="/images/seerah_main1.png" class="d-block w-100 img-mobile-bigger" alt="Seerah timeline">
                  </div>
                </div>
                <button class="carousel-control-prev text-dark" type="button" data-bs-target="#carouselExampleInterval"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon text-dark" aria-hidden="true"></span>
                  <span class="visually-hidden text-dark">Previous</span>
                </button>
                <button class="carousel-control-next text-dark" type="button" data-bs-target="#carouselExampleInterval"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon text-dark" aria-hidden="true"></span>
                  <span class="visually-hidden text-dark">Next</span>
                </button>
              </div>
            </div>
          </div>
          <PrayerTimes />
        </div>

      </div>
      </hr>
    </div>
    <section>
      <div class="py-3 service-1">
        <div class="container">
          <!-- Row  -->
          <div class="row ">
            <!-- Column -->
            <div class="row justify-content-center text-center mb-3">
              <div class="col-lg-8 col-xl-7">
                <h1 class="display-4 mb-3 fw-bold">What do we Offer ?</h1>
              </div>
            </div>
            <div class="col-md-4 wrap-service1-box">
              <div class="card border-0 card-shadow mb-4">
                <div class="card-body text-center">
                  <div class="my-3"><img src="images/galaxy.png" width="100px" /></div>
                  <h3 class="fw-bold">Explore with Ease</h3>
                  <p class="mt-3" style="font-size: 18px;">Search the Quran, Duas, and Seerah effortlessly, using simple
                    keywords or topics. Whether you’re seeking inspiration or answers, you’ll find meaningful content
                    instantly, making your spiritual journey easier.</p>
                  <div class="d-grid">
                    <button class="form-control" onclick="window.location.href='/surat'"
                      style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
                      type="submit">
                      <b>View more</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Column -->
            <div class="col-md-4 wrap-service1-box">
              <div class="card border-0 card-shadow mb-4">
                <div class="card-body text-center">
                  <div class="my-3"><img src="images/watching.png" width="100px" /></div>
                  <h3 class="fw-bold">Listen, Watch & Reflect</h3>
                  <p class="mt-3" style="font-size: 18px;">
                    Enjoy Quran recitations, insightful audio podcasts, and a rich image gallery of Islamic art. Learn
                    through sound, visuals, and reflection, making it easier to stay spiritually engaged anywhere,
                    anytime with peace, purpose, and clarity.
                  </p>
                  <div class="d-grid">
                    <button class="form-control" onclick="window.location.href='/content'"
                      style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
                      type="submit">
                      <b>View more</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Column -->
            <div class="col-md-4 wrap-service1-box">
              <div class="card border-0 card-shadow mb-4">
                <div class="card-body text-center">
                  <div class="my-3"><img src="images/school.png" width="100px" /></div>
                  <h3 class="fw-bold">Learn Your Way</h3>
                  <p class="mt-3" style="font-size: 18px;">With text-to-speech, screen reader support, and bookmarking
                    ensures everyone can learn. It’s built for accessibility, allowing
                    everyone regardless of ability to engage with content comfortably.</p>
                  <div class="d-grid">
                    <button class="form-control" onclick="window.location.href='/quran'"
                      style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
                      type="submit">
                      <b>View more</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5" style="background: #e3e3e3; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
      <div class="container">
        <div class="row justify-content-center text-center mb-3">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-4 mb-3 fw-bold">Features</h1>
          </div>
          <p class="lead">Discover everything you need on Islamic Connect from Quranic recitation, tafseer, and live
            Islamic media, to powerful tools like notes and reflections, daily duas, and accurate prayer times. Organize
            your journey with personalized notes & bookmarks, and enjoy accessibility features like text-to-speech and
            voice search.</p>
        </div>
        <div class="row g-4 g-md-5">
          <div class="col-md-6  col-xl-4">
            <div class="text-primary mb-3 container">
              <div class="my-3"><img src="images/agenda.png" width="80px" /></div>
            </div>
            <h3 class="fw-bold">
              Notes & Reflections
            </h3>
            <p class="lead container pt-3 text-left" style="line-height: 1.8em">
              <strong>
                Save personal notes, reflections, and insights while studying Quran and Islamic content.
              </strong>
            </p>
          </div>
          <div class="col-md-6 col-xl-4">
            <div class="text-primary mb-3">
              <div class="my-3"><img src="images/pray.png" width="80px" /></div>
            </div>
            <h3 class="fw-bold">
              Duas
            </h3>
            <p class="lead container pt-3 text-left" style="line-height: 1.8em">
              <strong>
                Browse and recite authentic duas for daily life, protection, gratitude, and special occasions.
              </strong>
            </p>
          </div>
          <div class="col-md-6 col-xl-4">
            <div class="text-primary mb-3">
              <div class="my-3"><img src="images/praying-hands.png" width="80px" /></div>
            </div>
            <h3 class="fw-bold">
              Prayer Times
            </h3>
            <p class="lead container-fluid pt-3 text-left" style="line-height: 1.8em">
              <strong>
                Access precise prayer timings based on your location, with alerts to never miss a prayer.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>



    <section class="container pt-3">
      <!-- First row -->
      <div class="row py-5 container">
        <div class="col-md-6 order-0 order-md-0">
          <p class="display-4 mt-4 fw-bold text-left container">
            Quran Companion Powered by AI, Built for Everyone
          </p>
          <p class="lead container pt-3 text-left" style="line-height: 1.8em">
            <strong>
              Experience the Quran with advanced tools for reading, listening, and understanding. From AI Text-to-Speech
              to screen reader support and voice search it's your accessible, intelligent way to
              connect with the Divine.
            </strong>
            <div class="d-grid pt-2">
              <button class="form-control" onclick="window.location.href='/quran'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
                type="submit">
                <b>Learn more</b>
              </button>
            </div>
          </p>
        </div>
        <div class="col-md-6 mt-4 order-1 order-md-1">
          <img src="/images/quran.png" class="d-block text-right w-100 img-mobile-bigger" alt="Quran companion">
        </div>
      </div>


      <!-- Second row -->
      <div class="row pt-5 pb-5 py-5 container">
        <div class="col-md-6 order-1 order-md-0">
          <img src="/images/podcast1.png" class="d-block text-right w-100 img-mobile-bigger" alt="Quran companion">
        </div>
        <div class="col-md-6 pb-5 order-0 order-md-1">
          <h6 class="display-4 mt-2 fw-bold text-left container">
            Stream Your Iman Anytime, Anywhere
          </h6>
          <h6 class="lead container pt-3 text-left" style="line-height: 1.8em">
            <strong>
              Tune into uplifting Islamic podcasts, inspiring audio series, and live radio all in one place. Stay
              spiritually connected through sound, reflection, and knowledge on the go.
            </strong>
            <div class="d-grid pt-2">
              <button class="form-control" onclick="window.location.href='/content'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
                type="submit">
                <b>Learn more</b>
              </button>
            </div>
          </h6>
        </div>
      </div>


      <!-- Third row -->
      <div class="row pt-5 pb-5 py-5 container">
        <div class="col-md-6 order-0 order-md-0">
          <h5 class="display-4 mt-2 fw-bold text-left container">
            Explore the Quran, Deeply and Intuitively
          </h5>
          <h6 class="lead container pt-3 text-left" style="line-height: 1.8em">
            <strong>
              Search, explore, and engage with every verse. Discover tafsir, translations, and recitations with tools
              designed for simplicity, speed, and spiritual growth.
            </strong>
            <div class="d-grid pt-2">
              <button class="form-control" onclick="window.location.href='/surat'"
                style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
                type="submit">
                <b>Learn more</b>
              </button>
            </div>
          </h6>
        </div>
        <div class="col-md-6 order-1 order-md-1">
          <img src="/images/surat.png" class="d-block text-right w-100 img-mobile-bigger" alt="Quran companion">
        </div>
      </div>

    </section>




    <!-- AI tools & features -->
    <section style="background: #e3e3e3; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" class="py-5">
      <div class="container pt-3">
        <div class="row justify-content-center text-center mb-3">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-4 mb-3 fw-bold">AI Tools and Their Impact</h1>
          </div>
        </div>
        <div class="row pt-3 g-4 g-md-5">
          <h3 class="lead container pt-3 text-center" style="line-height: 1.8em">
            At Islamic Connect, our mission is deeply rooted in making the Quran and Islamic knowledge accessible to
            everyone, regardless of their abilities or learning needs. By harnessing the power of advanced AI tools, we
            are creating a platform that’s not just about providing information, but about empowering individuals
            through an inclusive and personalized learning experience.
            they benefit users:
          </h3>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/podcasting.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Speech-to-Text for Islamic Notes and Reflections
                </h4>
                <p>
                  Capture your spoken reflections, making it easier to document
                  your thoughts and reflections on Islamic teachings, while
                  ensuring accessibility for those who prefer audio to written
                  text.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/voice-recognition.png" width="60px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Speak, explore, and connect deeply with Quranic teachings.
                </h4>
                <p>
                  Effortlessly search Quranic verses, teachings, and guidance
                  using your voice. Experience a seamless, accessible way to
                  connect with Islam.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/elearning.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Versatile Note Editor with Advanced Customization Features
                </h4>
                <p>
                  A powerful and adaptable note editor designed to meet diverse
                  user needs, combining advanced editing capabilities with
                  extensive customization options. This tool emphasizes seamless
                  accessibility.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/attached-file.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Export Quranic Verses in multiple file Formats
                </h4>
                <p>
                  Easily export Quranic verses in multiple formats for study,
                  research, and sharing, offering flexibility and convenience
                  for personal reflection or educational purposes.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/highlighter.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Audio Synchronization with Word-by-Word Quranic Highlighting
                </h4>
                <p>
                  Enhance the Quranic recitation experience by synchronizing the
                  audio with the Quranic text. Each word is highlighted as it is
                  recited, helping users follow along with the pronunciation and
                  meaning of the words.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/chat.png" width="50px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Text-to-Speech for English Translation and Tafsir
                </h4>
                <p>
                  High-quality, spoken translations and Tafsir of the Quranic
                  verses, making the Divine message more accessible, gaining a
                  clearer understanding of the meanings and scholarly
                  interpretations of the Quran and enriching connection to the
                  sacred text.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- contact -->
    <section class="py-5">
      <div class="container-fluid">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xxl-7">
            <h2 class="display-5 fw-bold mb-3">Contact Us</h2>
            <b class="lead">
              Have questions or need assistance? We're here to help! Reach out
              to Islamic Connect via email for support, feedback or inquiries
              about our content and services.
            </b>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-6 mt-2">
            <form @reset="reset" @submit.prevent="sendMessage()">
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="mb-3">
                    <input class="form-control bg-light" v-model="form.firstname" name="firstname"
                      placeholder="First name" type="text" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <input class="form-control bg-light" v-model="form.lastname" name="lastname" placeholder="Last name"
                      type="text" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <input class="form-control bg-light" v-model="form.email" name="email" placeholder="Email Adress"
                      type="email" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <input class="form-control bg-light" v-model="form.subject" name="subject" placeholder="subject"
                      type="text" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <input class="form-control bg-light" v-model="form.mobile" name="mobile" placeholder="Phone number"
                      type="number" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <textarea class="form-control bg-light" v-model="form.message" name="message"
                      placeholder="Your message" rows="4"></textarea>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="d-grid">
                    <button class="form-control" style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px" type="submit" >
                      <b>Send message</b>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- mailing list -->
    <!-- <section class="py-5" style="
        background: #00bfa6;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      ">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <h2 class="display-5 fw-bold text-center text-white">
              Subscribe to Mailing List
            </h2>
            <div class="mx-auto mt-3">
              <h3 class="lead container pt-1 text-center text-white" style="line-height: 1.8em">
                <b>
                  Sign up for our mailing list to receive the latest updates,
                  content, and educational resources directly in your inbox.</b>
              </h3>
              <form class="container row g-3 pb-3" @reset="reset" @submit.prevent="submitMail()">
                <div class="col-md-4">
                  <input class="form-control bg-light" v-model="form.name" placeholder="Full name" type="text" />
                </div>
                <div class="col-md-4">
                  <input class="form-control bg-light" v-model="form.email" placeholder="Email address" type="text" />
                </div>
                <div class="col-md-4">
                  <div class="d-grid">
                    <button class="form-control" style="background: #57c7b9; color: white; border: white solid 2px;"
                      type="submit">
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- footer -->
    <section class="py-4" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
      <footer>
        <div class="container-fluid">
          <div class="row align-items-center text-center text-lg-start">

            <!-- Copyright -->
            <div class="col-12 col-lg-4 mb-3 mb-lg-0 px-4">
              <h5 class="mb-0 fs-5">© 2025 Islamic Connect. All rights reserved.</h5>
            </div>

            <!-- Navigation Links -->
            <div class="col-12 col-lg-4 mb-3 mb-lg-0 px-4">
              <!-- <div class="d-flex justify-content-center flex-wrap gap-3">
                <a href="/home" class="text-dark text-decoration-none">
                  <h6 class="mb-0 fs-6">Home</h6>
                </a>
                <a href="/about" class="text-dark text-decoration-none">
                  <h6 class="mb-0 fs-6">About Us</h6>
                </a>
                <a href="/faq" class="text-dark text-decoration-none">
                  <h6 class="mb-0 fs-6">FAQ</h6>
                </a>
                <a href="/contact" class="text-dark text-decoration-none">
                  <h6 class="mb-0 fs-6">Contact</h6>
                </a>

              </div> -->
            </div>

            <!-- Social Icons -->
            <div class="col-12 col-lg-4 px-4">
              <div class="d-flex justify-content-center justify-content-lg-end gap-3">
                <a href="https://www.instagram.com/islamicconnect24/" class="text-decoration-none">
                  <i class="bi bi-instagram h4" style="color: rgb(0, 191, 166);"></i>
                </a>
                <a href="https://www.tiktok.com/@islamic_connect24" class="text-decoration-none">
                  <i class="bi bi-tiktok h4" style="color: rgb(0, 191, 166);"></i>
                </a>
                <a href="https://www.linkedin.com/company/islamic-connect/?viewAsMember=true"
                  class="text-decoration-none">
                  <i class="bi bi-linkedin h4" style="color: rgb(0, 191, 166);"></i>
                </a>
                <a href="https://x.com/islamiconnect24" class="text-decoration-none">
                  <i class="bi bi-twitter-x h4" style="color: rgb(0, 191, 166);"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </section>
  </div>
</template>
<style>
.controls {
  margin-top: 20px;
}

.controls button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  background-color: rgb(13, 182, 145);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.controls button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.controls button:hover:not(:disabled) {
  background-color: #0db691;
}

/* .service-1 {
  font-family: "Montserrat", sans-serif;
  color: #8d97ad;
  font-weight: 300;
} */

.service-1 h1,
.service-1 h2,
.service-1 h3,
.service-1 h4,
.service-1 h5,
.service-1 h6 {
  color: #3e4555;
}

.service-1 .font-weight-medium {
  font-weight: 500;
}

.service-1 .bg-light {
  background-color: #f4f8fa !important;
}

.service-1 .subtitle {
  color: #8d97ad;
  line-height: 24px;
}

.service-1 .card.card-shadow {
  -webkit-box-shadow: 0px 0px 30px rgba(115, 128, 157, 0.1);
  box-shadow: 0px 0px 30px rgba(115, 128, 157, 0.1);
}

.service-1 .wrap-service1-box .card-body {
  padding: 40px;
}

.service-1 .btn-success-gradiant {
  background: #2cdd9b;
  background: -webkit-linear-gradient(legacy-direction(to right), #2cdd9b 0%, #1dc8cc 100%);
  background: -webkit-gradient(linear, left top, right top, from(#2cdd9b), to(#1dc8cc));
  background: -webkit-linear-gradient(left, #2cdd9b 0%, #1dc8cc 100%);
  background: -o-linear-gradient(left, #2cdd9b 0%, #1dc8cc 100%);
  background: linear-gradient(to right, #2cdd9b 0%, #1dc8cc 100%);
  border: 0px;
}

.service-1 .btn-success-gradiant:hover {
  background: #1dc8cc;
  background: -webkit-linear-gradient(legacy-direction(to right), #1dc8cc 0%, #2cdd9b 100%);
  background: -webkit-gradient(linear, left top, right top, from(#1dc8cc), to(#2cdd9b));
  background: -webkit-linear-gradient(left, #1dc8cc 0%, #2cdd9b 100%);
  background: -o-linear-gradient(left, #1dc8cc 0%, #2cdd9b 100%);
  background: linear-gradient(to right, #1dc8cc 0%, #2cdd9b 100%);
}

.service-1 .btn-md {
  padding: 15px 45px;
  font-size: 16px;
}

.jumbotron-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.jumbotron-content {
  position: relative;
  z-index: 2;
}

/* CSS */
.button-37 {
  background-color: rgb(53, 163, 139);
  border: 1px solid rgb(53, 163, 139);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont,
    sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-37:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .img-mobile-bigger {
    width: 160%;
  }

  .button-37 {
    padding: 10px 30px;
  }

  .controls {
    .controls {
      margin-top: 20px;
    }

    .controls button {
      margin: 5px;
      padding: 10px 20px;
      border: none;
      background-color: rgb(13, 182, 145);
      color: white;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s ease;
    }

    .controls button:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }

    .controls button:hover:not(:disabled) {
      background-color: #0db691;
    }
  }
}
</style>
<script defer>
import axios from "axios";
import PrayerTimes from "./translation/PrayerTimes.vue";
// import HijriCalendar from "./translation/HijriCalendar.vue";
export default {
  components: {
    // HijriCalendar
    PrayerTimes,
  },
  data() {
    return {
      mailing: {},
      feedback: {},
      form: new Form({
        name: "",
        email: "",
      }),
      form: new Form({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        mobile: "",
        message: "",
      }),
    };
  },
  methods: {
    sendMessage() {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to send the message !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send message!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("/api/send-message", this.form)
            .then((res) => {
              if (!res.data.success) {
                Swal.fire({
                  position: "top-end",

                  icon: "success",
                  title: "Message sent successfully ",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.form.reset();
                $("#addNew").hide();
              } else if (res.data.success) {
                Swal.fire("Error!", "Unable to send message.", "error");
                this.form.reset();
                self.close();
              }
            })
            .catch(function (err) { });
        }
      });
    },
    submitMail() {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to join the mailing list !",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Submit",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("/api/submit-mail", this.form)
            .then((res) => {
              if (!res.data.success) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Mailing List Subscription Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.form.reset();
                $("#addNew").hide();
              } else if (res.data.success) {
                Swal.fire("Error!", "Unable to send message.", "error");
                this.form.reset();
                self.close();
              }
            })
            .catch(function (err) { });
        }
      });
    },
  },
};
</script>
