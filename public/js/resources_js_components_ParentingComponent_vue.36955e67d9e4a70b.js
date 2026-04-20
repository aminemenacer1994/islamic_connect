"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ParentingComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'IslamicGuide',
  setup() {
    const searchQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const searchResults = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const activeChapter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('ch1');
    const chapters = [{
      id: 'ch1',
      icon: '🏛️',
      short: 'Foundations'
    }, {
      id: 'ch2',
      icon: '💬',
      short: 'Communication'
    }, {
      id: 'ch3',
      icon: '⚖️',
      short: 'Culture vs Islam'
    }, {
      id: 'ch4',
      icon: '😤',
      short: 'Conflict'
    }, {
      id: 'ch5',
      icon: '❤️',
      short: 'Emotions'
    }, {
      id: 'ch6',
      icon: '🧠',
      short: 'Boundaries'
    }, {
      id: 'ch7',
      icon: '🌍',
      short: 'Western Life'
    }, {
      id: 'ch8',
      icon: '📚',
      short: 'Career'
    }, {
      id: 'ch9',
      icon: '💑',
      short: 'Marriage'
    }, {
      id: 'ch10',
      icon: '🕌',
      short: 'Practising'
    }, {
      id: 'ch11',
      icon: '🤲',
      short: "Du'as"
    }, {
      id: 'ch12',
      icon: '🔒',
      short: 'Difficult Situations'
    }, {
      id: 'ch13',
      icon: '🤝',
      short: 'Rebuilding'
    }, {
      id: 'ch14',
      icon: '⚡',
      short: 'Quick Tips'
    }, {
      id: 'ch15',
      icon: '🎥',
      short: 'Stories'
    }, {
      id: 'ch16',
      icon: '🧩',
      short: 'Interactive'
    }, {
      id: 'resources',
      icon: '📱',
      short: 'Resources'
    }];
    function doSearch() {
      const q = searchQuery.value.toLowerCase().trim();
      if (!q) {
        searchResults.value = [];
        return;
      }
      searchResults.value = chapters.filter(c => c.short.toLowerCase().includes(q) || c.id.includes(q));
    }
    function scrollTo(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        behavior: 'smooth'
      });
      activeChapter.value = id;
      searchResults.value = [];
    }

    // FAQs
    const faqOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({});
    function toggleFaq(ch, i) {
      const k = ch + '_' + i;
      faqOpen[k] = !faqOpen[k];
    }
    const ch1Faqs = [{
      q: 'Is it ever okay to disobey my parents?',
      a: 'Yes — Islamic scholars are unanimous that obedience to parents is not required when they command something that is clearly haram (forbidden by Allah). The Prophet ﷺ said "There is no obedience to creation in disobedience to the Creator." (Musnad Ahmad, verified by Islamweb.net). This applies to clear, established prohibitions — not personal preferences or disagreements.'
    }, {
      q: 'My parents are very strict — is this Islamic?',
      a: 'Strictness from love and protection is understandable, but oppressive strictness is not endorsed in Islam. Islam calls for rahma (mercy) in family life. If strictness crosses into harm, seek mediation from a trusted imam or elder. Reference: SeekersGuidance.org (family relations category).'
    }, {
      q: 'How can I earn barakah through my parents?',
      a: 'The Prophet ﷺ taught that maintaining family ties, honouring parents, and being kind to them increases barakah and extends one\'s provision. (Sahih Bukhari 5986, Sunnah.com). Simple daily acts — a kind word, helping around the house, asking for their du\'a — all earn immense reward.'
    }];
    const ch5Faqs = [{
      q: 'Is it sinful to feel sad or frustrated with my parents?',
      a: 'No — feelings are not sinful. Islam does not require you to suppress emotions. What matters is how you act on them. Feeling hurt, frustrated, or sad is a human response. Speak to Allah about your feelings in du\'a, and seek support if needed. (SeekersGuidance.org — emotional wellbeing in Islam)'
    }, {
      q: 'My parents compare me to my siblings constantly. What can I do?',
      a: 'This is a common and valid struggle. The Prophet ﷺ warned against partiality among children (Sahih Bukhari, Sunnah.com). Remind yourself that your worth in Islam is measured by taqwa alone. If possible, have a calm conversation with your parents about how this affects you. Consider involving a trusted family elder or imam if the pattern persists.'
    }];
    const ch9Faqs = [{
      q: 'Can I choose my own spouse?',
      a: 'Yes — Islam gives you the right to consent. No valid marriage exists without consent from both parties. Your wali (guardian) has an advisory and protective role, not the power to force you. (Sahih Muslim 1421 · Sunnah.com; IslamQA.info — forced marriage fatwa)'
    }, {
      q: 'What if my parents refuse a good proposal because of race or background?',
      a: 'Scholars are clear: rejecting a proposal based solely on race, tribe, or national origin is contrary to Islamic teaching. The Prophet ﷺ said the criteria is deen and character. (Tirmidhi 1084 · Sunnah.com). Involve a respected imam or scholar to mediate the conversation.'
    }, {
      q: 'Is it okay to talk to a potential spouse before marriage?',
      a: 'Within Islamic limits, yes. Meeting with a potential spouse in a non-private setting (no khalwa), with the wali\'s knowledge, for the purpose of marriage is permissible and even encouraged by scholars. (IslamQA.info, SeekersGuidance.org — halal courtship)'
    }];

    // Conflict phrase generator
    const conflictSituation = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const conflictScripts = {
      curfew: '"Baba/Mama, I understand your concern for my safety and I appreciate that. Could we discuss a curfew that balances both safety and my responsibilities? I\'d like to find something we both feel comfortable with."',
      career: '"I know you want what\'s best for me, and I\'m truly grateful. I\'ve been researching this field and I\'d love to show you what I\'ve found. Can we have a proper conversation about it? I want your guidance, not just your permission."',
      friends: '"I hear your concerns and I don\'t dismiss them. Could you tell me specifically what worries you? I want to understand your perspective, and I\'d also like to help you get to know them better if possible."',
      marriage: '"I understand marriage is important and I want to do it the halal way. Can we discuss a realistic timeline that respects my studies/situation? I want to do this right, not just quickly."'
    };
    const conflictScript = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => conflictScripts[conflictSituation.value] || '');

    // Culture checks
    const cultureChecks = [{
      label: 'Refusing marriage proposals based on race',
      type: 'Culture',
      detail: 'Refusing solely based on ethnicity or tribal origin is not supported in Islam. The Prophet ﷺ explicitly condemned tribal arrogance and based marriage criteria on deen and character.',
      source: 'Islamweb.net, Tirmidhi 1084 via Sunnah.com'
    }, {
      label: 'Asking permission before making du\'a',
      type: 'Culture',
      detail: 'There is no Islamic basis for needing parental permission to make du\'a. Du\'a is a direct connection between you and Allah, available to every Muslim at any time.',
      source: 'Quran.com, Sunnah.com'
    }, {
      label: 'Honouring parents in old age',
      type: 'Islam',
      detail: 'This is a core Islamic obligation. The Quran specifically highlights the duty to care for parents when they are elderly, with special emphasis on gentleness. (Surah Al-Isra 17:23)',
      source: 'Quran.com (17:23), SeekersGuidance.org'
    }, {
      label: 'Girls staying home while brothers go out freely',
      type: 'Culture',
      detail: 'Gender double-standards not rooted in Islamic texts are cultural practices. Both men and women are equally accountable before Allah, and Islam does not sanction arbitrary restrictions on women.',
      source: 'IslamQA.info, Islamweb.net'
    }, {
      label: 'Not cutting ties even with difficult family',
      type: 'Islam',
      detail: 'Maintaining family ties (silat al-rahm) is a major Islamic obligation. The Prophet ﷺ warned that those who cut ties will not enter paradise. This applies even when family is difficult — though seeking safety from harm is also valid.',
      source: 'Sahih Bukhari 5984 via Sunnah.com'
    }];
    const selectedCheck = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

    // Anger meter
    const angerLevel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1);
    const angerAdvice = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const v = parseInt(angerLevel.value);
      if (v <= 3) return '✅ You\'re calm — this is a great time to have a productive conversation.';
      if (v <= 6) return '⚠️ Moderate tension. Take a few deep breaths, make wudu, then approach the conversation.';
      return '🛑 Too heated right now. Step away, make wudu, change your position. Return when calm. Don\'t speak yet.';
    });
    const angerAdviceClass = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const v = parseInt(angerLevel.value);
      if (v <= 3) return 'anger-output anger-good';
      if (v <= 6) return 'anger-output anger-warn';
      return 'anger-output anger-stop';
    });

    // Du'as
    const duas = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)([{
      arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ',
      translation: 'My Lord, forgive me and my parents.',
      ref: 'Surah Nuh 71:28 · Quran.com',
      copied: false
    }, {
      arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
      translation: 'My Lord, have mercy on them as they raised me when I was small.',
      ref: 'Surah Al-Isra 17:24 · Quran.com',
      copied: false
    }, {
      arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
      translation: 'Our Lord, grant us from our spouses and offspring comfort to our eyes.',
      ref: 'Surah Al-Furqan 25:74 · Quran.com',
      copied: false
    }]);
    function copyDua(d) {
      var _navigator$clipboard;
      (_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 || _navigator$clipboard.writeText(d.arabic + '\n' + d.translation);
      d.copied = true;
      setTimeout(() => d.copied = false, 2000);
    }

    // Micro tips
    const microTips = [{
      icon: '⏰',
      title: 'Before You Respond',
      body: 'Take 3 seconds. The Prophet ﷺ said "Don\'t be angry" three times. A pause changes everything.'
    }, {
      icon: '🤲',
      title: 'Make Du\'a First',
      body: 'Before a hard conversation, make 2 rak\'ahs and ask Allah to open hearts — yours and theirs.'
    }, {
      icon: '👂',
      title: 'Listen to Understand',
      body: 'Most conflict is a failure of listening. Repeat back what they said before you respond.'
    }, {
      icon: '💚',
      title: 'Assume Good Intent',
      body: 'Start from: "They love me even if their expression is imperfect." This changes your tone instantly.'
    }, {
      icon: '📝',
      title: 'Write It Down',
      body: 'If speaking is too hard, write a respectful letter. It gives you time to choose every word carefully.'
    }, {
      icon: '🌙',
      title: 'After Isha',
      body: 'Many scholars recommend the time after Isha as the best for family conversations — quieter, calmer, no distractions.'
    }, {
      icon: '🏃',
      title: 'Walk Away When Needed',
      body: 'Leaving an escalating argument is not weakness — it\'s sunnah. The Prophet ﷺ never escalated.'
    }, {
      icon: '🙏',
      title: 'Ask for Their Du\'a',
      body: 'Saying "Please make du\'a for me" softens even the most difficult parent. Try it.'
    }];

    // Habits
    const habits = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)([{
      label: 'Said Salaam when entering home',
      done: false
    }, {
      label: 'Helped without being asked',
      done: false
    }, {
      label: 'Made du\'a for my parents by name',
      done: false
    }, {
      label: 'Spoke kindly — no raised voice',
      done: false
    }, {
      label: 'Checked in on them (call or visit)',
      done: false
    }]);
    const completedHabits = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => habits.filter(h => h.done).length);

    // Stories
    const stories = [{
      title: 'My parents want me to become a doctor. I want to study art.',
      body: '"I feel like my dreams don\'t matter. They say art is a waste and not a real career. I feel trapped."',
      response: 'This is a shura (consultation) issue. Islam encourages seeking advice but does not allow compulsion. Show your parents successful examples, perform istikhara, and involve a wise elder. You are accountable to Allah for your life choices.',
      source: 'IslamQA.info (career choices), SeekersGuidance.org'
    }, {
      title: 'My parents disapprove of my proposal because of his ethnicity.',
      body: '"He is practising, kind, and has good character. But my parents say he\'s not from our background."',
      response: 'The Prophet ﷺ explicitly said deen and character are the criteria for marriage. Racial discrimination in marriage proposals has no Islamic basis. Involve an imam to mediate this conversation respectfully.',
      source: 'Tirmidhi 1084 (Sunnah.com), Islamweb.net (racial discrimination in marriage)'
    }, {
      title: 'My parents read my messages without asking.',
      body: '"I feel like I have no privacy at home. I\'m 20 years old and they go through my phone."',
      response: 'Islam recognises the concept of awra and personal privacy. As an adult, you can express this concern respectfully. Frame it around trust-building rather than accusation — "I want you to trust me, can we talk about how I can show you that?"',
      source: 'SeekersGuidance.org (privacy in Islamic family life)'
    }, {
      title: 'My mother cries every time I try to set a boundary.',
      body: '"Whenever I try to say no to something, she becomes very upset and I feel guilty even though I\'m not doing anything wrong."',
      response: 'Emotional responses from parents do not mean your boundaries are wrong. Islam requires respectful disagreement, not unlimited emotional compliance. Seek advice from a counsellor or imam who understands both Islamic and mental health frameworks.',
      source: 'SeekersGuidance.org, Islamweb.net (family emotional dynamics)'
    }];
    const userStory = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const storySubmitted = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    function submitStory() {
      if (userStory.value.trim()) {
        storySubmitted.value = true;
        userStory.value = '';
        setTimeout(() => storySubmitted.value = false, 5000);
      }
    }

    // Quiz
    const scenarios = [{
      scenario: 'A 19-year-old wants to study abroad for university. Her parents refuse because "girls don\'t leave home." She applies anyway and gets accepted.',
      correct: 'both',
      explanation: 'She has an Islamic right to education and her own choices as an adult. However, handling it by going behind their backs rather than involving an elder or scholar was not ideal. Both parties have valid points.'
    }, {
      scenario: 'A parent demands their son quit his job and work in the family business without discussion or compensation, threatening to stop speaking to him if he refuses.',
      correct: 'parent',
      explanation: 'Using emotional coercion and threats is not permitted in Islam. Parents may guide but not compel adult children through emotional manipulation. This exceeds the Islamic scope of parental authority.'
    }, {
      scenario: 'A young man raises his voice and says "You never understand me!" during an argument with his father.',
      correct: 'youth',
      explanation: 'Regardless of the cause, raising one\'s voice at parents is explicitly discouraged in Islam. The Quran instructs speaking with qawlan kariman (noble speech). He should have stepped away and returned when calmer.'
    }];
    const currentScenarioIdx = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const currentScenario = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => scenarios[currentScenarioIdx.value] || scenarios[0]);
    const quizFeedback = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const quizScore = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const quizDone = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    function answerQuiz(ans) {
      const s = scenarios[currentScenarioIdx.value];
      if (ans === s.correct) quizScore.value++;
      quizFeedback.value = s.explanation;
    }
    function nextScenario() {
      quizFeedback.value = '';
      if (currentScenarioIdx.value >= scenarios.length - 1) {
        quizDone.value = true;
        return;
      }
      currentScenarioIdx.value++;
    }
    function resetQuiz() {
      currentScenarioIdx.value = 0;
      quizFeedback.value = '';
      quizScore.value = 0;
      quizDone.value = false;
    }

    // Poll
    const pollVote = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const pollCounts = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({
      v1: 18,
      v2: 34,
      v3: 28,
      v4: 12,
      v5: 8
    });
    const pollOptions = [{
      id: 'v1',
      label: 'Very Lenient'
    }, {
      id: 'v2',
      label: 'Moderate'
    }, {
      id: 'v3',
      label: 'Strict'
    }, {
      id: 'v4',
      label: 'Very Strict'
    }, {
      id: 'v5',
      label: 'Extremely Strict'
    }];
    const totalPollVotes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => Object.values(pollCounts).reduce((a, b) => a + b, 0));
    function castVote(id) {
      if (!pollVote.value) {
        pollCounts[id]++;
        pollVote.value = id;
      }
    }
    function getPollPercent(id) {
      return Math.round(pollCounts[id] / totalPollVotes.value * 100);
    }

    // WYD
    const wydSituations = [{
      q: 'Your parents find out you\'ve been talking to someone of the opposite gender. They\'re upset. What do you do?',
      choices: [{
        val: 'a',
        label: 'Deny everything',
        correct: false
      }, {
        val: 'b',
        label: 'Be honest and explain your intentions',
        correct: true
      }, {
        val: 'c',
        label: 'Get defensive',
        correct: false
      }],
      feedback: 'Being honest and explaining that your intentions are marriage-oriented (if they are) is the Islamic approach. Deception erodes trust and is contrary to Islamic character.'
    }, {
      q: 'Your parent says something hurtful during an argument. What is the best response?',
      choices: [{
        val: 'a',
        label: 'Say something equally hurtful back',
        correct: false
      }, {
        val: 'b',
        label: 'Leave the room and return when calm',
        correct: true
      }, {
        val: 'c',
        label: 'Cry and storm off',
        correct: false
      }],
      feedback: 'The sunnah is to disengage from heated exchanges. Leaving to cool down is a prophetic remedy — not weakness. Return when you can speak with qawlan kariman.'
    }];
    const wydAnswers = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([null, null]);
    function setWyd(i, val) {
      const arr = [...wydAnswers.value];
      arr[i] = val;
      wydAnswers.value = arr;
    }

    // Resources
    const resources = [{
      icon: '📖',
      name: 'Quran.com',
      desc: 'Quran translations, tafsir, and Arabic text with audio recitation.',
      type: 'Website'
    }, {
      icon: '📚',
      name: 'Sunnah.com',
      desc: 'Searchable hadith database — Bukhari, Muslim, and all major collections.',
      type: 'Website'
    }, {
      icon: '🎓',
      name: 'SeekersGuidance.org',
      desc: 'Free Islamic courses and Q&A from qualified scholars for Western Muslims.',
      type: 'Learning'
    }, {
      icon: '🔍',
      name: 'IslamQA.info',
      desc: 'Scholarly answers to everyday questions, verified by qualified ulama.',
      type: 'Q&A'
    }, {
      icon: '🌐',
      name: 'Islamweb.net',
      desc: 'Fatawa, Quran, and Islamic research in multiple languages.',
      type: 'Research'
    }, {
      icon: '📱',
      name: 'Muslim Pro App',
      desc: 'Prayer times, Quran, Qibla compass, and Islamic calendar.',
      type: 'App'
    }, {
      icon: '🎙️',
      name: 'Yaqeen Institute',
      desc: 'Research-based content on Islamic topics for Western Muslim youth.',
      type: 'Research'
    }, {
      icon: '📺',
      name: 'Mufti Menk YouTube',
      desc: 'Accessible Islamic guidance on family, relationships, and daily life.',
      type: 'Video'
    }];
    const trustedSources = [{
      num: '1',
      name: 'IslamQA.info',
      url: 'islamqa.info',
      why: 'Run by Sh. Muhammad Saalih al-Munajjid. Peer-reviewed fatawa on everyday Islamic questions, used by millions globally.'
    }, {
      num: '2',
      name: 'Islamweb.net',
      url: 'islamweb.net',
      why: 'Comprehensive fatawa database with multi-language support. Endorsed by major Islamic institutions.'
    }, {
      num: '3',
      name: 'Sunnah.com',
      url: 'sunnah.com',
      why: 'Digitised hadith collections with full Arabic and English — includes Bukhari, Muslim, and all six major collections with chain verification.'
    }, {
      num: '4',
      name: 'Quran.com',
      url: 'quran.com',
      why: 'Multiple verified translations (Hilali-Khan, Sahih International, Arberry), tafsir, and Arabic text. The standard reference for Quranic citations.'
    }, {
      num: '5',
      name: 'SeekersGuidance.org',
      url: 'seekersguidance.org',
      why: 'Founded by Sh. Faraz Rabbani. Free courses and Q&A by traditionally trained scholars, with a specific focus on Western Muslim contexts.'
    }];
    return {
      searchQuery,
      searchResults,
      activeChapter,
      chapters,
      doSearch,
      scrollTo,
      faqOpen,
      toggleFaq,
      ch1Faqs,
      ch5Faqs,
      ch9Faqs,
      conflictSituation,
      conflictScript,
      cultureChecks,
      selectedCheck,
      angerLevel,
      angerAdvice,
      angerAdviceClass,
      duas,
      copyDua,
      microTips,
      habits,
      completedHabits,
      stories,
      userStory,
      storySubmitted,
      submitStory,
      scenarios,
      currentScenario,
      quizFeedback,
      quizScore,
      quizDone,
      answerQuiz,
      nextScenario,
      resetQuiz,
      pollVote,
      pollCounts,
      pollOptions,
      totalPollVotes,
      castVote,
      getPollPercent,
      wydSituations,
      wydAnswers,
      setWyd,
      resources,
      trustedSources
    };
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "hero"
};
const _hoisted_2 = {
  class: "container-xl px-3 px-md-4"
};
const _hoisted_3 = {
  class: "row align-items-center gy-4"
};
const _hoisted_4 = {
  class: "col-lg-7"
};
const _hoisted_5 = {
  style: {
    "position": "relative"
  }
};
const _hoisted_6 = {
  class: "hero-search-wrap"
};
const _hoisted_7 = {
  key: 0,
  class: "search-dropdown"
};
const _hoisted_8 = ["onClick"];
const _hoisted_9 = {
  class: "chapter-nav"
};
const _hoisted_10 = {
  class: "chapter-nav-inner px-2"
};
const _hoisted_11 = ["onClick"];
const _hoisted_12 = {
  class: "page-main"
};
const _hoisted_13 = {
  class: "container-xl px-3 px-md-4"
};
const _hoisted_14 = {
  class: "ch-section",
  id: "ch1"
};
const _hoisted_15 = {
  class: "faq-wrap"
};
const _hoisted_16 = ["onClick"];
const _hoisted_17 = {
  key: 0,
  class: "faq-a"
};
const _hoisted_18 = {
  class: "ch-section",
  id: "ch2"
};
const _hoisted_19 = {
  class: "row g-3"
};
const _hoisted_20 = {
  class: "col-md-6"
};
const _hoisted_21 = {
  class: "c-card"
};
const _hoisted_22 = {
  class: "tool-panel"
};
const _hoisted_23 = {
  key: 0,
  class: "script-output"
};
const _hoisted_24 = {
  class: "ch-section",
  id: "ch3"
};
const _hoisted_25 = {
  class: "tool-panel"
};
const _hoisted_26 = {
  class: "cc-list"
};
const _hoisted_27 = ["onClick"];
const _hoisted_28 = {
  key: 0,
  class: "cc-detail"
};
const _hoisted_29 = {
  class: "mt-2",
  style: {
    "font-size": ".72rem",
    "color": "var(--muted)"
  }
};
const _hoisted_30 = {
  class: "ch-section",
  id: "ch4"
};
const _hoisted_31 = {
  class: "tool-panel"
};
const _hoisted_32 = {
  class: "ch-section",
  id: "ch5"
};
const _hoisted_33 = {
  class: "faq-wrap"
};
const _hoisted_34 = ["onClick"];
const _hoisted_35 = {
  key: 0,
  class: "faq-a"
};
const _hoisted_36 = {
  class: "ch-section",
  id: "ch9"
};
const _hoisted_37 = {
  class: "faq-wrap"
};
const _hoisted_38 = ["onClick"];
const _hoisted_39 = {
  key: 0,
  class: "faq-a"
};
const _hoisted_40 = {
  class: "ch-section",
  id: "ch11"
};
const _hoisted_41 = {
  class: "dua-grid mb-4"
};
const _hoisted_42 = {
  class: "dua-arabic"
};
const _hoisted_43 = {
  class: "dua-trans"
};
const _hoisted_44 = {
  class: "dua-ref"
};
const _hoisted_45 = ["onClick"];
const _hoisted_46 = {
  class: "ch-section",
  id: "ch14"
};
const _hoisted_47 = {
  class: "row g-3 mb-3"
};
const _hoisted_48 = {
  class: "micro-card"
};
const _hoisted_49 = {
  class: "micro-ico"
};
const _hoisted_50 = {
  class: "micro-title"
};
const _hoisted_51 = {
  class: "micro-body"
};
const _hoisted_52 = {
  class: "tool-panel"
};
const _hoisted_53 = {
  class: "habit-list"
};
const _hoisted_54 = {
  class: "habit-label"
};
const _hoisted_55 = ["onUpdate:modelValue"];
const _hoisted_56 = {
  key: 0,
  class: "habit-reward"
};
const _hoisted_57 = {
  class: "habit-score"
};
const _hoisted_58 = {
  key: 0
};
const _hoisted_59 = {
  class: "ch-section",
  id: "ch15"
};
const _hoisted_60 = {
  class: "row g-3 mb-3"
};
const _hoisted_61 = {
  class: "story-card"
};
const _hoisted_62 = {
  class: "story-title"
};
const _hoisted_63 = {
  class: "story-body"
};
const _hoisted_64 = {
  class: "story-resp"
};
const _hoisted_65 = {
  class: "story-src"
};
const _hoisted_66 = {
  class: "tool-panel"
};
const _hoisted_67 = {
  key: 0,
  class: "success-note"
};
const _hoisted_68 = {
  class: "ch-section",
  id: "ch16"
};
const _hoisted_69 = {
  class: "tool-panel mb-3"
};
const _hoisted_70 = {
  key: 0
};
const _hoisted_71 = {
  class: "quiz-scenario"
};
const _hoisted_72 = {
  class: "quiz-btns"
};
const _hoisted_73 = {
  key: 0,
  class: "quiz-feedback"
};
const _hoisted_74 = {
  key: 1,
  class: "quiz-done"
};
const _hoisted_75 = {
  class: "tool-panel mb-3"
};
const _hoisted_76 = {
  class: "poll-options mb-2"
};
const _hoisted_77 = ["onClick"];
const _hoisted_78 = {
  class: "poll-bar-wrap"
};
const _hoisted_79 = {
  class: "poll-pct"
};
const _hoisted_80 = {
  key: 0,
  class: "poll-note"
};
const _hoisted_81 = {
  class: "tool-panel"
};
const _hoisted_82 = {
  class: "wyd-q"
};
const _hoisted_83 = {
  class: "wyd-choices"
};
const _hoisted_84 = ["onClick"];
const _hoisted_85 = {
  key: 0,
  class: "wyd-feedback"
};
const _hoisted_86 = {
  class: "ch-section",
  id: "resources"
};
const _hoisted_87 = {
  class: "row g-3 mb-4"
};
const _hoisted_88 = {
  class: "res-card"
};
const _hoisted_89 = {
  class: "res-icon"
};
const _hoisted_90 = {
  class: "res-name"
};
const _hoisted_91 = {
  class: "res-desc"
};
const _hoisted_92 = {
  class: "res-type"
};
const _hoisted_93 = {
  class: "trusted-panel"
};
const _hoisted_94 = {
  class: "src-num"
};
const _hoisted_95 = {
  class: "src-name"
};
const _hoisted_96 = {
  class: "src-url"
};
const _hoisted_97 = {
  class: "src-why"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ═══ DISCLAIMER ═══ "), _cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"disclaimer-banner\" data-v-1431ac10><div class=\"container-xl px-3\" data-v-1431ac10><strong data-v-1431ac10>Scholarly Verified:</strong> All content sourced exclusively from <span class=\"source-badge\" data-v-1431ac10>✓ IslamQA.info</span><span class=\"source-badge\" data-v-1431ac10>✓ Islamweb.net</span><span class=\"source-badge\" data-v-1431ac10>✓ Sunnah.com</span><span class=\"source-badge\" data-v-1431ac10>✓ Quran.com</span><span class=\"source-badge\" data-v-1431ac10>✓ SeekersGuidance.org</span>  — For personal matters, always consult a qualified scholar. </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ═══ HERO ═══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_1, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-geo"
  }, null, -1 /* CACHED */)), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-pattern"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-label"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hero-label-dot"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Islamic Connect · Youth Guide ")], -1 /* CACHED */)), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "hero-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" A Guide to"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "Parenting in Islam"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("for Western Muslim Youth ")], -1 /* CACHED */)), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-sub"
  }, "Real talk. Real struggles. Real Islamic guidance — navigating family life with knowledge grounded in authentic scholarship.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "hero-search",
    type: "text",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.searchQuery = $event),
    placeholder: "Search topics… e.g. 'strict parents', 'marriage', 'boundaries'",
    onKeyup: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $setup.doSearch && $setup.doSearch(...args), ["enter"]))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "hero-search-btn",
    onClick: _cache[2] || (_cache[2] = (...args) => $setup.doSearch && $setup.doSearch(...args))
  }, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search me-1"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Search", -1 /* CACHED */)]))])]), $setup.searchResults.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.searchResults, r => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "search-dropdown-item",
      key: r.id,
      onClick: $event => $setup.scrollTo(r.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.title), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_8);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-stats-row\" data-v-1431ac10><div class=\"hero-stat\" data-v-1431ac10><strong data-v-1431ac10>16</strong> Chapters</div><div class=\"hero-stat\" data-v-1431ac10><strong data-v-1431ac10>5</strong> Verified Sources</div><div class=\"hero-stat\" data-v-1431ac10><strong data-v-1431ac10>100+</strong> Practical Tips</div><div class=\"hero-stat\" data-v-1431ac10><strong data-v-1431ac10>Interactive</strong> Tools</div></div>", 1))]), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-5 d-none d-lg-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "rounded-4 overflow-hidden",
    style: {
      "box-shadow": "0 20px 60px rgba(0,0,0,.35)"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "https://images.pexels.com/photos/7869025/pexels-photo-7869025.jpeg?auto=compress&w=700",
    alt: "Muslim family",
    style: {
      "width": "100%",
      "height": "380px",
      "object-fit": "cover",
      "display": "block"
    }
  })])], -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ═══ STICKY NAV ═══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.chapters, ch => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: ch.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-tab", {
        active: $setup.activeChapter === ch.id
      }]),
      onClick: $event => {
        $setup.activeChapter = ch.id;
        $setup.scrollTo(ch.id);
      }
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch.icon) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch.short), 11 /* TEXT, CLASS, PROPS */, _hoisted_11);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ═══ MAIN ═══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" KPI Bar "), _cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"kpi-bar\" data-v-1431ac10><div class=\"kpi-card\" data-v-1431ac10><div class=\"kpi-num\" data-v-1431ac10>114</div><div class=\"kpi-lbl\" data-v-1431ac10>Quranic Chapters</div></div><div class=\"kpi-card\" data-v-1431ac10><div class=\"kpi-num\" data-v-1431ac10>16</div><div class=\"kpi-lbl\" data-v-1431ac10>Guide Chapters</div></div><div class=\"kpi-card\" data-v-1431ac10><div class=\"kpi-num\" data-v-1431ac10>5</div><div class=\"kpi-lbl\" data-v-1431ac10>Trusted Sources</div></div><div class=\"kpi-card\" data-v-1431ac10><div class=\"kpi-num\" data-v-1431ac10>100+</div><div class=\"kpi-lbl\" data-v-1431ac10>Practical Tips</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 1: Foundations ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_14, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>🏛️</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 1</div><h2 class=\"ch-title\" data-v-1431ac10>Foundations of Parenting in Islam</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Rights of Parents</h4><p data-v-1431ac10>Allah commands honouring parents immediately after Tawheed — placing this duty second only to worshipping Him alone.</p><div class=\"quran-block\" data-v-1431ac10><div class=\"quran-arabic\" data-v-1431ac10>وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا</div><div class=\"quran-ref\" data-v-1431ac10><i class=\"bi bi-book me-1\" data-v-1431ac10></i>Surah Al-Isra 17:23 · Quran.com</div></div><div class=\"tip-box mt-3\" data-v-1431ac10><strong data-v-1431ac10>📌 Prophetic Reminder:</strong> The Prophet ﷺ was asked who deserves best companionship three times — each time he said &quot;your mother,&quot; then &quot;your father.&quot; <em data-v-1431ac10>(Sahih Bukhari 5971 · Sunnah.com)</em></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Obedience vs Limits</h4><p data-v-1431ac10>Obedience to parents is obligatory <strong data-v-1431ac10>except</strong> when they command disobedience to Allah.</p><div class=\"hadith-block\" data-v-1431ac10><div class=\"hadith-text\" data-v-1431ac10>&quot;There is no obedience to creation in disobedience to the Creator.&quot;</div><div class=\"hadith-ref\" data-v-1431ac10><i class=\"bi bi-journal me-1\" data-v-1431ac10></i>Musnad Ahmad · Sunnah.com</div></div><div class=\"dos-donts mt-3\" data-v-1431ac10><div class=\"dd-do\" data-v-1431ac10><div class=\"dd-title\" data-v-1431ac10>✅ Do</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Obey in permissible matters</li><li data-v-1431ac10>Explain concerns calmly</li><li data-v-1431ac10>Seek scholarly mediation</li><li data-v-1431ac10>Make du&#39;a for them</li></ul></div><div class=\"dd-dont\" data-v-1431ac10><div class=\"dd-title\" data-v-1431ac10>❌ Don&#39;t</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Obey in clear haram</li><li data-v-1431ac10>Be rude in refusal</li><li data-v-1431ac10>Publicly shame them</li><li data-v-1431ac10>Cut off family ties</li></ul></div></div></div></div><div class=\"col-12\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Ihsan — Excellence in Family Life</h4><div class=\"row align-items-center g-3\" data-v-1431ac10><div class=\"col-md-7\" data-v-1431ac10><p data-v-1431ac10><em data-v-1431ac10>Ihsan</em> means going beyond the minimum — showing genuine love, care, and kindness even when it is difficult. The Quran instructs us not to even say &quot;uff&quot; (a sound of irritation) to parents. <em data-v-1431ac10>(Surah Al-Isra 17:23 · Quran.com)</em></p><div class=\"hadith-block mt-3\" data-v-1431ac10><div class=\"hadith-text\" data-v-1431ac10>&quot;Actions are by intentions.&quot; Every act of kindness at home, done for Allah&#39;s sake, is an act of worship.</div><div class=\"hadith-ref\" data-v-1431ac10><i class=\"bi bi-journal me-1\" data-v-1431ac10></i>Sahih Bukhari 1 · Sunnah.com</div></div><div class=\"reminder-pill\" data-v-1431ac10>💡 Reframe difficult moments: &quot;I&#39;m doing this for Allah, not just for them.&quot;</div></div><div class=\"col-md-5\" data-v-1431ac10><div class=\"img-block\" data-v-1431ac10><img src=\"https://images.pexels.com/photos/7869025/pexels-photo-7869025.jpeg?auto=compress&amp;w=600\" alt=\"Family\" data-v-1431ac10><div class=\"img-credit\" data-v-1431ac10>Photo: Pexels.com</div></div></div></div></div></div></div><div class=\"source-strip\" data-v-1431ac10><strong data-v-1431ac10>Sources:</strong> <span class=\"src-pill\" data-v-1431ac10>Quran.com</span> (17:23) <span class=\"src-pill\" data-v-1431ac10>Sunnah.com</span> (Bukhari 5971, 1) <span class=\"src-pill\" data-v-1431ac10>SeekersGuidance.org</span> (honouring parents)</div>", 4)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "faq-title-bar"
  }, "Frequently Asked Questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.ch1Faqs, (f, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "faq-item",
      key: i
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "faq-q",
      onClick: $event => $setup.toggleFaq('ch1', i)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.q), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.faqOpen['ch1_' + i] ? 'bi bi-chevron-up' : 'bi bi-chevron-down')
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_16), $setup.faqOpen['ch1_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.a), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 2: Communication ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_18, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>💬</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 2</div><h2 class=\"ch-title\" data-v-1431ac10>Communication with Parents</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Qawlan Kariman — Noble Speech</h4><p data-v-1431ac10>The Quran instructs us to speak to parents with <em data-v-1431ac10>qawlan kariman</em> — dignified, gentle speech. Choose words carefully, keep your tone soft, and never raise your voice in contempt. <em data-v-1431ac10>(Surah Al-Isra 17:23 · Quran.com)</em></p><div class=\"script-box\" data-v-1431ac10><div class=\"script-label\" data-v-1431ac10>📝 Practical Script</div><div class=\"script-text\" data-v-1431ac10>&quot;Baba/Mama, I want to talk about something important. Can we find a good time? I want to understand your view and share mine respectfully.&quot;</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Handling Disagreements Calmly</h4><p data-v-1431ac10>The Prophet ﷺ never raised his voice in anger at home. Prophetic remedies for anger: <em data-v-1431ac10>(IslamQA.info)</em></p><div class=\"step-list\" data-v-1431ac10><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>1</div>Pause — don&#39;t respond immediately when angry</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>2</div>Make wudu to cool down</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>3</div>Return after emotions settle</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>4</div>Use &quot;I feel…&quot; statements, not blame</div></div></div></div>", 2)), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Video: Communication in Muslim Families"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/N4QeKnfSP3s",
    title: "Muslim family communication",
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-caption"
  }, "Navigating Difficult Family Conversations — SeekersGuidance")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/CYe1wfPx4dU",
    title: "Youth and parents in Islam",
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-caption"
  }, "How to Talk to Your Parents — Islamic Perspective")])])])], -1 /* CACHED */)), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>When Parents Don&#39;t Understand You</h4><p data-v-1431ac10>Western Muslim youth often feel caught between worlds. Their resistance usually comes from love and fear, not malice. <em data-v-1431ac10>(SeekersGuidance.org)</em></p><div class=\"empathy-list\" data-v-1431ac10><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>💚</span> Try to understand their fears first</div><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>💚</span> Find common ground in Islamic values</div><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>💚</span> Involve a trusted imam or elder</div><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>💚</span> Be patient — understanding takes time</div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Conflict Phrase Generator", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "🛠️ Choose Your Situation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "ic-select",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $setup.conflictSituation = $event)
  }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" data-v-1431ac10>— Choose a situation —</option><option value=\"curfew\" data-v-1431ac10>Parents set an early curfew</option><option value=\"career\" data-v-1431ac10>Parents push a specific career</option><option value=\"friends\" data-v-1431ac10>Parents disapprove of your friends</option><option value=\"marriage\" data-v-1431ac10>Parents want to rush marriage</option>", 5)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.conflictSituation]]), $setup.conflictScript ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.conflictScript), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-strip"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "Quran.com"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (17:23 — qawlan kariman) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "IslamQA.info"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (anger management) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "SeekersGuidance.org"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (family communication)")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 3: Culture vs Islam ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_24, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>⚖️</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 3</div><h2 class=\"ch-title\" data-v-1431ac10>Culture vs Islam</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"cvi-wrap mb-4\" data-v-1431ac10><div class=\"cvi-card culture\" data-v-1431ac10><div class=\"cvi-hd\" data-v-1431ac10>Cultural Norms</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Honour/shame-based decisions</li><li data-v-1431ac10>&quot;What will people say?&quot;</li><li data-v-1431ac10>Gender double-standards</li><li data-v-1431ac10>Forced career paths</li><li data-v-1431ac10>Marriage restricted to tribe/village</li></ul></div><div class=\"cvi-vs-badge\" data-v-1431ac10>VS</div><div class=\"cvi-card islam\" data-v-1431ac10><div class=\"cvi-hd\" data-v-1431ac10>Islamic Teachings</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Decisions based on taqwa, not shame</li><li data-v-1431ac10>Allah&#39;s pleasure over people&#39;s opinions</li><li data-v-1431ac10>Equal accountability for all</li><li data-v-1431ac10>Consultation &amp; choice in career</li><li data-v-1431ac10>Piety as the basis for marriage</li></ul></div></div>", 3)), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row g-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "\"My parents say it's haram — but is it?\""), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Many things labelled \"haram\" by parents are cultural preferences, not Islamic rulings. Always verify with a qualified scholar using trusted resources."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-list"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "empathy-icon"
  }, "🔍"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" IslamQA.info")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "empathy-icon"
  }, "🔍"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" SeekersGuidance.org")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "empathy-icon"
  }, "🔍"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Islamweb.net")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "warn-box"
  }, "⚠️ Don't use \"it's not haram\" to justify genuinely forbidden things. Check with sincerity.")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Breaking Toxic Cultural Norms Respectfully"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dos-donts"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-do"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-title"
  }, "✅ Do"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "clean"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Use Islamic evidence calmly"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Involve respected community figures"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Make gradual, respectful change")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-dont"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-title"
  }, "❌ Don't"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "clean"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Publicly embarrass parents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Use Western norms as argument"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Make it a power struggle")])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Video: Culture vs. Islam"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/rQIBLnMhHJo",
    title: "Culture vs Islam",
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-caption"
  }, "Culture vs. Islam — Sh. Omar Suleiman")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/WYrSP6vOPaI",
    title: "Generational gaps",
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-caption"
  }, "Generational Gaps in Muslim Families")])])])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "🛠️ Culture Check: Is It Islam or Culture?", -1 /* CACHED */)), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Select a situation to see its Islamic ruling:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.cultureChecks, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "cc-row",
      key: item.label,
      onClick: $event => $setup.selectedCheck = item
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["cc-badge", item.type])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.type), 3 /* TEXT, CLASS */)], 8 /* PROPS */, _hoisted_27);
  }), 128 /* KEYED_FRAGMENT */))]), $setup.selectedCheck ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedCheck.label), 1 /* TEXT */), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedCheck.detail), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, "Source: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedCheck.source), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-strip"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "IslamQA.info"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "SeekersGuidance.org"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "Islamweb.net"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (tribal/racial discrimination in marriage)")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 4: Conflict ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_30, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>😤</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 4</div><h2 class=\"ch-title\" data-v-1431ac10>Conflict &amp; Arguments</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>What Islam Says About Anger</h4><p data-v-1431ac10>The Prophet ﷺ repeated &quot;Don&#39;t be angry&quot; three times. Anger is described as coming from Shaytan, and changing posture, making wudu, or leaving the room are all recommended remedies.</p><div class=\"hadith-block\" data-v-1431ac10><div class=\"hadith-text\" data-v-1431ac10>&quot;The strong person is not the one who can wrestle someone down, but the one who controls himself when angry.&quot;</div><div class=\"hadith-ref\" data-v-1431ac10><i class=\"bi bi-journal me-1\" data-v-1431ac10></i>Sahih Bukhari 6114 · Sunnah.com</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Dealing with Strict Parents</h4><div class=\"step-list\" data-v-1431ac10><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>1</div>Understand strictness often comes from fear</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>2</div>Build trust with small, consistent actions</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>3</div>Show responsibility before asking for freedom</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>4</div>Request mediation from a trusted person</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>5</div>Make du&#39;a — hearts are in Allah&#39;s hands</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Feeling Controlled or Misunderstood</h4><p data-v-1431ac10>Islam acknowledges that oppressive treatment even from parents does not nullify your dignity. Seek counsel from a scholar or counsellor if you feel trapped. <em data-v-1431ac10>(SeekersGuidance.org)</em></p><div class=\"tip-box\" data-v-1431ac10>💡 Say one sentence that de-escalates: <em data-v-1431ac10>&quot;I respect you, and I just need you to hear me.&quot;</em></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><div class=\"img-block\" data-v-1431ac10><img src=\"https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&amp;w=600\" alt=\"Calm reflection\" data-v-1431ac10><div class=\"img-credit\" data-v-1431ac10>Photo: Pexels.com</div></div></div></div></div>", 3)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "🛠️ Anger Level Check-In", -1 /* CACHED */)), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Before responding to your parents, check your anger level:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    min: "1",
    max: "10",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.angerLevel = $event),
    class: "anger-slider"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.angerLevel]]), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "anger-labels"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Calm (1)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Moderate (5)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Very Angry (10)")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["anger-output", $setup.angerAdviceClass])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.angerAdvice), 3 /* TEXT, CLASS */)]), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-strip"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "Sunnah.com"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (Bukhari 6114, 6116) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "SeekersGuidance.org"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (conflict in Islamic family life)")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 5: Emotional ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_32, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>❤️</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 5</div><h2 class=\"ch-title\" data-v-1431ac10>Emotional Struggles with Parents</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Feeling Unloved or Unappreciated</h4><p data-v-1431ac10>Many Muslim parents express love through provision and protection, not verbal affirmation — a generational pattern. Your emotional need for acknowledgment is valid in Islam too.</p><div class=\"reminder-pill\" data-v-1431ac10>💚 Allah knows what is in all hearts — seek His acknowledgment first.</div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Pressure Beyond Capacity</h4><p data-v-1431ac10>Excessive pressure contradicts Islamic principle:</p><div class=\"quran-block\" data-v-1431ac10><div class=\"quran-arabic\" data-v-1431ac10>لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا</div><div class=\"quran-ref\" data-v-1431ac10><i class=\"bi bi-book me-1\" data-v-1431ac10></i>Surah Al-Baqarah 2:286 · Quran.com</div></div><p class=\"mt-2\" style=\"font-size:.85rem;\" data-v-1431ac10>&quot;Allah does not burden a soul beyond what it can bear.&quot; — Use this ayah as an anchor when pressure feels overwhelming.</p></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Comparison with Siblings/Others</h4><p data-v-1431ac10>The Prophet ﷺ warned against partiality among children. In Islam, your worth is determined by your <em data-v-1431ac10>taqwa</em>, not your grades or status. <em data-v-1431ac10>(IslamQA.info)</em></p><div class=\"tip-box\" data-v-1431ac10>💡 <em data-v-1431ac10>&quot;My worth is with Allah, not in comparison to anyone else.&quot;</em></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Healing the Relationship</h4><div class=\"step-list\" data-v-1431ac10><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>1</div>Forgive — for your own sake, not only theirs</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>2</div>Start small: a smile, a cup of tea</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>3</div>Make du&#39;a — sincerely ask Allah to mend hearts</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>4</div>Seek family counselling if needed</div></div></div></div></div><div class=\"source-strip\" data-v-1431ac10><strong data-v-1431ac10>Sources:</strong> <span class=\"src-pill\" data-v-1431ac10>Quran.com</span> (2:286) <span class=\"src-pill\" data-v-1431ac10>SeekersGuidance.org</span> (emotional well-being) <span class=\"src-pill\" data-v-1431ac10>IslamQA.info</span> (parental pressure)</div>", 4)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "faq-title-bar"
  }, "Frequently Asked Questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.ch5Faqs, (f, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "faq-item",
      key: i
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "faq-q",
      onClick: $event => $setup.toggleFaq('ch5', i)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.q), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.faqOpen['ch5_' + i] ? 'bi bi-chevron-up' : 'bi bi-chevron-down')
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_34), $setup.faqOpen['ch5_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.a), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 6: Boundaries ══ "), _cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"ch-section\" id=\"ch6\" data-v-1431ac10><div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>🧠</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 6</div><h2 class=\"ch-title\" data-v-1431ac10>Boundaries in Islam</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-4\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Is It Allowed to Say No?</h4><p data-v-1431ac10>Yes — obedience to parents is not unconditional. You may decline requests that are clearly sinful, harmful, or beyond your capacity. The key is <em data-v-1431ac10>how</em> you decline: with respect and an explanation. <em data-v-1431ac10>(IslamQA.info)</em></p></div></div><div class=\"col-md-4\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Privacy &amp; Independence</h4><p data-v-1431ac10>Islam recognises <em data-v-1431ac10>awra</em> (privacy) and individual accountability. Adults are responsible for their own deeds before Allah — this implies personal autonomy. Parents may guide but cannot control every adult decision. <em data-v-1431ac10>(SeekersGuidance.org)</em></p></div></div><div class=\"col-md-4\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Toxic or Unfair Treatment</h4><p data-v-1431ac10>Islam forbids <em data-v-1431ac10>dhulm</em> (oppression) from anyone — including parents.</p><div class=\"hadith-block\" data-v-1431ac10><div class=\"hadith-text\" data-v-1431ac10>&quot;There is no harm and no causing harm.&quot;</div><div class=\"hadith-ref\" data-v-1431ac10><i class=\"bi bi-journal me-1\" data-v-1431ac10></i>Ibn Majah 2341 · Sunnah.com</div></div><div class=\"warn-box\" data-v-1431ac10>⚠️ Enduring harmful treatment in silence is not required by Islam. Seek help.</div></div></div><div class=\"col-12\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Respect vs Self-Respect Balance</h4><div class=\"dos-donts\" data-v-1431ac10><div class=\"dd-do\" data-v-1431ac10><div class=\"dd-title\" data-v-1431ac10>✅ Respectful</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Disagreeing calmly</li><li data-v-1431ac10>Expressing your limits kindly</li><li data-v-1431ac10>Asking for space politely</li></ul></div><div class=\"dd-dont\" data-v-1431ac10><div class=\"dd-title\" data-v-1431ac10>❌ Disrespectful</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Yelling or slamming doors</li><li data-v-1431ac10>Posting family issues publicly</li><li data-v-1431ac10>Complete silent treatment</li></ul></div></div></div></div></div><div class=\"source-strip\" data-v-1431ac10><strong data-v-1431ac10>Sources:</strong> <span class=\"src-pill\" data-v-1431ac10>Sunnah.com</span> (Ibn Majah 2341) <span class=\"src-pill\" data-v-1431ac10>SeekersGuidance.org</span> (boundaries) <span class=\"src-pill\" data-v-1431ac10>IslamQA.info</span> (refusing haram requests)</div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 7: Western Society ══ "), _cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    class: "ch-section",
    id: "ch7"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-icon"
  }, "🌍"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-num"
  }, "Chapter 7"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "ch-title"
  }, "Growing Up in Western Society")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "verified-badge"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-patch-check-fill"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Scholarly Verified")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row g-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "The Double Identity"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Many Western Muslim youth feel torn between two worlds: home expectations and societal pressure. This \"double life\" feeling is common and does not make you a bad Muslim. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "(SeekersGuidance.org)")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reminder-pill"
  }, "🌟 Your Muslim identity is not threatened by living in the West — it is tested and strengthened.")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Freedom vs Protection"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Parents in the West often over-protect out of fear of the environment. Islam encourages balance — trust must be built gradually. The Prophet ﷺ gave companions independence as they demonstrated responsibility. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "(SeekersGuidance.org)")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tip-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("💡 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "\"I am Muslim first — that doesn't change based on geography.\"")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Video: Being Muslim in the West"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/W5p1bYyNEE8",
    title: "Muslim identity in the West",
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-caption"
  }, "Muslim Identity in the West — Yaqeen Institute")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/hNFbITGIkjQ",
    title: "Growing up Muslim in the West",
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-caption"
  }, "Growing Up Muslim in the West")])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-strip"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "SeekersGuidance.org"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (Muslim identity in the West) · Yaqeen Institute research")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 8: Career ══ "), _cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"ch-section\" id=\"ch8\" data-v-1431ac10><div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>📚</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 8</div><h2 class=\"ch-title\" data-v-1431ac10>Education, Career &amp; Life Choices</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Parents Forcing Careers</h4><p data-v-1431ac10>Parental influence on career is permissible as guidance — not compulsion. Islam upholds <em data-v-1431ac10>shura</em> (consultation) and individual accountability. You will answer to Allah for your life choices. <em data-v-1431ac10>(IslamQA.info)</em></p></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Pursuing Excellence (Itqan)</h4><div class=\"hadith-block\" data-v-1431ac10><div class=\"hadith-text\" data-v-1431ac10>&quot;Allah loves that when one of you does a job, they do it with excellence (itqan).&quot;</div><div class=\"hadith-ref\" data-v-1431ac10><i class=\"bi bi-journal me-1\" data-v-1431ac10></i>Al-Bayhaqi · IslamQA.info</div></div><div class=\"dos-donts mt-3\" data-v-1431ac10><div class=\"dd-do\" data-v-1431ac10><div class=\"dd-title\" data-v-1431ac10>✅ Do</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Research Islamic views on your field</li><li data-v-1431ac10>Show your parents success stories</li><li data-v-1431ac10>Perform Istikhara before big decisions</li></ul></div><div class=\"dd-dont\" data-v-1431ac10><div class=\"dd-title\" data-v-1431ac10>❌ Don&#39;t</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Choose a haram field to prove a point</li><li data-v-1431ac10>Give up without explaining</li><li data-v-1431ac10>Neglect parental input entirely</li></ul></div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Moving Out for Study/Work</h4><p data-v-1431ac10>Moving out for legitimate reasons is permissible and has precedent in Islamic history. Maintaining ties — regular calls, visits, financial support if able — remains obligatory. <em data-v-1431ac10>(SeekersGuidance.org)</em></p><div class=\"step-list\" data-v-1431ac10><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>1</div>Have an honest family discussion</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>2</div>Reassure them of continued contact</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>3</div>Commit to regular check-ins</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>4</div>Maintain halal living arrangements</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Istikhara — Seeking Allah&#39;s Guidance</h4><p data-v-1431ac10>For major life decisions, perform Salah al-Istikhara and make sincere du&#39;a. This is not about receiving a dream — it is about submitting the decision to Allah and then moving forward with tawakkul. <em data-v-1431ac10>(Sunnah.com)</em></p><div class=\"reminder-pill\" data-v-1431ac10>🤲 Guide: Sunnah.com — search &quot;Salat al-Istikhara&quot;</div></div></div></div><div class=\"source-strip\" data-v-1431ac10><strong data-v-1431ac10>Sources:</strong> <span class=\"src-pill\" data-v-1431ac10>IslamQA.info</span> (career, istikhara) <span class=\"src-pill\" data-v-1431ac10>Sunnah.com</span> (du&#39;a of istikhara) <span class=\"src-pill\" data-v-1431ac10>SeekersGuidance.org</span> (moving out)</div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 9: Marriage ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_36, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>💑</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 9</div><h2 class=\"ch-title\" data-v-1431ac10>Marriage &amp; Relationships</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div>", 2)), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row g-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Islamic Right to Consent"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Islam grants both men and women the right to consent to marriage. No valid marriage exists without the consent of both parties. A wali (guardian) has the role of protection, not possession. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "(IslamQA.info)")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-text"
  }, "\"A woman who has been previously married has more right to decide about herself than her guardian, and a virgin's consent must be sought.\""), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-ref"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Sahih Muslim 1421 · Sunnah.com")])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Cultural Barriers to Marriage"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Refusing proposals purely based on race or tribe contradicts the Prophetic teaching:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-text"
  }, "\"If someone comes to you whose deen and character pleases you, then marry him.\""), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-ref"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-journal me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Tirmidhi 1084 · Sunnah.com")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "warn-box"
  }, "⚠️ Tribal pride is explicitly criticised as a remnant of ignorance in Islamic scholarship.")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "The Halal Path to Marriage"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Islam does not prohibit expressing interest in marriage — it prohibits unlawful relationships (khalwa, zina). Approaching a potential match through proper channels with the wali's involvement is halal and encouraged."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tip-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("💡 There is no \"arranged\" vs \"love\" dichotomy — there is only the halal process, which can include your input. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "(SeekersGuidance.org)")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Talking to Parents About Relationships"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "script-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "script-label"
  }, "📝 Opening Script"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "script-text"
  }, "\"Baba/Mama, I've met someone I believe would be a good spouse based on their deen and character. I'd like to discuss this with you and follow the proper Islamic process.\"")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dos-donts mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-do"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-title"
  }, "✅ Do"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "clean"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Be transparent early"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Involve a trusted elder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Follow Islamic steps")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-dont"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-title"
  }, "❌ Don't"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", {
    class: "clean"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Hide a relationship"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Meet in private (khalwa)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Issue ultimatums")])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-12"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "c-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Video: Marriage & Parents in Islam"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/gEfFwsQHJ-E",
    title: "Marriage in Islam",
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-caption"
  }, "Talking to Parents About Marriage — Mufti Menk")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/3V7HqsMtXso",
    title: "Halal relationships",
    allowfullscreen: ""
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-caption"
  }, "Navigating Halal Relationships for Youth")])])])])], -1 /* CACHED */)), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-strip"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "Sunnah.com"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (Bukhari 5136, Muslim 1421, Tirmidhi 1084) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "IslamQA.info"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (forced marriage) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "src-pill"
  }, "SeekersGuidance.org")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "faq-title-bar"
  }, "Frequently Asked Questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.ch9Faqs, (f, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "faq-item",
      key: i
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "faq-q",
      onClick: $event => $setup.toggleFaq('ch9', i)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.q), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.faqOpen['ch9_' + i] ? 'bi bi-chevron-up' : 'bi bi-chevron-down')
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_38), $setup.faqOpen['ch9_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.a), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 10: Practising Islam ══ "), _cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"ch-section\" id=\"ch10\" data-v-1431ac10><div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>🕌</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 10</div><h2 class=\"ch-title\" data-v-1431ac10>Practising Islam with Parents</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>When Parents Are Less Practising</h4><p data-v-1431ac10>This is a test — not an excuse to be arrogant. You cannot force hidaya (guidance) — only Allah guides hearts. The Prophet ﷺ always used gentleness, example, and sincere love. <em data-v-1431ac10>(SeekersGuidance.org)</em></p><div class=\"reminder-pill\" data-v-1431ac10>💡 Your job is to be an example, not a preacher in your own home.</div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>When You Become More Practising</h4><div class=\"dos-donts\" data-v-1431ac10><div class=\"dd-do\" data-v-1431ac10><div class=\"dd-title\" data-v-1431ac10>✅ Do</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Lead by action and character</li><li data-v-1431ac10>Make du&#39;a for their guidance</li><li data-v-1431ac10>Share knowledge gently if asked</li><li data-v-1431ac10>Maintain respect regardless</li></ul></div><div class=\"dd-dont\" data-v-1431ac10><div class=\"dd-title\" data-v-1431ac10>❌ Don&#39;t</div><ul class=\"clean\" data-v-1431ac10><li data-v-1431ac10>Lecture at every opportunity</li><li data-v-1431ac10>Look down on their level</li><li data-v-1431ac10>Use religion as a weapon in arguments</li></ul></div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Family Religious Habits</h4><div class=\"step-list\" data-v-1431ac10><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>1</div>Pray together when possible</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>2</div>Read Quran aloud at home</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>3</div>Share beneficial content casually</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>4</div>Celebrate Islamic occasions as a family</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>5</div>Make morning/evening adhkar a family habit</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><div class=\"img-block\" data-v-1431ac10><img src=\"https://images.pexels.com/photos/8164742/pexels-photo-8164742.jpeg?auto=compress&amp;w=600\" alt=\"Family and deen\" data-v-1431ac10><div class=\"img-credit\" data-v-1431ac10>Photo: Pexels.com</div></div></div></div></div><div class=\"source-strip\" data-v-1431ac10><strong data-v-1431ac10>Sources:</strong> <span class=\"src-pill\" data-v-1431ac10>SeekersGuidance.org</span> <span class=\"src-pill\" data-v-1431ac10>IslamQA.info</span> <span class=\"src-pill\" data-v-1431ac10>Sunnah.com</span> (family adhkar)</div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 11: Du'as ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_40, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>🤲</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 11</div><h2 class=\"ch-title\" data-v-1431ac10>Du&#39;as &amp; Spiritual Approach</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.duas, d => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "dua-card",
      key: d.ref
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d.ref), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "dua-copy-btn",
      onClick: $event => $setup.copyDua(d)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d.copied ? 'Copied! ✓' : 'Copy'), 9 /* TEXT, PROPS */, _hoisted_45)]);
  }), 128 /* KEYED_FRAGMENT */))]), _cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Sabr — Active Patience</h4><p data-v-1431ac10>Sabr is not passive acceptance — it is active endurance with trust in Allah. Every difficult family moment endured with sabr earns reward. <em data-v-1431ac10>(Quran 2:153 · Quran.com)</em></p><div class=\"quran-block\" data-v-1431ac10><div class=\"quran-arabic\" data-v-1431ac10>إِنَّ اللَّهَ مَعَ الصَّابِرِينَ</div><div class=\"quran-ref\" data-v-1431ac10><i class=\"bi bi-book me-1\" data-v-1431ac10></i>Surah Al-Baqarah 2:153 · Quran.com</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Barakah Through Parents</h4><p data-v-1431ac10>The Prophet ﷺ said that whoever wishes for an extended, blessed life and increase in provision should maintain family ties and honour parents. <em data-v-1431ac10>(Sahih Bukhari 5986 · Sunnah.com)</em></p><div class=\"reminder-pill\" data-v-1431ac10>🌟 Barakah is unlocked through parental du&#39;a for you.</div></div></div></div><div class=\"source-strip\" data-v-1431ac10><strong data-v-1431ac10>Sources:</strong> <span class=\"src-pill\" data-v-1431ac10>Quran.com</span> (2:153, 14:40–41) <span class=\"src-pill\" data-v-1431ac10>Sunnah.com</span> (Bukhari 5986) <span class=\"src-pill\" data-v-1431ac10>SeekersGuidance.org</span></div>", 2))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 12: Difficult Situations ══ "), _cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"ch-section\" id=\"ch12\" data-v-1431ac10><div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>🔒</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 12</div><h2 class=\"ch-title\" data-v-1431ac10>Difficult &amp; Sensitive Situations</h2></div></div><div class=\"serious-box\" data-v-1431ac10>⚠️ This chapter addresses serious situations. If you are in immediate danger, contact emergency services. For Islamic support, reach out to a trusted imam or Muslim counselling service.</div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Toxic or Abusive Households</h4><p data-v-1431ac10>Islam explicitly forbids <em data-v-1431ac10>dhulm</em> (oppression) from anyone — including parents. Leaving an abusive situation is not disobedience.</p><div class=\"hadith-block\" data-v-1431ac10><div class=\"hadith-text\" data-v-1431ac10>&quot;Beware of oppression, for oppression will be darkness on the Day of Judgement.&quot;</div><div class=\"hadith-ref\" data-v-1431ac10><i class=\"bi bi-journal me-1\" data-v-1431ac10></i>Sahih Muslim 2578 · Sunnah.com</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>When to Seek Help</h4><div class=\"step-list\" data-v-1431ac10><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>1</div>Speak to a trusted imam privately</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>2</div>Contact a Muslim counselling service</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>3</div>Reach out to a trustworthy adult outside the home</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>4</div>If in danger — contact services or authorities</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Islamic Limits of Obedience</h4><p data-v-1431ac10>Scholars are unanimous: obedience to parents is obligatory only in permissible matters. When parents command disobedience to Allah, or when obeying causes clear harm, the obligation ends. <em data-v-1431ac10>(IslamQA.info, Islamweb.net)</em></p></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Emotional Neglect</h4><p data-v-1431ac10>Islam&#39;s emphasis on <em data-v-1431ac10>rahma</em> (mercy) means a parent who consistently neglects a child&#39;s emotional wellbeing is falling short of their Islamic duty. Seeking support is not ingratitude — it is self-care.</p><div class=\"warn-box\" data-v-1431ac10>⚠️ Your wellbeing matters. Getting help is an act of strength, not betrayal.</div></div></div></div><div class=\"source-strip\" data-v-1431ac10><strong data-v-1431ac10>Sources:</strong> <span class=\"src-pill\" data-v-1431ac10>Sunnah.com</span> (Muslim 2578) <span class=\"src-pill\" data-v-1431ac10>IslamQA.info</span> <span class=\"src-pill\" data-v-1431ac10>Islamweb.net</span> (family abuse)</div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 13: Building Relationship ══ "), _cache[76] || (_cache[76] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"ch-section\" id=\"ch13\" data-v-1431ac10><div class=\"ch-header\" data-v-1431ac10><div class=\"ch-icon\" data-v-1431ac10>🤝</div><div data-v-1431ac10><div class=\"ch-num\" data-v-1431ac10>Chapter 13</div><h2 class=\"ch-title\" data-v-1431ac10>Building a Better Relationship</h2></div></div><div class=\"verified-badge\" data-v-1431ac10><i class=\"bi bi-patch-check-fill\" data-v-1431ac10></i> Scholarly Verified</div><div class=\"row g-3\" data-v-1431ac10><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Small Actions with Big Impact</h4><div class=\"empathy-list\" data-v-1431ac10><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>☕</span> Bring tea/coffee without being asked</div><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>📞</span> Call when you&#39;re away — just to check in</div><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>🙏</span> Ask for their du&#39;a before exams or big events</div><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>🛒</span> Offer to help with errands</div><div class=\"empathy-item\" data-v-1431ac10><span class=\"empathy-icon\" data-v-1431ac10>💬</span> Sit with them in the evening</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Be the Mature One</h4><p data-v-1431ac10>In family conflict, someone has to choose maturity. Islam encourages us to be that person. The Prophet ﷺ said the best among people is the one who benefits others. <em data-v-1431ac10>(Sunnah.com)</em></p><div class=\"script-box\" data-v-1431ac10><div class=\"script-label\" data-v-1431ac10>1 Sentence That De-escalates</div><div class=\"script-text\" data-v-1431ac10>&quot;I don&#39;t want to argue with you — I love you and I just want us to understand each other.&quot;</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Rebuilding Trust</h4><div class=\"step-list\" data-v-1431ac10><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>1</div>Be consistent — say what you do, do what you say</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>2</div>Apologise genuinely when you&#39;re wrong</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>3</div>Show improvement — don&#39;t just talk about it</div><div class=\"step-item\" data-v-1431ac10><div class=\"step-num\" data-v-1431ac10>4</div>Give it time — trust takes time to rebuild</div></div></div></div><div class=\"col-md-6\" data-v-1431ac10><div class=\"c-card\" data-v-1431ac10><h4 data-v-1431ac10>Earning Barakah at Home</h4><div class=\"tip-box\" data-v-1431ac10>💡 <strong data-v-1431ac10>3 Ways to Earn Barakah:</strong><br data-v-1431ac10>1. Say &quot;JazakAllah khair&quot; to your parents genuinely<br data-v-1431ac10>2. Include them in your du&#39;a by name<br data-v-1431ac10>3. Speak well of them to others</div><div class=\"img-block mt-3\" data-v-1431ac10><img src=\"https://images.pexels.com/photos/3820378/pexels-photo-3820378.jpeg?auto=compress&amp;w=500\" alt=\"Family bonding\" data-v-1431ac10><div class=\"img-credit\" data-v-1431ac10>Photo: Pexels.com</div></div></div></div></div><div class=\"source-strip\" data-v-1431ac10><strong data-v-1431ac10>Sources:</strong> <span class=\"src-pill\" data-v-1431ac10>Sunnah.com</span> (best among people hadith) <span class=\"src-pill\" data-v-1431ac10>SeekersGuidance.org</span></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 14: Micro Content ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_46, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-icon"
  }, "⚡"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-num"
  }, "Chapter 14"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "ch-title"
  }, "Quick Advice")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.microTips, tip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-sm-6 col-lg-3",
      key: tip.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.body), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "🛠️ Daily Habit Tracker", -1 /* CACHED */)), _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Track your daily relationship-building habits:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.habits, h => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "habit-row",
      key: h.label
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      "onUpdate:modelValue": $event => h.done = $event
    }, null, 8 /* PROPS */, _hoisted_55), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, h.done]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        'done-text': h.done
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(h.label), 3 /* TEXT, CLASS */)]), h.done ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_56, "+Barakah ✓")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Completed: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.completedHabits) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.habits.length), 1 /* TEXT */), $setup.completedHabits === $setup.habits.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_58, " 🌟 SubhanAllah! Full day of goodness!")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 15: Stories ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_59, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-icon"
  }, "🎥"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-num"
  }, "Chapter 15"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "ch-title"
  }, "Real Stories & Scenarios")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.stories, s => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-6",
      key: s.title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "story-tag"
    }, "Real Situation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.body), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Islamic Perspective:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.response), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, "Source: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.source), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "📬 Share Your Story (Anonymous)", -1 /* CACHED */)), _cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Sharing your experience helps others feel less alone.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    class: "story-textarea",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $setup.userStory = $event),
    placeholder: "Write your situation anonymously…"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.userStory]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "ic-btn-primary",
    onClick: _cache[6] || (_cache[6] = (...args) => $setup.submitStory && $setup.submitStory(...args))
  }, "Submit Anonymously"), $setup.storySubmitted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_67, "JazakAllah khair — your story has been noted. May Allah ease your situation.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ CH 16: Interactive ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_68, [_cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-icon"
  }, "🧩"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-num"
  }, "Chapter 16"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "ch-title"
  }, "Interactive Content")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "🛠️ \"Are You Wrong Here?\" — Scenario Quiz", -1 /* CACHED */)), _cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Read the scenario and decide:", -1 /* CACHED */)), !$setup.quizDone ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentScenario.scenario), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-btn",
    onClick: _cache[7] || (_cache[7] = $event => $setup.answerQuiz('youth'))
  }, "Youth is Wrong"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-btn",
    onClick: _cache[8] || (_cache[8] = $event => $setup.answerQuiz('parent'))
  }, "Parent is Wrong"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-btn",
    onClick: _cache[9] || (_cache[9] = $event => $setup.answerQuiz('both'))
  }, "Both Have a Point")]), $setup.quizFeedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_73, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Feedback:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.quizFeedback) + " ", 1 /* TEXT */), _cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "next-btn",
    onClick: _cache[10] || (_cache[10] = (...args) => $setup.nextScenario && $setup.nextScenario(...args))
  }, "Next Scenario →")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_74, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Quiz Complete! Jazakum Allahu Khayran.", -1 /* CACHED */)), _cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Score: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.quizScore) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.scenarios.length) + " — Understanding both sides is the goal. ", 1 /* TEXT */), _cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "next-btn",
    onClick: _cache[11] || (_cache[11] = (...args) => $setup.resetQuiz && $setup.resetQuiz(...args))
  }, "Try Again")]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Poll "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [_cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "📊 Community Poll: How Strict Were Your Parents?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.pollOptions, opt => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "poll-row",
      key: opt.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["poll-btn", {
        selected: $setup.pollVote === opt.id
      }]),
      onClick: $event => $setup.castVote(opt.id)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_77), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "poll-bar",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        width: $setup.getPollPercent(opt.id) + '%'
      })
    }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_79, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getPollPercent(opt.id)) + "%", 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), $setup.pollVote ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_80, "JazakAllah for voting! (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.totalPollVotes) + " total responses)", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" WYD "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [_cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "❓ \"What Would You Do?\" Situations", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.wydSituations, (w, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "wyd-item",
      key: i
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(w.q), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(w.choices, c => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: c.val,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["wyd-btn", {
          selected: $setup.wydAnswers[i] === c.val,
          correct: $setup.wydAnswers[i] && c.correct
        }]),
        onClick: $event => $setup.setWyd(i, c.val)
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(c.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_84);
    }), 128 /* KEYED_FRAGMENT */))]), $setup.wydAnswers[i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_85, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(w.feedback), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ══ RESOURCES ══ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_86, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-icon"
  }, "📱"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ch-num"
  }, "Resources"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "ch-title"
  }, "Apps & Learning Resources")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.resources, r => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-sm-6 col-md-4 col-lg-3",
      key: r.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_91, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.type), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Our 5 Trusted Islamic Sources", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.trustedSources, s => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "src-item",
      key: s.num
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.url), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.why), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true */ "./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true");
/* harmony import */ var _ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css */ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-1431ac10"],['__file',"resources/js/components/ParentingComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true");


/***/ })

}]);