<template>
    <div>
      <h1>Islamic Articles</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="(article, index) in articles" :key="index" class="article-card">
          <img :src="article.thumbnail" alt="Article Thumbnail" class="thumbnail" />
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <a :href="article.url" target="_blank" class="read-more">Read More</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        articles: [],
        loading: true,
      };
    },
    mounted() {
      this.fetchArticles();
    },
    methods: {
      async fetchArticles() {
        try {
          const response = await fetch('https://api.islamhouse.com/v3/articles');
          const data = await response.json();
          this.articles = data.articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            thumbnail: article.thumbnail || 'default-thumbnail.jpg', // Fallback thumbnail
          }));
        } catch (error) {
          console.error('Error fetching articles:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style>
  .article-card {
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .thumbnail {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  .read-more {
    display: inline-block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
  }
  .read-more:hover {
    text-decoration: underline;
  }
  </style>
  