<template>
  <i
    @click="shareTafseerOnTwitter"
    class="mr-2 bi bi-twitter-x text-right h4"
    aria-expanded="false"
    data-bs-placement="top"
    title="Share via X"
  ></i>
</template>

<script>
export default {
  props: {
    targetElementRef: {
      type: String,
      required: true
    },
    tafseerText: {
      type: String,
      required: true
    }
  },
  methods: {
    shareTafseerOnTwitter() {
      try {
        const headingText = this.tafseerText;
        if (!headingText) {
          throw new Error('Translated text is not defined');
        }
        const encodedHeading = encodeURIComponent(headingText.trim());
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedHeading}`;
        window.open(twitterUrl, "_blank") || console.error("Failed to open Twitter sharing dialog.");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
}
</script>
