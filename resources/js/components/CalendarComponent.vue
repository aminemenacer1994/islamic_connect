<template>
  <main class="islamic-calendar-container container-fluid py-5" role="main" aria-labelledby="calendar-title">
    <!-- Header Section -->
    <div class="calendar-header">
      <h3 id="calendar-title" class="text-center fw-bold display-5 mb-4">Islamic Hijri Calendar</h3>
      <p class="text-center container mb-3 lead ">
        The Islamic Hijri Calendar is a lunar calendar used by Muslims to determine religious events like Ramadan, Eid,
        and Hajj.
      </p>


      <div class="container" style="padding: 10px;">
        <div class="mx-auto mb-4 next-step-card">
          <button type="button" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
            :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'"
            @click="toggleNextStepMinimized" class="next-step-toggle">
            <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
          </button>
          <div class="d-flex align-items-start gap-3 text-start">
            <div class="flex-shrink-0 mt-1">
              <div class="next-step-icon-circle" role="img" aria-label="Gentle date converter guide">
                <i class="fas fa-clock" aria-hidden="true"></i>
              </div>
            </div>
            <div class="flex-grow-1">
              <p class="mb-2 fw-semibold text-uppercase next-step-eyebrow">
                NEXT STEP
              </p>
              <!-- Minimized teaser -->
              <div v-show="nextStepMinimized" class="mb-2 d-inline-flex align-items-center gap-1 next-step-teaser">
                <a href="/date" class="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 next-step-link"
                  aria-label="Open the Prayer Times companion">
                  Convert Date
                  <i class="fas fa-arrow-up-right-from-square next-step-link-icon" aria-hidden="true"></i>
                </a>
              </div>
              <p v-show="!nextStepMinimized" class="mb-3 next-step-text">
                Converted a date? Keep this Hijri calendar close for nearby events and prayer-friendly context. Reopen
                the <a href="/date" class="fw-semibold text-decoration-none next-step-link" aria-label="Reopen the converter">Date
                  converter</a>
                whenever you need another exact match.
              </p>

              <div v-show="!nextStepMinimized" class="d-flex flex-wrap gap-2">
                <a href="/date" class="btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center next-step-cta">
                  <span>Open Hijri Date Converter</span>
                  <i class="fas fa-exchange-alt text-white ms-2" aria-hidden="true"></i>
                  <span class="visually-hidden">Open the accessible Prayer Times experience</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="calendar-controls container action-row action-row--spaced align-items-center flex-wrap gap-3 mb-4">
        <div class="action-row__item text-center text-md-start">
          <button @click="previousMonth" class="premium-action-button premium-action-button--outline">
            <span class="action-row__icon"><i class="bi bi-chevron-left" aria-hidden="true"></i></span>
            <span class="action-row__label">Previous Month</span>
          </button>
        </div>

        <div class="action-row__item calendar-control__selectors d-flex flex-wrap gap-2 justify-content-center">
          <select v-model="currentMonth" @change="scheduleFetch" class="form-select">
            <option v-for="(month, index) in islamicMonths" :value="index" :key="month">
              {{ month }}
            </option>
          </select>

          <select v-model="currentYear" @change="scheduleFetch" class="form-select">
            <option v-for="year in yearRange" :value="year" :key="year">
              {{ year }} AH
            </option>
          </select>
        </div>

        <div class="action-row__item text-center text-md-end">
          <button @click="nextMonth" class="premium-action-button premium-action-button--outline">
            <span class="action-row__icon"><i class="bi bi-chevron-right" aria-hidden="true"></i></span>
            <span class="action-row__label">Next Month</span>
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
      <div class="calendar-weekdays row g-0 text-center fw-semibold border-bottom" role="row"
        aria-label="Weekday headers">
        <div v-for="day in weekdays" :key="day" class="col py-2 bg-light">
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="calendar-days" role="grid" :aria-labelledby="'calendar-title'" @keydown="onGridKeydown" ref="grid">
        <div v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex" class="row g-0 calendar-week" role="row">
          <div v-for="(day, dayIndex) in week" :key="day ? day.gregorian.date : 'empty-' + weekIndex + '-' + dayIndex"
            class="col calendar-day border text-center py-3 position-relative" :class="{
              'bg-info-subtle': isCurrentDay(day),
              'text-muted': !day || !day.isCurrentMonth,
              'bg-light': dayIndex === 5 || dayIndex === 6,
              'islamic-event': day && day.events && day.events.length > 0
            }" role="gridcell" :tabindex="computeTabIndex(weekIndex, dayIndex, day)"
            :aria-selected="isCurrentDay(day) ? 'true' : 'false'" :aria-label="dayAriaLabel(day)"
            @click="showDayDetails(day)" ref="cells">
            <div v-if="day" class="day-content">
              <div class="fs-5 fw-bold">{{ day.hijri.day }}</div>
              <div class="text-muted small">{{ day.gregorian.day }} {{ gregorianShort[day.gregorian.month.en] ||
                day.gregorian.month.en }}</div>
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
    <div v-if="selectedDay" class="modal fade show d-block modal-backdrop-soft" tabindex="-1" role="dialog"
      aria-modal="true" aria-labelledby="day-details-title">
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

            <div v-if="prayerLoading" class="text-center my-2">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
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
// Non-reactive constants
const EVENTS_MAP = {
  '1-1': ['Islamic New Year'],
  '1-10': ['Day of Ashura'],
  '3-12': ['Mawlid al-Nabi'],
  '9-1': ['Beginning of Ramadan'],
  '9-27': ['Laylat al-Qadr'],
  '10-1': ['Eid al-Fitr'],
  '12-10': ['Eid al-Adha'],
  '12-18': ['Day of Arafah']
};

const GREGORIAN_SHORT = {
  January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr', May: 'May', June: 'Jun',
  July: 'Jul', August: 'Aug', September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
};

export default {
  data() {
    const currentDate = new Date();
    const todayISO = new Date().toISOString().split('T')[0];
    const yearRange = Array.from({ length: 21 }, (_, i) => 1440 + i);
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
      yearRange,
      loading: false,
      selectedDay: null,
      prayerTimes: null,
      todayISO,
      prayerLoading: false,
      // Caches
      calendarCache: Object.create(null), // key: YYYY-M -> days[]
      prayerCache: Object.create(null),   // key: YYYY-MM-DD -> timings
      // Debounce/schedule fetch
      fetchTimerId: null,
      gregorianShort: GREGORIAN_SHORT,
      focusIndex: 0,
      nextStepMinimized: false,
    };
  },
  computed: {
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
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    cellCount() {
      return this.calendarWeeks.length * 7;
    },
    flatIndexOf(weekIndex, dayIndex) {
      return (weekIndex * 7) + dayIndex;
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
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', 'Enter', ' '].includes(key)) {
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
          const rowStart = Math.floor(this.focusIndex / 7) * 7;
          this.setFocusIndex(rowStart);
          break;
        }
        case 'End': {
          const rowStart = Math.floor(this.focusIndex / 7) * 7;
          const rowEnd = Math.min(this.cellCount() - 1, rowStart + 6);
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
    scheduleFetch() {
      if (this.fetchTimerId) clearTimeout(this.fetchTimerId);
      this.fetchTimerId = setTimeout(() => {
        this.fetchCalendarData();
      }, 150);
    },
    async fetchCalendarData() {
      this.loading = true;
      try {
        const key = `${this.currentYear}-${this.currentMonth + 1}`;
        if (this.calendarCache[key]) {
          this.calendarData = this.calendarCache[key];
        } else {
          const response = await fetch(
            `https://api.aladhan.com/v1/gToHCalendar/${this.currentMonth + 1}/${this.currentYear}?adjustment=0`
          );
          const data = await response.json();
          this.calendarData = data.data;
          this.calendarCache[key] = data.data;
        }
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
      return EVENTS_MAP[key] || [];
    },
    isCurrentDay(day) {
      if (!day) return false;
      return day.gregorian.date === this.todayISO;
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
      const dateKey = day.gregorian.date;
      try {
        this.prayerLoading = true;
        if (this.prayerCache[dateKey]) {
          this.prayerTimes = this.prayerCache[dateKey];
        } else {
          const response = await fetch(
            `https://api.aladhan.com/v1/timings/${dateKey}?latitude=51.508515&longitude=-0.1254872&method=2`
          );
          const data = await response.json();
          this.prayerTimes = data.data.timings;
          this.prayerCache[dateKey] = data.data.timings;
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        this.prayerTimes = null;
      } finally {
        this.prayerLoading = false;
      }
    },
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
}

.calendar-header {
  margin-bottom: 30px;
}

.calendar-controls {
  background: #fff;
  border-radius: 20px;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  box-shadow: 0 20px 42px rgba(15, 23, 42, 0.1);
  gap: 1rem;
}

.calendar-controls .form-select {
  border-radius: 12px;
  min-width: 150px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.calendar-control__selectors .form-select {
  min-width: 160px;
}

.calendar-grid {
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
}

.calendar-weekdays .col {
  padding: 0.9rem;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  background: #f9fafc;
}

.calendar-day {
  min-height: 100px;
  padding: 1rem 0.35rem;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  cursor: pointer;
  border: none;
}

.calendar-day:hover {
  background: #f4fbff;
  transform: translateY(-1px);
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.05);
}

.calendar-day:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 191, 166, 0.25);
}

.calendar-day.bg-light {
  background: #fafcff;
}

.calendar-day.islamic-event {
  background: #fff8e5;
}

.event-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
}

.modal {
  backdrop-filter: blur(6px);
}

.modal-content {
  border-radius: 18px;
}

.prayer-times {
  margin-top: 1rem;
}

.prayer-time {
  padding: 0.65rem 0;
  border-bottom: 1px solid #eee;
}

.prayer-time:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .calendar-day {
    min-height: 80px;
  }

  .calendar-controls {
    flex-direction: column;
  }

  .calendar-control__selectors .form-select {
    min-width: 120px;
  }
}

@media (max-width: 576px) {
  .calendar-controls {
    padding: 0.9rem;
  }

  .calendar-control__selectors {
    flex-direction: column;
  }
}
</style>
