<template>
  <div class="ic-home">
    <section class="ic-hero" aria-labelledby="home-hero-title">
      <div class="container-fluid ic-shell">
        <div class="row align-items-center g-4">
          <div class="col-md-6">
            <p class="ic-hero__badge">
              <i class="fas fa-star" aria-hidden="true"></i>
              Trusted by Muslims worldwide
            </p>
            <h1 id="home-hero-title" class="ic-hero__title">
              Learn Quran, Build Consistency, and Stay Connected in One Place
            </h1>
            <p class="ic-hero__lead">
              Islamic Connect brings Quran reading, dua guidance, and practical learning tools into a single, accessible
              homepage so daily worship feels clear and consistent.
            </p>
            <div class="ic-hero__actions">
              <a href="/surat" class="btn ic-btn ic-btn--solid">
                <i class="fas fa-book-open me-2" aria-hidden="true"></i>
                Explore Quran
              </a>
              <a href="/dua" class="btn ic-btn ic-btn--outline">
                <i class="fas fa-hands me-2" aria-hidden="true"></i>
                Read Duas
              </a>
            </div>
            <ul class="ic-hero__trust list-unstyled mb-0" aria-label="Platform highlights">
              <li v-for="item in trustHighlights" :key="item.label" class="ic-hero__trust-item">
                <i :class="item.icon" aria-hidden="true"></i>
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </div>

          <div class="col-md-6">
            <div class="ic-hero__media">
              <picture>
                <source
                  srcset="/images/banner-photo-400.avif 400w, /images/banner-photo-800.avif 800w, /images/banner-photo-1200.avif 1200w"
                  type="image/avif"
                />
                <source
                  srcset="/images/banner-photo-400.webp 400w, /images/banner-photo-800.webp 800w, /images/banner-photo-1200.webp 1200w"
                  type="image/webp"
                />
                <img
                  src="/images/banner-photo.png"
                  srcset="/images/banner-photo.png 800w"
                  sizes="(min-width: 768px) 50vw, 90vw"
                  class="img-fluid ic-hero__image"
                  alt="Islamic Connect platform showcasing Quran exploration and accessibility tools"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  width="800"
                  height="800"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ic-section ic-section--surface" aria-labelledby="discover-heading">
      <div class="container ic-shell">
        <div class="section-intro text-center">
          <h2 id="discover-heading" class="section-title">Discover Quran, Knowledge, and Accessible Tools</h2>
          <p class="section-lead">
            Study with reliable references, audio support, and guided pathways designed for steady progress.
          </p>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-sm-6 col-lg-4" v-for="stat in seoStats" :key="stat.label">
            <article class="ic-stat-card h-100">
              <p class="ic-stat-card__value">{{ stat.value }}</p>
              <p class="ic-stat-card__label mb-0">{{ stat.label }}</p>
            </article>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-xl-3" v-for="card in seoCards" :key="card.title">
            <article class="ic-link-card h-100">
              <h3>{{ card.title }}</h3>
              <p>{{ card.desc }}</p>
              <a :href="card.href" class="ic-link-card__cta">{{ card.cta }}</a>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="ic-section" aria-labelledby="objectives-heading">
      <div class="container ic-shell">
        <div class="section-intro text-center">
          <p class="section-kicker">Public Benefit Mission</p>
          <h2 id="objectives-heading" class="section-title">Our Core Objectives</h2>
          <p class="section-lead">
            We focus on education, inclusion, and practical digital access to Islamic learning.
          </p>
        </div>

        <div class="row g-4">
          <div class="col-lg-4" v-for="objective in objectives" :key="objective.title">
            <article class="ic-objective-card h-100">
              <div class="ic-objective-card__top">
                <span class="ic-objective-card__index">{{ objective.index }}</span>
                <span class="ic-objective-card__icon" aria-hidden="true">
                  <i :class="objective.icon"></i>
                </span>
              </div>
              <h3>{{ objective.title }}</h3>
              <p class="mb-0">{{ objective.desc }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="ic-section ic-section--alt" aria-labelledby="features-heading">
      <div class="container ic-shell">
        <div class="section-intro text-center">
          <h2 id="features-heading" class="section-title">What You Can Do Here</h2>
          <p class="section-lead">A focused set of tools for reading, listening, and learning every day.</p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-xl-4" v-for="feature in features" :key="feature.title">
            <article class="ic-feature-card h-100">
              <img
                :src="feature.image"
                :alt="feature.imageAlt"
                width="80"
                height="80"
                loading="lazy"
                class="ic-feature-card__image"
              />
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.desc }}</p>
              <a :href="feature.href" class="ic-link-card__cta">{{ feature.cta }}</a>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="ic-section" aria-labelledby="community-heading">
      <div class="container ic-shell">
        <article class="ic-community">
          <div class="row g-4 align-items-stretch">
            <div class="col-lg-7">
              <h2 id="community-heading" class="section-title mb-3">Stay Connected Every Day</h2>
              <p class="section-lead mb-4">
                Join our community channels to receive reminders, reflections, and practical updates directly.
              </p>
              <div class="ic-community__points">
                <p v-for="point in communityPoints" :key="point" class="ic-community__point mb-0">
                  <i class="fas fa-check-circle" aria-hidden="true"></i>
                  <span>{{ point }}</span>
                </p>
              </div>
            </div>

            <div class="col-lg-5">
              <div class="row g-3 h-100">
                <div class="col-12" v-for="channel in communityChannels" :key="channel.name">
                  <a
                    :href="channel.href"
                    class="ic-channel-card"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="channel.cta"
                  >
                    <div class="ic-channel-card__header">
                      <span :class="`ic-channel-card__icon ic-channel-card__icon--${channel.type}`" aria-hidden="true">
                        <i :class="channel.icon"></i>
                      </span>
                      <div>
                        <h3>{{ channel.name }}</h3>
                        <p>{{ channel.caption }}</p>
                      </div>
                    </div>
                    <span class="ic-channel-card__cta">
                      {{ channel.cta }}
                      <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="ic-section ic-section--surface" aria-labelledby="contact-heading">
      <div class="container ic-shell">
        <div class="section-intro text-center">
          <h2 id="contact-heading" class="section-title">Contact the Team</h2>
          <p class="section-lead">Share feedback, report an issue, or ask a question. We read every message.</p>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-9">
            <div class="contact-card">
              <p class="contact-card__note mb-4">
                We route messages by topic so the right person can follow up quickly.
              </p>
              <form @reset="reset" @submit.prevent="sendMessage" role="form" aria-label="Contact form">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="firstname" class="visually-hidden">First Name</label>
                    <input
                      id="firstname"
                      v-model="form.firstname"
                      name="firstname"
                      class="form-control form-control-lg"
                      placeholder="First name"
                      type="text"
                      autocomplete="given-name"
                      maxlength="60"
                      required
                    />
                  </div>

                  <div class="col-md-6">
                    <label for="lastname" class="visually-hidden">Last Name</label>
                    <input
                      id="lastname"
                      v-model="form.lastname"
                      name="lastname"
                      class="form-control form-control-lg"
                      placeholder="Last name"
                      type="text"
                      autocomplete="family-name"
                      maxlength="60"
                      required
                    />
                  </div>

                  <div class="col-md-6">
                    <label for="email" class="visually-hidden">Email Address</label>
                    <input
                      id="email"
                      v-model="form.email"
                      name="email"
                      class="form-control form-control-lg"
                      placeholder="Email address"
                      type="email"
                      autocomplete="email"
                      inputmode="email"
                      autocapitalize="off"
                      spellcheck="false"
                      maxlength="120"
                      required
                    />
                  </div>

                  <div class="col-md-6">
                    <label for="subject" class="visually-hidden">Subject</label>
                    <select id="subject" v-model="form.subject" name="subject" class="form-select form-select-lg" required>
                      <option disabled value="">Select subject</option>
                      <option v-for="option in subjectOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                  </div>

                  <div class="col-12">
                    <label for="message" class="visually-hidden">Message</label>
                    <textarea
                      id="message"
                      v-model="form.message"
                      name="message"
                      class="form-control form-control-lg"
                      placeholder="Your message"
                      rows="5"
                      :maxlength="maxMessageLength"
                      required
                    ></textarea>
                    <small class="contact-card__counter d-block mt-2 text-muted">
                      {{ messageCharacterCount }}/{{ maxMessageLength }} characters
                    </small>
                  </div>

                  <div class="col-12">
                    <button
                      type="submit"
                      class="btn ic-btn ic-btn--solid w-100"
                      :disabled="isSubmitting || !isContactFormValid"
                    >
                      <i class="fas fa-paper-plane me-2" aria-hidden="true"></i>
                      {{ isSubmitting ? "Sending..." : "Send Message" }}
                    </button>
                    <small class="d-block mt-2 text-muted">Typical response time: within 24 hours.</small>
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
        <div class="premium-dialog-card" role="dialog" aria-modal="true" aria-live="polite">
          <h3 class="premium-dialog-title">{{ confirmDialog.title }}</h3>
          <p class="premium-dialog-message">{{ confirmDialog.message }}</p>
          <div class="premium-dialog-actions">
            <button class="btn btn-outline-secondary" @click="handleCancel" :disabled="isSubmitting">Cancel</button>
            <button ref="confirmPrimaryButton" class="btn ic-btn ic-btn--solid" @click="handleConfirm" :disabled="isSubmitting">
              {{ confirmDialog.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="premium-toast">
      <div v-if="toast.visible" class="premium-toast" :class="`premium-toast--${toast.type}`" role="status" aria-live="polite">
        <div class="premium-toast__copy">
          <p class="premium-toast__title mb-0">{{ toast.title }}</p>
          <small>{{ toast.message }}</small>
        </div>
        <button class="btn-close btn-close-white" @click="dismissToast" aria-label="Dismiss notification"></button>
      </div>
    </transition>

    <footer class="ic-footer" role="contentinfo">
      <div class="container-fluid ic-shell ic-footer__inner">
        <div class="ic-footer__copy text-center text-md-start">
          <span class="me-1">©</span>
          <strong>{{ currentYear }}</strong>
          <a href="https://islamiconnect.com/" class="ic-footer__brand">islamiconnect.com</a>
        </div>
        <div class="ic-footer__social text-center text-md-end">
          <a href="https://www.facebook.com/profile.php?id=61560313385599" aria-label="Visit our Facebook page">
            <i class="fab fa-facebook-f" aria-hidden="true"></i>
          </a>
          <a href="https://x.com/islamiconnect24" aria-label="Visit our X (Twitter) profile">
            <i class="fab fa-twitter" aria-hidden="true"></i>
          </a>
          <a href="https://www.linkedin.com/company/islamic-connect/" aria-label="Visit our LinkedIn page">
            <i class="fab fa-linkedin" aria-hidden="true"></i>
          </a>
          <a href="https://www.instagram.com/islamicconnect24/" aria-label="Visit our Instagram profile">
            <i class="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script src="../scripts/HomepageComponent.script.js"></script>
<style scoped src="../styles/HomepageComponent.style.css"></style>
