ake<template>
  <div class="names-container container py-5">

    <!-- Header -->
    <div class="text-center mb-5">
      <h2 class="display-5 fw-bold text-dark">99 Names of Allah</h2>
      <p class="lead">
        The 99 Names of Allah, also known as Asma'ul Husna, represent the beautiful
        attributes and qualities of Allah mentioned in the Qur'an and Sunnah. Each Name reflects a distinct aspect of
        Allah's nature and actions.
      </p>
    </div>

    <!-- Controls Row: Toggles and Search Bar Side by Side -->
    <div class="controls-row-clean">
      <div class="toggle-bar-clean">
        <button :class="['toggle-pill-clean', showArabic ? 'active' : '']" @click="showArabic = !showArabic" aria-label="Toggle Arabic">
          <i class="bi bi-translate"></i> Arabic
        </button>
        <button :class="['toggle-pill-clean', showTranslation ? 'active' : '']" @click="showTranslation = !showTranslation" aria-label="Toggle Meaning">
          <i class="bi bi-lightbulb"></i> Meaning
        </button>
        <button :class="['toggle-pill-clean', showDescription ? 'active' : '']" @click="showDescription = !showDescription" aria-label="Toggle Description">
          <i class="bi bi-card-text"></i> Description
        </button>
      </div>
      <div class="search-bar-clean">
        <div class="search-bar-inner">
          <span class="search-icon"><i class="bi bi-search"></i></span>
          <input type="text" class="search-input" placeholder="Search names..." v-model="searchQuery" @input="filterNames" aria-label="Search names" />
          <button v-if="searchQuery" class="clear-btn" @click="clearSearch" aria-label="Clear search"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
    </div>

    <!-- Clean Names Grid (no Bootstrap wrappers) -->
    <div class="names-grid-clean">
      <div v-for="name in paginatedNames" :key="name.number" class="clean-card">
        <div class="clean-card-body">
          <div class="clean-arabic" style="font-size:2.1rem;">{{ showArabic ? name.arabic : '' }}</div>
          <div class="clean-name" style="font-size:1.4rem;">{{ name.name }}</div>
          <div v-if="showTranslation" class="clean-meaning">{{ name.translation }}</div>
          <div v-if="showDescription" class="clean-description">{{ name.description }}</div>
          <div class="clean-btn-row">
            <button class="clean-btn copy-btn" @click="copyToClipboard(name)" aria-label="Copy to clipboard">
              <i class="bi bi-clipboard"></i> <span class="d-none d-md-inline">Copy</span>
            </button>
            <a class="clean-btn whatsapp-btn" :href="generateWhatsAppLink(name)" target="_blank" rel="noopener" aria-label="Share on WhatsApp">
              <i class="bi bi-whatsapp"></i> <span class="d-none d-md-inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination-clean">
      <button class="pagination-btn" :disabled="currentPage === 1" @click="currentPage--">Prev</button>
      <button v-for="page in totalPages" :key="page" :class="['pagination-btn', { active: currentPage === page }]" @click="currentPage = page">{{ page }}</button>
      <button class="pagination-btn" :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
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
          description: "The Knowledgeable; The One nothing is absent from His knowledge."
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
      searchQuery: '',
      showArabic: true,
      showTranslation: true,
      showDescription: false,
      filteredNames: [],
      currentPage: 1,
      pageSize: 12
    }
  },
  computed: {
    paginatedNames() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredNames.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredNames.length / this.pageSize) || 1;
    }
  },
  created() {
    // Initialize filteredNames with all names
    this.filteredNames = [...this.names];
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
      return `https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    },
    filterNames() {
      let namesList = [...this.names];
      if (!this.searchQuery) {
        this.filteredNames = namesList;
        this.currentPage = 1;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredNames = namesList.filter(name => {
        return (
          name.name.toLowerCase().includes(query) ||
          name.translation.toLowerCase().includes(query) ||
          name.description.toLowerCase().includes(query)
        );
      });
      this.currentPage = 1;
    },
    resetFilters() {
      this.searchQuery = '';
      this.filteredNames = [...this.names];
      this.currentPage = 1;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    clearSearch() {
      this.searchQuery = '';
      this.filterNames();
    }
  }
}
</script>

<style scoped>
.custom-success:checked {
  background-color: rgb(10, 150, 120) !important; /* Bootstrap bg-success */
  border-color: rgb(10, 150, 120) !important;
}
html {
  scroll-behavior: smooth;
}

/* @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css'); */

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

.header {
  background-color: var(--secondary-color);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--primary-color);
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
}

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.names-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  padding: 25px 0;
}

.name-card {
  border: none;
  border-radius: 8px;
  overflow: hidden;
  font-size: 1.1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: box-shadow 0.3s, transform 0.3s;
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}
.name-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.16);
  transform: translateY(-6px) scale(1.03);
}
.arabic-name {
  font-family: 'Traditional Arabic', 'Arial', sans-serif;
  line-height: 1.6;
  color: #0a9678;
  font-size: 2.4rem;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px rgba(10,150,120,0.08);
}
.floating-action-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  width: 56px !important;
  height: 56px !important;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color, #0a9678);
  border-color: var(--primary-color, #0a9678);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: background 0.2s, box-shadow 0.2s;
}
.floating-action-btn:hover {
  background-color: #00bfa6;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
}
@media (max-width: 768px) {
  .names-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 10px 0;
  }
  .arabic-name {
    font-size: 2rem;
  }
  .floating-action-btn {
    bottom: 16px;
    right: 16px;
    width: 44px !important;
    height: 44px !important;
    font-size: 1.2rem;
  }
}
/* Animation for cards */
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

/* Delay animations for each card */
.name-card:nth-child(1) {
  animation-delay: 0.1s;
}

.name-card:nth-child(2) {
  animation-delay: 0.2s;
}

.name-card:nth-child(3) {
  animation-delay: 0.3s;
}

/* ... and so on for all cards ... */

/* Larger font sizes */
.card-title {
  font-size: 1.8rem;
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

/* CSS for mobile view */
@media (max-width: 768px) {
  .toggle-switches-container {
    padding: 10px;
  }

  .form-check {
    flex: 1 1 100%;
    /* Make each toggle switch full-width on mobile */
    margin-bottom: 12px;
  }
}

/* CSS for larger screens */
@media (min-width: 769px) {
  .toggle-switches-container {
    padding: 12px;
  }

  .form-check {
    flex: 0 0 auto;
    /* Keep the toggle switch at its original size */
  }
}

.toggle-pill-group {
  gap: 0.5rem;
}
.toggle-pill {
  border: none;
  outline: none;
  background: #e0f7fa;
  color: #009688;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0,150,136,0.04);
  cursor: pointer;
}
.toggle-pill.active, .toggle-pill:hover {
  background: #009688;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,150,136,0.10);
}
@media (max-width: 768px) {
  .toggle-pill {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }
}
.simple-card {
  background: #fafdff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,150,136,0.07);
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 1.5rem;
  min-height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s;
}
.simple-card:hover {
  box-shadow: 0 6px 24px rgba(0,150,136,0.13);
}
.simple-card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.arabic-name {
  font-family: 'Traditional Arabic', 'Arial', sans-serif;
  font-size: 2.1rem;
  color: #009688;
  font-weight: 700;
  letter-spacing: 1px;
}
.simple-name {
  font-size: 1.3rem;
  color: #222;
  font-weight: 600;
}
.simple-meaning {
  font-size: 1.1rem;
  color: #009688;
  font-weight: 500;
}
.simple-btn {
  background: #e0f7fa;
  color: #009688;
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: background 0.2s, color 0.2s;
  margin: 0 2px;
}
.simple-btn:hover {
  background: #009688;
  color: #fff;
}
.copy-btn {
  background: #e0f7fa;
}
.whatsapp-btn {
  background: #d0f8ce;
  color: #25d366;
}
.whatsapp-btn:hover {
  background: #25d366;
  color: #fff;
}
@media (max-width: 768px) {
  .simple-card {
    padding: 1rem 0.5rem 0.7rem 0.5rem;
    min-height: 170px;
  }
  .arabic-name {
    font-size: 1.4rem;
  }
  .simple-name {
    font-size: 1.1rem;
  }
  .simple-meaning {
    font-size: 1rem;
  }
}

/* Toggle Bar */
.toggle-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.toggle-pill {
  border: none;
  outline: none;
  background: #e0f7fa;
  color: #009688;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0,150,136,0.04);
  cursor: pointer;
}
.toggle-pill.active, .toggle-pill:hover {
  background: #009688;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,150,136,0.10);
}

/* Modern Names Grid */
.names-grid-modern {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 2rem;
  padding: 0 0.5rem;
}
.modern-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0,150,136,0.10);
  padding: 2.2rem 1.2rem 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, transform 0.2s;
  min-height: 220px;
}
.modern-card:hover {
  box-shadow: 0 8px 32px rgba(0,150,136,0.16);
  transform: translateY(-4px) scale(1.02);
}
.modern-card-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}
.modern-arabic {
  font-family: 'Traditional Arabic', 'Arial', sans-serif;
  font-size: 2.2rem;
  color: #009688;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 0.2rem;
  text-align: center;
}
.modern-name {
  font-size: 1.3rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 0.1rem;
  text-align: center;
}
.modern-meaning {
  font-size: 1.1rem;
  color: #009688;
  font-weight: 500;
  text-align: center;
}
.modern-btn-row {
  display: flex;
  gap: 0.7rem;
  margin-top: 1.1rem;
  justify-content: center;
}
.modern-btn {
  background: #e0f7fa;
  color: #009688;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,150,136,0.04);
}
.modern-btn:hover {
  background: #009688;
  color: #fff;
}
.copy-btn {
  background: #e0f7fa;
  color: #009688;
}
.copy-btn:hover {
  background: #009688;
  color: #fff;
}
.whatsapp-btn {
  background: #d0f8ce;
  color: #25d366;
}
.whatsapp-btn:hover {
  background: #25d366;
  color: #fff;
}
@media (max-width: 768px) {
  .names-grid-modern {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    padding: 0;
  }
  .modern-card {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    min-height: 150px;
  }
  .modern-arabic {
    font-size: 1.4rem;
  }
  .modern-name {
    font-size: 1.1rem;
  }
  .modern-meaning {
    font-size: 1rem;
  }
  .modern-btn {
    padding: 0.5rem 0.8rem;
    font-size: 1rem;
  }
}

/* Clean Toggle Bar */
.toggle-bar-clean {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  margin-bottom: 2.2rem;
  background: #f5f7fa;
  padding: 1.1rem 0 1.1rem 0;
  border-radius: 18px;
}
.toggle-pill-clean {
  border: none;
  outline: none;
  background: #fff;
  color: #009688;
  padding: 0.7rem 1.7rem;
  border-radius: 999px;
  font-size: 1.13rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0,150,136,0.04);
  cursor: pointer;
}
.toggle-pill-clean.active, .toggle-pill-clean:hover {
  background: #009688;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,150,136,0.10);
}

/* Clean Names Grid */
.names-grid-clean {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.7rem;
  padding: 0 0.5rem;
  background: #f5f7fa;
  border-radius: 18px;
}
.clean-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,150,136,0.07);
  padding: 2rem 1.1rem 1.3rem 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, transform 0.2s;
  min-height: 180px;
}
.clean-card:hover {
  box-shadow: 0 8px 32px rgba(0,150,136,0.13);
  transform: translateY(-2px) scale(1.01);
}
.clean-card-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}
.clean-arabic {
  font-family: 'Traditional Arabic', 'Arial', sans-serif;
  font-size: 2rem;
  color: #009688;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 0.1rem;
  text-align: center;
}
.clean-name {
  font-size: 1.2rem;
  color: #222;
  font-weight: 600;
  margin-bottom: 0.1rem;
  text-align: center;
}
.clean-meaning {
  font-size: 1.05rem;
  color: #009688;
  font-weight: 500;
  text-align: center;
}
.clean-btn-row {
  display: flex;
  gap: 0.7rem;
  margin-top: 1.1rem;
  justify-content: center;
}
.clean-btn {
  background: #f5f7fa;
  color: #009688;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,150,136,0.04);
}
.clean-btn:hover {
  background: #009688;
  color: #fff;
}
.copy-btn {
  background: #f5f7fa;
  color: #009688;
}
.copy-btn:hover {
  background: #009688;
  color: #fff;
}
.whatsapp-btn {
  background: #e9fbe5;
  color: #25d366;
}
.whatsapp-btn:hover {
  background: #25d366;
  color: #fff;
}
@media (max-width: 768px) {
  .names-grid-clean {
    grid-template-columns: 1fr;
    gap: 1.1rem;
    padding: 0;
  }
  .clean-card {
    padding: 1.1rem 0.5rem 0.8rem 0.5rem;
    min-height: 120px;
  }
  .clean-arabic {
    font-size: 1.2rem;
  }
  .clean-name {
    font-size: 1rem;
  }
  .clean-meaning {
    font-size: 0.95rem;
  }
  .clean-btn {
    padding: 0.5rem 0.8rem;
    font-size: 1rem;
  }
}

/* Clean Search Bar */
.search-bar-clean {
  display: flex;
  justify-content: center;
  margin-bottom: 2.2rem;
}
.search-bar-inner {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 999px;
  box-shadow: 0 1px 4px rgba(0,150,136,0.04);
  padding: 0.2rem 1.1rem;
  min-width: 260px;
  max-width: 400px;
  width: 100%;
}
.search-icon {
  color: #b0b8be;
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
.search-input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.1rem;
  flex: 1;
  padding: 0.5rem 0;
  color: #222;
}
.clear-btn {
  background: none;
  border: none;
  color: #b0b8be;
  font-size: 1.1rem;
  cursor: pointer;
  margin-left: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
  padding: 0.2rem 0.4rem;
}
.clear-btn:hover {
  background: #f5f7fa;
  color: #009688;
}
.clean-description {
  font-size: 0.98rem;
  color: #666;
  font-weight: 400;
  text-align: center;
  margin-top: 0.3rem;
  margin-bottom: 0.2rem;
  line-height: 1.5;
}
@media (max-width: 768px) {
  .search-bar-inner {
    min-width: 0;
    max-width: 100%;
    padding: 0.2rem 0.7rem;
  }
  .search-input {
    font-size: 1rem;
  }
  .clean-description {
    font-size: 0.92rem;
  }
}

/* Clean Pagination */
.pagination-clean {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2.2rem 0 1.2rem 0;
}
.pagination-btn {
  background: #fff;
  color: #009688;
  border: 1.5px solid #e0e0e0;
  border-radius: 999px;
  padding: 0.45rem 1.1rem;
  font-size: 1.08rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  outline: none;
}
.pagination-btn.active, .pagination-btn:hover:not(:disabled) {
  background: #009688;
  color: #fff;
  border-color: #009688;
}
.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Controls Row: Toggles and Search Bar Side by Side */
.controls-row-clean {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.2rem;
  flex-wrap: wrap;
}
.controls-row-clean .toggle-bar-clean {
  margin-bottom: 0;
}
.controls-row-clean .search-bar-clean {
  margin-bottom: 0;
}
@media (max-width: 900px) {
  .controls-row-clean {
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
  }
  .controls-row-clean .toggle-bar-clean,
  .controls-row-clean .search-bar-clean {
    width: 100%;
    justify-content: center;
  }
}
</style>