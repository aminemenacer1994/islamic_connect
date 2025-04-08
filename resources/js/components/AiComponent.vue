<template>
  <div class="audiobook-container">
    <h2>Islamic Audiobooks</h2>
    <select v-model="selectedBook" @change="loadBookAudio" class="form-select">
      <option disabled value="">Select an Audiobook</option>
      <option v-for="book in books" :key="book.identifier" :value="book.identifier">{{ book.title }}</option>
    </select>

    <audio v-if="audioUrl" controls class="audio-player">
      <source :src="audioUrl" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>

    <p v-if="audioUrl">Now Playing: {{ selectedBookTitle }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      selectedBook: '',
      audioUrl: '',
      selectedBookTitle: ''
    };
  },
  created() {
    this.fetchIslamicAudiobooks();
  },
  methods: {
    async fetchIslamicAudiobooks() {
      try {
        // Fetch books from Internet Archive
        const response = await fetch('https://archive.org/advancedsearch.php?q=islamic+audio&output=json');
        const data = await response.json();
        this.books = data.response.docs;
        console.log('Fetched books:', this.books); // Debugging line to inspect the data structure
      } catch (error) {
        console.error('Error fetching Islamic audiobooks:', error);
      }
    },
    async loadBookAudio() {
      if (this.selectedBook) {
        // Find selected book in the list
        const selected = this.books.find(book => book.identifier === this.selectedBook);
        console.log('Selected Book:', selected); // Debugging line to inspect the structure of the selected book
        if (selected && selected.files) {
          this.selectedBookTitle = selected.title;

          // Safely find an MP3 file in the 'files' array
          const audioFile = selected.files.find(file => file.format === 'MP3');
          console.log('Audio File:', audioFile); // Debugging line to check the audio file details
          if (audioFile && audioFile.name) {
            this.audioUrl = `https://archive.org/download/${selected.identifier}/${audioFile.name}`;
          } else {
            console.error('No MP3 file found for this book.');
          }
        } else {
          console.error('Selected book does not have the expected structure.');
        }
      }
    }
  }
};
</script>

<style scoped>
.audiobook-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}

.audio-player {
  width: 100%;
  margin-top: 20px;
  background-color: #f9f9f9;
}

p {
  font-size: 18px;
  margin-top: 15px;
  color: #333;
}
</style>
