<template>
  <div class="min-vh-100 bg-light py-5">
    <div class="container">
      <h1 class="display-4 text-center fw-bold text-primary mb-3">
        Prayer Times Calendar
      </h1>
      <p class="text-center lead text-muted mb-5 mx-auto" style="max-width: 600px;">
        Get accurate Salah times worldwide. Enter city, country, and month, and customize settings for precise local results.
      </p>

      <div class="card shadow-lg rounded-3 p-4 p-md-5">
        <!-- Search Form -->
        <form
          @submit.prevent="getPrayerTimes"
          class="row g-3 mb-4"
          aria-label="Prayer Times Search Form"
        >
          <div class="col-md-3">
            <label for="city" class="form-label fw-medium">City</label>
            <input
              id="city"
              v-model.trim="city"
              type="text"
              class="form-control"
              placeholder="e.g., London"
              required
              aria-label="City name"
              autofocus
            />
          </div>

          <div class="col-md-3">
            <label for="country" class="form-label fw-medium">Country</label>
            <input
              id="country"
              v-model.trim="country"
              type="text"
              class="form-control"
              placeholder="e.g., United Kingdom"
              required
              aria-label="Country name"
            />
          </div>

          <div class="col-md-3">
            <label for="monthYear" class="form-label fw-medium">Month/Year</label>
            <input
              id="monthYear"
              v-model="monthYear"
              type="month"
              class="form-control"
              required
              aria-label="Select month and year"
            />
          </div>

          <div class="col-md-3">
            <label for="method" class="form-label fw-medium">Calculation Method</label>
            <select
              id="method"
              v-model="method"
              class="form-select"
              required
              aria-label="Prayer calculation method"
            >
              <option disabled value="">Select Method</option>
              <option v-for="[value, name] in Object.entries(methods)" :key="value" :value="value">
                {{ name }}
              </option>
            </select>
          </div>

          <div class="col-md-3">
            <label for="school" class="form-label fw-medium">School of Thought</label>
            <select
              id="school"
              v-model="school"
              class="form-select"
              required
              aria-label="School of thought"
            >
              <option value="0">Shafi'i/Maliki/Hanbali</option>
              <option value="1">Hanafi</option>
            </select>
          </div>

          <div class="col-md-3">
            <label for="timezone" class="form-label fw-medium">Timezone Override</label>
            <select
              id="timezone"
              v-model="timezoneOverride"
              class="form-select"
              aria-label="Timezone override"
            >
              <option value="">Use API Timezone</option>
              <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
            </select>
          </div>

          <div class="col-md-3 d-flex align-items-end gap-2">
            <button
              type="submit"
              class="btn btn-primary px-4"
              :disabled="loading"
              :class="{ 'd-flex align-items-center gap-2': loading }"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              {{ loading ? 'Loading...' : 'Get Times' }}
            </button>
            <button
              v-if="submitted"
              type="button"
              class="btn btn-outline-secondary px-4"
              @click="resetFields"
            >
              Clear
            </button>
          </div>
        </form>

        <!-- Advanced Settings -->
        <div class="mb-4">
          <button
            type="button"
            class="btn btn-link text-primary text-decoration-none d-flex align-items-center gap-2"
            @click="showAdvanced = !showAdvanced"
            aria-label="Toggle advanced settings"
          >
            <i
              :class="showAdvanced ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"
              aria-hidden="true"
            ></i>
            {{ showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings' }}
          </button>

          <div v-if="showAdvanced" class="mt-3">
            <!-- Time Adjustments -->
            <h6 class="fw-bold mb-3">Time Adjustments (minutes)</h6>
            <div class="row g-3 mb-4">
              <div v-for="prayer in prayerNames" :key="prayer" class="col-md-2 col-6">
                <label :for="prayer" class="form-label">{{ prayer }} (min)</label>
                <input
                  :id="prayer"
                  v-model.number="adjustments[prayer]"
                  type="number"
                  class="form-control"
                  placeholder="0"
                  :aria-label="`${prayer} time adjustment in minutes`"
                />
              </div>
            </div>

            <!-- Custom Angles -->
            <h6 class="fw-bold mb-3">Custom Angles (degrees)</h6>
            <div class="row g-3">
              <div class="col-md-3 col-6">
                <label for="fajrAngle" class="form-label">Fajr Angle</label>
                <input
                  id="fajrAngle"
                  v-model.number="customAngles.fajr"
                  type="number"
                  step="0.1"
                  class="form-control"
                  placeholder="e.g., 18"
                  aria-label="Fajr angle in degrees"
                />
              </div>
              <div class="col-md-3 col-6">
                <label for="ishaAngle" class="form-label">Isha Angle</label>
                <input
                  id="ishaAngle"
                  v-model.number="customAngles.isha"
                  type="number"
                  step="0.1"
                  class="form-control"
                  placeholder="e.g., 17"
                  aria-label="Isha angle in degrees"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="alert alert-danger d-flex align-items-center gap-2 mb-4"
          role="alert"
        >
          <i class="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
          {{ errorMessage }}
        </div>

        <!-- Results -->
        <div v-if="prayerData.length && !errorMessage" class="mt-4" aria-live="polite">
          <h2 class="h4 text-center fw-semibold text-primary mb-3">
            Prayer Times for {{ city }} – {{ monthName }} {{ year }}
            <small v-if="displayTimezone" class="text-muted ms-2">({{ displayTimezone }})</small>
          </h2>
          <div class="table-responsive rounded-3 border">
            <table class="table table-hover table-bordered align-middle mb-0">
              <thead class="table-primary sticky-top">
                <tr>
                  <th scope="col" class="text-center">Date</th>
                  <th scope="col" class="text-center">Fajr</th>
                  <th scope="col" class="text-center">Sunrise</th>
                  <th scope="col" class="text-center">Dhuhr</th>
                  <th scope="col" class="text-center">Asr</th>
                  <th scope="col" class="text-center">Maghrib</th>
                  <th scope="col" class="text-center">Isha</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="day in prayerData"
                  :key="day.date"
                  :class="{ 'table-info fw-semibold': isToday(day.date) }"
                >
                  <td class="text-center">{{ formatDate(day.date) }}</td>
                  <td class="text-center">{{ day.fajr }}</td>
                  <td class="text-center">{{ day.sunrise }}</td>
                  <td class="text-center">{{ day.dhuhr }}</td>
                  <td class="text-center">{{ day.asr }}</td>
                  <td class="text-center">{{ day.maghrib }}</td>
                  <td class="text-center">{{ day.isha }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';

// Common timezones for override
const TIMEZONES = [
  'UTC', 'GMT', 'BST', 'EST', 'EDT', 'CST', 'CDT', 'MST', 'MDT', 'PST', 'PDT',
  'Asia/Riyadh', 'Asia/Dubai', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Jakarta',
  'Europe/Paris', 'Europe/Moscow', 'Australia/Sydney', 'Pacific/Auckland'
];

export default {
  name: 'PrayerTimes',
  data() {
    return {
      city: '',
      country: '',
      method: '',
      methods: {
        '2': 'Muslim World League',
        '1': 'Islamic Society of North America (ISNA)',
        '3': 'Egyptian General Authority',
        '4': 'Umm al-Qura University',
        '5': 'University of Islamic Sciences, Karachi'
      },
      school: '',
      adjustments: {
        Fajr: 0,
        Sunrise: 0,
        Dhuhr: 0,
        Asr: 0,
        Maghrib: 0,
        Isha: 0
      },
      customAngles: {
        fajr: null,
        isha: null
      },
      prayerNames: ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
      prayerData: [],
      monthYear: '',
      monthName: '',
      year: '',
      timezone: '',
      timezoneOverride: '',
      timezones: TIMEZONES,
      submitted: false,
      loading: false,
      errorMessage: '',
      showAdvanced: false,
      debugLogs: [],
      monthCheckInterval: null
    };
  },
  computed: {
    displayTimezone() {
      return this.timezoneOverride || this.timezone;
    }
  },
  mounted() {
    this.startMonthCheckInterval();
  },
  beforeUnmount() {
    if (this.monthCheckInterval) {
      clearInterval(this.monthCheckInterval);
    }
  },
  methods: {
    logDebug(message, data = null) {
      const logEntry = { timestamp: new Date().toISOString(), message, data };
      this.debugLogs.push(logEntry);
      console.log(`[DEBUG ${logEntry.timestamp}] ${message}`, data || '');
    },

    async fetchWithRetry(url, retries = 3, delay = 1000) {
      for (let i = 0; i < retries; i++) {
        try {
          this.logDebug(`Fetching URL (attempt ${i + 1}/${retries})`, { url });
          const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          this.logDebug('Fetch successful', { status: response.status, data });
          return data;
        } catch (error) {
          this.logDebug('Fetch attempt failed', { error: error.message });
          if (i < retries - 1) {
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
            continue;
          }
          throw error;
        }
      }
    },

    sanitizeInput(input) {
      const sanitized = input.replace(/[^a-zA-Z0-9\s,-]/g, '').trim();
      this.logDebug('Sanitized input', { input, sanitized });
      return sanitized;
    },

    applyTimezoneOffset(time, sourceTimezone, targetTimezone) {
      if (!time || !sourceTimezone || !targetTimezone || sourceTimezone === targetTimezone) {
        return time;
      }
      try {
        // Extract time without timezone (e.g., "04:30" from "04:30 (BST)")
        const cleanTime = time.replace(/\s*\(.*\)/, '');
        const [hours, minutes] = cleanTime.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) return time;

        // Create date objects in source and target timezones
        const sourceDate = new Date(Date.UTC(2025, 0, 1, hours, minutes));
        const sourceStr = sourceDate.toLocaleString('en-US', { timeZone: sourceTimezone });
        const targetStr = sourceDate.toLocaleString('en-US', { timeZone: targetTimezone });

        const targetDate = new Date(targetStr);
        const adjustedTime = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
        this.logDebug('Applied timezone offset', { time, sourceTimezone, targetTimezone, adjustedTime });
        return adjustedTime;
      } catch (error) {
        this.logDebug('Timezone offset error', { error: error.message });
        return time;
      }
    },

    applyCustomAngles(data, fajrAngle, ishaAngle) {
      if (!fajrAngle && !ishaAngle) return data;
      this.logDebug('Applying custom angles', { fajrAngle, ishaAngle });
      // Note: Aladhan API doesn't support direct angle overrides in calendarByCity
      // For simplicity, log intent; actual angle adjustment requires a custom calculation
      // This would need a prayer time calculation library (e.g., Adhan.js) for precision
      return data.map(day => ({
        ...day,
        fajr: fajrAngle ? this.adjustPrayerTime(day.fajr, fajrAngle, 'fajr') : day.fajr,
        isha: ishaAngle ? this.adjustPrayerTime(day.isha, ishaAngle, 'isha') : day.isha
      }));
    },

    adjustPrayerTime(time, angle, prayer) {
      // Placeholder: Real adjustment requires astronomical calculations
      this.logDebug(`Adjusting ${prayer} time with custom angle (placeholder)`, { time, angle });
      return time; // Implement with Adhan.js for accurate angle-based adjustments
    },

    applyAdjustment(time, adjustment) {
      if (!time || typeof time !== 'string' || isNaN(adjustment)) {
        this.logDebug('Skipping adjustment due to invalid input', { time, adjustment });
        return time || '--:--';
      }
      try {
        const cleanTime = time.replace(/\s*\(.*\)/, '');
        const [hours, minutes] = cleanTime.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) return time;
        const date = new Date(0, 0, 0, hours, minutes + adjustment);
        const adjustedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        this.logDebug('Applied time adjustment', { time, adjustment, adjustedTime });
        return adjustedTime;
      } catch (error) {
        this.logDebug('Adjustment error', { error: error.message });
        return time;
      }
    },

    getPrayerTimes: debounce(async function () {
      const city = this.sanitizeInput(this.city);
      const country = this.sanitizeInput(this.country);
      let year, month;
      if (this.monthYear) {
        [year, month] = this.monthYear.split('-').map(Number);
      }

      if (!city || !country || !year || !month || !this.method || !this.school) {
        this.errorMessage = 'Please provide city, country, month/year, calculation method, and school of thought.';
        this.submitted = true;
        this.loading = false;
        this.logDebug('Validation failed: missing required fields');
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      this.submitted = true;
      this.monthName = new Date(year, month - 1).toLocaleString('en-US', { month: 'long' });
      this.year = year;
      this.timezone = '';
      this.logDebug('Starting prayer times fetch', { city, country, year, month, method: this.method, school: this.school });

      // Cache key
      const cacheKey = `prayer-${city}-${country}-${this.method}-${this.school}-${year}-${month}-${this.customAngles.fajr}-${this.customAngles.isha}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          if (
            parsedData[0]?.date.startsWith(`${year}-${month.toString().padStart(2, '0')}`) &&
            parsedData.length > 0
          ) {
            this.prayerData = parsedData;
            this.timezone = parsedData[0]?.timezone || '';
            this.loading = false;
            this.logDebug('Loaded data from cache', { cacheKey, dataLength: parsedData.length });
            return;
          } else {
            localStorage.removeItem(cacheKey);
            this.logDebug('Removed invalid cache', { cacheKey });
          }
        } catch {
          localStorage.removeItem(cacheKey);
          this.logDebug('Removed corrupt cache', { cacheKey });
        }
      }

      try {
        // Primary API: Aladhan
        let prayerTimes = [];
        try {
          const aladhanUrl = `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${this.method}&school=${this.school}${this.customAngles.fajr ? `&fajrAngle=${this.customAngles.fajr}` : ''}${this.customAngles.isha ? `&ishaAngle=${this.customAngles.isha}` : ''}`;
          const aladhanData = await this.fetchWithRetry(aladhanUrl);

          if (aladhanData.code === 200 && aladhanData.data && aladhanData.data.length) {
            prayerTimes = aladhanData.data.map((dayData, index) => {
              const day = index + 1;
              const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
              const timings = dayData.timings;
              const timezoneMatch = timings.Fajr.match(/\((.*?)\)/);
              const timezone = timezoneMatch ? timezoneMatch[1] : '';
              return {
                date,
                fajr: this.applyTimezoneOffset(this.applyAdjustment(timings.Fajr, this.adjustments.Fajr), timezone, this.timezoneOverride),
                sunrise: this.applyTimezoneOffset(this.applyAdjustment(timings.Sunrise, this.adjustments.Sunrise), timezone, this.timezoneOverride),
                dhuhr: this.applyTimezoneOffset(this.applyAdjustment(timings.Dhuhr, this.adjustments.Dhuhr), timezone, this.timezoneOverride),
                asr: this.applyTimezoneOffset(this.applyAdjustment(timings.Asr, this.adjustments.Asr), timezone, this.timezoneOverride),
                maghrib: this.applyTimezoneOffset(this.applyAdjustment(timings.Maghrib, this.adjustments.Maghrib), timezone, this.timezoneOverride),
                isha: this.applyTimezoneOffset(this.applyAdjustment(timings.Isha, this.adjustments.Isha), timezone, this.timezoneOverride),
                timezone,
                source: 'Aladhan'
              };
            });
            this.timezone = prayerTimes[0].timezone;
            this.logDebug('Aladhan API data processed', { dataLength: prayerTimes.length, timezone: this.timezone });
          } else {
            throw new Error(aladhanData.status || 'Invalid Aladhan response');
          }
        } catch (aladhanError) {
          this.logDebug('Aladhan API failed, attempting MuslimSalat', { error: aladhanError.message });
          // Secondary API: MuslimSalat
          const muslimSalatUrl = `https://www.muslimsalat.com/api/v1/prayer_times?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&year=${year}&month=${month}&method=${this.method}`;
          try {
            const muslimSalatData = await this.fetchWithRetry(muslimSalatUrl);
            if (muslimSalatData.status === 'success' && muslimSalatData.data) {
              prayerTimes = muslimSalatData.data.map((dayData, index) => {
                const day = index + 1;
                const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                const timings = dayData.times;
                const timezone = muslimSalatData.timezone || '';
                return {
                  date,
                  fajr: this.applyTimezoneOffset(this.applyAdjustment(timings.fajr, this.adjustments.Fajr), timezone, this.timezoneOverride),
                  sunrise: this.applyTimezoneOffset(this.applyAdjustment(timings.sunrise, this.adjustments.Sunrise), timezone, this.timezoneOverride),
                  dhuhr: this.applyTimezoneOffset(this.applyAdjustment(timings.dhuhr, this.adjustments.Dhuhr), timezone, this.timezoneOverride),
                  asr: this.applyTimezoneOffset(this.applyAdjustment(timings.asr, this.adjustments.Asr), timezone, this.timezoneOverride),
                  maghrib: this.applyTimezoneOffset(this.applyAdjustment(timings.maghrib, this.adjustments.Maghrib), timezone, this.timezoneOverride),
                  isha: this.applyTimezoneOffset(this.applyAdjustment(timings.isha, this.adjustments.Isha), timezone, this.timezoneOverride),
                  timezone,
                  source: 'MuslimSalat'
                };
              });
              this.timezone = prayerTimes[0].timezone;
              this.logDebug('MuslimSalat API data processed', { dataLength: prayerTimes.length, timezone: this.timezone });
            } else {
              throw new Error('Invalid MuslimSalat response');
            }
          } catch (muslimSalatError) {
            this.logDebug('MuslimSalat API failed', { error: muslimSalatError.message });
            throw new Error(`Both APIs failed: Aladhan (${aladhanError.message}), MuslimSalat (${muslimSalatError.message})`);
          }
        }

        if (prayerTimes.length) {
          this.prayerData = prayerTimes;
          localStorage.setItem(cacheKey, JSON.stringify(this.prayerData));
          this.logDebug('Prayer times saved to cache', { cacheKey, dataLength: prayerTimes.length });
        } else {
          throw new Error('No prayer times retrieved from either API');
        }
      } catch (error) {
        this.errorMessage = `Failed to fetch prayer times: ${error.message}. Please check inputs or try again.`;
        this.prayerData = [];
        this.logDebug('Fetch error', { error: error.message });
      } finally {
        this.loading = false;
      }
    }, 300),

    formatDate(dateStr) {
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        const formatted = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(date);
        this.logDebug('Formatted date', { dateStr, formatted });
        return formatted;
      } catch {
        return dateStr;
      }
    },

    isToday(dateStr) {
      try {
        const today = new Date().toISOString().split('T')[0];
        const isToday = dateStr === today;
        this.logDebug('Checked if date is today', { dateStr, isToday });
        return isToday;
      } catch {
        return false;
      }
    },

    resetFields() {
      this.city = '';
      this.country = '';
      this.method = '';
      this.school = '';
      this.monthYear = '';
      this.timezoneOverride = '';
      this.adjustments = Object.fromEntries(this.prayerNames.map(name => [name, 0]));
      this.customAngles = { fajr: null, isha: null };
      this.prayerData = [];
      this.submitted = false;
      this.errorMessage = '';
      this.showAdvanced = false;
      this.timezone = '';
      this.debugLogs = [];
      this.logDebug('Fields reset');
    },

    startMonthCheckInterval() {
      this.monthCheckInterval = setInterval(() => {
        const today = new Date();
        const newMonth = today.getMonth() + 1;
        const newYear = today.getFullYear();
        const currentMonthYear = `${newYear}-${newMonth.toString().padStart(2, '0')}`;
        if (this.submitted && this.monthYear && this.monthYear !== currentMonthYear) {
          this.monthYear = currentMonthYear;
          this.getPrayerTimes();
          this.logDebug('Month check triggered refresh', { newMonthYear: currentMonthYear });
        }
      }, 24 * 60 * 60 * 1000);
    }
  }
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 1rem;
  background: #fff;
}

.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}

.table-responsive::-webkit-scrollbar {
  width: 6px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background-color: #6c757d;
  border-radius: 10px;
}

thead.sticky-top {
  top: 0;
  z-index: 10;
}

.table-info {
  background-color: #e7f1ff !important;
}

@media (max-width: 576px) {
  .table thead th,
  .table tbody td {
    font-size: 0.85rem;
    padding: 0.5rem;
  }
}
</style>