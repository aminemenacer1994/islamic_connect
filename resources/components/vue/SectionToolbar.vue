<template>
  <div class="section-toolbar" role="group" aria-label="Section utility controls">
    <div class="section-toolbar__inner">
      <button
        class="section-toolbar__button section-toolbar__button--whatsapp"
        type="button"
        @click="$emit('whatsapp-share', sectionId)"
        :aria-label="`Share ${sectionTitle || 'this section'} via WhatsApp Web`"
      >
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
        <span>WhatsApp</span>
      </button>
      <button
        class="section-toolbar__button section-toolbar__button--copy"
        type="button"
        @click="$emit('copy-section', sectionId)"
        :aria-label="`Copy ${sectionTitle || 'this section'} to clipboard`"
      >
        <i class="fas fa-copy" aria-hidden="true"></i>
        <span>Copy</span>
      </button>
      <button
        class="section-toolbar__button section-toolbar__button--print"
        type="button"
        @click="$emit('print-section', sectionId)"
        :aria-label="`Print ${sectionTitle || 'this section'}`"
      >
        <i class="fas fa-print" aria-hidden="true"></i>
        <span>Print</span>
      </button>
      <button
        class="section-toolbar__button section-toolbar__button--pdf"
        type="button"
        @click="$emit('export-pdf', sectionId)"
        :aria-label="`Download ${sectionTitle || 'this section'} as PDF`"
      >
        <i class="fas fa-file-pdf" aria-hidden="true"></i>
        <span>PDF</span>
      </button>
      <button
        class="section-toolbar__button section-toolbar__button--text section-toolbar__button--smaller"
        type="button"
        @click="$emit('adjust-font', { sectionId, delta: -0.1 })"
        :aria-label="`Decrease font size for ${sectionTitle || 'this section'}`"
      >
        <span aria-hidden="true">A-</span>
      </button>
      <button
        class="section-toolbar__button section-toolbar__button--text section-toolbar__button--larger"
        type="button"
        @click="$emit('adjust-font', { sectionId, delta: 0.1 })"
        :aria-label="`Increase font size for ${sectionTitle || 'this section'}`"
      >
        <span aria-hidden="true">A+</span>
      </button>
    </div>
    <span v-if="sectionFeedback" class="section-toolbar__feedback" role="status">
      {{ sectionFeedback }}
    </span>
  </div>
</template>

<script>
export default {
  name: "SectionToolbar",
  props: {
    sectionId: {
      type: String,
      required: true,
    },
    sectionTitle: {
      type: String,
      default: "",
    },
    sectionFeedback: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.section-toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.section-toolbar__inner {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  padding: 0.45rem 0.75rem;
  border-radius: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  justify-content: flex-start;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 0.75rem;
}

.section-toolbar__button {
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
  min-height: 38px;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.75);
  color: var(--r-ink);
  flex-shrink: 0;
  white-space: nowrap;
  scroll-snap-align: start;
}

.section-toolbar__button--smaller {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(15, 34, 48, 0.15);
  color: #0f1d2c;
}

.section-toolbar__button--larger {
  background: rgba(31, 122, 104, 0.1);
  border-color: rgba(31, 122, 104, 0.3);
  color: var(--r-accent-deep, #156d59);
}

.section-toolbar__button .fab,
.section-toolbar__button .fas {
  font-size: 0.9rem;
}

.section-toolbar__button--text {
  min-width: 45px;
  justify-content: center;
  font-weight: 600;
}

.section-toolbar__button::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.4), transparent 70%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.section-toolbar__button:hover,
.section-toolbar__button:focus-visible {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(15, 34, 48, 0.18);
}

.section-toolbar__button:hover::after,
.section-toolbar__button:focus-visible::after {
  opacity: 1;
}

.section-toolbar__button--whatsapp {
  border-color: rgba(31, 122, 104, 0.6);
  color: var(--r-accent);
  background: linear-gradient(120deg, rgba(31, 122, 104, 0.12), rgba(31, 122, 104, 0.04));
}

.section-toolbar__button--copy {
  border-color: rgba(17, 92, 145, 0.45);
  color: #115a91;
  background: linear-gradient(120deg, rgba(17, 92, 145, 0.1), rgba(17, 92, 145, 0.02));
}

.section-toolbar__button--print {
  border-color: rgba(12, 24, 36, 0.35);
  color: var(--r-deep);
  background: linear-gradient(120deg, rgba(12, 24, 36, 0.12), rgba(12, 24, 36, 0.02));
}

.section-toolbar__button--pdf {
  border-color: rgba(176, 26, 26, 0.4);
  color: #b01a1a;
  background: linear-gradient(120deg, rgba(176, 26, 26, 0.12), rgba(176, 26, 26, 0.02));
}

.section-toolbar__feedback {
  font-size: 0.8rem;
  color: #0b3d2e;
}

.section-toolbar__inner::-webkit-scrollbar {
  height: 4px;
}

.section-toolbar__inner::-webkit-scrollbar-thumb {
  background: rgba(15, 34, 48, 0.25);
  border-radius: 999px;
}

@media (max-width: 640px) {
  .section-toolbar__inner {
    justify-content: flex-start;
    padding-right: 0.35rem;
  }
  .section-toolbar__button {
    font-size: 0.8rem;
    min-height: 34px;
    padding: 0.3rem 0.75rem;
  }
  .section-toolbar__button--text {
    min-width: 36px;
  }
}

</style>
