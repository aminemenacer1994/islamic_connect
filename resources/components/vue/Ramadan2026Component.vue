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
                <div class="r-hero__sources">
                  <a
                    v-for="source in ramadan.data_sources"
                    :key="source.label"
                    class="r-hero__source"
                    :href="source.link"
                    target="_blank"
                    rel="noopener"
                  >
                    {{ source.label }}
                  </a>
                </div>
              </div>
            </div>

            <nav class="r-hero__nav r-animate" style="--delay: 0.36s;">
              <a v-for="link in navLinks" :key="link.href" class="r-hero__pill" :href="link.href">
                {{ link.label }}
              </a>
            </nav>
          </div>

          <div class="r-hero__media r-animate" style="--delay: 0.22s;">
            <div class="r-hero__frame">
              <img
                v-if="heroImage"
                :src="heroImage"
                :alt="ramadan.header.alt_text"
                class="r-hero__image"
                loading="lazy"
                @error="handleHeroImageError"
              />
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
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🌙</span>
            {{ ramadan.overview.section_title }}
          </h2>
          <p class="r-overview__lead">{{ ramadan.overview.subtitle }}</p>
        </div>
        <div id="section-overview-body" class="r-section__body">
          <p v-for="(para, index) in ramadan.overview.body" :key="index" class="r-overview__body">
            {{ para }}
          </p>
          <h3 class="r-section__subtitle">{{ ramadan.overview.key_points_title }}</h3>
          <ul class="r-overview__list">
            <li v-for="item in ramadan.overview.key_points" :key="item">{{ item }}</li>
          </ul>
          <div class="r-references" v-if="ramadan.overview.references">
            <h4>{{ ramadan.labels.references }}</h4>
            <ul>
              <li v-for="ref in ramadan.overview.references" :key="ref.citation">
                <a class="r-reference-link" :href="ref.link" target="_blank" rel="noopener">
                  {{ ref.source }} — {{ ref.citation }}
                </a>
                <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="history" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">📜</span>
            {{ ramadan.history.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.history.subtitle }}</p>
        </div>
        <div id="section-history-body" class="r-section__body">
          <p v-for="(para, index) in ramadan.history.body" :key="index" class="r-section__subtitle">
            {{ para }}
          </p>
          <div class="r-grid r-grid--double r-grid--timeline">
            <article
              v-for="(item, index) in ramadan.history.timeline"
              :key="item.period"
              class="r-card r-card--timeline"
            >
              <span class="r-card__emoji" aria-hidden="true">{{ getEmoji("timeline", index) }}</span>
              <h3 class="r-card__title">{{ item.period }}</h3>
              <p class="r-card__desc">{{ item.detail }}</p>
            </article>
          </div>
          <div
            class="r-grid r-grid--double r-spacing-top"
            v-if="ramadan.history.notable_figures || ramadan.history.regional_practices"
          >
            <article v-if="ramadan.history.notable_figures" class="r-card">
              <h3 class="r-card__title">{{ ramadan.history.notable_figures.title }}</h3>
              <ul class="r-list">
                <li v-for="item in ramadan.history.notable_figures.items" :key="item.name">
                  <strong>{{ item.name }}:</strong> {{ item.note }}
                </li>
              </ul>
            </article>
            <article v-if="ramadan.history.regional_practices" class="r-card">
              <h3 class="r-card__title">{{ ramadan.history.regional_practices.title }}</h3>
              <ul class="r-list">
                <li v-for="item in ramadan.history.regional_practices.items" :key="item.region">
                  <strong>{{ item.region }}:</strong> {{ item.detail }}
                </li>
              </ul>
            </article>
          </div>
          <div class="r-references" v-if="ramadan.history.references">
            <h4>{{ ramadan.labels.references }}</h4>
            <ul>
              <li v-for="ref in ramadan.history.references" :key="ref.citation">
                <a class="r-reference-link" :href="ref.link" target="_blank" rel="noopener">
                  {{ ref.source }} — {{ ref.citation }}
                </a>
                <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="key-dates" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🗓️</span>
            {{ ramadan.important_dates.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.important_dates.subtitle }}</p>
        </div>
        <div id="section-key-dates-body" class="r-section__body">
          <div class="r-grid r-grid--dates">
            <article
              v-for="(date, index) in ramadan.important_dates.dates"
              :key="date.event"
              class="r-card r-card--date"
            >
              <div class="r-card__tag" :class="`r-card__tag--${date.type}`">
                {{ date.event }}
                <span class="r-card__emoji r-card__emoji--tag" aria-hidden="true">{{ dateEmoji(date.type) }}</span>
              </div>
              <h3 class="r-card__title">{{ date.gregorian_date }}</h3>
              <p class="r-card__meta">{{ date.hijri_date }}</p>
              <p class="r-card__desc">{{ date.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="planner" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🧭</span>
            Live Ramadan Planner
          </h2>
          <p class="r-section__subtitle">
            Turn this guide into a living plan with a day-by-day calendar, personal reminders, and shared reflections.
          </p>
        </div>
        <div id="section-planner-body" class="r-section__body">
          <div class="row justify-content-center r-planner-row">
            <div class="col-12 col-md-10">
              <article class="r-card r-planner-card r-card--planner">
                <div class="r-planner-head">
                  <div>
                    <h3 class="r-card__title">Ramadan day-by-day calendar</h3>
                    <p class="r-card__desc">
                      Adjust the start date to match local moon sighting and track your progress each day.
                    </p>
                  </div>
                  <div class="r-planner-controls">
                    <label class="r-label" for="planner-start-date">Start date</label>
                    <input
                      id="planner-start-date"
                      class="r-input"
                      type="date"
                      v-model="calendarStartOverride"
                      @change="persistCalendar"
                    />
                    <label class="r-label" for="planner-length">Length</label>
                    <select id="planner-length" class="r-select" v-model.number="calendarLength" @change="persistCalendar">
                      <option v-for="len in [29, 30]" :key="len" :value="len">{{ len }} days</option>
                    </select>
                  </div>
                </div>
                <div class="r-calendar">
                  <button
                    v-for="(day, index) in calendarDays"
                    :key="day.key"
                    class="r-calendar__cell"
                    type="button"
                    :class="{ 'is-today': day.isToday, 'is-selected': index === selectedDayIndex, 'is-special': day.event }"
                    @click="selectDay(index)"
                  >
                    <span class="r-calendar__day">Day {{ day.dayNumber }}</span>
                    <span class="r-calendar__date">{{ formatShortDate(day.date) }}</span>
                    <span v-if="day.event" class="r-calendar__event">{{ day.event }}</span>
                  </button>
                </div>
                <div v-if="selectedDay" class="r-calendar__detail">
                  <div class="r-calendar__detail-head">
                    <h4 class="r-calendar__detail-title">
                      Day {{ selectedDay.dayNumber }} - {{ formatISODate(selectedDay.date) }}
                    </h4>
                    <span v-if="selectedDay.event" class="r-calendar__event-chip">{{ selectedDay.event }}</span>
                  </div>
                  <p class="r-card__desc">Add a quick note or intention for this day.</p>
                  <div v-if="!authResolved" class="r-empty">Checking login status...</div>
                  <div v-else-if="!isAuthenticated" class="r-auth-gate">
                    <p class="r-card__desc">Log in to save your daily intention notes.</p>
                    <div class="r-auth-actions">
                      <a class="r-button r-button--ghost" href="/login">Log in</a>
                    </div>
                  </div>
                  <textarea
                    v-else
                    class="r-textarea"
                    rows="3"
                    :value="selectedDayNote"
                    placeholder="Example: Aim to finish Juz 3, call family, give sadaqah."
                    @input="selectedDayNote = $event.target.value"
                  ></textarea>
                </div>
              </article>
            </div>
          </div>
          <div class="row r-planner-row">
            <div class="col-12 col-md-6">
              <article class="r-card r-card--soft">
                <div class="r-stack-head">
                  <h3 class="r-card__title">Personal reminders</h3>
                  <span class="r-badge">{{ reminders.length }} saved</span>
                </div>
                <p class="r-card__desc">
                  Build a mini schedule for suhoor, iftar, prayers, or goals. Reminders stay on this device.
                </p>
                <div v-if="!authResolved" class="r-empty">Checking login status...</div>
                <div v-else-if="!isAuthenticated" class="r-auth-gate">
                  <p class="r-card__desc">Log in to create and view your saved personal reminders.</p>
                  <div class="r-auth-actions">
                    <a class="r-button r-button--ghost" href="/login">Log in</a>
                  </div>
                </div>
                <div v-else>
                  <form class="r-form" @submit.prevent="addReminder">
                    <div class="r-form__row">
                      <input
                        class="r-input"
                        v-model.trim="reminderDraft.title"
                        type="text"
                        placeholder="Reminder title"
                        required
                      />
                      <select class="r-select" v-model.number="reminderDraft.dayNumber">
                        <option v-for="day in dayOptions" :key="day" :value="day">Day {{ day }}</option>
                      </select>
                    </div>
                    <div class="r-form__row">
                      <select class="r-select" v-model="reminderDraft.timeOfDay">
                        <option v-for="option in timeOfDayOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                      <input
                        class="r-input"
                        v-model.trim="reminderDraft.note"
                        type="text"
                        placeholder="Optional note"
                      />
                    </div>
                    <button class="r-button" type="submit">Save reminder</button>
                  </form>
                  <div v-if="sortedReminders.length" class="r-reminder-list">
                    <div v-for="reminder in sortedReminders" :key="reminder.id" class="r-reminder">
                      <label class="r-checkbox">
                        <input type="checkbox" v-model="reminder.done" @change="persistReminders" />
                        <span></span>
                      </label>
                      <div class="r-reminder__body">
                        <h4 :class="{ 'is-done': reminder.done }">{{ reminder.title }}</h4>
                        <p>Day {{ reminder.dayNumber }} - {{ formatTimeLabel(reminder.timeOfDay) }}</p>
                        <p v-if="reminder.note">{{ reminder.note }}</p>
                      </div>
                      <button class="r-icon-button" type="button" @click="removeReminder(reminder.id)">
                        Remove
                      </button>
                    </div>
                  </div>
                  <p v-else class="r-empty">No reminders yet. Add your first one above.</p>
                </div>
              </article>
            </div>
            <div class="col-12 col-md-6">
              <article class="r-card r-card--soft">
                <div class="r-stack-head">
                  <h3 class="r-card__title">Community reflections</h3>
                  <span class="r-badge">{{ reflections.length }} shared</span>
                </div>
                <p class="r-card__desc">Share a short reflection, dua, or intention and see it appear instantly.</p>
                <div v-if="!authResolved" class="r-empty">Checking login status...</div>
                <div v-else-if="!isAuthenticated" class="r-auth-gate">
                  <p class="r-card__desc">Log in to share and view your saved community reflections.</p>
                  <div class="r-auth-actions">
                    <a class="r-button r-button--ghost" href="/login">Log in</a>
                  </div>
                </div>
                <div v-else>
                  <form class="r-form" @submit.prevent="addReflection">
                    <div class="r-form__row">
                      <input
                        class="r-input"
                        v-model.trim="reflectionDraft.name"
                        type="text"
                        placeholder="Name (optional)"
                      />
                      <select class="r-select" v-model="reflectionDraft.mood">
                        <option v-for="mood in reflectionMoods" :key="mood" :value="mood">{{ mood }}</option>
                      </select>
                    </div>
                    <textarea
                      class="r-textarea"
                      v-model.trim="reflectionDraft.text"
                      rows="3"
                      placeholder="Share a reflection or dua..."
                      required
                    ></textarea>
                    <button class="r-button" type="submit">Share reflection</button>
                  </form>
                  <div v-if="reflections.length" class="r-reflection-list">
                    <article v-for="reflection in reflections" :key="reflection.id" class="r-reflection">
                      <div class="r-reflection__meta">
                        <span class="r-reflection__name">{{ reflection.name || "Anonymous" }}</span>
                        <span class="r-reflection__mood">{{ reflection.mood }}</span>
                        <span class="r-reflection__time">{{ formatRelativeTime(reflection.timestamp) }}</span>
                      </div>
                      <p>{{ reflection.text }}</p>
                    </article>
                  </div>
                  <p v-else class="r-empty">Be the first to share a reflection.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="how-to-fast" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🥣</span>
            {{ ramadan.how_to_fast.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.how_to_fast.intro }}</p>
        </div>
        <div id="section-how-to-fast-body" class="r-section__body">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article v-for="(card, index) in ramadan.how_to_fast.cards" :key="card.title" class="r-card r-card--step">
              <span class="r-card__emoji" aria-hidden="true">{{ getEmoji("fasting", index) }}</span>
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
                <a class="r-reference-link" :href="ref.link" target="_blank" rel="noopener">
                  {{ ref.source }} — {{ ref.citation }}
                </a>
                <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">❓</span>
            {{ ramadan.faq.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.faq.subtitle }}</p>
        </div>
        <div id="section-faq-body" class="r-section__body">
          <div class="r-grid r-grid--double r-faq-grid">
            <article v-for="item in ramadan.faq.items" :key="item.question" class="r-card r-card--faq">
              <h3 class="r-card__title r-faq-question">{{ item.question }}</h3>
              <p class="r-card__desc r-faq-answer">{{ item.answer }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="quran-plans" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">📖</span>
            {{ ramadan.quran_reading_plans.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.quran_reading_plans.intro }}</p>
          <div class="r-section__controls">
            <button class="r-button r-button--ghost r-button--sm" type="button" @click="toggleAllQuranPlans">
              {{ areAllQuranPlansExpanded ? "Collapse all plans" : "Expand all plans" }}
            </button>
          </div>
        </div>
        <div id="section-quran-plans-body" class="r-section__body">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article
              v-for="(plan, index) in ramadan.quran_reading_plans.plans"
              :key="plan.level"
              class="r-card r-card--plan"
            >
              <div class="r-card__head">
                <span class="r-card__emoji" aria-hidden="true">{{ getEmoji("quran", index) }}</span>
                <div class="r-card__head-text">
                  <h3 class="r-card__title">{{ plan.level }}</h3>
                  <p class="r-card__desc">Daily target: {{ plan.daily_target }}</p>
                  <button
                    class="r-card__toggle"
                    type="button"
                    :aria-expanded="isQuranPlanExpanded(index)"
                    :aria-controls="`quran-plan-${index}`"
                    @click="toggleQuranPlan(index)"
                  >
                    {{ isQuranPlanExpanded(index) ? "Hide details" : "View full plan" }}
                  </button>
                </div>
              </div>
              <div :id="`quran-plan-${index}`" class="r-plan-details" v-show="isQuranPlanExpanded(index)">
                <ul class="r-list">
                  <li>Time needed: {{ plan.time_needed }}</li>
                  <li>Structure: {{ plan.structure }}</li>
                  <li>Goal: {{ plan.goal }}</li>
                  <li>Split: {{ plan.split }}</li>
                </ul>
                <ul class="r-list r-spacing-top">
                  <li v-for="tip in plan.tips" :key="tip">{{ tip }}</li>
                </ul>
              </div>
            </article>
          </div>
          <div class="r-references" v-if="ramadan.quran_reading_plans.references">
            <h4>{{ ramadan.labels.references }}</h4>
            <ul>
              <li v-for="ref in ramadan.quran_reading_plans.references" :key="ref.citation">
                <a class="r-reference-link" :href="ref.link" target="_blank" rel="noopener">
                  {{ ref.source }} — {{ ref.citation }}
                </a>
                <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="personal-plans" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🎯</span>
            {{ ramadan.personal_plans.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.personal_plans.intro }}</p>
          <div class="r-section__controls">
            <button class="r-button r-button--ghost r-button--sm" type="button" @click="toggleAllPersonalPlans">
              {{ areAllPersonalPlansExpanded ? "Collapse all plans" : "Expand all plans" }}
            </button>
          </div>
        </div>
        <div id="section-personal-plans-body" class="r-section__body">
          <div class="r-grid r-grid--double r-grid--stagger">
            <article
              v-for="(plan, index) in ramadan.personal_plans.plans"
              :key="plan.title"
              class="r-card r-card--persona"
            >
              <div class="r-card__head">
                <span class="r-card__emoji" aria-hidden="true">{{ getEmoji("personal", index) }}</span>
                <div class="r-card__head-text">
                  <h3 class="r-card__title">{{ plan.title }}</h3>
                  <button
                    class="r-card__toggle"
                    type="button"
                    :aria-expanded="isPersonalPlanExpanded(index)"
                    :aria-controls="`personal-plan-${index}`"
                    @click="togglePersonalPlan(index)"
                  >
                    {{ isPersonalPlanExpanded(index) ? "Hide details" : "View full plan" }}
                  </button>
                </div>
              </div>
              <p class="r-card__desc">{{ plan.who_for }}</p>
              <p class="r-card__desc">{{ plan.overview }}</p>
              <div :id="`personal-plan-${index}`" class="r-plan-details" v-show="isPersonalPlanExpanded(index)">
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
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="charity" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🤝</span>
            {{ ramadan.charity_guide.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.charity_guide.intro }}</p>
        </div>
        <div id="section-charity-body" class="r-section__body">
          <div class="r-grid r-grid--double">
            <article class="r-card r-card--charity">
              <span class="r-card__emoji" aria-hidden="true">💛</span>
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
            <article class="r-card r-card--charity r-card--charity-alt">
              <span class="r-card__emoji" aria-hidden="true">🎁</span>
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
                <a class="r-reference-link" :href="ref.link" target="_blank" rel="noopener">
                  {{ ref.source }} — {{ ref.citation }}
                </a>
                <a class="r-link" :href="ref.link" target="_blank" rel="noopener">{{ ramadan.labels.view_source }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section id="health" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🥗</span>
            {{ ramadan.health_food_tips.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.health_food_tips.intro }}</p>
        </div>
        <div id="section-health-body" class="r-section__body">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article
              v-for="(section, index) in ramadan.health_food_tips.primary_sections"
              :key="section.title"
              class="r-card r-card--health"
            >
              <span class="r-card__emoji" aria-hidden="true">{{ getEmoji("health", index) }}</span>
              <h3 class="r-card__title">{{ section.title }}</h3>
              <ul class="r-list">
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
          <div class="r-grid r-grid--double r-spacing-top">
            <article
              v-for="(section, index) in ramadan.health_food_tips.secondary_sections"
              :key="section.title"
              class="r-card r-card--health r-card--health-alt"
            >
              <span class="r-card__emoji" aria-hidden="true">{{ getEmoji("health", index + 3) }}</span>
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
      </div>
    </section>

    <section id="duas" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🤲</span>
            {{ ramadan.duas_prayers.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.duas_prayers.intro }}</p>
        </div>
        <div id="section-duas-body" class="r-section__body">
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
                <a class="r-story-duration" :href="dua.link" target="_blank" rel="noopener">
                  {{ dua.reference }}
                </a>
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
      </div>
    </section>

    <section id="shorts" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🎥</span>
            {{ ramadan.shorts.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.shorts.subtitle }}</p>
        </div>
        <div id="section-shorts-body" class="r-section__body">
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
      </div>
    </section>

    <section id="tools" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🧮</span>
            {{ ramadan.tools_calculators.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.tools_calculators.subtitle }}</p>
        </div>
        <div id="section-tools-body" class="r-section__body">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article
              v-for="(tool, index) in ramadan.tools_calculators.tools"
              :key="tool.title"
              class="r-card r-card--tool"
            >
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
                <span class="r-card__emoji r-card__emoji--inline" aria-hidden="true">{{ getEmoji("tools", index) }}</span>
                <h3 class="r-card__title">{{ tool.title }}</h3>
                <p class="r-card__desc">{{ tool.description }}</p>
              </div>
              <a :href="tool.link" class="r-link" target="_blank" rel="noopener">
                {{ ramadan.labels.open_tool }}
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="platforms" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🌐</span>
            {{ ramadan.platform_resources.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.platform_resources.subtitle }}</p>
        </div>
        <div id="section-platforms-body" class="r-section__body">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article
              v-for="(card, index) in ramadan.platform_resources.cards"
              :key="card.title"
              class="r-card r-card--resource"
            >
              <span class="r-card__emoji" aria-hidden="true">{{ getEmoji("platforms", index) }}</span>
              <h3 class="r-card__title">{{ card.title }}</h3>
              <ul class="r-list">
                <li v-for="item in card.items" :key="item.label">
                  <a class="r-resource-link" :href="item.link" target="_blank" rel="noopener">{{ item.label }}</a>
                </li>
              </ul>
            </article>
          </div>
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
      <div class="modal-dialog modal-xl modal-dialog-centered">
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
                        <a class="r-story-duration" :href="item.resource" target="_blank" rel="noopener">
                          {{ item.reference }}
                        </a>
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
import { fetchUserIdFromApi } from "../utils/bookmarkAuth";

export default {
  name: "Ramadan2026Component",
  data() {
    return {
      ramadan: ramadanData,
      heroImageOverride: null,
      heroImageFallback: "/images/banner-photo-800.webp",
      calendarStartOverride: "",
      calendarLength: 30,
      selectedDayIndex: 0,
      dayNotes: {},
      reminderDraft: {
        title: "",
        dayNumber: 1,
        timeOfDay: "maghrib",
        note: "",
      },
      reminders: [],
      reflectionDraft: {
        name: "",
        mood: "Grateful",
        text: "",
      },
      reflections: [],
      isAuthenticated: false,
      authResolved: false,
      userId: null,
      authRefreshHandler: null,
      personalPlanExpanded: {},
      quranPlanExpanded: {},
      emojiPalettes: {
        timeline: ["🕌", "📜", "🌙", "🤲", "🕰️", "✨"],
        fasting: ["🥣", "🧂", "🚰", "🌤️", "🧘", "✨"],
        quran: ["📖", "🧭", "🗂️", "✨"],
        personal: ["🎯", "👥", "🏡", "🌿", "🧠", "✨"],
        health: ["🥗", "💧", "💤", "🏃", "🍋", "✨"],
        tools: ["🧮", "📍", "🕌", "🧭", "🗺️", "✨"],
        platforms: ["🌐", "🎓", "📺", "📚", "📍", "✨"],
      },
      timeOfDayOptions: [
        { value: "suhoor", label: "Suhoor (pre-dawn)" },
        { value: "fajr", label: "Fajr" },
        { value: "dhuhr", label: "Dhuhr" },
        { value: "asr", label: "Asr" },
        { value: "maghrib", label: "Maghrib / Iftar" },
        { value: "isha", label: "Isha / Taraweeh" },
        { value: "night", label: "Late night" },
      ],
      reflectionMoods: ["Grateful", "Hopeful", "Focused", "Peaceful", "Motivated"],
    };
  },
  async mounted() {
    await this.initializeAuthentication();
    this.loadPlannerState();
    this.selectTodayOrFirst();
    if (typeof window !== "undefined") {
      this.authRefreshHandler = this.refreshAuthState.bind(this);
      window.addEventListener("focus", this.authRefreshHandler);
      document.addEventListener("visibilitychange", this.authRefreshHandler);
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined" && this.authRefreshHandler) {
      window.removeEventListener("focus", this.authRefreshHandler);
      document.removeEventListener("visibilitychange", this.authRefreshHandler);
    }
  },
  unmounted() {
    if (typeof window !== "undefined" && this.authRefreshHandler) {
      window.removeEventListener("focus", this.authRefreshHandler);
      document.removeEventListener("visibilitychange", this.authRefreshHandler);
    }
  },
  computed: {
    heroImage() {
      return this.heroImageOverride || this.ramadan.header.banner_image || this.heroImageFallback;
    },
    navLinks() {
      const extra = { label: "Planner", href: "#planner" };
      return [...this.ramadan.nav_links, extra];
    },
    calendarStartDate() {
      const override = this.parseISODate(this.calendarStartOverride);
      if (override) return override;
      const fallback = this.findDefaultStartDate();
      return fallback || new Date();
    },
    importantDateMap() {
      const map = {};
      const dates = this.ramadan.important_dates?.dates || [];
      dates.forEach((entry) => {
        const parsed = this.parseLooseDate(entry.gregorian_date);
        if (!parsed) return;
        const key = this.toDateKey(parsed);
        if (!map[key]) map[key] = [];
        map[key].push({ event: entry.event, type: entry.type });
      });
      return map;
    },
    calendarDays() {
      const days = [];
      const start = this.calendarStartDate;
      if (!start || Number.isNaN(start.getTime())) return days;
      const todayKey = this.toDateKey(new Date());
      for (let i = 0; i < this.calendarLength; i += 1) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const key = this.toDateKey(date);
        const events = this.importantDateMap[key] || [];
        const eventLabel = events.map((item) => item.event).join(" / ");
        days.push({
          key,
          date,
          dayNumber: i + 1,
          event: eventLabel || "",
          isToday: key === todayKey,
          type: events[0]?.type || "",
        });
      }
      return days;
    },
    selectedDay() {
      return this.calendarDays[this.selectedDayIndex] || null;
    },
    selectedDayNote: {
      get() {
        if (!this.selectedDay || !this.isAuthenticated) return "";
        return this.dayNotes[this.selectedDay.dayNumber] || "";
      },
      set(value) {
        if (!this.selectedDay || !this.isAuthenticated) return;
        this.dayNotes = {
          ...this.dayNotes,
          [this.selectedDay.dayNumber]: value,
        };
        this.persistDayNotes();
      },
    },
    dayOptions() {
      return Array.from({ length: this.calendarLength }, (_, index) => index + 1);
    },
    sortedReminders() {
      const timeOrder = this.timeOfDayOptions.map((option) => option.value);
      return [...this.reminders].sort((a, b) => {
        if (a.dayNumber !== b.dayNumber) return a.dayNumber - b.dayNumber;
        return timeOrder.indexOf(a.timeOfDay) - timeOrder.indexOf(b.timeOfDay);
      });
    },
    personalPlansCount() {
      return this.ramadan.personal_plans?.plans?.length || 0;
    },
    areAllPersonalPlansExpanded() {
      if (!this.personalPlansCount) return true;
      return Array.from({ length: this.personalPlansCount }).every((_, index) => !!this.personalPlanExpanded[index]);
    },
    quranPlansCount() {
      return this.ramadan.quran_reading_plans?.plans?.length || 0;
    },
    areAllQuranPlansExpanded() {
      if (!this.quranPlansCount) return true;
      return Array.from({ length: this.quranPlansCount }).every((_, index) => !!this.quranPlanExpanded[index]);
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
    formatShortDate(value) {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    },
    async initializeAuthentication() {
      const id = await fetchUserIdFromApi();
      this.userId = id;
      this.isAuthenticated = !!id;
      this.authResolved = true;
    },
    async refreshAuthState() {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      const previousUserId = this.userId;
      const wasAuthenticated = this.isAuthenticated;
      await this.initializeAuthentication();
      if (previousUserId !== this.userId || wasAuthenticated !== this.isAuthenticated) {
        this.loadPlannerState();
        this.selectTodayOrFirst();
      }
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
    getEmoji(palette, index) {
      const list = this.emojiPalettes?.[palette] || [];
      if (!list.length) return "✨";
      return list[index % list.length];
    },
    dateEmoji(type) {
      const map = {
        start: "🌙",
        special: "✨",
        eid: "🎉",
      };
      return map[type] || "🗓️";
    },
    parseISODate(value) {
      if (!value) return null;
      const parts = String(value).split("-");
      if (parts.length === 3) {
        const [year, month, day] = parts.map((part) => Number(part));
        const parsed = new Date(year, month - 1, day);
        if (!Number.isNaN(parsed.getTime())) return parsed;
      }
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) return null;
      return parsed;
    },
    parseLooseDate(value) {
      if (!value) return null;
      const match = String(value).match(/[A-Za-z]+ \d{1,2}, \d{4}/);
      const parsed = new Date(match ? match[0] : value);
      if (Number.isNaN(parsed.getTime())) return null;
      return parsed;
    },
    toDateKey(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    findDefaultStartDate() {
      const dates = this.ramadan.important_dates?.dates || [];
      const match = dates.find((entry) => /first day of ramadan/i.test(entry.event));
      return this.parseLooseDate(match?.gregorian_date);
    },
    selectTodayOrFirst() {
      const todayIndex = this.calendarDays.findIndex((day) => day.isToday);
      this.selectedDayIndex = todayIndex >= 0 ? todayIndex : 0;
      if (this.selectedDay) {
        this.reminderDraft.dayNumber = this.selectedDay.dayNumber;
      }
    },
    selectDay(index) {
      this.selectedDayIndex = index;
      if (this.selectedDay) {
        this.reminderDraft.dayNumber = this.selectedDay.dayNumber;
      }
    },
    isPersonalPlanExpanded(index) {
      return !!this.personalPlanExpanded[index];
    },
    togglePersonalPlan(index) {
      this.personalPlanExpanded = {
        ...this.personalPlanExpanded,
        [index]: !this.personalPlanExpanded[index],
      };
    },
    toggleAllPersonalPlans() {
      const nextValue = !this.areAllPersonalPlansExpanded;
      const expanded = {};
      for (let i = 0; i < this.personalPlansCount; i += 1) {
        expanded[i] = nextValue;
      }
      this.personalPlanExpanded = expanded;
    },
    isQuranPlanExpanded(index) {
      return !!this.quranPlanExpanded[index];
    },
    toggleQuranPlan(index) {
      this.quranPlanExpanded = {
        ...this.quranPlanExpanded,
        [index]: !this.quranPlanExpanded[index],
      };
    },
    toggleAllQuranPlans() {
      const nextValue = !this.areAllQuranPlansExpanded;
      const expanded = {};
      for (let i = 0; i < this.quranPlansCount; i += 1) {
        expanded[i] = nextValue;
      }
      this.quranPlanExpanded = expanded;
    },
    addReminder() {
      if (!this.isAuthenticated) return;
      if (!this.reminderDraft.title) return;
      const reminder = {
        id: `reminder-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        title: this.reminderDraft.title,
        dayNumber: this.reminderDraft.dayNumber,
        timeOfDay: this.reminderDraft.timeOfDay,
        note: this.reminderDraft.note,
        done: false,
      };
      this.reminders = [...this.reminders, reminder];
      this.persistReminders();
      this.reminderDraft = {
        title: "",
        dayNumber: this.reminderDraft.dayNumber,
        timeOfDay: this.reminderDraft.timeOfDay,
        note: "",
      };
    },
    removeReminder(id) {
      if (!this.isAuthenticated) return;
      this.reminders = this.reminders.filter((reminder) => reminder.id !== id);
      this.persistReminders();
    },
    formatTimeLabel(value) {
      const match = this.timeOfDayOptions.find((option) => option.value === value);
      return match ? match.label : value;
    },
    addReflection() {
      if (!this.isAuthenticated) return;
      if (!this.reflectionDraft.text) return;
      const reflection = {
        id: `reflection-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        name: this.reflectionDraft.name,
        mood: this.reflectionDraft.mood,
        text: this.reflectionDraft.text,
        timestamp: Date.now(),
      };
      this.reflections = [reflection, ...this.reflections];
      this.persistReflections();
      this.reflectionDraft = {
        name: "",
        mood: this.reflectionDraft.mood,
        text: "",
      };
    },
    formatRelativeTime(timestamp) {
      if (!timestamp) return "";
      const diff = Date.now() - timestamp;
      const seconds = Math.floor(diff / 1000);
      if (seconds < 45) return "just now";
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} min ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hr ago`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    },
    persistCalendar() {
      if (this.calendarLength < 1) return;
      if (this.selectedDayIndex >= this.calendarLength) {
        this.selectedDayIndex = this.calendarLength - 1;
      }
      this.reminderDraft.dayNumber = Math.min(
        Math.max(this.reminderDraft.dayNumber, 1),
        this.calendarLength
      );
      if (typeof window === "undefined") return;
      window.localStorage.setItem(
        "ramadan2026.calendar",
        JSON.stringify({
          start: this.calendarStartOverride,
          length: this.calendarLength,
        })
      );
    },
    persistDayNotes() {
      if (!this.isAuthenticated) return;
      const key = this.getUserStorageKey("dayNotes");
      if (!key || typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(this.dayNotes));
    },
    persistReminders() {
      if (!this.isAuthenticated) return;
      const key = this.getUserStorageKey("reminders");
      if (!key || typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(this.reminders));
    },
    persistReflections() {
      if (!this.isAuthenticated) return;
      const key = this.getUserStorageKey("reflections");
      if (!key || typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(this.reflections));
    },
    getUserStorageKey(suffix) {
      if (!this.userId) return null;
      return `ramadan2026.${suffix}.${this.userId}`;
    },
    loadPlannerState() {
      if (typeof window === "undefined") return;
      try {
        const calendarStored = JSON.parse(window.localStorage.getItem("ramadan2026.calendar") || "{}");
        if (calendarStored?.start) this.calendarStartOverride = calendarStored.start;
        if (calendarStored?.length) this.calendarLength = Number(calendarStored.length) || this.calendarLength;
        if (this.isAuthenticated) {
          const notesKey = this.getUserStorageKey("dayNotes");
          const notesStored = JSON.parse(window.localStorage.getItem(notesKey) || "{}");
          if (notesStored && typeof notesStored === "object") {
            this.dayNotes = notesStored;
          }
        } else {
          this.dayNotes = {};
        }
        if (this.isAuthenticated) {
          const remindersKey = this.getUserStorageKey("reminders");
          const reflectionsKey = this.getUserStorageKey("reflections");
          const remindersStored = JSON.parse(window.localStorage.getItem(remindersKey) || "[]");
          if (Array.isArray(remindersStored)) {
            this.reminders = remindersStored;
          }
          const reflectionsStored = JSON.parse(window.localStorage.getItem(reflectionsKey) || "[]");
          if (Array.isArray(reflectionsStored)) {
            this.reflections = reflectionsStored;
          }
        } else {
          this.reminders = [];
          this.reflections = [];
        }
      } catch (error) {
        this.reminders = [];
        this.reflections = [];
        this.dayNotes = {};
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700&display=swap");

.ramadan-2026 {
  --r-ink: #1b1f2a;
  --r-ink-soft: #4a5060;
  --r-accent: #d7a64a;
  --r-accent-deep: #b8832e;
  --r-deep: #0f2230;
  --r-mist: #f6f1ea;
  --r-sage: #4c7260;
  --r-rose: #c98c78;
  --r-card: #ffffff;
  --r-line: rgba(27, 31, 42, 0.08);
  --r-shadow: 0 28px 70px rgba(10, 17, 26, 0.18);
  --r-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --r-hover-lift: -6px;
  --r-hover-shadow: 0 26px 60px rgba(15, 34, 48, 0.18);
  --r-hover-ring: 0 0 0 1px rgba(215, 166, 74, 0.25);
  --r-hover-border: rgba(215, 166, 74, 0.45);
  --r-radius: 24px;
  font-family: "Manrope", "Segoe UI", sans-serif;
  color: var(--r-ink);
  background: linear-gradient(180deg, #0f2230 0%, #132c3b 12%, #f6f1ea 35%, #f6f1ea 100%);
}

.ramadan-2026 * {
  box-sizing: border-box;
}

.r-hero {
  position: relative;
  padding: 96px 0 80px;
  overflow: hidden;
  color: #fdf7ef;
  background: radial-gradient(circle at 10% 10%, rgba(255, 229, 188, 0.45), transparent 45%),
    radial-gradient(circle at 85% 15%, rgba(185, 220, 225, 0.45), transparent 45%),
    linear-gradient(140deg, #173247, #2a5264 55%, #3f6a78);
}

.r-hero__backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255, 215, 155, 0.35), transparent 45%),
    radial-gradient(circle at 78% 12%, rgba(150, 205, 212, 0.35), transparent 45%),
    linear-gradient(140deg, rgba(18, 40, 54, 0.75), rgba(26, 54, 70, 0.45));
  pointer-events: none;
}

.r-hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 48px;
  align-items: center;
  z-index: 1;
}

.r-hero__content {
  display: grid;
  gap: 16px;
}

.r-hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.24em;
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(253, 247, 239, 0.7);
}

.r-hero__title {
  font-family: "Fraunces", serif;
  font-size: clamp(2.8rem, 4.6vw, 4.6rem);
  line-height: 1.04;
  margin: 0;
  color: #ffffff;
}

.r-hero__subtitle {
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(253, 247, 239, 0.85);
}

.r-hero__lead {
  font-size: 1.05rem;
  max-width: 560px;
  color: rgba(253, 247, 239, 0.78);
}

.r-hero__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.r-hero__card {
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
}

.r-hero__label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: rgba(253, 247, 239, 0.7);
  display: block;
  margin-bottom: 8px;
}

.r-hero__sources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.r-hero__source {
  color: rgba(253, 247, 239, 0.9);
  text-decoration: none;
  font-weight: 600;
}

.r-hero__source:not(:last-child)::after {
  content: ",";
  margin-left: 4px;
  color: rgba(253, 247, 239, 0.65);
}

.r-hero__source:hover {
  color: #ffffff;
}

.r-hero__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.r-hero__pill {
  border-radius: 999px;
  padding: 7px 14px;
  background: rgba(255, 255, 255, 0.1);
  color: #fdf7ef;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.88rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.2s ease;
}

.r-hero__pill:hover {
  color: #0f2230;
  background: #fdf7ef;
}

.r-hero__media {
  display: grid;
  gap: 18px;
  align-items: center;
}

.r-hero__frame {
  position: relative;
  padding: 22px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--r-shadow);
}

.r-hero__image {
  width: 100%;
  max-height: 520px;
  border-radius: 24px 6px 24px 6px;
  object-fit: cover;
}

.r-hero__glow {
  position: absolute;
  inset: 18px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.r-hero__note {
  background: rgba(253, 247, 239, 0.92);
  padding: 14px 16px;
  border-radius: 16px;
  font-size: 0.95rem;
  color: #1b1f2a;
  border: 1px solid rgba(15, 34, 48, 0.15);
  box-shadow: 0 12px 30px rgba(15, 34, 48, 0.2);
}

.r-section {
  padding: 80px 0;
  position: relative;
  overflow: hidden;
  --r-ornament-1: none;
  --r-ornament-2: none;
}

.r-section::before,
.r-section::after {
  content: "";
  position: absolute;
  width: 360px;
  height: 360px;
  background: var(--r-ornament-1);
  opacity: 0.5;
  pointer-events: none;
}

.r-section::before {
  top: -140px;
  right: -140px;
}

.r-section::after {
  bottom: -160px;
  left: -160px;
  background: var(--r-ornament-2);
  opacity: 0.45;
}

.r-section .container {
  position: relative;
  z-index: 1;
}

#overview.r-section {
  background: #fff6ea;
  --r-ornament-1: radial-gradient(circle, rgba(215, 166, 74, 0.35), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(76, 114, 96, 0.25), transparent 70%);
}

.r-section--alt {
  background: #fdf9f3;
}

#history.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(111, 153, 164, 0.32), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(201, 140, 120, 0.25), transparent 70%);
}

#key-dates.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(215, 166, 74, 0.3), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(15, 34, 48, 0.15), transparent 70%);
}

#planner.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(76, 114, 96, 0.3), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(215, 166, 74, 0.24), transparent 70%);
}

#how-to-fast.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(201, 140, 120, 0.28), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(111, 153, 164, 0.2), transparent 70%);
}

#quran-plans.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(215, 166, 74, 0.28), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(76, 114, 96, 0.22), transparent 70%);
}

#personal-plans.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(111, 153, 164, 0.25), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(201, 140, 120, 0.22), transparent 70%);
}

#charity.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(215, 166, 74, 0.28), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(201, 140, 120, 0.2), transparent 70%);
}

#health.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(76, 114, 96, 0.28), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(111, 153, 164, 0.2), transparent 70%);
}

#duas.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(201, 140, 120, 0.25), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(15, 34, 48, 0.12), transparent 70%);
}

#shorts.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(111, 153, 164, 0.25), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(215, 166, 74, 0.2), transparent 70%);
}

#tools.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(76, 114, 96, 0.25), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(215, 166, 74, 0.18), transparent 70%);
}

#platforms.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(201, 140, 120, 0.2), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(111, 153, 164, 0.2), transparent 70%);
}

#faq.r-section {
  --r-ornament-1: radial-gradient(circle, rgba(215, 166, 74, 0.26), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(15, 34, 48, 0.12), transparent 70%);
}

.r-section__head {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 34px;
}

.r-section__controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.r-section__body {
  display: block;
}

.r-section__title {
  font-family: "Fraunces", serif;
  font-size: clamp(2.1rem, 3vw, 3rem);
  margin: 0;
  color: var(--r-deep);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.r-emoji {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.r-emoji--title {
  font-size: 1.6rem;
  line-height: 1;
}

.r-card__emoji {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 1.05rem;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(15, 34, 48, 0.12);
  box-shadow: 0 10px 22px rgba(15, 34, 48, 0.08);
  margin-bottom: 12px;
}

.r-card__emoji--tag {
  margin-left: 8px;
  margin-bottom: 0;
  font-size: 0.85rem;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.6);
}

.r-card__emoji--inline {
  margin-bottom: 6px;
}

.r-card__head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.r-card__head-text {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.r-section__subtitle {
  color: var(--r-ink-soft);
  max-width: 820px;
}

.r-overview__lead {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--r-deep);
  max-width: 900px;
}

.r-overview__body {
  font-size: 1.05rem;
  color: var(--r-ink-soft);
  max-width: 860px;
}

.r-overview__list {
  margin-top: 22px;
  padding-left: 22px;
  display: grid;
  gap: 10px;
  max-width: 760px;
}

.r-grid {
  display: grid;
  gap: 26px;
}

.r-grid--timeline {
  position: relative;
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
  background: var(--r-card);
  border-radius: var(--r-radius);
  padding: 26px;
  border: 1px solid var(--r-line);
  --r-card-accent: rgba(215, 166, 74, 0.35);
  border-top: 3px solid var(--r-card-accent);
  box-shadow: 0 16px 40px rgba(15, 34, 48, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  position: relative;
  overflow: hidden;
  transition: transform 0.28s var(--r-ease), box-shadow 0.28s var(--r-ease), border-color 0.28s var(--r-ease);
}

.r-hero__card,
.r-story-card,
.r-reminder,
.r-reflection,
.r-modal-card {
  transition: transform 0.28s var(--r-ease), box-shadow 0.28s var(--r-ease), border-color 0.28s var(--r-ease);
}

.r-card > * {
  position: relative;
  z-index: 1;
}

.r-card--timeline {
  padding-left: 34px;
  border-left: 4px solid rgba(215, 166, 74, 0.55);
  background: linear-gradient(135deg, #ffffff 0%, #fff4e2 100%);
  --r-card-accent: rgba(215, 166, 74, 0.6);
}

.r-card--timeline::before {
  content: "";
  position: absolute;
  left: 12px;
  top: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--r-accent);
  box-shadow: 0 0 0 6px rgba(215, 166, 74, 0.2);
  pointer-events: none;
  z-index: 0;
}

.r-card--timeline::after {
  content: "";
  position: absolute;
  right: -30px;
  top: -30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(76, 114, 96, 0.25), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.r-card--date {
  background: linear-gradient(180deg, #ffffff 0%, #fff9f0 100%);
  border-top: 3px solid rgba(215, 166, 74, 0.8);
  --r-card-accent: rgba(215, 166, 74, 0.8);
}

.r-card--date::after {
  content: "";
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15, 34, 48, 0.12), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.r-card--step {
  background: linear-gradient(135deg, #ffffff 0%, #fdf7f0 100%);
  --r-card-accent: rgba(201, 140, 120, 0.5);
}

.r-card--step::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(215, 166, 74, 0.18) 1px, transparent 1px);
  background-size: 22px 22px;
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}

.r-card--plan {
  background: linear-gradient(135deg, #ffffff 0%, #f3f7f6 100%);
  --r-card-accent: rgba(111, 153, 164, 0.55);
}

.r-card--plan::after {
  content: "";
  position: absolute;
  bottom: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(111, 153, 164, 0.25), transparent);
  pointer-events: none;
  z-index: 0;
}

.r-card--persona {
  background: linear-gradient(135deg, #ffffff 0%, #fef4ed 100%);
  border: 1px solid rgba(201, 140, 120, 0.2);
  --r-card-accent: rgba(201, 140, 120, 0.55);
}

.r-card--persona::after {
  content: "";
  position: absolute;
  top: 16px;
  right: 16px;
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(201, 140, 120, 0.25), transparent);
  pointer-events: none;
  z-index: 0;
}

.r-card--charity {
  background: linear-gradient(135deg, #ffffff 0%, #fff4e7 100%);
  border: 1px solid rgba(215, 166, 74, 0.2);
  --r-card-accent: rgba(215, 166, 74, 0.55);
}

.r-card--charity-alt {
  background: linear-gradient(135deg, #ffffff 0%, #f7f1ea 100%);
  border: 1px solid rgba(201, 140, 120, 0.2);
  --r-card-accent: rgba(201, 140, 120, 0.5);
}

.r-card--health {
  background: linear-gradient(135deg, #ffffff 0%, #f0f6f3 100%);
  border: 1px solid rgba(76, 114, 96, 0.2);
  --r-card-accent: rgba(76, 114, 96, 0.55);
}

.r-card--health-alt {
  background: linear-gradient(135deg, #ffffff 0%, #eef5f6 100%);
  border: 1px solid rgba(111, 153, 164, 0.2);
  --r-card-accent: rgba(111, 153, 164, 0.55);
}

.r-card--resource {
  background: linear-gradient(135deg, #ffffff 0%, #f2f8f7 100%);
  border: 1px solid rgba(76, 114, 96, 0.2);
  --r-card-accent: rgba(76, 114, 96, 0.45);
}

.r-card--faq {
  background: linear-gradient(135deg, #ffffff 0%, #f8f1e6 100%);
  border: 1px solid rgba(215, 166, 74, 0.18);
  --r-card-accent: rgba(215, 166, 74, 0.5);
}

.r-faq-question {
  margin-bottom: 12px;
}

.r-faq-answer {
  max-width: 520px;
}

.r-card__tag {
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  margin-bottom: 16px;
  background: rgba(215, 166, 74, 0.18);
  color: var(--r-accent-deep);
}

.r-card__tag--start {
  background: rgba(73, 125, 140, 0.16);
  color: #2f6b7a;
}

.r-card__tag--special {
  background: rgba(215, 166, 74, 0.2);
  color: var(--r-accent-deep);
}

.r-card__tag--eid {
  background: rgba(250, 221, 196, 0.8);
  color: #9a552f;
}

.r-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
}

.r-card__title--small {
  font-size: 1rem;
  margin-top: 16px;
}

.r-card__meta {
  font-weight: 600;
  color: var(--r-accent-deep);
}

.r-card__desc {
  color: var(--r-ink-soft);
  position: relative;
  z-index: 1;
}

.r-plan-details {
  display: grid;
  gap: 12px;
}

.r-card__toggle {
  align-self: flex-start;
  border: none;
  background: rgba(27, 31, 42, 0.08);
  color: var(--r-deep);
  font-weight: 700;
  font-size: 0.78rem;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.r-card__toggle:hover {
  background: rgba(27, 31, 42, 0.16);
  color: var(--r-accent-deep);
}

.r-list {
  padding-left: 18px;
  color: var(--r-ink-soft);
  position: relative;
  z-index: 1;
}

.r-link {
  font-weight: 700;
  color: var(--r-deep);
  text-decoration: none;
  white-space: nowrap;
}

.r-link:hover {
  color: var(--r-accent-deep);
}

.r-link--button {
  display: inline-flex;
  margin-top: 22px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(15, 34, 48, 0.2);
  background: #fff;
}

.r-link--button:hover {
  background: rgba(215, 166, 74, 0.15);
}

.r-chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(27, 31, 42, 0.08);
  color: var(--r-deep);
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
  padding: 16px;
  border-radius: 18px;
  background: rgba(27, 31, 42, 0.06);
  border: 1px solid rgba(27, 31, 42, 0.08);
}

.r-references {
  margin-top: 24px;
}

.r-reference-link {
  flex: 1;
  min-width: 0;
  color: var(--r-deep);
  text-decoration: none;
  font-weight: 600;
}

.r-reference-link:hover {
  color: var(--r-accent-deep);
}

.r-resource-link {
  color: var(--r-ink-soft);
  text-decoration: none;
  font-weight: 600;
}

.r-resource-link:hover {
  color: var(--r-accent-deep);
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
  font-family: "Fraunces", serif;
  font-size: 1.15rem;
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
  --r-card-accent: rgba(111, 153, 164, 0.5);
}

#tools .r-card--tool:nth-child(odd) {
  background: linear-gradient(135deg, #ffffff 0%, #f2f7f4 100%);
}

#tools .r-card--tool:nth-child(even) {
  background: linear-gradient(135deg, #ffffff 0%, #fff4e7 100%);
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
  background: rgba(27, 31, 42, 0.08);
  color: var(--r-deep);
  text-decoration: none;
  border: 1px solid rgba(27, 31, 42, 0.12);
}

.r-expand:hover {
  color: var(--r-accent-deep);
  border-color: rgba(215, 166, 74, 0.4);
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
  border-radius: 26px;
  padding: 22px;
  min-height: 220px;
  color: #0f1f1b;
  overflow: hidden;
  border: 1px solid rgba(15, 34, 48, 0.1);
  border-top: 3px solid rgba(111, 153, 164, 0.5);
  box-shadow: 0 20px 40px rgba(15, 34, 48, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.r-card--soft {
  background: linear-gradient(135deg, #ffffff 0%, #f7f4ef 100%);
  border: 1px solid rgba(15, 34, 48, 0.08);
}

.r-card--planner {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(253, 246, 234, 0.9));
  border: 1px solid rgba(215, 166, 74, 0.25);
}

.r-story-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--story-bg);
  background-size: cover;
  background-position: center;
  filter: saturate(0.9);
  opacity: 0.55;
}

.r-story-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.72));
}

.r-story-card--dua::before {
  opacity: 0.25;
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
  color: var(--r-accent-deep);
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
  text-decoration: none;
}

.r-story-link {
  font-weight: 700;
  color: var(--r-deep);
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
  margin-top: 30px;
}

.r-short-groups {
  display: grid;
  gap: 26px;
}

.r-short-group__title {
  margin-bottom: 12px;
  color: var(--r-deep);
}

.r-faq-grid {
  align-items: stretch;
}

.r-note {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(215, 166, 74, 0.14);
  color: var(--r-ink-soft);
}

.r-modal-grid {
  display: grid;
  gap: 22px;
}

.r-modal-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(16, 42, 34, 0.04);
}

.r-planner-card {
  display: grid;
  gap: 20px;
}

.r-planner-head {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: space-between;
  align-items: flex-start;
}

.r-planner-controls {
  display: grid;
  gap: 8px;
  min-width: 220px;
}

.r-planner-row + .r-planner-row {
  margin-top: 24px;
}

.r-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--r-ink-soft);
  font-weight: 700;
}

.r-input,
.r-select,
.r-textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid var(--r-line);
  background: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--r-ink);
}

.r-input:focus,
.r-select:focus,
.r-textarea:focus {
  outline: none;
  border-color: rgba(215, 166, 74, 0.55);
  box-shadow: 0 0 0 3px rgba(215, 166, 74, 0.18);
}

.r-textarea {
  resize: vertical;
  min-height: 88px;
}

.r-form {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.r-form__row {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.r-button {
  align-self: flex-start;
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: var(--r-accent);
  color: #1b1f2a;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.r-button--sm {
  padding: 6px 12px;
  font-size: 0.8rem;
}

.r-button:hover {
  background: var(--r-accent-deep);
  color: #ffffff;
}

.r-button--ghost {
  background: transparent;
  border: 1px solid rgba(27, 31, 42, 0.2);
  color: var(--r-deep);
}

.r-button--ghost:hover {
  background: rgba(27, 31, 42, 0.08);
  color: var(--r-deep);
}

.r-auth-gate {
  margin-top: 16px;
  padding: 16px;
  border-radius: 16px;
  border: 1px dashed rgba(27, 31, 42, 0.2);
  background: rgba(27, 31, 42, 0.03);
  display: grid;
  gap: 12px;
}

.r-auth-actions {
  display: flex;
  gap: 10px;
}

.r-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(27, 31, 42, 0.08);
  color: var(--r-deep);
  font-size: 0.7rem;
  font-weight: 700;
}

.r-calendar {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
}

.r-calendar__cell {
  border: 1px solid var(--r-line);
  border-radius: 14px;
  padding: 10px;
  min-height: 92px;
  text-align: left;
  background: #fff;
  display: grid;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.r-calendar__cell:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(15, 34, 48, 0.12);
}

.r-calendar__cell.is-selected {
  border-color: rgba(215, 166, 74, 0.8);
  box-shadow: 0 12px 26px rgba(215, 166, 74, 0.2);
}

.r-calendar__cell.is-today {
  border-color: rgba(47, 107, 122, 0.7);
}

.r-calendar__cell.is-special {
  background: rgba(253, 249, 243, 0.9);
}

.r-calendar__day {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--r-deep);
}

.r-calendar__date {
  font-size: 0.75rem;
  color: var(--r-ink-soft);
}

.r-calendar__event {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--r-accent-deep);
}

.r-calendar__detail {
  margin-top: 14px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(27, 31, 42, 0.08);
  background: rgba(27, 31, 42, 0.04);
  display: grid;
  gap: 10px;
}

.r-calendar__detail-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.r-calendar__detail-title {
  margin: 0;
  font-size: 1rem;
}

.r-calendar__event-chip {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(215, 166, 74, 0.2);
  color: var(--r-accent-deep);
  font-size: 0.7rem;
  font-weight: 700;
}

.r-stack-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.r-reminder-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.r-reminder {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px;
  border-radius: 16px;
  background: rgba(27, 31, 42, 0.04);
  border: 1px solid rgba(27, 31, 42, 0.08);
}

.r-reminder__body h4 {
  margin: 0 0 4px;
  font-size: 1rem;
}

.r-reminder__body h4.is-done {
  text-decoration: line-through;
  color: var(--r-ink-soft);
}

.r-reminder__body p {
  margin: 0;
  color: var(--r-ink-soft);
  font-size: 0.9rem;
}

.r-icon-button {
  border: none;
  background: none;
  color: var(--r-accent-deep);
  font-weight: 700;
  cursor: pointer;
}

.r-checkbox {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.r-checkbox input {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}

.r-checkbox span {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(27, 31, 42, 0.3);
  background: #fff;
  display: inline-block;
}

.r-checkbox input:checked + span {
  background: var(--r-accent);
  border-color: var(--r-accent-deep);
}

.r-reflection-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.r-reflection {
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(27, 31, 42, 0.08);
  background: rgba(253, 249, 243, 0.85);
}

.r-reflection__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--r-ink-soft);
  font-weight: 700;
  margin-bottom: 6px;
}

.r-reflection__name {
  color: var(--r-deep);
}

.r-reflection__mood {
  color: var(--r-accent-deep);
}

.r-empty {
  margin-top: 12px;
  color: var(--r-ink-soft);
  font-style: italic;
}

.ramadan-2026 :deep(.modal-dialog.modal-xl) {
  max-width: 1200px;
}

.ramadan-2026 :deep(.modal-content) {
  border-radius: 20px;
  border: 1px solid rgba(27, 31, 42, 0.12);
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
    padding: 60px 0;
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

  .r-calendar {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .r-grid--stagger > *:nth-child(odd) {
    margin-top: 8px;
  }

  .r-grid--stagger > *:nth-child(even) {
    margin-top: -6px;
  }
}

@media (hover: hover) {
  .r-card:hover,
  .r-story-card:hover,
  .r-hero__card:hover,
  .r-reminder:hover,
  .r-reflection:hover,
  .r-modal-card:hover {
    transform: translateY(var(--r-hover-lift));
    box-shadow: var(--r-hover-shadow), var(--r-hover-ring);
    border-color: var(--r-hover-border);
  }
}

@media (prefers-reduced-motion: reduce) {
  .r-animate {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .r-card,
  .r-hero__card,
  .r-story-card,
  .r-reminder,
  .r-reflection,
  .r-modal-card {
    transition: none;
  }
}
</style>
