<template>
  <section v-if="!information" aria-labelledby="welcome-heading" class="welcome-section" role="tabpanel">
    <div class="container">
      <div class="row align-items-center">
        <!-- Text column -->
        <div class="col-lg-8 order-lg-1 order-2">
          <div class="text-content animated-slide-up">
            <div class="quran-icon">
              <i class="fas fa-quran"></i>
            </div>
            <h2 id="welcome-heading" class="section-title text-center">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h2>
            <p class="section-text">
              "In the name of Allah, the Entirely Merciful, the Especially Merciful."<br>
              Welcome to Islamic Connect, a sanctuary of knowledge where hearts and minds unite in the pursuit of
              understanding.
              We illuminate the path to acceptance through divine wisdom, fostering a community where seekers of truth
              may grow together
              in your journey toward the light of Islam.
            </p>
          </div>
        </div>

        <!-- Image column - hidden on mobile -->
        <div class="col-lg-4 order-lg-2 order-1 d-none d-lg-block">
          <div >
            <img src="images/calligraphy.png" alt="Islamic Calligraphy" class="img-fluid animated-fade-in" />
            <div class="image-overlay"></div>
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
}

.image-container img {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: var(--shadow);
  transition: transform 0.5s ease;
  z-index: 2;
  position: relative;
}

/* .image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,150,136,0.1) 0%, rgba(255,255,255,0) 60%);
  border-radius: 8px;
  z-index: 1;
} */

/* .text-content {
  background-color: var(--light-grey);
  padding: 3rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  position: relative;
  z-index: 3;
  border-left: 4px solid var(--primary-color);
} */

.quran-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.section-title {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
}

.section-text {
  color: var(--text-color);
  font-size: 1.1rem;
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
  from { opacity: 0; }
  to { opacity: 1; }
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
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-text {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .text-content {
    padding: 1.5rem;
  }
  
  .quran-icon {
    font-size: 2rem;
  }
}
</style>