<template>
  <section v-if="!information" aria-labelledby="welcome-heading" class="welcome-section" role="tabpanel">
    <div class="container">
      <section class="companion-hero container" aria-labelledby="companion-heading">
            <div class="hero-inner">
              
                <div class="hero-text">
                  <h1 class="fw-bold text-left">Quran Companion</h1>
                    <p class="hero-eyebrow text-uppercase fw-semibold mb-2">Guided study experience</p>
                    <Title class="hero-title" />
                    <!-- <ChatBot /> -->
                    <p id="companion-heading" class="hero-copy">
                        The Quran Companion page utilizes AI tools and accessibility features to enrich your learning
                        experience. It offers text-to-speech, speech-to-text, synchronized highlighting, and more.
                    </p>
                </div>
                <div class="hero-visual d-none d-lg-flex" aria-hidden="true">
                    <div class="hero-ring ring-1"></div>
                    <div class="hero-ring ring-2"></div>
                    <div class="hero-ring ring-3"></div>
                </div>
            </div>
        </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    information: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.welcome-section {
  background: linear-gradient(180deg, #f8fbfb, #fdfcf8);
  padding: clamp(0.5rem, 5vw, 4rem) 0;
  border-radius: 15px;
}

.companion-hero {
  background: linear-gradient(145deg, #f4f9f7, #fdfcf8);
  border: 1px solid rgba(11, 128, 111, 0.12);
  border-radius: 28px;
  padding: clamp(1.5rem, 4vw, 3rem);
  margin: 0 auto;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
}

.hero-text {
  text-align: left;
  max-width: 640px;
}

.hero-eyebrow {
  letter-spacing: 0.3em;
  font-size: 0.78rem;
  color: #1a5f7a;
}

:deep(.hero-title) {
  color: #0f172a;
  font-size: clamp(2.4rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
}

.hero-copy {
  color: #1f2933;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 0;
}

.hero-visual {
  position: relative;
  width: 280px;
  aspect-ratio: 1 / 1;
  align-items: center;
  justify-content: center;
}

.hero-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(11, 128, 111, 0.35);
  box-shadow: 0 10px 25px rgba(11, 128, 111, 0.15);
  animation: heroPulse 8s ease-in-out infinite;
}

.ring-1 {
  width: 90%;
  height: 90%;
  animation-delay: 0s;
}

.ring-2 {
  width: 70%;
  height: 70%;
  animation-delay: 2s;
}

.ring-3 {
  width: 50%;
  height: 50%;
  animation-delay: 4s;
  background: radial-gradient(circle, rgba(11, 128, 111, 0.1), transparent 65%);
}

@keyframes heroPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.95;
  }

  50% {
    transform: scale(1.05);
    opacity: 0.6;
  }
}

@media (max-width: 991px) {
  .hero-inner {
    flex-direction: column;
    text-align: center;
  }

  .hero-text {
    text-align: center;
  }
}

@media (max-width: 576px) {
  .companion-hero {
    border-radius: 18px;
    padding: 1.5rem;
  }

  .hero-copy {
    font-size: 1rem;
  }
}
</style>
