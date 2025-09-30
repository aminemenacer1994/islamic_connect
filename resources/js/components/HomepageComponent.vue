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
              <div class="row mb-3">
                <div class="col-12">
                  <div class="controls d-flex flex-row justify-content-start text-left">
                    <button style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" class="btn btn-lg me-2"
                      onclick="window.location.href='/quran'">Get Started</button>
                    <button style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" class="btn btn-lg"
                      onclick="window.location.href='/support'">Donate Today</button>
                  </div>
                </div>
              </div>



            </div>
            <div class="col-md-6">

              <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active" data-bs-interval="3000">
                    <img src="/images/companion2.png" class="d-block w-100 img-mobile-bigger" alt="Quran companion">
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="/images/surat2.png" class="d-block w-100 img-mobile-bigger" alt="Quran explorer">
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="/images/podcast2.png" class="d-block w-100 img-mobile-bigger" alt="Audio podcasts">
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="/images/seerah2.png" class="d-block w-100 img-mobile-bigger" alt="Seerah timeline">
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="/images/radio2.png" class="d-block w-100 img-mobile-bigger" alt="Seerah timeline">
                  </div>
                  <div class="carousel-item" data-bs-interval="3000">
                    <img src="/images/locator2.png" class="d-block w-100 img-mobile-bigger" alt="Seerah timeline">
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
        </div>


        <!-- <section class="py-5 bg-transparent">
          <div class="container text-center mb-4">
            <h1 class="display-4 fw-bold mb-4">Our Trusted Partners</h1>
            <h2 class="lead container" style="line-height: 1.8em">
              We proudly collaborate with ethical and impactful platforms to bring you accessible, faith-driven
              experiences.
            </h2>
          </div>

          <div id="partnersCarousel" class="carousel slide py-2" data-bs-ride="carousel" data-bs-interval="4000">
            <div class="carousel-inner">
              <div v-for="(chunk, index) in chunkedPartners" :key="index"
                :class="['carousel-item', { active: index === 0 }]">
                <div class="row justify-content-center text-center">
                  <div v-for="(partner, i) in chunk" :key="i" class="col-6 col-md-3 mb-5">
                    <img :src="partner.icon" :alt="partner.name" class="partner-icon mb-4" />
                    <h4 class="fw-bold text-dark">{{ partner.name }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> -->

      </div>
      </hr>
    </div>
    <section>
      <PrayerTimes class="mb-3" />
    </section>

    <section>
      <div class="py-5 service-1">
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
                  <h3 class="fw-bold">Listen, Watch, Reflect</h3>
                  <p class="mt-3" style="font-size: 18px;">
                    Enjoy Quran recitations, insightful audio podcasts, and a rich image gallery of Islamic art. Learn
                    through sound, visuals, and reflection, making it easier to stay spiritually engaged anywhere.
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

    <section class="container pt-3">

      <!-- First Row -->
      <div class="row py-5">
        <div class="col-md-6 order-0 order-md-0">
          <h1 class="display-4 fw-bold text-left">
            Quran Companion Powered by AI, Built for Everyone
          </h1>
          <p class="lead pt-3 text-left" style="line-height: 1.8em">
            <strong>
              Experience the Quran with advanced tools for reading, listening, and understanding. From AI Text-to-Speech
              to screen reader support and voice search, it’s your accessible, intelligent way to
              connect with the Divine.
            </strong>
          </p>
          <div class="d-grid pt-2">
            <button class="form-control btn btn-lg" onclick="window.location.href='/quran'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
              type="button">
              <b>Learn more</b>
            </button>
          </div>
        </div>
        <div class="col-md-6 mt-4 order-1 order-md-1">
          <img src="/images/companion2.png" class="d-block w-100 img-mobile-bigger" alt="Quran companion">
        </div>
      </div>

      <!-- Second Row -->
      <div class="row py-5">
        <div class="col-md-6 order-0 order-md-1">
          <h1 class="display-4 mt-2 fw-bold text-left">
            Stream Your Iman Anytime, Anywhere
          </h1>
          <p class="lead pt-3 text-left" style="line-height: 1.8em">
            <strong>
              Tune into uplifting Islamic podcasts, inspiring audio series, and live radio all in one place. Stay
              spiritually connected through sound, reflection, and knowledge on the go.
            </strong>
          </p>
          <div class="d-grid pt-2">
            <button class="form-control btn btn-lg mb-3" onclick="window.location.href='/content'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
              type="button">
              <b>Learn more</b>
            </button>
          </div>
        </div>
        <div class="col-md-6 order-1 order-md-0">
          <img src="/images/podcast2.png" class="d-block w-100 img-mobile-bigger" alt="Quran companion">
        </div>
      </div>

      <!-- Third Row -->
      <div class="row py-5">
        <div class="col-md-6 order-0 order-md-0">
          <h1 class="display-4 mt-2 fw-bold text-left">
            Explore the Quran, Deeply and Intuitively
          </h1>
          <p class="lead pt-3 text-left" style="line-height: 1.8em">
            <strong>
              Search, explore, and engage with every verse. Discover tafsir, translations, and recitations with tools
              designed for simplicity, speed, and spiritual growth.
            </strong>
          </p>
          <div class="d-grid pt-2">
            <button class="form-control btn btn-lg mb-3" onclick="window.location.href='/surat'"
              style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
              type="button">
              <b>Learn more</b>
            </button>
          </div>
        </div>
        <div class="col-md-6 order-1 order-md-1">
          <img src="/images/surat2.png" class="d-block w-100 img-mobile-bigger" alt="Quran companion">
        </div>
      </div>
    </section>


    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <h2 class="section-title">Our Impact in Numbers</h2>
            <p class="section-lead">Measurable results showing how we're making Islamic knowledge accessible to all</p>

            <div class="row container-fluid stats-grid">
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>60+</h3>
                  <p>Countries</p>
                  <small>Global reach</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>500+</h3>
                  <p>Cities</p>
                  <small>Worldwide presence</small>
                </div>
              </div>

              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>100%</h3>
                  <p>Accessibility & SEO</p>
                  <small>Score</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>1,090.9%</h3>
                  <p>Growth</p>
                  <small>Returning users</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 combined-section">
      <div class="container-fluid">
        <div class="row align-items-stretch">
          <!-- Value Proposition Column -->
          <div class="col-lg-1 mb-4">
          </div>
          <div class="col-lg-5 mb-4">
            <div class="value-proposition-wrapper">

              <div class="form-header text-center mb-4">
                <h2 class="mb-3">Strategic Impact Areas</h2>
              </div>
              <div class="row">
                <div class="col-md-6 mb-4">
                  <div class="value-card">
                    <div class="value-icon">📚</div>
                    <h4>Educational Content</h4>
                    <p>Developing comprehensive Quranic explanations, Hadith collections, and scholarly resources</p>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="value-card">
                    <div class="value-icon">♿</div>
                    <h4>Accessibility Features</h4>
                    <p>Implementing screen reader support and voice interfaces for inclusive access</p>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="value-card">
                    <div class="value-icon">⚙️</div>
                    <h4>Platform Infrastructure</h4>
                    <p>Maintaining robust servers and scalable architecture for global user base</p>
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <div class="value-card">
                    <div class="value-icon">🌍</div>
                    <h4>Global Outreach</h4>
                    <p>Expanding to underserved Muslim communities worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Donation Section Column -->
          <div class="col-lg-5 mb-4">
            <div class="donation-form">
              <div class="form-header text-center mb-4">
                <h3 class="mb-3">Make a Difference</h3>
                <p class="text-muted">Your support enables us to continue our mission</p>
              </div>

              <!-- Trust Indicators -->
              <div class="trust-indicators mb-4">
                <div class="trust-item">
                  <i class="fas fa-lock"></i>
                  <span>Secure Payment</span>
                </div>
                <div class="trust-item">
                  <i class="fas fa-shield-alt"></i>
                  <span>SSL Encrypted</span>
                </div>
                <div class="trust-item">
                  <i class="fas fa-certificate"></i>
                  <span>Stripe Verified</span>
                </div>
              </div>

              <!-- Summary -->
              <div v-if="isValidAmount" class="summary-section mb-4">
                <div class="summary-header">
                  <h6>Ready to Contribute</h6>
                </div>
                <div class="summary-item">
                  <span>Amount:</span>
                  <strong>£{{ finalAmount }}</strong>
                </div>
                <div class="summary-item">
                  <span>Your Impact:</span>
                  <strong>{{ impactMessage }}</strong>
                </div>
              </div>

              <!-- Submit Button -->
              <button class="btn btn-primary w-100" @click="processDonation" :disabled="!isValidAmount">
                <i class="fas fa-lock me-2"></i>
                Proceed to Secure Payment
              </button>

              <div class="security-guarantee text-center mt-3">
                <p class="small text-muted">
                  <i class="fas fa-shield-alt me-1"></i>
                  Your contribution is securely processed by Stripe. We never store your payment details.
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-1 mb-4">
          </div>
        </div>
      </div>
    </section>

    <!-- AI tools & features -->
    <section class="py-5">
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
                <img src="images/podcasting.png" width="60px" />
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
                <img src="images/voice-recognition.png" width="70px" />
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
                <img src="images/elearning.png" width="60px" />
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
                <img src="images/content.png" width="60px" />
              </div>
              <div>
                <h4 class="mb-2 mb-lg-3 fw-bold">
                  Generate Text Summary - Turn Long Text into Clear, Quick Insights
                </h4>
                <p>
                  Quickly condense long pieces of text into clear, concise summaries.
                  This feature uses AI to extract
                  the key points and main ideas, helping you understand content faster and save time.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="text-primary me-4">
                <img src="images/highlighter.png" width="60px" />
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
                <img src="images/chat.png" width="60px" />
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

    <!-- Quick Join Section -->
    <!-- Enhanced Quick Join Section -->
    <section class="py-5 quick-join-section" style="
  background: linear-gradient(135deg, #00bfa6 0%, #1a5f7a 100%);
  position: relative;
  overflow: hidden;
">
      <!-- Background Elements -->
      <div style="
    position: absolute;
    top: -50%;
    right: -10%;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
  "></div>
      <div style="
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite 2s;
  "></div>
      <div style="
    position: absolute;
    top: 20%;
    left: 10%;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    animation: float 10s ease-in-out infinite 1s;
  "></div>

      <div class="container" style="position: relative; z-index: 2;">
        <div class="row align-items-center">
          <div class="col-lg-7 text-center text-lg-start">
            <h2 class="text-white fw-bold mb-3" style="
          font-size: 2.5rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          background: linear-gradient(45deg, #ffffff, #e8fefe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        ">Ready to Transform Your Daily Spiritual Journey?</h2>
            <p class="text-white mb-4" style="
          font-size: 1.2rem;
          opacity: 0.9;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        ">Join now and receive your first spiritual reminder within minutes. Start your day with divine inspiration!
            </p>

          </div>

          <div class="col-lg-5 text-center">
            <!-- Join Cards -->
            <div class="row g-3">
              <div class="col-12">
                <div style="
              background: rgba(255, 255, 255, 0.95);
              padding: 1.5rem;
              border-radius: 20px;
              box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
              border: 2px solid rgba(255, 255, 255, 0.3);
              backdrop-filter: blur(10px);
              transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              position: relative;
              overflow: hidden;
            " class="join-card-hover">
                  <!-- WhatsApp Card -->
                  <div class="d-flex align-items-center mb-3">
                    <div style="
                  width: 50px;
                  height: 50px;
                  background: linear-gradient(135deg, #25D366, #128C7E);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 1rem;
                  box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
                ">
                      <i class="fab fa-whatsapp text-white" style="font-size: 1.5rem;"></i>
                    </div>
                    <div class="text-start">
                      <h5 class="fw-bold mb-1" style="color: #1a5f7a;">WhatsApp Channel</h5>
                      <small class="text-muted">Daily verses & instant reminders</small>
                    </div>
                  </div>
                  <a href="https://lnkd.in/ebUNhthw" class="btn w-100" target="_blank" style="
                background: linear-gradient(135deg, #25D366, #128C7E);
                color: white;
                font-weight: 700;
                padding: 1rem 2rem;
                border-radius: 12px;
                border: none;
                font-size: 1.1rem;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
                position: relative;
                overflow: hidden;
              " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(37, 211, 102, 0.6)';"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(37, 211, 102, 0.4)';">
                    <i class="fab fa-whatsapp me-2"></i>Join WhatsApp Channel
                    <span style="
                  position: absolute;
                  top: 50%;
                  right: 1rem;
                  transform: translateY(-50%);
                  font-size: 0.9rem;
                  opacity: 0.9;
                ">→</span>
                  </a>
                  <!-- <div class="mt-2">
                    <small class="text-muted" style="font-weight: 500;">
                      <i class="fas fa-users me-1"></i>2,800+ active members
                    </small>
                  </div> -->
                </div>
              </div>

              <div class="col-12">
                <div style="
              background: rgba(255, 255, 255, 0.95);
              padding: 1.5rem;
              border-radius: 20px;
              box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
              border: 2px solid rgba(255, 255, 255, 0.3);
              backdrop-filter: blur(10px);
              transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              position: relative;
              overflow: hidden;
            " class="join-card-hover">
                  <!-- Telegram Card -->
                  <div class="d-flex align-items-center mb-3">
                    <div style="
                  width: 50px;
                  height: 50px;
                  background: linear-gradient(135deg, #0088cc, #006699);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 1rem;
                  box-shadow: 0 5px 15px rgba(0, 136, 204, 0.4);
                ">
                      <i class="fab fa-telegram text-white" style="font-size: 1.5rem;"></i>
                    </div>
                    <div class="text-start">
                      <h5 class="fw-bold mb-1" style="color: #1a5f7a;">Telegram Community</h5>
                      <small class="text-muted">In-depth content & discussions</small>
                    </div>
                  </div>
                  <a href="https://lnkd.in/e8sT525W" class="btn w-100" target="_blank" style="
                background: linear-gradient(135deg, #0088cc, #006699);
                color: white;
                font-weight: 700;
                padding: 1rem 2rem;
                border-radius: 12px;
                border: none;
                font-size: 1.1rem;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(0, 136, 204, 0.4);
                position: relative;
                overflow: hidden;
              " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0, 136, 204, 0.6)';"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(0, 136, 204, 0.4)';">
                    <i class="fab fa-telegram me-2"></i>Join Telegram Community
                    <span style="
                  position: absolute;
                  top: 50%;
                  right: 1rem;
                  transform: translateY(-50%);
                  font-size: 0.9rem;
                  opacity: 0.9;
                ">→</span>
                  </a>
                  <!-- <div class="mt-2">
                    <small class="text-muted" style="font-weight: 500;">
                      <i class="fas fa-users me-1"></i>3,200+ active members
                    </small>
                  </div> -->
                </div>
              </div>
            </div>

            <!-- Trust Badge -->
            <div class="mt-3" style="
          background: rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          backdrop-filter: blur(10px);
          display: inline-block;
        ">
              <div class="d-flex align-items-center" style="gap: 0.5rem;">
                <i class="fas fa-shield-alt text-white" style="font-size: 1.1rem;"></i>
                <small class="text-white fw-bold">100% Free • Easy Unsubscribe</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Icons -->
      <div style="
          position: absolute;
          bottom: 20px;
          right: 20px;
          opacity: 0.1;
          font-size: 3rem;
          animation: float 4s ease-in-out infinite;
        ">
        <i class="fas fa-quran"></i>
      </div>
    </section>



    <!-- newsletter -->
    <!-- <section class="py-4 my-md-5">
      <div class="container">
        <div class="text-center">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <span class="text-muted">Newsletter</span>
              <h2 class="display-5 fw-bold">Subscribe Today</h2>
              <p class="lead">
                Stay connected with Islamic Connect — subscribe to our newsletter for the latest updates, new features,
                inspiring articles, and resources to deepen your Islamic knowledge.
              </p>
              <div class="mx-auto mt-3">
                <form class="row g-3">
                  <div class="col-md-4">
                    <input class="form-control bg-light" placeholder="Full name" type="text">
                  </div>
                  <div class="col-md-4">
                    <input class="form-control bg-light" placeholder="Email address" type="text">
                  </div>
                  <div class="col-md-4">
                    <div class="d-grid">
                      <button class="form-control btn "
                        style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; "
                        type="button">
                        <b>Subscribe</b>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- faq 
    <section class="py-5">
      <div class="container">
        <div class="row justify-content-center text-center mb-5">
          <div class="col-lg-8 col-xxl-7">
            <h1 class="display-5 fw-bold  mb-3">Frequently Asked Questions</h1>
            <p class="lead text-muted fw-normal lh-base">
              Have questions or need assistance? We're here to help! Reach out to Islamic Connect via email for support,
              feedback, or inquiries about our content and services.
            </p>
          </div>
        </div>

        <div class="accordion" id="faqAccordion">
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faqHeading1">
              <button class="accordion-button fw-medium" type="button" data-bs-toggle="collapse"
                data-bs-target="#faqCollapse1" aria-expanded="true" aria-controls="faqCollapse1">
                What is Islamic Connect and how can it benefit me?
              </button>
            </h2>
            <div id="faqCollapse1" class="accordion-collapse collapse show" aria-labelledby="faqHeading1"
              data-bs-parent="#faqAccordion">
              <div class="accordion-body lh-base pt-2">
                <strong>Islamic Connect</strong> is a digital platform offering Quranic content, live streams, articles,
                and more — designed to improve your learning and spiritual experience with accessibility-first features.
              </div>
            </div>
          </div>

          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faqHeading2">
              <button class="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse"
                data-bs-target="#faqCollapse2" aria-expanded="false" aria-controls="faqCollapse2">
                How can I listen to Quran recitations on your platform?
              </button>
            </h2>
            <div id="faqCollapse2" class="accordion-collapse collapse" aria-labelledby="faqHeading2"
              data-bs-parent="#faqAccordion">
              <div class="accordion-body lh-base pt-2">
                You can browse any Surah and tap the play icon beside a verse to hear its recitation. Features like
                auto-scroll and synced highlighting enhance the experience.
              </div>
            </div>
          </div>

          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faqHeading3">
              <button class="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse"
                data-bs-target="#faqCollapse3" aria-expanded="false" aria-controls="faqCollapse3">
                Is Islamic Connect accessible for visually impaired users?
              </button>
            </h2>
            <div id="faqCollapse3" class="accordion-collapse collapse" aria-labelledby="faqHeading3"
              data-bs-parent="#faqAccordion">
              <div class="accordion-body lh-base pt-2">
                Yes. Our platform supports screen readers, keyboard navigation, gesture controls, and text-to-speech so
                all users — especially the visually impaired — can benefit.
              </div>
            </div>
          </div>

          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faqHeading4">
              <button class="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse"
                data-bs-target="#faqCollapse4" aria-expanded="false" aria-controls="faqCollapse4">
                Can I bookmark or save verses for later?
              </button>
            </h2>
            <div id="faqCollapse4" class="accordion-collapse collapse" aria-labelledby="faqHeading4"
              data-bs-parent="#faqAccordion">
              <div class="accordion-body lh-base pt-2">
                Yes, you can bookmark ayahs, organize them into collections with custom names, colors, and even add
                dates. Bookmarks are saved locally or to your profile if logged in.
              </div>
            </div>
          </div>

          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="faqHeading5">
              <button class="accordion-button collapsed fw-medium" type="button" data-bs-toggle="collapse"
                data-bs-target="#faqCollapse5" aria-expanded="false" aria-controls="faqCollapse5">
                How do I report errors or suggest improvements?
              </button>
            </h2>
            <div id="faqCollapse5" class="accordion-collapse collapse" aria-labelledby="faqHeading5"
              data-bs-parent="#faqAccordion">
              <div class="accordion-body lh-base pt-2">
                Please email us at <a href="mailto:support@islamicconnect.org">support@islamicconnect.org</a> to report
                issues, bugs, or to suggest new features. Your feedback helps us grow.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    -->

    <!-- contact -->
    <section class="py-5" style="background: #fff; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
      <div class="container-fluid">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xxl-7">
            <h1 class="display-5 fw-bold mb-3">Contact Us</h1>
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
                    <button class="form-control"
                      style="background: #00bfa6; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; height: 48px"
                      type="submit">
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
                  <i class="bi bi-instagram h4" style="color: black"></i>
                </a>
                <a href="https://www.tiktok.com/@islamic_connect24" class="text-decoration-none">
                  <i class="bi bi-tiktok h4" style="color: black;"></i>
                </a>
                <a href="https://www.linkedin.com/company/islamic-connect/?viewAsMember=true"
                  class="text-decoration-none">
                  <i class="bi bi-linkedin h4" style="color: black;"></i>
                </a>
                <a href="https://x.com/islamiconnect24" class="text-decoration-none">
                  <i class="bi bi-twitter-x h4" style="color: black;"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </section>
  </div>
</template>
<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.join-card-hover:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .quick-join-section {
    padding: 3rem 0 !important;
  }

  .quick-join-section h2 {
    font-size: 2rem !important;
    text-align: center !important;
  }

  .join-card-hover {
    margin-bottom: 1rem;
  }
}

.partner-icon {
  width: 120px;
  height: 120px;
  object-fit: contain;
  transition: filter 0.3s ease, transform 0.3s ease;
}

.partner-icon:hover {
  transform: scale(1.1);
}

@media (max-width: 576px) {
  .partner-icon {
    width: 64px;
    height: 64px;
  }

  h5 {
    font-size: 1.25rem;
  }

  p.fs-6 {
    font-size: 0.95rem;
  }
}

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
  border: 1px solid darkgreen;
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
      background-color: darkgreen;
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
      background-color: darkgreen;
    }
  }
}
</style>
<script defer>
import axios from "axios";
import PrayerTimes from "./translation/PrayerTimes.vue";
import AyahOfTheDay from './translation/AyahOfTheDay.vue';

export default {
  components: {
    // HijriCalendar
    PrayerTimes,
    AyahOfTheDay
  },
  data() {
    return {
      amount: 10,
      partners: [
        { name: "Ana Atlou", icon: "/images/aatlout.webp" },
        { name: "Noor Taibah", icon: "/images/algerian.png" },
        { name: "Algerian Quran", icon: "/images/aatlout.webp" },
        { name: "Islamic Connect", icon: "/images/algerian.png" }
      ],
      chunkSize: 4,
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
  computed: {
    chunkedPartners() {
      const chunks = [];
      for (let i = 0; i < this.partners.length; i += this.chunkSize) {
        chunks.push(this.partners.slice(i, i + this.chunkSize));
      }
      return chunks;
    },
    finalAmount() {
      return this.amount;
    },
    isValidAmount() {
      return this.finalAmount > 0;
    },
    impactMessage() {
      if (this.amount >= 100) return 'Major platform enhancement';
      if (this.amount >= 50) return 'Content development for many users';
      if (this.amount >= 25) return 'Supports multiple users monthly';
      return 'Helps maintain basic access';
    },
    stripeUrl() {
      const amountInCents = this.finalAmount * 100;
      return `https://donate.stripe.com/6oE5kY84oc3q7fy145?amount=${amountInCents}`;
    }
  },
  methods: {
    processDonation() {
      if (!this.isValidAmount) {
        alert('Please select a contribution amount.');
        return;
      }

      window.location.href = this.stripeUrl;
    },
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
<style scoped>
/* Combined Section */
.combined-section {
  padding: 80px 0;
  background: #f8f9fa;
}


/* Value Cards */
.value-card {
  background: #fafbfc;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.value-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #1a5f7a;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.value-card:hover::before {
  transform: scaleY(1);
}

.value-icon {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.value-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a5f7a;
  margin-bottom: 1rem;
}

.value-card p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}

/* Donation Section */
.donation-form {
  background: #fff;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
  position: relative;
  height: 100%;
}

.donation-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1a5f7a, #2c3e50);
  border-radius: 16px 16px 0 0;
}

.form-header h3 {
  font-size: 1.75rem;
  padding-top: 5px;
  font-weight: 800;
  color: #2c3e50;
}

.form-header h2 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #2c3e50;
}

.form-header p {
  font-size: 1.1rem;
  color: #6c757d;
}

/* Trust Indicators */
.trust-indicators {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #495057;
  font-weight: 500;
}

.trust-item i {
  color: #1a5f7a;
}

/* Enhanced Summary */
.summary-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #1a5f7a;
}

.summary-header {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}

.summary-header h6 {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.summary-item:not(:last-child) {
  border-bottom: 1px solid #dee2e6;
}

/* Enhanced Primary Button */
.btn-primary {
  background: #1a5f7a;
  border: none;
  color: white;
  padding: 1.25rem 2rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover:not(:disabled) {
  background: #144a5f;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 95, 122, 0.4);
}

.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.security-guarantee {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.card:hover {
  transform: translateY(-5px);
}

.stats-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #1a5f7a 0%, #2c3e50 100%);
  color: white;
}

.section-title {
  font-size: 2.7rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.section-lead {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

.stats-grid {
  margin-top: 2rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
}

.stat-card h3 {
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.stat-card p {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: rgba(255, 255, 255, 0.9);
}

.stat-card small {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.value-section {
  padding: 5rem 0;
  background: #f8f9fa;
}

.value-section h2 {
  font-size: 2.25rem;
  font-weight: 700;
  color: #2c3e50;
}

.value-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.value-card h4 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a5f7a;
  margin-bottom: 1rem;
}

.value-card p {
  color: #6c757d;
  line-height: 1.6;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {

  .stats-section,
  .value-section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .stat-card h3 {
    font-size: 2.25rem;
  }

  .value-card {
    padding: 2rem;
  }
}

.partner-icon {
  width: 150px;
  height: 150px;
  object-fit: contain;
  transition: filter 0.3s ease, transform 0.3s ease;
}

.partner-icon:hover {
  transform: scale(1.1);
}

h4 {
  font-size: 1.8rem;
  font-weight: 800;
}

@media (max-width: 768px) {
  .partner-icon {
    width: 130px;
    height: 130px;
  }

  h4 {
    font-size: 1.45rem;
  }
}
</style>
