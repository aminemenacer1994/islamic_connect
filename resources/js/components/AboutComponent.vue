<template>
  <div class="library-container">
    <h1>Islamic Connect eBook Library</h1>
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for Islamic books (e.g., Quran, Hadith, Tafsir)"
        @input="fetchBooks"
      />
    </div>
    <div v-if="loading" class="loading">Loading books...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="book-list">
      <div v-for="book in books" :key="book.key" class="book-card">
        <h3>{{ book.title }}</h3>
        <p><strong>Author:</strong> {{ book.author_name ? book.author_name.join(', ') : 'Unknown' }}</p>
        <p><strong>Published:</strong> {{ book.first_publish_year || 'N/A' }}</p>
        <p><strong>Subjects:</strong> {{ book.subject ? book.subject.join(', ') : 'N/A' }}</p>
        <div class="book-actions">
          <button
            v-if="book.ia"
            @click="openBookReader(book.ia, book.title)"
            class="btn"
          >Read Now</button>
          <span v-else>No read option available</span>
        </div>
      </div>
    </div>
    <div v-if="selectedBookIa" class="book-reader">
      <h2>Reading: {{ selectedBookTitle }}</h2>
      <div v-if="readerError" class="error">{{ readerError }}</div>
      <div v-else-if="useIframeFallback" class="book-reader-frame">
        <iframe
          :src="iframeSrc"
          width="100%"
          height="600px"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <p v-if="readerError" class="fallback-link">
          <a :href="archiveUrl" target="_blank">View on Archive.org</a>
        </p>
      </div>
      <div v-else :id="bookReaderId" class="book-reader-frame"></div>
      <button @click="closeBookReader" class="btn close-btn">Close Reader</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: 'Quran', // Default to a more specific Islamic term
      books: [],
      loading: false,
      error: null,
      selectedBookIa: null,
      selectedBookTitle: '',
      bookReaderId: 'bookreader',
      useIframeFallback: false,
      readerError: null,
      iframeSrc: '',
      archiveUrl: '' // Direct archive.org link
    };
  },
  methods: {
    async fetchBooks() {
      this.loading = true;
      this.error = null;
      this.closeBookReader();
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(this.searchQuery)}+subject:Islam&limit=20&sort=relevance`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        this.books = data.docs
          .filter(book => book.subject && book.subject.includes('Islam')) // Ensure Islamic relevance
          .map(book => ({
            key: book.key,
            title: book.title,
            author_name: book.author_name || [],
            first_publish_year: book.first_publish_year,
            subject: book.subject || [],
            ia: book.ia ? book.ia[0] : null
          }));
        if (this.books.length === 0) {
          this.error = 'No Islamic books found for this search. Try "Quran" or "Hadith".';
        }
      } catch (err) {
        this.error = 'Error fetching books: ' + err.message;
      } finally {
        this.loading = false;
      }
    },
    openBookReader(ia, title) {
      console.log('Opening book with IA ID:', ia, 'Title:', title);
      this.selectedBookIa = ia;
      this.selectedBookTitle = title;
      this.readerError = null;
      this.useIframeFallback = false;
      this.iframeSrc = `https://archive.org/embed/${ia}`;
      this.archiveUrl = `https://archive.org/details/${ia}`;
      
      this.$nextTick(() => {
        const script = document.createElement('script');
        script.src = 'https://archive.org/bookreader/BookReader.js';
        script.onerror = () => {
          console.error('Failed to load BookReader script');
          this.readerError = 'Failed to load book reader. Using fallback view.';
          this.useIframeFallback = true;
        };
        script.onload = () => {
          try {
            const br = new window.BookReader({
              el: `#${this.bookReaderId}`,
              ui: 'full',
              bookId: ia,
              defaultStartLeaf: 0
            });
            br.init();
            console.log('BookReader initialized for:', ia);
          } catch (err) {
            console.error('BookReader error:', err);
            this.readerError = 'Unable to load book. Using fallback view or visit Archive.org.';
            this.useIframeFallback = true;
          }
        };
        document.head.appendChild(script);
      });
    },
    closeBookReader() {
      this.selectedBookIa = null;
      this.selectedBookTitle = '';
      this.readerError = null;
      this.useIframeFallback = false;
      this.iframeSrc = '';
      this.archiveUrl = '';
      const readerDiv = document.getElementById(this.bookReaderId);
      if (readerDiv) readerDiv.innerHTML = '';
    }
  },
  created() {
    this.fetchBooks();
  }
};
</script>

<style scoped>
.library-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  text-align: center;
  color: #2c3e50;
}

.search-bar {
  margin: 20px 0;
  text-align: center;
}

.search-bar input {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.book-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.book-card h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #34495e;
}

.book-card p {
  margin: 5px 0;
  font-size: 14px;
}

.book-actions {
  margin-top: 10px;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background: #2980b9;
}

.loading, .error {
  text-align: center;
  font-size: 16px;
  margin: 20px 0;
}

.error {
  color: red;
}

.book-reader {
  margin-top: 40px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.book-reader-frame {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.fallback-link {
  text-align: center;
  margin-top: 10px;
}

.close-btn {
  display: block;
  margin: 20px auto;
}
</style>