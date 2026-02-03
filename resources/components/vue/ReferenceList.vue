<template>
  <div v-if="items && items.length" class="r-references">
    <h4>{{ title }}</h4>
    <div class="r-reference-grid">
      <article
        v-for="ref in items"
        :key="`${ref.citation}-${ref.link}`"
        class="r-reference-card"
      >
        <div class="r-reference-card__copy">
          <p class="r-reference-card__source">{{ ref.source }}</p>
          <p class="r-reference-card__citation">{{ ref.citation }}</p>
        </div>
        <a
          class="r-reference-card__action"
          :href="ref.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ actionLabel }}
        </a>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReferenceList",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "References",
    },
    actionLabel: {
      type: String,
      default: "View",
    },
  },
};
</script>

<style scoped>
.r-references {
  margin-top: 24px;
}

.r-references h4 {
  margin: 0;
  font-weight: 600;
  color: var(--r-ink);
}

.r-reference-grid {
  margin-top: 12px;
  display: grid;
  gap: 12px;
}

.r-reference-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-radius: 18px;
  border: 1px solid rgba(15, 34, 48, 0.1);
  background: var(--r-card);
  box-shadow: 0 10px 25px rgba(15, 34, 48, 0.08);
}

.r-reference-card__copy {
  flex: 1;
  min-width: 0;
}

.r-reference-card__source {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--r-ink);
}

.r-reference-card__citation {
  margin: 4px 0 0;
  color: var(--r-ink-soft);
  font-size: 0.82rem;
}

.r-reference-card__action {
  padding: 8px 20px;
  border-radius: 999px;
  border: 1px solid rgba(215, 166, 74, 0.4);
  background: rgba(215, 166, 74, 0.12);
  color: var(--r-ink);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.r-reference-card__action:hover {
  background: rgba(215, 166, 74, 0.25);
  border-color: rgba(215, 166, 74, 0.7);
}

@media (max-width: 640px) {
  .r-reference-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .r-reference-card__action {
    width: 100%;
    text-align: center;
  }
}
</style>
