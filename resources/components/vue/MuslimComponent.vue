<template>
  <div class="revert-shell position-relative" v-cloak>

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
              </div>
              <!-- <div class="lesson-meta d-flex gap-3">
                <span class="badge badge-pill bg-light text-dark fw-semibold">
                  Objectives: {{ currentLesson?.learningObjectives?.length ?? 0 }}
                </span>
              </div> -->
            </div>
          </div>

          <!-- Hero Stats -->
          <!-- <div class="row g-3 mb-4 hero-stats-row">
            <div v-for="stat in lessonHeroStats" :key="stat.label" class="col-12 col-sm-4">
              <article class="hero-stat-card d-flex flex-column">
                <span class="stat-label">{{ stat.label }}</span>
                <strong class="stat-value">{{ stat.value }}</strong>
                <span class="stat-helper text-muted small">Premium insights</span>
              </article>
            </div>
          </div> -->

          <!-- Guidance Row -->
          <!-- <div v-if="guidanceCards.length"
            class="content-card section-card guidance-card animated-fade-slide mb-4 rounded-4">
            <div class="card-header d-flex align-items-center py-3">
              <i class="bi bi-compass-fill fs-4 me-3 text-teal"></i>
              <div>
                <h2 class="fw-bold mb-0 fs-5">Learning Guidance</h2>
              </div>
            </div>
            <div class="card-body px-3 px-md-4">
              <div class="guidance-grid">
                <article v-for="(card, index) in guidanceCards" :key="card.title" class="guidance-card-item">
                  <div class="guidance-card-top">
                    <div class="d-flex align-items-center gap-2">
                      <span class="guidance-step">{{ card.step }}</span>
                      <p class="mb-0 text-muted small">{{ index === 0 ? 'Start here' : index === 1 ? 'Deepen & personalize' : 'Finish strong' }}</p>
                    </div>
                    <h3 class="mt-2 fw-semibold">{{ card.title }}</h3>
                    <p class="mt-3 text-muted small">{{ card.description }}</p>
                  </div>
                  <div class="guidance-line">
                    <span></span>
                  </div>
                  <div class="d-flex align-items-center gap-2 text-dark small fw-medium">
                    <i class="bi bi-arrow-right-circle-fill text-teal fs-5"></i>
                    <span>{{ card.action }}</span>
                  </div>
                </article>
              </div>
            </div>
          </div> -->

          <div v-if="guidedPathwayCards.length" class="content-card guided-section-card mb-4 rounded-4">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 p-3">
              <div>
                <p class="text-teal small mb-1 fw-semibold">Guided Pathway</p>
                <h3 class="mb-1 fw-semibold">Follow the curated steps below</h3>
                <p class="text-muted small mb-0">Start with absorb, move through reflection, and end with mastery to keep momentum.</p>
              </div>
              <!-- <div class="d-flex gap-2 flex-wrap">
                <button type="button" class="btn btn-outline-teal btn-sm fw-semibold" @click="scrollToSection(0)">
                  Jump to Step 1
                </button>
                <button type="button" class="btn btn-teal btn-sm fw-semibold" @click="scrollToSection(2)">
                  Highlight Reinforcement
                </button>
              </div> -->
            </div>
              <div class="guided-bullets px-3 pb-3">
                <div v-for="(card, index) in guidedPathwayCards" :key="card.step" class="guided-bullet">
                <!-- <span class="guided-step">{{ card.step }}</span> -->
                <div>
                  <p class="mb-0 fw-semibold">{{ card.title }}</p>
                  <small class="text-muted">{{ card.action }}</small>
                </div>
              </div>
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
              <p class="mb-1 text-muted small text-uppercase">Gentle start</p>
              <h3 class="fw-semibold mb-2">Simple welcome for new friends</h3>
              <p class="text-muted small mb-3">
                Take it slow these three ideas hold the key to remembering today’s lesson.
              </p>
              <ul class="simple-onboarding-list mb-0">
                <li v-for="step in currentGentleStartSteps" :key="step.title">
                  <span class="onboarding-bullet-icon"></span>
                  <div>
                    <strong class="d-block">{{ step.title }}</strong>
                    <span>{{ step.description }}</span>
                  </div>
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

          <!-- <div v-if="focusHighlights.length" class="row focus-highlight-row mb-4 g-3">
            <div v-for="highlight in focusHighlights" :key="highlight.label" class="col-12 col-md-4">
              <article class="focus-pill-card p-3 rounded-4 shadow-sm h-100">
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span class="focus-pill-label text-muted small">{{ highlight.label }}</span>
                  <i class="bi bi-star text-teal"></i>
                </div>
                <h5 class="fw-bold mb-1">{{ highlight.value }}</h5>
                <p class="mb-0 text-muted small">{{ highlight.detail }}</p>
              </article>
            </div>
          </div> -->

          <!-- Learning objectives -->
          <!-- <div v-if="learningObjectiveColumns.length"
            class="content-card section-card animated-fade-slide mb-4 rounded-4">
            <div class="card-header d-flex align-items-center py-3">              
              <i class="bi bi-database-fill-check fs-4 me-3 text-teal"></i>
              <h2 class="fw-bold mb-0 fs-5">Learning Objectives</h2>
            </div>

            <div class="card-body card-teal px-3 px-md-4">
              <div class="learning-objectives-grid">
                <div v-for="(column, columnIndex) in learningObjectiveColumns" :key="columnIndex"
                  class="objective-column">
                  <ul class="list-group insight-list fs-6 lh-base column-list m-0">
                    <li v-for="objective in column" :key="objective"
                      class="list-group-item border-0 px-0 py-3 d-flex align-items-start gap-3">
                      <i class="fas fa-check-circle fs-5 mt-1 text-teal"></i>
                      <span>{{ objective }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> -->

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
                <div v-if="currentLessonOverview" class="lesson-overview-summary mb-4">
                  <p class="text-muted small mb-3">{{ currentLessonOverview.summary }}</p>
                  <div v-if="currentLessonOverview.highlights?.length" class="row g-3">
                    <div v-for="highlight in currentLessonOverview.highlights" :key="highlight.label || highlight.heading" class="col-12 col-md-4">
                      <article class="overview-highlight border rounded-3 p-3 h-100">
                        <h6 class="fw-semibold mb-2">{{ highlight.label || highlight.heading }}</h6>
                        <p class="mb-0 text-muted small">{{ highlight.description || highlight.content }}</p>
                      </article>
                    </div>
                  </div>
                </div>
                <div v-if="overviewSections?.length" class="overview-section-list">
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
                    <div v-if="sectionStatsFor(section.heading)?.length" class="section-stats d-flex flex-wrap gap-3 mt-3">
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
                    :id="`section-${selectedPill}-${index}`"
                    class="section-block mb-5">
                    <div class="d-flex align-items-start gap-3 mb-3">
                      <div class="section-number fs-5">{{ index + 1 }}</div>
                      <h5 class="fw-semibold mb-0 fs-5">{{ section.title }}</h5>
                    </div>
                    <div class="section-content text-dark fs-6 lh-lg"
                      :style="{ fontSize: `${overviewFontScale}rem` }" v-html="section.content"></div>
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
                    <div v-if="section.deepDive" class="background mt-4 w-100 py-3 px-4 rounded-4 border">
                      <div class="deep-dive-header d-flex align-items-center mb-2">
                        <i class="bi bi-lightbulb-fill me-2 fs-4 text-teal"></i>
                        <h6 class="fw-bold mb-0 text-dark fs-6">{{ section.deepDive.title }}</h6>
                      </div>
                      <div class="deep-dive-content text-dark fs-6"
                        :style="{ fontSize: `${overviewFontScale * 0.95}rem` }" v-html="section.deepDive.content"></div>
                    </div>
                    <div v-if="sectionStatsFor(section.title)?.length" class="section-stats d-flex flex-wrap gap-3 mt-3">
                      <div v-for="stat in sectionStatsFor(section.title)" :key="stat.label" class="section-stat-card">
                        <strong>{{ stat.value }}</strong>
                        <small class="text-muted">{{ stat.label }}</small>
                      </div>
                    </div>
                    <div class="pt-3 mt-3"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Revert Stories -->
            <div v-if="revertStories.length" class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-collection-play fs-4 me-3 text-teal"></i>
                <div>
                  <h2 class="fw-bold mb-0 fs-5">Revert stories</h2>
                  <p class="text-muted mb-0 small">Eight personal clips from men and women keeping it straight to the point.</p>
                </div>
              </div>
              <div class="card-body px-3 px-md-4">
                <div class="row g-3">
                  <div v-for="video in revertStoriesPreview" :key="video.title" class="col-12 col-md-3">
                    <article class="video-card h-100 d-flex flex-column rounded-3 border shadow-sm overflow-hidden">
                      <div class="ratio ratio-16x9">
                        <iframe
                          :src="formatVideoUrl(video.url)"
                          :title="video.title"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          loading="lazy">
                        </iframe>
                      </div>
                      <div class="p-3">
                        <h3 class="h6 fw-semibold mb-2">{{ video.title }}</h3>
                        <p v-if="video.description" class="text-muted small mb-0">{{ video.description }}</p>
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

            <!-- Chapter Videos -->
            <!-- <div v-if="lessonVideos.length" class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-collection-play fs-4 me-3 text-teal"></i>
                <div>
                  <h2 class="fw-bold mb-0 fs-5">Lesson Videos</h2>
                  <p class="text-muted mb-0 small">Four curated clips to reinforce the chapter.</p>
                </div>
              </div>
              <div class="card-body px-3 px-md-4">
                <div class="row g-3">
                  <div v-for="video in lessonVideos" :key="video.title" class="col-12 col-md-3">
                    <article class="video-card h-100 d-flex flex-column rounded-3 border shadow-sm overflow-hidden">
                      <div class="ratio ratio-16x9">
                        <iframe
                          :src="formatVideoUrl(video.url)"
                          :title="video.title"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          loading="lazy">
                        </iframe>
                      </div>
                      <div class="p-3">
                        <h3 class="h6 fw-semibold mb-2">{{ video.title }}</h3>
                        <p v-if="video.description" class="text-muted small mb-0">{{ video.description }}</p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div> -->

            <!-- Share with a friend -->
            <div class="content-card section-card animated-fade-slide mb-4 rounded-4 border-teal">
              <div class="card-body px-3 px-md-4 py-4">
                <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
                  <div class="flex-grow-1">
                    <h3 class="fw-bold mb-1">Share with a friend or family member</h3>
                    <p class="text-muted mb-0 small">
                      Share this lesson’s insights, dua reminders, and revert-story clips so a friend can walk through the same content.
                    </p>
                    <p v-if="shareFriendStatus" class="text-success small mt-2 mb-0">
                      {{ shareFriendStatus }}
                    </p>
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

            <div class="content-card motivation-card section-card mb-4 rounded-4 animated-fade-slide">
              <div class="card-body px-3 px-md-4 py-4">
                <div class="d-flex flex-column gap-2">
                  <p class="mb-0 fw-semibold">Motivational spark</p>
                  <p class="text-muted small mb-0">{{ motivationalMessage }}</p>
                  <small class="text-teal fs-6">{{ motivationalHint }}</small>
                </div>
              </div>
            </div>

            <!-- Lesson Departments Focus -->
            <!-- <div v-if="lessonDepartments.length" class="content-card lesson-focus-card animated-fade-slide mb-4 rounded-4">
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
            </div> -->

            <!-- Dos and Dont's -->
            <div v-if="currentDosDonts" class="content-card section-card animated-fade-slide mb-4 rounded-4">
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

              <!-- Key Insights -->
              <div v-if="insightsToShow.length" class="content-card section-card animated-fade-slide mb-4 rounded-4">
                <div class="card-header d-flex align-items-center py-3">
                  <i class="fas fa-chart-line fs-4 me-3 text-teal"></i>
                  <h2 class="fw-bold mb-0 fs-5">Key Insights</h2>
                </div>
                <div class="card-body p-3">
                  <p class="text-muted small mb-3">
                    {{ currentChapterKeyInsights?.chapter || currentLesson?.title || 'Chapter' }}
                  </p>
                  <ul class="list-group insight-list fs-6 lh-base">
                    <li v-for="insight in insightsToShow" :key="insight"
                      class="list-group-item border-0 px-0 py-3 d-flex align-items-center gap-3">
                      <i class="fas fa-check-circle fs-5 text-teal"></i>
                        <span>{{ insight }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

            <!-- Duas -->
            <div v-if="currentDuas.length" class="content-card section-card animated-fade-slide mb-4 rounded-4">
              <div class="card-header d-flex align-items-center py-3 gap-3">
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
                        class="fw-semibold lh-base mb-2 fs-5 text-teal border-bottom border-teal pb-2 text-end"
                        :style="{ fontSize: `${duaFontScale * 1.05}rem` }">
                        {{ dua.arabic }}
                      </p>
                      <p class="mb-0 text-dark" :style="{ fontSize: `${duaFontScale}rem` }">{{ dua.english }}</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>


            <!-- Common asked questions -->
            <div v-if="chapterCommonPanels.length"
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
                  <div v-for="(panel, index) in chapterCommonPanels" :key="panel.id" class="accordion-item-card">
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
              </div>
            </div>

            <!-- resources -->
            <!-- <div v-if="premiumResources.length"
              class="content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card">
              <div class="card-header d-flex align-items-center justify-content-between py-3 gap-3">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                  <i class="bi bi-info-circle-fill fs-4 text-teal"></i>
                  <h1 class="fw-bold mb-0 fs-5">Resources</h1>
                </div>
                <button type="button"
                  class="section-toggle-btn btn btn-link px-0 py-0 d-flex align-items-center gap-1"
                  @click="toggleSection('resources')"
                  :aria-expanded="!collapsedSections.resources">
                  <span class="d-none d-sm-inline">{{ collapsedSections.resources ? 'Show' : 'Hide' }}</span>
                  <i class="bi" :class="collapsedSections.resources ? 'bi-chevron-down' : 'bi-chevron-up'"></i>
                </button>
              </div>

              <div v-show="!collapsedSections.resources" class="card-body p-3 ">
                <div v-if="premiumResources.length" class="row row-cols-1 row-cols-md-2 g-3 mb-4">
                  <div class="col" v-for="card in premiumResources" :key="card.title">
                    <article class="premium-card h-100 d-flex flex-column">
                      <div>
                        <h3 class="h6 fw-semibold mb-2">{{ card.title }}</h3>
                        <p class="small text-muted mb-3">{{ card.desc }}</p>
                      </div>
                      <button type="button"
                        class="mt-auto resource-link d-flex align-items-center justify-content-center gap-2"
                        @click="openResource(card)">
                        <span>Explore the resource</span>
                        <i class="bi bi-arrow-up-right"></i>
                      </button>
                    </article>
                  </div>
                </div>
              </div>
            </div> -->

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
                  <span class="badge bg-success text-white rounded-pill">{{ currentMission.focus }}</span>
                  <button class="btn btn-outline-success btn-sm fw-semibold" @click="focusMission">
                    View Mission ↓
                  </button>
                </div>
              </div>
            </div>

            <!-- FAQ -->
            <div v-if="chapterFaqPanels.length" class="content-card section-card animated-fade-slide mb-4 rounded-4 accordion-card">
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
                  <div v-for="(panel, index) in chapterFaqPanels" :key="panel.id" class="accordion-item-card">
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
              </div>
            </div>

            <!-- Next Steps -->
            <div class="content-card next-steps-card animated-slide-up rounded-4 mb-4" style="animation-delay: 0.4s">
              <div class="card-header d-flex align-items-center py-3">
                <i class="bi bi-clipboard-check-fill fs-4 me-3 text-teal"></i>
                <h1 class="fw-bold mb-0 fs-5">Next Steps & Homework</h1>
              </div>

              <div class="card-body p-3">
                <div class="row g-3">
                  <div class="col-12 col-md-12">
                    <div class="homework-grid">
                      <div v-for="(task, index) in currentHomework" :key="task" class="homework-task p-3 mb-2">
                        <div class="d-flex align-items-center gap-2 mb-1">
                          <p class="mb-0 text-dark">{{ task }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quiz Card -->
            <div v-if="currentQuestion" class="content-card section-card animated-fade-slide mb-4 rounded-4 quiz-wrapper">
              <div class="quiz-shell p-0">
                <div class="quiz-header px-4 py-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-dice-4-fill fs-4 text-teal"></i>
                    <div>
                      <h2 class="fw-bold mb-0 fs-5">Chapter Quiz</h2>
                    </div>
                  </div>
                  <!-- <span class="badge text-dark bg-light rounded-pill px-3 py-2">
                    Question {{ currentQuestionIndex + 1 }} / {{ quizQuestions.length }}
                  </span> -->
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
                  <h3 class="fw-semibold text-dark mb-4 quiz-question">{{ currentQuestion.question }}</h3>
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
                          class="bi bi-check-circle-fill text-white"></i>
                        <i v-else-if="quizStatus === 'incorrect' && option === selectedOption"
                          class="bi bi-x-circle-fill text-white"></i>
                      </div>
                    </button>
                  </div>
                  <div v-if="quizStatus === 'incorrect' && quizHintExplanation" class="quiz-hint mt-3 px-3 py-2 rounded-3 border bg-white">
                    <p class="mb-1"><strong>Right answer:</strong> {{ currentQuestion.answer }}</p>
                    <p class="mb-1 text-muted">{{ quizHintExplanation }}</p>
                    <button
                      v-if="quizHintSectionId"
                      type="button"
                      class="btn btn-sm btn-link p-0"
                      @click="scrollToSection(quizHintSectionId)"
                    >
                      Jump to the related lesson section
                    </button>
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
                    <div v-if="quizStatus === 'incorrect' && lastIncorrectExplanation && lastIncorrectExplanation.text" class="quiz-hint mt-3 px-3 py-2 rounded-3 border bg-white">
                      <p class="mb-1"><strong>Right answer:</strong> {{ currentQuestion.answer }}</p>
                      <p class="mb-1 text-muted">{{ lastIncorrectExplanation.text }}</p>
                      <button
                        v-if="lastIncorrectExplanation && lastIncorrectExplanation.sectionId"
                        type="button"
                        class="btn btn-sm btn-link p-0"
                        @click="scrollToSection(lastIncorrectExplanation.sectionId)"
                      >
                        Jump to the related lesson section
                      </button>
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
                        <div class="row g-3">
                          <div v-for="video in revertStories" :key="video.title" class="col-12 col-md-6">
                            <article class="video-card h-100 d-flex flex-column rounded-3 border shadow-sm overflow-hidden">
                              <div class="ratio ratio-16x9">
                                <iframe
                                  :src="formatVideoUrl(video.url)"
                                  :title="video.title"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"                          allowfullscreen
                                  loading="lazy">
                                </iframe>
                              </div>
                              <div class="p-3">
                                <h3 class="h6 fw-semibold mb-2">{{ video.title }}</h3>
                                <p v-if="video.description" class="text-muted small mb-0">{{ video.description }}</p>
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
    </div>
</template>


<script>
import { defineComponent } from 'vue'
import roadmapData from './non_muslim_data/roadmap.json'
import quizzesData from './non_muslim_data/quizzes.json'
import faqChapters from './non_muslim_data/faqs.json'
import commonQuestionsData from './non_muslim_data/commonQuestions.json'
import premiumResources from './non_muslim_data/premiumResources.json'
import duasData from './non_muslim_data/duas.json'
import homeworkData from './non_muslim_data/homework.json'
import missionsData from './non_muslim_data/missions.json'
import onboardingData from './non_muslim_data/onboarding.json'
import chapterDosDonts from './non_muslim_data/chapterDosDonts.json'
import chapterKeyInsights from './non_muslim_data/keyInsights.json'
import chapterGuidance from './non_muslim_data/chapterGuidance.json'
import chapterToneGuidelines from './non_muslim_data/chapterToneGuidelines.json'
import chapterToneFocus from './non_muslim_data/chapterToneFocus.json'
import chapterGuidedPathway from './non_muslim_data/chapterGuidedPathway.json'
import chapterGentleStart from './non_muslim_data/chapterGentleStart.json'
import chapterSectionStats from './non_muslim_data/chapterSectionStats.json'
import chapterLessonOverview from './non_muslim_data/chapterLessonOverview.json'
import chapterVideos from './non_muslim_data/chapterVideos.json'

const normalizeJson = (value) => {
  if (value && Array.isArray(value)) return value
  if (value && value.default && Array.isArray(value.default)) return value.default
  return []
}

// FULL-SCREEN EPIC CONFETTI
const fullScreenConfetti = () => {
  // Left shower
  window.confetti({
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
    disableForReducedMotion: true
  })

  // Right shower
  window.confetti({
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
    disableForReducedMotion: true
  })

  // Big center explosion
  window.confetti({
    particleCount: 150,
    spread: 120,
    origin: { x: 0.5, y: 0.5 },
    startVelocity: 60,
    scalar: 1.4,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5', '#ffffff'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: true
  })
}

const FINAL_CHAPTER_ID = roadmapData.length

const celebrateFinalChapter = () => {
  if (!window.confetti) return
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
    window.confetti({
      ...config,
      origin: { x: Math.random(), y: Math.random() * 0.6 },
      shapes: ['square', 'circle'],
      zIndex: 10000,
      disableForReducedMotion: true
    })
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
      homework: normalizeJson(homeworkData),
      chapterVideos: normalizeJson(chapterVideos),
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
      onboarding: normalizeJson(onboardingData),
      resourceCopyStatus: '',
      collapsedSections: {
        commonQuestions: false,
        resources: false,
        faqs: false
      },
      confettiPromise: null,
      lessonShareStatus: '',
      duaShareStatus: '',
      shareFriendStatus: '',
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
      lastIncorrectExplanation: null
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
    }
    ,
    guidanceCards() {
      const chapterId = this.currentLesson?.chapterId
      const template = this.guidanceTemplates.find(entry => entry.chapterId === chapterId)
      if (template && template.cards?.length) return template.cards

      const lesson = this.currentLesson
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
      if (!this.currentDuas.length) {
        cards[1].description = 'Use the glossary, resources, and mission to keep the lesson alive'
        cards[1].action = 'Pin a phrase that resonated most'
      }
      return cards
    }
    ,
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
    sectionStatsMap() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.sectionStatsByChapter.find(item => item.chapterId === chapterId)
      return entry?.sectionStats || []
    },
    motivationalMessage() {
      return this.chapterQuizPassed
        ? `You crushed Chapter ${this.selectedPill}! Keep that momentum as you carry the message forward.`
        : `Chapter ${this.selectedPill} is unfolding pause, reflect, and savor each insight.`
    },
    motivationalHint() {
      return this.chapterQuizPassed
        ? 'Share a short note with a friend so the joy keeps multiplying.'
        : 'One more dua, one more reflection; small commitments are seeds of devotion.'
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
      const sections = this.currentLesson?.sections || []
      if (!sections.length) return []
      const icons = ['bi-gem', 'bi-heart', 'bi-lightbulb', 'bi-book', 'bi-graph-up']
      return sections.slice(0, 3).map((section, index) => ({
        name: section.title.split(' ').slice(0, 2).join(' '),
        summary: section.title,
        detail: section.deepDive?.title || 'Integrated across insights, duas, and missions.',
        icon: icons[index % icons.length]
      }))
    }

    ,
    currentDosDonts() {
      const chapterId = this.currentLesson?.chapterId
      return this.dosDontsChapters.find(entry => entry.chapterId === chapterId) || null
    }

    ,
    lessonVideos() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.chapterVideos.find(record => record.chapterId === chapterId)
      return (entry?.videos || []).slice(0, 4)
    }

    ,
    revertStories() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.chapterVideos.find(record => record.chapterId === chapterId)
      return entry?.videos || []
    }

    ,
    revertStoriesPreview() {
      return this.revertStories.slice(0, 4)
    }
    ,
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
    }
  },

  created() {
    this.buildLookupMaps()
  },

  mounted() {
    const saved = localStorage.getItem('maxStepReached')
    if (saved) {
      const value = parseInt(saved, 10)
      this.maxStepReached = value
      this.selectedPill = value
    }
    this.resetQuizSet()
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, behavior: 'auto' })

    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0)
    })
  },

  methods: {
    ensureConfettiScript() {
      if (this.confettiPromise) return this.confettiPromise
      if (typeof window === 'undefined') {
        this.confettiPromise = Promise.resolve()
        return this.confettiPromise
      }
      if (window.confetti) {
        this.confettiPromise = Promise.resolve()
        return this.confettiPromise
      }
      this.confettiPromise = new Promise(resolve => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
        script.onload = () => {
          console.log('Confetti loaded & ready!')
          resolve()
        }
        script.onerror = () => resolve()
        document.head.appendChild(script)
      })
      return this.confettiPromise
    },

    triggerConfetti(isFinalChapter) {
      this.scrollToTop()
      this.ensureConfettiScript().then(() => {
        if (!window.confetti) return
        if (isFinalChapter) {
          celebrateFinalChapter()
          setTimeout(celebrateFinalChapter, 600)
        } else {
          fullScreenConfetti()
          setTimeout(fullScreenConfetti, 400)
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

    formatVideoUrl(url) {
      if (!url) return ''
      if (url.includes('watch?v=')) {
        return url.replace('watch?v=', 'embed/')
      }
      if (url.includes('youtu.be/')) {
        return url.replace('youtu.be/', 'www.youtube.com/embed/')
      }
      return url
    },

    completeAndNext() {
      const nextId = this.selectedPill + 1
      const isFinalChapter = this.selectedPill === FINAL_CHAPTER_ID

      if (nextId > this.maxStepReached) {
        this.maxStepReached = nextId
        localStorage.setItem('maxStepReached', nextId.toString())

        const chapter = this.roadmapData.find(c => c.id === this.selectedPill)
        this.successMessage = isFinalChapter
          ? `You’ve completed the final chapter, “${chapter?.title || 'Chapter'}”! Keep practicing these lessons and share the kindness.`
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
    openResource(resource) {
      this.activeResource = resource
      this.showResourceModal = true
    },
    closeResourceModal() {
      this.showResourceModal = false
      this.activeResource = null
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
      this.lastIncorrectExplanation = null
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
                border-bottom: 1px solid rgba(38, 41, 46, 0.12);
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
    copyShareLink() {
      const link = this.getShareLink()
      if (!link) return
      this.copyTextToClipboard(link)
        .then(() => {
          this.shareFriendStatus = 'Link copied! Send it so a friend can explore further.'
          this.triggerCopyAlert('Lesson link copied!', 'success')
          setTimeout(() => { this.shareFriendStatus = '' }, 3000)
        })
        .catch(() => {
          this.shareFriendStatus = 'Unable to copy; please use your browser directly.'
          setTimeout(() => { this.shareFriendStatus = '' }, 4000)
        })
    },
    closeVideoModal() {
      this.showVideoModal = false
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
/* ==================== BOOTSTRAP ICONS ==================== */

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

.background {

  gap: 6px;
  padding: 6px 10px;
  font-size: 0.9rem;
  color: #114b5f;
  background: #eaf3f1;
  border: 1px solid rgba(11, 128, 111, 0.25);
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
  box-shadow: 0 4px 15px rgba(38, 41, 46, 0.15);
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
  box-shadow: 0 12px 30px rgba(38, 41, 46, 0.25);
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
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08),
    0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08);
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
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.page-sheen {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10% 20%, rgba(74, 144, 226, 0.08) 0%, transparent 40%),
    radial-gradient(circle at 90% 80%, rgba(116, 184, 255, 0.05) 0%, transparent 40%);
  z-index: 0;
}

.background-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.02) 1px, transparent 0);
  background-size: 24px 24px;
  z-index: 0;
}

.revert-content {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 2rem);
}

.revert-content .row.g-4 {
  min-height: calc(100vh - 2rem);
}

.revert-content section {
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  padding-right: 0.5rem;
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
  box-shadow: 0 18px 35px rgba(38, 41, 46, 0.18);
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
.motivation-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(239, 246, 255, 0.9));
  border: 1px solid rgba(16, 185, 129, 0.35);
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
  box-shadow: 0 10px 20px rgba(38, 41, 46, 0.08);
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
  box-shadow: 0 22px 42px rgba(38, 41, 46, 0.4), inset 0 0 30px rgba(59, 130, 246, 0.35);
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
  animation: shimmer 3.5s ease-in-out infinite;
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
  animation: pulse 4s ease-in-out infinite;
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
  filter: drop-shadow(0 2px 6px rgba(38, 41, 46, 0.4));
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
  box-shadow: 0 18px 35px rgba(38, 41, 46, 0.15);
}

.content-card .card-header {
  position: relative;
  overflow: hidden;
}



.content-card:hover .card-header::after {
  opacity: 1;
}

.content-card .card-body {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid rgba(16, 185, 129, 0.12);
}

.dua-card {
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(16, 185, 129, 0.15);
  box-shadow: 0 20px 30px rgba(38, 41, 46, 0.12);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.dua-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 45px rgba(38, 41, 46, 0.25);
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

.homework-task {
  background: rgba(239, 246, 255, 0.8);
  border-radius: 18px;
  border: 1px solid rgba(11, 128, 111, 0.2);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease, border 0.3s ease;
}

.homework-task:hover {
  transform: translateY(-3px);
  border-color: rgba(11, 128, 111, 0.4);
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
  box-shadow: 0 10px 25px rgba(38, 41, 46, 0.12);
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
  .guided-section-card,
  .homework-task {
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
  box-shadow: 0 12px 30px rgba(38, 41, 46, 0.08);
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
  box-shadow: 0 12px 30px rgba(38, 41, 46, 0.08);
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
  box-shadow: 0 12px 30px rgba(38, 41, 46, 0.08);
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
  background: rgba(38, 41, 46, 0.08);
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
  border-bottom: 1px solid rgba(38, 41, 46, 0.04);
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
  background: rgba(38, 41, 46, 0.04);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  border: 1px solid rgba(38, 41, 46, 0.1);
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
  box-shadow: 0 18px 35px rgba(38, 41, 46, 0.1);
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
  box-shadow: 0 14px 30px rgba(38, 41, 46, 0.1) inset;
}

.guided-section-card {
  background: #f8fafc;
  border: 1px solid rgba(14, 165, 233, 0.25);
  box-shadow: 0 12px 30px rgba(38, 41, 46, 0.1);
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
  box-shadow: 0 12px 30px rgba(38, 41, 46, 0.08);
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
  box-shadow: 0 15px 35px rgba(38, 41, 46, 0.25);
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
  border: 1px solid rgba(38, 41, 46, 0.06);
  border-radius: 12px;
  padding: 0.9rem 1.1rem;
  margin-bottom: 0.6rem;
}

.btn-teal {
  background: linear-gradient(135deg, #0b806f, #10b981);
  border: none;
  color: #fff;
  border-radius: 999px;
  box-shadow: 0 15px 30px rgba(38, 41, 46, 0.2);
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
  border: 1px solid rgba(38, 41, 46, 0.1);
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
  background: rgba(38, 41, 46, 0.02);
  border: 1px solid rgba(38, 41, 46, 0.08);
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
  box-shadow: inset 0 2px 4px rgba(38, 41, 46, 0.05);
}

.lesson-hero {
  background: linear-gradient(135deg, #111827, #0f172a 65%);
  border-radius: 32px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
  min-height: 180px;
  box-shadow: 0 30px 45px rgba(38, 41, 46, 0.35);
  animation: softPulse 12s ease-in-out infinite;
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
  animation: slowPulse 6s linear infinite;
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
  animation: pulse 2s infinite;
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
</style>
