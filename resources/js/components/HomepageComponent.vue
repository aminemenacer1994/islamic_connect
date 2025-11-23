<template>
  <div>
    <!-- header -->
    <div class="jumbotron hero-jumbotron">

      <!-- Content -->
      <div class="container-fluid hero-layout">
        <!-- Enhanced Hero Section -->
        <div class="container-fluid text-center hero-stage">
          <!-- Background Elements -->
          <div class="hero-floating hero-floating--primary"></div>
          <div class="hero-floating hero-floating--secondary"></div>

          <div class="row align-items-center hero-row">
            <div class="col-md-6">
              <div class="text-left">
                <!-- Badge -->
                <div class="hero-badge">
                  <i class="fas fa-star me-2"></i>Trusted by 1000's of Muslims Worldwide
                </div>

                <h1 class="display-4 mt-1 fw-bold text-left hero-title">
                  Connecting You to Islamic Knowledge Seamlessly and Accessibly
                </h1>

                <h2 class="lead pt-3 text-left hero-subtitle">
                  <p>
                    Connecting you to Islamic knowledge seamlessly and accessibly, your all-in-one platform
                    to explore the Quran, learn from trusted content, and access AI-powered tools for a transformative
                    spiritual experience anytime, anywhere.
                  </p>
                </h2>

                <div class="row mb-3">
                  <div class="col-12">
                    <div class="controls d-flex flex-row justify-content-start text-left hero-controls">
                      <a href="/surat" class="btn btn-lg btn-teal rounded-20 fw-bold px-4" title="Get started with the Quran Portal">
                        <i class="fas fa-rocket me-2"></i>Get Started Free
                      </a>

                      <a href="/subscribe" class="btn rounded-20 fw-bold px-4 hero-cta-outline" title="Support the Islamic Connect mission">
                        <i class="fas fa-heart me-2"></i>Support Our Mission
                      </a>
                    </div>

                    <!-- Trust Indicators -->
                    <div class="mt-3 d-flex align-items-center hero-trust-indicators">
                      <div class="d-flex align-items-center">
                        <i class="fas fa-shield-alt text-success me-2"></i>
                        <small class="trust-label">Secure Platform</small>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-clock text-warning me-2"></i>
                        <small class="trust-label">Instant Access</small>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-user-check text-info me-2"></i>
                        <small class="trust-label">No Registration</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="text-center">
                <picture>
                  <source
                    type="image/avif"
                    srcset="/images/banner-photo-400.avif 400w, /images/banner-photo-800.avif 800w, /images/banner-photo-1200.avif 1200w"
                    sizes="(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw"
                  />
                  <source
                    type="image/webp"
                    srcset="/images/banner-photo-400.webp 400w, /images/banner-photo-800.webp 800w, /images/banner-photo-1200.webp 1200w"
                    sizes="(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw"
                  />
                  <img
                    src="/images/banner-photo-1200.avif"
                    alt="Islamic Connect platform showcasing Quran exploration and AI-powered tools"
                    class="img-fluid hero-image"
                    width="800"
                    height="800"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <section aria-labelledby="prayer-times-heading">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">
            -- SEO Optimized Heading --
            <h2 id="prayer-times-heading" class="text-center mb-4 prayer-title">
              Today's Prayer Times
            </h2>

            -- Performance & Accessibility Enhanced Component --
            <PrayerTimes class="mb-3 prayer-times-enhanced" :lazy-load="true" :reduce-motion="true" aria-live="polite"
              aria-atomic="true" />

          </div>
        </div>
      </div>
    </section> -->

    <!-- HERO / SEO SECTION -->
    <section class="container-fluid premium-seo px-0" aria-labelledby="seo-heading">
      <div class="premium-seo__backdrop"></div>
      <div class="container position-relative">
        <div class="row gy-4 align-items-center">
          <div class="col-lg-6 text-center text-lg-start">
            <h2 id="text-left" class="display-5 fw-bold mb-3 text-start">Discover Quran, Knowledge & Accessible Tools</h2>
            <p class="text-muted text-left mb-3">Dive into a fully accessible platform offering the Quran with translation, tafsir, and audio, alongside curated Islamic content, podcasts, and guides for spiritual growth.</p>
            <p class="text-muted text-left mb-4">Explore interactive pathways, modern tools, and resources designed for every user, including features for the visually impaired and those seeking deeper understanding of Islam.</p>
            <div class="d-flex flex-wrap gap-3 mb-4 justify-content-center justify-content-lg-start">
              <span class="badge badge-pill highlight-badge">Quran Insights</span>
              <span class="badge badge-pill highlight-badge">Authentic Duas</span>
              <span class="badge badge-pill highlight-badge">Podcasts & Audio</span>
              <span class="badge badge-pill highlight-badge">Mission Timeline</span>
            </div>
            <div class="row row-cols-3 g-3">
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
        <div class="row mt-5 gx-lg-5 gy-4">
          <div class="col-md-6">
            <h2 class="h5 fw-semibold">External references we trust</h2>
            <p class="text-muted mb-2">High-quality partners and verified resources add credibility to the journeys
              promoted in this hero section.</p>
            <ul class="list-unstyled mb-0">
              <li v-for="link in externalLinks" :key="link.href" class="mb-2">
                <a :title="link.title" class="text-dark fw-semibold" :href="link.href" target="_blank"
                  rel="noopener noreferrer">{{ link.text }}</a>
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <h2 class="h5 fw-semibold">Why we keep knowledge modern</h2>
            <p class="text-muted bm-0">Blending server-rendered structure with Vue-powered interactivity ensures the
              same narrative loads instantly.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="my-5" aria-label="Islamic Connect mission insights">
      <div class="row container-fluid">
        <div class="col-lg-10 mx-auto text-center">
          <h2 class="display-6 fw-bold mb-3">Islamic Connect is where Quran clarity meets community care</h2>
          <p class="text-muted mb-4">
            Every paragraph on this page is intentionally aligned with the keywords our visitors search for: Quran companion, dua libraries, accessible community tools, and mindful learning. We map each sentence to a promise of practical resources—no fluff, only the trust and context scholars expect.
          </p>
          <ul class="list-unstyled row row-cols-1 row-cols-md-2 g-3 text-start">
            <li class="col-md-3">
              <strong>Structured Quran journeys:</strong> Guided tracks and tafsir notes clarify verses for families, students, and scholars.
            </li>
            <li class="col-md-3">
              <strong>Accessible community tools:</strong> Audio-first players, screen reader support, and bookmarking keep faith without friction.
            </li>
            <li class="col-md-3">
              <strong>Verified dua and guidance:</strong> Collections curated by scholars and volunteers carry transparent sourcing for trust.
            </li>
            <li class="col-md-3">
              <strong>Mission stories & utility toolkit:</strong> Impact updates, calculators, and plans show how Islamic Connect serves learners worldwide.
            </li>
          </ul>
          <p class="text-muted mt-4">
            Search engines reward clarity—so we use clean semantic markup, self-describing component names, and internal links to guide crawlers to every feature. Let this section be both a welcome to readers and a roadmap for bots indexing the value you bring.
          </p>
          <p class="text-muted mt-3">
            Islamic Connect is a modern hub where we explore the Quran, knowledge, and accessible tools for Muslims who expect clarity, connection, and service—every keyword in this sentence lives on this page to keep the title honest.
          </p>
        </div>
      </div>
    </section>
    <section aria-labelledby="services-heading">
      <div class="py-5 services-section">
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
              <article class="card h-100 border-0 card-20 card-float shadow-sm">
                <div class="card-body text-center p-4">
                  <div class="my-3">
                    <img src="images/galaxy.png" width="80" height="80" alt="Magnifying glass exploring Islamic content"
                      loading="lazy" />
                  </div>
                  <h3 class="h3 fw-bold ">Explore with Ease</h3>
                  <p class="mb-4 text-muted service-description">
                    Search the Quran, Duas, and Seerah effortlessly using simple keywords or topics.
                    Find meaningful content instantly for your spiritual journey.
                  </p>

                </div>
              </article>
            </div>

            <!-- Card 2: Listen, Watch, Reflect -->
            <div class="col-md-6 col-lg-4">
              <article class="card h-100 border-0 card-20 card-float shadow-sm">
                <div class="card-body text-center p-4">
                  <div class="my-3">
                    <img src="images/watching.png" width="80" height="80" alt="Headphones for audio content"
                      loading="lazy" />
                  </div>
                  <h3 class="h3 fw-bold ">Listen, Watch, Reflect</h3>
                  <p class="mb-4 text-muted service-description">
                    Enjoy Quran recitations, insightful podcasts, and Islamic art galleries.
                    Engage spiritually through multimedia content anywhere, anytime.
                  </p>

                </div>
              </article>
            </div>

            <!-- Card 3: Learn Your Way -->
            <div class="col-md-6 col-lg-4">
              <article class="card h-100 border-0 card-20 card-float shadow-sm">
                <div class="card-body text-center p-4">
                  <div class="my-3">
                    <img src="images/school.png" width="80" height="80" alt="Graduation cap for learning"
                      loading="lazy" />
                  </div>
                  <h3 class="h3 fw-bold">Learn Your Way</h3>
                  <p class="mb-4 text-muted service-description">
                    Text-to-speech, screen reader and keybord navigator support, and bookmarking ensure accessible
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
    <section class="container journeys-section py-5">
      <!-- Header -->
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-10">
          <h2 class="display-5 fw-bold text-dark mb-3">Explore Our Most Visited Journeys</h2>
          <p class="lead text-muted">
            Hand-curated pathways to Quran, dua, and mission experiences. Each journey features premium spacing,
            soft corners, and subtle motion to create an immersive experience.
          </p>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        <div class="col" v-for="journey in seoCards" :key="`journey-${journey.title}`">
          <article class="journey-card h-100 d-flex flex-column p-4">
            <div class="mb-3">
              <h3 class="h5 fw-bold text-dark mb-2">{{ journey.title }}</h3>
              <p class="text-secondary small mb-0">{{ journey.desc }}</p>
            </div>
            <a :href="journey.href" :title="journey.title" class="mt-auto btn btn-outline-teal btn-sm fw-semibold">
              Explore →
            </a>
            <!-- Decorative Accent -->
            <div class="card-accent"></div>
          </article>
        </div>
      </div>
    </section>

    <section class="container pt-3" aria-label="Islamic Connect Features">
      <!-- First Row - Quran Companion -->
      <div class="row py-4 py-lg-5 align-items-center">
          <div class="col-lg-6 order-2 order-lg-1">
            <h2 class="h1 fw-bold text-center text-lg-start mb-4">
              Quran Companion: AI-Powered & Accessible
            </h2>
            <p class="lead text-muted text-center text-lg-start mb-4 feature-lead">
              Experience the Quran with advanced AI tools for reading, listening, and understanding.
              Featuring text-to-speech, screen reader support, and voice search for an accessible,
              intelligent connection to the Divine.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center">
            <a href="/quran" class="btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20 feature-cta"
              title="Explore the Quran Companion">
              Explore Quran
            </a>
            </div>
          </div>
        <div class="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
          <picture>
            <source
              type="image/webp"
              srcset="/images/slide1-md.webp 600w, /images/slide1.webp 1200w"
              sizes="(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw"
            />
            <img
              src="/images/slide1.png"
              class="img-fluid rounded-20 shadow-sm"
              alt="Quran Companion interface showing AI-powered features and accessibility tools"
              loading="lazy"
              width="600"
              height="400"
            />
          </picture>
        </div>
      </div>

      <!-- Second Row - Audio Content -->
      <div class="row py-4 py-lg-5 align-items-center">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <picture>
            <source
              type="image/webp"
              srcset="/images/slide4-md.webp 600w, /images/slide4.webp 1200w"
              sizes="(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw"
            />
            <img
              src="/images/slide4.png"
              class="img-fluid rounded-20 shadow-sm"
              alt="Islamic podcasts and audio content streaming interface"
              loading="lazy"
              width="600"
              height="400"
            />
          </picture>
        </div>
          <div class="col-lg-6">
            <h2 class="h1 fw-bold text-center text-lg-start mb-4">
              Spiritual Content On-The-Go
            </h2>
            <p class="lead text-muted text-center text-lg-start mb-4 feature-lead">
              Access uplifting Islamic podcasts, inspiring audio series, and live radio in one place.
              Stay spiritually connected through sound and reflection wherever you are.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center">
            <a href="/media" class="btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20 feature-cta"
              title="Browse Islamic audio, podcasts, and video">
              Browse Content
            </a>
          </div>
        </div>
      </div>

      <!-- Third Row - Quran Explorer -->
      <div class="row py-4 py-lg-5 align-items-center">
          <div class="col-lg-6 order-2 order-lg-1">
            <h2 class="h1 fw-bold text-center text-lg-start mb-4">
              Deep Quran Exploration
            </h2>
            <p class="lead text-muted text-center text-lg-start mb-4 feature-lead">
              Search, explore, and engage with every verse effortlessly. Discover tafsir, translations,
              and recitations with tools designed for simplicity and spiritual growth.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-center justify-content-lg-center">
            <a href="/surat" class="btn btn-lg px-4 py-3 fw-semibold text-decoration-none btn-teal rounded-20 feature-cta"
              title="Start exploring Quranic passages">
              Start Exploring
            </a>
            </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
          <picture>
            <source
              type="image/webp"
              srcset="/images/slide2-md.webp 600w, /images/slide2.webp 1200w"
              sizes="(max-width: 767px) 90vw, (max-width: 991px) 60vw, 50vw"
            />
            <img
              src="/images/slide2.png"
              class="img-fluid rounded-20 shadow-sm"
              alt="Quran exploration interface with search and translation features"
              loading="lazy"
              width="600"
              height="400"
            />
          </picture>
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
                  <h3>85%</h3>
                  <p>Accessibility</p>
                  <small>Score </small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>75+</h3>
                  <p>Countries</p>
                  <small>Global reach</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>575+</h3>
                  <p>Cities/Towns</p>
                  <small>Worldwide presence</small>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-4">
                <div class="stat-card">
                  <h3>1,090%</h3>
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
    <section class="py-5" aria-labelledby="ai-tools-title">
      <div class="container pt-3">
        <div class="row justify-content-center text-center mb-3">
          <div class="col-lg-8 col-xl-7">
          </div>
          <h2 id="ai-tools-title" class="h2 mb-3 fw-bold">AI-Powered Tools for Enhanced Islamic Learning</h2>

        </div>

          <div class="row pt-3 g-4 g-md-5">
            <div class="col-12">
            <p class="lead text-center mb-4 tool-lead">
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


          <!-- Feature 2: Voice Search -->
          <!-- <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="flex-shrink-0 me-4">
                <img src="images/voice-recognition.png" width="60" height="60"
                  alt="Voice recognition icon for voice search feature" loading="lazy">
              </div>
              <div class="flex-grow-1">
                <h3 class="h5 mb-2 fw-bold">Voice-Activated Quran Search</h3>
                <p class="mb-0">
                  Use voice commands to search Quranic verses and teachings.
                  A hands-free, accessible way to explore Islamic content quickly and intuitively.
                </p>
              </div>
            </div>
          </div> -->

          <!-- Feature 3: Note Editor -->
          <!-- <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="flex-shrink-0 me-4">
                <img src="images/elearning.png" width="60" height="60" alt="E-learning icon for note editor feature"
                  loading="lazy">
              </div>
              <div class="flex-grow-1">
                <h3 class="h5 mb-2 fw-bold">Advanced Islamic Note Editor</h3>
                <p class="mb-0">
                  A customizable note-taking tool designed specifically for Islamic studies.
                  Organize your reflections, bookmarks, and study notes with ease.
                </p>
              </div>
            </div>
          </div> -->

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

    <!-- Premium CTA Section -->
    <section class="py-5 bg-white" aria-labelledby="premium-heading" role="region">
      <div class="container">
        <div class="row justify-content-center text-center mb-4">
          <div class="col-lg-8">
            <h2 id="premium-heading" class="fw-bold premium-heading">
              Support The Work, Access More</h2>
            <p class="lead text-muted premium-lead">
              Your support sustains this khidmah and keeps Islamic knowledge accessible for everyone.
            </p>
          </div>
        </div>


        <!-- Faith-centered quote -->
        <div class="row justify-content-center mb-4 quote-wrapper bg-white">
          <div class="col-lg-9">
            <div class="quote-card">

              <!-- Subtle glowing accent -->
              <div class="quote-glow"></div>

              <div class="quote-content">
                <!-- First Quote -->
                <p class="faith-quote">
                  <span class="quote-mark" aria-hidden="true">“</span>
                  Whoever treads a path seeking knowledge, Allah will make easy for him a path to Paradise.
                  <span class="quote-mark" aria-hidden="true">”</span>
                </p>

                <div class="quote-ref">Hadith — Sahih Muslim</div>

                <!-- Decorative divider -->
                <div class="quote-divider"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="row g-4">
              <div class="col-md-6">
                <div class="card h-100 border-0 support-card">
                  <div class="card-body p-4 text-start">
                    <h3 class="h4 fw-bold mb-3 support-card-title">What your support enables</h3>
                    <ul class="support-card-list">
                      <li class="mb-2"><i class="fas fa-check text-success me-2"></i>Keep Quran tools fast, accessible,
                        and ad‑free</li>
                      <li class="mb-2"><i class="fas fa-check text-success me-2"></i>Offer trustworthy resources curated
                        with amanah</li>
                      <li class="mb-2"><i class="fas fa-check text-success me-2"></i>Deliver new features shaped by your
                        feedback</li>
                      <li class="mb-2"><i class="fas fa-check text-success me-2"></i>Make the platform available to
                        those who can’t pay</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="h-100 d-flex flex-column justify-content-between support-panel">
                  <div class="p-4 text-start">
                    <h3 class="h4 fw-bold mb-3 support-panel-title">Simple and transparent</h3>
                    <p class="mb-3 support-panel-text">Secure Stripe payments. Cancel anytime. No tracking, no ads.
                    </p>
                    <button @click="goTo('/support')" class="support-cta">
                      <i class="fas fa-heart me-2"></i>Provide a small Donation
                    </button>
                  </div>
                  <div class="px-4 pb-4">
                    <div class="d-flex align-items-center support-cta-note">
                      <i class="fas fa-lock"></i>
                      <small>SSL encrypted • PCI compliant</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Join Section -->
    <!-- Enhanced Quick Join Section -->
        <section class="py-5 quick-join-section">
      <div class="quick-join-blob quick-join-blob--one"></div>
      <div class="quick-join-blob quick-join-blob--two"></div>
      <div class="quick-join-blob quick-join-blob--three"></div>

      <div class="container quick-join-container">
        <div class="row align-items-center">
          <div class="col-lg-7 text-center text-lg-start">
            <h2 class="text-white fw-bold mb-3 quick-join-heading">Ready to Transform Your Daily Spiritual Journey?</h2>
            <p class="text-white mb-4 quick-join-subtitle">
              Join now and receive your first spiritual reminder within minutes. Start your day with divine inspiration!
            </p>
          </div>

          <div class="col-lg-5 text-center">
            <div class="row g-3">
              <div class="col-12">
                <article class="join-card join-card-hover rounded-20">
                  <div class="d-flex align-items-center mb-3">
                    <div class="join-card-icon join-card-icon--whatsapp">
                      <i class="fab fa-whatsapp join-card-icon-symbol"></i>
                    </div>
                    <div class="text-start">
                      <h3 class="join-card-title">WhatsApp Channel</h3>
                      <small class="text-muted">Daily verses & instant reminders</small>
                    </div>
                  </div>
                  <a href="https://whatsapp.com/channel/0029VbAsOvp59PwIp2zwyB1m"
                    target="_blank" rel="noopener noreferrer"
                    class="btn w-100 rounded-20 join-card-cta join-card-cta--whatsapp"
                    title="Join Islamic Connect WhatsApp channel">
                    <i class="fab fa-whatsapp me-2"></i>Join WhatsApp Channel
                    <span class="join-card-cta-arrow">→</span>
                  </a>
                </article>
              </div>
              <div class="col-12">
                <article class="join-card join-card-hover rounded-20">
                  <div class="d-flex align-items-center mb-3">
                    <div class="join-card-icon join-card-icon--telegram">
                      <i class="fab fa-telegram join-card-icon-symbol"></i>
                    </div>
                    <div class="text-start">
                      <h3 class="join-card-title">Telegram Community</h3>
                      <small class="text-muted">In-depth content & discussions</small>
                    </div>
                  </div>
                  <a href="https://t.me/+r81Q3SEAa-M5ZWI0" target="_blank" rel="noopener noreferrer"
                    class="btn w-100 rounded-20 join-card-cta join-card-cta--telegram"
                    title="Join Islamic Connect Telegram community">
                    <i class="fab fa-telegram me-2"></i>Join Telegram Community
                    <span class="join-card-cta-arrow">→</span>
                  </a>
                </article>
              </div>
            </div>

            <div class="mt-3 hero-trust-badge quick-join-trust">
              <div class="d-flex align-items-center hero-trust-badge-content">
                <i class="fas fa-shield-alt text-white"></i>
                <small class="text-white fw-bold">100% Free • Easy Subscribe</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-floating-icon quick-join-floating-icon">
        <i class="fas fa-quran"></i>
      </div>
    </section>

<!-- contact -->
    <section class="py-5 contact-section contact-section-card" aria-labelledby="contact-heading">
      <div class="container-fluid">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xxl-7">
            <h2 id="contact-heading" class="display-5 fw-bold mb-3">Get In Touch</h2>
            <p class="lead fw-semibold text-muted">
              Have questions or need assistance? We're here to help! Reach out to Islamic Connect
              for support, feedback, or inquiries about our content and services.
            </p>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-10 col-lg-6 mt-4">
            <form @reset="reset" @submit.prevent="sendMessage()" role="form" aria-label="Contact form">
              <div class="row g-3">
                <!-- First Name -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="firstname" class="form-label visually-hidden">First Name</label>
                    <input id="firstname" class="form-control form-control-lg bg-light" v-model="form.firstname"
                      name="firstname" placeholder="First name" type="text" aria-required="true" required />
                  </div>
                </div>

                <!-- Last Name -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="lastname" class="form-label visually-hidden">Last Name</label>
                    <input id="lastname" class="form-control form-control-lg bg-light" v-model="form.lastname"
                      name="lastname" placeholder="Last name" type="text" aria-required="true" required />
                  </div>
                </div>

                <!-- Email -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="email" class="form-label visually-hidden">Email Address</label>
                    <input id="email" class="form-control form-control-lg bg-light" v-model="form.email" name="email"
                      placeholder="Email address" type="email" aria-required="true" required />
                  </div>
                </div>

                <!-- Subject -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="subject" class="form-label visually-hidden">Subject</label>
                    <input id="subject" class="form-control form-control-lg bg-light" v-model="form.subject"
                      name="subject" placeholder="Subject" type="text" aria-required="true" required />
                  </div>
                </div>

                <!-- Phone Number -->
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="mobile" class="form-label visually-hidden">Phone Number</label>
                    <input id="mobile" class="form-control form-control-lg bg-light" v-model="form.mobile" name="mobile"
                      placeholder="Phone number (optional)" type="tel" pattern="[0-9]{10,15}"
                      title="Please enter a valid phone number" />
                  </div>
                </div>

                <!-- Message -->
                <div class="col-12">
                  <div class="mb-3">
                    <label for="message" class="form-label visually-hidden">Your Message</label>
                    <textarea id="message" class="form-control form-control-lg bg-light" v-model="form.message"
                      name="message" placeholder="Your message" rows="5" aria-required="true" required></textarea>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="col-12">
                  <div class="d-grid">
                    <button type="submit" class="btn btn-teal rounded-20 btn-lg fw-bold py-3">
                      <span class="d-flex align-items-center justify-content-center">
                        <i class="fas fa-paper-plane me-2" aria-hidden="true"></i>
                        Send Message
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>


    <!-- Remove the container if you want to extend the Footer to full width. -->
    <footer class="ic-footer text-white" role="contentinfo">
      <div
        class="container-fluid footer-inner d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <div class="copyright text-center text-md-start">
          <span class="me-2">©</span>
          <strong>2025 Copyright: </strong>
          <a href="https://islamiconnect.com/" class="text-white text-decoration-none fw-bold" title="Visit Islamic Connect homepage">islamiconnect.com</a>
        </div>
        <div class="social text-center text-md-end">
          <a href="https://www.facebook.com/profile.php?id=61560313385599" aria-label="Visit our Facebook page"
            title="Follow Islamic Connect on Facebook"><i
              class="fab fa-facebook-f" aria-hidden="true"></i></a>
          <a href="https://x.com/islamiconnect24" aria-label="Visit our X (Twitter) profile"
            title="Follow Islamic Connect on X (Twitter)"><i class="fab fa-twitter"
              aria-hidden="true"></i></a>
          <a href="https://www.linkedin.com/company/islamic-connect/" aria-label="Visit our LinkedIn page"
            title="Follow Islamic Connect on LinkedIn"><i
              class="fab fa-linkedin" aria-hidden="true"></i></a>
          <a href="https://www.instagram.com/islamicconnect24/" aria-label="Visit our Instagram profile"
            title="Follow Islamic Connect on Instagram"><i
              class="fab fa-instagram" aria-hidden="true"></i></a>
        </div>
      </div>
    </footer>
    <!-- End of .container -->
  </div>
</template>
<style scoped>


.seo-benefits li strong {
  display: block;
  color: #0b5d4b;
  margin-bottom: 0.25rem;
}

.seo-benefits li {
  padding: 0.75rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(13, 128, 111, 0.2);
  background: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
}

.quote-wrapper {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
}

.quote-card {
  background: linear-gradient(145deg, #ffffff, #f3f9f8);
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
  background: radial-gradient(circle, rgba(0, 150, 136, 0.15), transparent 70%);
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
  color: #00332e;
  font-weight: 600;
  padding: 0 8px;
}

.faith-dua {
  font-size: clamp(1rem, 3.5vw, 1.25rem);
  line-height: 1.7;
  margin: 0;
  color: #00332e;
  font-weight: 600;
  padding: 0 8px;
  opacity: 0;
  animation: fadeInGlow 3s ease-in-out forwards;
}

.quote-mark {
  font-size: 2.2rem;
  color: #009688;
  vertical-align: middle;
  font-weight: 700;
}

.faith-dua .quote-mark {
  font-size: 1.8rem;
}

.quote-ref {
  text-align: right;
  font-style: italic;
  color: #607d8b;
  font-size: 0.92rem;
  font-family: 'Nunito Sans', 'Segoe UI', sans-serif;
  margin-bottom: 1.2rem;
}

.dua-ref {
  display: block;
  margin-top: 6px;
  font-size: 0.9rem;
  color: #607d8b;
  font-family: 'Nunito Sans', 'Segoe UI', sans-serif;
}

.quote-divider {
  width: 70px;
  height: 3px;
  background: linear-gradient(90deg, #009688, #4db6ac);
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
    color: #1a5f7a !important;
  }
}

.card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15) !important;
}

/* Button focus states for accessibility */
.btn:focus {
  outline: 3px solid #1a5f7a;
  outline-offset: 2px;
}

/* Card focus states */
.card:focus-within {
  outline: 2px solid rgb(0, 121, 107);
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
  background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);
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
</style>
<script defer>
import axios from "axios";
import PrayerTimes from "./translation/PrayerTimes.vue";
import AyahOfTheDay from "./translation/AyahOfTheDay.vue";

export default {
  components: {
    PrayerTimes,
    AyahOfTheDay
  },
  data() {
    return {
      amount: 10,
      carouselReady: false,
      partners: [
        { name: "Ana Atlou", icon: "/images/aatlout.webp" },
        { name: "Noor Taibah", icon: "/images/algerian.png" },
        { name: "Algerian Quran", icon: "/images/aatlout.webp" },
        { name: "Islamic Connect", icon: "/images/algerian.png" }
      ],
      chunkSize: 4,
      mailing: {},
      feedback: {},
      seoStats: [
        { value: "85%", label: "Accessibility score" },
        { value: "75+", label: "Countries served" },
        { value: "575+", label: "Cities reached" }
      ],
      seoCards: [
        {
          title: "Quran Explorer",
          desc: "Read and listen to the Quran with accurate translations, tafsir explanations, and synchronized audio tools.",
          href: "/quran"
        },
        {
          title: "Dua Collections",
          desc: "Access authentic supplications for daily life, travel, and special occasions, all verified for accuracy.",
          href: "/dua"
        },
        {
          title: "Audio Podcasts",
          desc: "Explore Islamic podcasts and narrations with context and commentary, perfect for learning on the go.",
          href: "/content"
        },
        {
          title: "Guides & Knowledge",
          desc: "Discover practical guides on spirituality, fiqh, and modern Islamic living for personal growth.",
          href: "/guide"
        },
        {
          title: "Seerah Timeline",
          desc: "Follow the life of the Prophet ﷺ and the global impact of Islamic history through an interactive timeline.",
          href: "/mission"
        },
        {
          title: "Support & Donations",
          desc: "Contribute to the platform and help sustain community programs, educational content, and accessibility tools.",
          href: "/support"
        }
      ],
      externalLinks: [
        { href: "https://quran.com", title: "Quran.com complete Quran translations", text: "Quran.com — Complete Quran text and translations" },
        { href: "https://sunnah.com", title: "Sunnah.com searchable hadiths", text: "Sunnah.com — Hadith collections in searchable format" },
        { href: "https://islamicfinder.org", title: "IslamicFinder global prayer data", text: "IslamicFinder.org — Prayer times, mosque locators, and event calendars" }
      ],
      // Unified reactive form object (avoid duplicate keys)
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
  mounted() {
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.carouselReady = true;
        }, 400);
      });
    } else {
      this.carouselReady = true;
    }
  },
  methods: {
    goTo(path) {
      if (typeof window !== 'undefined' && window?.location) {
        window.location.href = path;
      }
    },
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
.hero-jumbotron {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.hero-layout {
  position: relative;
}

.hero-stage {
  position: relative;
  overflow: hidden;
}

.hero-floating {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
}

.hero-floating--primary {
  right: -10%;
  width: 400px;
  height: 400px;
  animation: float 8s ease-in-out infinite;
}

.hero-floating--secondary {
  bottom: -30%;
  left: -5%;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(26, 95, 122, 0.08), rgba(0, 191, 166, 0.08));
  animation: float 6s ease-in-out infinite 2s;
}

.hero-row {
  position: relative;
  z-index: 2;
}

.hero-badge {
  background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  display: inline-block;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 191, 166, 0.3);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.hero-title {
  background: linear-gradient(135deg, #1a5f7a, #2c3e50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 3.5rem;
}

.hero-subtitle {
  line-height: 1.8em;
  font-size: 1.3rem;
  color: #4a5568;
  font-weight: 500;
  margin-bottom: 1.25rem;
  padding-right: 1rem;
}

.hero-controls {
  gap: 1rem;
}

.hero-cta-outline {
  background: rgba(255, 255, 255, 0.9);
  color: #1a5f7a;
  border: 2px solid #1a5f7a;
  transition: all 0.2s ease;
}

.hero-cta-outline:hover,
.hero-cta-outline:focus-visible {
  background: #1a5f7a;
  color: #fff;
}

.hero-trust-indicators {
  gap: 1.5rem;
}

.trust-label {
  color: #4a5568;
  font-weight: 600;
}

.prayer-title {
  color: black;
  font-weight: 800;
}

.services-section {
  background: #f8f9fa;
}

.service-description {
  font-size: 16px;
  line-height: 1.6;
}

.feature-lead,
.tool-lead {
  line-height: 1.7;
}

.feature-cta {
  min-width: 160px;
}

.premium-heading {
  font-size: 2.25rem;
  color: #1a5f7a;
}

.premium-lead {
  line-height: 1.7;
}

.support-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.support-card-title {
  color: #2c3e50;
}

.support-card-list {
  list-style: none;
  padding-left: 0;
  color: #4a5568;
  line-height: 1.7;
}

.support-panel {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.support-panel-title {
  color: #2c3e50;
}

.support-panel-text {
  color: #4a5568;
}

.support-cta {
  background: rgba(255, 255, 255, 0.9);
  color: #1a5f7a;
  border: 2px solid #1a5f7a;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 5px 20px rgba(26, 95, 122, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.support-cta:hover,
.support-cta:focus-visible {
  transform: translateY(-2px);
  background: #1a5f7a;
  color: #fff;
  box-shadow: 0 8px 25px rgba(26, 95, 122, 0.4);
}

.support-cta-note {
  gap: 0.5rem;
  color: #6c757d;
}

.quick-join-section {
  background: linear-gradient(135deg, rgb(0, 121, 107), #1a5f7a);
  position: relative;
  overflow: hidden;
}

.quick-join-blob {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 8s ease-in-out infinite;
  z-index: 0;
}

.quick-join-blob--one {
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
}

.quick-join-blob--two {
  bottom: -30%;
  left: -5%;
  width: 200px;
  height: 200px;
  animation-delay: 2s;
}

.quick-join-blob--three {
  top: 20%;
  left: 10%;
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  animation-delay: 1s;
}

.quick-join-container {
  position: relative;
  z-index: 2;
}

.quick-join-heading {
  font-size: 2.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.quick-join-subtitle {
  font-size: 1.2rem;
  opacity: 0.98;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.45);
}

.join-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.join-card-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
}

.join-card-icon--whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
}

.join-card-icon--telegram {
  background: linear-gradient(135deg, #0088cc, #006699);
  box-shadow: 0 5px 15px rgba(0, 136, 204, 0.4);
}

.join-card-icon-symbol {
  color: #fff;
  font-size: 1.5rem;
}

.join-card-title {
  color: #1a5f7a;
  margin: 0;
}

.join-card-cta {
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.join-card-cta--whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #fff;
  box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
}

.join-card-cta--telegram {
  background: linear-gradient(135deg, #0088cc, #006699);
  color: #fff;
  box-shadow: 0 5px 15px rgba(0, 136, 204, 0.4);
}

.join-card-cta:hover,
.join-card-cta:focus-visible {
  transform: translateY(-2px);
}

.join-card-cta-arrow {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 0.9rem;
  opacity: 0.9;
}

.hero-floating-icon {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0.1;
  font-size: 3rem;
  animation: float 4s ease-in-out infinite;
}

.quick-join-floating-icon {
  left: auto;
}

.contact-section-card {
  background: #fff;
  box-shadow: 0 7px 29px rgba(100, 100, 111, 0.2);
}

.journeys-section {
  background: #fefefe;
}

.journey-card {
  background: linear-gradient(145deg, #ffffff, #f0f9f9);
  border-radius: 1.25rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
  transition: all 0.35s ease-in-out;
  position: relative;
  overflow: hidden;
}

.journey-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
}

.btn-outline-teal {
  color: #0d6a6f;
  border-color: #0d6a6f;
  transition: all 0.3s;
}

.btn-outline-teal:hover {
  background-color: #14b8a6;
  border-color: #14b8a6;
  color: #fff;
}

.card-accent {
  content: '';
  position: absolute;
  bottom: -20px;
  right: -40px;
  width: 100px;
  height: 100px;
  background: rgba(20, 184, 166, 0.1);
  border-radius: 50%;
  transition: all 0.4s;
}

.journey-card:hover .card-accent {
  bottom: -10px;
  right: -20px;
  width: 120px;
  height: 120px;
}

/* Combined Section */
.combined-section {
  padding: 80px 0;
  background: #f8f9fa;
}

/* Performance optimizations */
.img-fluid {
  max-width: 100%;
  height: auto;
}

.rounded-3 {
  border-radius: 0.75rem !important;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

/* Improved button styling */
.btn-primary {
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 191, 166, 0.3);
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

@media (max-width: 991.98px) {
  .h1 {
    font-size: 2rem !important;
  }

  .lead {
    font-size: 1.1rem;
  }

  .py-4 {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .btn-primary {
    transition: none;
  }

  .btn-primary:hover {
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .text-muted {
    color: #000 !important;
  }

  .shadow-sm {
    box-shadow: 0 0 0 2px #000 !important;
  }
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

/* Utilities for consistent 20px rounded aesthetic and subtle animations */
.rounded-20 {
  border-radius: 20px !important;
}

.card-20 {
  border-radius: 20px;
  overflow: hidden;
}

.card-float {
  transition: transform .25s ease, box-shadow .25s ease;
}

.card-float:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, .12) !important;
}

.btn-teal {
  background-color: #0db691;
  color: #fff;
  border: none;
  transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;
}

.btn-teal:hover {
  background-color: #0aa07f;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, .15);
}

.btn-teal:focus-visible {
  outline: none;
  animation: focusPulse .6s ease;
}

@keyframes focusPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(13, 182, 145, .45);
  }

  100% {
    box-shadow: 0 0 0 8px rgba(13, 182, 145, 0);
  }
}

@media (prefers-reduced-motion: reduce) {

  .card-float,
  .btn-teal {
    transition: none !important;
    animation: none !important;
  }
}

.premium-seo {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 32px;
  padding: 3rem 0 4.5rem;
  box-shadow: 0 30px 70px rgba(13, 128, 111, 0.1);
  overflow: hidden;
  position: relative;
}

.premium-card {
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid #e3e8ed;
  box-shadow: 0 25px 40px rgba(15, 76, 117, 0.08);
  transition: transform .35s ease, box-shadow .35s ease;
}

.premium-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 35px 45px rgba(9, 70, 102, 0.15);
}

.premium-card h3 {
  font-size: 1rem;
}

.premium-stat {
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(13, 128, 111, 0.08), rgba(12, 112, 95, 0.07));
  border: 1px solid rgba(13, 128, 111, 0.15);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  animation: pulse 6s ease-in-out infinite;
}

.text-teal {
  color: #0db691;
}

.highlight-badge {
  border-radius: 999px;
  padding: 0.35rem 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  background: rgba(13, 128, 111, 0.12);
  color: #0b806f;
  border: 1px solid rgba(13, 128, 111, 0.2);
}

@keyframes pulse {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }

  100% {
    transform: translateY(0);
  }
}

.premium-seo__backdrop {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  right: -90px;
  top: -120px;
  background: radial-gradient(circle, rgba(13, 128, 111, 0.25), transparent 60%);
  filter: blur(12px);
  z-index: 0;
  animation: float-glow 12s ease-in-out infinite;
}

.premium-seo .container {
  position: relative;
  z-index: 1;
}

@keyframes float-glow {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }

  100% {
    transform: translateY(0);
  }
}

.journeys-section {
  max-width: 1100px;
}

.journeys-section .premium-card {
  min-height: 180px;
  justify-content: space-between;
}
</style>
