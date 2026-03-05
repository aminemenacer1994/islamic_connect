<template>
  <div
    id="resources-section"
    class="content-card onboarding-card mb-4 rounded-5 shadow-lg section-typography resources-shell"
    :style="sectionStyle"
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
      <div class="section-control-stack ms-auto">
        <div class="section-font-controls" role="group" aria-label="Resources font size">
          <button
            type="button"
            class="section-font-btn"
            :disabled="isSectionFontMin"
            aria-label="Decrease resources font size"
            @click="$emit('decrease-font')"
          >
            A-
          </button>
          <button
            type="button"
            class="section-font-btn"
            :disabled="isSectionFontMax"
            aria-label="Increase resources font size"
            @click="$emit('increase-font')"
          >
            A+
          </button>
          <button
            type="button"
            class="section-toggle-btn card-toggle-btn"
            :aria-expanded="visible"
            :aria-label="visible ? 'Collapse resources' : 'Expand resources'"
            @click="$emit('toggle-visibility')"
          >
            <i class="bi" :class="visible ? 'bi-dash-lg' : 'bi-plus-lg'"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-show="visible" class="resources-body">
      <div class="resources-intro">
        <div class="resources-intro-text">
          <p class="resource-lead mb-0">Foundational references and practical tools for this chapter.</p>
          <p v-if="globalSearchActive" class="resource-filter-note mb-0">
            Showing matches for "<span class="resource-filter-term">{{ resourceSearchTerm }}</span>".
          </p>
          <p class="resource-entry-hint text-muted small mb-0">
            Tap the clipboard icon next to any entry to copy the reference or resource detail for quick notes.
          </p>
        </div>
      </div>
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
            <h4 class="resource-section-title" v-html="highlightResourceText(section.displayTitle || section.title)"></h4>
            <button
              type="button"
              class="section-toggle-btn"
              :class="{ collapsed: !isSectionVisible(section.toggleKey) }"
              :aria-expanded="isSectionVisible(section.toggleKey)"
              :aria-controls="`resource-section-${section.toggleKey}`"
              :aria-label="isSectionVisible(section.toggleKey) ? 'Collapse resource section' : 'Expand resource section'"
              @click="toggleSectionVisibility(section.toggleKey)"
            >
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
                    <div class="resource-entry-body">
                      <p
                        v-if="resourceEntryParts(entry).reference"
                        class="resource-entry-reference"
                        v-html="formatResourceReferenceEntry(resourceEntryParts(entry).reference)"
                      ></p>
                      <p
                        v-if="resourceEntryParts(entry).detail"
                        class="resource-entry-detail"
                        v-html="formatResourceEntry(resourceEntryParts(entry).detail, item.label)"
                      ></p>
                    </div>
                    <div class="resource-entry-actions">
                      <button
                        type="button"
                        class="resource-entry-copy-btn"
                        :title="`Copy reference for ${item.label || section.title || 'resource'}`"
                        :aria-label="`Copy reference for ${item.label || section.title || 'resource'}`"
                        @click.stop="copyResourceEntry(entry)"
                      >
                        <i class="bi bi-clipboard"></i>
                        <span class="visually-hidden">Copy reference</span>
                      </button>
                    </div>
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
</template>

<script>
export default {
  name: 'ResourcePanel',
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
    resourceSectionsWithKeys: {
      type: Array,
      default: () => []
    },
    currentChapterResourcesLayout: {
      type: Object,
      default: null
    },
    globalSearchActive: {
      type: Boolean,
      default: false
    },
    resourceSearchTerm: {
      type: String,
      default: ''
    },
    highlightResourceText: {
      type: Function,
      required: true
    },
    isSectionVisible: {
      type: Function,
      required: true
    },
    toggleSectionVisibility: {
      type: Function,
      required: true
    },
    resourceEntryParts: {
      type: Function,
      required: true
    },
    formatResourceReferenceEntry: {
      type: Function,
      required: true
    },
    formatResourceEntry: {
      type: Function,
      required: true
    },
    copyResourceEntry: {
      type: Function,
      required: true
    }
  },
  emits: ['decrease-font', 'increase-font', 'toggle-visibility']
}
</script>
