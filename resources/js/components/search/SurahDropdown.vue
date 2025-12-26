<template>
  <div class="surah-picker">
    <div class="header">
      <div class="title">Begin Your Recitation & Select a Surah:</div>
      <div class="subtitle">Search or browse all 114 Surahs</div>
    </div>

    <div class="picker">
      <Dropdown
        aria-label="Select a Surah"
        :options="dropdownOptions"
        optionLabel="label"
        optionValue="value"
        appendTo="self"
        :filter="true"
        filterBy="label,ar"
        showClear
        scrollHeight="352px"
        :virtualScrollerOptions="{ itemSize: 44 }"
        :value="selectedSurahLocal"
        placeholder="Type to search..."
        class="p-inputtext-md w-100 glossy"
        @change="onDropdownChange"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="item">
            <span class="num">{{ slotProps.value }}</span>
            <span class="en">{{ optionById(slotProps.value)?.en }}</span>
            <span class="ar">{{ optionById(slotProps.value)?.ar }}</span>
          </div>
          <span v-else>Type to search...</span>
        </template>

        <template #option="{ option }">
          <div class="item">
            <span class="num">{{ option.value }}</span>
            <span class="en">{{ option.en }}</span>
            <span class="ar">{{ option.ar }}</span>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
  
</template>

<script>
export default {
    name: "SurahDropdown",

    props: {
        selectedSurah: {
            type: Number,
            default: null,
        },
        filteredSurah: {
            type: Array,
            default: () => [],
        },
        surat: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            selectedSurahLocal: this.selectedSurah || null,
        };
    },

    computed: {
        displayedSurahs() {
            return this.filteredSurah.length ? this.filteredSurah : this.surat;
        },
        dropdownOptions() {
            return (this.displayedSurahs || []).map(s => ({
                value: Number(s.id),
                label: `${s.id} · ${s.name_en}`,
                en: s.name_en,
                ar: s.name_ar,
            }));
        }
    },

    methods: {
        onDropdownChange(e) {
            const newValue = Number(e.value || 0) || null;
            this.selectedSurahLocal = newValue;
            if (newValue !== null) {
                this.$emit("update:selectedSurah", newValue);
                this.$emit("fetchAyat", newValue);
            }
        },
        optionById(id) {
            return this.dropdownOptions.find(o => o.value === Number(id));
        }
    },
};
</script>

<style scoped>
.surah-picker {
  --ink: #1d2b2f;
  --muted: #5a6b6a;
  --accent: #0f6e63;
  --accent-2: #c58a35;
  --accent-3: #1f7a6d;
  --surface: #fff6ea;
  --surface-2: #ffffff;
  --stroke: rgba(15, 110, 99, 0.18);
  background:
    radial-gradient(220px 180px at 6% 18%, rgba(197, 138, 53, 0.22), transparent 70%),
    radial-gradient(240px 190px at 90% 10%, rgba(15, 110, 99, 0.22), transparent 68%),
    linear-gradient(140deg, #fff7ec 0%, #f3fbf7 45%, #eef6f3 100%);
  border: 1px solid var(--stroke);
  border-radius: 24px;
  padding: 18px 18px 16px;
  margin-bottom: 10px;
  box-shadow: 0 24px 52px rgba(16, 54, 50, 0.14);
  position: relative;
  overflow: visible;
  color: var(--ink);
}

.surah-picker::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.6), transparent 55%),
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.45), transparent 50%),
    repeating-linear-gradient(
      130deg,
      rgba(15, 110, 99, 0.06) 0 10px,
      rgba(15, 110, 99, 0) 10px 22px
    );
  opacity: 0.7;
  pointer-events: none;
}

.surah-picker::after {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  top: 0;
  height: 4px;
  border-radius: 0 0 12px 12px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3));
  opacity: 0.8;
}

.surah-picker > * {
  position: relative;
  z-index: 1;
}

.header {
  display: grid;
  gap: 4px;
  margin-bottom: 10px;
  animation: rise-in 0.5s ease-out both;
}

.title {
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
  font-size: 1.02rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(15, 110, 99, 0.12);
  border: 1px solid rgba(15, 110, 99, 0.2);
  width: fit-content;
}



.subtitle {
  font-size: 0.9rem;
  color: var(--muted);
}

.picker {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid rgba(15, 110, 99, 0.18);
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(8px);
  animation: rise-in 0.55s ease-out 0.08s both;
  z-index: 2;
}

.w-100 { width: 100%; }

.glossy :deep(.p-dropdown) {
  width: 100%;
  background: var(--surface-2);
  border-radius: 18px;
  border: 1px solid rgba(15, 110, 99, 0.25);
  box-shadow: 0 14px 26px rgba(16, 54, 50, 0.12);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  position: relative;
  padding: 3px;
}

.glossy :deep(.p-dropdown):hover {
  border-color: rgba(15, 110, 99, 0.5);
  box-shadow: 0 20px 36px rgba(16, 54, 50, 0.2);
  transform: translateY(-1px);
}

.glossy :deep(.p-dropdown.p-focus) {
  border-color: var(--accent-3);
  box-shadow: 0 0 0 3px rgba(15, 110, 99, 0.18), 0 18px 34px rgba(16, 54, 50, 0.2);
}

.glossy :deep(.p-dropdown-label) {
  padding-right: 32px;
  display: flex;
  align-items: center;
  width: 100%;
}

.glossy :deep(.p-dropdown-trigger),
.glossy :deep(.p-dropdown-trigger-icon),
.glossy :deep(.p-dropdown-arrow) {
  display: none;
}

.glossy :deep(.p-inputtext) {
  font-size: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(15, 110, 99, 0.16);
  background: linear-gradient(180deg, #ffffff, #f8faf7);
  flex: 1;
  width: auto;
}

.glossy :deep(.p-dropdown-panel) {
  margin-top: 8px;
  border-radius: 18px;
  border: 1px solid rgba(17, 60, 70, 0.12);
  box-shadow: 0 30px 50px rgba(16, 54, 50, 0.22);
  width: calc(100% + 4px);
  left: -2px;
  background: #ffffff;
  padding: 0.5rem 0;
  z-index: 1055;
}

.glossy :deep(.p-dropdown-panel .p-dropdown-items) {
  max-height: 300px;
}

.glossy :deep(.p-dropdown-panel .p-dropdown-item) {
  padding: 0.72rem 1.25rem;
  font-size: 0.98rem;
  color: #17383d;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-radius: 10px;
  margin: 0 0.35rem;
}

.glossy :deep(.p-dropdown-panel .p-dropdown-item:hover) {
  background: rgba(15, 110, 99, 0.08);
}

.glossy :deep(.p-dropdown-panel .p-dropdown-item.p-highlight) {
  background: rgba(197, 138, 53, 0.14);
}

.glossy :deep(.p-dropdown-panel .p-dropdown-header) {
  padding: 0 1.25rem 0.35rem;
}

.glossy :deep(.p-dropdown-panel .p-dropdown-filter) {
  width: calc(100% - 2.5rem);
  margin: 0 1.25rem 0;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(17, 60, 70, 0.18);
  box-shadow: none;
  font-size: 0.98rem;
}

.glossy :deep(.p-dropdown-panel .p-dropdown-filter:focus) {
  border-color: rgba(15, 110, 99, 0.65);
  outline: none;
  box-shadow: 0 0 0 3px rgba(15, 110, 99, 0.2);
}

.glossy :deep(.p-dropdown-arrow) {
  color: #124147;
  font-size: 1.25rem;
}

.item {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  width: 100%;
}

.item .num {
  font-weight: 700;
  color: #0f6e63;
  min-width: 2.2ch;
  text-align: right;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: rgba(15, 110, 99, 0.12);
  font-variant-numeric: tabular-nums;
}

.item .en {
  font-weight: 600;
  color: #1f2f33;
}

.item .ar {
  margin-left: auto;
  font-family: 'Scheherazade', serif;
  font-size: 1.05rem;
  color: #137166;
}

.helper {
  margin-top: 14px;
  padding: 0.65rem 0.95rem;
  border-radius: 14px;
  font-size: 0.86rem;
  color: #4b5e61;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(15, 110, 99, 0.16);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  animation: rise-in 0.55s ease-out 0.16s both;
  z-index: 1;
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .surah-picker {
    padding: 14px 12px;
  }

  .title {
    font-size: 0.98rem;
  }

  .subtitle {
    font-size: 0.86rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .header,
  .picker,
  .helper {
    animation: none;
  }
}
</style>
