<template>
  <div class="salat-guide">
    <h1>Step-by-Step Salat Guide</h1>
    
    <div class="controls">
      <label>
        <input type="checkbox" v-model="showArabic" /> Arabic
      </label>
      <label>
        <input type="checkbox" v-model="showTransliteration" /> Transliteration
      </label>
      <label>
        <input type="checkbox" v-model="showTranslation" /> Translation
      </label>
    </div>
    
    <div class="steps">
      <div v-for="step in salatSteps" :key="step.id" class="step">
        <h2>{{ step.name }} <span class="step-number">Step {{ step.id }}</span></h2>
        
        <div class="step-content">
          <div class="image-placeholder">
            [Image: {{ step.image }}]
            <!-- In real app: <img :src="'/images/' + step.image" :alt="step.name"> -->
          </div>
          
          <div class="text-content">
            <div class="arabic" v-if="showArabic">{{ step.arabic }}</div>
            <div class="transliteration" v-if="showTransliteration">{{ step.transliteration }}</div>
            <div class="translation" v-if="showTranslation">{{ step.translation }}</div>
            <p class="description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showArabic: true,
      showTransliteration: true,
      showTranslation: true,
      salatSteps: [
        {
          id: 1,
          name: "Takbiratul Ihram",
          image: "takbir.jpg",
          arabic: "الله أكبر",
          transliteration: "Allahu Akbar",
          translation: "Allah is the Greatest",
          description: "Raise your hands to your ears and say Allahu Akbar to begin the prayer."
        },
        {
          id: 2,
          name: "Qiyam (Standing)",
          image: "standing.jpg",
          arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
          transliteration: "Subhana Rabbiyal Adheem wa bihamdihi",
          translation: "Glory to my Lord the Great, and praise to Him",
          description: "Recite Surah Al-Fatihah followed by another Surah while standing."
        },
        {
          id: 3,
          name: "Ruku (Bowing)",
          image: "ruku.jpg",
          arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
          transliteration: "Subhana Rabbiyal Adheem",
          translation: "Glory to my Lord the Most Great",
          description: "Bow down with your back straight, hands on knees, and recite this tasbih three times."
        },
        {
          id: 4,
          name: "Standing from Ruku",
          image: "standing-ruku.jpg",
          arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
          transliteration: "Sami Allahu liman hamidah",
          translation: "Allah hears those who praise Him",
          description: "Raise up from bowing while saying this phrase, then stand straight."
        },
        {
          id: 5,
          name: "Sujood (Prostration)",
          image: "sujood.jpg",
          arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
          transliteration: "Subhana Rabbiyal A'la",
          translation: "Glory to my Lord the Most High",
          description: "Place forehead, nose, palms, knees and toes on the ground while reciting this."
        },
        {
          id: 6,
          name: "Sitting Between Prostrations",
          image: "jalsa.jpg",
          arabic: "رَبِّ اغْفِرْ لِي",
          transliteration: "Rabbighfir li",
          translation: "O Lord, forgive me",
          description: "Sit briefly between the two prostrations making this supplication."
        },
        {
          id: 7,
          name: "Tashahhud (First Sitting)",
          image: "tashahhud.jpg",
          arabic: "التَّحِيَّاتُ لِلَّهِ...",
          transliteration: "At-tahiyyatu lillahi...",
          translation: "All compliments, prayers and pure words are due to Allah...",
          description: "Recited during the first sitting in prayers with three or four rak'ahs."
        },
        {
          id: 8,
          name: "Final Tashahhud",
          image: "final-tashahhud.jpg",
          arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ...",
          transliteration: "Allahumma salli 'ala Muhammadin...",
          translation: "O Allah, send prayers upon Muhammad...",
          description: "Recited in the final sitting before the salam."
        },
        {
          id: 9,
          name: "Tasleem (Ending the Prayer)",
          image: "tasleem.jpg",
          arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
          transliteration: "Assalamu alaykum wa rahmatullah",
          translation: "Peace and mercy of Allah be upon you",
          description: "Turn your head right and left while saying this to conclude."
        }
      ]
    }
  }
}
</script>

<style>
.salat-guide {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

.controls {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.step {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.step h2 {
  margin-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-number {
  background: #4CAF50;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.step-content {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.image-placeholder {
  width: 200px;
  height: 150px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.text-content {
  flex: 1;
}

.arabic {
  font-size: 1.5rem;
  text-align: right;
  margin-bottom: 10px;
  font-family: 'Traditional Arabic', Arial, sans-serif;
}

.transliteration {
  font-style: italic;
  color: #555;
  margin-bottom: 10px;
}

.translation {
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  color: #666;
  line-height: 1.5;
}
</style>