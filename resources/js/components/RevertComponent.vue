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

      <div class="row g-4">

        <!-- SIDEBAR (chapter progress + roadmap navigation) -->
        <aside class="col-12 col-md-3 col-lg-3 mobile-nav-frame">
          <div
            class="navigation-card p-3 shadow-sm rounded-4"
            :class="{ 'mobile-open': mobileNavOpen }"
            id="revert-navigation"
            role="navigation"
            aria-label="Chapter navigation">

            <!-- Progress Section -->
            <div class="progress-indicator mb-4">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fw-bold small">Course Progress</span>
                <span class="text-muted small">{{ completedChapters }}/{{ totalChapters }}</span>
              </div>

              <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
              </div>

              <p class="text-muted small mt-2 mb-0">
                {{ Math.round(progressPercentage) }}% Complete
              </p>
            </div>

            <!-- Navigation List -->
            <div class="roadmap-pillset">
              <div v-for="step in roadmapData" :key="step.id"
                class="roadmap-pill d-flex align-items-center justify-content-between" :class="{
                  active: selectedPill === step.id,
                  completed: step.id < maxStepReached,
                  locked: step.id > maxStepReached
                }" @click="selectPill(step.id)" :data-locked="step.id > maxStepReached">
                <div class="dot-wrapper d-flex align-items-center gap-2">
                  <span class="dot-icon-step">
                    <i v-if="step.id < maxStepReached" class="bi bi-check-lg"></i>
                    <i v-else-if="step.id === maxStepReached" class="bi bi-star-fill"></i>
                    <span v-else>{{ step.id }}</span>
                  </span>
                  <div>
                    <p class="mb-0 fw-semibold">{{ step.title }}</p>
                    <small class="text-muted">{{ step.description }}</small>
                  </div>
                </div>
                <i v-if="step.id === selectedPill" class="bi bi-arrow-up-right fs-5 text-teal"></i>
                <i v-else class="bi bi-chevron-down fs-5 text-muted"></i>
              </div>
            </div>

          </div>
        </aside>

        <!-- MAIN CONTENT AREA (lesson overview + resources) -->
        <section class="col-12 col-md-8 col-lg-9">
          <!-- Lesson Header + tone summary -->
          <div class="lesson-header animated-fade-in mb-4">
            <div class="lesson-hero position-relative overflow-hidden shadow-sm">
              <div class="lesson-hero-gradient"></div>
              <div class="lesson-hero-content">
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-journey me-2 text-white fs-4"></i>
                  <span class="text-uppercase text-white fw-semibold small">
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
              <!-- <div class="lesson-meta d-flex gap-3">
                <span class="badge badge-pill bg-light text-dark fw-semibold">
                  Objectives: {{ currentLesson?.learningObjectives?.length ?? 0 }}
                </span>
              </div> -->
            </div>
          </div>

          <!-- Gentle start onboarding for newcomers -->
          <div v-if="currentGentleStartSteps.length" class="content-card onboarding-card mb-4 rounded-4">
            <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
              <div class="d-flex flex-column flex-grow-1">
                <p class="mb-1 text-muted small text-uppercase">Gentle start</p>
                <h3 class="fw-semibold mb-0">Simple Welcome for New Friends</h3>
              </div>
              <button
                type="button"
                class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                @click="toggleSection('gentleStart')"
                :aria-expanded="!collapsedSections.gentleStart">
                <span class="d-none d-sm-inline">{{ collapsedSections.gentleStart ? 'Show' : 'Hide' }}</span>
                <i class="bi" :class="collapsedSections.gentleStart ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
              </button>
            </div>
            <div v-show="!collapsedSections.gentleStart" class="card-body px-4 py-3">
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
          </div>

          <div class="lesson-focus-intro d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <div>
              <strong class="d-block mb-1">Focus of This Lesson</strong>
              <p class="mb-0 text-muted medium">
                {{ currentToneFocusText || currentLesson?.summary || 'Read slowly, ask questions, and pause between each section. This lesson is your new soft landing zone.' }}
              </p>
            </div>
          </div>

          

            <!-- main content (learning overview, highlights, sections) -->
            <div class="content-card section-card animated-fade-slide mb-4 rounded-4" style="animation-delay: 0.05s">
                <div class="card-header d-flex align-items-center py-3 ">
                  <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-box-seam-fill fs-4 text-teal"></i>
                    <h2 class="fw-bold mb-0 fs-5 flex-grow-1">Learning Overview</h2>
                  </div>
                  <div class="lesson-focus-actions ms-auto">
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
                <!-- lesson overview -->
              <div class="card-body" :style="{ fontSize: `${overviewFontScale}em`, lineHeight: 1.6 }">
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
                <div v-if="overviewSections.length" class="overview-section-list">
                  <div v-for="(section, index) in overviewSections" :key="section.heading"
                    :id="`section-${selectedPill}-${index}`"
                    class="section-block mb-5">
                    <div class="d-flex align-items-start gap-3 mb-3">
                      <div class="section-number fs-5">{{ index + 1 }}</div>
                      <h5 class="fw-semibold mb-0 fs-5">{{ section.heading }}</h5>
                    </div>
                    <div class="section-content text-dark fs-6 lh-lg"
                      :style="{ fontSize: `${overviewFontScale}rem` }">
                      {{ section.content }}
                    </div>
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
                </div>
                <div v-else-if="currentLesson?.sections?.length" class="overview-section-list">
                  <div v-for="(section, index) in currentLesson?.sections" :key="section.title"
                    class="section-block mb-5">
                    <div class="d-flex align-items-start gap-3 mb-3">
                      <div class="section-number fs-5">{{ index + 1 }}</div>
                      <h5 class="fw-semibold mb-0 fs-5">{{ section.title }}</h5>
                    </div>
                    <div class="section-content text-dark fs-6 lh-lg"
                      :style="{ fontSize: `${overviewFontScale}rem` }" v-html="section.content"></div>
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
                      <div class="deep-dive-content text-dark fs-6"
                        :style="{ fontSize: `${overviewFontScale * 0.95}rem` }" v-html="section.deepDive.content"></div>
                    </div>
                    <div v-if="sectionStatsFor(section.title).length" class="section-stats d-flex flex-wrap gap-3 mt-3">
                      <div v-for="stat in sectionStatsFor(section.title)" :key="stat.label" class="section-stat-card">
                        <strong>{{ stat.value }}</strong>
                        <span class="text-muted">{{ stat.label }}</span>
                      </div>
                    </div>
                    <div class="pt-3 mt-3"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Guided pathway clips and action cards -->
            <div v-if="pathwayClips.length" class="content-card guided-section-card mb-4 rounded-4">
              <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 p-3">
                <div>
                  <p class="text-teal small mb-1 fw-semibold">Guided Pathway</p>
                  <h3 class="mb-1 fw-semibold">Short clips to carry the lesson forward</h3>
                  <p class="text-muted small mb-0">Pair a quick clip with your streak to keep the learning playful.</p>
                </div>
              </div>

              <div id="pathway-clips-section" class=" animated-fade-slide mb-4 rounded-4 pathway-clips-card">
                <div class="card-header d-flex align-items-center gap-3">
                  <i class="bi bi-film fs-4 text-teal"></i>
                  <div>
                    <h2 class="fw-bold mb-0 fs-5">Pathway Clips</h2>
                    <p class="text-muted small mb-0">Short visual cues to keep each insight gripping.</p>
                  </div>
                </div>
                <div class="card-body px-3">
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
                          <div class="clip-overlay d-flex align-items-end justify-content-between p-3">
                            <span class="clip-label badge bg-white text-dark">Clip</span>
                            <button type="button" class="btn btn-sm btn-outline-dark text-dark" @click.stop="playClip(clip)">
                              <i class="bi bi-play-fill"></i>
                            </button>
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

            <!-- Lesson Departments Focus -->
            <!-- Lesson focus cards summarizing how insights map to departments -->
            <div v-if="lessonDepartments.length" class="content-card lesson-focus-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-bar-chart-line-fill fs-4 me-3 text-teal"></i>
                <div>
                  <h3 class="fw-bold mb-0 fs-5">Lesson Focus Across Departments</h3>
                  <p class="text-muted mb-0 small">How this chapter aligns with every pillar of the experience</p>
                </div>
              </div>
              <div class="card-body px-3 px-md-4">
                <div class="row g-3">
                  <div v-for="dept in lessonDepartments" :key="dept.name" class="col-12 col-md-4">
                    <article class="dept-card h-100 p-3 rounded-3">
                      <div class="d-flex align-items-center gap-2 mb-2">
                        <span class="dept-icon">
                          <i :class="dept.icon"></i>
                        </span>
                        <strong class="fs-6 mb-0">{{ dept.name }}</strong>
                      </div>
                      <p class="text-muted small mb-1">{{ dept.summary }}</p>
                      <p class="text-dark fw-semibold mb-0">{{ dept.detail }}</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>

            <!-- Share with a friend -->
            <div class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-body px-3 px-md-4 py-4">
                <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                  <div class="flex-grow-1">
                    <h3 class="fw-bold mb-1">Share With a Friend or Family Member</h3>
                    <p class="text-muted mb-0 small">
                      Share this lesson’s insights, dua reminders, and revert-story clips so a friend can walk through the same content.
                    </p>
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

            <!-- Do's and Don'ts -->
            <!-- Chapter-specific dos and don’ts -->
            <div v-if="secondarySectionsReady && currentDosDonts" class="mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-arrow-right-circle-fill fs-4 me-3 text-teal"></i>
                <h2 class="fw-bold mb-0 fs-5">Do's and Don'ts</h2>
              </div>

              <div class="card-body p-3">
                <div class="mb-3">
                  <p class="text-muted small mb-3">Guidance for {{ currentDosDonts.chapter }}</p>
                  <div class="row g-3">
                    <div class="col-12 col-md-6">
                      <article class="p-3 rounded-3 border h-100">
                        <h3 class="h6 fw-semibold text-teal mb-3">Do's</h3>
                        <ul class="list-unstyled mb-0">
                          <li v-for="item in currentDosDonts.dos" :key="item.id"
                            class="d-flex align-items-start gap-2 mb-2">
                            <i class="bi bi-check-circle-fill fs-5 text-teal "></i>
                            <span class="text-dark medium mt-1">{{ item.text }}</span>
                          </li>
                        </ul>
                      </article>
                    </div>
                    <div class="col-12 col-md-6">
                      <article class="p-3 rounded-3 border h-100">
                        <h3 class="h6 fw-semibold text-danger mb-3">Don'ts</h3>
                        <ul class="list-unstyled mb-0">
                          <li v-for="item in currentDosDonts.donts" :key="item.id"
                            class="d-flex align-items-start gap-2 mb-2">
                            <i class="bi bi-x-circle-fill fs-5 text-danger"></i>
                            <span class="text-dark medium mt-1">{{ item.text }}</span>
                          </li>
                        </ul>
                      </article>
                    </div>
                  </div>
                </div>
              </div>

              

            <!-- Duas -->
            <div v-if="currentDuas.length" class="content-card section-card animated-fade-slide mb-4 mt-3 rounded-4">
              <div class="card-header d-flex align-items-center mt-3 py-3 gap-3">
                <div class="d-flex align-items-center gap-3">
                  <i class="bi bi-bookmark-star-fill fs-4 text-teal"></i>
                  <div>
                    <h2 class="fw-bold mb-0 fs-5 flex-grow-1">Duas to Carry</h2>
                  </div>
                </div>
                <div class="lesson-focus-actions ms-auto">
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
              </div>
              <div class="card-body" :style="{ fontSize: `${duaFontScale}em`, lineHeight: 1.5 }">
                <div class="row g-3">
                  <div v-for="dua in currentDuas" :key="dua.arabic" class="col-12 col-md-4">
                    <article class="dua-card h-100 rounded-4 p-4 shadow-lg">
                      <div class="dua-glow"></div>
                      <p dir="rtl"
                        class="fw-semibold lh-base mb-2 fs-5 text-teal border-bottom pb-2 text-end"
                        :style="{ fontSize: `${duaFontScale * 1.05}rem` }">
                        {{ dua.arabic }}
                      </p>
                      <p class="mb-0 text-dark" :style="{ fontSize: `${duaFontScale}rem` }">{{ dua.english }}</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>

            <!-- Key Insights -->
              <div v-if="secondarySectionsReady && insightsToShow.length" class="content-card pt-3 section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <i class="fas fa-chart-line fs-4 me-3 text-teal"></i>
                  <div>
                    <h2 class="fw-bold mb-0 fs-5">Key Insights</h2>
                    <p class="fs-6 text-muted mb-0">
                      {{ currentChapterKeyInsights?.chapter || currentLesson?.title || 'Chapter' }}
                    </p>
                  </div>
                </div>
                <button type="button"
                  class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                  @click="toggleSection('keyInsights')"
                  :aria-expanded="!collapsedSections.keyInsights">
                  <span class="d-none d-sm-inline">{{ collapsedSections.keyInsights ? 'Show' : 'Hide' }}</span>
                  <i class="bi" :class="collapsedSections.keyInsights ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                </button>
              </div>
              <div v-show="!collapsedSections.keyInsights" class="card-body p-3">
                  <ul class="list-group insight-list fs-6 lh-base mb-0">
                    <li v-for="insight in insightsToShow" :key="insight"
                      class="list-group-item border-0 px-0 py-3 d-flex align-items-center gap-3">
                      <i class="fas fa-check-circle fs-5 text-teal"></i>
                      <span>{{ insight }}</span>
                    </li>
                  </ul>
                </div>
              </div>

      

            <!-- Share & Uplift -->
            <div class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <i class="bi bi-share-fill fs-4 text-teal"></i>
                  <div>
                    <h2 class="fw-bold mb-0 fs-5">Share & Uplift</h2>
                  </div>
                </div>
                <button type="button"
                  class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                  @click="toggleSection('shareUplift')"
                  :aria-expanded="!collapsedSections.shareUplift">
                  <span class="d-none d-sm-inline">{{ collapsedSections.shareUplift ? 'Show' : 'Hide' }}</span>
                  <i class="bi" :class="collapsedSections.shareUplift ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                </button>
              </div>
              <div v-show="!collapsedSections.shareUplift" class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-7">
                    <p class="text-muted mb-3 fs-6">
                      Spread the lesson: copy the link or share a dua so others stay inspired.
                    </p>
                  </div>
                  <div class="col-md-5">
                    <div class="share-actions d-flex flex-wrap gap-2 mb-2">
                      <button type="button" class="btn share-action-btn share-copy" @click="copyShareLink">
                        <i class="bi bi-clipboard me-2 fs-5"></i>
                        <span>Copy lesson link</span>
                      </button>
                      <button type="button" class="btn share-action-btn share-whatsapp" @click="openWhatsappShare(getShareLink())">
                        <i class="bi bi-whatsapp me-2 fs-5"></i>
                        <span>Share on WhatsApp</span>
                      </button>
                    </div>
                    <p v-if="shareFriendStatus" class="text-success small mb-0">{{ shareFriendStatus }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="revert-stories-section" v-if="revertStories.length" class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-collection-play fs-4 me-3 text-teal"></i>
                <div>
                  <h2 class="fw-bold mb-0 fs-5">Revert Stories</h2>
                  <p class="text-muted mb-0 small">Eight personal clips from men and women keeping it straight to the point.</p>
                </div>
              </div>
              <div class="card-body">
                <div class="row g-3 video-grid-row">
                  <div v-for="video in revertStoriesPreview" :key="video.title" class="col-12 col-md-3">
                    <article
                      class="video-card shadow-sm overflow-hidden h-100"
                      @mouseenter="startPreview(video)"
                      @mouseleave="stopPreview">
                      <div class="video-card-media">
                        <div
                          v-if="isPlayingVideo(video) || isVideoPreviewing(video)"
                          class="video-feature"
                          :style="thumbnailStyle(video)">
                          <iframe
                            :src="formatVideoUrl(video.url, shouldAutoplayVideo(), isVideoPreviewing(video))"
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
                          :style="thumbnailStyle(video)"
                          @click="playVideo(video)">
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

            <!-- Commonly asked questions -->
            <div v-if="secondarySectionsReady && chapterCommonPanels.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <i class="bi bi-info-square-fill fs-4 text-teal"></i>
                  <h2 class="fw-bold mb-0 fs-5">Commonly Asked Questions</h2>
                </div>
                <button type="button"
                  class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                  @click="toggleSection('commonQuestions')"
                  :aria-expanded="!collapsedSections.commonQuestions">
                  <span class="d-none d-sm-inline">{{ collapsedSections.commonQuestions ? 'Show' : 'Hide' }}</span>
                  <i class="bi" :class="collapsedSections.commonQuestions ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                </button>
              </div>

              <div v-show="!collapsedSections.commonQuestions" class="card-body p-3 ">
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

            <div class="content-card motivation-card section-card mb-4 rounded-4 animated-fade-slide">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <i class="bi bi-emoji-smile fs-4 text-teal"></i>
                  <div>
                    <h2 class="fw-bold mb-0 fs-5">Motivation</h2>
                  </div>
                </div>
                <button type="button"
                  class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                  @click="toggleSection('motivation')"
                  :aria-expanded="!collapsedSections.motivation">
                  <span class="d-none d-sm-inline">{{ collapsedSections.motivation ? 'Show' : 'Hide' }}</span>
                  <i class="bi" :class="collapsedSections.motivation ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                </button>
              </div>
              <div v-show="!collapsedSections.motivation" class="card-body px-3 px-md-4 py-4">
                <div class="d-flex flex-column gap-2">
                  <p class="text-muted medium mb-0">{{ motivationalMessage }}</p>
                  <medium class="text-teal fs-6">{{ motivationalHint }}</medium>
                </div>
              </div>
            </div>

            <!-- Mission Spotlight -->
            <div v-if="currentMission" id="mission-card"
              class="content-card section-card animated-fade-slide mb-4 rounded-4 mission-card">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-flag-fill fs-4 me-3 text-teal"></i>
                <h1 class="fw-bold mb-0 fs-5">Mission Pulse</h1>
              </div>
              <div class="card-body p-3">
                <p class="mb-2 text-muted small">Current mission tied to chapter {{ currentMission.chapterId }}</p>
                <h5 class="fw-semibold">{{ currentMission.title }}</h5>
                <p class="text-dark fs-6">{{ currentMission.summary }}</p>
                <div class="d-flex flex-wrap gap-2 align-items-center mt-3">
                  <span class="badge bg-success text-dark rounded-pill">{{ currentMission.focus }}</span>
                  <button class="btn btn-outline-success btn-sm fw-semibold" @click="focusMission">
                    View Mission ↓
                  </button>
                </div>
              </div>
            </div>

            <!-- FAQ -->
            <div v-if="secondarySectionsReady && chapterFaqPanels.length" class="content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <i class="bi bi-question-circle-fill fs-4 text-teal"></i>
                  <h1 class="fw-bold mb-0 fs-5">Frequently Asked Questions</h1>
                </div>
                <button type="button"
                  class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                  @click="toggleSection('faqs')"
                  :aria-expanded="!collapsedSections.faqs">
                  <span class="d-none d-sm-inline">{{ collapsedSections.faqs ? 'Show' : 'Hide' }}</span>
                  <i class="bi" :class="collapsedSections.faqs ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                </button>
              </div>

              <div v-show="!collapsedSections.faqs" class="card-body p-3 ">
                <div class="accordion-stack">
                  <div v-for="(panel, index) in visibleFaqPanels" :key="panel.id" class="accordion-item-card">
                    <button type="button"
                      class="faq-question accordion-trigger d-flex justify-content-between align-items-center w-100"
                      :class="{ expanded: isAccordionOpen('faq', index) }" @click="toggleAccordion('faq', index)">
                      <span>{{ panel.title }}</span>
                      <i class="bi"
                        :class="isAccordionOpen('faq', index) ? 'bi-dash-lg text-teal' : 'bi-plus-lg text-muted'"></i>
                    </button>
                    <div v-show="isAccordionOpen('faq', index)" class="accordion-answer mt-2">
                      <div v-html="panel.body"></div>
                    </div>
                  </div>
                </div>
                <div v-if="faqHasMore" class="text-center mt-3">
                  <button type="button" class="btn btn-sm btn-link text-teal" @click="expandFaq('faq')">
                    Show {{ chapterFaqPanels.length - faqDisplayLimit }} more
                  </button>
                </div>
              </div>
            </div>

            <div v-if="currentChapterPlans.length" class="content-card chapter-plan-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <i class="bi bi-calendar-week fs-4 text-teal"></i>
                  <div>
                    <h2 class="fw-bold mb-0 fs-5">Curated Weekly Plans</h2>
                    <p class="text-muted small mb-0">Pick the timeline that fits your current rhythm.</p>
                  </div>
                </div>
                <button type="button"
                  class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                  @click="toggleSection('curatedPlans')"
                  :aria-expanded="!collapsedSections.curatedPlans">
                  <span class="d-none d-sm-inline">{{ collapsedSections.curatedPlans ? 'Show' : 'Hide' }}</span>
                  <i class="bi" :class="collapsedSections.curatedPlans ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                </button>
              </div>
              <div v-show="!collapsedSections.curatedPlans" class="card-body px-4 pb-0 pt-0">
                <div class="row g-3">
                  <div v-for="plan in currentChapterPlans" :key="plan.planId" class="col-12 col-md-4">
                    <article class="plan-card rounded-4 p-4 shadow-sm border">
                      <div class="plan-card__header d-flex align-items-start justify-content-between gap-3">
                        <div>
                          <p class="text-muted small mb-1 plan-card__duration">{{ plan.duration }}</p>
                          <h3 class="fw-semibold mb-2 fs-5">{{ plan.title }}</h3>
                          <p class="text-dark small mb-0 plan-card__summary">{{ plan.description }}</p>
                        </div>
                        <span class="badge badge-pill plan-badge text-uppercase">{{ plan.planId.replace('-', ' ') }}</span>
                      </div>
                      <div class="plan-card__divider" aria-hidden="true"></div>
                      <div class="plan-card__body">
                        <ul class="plan-highlights list-unstyled mb-3">
                          <li v-for="highlight in plan.highlights" :key="highlight" class="plan-highlight">
                            <span class="plan-highlight-icon" aria-hidden="true"></span>
                            <span>{{ highlight }}</span>
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
            </div>

            <!-- Next Steps -->
            <div class="content-card next-steps-card animated-slide-up rounded-5 mb-4" style="animation-delay: 0.4s">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <div class="next-steps-icon">
                    <i class="bi bi-clipboard-check-fill fs-5"></i>
                  </div>
                  <div>
                    <h1 class="fw-bold mb-0 fs-5">Next Steps & Homework</h1>
                  </div>
                </div>
                <button type="button"
                  class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                  @click="toggleSection('nextSteps')"
                  :aria-expanded="!collapsedSections.nextSteps">
                  <span class="d-none d-sm-inline">{{ collapsedSections.nextSteps ? 'Show' : 'Hide' }}</span>
                  <i class="bi" :class="collapsedSections.nextSteps ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                </button>
              </div>

              <div v-show="!collapsedSections.nextSteps" class="next-steps-body p-4">
                <div class="next-steps-inner">
                  <div class="next-steps-highlight">
                    <p class="mb-1 fw-semibold">Small steps, steady heart</p>
                    <p class="text-muted small mb-0">Refresh the lesson by acting on one small intention today.</p>
                  </div>
                  <div class="next-steps-list mt-3">
                    <article v-for="(task, index) in visibleHomework" :key="task" class="next-steps-pill">
                      
                      <p class="mb-0">{{ task }}</p>
                    </article>
                    <div v-if="homeworkMoreAvailable" class="text-center mt-3">
                      <button type="button" class="btn btn-sm btn-link text-teal" @click="loadMoreHomework">
                        Show more tasks ({{ currentHomework.length - homeworkVisibleCount }} left)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quiz Card -->
            <div v-if="currentQuestion" class="section-card animated-fade-slide mb-4 rounded-5 quiz-wrapper">
              <div class="quiz-shell p-0">
                <div class="quiz-header px-4 py-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-dice-4-fill fs-4 text-teal"></i>
                    <div>
                      <h2 class="fw-bold mb-0 fs-5">Chapter Quiz</h2>
                    </div>
                  </div>
                </div>
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
                  <h3 class="fw-semibold text-dark mb-2 quiz-question">{{ currentQuestion.question }}</h3>
                  <div class="quiz-options-grid">
                    <button v-for="option in currentQuestion.options" :key="option" type="button"
                      class="btn quiz-option text-start d-flex align-items-center justify-content-between" :class="{
                        'quiz-option--correct': quizStatus === 'correct' && option === currentQuestion.answer,
                        'quiz-option--incorrect': quizStatus === 'incorrect' && option === selectedOption,
                        'quiz-option--neutral': !(quizStatus === 'correct' && option === currentQuestion.answer) && !(quizStatus === 'incorrect' && option === selectedOption)
                      }" :disabled="chapterQuizPassed" @click="answerQuiz(option)">
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
                    <div class=" pt-2 text-muted">
                      <p class="mb-0">{{ quizHintExplanation }}</p>
                    </div>
                    <div class="quiz-explanation-footer mt-3">
                      <button
                        v-if="quizHintSectionId"
                        type="button"
                        class="btn btn-sm btn-explanation-link"
                        @click="scrollToSection(quizHintSectionId)"
                      >
                        Jump to the related lesson section
                      </button>
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
            </div>

            <div v-if="chapterQuizPassed && nextChapterPreview" class="content-card transition-card text-dark rounded-4 animated-fade-slide mb-4">
              <div class="d-flex align-items-center justify-content-between flex-wrap">
                <div>
                  <p class="text-muted small mb-1">Up next</p>
                  <h4 class="fw-semibold mb-0">{{ nextChapterPreview.title }}</h4>
                  <p class="mb-1 text-teal small">{{ nextChapterPreview.track }}</p>
                </div>
                <div class="text-end">
                  <span class="badge bg-light text-dark rounded-pill px-3 py-2">Chapter {{ nextChapterPreview.id }}</span>
                  <div class="transition-line mt-2"></div>
                </div>
              </div>
              <p class="text-muted mt-3 mb-0">{{ nextChapterPreview.snippet }}</p>
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
              </div>
              <div class="modal-body px-4 py-3">
                <div v-if="hasStoryFilters" class="mb-3 video-modal-filters">
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
                      @mouseleave="stopPreview">
                      <div class="video-card-media">
                        <div
                          v-if="isPlayingVideo(video) || isVideoPreviewing(video)"
                          class="video-feature"
                          :style="thumbnailStyle(video)">
                          <iframe
                            :src="formatVideoUrl(video.url, shouldAutoplayVideo(), isVideoPreviewing(video))"
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
                          :style="thumbnailStyle(video)"
                          @click="playVideo(video)">
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
    </div>
</template>


<script>
import { defineComponent } from 'vue'
import roadmapData from './data/roadmap.json'
import quizzesData from './data/quizzes.json'
import faqChapters from './data/faqs.json'
import commonQuestionsData from './data/commonQuestions.json'
import premiumResources from './data/premiumResources.json'
import duasData from './data/duas.json'
import homeworkData from './data/homework.json'
import missionsData from './data/missions.json'
import onboardingData from './data/onboarding.json'
import chapterDosDonts from './data/chapterDosDonts.json'
import chapterKeyInsights from './data/keyInsights.json'
import chapterGuidance from './data/chapterGuidance.json'
import chapterToneFocus from './data/chapterToneFocus.json'
import chapterGuidedPathway from './data/chapterGuidedPathway.json'
import chapterGentleStart from './data/chapterGentleStart.json'
import chapterSectionStats from './data/chapterSectionStats.json'
import chapterLessonOverview from './data/chapterLessonOverview.json'
import nextStepPrompts from './data/nextStepPrompts.json'
import chapterPlanGuides from './data/chapterPlanGuides.json'
import { jsPDF } from 'jspdf'

const normalizeJson = (value) => {
  if (value && Array.isArray(value)) return value
  if (value && value.default && Array.isArray(value.default)) return value.default
  return []
}

const VIDEO_ACCENT_PAIRS = [
  { primary: '#0f766e', secondary: '#5eead4' },
  { primary: '#1d4ed8', secondary: '#a5b4fc' },
  { primary: '#7c2d12', secondary: '#fb923c' },
  { primary: '#1e3a8a', secondary: '#3b82f6' },
  { primary: '#047857', secondary: '#34d399' },
  { primary: '#4c1d95', secondary: '#c084fc' }
]

const VIDEO_TAG_RULES = [
  {
    tag: 'Family Struggle',
    keywords: ['family', 'parent', 'parents', 'mother', 'father', 'children', 'kids', 'sister', 'brother', 'pressure', 'shame']
  },
  {
    tag: 'Ex-Christian',
    keywords: ['christian', 'jesus', 'bible', 'church', 'catholic', 'protestant', 'faith', 'christianity']
  },
  {
    tag: 'Funny',
    keywords: ['funny', 'comedy', 'comedian', 'laugh', 'humor', 'stand up', 'stand-up']
  },
  {
    tag: 'Quick Win',
    keywords: ['quick', 'short', 'minutes', '2 minutes', '3 minutes', 'mini', 'fast', 'brief', '90 seconds']
  },
  {
    tag: 'Community',
    keywords: ['community', 'tribe', 'friends', 'circle', 'mosque', 'support']
  },
  {
    tag: 'Faith Journey',
    keywords: ['revert', 'convert', 'conversion', 'shahada', 'journey to islam', 'found islam', 'embraced islam']
  },
  {
    tag: 'Inspiration',
    keywords: ['inspiring', 'hope', 'resilience', 'strength', 'courage', 'powerful']
  }
]

const MIN_STORIES_FOR_FILTERS = 20
const DURATION_FILTERS = [
  { value: 'all', label: 'All durations' },
  { value: 'short', label: 'Short (< 2.5 min)' },
  { value: 'medium', label: 'Medium (2.5 - 4 min)' },
  { value: 'long', label: 'Long (> 4 min)' }
]
const GENDER_FILTERS = [
  { value: 'all', label: 'All genders' },
  { value: 'female', label: 'Female stories' },
  { value: 'male', label: 'Male stories' },
  { value: 'other', label: 'Other' }
]
const BACKGROUND_TAG_PRIORITY = ['Ex-Christian', 'Family Struggle', 'Faith Journey', 'Inspiration', 'Community', 'Funny', 'Quick Win']

const FEMALE_KEYWORDS = ['she', 'her', 'woman', 'women', 'sister', 'mom', 'mother', 'girl', 'lady', 'daughter', 'female']
const MALE_KEYWORDS = ['he', 'his', 'man', 'men', 'brother', 'dad', 'father', 'boy', 'guy', 'husband', 'male']

const videoTagCache = new WeakMap()
const videoGenderCache = new WeakMap()
const videoDurationCache = new WeakMap()
const videoUrlIdCache = new Map()

const REVERTS_GUIDE_STEPS = [
  {
    title: 'Start with the roadmap',
    description:
      'Scan the pills to understand the chapter flow—completed lessons glow teal, the next gate glows gold, and locked chapters are gently dimmed.',
    actions: [
      'Tap the chapter you want to revisit to refresh context before diving back in.',
      'Use the completion badges to remind yourself how much you have already accomplished.'
    ],
    notes: 'Remember: unlocking a new chapter is simply a matter of feeling ready; the progress bar keeps you honest with milestones.'
  },
  {
    title: 'Refine your tone & pace',
    description:
      'The right column curates tone cues, guided prompts, and next-step reminders so every repetition feels intentionally paced.',
    actions: [
      'Set your breathing with the tone prompt and note whether you need space to pause or a rhythm to steady.',
      'Bookmark any reflection that resonates so it surfaces in your next gentle review.'
    ],
    notes: 'Switch between “slow listen” and “active reflection” modes to keep the experience varied.'
  },
  {
    title: 'Use layered lesson insights',
    description:
      'Each lesson contains an overview, highlight capsules, family-friendly dos/don’ts, and guided pathways that map practice to real life.',
    actions: [
      'Open the highlight cards to see the “why” behind each concept.',
      'Pin a key insight to keep it visible while you work through exercises or mission prompts.'
    ],
    notes: 'Look for the encouragement badges—these spotlight resilient reverts and remind you that struggle is part of the story.'
  },
  {
    title: 'Tap into the sharing & media toolkit',
    description:
      'Play short revert stories, copy or share summaries, and keep the reflections alive with dua cards and guided clips.',
    actions: [
      'Use the share buttons to send a single lesson card or the entire overview to a friend or mentor.',
      'Queue the guided clips as a “reset” track when you need a calming pause mid-study.'
    ],
    notes: 'The copy action also captures the tone you selected, so teammates understand how you want to be supported.'
  },
  {
    title: 'Capture progress and reflect',
    description:
      'Mark steps complete, celebrate confetti milestones, and document what you learned to keep the momentum going.',
    actions: [
      'Use the gentle-start toggles to confirm that each soft landing moment has been honored.',
      'When you finish a chapter, share what moved you in the reflection modal to lock it into memory.'
    ],
    notes: 'Confetti triggers are subtle; the real celebration is the new insight you can carry forward.'
  }
]

const getConfettiScale = () => {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1400) return 0.55
  if (window.innerWidth >= 1024) return 0.7
  return 1
}

const scaleConfettiConfig = (config) => {
  const scale = getConfettiScale()
  if (scale === 1) return config
  return {
    ...config,
    particleCount: Math.max(12, Math.round(config.particleCount * scale)),
    spread: Math.max(50, config.spread * (0.8 + scale / 1.25)),
    startVelocity: Math.max(40, config.startVelocity * (0.8 + scale / 2))
  }
}

// FULL-SCREEN EPIC CONFETTI
const fullScreenConfetti = (confettiFn) => {
  if (!confettiFn) return

  // Left shower
  confettiFn(scaleConfettiConfig({
    particleCount: 100,
    spread: 80,
    origin: { x: 0, y: 0.6 },
    drift: 1.5,
    startVelocity: 50,
    gravity: 0.7,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }))

  // Right shower
  confettiFn(scaleConfettiConfig({
    particleCount: 100,
    spread: 80,
    origin: { x: 1, y: 0.6 },
    drift: -1.5,
    startVelocity: 50,
    gravity: 0.7,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }))

  // Big center explosion
  confettiFn(scaleConfettiConfig({
    particleCount: 150,
    spread: 120,
    origin: { x: 0.5, y: 0.5 },
    startVelocity: 60,
    scalar: 1.4,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5', '#ffffff'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }))
}

const FINAL_CHAPTER_ID = roadmapData.length

const celebrateFinalChapter = (confettiFn) => {
  if (!confettiFn) return
  const bursts = [
    {
      particleCount: 220,
      spread: 200,
      startVelocity: 70,
      scalar: 1.5,
      colors: ['#facc15', '#fb923c', '#f472b6', '#38bdf8', '#22d3ee', '#a855f7']
    },
    {
      particleCount: 180,
      spread: 160,
      startVelocity: 50,
      drift: 0.5,
      colors: ['#34d399', '#a5b4fc', '#fcd34d', '#fb7185']
    },
    {
      particleCount: 140,
      spread: 190,
      startVelocity: 80,
      scalar: 1.6,
      colors: ['#0ea5e9', '#f97316', '#10b981']
    }
  ]

  bursts.forEach(config => {
    confettiFn(scaleConfettiConfig({
      ...config,
      origin: { x: Math.random(), y: Math.random() * 0.6 },
      shapes: ['square', 'circle'],
      zIndex: 10000,
      disableForReducedMotion: false
    }))
  })
}

export default defineComponent({
  name: 'App',

  data() {
    return {
      roadmapData: normalizeJson(roadmapData),
      chapterLessons: normalizeJson(chapterLessonOverview),
      faqChapters: normalizeJson(faqChapters),
      commonQuestionChapters: normalizeJson(commonQuestionsData),
      premiumResources: normalizeJson(premiumResources),
      quizzes: normalizeJson(quizzesData),
      missions: normalizeJson(missionsData),
      duas: normalizeJson(duasData),
      dosDontsChapters: normalizeJson(chapterDosDonts),
      chapterKeyInsights: normalizeJson(chapterKeyInsights),
      guidanceTemplates: normalizeJson(chapterGuidance),
      toneFocusEntries: normalizeJson(chapterToneFocus),
      guidedPathways: normalizeJson(chapterGuidedPathway),
      chapterGentleStarts: normalizeJson(chapterGentleStart),
      sectionStatsByChapter: normalizeJson(chapterSectionStats),
      chapterPlanGuides: normalizeJson(chapterPlanGuides),
      homework: normalizeJson(homeworkData),
      chapterVideos: [],
      chapterVideoMap: {},
      lessonMap: {},
      missionMap: {},
      duasMap: {},
      quizMap: {},
      homeworkMap: {},
      chapterQuizPassed: false,
      quizQuestions: [],
      currentQuestionIndex: 0,
      quizStatus: null,
      quizFeedback: '',
      selectedOption: null,
      quizCorrectCount: 0,
      quizRequiredCorrect: 2,
      mobileNavOpen: false,
      maxStepReached: 1,
      selectedPill: 1,
      showSuccessAlert: false,
      successMessage: '',
      isWaitingForNext: false,
      faqState: {},
      faqAccordionState: 0,
      commonAccordionState: 0,
      faqStackState: null,
      showResourceModal: false,
      activeResource: null,
      showVideoModal: false,
      showHelpModal: false,
      helpGuideSteps: REVERTS_GUIDE_STEPS,
      shareFriendStatus: '',
      onboarding: normalizeJson(onboardingData),
      resourceCopyStatus: '',
      collapsedSections: {
        commonQuestions: false,
        resources: false,
        faqs: false,
        curatedPlans: false,
        keyInsights: false,
        shareUplift: false,
        nextSteps: false,
        motivation: false,
        gentleStart: false
      },
      confettiPromise: null,
      confettiLauncher: null,
      lessonShareStatus: '',
      duaShareStatus: '',
      overviewFontScale: 1,
      duaFontScale: 1,
      globalFontScale: 1,
      copyAlertMessage: '',
      copyAlertType: 'info',
      showCopyAlert: false,
      copyAlertTimeout: null,
      lastIncorrectExplanation: null,
      activeVideoId: null,
      secondarySectionsReady: false,
      guidanceCardCache: {},
      lessonDepartmentsCache: {},
      homeworkVisibleCount: 4,
      faqDisplayLimit: 4,
      commonFaqDisplayLimit: 4,
      reduceMotionEnabled: false,
      motionMediaQuery: null,
      motionMediaListener: null,
      previewDesktopMediaQuery: null,
      previewDesktopListener: null,
      previewAutoplayEnabled: false,
      currentStreakDays: 0,
      lastStreakDateKey: '',
      dailyGamePoints: 0,
      dailyChallengeStatus: {},
      dailyChallengeDate: '',
      confettiEnabled: false,
      clipPlayerId: null,
      previewVideoId: null,
      gentleStepCompletion: {},
      videoSearchTerm: '',
      videoDurationFilter: 'all',
      videoGenderFilter: 'all',
      videoBackgroundFilter: 'all',
      durationFilters: DURATION_FILTERS,
      genderFilters: GENDER_FILTERS,
    }
  },

  computed: {
    currentLesson() {
      return this.lessonMap[this.selectedPill] || this.chapterLessons[0]
    },
    currentChapterKeyInsights() {
      const chapterId = this.currentLesson?.chapterId
      return this.chapterKeyInsights.find(entry => entry.chapterId === chapterId) || null
    },
    insightsToShow() {
      return this.currentChapterKeyInsights?.keyInsights?.length
        ? this.currentChapterKeyInsights.keyInsights
        : this.currentLesson?.keyInsights || []
    },
    currentLessonOverview() {
      return this.chapterLessons.find(entry => entry.chapterId === this.selectedPill) || null
    },
    currentChapterPlans() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.chapterPlanGuides.find(guide => guide.chapterId === chapterId)
      return entry?.plans || []
    },
    overviewSections() {
      return this.currentLessonOverview?.overview || []
    },
    quizHintExplanation() {
      return this.lastIncorrectExplanation?.text || this.currentQuestion?.explanation || ''
    },
    quizHintSectionId() {
      if (this.lastIncorrectExplanation?.sectionId) {
        return this.lastIncorrectExplanation.sectionId
      }
      const question = this.currentQuestion
      if (!question) return ''
      const sectionIndex = question.sectionIndex ?? 0
      const section = this.currentLesson?.sections?.[sectionIndex]
      return section ? `section-${this.selectedPill}-${sectionIndex}` : ''
    },
    chapterCommonPanels() {
      const chapter = this.commonQuestionChapters.find(entry => entry.chapterId === this.selectedPill)
      return chapter?.faqs || []
    },
    chapterFaqPanels() {
      const chapter = this.faqChapters.find(entry => entry.chapterId === this.selectedPill)
      return chapter?.faqs || []
    },
    progressPercentage() {
      return ((this.maxStepReached - 1) / this.roadmapData.length) * 100
    },
    dailyChallenges() {
      const chapterTitle = this.currentLesson?.title || 'this chapter'
      const prompts = [
        {
          id: 'insight-note',
          title: 'Capture one insight',
          description: `Write or voice a quick note about what stirred you in ${chapterTitle}.`
        },
        {
          id: 'share-moment',
          title: 'Share the feeling',
          description: 'Send a verse, dua, or thought to a friend with a short encouragement.'
        },
        {
          id: 'routine-tie',
          title: 'Tie it to a routine',
          description: 'Pair today’s learning with a familiar habit (prayer, commute, or reflection).'
        }
      ]
      return prompts.map(prompt => ({
        ...prompt,
        completed: Boolean(this.dailyChallengeStatus[prompt.id])
      }))
    },
    completedChapters() {
      return this.maxStepReached - 1
    },
    totalChapters() {
      return this.roadmapData.length
    },
    currentMission() {
      return this.missionMap[this.selectedPill] || this.missions[0]
    },
    currentDuas() {
      return this.duasMap[this.selectedPill] || []
    },
    currentQuizData() {
      return this.quizMap[this.selectedPill] || []
    },
    currentQuestion() {
      return this.quizQuestions[this.currentQuestionIndex]
    },
    currentHomework() {
      return this.homeworkMap[this.selectedPill] || []
    },
    visibleHomework() {
      return this.currentHomework.slice(0, this.homeworkVisibleCount)
    },
    homeworkMoreAvailable() {
      return this.currentHomework.length > this.homeworkVisibleCount
    },
    visibleFaqPanels() {
      return this.chapterFaqPanels.slice(0, this.faqDisplayLimit)
    },
    visibleCommonPanels() {
      return this.chapterCommonPanels.slice(0, this.commonFaqDisplayLimit)
    },
    faqHasMore() {
      return this.chapterFaqPanels.length > this.faqDisplayLimit
    },
    commonFaqHasMore() {
      return this.chapterCommonPanels.length > this.commonFaqDisplayLimit
    },

    guidanceCards() {
      const chapterId = this.currentLesson?.chapterId
      if (!chapterId) return []
      if (!this.guidanceCardCache[chapterId]) {
        this.guidanceCardCache[chapterId] = this.generateGuidanceCards(chapterId)
      }
      return this.guidanceCardCache[chapterId]
    },
    currentToneFocusText() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.toneFocusEntries.find(item => item.chapterId === chapterId)
      return entry?.toneFocus || ''
    },
    guidedPathwayCards() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.guidedPathways.find(item => item.chapterId === chapterId)
      return entry?.pathway || this.guidanceCards
    },
    currentGentleStartSteps() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.chapterGentleStarts.find(item => item.chapterId === chapterId)
      return entry?.steps || this.currentOnboardingSteps
    },
    gentleStartProgress() {
      const steps = this.currentGentleStartSteps || []
      const total = steps.length
      if (!total) return { total: 0, completed: 0, percent: 0 }
      const completed = steps.reduce((count, _, index) => count + (this.isGentleStepCompleted(index) ? 1 : 0), 0)
      const percent = total ? Math.round((completed / total) * 100) : 0
      return { total, completed, percent }
    },
    sectionStatsMap() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.sectionStatsByChapter.find(item => item.chapterId === chapterId)
      return entry?.sectionStats || []
    },
    motivationalMessage() {
      return this.chapterQuizPassed
        ? `Chapter ${this.selectedPill} cleared your growing understanding is inviting others to join.`
        : `You're working through Chapter ${this.selectedPill}. Stay curious, every insight builds momentum.`
    },
    motivationalHint() {
      return this.chapterQuizPassed
        ? 'Celebrate the milestone, then absorb the next lesson with the same warmth.'
        : 'Take a few deep breaths, revisit a favorite dua, and keep exploring.'
    },
    alertClass() {
      return this.copyAlertType === 'success' ? 'alert-success' :
        this.copyAlertType === 'danger' ? 'alert-danger' : 'alert-info'
    },
    iconClass() {
      return this.copyAlertType === 'danger' ? 'bi bi-exclamation-triangle-fill text-danger' : 'bi bi-clipboard-check-fill text-teal'
    },
    nextChapterPreview() {
      const nextId = this.selectedPill + 1
      if (nextId > this.roadmapData.length) return null
      const nextChapter = this.roadmapData.find(c => c.id === nextId)
      if (!nextChapter) return null
      const lessonPreview = this.chapterLessons.find(l => l.chapterId === nextId)
      return {
        id: nextChapter.id,
        title: lessonPreview?.title || nextChapter.title,
        track: nextChapter.description,
        snippet: lessonPreview?.summary || nextChapter.description
      }
    }
    ,
    quizProgressLabel() {
      return `${this.quizCorrectCount}/${this.quizRequiredCorrect} correct answers`
    }
    ,
    lessonDepartments() {
      const chapterId = this.currentLesson?.chapterId
      if (!chapterId) return []
      if (!this.lessonDepartmentsCache[chapterId]) {
        this.lessonDepartmentsCache[chapterId] = this.generateLessonDepartments(chapterId)
      }
      return this.lessonDepartmentsCache[chapterId]
    }

    ,
    currentDosDonts() {
      const chapterId = this.currentLesson?.chapterId
      return this.dosDontsChapters.find(entry => entry.chapterId === chapterId) || null
    }

    ,
    chapterVideoEntry() {
      const chapterId = this.currentLesson?.chapterId
      return this.chapterVideoMap[chapterId] || null
    }

    ,
    revertStories() {
      return this.chapterVideoEntry?.revertStories || this.chapterVideoEntry?.videos || []
    }
    ,
    hasStoryFilters() {
      return this.revertStories.length >= MIN_STORIES_FOR_FILTERS
    }
    ,
    filteredRevertStories() {
      const stories = this.revertStories || []
      const term = this.videoSearchTerm.trim().toLowerCase()
      return stories.filter(video => {
        const text = `${video.title || ''} ${video.description || ''}`.toLowerCase()
        if (term && !text.includes(term)) return false
        if (this.videoDurationFilter !== 'all') {
          const seconds = this.getVideoDurationSeconds(video)
          if (seconds <= 0) return false
          if (this.videoDurationFilter === 'short' && seconds >= 150) return false
          if (this.videoDurationFilter === 'medium' && (seconds < 150 || seconds > 240)) return false
          if (this.videoDurationFilter === 'long' && seconds <= 240) return false
        }
        if (this.videoGenderFilter !== 'all') {
          const gender = this.deriveVideoGender(video)
          if (gender !== this.videoGenderFilter) return false
        }
        if (this.videoBackgroundFilter !== 'all') {
          const tags = this.videoTags(video)
          if (!tags.includes(this.videoBackgroundFilter)) return false
        }
        return true
      })
    }
    ,
    backgroundFilterOptions() {
      const tags = new Set()
      this.revertStories.forEach(video => {
        this.videoTags(video).forEach(tag => {
          if (tag) tags.add(tag)
        })
      })
      const orderedTags = Array.from(tags).sort((a, b) => {
        const aIndex = BACKGROUND_TAG_PRIORITY.indexOf(a)
        const bIndex = BACKGROUND_TAG_PRIORITY.indexOf(b)
        if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
      return [{ value: 'all', label: 'All backgrounds' }, ...orderedTags.map(tag => ({ value: tag, label: tag }))]
    }
    ,
    revertStoriesPreview() {
      return this.revertStories.slice(0, 4)
    }
    ,
    pathwayClips() {
      return this.chapterVideoEntry?.pathwayClips || []
    },
    modalTagline() {
      return this.activeResource?.tagline || 'Study carefully and revisit whenever you need clarity.'
    }
    ,
    currentOnboardingSteps() {
      return this.onboarding.find(o => o.chapterId === this.selectedPill)?.steps || []
    }
  },

  watch: {
    selectedPill() {
      // Reload the chapter experience whenever navigation moves to another pill.
      this.chapterQuizPassed = false
      this.resetQuizSet()
      this.scrollToTop()
      this.faqAccordionState = null
      this.commonAccordionState = null
      this.activeVideoId = null
      this.homeworkVisibleCount = 4
      this.faqDisplayLimit = 4
      this.commonFaqDisplayLimit = 4
      this.prepareSecondarySections()
    },
    chapterQuizPassed(newVal, oldVal) {
      // Celebrate quiz completion with confetti if global settings allow it.
      if (!this.confettiEnabled) return
      if (newVal && !oldVal) {
        this.launchMicroConfetti()
      }
    },
    // Celebrate finishing the curated micro-challenges for the day.
    dailyGamePoints(newVal, oldVal) {
      if (!this.confettiEnabled) return
      const total = this.dailyChallenges.length
      if (total > 0 && newVal === total && (!oldVal || oldVal < total)) {
        this.launchMicroConfetti()
      }
    },
    // Reward streak milestones to keep the momentum visually engaging.
    currentStreakDays(newVal, oldVal) {
      if (!this.confettiEnabled) return
      if (newVal >= 3 && (oldVal || 0) < 3) {
        this.launchMicroConfetti()
      }
    },
    showVideoModal(newVal) {
      if (newVal) {
        this.resetVideoFilters()
      }
    }
  },

  created() {
    this.buildLookupMaps()
    this.loadChapterVideos()
  },

  mounted() {
    const saved = localStorage.getItem('maxStepReached')
    if (saved) {
      const value = parseInt(saved, 10)
      this.maxStepReached = value
      this.selectedPill = value
    }
    this.resetQuizSet()
    this.syncStreakFromStorage()
    this.syncDailyChallenges()
    this.loadGentleStepCompletion()
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    this.prepareSecondarySections()
    this.ensureConfettiScript()
    this.initializeMotionPreference()
    this.initializePreviewAutoplayPreference()

    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0)
    })
    this.$nextTick(() => {
      this.confettiEnabled = true
    })
  },

  beforeUnmount() {
    this.teardownMotionPreference()
    this.teardownPreviewAutoplayPreference()
  },

  methods: {
    ensureConfettiScript() {
      if (this.confettiPromise) return this.confettiPromise
      if (typeof window === 'undefined') {
        this.confettiPromise = Promise.resolve()
        return this.confettiPromise
      }
      if (window.confetti) {
        this.setupConfettiLauncher()
        this.confettiPromise = Promise.resolve()
        return this.confettiPromise
      }
      this.confettiPromise = new Promise(resolve => {
        // Injects the confetti bundle on demand so we only pay for it when needed.
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
        script.onload = () => {
          console.log('Confetti loaded & ready!')
          this.setupConfettiLauncher()
          resolve()
        }
        script.onerror = () => resolve()
        document.head.appendChild(script)
      })
      return this.confettiPromise
    },
    launchMicroConfetti() {
      // Skip celebration when the user prefers reduced motion.
      if (this.reduceMotionEnabled) return
      this.ensureConfettiScript().then(() => {
        this.setupConfettiLauncher()
        const confettiFn = this.confettiLauncher || window.confetti
        if (!confettiFn) return
        fullScreenConfetti(confettiFn)
      })
    },

    initializeMotionPreference() {
      if (typeof window === 'undefined' || !('matchMedia' in window)) return
      const query = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handler = (event) => {
        this.reduceMotionEnabled = event.matches
      }
      this.motionMediaQuery = query
      this.motionMediaListener = handler
      this.reduceMotionEnabled = query.matches
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', handler)
      } else if (typeof query.addListener === 'function') {
        query.addListener(handler)
      }
    },

    initializePreviewAutoplayPreference() {
      if (typeof window === 'undefined' || !('matchMedia' in window)) return
      const query = window.matchMedia('(min-width: 992px)')
      const handler = (event) => {
        this.previewAutoplayEnabled = event.matches
      }
      this.previewDesktopMediaQuery = query
      this.previewDesktopListener = handler
      this.previewAutoplayEnabled = query.matches
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', handler)
      } else if (typeof query.addListener === 'function') {
        query.addListener(handler)
      }
    },

    teardownMotionPreference() {
      if (!this.motionMediaQuery || !this.motionMediaListener) return
      if (typeof this.motionMediaQuery.removeEventListener === 'function') {
        this.motionMediaQuery.removeEventListener('change', this.motionMediaListener)
      } else if (typeof this.motionMediaQuery.removeListener === 'function') {
        this.motionMediaQuery.removeListener(this.motionMediaListener)
      }
      this.motionMediaQuery = null
      this.motionMediaListener = null
    },

    teardownPreviewAutoplayPreference() {
      if (!this.previewDesktopMediaQuery || !this.previewDesktopListener) return
      if (typeof this.previewDesktopMediaQuery.removeEventListener === 'function') {
        this.previewDesktopMediaQuery.removeEventListener('change', this.previewDesktopListener)
      } else if (typeof this.previewDesktopMediaQuery.removeListener === 'function') {
        this.previewDesktopMediaQuery.removeListener(this.previewDesktopListener)
      }
      this.previewDesktopMediaQuery = null
      this.previewDesktopListener = null
    },

    setupConfettiLauncher() {
      if (this.confettiLauncher) return
      if (typeof window === 'undefined' || !window.confetti) return
      const canvas = this.$refs.confettiCanvas
      if (!canvas) return
      this.confettiLauncher = window.confetti.create(canvas, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: false
      })
    },

    triggerConfetti(isFinalChapter) {
      this.scrollToTop()
      this.ensureConfettiScript().then(() => {
        this.setupConfettiLauncher()
        const confettiFn = this.confettiLauncher || window.confetti
        if (!confettiFn) return
        if (isFinalChapter) {
          celebrateFinalChapter(confettiFn)
          setTimeout(() => celebrateFinalChapter(confettiFn), 600)
        } else {
          fullScreenConfetti(confettiFn)
          setTimeout(() => fullScreenConfetti(confettiFn), 400)
        }
      })
    },

    buildLookupMaps() {
      this.lessonMap = this.chapterLessons.reduce((map, lesson) => {
        if (lesson?.chapterId != null) map[lesson.chapterId] = lesson
        return map
      }, {})
      this.missionMap = this.missions.reduce((map, mission) => {
        if (mission?.chapterId != null) map[mission.chapterId] = mission
        return map
      }, {})
      this.duasMap = this.duas.reduce((map, dua) => {
        if (dua?.chapterId != null) map[dua.chapterId] = dua.duas || []
        return map
      }, {})
      this.quizMap = this.quizzes.reduce((map, quiz) => {
        if (quiz?.chapterId != null) map[quiz.chapterId] = quiz.questions || []
        return map
      }, {})
      this.homeworkMap = this.homework.reduce((map, task) => {
        if (task?.chapterId != null) map[task.chapterId] = task.homework || []
        return map
      }, {})
    },

    // Lazy-loads chapter videos to avoid bloating the initial bundle.
    async loadChapterVideos() {
      try {
        const module = await import('./data/chapterVideos.json')
        const chapters = normalizeJson(module)
        this.chapterVideos = chapters
        this.chapterVideoMap = chapters.reduce((map, record) => {
          if (record?.chapterId != null) {
            map[record.chapterId] = record
          }
          return map
        }, {})
      } catch (error) {
        console.error('Unable to load chapter videos', error)
      }
    },
    updateStreakRecord() {
      if (typeof window === 'undefined') return
      const todayKey = this.getTodayDateKey()
      if (!todayKey) return
      let nextStreak = 1
      if (this.lastStreakDateKey === todayKey && this.currentStreakDays > 0) {
        nextStreak = this.currentStreakDays
      } else if (this.lastStreakDateKey) {
        const today = new Date(todayKey)
        const last = new Date(this.lastStreakDateKey)
        const diffDays = Math.round((today - last) / (24 * 60 * 60 * 1000))
        if (diffDays === 1) {
          nextStreak = Math.max(this.currentStreakDays, 1) + 1
        } else {
          nextStreak = 1
        }
      } else if (this.currentStreakDays > 0) {
        nextStreak = this.currentStreakDays + 1
      }
      this.currentStreakDays = Math.max(1, nextStreak)
      this.lastStreakDateKey = todayKey
      localStorage.setItem('streakDays', this.currentStreakDays.toString())
      localStorage.setItem('lastStreakDate', todayKey)
    },
    getTodayDateKey() {
      if (typeof window === 'undefined') return ''
      return new Date().toISOString().split('T')[0]
    },
    syncStreakFromStorage() {
      if (typeof window === 'undefined') return
      const stored = Number(localStorage.getItem('streakDays') || 0)
      this.currentStreakDays = Number.isFinite(stored) ? stored : 0
      this.lastStreakDateKey = localStorage.getItem('lastStreakDate') || ''
    },
    syncDailyChallenges() {
      if (typeof window === 'undefined') return
      const todayKey = this.getTodayDateKey()
      const storedDate = localStorage.getItem('dailyChallengeDate') || ''
      if (storedDate !== todayKey) {
        this.dailyChallengeStatus = {}
        this.dailyGamePoints = 0
        this.dailyChallengeDate = todayKey
        localStorage.setItem('dailyChallengeDate', todayKey)
        localStorage.setItem('dailyChallengeStatus', JSON.stringify({}))
        return
      }
      let storedStatus = {}
      try {
        storedStatus = JSON.parse(localStorage.getItem('dailyChallengeStatus') || '{}')
      } catch {
        storedStatus = {}
      }
      this.dailyChallengeStatus = storedStatus
      this.dailyGamePoints = Object.values(this.dailyChallengeStatus).filter(Boolean).length
      this.dailyChallengeDate = storedDate || todayKey
    },
    toggleChallenge(id) {
      if (typeof window === 'undefined') return
      const todayKey = this.getTodayDateKey()
      if (this.dailyChallengeDate !== todayKey) {
        this.dailyChallengeStatus = {}
      }
      const nextValue = !this.dailyChallengeStatus[id]
      this.dailyChallengeStatus = {
        ...this.dailyChallengeStatus,
        [id]: nextValue
      }
      this.dailyGamePoints = Object.values(this.dailyChallengeStatus).filter(Boolean).length
      this.dailyChallengeDate = todayKey
      localStorage.setItem('dailyChallengeStatus', JSON.stringify(this.dailyChallengeStatus))
      localStorage.setItem('dailyChallengeDate', todayKey)
    },
    gentleStepCompletionKey(chapterId, stepIndex) {
      if (chapterId == null) return null
      return `gentle-${chapterId}-${stepIndex}`
    },
    isGentleStepCompleted(stepIndex) {
      const chapterId = this.currentLesson?.chapterId
      const key = this.gentleStepCompletionKey(chapterId, stepIndex)
      return Boolean(key && this.gentleStepCompletion[key])
    },
    toggleGentleStepCompletion(stepIndex) {
      const chapterId = this.currentLesson?.chapterId
      const key = this.gentleStepCompletionKey(chapterId, stepIndex)
      if (!key) return
      const nextValue = !this.gentleStepCompletion[key]
      this.gentleStepCompletion = {
        ...this.gentleStepCompletion,
        [key]: nextValue
      }
      this.persistGentleStepCompletion()
    },
    persistGentleStepCompletion() {
      if (typeof window === 'undefined') return
      localStorage.setItem('gentleStepCompletion', JSON.stringify(this.gentleStepCompletion))
    },
    loadGentleStepCompletion() {
      if (typeof window === 'undefined') return
      try {
        const stored = JSON.parse(localStorage.getItem('gentleStepCompletion') || '{}')
        this.gentleStepCompletion = stored
      } catch {
        this.gentleStepCompletion = {}
      }
    },
    prepareSecondarySections() {
      this.secondarySectionsReady = false
      if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
        window.requestAnimationFrame(() => {
          this.secondarySectionsReady = true
        })
      } else {
        this.secondarySectionsReady = true
      }
    },
    loadMoreHomework() {
      if (!this.currentHomework.length) return
      this.homeworkVisibleCount = Math.min(this.currentHomework.length, this.homeworkVisibleCount + 4)
    },
    expandFaq(section) {
      if (section === 'common') {
        this.commonFaqDisplayLimit = this.chapterCommonPanels.length
      } else {
        this.faqDisplayLimit = this.chapterFaqPanels.length
      }
    },
    generateGuidanceCards(chapterId) {
      const template = this.guidanceTemplates.find(entry => entry.chapterId === chapterId)
      if (template?.cards?.length) return template.cards
      const lesson = this.lessonMap[chapterId]
      if (!lesson) return []
      const cards = [
        {
          step: '01',
          title: 'Absorb the Story',
          description: `Read through ${lesson.sections?.length || 0} featured sections and soak in the core ideas`,
          action: 'Bookmark key paragraphs and jot down a quick insight'
        },
        {
          step: '02',
          title: 'Internalize Duas & Insights',
          description: lesson.keyInsights?.length ? `Let the ${lesson.keyInsights.length} insights guide your practice` : 'Use the duas to keep the message close to your heart',
          action: lesson.keyInsights?.length ? 'Recite aloud and note how each insight applies today' : 'Practice the duas before sleep'
        },
        {
          step: '03',
          title: 'Take the Quiz',
          description: 'Answer one vibrant question to unlock the next chapter and prove mastery',
          action: 'Choose the right option then scroll to “Next Chapter”'
        }
      ]
      const hasDuas = (this.duasMap[chapterId] || []).length > 0
      if (!hasDuas) {
        cards[1].description = 'Use the glossary, resources, and mission to keep the lesson alive'
        cards[1].action = 'Pin a phrase that resonated most'
      }
      return cards
    },
    generateLessonDepartments(chapterId) {
      const lesson = this.lessonMap[chapterId]
      if (!lesson) return []
      const sections = lesson.sections || []
      if (!sections.length) return []
      const icons = ['bi-gem', 'bi-heart', 'bi-lightbulb', 'bi-book', 'bi-graph-up']
      return sections.slice(0, 3).map((section, index) => ({
        name: section.title.split(' ').slice(0, 2).join(' '),
        summary: section.title,
        detail: section.deepDive?.title || 'Integrated across insights, duas, and missions.',
        icon: icons[index % icons.length]
      }))
    },

    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen
    },

    selectPill(id) {
      if (id <= this.maxStepReached) {
        this.selectedPill = id
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      this.mobileNavOpen = false
    },

    toggleFaq(index) {
      const chapterKey = this.currentLesson?.chapterId
      if (!chapterKey) return
      const current = this.faqState[chapterKey]
      const next = current === index ? null : index
      this.faqState = { ...this.faqState, [chapterKey]: next }
    },

    isFaqOpen(index) {
      const chapterKey = this.currentLesson?.chapterId
      return this.faqState[chapterKey] === index
    },

    sectionStatsFor(title) {
      return this.sectionStatsMap.find(entry => entry.title === title)?.stats || []
    },

    toggleAccordion(section, index) {
      const stateKey = section === 'faq' ? 'faqAccordionState' : 'commonAccordionState'
      this[stateKey] = this[stateKey] === index ? null : index
    },

    isAccordionOpen(section, index) {
      const stateKey = section === 'faq' ? 'faqAccordionState' : 'commonAccordionState'
      const state = this[stateKey]
      if (state === null) return false
      if (typeof state === 'number') {
        return state === index
      }
      return index === 0
    },

    toggleFaqStack(index) {
      this.faqStackState = this.faqStackState === index ? null : index
    },

    isFaqStackOpen(index) {
      if (this.faqStackState === null) return false
      return this.faqStackState === index || (this.faqStackState === undefined && index === 0)
    },

    toggleSection(sectionKey) {
      this.collapsedSections[sectionKey] = !this.collapsedSections[sectionKey]
    },

    formatVideoUrl(url, autoplay = false, muted = false) {
      if (!url) return ''
      let embedUrl = url
      if (url.includes('watch?v=')) {
        embedUrl = url.replace('watch?v=', 'embed/')
      } else if (url.includes('youtu.be/')) {
        embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/')
      }
      const [base, query = ''] = embedUrl.split('?')
      const params = new URLSearchParams(query)
      params.set('rel', '0')
      params.set('modestbranding', '1')
      if (autoplay) {
        params.set('autoplay', '1')
      }
      if (muted) {
        params.set('mute', '1')
      }
      return `${base}?${params.toString()}`
    },
    shouldAutoplayVideo() {
      return this.previewAutoplayEnabled && !this.reduceMotionEnabled
    },
    startPreview(video) {
      if (this.isPlayingVideo(video) || this.isClipPlaying(video)) return
      const id = this.getVideoId(video?.url)
      if (!id) return
      this.previewVideoId = id
    },
    stopPreview() {
      this.previewVideoId = null
    },
    playVideo(video) {
      const id = this.getVideoId(video?.url)
      if (!id) return
      this.stopPreview()
      this.clipPlayerId = null
      this.activeVideoId = this.activeVideoId === id ? null : id
    },
    playClip(clip) {
      const id = this.getVideoId(clip?.url)
      if (!id) return
      this.stopPreview()
      this.activeVideoId = null
      this.clipPlayerId = this.clipPlayerId === id ? null : id
    },
    isClipPlaying(clip) {
      const id = this.getVideoId(clip?.url)
      return Boolean(id && this.clipPlayerId === id)
    },
    isClipPreviewing(clip) {
      const id = this.getVideoId(clip?.url)
      return Boolean(id && this.previewVideoId === id && this.clipPlayerId !== id)
    },
    isVideoPreviewing(video) {
      const id = this.getVideoId(video?.url)
      return Boolean(
        id &&
        this.previewVideoId === id &&
        this.activeVideoId !== id &&
        this.clipPlayerId !== id
      )
    },
    isPlayingVideo(video) {
      const id = this.getVideoId(video?.url)
      return Boolean(id && this.activeVideoId === id)
    },
    getVideoId(url) {
      if (!url) return null
      const normalizedUrl = url.trim()
      if (!normalizedUrl) return null
      if (videoUrlIdCache.has(normalizedUrl)) {
        return videoUrlIdCache.get(normalizedUrl)
      }
      const match = normalizedUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
      const id = match ? match[1] : null
      videoUrlIdCache.set(normalizedUrl, id)
      return id
    },
    thumbnailStyle(video) {
      const accent = this.videoAccentPair(video)
      return {
        backgroundImage: `linear-gradient(145deg, ${accent.primary}, ${accent.secondary}), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 45%)`
      }
    },
    videoAccentPair(video) {
      const palette = VIDEO_ACCENT_PAIRS
      const index = this.hashString(video?.title) % palette.length
      return palette[index]
    },
    hashString(value) {
      if (!value) return 0
      let hash = 0
      for (let i = 0; i < value.length; i++) {
        hash = (hash << 5) - hash + value.charCodeAt(i)
        hash |= 0
      }
      return Math.abs(hash)
    },
    videoTags(video, fallbackTag = 'Revert Story') {
      if (!video) return []
      if (videoTagCache.has(video)) return videoTagCache.get(video)
      const explicitTags = (video.tags || []).filter(Boolean)
      if (explicitTags.length) {
        videoTagCache.set(video, explicitTags)
        return explicitTags
      }
      const text = `${video.title || ''} ${video.description || ''}`.toLowerCase()
      const matches = []
      const seen = new Set()
      for (const rule of VIDEO_TAG_RULES) {
        if (matches.length >= 2) break
        if (seen.has(rule.tag)) continue
        const keywordFound = rule.keywords.some(keyword => text.includes(keyword))
        if (keywordFound) {
          matches.push(rule.tag)
          seen.add(rule.tag)
        }
      }
      const resolved = matches.length ? matches : [fallbackTag]
      videoTagCache.set(video, resolved)
      return resolved
    },

    parseDurationInSeconds(duration) {
      if (!duration) return 0
      const cleaned = `${duration}`.replace(/[^\d:]/g, '').trim()
      if (!cleaned) return 0
      const parts = cleaned.split(':').map(segment => Number(segment.trim()))
      if (parts.some(part => Number.isNaN(part))) return 0
      return parts.reduce((total, part) => total * 60 + part, 0)
    },
    getVideoDurationSeconds(video) {
      if (!video) return 0
      if (videoDurationCache.has(video)) return videoDurationCache.get(video)
      const seconds = this.parseDurationInSeconds(video.duration)
      videoDurationCache.set(video, seconds)
      return seconds
    },
    deriveVideoGender(video) {
      if (!video) return 'other'
      if (videoGenderCache.has(video)) return videoGenderCache.get(video)
      const text = `${video.title || ''} ${video.description || ''}`.toLowerCase()
      let gender = 'other'
      if (FEMALE_KEYWORDS.some(keyword => text.includes(keyword))) {
        gender = 'female'
      } else if (MALE_KEYWORDS.some(keyword => text.includes(keyword))) {
        gender = 'male'
      }
      videoGenderCache.set(video, gender)
      return gender
    },

    completeAndNext() {
      const nextId = this.selectedPill + 1
      const isFinalChapter = this.selectedPill === FINAL_CHAPTER_ID

      if (nextId > this.maxStepReached) {
        this.maxStepReached = nextId
        localStorage.setItem('maxStepReached', nextId.toString())
        this.updateStreakRecord()

        const chapter = this.roadmapData.find(c => c.id === this.selectedPill)
        this.successMessage = isFinalChapter
          ? `You’ve completed the final chapter, “${chapter?.title || 'Chapter'}”! Keep practicing the insights and share them with others.`
          : `"${chapter?.title || 'Chapter'}" chapter has been completed successfully!`

        this.showSuccessAlert = true
        this.isWaitingForNext = true

        // FULL-SCREEN CONFETTI PARTY!
        this.$nextTick(() => {
          this.triggerConfetti(isFinalChapter)
        })

        // Auto hide toast
        setTimeout(() => {
          this.showSuccessAlert = false
          setTimeout(() => { this.isWaitingForNext = false }, 3000)
        }, 6000)
      }

      if (isFinalChapter) {
        setTimeout(() => {
          this.selectedPill = 1
          window.scrollTo({ top: 0, behavior: 'smooth' })
          this.chapterQuizPassed = false
        }, 900)
      } else if (nextId <= this.roadmapData.length) {
        this.selectedPill = nextId
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.chapterQuizPassed = false
      }
    },
    retryQuiz() {
      this.resetQuizSet()
      this.quizFeedback = ''
      this.quizStatus = null
      this.selectedOption = null
    },
    focusMission() {
      const selector = '#mission-card'
      const el = document.querySelector(selector)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('pulse-ring')
        setTimeout(() => el.classList.remove('pulse-ring'), 1600)
      }
    },
    jumpToMedia() {
      this.scrollToSection('revert-stories-section')
    },
    launchSkimSection() {
      const sectionId = `section-${this.selectedPill}-0`
      this.scrollToSection(sectionId)
    },
    handleBadgeAction(badgeId) {
      if (badgeId === 'quiz') {
        this.scrollToNextButton()
      } else if (badgeId === 'media') {
        this.jumpToMedia()
      } else if (badgeId === 'streak') {
        this.scrollToTop()
      } else if (badgeId === 'game') {
        this.scrollToSection('daily-game-card')
      }
    },
    openResource(resource) {
      this.activeResource = resource
      this.showResourceModal = true
    },
    closeResourceModal() {
      this.showResourceModal = false
      this.activeResource = null
    }
    ,
    closeVideoModal() {
      this.showVideoModal = false
    }
    ,
    resetVideoFilters() {
      this.videoSearchTerm = ''
      this.videoDurationFilter = 'all'
      this.videoGenderFilter = 'all'
      this.videoBackgroundFilter = 'all'
    }
    ,
    openHelpModal() {
      this.showHelpModal = true
    },
    closeHelpModal() {
      this.showHelpModal = false
    }
    ,
    // Randomizes the quiz payload so each attempt feels fresh.
    resetQuizSet() {
      const base = this.currentQuizData.map(question => ({
        ...question,
        options: this.shuffleArray(question.options || [])
      }))
      this.quizQuestions = this.shuffleArray(base)
      this.currentQuestionIndex = 0
      this.quizStatus = null
      this.quizFeedback = ''
      this.quizCorrectCount = 0
      this.chapterQuizPassed = false
    },
    advanceQuestion() {
      if (!this.quizQuestions.length) return
      this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.quizQuestions.length
      this.quizStatus = null
      this.selectedOption = null
      this.lastIncorrectExplanation = null
    },
    scrollToNextButton() {
      const nextBtn = document.querySelector('.next-btn')
      if (nextBtn) {
        nextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    },
    scrollToTop() {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      const lessonSection = document.querySelector('.revert-content section')
      if (lessonSection) {
        lessonSection.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    copyResourceLink() {
      const link = this.activeResource?.link
      if (!link) return
      navigator.clipboard?.writeText(link)
        .then(() => {
          this.resourceCopyStatus = 'Link copied!'
          this.triggerCopyAlert('Resource link copied!', 'success')
          setTimeout(() => { this.resourceCopyStatus = '' }, 2500)
        })
        .catch(() => {
          this.resourceCopyStatus = 'Unable to copy; please use your browser.'
          setTimeout(() => { this.resourceCopyStatus = '' }, 4000)
      })
    },
    getShareLink() {
      if (typeof window === 'undefined') return ''
      return `${window.location.origin}${window.location.pathname}`
    },
    openWhatsappShare(text) {
      if (!text) return
      if (typeof window === 'undefined') return
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(shareUrl, '_blank')
    },
    getPrintableDocument(title, body) {
      const now = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
      const duaItems = body.split('\n').filter(Boolean).map(line => {
        const matches = line.match(/(.+)\s\((.+)\)$/)
        if (matches) {
          return `<div class="dua-card"><strong>${matches[1]}</strong><span class="english">(${matches[2]})</span></div>`
        }
        return `<div class="dua-card">${line}</div>`
      }).join('')
      return `
        <html>
          <head>
            <title>${title}</title>
            <style>
              :root {
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                color: #0f172a;
              }
              body {
                margin: 0;
                padding: 24px;
                background: #f8fafc;
              }
              header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid rgba(15, 23, 42, 0.12);
                padding-bottom: 0.5rem;
              }
              header h1 {
                margin: 0;
                font-size: 1.6rem;
              }
              .date-label {
                font-size: 0.9rem;
                color: #475467;
              }
              .dua-list {
                list-style: none;
                padding: 0;
                margin: 0;
                line-height: 1.6;
                font-size: 1.05rem;
              }
              .dua-card {
                margin-bottom: 1rem;
              }
              .dua-card span.english {
                display: block;
                color: #475467;
                font-size: 0.95rem;
              }
              .footer-note {
                margin-top: 2rem;
                font-size: 0.85rem;
                color: #94a3b8;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>${title}</h1>
              <div class="date-label">${now}</div>
            </header>
            <div class="dua-list">
              ${duaItems}
            </div>
            <p class="footer-note">Content from Islamic Connect · www.islamic-connect.com</p>
          </body>
        </html>
      `
    },

    printContent(title, body) {
      if (typeof window === 'undefined' || typeof document === 'undefined') return
      const printWindow = window.open('', '_blank')
      if (!printWindow) return
      const html = this.getPrintableDocument(title, body)
      printWindow.document.write(html)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    },
    changeScale(target, delta, min, max) {
      this[target] = Math.min(max, Math.max(min, this[target] + delta))
    },
    increaseOverviewFontSize() {
      this.changeScale('overviewFontScale', 0.1, 0.8, 1.6)
    },
    decreaseOverviewFontSize() {
      this.changeScale('overviewFontScale', -0.1, 0.8, 1.6)
    },
    increaseDuaFontSize() {
      this.changeScale('duaFontScale', 0.1, 0.8, 1.6)
    },
    decreaseDuaFontSize() {
      this.changeScale('duaFontScale', -0.1, 0.8, 1.6)
    },
    increaseGlobalFont() {
      this.globalFontScale = Math.min(1.3, this.globalFontScale + 0.05)
    },
    decreaseGlobalFont() {
      this.globalFontScale = Math.max(0.85, this.globalFontScale - 0.05)
    },
    setShareStatus(type, message) {
      if (type === 'lesson') {
        this.lessonShareStatus = message
        setTimeout(() => { this.lessonShareStatus = '' }, 3000)
      } else if (type === 'dua') {
        this.duaShareStatus = message
        setTimeout(() => { this.duaShareStatus = '' }, 3000)
      }
    },
    copyTextToClipboard(text) {
      if (!text || typeof document === 'undefined') return Promise.reject()
      if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(text)
      }
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      textarea.setSelectionRange(0, 99999)
      const successful = document.execCommand('copy')
      document.body.removeChild(textarea)
      return successful ? Promise.resolve() : Promise.reject()
    },
    triggerCopyAlert(message, type = 'info') {
      if (this.copyAlertTimeout) {
        clearTimeout(this.copyAlertTimeout)
      }
      this.copyAlertMessage = message
      this.copyAlertType = type
      this.showCopyAlert = true
      this.copyAlertTimeout = setTimeout(() => {
        this.showCopyAlert = false
        this.copyAlertMessage = ''
        this.copyAlertTimeout = null
      }, 3000)
    },
    getLessonOverviewText() {
      const lesson = this.currentLesson
      if (!lesson) return ''
      const summary = lesson.summary?.trim() || 'Read slowly, ask questions, and pause between each section.'
      return `Lesson Overview: ${lesson.title}\n${summary}\nExplore more on Islamic Connect: ${this.getShareLink()}`
    },
    shareLessonOverview() {
      this.openWhatsappShare(this.getLessonOverviewText())
    },
    copyLessonOverview() {
      const text = this.getLessonOverviewText()
      this.copyTextToClipboard(text)
        .then(() => {
          this.setShareStatus('lesson', 'Lesson overview copied!')
          this.triggerCopyAlert('Lesson overview copied!', 'success')
        })
        .catch(() => {
          this.setShareStatus('lesson', 'Unable to copy.')
        })
    },
    printLessonOverview() {
      this.printContent('Lesson Overview', this.getLessonOverviewText())
    },
    getDuasText() {
      if (!this.currentDuas.length) return ''
      return this.currentDuas
        .map(dua => `${dua.arabic} (${dua.english})`)
        .join('\n')
    },
    shareDuas() {
      const message = `Duas to carry from ${this.currentLesson?.title || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`
      this.openWhatsappShare(message)
    },
    copyDuas() {
      const text = `Duas to carry from ${this.currentLesson?.title || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`
      this.copyTextToClipboard(text)
        .then(() => {
          this.setShareStatus('dua', 'Duas copied to clipboard!')
          this.triggerCopyAlert('Duas copied to clipboard!', 'success')
        })
        .catch(() => {
          this.setShareStatus('dua', 'Unable to copy.')
        })
    },
    printDuas() {
      const text = this.getDuasText()
      this.printContent('Duas to Carry', text)
    },
    copyShareLink() {
      const link = this.getShareLink()
      if (!link) return
      this.copyTextToClipboard(link)
        .then(() => {
          this.shareFriendStatus = 'Link copied! Send it so a friend can join.'
          this.triggerCopyAlert('Lesson link copied!', 'success')
          setTimeout(() => { this.shareFriendStatus = '' }, 3000)
        })
        .catch(() => {
          this.shareFriendStatus = 'Unable to copy; please use your browser directly.'
          setTimeout(() => { this.shareFriendStatus = '' }, 4000)
        })
    },
    formatPlanMessage(plan) {
      const chapterTitle = this.currentLesson?.title || 'this chapter'
      const highlights = plan.highlights?.map((item, index) => `${index + 1}. ${item}`).join('\n') || ''
      return `${plan.title} (${plan.duration}) for ${chapterTitle}\n${plan.description}\n\nHighlights:\n${highlights}`
    },
    sharePlan(plan) {
      const message = this.formatPlanMessage(plan)
      this.openWhatsappShare(message)
    },
    copyPlan(plan) {
      const message = this.formatPlanMessage(plan)
      this.copyTextToClipboard(message)
        .then(() => {
          this.triggerCopyAlert('Plan copied to clipboard!', 'success')
        })
        .catch(() => {
          this.triggerCopyAlert('Unable to copy the plan.', 'danger')
        })
    },
    executePlanPrint(plan) {
      const title = `${plan.title} • ${this.currentLesson?.title || 'Chapter'}`
      const body = this.formatPlanMessage(plan)
      this.printContent(title, body)
    },
    printPlan(plan) {
      this.executePlanPrint(plan)
    },
    downloadPlanAsPdf(plan) {
      try {
        const doc = new jsPDF({ unit: 'pt', format: 'letter' })
        const margin = 40
        const pageHeight = doc.internal.pageSize.getHeight()
        let cursorY = 50

        const addText = (text, fontSize = 12, fontStyle = 'normal') => {
          doc.setFontSize(fontSize)
          doc.setFont('helvetica', fontStyle)
          const lines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - margin * 2)
          const lineHeight = fontSize + 4
          const heightNeeded = lines.length * lineHeight
          if (cursorY + heightNeeded > pageHeight - margin) {
            doc.addPage()
            cursorY = margin
          }
          doc.text(lines, margin, cursorY)
          cursorY += heightNeeded + 12
        }

        const titleText = `${plan.title} • ${this.currentLesson?.title || 'Chapter'}`
        addText(titleText, 18, 'bold')
        addText(plan.description, 12, 'normal')

        plan.highlights?.forEach((line, index) => {
          const text = `${index + 1}. ${line}`
          addText(text, 11, 'normal')
        })

        const slug = (this.currentLesson?.title || 'chapter')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-+$/, '')
        doc.save(`${plan.planId}-${slug || 'plan'}.pdf`)
      } catch (error) {
        console.error('Unable to create PDF', error)
        this.triggerCopyAlert('Unable to download the plan right now.', 'danger')
      }
    },
    shuffleArray(arr) {
      return arr.slice().sort(() => Math.random() - 0.5)
    },
    scrollToSection(target) {
      this.$nextTick(() => {
        if (typeof target === 'string') {
          const el = document.getElementById(target)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
          }
          this.scrollToTop()
          return
        }
        const cards = document.querySelectorAll('.guidance-card .guidance-card-item')
        if (cards[target]) {
          cards[target].scrollIntoView({ behavior: 'smooth', block: 'center' })
        } else {
          this.scrollToTop()
        }
      })
    },
    answerQuiz(option) {
      const question = this.currentQuestion
      if (!question) return
      const correct = option === question.answer
      this.quizStatus = correct ? 'correct' : 'incorrect'
      this.selectedOption = option
      if (correct) {
        this.quizCorrectCount++
        this.lastIncorrectExplanation = null
        if (this.quizCorrectCount >= this.quizRequiredCorrect) {
          this.chapterQuizPassed = true
          this.quizFeedback = 'Nicely done! The Next Chapter button is activated.'
          this.$nextTick(() => {
            this.scrollToNextButton()
          })
        } else {
          this.quizFeedback = `Great! ${this.quizCorrectCount}/${this.quizRequiredCorrect} saved ${this.quizRequiredCorrect - this.quizCorrectCount} to go.`
          setTimeout(() => {
            this.advanceQuestion()
          }, 700)
        }
      } else {
        this.quizFeedback = 'Not quite, try another option.'
        const sectionIndex = question.sectionIndex ?? 0
        const section = this.currentLesson?.sections?.[sectionIndex]
        const sectionId = section ? `section-${this.selectedPill}-${sectionIndex}` : ''
        const explanation = question.explanation || ''
        if (explanation) {
          this.lastIncorrectExplanation = {
            text: explanation,
            sectionId
          }
        } else {
          this.lastIncorrectExplanation = null
        }
      }
    }
  },
})
</script>

<style scoped src="./RevertComponent.css"></style>
