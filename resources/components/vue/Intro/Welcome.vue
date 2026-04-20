<template>
  <section
    v-if="!information"
    aria-labelledby="welcome-heading"
    class="welcome-section"
    role="tabpanel"
    tabindex="0">
    <div class="container">
      <section
        class="companion-hero container"
        aria-labelledby="companion-heading"
        :class="{ 'animate-in': !information }"
      >
        <div class="hero-inner d-none d-lg-flex">
          <div class="hero-text">
            <h1 class="fw-bold text-left">Quran Explorer</h1>
            <Title class="hero-title" />
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

.companion-hero {
  background: linear-gradient(145deg, #f7fbf9 0%, #fefdfb 100%);
  border: 1px solid rgba(11, 128, 111, 0.15);
  border-radius: 32px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 3rem);
  box-shadow: 0 24px 60px rgba(38, 41, 46, 0.06), 0 1px 3px rgba(11, 128, 111, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.hero-inner { display: flex; align-items: center; justify-content: space-between; gap: clamp(2rem, 2vw, 2.5rem); position: relative; z-index: 1; width: 100%; }
.hero-text { text-align: left; max-width: 640px; }
.hero-text h1 { margin: 0 0 0.5rem; font-size: clamp(2.6rem, 5.5vw, 3rem); line-height: 1.2; color: #0f172a; }
:deep(.hero-title) { color: #0b806f; font-size: clamp(1.8rem, 4vw, 2.2rem); font-weight: 600; margin: 0.75rem 0 1.25rem; }
.hero-copy { color: #334155; font-size: clamp(1.05rem, 2.1vw, 1.15rem); line-height: 1.65; margin: 0; }

.hero-visual { position: relative; width: clamp(380px, 40vw, 520px); height: clamp(280px, 34vw, 420px); display: grid; place-items: center; }
.hero-ring { position: absolute; border: 1px solid rgba(11, 128, 111, 0.15); border-radius: 50%; backdrop-filter: blur(1px); }
.ring-1 { width: 100%; height: 100%; animation: floatRing 10s ease-in-out infinite; }
.ring-2 { width: 70%; height: 70%; animation: floatRing 12s ease-in-out infinite reverse; }
.ring-3 { width: 40%; height: 40%; animation: floatRing 14s ease-in-out infinite; }
.hero-center-glow { position: absolute; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(11,128,111,0.25), rgba(11,128,111,0) 60%); filter: blur(12px); animation: gentleGlow 6s ease-in-out infinite; }

@keyframes floatRing { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.06) } }
@keyframes gentleGlow { 0%, 100% { opacity: 0.6; transform: scale(1) } 50% { opacity: 0.9; transform: scale(1.1) } }
</style>
