<template>
    <div>
      <h1>Islamic Events</h1>
      <input type="text" v-model="searchQuery" placeholder="Search Events..." />
      <div v-if="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
  
      <ul v-if="events.length > 0">
        <li v-for="event in filteredEvents" :key="event.id">
          <h3>{{ event.title }}</h3>
          <p>{{ event.description }}</p>
          <small>{{ event.date }}</small>
        </li>
      </ul>
      <p v-else>No events found.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        events: [],
        loading: false,
        error: null,
        searchQuery: "",
      };
    },
    computed: {
      filteredEvents() {
        return this.events.filter((event) => {
          return (
            event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      },
    },
    mounted() {
      this.fetchEvents();
    },
    methods: {
      async fetchEvents() {
        this.loading = true;
        try {
          const response = await axios.get(
            "https://api.muslimpro.com/v2/feeds/events?key=YOUR_API_KEY"
          );
          this.events = response.data.events; // adjust according to the actual response structure
        } catch (error) {
          this.error = "Failed to fetch events.";
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  input {
    padding: 8px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 300px;
  }
  </style>
  