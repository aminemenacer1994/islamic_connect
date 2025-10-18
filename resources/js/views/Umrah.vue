<template>
  <section>
    <UmrahComponent />
  </section>
</template>

<script>
import UmrahComponent from '../components/UmrahComponent.vue';

export default {
  name: 'UmrahView',
  components: { UmrahComponent }
}
</script>

<style scoped>
section { display: block; }
</style>

