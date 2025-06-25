<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <h1 class="display-5 fw-bold text-center">Date Converter</h1>
      <p class="text-center container mb-2 lead">
        Easily convert between the Gregorian (solar) and Hijri (Islamic lunar) calendars. This tool is perfect for finding Islamic dates for events, holidays, or just learning more about the calendars!
      </p>
      <div class="alert alert-info text-center mb-3 container-fluid" >
        <b>Did you know?</b> The Islamic calendar is about 10-12 days shorter than the Gregorian calendar each year, so Islamic months move through the seasons!
      </div>
      <div class="row justify-content-center">
        <div class="col-md-12 col-lg-10">
          <div class="card">
            <div style="padding: 0.9rem; color: white; background: #00a792;">
              <h3 class="fw-bold text-center">Islamic Date Converter</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="convertDate">
                <div class="row mb-4">
                  <div class="col-md-6 mb-3 mb-md-0">
                    <div class="form-floating">
                      <select class="form-select" id="sourceCalendar" v-model="sourceCalendar">
                        <option value="gregorian">Gregorian</option>
                        <option value="hijri">Hijri</option>
                      </select>
                      <label for="sourceCalendar">Source Calendar</label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-floating">
                      <select class="form-select" id="targetCalendar" v-model="targetCalendar">
                        <option value="hijri">Hijri</option>
                        <option value="gregorian">Gregorian</option>
                      </select>
                      <label for="targetCalendar">Target Calendar</label>
                    </div>
                  </div>
                </div>

                <div class="row g-3 mb-4 align-items-end">
                  <div class="col-md-4">
                    <div class="form-floating">
                      <select class="form-select" id="day" v-model="day">
                        <option v-for="d in daysInMonth" :value="d" :key="d">{{ d }}</option>
                      </select>
                      <label for="day">Day</label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-floating">
                      <select class="form-select" id="month" v-model="month" @change="updateDays">
                        <option v-for="(m, index) in months" :value="index + 1" :key="index">{{ m }}</option>
                      </select>
                      <label for="month">Month</label>
                    </div>
                  </div>
                  <div class="col-md-4 d-flex flex-column flex-md-row align-items-stretch gap-2">
                    <div class="form-floating flex-fill">
                      <select class="form-select" id="year" v-model="year">
                        <option v-for="y in years" :value="y" :key="y">{{ y }}</option>
                      </select>
                      <label for="year">Year</label>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-center gap-3 mt-3">
                  <button class="btn btn-dark px-4" type="submit" >Submit</button>
                  <button class="btn btn-secondary px-4" type="button" @click="resetForm">Reset</button>
                </div>
              </form>

              <div v-if="convertedDate" class="container-fluid d-flex justify-content-center align-items-center mt-5 mb-5">
                <div class="result-card w-100" style="max-width: 700px; background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 18px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); padding: 2.5rem 1.5rem;">
                  <div class="text-center mb-4">
                    <span class="fs-2 align-middle" style="color: #00a792;">📅</span>
                    <span class="h4 fw-bold align-middle ms-2">Conversion Result</span>
                  </div>
                  <div class="row g-4 align-items-stretch mb-4">
                    <div class="col-12 col-md-6">
                      <div class="p-4 bg-white rounded-3 border h-100 d-flex flex-column justify-content-center text-center" style="border: 1px solid #e0e0e0; border-radius: 14px;">
                        <div class="text-muted mb-1">Source</div>
                        <div class="fw-bold mb-2" style="color: #00a792;">{{ sourceCalendar === 'gregorian' ? 'Gregorian' : 'Hijri' }}</div>
                        <div class="fs-4 mb-1">{{ formattedSourceDate }}</div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="p-4 bg-white rounded-3 border h-100 d-flex flex-column justify-content-center text-center" style="border: 1px solid #e0e0e0; border-radius: 14px;">
                        <div class="text-muted mb-1">Target</div>
                        <div class="fw-bold mb-2" style="color: #00a792;">{{ targetCalendar === 'gregorian' ? 'Gregorian' : 'Hijri' }}</div>
                        <div class="fs-4 mb-1">{{ formattedTargetDate }}</div>
                        <div class="mb-0 text-muted small">{{ targetDayName }}</div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" style="border-color: #e0e0e0;" />
                  <div class="d-flex flex-column align-items-center mb-4">
                    <span class="badge rounded-pill bg-light border px-3 py-2 mb-2" style="font-size: 1rem; color: #333; border: 1px solid #e0e0e0;">
                      <span class="me-2" style="color: #00a792;">📍</span>
                      <b>Your Location:</b>
                      <span v-if="userAddress">{{ userAddress }}</span>
                      <span v-else-if="locationError" class="text-danger">{{ locationError }}</span>
                      <span v-else class="text-muted">Detecting location...</span>
                    </span>
                  </div>
                  <div class="mb-2 text-center">
                    <span class="fs-5 align-middle" style="color: #00a792;">🗓️</span>
                    <span class="fw-bold align-middle ms-2">Islamic Calendar for {{ hijriMonthName }} {{ hijriYear }}</span>
                  </div>
                  <div class="d-flex justify-content-center">
                    <table class="table  w-auto bg-white mb-0 calendar-table" style="border-radius: 0.75rem; overflow: hidden; border: 1px solid #e0e0e0;">
                      <thead>
                        <tr>
                          <th v-for="day in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" :key="day" class="text-center small" style="background: #f8f9fa;">{{ day }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="week in hijriMonthGrid" :key="week[0]">
                          <td v-for="cell in week" :key="cell.day + '-' + cell.isCurrent"
                              :class="['text-center', cell.isCurrent ? 'bg-success text-white fw-bold' : '', 'small', cell.day ? 'calendar-day-cell' : '']"
                              style="vertical-align: middle; min-width: 36px; min-height: 36px;">
                            <span v-if="cell.day">{{ cell.day }}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer text-muted small text-center">
              Date conversion based on astronomical calculations
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const currentDate = new Date();
    const currentGregorianYear = currentDate.getFullYear();
    return {
      hover: false,
      sourceCalendar: 'gregorian',
      targetCalendar: 'hijri',
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentGregorianYear,
      convertedDate: null,
      gregorianMonths: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      hijriMonths: [
        'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
        'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
      ],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      defaultState: {
        sourceCalendar: 'gregorian',
        targetCalendar: 'hijri',
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentGregorianYear
      },
      userAddress: '',
      locationError: '',
    };
  },
  computed: {
    months() {
      return this.sourceCalendar === 'gregorian' ? this.gregorianMonths : this.hijriMonths;
    },
    years() {
      if (this.sourceCalendar === 'gregorian') {
        const years = [];
        for (let i = 1900; i <= 2100; i++) {
          years.push(i);
        }
        return years;
      } else {
        // Hijri years range (approximately 1340-1500 AH)
        const years = [];
        for (let i = 1340; i <= 1500; i++) {
          years.push(i);
        }
        return years;
      }
    },
    daysInMonth() {
      if (this.sourceCalendar === 'gregorian') {
        return new Date(this.year, this.month, 0).getDate();
      } else {
        // Approximate Hijri month lengths (alternating 29/30 days)
        // This is simplified - actual Hijri months depend on moon sightings
        const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        return monthLengths[this.month - 1] || 30;
      }
    },
    formattedSourceDate() {
      if (!this.convertedDate) return '';
      const monthName = this.months[this.month - 1];
      return `${this.day} ${monthName} ${this.year}`;
    },
    formattedTargetDate() {
      if (!this.convertedDate) return '';
      const date = this.convertedDate;
      const months = this.targetCalendar === 'gregorian' ? this.gregorianMonths : this.hijriMonths;
      const monthName = months[date.month - 1];
      return `${date.day} ${monthName} ${date.year}`;
    },
    sourceDayName() {
      if (!this.convertedDate) return '';
      const date = this.sourceCalendar === 'gregorian'
        ? new Date(this.year, this.month - 1, this.day)
        : this.hijriToGregorian(this.year, this.month, this.day);
      return this.weekdays[date.getDay()];
    },
    targetDayName() {
      if (!this.convertedDate) return '';
      let date;
      if (this.targetCalendar === 'gregorian') {
        date = new Date(this.convertedDate.year, this.convertedDate.month - 1, this.convertedDate.day);
      } else {
        // Convert Hijri to Gregorian, then create a Date object
        const greg = this.hijriToGregorian(this.convertedDate.year, this.convertedDate.month, this.convertedDate.day);
        date = new Date(greg.year, greg.month - 1, greg.day);
      }
      return this.weekdays[date.getDay()];
    },
    hijriMonthName() {
      if (!this.convertedDate) return '';
      // Always show the Hijri month for the result
      const hijri = this.targetCalendar === 'hijri' ? this.convertedDate : this.gregorianToHijri(this.convertedDate.year, this.convertedDate.month, this.convertedDate.day);
      return this.hijriMonths[hijri.month - 1];
    },
    hijriYear() {
      if (!this.convertedDate) return '';
      const hijri = this.targetCalendar === 'hijri' ? this.convertedDate : this.gregorianToHijri(this.convertedDate.year, this.convertedDate.month, this.convertedDate.day);
      return hijri.year;
    },
    hijriMonthGrid() {
      if (!this.convertedDate) return [];
      // Get the Hijri month and year for the result
      const hijri = this.targetCalendar === 'hijri' ? this.convertedDate : this.gregorianToHijri(this.convertedDate.year, this.convertedDate.month, this.convertedDate.day);
      const daysInMonth = this.getHijriMonthLength(hijri.year, hijri.month);
      // Find the weekday of the 1st of this Hijri month
      const gregDate = this.hijriToGregorian(hijri.year, hijri.month, 1);
      const firstDay = new Date(gregDate.year, gregDate.month - 1, gregDate.day).getDay();
      const grid = [];
      let week = new Array(firstDay).fill({ day: '' });
      for (let d = 1; d <= daysInMonth; d++) {
        const isCurrent = d === hijri.day;
        week.push({ day: d, isCurrent });
        if (week.length === 7) {
          grid.push(week);
          week = [];
        }
      }
      if (week.length) {
        while (week.length < 7) week.push({ day: '' });
        grid.push(week);
      }
      return grid;
    }
  },
  methods: {
    updateDays() {
      // Ensure selected day is within the new month's days
      if (this.day > this.daysInMonth) {
        this.day = this.daysInMonth;
      }
    },
    useCurrentDate() {
      const today = new Date();

      if (this.sourceCalendar === 'gregorian') {
        // Set Gregorian date
        this.day = today.getDate();
        this.month = today.getMonth() + 1; // Months are 0-indexed
        this.year = today.getFullYear();
      } else {
        // Convert to Hijri if needed
        const hijriDate = this.gregorianToHijri(
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDate()
        );
        this.day = hijriDate.day;
        this.month = hijriDate.month;
        this.year = hijriDate.year;
      }

      // No auto conversion
      // this.convertDate();
    },
    resetForm() {
      this.sourceCalendar = this.defaultState.sourceCalendar;
      this.targetCalendar = this.defaultState.targetCalendar;
      this.day = this.defaultState.day;
      this.month = this.defaultState.month;
      this.year = this.defaultState.year;
      this.convertedDate = null;
      this.userAddress = '';
      this.locationError = '';
    },
    convertDate() {
      if (this.sourceCalendar === 'gregorian') {
        this.convertedDate = this.gregorianToHijri(this.year, this.month, this.day);
      } else {
        this.convertedDate = this.hijriToGregorian(this.year, this.month, this.day);
      }
      this.getUserLocation();
    },
    getHijriMonthLength(year, month) {
      // Approximate Hijri month lengths (alternating 29/30 days)
      const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
      return monthLengths[(month - 1) % 12];
    },
    getUserLocation() {
      this.userAddress = '';
      this.locationError = '';
      if (!navigator.geolocation) {
        this.locationError = 'Geolocation is not supported by your browser.';
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          // Use a free geocoding API (e.g., OpenStreetMap Nominatim)
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              if (data.address) {
                const { city, town, village, state, country } = data.address;
                this.userAddress = [city || town || village, state, country].filter(Boolean).join(', ');
              } else {
                this.userAddress = 'Location found, but address unavailable.';
              }
            })
            .catch(() => {
              this.locationError = 'Could not retrieve address.';
            });
        },
        error => {
          if (error.code === error.PERMISSION_DENIED) {
            this.locationError = 'Location permission denied.';
          } else {
            this.locationError = 'Could not retrieve location.';
          }
        }
      );
    },
    gregorianToHijri(gYear, gMonth, gDay) {
      // This is a simplified conversion using the Um Al-Qura algorithm
      // For production, you might want to use a more accurate library
      const date = new Date(gYear, gMonth - 1, gDay);
      const epoch = new Date(622, 6, 16); // Julian date for 1 Muharram 1 AH
      const diffDays = Math.floor((date - epoch) / (1000 * 60 * 60 * 24));

      let hijriYear = Math.floor((diffDays - 1) / 354.36667) + 1;
      let hijriDay = diffDays - Math.floor(354.36667 * (hijriYear - 1));

      // Approximate month calculation
      const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
      let hijriMonth = 1;
      let remainingDays = hijriDay;

      for (let i = 0; i < 12; i++) {
        if (remainingDays <= monthLengths[i]) {
          hijriMonth = i + 1;
          break;
        }
        remainingDays -= monthLengths[i];
      }

      return {
        day: remainingDays,
        month: hijriMonth,
        year: hijriYear
      };
    },
    hijriToGregorian(hYear, hMonth, hDay) {
      // Simplified conversion - inverse of the above
      const epoch = new Date(622, 6, 16);
      const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];

      let totalDays = 0;
      for (let y = 1; y < hYear; y++) {
        totalDays += Math.floor(354 + (y % 30 === 2 || y % 30 === 5 || y % 30 === 7 ||
          y % 30 === 10 || y % 30 === 13 || y % 30 === 16 || y % 30 === 18 ||
          y % 30 === 21 || y % 30 === 24 || y % 30 === 26 || y % 30 === 29) ? 1 : 0);
      }

      for (let m = 1; m < hMonth; m++) {
        totalDays += monthLengths[m - 1];
      }

      totalDays += hDay - 1;

      const gregorianDate = new Date(epoch);
      gregorianDate.setDate(epoch.getDate() + totalDays);

      return {
        day: gregorianDate.getDate(),
        month: gregorianDate.getMonth() + 1,
        year: gregorianDate.getFullYear()
      };
    }
  },
  mounted() {
    // No auto conversion on mount
    // this.convertDate();
  }
};
</script>

<style scoped>
.card {
  border-radius: 0.75rem;
  overflow: hidden;
}

.form-select,
.form-control {
  border-radius: 0.5rem;
}

.card-body {
  padding: 2rem;
}

.card-footer {
  padding: 1rem;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.rounded {
  border-radius: 0.5rem !important;
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
  border-radius: 20px;
}

.calendar-table th, .calendar-table td {
  text-align: center;
  vertical-align: middle;
  padding: 0.5rem 0.7rem;
}
.calendar-day-cell {
  border-radius: 8px;
  transition: background 0.2s;
}
.calendar-day-cell.bg-success {
  box-shadow: 0 2px 8px rgba(0,167,146,0.08);
}
@media (max-width: 768px) {
  .result-card {
    padding: 1.2rem 0.2rem !important;
  }
}
</style>