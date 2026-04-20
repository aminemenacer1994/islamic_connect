<template>
  <main role="main" aria-labelledby="umrah-title">
    <div class="container-fluid py-5" id="main-content" tabindex="-1">
      <div class="text-center mb-5">
        <h2 id="umrah-title" class="display-5 fw-bold mb-4">
          Hajj & Umrah Guides
        </h2>
        <p class="mx-auto description text-muted guide-description">
          <i class="bi bi-info-circle me-2" aria-hidden="true"></i>These guides provide essential knowledge on the
          rituals, historical
          background, spiritual significance, logistical steps, and etiquette involved in performing both pilgrimages.
        </p>
        <!-- Tabs with ARIA roles and keyboard navigation -->
        <ul class="nav nav-tabs justify-content-center mb-4 clean-tabs" role="tablist"
          aria-label="Hajj and Umrah Guides Tabs" @keydown="onTablistKeydown" ref="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link clean-tab-btn" :class="{ active: currentTab === 'hajj' }" @click="switchTab('hajj')"
              id="hajj-tab" type="button" role="tab" aria-controls="hajj-panel"
              :aria-selected="currentTab === 'hajj' ? 'true' : 'false'" :tabindex="currentTab === 'hajj' ? 0 : -1" ref="tabHajj"
              @keydown.enter.space="switchTab('hajj')" :aria-label="'Show Hajj Guide'">
              <i class="bi bi-moon-stars me-2" aria-hidden="true"></i>Hajj Guides
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link clean-tab-btn" :class="{ active: currentTab === 'umrah' }"
              @click="switchTab('umrah')" id="umrah-tab" type="button" role="tab" aria-controls="umrah-panel"
              :aria-selected="currentTab === 'umrah' ? 'true' : 'false'" :tabindex="currentTab === 'umrah' ? 0 : -1" ref="tabUmrah"
              @keydown.enter.space="switchTab('umrah')" :aria-label="'Show Umrah Guide'">
              <i class="bi bi-person-walking me-2" aria-hidden="true"></i>Umrah Guides
            </button>
          </li>
        </ul>
      </div>
      <div class="row g-3 g-md-4 align-items-stretch justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <!-- Print Button -->
          <!-- <div class="action-row action-row--spaced action-row--end mb-3 no-print">
            <button type="button" @click="copyText" :disabled="isCopying"
              class="premium-action-button premium-action-button--outline"
              aria-label="Copy the Hajj and Umrah guide content">
              <span class="action-row__icon"><i class="bi bi-link-45deg" aria-hidden="true"></i></span>
              <span class="action-row__label">{{ isCopying ? 'Copying...' : 'Copy Guide' }}</span>
            </button>
            <button type="button" @click="printGuide"
              class="premium-action-button premium-action-button--primary"
              aria-label="Print or save this guide">
              <span class="action-row__icon"><i class="bi bi-printer" aria-hidden="true"></i></span>
              <span class="action-row__label">Print / Save PDF</span>
            </button>
          </div> -->
          <!--
            <div class="map-panel mb-4" role="region" aria-label="Map showing key ritual locations">
              <div id="ritual-map" class="ritual-map-frame"></div>
            </div>
          -->
          <div class="p-3 p-md-4 guide-card shadow-sm rounded-4 border border-2" :aria-labelledby="currentTab + '-tab'"
            :id="currentTab + '-panel'" role="tabpanel">
            <h1 class="h1 fw-bold text-center mb-3">{{ currentContent.title }}</h1>
            <!-- <div class="info-row d-flex flex-wrap justify-content-center gap-2 mb-4" aria-label="Guide info badges">
              <span class="badge info-badge"><i class="bi bi-book me-1" aria-hidden="true"></i><strong>Read: </strong> {{ readTime }} min</span>
              <span class="badge info-badge"><i class="bi bi-headphones me-1" aria-hidden="true"></i><strong>Listen:</strong> {{ listeningTime }} min</span>
              <span class="badge info-badge"><i class="bi bi-file-earmark-word me-1" aria-hidden="true"></i><strong>Words: </strong> {{ wordCount }}</span>
            </div> -->
            <section class="mt-3">
              <h3 class="section-title mb-2"><i class="bi bi-list-ol me-2" aria-hidden="true"></i>Step-by-Step Guide
              </h3>
              <div class="accordion mb-3" id="guideSteps" role="region" aria-label="Step-by-step guide">
                <div v-for="(step, idx) in currentContent.steps" :key="idx"
                  class="accordion-item rounded-4 mb-2 shadow-sm border border-2">
                  <h2 class="accordion-header" :id="`heading${idx}`">
                    <button class="accordion-button fw-bold fs-6" :class="{ collapsed: idx !== 0 }" type="button"
                      data-bs-toggle="collapse" :data-bs-target="`#collapse${idx}`"
                      :aria-expanded="idx === 0 ? 'true' : 'false'" :aria-controls="`collapse${idx}`"
                      :id="`step-tab-${idx}`" role="button" tabindex="0" :aria-label="'Expand step: ' + step.title">
                      <i class="bi bi-check2-circle me-2 text-custom" aria-hidden="true"></i>{{ step.title }}
                    </button>
                  </h2>
                  <div :id="`collapse${idx}`" class="accordion-collapse collapse" :class="{ show: idx === 0 }"
                    :aria-labelledby="`heading${idx}`" data-bs-parent="#guideSteps" role="region"
                    :aria-label="'Step details: ' + step.title">
                    <div class="accordion-body">
                      <div class="mb-2" v-html="step.description"></div>
                      <div v-if="step.dua" class="alert alert-soft-success rounded-4 shadow-sm mt-2" role="region"
                        aria-label="Dua">
                        <h5 class="mb-2"><i class="bi bi-journal-richtext me-2" aria-hidden="true"></i>Dua</h5>
                        <span v-html="step.dua"></span>
                      </div>
                      <div v-if="step.warning" class="alert alert-soft-warning rounded-4 shadow-sm mt-2" role="region"
                        aria-label="Warning">
                        <h5 class="mb-2"><i class="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>Warning</h5>
                        <span v-html="step.warning"></span>
                      </div>
                      <div v-if="step.dos" class="alert alert-soft-primary rounded-4 shadow-sm mt-2" role="region"
                        aria-label="Do's">
                        <h5 class="mb-2"><i class="bi bi-hand-thumbs-up me-2" aria-hidden="true"></i>Do's</h5>
                        <ul class="mb-0">
                          <li v-for="(doItem, dIdx) in step.dos" :key="dIdx">{{ doItem }}</li>
                        </ul>
                      </div>
                      <div v-if="step.donts" class="alert alert-soft-danger rounded-4 shadow-sm mt-2" role="region"
                        aria-label="Don'ts">
                        <h5 class="mb-2"><i class="bi bi-hand-thumbs-down me-2" aria-hidden="true"></i>Don'ts</h5>
                        <ul class="mb-0">
                          <li v-for="(dontItem, dIdx) in step.donts" :key="dIdx">{{ dontItem }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- FAQ Section -->
            <section v-if="currentContent.faq && currentContent.faq.length" class="mt-4">
              <h3 class="section-title mb-2"><i class="bi bi-question-circle me-2" aria-hidden="true"></i>Frequently
                Asked Questions</h3>
              <div class="accordion" :id="currentTab + '-faq'" role="region" aria-label="Frequently Asked Questions">
                <div v-for="(item, idx) in currentContent.faq" :key="idx"
                  class="accordion-item rounded-4 mb-2 shadow-sm border border-2">
                  <h2 class="accordion-header" :id="`faq-heading-${currentTab}-${idx}`">
                    <button class="accordion-button fw-bold fs-6 collapsed" type="button" data-bs-toggle="collapse"
                      :data-bs-target="`#faq-collapse-${currentTab}-${idx}`" aria-expanded="false"
                      :aria-controls="`faq-collapse-${currentTab}-${idx}`" :aria-label="'Expand FAQ: ' + item.question">
                      <i class="bi bi-question-lg me-2 text-custom" aria-hidden="true"></i>{{ item.question }}
                    </button>
                  </h2>
                  <div :id="`faq-collapse-${currentTab}-${idx}`" class="accordion-collapse collapse"
                    :aria-labelledby="`faq-heading-${currentTab}-${idx}`" :data-bs-parent="`#${currentTab}-faq`"
                    role="region" :aria-label="'FAQ answer: ' + item.question">
                    <div class="accordion-body">
                      <span v-html="item.answer"></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- Common Mistakes Section -->
            <section v-if="currentContent.commonMistakes && currentContent.commonMistakes.length" class="mt-4">
              <h3 class="section-title mb-2"><i class="bi bi-exclamation-diamond me-2" aria-hidden="true"></i>Common
                Mistakes</h3>
              <ul class="list-unstyled ms-2">
                <li v-for="(mistake, mIdx) in currentContent.commonMistakes" :key="mIdx"
                  class="mb-2 d-flex align-items-start">
                  <i class="bi bi-x-circle-fill text-danger me-2" aria-hidden="true"></i>
                  <span>{{ mistake }}</span>
                </li>
              </ul>
            </section>
            <section v-if="currentContent.references && currentContent.references.length" class="mt-3">
              <h3 class="section-title mb-2"><i class="bi bi-link-45deg me-2" aria-hidden="true"></i>References &
                Further Reading</h3>
              <ul class="list-unstyled">
                <li v-for="(ref, rIdx) in currentContent.references" :key="rIdx" class="me-3">
                  <a :href="ref.url" target="_blank" rel="noopener" class="text-decoration-underline"
                    :aria-label="'Reference: ' + ref.title">{{ ref.title }}</a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <transition name="fade-slow-top">
        <div v-if="copySuccess"
          class="alert alert-success alert-dismissible fs-5 p-4 text-center border-0 position-fixed top-0 start-50 translate-middle-x alert-floating"
          role="alert" aria-live="polite">
            <i class="bi bi-check-circle-fill me-2" aria-hidden="true"></i><strong>Success:</strong> Guide copied to
            clipboard!
            <button type="button" class="btn-close" @click="copySuccess = false" aria-label="Close"></button>
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<script>
import { markRaw } from 'vue';

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
      // Large static guide data: mark as non-reactive for performance
      guides: markRaw({
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
                  <em>Reference: <a href='https://www.islamicfinder.org/knowledge/hajj-guide/' target='_blank'>IslamicFinder Hajj Guide</a></em>
                `,
              dua: "O Allah, grant me a Hajj free of hypocrisy and showing off, and grant me forgiveness and mercy.",
              dos: ["Study the rites of Hajj", "Settle debts and obligations", "Pack essentials and Ihram"],
              donts: ["Neglect family responsibilities", "Travel without proper documentation"],
            },
            {
              title: "Entering Ihram",
              description: `
    <strong>Spiritual Preparation:</strong><br>
    - Purify your intention (niyyah) for Hajj, seeking only Allah's pleasure.<br>
    - Repent for past mistakes and seek forgiveness from Allah and others.<br>
    - Increase your prayers, recite Qur'an, and make abundant dhikr.<br>
    - Make dua for ease, acceptance, and safety for yourself and fellow pilgrims.<br>
    - Reflect on the significance of Ihram as a symbol of equality and humility before Allah.<br>
    <br>
    <strong>Practical & Social Preparation:</strong><br>
    - Take a full bath (ghusl), trim nails, and remove unwanted body hair.<br>
    - Men wear two white, unstitched cloths; women wear modest, simple dress.<br>
    - Settle debts and ensure your family is cared for; leave clear instructions and emergency contacts.<br>
    - Inform your employer and arrange for time off.<br>
    - Write a will and inform your loved ones of your travel plans.<br>
    - Seek forgiveness and resolve disputes with family, friends, and community members.<br>
    <br>
    <strong>Logistical Preparation:</strong><br>
    - Ensure you have unscented toiletries, Ihram belt, and all travel documents (passport, visa, tickets, hotel info).<br>
    - Pack a small bag for valuables, a prayer mat, reusable water bottle, snacks, and a first-aid kit.<br>
    - Arrange for necessary vaccinations and bring any required medications.<br>
    - Prepare a list of emergency contacts and keep copies of important documents.<br>
    <br>
    <strong>At the Miqat:</strong><br>
    - Make the intention for Hajj: “Labbayka Allahumma Hajj” (O Allah, I am here to perform Hajj).<br>
    - Recite the Talbiyah aloud:<br>
    <em>Labbaik Allahumma Labbaik, Labbaik Laa Shareeka Laka Labbaik. Innal Hamda, Wan-Ni'mata, Laka wal-Mulk, Laa Shareeka Lak.</em><br>
    (Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Surely all praise, grace, and dominion are Yours, and You have no partner.)<br>
    - Continue reciting Talbiyah frequently throughout Hajj.<br>
    <br>
    <strong>Ihram Restrictions:</strong><br>
    - Avoid cutting hair/nails, using perfume, hunting, and marital relations.<br>
    - Do not cover your head (men) or face (women), and avoid wearing stitched clothing (men).<br>
    - Avoid arguments, bad language, and harming others.<br>
    - Do not use scented soap or deodorant.<br>
    <br>
    <strong>Spiritual Focus:</strong><br>
    - Recite Talbiyah frequently, reflect on its meaning, and maintain humility and patience.<br>
    - Remember that you are in a sacred state and every action is magnified in reward.<br>
    - Be patient with fellow pilgrims and help those in need.<br>
    <br>
    <strong>Practical Tips:</strong><br>
    - Carry unscented toiletries, keep your Ihram clean, and be mindful of your behavior as you are now in a sacred state.<br>
    - Use a money belt or pouch to keep valuables safe.<br>
    - Stay hydrated and rest when possible.
  `,
              dua: "Labbaik Allahumma Labbaik, Labbaik Laa Shareeka Laka Labbaik...",
              warning: "Ihram restrictions apply: avoid cutting hair/nails, using perfume, or engaging in marital relations.",
              dos: ["Recite Talbiyah often", "Maintain cleanliness", "Make intention with sincerity"],
              donts: ["Break Ihram rules", "Argue or fight"],
            },
            {
              title: "Tawaf al-Qudum (Arrival Tawaf)",
              description: `
    <strong>Spiritual Preparation:</strong><br>
    - Make dua for acceptance and focus on the significance of entering Masjid al-Haram.<br>
    - Reflect on the honor of being in the holiest mosque and the footsteps of the Prophets.<br>
    - Prepare your heart for humility and awe before Allah.<br>
    <br>
    <strong>Practical & Social Preparation:</strong><br>
    - Ensure you are in a state of wudu (ablution) before entering the mosque.<br>
    - Plan your route and meeting points with your group in case you get separated.<br>
    - Be aware of the crowd and keep your belongings secure.<br>
    <br>
    <strong>Logistical Preparation:</strong><br>
    - Know the location of your hotel and the mosque entrances/exits.<br>
    - Carry a small bag for your shoes and valuables.<br>
    - Have a water bottle and light snacks if needed.<br>
    <br>
    <strong>Entering the Mosque:</strong><br>
    - Enter Masjid al-Haram with your right foot, reciting the dua for entering a mosque.<br>
    - Pause and take in the sight of the Kaaba, making dua upon first sight.<br>
    <br>
    <strong>Starting Tawaf:</strong><br>
    - Proceed to the Black Stone (Hajar al-Aswad), face it, and if possible, kiss or touch it. If not, point towards it and say “Bismillah, Allahu Akbar.”<br>
    - Be patient and do not push or harm others to reach the Black Stone.<br>
    <br>
    <strong>Performing Tawaf:</strong><br>
    - Circle the Kaaba seven times counterclockwise, starting and ending at the Black Stone.<br>
    - Men should perform the first three circuits briskly (raml) if possible.<br>
    - Stay close to your group and be mindful of the elderly and children.<br>
    <br>
    <strong>Supplications:</strong><br>
    - There are no fixed supplications; recite dhikr, Qur’an, or personal prayers.<br>
    - Between the Yemeni Corner and the Black Stone, recite:<br>
    <em>Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina 'adhaban-nar.</em><br>
    - Make dua for yourself, your family, and the Ummah.<br>
    <br>
    <strong>After Tawaf:</strong><br>
    - Pray two rak’ahs behind Maqam Ibrahim (or anywhere in the mosque if crowded).<br>
    - Drink Zamzam water and make dua for your needs.<br>
    - Rest and reflect on the blessing of completing Tawaf.<br>
    <br>
    <strong>Etiquette:</strong><br>
    - Be patient, avoid pushing, and help others if possible.<br>
    - Lower your voice and maintain a respectful demeanor.<br>
    - Focus on the spiritual significance of being in the holiest mosque.<br>
    <br>
    <strong>Practical Tips:</strong><br>
    - Keep your shoes in a bag and remember where you entered.<br>
    - Stay hydrated and take breaks if needed.<br>
    - If you get lost, ask mosque staff for help.
  `,
              dua: "SubhanAllah, Alhamdulillah, Allahu Akbar (recite any dua from the heart)",
              dos: ["Stay calm in crowds", "Help others if possible", "Pray two rak'ahs after Tawaf", "Drink Zamzam water"],
              donts: ["Push or harm others", "Rush the ritual", "Forget to make dua"],
            },
            {
              title: "Sa'i between Safa and Marwah",
              description: `
    <strong>Spiritual Preparation:</strong><br>
    - Reflect on the story of Hajar and the mercy of Allah.<br>
    - Remind yourself of the importance of perseverance and trust in Allah’s plan.<br>
    - Make dua for steadfastness and acceptance.<br>
    <br>
    <strong>Practical & Social Preparation:</strong><br>
    - Ensure you are hydrated and have comfortable footwear.<br>
    - If you are with a group, agree on a meeting point in case you get separated.<br>
    - Be aware of the elderly, children, and those with special needs.<br>
    <br>
    <strong>Logistical Preparation:</strong><br>
    - Know the starting and ending points (Safa and Marwah).<br>
    - Familiarize yourself with the location of restrooms and water stations.<br>
    - Carry a small bag for your shoes and personal items.<br>
    <br>
    <strong>Starting Sa’i:</strong><br>
    - After Tawaf, proceed to Safa. Face the Kaaba, make dua, and begin Sa’i.<br>
    - Recite the verse: <em>Inna as-Safa wal-Marwah min sha'a'irillah...</em><br>
    <br>
    <strong>The Walk:</strong><br>
    - Walk briskly between the green markers (men only), and walk normally elsewhere.<br>
    - Complete seven circuits between Safa and Marwah, starting at Safa and ending at Marwah.<br>
    - Pause at each end to make dua and reflect.<br>
    <br>
    <strong>Supplications:</strong><br>
    - Recite prayers and duas throughout. At each end (Safa and Marwah), face the Kaaba, raise your hands, and make dua.<br>
    - Use recommended supplications or speak from your heart.<br>
    <br>
    <strong>Etiquette:</strong><br>
    - Be considerate of others, especially the elderly and those with children.<br>
    - Avoid running in crowded areas.<br>
    - Maintain focus and humility.<br>
    <br>
    <strong>Completion:</strong><br>
    - At the end, thank Allah for the opportunity and make dua for acceptance.<br>
    - Rest and hydrate after completing Sa’i.<br>
    <br>
    <strong>Practical Tips:</strong><br>
    - If you feel tired, take a break at the designated rest areas.<br>
    - Keep your group together and help those who need assistance.<br>
    - If you are unsure about any part of the ritual, ask a guide or scholar on site.
  `,
              dua: "Rabbighfir warham innaka antal-Azizul-Akram",
              dos: ["Reflect on Hajar's perseverance", "Recite duas during Sa'i", "Be considerate of others"],
              donts: ["Run in unsafe areas", "Distract others", "Forget to make dua"],
            },
            {
              title: "Standing at Arafat (Wuquf)",
              description: `
    <strong>Spiritual Preparation:</strong><br>
    - Prepare your heart for the most important day of Hajj.<br>
    - Make sincere repentance and seek forgiveness for all past sins.<br>
    - Increase your dhikr and recitation of Qur’an.<br>
    - Make a list of duas for yourself, your family, and the Ummah.<br>
    <br>
    <strong>Practical & Social Preparation:</strong><br>
    - Pack an umbrella, sunscreen, and extra water for the day.<br>
    - Bring a prayer mat and a small cushion or chair if needed.<br>
    - Coordinate with your group for meals and rest times.<br>
    - Know the location of your tent and the boundaries of Arafat.<br>
    <br>
    <strong>Logistical Preparation:</strong><br>
    - Arrive at Arafat before Dhuhr and settle in your designated area.<br>
    - Keep your identification and Hajj permit with you at all times.<br>
    - Familiarize yourself with the location of medical tents and restrooms.<br>
    <br>
    <strong>Timing:</strong><br>
    - On the 9th of Dhul Hijjah, after Dhuhr, gather at the plain of Arafat.<br>
    - Listen to the Hajj sermon if possible.<br>
    <br>
    <strong>What to Do:</strong><br>
    - Stand anywhere within the boundaries of Arafat. Spend the afternoon in prayer, supplication, and reflection.<br>
    - Focus on making heartfelt duas and seeking Allah’s mercy.<br>
    - Avoid unnecessary conversation and distractions.<br>
    <br>
    <strong>Supplications:</strong><br>
    - Make heartfelt duas for yourself, your family, the Ummah, and all your needs. The best dua is:<br>
    <em>La ilaha illallah wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir.</em><br>
    - Recite Qur’an and ask Allah for forgiveness and guidance.<br>
    <br>
    <strong>Spiritual Focus:</strong><br>
    - Seek forgiveness, repent, and renew your commitment to Allah.<br>
    - Many pilgrims are moved to tears by the spiritual intensity of this day.<br>
    - Remember that Arafat is the essence of Hajj; missing it invalidates the pilgrimage.<br>
    <br>
    <strong>Practical Tips:</strong><br>
    - Stay hydrated, use an umbrella for shade, and be patient with the crowds.<br>
    - Take breaks in the shade and avoid standing in the sun for long periods.<br>
    - If you feel unwell, seek help from medical staff immediately.
  `,
              dua: "There is no god but Allah alone, He has no partner...",
              warning: "Missing Arafat invalidates Hajj.",
              dos: ["Pray for yourself and others", "Stay hydrated"],
              donts: ["Leave Arafat before sunset", "Waste time in idle talk"],
            },
            {
              title: "Muzdalifah & Mina",
              description: `
    <strong>Spiritual Preparation:</strong><br>
    - Continue to recite Talbiyah and reflect on the blessings of Hajj.<br>
    - Make dua for a safe journey and acceptance of your efforts.<br>
    - Remember the example of the Prophet (ﷺ) and his patience during Hajj.<br>
    <br>
    <strong>Practical & Social Preparation:</strong><br>
    - Pack a sleeping mat or lightweight blanket for Muzdalifah.<br>
    - Bring snacks, water, and a flashlight for the night.<br>
    - Stay with your group and agree on a meeting point.<br>
    - Be considerate of others who are tired or unwell.<br>
    <br>
    <strong>Logistical Preparation:</strong><br>
    - Collect 49 or 70 small pebbles for the stoning ritual at Mina.<br>
    - Know the route from Arafat to Muzdalifah and then to Mina.<br>
    - Keep your identification and valuables secure.<br>
    <br>
    <strong>After Sunset:</strong><br>
    - Leave Arafat for Muzdalifah calmly, reciting Talbiyah.<br>
    - Pray Maghrib and Isha combined upon arrival.<br>
    <br>
    <strong>At Muzdalifah:</strong><br>
    - Rest under the open sky and spend the night in worship, dhikr, and rest.<br>
    - Collect pebbles for the stoning ritual.<br>
    <br>
    <strong>Supplications:</strong><br>
    - Make dua for forgiveness, safety, and a successful completion of Hajj.<br>
    - Recite Qur’an and reflect on the journey so far.<br>
    <br>
    <strong>Proceed to Mina:</strong><br>
    - After Fajr, head to Mina for the stoning of the Jamarat (pillars).<br>
    - Stay with your group and follow the instructions of the Hajj authorities.<br>
    <br>
    <strong>Stoning the Jamarat:</strong><br>
    - Throw seven pebbles at the largest pillar (Jamrat al-Aqabah) on the 10th, then at all three pillars on the following days.<br>
    - Recite “Allahu Akbar” with each throw.<br>
    - Be patient and avoid pushing in the crowds.<br>
    <br>
    <strong>Sacrifice:</strong><br>
    - Arrange for the sacrifice of an animal (Qurbani) if required.<br>
    - Thank Allah for the opportunity to fulfill this Sunnah.<br>
    <br>
    <strong>Shaving/Trimming Hair:</strong><br>
    - Men should shave or trim their hair; women cut a small portion. This marks partial exit from Ihram.<br>
    - Make dua for renewal and purification.<br>
    <br>
    <strong>Practical Tips:</strong><br>
    - Follow safety instructions, be patient, and help others.<br>
    - Rest when possible and stay hydrated.<br>
    - If you feel overwhelmed, seek help from Hajj staff or volunteers.
  `,
              dua: "Allahumma taqabbal minna (O Allah, accept from us)",
              dos: ["Follow safety instructions", "Be patient in crowds"],
              donts: ["Throw stones at people", "Neglect Sunnah practices"],
            },
            {
              title: "Farewell Tawaf (Tawaf al-Wada)",
              description: `
    <strong>Spiritual Preparation:</strong><br>
    - Reflect on the completion of your Hajj and the blessings you have received.<br>
    - Make dua for acceptance and forgiveness of any shortcomings.<br>
    - Express gratitude to Allah for allowing you to complete the pilgrimage.<br>
    <br>
    <strong>Practical & Social Preparation:</strong><br>
    - Pack your belongings and ensure nothing is left behind.<br>
    - Inform your group or family of your departure plans.<br>
    - Settle any outstanding matters at your accommodation.<br>
    <br>
    <strong>Logistical Preparation:</strong><br>
    - Confirm your travel arrangements and keep your documents ready.<br>
    - Plan your route to the airport or next destination.<br>
    - Allow enough time for the Farewell Tawaf and travel to your departure point.<br>
    <br>
    <strong>Before Departure:</strong><br>
    - Before leaving Makkah, perform a final Tawaf around the Kaaba.<br>
    - Make sure all your group members are present.<br>
    <br>
    <strong>Supplications:</strong><br>
    - Make dua for acceptance, forgiveness, and a safe return home.<br>
    - Ask Allah to grant you the opportunity to return for Hajj or Umrah.<br>
    <br>
    <strong>Etiquette:</strong><br>
    - Do not delay your departure after this Tawaf. It is a farewell to the Sacred House.<br>
    - Maintain humility and gratitude as you leave.<br>
    <br>
    <strong>Practical Tips:</strong><br>
    - Ensure you have all your belongings, and help fellow pilgrims if needed.<br>
    - Take a moment to reflect on your journey and the lessons learned.<br>
    - Stay in touch with your group and travel safely.
  `,
              dua: "O Allah, accept my Hajj and forgive my shortcomings.",
              dos: ["Express gratitude", "Pray for a safe journey home"],
              donts: ["Delay departure unnecessarily", "Forget to make dua"],
            },
          ],
          references: [
            { title: "Official Saudi Hajj Portal (Nusuk)", url: "https://hajj.nusuk.sa/" },
            { title: "CBHUK: Hajj 2025 Guidance", url: "https://cbhuk.org/news/hajj/hajj-2025-guidance-for-british-pilgrims-nusuk-hajj/" },
            { title: "Hajj At A Glance (Rituals Chart)", url: "https://www.hajjataglance.com/" },
          ],
          faq: [
            {
              question: "Can I perform Hajj on behalf of someone else?",
              answer: "Yes, you may perform Hajj on behalf of someone who is deceased or physically unable, provided you have completed your own obligatory Hajj first."
            },
            {
              question: "What if I miss a ritual or make a mistake?",
              answer: "Consult a qualified scholar or Hajj guide immediately. Some mistakes can be rectified with a sacrifice or fidya, while others may require repeating the ritual."
            },
            {
              question: "Is it necessary to travel with a group?",
              answer: "While not obligatory, traveling with a reputable group is highly recommended for safety, logistics, and guidance."
            },
            {
              question: "Can women perform Hajj without a mahram?",
              answer: "Regulations may vary by country and year. Traditionally, a mahram is required, but some authorities allow women in safe, organized groups. Check current Saudi regulations."
            }
          ],
          commonMistakes: [
            "Not clarifying intention (niyyah) before rituals.",
            "Breaking Ihram rules (using perfume, cutting hair/nails, etc.).",
            "Pushing or being impatient in crowds during Tawaf or Sa'i.",
            "Missing the day of Arafat or leaving before sunset.",
            "Throwing stones at the wrong pillars or at people instead of the Jamarat.",
            "Neglecting to make dua or reflect spiritually during the rites.",
            "Delaying the Farewell Tawaf unnecessarily.",
            "Not seeking help or clarification when unsure about a ritual."
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
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
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
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
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
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
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
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
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
                <em>Reference: <a href='https://www.islamicfinder.org/knowledge/umrah-guide/' target='_blank'>IslamicFinder Umrah Guide</a></em>
              `,
              dua: "Allahumma taqabbal minni (O Allah, accept from me)",
              dos: ["Thank Allah for the opportunity", "Pray for acceptance", "Reflect on the experience"],
              donts: ["Forget to make dua", "Leave before completing all rites"],
            },
          ],
          references: [
            { title: "Official Saudi Umrah Portal (Nusuk)", url: "https://www.nusuk.sa/" },
            { title: "CBHUK: Umrah Guide", url: "https://cbhuk.org/hajj-umrah-guide/umrah-guide/" },
            { title: "Hajj At A Glance (Umrah)", url: "https://www.hajjataglance.com/" },
          ],
          faq: [
            {
              question: "Can I perform Umrah at any time of the year?",
              answer: "Yes, Umrah can be performed at any time except during the days of Hajj."
            },
            {
              question: "Is Ihram required for Umrah?",
              answer: "Yes, entering the state of Ihram at the Miqat is mandatory for Umrah."
            },
            {
              question: "Can women perform Umrah alone?",
              answer: "Regulations may vary. Traditionally, a mahram is required, but some authorities allow women in safe, organized groups. Check current Saudi regulations."
            },
            {
              question: "What if I make a mistake during Umrah?",
              answer: "Consult a qualified scholar or Umrah guide. Many mistakes can be rectified with a sacrifice or fidya."
            }
          ],
          commonMistakes: [
            "Not making intention (niyyah) clearly at Miqat.",
            "Breaking Ihram rules (using perfume, cutting hair/nails, etc.).",
            "Pushing or being impatient in crowds during Tawaf or Sa'i.",
            "Not performing the required number of Tawaf or Sa'i circuits.",
            "Neglecting to make dua or reflect spiritually during the rites.",
            "Leaving before shaving/trimming hair (Tahallul).",
            "Not seeking help or clarification when unsure about a ritual."
          ]
        }
      }),
      readTime: 0,
      listeningTime: 0,
      wordCount: 0,
      map: null,
      markers: [],
      routeLine: null,
      animatedRoute: null,
      ritualLocations: {},
      isMapVisible: true
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
    // Defer map initialization until container is visible (improves initial render)
    const el = document.getElementById('ritual-map');
    if (el && 'IntersectionObserver' in window) {
      const once = (entries, obs) => {
        if (entries.some(e => e.isIntersecting)) {
          this.initMap();
          obs.disconnect();
        }
      };
      const obs = new IntersectionObserver(once, { root: null, threshold: 0.1 });
      obs.observe(el);
    } else {
      // Fallback: init immediately
      this.initMap();
    }
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.stopSpeech);
    window.removeEventListener('visibilitychange', this.handleTabChange);
    this.stopSpeech();
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    stripHtml(html) {
      if (!html) return '';
      const div = document.createElement('div');
      div.innerHTML = html;
      return (div.textContent || div.innerText || '').trim();
    },
    onTablistKeydown(e) {
      const order = ['hajj','umrah'];
      const idx = order.indexOf(this.currentTab);
      if (e.key === 'ArrowRight') {
        const next = order[(idx + 1) % order.length];
        this.switchTab(next);
        this.$nextTick(() => this.focusTab(next));
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        const prev = order[(idx - 1 + order.length) % order.length];
        this.switchTab(prev);
        this.$nextTick(() => this.focusTab(prev));
        e.preventDefault();
      } else if (e.key === 'Home') {
        this.switchTab(order[0]);
        this.$nextTick(() => this.focusTab(order[0]));
        e.preventDefault();
      } else if (e.key === 'End') {
        this.switchTab(order[order.length - 1]);
        this.$nextTick(() => this.focusTab(order[order.length - 1]));
        e.preventDefault();
      }
    },
    focusTab(tab) {
      const refName = tab === 'hajj' ? 'tabHajj' : 'tabUmrah';
      const el = this.$refs[refName];
      if (el && typeof el.focus === 'function') el.focus();
    },
    openMap() {
      this.isMapVisible = true;
    },
    closeMap() {
      this.isMapVisible = false;
    },
    switchTab(tab) {
      if (this.currentTab === tab) return;
      this.currentTab = tab;
      this.stopSpeech();
      this.settingsOpen = false;
      this.$nextTick(() => {
        this.calculateReadTimeAndWordCount();
        this.updateMapRoute();
      });
    },
    async toggleSpeech() {
      if (!this.isSpeechAvailable) {
        alert("Text-to-speech is not supported in this browser.");
        return;
      }
      const { title, summary, steps } = this.currentContent;
      const text = `${title || ''} ${summary || ''} ${(steps || []).map(s => s.title + ' ' + this.stripHtml(s.description)).join(' ')}`.trim();
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
        ...(this.currentContent.steps || []).map(s => s.title + '\n' + this.stripHtml(s.description))
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
        ...(this.currentContent.steps || []).map(s => s.title + ' ' + this.stripHtml(s.description))
      ].filter(Boolean).join(" ");
      this.wordCount = text.trim().split(/\s+/).filter(Boolean).length;
      this.readTime = Math.ceil(this.wordCount / 200);
      this.listeningTime = Math.ceil(this.wordCount / 150);
    },
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
      console.log('Settings toggled:', this.settingsOpen);
    },
    printGuide() {
      window.print();
    },
    async initMap() {
      // Ritual locations (approximate lat/lng)
      this.ritualLocations = {
        hajj: [
          { name: 'Kaaba', coords: [21.4225, 39.8262] },
          { name: 'Safa', coords: [21.4227, 39.8270] },
          { name: 'Marwah', coords: [21.4231, 39.8280] },
          { name: 'Mina', coords: [21.4147, 39.8945] },
          { name: 'Arafat', coords: [21.3556, 39.9833] },
          { name: 'Muzdalifah', coords: [21.3667, 39.9400] },
        ],
        umrah: [
          { name: 'Kaaba', coords: [21.4225, 39.8262] },
          { name: 'Safa', coords: [21.4227, 39.8270] },
          { name: 'Marwah', coords: [21.4231, 39.8280] },
        ]
      };
      // Lazy-load Leaflet only when needed to keep main bundle lean
      const L = (await import('leaflet')).default;
      this.leaflet = L;
      // Also ensure default marker assets are set up
      try {
        const markerIcon2x = (await import('leaflet/dist/images/marker-icon-2x.png')).default;
        const markerIcon = (await import('leaflet/dist/images/marker-icon.png')).default;
        const markerShadow = (await import('leaflet/dist/images/marker-shadow.png')).default;
        L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });
      } catch (e) {
        // Silent fallback if assets fail to resolve
      }
      // Inject Leaflet CSS if not present
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
        document.head.appendChild(link);
      }

      this.map = L.map('ritual-map', {
        center: [21.4225, 39.8262],
        zoom: 13,
        scrollWheelZoom: false,
        zoomControl: false,
        attributionControl: false
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(this.map);
      this.updateMapRoute();
    },
    updateMapRoute() {
      if (!this.map) return;
      // Remove previous markers and polylines
      if (this.markers) {
        this.markers.forEach(m => this.map.removeLayer(m));
      }
      if (this.routeLine) {
        this.map.removeLayer(this.routeLine);
      }
      if (this.animatedRoute) {
        this.map.removeLayer(this.animatedRoute);
      }
      const locations = this.ritualLocations[this.currentTab];
      const L = this.leaflet;
      this.markers = locations.map(loc => {
        return L.marker(loc.coords, { title: loc.name }).addTo(this.map).bindPopup(`<b>${loc.name}</b>`);
      });
      // Draw route with shadow/glow; animate unless user prefers reduced motion
      this.routeLine = L.polyline(locations.map(l => l.coords), { color: '#00bfa6', weight: 7, opacity: 0.5 }).addTo(this.map);
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        this.animatedRoute = L.polyline([], { color: '#009688', weight: 4, opacity: 0.9 }).addTo(this.map);
        const coords = locations.map(l => l.coords);
        let i = 0;
        let last = 0;
        const stepMs = 120;
        const animate = (ts) => {
          if (!last) last = ts;
          const delta = ts - last;
          if (delta >= stepMs) {
            last = ts;
            i++;
            this.animatedRoute.setLatLngs(coords.slice(0, i));
          }
          if (i <= coords.length) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
      // Fit map to route
      this.map.fitBounds(this.routeLine.getBounds(), { padding: [30, 30] });
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
  transition: all 0.2s cubic-bezier(.4, 2, .3, 1);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 191, 166, 0.06);
}

.custom-tab:hover {
  background-color: #d1ecea;
  color: #009688;
  box-shadow: 0 2px 8px rgba(0, 191, 166, 0.10);
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

.guide-description {
  font-size: 1.1rem;
  max-width: 900px;
  line-height: 1.6;
}

.guide-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(38, 41, 46, 0.15);
  border: none;
  padding: 2.4rem 1.6rem 2.2rem;
  margin-bottom: 2.4rem;
}

.info-row {
  gap: 1.1rem !important;
  margin-bottom: 2.2rem !important;
  flex-wrap: wrap !important;
  justify-content: center;
}

.info-badge {
  background: none;
  color: #666;
  font-size: 1.01rem;
  font-weight: 400;
  border-radius: 0.4rem;
  padding: 0.28rem 1.1rem 0.28rem 0.8rem;
  display: flex;
  align-items: center;
  min-width: 0;
  justify-content: center;
  border: none;
  box-shadow: none;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 0.2rem;
}

.info-badge i {
  font-size: 1.01em;
  margin-right: 0.3em;
  color: #b0b0b0;
}

.map-panel {
  height: clamp(280px, 40vw, 360px);
  border-radius: 24px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 20px 40px rgba(38, 41, 46, 0.12);
}

.ritual-map-frame {
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: 2px solid rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

@media (max-width: 600px) {
  .info-row {
    gap: 0.2rem !important;
    margin-bottom: 1.1rem !important;
    flex-wrap: wrap !important;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .info-badge {
    font-size: 0.95rem;
    padding: 0.13rem 0.5rem 0.13rem 0.3rem;
    margin-right: 0.18rem;
    margin-left: 0.18rem;
    margin-bottom: 0.15rem;
    white-space: nowrap;
  }

  .guide-card {
    padding: 1.1rem 0.5rem 1.2rem 0.5rem;
    margin-bottom: 1.2rem;
  }

  .section-title {
    margin-top: 1.2rem;
    margin-bottom: 0.7rem;
    padding-bottom: 0.1rem;
  }

  section {
    margin-top: 1.1rem;
    margin-bottom: 1.1rem;
  }

  .accordion-item {
    margin-bottom: 0.7rem;
  }

  .accordion-body {
    padding: 0.8rem 0.3rem 0.7rem 0.3rem;
  }

  .alert-info,
  .alert-warning,
  .alert-primary,
  .alert-danger,
  .alert-success {
    padding: 0.7rem 0.6rem;
    margin-bottom: 0.7rem;
  }

  .ms-2 {
    margin-left: 0.5rem !important;
  }

  section .list-unstyled {
    gap: 0.5rem 0.7rem;
  }
}

.section-title {
  font-size: 1.22rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.5px;
  margin-top: 2.5rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #f2f2f2;
}

.section-title i {
  /* Improve icon contrast on light background */
  color: #666;
}

section {
  margin-top: 2.2rem;
  margin-bottom: 2.2rem;
}

.accordion-item {
  border-radius: 1rem !important;
  margin-bottom: 1.2rem;
  border: none !important;
  box-shadow: none;
  background: #fff;
}

.accordion-button {
  border-radius: 1rem !important;
  font-size: 1.08rem;
  font-weight: 600;
  background: #f9f9fa;
  color: #222;
  transition: background 0.2s, color 0.2s;
  border: none;
  box-shadow: none;
  padding: 1.2rem 1.3rem 1.2rem 1.3rem;
}

.accordion-button:not(.collapsed) {
  background: #f1f7f6;
  color: #00bfa6;
}

.accordion-body {
  font-size: 1.04rem;
  background: #fff;
  border-radius: 0.8rem;
  padding: 1.3rem 1.2rem 1.2rem 1.2rem;
  border-top: 1px solid #f0f0f0;
  box-shadow: none;
  margin-bottom: 0.2rem;
}

.alert-info,
.alert-warning,
.alert-primary,
.alert-danger,
.alert-success {
  font-size: 1.01rem;
  border-radius: 0.8rem;
  box-shadow: none;
  border: none;
  margin-bottom: 1.2rem;
  padding: 1.2rem 1.3rem;
}

ul.list-unstyled {
  padding-left: 0;
  margin-bottom: 0.5rem;
}

ul.list-unstyled li {
  margin-bottom: 0.8rem;
  line-height: 1.7;
}

/* FAQ and Common Mistakes spacing */
.accordion#hajj-faq,
.accordion#umrah-faq {
  margin-bottom: 1.7rem;
}

.ms-2 {
  margin-left: 1.2rem !important;
}

/* Reference links horizontal gap */
section .list-unstyled {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 2.2rem;
}

section .list-unstyled li {
  margin-bottom: 0.2rem;
  margin-right: 0;
}

.text-custom {
  color: #00bfa6;
}

.clean-tabs {
  gap: 1.2rem;
  margin-bottom: 2.2rem !important;
  margin-top: 0.7rem;
}

.clean-tab-btn {
  background: none;
  border: none;
  border-radius: 0;
  color: #555;
  font-size: 1.01rem;
  font-weight: 500;
  padding: 0.45rem 0.7rem 0.25rem 0.7rem;
  margin-bottom: -2px;
  border-bottom: 1.5px solid transparent;
  transition: color 0.18s, border-bottom 0.18s;
  min-width: 80px;
  letter-spacing: 0.01em;
}

.clean-tab-btn.active,
.clean-tab-btn:focus {
  color: #00bfa6;
  border-bottom: 1.5px solid #00bfa6;
  background: none;
  font-weight: 600;
}

.clean-tab-btn:hover {
  color: #009688;
  background: none;
  border-bottom: 1.5px solid #b2dfdb;
}

@media (max-width: 600px) {
  .clean-tabs {
    gap: 0.5rem;
    margin-bottom: 1.2rem !important;
    margin-top: 0.3rem;
  }

  .clean-tab-btn {
    font-size: 0.97rem;
    padding: 0.35rem 0.5rem 0.18rem 0.5rem;
    min-width: 60px;
  }
}

/* Visually hidden but focusable skip link for accessibility */
.skip-link {
  position: absolute;
  left: -999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 10000;
  background: #fff;
  color: #00bfa6;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  outline: none;
  transition: left 0.2s;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
  width: auto;
  height: auto;
  outline: 2px solid #00bfa6;
  box-shadow: 0 2px 8px rgba(0, 191, 166, 0.10);
}

.alert-floating {
  border-radius: 20px;
  background: rgba(223, 250, 241, 0.95);
  color: #0d6657;
  box-shadow: 0 18px 44px rgba(38, 41, 46, 0.18);
  width: min(90vw, 450px);
  animation: premiumFloatUp 0.5s ease;
}

.alert-floating .btn-close {
  filter: brightness(0.8);
}

@media print {
  body * {
    visibility: hidden !important;
    box-shadow: none !important;
    background: #fff !important;
    color: #222 !important;
  }

  #main-content,
  #main-content * {
    visibility: visible !important;
    color: #222 !important;
    background: #fff !important;
    box-shadow: none !important;
  }

  .no-print,
  .no-print * {
    display: none !important;
  }

  .guide-card {
    box-shadow: none !important;
    border: none !important;
    background: #fff !important;
    color: #222 !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .section-title {
    border-bottom: 1px solid #eee !important;
    margin-top: 2rem !important;
    margin-bottom: 1rem !important;
    color: #111 !important;
  }

  .accordion-item,
  .accordion-button,
  .accordion-body,
  .alert,
  .info-badge {
    background: #fff !important;
    color: #222 !important;
    box-shadow: none !important;
    border: none !important;
  }

  .alert {
    padding: 0.7rem 1rem !important;
    margin-bottom: 0.7rem !important;
  }

  .info-row,
  .clean-tabs,
  .skip-link,
  .alert-dismissible,
  .position-fixed {
    display: none !important;
  }

  a {
    color: #222 !important;
    text-decoration: underline !important;
  }

  @page {
    margin: 1.5cm;
  }
}
</style>

<style>

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
