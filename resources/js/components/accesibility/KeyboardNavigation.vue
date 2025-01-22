<template>
<div class="navigation">

</div>
</template>

<script>
export default {
 props: {
  items: {
   type: Array,
   required: true,
  },
 },
 data() {
  return {
   activeIndex: 0,
  }
 },
 methods: {
  handleKeydown(event) {
   switch (event.key) {
    case "ArrowDown":
     this.activeIndex = (this.activeIndex + 1) % this.items.length; // Navigate down
     break;
    case "ArrowUp":
     this.activeIndex =
      (this.activeIndex - 1 + this.items.length) % this.items.length; // Navigate up
     break;
    case "Enter":
    case " ":
     this.activateItem(); // Activate selected item (Enter or Space)
     break;
    case "Escape":
     this.closeMenu(); // Handle Escape key (optional: close menu/modal)
     break;
    case "Home":
     this.activeIndex = 0; // Jump to the first item
     break;
    case "End":
     this.activeIndex = this.items.length - 1; // Jump to the last item
     break;
    case "PageUp":
     this.scrollToTop(); // Custom: scroll to the top
     break;
    case "PageDown":
     this.scrollToBottom(); // Custom: scroll to the bottom
     break;
   }
  },
  setActive(index) {
   this.activeIndex = index;
  },
 },
 mounted() {
  window.addEventListener("keydown", this.handleKeydown);
 },
 beforeDestroy() {
  window.removeEventListener("keydown", this.handleKeydown);
 },

}
</script>


