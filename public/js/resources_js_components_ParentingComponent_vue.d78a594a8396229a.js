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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'IslamicConnect',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      activeChapter: 'ch1',
      faqOpen: {},
      conflictSituation: '',
      selectedCheck: null,
      angerLevel: 3,
      userStory: '',
      storySubmitted: false,
      pollVote: null,
      pollCounts: {
        relaxed: 5,
        moderate: 12,
        strict: 18,
        veryStrict: 8
      },
      quizIndex: 0,
      quizFeedback: '',
      quizScore: 0,
      quizDone: false,
      wydAnswers: [null, null, null],
      duas: [{
        arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ',
        translation: 'My Lord, forgive me and my parents.',
        ref: 'Quran 71:28 | Quran.com',
        copied: false
      }, {
        arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
        translation: 'My Lord, have mercy on them as they raised me when I was small.',
        ref: 'Quran 17:24 | Quran.com',
        copied: false
      }, {
        arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
        translation: 'Our Lord, grant us from our spouses and offspring comfort to our eyes.',
        ref: 'Quran 25:74 | Quran.com',
        copied: false
      }],
      habits: [{
        label: 'Made du\'a for parents after Salah',
        done: false
      }, {
        label: 'Said something kind to a family member',
        done: false
      }, {
        label: 'Helped without being asked',
        done: false
      }, {
        label: 'Controlled my temper in a difficult moment',
        done: false
      }, {
        label: 'Made istighfar for family conflicts',
        done: false
      }],
      microTips: [{
        icon: '😤',
        title: 'When Your Parents Are Angry',
        body: 'Go quiet. Don\'t respond immediately. Let them finish. Then calmly say: "I hear you, can we talk about this when things are calm?"'
      }, {
        icon: '🔥',
        title: '1 Sentence That De-escalates',
        body: '"I don\'t want to argue — I want us to understand each other." This works almost every time.'
      }, {
        icon: '🚫',
        title: 'Never Say This',
        body: '"You don\'t understand anything." — This shuts down any chance of real communication instantly.'
      }, {
        icon: '✨',
        title: '3 Ways to Earn Barakah at Home',
        body: '1. Smile first. 2. Do something helpful unprompted. 3. Make du\'a for them by name.'
      }, {
        icon: '📵',
        title: 'Phone-Free Family Time',
        body: 'Put your phone away during family meals/gatherings. This single act can transform your relationship.'
      }, {
        icon: '🤲',
        title: 'Morning Du\'a for Peace at Home',
        body: 'Start each day with du\'a for Allah to put love and harmony in your home.'
      }],
      stories: [{
        title: '"My parents don\'t understand me…"',
        body: 'A 19-year-old university student feels her parents see her through a cultural lens, not who she really is. She loves her deen but feels suffocated at home.',
        response: 'This is not unusual. Cultural blind spots are real. The Islamic approach is to seek understanding through compassion and proper channels — not conflict. Dua and patience are real tools here.',
        source: 'Composite — SeekersGuidance.org community questions'
      }, {
        title: '"I want to move out but feel guilty"',
        body: 'A 22-year-old male wants to move out for his career but feels he\'s abandoning his family duty. He can\'t afford a clear head at home.',
        response: 'Moving out for legitimate reasons is permissible in Islam. The obligation is to maintain ties and support — not physical proximity. Communicate your plan clearly and reassure your family.',
        source: 'IslamQA.info — question on moving out'
      }, {
        title: '"They won\'t let me marry who I choose"',
        body: 'A Muslim woman wants to marry a practising man from a different background. Her parents refuse due to cultural reasons.',
        response: 'This is a well-documented issue in fiqh. Cultural-only refusal of a suitable, practising match contradicts the Sunnah. A scholar or Muslim mediator can help in this case.',
        source: 'Sunnah.com (Tirmidhi 1084), IslamQA.info'
      }],
      pollOptions: [{
        id: 'relaxed',
        label: 'Very Relaxed'
      }, {
        id: 'moderate',
        label: 'Moderate'
      }, {
        id: 'strict',
        label: 'Strict'
      }, {
        id: 'veryStrict',
        label: 'Very Strict'
      }],
      scenarios: [{
        scenario: 'A 17-year-old wants to attend a mixed-gender school trip. Their parents refuse because "it\'s haram." Islamic schools allow mixed academic environments. Who is right?',
        correct: 'both',
        feedback: 'Both have a point. Parents\' caution is valid, but labelling all mixed educational settings as haram is not an established Islamic ruling. A conversation with a scholar would help.'
      }, {
        scenario: 'A parent shouts and uses hurtful language at their 20-year-old child whenever they express an opinion. The child responds by going silent for weeks.',
        correct: 'both',
        feedback: 'The parent\'s behaviour contradicts Islamic adab. The child\'s extended silence (sulking) also needs addressing. Both need reflection. Seek mediation.'
      }, {
        scenario: 'A 23-year-old is told they must marry their cousin. They refuse. Their parents say they are disobeying Allah.',
        correct: 'parent',
        feedback: 'The parents are wrong here. Forced marriage is haram in Islam. There is no Islamic obligation to marry a cousin. The child has the right to refuse.'
      }],
      wydSituations: [{
        q: 'Your parent says something hurtful in anger. What do you do?',
        choices: [{
          val: 'A',
          label: 'Argue back immediately',
          correct: false
        }, {
          val: 'B',
          label: 'Go quiet and address it later calmly',
          correct: true
        }, {
          val: 'C',
          label: 'Leave and don\'t speak for days',
          correct: false
        }],
        feedback: 'Option B is the prophetic approach. Address hurt feelings, but when emotions are calm — not in the heat of the moment.'
      }, {
        q: 'Your parents forbid you from attending a halal Islamic event because they\'re worried. What do you do?',
        choices: [{
          val: 'A',
          label: 'Go anyway without telling them',
          correct: false
        }, {
          val: 'B',
          label: 'Share details about the event and ask again',
          correct: true
        }, {
          val: 'C',
          label: 'Give up and never try',
          correct: false
        }],
        feedback: 'Option B — provide them with information to ease their worry. Build trust gradually.'
      }, {
        q: 'You disagree with your parents on a non-religious matter. What is your Islamic right?',
        choices: [{
          val: 'A',
          label: 'Obey regardless — no discussion allowed',
          correct: false
        }, {
          val: 'B',
          label: 'Disagree respectfully and express your view',
          correct: true
        }, {
          val: 'C',
          label: 'Ignore them and do what you want',
          correct: false
        }],
        feedback: 'Option B — shura (consultation) is encouraged in Islam. You have the right to express yourself respectfully.'
      }],
      resources: [{
        icon: '📖',
        name: 'Quran.com',
        desc: 'Read and search the Quran in Arabic with translations and tafsir.',
        type: 'Website & App'
      }, {
        icon: '📚',
        name: 'Sunnah.com',
        desc: 'Browse authenticated hadiths from the major collections.',
        type: 'Website'
      }, {
        icon: '🎓',
        name: 'SeekersGuidance.org',
        desc: 'Free online Islamic courses and Q&A with verified scholars.',
        type: 'Website & Courses'
      }, {
        icon: '❓',
        name: 'IslamQA.info',
        desc: 'Thousands of verified Q&As from Sh. Muhammad al-Munajjid.',
        type: 'Q&A Website'
      }, {
        icon: '💬',
        name: 'Islamweb.net',
        desc: 'Fatwa centre, prayer times, and Islamic resources.',
        type: 'Website'
      }, {
        icon: '📿',
        name: 'Muslim Pro',
        desc: 'Prayer times, Quran, dhikr counter, and qibla direction.',
        type: 'Mobile App'
      }, {
        icon: '🌙',
        name: 'Athan App',
        desc: 'Adhan alerts, Quran, and daily Islamic reminders.',
        type: 'Mobile App'
      }, {
        icon: '🎙️',
        name: 'Yaqeen Institute Podcast',
        desc: 'Research-based Islamic content for Western Muslim youth.',
        type: 'Podcast'
      }],
      trustedSources: [{
        num: '01',
        name: 'Quran.com',
        url: 'quran.com',
        why: 'The most widely used Quran platform globally with multiple translations and tafsir.'
      }, {
        num: '02',
        name: 'Sunnah.com',
        url: 'sunnah.com',
        why: 'Direct access to authenticated hadith collections (Bukhari, Muslim, Abu Dawud, etc.).'
      }, {
        num: '03',
        name: 'SeekersGuidance.org',
        url: 'seekersguidance.org',
        why: 'Verified scholars, free courses, Q&A — widely trusted by Western Muslim communities.'
      }, {
        num: '04',
        name: 'IslamQA.info',
        url: 'islamqa.info',
        why: 'One of the largest fatwa databases, reviewed by Sheikh Muhammad al-Munajjid.'
      }, {
        num: '05',
        name: 'Islamweb.net',
        url: 'islamweb.net',
        why: 'Scholarly fatwa centre from Qatar with broad coverage of family and youth issues.'
      }],
      chapters: [{
        id: 'ch1',
        icon: '🏛️',
        shortTitle: 'Foundations',
        title: 'Foundations of Parenting in Islam'
      }, {
        id: 'ch2',
        icon: '💬',
        shortTitle: 'Communication',
        title: 'Communication with Parents'
      }, {
        id: 'ch3',
        icon: '⚖️',
        shortTitle: 'Culture vs Islam',
        title: 'Culture vs Islam'
      }, {
        id: 'ch4',
        icon: '😤',
        shortTitle: 'Conflict',
        title: 'Conflict & Arguments'
      }, {
        id: 'ch5',
        icon: '❤️',
        shortTitle: 'Emotions',
        title: 'Emotional Struggles'
      }, {
        id: 'ch6',
        icon: '🧠',
        shortTitle: 'Boundaries',
        title: 'Boundaries in Islam'
      }, {
        id: 'ch7',
        icon: '🌍',
        shortTitle: 'Western Life',
        title: 'Growing Up in the West'
      }, {
        id: 'ch8',
        icon: '📚',
        shortTitle: 'Career',
        title: 'Education & Career'
      }, {
        id: 'ch9',
        icon: '💑',
        shortTitle: 'Marriage',
        title: 'Marriage & Relationships'
      }, {
        id: 'ch10',
        icon: '🕌',
        shortTitle: 'Deen',
        title: 'Practising Islam'
      }, {
        id: 'ch11',
        icon: '🤲',
        shortTitle: 'Duas',
        title: 'Duas & Spirituality'
      }, {
        id: 'ch12',
        icon: '🔒',
        shortTitle: 'Serious Issues',
        title: 'Difficult Situations'
      }, {
        id: 'ch13',
        icon: '🤝',
        shortTitle: 'Relationship',
        title: 'Building Better Bonds'
      }, {
        id: 'ch14',
        icon: '⚡',
        shortTitle: 'Quick Tips',
        title: 'Quick Advice'
      }, {
        id: 'ch15',
        icon: '🎥',
        shortTitle: 'Stories',
        title: 'Real Stories'
      }, {
        id: 'ch16',
        icon: '🧩',
        shortTitle: 'Interactive',
        title: 'Interactive'
      }],
      cultureChecks: [{
        label: 'Marrying only from same country/tribe',
        type: 'Culture',
        detail: 'Islam permits marriage to any suitable Muslim regardless of ethnicity or origin. Tribal exclusivity has no Islamic basis.',
        source: 'Islamweb.net — discrimination in marriage'
      }, {
        label: 'Hijab for girls only, no modesty standard for boys',
        type: 'Culture',
        detail: 'Islam commands modesty (ghadd al-basar) for both men and women. The double standard is cultural, not Islamic.',
        source: 'IslamQA.info — modesty in Islam'
      }, {
        label: 'Women cannot work outside the home',
        type: 'Mixed',
        detail: 'Islam permits women to work in halal environments. Khadijah (RA) was a businesswoman. Cultural restrictions vary but are not universal Islamic rulings.',
        source: 'SeekersGuidance.org'
      }, {
        label: 'Praying 5 times a day',
        type: 'Islam',
        detail: 'This is a clear Islamic obligation (fard) — not culture. The five daily prayers are one of the five pillars of Islam.',
        source: 'Quran.com — Surah Al-Baqarah 2:43'
      }, {
        label: 'Not allowed to have any friends of opposite gender',
        type: 'Mixed',
        detail: 'Islam prohibits khalwa (seclusion) and illicit relationships. However, professional/academic interaction with modesty and boundaries is generally permitted.',
        source: 'IslamQA.info — mixed interaction'
      }],
      ch1Faqs: [{
        q: 'Does honouring parents mean doing everything they say?',
        a: 'No. Obedience to parents is obligatory in permissible matters but not in what contradicts Islamic law or causes you clear harm. The scholars are unanimous on this.'
      }, {
        q: 'What if my parents are not Muslim?',
        a: 'You still owe them kindness, respect, and good companionship in all permissible matters. The Quran mentions this in Surah Luqman (31:15). You do not obey them in shirk, but you maintain the relationship with love.'
      }, {
        q: 'Can I disagree with my parents?',
        a: 'Yes, respectfully. Islam encourages shura (consultation) and does not require you to suppress your opinion. The manner of disagreement matters greatly.'
      }],
      ch5Faqs: [{
        q: 'Is it normal to feel emotionally disconnected from my parents?',
        a: 'Yes — many youth experience this, especially across cultural and generational gaps. It does not make you a bad Muslim. Seek to understand them while also setting healthy limits.'
      }, {
        q: 'My parents compare me to my siblings constantly. What can I do?',
        a: 'Communicate how it affects you using "I feel" language. If it continues, a trusted family member or counsellor may help mediate.'
      }],
      ch9Faqs: [{
        q: 'Can my parents force me to marry someone?',
        a: 'No. Forced marriage is haram in Islam. Both parties must consent for the marriage to be valid. A wali\'s role is protective, not coercive.'
      }, {
        q: 'Is it haram to talk to a potential spouse?',
        a: 'Supervised, purposeful interaction to assess suitability for marriage is permitted. Khalwa (seclusion), inappropriate communication, and romantic relationships before marriage are not.'
      }, {
        q: 'My parents refuse all proposals. What do I do?',
        a: 'Seek the help of a trusted imam or family elder. If your wali is unjustly preventing a valid marriage, a judge or imam may step in as wali in some madhabs. Consult a local scholar.'
      }],
      conflictScripts: {
        curfew: '"Baba/Mama, I understand your concern about my safety. Can we discuss a curfew that works for both of us? I want you to feel comfortable while also being able to participate in normal activities."',
        career: '"I hear your vision for me, and I respect it. Can I show you some research about the path I\'m passionate about? I want to find something we both feel good about."',
        friends: '"I understand you have concerns. Would you be willing to meet my friends so you can see who they actually are? I value your opinion and want you to have all the information."',
        marriage: '"I know this is sensitive. Can we sit down and talk about what qualities you\'d want in my future spouse? I want your blessing and your guidance in this process."'
      },
      quizAnswerKey: ['both', 'both', 'parent']
    };
  },
  computed: {
    completedHabits() {
      return this.habits.filter(h => h.done).length;
    },
    totalPollVotes() {
      return Object.values(this.pollCounts).reduce((a, b) => a + b, 0);
    },
    angerAdvice() {
      const lvl = parseInt(this.angerLevel);
      if (lvl <= 3) return '✅ Good level — you can have a productive conversation now.';
      if (lvl <= 6) return '⚠️ Moderate — take 5 deep breaths before responding.';
      return '🛑 Too angry — make wudu, change your position, and wait before speaking.';
    },
    angerAdviceClass() {
      const lvl = parseInt(this.angerLevel);
      if (lvl <= 3) return 'advice-good';
      if (lvl <= 6) return 'advice-warn';
      return 'advice-stop';
    },
    conflictScript() {
      return this.conflictScripts[this.conflictSituation] || '';
    },
    currentScenario() {
      return this.scenarios[this.quizIndex] || this.scenarios[0];
    }
  },
  methods: {
    doSearch() {
      const q = this.searchQuery.toLowerCase();
      if (!q) {
        this.searchResults = [];
        return;
      }
      this.searchResults = this.chapters.filter(ch => ch.title.toLowerCase().includes(q) || ch.shortTitle.toLowerCase().includes(q)).slice(0, 6);
    },
    scrollToChapter(id) {
      this.activeChapter = id;
      this.searchResults = [];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    },
    toggleFaq(ch, i) {
      const key = ch + '_' + i;
      this.$set(this.faqOpen, key, !this.faqOpen[key]);
    },
    copyDua(dua) {
      navigator.clipboard.writeText(dua.arabic + '\n' + dua.translation);
      dua.copied = true;
      setTimeout(() => {
        dua.copied = false;
      }, 2000);
    },
    castVote(id) {
      if (!this.pollVote) {
        this.pollVote = id;
        this.$set(this.pollCounts, id, this.pollCounts[id] + 1);
      }
    },
    getPollPercent(id) {
      const total = this.totalPollVotes;
      if (!total) return 0;
      return Math.round(this.pollCounts[id] / total * 100);
    },
    answerQuiz(answer) {
      const correct = this.quizAnswerKey[this.quizIndex];
      if (answer === correct) {
        this.quizScore++;
        this.quizFeedback = '✅ Correct! ' + this.currentScenario.feedback;
      } else {
        this.quizFeedback = '🤔 Not quite. ' + this.currentScenario.feedback;
      }
    },
    nextScenario() {
      this.quizFeedback = '';
      if (this.quizIndex < this.scenarios.length - 1) {
        this.quizIndex++;
      } else {
        this.quizDone = true;
      }
    },
    resetQuiz() {
      this.quizIndex = 0;
      this.quizFeedback = '';
      this.quizScore = 0;
      this.quizDone = false;
    },
    submitStory() {
      if (this.userStory.trim().length > 10) {
        this.storySubmitted = true;
        this.userStory = '';
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "islamic-connect-app"
};
const _hoisted_2 = {
  class: "hero-section"
};
const _hoisted_3 = {
  class: "container hero-content"
};
const _hoisted_4 = {
  class: "hero-search-wrap"
};
const _hoisted_5 = {
  key: 0,
  class: "search-results-dropdown"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  class: "result-icon"
};
const _hoisted_8 = {
  class: "chapter-nav sticky-nav"
};
const _hoisted_9 = {
  class: "container nav-inner"
};
const _hoisted_10 = ["onClick"];
const _hoisted_11 = {
  class: "nav-label"
};
const _hoisted_12 = {
  class: "container main-content"
};
const _hoisted_13 = {
  class: "chapter-section",
  id: "ch1"
};
const _hoisted_14 = {
  class: "faq-section"
};
const _hoisted_15 = {
  class: "faq-item"
};
const _hoisted_16 = ["onClick"];
const _hoisted_17 = {
  class: "faq-arrow"
};
const _hoisted_18 = {
  key: 0,
  class: "faq-answer"
};
const _hoisted_19 = {
  class: "chapter-section",
  id: "ch2"
};
const _hoisted_20 = {
  class: "interactive-tool"
};
const _hoisted_21 = {
  key: 0,
  class: "script-output"
};
const _hoisted_22 = {
  class: "chapter-section",
  id: "ch3"
};
const _hoisted_23 = {
  class: "interactive-tool"
};
const _hoisted_24 = {
  class: "culture-checks"
};
const _hoisted_25 = ["onClick"];
const _hoisted_26 = {
  key: 0,
  class: "cc-detail"
};
const _hoisted_27 = {
  class: "cc-source"
};
const _hoisted_28 = {
  class: "chapter-section",
  id: "ch4"
};
const _hoisted_29 = {
  class: "interactive-tool"
};
const _hoisted_30 = {
  class: "anger-meter"
};
const _hoisted_31 = {
  class: "chapter-section",
  id: "ch5"
};
const _hoisted_32 = {
  class: "faq-section"
};
const _hoisted_33 = {
  class: "faq-item"
};
const _hoisted_34 = ["onClick"];
const _hoisted_35 = {
  class: "faq-arrow"
};
const _hoisted_36 = {
  key: 0,
  class: "faq-answer"
};
const _hoisted_37 = {
  class: "chapter-section",
  id: "ch9"
};
const _hoisted_38 = {
  class: "faq-section"
};
const _hoisted_39 = {
  class: "faq-item"
};
const _hoisted_40 = ["onClick"];
const _hoisted_41 = {
  class: "faq-arrow"
};
const _hoisted_42 = {
  key: 0,
  class: "faq-answer"
};
const _hoisted_43 = {
  class: "chapter-section",
  id: "ch11"
};
const _hoisted_44 = {
  class: "dua-grid"
};
const _hoisted_45 = {
  class: "dua-card"
};
const _hoisted_46 = {
  class: "dua-arabic"
};
const _hoisted_47 = {
  class: "dua-translation text-black"
};
const _hoisted_48 = {
  class: "dua-ref text-black"
};
const _hoisted_49 = {
  class: "chapter-section",
  id: "ch14"
};
const _hoisted_50 = {
  class: "micro-grid"
};
const _hoisted_51 = {
  class: "micro-card"
};
const _hoisted_52 = {
  class: "micro-icon"
};
const _hoisted_53 = {
  class: "micro-title"
};
const _hoisted_54 = {
  class: "micro-body"
};
const _hoisted_55 = {
  class: "interactive-tool"
};
const _hoisted_56 = {
  class: "habit-tracker"
};
const _hoisted_57 = {
  class: "habit-row"
};
const _hoisted_58 = {
  class: "habit-label"
};
const _hoisted_59 = ["onUpdate:modelValue"];
const _hoisted_60 = {
  key: 0,
  class: "habit-reward"
};
const _hoisted_61 = {
  class: "habit-score"
};
const _hoisted_62 = {
  key: 0
};
const _hoisted_63 = {
  class: "chapter-section",
  id: "ch15"
};
const _hoisted_64 = {
  class: "stories-grid"
};
const _hoisted_65 = {
  class: "story-card"
};
const _hoisted_66 = {
  class: "story-title"
};
const _hoisted_67 = {
  class: "story-body"
};
const _hoisted_68 = {
  class: "story-response"
};
const _hoisted_69 = {
  class: "story-source"
};
const _hoisted_70 = {
  class: "interactive-tool"
};
const _hoisted_71 = {
  key: 0,
  class: "success-notice"
};
const _hoisted_72 = {
  class: "chapter-section",
  id: "ch16"
};
const _hoisted_73 = {
  class: "interactive-tool"
};
const _hoisted_74 = {
  key: 0
};
const _hoisted_75 = {
  class: "quiz-scenario"
};
const _hoisted_76 = {
  class: "quiz-options"
};
const _hoisted_77 = {
  key: 0,
  class: "quiz-feedback"
};
const _hoisted_78 = {
  key: 1,
  class: "quiz-done"
};
const _hoisted_79 = {
  class: "interactive-tool"
};
const _hoisted_80 = {
  class: "poll-options"
};
const _hoisted_81 = {
  class: "poll-row"
};
const _hoisted_82 = ["onClick"];
const _hoisted_83 = {
  class: "poll-bar-wrap"
};
const _hoisted_84 = {
  class: "poll-pct"
};
const _hoisted_85 = {
  key: 0,
  class: "poll-note"
};
const _hoisted_86 = {
  class: "interactive-tool"
};
const _hoisted_87 = {
  class: "wyd-item"
};
const _hoisted_88 = {
  class: "wyd-q"
};
const _hoisted_89 = {
  class: "wyd-choices"
};
const _hoisted_90 = ["onClick"];
const _hoisted_91 = {
  key: 0,
  class: "wyd-feedback"
};
const _hoisted_92 = {
  class: "chapter-section",
  id: "resources"
};
const _hoisted_93 = {
  class: "resources-grid"
};
const _hoisted_94 = {
  class: "resource-card"
};
const _hoisted_95 = {
  class: "res-icon"
};
const _hoisted_96 = {
  class: "res-name"
};
const _hoisted_97 = {
  class: "res-desc"
};
const _hoisted_98 = {
  class: "res-type"
};
const _hoisted_99 = {
  class: "trusted-sources"
};
const _hoisted_100 = {
  class: "sources-list"
};
const _hoisted_101 = {
  class: "source-item"
};
const _hoisted_102 = {
  class: "src-num"
};
const _hoisted_103 = {
  class: "src-name"
};
const _hoisted_104 = {
  class: "src-url"
};
const _hoisted_105 = {
  class: "src-why"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" HERO SECTION "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "hero-title text-white"
  }, "Parenting in Islam", -1 /* CACHED */)), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-sub text-white"
  }, "Real talk. Real struggles. Real Islamic guidance for Muslim youth navigating family life in the West.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    type: "text",
    class: "hero-search",
    placeholder: "Search topics... e.g. 'strict parents', 'marriage', 'boundaries'"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "hero-search-btn",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.doSearch && $options.doSearch(...args))
  }, "Search")]), $data.searchResults.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_5, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.searchResults, result => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "search-result-item",
      onClick: $event => $options.scrollToChapter(result.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.title), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_6);
  }), 256 /* UNKEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-stats\"><div class=\"stat-pill\">16 Chapters</div><div class=\"stat-pill\">Scholarly Verified</div><div class=\"stat-pill\">Western Muslim Focus</div><div class=\"stat-pill\">Interactive Tools</div></div>", 1))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" NAVIGATION TABS "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chapters, ch => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-tab", {
        active: $data.activeChapter === ch.id
      }]),
      onClick: $event => {
        $data.activeChapter = ch.id;
        $options.scrollToChapter(ch.id);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch.icon) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch.shortTitle), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_10);
  }), 256 /* UNKEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAIN CONTENT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" DISCLAIMER BANNER "), _cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "disclaimer-banner pt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "container"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Disclaimer:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" All content in this guide is sourced from verified Islamic scholarship via IslamQA.info, Islamweb.net, Sunnah.com, Quran.com, and SeekersGuidance.org. Content is educational and does not replace qualified scholarly advice. Always consult a qualified Islamic scholar for personal matters. Sources are cited throughout to avoid plagiarism. ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" QUICK STATS BAR "), _cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"stats-bar\"><div class=\"stat-card\"><div class=\"stat-num\">114</div><div class=\"stat-lbl\">Quranic Chapters</div></div><div class=\"stat-card\"><div class=\"stat-num\">16</div><div class=\"stat-lbl\">Guide Chapters</div></div><div class=\"stat-card\"><div class=\"stat-num\">5</div><div class=\"stat-lbl\">Trusted Sources</div></div><div class=\"stat-card\"><div class=\"stat-num\">100+</div><div class=\"stat-lbl\">Practical Tips</div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 1 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_13, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">🏛️</div><div><div class=\"chapter-num\">Chapter 1</div><h2 class=\"chapter-title\">Foundations of Parenting in Islam</h2></div></div><div class=\"content-grid\"><div class=\"content-card\"><h3>Rights of Parents</h3><p>Allah commands honouring parents immediately after Tawheed (monotheism) — placing this duty second only to worshipping Him alone. This is mentioned in Surah Al-Isra (17:23): <em>&quot;Your Lord has decreed that you worship none but Him, and that you be kind to parents.&quot;</em></p><div class=\"quran-block\"><div class=\"quran-arabic\">وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا </div><div class=\"quran-ref\">Surah Al-Isra 17:23 | Source: Quran.com</div></div><div class=\"tip-box\"><strong>📌 Bite-Sized Reminder:</strong> The Prophet ﷺ was asked who deserves best companionship three times — each time he said &quot;your mother,&quot; then &quot;your father.&quot; (Sahih Bukhari 5971 | Source: Sunnah.com) </div></div><div class=\"content-card\"><h3>Intention (Niyyah) in Family Life</h3><p>Every act in your household — helping, speaking kindly, enduring difficulty — becomes an act of worship if done with sincere intention for Allah&#39;s sake. The Prophet ﷺ said: <em>&quot;Actions are by intentions.&quot;</em> (Sahih Bukhari 1 | Source: Sunnah.com)</p><div class=\"reminder-pill\">💡 Reframe difficult moments: &quot;I&#39;m doing this for Allah, not just for them.&quot; </div></div><div class=\"content-card\"><h3>Obedience vs Boundaries</h3><p>Obedience to parents is obligatory <strong>except</strong> when they command disobedience to Allah. The Prophet ﷺ said: <em>&quot;There is no obedience to creation in disobedience to the Creator.&quot;</em> (Ahmad | Source: Sunnah.com)</p><div class=\"dos-donts\"><div class=\"dos\"><div class=\"dd-title\">✅ Do</div><ul><li>Obey in permissible matters</li><li>Explain your concerns calmly</li><li>Seek mediation from a scholar</li><li>Make dua for them</li></ul></div><div class=\"donts\"><div class=\"dd-title\">❌ Don&#39;t</div><ul><li>Obey in clear haram actions</li><li>Be rude in your refusal</li><li>Publicly shame them</li><li>Cut off ties</li></ul></div></div></div><div class=\"content-card full-width\"><h3>Mercy, Respect &amp; Ihsan</h3><p><em>Ihsan</em> means excellence — doing more than the minimum. In family life, this means going beyond obligation to show genuine love, care, and kindness even when it&#39;s difficult. The Quran instructs us not to even say &quot;uff&quot; (a sound of irritation) to parents.</p></div></div><div class=\"source-block\"><strong>Sources:</strong> Quran.com (Surah Al-Isra 17:23), Sunnah.com (Sahih Bukhari 5971, Hadith on niyyah), SeekersGuidance.org (article on honouring parents) </div>", 3)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "faq-title"
  }, "Frequently Asked Questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ch1Faqs, (faq, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "faq-question",
      onClick: $event => $options.toggleFaq('ch1', i)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.q) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.faqOpen['ch1_' + i] ? '▲' : '▼'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_16), $data.faqOpen['ch1_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.a), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 256 /* UNKEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 2 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_19, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-icon-wrap"
  }, "💬"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-num"
  }, "Chapter 2"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "chapter-title"
  }, "Communication with Parents")])], -1 /* CACHED */)), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "How to Talk Without Disrespect"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("The Quran instructs us to speak to parents with "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "qawlan kariman"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" — noble, dignified speech. This means choosing words carefully, keeping your tone soft, and never raising your voice in contempt.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "script-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "script-title"
  }, "📝 Practical Script"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "\"Baba/Mama, I want to talk about something. Can we find a good time? I want to understand your view and share mine respectfully.\"")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Handling Disagreements Calmly"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "The Prophet ﷺ never raised his voice in anger in his household. Seeking silence when heated, making wudu, and changing physical position (sitting if standing) are all prophetic remedies for anger. (Source: IslamQA.info)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "steps-list"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "step"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "step-num"
  }, "1"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Pause — don't respond immediately when angry")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "step"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "step-num"
  }, "2"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Make wudu to cool down")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "step"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "step-num"
  }, "3"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Return to the conversation after emotions settle")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "step"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "step-num"
  }, "4"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Use \"I feel...\" statements, not blame")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "When Parents Don't Understand You"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "This is one of the most common struggles for Western Muslim youth. Your parents may have grown up in a completely different world. Their resistance often comes from love and fear, not malice."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "💚"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Try to understand their fears first")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "💚"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Find common ground in Islamic values")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "💚"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Involve a trusted imam or elder if needed")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "empathy-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "💚"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Be patient — understanding takes time")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card full-width"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Video: Communication in Muslim Families"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-row"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/N4QeKnfSP3s",
    title: "Muslim family communication",
    frameborder: "0",
    allowfullscreen: "",
    class: "yt-embed"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-label"
  }, "Navigating Difficult Family Conversations — SeekersGuidance")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/CYe1wfPx4dU",
    title: "Youth and parents in Islam",
    frameborder: "0",
    allowfullscreen: "",
    class: "yt-embed"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-label"
  }, "How to Talk to Your Parents — Islamic Perspective")])])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "🛠️ Conflict Phrase Generator", -1 /* CACHED */)), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Select a situation and get an Islamically framed response:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.conflictSituation = $event),
    class: "tool-select"
  }, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\">— Choose a situation —</option><option value=\"curfew\">Parents set an early curfew</option><option value=\"career\">Parents push a specific career</option><option value=\"friends\">Parents disapprove of your friends</option><option value=\"marriage\">Parents want to rush marriage</option>", 5)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.conflictSituation]]), $options.conflictScript ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "script-title"
  }, "Suggested Response:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.conflictScript), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Quran.com (Surah Al-Isra 17:23 — qawlan kariman), IslamQA.info (anger management in Islam), SeekersGuidance.org (family communication) ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 3 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_22, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">⚖️</div><div><div class=\"chapter-num\">Chapter 3</div><h2 class=\"chapter-title\">Culture vs Islam</h2></div></div><div class=\"culture-vs-islam-grid\"><div class=\"cvi-card culture\"><div class=\"cvi-header\">Cultural Norms</div><ul><li>Honour/shame-based decisions</li><li>&quot;What will people say?&quot;</li><li>Gender double-standards</li><li>Forced career paths</li><li>Marrying from same village/tribe only</li></ul></div><div class=\"cvi-vs\">VS</div><div class=\"cvi-card islam\"><div class=\"cvi-header\">Islamic Teachings</div><ul><li>Decisions based on taqwa, not shame</li><li>Allah&#39;s pleasure over people&#39;s opinions</li><li>Equal accountability for men &amp; women</li><li>Consultation and choice in career</li><li>Piety as the basis for marriage</li></ul></div></div>", 2)), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-grid",
    style: {
      "margin-top": "1.5rem"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "\"My parents say it's haram but is it?\""), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Many things labelled \"haram\" by parents are actually cultural preferences, not Islamic rulings. Always verify with a qualified scholar. Trusted resources: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "IslamQA.info"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(", "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "SeekersGuidance.org"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(", "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Islamweb.net"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(". ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "warning-note"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("⚠️ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Note:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Don't use \"it's not haram\" to justify genuinely forbidden things. Check with sincerity.")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Breaking Toxic Cultural Norms Respectfully"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dos-donts"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dos"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-title"
  }, "✅ Do"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Use Islamic evidence calmly"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Involve respected community figures"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Make gradual, respectful change")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "donts"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-title"
  }, "❌ Don't"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Publicly embarrass parents"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Use Western norms as argument"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Make it a power struggle")])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card full-width"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Video: Culture vs. Islam for Western Muslims"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-row"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/rQIBLnMhHJo",
    title: "Culture vs Islam",
    frameborder: "0",
    allowfullscreen: "",
    class: "yt-embed"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-label"
  }, "Culture vs. Islam — Sh. Omar Suleiman")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/WYrSP6vOPaI",
    title: "Generational gaps Islam",
    frameborder: "0",
    allowfullscreen: "",
    class: "yt-embed"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-label"
  }, "Generational Gaps in Muslim Families")])])])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "🛠️ Culture Check: Is It Islam or Culture?", -1 /* CACHED */)), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Select a situation to see its Islamic ruling:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.cultureChecks, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "cc-item",
      onClick: $event => $data.selectedCheck = item
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["cc-tag", item.type])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.type), 3 /* TEXT, CLASS */)], 8 /* PROPS */, _hoisted_25);
  }), 256 /* UNKEYED_FRAGMENT */))]), $data.selectedCheck ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedCheck.label), 1 /* TEXT */), _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedCheck.detail), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, "Source: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedCheck.source), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" IslamQA.info (cultural practices in Islam), SeekersGuidance.org (culture vs. shariah), Islamweb.net (tribal/racial discrimination in marriage) ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 4 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_28, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">😤</div><div><div class=\"chapter-num\">Chapter 4</div><h2 class=\"chapter-title\">Conflict &amp; Arguments</h2></div></div><div class=\"content-grid\"><div class=\"content-card\"><h3>What Islam Says About Shouting &amp; Anger</h3><p>The Prophet ﷺ repeated &quot;Don&#39;t be angry&quot; three times when asked for advice. Uncontrolled anger is described as coming from Shaytan. Physically, changing posture, making wudu, or leaving the room temporarily are all recommended. (Source: Sunnah.com — Sahih Bukhari 6116)</p><div class=\"hadith-block\"><div class=\"hadith-text\">&quot;The strong person is not the one who can wrestle someone down, but the one who controls himself when angry.&quot;</div><div class=\"hadith-ref\">Sahih Bukhari 6114 | Source: Sunnah.com</div></div></div><div class=\"content-card\"><h3>Dealing with Strict Parents</h3><div class=\"steps-list\"><div class=\"step\"><span class=\"step-num\">1</span> Understand strictness often comes from fear</div><div class=\"step\"><span class=\"step-num\">2</span> Build trust with small consistent actions</div><div class=\"step\"><span class=\"step-num\">3</span> Show responsibility before asking for freedom</div><div class=\"step\"><span class=\"step-num\">4</span> Request mediation from a trusted person</div><div class=\"step\"><span class=\"step-num\">5</span> Make dua — hearts are in Allah&#39;s hands</div></div></div><div class=\"content-card\"><h3>Feeling Controlled or Misunderstood</h3><p>Feeling suffocated is a real and valid experience. Islam acknowledges that oppressive treatment even from parents does not nullify your dignity. Seek counsel from a scholar or counsellor if you feel trapped.</p><div class=\"tip-box\">💡 <strong>Micro Tip:</strong> Say one sentence that de-escalates: <em>&quot;I respect you, and I just need you to hear me.&quot;</em></div></div></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" INTERACTIVE ANGER TRACKER "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "🛠️ Anger Level Check-In", -1 /* CACHED */)), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Before responding to your parents, check your anger level:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "range",
    min: "1",
    max: "10",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.angerLevel = $event),
    class: "anger-slider"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.angerLevel]]), _cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "anger-labels"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Calm"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Moderate"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Very Angry")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["anger-advice", $options.angerAdviceClass])
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.angerAdvice), 3 /* TEXT, CLASS */)])]), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Sunnah.com (Sahih Bukhari 6114, 6116 — anger), SeekersGuidance.org (conflict in Islamic family life) ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 5 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_31, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">❤️</div><div><div class=\"chapter-num\">Chapter 5</div><h2 class=\"chapter-title\">Emotional Struggles with Parents</h2></div></div><div class=\"content-grid\"><div class=\"content-card\"><h3>Feeling Unloved or Unappreciated</h3><p>Many Muslim parents express love through provision and protection, not verbal affirmation — a cultural and generational pattern. This doesn&#39;t mean they don&#39;t love you. However, your emotional need for acknowledgment is valid in Islam too.</p><div class=\"reminder-pill\">💚 Allah knows what is in the hearts — seek His acknowledgment first.</div></div><div class=\"content-card\"><h3>Pressure to Meet Expectations</h3><p>Excessive pressure contradicts the Islamic principle of <em>la tukallafu nafsan illa wus&#39;aha</em> — &quot;Allah does not burden a soul beyond what it can bear.&quot; (Quran 2:286 | Source: Quran.com)</p><div class=\"quran-block\"><div class=\"quran-arabic\">لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا</div><div class=\"quran-ref\">Surah Al-Baqarah 2:286 | Source: Quran.com</div></div></div><div class=\"content-card\"><h3>Comparison with Siblings/Others</h3><p>The Prophet ﷺ warned against partiality among children. Comparison is often used as &quot;motivation&quot; but can cause lasting harm. Know your own worth — in Islam, you are valued for your taqwa, not your grades or status.</p><div class=\"tip-box\">💡 Remind yourself: <em>&quot;My worth is with Allah, not in comparison to anyone else.&quot;</em></div></div><div class=\"content-card\"><h3>Healing Parent-Child Relationships</h3><div class=\"steps-list\"><div class=\"step\"><span class=\"step-num\">1</span> Forgive — for your own sake, not only theirs</div><div class=\"step\"><span class=\"step-num\">2</span> Start small: a smile, a cup of tea</div><div class=\"step\"><span class=\"step-num\">3</span> Dua — sincerely ask Allah to mend hearts</div><div class=\"step\"><span class=\"step-num\">4</span> Seek family counselling if needed</div></div></div></div><div class=\"source-block\"><strong>Sources:</strong> Quran.com (2:286), SeekersGuidance.org (emotional well-being in Islam), IslamQA.info (dealing with parental pressure) </div>", 3)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "faq-title"
  }, "Frequently Asked Questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ch5Faqs, (faq, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "faq-question",
      onClick: $event => $options.toggleFaq('ch5', i)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.q) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.faqOpen['ch5_' + i] ? '▲' : '▼'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_34), $data.faqOpen['ch5_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.a), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 256 /* UNKEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 6 ============ "), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"chapter-section\" id=\"ch6\"><div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">🧠</div><div><div class=\"chapter-num\">Chapter 6</div><h2 class=\"chapter-title\">Boundaries in Islam</h2></div></div><div class=\"content-grid\"><div class=\"content-card\"><h3>Is It Allowed to Say No?</h3><p>Yes — in Islam, obedience to parents is not unconditional. You may decline requests that are clearly sinful, harmful to you, or beyond your capacity. The key is <em>how</em> you decline: with respect, gentleness, and an explanation.</p></div><div class=\"content-card\"><h3>Privacy &amp; Independence</h3><p>Islam recognises the concept of <em>awra</em> (privacy) and individual accountability. Adults are responsible for their own deeds before Allah — this implies a level of personal autonomy. Parents may guide, but cannot control every decision of an adult child.</p></div><div class=\"content-card\"><h3>Toxic or Unfair Treatment</h3><p>Islam forbids oppression (dhulm) from anyone — including parents. The Prophet ﷺ said: <em>&quot;There is no harm and no causing harm.&quot;</em> (Ibn Majah 2341 | Source: Sunnah.com). Enduring harmful treatment in silence is not required by Islam.</p><div class=\"warning-note\">⚠️ If you are experiencing abuse, seek help from a trusted imam, counsellor, or community organisation.</div></div><div class=\"content-card\"><h3>Respect vs Self-Respect Balance</h3><div class=\"dos-donts\"><div class=\"dos\"><div class=\"dd-title\">✅ Respectful</div><ul><li>Disagreeing calmly</li><li>Expressing your limits kindly</li><li>Asking for space politely</li></ul></div><div class=\"donts\"><div class=\"dd-title\">❌ Disrespectful</div><ul><li>Yelling or slamming doors</li><li>Posting family issues publicly</li><li>Complete silent treatment</li></ul></div></div></div></div><div class=\"source-block\"><strong>Sources:</strong> Sunnah.com (Ibn Majah 2341 — la darar), SeekersGuidance.org (boundaries in Islamic family), IslamQA.info (refusing haram requests from parents) </div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 7 ============ "), _cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", {
    class: "chapter-section",
    id: "ch7"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-icon-wrap"
  }, "🌍"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-num"
  }, "Chapter 7"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "chapter-title"
  }, "Growing Up in Western Society")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "The Double Identity"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Many Western Muslim youth feel torn between two worlds: the home (with cultural/Islamic expectations) and outside (with peer and societal pressure). This \"double life\" feeling is common and does not make you a bad Muslim."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "reminder-pill"
  }, "🌟 Your identity as a Muslim is not threatened by living in the West — it is tested and strengthened.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Freedom vs Protection"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Parents in the West often over-protect out of fear of the environment. Islam encourages balance — trust must be built gradually. The Prophet ﷺ gave companions independence as they demonstrated responsibility. (Source: SeekersGuidance.org)")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card full-width"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Video: Being Muslim in the West"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-row"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/W5p1bYyNEE8",
    title: "Muslim identity in the West",
    frameborder: "0",
    allowfullscreen: "",
    class: "yt-embed"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-label"
  }, "Muslim Identity in the West — Yaqeen Institute")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/hNFbITGIkjQ",
    title: "Growing up Muslim in the West",
    frameborder: "0",
    allowfullscreen: "",
    class: "yt-embed"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-label"
  }, "Growing Up Muslim in the West")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "\"You're Too Western\" or \"Too Strict\""), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Being labelled either way shows you exist at an intersection. This is not a flaw — Islam is for all times and places. The key is grounding yourself in Islamic principles while being able to navigate any environment."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tip-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("💡 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "\"I am Muslim first — that doesn't change based on geography.\"")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" SeekersGuidance.org (Muslim identity in the West), Yaqeen Institute research on Western Muslim youth ")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 8 ============ "), _cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"chapter-section\" id=\"ch8\"><div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">📚</div><div><div class=\"chapter-num\">Chapter 8</div><h2 class=\"chapter-title\">Education, Career &amp; Life Choices</h2></div></div><div class=\"content-grid\"><div class=\"content-card\"><h3>Parents Forcing Careers</h3><p>A parent&#39;s influence on career is permissible as guidance — but not as compulsion. Islam upholds the principle of <em>shura</em> (consultation) and individual accountability. You will answer to Allah for your life choices, not your parents.</p></div><div class=\"content-card\"><h3>Passion vs Parental Expectations</h3><p>The Prophet ﷺ is reported to have said: <em>&quot;Allah loves that when one of you does a job, they do it with excellence (itqan).&quot;</em> (Al-Bayhaqi | Source: IslamQA.info). Excellence is possible in any halal field — pursue what you can do with itqan.</p><div class=\"dos-donts\"><div class=\"dos\"><div class=\"dd-title\">✅ Do</div><ul><li>Research Islamic perspectives on your field</li><li>Show your parents success stories</li><li>Make istikhara before big decisions</li></ul></div><div class=\"donts\"><div class=\"dd-title\">❌ Don&#39;t</div><ul><li>Choose a haram field to prove a point</li><li>Give up without trying to explain</li><li>Neglect parental input entirely</li></ul></div></div></div><div class=\"content-card\"><h3>Moving Out for Study/Work</h3><p>Moving out for legitimate educational or professional reasons is permissible and has precedent in Islamic history. However, maintaining ties with parents — regular calls, visits, financial support if able — is obligatory.</p><div class=\"steps-list\"><div class=\"step\"><span class=\"step-num\">1</span> Have an honest family discussion</div><div class=\"step\"><span class=\"step-num\">2</span> Reassure them of continued contact</div><div class=\"step\"><span class=\"step-num\">3</span> Commit to regular check-ins</div><div class=\"step\"><span class=\"step-num\">4</span> Maintain halal living arrangements</div></div></div><div class=\"content-card\"><h3>Istikhara — Seeking Allah&#39;s Guidance</h3><p>For any major life decision, perform Salah al-Istikhara and make sincere dua. This is not about receiving a dream — it is about submitting the decision to Allah and then moving forward with tawakkul (reliance on Allah).</p><div class=\"reminder-pill\">🤲 Istikhara Guide: Sunnah.com — Search &quot;Salat al-Istikhara&quot;</div></div></div><div class=\"source-block\"><strong>Sources:</strong> IslamQA.info (career choices in Islam, istikhara), Sunnah.com (du&#39;a of istikhara), SeekersGuidance.org (moving out of the family home) </div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 9 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_37, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-icon-wrap"
  }, "💑"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-num"
  }, "Chapter 9"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "chapter-title"
  }, "Marriage & Relationships")])], -1 /* CACHED */)), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-grid"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Islamic Rights in Marriage Choice"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Islam grants both men and women the right to consent to marriage. No valid marriage exists without the consent of both parties. (Source: IslamQA.info, based on Sahih Bukhari 5136). A wali (guardian) has the role of protection, not possession."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-text"
  }, "\"A woman who has been previously married has more right to decide about herself than her guardian, and a virgin's consent must be sought.\""), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hadith-ref"
  }, "Sahih Muslim 1421 | Source: Sunnah.com")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Cultural Barriers to Marriage"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Refusing marriage proposals purely based on race or tribe contradicts the Prophetic teaching: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "\"If someone comes to you whose deen and character pleases you, then marry him.\""), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (Tirmidhi 1084 | Source: Sunnah.com). Tribal pride is a sin in Islam.")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Love vs Arranged Marriage"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Islam does not prohibit a person from expressing interest in marriage to someone — it prohibits unlawful relationships (khalwa, zina). Approaching a potential match through proper channels with the wali's involvement is halal and encouraged."), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tip-box"
  }, "💡 There is no \"arranged\" vs \"love\" dichotomy in Islam — there is only the halal process, which can include your input.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Talking to Parents About Relationships"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "script-box"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "script-title"
  }, "📝 Opening Script"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "\"Baba/Mama, I've met someone I believe would be a good spouse based on their deen and character. I'd like to discuss this with you and follow the proper process.\"")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dos-donts",
    style: {
      "margin-top": "1rem"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dos"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-title"
  }, "✅ Do"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Be transparent early"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Involve a trusted elder"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Follow Islamic steps")])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "donts"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "dd-title"
  }, "❌ Don't"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Hide a relationship"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Meet in private (khalwa)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Issue ultimatums")])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "content-card full-width"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Video: Marriage & Parents in Islam"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-row"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/gEfFwsQHJ-E",
    title: "Marriage in Islam",
    frameborder: "0",
    allowfullscreen: "",
    class: "yt-embed"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-label"
  }, "Talking to Parents About Marriage — Mufti Menk")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "video-wrap"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
    src: "https://www.youtube.com/embed/3V7HqsMtXso",
    title: "Halal relationships",
    frameborder: "0",
    allowfullscreen: "",
    class: "yt-embed"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "vid-label"
  }, "Navigating Halal Relationships for Youth")])])])], -1 /* CACHED */)), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Sources:"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Sunnah.com (Sahih Bukhari 5136, Sahih Muslim 1421, Tirmidhi 1084), IslamQA.info (forced marriage in Islam), SeekersGuidance.org (marriage process) ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "faq-title"
  }, "Frequently Asked Questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ch9Faqs, (faq, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "faq-question",
      onClick: $event => $options.toggleFaq('ch9', i)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.q) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.faqOpen['ch9_' + i] ? '▲' : '▼'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_40), $data.faqOpen['ch9_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.a), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 256 /* UNKEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 10 ============ "), _cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"chapter-section\" id=\"ch10\"><div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">🕌</div><div><div class=\"chapter-num\">Chapter 10</div><h2 class=\"chapter-title\">Practising Islam with Parents</h2></div></div><div class=\"content-grid\"><div class=\"content-card\"><h3>When Parents Are Less Practising</h3><p>This is a test — not an excuse to be arrogant. The Prophet ﷺ&#39;s approach was always gentleness, example, and sincere love. You cannot force hidaya (guidance) — only Allah guides hearts.</p><div class=\"reminder-pill\">💡 Your job is to be an example, not a preacher in your own home.</div></div><div class=\"content-card\"><h3>When You Become More Practising Than Them</h3><div class=\"dos-donts\"><div class=\"dos\"><div class=\"dd-title\">✅ Do</div><ul><li>Lead by action and character</li><li>Make dua for their guidance</li><li>Share knowledge gently if asked</li><li>Maintain respect regardless</li></ul></div><div class=\"donts\"><div class=\"dd-title\">❌ Don&#39;t</div><ul><li>Lecture them at every opportunity</li><li>Look down on their level</li><li>Use religion as a weapon in arguments</li></ul></div></div></div><div class=\"content-card\"><h3>Family Religious Habits to Build</h3><div class=\"steps-list\"><div class=\"step\"><span class=\"step-num\">1</span> Pray together when possible</div><div class=\"step\"><span class=\"step-num\">2</span> Read Quran aloud at home</div><div class=\"step\"><span class=\"step-num\">3</span> Share beneficial content casually</div><div class=\"step\"><span class=\"step-num\">4</span> Celebrate Islamic occasions as a family</div><div class=\"step\"><span class=\"step-num\">5</span> Make morning/evening adhkar a family habit</div></div></div></div><div class=\"source-block\"><strong>Sources:</strong> SeekersGuidance.org (being more practising than parents), IslamQA.info (inviting family to Islam), Sunnah.com (family adhkar) </div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 11 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_43, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-icon-wrap"
  }, "🤲"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-num"
  }, "Chapter 11"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "chapter-title"
  }, "Du'as & Spiritual Approach")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.duas, dua => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.ref), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */))]), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"content-grid\" style=\"margin-top:1.5rem;\"><div class=\"content-card\"><h3>Sabr (Patience) in Family Hardship</h3><p>Sabr is not passive acceptance — it is active endurance with trust in Allah. The Quran tells us Allah is with those who are patient. (Quran 2:153 | Source: Quran.com). Every difficult family moment endured with sabr earns reward.</p></div><div class=\"content-card\"><h3>Barakah in Respecting Parents</h3><p>The Prophet ﷺ said that whoever wishes for an extended, blessed life and increase in provision should maintain family ties and honour parents. (Sahih Bukhari 5986 | Source: Sunnah.com)</p><div class=\"reminder-pill\">🌟 Barakah (blessing) is unlocked through parental du&#39;a for you.</div></div></div><div class=\"source-block\"><strong>Sources:</strong> Quran.com (2:153, 14:40–41), Sunnah.com (Sahih Bukhari 5986), SeekersGuidance.org (du&#39;a for parents) </div>", 2))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 12 ============ "), _cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"chapter-section\" id=\"ch12\"><div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">🔒</div><div><div class=\"chapter-num\">Chapter 12</div><h2 class=\"chapter-title\">Difficult &amp; Sensitive Situations</h2></div></div><div class=\"serious-notice\"> ⚠️ This chapter addresses serious situations. If you are in immediate danger, contact emergency services. For Islamic support, reach out to a trusted imam or Muslim counselling service. </div><div class=\"content-grid\"><div class=\"content-card\"><h3>Toxic or Abusive Households</h3><p>Islam explicitly forbids dhulm (oppression and injustice) from anyone — including parents. The Prophet ﷺ said: <em>&quot;Beware of oppression, for oppression will be darkness on the Day of Judgement.&quot;</em> (Sahih Muslim 2578 | Source: Sunnah.com). Leaving an abusive situation is not disobedience.</p></div><div class=\"content-card\"><h3>When to Seek Help</h3><div class=\"steps-list\"><div class=\"step\"><span class=\"step-num\">1</span> Speak to a trusted imam privately</div><div class=\"step\"><span class=\"step-num\">2</span> Contact a Muslim counselling service</div><div class=\"step\"><span class=\"step-num\">3</span> Reach out to a trustworthy adult outside the home</div><div class=\"step\"><span class=\"step-num\">4</span> If in danger — contact services or authorities</div></div></div><div class=\"content-card\"><h3>Islamic Limits of Obedience</h3><p>The scholars are unanimous: obedience to parents is obligatory only in permissible matters. When parents command disobedience to Allah, or when obeying them causes you clear physical or spiritual harm, the obligation ends. (Source: IslamQA.info, Islamweb.net)</p></div><div class=\"content-card\"><h3>Emotional Neglect</h3><p>Emotional neglect is a real harm. Islam&#39;s emphasis on <em>rahma</em> (mercy) in families means that a parent who consistently neglects a child&#39;s emotional wellbeing is falling short of their Islamic duty. Seek support — this is not ingratitude.</p><div class=\"warning-note\">⚠️ Your wellbeing matters. Getting help is an act of self-care, not betrayal. </div></div></div><div class=\"source-block\"><strong>Sources:</strong> Sunnah.com (Sahih Muslim 2578 — dhulm), IslamQA.info (limits of obedience), Islamweb.net (family abuse in Islam) </div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 13 ============ "), _cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"chapter-section\" id=\"ch13\"><div class=\"chapter-header\"><div class=\"chapter-icon-wrap\">🤝</div><div><div class=\"chapter-num\">Chapter 13</div><h2 class=\"chapter-title\">Building a Better Relationship</h2></div></div><div class=\"content-grid\"><div class=\"content-card\"><h3>Small Actions with Big Impact</h3><div class=\"empathy-box\"><div class=\"empathy-item\"><span>☕</span> Bring them tea/coffee without being asked</div><div class=\"empathy-item\"><span>📞</span> Call when you&#39;re away — just to check in</div><div class=\"empathy-item\"><span>🙏</span> Ask for their du&#39;a before exams/big events</div><div class=\"empathy-item\"><span>🛒</span> Offer to help with errands</div><div class=\"empathy-item\"><span>💬</span> Sit with them in the evening</div></div></div><div class=\"content-card\"><h3>Becoming the &quot;Cool-Headed One&quot;</h3><p>In family conflict, someone has to be the mature one. Islam encourages us to be that person. The Prophet ﷺ said the best among people is the one who benefits others. (Source: Sunnah.com). Choose to de-escalate, not escalate.</p><div class=\"script-box\"><div class=\"script-title\">1 Sentence That De-escalates</div><p><em>&quot;I don&#39;t want to argue with you — I love you and I just want us to understand each other.&quot;</em></p></div></div><div class=\"content-card\"><h3>Rebuilding Trust</h3><div class=\"steps-list\"><div class=\"step\"><span class=\"step-num\">1</span> Be consistent — say what you do, do what you say</div><div class=\"step\"><span class=\"step-num\">2</span> Apologise genuinely when you&#39;re wrong</div><div class=\"step\"><span class=\"step-num\">3</span> Show improvement — don&#39;t just talk about it</div><div class=\"step\"><span class=\"step-num\">4</span> Give it time — trust takes time to rebuild</div></div></div><div class=\"content-card\"><h3>Showing Appreciation</h3><div class=\"tip-box\">💡 <strong>3 Ways to Earn Barakah at Home:</strong><br> 1. Say &quot;JazakAllah khair&quot; to your parents genuinely<br> 2. Include them in your du&#39;a by name<br> 3. Speak well of them to others </div></div></div><div class=\"source-block\"><strong>Sources:</strong> Sunnah.com (best among people hadith), SeekersGuidance.org (rebuilding family relationships in Islam) </div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 14 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_49, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-icon-wrap"
  }, "⚡"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-num"
  }, "Chapter 14"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "chapter-title"
  }, "Quick Advice / Micro Content")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.microTips, tip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.body), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "🛠️ Daily Habit Tracker", -1 /* CACHED */)), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Track your daily relationship-building habits:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.habits, habit => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      "onUpdate:modelValue": $event => habit.done = $event,
      class: "habit-check"
    }, null, 8 /* PROPS */, _hoisted_59), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, habit.done]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        'done-habit': habit.done
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(habit.label), 3 /* TEXT, CLASS */)]), habit.done ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_60, "+Barakah ✓")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Habits completed today: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.completedHabits) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.habits.length), 1 /* TEXT */), $options.completedHabits === $data.habits.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_62, " 🌟 SubhanAllah! Full day of goodness!")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 15 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_63, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-icon-wrap"
  }, "🎥"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-num"
  }, "Chapter 15"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "chapter-title"
  }, "Real Stories & Scenarios")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.stories, story => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "story-tag"
    }, "Real Situation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(story.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(story.body), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Islamic Perspective:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(story.response), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, "Source: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(story.source), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "📬 Share Your Story (Anonymous)", -1 /* CACHED */)), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Sharing your experience helps others feel less alone. This is a safe, moderated space.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.userStory = $event),
    class: "story-textarea",
    placeholder: "Write your situation anonymously... (e.g. 'My parents won't let me choose my career...')"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.userStory]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "submit-btn",
    onClick: _cache[5] || (_cache[5] = (...args) => $options.submitStory && $options.submitStory(...args))
  }, "Submit Anonymously"), $data.storySubmitted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_71, "JazakAllah khair — your story has been noted. May Allah ease your situation.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ CHAPTER 16 ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_72, [_cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-icon-wrap"
  }, "🧩"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-num"
  }, "Chapter 16"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "chapter-title"
  }, "Interactive Content")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" QUIZ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "🛠️ \"Are You Wrong Here?\" — Scenario Quiz", -1 /* CACHED */)), _cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Read the scenario and decide:", -1 /* CACHED */)), !$data.quizDone ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currentScenario.scenario), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-btn",
    onClick: _cache[6] || (_cache[6] = $event => $options.answerQuiz('youth'))
  }, "Youth is Wrong"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-btn",
    onClick: _cache[7] || (_cache[7] = $event => $options.answerQuiz('parent'))
  }, "Parent is Wrong"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-btn",
    onClick: _cache[8] || (_cache[8] = $event => $options.answerQuiz('both'))
  }, "Both Have a Point")]), $data.quizFeedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_77, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Feedback:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.quizFeedback) + " ", 1 /* TEXT */), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "next-btn",
    onClick: _cache[9] || (_cache[9] = (...args) => $options.nextScenario && $options.nextScenario(...args))
  }, "Next Scenario →")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_78, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Quiz Complete! Jazakum Allahu Khayran.", -1 /* CACHED */)), _cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Your score: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.quizScore) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.scenarios.length) + " — Remember, understanding both sides is the goal. ", 1 /* TEXT */), _cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "next-btn",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.resetQuiz && $options.resetQuiz(...args))
  }, "Try Again")]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" POLL "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "📊 Community Poll: How Strict Were Your Parents?", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.pollOptions, opt => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["poll-btn", {
        selected: $data.pollVote === opt.id
      }]),
      onClick: $event => $options.castVote(opt.id)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_82), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "poll-bar",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        width: $options.getPollPercent(opt.id) + '%'
      })
    }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_84, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getPollPercent(opt.id)) + "%", 1 /* TEXT */)])]);
  }), 256 /* UNKEYED_FRAGMENT */))]), $data.pollVote ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_85, "JazakAllah for voting! (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalPollVotes) + " total responses)", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" WHAT WOULD YOU DO "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "❓ \"What Would You Do?\" Situations", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.wydSituations, (wyd, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(wyd.q), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(wyd.choices, choice => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["wyd-btn", {
          selected: $data.wydAnswers[i] === choice.val,
          correct: $data.wydAnswers[i] && choice.correct
        }]),
        onClick: $event => {
          $data.wydAnswers[i] = choice.val;
          $data.wydAnswers = [...$data.wydAnswers];
        }
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(choice.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_90);
    }), 256 /* UNKEYED_FRAGMENT */))]), $data.wydAnswers[i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_91, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(wyd.feedback), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 256 /* UNKEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ============ APPS & RESOURCES ============ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_92, [_cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-icon-wrap"
  }, "📱"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "chapter-num"
  }, "Resources"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "chapter-title"
  }, "Apps & Learning Resources")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.resources, res => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(res.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(res.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(res.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(res.type), 1 /* TEXT */)]);
  }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Our 5 Trusted Islamic Sources", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.trustedSources, src => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src.url), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src.why), 1 /* TEXT */)])]);
  }), 256 /* UNKEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" end main-content ")]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _ParentingComponent_vue_vue_type_template_id_1431ac10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=template&id=1431ac10 */ "./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10");
/* harmony import */ var _ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css */ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ParentingComponent_vue_vue_type_template_id_1431ac10__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/ParentingComponent.vue"]])
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

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&lang=css");


/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10 ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_template_id_1431ac10__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_template_id_1431ac10__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=template&id=1431ac10 */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10");


/***/ })

}]);