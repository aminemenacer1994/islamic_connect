<template>
  <section
    v-if="!information"
    aria-labelledby="welcome-heading"
    class="welcome-section"
    role="tabpanel"
    tabindex="0"
  >
    <div class="container">
      <section
        class="companion-hero container"
        aria-labelledby="companion-heading"
        :class="{ 'animate-in': !information }"
      >
        <!-- HIDDEN ON MOBILE: Entire hero-inner only shows on lg+ -->
        <div class="hero-inner d-none d-lg-flex">
          <div class="hero-text">
            <h1 class="fw-bold text-left">Quran Explorer</h1>
            <Title class="hero-title" />
            <!-- <ChatBot /> -->
            <p id="companion-heading" class="hero-copy">
              The Quran Companion page utilizes AI tools and accessibility features to enrich your learning
              experience. It offers text-to-speech, speech-to-text, synchronized highlighting, and more.
            </p>
          </div>

          <div class="hero-visual" aria-hidden="true">
            <div class="hero-ring ring-1" aria-hidden="true"></div>
            <div class="hero-ring ring-2" aria-hidden="true"></div>
            <div class="hero-ring ring-3" aria-hidden="true"></div>
            <div class="hero-center-glow" aria-hidden="true"></div>
          </div>
        </div>

        <!-- OPTIONAL: Mobile-only alternative (uncomment if desired) -->
        <!--
        <div class="hero-inner-mobile d-block d-lg-none text-center py-4">
          <h1 class="fw-bold mb-3" style="font-size: 2.2rem;">Quran Explorer</h1>
          <Title class="hero-title d-inline-block mx-auto mb-3" />
          <p class="hero-copy px-3" style="font-size: 1.1rem; max-width: 90%;">
            AI-powered Quran learning with text-to-speech, highlighting, and more.
          </p>
        </div>
        -->
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
  background: linear-gradient(180deg, #f8fbfb 0%, #fdfcf9 100%);
  padding: clamp(1rem, 5vw, 3rem) 0;
  border-radius: 20px;
  overflow: hidden;
  transition: background 0.4s ease;
}

.welcome-section:focus-visible {
  outline: 2px solid #0b806f;
  outline-offset: 4px;
}

.companion-hero {
  background: linear-gradient(145deg, #f7fbf9 0%, #fefdfb 100%);
  border: 1px solid rgba(11, 128, 111, 0.15);
  border-radius: 32px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3rem);
  box-shadow: 
    0 24px 60px rgba(15, 23, 42, 0.06),
    0 1px 3px rgba(11, 128, 111, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.companion-hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(11, 128, 111, 0.04), transparent 50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.companion-hero.animate-in::before {
  opacity: 1;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(2rem, 2vw, 2.5rem);
  position: relative;
  z-index: 1;
  width: 100%;
}

.hero-text {
  text-align: left;
  max-width: 640px;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.hero-text h1 {
  margin: 0 0 0.5rem;
  font-size: clamp(2.6rem, 5.5vw, 3rem);
  line-height: 1.2;
  color: #0f172a;
}

:deep(.hero-title) {
  color: #0b806f;
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  font-weight: 600;
  margin: 0.75rem 0 1.25rem;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #0b806f, #1a5f7a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-copy {
  color: #374151;
  font-size: clamp(1.05rem, 2.5vw, 1.15rem);
  line-height: 1.75;
  margin: 0;
  font-weight: 400;
}

/* Visual Rings */
.hero-visual {
  position: relative;
  width: 300px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 8px 20px rgba(11, 128, 111, 0.1));
}

.hero-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(11, 128, 111, 0.28);
  box-shadow: 
    0 12px 30px rgba(11, 128, 111, 0.12),
    inset 0 1px 2px rgba(255, 255, 255, 0.6);
  animation: heroPulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  opacity: 0.9;
}

.ring-1 { width: 92%; height: 92%; animation-delay: 0s; }
.ring-2 { width: 72%; height: 72%; animation-delay: 1.8s; }
.ring-3 { 
  width: 52%; height: 52%; 
  animation-delay: 3.6s;
  background: radial-gradient(circle, rgba(11, 128, 111, 0.12), transparent 70%);
  border: none;
}

.hero-center-glow {
  position: absolute;
  width: 28%;
  height: 28%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(11, 128, 111, 0.25), transparent 60%);
  filter: blur(12px);
  animation: gentleGlow 6s ease-in-out infinite;
}

/* Animations */
@keyframes heroPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.06);
    opacity: 0.55;
  }
}

@keyframes gentleGlow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.1); }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Overrides - Only needed for desktop behavior */
@media (max-width: 991px) {
  .companion-hero {
    padding: clamp(1.5rem, 4vw, 2.5rem);
  }
}

@media (max-width: 576px) {
  .companion-hero {
    border-radius: 24px;
    padding: clamp(1.5rem, 4vw, 2rem);
  }
}

/* Accessibility */
.sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem;
  margin: 0.5rem 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  background: #e6f4f1;
  border-radius: 8px;
  color: #0b806f;
}
</style>

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
  background: linear-gradient(180deg, #f8fbfb 0%, #fdfcf9 100%);
  padding: clamp(1rem, 5vw, 3rem) 0;
  border-radius: 20px;
  overflow: hidden;
  transition: background 0.4s ease;
}

.welcome-section:focus-visible {
  outline: 2px solid #0b806f;
  outline-offset: 4px;
}

.companion-hero {
  background: linear-gradient(145deg, #f7fbf9 0%, #fefdfb 100%);
  border: 1px solid rgba(11, 128, 111, 0.15);
  border-radius: 32px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3rem);
  box-shadow: 
    0 24px 60px rgba(15, 23, 42, 0.06),
    0 1px 3px rgba(11, 128, 111, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.companion-hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(11, 128, 111, 0.04), transparent 50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.companion-hero.animate-in::before {
  opacity: 1;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(2rem, 2vw, 2.5rem);
  position: relative;
  z-index: 1;
}

.hero-text {
  text-align: left;
  max-width: 640px;
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.hero-text h1 {
  margin: 0 0 0.5rem;
  font-size: clamp(2.6rem, 5.5vw, 3rem);
  line-height: 1.2;
  color: #0f172a;
}

:deep(.hero-title) {
  color: #0b806f;
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  font-weight: 600;
  margin: 0.75rem 0 1.25rem;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #0b806f, #1a5f7a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-copy {
  color: #374151;
  font-size: clamp(1.05rem, 2.5vw, 1.15rem);
  line-height: 1.75;
  margin: 0;
  font-weight: 400;
}

/* Visual Rings */
.hero-visual {
  position: relative;
  width: 300px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 8px 20px rgba(11, 128, 111, 0.1));
}

.hero-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid rgba(11, 128, 111, 0.28);
  box-shadow: 
    0 12px 30px rgba(11, 128, 111, 0.12),
    inset 0 1px 2px rgba(255, 255, 255, 0.6);
  animation: heroPulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  opacity: 0.9;
}

.ring-1 { width: 92%; height: 92%; animation-delay: 0s; }
.ring-2 { width: 72%; height: 72%; animation-delay: 1.8s; }
.ring-3 { 
  width: 52%; height: 52%; 
  animation-delay: 3.6s;
  background: radial-gradient(circle, rgba(11, 128, 111, 0.12), transparent 70%);
  border: none;
}

.hero-center-glow {
  position: absolute;
  width: 28%;
  height: 28%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(11, 128, 111, 0.25), transparent 60%);
  filter: blur(12px);
  animation: gentleGlow 6s ease-in-out infinite;
}

/* Animations */
@keyframes heroPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.06);
    opacity: 0.55;
  }
}

@keyframes gentleGlow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.1); }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 991px) {
  .hero-inner {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .hero-text {
    text-align: center;
    max-width: 100%;
  }

  .hero-text h1 {
    text-align: center;
  }

  .hero-visual {
    width: 240px;
  }
}

@media (max-width: 576px) {
  /* .companion-hero {
    border-radius: 24px;
    padding: clamp(1.5rem, 4vw, 2rem);
  }

  .hero-copy {
    font-size: 1rem;
  }

  .hero-visual {
    width: 200px;
  } */
}

/* Accessibility */
.sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem;
  margin: 0.5rem 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  background: #e6f4f1;
  border-radius: 8px;
  color: #0b806f;
}
</style>