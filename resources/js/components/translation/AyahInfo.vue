<template>
  <div class="container">
    <h5 class="mr-2 container">
      <b class="container-fluid"><img src="/images/art.png" class="pr-2" width="30px" alt="lamp" loading="lazy"/>{{ information.ayah.surah.name_en }} {{ information.ayah.surah_id }} : {{ information.ayah.ayah_id }} {{information.ayah.surah.name_ar}}</b>
    </h5>
  </div>
</template>

<script>
export default {
  name: 'AyahInfo',
  props: {
    information: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

.mr-2 {
  margin-right: 10px;
}
</style>