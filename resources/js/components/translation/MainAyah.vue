<template>
  <div class="btn" :style="styleObject">
    <div class="text-right ayah-translation" name="ayah_text" :style="styleObject"><b>{{ information.ayah.ayah_text }}</b></div>
  </div>
</template>

<script>
export default {
  name: 'AyahTranslation',
  props: {
    information: {
      type: Object,
      required: true
    },
    fontSize: {
      type: Number,
      required: true
    },
    styleObject: Object
  },
  mounted() {
    this.$emit('ayah-text', this.information.ayah.ayah_text);
  },
  computed: {
    styleObject() {
      return {
        lineHeight: '1.6em',
        fontSize: this.fontSize + 'rem' // Use the fontSize prop
      };
    }
  }
};
</script>

<style scoped>
.btn {
  padding: 10px;
}
.text-right {
  text-align: right;
}
.ayah-translation {
  font-size: 1.6rem;
  color: #333;
}

</style>