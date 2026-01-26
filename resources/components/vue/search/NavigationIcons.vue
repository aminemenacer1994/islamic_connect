<template>
  <div class="icon-container pb-2">
    <i class="bi bi-chevron-bar-left h5" style="color: rgb(0, 191, 166); cursor: pointer;" @click="$emit('go-to-first-ayah')" title="First verse"></i>
    <i class="bi bi-arrow-left-circle h5" style="color: rgb(0, 191, 166); cursor: pointer;" @click="$emit('go-to-previous-ayah')" title="Previous verse"></i>
    <i class="bi bi-arrow-right-circle h5" style="color: rgb(0, 191, 166); cursor: pointer;" @click="$emit('go-to-next-ayah')" title="Next verse"></i>
    <i class="bi bi-chevron-bar-right h5" style="color: rgb(0, 191, 166); cursor: pointer;" @click="$emit('go-to-last-ayah')" title="Last verse"></i>
  </div>
</template>

<script>
export default {
  name: 'NavigationIcons'
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
