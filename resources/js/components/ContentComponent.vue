<template>
    <div class="row justify-content-center text-center mb-3">
      <div class="col-lg-8 col-xl-7">
        <h1 class="display-5 mb-3 pt-3 fw-bold">The History of Islam</h1>
        <p class="pt-3" style="line-height: 1.8rem;">Dive deep into the rich history of Islam with our carefully curated playlist of audio podcasts. Each episode takes you on a journey through key historical events, significant figures, and important milestones that shaped the Islamic world. Whether you're a history enthusiast or looking to understand the origins and evolution of Islam, these podcasts provide insightful and thought-provoking content.</p>
      </div>
    </div>
  <div class="container podcast-list">
    <!-- Loop over podcasts in pairs -->
    <div class="row">
      <div class="col-md-6" v-for="(podcast, index) in podcasts" :key="podcast.guid">
        <div class="podcast-item card shadow-sm mb-4">
          <div class="podcast-details p-3">
            <!-- Podcast Title -->
            <h3 class="podcast-title" style="color:rgba(0, 191, 166)">{{ podcast.title }}</h3>
            <!-- Podcast Description -->
            <p class="podcast-description text-muted" v-html="podcast.description"></p>
            <!-- Audio Player -->
            <audio :src="podcast.audioUrl" controls preload="metadata" class="w-100">
              Your browser does not support the audio element.
            </audio>
            <!-- Listen Link -->
            <p class="audio-source mt-2">
              <a :href="podcast.audioUrl" target="_blank" class="btn btn-link btn-sm text-primary">Listen here</a>
            </p>
          </div>
        </div>
      </div>
      <!-- Add an empty column every two podcasts to create a new row -->
      <div class="col-md-6" v-if="(index + 1) % 2 === 0"></div>
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
     // Remove unwanted text from the description
     cleanDescription(description) {
      return description.replace(/Hosted on Acast.*?privacy.*?for more information./is, '');
    },

    // Automatically skip the intro ad by setting a time to start the podcast after
    skipIntroAd(event) {
      const audio = this.$refs.audioPlayer;
      const introAdDuration = 30; // Skip first 30 seconds
      if (audio.currentTime < introAdDuration) {
        audio.currentTime = introAdDuration;
      }
    },
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
      description: item.querySelector('description').textContent
        .replace(/(Hosted on Acast\. See acast\.com\/privacy for more information\.)/g, '')
        .replace(/SoundCloud/g, ''), // Remove "SoundCloud"
      audioUrl: item.querySelector('enclosure').getAttribute('url'),
    }));
  } catch (error) {
    this.error = error.message;
    console.error('Error fetching podcasts:', error);
  } finally {
    this.loading = false;
  }
}

  },
};
</script>

<style scoped>
/* Container styling */
.podcast-list {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Podcast Item Styling */
.podcast-item {
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

/* Hover effect for the podcast items */
.podcast-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
}

/* Podcast Title Styling */
.podcast-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Podcast Description Styling */
.podcast-description {
  font-size: 1em;
  line-height: 1.6;
  margin-bottom: 15px;
}

/* Audio player full width */
audio {
  width: 100%;
  margin-bottom: 15px;
}

/* Listen link styling */
.audio-source {
  margin-top: 10px;
}

.audio-source .btn-link {
  font-size: 1em;
  font-weight: 500;
}

/* Adjust for larger screens */
@media (min-width: 768px) {
  .podcast-item {
    margin-bottom: 30px;
  }
}
</style>
