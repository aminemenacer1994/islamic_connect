<template>
  <section v-if="!information" aria-labelledby="welcome-heading" class="welcome-section" role="tabpanel">
    <div class="container">
      <div class="row align-items-start">
        <!-- Text column -->
        <div class="col-lg-7 order-lg-1 order-2 d-none d-lg-block">
          <div class="text-content mt-3 animated-slide-up">
            <p class="section-text" style="font-size: 1.3rem;">
              "Read in the name of your Lord who created." (Quran 96:1)<br>
              A sacred sanctuary for reflecting on the divine words of the Quran. This space fosters spiritual growth, uniting hearts in the pursuit of Allah’s guidance and wisdom, illuminating the path to righteousness through His eternal revelation.
            </p>
            <p class="section-text" style="font-size: 1.3rem;">
              Engage with the timeless verses that inspire patience, gratitude, and devotion, guiding souls toward tranquility and purpose. Let the Quran’s wisdom nurture your heart, as it calls to mindfulness and submission to the Creator’s will.
            </p>
          </div>
        </div>

        <!-- Image column - hidden on mobile and tablet -->
        <div class="col-lg-4 order-lg-2 order-1 d-none d-lg-block">
          <div class="image-container">
            <img src="images/calligraphy.png" alt="Quranic Calligraphy" class="img-fluid animated-fade-in" />
          </div>
        </div>
      </div>
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

<style>
:root {
  --primary-color: #009688;
  --light-grey: #f5f5f5;
  --text-color: #333;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.image-container {
  position: relative;
  padding: 2rem;
  margin-left: -2rem;
  background: transparent; 
}

.image-container img {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  transition: transform 0.5s ease;
  z-index: 2;
  position: relative;
  background: transparent; 
}

/* .quran-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
} */

.section-text {
  color: var(--text-color);
  font-size: 1.8rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.decorative-border {
  height: 4px;
  width: 100px;
  background: var(--primary-color);
  margin: 2rem auto 0;
  border-radius: 2px;
}

/* Animations */
.animated-fade-in {
  animation: fadeIn 1.5s ease-out;
}

.animated-slide-up {
  animation: slideUp 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 1199px) {
  .image-container {
    margin-left: 0;
    padding: 1.5rem;
  }
}

@media (max-width: 992px) {
  .welcome-section {
    min-height: auto;
    padding: 3rem 0;
  }

  .text-content {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .welcome-section {
    padding: 2rem 0;
  }

  .section-text {
    font-size: 1.6rem;
  }
}

@media (max-width: 576px) {
  .text-content {
    padding: 1.5rem;
  }

  .quran-icon {
    font-size: 2.5rem;
  }
}
</style>