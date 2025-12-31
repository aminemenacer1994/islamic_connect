<template>
  <div class="revert-shell position-relative" v-cloak :class="{ 'reduce-motion': reduceMotionEnabled }">
    <canvas ref="confettiCanvas" class="confetti-canvas" aria-hidden="true"></canvas>

    <!-- Background Layers -->
    <div class="page-sheen"></div>
    <div class="background-pattern"></div>

    <!-- Mobile Nav Toggle (only visible in small screens) -->
    <button
      class="mobile-nav-toggle d-lg-none btn btn-light shadow-sm rounded-circle p-3 position-fixed top-3 start-3 z-3"
      :aria-label="mobileNavOpen ? 'Close chapter navigation' : 'Open chapter navigation'"
      :aria-expanded="mobileNavOpen ? 'true' : 'false'"
      aria-controls="revert-navigation"
      @click="toggleMobileNav">
      <i class="bi" :class="mobileNavOpen ? 'bi-x-lg' : 'bi-list'"></i>
    </button>
    <div
      v-if="mobileNavOpen"
      class="mobile-nav-backdrop"
      role="presentation"
      @click="toggleMobileNav"></div>

    <!-- Success Alert -->
    <teleport to="body">
      <div v-if="showSuccessAlert" class="success-alert-container">
        <div class="alert alert-success-custom fade show shadow-lg" role="alert">
          <i class="bi bi-check-circle-fill me-2"></i>
          <strong>Congratulations!</strong> {{ successMessage }}
        </div>
      </div>
    </teleport>
    <teleport to="body">
      <div v-if="showCopyAlert" class="copy-alert-container">
        <div :class="['alert', alertClass, 'alert-outline', 'alert-copy-notification']" role="status" aria-live="polite">
          <i :class="['me-2', iconClass]"></i>
          {{ copyAlertMessage }}
        </div>
      </div>
    </teleport>

    <!-- MAIN CONTENT -->
    <main class="container-fluid revert-content px-3 px-md-4 py-4 py-md-5" :style="{ fontSize: `${globalFontScale}rem` }">
      <div class="row g-3">

        <!-- SIDEBAR (chapter progress + roadmap navigation) -->
        <aside class="col-lg-3 col-md-3 mobile-nav-frame">
          <div
            class="navigation-card p-3 shadow-sm rounded-4"
            :class="{ 'mobile-open': mobileNavOpen }"
            id="revert-navigation"
            role="navigation"
            aria-label="Chapter navigation">
            <!-- Progress Section -->
            <div class="progress-indicator mb-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fw-bold small">Course Progress</span>
                <span class="text-muted small">{{ completedChapters }}/{{ totalChapters }}</span>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
              </div>
              <p class="text-muted small mb-0">
                {{ Math.round(progressPercentage) }}% Complete
              </p>
            </div>

            <div class="roadmap-header d-flex align-items-center justify-content-between mt-4 mb-2">
              <span class="fw-semibold small">Navigate the chapters</span>
              <span class="text-muted small">{{ completedChapters }} done</span>
            </div>

            <!-- Navigation List -->
            <div class="roadmap-pillset">
              <button
                v-for="step in roadmapData"
                :key="step.id"
                type="button"
                class="roadmap-pill d-flex align-items-center justify-content-between"
                :class="{
                  active: selectedPill === step.id,
                  completed: step.id < maxStepReached,
                  locked: step.id > maxStepReached
                }"
                :data-locked="step.id > maxStepReached"
                :aria-disabled="step.id > maxStepReached"
                @click="selectPill(step.id)">
                <div class="dot-wrapper d-flex align-items-center gap-2">
                  <span class="dot-icon-step">
                    <i v-if="step.id < maxStepReached" class="bi bi-check-lg"></i>
                    <i v-else-if="step.id === maxStepReached" class="bi bi-star-fill"></i>
                    <span v-else>{{ step.id }}</span>
                  </span>
                  <div>
                    <p class="mb-0 fw-semibold">{{ step.title }}</p>
                    <small class="text-muted d-block">{{ step.description }}</small>
                    <small
                      class="status-chip mt-1"
                      :class="{
                        completed: step.id < maxStepReached,
                        current: step.id === maxStepReached,
                        locked: step.id > maxStepReached
                      }">
                      {{ stepStatusLabel(step) }}
                    </small>
                  </div>
                </div>
                <i v-if="step.id === selectedPill" class="bi bi-arrow-up-right fs-5 text-teal"></i>
                <i v-else class="bi bi-chevron-down fs-5 text-muted"></i>
              </button>
            </div>

          </div>
        </aside>

        <!-- MAIN CONTENT AREA (lesson overview + resources) -->
        <section class="col-md-9 lesson-pane">
          <div class="mobile-chapter-select d-lg-none">
            <label class="form-label small text-muted fw-semibold" for="mobile-chapter-picker">
              Choose a chapter
            </label>
            <div class="mobile-chapter-select-pill d-flex align-items-center gap-2">
              <i class="bi bi-compass-fill"></i>
              <select
                id="mobile-chapter-picker"
                class="form-select"
                :value="selectedPill"
                aria-label="Select chapter"
                @change="selectPill($event.target.value)">
                <option
                  v-for="step in roadmapData"
                  :key="step.id"
                  :value="step.id"
                  :disabled="step.id > maxStepReached">
                  Chapter {{ step.id }} - {{ step.title }} ({{ stepStatusLabel(step) }})
                </option>
              </select>
            </div>
          </div>

          <!-- Lesson Header + tone summary -->
          <div id="lesson-overview-section" class="lesson-header animated-fade-in mb-4">
            <div class="lesson-hero position-relative overflow-hidden shadow-sm">
              <div class="lesson-hero-gradient"></div>
              <div class="lesson-hero-content">
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-journey me-2 text-white fs-4"></i>
                  <span class="text-uppercase text-white fw-bold small">
                    Chapter {{ currentLesson?.chapterId }}
                  </span>
                </div>
                <h1 class="fw-bold text-white text-start text-md-left mb-2">
                  {{ currentLesson?.title }}
                </h1>
                <p class="text-white-50 mb-0">
                  {{ currentLesson?.summary }}
                </p>
              </div>
              <button
                type="button"
                class="lesson-help-button"
                aria-label="Open Reverts Corner guide"
                @click="openHelpModal"
              >
                <i class="bi bi-question-circle-fill fs-4"></i>
                <span class="visually-hidden">Open guide</span>
              </button>
            </div>
          </div>

          <!-- Global search -->
          <div class="global-search-wrapper mb-4">
            <div class="resource-search-panel global-search-panel section-typography" :style="sectionFontStyle('globalSearch')">
              <div class="resource-search-header">
                <div>
                  <h4 class="resource-search-title">Global Search</h4>
                  <p class="resource-search-subtitle">
                    Search the full chapter in one place.
                  </p>
                </div>
                <div class="global-search-header-actions">
                  <div v-if="globalSearchActive" class="resource-search-metrics">
                    <span v-if="globalSearchActive" class="resource-count-pill">
                      {{ globalSearchResultsCount }} matches
                    </span>
                    <span v-if="globalSearchActive" class="resource-count-note">
                      {{ globalSearchSectionsCount }} categories
                    </span>
                  </div>
                  <button
                    type="button"
                    class="global-search-info-btn"
                    @click="openSearchInfoModal"
                    aria-label="How global search works"
                  >
                    <i class="bi bi-info-circle"></i>
                    <span>How it works</span>
                  </button>
                  <div class="section-font-controls" role="group" aria-label="Global search font size">
                    <button
                      type="button"
                      class="section-font-btn"
                      :disabled="isSectionFontMin('globalSearch')"
                      @click="decreaseSectionFont('globalSearch')"
                      aria-label="Decrease global search font size"
                    >
                      A-
                    </button>
                    <button
                      type="button"
                      class="section-font-btn"
                      :disabled="isSectionFontMax('globalSearch')"
                      @click="increaseSectionFont('globalSearch')"
                      aria-label="Increase global search font size"
                    >
                      A+
                    </button>
                  </div>
                  <button
                    type="button"
                    class="section-toggle-btn card-toggle-btn"
                    @click="toggleCardVisibility('globalSearch')"
                    :aria-expanded="isCardVisible('globalSearch')"
                    :aria-label="isCardVisible('globalSearch') ? 'Collapse global search' : 'Expand global search'">
                    <i class="bi" :class="isCardVisible('globalSearch') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
              </div>
              <div v-show="isCardVisible('globalSearch')">
                <div class="resource-search-input">
                  <i class="bi bi-search"></i>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search the entire chapter"
                    v-model="resourceSearchTerm"
                    aria-label="Search the entire chapter"
                  />
                  <button
                    v-if="resourceSearchTerm"
                    type="button"
                    class="btn btn-sm btn-outline-dark"
                    @click="clearResourceSearch"
                  >
                    Clear
                  </button>
                </div>
                <div class="resource-search-controls">
                  <div class="resource-search-control">
                    <label class="resource-search-label" for="global-search-category">Category</label>
                    <select
                      id="global-search-category"
                      class="form-select form-select-sm"
                      v-model="globalSearchCategory"
                    >
                      <option value="all">All categories</option>
                      <option v-for="option in globalSearchCategoryOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                </div>
                <div v-if="globalSearchActive" class="global-search-results">
                  <div class="global-search-summary">
                    <span class="global-search-count">{{ globalSearchResultsCount }} results</span>
                    <span class="global-search-count-note">across {{ globalSearchSectionsCount }} categories</span>
                  </div>
                  <div v-if="globalSearchResultsFilteredByCategory.length" class="global-search-group-list">
                    <article
                      v-for="group in globalSearchResultsFilteredByCategory"
                      :key="group.section"
                      class="global-search-group"
                    >
                      <h5 class="global-search-group-title">
                        <span class="global-search-group-icon" aria-hidden="true">
                          <i class="bi" :class="globalSearchSectionIcon(group.section)"></i>
                        </span>
                        <span v-html="highlightResourceText(group.section)"></span>
                        <span class="global-search-group-count">{{ group.results.length }}</span>
                      </h5>
                      <ul class="list-unstyled mb-0 global-search-result-list">
                        <li
                          v-for="(result, resultIndex) in group.results"
                          :key="`${group.section}-${resultIndex}`"
                          class="global-search-result"
                        >
                          <button
                            type="button"
                            class="global-search-result-button"
                            :aria-label="`Jump to ${group.section}`"
                            @click="scrollToGlobalSearchSection(group.section)"
                          >
                            <div class="global-search-result-heading">
                              <p v-if="result.title" class="global-search-result-title" v-html="highlightResourceText(result.title)"></p>
                              <span class="global-search-result-jump">
                                Go
                                <i class="bi bi-arrow-right-short" aria-hidden="true"></i>
                              </span>
                            </div>
                            <p v-if="result.snippet" class="global-search-result-snippet" v-html="highlightResourceText(result.snippet)"></p>
                          </button>
                        </li>
                      </ul>
                    </article>
                  </div>
                  <p v-else class="global-search-empty text-muted small">
                    No matches yet. Try a different keyword.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Revert stories -->
          <!-- <div v-if="currentGentleStartSteps.length" class="content-card onboarding-card mb-4 rounded-5 shadow-lg">
            <div class="card-header d-flex align-items-center justify-content-between gap-3 py-3">
              <div class="d-flex align-items-center gap-3">
                <span class="card-header-icon">
                  <i class="bi bi-sunrise-fill"></i>
                </span>
                <div>
                  <p class="mb-1 text-muted small text-uppercase">Gentle start</p>
                  <h3 class="fw-semibold mb-0">Simple Welcome for New Friends</h3>
                </div>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn ms-auto"
                @click="toggleCardVisibility('gentleStart')"
                :aria-expanded="isCardVisible('gentleStart')"
                :aria-label="isCardVisible('gentleStart') ? 'Collapse gentle start' : 'Expand gentle start'">
                <i class="bi" :class="isCardVisible('gentleStart') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('gentleStart')" class="card-body px-4 py-3">
              <p class="text-muted small mb-3">
                Take it slow these reflections anchor today’s lesson and help you stay curious.
              </p>
              <ul class="simple-onboarding-list mb-0">
                <li v-for="(step, index) in currentGentleStartSteps" :key="step.title"
                  :class="{ completed: isGentleStepCompleted(index) }">
                  <button
                    type="button"
                    class="onboarding-step-button"
                    :class="{ completed: isGentleStepCompleted(index) }"
                    @click="toggleGentleStepCompletion(index)"
                    :aria-pressed="isGentleStepCompleted(index)">
                    <span class="onboarding-bullet-icon" :class="{ completed: isGentleStepCompleted(index) }">
                      <i v-if="isGentleStepCompleted(index)" class="bi bi-check-lg"></i>
                    </span>
                    <div>
                      <strong class="d-block">{{ step.title }}</strong>
                      <span>{{ step.description }}</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div> -->

          <!-- Focus of the lesson -->
          <div
            id="lesson-focus-section"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg quiz-card section-typography"
            :style="sectionFontStyle('lessonFocus')">
            <div class="card-header d-flex align-items-center justify-content-between gap-3 py-3">
              <div class="d-flex align-items-center gap-3">
                <span class="card-header-icon">
                  <i class="bi bi-brightness-high-fill"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-0">Focus of This Lesson</h3>
                </div>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Focus of this lesson font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('lessonFocus')"
                  @click="decreaseSectionFont('lessonFocus')"
                  aria-label="Decrease focus section font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('lessonFocus')"
                  @click="increaseSectionFont('lessonFocus')"
                  aria-label="Increase focus section font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('lessonFocus')"
                :aria-expanded="isCardVisible('lessonFocus')"
                :aria-label="isCardVisible('lessonFocus') ? 'Collapse focus summary' : 'Expand focus summary'">
                <i class="bi" :class="isCardVisible('lessonFocus') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('lessonFocus')" class="card-body px-4 py-3">
              <p class="text-muted medium mb-3">
                {{ currentToneFocusText || currentLesson?.summary || 'Read slowly, ask questions, and pause between each section. This lesson is your new soft landing zone.' }}
              </p>
            </div>
          </div>

          <!-- main content (learning overview, highlights, sections) -->
          <div
            id="learning-paths-section"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
            :style="[sectionFontStyle('learningPaths'), { animationDelay: '0.05s' }]"
          >
            <div class="card-header d-flex align-items-center gap-3 flex-wrap py-3">
              <div class="d-flex align-items-center gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon">
                  <i class="bi bi-box-seam-fill"></i>
                </span>
                <h3 class="fw-bold mb-0">Learning Paths</h3>
              </div>
              <div class="overview-actions d-flex align-items-center gap-2 flex-wrap">
                <button
                  type="button"
                  class="btn btn-outline-teal btn-sm"
                  :class="{ marked: isCurrentLessonOverviewRead }"
                  @click="toggleLessonOverviewRead"
                  :aria-pressed="isCurrentLessonOverviewRead"
                  :aria-label="isCurrentLessonOverviewRead ? 'Unmark lesson overview as read' : 'Mark lesson overview as read'"
                >
                  <i class="bi" :class="isCurrentLessonOverviewRead ? 'bi-bookmark-x' : 'bi-bookmark'"></i>
                  <span>{{ isCurrentLessonOverviewRead ? 'Unmark read' : 'Mark as read' }}</span>
                </button>
                <div class="lesson-focus-actions">
                  <span class="header-action" role="button" tabindex="0" @click="shareLessonOverview">
                    <i class="bi bi-whatsapp fs-5"></i>
                    <span>Share</span>
                  </span>
                  <span class="header-action" role="button" tabindex="0" @click="copyLessonOverview">
                    <i class="bi bi-clipboard fs-5"></i>
                    <span>Copy</span>
                  </span>
                  <span class="header-action" role="button" tabindex="0" @click="printLessonOverview">
                    <i class="bi bi-printer fs-5"></i>
                    <span>Print</span>
                  </span>
                  <small v-if="lessonShareStatus" class="text-success small mb-0 ms-2">{{ lessonShareStatus }}</small>
                </div>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Learning paths font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('learningPaths')"
                  @click="decreaseSectionFont('learningPaths')"
                  aria-label="Decrease learning paths font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('learningPaths')"
                  @click="increaseSectionFont('learningPaths')"
                  aria-label="Increase learning paths font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('learningOverview')"
                :aria-expanded="isCardVisible('learningOverview')"
                :aria-label="isCardVisible('learningOverview') ? 'Collapse learning overview' : 'Expand learning overview'">
                <i class="bi" :class="isCardVisible('learningOverview') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
              <!-- lesson overview -->
            <div
              v-show="isCardVisible('learningOverview')"
              class="card-body"
              :style="{ fontSize: `${overviewFontScale * sectionFontScale('learningPaths')}em`, lineHeight: 1.6 }"
            >
              <div v-if="currentLessonOverview" class="lesson-overview-summary">
                <!-- <p class="text-muted small mb-3">{{ currentLessonOverview.summary }}</p> -->
                <div v-if="currentLessonOverview.highlights?.length" class="row g-3">
                  <div v-for="highlight in currentLessonOverview.highlights" :key="highlight.label || highlight.heading" class="col-12 col-md-4">
                    <article class="overview-highlight border rounded-3 p-3 h-100">
                      <h6 class="fw-semibold mb-2">{{ highlight.label || highlight.heading }}</h6>
                      <p class="mb-0 text-muted small">{{ highlight.description || highlight.content }}</p>
                    </article>
                  </div>
                </div>
              </div>
              <div v-if="overviewSectionsWithKeys.length" class="overview-section-list">
                <div
                  v-for="(section, index) in overviewSectionsWithKeys"
                  :key="section.toggleKey"
                  :id="`section-${selectedPill}-${index}`"
                  class="section-block mb-5"
                  :class="{ 'section-collapsed': !isSectionVisible(section.toggleKey) }">
                  <div class="section-header align-items-start gap-3 mb-3">
                    <div class="section-number fs-5">{{ index + 1 }}</div>
                    <div class="section-heading-actions flex-grow-1 d-flex align-items-center justify-content-between gap-3 flex-wrap">
                      <h5 class="fw-semibold mb-0 fs-5 text-truncate">{{ section.heading }}</h5>
                      <button
                        type="button"
                        class="section-toggle-btn"
                        :class="{ collapsed: !isSectionVisible(section.toggleKey) }"
                        @click="toggleSectionVisibility(section.toggleKey)"
                        :aria-expanded="isSectionVisible(section.toggleKey)"
                        :aria-controls="`section-content-${section.toggleKey}`"
                        :aria-label="isSectionVisible(section.toggleKey) ? 'Collapse section' : 'Expand section'">
                        <i class="bi" :class="isSectionVisible(section.toggleKey) ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                      </button>
                    </div>
                  </div>
                  <transition name="section-collapse" appear>
                    <div
                      v-if="isSectionVisible(section.toggleKey)"
                      :id="`section-content-${section.toggleKey}`"
                      class="section-content-wrapper">
                      <div
                        class="section-content text-dark fs-6 lh-lg"
                        :style="{ fontSize: `${overviewFontScale * sectionFontScale('learningPaths')}rem` }"
                        v-html="formatOverviewContent(section.content)"></div>
                      <div class="mt-3 small text-muted">
                        <p v-if="section.references" class="mb-1">
                          <strong class="me-2">Reference:</strong>
                          <span class="text-dark">{{ section.references }}</span>
                        </p>
                        <p v-if="section.resources" class="mb-0">
                          <strong class="me-2">Resource:</strong>
                          <a :href="section.resources" target="_blank" rel="noreferrer" class="text-teal">View source</a>
                        </p>
                      </div>
                      <div v-if="sectionStatsFor(section.heading).length" class="section-stats d-flex flex-wrap gap-3 mt-3">
                        <div v-for="stat in sectionStatsFor(section.heading)" :key="stat.label" class="section-stat-card">
                          <strong>{{ stat.value }}</strong>
                          <small class="text-muted">{{ stat.label }}</small>
                        </div>
                      </div>
                      <div class="pt-3 mt-3"></div>
                    </div>
                  </transition>
                </div>
              </div>
              <div v-else-if="lessonSectionsWithKeys.length" class="overview-section-list">
                <div
                  v-for="(section, index) in lessonSectionsWithKeys"
                  :key="section.toggleKey"
                  :id="`section-${selectedPill}-${index}`"
                  class="section-block mb-5"
                  :class="{ 'section-collapsed': !isSectionVisible(section.toggleKey) }">
                  <div class="section-header align-items-start gap-3 mb-3">
                    <div class="section-number fs-5">{{ index + 1 }}</div>
                    <div class="section-heading-actions flex-grow-1 d-flex align-items-center justify-content-between gap-3 flex-wrap">
                      <h5 class="fw-semibold mb-0 fs-5 text-truncate">{{ section.title }}</h5>
                      <button
                        type="button"
                        class="section-toggle-btn"
                        :class="{ collapsed: !isSectionVisible(section.toggleKey) }"
                        @click="toggleSectionVisibility(section.toggleKey)"
                        :aria-expanded="isSectionVisible(section.toggleKey)"
                        :aria-controls="`section-content-${section.toggleKey}`"
                        :aria-label="isSectionVisible(section.toggleKey) ? 'Collapse section' : 'Expand section'">
                        <i class="bi" :class="isSectionVisible(section.toggleKey) ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                      </button>
                    </div>
                  </div>
                  <transition name="section-collapse" appear>
                    <div
                      v-if="isSectionVisible(section.toggleKey)"
                      :id="`section-content-${section.toggleKey}`"
                      class="section-content-wrapper">
                      <div
                        class="section-content text-dark fs-6 lh-lg"
                        :style="{ fontSize: `${overviewFontScale * sectionFontScale('learningPaths')}rem` }"
                        v-html="formatOverviewContent(section.content)"></div>
                      <div class="mt-3 medium text-muted">
                        <p v-if="section.references" class="mb-1">
                          <strong class="me-2">Reference:</strong>
                          <span class="text-dark">{{ section.references }}</span>
                        </p>
                        <p v-if="section.resources" class="mb-0">
                          <strong class="me-2">Resource:</strong>
                          <a :href="section.resources" target="_blank" rel="noreferrer" class="text-teal">View source</a>
                        </p>
                      </div>
                      <div v-if="section.deepDive" class="background mt-4 w-100 py-3 px-4 rounded-4 border">
                        <div class="deep-dive-header d-flex align-items-center mb-2">
                          <i class="bi bi-lightbulb-fill me-2 fs-4 text-teal"></i>
                          <h6 class="fw-bold mb-0 text-dark fs-6">{{ section.deepDive.title }}</h6>
                        </div>
                        <div
                          class="deep-dive-content text-dark fs-6"
                          :style="{ fontSize: `${overviewFontScale * 0.95 * sectionFontScale('learningPaths')}rem` }"
                          v-html="section.deepDive.content"></div>
                      </div>
                      <div v-if="sectionStatsFor(section.title).length" class="section-stats d-flex flex-wrap gap-3 mt-3">
                        <div v-for="stat in sectionStatsFor(section.title)" :key="stat.label" class="section-stat-card">
                          <strong>{{ stat.value }}</strong>
                          <span class="text-muted">{{ stat.label }}</span>
                        </div>
                      </div>
                      <div class="pt-3 mt-3"></div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>

          <!-- Guided pathway clips and action cards -->
          <div
            id="guided-pathway-section"
            v-if="pathwayClips.length"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
            :style="sectionFontStyle('guidedPathway')"
          >
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 p-3">
              <div class="d-flex align-items-start gap-3">
                <span class="card-header-icon">
                  <i class="bi bi-controller"></i>
                </span>
                <div>
                  <p class="text-teal small mb-1 fw-bold flex-grow-1">Guided Pathway</p>
                  <h3 class="mb-1 fs-4 fw-bold">Short clips to carry the lesson forward</h3>
                  <p class="text-muted small mb-0">Pair a quick clip with your streak to keep the learning playful.</p>
                </div>
              </div>
              <div class="section-font-controls" role="group" aria-label="Guided pathway font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('guidedPathway')"
                  @click="decreaseSectionFont('guidedPathway')"
                  aria-label="Decrease guided pathway font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('guidedPathway')"
                  @click="increaseSectionFont('guidedPathway')"
                  aria-label="Increase guided pathway font size"
                >
                  A+
                </button>
              </div>
            </div>

            <div id="pathway-clips-section" class=" animated-fade-slide mb-4 rounded-4 ">
              <div class="card-header d-flex align-items-center gap-3">
                <span class="card-header-icon">
                  <i class="bi bi-film"></i>
                </span>
                <div>
                  <h2 class="fw-bold mb-0 fs-5">Pathway Clips</h2>
                  <p class="text-muted small mb-0">Short visual cues to keep each insight gripping.</p>
                </div>
                <button
                  type="button"
                  class="section-toggle-btn card-toggle-btn ms-auto"
                  @click="toggleCardVisibility('pathwayClips')"
                  :aria-expanded="isCardVisible('pathwayClips')"
                  :aria-label="isCardVisible('pathwayClips') ? 'Collapse pathway clips' : 'Expand pathway clips'">
                  <i class="bi" :class="isCardVisible('pathwayClips') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                </button>
              </div>
              <div v-show="isCardVisible('pathwayClips')" class="card-body px-3">
                <div class="row g-3">
                  <div v-for="clip in pathwayClips" :key="clip.title" class="col-12 col-md-4">
                    <article
                      class="clip-card h-100 rounded-4 border shadow-sm"
                      @mouseenter="startPreview(clip)"
                      @mouseleave="stopPreview"
                      @click="playClip(clip)">
                      <div v-if="isClipPlaying(clip) || isClipPreviewing(clip)" class="clip-thumbnail ratio ratio-16x9">
                        <iframe
                          :src="formatVideoUrl(clip.url, shouldAutoplayVideo(), isClipPreviewing(clip))"
                          :title="clip.title"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          loading="lazy">
                        </iframe>
                      </div>
                      <div v-else class="clip-thumbnail ratio ratio-16x9" :style="thumbnailStyle(clip)">
                        <div class="clip-overlay d-flex align-items-end justify-content-start p-3">
                          <span class="clip-label badge bg-white text-dark">Clip</span>
                        </div>
                      </div>
                        <div class="p-3">
                          <h3 class="h6 fw-semibold mb-1">{{ clip.title }}</h3>
                          <p class="text-muted small mb-2">{{ clip.description || 'Visual recap of today’s insight.' }}</p>
                        <div v-if="videoTags(clip, 'Pathway Clip').length" class="video-card-tags mb-2">
                          <span v-for="tag in videoTags(clip, 'Pathway Clip')" :key="tag" class="video-tag-badge">{{ tag }}</span>
                        </div>
                        <p v-if="clip.duration" class="clip-duration text-muted small mb-0">Duration: {{ clip.duration }}</p>
                        </div>
                      </article>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Share with a friend -->
          <div
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography section-share-friend"
            :style="sectionFontStyle('shareFriend')"
          >
            <div class="card-header d-flex align-items-center gap-3 flex-wrap py-3 px-3 px-md-3">
              <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon">
                  <i class="bi bi-share-fill"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-1">Share With a Friend or Family Member</h3>
                  <p class="text-muted mb-0 medium">
                    Share this lesson’s insights, dua reminders, and revert-story clips so a friend can walk through the same content.
                  </p>
                </div>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Share with a friend font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('shareFriend')"
                  @click="decreaseSectionFont('shareFriend')"
                  aria-label="Decrease share with a friend font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('shareFriend')"
                  @click="increaseSectionFont('shareFriend')"
                  aria-label="Increase share with a friend font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('shareFriend')"
                :aria-expanded="isCardVisible('shareFriend')"
                :aria-label="isCardVisible('shareFriend') ? 'Collapse sharing' : 'Expand sharing'">
                <i class="bi" :class="isCardVisible('shareFriend') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('shareFriend')" class="card-body px-3 px-md-3 py-3">
              <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                <div class="flex-grow-1">
                  <p v-if="shareFriendStatus" class="text-success small mt-2 mb-0" aria-live="polite" role="status">
                    {{ shareFriendStatus }}
                  </p>
                  <span class="visually-hidden" aria-hidden="false">
                    Feel free to share every insight, dua, and revert story on this page.
                  </span>
                </div>
                <div class="d-flex flex-wrap gap-2">
                  <button type="button" class="btn btn-outline-teal fw-semibold" @click="copyShareLink">
                    <i class="bi bi-clipboard mr-2"></i>
                    Copy link
                  </button>
                  <button type="button" class="btn btn-teal fw-semibold" @click="openWhatsappShare(getShareLink())">
                    <i class="bi bi-whatsapp mr-2"></i>
                    Share with WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- do's and don't -->
          <div
            id="dos-donts-section"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
            :style="sectionFontStyle('dosDonts')"
          >
            <div class="card-header d-flex align-items-center gap-3 flex-wrap py-3 px-3 px-md-3">
              <div class="d-flex align-items-center gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon">
                  <i class="bi bi-shield-fill-check"></i>
                </span>
                <h3 class="fw-bold mb-0">Do's and Don'ts</h3>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Dos and donts font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('dosDonts')"
                  @click="decreaseSectionFont('dosDonts')"
                  aria-label="Decrease dos and donts font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('dosDonts')"
                  @click="increaseSectionFont('dosDonts')"
                  aria-label="Increase dos and donts font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('dosDonts')"
                :aria-expanded="isCardVisible('dosDonts')"
                :aria-label="isCardVisible('dosDonts') ? 'Collapse Doʼs and Donʼts' : 'Expand Doʼs and Donʼts'">
                <i class="bi" :class="isCardVisible('dosDonts') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('dosDonts')" class="card-body px-3 px-md-3 py-3">
              <div class="mb-3">
                <p class="text-muted small mb-3">Guidance for {{ currentDosDonts.chapter }}</p>
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <article class="p-3 rounded-3 border h-100">
                      <h3 class="h6 fw-semibold text-dark mb-3">Do's</h3>
                      <ul class="list-unstyled mb-0">
                        <li v-for="item in currentDosDonts.dos" :key="item.id"
                          class="d-flex align-items-center gap-2 mb-2">
                          <i class="bi bi-check-circle-fill fs-5 text-teal"></i>
                          <span class="text-dark medium mt-1">{{ item.text }}</span>
                        </li>
                      </ul>
                    </article>
                  </div>
                  <div class="col-12 col-md-6">
                    <article class="p-3 rounded-3 border h-100">
                      <h3 class="h6 fw-semibold text-dark mb-3">Don'ts</h3>
                      <ul class="list-unstyled mb-0">
                        <li v-for="item in currentDosDonts.donts" :key="item.id"
                          class="d-flex align-items-center gap-2 mb-2">
                          <i class="bi bi-x-circle-fill fs-5 text-muted"></i>
                          <span class="text-dark medium mt-1">{{ item.text }}</span>
                        </li>
                      </ul>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- dua to carry -->
          <div
            id="duas-section"
            v-if="currentDuas.length"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
            :style="sectionFontStyle('duas')"
          >
            <div class="card-header d-flex align-items-center gap-3 flex-wrap mt-3 py-3">
              <div class="d-flex align-items-center gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon">
                  <i class="bi bi-bookmark-star-fill"></i>
                </span>
                <div class="flex-grow-1">
                  <h3 class="fw-bold mb-1">Duas to Carry</h3>
                </div>
              </div>
              <div class="lesson-focus-actions">
                <span class="header-action" role="button" tabindex="0" @click="shareDuas">
                  <i class="bi bi-whatsapp fs-5"></i>
                  <span>Share</span>
                </span>
                <span class="header-action" role="button" tabindex="0" @click="copyDuas">
                  <i class="bi bi-clipboard fs-5"></i>
                  <span>Copy</span>
                </span>
                <span class="header-action" role="button" tabindex="0" @click="printDuas">
                  <i class="bi bi-printer fs-5"></i>
                  <span>Print</span>
                </span>
                <small v-if="duaShareStatus" class="text-success small mb-0 ms-2">{{ duaShareStatus }}</small>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Duas font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('duas')"
                  @click="decreaseSectionFont('duas')"
                  aria-label="Decrease duas font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('duas')"
                  @click="increaseSectionFont('duas')"
                  aria-label="Increase duas font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('duas')"
                :aria-expanded="isCardVisible('duas')"
                :aria-label="isCardVisible('duas') ? 'Collapse duas' : 'Expand duas'">
                <i class="bi" :class="isCardVisible('duas') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div
              v-show="isCardVisible('duas')"
              class="card-body"
              :style="{ fontSize: `${duaFontScale * sectionFontScale('duas')}em`, lineHeight: 1.5 }"
            >
              <div class="row g-3">
                <div v-for="dua in currentDuas" :key="dua.arabic" class="col-12 col-md-4">
                  <article class="dua-card h-100 rounded-4 p-4 shadow-lg">
                    <div class="dua-glow"></div>
                    <h4 class="mb-0 text-dark text-center pb-3" :style="{ fontSize: `${duaFontScale * sectionFontScale('duas')}rem` }"><b>{{ dua.title }}</b></h4>
                    <p dir="rtl"
                      class="fw-semibold lh-base mb-2 fs-5 text-teal border-bottom pb-2 text-end"
                      :style="{ fontSize: `${duaFontScale * 1.05 * sectionFontScale('duas')}rem` }">
                      {{ dua.arabic }}
                    </p>
                    <p class="mb-0 text-dark" :style="{ fontSize: `${duaFontScale * sectionFontScale('duas')}rem` }">{{ dua.english }}</p>
                    <p class="mb-0 text-muted pt-2" :style="{ fontSize: `${duaFontScale * sectionFontScale('duas')}rem` }">{{ dua.reference }}</p>

                  </article>
                </div>
              </div>
            </div>
          </div>

          <!-- Reverts Stories videos -->
          <div
            id="revert-stories-section"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
            :style="sectionFontStyle('revertStories')"
          >
            <div class="card-header d-flex align-items-center gap-3 flex-wrap py-3">
              <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon">
                  <i class="bi bi-people-fill"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-1">Reverts Stories</h3>
                  <p class="text-muted small mb-0">Short journeys from our community, handpicked for this chapter.</p>
                </div>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Revert stories font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('revertStories')"
                  @click="decreaseSectionFont('revertStories')"
                  aria-label="Decrease revert stories font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('revertStories')"
                  @click="increaseSectionFont('revertStories')"
                  aria-label="Increase revert stories font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('revertStories')"
                :aria-expanded="isCardVisible('revertStories')"
                :aria-label="isCardVisible('revertStories') ? 'Collapse revert stories' : 'Expand revert stories'">
                <i class="bi" :class="isCardVisible('revertStories') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('revertStories')" class="card-body px-4 py-3">
              <div class="row g-3 video-grid-row">
                <div v-for="video in revertStoriesPreview" :key="video.title" class="col-12 col-md-3">
                  <article
                    class="video-card shadow-sm overflow-hidden h-100"
                    @mouseenter="startPreview(video)"
                    @mouseleave="stopPreview"
                    @click="handleVideoCardClick(video)"
                    @touchstart.stop="handleVideoCardTouch(video)">
                    <div class="video-card-media">
                      <div
                        v-if="isPlayingVideo(video) || isVideoPreviewing(video)"
                        class="video-feature"
                        :style="thumbnailStyle(video)">
                        <iframe
                          :src="formatVideoUrl(
                            video.url,
                            isPlayingVideo(video) || shouldAutoplayVideo(),
                            isVideoPreviewing(video) || (!shouldAutoplayVideo() && isPlayingVideo(video))
                          )"
                          :title="video.title"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          loading="lazy">
                        </iframe>
                      </div>
                      <div
                        v-else
                        class="video-feature"
                        :style="thumbnailStyle(video)">
                        <div class="video-feature-overlay">
                          <div class="video-feature-text">
                          <p class="video-feature-label">Revert story</p>
                          <h3 class="video-feature-title">{{ video.title }}</h3>
                          <p v-if="video.description" class="video-feature-subtitle">{{ video.description }}</p>
                          <p v-if="video.duration" class="video-feature-duration">Duration: {{ video.duration }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="video-card-caption px-3 py-2">
                    <h3 class="h6 fw-semibold mb-1 text-dark">{{ video.title }}</h3>
                    <div v-if="videoTags(video).length" class="video-card-tags mb-2">
                      <span v-for="tag in videoTags(video)" :key="tag" class="video-tag-badge">{{ tag }}</span>
                    </div>
                    <p v-if="video.description" class="text-muted small mb-1">{{ video.description }}</p>
                    <p v-if="video.duration" class="video-card-duration text-muted small mb-0">Duration: {{ video.duration }}</p>
                  </div>
                  </article>
                </div>
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button type="button" class="btn-see-more" @click="showVideoModal = true">
                  See more videos
                  <i class="bi bi-box-arrow-up-right"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- key insights -->
          <div
            id="key-insights-section"
            v-if="secondarySectionsReady && insightsToShow.length"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
            :style="sectionFontStyle('keyInsights')">
          <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3 flex-wrap">
            <div class="d-flex align-items-center gap-3 flex-grow-1">
              <span class="card-header-icon">
                <i class="bi bi-lightbulb-fill"></i>
              </span>
              <div class="d-flex flex-column">
                <h3 class="fw-bold mb-1">Key Insights</h3>
                <p class="text-muted small mb-0">Anchor the lesson with these quick takeaways.</p>
              </div>
            </div>
            <div class="section-font-controls ms-auto" role="group" aria-label="Key insights font size">
              <button
                type="button"
                class="section-font-btn"
                :disabled="isSectionFontMin('keyInsights')"
                @click="decreaseSectionFont('keyInsights')"
                aria-label="Decrease key insights font size"
              >
                A-
              </button>
              <button
                type="button"
                class="section-font-btn"
                :disabled="isSectionFontMax('keyInsights')"
                @click="increaseSectionFont('keyInsights')"
                aria-label="Increase key insights font size"
              >
                A+
              </button>
            </div>
            <button
              type="button"
              class="section-toggle-btn card-toggle-btn"
              @click="toggleCardVisibility('keyInsights')"
              :aria-expanded="isCardVisible('keyInsights')"
              :aria-label="isCardVisible('keyInsights') ? 'Collapse key insights' : 'Expand key insights'">
              <i class="bi" :class="isCardVisible('keyInsights') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
            </button>
          </div>
            <div v-show="isCardVisible('keyInsights')" class="card-body px-3 px-md-4 py-4">
              <div class="insight-hero mb-3">
                <strong class="text-dark d-block mb-1">Carry these sparks into your day</strong>
                <p class="text-muted small mb-0">
                  Pick the insight that feels timely and let it guide your next pause, prayer, or action.
                </p>
              </div>
            <div class="insight-grid-wrapper">
              <div class="insight-grid">
                  <article v-for="(insight, index) in insightsToShow" :key="`${insight}-${index}`" class="insight-card">
                    <div class="insight-card-accent" aria-hidden="true"></div>
                    <div class="insight-card-header">
                      <span class="insight-number">{{ index + 1 }}</span>
                    </div>
                    <p class="insight-card-text mb-0">{{ insight }}</p>
                  </article>
              </div>
            </div>
          </div>
        </div>

          <!-- share and uplift -->
          <div
            v-if="currentDuas.length"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography section-share-uplift"
            :style="sectionFontStyle('shareUplift')"
          >
            <div class="card-header d-flex align-items-center gap-3 flex-wrap mt-3 py-3">
              <div class="d-flex align-items-center gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon">
                  <i class="bi bi-share"></i>
                </span>
                <div class="flex-grow-1">
                  <h3 class="fw-bold mb-1">Share & Uplift</h3>
                </div>
              </div>
              <div class="lesson-focus-actions">
                <span class="header-action" role="button" tabindex="0" @click="shareDuas">
                  <i class="bi bi-whatsapp fs-5"></i>
                  <span>Share</span>
                </span>
                <span class="header-action" role="button" tabindex="0" @click="copyDuas">
                  <i class="bi bi-clipboard fs-5"></i>
                  <span>Copy</span>
                </span>
                <span class="header-action" role="button" tabindex="0" @click="printDuas">
                  <i class="bi bi-printer fs-5"></i>
                  <span>Print</span>
                </span>
                <small v-if="duaShareStatus" class="text-success small mb-0 ms-2">{{ duaShareStatus }}</small>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Share and uplift font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('shareUplift')"
                  @click="decreaseSectionFont('shareUplift')"
                  aria-label="Decrease share and uplift font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('shareUplift')"
                  @click="increaseSectionFont('shareUplift')"
                  aria-label="Increase share and uplift font size"
                >
                  A+
                </button>
              </div>
              <button type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('shareUplift')"
                :aria-expanded="isCardVisible('shareUplift')"
                :aria-label="isCardVisible('shareUplift') ? 'Collapse share uplifit' : 'Expand share uplift'">
                <i class="bi" :class="isCardVisible('shareUplift') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div
              v-show="isCardVisible('shareUplift')"
              class="card-body"
              :style="{ fontSize: `${duaFontScale * sectionFontScale('shareUplift')}em`, lineHeight: 1.5 }"
            >
              <div class="row align-items-center gy-3">
                <div class="col-md-6">
                  <p class="text-muted mb-3 fs-6 large">
                    Spread the lesson: copy the link or share a dua so others stay inspired.
                  </p>
                </div>
                <div class="col-md-6">
                <div class="share-actions d-flex flex-wrap align-items-center">
                    <button type="button" class="btn share-action-btn share-copy pr-2" @click="copyShareLink">
                      <i class="bi bi-clipboard me-2 fs-5"></i>
                      <span>Copy lesson link</span>
                    </button>
                    <button type="button" class="btn share-action-btn share-whatsapp" @click="openWhatsappShare(getShareLink())">
                      <i class="bi bi-whatsapp me-2 fs-5"></i>
                      <span>Share on WhatsApp</span>
                    </button>
                  </div>
                  <p v-if="shareFriendStatus" class="text-success small mt-2 mb-0 mt-sm-0">{{ shareFriendStatus }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- common asked questions -->
          <!-- chapter-specific tool -->
          <div
            v-if="chapterTool"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg chapter-tool-card section-typography"
            :style="sectionFontStyle('chapterTool')"
          >
            <div class="card-header d-flex align-items-center gap-3 flex-wrap py-2 position-relative">
              <div class="d-flex align-items-center gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon" aria-hidden="true">
                  <i :class="chapterTool.icon || 'bi bi-tools'"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-1">{{ chapterTool.title }}</h3>
                  <p class="text-muted small mb-0">{{ chapterTool.description }}</p>
                </div>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Chapter tool font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('chapterTool')"
                  @click="decreaseSectionFont('chapterTool')"
                  aria-label="Decrease chapter tool font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('chapterTool')"
                  @click="increaseSectionFont('chapterTool')"
                  aria-label="Increase chapter tool font size"
                >
                  A+
                </button>
              </div>
              <div class="chapter-tool-header-actions">
                <button
                  type="button"
                  class="chapter-tool-open"
                  @click="openChapterToolNewTab"
                  aria-label="Open {{ chapterTool.title }} in a new tab">
                  <i class="bi bi-box-arrow-up-right fs-4"></i>
                </button>
              </div>
            </div>
            <div class="card-body px-2 px-md-3 py-3">
              <div class="chapter-tool-content" @click.stop @mousedown.stop @touchstart.stop @keydown.stop>
                <div class="chapter-tool-scroll">
                  <div class="chapter-tool-zoom">
                    <Suspense>
                      <template #default>
                        <component
                          v-if="chapterToolComponent"
                          :is="chapterToolComponent"
                          class="chapter-tool-embed">
                        </component>
                        <div v-else class="chapter-tool-fallback text-center">
                          <p class="text-muted mb-3">Unable to load this tool right now.</p>
                        </div>
                      </template>
                      <template #fallback>
                        <div class="text-center text-muted py-5">
                          Loading {{ chapterTool.title }}…
                        </div>
                      </template>
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="common-questions-section"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
            :style="sectionFontStyle('commonQuestions')"
          >
              <div class="card-header d-flex align-items-center gap-3 flex-wrap py-3">
                <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
                  <span class="card-header-icon">
                    <i class="bi bi-question-circle-fill"></i>
                  </span>
                  <div>
                    <h3 class="fw-bold mb-1">Commonly Asked Questions</h3>
                    <p class="text-muted small mb-0">Answers pulled from the chapter conversation.</p>
                  </div>
                </div>
                <div class="section-font-controls ms-auto" role="group" aria-label="Common questions font size">
                  <button
                    type="button"
                    class="section-font-btn"
                    :disabled="isSectionFontMin('commonQuestions')"
                    @click="decreaseSectionFont('commonQuestions')"
                    aria-label="Decrease common questions font size"
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    class="section-font-btn"
                    :disabled="isSectionFontMax('commonQuestions')"
                    @click="increaseSectionFont('commonQuestions')"
                    aria-label="Increase common questions font size"
                  >
                    A+
                  </button>
                </div>
                <button
                  type="button"
                  class="section-toggle-btn card-toggle-btn"
                  @click="toggleCardVisibility('commonQuestions')"
                  :aria-expanded="isCardVisible('commonQuestions')"
                  :aria-label="isCardVisible('commonQuestions') ? 'Collapse FAQs' : 'Expand FAQs'">
                  <i class="bi" :class="isCardVisible('commonQuestions') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                </button>
              </div>
            <div v-show="isCardVisible('commonQuestions')">
              <div class="accordion-stack">
                <div v-for="(panel, index) in visibleCommonPanels" :key="panel.id" class="accordion-item-card">
                  <button type="button"
                    class="faq-question accordion-trigger d-flex justify-content-between align-items-center w-100"
                      :class="{ expanded: isAccordionOpen('common', index) }" @click="toggleAccordion('common', index)">
                      <span>{{ panel.title }}</span>
                      <i class="bi"
                        :class="isAccordionOpen('common', index) ? 'bi-dash-lg text-teal' : 'bi-plus-lg text-muted'"></i>
                    </button>
                    <div v-show="isAccordionOpen('common', index)" class="accordion-answer mt-2">
                      <div v-html="panel.body"></div>
                  </div>
                </div>
              </div>
              <div v-if="commonFaqHasMore" class="text-center mt-3">
                <button type="button" class="btn btn-sm btn-link text-teal" @click="expandFaq('common')">
                  Show {{ chapterCommonPanels.length - commonFaqDisplayLimit }} more
                </button>
              </div>
            </div>
          </div>

          <!-- troubleshooting guides -->
          <!-- <div v-if="troubleshootingGuides.length" class="content-card onboarding-card mb-4 rounded-5 shadow-lg troubleshooting-card">
            <div class="card-header d-flex align-items-center justify-content-between gap-3 py-3 flex-wrap">
              <div class="d-flex align-items-center gap-3 flex-grow-1">
                <span class="card-header-icon">
                  <i class="bi bi-tools"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-1">Troubleshooting Guides</h3>
                  <p class="text-muted small mb-0">Straightforward tips to smooth out the common hiccups.</p>
                </div>
              </div>
            </div>
            <div class="card-body px-3 px-md-4 py-3">
              <div class="row g-3">
                <div v-for="guide in troubleshootingGuides" :key="guide.title" class="col-12 col-md-4">
                  <article class="troubleshooting-guide-card h-100 p-3 rounded-4 border">
                    <h4 class="fw-semibold mb-2 fs-6">{{ guide.title }}</h4>
                    <p class="text-muted small mb-3">{{ guide.description }}</p>
                    <ul class="list-unstyled mb-0 troubleshooting-steps">
                      <li v-for="step in guide.steps" :key="step">
                        <span class="step-icon">
                          <i class="bi bi-caret-right-fill"></i>
                        </span>
                        <span>{{ step }}</span>
                      </li>
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </div> -->

          <!-- motivation -->
          <div
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography section-motivation"
            :style="sectionFontStyle('motivation')"
          >
            <div class="card-header d-flex align-items-center justify-content-between gap-3 py-3">
              <div class="d-flex align-items-center gap-3">
                <span class="card-header-icon">
                  <i class="bi bi-rocket-takeoff-fill"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-0">Motivation</h3>
                </div>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Motivation font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('motivation')"
                  @click="decreaseSectionFont('motivation')"
                  aria-label="Decrease motivation font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('motivation')"
                  @click="increaseSectionFont('motivation')"
                  aria-label="Increase motivation font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('motivation')"
                :aria-expanded="isCardVisible('motivation')"
                :aria-label="isCardVisible('motivation') ? 'Collapse motivation' : 'Expand motivation'">
                <i class="bi" :class="isCardVisible('motivation') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('motivation')" class="px-3 px-md-4 py-4">
              <div class="d-flex flex-column gap-2">
                <p class="text-muted medium mb-0">{{ motivationalMessage }}</p>
                <span class="text-teal fs-6">{{ motivationalHint }}</span>
              </div>
            </div>
          </div>

          <!-- plans -->
          <!-- <div class="content-card onboarding-card mb-4 rounded-5 shadow-lg">
            <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
              <div class="d-flex align-items-center gap-3 flex-grow-1">
                <span class="card-header-icon">
                  <i class="bi bi-calendar3-range"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-0">Curated Weekly & Monthly Plans</h3>
                  <p class="text-muted small mb-0">Pick the timeline that fits your current rhythm.</p>
                </div>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('curatedPlans')"
                :aria-expanded="isCardVisible('curatedPlans')"
                :aria-label="isCardVisible('curatedPlans') ? 'Collapse curated plans' : 'Expand curated plans'">
                <i class="bi" :class="isCardVisible('curatedPlans') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('curatedPlans')">
              <div class="card-body px-4 pb-0 pt-0">
                <div v-if="currentChapterPlans.length">
                  <div class="row g-3">
                    <div v-for="plan in currentChapterPlans" :key="plan.planId" class="col-12 col-md-4">
                      <article class="plan-card rounded-5 p-4 ">
                        <div class="plan-card__header d-flex align-items-start justify-content-between gap-3">
                          <div>
                            <p class="text-muted small mb-1 plan-card__duration">{{ plan.duration }}</p>
                            <h3 class="fw-semibold mb-2 fs-5">{{ plan.title }}</h3>
                            -- <p class="text-dark small mb-0 plan-card__summary">{{ plan.description }}</p> --
                          </div>
                          <span class="badge badge-pill plan-badge text-uppercase">{{ plan.planId.replace('-', ' ') }}</span>
                        </div>
                        <div class="plan-card__divider" aria-hidden="true"></div>
                        <div class="plan-card__body">
                          <ul class="plan-highlights list-unstyled mb-3">
                            <li
                              v-for="(highlight, index) in plan.highlights"
                              :key="`${plan.planId}-${index}`"
                              class="plan-highlight"
                              :class="{ completed: isCuratedHighlightCompleted(plan.planId, index) }"
                            >
                              <div class="plan-highlight-body">
                                <span class="plan-highlight-icon" aria-hidden="true"></span>
                                <span class="plan-highlight-text">{{ highlight }}</span>
                              </div>
                              <button
                                type="button"
                                class="plan-highlight-action"
                                :class="{ completed: isCuratedHighlightCompleted(plan.planId, index) }"
                                :aria-pressed="isCuratedHighlightCompleted(plan.planId, index)"
                                :aria-label="isCuratedHighlightCompleted(plan.planId, index) ? 'Highlight completed' : 'Mark highlight as complete'"
                                @click="toggleCuratedHighlightCompletion(plan.planId, index, plan.title, plan.highlights?.length || 0)"
                              >
                                <i class="bi" :class="isCuratedHighlightCompleted(plan.planId, index) ? 'bi-check-circle-fill' : 'bi-circle'"></i>
                                <span class="plan-highlight-action-text">
                                  {{ isCuratedHighlightCompleted(plan.planId, index) ? 'Completed' : 'Mark complete' }}
                                </span>
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div class="plan-card__footer d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                          <p class="mb-0 text-muted small plan-card__meta">
                            Crafted for the {{ plan.duration.toLowerCase() }} rhythm.
                          </p>
                          <div class="plan-action-icons" role="group" aria-label="Plan actions">
                            <button type="button" class="plan-action-icon plan-action-share" @click="sharePlan(plan)" :title="'Share ' + plan.title">
                              <i class="bi bi-whatsapp"></i>
                              <span class="visually-hidden">Share plan</span>
                            </button>
                            <button type="button" class="plan-action-icon plan-action-copy" @click="copyPlan(plan)" :title="'Copy ' + plan.title">
                              <i class="bi bi-clipboard"></i>
                              <span class="visually-hidden">Copy plan</span>
                            </button>
                            <button type="button" class="plan-action-icon plan-action-print" @click="printPlan(plan)" :title="'Print ' + plan.title">
                              <i class="bi bi-printer"></i>
                              <span class="visually-hidden">Print plan</span>
                            </button>
                            <button type="button" class="plan-action-icon plan-action-download" @click="downloadPlanAsPdf(plan)" :title="'Download ' + plan.title">
                              <i class="bi bi-file-earmark-pdf"></i>
                              <span class="visually-hidden">Download plan</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
                <div v-else class="text-muted small pt-3">
                  <p class="mb-1">Curated plans are loading, or new guides are being prepared for this chapter.</p>
                  <p class="mb-0">Check back after you visit the lesson overview and guided pathways.</p>
                </div>
              </div>
            </div>
          </div> -->

          <!-- flexible plan tracks -->
          <!-- <div v-if="currentFlexibleTracks.length" class="content-card onboarding-card mb-4 rounded-5 shadow-lg">
            <div class="card-header d-flex align-items-center justify-content-between gap-3 py-3">
              <div class="d-flex align-items-center gap-3 flex-grow-1">
                <span class="card-header-icon">
                  <i class="bi bi-shuffle"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-0">{{ currentFlexibleNote?.title || 'Flexible Pathway Tracks' }}</h3>
                  <p class="text-muted small mb-0">
                    {{ currentFlexibleNote?.description || 'Mix and match these companion routines to keep each chapter feeling fresh.' }}
                  </p>
                </div>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('flexibleTracks')"
                :aria-expanded="isCardVisible('flexibleTracks')"
                :aria-label="isCardVisible('flexibleTracks') ? 'Collapse flexible tracks' : 'Expand flexible tracks'">
                <i class="bi" :class="isCardVisible('flexibleTracks') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('flexibleTracks')" class="card-body px-4 py-3">
              <div class="row g-3">
                <div v-for="track in currentFlexibleTracks" :key="track.id" class="col-12 col-md-4">
                  <article class="flexible-track-card rounded-4 p-4 h-100">
                    <h4 class="fw-semibold mb-2 fs-5">{{ track.title }}</h4>
                    <p class="text-muted small mb-3">{{ track.description }}</p>
                    <ul class="flexible-track-steps list-unstyled mb-0">
                      <li v-for="step in track.steps" :key="step">
                        <span class="flex-step-icon" aria-hidden="true"></span>
                        <span>{{ step }}</span>
                      </li>
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </div> -->

          <!-- daily micro challenges -->
          <!-- <div v-if="dailyChallenges.length" class="content-card onboarding-card mb-4 rounded-5 shadow-lg">
            <div class="card-header d-flex align-items-center justify-content-between gap-3 py-3">
              <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon">
                  <i class="bi bi-stars"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-1">Daily Micro Challenges</h3>
                  <p class="text-muted small mb-0">Mark what you completed and keep the lesson in motion.</p>
                </div>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn ms-auto"
                @click="toggleCardVisibility('dailyChallenges')"
                :aria-expanded="isCardVisible('dailyChallenges')"
                :aria-label="isCardVisible('dailyChallenges') ? 'Collapse micro challenges' : 'Expand micro challenges'">
                <i class="bi" :class="isCardVisible('dailyChallenges') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('dailyChallenges')" class="card-body px-4 py-3">
              <div class="daily-challenge-progress mb-3">
                <div class="progress" role="progressbar" :aria-valuenow="dailyChallengeProgressPercent" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar" :style="{ width: dailyChallengeProgressPercent + '%' }"></div>
                </div>
                <div class="d-flex justify-content-between mt-1">
                  <small class="text-muted">{{ dailyChallengeCompletionLabel }}</small>
                  <small class="text-teal fw-semibold">{{ dailyChallengeProgressPercent }}%</small>
                </div>
              </div>
                <div class="daily-challenge-grid">
                  <button
                    v-for="challenge in dailyChallenges"
                    :key="challenge.id"
                    type="button"
                    class="daily-challenge-pill"
                    :class="{ completed: challenge.completed }"
                    @click="toggleChallenge(challenge.storageKey)"
                    :aria-pressed="challenge.completed"
                  >
                  <span class="challenge-icon" aria-hidden="true">
                    <i class="bi" :class="challenge.completed ? 'bi-check-lg' : 'bi-circle'"></i>
                  </span>
                  <div class="challenge-details text-start">
                    <strong class="d-block">{{ challenge.title }}</strong>
                    <small class="text-muted">{{ challenge.description }}</small>
                  </div>
                </button>
              </div>
              <div class="reflection-box mt-4">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <p class="fw-semibold mb-0">Reflection note</p>
                </div>
                <div class="reflection-actions mb-3">
                  <button
                    type="button"
                    class="btn reflection-action-btn reflection-action-primary btn-sm shadow-none"
                    @click="createNewReflectionNote"
                  >
                    Create new note
                  </button>
                  <button
                    type="button"
                    class="btn reflection-action-btn reflection-action-secondary btn-sm shadow-none"
                    @click="clearReflectionNote"
                    :disabled="!currentReflectionNote"
                  >
                    Clear note
                  </button>
                </div>
                <div v-if="reflectionStatus" class="reflection-status-pill">
                  <i class="bi bi-check-circle-fill"></i>
                  <span>{{ reflectionStatus }}</span>
                </div>
                <textarea
                  class="form-control reflection-input"
                  rows="3"
                  v-model="reflectionInput"
                  placeholder="Jot down a moment, dua, or action you want to remember..."
                ></textarea>
                <div class="d-flex align-items-center justify-content-between mt-2 gap-2 flex-wrap">
                  <small v-if="reflectionStatus" class="text-success mb-0">{{ reflectionStatus }}</small>
                  <button
                    type="button"
                    class="btn btn-teal btn-sm shadow-none"
                    :disabled="!reflectionInput.trim() && !currentReflectionNote"
                    @click="saveReflectionNote"
                  >
                    Save note
                  </button>
                </div>
              </div>
            </div>
          </div> -->

          
          <!-- resources -->
          <div
            id="resources-section"
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
            :style="sectionFontStyle('resources')"
          >
            <div class="card-header d-flex align-items-center justify-content-between gap-3 py-3">
              <div class="d-flex align-items-center gap-3">
                <span class="card-header-icon">
                  <i class="bi bi-book"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-0">References & Resources</h3>
                </div>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Resources font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('resources')"
                  @click="decreaseSectionFont('resources')"
                  aria-label="Decrease resources font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('resources')"
                  @click="increaseSectionFont('resources')"
                  aria-label="Increase resources font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('resources')"
                :aria-expanded="isCardVisible('resources')"
                :aria-label="isCardVisible('resources') ? 'Collapse resources' : 'Expand resources'">
                <i class="bi" :class="isCardVisible('resources') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('resources')" class="px-3 px-md-4 py-4">
              <p class="text-muted medium mb-3">Primary sources, classical texts, and modern tools for this chapter.</p>
              <div
                v-if="resourceSectionsWithKeys.length"
                class="resource-grid"
              >
                <article
                  v-for="(section, sectionIndex) in resourceSectionsWithKeys"
                  :key="section.toggleKey"
                  class="resource-section-card"
                >
                  <div class="resource-section-header">
                    <h4 class="resource-section-title" v-html="highlightResourceText(section.title)"></h4>
                    <button
                      type="button"
                      class="section-toggle-btn"
                      :class="{ collapsed: !isSectionVisible(section.toggleKey) }"
                      @click="toggleSectionVisibility(section.toggleKey)"
                      :aria-expanded="isSectionVisible(section.toggleKey)"
                      :aria-controls="`resource-section-${section.toggleKey}`"
                      :aria-label="isSectionVisible(section.toggleKey) ? 'Collapse resource section' : 'Expand resource section'">
                      <i class="bi" :class="isSectionVisible(section.toggleKey) ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                    </button>
                  </div>
                  <transition name="section-collapse" appear>
                    <div
                      v-if="isSectionVisible(section.toggleKey)"
                      :id="`resource-section-${section.toggleKey}`"
                      >
                      <div
                        v-for="(item, itemIndex) in section.items"
                        :key="`${section.title}-${sectionIndex}-${itemIndex}`"
                        class="resource-group"
                      >
                        <p v-if="item.label" class="resource-group-label" v-html="highlightResourceText(item.label)"></p>
                        <ul class="list-unstyled mb-0 resource-entry-list">
                          <li
                            v-for="(entry, entryIndex) in item.entries"
                            :key="`${section.title}-${sectionIndex}-${itemIndex}-${entryIndex}`"
                            class="resource-entry"
                          >
                            <span v-html="formatResourceEntry(entry, item.label)"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </transition>
                </article>
              </div>
              <p v-else-if="currentChapterResourcesLayout" class="resource-empty-state text-muted small">
                No resources match this search yet. Try different keywords or reset filters.
              </p>
              <p v-else class="resource-empty-state text-muted small">
                Resources for this chapter are being prepared.
              </p>
            </div>
          </div>
          
          <!-- quiz -->
          <div
            class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography section-quiz"
            :style="sectionFontStyle('chapterQuiz')"
          >
            <div class="card-header d-flex align-items-center gap-3 flex-wrap py-3">
              <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
                <span class="card-header-icon">
                  <i class="bi bi-journal-check"></i>
                </span>
                <div>
                  <h3 class="fw-bold mb-1">Chapter Quiz</h3>
                  <p class="text-muted small mb-0">Attempt the curated quiz to move to the next chapter.</p>
                </div>
              </div>
              <div class="section-font-controls ms-auto" role="group" aria-label="Chapter quiz font size">
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMin('chapterQuiz')"
                  @click="decreaseSectionFont('chapterQuiz')"
                  aria-label="Decrease chapter quiz font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  class="section-font-btn"
                  :disabled="isSectionFontMax('chapterQuiz')"
                  @click="increaseSectionFont('chapterQuiz')"
                  aria-label="Increase chapter quiz font size"
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                class="section-toggle-btn card-toggle-btn"
                @click="toggleCardVisibility('chapterQuiz')"
                :aria-expanded="isCardVisible('chapterQuiz')"
                :aria-label="isCardVisible('chapterQuiz') ? 'Collapse chapter quiz' : 'Expand chapter quiz'">
                <i class="bi" :class="isCardVisible('chapterQuiz') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
              </button>
            </div>
            <div v-show="isCardVisible('chapterQuiz')">
              <div v-if="currentQuestion">
                <div class="quiz-body px-4 py-3">
                  <div class="quiz-progress-wrapper mb-3">
                    <div class="quiz-progress-track">
                      <div class="quiz-progress-fill"
                        :style="{ width: ((currentQuestionIndex + (quizStatus === 'correct' ? 1 : 0)) / quizQuestions.length) * 100 + '%' }"></div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                      <p class="text-muted small mb-0">Progress toward mastery</p>
                      <p class="mb-0 small fw-semibold text-teal">{{ quizProgressLabel }}</p>
                    </div>
                  </div>
                  <div class="quiz-motivation-panel mb-3 shadow-sm rounded-4">
                    <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
                      <div class="quiz-motivation-icon d-flex align-items-center justify-content-center">
                        <i class="bi bi-lightning-charge-fill fs-5"></i>
                      </div>
                      <div class="flex-grow-1">
                        <p class="mb-0 fw-semibold">{{ motivationalMessage }}</p>
                        <p class="text-muted small mb-0">{{ motivationalHint }}</p>
                      </div>
                    </div>
                    <span class="quiz-stage-pill mt-2">{{ quizStageLabel }}</span>
                  </div>
                  <div class="quiz-focus-panel mb-3">
                    <div class="quiz-focus-detail">
                      <p class="text-muted small mb-1 text-uppercase">Section focus</p>
                      <p class="fw-semibold mb-0">{{ currentQuizSectionTitle }}</p>
                    </div>
                    <div class="quiz-momentum">
                      <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="text-muted small text-uppercase">Momentum</span>
                        <span class="quiz-momentum-value">{{ quizMomentumPercent }}%</span>
                      </div>
                      <div class="quiz-momentum-bar">
                        <span :style="{ width: `${quizMomentumPercent}%` }"></span>
                      </div>
                    </div>
                  </div>
                  <h3 class="fw-semibold text-dark mb-2 quiz-question">{{ currentQuestion.question }}</h3>
                  <div class="quiz-options-grid">
                    <button v-for="option in currentQuestion.options" :key="option" type="button"
                      class="btn quiz-option text-start d-flex align-items-center justify-content-between" :class="{
                        'quiz-option--correct': quizStatus === 'correct' && option === currentQuestion.answer,
                        'quiz-option--incorrect': quizStatus === 'incorrect' && option === selectedOption,
                        'quiz-option--neutral': !(quizStatus === 'correct' && option === currentQuestion.answer) && !(quizStatus === 'incorrect' && option === selectedOption),
                        'quiz-option--selected': selectedOption === option && quizStatus !== 'correct'
                      }" :disabled="chapterQuizPassed || quizStatus === 'correct'" :aria-pressed="selectedOption === option" @click="answerQuiz(option)">
                      <div>
                        <span>{{ option }}</span>
                      </div>
                      <div class="icon-stack">
                        <i v-if="quizStatus === 'correct' && option === currentQuestion.answer"
                          class="bi bi-check-circle-fill text-dark"></i>
                        <i v-else-if="quizStatus === 'incorrect' && option === selectedOption"
                          class="bi bi-x-circle-fill text-dark"></i>
                      </div>
                    </button>
                  </div>
                  <div
                    v-if="quizStatus && quizFeedback"
                    class="quiz-feedback-panel mt-3"
                    :class="{
                      'quiz-feedback-panel--correct': quizStatus === 'correct',
                      'quiz-feedback-panel--incorrect': quizStatus === 'incorrect'
                    }"
                    role="status"
                    aria-live="polite">
                    <div class="d-flex align-items-start gap-2">
                      <span class="quiz-feedback-icon">
                        <i v-if="quizStatus === 'correct'" class="bi bi-stars"></i>
                        <i v-else class="bi bi-arrow-repeat"></i>
                      </span>
                      <div>
                        <p class="mb-0 fw-semibold">{{ quizFeedback }}</p>
                        <small v-if="quizStatus === 'correct' && !chapterQuizPassed" class="text-muted">
                          Next question loading...
                        </small>
                        <small v-else-if="quizStatus === 'incorrect'" class="text-muted">
                          Try another choice or review the explanation below.
                        </small>
                      </div>
                    </div>
                  </div>
                  <div v-if="quizStatus === 'incorrect' && quizHintExplanation" class="quiz-explanation-card mt-3">
                    <div class="quiz-explanation-header">
                      <div class="d-flex align-items-center gap-2">
                        <i class="bi bi-lightbulb-fill fs-5 text-teal"></i>
                        <div>
                          <p class="mb-0 fw-semibold mb-3 fs-6">Explanation</p>
                        </div>
                      </div>
                    </div>
                    <span class="right-answer-pill text-muted">
                      <span class="text-dark fw-bold mt-2">Answer is: {{ currentQuestion.answer }}</span>
                    </span>
                    <div class="pt-2 text-muted">
                      <p class="mb-0">{{ quizHintExplanation }}</p>
                    </div>
                    <div class="quiz-explanation-footer mt-3">
                      <button
                        v-if="quizHintSectionId"
                        type="button"
                        class="btn btn-sm btn-explanation-link"
                        @click="scrollToSection(quizHintSectionId)">
                        Jump to the related lesson section
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="chapterQuizPassed" class="quiz-success-note mt-3">
                  <i class="bi bi-badge-check-fill text-teal me-2 fs-5"></i>
                  <div class="d-flex flex-column flex-md-row gap-2 align-items-start">
                    <div>
                      <p class="mb-0 fw-semibold text-teal">Great! {{ quizRequiredCorrect }} correct answers recorded.</p>
                      <small class="text-muted">The Next Chapter button above is now active.</small>
                    </div>
                    <button type="button"
                      class="btn btn-outline-teal btn-sm shadow-none"
                      @click="retryQuiz">
                      Retake quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- NAVIGATION BUTTONS -->
          <div class="actions-card animated-fade-in">
            <div
              class="p-4 p-md-3 d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-between gap-3">

              <button class="btn btn-outline-secondary fw-semibold px-4 py-3 fs-6 d-flex align-items-center gap-2"
                :class="{ 'opacity-50 cursor-not-allowed': selectedPill <= 1 }" :disabled="selectedPill <= 1"
                @click="selectPill(selectedPill - 1)">
                <i class="bi bi-arrow-left" aria-hidden="true"></i>
                Previous Chapter
              </button>

              <div class="d-flex flex-column flex-md-row align-items-center gap-2">
                <span class="text-muted small me-md-auto">Chapter {{ selectedPill }} of {{ roadmapData.length }}</span>
                <div v-if="chapterQuizPassed" class="text-teal small fw-semibold">Quiz cleared • Next Chapter unlocked.</div>
                <button class="btn next-btn fw-bold px-4 py-3 fs-6 text-white d-flex align-items-center gap-2"
                  :class="{
                    'next-ready': chapterQuizPassed && !isWaitingForNext,
                    'disabled': isWaitingForNext || !chapterQuizPassed
                  }"
                  :disabled="isWaitingForNext || !chapterQuizPassed"
                  @click="completeAndNext">
                  <span>{{ isWaitingForNext ? 'Processing...' : 'Next Chapter' }}</span>
                  <i class="bi bi-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <transition name="scroll-fab" appear>
      <button
        v-if="showScrollFab"
        class="scroll-top-fab d-flex align-items-center justify-content-center shadow"
        type="button"
        aria-label="Scroll to top"
        @click="scrollToTop">
        <i class="bi bi-arrow-up-short fs-1 text-white"></i>
      </button>
    </transition>

      <div v-if="showSearchInfoModal">
        <div class="modal-backdrop fade show custom-modal-backdrop" @click="closeSearchInfoModal"></div>
        <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content rounded-4 shadow-lg custom-modal-card search-info-modal">
              <div class="modal-header border-0 pt-4 px-4">
                <h5 class="modal-title fw-bold">About global search</h5>
                <button type="button" class="btn-close" aria-label="Close" @click="closeSearchInfoModal"></button>
              </div>
              <div class="modal-body px-4 py-3">
                <p class="search-info-lead">
                  Global search scans the entire chapter so you can find a concept, reference, or story in seconds.
                </p>
                <ul class="search-info-list">
                  <li class="search-info-card">
                    <div class="search-info-card-title">
                      <i class="bi bi-stars"></i>
                      Search coverage
                    </div>
                    <p class="search-info-card-text">
                      Lesson summaries, learning paths, key insights, duas, stories, resources, and questions.
                    </p>
                  </li>
                  <li class="search-info-card">
                    <div class="search-info-card-title">
                      <i class="bi bi-quote"></i>
                      Phrase matching
                    </div>
                    <p class="search-info-card-text">
                      Use quotes for exact phrases, like "tawheed foundation".
                    </p>
                  </li>
                  <li class="search-info-card">
                    <div class="search-info-card-title">
                      <i class="bi bi-funnel"></i>
                      Category filter
                    </div>
                    <p class="search-info-card-text">
                      Narrow results by category without leaving the search panel.
                    </p>
                  </li>
                  <li class="search-info-card">
                    <div class="search-info-card-title">
                      <i class="bi bi-cursor-fill"></i>
                      Jump to results
                    </div>
                    <p class="search-info-card-text">
                      Click any result to jump directly to that section on the page.
                    </p>
                  </li>
                  <li class="search-info-card">
                    <div class="search-info-card-title">
                      <i class="bi bi-palette"></i>
                      Highlighting
                    </div>
                    <p class="search-info-card-text">
                      Colored highlights show exactly where your terms appear.
                    </p>
                  </li>
                </ul>
              </div>
              <div class="modal-footer border-top px-4 py-3">
                <button type="button" class="btn btn-teal px-4" @click="closeSearchInfoModal">
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showResourceModal">
        <div class="modal-backdrop fade show custom-modal-backdrop"></div>
        <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content rounded-4 shadow-lg custom-modal-card">
              <div class="modal-header border-0 pt-4 px-4">
                <h5 class="modal-title fw-bold">{{ activeResource?.title }}</h5>
              </div>
              <div class="modal-body px-4 py-3">
              
                
              </div>
              <div class="modal-footer border-top px-4 py-3 flex-column flex-md-row gap-3">
                
                <div v-if="resourceCopyStatus" class="text-success small">
                  {{ resourceCopyStatus }}
                </div>
                <div class="d-flex gap-2">
                  <button type="button" class="btn btn-outline-dark px-4" @click="copyResourceLink">
                    <i class="bi bi-link-45deg"></i>
                    Copy Link
                  </button>
                  <button type="button" class="btn btn-teal px-4" @click="closeResourceModal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showVideoModal">
        <div class="modal-backdrop fade show custom-modal-backdrop"></div>
        <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content rounded-4 shadow-lg custom-modal-card">
              <div class="modal-header border-0 pt-4 px-4">
                <h5 class="modal-title fw-bold">All Revert Stories</h5>
                <button
                  v-if="hasStoryFilters"
                  type="button"
                  class="btn btn-sm btn-outline-dark ms-auto d-flex align-items-center gap-2"
                  @click="toggleVideoFilters"
                  :aria-pressed="showVideoFilters"
                  :aria-label="showVideoFilters ? 'Hide story filters' : 'Show story filters'">
                  <i class="bi" :class="showVideoFilters ? 'bi-eye-slash' : 'bi-eye'"></i>
                  <span class="d-none d-sm-inline">{{ showVideoFilters ? 'Hide filters' : 'Show filters' }}</span>
                </button>
              </div>
              <div class="modal-body px-4 py-3">
                <div v-if="hasStoryFilters" class="mb-3 video-modal-filters" v-show="showVideoFilters">
                  <div class="filter-grid">
                    <div class="filter-column">
                      <label class="filter-label">Search stories</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="Search by title or theme"
                        v-model="videoSearchTerm"
                      />
                    </div>
                    <div class="filter-column">
                      <label class="filter-label">Duration</label>
                      <select class="form-select form-select-sm" v-model="videoDurationFilter">
                        <option v-for="option in durationFilters" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                    <div class="filter-column">
                      <label class="filter-label">Gender</label>
                      <select class="form-select form-select-sm" v-model="videoGenderFilter">
                        <option v-for="option in genderFilters" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                    <div class="filter-column">
                      <label class="filter-label">Background</label>
                      <select class="form-select form-select-sm" v-model="videoBackgroundFilter">
                        <option v-for="option in backgroundFilterOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <p v-if="!filteredRevertStories.length" class="filter-empty text-muted small mt-2 mb-0">
                    No stories match those filters yet. Try resetting or broadening your search.
                  </p>
                </div>
                <div class="row g-3 video-grid-row">
                  <div v-for="video in filteredRevertStories" :key="'modal-' + video.title" class="col-12 col-md-6">
                    <article
                      class="video-card shadow-sm overflow-hidden h-100"
                      @mouseenter="startPreview(video)"
                      @mouseleave="stopPreview"
                      @click="handleVideoCardClick(video)"
                      @touchstart.stop.prevent="handleVideoCardTouch(video)">
                      <div class="video-card-media">
                        <div
                          v-if="isPlayingVideo(video) || isVideoPreviewing(video)"
                          class="video-feature"
                          :style="thumbnailStyle(video)">
                          <iframe
                            :src="formatVideoUrl(
                              video.url,
                              isPlayingVideo(video) || shouldAutoplayVideo(),
                              isVideoPreviewing(video) || (!shouldAutoplayVideo() && isPlayingVideo(video))
                            )"
                            :title="video.title"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            loading="lazy">
                          </iframe>
                        </div>
                        <div
                          v-else
                        class="video-feature"
                        :style="thumbnailStyle(video)">
                          <div class="video-feature-overlay">
                            <div class="video-feature-text">
                              <p class="video-feature-label">Revert story</p>
                              <h3 class="video-feature-title">{{ video.title }}</h3>
                              <p v-if="video.description" class="video-feature-subtitle">{{ video.description }}</p>
                              <p v-if="video.duration" class="video-feature-duration">Duration: {{ video.duration }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="video-card-caption px-3 py-2">
                        <div v-if="videoTags(video).length" class="video-card-tags mb-0">
                          <span v-for="tag in videoTags(video)" :key="tag + '-modal'" class="video-tag-badge">{{ tag }}</span>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
              <div class="modal-footer border-top px-4 py-3 flex-column flex-md-row gap-3">
                <div class="d-flex gap-2 ms-auto">
                  <button type="button" class="btn btn-outline-dark px-4" @click="closeVideoModal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showHelpModal">
        <div class="modal-backdrop fade show custom-modal-backdrop"></div>
        <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content rounded-4 shadow-lg custom-modal-card">
              <div class="modal-header border-0 pt-4 px-4">
                <div>
                  <h5 class="modal-title fw-bold mb-1">Reverts Corner Guide</h5>
                  <p class="text-muted small mb-0">A quick walkthrough of how this page keeps your reflections grounded.</p>
                </div>
                <button type="button" class="btn-close" aria-label="Close guide" @click="closeHelpModal"></button>
              </div>
              <div class="modal-body px-4 pb-4">
                <div v-for="(step, index) in helpGuideSteps" :key="step.title" class="guide-step-card">
                  <div class="guide-step-index">Step {{ index + 1 }}</div>
                  <h6 class="fw-semibold mb-1">{{ step.title }}</h6>
                  <p class="text-muted mb-0">{{ step.description }}</p>
                </div>
              </div>
              <div class="modal-footer border-0 px-4 pb-4 pt-2">
                <button type="button" class="btn btn-teal px-4" @click="closeHelpModal">Got it</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showCompletionModal">
        <div class="modal-backdrop fade show custom-modal-backdrop"></div>
        <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog" aria-modal="true">
          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content rounded-4 shadow-lg custom-modal-card completion-modal-card">
              <div class="modal-header completion-modal-header px-4 pt-4 pb-3">
                <div class="completion-header-left">
                  <span class="completion-icon">
                    <i class="bi bi-moon-stars"></i>
                  </span>
                  <div>
                    <p class="completion-label mb-1">Milestone</p>
                    <h5 class="modal-title fw-bold mb-0">Beginners Guide Complete</h5>
                  </div>
                </div>
                <button type="button" class="btn-close" aria-label="Close" @click="closeCompletionModal"></button>
              </div>
              <div class="modal-body completion-modal-body px-4 pb-4 pt-0">
                <p class="completion-lead mb-2">MashaAllah, you've completed the Beginners Guide.</p>
                <p class="completion-note mb-3">
                  May Allah bless your effort and keep your heart steady on this path. When you're ready, choose what feels
                  right today to continue to the next phase. No pressure. Take your time.
                </p>
                <div class="completion-divider"></div>
                <div class="completion-options">
                  <div class="completion-option">
                    <div class="completion-option-text">
                      <p class="completion-option-title">One-time £1.99</p>
                      <p class="completion-option-desc">
                        If it feels easy today, this keeps the lessons flowing and supports the work.
                      </p>
                    </div>
                    <button
                      type="button"
                      class="btn completion-primary-btn d-inline-flex align-items-center">
                      Pay £1.99
                    </button>
                  </div>
                  <div class="completion-option">
                    <div class="completion-option-text">
                      <p class="completion-option-title">Choose what you can</p>
                      <p class="completion-option-desc">
                        If £1.99 is not comfortable, pick a smaller amount that suits your situation.
                      </p>
                    </div>
                    <button
                      type="button"
                      class="btn completion-secondary-btn d-inline-flex align-items-center">
                      Choose an amount
                    </button>
                  </div>
                  <div class="completion-option">
                    <div class="completion-option-text">
                      <p class="completion-option-title">Continue for free</p>
                      <p class="completion-option-desc">
                        If you are not ready for the options above, continue without payment. May Allah make it easy.
                      </p>
                    </div>
                    <button type="button" class="btn completion-ghost-btn">
                      Continue for free
                    </button>
                  </div>
                </div>
                <p class="completion-footnote mb-0">Secure checkout via Stripe. May Allah reward your sincerity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import RevertComponentLogic from './RevertComponentLogic.js'
export default RevertComponentLogic
</script>

<style scoped src="./RevertComponent.css"></style>
