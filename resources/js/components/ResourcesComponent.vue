<template>
  <div id="app">
    <div class="container py-5">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-10 col-xl-10">
          <h1 class="display-5 mb-3 fw-bold heading">Islamic Resources</h1>
          <p class="lead subhead">
            A curated library of Islamic tools such as: websites, mobile apps, books, and scriptures that nurture tafsir study, dua, and spiritual reflection of islam.
          </p>
        </div>
      </div>
      <div class="resources-page">
        <div class="row g-4">
          <div
            class="col-md-6"
            v-for="resource in resources"
            :key="resource.title"
          >
            <div class="resource-card">
              <div class="resource-card__header">
                <div class="resource-card__icon">
                  <i :class="resource.icon"></i>
                </div>
                <h2 class="resource-card__title">{{ resource.title }}</h2>
              </div>
              <p class="resource-card__body">{{ resource.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResourcesComponent',
  data() {
    return {
      resources: [
        {
          title: 'Websites',
          description:
            'Curated Islamic knowledge hubs, live series, and multimedia reminders for every stage of faith.',
          icon: 'fas fa-globe',
        },
        {
          title: 'Mobile App',
          description:
            'Prayer trackers, daily dua prompts, and Qurʾan reflections that travel with you on your phone.',
          icon: 'fas fa-mobile',
        },
        {
          title: 'Books',
          description:
            'Classics and contemporary reads that explain belief, manners, and the beauty of Islamic scholarship.',
          icon: 'fas fa-book-open',
        },
        {
          title: 'Scriptures',
          description:
            'Translations, transliterations, and tafsir excerpts that illuminate the Qurʾan and authentic hadith.',
          icon: 'fas fa-scroll',
        },
      ],
    };
  },
};
</script>
<style scoped>
.resources-page {
  padding-bottom: 2rem;
}

.heading {
  color: #0b1320;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
}

.subhead {
  color: #475569;
  max-width: 920px;
  margin: 0 auto;
}

.resource-card {
  width: min(720px, 100%);
  padding: 1rem 1.25rem 1.75rem;
  border-radius: 1.5rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8f8fb 100%);
  box-shadow: 0 20px 35px rgba(76, 95, 138, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.resource-card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.resource-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #f4f4ff;
  display: grid;
  place-items: center;
  font-size: 1.35rem;
  color: #000;
}

.resource-card__title {
  flex: 1;
  margin: 0;
  font-size: 1.65rem;
  font-weight: 600;
  color: #121020;
}

.resource-card__body {
  margin: 0;
  padding: 1rem 1.25rem;
  border-radius: 1.25rem;
  background: #fff;
  line-height: 1.6;
  color: #4a4a5a;
  font-size: 1rem;
  box-shadow: inset 0 0 0 1px rgba(17, 24, 39, 0.08);
}
</style>
