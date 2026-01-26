<template>
  <i class="bi bi-whatsapp text-right mr-2 h4"
     @click="shareTranslationViaWhatsApp"
     aria-expanded="false"
     data-bs-placement="top"
     title="Share on Whatsapp"
     ></i>
    
</template>

<script>
export default {
  name: 'WhatsAppShareTranslation',
  props: {
    translationToShare: {
      type: String,
      required: true
    }
  },
  methods: {
    shareTranslationViaWhatsApp() {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.translationToShare)}`;
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
.text-right {
  text-align: right;
}
.mr-2 {
  margin-right: 0.5rem;
}
.h4 {
  font-size: 1.5rem;
}
</style>
