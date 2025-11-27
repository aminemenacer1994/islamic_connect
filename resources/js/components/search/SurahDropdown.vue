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

    <div class="helper">
      "And We have certainly made the Qur’an easy to remember." 54:17
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
  background: linear-gradient(135deg, rgba(11,128,111,.08), rgba(26,95,122,.08));
  border: 1px solid rgba(11,128,111,.18);
  border-radius: 20px;
  padding: 10px 10px;
  margin-bottom: 5px;
  box-shadow: 0 12px 28px rgba(26, 95, 122, .12);
}

.header { margin-bottom: 8px; }
.title {
  font-weight: 800;
  letter-spacing: .02em;
  color: #0b806f;
}
.subtitle {
  font-size: .9rem;
  color: #3a5561;
}

.w-100 { width: 100%; }

.glossy :deep(.p-dropdown) {
  width: 100%;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #aed4ff;
  box-shadow: 0 10px 30px rgba(15, 121, 196, 0.18);
  transition: border-color .15s ease, box-shadow .2s ease;
  position: relative;
  padding: 2px;
}
.glossy :deep(.p-dropdown):hover {
  border-color: #6db5ff;
  box-shadow: 0 16px 40px rgba(15, 121, 196, 0.25);
}
.glossy :deep(.p-dropdown-label) {
  padding-right: 32px;
  display: flex;
  align-items: center;
  width: 100%;
}
.glossy :deep(.p-inputtext) {
  font-size: 1.05rem;
  padding: .9rem 1rem;
  border-radius: 12px;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(15, 121, 196, 0.2);
  background: #fff;
  flex: 1;
  width: auto;
}
.glossy :deep(.p-dropdown-trigger) {
  height: 100%;
}
.glossy :deep(.p-dropdown-panel) {
  margin-top: 6px;
  border-radius: 16px;
  border: 1px solid #dfe7ee;
  box-shadow: 0 40px 60px rgba(20, 60, 120, 0.25);
  width: calc(100% + 4px);
  left: -2px;
  background: #fff;
  padding: .5rem 0;
  z-index: 1055;
}
.glossy :deep(.p-dropdown-panel .p-dropdown-items) {
  max-height: 300px;
}
.glossy :deep(.p-dropdown-panel .p-dropdown-item) {
  padding: 0.7rem 1.25rem;
  font-size: 1rem;
  color: #0f3c52;
  display: flex;
  align-items: center;
  gap: .75rem;
}
.glossy :deep(.p-dropdown-panel .p-dropdown-item.p-highlight) {
  background: #f2f8ff;
}
.glossy :deep(.p-dropdown-panel .p-dropdown-header) {
  padding: 0 1.25rem .25rem;
}
.glossy :deep(.p-dropdown-panel .p-dropdown-filter) {
  width: calc(100% - 2.5rem);
  margin: 0 1.25rem 0;
  padding: .9rem 1rem;
  border-radius: 12px;
  border: 1px solid #dfe7ee;
  box-shadow: none;
  font-size: 1rem;
}
.glossy :deep(.p-dropdown-panel .p-dropdown-filter:focus) {
  border-color: #83b4ff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(131, 180, 255, 0.3);
}
.glossy :deep(.p-dropdown-arrow) {
  color: #0f3c52;
  font-size: 1.25rem;
}

.item { display: flex; align-items: baseline; gap: .6rem; }
.item .num { font-weight: 700; color: #1a5f7a; min-width: 2ch; text-align: right; }
.item .en { font-weight: 600; color: #102a43; }
.item .ar { margin-left: auto; font-family: 'Scheherazade', serif; font-size: 1.05rem; color: #0b806f; }


.helper {
  margin-top: 10px;
  font-size: .85rem;
  color: #5c7280;
  text-align: center;
}
</style>
