<template>
  <main class="islamic-calendar-container container-fluid py-5" role="main" aria-labelledby="calendar-title">
    <!-- Header Section -->
    <div class="calendar-header">
      <h3 id="calendar-title" class="text-center fw-bold display-5 mb-4">Islamic Hijri Calendar</h3>
      <p class="text-center container mb-3 lead ">
        The Islamic Hijri Calendar is a lunar calendar used by Muslims to determine religious events like Ramadan, Eid,
        and Hajj.
      </p>

      <div style="border: 1px solid gray; border-radius: 20px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" 
        class="calendar-controls d-flex flex-column flex-md-row justify-content-between align-items-center gap-1 mb-4">
        <!-- Left: Previous Button -->
        <div class="col-md-3 text-center text-md-start">
          <button @click="previousMonth" class="btn btn-outline-success w-100">
            <i class="bi bi-chevron-left"></i> Previous
          </button>
        </div>

        <!-- Center: Month & Year Selectors -->
        <div class="col-md-6 d-flex justify-content-center align-items-center gap-2">
          <select v-model="currentMonth" @change="fetchCalendarData" class="form-select" style="min-width: 140px;">
            <option v-for="(month, index) in islamicMonths" :value="index" :key="month">
              {{ month }}
            </option>
          </select>

          <select v-model="currentYear" @change="fetchCalendarData" class="form-select" style="min-width: 140px;">
            <option v-for="year in yearRange" :value="year" :key="year">
              {{ year }} AH
            </option>
          </select>
        </div>

        <!-- Right: Next Button -->
        <div class="col-md-3 text-center text-md-end">
          <button @click="nextMonth" class="btn btn-outline-success w-100">
            Next <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>


      <!-- Loading Indicator -->
      <div v-if="loading" class="text-center my-3">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Weekdays Header -->
    <div class="calendar-grid">
      <div class="calendar-weekdays row g-0 text-center fw-semibold border-bottom" role="row" aria-label="Weekday headers">
        <div v-for="day in weekdays" :key="day" class="col py-2 bg-light">
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="calendar-days" role="grid" :aria-labelledby="'calendar-title'" @keydown="onGridKeydown" ref="grid">
        <div v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex" class="row g-0 calendar-week" role="row">
          <div v-for="(day, dayIndex) in week" :key="dayIndex"
            class="col calendar-day border text-center py-3 position-relative" :class="{
              'bg-info-subtle': isCurrentDay(day),
              'text-muted': !day || !day.isCurrentMonth,
              'bg-light': dayIndex === 5 || dayIndex === 6,
              'islamic-event': day && day.events && day.events.length > 0
            }" role="gridcell" :tabindex="computeTabIndex(weekIndex, dayIndex, day)" :aria-selected="isCurrentDay(day) ? 'true' : 'false'" :aria-label="dayAriaLabel(day)" @click="showDayDetails(day)" ref="cells">
            <div v-if="day" class="day-content">
              <div class="fs-5 fw-bold">{{ day.hijri.day }}</div>
              <div class="text-muted small">{{ day.gregorian.day }} {{ day.gregorian.month.en.substring(0, 3) }}</div>
              <div v-if="isCurrentDay(day)" class="badge bg-success mt-1">Today</div>
              <div v-if="day.events?.length" class="event-indicator position-absolute top-0 end-0 p-1">
                <i class="bi bi-star-fill text-warning"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Day Details Modal -->
    <div v-if="selectedDay" class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="day-details-title" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h3 id="day-details-title" class="modal-title fw-bold">
              {{ selectedDay.hijri.day }} {{ islamicMonths[selectedDay.hijri.month.number - 1] }} {{
                selectedDay.hijri.year }} AH
            </h3>
            <button type="button" class="btn-close" aria-label="Close day details" @click="selectedDay = null"></button>
          </div>
          <div class="modal-body">
            <p class="text-muted mb-3">
              {{ selectedDay.gregorian.day }} {{ selectedDay.gregorian.month.en }} {{ selectedDay.gregorian.year }}
            </p>

            <div v-if="selectedDay.events?.length" class="mb-3">
              <h6>Islamic Events:</h6>
              <ul class="list-group">
                <li v-for="(event, index) in selectedDay.events" :key="index" class="list-group-item">
                  {{ event }}
                </li>
              </ul>
            </div>

            <div v-if="prayerTimes" class="prayer-times">
              <h6>Prayer Times:</h6>
              <div class="row">
                <div class="col-6" v-for="(time, name) in prayerTimes" :key="name">
                  <div class="prayer-time d-flex justify-content-between">
                    <span class="fw-semibold">{{ name }}:</span>
                    <span>{{ time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedDay = null">Close</button>
          </div>
        </div>
      </div>
    </div>
  </main>


</template>

<script>
export default {
  data() {
    const currentDate = new Date();
    return {
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      islamicMonths: [
        'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab',
        'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
      ],
      calendarData: [],
      yearRange: [],
      loading: false,
      selectedDay: null,
      prayerTimes: null,
      events: {
        '1-1': ['Islamic New Year'],
        '1-10': ['Day of Ashura'],
        '3-12': ['Mawlid al-Nabi'],
        '9-1': ['Beginning of Ramadan'],
        '9-27': ['Laylat al-Qadr'],
        '10-1': ['Eid al-Fitr'],
        '12-10': ['Eid al-Adha'],
        '12-18': ['Day of Arafah']
      },
      focusIndex: 0,
    };
  },
  computed: {
    yearRange() {
      const years = [];
      for (let year = 1440; year <= 1460; year++) {
        years.push(year);
      }
      return years;
    },
    calendarWeeks() {
      if (!this.calendarData.length) return [];

      const weeks = [];
      let week = [];

      const firstDay = new Date(this.calendarData[0].gregorian.date);
      const startingDay = firstDay.getDay();

      for (let i = 0; i < startingDay; i++) {
        week.push(null);
      }

      this.calendarData.forEach((day, index) => {
        const dayEvents = this.getEventsForDay(day.hijri.day, day.hijri.month.number);
        week.push({ ...day, isCurrentMonth: true, events: dayEvents });

        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      });

      if (week.length) {
        while (week.length < 7) {
          week.push(null);
        }
        weeks.push(week);
      }

      return weeks;
    }
  },
  methods: {
    cellCount() {
      return this.calendarWeeks.reduce((acc, w) => acc + w.length, 0);
    },
    flatIndexOf(weekIndex, dayIndex) {
      let idx = 0;
      for (let i = 0; i < weekIndex; i++) idx += this.calendarWeeks[i].length;
      return idx + dayIndex;
    },
    computeTabIndex(weekIndex, dayIndex, day) {
      if (!day) return -1;
      const idx = this.flatIndexOf(weekIndex, dayIndex);
      return this.focusIndex === idx ? 0 : -1;
    },
    setFocusIndex(newIndex) {
      const total = this.cellCount();
      this.focusIndex = Math.max(0, Math.min(total - 1, newIndex));
      this.$nextTick(() => {
        const cells = this.$refs.cells;
        if (cells && cells[this.focusIndex] && typeof cells[this.focusIndex].focus === 'function') {
          cells[this.focusIndex].focus();
        }
      });
    },
    moveBy(delta) {
      this.setFocusIndex(this.focusIndex + delta);
    },
    onGridKeydown(e) {
      const key = e.key;
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown','Enter',' '].includes(key)) {
        e.preventDefault();
      }
      switch (key) {
        case 'ArrowLeft':
          this.moveBy(-1); break;
        case 'ArrowRight':
          this.moveBy(1); break;
        case 'ArrowUp':
          this.moveBy(-7); break;
        case 'ArrowDown':
          this.moveBy(7); break;
        case 'Home': {
          // Move to start of current row
          let sum = 0, rowStart = 0, rowEnd = 0;
          for (let i = 0; i < this.calendarWeeks.length; i++) {
            const len = this.calendarWeeks[i].length;
            rowEnd = sum + len - 1;
            if (this.focusIndex >= sum && this.focusIndex <= rowEnd) { rowStart = sum; break; }
            sum += len;
          }
          this.setFocusIndex(rowStart);
          break;
        }
        case 'End': {
          // Move to end of current row
          let sum = 0, rowEnd = 0;
          for (let i = 0; i < this.calendarWeeks.length; i++) {
            const len = this.calendarWeeks[i].length;
            rowEnd = sum + len - 1;
            if (this.focusIndex >= sum && this.focusIndex <= rowEnd) break;
            sum += len;
          }
          this.setFocusIndex(rowEnd);
          break;
        }
        case 'PageUp':
          this.previousMonth();
          this.$nextTick(() => this.setFocusIndex(0));
          break;
        case 'PageDown':
          this.nextMonth();
          this.$nextTick(() => this.setFocusIndex(0));
          break;
        case 'Enter':
        case ' ': {
          const cells = this.$refs.cells || [];
          const el = cells[this.focusIndex];
          if (el) el.click();
          break;
        }
      }
    },
    dayAriaLabel(day) {
      if (!day) return 'Empty';
      const hijriName = this.islamicMonths[(day.hijri.month.number - 1)] || '';
      return `${day.hijri.day} ${hijriName} ${day.hijri.year} AH, ${day.gregorian.day} ${day.gregorian.month.en} ${day.gregorian.year}`;
    },
    async fetchCalendarData() {
      this.loading = true;
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/gToHCalendar/${this.currentMonth + 1}/${this.currentYear}?adjustment=0`
        );
        const data = await response.json();
        this.calendarData = data.data;
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        this.calculateLocalCalendar();
      } finally {
        this.loading = false;
        this.$nextTick(() => this.setFocusIndex(0));
      }
    },
    calculateLocalCalendar() {
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      this.calendarData = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(this.currentYear, this.currentMonth, day);
        this.calendarData.push({
          gregorian: {
            date: date.toISOString().split('T')[0],
            day: day.toString(),
            month: { en: this.getMonthName(this.currentMonth) },
            year: this.currentYear.toString()
          },
          hijri: {
            day: ((day % 30) + 1).toString(), // Approximation
            month: { number: ((this.currentMonth + 1) % 12) || 12 },
            year: (this.currentYear - 579).toString() // Approximation
          }
        });
      }
    },
    getMonthName(index) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return months[index];
    },
    getEventsForDay(day, month) {
      const key = `${Number(month)}-${Number(day)}`;
      return this.events[key] || [];
    },
    isCurrentDay(day) {
      if (!day) return false;

      const today = new Date();
      const [year, month, date] = day.gregorian.date.split('-').map(Number);

      return (
        today.getDate() === date &&
        today.getMonth() + 1 === month &&
        today.getFullYear() === year
      );
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.fetchCalendarData();
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.fetchCalendarData();
    },
    async showDayDetails(day) {
      if (!day) return;

      this.selectedDay = day;
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${day.gregorian.date}?latitude=51.508515&longitude=-0.1254872&method=2`
        );
        const data = await response.json();
        this.prayerTimes = data.data.timings;
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        this.prayerTimes = null;
      }
    },
    async created() {
      // Assuming fetchYearRange is a method that populates the yearRange
      await this.fetchYearRange();
      console.log(this.yearRange); // Ensure data is fetched and available
    },
    async fetchYearRange() {
      // Fetch data from API or generate year range
      this.yearRange = [];
    }
  },
  mounted() {
    this.fetchCalendarData();
  }
};
</script>


<style scoped>
.islamic-calendar-container {
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  margin-bottom: 20px;
}

.calendar-controls {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  gap: 10px;
}

.month-year-display {
  font-size: 1.2rem;
  font-weight: bold;
  gap: 10px;
}

.calendar-grid {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.weekday {
  padding: 10px;
  text-align: center;
  font-weight: bold;
  background-color: #f1f1f1;
  border-bottom: 1px solid #dee2e6;
}

.calendar-day {
  min-height: 100px;
  padding: 5px;
  border: 1px solid #dee2e6;
  background-color: white;
  transition: all 0.2s;
  cursor: pointer;
}

.calendar-day:hover {
  background-color: #f8f9fa;
  transform: scale(1.02);
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.day-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.day-number {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 2px;
}

.gregorian-date {
  color: #6c757d;
  font-size: 0.8rem;
  margin-bottom: 5px;
}

.day-indicator {
  font-size: 0.7rem;
  background-color: #4e73df;
  color: white;
  padding: 2px 5px;
  border-radius: 10px;
  margin-top: 3px;
}

.current-day {
  background-color: #e3f2fd;
  position: relative;
}

.current-day::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 0;
  border-color: transparent #4e73df transparent transparent;
}

.other-month {
  background-color: #f8f9fa;
  color: #adb5bd;
}

.weekend {
  background-color: #f0f7ff;
}

.islamic-event {
  background-color: #fff8e1;
}

.event-indicator {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #ffc107;
}

.modal {
  backdrop-filter: blur(5px);
}

.prayer-times {
  margin-top: 15px;
}

.prayer-time {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.prayer-name {
  font-weight: bold;
  color: #4e73df;
}

.prayer-value {
  float: right;
}

@media (max-width: 576px) {
  .calendar-day {
    min-height: 70px;
  }

  .day-number {
    font-size: 1rem;
  }

  .gregorian-date {
    display: none;
  }

  .calendar-controls {
    flex-direction: column;
  }

  .month-year-display {
    margin: 10px 0;
  }
}
</style>
