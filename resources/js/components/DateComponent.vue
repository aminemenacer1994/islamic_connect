<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <h1 class="display-5 fw-bold text-center">Date Converter</h1>
      <p class="text-center container mb-4 lead">
        A small Islamic date converter is a lightweight tool that allows users to quickly convert between the Gregorian
        (solar) calendar and the Hijri (Islamic lunar) calendar. It typically requires a simple input of a Gregorian
        date and outputs the corresponding Islamic date, or vice versa.
      </p>
      <div class="row justify-content-center">
        <div class="col-md-12 col-lg-10">
          <div class="card shadow">
            <div style="padding: 0.9rem; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; color: white; background: #00a792;">
              <h3 class="fw-bold text-center">Islamic Date Converter</h3>
            </div>
            <div class="card-body">
              <div class="row mb-4">
                <div class="col-md-6 mb-3 mb-md-0">
                  <div class="form-floating">
                    <select class="form-select" id="sourceCalendar" v-model="sourceCalendar" @change="convertDate">
                      <option value="gregorian">Gregorian</option>
                      <option value="hijri">Hijri</option>
                    </select>
                    <label for="sourceCalendar">Source Calendar</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <select class="form-select" id="targetCalendar" v-model="targetCalendar" @change="convertDate">
                      <option value="hijri">Hijri</option>
                      <option value="gregorian">Gregorian</option>
                    </select>
                    <label for="targetCalendar">Target Calendar</label>
                  </div>
                </div>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-4">
                  <div class="form-floating">
                    <select class="form-select" id="day" v-model="day" @change="convertDate">
                      <option v-for="d in daysInMonth" :value="d" :key="d">{{ d }}</option>
                    </select>
                    <label for="day">Day</label>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-floating">
                    <select class="form-select" id="month" v-model="month" @change="updateDays; convertDate()">
                      <option v-for="(m, index) in months" :value="index + 1" :key="index">{{ m }}</option>
                    </select>
                    <label for="month">Month</label>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-floating">
                    <select class="form-select" id="year" v-model="year" @change="convertDate">
                      <option v-for="y in years" :value="y" :key="y">{{ y }}</option>
                    </select>
                    <label for="year">Year</label>
                  </div>
                </div>
              </div>


              <div v-if="convertedDate" class="mt-4 p-3 bg-light rounded"
                style="border: 1px solid gray; border-radius: 20px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
                <h3 class="h5 text-center mb-3 fw-bold">Conversion Result</h3>
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <div class="p-3 bg-white rounded border" style="border: 1px solid gray; border-radius: 20px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
                      <h4 class="h6 text-muted mb-2"><b>{{ sourceCalendar === 'gregorian' ? 'Gregorian' : 'Hijri' }}</b>
                      </h4>
                      <p class="mb-1">{{ formattedSourceDate }}</p>
                      <!-- <p class="mb-0 text-muted small">{{ sourceDayName }}</p> -->
                    </div>
                  </div>
                  <div class="col-md-6 mb-2">
                    <div class="p-3 bg-white rounded border" style="border: 1px solid gray; border-radius: 20px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
                      <h4 class="h6 text-muted mb-2">{{ targetCalendar === 'gregorian' ? 'Gregorian' : 'Hijri' }}</h4>
                      <p class="mb-1">{{ formattedTargetDate }}</p>
                      <p class="mb-0 text-muted small">{{ targetDayName }}</p>
                    </div>
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
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
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
      const date = this.targetCalendar === 'gregorian'
        ? new Date(this.convertedDate.year, this.convertedDate.month - 1, this.convertedDate.day)
        : this.gregorianToHijri(this.convertedDate.year, this.convertedDate.month, this.convertedDate.day);
      return this.weekdays[date.getDay()];
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

      // Trigger your conversion
      this.convertDate();

      console.log('Current date set:', {
        day: this.day,
        month: this.month,
        year: this.year
      });
    },
    convertDate() {
      if (this.sourceCalendar === 'gregorian') {
        this.convertedDate = this.gregorianToHijri(this.year, this.month, this.day);
      } else {
        this.convertedDate = this.hijriToGregorian(this.year, this.month, this.day);
      }
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
    this.convertDate();
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
</style>