"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_components_vue_HajjComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'HajjComponent',
  setup(__props, {
    expose: __expose
  }) {
    __expose();
    const heroImage = {
      src: 'https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?cs=srgb&dl=pexels-neo-evenger-1772575973-28209449.jpg&fm=jpg',
      alt: 'Pilgrims in prayer near the sacred sanctuary'
    };
    const sectionImages = {
      basics: {
        src: 'https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?cs=srgb&dl=pexels-neo-evenger-1772575973-28209449.jpg&fm=jpg',
        alt: 'Pilgrims gathered for worship near the Grand Mosque',
        credit: 'Image source: Pexels'
      },
      umrah: {
        src: 'https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg?cs=srgb&dl=pexels-busrasahjn-13459175.jpg&fm=jpg',
        alt: 'Mosque and courtyard scene suited to worship and reflection',
        credit: 'Image source: Pexels'
      },
      hajj: {
        src: 'https://images.pexels.com/photos/12662176/pexels-photo-12662176.jpeg?cs=srgb&dl=pexels-muhammad-abdullah-2002371-12662176.jpg&fm=jpg',
        alt: 'Large gathering of worshippers in congregational prayer',
        credit: 'Image source: Pexels'
      },
      mistakes: {
        src: 'https://images.pexels.com/photos/19657349/pexels-photo-19657349.jpeg?cs=srgb&dl=pexels-bilalfurkankosar-19657349.jpg&fm=jpg',
        alt: 'Worshippers praying inside a mosque',
        credit: 'Image source: Pexels'
      },
      health: {
        src: 'https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?cs=srgb&dl=pexels-neo-evenger-1772575973-28209449.jpg&fm=jpg',
        alt: 'Pilgrims resting and moving carefully in a sacred setting',
        credit: 'Image source: Pexels'
      },
      rules: {
        src: 'https://images.pexels.com/photos/13459175/pexels-photo-13459175.jpeg?cs=srgb&dl=pexels-busrasahjn-13459175.jpg&fm=jpg',
        alt: 'Mosque architecture and calm prayer environment',
        credit: 'Image source: Pexels'
      },
      spiritual: {
        src: 'https://images.pexels.com/photos/19657349/pexels-photo-19657349.jpeg?cs=srgb&dl=pexels-bilalfurkankosar-19657349.jpg&fm=jpg',
        alt: 'Interior mosque scene suitable to reflection and worship',
        credit: 'Image source: Pexels'
      },
      postHajj: {
        src: 'https://images.pexels.com/photos/12662176/pexels-photo-12662176.jpeg?cs=srgb&dl=pexels-muhammad-abdullah-2002371-12662176.jpg&fm=jpg',
        alt: 'Congregational prayer after a gathering of worshippers',
        credit: 'Image source: Pexels'
      }
    };
    const pdfGuides = [{
      label: 'Scholarly guide',
      title: 'Hajj and Umrah step by step',
      desc: 'A practical rites guide hosted by IslamHouse.',
      url: 'https://d1.islamhouse.com/data/en/ih_books/single2/en-hajj-umrah.pdf',
      filename: 'hajj-umrah-step-by-step.pdf'
    }, {
      label: 'Detailed manual',
      title: "How to perform the rituals of Hajj, Umrah and visiting the Prophet's Masjid",
      desc: 'A longer instructional manual hosted by IslamHouse.',
      url: 'https://d1.islamhouse.com/data/en/ih_books/single/en-dalil-98.pdf',
      filename: 'rituals-of-hajj-umrah-and-visiting-the-prophets-masjid.pdf'
    }, {
      label: 'Official health PDF',
      title: 'Saudi Hajj health requirements 1447H / 2026',
      desc: 'Official Ministry of Health requirements and recommendations.',
      url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf',
      filename: 'saudi-hajj-health-requirements-1447H-2026.pdf'
    }, {
      label: 'Official health guide',
      title: 'General guide for health of Hajj and Umrah pilgrims',
      desc: 'A practical English health guide from the Saudi Ministry of Health.',
      url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/English.pdf',
      filename: 'general-guide-for-health-of-hajj-and-umrah-pilgrims.pdf'
    }];
    const basicsCards = [{
      num: '01',
      title: 'Hajj is obligatory for the one who is able',
      desc: 'The obligation is tied to ability: physical capacity, financial capacity, and a workable route to the pilgrimage.',
      note: "Reference: Qur'an 3:97."
    }, {
      num: '02',
      title: 'Umrah is not casual travel',
      desc: "The Qur'an joins Hajj and Umrah in one verse, and the jurists discuss its exact legal weight. In any case, it is a legislated act of worship, not tourism.",
      note: "Reference: Qur'an 2:196."
    }, {
      num: '03',
      title: 'Accepted Hajj brings immense reward',
      desc: 'The Prophet taught that an accepted Hajj has no reward except Paradise, and one Umrah to the next expiates what came between them.',
      note: "Reference: Sunan an-Nasa'i 2622."
    }, {
      num: '04',
      title: 'Learning the rites is part of the rite',
      desc: 'A pilgrim should not rely on crowd movement alone. Study before travel and ask when the issue affects validity or fidyah.',
      note: "Reference: Sunan an-Nasa'i 3062."
    }];
    const hajjTypes = [{
      title: "Tamattu'",
      desc: "Perform Umrah in the months of Hajj, leave Ihram, then re-enter Ihram for Hajj on the 8th of Dhul-Hijjah.",
      note: 'Often the clearest path for many first-time pilgrims.'
    }, {
      title: 'Qiran',
      desc: 'Enter Ihram for Umrah and Hajj together and remain in Ihram until the major rites are completed.',
      note: 'Useful in some travel plans, but it keeps the pilgrim in Ihram longer.'
    }, {
      title: 'Ifrad',
      desc: 'Enter Ihram for Hajj alone without combining Umrah into the same Ihram.',
      note: 'The practical choice depends on circumstances, group planning, and fiqh guidance.'
    }];
    const umrahSteps = [{
      num: '01',
      title: 'Enter Ihram at the miqat',
      desc: 'Make intention and begin Talbiyah at or before the appointed miqat. Do not cross the miqat casually and plan to fix it later.',
      tip: 'Prepare clothing and intention before reaching the boundary if you are flying or moving with a group.',
      ref: 'Reference: Sahih al-Bukhari 1524.'
    }, {
      num: '02',
      title: 'Perform Tawaf with calmness',
      desc: 'Circle the Kaaba seven times, beginning from the Black Stone area. The purpose is worship, not speed or crowd aggression.',
      tip: 'If reaching the Black Stone is difficult, pointing from a distance is enough. Do not harm others.',
      ref: "Reference: General Prophetic rite sequence and the instruction to learn the rituals in Sunan an-Nasa'i 3062."
    }, {
      num: '03',
      title: "Complete Sa'i between Safa and Marwah",
      desc: "Walk the required lengths between Safa and Marwah. The Qur'an names them among the symbols of Allah.",
      tip: 'Keep your dua and dhikr steady even when the space is crowded.',
      ref: "Reference: Qur'an 2:158."
    }, {
      num: '04',
      title: 'Trim or shave the hair',
      desc: 'Men shave or shorten the hair; women cut a small amount from the ends. This ends the state of Ihram for Umrah.',
      tip: 'Do not leave this until confusion sets in. It is the closing act of the Umrah.',
      ref: 'Reference: Established Prophetic practice in the rites.'
    }];
    const hajjDays = [{
      date: '8 Dhul-Hijjah',
      title: 'Mina',
      desc: "Pilgrims go to Mina and spend the day and night there in prayer and preparation. Tamattu' pilgrims enter Ihram for Hajj on this day.",
      reminder: 'Use the day to settle your mind before Arafah.',
      ref: 'Reference: The Farewell Pilgrimage sequence in the hadith corpus.'
    }, {
      date: '9 Dhul-Hijjah',
      title: 'Arafah',
      desc: 'Standing at Arafah is the central pillar of Hajj. The pilgrim remains within the boundaries of Arafah until sunset in repentance and supplication.',
      reminder: 'Missing Arafah is not a small mistake. It is the defining station of Hajj.',
      ref: "Reference: 'Hajj is Arafah' in Sunan Ibn Majah 3015."
    }, {
      date: 'Night of 10 Dhul-Hijjah',
      title: 'Muzdalifah',
      desc: 'After sunset, pilgrims move to Muzdalifah, combine Maghrib and Isha there, rest, and prepare for the next day.',
      reminder: 'Stay with your group safely and keep movement orderly.',
      ref: 'Reference: The Farewell Pilgrimage sequence in the hadith corpus.'
    }, {
      date: '10 Dhul-Hijjah',
      title: 'Stoning, sacrifice, shaving, and Tawaf al-Ifadah',
      desc: 'Pilgrims stone Jamrat al-Aqabah, arrange sacrifice where due, shave or trim the hair, and perform Tawaf al-Ifadah, with Sa\'i where due.',
      reminder: 'Some ordering concessions exist in the Sunnah, but specific cases should still be checked carefully.',
      ref: "Reference: Qur'an 2:196 and the Prophetic rite sequence."
    }, {
      date: '11 to 13 Dhul-Hijjah',
      title: 'Days of Tashriq',
      desc: 'The pilgrim stays in Mina and stones the three Jamarat on the appointed days while continuing remembrance of Allah.',
      reminder: "The Qur'an allows leaving after two days or staying for a third.",
      ref: "Reference: Qur'an 2:203."
    }];
    const commonMistakes = [{
      title: 'Crossing the miqat without entering Ihram',
      desc: 'This is one of the most common practical mistakes for travellers who are distracted, unprepared, or following a group loosely.',
      note: 'Fixing this can involve more than simply making intention later. Ask a scholar promptly.'
    }, {
      title: 'Treating crowd pressure as permission to harm others',
      desc: 'The rites do not become more valid because they were done aggressively. Pushing and elbowing at the Black Stone area is not devotion.',
      note: 'Preserving worship and preserving people both matter.'
    }, {
      title: 'Copying rituals without knowing what is essential',
      desc: 'Many pilgrims imitate others without knowing whether an act is a pillar, a duty, or a recommended Sunnah.',
      note: "Reference trail: use the guides and hadith anchors on this page instead of crowd imitation."
    }, {
      title: 'Assuming every violation invalidates the pilgrimage',
      desc: 'Some mistakes require repentance, some require fidyah, and some affect validity more seriously than others. These are not all the same.',
      note: 'This is exactly where qualified scholarly advice becomes necessary.'
    }];
    const healthReadiness = [{
      title: 'Official readiness checks',
      items: ['Check current Saudi vaccination and public-health requirements close to departure.', 'Review whether age, pregnancy, severe illness, or chronic conditions affect your ability to travel.', 'Keep official booking, visa, and identification records organized before departure.']
    }, {
      title: 'On-the-ground practical care',
      items: ['Hydrate consistently and avoid leaving basic fatigue or heat stress untreated.', 'Use unscented hygiene items if you will be in Ihram.', 'Carry only what you can realistically manage in crowds and long walks.', 'If you are medically vulnerable, speak to your doctor and your scholar before travel.']
    }];
    const rules = {
      permissible: ['Using an umbrella, belt, bag, watch, glasses, and shade.', 'Bathing and washing with unscented products when needed.', 'Seeking medical care, rest, and crowd safety.', 'Reciting Qur\'an, making dua, and helping fellow pilgrims.'],
      prohibited: ['Applying perfume after entering Ihram.', 'Cutting hair or trimming nails without a recognized excuse and ruling.', 'Marital relations and conduct leading directly to them.', 'For men: stitched regular clothing and covering the head.', 'For women: treating the niqab and gloves as Ihram wear.', 'Hunting land game while in the sacred state.']
    };
    const spiritualPrep = [{
      step: '01',
      title: 'Repair wrongs before travel',
      desc: 'Return what belongs to people, settle what you can, and ask forgiveness where you have harmed others.',
      ref: 'A sacred journey should not begin carelessly with neglected rights.'
    }, {
      step: '02',
      title: 'Learn the rituals before the crowd teaches you badly',
      desc: 'Study the order, the common errors, and the places where you must stop and ask a scholar.',
      ref: "Reference: 'Learn your rituals from me' in Sunan an-Nasa'i 3062."
    }, {
      step: '03',
      title: 'Train for patience',
      desc: 'Crowds, heat, waiting, and exhaustion are part of the test. The heart should prepare for restraint before the body arrives there.',
      ref: 'Accepted Hajj is tied to upright conduct, not just outward movement.'
    }, {
      step: '04',
      title: 'Keep the intention simple',
      desc: 'Do not turn pilgrimage into a performance, travel trophy, or social showcase. Intend worship, repentance, and acceptance.',
      ref: "Reference: Qur'an 2:127 as a model dua for acceptance."
    }];
    const shorts = [{
      id: 'HfUhWfYsnsA',
      channel: 'Tajweed Online',
      title: 'Step by step guide on how to perform Umrah',
      note: 'Useful as a visual refresher for sequence. Check fiqh details against the PDF guides and textual references.'
    }, {
      id: 'xIgK2ahrXL8',
      channel: 'Brief visual guide',
      title: 'How to perform Umrah step by step',
      note: 'Included as a short visual walkthrough, not as an independent legal authority.'
    }, {
      id: 'T0SNUkkg9pw',
      channel: 'Aaj TV Official',
      title: 'Pilgrims gather in Arafat for the Day of Arafah',
      note: 'Useful for visual context around one of the central days of Hajj. Do not use it as a fiqh source.'
    }];
    const resources = [{
      label: 'Primary text',
      title: "Qur'an 3:97",
      desc: 'The foundational verse for the obligation of Hajj upon the one who is able.',
      url: 'https://quran.com/3/97'
    }, {
      label: 'Primary text',
      title: "Qur'an 2:158, 2:196, 2:203",
      desc: 'Key verses for Sa\'i, completion of Hajj and Umrah, and the appointed days in Mina.',
      url: 'https://quran.com/2/158 • https://quran.com/2/196 • https://quran.com/2/203'
    }, {
      label: 'Hadith',
      title: 'Bukhari 1524, Ibn Majah 3015, Muslim 1327, Nasa\'i 3062, Nasa\'i 2622',
      desc: 'Miqat, Arafah, farewell tawaf, learning the rites, and the reward of accepted Hajj.',
      url: 'https://sunnah.com/bukhari:1524 • https://sunnah.com/ibnmajah:3015 • https://sunnah.com/muslim:1327 • https://sunnah.com/nasai:3062 • https://sunnah.com/nasai:2622'
    }, {
      label: 'Official planning',
      title: 'Nusuk and Nusuk Hajj',
      desc: 'Official Saudi planning and registration resources for Umrah and Hajj services.',
      url: 'https://www.nusuk.sa/en • https://hajj.nusuk.sa/?language=en'
    }, {
      label: 'Official health',
      title: 'Saudi Ministry of Health pilgrim guidance',
      desc: 'Current health pages and official health documents for pilgrims.',
      url: 'https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/pages/default.aspx'
    }];
    const faqs = [{
      q: 'What if I miss standing at Arafah?',
      a: 'Standing at Arafah is central to Hajj. A pilgrim who misses it faces a serious validity issue and should seek immediate scholarly guidance about what follows.',
      ref: "Reference: 'Hajj is Arafah' in Sunan Ibn Majah 3015."
    }, {
      q: 'Can I leave Mina after two days?',
      a: 'Yes. The Qur\'an allows departure after two days of the appointed days or staying longer without sin when done properly.',
      ref: "Reference: Qur'an 2:203."
    }, {
      q: 'Are the short videos enough to learn the rites?',
      a: 'No. They can help you visualize the sequence, but they should not replace the Qur\'an, hadith, trusted scholars, and structured written guides.',
      ref: 'Use the short videos only as supplementary refreshers.'
    }, {
      q: 'Where should I verify health and travel rules near departure?',
      a: 'Check Nusuk and the Saudi Ministry of Health close to your travel date. Do not rely on old screenshots or old group messages.',
      ref: 'Operational guidance can change from season to season.'
    }];
    const postHajjSteps = [{
      num: '01',
      title: 'Ask for acceptance, not praise',
      desc: 'The right response after worship is humility and dua that Allah accepted it.',
      tip: 'Keep the dua of acceptance on your tongue.',
      ref: "Reference: Qur'an 2:127."
    }, {
      num: '02',
      title: 'Protect the obligations first',
      desc: 'The strongest sign of benefit is steadier prayer, better honesty, and more guarded speech when you return.',
      tip: 'Start with salah, family rights, and daily dhikr.',
      ref: 'Accepted Hajj should leave a trace in conduct.'
    }, {
      num: '03',
      title: 'Carry the manners of pilgrimage home',
      desc: 'Patience, gentleness, and restraint in crowded sacred places should not disappear at the airport.',
      tip: 'Bring the softened character home, not just souvenirs and stories.',
      ref: "Reference: Sunan an-Nasa'i 2622 for the reward of accepted Hajj."
    }];
    const sectionReferences = {
      basics: [{
        title: "Qur'an 3:97",
        url: 'https://quran.com/3/97'
      }, {
        title: "Qur'an 2:196",
        url: 'https://quran.com/2/196'
      }, {
        title: "Sunan an-Nasa'i 2622",
        url: 'https://sunnah.com/nasai:2622'
      }, {
        title: "Sunan an-Nasa'i 3062",
        url: 'https://sunnah.com/nasai:3062'
      }],
      umrah: [{
        title: 'Sahih al-Bukhari 1524',
        url: 'https://sunnah.com/bukhari:1524'
      }, {
        title: "Qur'an 2:158",
        url: 'https://quran.com/2/158'
      }, {
        title: "Sunan an-Nasa'i 3062",
        url: 'https://sunnah.com/nasai:3062'
      }],
      hajj: [{
        title: 'Sunan Ibn Majah 3015',
        url: 'https://sunnah.com/ibnmajah:3015'
      }, {
        title: "Qur'an 2:196",
        url: 'https://quran.com/2/196'
      }, {
        title: "Qur'an 2:203",
        url: 'https://quran.com/2/203'
      }, {
        title: 'Sahih Muslim 1327',
        url: 'https://sunnah.com/muslim:1327'
      }],
      mistakes: [{
        title: 'IslamHouse step-by-step guide',
        url: 'https://d1.islamhouse.com/data/en/ih_books/single2/en-hajj-umrah.pdf'
      }, {
        title: "Sunan an-Nasa'i 3062",
        url: 'https://sunnah.com/nasai:3062'
      }],
      health: [{
        title: 'Saudi MOH pilgrim health page',
        url: 'https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/pages/default.aspx'
      }, {
        title: 'Saudi Hajj Health Requirements PDF',
        url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/Hajj-Health-Requirements-English-language.pdf'
      }, {
        title: 'General Guide for Health of Hajj and Umrah Pilgrims PDF',
        url: 'https://www.moh.gov.sa/HealthAwareness/Pilgrims-Health/Documents/English.pdf'
      }],
      rules: [{
        title: "Qur'an 2:196",
        url: 'https://quran.com/2/196'
      }, {
        title: "Sunan an-Nasa'i 3062",
        url: 'https://sunnah.com/nasai:3062'
      }],
      spiritual: [{
        title: "Sunan an-Nasa'i 3062",
        url: 'https://sunnah.com/nasai:3062'
      }, {
        title: "Sunan an-Nasa'i 2622",
        url: 'https://sunnah.com/nasai:2622'
      }, {
        title: "Qur'an 2:127",
        url: 'https://quran.com/2/127'
      }]
    };
    const activeFaq = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const scrollToSection = id => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
    const toggleFaq = index => {
      activeFaq.value = activeFaq.value === index ? null : index;
    };
    const downloadPdf = guide => {
      const link = document.createElement('a');
      link.href = guide.url;
      link.download = guide.filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    let sectionObserver;
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.12
      });
      document.querySelectorAll('.fade-in-section').forEach(element => {
        sectionObserver.observe(element);
      });
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
      if (sectionObserver) {
        sectionObserver.disconnect();
      }
    });
    const __returned__ = {
      heroImage,
      sectionImages,
      pdfGuides,
      basicsCards,
      hajjTypes,
      umrahSteps,
      hajjDays,
      commonMistakes,
      healthReadiness,
      rules,
      spiritualPrep,
      shorts,
      resources,
      faqs,
      postHajjSteps,
      sectionReferences,
      activeFaq,
      scrollToSection,
      toggleFaq,
      downloadPdf,
      get sectionObserver() {
        return sectionObserver;
      },
      set sectionObserver(v) {
        sectionObserver = v;
      },
      onBeforeUnmount: vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "pg"
};
const _hoisted_2 = {
  class: "main-container"
};
const _hoisted_3 = {
  class: "hero fade-in-section"
};
const _hoisted_4 = {
  class: "hero-copy"
};
const _hoisted_5 = {
  class: "hero-actions"
};
const _hoisted_6 = {
  class: "hero-visual"
};
const _hoisted_7 = ["src", "alt"];
const _hoisted_8 = {
  class: "sec fade-in-section",
  id: "guides"
};
const _hoisted_9 = {
  class: "pdf-grid"
};
const _hoisted_10 = {
  class: "pdf-label"
};
const _hoisted_11 = ["onClick"];
const _hoisted_12 = {
  class: "sec alt fade-in-section",
  id: "basics"
};
const _hoisted_13 = {
  class: "sec-header-with-image"
};
const _hoisted_14 = {
  class: "sec-image"
};
const _hoisted_15 = ["src", "alt"];
const _hoisted_16 = {
  class: "image-credit"
};
const _hoisted_17 = {
  class: "cards-grid"
};
const _hoisted_18 = {
  class: "card-num"
};
const _hoisted_19 = {
  class: "card-note"
};
const _hoisted_20 = {
  class: "types-grid"
};
const _hoisted_21 = {
  class: "type-note"
};
const _hoisted_22 = {
  class: "reference-panel"
};
const _hoisted_23 = {
  class: "reference-list"
};
const _hoisted_24 = {
  class: "sec fade-in-section",
  id: "umrah"
};
const _hoisted_25 = {
  class: "sec-header-with-image"
};
const _hoisted_26 = {
  class: "sec-image"
};
const _hoisted_27 = ["src", "alt"];
const _hoisted_28 = {
  class: "image-credit"
};
const _hoisted_29 = {
  class: "tl"
};
const _hoisted_30 = {
  class: "tl-left"
};
const _hoisted_31 = {
  class: "tl-num"
};
const _hoisted_32 = {
  key: 0,
  class: "tl-line"
};
const _hoisted_33 = {
  class: "tl-body"
};
const _hoisted_34 = {
  class: "tl-tip"
};
const _hoisted_35 = {
  class: "tl-ref"
};
const _hoisted_36 = {
  class: "reference-panel"
};
const _hoisted_37 = {
  class: "reference-list"
};
const _hoisted_38 = {
  class: "sec alt fade-in-section",
  id: "hajj"
};
const _hoisted_39 = {
  class: "sec-header-with-image"
};
const _hoisted_40 = {
  class: "sec-image"
};
const _hoisted_41 = ["src", "alt"];
const _hoisted_42 = {
  class: "image-credit"
};
const _hoisted_43 = {
  class: "days-grid"
};
const _hoisted_44 = {
  class: "day-head"
};
const _hoisted_45 = {
  class: "day-date"
};
const _hoisted_46 = {
  class: "day-body"
};
const _hoisted_47 = {
  class: "day-reminder"
};
const _hoisted_48 = {
  class: "day-ref"
};
const _hoisted_49 = {
  class: "reference-panel"
};
const _hoisted_50 = {
  class: "reference-list"
};
const _hoisted_51 = {
  class: "sec fade-in-section",
  id: "mistakes"
};
const _hoisted_52 = {
  class: "sec-header-with-image"
};
const _hoisted_53 = {
  class: "sec-image"
};
const _hoisted_54 = ["src", "alt"];
const _hoisted_55 = {
  class: "image-credit"
};
const _hoisted_56 = {
  class: "cards-grid"
};
const _hoisted_57 = {
  class: "card-note"
};
const _hoisted_58 = {
  class: "reference-panel"
};
const _hoisted_59 = {
  class: "reference-list"
};
const _hoisted_60 = {
  class: "sec alt fade-in-section",
  id: "health"
};
const _hoisted_61 = {
  class: "sec-header-with-image"
};
const _hoisted_62 = {
  class: "sec-image"
};
const _hoisted_63 = ["src", "alt"];
const _hoisted_64 = {
  class: "image-credit"
};
const _hoisted_65 = {
  class: "rules-grid"
};
const _hoisted_66 = {
  class: "rules-hdr pos"
};
const _hoisted_67 = {
  class: "rules-list"
};
const _hoisted_68 = {
  class: "reference-panel"
};
const _hoisted_69 = {
  class: "reference-list"
};
const _hoisted_70 = {
  class: "sec fade-in-section",
  id: "rules"
};
const _hoisted_71 = {
  class: "sec-header-with-image"
};
const _hoisted_72 = {
  class: "sec-image"
};
const _hoisted_73 = ["src", "alt"];
const _hoisted_74 = {
  class: "image-credit"
};
const _hoisted_75 = {
  class: "rules-grid"
};
const _hoisted_76 = {
  class: "rules-card"
};
const _hoisted_77 = {
  class: "rules-list"
};
const _hoisted_78 = {
  class: "rules-card"
};
const _hoisted_79 = {
  class: "rules-list"
};
const _hoisted_80 = {
  class: "reference-panel"
};
const _hoisted_81 = {
  class: "reference-list"
};
const _hoisted_82 = {
  class: "sec alt fade-in-section",
  id: "spiritual"
};
const _hoisted_83 = {
  class: "sec-header-with-image"
};
const _hoisted_84 = {
  class: "sec-image"
};
const _hoisted_85 = ["src", "alt"];
const _hoisted_86 = {
  class: "image-credit"
};
const _hoisted_87 = {
  class: "cards-grid"
};
const _hoisted_88 = {
  class: "card-num"
};
const _hoisted_89 = {
  class: "card-note"
};
const _hoisted_90 = {
  class: "reference-panel"
};
const _hoisted_91 = {
  class: "reference-list"
};
const _hoisted_92 = {
  class: "sec fade-in-section",
  id: "shorts"
};
const _hoisted_93 = {
  class: "shorts-grid"
};
const _hoisted_94 = {
  class: "short-frame"
};
const _hoisted_95 = ["src", "title"];
const _hoisted_96 = {
  class: "short-copy"
};
const _hoisted_97 = {
  class: "resource-label"
};
const _hoisted_98 = {
  class: "sec alt fade-in-section",
  id: "resources"
};
const _hoisted_99 = {
  class: "resource-grid"
};
const _hoisted_100 = {
  class: "resource-label"
};
const _hoisted_101 = {
  class: "resource-url"
};
const _hoisted_102 = {
  class: "faq-wrap"
};
const _hoisted_103 = ["onClick"];
const _hoisted_104 = {
  class: "faq-a"
};
const _hoisted_105 = {
  class: "faq-ref"
};
const _hoisted_106 = {
  class: "sec fade-in-section",
  id: "post-hajj"
};
const _hoisted_107 = {
  class: "sec-header-with-image"
};
const _hoisted_108 = {
  class: "sec-image"
};
const _hoisted_109 = ["src", "alt"];
const _hoisted_110 = {
  class: "image-credit"
};
const _hoisted_111 = {
  class: "tl"
};
const _hoisted_112 = {
  class: "tl-left"
};
const _hoisted_113 = {
  class: "tl-num"
};
const _hoisted_114 = {
  key: 0,
  class: "tl-line"
};
const _hoisted_115 = {
  class: "tl-body"
};
const _hoisted_116 = {
  class: "tl-tip"
};
const _hoisted_117 = {
  class: "tl-ref"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [_cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-arabic"
  }, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", -1 /* CACHED */)), _cache[3] || (_cache[3] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "hero-kicker"
  }, "Hajj & Umrah Guide", -1 /* CACHED */)), _cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "hero-title"
  }, "A cleaner, sourced guide for Hajj and Umrah.", -1 /* CACHED */)), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "hero-subtitle"
  }, " This page focuses on the core rites, common mistakes, official health guidance, and a more careful reference trail. Primary texts and official Saudi resources remain the standard, while short videos are treated as supplementary refreshers only. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-primary",
    onClick: _cache[0] || (_cache[0] = $event => $setup.scrollToSection('guides'))
  }, "Download real guides"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn-secondary",
    onClick: _cache[1] || (_cache[1] = $event => $setup.scrollToSection('umrah'))
  }, "Review the rites")]), _cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-trust"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "trust-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Primary texts"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Qur'an and hadith references shown inside the page.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "trust-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Official travel guidance"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Nusuk and Saudi MOH sources included below.")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "trust-item"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Cleaner presentation"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Less noise, more whitespace, fewer distracting links.")])], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.heroImage.src,
    alt: $setup.heroImage.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_7), _cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-image-overlay"
  }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_8, [_cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd sec-hd-center\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Downloads</span><h2 class=\"sec-title\" data-v-44a8361a>Real PDF guides</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> These buttons now point to actual guides and official health documents instead of dummy files. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.pdfGuides, guide => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: guide.url,
      class: "pdf-card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(guide.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "download-btn",
      onClick: $event => $setup.downloadPdf(guide)
    }, " Download PDF ", 8 /* PROPS */, _hoisted_11)]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter I</span><h2 class=\"sec-title\" data-v-44a8361a>Foundations before the journey</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> Learn the obligation, the categories of Hajj, and the difference between foundational rulings and personal cases that still require a scholar. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.basics.src,
    alt: $setup.sectionImages.basics.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_15), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.basics.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.basicsCards, card => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: card.num,
      class: "card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.num), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.note), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.hajjTypes, type => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: type.title,
      class: "type-card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(type.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(type.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(type.note), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Key references", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.basics, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter II</span><h2 class=\"sec-title\" data-v-44a8361a>Umrah step by step</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> The Umrah sequence is short, but mistakes usually happen through haste, crowd pressure, or uncertainty at the miqat and during tawaf. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.umrah.src,
    alt: $setup.sectionImages.umrah.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_27), _cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.umrah.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.umrahSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: step.num,
      class: "tl-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.num), 1 /* TEXT */), index !== $setup.umrahSteps.length - 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.tip), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.ref), 1 /* TEXT */)])]);
  }), 64 /* STABLE_FRAGMENT */))]), _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "conclusion"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "After Umrah"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, " When the hair is trimmed or shaved, Ihram ends. For Tamattu', the pilgrim remains out of Ihram until entering Ihram again for Hajj on the 8th of Dhul-Hijjah. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Key references", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.umrah, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter III</span><h2 class=\"sec-title\" data-v-44a8361a>The major days of Hajj</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> The order of the days matters, but the greatest misunderstanding is forgetting that Arafah is the center of the pilgrimage. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.hajj.src,
    alt: $setup.sectionImages.hajj.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_41), _cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.hajj.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.hajjDays, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: day.date,
      class: "day-card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.reminder), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.ref), 1 /* TEXT */)])]);
  }), 64 /* STABLE_FRAGMENT */))]), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "farewell"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "farewell-arabic"
  }, "طواف الوداع"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Farewell Tawaf"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, " Before leaving Makkah, the pilgrim makes a final tawaf unless exempted by a recognized reason such as menstruation. Keep the ending dignified and avoid turning it into a rushed photo stop. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("cite", null, "Reference: Sahih Muslim 1327")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Key references", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.hajj, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter IV</span><h2 class=\"sec-title\" data-v-44a8361a>Common mistakes to avoid</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> These are recurring problems that do not come from lack of sincerity, but from poor preparation, pressure, and imitation without knowledge. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.mistakes.src,
    alt: $setup.sectionImages.mistakes.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_54), _cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.mistakes.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.commonMistakes, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: item.title,
      class: "card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.note), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Key references", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.mistakes, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter V</span><h2 class=\"sec-title\" data-v-44a8361a>Health, safety, and readiness</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> Physical ability and official health requirements are part of real-world Hajj preparation, not an afterthought. Recheck them close to travel because they can change. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.health.src,
    alt: $setup.sectionImages.health.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_63), _cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.health.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.healthReadiness, group => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: group.title,
      class: "rules-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M12 2 3 7v5c0 5.1 3.4 9.8 9 11 5.6-1.2 9-5.9 9-11V7zm-1 14-4-4 1.4-1.4 2.6 2.6 5.6-5.6L18 9z"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_67, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(group.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "dot-y"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
        viewBox: "0 0 24 24",
        fill: "currentColor"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
        d: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
      })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 64 /* STABLE_FRAGMENT */))]), _cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-note"
  }, " Official vaccination rules, seasonal public-health measures, and entry conditions must be checked against the Saudi Ministry of Health and Nusuk near departure. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Key references", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.health, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter VI</span><h2 class=\"sec-title\" data-v-44a8361a>Ihram rules and etiquette</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> Know the difference between what remains permitted, what is prohibited, and what should be taken to a scholar when an error happens. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.rules.src,
    alt: $setup.sectionImages.rules.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_73), _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.rules.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_76, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "rules-hdr pos"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Permissible acts ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_77, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.rules.permissible, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "dot-y"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
    })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_78, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "rules-hdr neg"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    d: "m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Prohibited acts ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_79, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.rules.prohibited, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "dot-n"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "m19 6.41-1.41-1.41L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), _cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "section-note"
  }, " If an error happened because of illness, forgetfulness, or necessity, do not improvise the ruling. Ask a qualified scholar about validity, fidyah, and what must be repeated. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Key references", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.rules, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter VII</span><h2 class=\"sec-title\" data-v-44a8361a>Spiritual preparation</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> The outward rites are stronger when repentance, humility, patience, and learning have already started before travel. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.spiritual.src,
    alt: $setup.sectionImages.spiritual.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_85), _cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.spiritual.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.spiritualPrep, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: item.step,
      class: "card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_88, "Step " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.step), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.ref), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Key references", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_91, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.sectionReferences.spiritual, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: item.title,
      class: "reference-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.url), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_92, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd sec-hd-center\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Supplementary Media</span><h2 class=\"sec-title\" data-v-44a8361a>Short visual refreshers</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> These short videos are supplementary visual refreshers only. They are not the standard for legal rulings. Keep the Qur&#39;an, hadith, and the PDF guides below above any short clip. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_93, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.shorts, video => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: video.id,
      class: "short-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
      src: `https://www.youtube-nocookie.com/embed/${video.id}`,
      title: video.title,
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: ""
    }, null, 8 /* PROPS */, _hoisted_95)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_97, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.channel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(video.note), 1 /* TEXT */)])]);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_98, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd sec-hd-center\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Chapter VIII</span><h2 class=\"sec-title\" data-v-44a8361a>Key references and official resources</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> These are intentionally displayed as non-clickable reference blocks, so the page behaves more like a study guide than a link directory. The PDF buttons above remain downloadable. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.resources, resource => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: resource.title,
      class: "resource-card hover-lift"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_100, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(resource.url), 1 /* TEXT */)]);
  }), 64 /* STABLE_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_102, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Common questions", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.faqs, (faq, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      key: faq.q,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["faq-item", {
        open: $setup.activeFaq === index
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "faq-q",
      onClick: $event => $setup.toggleFaq(index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.q), 1 /* TEXT */), _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
      viewBox: "0 0 24 24"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
      d: "m7 10 5 5 5-5z"
    })], -1 /* CACHED */))], 8 /* PROPS */, _hoisted_103), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.a), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.ref), 1 /* TEXT */)])], 2 /* CLASS */);
  }), 64 /* STABLE_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_107, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"sec-hd\" data-v-44a8361a><span class=\"eyebrow\" data-v-44a8361a>Closing</span><h2 class=\"sec-title\" data-v-44a8361a>Returning home with acceptance in mind</h2><div class=\"sec-ornament\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"sec-desc\" data-v-44a8361a> The journey is not measured by photographs or stories, but by repentance, steadier prayer, better conduct, and a sincere hope that Allah accepted it. </p></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: $setup.sectionImages.postHajj.src,
    alt: $setup.sectionImages.postHajj.alt,
    loading: "lazy"
  }, null, 8 /* PROPS */, _hoisted_109), _cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "image-overlay"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sectionImages.postHajj.credit), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.postHajjSteps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", {
      key: step.num,
      class: "tl-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_112, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.num), 1 /* TEXT */), index !== $setup.postHajjSteps.length - 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_114)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_115, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.desc), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_116, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.tip), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.ref), 1 /* TEXT */)])]);
  }), 64 /* STABLE_FRAGMENT */))])]), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"disclaimer-section fade-in-section\" data-v-44a8361a><div class=\"disclaimer-box\" data-v-44a8361a><h4 data-v-44a8361a>Scope of this page</h4><p class=\"ref-text\" data-v-44a8361a> This guide aims to stay close to primary texts, established instructional guides, and official Saudi health and logistics sources. It does not replace a scholar for illness, menstruation, fidyah, missed rites, disputes between madhhabs, or complicated travel restrictions. </p><ul class=\"ref-list\" data-v-44a8361a><li data-v-44a8361a>Qur&#39;anic anchors used here: 3:97, 2:158, 2:196, 2:203, 2:127.</li><li data-v-44a8361a>Hadith anchors used here: Bukhari 1524, Ibn Majah 3015, Muslim 1327, Nasa&#39;i 3062, Nasa&#39;i 2622.</li><li data-v-44a8361a>Official operational guidance used here: Nusuk and Saudi Ministry of Health documents current for 1447H / 2026.</li></ul></div><div class=\"warning-box\" data-v-44a8361a><div class=\"warning-icon\" data-v-44a8361a><svg viewBox=\"0 0 24 24\" fill=\"currentColor\" data-v-44a8361a><path d=\"M1 21h22L12 2 1 21zm11-3h-1v-1h1zm0-3h-1v-4h1z\" data-v-44a8361a></path></svg></div><div class=\"warning-content\" data-v-44a8361a><h4 data-v-44a8361a>Important note</h4><p data-v-44a8361a> “Scholarly approved” in practice still means verifying your personal case with a qualified scholar. This page gives the mainstream structure and source trail, not a personalized fatwa. </p></div></div></div><div class=\"closing fade-in-section\" data-v-44a8361a><div class=\"closing-arabic\" data-v-44a8361a>رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ</div><div class=\"closing-div\" data-v-44a8361a><span class=\"sec-ornament-dot\" data-v-44a8361a></span></div><p class=\"closing-en\" data-v-44a8361a>Our Lord, accept this from us. You are the All-Hearing, the All-Knowing.</p><span class=\"closing-ref\" data-v-44a8361a>Qur&#39;an 2:127</span><p class=\"closing-msg\" data-v-44a8361a> May Allah grant every pilgrim a sound journey, a valid pilgrimage, and a return marked by humility, gratitude, and firmer obedience. </p></div>", 2))])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue":
/*!****************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true */ "./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true");
/* harmony import */ var _HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=script&setup=true&lang=js */ "./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _HajjComponent_vue_vue_type_style_index_0_id_44a8361a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css */ "./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-44a8361a"],['__file',"resources/components/vue/HajjComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css":
/*!************************************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_style_index_0_id_44a8361a_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=style&index=0&id=44a8361a&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_HajjComponent_vue_vue_type_template_id_44a8361a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/HajjComponent.vue?vue&type=template&id=44a8361a&scoped=true");


/***/ })

}]);