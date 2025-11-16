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
  background: #ffffffcc;
  backdrop-filter: blur(6px);
  border-radius: 20px;
  border: 1px solid rgba(11,128,111,.25);
  box-shadow: 0 10px 24px rgba(11,128,111,.18);
  transition: transform .15s ease, box-shadow .15s ease;
}
.glossy :deep(.p-dropdown:hover) { transform: translateY(-1px); box-shadow: 0 14px 32px rgba(11,128,111,.24); }
.glossy :deep(.p-dropdown .p-inputtext) { font-size: 1.05rem; padding: .85rem 1rem; }

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
