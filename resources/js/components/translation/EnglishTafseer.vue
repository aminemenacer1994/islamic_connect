<template>
  <h5 class="text-left ayah-translation" ref="heading1" style="line-height: 1.6em">
    {{ expanded ? tafseer : truncatedText }}
    <template v-if="showMoreLink">
      <a href="#" >{{ expanded ? 'Show Less' : 'Show More' }}</a>
    </template>
  </h5>
</template>
<script defer>
export default {
  name: 'AyahTafseer',
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
      return this.information.tafseer.length > 300; // Adjust the length as needed
    }
  },
  methods: {
    // toggleExpand() {
    //   this.expanded = !this.expanded;
    //   if (!this.expanded) {
    //     this.truncatedText = this.truncateText(this.information.tafseer);
    //   }
    // },
    truncateText(text) {
      if (text.length <= 300) { // Adjust the length as needed
        return text;
      }
      return text.substring(0, 300) + '...';
    }
  },
  mounted() {
    this.truncatedText = this.truncateText(this.information.tafseer);
  }
};
</script>
<style scoped>
.ayah-translation {
  line-height: 1.6em;
  font-size: 1.2rem;
}
</style>
