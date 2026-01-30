<template>
  <div class="ramadan-2026">
    <header class="r-hero" id="top">
      <div class="r-hero__backdrop"></div>
      <div class="container">
        <div class="r-hero__grid">
          <div class="r-hero__content">
            <p class="r-hero__eyebrow r-animate" style="--delay: 0.05s;">{{ ramadan.page_title }}</p>
            <h1 class="r-hero__title r-animate" style="--delay: 0.12s;">{{ ramadan.header.title }}</h1>
            <p class="r-hero__subtitle r-animate" style="--delay: 0.18s;">{{ ramadan.header.subtitle }}</p>
            <p class="r-hero__lead r-animate" style="--delay: 0.24s;">{{ ramadan.meta_description }}</p>

            <div class="r-hero__stats r-animate" style="--delay: 0.3s;">
              <div class="r-hero__card">
                <span class="r-hero__label">{{ ramadan.header.stats.last_updated_label }}</span>
                <strong>{{ formatISODate(ramadan.last_updated) }}</strong>
              </div>
              <div class="r-hero__card">
                <span class="r-hero__label">{{ ramadan.header.stats.data_sources_label }}</span>
                <strong>{{ ramadan.data_source }}</strong>
              </div>
            </div>

            <nav class="r-hero__nav r-animate" style="--delay: 0.36s;">
              <a v-for="link in ramadan.nav_links" :key="link.href" class="r-hero__pill" :href="link.href">
                {{ link.label }}
              </a>
            </nav>
          </div>

          <div class="r-hero__media r-animate" style="--delay: 0.22s;">
            <div class="r-hero__frame">
              <picture v-if="heroImage">
                <source :srcset="heroImageSrcset.avif" type="image/avif" />
                <source :srcset="heroImageSrcset.webp" type="image/webp" />
                <img
                  :src="heroImage"
                  :alt="ramadan.header.alt_text"
                  class="r-hero__image"
                  loading="lazy"
                  @error="handleHeroImageError"
                />
              </picture>
              <div class="r-hero__glow"></div>
            </div>
            <div class="r-hero__note">{{ ramadan.important_dates.note }}</div>
          </div>
        </div>
      </div>
    </header>

    <section id="overview" class="r-section">
      <div class="container">
        <div class="r-section__head r-overview__head">
          <h2 class="r-section__title">{{ ramadan.overview.section_title }}</h2>
          <p class="r-overview__lead">{{ ramadan.overview.subtitle }}</p>
          <p v-for="(para, index) in ramadan.overview.body" :key="index" class="r-overview__body">
            {{ para }}
          </p>
        </div>
        <h3 class="r-section__subtitle">{{ ramadan.overview.key_points_title }}</h3>
        <ul class="r-overview__list">
          <li v-for="item in ramadan.overview.key_points" :key="item">{{ item }}</li>
        </ul>
        <div class="r-video-grid r-video-grid--wide">
          <div v-for="video in ramadan.overview.videos" :key="video.link" class="r-video-card">
            <h4>{{ video.title }}</h4>
            <p>{{ video.description }}</p>
            <a class="r-link" :href="video.link" target="_blank" rel="noopener">
              {{ ramadan.labels.open_video }}
            </a>
          </div>
        </div>
        <div class="r-references" v-if="ramadan.overview.references">
          <h4>{{ ramadan.labels.references }}</h4>
          <ul>
            <li v-for="ref in ramadan.overview.references" :key="ref.citation">
              <span>{{ ref.source }} — {{ ref.citation }}</span>
              <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="history" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.history.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.history.subtitle }}</p>
          <p v-for="(para, index) in ramadan.history.body" :key="index" class="r-section__subtitle">
            {{ para }}
          </p>
        </div>
        <div class="r-grid r-grid--double">
          <article v-for="item in ramadan.history.timeline" :key="item.period" class="r-card">
            <h3 class="r-card__title">{{ item.period }}</h3>
            <p class="r-card__desc">{{ item.detail }}</p>
          </article>
        </div>
        <div class="r-references" v-if="ramadan.history.references">
          <h4>{{ ramadan.labels.references }}</h4>
          <ul>
            <li v-for="ref in ramadan.history.references" :key="ref.citation">
              <span>{{ ref.source }} — {{ ref.citation }}</span>
              <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="key-dates" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.important_dates.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.important_dates.subtitle }}</p>
        </div>
        <div class="r-grid r-grid--dates">
          <article v-for="date in ramadan.important_dates.dates" :key="date.event" class="r-card r-card--date">
            <div class="r-card__tag" :class="`r-card__tag--${date.type}`">{{ date.event }}</div>
            <h3 class="r-card__title">{{ date.gregorian_date }}</h3>
            <p class="r-card__meta">{{ date.hijri_date }}</p>
            <p class="r-card__desc">{{ date.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="how-to-fast" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.how_to_fast.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.how_to_fast.intro }}</p>
        </div>
        <div class="r-grid r-grid--triple">
          <article v-for="card in ramadan.how_to_fast.cards" :key="card.title" class="r-card">
            <h3 class="r-card__title">{{ card.title }}</h3>
            <ul class="r-list">
              <li v-for="item in card.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
        <div class="r-references" v-if="ramadan.how_to_fast.references">
          <h4>{{ ramadan.labels.references }}</h4>
          <ul>
            <li v-for="ref in ramadan.how_to_fast.references" :key="ref.citation">
              <span>{{ ref.source }} — {{ ref.citation }}</span>
              <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="prayers" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.prayers_made_easy.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.prayers_made_easy.intro }}</p>
        </div>
        <div class="r-grid r-grid--double">
          <article class="r-card">
            <h3 class="r-card__title">{{ ramadan.prayers_made_easy.daily_prayers_title }}</h3>
            <div class="r-prayer-list">
              <div v-for="prayer in ramadan.prayers_made_easy.daily_prayers" :key="prayer.name" class="r-prayer-item">
                <div>
                  <h4>{{ prayer.name }} <span class="r-chip">{{ prayer.rakaat }} rakaat</span></h4>
                  <p>{{ prayer.time_window }} — {{ prayer.focus }}</p>
                </div>
              </div>
            </div>
            <ul class="r-list r-spacing-top">
              <li v-for="tip in ramadan.prayers_made_easy.daily_prayer_tips" :key="tip">{{ tip }}</li>
            </ul>
          </article>
          <article class="r-card">
            <h3 class="r-card__title">{{ ramadan.prayers_made_easy.taraweeh.title }}</h3>
            <p class="r-card__desc">{{ ramadan.prayers_made_easy.taraweeh.description }}</p>
            <ul class="r-list">
              <li v-for="tip in ramadan.prayers_made_easy.taraweeh.tips" :key="tip">{{ tip }}</li>
            </ul>
            <h4 class="r-card__title r-card__title--small">{{ ramadan.prayers_made_easy.taraweeh.checklist_title }}</h4>
            <ul class="r-list">
              <li v-for="item in ramadan.prayers_made_easy.taraweeh.checklist" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
        <div class="r-references" v-if="ramadan.prayers_made_easy.references">
          <h4>{{ ramadan.labels.references }}</h4>
          <ul>
            <li v-for="ref in ramadan.prayers_made_easy.references" :key="ref.citation">
              <span>{{ ref.source }} — {{ ref.citation }}</span>
              <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="quran-plans" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.quran_reading_plans.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.quran_reading_plans.intro }}</p>
        </div>
        <div class="r-grid r-grid--triple">
          <article v-for="plan in ramadan.quran_reading_plans.plans" :key="plan.level" class="r-card">
            <h3 class="r-card__title">{{ plan.level }}</h3>
            <p class="r-card__desc">Daily target: {{ plan.daily_target }}</p>
            <ul class="r-list">
              <li>Time needed: {{ plan.time_needed }}</li>
              <li>Structure: {{ plan.structure }}</li>
              <li>Goal: {{ plan.goal }}</li>
              <li>Split: {{ plan.split }}</li>
            </ul>
            <ul class="r-list r-spacing-top">
              <li v-for="tip in plan.tips" :key="tip">{{ tip }}</li>
            </ul>
          </article>
        </div>
        <div class="r-references" v-if="ramadan.quran_reading_plans.references">
          <h4>{{ ramadan.labels.references }}</h4>
          <ul>
            <li v-for="ref in ramadan.quran_reading_plans.references" :key="ref.citation">
              <span>{{ ref.source }} — {{ ref.citation }}</span>
              <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="personal-plans" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.personal_plans.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.personal_plans.intro }}</p>
        </div>
        <div class="r-grid r-grid--double">
          <article v-for="plan in ramadan.personal_plans.plans" :key="plan.title" class="r-card">
            <h3 class="r-card__title">{{ plan.title }}</h3>
            <p class="r-card__desc">{{ plan.who_for }}</p>
            <p class="r-card__desc">{{ plan.overview }}</p>
            <p class="r-card__desc">{{ plan.focus }}</p>
            <div class="r-list-block">
              <h4>{{ ramadan.personal_plans.daily_flow_title }}</h4>
              <ul>
                <li v-for="item in plan.daily_flow" :key="item">{{ item }}</li>
              </ul>
            </div>
            <div class="r-list-block">
              <h4>{{ ramadan.personal_plans.weekly_focus_title }}</h4>
              <ul>
                <li v-for="item in plan.weekly_focus" :key="item">{{ item }}</li>
              </ul>
            </div>
            <p class="r-card__desc">{{ plan.accountability }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="charity" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.charity_guide.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.charity_guide.intro }}</p>
        </div>
        <div class="r-grid r-grid--double">
          <article class="r-card">
            <div class="r-charity-body">
              <p v-for="(para, index) in ramadan.charity_guide.overview" :key="index" class="r-card__desc">
                {{ para }}
              </p>
              <h3 class="r-card__title">{{ ramadan.charity_guide.zakat_al_fitr.title }}</h3>
              <ul class="r-list">
                <li v-for="point in ramadan.charity_guide.zakat_al_fitr.points" :key="point">{{ point }}</li>
              </ul>
            </div>
          </article>
          <article class="r-card">
            <h3 class="r-card__title">{{ ramadan.charity_guide.sadaqah_title }}</h3>
            <ul class="r-list">
              <li v-for="item in ramadan.charity_guide.sadaqah_ideas" :key="item">{{ item }}</li>
            </ul>
            <h4 class="r-card__title r-card__title--small">{{ ramadan.charity_guide.giving_checklist_title }}</h4>
            <ul class="r-list">
              <li v-for="item in ramadan.charity_guide.giving_checklist" :key="item">{{ item }}</li>
            </ul>
            <div class="r-note" v-for="note in ramadan.charity_guide.impact_notes" :key="note">{{ note }}</div>
          </article>
        </div>
        <div class="r-references" v-if="ramadan.charity_guide.references">
          <h4>{{ ramadan.labels.references }}</h4>
          <ul>
            <li v-for="ref in ramadan.charity_guide.references" :key="ref.citation">
              <span>{{ ref.source }} — {{ ref.citation }}</span>
              <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="health" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.health_food_tips.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.health_food_tips.intro }}</p>
        </div>
        <div class="r-grid r-grid--triple">
          <article v-for="section in ramadan.health_food_tips.primary_sections" :key="section.title" class="r-card">
            <h3 class="r-card__title">{{ section.title }}</h3>
            <ul class="r-list">
              <li v-for="item in section.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
        <div class="r-grid r-grid--double r-spacing-top">
          <article v-for="section in ramadan.health_food_tips.secondary_sections" :key="section.title" class="r-card">
            <h3 class="r-card__title">{{ section.title }}</h3>
            <ul class="r-list">
              <li v-for="item in section.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
        <div class="r-micro-tips">
          <span v-for="tip in ramadan.health_food_tips.micro_tips" :key="tip" class="r-chip">{{ tip }}</span>
        </div>
      </div>
    </section>

    <section id="duas" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.duas_prayers.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.duas_prayers.intro }}</p>
        </div>
        <div class="r-story-grid">
          <article
            v-for="dua in ramadan.duas_prayers.daily_duas"
            :key="dua.occasion"
            class="r-story-card r-story-card--dua"
            :style="storyStyle()"
          >
            <div class="r-story-content">
              <span class="r-story-tag">{{ ramadan.duas_prayers.tag_label }}</span>
              <h3 class="r-story-title">{{ dua.occasion }}</h3>
              <p class="r-arabic" dir="rtl">{{ dua.arabic }}</p>
              <p class="r-translit">{{ dua.transliteration }}</p>
              <p class="r-story-desc">{{ dua.translation }}</p>
              <span class="r-story-duration">{{ dua.reference }}</span>
            </div>
          </article>
        </div>
        <button
          class="r-link r-link--button"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#moreDuasModal"
        >
          {{ ramadan.duas_prayers.view_more_label }}
        </button>
      </div>
    </section>

    <section id="shorts" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.shorts.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.shorts.subtitle }}</p>
        </div>
        <div class="r-short-block">
          <h3 class="r-section__subtitle">{{ ramadan.shorts.highlights_title }}</h3>
          <div class="r-story-grid">
            <article
              v-for="item in ramadan.shorts.highlights"
              :key="item.link"
              class="r-story-card"
              :style="storyStyle(item.thumbnail)"
            >
              <div class="r-story-content">
                <span class="r-story-tag">{{ item.tag }}</span>
                <h3 class="r-story-title">{{ item.title }}</h3>
                <p class="r-story-desc">{{ item.description }}</p>
              <span class="r-story-duration">{{ ramadan.labels.duration_prefix }}: {{ item.duration }}</span>
                <a class="r-story-link" :href="item.link" target="_blank" rel="noopener">
                  {{ ramadan.labels.watch_short }}
                </a>
              </div>
            </article>
          </div>
        </div>
        <div class="r-short-block">
          <h3 class="r-section__subtitle">{{ ramadan.labels.explore_by_theme }}</h3>
          <div class="r-short-groups">
            <div v-for="group in ramadan.shorts.groups" :key="group.title" class="r-short-group">
              <h4 class="r-short-group__title">{{ group.title }}</h4>
              <div class="r-story-grid">
                <article
                  v-for="item in group.items"
                  :key="item.link"
                  class="r-story-card"
                  :style="storyStyle(item.thumbnail)"
                >
                  <div class="r-story-content">
                    <span class="r-story-tag">{{ item.tag }}</span>
                    <h3 class="r-story-title">{{ item.title }}</h3>
                    <p class="r-story-desc">{{ item.description }}</p>
                    <span class="r-story-duration">{{ ramadan.labels.duration_prefix }}: {{ item.duration }}</span>
                    <a class="r-story-link" :href="item.link" target="_blank" rel="noopener">
                      {{ ramadan.labels.watch_short }}
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="downloads" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.downloads_printables.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.downloads_printables.subtitle }}</p>
        </div>
        <div class="r-grid r-grid--triple">
          <article v-for="item in ramadan.downloads_printables.resources" :key="item.name" class="r-card r-card--download">
            <h3 class="r-card__title">{{ item.name }}</h3>
            <p class="r-card__desc">{{ item.description }}</p>
            <div class="r-download">
              <span class="r-chip">{{ item.file_size }}</span>
              <a :href="item.link" class="r-link">{{ ramadan.labels.download }}</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="platforms" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.platform_resources.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.platform_resources.subtitle }}</p>
        </div>
        <div class="r-grid r-grid--triple">
          <article v-for="card in ramadan.platform_resources.cards" :key="card.title" class="r-card">
            <h3 class="r-card__title">{{ card.title }}</h3>
            <ul class="r-list">
              <li v-for="item in card.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section id="tools" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">{{ ramadan.tools_calculators.section_title }}</h2>
          <p class="r-section__subtitle">{{ ramadan.tools_calculators.subtitle }}</p>
        </div>
        <div class="r-grid r-grid--triple">
          <article v-for="tool in ramadan.tools_calculators.tools" :key="tool.title" class="r-card r-card--tool">
            <a
              class="r-expand"
              :href="tool.link"
              target="_blank"
              rel="noopener"
              :aria-label="ramadan.labels.open_tool_aria"
              :title="ramadan.labels.open_tool_title"
            >
              <i :class="['fas', tool.icon]" aria-hidden="true"></i>
            </a>
            <div>
              <h3 class="r-card__title">{{ tool.title }}</h3>
              <p class="r-card__desc">{{ tool.description }}</p>
            </div>
            <a :href="tool.link" class="r-link" target="_blank" rel="noopener">
              {{ ramadan.labels.open_tool }}
            </a>
          </article>
        </div>
      </div>
    </section>

    <div
      class="modal fade"
      id="moreDuasModal"
      tabindex="-1"
      aria-labelledby="moreDuasModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="moreDuasModalLabel">{{ ramadan.duas_prayers.modal_title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="r-modal-grid">
              <div v-for="section in ramadan.duas_prayers.modal_sections" :key="section.title" class="r-modal-card">
                <h3>{{ section.title }}</h3>
                <div class="r-story-grid r-story-grid--modal">
                  <article v-for="item in section.items" :key="item.name" class="r-story-card r-story-card--dua">
                    <div class="r-story-content">
                      <span class="r-story-tag">{{ ramadan.duas_prayers.tag_label }}</span>
                      <h4 class="r-story-title">{{ item.name }}</h4>
                      <p class="r-arabic" dir="rtl">{{ item.arabic }}</p>
                      <p class="r-translit">{{ item.transliteration }}</p>
                      <p class="r-story-desc">{{ item.translation }}</p>
                      <div class="r-story-meta">
                        <span class="r-story-duration">{{ item.reference }}</span>
                        <a class="r-story-link" :href="item.resource" target="_blank" rel="noopener">{{ ramadan.labels.resource_label }}</a>
                      </div>
                    </div>
                  </article>
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
import ramadanData from "./data/ramadan_2026.json";

export default {
  name: "Ramadan2026Component",
  data() {
    return {
      ramadan: ramadanData,
      heroImageOverride: null,
      heroImageFallback: "/images/banner-photo-800.webp",
    };
  },
  computed: {
    heroImage() {
      return this.heroImageOverride || this.ramadan.header.banner_image || this.heroImageFallback;
    },
    heroImageSrcset() {
      return {
        avif: "/images/banner-photo-400.avif 400w, /images/banner-photo-800.avif 800w, /images/banner-photo-1200.avif 1200w",
        webp: "/images/banner-photo-400.webp 400w, /images/banner-photo-800.webp 800w, /images/banner-photo-1200.webp 1200w",
      };
    },
  },
  methods: {
    formatISODate(value) {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return value;
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    handleHeroImageError() {
      if (this.heroImageOverride !== this.heroImageFallback) {
        this.heroImageOverride = this.heroImageFallback;
      }
    },
    storyStyle(thumbnail) {
      if (!thumbnail) {
        return {
          "--story-bg": "linear-gradient(135deg, rgba(27, 117, 103, 0.2), rgba(209, 160, 70, 0.2))",
        };
      }
      return {
        "--story-bg": `url(${thumbnail})`,
      };
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap");

.ramadan-2026 {
  --r-ink: #102a22;
  --r-ink-soft: #3f534b;
  --r-gold: #d1a046;
  --r-teal: #1b7567;
  --r-cream: #f7f1e7;
  --r-sand: #efe5d4;
  --r-shadow: 0 24px 60px rgba(16, 42, 34, 0.18);
  --r-radius: 22px;
  font-family: "Source Sans 3", "Helvetica Neue", Arial, sans-serif;
  color: var(--r-ink);
  background: radial-gradient(circle at 15% 15%, #fff9ef 0, #f7efe3 45%, #efe2d1 100%);
}

.ramadan-2026 * {
  box-sizing: border-box;
}

.r-hero {
  position: relative;
  padding: 90px 0 70px;
  overflow: hidden;
}

.r-hero__backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, rgba(27, 117, 103, 0.16), transparent 55%),
    radial-gradient(circle at 20% 10%, rgba(209, 160, 70, 0.22), transparent 52%);
  pointer-events: none;
}

.r-hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 40px;
  align-items: center;
  z-index: 1;
}

.r-hero__content {
  display: grid;
  gap: 14px;
}

.r-hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--r-teal);
}

.r-hero__title {
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-size: clamp(2.8rem, 4.5vw, 4.4rem);
  line-height: 1.05;
  margin: 4px 0 0;
}

.r-hero__subtitle {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--r-ink-soft);
}

.r-hero__lead {
  font-size: 1.1rem;
  margin: 0;
  max-width: 560px;
}

.r-hero__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.r-hero__card {
  background: rgba(255, 255, 255, 0.85);
  padding: 16px 18px;
  border-radius: 18px;
  box-shadow: var(--r-shadow);
}

.r-hero__label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--r-teal);
  display: block;
  margin-bottom: 6px;
}

.r-hero__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.r-hero__pill {
  border-radius: 999px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.7);
  color: var(--r-ink);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid rgba(27, 117, 103, 0.15);
}

.r-hero__pill:hover {
  color: var(--r-teal);
  border-color: rgba(27, 117, 103, 0.35);
}

.r-hero__media {
  display: grid;
  gap: 16px;
  align-items: center;
}

.r-hero__frame {
  position: relative;
  padding: 18px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(209, 160, 70, 0.35), rgba(27, 117, 103, 0.15));
  box-shadow: var(--r-shadow);
}

.r-hero__image {
  width: 100%;
  max-height: 420px;
  border-radius: 20px;
  object-fit: cover;
}

.r-hero__glow {
  position: absolute;
  inset: 18px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  pointer-events: none;
}

.r-hero__note {
  background: rgba(255, 255, 255, 0.9);
  padding: 14px 16px;
  border-radius: 16px;
  font-size: 0.95rem;
  color: var(--r-ink-soft);
  box-shadow: var(--r-shadow);
}

.r-section {
  padding: 70px 0;
}

.r-section--alt {
  background: rgba(255, 255, 255, 0.6);
}

.r-section__head {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.r-section__title {
  font-family: "Cormorant Garamond", "Times New Roman", serif;
  font-size: clamp(2.1rem, 3vw, 2.9rem);
  margin: 0;
}

.r-section__subtitle {
  color: var(--r-ink-soft);
  max-width: 760px;
}

.r-overview__lead {
  font-size: 1.45rem;
  font-weight: 600;
  color: var(--r-ink);
  max-width: 900px;
}

.r-overview__body {
  font-size: 1.05rem;
  color: var(--r-ink-soft);
  max-width: 860px;
}

.r-overview__list {
  margin-top: 20px;
  padding-left: 22px;
  display: grid;
  gap: 8px;
  max-width: 760px;
}

.r-grid {
  display: grid;
  gap: 24px;
}

.r-grid--dates {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.r-grid--triple {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.r-grid--double {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.r-card {
  background: #fff;
  border-radius: var(--r-radius);
  padding: 24px;
  box-shadow: var(--r-shadow);
}

.r-card__tag {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
  margin-bottom: 16px;
  background: var(--r-sand);
  color: var(--r-ink);
}

.r-card__tag--start {
  background: rgba(27, 117, 103, 0.16);
  color: var(--r-teal);
}

.r-card__tag--special {
  background: rgba(209, 160, 70, 0.2);
  color: #a0732d;
}

.r-card__tag--eid {
  background: rgba(246, 222, 211, 0.8);
  color: #8d4b3b;
}

.r-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.r-card__title--small {
  font-size: 1rem;
  margin-top: 16px;
}

.r-card__meta {
  font-weight: 600;
  color: var(--r-teal);
}

.r-card__desc {
  color: var(--r-ink-soft);
}

.r-list {
  padding-left: 18px;
}

.r-list-block h4 {
  font-size: 1rem;
  margin-top: 18px;
  margin-bottom: 8px;
}

.r-list-block ul {
  padding-left: 18px;
  margin-bottom: 12px;
}

.r-link {
  font-weight: 700;
  color: var(--r-teal);
  text-decoration: none;
  white-space: nowrap;
}

.r-link:hover {
  color: #0c574a;
}

.r-link--button {
  display: inline-flex;
  margin-top: 22px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(27, 117, 103, 0.3);
  background: #fff;
}

.r-link--button:hover {
  background: rgba(27, 117, 103, 0.08);
}

.r-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(27, 117, 103, 0.12);
  color: var(--r-teal);
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 6px;
}

.r-prayer-list {
  display: grid;
  gap: 12px;
}

.r-prayer-item {
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(16, 42, 34, 0.08);
}

.r-prayer-item:last-child {
  border-bottom: none;
}

.r-video-grid {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}

.r-video-grid--wide {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.r-video-card {
  padding: 14px;
  border-radius: 16px;
  background: rgba(27, 117, 103, 0.08);
}

.r-references {
  margin-top: 24px;
}

.r-references ul {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: grid;
  gap: 10px;
}

.r-references li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(16, 42, 34, 0.04);
}

.r-download {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
}

.r-arabic {
  font-family: "Amiri", "Times New Roman", serif;
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.r-translit {
  font-style: italic;
  color: var(--r-ink-soft);
}

.r-spacing-top {
  margin-top: 24px;
}

.r-card--tool {
  position: relative;
  display: grid;
  gap: 16px;
}

.r-expand {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 42, 34, 0.08);
  color: var(--r-ink);
  text-decoration: none;
  border: 1px solid rgba(16, 42, 34, 0.12);
}

.r-expand:hover {
  color: var(--r-teal);
  border-color: rgba(27, 117, 103, 0.35);
}

.r-story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.r-story-grid--modal {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.r-story-card {
  position: relative;
  border-radius: 24px;
  padding: 22px;
  min-height: 220px;
  color: #0f1f1b;
  overflow: hidden;
  box-shadow: var(--r-shadow);
}

.r-story-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--story-bg);
  background-size: cover;
  background-position: center;
  filter: saturate(0.85);
  opacity: 0.55;
}

.r-story-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.7));
}

.r-story-card--dua::before {
  opacity: 0.35;
}

.r-story-content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 8px;
}

.r-story-tag {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--r-teal);
  font-weight: 700;
}

.r-story-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
}

.r-story-desc {
  color: var(--r-ink-soft);
  margin: 0;
}

.r-story-duration {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--r-ink-soft);
}

.r-story-link {
  font-weight: 700;
  color: var(--r-teal);
  text-decoration: none;
}

.r-story-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.r-micro-tips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.r-short-block {
  margin-top: 28px;
}

.r-short-groups {
  display: grid;
  gap: 24px;
}

.r-short-group__title {
  margin-bottom: 12px;
}

.r-note {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(27, 117, 103, 0.08);
  color: var(--r-ink-soft);
}

.r-modal-grid {
  display: grid;
  gap: 20px;
}

.r-modal-card {
  padding: 14px;
  border-radius: 16px;
  background: rgba(16, 42, 34, 0.04);
}

.r-animate {
  opacity: 0;
  transform: translateY(12px);
  animation: rise 0.8s ease forwards;
  animation-delay: var(--delay, 0s);
}

@keyframes rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .r-hero__grid {
    grid-template-columns: 1fr;
  }

  .r-hero {
    padding: 70px 0 60px;
  }

  .r-hero__media {
    order: -1;
  }
}

@media (max-width: 768px) {
  .r-section {
    padding: 56px 0;
  }

  .r-hero__stats {
    grid-template-columns: 1fr;
  }

  .r-card {
    padding: 20px;
  }

  .r-hero__nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .r-download {
    flex-direction: column;
    align-items: flex-start;
  }

  .r-references li {
    flex-direction: column;
    align-items: flex-start;
  }

  .r-story-grid--modal {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .r-animate {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
