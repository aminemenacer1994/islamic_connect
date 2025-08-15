<template>
  <div class="names-container container py-5">
    <!-- Header -->
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold text-dark">99 Names of Allah</h2>
      <p class="lead">
        The 99 Names of Allah, also known as Asma’ul Husna, represent the beautiful
        attributes and qualities of Allah mentioned in the Qur’an and Sunnah.
      </p>
    </div>

    <!-- Search & Filters -->
    <div>
      <div class="row text-center">
        <!-- Toggle switches (left column) -->
        <div class="col-12 col-lg-6 mb-3">
          <div class="d-flex gap-3 justify-content-center p-3 rounded">
            <div class="form-check form-switch fs-5 text-white">
              <input class="form-check-input custom-success" type="checkbox" id="arabicToggle" v-model="showArabic">
              <label class="form-check-label text-dark" for="arabicToggle"><b>Arabic</b></label>
            </div>
            <div class="form-check form-switch fs-5 text-white">
              <input class="form-check-input custom-success" type="checkbox" id="translationToggle"
                v-model="showTranslation" checked>
              <label class="form-check-label text-dark" for="translationToggle"><b>Meaning</b></label>
            </div>
            <div class="form-check form-switch fs-5 text-white">
              <input class="form-check-input custom-success" type="checkbox" id="descToggle" v-model="showDescription"
                checked>
              <label class="form-check-label text-dark" for="descToggle"><b>Description</b></label>
            </div>
          </div>
        </div>


        <!-- Search bar (right column) -->
        <div class="col-12 col-lg-6 mb-3">
          <div class="input-group input-group-lg" style="border-radius: 8px;">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control border-start-0" placeholder="Search names..." v-model="searchQuery"
              @input="filterNames" />
          </div>
        </div>
      </div>

      <!-- Liked Names Section -->
      <div class="mb-5">
        <div class="d-flex flex-row align-items-center mb-3 gap-3">
          <h3 class="fw-bold mb-0">Liked Allah’s Names <span class="badge bg-success">{{ favoriteNames.length }}</span>
          </h3>
          <div class="ms-auto">
            <button class="btn btn-outline-danger me-2" :disabled="favoriteNames.length === 0"
              @click="clearAllFavorites" v-if="favoriteNames.length > 0">
              Unlike All
            </button>
            <button v-if="favoriteNames.length > 0" class="btn btn-outline-primary" type="button"
              data-bs-toggle="collapse" data-bs-target="#likedNamesCollapse" aria-expanded="true"
              aria-controls="likedNamesCollapse">
              <i :class="isCollapsed ? 'bi bi-chevron-down' : 'bi bi-chevron-up'"></i>
            </button>
          </div>
        </div>
        <div class="collapse show" id="likedNamesCollapse">
          <div class="row g-4">
            <div v-for="name in favoriteNamesData" :key="'fav-' + name.number" class="col-12 col-md-4">
              <div class="card h-100" style="border-radius: 8px;">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <span class="badge bg-secondary fs-6">{{ name.number }}</span>
                    <i class="bi bi-heart-fill text-danger fs-4 cursor-pointer"
                      @click="toggleFavorite(name.number)"></i>
                  </div>
                  <p class="mt-3 mb-2" style="font-size: 1.6rem;color:black"><b>{{ name.name }}</b></p>
                  <div class="display-5 text-end" dir="rtl">
                    <strong class="medium text-muted" style="font-size: 2.4rem;">{{ name.arabic }}</strong>
                  </div>
                  <div v-if="showTranslation" class="mt-3">
                    <strong style="font-size: 1.6rem;">Meaning:</strong>
                    <p class="small text-muted" style="font-size: 1.2rem;">{{ name.translation }}</p>
                  </div>

                  <div v-if="showDescription" class="mt-2">
                    <strong style="font-size: 1.6rem;">Description:</strong>
                    <p class="small text-muted" style="font-size: 1.2rem;">{{ name.description }}</p>
                  </div>

                  <div class="d-flex justify-content-between align-items-center gap-2">
                    <!-- Copy to Clipboard Button -->
                    <button class="btn d-flex align-items-center justify-content-center flex-grow-1 me-2"
                      @click="copyToClipboard(name)" style="background: #00bfa6; color: white; height: 38px">
                      <span class="text-center w-100">
                        <b>Copy to Clipboard</b>
                      </span>
                    </button>

                    <!-- WhatsApp Share Button -->
                    <a class="btn d-flex align-items-center justify-content-center flex-grow-1"
                      :href="generateWhatsAppLink(name)" target="_blank" rel="noopener"
                      style="background: #00bfa6; color: white; height: 38px">
                      <b>Share on WhatsApp</b>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="fw-bold mb-3">All Allah's Names</h3>

      <!-- Names Grid -->
      <div class="row g-4 mt-2">
        <div v-for="name in filteredNames" :key="name.number" class="col-12 col-md-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start">
                <span class="badge bg-secondary fs-6">{{ name.number }}</span>
                <i :class="['bi', isFavorited(name.number) ? 'bi-heart-fill' : 'bi-heart', 'fs-4', 'cursor-pointer']"
                  :style="{ color: isFavorited(name.number) ? 'red' : 'black' }"
                  @click="toggleFavorite(name.number)"></i>
              </div>

              <p class="mt-3 mb-2" style="font-size: 1.6rem;color:black"><b>{{ name.name }}</b></p>

              <div v-if="showArabic" class="display-5 text-end" dir="rtl">
                <strong class="medium text-muted" style="font-size: 2.4rem;">{{ name.arabic }}</strong>
              </div>

              <div v-if="showTranslation" class="mt-3">
                <strong style="font-size: 1.6rem;">Meaning:</strong>
                <p class="small text-muted" style="font-size: 1.2rem;">{{ name.translation }}</p>
              </div>

              <div v-if="showDescription" class="mt-2">
                <strong style="font-size: 1.6rem;">Description:</strong>
                <p class="small text-muted" style="font-size: 1.2rem;">{{ name.description }}</p>
              </div>

              <div class="d-flex justify-content-between align-items-center gap-2">
                <!-- Copy to Clipboard Button -->
                <button class="btn d-flex align-items-center justify-content-center flex-grow-1 me-2"
                  @click="copyToClipboard(name)" style="background: #1881b9; color: white; height: 38px">
                  <span class="text-center w-100">
                    <i class="bi bi-clipboard me-2"></i>
                    <b>Copy</b>
                  </span>
                </button>

                <!-- WhatsApp Share Button -->
                <a class="btn d-flex align-items-center justify-content-center flex-grow-1"
                  :href="generateWhatsAppLink(name)" target="_blank" rel="noopener"
                  style="background: #00bfa6; color: white; height: 38px">
                  <i class="bi bi-whatsapp me-2"></i>
                  <b>Share</b>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="container" />

      <!-- No Results -->
      <!-- <div v-if="filteredNames.length === 0" class="text-center py-5">
        <h3 class="text-muted">No names found</h3>
        <button @click="resetFilters" class="btn btn-outline-dark mt-3">Reset Filters</button>
      </div> -->

      <!-- Floating Action Button -->
      <!-- <button v-show="showScrollToTop" @click="scrollToTop"
        class="btn position-fixed rounded-circle d-flex align-items-center justify-content-center"
        style="bottom: 1.5rem; right: 1.5rem; width: 3.5rem; height: 3.5rem; background: rgb(13, 182, 145); color: white;"
        title="Back to Top">
        <i class="bi bi-chevron-up h3 fs-5"></i>
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'NamesOfAllah',
  data() {
    return {
      names: [
        {
          number: 1,
          name: "Ar-Rahman",
          arabic: "الرَّحْمَنُ",
          translation: "The Beneficent",
          description: "He who wills goodness and mercy for all His creatures."
        },
        {
          number: 2,
          name: "Ar-Raheem",
          arabic: "الرَّحِيمُ",
          translation: "The Merciful",
          description: "He who acts with extreme kindness and bestows His mercy."
        },
        {
          number: 3,
          name: "Al-Malik",
          arabic: "الْمَلِكُ",
          translation: "The King",
          description: "The Sovereign Lord, The One with the complete Dominion."
        },
        {
          number: 4,
          name: "Al-Quddus",
          arabic: "الْقُدُّوسُ",
          translation: "The Holy",
          description: "The One who is pure from any imperfection and clear from children and adversaries."
        },
        {
          number: 5,
          name: "As-Salam",
          arabic: "السَّلاَمُ",
          translation: "The Source of Peace",
          description: "The One who is free from every imperfection and grants peace and security."
        },
        {
          number: 6,
          name: "Al-Mu'min",
          arabic: "الْمُؤْمِنُ",
          translation: "The Inspirer of Faith",
          description: "The One who witnessed for Himself that no one is God but Him."
        },
        {
          number: 7,
          name: "Al-Muhaymin",
          arabic: "الْمُهَيْمِنُ",
          translation: "The Guardian",
          description: "The One who witnesses the saying and deeds of His creatures."
        },
        {
          number: 8,
          name: "Al-Aziz",
          arabic: "الْعَزِيزُ",
          translation: "The Mighty",
          description: "The Strong, The Defeater who is not defeated."
        },
        {
          number: 9,
          name: "Al-Jabbar",
          arabic: "الْجَبَّارُ",
          translation: "The Compeller",
          description: "The One that nothing happens in His Dominion except that which He willed."
        },
        {
          number: 10,
          name: "Al-Mutakabbir",
          arabic: "الْمُتَكَبِّرُ",
          translation: "The Supreme",
          description: "The One who is clear from the attributes of the creatures and from resembling them."
        },
        {
          number: 11,
          name: "Al-Khaliq",
          arabic: "الْخَالِقُ",
          translation: "The Creator",
          description: "The One who brings everything from non-existence to existence."
        },
        {
          number: 12,
          name: "Al-Bari'",
          arabic: "الْبَارِئُ",
          translation: "The Maker",
          description: "The Creator who has the Power to turn the entities."
        },
        {
          number: 13,
          name: "Al-Musawwir",
          arabic: "الْمُصَوِّرُ",
          translation: "The Fashioner",
          description: "The One who forms His creatures in different pictures."
        },
        {
          number: 14,
          name: "Al-Ghaffar",
          arabic: "الْغَفَّارُ",
          translation: "The Forgiver",
          description: "The One who forgives the sins of His slaves time and time again."
        },
        {
          number: 15,
          name: "Al-Qahhar",
          arabic: "الْقَهَّارُ",
          translation: "The Subduer",
          description: "The Dominant, The One who has the perfect Power and is not unable over anything."
        },
        {
          number: 16,
          name: "Al-Wahhab",
          arabic: "الْوَهَّابُ",
          translation: "The Bestower",
          description: "The One who is Generous in giving plenty without any return."
        },
        {
          number: 17,
          name: "Ar-Razzaq",
          arabic: "الرَّزَّاقُ",
          translation: "The Provider",
          description: "The One who gives everything that benefits His slaves."
        },
        {
          number: 18,
          name: "Al-Fattah",
          arabic: "الْفَتَّاحُ",
          translation: "The Opener",
          description: "The One who opens for His slaves the closed worldly and religious matters."
        },
        {
          number: 19,
          name: "Al-Alim",
          arabic: "الْعَلِيمُ",
          translation: "The All-Knowing",
          description: "The Knowledgeable; The One nothing is absent His knowledge."
        },
        {
          number: 20,
          name: "Al-Qabid",
          arabic: "الْقَابِضُ",
          translation: "The Constrictor",
          description: "The One who constricts the sustenance by His wisdom and expands and widens it."
        },
        {
          number: 21,
          name: "Al-Basit",
          arabic: "الْبَاسِطُ",
          translation: "The Expander",
          description: "The One who expands and widens the sustenance."
        },
        {
          number: 22,
          name: "Al-Khafid",
          arabic: "الْخَافِضُ",
          translation: "The Abaser",
          description: "The One who lowers whoever He willed by His Destruction."
        },
        {
          number: 23,
          name: "Ar-Rafi'",
          arabic: "الرَّافِعُ",
          translation: "The Exalter",
          description: "The One who raises whoever He willed by His Endowment."
        },
        {
          number: 24,
          name: "Al-Mu'izz",
          arabic: "الْمُعِزُّ",
          translation: "The Honorer",
          description: "He gives esteem to whoever He willed, hence there is no one to degrade Him."
        },
        {
          number: 25,
          name: "Al-Mudhill",
          arabic: "الْمُذِلُّ",
          translation: "The Dishonorer",
          description: "He gives dishonor to whoever He willed, hence there is no one to give him honor."
        },
        {
          number: 26,
          name: "As-Sami'",
          arabic: "السَّمِيعُ",
          translation: "The All-Hearing",
          description: "The One who Hears all things that are heard by His Eternal Hearing without an ear, instrument or organ."
        },
        {
          number: 27,
          name: "Al-Basir",
          arabic: "الْبَصِيرُ",
          translation: "The All-Seeing",
          description: "The One who Sees all things that are seen by His Eternal Seeing without a pupil or any other instrument."
        },
        {
          number: 28,
          name: "Al-Hakam",
          arabic: "الْحَكَمُ",
          translation: "The Judge",
          description: "He is the Ruler and His judgment is His Word."
        },
        {
          number: 29,
          name: "Al-Adl",
          arabic: "الْعَدْلُ",
          translation: "The Just",
          description: "The One who is entitled to do what He does."
        },
        {
          number: 30,
          name: "Al-Lateef",
          arabic: "اللَّطِيفُ",
          translation: "The Subtle One",
          description: "The One who is kind to His slaves and endows upon them."
        },
        {
          number: 31,
          name: "Al-Khabeer",
          arabic: "الْخَبِيرُ",
          translation: "The All-Aware",
          description: "The One who knows the truth of things."
        },
        {
          number: 32,
          name: "Al-Haleem",
          arabic: "الْحَلِيمُ",
          translation: "The Forbearing",
          description: "The One who delays the punishment for those who deserve it."
        },
        {
          number: 33,
          name: "Al-Azeem",
          arabic: "الْعَظِيمُ",
          translation: "The Magnificent",
          description: "The One deserving the attributes of Exaltment, Glory, Extolment, and Purity from all imperfection."
        },
        {
          number: 34,
          name: "Al-Ghafoor",
          arabic: "الْغَفُورُ",
          translation: "The All-Forgiving",
          description: "The One who forgives a lot."
        },
        {
          number: 35,
          name: "Ash-Shakoor",
          arabic: "الشَّكُورُ",
          translation: "The Grateful",
          description: "The One who gives a lot of reward for a little obedience."
        },
        {
          number: 36,
          name: "Al-Aliyy",
          arabic: "الْعَلِيُّ",
          translation: "The Most High",
          description: "The One who is clear from the attributes of the creatures."
        },
        {
          number: 37,
          name: "Al-Kabeer",
          arabic: "الْكَبِيرُ",
          translation: "The Greatest",
          description: "The One who is greater than everything in status."
        },
        {
          number: 38,
          name: "Al-Hafeez",
          arabic: "الْحَفِيظُ",
          translation: "The Preserver",
          description: "The One who protects whatever and whoever He willed to protect."
        },
        {
          number: 39,
          name: "Al-Muqeet",
          arabic: "الْمُقِيتُ",
          translation: "The Maintainer",
          description: "The One who has the Power."
        },
        {
          number: 40,
          name: "Al-Haseeb",
          arabic: "الْحَسِيبُ",
          translation: "The Reckoner",
          description: "The One who gives the satisfaction."
        },
        {
          number: 41,
          name: "Al-Jaleel",
          arabic: "الْجَلِيلُ",
          translation: "The Majestic",
          description: "The One who is attributed with greatness of Power and Glory of status."
        },
        {
          number: 42,
          name: "Al-Kareem",
          arabic: "الْكَرِيمُ",
          translation: "The Generous",
          description: "The One who is clear from abjectness."
        },
        {
          number: 43,
          name: "Ar-Raqeeb",
          arabic: "الرَّقِيبُ",
          translation: "The Watchful",
          description: "The One that nothing is absent from Him."
        },
        {
          number: 44,
          name: "Al-Mujeeb",
          arabic: "الْمُجِيبُ",
          translation: "The Responsive",
          description: "The One who answers the one in need if he asks Him and rescues the yearned if he calls on Him."
        },
        {
          number: 45,
          name: "Al-Wasi'",
          arabic: "الْوَاسِعُ",
          translation: "The All-Encompassing",
          description: "The Knowledgeable."
        },
        {
          number: 46,
          name: "Al-Hakeem",
          arabic: "الْحَكِيمُ",
          translation: "The Wise",
          description: "The One who is correct in His doings."
        },
        {
          number: 47,
          name: "Al-Wadood",
          arabic: "الْوَدُودُ",
          translation: "The Loving",
          description: "The One who loves His believing slaves and His believing slaves love Him."
        },
        {
          number: 48,
          name: "Al-Majeed",
          arabic: "الْمَجِيدُ",
          translation: "The Glorious",
          description: "The One who is with perfect Power, High Status, Compassion, Generosity and Kindness."
        },
        {
          number: 49,
          name: "Al-Ba'ith",
          arabic: "الْبَاعِثُ",
          translation: "The Resurrector",
          description: "The One who resurrects His slaves after death for reward and/or punishment."
        },
        {
          number: 50,
          name: "Ash-Shaheed",
          arabic: "الشَّهِيدُ",
          translation: "The Witness",
          description: "The One who nothing is absent from Him."
        },
        {
          number: 51,
          name: "Al-Haqq",
          arabic: "الْحَقُّ",
          translation: "The Truth",
          description: "The One who truly exists."
        },
        {
          number: 52,
          name: "Al-Wakeel",
          arabic: "الْوَكِيلُ",
          translation: "The Trustee",
          description: "The One who gives the satisfaction and is relied upon."
        },
        {
          number: 53,
          name: "Al-Qawiyy",
          arabic: "الْقَوِيُّ",
          translation: "The Strong",
          description: "The One with the complete Power."
        },
        {
          number: 54,
          name: "Al-Mateen",
          arabic: "الْمَتِينُ",
          translation: "The Firm",
          description: "The One with extreme Power which is un-interrupted and He does not get tired."
        },
        {
          number: 55,
          name: "Al-Waliyy",
          arabic: "الْوَلِيُّ",
          translation: "The Protecting Friend",
          description: "The Supporter."
        },
        {
          number: 56,
          name: "Al-Hameed",
          arabic: "الْحَمِيدُ",
          translation: "The Praiseworthy",
          description: "The praised One who deserves to be praised."
        },
        {
          number: 57,
          name: "Al-Muhsee",
          arabic: "الْمُحْصِي",
          translation: "The Accounter",
          description: "The One who the count of things are known to him."
        },
        {
          number: 58,
          name: "Al-Mubdi'",
          arabic: "الْمُبْدِئُ",
          translation: "The Originator",
          description: "The One who started the human being."
        },
        {
          number: 59,
          name: "Al-Mu'eed",
          arabic: "الْمُعِيدُ",
          translation: "The Restorer",
          description: "The One who brings back the creatures after death."
        },
        {
          number: 60,
          name: "Al-Muhyi",
          arabic: "الْمُحْيِي",
          translation: "The Giver of Life",
          description: "The One who took out a living human from semen that does not have a soul."
        },
        {
          number: 61,
          name: "Al-Mumeet",
          arabic: "الْمُمِيتُ",
          translation: "The Taker of Life",
          description: "The One who renders the living dead."
        },
        {
          number: 62,
          name: "Al-Hayy",
          arabic: "الْحَيُّ",
          translation: "The Ever-Living",
          description: "The One attributed with a life that is unlike our life and is not that of a combination of soul, flesh or blood."
        },
        {
          number: 63,
          name: "Al-Qayyum",
          arabic: "الْقَيُّومُ",
          translation: "The Self-Sustaining",
          description: "The One who remains and does not end."
        },
        {
          number: 64,
          name: "Al-Waajid",
          arabic: "الْوَاجِدُ",
          translation: "The Finder",
          description: "The One who does not lose anything."
        },
        {
          number: 65,
          name: "Al-Maajid",
          arabic: "الْمَاجِدُ",
          translation: "The Noble",
          description: "The One who is Majid."
        },
        {
          number: 66,
          name: "Al-Waahid",
          arabic: "الْوَاحِدُ",
          translation: "The Unique",
          description: "The One without a partner."
        },
        {
          number: 67,
          name: "Al-Ahad",
          arabic: "الْأَحَدُ",
          translation: "The One",
          description: "The One without a partner."
        },
        {
          number: 68,
          name: "As-Samad",
          arabic: "الصَّمَدُ",
          translation: "The Eternal",
          description: "The Master who is relied upon in matters and reverted to in ones needs."
        },
        {
          number: 69,
          name: "Al-Qaadir",
          arabic: "الْقَادِرُ",
          translation: "The Able",
          description: "The One attributed with Power."
        },
        {
          number: 70,
          name: "Al-Muqtadir",
          arabic: "الْمُقْتَدِرُ",
          translation: "The Powerful",
          description: "The One with the perfect Power that nothing is withheld from Him."
        },
        {
          number: 71,
          name: "Al-Muqaddim",
          arabic: "الْمُقَدِّمُ",
          translation: "The Expediter",
          description: "The One who puts things in their right places."
        },
        {
          number: 72,
          name: "Al-Mu'akhkhir",
          arabic: "الْمُؤَخِّرُ",
          translation: "The Delayer",
          description: "The One who puts things in their right places."
        },
        {
          number: 73,
          name: "Al-Awwal",
          arabic: "الأَوَّلُ",
          translation: "The First",
          description: "The One whose Existence is without a beginning."
        },
        {
          number: 74,
          name: "Al-Akhir",
          arabic: "الآخِرُ",
          translation: "The Last",
          description: "The One whose Existence is without an end."
        },
        {
          number: 75,
          name: "Az-Zaahir",
          arabic: "الظَّاهِرُ",
          translation: "The Manifest",
          description: "The One above everything."
        },
        {
          number: 76,
          name: "Al-Baatin",
          arabic: "الْبَاطِنُ",
          translation: "The Hidden",
          description: "The One who is clear from the delusions of bodily characteristics."
        },
        {
          number: 77,
          name: "Al-Waali",
          arabic: "الْوَالِي",
          translation: "The Governor",
          description: "The One who owns things and manages them."
        },
        {
          number: 78,
          name: "Al-Muta'ali",
          arabic: "الْمُتَعَالِي",
          translation: "The Exalted",
          description: "The One who is clear from the attributes of the creation."
        },
        {
          number: 79,
          name: "Al-Barr",
          arabic: "الْبَرُّ",
          translation: "The Source of Goodness",
          description: "The One who is kind to His creatures."
        },
        {
          number: 80,
          name: "At-Tawwaab",
          arabic: "التَّوَّابُ",
          translation: "The Accepter of Repentance",
          description: "The One who grants repentance to whoever He willed among His creatures and accepts his repentance."
        },
        {
          number: 81,
          name: "Al-Muntaqim",
          arabic: "الْمُنْتَقِمُ",
          translation: "The Avenger",
          description: "The One who victoriously prevails over His enemies and punishes them for their sins."
        },
        {
          number: 82,
          name: "Al-Afuww",
          arabic: "الْعَفُوُّ",
          translation: "The Pardoner",
          description: "The One with wide forgiveness."
        },
        {
          number: 83,
          name: "Ar-Ra'uf",
          arabic: "الرَّؤُوفُ",
          translation: "The Compassionate",
          description: "The One with extreme Mercy."
        },
        {
          number: 84,
          name: "Malik-ul-Mulk",
          arabic: "مَالِكُ الْمُلْكِ",
          translation: "The Owner of All",
          description: "The One who controls the Dominion and gives dominion to whoever He willed."
        },
        {
          number: 85,
          name: "Dhul-Jalali wal-Ikram",
          arabic: "ذُو الْجَلالِ وَالإكْرَامِ",
          translation: "The Lord of Majesty and Bounty",
          description: "The One who deserves to be Exalted and not denied."
        },
        {
          number: 86,
          name: "Al-Muqsit",
          arabic: "الْمُقْسِطُ",
          translation: "The Equitable",
          description: "The One who is Just in His judgment."
        },
        {
          number: 87,
          name: "Al-Jaami'",
          arabic: "الْجَامِعُ",
          translation: "The Gatherer",
          description: "The One who gathers the creatures on a day that there is no doubt about."
        },
        {
          number: 88,
          name: "Al-Ghaniyy",
          arabic: "الْغَنِيُّ",
          translation: "The Self-Sufficient",
          description: "The One who does not need the creation."
        },
        {
          number: 89,
          name: "Al-Mughni",
          arabic: "الْمُغْنِي",
          translation: "The Enricher",
          description: "The One who satisfies the necessities of the creatures."
        },
        {
          number: 90,
          name: "Al-Mani'",
          arabic: "الْمَانِعُ",
          translation: "The Preventer",
          description: "The One who prevents whatever He wills."
        },
        {
          number: 91,
          name: "Ad-Darr",
          arabic: "الضَّارُّ",
          translation: "The Distresser",
          description: "The One who makes harm reach to whoever He wills."
        },
        {
          number: 92,
          name: "An-Nafi'",
          arabic: "النَّافِعُ",
          translation: "The Propitious",
          description: "The One who makes things reach whoever He wills."
        },
        {
          number: 93,
          name: "An-Nur",
          arabic: "النُّورُ",
          translation: "The Light",
          description: "The One who guides."
        },
        {
          number: 94,
          name: "Al-Hadi",
          arabic: "الْهَادِي",
          translation: "The Guide",
          description: "The One whom with His Guidance His believers were guided."
        },
        {
          number: 95,
          name: "Al-Badi'",
          arabic: "الْبَدِيعُ",
          translation: "The Incomparable",
          description: "The One who created the creation and formed it without any preceding example."
        },
        {
          number: 96,
          name: "Al-Baqi",
          arabic: "الْبَاقِي",
          translation: "The Everlasting",
          description: "The One that the state of non-existence is impossible for Him."
        },
        {
          number: 97,
          name: "Al-Warith",
          arabic: "الْوَارِثُ",
          translation: "The Inheritor",
          description: "The One whose Existence remains."
        },
        {
          number: 98,
          name: "Ar-Rasheed",
          arabic: "الرَّشِيدُ",
          translation: "The Guide to the Right Path",
          description: "The One who guides."
        },
        {
          number: 99,
          name: "As-Saboor",
          arabic: "الصَّبُورُ",
          translation: "The Patient",
          description: "The One who does not quickly punish the sinners."
        }
      ],
      showScrollToTop: false,
      isCollapsed: false,
      searchQuery: '',
      activeLetter: '',
      showArabic: true,
      showTranslation: true,
      showDescription: true,
      favoriteNames: [],
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      filteredNames: []
    }
  },
  mounted() {
    this.handleScroll();
    const collapseElement = document.getElementById('likedNamesCollapse');
    window.addEventListener('scroll', this.handleScroll);
    collapseElement.addEventListener('shown.bs.collapse', () => {
      this.isCollapsed = false;
    });
    collapseElement.addEventListener('hidden.bs.collapse', () => {
      this.isCollapsed = true;
    });
  },

  computed: {
    favoriteNamesData() {
      return this.names.filter(name => this.favoriteNames.includes(name.number));
    }
  },
  created() {
    // Initialize filteredNames with all names
    this.filteredNames = [...this.names];

    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem('favoriteNames');
    if (savedFavorites) {
      this.favoriteNames = JSON.parse(savedFavorites);
    }
  },
  methods: {

    copyToClipboard(name) {
      const text = `Name: ${name.name}\nArabic: ${name.arabic}\nMeaning: ${name.translation}\nDescription: ${name.description}`;
      navigator.clipboard.writeText(text)
        .then(() => alert('Copied to clipboard!'))
        .catch(err => alert('Failed to copy text: ' + err));
    },
    generateWhatsAppLink(name) {
      const text = `*${name.name}*\n\n🕋 Arabic: ${name.arabic}\n📝 Meaning: ${name.translation}\n📖 Description: ${name.description}`;
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    },
    filterNames() {
      if (!this.searchQuery && !this.activeLetter) {
        this.filteredNames = [...this.names];
        return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredNames = this.names.filter(name => {
        const matchesSearch = !query ||
          name.name.toLowerCase().includes(query) ||
          name.translation.toLowerCase().includes(query) ||
          name.description.toLowerCase().includes(query);

        const matchesLetter = !this.activeLetter ||
          name.name.startsWith(this.activeLetter);

        return matchesSearch && matchesLetter;
      });
    },
    filterByLetter(letter) {
      this.activeLetter = this.activeLetter === letter ? '' : letter;
      this.filterNames();
    },
    resetFilters() {
      this.searchQuery = '';
      this.activeLetter = '';
      this.filteredNames = [...this.names];
    },
    toggleFavorite(number) {
      const index = this.favoriteNames.indexOf(number);
      if (index === -1) {
        this.favoriteNames.push(number);
      } else {
        this.favoriteNames.splice(index, 1);
      }
      localStorage.setItem('favoriteNames', JSON.stringify(this.favoriteNames));
    },
    clearAllFavorites() {
      this.favoriteNames = [];
      localStorage.setItem('favoriteNames', JSON.stringify(this.favoriteNames));
    },
    isFavorited(number) {
      return this.favoriteNames.includes(number);
    },
    debounce(fn, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
      };
    },
    handleScroll() {
      // Get current scroll position and document height
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Ensure documentHeight is valid to avoid division by zero
      if (documentHeight <= 0) {
        this.showScrollToTop = false;
        return;
      }

      // Calculate scroll percentage
      const scrollPercentage = (scrollPosition / documentHeight) * 100;

      // Show button only if scrolled past 20%
      this.showScrollToTop = scrollPercentage >= 20;

      // Debugging: Log values to verify behavior
      console.log({
        scrollPosition,
        documentHeight,
        scrollPercentage,
        showScrollToTop: this.showScrollToTop,
      });
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
.custom-success:checked {
  background-color: rgb(10, 150, 120) !important;
  border-color: rgb(10, 150, 120) !important;
}

html {
  scroll-behavior: smooth;
}

.cursor-pointer {
  cursor: pointer;
}

.hover-zoom:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

.featured-card {
  background: linear-gradient(135deg, #e0f7fa, #ffffff);
  border-left: 5px solid rgb(10, 150, 120);
}

.names-container {
  max-width: 1400px;
  margin: 0 auto;
  font-size: 1.1rem;
}

.btn-primary {
  background-color: rgb(10, 150, 120);
  color: rgb(255, 255, 255);

  border-color: rgb(10, 150, 120);
}

.btn-primary:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  border-color: rgb(8, 120, 96);
}

.btn-outline-primary {
  border-color: rgb(10, 150, 120);
}

.btn-outline-primary:hover {
  background-color: rgb(10, 150, 120);
  border-color: rgb(10, 150, 120);
}

.names-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  padding: 25px 0;
}

.name-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  font-size: 1.1rem;
}

.name-card:hover {
  transform: translateY(-8px);
}

.featured-card {
  border: 3px solid rgb(10, 150, 120);
}

.arabic-name {
  font-family: 'Traditional Arabic', 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.floating-action-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1000;
}

.floating-action-btn button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(10, 150, 120);
  border-color: rgb(10, 150, 120);
}

.floating-action-btn button:hover {
  background-color: rgb(8, 120, 96);
  border-color: rgb(8, 120, 96);
}

@media (max-width: 768px) {
  .names-grid {
    grid-template-columns: 1fr;
  }

  .header {
    padding: 25px 0;
  }

  h1.display-3 {
    font-size: 2.2rem;
  }

  .arabic-name {
    font-size: 2.5rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.name-card {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

.name-card:nth-child(1) {
  animation-delay: 0.1s;
}

.name-card:nth-child(2) {
  animation-delay: 0.2s;
}

.name-card:nth-child(3) {
  animation-delay: 0.3s;
}

.card-title {
  font-size: 1.8rem;
}

.arabic-name {
  font-size: 3rem;
}

.translation,
.description {
  font-size: 1.2rem;
}

.badge {
  font-size: 1rem;
}

.form-check-label {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .toggle-switches-container {
    padding: 10px;
  }

  .form-check {
    flex: 1 1 100%;
    margin-bottom: 12px;
  }
}

@media (min-width: 769px) {
  .toggle-switches-container {
    padding: 12px;
  }

  .form-check {
    flex: 0 0 auto;
  }
}
</style>