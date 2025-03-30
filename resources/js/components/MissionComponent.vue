<template>
  <div class="islamic-podcast">
    <h1>Islamic Podcast Episodes</h1>
    <!-- <div v-if="loading" class="loading">Loading episodes...</div>
    <div v-if="error" class="error">Error: {{ error }}</div>

    <div v-if="!loading && !error">
      <ul class="episode-list">
        <li v-for="episode in episodes" :key="episode.guid" class="episode-item">
          <h3>{{ episode.title }}</h3>
          <p v-html="episode.content"></p>
          <audio controls v-if="episode.enclosure">
            <source :src="episode.enclosure.url" :type="episode.enclosure.type">
            Your browser does not support audio.
          </audio>
          <a :href="episode.link" target="_blank" class="listen-link">Listen on SoundCloud</a>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<!-- 

<script>
import axios from 'axios';
import Parser from 'rss-parser';

export default {
  name: 'IslamicPodcast',
  data() {
    return {
      episodes: [],
      loading: true,
      error: null,
    };
  },
  async mounted() {
    try {
      // Use CORS proxy to avoid issues (optional)
      const CORS_PROXY = "https://api.allorigins.win/get?url=";
      const RSS_URL = "https://feeds.soundcloud.com/users/soundcloud:users:143713032/sounds.rss";

      const response = await axios.get(`${CORS_PROXY}${encodeURIComponent(RSS_URL)}`);
      const rssText = response.data.contents; // Extract RSS text from proxy

      // Parse RSS feed
      const parser = new Parser();
      const feed = await parser.parseString(rssText);

      this.episodes = feed.items.map(item => ({
        title: item.title,
        content: item.content || item.description || '',
        link: item.link,
        guid: item.guid || item.link,
        enclosure: item.enclosure,
      }));

    } catch (error) {
      this.error = error.message || 'Failed to load podcast episodes';
      console.error('Error fetching RSS:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.islamic-podcast {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #ff4444;
}

.episode-list {
  list-style: none;
  padding: 0;
}

.episode-item {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #f9f9f9;
}

.episode-item h3 {
  margin-top: 0;
  color: #2d572c;
}

.listen-link {
  display: inline-block;
  margin-top: 10px;
  color: #1da1f2;
  text-decoration: none;
}

.listen-link:hover {
  text-decoration: underline;
}

audio {
  width: 100%;
  margin-top: 10px;
}
</style> -->