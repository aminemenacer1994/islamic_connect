<template>
  <div
    class="revert-shell position-relative"
    v-cloak
    :class="{
      'reduce-motion': reduceMotionEnabled,
      'mobile-nav-open': mobileNavOpen
    }"
  >
    <a class="skip-link" href="#revert-main-content">Skip to main content</a>
    <canvas ref="confettiCanvas" class="confetti-canvas" aria-hidden="true"></canvas>

    <!-- Background Layers -->
    <div class="page-sheen"></div>
    <div class="background-pattern"></div>

    <!-- Mobile Nav Toggle (only visible in small screens) -->
    <button
      ref="mobileNavToggle"
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
    <div
      v-if="uiErrorMessage"
      class="alert alert-danger revert-error-alert d-flex align-items-start gap-2"
      role="alert"
      aria-live="assertive"
    >
      <i class="bi bi-exclamation-triangle-fill mt-1" aria-hidden="true"></i>
      <div class="flex-grow-1">
        <strong>Something went wrong.</strong>
        <div class="small mt-1">{{ uiErrorMessage }}</div>
      </div>
      <button type="button" class="btn-close" aria-label="Dismiss error" @click="uiErrorMessage = ''"></button>
    </div>

    <!-- MAIN CONTENT -->
    <main
      id="revert-main-content"
      tabindex="-1"
      class="container-fluid revert-content px-3 px-md-4 py-4 py-md-5"
      :style="{ fontSize: `${globalFontScale}rem` }"
    >
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
                :disabled="step.id > maxStepReached"
                :aria-disabled="step.id > maxStepReached"
                :tabindex="step.id > maxStepReached ? -1 : 0"
                @click="handleRoadmapPillClick(step, $event)">
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
          <LessonHeader
            :chapter-id="currentLesson?.chapterId"
            :title="currentLesson?.title"
            :summary="currentLesson?.summary"
            :progress-percentage="progressPercentage"
            :completed-chapters="completedChapters"
            :total-chapters="totalChapters"
            :max-step-reached="maxStepReached"
            @open-help="openHelpModal"
          />

          <div class="section-jump-nav mb-4" role="navigation" aria-label="Section navigation">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
              <span class="fw-semibold small">Jump to section</span>
              <span class="text-muted small">{{ sectionJumpLinks.length }} options</span>
            </div>
            <div class="section-jump-pillset">
              <button
                v-for="link in sectionJumpLinks"
                :key="`inline-${link.id}`"
                type="button"
                class="section-jump-pill d-inline-flex align-items-center gap-2 text-start"
                :class="{ active: activeSectionJumpId === link.id }"
                :aria-current="activeSectionJumpId === link.id ? 'true' : 'false'"
                :aria-label="`Jump to ${link.label}`"
                @click="jumpToContentSection(link.id)">
                <i class="bi" :class="link.icon" aria-hidden="true"></i>
                <span>{{ link.label }}</span>
              </button>
            </div>
          </div>

          <!-- Global search -->
          <div class="global-search-wrapper mb-4">
            <div
              id="global-search-section"
              class="resource-search-panel global-search-panel section-typography"
              :style="sectionFontStyle('globalSearch')">
              <div class="resource-search-header">
                <div>
                  <h4 class="resource-search-title">Global Search</h4>
                  <p class="resource-search-subtitle">
                    Search the full chapter in one place.
                  </p>
                </div>
                <div class="global-search-header-actions">
                  <button
                    type="button"
                    class="global-search-info-btn"
                    @click="openSearchInfoModal"
                    aria-label="About global search"
                  >
                    <i class="fas fa-info-circle" aria-hidden="true"></i>
                    <span class="visually-hidden">Info</span>
                  </button>
                </div>
              </div>
              <div v-show="isCardVisible('globalSearch')">
                <div class="resource-search-controls">
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
                  <div class="resource-search-control">
                    <label class="visually-hidden" for="global-search-category">Category</label>
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
                    <span class="global-search-count">
                      {{ globalSearchResultsCount }} results in {{ globalSearchSectionsCount }} categories
                    </span>
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
              <div class="section-control-stack ms-auto">
                <div class="section-font-controls" role="group" aria-label="Focus of this lesson font size">
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
                  <button
                    type="button"
                    class="section-toggle-btn card-toggle-btn"
                    @click="toggleCardVisibility('lessonFocus')"
                    :aria-expanded="isCardVisible('lessonFocus')"
                    :aria-label="isCardVisible('lessonFocus') ? 'Collapse focus summary' : 'Expand focus summary'">
                    <i class="bi" :class="isCardVisible('lessonFocus') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
                
              </div>
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
                <div class="d-flex flex-column">
                  <h3 class="fw-bold mb-0">Learning Paths</h3>
                  <div v-if="learningPathsMeta.wordCount" class="section-header-meta">
                    <span class="section-meta-pill">{{ learningPathsMeta.wordCount }} words</span>
                    <span class="section-meta-pill">{{ learningPathsMeta.readTime }} min read</span>
                  </div>
                </div>
              </div>
              <div class="overview-actions d-flex align-items-center gap-2 flex-wrap">
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
              <div class="section-control-stack ms-auto">
                <div class="section-font-controls" role="group" aria-label="Learning paths font size">
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
                  <button
                    type="button"
                    class="section-toggle-btn card-toggle-btn"
                    @click="toggleCardVisibility('learningOverview')"
                    :aria-expanded="isCardVisible('learningOverview')"
                    :aria-label="isCardVisible('learningOverview') ? 'Collapse learning overview' : 'Expand learning overview'">
                    <i class="bi" :class="isCardVisible('learningOverview') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
                
              </div>
            </div>
              <!-- lesson overview -->
            <div
              v-show="isCardVisible('learningOverview')"
              class="card-body"
              :style="{ fontSize: `${overviewFontScale}em`, lineHeight: 1.6 }"
            >
              <div v-if="currentLessonOverview" class="lesson-overview-summary">
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
                        :style="{ fontSize: `${overviewFontScale}em` }"
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
                        :style="{ fontSize: `${overviewFontScale}em` }"
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
                          :style="{ fontSize: `${overviewFontScale * 0.95}em` }"
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
            <div class="guided-pathway-header p-3">
              <div class="guided-pathway-header-top d-flex align-items-start justify-content-between flex-wrap gap-3">
                <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
                  <span class="card-header-icon">
                    <i class="bi bi-controller"></i>
                  </span>
                  <div class="guided-pathway-heading-text flex-grow-1 min-width-0">
                    <p class="text-teal small mb-1 fw-bold">Guided Pathway</p>
                    <h3 class="mb-0 fs-4 fw-bold">Short clips to carry the lesson forward</h3>
                  </div>
                </div>
                <div class="section-font-controls guided-pathway-controls" role="group" aria-label="Guided pathway font size">
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
                  <button
                    type="button"
                    class="section-toggle-btn card-toggle-btn ms-auto"
                    @click="toggleCardVisibility('pathwayClips')"
                    :aria-expanded="isCardVisible('pathwayClips')"
                    :aria-label="isCardVisible('pathwayClips') ? 'Collapse pathway clips' : 'Expand pathway clips'">
                    <i class="bi" :class="isCardVisible('pathwayClips') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
              </div>
              <p class="text-muted small mb-0 w-100 guided-pathway-desc">
                Pair a quick clip with your streak to keep the learning playful.
              </p>
            </div>

            <div id="pathway-clips-section" class="animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center gap-3">
                <span class="card-header-icon">
                  <i class="bi bi-film"></i>
                </span>
                <div>
                  <h2 class="fw-bold mb-0 fs-5">Pathway Clips</h2>
                  <p class="text-muted small mb-0">Short visual cues to keep each insight gripping.</p>
                </div>
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
            id="share-friend-section"
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
              <div class="section-control-stack ms-auto">
                <div class="section-font-controls" role="group" aria-label="Share with a friend font size">
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
                  <button
                    type="button"
                    class="section-toggle-btn card-toggle-btn"
                    @click="toggleCardVisibility('shareFriend')"
                    :aria-expanded="isCardVisible('shareFriend')"
                    :aria-label="isCardVisible('shareFriend') ? 'Collapse sharing' : 'Expand sharing'">
                    <i class="bi" :class="isCardVisible('shareFriend') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
                
              </div>
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
                <div class="d-flex flex-column">
                  <h3 class="fw-bold mb-0">Do's and Don'ts</h3>
                  <div v-if="dosDontsMeta.wordCount" class="section-header-meta">
                    <span class="section-meta-pill">{{ dosDontsMeta.wordCount }} words</span>
                    <span class="section-meta-pill">{{ dosDontsMeta.readTime }} min read</span>
                  </div>
                </div>
              </div>
              <div class="section-control-stack ms-auto">
                <div class="section-font-controls" role="group" aria-label="Dos and donts font size">
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
                  <button
                    type="button"
                    class="section-toggle-btn card-toggle-btn"
                    @click="toggleCardVisibility('dosDonts')"
                    :aria-expanded="isCardVisible('dosDonts')"
                    :aria-label="isCardVisible('dosDonts') ? 'Collapse Doʼs and Donʼts' : 'Expand Doʼs and Donʼts'">
                    <i class="bi" :class="isCardVisible('dosDonts') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
                
              </div>
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
                          <span class="text-dark medium mt-1" v-html="formatReferenceText(item.text)"></span>
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
                          <span class="text-dark medium mt-1" v-html="formatReferenceText(item.text)"></span>
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
                  <div v-if="duasMeta.wordCount" class="section-header-meta">
                    <span class="section-meta-pill">{{ duasMeta.wordCount }} words</span>
                    <span class="section-meta-pill">{{ duasMeta.readTime }} min read</span>
                  </div>
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
              <div class="section-control-stack ms-auto">
                <div class="section-font-controls" role="group" aria-label="Duas font size">
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
                  <button
                    type="button"
                    class="section-toggle-btn card-toggle-btn"
                    @click="toggleCardVisibility('duas')"
                    :aria-expanded="isCardVisible('duas')"
                    :aria-label="isCardVisible('duas') ? 'Collapse duas' : 'Expand duas'">
                    <i class="bi" :class="isCardVisible('duas') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
                
              </div>
            </div>
            <div
              v-show="isCardVisible('duas')"
              class="card-body"
              :style="{ fontSize: `${duaFontScale}em`, lineHeight: 1.5 }"
            >
              <div class="row g-3">
                <div v-for="dua in currentDuas" :key="dua.arabic" class="col-12 col-md-4">
                  <article class="dua-card h-100 rounded-4 p-4 shadow-lg">
                    <div class="dua-glow"></div>
                    <h4 class="mb-0 text-dark text-center pb-3" :style="{ fontSize: `${duaFontScale}rem` }"><b>{{ dua.title }}</b></h4>
                    <p dir="rtl"
                      class="fw-semibold lh-base mb-2 fs-5 text-teal border-bottom pb-2 text-end"
                      :style="{ fontSize: `${duaFontScale * 1.05}rem` }">
                      {{ dua.arabic }}
                    </p>
                    <p class="mb-0 text-dark" :style="{ fontSize: `${duaFontScale}rem` }">{{ dua.english }}</p>
                    <p
                      v-if="dua.reference"
                      class="mb-0 text-muted pt-2"
                      :style="{ fontSize: `${duaFontScale}rem` }"
                      v-html="formatReferenceText(dua.reference)"
                    ></p>

                  </article>
                </div>
              </div>
            </div>
          </div>

          <VideoGallery
            :section-style="sectionFontStyle('revertStories')"
            :visible="isCardVisible('revertStories')"
            :is-section-font-min="isSectionFontMin('revertStories')"
            :is-section-font-max="isSectionFontMax('revertStories')"
            :videos="revertStoriesPreview"
            :is-playing-video="isPlayingVideo"
            :is-video-previewing="isVideoPreviewing"
            :thumbnail-style="thumbnailStyle"
            :format-video-url="formatVideoUrl"
            :should-autoplay-video="shouldAutoplayVideo"
            :handle-video-card-click="handleVideoCardClick"
            :handle-video-card-touch="handleVideoCardTouch"
            :start-preview="startPreview"
            :stop-preview="stopPreview"
            :video-tags="videoTags"
            @decrease-font="decreaseSectionFont('revertStories')"
            @increase-font="increaseSectionFont('revertStories')"
            @toggle-visibility="toggleCardVisibility('revertStories')"
            @open-modal="showVideoModal = true"
          />

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
                  <div v-if="keyInsightsMeta.wordCount" class="section-header-meta">
                    <span class="section-meta-pill">{{ keyInsightsMeta.wordCount }} words</span>
                    <span class="section-meta-pill">{{ keyInsightsMeta.readTime }} min read</span>
                  </div>
                </div>
              </div>
            <div class="section-control-stack ms-auto">
              <div class="section-font-controls" role="group" aria-label="Key insights font size">
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
                <button
                  type="button"
                  class="section-toggle-btn card-toggle-btn"
                  @click="toggleCardVisibility('keyInsights')"
                  :aria-expanded="isCardVisible('keyInsights')"
                  :aria-label="isCardVisible('keyInsights') ? 'Collapse key insights' : 'Expand key insights'">
                  <i class="bi" :class="isCardVisible('keyInsights') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                </button>
              </div>
              
            </div>
            </div>
            <div v-show="isCardVisible('keyInsights')" class="card-body px-3 px-md-4 py-4">
            <div class="insight-grid-wrapper">
              <div class="insight-grid">
                  <article v-for="(insight, index) in insightsToShow" :key="`${insight}-${index}`" class="insight-card">
                    <div class="insight-card-accent" aria-hidden="true"></div>
                    <div class="insight-card-header">
                      <span class="insight-number">{{ index + 1 }}</span>
                    </div>
                    <p class="insight-card-text mb-0" v-html="formatReferenceText(insight)"></p>
                  </article>
              </div>
            </div>
          </div>
         </div>

          <!-- share and uplift -->
          <div
            id="share-uplift-section"
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
              <div class="section-control-stack ms-auto">
                <div class="section-font-controls" role="group" aria-label="Share and uplift font size">
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
                  <button type="button"
                    class="section-toggle-btn card-toggle-btn"
                    @click="toggleCardVisibility('shareUplift')"
                    :aria-expanded="isCardVisible('shareUplift')"
                    :aria-label="isCardVisible('shareUplift') ? 'Collapse share uplifit' : 'Expand share uplift'">
                    <i class="bi" :class="isCardVisible('shareUplift') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
                
              </div>
            </div>
            <div
              v-show="isCardVisible('shareUplift')"
              class="card-body"
              :style="{ fontSize: `${duaFontScale}em`, lineHeight: 1.5 }"
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
            id="chapter-tool-section"
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
                    <div v-if="commonQuestionsMeta.wordCount" class="section-header-meta">
                      <span class="section-meta-pill">{{ commonQuestionsMeta.wordCount }} words</span>
                      <span class="section-meta-pill">{{ commonQuestionsMeta.readTime }} min read</span>
                    </div>
                  </div>
                </div>
                <div class="section-control-stack ms-auto">
                  <div class="section-font-controls" role="group" aria-label="Common questions font size">
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
                    <button
                      type="button"
                      class="section-toggle-btn card-toggle-btn"
                      @click="toggleCardVisibility('commonQuestions')"
                      :aria-expanded="isCardVisible('commonQuestions')"
                      :aria-label="isCardVisible('commonQuestions') ? 'Collapse FAQs' : 'Expand FAQs'">
                      <i class="bi" :class="isCardVisible('commonQuestions') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                    </button>
                  </div>
                  
                </div>
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
                      <div v-html="formatReferenceHtml(panel.body)"></div>
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

          <!-- motivation -->
          <div
            id="motivation-section"
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
              <div class="section-control-stack ms-auto">
                <div class="section-font-controls" role="group" aria-label="Motivation font size">
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
                  <button
                    type="button"
                    class="section-toggle-btn card-toggle-btn"
                    @click="toggleCardVisibility('motivation')"
                    :aria-expanded="isCardVisible('motivation')"
                    :aria-label="isCardVisible('motivation') ? 'Collapse motivation' : 'Expand motivation'">
                    <i class="bi" :class="isCardVisible('motivation') ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
                  </button>
                </div>
                
              </div>
            </div>
            <div v-show="isCardVisible('motivation')" class="px-3 px-md-4 py-4">
              <div class="d-flex flex-column gap-2">
                <p class="text-muted medium mb-0">{{ motivationalMessage }}</p>
                <span class="text-teal fs-6">{{ motivationalHint }}</span>
              </div>
            </div>
          </div>

          <!-- resources -->
          <ResourcePanel
            :section-style="sectionFontStyle('resources')"
            :visible="isCardVisible('resources')"
            :is-section-font-min="isSectionFontMin('resources')"
            :is-section-font-max="isSectionFontMax('resources')"
            :resource-sections-with-keys="resourceSectionsWithKeys"
            :current-chapter-resources-layout="currentChapterResourcesLayout"
            :global-search-active="globalSearchActive"
            :resource-search-term="resourceSearchTerm"
            :highlight-resource-text="highlightResourceText"
            :is-section-visible="isSectionVisible"
            :toggle-section-visibility="toggleSectionVisibility"
            :resource-entry-parts="resourceEntryParts"
            :format-resource-reference-entry="formatResourceReferenceEntry"
            :format-resource-entry="formatResourceEntry"
            :copy-resource-entry="copyResourceEntry"
            @decrease-font="decreaseSectionFont('resources')"
            @increase-font="increaseSectionFont('resources')"
            @toggle-visibility="toggleCardVisibility('resources')"
          />
          
          <!-- quiz -->
          <QuizSection
            :section-style="sectionFontStyle('chapterQuiz')"
            :visible="isCardVisible('chapterQuiz')"
            :is-section-font-min="isSectionFontMin('chapterQuiz')"
            :is-section-font-max="isSectionFontMax('chapterQuiz')"
            :current-question="currentQuestion"
            :chapter-quiz-passed="chapterQuizPassed"
            :quiz-questions="quizQuestions"
            :current-question-index="currentQuestionIndex"
            :quiz-status="quizStatus"
            :selected-option="selectedOption"
            :quiz-feedback="quizFeedback"
            :quiz-progress-label="quizProgressLabel"
            :quiz-stage-label="quizStageLabel"
            :motivational-message="motivationalMessage"
            :motivational-hint="motivationalHint"
            :current-quiz-section-title="currentQuizSectionTitle"
            :quiz-momentum-percent="quizMomentumPercent"
            :quiz-hint-explanation="quizHintExplanation"
            :quiz-hint-section-id="quizHintSectionId"
            :quiz-required-correct="quizRequiredCorrect"
            @decrease-font="decreaseSectionFont('chapterQuiz')"
            @increase-font="increaseSectionFont('chapterQuiz')"
            @toggle-visibility="toggleCardVisibility('chapterQuiz')"
            @answer="answerQuiz"
            @retry="retryQuiz"
            @jump="scrollToSection"
          />

          <!-- NAVIGATION BUTTONS -->
          <div class="actions-card">
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

      <teleport to="body">
        <div v-if="showSearchInfoModal">
          <div class="modal-backdrop fade show custom-modal-backdrop" @click="closeSearchInfoModal"></div>
          <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog" aria-modal="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div ref="searchInfoModalContent" class="modal-content rounded-4 shadow-lg custom-modal-card search-info-modal">
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
                        <i class="fas fa-layer-group search-info-icon" aria-hidden="true"></i>
                        Search coverage
                      </div>
                      <p class="search-info-card-text">
                        Lesson summaries, learning paths, key insights, duas, stories, resources, and questions.
                      </p>
                    </li>
                    <li class="search-info-card">
                      <div class="search-info-card-title">
                        <i class="fas fa-quote-left search-info-icon" aria-hidden="true"></i>
                        Phrase matching
                      </div>
                      <p class="search-info-card-text">
                        Use quotes for exact phrases, like "tawheed foundation".
                      </p>
                    </li>
                    <li class="search-info-card">
                      <div class="search-info-card-title">
                        <i class="fas fa-filter search-info-icon" aria-hidden="true"></i>
                        Category filter
                      </div>
                      <p class="search-info-card-text">
                        Narrow results by category without leaving the search panel.
                      </p>
                    </li>
                    <li class="search-info-card">
                      <div class="search-info-card-title">
                        <i class="fas fa-location-arrow search-info-icon" aria-hidden="true"></i>
                        Jump to results
                      </div>
                      <p class="search-info-card-text">
                        Click any result to jump directly to that section on the page.
                      </p>
                    </li>
                    <li class="search-info-card">
                      <div class="search-info-card-title">
                        <i class="fas fa-highlighter search-info-icon" aria-hidden="true"></i>
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
          <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog" aria-modal="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
              <div ref="resourceModalContent" class="modal-content rounded-4 shadow-lg custom-modal-card">
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
          <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog" aria-modal="true">
            <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
              <div ref="videoModalContent" class="modal-content rounded-4 shadow-lg custom-modal-card">
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
                  <div class="row g-3 video-grid-row modal-video-grid">
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
          <div class="modal fade show d-block custom-modal-scale" tabindex="-1" role="dialog" aria-modal="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div ref="helpModalContent" class="modal-content rounded-4 shadow-lg custom-modal-card">
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
              <div ref="completionModalContent" class="modal-content rounded-4 shadow-lg custom-modal-card completion-modal-card">
                <div class="modal-header completion-modal-header px-4 pt-4 pb-3">
                  <div class="completion-header-left">
                    <span class="completion-icon">
                      <i class="fas fa-star-and-crescent completion-header-icon"></i>
                    </span>
                    <div>
                      <p class="completion-label mb-1">Milestone</p>
                      <h5 class="modal-title fw-bold mb-0">Beginner Path Complete</h5>
                    </div>
                  </div>
                  <button type="button" class="btn-close" aria-label="Close" @click="closeCompletionModal"></button>
                </div>
                <div class="modal-body completion-modal-body px-4 pb-4 pt-0">
                  <p class="completion-lead mb-2">Alhamdulillah, you've completed the Beginner path (15 chapters).</p>
                  <p class="completion-note mb-3">
                    May Allah bless your effort, increase your knowledge, and keep your heart steady. When you are ready, choose
                    the option that feels right to unlock the next stages. No pressure, your intention matters.
                  </p>
                  <div class="completion-divider"></div>
                  <div class="completion-options">
                    <div class="completion-option">
                      <div class="completion-option-text">
                        <p class="completion-option-title d-flex align-items-center gap-2">
                          <i class="fas fa-layer-group completion-option-icon"></i>
                          Unlock Intermediate (15 chapters)
                        </p>
                        <p class="completion-option-desc">
                          One-time £0.80 to open the Intermediate level and continue your journey.
                        </p>
                      </div>
                      <a
                        :href="intermediateUnlockStripeUrl"
                        class="btn completion-primary-btn d-inline-flex align-items-center gap-2"
                        target="_blank"
                        rel="noopener">
                        <i class="fas fa-unlock"></i>
                        Unlock Intermediate • £0.80
                      </a>
                    </div>
                    <div class="completion-option">
                      <div class="completion-option-text">
                        <p class="completion-option-title d-flex align-items-center gap-2">
                          <i class="fas fa-crown completion-option-icon"></i>
                          Unlock Intermediate + Advanced
                        </p>
                        <p class="completion-option-desc">
                          One-time £1.30 to unlock both 15-chapter sections together.
                        </p>
                      </div>
                      <a
                        :href="intermediateAdvancedBundleStripeUrl"
                        class="btn completion-secondary-btn d-inline-flex align-items-center gap-2"
                        target="_blank"
                        rel="noopener">
                        <i class="fas fa-unlock"></i>
                        Unlock Both • £1.30
                      </a>
                    </div>
                    <div class="completion-option">
                      <div class="completion-option-text">
                        <p class="completion-option-title d-flex align-items-center gap-2">
                          <i class="fas fa-wallet completion-option-icon"></i>
                          Pay what you can
                        </p>
                        <p class="completion-option-desc">
                          If those amounts are not easy today, choose any amount. Allah knows your intention.
                        </p>
                      </div>
                      <a
                        :href="nextPhaseFlexibleStripeUrl"
                        class="btn completion-secondary-btn d-inline-flex align-items-center gap-2"
                        target="_blank"
                        rel="noopener">
                        <i class="fas fa-coins"></i>
                        Choose an amount
                      </a>
                    </div>
                    <div class="completion-option">
                      <div class="completion-option-text">
                        <p class="completion-option-title d-flex align-items-center gap-2">
                          <i class="fas fa-heart completion-option-icon"></i>
                          Give a donation
                        </p>
                        <p class="completion-option-desc">
                          Support the work with sadaqah so more learners can benefit.
                        </p>
                      </div>
                      <a
                        :href="donationStripeUrl"
                        class="btn completion-ghost-btn d-inline-flex align-items-center gap-2"
                        target="_blank"
                        rel="noopener">
                        <i class="fas fa-hand-holding-heart"></i>
                        Give a donation
                      </a>
                    </div>
                  </div>
                  <p class="completion-footnote mb-0">Secure checkout via Stripe. May Allah reward your sincerity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </teleport>
    </div>
</template>


<script>
import RevertComponentLogic from './RevertComponentLogic.js'
export default RevertComponentLogic
</script>

<style src="./RevertComponent.css"></style>
