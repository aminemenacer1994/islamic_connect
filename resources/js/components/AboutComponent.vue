<!-- <template>
<section class="py-5">
 <div class="container">


  <div class="row gx-4 pt-3 align-items-center justify-content-between">
   <div class="col-md-6 order-1 ">
    <div class="mt-3 mt-md-0">
     <h2 class="display-5 fw-bold">Why I Built This Platform</h2>
     <p class="lead">I built Islamic Connect because I believe that knowledge is the key to understanding, and understanding is the foundation of acceptance. My goal was to create a welcoming, inclusive platform where people from all backgrounds could come together to learn and grow.</p>
     <p class="lead">I want you to feel empowered to explore Islam without fear or confusion. You deserve clarity and support on your journey, and that’s what we’re here for.</p>
    </div>
    <div class="mt-3 mt-md-0">
     <h2 class="display-5 fw-bold">Join Me in This Journey</h2>
     <p class="lead">Here’s where you come in. If you share my vision and passion for making Islamic knowledge accessible to all, I invite you to invest in Islamic Connect. Your support is crucial in helping us enhance our platform and reach more people who are eager to learn. Together, we can create a ripple effect of understanding and acceptance that transcends boundaries and enriches lives.</p>
    </div>
   </div>
   <div class="col-md-6 order-2 pb-3">
     <img src="/images/group.png" width="100%" loading="lazy">
    </div>
  </div>

 </div>
</section>
</template>
 -->

 <template>
  <div class="athkar-container container py-4">
    <h1 class="text-center mb-4">Daily Athkar</h1>
    
    <!-- Category Tabs -->
    <ul class="nav nav-tabs mb-4" id="athkarTabs" role="tablist">
      <li class="nav-item" v-for="(category, index) in categories" :key="category.id">
        <button 
          class="nav-link" 
          :class="{ 'active': activeTab === index }" 
          @click="activeTab = index"
        >
          {{ category.name }}
        </button>
      </li>
    </ul>
    
    <!-- Athkar Content -->
    <div class="tab-content">
      <div 
        v-for="(category, catIndex) in categories" 
        :key="category.id"
        class="tab-pane fade" 
        :class="{ 'show active': activeTab === catIndex }"
      >
        <div class="row">
          <div 
            v-for="(thikr, thikrIndex) in category.athkar" 
            :key="thikr.id"
            class="col-md-6 col-lg-4 mb-4"
          >
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title text-primary">{{ thikr.title }}</h5>
                <p class="card-text">{{ thikr.text }}</p>
                <p class="text-muted small mb-2" v-if="thikr.reference">{{ thikr.reference }}</p>
              </div>
              <div class="card-footer bg-transparent border-top-0">
                <div class="d-flex justify-content-between align-items-center">
                  <button 
                    class="btn btn-sm btn-outline-primary"
                    @click="incrementCount(catIndex, thikrIndex)"
                  >
                    <i class="bi bi-plus-circle"></i> Count
                  </button>
                  <span class="badge bg-secondary rounded-pill">
                    {{ thikr.count || 0 }}
                  </span>
                  <button 
                    class="btn btn-sm btn-outline-success"
                    @click="resetCount(catIndex, thikrIndex)"
                    v-if="thikr.count > 0"
                  >
                    <i class="bi bi-arrow-counterclockwise"></i> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AthkarList',
  data() {
    return {
      activeTab: 0,
      categories: [
        {
          id: 1,
          name: 'Morning',
          athkar: [
            {
              id: 101,
              title: 'Awakening',
              text: 'الحَمْـدُ لِلّهِ الّذي أَحْـيانا بَعْـدَ ما أَماتَـنا وَإليه النُّـشور.',
              reference: 'Al-Bukhari 1/152, Muslim 4/2083',
              count: 0
            },
            {
              id: 102,
              title: 'Entering the bathroom',
              text: 'اللّهُـمَّ إِنّـي أَعـوذُ بِـكَ مِـنَ الْخُـبْثِ وَالْخَبائِث.',
              reference: 'Al-Bukhari 1/45, Muslim 1/283',
              count: 0
            },
            {
              id: 103,
              title: 'After finishing from the bathroom',
              text: 'غُفْـرانَك.',
              reference: 'Abu Dawud 1/23, At-Tirmidhi 1/7',
              count: 0
            }
          ]
        },
        {
          id: 2,
          name: 'Evening',
          athkar: [
            {
              id: 201,
              title: 'Evening remembrance',
              text: 'أَمْسَيْـنا وَأَمْسـى المـلكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وَهوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَها ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذهِ اللَّـيْلَةِ وَشَرِّ ما بَعْـدَها، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر.',
              reference: 'Muslim 4/2088',
              count: 0
            },
            {
              id: 202,
              title: 'Surah Al-Ikhlas, Al-Falaq, An-Nas',
              text: 'قُلْ هُوَ اللَّهُ أَحَدٌ (3 times), قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (3 times), قُلْ أَعُوذُ بِرَبِّ النَّاسِ (3 times)',
              reference: 'Abu Dawud 4/322, At-Tirmidhi 5/142',
              count: 0
            }
          ]
        },
        {
          id: 3,
          name: 'Prayer',
          athkar: [
            {
              id: 301,
              title: 'Before starting prayer',
              text: 'اللهُ أَكْبَر',
              count: 0
            },
            {
              id: 302,
              title: 'Ruku',
              text: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
              count: 0
            },
            {
              id: 303,
              title: 'Sujood',
              text: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
              count: 0
            },
            {
              id: 304,
              title: 'Tashahhud',
              text: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ',
              count: 0
            }
          ]
        },
        {
          id: 4,
          name: 'General',
          athkar: [
            {
              id: 401,
              title: 'Before eating',
              text: 'بِسْمِ اللَّهِ',
              reference: 'Al-Bukhari 7/88, Muslim 2/207',
              count: 0
            },
            {
              id: 402,
              title: 'After eating',
              text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
              reference: 'Abu Dawud 4/80, At-Tirmidhi 5/185',
              count: 0
            },
            {
              id: 403,
              title: 'Entering the home',
              text: 'بِسْـمِ اللهِ وَلَجْنـا، وَبِسْـمِ اللهِ خَـرَجْنـا، وَعَلـى رَبِّنـا تَوَكّلْـنا.',
              reference: 'Abu Dawud 4/325',
              count: 0
            }
          ]
        }
      ]
    }
  },
  methods: {
    incrementCount(catIndex, thikrIndex) {
      if (!this.categories[catIndex].athkar[thikrIndex].count) {
        this.$set(this.categories[catIndex].athkar[thikrIndex], 'count', 0);
      }
      this.categories[catIndex].athkar[thikrIndex].count++;
    },
    resetCount(catIndex, thikrIndex) {
      this.categories[catIndex].athkar[thikrIndex].count = 0;
    }
  }
}
</script>

<style scoped>
.athkar-container {
  max-width: 1200px;
  margin: 0 auto;
}

.nav-tabs {
  border-bottom: 2px solid #dee2e6;
}

.nav-tabs .nav-link {
  color: #495057;
  font-weight: 500;
  border: none;
  padding: 0.75rem 1.5rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem 0.25rem 0 0;
  transition: all 0.3s ease;
}

.nav-tabs .nav-link:hover {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.1);
}

.nav-tabs .nav-link.active {
  color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.1);
  border-bottom: 2px solid #0d6efd;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 0.5rem;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: 600;
}

.card-text {
  line-height: 1.8;
  margin-bottom: 1rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.badge {
  font-size: 0.875rem;
  padding: 0.35em 0.65em;
}

@media (max-width: 767.98px) {
  .nav-tabs .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .card-text {
    font-size: 0.9rem;
  }
}
</style>
