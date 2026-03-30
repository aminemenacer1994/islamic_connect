<template>
  <div class="p-3 mission-shell" :class="{ 'pb-audio-gap': showAudioPlayer, 'is-dark': isDarkMode }">

    <section class="mission-intro container px-0 px-lg-3">
      <div class="row py-3 justify-content-center text-center mb-3 mission-hero">
        <div class="col-lg-10 col-xl-10">
          <h1 class="display-5 fw-bold mission-hero__title">Seerah Timeline</h1>
          <p class="lead mission-hero__lead">
            The Seerah Timeline offers an insightful journey through the life of Prophet Muhammad (PBUH).
          </p>
        </div>
      </div>

      <!-- Next Step: From Qur'an History to Seerah Timeline -->
      <!-- <div class="next-step-card animate-rise mx-auto mb-4">
        <button type="button" class="next-step-toggle" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
          :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'"
          @click.stop="toggleNextStepMinimized">
          <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
        </button>
        <div class="d-flex align-items-start gap-3 text-start">
          <div class="flex-shrink-0 mt-1">
            <div class="next-step-icon-circle"><i class="fas fa-praying-hands"></i></div>
          </div>
          <div class="flex-grow-1">
            <p class="mb-2 fw-semibold text-uppercase next-step-eyebrow">
              NEXT STEP
            </p>
            -- Minimized teaser --
            <div v-show="nextStepMinimized" class="mb-2 next-step-teaser">
              <a href="/dua" class="fw-semibold text-decoration-none next-step-link">
                Explore Du‘a collection
              </a>
              <i class="fas fa-arrow-up-right-from-square ms-1 next-step-link-icon"></i>
            </div>
            <p v-show="!nextStepMinimized" class="mb-3 next-step-text">
              Learning the Prophet’s blessed journey is a beautiful beginning. When you feel ready, take a gentle step
              into
              heartfelt supplications, explore a simple, welcoming the
              <a href="/dua" class="fw-semibold text-decoration-none next-step-link">
                Du‘a collection
              </a>
              for daily moments of connection.
            </p>
            <a v-show="!nextStepMinimized" href="/dua"
              class="btn btn-sm fw-semibold text-white px-3 py-2 next-step-cta">
              Explore Du‘a
              <i class="fas fa-arrow-up-right-from-square ms-2"></i>
            </a>
          </div>
        </div>
      </div> -->
    </section>

    <section class="timeline-disclaimer-shell container" aria-label="Seerah timeline disclaimer">
      <div class="timeline-disclaimer timeline-disclaimer--page" role="note">
        <i class="bi bi-info-circle timeline-disclaimer__icon" aria-hidden="true"></i>
        <p class="timeline-disclaimer__text">
          This timeline is a guided overview of the Seerah. Some dates, ordering, and details may vary across
          classical sources and scholarly interpretations.
        </p>
      </div>
    </section>

    <section class="timeline-intro container">
      <div class="timeline-intro__upper">
        <div class="timeline-intro__text">
          <p class="timeline-kicker">Navigate the Seerah</p>
          <h2 class="timeline-heading">Choose a moment in the life of the Prophet</h2>
          <p class="timeline-subtitle">Scroll the years or search by title, year, or keyword.</p>
        </div>
      </div>
      <div class="timeline-progress" role="progressbar" :aria-valuemin="0" :aria-valuemax="100"
        :aria-valuenow="timelineProgress">
        <div class="timeline-progress__fill" :style="{ width: timelineProgress + '%' }"></div>
      </div>
      <div class="timeline-meta">
        <span v-if="currentEvent.title" class="timeline-current">
          {{ currentEvent.year ? currentEvent.year + ' · ' : '' }}{{ currentEvent.title }}
        </span>
      </div>
    </section>

    <nav class="timeline-wrapper container" aria-label="Seerah timeline">
      <ol class="timeline mb-3" role="list" @keydown="onTimelineKeydown" ref="timelineNav" tabindex="0">
        <li v-for="(event, index) in events" :key="event.id || event.year || index" class="timeline-point"
          role="listitem" ref="eventRefs">
          <button class="badge fs-6 timeline-badge" type="button" :class="{ active: index === currentIndex }"
            :aria-current="index === currentIndex ? 'step' : null"
            :aria-label="`Year ${event.year}. ${index === currentIndex ? 'Current event' : 'Activate to view details'}`"
            :tabindex="index === currentIndex ? 0 : -1" @click="selectEvent(index)">
            {{ event.year }}
          </button>
        </li>
      </ol>
    </nav>

    <section class="mission-map-shell container">
      <seerah-map-component class="seerah-map-theme" :class="{ 'is-dark': isDarkMode }" :points="mapPoints" :active-index="currentIndex" :loading="mapLoading" :error="mapError"
        @point-selected="onMapPointSelected" />
    </section>

    <transition name="fade" mode="out-in" class="container">
      <div v-if="events.length" :key="currentIndex" class="event-box event-details" role="region"
        :aria-labelledby="`event-title-${currentIndex}`" ref="eventDetails">
        <div v-if="copySuccess" class="alert alert-success" role="status" aria-live="polite">
          Text copied to clipboard!
        </div>

        <div class="event-header">
          <div class="event-header__main">
            <p class="event-kicker">Event {{ displayIndex }} of {{ events.length }}</p>
            <h2 class="event-title" :id="`event-title-${currentIndex}`">{{ events[currentIndex].title }}</h2>
            <div class="event-year-chip">
              <i class="bi bi-calendar3 me-1"></i>
              {{ currentEvent.year || 'Historic moment' }}
            </div>
          </div>
          <div class="event-header__stats">
            <span class="stat-chip">
              <i class="bi bi-book me-1"></i>Read <strong>{{ readTime }}m</strong>
            </span>
            <span class="stat-chip">
              <i class="bi bi-headphones me-1"></i>Listen <strong>{{ listenTime }}m</strong>
            </span>
            <span class="stat-chip">
              <i class="bi bi-file-earmark-word me-1"></i>Words <strong>{{ wordCount }}</strong>
            </span>
          </div>
        </div>

        <!-- Combined Controls and Info Row -->
        <div class="event-actions">
          <!-- Actions Toolbar (evenly spaced row) -->
          <div class="action-row shadow-sm bg-white" role="toolbar" aria-label="Event actions toolbar">
            <!-- AI Summary -->
            <div class="action-group" role="group" aria-label="AI tools">
              <button class="action-item" @click="summarizeEvent" :disabled="summaryLoading"
                :aria-busy="summaryLoading ? 'true' : 'false'" title="AI Summary" aria-label="AI Summary">
                <i class="bi" :class="summaryLoading ? 'bi-hourglass-split' : 'bi-robot'"></i>
                <span class="label d-none d-sm-inline">{{ summaryLoading ? 'Generating...' : 'AI Summary'
                }}</span>
              </button>
            </div>

            <div class="row-sep d-none d-sm-inline" aria-hidden="true"></div>

            <!-- Font size controls -->
            <div class="action-group" role="group" aria-label="Font size">
              <button class="action-item" @click="decFont" title="Decrease font size" aria-label="Decrease font size">
                <span class="fw-semibold">A−</span>
                <span class="label d-none d-md-inline ms-1">Smaller</span>
              </button>
              <button class="action-item" @click="incFont" title="Increase font size" aria-label="Increase font size">
                <span class="fw-semibold">A+</span>
                <span class="label d-none d-md-inline ms-1">Larger</span>
              </button>
            </div>

            <div class="row-sep d-none d-sm-inline" aria-hidden="true"></div>

            <!-- Share and copy -->
            <div class="action-group" role="group" aria-label="Share and copy">
              <button class="action-item action-success" @click="shareOnWhatsApp" title="Share on WhatsApp"
                aria-label="Share on WhatsApp">
                <i class="bi bi-whatsapp"></i>
                <span class="label d-none d-md-inline ms-1">WhatsApp</span>
              </button>
              <button class="action-item" @click="copyToClipboard" title="Copy text" aria-label="Copy text">
                <i class="bi bi-clipboard"></i>
                <span class="label d-none d-md-inline ms-1">Copy</span>
              </button>
              <button class="action-item action-primary" @click="printEvent" title="Print" aria-label="Print">
                <i class="bi bi-printer"></i>
                <span class="label d-none d-md-inline ms-1">Print</span>
              </button>
              <button class="action-item action-danger" @click="downloadPdf" title="Download PDF"
                aria-label="Download PDF">
                <i class="bi bi-file-earmark-pdf"></i>
                <span class="label d-none d-md-inline ms-1">PDF</span>
              </button>
            </div>

            <div class="row-sep d-none d-sm-inline" aria-hidden="true"></div>

            <!-- Export -->
            <div class="action-group" role="group" aria-label="Export">

              <!-- Play Button aligned to the end -->
              <button class="play-toggle play-btn-circle" :class="{ playing: isAudioPlaying[currentIndex] }"
                :aria-label="isAudioPlaying[currentIndex] ? 'Pause audio' : 'Play audio'"
                :aria-pressed="isAudioPlaying[currentIndex] ? 'true' : 'false'" @click="toggleAudioPlayer(currentIndex)"
                @keydown.enter.prevent="toggleAudioPlayer(currentIndex)"
                @keydown.space.prevent="toggleAudioPlayer(currentIndex)"
                :title="isAudioPlaying[currentIndex] ? 'Pause' : 'Play'">
                <i class="bi play-icon"
                  :class="isAudioPlaying[currentIndex] ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- AI Summary and Play Button Row -->

        <!-- AI Summary Section (Premium) -->
        <transition name="fade-slide" class="card-teal">
          <div v-if="summaryText && isVisible && showSummaryBox"
            class="ai-summary-inline card-teal premium-surface mt-3 mt-md-4 p-2 p-md-3 rounded-20 animate-rise"
            ref="summarySection">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="mb-0 text-dark small">
                <i class="bi bi-robot me-1 me-sm-2"></i>
                AI Summary
              </h6>
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-secondary subtle-btn" @click="toggleSummary"
                  :title="showSummary ? 'Hide Summary' : 'Show Summary'" :aria-expanded="showSummary ? 'true' : 'false'"
                  aria-controls="ai-summary-panel">
                  <i class="bi" :class="showSummary ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary subtle-btn" @click="closeSummaryBox"
                  title="Close summary" aria-label="Close summary">
                  <i class="bi bi-x"></i>
                </button>
              </div>
            </div>

            <transition name="fade-slide">
              <div v-show="showSummary" id="ai-summary-panel" role="region" aria-live="polite">
                <div class="summary-text small" v-html="summaryText"></div>
                <div class="summary-footer mt-2 pt-2 border-top">
                  <small class="text-muted">
                    <i class="bi bi-info-circle me-1"></i>
                    AI-generated summary of key points from this event.
                  </small>
                </div>
              </div>
            </transition>
          </div>
        </transition>
        <div v-if="summaryError" class="alert alert-danger mt-2">
          {{ summaryError }}
        </div>

        <!-- Premium Content Card -->
        <div class="content-card rounded-20 animate-rise" :style="contentVars">
          <article class="content-body" v-html="highlightedDescription"></article>
        </div>
        <div v-if="events[currentIndex].references" class="mt-2 small text-muted">
          <strong>References: </strong>
          <span>{{ events[currentIndex].references }}</span>
        </div>



        <!-- Offcanvas Settings Panel -->
        <div class="offcanvas offcanvas-end custom-offcanvas" tabindex="-1" id="settingsOffcanvas"
          aria-labelledby="settingsOffcanvasLabel" :style="offcanvasStyle">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title fs-3" id="settingsOffcanvasLabel">Font Settings</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
          </div>
          <div class="d-flex flex-column">
            <form @submit.prevent="saveSettings" class="text-white">
              <div class="d-flex flex-column gap-3">
                <div v-if="showSuccess" class="alert alert-success">
                  Changes saved successfully!
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Background Color</label>
                  <input type="color" v-model="fontSettings.backgroundColor" class="form-control form-control-color" />
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Text Color</label>
                  <input type="color" v-model="fontSettings.color" class="form-control form-control-color" />
                </div>
                <label class="form-label fw-bold fs-4">Font Size:</label>
                <div class="d-flex align-items-center gap-3">
                  <div class="btn btn-outline-light px-2 py-0" @click.stop="decreaseFontSize">−</div>
                  <div class="fw-bold fs-5">{{ fontSize }}px</div>
                  <div class="btn btn-outline-light px-2 py-1" @click.stop="increaseFontSize">+</div>
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Font Style</label>
                  <select v-model="fontSettings.fontStyle" class="form-select">
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                  </select>
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Text Shadow</label>
                  <select v-model="fontSettings.textShadow" class="form-select">
                    <option value="none">None</option>
                    <option value="1px 1px 2px gray">Small Shadow</option>
                    <option value="2px 2px 4px black">Medium Shadow</option>
                    <option value="1px 1px 2px red">Red Shadow</option>
                    <option value="1px 1px 2px blue">Blue Shadow</option>
                  </select>
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Underline</label>
                  <select v-model="fontSettings.textDecoration" class="form-select">
                    <option value="none">None</option>
                    <option value="underline">Underline</option>
                  </select>
                </div>
                <div>
                  <label class="form-label fw-bold fs-4">Font Family</label>
                  <select v-model="fontSettings.fontFamily" class="form-select">
                    <option value="'Manrope', 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif">Manrope (Default)</option>
                    <option value="'Nunito', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif">Nunito</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="Tahoma, sans-serif">Tahoma</option>
                    <option value="'Segoe UI', sans-serif">Segoe UI</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lato', sans-serif">Lato</option>
                    <option value="'Merriweather', serif">Merriweather</option>
                    <option value="'Noto Sans', sans-serif">Noto Sans</option>
                    <option value="'Poppins', sans-serif">Poppins</option>
                  </select>
                </div>
              </div>
              <button class="btn btn-success mt-3" @click="submitFontSize">
                Submit Changes
              </button>
            </form>
          </div>
        </div>

        <div class="controls text-center mt-3 mt-md-4" :class="{ 'mb-audio-gap': showAudioPlayer }">
          <button @click="prev" :disabled="currentIndex === 0" class="btn nav-btn me-2 btn-sm"
            aria-label="Previous event">Previous</button>
          <button @click="next" :disabled="currentIndex === events.length - 1" class="btn nav-btn btn-sm"
            aria-label="Next event">Next</button>
        </div>
      </div>
    </transition>

    <!-- Global Custom Audio Player -->
    <div v-if="showAudioPlayer" class="audio-player-container" role="region" aria-label="Audio player">
      <div class="custom-audio-player">
        <div class="player-main-row">
          <div class="player-title-block">
            <span class="player-title">{{ currentEvent && currentEvent.title ? currentEvent.title : 'Seerah audio' }}</span>
            <span class="player-subtitle">Recitation</span>
          </div>
          <div class="player-center-strip">
            <div class="control-row" aria-label="Playback controls">
              <button class="icon-btn" @click="rewindAudio(currentlyPlayingIndex)" title="Rewind 10 seconds"
                aria-label="Rewind 10 seconds">
                <i class="bi bi-skip-backward-fill"></i>
              </button>
              <button class="icon-btn icon-btn--primary" @click="toggleAudioPlayer(currentlyPlayingIndex)"
                :title="isAudioPlaying[currentlyPlayingIndex] ? 'Pause' : 'Play'"
                :aria-label="isAudioPlaying[currentlyPlayingIndex] ? 'Pause audio' : 'Play audio'">
                <i class="bi" :class="isAudioPlaying[currentlyPlayingIndex] ? 'bi-pause-fill' : 'bi-play-fill'"></i>
              </button>
              <button class="icon-btn" @click="fastForwardAudio(currentlyPlayingIndex)" title="Fast forward 10 seconds"
                aria-label="Fast forward 10 seconds">
                <i class="bi bi-skip-forward-fill"></i>
              </button>
              <button class="icon-btn" @click="stopAudio(currentlyPlayingIndex)" title="Stop" aria-label="Stop audio">
                <i class="bi bi-stop-fill"></i>
              </button>
            </div>
            <div class="player-inline-progress">
              <div class="progress-track" role="progressbar" :aria-valuemin="0" :aria-valuemax="100"
                :aria-valuenow="Math.round(progress[currentlyPlayingIndex] || 0)"
                :aria-valuetext="`Progress ${Math.round(progress[currentlyPlayingIndex] || 0)} percent`"
                @click="seekAudio($event, currentlyPlayingIndex)">
                <div class="progress-fill" :style="{ width: progress[currentlyPlayingIndex] + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="player-utility">
            <button class="icon-btn" @click="toggleMute" :title="volume > 0 ? 'Mute' : 'Unmute'"
              :aria-label="volume > 0 ? 'Mute audio' : 'Unmute audio'">
              <i class="bi" :class="`bi-volume-${volume > 0.5 ? 'up' : volume > 0 ? 'down' : 'mute'}-fill`"></i>
            </button>
            <input class="volume-slider" type="range" min="0" max="1" step="0.01" :value="volume"
              @input="setPlayerVolume($event.target.value)" aria-label="Volume" />
            <button class="icon-btn icon-btn--close" @click="closeAudioPlayer" title="Close"
              aria-label="Close audio player">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../scripts/MissionComponent.script.js"></script>
<style scoped src="../styles/MissionComponent.style.css"></style>
<style src="./MissionComponent.global.css"></style>
