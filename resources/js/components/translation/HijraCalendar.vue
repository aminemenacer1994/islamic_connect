<template>
    <div >
      <h3>{{ hijriYear }} Hijri Calendar</h3>
      <table>
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in weeks" :key="index">
            <td v-for="(day, idx) in week" :key="idx">
              <span v-if="day">{{ day }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p>Number of Days in the Year: {{ numOfDays }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hijriYear: null,
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        numOfDays: 354, // Default for a standard Hijri year (can be 354 or 355 depending on moon sighting)
        weeks: [],
      };
    },
    mounted() {
      this.fetchHijriData();
    },
    methods: {
      async fetchHijriData() {
        try {
          const response = await fetch('https://api.aladhan.com/v1/gToH?date=' + new Date().toISOString().split('T')[0]);
          const data = await response.json();
  
          // Extract current Hijri year, month, and day
          const hijriDate = data.data.hijri;
          this.hijriYear = hijriDate.year;
  
          // Fetch days and generate calendar
          this.generateHijriCalendar(hijriDate.year);
        } catch (error) {
          console.error('Error fetching Hijri data:', error);
        }
      },
      generateHijriCalendar(year) {
        // Simulate an API call for Hijri calendar structure, use dynamic data for months and days
        // Assuming the API provides dynamic details about months' days (e.g., moon sighting), you can replace this
        const months = [
          { name: 'Muharram', days: 30 },
          { name: 'Safar', days: 29 },
          { name: 'Rabi\' al-Awwal', days: 30 },
          { name: 'Rabi\' al-Thani', days: 29 },
          { name: 'Jumada al-Awwal', days: 30 },
          { name: 'Jumada al-Thani', days: 29 },
          { name: 'Rajab', days: 30 },
          { name: 'Sha\'ban', days: 29 },
          { name: 'Ramadan', days: 30 },
          { name: 'Shawwal', days: 29 },
          { name: 'Dhul-Qi\'dah', days: 30 },
          { name: 'Dhul-Hijjah', days: 29 },
        ];
  
        let currentDay = 1;
        let calendarWeeks = [];
  
        months.forEach(month => {
          let monthDaysArray = Array(month.days).fill(null).map((_, index) => index + 1);
          
          // Add empty cells at the start of each month to align with the weekday
          let firstDayOfMonth = (currentDay % 7); // Simplified weekday logic
          monthDaysArray = Array(firstDayOfMonth).fill(null).concat(monthDaysArray);
  
          // Split the month into weeks
          while (monthDaysArray.length) {
            calendarWeeks.push(monthDaysArray.splice(0, 7));
          }
  
          // Update currentDay for next month
          currentDay += month.days;
        });
  
        this.weeks = calendarWeeks;
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f4f4f4;
  }
  </style>
  