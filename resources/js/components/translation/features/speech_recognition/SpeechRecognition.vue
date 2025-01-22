<template>
  <div>
    <h1>Speech to Text</h1>
    <button @click="startRecording">Start Recording</button>
    <button @click="stopRecording">Stop Recording</button>
    <p>Transcription: {{ transcription }}</p>
    <audio v-if="audioUrl" :src="audioUrl" controls></audio>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transcription: '',
      audioUrl: '',
      mediaRecorder: null,
      audioChunks: []
    };
  },
  methods: {
    async startRecording() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      
      this.mediaRecorder.ondataavailable = event => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.audioChunks = [];
        
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
          const response = await axios.post('https://localhost:8000/api/upload', formData);
          this.transcription = response.data.transcription;
          this.audioUrl = URL.createObjectURL(audioBlob);
        } catch (error) {
          console.error('Error uploading audio:', error);
        }
      };
    },
    stopRecording() {
      this.mediaRecorder.stop();
    }
  }
};
</script>
