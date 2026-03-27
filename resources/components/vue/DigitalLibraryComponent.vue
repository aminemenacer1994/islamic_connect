<template>
  <div class="container py-4 digital-library-page">
    <h1 class="text-center fw-bold display-5 mb-3">Digital Content Library</h1>
    <p class="text-center mb-4 lead">
      Browse structured Islamic guides for reverts, youth, and anyone looking to learn with clarity and confidence.
    </p>

    <div class="library-toolbar d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between gap-3 mb-3">
      <p class="small text-muted mb-0 library-count" aria-live="polite">
        <i class="bi bi-collection me-2" aria-hidden="true"></i>
        <strong class="me-1">{{ totalVisibleCount }}</strong> guides available
      </p>

      <div class="library-search">
        <div class="library-search-inner">
          <i class="bi bi-search" aria-hidden="true"></i>
          <input
            v-model.trim="searchQuery"
            type="search"
            class="form-control library-search-input"
            placeholder="Search guides…"
            aria-label="Search guides" />
          <button
            v-if="searchQuery"
            type="button"
            class="btn btn-link library-search-clear"
            @click="searchQuery = ''"
            aria-label="Clear search">
            <i class="bi bi-x-circle" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div
        v-if="categoryPills.length"
        class="library-category-pills"
        role="group"
        aria-label="Filter guides by category">
        <button
          type="button"
          class="btn category-pill"
          :class="{ 'is-active': activeCategoryKey === 'all' }"
          @click="activeCategoryKey = 'all'">
          <i class="bi bi-grid-3x3-gap me-1" aria-hidden="true"></i>
          All
          <span class="pill-count">{{ guides.length }}</span>
        </button>
        <button
          v-for="pill in categoryPills"
          :key="pill.key"
          type="button"
          class="btn category-pill"
          :class="{ 'is-active': activeCategoryKey === pill.key }"
          @click="activeCategoryKey = pill.key">
          <i class="bi me-1" :class="pill.icon" aria-hidden="true"></i>
          {{ pill.title }}
          <span class="pill-count">{{ pill.count }}</span>
        </button>
      </div>
    </div>

    <div v-if="guides.length && totalVisibleCount" class="library-sections">
      <section
        v-for="section in visibleSections"
        :key="section.key"
        class="library-section"
        :aria-label="`${section.title} guides`">
        <div class="library-section-header">
          <div class="library-section-title-row">
            <span class="section-icon" aria-hidden="true">
              <i class="bi" :class="section.icon"></i>
            </span>
            <div>
              <h2 class="h4 mb-0 fw-bold section-title">{{ section.title }}</h2>
              <p v-if="section.subtitle" class="mb-0 section-subtitle text-muted">
                {{ section.subtitle }}
              </p>
            </div>
          </div>
          <span class="section-count" aria-label="Number of guides in this category">
            {{ section.guides.length }}
          </span>
        </div>

        <div class="row g-4">
          <div v-for="guide in section.guides" :key="guide.id" class="col-12 col-md-6 col-lg-4">
            <a
              class="guide-card-link text-decoration-none d-block h-100"
              :href="guide.href"
              :aria-label="guide.cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <article class="card custom-card rounded-4 overflow-hidden h-100">
                <div class="card-body d-flex flex-column p-3">
                  <div class="guide-meta-row mb-2">
                    <span class="audience-chip">
                      <i class="bi bi-person-badge-fill me-1" aria-hidden="true"></i>
                      {{ formatAudience(guide.audience) }}
                    </span>
                    <span class="guide-level">{{ guide.level }}</span>
                  </div>

                  <h3 class="h5 fw-bold text-dark mb-2 guide-title">{{ guide.title }}</h3>

                  <p class="card-text text-muted mb-3 card-description">{{ guide.description }}</p>

                  <div class="mb-4 guide-topics" aria-label="Guide topics">
                    <span v-for="tag in guide.tags" :key="`${guide.id}-${tag}`" class="topic-chip">{{ tag }}</span>
                  </div>

                  <span class="guide-cta-btn mt-auto">
                    <span>{{ guide.cta }}</span>
                    <i class="bi bi-arrow-up-right"></i>
                  </span>
                </div>
              </article>
            </a>
          </div>
        </div>
      </section>
    </div>

    <div v-else-if="guides.length && !totalVisibleCount" class="empty-state text-center">
      <i class="bi bi-search" aria-hidden="true"></i>
      <p class="mb-1 fw-semibold">No matches found.</p>
      <p class="mb-3 text-muted">Try a different search or reset filters.</p>
      <button type="button" class="btn btn-sm btn-outline-secondary" @click="resetFilters">
        Reset filters
      </button>
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
      activeCategoryKey: "all",
      searchQuery: "",
      categoryDefinitions: [
        {
          key: "seasonal",
          title: "Seasonal",
          subtitle: "Ramadan and other time-based collections.",
          icon: "bi-calendar-heart",
        },
        {
          key: "special-events",
          title: "Special Events",
          subtitle: "Event hubs, programmes, and one-off experiences.",
          icon: "bi-stars",
        },
        {
          key: "social",
          title: "Social",
          subtitle: "Community-first tracks for connection and growth.",
          icon: "bi-people",
        },
        {
          key: "learning",
          title: "Learning",
          subtitle: "Structured learning paths and essentials.",
          icon: "bi-journal-bookmark",
        },
      ],
      guides: [
        {
          id: "revert-essentials",
          title: "Reverts Corner",
          description:
            "A practical starting point for new Muslims covering prayer, daily worship routines, and foundational learning.",
          audience: "revert",
          category: "learning",
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
          category: "social",
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
          category: "seasonal",
          level: "All Levels",
          href: "/ramadan-2026",
          cta: "Open Ramadan Guide",
          tags: ["Ramadan", "Fasting", "Daily Plan"],
        },
      ],
    };
  },
  computed: {
    resolvedGuides() {
      return (this.guides || []).map((guide) => {
        const category = String(guide?.category || "").trim();
        if (category) return guide;
        const audience = String(guide?.audience || "").trim();
        if (audience === "seasonal") return { ...guide, category: "seasonal" };
        return { ...guide, category: "learning" };
      });
    },
    normalizedSearchQuery() {
      return String(this.searchQuery || "").trim().toLowerCase();
    },
    filteredGuides() {
      const q = this.normalizedSearchQuery;
      const list = this.resolvedGuides || [];
      if (!q) return list;
      return list.filter((guide) => {
        const title = String(guide?.title || "").toLowerCase();
        const description = String(guide?.description || "").toLowerCase();
        const tags = Array.isArray(guide?.tags) ? guide.tags.join(" ").toLowerCase() : "";
        const audience = String(guide?.audience || "").toLowerCase();
        return (
          title.includes(q) ||
          description.includes(q) ||
          tags.includes(q) ||
          audience.includes(q)
        );
      });
    },
    categoryIndex() {
      const defs = Array.isArray(this.categoryDefinitions)
        ? this.categoryDefinitions
        : [];
      const index = new Map();
      defs.forEach((def) => {
        if (!def || !def.key) return;
        index.set(String(def.key), def);
      });
      return index;
    },
    sections() {
      const groups = new Map();
      (this.filteredGuides || []).forEach((guide) => {
        const key = String(guide?.category || "other").trim() || "other";
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(guide);
      });

      const ordered = [];
      (this.categoryDefinitions || []).forEach((def) => {
        const key = String(def?.key || "").trim();
        if (!key) return;
        const items = groups.get(key) || [];
        if (!items.length) return;
        ordered.push({
          ...def,
          key,
          guides: items,
        });
        groups.delete(key);
      });

      const remaining = Array.from(groups.entries())
        .map(([key, items]) => ({ key, items }))
        .filter((entry) => (entry.items || []).length);

      remaining.forEach(({ key, items }) => {
        const def = this.categoryIndex.get(String(key));
        ordered.push({
          key,
          title: def?.title || "Other",
          subtitle: def?.subtitle || "",
          icon: def?.icon || "bi-folder2-open",
          guides: items,
        });
      });

      return ordered;
    },
    categoryPills() {
      return (this.sections || []).map((section) => ({
        key: section.key,
        title: section.title,
        icon: section.icon,
        count: (section.guides || []).length,
      }));
    },
    visibleSections() {
      if (this.activeCategoryKey === "all") return this.sections || [];
      return (this.sections || []).filter(
        (section) => String(section.key) === String(this.activeCategoryKey)
      );
    },
    totalVisibleCount() {
      return (this.visibleSections || []).reduce(
        (sum, section) => sum + ((section.guides || []).length || 0),
        0
      );
    },
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
    resetFilters() {
      this.activeCategoryKey = "all";
      this.searchQuery = "";
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
  --pill-bg: rgba(236, 247, 243, 0.9);
  --pill-border: rgba(11, 93, 75, 0.18);
  --pill-ink: #1a5f4f;
  --pill-bg-active: rgba(42, 141, 117, 0.18);
  --panel-bg: rgba(255, 255, 255, 0.72);
}

.library-toolbar {
  position: sticky;
  top: 74px;
  z-index: 5;
  padding: 0.75rem 0.9rem;
  border-radius: 18px;
  border: 1px solid rgba(15, 70, 63, 0.12);
  background: linear-gradient(180deg, var(--panel-bg), rgba(252, 247, 238, 0.62));
  backdrop-filter: blur(10px);
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

.library-search {
  flex: 1 1 420px;
  max-width: 560px;
}

.library-search-inner {
  position: relative;
  display: flex;
  align-items: center;
}

.library-search-inner > i.bi-search {
  position: absolute;
  left: 12px;
  color: rgba(30, 46, 51, 0.55);
}

.library-search-input {
  padding-left: 2.25rem;
  padding-right: 2.35rem;
  border-radius: 14px;
  border: 1px solid rgba(15, 70, 63, 0.16);
  background: rgba(255, 255, 255, 0.9);
}

.library-search-input:focus {
  border-color: rgba(42, 141, 117, 0.55);
  box-shadow: 0 0 0 0.2rem rgba(42, 141, 117, 0.18);
}

.library-search-clear {
  position: absolute;
  right: 8px;
  padding: 0.25rem 0.35rem;
  color: rgba(30, 46, 51, 0.55);
}

.library-search-clear:hover {
  color: rgba(30, 46, 51, 0.85);
}

.library-category-pills {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.55rem;
}

.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--pill-border);
  background: var(--pill-bg);
  color: var(--pill-ink);
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 0.01em;
}

.category-pill .pill-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 22px;
  padding: 0 0.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(11, 93, 75, 0.18);
  color: rgba(11, 93, 75, 0.92);
  font-size: 0.74rem;
  font-weight: 900;
}

.category-pill.is-active {
  background: var(--pill-bg-active);
  border-color: rgba(42, 141, 117, 0.38);
  box-shadow: 0 12px 22px rgba(12, 43, 47, 0.08);
}

.category-pill:focus-visible {
  outline: 3px solid rgba(21, 111, 89, 0.34);
  outline-offset: 2px;
}

.library-sections {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 1rem;
}

.library-section {
  padding-top: 0.25rem;
}

.library-section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0.95rem;
  border: 1px solid rgba(15, 70, 63, 0.12);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(252, 247, 238, 0.7));
  margin-bottom: 1rem;
}

.library-section-title-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.section-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(42, 141, 117, 0.12);
  border: 1px solid rgba(42, 141, 117, 0.18);
  color: #1a5f4f;
  flex: 0 0 auto;
}

.section-icon i {
  font-size: 1.05rem;
}

.section-title {
  color: var(--section-ink);
  letter-spacing: -0.01em;
}

.section-subtitle {
  color: var(--section-muted);
  line-height: 1.5;
  font-size: 0.95rem;
  margin-top: 0.1rem;
}

.section-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  padding: 0 0.65rem;
  border-radius: 999px;
  background: rgba(26, 95, 122, 0.08);
  border: 1px solid rgba(26, 95, 122, 0.16);
  color: rgba(26, 95, 122, 0.92);
  font-weight: 900;
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

.guide-card-link:focus-visible {
  outline: 3px solid rgba(21, 111, 89, 0.34);
  outline-offset: 3px;
  border-radius: 24px;
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
