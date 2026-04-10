<template>
  <div class="container py-4 digital-library-page" :class="{ 'is-dark': isDarkMode }">
    <section class="library-hero text-center">
      <span class="library-kicker">Curated Guides</span>
      <h1 class="display-5 fw-bold mb-3">Digital Content Library</h1>
      <p class="lead mb-0">
        A simple collection of Islamic guides for new Muslims, young people, and seasonal worship.
      </p>
    </section>

    <section class="library-summary" aria-label="Library summary">
      <div>
        <p class="summary-label mb-1">Available now</p>
        <p class="summary-copy mb-0">Open any guide to continue learning without extra filters or navigation.</p>
      </div>
      <span class="summary-count" aria-label="Number of available guides">{{ guides.length }}</span>
    </section>

    <div v-if="guides.length" class="row g-4">
      <div v-for="guide in guides" :key="guide.id" class="col-12 col-md-6 col-lg-4">
        <a class="guide-card-link text-decoration-none d-block h-100" :href="guide.href" :aria-label="guide.cta">
          <article class="card guide-card h-100">
            <div class="card-body d-flex flex-column p-4">
              <div class="guide-meta-row mb-3">
                <span class="audience-chip">{{ formatAudience(guide.audience) }}</span>
                <span class="guide-level">{{ guide.level }}</span>
              </div>

              <h2 class="h4 fw-bold mb-2 guide-title">{{ guide.title }}</h2>
              <p class="card-text mb-4 card-description">{{ guide.description }}</p>

              <div class="guide-topics mb-4" aria-label="Guide topics">
                <span v-for="tag in guide.tags" :key="`${guide.id}-${tag}`" class="topic-chip">{{ tag }}</span>
              </div>

              <span class="guide-cta mt-auto">
                <span>{{ guide.cta }}</span>
                <i class="bi bi-arrow-right" aria-hidden="true"></i>
              </span>
            </div>
          </article>
        </a>
      </div>
    </div>

    <div v-else class="empty-state text-center">
      <i class="bi bi-journal-x" aria-hidden="true"></i>
      <p class="mb-0">No guides available right now.</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
      guides: [
        {
          id: "revert-essentials",
          title: "Reverts Corner",
          description:
            "A practical starting point for new Muslims covering prayer, daily worship routines, and foundational learning.",
          audience: "revert",
          level: "Beginner",
          href: "/revert",
          cta: "Open Revert Guide",
          tags: ["Shahada", "Prayer", "Daily Practice"],
        },
        {
          id: "youth-faith-lab",
          title: "Youth Faith Lab",
          description:
            "Guidance for students and young professionals navigating identity, studies, and faith-centered habits.",
          audience: "youth",
          level: "Intermediate",
          href: "/guide",
          cta: "Start Youth Track",
          tags: ["Campus Life", "Identity", "Habits"],
        },
        {
          id: "ramadan-guide",
          title: "Ramadan Guide",
          description:
            "A dedicated Ramadan experience with practical daily planning, worship focus, and reflection resources.",
          audience: "seasonal",
          level: "All Levels",
          href: "/ramadan-2026",
          cta: "Open Ramadan Guide",
          tags: ["Ramadan", "Fasting", "Daily Plan"],
        },
        {
          id: "hajj-umrah-guide",
          title: "Hajj & Umrah Guide",
          description:
            "A source-led Hajj and Umrah guide covering the core rites, practical preparation, key references, and downloadable section tools.",
          audience: "pilgrimage",
          level: "All Levels",
          href: "/hajj",
          cta: "Open Hajj & Umrah Guide",
          tags: ["Hajj", "Umrah", "Pilgrimage"],
        },
      ],
    };
  },
  mounted() {
    this.syncThemeFromBody();
    window.addEventListener("ic-theme-change", this.handleThemeChange);
  },
  beforeUnmount() {
    window.removeEventListener("ic-theme-change", this.handleThemeChange);
  },
  methods: {
    formatAudience(audience) {
      const audienceMap = {
        revert: "Reverts",
        youth: "Youth",
        seasonal: "Seasonal",
        pilgrimage: "Pilgrimage",
      };
      return audienceMap[audience] || "Guide";
    },
    syncThemeFromBody() {
      this.isDarkMode = document.body.classList.contains("digital-library-route-page")
        && document.body.classList.contains("dark-mode");
    },
    handleThemeChange(event) {
      if (event?.detail && typeof event.detail.isDark === "boolean") {
        this.isDarkMode = event.detail.isDark;
        return;
      }
      this.syncThemeFromBody();
    },
  },
};
</script>

<style scoped>
.digital-library-page {
  --page-ink: #1f2f35;
  --page-muted: #5d7078;
  --page-border: rgba(24, 77, 67, 0.12);
  --page-shadow: 0 16px 36px rgba(17, 43, 46, 0.08);
  --card-shadow-hover: 0 22px 44px rgba(17, 43, 46, 0.14);
  --card-accent: #1e7a63;
  --card-accent-strong: #155947;
  --panel-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(245, 250, 248, 0.96));
  --card-bg: linear-gradient(180deg, #ffffff 0%, #f9fcfb 100%);
  --chip-bg: #edf7f3;
  --chip-muted-bg: #f1f5f7;
  --topic-bg: #ecf4f8;
  --empty-bg: #f8fbfc;
  --kicker-bg: #edf7f3;
  --cta-bg: linear-gradient(90deg, var(--card-accent), var(--card-accent-strong));
  --cta-border: transparent;
  --cta-ink: #ffffff;
  --card-hover-border: rgba(24, 77, 67, 0.22);
  color: var(--page-ink);
}

.digital-library-page.is-dark {
  --page-ink: #ffffff;
  --page-muted: #ffffff;
  --page-border: rgba(255, 255, 255, 0.12);
  --page-shadow: none;
  --card-shadow-hover: none;
  --card-accent: #232529;
  --card-accent-strong: #ffffff;
  --panel-bg: #232529;
  --card-bg: #232529;
  --chip-bg: #232529;
  --chip-muted-bg: #232529;
  --topic-bg: #232529;
  --empty-bg: #232529;
  --kicker-bg: #232529;
  --cta-bg: #232529;
  --cta-border: rgba(255, 255, 255, 0.18);
  --cta-ink: #ffffff;
  --card-hover-border: rgba(255, 255, 255, 0.18);
}

.library-hero {
  max-width: 760px;
  margin: 0 auto 1.75rem;
}

.library-kicker {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: var(--kicker-bg);
  color: var(--card-accent-strong);
  border: 1px solid var(--page-border);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.digital-library-page.is-dark .library-kicker {
  color: #ffffff;
}

.digital-library-page h1 {
  color: var(--page-ink);
  letter-spacing: -0.02em;
}

.lead {
  color: var(--page-muted);
  line-height: 1.7;
}

.library-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  border: 1px solid var(--page-border);
  border-radius: 20px;
  background: var(--panel-bg);
  box-shadow: var(--page-shadow);
  margin-bottom: 1.5rem;
}

.summary-label {
  color: var(--card-accent-strong);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.summary-copy {
  color: var(--page-muted);
  line-height: 1.6;
}

.summary-count {
  flex: 0 0 auto;
  min-width: 56px;
  height: 56px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  color: var(--page-ink);
  border: 1px solid var(--page-border);
  font-size: 1.4rem;
  font-weight: 800;
}

.digital-library-page.is-dark .summary-label,
.digital-library-page.is-dark .summary-copy,
.digital-library-page.is-dark .summary-count {
  color: #ffffff;
}

.guide-card-link:focus-visible {
  outline: 3px solid rgba(30, 122, 99, 0.28);
  outline-offset: 4px;
  border-radius: 24px;
}

.guide-card {
  border: 1px solid var(--page-border);
  border-radius: 22px;
  background: var(--card-bg);
  box-shadow: var(--page-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.guide-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--card-hover-border);
}

.guide-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.audience-chip,
.guide-level,
.topic-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
}

.audience-chip {
  padding: 0.3rem 0.7rem;
  color: var(--card-accent-strong);
  background: var(--chip-bg);
  border: 1px solid var(--page-border);
}

.guide-level {
  padding: 0.3rem 0.7rem;
  color: var(--page-muted);
  background: var(--chip-muted-bg);
  border: 1px solid var(--page-border);
}

.guide-title {
  line-height: 1.3;
  color: var(--page-ink);
}

.card-description {
  line-height: 1.65;
  min-height: 78px;
  color: var(--page-muted);
}

.guide-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-chip {
  padding: 0.28rem 0.65rem;
  color: var(--page-ink);
  background: var(--topic-bg);
  border: 1px solid var(--page-border);
}

.guide-cta {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  color: var(--cta-ink);
  background: var(--cta-bg);
  border: 1px solid var(--cta-border);
  font-weight: 700;
}

.digital-library-page.is-dark .audience-chip,
.digital-library-page.is-dark .guide-level,
.digital-library-page.is-dark .topic-chip,
.digital-library-page.is-dark .guide-title,
.digital-library-page.is-dark .card-description,
.digital-library-page.is-dark .guide-cta,
.digital-library-page.is-dark .guide-cta i,
.digital-library-page.is-dark .empty-state,
.digital-library-page.is-dark .empty-state i,
.digital-library-page.is-dark .lead,
.digital-library-page.is-dark h1 {
  color: #ffffff;
}

.empty-state {
  margin-top: 1rem;
  border: 1px dashed var(--page-border);
  border-radius: 16px;
  background: var(--empty-bg);
  color: var(--page-muted);
  padding: 1.2rem 1rem;
}

.empty-state i {
  font-size: 1.4rem;
  display: block;
  margin-bottom: 0.5rem;
}

@media (max-width: 767.98px) {
  .library-summary {
    align-items: flex-start;
    flex-direction: column;
  }

  .summary-count {
    min-width: 48px;
    height: 48px;
    border-radius: 14px;
  }

  .card-description {
    min-height: 0;
  }
}
</style>
