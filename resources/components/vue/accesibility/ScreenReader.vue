<template>
  <div>
   <textarea v-model="text" placeholder="Enter text to read" class="text-area"></textarea>
   <button @click="startReading" :disabled="isReading" class="read-btn">
     {{ isReading ? "Reading..." : "Read Aloud" }}
   </button>
   <button @click="stopReading" :disabled="!isReading" class="stop-btn">
     Stop Reading
   </button>
  </div>
</template>

<script>
export default {
 data() {
  return {
   text: '',
   isReading: false,
   utterance: null,
  };
 },
 methods: {
  startReading(){
   if (!this.text) return;
   this.utterance = new SpeechSynthesisUtterance(this.text);
   this.utterance.onend = () => {
    this.isReading = false;
   };
   this.isReading = true;
   window.speechSynthesis.speak(this.utterance);
  },
  stopReading(){
    window.speechSynthesis.cancel();
    this.isReading = false;
  }
 },
}
</script>

<style>
.text-area {
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
}
.read-btn, .stop-btn {
  margin-right: 10px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
}
</style>