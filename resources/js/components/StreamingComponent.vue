<template>
  <div class="articles-container">
    <h2 class="title">📚 Islamic Articles</h2>
    <div v-if="loading" class="loading">Loading articles...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="articles.length === 0" class="no-results">No articles found.</div>
      <div v-else class="article-list">
        <div v-for="(article, index) in articles" :key="index" class="article-card">
          <h3>{{ article.title }}</h3>
          <p>{{ article.description }}</p>
          <a :href="article.link" target="_blank">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IslamicArticles',
  data() {
    return {
      articles: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    const API_URL = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://aboutislam.net/feed/');
    
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const parsedXML = new window.DOMParser().parseFromString(data.contents, 'text/xml');
        const items = parsedXML.querySelectorAll('item');
        this.articles = Array.from(items).map(item => ({
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          link: item.querySelector('link').textContent
        }));
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.loading = false;
      });
  }
};
</script>

<style scoped>
.articles-container {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

.loading,
.error,
.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.article-card h3 {
  margin: 0 0 0.5rem;
}

.article-card p {
  margin-bottom: 0.5rem;
}

.article-card a {
  color: #007BFF;
  text-decoration: none;
}

.article-card a:hover {
  text-decoration: underline;
}
</style>
