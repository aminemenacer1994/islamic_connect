<template>
  <div id="app">
    <div class="container-fluid px-4 px-lg-5 py-5">
      <div class="resources-inner mx-auto">
        <div class="row justify-content-center text-center mb-3">
          <div class="col-xl-10">
            <h1 class="display-5 fw-bold heading">Islamic Resources</h1>
            <p class="lead subhead">
              Below is a clean, structured, and verified list of trusted resources for each category: Mobile Apps, Websites, and Books/Scriptures. All selections are widely used, scholarly reviewed, non-sectarian, and safe for general Muslim audiences.
            </p>
        
          </div>
        </div>
        <div class="resources-page">
          <div class="row g-4">
            <div
            class="col-md-6"
            v-for="card in cards"
            :key="card.title"
          >
            <div class="resource-card">
              <div class="resource-card__header">
                <div class="resource-card__icon">
                  <i :class="card.icon"></i>
                </div>
                <div>
                  <h3 class="resource-card__title">{{ card.title }}</h3>
                  <p class="resource-card__description mb-2">
                    {{ card.description }}
                  </p>
                  <div class="resource-card__meta">
                    <span>{{ card.items.length }} verified sources</span>
                    <span class="divider"></span>
                    <span>Scholarly &amp; non-sectarian</span>
                  </div>
                </div>
              </div>
              <ul class="list-group list-group-flush mt-4">
                <li
                  class="list-group-item resource-list-item"
                  v-for="(item, index) in card.items"
                  :key="`${card.title}-${index}`"
                >
                  <div class="resource-list-item__content">
                    <div>
                      <div class="resource-list-item__title">{{ item.title }}</div>
                      <p class="resource-list-item__description mb-1">{{ item.description }}</p>
                      <p class="resource-list-item__features mb-0">
                        {{ item.features.join(' • ') }}
                      </p>
                    </div>
                  </div>
                  <div class="resource-list-item__actions">
                    <a
                      class="btn btn-sm btn-outline-primary"
                      :href="item.link"
                      target="_blank"
                      rel="noopener"
                    >
                      Visit resource
                    </a>
                    <button
                      type="button"
                      class="btn btn-sm btn-primary"
                      @click="openModal(item, card.title)"
                    >
                      Details
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
      v-if="modalItem"
      class="modal-overlay"
      @keydown.esc="closeModal"
      tabindex="-1"
    >
      <div class="modal-card" role="dialog" aria-modal="true">
        <header class="modal-card__header">
          <div>
            <div class="modal-card__tag">Verified resource</div>
            <h4 class="modal-card__title">{{ modalItem.title }}</h4>
          </div>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </header>
        <section class="modal-card__section">
          <p class="modal-card__description">{{ modalItem.description }}</p>
          <!-- <p class="modal-card__category">Category: {{ modalCategory || 'General Islamic' }}</p> -->
          <p class="modal-card__note">
            These entries are selected for their scholarly grounding, community trust, and ease of access across devices.
          </p>
        </section>
        <section class="modal-card__section modal-card__section--features">
          <h5>Key highlights</h5>
          <ul class="modal-card__features">
            <li v-for="(feature, index) in modalItem.features" :key="index">{{ feature }}</li>
          </ul>
        </section>
        <!-- <p class="modal-card__link">
          Link:
          <a :href="modalItem.link" target="_blank" rel="noopener">{{ modalItem.link }}</a>
        </p> -->
        <div class="modal-card__footer">
          <a
            class="btn btn-sm btn-primary modal-card__cta"
            :href="modalItem.link"
            target="_blank"
            rel="noopener"
          >
            Open link
          </a>
        </div>
      </div>
    </div>
  
</template>
<script>
export default {
  name: 'ResourcesComponent',
  data() {
    return {
      cards: [
        {
          title: 'Mobile Apps',
          description: 'Portable companions for daily worship reminders, dua, and Quranic guidance.',
          icon: 'fas fa-mobile-alt',
          items: [
            {
              title: 'Quran by Quran.com',
              description: 'The most trusted Qur’an app globally. Open-source, ad-free, and academically reviewed.',
              features: ['Arabic, translations, tafsir, audio', 'Word-by-word analysis'],
              link: 'https://quran.com/apps',
            },
            {
              title: 'Muslim Pro',
              description: 'Comprehensive daily Islamic companion.',
              features: ['Prayer times (location-based)', 'Qur’an, Qibla, Duas, Hijri calendar'],
              link: 'https://www.muslimpro.com',
            },
            {
              title: 'Athan (by IslamicFinder)',
              description: 'Accurate prayer times powered by IslamicFinder’s long-standing calculations.',
              features: ['Athan alerts', 'Qibla finder', 'Mosque locator'],
              link: 'https://www.islamicfinder.org/athan/',
            },
            {
              title: 'Hisnul Muslim (Fortress of the Muslim)',
              description: 'Authentic daily duas compiled from Qur’an and Sahih hadith.',
              features: ['Simple', 'Offline', 'Referenced sources'],
              link: 'https://play.google.com/store/apps/details?id=com.admads.android.HisnulMuslim',
            },
            {
              title: 'Hadith Collection (Greentech Apps)',
              description: 'Large collection of authentic hadith books.',
              features: ['Sahih Bukhari & Muslim', 'Grading included', 'Arabic & English'],
              link: 'https://play.google.com/store/apps/details?id=com.greentech.hadith',
            },
            {
              title: 'Muslim Central',
              description: 'One-stop hub for authentic lectures, podcasts, and dua reminders.',
              features: ['Hundreds of Islamic podcasts', 'Downloadable lectures', 'Daily reminders'],
              link: 'https://muslimcentral.com',
            },
          ],
        },
        {
          title: 'Websites',
          description: 'Digital portals that stream Quranic lessons, dua collections, and guided reflections.',
          icon: 'fas fa-globe',
          items: [
            {
              title: 'Quran.com',
              description: 'Gold standard Qur’an website.',
              features: ['Verified translations', 'Tafsir (Ibn Kathir, Tabari, etc.)', 'Audio recitations'],
              link: 'https://quran.com',
            },
            {
              title: 'Sunnah.com',
              description: 'Most trusted hadith website online.',
              features: ['Sahih collections', 'Clear grading', 'Scholarly references'],
              link: 'https://sunnah.com',
            },
            {
              title: 'SeekersGuidance',
              description: 'Traditional Islamic education platform.',
              features: ['Free courses', 'Fatwas', 'All four Sunni madhhabs'],
              link: 'https://seekersguidance.org',
            },
            {
              title: 'IslamQA (info-based)',
              description: 'Extensive fatwa archive with evidence.',
              features: ['Qur’an & Sunnah references', 'Clear sourcing'],
              link: 'https://islamqa.info',
            },
            {
              title: 'IslamicFinder',
              description: 'One of the oldest and most reliable Islamic portals.',
              features: ['Prayer times', 'Hijri calendar', 'Articles & tools'],
              link: 'https://www.islamicfinder.org',
            },
            {
              title: 'Al-Islam.org',
              description: 'Comprehensive library built for seekers of Islamic knowledge.',
              features: ['Scholarly articles', 'Historical sources', 'Spiritual reflections'],
              link: 'https://www.al-islam.org',
            },
          ],
        },
        {
          title: 'Books',
          description: 'Canonical hadith compilations and practical guides for character, worship, and ethics.',
          icon: 'fas fa-book',
          items: [
            {
              title: 'Sahih al-Bukhari',
              description: 'The most authentic hadith collection in Islam.',
              features: ['Author: Imam al-Bukhari', 'Rigorous authentication'],
              link: 'https://sunnah.com/bukhari',
            },
            {
              title: 'Sahih Muslim',
              description: 'Second most authentic hadith collection.',
              features: ['Author: Imam Muslim', 'Complementary to Bukhari'],
              link: 'https://sunnah.com/muslim',
            },
            {
              title: 'Riyad as-Salihin',
              description: 'Practical hadith on manners, worship, and character.',
              features: ['Author: Imam an-Nawawi', 'Daily etiquettes'],
              link: 'https://sunnah.com/riyadussalihin',
            },
            {
              title: 'Al-Muwatta',
              description: 'Early hadith+fiqh digest from Imam Malik.',
              features: ['Madinan jurisprudence', 'Authentic chains'],
              link: 'https://sunnah.com/malik',
            },
            {
              title: '40 Hadith Nawawi',
              description: 'Concise collection of prophetic teachings on creed and manners.',
              features: ['Imam Nawawi', 'Focused on ethics'],
              link: 'https://sunnah.com/nawawi40',
            },
            {
              title: 'Purification of the Heart',
              description: 'Imam al-Mawlud explains the diseases of the heart and how to cleanse them.',
              features: ['Practical steps', 'Rooted in hadith', 'English commentary available'],
              link: 'https://www.goodreads.com/book/show/129893.Purification_of_the_Heart',
            },
          ],
        },
        {
          title: 'Scriptures',
          description: 'Core Qur’anic and tafsir references that pair translation with scholarly context.',
          icon: 'fas fa-scroll',
          items: [
            {
              title: 'The Qur’an (Al-Qur’an al-Kareem)',
              description: 'The preserved word of Allah, final revelation to mankind.',
              features: ['Divine scripture', 'Parallel translations'],
              link: 'https://quran.com',
            },
            {
              title: 'Tafsir Ibn Kathir',
              description: 'Classical Sunni tafsir quoting the Qur’an and authentic hadith.',
              features: ['Ibn Kathir', 'Footnoted references', 'Accessible translation'],
              link: 'https://quran.com/tafseer/ibn-kathir',
            },
            {
              title: 'Tafsir As-Sa’dī',
              description: 'Concise tafsir emphasizing mercy, guidance, and moral clarity.',
              features: ['Abdul-Rahman as-Sa’dī', 'Simple Arabic & English'],
              link: 'https://quran.com/tafseer/as-sadi',
            },
            {
              title: 'Tafsir Al-Jalalayn',
              description: 'Popular dual tafsir by Jalal ad-Din al-Mahalli and al-Suyuti.',
              features: ['Classical commentary', 'Concise explanations'],
              link: 'https://islamicstudies.info/tafseer/Al-Jalalayn',
            },
            {
              title: 'Mushaf Madinah (King Fahd)',
              description: 'Standard Arabic Quranic mushaf with vowels, borders, and summaries.',
              features: ['Uthmani script', 'Khat El-Madina', 'Verse indexes'],
              link: 'https://qurancomplex.gov.sa',
            },
            {
              title: 'Tafsir Al-Muyassar',
              description: 'Modern accessible tafsir offered by the Saudi Ministry of Islamic Affairs.',
              features: ['Clear Arabic & English', 'Summaries per verse'],
              link: 'https://qurancomplex.gov.sa/en/tafseer',
            },
          ],
        },
      ],
      modalItem: null,
      modalCategory: '',
    };
  },
  methods: {
    openModal(item, category = '') {
      this.modalItem = item;
      this.modalCategory = category;
    },
    closeModal() {
      this.modalItem = null;
      this.modalCategory = '';
    },
  },
};
</script>
<style scoped>
.heading {
  color: #0b1320;
  letter-spacing: -0.02em;
}



.resources-page {
  padding-bottom: 2rem;
}

.resources-inner {
  width: 100%;
  max-width: 1320px;
}

.resource-card {
  padding: 1.5rem;
  border-radius: 1.75rem;
  background: #fff;
  border: 1px solid rgba(15, 19, 32, 0.08);
  box-shadow: 0 20px 35px rgba(15, 19, 32, 0.12);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.resource-card__header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.resource-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: #eff2ff;
  display: grid;
  place-items: center;
  font-size: 1.25rem;
  color: #020617;
}

.resource-card__title {
  font-size: 1.35rem;
  font-weight: 600;
  color: #121020;
}

.resource-card__description {
  color: #4f566b;
  font-size: 0.95rem;
}

.resource-card__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #5a5e75;
}

.resource-card__meta .divider {
  width: 1px;
  height: 16px;
  background: rgba(15, 19, 32, 0.2);
}

.resource-card__cta {
  width: max-content;
  border-radius: 999px;
  border-width: 1px;
  padding: 0.45rem 1.5rem;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: linear-gradient(130deg, #0d0d0d, #3a3a3a);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.45);
  font-size: 0.9rem;
}

.resource-card__cta:hover,
.resource-card__cta:focus {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(15, 19, 32, 0.2);
}

.list-group {
  margin-top: 1.5rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(240px, 1fr));
  gap: 1rem;
}

.resource-list-item {
  border: none;
  background: #f6f7fb;
  border-radius: 1rem;
  box-shadow: inset 0 0 0 1px rgba(15, 19, 32, 0.04);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.resource-list-item:last-child {
  margin-bottom: 0;
}

.resource-list-item__content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.resource-list-item__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #121020;
}

.resource-list-item__description {
  color: #4f566b;
  margin: 0;
  font-size: 0.9rem;
}

.resource-list-item__features {
  color: #5c6279;
  font-size: 0.85rem;
  margin: 0;
}

.resource-list-item__actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.resource-list-item__actions .btn {
  border-radius: 8px;
  font-weight: 600;
}

.resource-list-item__actions .btn-outline-primary {
  border-color: rgba(0, 0, 0, 0.35);
  color: #111;
  background: rgba(255, 255, 255, 0.95);
}

.resource-list-item__actions .btn-primary {
  background: linear-gradient(130deg, #0d0d0d, #3a3a3a);
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.resource-list-item__actions .btn-outline-primary:hover,
.resource-list-item__actions .btn-outline-primary:focus {
  background: #111;
  color: #fff;
  border-color: transparent;
}

.resource-list-item__actions .btn-primary:hover,
.resource-list-item__actions .btn-primary:focus {
  transform: translateY(-1px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
}

@media (max-width: 991.98px) {
  .resource-card .list-group {
    grid-template-columns: 1fr;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 19, 32, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.modal-card {
  background: #fff;
  width: min(680px, 95vw);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 40px 80px rgba(15, 19, 32, 0.25);
  max-width: 640px;
}

.modal-card__section {
  margin-top: 0.85rem;
}

.modal-card__section h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #0b1320;
}

.modal-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.modal-card__tag {
  text-transform: uppercase;
  font-size: 0.65rem;
  letter-spacing: 0.3rem;
  color: #7a7d95;
  margin-bottom: 0.25rem;
}

.modal-card__title {
  margin: 0;
  font-size: 1.5rem;
  color: #0b1320;
}

.modal-card__description {
  color: #353849;
  margin-top: 1rem;
  line-height: 1.6;
}

.modal-card__features {
  padding-left: 1rem;
  color: #4f566b;
  margin-top: 1rem;
  line-height: 1.5;
}

.modal-card__category {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.25rem;
  color: #7a7d95;
  margin-top: 0.5rem;
}

.modal-card__note {
  margin-top: 0.75rem;
  color: #5c6279;
  font-size: 0.9rem;
  line-height: 1.4;
}

.modal-card__link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #062a78;
}

.modal-card__link a {
  color: inherit;
  text-decoration: underline;
}

.modal-card__footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.modal-card__cta {
  padding: 0.35rem 1.35rem;
  font-size: 0.85rem;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
  background: #000;
  color: #fff;
  border: none;
}
</style>
