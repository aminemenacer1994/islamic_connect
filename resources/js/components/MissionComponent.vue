<template>
  <div class="container">
    <div class="text-center container fw-bold display-4 pt-3 pb-2">Seerah Timeline</div>
    <p style="font-size: 1.2rem;">The Seerah refers to the life and biography of Prophet Muhammad ﷺ, the final messenger
      of Islam, whose life is a beacon of guidance for Muslims.</p>

    <div class="timeline">
      <div v-for="(event, index) in events" :key="index" class="timeline-point"
        :class="{ active: index === currentIndex }" @click="currentIndex = index">
        <span class="badge rounded-pill text-bg-success fs-6 timeline-badge">
          {{ event.year }}
        </span>
      </div>
    </div>



    <div v-if="events.length">

      <div class="fw-bold display-5 text-center mb-3">{{ events[currentIndex].title }}</div>
      <h6 class="text-left fw-medium" style="line-height: 1.7em;" v-html="events[currentIndex].description"></h6>
      <div class="controls text-center">
        <button @click="prev" :disabled="currentIndex === 0">Previous</button>
        <button @click="next" :disabled="currentIndex === events.length - 1">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { events } from './prophet_events.json' // adjust the path as needed

export default {
  name: 'App',
  data() {
    return {
      currentIndex: 0,
      events: []
    }
  },
  mounted() {
    this.events = events
  },
  methods: {
    next() {
      if (this.currentIndex < this.events.length - 1) {
        this.currentIndex++
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    }
  }
}
</script>


<style scoped>
.timeline-container {
  margin: auto;
  text-align: center;
  padding: 10px;
  font-family: 'Segoe UI', sans-serif;
}

.timeline {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  margin: 10px 0;
}

.timeline-point {
  padding: 5px;
  margin: 0 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.timeline-point:hover {
  color: rgb(13, 182, 145);
}

.timeline-point.active {
  border-color: rgb(13, 182, 145);
  font-weight: bold;
  color: rgb(13, 182, 145);
}

.event-box {
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.controls {
  margin-top: 20px;
}

.controls button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  background-color: rgb(13, 182, 145);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

.controls button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.controls button:hover:not(:disabled) {
  background-color: rgb(13, 182, 145);
}
</style>
