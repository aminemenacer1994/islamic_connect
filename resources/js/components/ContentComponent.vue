<template>
  <div class="podcast-container">
    <h1>Islamic Podcasts</h1>
    <div v-if="loading" class="loading">Loading podcasts...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul class="podcast-list">
        <li v-for="podcast in podcasts" :key="podcast.guid" class="podcast-item">
          <div class="podcast-details">
            <h3>{{ podcast.title }}</h3>
            <p class="podcast-description" v-html="podcast.description"></p>
          </div>
          <div class="audio-player">
            <audio :src="podcast.audioUrl" controls preload="metadata">
              Your browser does not support the audio element.
            </audio>
            <p class="audio-source"><a :href="podcast.audioUrl" target="_blank">Listen here</a></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      podcasts: [],
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchPodcasts();
  },
  methods: {
    async fetchPodcasts() {
      try {
        this.loading = true;
        this.error = null;

        // Use a CORS proxy to fetch the RSS feed
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://feeds.acast.com/public/shows/9b71a968-0061-4508-9609-6371a36cdcb0`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch the RSS feed.');
        }

        const rssText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rssText, 'application/xml');

        // Parse the RSS feed
        const items = xmlDoc.querySelectorAll('item');
        this.podcasts = Array.from(items).map((item) => ({
          guid: item.querySelector('guid').textContent,
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          audioUrl: item.querySelector('enclosure').getAttribute('url'),
        }));
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching podcasts:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.podcast-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

.loading {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
}

.podcast-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.podcast-item {
  background-color: white;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.podcast-item:hover {
  transform: scale(1.03);
}

.podcast-details h3 {
  font-size: 1.2rem;
  color: #2980b9;
  margin-bottom: 10px;
}

.podcast-description {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 15px;
}

.audio-player {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

audio {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
}

.audio-source {
  font-size: 0.9rem;
  color: #2980b9;
}

.audio-source a {
  text-decoration: none;
  color: #2980b9;
}

.audio-source a:hover {
  text-decoration: underline;
}
</style>
