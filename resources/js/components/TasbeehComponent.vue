<template>
  <div class="tasbih-app min-vh-100" :style="{ backgroundColor: currentTheme.background }" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <!-- Alert for Notifications -->
    <div v-if="alertMessage" class="alert alert-dismissible fade show position-fixed top-0 end-0 m-3 alert-success" 
         role="alert" style="z-index: 2000;">
      {{ alertMessage }}
      <button type="button" class="btn-close" @click="alertMessage = ''" aria-label="Close"></button>
    </div>

    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg shadow-sm sticky-top" :style="{ backgroundColor: 'var(--primary-color)' }">
      <div class="container">
        <a class="navbar-brand text-white fw-bold fs-4">
          <i class="bi bi-person-arms-up me-2"></i>Tasbih Counter
        </a>
        <div class="d-flex align-items-center">
          <div class="text-white me-3 d-none d-md-block fs-5">{{ formatTime(currentTime) }}</div>
          <button class="btn btn-outline-light rounded-3 btn-sm me-2" @click="showSettings = !showSettings" 
                  title="Settings" aria-label="Toggle Settings">
            <i class="bi bi-gear"></i>
          </button>
          <div class="dropdown">
            <button class="btn btn-outline-light rounded-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" 
                    title="Language" aria-label="Select Language">
              {{ currentLanguage.name }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li v-for="lang in languages" :key="lang.code">
                <a class="dropdown-item text-center" @click="changeLanguage(lang.code)" href="#">{{ lang.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div class="container py-3">
      <!-- Settings Panel -->
      <section v-if="showSettings" class="mb-3">
        <div class="card shadow-sm border-0 rounded-3 primary-card">
          <div class="card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center">
            <h5 class="mb-0 fw-semibold text-dark"><i class="bi bi-gear-fill me-2" style="color: var(--primary-color);"></i>{{ t('settings') }}</h5>
            <span class="collapse-icon d-none" aria-hidden="true"></span>
          </div>
          <div class="card-body p-3">
            <div class="row g-2">
              <div class="col-md-4">
                <label class="form-label fw-medium">{{ t('theme') }}</label>
                <select class="form-select rounded-3" v-model="selectedTheme" @change="applyTheme" aria-label="Select Theme">
                  <option v-for="theme in themes" :key="theme.name" :value="theme.name">
                    {{ theme.name }}
                  </option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">{{ t('soundEnabled') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="soundEnabled" id="soundSwitch" aria-label="Toggle Sound">
                  <label class="form-check-label" for="soundSwitch">{{ t('soundEnabled') }}</label>
                </div>
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">{{ t('hapticEnabled') }}</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="hapticEnabled" id="hapticSwitch" aria-label="Toggle Haptic Feedback">
                  <label class="form-check-label" for="hapticSwitch">{{ t('hapticEnabled') }}</label>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <h6 class="mb-2 fw-semibold">{{ t('addCustomDua') }}</h6>
              <form @submit.prevent="addCustomDua">
                <div class="row g-2">
                  <div class="col-md-6">
                    <input type="text" class="form-control rounded-3" v-model="newDua.arabic" 
                           :placeholder="t('arabicText')" required aria-label="Arabic Text">
                  </div>
                  <div class="col-md-6">
                    <input type="text" class="form-control rounded-3" v-model="newDua.transliteration" 
                           :placeholder="t('transliteration')" required aria-label="Transliteration">
                  </div>
                  <div class="col-md-6">
                    <input type="text" class="form-control rounded-3" v-model="newDua.translation" 
                           :placeholder="t('translation')" required aria-label="Translation">
                  </div>
                  <div class="col-md-6">
                    <input type="number" class="form-control rounded-3" v-model.number="newDua.defaultCount" 
                           :placeholder="t('defaultCount')" min="1" required aria-label="Default Count">
                  </div>
                  <div class="col-12">
                    <textarea class="form-control rounded-3" v-model="newDua.description" 
                              :placeholder="t('description')" rows="3" aria-label="Description"></textarea>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-success rounded-3" aria-label="Add Custom Dua">
                      {{ t('addDua') }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="mt-3">
              <h6 class="mb-2 fw-semibold">{{ t('customDuas') }}</h6>
              <div v-if="customDuas.length" class="custom-duas-list">
                <div v-for="dhikr in customDuas" :key="dhikr.id" class="card mb-2 shadow-sm border-0 rounded-3">
                  <div class="card-body d-flex justify-content-between align-items-center p-2">
                    <div>
                      <strong class="arabic-text fs-5">{{ dhikr.arabic }}</strong>
                      <div class="text-muted small">{{ dhikr.transliteration }} | {{ dhikr.translation }}</div>
                      <div class="text-muted smaller mt-1">{{ dhikr.description || t('noDescription') }}</div>
                    </div>
                    <button class="btn btn-outline-danger btn-sm rounded-circle" 
                            @click="openDeleteModal(dhikr.id, 'dua')"
                            :disabled="isDeleting"
                            :aria-label="t('deleteDuaAria', { name: dhikr.transliteration })"
                            :title="t('deleteDuaAria', { name: dhikr.transliteration })">
                      <i class="bi bi-trash"></i>
                      <span v-if="isDeleting && deletingDuaId === dhikr.id" class="spinner-border spinner-border-sm ms-1" role="status">
                        <span class="visually-hidden">{{ t('deleting') }}</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="text-muted text-center p-2 bg-light rounded-3">
                {{ t('noCustomDuas') }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <div class="row g-3">
        <!-- Main Column (Counter and Dhikr Selection) -->
        <div class="col-lg-8">
          <!-- Counter Card -->
          <div class="card shadow-sm border-0 rounded-3 h-100 primary-card" style="border-top: 4px solid var(--primary-color);">
            <div class="card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center">
              <h5 class="mb-0 fw-semibold text-dark"><i class="bi bi-counter me-2" style="color: var(--primary-color);"></i>{{ t('counter') }}</h5>
              <span class="bi bi-info-circle fs-4 cursor-pointer ms-auto" style="color: var(--primary-color);" data-bs-toggle="tooltip" 
                    :title="t('swipeInstructions')" ref="tooltipTrigger" aria-label="Swipe Instructions"></span>
            </div>
            <div class="card-body p-3">
              <!-- Dhikr Selection -->
              <div class="mb-3">
                <h6 class="section-title mb-2 fw-semibold text-start text-uppercase small" style="color: var(--primary-color);">
                  <i class="bi bi-bookmark-fill me-2"></i>{{ t('dhikrSelection') }}
                </h6>
                <div class="row g-2">
                  <div class="col-md-8">
                    <select class="form-select form-select-lg rounded-3" v-model="selectedDhikr" @change="loadDhikr" 
                            aria-label="Select Dhikr">
                      <option v-for="dhikr in dhikrPresets" :key="dhikr.id" :value="dhikr.id">
                        {{ dhikr.arabic }} - {{ dhikr.transliteration }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <input type="number" class="form-control form-control-lg rounded-3" v-model="targetCount" 
                           :placeholder="t('targetCount')" min="1" aria-label="Target Count">
                  </div>
                </div>
              </div>
              <!-- Current Dhikr -->
              <div class="mb-3">
                <h6 class="section-title mb-2 fw-semibold text-start text-uppercase small" style="color: var(--primary-color);">
                  <i class="bi bi-text-paragraph me-2"></i>{{ t('currentDhikr') }}
                </h6>
                <div class="p-3 rounded-3" style="background-color: #f8f9fa; border-left: 4px solid var(--primary-color);">
                  <h2 class="arabic-text mb-2 fs-1 fw-semibold" style="color: var(--primary-dark);">{{ currentDhikr.arabic }}</h2>
                  <p class="h4 mb-1 fw-medium text-dark">{{ currentDhikr.transliteration }}</p>
                  <p class="text-muted mb-0 fs-5">{{ currentDhikr.translation }}</p>
                </div>
              </div>
              <!-- Counter Display and Progress -->
              <div class="mb-3">
                <h6 class="section-title mb-2 fw-semibold text-start text-uppercase small" style="color: var(--primary-color);">
                  <i class="bi bi-counter me-2"></i>{{ t('progress') }}
                </h6>
                <div class="counter-section position-relative bg-light rounded-3 p-3 border border-light">
                  <button class="btn btn-link p-0 position-absolute start-0 top-50 translate-middle-y" @click="prevCounter" aria-label="Previous Counter">
                    <i class="bi bi-chevron-left fs-3" style="color: var(--primary-color);"></i>
                  </button>
                  <button class="btn btn-link p-0 position-absolute end-0 top-50 translate-middle-y" @click="nextCounter" aria-label="Next Counter">
                    <i class="bi bi-chevron-right fs-3" style="color: var(--primary-color);"></i>
                  </button>
                  <div class="display-1 fw-semibold text-center mb-2" style="color: var(--primary-color);">
                    {{ count }}
                  </div>
                  <div>
                    <div class="d-flex justify-content-between small fw-semibold mb-1" style="color: var(--primary-color);">
                      <span>{{ t('progress') }}</span>
                      <span>{{ progressPercentage.toFixed(1) }}%</span>
                    </div>
                    <div class="progress" style="height: 10px; border-radius: 5px; background-color: #e9ecef;">
                      <div class="progress-bar" :style="{ width: progressPercentage + '%', backgroundColor: 'var(--primary-color)' }"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Actions -->
              <div class="mb-2">
                <h6 class="section-title mb-2 fw-semibold text-start text-uppercase small" style="color: var(--primary-color);">
                  <i class="bi bi-sliders me-2"></i>{{ t('actions') }}
                </h6>
                <div class="d-flex justify-content-center gap-2 flex-wrap">
                  <button class="btn btn-success btn-lg rounded-3 px-4 py-2 fw-semibold" @click="increment" 
                          aria-label="Increment Count">
                    <i class="bi bi-plus-lg me-1"></i> {{ t('count') }}
                  </button>
                  <button class="btn btn-outline-secondary btn-lg rounded-3 px-3 py-2 fw-semibold" @click="reset" 
                          aria-label="Reset Counter">
                    <i class="bi bi-arrow-repeat me-1"></i>{{ t('reset') }}
                  </button>
                  <button class="btn btn-outline-success btn-lg rounded-3 px-3 py-2 fw-semibold" @click="toggleSession" 
                          aria-label="Toggle Session">
                    <i class="bi" :class="sessionActive ? 'bi-pause' : 'bi-play'"></i>
                    {{ sessionActive ? t('pause') : t('resume') }}
                  </button>
                  <button class="btn btn-outline-success btn-lg rounded-3 px-3 py-2 fw-semibold" @click="toggleVoiceInput" 
                          aria-label="Toggle Voice Input">
                    <i class="bi bi-mic me-1"></i>{{ t('voiceInput') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Column (Progress and Secondary Features) -->
        <div class="col-lg-4">
          <!-- Progress Tracking Card -->
          <div class="card shadow-sm border-0 rounded-3 mb-3 primary-card" style="border-top: 4px solid var(--primary-color);">
            <div class="card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer" 
                 @click="toggleSection('progressTracking')" data-bs-toggle="collapse" data-bs-target="#progressTrackingBody"
                 :aria-expanded="!collapsedSections.progressTracking" aria-controls="progressTrackingBody">
              <h5 class="mb-0 fw-semibold text-dark"><i class="bi bi-calendar-check-fill me-2" style="color: var(--primary-color);"></i>{{ t('progressTracking') }}</h5>
              <span class="collapse-icon bi" :class="collapsedSections.progressTracking ? 'bi-chevron-down' : 'bi-chevron-up'" 
                    style="color: #6c757d;" data-bs-toggle="tooltip" :title="collapsedSections.progressTracking ? t('expand') : t('collapse')" 
                    aria-label="Toggle Progress Tracking"></span>
            </div>
            <div id="progressTrackingBody" class="card-body p-3 collapse show">
              <div class="calendar mb-3">
                <div class="calendar-header mb-2 d-flex justify-content-between align-items-center">
                  <button class="btn btn-sm btn-outline-secondary rounded-3" @click="prevMonth" aria-label="Previous Month">
                    <i class="bi bi-chevron-left"></i>
                  </button>
                  <span class="fw-semibold fs-5">{{ currentMonthYear }}</span>
                  <button class="btn btn-sm btn-outline-secondary rounded-3" @click="nextMonth" aria-label="Next Month">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </div>
                <div class="calendar-grid">
                  <div v-for="day in calendarDays" :key="day.date"
                       class="calendar-day"
                       :class="{ completed: day.completed, 'text-muted': !day.isCurrentMonth }"
                       @click="showDayDetails(day.date)"
                       role="button" :aria-label="'View details for ' + day.day">
                    {{ day.day }}
                  </div>
                </div>
              </div>
              <div class="mt-2">
                <div class="d-flex justify-content-between mb-2 fs-6">
                  <span>{{ t('totalToday') }}</span>
                  <span class="badge bg-success fs-6 px-2 py-1">{{ todayTotal }}</span>
                </div>
                <div class="d-flex justify-content-between mb-2 fs-6">
                  <span>{{ t('sessions') }}</span>
                  <span class="badge bg-secondary fs-6 px-2 py-1">{{ todaySessions }}</span>
                </div>
                <div class="d-flex justify-content-between fs-6">
                  <span>{{ t('timeSpent') }}</span>
                  <span class="badge bg-secondary fs-6 px-2 py-1">{{ formatDuration(todayTimeSpent) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Guided Session Card -->
          <div class="card shadow-sm border-0 rounded-3 mb-3 secondary-card">
            <div class="card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer" 
                 @click="toggleSection('guidedSession')" data-bs-toggle="collapse" data-bs-target="#guidedSessionBody"
                 :aria-expanded="!collapsedSections.guidedSession" aria-controls="guidedSessionBody">
              <h6 class="mb-0 fw-semibold text-dark"><i class="bi bi-play-circle-fill me-2" style="color: var(--primary-color);"></i>{{ t('guidedSession') }}</h6>
              <span class="collapse-icon bi" :class="collapsedSections.guidedSession ? 'bi-chevron-down' : 'bi-chevron-up'" 
                    style="color: #6c757d;" data-bs-toggle="tooltip" :title="collapsedSections.guidedSession ? t('expand') : t('collapse')" 
                    aria-label="Toggle Guided Session"></span>
            </div>
            <div id="guidedSessionBody" class="card-body p-2 collapse" :class="{ show: !collapsedSections.guidedSession }">
              <div v-if="!guidedSessionActive">
                <select class="form-select mb-2 rounded-3" v-model="selectedGuidedSession" aria-label="Select Guided Session">
                  <option v-for="session in guidedSessions" :key="session.id" :value="session.id">
                    {{ session.name }} ({{ session.duration }}min)
                  </option>
                </select>
                <button class="btn btn-success w-100 rounded-3" @click="startGuidedSession" aria-label="Start Guided Session">
                  {{ t('startGuided') }}
                </button>
              </div>
              <div v-else class="text-center">
                <div class="mb-2">
                  <div class="h5">{{ formatGuidedTime(guidedTimeRemaining) }}</div>
                  <div class="progress" style="height: 12px; border-radius: 6px;">
                    <div class="progress-bar" :style="{ width: guidedProgress + '%', backgroundColor: 'var(--primary-color)' }"></div>
                  </div>
                </div>
                <button class="btn btn-outline-danger rounded-3" @click="stopGuidedSession" aria-label="Stop Guided Session">
                  {{ t('stopGuided') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Daily Quote Card -->
          <div class="card shadow-sm border-0 rounded-3 mb-3 secondary-card">
            <div class="card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer" 
                 @click="toggleSection('dailyQuote')" data-bs-toggle="collapse" data-bs-target="#dailyQuoteBody"
                 :aria-expanded="!collapsedSections.dailyQuote" aria-controls="dailyQuoteBody">
              <h6 class="mb-0 fw-semibold text-dark"><i class="bi bi-quote me-2" style="color: var(--primary-color);"></i>{{ t('dailyQuote') }}</h6>
              <span class="collapse-icon bi" :class="collapsedSections.dailyQuote ? 'bi-chevron-down' : 'bi-chevron-up'" 
                    style="color: #6c757d;" data-bs-toggle="tooltip" :title="collapsedSections.dailyQuote ? t('expand') : t('collapse')" 
                    aria-label="Toggle Daily Quote"></span>
            </div>
            <div id="dailyQuoteBody" class="card-body p-2 collapse" :class="{ show: !collapsedSections.dailyQuote }">
              <blockquote class="blockquote text-center mb-0">
                <p class="mb-1 fs-6">{{ dailyQuote.text }}</p>
                <footer class="blockquote-footer">{{ dailyQuote.source }}</footer>
              </blockquote>
            </div>
          </div>

          <!-- Recent History Card -->
          <div class="card shadow-sm border-0 rounded-3 mb-3 secondary-card">
            <div class="card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer" 
                 @click="toggleSection('recentHistory')" data-bs-toggle="collapse" data-bs-target="#recentHistoryBody"
                 :aria-expanded="!collapsedSections.recentHistory" aria-controls="recentHistoryBody">
              <h6 class="mb-0 fw-semibold text-dark"><i class="bi bi-clock-history me-2" style="color: var(--primary-color);"></i>{{ t('recentHistory') }}</h6>
              <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-danger rounded-3 me-2" @click.stop="clearHistory" aria-label="Clear All History">
                  <i class="bi bi-trash"></i>
                </button>
                <span class="collapse-icon bi" :class="collapsedSections.recentHistory ? 'bi-chevron-down' : 'bi-chevron-up'" 
                      style="color: #6c757d;" data-bs-toggle="tooltip" :title="collapsedSections.recentHistory ? t('expand') : t('collapse')" 
                      aria-label="Toggle Recent History"></span>
              </div>
            </div>
            <div id="recentHistoryBody" class="card-body p-2 collapse" :class="{ show: !collapsedSections.recentHistory }">
              <div v-for="entry in recentHistory" :key="entry.id" 
                   class="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <small class="d-block">{{ entry.dhikr }}</small>
                  <small class="text-muted">{{ formatDate(entry.date) }}</small>
                </div>
                <div class="d-flex align-items-center">
                  <span class="badge bg-success me-2">{{ entry.count }}</span>
                  <button class="btn btn-outline-danger btn-sm rounded-circle" 
                          @click="openDeleteModal(entry.id, 'history')"
                          :disabled="isDeleting"
                          :aria-label="t('deleteHistoryAria', { name: entry.dhikr })"
                          :title="t('deleteHistoryAria', { name: entry.dhikr })">
                    <i class="bi bi-trash"></i>
                    <span v-if="isDeleting && deletingId === entry.id" class="spinner-border spinner-border-sm ms-1" role="status">
                      <span class="visually-hidden">{{ t('deleting') }}</span>
                    </span>
                  </button>
                </div>
              </div>
              <div v-if="recentHistory.length === 0" class="text-muted text-center">
                {{ t('noHistory') }}
              </div>
            </div>
          </div>

          <!-- Dhikr Guide Card -->
          <div class="card shadow-sm border-0 rounded-3 mb-3 secondary-card">
            <div class="card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer" 
                 @click="toggleSection('dhikrGuide')" data-bs-toggle="collapse" data-bs-target="#dhikrGuideBody"
                 :aria-expanded="!collapsedSections.dhikrGuide" aria-controls="dhikrGuideBody">
              <h6 class="mb-0 fw-semibold text-dark"><i class="bi bi-book-fill me-2" style="color: var(--primary-color);"></i>{{ t('dhikrGuide') }}</h6>
              <span class="collapse-icon bi" :class="collapsedSections.dhikrGuide ? 'bi-chevron-down' : 'bi-chevron-up'" 
                    style="color: #6c757d;" data-bs-toggle="tooltip" :title="collapsedSections.dhikrGuide ? t('expand') : t('collapse')" 
                    aria-label="Toggle Dhikr Guide"></span>
            </div>
            <div id="dhikrGuideBody" class="card-body p-2 collapse" :class="{ show: !collapsedSections.dhikrGuide }">
              <p class="text-muted dhikr-guide-text fs-6">{{ t('dhikrGuideText') }}</p>
              <ul class="list-unstyled dhikr-guide-list">
                <li v-for="dhikr in dhikrPresets" :key="dhikr.id" class="mb-2">
                  <strong class="arabic-text">{{ dhikr.arabic }}</strong> ({{ dhikr.transliteration }}): 
                  {{ dhikr.description }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Action Button -->
      <button class="fab d-lg-none" @click="increment" title="Increment Count" aria-label="Increment Count">
        <i class="bi bi-plus-lg"></i>
      </button>

      <!-- Day Details Modal -->
      <div class="modal fade" id="dayDetailsModal" tabindex="-1" aria-labelledby="dayDetailsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-3">
            <div class="card-header grey-header">
              <h5 class="mb-0 fw-semibold text-dark">{{ t('dayDetails') }} - {{ selectedDay }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-body p-3">
              <div v-if="dayHistory.length > 0">
                <div v-for="entry in dayHistory" :key="entry.id" class="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <strong>{{ entry.dhikr }}</strong>
                    <small class="d-block text-muted">{{ formatDate(entry.date) }} {{ formatTime(entry.date) }}</small>
                  </div>
                  <span class="badge bg-success">{{ entry.count }}</span>
                </div>
              </div>
              <div v-else class="text-muted text-center">
                {{ t('noActivity') }}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary rounded-3" data-bs-dismiss="modal" aria-label="Close Modal">{{ t('close') }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-3">
            <div class="card-header grey-header">
              <h5 class="mb-0 fw-semibold text-dark">{{ deleteType === 'dua' ? t('deleteDuaTitle') : t('deleteHistoryTitle') }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="card-body p-3">
              <p>{{ deleteType === 'dua' ? t('deleteConfirm', { name: deletingName }) : t('deleteHistoryConfirm', { name: deletingName }) }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary rounded-3" data-bs-dismiss="modal" aria-label="Cancel Deletion">{{ t('cancel') }}</button>
              <button type="button" class="btn btn-danger rounded-3" @click="confirmDelete" :disabled="isDeleting" 
                      aria-label="Confirm Deletion">
                <span v-if="isDeleting" class="spinner-border spinner-border-sm me-2" role="status">
                  <span class="visually-hidden">{{ t('deleting') }}</span>
                </span>
                {{ t('delete') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import * as bootstrap from 'bootstrap'

export default {
  name: 'TasbeehComponent',
  setup() {
    // State
    const count = ref(0)
    const targetCount = ref(33)
    const selectedDhikr = ref(1)
    const currentTime = ref(new Date())
    const showSettings = ref(false)
    const soundEnabled = ref(true)
    const hapticEnabled = ref(true)
    const selectedTheme = ref('Light')
    const currentLanguage = ref({ code: 'en', name: 'English' })
    const sessionActive = ref(false)
    const sessionStartTime = ref(null)
    const voiceInputActive = ref(false)
    const guidedSessionActive = ref(false)
    const selectedGuidedSession = ref(1)
    const guidedTimeRemaining = ref(0)
    const guidedTimer = ref(null)
    const todayTotal = ref(0)
    const todaySessions = ref(0)
    const todayTimeSpent = ref(0)
    const recentHistory = ref([])
    const calendarDays = ref([])
    const currentMonth = ref(new Date())
    const alertMessage = ref('')
    const alertType = ref('alert-success')
    const newDua = ref({
      arabic: '',
      transliteration: '',
      translation: '',
      defaultCount: 33,
      description: ''
    })
    const selectedDay = ref('')
    const dayHistory = ref([])
    const touchStartX = ref(0)
    const touchStartY = ref(0)
    const touchEndX = ref(0)
    const touchEndY = ref(0)
    const tooltipTrigger = ref(null)
    const collapsedSections = ref({
      dhikrGuide: false,
      progressTracking: false,
      dailyQuote: false,
      guidedSession: false,
      recentHistory: false
    })
    const deletingDuaId = ref(null)
    const deletingDuaName = ref('')
    const isDeleting = ref(false)

    // Languages
    const languages = ref([
      { code: 'en', name: 'English' },
      { code: 'ar', name: 'العربية' },
      { code: 'ur', name: 'اردو' },
      { code: 'tr', name: 'Türkçe' },
      { code: 'id', name: 'Bahasa Indonesia' }
    ])

    // Translations
    const translations = {
      en: {
        settings: 'Settings',
        theme: 'Theme',
        soundEnabled: 'Sound',
        hapticEnabled: 'Haptic Feedback',
        targetCount: 'Target Count',
        counter: 'Dhikr Counter',
        count: 'Count',
        reset: 'Reset',
        pause: 'Pause',
        resume: 'Resume',
        complete: 'Complete',
        voiceInput: 'Voice Input',
        dailyQuote: 'Daily Inspiration',
        progressTracking: 'Progress Tracking',
        totalToday: 'Total Today',
        sessions: 'Sessions',
        timeSpent: 'Time Spent',
        guidedSession: 'Guided Session',
        startGuided: 'Start Session',
        stopGuided: 'Stop Session',
        recentHistory: 'Recent History',
        noHistory: 'No history yet',
        dhikrGuide: 'Dhikr Guide',
        dhikrGuideText: 'Learn about the significance of each Dhikr and how to perform them correctly.',
        targetReached: 'Target Reached!',
        resetConfirm: 'Would you like to reset the counter?',
        addCustomDua: 'Add Custom Dua',
        arabicText: 'Arabic Text',
        transliteration: 'Transliteration',
        translation: 'Translation',
        defaultCount: 'Default Count',
        description: 'Description',
        addDua: 'Add Dua',
        customDuas: 'Custom Duas',
        noCustomDuas: 'No custom duas yet. Add one above!',
        noDescription: 'No description provided',
        delete: 'Delete',
        cancel: 'Cancel',
        deleting: 'Deleting...',
        deleteDuaTitle: 'Delete Custom Dua',
        deleteConfirm: 'Are you sure you want to delete "{name}"?',
        deleteDuaAria: 'Delete {name}',
        duaDeleted: 'Custom Dua deleted successfully',
        dayDetails: 'Day Details',
        noActivity: 'No activity for this day',
        close: 'Close',
        swipeRight: 'Swiped right to increment (+1)',
        swipeLeft: 'Swiped left to decrement (-1)',
        swipeUp: 'Swiped up to reset',
        swipeInstructions: 'Swipe Right: +1 | Swipe Left: -1 | Swipe Up: Reset'
      },
      ar: {
        settings: 'الإعدادات',
        theme: 'المظهر',
        soundEnabled: 'الصوت',
        hapticEnabled: 'الاهتزاز',
        targetCount: 'العدد المستهدف',
        counter: 'عداد الذكر',
        count: 'عد',
        reset: 'إعادة تعيين',
        pause: 'إيقاف مؤقت',
        resume: 'استكمال',
        complete: 'مكتمل',
        voiceInput: 'الإدخال الصوتي',
        dailyQuote: 'الإلهام اليومي',
        progressTracking: 'تتبع التقدم',
        totalToday: 'المجموع اليوم',
        sessions: 'الجلسات',
        timeSpent: 'الوقت المستغرق',
        guidedSession: 'جلسة موجهة',
        startGuided: 'بدء الجلسة',
        stopGuided: 'إيقاف الجلسة',
        recentHistory: 'التاريخ الحديث',
        noHistory: 'لا يوجد تاريخ بعد',
        dhikrGuide: 'دليل الذكر',
        dhikrGuideText: 'تعرف على أهمية كل ذكر وكيفية أدائه بشكل صحيح.',
        targetReached: 'تم الوصول إلى الهدف!',
        resetConfirm: 'هل ترغب في إعادة تعيين العداد؟',
        addCustomDua: 'إضافة دعاء مخصص',
        arabicText: 'النص العربي',
        transliteration: 'التفريغ الصوتي',
        translation: 'الترجمة',
        defaultCount: 'العدد الافتراضي',
        description: 'الوصف',
        addDua: 'إضافة دعاء',
        customDuas: 'الأدعية المخصصة',
        noCustomDuas: 'لا توجد أدعية مخصصة بعد. أضف واحدًا أعلاه!',
        noDescription: 'لم يتم تقديم وصف',
        delete: 'حذف',
        cancel: 'إلغاء',
        deleting: 'جارٍ الحذف...',
        deleteDuaTitle: 'حذف الدعاء المخصص',
        deleteConfirm: 'هل أنت متأكد من حذف "{name}"؟',
        deleteDuaAria: 'حذف {name}',
        duaDeleted: 'تم حذف الدعاء المخصص بنجاح',
        dayDetails: 'تفاصيل اليوم',
        noActivity: 'لا توجد أنشطة لهذا اليوم',
        close: 'إغلاق',
        swipeRight: 'تم السحب لليمين للزيادة (+1)',
        swipeLeft: 'تم السحب لليسار للنقصان (-1)',
        swipeUp: 'تم السحب للأعلى لإعادة التعيين',
        swipeInstructions: 'السحب لليمين: +1 | السحب لليسار: -1 | السحب للأعلى: إعادة تعيين'
      }
      // Add translations for other languages (ur, tr, id) as needed
    }

    // Dhikr Presets
    const dhikrPresets = ref([
      {
        id: 1,
        arabic: 'سُبْحَانَ اللهِ',
        transliteration: 'SubhanAllah',
        translation: 'Glory be to Allah',
        defaultCount: 33,
        description: 'Praising Allah by declaring His glory, typically recited 33 times after prayers.',
        isCustom: false
      },
      {
        id: 2,
        arabic: 'الْحَمْدُ لِلّهِ',
        transliteration: 'Alhamdulillah',
        translation: 'All praise is due to Allah',
        defaultCount: 33,
        description: 'Expressing gratitude to Allah, recited 33 times after prayers.',
        isCustom: false
      },
      {
        id: 3,
        arabic: 'اللهُ أَكْبَرُ',
        transliteration: 'Allahu Akbar',
        translation: 'Allah is the Greatest',
        defaultCount: 34,
        description: 'Proclaiming Allah’s greatness, recited 34 times after prayers.',
        isCustom: false
      },
      {
        id: 4,
        arabic: 'لَا إِلٰهَ إِلَّا اللهُ',
        transliteration: 'La ilaha illa Allah',
        translation: 'There is no god but Allah',
        defaultCount: 100,
        description: 'Affirming the oneness of Allah, often recited 100 times.',
        isCustom: false
      },
      {
        id: 5,
        arabic: 'أَسْتَغْفِرُ اللهَ',
        transliteration: 'Astaghfirullah',
        translation: 'I seek forgiveness from Allah',
        defaultCount: 100,
        description: 'Seeking Allah’s forgiveness, commonly recited 100 times.',
        isCustom: false
      }
    ])

    // Themes
    const themes = ref([
      {
        name: 'Light',
        background: '#f8f9fa',
        cardBg: '#ffffff',
        text: '#212529',
        accent: '#0db691'
      },
      {
        name: 'Dark',
        background: '#1a1a1a',
        cardBg: '#2d2d2d',
        text: '#ffffff',
        accent: '#0db691'
      },
      {
        name: 'Islamic Green',
        background: '#0f4c3a',
        cardBg: '#1a5f4a',
        text: '#ffffff',
        accent: '#0db691'
      }
    ])

    // Guided Sessions
    const guidedSessions = ref([
      { id: 1, name: 'Morning Dhikr', duration: 10, dhikrs: [1, 2, 3] },
      { id: 2, name: 'Evening Dhikr', duration: 15, dhikrs: [4, 5, 1] },
      { id: 3, name: 'Quick Session', duration: 5, dhikrs: [1, 2] }
    ])

    // Daily Quotes
    const dailyQuotes = ref([
      {
        text: 'Remember Allah and Allah will remember you.',
        source: 'Quran 2:152'
      },
      {
        text: 'The remembrance of Allah is the greatest.',
        source: 'Quran 29:45'
      },
      {
        text: 'In the remembrance of Allah do hearts find rest.',
        source: 'Quran 13:28'
      }
    ])

    // Computed Properties
    const currentDhikr = computed(() => {
      return dhikrPresets.value.find(d => d.id === selectedDhikr.value) || dhikrPresets.value[0]
    })

    const customDuas = computed(() => {
      return dhikrPresets.value.filter(d => d.isCustom)
    })

    const progressPercentage = computed(() => {
      return targetCount.value > 0 ? Math.min((count.value / targetCount.value) * 100, 100) : 0
    })

    const currentTheme = computed(() => {
      return themes.value.find(t => t.name === selectedTheme.value) || themes.value[0]
    })

    const dailyQuote = computed(() => {
      const today = new Date().getDate()
      return dailyQuotes.value[today % dailyQuotes.value.length]
    })

    const guidedProgress = computed(() => {
      const currentSession = guidedSessions.value.find(s => s.id === selectedGuidedSession.value)
      if (!currentSession) return 0
      const totalTime = currentSession.duration * 60
      return ((totalTime - guidedTimeRemaining.value) / totalTime) * 100
    })

    const currentMonthYear = computed(() => {
      return currentMonth.value.toLocaleString('default', { month: 'long', year: 'numeric' })
    })

    // Methods
    const t = (key, params = {}) => {
      let text = translations[currentLanguage.value.code]?.[key] || translations.en[key] || key
      if (params) {
        Object.keys(params).forEach(param => {
          text = text.replace(`{${param}}`, params[param])
        })
      }
      return text
    }

    const formatTime = (date) => {
      return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }

    const formatDuration = (seconds) => {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    }

    const formatGuidedTime = (seconds) => {
      const minutes = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${minutes}:${secs.toString().padStart(2, '0')}`
    }

    const showAlert = (message, type = 'alert-success') => {
      alertMessage.value = message
      alertType.value = type
      setTimeout(() => { alertMessage.value = '' }, 3000)
    }

    const increment = () => {
      count.value++
      todayTotal.value++
      if (soundEnabled.value) playSound()
      if (hapticEnabled.value) triggerHaptic()
      if (count.value >= targetCount.value) onTargetReached()
      saveProgress()
    }

    const decrement = () => {
      if (count.value > 0) {
        count.value--
        todayTotal.value = Math.max(0, todayTotal.value - 1)
        if (soundEnabled.value) playSound()
        if (hapticEnabled.value) triggerHaptic()
        saveProgress()
      }
    }

    const reset = () => {
      if (count.value > 0) saveToHistory()
      count.value = 0
      saveProgress()
      showAlert('Counter reset', 'alert-info')
    }

    const loadDhikr = () => {
      const dhikr = currentDhikr.value
      if (dhikr && dhikr.defaultCount) {
        targetCount.value = dhikr.defaultCount
      }
      count.value = 0
      saveProgress()
    }

    const changeLanguage = (langCode) => {
      const lang = languages.value.find(l => l.code === langCode)
      if (lang) {
        currentLanguage.value = lang
        saveSettings()
        showAlert(`Language changed to ${lang.name}`, 'alert-success')
      }
    }

    const applyTheme = () => {
      saveSettings()
      showAlert(`Theme changed to ${selectedTheme.value}`, 'alert-success')
    }

    const addCustomDua = () => {
      if (newDua.value.arabic && newDua.value.transliteration && newDua.value.translation && newDua.value.defaultCount) {
        const newId = Math.max(...dhikrPresets.value.map(d => d.id), 0) + 1
        dhikrPresets.value.push({
          id: newId,
          arabic: newDua.value.arabic,
          transliteration: newDua.value.transliteration,
          translation: newDua.value.translation,
          defaultCount: newDua.value.defaultCount,
          description: newDua.value.description || 'Custom Dua added by user.',
          isCustom: true
        })
        saveDhikrs()
        selectedDhikr.value = newId
        loadDhikr()
        newDua.value = { arabic: '', transliteration: '', translation: '', defaultCount: 33, description: '' }
        showAlert('Custom Dua added successfully', 'alert-success')
      } else {
        showAlert('Please fill all required fields', 'alert-danger')
      }
    }

    const openDeleteModal = (id) => {
      const dua = dhikrPresets.value.find(d => d.id === id)
      if (dua) {
        deletingDuaId.value = id
        deletingDuaName.value = dua.transliteration
        const modal = new bootstrap.Modal(document.getElementById('deleteDuaModal'))
        modal.show()
      } else {
        showAlert('Dua not found', 'alert-danger')
      }
    }

    const confirmDeleteDua = () => {
      isDeleting.value = true
      setTimeout(() => { // Simulate async operation
        const id = deletingDuaId.value
        dhikrPresets.value = dhikrPresets.value.filter(d => d.id !== id)
        saveDhikrs()
        if (selectedDhikr.value === id) {
          selectedDhikr.value = dhikrPresets.value[0]?.id || 1
          loadDhikr()
        }
        isDeleting.value = false
        deletingDuaId.value = null
        deletingDuaName.value = ''
        showAlert(t('duaDeleted'), 'alert-success')
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteDuaModal'))
        modal.hide()
      }, 500) // Short delay for UX
    }

    const toggleSession = () => {
      if (sessionActive.value) {
        if (sessionStartTime.value) {
          todayTimeSpent.value += Math.floor((Date.now() - sessionStartTime.value) / 1000)
        }
        sessionActive.value = false
        sessionStartTime.value = null
        showAlert('Session paused', 'alert-info')
      } else {
        sessionActive.value = true
        sessionStartTime.value = Date.now()
        if (todaySessions.value === 0 || !sessionStartTime.value) {
          todaySessions.value++
        }
        showAlert('Session resumed', 'alert-success')
      }
      saveProgress()
    }

    const toggleVoiceInput = () => {
      if (!voiceInputActive.value) {
        startVoiceRecognition()
      } else {
        stopVoiceRecognition()
      }
    }

    const startVoiceRecognition = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = false
        recognition.lang = currentLanguage.value.code === 'ar' ? 'ar-SA' : 'en-US'
        recognition.onstart = () => {
          voiceInputActive.value = true
          showAlert('Voice input started. Say "count", "reset", "pause", or "resume".', 'alert-success')
        }
        recognition.onresult = (event) => {
          const result = event.results[event.results.length - 1][0].transcript.toLowerCase()
          if (result.includes('count') || result.includes('counter') || result.includes('one')) {
            increment()
            showAlert('Count incremented via voice', 'alert-success')
          } else if (result.includes('reset')) {
            reset()
            showAlert('Counter reset via voice', 'alert-info')
          } else if (result.includes('pause')) {
            if (sessionActive.value) {
              toggleSession()
            }
          } else if (result.includes('resume')) {
            if (!sessionActive.value) {
              toggleSession()
            }
          }
        }
        recognition.onerror = (event) => {
          voiceInputActive.value = false
          showAlert(`Voice input error: ${event.error}`, 'alert-danger')
        }
        recognition.onend = () => {
          voiceInputActive.value = false
          showAlert('Voice input stopped', 'alert-info')
        }
        recognition.start()
      } else {
        showAlert('Voice recognition not supported in this browser', 'alert-danger')
      }
    }

    const stopVoiceRecognition = () => {
      voiceInputActive.value = false
      showAlert('Voice input stopped', 'alert-info')
    }

    const startGuidedSession = () => {
      const session = guidedSessions.value.find(s => s.id === selectedGuidedSession.value)
      if (session) {
        guidedSessionActive.value = true
        guidedTimeRemaining.value = session.duration * 60
        guidedTimer.value = setInterval(() => {
          guidedTimeRemaining.value--
          if (guidedTimeRemaining.value <= 0) {
            stopGuidedSession()
          }
        }, 1000)
        handleGuidedSession()
        showAlert('Guided session started', 'alert-success')
      }
    }

    const stopGuidedSession = () => {
      guidedSessionActive.value = false
      if (guidedTimer.value) {
        clearInterval(guidedTimer.value)
        guidedTimer.value = null
      }
      guidedTimeRemaining.value = 0
      showAlert('Guided session stopped', 'alert-info')
    }

    const onTargetReached = () => {
      if (soundEnabled.value) playCompletionSound()
      if (hapticEnabled.value) triggerHaptic()
      showAlert(t('targetReached'), 'alert-success')
      updateCalendar()
      setTimeout(() => {
        if (confirm(t('resetConfirm'))) {
          reset()
        }
      }, 500)
    }

    const playSound = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.frequency.value = 800
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.1)
    }

    const playCompletionSound = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const frequencies = [523, 659, 784]
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          oscillator.frequency.value = freq
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.3)
        }, index * 100)
      })
    }

    const triggerHaptic = () => {
      if ('vibrate' in navigator) navigator.vibrate(50)
    }

    const saveProgress = () => {
      const progress = {
        count: count.value,
        targetCount: targetCount.value,
        selectedDhikr: selectedDhikr.value,
        todayTotal: todayTotal.value,
        todaySessions: todaySessions.value,
        todayTimeSpent: todayTimeSpent.value,
        date: new Date().toDateString(),
        calendarDays: calendarDays.value
      }
      localStorage.setItem('tasbihProgress', JSON.stringify(progress))
    }

    const loadProgress = () => {
      const saved = localStorage.getItem('tasbihProgress')
      if (saved) {
        const progress = JSON.parse(saved)
        if (progress.date === new Date().toDateString()) {
          count.value = progress.count || 0
          targetCount.value = progress.targetCount || 33
          selectedDhikr.value = progress.selectedDhikr || 1
          todayTotal.value = progress.todayTotal || 0
          todaySessions.value = progress.todaySessions || 0
          todayTimeSpent.value = progress.todayTimeSpent || 0
          calendarDays.value = progress.calendarDays || generateCalendarDays()
        } else {
          resetDailyProgress()
        }
      } else {
        generateCalendarDays()
      }
    }

    const saveSettings = () => {
      const settings = {
        soundEnabled: soundEnabled.value,
        hapticEnabled: hapticEnabled.value,
        selectedTheme: selectedTheme.value,
        currentLanguage: currentLanguage.value,
        collapsedSections: collapsedSections.value
      }
      localStorage.setItem('tasbihSettings', JSON.stringify(settings))
    }

    const loadSettings = () => {
      const saved = localStorage.getItem('tasbihSettings')
      if (saved) {
        const settings = JSON.parse(saved)
        soundEnabled.value = settings.soundEnabled ?? true
        hapticEnabled.value = settings.hapticEnabled ?? true
        selectedTheme.value = settings.selectedTheme || 'Light'
        currentLanguage.value = settings.currentLanguage || { code: 'en', name: 'English' }
        collapsedSections.value = settings.collapsedSections || {
          dhikrGuide: false,
          progressTracking: false,
          dailyQuote: false,
          guidedSession: false,
          recentHistory: false
        }
      }
    }

    const saveDhikrs = () => {
      localStorage.setItem('tasbihDhikrs', JSON.stringify(dhikrPresets.value))
    }

    const loadDhikrs = () => {
      const saved = localStorage.getItem('tasbihDhikrs')
      if (saved) {
        const savedDhikrs = JSON.parse(saved)
        dhikrPresets.value = [...dhikrPresets.value.filter(d => !d.isCustom), ...savedDhikrs.filter(d => d.isCustom)]
      }
    }

    const saveToHistory = () => {
      const entry = {
        id: Date.now(),
        dhikr: currentDhikr.value.transliteration,
        count: count.value,
        date: new Date(),
        targetReached: count.value >= targetCount.value
      }
      recentHistory.value.unshift(entry)
      if (recentHistory.value.length > 20) {
        recentHistory.value = recentHistory.value.slice(0, 20)
      }
      localStorage.setItem('tasbihHistory', JSON.stringify(recentHistory.value))
    }

    const loadHistory = () => {
      const saved = localStorage.getItem('tasbihHistory')
      if (saved) {
        recentHistory.value = JSON.parse(saved)
      }
    }

    const clearHistory = () => {
      recentHistory.value = []
      localStorage.removeItem('tasbihHistory')
      showAlert('History cleared', 'alert-info')
    }

    const generateCalendarDays = () => {
      const days = []
      const year = currentMonth.value.getFullYear()
      const month = currentMonth.value.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startDay = firstDay.getDay()
      const totalDays = lastDay.getDate()
      const prevMonthLastDay = new Date(year, month, 0).getDate()
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({
          date: new Date(year, month - 1, prevMonthLastDay - i).toDateString(),
          day: prevMonthLastDay - i,
          completed: false,
          isCurrentMonth: false
        })
      }
      for (let i = 1; i <= totalDays; i++) {
        const date = new Date(year, month, i)
        days.push({
          date: date.toDateString(),
          day: i,
          completed: false,
          isCurrentMonth: true
        })
      }
      const remainingDays = 42 - days.length
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i).toDateString(),
          day: i,
          completed: false,
          isCurrentMonth: false
        })
      }
      const saved = localStorage.getItem('tasbihProgress')
      if (saved) {
        const progress = JSON.parse(saved)
        if (progress.calendarDays) {
          progress.calendarDays.forEach(savedDay => {
            const day = days.find(d => d.date === savedDay.date)
            if (day) day.completed = savedDay.completed
          })
        }
      }
      calendarDays.value = days
      saveProgress()
    }

    const prevMonth = () => {
      currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1)
      generateCalendarDays()
    }

    const nextMonth = () => {
      currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1)
      generateCalendarDays()
    }

    const updateCalendar = () => {
      const today = new Date().toDateString()
      const day = calendarDays.value.find(d => d.date === today)
      if (day) {
        day.completed = true
        showAlert('Daily target marked as completed', 'alert-success')
        saveProgress()
      }
    }

    const showDayDetails = (date) => {
      selectedDay.value = date
      dayHistory.value = recentHistory.value.filter(h => new Date(h.date).toDateString() === date)
      const modal = new bootstrap.Modal(document.getElementById('dayDetailsModal'))
      modal.show()
    }

    const resetDailyProgress = () => {
      todayTotal.value = 0
      todaySessions.value = 0
      todayTimeSpent.value = 0
      count.value = 0
      generateCalendarDays()
      saveProgress()
    }

    const toggleSection = (section) => {
      collapsedSections.value[section] = !collapsedSections.value[section]
      saveSettings()
    }

    const handleGuidedSession = () => {
      const session = guidedSessions.value.find(s => s.id === selectedGuidedSession.value)
      if (session && session.dhikrs) {
        const sequence = session.dhikrs
        let index = 0
        const interval = setInterval(() => {
          if (guidedSessionActive.value && index < sequence.length) {
            selectedDhikr.value = sequence[index]
            loadDhikr()
            count.value = 0
            showAlert(`Now reciting ${dhikrPresets.value.find(d => d.id === sequence[index]).transliteration}`, 'alert-info')
            index++
          } else {
            clearInterval(interval)
          }
        }, 5000)
      }
    }

    const handleTouchStart = (event) => {
      touchStartX.value = event.changedTouches[0].screenX
      touchStartY.value = event.changedTouches[0].screenY
    }

    const handleTouchEnd = (event) => {
      touchEndX.value = event.changedTouches[0].screenX
      touchEndY.value = event.changedTouches[0].screenY
      handleSwipe()
    }

    const handleSwipe = () => {
      const swipeXDistance = touchEndX.value - touchStartX.value
      const swipeYDistance = touchEndY.value - touchStartY.value
      const minSwipeDistance = 50
      const isHorizontalSwipe = Math.abs(swipeXDistance) > Math.abs(swipeYDistance)
      const isVerticalSwipe = Math.abs(swipeYDistance) > Math.abs(swipeXDistance)

      if (isHorizontalSwipe && Math.abs(swipeXDistance) > minSwipeDistance) {
        if (swipeXDistance > 0) {
          increment()
          showAlert(t('swipeRight'), 'alert-success')
        } else {
          decrement()
          showAlert(t('swipeLeft'), 'alert-warning')
        }
      } else if (isVerticalSwipe && Math.abs(swipeYDistance) > minSwipeDistance && swipeYDistance < 0) {
        reset()
        showAlert(t('swipeUp'), 'alert-info')
      }
    }

    onMounted(() => {
      const clockInterval = setInterval(() => {
        currentTime.value = new Date()
      }, 1000)
      loadSettings()
      loadProgress()
      loadHistory()
      loadDhikrs()
      loadDhikr()

      if (tooltipTrigger.value) {
        new bootstrap.Tooltip(tooltipTrigger.value, {
          placement: 'top',
          trigger: 'hover'
        })
      }

      onUnmounted(() => {
        clearInterval(clockInterval)
        if (guidedTimer.value) {
          clearInterval(guidedTimer.value)
        }
      })
    })

    watch(sessionActive, (newVal) => {
      if (newVal) {
        sessionStartTime.value = Date.now()
      } else if (sessionStartTime.value) {
        todayTimeSpent.value += Math.floor((Date.now() - sessionStartTime.value) / 1000)
        sessionStartTime.value = null
        saveProgress()
      }
    })

    return {
      count,
      targetCount,
      selectedDhikr,
      currentTime,
      showSettings,
      soundEnabled,
      hapticEnabled,
      selectedTheme,
      currentLanguage,
      sessionActive,
      voiceInputActive,
      guidedSessionActive,
      selectedGuidedSession,
      guidedTimeRemaining,
      todayTotal,
      todaySessions,
      todayTimeSpent,
      recentHistory,
      calendarDays,
      currentMonth,
      alertMessage,
      alertType,
      newDua,
      selectedDay,
      dayHistory,
      languages,
      dhikrPresets,
      themes,
      guidedSessions,
      currentDhikr,
      customDuas,
      progressPercentage,
      currentTheme,
      dailyQuote,
      guidedProgress,
      currentMonthYear,
      tooltipTrigger,
      collapsedSections,
      deletingDuaId,
      deletingDuaName,
      isDeleting,
      t,
      formatTime,
      formatDate,
      formatDuration,
      formatGuidedTime,
      increment,
      decrement,
      reset,
      loadDhikr,
      changeLanguage,
      applyTheme,
      addCustomDua,
      openDeleteModal,
      confirmDeleteDua,
      toggleSession,
      toggleVoiceInput,
      startGuidedSession,
      stopGuidedSession,
      clearHistory,
      prevMonth,
      nextMonth,
      showDayDetails,
      toggleSection,
      handleTouchStart,
      handleTouchEnd,
      deletingId: null,
      deletingName: '',
      deleteType: '', 
      isDeleting: false,
    }
  },
  methods:{
    openDeleteModal(id, type) {
      this.deleteType = type;
      if (type === 'dua') {
        const dua = this.customDuas.find(d => d.id === id);
        this.deletingId = id;
        this.deletingName = dua ? dua.transliteration : '';
      } else {
        const entry = this.recentHistory.find(e => e.id === id);
        this.deletingId = id;
        this.deletingName = entry ? entry.dhikr : '';
      }
      const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
      modal.show();
    },
    confirmDelete() {
      this.isDeleting = true;
      if (this.deleteType === 'dua') {
        this.confirmDeleteDua();
      } else {
        this.deleteHistoryEntry();
      }
    },
    deleteHistoryEntry() {
      this.recentHistory = this.recentHistory.filter(entry => entry.id !== this.deletingId);
      localStorage.setItem('recentHistory', JSON.stringify(this.recentHistory));
      this.isDeleting = false;
      this.deletingId = null;
      this.deletingName = '';
      this.deleteType = '';
      const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
      modal.hide();
      this.showAlert(this.t('historyDeleted'), 'success');
    },
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = `alert-${type}`;
      setTimeout(() => {
        this.alertMessage = '';
        this.alertType = '';
      }, 3000);
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;500;700&display=swap');

:root {
  --primary-color: #0db691;
  --primary-dark: #0a9974;
  --fab-color: #28a745;
  --fab-dark: #218838;
  --header-bg: rgba(13, 182, 145, 0.05);
  --header-border: rgba(13, 182, 145, 0.2);
}

.tasbih-app {
  font-family: 'Inter', 'Amiri', 'Noto Sans Arabic', sans-serif;
  background: linear-gradient(to bottom, #f0f9f7, #f0f0f8);
}

.arabic-text {
  font-family: 'Amiri', 'Noto Sans Arabic', serif;
  font-weight: 600;
  line-height: 2.2;
  font-size: 1.1em;
}

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  background: linear-gradient(135deg, var(--fab-color), var(--fab-dark));
  color: white;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(40, 167, 69, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.fab:hover {
  background: linear-gradient(135deg, var(--fab-dark), var(--fab-color));
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.6);
}

.btn-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 1.25rem;
  box-shadow: 0 4px 8px rgba(13, 182, 145, 0.3);
}

.btn-circle:hover {
  box-shadow: 0 6px 12px rgba(13, 182, 145, 0.5);
}

.digital-counter {
  font-family: 'Orbitron', 'Roboto Mono', monospace;
  font-size: 7rem;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(13, 182, 145, 0.3);
  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 10px 20px;
  border-radius: 10px;
  display: inline-block;
}

.dhikr-guide-text {
  line-height: 1.8;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.dhikr-guide-list {
  line-height: 1.8;
  padding-left: 0.5rem;
}

.dhikr-guide-list li {
  margin-bottom: 1rem;
}

.swipe-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: rgba(13, 182, 145, 0.5);
}

.swipe-arrow:hover {
  color: var(--primary-color);
}

.swipe-arrow-left {
  left: 10px;
}

.swipe-arrow-right {
  right: 10px;
}

.calendar-header {
  font-size: 1rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 10px;
}

.calendar-day {
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  background-color: #e9ecef;
  font-size: 1rem;
  cursor: pointer;
}

.calendar-day.completed {
  background-color: var(--primary-color);
  color: white;
}

.calendar-day:hover {
  background-color: #d1d5db;
}

.primary-card {
  border-radius: 16px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border: 1px solid #e9ecef;
}

.primary-card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

.secondary-card {
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
}

.secondary-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--header-border);
}

.colored-header {
  background-color: var(--header-bg);
}

.card-header h5,
.card-header h6 {
  margin: 0;
  line-height: 1.4;
}

.collapse-icon {
  font-size: 1.25rem;
  color: #6c757d;
  padding: 0.5rem;
  border-radius: 50%;
  margin-left: auto;
}

.collapse-icon:hover {
  background-color: rgba(13, 182, 145, 0.1);
  color: var(--primary-color);
}

.btn {
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
}

.btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn:active {
  box-shadow: none;
}

.btn-success {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-success:hover {
  background-color: var(--primary-dark);
  border-color: var(--primary-dark);
}

.btn-outline-success {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-outline-success:hover {
  background-color: var(--primary-color);
  color: white;
}

.form-control,
.form-select {
  border-radius: 8px;
  border: 2px solid #e9ecef;
  padding: 0.75rem;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.25rem rgba(13, 182, 145, 0.25);
}

.navbar {
  backdrop-filter: blur(10px);
  background: var(--primary-color);
}

.dropdown-menu {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: none;
}

.badge.bg-success {
  background-color: var(--primary-color) !important;
}

.badge.bg-info {
  background-color: #6c757d !important;
}

.modal-content {
  border-radius: 12px;
  border: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.custom-duas-list .card {
  border-radius: 10px;
}

.custom-duas-list .card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.btn-outline-danger.rounded-circle {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-width: 2px;
}

.btn-outline-danger.rounded-circle:hover {
  background-color: #dc3545;
  color: white;
}

.btn-outline-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.smaller {
  font-size: 0.85rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .digital-counter {
    font-size: 2.5rem;
  }
  .arabic-text {
    font-size: 1.6rem !important;
  }
  .card-body {
    padding: 1rem;
  }
  .card-header {
    padding: 0.75rem 1rem;
  }
  .btn-circle {
    width: 50px;
    height: 50px;
    font-size: 1rem;
  }
  .calendar-day {
    padding: 6px;
    font-size: 0.85rem;
  }
  .swipe-arrow {
    font-size: 1rem;
  }
  .btn-outline-danger.rounded-circle {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
  .custom-duas-list .card-body {
    flex-direction: column;
    align-items: flex-start;
  }
  .custom-duas-list .btn {
    margin-top: 0.5rem;
    align-self: flex-end;
  }
  .primary-card {
    border-radius: 12px;
  }
  .primary-card .card-header h5 {
    font-size: 1.25rem;
  }
  .secondary-card .card-header h6 {
    font-size: 1rem;
  }
  .form-select-lg,
  .form-control-lg {
    font-size: 1rem !important;
    padding: 0.5rem !important;
  }
  .btn-lg {
    font-size: 1rem !important;
    padding: 0.5rem 1rem !important;
  }
  .collapse-icon {
    font-size: 1rem;
    padding: 0.4rem;
  }
  .fab {
    width: 56px;
    height: 56px;
    font-size: 1.5rem;
  }
}
</style>