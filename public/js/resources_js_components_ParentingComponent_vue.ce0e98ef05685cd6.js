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
  name: 'IslamicGuide',
  data() {
    return {
      activeTab: 0,
      searchQuery: '',
      showProgress: true,
      readingProgress: 0,
      showVerificationModal: false,
      showCitationModal: false,
      showSourceModal: false,
      selectedSource: null,
      selectedPoll: null,
      pollResult: false,
      scenarioFeedback: {},
      pollOptions: [{
        id: 'poll1',
        text: 'Communication with parents'
      }, {
        id: 'poll2',
        text: 'Cultural vs Islamic expectations'
      }, {
        id: 'poll3',
        text: 'Marriage and relationships'
      }, {
        id: 'poll4',
        text: 'Religious differences at home'
      }],
      trustedSources: [{
        name: 'IslamQA.info',
        description: 'Scholarly fatwas based on Quran & Sunnah'
      }, {
        name: 'IslamWeb.net',
        description: 'Comprehensive Islamic knowledge base'
      }, {
        name: 'SeekersGuidance.org',
        description: 'Educational platform with qualified scholars'
      }, {
        name: 'YaqeenInstitute.org',
        description: 'Research-based Islamic content'
      }, {
        name: 'Darul Ifta Australia',
        description: 'Hanafi fatwa authority'
      }],
      realStories: [{
        id: 1,
        content: "My parents don't understand why I want to study art instead of medicine. They think I'm wasting my life, but this is my passion and I believe Allah gave me this talent for a reason.",
        age: "19",
        location: "USA",
        type: "Career Conflict"
      }, {
        id: 2,
        content: "I became more practicing in college, but my parents think I'm becoming 'extreme'. They don't understand why I stopped listening to music or want to pray on time.",
        age: "21",
        location: "UK",
        type: "Religious Growth"
      }, {
        id: 3,
        content: "My parents want me to marry my cousin back home. I've never met him properly and I don't feel ready. Islam gave me the right to choose, but how do I tell them?",
        age: "23",
        location: "Canada",
        type: "Marriage Pressure"
      }],
      interactiveScenarios: [{
        title: "The Late Night Argument",
        description: "Your parents are arguing loudly at 2 AM. You're worried and can't sleep. What do you do?",
        options: [{
          text: "Ignore it and put headphones on",
          isCorrect: false
        }, {
          text: "Recite 'A'oodhu billahi min ash-shaytan ir-rajeem' audibly and make dua for them",
          isCorrect: true
        }, {
          text: "Confront them and tell them to stop",
          isCorrect: false
        }, {
          text: "Call a relative to intervene",
          isCorrect: false
        }]
      }, {
        title: "The Career Ultimatum",
        description: "Your father says: 'Either become a doctor or I will disown you.' What's the Islamic response?",
        options: [{
          text: "Obedience to parents is obligatory, become a doctor",
          isCorrect: false
        }, {
          text: "Disobey openly and do what you want",
          isCorrect: false
        }, {
          text: "Respectfully discuss your passion while honoring him, seek counsel from a scholar",
          isCorrect: true
        }, {
          text: "Lie and pretend you're studying medicine",
          isCorrect: false
        }]
      }, {
        title: "The Cultural Marriage",
        description: "Your parents want you to marry someone based solely on cultural background, ignoring religious character. What do you do?",
        options: [{
          text: "Accept to keep family peace",
          isCorrect: false
        }, {
          text: "Explain that Islam prioritizes piety over culture (Quran 49:13) and seek a compromise",
          isCorrect: true
        }, {
          text: "Run away from home",
          isCorrect: false
        }, {
          text: "Secretly marry someone else",
          isCorrect: false
        }]
      }],
      chapters: [{
        shortTitle: "Foundations",
        title: "1. Foundations of Parenting in Islam",
        subtitle: "Understanding rights, mercy, and intention",
        reminder: "The best of you are those who are best to their families. (Tirmidhi)",
        sections: [{
          title: "Rights of Parents",
          icon: "fa-hand-holding-heart",
          content: "<p>Islam elevates parents to a rank仅次于 Allah. Allah commands in the Quran: <strong>'And your Lord has decreed that you worship none but Him, and that you be dutiful to your parents...'</strong> (Quran 17:23-24). The Prophet Muhammad (peace be upon him) emphasized that Paradise lies at the feet of mothers (Sunan an-Nasa'i 3104).</p><p>Key rights include: financial support in old age, obeying lawful requests, speaking with the utmost respect (never even saying 'uff'), and making consistent dua for their forgiveness and mercy.</p><p>Scholars explain that these rights are not unconditional—obedience is only required in matters that are permissible (halal).</p>",
          primarySource: "IslamQA.info - Based on Quran and Sahih Hadith",
          image: "https://images.pexels.com/photos/3771800/pexels-photo-3771800.jpeg?auto=compress&cs=tinysrgb&w=800",
          videoId: "kRhlXLxIb2U",
          dosDonts: {
            dos: ["Speak kindly using respectful language", "Help without being asked", "Make daily dua for their forgiveness", "Consult them in major life decisions"],
            donts: ["Raise your voice or show frustration", "Roll your eyes or display annoyance", "Disobey in matters that are clearly halal", "Cut ties or abandon them"]
          },
          faq: [{
            q: "What if my parents ask me to do something haram?",
            a: "No obedience to creation in disobedience to the Creator. Politely refuse saying: 'I respect you, but Islam prohibits this.' Seek a scholar's counsel if needed."
          }, {
            q: "Do I have to obey parents in marriage choices?",
            a: "Parents' advice is valuable, but Islam gives you the final right to accept or reject a marriage proposal."
          }],
          references: "Quran 17:23-24, Sahih Bukhari 5971, Riyad as-Salihin 315, Sunan an-Nasa'i 3104"
        }, {
          title: "Obedience vs Boundaries",
          icon: "fa-scale-balanced",
          content: "<p>Islam teaches balanced obedience. The Prophet (peace be upon him) said: <strong>'Your body has a right over you, your eyes have a right over you, and your family has a right over you.'</strong> (Sahih Bukhari 1968). This means setting healthy boundaries is not disobedience—it is self-care.</p><p>Boundaries become necessary when parents demand something beyond your capacity, invade your privacy, or cause emotional harm. The Islamic principle is: kindness without self-destruction, respect without subservience.</p>",
          primarySource: "SeekersGuidance.org - Balancing rights and responsibilities",
          tool: {
            title: "Boundary Setting Script Generator",
            html: "<p><strong>Template:</strong> 'I love you and value your advice. On this matter, I feel strongly about [X] because [Islamic reason]. Can we find a middle ground?'</p><button class='btn btn-sm btn-gold mt-2' onclick=\"alert('Practice this with a trusted friend first!')\">Practice Script</button>"
          },
          references: "Sahih Bukhari 1968, Al-Adab Al-Mufrad 334, SeekersGuidance"
        }]
      }, {
        shortTitle: "Communication",
        title: "2. Communication with Parents",
        subtitle: "Talk without disrespect, handle disagreements",
        reminder: "A gentle word can soften the hardest heart. Speak to them with kindness, even in disagreement.",
        sections: [{
          title: "How to Talk Without Disrespect",
          icon: "fa-comments",
          content: "<p>The Quran provides a powerful example through Prophet Ibrahim (AS) speaking to his father: <strong>'O my father, indeed there has come to me of knowledge that which has not come to you, so follow me; I will guide you to an even path.'</strong> (Quran 19:43). Notice how he said 'O my father' repeatedly—using loving terms, not accusations.</p><p>Practical tips: Use 'I feel' statements instead of 'You always' accusations. Start conversations with 'May Allah bless you.' Avoid interrupting, even when you disagree. Lower your voice—the Quran compares harsh speech to the braying of a donkey (31:19).</p>",
          primarySource: "IslamWeb.net - Prophetic communication models",
          dosDonts: {
            dos: ["Listen actively without interrupting", "Acknowledge their perspective first", "Use gentle, soft tones", "Say 'I understand how you feel'"],
            donts: ["Use sarcasm or mockery", "Walk away mid-conversation", "Bring up past mistakes", "Speak when angry—wait until calm"]
          },
          references: "Quran 19:43, 31:19, Tafsir Ibn Kathir"
        }]
      }, {
        shortTitle: "Culture vs Islam",
        title: "3. Culture vs Islam (Major Issue in the West)",
        subtitle: "Separating cultural baggage from authentic Deen",
        reminder: "Islam came to liberate from cultural oppression, not reinforce it.",
        sections: [{
          title: "Cultural Expectations vs Islamic Teachings",
          icon: "fa-globe",
          content: "<p>Many practices labeled 'Islamic' are purely cultural. For example, forced marriage is haram (forbidden) in Islam—the Prophet (peace be upon him) annulled a marriage where a woman was married without consent. Yet some cultures practice it.</p><p>The Islamic standard is justice ('adl). Any cultural practice that contradicts Quran or Sunnah must be rejected. Cultural practices that align with Islamic values can be embraced. The key is knowledge—don't assume everything your parents say is Islamic.</p>",
          primarySource: "YaqeenInstitute.org - Differentiating culture from religion",
          image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
          tool: {
            title: "Cultural Audit Checklist",
            html: "<p>Ask yourself:</p><ul><li>✅ Is this practice mentioned in Quran or Sunnah?</li><li>✅ Does it align with Islamic justice?</li><li>✅ Is it causing anyone harm?</li><li>✅ Would the Prophet (peace be upon him) approve?</li></ul><p>If any answer is 'no'—question it respectfully.</p>"
          },
          references: "Quran 5:49, Sahih Bukhari 6969, Yaqeen Institute"
        }]
      }, {
        shortTitle: "Conflict",
        title: "4. Conflict & Arguments",
        subtitle: "Dealing with strict parents, anger, and tension",
        reminder: "The strong person controls their anger, not their fist.",
        sections: [{
          title: "What Islam Says About Anger",
          icon: "fa-fire",
          content: "<p>The Prophet (peace be upon him) gave powerful advice: <strong>'Do not get angry.'</strong> A man repeated the request, and each time the Prophet said: <strong>'Do not get angry.'</strong> (Sahih Bukhari 6116). When angry, he advised: change your position (sit if standing, lie down if sitting), make wudu (ablution), and seek refuge in Allah from Shaytan.</p><p>If your parents are angry, remain silent. The Prophet said silence is golden. Your calmness can diffuse their anger—responding with anger only escalates conflict.</p>",
          primarySource: "IslamQA.info - Anger management in Islam",
          dosDonts: {
            dos: ["Stay silent when parents are angry", "Make wudu to cool down", "Recite 'A'oodhu billahi...'", "Leave the room if needed"],
            donts: ["Shout or raise your voice", "Break things or slam doors", "Use hurtful words", "Hold grudges overnight"]
          },
          references: "Sahih Bukhari 6116, Riyad as-Salihin 637"
        }]
      }, {
        shortTitle: "Emotional",
        title: "5. Emotional Struggles with Parents",
        subtitle: "Feeling unloved, compared, or pressured",
        reminder: "Your worth is from Allah, not your parents' approval.",
        sections: [{
          title: "Healing Parent-Child Relationships",
          icon: "fa-heart",
          content: "<p>It hurts when parents compare you to siblings or make you feel inadequate. Remember: the Prophet (peace be upon him) treated all his children and grandchildren with equal love. He would prolong his prostrations so his grandson could play on his back.</p><p>If you feel unloved, remind yourself that Allah's love is sufficient. Make dua for your parents' hearts to soften. Sometimes, parents express love through provision and protection, not words—recognize their love language.</p>",
          primarySource: "SeekersGuidance.org - Emotional healing",
          references: "Sahih Muslim 2280, Tirmidhi 1924"
        }]
      }, {
        shortTitle: "Boundaries",
        title: "6. Boundaries in Islam",
        subtitle: "Is it allowed to say no? Privacy and independence",
        reminder: "Respect without self-respect is not Islamic.",
        sections: [{
          title: "The Balance of Respect",
          icon: "fa-fence",
          content: "<p>Islam grants privacy rights. The Quran commands: <strong>'O you who have believed, do not enter houses other than your own until you ascertain welcome...'</strong> (Quran 24:27). This applies to parents too—they should knock before entering your room.</p><p>Saying 'no' is permissible when requests are unreasonable or harmful. The Prophet (peace be upon him) said: <strong>'There should be neither harming nor reciprocating harm.'</strong> (Ibn Majah 2340). Respect your parents, but also respect yourself.</p>",
          primarySource: "IslamWeb.net - Islamic boundaries",
          references: "Quran 24:27, Ibn Majah 2340"
        }]
      }, {
        shortTitle: "Western Life",
        title: "7. Growing Up in Western Society",
        subtitle: "Double identity, freedom vs protection",
        reminder: "You can be fully Muslim and fully Western—the two are not opposites.",
        sections: [{
          title: "Navigating Two Worlds",
          icon: "fa-building",
          content: "<p>Muslim youth in the West often feel torn between home culture and Western society. The Prophet (peace be upon him) lived in a non-Muslim society (Mecca) before migration. He maintained his identity while engaging respectfully with others.</p><p>The key is: hold firm to Islamic principles while adapting to the environment. You don't need to abandon your deen to fit in, nor isolate yourself to protect it. Be confident in your identity as a Muslim Westerner.</p>",
          primarySource: "YaqeenInstitute.org - Muslim identity in the West",
          references: "Seerah of Prophet Muhammad, Yaqeen Institute"
        }]
      }, {
        shortTitle: "Career",
        title: "8. Education, Career & Life Choices",
        subtitle: "Passion vs parental expectations",
        reminder: "Seek knowledge—it's obligatory for every Muslim.",
        sections: [{
          title: "Balancing Dreams and Duty",
          icon: "fa-briefcase",
          content: "<p>The Prophet (peace be upon him) said: <strong>'Seeking knowledge is an obligation upon every Muslim.'</strong> (Ibn Majah 224). This includes religious and worldly beneficial knowledge. However, parents may pressure you toward certain careers.</p><p>Islamically, you have the right to pursue halal careers that suit your skills and passion. Respectfully discuss with parents, showing them how your chosen path can serve the community and provide for a family. Seek counsel from knowledgeable elders if needed.</p>",
          primarySource: "IslamQA.info - Career choices",
          references: "Ibn Majah 224, Tirmidhi"
        }]
      }, {
        shortTitle: "Marriage",
        title: "9. Marriage & Relationships (Huge Topic)",
        subtitle: "Parents vs your choice, cultural barriers",
        reminder: "Marriage is half your deen—choose wisely, with or without parental choice.",
        sections: [{
          title: "Islamic Marriage Rights",
          icon: "fa-ring",
          content: "<p>Islam gives you the right to accept or reject any marriage proposal. The Prophet (peace be upon him) annulled a marriage where a woman was married without consent (Sahih Bukhari 6969). Parents cannot force you into marriage.</p><p>However, parental blessing is highly recommended. The ideal is to involve parents from the beginning, presenting potential spouses with good character and piety. If parents reject a suitable spouse due to cultural reasons (not Islamic ones), scholars say you may proceed with a wali (guardian) from your extended family or an imam.</p>",
          primarySource: "IslamWeb.net - Marriage rights",
          references: "Sahih Bukhari 6969, Quran 2:232"
        }]
      }, {
        shortTitle: "Practice",
        title: "10. Practicing Islam with Parents",
        subtitle: "When parents are less practicing",
        reminder: "Lead by example, not by lecture.",
        sections: [{
          title: "Guiding Without Preaching",
          icon: "fa-mosque",
          content: "<p>If you become more practicing than your parents, be gentle. The Prophet (peace be upon him) said: <strong>'Make things easy, not difficult. Give glad tidings, not aversion.'</strong> (Sahih Bukhari 69).</p><p>Don't criticize their practices. Instead, invite them by cooking halal food, playing Quran recitations softly, or asking for their advice on Islamic matters (which makes them feel valued). Patience is key—the Sahaba (companions) gradually changed over 23 years.</p>",
          primarySource: "SeekersGuidance.org - Family religious dynamics",
          references: "Sahih Bukhari 69"
        }]
      }, {
        shortTitle: "Duas",
        title: "11. Duas & Spiritual Approach",
        subtitle: "Making dua for parents, patience, and barakah",
        reminder: "Dua changes qadr—never underestimate it.",
        sections: [{
          title: "Powerful Duas for Parents",
          icon: "fa-hands-praying",
          content: "<p>The Quran teaches specific duas for parents. Recite regularly:</p><p><strong>'Rabbi irhamhuma kama rabbayani sagheera'</strong> — 'My Lord, have mercy on them as they raised me when I was small.' (Quran 17:24)</p><p><strong>'Rabbana-ghfir li wa li-walidayya'</strong> — 'Our Lord, forgive me and my parents.' (Quran 14:41)</p><p>The Prophet said: <strong>'When a person dies, their deeds stop except for three: ongoing charity, beneficial knowledge, or a righteous child who makes dua for them.'</strong> (Sahih Muslim 1631). Your dua is their best gift.</p>",
          primarySource: "Darul Ifta Australia - Duas for parents",
          references: "Quran 17:24, 14:41, Sahih Muslim 1631"
        }]
      }, {
        shortTitle: "Difficult",
        title: "12. Difficult & Sensitive Situations",
        subtitle: "Toxic households, neglect, and seeking help",
        reminder: "Allah does not burden a soul beyond its capacity.",
        sections: [{
          title: "When to Seek Help",
          icon: "fa-triangle-exclamation",
          content: "<p>Islam protects you from harm. The Prophet (peace be upon him) said: <strong>'Do not harm yourself or others.'</strong> (Ibn Majah 2340). If you experience physical abuse, neglect, or emotional harm that affects your well-being, you must seek help.</p><p>Options include: trusted family members, imams, school counselors, or child protection services. You are not betraying your parents by protecting yourself—you are following Islamic principles of preserving life and dignity.</p><div class='alert alert-warning mt-3'><i class='fas fa-phone-alt me-2'></i><strong>Emergency Contact:</strong> If you are in immediate danger, call emergency services (911 in US, 999 in UK).</div>",
          primarySource: "IslamQA.info - Harm and self-protection",
          references: "Ibn Majah 2340, Quran 2:286"
        }]
      }, {
        shortTitle: "Better",
        title: "13. Building a Better Relationship",
        subtitle: "Small actions that improve connection",
        reminder: "Small consistent actions are beloved to Allah.",
        sections: [{
          title: "Daily Acts That Transform",
          icon: "fa-hand-sparkles",
          content: "<p>Rebuilding trust takes time. Start with small actions: bring them tea without being asked, kiss their hands (a sunnah), say 'I love you for Allah's sake,' ask about their day, share meals together.</p><p>The Prophet (peace be upon him) would run to greet his daughter Fatima, kiss her forehead, and seat her in his place. These small gestures build immense love and barakah in the home.</p>",
          primarySource: "SeekersGuidance.org - Building family bonds",
          references: "Abu Dawud 5217"
        }]
      }, {
        shortTitle: "Quick",
        title: "14. Quick Advice / Micro Content",
        subtitle: "Instant tips for tough moments",
        reminder: "One good deed can change everything.",
        sections: [{
          title: "Crisis Scripts",
          icon: "fa-bolt",
          content: "<div class='row'><div class='col-md-6 mb-2'><div class='quick-card p-2 bg-light rounded'><strong>When parents are angry:</strong><br>Say: 'You're right, I'm sorry. Let's talk later.'</div></div><div class='col-md-6 mb-2'><div class='quick-card p-2 bg-light rounded'><strong>To de-escalate:</strong><br>Say: 'I hear you. May Allah bless you.'</div></div><div class='col-md-6 mb-2'><div class='quick-card p-2 bg-light rounded'><strong>Never say:</strong><br>'I don't care what you think.'</div></div><div class='col-md-6 mb-2'><div class='quick-card p-2 bg-light rounded'><strong>To earn barakah:</strong><br>Serve them before they ask.</div></div></div>",
          primarySource: "Compiled from multiple scholarly sources",
          references: "General Islamic etiquette"
        }]
      }]
    };
  },
  computed: {
    filteredContent() {
      if (!this.searchQuery) return [];
      const query = this.searchQuery.toLowerCase();
      let results = [];
      this.chapters.forEach((chapter, cIdx) => {
        chapter.sections.forEach((section, sIdx) => {
          if (section.title.toLowerCase().includes(query) || section.content.toLowerCase().includes(query) || section.dosDonts && JSON.stringify(section.dosDonts).toLowerCase().includes(query)) {
            results.push({
              id: `${cIdx}-${sIdx}`,
              chapterTitle: chapter.title,
              sectionTitle: section.title,
              chapterIdx: cIdx,
              sectionIdx: sIdx
            });
          }
        });
      });
      return results;
    }
  },
  methods: {
    performSearch() {
      if (this.searchQuery && this.filteredContent.length) {
        this.scrollToSection(this.filteredContent[0]);
      }
    },
    scrollToSection(result) {
      this.activeTab = result.chapterIdx;
      this.$nextTick(() => {
        const element = document.getElementById(`section-${result.chapterIdx}-${result.sectionIdx}`);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        this.searchQuery = '';
      });
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    scrollToResources() {
      var _document$querySelect;
      (_document$querySelect = document.querySelector('.footer')) === null || _document$querySelect === void 0 || _document$querySelect.scrollIntoView({
        behavior: 'smooth'
      });
    },
    trackProgress() {
      // Simple progress tracking based on tab changes
      const progress = (this.activeTab + 1) / this.chapters.length * 100;
      this.readingProgress = progress;
    },
    submitPoll() {
      if (this.selectedPoll) {
        this.pollResult = true;
        setTimeout(() => {
          this.pollResult = false;
        }, 3000);
      }
    },
    checkScenarioAnswer(scenarioIdx, isCorrect) {
      this.$set(this.scenarioFeedback, scenarioIdx, {
        class: isCorrect ? 'alert-success' : 'alert-danger',
        message: isCorrect ? '✅ Correct! This follows Islamic teachings.' : '❌ Not quite. Review the Islamic principles in this guide.'
      });
    },
    copyCitation(section) {
      const citation = `Source: ${section.primarySource} | References: ${section.references} | Parent-Child Compass Guide`;
      navigator.clipboard.writeText(citation);
      alert('Citation copied to clipboard!');
    },
    showSourceDetail(section) {
      this.selectedSource = section;
      this.showSourceModal = true;
    }
  },
  mounted() {
    // Load Bootstrap JS for modals and accordions
    if (typeof bootstrap !== 'undefined') {
      // Bootstrap is available
    }
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
  class: "islamic-guide"
};
const _hoisted_2 = {
  class: "top-bar py-2"
};
const _hoisted_3 = {
  class: "container"
};
const _hoisted_4 = {
  class: "row align-items-center"
};
const _hoisted_5 = {
  class: "col-md-6 text-center text-md-end"
};
const _hoisted_6 = {
  class: "alert alert-warning disclaimer-banner rounded-0 border-0 mb-0",
  role: "alert"
};
const _hoisted_7 = {
  class: "container"
};
const _hoisted_8 = {
  class: "row align-items-center"
};
const _hoisted_9 = {
  class: "col-md-2 text-md-end mt-2 mt-md-0"
};
const _hoisted_10 = {
  class: "hero-section py-5"
};
const _hoisted_11 = {
  class: "container"
};
const _hoisted_12 = {
  class: "row align-items-center"
};
const _hoisted_13 = {
  class: "col-lg-7"
};
const _hoisted_14 = {
  class: "search-container mb-4"
};
const _hoisted_15 = {
  class: "input-group input-group-lg shadow-sm"
};
const _hoisted_16 = {
  key: 0,
  class: "search-results-dropdown mt-2 bg-white rounded shadow-lg p-3"
};
const _hoisted_17 = {
  class: "mb-2"
};
const _hoisted_18 = {
  class: "search-results-list"
};
const _hoisted_19 = ["onClick"];
const _hoisted_20 = {
  key: 0,
  class: "progress-container sticky-top"
};
const _hoisted_21 = {
  class: "chapter-nav sticky-top bg-white shadow-sm pt-2 pb-1"
};
const _hoisted_22 = {
  class: "container"
};
const _hoisted_23 = {
  class: "chapter-scroll"
};
const _hoisted_24 = {
  class: "nav nav-pills",
  role: "tablist"
};
const _hoisted_25 = ["onClick"];
const _hoisted_26 = {
  class: "chapter-number"
};
const _hoisted_27 = {
  class: "chapter-title-short"
};
const _hoisted_28 = {
  class: "container my-5"
};
const _hoisted_29 = {
  class: "row"
};
const _hoisted_30 = {
  class: "col-lg-3 order-lg-1 mb-4"
};
const _hoisted_31 = {
  class: "sidebar-sticky"
};
const _hoisted_32 = {
  class: "card shadow-sm mb-4 border-0"
};
const _hoisted_33 = {
  class: "card-body"
};
const _hoisted_34 = {
  class: "small text-muted"
};
const _hoisted_35 = {
  class: "card shadow-sm mb-4 border-0"
};
const _hoisted_36 = {
  class: "card-body p-0"
};
const _hoisted_37 = {
  class: "list-group list-group-flush"
};
const _hoisted_38 = {
  class: "card shadow-sm mb-4 border-0"
};
const _hoisted_39 = {
  class: "card-body"
};
const _hoisted_40 = {
  class: "form-check"
};
const _hoisted_41 = ["id", "value"];
const _hoisted_42 = ["for"];
const _hoisted_43 = {
  key: 0,
  class: "mt-2 small text-muted"
};
const _hoisted_44 = {
  class: "col-lg-9"
};
const _hoisted_45 = {
  class: "chapter-header mb-4"
};
const _hoisted_46 = {
  class: "d-flex justify-content-between align-items-start flex-wrap"
};
const _hoisted_47 = {
  class: "chapter-badge"
};
const _hoisted_48 = {
  class: "mt-2 mb-3"
};
const _hoisted_49 = {
  class: "lead text-muted"
};
const _hoisted_50 = {
  class: "chapter-reminder bg-soft-gold p-3 rounded-3"
};
const _hoisted_51 = {
  class: "sections-container"
};
const _hoisted_52 = ["id"];
const _hoisted_53 = {
  class: "card border-0 shadow-sm"
};
const _hoisted_54 = {
  class: "card-body p-4"
};
const _hoisted_55 = {
  class: "section-title"
};
const _hoisted_56 = ["innerHTML"];
const _hoisted_57 = {
  class: "source-verification d-inline-flex align-items-center bg-light px-3 py-2 rounded-2 mb-3"
};
const _hoisted_58 = {
  class: "small"
};
const _hoisted_59 = ["onClick"];
const _hoisted_60 = {
  key: 0,
  class: "section-media mb-3"
};
const _hoisted_61 = ["src", "alt"];
const _hoisted_62 = {
  key: 1,
  class: "section-media mb-3 ratio ratio-16x9"
};
const _hoisted_63 = ["src"];
const _hoisted_64 = {
  key: 2,
  class: "tool-box mt-3 p-3 rounded-3"
};
const _hoisted_65 = ["innerHTML"];
const _hoisted_66 = {
  key: 3,
  class: "row g-3 mt-2"
};
const _hoisted_67 = {
  class: "col-md-6"
};
const _hoisted_68 = {
  class: "dos-card p-3 rounded-3 h-100"
};
const _hoisted_69 = {
  class: "mb-0 ps-3"
};
const _hoisted_70 = {
  class: "col-md-6"
};
const _hoisted_71 = {
  class: "donts-card p-3 rounded-3 h-100"
};
const _hoisted_72 = {
  class: "mb-0 ps-3"
};
const _hoisted_73 = {
  key: 4,
  class: "faq-section mt-4"
};
const _hoisted_74 = ["id"];
const _hoisted_75 = {
  class: "accordion-header"
};
const _hoisted_76 = ["data-bs-target"];
const _hoisted_77 = ["id"];
const _hoisted_78 = ["innerHTML"];
const _hoisted_79 = {
  class: "references mt-3 pt-2 border-top"
};
const _hoisted_80 = {
  class: "d-flex justify-content-between align-items-center flex-wrap"
};
const _hoisted_81 = {
  class: "small text-muted"
};
const _hoisted_82 = ["onClick"];
const _hoisted_83 = {
  class: "stories-section py-5 bg-light"
};
const _hoisted_84 = {
  class: "container"
};
const _hoisted_85 = {
  class: "row g-4"
};
const _hoisted_86 = {
  class: "story-card bg-white p-4 rounded-3 shadow-sm"
};
const _hoisted_87 = {
  class: "story-text mb-3"
};
const _hoisted_88 = {
  class: "story-meta d-flex justify-content-between align-items-center"
};
const _hoisted_89 = {
  class: "badge bg-soft-gold text-dark"
};
const _hoisted_90 = {
  class: "small text-muted"
};
const _hoisted_91 = {
  class: "scenarios-section py-5"
};
const _hoisted_92 = {
  class: "container"
};
const _hoisted_93 = {
  class: "row g-4"
};
const _hoisted_94 = {
  class: "scenario-card bg-white p-4 rounded-3 shadow-sm h-100"
};
const _hoisted_95 = {
  class: "mb-3"
};
const _hoisted_96 = {
  class: "small mb-3"
};
const _hoisted_97 = {
  class: "scenario-options mb-3"
};
const _hoisted_98 = ["name", "id", "onChange"];
const _hoisted_99 = ["for"];
const _hoisted_100 = {
  class: "modal-dialog modal-dialog-centered"
};
const _hoisted_101 = {
  class: "modal-content"
};
const _hoisted_102 = {
  class: "modal-header bg-gold text-white"
};
const _hoisted_103 = {
  class: "modal-body"
};
const _hoisted_104 = ["innerHTML"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$data$selectedSource, _$data$selectedSource2;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Top Bar with Quick Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-md-6 text-center text-md-start"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-check-circle text-success me-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Scholarly Verified Content")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    class: "text-decoration-none me-3",
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.scrollToResources && $options.scrollToResources(...args), ["prevent"]))
  }, [...(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-download"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Resources")], -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    class: "text-decoration-none",
    onClick: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $data.showCitationModal = true, ["prevent"]))
  }, [...(_cache[14] || (_cache[14] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-quote-right"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Cite This Guide")], -1 /* CACHED */)]))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Disclaimer Banner "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"col-md-10\" data-v-1431ac10><i class=\"fas fa-exclamation-triangle me-2\" data-v-1431ac10></i><strong data-v-1431ac10>Scholarly Disclaimer:</strong> All content is verified from trusted Islamic sources: <span class=\"badge bg-dark me-1\" data-v-1431ac10>IslamQA.info</span><span class=\"badge bg-dark me-1\" data-v-1431ac10>IslamWeb.net</span><span class=\"badge bg-dark me-1\" data-v-1431ac10>SeekersGuidance.org</span><span class=\"badge bg-dark me-1\" data-v-1431ac10>YaqeenInstitute.org</span><span class=\"badge bg-dark\" data-v-1431ac10>Darul Ifta Australia</span> For personal fatwas, consult a qualified scholar. </div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-outline-dark",
    onClick: _cache[2] || (_cache[2] = $event => $data.showVerificationModal = true)
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-shield-alt"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Verify Sources ", -1 /* CACHED */)]))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Section with Search and Progress "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"hero-badge mb-3\" data-v-1431ac10><span class=\"badge bg-gold\" data-v-1431ac10>📖 Based on Quran &amp; Sunnah</span></div><h1 class=\"display-3 fw-bold mb-3\" data-v-1431ac10>Parent-Child <span class=\"text-gold\" data-v-1431ac10>Compass</span></h1><p class=\"lead mb-4\" data-v-1431ac10>A comprehensive, Islamically-grounded guide for Muslim youth and parents navigating life in Western societies. Practical advice, authentic knowledge, and spiritual wisdom.</p>", 3)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text bg-white border-end-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-search text-muted"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control border-start-0",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.searchQuery = $event),
    placeholder: "Search topics, duas, or specific struggles..."
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-primary",
    type: "button",
    onClick: _cache[4] || (_cache[4] = (...args) => $options.performSearch && $options.performSearch(...args))
  }, [...(_cache[18] || (_cache[18] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-right"
  }, null, -1 /* CACHED */)]))])]), $data.searchQuery && $options.filteredContent.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_17, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-search me-2"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Search Results (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.filteredContent.length) + ")", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredContent.slice(0, 5), result => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: result.id,
      class: "search-result-item p-2",
      onClick: $event => $options.scrollToSection(result)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.chapterTitle), 1 /* TEXT */), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.sectionTitle), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_19);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Stats "), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-stats d-flex gap-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-book-open text-gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" 16 Chapters")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-hadith text-gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" 50+ Verified Hadith")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-mosque text-gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" 5 Trusted Sources")])], -1 /* CACHED */))]), _cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-5 text-center d-none d-lg-block"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-card bg-white rounded-4 shadow-lg p-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-hand-peace fa-3x text-gold mb-3"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "\"And your Lord has decreed that you worship none but Him, and that you be dutiful to your parents...\""), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-muted mb-0"
  }, "— Quran 17:23")])], -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Reading Progress Bar "), $data.showProgress ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar bg-gold",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $data.readingProgress + '%'
    })
  }, null, 4 /* STYLE */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter Navigation - Enhanced Tabs "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chapters, (chapter, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: idx,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nav-link", {
        active: $data.activeTab === idx
      }]),
      onClick: $event => {
        $data.activeTab = idx;
        $options.trackProgress();
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(idx + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.shortTitle), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_25);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content Area "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sidebar with Quick Links and Source Badges "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source Trust Badges "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header bg-white border-0 pt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-shield-alt text-gold me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Verified Sources")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.trustedSources, source => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "source-badge mb-2 p-2 rounded",
      key: source.name
    }, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle text-success me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(source.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(source.description), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Quick Tools "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header bg-white border-0 pt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-tools text-gold me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Quick Tools")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    class: "list-group-item list-group-item-action",
    onClick: _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      $data.activeTab = 10;
      $options.scrollToTop();
    }, ["prevent"]))
  }, [...(_cache[27] || (_cache[27] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-hands-praying me-2 text-gold"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Dua Collection ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    class: "list-group-item list-group-item-action",
    onClick: _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      $data.activeTab = 13;
      $options.scrollToTop();
    }, ["prevent"]))
  }, [...(_cache[28] || (_cache[28] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-comment-dots me-2 text-gold"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Communication Scripts ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    class: "list-group-item list-group-item-action",
    onClick: _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      $data.activeTab = 14;
      $options.scrollToTop();
    }, ["prevent"]))
  }, [...(_cache[29] || (_cache[29] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-bolt me-2 text-gold"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Quick Advice Cards ", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    class: "list-group-item list-group-item-action",
    onClick: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => {
      $data.activeTab = 11;
      $options.scrollToTop();
    }, ["prevent"]))
  }, [...(_cache[30] || (_cache[30] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-star-and-crescent me-2 text-gold"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Spiritual Practices ", -1 /* CACHED */)]))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Interactive Poll "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header bg-white border-0 pt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "mb-0"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-chart-simple me-2 text-gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Community Poll")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "small"
  }, "What's your biggest struggle?", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.pollOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "poll-option mb-2",
      key: option.text
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      class: "form-check-input",
      type: "radio",
      name: "poll",
      id: option.id,
      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.selectedPoll = $event),
      value: option.text
    }, null, 8 /* PROPS */, _hoisted_41), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.selectedPoll]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "form-check-label small",
      for: option.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.text), 9 /* TEXT, PROPS */, _hoisted_42)])]);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-gold w-100 mt-2",
    onClick: _cache[10] || (_cache[10] = (...args) => $options.submitPoll && $options.submitPoll(...args))
  }, "Vote"), $data.pollResult ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_43, "Thank you for your input!")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chapters, (chapter, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: idx,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["tab-pane-content", {
        'd-none': $data.activeTab !== idx
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Chapter Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_47, "Chapter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(idx + 1), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.subtitle), 1 /* TEXT */)]), _cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "scholar-badge"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-graduation-cap me-1"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Verified ")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-lightbulb text-gold me-2"
    }, null, -1 /* CACHED */)), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Key Reminder:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.reminder), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sections "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(chapter.sections, (section, sIdx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: sIdx,
        class: "section-card mb-4",
        id: `section-${idx}-${sIdx}`
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", section.icon])
      }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content with Source Highlighting "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "section-content mb-4",
        innerHTML: section.content
      }, null, 8 /* PROPS */, _hoisted_56), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Source Verification Badge "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-check-circle text-success me-2"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_58, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Verified from: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.primarySource), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-link btn-sm p-0 ms-2",
        onClick: $event => $options.showSourceDetail(section)
      }, [...(_cache[38] || (_cache[38] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-info-circle text-muted"
      }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_59)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Multimedia "), section.image ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
        src: section.image,
        class: "img-fluid rounded-3 w-100",
        style: {
          "max-height": "300px",
          "object-fit": "cover"
        },
        alt: section.title
      }, null, 8 /* PROPS */, _hoisted_61), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "image-caption small text-muted mt-1"
      }, "Source: Pexels (Royalty Free)", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), section.videoId ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
        src: `https://www.youtube.com/embed/${section.videoId}`,
        title: "Educational video",
        allowfullscreen: ""
      }, null, 8 /* PROPS */, _hoisted_63)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Interactive Tools "), section.tool ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-cogs me-2"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.tool.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        innerHTML: section.tool.html
      }, null, 8 /* PROPS */, _hoisted_65)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Do's & Don'ts Cards "), section.dosDonts ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-check-circle me-2 text-success"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Do's")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_69, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.dosDonts.dos, item => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
          key: item
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-times-circle me-2 text-danger"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Don'ts")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_72, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.dosDonts.donts, item => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
          key: item
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Accordion "), section.faq && section.faq.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_73, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-question-circle me-2"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Frequently Asked Questions")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
        class: "accordion",
        id: `faq-${idx}-${sIdx}`
      }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.faq, (faq, fIdx) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
          class: "accordion-item",
          key: fIdx
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
          class: "accordion-button collapsed",
          type: "button",
          "data-bs-toggle": "collapse",
          "data-bs-target": `#collapse-${idx}-${sIdx}-${fIdx}`
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.q), 9 /* TEXT, PROPS */, _hoisted_76)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          id: `collapse-${idx}-${sIdx}-${fIdx}`,
          class: "accordion-collapse collapse",
          "data-bs-parent": "#faq-accordion"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
          class: "accordion-body",
          innerHTML: faq.a
        }, null, 8 /* PROPS */, _hoisted_78)], 8 /* PROPS */, _hoisted_77)]);
      }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_74)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" References "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-book-open me-1"
      }, null, -1 /* CACHED */)), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "References:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.references), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        class: "btn btn-sm btn-outline-secondary mt-2 mt-sm-0",
        onClick: $event => $options.copyCitation(section)
      }, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-copy"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Copy Citation ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_82)])])])])], 8 /* PROPS */, _hoisted_52);
    }), 128 /* KEYED_FRAGMENT */))])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Real Stories Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "text-center mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-users me-2 text-gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Real Stories from Our Community")], -1 /* CACHED */)), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-muted mb-5"
  }, "Anonymous experiences shared by Muslim youth in the West", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.realStories, story => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-6",
      key: story.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "story-quote mb-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-quote-left fa-2x text-gold opacity-50"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_87, "\"" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(story.content) + "\"", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_89, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(story.age) + ", " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(story.location), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_90, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(story.type), 1 /* TEXT */)])])]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Interactive Scenarios Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_91, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "text-center mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-brain me-2 text-gold"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" What Would You Do?")], -1 /* CACHED */)), _cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center text-muted mb-5"
  }, "Interactive scenarios to test your understanding", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.interactiveScenarios, (scenario, idx) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-md-4",
      key: idx
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_95, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(scenario.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_96, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(scenario.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(scenario.options, (opt, optIdx) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        class: "form-check",
        key: optIdx
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
        class: "form-check-input",
        type: "radio",
        name: `scenario-${idx}`,
        id: `scenario-${idx}-${optIdx}`,
        onChange: $event => $options.checkScenarioAnswer(idx, opt.isCorrect)
      }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_98), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        class: "form-check-label small",
        for: `scenario-${idx}-${optIdx}`
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(opt.text), 9 /* TEXT, PROPS */, _hoisted_99)]);
    }), 128 /* KEYED_FRAGMENT */))]), $data.scenarioFeedback[idx] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["alert", $data.scenarioFeedback[idx].class])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.scenarioFeedback[idx].message), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Resources Footer "), _cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<footer class=\"footer py-5\" data-v-1431ac10><div class=\"container\" data-v-1431ac10><div class=\"row g-4\" data-v-1431ac10><div class=\"col-md-4\" data-v-1431ac10><h5 data-v-1431ac10><i class=\"fas fa-mobile-alt me-2\" data-v-1431ac10></i>Recommended Apps</h5><ul class=\"list-unstyled\" data-v-1431ac10><li data-v-1431ac10><i class=\"fas fa-check-circle text-success me-2\" data-v-1431ac10></i> <strong data-v-1431ac10>iPray</strong> - Prayer times &amp; Quran</li><li data-v-1431ac10><i class=\"fas fa-check-circle text-success me-2\" data-v-1431ac10></i> <strong data-v-1431ac10>Quran Companion</strong> - Memorization tools</li><li data-v-1431ac10><i class=\"fas fa-check-circle text-success me-2\" data-v-1431ac10></i> <strong data-v-1431ac10>SeekersGuidance</strong> - Free courses</li><li data-v-1431ac10><i class=\"fas fa-check-circle text-success me-2\" data-v-1431ac10></i> <strong data-v-1431ac10>Daily Hadith</strong> - Authentic collection</li></ul></div><div class=\"col-md-4\" data-v-1431ac10><h5 data-v-1431ac10><i class=\"fas fa-graduation-cap me-2\" data-v-1431ac10></i>Learning Resources</h5><ul class=\"list-unstyled\" data-v-1431ac10><li data-v-1431ac10><a href=\"#\" class=\"text-decoration-none\" data-v-1431ac10>📚 <strong data-v-1431ac10>SeekersGuidance</strong> - Structured courses</a></li><li data-v-1431ac10><a href=\"#\" class=\"text-decoration-none\" data-v-1431ac10>📖 <strong data-v-1431ac10>Yaqeen Institute</strong> - Research papers</a></li><li data-v-1431ac10><a href=\"#\" class=\"text-decoration-none\" data-v-1431ac10>🎓 <strong data-v-1431ac10>IslamQA.info</strong> - Q&amp;A database</a></li><li data-v-1431ac10><a href=\"#\" class=\"text-decoration-none\" data-v-1431ac10>📝 <strong data-v-1431ac10>Sunnah.com</strong> - Hadith collection</a></li></ul></div><div class=\"col-md-4\" data-v-1431ac10><h5 data-v-1431ac10><i class=\"fas fa-hand-holding-heart me-2\" data-v-1431ac10></i>Support</h5><p data-v-1431ac10>If you&#39;re experiencing abuse or neglect, please reach out:</p><ul class=\"list-unstyled\" data-v-1431ac10><li data-v-1431ac10><i class=\"fas fa-phone me-2\" data-v-1431ac10></i> NSPCC: 0808 800 5000</li><li data-v-1431ac10><i class=\"fas fa-envelope me-2\" data-v-1431ac10></i> Muslim Youth Helpline: 0808 808 2008</li></ul></div></div><hr class=\"my-4\" data-v-1431ac10><div class=\"text-center small text-muted\" data-v-1431ac10><p data-v-1431ac10>© 2024 Parent-Child Compass | All content is scholarly verified from authentic Islamic sources | May Allah guide us all to what is best</p></div></div></footer>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modals "), $data.showSourceModal ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 1,
    class: "modal fade",
    id: "sourceModal",
    tabindex: "-1",
    onClick: _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $data.showSourceModal = false, ["self"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "modal-title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-shield-alt me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Source Verification")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close btn-close-white",
    onClick: _cache[11] || (_cache[11] = $event => $data.showSourceModal = false)
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "This information has been verified from:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)((_$data$selectedSource = $data.selectedSource) === null || _$data$selectedSource === void 0 ? void 0 : _$data$selectedSource.primarySource), 1 /* TEXT */), _cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" - Primary reference", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Additional sources: ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    innerHTML: (_$data$selectedSource2 = $data.selectedSource) === null || _$data$selectedSource2 === void 0 ? void 0 : _$data$selectedSource2.references
  }, null, 8 /* PROPS */, _hoisted_104)])]), _cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "alert alert-info mt-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-info-circle me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" For detailed scholarly discussion, please refer to the original sources linked in our references section. ")], -1 /* CACHED */))])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
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