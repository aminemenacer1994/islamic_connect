<!-- <template>
  <div class="container mt-4">
    <h2 class="mb-4 text-center">Steps of Salah (Prayer)</h2>

    <div class="card container-fluid mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="/images/salat1.jpg" style="padding: 5px; border-radius: 10px;" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
    <div v-for="step in salatSteps" :key="step.id" class="card mb-4">
      <div class="card-header fw-bold">
        {{ step.id }}. {{ step.name }}
      </div>


      <div class="card-body">
        <img :src="step.image" :alt="step.name" class="img-fluid mb-3" />
        <p><strong>Arabic:</strong> {{ step.arabic }}</p>
        <p><strong>Transliteration:</strong> {{ step.transliteration }}</p>
        <p><strong>Translation:</strong> {{ step.translation }}</p>
        <p>{{ step.description }}</p>
        <ul>
          <li v-for="(detail, key) in step.details" :key="key">
            <strong>{{ key }}:</strong> {{ detail }}
          </li>
        </ul>
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      salatSteps: [
        {
          id: 1,
          name: "Takbiratul Ihram",
          image: "takbir-position.jpg",
          arabic: "الله أكبر",
          transliteration: "Allahu Akbar",
          translation: "Allah is the Greatest",
          description:
            "Begin the prayer by raising both hands up to the ears with palms facing forward while saying 'Allahu Akbar'. This marks the official start of your salah and means all worldly matters should now be disregarded.",
          details: {
            hands: "Raised to ear level, thumbs aligned with earlobes",
            posture: "Standing straight, facing Qibla",
            eyes: "Looking at the place of prostration",
            timing: "Say 'Allahu Akbar' as you raise your hands"
          }
        },
        {
          id: 2,
          name: "Qiyam (Standing)",
          image: "standing-position.jpg",
          arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
          transliteration: "Subhana Rabbiyal Adheem wa bihamdihi",
          translation: "Glory to my Lord the Great, and praise to Him",
          description:
            "After Takbir, place your right hand over your left on your chest. Begin by reciting the opening supplication (Thana), then Surah Al-Fatihah followed by another Surah or verses from the Quran.",
          details: {
            hands: "Right over left, placed below the chest",
            recitation: "Must recite Al-Fatihah in every rak'ah",
            duration: "Stand until fully reciting required verses",
            focus: "Maintain concentration on the meaning"
          }
        },
        {
          id: 3,
          name: "Ruku (Bowing)",
          image: "ruku-position.jpg",
          arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
          transliteration: "Subhana Rabbiyal Adheem",
          translation: "Glory to my Lord the Most Great",
          description:
            "While saying 'Allahu Akbar', bow down with your back straight parallel to the ground, hands gripping the knees with fingers spread apart. Maintain this position while reciting the tasbih at least three times.",
          details: {
            back: "Flat and parallel to the ground",
            hands: "Firmly gripping knees with fingers spread",
            head: "In line with the back, not lowered or raised",
            feet: "Shoulder-width apart, knees slightly bent"
          }
        },
        {
          id: 4,
          name: "Standing from Ruku",
          image: "rising-position.jpg",
          arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
          transliteration: "Sami Allahu liman hamidah",
          translation: "Allah hears those who praise Him",
          description:
            "Rise from bowing while saying 'Sami Allahu liman hamidah'. When fully standing upright, say 'Rabbana lakal hamd' (Our Lord, to You is all praise). Ensure you stand completely straight before proceeding.",
          details: {
            rising: "Come up smoothly without jerking",
            posture: "Stand completely straight before moving",
            hands: "Return to sides naturally while rising",
            duration: "Pause briefly in standing position"
          }
        },
        {
          id: 5,
          name: "Sujood (Prostration)",
          image: "sujood-position.jpg",
          arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
          transliteration: "Subhana Rabbiyal A'la",
          translation: "Glory to my Lord the Most High",
          description:
            "While saying 'Allahu Akbar', go down into prostration with seven body parts touching the ground: forehead, nose, both palms, both knees, and toes of both feet. Recite the tasbih at least three times.",
          details: {
            contact: "Seven points must touch the ground",
            arms: "Elbows raised, not touching the ground",
            feet: "Toes pointing towards Qibla",
            position: "Forehead and nose firmly on ground"
          }
        },
        {
          id: 6,
          name: "Sitting Between Prostrations",
          image: "jalsa-position.jpg",
          arabic: "رَبِّ اغْفِرْ لِي",
          transliteration: "Rabbighfir li",
          translation: "O Lord, forgive me",
          description:
            "After first prostration, sit up completely while saying 'Allahu Akbar'. Sit on your left foot which is flat on the ground while your right foot is upright with toes pointing toward Qibla. Make the supplication before second prostration.",
          details: {
            sitting: "On left foot, right foot upright",
            hands: "Resting on thighs near knees",
            duration: "Long enough to say the dua",
            posture: "Back straight during sitting"
          }
        },
        {
          id: 7,
          name: "Tashahhud (First Sitting)",
          image: "tashahhud-position.jpg",
          arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ...",
          transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibatu...",
          translation: "All compliments, prayers and pure words are due to Allah...",
          description:
            "After completing the required prostrations, sit for the Tashahhud. Raise your right index finger when reciting 'Ash-hadu an la ilaha illallah' to testify to Allah's oneness. Maintain this position until completion.",
          details: {
            finger: "Raised during Shahada portion",
            sitting: "Same as between prostrations",
            recitation: "Must be said in Arabic correctly",
            focus: "On meaning of the words"
          }
        },
        {
          id: 8,
          name: "Final Tashahhud",
          image: "final-tashahhud-position.jpg",
          arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ...",
          transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin...",
          translation: "O Allah, send prayers upon Muhammad and the family of Muhammad...",
          description:
            "In the final sitting, recite the complete Tashahhud followed by sending blessings upon the Prophet (Salawat) and any preferred supplications before ending the prayer. This is your final opportunity for dua in the salah.",
          details: {
            supplication: "Can add personal duas in this position",
            posture: "Same as first Tashahhud",
            duration: "Take time for sincere dua",
            conclusion: "Prepares for ending the prayer"
          }
        },
        {
          id: 9,
          name: "Tasleem (Ending the Prayer)",
          image: "salam-position.jpg",
          arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
          transliteration: "Assalamu alaykum wa rahmatullah",
          translation: "Peace and mercy of Allah be upon you",
          description:
            "Turn your head to the right and say 'Assalamu alaykum wa rahmatullah' then to the left repeating the same. This officially ends the prayer. Remain seated briefly to complete recommended dhikr and supplications.",
          details: {
            turn: "First to right, then to left",
            angle: "Turn until cheeks are visible from behind",
            intention: "Greeting angels and worshippers",
            completion: "Prayer is now complete"
          }
        }
      ]
    };
  }
};
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}

.card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style> -->
<!-- App.vue -->
<template>
  <div class="container py-4">
    <div class="text-center mb-4">
      <h2 class="fw-bold text-primary">🕌 Islamic Prayer & Habit Tracker</h2>
      <p class="text-muted">Track your daily prayers, habits, and reflections.</p>
    </div>

    <!-- View Toggle -->
    <div class="d-flex justify-content-center mb-3">
      <button class="btn btn-outline-primary me-2" :class="{ active: viewMode === 'month' }" @click="viewMode = 'month'">Monthly</button>
      <button class="btn btn-outline-primary me-2" :class="{ active: viewMode === 'week' }" @click="viewMode = 'week'">Weekly</button>
      <button class="btn btn-outline-primary" :class="{ active: viewMode === 'day' }" @click="viewMode = 'day'">Daily</button>
    </div>

    <!-- Calendar Header -->
    <div class="card shadow mb-3">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <button class="btn btn-sm btn-outline-secondary" @click="prevPeriod">«</button>
        <h5 class="mb-0">{{ displayTitle }}</h5>
        <button class="btn btn-sm btn-outline-secondary" @click="nextPeriod">»</button>
      </div>

      <!-- Calendar Body -->
      <div class="card-body px-1">
        <div v-if="viewMode === 'month'">
          <!-- Weekdays -->
          <div class="row text-center fw-bold border-bottom pb-2">
            <div class="col" v-for="day in weekDays" :key="day">{{ day }}</div>
          </div>
          <!-- Grid -->
          <div class="row text-center" v-for="(week, wIndex) in calendarGrid" :key="wIndex">
            <div
              class="col calendar-cell p-2 border"
              :class="{ 'bg-light': isToday(day), 'bg-success text-white': isSelected(day) }"
              v-for="(day, dIndex) in week"
              :key="dIndex"
              @click="selectDate(day)"
            >
              <span v-if="day">{{ day.getDate() }}</span>
            </div>
          </div>
        </div>

        <div v-if="viewMode === 'week'" class="row text-center">
          <div class="col calendar-cell p-2 border" v-for="day in currentWeek" :key="day" :class="{ 'bg-light': isToday(day), 'bg-success text-white': isSelected(day) }" @click="selectDate(day)">
            <div>{{ weekDays[day.getDay()] }}</div>
            <div>{{ day.getDate() }}</div>
          </div>
        </div>

        <div v-if="viewMode === 'day'" class="text-center">
          <button class="btn btn-outline-secondary" @click="goToPreviousDay">Previous</button>
          <strong class="mx-3">{{ selectedDate.toDateString() }}</strong>
          <button class="btn btn-outline-secondary" @click="goToNextDay">Next</button>
        </div>
      </div>
    </div>

    <!-- Prayer Tracker -->
    <div v-if="selectedDate" class="row g-3">
      <!-- Prayer Checkboxes -->
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <strong>Prayers on {{ selectedDate.toDateString() }}</strong>
          </div>
          <div class="card-body">
            <div v-for="prayer in prayers" :key="prayer" class="d-flex justify-content-between align-items-center mb-2">
              <span>{{ prayer }}</span>
              <button
                class="btn btn-outline-success btn-sm"
                :class="{ active: isChecked(prayer) }"
                @click="togglePrayer(prayer)"
              >
                {{ isChecked(prayer) ? '✓ Completed' : 'Mark' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes and Stats -->
      <div class="col-md-6">
        <div class="card shadow mb-3">
          <div class="card-header bg-info text-white">Daily Reflection / Notes</div>
          <div class="card-body">
            <textarea
              v-model="personalNotes[dateKey]"
              class="form-control"
              rows="4"
              placeholder="Write your thoughts, goals or intentions..."
              @input="saveNotes"
            ></textarea>
          </div>
        </div>

        <div class="card shadow">
          <div class="card-header bg-warning text-dark">Monthly Stats</div>
          <div class="card-body">
            <p>Total Prayers Marked: <strong>{{ totalMarked }}</strong></p>
            <p>Completion Rate: <strong>{{ completionRate }}%</strong></p>
            <div class="progress" style="height: 20px;">
              <div class="progress-bar bg-success" :style="{ width: completionRate + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrayerHabitTracker',
  data() {
    return {
      viewMode: 'month',
      prayers: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
      selectedDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      prayerData: {},
      personalNotes: {},
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
  },
  computed: {
    dateKey() {
      return this.selectedDate.toISOString().split('T')[0];
    },
    displayTitle() {
      if (this.viewMode === 'month') {
        return new Date(this.currentYear, this.currentMonth).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
        });
      }
      if (this.viewMode === 'week') {
        const start = this.currentWeek[0].toLocaleDateString();
        const end = this.currentWeek[6].toLocaleDateString();
        return `Week: ${start} - ${end}`;
      }
      return this.selectedDate.toDateString();
    },
    calendarGrid() {
      const first = new Date(this.currentYear, this.currentMonth, 1);
      const last = new Date(this.currentYear, this.currentMonth + 1, 0);
      const weeks = [];
      let week = Array(first.getDay()).fill(null);
      for (let day = 1; day <= last.getDate(); day++) {
        week.push(new Date(this.currentYear, this.currentMonth, day));
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      if (week.length) {
        while (week.length < 7) week.push(null);
        weeks.push(week);
      }
      return weeks;
    },
    currentWeek() {
      const selected = new Date(this.selectedDate);
      const start = new Date(selected.setDate(selected.getDate() - selected.getDay()));
      return Array.from({ length: 7 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
    },
    totalMarked() {
      const keys = Object.keys(this.prayerData);
      return keys.filter(k => k.startsWith(this.currentYear + '-') && this.prayerData[k]).length;
    },
    completionRate() {
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const totalPossible = daysInMonth * this.prayers.length;
      const completed = Object.entries(this.prayerData).filter(([k, v]) => {
        const date = new Date(k.split('_')[1]);
        return (
          date.getMonth() === this.currentMonth &&
          date.getFullYear() === this.currentYear &&
          v === true
        );
      }).length;
      return Math.round((completed / totalPossible) * 100);
    },
  },
  methods: {
    getKey(prayer) {
      return `${prayer}_${this.dateKey}`;
    },
    isChecked(prayer) {
      return !!this.prayerData[this.getKey(prayer)];
    },
    togglePrayer(prayer) {
      const key = this.getKey(prayer);
      this.prayerData[key] = !this.prayerData[key];
      this.saveData();
    },
    selectDate(day) {
      if (day) this.selectedDate = new Date(day);
    },
    isToday(day) {
      const today = new Date();
      return (
        day &&
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear()
      );
    },
    isSelected(day) {
      return (
        day &&
        day.getDate() === this.selectedDate.getDate() &&
        day.getMonth() === this.selectedDate.getMonth() &&
        day.getFullYear() === this.selectedDate.getFullYear()
      );
    },
    prevPeriod() {
      if (this.viewMode === 'month') {
        this.currentMonth--;
        if (this.currentMonth < 0) {
          this.currentMonth = 11;
          this.currentYear--;
        }
      } else if (this.viewMode === 'week') {
        this.selectedDate.setDate(this.selectedDate.getDate() - 7);
      } else {
        this.selectedDate.setDate(this.selectedDate.getDate() - 1);
      }
    },
    nextPeriod() {
      if (this.viewMode === 'month') {
        this.currentMonth++;
        if (this.currentMonth > 11) {
          this.currentMonth = 0;
          this.currentYear++;
        }
      } else if (this.viewMode === 'week') {
        this.selectedDate.setDate(this.selectedDate.getDate() + 7);
      } else {
        this.selectedDate.setDate(this.selectedDate.getDate() + 1);
      }
    },
    goToPreviousDay() {
      this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    },
    goToNextDay() {
      this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    },
    saveData() {
      localStorage.setItem('prayerData', JSON.stringify(this.prayerData));
    },
    saveNotes() {
      localStorage.setItem('personalNotes', JSON.stringify(this.personalNotes));
    },
    loadData() {
      const prayer = localStorage.getItem('prayerData');
      if (prayer) this.prayerData = JSON.parse(prayer);
      const notes = localStorage.getItem('personalNotes');
      if (notes) this.personalNotes = JSON.parse(notes);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.calendar-cell {
  min-height: 60px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s;
}
.calendar-cell:hover {
  background-color: #f0f0f0;
}
textarea {
  resize: vertical;
}
button.active {
  background-color: #0d6efd !important;
  color: white !important;
  border-color: #0d6efd !important;
}
</style>
