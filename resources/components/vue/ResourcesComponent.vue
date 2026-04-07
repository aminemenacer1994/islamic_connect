<template>
  <div id="app" class="resources-view">
    <div class="container-fluid px-4 px-lg-5 py-5">
      <div class="resources-inner mx-auto">
        <div class="row justify-content-center text-center mb-4">
          <div class="col-xl-10">
            <h1 class="display-5 fw-bold heading">Islamic Apps and Learning Resources</h1>
            <p class="lead subhead">
              Curated resources for Quran study, hadith learning, and daily worship. Every entry includes
              quick metadata so users can compare format, language, learning level, and access at a glance.
            </p>
            <div class="resources-summary">
              <span class="summary-chip">
                <i class="bi bi-stack" aria-hidden="true"></i>
                {{ cards.length }} categories
              </span>
              <span class="summary-chip">
                <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                {{ totalResources }} curated resources
              </span>
              <span class="summary-chip">
                <i class="bi bi-calendar-check-fill" aria-hidden="true"></i>
                Last content review: February 2026
              </span>
            </div>
          </div>
        </div>

        <div class="resources-page">
          <div class="row g-4">
            <div class="col-lg-6" v-for="card in cards" :key="card.title">
              <section class="resource-card">
                <header class="resource-card__header">
                  <div class="resource-card__icon">
                    <i :class="card.icon" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 class="resource-card__title">{{ card.title }}</h3>
                    <p class="resource-card__description mb-2">{{ card.description }}</p>
                    <div class="resource-card__meta">
                      <span>{{ card.items.length }} entries</span>
                      <span class="divider"></span>
                      <span>{{ card.audience }}</span>
                    </div>
                  </div>
                </header>

                <div class="resource-items">
                  <article
                    class="resource-item"
                    v-for="(item, index) in card.items"
                    :key="`${card.title}-${index}`"
                  >
                    <header class="resource-item__head">
                      <div class="resource-item__icon" :style="{ background: item.iconBg }">
                        <i :class="item.icon" aria-hidden="true"></i>
                      </div>
                      <div class="resource-item__title-wrap">
                        <p class="resource-item__type">{{ item.kind }}</p>
                        <h4 class="resource-item__title">{{ item.title }}</h4>
                      </div>
                      <span class="resource-item__status">
                        <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                        Curated
                      </span>
                    </header>

                    <p class="resource-item__description">{{ item.description }}</p>

                    <div class="resource-item__meta-list">
                      <span
                        v-for="entry in metadataEntries(item)"
                        :key="`${item.title}-${entry.label}`"
                        class="meta-chip"
                      >
                        <i :class="entry.icon" aria-hidden="true"></i>
                        <strong>{{ entry.label }}:</strong>
                        {{ entry.value }}
                      </span>
                    </div>

                    <div class="resource-item__features">
                      <span
                        v-for="feature in item.features"
                        :key="`${item.title}-${feature}`"
                        class="feature-chip"
                      >
                        {{ feature }}
                      </span>
                    </div>

                    <p class="resource-item__help-note">{{ item.helpNote }}</p>

                    <div class="resource-item__actions">
                      <a
                        class="btn btn-sm btn-resource btn-resource--ghost"
                        :href="item.link"
                        target="_blank"
                        rel="noopener"
                      >
                        <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                        Visit
                      </a>
                      <button
                        type="button"
                        class="btn btn-sm btn-resource btn-resource--solid"
                        @click="openModal(item, card.title)"
                      >
                        <i class="bi bi-info-circle-fill" aria-hidden="true"></i>
                        Details
                      </button>
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="modalItem"
      class="modal-overlay"
      tabindex="-1"
      @click.self="closeModal"
      @keydown.esc="closeModal"
    >
      <div class="modal-card" role="dialog" aria-modal="true" :aria-label="`Details for ${modalItem.title}`">
        <header class="modal-card__header">
          <div class="modal-card__identity">
            <div class="modal-card__icon" :style="{ background: modalItem.iconBg }">
              <i :class="modalItem.icon" aria-hidden="true"></i>
            </div>
            <div>
              <div class="modal-card__tag">{{ modalCategory || "Resource" }}</div>
              <h4 class="modal-card__title">{{ modalItem.title }}</h4>
            </div>
          </div>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </header>

        <section class="modal-card__section">
          <p class="modal-card__description">{{ modalItem.description }}</p>
          <p class="modal-card__note">{{ modalItem.helpNote }}</p>
        </section>

        <section class="modal-card__section">
          <h5>Resource metadata</h5>
          <div class="modal-meta-grid">
            <article class="modal-meta-card" v-for="entry in metadataEntries(modalItem)" :key="entry.label">
              <div class="modal-meta-card__label">{{ entry.label }}</div>
              <div class="modal-meta-card__value">{{ entry.value }}</div>
            </article>
          </div>
        </section>

        <section class="modal-card__section">
          <h5>Key highlights</h5>
          <div class="modal-feature-grid">
            <span
              class="modal-feature-chip"
              v-for="feature in modalItem.features"
              :key="`${modalItem.title}-${feature}`"
            >
              {{ feature }}
            </span>
          </div>
        </section>

        <div class="modal-card__footer">
          <button type="button" class="btn btn-sm btn-resource btn-resource--ghost" @click="closeModal">
            Close
          </button>
          <a
            class="btn btn-sm btn-resource btn-resource--solid"
            :href="modalItem.link"
            target="_blank"
            rel="noopener"
          >
            <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
            Open resource
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourcesComponent",
  data() {
    return {
      cards: [
        {
          title: "Mobile Apps",
          description: "Portable tools for daily worship routines, Quran reading, and remembrance.",
          audience: "Best for everyday mobile learning",
          icon: "bi bi-phone-fill",
          items: [
            {
              title: "Quran by Quran.com",
              kind: "Quran app",
              icon: "bi bi-book-half",
              iconBg: "linear-gradient(135deg, #0ea5a4, #0f766e)",
              description:
                "Open-source Quran app with strong translation quality, tafsir integration, and recitation controls.",
              features: ["Word by word lookup", "Multiple tafsir layers", "Bookmark and note support"],
              helpNote: "Helpful for consistent daily tilawah with reliable references in one place.",
              metadata: {
                type: "Mobile app",
                access: "iOS, Android, Web",
                language: "Arabic, English, and many translations",
                level: "Beginner to advanced",
                cost: "Free",
                reviewed: "February 2026",
              },
              link: "https://quran.com/apps",
            },
            {
              title: "Muslim Pro",
              kind: "Daily companion",
              icon: "bi bi-compass-fill",
              iconBg: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              description: "All in one app for salah timing, qibla, duas, and Quran access.",
              features: ["Location based prayer times", "Qibla and mosque finder", "Hijri calendar support"],
              helpNote: "Useful when you need prayer and adhkar tools available quickly throughout the day.",
              metadata: {
                type: "Mobile app",
                access: "iOS and Android",
                language: "Multi-language",
                level: "Beginner friendly",
                cost: "Free tier and premium options",
                reviewed: "February 2026",
              },
              link: "https://www.muslimpro.com",
            },
            {
              title: "Athan by IslamicFinder",
              kind: "Prayer time app",
              icon: "bi bi-bell-fill",
              iconBg: "linear-gradient(135deg, #0f766e, #115e59)",
              description:
                "Prayer schedule app focused on athan alerts, qibla direction, and nearby mosque discovery.",
              features: ["Athan reminders", "Qibla pointer", "Nearby masjid search"],
              helpNote: "Strong option for users who prioritize accurate prayer notifications and travel support.",
              metadata: {
                type: "Mobile app",
                access: "iOS and Android",
                language: "Multi-language",
                level: "Beginner friendly",
                cost: "Free",
                reviewed: "February 2026",
              },
              link: "https://www.islamicfinder.org/athan/",
            },
            {
              title: "Hisnul Muslim",
              kind: "Dua reference app",
              icon: "bi bi-hands",
              iconBg: "linear-gradient(135deg, #d97706, #b45309)",
              description:
                "Digital reference of authentic duas from Quran and sahih narrations with simple offline access.",
              features: ["Quick category browsing", "Works offline", "Source references included"],
              helpNote: "Good for memorizing adhkar and following morning and evening dua routines.",
              metadata: {
                type: "Mobile app",
                access: "Android (widely available variants)",
                language: "Arabic and English",
                level: "Beginner to intermediate",
                cost: "Free",
                reviewed: "February 2026",
              },
              link: "https://play.google.com/store/apps/details?id=com.admads.android.HisnulMuslim",
            },
            {
              title: "Hadith Collection (Greentech)",
              kind: "Hadith app",
              icon: "bi bi-book-fill",
              iconBg: "linear-gradient(135deg, #334155, #1e293b)",
              description: "Searchable hadith app with major collections and grading visibility.",
              features: ["Bukhari and Muslim included", "Grade display", "Arabic and English browsing"],
              helpNote: "Best for students who want quick hadith lookup with chain grading context.",
              metadata: {
                type: "Mobile app",
                access: "Android",
                language: "Arabic and English",
                level: "Intermediate and student use",
                cost: "Free",
                reviewed: "February 2026",
              },
              link: "https://play.google.com/store/apps/details?id=com.greentech.hadith",
            },
          ],
        },
        {
          title: "Websites",
          description: "Trusted web platforms for studying Quran, hadith, fiqh, and guided learning pathways.",
          audience: "Best for deeper study on desktop and tablet",
          icon: "bi bi-globe",
          items: [
            {
              title: "Quran.com",
              kind: "Quran website",
              icon: "bi bi-book-half",
              iconBg: "linear-gradient(135deg, #0ea5a4, #14b8a6)",
              description: "Highly trusted Quran portal with recitation, tafsir, and translation comparison.",
              features: ["Reliable translation set", "Tafsir views", "Recitation controls"],
              helpNote: "Strong central reference when checking ayah meaning across different translations.",
              metadata: {
                type: "Website",
                access: "Web browser",
                language: "Arabic and global translations",
                level: "Beginner to advanced",
                cost: "Free",
                reviewed: "February 2026",
              },
              link: "https://quran.com",
            },
            {
              title: "Sunnah.com",
              kind: "Hadith website",
              icon: "bi bi-scroll-fill",
              iconBg: "linear-gradient(135deg, #1d4ed8, #1e40af)",
              description: "Hadith portal for major collections with clear chapter organization and grading.",
              features: ["Major books indexed", "Narration numbering", "Search by topic and collection"],
              helpNote: "Use this for quick text lookup before moving to deeper commentary sources.",
              metadata: {
                type: "Website",
                access: "Web browser",
                language: "Arabic and English",
                level: "Intermediate and student use",
                cost: "Free",
                reviewed: "February 2026",
              },
              link: "https://sunnah.com",
            },
            {
              title: "SeekersGuidance",
              kind: "Learning platform",
              icon: "bi bi-mortarboard-fill",
              iconBg: "linear-gradient(135deg, #0f766e, #0d9488)",
              description: "Structured Islamic courses and scholar-reviewed answers across key subjects.",
              features: ["Free curriculum paths", "Qualified instructors", "Fiqh and aqidah tracks"],
              helpNote: "Great for learners who need structured lessons instead of isolated articles.",
              metadata: {
                type: "Website",
                access: "Web browser",
                language: "Primarily English",
                level: "Beginner to intermediate",
                cost: "Mostly free",
                reviewed: "February 2026",
              },
              link: "https://seekersguidance.org",
            },
            {
              title: "IslamQA.info",
              kind: "Fatwa archive",
              icon: "bi bi-question-circle-fill",
              iconBg: "linear-gradient(135deg, #475569, #334155)",
              description: "Large fatwa and topic archive with evidence references and clear legal framing.",
              features: ["Topic based filtering", "Reference-driven answers", "Multi-language support"],
              helpNote: "Useful for focused question answering when you need cited source references.",
              metadata: {
                type: "Website",
                access: "Web browser",
                language: "Arabic, English, and more",
                level: "Intermediate",
                cost: "Free",
                reviewed: "February 2026",
              },
              link: "https://islamqa.info",
            },
            {
              title: "IslamicFinder",
              kind: "Prayer and utility site",
              icon: "bi bi-bank",
              iconBg: "linear-gradient(135deg, #16a34a, #15803d)",
              description: "Long-running Islamic utility site with prayer tools and location-based services.",
              features: ["Prayer time engine", "Qibla finder", "Islamic calendar tools"],
              helpNote: "Good fallback for prayer and qibla access while traveling or switching devices.",
              metadata: {
                type: "Website",
                access: "Web browser",
                language: "Multi-language",
                level: "Beginner friendly",
                cost: "Free",
                reviewed: "February 2026",
              },
              link: "https://www.islamicfinder.org",
            },
          ],
        },
        {
          title: "Books",
          description: "Foundational hadith books and practical references used in teaching and personal study.",
          audience: "Best for text-focused learners and study circles",
          icon: "bi bi-book",
          items: [
            {
              title: "Sahih al-Bukhari",
              kind: "Hadith collection",
              icon: "bi bi-book-half",
              iconBg: "linear-gradient(135deg, #b45309, #92400e)",
              description: "Primary sahih hadith collection with wide scholarly acceptance and usage.",
              features: ["Compiled by Imam al-Bukhari", "Extensive chapter structure", "Foundational source"],
              helpNote: "Use with commentary and teacher guidance for best context and legal understanding.",
              metadata: {
                type: "Book",
                access: "Web editions and print copies",
                language: "Arabic and translated editions",
                level: "Intermediate to advanced",
                cost: "Free online editions available",
                reviewed: "February 2026",
              },
              link: "https://sunnah.com/bukhari",
            },
            {
              title: "Sahih Muslim",
              kind: "Hadith collection",
              icon: "bi bi-book-fill",
              iconBg: "linear-gradient(135deg, #c2410c, #9a3412)",
              description: "Canonical sahih collection often studied alongside Sahih al-Bukhari.",
              features: ["Compiled by Imam Muslim", "Strong narration quality", "Used in core hadith study"],
              helpNote: "Helpful for comparative hadith study and understanding narration pathways.",
              metadata: {
                type: "Book",
                access: "Web editions and print copies",
                language: "Arabic and translated editions",
                level: "Intermediate to advanced",
                cost: "Free online editions available",
                reviewed: "February 2026",
              },
              link: "https://sunnah.com/muslim",
            },
            {
              title: "Riyad as-Salihin",
              kind: "Practical hadith guide",
              icon: "bi bi-heart-fill",
              iconBg: "linear-gradient(135deg, #0ea5a4, #0f766e)",
              description: "Daily-practice hadith collection covering adab, worship, and character building.",
              features: ["Compiled by Imam al-Nawawi", "Theme-based chapters", "Suitable for daily reading"],
              helpNote: "Ideal for family circles, khutbah prep, and day-to-day spiritual reminders.",
              metadata: {
                type: "Book",
                access: "Web editions and print copies",
                language: "Arabic and English",
                level: "Beginner to intermediate",
                cost: "Free online editions available",
                reviewed: "February 2026",
              },
              link: "https://sunnah.com/riyadussalihin",
            },
            {
              title: "Al-Muwatta",
              kind: "Hadith and fiqh text",
              icon: "bi bi-scales",
              iconBg: "linear-gradient(135deg, #334155, #1f2937)",
              description: "Early hadith and fiqh work reflecting Madinan legal practice and narration.",
              features: ["Compiled by Imam Malik", "Early juristic framework", "Referenced in legal studies"],
              helpNote: "Useful for learners connecting hadith narration with fiqh foundations.",
              metadata: {
                type: "Book",
                access: "Web editions and print copies",
                language: "Arabic and translated editions",
                level: "Intermediate to advanced",
                cost: "Free online editions available",
                reviewed: "February 2026",
              },
              link: "https://sunnah.com/malik",
            },
            {
              title: "40 Hadith Nawawi",
              kind: "Concise hadith primer",
              icon: "bi bi-list-ol",
              iconBg: "linear-gradient(135deg, #2563eb, #1e3a8a)",
              description: "Compact set of core narrations widely used for creed, ethics, and memorization.",
              features: ["Forty key narrations", "Strong educational value", "Common in beginner curricula"],
              helpNote: "Great entry point for structured memorization and teacher-led explanation.",
              metadata: {
                type: "Book",
                access: "Web editions and print copies",
                language: "Arabic and many translations",
                level: "Beginner to intermediate",
                cost: "Free online editions available",
                reviewed: "February 2026",
              },
              link: "https://sunnah.com/nawawi40",
            },
          ],
        },
        {
          title: "Scriptures and Tafsir",
          description: "Primary Quran text and core tafsir references for verse-by-verse understanding.",
          audience: "Best for tafsir-backed Quran study",
          icon: "bi bi-scroll-fill",
          items: [
            {
              title: "The Quran (Al-Quran al-Kareem)",
              kind: "Primary scripture",
              icon: "bi bi-book-half",
              iconBg: "linear-gradient(135deg, #0f766e, #0d9488)",
              description: "The final revelation and central source for belief, worship, and guidance.",
              features: ["Canonical Arabic text", "Recitation support", "Parallel translation options"],
              helpNote: "Start every learning path from direct Quran reading before secondary commentary.",
              metadata: {
                type: "Scripture",
                access: "Web editions, apps, and print mushaf",
                language: "Arabic text with global translations",
                level: "All levels",
                cost: "Free online access",
                reviewed: "February 2026",
              },
              link: "https://quran.com",
            },
            {
              title: "Tafsir Ibn Kathir",
              kind: "Classical tafsir",
              icon: "bi bi-feather",
              iconBg: "linear-gradient(135deg, #14532d, #166534)",
              description: "Well-known Sunni tafsir linking verses to hadith and narrations from early scholars.",
              features: ["Narration-based method", "Broad scholarly usage", "Strong source linkage"],
              helpNote: "Helpful when you need context on sabab al-nuzul and early scholarly explanations.",
              metadata: {
                type: "Tafsir",
                access: "Web editions and print copies",
                language: "Arabic and translated selections",
                level: "Intermediate",
                cost: "Free online selections available",
                reviewed: "February 2026",
              },
              link: "https://quran.com/tafseer/ibn-kathir",
            },
            {
              title: "Tafsir As-Sa'di",
              kind: "Concise tafsir",
              icon: "bi bi-lightbulb-fill",
              iconBg: "linear-gradient(135deg, #0891b2, #0e7490)",
              description: "Readable tafsir focused on practical guidance, spiritual reflection, and clarity.",
              features: ["Short explanatory style", "Easy reading flow", "Practical message focus"],
              helpNote: "Good daily tafsir companion for personal reflection without heavy technical language.",
              metadata: {
                type: "Tafsir",
                access: "Web editions and print copies",
                language: "Arabic and English",
                level: "Beginner to intermediate",
                cost: "Free online selections available",
                reviewed: "February 2026",
              },
              link: "https://quran.com/tafseer/as-sadi",
            },
            {
              title: "Tafsir Al-Jalalayn",
              kind: "Classical concise tafsir",
              icon: "bi bi-pen-fill",
              iconBg: "linear-gradient(135deg, #4338ca, #3730a3)",
              description: "Compact classical tafsir emphasizing linguistic explanation and concise verse meaning.",
              features: ["Classical author lineage", "Concise style", "Useful language notes"],
              helpNote: "Useful for learners comparing short classical explanations across tafsir works.",
              metadata: {
                type: "Tafsir",
                access: "Web editions and print copies",
                language: "Arabic and translated selections",
                level: "Intermediate to advanced",
                cost: "Free online selections available",
                reviewed: "February 2026",
              },
              link: "https://islamicstudies.info/tafseer/Al-Jalalayn",
            },
            {
              title: "Mushaf Madinah (King Fahd Complex)",
              kind: "Standard mushaf edition",
              icon: "bi bi-patch-check-fill",
              iconBg: "linear-gradient(135deg, #334155, #0f172a)",
              description: "Widely distributed Uthmani script mushaf with standardized typography and layout.",
              features: ["Uthmani script style", "Reliable publishing body", "Print and digital resources"],
              helpNote: "Useful for consistent memorization and tajwid practice with stable page layout.",
              metadata: {
                type: "Mushaf edition",
                access: "Digital and print",
                language: "Arabic text",
                level: "All levels",
                cost: "Free digital access",
                reviewed: "February 2026",
              },
              link: "https://qurancomplex.gov.sa",
            },
          ],
        },
      ],
      modalItem: null,
      modalCategory: "",
    };
  },
  computed: {
    totalResources() {
      return this.cards.reduce((sum, card) => sum + card.items.length, 0);
    },
  },
  methods: {
    openModal(item, category = "") {
      this.modalItem = item;
      this.modalCategory = category;
    },
    closeModal() {
      this.modalItem = null;
      this.modalCategory = "";
    },
    metadataEntries(item) {
      const metadata = item?.metadata || {};
      return [
        { label: "Type", value: metadata.type, icon: "bi bi-tag-fill" },
        { label: "Access", value: metadata.access, icon: "bi bi-laptop" },
        { label: "Language", value: metadata.language, icon: "bi bi-translate" },
        { label: "Level", value: metadata.level, icon: "bi bi-mortarboard-fill" },
        { label: "Cost", value: metadata.cost, icon: "bi bi-wallet2" },
        { label: "Reviewed", value: metadata.reviewed, icon: "bi bi-clock-fill" },
      ].filter((entry) => Boolean(entry.value));
    },
  },
};
</script>

<style scoped>
.resources-view {
  background:
    radial-gradient(circle at top right, rgba(34, 197, 94, 0.12), transparent 35%),
    radial-gradient(circle at bottom left, rgba(14, 165, 233, 0.12), transparent 40%),
    #f8fafc;
  min-height: 100%;
}

.resources-inner {
  width: 100%;
  max-width: 1320px;
}

.heading {
  color: #0f172a;
  letter-spacing: -0.02em;
}

.subhead {
  color: #334155;
  max-width: 980px;
  margin: 0 auto;
  line-height: 1.6;
}

.resources-summary {
  margin-top: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.summary-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  font-size: 0.84rem;
  font-weight: 600;
  padding: 0.45rem 0.8rem;
}

.summary-chip i {
  color: #0d9488;
}

.resource-card {
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.resource-card__header {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.resource-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  background: linear-gradient(145deg, #d1fae5, #a7f3d0);
  color: #065f46;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.resource-card__title {
  margin: 0;
  font-size: 1.3rem;
  color: #0f172a;
}

.resource-card__description {
  margin: 0;
  font-size: 0.92rem;
  color: #475569;
  line-height: 1.45;
}

.resource-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
  font-size: 0.83rem;
  color: #64748b;
}

.resource-card__meta .divider {
  width: 1px;
  height: 14px;
  background: rgba(15, 23, 42, 0.2);
}

.resource-items {
  margin-top: 1.2rem;
  display: grid;
  gap: 1rem;
}

.resource-item {
  border-radius: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
}

.resource-item__head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.resource-item__icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 1rem;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.2);
  flex-shrink: 0;
}

.resource-item__title-wrap {
  min-width: 0;
  flex: 1;
}

.resource-item__type {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0d9488;
  font-weight: 700;
}

.resource-item__title {
  margin: 0.15rem 0 0;
  color: #0f172a;
  font-size: 1.02rem;
  line-height: 1.35;
}

.resource-item__status {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  color: #0369a1;
  background: rgba(186, 230, 253, 0.45);
  border-radius: 999px;
  padding: 0.26rem 0.55rem;
  font-weight: 600;
  flex-shrink: 0;
}

.resource-item__description {
  margin: 0.8rem 0 0;
  color: #334155;
  font-size: 0.9rem;
  line-height: 1.5;
}

.resource-item__meta-list {
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #334155;
  font-size: 0.74rem;
  padding: 0.3rem 0.6rem;
}

.meta-chip i {
  color: #0d9488;
}

.meta-chip strong {
  font-weight: 700;
}

.resource-item__features {
  margin-top: 0.65rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.feature-chip {
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(20, 184, 166, 0.15);
  color: #0f766e;
}

.resource-item__help-note {
  margin: 0.75rem 0 0;
  font-size: 0.84rem;
  line-height: 1.5;
  color: #475569;
}

.resource-item__actions {
  margin-top: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  justify-content: flex-end;
}

.btn-resource {
  border-radius: 999px;
  font-weight: 600;
  border-width: 1px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.btn-resource--ghost {
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.25);
  background: #ffffff;
}

.btn-resource--ghost:hover,
.btn-resource--ghost:focus {
  background: #0f172a;
  color: #ffffff;
  border-color: transparent;
}

.btn-resource--solid {
  color: #ffffff;
  border-color: transparent;
  background: linear-gradient(135deg, #0f766e, #115e59);
  box-shadow: 0 10px 18px rgba(15, 118, 110, 0.3);
}

.btn-resource--solid:hover,
.btn-resource--solid:focus {
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(15, 118, 110, 0.35);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.64);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1200;
}

.modal-card {
  width: min(700px, 95vw);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  background: #ffffff;
  border-radius: 1.35rem;
  padding: 1.5rem;
  box-shadow: 0 30px 65px rgba(15, 23, 42, 0.35);
}

.modal-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.modal-card__identity {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.modal-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: #ffffff;
  display: grid;
  place-items: center;
  box-shadow: 0 12px 20px rgba(15, 23, 42, 0.25);
}

.modal-card__tag {
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0d9488;
  font-weight: 700;
}

.modal-card__title {
  margin: 0.2rem 0 0;
  font-size: 1.35rem;
  color: #0f172a;
}

.modal-card__section {
  margin-top: 1rem;
}

.modal-card__section h5 {
  margin: 0;
  color: #0f172a;
  font-size: 0.95rem;
}

.modal-card__description {
  margin: 0;
  color: #334155;
  line-height: 1.6;
}

.modal-card__note {
  margin: 0.65rem 0 0;
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.5;
}

.modal-meta-grid {
  margin-top: 0.7rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.modal-meta-card {
  border-radius: 0.8rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.65rem 0.75rem;
}

.modal-meta-card__label {
  font-size: 0.72rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-meta-card__value {
  margin-top: 0.2rem;
  color: #0f172a;
  font-size: 0.86rem;
  line-height: 1.45;
}

.modal-feature-grid {
  margin-top: 0.65rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.modal-feature-chip {
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.16);
  color: #0369a1;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
}

.modal-card__footer {
  margin-top: 1.1rem;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 991.98px) {
  .resource-item__head {
    flex-wrap: wrap;
  }

  .resource-item__status {
    margin-left: auto;
  }
}

@media (max-width: 767.98px) {
  .subhead {
    font-size: 1rem;
  }

  .resource-card {
    padding: 1.15rem;
    border-radius: 1.25rem;
  }

  .resource-item {
    padding: 0.9rem;
  }

  .meta-chip {
    width: 100%;
    justify-content: flex-start;
  }

  .modal-card {
    padding: 1.1rem;
  }

  .modal-meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
