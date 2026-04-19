<template>
  <div
    id="revert-stories-section"
    class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography"
    :style="sectionStyle"
  >
    <div class="card-header d-flex align-items-center gap-3 flex-wrap py-3">
      <div class="d-flex align-items-start gap-3 flex-grow-1 min-width-0">
        <span class="card-header-icon">
          <i class="bi bi-people-fill"></i>
        </span>
        <div>
          <h3 class="fw-bold mb-1">Revert Stories</h3>
          <p class="text-muted small mb-0">Short journeys from our community, handpicked for this chapter.</p>
          <div class="section-explainer section-explainer--compact">
            <span><strong>What:</strong> Real conversion stories.</span>
            <span><strong>Purpose:</strong> Bring human warmth to the lesson.</span>
            <span><strong>Aim:</strong> Show that questions and growth are normal.</span>
            <span><strong>Result:</strong> You feel less alone on the path.</span>
          </div>
        </div>
      </div>
      <div class="section-control-stack ms-auto">
        <div class="section-font-controls" role="group" aria-label="Revert stories font size">
          <button
            type="button"
            class="section-font-btn"
            :disabled="isSectionFontMin"
            aria-label="Decrease revert stories font size"
            @click="$emit('decrease-font')"
          >
            A-
          </button>
          <button
            type="button"
            class="section-font-btn"
            :disabled="isSectionFontMax"
            aria-label="Increase revert stories font size"
            @click="$emit('increase-font')"
          >
            A+
          </button>
          <button
            type="button"
            class="section-toggle-btn card-toggle-btn"
            :aria-expanded="visible"
            :aria-label="visible ? 'Collapse revert stories' : 'Expand revert stories'"
            @click="$emit('toggle-visibility')"
          >
            <i class="bi" :class="visible ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-show="visible" class="card-body px-4 py-3">
      <div class="row g-3 video-grid-row">
        <div v-for="video in videos" :key="video.title" class="col-12 col-md-3">
          <article
            class="video-card shadow-sm overflow-hidden h-100"
            @mouseenter="startPreview(video)"
            @mouseleave="stopPreview()"
            @click="handleVideoCardClick(video)"
            @touchstart.stop="handleVideoCardTouch(video)"
          >
            <div class="video-card-media">
              <div
                v-if="isPlayingVideo(video) || isVideoPreviewing(video)"
                class="video-feature"
                :style="thumbnailStyle(video)"
              >
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
                  loading="lazy"
                ></iframe>
              </div>
              <div
                v-else
                class="video-feature"
                :style="thumbnailStyle(video)"
              >
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
        <button type="button" class="btn-see-more" @click="$emit('open-modal')">
          See more videos
          <i class="bi bi-box-arrow-up-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoGallery',
  props: {
    sectionStyle: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: true
    },
    isSectionFontMin: {
      type: Boolean,
      default: false
    },
    isSectionFontMax: {
      type: Boolean,
      default: false
    },
    videos: {
      type: Array,
      default: () => []
    },
    isPlayingVideo: {
      type: Function,
      required: true
    },
    isVideoPreviewing: {
      type: Function,
      required: true
    },
    thumbnailStyle: {
      type: Function,
      required: true
    },
    formatVideoUrl: {
      type: Function,
      required: true
    },
    shouldAutoplayVideo: {
      type: Function,
      required: true
    },
    handleVideoCardClick: {
      type: Function,
      required: true
    },
    handleVideoCardTouch: {
      type: Function,
      required: true
    },
    startPreview: {
      type: Function,
      required: true
    },
    stopPreview: {
      type: Function,
      required: true
    },
    videoTags: {
      type: Function,
      required: true
    }
  },
  emits: ['decrease-font', 'increase-font', 'toggle-visibility', 'open-modal']
}
</script>
