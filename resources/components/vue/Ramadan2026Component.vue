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
            <div v-if="navSections.length" class="r-hero__section-grid r-animate" style="--delay: 0.36s;">
              <article v-for="section in navSections" :key="section.title" class="r-hero__section-card">
                <p class="r-hero__section-title">{{ section.title }}</p>
                <div class="r-hero__section-links">
                  <a v-for="link in section.links" :key="link.href" class="r-hero__section-pill" :href="link.href">
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
            {{ ramadan.overview.section_title }}
          </h2>
          <p class="r-overview__lead">{{ ramadan.overview.subtitle }}</p>
        </div>
        <SectionToolbar section-id="overview" :section-title="ramadan.overview.section_title"
          :section-feedback="toolbarFeedback['overview']" @whatsapp-share="shareSectionViaWhatsApp"
          @copy-section="copySectionContent" @print-section="printSection" @export-pdf="exportSectionPdf"
          @adjust-font="adjustSectionFont" />
        <div id="section-overview-body" class="r-section__body" :style="sectionBodyStyle('overview')">
          <p v-for="(para, index) in ramadan.overview.body" :key="index" class="r-overview__body">
            {{ para }}
          </p>
          <h3 class="r-section__subtitle">{{ ramadan.overview.key_points_title }}</h3>
          <ul class="r-overview__list">
            <li v-for="item in ramadan.overview.key_points" :key="item">{{ item }}</li>
          </ul>
          <div v-if="hasSectionReferences(ramadan.overview.references)" class="r-inline-references">
            <p class="r-inline-references__title">{{ ramadan.labels.references }}</p>
            <p v-for="(ref, refIndex) in ramadan.overview.references" :key="`overview-reference-${refIndex}`"
              class="r-inline-reference">
              <span class="r-inline-reference__citation">{{ ref.citation }}</span>
              <span v-if="referenceSummary(ref)"> - {{ referenceSummary(ref) }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="history" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            {{ ramadan.history.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.history.subtitle }}</p>
        </div>
        <SectionToolbar section-id="history" :section-title="ramadan.history.section_title"
          :section-feedback="toolbarFeedback['history']"
          @whatsapp-share="shareSectionViaWhatsApp" @copy-section="copySectionContent" @print-section="printSection"
          @export-pdf="exportSectionPdf" @adjust-font="adjustSectionFont" />
        <div id="section-history-body" class="r-section__body" :style="sectionBodyStyle('history')">
          <p v-for="(para, index) in ramadan.history.body" :key="index" class="r-section__subtitle">
            {{ para }}
          </p>
          <div class="r-grid r-grid--double r-grid--timeline">
            <article v-for="(item, index) in ramadan.history.timeline" :key="item.period"
              class="r-card r-card--timeline">
              <span class="r-card__icon" aria-hidden="true">
                <i :class="getIconClasses('timeline', index)"></i>
              </span>
              <h3 class="r-card__title">{{ item.period }}</h3>
              <p class="r-card__desc">{{ item.detail }}</p>
              <p v-if="item.reference" class="r-card__reference">{{ item.reference }}</p>
            </article>
          </div>
          <div class="r-grid r-grid--double r-spacing-top"
            v-if="ramadan.history.notable_figures || ramadan.history.regional_practices">
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
          <div v-if="hasSectionReferences(ramadan.history.references)" class="r-inline-references">
            <p class="r-inline-references__title">{{ ramadan.labels.references }}</p>
            <p v-for="(ref, refIndex) in ramadan.history.references" :key="`history-reference-${refIndex}`"
              class="r-inline-reference">
              <span class="r-inline-reference__citation">{{ ref.citation }}</span>
              <span v-if="referenceSummary(ref)"> - {{ referenceSummary(ref) }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="interactive" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
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
          <div v-else class="r-interactive-layout">
            <div v-if="quranOnboardingSteps.length" class="r-quran-onboarding r-quran-onboarding--theme">
              <div class="r-quran-onboarding__header">
                <div>
                  <p class="r-mini-label">Quick start</p>
                  <h4>Ramadan-ready tracker prep</h4>
                </div>
                <span class="r-quran-onboarding__hint">Follow the flow · 3 steps</span>
              </div>
              <div class="r-quran-onboarding__steps r-quran-onboarding__steps--theme">
                <article
                  v-for="(step, index) in quranOnboardingSteps"
                  :key="step.title"
                  class="r-quran-onboarding__step r-quran-onboarding__step--theme"
                >
                  <div class="r-quran-onboarding__step-badge">
                    <span class="r-quran-onboarding__step-icon" aria-hidden="true">
                      <i :class="['fas', step.icon]"></i>
                    </span>
                    <span class="r-quran-onboarding__step-index">Step {{ index + 1 }}</span>
                  </div>
                  <h5>{{ step.title }}</h5>
                  <p>{{ step.detail }}</p>
                </article>
              </div>
              <div class="r-quran-onboarding__cta-row">
                <button class="r-button r-button--primary" type="button" @click="scrollToQuranTracker">
                  Open tracker
                </button>
                <span class="r-quran-onboarding__cta-hint">Or jump straight to today’s target</span>
              </div>
            </div>
            <div class="r-interactive-grid">
              <article ref="quranProgressCard" class="r-card r-card--interactive r-animate" style="--delay: 0.05s;">
                <div class="r-interactive-stack">
                  <div class="r-stack-head">
                    <h3 class="r-card__title">
                      <i class="fas fa-book-open" aria-hidden="true"></i>
                      Quran reading progress
                    </h3>
                    <span class="r-badge">{{ quranProgressPercent }}% complete</span>
                  </div>
                  <p class="r-card__desc">
                    Choose a unit, set a pace, and track your progress day by day.
                  </p>
                  <p class="r-helper">Estimates use your daily goal and planner dates. Adjust totals to match your
                    mushaf.</p>
                  <div class="r-progress">
                    <div class="r-progress__bar" role="progressbar" :aria-valuenow="quranProgressPercent"
                      aria-valuemin="0" aria-valuemax="100">
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
                        <select id="quran-unit" class="r-select" v-model="quranProgress.unit"
                          @change="handleQuranUnitChange">
                          <option v-for="unit in quranUnits" :key="unit.value" :value="unit.value">{{ unit.label }}
                          </option>
                        </select>
                      </div>
                      <div>
                        <label class="r-label" for="quran-total">Total</label>
                        <input id="quran-total" class="r-input" type="number" min="1"
                          v-model.number="quranProgress.total" @input="normalizeQuranProgress" />
                      </div>
                      <div>
                        <label class="r-label" for="quran-completed">Completed</label>
                        <input id="quran-completed" class="r-input" type="number" min="0" :max="quranProgress.total"
                          v-model.number="quranProgress.completed" @input="normalizeQuranProgress" />
                      </div>
                    </div>
                    <div class="r-form__row">
                      <div>
                        <label class="r-label" for="quran-goal">Daily goal</label>
                        <input id="quran-goal" class="r-input" type="number" min="0" step="1"
                          v-model.number="quranProgress.dailyGoal" @input="normalizeQuranProgress" />
                      </div>
                      <div class="r-quick-add">
                        <span class="r-label">Quick add</span>
                        <div class="r-quick-add__buttons">
                          <button class="r-button r-button--ghost r-button--sm" type="button"
                            @click="addQuranProgress(1)">
                            +1
                          </button>
                          <button class="r-button r-button--ghost r-button--sm" type="button"
                            @click="addQuranProgress(3)">
                            +3
                          </button>
                          <button class="r-button r-button--ghost r-button--sm" type="button"
                            @click="addQuranProgress(5)">
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
                    <span v-if="quranProgressRemaining === 0">
                      <i class="fas fa-check-circle" aria-hidden="true"></i>
                      Completed
                    </span>
                    <span v-else-if="quranProgressDaysLeft">
                      <i class="fas fa-road" aria-hidden="true"></i>
                      At this pace: ~{{ quranProgressDaysLeft }} day{{ quranProgressDaysLeft === 1 ? "" : "s" }} left
                    </span>
                    <span v-else>
                      <i class="fas fa-calendar" aria-hidden="true"></i>
                      Set a daily goal to estimate your pace.
                    </span>
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
                    <strong>
                      <i class="fas fa-flag-checkered" aria-hidden="true"></i>
                      {{ quranCompletionLabel }}
                    </strong>
                    </div>
                  </div>
                </div>
              </article>

              <article class="r-card r-card--interactive r-animate" style="--delay: 0.12s;">
                <div class="r-interactive-stack">
                  <div class="r-stack-head">
                    <h3 class="r-card__title">
                      <i class="fas fa-calendar-day" aria-hidden="true"></i>
                      Daily breakdown
                    </h3>
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
                        <span v-if="quranTodayRemaining === 0" class="r-badge r-badge--good">
                          <i class="fas fa-check" aria-hidden="true"></i>
                          Completed
                        </span>
                      </div>
                      <p v-if="quranTodayRemaining === 0" class="r-confirm">Completion saved for today.</p>
                    </div>
                    <div class="r-today-actions">
                      <span class="r-tooltip" aria-label="Uses your device date to define today."
                        title="Uses your device date to define today.">
                        <i class="fas fa-circle-info" aria-hidden="true"></i>
                      </span>
                      <button class="r-button r-button--ghost r-button--sm" type="button"
                        :disabled="!canMarkTodayComplete" @click="markTodayComplete">
                        {{ quranTodayRemaining === 0 ? "Completed" : "Mark today complete" }}
                      </button>
                      <button v-if="lastQuickAction" class="r-chip r-chip--action" type="button"
                        @click="undoLastQuickAction">
                        Undo
                      </button>
                    </div>
                  </div>
                  <div class="r-breakdown">
                    <div v-for="day in quranBreakdownDays" :key="day.key" class="r-breakdown__row"
                      :class="{ 'is-today': day.isToday, 'is-selected': day.isSelected }">
                      <div>
                        <span class="r-breakdown__day">Day {{ day.dayNumber }}</span>
                        <span class="r-breakdown__date">{{ formatShortDate(day.date) }}</span>
                      </div>
                      <div class="r-breakdown__meta">
                        <span>
                          <i class="fas fa-bullseye" aria-hidden="true"></i>
                          {{ day.target }} {{ quranUnitLabel }}
                        </span>
                        <span>
                          <i class="fas fa-book-open" aria-hidden="true"></i>
                          {{ day.read }} read
                        </span>
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
      </div>
    </section>

    <section id="key-dates" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            {{ ramadan.important_dates.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.important_dates.subtitle }}</p>
        </div>
        <div v-if="keyDateHighlights.length" class="r-key-dates__highlights">
          <article v-for="highlight in keyDateHighlights" :key="highlight.title" class="r-card r-card--mini">
            <div v-if="highlight.showIcon !== false && highlight.icon" class="r-card--mini__icon">
              <i :class="['fas', highlight.icon]" aria-hidden="true"></i>
            </div>
            <div>
              <p class="r-card__title">{{ highlight.title }}</p>
              <p class="r-card__desc">{{ highlight.copy }}</p>
            </div>
          </article>
        </div>
        <div id="section-key-dates-body" class="r-section__body">
          <div class="r-grid r-grid--dates">
            <article v-for="(date, index) in ramadan.important_dates.dates" :key="date.event"
              class="r-card r-card--date">
              <div class="r-card__tag" :class="`r-card__tag--${date.type}`">
                {{ date.event }}
              </div>
              <h3 class="r-card__title">{{ date.gregorian_date }}</h3>
              <p class="r-card__meta">{{ date.hijri_date }}</p>
              <p class="r-card__desc">{{ date.description }}</p>
            </article>
          </div>
          <div v-if="ramadan.moon_sighting" class="r-moon-sighting">
            <article class="r-card r-card--moon">
              <h3 class="r-card__title">{{ ramadan.moon_sighting.title }}</h3>
              <p class="r-moon-sighting__intro">{{ ramadan.moon_sighting.intro }}</p>
              <ol class="r-moon-sighting__steps">
                <li v-for="(step, index) in ramadan.moon_sighting.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
              <p class="r-moon-sighting__note">{{ ramadan.moon_sighting.note }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="planner" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            Live Ramadan Planner
          </h2>
          <p class="r-section__subtitle">
            Turn this guide into a living plan with a day-by-day calendar, personal reminders, and shared reflections.
          </p>
        </div>
        <div id="section-planner-body" class="r-section__body">
          <div class="row justify-content-center r-planner-row">
            <div class="col-12">
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
                    <input id="planner-start-date" class="r-input" type="date" v-model="calendarStartOverride"
                      @change="persistCalendar" />
                    <label class="r-label" for="planner-length">Length</label>
                    <select id="planner-length" class="r-select" v-model.number="calendarLength"
                      @change="persistCalendar">
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
                    @mouseenter="setHoveredCalendarDay(day)"
                    @focus="setHoveredCalendarDay(day)"
                    @mouseleave="clearHoveredCalendarDay"
                    @blur="clearHoveredCalendarDay"
                  >
                    <span class="r-calendar__day">Day {{ day.dayNumber }}</span>
                    <span class="r-calendar__date">{{ formatShortDate(day.date) }}</span>
                    <span v-if="day.event" class="r-calendar__event">{{ day.event }}</span>
                  </button>
                  <div v-if="hoveredCalendarHint" class="r-calendar__hint" aria-live="polite">
                    <strong>{{ hoveredCalendarHint.title }}</strong>
                    <span>{{ hoveredCalendarHint.event }}</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="row r-planner-row">
            <div class="col-12 col-md-6">
              <article class="ramadan-reminder-card">
                <div class="ramadan-reminder-card__head">
                  <div>
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
                  <div class="ramadan-reminder-form-shell">
                    <form class="ramadan-reminder-form" @submit.prevent="addReminder">
                    <div class="ramadan-reminder-form__row">
                      <input class="ramadan-reminder-input" v-model.trim="reminderDraft.title" type="text"
                        placeholder="Reminder title" required />
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
                      <input class="ramadan-reminder-input" v-model.trim="reminderDraft.note" type="text"
                        placeholder="Optional note" />
                    </div>
                    <button class="ramadan-reminder-submit" type="submit">Save reminder</button>
                  </form>
                  </div>
                  <div v-if="sortedReminders.length" class="ramadan-reminder-list">
                    <article v-for="reminder in sortedReminders" :key="reminder.id" class="ramadan-reminder-item">
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
                      <button class="ramadan-reminder-remove" type="button" @click="removeReminder(reminder.id)">
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
                  <div class="r-form-shell">
                    <form class="r-form" @submit.prevent="addReflection">
                    <div class="r-form__row">
                      <input class="r-input" v-model.trim="reflectionDraft.name" type="text"
                        placeholder="Name (optional)" />
                      <select class="r-select" v-model="reflectionDraft.mood">
                        <option v-for="mood in reflectionMoods" :key="mood" :value="mood">{{ mood }}</option>
                      </select>
                    </div>
                    <textarea class="r-textarea" v-model.trim="reflectionDraft.text" rows="3"
                      placeholder="Share a reflection or dua..." required></textarea>
                    <button class="r-button r-button--primary" type="submit">Share reflection</button>
                  </form>
                  </div>
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
            {{ ramadan.how_to_fast.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.how_to_fast.intro }}</p>
        </div>
        <SectionToolbar section-id="how-to-fast" :section-title="ramadan.how_to_fast.section_title"
          :section-feedback="toolbarFeedback['how-to-fast']"
          @whatsapp-share="shareSectionViaWhatsApp" @copy-section="copySectionContent" @print-section="printSection"
          @export-pdf="exportSectionPdf" @adjust-font="adjustSectionFont" />
        <div id="section-how-to-fast-body" class="r-section__body" :style="sectionBodyStyle('how-to-fast')">
          <div class="r-grid r-grid--triple r-grid--stagger r-grid--how-to-fast">
            <article v-for="(card, index) in ramadan.how_to_fast.cards" :key="card.title" class="r-card r-card--step">
              <span class="r-card__icon" aria-hidden="true">
                <i :class="getIconClasses('fasting', index)"></i>
              </span>
              <h3 class="r-card__title">{{ card.title }}</h3>
              <ul class="r-list">
                <li v-for="item in card.items" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
          <div v-if="hasSectionReferences(ramadan.how_to_fast.references)" class="r-inline-references">
            <p class="r-inline-references__title">{{ ramadan.labels.references }}</p>
            <p v-for="(ref, refIndex) in ramadan.how_to_fast.references" :key="`how-to-fast-reference-${refIndex}`"
              class="r-inline-reference">
              <span class="r-inline-reference__citation">{{ ref.citation }}</span>
              <span v-if="referenceSummary(ref)"> - {{ referenceSummary(ref) }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            {{ ramadan.faq.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.faq.subtitle }}</p>
        </div>
        <SectionToolbar section-id="faq" :section-title="ramadan.faq.section_title"
          :section-feedback="toolbarFeedback.faq"
          @whatsapp-share="shareSectionViaWhatsApp" @copy-section="copySectionContent" @print-section="printSection"
          @export-pdf="exportSectionPdf" @adjust-font="adjustSectionFont" />
        <div id="section-faq-body" class="r-section__body" :style="sectionBodyStyle('faq')">
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
            {{ ramadan.quran_reading_plans.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.quran_reading_plans.intro }}</p>
          <div class="r-section__controls">
            <button class="r-button r-button--ghost r-button--sm" type="button" @click="toggleAllQuranPlans">
              {{ areAllQuranPlansExpanded ? "Collapse all plans" : "Expand all plans" }}
            </button>
          </div>
        </div>
        <SectionToolbar section-id="quran-plans" :section-title="ramadan.quran_reading_plans.section_title"
          :section-feedback="toolbarFeedback['quran-plans']"
          @whatsapp-share="shareSectionViaWhatsApp" @copy-section="copySectionContent" @print-section="printSection"
          @export-pdf="exportSectionPdf" @adjust-font="adjustSectionFont" />
        <div id="section-quran-plans-body" class="r-section__body" :style="sectionBodyStyle('quran-plans')">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article v-for="(plan, index) in ramadan.quran_reading_plans.plans" :key="plan.level"
              class="r-card r-card--plan">
              <div class="r-card__head">
                <span class="r-card__icon" aria-hidden="true">
                  <i :class="getIconClasses('quran', index)"></i>
                </span>
                <div class="r-card__head-text">
                  <h3 class="r-card__title">{{ plan.level }}</h3>
                  <p class="r-card__desc">Daily target: {{ plan.daily_target }}</p>
                  <button class="r-card__toggle" type="button" :aria-expanded="isQuranPlanExpanded(index)"
                    :aria-controls="`quran-plan-${index}`" @click="toggleQuranPlan(index)">
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
          <div v-if="hasSectionReferences(ramadan.quran_reading_plans.references)" class="r-inline-references">
            <p class="r-inline-references__title">{{ ramadan.labels.references }}</p>
            <p v-for="(ref, refIndex) in ramadan.quran_reading_plans.references"
              :key="`quran-plans-reference-${refIndex}`" class="r-inline-reference">
              <span class="r-inline-reference__citation">{{ ref.citation }}</span>
              <span v-if="referenceSummary(ref)"> - {{ referenceSummary(ref) }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="personal-plans" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            {{ ramadan.personal_plans.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.personal_plans.intro }}</p>
          <div class="r-section__controls">
            <button class="r-button r-button--ghost r-button--sm" type="button" @click="toggleAllPersonalPlans">
              {{ areAllPersonalPlansExpanded ? "Collapse all plans" : "Expand all plans" }}
            </button>
          </div>
        </div>
        <SectionToolbar section-id="personal-plans" :section-title="ramadan.personal_plans.section_title"
          :section-feedback="toolbarFeedback['personal-plans']"
          @whatsapp-share="shareSectionViaWhatsApp" @copy-section="copySectionContent" @print-section="printSection"
          @export-pdf="exportSectionPdf" @adjust-font="adjustSectionFont" />
        <div id="section-personal-plans-body" class="r-section__body" :style="sectionBodyStyle('personal-plans')">
          <div class="r-grid r-grid--double r-grid--stagger">
            <article v-for="(plan, index) in ramadan.personal_plans.plans" :key="plan.title"
              class="r-card r-card--persona">
              <div class="r-card__head">
                <span class="r-card__icon" aria-hidden="true">
                  <i :class="getIconClasses('personal', index)"></i>
                </span>
                <div class="r-card__head-text">
                  <h3 class="r-card__title">{{ plan.title }}</h3>
                  <button class="r-card__toggle" type="button" :aria-expanded="isPersonalPlanExpanded(index)"
                    :aria-controls="`personal-plan-${index}`" @click="togglePersonalPlan(index)">
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
            {{ ramadan.charity_guide.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.charity_guide.intro }}</p>
        </div>
        <SectionToolbar section-id="charity" :section-title="ramadan.charity_guide.section_title"
          :section-feedback="toolbarFeedback.charity"
          @whatsapp-share="shareSectionViaWhatsApp" @copy-section="copySectionContent" @print-section="printSection"
          @export-pdf="exportSectionPdf" @adjust-font="adjustSectionFont" />
        <div id="section-charity-body" class="r-section__body" :style="sectionBodyStyle('charity')">
          <div class="r-grid r-grid--double">
            <article class="r-card r-card--charity">
              <span class="r-card__icon" aria-hidden="true">
                <i class="fas fa-heart"></i>
              </span>
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
              <span class="r-card__icon" aria-hidden="true">
                <i class="fas fa-gift"></i>
              </span>
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
          <div v-if="hasSectionReferences(ramadan.charity_guide.references)" class="r-inline-references">
            <p class="r-inline-references__title">{{ ramadan.labels.references }}</p>
            <p v-for="(ref, refIndex) in ramadan.charity_guide.references" :key="`charity-reference-${refIndex}`"
              class="r-inline-reference">
              <span class="r-inline-reference__citation">{{ ref.citation }}</span>
              <span v-if="referenceSummary(ref)"> - {{ referenceSummary(ref) }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="health" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            {{ ramadan.health_food_tips.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.health_food_tips.intro }}</p>
        </div>
        <SectionToolbar section-id="health" :section-title="ramadan.health_food_tips.section_title"
          :section-feedback="toolbarFeedback.health"
          @whatsapp-share="shareSectionViaWhatsApp" @copy-section="copySectionContent" @print-section="printSection"
          @export-pdf="exportSectionPdf" @adjust-font="adjustSectionFont" />
        <div id="section-health-body" class="r-section__body" :style="sectionBodyStyle('health')">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article v-for="(section, index) in ramadan.health_food_tips.primary_sections" :key="section.title"
              class="r-card r-card--health">
              <span class="r-card__icon" aria-hidden="true">
                <i :class="getIconClasses('health', index)"></i>
              </span>
              <h3 class="r-card__title">{{ section.title }}</h3>
              <ul class="r-list">
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
          <div class="r-grid r-grid--double r-spacing-top">
            <article v-for="(section, index) in ramadan.health_food_tips.secondary_sections" :key="section.title"
              class="r-card r-card--health r-card--health-alt">
              <span class="r-card__icon" aria-hidden="true">
                <i :class="getIconClasses('health', index + 3)"></i>
              </span>
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

    <!-- <section id="duas" class="r-section r-section--alt">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            {{ ramadan.duas_prayers.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.duas_prayers.intro }}</p>
        </div>
        <div id="section-duas-body" class="r-section__body">
          <div class="r-story-grid">
            <article v-for="dua in ramadan.duas_prayers.daily_duas" :key="dua.occasion"
              class="r-story-card r-story-card--dua" :style="storyStyle()">
              <div class="r-story-content">
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
          <button class="r-link r-link--button" type="button" data-bs-toggle="modal" data-bs-target="#moreDuasModal">
            {{ ramadan.duas_prayers.view_more_label }}
          </button>
        </div>
      </div>
    </section> -->

    <section id="shorts" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
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
          <article v-for="item in ramadan.shorts.highlights" :key="item.link" class="ramadan-short-card"
            :style="storyStyle(item.thumbnail)">
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
            </div>
            <div class="ramadan-short-group__grid">
              <article v-for="item in group.items" :key="item.link"
                class="ramadan-short-card ramadan-short-card--compact" :style="storyStyle(item.thumbnail)">
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
            {{ ramadan.tools_calculators.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.tools_calculators.subtitle }}</p>
          <div v-if="ramadan.tools_calculators.intro" class="r-section__intro">
            <p v-for="(line, index) in ramadan.tools_calculators.intro" :key="index">{{ line }}</p>
          </div>
        </div>
        <div id="section-tools-body" class="r-section__body">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article v-for="(tool, index) in ramadan.tools_calculators.tools" :key="tool.title"
              class="r-card r-card--tool">
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
              <div class="r-card--tool__footer">
                <a :href="tool.link" class="r-button r-button--ghost r-card--tool__action" target="_blank"
                  rel="noopener">
                  {{ ramadan.labels.open_tool }}
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="platforms" class="r-section">
      <div class="container">
        <div class="r-section__head">
          <h2 class="r-section__title">
            {{ ramadan.platform_resources.section_title }}
          </h2>
          <p class="r-section__subtitle">{{ ramadan.platform_resources.subtitle }}</p>
        </div>
        <SectionToolbar section-id="platforms" :section-title="ramadan.platform_resources.section_title"
          :section-feedback="toolbarFeedback.platforms"
          @whatsapp-share="shareSectionViaWhatsApp" @copy-section="copySectionContent" @print-section="printSection"
          @export-pdf="exportSectionPdf" @adjust-font="adjustSectionFont" />
        <div id="section-platforms-body" class="r-section__body" :style="sectionBodyStyle('platforms')">
          <div class="r-grid r-grid--triple r-grid--stagger">
            <article v-for="(card, index) in ramadan.platform_resources.cards" :key="card.title"
              class="r-card r-card--resource">
              <div class="r-resource-card__header">
                <span class="r-card__icon" aria-hidden="true">
                  <i :class="getIconClasses('platforms', index)"></i>
                </span>
                <div class="r-resource-card__title-wrap">
                  <h3 class="r-card__title">{{ card.title }}</h3>
                  <p class="r-card__desc r-resource-card__desc">{{ card.description }}</p>
                </div>
                <button type="button" class="r-resource-toggle" @click="togglePlatformCard(index)"
                  :aria-expanded="isPlatformCardOpen(index)" :aria-label="`Toggle ${card.title}`">
                  <i class="fas" :class="isPlatformCardOpen(index) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                </button>
              </div>

              <div v-show="isPlatformCardOpen(index)" class="r-resource-list">
                <article v-for="item in card.items" :key="item.label" class="r-resource-item">
                  <div class="r-resource-item__head">
                    <span class="r-resource-item__logo-wrap" aria-hidden="true">
                      <img v-if="!failedPlatformLogos[item.link]" :src="item.logo" :alt="`${item.name || item.label} logo`"
                        class="r-resource-item__logo" loading="lazy" @error="markPlatformLogoFailed(item.link)" />
                      <span v-else class="r-resource-item__logo-fallback">
                        {{ resourceInitials(item.name || item.label) }}
                      </span>
                    </span>
                    <div class="r-resource-item__title-wrap">
                      <h4 class="r-resource-item__title">{{ item.name || item.label }}</h4>
                    </div>
                  </div>

                  <p v-if="item.note" class="r-resource-item__note">{{ item.note }}</p>

                  <div class="r-resource-item__footer">
                    <a class="r-resource-link r-button r-button--ghost r-resource-link--icon" :href="item.link"
                      target="_blank" rel="noopener" :aria-label="`Open ${item.name || item.label}`"
                      :title="`Open ${item.name || item.label}`">
                      <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    </a>
                  </div>
                </article>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- <div class="modal fade" id="moreDuasModal" tabindex="-1" aria-labelledby="moreDuasModalLabel" aria-hidden="true">
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
                <input id="duaSearchInput" class="r-input r-input--search" type="search" v-model="duaSearchTerm"
                  placeholder="Search by purpose, Arabic, or reference" autocomplete="off" />
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
              <div v-for="section in filteredDuaSections" :key="section.title" class="r-modal-card">
                <h3>{{ section.title }}</h3>
                <div class="r-story-grid r-story-grid--modal">
                  <article v-for="item in section.items" :key="`${item.name}-${item.reference}`"
                    class="r-story-card r-story-card--dua">
                    <div class="r-story-content">
                      <h4 class="r-story-title" v-html="highlightDuaText(item.name)"></h4>
                      <p class="r-arabic" dir="rtl" v-html="highlightDuaText(item.arabic)"></p>
                      <p class="r-translit" v-html="highlightDuaText(item.transliteration)"></p>
                      <p class="r-story-desc" v-html="highlightDuaText(item.translation)"></p>
                      <div class="r-story-meta">
                        <a class="r-story-duration" :href="item.resource" target="_blank" rel="noopener"
                          v-html="highlightDuaText(item.reference)"></a>
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
    </div> -->
    <button v-if="showFab" class="r-fab" type="button" @click="scrollToTop" aria-label="Scroll back to top"
      title="Scroll back to top">
      <span aria-hidden="true">⬆</span>
    </button>
  </div>
</template>

<script>
import ramadanData from "./data/ramadan_2026.json";
import SectionToolbar from "./SectionToolbar.vue";
import { fetchUserIdFromApi } from "../utils/bookmarkAuth";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default {
  name: "Ramadan2026Component",
  components: {
    SectionToolbar,
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
      hoveredCalendarDay: null,
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
      platformCardExpanded: {},
      failedPlatformLogos: {},
      iconPalettes: {
        fallback: ["fa-star"],
        timeline: ["fa-mosque", "fa-calendar-week", "fa-scroll", "fa-hourglass-half", "fa-star", "fa-sun"],
        fasting: ["fa-utensils", "fa-water", "fa-apple-alt", "fa-leaf", "fa-moon", "fa-sun"],
        quran: ["fa-book-open", "fa-hands-praying", "fa-scroll", "fa-lightbulb", "fa-compass"],
        personal: ["fa-users", "fa-home", "fa-hands-helping", "fa-seedling", "fa-star"],
        health: ["fa-apple-alt", "fa-water", "fa-bed", "fa-bicycle", "fa-leaf", "fa-heart"],
        platforms: ["fa-globe", "fa-laptop", "fa-mobile-alt", "fa-headphones", "fa-book", "fa-play"],
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
      sectionFontScale: {},
      toolbarFeedback: {},
      toolbarFeedbackTimeouts: {},
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
    this.clearAllToolbarFeedbackTimers();
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
    this.clearAllToolbarFeedbackTimers();
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
    keyDateHighlights() {
      const dates = this.ramadan.important_dates?.dates || [];
      const start = dates.find((date) => date.type === "start");
      const special = dates.find((date) => date.type === "special");
      const eid = dates.find((date) => date.type === "eid");
      const highlights = [];
      if (start) {
        highlights.push({
          icon: "fa-sun",
          title: "Ramadan begins",
          copy: `${start.gregorian_date} · ${start.description}`,
          showIcon: false,
        });
      }
      if (special) {
        highlights.push({
          icon: "fa-shapes",
          title: "Laylat al-Qadr focus",
          copy: `${special.gregorian_date} · ${special.description}`,
          showIcon: false,
        });
      }
      if (eid) {
        highlights.push({
          icon: "fa-sparkles",
          title: "Finish with Eid",
          copy: `${eid.gregorian_date} · ${eid.description}`,
          showIcon: false,
        });
      }
      return highlights;
    },
    selectedDay() {
      return this.calendarDays[this.selectedDayIndex] || null;
    },
    hoveredCalendarHint() {
      if (!this.hoveredCalendarDay) return null;
      return {
        title: `Day ${this.hoveredCalendarDay.dayNumber} · ${this.formatShortDate(this.hoveredCalendarDay.date)}`,
        event: this.hoveredCalendarDay.event || "No special events planned yet",
      };
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
      if (this.quranProgressRemaining <= 0) return "Completed";
      if (!this.quranProgress.dailyGoal) return "Set a daily goal";
      return this.quranEstimatedCompletionDate ? this.formatISODate(this.quranEstimatedCompletionDate) : "Set a daily goal";
    },
    quranOnboardingSteps() {
      return [
        {
          icon: "fa-book-open",
          title: "Choose your measurement",
          detail: "Select pages, juz, or hizb so the tracker matches the mushaf you read.",
        },
        {
          icon: "fa-bullseye",
          title: "Set totals & goals",
          detail: "Add your current progress, overall target, and a daily pace so estimates fall into place.",
        },
        {
          icon: "fa-bolt",
          title: "Log quick boosts",
          detail: "Use the +1/+3/+5 buttons or “Mark today complete” to keep streaks growing.",
        },
      ];
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
    hasSectionReferences(items) {
      return Array.isArray(items) && items.length > 0;
    },
    referenceSummary(reference) {
      if (!reference || typeof reference !== "object") return "";
      return reference.embedded_text || reference.summary || reference.excerpt || "";
    },
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
    isPlatformCardOpen(index) {
      return this.platformCardExpanded[index] !== false;
    },
    togglePlatformCard(index) {
      this.platformCardExpanded = {
        ...this.platformCardExpanded,
        [index]: !this.isPlatformCardOpen(index),
      };
    },
    markPlatformLogoFailed(link) {
      if (!link) return;
      this.failedPlatformLogos = {
        ...this.failedPlatformLogos,
        [link]: true,
      };
    },
    resourceInitials(value) {
      if (!value) return "R";
      const words = String(value)
        .replace(/[^a-zA-Z0-9 ]/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2);
      if (!words.length) return "R";
      return words.map((word) => word[0].toUpperCase()).join("");
    },
    breakdownStatusLabel(status) {
      if (status === "done") return "Completed";
      if (status === "partial") return "In progress";
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
    getIconClasses(palette, index) {
      const paletteList = this.iconPalettes?.[palette] || this.iconPalettes?.fallback || [];
      const iconName = paletteList[index % paletteList.length] || this.iconPalettes?.fallback?.[0] || "fa-star";
      return ["fas", iconName];
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
    setHoveredCalendarDay(day) {
      this.hoveredCalendarDay = day;
    },
    clearHoveredCalendarDay() {
      this.hoveredCalendarDay = null;
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
    scrollToQuranTracker() {
      if (typeof window === "undefined") return;
      const card = this.$refs.quranProgressCard;
      if (card && typeof card.scrollIntoView === "function") {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
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
    sectionBodyStyle(sectionId) {
      const scale = this.sectionFontScale[sectionId] || 1;
      return {
        fontSize: `${scale.toFixed(2)}em`,
      };
    },
    getSectionTitle(sectionId) {
      const titles = {
        overview: this.ramadan.overview?.section_title,
        history: this.ramadan.history?.section_title,
        "how-to-fast": this.ramadan.how_to_fast?.section_title,
        faq: this.ramadan.faq?.section_title,
        "quran-plans": this.ramadan.quran_reading_plans?.section_title,
        "personal-plans": this.ramadan.personal_plans?.section_title,
        charity: this.ramadan.charity_guide?.section_title,
        health: this.ramadan.health_food_tips?.section_title,
        platforms: this.ramadan.platform_resources?.section_title,
      };
      return titles[sectionId] || "";
    },
    getSectionShareText(sectionId) {
      const parts = [];
      const append = (value) => {
        if (!value) return;
        parts.push(value);
      };
      const title = this.getSectionTitle(sectionId);
      if (title) append(title);

      const overview = this.ramadan.overview;
      const history = this.ramadan.history;
      const howToFast = this.ramadan.how_to_fast;
      const faq = this.ramadan.faq;
      const quranPlans = this.ramadan.quran_reading_plans;
      const personalPlans = this.ramadan.personal_plans;
      const charity = this.ramadan.charity_guide;
      const health = this.ramadan.health_food_tips;
      const platforms = this.ramadan.platform_resources;

      switch (sectionId) {
        case "overview":
          append(overview?.subtitle);
          (overview?.body || []).forEach((para) => append(para));
          if (overview?.key_points?.length) {
            append("Key points:");
            overview.key_points.forEach((point) => append(`- ${point}`));
          }
          break;
        case "history":
          append(history?.subtitle);
          (history?.body || []).forEach((para) => append(para));
          if (history?.timeline?.length) {
            append("Timeline highlights:");
            history.timeline.forEach((item) =>
              append(`${item.period} – ${item.detail}${item.reference ? ` (${item.reference})` : ""}`)
            );
          }
          break;
        case "how-to-fast":
          append(howToFast?.intro);
          (howToFast?.cards || []).forEach((card) => {
            append(`${card.title}:`);
            (card.items || []).forEach((item) => append(`- ${item}`));
          });
          break;
        case "faq":
          (faq?.items || []).forEach((item) => {
            append(`Q: ${item.question}`);
            append(`A: ${item.answer}`);
          });
          break;
        case "quran-plans":
          append(quranPlans?.intro);
          (quranPlans?.plans || []).forEach((plan) => {
            append(`${plan.level} plan`);
            append(`Daily target: ${plan.daily_target}`);
            append(`Time needed: ${plan.time_needed}`);
            append(`Structure: ${plan.structure}`);
            append(`Goal: ${plan.goal}`);
            append(`Split: ${plan.split}`);
            if (plan?.tips?.length) {
              append("Tips:");
              plan.tips.forEach((tip) => append(`- ${tip}`));
            }
          });
          break;
        case "personal-plans":
          append(personalPlans?.intro);
          (personalPlans?.plans || []).forEach((plan) => {
            append(`${plan.title} (${plan.who_for})`);
            append(plan.overview);
            append(`Focus: ${plan.focus}`);
            append("Daily flow:");
            (plan.daily_flow || []).forEach((item) => append(`- ${item}`));
            append("Weekly focus:");
            (plan.weekly_focus || []).forEach((item) => append(`- ${item}`));
            append(`Accountability: ${plan.accountability}`);
          });
          break;
        case "charity":
          append(charity?.intro);
          (charity?.overview || []).forEach((para) => append(para));
          append(charity?.zakat_al_fitr?.title);
          (charity?.zakat_al_fitr?.points || []).forEach((point) => append(`- ${point}`));
          append(charity?.sadaqah_title);
          (charity?.sadaqah_ideas || []).forEach((idea) => append(`- ${idea}`));
          append(charity?.giving_checklist_title);
          (charity?.giving_checklist || []).forEach((item) => append(`- ${item}`));
          (charity?.impact_notes || []).forEach((note) => append(`Note: ${note}`));
          break;
        case "health":
          append(health?.intro);
          (health?.primary_sections || []).forEach((section) => {
            append(`${section.title}:`);
            (section.items || []).forEach((item) => append(`- ${item}`));
          });
          (health?.secondary_sections || []).forEach((section) => {
            append(`${section.title}:`);
            (section.items || []).forEach((item) => append(`- ${item}`));
          });
          if (health?.micro_tips?.length) {
            append("Micro tips:");
            health.micro_tips.forEach((tip) => append(`- ${tip}`));
          }
          break;
        case "platforms":
          (platforms?.intro || []).forEach((line) => append(line));
          (platforms?.cards || []).forEach((card) => {
            append(`${card.title}: ${card.description}`);
            (card.items || []).forEach((item) => append(`- ${item.label}`));
          });
          break;
        default:
          break;
      }

      return parts.join("\n\n");
    },
    shareSectionViaWhatsApp(sectionId) {
      const text = this.getSectionShareText(sectionId);
      if (!text || typeof window === "undefined") return;
      const encoded = encodeURIComponent(text);
      const shareUrl = `https://wa.me/?text=${encoded}`;
      const popup = window.open(shareUrl, "_blank", "noopener,noreferrer");
      if (!popup) {
        window.location.href = shareUrl;
      }
      this.setToolbarFeedback(sectionId, "Opening WhatsApp");
    },
    async copySectionContent(sectionId) {
      const text = this.getSectionShareText(sectionId);
      if (!text) return;
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          this.setToolbarFeedback(sectionId, "Copied to clipboard");
          return;
        } catch (error) {
          // fallback to execCommand
        }
      }
      if (typeof document === "undefined") return;
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("aria-hidden", "true");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        const copied = document.execCommand("copy");
        this.setToolbarFeedback(sectionId, copied ? "Copied to clipboard" : "Unable to copy section");
      } catch (error) {
        this.setToolbarFeedback(sectionId, "Unable to copy section");
      } finally {
        document.body.removeChild(textarea);
      }
    },
    printSection(sectionId) {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      const section = document.getElementById(sectionId);
      if (!section) return;
      const clone = section.cloneNode(true);
      const toolbar = clone.querySelector(".section-toolbar");
      if (toolbar) toolbar.remove();
      const sectionTitle = this.getSectionTitle(sectionId) || "Ramadan section";
      const printWindow = window.open("", "_blank", "width=700,height=900");
      if (!printWindow) {
        this.setToolbarFeedback(sectionId, "Allow pop-ups to print this section");
        return;
      }
      const style = `
        <style>
          body { font-family: 'Manrope', 'Segoe UI', sans-serif; padding: 2rem; background: #fff; color: #111; }
          h1, h2, h3, h4 { font-weight: 600; }
          ul { margin-left: 1.25rem; }
          p { line-height: 1.5; margin: 0 0 0.85rem 0; }
          a { color: #1b60ff; }
        </style>
      `;
      printWindow.document.write(`
        <html>
          <head>
            <title>${this.escapeHtml(sectionTitle)}</title>
            ${style}
          </head>
          <body>
            <h1>${this.escapeHtml(sectionTitle)}</h1>
            ${clone.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      this.setToolbarFeedback(sectionId, "Print dialog opened");
    },
    async exportSectionPdf(sectionId) {
      if (!sectionId || typeof window === "undefined" || typeof document === "undefined") return;
      const section = document.getElementById(sectionId);
      if (!section) return;
      const clone = section.cloneNode(true);
      const toolbar = clone.querySelector(".section-toolbar");
      if (toolbar) toolbar.remove();
      const sectionWidth = Math.min(section.offsetWidth || 900, 1200);
      const wrapper = document.createElement("div");
      wrapper.style.boxSizing = "border-box";
      wrapper.style.background = "#fff";
      wrapper.style.padding = "24px";
      wrapper.style.width = `${sectionWidth}px`;
      wrapper.appendChild(clone);
      const hidden = document.createElement("div");
      hidden.style.position = "fixed";
      hidden.style.top = "-9999px";
      hidden.style.left = "-9999px";
      hidden.style.opacity = "0";
      hidden.style.pointerEvents = "none";
      hidden.style.zIndex = "-1";
      hidden.appendChild(wrapper);
      document.body.appendChild(hidden);
      try {
        const scale = Math.min(Math.max(window.devicePixelRatio || 1, 1) * 1.5, 3);
        const canvas = await html2canvas(wrapper, {
          scale,
          backgroundColor: "#ffffff",
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png", 1);
        const orientation = canvas.width > canvas.height ? "landscape" : "portrait";
        const pdf = new jsPDF({
          orientation,
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        const sectionTitle = this.getSectionTitle(sectionId) || sectionId || "ramadan-section";
        const filenameSlug =
          sectionTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || sectionId || "ramadan-section";
        pdf.save(`${filenameSlug}.pdf`);
        this.setToolbarFeedback(sectionId, "PDF download ready");
      } catch {
        this.setToolbarFeedback(sectionId, "Unable to export PDF");
      } finally {
        if (document.body.contains(hidden)) {
          document.body.removeChild(hidden);
        }
      }
    },
    adjustSectionFont({ sectionId, delta } = {}) {
      if (!sectionId || !delta) return;
      const step = Number(delta) || 0;
      if (!step) return;
      const minScale = 0.8;
      const maxScale = 1.4;
      const current = this.sectionFontScale[sectionId] || 1;
      const next = Math.max(minScale, Math.min(maxScale, current + step));
      if (next === current) return;
      this.sectionFontScale = {
        ...this.sectionFontScale,
        [sectionId]: next,
      };
      const label = step > 0 ? "Font increased" : "Font decreased";
      this.setToolbarFeedback(sectionId, label);
    },
    setToolbarFeedback(sectionId, message) {
      if (!sectionId) return;
      this.toolbarFeedback = {
        ...this.toolbarFeedback,
        [sectionId]: message,
      };
      const timers = { ...(this.toolbarFeedbackTimeouts || {}) };
      if (timers[sectionId]) {
        clearTimeout(timers[sectionId]);
      }
      const timerId = setTimeout(() => {
        this.clearToolbarFeedback(sectionId);
      }, 3000);
      timers[sectionId] = timerId;
      this.toolbarFeedbackTimeouts = timers;
    },
    clearToolbarFeedback(sectionId) {
      if (!sectionId) return;
      const timers = { ...(this.toolbarFeedbackTimeouts || {}) };
      if (timers[sectionId]) {
        clearTimeout(timers[sectionId]);
        timers[sectionId] = null;
      }
      this.toolbarFeedbackTimeouts = timers;
      this.toolbarFeedback = {
        ...this.toolbarFeedback,
        [sectionId]: "",
      };
    },
    clearAllToolbarFeedbackTimers() {
      const timers = this.toolbarFeedbackTimeouts || {};
      Object.values(timers).forEach((timerId) => {
        if (timerId) {
          clearTimeout(timerId);
        }
      });
      this.toolbarFeedbackTimeouts = {};
      this.toolbarFeedback = {};
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
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap");

.ramadan-2026 {
  --r-ink: #0f1d2c;
  --r-ink-soft: #4e5d74;
  --r-accent: #1f7a68;
  --r-accent-deep: #14584a;
  --r-deep: #0c1824;
  --r-mist: #f5f6fb;
  --r-sage: #2c8d72;
  --r-rose: #d87f5d;
  --r-card: #ffffff;
  --r-line: rgba(15, 31, 50, 0.12);
  --r-shadow: 0 25px 60px rgba(15, 34, 48, 0.12);
  --r-ease: cubic-bezier(0.27, 1.05, 0.32, 1);
  --r-radius: 32px;
  --r-hover-lift: -6px;
  --r-hover-shadow: 0 28px 50px rgba(15, 34, 48, 0.22);
  --r-hover-ring: 0 0 0 1px rgba(215, 166, 74, 0.35);
  --r-hover-border: rgba(215, 166, 74, 0.7);
  font-family: "Manrope", "Segoe UI", sans-serif;
  color: var(--r-ink);
  background: var(--r-mist);
  padding-bottom: 80px;
}

.ramadan-2026 * {
  box-sizing: border-box;
}

.r-section__title,
.r-hero__title,
.r-card__title {
  font-family: "Playfair Display", "Fraunces", serif;
}

.r-hero {
  position: relative;
  padding: 96px 0 80px;
  overflow: hidden;
  color: #fdf7ef;
  background: radial-gradient(circle at 10% 10%, rgba(255, 229, 188, 0.45), transparent 45%),
    radial-gradient(circle at 85% 15%, rgba(185, 220, 225, 0.45), transparent 45%),
    linear-gradient(140deg, #173247, #2a5264 55%, #3f6a78);
  isolation: isolate;
}

.r-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02)),
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.35), transparent 55%),
    radial-gradient(circle at 80% 10%, rgba(255, 255, 205, 0.25), transparent 55%);
  opacity: 0.55;
  mix-blend-mode: screen;
  animation: heroGradient 18s linear infinite alternate;
  pointer-events: none;
}

.r-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 45%);
  background-size: 120px 120px;
  opacity: 0.3;
  animation: heroPattern 30s linear infinite;
  pointer-events: none;
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
  padding: clamp(2.75rem, 4vw, 4rem) 0;
  position: relative;
  overflow: visible;
  background: transparent;
}

.r-section::before,
.r-section::after {
  display: none;
}

.r-section .container {
  position: relative;
  z-index: 1;
}

.r-section__body {
  margin-top: 1rem;
  padding: clamp(2rem, 2vw, 3rem);
  border-radius: 32px;
  background: var(--r-card);
  border: 1px solid rgba(15, 34, 48, 0.08);
  box-shadow: var(--r-shadow);
}

.r-section__head {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 0;
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

.r-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-size: 1.2rem;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.5));
  border: 1px solid rgba(15, 34, 48, 0.15);
  box-shadow: 0 12px 18px rgba(15, 34, 48, 0.25);
  margin-bottom: 16px;
}

.r-card__icon--tag {
  margin-left: 8px;
  margin-bottom: 0;
  font-size: 0.85rem;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.6);
}

.r-card__icon--inline {
  margin-bottom: 6px;
}

.r-card__icon i {
  font-size: 1.35rem;
  color: var(--r-accent-deep);
}

.r-card__title i,
.r-breakdown__meta span i,
.r-progress__footer span i,
.r-progress-insights strong i,
.r-today-meta span i,
.r-quran-onboarding__step-icon i {
  margin-right: 0.35rem;
  font-size: 1rem;
  color: inherit;
}

.r-tooltip i {
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
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

.r-grid--how-to-fast {
  grid-template-columns: repeat(3, minmax(240px, 1fr));
}

.r-grid--how-to-fast.r-grid--stagger {
  gap: 26px;
}

@media (max-width: 1024px) {
  .r-grid--how-to-fast {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

.r-card {
  background: var(--r-card-bg, var(--r-card));
  border-radius: var(--r-radius);
  padding: 26px;
  border: 1px solid var(--r-card-outline, var(--r-line));
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

.r-card>* {
  position: relative;
  z-index: 1;
}

.r-card--timeline {
  padding-left: 34px;
  border-left: 4px solid rgba(215, 166, 74, 0.55);
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #fff4e2 100%);
  --r-card-outline: rgba(215, 166, 74, 0.25);
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
  --r-card-bg: linear-gradient(180deg, #ffffff 0%, #fff9f0 100%);
  --r-card-outline: rgba(215, 166, 74, 0.4);
  border-top: 3px solid rgba(215, 166, 74, 0.8);
}

.r-card--step {
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #fdf7f0 100%);
  --r-card-outline: rgba(201, 140, 120, 0.25);
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
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #f3f7f6 100%);
  --r-card-outline: rgba(111, 153, 164, 0.25);
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
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #f7f6f0 100%);
  --r-card-outline: rgba(111, 153, 164, 0.22);
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
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #fef4ed 100%);
  --r-card-outline: rgba(201, 140, 120, 0.25);
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
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #fff4e7 100%);
  --r-card-outline: rgba(215, 166, 74, 0.3);
}

.r-card--charity-alt {
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #f7f1ea 100%);
  --r-card-outline: rgba(201, 140, 120, 0.3);
}

.r-card--health {
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #f0f6f3 100%);
  --r-card-outline: rgba(76, 114, 96, 0.3);
}

.r-card--health-alt {
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #eef5f6 100%);
  --r-card-outline: rgba(111, 153, 164, 0.3);
}

.r-card--resource {
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #f2f8f7 100%);
  --r-card-outline: rgba(76, 114, 96, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 18px;
}

.r-card--resource .r-card__icon {
  width: 52px;
  height: 52px;
}

.r-card--resource .r-card__icon i {
  font-size: 1.5rem;
}

.r-card--resource .r-card__title {
  font-size: 1.45rem;
}

.r-resource-card__header {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
}

.r-resource-card__title-wrap {
  min-width: 0;
  flex: 1;
}

.r-resource-card__desc {
  margin-bottom: 0;
  font-size: 0.98rem;
  line-height: 1.42;
}

.r-resource-toggle {
  border: 1px solid rgba(15, 34, 48, 0.14);
  background: #fff;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--r-deep);
  font-size: 0.72rem;
  cursor: pointer;
  flex-shrink: 0;
}

.r-resource-toggle:hover {
  background: rgba(15, 34, 48, 0.06);
}

.r-resource-list {
  display: grid;
  gap: 0.55rem;
}

.r-resource-item {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(15, 34, 48, 0.1);
  box-shadow: 0 6px 14px rgba(15, 34, 48, 0.06);
  padding: 0.55rem 0.6rem;
}

.r-resource-item__head {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.r-resource-item__logo-wrap {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: #fff;
  border: 1px solid rgba(15, 34, 48, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.r-resource-item__logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.r-resource-item__logo-fallback {
  font-size: 0.63rem;
  font-weight: 700;
  color: var(--r-ink-soft);
}

.r-resource-item__title-wrap {
  min-width: 0;
}

.r-resource-item__title {
  margin: 0.1rem 0 0;
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--r-deep);
  line-height: 1.3;
}

.r-resource-item__note {
  margin: 0.4rem 0 0;
  color: var(--r-ink-soft);
  line-height: 1.48;
  font-size: 0.93rem;
}

.r-resource-item__footer {
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.r-card--faq {
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #f8f1e6 100%);
  --r-card-outline: rgba(215, 166, 74, 0.25);
}

.r-faq-question {
  margin-bottom: 12px;
}

.r-faq-answer {
  max-width: 520px;
}

.r-key-dates__highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0 1.5rem;
}

.r-card--mini {
  padding: 1rem;
  border-radius: 20px;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  --r-card-bg: linear-gradient(135deg, #ffffff, #faf7f3);
  --r-card-outline: rgba(15, 34, 48, 0.08);
}

.r-card--mini__icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(215, 166, 74, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--r-accent-deep);
}

.r-moon-sighting {
  margin-top: 1.5rem;
}

.r-card--moon {
  --r-card-bg: linear-gradient(135deg, #ffffff 0%, #fdf8f1 100%);
  --r-card-outline: rgba(237, 143, 38, 0.25);
  padding: 1.5rem;
}

.r-moon-sighting__intro {
  margin-bottom: 0.75rem;
  color: var(--r-ink-soft);
}

.r-moon-sighting__steps {
  margin: 0 0 0.75rem;
  padding-left: 1.25rem;
  line-height: 1.55;
}

.r-moon-sighting__steps li+li {
  margin-top: 0.35rem;
}

.r-moon-sighting__note {
  font-weight: 600;
  color: var(--r-accent-deep);
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
  background: rgba(255, 255, 255, 0.2);
  color: var(--r-deep);
  border: 1px solid rgba(255, 255, 255, 0.25);
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
  color: var(--r-ink);
  margin-top: 8px;
  line-height: 1.4;
  font-weight: 700;
}

.r-inline-references {
  margin-top: 18px;
}

.r-inline-references__title {
  margin: 0 0 8px;
  font-weight: 700;
  color: var(--r-ink);
  font-family: "Playfair Display", "Fraunces", serif;
  letter-spacing: 0;
  font-size: 1.55rem;
  line-height: 1.2;
}

.r-inline-reference {
  margin: 8px 0 0;
  color: var(--r-ink-soft);
  line-height: 1.5;
  font-family: "Manrope", sans-serif;
  font-size: 0.97rem;
}

.r-inline-reference__citation {
  color: var(--r-ink);
  font-weight: 700;
  font-family: "Playfair Display", "Fraunces", serif;
  letter-spacing: 0;
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
  position: relative;
  overflow: hidden;
  transition: transform 0.25s var(--r-ease), background 0.25s var(--r-ease), box-shadow 0.25s var(--r-ease);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.r-chip:hover {
  transform: translateY(-2px);
  background: rgba(215, 166, 74, 0.15);
  box-shadow: inset 0 0 0 1px rgba(215, 166, 74, 0.4), 0 8px 18px rgba(15, 34, 48, 0.12);
}

.r-chip::after {
  content: "";
  position: absolute;
  inset: 10% 20%;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.35), transparent 60%);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.r-chip:hover::after {
  opacity: 1;
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
  text-decoration: none;
  font-weight: 700;
  font-size: 0.72rem;
  padding: 0.22rem 0.45rem;
}

.r-resource-link--icon {
  min-width: 26px;
  min-height: 24px;
  border-radius: 7px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.r-resource-link:hover {
  text-decoration: none;
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

.r-card__icon--inline {
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
  --r-card-bg: #fff;
  --r-card-outline: rgba(15, 34, 48, 0.08);
  border: 1px solid rgba(15, 34, 48, 0.08);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.r-card--planner {
  --r-card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(253, 246, 234, 0.9));
  --r-card-outline: rgba(215, 166, 74, 0.25);
}

.r-card--tool__footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.r-card--tool__action {
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #0f1d2c;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.82));
  border: 1px solid rgba(15, 34, 48, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 4px 12px rgba(15, 34, 48, 0.1);
  transition: background 0.2s ease, transform 0.2s ease;
}

.r-card--tool__action:focus-visible,
.r-card--tool__action:hover {
  background: linear-gradient(135deg, #ffffff, #fdf6ec);
  transform: translateY(-1px);
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

.r-micro-tips .r-chip {
  background: linear-gradient(120deg, rgba(31, 122, 104, 0.9), rgba(20, 88, 74, 0.85));
  color: #fff;
  box-shadow: 0 6px 18px rgba(20, 88, 74, 0.35);
  animation: pulseHalo 5s ease-in-out infinite;
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
  transition: transform 0.35s var(--r-ease), box-shadow 0.35s var(--r-ease);
}

.ramadan-short-card::before {
  content: "";
  position: absolute;
  inset: -15% 0 auto;
  height: 35%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.35), transparent 70%);
  opacity: 0.6;
  pointer-events: none;
  animation: shimmerPulse 10s ease-in-out infinite;
}

.ramadan-short-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.7));
  z-index: 0;
}

.ramadan-short-card:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.35);
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
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.05);
  box-shadow: 0 20px 35px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-size: 0.75rem;
  color: #0f766e;
  margin: 0 0 0.3rem;
}

.ramadan-reminder-title {
  margin: 0;
  font-size: 1.55rem;
  color: #0c1c2e;
}

.ramadan-reminder-lead {
  margin: 0.35rem 0 0;
  color: #475569;
}

.ramadan-reminder-title {
  font-family: "Playfair Display", "Fraunces", serif;
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

.ramadan-reminder-form-shell,
.r-form-shell {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.ramadan-reminder-form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.ramadan-reminder-input,
.ramadan-reminder-select {
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 0.85rem 1.1rem;
  font-size: 0.95rem;
  font-family: inherit;
  background: #fefefe;
}

.ramadan-reminder-select {
  appearance: none;
}

.ramadan-reminder-submit {
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(27, 118, 110, 0.9), rgba(28, 96, 84, 0.95));
  color: #fff;
  font-weight: 700;
  padding: 0.9rem 1.6rem;
  cursor: pointer;
  align-self: flex-start;
  box-shadow: 0 16px 32px rgba(27, 118, 110, 0.25);
  letter-spacing: 0.04em;
}

.ramadan-reminder-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 36px rgba(27, 118, 110, 0.35);
}

.ramadan-reminder-submit,
.r-card--soft .r-button--primary {
  margin-top: auto;
  width: 100%;
}

.ramadan-reminder-submit,
.r-card--soft .r-button--primary {
  margin-top: auto;
  width: 100%;
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

.ramadan-checkbox input:checked+span {
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
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-top: 10px;
}

.r-modal-card {
  padding: 6px 0;
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  font-family: "Inter", "Source Sans Pro", "Noto Sans Arabic", sans-serif;
  transition: none;
  animation: none;
}

.r-dua-modal-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-bottom: 0.75rem;
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
  transition: none;
  animation: none;
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
  width: 100%;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(215, 166, 74, 0.35);
  background: linear-gradient(180deg, #fffdf7 0%, #fff7e9 100%);
  box-shadow: 0 18px 36px rgba(15, 34, 48, 0.10);
  position: relative;
}

.r-planner-head {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: space-between;
  align-items: flex-start;
}

.r-planner-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  min-width: 200px;
}

.r-planner-row+.r-planner-row {
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

.r-calendar {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(110px, 1fr));
  grid-auto-rows: 1fr;
  gap: 10px;
  padding: 8px;
  border-radius: 24px;
  border: 1px solid rgba(215, 166, 74, 0.35);
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.6);
}

.r-calendar__hint {
  grid-column: 1 / -1;
  margin-top: 8px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(215, 166, 74, 0.4);
  background: rgba(15, 34, 48, 0.04);
  font-size: 0.9rem;
  display: grid;
  gap: 4px;
  animation: pulseHalo 3.5s ease-in-out infinite;
  box-shadow: 0 8px 30px rgba(15, 34, 48, 0.12);
}

.r-calendar__hint strong {
  font-weight: 700;
  color: var(--r-deep);
}

.r-calendar__hint span {
  color: var(--r-ink-soft);
}

@media (max-width: 1280px) {
  .r-calendar {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
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

.r-interactive-layout {
  display: grid;
  gap: 20px;
}

.r-interactive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.r-quran-onboarding {
  padding: 18px 20px;
  border-radius: 18px;
  border: 1px solid rgba(215, 166, 74, 0.4);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  box-shadow: 0 18px 40px rgba(15, 34, 48, 0.12);
}

.r-quran-onboarding__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.r-quran-onboarding__header h4 {
  margin: 0;
  font-size: 1.15rem;
}

.r-quran-onboarding__hint {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--r-ink-soft);
}

.r-quran-onboarding__steps {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.r-quran-onboarding__step {
  padding: 12px;
  border-radius: 14px;
  border: 1px dashed rgba(76, 114, 96, 0.4);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.r-quran-onboarding__step-icon {
  font-size: 1.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(27, 117, 103, 0.08);
  color: #0f5f4f;
}

.r-quran-onboarding__cta-row {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.r-quran-onboarding__cta-hint {
  font-size: 0.85rem;
  color: var(--r-ink-soft);
}

.r-quran-onboarding--theme {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(247, 240, 229, 0.8));
  border: 1px solid rgba(215, 166, 74, 0.35);
}

.r-quran-onboarding__steps--theme {
  gap: 14px;
}

.r-quran-onboarding__step--theme {
  border: 1px solid rgba(111, 153, 164, 0.2);
  background: #fff;
  padding: 14px;
  box-shadow: 0 10px 30px rgba(15, 34, 48, 0.08);
  min-height: 120px;
}

.r-quran-onboarding__step-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}


.r-quran-onboarding__step-index {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--r-ink-soft);
}

.r-quran-onboarding__step h5 {
  margin: 0;
  font-size: 0.95rem;
}

.r-quran-onboarding__step p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--r-ink-soft);
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

.r-progress-insights>div {
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

.r-button--primary {
  background: linear-gradient(135deg, #1f7a68, #14584a);
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(20, 88, 74, 0.35);
}

.r-button--primary:hover {
  background: linear-gradient(135deg, #0f5f4f, #103c2f);
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

.r-calendar__cell {
  border: 1px solid rgba(15, 31, 42, 0.12);
  border-radius: 16px;
  padding: 10px;
  background: #fff;
  display: grid;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  min-height: 100px;
  box-shadow: 0 10px 22px rgba(15, 34, 48, 0.06);
}

.r-calendar__cell:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 34px rgba(15, 34, 48, 0.18);
}

.r-calendar__cell.is-selected {
  border-color: rgba(215, 166, 74, 0.8);
  box-shadow: 0 15px 32px rgba(215, 166, 74, 0.25);
  background: #fffaf3;
}

.r-calendar__cell.is-today {
  border-color: rgba(47, 107, 122, 0.8);
}

.r-calendar__cell.is-special {
  background: linear-gradient(180deg, rgba(215, 166, 74, 0.15), rgba(215, 166, 74, 0.05));
  border-color: rgba(215, 166, 74, 0.6);
}

.r-calendar__day {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--r-deep);
}

.r-calendar__date {
  font-size: 0.85rem;
  color: var(--r-ink-soft);
}

.r-calendar__event {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
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

.r-checkbox input:checked+span {
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

@keyframes heroGradient {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  100% {
    transform: translate3d(-20px, -10px, 0) scale(1.05);
  }
}

@keyframes heroPattern {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 200px 150px;
  }
}

@keyframes pulseHalo {
  0% {
    box-shadow: 0 6px 16px rgba(215, 166, 74, 0.08);
  }
  50% {
    box-shadow: 0 10px 26px rgba(215, 166, 74, 0.18);
  }
  100% {
    box-shadow: 0 6px 16px rgba(215, 166, 74, 0.08);
  }
}

@keyframes shimmerPulse {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 0.55;
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
  .r-grid--stagger>*:nth-child(odd) {
    margin-top: 8px;
  }

  .r-grid--stagger>*:nth-child(even) {
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
