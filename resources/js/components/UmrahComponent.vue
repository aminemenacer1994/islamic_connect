<template>
  <div class="container-fluid py-4">
    <div class="text-center mb-5">
      <h1 class="display-4 fw-bold mb-4">
        Hajj & Umrah Guides
      </h1>
      <p class="mx-auto description text-muted" style="max-width: 900px; font-size: 1.2rem;">
        <i class="bi bi-info-circle me-2"></i>These guides provide essential knowledge on the rituals, historical
        background, spiritual significance, logistical steps, and etiquette involved in performing both pilgrimages.
      </p>
      <ul class="nav nav-pills justify-content-center gap-2 gap-md-3 fw-semibold mb-5 flex-wrap" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link custom-tab px-4 py-2" :class="{ active: currentTab === 'hajj' }"
            @click="switchTab('hajj')" id="hajj-tab" data-bs-toggle="tab" data-bs-target="#hajj" type="button"
            role="tab" aria-controls="hajj" :aria-selected="currentTab === 'hajj'">
            <i class="bi bi-moon-stars me-2"></i>Hajj Guides
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link custom-tab px-4 py-2" :class="{ active: currentTab === 'umrah' }"
            @click="switchTab('umrah')" id="umrah-tab" data-bs-toggle="tab" data-bs-target="#umrah" type="button"
            role="tab" aria-controls="umrah" :aria-selected="currentTab === 'umrah'">
            <i class="bi bi-person-walking me-2"></i>Umrah Guides
          </button>
        </li>
      </ul>
    </div>
    <div class="row g-3 g-md-4 align-items-stretch justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div class="p-3 p-md-4 guide-card shadow-sm rounded-4 border border-2">
          <h1 class="h2 fw-bold text-center mb-3"><i class="bi bi-book me-2"></i>{{ currentContent.title }}</h1>
          <div class="info-row d-flex flex-wrap justify-content-center gap-2 mb-3">
            <span class="badge info-badge"><i class="bi bi-book me-1"></i><strong>Read:</strong> {{ readTime }} min</span>
            <span class="badge info-badge"><i class="bi bi-headphones me-1"></i><strong>Listen:</strong> {{ listeningTime }} min</span>
            <span class="badge info-badge"><i class="bi bi-file-earmark-word me-1"></i><strong>Words:</strong> {{ wordCount }}</span>
          </div>
          <section class="mb-3">
            <h3 class="section-title mb-2"><i class="bi bi-list-ol me-2"></i>Step-by-Step Guide</h3>
            <div class="accordion mb-3" id="guideSteps">
              <div v-for="(step, idx) in currentContent.steps" :key="idx" class="accordion-item rounded-4 mb-2 shadow-sm border border-2">
                <h2 class="accordion-header" :id="`heading${idx}`">
                  <button class="accordion-button fw-bold fs-6" :class="{collapsed: idx !== 0}" type="button" data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${idx}`" :aria-expanded="idx === 0 ? 'true' : 'false'" :aria-controls="`collapse${idx}`">
                    <i class="bi bi-check2-circle me-2 text-custom"></i>{{ step.title }}
                  </button>
                </h2>
                <div :id="`collapse${idx}`" class="accordion-collapse collapse" :class="{show: idx === 0}" :aria-labelledby="`heading${idx}`" data-bs-parent="#guideSteps">
                  <div class="accordion-body">
                    <div class="mb-2" v-html="step.description"></div>
                    <div v-if="step.dua" class="alert alert-success rounded-4 shadow-sm mt-2">
                      <h5 class="mb-2"><i class="bi bi-journal-richtext me-2"></i>Dua</h5>
                      <span v-html="step.dua"></span>
                    </div>
                    <div v-if="step.warning" class="alert alert-warning rounded-4 shadow-sm mt-2">
                      <h5 class="mb-2"><i class="bi bi-exclamation-triangle me-2"></i>Warning</h5>
                      <span v-html="step.warning"></span>
                    </div>
                    <div v-if="step.dos" class="alert alert-primary rounded-4 shadow-sm mt-2">
                      <h5 class="mb-2"><i class="bi bi-hand-thumbs-up me-2"></i>Do's</h5>
                      <ul class="mb-0"><li v-for="(doItem, dIdx) in step.dos" :key="dIdx">{{ doItem }}</li></ul>
                    </div>
                    <div v-if="step.donts" class="alert alert-danger rounded-4 shadow-sm mt-2">
                      <h5 class="mb-2"><i class="bi bi-hand-thumbs-down me-2"></i>Don'ts</h5>
                      <ul class="mb-0"><li v-for="(dontItem, dIdx) in step.donts" :key="dIdx">{{ dontItem }}</li></ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section v-if="currentContent.references && currentContent.references.length" class="mt-3">
            <h3 class="section-title mb-2"><i class="bi bi-link-45deg me-2"></i>References & Further Reading</h3>
            <ul class="list-unstyled">
              <li v-for="(ref, rIdx) in currentContent.references" :key="rIdx">
                <a :href="ref.url" target="_blank" rel="noopener" class="text-decoration-underline">{{ ref.title }}</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <transition name="fade-slow-top">
        <div v-if="copySuccess"
          class="alert alert-success alert-dismissible fs-5 p-4 text-center border-0 position-fixed top-0 start-50 translate-middle-x"
          role="alert"
          style="background-color: rgba(223, 250, 241, 0.9); color: #00bfa6; z-index: 1100; max-width: 500px;">
          <i class="bi bi-check-circle-fill me-2"></i><strong>Success:</strong> Guide copied to clipboard!
          <button type="button" class="btn-close" @click="copySuccess = false" aria-label="Close"></button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HajjUmrahGuides',
  data() {
    return {
      utterance: null,
      isSpeaking: false,
      isPaused: false,
      isCopying: false,
      isSpeechAvailable: !!window.speechSynthesis,
      settingsOpen: false,
      currentTab: 'hajj',
      copySuccess: false,
      showAISummary: false,
      guides: {
        hajj: {
          title: "Hajj Guide",
          summary: "Hajj is the annual pilgrimage to Makkah, required once in a lifetime for those able. It involves a series of sacred rituals over several days, fostering spiritual renewal, unity, and devotion.",
          steps: [
            {
              title: "Preparation & Intention (Niyyah)",
              description: `
                  <strong>Spiritual Preparation:</strong><br>
                  - Begin by sincerely purifying your intention (niyyah) for Hajj, seeking only Allah's pleasure.<br>
                  - Engage in self-reflection, repentance, and ask forgiveness from Allah and from anyone you may have wronged.<br>
                  - Increase acts of worship: pray extra prayers, read Qur'an, and make abundant dhikr.<br>
                  - Make dua for ease, acceptance, and safety for yourself and fellow pilgrims.<br><br>
                  <strong>Practical & Social Preparation:</strong><br>
                  - Settle all debts and outstanding obligations. Ensure your family and dependents are cared for in your absence.<br>
                  - Write a will and inform your loved ones of your travel plans.<br>
                  - Seek forgiveness and resolve disputes with family, friends, and community members.<br>
                  - Attend Hajj seminars or study reliable guides to understand the rites and logistics.<br><br>
                  <strong>Logistical Preparation:</strong><br>
                  - Ensure your passport, visa, and travel documents are valid and up to date.<br>
                  - Pack Ihram clothing (two white, unstitched cloths for men; modest dress for women), comfortable shoes, toiletries (unscented), and a small bag for valuables.<br>
                  - Prepare a list of emergency contacts and keep copies of important documents.<br>
                  - Arrange for necessary vaccinations and bring any required medications.<br>
                  - Pack a prayer mat, reusable water bottle, snacks, and a small first-aid kit.<br><br>
                  <strong>Family & Community:</strong><br>
                  - Inform your employer and arrange for time off.<br>
                  - Assign someone to look after your affairs at home.<br>
                  - Share your itinerary and contact details with family.<br><br>
                  <strong>Mindset:</strong><br>
                  - Approach Hajj with humility, patience, and gratitude.<br>
                  - Mentally prepare for crowds, physical exertion, and possible discomforts.<br>
                  - Remember the immense reward and spiritual transformation that Hajj offers.<br><br>
                  <em>Reference: <a href='https://www.islamicfinder.org/knowledge/islamic-guides/hajj-guide/' target='_blank'>IslamicFinder Hajj Guide</a></em>
                  <div v-if="showAISummary" class="alert alert-secondary mt-3">
                    <strong>AI-Generated Summary:</strong> <br>
                    Preparing for Hajj is a holistic process involving spiritual cleansing, practical planning, and social responsibility. Sincerely purify your intention, seek forgiveness, and resolve all obligations before you leave. Study the rites, pack essentials, and ensure your family is cared for. Approach the journey with humility and patience, ready for both challenges and immense spiritual growth.
                  </div>
                  <button class="btn btn-outline-info btn-sm mt-2" @click.prevent="showAISummary = !showAISummary">
                    {{ showAISummary ? 'Hide' : 'Show' }} AI-Generated Summary
                  </button>
                `,
              dua: "O Allah, grant me a Hajj free of hypocrisy and showing off, and grant me forgiveness and mercy.",
              dos: ["Study the rites of Hajj", "Settle debts and obligations", "Pack essentials and Ihram"],
              donts: ["Neglect family responsibilities", "Travel without proper documentation"],
            },
            {
              title: "Entering Ihram",
              description: `At the Miqat, change into Ihram, make the intention for Hajj, and recite the Talbiyah: <br><em>Labbaik Allahumma Labbaik...</em> (Here I am, O Allah, here I am).` ,
              dua: "Labbaik Allahumma Labbaik, Labbaik Laa Shareeka Laka Labbaik...",
              warning: "Ihram restrictions apply: avoid cutting hair/nails, using perfume, or engaging in marital relations.",
              dos: ["Recite Talbiyah often", "Maintain cleanliness"],
              donts: ["Break Ihram rules", "Argue or fight"],
            },
            {
              title: "Tawaf al-Qudum (Arrival Tawaf)",
              description: `Circle the Kaaba seven times counterclockwise, starting from the Black Stone. Pray two rak'ahs at Maqam Ibrahim and drink Zamzam water.`,
              dua: "SubhanAllah, Alhamdulillah, Allahu Akbar (recite any dua from the heart)",
              dos: ["Stay calm in crowds", "Help others if possible"],
              donts: ["Push or harm others", "Rush the ritual"],
            },
            {
              title: "Sa'i between Safa and Marwah",
              description: `Walk seven times between the hills of Safa and Marwah, remembering Hajar's search for water. End with dua and reflection.`,
              dua: "Rabbighfir warham innaka antal-Azizul-Akram",
              dos: ["Reflect on Hajar's perseverance", "Recite duas during Sa'i"],
              donts: ["Run in unsafe areas", "Distract others"],
            },
            {
              title: "Standing at Arafat (Wuquf)",
              description: `On the 9th of Dhul Hijjah, stand in prayer and supplication at Arafat from noon to sunset. This is the heart of Hajj. Seek forgiveness and make heartfelt duas.`,
              dua: "There is no god but Allah alone, He has no partner...",
              warning: "Missing Arafat invalidates Hajj.",
              dos: ["Pray for yourself and others", "Stay hydrated"],
              donts: ["Leave Arafat before sunset", "Waste time in idle talk"],
            },
            {
              title: "Muzdalifah & Mina",
              description: `After sunset, travel to Muzdalifah, collect pebbles, pray, and rest. Proceed to Mina for stoning the Jamarat (pillars) and sacrifice an animal. Shave or trim hair to exit Ihram.`,
              dua: "Allahumma taqabbal minna (O Allah, accept from us)",
              dos: ["Follow safety instructions", "Be patient in crowds"],
              donts: ["Throw stones at people", "Neglect Sunnah practices"],
            },
            {
              title: "Farewell Tawaf (Tawaf al-Wada)",
              description: `Before leaving Makkah, perform a final Tawaf around the Kaaba. Make dua for acceptance and safe return.`,
              dua: "O Allah, accept my Hajj and forgive my shortcomings.",
              dos: ["Express gratitude", "Pray for a safe journey home"],
              donts: ["Delay departure unnecessarily", "Forget to make dua"],
            },
          ],
          references: [
            { title: "IslamicFinder Hajj Guide", url: "https://www.islamicfinder.org/knowledge/islamic-guides/hajj-guide/" },
            { title: "Muslim Hands Hajj Guide", url: "https://muslimhands.org.uk/latest/2017/06/a-step-by-step-guide-to-hajj" },
            { title: "YouTube: Hajj Documentary", url: "https://www.youtube.com/watch?v=1eR3gG9QK9w" },
          ]
        },
        umrah: {
          title: "Umrah Guide",
          summary: "Umrah is a non-mandatory pilgrimage to Makkah, performed any time of year. It involves Ihram, Tawaf, Sa'i, and shaving or trimming hair, offering spiritual renewal and blessings.",
          steps: [
            {
              title: "Preparation & Intention (Niyyah)",
              description: `
                <strong>Spiritual Preparation:</strong><br>
                - Sincerely purify your intention (niyyah) for Umrah, seeking only Allah's pleasure and reward.<br>
                - Repent for past mistakes, seek forgiveness from Allah and from anyone you may have wronged.<br>
                - Increase acts of worship: pray extra prayers, read Qur'an, and make abundant dhikr.<br>
                - Make dua for ease, acceptance, and safety for yourself and fellow pilgrims.<br><br>
                <strong>Practical & Social Preparation:</strong><br>
                - Settle all debts and outstanding obligations. Ensure your family and dependents are cared for in your absence.<br>
                - Write a will and inform your loved ones of your travel plans.<br>
                - Seek forgiveness and resolve disputes with family, friends, and community members.<br>
                - Attend Umrah seminars or study reliable guides to understand the rites and logistics.<br><br>
                <strong>Logistical Preparation:</strong><br>
                - Ensure your passport, visa, and travel documents are valid and up to date.<br>
                - Pack Ihram clothing (two white, unstitched cloths for men; modest dress for women), comfortable shoes, toiletries (unscented), and a small bag for valuables.<br>
                - Prepare a list of emergency contacts and keep copies of important documents.<br>
                - Arrange for necessary vaccinations and bring any required medications.<br>
                - Pack a prayer mat, reusable water bottle, snacks, and a small first-aid kit.<br><br>
                <strong>Family & Community:</strong><br>
                - Inform your employer and arrange for time off.<br>
                - Assign someone to look after your affairs at home.<br>
                - Share your itinerary and contact details with family.<br><br>
                <strong>Mindset:</strong><br>
                - Approach Umrah with humility, patience, and gratitude.<br>
                - Mentally prepare for crowds, physical exertion, and possible discomforts.<br>
                - Remember the immense reward and spiritual transformation that Umrah offers.<br><br>
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/islamic-guides/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
              `,
              dua: "O Allah, I intend to perform Umrah, make it easy for me and accept it from me.",
              dos: ["Study the rites of Umrah", "Pack essentials and Ihram", "Settle debts and obligations"],
              donts: ["Neglect spiritual preparation", "Forget travel documents"],
            },
            {
              title: "Entering Ihram at Miqat",
              description: `
                <strong>At the Miqat (designated boundary):</strong><br>
                - Change into Ihram clothing before crossing the Miqat. Men wear two white, unstitched cloths; women wear modest, simple dress.<br>
                - Make the intention (niyyah) for Umrah: "Labbayka Allahumma Umrah" (O Allah, I am here to perform Umrah).<br>
                - Recite the Talbiyah aloud: <br>
                  <em>Labbaik Allahumma Labbaik, Labbaik Laa Shareeka Laka Labbaik. Innal Hamda, Wan-Ni'mata, Laka wal-Mulk, Laa Shareeka Lak.</em><br>
                  (Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Surely all praise, grace, and dominion are Yours, and You have no partner.)<br><br>
                <strong>Ihram Restrictions:</strong><br>
                - Do not cut hair or nails, use perfume, or engage in marital relations.<br>
                - Avoid arguments, foul language, and harming others.<br>
                - Maintain cleanliness and dignity.<br><br>
                <strong>Spiritual Focus:</strong><br>
                - Recite Talbiyah frequently and reflect on its meaning.<br>
                - Make dua for acceptance and ease.<br><br>
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/islamic-guides/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
              `,
              dua: "Labbaik Allahumma Labbaik, Labbaik Laa Shareeka Laka Labbaik...",
              warning: "Ihram restrictions apply: avoid cutting hair/nails, using perfume, or engaging in marital relations.",
              dos: ["Recite Talbiyah often", "Maintain cleanliness", "Make intention with sincerity"],
              donts: ["Break Ihram rules", "Argue or fight"],
            },
            {
              title: "Tawaf (Circumambulation of the Kaaba)",
              description: `
                <strong>Performing Tawaf:</strong><br>
                - Enter Masjid al-Haram with your right foot, reciting the dua for entering the mosque.<br>
                - Proceed to the Black Stone (Hajar al-Aswad), face it, and if possible, kiss or touch it. If not, point towards it and say "Bismillah, Allahu Akbar".<br>
                - Circle the Kaaba seven times counterclockwise, starting and ending at the Black Stone. Remain calm and patient, especially in crowds.<br>
                - Recite prayers, dhikr, and personal duas throughout. There are no fixed supplications; speak from your heart.<br>
                - After completing seven circuits, pray two rak'ahs behind Maqam Ibrahim (if possible), or anywhere in the mosque if crowded.<br>
                - Drink Zamzam water and make dua for your needs.<br><br>
                <strong>Etiquette:</strong><br>
                - Be mindful of others, avoid pushing, and help those in need.<br>
                - Maintain humility and focus on the spiritual significance of Tawaf.<br><br>
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/islamic-guides/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
              `,
              dua: "SubhanAllah, Alhamdulillah, Allahu Akbar (recite any dua from the heart)",
              dos: ["Stay calm in crowds", "Help others if possible", "Pray two rak'ahs after Tawaf", "Drink Zamzam water"],
              donts: ["Push or harm others", "Rush the ritual", "Forget to make dua"],
            },
            {
              title: "Sa'i between Safa and Marwah",
              description: `
                <strong>Performing Sa'i:</strong><br>
                - After Tawaf, proceed to the hill of Safa. Face the Kaaba, make dua, and begin Sa'i.<br>
                - Walk briskly between the green markers (men only), and walk normally elsewhere.<br>
                - Complete seven circuits between Safa and Marwah, starting at Safa and ending at Marwah.<br>
                - Reflect on the story of Hajar, her perseverance, and Allah's mercy.<br>
                - Recite prayers and duas throughout. There are recommended supplications, but you may also make personal duas.<br>
                - At the end, face the Kaaba, make dua, and thank Allah for the opportunity.<br><br>
                <strong>Etiquette:</strong><br>
                - Be considerate of others, especially the elderly and those with children.<br>
                - Maintain focus and humility.<br><br>
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/islamic-guides/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
              `,
              dua: "Rabbighfir warham innaka antal-Azizul-Akram",
              dos: ["Reflect on Hajar's perseverance", "Recite duas during Sa'i", "Be considerate of others"],
              donts: ["Run in unsafe areas", "Distract others", "Forget to make dua"],
            },
            {
              title: "Shaving or Trimming Hair (Tahallul)",
              description: `
                <strong>Completion of Umrah:</strong><br>
                - After completing Sa'i, men should shave (halq) or trim (taqsir) their hair. Shaving is preferred for men, but trimming is also accepted.<br>
                - Women should cut a small portion (about a fingertip's length) from their hair.<br>
                - This act symbolizes humility, renewal, and the completion of Umrah.<br>
                - After this, all Ihram restrictions are lifted.<br><br>
                <strong>Spiritual Reflection:</strong><br>
                - Thank Allah for enabling you to complete Umrah.<br>
                - Make dua for acceptance and for your loved ones.<br>
                - Reflect on the lessons of humility, obedience, and gratitude.<br><br>
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/islamic-guides/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
              `,
              dua: "Allahumma taqabbal minni (O Allah, accept from me)",
              dos: ["Thank Allah for the opportunity", "Pray for acceptance", "Reflect on the experience"],
              donts: ["Forget to make dua", "Leave before completing all rites"],
            },
          ],
          references: [
            { title: "IslamicFinder Umrah Guide", url: "https://www.islamicfinder.org/knowledge/islamic-guides/umrah-guide/" },
            { title: "Muslim Hands Umrah Guide", url: "https://muslimhands.org.uk/latest/2017/06/a-step-by-step-guide-to-umrah" },
            { title: "YouTube: Umrah Documentary", url: "https://www.youtube.com/watch?v=2Q1kzQ7vQnA" },
          ]
        }
      },
      readTime: 0,
      listeningTime: 0,
      wordCount: 0
    };
  },
  computed: {
    currentContent() {
      return this.guides[this.currentTab] || {};
    }
  },
  mounted() {
    this.calculateReadTimeAndWordCount();
    window.addEventListener('beforeunload', this.stopSpeech);
    window.addEventListener('visibilitychange', this.handleTabChange);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.stopSpeech);
    window.removeEventListener('visibilitychange', this.handleTabChange);
    this.stopSpeech();
  },
  methods: {
    switchTab(tab) {
      if (this.currentTab === tab) return;
      this.currentTab = tab;
      this.stopSpeech();
      this.settingsOpen = false;
      this.$nextTick(() => {
        this.calculateReadTimeAndWordCount();
      });
    },
    async toggleSpeech() {
      if (!this.isSpeechAvailable) {
        alert("Text-to-speech is not supported in this browser.");
        return;
      }
      const { title, summary, steps } = this.currentContent;
      const text = `${title || ''} ${summary || ''} ${(steps || []).map(s => s.title + ' ' + s.description).join(' ')}`.trim();
      if (!text) {
        alert("No content available to read.");
        return;
      }
      if (this.isSpeaking && !this.isPaused) {
        try {
          window.speechSynthesis.pause();
          this.isPaused = true;
        } catch (error) {
          console.error('Speech pause error:', error);
          this.stopSpeech();
        }
      } else if (this.isSpeaking && this.isPaused) {
        try {
          window.speechSynthesis.resume();
          this.isPaused = false;
        } catch (error) {
          console.error('Speech resume error:', error);
          this.stopSpeech();
        }
      } else {
        this.stopSpeech();
        try {
          this.utterance = new SpeechSynthesisUtterance(text);
          this.utterance.lang = 'en-US';
          this.utterance.rate = 1.0;
          this.utterance.pitch = 1.0;
          this.utterance.volume = 1.0;
          this.utterance.onend = () => {
            this.isSpeaking = false;
            this.isPaused = false;
            this.utterance = null;
          };
          this.utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.stopSpeech();
            alert('An error occurred during speech synthesis.');
          };
          window.speechSynthesis.speak(this.utterance);
          this.isSpeaking = true;
          this.isPaused = false;
        } catch (error) {
          console.error('Speech synthesis failed:', error);
          alert('Failed to start speech synthesis.');
          this.stopSpeech();
        }
      }
    },
    stopSpeech() {
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch (error) {
          console.error('Speech cancel error:', error);
        }
      }
      this.isSpeaking = false;
      this.isPaused = false;
      this.utterance = null;
    },
    handleTabChange() {
      if (document.hidden && this.isSpeaking) {
        this.stopSpeech();
      }
    },
    async copyText() {
      this.isCopying = true;
      const textToCopy = [
        this.currentContent.title,
        this.currentContent.summary,
        ...(this.currentContent.steps || []).map(s => s.title + '\n' + s.description)
      ].filter(Boolean).join("\n\n");
      try {
        await navigator.clipboard.writeText(textToCopy);
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 3000);
      } catch (err) {
        console.error('Failed to copy text:', err);
        alert('Failed to copy text to clipboard.');
      } finally {
        this.isCopying = false;
      }
    },
    calculateReadTimeAndWordCount() {
      const text = [
        this.currentContent.title,
        this.currentContent.summary,
        ...(this.currentContent.steps || []).map(s => s.title + ' ' + s.description)
      ].filter(Boolean).join(" ");
      this.wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      this.readTime = Math.ceil(this.wordCount / 200);
      this.listeningTime = Math.ceil(this.wordCount / 150);
    },
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
      console.log('Settings toggled:', this.settingsOpen);
    }
  }
};
</script>

<style scoped>
.custom-tab {
  background-color: #e6f3f2;
  color: #00bfa6;
  font-size: 1.1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  border: 2px solid transparent;
  transition: all 0.2s cubic-bezier(.4,2,.3,1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,191,166,0.06);
}
.custom-tab:hover {
  background-color: #d1ecea;
  color: #009688;
  box-shadow: 0 2px 8px rgba(0,191,166,0.10);
}
.custom-tab.active {
  background-color: #00bfa6;
  color: white;
  border-color: #009688;
  box-shadow: 0 3px 10px rgba(0, 191, 166, 0.13);
}
.custom-tab:disabled {
  background-color: #6c757d;
  color: white;
  cursor: not-allowed;
}
.guide-card {
  background: #fff;
  border-radius: 1.2rem;
  box-shadow: 0 4px 16px rgba(0,191,166,0.06), 0 1.5px 4px rgba(0,0,0,0.03);
  border: 2px solid #e6f3f2;
}
.info-row {
  gap: 0.5rem !important;
}
.info-badge {
  background: #f5f5f7;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 1.5rem;
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  min-width: 90px;
  justify-content: center;
  border: 1.5px solid #e0e0e0;
}
@media (max-width: 600px) {
  .guide-card {
    padding: 1.1rem !important;
    border-radius: 0.7rem;
  }
  .section-title {
    font-size: 1.1rem;
  }
  .info-badge {
    font-size: 0.95rem;
    padding: 0.35rem 0.7rem;
    min-width: 70px;
  }
  .accordion-button {
    font-size: 0.98rem !important;
    padding: 0.7rem 1rem;
  }
  .accordion-item {
    border-radius: 0.7rem !important;
  }
}
.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.5px;
}
.section-title i {
  color: #888;
}
.accordion-item {
  border-radius: 1rem !important;
  margin-bottom: 0.7rem;
  border: 2px solid #e0e0e0 !important;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.accordion-button {
  border-radius: 1rem !important;
  font-size: 1.08rem;
  font-weight: 600;
  background: #f5f5f7;
  color: #222;
  transition: background 0.2s, color 0.2s;
}
.accordion-button:not(.collapsed) {
  background: #e6f3f2;
  color: #00bfa6;
}
.accordion-body {
  font-size: 1.02rem;
  background: #f8fdfc;
  border-radius: 0.8rem;
  padding: 1.1rem;
}
.alert-info, .alert-warning, .alert-primary, .alert-danger, .alert-success {
  font-size: 0.98rem;
  border-radius: 0.8rem;
  box-shadow: 0 1px 4px rgba(0,191,166,0.06);
}
ul.list-unstyled {
  padding-left: 0;
}
ul.list-unstyled li {
  margin-bottom: 0.5rem;
}
.text-custom {
  color: #00bfa6;
}
</style>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
::selection {
  background-color: #00bfa6;
  color: white;
}
a {
  color: #00bfa6;
  text-decoration: none;
}
a:hover {
  color: #009688;
}
</style>