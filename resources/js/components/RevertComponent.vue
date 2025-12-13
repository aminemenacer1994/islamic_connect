<template>
  <div class="revert-shell position-relative" v-cloak :class="{ 'reduce-motion': reduceMotionEnabled }">
    <canvas ref="confettiCanvas" class="confetti-canvas" aria-hidden="true"></canvas>

    <!-- Background Layers -->
    <div class="page-sheen"></div>
    <div class="background-pattern"></div>

    <!-- Mobile Nav Toggle -->
    <button
      class="mobile-nav-toggle d-lg-none btn btn-light shadow-sm rounded-circle p-3 position-fixed top-3 start-3 z-3"
      @click="toggleMobileNav">
      <i class="bi" :class="mobileNavOpen ? 'bi-x-lg' : 'bi-list'"></i>
    </button>

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

        <!-- SIDEBAR -->
        <aside class="col-12 col-md-4 col-lg-3" :class="{ 'mobile-open': mobileNavOpen }">
          <div class="navigation-card p-3  shadow-sm rounded-4">

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

        <!-- MAIN CONTENT AREA -->
        <section class="col-12 col-md-8 col-lg-9">
          <!-- Lesson Header -->
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
                <div class="hero-subheader mt-3">
                  <span class="premium-pill">Premium insight</span>
                  <p class="hero-subtitle text-white-75 mb-0">
                    {{ heroTagline }}
                  </p>
                </div>
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

            <div class="content-card section-card animated-fade-slide mb-4 rounded-4 personalization-card"
              :class="{ 'personalization-glow': personalizationGlowActive }">
              <div class="card-header d-flex align-items-center py-3 gap-3">
                <i class="bi bi-stars text-teal fs-4"></i>
                <div>
                  <h2 class="fw-bold mb-0 fs-5 text-black">Personalized Insight</h2>
                  <p class="text-muted small mb-0">Recommendations based on your quiz + streak.</p>
                </div>
              </div>
              <div class="card-body px-3">
                <p class="mb-2 text-muted small text-uppercase">Focus: {{ personalizationPrompt.focus }}</p>
                <p class="mb-2 fw-semibold text-black">{{ personalizationPrompt.recommendation }}</p>
                <ul class="personalization-tips list-unstyled mb-0">
                  <li v-for="tip in personalizationPrompt.tips" :key="tip" class="mb-1">
                    <i class="bi bi-lightbulb text-teal me-2"></i>
                    <span class="text-muted">{{ tip }}</span>
                  </li>
                </ul>
              </div>
            </div>

          <div class="content-card tone-card section-card mb-4 rounded-4">
            <div class="card-header d-flex align-items-center gap-3 py-3">
              <i class="bi bi-sunrise-fill fs-4 text-teal"></i>
              <div>
                <h2 class="fw-bold mb-0 fs-5">Gentle Tone + Non-Judgmental Wording</h2>
                <p class="text-muted small mb-0">Tailor your reflection for each chapter with a warm, encouraging voice that stays neutral and inclusive.</p>
              </div>
            </div>
            <div class="card-body px-3">
              <ul class="tone-guidelines list-unstyled mb-0">
                <li v-for="tone in toneGuidelines" :key="tone" class="mb-2">
                  <i class="bi bi-check-circle text-teal me-2"></i>
                  <span>{{ tone }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Onboarding Block -->
          <div v-if="currentGentleStartSteps.length" class="content-card onboarding-card mb-4 rounded-4">
            <div class="card-body px-4 py-3">
              <div class="d-flex flex-column flex-md-row align-items-start align-items-md-end justify-content-between gap-3 mb-2">
                <div>
                  <p class="mb-1 text-muted small text-uppercase">Gentle start</p>
                  <h3 class="fw-semibold mb-1">Simple welcome for new friends</h3>
                </div>
              </div>
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
              <strong class="d-block mb-1">Focus of this lesson</strong>
              <p class="mb-0 text-muted medium">
                {{ currentToneFocusText || currentLesson?.summary || 'Read slowly, ask questions, and pause between each section. This lesson is your new soft landing zone.' }}
              </p>
            </div>
          </div>

          

            <!-- main content -->
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

            <div v-if="pathwayClips.length" class="content-card guided-section-card mb-4 rounded-4">
              <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 p-3">
                <div>
                  <p class="text-teal small mb-1 fw-semibold">Guided Pathway</p>
                  <h3 class="mb-1 fw-semibold">Short clips to carry the lesson forward</h3>
                  <p class="text-muted small mb-0">Pair a quick clip with your streak to keep the learning playful.</p>
                </div>
              </div>

              <div id="pathway-clips-section" class="content-card section-card animated-fade-slide mb-4 rounded-4 pathway-clips-card">
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

              <div v-if="guidedPathwayCards.length" class="guided-bullets px-3 pb-3">
                <div v-for="(card, index) in guidedPathwayCards" :key="card.step" class="guided-bullet">
                  <div>
                    <p class="mb-0 fw-semibold">{{ card.title }}</p>
                    <small class="text-muted">{{ card.action }}</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lesson Departments Focus -->
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
                    <h3 class="fw-bold mb-1">Share with a friend or family member</h3>
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

            <!-- Dos and Dont's -->
            <div v-if="secondarySectionsReady && currentDosDonts" class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-arrow-right-circle-fill fs-4 me-3 text-teal"></i>
                <h2 class="fw-bold mb-0 fs-5">Do's and Dont's</h2>
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
                <div class="card-header d-flex align-items-center py-3">
                  <i class="fas fa-chart-line fs-4 me-3 text-teal"></i>
                  <div>
                    <h2 class="fw-bold mb-0 fs-5">Key Insights</h2>
                    <p class="fs-6 text-muted mb-0">
                      {{ currentChapterKeyInsights?.chapter || currentLesson?.title || 'Chapter' }}
                    </p>
                  </div>
                </div>
                <div class="card-body p-3">
                  <ul class="list-group insight-list fs-6 lh-base mb-0">
                    <li v-for="insight in insightsToShow" :key="insight"
                      class="list-group-item border-0 px-0 py-3 d-flex align-items-center gap-3">
                      <i class="fas fa-check-circle fs-5 text-teal"></i>
                      <span>{{ insight }}</span>
                    </li>
                  </ul>
                </div>
              </div>

      

            <!-- Share & uplift -->
            <div class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-7">
                    <h3 class="fw-bold mb-1 fs-5">Share & uplift</h3>
                    <p class="text-muted mb-3 fs-6">
                      Spread the lesson copy the link or share a dua so others stay inspired.
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
                  <h2 class="fw-bold mb-0 fs-5">Revert stories</h2>
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

            <!-- Common asked questions -->
            <div v-if="secondarySectionsReady && chapterCommonPanels.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <i class="bi bi-info-square-fill fs-4 text-teal"></i>
                  <h2 class="fw-bold mb-0 fs-5">Common Asked Questions</h2>
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
              <div class="card-body px-3 px-md-4 py-4">
                <div class="d-flex flex-column gap-2">
                  <p class="mb-0 fw-bold">Motivation</p>
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
              <div class="card-header d-flex align-items-center justify-content-between py-3">
                <div class="d-flex align-items-center gap-3">
                  <i class="bi bi-calendar-week fs-4 text-teal"></i>
                  <div>
                    <h2 class="fw-bold mb-0 fs-5">Curated Weekly Plans</h2>
                    <p class="text-muted small mb-0">Pick the timeline that fits your current rhythm.</p>
                  </div>
                </div>
              </div>
              <div class="card-body px-4 pb-0 pt-0">
                <div class="row g-3">
                  <div v-for="plan in currentChapterPlans" :key="plan.planId" class="col-12 col-md-4">
                    <article class="plan-card rounded-4 p-4 shadow-sm border">
                      <div class="d-flex align-items-start justify-content-between flex-wrap gap-2 mb-3">
                        <div>
                          <p class="text-muted small mb-1">{{ plan.duration }}</p>
                          <h3 class="fw-semibold mb-2 fs-5">{{ plan.title }}</h3>
                          <p class="text-dark small mb-0">{{ plan.description }}</p>
                        </div>
                        <span class="badge badge-pill plan-badge text-uppercase">{{ plan.planId.replace('-', ' ') }}</span>
                      </div>
                      <ul class="plan-highlights list-unstyled mb-3">
                        <li v-for="highlight in plan.highlights" :key="highlight" class="plan-highlight">
                          <i class="bi bi-chevron-right text-teal"></i>
                          <span>{{ highlight }}</span>
                        </li>
                      </ul>
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
                    </article>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div class="content-card next-steps-card animated-slide-up rounded-5 mb-4" style="animation-delay: 0.4s">
              <div class="card-header d-flex align-items-center justify-content-between py-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="next-steps-icon">
                    <i class="bi bi-clipboard-check-fill fs-5"></i>
                  </div>
                  <div>
                    <h1 class="fw-bold mb-0 fs-5">Next Steps & Homework</h1>
                  </div>
                </div>
              </div>

              <div class="next-steps-body p-4">
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
import chapterToneGuidelines from './data/chapterToneGuidelines.json'
import chapterToneFocus from './data/chapterToneFocus.json'
import chapterGuidedPathway from './data/chapterGuidedPathway.json'
import chapterGentleStart from './data/chapterGentleStart.json'
import chapterSectionStats from './data/chapterSectionStats.json'
import chapterLessonOverview from './data/chapterLessonOverview.json'
import personalizationPrompts from './data/personalizationPrompts.json'
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

const REVERTS_GUIDE_STEPS = [
  {
    title: 'Explore the roadmap',
    description: 'Each pill maps to a chapter tap to revisit that lesson, see what’s complete, and unlock the next insight.'
  },
  {
    title: 'Personalize your pace',
    description: 'The right column surfaces your tone, personalization prompts, and next-step cues so every repeat feels intentional.'
  },
  {
    title: 'Use the media & sharing tools',
    description: 'Play revert stories, copy or share lesson summaries, and keep the reflections alive with dua cards and guided clips.'
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
      toneGuidelinesByChapter: normalizeJson(chapterToneGuidelines),
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
        faqs: false
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
      ttsSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
      ttsActiveSection: null,
      currentUtterance: null,
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
      personalizationGlowActive: false,
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
    chapterProgressPercent() {
      return this.chapterQuizPassed ? 100 : 0
    },
    overallProgressPercent() {
      const total = this.roadmapData.length || 1
      return Math.round((this.completedChapters / total) * 100)
    },
    reflectionPrompt() {
      return this.chapterQuizPassed
        ? 'Share one key insight from this chapter with someone who could benefit.'
        : 'Pause and write down one question or dua that surfaced during this lesson.'
    },
    reflectionNote() {
      return this.chapterQuizPassed
        ? 'Helping others remember keeps the lesson fresh in your heart.'
        : 'Honest questions are invitations to deeper clarity.'
    },
    keepGoingTips() {
      return [
        'Replay a short clip from today’s chapter whenever you need courage.',
        'Bookmark a dua or verse and revisit it before sleep.'
      ]
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
    gamificationBadges() {
      const streakEarned = this.currentStreakDays >= 3
      const mediaEarned = Boolean(this.activeVideoId)
      const totalChallenges = this.dailyChallenges.length
      const gameEarned = this.dailyGamePoints >= totalChallenges && totalChallenges > 0
      return [
        {
          id: 'quiz',
          title: 'Quiz Champion',
          detail: this.chapterQuizPassed
            ? 'Quiz mastery confirmed for this chapter.'
            : 'Answer two questions to prove today’s mastery.',
          status: this.chapterQuizPassed ? 'Unlocked' : 'Ready',
          earned: this.chapterQuizPassed,
          actionLabel: 'Take quiz',
          earnedLabel: 'Celebrate'
        },
        {
          id: 'streak',
          title: 'Momentum Score',
          detail: this.currentStreakDays
            ? `You have a ${this.currentStreakDays}-day streak working through chapters.`
            : 'Finish a chapter every day to ignite your streak.',
          status: this.currentStreakDays ? `${this.currentStreakDays} day streak` : 'Streak ready',
          earned: streakEarned,
          actionLabel: 'Keep streak alive',
          earnedLabel: 'Streak locked'
        },
        {
          id: 'media',
          title: 'Media Explorer',
          detail: 'Watch at least one revert story to unlock this badge.',
          status: mediaEarned ? 'Clip watched' : 'Clip available',
          earned: mediaEarned,
          actionLabel: 'Watch stories',
          earnedLabel: 'Replay clip'
        },
        {
          id: 'game',
          title: 'Insight Game',
          detail: 'Complete the micro-challenges to keep the learning streak playful.',
          status: `${this.dailyGamePoints}/${totalChallenges} complete`,
          earned: gameEarned,
          actionLabel: 'Play today',
          earnedLabel: 'Game mastered'
        }
      ]
    },
    streakSummary() {
      if (!this.currentStreakDays) {
        return 'Start a streak by completing one chapter today.'
      }
      return `Current streak: ${this.currentStreakDays} day${this.currentStreakDays === 1 ? '' : 's'}.`
    },
    heroTagline() {
      const lesson = this.currentLesson
      if (!lesson) return 'Deep reflections curated for caring hearts.'
      return lesson.tagline || lesson.summary || 'Deep reflections curated for caring hearts.'
    },
    personalizationPrompt() {
      const chapterId = this.currentLesson?.chapterId
      const prompt = normalizeJson(personalizationPrompts).find(entry => entry.chapterId === chapterId)
      return prompt || {
        focus: 'Personal growth',
        recommendation: 'Choose a dua or reflection that matches today’s learning and add it to your routine.',
        tips: []
      }
    },
    personalNextStep() {
      const streak = this.currentStreakDays
      return normalizeJson(nextStepPrompts)
        .slice()
        .sort((a, b) => b.streakThreshold - a.streakThreshold)
        .find(prompt =>
          streak >= prompt.streakThreshold &&
          (prompt.quizPassed === undefined || prompt.quizPassed === this.chapterQuizPassed)
        ) || {
          title: 'Keep going',
          description: 'Take a breather, read a favorite dua, and come back refreshed so the streak stays intact.',
          actionLabel: 'Take a breath',
          actionLinkType: 'breath',
          note: 'Gentle pace, same smile.'
        }
    },
    completedChapters() {
      return this.maxStepReached - 1
    },
    totalChapters() {
      return this.roadmapData.length
    },
    learningObjectiveColumns() {
      const objectives = this.currentLesson?.learningObjectives || []
      const chunkSize = 3
      const columns = []
      for (let i = 0; i < objectives.length; i += chunkSize) {
        columns.push(objectives.slice(i, i + chunkSize))
      }
      return columns
    },
    lessonHeroStats() {
      return [
        { label: 'Chapters unlocked', value: `${Math.min(this.maxStepReached, this.roadmapData.length) - 1}` },
        { label: 'Resources', value: `${this.premiumResources.length}` },
        { label: 'Quizzes available', value: `${this.quizzes.length}` }
      ]
    }
    ,
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
    toneGuidelines() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.toneGuidelinesByChapter.find(item => item.chapterId === chapterId)
      if (entry?.guidelines?.length) {
        return entry.guidelines
      }
      return [
        'Welcoming every background without assumptions',
        'Encouraging progress, not perfection',
        'Keeping language simple and non-technical',
        'Avoiding judgment or cultural generalizations'
      ]
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
          const seconds = this.parseDurationInSeconds(video.duration)
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
    focusHighlights() {
      const lesson = this.currentLesson || {}
      const objectives = lesson.learningObjectives || []
      return [
        {
          label: 'Sections',
          value: `${lesson.sections?.length || 0}`,
          detail: 'Read slowly, pause, and replay the explanations.'
        },
        {
          label: 'First objective',
          value: objectives[0] ?? 'Insight',
          detail: 'Let this goal guide your dua and reflection.'
        },
        {
          label: 'Tip',
          value: lesson.keyInsights?.[0] ?? lesson.summary?.slice(0, 40) ?? 'Stay present',
          detail: 'Keep the message close to your heart as you progress.'
        }
      ]
    }
    ,
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
      if (!this.confettiEnabled) return
      if (newVal && !oldVal) {
        this.launchMicroConfetti()
      }
    },
    dailyGamePoints(newVal, oldVal) {
      if (!this.confettiEnabled) return
      const total = this.dailyChallenges.length
      if (total > 0 && newVal === total && (!oldVal || oldVal < total)) {
        this.launchMicroConfetti()
      }
    },
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
      this.personalizationGlowActive = true
      setTimeout(() => { this.personalizationGlowActive = false }, 2600)
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
      const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
      return match ? match[1] : null
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
      const explicitTags = (video.tags || []).filter(Boolean)
      if (explicitTags.length) {
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
      return matches.length ? matches : [fallbackTag]
    },

    parseDurationInSeconds(duration) {
      if (!duration) return 0
      const cleaned = `${duration}`.replace(/[^\d:]/g, '').trim()
      if (!cleaned) return 0
      const parts = cleaned.split(':').map(segment => Number(segment.trim()))
      if (parts.some(part => Number.isNaN(part))) return 0
      return parts.reduce((total, part) => total * 60 + part, 0)
    },
    deriveVideoGender(video) {
      const text = `${video.title || ''} ${video.description || ''}`.toLowerCase()
      const femaleKeywords = ['she', 'her', 'woman', 'women', 'sister', 'mom', 'mother', 'girl', 'lady', 'daughter', 'female']
      const maleKeywords = ['he', 'his', 'man', 'men', 'brother', 'dad', 'father', 'boy', 'guy', 'husband', 'male']
      if (femaleKeywords.some(keyword => text.includes(keyword))) return 'female'
      if (maleKeywords.some(keyword => text.includes(keyword))) return 'male'
      return 'other'
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
    getTtsText(section) {
      if (section === 'lesson') {
        return this.getLessonOverviewText()
      }
      if (section === 'duas') {
        return `Duas takeaways: ${this.getDuasText()}`
      }
      return ''
    },
    startTTS(section) {
      if (!this.ttsSupported) {
        this.setShareStatus('lesson', 'Text-to-speech unavailable in this browser.')
        return
      }
      this.stopTTS()
      const text = this.getTtsText(section)
      if (!text) return
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.onend = () => {
        this.ttsActiveSection = null
        this.currentUtterance = null
      }
      this.currentUtterance = utterance
      this.ttsActiveSection = section
      window.speechSynthesis?.speak(utterance)
    },
    stopTTS() {
      if (this.currentUtterance) {
        window.speechSynthesis?.cancel()
        this.ttsActiveSection = null
        this.currentUtterance = null
      }
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
    executeNextStepAction(type) {
      switch (type) {
        case 'share':
          this.shareStreakWithFriend()
          break
        case 'repeat':
          this.launchSkimSection()
          break
        case 'review':
          this.scrollToSection('section-0')
          break
        default:
          this.openWhatsappShare(this.getShareLink())
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

<style scoped>
:global([v-cloak]) {
  display: none !important;
}
:global(body) {
  background: radial-gradient(circle at top, rgba(14, 165, 233, 0.08), transparent 45%),
    radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.08), transparent 40%),
    #f5f7fa;
  min-height: 100vh;
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

:global(:root) {
  --brand-teal: #0b806f;
  --brand-slate: #0f172a;
  --brand-gradient: linear-gradient(135deg, rgba(11, 128, 111, 0.9), rgba(16, 185, 129, 0.9));
}

.hero-subheader {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.premium-pill {
  align-self: flex-start;
  padding: 0.25rem 0.9rem;
  border-radius: 999px;
  background: rgba(248, 250, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
}

.hero-subtitle {
  font-size: 0.95rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.85);
}

.muted-divider {
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
}

.borderless-card {
  border: none !important;
  box-shadow: 0 25px 55px rgba(15, 23, 42, 0.12);
  background-clip: padding-box;
}

.section-card,
.content-card,
.guided-section-card,
.next-step-card,
.personalization-card,
.tone-card,
.next-steps-card,
.mission-card,
.motivation-card,
.reflection-card,
.tip-card,
.accordion-card,
.quiz-shell,
.actions-card,
.video-card,
.clip-card {
  border: none !important;
}

/* ==================== BOOTSTRAP ICONS ==================== */

.background {

  gap: 6px;
  padding: 6px 10px;
  font-size: 0.9rem;
  color: #114b5f;
  background: #eaf3f1;
  border: 1px solid rgba(11, 128, 111, 0.25);
}

.btn-see-more {
  border-radius: 10px;
  padding: 0.65rem 1.75rem;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  background: linear-gradient(120deg, #0b806f, #34d399);
  box-shadow: 0 10px 25px rgba(11, 128, 111, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
}

.btn-see-more:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 18px 40px rgba(11, 128, 111, 0.45);
}

.btn-see-more .bi {
  transition: transform 0.3s ease;
}

.btn-see-more:hover .bi {
  transform: translateX(3px);
}

.btn-see-more:focus-visible {
  outline: 3px solid rgba(52, 211, 153, 0.6);
  outline-offset: 3px;
}

.video-preview-shell {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 28px;
  min-height: 240px;
}

.video-card-caption {
  background: #fff;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

.video-card-caption h3 {
  font-size: 0.95rem;
}

.video-card-duration {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.video-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.35rem;
}

.video-tag-badge {
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  border-radius: 999px;
  padding: 0.2rem 0.75rem;
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.35);
  color: #0f172a;
  font-weight: 600;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1.5rem;
  padding-top: 1.75rem;
}

.video-thumbnail .thumbnail-pattern {
  z-index: 0;
}

.video-thumbnail .thumbnail-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 14px 14px;
  opacity: 0.7;
}

.video-thumbnail-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  gap: 0.75rem;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.8));
  color: #fff;
  text-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
  box-sizing: border-box;
}

.thumbnail-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail-label {
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
  color: rgba(255, 255, 255, 0.8);
}

.thumbnail-title {
  font-size: 1.05rem;
  margin: 0;
  line-height: 1.4;
}

.thumbnail-subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 210px;
}

.btn-watch.modal-watch {
  width: auto;
  padding: 0.6rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.video-card {
  cursor: pointer;
  border-radius: 28px;
  border: 1px solid rgba(15, 23, 42, 0.07);
  background: #fff;
  box-shadow: 0 25px 45px rgba(15, 23, 42, 0.15);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 60px rgba(15, 23, 42, 0.25);
}

.video-feature {
  position: relative;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 28px;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}

.video-feature iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-feature-overlay {
  position: relative;
  z-index: 1;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.7rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
}

.video-feature-text {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #0f172a;
}

.video-feature-label {
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 0.65rem;
  margin: 0;
  color: #0f172a;
  opacity: 0.8;
}

.video-feature-title {
  font-size: 1.2rem;
  line-height: 1.35;
  margin: 0;
  font-weight: 600;
}

.video-feature-subtitle {
  font-size: 0.85rem;
  color: #475467;
  line-height: 1.45;
  margin: 0;
}

.video-feature-duration {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #64748b;
  margin: 0;
}

.btn-watch {
  border-radius: 999px;
  padding: 0.75rem 1.3rem;
  background: #0f172a;
  color: #ffffff;
  border: none;
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  align-self: stretch;
  width: 100%;
  text-transform: none;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.35);
}

.video-modal-filters {
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 1.2rem;
  padding: 1.3rem 1.5rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(243, 247, 250, 0.9));
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.09);
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.1rem;
}

.filter-column {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.filter-label {
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-size: 0.68rem;
  color: #475467;
}

.video-modal-filters .form-control-sm,
.video-modal-filters .form-select-sm {
  border-radius: 0.9rem;
  border-color: rgba(15, 23, 42, 0.2);
  box-shadow: none;
  background: #fff;
  padding: 0.55rem 0.85rem;
  font-size: 0.95rem;
}

.filter-empty {
  letter-spacing: 0.08em;
  margin-left: 0.5rem;
}

/* .pathway-clips-card {
  border: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), #f0f6ff);
  box-shadow: 0 32px 65px rgba(15, 23, 42, 0.16);
  position: relative;
  overflow: hidden;
} */
.pathway-clips-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% -10%, rgba(14, 165, 233, 0.15), transparent 55%),
    radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.15), transparent 45%),
    linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(79, 70, 229, 0.04));
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;
}
.pathway-clips-card .card-body {
  position: relative;
  z-index: 1;
}

.clip-card {
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(15, 23, 42, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.clip-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.18);
}

.clip-thumbnail {
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  background: linear-gradient(145deg, rgba(14, 165, 233, 0.2), rgba(79, 70, 229, 0.25));
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.55);
}

.clip-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(5, 150, 105, 0.25), transparent 65%);
}

.clip-duration {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(15, 23, 42, 0.65);
  font-size: 0.65rem;
}

.gamification-card {
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.streak-summary {
  font-weight: 500;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.badge-card {
  border-radius: 0.95rem;
  padding: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #fff;
  min-height: 120px;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
  transition: border 0.25s ease, box-shadow 0.25s ease;
}

.badge-card--earned {
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow: 0 18px 55px rgba(16, 185, 129, 0.15);
}

.badge-status {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #475467;
}

.micro-game-card {
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.micro-game-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.micro-game-item {
  border-radius: 0.95rem;
  padding: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: #fff;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.07);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.personalization-card {
  border: 1px solid transparent;
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(160deg, rgba(14, 165, 233, 0.25), rgba(147, 51, 234, 0.45));
  box-shadow: 0 25px 60px rgba(79, 70, 229, 0.25);
  color: #f8fafc;
}

.personalization-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 28px;
  padding: 1px;
  background: linear-gradient(120deg, rgba(5, 150, 105, 0.8), rgba(129, 140, 248, 0.8));
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  z-index: 1;
  pointer-events: none;
}

.personalization-card.personalization-glow::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 32px;
  background: radial-gradient(circle at top, rgba(99, 102, 241, 0.6), transparent 55%);
  opacity: 0;
  animation: personalizationGlow 2.4s ease forwards;
  pointer-events: none;
  z-index: 0;
}

.personalization-card .card-body {
  position: relative;
  z-index: 2;
}

.personalization-card p,
.personalization-card small,
.personalization-card li span {
  color: rgba(248, 250, 252, 0.95);
}

.personalization-card i {
  color: #f1f5f9;
}

.personalization-card .personalization-tips li {
  gap: 0.5rem;
}

@keyframes personalizationGlow {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.05);
  }
}

.personalization-tips li {
  display: flex;
  align-items: center;
}

.next-step-card {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, rgba(14, 165, 233, 0.1), rgba(124, 58, 237, 0.14));
  border-radius: 28px;
  border: 1px solid rgba(14, 165, 233, 0.35);
  box-shadow: 0 28px 60px rgba(14, 165, 233, 0.18);
  color: #0f172a;
}

.next-step-card .card-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  position: relative;
  z-index: 2;
}
.next-step-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 28px;
  background: radial-gradient(circle at 10% 10%, rgba(14, 165, 233, 0.35), transparent 45%),
    radial-gradient(circle at 90% 20%, rgba(124, 58, 237, 0.35), transparent 50%);
  filter: blur(12px);
  opacity: 0.8;
  z-index: 0;
  pointer-events: none;
}
.next-step-card::after {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 24px;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.6) 2px, transparent 2px),
    radial-gradient(circle, rgba(14, 165, 233, 0.35) 1.5px, transparent 1.5px);
  background-size: 20px 20px, 12px 12px;
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
}
.next-step-card .card-body {
  position: relative;
  z-index: 2;
}


.thumbnail-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.65;
  mix-blend-mode: screen;
  pointer-events: none;
}

.thumbnail-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.thumbnail-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.thumbnail-label {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.1rem;
}

.thumbnail-title {
  font-size: 1rem;
  line-height: 1.3;
  font-weight: 600;
  margin: 0;
  max-height: 4.2rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.thumbnail-play {
  position: relative;
  z-index: 1;
  align-self: flex-start;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border-radius: 999px;
  padding: 0.45rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  transition: background 0.25s ease;
}

.thumbnail-play:hover {
  background: rgba(255, 255, 255, 0.35);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* ==================== PROFESSIONAL TOP-RIGHT SUCCESS ALERT ==================== */
.success-alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.alert-success-custom {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #34d399;
  color: #065f46;
  border-radius: 16px;
  padding: 1.2rem 1.8rem;
  font-size: 1.1rem;
  min-width: 360px;
  box-shadow: 0 15px 40px rgba(16, 197, 129, 0.25);
  backdrop-filter: blur(12px);
  border-left: 6px solid #10b981;
  animation: slideInTopRight 0.6s cubic-bezier(0.25, 0.86, 0.25, 1) forwards;
  pointer-events: auto;
}

.copy-alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.alert-copy-notification {
  border-radius: 12px;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  min-width: 260px;
  background: #ffffff;
  border: 1px solid rgba(59, 130, 246, 0.35);
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.15);
}

.alert-outline.alert-info {
  border-color: rgba(14, 165, 233, 0.4);
  color: #0f172a;
}

.alert-outline.alert-success {
  border-color: rgba(16, 185, 129, 0.6);
  color: #065f46;
  background: rgba(16, 185, 129, 0.1);
}

.alert-outline .bi {
  font-size: 1.1rem;
}

.alert-info-copy {
  background: #fefefe;
  border: 1px solid rgba(14, 165, 233, 0.35);
  color: #0f172a;
  border-radius: 16px;
  padding: 1rem 1.4rem;
  font-size: 1rem;
  min-width: 300px;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.25);
  border-left: 6px solid #0ea5e9;
  animation: slideInTopRight 0.4s cubic-bezier(0.25, 0.86, 0.25, 1) forwards;
  pointer-events: auto;
}



@keyframes slideInTopRight {
  from {
    opacity: 0;
    transform: translateX(120px) translateY(-40px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
  }
}

/* ==================== ALL YOUR ORIGINAL STYLES (100% UNCHANGED) ==================== */
.section-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), #f5f9ff);
  border-radius: 20px;
  border: 1px solid rgba(15, 86, 140, 0.12);
  box-shadow: 0 25px 45px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  overflow: hidden;
  margin-bottom: 2rem;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  backdrop-filter: blur(18px);
}

.content-card {
  background: transparent;
}

.section-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 40px 50px rgba(15, 23, 42, 0.14),
    0 18px 30px rgba(15, 23, 42, 0.08);
}

.card-header {
  background: none;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-color: transparent;
}

.section-number {
  width: 46px;
  height: 46px;
  background: var(--bs-primary, #0d6efd);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.card-body {
  padding-top: 1rem;
}

.section-content {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #333;
}

.deep-dive {
  background: linear-gradient(135deg, #fff8e1 0%, #fff3e0 100%);
  border-left: 5px solid #ffb302;
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  margin-top: 2rem;
  box-shadow: 0 4px 15px rgba(255, 179, 2, 0.1);
}

.deep-dive-header {
  color: #d97706;
}

.deep-dive-content {
  font-size: 1rem;
  line-height: 1.7;
  color: #444;
}

.section-content {
  line-height: 1.8;
  font-size: 1.15rem;
}

.section-content p:first-child {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a365d;
  margin: 0 0 2rem 0;
  line-height: 1.2;
}

.section-content p:nth-child(2),
.section-content p:nth-child(3),
.section-content p:nth-child(4) {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2b6cb0;
  margin-top: 2.5rem;
}

.revert-shell {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.revert-shell::before {
  content: '';
  position: absolute;
  inset: 0;
  background: none;
  pointer-events: none;
  z-index: 0;
}

.page-sheen {
  display: none;
}

.background-pattern {
  display: none;
}

.confetti-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 12000;
}

.reduce-motion *,
.reduce-motion *::before,
.reduce-motion *::after {
  animation-duration: 0.001ms !important;
  animation-delay: 0s !important;
  animation-name: none !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
  transition-property: none !important;
}

.reduce-motion .animated-fade-in,
.reduce-motion .animated-fade-slider,
.reduce-motion .animated-fade-slide,
.reduce-motion .animated-slide-up,
.reduce-motion .animated-slide-down,
.reduce-motion .content-card,
.reduce-motion .next-steps-pill,
.reduce-motion .section-card {
  animation: none !important;
}

.revert-content {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 2rem);
  padding: 1.5rem clamp(1rem, 4vw, 2rem);
  margin: 0 auto;
  background: #fefefe;
  }

.revert-content .container-fluid {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0;
}

.revert-shell {
  padding-bottom: 2rem;
}

.revert-content .row.g-4 {
  min-height: calc(100vh - 2rem);
}

.revert-content section {
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding-right: 0.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 991.98px) {
  .revert-content section {
    max-height: none;
    overflow-y: visible;
    padding-right: 0;
  }

  .navigation-card {
    position: relative;
    top: auto;
    width: 100%;
    border-radius: 24px;
    padding: 1.25rem;
    margin-bottom: 1rem;
  }

  .lesson-header {
    margin-bottom: 1rem;
  }

  .content-card {
    margin: 0 0 1.25rem;
  }

  .lesson-hero-content h1 {
    font-size: clamp(1.9rem, 6vw, 2.4rem);
  }

  .lesson-hero-content p {
    font-size: 0.95rem;
  }

  .quiz-options-grid {
    grid-template-columns: 1fr;
  }

  .revert-content {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .content-card.section-card,
  .actions-card,
  .quiz-shell {
    padding-left: 0;
    padding-right: 0;
  }

  .content-card .card-body,
  .quiz-body {
    padding: 0.9rem 0.75rem;
  }

  .lesson-hero {
    padding: 1.75rem;
  }

  .navigation-card {
    border-radius: 20px;
    backdrop-filter: blur(18px);
  }

  .mobile-nav-toggle {
    top: 1rem;
    left: auto;
    right: 1rem;
  }

  .next-steps-body,
  .quiz-shell,
  .content-card.section-card {
    padding: 1.25rem;
  }

  .lesson-hero {
    border-radius: 30px;
  }

  .guided-section-card,
  .tone-card,
  .mission-card {
    border-radius: 30px;
    padding: 1.5rem;
  }

  .flat-panel__header {
    padding: 1.05rem 1.1rem;
    background: rgba(15, 23, 42, 0.02);
  }

  .flat-panel__body {
    padding: 0.9rem 1rem 1rem;
    gap: 1rem;
  }

  .share-action-btn {
    padding: 0.55rem 1rem;
  }

  .share-boost-pill {
    padding: 0.8rem 0.9rem;
  }

  .navigation-card {
    padding: 1rem;
  }
  .course-progress {
    font-size: 0.95rem;
  }
@media (max-width: 767.98px) {
  .flat-panel__header,
  .flat-panel__body {
    padding-left: 0.9rem;
    padding-right: 0.9rem;
  }

  .flat-panel + .flat-panel {
    margin-top: 0.6rem;
  }

  .revert-content section {
    padding: 0;
  }

  .share-actions {
    gap: 0.4rem;
  }

  .dos-donts-columns {
    gap: 1rem;
  }
}

}

.mobile-nav-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  width: 50px;
  height: 50px;
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  font-size: 1.25rem;
  color: #374151;
}

@media (max-width: 600px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .lesson-focus-actions {
    width: 100%;
    order: 2;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .lesson-focus-actions .header-action {
    flex: 1;
    justify-content: center;
    border-radius: 14px;
    padding: 0.6rem;
    font-size: 0;
  }

  .lesson-focus-actions .header-action span {
    display: none;
  }

  .lesson-focus-actions .header-action i {
    margin: 0;
  }
}

.navigation-card {
  min-height: unset;
  border-radius: 24px;
  padding: 1.5rem;
}

.lesson-header {
  padding-top: 1rem;
}

@media (max-width: 576px) {
  .revert-shell {
    padding: 0.5rem;
  }

  .navigation-card {
    padding: 1rem;
  }

  .lesson-hero,
  .content-card.section-card {
    border-radius: 28px;
  }

  .mobile-nav-toggle {
    width: 44px;
    height: 44px;
  }
}



/* ---------- Additional responsive polish ---------- */
@media (max-width: 992px) {
  .flat-panel {
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
  }

  .navigation-card {
    padding: 1rem;
  }

  .flat-panel__header {
    background: rgba(15, 23, 42, 0.02);
  }

  .flat-panel__body {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .flat-panel__body {
    padding: 0.85rem;
  }

  .share-action-btn {
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;
  }

  .share-boost-pill {
    padding: 0.6rem 0.8rem;
  }

  .lesson-focus-intro {
    padding: 0.75rem 1rem;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.animated-fade-slide {
  opacity: 0;
  animation: fadeSlideUp 0.45s ease-out forwards;
}

.animated-fade-in {
  animation: fadeInUp 0.45s ease-out;
}

.animated-slide-up {
  animation: fadeInUp 0.45s ease-out;
  animation-fill-mode: both;
}

.navigation-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.85));
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.18);
  border: 1px solid rgba(15, 76, 117, 0.15);
  position: sticky;
  top: 2rem;
  height: fit-content;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  backdrop-filter: blur(16px);
  scrollbar-width: none; /* hide scrollbar for Firefox */
  -ms-overflow-style: none; /* hide scrollbar for IE/Edge */
}

.navigation-card::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.progress-indicator {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.progress-bar-container {
  height: 8px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #eaf3f1, rgba(11, 128, 111, 0.20));
  border-radius: 10px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.motivation-card,
.reflection-card,
.tip-card,
.encouragement-card {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.15);
}
.share-actions {
  gap: 0.75rem;
}
.share-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.2rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.share-action-btn span {
  font-size: 0.95rem;
}
.share-action-btn.share-copy {
  background: #f8f8f8;
  color: #0f172a;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.share-action-btn.share-whatsapp {
  background: linear-gradient(120deg, #0b806f, #10b981);
  color: #fff;
}
.share-action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 20px rgba(15, 23, 42, 0.15);
}
.next-steps-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #fff;
  box-shadow: 0 20px 35px rgba(15, 23, 42, 0.08);
}

.next-steps-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.05);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #047857;
  box-shadow: inset 0 0 0 1px rgba(4, 120, 87, 0.2);
}

.next-steps-body {
  background: #fff;
  border-radius: 32px;
  padding: 2rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
}

.next-steps-inner {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 26px;
  padding: 1.75rem;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.07);
}

.next-steps-highlight {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.next-steps-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.next-steps-pill {
  padding: 0.95rem 1.25rem;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.12);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 0.95rem;
  color: #0f172a;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
}

.next-steps-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.12);
}

.next-steps-pill-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: #0f172a;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 991.98px) {
  .next-steps-pill-icon {
    display: none;
  }
}
.quiz-explanation-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(246, 248, 255, 0.92));
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.quiz-explanation-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.25), transparent 45%);
  pointer-events: none;
  z-index: 0;
}

.quiz-explanation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.quiz-explanation-body {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  margin-top: 1rem;
  padding-top: 0.75rem;
  position: relative;
  z-index: 1;
}

.quiz-explanation-footer {
  position: relative;
  z-index: 1;
}



.btn-explanation-link {
  border: 0;
  background: linear-gradient(120deg, #0b806f, #22d3ee);
  color: #fff;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-explanation-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2);
}
.chapter-plan-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #fff;
  box-shadow: 0 25px 45px rgba(15, 23, 42, 0.1);
}

.plan-card {
  background: #fff;
  border-radius: 26px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 25px 45px rgba(15, 23, 42, 0.08);
}

.plan-badge {
  background: rgba(14, 165, 233, 0.1);
  color: #0f172a;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  padding: 0.25rem 0.8rem;
}

.plan-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-left: 0;
  margin-bottom: 0;
}

.plan-highlight {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  color: #0f172a;
}

.plan-action-row {
  margin-top: 0.5rem;
}

.plan-action-icons {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.plan-action-icon {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #0f172a;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, transform 0.2s ease;
  box-shadow: none;
  cursor: pointer;
}

.plan-action-icon i {
  font-size: 1.25rem;
  color: inherit;
}

.plan-action-icon:hover {
  color: #0b7285;
  transform: translateY(-2px);
}

.plan-action-icon:focus-visible {
  outline: 2px solid rgba(15, 118, 110, 0.45);
  outline-offset: 3px;
}
.motivation-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(234, 242, 255, 0.9));
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #0f172a;
}

.roadmap-pillset {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.roadmap-pill {
  border-radius: 18px;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
  position: relative;
  overflow: hidden;
}

.roadmap-pill:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.35);
  background: rgba(255, 255, 255, 0.9);
}

.roadmap-pill.completed {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(251, 252, 255, 0.8));
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.roadmap-pill.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(16, 185, 129, 0.15));
  border: 1px solid rgba(59, 130, 246, 0.55);
  box-shadow: 0 22px 42px rgba(15, 23, 42, 0.4), inset 0 0 30px rgba(59, 130, 246, 0.35);
  backdrop-filter: blur(30px);
  color: #0f172a;
  position: relative;
  overflow: hidden;
}

.roadmap-pill.active::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.02));
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(1px);
  animation: shimmer 3.5s ease-in-out 1 both;
}

.roadmap-pill.active::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
  opacity: 0.4;
  pointer-events: none;
  mix-blend-mode: screen;
  filter: blur(0.25px);
  animation: pulse 4s ease-in-out 1 both;
}

.roadmap-pill.active .dot-icon-step {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.35);
  color: #0f172a;
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease;
}

.roadmap-pill.active .dot-icon-step i {
  color: #0f172a;
  filter: drop-shadow(0 2px 6px rgba(15, 23, 42, 0.4));
}

.roadmap-pill.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.dot-wrapper .dot-icon-step {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2));
  border: 1px solid rgba(16, 185, 129, 0.35);
  font-weight: 700;
  color: #0f172a;
}

.nav-link {
  border-radius: 12px;
  padding: 1rem 1.25rem;
  border: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  color: #6b7280;
  font-weight: 500;
  background: transparent;
  display: flex;
  align-items: center;
}

.nav-link:not(.locked):hover {
  background: #f8fafc;
  color: #374151;
  transform: translateX(5px);
}

.nav-link.active {
  background: rgba(59, 130, 246, 0.1);
  color: #0b806f;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  transform: translateX(5px);
}

.nav-link.completed {
  color: linear-gradient(135deg, #0b806f, #60a5fa);
}

.nav-link.locked {
  color: #d1d5db;
  cursor: not-allowed;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-link.active .step-indicator {
  background: #0b806f;
  color: white;
}

.nav-link.completed .step-indicator {
  background: linear-gradient(135deg, #0b806f, #60a5fa);
  color: white;
}

.nav-link.locked .step-indicator {
  background: #f3f4f6;
  color: #9ca3af;
  border: 1px solid #e5e7eb;
}

.active-arrow {
  color: #0b806f;
  font-size: 0.875rem;
}

.content-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(9, 30, 66, 0.12);
  border: 1px solid rgba(22, 163, 74, 0.16);
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: box-shadow 0.35s ease, transform 0.35s ease;
  position: relative;
}

.content-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.07), rgba(59, 130, 246, 0.06));
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
  pointer-events: none;
}

.content-card:hover::after {
  opacity: 1;
}

.content-card::before,
.content-card::after {
  content: none;
}

.content-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.15);
}

.content-card .card-header {
  position: relative;
  overflow: hidden;
  justify-content: flex-start;
  gap: 1rem;
  text-align: left;
}



.content-card:hover .card-header::after {
  opacity: 1;
}

.content-card .card-body {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  padding: 1.75rem;
}

.dua-card {
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: 0 20px 30px rgba(15, 23, 42, 0.12);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.dua-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 45px rgba(15, 23, 42, 0.25);
}

.dua-card .dua-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.25), transparent 45%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.dua-card:hover .dua-glow {
  opacity: 1;
}

.dot-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #0b806f;
  flex-shrink: 0;
  margin-top: 0.35rem;
}

.insight-list .list-group-item {
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-left: 0;
}

.insight-list .list-group-item i {
  display: none;
}

@media (min-width: 992px) {
  .insight-list .list-group-item i {
    display: inline-flex;
    margin-right: 0.35rem;
    color: #0f172a;
  }
}

.glossary-list .list-group-item,
.video-list .list-group-item,
.resource-list .list-group-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 14px;
  margin-bottom: 0.8rem;
  border: 1px solid rgba(16, 185, 129, 0.15);
}

.glossary-list .list-group-item:last-child,
.video-list .list-group-item:last-child,
.resource-list .list-group-item:last-child {
  margin-bottom: 0;
}

.scenario-alert {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.1));
  border-color: rgba(59, 130, 246, 0.2);
  color: #0f172a;
  font-weight: 600;
}

.scenario-alert .bi {
  font-size: 1.25rem;
}

.premium-card {
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid #e3e8ed;
  box-shadow: 0 25px 40px rgba(15, 76, 117, 0.08);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.premium-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 35px 45px rgba(9, 70, 102, 0.15);
}

.premium-card h3 {
  font-size: 1rem;
}

.text-teal {
  color: #0b806f !important;
}

.border-teal {
  border-color: rgba(11, 128, 111, 0.4) !important;
}

.resource-link {
  padding: 0.65rem 1.25rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.95rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(16, 185, 129, 0.15));
  color: #0b806f;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border 0.25s ease;
  cursor: pointer;
}

.resource-link i {
  font-size: 1rem;
}

.resource-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px rgba(14, 165, 233, 0.25);
  border-color: rgba(14, 165, 233, 0.5);
}

.section-stats {
  margin-top: 0.25rem;
}

.section-stat-card {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.65rem 1rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  min-width: 160px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
}

.section-stat-card strong {
  display: block;
  font-size: 0.95rem;
  color: #0b1320;
}

@media (max-width: 768px) {
  .guidance-grid,
  .row.row-cols-1.row-cols-md-2.g-3.mb-4,
  .guided-bullets {
    flex-direction: column;
  }

  .guidance-card-item,
  .section-card,
  .tone-card,
  .guided-section-card {
    padding: 1.25rem;
  }

  .guided-section-card .guided-bullets {
    gap: 1rem;
  }

  .guided-bullet {
    flex-direction: column;
    align-items: flex-start;
  }

  .guided-step {
    min-width: auto;
  }

  .lesson-focus-actions {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .guidance-line span {
    display: none;
  }

}

.steps-list .step-item {
  background: rgba(255, 255, 255, 0.65);
  border-radius: 18px;
  padding: 1rem;
}

.step-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(11, 128, 111, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #0b806f;
}



.quiz-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(14, 165, 233, 0.2), transparent 40%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.quiz-card:hover::after {
  opacity: 1;
}

.quiz-wrapper {
  overflow: hidden;
}

.progress-bar.bg-gradient {
  background: linear-gradient(135deg, #a855f7, #ec4899);
}

.quiz-tip .bi {
  font-size: 1rem;
}

.quiz-success-note {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  background: rgba(16, 185, 129, 0.12);
}

.quiz-success-note .text-teal {
  color: #0b806f;
}

.quiz-success-note .btn-outline-teal {
  border-color: #0b806f;
  color: #0b806f;
  background: transparent;
  font-weight: 600;
  border-width: 1px;
  font-size: 0.9rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.quiz-success-note .btn-outline-teal:hover {
  background: #0b806f;
  color: #ffffff;
}

.quiz-option {
  border-radius: 20px;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 1rem 1.2rem;
  justify-content: space-between;
  transform: translateY(-2px);
  border-color: #000;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.quiz-option {
  border-radius: 20px;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  border: 1px solid #c4c4c4;
  background: #fff;
  padding: 1rem 1.2rem;
  justify-content: space-between;
  transform: translateY(-2px);
  border-color: #000;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

/* .quiz-option:hover {
  border-radius: 20px;
  font-weight: 600;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  border: 1px solid #000000;
  background: #fff;
  padding: 1rem 1.2rem;
  justify-content: space-between;
  transform: translateY(-2px);
  border-color: #000;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
} */

.quiz-option--correct {
  background: linear-gradient(135deg, #0b806f, #16a34a);
  border-color: grey;
  color: #fff;
}

.quiz-option--incorrect {
  background: linear-gradient(135deg, #dc2626, #f87171);
  border-color: grey;
  color: #fff;
}

.quiz-option--neutral {
  background: #fff;
}

.quiz-options-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 0.9rem;
}

@media (max-width: 575.98px) {
  .quiz-options-grid {
    grid-template-columns: 1fr;
  }
}

.quiz-progress-track {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.08);
  overflow: hidden;
}

.quiz-progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #0b806f, #10b981);
  transition: width 0.5s ease;
}

.quiz-shell {
  background: linear-gradient(180deg, rgba(11, 128, 111, 0.12), rgba(239, 246, 255, 0.9));
  border-radius: 24px;
  border: 1px solid rgba(59, 130, 246, 0.18);
}

.quiz-header {
  border-bottom: 1px solid rgba(15, 23, 42, 0.04);
}

.quiz-body {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0 0 24px 24px;
}

.quiz-progress-wrapper {
  max-width: 320px;
}

.icon-stack i {
  font-size: 1.1rem;
}

.next-btn {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  background: linear-gradient(135deg, #0b806f, #16a34a);
  box-shadow: 0 12px 30px rgba(11, 128, 111, 0.35);
}

.next-btn.disabled {
  background: #94a3b8;
  box-shadow: none;
}

.next-btn.next-ready:not(.disabled) {
  border: none;
  transform: translateY(-1px);
}

.hero-stats-row {
  animation: fadeInUp 0.45s ease-out;
}

.hero-stat-card {
  background: rgba(15, 23, 42, 0.04);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-label {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #475467;
}

.stat-value {
  font-size: 1.75rem;
  color: #0b806f;
}

.stat-helper {
  margin-top: 0.35rem;
}

.transition-card {
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(14, 165, 233, 0.2);
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.08), rgba(255, 255, 255, 0.9));
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.1);
}

.transition-line {
  width: 60px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(135deg, #0b806f, #0ea5e9);
}

.lesson-focus-card {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(16, 185, 129, 0.25);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.1) inset;
}

.guided-section-card {
  background: #f8fafc;
  border: 1px solid rgba(14, 165, 233, 0.25);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
}

.guided-bullets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.guided-bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 0.5rem;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(14, 165, 233, 0.12);
}

.guided-step {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.tone-card {
  background: #ffffff;
  border: 1px solid rgba(14, 165, 233, 0.18);
  box-shadow: 0 10px 20px rgba(14, 165, 233, 0.1);
}
.tone-guidelines li {
  font-size: 0.95rem;
  color: #0f172a;
}

.accessibility-tools .btn {
  min-width: 160px;
}

.accessibility-tools .btn.active {
  background: #0ea5e9;
  border-color: #0ea5e9;
  color: white;
  box-shadow: none;
}

.lesson-focus-intro {
  margin-bottom: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  background: rgba(14, 165, 233, 0.08);
  border: 1px solid rgba(14, 165, 233, 0.25);
}

.dept-card {
  background: rgba(248, 250, 252, 0.8);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  min-height: 140px;
}

.dept-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0b806f;
}

.focus-pill-card {
  background: #fff;
  border-radius: 18px;
  border: 1px solid rgba(11, 128, 111, 0.12);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
  min-height: 150px;
}

.focus-pill-label {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.65rem;
}

.custom-modal-backdrop {
  backdrop-filter: blur(8px);
}

.custom-modal-scale {
  animation: modalEntrance 0.4s ease-out;
}

.custom-modal-card {
  border: none;
  overflow: hidden;
}

.custom-modal-card .modal-header {
  gap: 1rem;
}

.custom-modal-card .modal-body {
  background: rgba(255, 255, 255, 0.96);
}

.custom-modal-card .list-group-item {
  border-bottom: 1px dotted rgba(59, 130, 246, 0.25);
}

.custom-modal-card .list-group-item:last-child {
  border-bottom: none;
}

.custom-modal-card .modal-body-top {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.8), rgba(16, 185, 129, 0.8));
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.25);
}

.btn-close-custom {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
}

.modal-list {
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 12px;
  padding: 0.9rem 1.1rem;
  margin-bottom: 0.6rem;
}

.btn-teal {
  background: linear-gradient(135deg, #0b806f, #10b981);
  border: none;
  color: #fff;
  border-radius: 999px;
  box-shadow: 0 15px 30px rgba(15, 23, 42, 0.2);
}
@keyframes modalEntrance {
  from {
    transform: translateY(-25px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
.guidance-card-item {
  background: rgba(11, 128, 111, 0.05);
  border-radius: 20px;
  padding: 1.1rem 1.25rem;
  border: 1px solid rgba(14, 165, 233, 0.15);
  transition: transform 0.3s ease, border 0.3s ease;
}

.guidance-card-item:hover {
  transform: translateY(-3px);
  border-color: rgba(14, 165, 233, 0.35);
}

.guidance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.guidance-step {
  display: inline-flex;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  background: rgba(11, 128, 111, 0.15);
  color: #0b806f;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.guidance-line {
  position: relative;
  margin: 0.25rem 0;
}

.guidance-line span {
  display: block;
  width: 100%;
  height: 2px;
  background: linear-gradient(135deg, rgba(11, 128, 111, 0.6), rgba(14, 165, 233, 0.6));
  border-radius: 999px;
}

.onboarding-card {
  background: rgba(248, 252, 255, 0.9);
  border-radius: 28px;
  padding: 1.5rem;
  border: 1px solid rgba(11, 128, 111, 0.12);
}

.simple-onboarding-list {
  list-style: disc;
  margin: 0;
  padding-left: 1.25rem;
  color: #475467;
}

.simple-onboarding-list li {
  margin-bottom: 0.35rem;
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.onboarding-bullet-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 0.45rem;
  background: linear-gradient(135deg, #0b806f, #0ea5e9);
  box-shadow: 0 0 12px rgba(11, 128, 111, 0.35);
  flex-shrink: 0;
}

.gentle-progress-summary {
  min-width: 110px;
  text-align: right;
}

.gentle-progress-track {
  width: 100%;
  height: 6px;
  background: rgba(15, 23, 42, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.gentle-progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.9), rgba(16, 185, 129, 0.9));
  transition: width 0.4s ease;
}

.onboarding-step-button {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  color: inherit;
}

.onboarding-step-button.completed {
  color: #0b806f;
}

.simple-onboarding-list li.completed strong {
  color: #0b806f;
}

.onboarding-bullet-icon.completed {
  background: #10b981;
  box-shadow: none;
  display: grid;
  place-items: center;
  color: #ffffff;
  font-size: 0.55rem;
}


.paragraph-grid {
  column-count: 2;
  column-gap: 1.5rem;
}

.learning-objectives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.learning-objectives-grid::after {
  content: '';
  position: absolute;
  inset: -1rem;
  border-radius: 25px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.08));
  filter: blur(25px);
  z-index: -1;
}

.objective-column {
  padding: 1rem;
}

.deep-dive {
  background: rgba(236, 253, 245, 0.6);
  border-radius: 16px;
}

@media (max-width: 768px) {
  .paragraph-grid {
    column-count: 1;
  }
}

.paragraph-grid p {
  margin: 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
}

.section-block {
  position: relative;
  overflow: hidden;
  background: rgba(247, 250, 255, 0.7);
  border-radius: 20px;
  padding: 1.6rem;
  border: 1px solid rgba(14, 165, 233, 0.15);
}


.deep-dive {
  background: rgba(236, 253, 245, 0.6);
  border-radius: 16px;
}

.accordion-card .accordion-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lesson-focus-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.header-action {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: #0f172a;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.header-action i {
  color: #059669;
}

.header-action:hover {
  background: rgba(5, 150, 105, 0.08);
  border-color: rgba(5, 150, 105, 0.25);
}

@media (max-width: 600px) {
  .card-header .lesson-focus-actions {
    width: 100%;
    margin-top: 1rem;
    order: 2;
    justify-content: space-between;
  }

  .card-header .lesson-focus-actions .header-action {
    flex: 1;
    justify-content: center;
    border-radius: 14px;
    padding: 0.5rem;
    font-size: 0.85rem;
  }

  .card-header .lesson-focus-actions .header-action span {
    display: none;
  }

  .card-header .lesson-focus-actions .header-action i {
    margin-right: 0;
  }
}

.section-toggle-btn {
  font-size: 0.85rem;
  color: #0b806f;
  font-weight: 600;
  border-radius: 999px;
  transition: color 0.2s ease;
}

.section-toggle-btn:hover {
  color: #0f6c58;
  text-decoration: none;
}

.learning-objectives-card .objective-column {
  transition: transform 0.4s ease;
}

.learning-objectives-card .objective-column:hover {
  transform: translateY(-4px);
}

.accordion-item-card {
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.mission-card {
  position: relative;
  overflow: hidden;
}

.mission-card::after {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 20px;
  border: 1px dashed rgba(16, 185, 129, 0.35);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mission-card:hover::after {
  opacity: 1;
}

.pulse-ring {
  animation: missionPulse 1.6s ease forwards;
}

@keyframes missionPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }

  70% {
    box-shadow: 0 0 0 18px rgba(16, 185, 129, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.content-card.section-card {
  opacity: 0;
  animation: cardLift 0.9s ease forwards;
}

@keyframes softPulse {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }

  100% {
    transform: translateY(0);
  }
}

.content-card.section-card:nth-of-type(odd) {
  animation-delay: 0.05s;
}

.content-card.section-card:nth-of-type(even) {
  animation-delay: 0.15s;
}

@keyframes cardLift {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  50% {
    transform: translateY(-8px) scale(1.01);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.accordion-item-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.1);
  padding: 0.65rem;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.accordion-item-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.accordion-trigger {
  background: transparent;
  border: none;
  font-weight: 600;
  padding: 0;
}

.accordion-trigger.expanded {
  color: #0b806f;
}

.accordion-answer {
  padding: 0.75rem 0.5rem 0;
  color: #1f2937;
  line-height: 1.6;
}

.actions-card {
  border-radius: 20px;
  margin-top: 1.5rem;
  background: linear-gradient(145deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.08));
  box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.2);
}

.next-btn {
  background: linear-gradient(135deg, #0b806f, #22c55e);
  border-radius: 12px;
  border: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.25);
}

.next-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(16, 185, 129, 0.35);
}

.next-btn.disabled,
.next-btn:disabled {
  background: #94a3b8;
  box-shadow: none;
}

@media (max-width: 991px) {
  .section-card {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .learning-objectives-grid::after {
    inset: -0.5rem;
  }

  .premium-card {
    padding: 1.25rem;
  }

  .lesson-hero {
    padding: 1.5rem;
  }

  .lesson-meta {
    position: static;
    margin-top: 1rem;
  }

  .paragraph-grid {
    column-count: 1;
  }
}

@media (max-width: 767px) {
  .navigation-card {
    position: static;
    max-height: none;
    width: 100%;
    border-radius: 20px;
  }

  .mobile-nav-toggle {
    left: auto;
    right: 1rem;
  }

  .card-body {
    padding: 1rem;
  }
}

.faq-stack .faq-item+.faq-item {
  margin-top: 0.75rem;
}

.faq-question {
  background: rgba(15, 23, 42, 0.02);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 14px;
  padding: 0.9rem 1.25rem;
  font-weight: 600;
  color: #0f172a;
  transition: border-color 0.3s ease;
  cursor: pointer;
}

.faq-question:hover {
  border-color: rgba(59, 130, 246, 0.4);
}

.faq-answer {
  background: rgba(59, 130, 246, 0.08);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: inset 0 2px 4px rgba(15, 23, 42, 0.05);
}

.lesson-hero {
  background: linear-gradient(135deg, #111827, #0f172a 65%);
  border-radius: 32px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
  min-height: 180px;
  box-shadow: 0 30px 45px rgba(15, 23, 42, 0.35);
  animation: softPulse 6s ease-in-out 1 both;
}

.lesson-hero-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.45), transparent 55%);
  opacity: 0.4;
  filter: blur(10px);
}

.lesson-hero::after {
  content: '';
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.25), transparent 65%);
  opacity: 0.6;
  filter: blur(60px);
  z-index: 0;
  animation: slowPulse 6s linear 1 both;
}

.section-block::before {
  content: '';
  position: absolute;
  inset: 16px;
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.section-block:hover::before {
  opacity: 1;
}

.section-number {
  transition: none;
}

.learning-objectives-grid .column-list li {
  opacity: 0.85;
  transition: opacity 0.3s ease;
}

.learning-objectives-grid .column-list li:hover {
  opacity: 1;
}

.learning-objectives-grid {
  position: relative;
}

.learning-objectives-grid::after {
  content: '';
  position: absolute;
  inset: -1rem;
  border-radius: 25px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(16, 185, 129, 0.08));
  filter: blur(25px);
  z-index: -1;
}

@keyframes slowPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-80px);
    opacity: 0.4;
  }

  50% {
    transform: translateX(40px);
    opacity: 0.9;
  }

  100% {
    transform: translateX(80px);
    opacity: 0.4;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 0.2;
  }
}

.lesson-hero-content {
  position: relative;
  z-index: 1;
}

.lesson-meta {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  z-index: 1;
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.35rem 0.95rem;
  font-size: 0.85rem;
}

.lesson-hero-stats {
  position: relative;
  z-index: 1;
}

.stat-pill {
  border-radius: 16px;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  min-width: 160px;
}

.stat-pill strong {
  font-size: 1rem;
  color: #0f172a;
}

.card-header {
  padding: 1.5rem 2rem;
}

.section-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #0b806f, #60a5fa);
  color: white;
  border-radius: 10px;
  font-size: 1.125rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.display-6 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.h4 {
  font-size: 1.7rem;
  font-weight: 700;
}

/* .fs-6 {
  font-size: 1.5rem;
} */

.lh-lg {
  line-height: 1.7;
}

.text-dark {
  color: #1f2937 !important;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s ease-in-out 3 both;
}

.btn {
  border-radius: 12px;
  padding: 0.875rem 1.75rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
  font-size: 1rem;
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.btn-primary {
  background: #0b806f;
  border-color: #0b806f;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.btn-primary:hover {
  background: #2563eb;
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35);
}

.step-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  background: #0b806f;
  color: white;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-top: 2px;
  flex-shrink: 0;
}

.tracking-wide {
  letter-spacing: 0.05em;
}

.flex-grow-1 {
  flex-grow: 1;
}

.section-content :deep(p) {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #374151;
}

.section-content :deep(strong) {
  color: #1f2937;
  font-weight: 700;
}

.section-content :deep(ul) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.section-content :deep(li) {
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  line-height: 1.6;
}

.section-content :deep(code) {
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: #dc2626;
}

.paragraph-grid p {
  margin-bottom: 1rem;
}

.common-question-card,
.insights-card,
.faq-card,
.glossary-card,
.dos-card,
.video-card,
.scenario-card,
.resource-card,
.quiz-block {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: popIn 0.6s ease;
}

.common-question-card .faq-block,
.faq-card .faq-block {
  margin-bottom: 1rem;
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.insight-pill {
  padding: 0.8rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.glossary-line {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.glossary-line:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.dos-list {
  padding-left: 1rem;
}

.video-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.scenario-text {
  margin: 0;
  line-height: 1.6;
  color: #d6e4ff;
}

.resource-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding-bottom: 0.4rem;
}

.resource-line:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.resource-type {
  text-transform: uppercase;
  font-size: 0.7rem;
  color: #34d399;
}

.quiz-question {
  font-weight: 600;
}

.quiz-options li {
  padding: 0.7rem;
  border-radius: 12px;
  margin-bottom: 0.4rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==================== RESPONSIVE FIXES ==================== */
@media (max-width: 991.98px) {
  .revert-content {
    padding: 1rem !important;
  }

  .navigation-card {
    position: fixed;
    top: 0;
    left: -100%;
    width: 320px;
    height: 100vh;
    z-index: 999;
    border-radius: 0;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }

  .navigation-card.mobile-open,
  .mobile-nav-open .navigation-card {
    left: 0;
  }

  .content-card.section-card {
    background: linear-gradient(180deg, rgba(16, 185, 129, 0.04), rgba(255, 255, 255, 0.9));
    box-shadow: 0 18px 35px rgba(15, 76, 117, 0.1);
  }

  .display-6 {
    font-size: 2rem;
  }

  .card-body {
    padding: 0.5rem;
  }

  .card-header {
    padding: 1.25rem 1.5rem;
  }

  .btn-lg {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 767.98px) {
  .display-6 {
    font-size: 1.75rem;
  }

  .h4 {
    font-size: 1.25rem;
  }

  .card-body {
    padding: 1rem;
  }

  .section-number {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .lesson-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .premium-card {
    padding: 0.85rem;
  }

  .resource-link {
    width: 100%;
    font-weight: 600;
    padding: 0.75rem 0.85rem;
  }

  .resource-link span {
    flex: 1;
    text-align: center;
  }

}

.lesson-help-button {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(2, 132, 199, 0.4);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  z-index: 3;
}

.lesson-help-button:hover,
.lesson-help-button:focus-visible {
  transform: translateY(-1px);
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.35);
}

.guide-step-card {
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  background: rgba(248, 250, 252, 0.9);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 12px 25px rgba(15, 23, 42, 0.08);
}

.guide-step-card:last-child {
  margin-bottom: 0;
}

.guide-step-index {
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(15, 23, 42, 0.5);
  margin-bottom: 0.35rem;
  display: block;
}

@media (max-width: 767.98px) {
  .lesson-help-button {
    top: 1rem;
    right: 1rem;
    width: 44px;
    height: 44px;
  }
}
</style>
