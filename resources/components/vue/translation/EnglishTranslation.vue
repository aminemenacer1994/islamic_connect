<template>
  <h5 class="text-left ayah-translation" ref="heading3" style="line-height: 1.6em">
    {{ expanded ? information.translation : truncatedText }}
    <template v-if="showMoreLink">
      <a href="#" @click.prevent="toggleExpand">{{ expanded ? 'Show Less' : 'Show More' }}</a>
    </template>
  </h5>
</template>
<script>
export default {
  name: 'AyahTranslation',
  props: {
    information: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false,
      truncatedText: ''
    };
  },
  computed: {
    showMoreLink() {
      return this.information.translation.length > 300; // Adjust the length as needed
    }
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
      if (!this.expanded) {
        this.truncatedText = this.truncateText(this.information.translation);
      }
    },
    truncateText(text) {
      if (text.length <= 300) { // Adjust the length as needed
        return text;
      }
      return text.substring(0, 300) + '...';
    }
  },
  mounted() {
    this.truncatedText = this.truncateText(this.information.translation);
  }
};
</script>
<style scoped>
.ayah-translation {
  line-height: 1.8em;
  font-size: 1.2rem;
}
</style>
