<template>
  <div class="tab-content mb-1" id="nav-tabContent" v-if="!dropdownHidden">
    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
      <form style="cursor: pointer; border-radius:5px;">
        <select class="form-control mobile-only hide-on-full-screen hide-on-tablet right-side-form select-shadow" v-model="selectedAyahId" @change="handleAyahChange">
          <option value="0" disabled>Select Ayah</option>
          <option v-for="(ayah, index) in ayat" :key="index" :value="index">{{ ayah.ayah_text }} : {{ ayah.ayah_id }}</option>
        </select>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dropdownHidden: {
      type: Boolean,
      required: true
    },
    selectedAyahId: {
      type: [String, Number],
      required: true
    },
    ayat: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleAyahChange(event) {
      this.$emit('ayah-change', event.target.value);
    }
  }
};
</script>
