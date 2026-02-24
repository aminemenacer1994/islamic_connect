<template>
  <div class="ic-home">
    <!-- header -->
    <div class="jumbotron ic-hero">

      <!-- Content -->
      <div class="container-fluid" style="position: relative;">
        <!-- Enhanced Hero Section -->
        <div class="container-fluid hero-wrapper text-center ic-hero__frame">
          <!-- Background Elements -->
          <div class="ic-hero__orb ic-hero__orb--primary"></div>
          <div class="ic-hero__orb ic-hero__orb--secondary"></div>

          <div class="row align-items-center ic-hero__grid">
            <div class="col-md-6">
              <div class="text-left">
                <!-- Badge -->
                <div class="ic-hero__badge ic-reveal" style="--ic-delay: 0.1s;">
                  <i class="fas fa-star me-2"></i>Trusted by thousands of Muslims worldwide
                </div>

                <h1 class="display-4 mt-1 fw-bold text-left hero-title ic-hero__title ic-reveal"
                  style="--ic-delay: 0.2s;">
                  Connecting You to Islamic Knowledge Seamlessly and Accessibly
                </h1>

                <div class="lead pt-3 text-left ic-hero__lead ic-reveal" style="--ic-delay: 0.3s;">
                  <p>
                    Connecting you to Islamic knowledge seamlessly and accessibly, your all-in-one platform
                    to explore the Quran, learn from trusted content, and access AI-powered tools for a transformative
                    spiritual experience anytime, anywhere.
                  </p>
                </div>
                <div class="row mb-3">
                  <div class="col-12">
                    <div class="controls d-flex flex-row justify-content-start text-left ic-hero__actions ic-reveal"
                      style="--ic-delay: 0.4s;">
                      <a href="/surat" class="btn btn-lg btn-teal rounded-20 fw-bold px-4 ic-btn ic-btn--primary">
                        <i class="fas fa-rocket me-2"></i>Get Started
                      </a>

                      <!-- <a href="/subscribe" class="btn btn-lg rounded-20 fw-bold pt-2 px-4 ic-btn ic-btn--ghost">
                        <i class="fas fa-heart me-2"></i>Support Our Mission
                      </a> -->
                    </div>

                    <!-- Trust Indicators -->
                    <div class="mt-3 d-flex align-items-center ic-trust ic-reveal" style="--ic-delay: 0.5s;">
                      <div class="d-flex align-items-center">
                        <i class="fas fa-shield-alt text-success me-2"></i>
                        <small style="color: #4a5568; font-weight: 800;">Secure Platform</small>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-clock text-warning me-2"></i>
                        <small style="color: #4a5568; font-weight: 800;">Instant Access</small>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-user-check text-info me-2"></i>
                        <small style="color: #4a5568; font-weight: 800;">No Registration</small>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="text-center">
                <picture>
                  <source srcset="/images/banner-photo.png 800w" type="image/png">
                  <img src="/images/banner-photo.png" srcset="/images/banner-photo.png 800w"
                    sizes="(min-width: 992px) 50vw, (min-width: 768px) 60vw, 90vw"
                    class="img-fluid hero-image ic-hero__image ic-reveal" style="--ic-delay: 0.35s;"
                    alt="Islamic Connect platform showcasing Quran exploration and AI-powered tools" loading="lazy"
                    width="800" height="800">
                </picture>
              </div>
            </div>

          </div>
          <section v-if="isAuthenticated" class="container-fluid ic-hero__hifdh-zone" aria-label="Hifdh performance">
            <div class="row g-3 align-items-stretch hifdh-hero-layout">
              <div class="col-12 col-lg-4">
                <a
                  href="/surat?open=hifdh-plan"
                  class="hifdh-home-widget text-decoration-none d-flex align-items-center justify-content-between h-100"
                  aria-label="Open Quran page and review today's Hifdh due items">
                  <div class="hifdh-home-widget__copy">
                    <span class="hifdh-home-widget__eyebrow">Hifdh Plan</span>
                    <h3 class="h6 fw-semibold mb-1">Due Today</h3>
                    <p class="small mb-0">Personal review queue for your account. Tap to open Hifdh Plan now.</p>
                  </div>
                  <div class="hifdh-home-widget__count" role="status" aria-live="polite">
                    {{ hifdhDueTodayCount }}
                  </div>
                </a>
              </div>
              <div class="col-12 col-lg-8">
                <div class="hifdh-home-dashboard h-100">
                  <div class="hifdh-home-dashboard__card">
                    <p class="hifdh-home-dashboard__title mb-2">Progress over time</p>
                    <p class="hifdh-home-dashboard__subtitle mb-2">Last 7 days</p>
                    <div class="hifdh-home-bars" role="list" aria-label="7 day hifdh progress">
                      <div v-for="day in hifdhDashboard.timeline" :key="day.dateKey" class="hifdh-home-bar" role="listitem">
                        <span class="hifdh-home-bar__fill" :style="{ height: `${day.heightPct}%` }"></span>
                        <small>{{ day.shortLabel }}</small>
                      </div>
                    </div>
                  </div>
                  <div class="hifdh-home-dashboard__card">
                    <p class="hifdh-home-dashboard__title mb-2">Weak spots</p>
                    <div v-if="hifdhDashboard.weakSpots.length" class="hifdh-home-weak-list">
                      <div v-for="spot in hifdhDashboard.weakSpots" :key="spot.label" class="hifdh-home-weak-item">
                        <span class="hifdh-home-weak-item__label">{{ spot.label }}</span>
                        <span class="hifdh-home-weak-item__count">{{ spot.count }} weak</span>
                      </div>
                    </div>
                    <p v-else class="small text-muted mb-0">No weak segments recorded yet.</p>
                  </div>
                  <div class="hifdh-home-dashboard__card">
                    <p class="hifdh-home-dashboard__title mb-2">Streak tracking</p>
                    <div class="hifdh-home-streak">
                      <span>Current</span>
                      <strong>{{ hifdhDashboard.streak.current }}d</strong>
                    </div>
                    <div class="hifdh-home-streak">
                      <span>Best</span>
                      <strong>{{ hifdhDashboard.streak.best }}d</strong>
                    </div>
                    <div class="hifdh-home-streak">
                      <span>Active</span>
                      <strong>{{ hifdhDashboard.streak.activeDays }}/{{ hifdhDashboard.streak.windowDays }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- <section id="ai-persona-section" class="container ic-hero__ai ic-reveal" style="--ic-delay: 0.6s;" aria-label="Islamic chatbot preview">
            <div class="welcome-chat-frame">
              <ai-component></ai-component>
            </div>
          </section> -->
        </div>
      </div>
    </div>
   



    <!-- HERO / SEO SECTION -->
    <section class="container-fluid premium-seo px-0 ic-seo" aria-labelledby="seo-heading">
      <div class="premium-seo__backdrop"></div>
      <div class="container position-relative">
        <div class="row gy-4 align-items-center">
          <div class="col-lg-6 text-center text-lg-start">
            <h2 id="seo-heading" class="display-5 fw-bold mb-3">Discover Quran, Knowledge & Accessible Tools</h2>
            <p class="text-muted mb-3">Study the Quran with reliable references, clear recitations, and practical
              tools designed for everyday worship and learning.</p>
            <p class="text-muted mb-4">Start with guided pathways, then move at your own pace using search, audio,
              and accessibility features built for consistency.</p>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
              <div class="col" v-for="stat in seoStats" :key="stat.label">
                <div class="p-4 premium-stat h-100 text-center">
                  <p class="h3 fw-bold mb-1">{{ stat.value }}</p>
                  <small class="text-muted">{{ stat.label }}</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row row-cols-1 row-cols-md-2 g-3">
              <div class="col" v-for="card in seoCards" :key="card.title">
                <article class="premium-card h-100 d-flex flex-column">
                  <div>
                    <h3 class="h6 fw-semibold mb-2">{{ card.title }}</h3>
                    <p class="small text-muted mb-3">{{ card.desc }}</p>
                  </div>
                  <a :title="card.title" class="mt-auto fw-semibold text-teal" :href="card.href">Explore →</a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section aria-labelledby="services-heading">
      <div class="py-5 ic-services">
        <div class="container">
          <div class="row justify-content-center text-center mb-5">
            <div class="col-lg-8 col-xl-7">
              <h2 id="services-heading" class="display-4 mb-3 fw-bold">What We Offer</h2>
              <p class="lead text-muted">Comprehensive Islamic resources designed for modern learners</p>
            </div>
          </div>

          <div class="row g-4">
            <!-- Card 1: Explore with Ease -->
            <div class="col-md-6 col-lg-4">
              <article class="card h-100 border-0 card-20 card-float shadow-sm ic-service-card">
                <div class="card-body text-center p-4">
                  <div class="my-3">
                    <img src="images/galaxy.png" width="80" height="80" alt="Magnifying glass exploring Islamic content"
                      loading="lazy" />
                  </div>
                  <h3 class="h3 fw-bold ">Explore with Ease</h3>
                  <p class="mb-4 text-muted" style="font-size: 16px; line-height: 1.6;">
                    Search the Quran, Duas, and Seerah effortlessly using simple keywords or topics.
                    Find meaningful content instantly for your spiritual journey.
                  </p>

                </div>
              </article>
            </div>

            <!-- Card 2: Listen, Watch, Reflect -->
            <div class="col-md-6 col-lg-4">
              <article class="card h-100 border-0 card-20 card-float shadow-sm ic-service-card">
                <div class="card-body text-center p-4">
                  <div class="my-3">
                    <img src="images/watching.png" width="80" height="80" alt="Headphones for audio content"
                      loading="lazy" />
                  </div>
                  <h3 class="h3 fw-bold ">Listen, Watch, Reflect</h3>
                  <p class="mb-4 text-muted" style="font-size: 16px; line-height: 1.6;">
                    Enjoy Quran recitations, insightful podcasts, and Islamic art galleries.
                    Engage spiritually through multimedia content anywhere, anytime.
                  </p>

                </div>
              </article>
            </div>

            <!-- Card 3: Learn Your Way -->
            <div class="col-md-6 col-lg-4">
              <article class="card h-100 border-0 card-20 card-float shadow-sm ic-service-card">
                <div class="card-body text-center p-4">
                  <div class="my-3">
                    <img src="images/school.png" width="80" height="80" alt="Graduation cap for learning"
                      loading="lazy" />
                  </div>
                  <h3 class="h3 fw-bold">Learn Your Way</h3>
                  <p class="mb-4 text-muted" style="font-size: 16px; line-height: 1.6;">
                    Text-to-speech, screen reader and keyboard navigator support, and bookmarking ensure accessible
                    learning
                    for everyone, regardless of ability.
                  </p>

                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="container pt-3 pb-3 ic-features" aria-label="Islamic Connect Features">

      <!-- First Row - Quran Companion -->
      <div class="row py-4 py-lg-5 align-items-center ic-feature-row">
        <div class="col-lg-6 order-2 order-lg-1">
          <h2 class="h1 fw-bold text-center text-lg-start mb-4">
            Quran Companion: AI-Powered & Accessible
          </h2>
          <p class="lead text-muted text-center text-lg-start mb-4" style="line-height: 1.7">
            Experience the Quran with advanced AI tools for reading, listening, and understanding.
            Featuring text-to-speech, screen reader support, and voice search for an accessible,
            intelligent connection to the Divine.
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center">
            <a href="/quran" class="btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20"
              style="min-width: 160px;">
              Explore Quran
            </a>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
          <img src="/images/slide1.png" class="img-fluid rounded-20 shadow-sm"
            alt="Quran Companion interface showing AI-powered features and accessibility tools" loading="lazy"
            width="600" height="400">
        </div>
      </div>

      <!-- Second Row - Audio Content -->
      <div class="row py-4 py-lg-5 align-items-center ic-feature-row">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img src="/images/slide4.png" class="img-fluid rounded-20 shadow-sm"
            alt="Islamic podcasts and audio content streaming interface" loading="lazy" width="600" height="400">
        </div>
        <div class="col-lg-6">
          <h2 class="h1 fw-bold text-center text-lg-start mb-4">
            Spiritual Content On-The-Go
          </h2>
          <p class="lead text-muted text-center text-lg-start mb-4" style="line-height: 1.7">
            Access uplifting Islamic podcasts, inspiring audio series, and live radio in one place.
            Stay spiritually connected through sound and reflection wherever you are.
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center">
            <a href="/media" class="btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20"
              style="min-width: 160px;">
              Browse Content
            </a>
          </div>
        </div>
      </div>

      <!-- Third Row - Quran Explorer -->
      <div class="row py-4 py-lg-5 align-items-center ic-feature-row">
        <div class="col-lg-6 order-2 order-lg-1">
          <h2 class="h1 fw-bold text-center text-lg-start mb-4">
            Deep Quran Exploration
          </h2>
          <p class="lead text-muted text-center text-lg-start mb-4" style="line-height: 1.7">
            Search, explore, and engage with every verse effortlessly. Discover tafsir, translations,
            and recitations with tools designed for simplicity and spiritual growth.
          </p>
          <div class="d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center">
            <a href="/surat" class="btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20"
              style="min-width: 160px;">
              Start Exploring
            </a>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
          <img src="/images/slide2.png" class="img-fluid rounded-20 shadow-sm"
            alt="Quran exploration interface with search and translation features" loading="lazy" width="600"
            height="400">
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
                  <h3>100%</h3>
                  <p>Accessibility score</p>
                  <small>Trusted by Google Lighthouse</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>85+</h3>
                  <p>Countries</p>
                  <small>Global reach</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>650+</h3>
                  <p>Cities/Towns</p>
                  <small>Worldwide presence</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>1090%</h3>
                  <p>Growth</p>
                  <small>Returning users</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- AI Tools & Features Section - Optimized -->
    <section class="py-5 ic-ai" aria-labelledby="ai-tools-title">
      <div class="container pt-3">
        <div class="row justify-content-center text-center mb-3">
          <div class="col-lg-8 col-xl-7">
          </div>
          <h2 id="ai-tools-title" class="h2 mb-3 fw-bold">AI-Powered Tools for Enhanced Islamic Learning</h2>

        </div>

        <div class="row pt-3 g-4 g-md-5">
          <div class="col-12">
            <p class="lead text-center mb-4" style="line-height: 1.7">
              At Islamic Connect, we leverage advanced AI technology to make Quranic knowledge accessible to everyone.
              Our tools are designed to empower individuals through inclusive, personalized learning experiences
              that adapt to diverse abilities and learning preferences.
            </p>
          </div>

          <!-- Feature 4: Text Summarization -->
          <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="flex-shrink-0 me-4">
                <img src="images/content.png" width="60" height="60" alt="Content icon for text summarization feature"
                  loading="lazy">
              </div>
              <div class="flex-grow-1">
                <h3 class="h5 mb-2 fw-bold">AI Text Summarization</h3>
                <p class="mb-0">
                  Quickly understand complex Islamic texts with AI-powered summaries.
                  Extract key insights from lengthy content to enhance your learning efficiency.
                </p>
              </div>
            </div>
          </div>



          <!-- Feature 1: Speech-to-Text -->
          <div class="col-md-6 mb-3">
            <div class="d-flex h-100">
              <div class="flex-shrink-0 me-4">
                <img src="images/podcasting.png" width="60" height="60"
                  alt="Microphone icon representing speech-to-text feature" loading="lazy">
              </div>
              <div class="flex-grow-1">
                <h3 class="h5 mb-2 fw-bold">Speech-to-Text for Islamic Notes</h3>
                <p class="mb-0">
                  Capture your spoken reflections and thoughts on Islamic teachings effortlessly.
                  Perfect for documenting insights and ensuring accessibility for those who prefer audio input.
                </p>
              </div>
            </div>
          </div>

          <!-- Feature 5: Audio Sync -->
          <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="flex-shrink-0 me-4">
                <img src="images/highlighter.png" width="60" height="60"
                  alt="Highlighter icon for audio synchronization feature" loading="lazy">
              </div>
              <div class="flex-grow-1">
                <h3 class="h5 mb-2 fw-bold">Word-by-Word Quran Highlighting</h3>
                <p class="mb-0">
                  Follow Quranic recitations with synchronized text highlighting.
                  Each word lights up as it's recited, improving pronunciation and comprehension.
                </p>
              </div>
            </div>
          </div>

          <!-- Feature 6: Text-to-Speech -->
          <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="flex-shrink-0 me-4">
                <img src="images/chat.png" width="60" height="60" alt="Chat icon for text-to-speech feature"
                  loading="lazy">
              </div>
              <div class="flex-grow-1">
                <h3 class="h5 mb-2 fw-bold">Text-to-Speech for Translations</h3>
                <p class="mb-0">
                  Listen to Quran translations and Tafsir explanations.
                  High-quality audio delivery makes Islamic knowledge accessible while multitasking or for visual
                  impairments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

   
    <!-- Enhanced Quick Join Section -->
    <section class="py-5 quick-join-section ic-join">
      <!-- Background Elements -->
      <div class="ic-join__orb ic-join__orb--one"></div>
      <div class="ic-join__orb ic-join__orb--two"></div>
      <div class="ic-join__orb ic-join__orb--three"></div>

      <div class="container ic-join__inner">
        <div class="row align-items-center">
          <div class="col-lg-7 text-center text-lg-start">
            <h2 class="text-white fw-bold mb-3 ic-join__title">Ready to Transform Your Daily Spiritual Journey?</h2>
            <p class="text-white mb-4 ic-join__lead">Join now and receive your first spiritual reminder within minutes.
              Start your day with divine inspiration!
            </p>

          </div>

          <div class="col-lg-5 text-center">
            <!-- Join Cards -->
            <div class="row g-3">
              <div class="col-12">
                <div class="join-card-hover rounded-20 ic-join-card">
                  <!-- WhatsApp Card -->
                  <div class="d-flex align-items-center mb-3">
                    <div class="ic-join-icon ic-join-icon--whatsapp">
                      <i class="fab fa-whatsapp text-white" style="font-size: 1.5rem;"></i>
                    </div>
                    <div class="text-start">
                      <h3 class="fw-bold mb-1" style="color: #1a5f7a;">WhatsApp Channel</h3>
                      <small class="text-muted">Daily verses & instant reminders</small>
                    </div>
                  </div>
                  <a href="https://whatsapp.com/channel/0029VbAsOvp59PwIp2zwyB1m"
                    class="btn w-100 rounded-20 ic-join-btn ic-join-btn--whatsapp" target="_blank"
                    rel="noopener noreferrer">
                    <i class="fab fa-whatsapp me-2"></i>Join WhatsApp Channel
                    <span class="ic-join-btn__arrow">→</span>
                  </a>

                </div>
              </div>

              <div class="col-12">
                <div class="join-card-hover rounded-20 ic-join-card">
                  <!-- Telegram Card -->
                  <div class="d-flex align-items-center mb-3">
                    <div class="ic-join-icon ic-join-icon--telegram">
                      <i class="fab fa-telegram text-white" style="font-size: 1.5rem;"></i>
                    </div>
                    <div class="text-start">
                      <h3 class="fw-bold mb-1" style="color: #1a5f7a;">Telegram Community</h3>
                      <small class="text-muted">In-depth content & discussions</small>
                    </div>
                  </div>
                  <a href="https://t.me/+r81Q3SEAa-M5ZWI0"
                    class="btn w-100 rounded-20 ic-join-btn ic-join-btn--telegram" target="_blank"
                    rel="noopener noreferrer">
                    <i class="fab fa-telegram me-2"></i>Join Telegram Community
                    <span class="ic-join-btn__arrow">→</span>
                  </a>
                  
                </div>
              </div>
            </div>

            <!-- Trust Badge -->
            <div class="mt-3 ic-join__badge">
              <div class="d-flex align-items-center" style="gap: 0.5rem;">
                <i class="fas fa-shield-alt text-white" style="font-size: 1.1rem;"></i>
                <small class="text-white fw-bold">100% Free • Easy Subscribe</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Icons -->
      <div class="ic-join__icon">
        <i class="fas fa-quran"></i>
      </div>
    </section>




    <!-- contact -->
    <section class="py-5 contact-section position-relative" aria-labelledby="contact-heading">
      <div class="contact-section__blur contact-section__blur--left"></div>
      <div class="contact-section__blur contact-section__blur--right"></div>
      <div class="container px-lg-4">
        <div class="row justify-content-center text-center">
          <div class="col-xl-8 col-lg-9">
            <h2 id="contact-heading" class="display-5 fw-bold mb-3">Let’s Keep the Conversation Going</h2>
            <p class="lead fw-semibold text-muted mb-4">
              Share your thoughts, ask about our resources, or flag a bug. Picking the right topic helps us route your
              request to
              the right team immediately.
            </p>
          </div>
        </div>

        <div class="row justify-content-center mt-4">
          <div class="col-xl-10">
            <div class="contact-card shadow-lg rounded-4">
              <div class="d-flex flex-column flex-md-row align-items-start justify-content-between gap-3 mb-3">
                <div>
                  <h3 class="fw-bold mb-1">Premium support, made personal</h3>
                  <p class="text-muted mb-0">We review every message ourselves and respond thoughtfully.</p>
                </div>
              </div>
              <form @reset="reset" @submit.prevent="sendMessage()" role="form" aria-label="Contact form">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="firstname" class="form-label visually-hidden">First Name</label>
                    <input id="firstname" class="form-control form-control-lg" v-model="form.firstname" name="firstname"
                      placeholder="First name" type="text" aria-required="true" required />
                  </div>

                  <div class="col-md-6">
                    <label for="lastname" class="form-label visually-hidden">Last Name</label>
                    <input id="lastname" class="form-control form-control-lg" v-model="form.lastname" name="lastname"
                      placeholder="Last name" type="text" aria-required="true" required />
                  </div>

                  <div class="col-md-6">
                    <label for="email" class="form-label visually-hidden">Email Address</label>
                    <input id="email" class="form-control form-control-lg" v-model="form.email" name="email"
                      placeholder="Email address" type="email" aria-required="true" required />
                  </div>

                  <div class="col-md-6">
                    <label for="subject" class="form-label visually-hidden">Subject</label>
                    <select id="subject" class="form-select form-select-lg" v-model="form.subject" name="subject"
                      aria-required="true" required>
                      <option value="" disabled>Select a subject</option>
                      <option v-for="option in subjectOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                    <small class="text-muted d-block mt-1">Choose whichever topic matches your message.</small>
                  </div>

                  <div class="col-12">
                    <label for="message" class="form-label visually-hidden">Your Message</label>
                    <textarea id="message" class="form-control form-control-lg" v-model="form.message" name="message"
                      placeholder="Your message" rows="5" aria-required="true" required></textarea>
                  </div>

                  <div class="col-12">
                    <div class="d-grid">
                      <button type="submit" class="btn btn-teal btn-lg fw-semibold contact-card__btn"
                        :disabled="isSubmitting">
                        <span class="d-flex align-items-center justify-content-center gap-2">
                          <i class="fas fa-paper-plane" aria-hidden="true"></i>
                          {{ isSubmitting ? "Sending..." : "Send Message" }}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>


    <transition name="premium-dialog">
      <div v-if="confirmDialog.visible" class="premium-dialog-overlay">
        <div class="premium-dialog-card">
          <h3 class="premium-dialog-title">{{ confirmDialog.title }}</h3>
          <p class="premium-dialog-message">{{ confirmDialog.message }}</p>
          <div class="d-flex align-items-center justify-content-end gap-2 mt-3">
            <button class="btn btn-outline-secondary" @click="handleCancel" :disabled="isSubmitting">Cancel</button>
            <button class="btn btn-teal contact-card__btn" @click="handleConfirm" :disabled="isSubmitting">
              {{ confirmDialog.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="premium-toast">
      <div v-if="toast.visible" class="premium-toast" :class="`premium-toast--${toast.type}`" role="status" aria-live="polite">
        <div>
          <p class="mb-0 fw-bold">{{ toast.title }}</p>
          <small class="text-muted">{{ toast.message }}</small>
        </div>
        <button class="btn-close btn-close-white" @click="dismissToast"></button>
      </div>
    </transition>
    <!-- Remove the container if you want to extend the Footer to full width. -->
    <footer class="ic-footer text-white" role="contentinfo">
      <div
        class="container-fluid footer-inner d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
        <div class="copyright text-center text-md-start">
          <span class="me-2">©</span>
          <strong>{{ currentYear }} Copyright: </strong>
          <a href="https://islamiconnect.com/" class="text-white text-decoration-none fw-bold">islamiconnect.com</a>
        </div>
        <div class="social text-center text-md-end">
          <a href="https://www.facebook.com/profile.php?id=61560313385599" aria-label="Visit our Facebook page"><i
              class="fab fa-facebook-f" aria-hidden="true"></i></a>
          <a href="https://x.com/islamiconnect24" aria-label="Visit our X (Twitter) profile"><i class="fab fa-twitter"
              aria-hidden="true"></i></a>
          <a href="https://www.linkedin.com/company/islamic-connect/" aria-label="Visit our LinkedIn page"><i
              class="fab fa-linkedin" aria-hidden="true"></i></a>
          <a href="https://www.instagram.com/islamicconnect24/" aria-label="Visit our Instagram profile"><i
              class="fab fa-instagram" aria-hidden="true"></i></a>
        </div>
      </div>
    </footer>
    <!-- End of .container -->
  </div>
</template>
<style scoped>
.ic-home {
  --ic-ink: #1d2b2f;
  --ic-ink-soft: #566663;
  --ic-teal: #0f6e63;
  --ic-teal-dark: #0a4b45;
  --ic-teal-deep: #08362f;
  --ic-gold: #d2a24b;
  --ic-sand: #fff7ea;
  --ic-mist: #f1f7f4;
  --ic-card: #ffffff;
  --ic-border: rgba(15, 110, 99, 0.14);
  --ic-shadow: 0 26px 60px rgba(15, 53, 48, 0.14);
  --ic-shadow-soft: 0 14px 32px rgba(15, 53, 48, 0.1);
  color: var(--ic-ink);
  background: radial-gradient(circle at top left, #fffdf7 0%, #f7f3ea 45%, #eef6f4 100%);
}

.ic-reveal {
  animation: rise 0.9s ease both;
  animation-delay: var(--ic-delay, 0s);
}

.ic-hero {
  position: relative;
  /* border-radius: 28px; */
  background: linear-gradient(140deg, #fff7ea 0%, #f3faf6 45%, #eaf4f1 100%);
  border: 1px solid var(--ic-border);
  box-shadow: var(--ic-shadow);
  overflow: hidden;
}

.ic-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 15% 15%, rgba(210, 162, 75, 0.2), transparent 50%),
    radial-gradient(circle at 80% 0%, rgba(15, 110, 99, 0.16), transparent 45%);
  opacity: 0.9;
  z-index: 0;
}

.ic-hero__frame {
  position: relative;
  overflow: hidden;
}

.ic-hero__grid {
  position: relative;
  z-index: 2;
}

.ic-hero__orb {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  filter: blur(0);
}

.ic-hero__orb--primary {
  top: 0px;
  right: -12%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(13, 122, 111, 0.25), rgba(13, 122, 111, 0.02));
  animation: float-hero 10s ease-in-out infinite;
}

.ic-hero__orb--secondary {
  bottom: -35%;
  left: -8%;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(226, 179, 86, 0.22), rgba(226, 179, 86, 0.02));
  animation: float-hero 8s ease-in-out infinite 1s;
}

.ic-hero__badge {
  background: linear-gradient(135deg, var(--ic-teal), var(--ic-teal-dark));
  color: #fff;
  padding: 0.55rem 1.6rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 22px rgba(13, 122, 111, 0.25);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.ic-hero__title {
  background: linear-gradient(120deg, var(--ic-teal), var(--ic-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.15;
  margin-bottom: 1.5rem;
  text-shadow: 0 12px 25px rgba(9, 44, 39, 0.12);
  font-size: clamp(2.4rem, 4.3vw, 3.7rem);
}

.ic-hero__lead {
  line-height: 1.8em;
  font-size: 1.15rem;
  color: var(--ic-ink-soft);
  font-weight: 500;
  margin-bottom: 1.25rem;
  padding-right: 1rem;
  max-width: 34rem;
}

.ic-hero__actions {
  gap: 0.8rem;
  flex-wrap: wrap;
}

.ic-btn {
  border-radius: 999px;
  font-weight: 700;
  padding: 0.95rem 1.8rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.ic-btn--primary {
  background: linear-gradient(135deg, var(--ic-teal), var(--ic-teal-dark)) !important;
  color: #fff !important;
  border: none !important;
  box-shadow: 0 14px 30px rgba(13, 122, 111, 0.35);
}

.ic-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px rgba(13, 122, 111, 0.45);
}

.ic-btn--ghost {
  background: rgba(255, 255, 255, 0.9) !important;
  color: var(--ic-teal-dark) !important;
  border: 2px solid rgba(13, 122, 111, 0.25) !important;
  box-shadow: 0 12px 24px rgba(13, 122, 111, 0.12);
}

.ic-btn--ghost:hover {
  transform: translateY(-2px);
  background: #fff !important;
  box-shadow: 0 16px 30px rgba(13, 122, 111, 0.18);
}

.ic-trust {
  gap: 1rem;
  flex-wrap: wrap;
}


.ic-hero__ai {
  margin-top: 1.5rem;
}

.ic-hero__ai .welcome-chat-frame {
  /* padding: 0.5rem; */
  border-radius: 12px;
  /* box-shadow: 0 18px 36px rgba(15, 53, 48, 0.12); */
}

.ic-hero__hifdh-zone {
  margin-top: 1.55rem;
  padding: 0.45rem 0 0.45rem;
}

.ic-hero__hifdh-zone .hifdh-hero-layout {
  padding: 0 0.35rem;
}

.ic-seo {
  position: relative;
  padding: 4rem 0;
  background: linear-gradient(180deg, #fffaf1 0%, #ffffff 100%);
}

.ic-seo .premium-seo__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 10% 20%, rgba(15, 110, 99, 0.16), transparent 55%),
    radial-gradient(circle at 90% 10%, rgba(210, 162, 75, 0.18), transparent 45%);
  z-index: 0;
  pointer-events: none;
}

.ic-seo .container {
  position: relative;
  z-index: 1;
}

.ic-seo .highlight-badge {
  background: rgba(13, 122, 111, 0.12);
  color: var(--ic-teal-dark);
  border: 1px solid rgba(13, 122, 111, 0.2);
  padding: 0.45rem 1rem;
  border-radius: 999px;
  font-weight: 600;
}

.ic-seo .premium-stat {
  border-radius: 18px;
  border: 1px solid var(--ic-border);
  background: var(--ic-card);
  box-shadow: var(--ic-shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ic-seo .premium-stat:hover {
  transform: translateY(-4px);
  box-shadow: var(--ic-shadow);
}

.ic-seo .premium-card {
  border-radius: 20px;
  border: 1px solid var(--ic-border);
  background: var(--ic-card);
  box-shadow: var(--ic-shadow-soft);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ic-seo .premium-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--ic-shadow);
}

.ic-hero .hifdh-home-widget {
  border-radius: 22px;
  border: 1px solid rgba(13, 122, 111, 0.38);
  background:
    radial-gradient(circle at 88% 12%, rgba(16, 185, 129, 0.34), transparent 42%),
    linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 42%, #fff7ed 100%);
  box-shadow: 0 18px 30px rgba(15, 53, 48, 0.2);
  padding: 1.2rem 1.3rem;
  min-height: 168px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.ic-hero .hifdh-home-widget:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 34px rgba(15, 53, 48, 0.2);
  border-color: rgba(13, 122, 111, 0.52);
}

.ic-hero .hifdh-home-widget__copy h3 {
  color: #0f172a;
  font-size: 1.36rem;
}

.ic-hero .hifdh-home-widget__copy p {
  color: #334155;
  max-width: 40ch;
  font-size: 0.94rem;
  line-height: 1.45;
}

.ic-hero .hifdh-home-widget__eyebrow {
  display: inline-flex;
  align-items: center;
  font-size: 0.73rem;
  font-weight: 700;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ic-hero .hifdh-home-widget__count {
  min-width: 84px;
  height: 84px;
  border-radius: 20px;
  background: #0f766e;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2.15rem;
  font-weight: 800;
  line-height: 1;
  padding: 0.35rem;
  box-shadow: 0 12px 22px rgba(15, 118, 110, 0.34);
}

.ic-hero .hifdh-home-dashboard {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.72rem;
}

.ic-hero .hifdh-home-dashboard__card {
  border: 1px solid rgba(13, 122, 111, 0.26);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.82rem;
  box-shadow: 0 10px 18px rgba(15, 53, 48, 0.1);
}

.ic-hero .hifdh-home-dashboard__title {
  font-size: 0.88rem;
  font-weight: 800;
  color: #0b4f44;
  letter-spacing: 0.01em;
}

.ic-hero .hifdh-home-dashboard__subtitle {
  font-size: 0.74rem;
  color: #64748b;
  font-weight: 600;
}

.ic-hero .hifdh-home-bars {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  align-items: end;
  gap: 0.28rem;
  min-height: 108px;
}

.ic-hero .hifdh-home-bar {
  display: grid;
  justify-items: center;
  gap: 0.12rem;
}

.ic-hero .hifdh-home-bar__fill {
  width: 100%;
  min-height: 8px;
  border-radius: 10px 10px 4px 4px;
  background: linear-gradient(180deg, #10b981 0%, #0f766e 100%);
  border: 1px solid rgba(6, 95, 70, 0.28);
}

.ic-hero .hifdh-home-bar small {
  font-size: 0.66rem;
  color: #334155;
  font-weight: 700;
}

.ic-hero .hifdh-home-weak-list {
  display: grid;
  gap: 0.28rem;
}

.ic-hero .hifdh-home-weak-item {
  border: 1px solid rgba(180, 83, 9, 0.2);
  border-radius: 8px;
  background: rgba(255, 247, 237, 0.76);
  padding: 0.32rem 0.42rem;
  display: grid;
  gap: 0.08rem;
}

.ic-hero .hifdh-home-weak-item__label {
  font-size: 0.7rem;
  color: #7c2d12;
  font-weight: 700;
  line-height: 1.3;
}

.ic-hero .hifdh-home-weak-item__count {
  font-size: 0.64rem;
  color: #9a3412;
  font-weight: 700;
}

.ic-hero .hifdh-home-streak {
  border: 1px solid rgba(6, 95, 70, 0.14);
  border-radius: 8px;
  background: rgba(236, 253, 245, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.36rem;
  padding: 0.26rem 0.4rem;
  margin-bottom: 0.26rem;
}

.ic-hero .hifdh-home-streak span {
  font-size: 0.7rem;
  color: #065f46;
  font-weight: 700;
}

.ic-hero .hifdh-home-streak strong {
  font-size: 0.82rem;
  color: #064e3b;
}

@media (max-width: 991.98px) {
  .ic-hero__hifdh-zone .hifdh-hero-layout {
    padding: 0;
  }

  .ic-hero .hifdh-home-widget {
    min-height: 126px;
    padding: 0.92rem 1rem;
  }

  .ic-hero .hifdh-home-widget__copy h3 {
    font-size: 1.1rem;
  }

  .ic-hero .hifdh-home-widget__count {
    min-width: 70px;
    height: 70px;
    font-size: 1.75rem;
  }

  .ic-hero .hifdh-home-dashboard {
    grid-template-columns: minmax(0, 1fr);
  }

  .ic-hero .hifdh-home-bars {
    min-height: 96px;
    gap: 0.22rem;
  }
}

.ic-services {
  background: linear-gradient(180deg, #fffaf1 0%, #eef6f3 100%);
}

.ic-service-card {
  border-radius: 22px;
  border: 1px solid var(--ic-border);
  background: var(--ic-card);
  box-shadow: var(--ic-shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ic-service-card:hover {
  transform: translateY(-6px) !important;
  box-shadow: var(--ic-shadow) !important;
}

.ic-features {
  position: relative;
}

.ic-feature-row {
  margin: 0 0 2.5rem;
  margin-left: 0;
  margin-right: 0;
  padding: 1.5rem;
  border-radius: 26px;
  border: 1px solid var(--ic-border);
  background: var(--ic-card);
  box-shadow: var(--ic-shadow-soft);
}

.ic-feature-row:last-child {
  margin-bottom: 0;
}

.stats-section {
  position: relative;
  background: linear-gradient(135deg, #0f5f55 0%, #0a3f3a 100%);
  color: #f5f7f6;
  padding: 4.5rem 0;
  overflow: hidden;
}

.stats-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(210, 162, 75, 0.2), transparent 55%),
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.12), transparent 45%);
  opacity: 0.6;
}

.stats-section .section-title,
.stats-section .section-lead {
  position: relative;
  z-index: 1;
}

.stats-section .section-title {
  color: #fff;
}

.stats-section .section-lead {
  color: rgba(255, 255, 255, 0.75);
}

.stat-card {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  padding: 1.75rem 1.25rem;
  min-height: 195px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  backdrop-filter: blur(6px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.2);
}

.stat-card h3,
.stat-card p,
.stat-card small {
  color: #fff;
  white-space: normal;
  overflow-wrap: anywhere;
}

.stat-card small {
  opacity: 0.75;
}

.ic-ai {
  background: linear-gradient(180deg, #fffaf1 0%, #ffffff 100%);
}

.ic-ai .col-md-6 .d-flex {
  border-radius: 18px;
  border: 1px solid var(--ic-border);
  padding: 1.25rem;
  background: var(--ic-card);
  box-shadow: var(--ic-shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ic-ai .col-md-6 .d-flex:hover {
  transform: translateY(-4px);
  box-shadow: var(--ic-shadow);
}

.ic-support {
  background: linear-gradient(180deg, #fffaf1 0%, #ffffff 100%);
}

.ic-support__title {
  font-size: clamp(2rem, 3vw, 2.4rem);
  color: var(--ic-teal-dark);
}

.ic-support .quote-card {
  background: linear-gradient(150deg, #ffffff, #f1f7f4);
  border: 1px solid var(--ic-border);
}

.ic-support .quote-glow {
  background: radial-gradient(circle, rgba(210, 162, 75, 0.22), transparent 70%);
}

.ic-join {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f5f55 0%, #083a35 100%);
}

.ic-join__inner {
  position: relative;
  z-index: 2;
}

.ic-join__orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  animation: float 8s ease-in-out infinite;
}

.ic-join__orb--one {
  top: -45%;
  right: -8%;
  width: 320px;
  height: 320px;
}

.ic-join__orb--two {
  bottom: -35%;
  left: -6%;
  width: 240px;
  height: 240px;
  animation-delay: 1.5s;
}

.ic-join__orb--three {
  top: 20%;
  left: 12%;
  width: 120px;
  height: 120px;
  animation-delay: 2.5s;
}

.ic-join__title {
  font-size: clamp(2rem, 4vw, 2.7rem);
  text-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}

.ic-join__lead {
  font-size: 1.1rem;
  opacity: 0.92;
  text-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.ic-join-card {
  background: rgba(255, 255, 255, 0.94);
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.ic-join-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
}

.ic-join-icon--whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
}

.ic-join-icon--telegram {
  background: linear-gradient(135deg, #0088cc, #006699);
}

.ic-join-btn {
  position: relative;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: none;
  font-size: 1.05rem;
  color: #fff !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.ic-join-btn--whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  box-shadow: 0 12px 24px rgba(37, 211, 102, 0.35);
}

.ic-join-btn--telegram {
  background: linear-gradient(135deg, #0088cc, #006699);
  box-shadow: 0 12px 24px rgba(0, 136, 204, 0.35);
}

.ic-join-btn:hover {
  transform: translateY(-2px);
}

.ic-join-btn--whatsapp:hover {
  box-shadow: 0 18px 32px rgba(37, 211, 102, 0.5);
}

.ic-join-btn--telegram:hover {
  box-shadow: 0 18px 32px rgba(0, 136, 204, 0.5);
}

.ic-join-btn__arrow {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 0.9rem;
  opacity: 0.85;
}

.ic-join__badge {
  background: rgba(255, 255, 255, 0.18);
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  backdrop-filter: blur(10px);
  display: inline-flex;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.ic-join__icon {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0.12;
  font-size: 3rem;
  animation: float 4s ease-in-out infinite;
}

.ic-home .contact-section {
  background: linear-gradient(180deg, #fffaf1 0%, #ffffff 100%);
}

.ic-home .contact-card {
  background: #fff;
  border: 1px solid var(--ic-border);
  box-shadow: var(--ic-shadow);
}

.ic-home .contact-card__badge {
  background: rgba(13, 122, 111, 0.12);
  color: var(--ic-teal-dark);
  border: 1px solid rgba(13, 122, 111, 0.2);
}

.ic-home .contact-card__btn {
  background: linear-gradient(135deg, var(--ic-teal), var(--ic-teal-dark));
  border: none;
  box-shadow: 0 14px 28px rgba(13, 122, 111, 0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ic-home .contact-card__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(13, 122, 111, 0.35);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-hero {

  0%,
  100% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(-18px) translateX(6px);
  }
}

@media (prefers-reduced-motion: reduce) {

  .ic-reveal,
  .ic-hero__orb,
  .ic-join__orb,
  .ic-join__icon {
    animation: none !important;
  }
}

@media (max-width: 768px) {
  .ic-hero__lead {
    padding-right: 0;
  }

  .ic-feature-row {
    padding: 1.25rem;
  }

  .ic-join-card {
    padding: 1.25rem;
  }
}

.quote-wrapper {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
}

.quote-card {
  background: linear-gradient(145deg, #ffffff, #f5fbf7);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 32px 24px;
  color: #1a1a1a;
  text-align: center;
  position: relative;
  overflow: hidden;
  max-width: 100%;
  transition: all 0.3s ease;
}

.quote-glow {
  position: absolute;
  top: -70px;
  right: -70px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(15, 110, 99, 0.18), transparent 70%);
  z-index: 0;
}

.quote-content {
  position: relative;
  z-index: 1;
}

.faith-quote {
  font-size: clamp(1.1rem, 4vw, 1.4rem);
  line-height: 1.75;
  margin-bottom: 0.8rem;
  color: #0a3a34;
  font-weight: 600;
  padding: 0 8px;
}

.faith-dua {
  font-size: clamp(1rem, 3.5vw, 1.25rem);
  line-height: 1.7;
  margin: 0;
  color: #0a3a34;
  font-weight: 600;
  padding: 0 8px;
  opacity: 0;
  animation: fadeInGlow 3s ease-in-out forwards;
}

.quote-mark {
  font-size: 2.2rem;
  color: #0f6e63;
  vertical-align: middle;
  font-weight: 700;
}

.faith-dua .quote-mark {
  font-size: 1.8rem;
}

.quote-ref {
  text-align: right;
  font-style: italic;
  color: #5d6d6c;
  font-size: 0.92rem;
  font-family: 'Nunito Sans', 'Segoe UI', sans-serif;
  margin-bottom: 1.2rem;
}

.dua-ref {
  display: block;
  margin-top: 6px;
  font-size: 0.9rem;
  color: #5d6d6c;
  font-family: 'Nunito Sans', 'Segoe UI', sans-serif;
}

.quote-divider {
  width: 70px;
  height: 3px;
  background: linear-gradient(90deg, #0f6e63, #d2a24b);
  margin: 0.8rem auto 1.4rem auto;
  border-radius: 2px;
}


@media (max-width: 576px) {

  .faith-quote,
  .faith-dua {
    padding: 0 4px;
  }

  .quote-card {
    padding: 24px 16px;
  }
}

/* Ensure hero title has solid color on small screens for contrast */
@media (max-width: 576px) {
  .hero-title {
    -webkit-text-fill-color: initial !important;
    background: none !important;
    color: var(--ic-teal-dark) !important;
  }
}

.card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15) !important;
}

.ic-service-card:hover {
  transform: translateY(-6px) !important;
  box-shadow: var(--ic-shadow) !important;
}

/* Button focus states for accessibility */
.btn:focus {
  outline: 3px solid var(--ic-teal-dark);
  outline-offset: 2px;
}

/* Card focus states */
.card:focus-within {
  outline: 2px solid var(--ic-teal);
  outline-offset: 2px;
}

.service-1 .card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.service-1 .card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
}

.service-1 .btn {
  transition: all 0.3s ease;
}

.service-1 .btn:hover {
  background: #1a5f7a !important;
  transform: translateY(-2px);
}

/* Focus styles for accessibility */
.service-1 .btn:focus {
  outline: 3px solid #1a5f7a;
  outline-offset: 2px;
}

.service-1 .card:focus-within {
  outline: 2px solid rgb(0, 121, 107);
  outline-offset: 2px;
}

.contact-section {
  /* Performance: Reduce paint operations */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Improved focus styles for accessibility */
.form-control:focus {
  border-color: rgb(0, 121, 107);
  box-shadow: 0 0 0 0.2rem rgba(0, 191, 166, 0.25);
  outline: none;
}

/* Better button states */
.btn-primary:hover {
  background: #0a6d60 !important;
  transform: translateY(-1px);
  transition: all 0.3s ease;
}

.btn-primary:active {
  transform: translateY(0);
}

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

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none !important;
  }

  .btn {
    transition: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid #000 !important;
  }

  .btn {
    border: 2px solid #000 !important;
  }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .contact-section {
    padding: 2rem 0 !important;
  }

  .form-control-lg {
    font-size: 1rem !important;
    padding: 0.75rem 1rem !important;
  }

  .btn-lg {
    padding: 0.875rem 1.5rem !important;
    font-size: 1rem !important;
  }

  .card-body {
    padding: 1.5rem !important;
  }

  .display-4 {
    font-size: 2.5rem !important;
  }

  .btn {
    padding: 1rem !important;
    font-size: 1rem;
  }

  .service-1 .card-body {
    padding: 1.5rem !important;
  }

  .service-1 h1 {
    font-size: 2.5rem !important;
  }

  .service-1 .btn {
    padding: 1rem !important;
    font-size: 1rem;
  }

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
    font-size: 1.3rem;
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
  background-color: rgb(0, 121, 107);
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

.jumbotron {
  
  padding-bottom: clamp(1.5rem, 2.5vw, 2.5rem);
}

@media (max-width: 768px) {
  
}


@media (min-width: 992px) {
  .hero-wrapper {
    padding: clamp(2.5rem, 3vw, 3.25rem) 0 2.5rem;
  }
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

/* Shared footer styles for consistent spacing across pages */
.ic-footer {
  background: linear-gradient(135deg, #0e6f64, #0a4f4b);
}

.ic-footer .footer-inner {
  padding: 1rem 1rem;
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
}

@media (min-width: 768px) {
  .ic-footer .footer-inner {
    padding: 1rem 2rem;
  }
}

.ic-footer .copyright {
  font-weight: 700;
}

.ic-footer .social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: .5rem;
  border: 1px solid rgba(255, 255, 255, .5);
  border-radius: 8px;
  color: #fff;
  transition: background .2s ease, border-color .2s ease, transform .2s ease;
}

.ic-footer .social a:hover {
  background: rgba(255, 255, 255, .1);
  border-color: #fff;
  transform: translateY(-1px);
}

@media (max-width: 575.98px) {
  .ic-footer .social a {
    width: 36px;
    height: 36px;
    margin: .25rem;
  }

  .ic-footer .copyright {
    text-align: center;
  }

  .ic-footer .footer-inner {
    gap: .75rem;
  }
}

.hero-carousel-placeholder {
  border-radius: 32px;
  min-height: 360px;
  background: linear-gradient(160deg, #0b806f, #0b5d4b);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-carousel-placeholder__content {
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.hero-carousel-placeholder__ring {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px dashed rgba(255, 255, 255, 0.6);
  animation: placeholder-spin 4s linear infinite;
}

.hero-carousel-placeholder__text {
  font-weight: 500;
  font-size: 1rem;
  max-width: 220px;
}

@keyframes placeholder-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.welcome-chat-shell {
  /* background: linear-gradient(180deg, #f5f8fd, #eef1f7 40%, #fefefe 100%); */
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
}

.welcome-chat-frame {
  position: relative;
  margin: 0 auto;
  padding: 0.5rem;
  border-radius: 12px;
  /* background: #ffffff; */

}

@media (max-width: 767px) {
  .welcome-chat-frame {
    padding: 0.3rem;
  }

  .welcome-chat-shell {
    padding: 2.5rem 0;
  }
}
</style>

<script defer src="../scripts/HomepageComponent.script.js"></script>
<style scoped src="../styles/HomepageComponent.style.css"></style>
