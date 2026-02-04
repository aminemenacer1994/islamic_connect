<template>
  <div class="ramadan-2026">
    <header class="r-hero" id="top">
      <div class="r-hero__backdrop"></div>
      <div class="r-hero__inner">
        <div class="r-hero__grid">
          <div class="r-hero__content">
            <p class="r-hero__eyebrow r-animate" style="--delay: 0.05s;">{{ ramadan.page_title }}</p>
            <h1 class="r-hero__title r-animate" style="--delay: 0.12s;">{{ ramadan.header.title }}</h1>
            <p class="r-hero__subtitle r-animate" style="--delay: 0.18s;">{{ ramadan.header.subtitle }}</p>
            <div class="r-hero__subtext-wrap r-animate" style="--delay: 0.25s;">
              <p v-for="(line, index) in heroHighlights" :key="index" class="r-hero__subtext">
                {{ line }}
              </p>
            </div>
          </div>

          <div class="r-hero__media r-animate" style="--delay: 0.22s;">
            <div
              v-if="navSections.length"
              class="r-hero__section-grid r-animate"
              style="--delay: 0.36s;"
            >
              <article
                v-for="section in navSections"
                :key="section.title"
                class="r-hero__section-card"
              >
                <p class="r-hero__section-title">{{ section.title }}</p>
                <div class="r-hero__section-links">
                  <a
                    v-for="link in section.links"
                    :key="link.href"
                    class="r-hero__section-pill"
                    :href="link.href"
                  >
                    {{ link.label }}
                  </a>
                </div>
              </article>
            </div>
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
          <ReferenceList
            v-if="ramadan.overview.references"
            :items="ramadan.overview.references"
            :title="ramadan.labels.references"
            :action-label="ramadan.labels.view_source"
          />
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
            <span v-if="item.number" class="r-card__history-number">#{{ item.number }}</span>
            <h3 class="r-card__title">{{ item.period }}</h3>
            <p class="r-card__desc">{{ item.detail }}</p>
            <p v-if="item.reference" class="r-card__reference">{{ item.reference }}</p>
            <a
              v-if="item.reference_url"
              class="r-card__reference-link"
              :href="item.reference_url"
              target="_blank"
              rel="noreferrer noopener"
            >
              View source
            </a>
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
          <ReferenceList
            v-if="ramadan.history.references"
            :items="ramadan.history.references"
            :title="ramadan.labels.references"
            :action-label="ramadan.labels.view_source"
          />
        </div>
      </div>
    </section>

    <section id="interactive" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            <span class="r-emoji r-emoji--title" aria-hidden="true">🧩</span>
            Quran progress studio
          </h2>
          <p class="r-section__subtitle">
            Track your reading with simple goals and a planner-tied daily breakdown. Estimates are calculated from your
            inputs.
          </p>
        </div>
        <div id="section-interactive-body" class="r-section__body">
          <div v-if="!authResolved" class="r-empty">Checking login status...</div>
          <div v-else-if="!isAuthenticated" class="r-auth-gate">
            <p class="r-card__desc">
              Log in to personalize your Quran tracker. May Allah bless your journey and help you stay consistent.
            </p>
            <div class="r-auth-actions">
              <a class="r-button r-button--ghost" href="/login">Log in</a>
            </div>
          </div>
          <div v-else class="r-grid r-grid--double r-grid--stagger">
            <article class="r-card r-card--interactive r-animate" style="--delay: 0.05s;">
              <div class="r-interactive-stack">
                <div class="r-stack-head">
                  <h3 class="r-card__title">Quran reading progress 📖</h3>
                  <span class="r-badge">{{ quranProgressPercent }}% complete</span>
                </div>
                <p class="r-card__desc">
                  Choose a unit, set a pace, and track your progress day by day.
                </p>
                <p class="r-helper">Estimates use your daily goal and planner dates. Adjust totals to match your mushaf.</p>
                <div class="r-progress">
                  <div
                    class="r-progress__bar"
                    role="progressbar"
                    :aria-valuenow="quranProgressPercent"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <span class="r-progress__fill" :style="{ width: `${quranProgressPercent}%` }"></span>
                  </div>
                  <div class="r-progress__meta">
                    <span>{{ quranProgress.completed }} / {{ quranProgress.total }} {{ quranUnitLabel }}</span>
                    <span>{{ quranProgressRemaining }} {{ quranUnitLabel }} remaining</span>
                  </div>
                </div>
                <div class="r-form r-form--compact">
                  <div class="r-form__row">
                    <div>
                      <label class="r-label" for="quran-unit">Unit</label>
                      <select id="quran-unit" class="r-select" v-model="quranProgress.unit" @change="handleQuranUnitChange">
                        <option v-for="unit in quranUnits" :key="unit.value" :value="unit.value">{{ unit.label }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="r-label" for="quran-total">Total</label>
                      <input
                        id="quran-total"
                        class="r-input"
                        type="number"
                        min="1"
                        v-model.number="quranProgress.total"
                        @input="normalizeQuranProgress"
                      />
                    </div>
                    <div>
                      <label class="r-label" for="quran-completed">Completed</label>
                      <input
                        id="quran-completed"
                        class="r-input"
                        type="number"
                        min="0"
                        :max="quranProgress.total"
                        v-model.number="quranProgress.completed"
                        @input="normalizeQuranProgress"
                      />
                    </div>
                  </div>
                  <div class="r-form__row">
                    <div>
                      <label class="r-label" for="quran-goal">Daily goal</label>
                      <input
                        id="quran-goal"
                        class="r-input"
                        type="number"
                        min="0"
                        step="1"
                        v-model.number="quranProgress.dailyGoal"
                        @input="normalizeQuranProgress"
                      />
                    </div>
                    <div class="r-quick-add">
                      <span class="r-label">Quick add</span>
                      <div class="r-quick-add__buttons">
                        <button class="r-button r-button--ghost r-button--sm" type="button" @click="addQuranProgress(1)">
                          +1
                        </button>
                        <button class="r-button r-button--ghost r-button--sm" type="button" @click="addQuranProgress(3)">
                          +3
                        </button>
                        <button class="r-button r-button--ghost r-button--sm" type="button" @click="addQuranProgress(5)">
                          +5
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="r-note r-note--muted">
                  Page counts can vary by mushaf edition. Adjust totals if needed.
                </p>
                <div class="r-progress__footer">
                  <span v-if="quranProgressRemaining === 0">Completed 🎉</span>
                  <span v-else-if="quranProgressDaysLeft">
                    At this pace: ~{{ quranProgressDaysLeft }} day{{ quranProgressDaysLeft === 1 ? "" : "s" }} left
                  </span>
                  <span v-else>Set a daily goal to estimate your pace.</span>
                  <span class="r-progress__hint">Saved locally for your login.</span>
                </div>
                <div class="r-progress-insights">
                  <div>
                    <span class="r-mini-label">Days remaining</span>
                    <strong>{{ quranDaysRemaining }}</strong>
                  </div>
                  <div>
                    <span class="r-mini-label">Needed per day</span>
                    <strong>{{ quranDailyTargetNeeded }} {{ quranUnitLabel }}/day</strong>
                  </div>
                  <div>
                    <span class="r-mini-label">Est. completion</span>
                    <strong>{{ quranCompletionLabel }}</strong>
                  </div>
                </div>
              </div>
            </article>

            <article class="r-card r-card--interactive r-animate" style="--delay: 0.12s;">
              <div class="r-interactive-stack">
                <div class="r-stack-head">
                  <h3 class="r-card__title">Daily breakdown 🗓️</h3>
                  <span class="r-badge">{{ calendarLength }} days</span>
                </div>
                <p class="r-card__desc">
                  Tied to your planner dates. Targets use your daily goal or an even split across Ramadan.
                </p>
                <p class="r-helper">Daily totals update from your saved entries (including “Mark today complete”).</p>
                <div class="r-today-panel">
                  <div>
                    <span class="r-mini-label">Today's Progress</span>
                    <strong>{{ quranTodayRead }} / {{ quranTodayTarget }} {{ quranUnitLabel }}</strong>
                    <div class="r-today-meta">
                      <span>Remaining: {{ quranTodayRemaining }}</span>
                      <span v-if="quranTodayRemaining === 0" class="r-badge r-badge--good">Completed ✅</span>
                    </div>
                    <p v-if="quranTodayRemaining === 0" class="r-confirm">Completion saved for today.</p>
                  </div>
                  <div class="r-today-actions">
                    <span
                      class="r-tooltip"
                      aria-label="Uses your device date to define today."
                      title="Uses your device date to define today."
                    >
                      ℹ️
                    </span>
                    <button
                      class="r-button r-button--ghost r-button--sm"
                      type="button"
                      :disabled="!canMarkTodayComplete"
                      @click="markTodayComplete"
                    >
                      {{ quranTodayRemaining === 0 ? "Completed" : "Mark today complete" }}
                    </button>
                    <button
                      v-if="lastQuickAction"
                      class="r-chip r-chip--action"
                      type="button"
                      @click="undoLastQuickAction"
                    >
                      Undo
                    </button>
                  </div>
                </div>
                <div class="r-breakdown">
                  <div
                    v-for="day in quranBreakdownDays"
                    :key="day.key"
                    class="r-breakdown__row"
                    :class="{ 'is-today': day.isToday, 'is-selected': day.isSelected }"
                  >
                    <div>
                      <span class="r-breakdown__day">Day {{ day.dayNumber }}</span>
                      <span class="r-breakdown__date">{{ formatShortDate(day.date) }}</span>
                    </div>
                    <div class="r-breakdown__meta">
                      <span>🎯 {{ day.target }} {{ quranUnitLabel }}</span>
                      <span>📗 {{ day.read }} read</span>
                      <span class="r-badge" :class="breakdownStatusClass(day.status)">
                        {{ breakdownStatusLabel(day.status) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
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
              </article>
            </div>
          </div>
          <div class="row r-planner-row">
            <div class="col-12 col-md-6">
              <article class="ramadan-reminder-card">
                <div class="ramadan-reminder-card__head">
                  <div>
                    <p class="ramadan-reminder-eyebrow">Personal reminders</p>
                    <h3 class="ramadan-reminder-title">Stay present this Ramadan</h3>
                    <p class="ramadan-reminder-lead">
                      Build a mini schedule for suhoor, iftar, prayers, or goals. Reminders stay on this device.
                    </p>
                  </div>
                  <span class="ramadan-reminder-pill">{{ reminders.length }} saved</span>
                </div>
                <div v-if="!authResolved" class="ramadan-reminder-empty">Checking login status...</div>
                <div v-else-if="!isAuthenticated" class="ramadan-reminder-auth">
                  <p>Log in to create and view your saved personal reminders.</p>
                  <div class="ramadan-reminder-auth__actions">
                    <a class="ramadan-reminder-link" href="/login">Log in</a>
                  </div>
                </div>
                <div v-else>
                  <form class="ramadan-reminder-form" @submit.prevent="addReminder">
                    <div class="ramadan-reminder-form__row">
                      <input
                        class="ramadan-reminder-input"
                        v-model.trim="reminderDraft.title"
                        type="text"
                        placeholder="Reminder title"
                        required
                      />
                      <select class="ramadan-reminder-select" v-model.number="reminderDraft.dayNumber">
                        <option v-for="day in dayOptions" :key="day" :value="day">Day {{ day }}</option>
                      </select>
                    </div>
                    <div class="ramadan-reminder-form__row">
                      <select class="ramadan-reminder-select" v-model="reminderDraft.timeOfDay">
                        <option v-for="option in timeOfDayOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                      <input
                        class="ramadan-reminder-input"
                        v-model.trim="reminderDraft.note"
                        type="text"
                        placeholder="Optional note"
                      />
                    </div>
                    <button class="ramadan-reminder-submit" type="submit">Save reminder</button>
                  </form>
                  <div v-if="sortedReminders.length" class="ramadan-reminder-list">
                    <article
                      v-for="reminder in sortedReminders"
                      :key="reminder.id"
                      class="ramadan-reminder-item"
                    >
                      <div class="ramadan-reminder-item__status">
                        <label class="ramadan-checkbox">
                          <input type="checkbox" v-model="reminder.done" @change="persistReminders" />
                          <span></span>
                        </label>
                        <div>
                          <h4 :class="{ 'is-done': reminder.done }">{{ reminder.title }}</h4>
                          <p class="ramadan-reminder-meta">
                            Day {{ reminder.dayNumber }} - {{ formatTimeLabel(reminder.timeOfDay) }}
                          </p>
                          <p v-if="reminder.note" class="ramadan-reminder-note">{{ reminder.note }}</p>
                        </div>
                      </div>
                      <button
                        class="ramadan-reminder-remove"
                        type="button"
                        @click="removeReminder(reminder.id)"
                      >
                        Remove
                      </button>
                    </article>
                  </div>
                  <p v-else class="ramadan-reminder-empty">No reminders yet. Add your first one above.</p>
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
          <ReferenceList
            v-if="ramadan.how_to_fast.references"
            :items="ramadan.how_to_fast.references"
            :title="ramadan.labels.references"
            :action-label="ramadan.labels.view_source"
          />
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
          <ReferenceList
            v-if="ramadan.quran_reading_plans.references"
            :items="ramadan.quran_reading_plans.references"
            :title="ramadan.labels.references"
            :action-label="ramadan.labels.view_source"
          />
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
          <ReferenceList
            v-if="ramadan.charity_guide.references"
            :items="ramadan.charity_guide.references"
            :title="ramadan.labels.references"
            :action-label="ramadan.labels.view_source"
          />
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
                <span class="r-story-tag">{{ dua.source || ramadan.duas_prayers.tag_label }}</span>
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
        <div class="ramadan-short-hero">
          <div>
            <p class="ramadan-short-eyebrow">Quick inspiration for Ramadan</p>
            <h3 class="ramadan-short-hero__title">{{ ramadan.shorts.highlights_title }}</h3>
            <p class="ramadan-short-hero__lead">
              {{ ramadan.shorts.subtitle }}
            </p>
          </div>
          <div class="ramadan-short-pillset">
            <span class="ramadan-short-pill">Curated clips</span>
            <span class="ramadan-short-pill">Reminders ready</span>
            <span class="ramadan-short-pill">Shareable</span>
          </div>
        </div>

        <div class="ramadan-short-highlights">
          <article
            v-for="item in ramadan.shorts.highlights"
            :key="item.link"
            class="ramadan-short-card"
            :style="storyStyle(item.thumbnail)"
          >
            <div class="ramadan-short-card__content">
              <span class="ramadan-short-card__tag">{{ item.tag }}</span>
              <h3 class="ramadan-short-card__title">{{ item.title }}</h3>
              <p class="ramadan-short-card__desc">{{ item.description }}</p>
            </div>
            <div class="ramadan-short-card__footer">
              <a class="ramadan-short-card__link" :href="item.link" target="_blank" rel="noopener">
                {{ ramadan.labels.watch_short }}
              </a>
            </div>
          </article>
        </div>

        <div class="ramadan-short-groups">
          <div v-for="group in ramadan.shorts.groups" :key="group.title" class="ramadan-short-group">
            <div class="ramadan-short-group__head">
              <h4 class="ramadan-short-group__title">{{ group.title }}</h4>
              <p class="ramadan-short-group__subtitle">{{ ramadan.labels.explore_by_theme }}</p>
            </div>
            <div class="ramadan-short-group__grid">
              <article
                v-for="item in group.items"
                :key="item.link"
                class="ramadan-short-card ramadan-short-card--compact"
                :style="storyStyle(item.thumbnail)"
              >
                <div class="ramadan-short-card__content">
                  <span class="ramadan-short-card__tag">{{ item.tag }}</span>
                  <h3 class="ramadan-short-card__title">{{ item.title }}</h3>
                  <p class="ramadan-short-card__desc">{{ item.description }}</p>
                </div>
                <div class="ramadan-short-card__footer">
                  <a class="ramadan-short-card__link" :href="item.link" target="_blank" rel="noopener">
                    {{ ramadan.labels.watch_short }}
                  </a>
                </div>
              </article>
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
          <div v-if="ramadan.tools_calculators.intro" class="r-section__intro">
            <p v-for="(line, index) in ramadan.tools_calculators.intro" :key="index">{{ line }}</p>
          </div>
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
                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
              </a>
              <div class="r-card--tool__top-row">
              <div class="r-card--tool__icons">
                <i :class="['fas', tool.icon]" aria-hidden="true"></i>
              </div>
                <div class="r-card--tool__text">
                  <h3 class="r-card__title">{{ tool.title }}</h3>
                  <p class="r-card__desc">{{ tool.description }}</p>
                </div>
              </div>
              <p v-if="tool.detail" class="r-card__detail">{{ tool.detail }}</p>
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
            <div class="r-dua-modal-controls">
              <div class="r-dua-search">
                <label class="r-dua-search__label" for="duaSearchInput">
                  {{ ramadan.duas_prayers.search_label || "Search the dua library" }}
                </label>
                <input
                  id="duaSearchInput"
                  class="r-input r-input--search"
                  type="search"
                  v-model="duaSearchTerm"
                  placeholder="Search by purpose, Arabic, or reference"
                  autocomplete="off"
                />
                <p class="r-dua-search__hint">Highlights refresh as you type and show every matching word.</p>
              </div>
              <div class="r-dua-filters" role="group" aria-label="Filter duas">
                <div class="r-dua-filter-group">
                  <label class="r-dua-filter-label" for="duaSourceSelect">Source</label>
                  <select id="duaSourceSelect" class="r-select" v-model="duaSourceFilter">
                    <option v-for="filter in duaSourceFilters" :key="filter.value" :value="filter.value">
                      {{ filter.label }}
                    </option>
                  </select>
                </div>
                <div class="r-dua-filter-group">
                  <label class="r-dua-filter-label" for="duaSectionSelect">Section</label>
                  <select id="duaSectionSelect" class="r-select" v-model="duaSectionFilter">
                    <option v-for="filter in duaSectionFilters" :key="filter.value" :value="filter.value">
                      {{ filter.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div v-if="!filteredDuaSections.length" class="r-dua-empty">
              <p>No matching supplications were found. Try clearing the search or changing the filter.</p>
              <button type="button" class="r-link" @click="resetDuaFilters">Reset filters</button>
            </div>

            <div v-else class="r-modal-grid">
              <div
                v-for="section in filteredDuaSections"
                :key="section.title"
                class="r-modal-card"
              >
                <h3>{{ section.title }}</h3>
                <div class="r-story-grid r-story-grid--modal">
                  <article
                    v-for="item in section.items"
                    :key="`${item.name}-${item.reference}`"
                    class="r-story-card r-story-card--dua"
                  >
                    <div class="r-story-content">
                      <span class="r-story-tag">{{ item.source || ramadan.duas_prayers.tag_label }}</span>
                      <h4 class="r-story-title" v-html="highlightDuaText(item.name)"></h4>
                      <p class="r-arabic" dir="rtl" v-html="highlightDuaText(item.arabic)"></p>
                      <p class="r-translit" v-html="highlightDuaText(item.transliteration)"></p>
                      <p class="r-story-desc" v-html="highlightDuaText(item.translation)"></p>
                      <div class="r-story-meta">
                        <a
                          class="r-story-duration"
                          :href="item.resource"
                          target="_blank"
                          rel="noopener"
                          v-html="highlightDuaText(item.reference)"
                        ></a>
                        <a class="r-story-link" :href="item.resource" target="_blank" rel="noopener">
                          {{ ramadan.labels.resource_label }}
                        </a>
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
  <button
    v-if="showFab"
    class="r-fab"
    type="button"
    @click="scrollToTop"
    aria-label="Scroll back to top"
    title="Scroll back to top"
  >
    <span aria-hidden="true">⬆</span>
  </button>
</div>
</template>

<script>
import ramadanData from "./data/ramadan_2026.json";
import ReferenceList from "./ReferenceList.vue";
import { fetchUserIdFromApi } from "../utils/bookmarkAuth";

export default {
  name: "Ramadan2026Component",
  components: {
    ReferenceList,
  },
  data() {
    return {
    ramadan: ramadanData,
      duaSearchTerm: "",
      duaSourceFilter: "all",
      duaSectionFilter: "all",
      heroImageOverride: null,
      heroImageFallback: "/images/banner-photo-800.webp",
      calendarStartOverride: "",
      calendarLength: 30,
      selectedDayIndex: 0,
      showFab: false,
      fabVisibilityHandler: null,
      reminderDraft: {
        title: "",
        dayNumber: 1,
        timeOfDay: "maghrib",
        note: "",
      },
      heroHighlights: [
        "Complete Ramadan 1447 AH (2026 CE) guide with dates, prayer cues, health tips, and trusted tools.",
        "Planner-driven reminders, Quran tracking, and community reflections keep you consistent through the month.",
      ],
      reminders: [],
      reflectionDraft: {
        name: "",
        mood: "Grateful",
        text: "",
      },
      reflections: [],
      quranUnits: [
        { value: "pages", label: "Pages (614)" },
        { value: "juz", label: "Juz (30)" },
        { value: "surahs", label: "Surahs (114)" },
      ],
      quranProgress: {
        unit: "pages",
        total: 614,
        completed: 0,
        dailyGoal: 20,
      },
      quranSessions: [],
      lastQuickAction: null,
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
    this.loadInteractiveState();
    this.selectTodayOrFirst();
    if (typeof window !== "undefined") {
      this.authRefreshHandler = this.refreshAuthState.bind(this);
      window.addEventListener("focus", this.authRefreshHandler);
      document.addEventListener("visibilitychange", this.authRefreshHandler);
      this.fabVisibilityHandler = this.updateFabVisibility;
      window.addEventListener("scroll", this.fabVisibilityHandler);
      window.addEventListener("resize", this.fabVisibilityHandler);
      this.updateFabVisibility();
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined" && this.authRefreshHandler) {
      window.removeEventListener("focus", this.authRefreshHandler);
      document.removeEventListener("visibilitychange", this.authRefreshHandler);
    }
    if (typeof window !== "undefined" && this.fabVisibilityHandler) {
      window.removeEventListener("scroll", this.fabVisibilityHandler);
      window.removeEventListener("resize", this.fabVisibilityHandler);
      this.fabVisibilityHandler = null;
    }
  },
  unmounted() {
    if (typeof window !== "undefined" && this.authRefreshHandler) {
      window.removeEventListener("focus", this.authRefreshHandler);
      document.removeEventListener("visibilitychange", this.authRefreshHandler);
    }
    if (typeof window !== "undefined" && this.fabVisibilityHandler) {
      window.removeEventListener("scroll", this.fabVisibilityHandler);
      window.removeEventListener("resize", this.fabVisibilityHandler);
      this.fabVisibilityHandler = null;
    }
  },
  computed: {
    heroImage() {
      return this.heroImageOverride || this.ramadan.header.banner_image || this.heroImageFallback;
    },
    navPrimaryLinks() {
      return [
        { label: "Interactive tools", href: "#interactive" },
        { label: "Planner", href: "#planner" },
      ];
    },
    navSections() {
      const foundationLabels = new Set([
        "What is Ramadan",
        "History",
        "Key dates",
        "How to fast",
        "FAQ",
      ]);
      const resourceLabels = new Set([
        "Quran plans",
        "Personal plans",
        "Charity",
        "Health tips",
        "Duas",
        "Short clips",
        "Tools",
      ]);
      const sections = [];
      const baseLinks = Array.isArray(this.ramadan.nav_links) ? this.ramadan.nav_links : [];
      const foundations = [];
      const resources = [];

      baseLinks.forEach((link) => {
        if (foundationLabels.has(link.label)) {
          foundations.push(link);
        } else {
          resources.push(link);
        }
      });

      if (foundations.length) {
        sections.push({ title: "Foundations", links: foundations });
      }
      if (resources.length) {
        sections.push({ title: "Daily practice", links: resources });
      }
      return sections;
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
    quranUnitLabel() {
      const match = this.quranUnits.find((unit) => unit.value === this.quranProgress.unit);
      return match ? match.value : "units";
    },
    quranProgressPercent() {
      const total = Number(this.quranProgress.total) || 0;
      if (total <= 0) return 0;
      const completed = Math.min(Math.max(Number(this.quranProgress.completed) || 0, 0), total);
      return Math.round((completed / total) * 100);
    },
    quranProgressRemaining() {
      const total = Number(this.quranProgress.total) || 0;
      const completed = Math.min(Math.max(Number(this.quranProgress.completed) || 0, 0), total);
      return Math.max(total - completed, 0);
    },
    quranProgressDaysLeft() {
      const dailyGoal = Number(this.quranProgress.dailyGoal) || 0;
      if (dailyGoal <= 0) return null;
      const remaining = this.quranProgressRemaining;
      return Math.ceil(remaining / dailyGoal);
    },
    quranDaysRemaining() {
      if (!this.selectedDay) return this.calendarLength;
      return Math.max(this.calendarLength - this.selectedDay.dayNumber + 1, 1);
    },
    quranDailyTargetNeeded() {
      const remaining = this.quranProgressRemaining;
      const days = this.quranDaysRemaining;
      if (!days) return 0;
      return Math.max(Math.round(remaining / days), 0);
    },
    quranPlannedTarget() {
      const dailyGoal = Number(this.quranProgress.dailyGoal) || 0;
      if (dailyGoal > 0) return Math.max(Math.round(dailyGoal), 1);
      const total = Number(this.quranProgress.total) || 0;
      if (!this.calendarLength || total <= 0) return 0;
      return Math.max(Math.round(total / this.calendarLength), 1);
    },
    quranSessionsByDate() {
      return this.quranSessions.reduce((acc, session) => {
        if (!session.date) return acc;
        const amount = Number(session.amount) || 0;
        acc[session.date] = (acc[session.date] || 0) + amount;
        return acc;
      }, {});
    },
    quranTodayKey() {
      return this.toDateKey(new Date());
    },
    quranTodayRead() {
      return this.quranSessionsByDate[this.quranTodayKey] || 0;
    },
    quranTodayTarget() {
      return this.quranPlannedTarget;
    },
    quranTodayRemaining() {
      return Math.max(this.quranTodayTarget - this.quranTodayRead, 0);
    },
    canMarkTodayComplete() {
      return this.isAuthenticated && this.quranTodayTarget > 0 && this.quranTodayRemaining > 0;
    },
    quranBreakdownDays() {
      const target = this.quranPlannedTarget;
      const byDate = this.quranSessionsByDate;
      return this.calendarDays.map((day) => {
        const read = byDate[day.key] || 0;
        let status = "empty";
        if (target > 0 && read >= target) status = "done";
        else if (read > 0) status = "partial";
        return {
          ...day,
          target,
          read,
          status,
          isSelected: this.selectedDay ? day.key === this.selectedDay.key : false,
        };
      });
    },
    quranEstimatedCompletionDate() {
      const daysLeft = this.quranProgressDaysLeft;
      if (!daysLeft && daysLeft !== 0) return null;
      const start = this.selectedDay?.date ? new Date(this.selectedDay.date) : new Date();
      const estimate = new Date(start);
      estimate.setDate(estimate.getDate() + Math.max(daysLeft - 1, 0));
      return estimate;
    },
    quranCompletionLabel() {
      if (this.quranProgressRemaining <= 0) return "Completed 🎉";
      if (!this.quranProgress.dailyGoal) return "Set a daily goal";
      return this.quranEstimatedCompletionDate ? this.formatISODate(this.quranEstimatedCompletionDate) : "Set a daily goal";
    },
    duaSearchTokens() {
      if (!this.duaSearchTerm) return [];
      return this.duaSearchTerm
        .toLowerCase()
        .split(/\s+/)
        .map((token) => token.trim())
        .filter(Boolean);
    },
    duaSearchRegex() {
      if (!this.duaSearchTokens.length) return null;
      const pattern = this.duaSearchTokens.map((token) => this.escapeRegExp(token)).join("|");
      return new RegExp(`(${pattern})`, "gi");
    },
    duaSourceFilters() {
      const sections = this.ramadan.duas_prayers?.modal_sections || [];
      const sources = new Set();
      sections.forEach((section) => {
        (section.items || []).forEach((item) => {
          const value = this.getDuaSourceValue(item);
          if (value) sources.add(value);
        });
      });
      const labelMap = {
        quran: "Qur'an",
        hadith: "Hadith",
      };
      const options = [{ label: "All sources", value: "all" }];
      Array.from(sources)
        .sort()
        .forEach((value) => {
          options.push({
            label: labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1),
            value,
          });
        });
      return options;
    },
    duaSectionFilters() {
      const sections = this.ramadan.duas_prayers?.modal_sections || [];
      const options = [{ label: "All sections", value: "all" }];
      sections.forEach((section) => {
        options.push({
          label: section.title,
          value: section.title.toLowerCase().replace(/[^a-z]/g, ""),
        });
      });
      return options;
    },
    filteredDuaSections() {
      const sections = this.ramadan.duas_prayers?.modal_sections || [];
      const normalizedSectionFilter = this.duaSectionFilter.replace(/[^a-z]/g, "");
      return sections
        .map((section) => {
          const shouldIncludeSection =
            !normalizedSectionFilter || normalizedSectionFilter === "all"
              ? true
              : section.title.toLowerCase().replace(/[^a-z]/g, "") === normalizedSectionFilter;
          const items = shouldIncludeSection
            ? (section.items || []).filter((item) => this.isDuaVisible(item))
            : [];
          return { ...section, items };
        })
        .filter((section) => section.items.length);
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
    breakdownStatusLabel(status) {
      if (status === "done") return "Completed ✅";
      if (status === "partial") return "In progress ⏳";
      return "Not completed";
    },
    breakdownStatusClass(status) {
      if (status === "done") return "r-badge--good";
      if (status === "partial") return "r-badge--warn";
      return "";
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
        this.loadInteractiveState();
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
    getDuaSourceValue(item) {
      const raw = item?.source || this.ramadan.duas_prayers?.tag_label || "Qur'an";
      return String(raw).toLowerCase().replace(/[^a-z]/g, "");
    },
    isDuaVisible(item) {
      return this.matchesSourceFilter(item) && this.matchesDuaSearch(item);
    },
    matchesDuaSearch(item) {
      if (!this.duaSearchTokens.length) return true;
      const haystack = [
        item?.name,
        item?.occasion,
        item?.arabic,
        item?.transliteration,
        item?.translation,
        item?.reference,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return this.duaSearchTokens.every((token) => haystack.includes(token));
    },
    matchesSourceFilter(item) {
      if (this.duaSourceFilter === "all") return true;
      return this.getDuaSourceValue(item) === this.duaSourceFilter;
    },
    resetDuaFilters() {
      this.duaSearchTerm = "";
      this.duaSourceFilter = "all";
      this.duaSectionFilter = "all";
    },
    highlightDuaText(text) {
      if (!text) return "";
      const escaped = this.escapeHtml(text);
      if (!this.duaSearchRegex) return escaped;
      return escaped.replace(this.duaSearchRegex, "<mark>$1</mark>");
    },
    escapeHtml(value = "") {
      const stringValue = String(value);
      return stringValue
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },
    escapeRegExp(value = "") {
      const stringValue = String(value);
      return stringValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
    getLocalStorageKey(suffix) {
      if (!this.userId) return null;
      return `ramadan2026.${suffix}.${this.userId}`;
    },
    getQuranDefaults(unit) {
      const defaults = {
        pages: { total: 614, dailyGoal: 20 },
        juz: { total: 30, dailyGoal: 1 },
        surahs: { total: 114, dailyGoal: 4 },
      };
      return defaults[unit] || defaults.pages;
    },
    handleQuranUnitChange() {
      const defaults = this.getQuranDefaults(this.quranProgress.unit);
      this.quranProgress = {
        ...this.quranProgress,
        total: defaults.total,
        dailyGoal: defaults.dailyGoal,
      };
      this.normalizeQuranProgress();
    },
    normalizeQuranProgress() {
      const total = Math.max(1, Math.round(Number(this.quranProgress.total) || 1));
      const completedRaw = Math.round(Number(this.quranProgress.completed) || 0);
      const completed = Math.min(Math.max(completedRaw, 0), total);
      const dailyGoal = Math.max(0, Math.round(Number(this.quranProgress.dailyGoal) || 0));
      this.quranProgress = {
        ...this.quranProgress,
        total,
        completed,
        dailyGoal,
      };
      this.persistQuranProgress();
    },
    addQuranProgress(amount) {
      if (!this.isAuthenticated || !amount) return;
      const next = (Number(this.quranProgress.completed) || 0) + amount;
      this.quranProgress = {
        ...this.quranProgress,
        completed: next,
      };
      this.normalizeQuranProgress();
    },
    addQuranSessionEntry(amount, date, note) {
      if (!this.isAuthenticated) return;
      if (!amount || !date) return;
      const roundedAmount = Math.max(Math.round(Number(amount) || 0), 1);
      const session = {
        id: `session-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        amount: roundedAmount,
        date,
        note: note || "",
        createdAt: Date.now(),
      };
      this.quranSessions = [session, ...this.quranSessions];
      this.addQuranProgress(session.amount);
      this.persistQuranSessions();
      this.lastQuickAction = {
        id: session.id,
        label: "Marked today complete",
        timestamp: Date.now(),
      };
    },
    markTodayComplete() {
      if (!this.canMarkTodayComplete) return;
      this.addQuranSessionEntry(this.quranTodayRemaining, this.quranTodayKey, "Marked today complete");
    },
    undoLastQuickAction() {
      if (!this.lastQuickAction?.id) return;
      this.removeQuranSession(this.lastQuickAction.id);
      this.lastQuickAction = null;
    },
    removeQuranSession(id) {
      if (!this.isAuthenticated) return;
      const session = this.quranSessions.find((item) => item.id === id);
      this.quranSessions = this.quranSessions.filter((item) => item.id !== id);
      if (this.lastQuickAction?.id === id) {
        this.lastQuickAction = null;
      }
      if (session) {
        this.quranProgress = {
          ...this.quranProgress,
          completed: (Number(this.quranProgress.completed) || 0) - Number(session.amount || 0),
        };
        this.normalizeQuranProgress();
      }
      this.persistQuranSessions();
    },
    persistQuranProgress() {
      if (typeof window === "undefined" || !this.isAuthenticated) return;
      const key = this.getLocalStorageKey("quranProgress");
      if (!key) return;
      window.localStorage.setItem(key, JSON.stringify(this.quranProgress));
    },
    persistQuranSessions() {
      if (typeof window === "undefined" || !this.isAuthenticated) return;
      const key = this.getLocalStorageKey("quranSessions");
      if (!key) return;
      window.localStorage.setItem(key, JSON.stringify(this.quranSessions));
    },
    loadInteractiveState() {
      if (typeof window === "undefined") return;
      if (!this.isAuthenticated) {
        this.quranSessions = [];
        this.normalizeQuranProgress();
        this.lastQuickAction = null;
        return;
      }
      try {
        const progressKey = this.getLocalStorageKey("quranProgress");
        const progressStored = JSON.parse(window.localStorage.getItem(progressKey) || "null");
        if (progressStored && typeof progressStored === "object") {
          this.quranProgress = {
            ...this.quranProgress,
            ...progressStored,
          };
        }
        this.normalizeQuranProgress();
        const sessionsKey = this.getLocalStorageKey("quranSessions");
        const sessionsStored = JSON.parse(window.localStorage.getItem(sessionsKey) || "[]");
        this.quranSessions = Array.isArray(sessionsStored)
          ? sessionsStored.map((session) => ({
              ...session,
              amount: Math.max(Math.round(Number(session.amount) || 0), 1),
            }))
          : [];
      } catch (error) {
        this.quranSessions = [];
        this.lastQuickAction = null;
      }
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
    updateFabVisibility() {
      if (typeof window === "undefined") {
        this.showFab = false;
        return;
      }
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      const scrollableHeight = Math.max(
        (document.documentElement.scrollHeight || document.body.scrollHeight || 0) - viewportHeight,
        0
      );
      const ratio = scrollableHeight > 0 ? scrollTop / scrollableHeight : viewportHeight > 0 ? scrollTop / viewportHeight : 0;
      this.showFab = ratio > 0.1;
    },
    scrollToTop() {
      if (typeof window === "undefined") return;
      window.scrollTo({ top: 0, behavior: "smooth" });
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

.r-hero__inner {
  width: 100%;
  padding: 0 clamp(1.5rem, 4vw, 3.5rem) clamp(1.5rem, 4vw, 3.5rem);
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

.r-hero__section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.r-hero__section-card {
  padding: 18px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 18px 30px rgba(6, 27, 43, 0.35);
}

.r-hero__section-title {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 12px;
}

.r-hero__section-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.r-hero__section-pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(12, 32, 45, 0.3);
  color: #fdf7ef;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.r-hero__section-pill:hover {
  background: rgba(255, 255, 255, 0.9);
  color: #0f2230;
  transform: translateY(-1px);
}

.r-hero__subtext-wrap {
  margin-top: 12px;
  display: grid;
  gap: 6px;
}

.r-hero__subtext {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(253, 247, 239, 0.75);
  max-width: 540px;
}


.r-hero__media {
  display: grid;
  gap: 18px;
  align-items: center;
}

.r-hero__frame {
  position: relative;
  border-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 80%;
  margin-left: auto;
}

.r-hero__image {
  width: 100%;
  max-height: 520px;
  border-radius: 24px 6px 24px 6px;
  object-fit: cover;
  transform: scale(0.95);
  transform-origin: center;
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

#interactive.r-section {
  background: #fff6ea;
  --r-ornament-1: radial-gradient(circle, rgba(111, 153, 164, 0.2), transparent 70%);
  --r-ornament-2: radial-gradient(circle, rgba(215, 166, 74, 0.2), transparent 70%);
  color: var(--r-ink);
}

#interactive .r-section__title {
  color: var(--r-deep);
}

#interactive .r-section__subtitle {
  color: var(--r-ink-soft);
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
.r-section__intro {
  color: var(--r-ink-soft);
  font-size: 1rem;
  max-width: 960px;
  margin-top: 12px;
  line-height: 1.6;
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
  grid-auto-rows: 1fr;
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

.r-card--interactive {
  background: linear-gradient(135deg, #ffffff 0%, #f7f6f0 100%);
  border: 1px solid rgba(111, 153, 164, 0.22);
  --r-card-accent: rgba(111, 153, 164, 0.45);
}

.r-card--interactive::after {
  content: "";
  position: absolute;
  top: 18px;
  right: 18px;
  width: 70px;
  height: 70px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(215, 166, 74, 0.18), transparent);
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

.r-card__history-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--r-accent-deep);
  margin-bottom: 6px;
  text-transform: uppercase;
}

.r-card__reference {
  font-size: 0.82rem;
  color: var(--r-ink-soft);
  margin-top: 8px;
  line-height: 1.4;
}

.r-card__reference-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--r-accent-deep);
  margin-top: 4px;
}

.r-card__reference-link:hover {
  text-decoration: underline;
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

.r-resource-link {
  color: var(--r-ink-soft);
  text-decoration: none;
  font-weight: 600;
}

.r-resource-link:hover {
  color: var(--r-accent-deep);
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 320px;
  --r-card-accent: rgba(111, 153, 164, 0.5);
}

#tools #section-tools-body .r-grid--triple {
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  grid-auto-rows: 1fr;
}

#tools #section-tools-body .r-card--tool__top-row {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.r-card--tool__icons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.r-card--tool__icons .fas {
  font-size: 1.7rem;
  color: #0e0e0e;
  -webkit-text-fill-color: #0e0e0e;
}

.r-card--tool__text {
  flex: 1;
  min-width: 0;
  width: 100%;
}

.r-card__detail {
  margin: 0 0 16px;
  color: var(--r-ink-soft);
  font-size: 1rem;
  line-height: 1.6;
  width: 100%;
}

.r-card__emoji--inline {
  color: #0e0e0e;
}

#tools .r-card--tool:nth-child(odd) {
  background: linear-gradient(135deg, #ffffff 0%, #f2f7f4 100%);
}

#tools .r-card--tool:nth-child(even) {
  background: linear-gradient(135deg, #ffffff 0%, #fff4e7 100%);
}

@media (max-width: 1024px) {
  #tools #section-tools-body .r-grid--triple {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  #tools #section-tools-body .r-card--tool__top-row {
    flex-direction: column;
    gap: 12px;
  }

  #tools .r-card--tool {
    min-height: auto;
  }

  #tools .r-card__detail {
    font-size: 0.95rem;
  }

  #tools .r-section__intro {
    font-size: 0.95rem;
    line-height: 1.5;
  }
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
  color: #0e0e0e;
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

.ramadan-short-hero {
  background: linear-gradient(135deg, #ffffff 0%, #f5f7f9 100%);
  border-radius: 28px;
  padding: 2rem;
  border: 1px solid rgba(15, 34, 48, 0.08);
  box-shadow: 0 20px 50px rgba(15, 41, 80, 0.1);
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.ramadan-short-eyebrow {
  letter-spacing: 0.4em;
  font-size: 0.72rem;
  text-transform: uppercase;
  color: #0f766e;
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.ramadan-short-hero__title {
  font-size: clamp(1.3rem, 1.6vw, 1.6rem);
  margin: 0;
}

.ramadan-short-hero__lead {
  margin: 0.25rem 0;
  color: #475569;
  max-width: 520px;
}

.ramadan-short-pillset {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
}

.ramadan-short-pill {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: rgba(13, 148, 136, 0.15);
  color: #0f766e;
  font-weight: 600;
  font-size: 0.8rem;
}

.ramadan-short-highlights {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.ramadan-short-card {
  border-radius: 28px;
  padding: 2rem;
  min-height: 240px;
  color: #fff;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.3), rgba(15, 23, 42, 0.95)), var(--story-bg);
  background-blend-mode: multiply;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.25);
}

.ramadan-short-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.7));
  z-index: 0;
}

.ramadan-short-card__content,
.ramadan-short-card__footer {
  position: relative;
  z-index: 1;
}

.ramadan-short-card__tag {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #d8f3ec;
  margin-bottom: 0.6rem;
}

.ramadan-short-card__title {
  font-size: 1rem;
  margin: 0 0 0.35rem;
}

.ramadan-short-card__desc {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
}

.ramadan-short-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.ramadan-short-card__link {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(13, 148, 136, 0.85);
  box-shadow: 0 8px 20px rgba(13, 148, 136, 0.3);
}

.ramadan-short-card__link:hover {
  background: rgba(13, 148, 136, 1);
}

.ramadan-short-card--compact {
  min-height: 210px;
  padding: 1.6rem;
}

.ramadan-short-groups {
  margin-top: 2.5rem;
  display: grid;
  gap: 1.75rem;
}

.ramadan-short-group__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ramadan-short-group__title {
  font-size: 1.4rem;
  margin: 0;
}

.ramadan-short-group__subtitle {
  margin: 0;
  color: #475569;
  font-size: 0.9rem;
}

.ramadan-short-group__grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.ramadan-reminder-card {
  border-radius: 28px;
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 70%);
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 24px 40px rgba(15, 23, 42, 0.12);
}

.ramadan-reminder-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ramadan-reminder-eyebrow {
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 0.7rem;
  color: #0f766e;
  margin: 0 0 0.35rem;
}

.ramadan-reminder-title {
  margin: 0;
  font-size: 1.6rem;
}

.ramadan-reminder-lead {
  margin: 0.4rem 0 0;
  color: #475569;
}

.ramadan-reminder-pill {
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.1);
  color: #b91c1c;
  padding: 0.4rem 1rem;
  font-weight: 600;
  font-size: 0.85rem;
  white-space: nowrap;
}

.ramadan-reminder-form {
  display: grid;
  gap: 1rem;
  margin: 1rem 0 1.25rem;
}

.ramadan-reminder-form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.ramadan-reminder-input,
.ramadan-reminder-select {
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.15);
  padding: 0.8rem 1rem;
  font-size: 0.95rem;
  font-family: inherit;
  background: #fff;
}

.ramadan-reminder-select {
  appearance: none;
}

.ramadan-reminder-submit {
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #0f766e, #2dd4bf);
  color: #fff;
  font-weight: 700;
  padding: 0.8rem 1.4rem;
  cursor: pointer;
  align-self: flex-start;
  box-shadow: 0 14px 24px rgba(15, 118, 110, 0.25);
}

.ramadan-reminder-list {
  display: grid;
  gap: 0.9rem;
}

.ramadan-reminder-item {
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 1rem 1.2rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
}

.ramadan-reminder-item__status {
  display: flex;
  gap: 0.9rem;
  align-items: center;
}

.ramadan-checkbox {
  display: inline-flex;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid rgba(15, 23, 42, 0.2);
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.ramadan-checkbox input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  margin: 0;
}

.ramadan-checkbox span {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: rgba(15, 23, 42, 0.1);
  transition: background 0.2s ease;
}

.ramadan-checkbox input:checked + span {
  background: linear-gradient(135deg, #0f766e, #2dd4bf);
}

.ramadan-reminder-item h4 {
  margin: 0;
  font-size: 1.05rem;
}

.ramadan-reminder-item h4.is-done {
  text-decoration: line-through;
  color: #94a3b8;
}

.ramadan-reminder-meta {
  margin: 0;
  font-size: 0.85rem;
  color: #475569;
}

.ramadan-reminder-note {
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: #64748b;
}

.ramadan-reminder-remove {
  border: none;
  background: transparent;
  color: #b91c1c;
  font-weight: 600;
  cursor: pointer;
}

.ramadan-reminder-auth {
  border-radius: 18px;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.03);
}

.ramadan-reminder-auth__actions {
  margin-top: 0.75rem;
}

.ramadan-reminder-link {
  text-decoration: none;
  color: #0f766e;
  font-weight: 700;
  border-bottom: 1px solid transparent;
}

.ramadan-reminder-link:hover {
  border-color: #0f766e;
}

.ramadan-reminder-empty {
  font-size: 0.95rem;
  color: #475569;
  margin: 1rem 0;
}

@media (max-width: 992px) {
  .ramadan-short-highlights,
  .ramadan-short-group__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .ramadan-short-highlights,
  .ramadan-short-group__grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .ramadan-short-hero {
    flex-direction: column;
  }
  .ramadan-reminder-form__row {
    grid-template-columns: 1fr;
  }
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

.r-note--muted {
  background: rgba(27, 31, 42, 0.06);
  color: var(--r-ink-soft);
  font-size: 0.85rem;
}

.r-modal-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 12px;
}

.r-modal-card {
  padding: 14px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(15, 34, 48, 0.1);
  box-shadow: none;
  font-family: "Inter", "Source Sans Pro", "Noto Sans Arabic", sans-serif;
}

.r-dua-modal-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.r-dua-search {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.r-dua-search__label {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--r-ink-soft);
}

.r-input--search {
  border-radius: 14px;
  border: 1px solid rgba(15, 34, 48, 0.18);
  background: rgba(255, 255, 255, 0.95);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;
}

.r-input--search:focus {
  border-color: rgba(215, 166, 74, 0.6);
  box-shadow: 0 0 0 3px rgba(215, 166, 74, 0.15);
}

.r-dua-search__hint {
  margin: 0;
  font-size: 0.82rem;
  color: var(--r-ink-soft);
}

.r-dua-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.8rem;
}

.r-dua-filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.r-dua-filter-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: var(--r-ink-soft);
}

.r-dua-filter-group .r-select {
  border-radius: 14px;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(15, 34, 48, 0.18);
  background: #fff;
  font-family: inherit;
}

.r-story-grid--modal {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.r-story-card--dua {
  min-height: auto;
  padding: 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(15, 34, 48, 0.08);
  color: #0f1f1b;
  font-family: "Inter", "Noto Sans Arabic", "Source Sans Pro", sans-serif;
}

.r-dua-empty {
  border-radius: 18px;
  background: rgba(250, 245, 238, 0.9);
  border: 1px dashed rgba(111, 153, 164, 0.5);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.r-dua-empty .r-link {
  align-self: flex-start;
}

.r-story-card--dua mark {
  background: rgba(215, 166, 74, 0.35);
  color: #0f1f1b;
  padding: 0 0.18rem;
  border-radius: 0.2rem;
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

.r-form--compact {
  margin-top: 12px;
  gap: 10px;
}

.r-interactive-stack {
  display: grid;
  gap: 18px;
}

.r-helper {
  margin: 0;
  color: var(--r-ink-soft);
  font-size: 0.92rem;
}

.r-interactive-stack .r-progress-insights {
  margin-top: 4px;
}

.r-form__row {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.r-progress {
  margin-top: 14px;
  display: grid;
  gap: 8px;
}

.r-progress__bar {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(27, 31, 42, 0.08);
  overflow: hidden;
  border: 1px solid rgba(27, 31, 42, 0.12);
}

.r-progress__fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, rgba(76, 114, 96, 0.75), rgba(215, 166, 74, 0.85));
  border-radius: inherit;
  transition: width 0.3s ease;
}

.r-progress__meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--r-ink-soft);
}

.r-progress__footer {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--r-ink-soft);
}

.r-progress__hint {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(27, 31, 42, 0.6);
}

.r-progress-insights {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.r-progress-insights > div {
  display: grid;
  gap: 4px;
}

.r-mini-label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(27, 31, 42, 0.6);
  margin-bottom: 4px;
}

.r-badge--good {
  background: rgba(76, 114, 96, 0.18);
  color: #2f5d4d;
}

.r-badge--warn {
  background: rgba(215, 166, 74, 0.18);
  color: #8c5b1b;
}

.r-quick-add {
  display: grid;
  gap: 6px;
}

.r-quick-add__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}


.r-breakdown {
  display: grid;
  gap: 10px;
  margin-top: 6px;
  max-height: 520px;
  overflow: auto;
  padding-right: 4px;
}

.r-today-panel {
  padding: 12px;
  border-radius: 16px;
  background: rgba(27, 31, 42, 0.04);
  border: 1px solid rgba(27, 31, 42, 0.08);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.r-today-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.r-tooltip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(27, 31, 42, 0.08);
  font-size: 0.85rem;
  cursor: help;
}

.r-chip--action {
  border: 1px dashed rgba(27, 31, 42, 0.2);
  background: rgba(27, 31, 42, 0.04);
}

.r-today-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: var(--r-ink-soft);
  margin-top: 4px;
}

.r-confirm {
  margin: 8px 0 0;
  font-size: 0.85rem;
  color: #2f5d4d;
}

.r-breakdown__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(27, 31, 42, 0.04);
  border: 1px solid rgba(27, 31, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.r-breakdown__row.is-today {
  border-color: rgba(47, 107, 122, 0.5);
}

.r-breakdown__row.is-selected {
  border-color: rgba(215, 166, 74, 0.6);
  box-shadow: 0 12px 26px rgba(215, 166, 74, 0.2);
}

.r-breakdown__day {
  font-weight: 700;
  display: block;
}

.r-breakdown__date {
  font-size: 0.8rem;
  color: var(--r-ink-soft);
}

.r-breakdown__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  font-size: 0.85rem;
  color: var(--r-ink-soft);
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

.r-fab {
  position: fixed;
  bottom: clamp(20px, 3vw, 30px);
  right: clamp(20px, 3vw, 30px);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--r-accent), var(--r-accent-deep));
  color: #fff;
  font-size: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 30px rgba(15, 34, 48, 0.25);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  z-index: 60;
}

.r-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 26px 36px rgba(15, 34, 48, 0.32);
}

.r-fab:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(215, 166, 74, 0.6);
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
    order: 0;
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


  .r-download {
    flex-direction: column;
    align-items: flex-start;
  }

  .r-story-grid--modal {
    grid-template-columns: 1fr;
  }

  .r-dua-modal-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .r-dua-filters {
    justify-content: flex-start;
  }

  .r-dua-search {
    width: 100%;
  }

  .r-calendar {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .r-breakdown__row {
    flex-direction: column;
    align-items: flex-start;
  }

  .r-breakdown__meta {
    justify-content: flex-start;
  }

  .r-today-panel {
    align-items: flex-start;
  }

  .r-today-actions {
    justify-content: flex-start;
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
  .r-modal-card,
  .r-breakdown__row {
    transition: none;
  }

}
</style>
