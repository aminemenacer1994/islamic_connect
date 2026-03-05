<template>
  <div class="container py-4 digital-library-page">
    <h1 class="text-center fw-bold display-5 mb-3">Digital Content Library</h1>
    <p class="text-center mb-4 lead">
      Browse structured Islamic guides for reverts, youth, and anyone looking to learn with clarity and confidence.
    </p>

    <p class="small text-muted mb-3 library-count" aria-live="polite">
      <i class="bi bi-collection me-2" aria-hidden="true"></i>
      <strong class="mr-1">{{ guides.length }}</strong> guides available
    </p>

    <div v-if="guides.length" class="row g-4">
      <div v-for="guide in guides" :key="guide.id" class="col-12 col-md-6 col-lg-4">
        <article class="card custom-card rounded-4 overflow-hidden h-100">
          <div class="card-body d-flex flex-column p-3">
            <div class="guide-meta-row mb-2">
              <span class="audience-chip">
                <i class="bi bi-person-badge-fill me-1" aria-hidden="true"></i>
                {{ formatAudience(guide.audience) }}
              </span>
              <span class="guide-level">{{ guide.level }}</span>
            </div>

            <h2 class="h5 fw-bold text-dark mb-2 guide-title">{{ guide.title }}</h2>

            <p class="card-text text-muted mb-3 card-description">{{ guide.description }}</p>

            <div class="mb-4 guide-topics" aria-label="Guide topics">
              <span v-for="tag in guide.tags" :key="`${guide.id}-${tag}`" class="topic-chip">{{ tag }}</span>
            </div>

            <a class="guide-cta-btn mt-auto" :href="guide.href" :aria-label="guide.cta">
              <span>{{ guide.cta }}</span>
              <i class="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </article>
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
      ],
    };
  },
  methods: {
    formatAudience(audience) {
      const audienceMap = {
        revert: "Reverts",
        youth: "Youth",
        seasonal: "Seasonal",
      };
      return audienceMap[audience] || "Guide";
    },
  },
};
</script>

<style scoped>
.digital-library-page {
  --section-ink: #1e2e33;
  --section-muted: #586a70;
  --card-accent: #0b5d4b;
  --card-accent-2: #1a5f7a;
  --card-sand: #fcf7ee;
  --card-border: rgba(15, 70, 63, 0.16);
  --card-shadow: 0 12px 28px rgba(12, 43, 47, 0.1), 0 4px 10px rgba(12, 43, 47, 0.06);
  --card-shadow-hover: 0 20px 45px rgba(12, 43, 47, 0.16), 0 8px 16px rgba(12, 43, 47, 0.1);
}

.digital-library-page > h1.display-5 {
  letter-spacing: -0.01em;
  font-weight: 700;
  color: var(--section-ink);
}

.lead {
  color: var(--section-muted);
  line-height: 1.7;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.library-count {
  display: inline-flex;
  align-items: center;
}

.custom-card {
  border-radius: 22px;
  border: 1px solid var(--card-border);
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(232, 201, 138, 0.45) 0%, rgba(255, 255, 255, 0) 60%),
    radial-gradient(120% 120% at 100% 0%, rgba(26, 95, 122, 0.18) 0%, rgba(255, 255, 255, 0) 55%),
    linear-gradient(180deg, #ffffff 0%, var(--card-sand) 100%);
  box-shadow: var(--card-shadow);
  position: relative;
  z-index: 0;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.custom-card::before {
  content: "";
  position: absolute;
  top: -68px;
  right: -56px;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(11, 93, 75, 0.22), rgba(11, 93, 75, 0));
  pointer-events: none;
}

.custom-card::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--card-accent), var(--card-accent-2));
  opacity: 0.9;
  pointer-events: none;
}

.custom-card:hover {
  transform: translateY(-4px);
  border-color: rgba(11, 93, 75, 0.28);
  box-shadow: var(--card-shadow-hover);
}

.guide-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.audience-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  background: #edf7f3;
  color: #1a5f4f;
  border: 1px solid rgba(11, 93, 75, 0.18);
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.guide-level {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #425965;
  background: #f2f6f8;
  border: 1px solid rgba(66, 89, 101, 0.16);
}

.guide-title {
  line-height: 1.3;
}

.card-description {
  line-height: 1.6;
  min-height: 72px;
}

.guide-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.topic-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.22rem 0.58rem;
  font-size: 0.74rem;
  font-weight: 600;
  color: #3a5a67;
  background: #ecf5f8;
  border: 1px solid rgba(58, 90, 103, 0.2);
}

.guide-cta-btn {
  width: 100%;
  border: 1px solid rgba(19, 96, 77, 0.35);
  border-radius: 12px;
  padding: 0.7rem 0.85rem;
  background: linear-gradient(90deg, #2a8d75, #2f7f6d);
  color: #ffffff;
  font-weight: 700;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.guide-cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(17, 91, 74, 0.24);
  background: linear-gradient(90deg, #247b66, #2a705f);
  border-color: rgba(19, 96, 77, 0.45);
  color: #ffffff;
}

.guide-cta-btn:focus-visible {
  outline: 3px solid rgba(21, 111, 89, 0.34);
  outline-offset: 2px;
}

.empty-state {
  margin-top: 1rem;
  border: 1px dashed rgba(18, 70, 65, 0.2);
  border-radius: 16px;
  background: #f8fbfc;
  color: #4b5f68;
  padding: 1.2rem 1rem;
}

.empty-state i {
  font-size: 1.4rem;
  display: block;
  margin-bottom: 0.5rem;
}

@media (min-width: 992px) {
  .card-description {
    min-height: 84px;
  }
}
</style>
