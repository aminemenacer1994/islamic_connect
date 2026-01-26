<template>
  <i class="bi bi-whatsapp text-right mr-2 h4"
     @click="shareGroupViaWhatsApp"
     aria-expanded="false"
     data-bs-placement="top"
     title="Share on Whatsapp"
     style="color: rgba(0, 191, 166); cursor: pointer;"></i>
</template>

<script>
export default {
  name: 'WhatsAppShareGroup',
  props: {
    groupToShare: {
      type: String,
      required: true
    }
  },
  methods: {
    shareGroupViaWhatsApp() {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.groupToShare)}`;
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
