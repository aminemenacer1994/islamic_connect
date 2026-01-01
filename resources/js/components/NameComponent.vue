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

    <div class="container p-3">
      <div class="next-step-card mx-auto mb-4 animate-in">
        <button type="button" class="next-step-toggle" :title="nextStepMinimized ? 'Restore' : 'Minimize'"
          :aria-label="nextStepMinimized ? 'Restore next step' : 'Minimize next step'" @click="toggleNextStepMinimized">
          <i class="fas" :class="nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt'" aria-hidden="true"></i>
        </button>
        <div class="d-flex align-items-start gap-3 text-start">
          <div class="flex-shrink-0 mt-1">
            <div class="next-step-icon-circle" role="img" aria-label="Gentle Islamic dictionary guide">
              <i class="fas fa-book-open" aria-hidden="true"></i>
            </div>
          </div>
          <div class="flex-grow-1">
            <p class="mb-2 fw-semibold text-uppercase next-step-eyebrow">
              NEXT STEP
            </p>
            <!-- Minimized teaser -->
            <div v-show="nextStepMinimized" class="mb-2 d-inline-flex align-items-center gap-1 next-step-teaser">
              <a href="/books" class="fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 next-step-link"
                aria-label="Open the Islamic dictionary">
                Continue to the Islamic Dictionary
                <i class="fas fa-arrow-up-right-from-square next-step-link-icon" aria-hidden="true"></i>
              </a>
            </div>
            <p v-show="!nextStepMinimized" class="mb-3 next-step-text">
              After reflecting on Allah’s Names, take a calm, English-only step into the
              <a href="/books" class="fw-semibold text-decoration-none next-step-link">
                Islamic Dictionary
              </a>
              with large-text cards covering names, meanings, examples, and references.
            </p>
            <div v-show="!nextStepMinimized" class="d-flex flex-wrap gap-2">
              <a href="/books"
                class="btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center next-step-cta">
                <span>Explore Islamic Dictionary</span>
                <i class="fas fa-book-reader ms-2" aria-hidden="true"></i>
                <span class="visually-hidden">Open the accessible Islamic dictionary for new Muslims</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div>
      <div class="row container-fluid">
        <div class="col-md-12 mb-3 mt-3">
          <div class="input-group input-group-lg search-group round-20 shadow-soft animate-in">
            <span class="input-group-text search-icon border-end-0"><i class="bi bi-search"
                aria-hidden="true"></i></span>
            <input type="text" class="form-control search-input border-start-0" placeholder="Search names..."
              aria-label="Search names" v-model="searchQuery" @input="onSearchInput" />
          </div>
        </div>
      </div>
      <div class="text-center pt-2">
        <div class="row">
          <div class="col">
            <div class="form-check form-switch text-white m-0">
              <input class="form-check-input custom-success" type="checkbox" id="arabicToggle" v-model="showArabic">
              <label class="form-check-label text-dark" for="arabicToggle"><b>Arabic</b></label>
            </div>
          </div>
          <div class="col">
            <div class="form-check form-switch  text-white m-0">
              <input class="form-check-input custom-success" type="checkbox" id="translationToggle"
                v-model="showTranslation" checked>
              <label class="form-check-label text-dark" for="translationToggle"><b>Meaning</b></label>
            </div>
          </div>
          <div class="col">
            <div class="form-check form-switch -5 text-white desc-check m-0">
              <input class="form-check-input custom-success" type="checkbox" id="descToggle" v-model="showDescription"
                checked>
              <label class="form-check-label text-dark" for="descToggle"><b>Description</b></label>
            </div>
          </div>
        </div>

      </div>

      <!-- Liked Names Section -->
      <!-- <div class="mb-5 pt-4">
        <div class="liked-header" role="region" aria-live="polite">
          <div class="liked-info mb-2 d-flex align-items-center gap-2">
            <h4 class="fw-bold mb-0">
              Liked Names
              <span class="badge badge-premium">{{ favoriteNames.length }}</span>
            </h4>
          </div>
          <div class="liked-actions d-flex align-items-center gap-2">
            <button
              v-if="favoriteNames.length > 0"
              class="btn btn-outline-danger rounded-pill"
              :disabled="favoriteNames.length === 0"
              @click="clearAllFavorites"
            >
              Unlike All
            </button>
            <button
              v-if="favoriteNames.length > 0"
              class="btn btn-premium-outline liked-toggle-btn rounded-circle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#likedNamesCollapse"
              :aria-expanded="!isCollapsed"
              aria-controls="likedNamesCollapse"
            >
              <i :class="isCollapsed ? 'bi bi-chevron-down' : 'bi bi-chevron-up'"></i>
            </button>
          </div>
        </div>
        <div class="collapse" id="likedNamesCollapse">
          <div class="row g-4">
            <div v-for="name in favoriteNamesData" :key="'fav-' + name.number" class="col-12 col-md-4">
              <div class="card h-100 card-teal mt-3" role="article" :aria-labelledby="'fav-title-' + name.number">
                <div class="card-body d-flex flex-column">
                  <div class="d-flex justify-content-between align-items-start">
                    <span class="badge badge-premium fs-6">{{ name.number }}</span>
                    <button class="btn p-0" type="button" :aria-pressed="isFavorited(name.number) ? 'true' : 'false'"
                      :aria-label="isFavorited(name.number) ? 'Remove from liked' : 'Add to liked'"
                      @click="toggleFavorite(name.number)">
                      <i class="bi bi-heart-fill text-teal fs-4"></i>
                    </button>
                  </div>
                  <p class="fav-title mt-3 mb-2 text-dark" :id="'fav-title-' + name.number"><b>{{ name.name }}</b></p>
                  <div class="display-5 text-end" dir="rtl">
                    <strong class="fav-arabic medium text-muted">{{ name.arabic }}</strong>
                  </div>
                  <div v-if="showTranslation" class="mt-3">
                    <strong class="fav-label">Meaning:</strong>
                    <p class="fav-small small text-muted">{{ name.translation }}</p>
                  </div>
                  <div v-if="showDescription" class="mt-2">
                    <strong class="fav-label">Description:</strong>
                    <p class="fav-small small text-muted">{{ name.description }}</p>
                  </div>
                  <div class="action-row fav-actions d-flex align-items-center gap-2">
                    <button
                      class="btn btn-premium-outline btn-compact rounded-pill d-flex align-items-center justify-content-center flex-grow-1 me-2 focus-ring"
                      aria-label="Copy name to clipboard" @click="copyToClipboard(name)">
                      <i class="bi bi-clipboard me-2"></i>
                      <b>Copy</b>
                    </button>
                    <a class="btn btn-premium btn-compact rounded-pill d-flex align-items-center justify-content-center flex-grow-1 focus-ring"
                      aria-label="Share name on WhatsApp" :href="generateWhatsAppLink(name)" target="_blank"
                      rel="noopener">
                      <i class="bi bi-whatsapp me-2"></i>
                      <b>Share</b>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <h3 class=" mt-4 fw-bold">All Allah's Names:</h3>

      <!-- Names Grid -->
      <div class="row g-4 mt-2">
        <div v-for="name in filteredNames" :key="name.number" class="col-12 col-md-4">
          <div class="card card-teal h-100" role="article" :aria-labelledby="'name-title-' + name.number">
            <div class="card-body  h-100">
              <!-- <div class="d-flex justify-content-between align-items-start">
                <span class="badge badge-premium fs-6">{{ name.number }}</span>
                <button class="btn p-0" type="button" :aria-pressed="isFavorited(name.number) ? 'true' : 'false'"
                  :aria-label="isFavorited(name.number) ? 'Remove from favorites' : 'Add to favorites'"
                  @click="toggleFavorite(name.number)">
                  <i
                    :class="['bi', isFavorited(name.number) ? 'bi-heart-fill text-teal' : 'bi-heart text-dark', 'fs-4']"></i>
                </button>
              </div> -->

              <p class="name-title mt-3 mb-2 text-dark" :id="'name-title-' + name.number"><b>{{ name.name }}</b></p>

              <div v-if="showArabic" class="display-5 text-end" dir="rtl">
                <strong class="name-arabic medium text-muted">{{ name.arabic }}</strong>
              </div>

              <div v-if="showTranslation" class="mt-3">
                <strong class="name-label">Meaning:</strong>
                <p class="name-small small text-muted">{{ name.translation }}</p>
              </div>

              <div v-if="showDescription" class="mt-2">
                <strong class="name-label">Description:</strong>
                <p class="name-small small text-muted">{{ name.description }}</p>
              </div>
            </div>
            <div class="action-row name-actions d-flex align-items-center gap-2 mb-2">
              <!-- Copy to Clipboard Button -->
              <button
                class="btn btn-premium-outline btn-compact rounded-pill d-flex align-items-center justify-content-center flex-grow-1 me-2 focus-ring"
                aria-label="Copy name to clipboard" @click="copyToClipboard(name)">
                <span class="text-center w-100">
                  <i class="bi bi-clipboard me-2"></i>
                  <b>Copy</b>
                </span>
              </button>

              <!-- WhatsApp Share Button -->
              <a class="btn btn-premium btn-compact rounded-pill d-flex align-items-center justify-content-center flex-grow-1 focus-ring"
                aria-label="Share name on WhatsApp" :href="generateWhatsAppLink(name)" target="_blank" rel="noopener">
                <i class="bi bi-whatsapp me-2"></i>
                <b>Share</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NamesOfAllah',
  data() {
    return {
      nextStepMinimized: false,
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
      isCollapsed: true,
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
    // Throttle scroll handler and use passive listener for performance
    this._throttledScroll = this.throttle(this.handleScroll, 100);
    window.addEventListener('scroll', this._throttledScroll, { passive: true });
    if (collapseElement) {
      this._collapseElement = collapseElement;
      this._collapseShownHandler = () => {
        this.isCollapsed = false;
      };
      this._collapseHiddenHandler = () => {
        this.isCollapsed = true;
      };
      collapseElement.addEventListener('shown.bs.collapse', this._collapseShownHandler);
      collapseElement.addEventListener('hidden.bs.collapse', this._collapseHiddenHandler);
    }
  },
  beforeUnmount() {
    // Clean up scroll listener if present (Vue 3)
    if (this._throttledScroll) {
      window.removeEventListener('scroll', this._throttledScroll);
    }
    if (this._collapseElement && this._collapseShownHandler) {
      this._collapseElement.removeEventListener('shown.bs.collapse', this._collapseShownHandler);
    }
    if (this._collapseElement && this._collapseHiddenHandler) {
      this._collapseElement.removeEventListener('hidden.bs.collapse', this._collapseHiddenHandler);
    }
  },
  beforeDestroy() {
    // Clean up scroll listener if present (Vue 2)
    if (this._throttledScroll) {
      window.removeEventListener('scroll', this._throttledScroll);
    }
    if (this._collapseElement && this._collapseShownHandler) {
      this._collapseElement.removeEventListener('shown.bs.collapse', this._collapseShownHandler);
    }
    if (this._collapseElement && this._collapseHiddenHandler) {
      this._collapseElement.removeEventListener('hidden.bs.collapse', this._collapseHiddenHandler);
    }
  },

  computed: {
    favoriteSet() {
      return new Set(this.favoriteNames);
    },
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

    // Build a lowercase search blob once for faster filtering
    this.names.forEach(n => {
      n._blob = `${n.name} ${n.translation} ${n.description}`.toLowerCase();
    });

    // Prepare debounced filter function for input handler
    this._debouncedFilter = this.debounce(() => {
      this.filterNames();
    }, 150);
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
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
    onSearchInput() {
      // Use debounced filtering on input events
      if (this._debouncedFilter) {
        this._debouncedFilter();
      } else {
        this.filterNames();
      }
    },
    filterNames() {
      if (!this.searchQuery && !this.activeLetter) {
        this.filteredNames = [...this.names];
        return;
      }

      const query = this.searchQuery.toLowerCase();
      this.filteredNames = this.names.filter(name => {
        const matchesSearch = !query || (name._blob && name._blob.includes(query));

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
    // toggleFavorite(number) {
    //   const index = this.favoriteNames.indexOf(number);
    //   if (index === -1) {
    //     this.favoriteNames.push(number);
    //   } else {
    //     this.favoriteNames.splice(index, 1);
    //   }
    //   localStorage.setItem('favoriteNames', JSON.stringify(this.favoriteNames));
    // },
    // clearAllFavorites() {
    //   this.favoriteNames = [];
    //   localStorage.setItem('favoriteNames', JSON.stringify(this.favoriteNames));
    // },
    // isFavorited(number) {
    //   // O(1) lookup using Set
    //   return this.favoriteSet.has(number);
    // },
    debounce(fn, wait) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
      };
    },
    throttle(fn, wait) {
      let inThrottle = false;
      let lastArgs = null;
      let lastThis = null;
      const invoke = () => {
        if (lastArgs) {
          fn.apply(lastThis, lastArgs);
          lastArgs = lastThis = null;
          setTimeout(invoke, wait);
        } else {
          inThrottle = false;
        }
      };
      return function (...args) {
        if (inThrottle) {
          lastArgs = args;
          lastThis = this;
          return;
        }
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(invoke, wait);
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
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
.names-container {
  /* Provide teal palette for descendants (AA compliant) */
  --teal-400: #2dd4bf;
  --teal-500: #14b8a6;
  --teal-600: #0d9488;
  --teal-700: #0f766e;
  --teal-800: #115e59;
  --teal: var(--teal-500);
  --teal-dark: var(--teal-700);
  --surface: #f2fbfa;
  --ink: #0f172a;
  --ring: rgba(20, 184, 166, 0.35);
  --accent-gold: #eab308;
}

.text-teal {
  color: var(--teal) !important;
}

.badge-teal {
  background-color: var(--teal);
  color: #fff;
}

/* Premium buttons (pill, exact sizing) */
.btn-premium,
.btn.btn-premium {
  background-image: linear-gradient(135deg, var(--teal-500), var(--teal-700));
  color: #fff;
  border: none;
  border-radius: 24px;
  min-height: 44px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
}

.btn-premium:hover {
  filter: brightness(1.03);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(17, 94, 89, 0.28);
}

.btn-premium:active {
  transform: translateY(0);
}

.btn-premium-outline,
.btn.btn-premium-outline {
  background: #fff;
  color: var(--teal-700);
  border-radius: 24px;
  border: 2px solid var(--teal-500);
  padding: 0.65rem 1rem;
  min-height: 44px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
}
.btn-premium b, .btn-premium-outline b { font-weight: 500; }

.btn-premium-outline:hover {
  background: rgba(20, 184, 166, 0.06);
  box-shadow: 0 6px 14px rgba(17, 94, 89, 0.16);
}

.btn-premium-outline:active {
  background: rgba(20, 184, 166, 0.12);
}

/* Legacy teal button kept for compatibility */
.btn-teal {
  background-color: var(--teal);
  color: #fff;
  border-color: var(--teal);
  border-radius: 20px;
}

.btn-teal:hover {
  background-color: var(--teal-dark);
  border-color: var(--teal-dark);
}

.btn-compact {
  height: auto;
}

.card-teal {
  border-radius: 20px;
  border: 1px solid rgba(20, 184, 166, 0.22);
  box-shadow: 0 12px 28px rgba(2, 44, 34, 0.08);
  background: linear-gradient(180deg, #ffffff 0%, #f9fefd 60%, #f2fbfa 100%);
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.card-teal:hover { transform: translateY(-2px); box-shadow: 0 18px 40px rgba(2,44,34,0.12); }

/* Apply rounded aesthetic to all cards in this component */
.card {
  border-radius: 20px;
}

/* Premium card & badge */
.card-premium {
  border-radius: 20px;
  border: 1px solid rgba(20, 184, 166, 0.25);
  background: linear-gradient(180deg, #ffffff, #f9fefd);
  box-shadow: 0 10px 28px rgba(2, 44, 34, 0.06);
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.card-premium:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(2, 44, 34, 0.10);
}

.badge-premium {
  background: var(--teal-700);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 8px;
  /* padding: .25rem .5rem; */
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 1px 2px rgba(2, 44, 34, 0.06);
}

/* Consistent 20px rounded aesthetic */
.round-20 {
  border-radius: 20px;
}

.rounded-pill {
  border-radius: 999px;
}

/* Clean, evenly spaced action rows */
.action-row {
  padding: 12px;
  display: flex;
  justify-content: space-between;
}

.action-row .btn {
  flex: 1 1 0;
}

.action-row .btn+.btn {
  margin-left: .5rem;
}

.liked-header {
  width: 100%;
  border: 1px solid rgba(20, 184, 166, 0.35);
  border-radius: 24px;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #ffffff, #f7fdfb 65%, #e3f7f0 100%);
  box-shadow: 0 18px 35px rgba(6, 48, 41, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.liked-info {
  min-width: 0;
}

.liked-info h4 {
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.liked-actions {
  justify-content: flex-end;
  width: 100%;
}

.liked-actions .btn {
  min-height: 44px;
  font-weight: 600;
}

.liked-toggle-btn {
  width: 52px;
  height: 52px;
  border-width: 2px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-color: var(--teal-500);
  box-shadow: 0 6px 18px rgba(15, 118, 110, 0.18);
  background: #ffffff;
  color: var(--teal-500);
}

.liked-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(15, 118, 110, 0.28);
  border-color: var(--teal-600);
  color: var(--teal-700);
}

/* Liked section responsive tweaks */
.fav-title {
  font-size: 1.6rem;
}

.fav-arabic {
  font-size: 2.4rem;
}

.fav-small {
  font-size: 1.2rem;
}

.fav-actions {
  padding: 10px;
}

@media (max-width: 576px) {
  .liked-header {
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .liked-actions {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 0.25rem;
  }

  .fav-title {
    font-size: 1.25rem;
  }

  .fav-arabic {
    font-size: 1.8rem;
  }

  .fav-small {
    font-size: 1rem;
  }

  .fav-actions {
    padding: 6px;
    flex-direction: column;
  }

  .fav-actions .btn {
    width: 100%;
    margin-right: 0 !important;
  }
}

.custom-success:checked {
  background-color: var(--teal-600) !important;
  border-color: var(--teal-600) !important;
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

/* Subtle animations */
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes subtlePulse {
  0% {
    box-shadow: 0 0 0 0 rgba(26, 95, 122, 0.0);
  }

  100% {
    box-shadow: 0 0 0 10px rgba(26, 95, 122, 0.0);
  }
}

.animate-in {
  animation: fadeSlideUp 320ms ease both;
}

.raise-on-hover {
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.raise-on-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 26px rgba(26, 95, 122, 0.26);
}

.shadow-soft {
  box-shadow: 0 10px 20px rgba(26, 95, 122, 0.12);
}

.featured-card {
  background: linear-gradient(135deg, #e0f7fa, #ffffff);
  border-left: 5px solid #228B22;
}

.names-container {
  max-width: 1400px;
  margin: 0 auto;
  font-size: 1.1rem;
}

.btn-primary {
  background-color: #228B22;
  color: #ffffff;
  border-color: #228B22;
}

.btn-primary:hover {
  background-color: #00564c;
  color: #ffffff;
  border-color: #00564c;
}

.btn-outline-primary {
  border-color: #228B22;
  color: #228B22;
}

.btn-outline-primary:hover {
  background-color: #228B22;
  border-color: #228B22;
  color: #ffffff;
}

.names-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  padding: 25px 0;
}

.name-card {
  border: none;
  border-radius: 20px;
  overflow: hidden;
  font-size: 1.1rem;
}

.name-card:hover {
  transform: translateY(-8px);
}

.featured-card {
  border: 3px solid #228B22;
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
  background-color: #228B22;
  border-color: #228B22;
}

.floating-action-btn button:hover {
  background-color: #00564c;
  border-color: #00564c;
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

/* .form-check-label { font-size: 1.2rem; } */

/* Keep Arabic + Meaning together, minimal padding */
.toggle-switches-container {
  padding: 8px;
  gap: 12px;
}

.toggle-pair {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  column-gap: 16px;
  white-space: nowrap;
}

.toggle-switches-container .form-check {
  flex: 0 0 auto;
  margin-bottom: 0;
  margin-right: 0;
}

.toggle-switches-container .form-switch {
  padding-left: 0;
}

.toggle-switches-container .form-check .form-check-input {
  margin-right: 8px;
}

/* Slightly smaller switches on compact screens */
.form-switch .form-check-input {
  width: 2.25rem;
  height: 1.2rem;
}

.form-switch .form-check-input:checked {
  background-size: 1.2rem 1.2rem;
}

.desc-check {
  flex: 0 0 auto;
}

@media (max-width: 768px) {
  .toggle-switches-container {
    padding: 6px;
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

/* Let Description drop below on narrow screens; keep pair intact */
@media (max-width: 576px) {
  .desc-check {
    flex-basis: 100%;
  }
}

/* All names responsive classes */
.name-title {
  font-size: 1.6rem;
}

.name-arabic {
  font-size: 2.4rem;
}

.name-small {
  font-size: 1.2rem;
}

.name-actions {
  padding: 12px;
}

@media (max-width: 576px) {
  .name-title {
    font-size: 1.25rem;
  }

  .name-arabic {
    font-size: 1.8rem;
  }

  .name-small {
    font-size: 1rem;
  }

  .name-actions {
    padding: 8px;
    flex-direction: column;
  }

  .name-actions .btn {
    width: 100%;
    margin-right: 0 !important;
  }
}

/* Improved focus styles */
.focus-ring {
  outline: none;
}

.focus-ring:focus-visible {
  box-shadow: 0 0 0 4px var(--ring);
}

.shadow-soft {
  box-shadow: 0 10px 20px rgba(26, 95, 122, 0.12);
}

.raise-on-hover {
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.raise-on-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 26px rgba(26, 95, 122, 0.26);
}

.animate-in {
  animation: fadeSlideUp 320ms ease both;
}

@keyframes subtlePop {
  from { transform: translateY(0) scale(1); }
  50% { transform: translateY(-1px) scale(1.01); }
  to { transform: translateY(0) scale(1); }
}
.btn-premium:hover, .btn-premium-outline:hover { animation: subtlePop 260ms ease; }
</style>
