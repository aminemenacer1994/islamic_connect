"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Ramadan2026Component_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_ramadan_2026_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/ramadan_2026.json */ "./resources/components/vue/data/ramadan_2026.json");
/* harmony import */ var _SectionToolbar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SectionToolbar.vue */ "./resources/components/vue/SectionToolbar.vue");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Ramadan2026Component",
  components: {
    SectionToolbar: _SectionToolbar_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data() {
    return {
      ramadan: _data_ramadan_2026_json__WEBPACK_IMPORTED_MODULE_0__,
      heroSearchTerm: "",
      duaSearchTerm: "",
      duaSourceFilter: "all",
      duaSectionFilter: "all",
      heroImageOverride: null,
      heroImageFallback: "/images/banner-photo-800.webp",
      calendarStartOverride: "",
      calendarLength: 30,
      selectedDayIndex: 0,
      isTrackerVisible: true,
      showFab: false,
      fabVisibilityHandler: null,
      hoveredCalendarDay: null,
      reminderDraft: {
        title: "",
        dayNumber: 1,
        timeOfDay: "maghrib",
        note: ""
      },
      heroHighlights: ["Complete Ramadan 1447 AH (2026 CE) guide with dates, prayer cues, health tips, and trusted tools.", "Quran tracking, practical guidance, and verified resources help keep your month focused and organized."],
      reminders: [],
      reflectionDraft: {
        name: "",
        mood: "Grateful",
        text: ""
      },
      reflections: [],
      quranUnits: [{
        value: "pages",
        label: "Pages (604)"
      }, {
        value: "juz",
        label: "Juz (30)"
      }, {
        value: "surahs",
        label: "Surahs (114)"
      }],
      quranProgress: {
        unit: "pages",
        total: 604,
        completed: 0,
        dailyGoal: 20
      },
      quranSessions: [],
      lastQuickAction: null,
      isAuthenticated: false,
      authResolved: false,
      userId: null,
      authRefreshHandler: null,
      personalPlanExpanded: {},
      quranPlanExpanded: {},
      platformCardExpanded: {},
      shortsSectionExpanded: {},
      failedPlatformLogos: {},
      iconPalettes: {
        fallback: ["fa-star"],
        timeline: ["fa-mosque", "fa-calendar-week", "fa-scroll", "fa-hourglass-half", "fa-star", "fa-sun"],
        fasting: ["fa-utensils", "fa-water", "fa-apple-alt", "fa-leaf", "fa-moon", "fa-sun"],
        quran: ["fa-book-open", "fa-hands-praying", "fa-scroll", "fa-lightbulb", "fa-compass"],
        personal: ["fa-users", "fa-home", "fa-hands-helping", "fa-seedling", "fa-star"],
        health: ["fa-apple-alt", "fa-water", "fa-bed", "fa-bicycle", "fa-leaf", "fa-heart"],
        platforms: ["fa-globe", "fa-laptop", "fa-mobile-alt", "fa-headphones", "fa-book", "fa-play"]
      },
      timeOfDayOptions: [{
        value: "suhoor",
        label: "Suhoor (pre-dawn)"
      }, {
        value: "fajr",
        label: "Fajr"
      }, {
        value: "dhuhr",
        label: "Dhuhr"
      }, {
        value: "asr",
        label: "Asr"
      }, {
        value: "maghrib",
        label: "Maghrib / Iftar"
      }, {
        value: "isha",
        label: "Isha / Taraweeh"
      }, {
        value: "night",
        label: "Late night"
      }],
      reflectionMoods: ["Grateful", "Hopeful", "Focused", "Peaceful", "Motivated"],
      sectionFontScale: {},
      toolbarFeedback: {},
      toolbarFeedbackTimeouts: {},
      sectionHighlightPulseTimeout: null
    };
  },
  async mounted() {
    await this.initializeAuthentication();
    this.loadPlannerState();
    this.loadInteractiveState();
    this.selectTodayOrFirst();
    if (typeof window !== "undefined") {
      this.authRefreshHandler = this.refreshAuthState.bind(this);
      window.addEventListener("focus", this.authRefreshHandler);
      document.addEventListener("visibilitychange", this.authRefreshHandler);
      this.fabVisibilityHandler = this.updateFabVisibility;
      window.addEventListener("scroll", this.fabVisibilityHandler);
      window.addEventListener("resize", this.fabVisibilityHandler);
      this.updateFabVisibility();
    }
  },
  beforeDestroy() {
    if (typeof window !== "undefined" && this.authRefreshHandler) {
      window.removeEventListener("focus", this.authRefreshHandler);
      document.removeEventListener("visibilitychange", this.authRefreshHandler);
    }
    if (typeof window !== "undefined" && this.fabVisibilityHandler) {
      window.removeEventListener("scroll", this.fabVisibilityHandler);
      window.removeEventListener("resize", this.fabVisibilityHandler);
      this.fabVisibilityHandler = null;
    }
    this.clearSectionHighlights();
    this.clearAllToolbarFeedbackTimers();
  },
  unmounted() {
    if (typeof window !== "undefined" && this.authRefreshHandler) {
      window.removeEventListener("focus", this.authRefreshHandler);
      document.removeEventListener("visibilitychange", this.authRefreshHandler);
    }
    if (typeof window !== "undefined" && this.fabVisibilityHandler) {
      window.removeEventListener("scroll", this.fabVisibilityHandler);
      window.removeEventListener("resize", this.fabVisibilityHandler);
      this.fabVisibilityHandler = null;
    }
    this.clearSectionHighlights();
    this.clearAllToolbarFeedbackTimers();
  },
  computed: {
    heroImage() {
      return this.heroImageOverride || this.ramadan.header.banner_image || this.heroImageFallback;
    },
    navSections() {
      const foundationLabels = new Set(["What is Ramadan", "History", "Key dates", "How to fast", "FAQ", "Recources"]);
      const sections = [];
      const baseLinks = Array.isArray(this.ramadan.nav_links) ? this.ramadan.nav_links : [];
      const foundations = [];
      const resources = [];
      baseLinks.forEach(link => {
        if (foundationLabels.has(link.label)) {
          foundations.push(link);
        } else {
          resources.push(link);
        }
      });
      if (foundations.length) {
        sections.push({
          title: "Foundations",
          links: foundations
        });
      }
      if (resources.length) {
        sections.push({
          title: "Daily practice",
          links: resources
        });
      }
      return sections;
    },
    calendarStartDate() {
      const override = this.parseISODate(this.calendarStartOverride);
      if (override) return override;
      const fallback = this.findDefaultStartDate();
      return fallback || new Date();
    },
    importantDateMap() {
      var _this$ramadan$importa;
      const map = {};
      const dates = ((_this$ramadan$importa = this.ramadan.important_dates) === null || _this$ramadan$importa === void 0 ? void 0 : _this$ramadan$importa.dates) || [];
      dates.forEach(entry => {
        const parsed = this.parseLooseDate(entry.gregorian_date);
        if (!parsed) return;
        const key = this.toDateKey(parsed);
        if (!map[key]) map[key] = [];
        map[key].push({
          event: entry.event,
          type: entry.type
        });
      });
      return map;
    },
    calendarDays() {
      const days = [];
      const start = this.calendarStartDate;
      if (!start || Number.isNaN(start.getTime())) return days;
      const todayKey = this.toDateKey(new Date());
      for (let i = 0; i < this.calendarLength; i += 1) {
        var _events$;
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const key = this.toDateKey(date);
        const events = this.importantDateMap[key] || [];
        const eventLabel = events.map(item => item.event).join(" / ");
        days.push({
          key,
          date,
          dayNumber: i + 1,
          event: eventLabel || "",
          isToday: key === todayKey,
          type: ((_events$ = events[0]) === null || _events$ === void 0 ? void 0 : _events$.type) || ""
        });
      }
      return days;
    },
    keyDateHighlights() {
      var _this$ramadan$importa2;
      const dates = ((_this$ramadan$importa2 = this.ramadan.important_dates) === null || _this$ramadan$importa2 === void 0 ? void 0 : _this$ramadan$importa2.dates) || [];
      const start = dates.find(date => date.type === "start");
      const special = dates.find(date => date.type === "special");
      const eid = dates.find(date => date.type === "eid");
      const highlights = [];
      if (start) {
        highlights.push({
          icon: "fa-sun",
          title: "Ramadan begins",
          copy: `${start.gregorian_date} · ${start.description}`,
          showIcon: false
        });
      }
      if (special) {
        highlights.push({
          icon: "fa-shapes",
          title: "Laylat al-Qadr focus",
          copy: `${special.gregorian_date} · ${special.description}`,
          showIcon: false
        });
      }
      if (eid) {
        highlights.push({
          icon: "fa-sparkles",
          title: "Finish with Eid",
          copy: `${eid.gregorian_date} · ${eid.description}`,
          showIcon: false
        });
      }
      return highlights;
    },
    selectedDay() {
      return this.calendarDays[this.selectedDayIndex] || null;
    },
    hoveredCalendarHint() {
      if (!this.hoveredCalendarDay) return null;
      return {
        title: `Day ${this.hoveredCalendarDay.dayNumber} · ${this.formatShortDate(this.hoveredCalendarDay.date)}`,
        event: this.hoveredCalendarDay.event || "No special events planned yet"
      };
    },
    dayOptions() {
      return Array.from({
        length: this.calendarLength
      }, (_, index) => index + 1);
    },
    sortedReminders() {
      const timeOrder = this.timeOfDayOptions.map(option => option.value);
      return [...this.reminders].sort((a, b) => {
        if (a.dayNumber !== b.dayNumber) return a.dayNumber - b.dayNumber;
        return timeOrder.indexOf(a.timeOfDay) - timeOrder.indexOf(b.timeOfDay);
      });
    },
    personalPlansCount() {
      var _this$ramadan$persona;
      return ((_this$ramadan$persona = this.ramadan.personal_plans) === null || _this$ramadan$persona === void 0 || (_this$ramadan$persona = _this$ramadan$persona.plans) === null || _this$ramadan$persona === void 0 ? void 0 : _this$ramadan$persona.length) || 0;
    },
    areAllPersonalPlansExpanded() {
      if (!this.personalPlansCount) return true;
      return Array.from({
        length: this.personalPlansCount
      }).every((_, index) => !!this.personalPlanExpanded[index]);
    },
    quranPlansCount() {
      var _this$ramadan$quran_r;
      return ((_this$ramadan$quran_r = this.ramadan.quran_reading_plans) === null || _this$ramadan$quran_r === void 0 || (_this$ramadan$quran_r = _this$ramadan$quran_r.plans) === null || _this$ramadan$quran_r === void 0 ? void 0 : _this$ramadan$quran_r.length) || 0;
    },
    areAllQuranPlansExpanded() {
      if (!this.quranPlansCount) return true;
      return Array.from({
        length: this.quranPlansCount
      }).every((_, index) => !!this.quranPlanExpanded[index]);
    },
    quranUnitLabel() {
      const match = this.quranUnits.find(unit => unit.value === this.quranProgress.unit);
      return match ? match.value : "units";
    },
    quranProgressPercent() {
      const total = Number(this.quranProgress.total) || 0;
      if (total <= 0) return 0;
      const completed = Math.min(Math.max(Number(this.quranProgress.completed) || 0, 0), total);
      return Math.round(completed / total * 100);
    },
    quranProgressRemaining() {
      const total = Number(this.quranProgress.total) || 0;
      const completed = Math.min(Math.max(Number(this.quranProgress.completed) || 0, 0), total);
      return Math.max(total - completed, 0);
    },
    quranProgressDaysLeft() {
      const dailyGoal = Number(this.quranProgress.dailyGoal) || 0;
      if (dailyGoal <= 0) return null;
      const remaining = this.quranProgressRemaining;
      return Math.ceil(remaining / dailyGoal);
    },
    quranDaysRemaining() {
      if (!this.selectedDay) return this.calendarLength;
      return Math.max(this.calendarLength - this.selectedDay.dayNumber + 1, 1);
    },
    quranDailyTargetNeeded() {
      const remaining = this.quranProgressRemaining;
      const days = this.quranDaysRemaining;
      if (!days) return 0;
      return Math.max(Math.round(remaining / days), 0);
    },
    quranPlannedTarget() {
      const dailyGoal = Number(this.quranProgress.dailyGoal) || 0;
      if (dailyGoal > 0) return Math.max(Math.round(dailyGoal), 1);
      const total = Number(this.quranProgress.total) || 0;
      if (!this.calendarLength || total <= 0) return 0;
      return Math.max(Math.round(total / this.calendarLength), 1);
    },
    quranSessionsByDate() {
      return this.quranSessions.reduce((acc, session) => {
        if (!session.date) return acc;
        const amount = Number(session.amount) || 0;
        acc[session.date] = (acc[session.date] || 0) + amount;
        return acc;
      }, {});
    },
    quranTodayKey() {
      return this.toDateKey(new Date());
    },
    quranTodayRead() {
      return this.quranSessionsByDate[this.quranTodayKey] || 0;
    },
    quranTodayTarget() {
      return this.quranPlannedTarget;
    },
    quranTodayRemaining() {
      return Math.max(this.quranTodayTarget - this.quranTodayRead, 0);
    },
    canMarkTodayComplete() {
      return this.isAuthenticated && this.quranTodayTarget > 0 && this.quranTodayRemaining > 0;
    },
    quranBreakdownDays() {
      const target = this.quranPlannedTarget;
      const byDate = this.quranSessionsByDate;
      return this.calendarDays.map(day => {
        const read = byDate[day.key] || 0;
        let status = "empty";
        if (target > 0 && read >= target) status = "done";else if (read > 0) status = "partial";
        return _objectSpread(_objectSpread({}, day), {}, {
          target,
          read,
          status,
          isSelected: this.selectedDay ? day.key === this.selectedDay.key : false
        });
      });
    },
    quranEstimatedCompletionDate() {
      var _this$selectedDay;
      const daysLeft = this.quranProgressDaysLeft;
      if (!daysLeft && daysLeft !== 0) return null;
      const start = (_this$selectedDay = this.selectedDay) !== null && _this$selectedDay !== void 0 && _this$selectedDay.date ? new Date(this.selectedDay.date) : new Date();
      const estimate = new Date(start);
      estimate.setDate(estimate.getDate() + Math.max(daysLeft - 1, 0));
      return estimate;
    },
    quranCompletionLabel() {
      if (this.quranProgressRemaining <= 0) return "Completed";
      if (!this.quranProgress.dailyGoal) return "Set a daily goal";
      return this.quranEstimatedCompletionDate ? this.formatISODate(this.quranEstimatedCompletionDate) : "Set a daily goal";
    },
    quranOnboardingSteps() {
      return [{
        icon: "fa-book-open",
        title: "Pick your unit",
        detail: "Choose pages, juz, or surahs."
      }, {
        icon: "fa-bullseye",
        title: "Set your goal",
        detail: "Enter your total and daily target."
      }, {
        icon: "fa-bolt",
        title: "Update daily",
        detail: "Use quick add or mark today complete."
      }];
    },
    heroSearchTokens() {
      if (!this.heroSearchTerm) return [];
      return this.heroSearchTerm.toLowerCase().split(/\s+/).map(token => token.trim()).filter(Boolean);
    },
    heroSearchRegex() {
      if (!this.heroSearchTokens.length) return null;
      const pattern = this.heroSearchTokens.map(token => this.escapeRegExp(token)).join("|");
      return new RegExp(`(${pattern})`, "gi");
    },
    heroSearchShouldShowDropdown() {
      return this.heroSearchTerm.trim().length >= 3;
    },
    heroSearchHelperText() {
      if (!this.heroSearchTerm) return "Type at least 3 letters.";
      if (!this.heroSearchShouldShowDropdown) return "Type at least 3 letters.";
      if (!this.heroSearchResults.length) return "No results found.";
      return `${this.heroSearchResults.length} result${this.heroSearchResults.length === 1 ? "" : "s"} found.`;
    },
    heroSearchIndex() {
      var _this$ramadan$header, _this$ramadan$header2, _this$ramadan$overvie, _this$ramadan$overvie2, _this$ramadan$overvie3, _this$ramadan$history, _this$ramadan$history2, _this$ramadan$history3, _this$ramadan$importa3, _this$ramadan$importa4, _this$ramadan$moon_si, _this$ramadan$moon_si2, _this$ramadan$how_to_, _this$ramadan$how_to_2, _this$ramadan$faq, _this$ramadan$faq2, _this$ramadan$quran_r2, _this$ramadan$quran_r3, _this$ramadan$persona2, _this$ramadan$persona3, _this$ramadan$charity, _this$ramadan$charity2, _this$ramadan$charity3, _this$ramadan$charity4, _this$ramadan$health_, _this$ramadan$health_2, _this$ramadan$health_3, _this$ramadan$health_4, _this$ramadan$shorts, _this$ramadan$shorts2, _this$ramadan$shorts3, _this$ramadan$tools, _this$ramadan$tools2, _this$ramadan$tools3, _this$ramadan$platfor, _this$ramadan$platfor2, _this$ramadan$platfor3;
      const entries = [];
      const addEntry = (sectionId, targetId, sectionLabel, title, text) => {
        if (!text || typeof text !== "string") return;
        const normalizedText = text.replace(/\s+/g, " ").trim();
        if (!normalizedText) return;
        entries.push({
          id: `${sectionId}-${entries.length}`,
          sectionId,
          targetId,
          sectionLabel,
          title,
          text: normalizedText,
          searchable: normalizedText.toLowerCase()
        });
      };
      const addList = (sectionId, targetId, sectionLabel, titlePrefix, items = []) => {
        items.forEach((item, index) => {
          addEntry(sectionId, targetId, sectionLabel, `${titlePrefix} ${index + 1}`, item);
        });
      };
      addEntry("top", "top", "Top", "Hero title", (_this$ramadan$header = this.ramadan.header) === null || _this$ramadan$header === void 0 ? void 0 : _this$ramadan$header.title);
      addEntry("top", "top", "Top", "Hero subtitle", (_this$ramadan$header2 = this.ramadan.header) === null || _this$ramadan$header2 === void 0 ? void 0 : _this$ramadan$header2.subtitle);
      addList("top", "top", "Top", "Hero line", this.heroHighlights || []);
      addEntry("interactive", "section-interactive-body", "Quran tracker", "Quran progress studio", "Follow three simple steps: pick a unit, set your target, and update your reading each day.");
      addList("interactive", "section-interactive-body", "Quran tracker", "Tracker step", (this.quranOnboardingSteps || []).map(step => `${step.title} ${step.detail}`.trim()));
      addEntry("overview", "section-overview-body", "What is Ramadan", "Overview", (_this$ramadan$overvie = this.ramadan.overview) === null || _this$ramadan$overvie === void 0 ? void 0 : _this$ramadan$overvie.subtitle);
      addList("overview", "section-overview-body", "What is Ramadan", "Point", ((_this$ramadan$overvie2 = this.ramadan.overview) === null || _this$ramadan$overvie2 === void 0 ? void 0 : _this$ramadan$overvie2.body) || []);
      addList("overview", "section-overview-body", "What is Ramadan", "Key idea", ((_this$ramadan$overvie3 = this.ramadan.overview) === null || _this$ramadan$overvie3 === void 0 ? void 0 : _this$ramadan$overvie3.key_points) || []);
      addEntry("history", "section-history-body", "History", "Summary", (_this$ramadan$history = this.ramadan.history) === null || _this$ramadan$history === void 0 ? void 0 : _this$ramadan$history.subtitle);
      addList("history", "section-history-body", "History", "Detail", ((_this$ramadan$history2 = this.ramadan.history) === null || _this$ramadan$history2 === void 0 ? void 0 : _this$ramadan$history2.body) || []);
      (((_this$ramadan$history3 = this.ramadan.history) === null || _this$ramadan$history3 === void 0 ? void 0 : _this$ramadan$history3.timeline) || []).forEach(item => {
        addEntry("history", "section-history-body", "History", item.period || "Timeline", [item.detail, item.reference].filter(Boolean).join(" "));
      });
      addEntry("key-dates", "section-key-dates-body", "Key dates", "Summary", (_this$ramadan$importa3 = this.ramadan.important_dates) === null || _this$ramadan$importa3 === void 0 ? void 0 : _this$ramadan$importa3.subtitle);
      (((_this$ramadan$importa4 = this.ramadan.important_dates) === null || _this$ramadan$importa4 === void 0 ? void 0 : _this$ramadan$importa4.dates) || []).forEach(item => {
        addEntry("key-dates", "section-key-dates-body", "Key dates", item.event || "Date", [item.gregorian_date, item.hijri_date, item.description].filter(Boolean).join(" "));
      });
      addEntry("key-dates", "section-key-dates-body", "Key dates", "Moon sighting", (_this$ramadan$moon_si = this.ramadan.moon_sighting) === null || _this$ramadan$moon_si === void 0 ? void 0 : _this$ramadan$moon_si.intro);
      addList("key-dates", "section-key-dates-body", "Key dates", "Moon sighting step", ((_this$ramadan$moon_si2 = this.ramadan.moon_sighting) === null || _this$ramadan$moon_si2 === void 0 ? void 0 : _this$ramadan$moon_si2.steps) || []);
      addEntry("how-to-fast", "section-how-to-fast-body", "How to fast", "Summary", (_this$ramadan$how_to_ = this.ramadan.how_to_fast) === null || _this$ramadan$how_to_ === void 0 ? void 0 : _this$ramadan$how_to_.intro);
      (((_this$ramadan$how_to_2 = this.ramadan.how_to_fast) === null || _this$ramadan$how_to_2 === void 0 ? void 0 : _this$ramadan$how_to_2.cards) || []).forEach(item => {
        addList("how-to-fast", "section-how-to-fast-body", "How to fast", item.title || "Guide", item.items || []);
      });
      addEntry("faq", "section-faq-body", "FAQ", "Summary", (_this$ramadan$faq = this.ramadan.faq) === null || _this$ramadan$faq === void 0 ? void 0 : _this$ramadan$faq.subtitle);
      (((_this$ramadan$faq2 = this.ramadan.faq) === null || _this$ramadan$faq2 === void 0 ? void 0 : _this$ramadan$faq2.items) || []).forEach(item => {
        addEntry("faq", "section-faq-body", "FAQ", item.question || "Question", item.answer || "");
      });
      addEntry("quran-plans", "section-quran-plans-body", "Quran plans", "Summary", (_this$ramadan$quran_r2 = this.ramadan.quran_reading_plans) === null || _this$ramadan$quran_r2 === void 0 ? void 0 : _this$ramadan$quran_r2.intro);
      (((_this$ramadan$quran_r3 = this.ramadan.quran_reading_plans) === null || _this$ramadan$quran_r3 === void 0 ? void 0 : _this$ramadan$quran_r3.plans) || []).forEach(item => {
        addEntry("quran-plans", "section-quran-plans-body", "Quran plans", item.level || "Plan", [item.daily_target, item.time_needed, item.structure, item.goal, item.split].filter(Boolean).join(" "));
        addList("quran-plans", "section-quran-plans-body", "Quran plans", "Tip", item.tips || []);
      });
      addEntry("personal-plans", "section-personal-plans-body", "Personal plans", "Summary", (_this$ramadan$persona2 = this.ramadan.personal_plans) === null || _this$ramadan$persona2 === void 0 ? void 0 : _this$ramadan$persona2.intro);
      (((_this$ramadan$persona3 = this.ramadan.personal_plans) === null || _this$ramadan$persona3 === void 0 ? void 0 : _this$ramadan$persona3.plans) || []).forEach(item => {
        addEntry("personal-plans", "section-personal-plans-body", "Personal plans", item.title || "Plan", [item.who_for, item.overview, item.focus, item.accountability].filter(Boolean).join(" "));
        addList("personal-plans", "section-personal-plans-body", "Personal plans", "Daily flow", item.daily_flow || []);
        addList("personal-plans", "section-personal-plans-body", "Personal plans", "Weekly focus", item.weekly_focus || []);
      });
      addEntry("charity", "section-charity-body", "Charity", "Summary", (_this$ramadan$charity = this.ramadan.charity_guide) === null || _this$ramadan$charity === void 0 ? void 0 : _this$ramadan$charity.intro);
      addList("charity", "section-charity-body", "Charity", "Overview", ((_this$ramadan$charity2 = this.ramadan.charity_guide) === null || _this$ramadan$charity2 === void 0 ? void 0 : _this$ramadan$charity2.overview) || []);
      addList("charity", "section-charity-body", "Charity", "Zakat", ((_this$ramadan$charity3 = this.ramadan.charity_guide) === null || _this$ramadan$charity3 === void 0 || (_this$ramadan$charity3 = _this$ramadan$charity3.zakat_al_fitr) === null || _this$ramadan$charity3 === void 0 ? void 0 : _this$ramadan$charity3.points) || []);
      addList("charity", "section-charity-body", "Charity", "Sadaqah", ((_this$ramadan$charity4 = this.ramadan.charity_guide) === null || _this$ramadan$charity4 === void 0 ? void 0 : _this$ramadan$charity4.sadaqah_ideas) || []);
      addEntry("health", "section-health-body", "Health", "Summary", (_this$ramadan$health_ = this.ramadan.health_food_tips) === null || _this$ramadan$health_ === void 0 ? void 0 : _this$ramadan$health_.intro);
      (((_this$ramadan$health_2 = this.ramadan.health_food_tips) === null || _this$ramadan$health_2 === void 0 ? void 0 : _this$ramadan$health_2.primary_sections) || []).forEach(item => {
        addList("health", "section-health-body", "Health", item.title || "Health tip", item.items || []);
      });
      (((_this$ramadan$health_3 = this.ramadan.health_food_tips) === null || _this$ramadan$health_3 === void 0 ? void 0 : _this$ramadan$health_3.secondary_sections) || []).forEach(item => {
        addList("health", "section-health-body", "Health", item.title || "Health tip", item.items || []);
      });
      addList("health", "section-health-body", "Health", "Quick tip", ((_this$ramadan$health_4 = this.ramadan.health_food_tips) === null || _this$ramadan$health_4 === void 0 ? void 0 : _this$ramadan$health_4.micro_tips) || []);
      addEntry("shorts", "shorts", "Short clips", "Summary", (_this$ramadan$shorts = this.ramadan.shorts) === null || _this$ramadan$shorts === void 0 ? void 0 : _this$ramadan$shorts.subtitle);
      addList("shorts", "shorts", "Short clips", "Highlight", (((_this$ramadan$shorts2 = this.ramadan.shorts) === null || _this$ramadan$shorts2 === void 0 ? void 0 : _this$ramadan$shorts2.highlights) || []).map(item => item.title));
      const shortItems = [];
      (((_this$ramadan$shorts3 = this.ramadan.shorts) === null || _this$ramadan$shorts3 === void 0 ? void 0 : _this$ramadan$shorts3.modal_sections) || []).forEach(section => {
        (section.items || []).forEach(item => {
          shortItems.push(`${item.title || ""} ${item.description || ""}`.trim());
        });
      });
      addList("shorts", "shorts", "Short clips", "Clip", shortItems);
      addEntry("tools", "section-tools-body", "Tools", "Summary", (_this$ramadan$tools = this.ramadan.tools) === null || _this$ramadan$tools === void 0 ? void 0 : _this$ramadan$tools.subtitle);
      addList("tools", "section-tools-body", "Tools", "Intro", ((_this$ramadan$tools2 = this.ramadan.tools) === null || _this$ramadan$tools2 === void 0 ? void 0 : _this$ramadan$tools2.intro) || []);
      (((_this$ramadan$tools3 = this.ramadan.tools) === null || _this$ramadan$tools3 === void 0 ? void 0 : _this$ramadan$tools3.cards) || []).forEach(item => {
        addEntry("tools", "section-tools-body", "Tools", item.title || "Tool", [item.description, item.detail].filter(Boolean).join(" "));
      });
      addEntry("platforms", "section-platforms-body", "Resources", "Summary", (_this$ramadan$platfor = this.ramadan.platform_resources) === null || _this$ramadan$platfor === void 0 ? void 0 : _this$ramadan$platfor.subtitle);
      addList("platforms", "section-platforms-body", "Resources", "Intro", ((_this$ramadan$platfor2 = this.ramadan.platform_resources) === null || _this$ramadan$platfor2 === void 0 ? void 0 : _this$ramadan$platfor2.intro) || []);
      (((_this$ramadan$platfor3 = this.ramadan.platform_resources) === null || _this$ramadan$platfor3 === void 0 ? void 0 : _this$ramadan$platfor3.cards) || []).forEach(item => {
        addEntry("platforms", "section-platforms-body", "Resources", item.title || "Resource", item.description || "");
        addList("platforms", "section-platforms-body", "Resources", "Item", (item.items || []).map(link => `${link.label || ""} ${link.note || ""}`.trim()));
      });
      return entries;
    },
    heroSearchResults() {
      if (!this.heroSearchShouldShowDropdown || !this.heroSearchTokens.length) return [];
      const tokens = this.heroSearchTokens;
      return this.heroSearchIndex.map(entry => {
        const matchAllTokens = tokens.every(token => entry.searchable.includes(token));
        if (!matchAllTokens) return null;
        const score = tokens.reduce((total, token) => {
          const matches = entry.searchable.match(new RegExp(this.escapeRegExp(token), "g"));
          const entryScore = matches ? matches.length : 0;
          const sectionBoost = entry.sectionLabel.toLowerCase().includes(token) ? 2 : 0;
          const titleBoost = entry.title.toLowerCase().includes(token) ? 1 : 0;
          return total + entryScore + sectionBoost + titleBoost;
        }, 0);
        return _objectSpread(_objectSpread({}, entry), {}, {
          score
        });
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 12);
    },
    duaSearchTokens() {
      if (!this.duaSearchTerm) return [];
      return this.duaSearchTerm.toLowerCase().split(/\s+/).map(token => token.trim()).filter(Boolean);
    },
    duaSearchRegex() {
      if (!this.duaSearchTokens.length) return null;
      const pattern = this.duaSearchTokens.map(token => this.escapeRegExp(token)).join("|");
      return new RegExp(`(${pattern})`, "gi");
    },
    duaSourceFilters() {
      var _this$ramadan$duas_pr;
      const sections = ((_this$ramadan$duas_pr = this.ramadan.duas_prayers) === null || _this$ramadan$duas_pr === void 0 ? void 0 : _this$ramadan$duas_pr.modal_sections) || [];
      const sources = new Set();
      sections.forEach(section => {
        (section.items || []).forEach(item => {
          const value = this.getDuaSourceValue(item);
          if (value) sources.add(value);
        });
      });
      const labelMap = {
        quran: "Qur'an",
        hadith: "Hadith"
      };
      const options = [{
        label: "All sources",
        value: "all"
      }];
      Array.from(sources).sort().forEach(value => {
        options.push({
          label: labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1),
          value
        });
      });
      return options;
    },
    duaSectionFilters() {
      var _this$ramadan$duas_pr2;
      const sections = ((_this$ramadan$duas_pr2 = this.ramadan.duas_prayers) === null || _this$ramadan$duas_pr2 === void 0 ? void 0 : _this$ramadan$duas_pr2.modal_sections) || [];
      const options = [{
        label: "All sections",
        value: "all"
      }];
      sections.forEach(section => {
        options.push({
          label: section.title,
          value: section.title.toLowerCase().replace(/[^a-z]/g, "")
        });
      });
      return options;
    },
    filteredDuaSections() {
      var _this$ramadan$duas_pr3;
      const sections = ((_this$ramadan$duas_pr3 = this.ramadan.duas_prayers) === null || _this$ramadan$duas_pr3 === void 0 ? void 0 : _this$ramadan$duas_pr3.modal_sections) || [];
      const normalizedSectionFilter = this.duaSectionFilter.replace(/[^a-z]/g, "");
      return sections.map(section => {
        const shouldIncludeSection = !normalizedSectionFilter || normalizedSectionFilter === "all" ? true : section.title.toLowerCase().replace(/[^a-z]/g, "") === normalizedSectionFilter;
        const items = shouldIncludeSection ? (section.items || []).filter(item => this.isDuaVisible(item)) : [];
        return _objectSpread(_objectSpread({}, section), {}, {
          items
        });
      }).filter(section => section.items.length);
    }
  },
  methods: {
    highlightHeroText(text) {
      if (!text) return "";
      const escaped = this.escapeHtml(text);
      if (!this.heroSearchRegex) return escaped;
      return escaped.replace(this.heroSearchRegex, '<mark class="r-hero__mark">$1</mark>');
    },
    highlightSearchResultText(text) {
      if (!text) return "";
      const escaped = this.escapeHtml(text);
      if (!this.heroSearchRegex) return escaped;
      return escaped.replace(this.heroSearchRegex, '<mark class="r-search-result__mark">$1</mark>');
    },
    buildSearchSnippet(text) {
      if (!text) return "";
      const normalizedText = String(text).replace(/\s+/g, " ").trim();
      if (!normalizedText) return "";
      if (!this.heroSearchTokens.length) {
        return this.escapeHtml(normalizedText.slice(0, 170));
      }
      const lowerText = normalizedText.toLowerCase();
      let firstMatchIndex = -1;
      this.heroSearchTokens.forEach(token => {
        const index = lowerText.indexOf(token);
        if (index === -1) return;
        if (firstMatchIndex === -1 || index < firstMatchIndex) {
          firstMatchIndex = index;
        }
      });
      const start = firstMatchIndex > 60 ? firstMatchIndex - 60 : 0;
      const end = Math.min(start + 190, normalizedText.length);
      const prefix = start > 0 ? "... " : "";
      const suffix = end < normalizedText.length ? " ..." : "";
      const escaped = this.escapeHtml(`${prefix}${normalizedText.slice(start, end)}${suffix}`);
      if (!this.heroSearchRegex) return escaped;
      return escaped.replace(this.heroSearchRegex, '<mark class="r-search-result__mark">$1</mark>');
    },
    clearSectionHighlights() {
      if (this.sectionHighlightPulseTimeout) {
        clearTimeout(this.sectionHighlightPulseTimeout);
        this.sectionHighlightPulseTimeout = null;
      }
      if (typeof document === "undefined" || !this.$el) return;
      const marks = this.$el.querySelectorAll("mark.r-section-search-highlight");
      marks.forEach(mark => {
        const parent = mark.parentNode;
        if (!parent) return;
        parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
        parent.normalize();
      });
    },
    pulseFirstSectionHighlight(target) {
      if (!target) return;
      const first = target.querySelector("mark.r-section-search-highlight");
      if (!first) return;
      first.classList.add("is-active");
      if (this.sectionHighlightPulseTimeout) {
        clearTimeout(this.sectionHighlightPulseTimeout);
      }
      this.sectionHighlightPulseTimeout = setTimeout(() => {
        first.classList.remove("is-active");
        this.sectionHighlightPulseTimeout = null;
      }, 1400);
    },
    applySectionHighlights(target, tokens = []) {
      if (typeof document === "undefined" || !target) return;
      this.clearSectionHighlights();
      const normalizedTokens = (tokens || []).map(token => String(token || "").trim()).filter(token => token.length > 1);
      if (!normalizedTokens.length) return;
      const lowerTokens = normalizedTokens.map(token => token.toLowerCase());
      const pattern = normalizedTokens.map(token => this.escapeRegExp(token)).join("|");
      if (!pattern) return;
      const regex = new RegExp(`(${pattern})`, "gi");
      const textNodes = [];
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
        acceptNode: node => {
          const textValue = (node === null || node === void 0 ? void 0 : node.nodeValue) || "";
          if (!textValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const blockedTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "MARK", "TEXTAREA", "SELECT", "OPTION", "BUTTON", "INPUT"]);
          if (blockedTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (parent.closest(".section-toolbar, .r-hero-search")) return NodeFilter.FILTER_REJECT;
          const lowerText = textValue.toLowerCase();
          return lowerTokens.some(token => lowerText.includes(token)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }, false);
      let currentNode = walker.nextNode();
      while (currentNode) {
        textNodes.push(currentNode);
        currentNode = walker.nextNode();
      }
      textNodes.forEach(node => {
        const sourceText = node.nodeValue || "";
        regex.lastIndex = 0;
        if (!regex.test(sourceText)) return;
        regex.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match = regex.exec(sourceText);
        while (match) {
          const matchIndex = match.index;
          if (matchIndex > lastIndex) {
            fragment.appendChild(document.createTextNode(sourceText.slice(lastIndex, matchIndex)));
          }
          const mark = document.createElement("mark");
          mark.className = "r-section-search-highlight";
          mark.textContent = match[0];
          fragment.appendChild(mark);
          lastIndex = matchIndex + match[0].length;
          if (regex.lastIndex === matchIndex) {
            regex.lastIndex += 1;
          }
          match = regex.exec(sourceText);
        }
        if (lastIndex < sourceText.length) {
          fragment.appendChild(document.createTextNode(sourceText.slice(lastIndex)));
        }
        if (node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      });
      this.pulseFirstSectionHighlight(target);
    },
    goToSearchResult(result) {
      var _window$history;
      if (!result) return;
      if (typeof document === "undefined") return;
      const searchTokens = [...this.heroSearchTokens];
      const target = document.getElementById(result.targetId) || document.getElementById(result.sectionId) || document.getElementById("top");
      if (target && typeof target.scrollIntoView === "function") {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        const applyHighlight = () => {
          this.applySectionHighlights(target, searchTokens);
        };
        if (typeof window !== "undefined" && window.requestAnimationFrame) {
          window.requestAnimationFrame(() => {
            window.setTimeout(applyHighlight, 220);
          });
        } else {
          applyHighlight();
        }
      }
      if (typeof window !== "undefined" && result.sectionId && (_window$history = window.history) !== null && _window$history !== void 0 && _window$history.replaceState) {
        window.history.replaceState(null, "", `#${result.sectionId}`);
      }
      this.heroSearchTerm = "";
    },
    openFirstSearchResult() {
      if (!this.heroSearchResults.length) return;
      this.goToSearchResult(this.heroSearchResults[0]);
    },
    clearHeroSearch() {
      this.heroSearchTerm = "";
      this.clearSectionHighlights();
    },
    hasSectionReferences(items) {
      return Array.isArray(items) && items.length > 0;
    },
    referenceSummary(reference) {
      if (!reference || typeof reference !== "object") return "";
      return reference.embedded_text || reference.summary || reference.excerpt || "";
    },
    formatISODate(value) {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return value;
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    formatShortDate(value) {
      if (!value) return "";
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    },
    toggleTrackerVisibility() {
      this.isTrackerVisible = !this.isTrackerVisible;
    },
    isShortsSectionOpen(key) {
      return this.shortsSectionExpanded[key] !== false;
    },
    toggleShortsSection(key) {
      this.shortsSectionExpanded = _objectSpread(_objectSpread({}, this.shortsSectionExpanded), {}, {
        [key]: !this.isShortsSectionOpen(key)
      });
    },
    isPlatformCardOpen(index) {
      return this.platformCardExpanded[index] !== false;
    },
    togglePlatformCard(index) {
      this.platformCardExpanded = _objectSpread(_objectSpread({}, this.platformCardExpanded), {}, {
        [index]: !this.isPlatformCardOpen(index)
      });
    },
    markPlatformLogoFailed(link) {
      if (!link) return;
      this.failedPlatformLogos = _objectSpread(_objectSpread({}, this.failedPlatformLogos), {}, {
        [link]: true
      });
    },
    resourceInitials(value) {
      if (!value) return "R";
      const words = String(value).replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/).filter(Boolean).slice(0, 2);
      if (!words.length) return "R";
      return words.map(word => word[0].toUpperCase()).join("");
    },
    breakdownStatusLabel(status) {
      if (status === "done") return "Completed";
      if (status === "partial") return "In progress";
      return "Not completed";
    },
    breakdownStatusClass(status) {
      if (status === "done") return "r-badge--good";
      if (status === "partial") return "r-badge--warn";
      return "";
    },
    async initializeAuthentication() {
      const id = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_2__.fetchUserIdFromApi)();
      this.userId = id;
      this.isAuthenticated = !!id;
      this.authResolved = true;
    },
    async refreshAuthState() {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      const previousUserId = this.userId;
      const wasAuthenticated = this.isAuthenticated;
      await this.initializeAuthentication();
      if (previousUserId !== this.userId || wasAuthenticated !== this.isAuthenticated) {
        this.loadPlannerState();
        this.loadInteractiveState();
        this.selectTodayOrFirst();
      }
    },
    handleHeroImageError() {
      if (this.heroImageOverride !== this.heroImageFallback) {
        this.heroImageOverride = this.heroImageFallback;
      }
    },
    storyStyle(thumbnail) {
      if (!thumbnail) {
        return {
          "--story-bg": "linear-gradient(135deg, rgba(27, 117, 103, 0.2), rgba(209, 160, 70, 0.2))"
        };
      }
      return {
        "--story-bg": `url(${thumbnail})`
      };
    },
    getDuaSourceValue(item) {
      var _this$ramadan$duas_pr4;
      const raw = (item === null || item === void 0 ? void 0 : item.source) || ((_this$ramadan$duas_pr4 = this.ramadan.duas_prayers) === null || _this$ramadan$duas_pr4 === void 0 ? void 0 : _this$ramadan$duas_pr4.tag_label) || "Qur'an";
      return String(raw).toLowerCase().replace(/[^a-z]/g, "");
    },
    isDuaVisible(item) {
      return this.matchesSourceFilter(item) && this.matchesDuaSearch(item);
    },
    matchesDuaSearch(item) {
      if (!this.duaSearchTokens.length) return true;
      const haystack = [item === null || item === void 0 ? void 0 : item.name, item === null || item === void 0 ? void 0 : item.occasion, item === null || item === void 0 ? void 0 : item.arabic, item === null || item === void 0 ? void 0 : item.transliteration, item === null || item === void 0 ? void 0 : item.translation, item === null || item === void 0 ? void 0 : item.reference].filter(Boolean).join(" ").toLowerCase();
      return this.duaSearchTokens.every(token => haystack.includes(token));
    },
    matchesSourceFilter(item) {
      if (this.duaSourceFilter === "all") return true;
      return this.getDuaSourceValue(item) === this.duaSourceFilter;
    },
    resetDuaFilters() {
      this.duaSearchTerm = "";
      this.duaSourceFilter = "all";
      this.duaSectionFilter = "all";
    },
    highlightDuaText(text) {
      if (!text) return "";
      const escaped = this.escapeHtml(text);
      if (!this.duaSearchRegex) return escaped;
      return escaped.replace(this.duaSearchRegex, "<mark>$1</mark>");
    },
    escapeHtml(value = "") {
      const stringValue = String(value);
      return stringValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    },
    escapeRegExp(value = "") {
      const stringValue = String(value);
      return stringValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    getIconClasses(palette, index) {
      var _this$iconPalettes, _this$iconPalettes2, _this$iconPalettes3;
      const paletteList = ((_this$iconPalettes = this.iconPalettes) === null || _this$iconPalettes === void 0 ? void 0 : _this$iconPalettes[palette]) || ((_this$iconPalettes2 = this.iconPalettes) === null || _this$iconPalettes2 === void 0 ? void 0 : _this$iconPalettes2.fallback) || [];
      const iconName = paletteList[index % paletteList.length] || ((_this$iconPalettes3 = this.iconPalettes) === null || _this$iconPalettes3 === void 0 || (_this$iconPalettes3 = _this$iconPalettes3.fallback) === null || _this$iconPalettes3 === void 0 ? void 0 : _this$iconPalettes3[0]) || "fa-star";
      return ["fas", iconName];
    },
    parseISODate(value) {
      if (!value) return null;
      const parts = String(value).split("-");
      if (parts.length === 3) {
        const [year, month, day] = parts.map(part => Number(part));
        const _parsed = new Date(year, month - 1, day);
        if (!Number.isNaN(_parsed.getTime())) return _parsed;
      }
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) return null;
      return parsed;
    },
    parseLooseDate(value) {
      if (!value) return null;
      const match = String(value).match(/[A-Za-z]+ \d{1,2}, \d{4}/);
      const parsed = new Date(match ? match[0] : value);
      if (Number.isNaN(parsed.getTime())) return null;
      return parsed;
    },
    toDateKey(value) {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    findDefaultStartDate() {
      var _this$ramadan$importa5;
      const dates = ((_this$ramadan$importa5 = this.ramadan.important_dates) === null || _this$ramadan$importa5 === void 0 ? void 0 : _this$ramadan$importa5.dates) || [];
      const match = dates.find(entry => /first day of ramadan/i.test(entry.event));
      return this.parseLooseDate(match === null || match === void 0 ? void 0 : match.gregorian_date);
    },
    getLocalStorageKey(suffix) {
      if (!this.userId) return null;
      return `ramadan2026.${suffix}.${this.userId}`;
    },
    getQuranDefaults(unit) {
      const defaults = {
        pages: {
          total: 604,
          dailyGoal: 20
        },
        juz: {
          total: 30,
          dailyGoal: 1
        },
        surahs: {
          total: 114,
          dailyGoal: 4
        }
      };
      return defaults[unit] || defaults.pages;
    },
    handleQuranUnitChange() {
      const defaults = this.getQuranDefaults(this.quranProgress.unit);
      this.quranProgress = _objectSpread(_objectSpread({}, this.quranProgress), {}, {
        total: defaults.total,
        dailyGoal: defaults.dailyGoal
      });
      this.normalizeQuranProgress();
    },
    normalizeQuranProgress() {
      const total = Math.max(1, Math.round(Number(this.quranProgress.total) || 1));
      const completedRaw = Math.round(Number(this.quranProgress.completed) || 0);
      const completed = Math.min(Math.max(completedRaw, 0), total);
      const dailyGoal = Math.max(0, Math.round(Number(this.quranProgress.dailyGoal) || 0));
      this.quranProgress = _objectSpread(_objectSpread({}, this.quranProgress), {}, {
        total,
        completed,
        dailyGoal
      });
      this.persistQuranProgress();
    },
    addQuranProgress(amount) {
      if (!this.isAuthenticated || !amount) return;
      const next = (Number(this.quranProgress.completed) || 0) + amount;
      this.quranProgress = _objectSpread(_objectSpread({}, this.quranProgress), {}, {
        completed: next
      });
      this.normalizeQuranProgress();
    },
    addQuranSessionEntry(amount, date, note) {
      if (!this.isAuthenticated) return;
      if (!amount || !date) return;
      const roundedAmount = Math.max(Math.round(Number(amount) || 0), 1);
      const session = {
        id: `session-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        amount: roundedAmount,
        date,
        note: note || "",
        createdAt: Date.now()
      };
      this.quranSessions = [session, ...this.quranSessions];
      this.addQuranProgress(session.amount);
      this.persistQuranSessions();
      this.lastQuickAction = {
        id: session.id,
        label: "Marked today complete",
        timestamp: Date.now()
      };
    },
    markTodayComplete() {
      if (!this.canMarkTodayComplete) return;
      this.addQuranSessionEntry(this.quranTodayRemaining, this.quranTodayKey, "Marked today complete");
    },
    undoLastQuickAction() {
      var _this$lastQuickAction;
      if (!((_this$lastQuickAction = this.lastQuickAction) !== null && _this$lastQuickAction !== void 0 && _this$lastQuickAction.id)) return;
      this.removeQuranSession(this.lastQuickAction.id);
      this.lastQuickAction = null;
    },
    removeQuranSession(id) {
      var _this$lastQuickAction2;
      if (!this.isAuthenticated) return;
      const session = this.quranSessions.find(item => item.id === id);
      this.quranSessions = this.quranSessions.filter(item => item.id !== id);
      if (((_this$lastQuickAction2 = this.lastQuickAction) === null || _this$lastQuickAction2 === void 0 ? void 0 : _this$lastQuickAction2.id) === id) {
        this.lastQuickAction = null;
      }
      if (session) {
        this.quranProgress = _objectSpread(_objectSpread({}, this.quranProgress), {}, {
          completed: (Number(this.quranProgress.completed) || 0) - Number(session.amount || 0)
        });
        this.normalizeQuranProgress();
      }
      this.persistQuranSessions();
    },
    persistQuranProgress() {
      if (typeof window === "undefined" || !this.isAuthenticated) return;
      const key = this.getLocalStorageKey("quranProgress");
      if (!key) return;
      window.localStorage.setItem(key, JSON.stringify(this.quranProgress));
    },
    persistQuranSessions() {
      if (typeof window === "undefined" || !this.isAuthenticated) return;
      const key = this.getLocalStorageKey("quranSessions");
      if (!key) return;
      window.localStorage.setItem(key, JSON.stringify(this.quranSessions));
    },
    loadInteractiveState() {
      if (typeof window === "undefined") return;
      if (!this.isAuthenticated) {
        this.quranSessions = [];
        this.normalizeQuranProgress();
        this.lastQuickAction = null;
        return;
      }
      try {
        const progressKey = this.getLocalStorageKey("quranProgress");
        const progressStored = JSON.parse(window.localStorage.getItem(progressKey) || "null");
        if (progressStored && typeof progressStored === "object") {
          this.quranProgress = _objectSpread(_objectSpread({}, this.quranProgress), progressStored);
        }
        this.normalizeQuranProgress();
        const sessionsKey = this.getLocalStorageKey("quranSessions");
        const sessionsStored = JSON.parse(window.localStorage.getItem(sessionsKey) || "[]");
        this.quranSessions = Array.isArray(sessionsStored) ? sessionsStored.map(session => _objectSpread(_objectSpread({}, session), {}, {
          amount: Math.max(Math.round(Number(session.amount) || 0), 1)
        })) : [];
      } catch (error) {
        this.quranSessions = [];
        this.lastQuickAction = null;
      }
    },
    selectTodayOrFirst() {
      const todayIndex = this.calendarDays.findIndex(day => day.isToday);
      this.selectedDayIndex = todayIndex >= 0 ? todayIndex : 0;
      if (this.selectedDay) {
        this.reminderDraft.dayNumber = this.selectedDay.dayNumber;
      }
    },
    selectDay(index) {
      this.selectedDayIndex = index;
      if (this.selectedDay) {
        this.reminderDraft.dayNumber = this.selectedDay.dayNumber;
      }
    },
    setHoveredCalendarDay(day) {
      this.hoveredCalendarDay = day;
    },
    clearHoveredCalendarDay() {
      this.hoveredCalendarDay = null;
    },
    isPersonalPlanExpanded(index) {
      return !!this.personalPlanExpanded[index];
    },
    togglePersonalPlan(index) {
      this.personalPlanExpanded = _objectSpread(_objectSpread({}, this.personalPlanExpanded), {}, {
        [index]: !this.personalPlanExpanded[index]
      });
    },
    toggleAllPersonalPlans() {
      const nextValue = !this.areAllPersonalPlansExpanded;
      const expanded = {};
      for (let i = 0; i < this.personalPlansCount; i += 1) {
        expanded[i] = nextValue;
      }
      this.personalPlanExpanded = expanded;
    },
    isQuranPlanExpanded(index) {
      return !!this.quranPlanExpanded[index];
    },
    toggleQuranPlan(index) {
      this.quranPlanExpanded = _objectSpread(_objectSpread({}, this.quranPlanExpanded), {}, {
        [index]: !this.quranPlanExpanded[index]
      });
    },
    toggleAllQuranPlans() {
      const nextValue = !this.areAllQuranPlansExpanded;
      const expanded = {};
      for (let i = 0; i < this.quranPlansCount; i += 1) {
        expanded[i] = nextValue;
      }
      this.quranPlanExpanded = expanded;
    },
    addReminder() {
      if (!this.isAuthenticated) return;
      if (!this.reminderDraft.title) return;
      const reminder = {
        id: `reminder-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        title: this.reminderDraft.title,
        dayNumber: this.reminderDraft.dayNumber,
        timeOfDay: this.reminderDraft.timeOfDay,
        note: this.reminderDraft.note,
        done: false
      };
      this.reminders = [...this.reminders, reminder];
      this.persistReminders();
      this.reminderDraft = {
        title: "",
        dayNumber: this.reminderDraft.dayNumber,
        timeOfDay: this.reminderDraft.timeOfDay,
        note: ""
      };
    },
    removeReminder(id) {
      if (!this.isAuthenticated) return;
      this.reminders = this.reminders.filter(reminder => reminder.id !== id);
      this.persistReminders();
    },
    formatTimeLabel(value) {
      const match = this.timeOfDayOptions.find(option => option.value === value);
      return match ? match.label : value;
    },
    addReflection() {
      if (!this.isAuthenticated) return;
      if (!this.reflectionDraft.text) return;
      const reflection = {
        id: `reflection-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        name: this.reflectionDraft.name,
        mood: this.reflectionDraft.mood,
        text: this.reflectionDraft.text,
        timestamp: Date.now()
      };
      this.reflections = [reflection, ...this.reflections];
      this.persistReflections();
      this.reflectionDraft = {
        name: "",
        mood: this.reflectionDraft.mood,
        text: ""
      };
    },
    formatRelativeTime(timestamp) {
      if (!timestamp) return "";
      const diff = Date.now() - timestamp;
      const seconds = Math.floor(diff / 1000);
      if (seconds < 45) return "just now";
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes} min ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hr ago`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    },
    updateFabVisibility() {
      if (typeof window === "undefined") {
        this.showFab = false;
        return;
      }
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
      const scrollableHeight = Math.max((document.documentElement.scrollHeight || document.body.scrollHeight || 0) - viewportHeight, 0);
      const ratio = scrollableHeight > 0 ? scrollTop / scrollableHeight : viewportHeight > 0 ? scrollTop / viewportHeight : 0;
      this.showFab = ratio > 0.1;
    },
    scrollToTop() {
      if (typeof window === "undefined") return;
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    scrollToQuranTracker() {
      if (typeof window === "undefined") return;
      this.isTrackerVisible = true;
      this.$nextTick(() => {
        const card = this.$refs.quranProgressCard;
        if (card && typeof card.scrollIntoView === "function") {
          card.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    },
    persistCalendar() {
      if (this.calendarLength < 1) return;
      if (this.selectedDayIndex >= this.calendarLength) {
        this.selectedDayIndex = this.calendarLength - 1;
      }
      this.reminderDraft.dayNumber = Math.min(Math.max(this.reminderDraft.dayNumber, 1), this.calendarLength);
      if (typeof window === "undefined") return;
      window.localStorage.setItem("ramadan2026.calendar", JSON.stringify({
        start: this.calendarStartOverride,
        length: this.calendarLength
      }));
    },
    persistReminders() {
      if (!this.isAuthenticated) return;
      const key = this.getUserStorageKey("reminders");
      if (!key || typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(this.reminders));
    },
    persistReflections() {
      if (!this.isAuthenticated) return;
      const key = this.getUserStorageKey("reflections");
      if (!key || typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(this.reflections));
    },
    getUserStorageKey(suffix) {
      if (!this.userId) return null;
      return `ramadan2026.${suffix}.${this.userId}`;
    },
    sectionBodyStyle(sectionId) {
      const scale = this.sectionFontScale[sectionId] || 1;
      return {
        fontSize: `${scale.toFixed(2)}em`
      };
    },
    getSectionTitle(sectionId) {
      var _this$ramadan$overvie4, _this$ramadan$history4, _this$ramadan$how_to_3, _this$ramadan$faq3, _this$ramadan$quran_r4, _this$ramadan$persona4, _this$ramadan$charity5, _this$ramadan$health_5, _this$ramadan$platfor4;
      const titles = {
        overview: (_this$ramadan$overvie4 = this.ramadan.overview) === null || _this$ramadan$overvie4 === void 0 ? void 0 : _this$ramadan$overvie4.section_title,
        history: (_this$ramadan$history4 = this.ramadan.history) === null || _this$ramadan$history4 === void 0 ? void 0 : _this$ramadan$history4.section_title,
        "how-to-fast": (_this$ramadan$how_to_3 = this.ramadan.how_to_fast) === null || _this$ramadan$how_to_3 === void 0 ? void 0 : _this$ramadan$how_to_3.section_title,
        faq: (_this$ramadan$faq3 = this.ramadan.faq) === null || _this$ramadan$faq3 === void 0 ? void 0 : _this$ramadan$faq3.section_title,
        "quran-plans": (_this$ramadan$quran_r4 = this.ramadan.quran_reading_plans) === null || _this$ramadan$quran_r4 === void 0 ? void 0 : _this$ramadan$quran_r4.section_title,
        "personal-plans": (_this$ramadan$persona4 = this.ramadan.personal_plans) === null || _this$ramadan$persona4 === void 0 ? void 0 : _this$ramadan$persona4.section_title,
        charity: (_this$ramadan$charity5 = this.ramadan.charity_guide) === null || _this$ramadan$charity5 === void 0 ? void 0 : _this$ramadan$charity5.section_title,
        health: (_this$ramadan$health_5 = this.ramadan.health_food_tips) === null || _this$ramadan$health_5 === void 0 ? void 0 : _this$ramadan$health_5.section_title,
        platforms: (_this$ramadan$platfor4 = this.ramadan.platform_resources) === null || _this$ramadan$platfor4 === void 0 ? void 0 : _this$ramadan$platfor4.section_title
      };
      return titles[sectionId] || "";
    },
    getSectionShareText(sectionId) {
      var _overview$key_points, _history$timeline, _charity$zakat_al_fit, _charity$zakat_al_fit2, _health$micro_tips;
      const parts = [];
      const append = value => {
        if (!value) return;
        parts.push(value);
      };
      const title = this.getSectionTitle(sectionId);
      if (title) append(title);
      const overview = this.ramadan.overview;
      const history = this.ramadan.history;
      const howToFast = this.ramadan.how_to_fast;
      const faq = this.ramadan.faq;
      const quranPlans = this.ramadan.quran_reading_plans;
      const personalPlans = this.ramadan.personal_plans;
      const charity = this.ramadan.charity_guide;
      const health = this.ramadan.health_food_tips;
      const platforms = this.ramadan.platform_resources;
      switch (sectionId) {
        case "overview":
          append(overview === null || overview === void 0 ? void 0 : overview.subtitle);
          ((overview === null || overview === void 0 ? void 0 : overview.body) || []).forEach(para => append(para));
          if (overview !== null && overview !== void 0 && (_overview$key_points = overview.key_points) !== null && _overview$key_points !== void 0 && _overview$key_points.length) {
            append("Key points:");
            overview.key_points.forEach(point => append(`- ${point}`));
          }
          break;
        case "history":
          append(history === null || history === void 0 ? void 0 : history.subtitle);
          ((history === null || history === void 0 ? void 0 : history.body) || []).forEach(para => append(para));
          if (history !== null && history !== void 0 && (_history$timeline = history.timeline) !== null && _history$timeline !== void 0 && _history$timeline.length) {
            append("Timeline highlights:");
            history.timeline.forEach(item => append(`${item.period} – ${item.detail}${item.reference ? ` (${item.reference})` : ""}`));
          }
          break;
        case "how-to-fast":
          append(howToFast === null || howToFast === void 0 ? void 0 : howToFast.intro);
          ((howToFast === null || howToFast === void 0 ? void 0 : howToFast.cards) || []).forEach(card => {
            append(`${card.title}:`);
            (card.items || []).forEach(item => append(`- ${item}`));
          });
          break;
        case "faq":
          ((faq === null || faq === void 0 ? void 0 : faq.items) || []).forEach(item => {
            append(`Q: ${item.question}`);
            append(`A: ${item.answer}`);
          });
          break;
        case "quran-plans":
          append(quranPlans === null || quranPlans === void 0 ? void 0 : quranPlans.intro);
          ((quranPlans === null || quranPlans === void 0 ? void 0 : quranPlans.plans) || []).forEach(plan => {
            var _plan$tips;
            append(`${plan.level} plan`);
            append(`Daily target: ${plan.daily_target}`);
            append(`Time needed: ${plan.time_needed}`);
            append(`Structure: ${plan.structure}`);
            append(`Goal: ${plan.goal}`);
            append(`Split: ${plan.split}`);
            if (plan !== null && plan !== void 0 && (_plan$tips = plan.tips) !== null && _plan$tips !== void 0 && _plan$tips.length) {
              append("Tips:");
              plan.tips.forEach(tip => append(`- ${tip}`));
            }
          });
          break;
        case "personal-plans":
          append(personalPlans === null || personalPlans === void 0 ? void 0 : personalPlans.intro);
          ((personalPlans === null || personalPlans === void 0 ? void 0 : personalPlans.plans) || []).forEach(plan => {
            append(`${plan.title} (${plan.who_for})`);
            append(plan.overview);
            append(`Focus: ${plan.focus}`);
            append("Daily flow:");
            (plan.daily_flow || []).forEach(item => append(`- ${item}`));
            append("Weekly focus:");
            (plan.weekly_focus || []).forEach(item => append(`- ${item}`));
            append(`Accountability: ${plan.accountability}`);
          });
          break;
        case "charity":
          append(charity === null || charity === void 0 ? void 0 : charity.intro);
          ((charity === null || charity === void 0 ? void 0 : charity.overview) || []).forEach(para => append(para));
          append(charity === null || charity === void 0 || (_charity$zakat_al_fit = charity.zakat_al_fitr) === null || _charity$zakat_al_fit === void 0 ? void 0 : _charity$zakat_al_fit.title);
          ((charity === null || charity === void 0 || (_charity$zakat_al_fit2 = charity.zakat_al_fitr) === null || _charity$zakat_al_fit2 === void 0 ? void 0 : _charity$zakat_al_fit2.points) || []).forEach(point => append(`- ${point}`));
          append(charity === null || charity === void 0 ? void 0 : charity.sadaqah_title);
          ((charity === null || charity === void 0 ? void 0 : charity.sadaqah_ideas) || []).forEach(idea => append(`- ${idea}`));
          append(charity === null || charity === void 0 ? void 0 : charity.giving_checklist_title);
          ((charity === null || charity === void 0 ? void 0 : charity.giving_checklist) || []).forEach(item => append(`- ${item}`));
          ((charity === null || charity === void 0 ? void 0 : charity.impact_notes) || []).forEach(note => append(`Note: ${note}`));
          break;
        case "health":
          append(health === null || health === void 0 ? void 0 : health.intro);
          ((health === null || health === void 0 ? void 0 : health.primary_sections) || []).forEach(section => {
            append(`${section.title}:`);
            (section.items || []).forEach(item => append(`- ${item}`));
          });
          ((health === null || health === void 0 ? void 0 : health.secondary_sections) || []).forEach(section => {
            append(`${section.title}:`);
            (section.items || []).forEach(item => append(`- ${item}`));
          });
          if (health !== null && health !== void 0 && (_health$micro_tips = health.micro_tips) !== null && _health$micro_tips !== void 0 && _health$micro_tips.length) {
            append("Micro tips:");
            health.micro_tips.forEach(tip => append(`- ${tip}`));
          }
          break;
        case "platforms":
          ((platforms === null || platforms === void 0 ? void 0 : platforms.intro) || []).forEach(line => append(line));
          ((platforms === null || platforms === void 0 ? void 0 : platforms.cards) || []).forEach(card => {
            append(card.description ? `${card.title}: ${card.description}` : card.title);
            (card.items || []).forEach(item => append(`- ${item.label}`));
          });
          break;
        default:
          break;
      }
      return parts.join("\n\n");
    },
    shareSectionViaWhatsApp(sectionId) {
      const text = this.getSectionShareText(sectionId);
      if (!text || typeof window === "undefined") return;
      const encoded = encodeURIComponent(text);
      const shareUrl = `https://wa.me/?text=${encoded}`;
      const popup = window.open(shareUrl, "_blank", "noopener,noreferrer");
      if (!popup) {
        window.location.href = shareUrl;
      }
      this.setToolbarFeedback(sectionId, "Opening WhatsApp");
    },
    async copySectionContent(sectionId) {
      var _navigator$clipboard;
      const text = this.getSectionShareText(sectionId);
      if (!text) return;
      if (typeof navigator !== "undefined" && (_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          this.setToolbarFeedback(sectionId, "Copied to clipboard");
          return;
        } catch (error) {
          // fallback to execCommand
        }
      }
      if (typeof document === "undefined") return;
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("aria-hidden", "true");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        const copied = document.execCommand("copy");
        this.setToolbarFeedback(sectionId, copied ? "Copied to clipboard" : "Unable to copy section");
      } catch (error) {
        this.setToolbarFeedback(sectionId, "Unable to copy section");
      } finally {
        document.body.removeChild(textarea);
      }
    },
    printSection(sectionId) {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      const section = document.getElementById(sectionId);
      if (!section) return;
      const clone = section.cloneNode(true);
      const toolbar = clone.querySelector(".section-toolbar");
      if (toolbar) toolbar.remove();
      const sectionTitle = this.getSectionTitle(sectionId) || "Ramadan section";
      const printWindow = window.open("", "_blank", "width=700,height=900");
      if (!printWindow) {
        this.setToolbarFeedback(sectionId, "Allow pop-ups to print this section");
        return;
      }
      const style = `
        <style>
          body { font-family: 'Manrope', 'Segoe UI', sans-serif; padding: 2rem; background: #fff; color: #111; }
          h1, h2, h3, h4 { font-weight: 600; }
          ul { margin-left: 1.25rem; }
          p { line-height: 1.5; margin: 0 0 0.85rem 0; }
          a { color: #1b60ff; }
        </style>
      `;
      printWindow.document.write(`
        <html>
          <head>
            <title>${this.escapeHtml(sectionTitle)}</title>
            ${style}
          </head>
          <body>
            <h1>${this.escapeHtml(sectionTitle)}</h1>
            ${clone.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      this.setToolbarFeedback(sectionId, "Print dialog opened");
    },
    async exportSectionPdf(sectionId) {
      if (!sectionId || typeof window === "undefined" || typeof document === "undefined") return;
      const section = document.getElementById(sectionId);
      if (!section) return;
      const clone = section.cloneNode(true);
      const toolbar = clone.querySelector(".section-toolbar");
      if (toolbar) toolbar.remove();
      const sectionWidth = Math.min(section.offsetWidth || 900, 1200);
      const wrapper = document.createElement("div");
      wrapper.style.boxSizing = "border-box";
      wrapper.style.background = "#fff";
      wrapper.style.padding = "24px";
      wrapper.style.width = `${sectionWidth}px`;
      wrapper.appendChild(clone);
      const hidden = document.createElement("div");
      hidden.style.position = "fixed";
      hidden.style.top = "-9999px";
      hidden.style.left = "-9999px";
      hidden.style.opacity = "0";
      hidden.style.pointerEvents = "none";
      hidden.style.zIndex = "-1";
      hidden.appendChild(wrapper);
      document.body.appendChild(hidden);
      try {
        const scale = Math.min(Math.max(window.devicePixelRatio || 1, 1) * 1.5, 3);
        const canvas = await html2canvas__WEBPACK_IMPORTED_MODULE_3___default()(wrapper, {
          scale,
          backgroundColor: "#ffffff",
          useCORS: true
        });
        const imgData = canvas.toDataURL("image/png", 1);
        const orientation = canvas.width > canvas.height ? "landscape" : "portrait";
        const pdf = new jspdf__WEBPACK_IMPORTED_MODULE_4__.jsPDF({
          orientation,
          unit: "px",
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        const sectionTitle = this.getSectionTitle(sectionId) || sectionId || "ramadan-section";
        const filenameSlug = sectionTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || sectionId || "ramadan-section";
        pdf.save(`${filenameSlug}.pdf`);
        this.setToolbarFeedback(sectionId, "PDF download ready");
      } catch (_unused) {
        this.setToolbarFeedback(sectionId, "Unable to export PDF");
      } finally {
        if (document.body.contains(hidden)) {
          document.body.removeChild(hidden);
        }
      }
    },
    adjustSectionFont({
      sectionId,
      delta
    } = {}) {
      if (!sectionId || !delta) return;
      const step = Number(delta) || 0;
      if (!step) return;
      const minScale = 0.8;
      const maxScale = 1.4;
      const current = this.sectionFontScale[sectionId] || 1;
      const next = Math.max(minScale, Math.min(maxScale, current + step));
      if (next === current) return;
      this.sectionFontScale = _objectSpread(_objectSpread({}, this.sectionFontScale), {}, {
        [sectionId]: next
      });
      const label = step > 0 ? "Font increased" : "Font decreased";
      this.setToolbarFeedback(sectionId, label);
    },
    setToolbarFeedback(sectionId, message) {
      if (!sectionId) return;
      this.toolbarFeedback = _objectSpread(_objectSpread({}, this.toolbarFeedback), {}, {
        [sectionId]: message
      });
      const timers = _objectSpread({}, this.toolbarFeedbackTimeouts || {});
      if (timers[sectionId]) {
        clearTimeout(timers[sectionId]);
      }
      const timerId = setTimeout(() => {
        this.clearToolbarFeedback(sectionId);
      }, 3000);
      timers[sectionId] = timerId;
      this.toolbarFeedbackTimeouts = timers;
    },
    clearToolbarFeedback(sectionId) {
      if (!sectionId) return;
      const timers = _objectSpread({}, this.toolbarFeedbackTimeouts || {});
      if (timers[sectionId]) {
        clearTimeout(timers[sectionId]);
        timers[sectionId] = null;
      }
      this.toolbarFeedbackTimeouts = timers;
      this.toolbarFeedback = _objectSpread(_objectSpread({}, this.toolbarFeedback), {}, {
        [sectionId]: ""
      });
    },
    clearAllToolbarFeedbackTimers() {
      const timers = this.toolbarFeedbackTimeouts || {};
      Object.values(timers).forEach(timerId => {
        if (timerId) {
          clearTimeout(timerId);
        }
      });
      this.toolbarFeedbackTimeouts = {};
      this.toolbarFeedback = {};
    },
    loadPlannerState() {
      if (typeof window === "undefined") return;
      try {
        const calendarStored = JSON.parse(window.localStorage.getItem("ramadan2026.calendar") || "{}");
        if (calendarStored !== null && calendarStored !== void 0 && calendarStored.start) this.calendarStartOverride = calendarStored.start;
        if (calendarStored !== null && calendarStored !== void 0 && calendarStored.length) this.calendarLength = Number(calendarStored.length) || this.calendarLength;
        if (this.isAuthenticated) {
          const remindersKey = this.getUserStorageKey("reminders");
          const reflectionsKey = this.getUserStorageKey("reflections");
          const remindersStored = JSON.parse(window.localStorage.getItem(remindersKey) || "[]");
          if (Array.isArray(remindersStored)) {
            this.reminders = remindersStored;
          }
          const reflectionsStored = JSON.parse(window.localStorage.getItem(reflectionsKey) || "[]");
          if (Array.isArray(reflectionsStored)) {
            this.reflections = reflectionsStored;
          }
        } else {
          this.reminders = [];
          this.reflections = [];
        }
      } catch (error) {
        this.reminders = [];
        this.reflections = [];
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SectionToolbar",
  props: {
    sectionId: {
      type: String,
      required: true
    },
    sectionTitle: {
      type: String,
      default: ""
    },
    sectionFeedback: {
      type: String,
      default: ""
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_Ramadan2026Component_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_Ramadan2026Component_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/Ramadan2026Component.vue */ "./resources/components/vue/Ramadan2026Component.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "ramadan-2026"
};
const _hoisted_2 = {
  class: "r-hero",
  id: "top"
};
const _hoisted_3 = {
  class: "r-hero__inner"
};
const _hoisted_4 = {
  class: "r-hero__grid"
};
const _hoisted_5 = {
  class: "r-hero__content"
};
const _hoisted_6 = {
  class: "r-hero__eyebrow r-animate",
  style: {
    "--delay": "0.05s"
  }
};
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = {
  class: "r-hero__subtext-wrap r-animate",
  style: {
    "--delay": "0.25s"
  }
};
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = {
  class: "row justify-content-center r-hero-search-row r-animate",
  style: {
    "--delay": "0.3s"
  }
};
const _hoisted_12 = {
  class: "col-12"
};
const _hoisted_13 = {
  class: "r-hero-search"
};
const _hoisted_14 = {
  class: "r-hero-search__input-row"
};
const _hoisted_15 = {
  class: "r-hero-search__hint"
};
const _hoisted_16 = {
  key: 0,
  class: "r-hero-search__dropdown"
};
const _hoisted_17 = ["onClick"];
const _hoisted_18 = {
  class: "r-hero-search__result-section"
};
const _hoisted_19 = ["innerHTML"];
const _hoisted_20 = ["innerHTML"];
const _hoisted_21 = {
  key: 0,
  class: "r-hero-search__empty-result"
};
const _hoisted_22 = {
  class: "r-hero__media r-animate",
  style: {
    "--delay": "0.22s"
  }
};
const _hoisted_23 = {
  key: 0,
  class: "r-hero__section-grid r-animate",
  style: {
    "--delay": "0.36s"
  }
};
const _hoisted_24 = {
  class: "r-hero__section-title"
};
const _hoisted_25 = {
  class: "r-hero__section-links"
};
const _hoisted_26 = ["href"];
const _hoisted_27 = {
  id: "overview",
  class: "r-section"
};
const _hoisted_28 = {
  class: "container"
};
const _hoisted_29 = {
  class: "r-section__head r-overview__head"
};
const _hoisted_30 = {
  class: "r-section__title"
};
const _hoisted_31 = {
  class: "r-overview__lead"
};
const _hoisted_32 = {
  class: "r-section__subtitle"
};
const _hoisted_33 = {
  class: "r-overview__list"
};
const _hoisted_34 = {
  key: 0,
  class: "r-inline-references"
};
const _hoisted_35 = {
  class: "r-inline-references__title"
};
const _hoisted_36 = {
  class: "r-inline-reference__citation"
};
const _hoisted_37 = {
  key: 0
};
const _hoisted_38 = {
  id: "history",
  class: "r-section r-section--alt"
};
const _hoisted_39 = {
  class: "container"
};
const _hoisted_40 = {
  class: "r-section__head"
};
const _hoisted_41 = {
  class: "r-section__title"
};
const _hoisted_42 = {
  class: "r-section__subtitle"
};
const _hoisted_43 = {
  class: "r-grid r-grid--double r-grid--timeline"
};
const _hoisted_44 = {
  class: "r-card__icon",
  "aria-hidden": "true"
};
const _hoisted_45 = {
  class: "r-card__title"
};
const _hoisted_46 = {
  class: "r-card__desc"
};
const _hoisted_47 = {
  key: 0,
  class: "r-card__reference"
};
const _hoisted_48 = {
  key: 0,
  class: "r-grid r-grid--double r-spacing-top"
};
const _hoisted_49 = {
  key: 0,
  class: "r-card"
};
const _hoisted_50 = {
  class: "r-card__title"
};
const _hoisted_51 = {
  class: "r-list"
};
const _hoisted_52 = {
  key: 1,
  class: "r-card"
};
const _hoisted_53 = {
  class: "r-card__title"
};
const _hoisted_54 = {
  class: "r-list"
};
const _hoisted_55 = {
  key: 1,
  class: "r-inline-references"
};
const _hoisted_56 = {
  class: "r-inline-references__title"
};
const _hoisted_57 = {
  class: "r-inline-reference__citation"
};
const _hoisted_58 = {
  key: 0
};
const _hoisted_59 = {
  id: "interactive",
  class: "r-section"
};
const _hoisted_60 = {
  class: "container"
};
const _hoisted_61 = {
  class: "r-section__head"
};
const _hoisted_62 = {
  class: "r-section__controls"
};
const _hoisted_63 = {
  key: 0,
  id: "section-interactive-body",
  class: "r-section__body"
};
const _hoisted_64 = {
  key: 0,
  class: "r-empty"
};
const _hoisted_65 = {
  key: 1,
  class: "r-auth-gate"
};
const _hoisted_66 = {
  key: 2,
  class: "r-interactive-layout"
};
const _hoisted_67 = {
  key: 0,
  class: "r-quran-onboarding r-quran-onboarding--theme"
};
const _hoisted_68 = {
  class: "r-quran-onboarding__steps r-quran-onboarding__steps--theme"
};
const _hoisted_69 = {
  class: "r-quran-onboarding__step-badge"
};
const _hoisted_70 = {
  class: "r-quran-onboarding__step-icon",
  "aria-hidden": "true"
};
const _hoisted_71 = {
  class: "r-quran-onboarding__step-index"
};
const _hoisted_72 = {
  class: "r-quran-onboarding__cta-row"
};
const _hoisted_73 = {
  class: "r-interactive-grid"
};
const _hoisted_74 = {
  ref: "quranProgressCard",
  class: "r-card r-card--interactive r-animate",
  style: {
    "--delay": "0.05s"
  }
};
const _hoisted_75 = {
  class: "r-interactive-stack"
};
const _hoisted_76 = {
  class: "r-stack-head"
};
const _hoisted_77 = {
  class: "r-badge"
};
const _hoisted_78 = {
  class: "r-progress"
};
const _hoisted_79 = ["aria-valuenow"];
const _hoisted_80 = {
  class: "r-progress__meta"
};
const _hoisted_81 = {
  class: "r-form r-form--compact"
};
const _hoisted_82 = {
  class: "r-form__row"
};
const _hoisted_83 = ["value"];
const _hoisted_84 = ["max"];
const _hoisted_85 = {
  class: "r-form__row"
};
const _hoisted_86 = {
  class: "r-quick-add"
};
const _hoisted_87 = {
  class: "r-quick-add__buttons"
};
const _hoisted_88 = {
  class: "r-progress__footer"
};
const _hoisted_89 = {
  key: 0
};
const _hoisted_90 = {
  key: 1
};
const _hoisted_91 = {
  key: 2
};
const _hoisted_92 = {
  class: "r-progress-insights"
};
const _hoisted_93 = {
  class: "r-card r-card--interactive r-animate",
  style: {
    "--delay": "0.12s"
  }
};
const _hoisted_94 = {
  class: "r-interactive-stack"
};
const _hoisted_95 = {
  class: "r-stack-head"
};
const _hoisted_96 = {
  class: "r-badge"
};
const _hoisted_97 = {
  class: "r-today-panel"
};
const _hoisted_98 = {
  class: "r-today-meta"
};
const _hoisted_99 = {
  key: 0,
  class: "r-badge r-badge--good"
};
const _hoisted_100 = {
  key: 0,
  class: "r-confirm"
};
const _hoisted_101 = {
  class: "r-today-actions"
};
const _hoisted_102 = ["disabled"];
const _hoisted_103 = {
  class: "r-breakdown"
};
const _hoisted_104 = {
  class: "r-breakdown__day"
};
const _hoisted_105 = {
  class: "r-breakdown__date"
};
const _hoisted_106 = {
  class: "r-breakdown__meta"
};
const _hoisted_107 = {
  id: "key-dates",
  class: "r-section"
};
const _hoisted_108 = {
  class: "container"
};
const _hoisted_109 = {
  class: "r-section__head"
};
const _hoisted_110 = {
  class: "r-section__title"
};
const _hoisted_111 = {
  class: "r-section__subtitle"
};
const _hoisted_112 = {
  key: 0,
  class: "r-key-dates__highlights"
};
const _hoisted_113 = {
  key: 0,
  class: "r-card--mini__icon"
};
const _hoisted_114 = {
  class: "r-card__title"
};
const _hoisted_115 = {
  class: "r-card__desc"
};
const _hoisted_116 = {
  id: "section-key-dates-body",
  class: "r-section__body"
};
const _hoisted_117 = {
  class: "r-grid r-grid--dates"
};
const _hoisted_118 = {
  class: "r-card__title"
};
const _hoisted_119 = {
  class: "r-card__meta"
};
const _hoisted_120 = {
  class: "r-card__desc"
};
const _hoisted_121 = {
  key: 0,
  class: "r-moon-sighting"
};
const _hoisted_122 = {
  class: "r-card r-card--moon"
};
const _hoisted_123 = {
  class: "r-card__title"
};
const _hoisted_124 = {
  class: "r-moon-sighting__intro"
};
const _hoisted_125 = {
  class: "r-moon-sighting__steps"
};
const _hoisted_126 = {
  class: "r-moon-sighting__note"
};
const _hoisted_127 = {
  id: "how-to-fast",
  class: "r-section r-section--alt"
};
const _hoisted_128 = {
  class: "container"
};
const _hoisted_129 = {
  class: "r-section__head"
};
const _hoisted_130 = {
  class: "r-section__title"
};
const _hoisted_131 = {
  class: "r-section__subtitle"
};
const _hoisted_132 = {
  class: "r-grid r-grid--triple r-grid--stagger r-grid--how-to-fast"
};
const _hoisted_133 = {
  class: "r-card__icon",
  "aria-hidden": "true"
};
const _hoisted_134 = {
  class: "r-card__title"
};
const _hoisted_135 = {
  class: "r-list"
};
const _hoisted_136 = {
  key: 0,
  class: "r-inline-references"
};
const _hoisted_137 = {
  class: "r-inline-references__title"
};
const _hoisted_138 = {
  class: "r-inline-reference__citation"
};
const _hoisted_139 = {
  key: 0
};
const _hoisted_140 = {
  id: "faq",
  class: "r-section r-section--alt"
};
const _hoisted_141 = {
  class: "container"
};
const _hoisted_142 = {
  class: "r-section__head"
};
const _hoisted_143 = {
  class: "r-section__title"
};
const _hoisted_144 = {
  class: "r-section__subtitle"
};
const _hoisted_145 = {
  class: "r-grid r-grid--double r-faq-grid"
};
const _hoisted_146 = {
  class: "r-card__title r-faq-question"
};
const _hoisted_147 = {
  class: "r-card__desc r-faq-answer"
};
const _hoisted_148 = {
  id: "quran-plans",
  class: "r-section r-section--alt"
};
const _hoisted_149 = {
  class: "container"
};
const _hoisted_150 = {
  class: "r-section__head"
};
const _hoisted_151 = {
  class: "r-section__title"
};
const _hoisted_152 = {
  class: "r-section__subtitle"
};
const _hoisted_153 = {
  class: "r-section__controls"
};
const _hoisted_154 = ["aria-label", "title"];
const _hoisted_155 = {
  class: "r-grid r-grid--triple r-grid--stagger"
};
const _hoisted_156 = {
  class: "r-card__head"
};
const _hoisted_157 = {
  class: "r-card__icon",
  "aria-hidden": "true"
};
const _hoisted_158 = {
  class: "r-card__head-text"
};
const _hoisted_159 = {
  class: "r-card__title"
};
const _hoisted_160 = {
  class: "r-card__desc"
};
const _hoisted_161 = ["aria-expanded", "aria-controls", "onClick", "aria-label", "title"];
const _hoisted_162 = ["id"];
const _hoisted_163 = {
  class: "r-list"
};
const _hoisted_164 = {
  class: "r-list r-spacing-top"
};
const _hoisted_165 = {
  key: 0,
  class: "r-inline-references"
};
const _hoisted_166 = {
  class: "r-inline-references__title"
};
const _hoisted_167 = {
  class: "r-inline-reference__citation"
};
const _hoisted_168 = {
  key: 0
};
const _hoisted_169 = {
  id: "personal-plans",
  class: "r-section"
};
const _hoisted_170 = {
  class: "container"
};
const _hoisted_171 = {
  class: "r-section__head"
};
const _hoisted_172 = {
  class: "r-section__title"
};
const _hoisted_173 = {
  class: "r-section__subtitle"
};
const _hoisted_174 = {
  class: "r-section__controls"
};
const _hoisted_175 = ["aria-label", "title"];
const _hoisted_176 = {
  class: "r-grid r-grid--double r-grid--stagger"
};
const _hoisted_177 = {
  class: "r-card__head"
};
const _hoisted_178 = {
  class: "r-card__icon",
  "aria-hidden": "true"
};
const _hoisted_179 = {
  class: "r-card__head-text"
};
const _hoisted_180 = {
  class: "r-card__title"
};
const _hoisted_181 = ["aria-expanded", "aria-controls", "onClick", "aria-label", "title"];
const _hoisted_182 = {
  class: "r-card__desc"
};
const _hoisted_183 = {
  class: "r-card__desc"
};
const _hoisted_184 = ["id"];
const _hoisted_185 = {
  class: "r-card__desc"
};
const _hoisted_186 = {
  class: "r-list-block"
};
const _hoisted_187 = {
  class: "r-list-block"
};
const _hoisted_188 = {
  class: "r-card__desc"
};
const _hoisted_189 = {
  id: "charity",
  class: "r-section r-section--alt"
};
const _hoisted_190 = {
  class: "container"
};
const _hoisted_191 = {
  class: "r-section__head"
};
const _hoisted_192 = {
  class: "r-section__title"
};
const _hoisted_193 = {
  class: "r-section__subtitle"
};
const _hoisted_194 = {
  class: "r-grid r-grid--double"
};
const _hoisted_195 = {
  class: "r-card r-card--charity"
};
const _hoisted_196 = {
  class: "r-charity-body"
};
const _hoisted_197 = {
  class: "r-card__title"
};
const _hoisted_198 = {
  class: "r-list"
};
const _hoisted_199 = {
  class: "r-card r-card--charity r-card--charity-alt"
};
const _hoisted_200 = {
  class: "r-card__title"
};
const _hoisted_201 = {
  class: "r-list"
};
const _hoisted_202 = {
  class: "r-card__title r-card__title--small"
};
const _hoisted_203 = {
  class: "r-list"
};
const _hoisted_204 = {
  key: 0,
  class: "r-inline-references"
};
const _hoisted_205 = {
  class: "r-inline-references__title"
};
const _hoisted_206 = {
  class: "r-inline-reference__citation"
};
const _hoisted_207 = {
  key: 0
};
const _hoisted_208 = {
  id: "health",
  class: "r-section"
};
const _hoisted_209 = {
  class: "container"
};
const _hoisted_210 = {
  class: "r-section__head"
};
const _hoisted_211 = {
  class: "r-section__title"
};
const _hoisted_212 = {
  class: "r-section__subtitle"
};
const _hoisted_213 = {
  class: "r-grid r-grid--triple r-grid--stagger"
};
const _hoisted_214 = {
  class: "r-card__icon",
  "aria-hidden": "true"
};
const _hoisted_215 = {
  class: "r-card__title"
};
const _hoisted_216 = {
  class: "r-list"
};
const _hoisted_217 = {
  class: "r-grid r-grid--double r-spacing-top"
};
const _hoisted_218 = {
  class: "r-card__icon",
  "aria-hidden": "true"
};
const _hoisted_219 = {
  class: "r-card__title"
};
const _hoisted_220 = {
  class: "r-list"
};
const _hoisted_221 = {
  class: "r-micro-tips"
};
const _hoisted_222 = {
  id: "shorts",
  class: "r-section"
};
const _hoisted_223 = {
  class: "container"
};
const _hoisted_224 = {
  class: "r-section__head"
};
const _hoisted_225 = {
  class: "r-section__title"
};
const _hoisted_226 = {
  class: "r-section__subtitle"
};
const _hoisted_227 = {
  class: "ramadan-short-hero"
};
const _hoisted_228 = {
  class: "ramadan-short-hero__title"
};
const _hoisted_229 = {
  class: "ramadan-short-hero__lead"
};
const _hoisted_230 = {
  class: "ramadan-short-section"
};
const _hoisted_231 = {
  class: "ramadan-short-section__head"
};
const _hoisted_232 = {
  class: "ramadan-short-section__title"
};
const _hoisted_233 = ["aria-expanded", "aria-label", "title"];
const _hoisted_234 = {
  key: 0,
  id: "shorts-highlights-grid",
  class: "ramadan-short-highlights"
};
const _hoisted_235 = {
  class: "ramadan-short-card__content"
};
const _hoisted_236 = {
  class: "ramadan-short-card__tag"
};
const _hoisted_237 = {
  class: "ramadan-short-card__title"
};
const _hoisted_238 = {
  class: "ramadan-short-card__desc"
};
const _hoisted_239 = {
  class: "ramadan-short-card__footer"
};
const _hoisted_240 = ["href"];
const _hoisted_241 = {
  class: "ramadan-short-groups"
};
const _hoisted_242 = {
  class: "ramadan-short-group__head"
};
const _hoisted_243 = {
  class: "ramadan-short-group__title"
};
const _hoisted_244 = ["onClick", "aria-expanded", "aria-controls", "aria-label", "title"];
const _hoisted_245 = ["id"];
const _hoisted_246 = {
  class: "ramadan-short-card__content"
};
const _hoisted_247 = {
  class: "ramadan-short-card__tag"
};
const _hoisted_248 = {
  class: "ramadan-short-card__title"
};
const _hoisted_249 = {
  class: "ramadan-short-card__desc"
};
const _hoisted_250 = {
  class: "ramadan-short-card__footer"
};
const _hoisted_251 = ["href"];
const _hoisted_252 = {
  id: "tools",
  class: "r-section r-section--alt"
};
const _hoisted_253 = {
  class: "container"
};
const _hoisted_254 = {
  class: "r-section__head"
};
const _hoisted_255 = {
  class: "r-section__title"
};
const _hoisted_256 = {
  class: "r-section__subtitle"
};
const _hoisted_257 = {
  key: 0,
  class: "r-section__intro"
};
const _hoisted_258 = {
  id: "section-tools-body",
  class: "r-section__body"
};
const _hoisted_259 = {
  class: "r-grid r-grid--triple r-grid--stagger"
};
const _hoisted_260 = {
  class: "r-card--tool__top-row"
};
const _hoisted_261 = {
  class: "r-card--tool__icons"
};
const _hoisted_262 = {
  class: "r-card--tool__text"
};
const _hoisted_263 = {
  class: "r-card__title"
};
const _hoisted_264 = {
  class: "r-card__desc"
};
const _hoisted_265 = {
  key: 0,
  class: "r-card__detail"
};
const _hoisted_266 = {
  class: "r-card--tool__footer"
};
const _hoisted_267 = ["href", "title", "aria-label"];
const _hoisted_268 = {
  id: "platforms",
  class: "r-section"
};
const _hoisted_269 = {
  class: "container"
};
const _hoisted_270 = {
  class: "r-section__head"
};
const _hoisted_271 = {
  class: "r-section__title"
};
const _hoisted_272 = {
  class: "r-section__subtitle"
};
const _hoisted_273 = {
  class: "r-grid r-grid--platforms"
};
const _hoisted_274 = {
  class: "r-resource-card__header"
};
const _hoisted_275 = {
  class: "r-card__icon",
  "aria-hidden": "true"
};
const _hoisted_276 = {
  class: "r-resource-card__title-wrap"
};
const _hoisted_277 = {
  class: "r-card__title"
};
const _hoisted_278 = {
  key: 0,
  class: "r-card__desc r-resource-card__desc"
};
const _hoisted_279 = ["onClick", "aria-expanded", "aria-label", "title"];
const _hoisted_280 = {
  key: 0,
  class: "r-resource-list"
};
const _hoisted_281 = {
  class: "r-resource-item__head"
};
const _hoisted_282 = {
  class: "r-resource-item__logo-wrap",
  "aria-hidden": "true"
};
const _hoisted_283 = ["src", "alt", "onError"];
const _hoisted_284 = {
  key: 1,
  class: "r-resource-item__logo-fallback"
};
const _hoisted_285 = {
  class: "r-resource-item__title-wrap"
};
const _hoisted_286 = {
  class: "r-resource-item__title"
};
const _hoisted_287 = {
  key: 0,
  class: "r-resource-item__note"
};
const _hoisted_288 = {
  class: "r-resource-item__footer"
};
const _hoisted_289 = ["href", "aria-label", "title"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_SectionToolbar = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("SectionToolbar");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_2, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-hero__backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.page_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "r-hero__title r-animate",
    style: {
      "--delay": "0.12s"
    },
    innerHTML: $options.highlightHeroText($data.ramadan.header.title)
  }, null, 8 /* PROPS */, _hoisted_7), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-hero__subtitle r-animate",
    style: {
      "--delay": "0.18s"
    },
    innerHTML: $options.highlightHeroText($data.ramadan.header.subtitle)
  }, null, 8 /* PROPS */, _hoisted_8), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.heroHighlights, (line, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-hero__subtext"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      innerHTML: $options.highlightHeroText(line)
    }, null, 8 /* PROPS */, _hoisted_10)]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "r-hero-search__label",
    for: "heroSearchInput"
  }, "Search this page", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "heroSearchInput",
    class: "r-input r-input--hero-search",
    type: "search",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.heroSearchTerm = $event),
    placeholder: "Try \"fasting\", \"zakat\", or \"laylat\"",
    autocomplete: "off",
    onKeydown: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.openFirstSearchResult && $options.openFirstSearchResult(...args), ["prevent"]), ["enter"]))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.heroSearchTerm, void 0, {
    trim: true
  }]]), $data.heroSearchTerm ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "r-button r-button--ghost r-button--sm r-hero-search__action",
    type: "button",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.clearHeroSearch && $options.clearHeroSearch(...args))
  }, " Clear ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.heroSearchHelperText), 1 /* TEXT */), $options.heroSearchShouldShowDropdown ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.heroSearchResults, result => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: result.id,
      class: "r-hero-search__result",
      type: "button",
      onClick: $event => $options.goToSearchResult(result)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(result.sectionLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-hero-search__result-title",
      innerHTML: $options.highlightSearchResultText(result.title)
    }, null, 8 /* PROPS */, _hoisted_19), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-hero-search__result-snippet",
      innerHTML: $options.buildSearchSnippet(result.text)
    }, null, 8 /* PROPS */, _hoisted_20)], 8 /* PROPS */, _hoisted_17);
  }), 128 /* KEYED_FRAGMENT */)), !$options.heroSearchResults.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_21, "No results found.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [$options.navSections.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.navSections, section => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: section.title,
      class: "r-hero__section-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.links, link => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
        key: link.href,
        class: "r-hero__section-pill",
        href: link.href
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(link.label), 9 /* TEXT, PROPS */, _hoisted_26);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "overview",
    "section-title": $data.ramadan.overview.section_title,
    "section-feedback": $data.toolbarFeedback['overview'],
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-overview-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('overview'))
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.body, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-overview__body"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.key_points_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_33, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.key_points, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), $options.hasSectionReferences($data.ramadan.overview.references) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.references, (ref, refIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: `overview-reference-${refIndex}`,
      class: "r-inline-reference"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_36, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 1 /* TEXT */), $options.referenceSummary(ref) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_37, " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.referenceSummary(ref)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "history",
    "section-title": $data.ramadan.history.section_title,
    "section-feedback": $data.toolbarFeedback['history'],
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-history-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('history'))
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.body, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-section__subtitle"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.timeline, (item, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.period,
      class: "r-card r-card--timeline"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getIconClasses('timeline', index))
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.period), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.detail), 1 /* TEXT */), item.reference ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.reference), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.history.notable_figures || $data.ramadan.history.regional_practices ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [$data.ramadan.history.notable_figures ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.notable_figures.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_51, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.notable_figures.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.note), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.ramadan.history.regional_practices ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.regional_practices.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_54, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.regional_practices.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.region
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.region) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.detail), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.hasSectionReferences($data.ramadan.history.references) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_56, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.references, (ref, refIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: `history-reference-${refIndex}`,
      class: "r-inline-reference"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_57, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 1 /* TEXT */), $options.referenceSummary(ref) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_58, " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.referenceSummary(ref)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "r-section__title"
  }, " Quran progress studio ", -1 /* CACHED */)), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-section__subtitle"
  }, " Follow three simple steps: pick a unit, set your target, and update your reading each day. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--primary r-button--sm r-tracker-toggle",
    type: "button",
    onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleTrackerVisibility && $options.toggleTrackerVisibility(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.isTrackerVisible ? 'fa-circle-xmark' : 'fa-chart-line']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.isTrackerVisible ? "Close tracker" : "Open tracker"), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "r-collapse"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.isTrackerVisible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_63, [!$data.authResolved ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_64, "Checking login status...")) : !$data.isAuthenticated ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_65, [...(_cache[26] || (_cache[26] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "r-card__desc"
    }, " Log in to personalize your Quran tracker. May Allah bless your journey and help you stay consistent. ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "r-auth-actions"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-button r-button--ghost",
      href: "/login"
    }, "Log in")], -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_66, [$options.quranOnboardingSteps.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_67, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "r-quran-onboarding__header"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "r-mini-label"
    }, "Quick start"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "Ramadan-ready tracker prep")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-quran-onboarding__hint"
    }, "Follow the flow · 3 steps")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.quranOnboardingSteps, (step, index) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: step.title,
        class: "r-quran-onboarding__step r-quran-onboarding__step--theme"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fas', step.icon])
      }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_71, "Step " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(index + 1), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step.detail), 1 /* TEXT */)]);
    }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-button r-button--primary",
      type: "button",
      onClick: _cache[4] || (_cache[4] = (...args) => $options.scrollToQuranTracker && $options.scrollToQuranTracker(...args))
    }, " Go to tracker "), _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-quran-onboarding__cta-hint"
    }, "Or jump straight to today’s target", -1 /* CACHED */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
      class: "r-card__title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-book-open",
      "aria-hidden": "true"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Quran reading progress ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranProgressPercent) + "% complete", 1 /* TEXT */)]), _cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "r-card__desc"
    }, " Choose a unit, set a pace, and track your progress day by day. ", -1 /* CACHED */)), _cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "r-helper"
    }, "Estimates use your daily goal and selected Ramadan dates. Adjust totals to match your mushaf.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "r-progress__bar",
      role: "progressbar",
      "aria-valuenow": $options.quranProgressPercent,
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-progress__fill",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        width: `${$options.quranProgressPercent}%`
      })
    }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_79), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.quranProgress.completed) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.quranProgress.total) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranProgressRemaining) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel) + " remaining", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "r-label",
      for: "quran-unit"
    }, "Unit", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      id: "quran-unit",
      class: "r-select",
      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.quranProgress.unit = $event),
      onChange: _cache[6] || (_cache[6] = (...args) => $options.handleQuranUnitChange && $options.handleQuranUnitChange(...args))
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.quranUnits, unit => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: unit.value,
        value: unit.value
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(unit.label), 9 /* TEXT, PROPS */, _hoisted_83);
    }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.quranProgress.unit]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "r-label",
      for: "quran-total"
    }, "Total", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      id: "quran-total",
      class: "r-input",
      type: "number",
      min: "1",
      "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.quranProgress.total = $event),
      onInput: _cache[8] || (_cache[8] = (...args) => $options.normalizeQuranProgress && $options.normalizeQuranProgress(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.quranProgress.total, void 0, {
      number: true
    }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "r-label",
      for: "quran-completed"
    }, "Completed", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      id: "quran-completed",
      class: "r-input",
      type: "number",
      min: "0",
      max: $data.quranProgress.total,
      "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.quranProgress.completed = $event),
      onInput: _cache[10] || (_cache[10] = (...args) => $options.normalizeQuranProgress && $options.normalizeQuranProgress(...args))
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_84), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.quranProgress.completed, void 0, {
      number: true
    }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      class: "r-label",
      for: "quran-goal"
    }, "Daily goal", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      id: "quran-goal",
      class: "r-input",
      type: "number",
      min: "0",
      step: "1",
      "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => $data.quranProgress.dailyGoal = $event),
      onInput: _cache[12] || (_cache[12] = (...args) => $options.normalizeQuranProgress && $options.normalizeQuranProgress(...args))
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.quranProgress.dailyGoal, void 0, {
      number: true
    }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-label"
    }, "Quick add", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-button r-button--ghost r-button--sm",
      type: "button",
      onClick: _cache[13] || (_cache[13] = $event => $options.addQuranProgress(1))
    }, " +1 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-button r-button--ghost r-button--sm",
      type: "button",
      onClick: _cache[14] || (_cache[14] = $event => $options.addQuranProgress(3))
    }, " +3 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-button r-button--ghost r-button--sm",
      type: "button",
      onClick: _cache[15] || (_cache[15] = $event => $options.addQuranProgress(5))
    }, " +5 ")])])])]), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "r-note r-note--muted"
    }, " Page counts can vary by mushaf edition. Adjust totals if needed. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [$options.quranProgressRemaining === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_89, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check-circle",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Completed ", -1 /* CACHED */)]))])) : $options.quranProgressDaysLeft ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_90, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-road",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" At this pace: ~" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranProgressDaysLeft) + " day" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranProgressDaysLeft === 1 ? "" : "s") + " left ", 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_91, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-calendar",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Set a daily goal to estimate your pace. ", -1 /* CACHED */)]))])), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-progress__hint"
    }, "Saved locally for your login.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-mini-label"
    }, "Days remaining", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranDaysRemaining), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-mini-label"
    }, "Needed per day", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranDailyTargetNeeded) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel) + "/day", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-mini-label"
    }, "Est. completion", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-flag-checkered",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranCompletionLabel), 1 /* TEXT */)])])])])], 512 /* NEED_PATCH */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_93, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
      class: "r-card__title"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-calendar-day",
      "aria-hidden": "true"
    }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Daily breakdown ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_96, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.calendarLength) + " days", 1 /* TEXT */)]), _cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "r-card__desc"
    }, " Tied to your selected Ramadan dates. Targets use your daily goal or an even split across Ramadan. ", -1 /* CACHED */)), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
      class: "r-helper"
    }, "Daily totals update from your saved entries (including “Mark today complete”).", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-mini-label"
    }, "Today's Progress", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranTodayRead) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranTodayTarget) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Remaining: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranTodayRemaining), 1 /* TEXT */), $options.quranTodayRemaining === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_99, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-check",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Completed ", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $options.quranTodayRemaining === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_100, "Completion saved for today.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "r-tooltip",
      "aria-label": "Uses your device date to define today.",
      title: "Uses your device date to define today."
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "fas fa-circle-info",
      "aria-hidden": "true"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-button r-button--ghost r-button--sm",
      type: "button",
      disabled: !$options.canMarkTodayComplete,
      onClick: _cache[16] || (_cache[16] = (...args) => $options.markTodayComplete && $options.markTodayComplete(...args))
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranTodayRemaining === 0 ? "Completed" : "Mark today complete"), 9 /* TEXT, PROPS */, _hoisted_102), $data.lastQuickAction ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      class: "r-chip r-chip--action",
      type: "button",
      onClick: _cache[17] || (_cache[17] = (...args) => $options.undoLastQuickAction && $options.undoLastQuickAction(...args))
    }, " Undo ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_103, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.quranBreakdownDays, day => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: day.key,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-breakdown__row", {
          'is-today': day.isToday,
          'is-selected': day.isSelected
        }])
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_104, "Day " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.dayNumber), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_105, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatShortDate(day.date)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-bullseye",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.target) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "fas fa-book-open",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.read) + " read ", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-badge", $options.breakdownStatusClass(day.status)])
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.breakdownStatusLabel(day.status)), 3 /* TEXT, CLASS */)])], 2 /* CLASS */);
    }), 128 /* KEYED_FRAGMENT */))])])])])]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_107, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_110, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.important_dates.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_111, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.important_dates.subtitle), 1 /* TEXT */)]), $options.keyDateHighlights.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_112, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.keyDateHighlights, highlight => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: highlight.title,
      class: "r-card r-card--mini"
    }, [highlight.showIcon !== false && highlight.icon ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_113, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fas', highlight.icon]),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_115, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(highlight.copy), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_116, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_117, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.important_dates.dates, (date, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: date.event,
      class: "r-card r-card--date"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-card__tag", `r-card__tag--${date.type}`])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.event), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_118, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.gregorian_date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_119, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.hijri_date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_120, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.description), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.moon_sighting ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_121, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_122, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_123, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.moon_sighting.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_124, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.moon_sighting.intro), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_125, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.moon_sighting.steps, (step, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: index
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(step), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_126, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.moon_sighting.note), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_127, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_129, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_130, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.how_to_fast.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_131, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.how_to_fast.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "how-to-fast",
    "section-title": $data.ramadan.how_to_fast.section_title,
    "section-feedback": $data.toolbarFeedback['how-to-fast'],
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-how-to-fast-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('how-to-fast'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_132, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.how_to_fast.cards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.title,
      class: "r-card r-card--step"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_133, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getIconClasses('fasting', index))
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_134, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_135, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(card.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), $options.hasSectionReferences($data.ramadan.how_to_fast.references) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_136, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_137, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.how_to_fast.references, (ref, refIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: `how-to-fast-reference-${refIndex}`,
      class: "r-inline-reference"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_138, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 1 /* TEXT */), $options.referenceSummary(ref) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_139, " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.referenceSummary(ref)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_140, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_141, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_142, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_143, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.faq.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_144, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.faq.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "faq",
    "section-title": $data.ramadan.faq.section_title,
    "section-feedback": $data.toolbarFeedback.faq,
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-faq-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('faq'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_145, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.faq.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.question,
      class: "r-card r-card--faq"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_146, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_147, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.answer), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_148, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_149, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_150, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_151, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.quran_reading_plans.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_152, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.quran_reading_plans.intro), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--ghost r-button--sm r-button--icon",
    type: "button",
    onClick: _cache[18] || (_cache[18] = (...args) => $options.toggleAllQuranPlans && $options.toggleAllQuranPlans(...args)),
    "aria-label": $options.areAllQuranPlansExpanded ? 'Collapse all plans' : 'Expand all plans',
    title: $options.areAllQuranPlansExpanded ? 'Collapse all plans' : 'Expand all plans'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $options.areAllQuranPlansExpanded ? 'fa-chevron-up' : 'fa-chevron-down']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_154)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "quran-plans",
    "section-title": $data.ramadan.quran_reading_plans.section_title,
    "section-feedback": $data.toolbarFeedback['quran-plans'],
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-quran-plans-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('quran-plans'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_155, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.quran_reading_plans.plans, (plan, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: plan.level,
      class: "r-card r-card--plan"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_156, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_157, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getIconClasses('quran', index))
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_158, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_159, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.level), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_160, "Daily target: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.daily_target), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-card__toggle r-card__toggle--icon",
      type: "button",
      "aria-expanded": $options.isQuranPlanExpanded(index),
      "aria-controls": `quran-plan-${index}`,
      onClick: $event => $options.toggleQuranPlan(index),
      "aria-label": $options.isQuranPlanExpanded(index) ? 'Hide details' : 'Show details',
      title: $options.isQuranPlanExpanded(index) ? 'Hide details' : 'Show details'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $options.isQuranPlanExpanded(index) ? 'fa-chevron-up' : 'fa-chevron-down']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_161)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: `quran-plan-${index}`,
      class: "r-plan-details"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_163, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Time needed: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.time_needed), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Structure: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.structure), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Goal: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.goal), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Split: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.split), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_164, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.tips, tip => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: tip
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])], 8 /* PROPS */, _hoisted_162), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isQuranPlanExpanded(index)]])]);
  }), 128 /* KEYED_FRAGMENT */))]), $options.hasSectionReferences($data.ramadan.quran_reading_plans.references) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_165, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_166, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.quran_reading_plans.references, (ref, refIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: `quran-plans-reference-${refIndex}`,
      class: "r-inline-reference"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_167, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 1 /* TEXT */), $options.referenceSummary(ref) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_168, " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.referenceSummary(ref)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_169, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_170, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_171, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_172, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_173, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.intro), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_174, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--ghost r-button--sm r-button--icon",
    type: "button",
    onClick: _cache[19] || (_cache[19] = (...args) => $options.toggleAllPersonalPlans && $options.toggleAllPersonalPlans(...args)),
    "aria-label": $options.areAllPersonalPlansExpanded ? 'Collapse all plans' : 'Expand all plans',
    title: $options.areAllPersonalPlansExpanded ? 'Collapse all plans' : 'Expand all plans'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $options.areAllPersonalPlansExpanded ? 'fa-chevron-up' : 'fa-chevron-down']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_175)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "personal-plans",
    "section-title": $data.ramadan.personal_plans.section_title,
    "section-feedback": $data.toolbarFeedback['personal-plans'],
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-personal-plans-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('personal-plans'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_176, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.personal_plans.plans, (plan, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: plan.title,
      class: "r-card r-card--persona"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_177, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_178, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getIconClasses('personal', index))
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_179, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_180, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-card__toggle r-card__toggle--icon",
      type: "button",
      "aria-expanded": $options.isPersonalPlanExpanded(index),
      "aria-controls": `personal-plan-${index}`,
      onClick: $event => $options.togglePersonalPlan(index),
      "aria-label": $options.isPersonalPlanExpanded(index) ? 'Hide details' : 'Show details',
      title: $options.isPersonalPlanExpanded(index) ? 'Hide details' : 'Show details'
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $options.isPersonalPlanExpanded(index) ? 'fa-chevron-up' : 'fa-chevron-down']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_181)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_182, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.who_for), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_183, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.overview), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: `personal-plan-${index}`,
      class: "r-plan-details"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_185, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.focus), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_186, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.daily_flow_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.daily_flow, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_187, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.weekly_focus_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.weekly_focus, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_188, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.accountability), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_184), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isPersonalPlanExpanded(index)]])]);
  }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_189, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_190, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_191, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_192, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_193, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "charity",
    "section-title": $data.ramadan.charity_guide.section_title,
    "section-feedback": $data.toolbarFeedback.charity,
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-charity-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('charity'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_194, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_195, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-card__icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-heart"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_196, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.overview, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-card__desc"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_197, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.zakat_al_fitr.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_198, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.zakat_al_fitr.points, point => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: point
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(point), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_199, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-card__icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-gift"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_200, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.sadaqah_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_201, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.sadaqah_ideas, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_202, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.giving_checklist_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_203, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.giving_checklist, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.impact_notes, note => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "r-note",
      key: note
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])]), $options.hasSectionReferences($data.ramadan.charity_guide.references) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_204, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_205, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.references, (ref, refIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: `charity-reference-${refIndex}`,
      class: "r-inline-reference"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_206, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 1 /* TEXT */), $options.referenceSummary(ref) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_207, " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.referenceSummary(ref)), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_208, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_209, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_210, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_211, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.health_food_tips.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_212, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.health_food_tips.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "health",
    "section-title": $data.ramadan.health_food_tips.section_title,
    "section-feedback": $data.toolbarFeedback.health,
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-health-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('health'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_213, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.primary_sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: section.title,
      class: "r-card r-card--health"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_214, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getIconClasses('health', index))
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_215, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_216, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_217, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.secondary_sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: section.title,
      class: "r-card r-card--health r-card--health-alt"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_218, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getIconClasses('health', index + 3))
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_219, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_220, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_221, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.micro_tips, tip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: tip,
      class: "r-chip"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <section id=\"duas\" class=\"r-section r-section--alt\">\n      <div class=\"container\">\n        <div class=\"r-section__head\">\n          <h2 class=\"r-section__title\">\n            {{ ramadan.duas_prayers.section_title }}\n          </h2>\n          <p class=\"r-section__subtitle\">{{ ramadan.duas_prayers.intro }}</p>\n        </div>\n        <div id=\"section-duas-body\" class=\"r-section__body\">\n          <div class=\"r-story-grid\">\n            <article v-for=\"dua in ramadan.duas_prayers.daily_duas\" :key=\"dua.occasion\"\n              class=\"r-story-card r-story-card--dua\" :style=\"storyStyle()\">\n              <div class=\"r-story-content\">\n                <h3 class=\"r-story-title\">{{ dua.occasion }}</h3>\n                <p class=\"r-arabic\" dir=\"rtl\">{{ dua.arabic }}</p>\n                <p class=\"r-translit\">{{ dua.transliteration }}</p>\n                <p class=\"r-story-desc\">{{ dua.translation }}</p>\n                <a class=\"r-story-duration\" :href=\"dua.link\" target=\"_blank\" rel=\"noopener\">\n                  {{ dua.reference }}\n                </a>\n              </div>\n            </article>\n          </div>\n          <button class=\"r-link r-link--button\" type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#moreDuasModal\">\n            {{ ramadan.duas_prayers.view_more_label }}\n          </button>\n        </div>\n      </div>\n    </section> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_222, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_223, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_224, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_225, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_226, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_227, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "ramadan-short-eyebrow"
  }, "Quick inspiration for Ramadan", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_228, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.highlights_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_229, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.subtitle), 1 /* TEXT */)]), _cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "ramadan-short-pillset"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ramadan-short-pill"
  }, "Curated clips"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ramadan-short-pill"
  }, "Reminders ready"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "ramadan-short-pill"
  }, "Shareable")], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_230, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_231, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_232, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.highlights_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "ramadan-short-toggle",
    type: "button",
    onClick: _cache[20] || (_cache[20] = $event => $options.toggleShortsSection('highlights')),
    "aria-expanded": $options.isShortsSectionOpen('highlights'),
    "aria-controls": "shorts-highlights-grid",
    "aria-label": $options.isShortsSectionOpen('highlights') ? 'Collapse highlights' : 'Expand highlights',
    title: $options.isShortsSectionOpen('highlights') ? 'Collapse highlights' : 'Expand highlights'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $options.isShortsSectionOpen('highlights') ? 'fa-chevron-up' : 'fa-chevron-down']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_233)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "r-collapse"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$options.isShortsSectionOpen('highlights') ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_234, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.shorts.highlights, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: item.link,
        class: "ramadan-short-card",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.storyStyle(item.thumbnail))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_235, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_236, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tag), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_237, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_238, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_239, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "ramadan-short-card__link",
        href: item.link,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.watch_short), 9 /* TEXT, PROPS */, _hoisted_240)])], 4 /* STYLE */);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_241, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.shorts.groups, (group, groupIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: group.title,
      class: "ramadan-short-group"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_242, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_243, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "ramadan-short-toggle",
      type: "button",
      onClick: $event => $options.toggleShortsSection(`group-${groupIndex}`),
      "aria-expanded": $options.isShortsSectionOpen(`group-${groupIndex}`),
      "aria-controls": `shorts-group-${groupIndex}`,
      "aria-label": $options.isShortsSectionOpen(`group-${groupIndex}`) ? `Collapse ${group.title}` : `Expand ${group.title}`,
      title: $options.isShortsSectionOpen(`group-${groupIndex}`) ? `Collapse ${group.title}` : `Expand ${group.title}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $options.isShortsSectionOpen(`group-${groupIndex}`) ? 'fa-chevron-up' : 'fa-chevron-down']),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_244)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "r-collapse"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$options.isShortsSectionOpen(`group-${groupIndex}`) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        id: `shorts-group-${groupIndex}`,
        class: "ramadan-short-group__grid"
      }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(group.items, item => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
          key: item.link,
          class: "ramadan-short-card ramadan-short-card--compact",
          style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.storyStyle(item.thumbnail))
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_246, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_247, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tag), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_248, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_249, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_250, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
          class: "ramadan-short-card__link",
          href: item.link,
          target: "_blank",
          rel: "noopener"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.watch_short), 9 /* TEXT, PROPS */, _hoisted_251)])], 4 /* STYLE */);
      }), 128 /* KEYED_FRAGMENT */))], 8 /* PROPS */, _hoisted_245)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)]);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_252, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_253, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_254, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_255, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.tools_calculators.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_256, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.tools_calculators.subtitle), 1 /* TEXT */), $data.ramadan.tools_calculators.intro ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_257, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.tools_calculators.intro, (line, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(line), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_258, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_259, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.tools_calculators.tools, (tool, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: tool.title,
      class: "r-card r-card--tool"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_260, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_261, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fas', tool.icon]),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_262, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_263, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tool.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_264, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tool.description), 1 /* TEXT */)])]), tool.detail ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_265, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tool.detail), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_266, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: tool.link,
      class: "r-button r-button--ghost r-card--tool__action",
      target: "_blank",
      rel: "noopener",
      title: $data.ramadan.labels.open_tool_title || $data.ramadan.labels.open_tool,
      "aria-label": $data.ramadan.labels.open_tool_aria || $data.ramadan.labels.open_tool
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.open_tool), 9 /* TEXT, PROPS */, _hoisted_267)])]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_268, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_269, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_270, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_271, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.platform_resources.section_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_272, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.platform_resources.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_SectionToolbar, {
    "section-id": "platforms",
    "section-title": $data.ramadan.platform_resources.section_title,
    "section-feedback": $data.toolbarFeedback.platforms,
    onWhatsappShare: $options.shareSectionViaWhatsApp,
    onCopySection: $options.copySectionContent,
    onPrintSection: $options.printSection,
    onExportPdf: $options.exportSectionPdf,
    onAdjustFont: $options.adjustSectionFont
  }, null, 8 /* PROPS */, ["section-title", "section-feedback", "onWhatsappShare", "onCopySection", "onPrintSection", "onExportPdf", "onAdjustFont"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "section-platforms-body",
    class: "r-section__body",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.sectionBodyStyle('platforms'))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_273, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.platform_resources.cards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.title,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-card r-card--resource", {
        'r-card--resource-collapsed': !$options.isPlatformCardOpen(index)
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_274, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_275, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($options.getIconClasses('platforms', index))
    }, null, 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_276, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_277, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), card.description && $options.isPlatformCardOpen(index) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_278, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.description), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      type: "button",
      class: "r-resource-toggle",
      onClick: $event => $options.togglePlatformCard(index),
      "aria-expanded": $options.isPlatformCardOpen(index),
      "aria-label": $options.isPlatformCardOpen(index) ? `Collapse ${card.title}` : `Expand ${card.title}`,
      title: $options.isPlatformCardOpen(index) ? `Collapse ${card.title}` : `Expand ${card.title}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $options.isPlatformCardOpen(index) ? 'fa-chevron-up' : 'fa-chevron-down'])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_279)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "r-collapse"
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$options.isPlatformCardOpen(index) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_280, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(card.items, item => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
          key: item.label,
          class: "r-resource-item"
        }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_281, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_282, [!$data.failedPlatformLogos[item.link] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
          key: 0,
          src: item.logo,
          alt: `${item.name || item.label} logo`,
          class: "r-resource-item__logo",
          loading: "lazy",
          onError: $event => $options.markPlatformLogoFailed(item.link)
        }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_283)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_284, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.resourceInitials(item.name || item.label)), 1 /* TEXT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_285, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_286, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name || item.label), 1 /* TEXT */)])]), item.note ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_287, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.note), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_288, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
          class: "r-resource-link r-button r-button--ghost r-resource-link--icon",
          href: item.link,
          target: "_blank",
          rel: "noopener",
          "aria-label": `Open ${item.name || item.label}`,
          title: `Open ${item.name || item.label}`
        }, [...(_cache[58] || (_cache[58] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
          class: "fas fa-arrow-up-right-from-square",
          "aria-hidden": "true"
        }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_289)])]);
      }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
      _: 2 /* DYNAMIC */
    }, 1024 /* DYNAMIC_SLOTS */)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])], 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"modal fade\" id=\"moreDuasModal\" tabindex=\"-1\" aria-labelledby=\"moreDuasModalLabel\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-xl modal-dialog-centered\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\" id=\"moreDuasModalLabel\">{{ ramadan.duas_prayers.modal_title }}</h5>\n            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n          </div>\n          <div class=\"modal-body\">\n            <div class=\"r-dua-modal-controls\">\n              <div class=\"r-dua-search\">\n                <label class=\"r-dua-search__label\" for=\"duaSearchInput\">\n                  {{ ramadan.duas_prayers.search_label || \"Search the dua library\" }}\n                </label>\n                <input id=\"duaSearchInput\" class=\"r-input r-input--search\" type=\"search\" v-model=\"duaSearchTerm\"\n                  placeholder=\"Search by purpose, Arabic, or reference\" autocomplete=\"off\" />\n                <p class=\"r-dua-search__hint\">Highlights refresh as you type and show every matching word.</p>\n              </div>\n              <div class=\"r-dua-filters\" role=\"group\" aria-label=\"Filter duas\">\n                <div class=\"r-dua-filter-group\">\n                  <label class=\"r-dua-filter-label\" for=\"duaSourceSelect\">Source</label>\n                  <select id=\"duaSourceSelect\" class=\"r-select\" v-model=\"duaSourceFilter\">\n                    <option v-for=\"filter in duaSourceFilters\" :key=\"filter.value\" :value=\"filter.value\">\n                      {{ filter.label }}\n                    </option>\n                  </select>\n                </div>\n                <div class=\"r-dua-filter-group\">\n                  <label class=\"r-dua-filter-label\" for=\"duaSectionSelect\">Section</label>\n                  <select id=\"duaSectionSelect\" class=\"r-select\" v-model=\"duaSectionFilter\">\n                    <option v-for=\"filter in duaSectionFilters\" :key=\"filter.value\" :value=\"filter.value\">\n                      {{ filter.label }}\n                    </option>\n                  </select>\n                </div>\n              </div>\n            </div>\n\n            <div v-if=\"!filteredDuaSections.length\" class=\"r-dua-empty\">\n              <p>No matching supplications were found. Try clearing the search or changing the filter.</p>\n              <button type=\"button\" class=\"r-link\" @click=\"resetDuaFilters\">Reset filters</button>\n            </div>\n\n            <div v-else class=\"r-modal-grid\">\n              <div v-for=\"section in filteredDuaSections\" :key=\"section.title\" class=\"r-modal-card\">\n                <h3>{{ section.title }}</h3>\n                <div class=\"r-story-grid r-story-grid--modal\">\n                  <article v-for=\"item in section.items\" :key=\"`${item.name}-${item.reference}`\"\n                    class=\"r-story-card r-story-card--dua\">\n                    <div class=\"r-story-content\">\n                      <h4 class=\"r-story-title\" v-html=\"highlightDuaText(item.name)\"></h4>\n                      <p class=\"r-arabic\" dir=\"rtl\" v-html=\"highlightDuaText(item.arabic)\"></p>\n                      <p class=\"r-translit\" v-html=\"highlightDuaText(item.transliteration)\"></p>\n                      <p class=\"r-story-desc\" v-html=\"highlightDuaText(item.translation)\"></p>\n                      <div class=\"r-story-meta\">\n                        <a class=\"r-story-duration\" :href=\"item.resource\" target=\"_blank\" rel=\"noopener\"\n                          v-html=\"highlightDuaText(item.reference)\"></a>\n                        <a class=\"r-story-link\" :href=\"item.resource\" target=\"_blank\" rel=\"noopener\">\n                          {{ ramadan.labels.resource_label }}\n                        </a>\n                      </div>\n                    </div>\n                  </article>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div> "), $data.showFab ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "r-fab",
    type: "button",
    onClick: _cache[21] || (_cache[21] = (...args) => $options.scrollToTop && $options.scrollToTop(...args)),
    "aria-label": "Scroll back to top",
    title: "Scroll back to top"
  }, [...(_cache[59] || (_cache[59] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "aria-hidden": "true"
  }, "⬆", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=template&id=764d2fb0&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=template&id=764d2fb0&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "section-toolbar",
  role: "group",
  "aria-label": "Section utility controls"
};
const _hoisted_2 = {
  class: "section-toolbar__inner"
};
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = ["aria-label"];
const _hoisted_6 = ["aria-label"];
const _hoisted_7 = ["aria-label"];
const _hoisted_8 = ["aria-label"];
const _hoisted_9 = {
  key: 0,
  class: "section-toolbar__feedback",
  role: "status"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-toolbar__button section-toolbar__button--whatsapp",
    type: "button",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('whatsapp-share', $props.sectionId)),
    "aria-label": `Share ${$props.sectionTitle || 'this section'} via WhatsApp Web`
  }, [...(_cache[6] || (_cache[6] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fab fa-whatsapp",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "WhatsApp", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_3), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-toolbar__button section-toolbar__button--copy",
    type: "button",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.$emit('copy-section', $props.sectionId)),
    "aria-label": `Copy ${$props.sectionTitle || 'this section'} to clipboard`
  }, [...(_cache[7] || (_cache[7] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-copy",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Copy", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_4), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-toolbar__button section-toolbar__button--print",
    type: "button",
    onClick: _cache[2] || (_cache[2] = $event => _ctx.$emit('print-section', $props.sectionId)),
    "aria-label": `Print ${$props.sectionTitle || 'this section'}`
  }, [...(_cache[8] || (_cache[8] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-print",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Print", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-toolbar__button section-toolbar__button--pdf",
    type: "button",
    onClick: _cache[3] || (_cache[3] = $event => _ctx.$emit('export-pdf', $props.sectionId)),
    "aria-label": `Download ${$props.sectionTitle || 'this section'} as PDF`
  }, [...(_cache[9] || (_cache[9] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-file-pdf",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "PDF", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_6), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-toolbar__button section-toolbar__button--text section-toolbar__button--smaller",
    type: "button",
    onClick: _cache[4] || (_cache[4] = $event => _ctx.$emit('adjust-font', {
      sectionId: $props.sectionId,
      delta: -0.1
    })),
    "aria-label": `Decrease font size for ${$props.sectionTitle || 'this section'}`
  }, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "aria-hidden": "true"
  }, "A-", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_7), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "section-toolbar__button section-toolbar__button--text section-toolbar__button--larger",
    type: "button",
    onClick: _cache[5] || (_cache[5] = $event => _ctx.$emit('adjust-font', {
      sectionId: $props.sectionId,
      delta: 0.1
    })),
    "aria-label": `Increase font size for ${$props.sectionTitle || 'this section'}`
  }, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "aria-hidden": "true"
  }, "A+", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_8)]), $props.sectionFeedback ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.sectionFeedback), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=style&index=0&id=764d2fb0&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=style&index=0&id=764d2fb0&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/Ramadan2026Component.vue":
/*!***********************************************************!*\
  !*** ./resources/components/vue/Ramadan2026Component.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ramadan2026Component_vue_vue_type_template_id_05456a07_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true */ "./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true");
/* harmony import */ var _Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ramadan2026Component.vue?vue&type=script&lang=js */ "./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js");
/* harmony import */ var _Ramadan2026Component_vue_vue_type_style_index_0_id_05456a07_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css */ "./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Ramadan2026Component_vue_vue_type_template_id_05456a07_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-05456a07"],['__file',"resources/components/vue/Ramadan2026Component.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Ramadan2026Component.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css":
/*!*******************************************************************************************************************!*\
  !*** ./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_style_index_0_id_05456a07_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=style&index=0&id=05456a07&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_template_id_05456a07_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_template_id_05456a07_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/Ramadan2026Component.vue?vue&type=template&id=05456a07&scoped=true");


/***/ }),

/***/ "./resources/components/vue/SectionToolbar.vue":
/*!*****************************************************!*\
  !*** ./resources/components/vue/SectionToolbar.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SectionToolbar_vue_vue_type_template_id_764d2fb0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SectionToolbar.vue?vue&type=template&id=764d2fb0&scoped=true */ "./resources/components/vue/SectionToolbar.vue?vue&type=template&id=764d2fb0&scoped=true");
/* harmony import */ var _SectionToolbar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SectionToolbar.vue?vue&type=script&lang=js */ "./resources/components/vue/SectionToolbar.vue?vue&type=script&lang=js");
/* harmony import */ var _SectionToolbar_vue_vue_type_style_index_0_id_764d2fb0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SectionToolbar.vue?vue&type=style&index=0&id=764d2fb0&scoped=true&lang=css */ "./resources/components/vue/SectionToolbar.vue?vue&type=style&index=0&id=764d2fb0&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_SectionToolbar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_SectionToolbar_vue_vue_type_template_id_764d2fb0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-764d2fb0"],['__file',"resources/components/vue/SectionToolbar.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/SectionToolbar.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/components/vue/SectionToolbar.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionToolbar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionToolbar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SectionToolbar.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/SectionToolbar.vue?vue&type=style&index=0&id=764d2fb0&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/components/vue/SectionToolbar.vue?vue&type=style&index=0&id=764d2fb0&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionToolbar_vue_vue_type_style_index_0_id_764d2fb0_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SectionToolbar.vue?vue&type=style&index=0&id=764d2fb0&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=style&index=0&id=764d2fb0&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/SectionToolbar.vue?vue&type=template&id=764d2fb0&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/SectionToolbar.vue?vue&type=template&id=764d2fb0&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionToolbar_vue_vue_type_template_id_764d2fb0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_SectionToolbar_vue_vue_type_template_id_764d2fb0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./SectionToolbar.vue?vue&type=template&id=764d2fb0&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/SectionToolbar.vue?vue&type=template&id=764d2fb0&scoped=true");


/***/ }),

/***/ "./resources/components/vue/data/ramadan_2026.json":
/*!*********************************************************!*\
  !*** ./resources/components/vue/data/ramadan_2026.json ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"page_title":"Ramadan 2026 | Complete Guide & Resources","meta_description":"Complete guide for Ramadan 1447 AH (2026 CE): key dates, how to fast, prayers made easy, Quran plans, charity guidance, health tips, duas, tools, and verified resources.","last_updated":"2025-03-01","data_sources":[{"label":"Quran.com","link":"https://quran.com"},{"label":"Sunnah.com","link":"https://sunnah.com"},{"label":"IslamQA.info","link":"https://islamqa.info"},{"label":"Yaqeen Institute","link":"https://yaqeeninstitute.org"},{"label":"SeekersGuidance","link":"https://seekersguidance.org"}],"labels":{"references":"References","open_video":"Open video","open_tool":"Launch tool","open_tool_title":"Launch tool","open_tool_aria":"Launch tool in a new tab","download":"Download","watch_short":"Watch short","highlights":"Highlights","view_source":"View","duration_prefix":"Duration","resource_label":"Resource"},"header":{"title":"Ramadan 2026 (1447 AH)","subtitle":"The Month of Quran, Fasting, and Spiritual Renewal","banner_image":"/images/ramadan-hero-pexels.jpg","alt_text":"Grand mosque exterior under a twilight sky","stats":{"last_updated_label":"Last updated","data_sources_label":"Data sources"}},"nav_links":[{"label":"What is Ramadan","href":"#overview"},{"label":"History","href":"#history"},{"label":"Key dates","href":"#key-dates"},{"label":"How to fast","href":"#how-to-fast"},{"label":"FAQ","href":"#faq"},{"label":"Recources","href":"#platforms"},{"label":"Quran plans","href":"#quran-plans"},{"label":"Personal plans","href":"#personal-plans"},{"label":"Tools","href":"#tools"},{"label":"Charity","href":"#charity"},{"label":"Health tips","href":"#health"},{"label":"Short clips","href":"#shorts"}],"overview":{"section_title":"What Is Ramadan?","subtitle":"Ramadan is the ninth month of the Islamic lunar calendar. It is a month of fasting from dawn to sunset, focused worship, Quran recitation, community care, and spiritual renewal.","body":["The Quran describes Ramadan as the month in which the Quran was revealed as guidance for humanity. Muslims fast to develop taqwa (God-consciousness), discipline their desires, and increase empathy for those in need.","Beyond fasting, Ramadan is a time to elevate worship through prayer, charity, and reflection. Families gather, communities host iftars, and masajid become centers of learning and service.","Every day in Ramadan is an invitation to reset habits, strengthen spiritual focus, and renew intentions with sincerity."],"key_points_title":"Key ideas to remember","key_points":["Fasting is an act of worship and self-discipline.","Ramadan is the month in which the Quran was revealed.","The last ten nights are especially blessed, including Laylat al-Qadr.","Charity and community care are central to the month.","Every day is an opportunity to improve character and habits."],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-185","source_site":"quran.com","embedded_text":"Allah prescribed fasting for believers so they may attain taqwa, and identified Ramadan as the month in which the Quran was revealed as guidance."},{"source":"Qur\'an","citation":"Al-Qadr 97:1-5","source_site":"quran.com","embedded_text":"Laylat al-Qadr is described as better than a thousand months and a night filled with peace by Allah\'s permission."},{"source":"Hadith","citation":"Sahih al-Bukhari 38; Sahih Muslim 760","source_site":"sunnah.com","embedded_text":"The Prophet taught that whoever fasts Ramadan with faith and hope of reward will have previous sins forgiven."}]},"history":{"section_title":"History & Significance","subtitle":"Ramadan is linked to the Quranic revelation and the obligation of fasting. Its devotional rhythm has shaped Muslim worship, ethics, and communal life for centuries.","body":["The Quran frames fasting in Ramadan as a prescribed act for believers and ties the month to revelation and guidance.","Prophetic practice established suhoor, iftar at sunset, and intensified night worship, while the last ten nights emphasize Laylat al-Qadr and spiritual retreat (i\'tikaf).","Across centuries, Ramadan shaped daily routines, public worship, and charitable life, anchored by mosques, learning circles, and family gatherings.","Modern Ramadan carries these traditions worldwide through organized charity, community programming, and digital learning."],"timeline":[{"number":1,"period":"c. 610 CE (13 BH)","detail":"The first revelation is tied to Ramadan, and the Quran identifies this month as the period of guidance for humanity.","reference":"Qur\'an 96:1-5; Qur\'an 97:1-5; Qur\'an 2:185","reference_site":"quran.com"},{"number":2,"period":"624 CE (2 AH)","detail":"The command to fast in Ramadan is formally legislated, with clear rulings on the goal, timeframe, and concessions.","reference":"Qur\'an 2:183-187","reference_site":"quran.com"},{"number":3,"period":"632-661 CE (Rashidun Caliphate)","detail":"Companions preserved Quran transmission and organized Ramadan night prayer at scale for community worship.","reference":"Sahih al-Bukhari 4986; Sahih al-Bukhari 2010","reference_site":"sunnah.com"},{"number":4,"period":"Classical Sunni Practice","detail":"Iftar at sunset, suhoor before dawn, and intensified qiyam became stable features of Ramadan worship across regions.","reference":"Sahih al-Bukhari 1957; Sahih Muslim 1095","reference_site":"sunnah.com"},{"number":5,"period":"Contemporary Fiqh Clarification","detail":"Modern fatwa platforms continue to explain exemptions, makeup fasts, fidyah, and valid reasons for breaking the fast.","reference":"IslamQA Ramadan topic hub and fasting rulings","reference_site":"IslamQA.info"},{"number":6,"period":"Community Teaching in the Digital Era","detail":"Structured online courses and answer services broaden access to Ramadan fiqh, adab, and worship preparation.","reference":"SeekersGuidance Ramadan answers and curriculum pages","reference_site":"SeekersGuidance"},{"number":7,"period":"Global Reflection Projects","detail":"Research-driven Ramadan series and reflection journals increase access to spiritually grounded educational content.","reference":"Yaqeen Institute Ramadan collection","reference_site":"Yaqeen Institute"},{"number":8,"period":"Contemporary Observance (21st Century)","detail":"Ramadan is globally shared but locally timed, with communities combining moon-sighting announcements, digital planning, and local service.","reference":"Qur\'an 2:185 with applied guidance from Sunni fiqh references","reference_site":"quran.com / Sunnah.com / IslamQA.info / SeekersGuidance / Yaqeen Institute"}],"notable_figures":{"title":"Scholars & Voices","items":[{"name":"Ibn Abbas (d. 687 CE)","note":"Early Qur\'anic exegete whose explanations shaped how Muslims understand verses about fasting."},{"name":"Imam Malik (d. 795 CE)","note":"Documented Madinan practice, including Ramadan customs and community observance."},{"name":"Imam al-Shafi\'i (d. 820 CE)","note":"Systematized legal principles that influenced fasting rulings across regions."},{"name":"Imam al-Nawawi (d. 1277 CE)","note":"Compiled hadith and devotional guidance that shaped Ramadan practice."}]},"regional_practices":{"title":"Regional Traditions","items":[{"region":"Egypt (Cairo)","detail":"Lantern processions and communal iftars became distinctive Ramadan features."},{"region":"Ottoman cities (Istanbul)","detail":"Public iftar tents and endowments supported travelers and the poor."},{"region":"West Africa (Sahel)","detail":"Quran recitation circles and night study gatherings remain a hallmark."},{"region":"South & Southeast Asia","detail":"Large taraweeh congregations and neighborhood iftars reinforce community bonds."},{"region":"Diaspora communities","detail":"Mosques and Islamic centers host open iftars and service drives to build cohesion."}]},"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-187","source_site":"quran.com","embedded_text":"These verses establish fasting in Ramadan, name the month of revelation, and provide core legal concessions for illness and travel."},{"source":"Qur\'an","citation":"Al-Baqarah 2:185","source_site":"quran.com","embedded_text":"Ramadan is defined as the month of Quran revelation and guidance, linking worship routine directly to revelation."},{"source":"Hadith","citation":"Sahih al-Bukhari 2010; Sahih al-Bukhari 4986","source_site":"sunnah.com","embedded_text":"These narrations are used for Ramadan congregational night prayer and the compilation-preservation history of the Qur\'an."},{"source":"Fiqh Guidance","citation":"Ramadan guidance collections","source_site":"IslamQA.info / SeekersGuidance / Yaqeen Institute","embedded_text":"Contemporary scholarship explains how classical rulings are applied in modern schedules, health contexts, and community conditions."}]},"important_dates":{"section_title":"Ramadan 2026 Key Dates","subtitle":"Plan ahead with the most likely timeline for Ramadan 1447 AH.","note":"Dates are approximate and subject to moon sighting. Local moon sighting announcements take precedence.","dates":[{"event":"First Taraweeh Night","gregorian_date":"February 16, 2026 (after Maghrib)","hijri_date":"30 Sha\'ban 1447 AH","description":"First Taraweeh prayer is usually held the night before the first fast.","type":"start"},{"event":"First Day of Ramadan","gregorian_date":"February 17, 2026","hijri_date":"1 Ramadan 1447 AH","description":"Expected first day of fasting based on astronomical calculations.","type":"start"},{"event":"First Friday of Ramadan","gregorian_date":"February 20, 2026","hijri_date":"4 Ramadan 1447 AH","description":"A meaningful Jumu\'ah during the early days of the month; a great moment to recommit to worship and community support.","type":"special"},{"event":"Mid-Ramadan Check-In","gregorian_date":"Approx. March 3, 2026","hijri_date":"15 Ramadan 1447 AH","description":"A good moment to renew goals and review Quran progress.","type":"special"},{"event":"Last 10 Nights Begin","gregorian_date":"Approx. March 8, 2026 (night)","hijri_date":"20 Ramadan 1447 AH","description":"Focus intensifies for night worship, duas, and seeking Laylat al-Qadr.","type":"special"},{"event":"Laylat al-Qadr (Night of Decree)","gregorian_date":"Approx. March 15-16, 2026","hijri_date":"27 Ramadan 1447 AH","description":"The most blessed night - better than 1000 months. Seek it in the last 10 odd nights.","type":"special"},{"event":"Zakat al-Fitr Deadline","gregorian_date":"Before Eid prayer (March 19, 2026)","hijri_date":"End of Ramadan","description":"Zakat al-Fitr should be paid before Eid prayer to reach those in need.","type":"special"},{"event":"Eid al-Fitr","gregorian_date":"March 19, 2026","hijri_date":"1 Shawwal 1447 AH","description":"Festival of Breaking the Fast. Subject to moon sighting.","type":"eid"}]},"moon_sighting":{"title":"Moon-sighting adjustment instructions","intro":"Ramadan depends on the lunar crescent. These steps help you stay aligned with local moon-sighting announcements while keeping your plan flexible.","steps":["Follow the final announcement from your local masjid, Islamic council, or moon-sighting committee before committing to the start of Ramadan.","Keep both 29- and 30-day plans handy so you can switch the calendar as soon as you hear whether the crescent was seen.","If the crescent is not confirmed on the 29th night, extend the current day of preparation and begin fasting the next evening while still waiting for confirmation.","Note who confirmed the sighting (community leader, scholar, or committee) and which geographic region they represented so your family can confidently follow the approved schedule."],"note":"Right after the official sighting, update the planner start date and adapt reminders, printouts, and digital exports to the confirmed timeline."},"how_to_fast":{"section_title":"How To Fast (Do\'s & Don\'ts)","intro":"Fasting is from dawn to sunset with the intention (niyyah). The goal is worship, discipline, and avoiding what breaks the fast.","cards":[{"title":"Do\'s","items":["Make intention before Fajr.","Eat a balanced Suhoor and hydrate well.","Pray on time and read Quran daily.","Break fast promptly at sunset with dates and water if possible.","Be mindful of behavior, speech, and time.","Make dua before Iftar - it is a special time for acceptance."]},{"title":"Don\'ts","items":["Do not eat or drink between Fajr and Maghrib.","Avoid backbiting, arguments, and harmful speech.","Avoid overeating at Iftar.","Do not neglect prayers or Quran.","Avoid wasting time in unhelpful activities."]},{"title":"Exemptions","items":["Children before puberty","The ill","Travelers","Pregnant or nursing women","Menstruating women"]}],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-187","source_site":"quran.com","embedded_text":"These verses define the obligation, the fasting window from dawn to night, and legal allowances for hardship."},{"source":"Hadith","citation":"Sahih al-Bukhari 1904; Sahih Muslim 1151","source_site":"sunnah.com","embedded_text":"Prophetic guidance clarifies intention, what invalidates fasting, and the reward connected to sincere fasting."},{"source":"Fiqh Q&A","citation":"Common fasting rulings","source_site":"IslamQA.info / SeekersGuidance","embedded_text":"Scholarly answers explain practical edge cases such as sickness, travel, pregnancy, medication timing, and makeup fasts."}]},"quran_reading_plans":{"section_title":"Quran Reading Plans (3 Levels)","intro":"Choose a plan that fits your schedule and energy. Consistency matters most.","plans":[{"level":"Beginner","daily_target":"4-6 pages","time_needed":"15-25 minutes","structure":"After Fajr + before sleep","goal":"Finish a meaningful portion and build a daily habit.","split":"2 short sessions","tips":["Read after Fajr when focus is strongest.","Listen to audio while commuting or walking.","Track progress on a simple checklist."]},{"level":"Intermediate","daily_target":"1 Juz","time_needed":"45-60 minutes","structure":"Split across 5 prayers","goal":"Complete the Quran once by Eid.","split":"5 short segments","tips":["Read 4-5 pages after each prayer.","Use the evening to catch up if needed.","Pair reading with reflection notes."]},{"level":"Advanced","daily_target":"1.5-2 Juz","time_needed":"90-120 minutes","structure":"Morning + afternoon + night","goal":"Complete the Quran more than once.","split":"3 focused sessions","tips":["Commit to a longer morning session.","Use Taraweeh recitation as part of the goal.","Review a translation alongside recitation."]}],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:185","source_site":"quran.com","embedded_text":"Ramadan is explicitly framed around Quran guidance, making daily recitation and study central to the month."},{"source":"Hadith","citation":"Sahih al-Bukhari 1901; Sahih Muslim 760","source_site":"sunnah.com","embedded_text":"Prophetic teachings connect Ramadan fasting and night prayer to purification and spiritual growth."},{"source":"Reflection & Study","citation":"Ramadan reading resources","source_site":"Yaqeen Institute / SeekersGuidance","embedded_text":"Structured learning paths and reflection guides support consistent Quran goals for different schedules."}]},"personal_plans":{"section_title":"Personal Plans (Long-Form)","intro":"Choose a plan that matches your lifestyle and sustain it for 30 days.","daily_flow_title":"Daily flow","weekly_focus_title":"Weekly focus","plans":[{"title":"Quiet Renewal Plan","who_for":"Students and solo worshippers","overview":"A slower, reflective pace focused on Quran, journaling, and community check-ins.","focus":"Spiritual depth and daily consistency.","daily_flow":["Fajr + 10 minutes reflection","Midday: 6 pages Quran","Asr: 5-minute dhikr","After Isha: Taraweeh + short dua"],"weekly_focus":["Week 1: Intention and habit building","Week 2: Deepening Quran connection","Week 3: Night worship focus","Week 4: Gratitude and giving"],"accountability":"Weekly check-in with a friend or mentor."},{"title":"Family Connection Plan","who_for":"Parents and households","overview":"Shared worship with kids, simple lessons, and family goals.","focus":"Family unity and shared learning.","daily_flow":["Suhoor: one short Quran reflection","Maghrib: gratitude circle","After Taraweeh: 15-minute story or Quran"],"weekly_focus":["Week 1: Set family goals","Week 2: Add a family charity project","Week 3: Quran memorization night","Week 4: Eid preparation + reflection"],"accountability":"Family chart tracking prayers and reading."},{"title":"Working Professional Plan","who_for":"Busy schedules","overview":"Short, consistent blocks that fit around work and commuting.","focus":"Micro-habits and consistency.","daily_flow":["Morning commute: Quran audio","Lunch break: 2 pages reading","Evening: 10-minute dhikr + dua","Weekend: longer reflection session"],"weekly_focus":["Week 1: Align calendar","Week 2: Increase charity","Week 3: Add night prayer twice","Week 4: Finish Quran goal"],"accountability":"Set reminders and a weekly target review."},{"title":"Community Service Plan","who_for":"Volunteers and organizers","overview":"Balance worship with consistent service and community care.","focus":"Service and leadership.","daily_flow":["Post-Dhuhr: 20 minutes planning","Evening: serve at iftar or food bank","Night: Taraweeh and dua"],"weekly_focus":["Week 1: Identify a need","Week 2: Build a small volunteer team","Week 3: Host a community iftar","Week 4: Wrap-up and gratitude"],"accountability":"Weekly debrief with the team."},{"title":"Beginner Step-Up Plan","who_for":"New to consistent Ramadan routines","overview":"A gentle ramp-up plan that builds confidence with short, repeatable habits.","focus":"Consistency over intensity.","daily_flow":["Fajr: 5 minutes of Quran + simple dua","Dhuhr: 2 pages of Quran","Maghrib: gratitude note + family check-in","Isha: short Taraweeh or 2 rakaat at home"],"weekly_focus":["Week 1: Set a realistic daily target","Week 2: Add a short reflection journal","Week 3: Increase Quran time by 5 minutes","Week 4: Maintain routine and prepare for Eid"],"accountability":"Track progress daily and celebrate small wins."},{"title":"Night Worship Plan","who_for":"Those focusing on the last 10 nights","overview":"Structured routine to maximize Qiyam, dua, and Quran in the evenings.","focus":"Deep night worship and focused dua.","daily_flow":["After Maghrib: light meal + rest","After Isha: Taraweeh with focus","Late night: 20 minutes Quran + dua","Before Suhoor: 2-4 rakaat Qiyam"],"weekly_focus":["Week 1: Prepare sleep schedule","Week 2: Add a dua list for family","Week 3: Increase Qiyam duration","Week 4: Focus on Laylat al-Qadr"],"accountability":"Set a nightly alarm and keep a short dua checklist."}]},"charity_guide":{"section_title":"Charity Guide (Zakat al-Fitr Made Simple)","intro":"Charity is central in Ramadan. Zakat al-Fitr is obligatory before Eid prayer, while ongoing sadaqah builds compassion.","sadaqah_title":"Sadaqah ideas","giving_checklist_title":"Giving checklist","overview":["Zakat al-Fitr purifies the fasting person from minor shortcomings and ensures everyone can celebrate Eid with dignity.","Sadaqah is voluntary charity given throughout the month. Even small, consistent giving can have a large impact."],"zakat_al_fitr":{"title":"Zakat al-Fitr basics","points":["A required charity per person in the household, given before Eid prayer.","Paid before Eid prayer, preferably during Ramadan.","Every eligible Muslim who can afford it pays for themselves and dependents.","Equivalent to a staple food amount (varies by region).","Give through a local masjid or trusted charity organization."]},"sadaqah_ideas":["Sponsor iftar meals","Support local food banks","Contribute to masjid programs","Help neighbors and community initiatives","Share educational resources","Volunteer time and skills"],"giving_checklist":["Set a realistic daily or weekly amount.","Choose 1-2 trusted organizations.","Include a family charity goal if possible.","Give before Eid for Zakat al-Fitr."],"impact_notes":["Small, consistent charity builds long-term benefit.","Prioritize local needs alongside global relief."],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:177","source_site":"quran.com","embedded_text":"Righteousness includes financial giving to relatives, vulnerable people, and those in need."},{"source":"Hadith","citation":"Sahih al-Bukhari 1902; Sahih Muslim 2308","source_site":"sunnah.com","embedded_text":"The Prophet was described as especially generous in Ramadan, encouraging expanded charity during this month."},{"source":"Fiqh Q&A","citation":"Zakat al-Fitr and sadaqah guidance","source_site":"IslamQA.info / SeekersGuidance","embedded_text":"Practical rulings explain who pays Zakat al-Fitr, timing before Eid prayer, and distribution priorities."}]},"health_food_tips":{"section_title":"Health & Food Tips","intro":"Keep energy stable and hydration steady. Aim for balance, not perfection.","primary_sections":[{"title":"Suhoor ideas","items":["Oatmeal with nuts and dates","Eggs with whole-grain toast","Greek yogurt + berries","Chia pudding with milk","Water + herbal tea"]},{"title":"Iftar ideas","items":["Dates + water + light soup","Grilled protein + salad","Lentil soup + brown rice","Baked salmon + vegetables","Fresh fruit plate"]},{"title":"Wellness focus","items":["Avoid salty foods to reduce thirst","Prioritize complex carbs for longer energy","Short walks after Iftar","Limit heavy fried meals","Ease into caffeine to avoid dehydration"]}],"secondary_sections":[{"title":"Hydration plan","items":["Drink 8-10 glasses between iftar and suhoor","2 glasses at iftar","4 glasses between iftar and sleep","2-4 glasses at suhoor"]},{"title":"Sleep & movement","items":["Take a 20-30 minute power nap if needed","Sleep soon after Taraweeh","Dim screens 30 minutes before bed","Keep a consistent bedtime if possible","Light exercise 1-2 hours after iftar","Walking for 30 minutes","Light stretching","Avoid intense workouts during fasting hours"]}],"micro_tips":["Add fruit and vegetables to every meal.","Keep a water bottle nearby at night.","Reduce sugar spikes by breaking fast slowly."]},"duas_prayers":{"section_title":"Essential Duas & Supplications","intro":"Every dua below is verified from the Qur\'an or authentic hadith so you can recite with confidence.","tag_label":"Source","search_label":"Search Quran & Prophetic duas","daily_duas":[{"occasion":"Good in this life and the next","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً","transliteration":"Rabbana atina fid-dunya hasanah","translation":"Our Lord, give us good in this world","reference":"Qur\'an 2:201","link":"https://quran.com/2/201","source":"Qur\'an","tag":"Qur\'an"},{"occasion":"Steadfast hearts","arabic":"رَبَّنَا لَا تُزِغْ قُلُوبَنَا","transliteration":"Rabbana la tuzigh qulubana","translation":"Our Lord, do not let our hearts deviate","reference":"Qur\'an 3:8","link":"https://quran.com/3/8","source":"Qur\'an","tag":"Qur\'an"},{"occasion":"Guide us to the straight path","arabic":"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","transliteration":"Ihdinas-siratal-mustaqim","translation":"Guide us to the straight path","reference":"Qur\'an 1:6","link":"https://quran.com/1/6","source":"Qur\'an","tag":"Qur\'an"},{"occasion":"Mercy from Allah","arabic":"رَبَّنَا هَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً","transliteration":"Rabbana hab lana min ladunka rahmah","translation":"Our Lord, grant us mercy from Yourself","reference":"Qur\'an 18:10","link":"https://quran.com/18/10","source":"Qur\'an","tag":"Qur\'an"},{"occasion":"Steadfast in prayer","arabic":"رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ","transliteration":"Rabbi ij\'alni muqima as-salah","translation":"My Lord, make me an establisher of prayer","reference":"Qur\'an 14:40","link":"https://quran.com/14/40","source":"Qur\'an","tag":"Qur\'an"},{"occasion":"Patience & resilience","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا","transliteration":"Rabbana afrigh \'alayna sabran","translation":"Our Lord, pour upon us patience","reference":"Qur\'an 2:250","link":"https://quran.com/2/250","source":"Qur\'an","tag":"Qur\'an"}],"view_more_label":"Explore the verified dua library","modal_title":"Dua Library","modal_sections":[{"title":"Worship & Prayer","items":[{"name":"Ease in prayer","arabic":"رَبِّ اشْرَحْ لِي صَدْرِي","transliteration":"Rabbi ishrah li sadri","translation":"My Lord, expand for me my chest","reference":"Qur\'an 20:25","resource":"https://quran.com/20/25","source":"Qur\'an"},{"name":"Increase knowledge","arabic":"رَبِّ زِدْنِي عِلْمًا","transliteration":"Rabbi zidni \'ilma","translation":"My Lord, increase me in knowledge","reference":"Qur\'an 20:114","resource":"https://quran.com/20/114","source":"Qur\'an"},{"name":"Guidance","arabic":"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","transliteration":"Ihdinas-siratal-mustaqim","translation":"Guide us to the straight path","reference":"Qur\'an 1:6","resource":"https://quran.com/1/6","source":"Qur\'an"},{"name":"Devotion","arabic":"رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ","transliteration":"Rabbana waj\'alna muslimayn","translation":"Our Lord, make us Muslims in submission to You","reference":"Qur\'an 2:128","resource":"https://quran.com/2/128","source":"Qur\'an"},{"name":"Prayer in family","arabic":"رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ","transliteration":"Rabbi ij\'alni muqima as-salah","translation":"My Lord, make me an establisher of prayer","reference":"Qur\'an 14:40","resource":"https://quran.com/14/40","source":"Qur\'an"}]},{"title":"Forgiveness & Mercy","items":[{"name":"Do not burden us","arabic":"رَبَّنَا لَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ","transliteration":"Rabbana la tuhammilna ma la taqata lana bih","translation":"Our Lord, do not burden us beyond what we can bear","reference":"Qur\'an 2:286","resource":"https://quran.com/2/286","source":"Qur\'an"},{"name":"Mercy","arabic":"رَبِّ اغْفِرْ وَارْحَمْ","transliteration":"Rabbi ighfir warham","translation":"My Lord, forgive and have mercy","reference":"Qur\'an 23:118","resource":"https://quran.com/23/118","source":"Qur\'an"},{"name":"Repentance","arabic":"رَبَّنَا ظَلَمْنَا أَنْفُسَنَا","transliteration":"Rabbana zalamna anfusana","translation":"Our Lord, we have wronged ourselves","reference":"Qur\'an 7:23","resource":"https://quran.com/7/23","source":"Qur\'an"},{"name":"Forgive our sins","arabic":"رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا","transliteration":"Rabbana ighfir lana dhunubana","translation":"Our Lord, forgive us our sins","reference":"Qur\'an 3:147","resource":"https://quran.com/3/147","source":"Qur\'an"},{"name":"Light for us","arabic":"رَبَّنَا أَتْمِمْ لَنَا نُورَنَا","transliteration":"Rabbana atmim lana nurana","translation":"Our Lord, perfect for us our light","reference":"Qur\'an 66:8","resource":"https://quran.com/66/8","source":"Qur\'an"},{"name":"Turn away punishment","arabic":"رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ","transliteration":"Rabbana isrif \'anna \'adhaba jahannam","translation":"Our Lord, turn away from us the punishment of Hell","reference":"Qur\'an 25:65","resource":"https://quran.com/25/65","source":"Qur\'an"}]},{"title":"Family & Community","items":[{"name":"Righteous family","arabic":"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا","transliteration":"Rabbana hab lana min azwajina","translation":"Our Lord, grant us from among our spouses","reference":"Qur\'an 25:74","resource":"https://quran.com/25/74","source":"Qur\'an"},{"name":"Parents and believers","arabic":"رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ","transliteration":"Rabbi ighfir li wa li walidayya","translation":"My Lord, forgive me and my parents","reference":"Qur\'an 14:41","resource":"https://quran.com/14/41","source":"Qur\'an"},{"name":"Peaceful home","arabic":"رَبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا","transliteration":"Rabbi anzilni munzalan mubaraka","translation":"My Lord, let me land at a blessed landing place","reference":"Qur\'an 23:29","resource":"https://quran.com/23/29","source":"Qur\'an"},{"name":"Clean hearts","arabic":"رَبَّنَا لَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا","transliteration":"Rabbana la taj\'al fi qulubina ghillan","translation":"Our Lord, do not place in our hearts any rancor","reference":"Qur\'an 59:10","resource":"https://quran.com/59/10","source":"Qur\'an"},{"name":"Do not leave me alone","arabic":"رَبِّ لَا تَذَرْنِي فَرْدًا","transliteration":"Rabbi la tadharni fardan","translation":"My Lord, do not leave me alone while You are the best of inheritors","reference":"Qur\'an 4:129","resource":"https://quran.com/4/129","source":"Qur\'an"}]},{"title":"Provision & Resilience","items":[{"name":"Good provision","arabic":"رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ","transliteration":"Rabbi inni lima anzalta ilayya min khayrin faqir","translation":"My Lord, I am in need of whatever good You send down to me","reference":"Qur\'an 28:24","resource":"https://quran.com/28/24","source":"Qur\'an"},{"name":"Blessed wealth","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً","transliteration":"Rabbana atina fid-dunya hasanah","translation":"Our Lord, give us good in this world","reference":"Qur\'an 2:201","resource":"https://quran.com/2/201","source":"Qur\'an"},{"name":"Accepted deeds","arabic":"رَبَّنَا تَقَبَّلْ مِنَّا","transliteration":"Rabbana taqabbal minna","translation":"Our Lord, accept from us","reference":"Qur\'an 2:127","resource":"https://quran.com/2/127","source":"Qur\'an"},{"name":"Steadfast faith","arabic":"رَبَّنَا عَلَيْكَ تَوَكَّلْنَا","transliteration":"Rabbana \'alayka tawakkalna","translation":"Our Lord, upon You we rely","reference":"Qur\'an 10:85","resource":"https://quran.com/10/85","source":"Qur\'an"},{"name":"Patience in trials","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا","transliteration":"Rabbana afrigh \'alayna sabran","translation":"Our Lord, pour upon us patience","reference":"Qur\'an 2:250","resource":"https://quran.com/2/250","source":"Qur\'an"},{"name":"Turn away punishment","arabic":"رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ","transliteration":"Rabbana isrif \'anna \'adhaba jahannam","translation":"Our Lord, turn away from us the punishment of Hell","reference":"Qur\'an 25:65","resource":"https://quran.com/25/65","source":"Qur\'an"}]},{"title":"Prophetic Supplications","items":[{"name":"Guidance & piety","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى","transliteration":"Allahumma inni as\'alukal-huda wat-tuqa wal-\'afafa wal-ghina","translation":"O Allah, I ask You for guidance, piety, chastity, and contentment","reference":"Sunan Ibn Majah 3832","resource":"https://sunnah.com/ibnmajah:3832","source":"Hadith"},{"name":"Beneficial knowledge, provision & deeds","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا","transliteration":"Allahumma inni as\'aluka ilman nafi\'an, wa rizqan tayyiban, wa amalan mutaqabbalan","translation":"O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds","reference":"Sunan Ibn Majah 925","resource":"https://sunnah.com/ibnmajah:925","source":"Hadith"},{"name":"Forgiveness & well-being","arabic":"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ","transliteration":"Allahumma inni as\'alukal-\'afwa wal-\'afiyah fid-dunya wal-akhirah","translation":"O Allah, I ask You for forgiveness and well-being in this world and the Hereafter","reference":"Sunan Ibn Majah 3871","resource":"https://sunnah.com/ibnmajah:3871","source":"Hadith"}]}]},"shorts":{"section_title":"Ramadan Short Clips","subtitle":"Quick, inspiring clips grouped by theme. Tap any card to watch.","highlights_title":"Quick highlights","highlights":[{"title":"Ramadan is coming","description":"A quick reminder to prepare your heart and schedule.","duration":"Under 1 min","tag":"Preparation","link":"https://www.youtube.com/shorts/HRHR66dGphk","thumbnail":"https://i.ytimg.com/vi/HRHR66dGphk/hqdefault.jpg"},{"title":"Which one are you this Ramadan?","description":"A short reflection on personal goals.","duration":"Under 1 min","tag":"Reflection","link":"https://www.youtube.com/shorts/ubK3uJzcS6k","thumbnail":"https://i.ytimg.com/vi/ubK3uJzcS6k/hqdefault.jpg"},{"title":"Ramadan Mubarak dua","description":"Short dua to share blessings in the month.","duration":"Under 1 min","tag":"Dua","link":"https://www.youtube.com/shorts/V3VN1lkfrjM","thumbnail":"https://i.ytimg.com/vi/V3VN1lkfrjM/hqdefault.jpg"},{"title":"Shortest fasting times","description":"A quick look at shorter fasting windows by region.","duration":"Under 1 min","tag":"Fasting","link":"https://www.youtube.com/shorts/xX74aNqVf28","thumbnail":"https://i.ytimg.com/vi/xX74aNqVf28/hqdefault.jpg"}],"groups":[{"title":"Quran & Taraweeh","items":[{"title":"Ramadan reminder","description":"Keep the Quran close and hearts soft.","duration":"Under 1 min","tag":"Quran","link":"https://www.youtube.com/shorts/nOG_AO74gFE","thumbnail":"https://i.ytimg.com/vi/nOG_AO74gFE/hqdefault.jpg"},{"title":"Quran in Ramadan","description":"Quick motivation to recite more.","duration":"Under 1 min","tag":"Quran","link":"https://www.youtube.com/watch?v=_P32u0x2v_w","thumbnail":"https://i.ytimg.com/vi/_P32u0x2v_w/hqdefault.jpg"},{"title":"Fast Taraweeh","description":"A short reminder about nightly prayers.","duration":"Under 1 min","tag":"Taraweeh","link":"https://www.youtube.com/shorts/sTyXJo_O9zI","thumbnail":"https://i.ytimg.com/vi/sTyXJo_O9zI/hqdefault.jpg"}]},{"title":"Duas & Laylat al-Qadr","items":[{"title":"Ramadan dua","description":"A brief dua to recite in the month.","duration":"Under 1 min","tag":"Dua","link":"https://www.youtube.com/shorts/yBHKEwH89Co","thumbnail":"https://i.ytimg.com/vi/yBHKEwH89Co/hqdefault.jpg"},{"title":"Authentic dua at iftar","description":"Iftar dua reminder.","duration":"Under 1 min","tag":"Iftar","link":"https://www.youtube.com/shorts/O1z666oaa0U","thumbnail":"https://i.ytimg.com/vi/O1z666oaa0U/hqdefault.jpg"},{"title":"Laylat al-Qadr dua","description":"What to say on the Night of Power.","duration":"Under 1 min","tag":"Laylat al-Qadr","link":"https://www.youtube.com/shorts/lmnZZVZKuIY","thumbnail":"https://i.ytimg.com/vi/lmnZZVZKuIY/hqdefault.jpg"}]},{"title":"Suhoor & Charity","items":[{"title":"Eating suhoor in Ramadan","description":"A lighthearted look at suhoor routines.","duration":"Under 1 min","tag":"Suhoor","link":"https://www.youtube.com/shorts/2kyjR_uMnRw","thumbnail":"https://i.ytimg.com/vi/2kyjR_uMnRw/hqdefault.jpg"},{"title":"DIY Sadaqah box","description":"A creative charity idea for families.","duration":"Under 1 min","tag":"Charity","link":"https://www.youtube.com/shorts/Ycfzl4NjkmI","thumbnail":"https://i.ytimg.com/vi/Ycfzl4NjkmI/hqdefault.jpg"}]}]},"platform_resources":{"section_title":"Apps & Learning Resources","subtitle":"Choose the platform that suits your learning style.","intro":["Listed resources were checked against their official domains and app stores on February 4, 2026, so the URLs remain reachable.","We focus on app publishers and learning platforms backed by trusted teams, scholar-led research centers, or high-usage communities so you can prepare for Ramadan with confidence."],"cards":[{"title":"Verified Mobile Apps","description":"","items":[{"name":"Muslim Pro","label":"Muslim Pro","link":"https://www.muslimpro.com/","note":"Prayer times, Quran, and Ramadan reminders in one place with large global usage.","logo":"https://www.muslimpro.com/favicon.ico"},{"name":"Quran.com Mobile","label":"Quran.com Mobile","link":"https://quran.com/en/apps","note":"Ad-free Quran Foundation app with translations, recitations, tafsir access, and daily goals.","logo":"https://quran.com/favicon.ico"},{"name":"IslamicFinder Athan","label":"IslamicFinder Athan","link":"https://www.islamicfinder.org/prayer-times/","note":"Global prayer times with mosque directory, qibla support, and Hijri calendar features.","logo":"https://www.islamicfinder.org/favicon.ico"},{"name":"Quran Companion","label":"Quran Companion","link":"https://apps.apple.com/us/app/quran-companion-memorize-quran/id1111843462","note":"Memorization-focused experience with streaks, motivation tools, and guided review routines.","logo":"https://qurancompanion.com/favicon.ico"}]},{"title":"Interactive Learning Platforms","description":"","items":[{"name":"Bayyinah TV","label":"Bayyinah TV","link":"https://bayyinah.tv/","note":"Long-form Quran and Arabic video learning with family pathways and structured episodes.","logo":"https://bayyinah.tv/favicon.ico"},{"name":"Yaqeen Institute Ramadan","label":"Yaqeen Institute Ramadan","link":"https://yaqeeninstitute.org/ramadan","note":"Research-backed Ramadan reflections, videos, and journals with downloadable resources.","logo":"https://yaqeeninstitute.org/favicon.ico"},{"name":"SeekersGuidance","label":"SeekersGuidance","link":"https://seekersguidance.org/","note":"Non-profit seminary with structured courses, Q&A resources, and guided learning tracks.","logo":"https://seekersguidance.org/favicon.ico"},{"name":"Quran Academy","label":"Quran Academy","link":"https://quranacademy.io/","note":"Quranic Arabic learning pathways with challenges, memorization support, and coach-led sessions.","logo":"https://quranacademy.io/favicon.ico"}]},{"title":"Audio & Qur’an Study Tools","description":"","items":[{"name":"QuranicAudio","label":"QuranicAudio","link":"https://quranicaudio.com/","note":"Large reciter library with downloadable MP3 and flexible streaming playback.","logo":"https://quranicaudio.com/favicon.ico"},{"name":"Mushafi Quran","label":"Mushafi Quran","link":"https://mushafiquran.com/","note":"Word-by-word meaning, offline packs, and tajwid-friendly recitation tools.","logo":"https://mushafiquran.com/favicon.ico"},{"name":"HifzPath","label":"HifzPath","link":"https://hifzpath.pages.dev/","note":"Memorization tracking with streak tools, quick quizzes, and revision support.","logo":"https://hifzpath.pages.dev/favicon.ico"},{"name":"Quran IQ","label":"Quran IQ","link":"https://quraniq.com/","note":"Arabic vocabulary and grammar drills for understanding Quranic language with guided lessons.","logo":"https://quraniq.com/favicon.ico"}]}]},"faq":{"section_title":"Frequently Asked Questions","subtitle":"Mainstream Sunni guidance commonly shared in North American masajid.","items":[{"question":"When does Ramadan 2026 start?","answer":"Most North American calendars project the first fast on February 17, 2026, with the first Taraweeh night on February 16, 2026. Local moon sighting can shift this by a day, so confirm with your local masjid."},{"question":"What time does the daily fast begin and end?","answer":"Fasting is from true dawn (Fajr) until sunset (Maghrib). Follow your local prayer timetable for your exact city times."},{"question":"Who is exempt from fasting?","answer":"Children before puberty, the ill, travelers, pregnant or nursing women, and those menstruating are exempt. Missed fasts are made up later when possible; ask a local scholar about fidya or kaffarah in your situation."},{"question":"What breaks the fast?","answer":"Eating or drinking, sexual relations, intentional vomiting, and menstrual or postpartum bleeding break the fast. If you eat or drink out of forgetfulness, the fast remains valid according to most Sunni opinions."},{"question":"How can I make the most of the last 10 nights?","answer":"Prioritize night prayer, Quran, dua, and charity, and focus on the odd nights (21, 23, 25, 27, 29) for Laylat al-Qadr. Many people adjust sleep schedules or take time off to focus on worship."}]},"tools_calculators":{"section_title":"Ramadan Starter Kit","subtitle":"Direct access to Islamic Connect tools.","intro":["Use this hub to reach zakat calculators, dua collections, surah resources, podcasts, the seerah timeline, and prayer calendars without guessing where to go next.","Each card opens the tool in a new tab so you can drop into the experience you need while you keep reading the Ramadan guide."],"tools":[{"title":"Zakat Calculator","description":"Estimate your zakat obligations with step-by-step guidance ahead of Ramadan.","detail":"Answer a few questions about savings, investments, and liabilities to see what you owe before Eid.","link":"/zakat","icon":"fa-calculator"},{"title":"Surat Explorer","description":"Browse suwar summaries, audio, and study notes for focused reading.","detail":"Compare tafsir notes, choose reciters, and plan quran sessions so every surah has context.","link":"/surat","icon":"fa-book-open"},{"title":"Prayer Times Calendar","description":"Track global prayer schedules with a comprehensive calendar view.","detail":"Sync sunrise, sunset, and city-specific reminders so you never miss a dawah moment.","link":"/prayer","icon":"fa-globe"}]}}');

/***/ }),

/***/ "./resources/js/components/Ramadan2026Component.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/Ramadan2026Component.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ramadan2026Component.vue?vue&type=script&lang=js */ "./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/Ramadan2026Component.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Ramadan2026Component_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Ramadan2026Component.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Ramadan2026Component.vue?vue&type=script&lang=js");
 

/***/ })

}]);