"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_UmrahComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
      guides: (0,vue__WEBPACK_IMPORTED_MODULE_0__.markRaw)({
        hajj: {
          title: "Hajj Guide",
          summary: "Hajj is the annual pilgrimage to Makkah, required once in a lifetime for those able. It involves a series of sacred rituals over several days, fostering spiritual renewal, unity, and devotion.",
          steps: [{
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
            donts: ["Neglect family responsibilities", "Travel without proper documentation"]
          }, {
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
            donts: ["Break Ihram rules", "Argue or fight"]
          }, {
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
            donts: ["Push or harm others", "Rush the ritual", "Forget to make dua"]
          }, {
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
            donts: ["Run in unsafe areas", "Distract others", "Forget to make dua"]
          }, {
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
            donts: ["Leave Arafat before sunset", "Waste time in idle talk"]
          }, {
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
            donts: ["Throw stones at people", "Neglect Sunnah practices"]
          }, {
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
            donts: ["Delay departure unnecessarily", "Forget to make dua"]
          }],
          references: [{
            title: "Official Saudi Hajj Portal (Nusuk)",
            url: "https://hajj.nusuk.sa/"
          }, {
            title: "CBHUK: Hajj 2025 Guidance",
            url: "https://cbhuk.org/news/hajj/hajj-2025-guidance-for-british-pilgrims-nusuk-hajj/"
          }, {
            title: "Hajj At A Glance (Rituals Chart)",
            url: "https://www.hajjataglance.com/"
          }],
          faq: [{
            question: "Can I perform Hajj on behalf of someone else?",
            answer: "Yes, you may perform Hajj on behalf of someone who is deceased or physically unable, provided you have completed your own obligatory Hajj first."
          }, {
            question: "What if I miss a ritual or make a mistake?",
            answer: "Consult a qualified scholar or Hajj guide immediately. Some mistakes can be rectified with a sacrifice or fidya, while others may require repeating the ritual."
          }, {
            question: "Is it necessary to travel with a group?",
            answer: "While not obligatory, traveling with a reputable group is highly recommended for safety, logistics, and guidance."
          }, {
            question: "Can women perform Hajj without a mahram?",
            answer: "Regulations may vary by country and year. Traditionally, a mahram is required, but some authorities allow women in safe, organized groups. Check current Saudi regulations."
          }],
          commonMistakes: ["Not clarifying intention (niyyah) before rituals.", "Breaking Ihram rules (using perfume, cutting hair/nails, etc.).", "Pushing or being impatient in crowds during Tawaf or Sa'i.", "Missing the day of Arafat or leaving before sunset.", "Throwing stones at the wrong pillars or at people instead of the Jamarat.", "Neglecting to make dua or reflect spiritually during the rites.", "Delaying the Farewell Tawaf unnecessarily.", "Not seeking help or clarification when unsure about a ritual."]
        },
        umrah: {
          title: "Umrah Guide",
          summary: "Umrah is a non-mandatory pilgrimage to Makkah, performed any time of year. It involves Ihram, Tawaf, Sa'i, and shaving or trimming hair, offering spiritual renewal and blessings.",
          steps: [{
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
            donts: ["Neglect spiritual preparation", "Forget travel documents"]
          }, {
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
            donts: ["Break Ihram rules", "Argue or fight"]
          }, {
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
            donts: ["Push or harm others", "Rush the ritual", "Forget to make dua"]
          }, {
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
            donts: ["Run in unsafe areas", "Distract others", "Forget to make dua"]
          }, {
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
            donts: ["Forget to make dua", "Leave before completing all rites"]
          }],
          references: [{
            title: "Official Saudi Umrah Portal (Nusuk)",
            url: "https://www.nusuk.sa/"
          }, {
            title: "CBHUK: Umrah Guide",
            url: "https://cbhuk.org/hajj-umrah-guide/umrah-guide/"
          }, {
            title: "Hajj At A Glance (Umrah)",
            url: "https://www.hajjataglance.com/"
          }],
          faq: [{
            question: "Can I perform Umrah at any time of the year?",
            answer: "Yes, Umrah can be performed at any time except during the days of Hajj."
          }, {
            question: "Is Ihram required for Umrah?",
            answer: "Yes, entering the state of Ihram at the Miqat is mandatory for Umrah."
          }, {
            question: "Can women perform Umrah alone?",
            answer: "Regulations may vary. Traditionally, a mahram is required, but some authorities allow women in safe, organized groups. Check current Saudi regulations."
          }, {
            question: "What if I make a mistake during Umrah?",
            answer: "Consult a qualified scholar or Umrah guide. Many mistakes can be rectified with a sacrifice or fidya."
          }],
          commonMistakes: ["Not making intention (niyyah) clearly at Miqat.", "Breaking Ihram rules (using perfume, cutting hair/nails, etc.).", "Pushing or being impatient in crowds during Tawaf or Sa'i.", "Not performing the required number of Tawaf or Sa'i circuits.", "Neglecting to make dua or reflect spiritually during the rites.", "Leaving before shaving/trimming hair (Tahallul).", "Not seeking help or clarification when unsure about a ritual."]
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
      const obs = new IntersectionObserver(once, {
        root: null,
        threshold: 0.1
      });
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
      const order = ['hajj', 'umrah'];
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
      const {
        title,
        summary,
        steps
      } = this.currentContent;
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
          this.utterance.onerror = event => {
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
      const textToCopy = [this.currentContent.title, this.currentContent.summary, ...(this.currentContent.steps || []).map(s => s.title + '\n' + this.stripHtml(s.description))].filter(Boolean).join("\n\n");
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
      const text = [this.currentContent.title, this.currentContent.summary, ...(this.currentContent.steps || []).map(s => s.title + ' ' + this.stripHtml(s.description))].filter(Boolean).join(" ");
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
        hajj: [{
          name: 'Kaaba',
          coords: [21.4225, 39.8262]
        }, {
          name: 'Safa',
          coords: [21.4227, 39.8270]
        }, {
          name: 'Marwah',
          coords: [21.4231, 39.8280]
        }, {
          name: 'Mina',
          coords: [21.4147, 39.8945]
        }, {
          name: 'Arafat',
          coords: [21.3556, 39.9833]
        }, {
          name: 'Muzdalifah',
          coords: [21.3667, 39.9400]
        }],
        umrah: [{
          name: 'Kaaba',
          coords: [21.4225, 39.8262]
        }, {
          name: 'Safa',
          coords: [21.4227, 39.8270]
        }, {
          name: 'Marwah',
          coords: [21.4231, 39.8280]
        }]
      };
      // Lazy-load Leaflet only when needed to keep main bundle lean
      const L = (await __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.t.bind(__webpack_require__, /*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js", 23))).default;
      this.leaflet = L;
      // Also ensure default marker assets are set up
      try {
        const markerIcon2x = (await __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! leaflet/dist/images/marker-icon-2x.png */ "./node_modules/leaflet/dist/images/marker-icon-2x.png"))).default;
        const markerIcon = (await __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! leaflet/dist/images/marker-icon.png */ "./node_modules/leaflet/dist/images/marker-icon.png"))).default;
        const markerShadow = (await __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! leaflet/dist/images/marker-shadow.png */ "./node_modules/leaflet/dist/images/marker-shadow.png"))).default;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: markerIcon2x,
          iconUrl: markerIcon,
          shadowUrl: markerShadow
        });
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
        maxZoom: 18
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
        return L.marker(loc.coords, {
          title: loc.name
        }).addTo(this.map).bindPopup(`<b>${loc.name}</b>`);
      });
      // Draw route with shadow/glow; animate unless user prefers reduced motion
      this.routeLine = L.polyline(locations.map(l => l.coords), {
        color: '#00bfa6',
        weight: 7,
        opacity: 0.5
      }).addTo(this.map);
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        this.animatedRoute = L.polyline([], {
          color: '#009688',
          weight: 4,
          opacity: 0.9
        }).addTo(this.map);
        const coords = locations.map(l => l.coords);
        let i = 0;
        let last = 0;
        const stepMs = 120;
        const animate = ts => {
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
      this.map.fitBounds(this.routeLine.getBounds(), {
        padding: [30, 30]
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=template&id=2c27c8a7&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=template&id=2c27c8a7&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  role: "main",
  "aria-labelledby": "umrah-title"
};
const _hoisted_2 = {
  class: "container-fluid py-5",
  id: "main-content",
  tabindex: "-1"
};
const _hoisted_3 = {
  class: "text-center mb-5"
};
const _hoisted_4 = {
  class: "nav-item",
  role: "presentation"
};
const _hoisted_5 = ["aria-selected", "tabindex"];
const _hoisted_6 = {
  class: "nav-item",
  role: "presentation"
};
const _hoisted_7 = ["aria-selected", "tabindex"];
const _hoisted_8 = {
  class: "row g-3 g-md-4 align-items-stretch justify-content-center"
};
const _hoisted_9 = {
  class: "col-12 col-md-10 col-lg-8"
};
const _hoisted_10 = ["aria-labelledby", "id"];
const _hoisted_11 = {
  class: "h1 fw-bold text-center mb-3"
};
const _hoisted_12 = {
  class: "mt-3"
};
const _hoisted_13 = {
  class: "accordion mb-3",
  id: "guideSteps",
  role: "region",
  "aria-label": "Step-by-step guide"
};
const _hoisted_14 = ["id"];
const _hoisted_15 = ["data-bs-target", "aria-expanded", "aria-controls", "id", "aria-label"];
const _hoisted_16 = ["id", "aria-labelledby", "aria-label"];
const _hoisted_17 = {
  class: "accordion-body"
};
const _hoisted_18 = ["innerHTML"];
const _hoisted_19 = {
  key: 0,
  class: "alert alert-soft-success rounded-4 shadow-sm mt-2",
  role: "region",
  "aria-label": "Dua"
};
const _hoisted_20 = ["innerHTML"];
const _hoisted_21 = {
  key: 1,
  class: "alert alert-soft-warning rounded-4 shadow-sm mt-2",
  role: "region",
  "aria-label": "Warning"
};
const _hoisted_22 = ["innerHTML"];
const _hoisted_23 = {
  key: 2,
  class: "alert alert-soft-primary rounded-4 shadow-sm mt-2",
  role: "region",
  "aria-label": "Do's"
};
const _hoisted_24 = {
  class: "mb-0"
};
const _hoisted_25 = {
  key: 3,
  class: "alert alert-soft-danger rounded-4 shadow-sm mt-2",
  role: "region",
  "aria-label": "Don'ts"
};
const _hoisted_26 = {
  class: "mb-0"
};
const _hoisted_27 = {
  key: 0,
  class: "mt-4"
};
const _hoisted_28 = ["id"];
const _hoisted_29 = ["id"];
const _hoisted_30 = ["data-bs-target", "aria-controls", "aria-label"];
const _hoisted_31 = ["id", "aria-labelledby", "data-bs-parent", "aria-label"];
const _hoisted_32 = {
  class: "accordion-body"
};
const _hoisted_33 = ["innerHTML"];
const _hoisted_34 = {
  key: 1,
  class: "mt-4"
};
const _hoisted_35 = {
  class: "list-unstyled ms-2"
};
const _hoisted_36 = {
  key: 2,
  class: "mt-3"
};
const _hoisted_37 = {
  class: "list-unstyled"
};
const _hoisted_38 = ["href", "aria-label"];
const _hoisted_39 = {
  key: 0,
  class: "alert alert-success alert-dismissible fs-5 p-4 text-center border-0 position-fixed top-0 start-50 translate-middle-x alert-floating",
  role: "alert",
  "aria-live": "polite"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("main", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Skip to main content link for screen readers and keyboard users "), _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#main-content",
    class: "visually-hidden-focusable skip-link"
  }, "Skip to main content", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    id: "umrah-title",
    class: "display-5 fw-bold mb-4"
  }, " Hajj & Umrah Guides ", -1 /* CACHED */)), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mx-auto description text-muted guide-description"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-info-circle me-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("These guides provide essential knowledge on the rituals, historical background, spiritual significance, logistical steps, and etiquette involved in performing both pilgrimages. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Tabs with ARIA roles and keyboard navigation "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "nav nav-tabs justify-content-center mb-4 clean-tabs",
    role: "tablist",
    "aria-label": "Hajj and Umrah Guides Tabs",
    onKeydown: _cache[4] || (_cache[4] = (...args) => $options.onTablistKeydown && $options.onTablistKeydown(...args)),
    ref: "tablist"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link clean-tab-btn", {
      active: $data.currentTab === 'hajj'
    }]),
    onClick: _cache[0] || (_cache[0] = $event => $options.switchTab('hajj')),
    id: "hajj-tab",
    type: "button",
    role: "tab",
    "aria-controls": "hajj-panel",
    "aria-selected": $data.currentTab === 'hajj' ? 'true' : 'false',
    tabindex: $data.currentTab === 'hajj' ? 0 : -1,
    ref: "tabHajj",
    onKeydown: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => $options.switchTab('hajj'), ["enter", "space"])),
    "aria-label": 'Show Hajj Guide'
  }, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-moon-stars me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Hajj Guides ", -1 /* CACHED */)]))], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_5)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link clean-tab-btn", {
      active: $data.currentTab === 'umrah'
    }]),
    onClick: _cache[2] || (_cache[2] = $event => $options.switchTab('umrah')),
    id: "umrah-tab",
    type: "button",
    role: "tab",
    "aria-controls": "umrah-panel",
    "aria-selected": $data.currentTab === 'umrah' ? 'true' : 'false',
    tabindex: $data.currentTab === 'umrah' ? 0 : -1,
    ref: "tabUmrah",
    onKeydown: _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => $options.switchTab('umrah'), ["enter", "space"])),
    "aria-label": 'Show Umrah Guide'
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-walking me-2",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Umrah Guides ", -1 /* CACHED */)]))], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_7)])], 544 /* NEED_HYDRATION, NEED_PATCH */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Print Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"action-row action-row--spaced action-row--end mb-3 no-print\">\n            <button type=\"button\" @click=\"copyText\" :disabled=\"isCopying\"\n              class=\"premium-action-button premium-action-button--outline\"\n              aria-label=\"Copy the Hajj and Umrah guide content\">\n              <span class=\"action-row__icon\"><i class=\"bi bi-link-45deg\" aria-hidden=\"true\"></i></span>\n              <span class=\"action-row__label\">{{ isCopying ? 'Copying...' : 'Copy Guide' }}</span>\n            </button>\n            <button type=\"button\" @click=\"printGuide\"\n              class=\"premium-action-button premium-action-button--primary\"\n              aria-label=\"Print or save this guide\">\n              <span class=\"action-row__icon\"><i class=\"bi bi-printer\" aria-hidden=\"true\"></i></span>\n              <span class=\"action-row__label\">Print / Save PDF</span>\n            </button>\n          </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("\n            <div class=\"map-panel mb-4\" role=\"region\" aria-label=\"Map showing key ritual locations\">\n              <div id=\"ritual-map\" class=\"ritual-map-frame\"></div>\n            </div>\n          "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "p-3 p-md-4 guide-card shadow-sm rounded-4 border border-2",
    "aria-labelledby": $data.currentTab + '-tab',
    id: $data.currentTab + '-panel',
    role: "tabpanel"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currentContent.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"info-row d-flex flex-wrap justify-content-center gap-2 mb-4\" aria-label=\"Guide info badges\">\n              <span class=\"badge info-badge\"><i class=\"bi bi-book me-1\" aria-hidden=\"true\"></i><strong>Read: </strong> {{ readTime }} min</span>\n              <span class=\"badge info-badge\"><i class=\"bi bi-headphones me-1\" aria-hidden=\"true\"></i><strong>Listen:</strong> {{ listeningTime }} min</span>\n              <span class=\"badge info-badge\"><i class=\"bi bi-file-earmark-word me-1\" aria-hidden=\"true\"></i><strong>Words: </strong> {{ wordCount }}</span>\n            </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_12, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "section-title mb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-list-ol me-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Step-by-Step Guide ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.currentContent.steps, (step, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: "accordion-item rounded-4 mb-2 shadow-sm border border-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "accordion-header",
      id: `heading${idx}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["accordion-button fw-bold fs-6", {
        collapsed: idx !== 0
      }]),
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#collapse${idx}`,
      "aria-expanded": idx === 0 ? 'true' : 'false',
      "aria-controls": `collapse${idx}`,
      id: `step-tab-${idx}`,
      role: "button",
      tabindex: "0",
      "aria-label": 'Expand step: ' + step.title
    }, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check2-circle me-2 text-custom",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_15)], 8 /* PROPS */, _hoisted_14), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: `collapse${idx}`,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["accordion-collapse collapse", {
        show: idx === 0
      }]),
      "aria-labelledby": `heading${idx}`,
      "data-bs-parent": "#guideSteps",
      role: "region",
      "aria-label": 'Step details: ' + step.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "mb-2",
      innerHTML: step.description
    }, null, 8 /* PROPS */, _hoisted_18), step.dua ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-journal-richtext me-2",
      "aria-hidden": "true"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Dua")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      innerHTML: step.dua
    }, null, 8 /* PROPS */, _hoisted_20)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), step.warning ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-exclamation-triangle me-2",
      "aria-hidden": "true"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Warning")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      innerHTML: step.warning
    }, null, 8 /* PROPS */, _hoisted_22)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), step.dos ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-hand-thumbs-up me-2",
      "aria-hidden": "true"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Do's")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(step.dos, (doItem, dIdx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: dIdx
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(doItem), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), step.donts ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-hand-thumbs-down me-2",
      "aria-hidden": "true"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Don'ts")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(step.donts, (dontItem, dIdx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: dIdx
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dontItem), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 10 /* CLASS, PROPS */, _hoisted_16)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Section "), $options.currentContent.faq && $options.currentContent.faq.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_27, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "section-title mb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-question-circle me-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Frequently Asked Questions")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "accordion",
    id: $data.currentTab + '-faq',
    role: "region",
    "aria-label": "Frequently Asked Questions"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.currentContent.faq, (item, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: "accordion-item rounded-4 mb-2 shadow-sm border border-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "accordion-header",
      id: `faq-heading-${$data.currentTab}-${idx}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "accordion-button fw-bold fs-6 collapsed",
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": `#faq-collapse-${$data.currentTab}-${idx}`,
      "aria-expanded": "false",
      "aria-controls": `faq-collapse-${$data.currentTab}-${idx}`,
      "aria-label": 'Expand FAQ: ' + item.question
    }, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-question-lg me-2 text-custom",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.question), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_30)], 8 /* PROPS */, _hoisted_29), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: `faq-collapse-${$data.currentTab}-${idx}`,
      class: "accordion-collapse collapse",
      "aria-labelledby": `faq-heading-${$data.currentTab}-${idx}`,
      "data-bs-parent": `#${$data.currentTab}-faq`,
      role: "region",
      "aria-label": 'FAQ answer: ' + item.question
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      innerHTML: item.answer
    }, null, 8 /* PROPS */, _hoisted_33)])], 8 /* PROPS */, _hoisted_31)]);
  }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_28)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Common Mistakes Section "), $options.currentContent.commonMistakes && $options.currentContent.commonMistakes.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_34, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "section-title mb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-exclamation-diamond me-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Common Mistakes")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_35, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.currentContent.commonMistakes, (mistake, mIdx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: mIdx,
      class: "mb-2 d-flex align-items-start"
    }, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-circle-fill text-danger me-2",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(mistake), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.currentContent.references && $options.currentContent.references.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_36, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "section-title mb-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-link-45deg me-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("References & Further Reading")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_37, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.currentContent.references, (ref, rIdx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: rIdx,
      class: "me-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: ref.url,
      target: "_blank",
      rel: "noopener",
      class: "text-decoration-underline",
      "aria-label": 'Reference: ' + ref.title
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.title), 9 /* TEXT, PROPS */, _hoisted_38)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_10)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade-slow-top"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.copySuccess ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_39, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill me-2",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Success:", -1 /* CACHED */)), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Guide copied to clipboard! ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "btn-close",
      onClick: _cache[5] || (_cache[5] = $event => $data.copySuccess = false),
      "aria-label": "Close"
    })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=style&index=0&id=2c27c8a7&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=style&index=0&id=2c27c8a7&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=style&index=1&id=2c27c8a7&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=style&index=1&id=2c27c8a7&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/UmrahComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/UmrahComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UmrahComponent_vue_vue_type_template_id_2c27c8a7_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UmrahComponent.vue?vue&type=template&id=2c27c8a7&scoped=true */ "./resources/js/components/UmrahComponent.vue?vue&type=template&id=2c27c8a7&scoped=true");
/* harmony import */ var _UmrahComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UmrahComponent.vue?vue&type=script&lang=js */ "./resources/js/components/UmrahComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _UmrahComponent_vue_vue_type_style_index_0_id_2c27c8a7_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UmrahComponent.vue?vue&type=style&index=0&id=2c27c8a7&scoped=true&lang=css */ "./resources/js/components/UmrahComponent.vue?vue&type=style&index=0&id=2c27c8a7&scoped=true&lang=css");
/* harmony import */ var _UmrahComponent_vue_vue_type_style_index_1_id_2c27c8a7_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UmrahComponent.vue?vue&type=style&index=1&id=2c27c8a7&lang=css */ "./resources/js/components/UmrahComponent.vue?vue&type=style&index=1&id=2c27c8a7&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_UmrahComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_UmrahComponent_vue_vue_type_template_id_2c27c8a7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-2c27c8a7"],['__file',"resources/js/components/UmrahComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/UmrahComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/UmrahComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UmrahComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UmrahComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UmrahComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/UmrahComponent.vue?vue&type=style&index=0&id=2c27c8a7&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/UmrahComponent.vue?vue&type=style&index=0&id=2c27c8a7&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UmrahComponent_vue_vue_type_style_index_0_id_2c27c8a7_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UmrahComponent.vue?vue&type=style&index=0&id=2c27c8a7&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=style&index=0&id=2c27c8a7&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/UmrahComponent.vue?vue&type=style&index=1&id=2c27c8a7&lang=css":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/UmrahComponent.vue?vue&type=style&index=1&id=2c27c8a7&lang=css ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UmrahComponent_vue_vue_type_style_index_1_id_2c27c8a7_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UmrahComponent.vue?vue&type=style&index=1&id=2c27c8a7&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=style&index=1&id=2c27c8a7&lang=css");


/***/ }),

/***/ "./resources/js/components/UmrahComponent.vue?vue&type=template&id=2c27c8a7&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/UmrahComponent.vue?vue&type=template&id=2c27c8a7&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UmrahComponent_vue_vue_type_template_id_2c27c8a7_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_UmrahComponent_vue_vue_type_template_id_2c27c8a7_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./UmrahComponent.vue?vue&type=template&id=2c27c8a7&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/UmrahComponent.vue?vue&type=template&id=2c27c8a7&scoped=true");


/***/ })

}]);