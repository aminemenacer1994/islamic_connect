"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ParentingComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&setup=true&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&setup=true&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


// ── Constants ───────────────────────────────────────────────
const DEBOUNCE_MS = 300;
const SCROLL_OFFSET = 80;

// ── Reactive State ──────────────────────────────────────────
const STORAGE_KEY = 'ic-parenting-poll-vote';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'ParentingComponent',
  setup(__props, {
    expose: __expose
  }) {
    __expose();
    const searchQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const searchResults = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const activeChapter = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('ch1');
    const navEl = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const scrollProgress = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const showBackToTop = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const prefersReducedMotion = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const quizAnswer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

    // Debounce timer reference
    let searchTimer = null;

    // ── Lifecycle Hooks ─────────────────────────────────────────
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      // Check reduced motion preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion.value = mediaQuery.matches;
      mediaQuery.addEventListener('change', handleMotionPreference);

      // Add scroll listeners (passive for performance)
      window.addEventListener('scroll', handleScroll, {
        passive: true
      });
      window.addEventListener('scroll', updateActiveChapter, {
        passive: true
      });

      // Initial chapter check
      updateActiveChapter();
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(() => {
      // Cleanup
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.removeEventListener('change', handleMotionPreference);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', updateActiveChapter);
      clearTimeout(searchTimer);
    });

    // ── Event Handlers ──────────────────────────────────────────
    function handleMotionPreference(event) {
      prefersReducedMotion.value = event.matches;
    }
    function handleScroll() {
      // Back to top visibility
      showBackToTop.value = window.pageYOffset > 500;

      // Scroll progress calculation
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value = docHeight > 0 ? window.pageYOffset / docHeight * 100 : 0;
    }
    function updateActiveChapter() {
      var _navEl$value;
      const chapterElements = document.querySelectorAll('.chapter');
      const navHeight = ((_navEl$value = navEl.value) === null || _navEl$value === void 0 ? void 0 : _navEl$value.offsetHeight) || SCROLL_OFFSET;
      for (let i = chapterElements.length - 1; i >= 0; i--) {
        const chapter = chapterElements[i];
        const rect = chapter.getBoundingClientRect();
        if (rect.top <= navHeight + 100) {
          activeChapter.value = chapter.id;
          break;
        }
      }
    }

    // ── Search Functionality ────────────────────────────────────
    function debouncedSearch() {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        doSearch();
      }, DEBOUNCE_MS);
    }
    function doSearch() {
      const q = searchQuery.value.toLowerCase().trim();
      if (!q) {
        searchResults.value = [];
        return;
      }
      searchResults.value = chapters.filter(c => {
        var _c$keywords;
        return c.short.toLowerCase().includes(q) || c.id.includes(q) || ((_c$keywords = c.keywords) === null || _c$keywords === void 0 ? void 0 : _c$keywords.some(k => k.includes(q)));
      }).slice(0, 5);
    }

    // ── Navigation ──────────────────────────────────────────────
    function scrollTo(id) {
      var _navEl$value2;
      const el = document.getElementById(id);
      if (!el) return;
      const offset = ((_navEl$value2 = navEl.value) === null || _navEl$value2 === void 0 ? void 0 : _navEl$value2.offsetHeight) || SCROLL_OFFSET;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
      });
      activeChapter.value = id;
      searchResults.value = [];

      // Focus management for screen readers
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        el.focus({
          preventScroll: true
        });
      });
    }
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
      });
    }

    // ── FAQ Management ──────────────────────────────────────────
    const faqOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({});
    function toggleFaq(ch, i) {
      const k = `${ch}_${i}`;
      faqOpen[k] = !faqOpen[k];
    }

    // ── Clipboard with Fallback ─────────────────────────────────
    async function copyDua(d) {
      const text = `${d.arabic}\n${d.translation}`;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
          document.body.appendChild(textarea);
          textarea.select();
          const success = document.execCommand('copy');
          document.body.removeChild(textarea);
          if (!success) throw new Error('execCommand failed');
        }
        d.copied = true;
        setTimeout(() => d.copied = false, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        // Non-intrusive error feedback
        alert('Unable to copy automatically. Please select and copy manually.');
      }
    }

    // ── Poll with LocalStorage ──────────────────────────────────
    const pollVote = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(localStorage.getItem(STORAGE_KEY));
    function castVote(id) {
      if (pollVote.value) return;
      pollCounts[id]++;
      pollVote.value = id;
      localStorage.setItem(STORAGE_KEY, id);
    }

    // ── Quiz Logic ──────────────────────────────────────────────
    const currentScenarioIdx = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const currentScenario = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => scenarios[currentScenarioIdx.value] || scenarios[0]);
    const quizFeedback = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const quizScore = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const quizDone = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    function answerQuiz(ans) {
      if (quizFeedback.value) return;
      quizAnswer.value = ans;
      const s = scenarios[currentScenarioIdx.value];
      if (ans === s.correct) quizScore.value++;
      quizFeedback.value = s.explanation;
    }
    function nextScenario() {
      quizFeedback.value = '';
      quizAnswer.value = null;
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
      quizAnswer.value = null;
    }

    // ── Data ────────────────────────────────────────────────────
    const sources = ['IslamQA.info', 'Islamweb.net', 'Sunnah.com', 'Quran.com', 'SeekersGuidance.org'];
    const heroStats = [{
      num: '16',
      label: 'Chapters'
    }, {
      num: '5',
      label: 'Verified Sources'
    }, {
      num: '100+',
      label: 'Practical Tips'
    }, {
      num: '∞',
      label: 'Reward for Birr'
    }];
    const kpis = [{
      num: '114',
      label: 'Quranic Chapters',
      deco: '📖',
      color: '#d4a017'
    }, {
      num: '16',
      label: 'Guide Chapters',
      deco: '📚',
      color: '#1f7a4a'
    }, {
      num: '5',
      label: 'Trusted Sources',
      deco: '✓',
      color: '#0b3220'
    }, {
      num: '100+',
      label: 'Practical Tips',
      deco: '💡',
      color: '#b07d0a'
    }];
    const chapters = [{
      id: 'ch1',
      icon: '🏛️',
      short: 'Foundations',
      keywords: ['rights', 'parents', 'obedience', 'ihsan']
    }, {
      id: 'ch2',
      icon: '💬',
      short: 'Communication',
      keywords: ['talk', 'speak', 'conflict', 'arguments']
    }, {
      id: 'ch3',
      icon: '⚖️',
      short: 'Culture vs Islam',
      keywords: ['culture', 'tradition', 'race', 'ethnicity']
    }, {
      id: 'ch4',
      icon: '😤',
      short: 'Conflict',
      keywords: ['anger', 'strict', 'fight', 'argue']
    }, {
      id: 'ch5',
      icon: '❤️',
      short: 'Emotions',
      keywords: ['feelings', 'sad', 'love', 'appreciated']
    }, {
      id: 'ch6',
      icon: '🧠',
      short: 'Boundaries',
      keywords: ['privacy', 'no', 'limits', 'toxic']
    }, {
      id: 'ch7',
      icon: '🌍',
      short: 'Western Life',
      keywords: ['west', 'identity', 'society', 'country']
    }, {
      id: 'ch8',
      icon: '📚',
      short: 'Career',
      keywords: ['job', 'study', 'work', 'education']
    }, {
      id: 'ch9',
      icon: '💑',
      short: 'Marriage',
      keywords: ['wedding', 'spouse', 'nikah', 'relationship']
    }, {
      id: 'ch10',
      icon: '🕌',
      short: 'Practising',
      keywords: ['prayer', 'deen', 'religious', 'islam']
    }, {
      id: 'ch11',
      icon: '🤲',
      short: "Du'as",
      keywords: ['prayer', 'supplication', 'dua', 'spiritual']
    }, {
      id: 'ch12',
      icon: '🔒',
      short: 'Difficult',
      keywords: ['abuse', 'danger', 'help', 'emergency']
    }, {
      id: 'ch13',
      icon: '🤝',
      short: 'Rebuilding',
      keywords: ['trust', 'fix', 'improve', 'relationship']
    }, {
      id: 'ch14',
      icon: '⚡',
      short: 'Quick Tips',
      keywords: ['advice', 'fast', 'short', 'tips']
    }, {
      id: 'ch15',
      icon: '🎥',
      short: 'Stories',
      keywords: ['scenario', 'example', 'real', 'experience']
    }, {
      id: 'ch16',
      icon: '🧩',
      short: 'Interactive',
      keywords: ['quiz', 'poll', 'game', 'test']
    }, {
      id: 'resources',
      icon: '📱',
      short: 'Resources',
      keywords: ['app', 'website', 'learn', 'study']
    }];

    // FAQ Data
    const ch1Faqs = [{
      q: 'Is it ever okay to disobey my parents?',
      a: "Yes — Islamic scholars are unanimous that obedience to parents is not required when they command something that is clearly haram. The Prophet ﷺ said \"There is no obedience to creation in disobedience to the Creator.\" (Musnad Ahmad, verified by Islamweb.net). This applies to clear prohibitions — not personal preferences."
    }, {
      q: 'My parents are very strict — is this Islamic?',
      a: 'Strictness from love and protection is understandable, but oppressive strictness is not endorsed in Islam. Islam calls for rahma (mercy) in family life. If strictness crosses into harm, seek mediation from a trusted imam or elder. Reference: SeekersGuidance.org.'
    }, {
      q: "How can I earn barakah through my parents?",
      a: "The Prophet ﷺ taught that maintaining family ties, honouring parents, and being kind to them increases barakah. (Sahih Bukhari 5986, Sunnah.com). Simple daily acts — a kind word, helping around the house, asking for their du'a — all earn immense reward."
    }];
    const ch5Faqs = [{
      q: 'Is it sinful to feel sad or frustrated with my parents?',
      a: "No — feelings are not sinful. Islam does not require you to suppress emotions. What matters is how you act on them. Speak to Allah about your feelings in du'a, and seek support if needed. (SeekersGuidance.org)"
    }, {
      q: 'My parents compare me to my siblings constantly. What can I do?',
      a: "The Prophet ﷺ warned against partiality among children. Remind yourself that your worth in Islam is measured by taqwa alone. Have a calm conversation with your parents about how this affects you, or involve a trusted family elder."
    }];
    const ch9Faqs = [{
      q: 'Can I choose my own spouse?',
      a: "Yes — Islam gives you the right to consent. No valid marriage exists without it. Your wali (guardian) has an advisory and protective role, not the power to force you. (Sahih Muslim 1421 · Sunnah.com; IslamQA.info)"
    }, {
      q: 'What if my parents refuse a good proposal because of race or background?',
      a: "Scholars are clear: rejecting a proposal based solely on race, tribe, or national origin is contrary to Islamic teaching. The Prophet ﷺ said the criteria is deen and character. (Tirmidhi 1084 · Sunnah.com). Involve an imam to mediate."
    }, {
      q: 'Is it okay to talk to a potential spouse before marriage?',
      a: "Within Islamic limits, yes. Meeting with a potential spouse in a non-private setting with the wali's knowledge, for the purpose of marriage, is permissible. (IslamQA.info, SeekersGuidance.org)"
    }];

    // Step lists
    const commSteps = ['Pause — don\'t respond immediately when angry', 'Make wudu to cool down', 'Return after emotions settle', 'Use "I feel…" statements, not blame'];
    const strictParentsSteps = ['Understand strictness often comes from fear', 'Build trust with small, consistent actions', 'Show responsibility before asking for freedom', 'Request mediation from a trusted person', "Make du'a — hearts are in Allah's hands"];
    const healingSteps = ['Forgive — for your own sake, not only theirs', 'Start small: a smile, a cup of tea', "Make du'a sincerely for mended hearts", 'Seek family counselling if needed'];
    const movingOutSteps = ['Have an honest family discussion', 'Reassure them of continued contact', 'Commit to regular check-ins', 'Maintain halal living arrangements'];
    const seekHelpSteps = ['Speak to a trusted imam privately', 'Contact a Muslim counselling service', 'Reach out to a trustworthy adult outside the home', 'If in danger — contact services or authorities'];
    const trustSteps = ['Be consistent — say what you do, do what you say', 'Apologise genuinely when wrong', 'Show improvement — don\'t just talk about it', 'Give it time — trust takes time to rebuild'];

    // Conflict generator
    const conflictSituation = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const conflictScripts = {
      curfew: `"Baba/Mama, I understand your concern for my safety — I appreciate that. Could we discuss a curfew that balances both safety and my responsibilities? I'd like to find something we're both comfortable with."`,
      career: `"I know you want what's best for me, and I'm truly grateful. I've been researching this field and I'd love to show you what I've found. Can we have a proper conversation about it? I want your guidance."`,
      friends: `"I hear your concerns and I don't dismiss them. Could you tell me specifically what worries you? I want to understand your perspective, and I'd love to help you get to know them better."`,
      marriage: `"I understand marriage is important and I want to do it the halal way. Can we discuss a realistic timeline that respects my current situation? I want to do this right, not just quickly."`
    };
    const conflictScript = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => conflictScripts[conflictSituation.value] || '');

    // Culture checks
    const cultureChecks = [{
      label: 'Refusing marriage proposals based on race',
      type: 'Culture',
      detail: 'Refusing solely based on ethnicity or tribal origin is not supported in Islam. The Prophet ﷺ explicitly condemned tribal arrogance and based marriage criteria on deen and character.',
      source: 'Islamweb.net, Tirmidhi 1084 via Sunnah.com'
    }, {
      label: 'Honouring parents in old age',
      type: 'Islam',
      detail: 'This is a core Islamic obligation. The Quran specifically highlights the duty to care for parents when elderly, with special emphasis on gentleness. (Surah Al-Isra 17:23)',
      source: 'Quran.com (17:23), SeekersGuidance.org'
    }, {
      label: 'Girls staying home while brothers go out freely',
      type: 'Culture',
      detail: 'Gender double-standards not rooted in Islamic texts are cultural practices. Both men and women are equally accountable before Allah.',
      source: 'IslamQA.info, Islamweb.net'
    }, {
      label: 'Not cutting ties even with difficult family',
      type: 'Islam',
      detail: "Maintaining family ties (silat al-rahm) is a major Islamic obligation. The Prophet ﷺ warned that those who cut ties will not enter paradise.",
      source: 'Sahih Bukhari 5984 via Sunnah.com'
    }];
    const selectedCheck = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);

    // Anger meter
    const angerLevel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1);
    const angerAdvice = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const v = parseInt(angerLevel.value);
      if (v <= 3) return '✅ You\'re calm — a great time to have a productive conversation.';
      if (v <= 6) return '⚠️ Moderate tension. Take a few deep breaths, make wudu, then approach the conversation.';
      return '🛑 Too heated. Step away, make wudu, change your position. Return when calm. Don\'t speak yet.';
    });
    const angerClass = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const v = parseInt(angerLevel.value);
      if (v <= 3) return 'anger-good';
      if (v <= 6) return 'anger-warn';
      return 'anger-stop';
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

    // Micro tips
    const microTips = [{
      icon: '⏰',
      title: 'Before You Respond',
      body: "Take 3 seconds. The Prophet ﷺ said \"Don't be angry\" three times. A pause changes everything."
    }, {
      icon: '🤲',
      title: "Make Du'a First",
      body: "Before a hard conversation, make 2 rak'ahs and ask Allah to open hearts — yours and theirs."
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
      body: 'If speaking is too hard, write a respectful letter — it gives you time to choose every word carefully.'
    }, {
      icon: '🌙',
      title: 'After Isha',
      body: "Many scholars recommend time after Isha for family conversations — quieter, calmer, fewer distractions."
    }, {
      icon: '🏃',
      title: 'Walk Away When Needed',
      body: "Leaving an escalating argument is not weakness — it's sunnah. The Prophet ﷺ never escalated."
    }, {
      icon: '🙏',
      title: "Ask for Their Du'a",
      body: "Saying \"Please make du'a for me\" softens even the most difficult parent. Try it."
    }];
    const empathyTips = ['Try to understand their fears first', 'Find common ground in Islamic values', 'Involve a trusted imam or elder', 'Be patient — understanding takes time'];
    const smallActions = [{
      icon: '☕',
      text: 'Bring tea/coffee without being asked'
    }, {
      icon: '📞',
      text: 'Call when you\'re away — just to check in'
    }, {
      icon: '🙏',
      text: 'Ask for their du\'a before exams or big events'
    }, {
      icon: '🛒',
      text: 'Offer to help with errands'
    }, {
      icon: '💬',
      text: 'Sit with them in the evening'
    }];

    // Habits
    const habits = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)([{
      label: 'Said Salaam when entering home',
      done: false
    }, {
      label: 'Helped without being asked',
      done: false
    }, {
      label: "Made du'a for my parents by name",
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
      body: '"I feel like my dreams don\'t matter. They say art is a waste. I feel trapped."',
      response: 'This is a shura issue. Islam encourages seeking advice but does not allow compulsion. Show your parents success stories, perform istikhara, and involve a wise elder. You are accountable to Allah for your life choices.',
      source: 'IslamQA.info, SeekersGuidance.org'
    }, {
      title: 'My parents disapprove of my proposal because of his ethnicity.',
      body: '"He is practising, kind, and has good character. But my parents say he\'s not from our background."',
      response: "The Prophet ﷺ explicitly said deen and character are the criteria for marriage. Racial discrimination in marriage proposals has no Islamic basis. Involve an imam to mediate respectfully.",
      source: 'Tirmidhi 1084 (Sunnah.com), Islamweb.net'
    }, {
      title: 'My parents read my messages without asking.',
      body: '"I feel like I have no privacy. I\'m 20 years old and they go through my phone."',
      response: 'Islam recognises privacy and personal dignity. Express this concern respectfully. Frame it around trust-building: "I want you to trust me — can we talk about how I can show you that?"',
      source: 'SeekersGuidance.org'
    }, {
      title: 'My mother cries every time I try to set a boundary.',
      body: '"Whenever I say no to something, she becomes very upset and I feel guilty."',
      response: "Emotional responses do not mean your boundaries are wrong. Islam requires respectful disagreement, not unlimited emotional compliance. Seek advice from a counsellor or imam.",
      source: 'SeekersGuidance.org, Islamweb.net'
    }];
    const userStory = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const storySubmitted = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    function submitStory() {
      if (!userStory.value.trim()) return;
      storySubmitted.value = true;
      userStory.value = '';
      setTimeout(() => storySubmitted.value = false, 5000);
    }

    // Quiz
    const scenarios = [{
      scenario: "A 19-year-old wants to study abroad. Her parents refuse because \"girls don't leave home.\" She applies anyway and gets accepted.",
      correct: 'both',
      explanation: "She has an Islamic right to education and autonomy as an adult. However, going behind their backs rather than involving an elder was not ideal. Both parties have valid points."
    }, {
      scenario: "A parent demands their son quit his job and work in the family business without compensation, threatening to stop speaking to him if he refuses.",
      correct: 'parent',
      explanation: "Using emotional coercion and threats is not permitted in Islam. Parents may guide but not compel adult children through emotional manipulation."
    }, {
      scenario: "A young man raises his voice and says \"You never understand me!\" during an argument with his father.",
      correct: 'youth',
      explanation: "Regardless of the cause, raising one's voice at parents is explicitly discouraged in Islam. The Quran instructs qawlan kariman (noble speech). He should have stepped away and returned when calmer."
    }];

    // Poll
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
    function getPollPercent(id) {
      return Math.round(pollCounts[id] / totalPollVotes.value * 100);
    }

    // WYD
    const wydSituations = [{
      q: "Your parents find out you've been talking to someone of the opposite gender. They're upset. What do you do?",
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
      feedback: "Being honest and explaining that your intentions are marriage-oriented is the Islamic approach. Deception erodes trust and is contrary to Islamic character."
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
      feedback: "The sunnah is to disengage from heated exchanges. Leaving to cool down is a prophetic remedy — not weakness."
    }];
    const wydAnswers = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([null, null]);
    function setWyd(i, val) {
      wydAnswers.value[i] = val;
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
      desc: 'Searchable hadith database — all major collections with chain verification.',
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
      name: 'Mufti Menk',
      desc: 'Accessible Islamic guidance on family, relationships, and daily life.',
      type: 'Video'
    }];
    const trustedSources = [{
      num: '01',
      name: 'IslamQA.info',
      url: 'islamqa.info',
      why: 'Run by Sh. Muhammad Saalih al-Munajjid. Peer-reviewed fatawa on everyday Islamic questions, used by millions globally.'
    }, {
      num: '02',
      name: 'Islamweb.net',
      url: 'islamweb.net',
      why: 'Comprehensive fatawa database with multi-language support. Endorsed by major Islamic institutions.'
    }, {
      num: '03',
      name: 'Sunnah.com',
      url: 'sunnah.com',
      why: 'Digitised hadith collections with full Arabic and English — Bukhari, Muslim, and all six major collections.'
    }, {
      num: '04',
      name: 'Quran.com',
      url: 'quran.com',
      why: 'Multiple verified translations, tafsir, and Arabic text. Standard reference for Quranic citations.'
    }, {
      num: '05',
      name: 'SeekersGuidance.org',
      url: 'seekersguidance.org',
      why: 'Founded by Sh. Faraz Rabbani. Free courses and Q&A by traditionally trained scholars, focused on Western Muslim contexts.'
    }];
    const __returned__ = {
      DEBOUNCE_MS,
      SCROLL_OFFSET,
      searchQuery,
      searchResults,
      activeChapter,
      navEl,
      scrollProgress,
      showBackToTop,
      prefersReducedMotion,
      quizAnswer,
      get searchTimer() {
        return searchTimer;
      },
      set searchTimer(v) {
        searchTimer = v;
      },
      handleMotionPreference,
      handleScroll,
      updateActiveChapter,
      debouncedSearch,
      doSearch,
      scrollTo,
      scrollToTop,
      faqOpen,
      toggleFaq,
      copyDua,
      STORAGE_KEY,
      pollVote,
      castVote,
      currentScenarioIdx,
      currentScenario,
      quizFeedback,
      quizScore,
      quizDone,
      answerQuiz,
      nextScenario,
      resetQuiz,
      sources,
      heroStats,
      kpis,
      chapters,
      ch1Faqs,
      ch5Faqs,
      ch9Faqs,
      commSteps,
      strictParentsSteps,
      healingSteps,
      movingOutSteps,
      seekHelpSteps,
      trustSteps,
      conflictSituation,
      conflictScripts,
      conflictScript,
      cultureChecks,
      selectedCheck,
      angerLevel,
      angerAdvice,
      angerClass,
      duas,
      microTips,
      empathyTips,
      smallActions,
      habits,
      completedHabits,
      stories,
      userStory,
      storySubmitted,
      submitStory,
      scenarios,
      pollCounts,
      pollOptions,
      totalPollVotes,
      getPollPercent,
      wydSituations,
      wydAnswers,
      setWyd,
      resources,
      trustedSources,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      reactive: vue__WEBPACK_IMPORTED_MODULE_0__.reactive,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      onUnmounted: vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted,
      nextTick: vue__WEBPACK_IMPORTED_MODULE_0__.nextTick
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
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
  class: "ribbon",
  role: "banner"
};
const _hoisted_2 = {
  class: "ribbon-inner"
};
const _hoisted_3 = {
  class: "hero",
  "aria-labelledby": "hero-heading"
};
const _hoisted_4 = {
  class: "container"
};
const _hoisted_5 = {
  class: "hero-layout"
};
const _hoisted_6 = {
  class: "hero-content"
};
const _hoisted_7 = {
  class: "search-wrap"
};
const _hoisted_8 = {
  class: "search-field"
};
const _hoisted_9 = {
  key: 0,
  id: "search-results",
  class: "search-dropdown",
  role: "listbox",
  "aria-label": "Search results"
};
const _hoisted_10 = ["onClick", "onKeyup"];
const _hoisted_11 = {
  class: "search-item-icon",
  "aria-hidden": "true"
};
const _hoisted_12 = {
  class: "hero-stats",
  role: "list",
  "aria-label": "Guide statistics"
};
const _hoisted_13 = {
  class: "stat-num"
};
const _hoisted_14 = {
  class: "stat-label"
};
const _hoisted_15 = {
  class: "chapter-nav",
  ref: "navEl",
  "aria-label": "Chapter navigation",
  role: "navigation"
};
const _hoisted_16 = {
  class: "chapter-nav-track",
  role: "tablist"
};
const _hoisted_17 = ["onClick", "aria-selected", "aria-controls", "id"];
const _hoisted_18 = {
  class: "nav-pill-icon",
  "aria-hidden": "true"
};
const _hoisted_19 = {
  class: "nav-pill-label"
};
const _hoisted_20 = {
  id: "main-content",
  class: "page-main"
};
const _hoisted_21 = {
  class: "container"
};
const _hoisted_22 = {
  class: "kpi-mosaic",
  role: "region",
  "aria-label": "Key statistics"
};
const _hoisted_23 = {
  class: "kpi-inner"
};
const _hoisted_24 = {
  class: "kpi-num",
  "aria-label": "Number"
};
const _hoisted_25 = {
  class: "kpi-label"
};
const _hoisted_26 = {
  class: "kpi-deco",
  "aria-hidden": "true"
};
const _hoisted_27 = {
  class: "chapter",
  id: "ch1",
  "aria-labelledby": "ch1-title",
  tabindex: "-1"
};
const _hoisted_28 = {
  class: "faq-section"
};
const _hoisted_29 = ["onClick", "aria-expanded", "aria-controls", "id"];
const _hoisted_30 = ["id", "aria-labelledby"];
const _hoisted_31 = {
  class: "chapter",
  id: "ch2",
  "aria-labelledby": "ch2-title",
  tabindex: "-1"
};
const _hoisted_32 = {
  class: "cards-grid"
};
const _hoisted_33 = {
  class: "card"
};
const _hoisted_34 = {
  class: "step-flow"
};
const _hoisted_35 = {
  class: "step-num"
};
const _hoisted_36 = {
  class: "step-text"
};
const _hoisted_37 = {
  class: "card"
};
const _hoisted_38 = {
  class: "insight-list"
};
const _hoisted_39 = {
  class: "card"
};
const _hoisted_40 = {
  class: "tool-inner"
};
const _hoisted_41 = {
  key: 0,
  class: "script-panel mt-sm"
};
const _hoisted_42 = {
  class: "script-body"
};
const _hoisted_43 = {
  class: "chapter",
  id: "ch3",
  "aria-labelledby": "ch3-title",
  tabindex: "-1"
};
const _hoisted_44 = {
  class: "tool-block"
};
const _hoisted_45 = {
  class: "cc-grid",
  role: "radiogroup",
  "aria-label": "Select a practice to check"
};
const _hoisted_46 = ["onClick", "aria-checked"];
const _hoisted_47 = {
  class: "cc-label"
};
const _hoisted_48 = {
  key: 0,
  class: "cc-detail"
};
const _hoisted_49 = {
  class: "cc-source"
};
const _hoisted_50 = {
  class: "chapter",
  id: "ch4",
  "aria-labelledby": "ch4-title",
  tabindex: "-1"
};
const _hoisted_51 = {
  class: "cards-grid"
};
const _hoisted_52 = {
  class: "card"
};
const _hoisted_53 = {
  class: "step-flow"
};
const _hoisted_54 = {
  class: "step-num"
};
const _hoisted_55 = {
  class: "step-text"
};
const _hoisted_56 = {
  class: "tool-block"
};
const _hoisted_57 = {
  class: "anger-meter"
};
const _hoisted_58 = {
  class: "anger-track"
};
const _hoisted_59 = ["aria-valuenow"];
const _hoisted_60 = {
  class: "chapter",
  id: "ch5",
  "aria-labelledby": "ch5-title",
  tabindex: "-1"
};
const _hoisted_61 = {
  class: "cards-grid"
};
const _hoisted_62 = {
  class: "card"
};
const _hoisted_63 = {
  class: "step-flow"
};
const _hoisted_64 = {
  class: "step-num"
};
const _hoisted_65 = {
  class: "step-text"
};
const _hoisted_66 = {
  class: "faq-section"
};
const _hoisted_67 = ["onClick", "aria-expanded", "aria-controls", "id"];
const _hoisted_68 = ["id", "aria-labelledby"];
const _hoisted_69 = {
  class: "chapter",
  id: "ch8",
  "aria-labelledby": "ch8-title",
  tabindex: "-1"
};
const _hoisted_70 = {
  class: "cards-grid"
};
const _hoisted_71 = {
  class: "card"
};
const _hoisted_72 = {
  class: "step-flow"
};
const _hoisted_73 = {
  class: "step-num"
};
const _hoisted_74 = {
  class: "step-text"
};
const _hoisted_75 = {
  class: "chapter",
  id: "ch9",
  "aria-labelledby": "ch9-title",
  tabindex: "-1"
};
const _hoisted_76 = {
  class: "faq-section"
};
const _hoisted_77 = ["onClick", "aria-expanded", "aria-controls", "id"];
const _hoisted_78 = ["id", "aria-labelledby"];
const _hoisted_79 = {
  class: "chapter",
  id: "ch11",
  "aria-labelledby": "ch11-title",
  tabindex: "-1"
};
const _hoisted_80 = {
  class: "dua-gallery",
  role: "list",
  "aria-label": "Supplications for parents"
};
const _hoisted_81 = {
  class: "dua-arabic"
};
const _hoisted_82 = {
  class: "dua-translation"
};
const _hoisted_83 = {
  class: "dua-ref"
};
const _hoisted_84 = ["onClick", "aria-label"];
const _hoisted_85 = {
  class: "chapter",
  id: "ch12",
  "aria-labelledby": "ch12-title",
  tabindex: "-1"
};
const _hoisted_86 = {
  class: "cards-grid"
};
const _hoisted_87 = {
  class: "card"
};
const _hoisted_88 = {
  class: "step-flow"
};
const _hoisted_89 = {
  class: "step-num"
};
const _hoisted_90 = {
  class: "step-text"
};
const _hoisted_91 = {
  class: "chapter",
  id: "ch13",
  "aria-labelledby": "ch13-title",
  tabindex: "-1"
};
const _hoisted_92 = {
  class: "cards-grid"
};
const _hoisted_93 = {
  class: "card"
};
const _hoisted_94 = {
  class: "insight-list"
};
const _hoisted_95 = {
  class: "insight-emoji",
  "aria-hidden": "true"
};
const _hoisted_96 = {
  class: "card"
};
const _hoisted_97 = {
  class: "step-flow"
};
const _hoisted_98 = {
  class: "step-num"
};
const _hoisted_99 = {
  class: "step-text"
};
const _hoisted_100 = {
  class: "chapter",
  id: "ch14",
  "aria-labelledby": "ch14-title",
  tabindex: "-1"
};
const _hoisted_101 = {
  class: "micro-grid",
  role: "list",
  "aria-label": "Quick tips"
};
const _hoisted_102 = {
  class: "micro-emoji",
  "aria-hidden": "true"
};
const _hoisted_103 = {
  class: "micro-title"
};
const _hoisted_104 = {
  class: "micro-body"
};
const _hoisted_105 = {
  class: "tool-block mt-md"
};
const _hoisted_106 = {
  class: "habit-list",
  role: "group",
  "aria-label": "Daily habits checklist"
};
const _hoisted_107 = ["onUpdate:modelValue"];
const _hoisted_108 = {
  key: 0,
  class: "habit-reward"
};
const _hoisted_109 = {
  class: "habit-progress"
};
const _hoisted_110 = {
  class: "habit-bar-track",
  "aria-hidden": "true"
};
const _hoisted_111 = {
  class: "habit-score"
};
const _hoisted_112 = {
  key: 0
};
const _hoisted_113 = {
  class: "chapter",
  id: "ch15",
  "aria-labelledby": "ch15-title",
  tabindex: "-1"
};
const _hoisted_114 = {
  class: "stories-grid",
  role: "feed",
  "aria-label": "Real life stories"
};
const _hoisted_115 = {
  class: "story-title"
};
const _hoisted_116 = {
  class: "story-quote"
};
const _hoisted_117 = {
  class: "story-perspective"
};
const _hoisted_118 = {
  class: "story-source"
};
const _hoisted_119 = {
  class: "tool-block mt-md"
};
const _hoisted_120 = {
  key: 0,
  class: "success-msg",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_121 = {
  class: "chapter",
  id: "ch16",
  "aria-labelledby": "ch16-title",
  tabindex: "-1"
};
const _hoisted_122 = {
  class: "tool-block mb-md"
};
const _hoisted_123 = {
  key: 0
};
const _hoisted_124 = {
  class: "quiz-scenario",
  role: "status"
};
const _hoisted_125 = ["aria-label"];
const _hoisted_126 = ["aria-checked"];
const _hoisted_127 = ["aria-checked"];
const _hoisted_128 = ["aria-checked"];
const _hoisted_129 = {
  key: 0,
  class: "quiz-feedback",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_130 = {
  class: "quiz-done"
};
const _hoisted_131 = {
  class: "quiz-done-score"
};
const _hoisted_132 = {
  class: "tool-block mb-md"
};
const _hoisted_133 = {
  class: "poll-grid",
  role: "radiogroup",
  "aria-label": "Parental strictness poll"
};
const _hoisted_134 = ["onClick", "aria-checked"];
const _hoisted_135 = {
  class: "poll-bar-wrap",
  "aria-hidden": "true"
};
const _hoisted_136 = {
  class: "poll-pct"
};
const _hoisted_137 = {
  key: 0,
  class: "poll-note"
};
const _hoisted_138 = {
  class: "tool-block"
};
const _hoisted_139 = {
  class: "wyd-q"
};
const _hoisted_140 = ["aria-label"];
const _hoisted_141 = ["onClick", "aria-checked"];
const _hoisted_142 = {
  key: 0,
  class: "wyd-feedback",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_143 = {
  class: "chapter",
  id: "resources",
  "aria-labelledby": "resources-title",
  tabindex: "-1"
};
const _hoisted_144 = {
  class: "resources-grid",
  role: "list",
  "aria-label": "Recommended resources"
};
const _hoisted_145 = {
  class: "resource-icon",
  "aria-hidden": "true"
};
const _hoisted_146 = {
  class: "resource-name"
};
const _hoisted_147 = {
  class: "resource-desc"
};
const _hoisted_148 = {
  class: "resource-type"
};
const _hoisted_149 = {
  class: "sources-panel"
};
const _hoisted_150 = {
  class: "source-num",
  "aria-hidden": "true"
};
const _hoisted_151 = {
  class: "source-info"
};
const _hoisted_152 = {
  class: "source-name"
};
const _hoisted_153 = {
  class: "source-url"
};
const _hoisted_154 = {
  class: "source-why"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Root app container "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "app",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
      'reduced-motion': $setup.prefersReducedMotion
    })
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════════\n         SKIP LINK (Accessibility)\n    ════════════════════════════════════════════ "), _cache[109] || (_cache[109] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#main-content",
    class: "skip-link"
  }, " Skip to main content ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════════\n         DISCLAIMER RIBBON\n    ════════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Verified badge with decorative star hidden from screen readers "), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ribbon-verified",
    "aria-label": "Verified scholarly content"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "aria-hidden": "true"
  }, "✦"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Scholarly Verified ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Decorative divider "), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ribbon-divider",
    "aria-hidden": "true"
  }, " · ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source links rendered from array for maintainability "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sources, src => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      key: src,
      class: "ribbon-src"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(src), 1 /* TEXT */);
  }), 64 /* STABLE_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Decorative divider "), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ribbon-divider",
    "aria-hidden": "true"
  }, " · ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Disclaimer note "), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ribbon-note"
  }, " For personal matters, always consult a qualified scholar ", -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════════\n         HERO SECTION\n    ════════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Decorative lattice background "), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-lattice",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Decorative glow effect "), _cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-glow",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Content container "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero text content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Eyebrow label "), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-eyebrow"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "eyebrow-dot",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Islamic Connect · Youth Guide ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main heading with id for aria-labelledby "), _cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    id: "hero-heading",
    class: "hero-heading"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "heading-line"
  }, " A Guide to "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "heading-em"
  }, " Parenting in Islam "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "heading-line heading-sub"
  }, " for Western Muslim Youth ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Description paragraph "), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-desc"
  }, " Real talk. Real struggles. Real Islamic guidance — navigating family life grounded in authentic scholarship. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search component "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search icon SVG "), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    class: "search-icon",
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("circle", {
    cx: "8.5",
    cy: "8.5",
    r: "5.75",
    stroke: "currentColor",
    "stroke-width": "1.5"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M13 13l3.5 3.5",
    stroke: "currentColor",
    "stroke-width": "1.5",
    "stroke-linecap": "round"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search input with accessibility attributes "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "search-input",
    type: "search",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $setup.searchQuery = $event),
    placeholder: "Search… 'strict parents', 'marriage', 'boundaries'",
    onKeyup: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($setup.doSearch, ["enter"]),
    onInput: $setup.debouncedSearch,
    "aria-label": "Search chapters",
    "aria-controls": "search-results",
    "aria-autocomplete": "list",
    autocomplete: "off"
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "search-btn",
    onClick: $setup.doSearch,
    "aria-label": "Execute search",
    type: "button"
  }, " Search ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search results dropdown "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.searchResults.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.searchResults, r => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: r.id,
        class: "search-item",
        onClick: $event => $setup.scrollTo(r.id),
        onKeyup: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)($event => $setup.scrollTo(r.id), ["enter"]),
        role: "option",
        tabindex: "0"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.short), 1 /* TEXT */)], 40 /* PROPS, NEED_HYDRATION */, _hoisted_10);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero statistics "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.heroStats, s => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: s.label,
      class: "stat",
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.label), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero visual (decorative, hidden from screen readers) "), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-visual\" aria-hidden=\"true\" data-v-1431ac10><!-- Islamic geometric pattern container --><div class=\"islamic-geometry-wrap\" data-v-1431ac10><!-- SVG geometric pattern --><svg class=\"geometric-star\" viewBox=\"0 0 340 340\" xmlns=\"http://www.w3.org/2000/svg\" data-v-1431ac10><defs data-v-1431ac10><!-- Radial gradient for glow effect --><radialGradient id=\"starGrad\" cx=\"50%\" cy=\"50%\" r=\"50%\" data-v-1431ac10><stop offset=\"0%\" stop-color=\"var(--gold-200)\" stop-opacity=\"0.25\" data-v-1431ac10></stop><stop offset=\"100%\" stop-color=\"var(--forest-800)\" stop-opacity=\"0\" data-v-1431ac10></stop></radialGradient></defs><!-- Outer decorative rings --><circle cx=\"170\" cy=\"170\" r=\"160\" fill=\"none\" stroke=\"rgba(212,160,23,0.12)\" stroke-width=\"1\" data-v-1431ac10></circle><circle cx=\"170\" cy=\"170\" r=\"130\" fill=\"none\" stroke=\"rgba(212,160,23,0.08)\" stroke-width=\"1\" data-v-1431ac10></circle><!-- Islamic 8-point star (Rub el Hizb) --><g stroke=\"rgba(212,160,23,0.3)\" stroke-width=\"1.5\" fill=\"none\" data-v-1431ac10><polygon points=\"170,20 220,130 320,170 220,210 170,320 120,210 20,170 120,130\" data-v-1431ac10></polygon><polygon points=\"170,50 200,120 280,170 200,220 170,290 140,220 60,170 140,120\" data-v-1431ac10></polygon></g><!-- Arabesque cross lines --><g stroke=\"rgba(255,255,255,0.05)\" stroke-width=\"0.75\" fill=\"none\" data-v-1431ac10><line x1=\"170\" y1=\"20\" x2=\"170\" y2=\"320\" data-v-1431ac10></line><line x1=\"20\" y1=\"170\" x2=\"320\" y2=\"170\" data-v-1431ac10></line><line x1=\"58\" y1=\"58\" x2=\"282\" y2=\"282\" data-v-1431ac10></line><line x1=\"282\" y1=\"58\" x2=\"58\" y2=\"282\" data-v-1431ac10></line></g><!-- Center circle with glow --><circle cx=\"170\" cy=\"170\" r=\"42\" fill=\"rgba(212,160,23,0.07)\" stroke=\"rgba(212,160,23,0.35)\" stroke-width=\"1.5\" data-v-1431ac10></circle><circle cx=\"170\" cy=\"170\" r=\"8\" fill=\"var(--gold-200)\" opacity=\"0.6\" data-v-1431ac10></circle><!-- Decorative corner dots --><circle cx=\"170\" cy=\"20\" r=\"3\" fill=\"var(--gold-200)\" opacity=\"0.5\" data-v-1431ac10></circle><circle cx=\"320\" cy=\"170\" r=\"3\" fill=\"var(--gold-200)\" opacity=\"0.5\" data-v-1431ac10></circle><circle cx=\"170\" cy=\"320\" r=\"3\" fill=\"var(--gold-200)\" opacity=\"0.5\" data-v-1431ac10></circle><circle cx=\"20\" cy=\"170\" r=\"3\" fill=\"var(--gold-200)\" opacity=\"0.5\" data-v-1431ac10></circle></svg><!-- Central photo ring --><div class=\"hero-photo-ring\" data-v-1431ac10><img src=\"https://images.pexels.com/photos/7869025/pexels-photo-7869025.jpeg?auto=compress&amp;w=600\" alt=\"Muslim family sitting together in warm lighting\" loading=\"lazy\" decoding=\"async\" width=\"200\" height=\"200\" data-v-1431ac10></div></div></div>", 1))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════════\n         STICKY NAVIGATION\n    ════════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Horizontal scrollable track "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.chapters, ch => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      key: ch.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-pill", {
        active: $setup.activeChapter === ch.id
      }]),
      onClick: $event => $setup.scrollTo(ch.id),
      role: "tab",
      "aria-selected": $setup.activeChapter === ch.id,
      "aria-controls": ch.id,
      id: `tab-${ch.id}`,
      type: "button"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ch.short), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_17);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Scroll progress indicator "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "nav-progress",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $setup.scrollProgress + '%'
    }),
    "aria-hidden": "true"
  }, null, 4 /* STYLE */)], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════════\n         MAIN CONTENT\n    ════════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("main", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             KPI MOSAIC\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.kpis, k => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: k.label,
      class: "kpi-tile",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`--accent:${k.color}`)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k.label), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(k.deco), 1 /* TEXT */)], 4 /* STYLE */);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 1: FOUNDATIONS\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter header "), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🏛️ </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 01</div><h2 id=\"ch1-title\" class=\"chapter-title\" data-v-1431ac10> Foundations of Parenting in Islam </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Cards grid "), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"cards-grid\" data-v-1431ac10><!-- Card: Rights of Parents --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line gold\" data-v-1431ac10></div><h3 data-v-1431ac10>Rights of Parents</h3><p data-v-1431ac10> Allah commands honouring parents immediately after Tawheed — placing this duty second only to worshipping Him alone. </p><figure class=\"quran-verse\" data-v-1431ac10><blockquote class=\"verse-arabic\" data-v-1431ac10> وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا </blockquote><figcaption class=\"verse-ref\" data-v-1431ac10> Surah Al-Isra 17:23 · Quran.com </figcaption></figure><div class=\"callout-tip\" data-v-1431ac10><span class=\"callout-icon\" aria-hidden=\"true\" data-v-1431ac10> 📌 </span><span data-v-1431ac10> The Prophet ﷺ was asked who deserves best companionship three times — each time he said &quot;your mother,&quot; then &quot;your father.&quot; <cite data-v-1431ac10>(Sahih Bukhari 5971)</cite></span></div></div><!-- Card: Obedience &amp; Limits --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line green\" data-v-1431ac10></div><h3 data-v-1431ac10>Obedience &amp; Its Limits</h3><p data-v-1431ac10> Obedience to parents is obligatory <strong data-v-1431ac10>except</strong> when they command disobedience to Allah. </p><figure class=\"hadith-card\" data-v-1431ac10><blockquote class=\"hadith-text\" data-v-1431ac10> &quot;There is no obedience to creation in disobedience to the Creator.&quot; </blockquote><figcaption class=\"hadith-ref\" data-v-1431ac10> Musnad Ahmad · Sunnah.com </figcaption></figure><div class=\"dos-donts\" data-v-1431ac10><div class=\"dd-col do\" data-v-1431ac10><div class=\"dd-head\" data-v-1431ac10>✅ Do</div><ul data-v-1431ac10><li data-v-1431ac10>Obey in permissible matters</li><li data-v-1431ac10>Explain concerns calmly</li><li data-v-1431ac10>Seek scholarly mediation</li><li data-v-1431ac10>Make du&#39;a for them</li></ul></div><div class=\"dd-col dont\" data-v-1431ac10><div class=\"dd-head\" data-v-1431ac10>✗ Don&#39;t</div><ul data-v-1431ac10><li data-v-1431ac10>Obey in clear haram</li><li data-v-1431ac10>Be rude in refusal</li><li data-v-1431ac10>Publicly shame them</li><li data-v-1431ac10>Cut off family ties</li></ul></div></div></div><!-- Card: Ihsan (full width) --><div class=\"card card-full\" data-v-1431ac10><div class=\"card-header-line amber\" data-v-1431ac10></div><div class=\"ihsan-layout\" data-v-1431ac10><div data-v-1431ac10><h3 data-v-1431ac10>Ihsan — Excellence in Family Life</h3><p data-v-1431ac10><em data-v-1431ac10>Ihsan</em> means going beyond the minimum — showing genuine love, care, and kindness even when it is difficult. The Quran instructs us not to even say &quot;uff&quot; to parents. <cite data-v-1431ac10>(Surah Al-Isra 17:23)</cite></p><figure class=\"hadith-card mt-sm\" data-v-1431ac10><blockquote class=\"hadith-text\" data-v-1431ac10> &quot;Actions are by intentions.&quot; Every act of kindness at home, done for Allah&#39;s sake, is an act of worship. </blockquote><figcaption class=\"hadith-ref\" data-v-1431ac10> Sahih Bukhari 1 · Sunnah.com </figcaption></figure><div class=\"insight-pill\" data-v-1431ac10> 💡 Reframe difficult moments: &quot;I&#39;m doing this for Allah, not just for them.&quot; </div></div><div class=\"ihsan-image\" data-v-1431ac10><img src=\"https://images.pexels.com/photos/7869025/pexels-photo-7869025.jpeg?auto=compress&amp;w=600\" alt=\"Muslim family spending quality time together\" loading=\"lazy\" decoding=\"async\" width=\"400\" height=\"200\" data-v-1431ac10></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source attribution "), _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>Quran.com (17:23)</span><span class=\"source-tag\" data-v-1431ac10>Sunnah.com (Bukhari 5971, 1)</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "faq-heading",
    id: "ch1-faq-heading"
  }, " Frequently Asked Questions ", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.ch1Faqs, (f, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: i,
      class: "faq-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "faq-question",
      onClick: $event => $setup.toggleFaq('ch1', i),
      "aria-expanded": $setup.faqOpen['ch1_' + i] ? 'true' : 'false',
      "aria-controls": `faq-answer-ch1-${i}`,
      id: `faq-question-ch1-${i}`,
      type: "button"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.q), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-chevron", {
        open: $setup.faqOpen['ch1_' + i]
      }]),
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true"
    }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M4 6l4 4 4-4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1 /* CACHED */)]))], 2 /* CLASS */))], 8 /* PROPS */, _hoisted_29), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "slide"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.faqOpen['ch1_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        class: "faq-answer",
        id: `faq-answer-ch1-${i}`,
        role: "region",
        "aria-labelledby": `faq-question-ch1-${i}`
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.a), 9 /* TEXT, PROPS */, _hoisted_30)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 2: COMMUNICATION\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_31, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 💬 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 02</div><h2 id=\"ch2-title\" class=\"chapter-title\" data-v-1431ac10> Communication with Parents </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Noble Speech "), _cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card\" data-v-1431ac10><div class=\"card-header-line gold\" data-v-1431ac10></div><h3 data-v-1431ac10>Qawlan Kariman — Noble Speech</h3><p data-v-1431ac10> The Quran instructs us to speak to parents with <em data-v-1431ac10>qawlan kariman</em> — dignified, gentle speech. <cite data-v-1431ac10>(Surah Al-Isra 17:23)</cite></p><figure class=\"script-panel\" data-v-1431ac10><figcaption class=\"script-eyebrow\" data-v-1431ac10>Practical Script</figcaption><blockquote class=\"script-body\" data-v-1431ac10> &quot;Baba/Mama, I want to talk about something important. Can we find a good time? I want to understand your view and share mine respectfully.&quot; </blockquote></figure></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Handling Disagreements "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line green"
  }, null, -1 /* CACHED */)), _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Handling Disagreements", -1 /* CACHED */)), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Prophetic remedies for anger when conflict arises: "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "(IslamQA.info)")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_34, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.commSteps, (s, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      key: i,
      class: "step"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: When They Don't Understand "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line amber"
  }, null, -1 /* CACHED */)), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "When They Don't Understand", -1 /* CACHED */)), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Their resistance usually comes from love and fear, not malice. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "(SeekersGuidance.org)")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_38, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.empathyTips, t => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      key: t,
      class: "insight-row"
    }, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "insight-dot",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(t), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Conflict Phrase Generator "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line green"
  }, null, -1 /* CACHED */)), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Conflict Phrase Generator", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "conflict-select",
    class: "visually-hidden"
  }, " Choose a situation ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "conflict-select",
    class: "styled-select",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $setup.conflictSituation = $event)
  }, [...(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\" data-v-1431ac10>— Choose a situation —</option><option value=\"curfew\" data-v-1431ac10>Parents set an early curfew</option><option value=\"career\" data-v-1431ac10>Parents push a specific career</option><option value=\"friends\" data-v-1431ac10>Parents disapprove of your friends</option><option value=\"marriage\" data-v-1431ac10>Parents want to rush marriage</option>", 5)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.conflictSituation]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.conflictScript ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("figure", _hoisted_41, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("figcaption", {
      class: "script-eyebrow"
    }, "Suggested Phrasing", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("blockquote", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.conflictScript), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>Quran.com (17:23)</span><span class=\"source-tag\" data-v-1431ac10>IslamQA.info</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 3: CULTURE VS ISLAM\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_43, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> ⚖️ </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 03</div><h2 id=\"ch3-title\" class=\"chapter-title\" data-v-1431ac10> Culture vs. Islam </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Comparison block "), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"compare-block\" data-v-1431ac10><div class=\"compare-col culture-col\" data-v-1431ac10><h3 class=\"compare-head\" data-v-1431ac10>Cultural Norms</h3><ul data-v-1431ac10><li data-v-1431ac10>Honour/shame-based decisions</li><li data-v-1431ac10>&quot;What will people say?&quot;</li><li data-v-1431ac10>Gender double-standards</li><li data-v-1431ac10>Forced career paths</li><li data-v-1431ac10>Marriage restricted to tribe/village</li></ul></div><div class=\"compare-vs\" data-v-1431ac10><div class=\"vs-inner\" aria-hidden=\"true\" data-v-1431ac10> VS </div></div><div class=\"compare-col islam-col\" data-v-1431ac10><h3 class=\"compare-head\" data-v-1431ac10>Islamic Teachings</h3><ul data-v-1431ac10><li data-v-1431ac10>Decisions based on taqwa, not shame</li><li data-v-1431ac10>Allah&#39;s pleasure over people&#39;s opinions</li><li data-v-1431ac10>Equal accountability for all</li><li data-v-1431ac10>Consultation &amp; choice in career</li><li data-v-1431ac10>Piety as the basis for marriage</li></ul></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Culture check tool "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, " 🔍 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Culture Check: Is It Islam or Culture?")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.cultureChecks, item => {
    var _$setup$selectedCheck, _$setup$selectedCheck2;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      key: item.label,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["cc-item", {
        selected: ((_$setup$selectedCheck = $setup.selectedCheck) === null || _$setup$selectedCheck === void 0 ? void 0 : _$setup$selectedCheck.label) === item.label
      }]),
      onClick: $event => $setup.selectedCheck = item,
      "aria-checked": ((_$setup$selectedCheck2 = $setup.selectedCheck) === null || _$setup$selectedCheck2 === void 0 ? void 0 : _$setup$selectedCheck2.label) === item.label,
      role: "radio"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["cc-badge", item.type.toLowerCase()])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.type), 3 /* TEXT, CLASS */)], 10 /* CLASS, PROPS */, _hoisted_46);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "slide"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.selectedCheck ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedCheck.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedCheck.detail), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, " Source: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedCheck.source), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>IslamQA.info</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span><span class=\"source-tag\" data-v-1431ac10>Islamweb.net</span></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 4: CONFLICT\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_50, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 😤 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 04</div><h2 id=\"ch4-title\" class=\"chapter-title\" data-v-1431ac10> Conflict &amp; Arguments </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Anger in Islam "), _cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card\" data-v-1431ac10><div class=\"card-header-line gold\" data-v-1431ac10></div><h3 data-v-1431ac10>What Islam Says About Anger</h3><figure class=\"hadith-card\" data-v-1431ac10><blockquote class=\"hadith-text\" data-v-1431ac10> &quot;The strong person is not the one who can wrestle someone down, but the one who controls himself when angry.&quot; </blockquote><figcaption class=\"hadith-ref\" data-v-1431ac10> Sahih Bukhari 6114 · Sunnah.com </figcaption></figure></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Strict Parents "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line green"
  }, null, -1 /* CACHED */)), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Dealing with Strict Parents", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_53, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.strictParentsSteps, (s, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      key: i,
      class: "step"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Anger meter tool "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, " 🎚️ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Anger Level Check-In — Before You Respond")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "anger-slider",
    class: "visually-hidden"
  }, " Rate your anger level from 1 to 10 ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "anger-slider",
    type: "range",
    min: "1",
    max: "10",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.angerLevel = $event),
    class: "anger-slider",
    "aria-valuemin": "1",
    "aria-valuemax": "10",
    "aria-valuenow": $setup.angerLevel,
    "aria-label": "Anger level"
  }, null, 8 /* PROPS */, _hoisted_59), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.angerLevel]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "anger-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`width:${($setup.angerLevel - 1) / 9 * 100}%`),
    "aria-hidden": "true"
  }, null, 4 /* STYLE */)]), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "anger-labels"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Calm (1)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Moderate (5)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Very Angry (10)")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["anger-result", $setup.angerClass]),
    role: "status",
    "aria-live": "polite"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.angerAdvice), 3 /* TEXT, CLASS */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-bar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-label"
  }, "Sources"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-tag"
  }, "Sunnah.com (Bukhari 6114)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-tag"
  }, "SeekersGuidance.org")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 5: EMOTIONAL STRUGGLES\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_60, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> ❤️ </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 05</div><h2 id=\"ch5-title\" class=\"chapter-title\" data-v-1431ac10> Emotional Struggles with Parents </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Feeling Unloved "), _cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Feeling Unloved or Unappreciated"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, " Many Muslim parents express love through provision and protection, not verbal affirmation. Your emotional need for acknowledgment is valid in Islam too. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "insight-pill"
  }, " 💚 Allah knows what is in all hearts — seek His acknowledgment first. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Pressure "), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card\" data-v-1431ac10><div class=\"card-header-line amber\" data-v-1431ac10></div><h3 data-v-1431ac10>Pressure Beyond Capacity</h3><figure class=\"quran-verse\" data-v-1431ac10><blockquote class=\"verse-arabic\" data-v-1431ac10> لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا </blockquote><figcaption class=\"verse-ref\" data-v-1431ac10> Surah Al-Baqarah 2:286 · Quran.com </figcaption></figure><p class=\"small-note\" data-v-1431ac10> &quot;Allah does not burden a soul beyond what it can bear.&quot; — Use this as an anchor when pressure feels overwhelming. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Healing "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line green"
  }, null, -1 /* CACHED */)), _cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Healing the Relationship", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_63, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.healingSteps, (s, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      key: i,
      class: "step"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_64, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_65, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Sibling Comparison "), _cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Sibling Comparison"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" The Prophet ﷺ warned against partiality among children. Your worth is determined by your "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "taqwa"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(", not grades or status. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "(IslamQA.info)")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "callout-tip"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "callout-icon",
    "aria-hidden": "true"
  }, " 💡 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "\"My worth is with Allah, not in comparison to anyone else.\"")])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "faq-heading"
  }, "Frequently Asked Questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.ch5Faqs, (f, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: i,
      class: "faq-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "faq-question",
      onClick: $event => $setup.toggleFaq('ch5', i),
      "aria-expanded": $setup.faqOpen['ch5_' + i] ? 'true' : 'false',
      "aria-controls": `faq-answer-ch5-${i}`,
      id: `faq-question-ch5-${i}`,
      type: "button"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.q), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-chevron", {
        open: $setup.faqOpen['ch5_' + i]
      }]),
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true"
    }, [...(_cache[55] || (_cache[55] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M4 6l4 4 4-4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1 /* CACHED */)]))], 2 /* CLASS */))], 8 /* PROPS */, _hoisted_67), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "slide"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.faqOpen['ch5_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        class: "faq-answer",
        id: `faq-answer-ch5-${i}`,
        role: "region",
        "aria-labelledby": `faq-question-ch5-${i}`
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.a), 9 /* TEXT, PROPS */, _hoisted_68)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>Quran.com (2:286)</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span><span class=\"source-tag\" data-v-1431ac10>IslamQA.info</span></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 6: BOUNDARIES\n        ════════════════════════════════════════ "), _cache[105] || (_cache[105] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"chapter\" id=\"ch6\" aria-labelledby=\"ch6-title\" tabindex=\"-1\" data-v-1431ac10><div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🧠 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 06</div><h2 id=\"ch6-title\" class=\"chapter-title\" data-v-1431ac10> Boundaries in Islam </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div><div class=\"cards-grid three-col\" data-v-1431ac10><!-- Card: Saying No --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line gold\" data-v-1431ac10></div><h3 data-v-1431ac10>Is It Allowed to Say No?</h3><p data-v-1431ac10> Yes — obedience to parents is not unconditional. You may decline requests that are sinful, harmful, or beyond your capacity. The key is <em data-v-1431ac10>how</em> you decline: with respect. <cite data-v-1431ac10>(IslamQA.info)</cite></p></div><!-- Card: Privacy --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line green\" data-v-1431ac10></div><h3 data-v-1431ac10>Privacy &amp; Independence</h3><p data-v-1431ac10> Islam recognises <em data-v-1431ac10>awra</em> (privacy) and individual accountability. Adults are responsible for their own deeds before Allah. Parents may guide but cannot control every adult decision. <cite data-v-1431ac10>(SeekersGuidance.org)</cite></p></div><!-- Card: Toxic Treatment --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line amber\" data-v-1431ac10></div><h3 data-v-1431ac10>Toxic or Unfair Treatment</h3><figure class=\"hadith-card\" data-v-1431ac10><blockquote class=\"hadith-text\" data-v-1431ac10> &quot;There is no harm and no causing harm.&quot; </blockquote><figcaption class=\"hadith-ref\" data-v-1431ac10> Ibn Majah 2341 · Sunnah.com </figcaption></figure><div class=\"callout-warn\" data-v-1431ac10> ⚠️ Enduring harmful treatment in silence is not required by Islam. Seek help. </div></div></div><!-- Source bar --><div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>Sunnah.com (Ibn Majah 2341)</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span><span class=\"source-tag\" data-v-1431ac10>IslamQA.info</span></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 7: WESTERN SOCIETY\n        ════════════════════════════════════════ "), _cache[106] || (_cache[106] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"chapter\" id=\"ch7\" aria-labelledby=\"ch7-title\" tabindex=\"-1\" data-v-1431ac10><div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🌍 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 07</div><h2 id=\"ch7-title\" class=\"chapter-title\" data-v-1431ac10> Growing Up in Western Society </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div><div class=\"cards-grid\" data-v-1431ac10><!-- Card: Double Identity --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line gold\" data-v-1431ac10></div><h3 data-v-1431ac10>The Double Identity</h3><p data-v-1431ac10> Many Western Muslim youth feel torn between two worlds. This &quot;double life&quot; feeling is common and does not make you a bad Muslim. <cite data-v-1431ac10>(SeekersGuidance.org)</cite></p><div class=\"insight-pill\" data-v-1431ac10> 🌟 Your Muslim identity is not threatened by living in the West — it is tested and strengthened. </div></div><!-- Card: Freedom vs Protection --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line green\" data-v-1431ac10></div><h3 data-v-1431ac10>Freedom vs Protection</h3><p data-v-1431ac10> Parents in the West often over-protect out of fear of the environment. The Prophet ﷺ gave companions independence as they demonstrated responsibility. <cite data-v-1431ac10>(SeekersGuidance.org)</cite></p><div class=\"callout-tip\" data-v-1431ac10><span class=\"callout-icon\" aria-hidden=\"true\" data-v-1431ac10> 💡 </span><span data-v-1431ac10>&quot;I am Muslim first — that doesn&#39;t change based on geography.&quot;</span></div></div></div><!-- Source bar --><div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span><span class=\"source-tag\" data-v-1431ac10>Yaqeen Institute</span></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 8: CAREER\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_69, [_cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 📚 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 08</div><h2 id=\"ch8-title\" class=\"chapter-title\" data-v-1431ac10> Education, Career &amp; Life Choices </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Forced Careers "), _cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Parents Forcing Careers"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Parental influence is permissible as guidance — not compulsion. Islam upholds "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("em", null, "shura"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (consultation) and individual accountability. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "(IslamQA.info)")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Excellence "), _cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card\" data-v-1431ac10><div class=\"card-header-line green\" data-v-1431ac10></div><h3 data-v-1431ac10>Pursuing Excellence (Itqan)</h3><figure class=\"hadith-card\" data-v-1431ac10><blockquote class=\"hadith-text\" data-v-1431ac10> &quot;Allah loves that when one of you does a job, they do it with excellence (itqan).&quot; </blockquote><figcaption class=\"hadith-ref\" data-v-1431ac10> Al-Bayhaqi · IslamQA.info </figcaption></figure></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Moving Out "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line amber"
  }, null, -1 /* CACHED */)), _cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Moving Out for Study/Work", -1 /* CACHED */)), _cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Moving out for legitimate reasons is permissible. Maintaining ties — regular calls, visits, support if able — remains obligatory. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "(SeekersGuidance.org)")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_72, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.movingOutSteps, (s, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      key: i,
      class: "step"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_73, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Istikhara "), _cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Istikhara — Seeking Allah's Guidance"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" For major decisions, perform Salah al-Istikhara and make sincere du'a. Submit the decision to Allah and move forward with tawakkul. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "(Sunnah.com)")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "insight-pill"
  }, " 🤲 Guide: Sunnah.com — search \"Salat al-Istikhara\" ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>IslamQA.info</span><span class=\"source-tag\" data-v-1431ac10>Sunnah.com</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 9: MARRIAGE\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_75, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 💑 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 09</div><h2 id=\"ch9-title\" class=\"chapter-title\" data-v-1431ac10> Marriage &amp; Relationships </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div><div class=\"cards-grid\" data-v-1431ac10><!-- Card: Right to Consent --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line gold\" data-v-1431ac10></div><h3 data-v-1431ac10>Islamic Right to Consent</h3><p data-v-1431ac10> No valid marriage exists without consent from both parties. A wali (guardian) has a protective role, not a possessive one. <cite data-v-1431ac10>(IslamQA.info)</cite></p><figure class=\"hadith-card\" data-v-1431ac10><blockquote class=\"hadith-text\" data-v-1431ac10> &quot;A woman who has been previously married has more right to decide about herself than her guardian, and a virgin&#39;s consent must be sought.&quot; </blockquote><figcaption class=\"hadith-ref\" data-v-1431ac10> Sahih Muslim 1421 · Sunnah.com </figcaption></figure></div><!-- Card: Cultural Barriers --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line green\" data-v-1431ac10></div><h3 data-v-1431ac10>Cultural Barriers to Marriage</h3><figure class=\"hadith-card\" data-v-1431ac10><blockquote class=\"hadith-text\" data-v-1431ac10> &quot;If someone comes to you whose deen and character pleases you, then marry him.&quot; </blockquote><figcaption class=\"hadith-ref\" data-v-1431ac10> Tirmidhi 1084 · Sunnah.com </figcaption></figure><div class=\"callout-warn\" data-v-1431ac10> ⚠️ Tribal pride is explicitly criticised as a remnant of ignorance in Islamic scholarship. </div></div><!-- Card: Talking to Parents (full width) --><div class=\"card card-full\" data-v-1431ac10><div class=\"card-header-line amber\" data-v-1431ac10></div><h3 data-v-1431ac10>Talking to Parents About Relationships</h3><figure class=\"script-panel\" data-v-1431ac10><figcaption class=\"script-eyebrow\" data-v-1431ac10>Opening Script</figcaption><blockquote class=\"script-body\" data-v-1431ac10> &quot;Baba/Mama, I&#39;ve met someone I believe would be a good spouse based on their deen and character. I&#39;d like to discuss this with you and follow the proper Islamic process.&quot; </blockquote></figure><div class=\"dos-donts mt-sm\" data-v-1431ac10><div class=\"dd-col do\" data-v-1431ac10><div class=\"dd-head\" data-v-1431ac10>✅ Do</div><ul data-v-1431ac10><li data-v-1431ac10>Be transparent early</li><li data-v-1431ac10>Involve a trusted elder</li><li data-v-1431ac10>Follow Islamic steps</li></ul></div><div class=\"dd-col dont\" data-v-1431ac10><div class=\"dd-head\" data-v-1431ac10>✗ Don&#39;t</div><ul data-v-1431ac10><li data-v-1431ac10>Hide a relationship</li><li data-v-1431ac10>Meet in private (khalwa)</li><li data-v-1431ac10>Issue ultimatums</li></ul></div></div></div></div>", 2)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "faq-heading"
  }, "Frequently Asked Questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.ch9Faqs, (f, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: i,
      class: "faq-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "faq-question",
      onClick: $event => $setup.toggleFaq('ch9', i),
      "aria-expanded": $setup.faqOpen['ch9_' + i] ? 'true' : 'false',
      "aria-controls": `faq-answer-ch9-${i}`,
      id: `faq-question-ch9-${i}`,
      type: "button"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.q), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("svg", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-chevron", {
        open: $setup.faqOpen['ch9_' + i]
      }]),
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true"
    }, [...(_cache[67] || (_cache[67] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M4 6l4 4 4-4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round"
    }, null, -1 /* CACHED */)]))], 2 /* CLASS */))], 8 /* PROPS */, _hoisted_77), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "slide"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.faqOpen['ch9_' + i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        class: "faq-answer",
        id: `faq-answer-ch9-${i}`,
        role: "region",
        "aria-labelledby": `faq-question-ch9-${i}`
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(f.a), 9 /* TEXT, PROPS */, _hoisted_78)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>Sunnah.com (Muslim 1421, Tirmidhi 1084)</span><span class=\"source-tag\" data-v-1431ac10>IslamQA.info</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 10: PRACTISING ISLAM\n        ════════════════════════════════════════ "), _cache[107] || (_cache[107] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<section class=\"chapter\" id=\"ch10\" aria-labelledby=\"ch10-title\" tabindex=\"-1\" data-v-1431ac10><div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🕌 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 10</div><h2 id=\"ch10-title\" class=\"chapter-title\" data-v-1431ac10> Practising Islam with Parents </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div><div class=\"cards-grid\" data-v-1431ac10><!-- Card: Less Practising Parents --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line gold\" data-v-1431ac10></div><h3 data-v-1431ac10>When Parents Are Less Practising</h3><p data-v-1431ac10> This is a test — not an excuse to be arrogant. You cannot force hidaya — only Allah guides hearts. The Prophet ﷺ always used gentleness and sincere love. </p><div class=\"insight-pill\" data-v-1431ac10> 💡 Your job is to be an example, not a preacher in your own home. </div></div><!-- Card: Becoming More Practising --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line green\" data-v-1431ac10></div><h3 data-v-1431ac10>When You Become More Practising</h3><div class=\"dos-donts\" data-v-1431ac10><div class=\"dd-col do\" data-v-1431ac10><div class=\"dd-head\" data-v-1431ac10>✅ Do</div><ul data-v-1431ac10><li data-v-1431ac10>Lead by action and character</li><li data-v-1431ac10>Make du&#39;a for their guidance</li><li data-v-1431ac10>Share knowledge gently if asked</li></ul></div><div class=\"dd-col dont\" data-v-1431ac10><div class=\"dd-head\" data-v-1431ac10>✗ Don&#39;t</div><ul data-v-1431ac10><li data-v-1431ac10>Lecture at every opportunity</li><li data-v-1431ac10>Look down on their level</li><li data-v-1431ac10>Use religion as a weapon</li></ul></div></div></div></div><!-- Source bar --><div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>SeekersGuidance.org</span><span class=\"source-tag\" data-v-1431ac10>IslamQA.info</span></div></section>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 11: DU'AS\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_79, [_cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🤲 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 11</div><h2 id=\"ch11-title\" class=\"chapter-title\" data-v-1431ac10> Du&#39;as &amp; Spiritual Approach </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Du'a gallery "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.duas, d => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: d.ref,
      class: "dua-tile",
      role: "listitem"
    }, [_cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "dua-ornament",
      "aria-hidden": "true"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 60 12",
      fill: "none"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M0 6 Q15 0 30 6 Q45 12 60 6",
      stroke: "rgba(212,160,23,0.4)",
      "stroke-width": "1",
      fill: "none"
    })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("blockquote", _hoisted_81, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_82, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", _hoisted_83, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d.ref), 1 /* TEXT */), _cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "dua-ornament flip",
      "aria-hidden": "true"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 60 12",
      fill: "none"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M0 6 Q15 0 30 6 Q45 12 60 6",
      stroke: "rgba(212,160,23,0.4)",
      "stroke-width": "1",
      fill: "none"
    })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "dua-copy",
      onClick: $event => $setup.copyDua(d),
      "aria-label": d.copied ? 'Copied to clipboard' : 'Copy supplication',
      type: "button"
    }, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      width: "13",
      height: "13",
      "aria-hidden": "true"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("rect", {
      x: "5",
      y: "5",
      width: "9",
      height: "9",
      rx: "1.5",
      stroke: "currentColor",
      "stroke-width": "1.3"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M3 9H2a1 1 0 01-1-1V2a1 1 0 011-1h6a1 1 0 011 1v1",
      stroke: "currentColor",
      "stroke-width": "1.3"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(d.copied ? 'Copied ✓' : 'Copy'), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_84)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Additional cards "), _cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"cards-grid mt-md\" data-v-1431ac10><!-- Card: Sabr --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line gold\" data-v-1431ac10></div><h3 data-v-1431ac10>Sabr — Active Patience</h3><figure class=\"quran-verse\" data-v-1431ac10><blockquote class=\"verse-arabic\" data-v-1431ac10> إِنَّ اللَّهَ مَعَ الصَّابِرِينَ </blockquote><figcaption class=\"verse-ref\" data-v-1431ac10> Surah Al-Baqarah 2:153 · Quran.com </figcaption></figure></div><!-- Card: Barakah --><div class=\"card\" data-v-1431ac10><div class=\"card-header-line green\" data-v-1431ac10></div><h3 data-v-1431ac10>Barakah Through Parents</h3><p data-v-1431ac10> The Prophet ﷺ said that honouring parents and maintaining family ties increases barakah and provision. <cite data-v-1431ac10>(Sahih Bukhari 5986)</cite></p><div class=\"insight-pill\" data-v-1431ac10> 🌟 Barakah is unlocked through parental du&#39;a for you. </div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[76] || (_cache[76] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-bar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-label"
  }, "Sources"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-tag"
  }, "Quran.com (2:153)"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-tag"
  }, "Sunnah.com (Bukhari 5986)")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 12: DIFFICULT SITUATIONS\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_85, [_cache[80] || (_cache[80] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🔒 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 12</div><h2 id=\"ch12-title\" class=\"chapter-title\" data-v-1431ac10> Difficult &amp; Sensitive Situations </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Emergency alert "), _cache[81] || (_cache[81] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "alert-banner",
    role: "alert"
  }, " ⚠️ If you are in immediate danger, contact emergency services. For Islamic support, reach out to a trusted imam or Muslim counselling service. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Toxic Households "), _cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card\" data-v-1431ac10><div class=\"card-header-line amber\" data-v-1431ac10></div><h3 data-v-1431ac10>Toxic or Abusive Households</h3><figure class=\"hadith-card\" data-v-1431ac10><blockquote class=\"hadith-text\" data-v-1431ac10> &quot;Beware of oppression, for oppression will be darkness on the Day of Judgement.&quot; </blockquote><figcaption class=\"hadith-ref\" data-v-1431ac10> Sahih Muslim 2578 · Sunnah.com </figcaption></figure><p class=\"small-note mt-sm\" data-v-1431ac10> Islam explicitly forbids <em data-v-1431ac10>dhulm</em> (oppression) from anyone — including parents. Leaving an abusive situation is not disobedience. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: When to Seek Help "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [_cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line green"
  }, null, -1 /* CACHED */)), _cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "When to Seek Help", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_88, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.seekHelpSteps, (s, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      key: i,
      class: "step"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_89, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[82] || (_cache[82] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"source-bar\" data-v-1431ac10><span class=\"source-label\" data-v-1431ac10>Sources</span><span class=\"source-tag\" data-v-1431ac10>Sunnah.com (Muslim 2578)</span><span class=\"source-tag\" data-v-1431ac10>IslamQA.info</span><span class=\"source-tag\" data-v-1431ac10>Islamweb.net</span></div>", 1))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 13: BUILDING RELATIONSHIP\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_91, [_cache[88] || (_cache[88] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🤝 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 13</div><h2 id=\"ch13-title\" class=\"chapter-title\" data-v-1431ac10> Building a Better Relationship </h2></div><div class=\"chapter-badge\" data-v-1431ac10><svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" aria-hidden=\"true\" data-v-1431ac10><circle cx=\"6\" cy=\"6\" r=\"5\" fill=\"var(--forest-500)\" opacity=\".2\" data-v-1431ac10></circle><circle cx=\"6\" cy=\"6\" r=\"3\" fill=\"var(--forest-500)\" data-v-1431ac10></circle></svg> Verified </div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Small Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [_cache[83] || (_cache[83] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line gold"
  }, null, -1 /* CACHED */)), _cache[84] || (_cache[84] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Small Actions with Big Impact", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_94, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.smallActions, t => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      key: t.text,
      class: "insight-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_95, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(t.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(t.text), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Be the Mature One "), _cache[87] || (_cache[87] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"card\" data-v-1431ac10><div class=\"card-header-line green\" data-v-1431ac10></div><h3 data-v-1431ac10>Be the Mature One</h3><p data-v-1431ac10> In family conflict, someone has to choose maturity. Islam encourages us to be that person. </p><figure class=\"script-panel mt-sm\" data-v-1431ac10><figcaption class=\"script-eyebrow\" data-v-1431ac10>De-escalation Script</figcaption><blockquote class=\"script-body\" data-v-1431ac10> &quot;I don&#39;t want to argue with you — I love you and I just want us to understand each other.&quot; </blockquote></figure></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Card: Rebuilding Trust "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [_cache[85] || (_cache[85] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header-line amber"
  }, null, -1 /* CACHED */)), _cache[86] || (_cache[86] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, "Rebuilding Trust", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_97, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.trustSteps, (s, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
      key: i,
      class: "step"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_98, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_99, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source bar "), _cache[89] || (_cache[89] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "source-bar"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-label"
  }, "Sources"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-tag"
  }, "Sunnah.com"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "source-tag"
  }, "SeekersGuidance.org")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 14: QUICK TIPS\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_100, [_cache[91] || (_cache[91] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> ⚡ </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 14</div><h2 id=\"ch14-title\" class=\"chapter-title\" data-v-1431ac10> Quick Advice </h2></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Micro tips grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.microTips, tip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: tip.title,
      class: "micro-tile",
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_103, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_104, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip.body), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Habit tracker tool "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, [_cache[90] || (_cache[90] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, " ☀️ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Daily Habit Tracker")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_106, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.habits, h => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("label", {
      key: h.label,
      class: "habit-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      "onUpdate:modelValue": $event => h.done = $event,
      class: "habit-check"
    }, null, 8 /* PROPS */, _hoisted_107), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, h.done]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["habit-text", {
        done: h.done
      }])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(h.label), 3 /* TEXT, CLASS */), h.done ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_108, " +Barakah ✓ ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "habit-bar-fill",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`width:${$setup.completedHabits / $setup.habits.length * 100}%`)
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.completedHabits) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.habits.length) + " completed ", 1 /* TEXT */), $setup.completedHabits === $setup.habits.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_112, " 🌟 SubhanAllah! ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 15: STORIES\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_113, [_cache[96] || (_cache[96] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🎥 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 15</div><h2 id=\"ch15-title\" class=\"chapter-title\" data-v-1431ac10> Real Stories &amp; Scenarios </h2></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stories grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_114, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.stories, s => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: s.title,
      class: "story-tile"
    }, [_cache[93] || (_cache[93] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "story-tag"
    }, "Real Situation", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_115, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("blockquote", _hoisted_116, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.body), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [_cache[92] || (_cache[92] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "story-perspective-label"
    }, "Islamic Perspective", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.response), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", _hoisted_118, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.source), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Story submission form "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [_cache[94] || (_cache[94] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, " 📬 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Share Your Story Anonymously")], -1 /* CACHED */)), _cache[95] || (_cache[95] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "story-textarea",
    class: "visually-hidden"
  }, " Write your anonymous story ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    id: "story-textarea",
    class: "styled-textarea",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $setup.userStory = $event),
    placeholder: "Write your situation anonymously — your experience may help others…"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.userStory]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "primary-btn",
    onClick: $setup.submitStory,
    type: "button"
  }, " Submit Anonymously "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.storySubmitted ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_120, " JazakAllah khair — your story has been noted. May Allah ease your situation. 🤲 ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             CHAPTER 16: INTERACTIVE\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_121, [_cache[102] || (_cache[102] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 🧩 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Chapter 16</div><h2 id=\"ch16-title\" class=\"chapter-title\" data-v-1431ac10> Interactive Content </h2></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_122, [_cache[99] || (_cache[99] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, " 🎯 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "\"Are You Wrong Here?\" — Scenario Quiz")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Active quiz state "), !$setup.quizDone ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_123, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_124, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentScenario.scenario), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-choices",
    role: "radiogroup",
    "aria-label": `Question ${$setup.currentScenarioIdx + 1} of ${$setup.scenarios.length}`
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-choice",
    onClick: _cache[4] || (_cache[4] = $event => $setup.answerQuiz('youth')),
    role: "radio",
    "aria-checked": $setup.quizAnswer === 'youth',
    type: "button"
  }, " Youth is Wrong ", 8 /* PROPS */, _hoisted_126), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-choice",
    onClick: _cache[5] || (_cache[5] = $event => $setup.answerQuiz('parent')),
    role: "radio",
    "aria-checked": $setup.quizAnswer === 'parent',
    type: "button"
  }, " Parent is Wrong ", 8 /* PROPS */, _hoisted_127), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "quiz-choice",
    onClick: _cache[6] || (_cache[6] = $event => $setup.answerQuiz('both')),
    role: "radio",
    "aria-checked": $setup.quizAnswer === 'both',
    type: "button"
  }, " Both Have a Point ", 8 /* PROPS */, _hoisted_128)], 8 /* PROPS */, _hoisted_125), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.quizFeedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_129, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.quizFeedback) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "next-btn",
      onClick: $setup.nextScenario,
      type: "button"
    }, " Next → ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quiz completion state "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_130, [_cache[97] || (_cache[97] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "quiz-done-icon",
    "aria-hidden": "true"
  }, " 🌙 ", -1 /* CACHED */)), _cache[98] || (_cache[98] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "quiz-done-title"
  }, "Quiz Complete!", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_131, " Score: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.quizScore) + "/" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.scenarios.length), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "primary-btn",
    onClick: $setup.resetQuiz,
    type: "button"
  }, " Try Again ")])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Poll "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_132, [_cache[100] || (_cache[100] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, " 📊 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Community Poll: How Strict Were Your Parents?")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.pollOptions, opt => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: opt.id,
      class: "poll-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["poll-option", {
        voted: $setup.pollVote === opt.id
      }]),
      onClick: $event => $setup.castVote(opt.id),
      role: "radio",
      "aria-checked": $setup.pollVote === opt.id,
      type: "button"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_134), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_135, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "poll-bar",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(`width:${$setup.getPollPercent(opt.id)}%`)
    }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_136, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getPollPercent(opt.id)) + "%", 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), $setup.pollVote ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_137, " JazakAllah for voting — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.totalPollVotes) + " responses ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" What Would You Do "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_138, [_cache[101] || (_cache[101] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "tool-header"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "tool-icon",
    "aria-hidden": "true"
  }, " ❓ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "\"What Would You Do?\" Situations")], -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.wydSituations, (w, i) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: i,
      class: "wyd-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_139, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(w.q), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "wyd-choices",
      role: "radiogroup",
      "aria-label": `Situation ${i + 1}`
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(w.choices, c => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: c.val,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["wyd-btn", {
          selected: $setup.wydAnswers[i] === c.val,
          correct: $setup.wydAnswers[i] && c.correct
        }]),
        onClick: $event => $setup.setWyd(i, c.val),
        role: "radio",
        "aria-checked": $setup.wydAnswers[i] === c.val,
        type: "button"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(c.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_141);
    }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_140), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "fade"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.wydAnswers[i] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_142, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(w.feedback), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════\n             RESOURCES\n        ════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_143, [_cache[104] || (_cache[104] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"chapter-header\" data-v-1431ac10><div class=\"chapter-medallion\" aria-hidden=\"true\" data-v-1431ac10> 📱 </div><div class=\"chapter-meta\" data-v-1431ac10><div class=\"chapter-num\" data-v-1431ac10>Resources</div><h2 id=\"resources-title\" class=\"chapter-title\" data-v-1431ac10> Apps &amp; Learning Resources </h2></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Resources grid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_144, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.resources, r => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: r.name,
      class: "resource-tile",
      role: "listitem"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_145, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.icon), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_146, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_147, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_148, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(r.type), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Trusted sources panel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_149, [_cache[103] || (_cache[103] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "sources-panel-header"
  }, "Our 5 Trusted Islamic Sources", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.trustedSources, s => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: s.num,
      class: "source-entry"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_150, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_151, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_152, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_153, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.url), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_154, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(s.why), 1 /* TEXT */)])]);
  }), 64 /* STABLE_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════════\n         BACK TO TOP BUTTON\n    ════════════════════════════════════════════ "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "back-to-top",
    onClick: $setup.scrollToTop,
    "aria-label": "Back to top",
    title: "Back to top",
    type: "button"
  }, [...(_cache[108] || (_cache[108] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M18 15l-6-6-6 6"
  })], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.showBackToTop]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" ════════════════════════════════════════════\n         FOOTER\n    ════════════════════════════════════════════ "), _cache[110] || (_cache[110] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<footer class=\"site-footer\" data-v-1431ac10><div class=\"footer-geo\" aria-hidden=\"true\" data-v-1431ac10></div><div class=\"container\" data-v-1431ac10><div class=\"footer-inner\" data-v-1431ac10><div class=\"footer-brand\" data-v-1431ac10><div class=\"footer-logo\" data-v-1431ac10>Islamic Connect</div><div class=\"footer-tagline\" data-v-1431ac10>Youth Guide · Parenting in Islam</div></div><p class=\"footer-note\" data-v-1431ac10> All content sourced exclusively from IslamQA.info, Islamweb.net, Sunnah.com, Quran.com, and SeekersGuidance.org. For personal matters, always consult a qualified scholar. </p></div><div class=\"footer-divider\" aria-hidden=\"true\" data-v-1431ac10></div><div class=\"footer-bottom\" data-v-1431ac10><span data-v-1431ac10>May Allah make our families a source of joy and barakah.</span><span class=\"footer-arabic\" lang=\"ar\" data-v-1431ac10> آمين يا رب العالمين </span></div></div></footer>", 1))], 2 /* CLASS */)], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */);
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
/* harmony import */ var _ParentingComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=script&setup=true&lang=js */ "./resources/js/components/ParentingComponent.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css */ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ParentingComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-1431ac10"],['__file',"resources/js/components/ParentingComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=script&setup=true&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=script&setup=true&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&setup=true&lang=js");
 

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