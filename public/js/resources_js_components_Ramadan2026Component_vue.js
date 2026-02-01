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
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Ramadan2026Component",
  data() {
    return {
      ramadan: _data_ramadan_2026_json__WEBPACK_IMPORTED_MODULE_0__,
      heroImageOverride: null,
      heroImageFallback: "/images/banner-photo-800.webp",
      calendarStartOverride: "",
      calendarLength: 30,
      selectedDayIndex: 0,
      showFab: false,
      fabVisibilityHandler: null,
      reminderDraft: {
        title: "",
        dayNumber: 1,
        timeOfDay: "maghrib",
        note: ""
      },
      reminders: [],
      reflectionDraft: {
        name: "",
        mood: "Grateful",
        text: ""
      },
      reflections: [],
      quranUnits: [{
        value: "pages",
        label: "Pages (614)"
      }, {
        value: "juz",
        label: "Juz (30)"
      }, {
        value: "surahs",
        label: "Surahs (114)"
      }],
      quranProgress: {
        unit: "pages",
        total: 614,
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
      emojiPalettes: {
        timeline: ["🕌", "📜", "🌙", "🤲", "🕰️", "✨"],
        fasting: ["🥣", "🧂", "🚰", "🌤️", "🧘", "✨"],
        quran: ["📖", "🧭", "🗂️", "✨"],
        personal: ["🎯", "👥", "🏡", "🌿", "🧠", "✨"],
        health: ["🥗", "💧", "💤", "🏃", "🍋", "✨"],
        tools: ["🧮", "📍", "🕌", "🧭", "🗺️", "✨"],
        platforms: ["🌐", "🎓", "📺", "📚", "📍", "✨"]
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
      reflectionMoods: ["Grateful", "Hopeful", "Focused", "Peaceful", "Motivated"]
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
  },
  computed: {
    heroImage() {
      return this.heroImageOverride || this.ramadan.header.banner_image || this.heroImageFallback;
    },
    navLinks() {
      const extra = [{
        label: "Interactive tools",
        href: "#interactive"
      }, {
        label: "Planner",
        href: "#planner"
      }];
      return [...extra, ...this.ramadan.nav_links];
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
    selectedDay() {
      return this.calendarDays[this.selectedDayIndex] || null;
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
      if (this.quranProgressRemaining <= 0) return "Completed 🎉";
      if (!this.quranProgress.dailyGoal) return "Set a daily goal";
      return this.quranEstimatedCompletionDate ? this.formatISODate(this.quranEstimatedCompletionDate) : "Set a daily goal";
    }
  },
  methods: {
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
    breakdownStatusLabel(status) {
      if (status === "done") return "Completed ✅";
      if (status === "partial") return "In progress ⏳";
      return "Not completed";
    },
    breakdownStatusClass(status) {
      if (status === "done") return "r-badge--good";
      if (status === "partial") return "r-badge--warn";
      return "";
    },
    async initializeAuthentication() {
      const id = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_1__.fetchUserIdFromApi)();
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
    getEmoji(palette, index) {
      var _this$emojiPalettes;
      const list = ((_this$emojiPalettes = this.emojiPalettes) === null || _this$emojiPalettes === void 0 ? void 0 : _this$emojiPalettes[palette]) || [];
      if (!list.length) return "✨";
      return list[index % list.length];
    },
    dateEmoji(type) {
      const map = {
        start: "🌙",
        special: "✨",
        eid: "🎉"
      };
      return map[type] || "🗓️";
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
      var _this$ramadan$importa2;
      const dates = ((_this$ramadan$importa2 = this.ramadan.important_dates) === null || _this$ramadan$importa2 === void 0 ? void 0 : _this$ramadan$importa2.dates) || [];
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
          total: 614,
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
  class: "container"
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
const _hoisted_7 = {
  class: "r-hero__title r-animate",
  style: {
    "--delay": "0.12s"
  }
};
const _hoisted_8 = {
  class: "r-hero__subtitle r-animate",
  style: {
    "--delay": "0.18s"
  }
};
const _hoisted_9 = {
  class: "r-hero__lead r-animate",
  style: {
    "--delay": "0.24s"
  }
};
const _hoisted_10 = {
  class: "r-hero__stats r-animate",
  style: {
    "--delay": "0.3s"
  }
};
const _hoisted_11 = {
  class: "r-hero__card"
};
const _hoisted_12 = {
  class: "r-hero__label"
};
const _hoisted_13 = {
  class: "r-hero__card"
};
const _hoisted_14 = {
  class: "r-hero__label"
};
const _hoisted_15 = {
  class: "r-hero__sources"
};
const _hoisted_16 = ["href"];
const _hoisted_17 = {
  class: "r-hero__nav r-animate",
  style: {
    "--delay": "0.36s"
  }
};
const _hoisted_18 = ["href"];
const _hoisted_19 = {
  class: "r-hero__media r-animate",
  style: {
    "--delay": "0.22s"
  }
};
const _hoisted_20 = {
  class: "r-hero__frame"
};
const _hoisted_21 = ["src", "alt"];
const _hoisted_22 = {
  class: "r-hero__note"
};
const _hoisted_23 = {
  id: "overview",
  class: "r-section"
};
const _hoisted_24 = {
  class: "container"
};
const _hoisted_25 = {
  class: "r-section__head r-overview__head"
};
const _hoisted_26 = {
  class: "r-section__title"
};
const _hoisted_27 = {
  class: "r-overview__lead"
};
const _hoisted_28 = {
  id: "section-overview-body",
  class: "r-section__body"
};
const _hoisted_29 = {
  class: "r-section__subtitle"
};
const _hoisted_30 = {
  class: "r-overview__list"
};
const _hoisted_31 = {
  key: 0,
  class: "r-references"
};
const _hoisted_32 = ["href"];
const _hoisted_33 = ["href"];
const _hoisted_34 = {
  id: "history",
  class: "r-section r-section--alt"
};
const _hoisted_35 = {
  class: "container"
};
const _hoisted_36 = {
  class: "r-section__head"
};
const _hoisted_37 = {
  class: "r-section__title"
};
const _hoisted_38 = {
  class: "r-section__subtitle"
};
const _hoisted_39 = {
  id: "section-history-body",
  class: "r-section__body"
};
const _hoisted_40 = {
  class: "r-grid r-grid--double r-grid--timeline"
};
const _hoisted_41 = {
  class: "r-card__emoji",
  "aria-hidden": "true"
};
const _hoisted_42 = {
  class: "r-card__title"
};
const _hoisted_43 = {
  class: "r-card__desc"
};
const _hoisted_44 = {
  key: 0,
  class: "r-grid r-grid--double r-spacing-top"
};
const _hoisted_45 = {
  key: 0,
  class: "r-card"
};
const _hoisted_46 = {
  class: "r-card__title"
};
const _hoisted_47 = {
  class: "r-list"
};
const _hoisted_48 = {
  key: 1,
  class: "r-card"
};
const _hoisted_49 = {
  class: "r-card__title"
};
const _hoisted_50 = {
  class: "r-list"
};
const _hoisted_51 = {
  key: 1,
  class: "r-references"
};
const _hoisted_52 = ["href"];
const _hoisted_53 = ["href"];
const _hoisted_54 = {
  id: "interactive",
  class: "r-section"
};
const _hoisted_55 = {
  class: "container"
};
const _hoisted_56 = {
  id: "section-interactive-body",
  class: "r-section__body"
};
const _hoisted_57 = {
  key: 0,
  class: "r-empty"
};
const _hoisted_58 = {
  key: 1,
  class: "r-auth-gate"
};
const _hoisted_59 = {
  key: 2,
  class: "r-grid r-grid--double r-grid--stagger"
};
const _hoisted_60 = {
  class: "r-card r-card--interactive r-animate",
  style: {
    "--delay": "0.05s"
  }
};
const _hoisted_61 = {
  class: "r-interactive-stack"
};
const _hoisted_62 = {
  class: "r-stack-head"
};
const _hoisted_63 = {
  class: "r-badge"
};
const _hoisted_64 = {
  class: "r-progress"
};
const _hoisted_65 = ["aria-valuenow"];
const _hoisted_66 = {
  class: "r-progress__meta"
};
const _hoisted_67 = {
  class: "r-form r-form--compact"
};
const _hoisted_68 = {
  class: "r-form__row"
};
const _hoisted_69 = ["value"];
const _hoisted_70 = ["max"];
const _hoisted_71 = {
  class: "r-form__row"
};
const _hoisted_72 = {
  class: "r-quick-add"
};
const _hoisted_73 = {
  class: "r-quick-add__buttons"
};
const _hoisted_74 = {
  class: "r-progress__footer"
};
const _hoisted_75 = {
  key: 0
};
const _hoisted_76 = {
  key: 1
};
const _hoisted_77 = {
  key: 2
};
const _hoisted_78 = {
  class: "r-progress-insights"
};
const _hoisted_79 = {
  class: "r-card r-card--interactive r-animate",
  style: {
    "--delay": "0.12s"
  }
};
const _hoisted_80 = {
  class: "r-interactive-stack"
};
const _hoisted_81 = {
  class: "r-stack-head"
};
const _hoisted_82 = {
  class: "r-badge"
};
const _hoisted_83 = {
  class: "r-today-panel"
};
const _hoisted_84 = {
  class: "r-today-meta"
};
const _hoisted_85 = {
  key: 0,
  class: "r-badge r-badge--good"
};
const _hoisted_86 = {
  key: 0,
  class: "r-confirm"
};
const _hoisted_87 = {
  class: "r-today-actions"
};
const _hoisted_88 = ["disabled"];
const _hoisted_89 = {
  class: "r-breakdown"
};
const _hoisted_90 = {
  class: "r-breakdown__day"
};
const _hoisted_91 = {
  class: "r-breakdown__date"
};
const _hoisted_92 = {
  class: "r-breakdown__meta"
};
const _hoisted_93 = {
  id: "key-dates",
  class: "r-section"
};
const _hoisted_94 = {
  class: "container"
};
const _hoisted_95 = {
  class: "r-section__head"
};
const _hoisted_96 = {
  class: "r-section__title"
};
const _hoisted_97 = {
  class: "r-section__subtitle"
};
const _hoisted_98 = {
  id: "section-key-dates-body",
  class: "r-section__body"
};
const _hoisted_99 = {
  class: "r-grid r-grid--dates"
};
const _hoisted_100 = {
  class: "r-card__emoji r-card__emoji--tag",
  "aria-hidden": "true"
};
const _hoisted_101 = {
  class: "r-card__title"
};
const _hoisted_102 = {
  class: "r-card__meta"
};
const _hoisted_103 = {
  class: "r-card__desc"
};
const _hoisted_104 = {
  id: "planner",
  class: "r-section"
};
const _hoisted_105 = {
  class: "container"
};
const _hoisted_106 = {
  id: "section-planner-body",
  class: "r-section__body"
};
const _hoisted_107 = {
  class: "row justify-content-center r-planner-row"
};
const _hoisted_108 = {
  class: "col-12 col-md-10"
};
const _hoisted_109 = {
  class: "r-card r-planner-card r-card--planner"
};
const _hoisted_110 = {
  class: "r-planner-head"
};
const _hoisted_111 = {
  class: "r-planner-controls"
};
const _hoisted_112 = ["value"];
const _hoisted_113 = {
  class: "r-calendar"
};
const _hoisted_114 = ["onClick"];
const _hoisted_115 = {
  class: "r-calendar__day"
};
const _hoisted_116 = {
  class: "r-calendar__date"
};
const _hoisted_117 = {
  key: 0,
  class: "r-calendar__event"
};
const _hoisted_118 = {
  class: "row r-planner-row"
};
const _hoisted_119 = {
  class: "col-12 col-md-6"
};
const _hoisted_120 = {
  class: "r-card r-card--soft"
};
const _hoisted_121 = {
  class: "r-stack-head"
};
const _hoisted_122 = {
  class: "r-badge"
};
const _hoisted_123 = {
  key: 0,
  class: "r-empty"
};
const _hoisted_124 = {
  key: 1,
  class: "r-auth-gate"
};
const _hoisted_125 = {
  key: 2
};
const _hoisted_126 = {
  class: "r-form__row"
};
const _hoisted_127 = ["value"];
const _hoisted_128 = {
  class: "r-form__row"
};
const _hoisted_129 = ["value"];
const _hoisted_130 = {
  key: 0,
  class: "r-reminder-list"
};
const _hoisted_131 = {
  class: "r-checkbox"
};
const _hoisted_132 = ["onUpdate:modelValue"];
const _hoisted_133 = {
  class: "r-reminder__body"
};
const _hoisted_134 = {
  key: 0
};
const _hoisted_135 = ["onClick"];
const _hoisted_136 = {
  key: 1,
  class: "r-empty"
};
const _hoisted_137 = {
  class: "col-12 col-md-6"
};
const _hoisted_138 = {
  class: "r-card r-card--soft"
};
const _hoisted_139 = {
  class: "r-stack-head"
};
const _hoisted_140 = {
  class: "r-badge"
};
const _hoisted_141 = {
  key: 0,
  class: "r-empty"
};
const _hoisted_142 = {
  key: 1,
  class: "r-auth-gate"
};
const _hoisted_143 = {
  key: 2
};
const _hoisted_144 = {
  class: "r-form__row"
};
const _hoisted_145 = ["value"];
const _hoisted_146 = {
  key: 0,
  class: "r-reflection-list"
};
const _hoisted_147 = {
  class: "r-reflection__meta"
};
const _hoisted_148 = {
  class: "r-reflection__name"
};
const _hoisted_149 = {
  class: "r-reflection__mood"
};
const _hoisted_150 = {
  class: "r-reflection__time"
};
const _hoisted_151 = {
  key: 1,
  class: "r-empty"
};
const _hoisted_152 = {
  id: "how-to-fast",
  class: "r-section r-section--alt"
};
const _hoisted_153 = {
  class: "container"
};
const _hoisted_154 = {
  class: "r-section__head"
};
const _hoisted_155 = {
  class: "r-section__title"
};
const _hoisted_156 = {
  class: "r-section__subtitle"
};
const _hoisted_157 = {
  id: "section-how-to-fast-body",
  class: "r-section__body"
};
const _hoisted_158 = {
  class: "r-grid r-grid--triple r-grid--stagger"
};
const _hoisted_159 = {
  class: "r-card__emoji",
  "aria-hidden": "true"
};
const _hoisted_160 = {
  class: "r-card__title"
};
const _hoisted_161 = {
  class: "r-list"
};
const _hoisted_162 = {
  key: 0,
  class: "r-references"
};
const _hoisted_163 = ["href"];
const _hoisted_164 = ["href"];
const _hoisted_165 = {
  id: "faq",
  class: "r-section r-section--alt"
};
const _hoisted_166 = {
  class: "container"
};
const _hoisted_167 = {
  class: "r-section__head"
};
const _hoisted_168 = {
  class: "r-section__title"
};
const _hoisted_169 = {
  class: "r-section__subtitle"
};
const _hoisted_170 = {
  id: "section-faq-body",
  class: "r-section__body"
};
const _hoisted_171 = {
  class: "r-grid r-grid--double r-faq-grid"
};
const _hoisted_172 = {
  class: "r-card__title r-faq-question"
};
const _hoisted_173 = {
  class: "r-card__desc r-faq-answer"
};
const _hoisted_174 = {
  id: "quran-plans",
  class: "r-section r-section--alt"
};
const _hoisted_175 = {
  class: "container"
};
const _hoisted_176 = {
  class: "r-section__head"
};
const _hoisted_177 = {
  class: "r-section__title"
};
const _hoisted_178 = {
  class: "r-section__subtitle"
};
const _hoisted_179 = {
  class: "r-section__controls"
};
const _hoisted_180 = {
  id: "section-quran-plans-body",
  class: "r-section__body"
};
const _hoisted_181 = {
  class: "r-grid r-grid--triple r-grid--stagger"
};
const _hoisted_182 = {
  class: "r-card__head"
};
const _hoisted_183 = {
  class: "r-card__emoji",
  "aria-hidden": "true"
};
const _hoisted_184 = {
  class: "r-card__head-text"
};
const _hoisted_185 = {
  class: "r-card__title"
};
const _hoisted_186 = {
  class: "r-card__desc"
};
const _hoisted_187 = ["aria-expanded", "aria-controls", "onClick"];
const _hoisted_188 = ["id"];
const _hoisted_189 = {
  class: "r-list"
};
const _hoisted_190 = {
  class: "r-list r-spacing-top"
};
const _hoisted_191 = {
  key: 0,
  class: "r-references"
};
const _hoisted_192 = ["href"];
const _hoisted_193 = ["href"];
const _hoisted_194 = {
  id: "personal-plans",
  class: "r-section"
};
const _hoisted_195 = {
  class: "container"
};
const _hoisted_196 = {
  class: "r-section__head"
};
const _hoisted_197 = {
  class: "r-section__title"
};
const _hoisted_198 = {
  class: "r-section__subtitle"
};
const _hoisted_199 = {
  class: "r-section__controls"
};
const _hoisted_200 = {
  id: "section-personal-plans-body",
  class: "r-section__body"
};
const _hoisted_201 = {
  class: "r-grid r-grid--double r-grid--stagger"
};
const _hoisted_202 = {
  class: "r-card__head"
};
const _hoisted_203 = {
  class: "r-card__emoji",
  "aria-hidden": "true"
};
const _hoisted_204 = {
  class: "r-card__head-text"
};
const _hoisted_205 = {
  class: "r-card__title"
};
const _hoisted_206 = ["aria-expanded", "aria-controls", "onClick"];
const _hoisted_207 = {
  class: "r-card__desc"
};
const _hoisted_208 = {
  class: "r-card__desc"
};
const _hoisted_209 = ["id"];
const _hoisted_210 = {
  class: "r-card__desc"
};
const _hoisted_211 = {
  class: "r-list-block"
};
const _hoisted_212 = {
  class: "r-list-block"
};
const _hoisted_213 = {
  class: "r-card__desc"
};
const _hoisted_214 = {
  id: "charity",
  class: "r-section r-section--alt"
};
const _hoisted_215 = {
  class: "container"
};
const _hoisted_216 = {
  class: "r-section__head"
};
const _hoisted_217 = {
  class: "r-section__title"
};
const _hoisted_218 = {
  class: "r-section__subtitle"
};
const _hoisted_219 = {
  id: "section-charity-body",
  class: "r-section__body"
};
const _hoisted_220 = {
  class: "r-grid r-grid--double"
};
const _hoisted_221 = {
  class: "r-card r-card--charity"
};
const _hoisted_222 = {
  class: "r-charity-body"
};
const _hoisted_223 = {
  class: "r-card__title"
};
const _hoisted_224 = {
  class: "r-list"
};
const _hoisted_225 = {
  class: "r-card r-card--charity r-card--charity-alt"
};
const _hoisted_226 = {
  class: "r-card__title"
};
const _hoisted_227 = {
  class: "r-list"
};
const _hoisted_228 = {
  class: "r-card__title r-card__title--small"
};
const _hoisted_229 = {
  class: "r-list"
};
const _hoisted_230 = {
  key: 0,
  class: "r-references"
};
const _hoisted_231 = ["href"];
const _hoisted_232 = ["href"];
const _hoisted_233 = {
  id: "health",
  class: "r-section"
};
const _hoisted_234 = {
  class: "container"
};
const _hoisted_235 = {
  class: "r-section__head"
};
const _hoisted_236 = {
  class: "r-section__title"
};
const _hoisted_237 = {
  class: "r-section__subtitle"
};
const _hoisted_238 = {
  id: "section-health-body",
  class: "r-section__body"
};
const _hoisted_239 = {
  class: "r-grid r-grid--triple r-grid--stagger"
};
const _hoisted_240 = {
  class: "r-card__emoji",
  "aria-hidden": "true"
};
const _hoisted_241 = {
  class: "r-card__title"
};
const _hoisted_242 = {
  class: "r-list"
};
const _hoisted_243 = {
  class: "r-grid r-grid--double r-spacing-top"
};
const _hoisted_244 = {
  class: "r-card__emoji",
  "aria-hidden": "true"
};
const _hoisted_245 = {
  class: "r-card__title"
};
const _hoisted_246 = {
  class: "r-list"
};
const _hoisted_247 = {
  class: "r-micro-tips"
};
const _hoisted_248 = {
  id: "duas",
  class: "r-section r-section--alt"
};
const _hoisted_249 = {
  class: "container"
};
const _hoisted_250 = {
  class: "r-section__head"
};
const _hoisted_251 = {
  class: "r-section__title"
};
const _hoisted_252 = {
  class: "r-section__subtitle"
};
const _hoisted_253 = {
  id: "section-duas-body",
  class: "r-section__body"
};
const _hoisted_254 = {
  class: "r-story-grid"
};
const _hoisted_255 = {
  class: "r-story-content"
};
const _hoisted_256 = {
  class: "r-story-tag"
};
const _hoisted_257 = {
  class: "r-story-title"
};
const _hoisted_258 = {
  class: "r-arabic",
  dir: "rtl"
};
const _hoisted_259 = {
  class: "r-translit"
};
const _hoisted_260 = {
  class: "r-story-desc"
};
const _hoisted_261 = ["href"];
const _hoisted_262 = {
  class: "r-link r-link--button",
  type: "button",
  "data-bs-toggle": "modal",
  "data-bs-target": "#moreDuasModal"
};
const _hoisted_263 = {
  id: "shorts",
  class: "r-section"
};
const _hoisted_264 = {
  class: "container"
};
const _hoisted_265 = {
  class: "r-section__head"
};
const _hoisted_266 = {
  class: "r-section__title"
};
const _hoisted_267 = {
  class: "r-section__subtitle"
};
const _hoisted_268 = {
  id: "section-shorts-body",
  class: "r-section__body"
};
const _hoisted_269 = {
  class: "r-short-block"
};
const _hoisted_270 = {
  class: "r-section__subtitle"
};
const _hoisted_271 = {
  class: "r-story-grid"
};
const _hoisted_272 = {
  class: "r-story-content"
};
const _hoisted_273 = {
  class: "r-story-tag"
};
const _hoisted_274 = {
  class: "r-story-title"
};
const _hoisted_275 = {
  class: "r-story-desc"
};
const _hoisted_276 = {
  class: "r-story-duration"
};
const _hoisted_277 = ["href"];
const _hoisted_278 = {
  class: "r-short-block"
};
const _hoisted_279 = {
  class: "r-section__subtitle"
};
const _hoisted_280 = {
  class: "r-short-groups"
};
const _hoisted_281 = {
  class: "r-short-group__title"
};
const _hoisted_282 = {
  class: "r-story-grid"
};
const _hoisted_283 = {
  class: "r-story-content"
};
const _hoisted_284 = {
  class: "r-story-tag"
};
const _hoisted_285 = {
  class: "r-story-title"
};
const _hoisted_286 = {
  class: "r-story-desc"
};
const _hoisted_287 = {
  class: "r-story-duration"
};
const _hoisted_288 = ["href"];
const _hoisted_289 = {
  id: "tools",
  class: "r-section r-section--alt"
};
const _hoisted_290 = {
  class: "container"
};
const _hoisted_291 = {
  class: "r-section__head"
};
const _hoisted_292 = {
  class: "r-section__title"
};
const _hoisted_293 = {
  class: "r-section__subtitle"
};
const _hoisted_294 = {
  id: "section-tools-body",
  class: "r-section__body"
};
const _hoisted_295 = {
  class: "r-grid r-grid--triple r-grid--stagger"
};
const _hoisted_296 = ["href", "aria-label", "title"];
const _hoisted_297 = {
  class: "r-card__emoji r-card__emoji--inline",
  "aria-hidden": "true"
};
const _hoisted_298 = {
  class: "r-card__title"
};
const _hoisted_299 = {
  class: "r-card__desc"
};
const _hoisted_300 = ["href"];
const _hoisted_301 = {
  id: "platforms",
  class: "r-section"
};
const _hoisted_302 = {
  class: "container"
};
const _hoisted_303 = {
  class: "r-section__head"
};
const _hoisted_304 = {
  class: "r-section__title"
};
const _hoisted_305 = {
  class: "r-section__subtitle"
};
const _hoisted_306 = {
  id: "section-platforms-body",
  class: "r-section__body"
};
const _hoisted_307 = {
  class: "r-grid r-grid--triple r-grid--stagger"
};
const _hoisted_308 = {
  class: "r-card__emoji",
  "aria-hidden": "true"
};
const _hoisted_309 = {
  class: "r-card__title"
};
const _hoisted_310 = {
  class: "r-list"
};
const _hoisted_311 = ["href"];
const _hoisted_312 = {
  class: "modal fade",
  id: "moreDuasModal",
  tabindex: "-1",
  "aria-labelledby": "moreDuasModalLabel",
  "aria-hidden": "true"
};
const _hoisted_313 = {
  class: "modal-dialog modal-xl modal-dialog-centered"
};
const _hoisted_314 = {
  class: "modal-content"
};
const _hoisted_315 = {
  class: "modal-header"
};
const _hoisted_316 = {
  class: "modal-title",
  id: "moreDuasModalLabel"
};
const _hoisted_317 = {
  class: "modal-body"
};
const _hoisted_318 = {
  class: "r-modal-grid"
};
const _hoisted_319 = {
  class: "r-story-grid r-story-grid--modal"
};
const _hoisted_320 = {
  class: "r-story-content"
};
const _hoisted_321 = {
  class: "r-story-tag"
};
const _hoisted_322 = {
  class: "r-story-title"
};
const _hoisted_323 = {
  class: "r-arabic",
  dir: "rtl"
};
const _hoisted_324 = {
  class: "r-translit"
};
const _hoisted_325 = {
  class: "r-story-desc"
};
const _hoisted_326 = {
  class: "r-story-meta"
};
const _hoisted_327 = ["href"];
const _hoisted_328 = ["href"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_2, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-hero__backdrop"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.page_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.header.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.header.subtitle), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.meta_description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.header.stats.last_updated_label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatISODate($data.ramadan.last_updated)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.header.stats.data_sources_label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.data_sources, source => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: source.label,
      class: "r-hero__source",
      href: source.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(source.label), 9 /* TEXT, PROPS */, _hoisted_16);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.navLinks, link => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: link.href,
      class: "r-hero__pill",
      href: link.href
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(link.label), 9 /* TEXT, PROPS */, _hoisted_18);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [$options.heroImage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("img", {
    key: 0,
    src: $options.heroImage,
    alt: $data.ramadan.header.alt_text,
    class: "r-hero__image",
    loading: "lazy",
    onError: _cache[0] || (_cache[0] = (...args) => $options.handleHeroImageError && $options.handleHeroImageError(...args))
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_21)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-hero__glow"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.important_dates.note), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_26, [_cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🌙", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.body, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-overview__body"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.overview.key_points_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_30, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.key_points, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.overview.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.overview.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_32), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_33)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_37, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "📜", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.body, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-section__subtitle"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.timeline, (item, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.period,
      class: "r-card r-card--timeline"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getEmoji("timeline", index)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.period), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.detail), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.history.notable_figures || $data.ramadan.history.regional_practices ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [$data.ramadan.history.notable_figures ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_46, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.notable_figures.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_47, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.notable_figures.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.note), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.ramadan.history.regional_practices ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.history.regional_practices.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_50, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.regional_practices.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item.region
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.region) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.detail), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.ramadan.history.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.history.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_52), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_53)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-section__head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "r-section__title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🧩"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Quran progress studio ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-section__subtitle"
  }, " Track your reading with simple goals and a planner-tied daily breakdown. Estimates are calculated from your inputs. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [!$data.authResolved ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_57, "Checking login status...")) : !$data.isAuthenticated ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_58, [...(_cache[35] || (_cache[35] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-card__desc"
  }, " Log in to personalize your Quran tracker. May Allah bless your journey and help you stay consistent. ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-auth-actions"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "r-button r-button--ghost",
    href: "/login"
  }, "Log in")], -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "r-card__title"
  }, "Quran reading progress 📖", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranProgressPercent) + "% complete", 1 /* TEXT */)]), _cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-card__desc"
  }, " Choose a unit, set a pace, and track your progress day by day. ", -1 /* CACHED */)), _cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-helper"
  }, "Estimates use your daily goal and planner dates. Adjust totals to match your mushaf.", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
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
  }, null, 4 /* STYLE */)], 8 /* PROPS */, _hoisted_65), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.quranProgress.completed) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.quranProgress.total) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranProgressRemaining) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel) + " remaining", 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_67, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "r-label",
    for: "quran-unit"
  }, "Unit", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "quran-unit",
    class: "r-select",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.quranProgress.unit = $event),
    onChange: _cache[2] || (_cache[2] = (...args) => $options.handleQuranUnitChange && $options.handleQuranUnitChange(...args))
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.quranUnits, unit => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: unit.value,
      value: unit.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(unit.label), 9 /* TEXT, PROPS */, _hoisted_69);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.quranProgress.unit]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "r-label",
    for: "quran-total"
  }, "Total", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "quran-total",
    class: "r-input",
    type: "number",
    min: "1",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.quranProgress.total = $event),
    onInput: _cache[4] || (_cache[4] = (...args) => $options.normalizeQuranProgress && $options.normalizeQuranProgress(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.quranProgress.total, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "r-label",
    for: "quran-completed"
  }, "Completed", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "quran-completed",
    class: "r-input",
    type: "number",
    min: "0",
    max: $data.quranProgress.total,
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.quranProgress.completed = $event),
    onInput: _cache[6] || (_cache[6] = (...args) => $options.normalizeQuranProgress && $options.normalizeQuranProgress(...args))
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_70), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.quranProgress.completed, void 0, {
    number: true
  }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_71, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "r-label",
    for: "quran-goal"
  }, "Daily goal", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "quran-goal",
    class: "r-input",
    type: "number",
    min: "0",
    step: "1",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.quranProgress.dailyGoal = $event),
    onInput: _cache[8] || (_cache[8] = (...args) => $options.normalizeQuranProgress && $options.normalizeQuranProgress(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.quranProgress.dailyGoal, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_72, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-label"
  }, "Quick add", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--ghost r-button--sm",
    type: "button",
    onClick: _cache[9] || (_cache[9] = $event => $options.addQuranProgress(1))
  }, " +1 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--ghost r-button--sm",
    type: "button",
    onClick: _cache[10] || (_cache[10] = $event => $options.addQuranProgress(3))
  }, " +3 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--ghost r-button--sm",
    type: "button",
    onClick: _cache[11] || (_cache[11] = $event => $options.addQuranProgress(5))
  }, " +5 ")])])])]), _cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-note r-note--muted"
  }, " Page counts can vary by mushaf edition. Adjust totals if needed. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [$options.quranProgressRemaining === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_75, "Completed 🎉")) : $options.quranProgressDaysLeft ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_76, " At this pace: ~" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranProgressDaysLeft) + " day" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranProgressDaysLeft === 1 ? "" : "s") + " left ", 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_77, "Set a daily goal to estimate your pace.")), _cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-progress__hint"
  }, "Saved locally for your login.", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-mini-label"
  }, "Days remaining", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranDaysRemaining), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-mini-label"
  }, "Needed per day", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranDailyTargetNeeded) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel) + "/day", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-mini-label"
  }, "Est. completion", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranCompletionLabel), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_81, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "r-card__title"
  }, "Daily breakdown 🗓️", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_82, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.calendarLength) + " days", 1 /* TEXT */)]), _cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-card__desc"
  }, " Tied to your planner dates. Targets use your daily goal or an even split across Ramadan. ", -1 /* CACHED */)), _cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-helper"
  }, "Daily totals update from your saved entries (including “Mark today complete”).", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-mini-label"
  }, "Today", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranTodayRead) + " / " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranTodayTarget) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Remaining: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranTodayRemaining), 1 /* TEXT */), $options.quranTodayRemaining === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_85, "Completed ✅")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $options.quranTodayRemaining === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_86, "Completion saved for today.")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-tooltip",
    "aria-label": "Uses your device date to define today.",
    title: "Uses your device date to define today."
  }, " ℹ️ ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--ghost r-button--sm",
    type: "button",
    disabled: !$options.canMarkTodayComplete,
    onClick: _cache[12] || (_cache[12] = (...args) => $options.markTodayComplete && $options.markTodayComplete(...args))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranTodayRemaining === 0 ? "Completed" : "Mark today complete"), 9 /* TEXT, PROPS */, _hoisted_88), $data.lastQuickAction ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "r-chip r-chip--action",
    type: "button",
    onClick: _cache[13] || (_cache[13] = (...args) => $options.undoLastQuickAction && $options.undoLastQuickAction(...args))
  }, " Undo ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.quranBreakdownDays, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: day.key,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-breakdown__row", {
        'is-today': day.isToday,
        'is-selected': day.isSelected
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_90, "Day " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.dayNumber), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_91, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatShortDate(day.date)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "🎯 " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.target) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.quranUnitLabel), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "📗 " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.read) + " read", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-badge", $options.breakdownStatusClass(day.status)])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.breakdownStatusLabel(day.status)), 3 /* TEXT, CLASS */)])], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))])])])]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_93, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_96, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🗓️", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.important_dates.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_97, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.important_dates.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_98, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.important_dates.dates, (date, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: date.event,
      class: "r-card r-card--date"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-card__tag", `r-card__tag--${date.type}`])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.event) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_100, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.dateEmoji(date.type)), 1 /* TEXT */)], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_101, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.gregorian_date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_102, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.hijri_date), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_103, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(date.description), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_104, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_105, [_cache[68] || (_cache[68] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-section__head"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "r-section__title"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🧭"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Live Ramadan Planner ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-section__subtitle"
  }, " Turn this guide into a living plan with a day-by-day calendar, personal reminders, and shared reflections. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_107, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_109, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "r-card__title"
  }, "Ramadan day-by-day calendar"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-card__desc"
  }, " Adjust the start date to match local moon sighting and track your progress each day. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "r-label",
    for: "planner-start-date"
  }, "Start date", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    id: "planner-start-date",
    class: "r-input",
    type: "date",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $data.calendarStartOverride = $event),
    onChange: _cache[15] || (_cache[15] = (...args) => $options.persistCalendar && $options.persistCalendar(...args))
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.calendarStartOverride]]), _cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "r-label",
    for: "planner-length"
  }, "Length", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "planner-length",
    class: "r-select",
    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => $data.calendarLength = $event),
    onChange: _cache[17] || (_cache[17] = (...args) => $options.persistCalendar && $options.persistCalendar(...args))
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)([29, 30], len => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
      key: len,
      value: len
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(len) + " days", 9 /* TEXT, PROPS */, _hoisted_112);
  }), 64 /* STABLE_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.calendarLength, void 0, {
    number: true
  }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_113, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.calendarDays, (day, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: day.key,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["r-calendar__cell", {
        'is-today': day.isToday,
        'is-selected': index === $data.selectedDayIndex,
        'is-special': day.event
      }]),
      type: "button",
      onClick: $event => $options.selectDay(index)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_115, "Day " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.dayNumber), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_116, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatShortDate(day.date)), 1 /* TEXT */), day.event ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_117, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.event), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 10 /* CLASS, PROPS */, _hoisted_114);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_119, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_120, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_121, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "r-card__title"
  }, "Personal reminders", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_122, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.reminders.length) + " saved", 1 /* TEXT */)]), _cache[63] || (_cache[63] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-card__desc"
  }, " Build a mini schedule for suhoor, iftar, prayers, or goals. Reminders stay on this device. ", -1 /* CACHED */)), !$data.authResolved ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_123, "Checking login status...")) : !$data.isAuthenticated ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_124, [...(_cache[60] || (_cache[60] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-card__desc"
  }, "Log in to create and view your saved personal reminders.", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-auth-actions"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "r-button r-button--ghost",
    href: "/login"
  }, "Log in")], -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_125, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "r-form",
    onSubmit: _cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.addReminder && $options.addReminder(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_126, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "r-input",
    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => $data.reminderDraft.title = $event),
    type: "text",
    placeholder: "Reminder title",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.reminderDraft.title, void 0, {
    trim: true
  }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "r-select",
    "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => $data.reminderDraft.dayNumber = $event)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.dayOptions, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: day,
      value: day
    }, "Day " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day), 9 /* TEXT, PROPS */, _hoisted_127);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.reminderDraft.dayNumber, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "r-select",
    "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => $data.reminderDraft.timeOfDay = $event)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.timeOfDayOptions, option => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: option.value,
      value: option.value
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(option.label), 9 /* TEXT, PROPS */, _hoisted_129);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.reminderDraft.timeOfDay]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "r-input",
    "onUpdate:modelValue": _cache[21] || (_cache[21] = $event => $data.reminderDraft.note = $event),
    type: "text",
    placeholder: "Optional note"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.reminderDraft.note, void 0, {
    trim: true
  }]])]), _cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button",
    type: "submit"
  }, "Save reminder", -1 /* CACHED */))], 32 /* NEED_HYDRATION */), $options.sortedReminders.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_130, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.sortedReminders, reminder => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: reminder.id,
      class: "r-reminder"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_131, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "checkbox",
      "onUpdate:modelValue": $event => reminder.done = $event,
      onChange: _cache[23] || (_cache[23] = (...args) => $options.persistReminders && $options.persistReminders(...args))
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_132), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, reminder.done]]), _cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_133, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        'is-done': reminder.done
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reminder.title), 3 /* TEXT, CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Day " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reminder.dayNumber) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatTimeLabel(reminder.timeOfDay)), 1 /* TEXT */), reminder.note ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_134, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reminder.note), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-icon-button",
      type: "button",
      onClick: $event => $options.removeReminder(reminder.id)
    }, " Remove ", 8 /* PROPS */, _hoisted_135)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_136, "No reminders yet. Add your first one above."))]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_137, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_138, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_139, [_cache[64] || (_cache[64] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "r-card__title"
  }, "Community reflections", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_140, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.reflections.length) + " shared", 1 /* TEXT */)]), _cache[67] || (_cache[67] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-card__desc"
  }, "Share a short reflection, dua, or intention and see it appear instantly.", -1 /* CACHED */)), !$data.authResolved ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_141, "Checking login status...")) : !$data.isAuthenticated ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_142, [...(_cache[65] || (_cache[65] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "r-card__desc"
  }, "Log in to share and view your saved community reflections.", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "r-auth-actions"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "r-button r-button--ghost",
    href: "/login"
  }, "Log in")], -1 /* CACHED */)]))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_143, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    class: "r-form",
    onSubmit: _cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $options.addReflection && $options.addReflection(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_144, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "r-input",
    "onUpdate:modelValue": _cache[24] || (_cache[24] = $event => $data.reflectionDraft.name = $event),
    type: "text",
    placeholder: "Name (optional)"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.reflectionDraft.name, void 0, {
    trim: true
  }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "r-select",
    "onUpdate:modelValue": _cache[25] || (_cache[25] = $event => $data.reflectionDraft.mood = $event)
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.reflectionMoods, mood => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: mood,
      value: mood
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(mood), 9 /* TEXT, PROPS */, _hoisted_145);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.reflectionDraft.mood]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    class: "r-textarea",
    "onUpdate:modelValue": _cache[26] || (_cache[26] = $event => $data.reflectionDraft.text = $event),
    rows: "3",
    placeholder: "Share a reflection or dua...",
    required: ""
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.reflectionDraft.text, void 0, {
    trim: true
  }]]), _cache[66] || (_cache[66] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button",
    type: "submit"
  }, "Share reflection", -1 /* CACHED */))], 32 /* NEED_HYDRATION */), $data.reflections.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_146, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.reflections, reflection => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: reflection.id,
      class: "r-reflection"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_147, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_148, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reflection.name || "Anonymous"), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_149, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reflection.mood), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_150, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.formatRelativeTime(reflection.timestamp)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(reflection.text), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_151, "Be the first to share a reflection."))]))])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_152, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_154, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_155, [_cache[69] || (_cache[69] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🥣", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.how_to_fast.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_156, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.how_to_fast.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_157, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_158, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.how_to_fast.cards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.title,
      class: "r-card r-card--step"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_159, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getEmoji("fasting", index)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_160, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_161, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(card.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.how_to_fast.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_162, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.how_to_fast.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_163), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_164)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_165, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_166, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_167, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_168, [_cache[70] || (_cache[70] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "❓", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.faq.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_169, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.faq.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_170, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_171, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.faq.items, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.question,
      class: "r-card r-card--faq"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_172, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.question), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_173, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.answer), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_174, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_175, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_176, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_177, [_cache[71] || (_cache[71] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "📖", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.quran_reading_plans.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_178, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.quran_reading_plans.intro), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_179, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--ghost r-button--sm",
    type: "button",
    onClick: _cache[28] || (_cache[28] = (...args) => $options.toggleAllQuranPlans && $options.toggleAllQuranPlans(...args))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.areAllQuranPlansExpanded ? "Collapse all plans" : "Expand all plans"), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_180, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_181, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.quran_reading_plans.plans, (plan, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: plan.level,
      class: "r-card r-card--plan"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_182, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_183, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getEmoji("quran", index)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_184, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_185, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.level), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_186, "Daily target: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.daily_target), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-card__toggle",
      type: "button",
      "aria-expanded": $options.isQuranPlanExpanded(index),
      "aria-controls": `quran-plan-${index}`,
      onClick: $event => $options.toggleQuranPlan(index)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.isQuranPlanExpanded(index) ? "Hide details" : "View full plan"), 9 /* TEXT, PROPS */, _hoisted_187)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: `quran-plan-${index}`,
      class: "r-plan-details"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_189, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Time needed: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.time_needed), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Structure: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.structure), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Goal: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.goal), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", null, "Split: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.split), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_190, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.tips, tip => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: tip
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])], 8 /* PROPS */, _hoisted_188), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isQuranPlanExpanded(index)]])]);
  }), 128 /* KEYED_FRAGMENT */))]), $data.ramadan.quran_reading_plans.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_191, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.quran_reading_plans.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_192), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_193)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_194, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_195, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_196, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_197, [_cache[72] || (_cache[72] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🎯", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_198, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.intro), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_199, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "r-button r-button--ghost r-button--sm",
    type: "button",
    onClick: _cache[29] || (_cache[29] = (...args) => $options.toggleAllPersonalPlans && $options.toggleAllPersonalPlans(...args))
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.areAllPersonalPlansExpanded ? "Collapse all plans" : "Expand all plans"), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_200, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_201, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.personal_plans.plans, (plan, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: plan.title,
      class: "r-card r-card--persona"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_202, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_203, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getEmoji("personal", index)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_204, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_205, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "r-card__toggle",
      type: "button",
      "aria-expanded": $options.isPersonalPlanExpanded(index),
      "aria-controls": `personal-plan-${index}`,
      onClick: $event => $options.togglePersonalPlan(index)
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.isPersonalPlanExpanded(index) ? "Hide details" : "View full plan"), 9 /* TEXT, PROPS */, _hoisted_206)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_207, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.who_for), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_208, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.overview), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: `personal-plan-${index}`,
      class: "r-plan-details"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_210, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.focus), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_211, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.daily_flow_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.daily_flow, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_212, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.personal_plans.weekly_focus_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(plan.weekly_focus, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_213, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(plan.accountability), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_209), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isPersonalPlanExpanded(index)]])]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_214, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_215, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_216, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_217, [_cache[73] || (_cache[73] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🤝", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_218, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_219, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_220, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_221, [_cache[74] || (_cache[74] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-card__emoji",
    "aria-hidden": "true"
  }, "💛", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_222, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.overview, (para, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", {
      key: index,
      class: "r-card__desc"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(para), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_223, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.zakat_al_fitr.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_224, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.zakat_al_fitr.points, point => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: point
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(point), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("article", _hoisted_225, [_cache[75] || (_cache[75] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-card__emoji",
    "aria-hidden": "true"
  }, "🎁", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_226, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.sadaqah_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_227, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.sadaqah_ideas, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_228, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.charity_guide.giving_checklist_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_229, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.giving_checklist, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: item
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.impact_notes, note => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "r-note",
      key: note
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(note), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])]), $data.ramadan.charity_guide.references ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_230, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.references), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.charity_guide.references, ref => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: ref.citation
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-reference-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.source) + " — " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref.citation), 9 /* TEXT, PROPS */, _hoisted_231), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-link",
      href: ref.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.view_source), 9 /* TEXT, PROPS */, _hoisted_232)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_233, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_234, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_235, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_236, [_cache[76] || (_cache[76] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🥗", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.health_food_tips.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_237, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.health_food_tips.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_238, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_239, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.primary_sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: section.title,
      class: "r-card r-card--health"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_240, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getEmoji("health", index)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_241, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_242, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_243, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.secondary_sections, (section, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: section.title,
      class: "r-card r-card--health r-card--health-alt"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_244, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getEmoji("health", index + 3)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_245, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_246, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_247, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.health_food_tips.micro_tips, tip => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: tip,
      class: "r-chip"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_248, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_249, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_250, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_251, [_cache[77] || (_cache[77] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🤲", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_252, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.intro), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_253, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_254, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.duas_prayers.daily_duas, dua => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: dua.occasion,
      class: "r-story-card r-story-card--dua",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.storyStyle())
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_255, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_256, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.tag_label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_257, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.occasion), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_258, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_259, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.transliteration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_260, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-story-duration",
      href: dua.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dua.reference), 9 /* TEXT, PROPS */, _hoisted_261)])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_262, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.view_more_label), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_263, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_264, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_265, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_266, [_cache[78] || (_cache[78] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🎥", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_267, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_268, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_269, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_270, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.shorts.highlights_title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_271, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.shorts.highlights, item => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: item.link,
      class: "r-story-card",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.storyStyle(item.thumbnail))
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_272, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_273, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tag), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_274, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_275, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_276, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.duration_prefix) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.duration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-story-link",
      href: item.link,
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.watch_short), 9 /* TEXT, PROPS */, _hoisted_277)])], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_278, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_279, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.explore_by_theme), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_280, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.shorts.groups, group => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: group.title,
      class: "r-short-group"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_281, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(group.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_282, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(group.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: item.link,
        class: "r-story-card",
        style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.storyStyle(item.thumbnail))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_283, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_284, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.tag), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_285, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_286, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.description), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_287, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.duration_prefix) + ": " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.duration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "r-story-link",
        href: item.link,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.watch_short), 9 /* TEXT, PROPS */, _hoisted_288)])], 4 /* STYLE */);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_289, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_290, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_291, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_292, [_cache[79] || (_cache[79] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🧮", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.tools_calculators.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_293, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.tools_calculators.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_294, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_295, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.tools_calculators.tools, (tool, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: tool.title,
      class: "r-card r-card--tool"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "r-expand",
      href: tool.link,
      target: "_blank",
      rel: "noopener",
      "aria-label": $data.ramadan.labels.open_tool_aria,
      title: $data.ramadan.labels.open_tool_title
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['fas', tool.icon]),
      "aria-hidden": "true"
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_296), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_297, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getEmoji("tools", index)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_298, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tool.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_299, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tool.description), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      href: tool.link,
      class: "r-link",
      target: "_blank",
      rel: "noopener"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.open_tool), 9 /* TEXT, PROPS */, _hoisted_300)]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_301, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_302, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_303, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_304, [_cache[80] || (_cache[80] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "r-emoji r-emoji--title",
    "aria-hidden": "true"
  }, "🌐", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.platform_resources.section_title), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_305, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.platform_resources.subtitle), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_306, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_307, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.platform_resources.cards, (card, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
      key: card.title,
      class: "r-card r-card--resource"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_308, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.getEmoji("platforms", index)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_309, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(card.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_310, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(card.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
        key: item.label
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "r-resource-link",
        href: item.link,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.label), 9 /* TEXT, PROPS */, _hoisted_311)]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_312, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_313, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_314, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_315, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_316, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.modal_title), 1 /* TEXT */), _cache[81] || (_cache[81] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_317, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_318, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.ramadan.duas_prayers.modal_sections, section => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: section.title,
      class: "r-modal-card"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(section.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_319, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(section.items, item => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
        key: item.name,
        class: "r-story-card r-story-card--dua"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_320, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_321, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.duas_prayers.tag_label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_322, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_323, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_324, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.transliteration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_325, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_326, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "r-story-duration",
        href: item.resource,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item.reference), 9 /* TEXT, PROPS */, _hoisted_327), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
        class: "r-story-link",
        href: item.resource,
        target: "_blank",
        rel: "noopener"
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.ramadan.labels.resource_label), 9 /* TEXT, PROPS */, _hoisted_328)])])]);
    }), 128 /* KEYED_FRAGMENT */))])]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), $data.showFab ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
    key: 0,
    class: "r-fab",
    type: "button",
    onClick: _cache[30] || (_cache[30] = (...args) => $options.scrollToTop && $options.scrollToTop(...args)),
    "aria-label": "Scroll back to top",
    title: "Scroll back to top"
  }, [...(_cache[82] || (_cache[82] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    "aria-hidden": "true"
  }, "⬆", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
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

/***/ "./resources/components/vue/data/ramadan_2026.json":
/*!*********************************************************!*\
  !*** ./resources/components/vue/data/ramadan_2026.json ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"page_title":"Ramadan 2026 | Complete Guide & Resources","meta_description":"Complete guide for Ramadan 1447 AH (2026 CE): key dates, how to fast, prayers made easy, Quran plans, charity guidance, health tips, duas, tools, and verified resources.","last_updated":"2025-03-01","data_sources":[{"label":"Umm al-Qura Calendar (Saudi Arabia)","link":"https://www.ummulqura.org.sa/"},{"label":"Islamic Society of North America (ISNA)","link":"https://www.isna.net/"},{"label":"Muslim World League","link":"https://www.themwl.org/"}],"labels":{"references":"References","open_video":"Open video","open_tool":"Open tool","open_tool_title":"Open tool","open_tool_aria":"Open tool in a new tab","download":"Download","watch_short":"Watch short","highlights":"Highlights","explore_by_theme":"Explore by theme","view_source":"View","duration_prefix":"Duration","resource_label":"Resource"},"header":{"title":"Ramadan 2026 (1447 AH)","subtitle":"The Month of Quran, Fasting, and Spiritual Renewal","banner_image":"/images/ramadan-hero-pexels.jpg","alt_text":"Grand mosque exterior under a twilight sky","stats":{"last_updated_label":"Last updated","data_sources_label":"Data sources"}},"nav_links":[{"label":"What is Ramadan","href":"#overview"},{"label":"History","href":"#history"},{"label":"Key dates","href":"#key-dates"},{"label":"How to fast","href":"#how-to-fast"},{"label":"FAQ","href":"#faq"},{"label":"Quran plans","href":"#quran-plans"},{"label":"Personal plans","href":"#personal-plans"},{"label":"Charity","href":"#charity"},{"label":"Health tips","href":"#health"},{"label":"Duas","href":"#duas"},{"label":"Short clips","href":"#shorts"},{"label":"Tools","href":"#tools"}],"overview":{"section_title":"What Is Ramadan?","subtitle":"Ramadan is the ninth month of the Islamic lunar calendar. It is a month of fasting from dawn to sunset, focused worship, Quran recitation, community care, and spiritual renewal.","body":["The Quran describes Ramadan as the month in which the Quran was revealed as guidance for humanity. Muslims fast to develop taqwa (God-consciousness), discipline their desires, and increase empathy for those in need.","Beyond fasting, Ramadan is a time to elevate worship through prayer, charity, and reflection. Families gather, communities host iftars, and masajid become centers of learning and service.","Every day in Ramadan is an invitation to reset habits, strengthen spiritual focus, and renew intentions with sincerity."],"key_points_title":"Key ideas to remember","key_points":["Fasting is an act of worship and self-discipline.","Ramadan is the month in which the Quran was revealed.","The last ten nights are especially blessed, including Laylat al-Qadr.","Charity and community care are central to the month.","Every day is an opportunity to improve character and habits."],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-185","link":"https://quran.com/2/183"},{"source":"Qur\'an","citation":"Al-Qadr 97:1-5","link":"https://quran.com/97"}]},"history":{"section_title":"History & Significance","subtitle":"Ramadan is linked to the Quranic revelation and the obligation of fasting. Its devotional rhythm has shaped Muslim worship, ethics, and communal life for centuries.","body":["The Quran frames fasting in Ramadan as a prescribed act for believers and ties the month to revelation and guidance.","Prophetic practice established suhoor, iftar at sunset, and intensified night worship, while the last ten nights emphasize Laylat al-Qadr and spiritual retreat (i\'tikaf).","Across centuries, Ramadan shaped daily routines, public worship, and charitable life, anchored by mosques, learning circles, and family gatherings.","Modern Ramadan carries these traditions worldwide through organized charity, community programming, and digital learning."],"timeline":[{"period":"c. 610 CE (13 BH)","detail":"First Quranic revelation occurs in Ramadan, traditionally associated with Laylat al-Qadr."},{"period":"624 CE (2 AH)","detail":"Fasting in Ramadan is prescribed for believers (Qur\'an 2:183-185)."},{"period":"632-661 CE (Rashidun era)","detail":"Ramadan practices consolidate within the early Muslim community, emphasizing communal prayer and charity."},{"period":"7th-8th centuries CE","detail":"Ramadan observance spreads across expanding Muslim communities in the Middle East, North Africa, and Asia."},{"period":"9th-12th centuries CE","detail":"Legal and devotional scholarship elaborates fasting practice, moon sighting, and community observance."},{"period":"13th-15th centuries CE","detail":"Regional traditions develop in Andalusia, the Maghreb, Egypt, and the Levant alongside urban mosque life."},{"period":"15th-19th centuries CE","detail":"Ottoman, Safavid, and Mughal societies expand public iftars, endowments, and Quran education."},{"period":"20th-21st centuries CE","detail":"Global Ramadan programming, large-scale iftars, and coordinated charity expand community impact."},{"period":"Today","detail":"Ramadan continues to unite communities worldwide through worship, service, and family ties."}],"notable_figures":{"title":"Scholars & Voices","items":[{"name":"Ibn Abbas (d. 687 CE)","note":"Early Qur\'anic exegete whose explanations shaped how Muslims understand verses about fasting."},{"name":"Imam Malik (d. 795 CE)","note":"Documented Madinan practice, including Ramadan customs and community observance."},{"name":"Imam al-Shafi\'i (d. 820 CE)","note":"Systematized legal principles that influenced fasting rulings across regions."},{"name":"Imam al-Nawawi (d. 1277 CE)","note":"Compiled hadith and devotional guidance that shaped Ramadan practice."}]},"regional_practices":{"title":"Regional Traditions","items":[{"region":"Egypt (Cairo)","detail":"Lantern processions and communal iftars became distinctive Ramadan features."},{"region":"Ottoman cities (Istanbul)","detail":"Public iftar tents and endowments supported travelers and the poor."},{"region":"West Africa (Sahel)","detail":"Quran recitation circles and night study gatherings remain a hallmark."},{"region":"South & Southeast Asia","detail":"Large taraweeh congregations and neighborhood iftars reinforce community bonds."},{"region":"Diaspora communities","detail":"Mosques and Islamic centers host open iftars and service drives to build cohesion."}]},"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-187","link":"https://quran.com/2/183"},{"source":"Qur\'an","citation":"Al-Baqarah 2:185","link":"https://quran.com/2/185"},{"source":"Qur\'an","citation":"Al-Qadr 97:1-5","link":"https://quran.com/97"},{"source":"Qur\'an","citation":"Al-Baqarah 2:187","link":"https://quran.com/2/187"}]},"important_dates":{"section_title":"Ramadan 2026 Key Dates","subtitle":"Plan ahead with the most likely timeline for Ramadan 1447 AH.","note":"Dates are approximate and subject to moon sighting. Local moon sighting announcements take precedence.","dates":[{"event":"First Taraweeh Night","gregorian_date":"February 16, 2026 (after Maghrib)","hijri_date":"30 Sha\'ban 1447 AH","description":"First Taraweeh prayer is usually held the night before the first fast.","type":"start"},{"event":"First Day of Ramadan","gregorian_date":"February 17, 2026","hijri_date":"1 Ramadan 1447 AH","description":"Expected first day of fasting based on astronomical calculations.","type":"start"},{"event":"Mid-Ramadan Check-In","gregorian_date":"Approx. March 3, 2026","hijri_date":"15 Ramadan 1447 AH","description":"A good moment to renew goals and review Quran progress.","type":"special"},{"event":"Last 10 Nights Begin","gregorian_date":"Approx. March 8, 2026 (night)","hijri_date":"20 Ramadan 1447 AH","description":"Focus intensifies for night worship, duas, and seeking Laylat al-Qadr.","type":"special"},{"event":"Laylat al-Qadr (Night of Decree)","gregorian_date":"Approx. March 15-16, 2026","hijri_date":"27 Ramadan 1447 AH","description":"The most blessed night - better than 1000 months. Seek it in the last 10 odd nights.","type":"special"},{"event":"Zakat al-Fitr Deadline","gregorian_date":"Before Eid prayer (March 19, 2026)","hijri_date":"End of Ramadan","description":"Zakat al-Fitr should be paid before Eid prayer to reach those in need.","type":"special"},{"event":"Eid al-Fitr","gregorian_date":"March 19, 2026","hijri_date":"1 Shawwal 1447 AH","description":"Festival of Breaking the Fast. Subject to moon sighting.","type":"eid"}]},"how_to_fast":{"section_title":"How To Fast (Do\'s & Don\'ts)","intro":"Fasting is from dawn to sunset with the intention (niyyah). The goal is worship, discipline, and avoiding what breaks the fast.","cards":[{"title":"Do\'s","items":["Make intention before Fajr.","Eat a balanced Suhoor and hydrate well.","Pray on time and read Quran daily.","Break fast promptly at sunset with dates and water if possible.","Be mindful of behavior, speech, and time.","Make dua before Iftar - it is a special time for acceptance."]},{"title":"Don\'ts","items":["Do not eat or drink between Fajr and Maghrib.","Avoid backbiting, arguments, and harmful speech.","Avoid overeating at Iftar.","Do not neglect prayers or Quran.","Avoid wasting time in unhelpful activities."]},{"title":"Exemptions","items":["Children before puberty","The ill","Travelers","Pregnant or nursing women","Menstruating women"]}],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:183-187","link":"https://quran.com/2/183"}]},"quran_reading_plans":{"section_title":"Quran Reading Plans (3 Levels)","intro":"Choose a plan that fits your schedule and energy. Consistency matters most.","plans":[{"level":"Beginner","daily_target":"4-6 pages","time_needed":"15-25 minutes","structure":"After Fajr + before sleep","goal":"Finish a meaningful portion and build a daily habit.","split":"2 short sessions","tips":["Read after Fajr when focus is strongest.","Listen to audio while commuting or walking.","Track progress on a simple checklist."]},{"level":"Intermediate","daily_target":"1 Juz","time_needed":"45-60 minutes","structure":"Split across 5 prayers","goal":"Complete the Quran once by Eid.","split":"5 short segments","tips":["Read 4-5 pages after each prayer.","Use the evening to catch up if needed.","Pair reading with reflection notes."]},{"level":"Advanced","daily_target":"1.5-2 Juz","time_needed":"90-120 minutes","structure":"Morning + afternoon + night","goal":"Complete the Quran more than once.","split":"3 focused sessions","tips":["Commit to a longer morning session.","Use Taraweeh recitation as part of the goal.","Review a translation alongside recitation."]}],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:185","link":"https://quran.com/2/185"}]},"personal_plans":{"section_title":"Personal Plans (Long-Form)","intro":"Choose a plan that matches your lifestyle and sustain it for 30 days.","daily_flow_title":"Daily flow","weekly_focus_title":"Weekly focus","plans":[{"title":"Quiet Renewal Plan","who_for":"Students and solo worshippers","overview":"A slower, reflective pace focused on Quran, journaling, and community check-ins.","focus":"Spiritual depth and daily consistency.","daily_flow":["Fajr + 10 minutes reflection","Midday: 6 pages Quran","Asr: 5-minute dhikr","After Isha: Taraweeh + short dua"],"weekly_focus":["Week 1: Intention and habit building","Week 2: Deepening Quran connection","Week 3: Night worship focus","Week 4: Gratitude and giving"],"accountability":"Weekly check-in with a friend or mentor."},{"title":"Family Connection Plan","who_for":"Parents and households","overview":"Shared worship with kids, simple lessons, and family goals.","focus":"Family unity and shared learning.","daily_flow":["Suhoor: one short Quran reflection","Maghrib: gratitude circle","After Taraweeh: 15-minute story or Quran"],"weekly_focus":["Week 1: Set family goals","Week 2: Add a family charity project","Week 3: Quran memorization night","Week 4: Eid preparation + reflection"],"accountability":"Family chart tracking prayers and reading."},{"title":"Working Professional Plan","who_for":"Busy schedules","overview":"Short, consistent blocks that fit around work and commuting.","focus":"Micro-habits and consistency.","daily_flow":["Morning commute: Quran audio","Lunch break: 2 pages reading","Evening: 10-minute dhikr + dua","Weekend: longer reflection session"],"weekly_focus":["Week 1: Align calendar","Week 2: Increase charity","Week 3: Add night prayer twice","Week 4: Finish Quran goal"],"accountability":"Set reminders and a weekly target review."},{"title":"Community Service Plan","who_for":"Volunteers and organizers","overview":"Balance worship with consistent service and community care.","focus":"Service and leadership.","daily_flow":["Post-Dhuhr: 20 minutes planning","Evening: serve at iftar or food bank","Night: Taraweeh and dua"],"weekly_focus":["Week 1: Identify a need","Week 2: Build a small volunteer team","Week 3: Host a community iftar","Week 4: Wrap-up and gratitude"],"accountability":"Weekly debrief with the team."},{"title":"Beginner Step-Up Plan","who_for":"New to consistent Ramadan routines","overview":"A gentle ramp-up plan that builds confidence with short, repeatable habits.","focus":"Consistency over intensity.","daily_flow":["Fajr: 5 minutes of Quran + simple dua","Dhuhr: 2 pages of Quran","Maghrib: gratitude note + family check-in","Isha: short Taraweeh or 2 rakaat at home"],"weekly_focus":["Week 1: Set a realistic daily target","Week 2: Add a short reflection journal","Week 3: Increase Quran time by 5 minutes","Week 4: Maintain routine and prepare for Eid"],"accountability":"Track progress daily and celebrate small wins."},{"title":"Night Worship Plan","who_for":"Those focusing on the last 10 nights","overview":"Structured routine to maximize Qiyam, dua, and Quran in the evenings.","focus":"Deep night worship and focused dua.","daily_flow":["After Maghrib: light meal + rest","After Isha: Taraweeh with focus","Late night: 20 minutes Quran + dua","Before Suhoor: 2-4 rakaat Qiyam"],"weekly_focus":["Week 1: Prepare sleep schedule","Week 2: Add a dua list for family","Week 3: Increase Qiyam duration","Week 4: Focus on Laylat al-Qadr"],"accountability":"Set a nightly alarm and keep a short dua checklist."}]},"charity_guide":{"section_title":"Charity Guide (Zakat al-Fitr Made Simple)","intro":"Charity is central in Ramadan. Zakat al-Fitr is obligatory before Eid prayer, while ongoing sadaqah builds compassion.","sadaqah_title":"Sadaqah ideas","giving_checklist_title":"Giving checklist","overview":["Zakat al-Fitr purifies the fasting person from minor shortcomings and ensures everyone can celebrate Eid with dignity.","Sadaqah is voluntary charity given throughout the month. Even small, consistent giving can have a large impact."],"zakat_al_fitr":{"title":"Zakat al-Fitr basics","points":["A required charity per person in the household, given before Eid prayer.","Paid before Eid prayer, preferably during Ramadan.","Every eligible Muslim who can afford it pays for themselves and dependents.","Equivalent to a staple food amount (varies by region).","Give through a local masjid or trusted charity organization."]},"sadaqah_ideas":["Sponsor iftar meals","Support local food banks","Contribute to masjid programs","Help neighbors and community initiatives","Share educational resources","Volunteer time and skills"],"giving_checklist":["Set a realistic daily or weekly amount.","Choose 1-2 trusted organizations.","Include a family charity goal if possible.","Give before Eid for Zakat al-Fitr."],"impact_notes":["Small, consistent charity builds long-term benefit.","Prioritize local needs alongside global relief."],"references":[{"source":"Qur\'an","citation":"Al-Baqarah 2:177","link":"https://quran.com/2/177"}]},"health_food_tips":{"section_title":"Health & Food Tips","intro":"Keep energy stable and hydration steady. Aim for balance, not perfection.","primary_sections":[{"title":"Suhoor ideas","items":["Oatmeal with nuts and dates","Eggs with whole-grain toast","Greek yogurt + berries","Chia pudding with milk","Water + herbal tea"]},{"title":"Iftar ideas","items":["Dates + water + light soup","Grilled protein + salad","Lentil soup + brown rice","Baked salmon + vegetables","Fresh fruit plate"]},{"title":"Wellness focus","items":["Avoid salty foods to reduce thirst","Prioritize complex carbs for longer energy","Short walks after Iftar","Limit heavy fried meals","Ease into caffeine to avoid dehydration"]}],"secondary_sections":[{"title":"Hydration plan","items":["Drink 8-10 glasses between iftar and suhoor","2 glasses at iftar","4 glasses between iftar and sleep","2-4 glasses at suhoor"]},{"title":"Sleep & movement","items":["Take a 20-30 minute power nap if needed","Sleep soon after Taraweeh","Dim screens 30 minutes before bed","Keep a consistent bedtime if possible","Light exercise 1-2 hours after iftar","Walking for 30 minutes","Light stretching","Avoid intense workouts during fasting hours"]}],"micro_tips":["Add fruit and vegetables to every meal.","Keep a water bottle nearby at night.","Reduce sugar spikes by breaking fast slowly."]},"duas_prayers":{"section_title":"Essential Quran Duas","intro":"Every dua below is from the Quran. Use these throughout Ramadan.","tag_label":"Quran","daily_duas":[{"occasion":"Good in this life and the next","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً","transliteration":"Rabbana atina fid-dunya hasanah","translation":"Our Lord, give us good in this world","reference":"Qur\'an 2:201","link":"https://quran.com/2/201","tag":"Quran"},{"occasion":"Steadfast hearts","arabic":"رَبَّنَا لَا تُزِغْ قُلُوبَنَا","transliteration":"Rabbana la tuzigh qulubana","translation":"Our Lord, do not let our hearts deviate","reference":"Qur\'an 3:8","link":"https://quran.com/3/8","tag":"Quran"},{"occasion":"Family and righteousness","arabic":"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا","transliteration":"Rabbana hab lana min azwajina","translation":"Our Lord, grant us from among our spouses","reference":"Qur\'an 25:74","link":"https://quran.com/25/74","tag":"Quran"}],"view_more_label":"View more Quran duas","modal_title":"Quran Dua Library","modal_sections":[{"title":"Worship & Prayer","items":[{"name":"Ease in prayer","arabic":"رَبِّ اشْرَحْ لِي صَدْرِي","transliteration":"Rabbi ishrah li sadri","translation":"My Lord, expand for me my chest","reference":"Qur\'an 20:25","resource":"https://quran.com/20/25"},{"name":"Accept deeds","arabic":"رَبَّنَا تَقَبَّلْ مِنَّا","transliteration":"Rabbana taqabbal minna","translation":"Our Lord, accept from us","reference":"Qur\'an 2:127","resource":"https://quran.com/2/127"},{"name":"Increase knowledge","arabic":"رَبِّ زِدْنِي عِلْمًا","transliteration":"Rabbi zidni \'ilma","translation":"My Lord, increase me in knowledge","reference":"Qur\'an 20:114","resource":"https://quran.com/20/114"},{"name":"Keep steady","arabic":"رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا","transliteration":"Rabbana afrigh \'alayna sabran","translation":"Our Lord, pour upon us patience","reference":"Qur\'an 2:250","resource":"https://quran.com/2/250"},{"name":"Guidance","arabic":"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ","transliteration":"Ihdinas-siratal-mustaqim","translation":"Guide us to the straight path","reference":"Qur\'an 1:6","resource":"https://quran.com/1/6"},{"name":"Devotion","arabic":"رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ","transliteration":"Rabbana waj\'alna muslimayn","translation":"Our Lord, make us Muslims in submission to You","reference":"Qur\'an 2:128","resource":"https://quran.com/2/128"}]},{"title":"Forgiveness & Mercy","items":[{"name":"Do not burden us","arabic":"رَبَّنَا لَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ","transliteration":"Rabbana la tuhammilna ma la taqata lana bih","translation":"Our Lord, do not burden us beyond what we can bear","reference":"Qur\'an 2:286","resource":"https://quran.com/2/286"},{"name":"Mercy","arabic":"رَبِّ اغْفِرْ وَارْحَمْ","transliteration":"Rabbi ighfir warham","translation":"My Lord, forgive and have mercy","reference":"Qur\'an 23:118","resource":"https://quran.com/23/118"},{"name":"Repentance","arabic":"رَبَّنَا ظَلَمْنَا أَنْفُسَنَا","transliteration":"Rabbana zalamna anfusana","translation":"Our Lord, we have wronged ourselves","reference":"Qur\'an 7:23","resource":"https://quran.com/7/23"},{"name":"Steadfast hearts","arabic":"رَبَّنَا لَا تُزِغْ قُلُوبَنَا","transliteration":"Rabbana la tuzigh qulubana","translation":"Our Lord, do not let our hearts deviate","reference":"Qur\'an 3:8","resource":"https://quran.com/3/8"},{"name":"Light for us","arabic":"رَبَّنَا أَتْمِمْ لَنَا نُورَنَا","transliteration":"Rabbana atmim lana nurana","translation":"Our Lord, perfect for us our light","reference":"Qur\'an 66:8","resource":"https://quran.com/66/8"},{"name":"Forgive our sins","arabic":"رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا","transliteration":"Rabbana ighfir lana dhunubana","translation":"Our Lord, forgive us our sins","reference":"Qur\'an 3:147","resource":"https://quran.com/3/147"}]},{"title":"Family & Community","items":[{"name":"Righteous family","arabic":"رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا","transliteration":"Rabbana hab lana min azwajina","translation":"Our Lord, grant us from among our spouses","reference":"Qur\'an 25:74","resource":"https://quran.com/25/74"},{"name":"Parents and believers","arabic":"رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ","transliteration":"Rabbi ighfir li wa li walidayya","translation":"My Lord, forgive me and my parents","reference":"Qur\'an 14:41","resource":"https://quran.com/14/41"},{"name":"For all believers","arabic":"رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا","transliteration":"Rabbana ighfir lana wa li ikhwanina","translation":"Our Lord, forgive us and our brothers","reference":"Qur\'an 59:10","resource":"https://quran.com/59/10"},{"name":"Prayer in family","arabic":"رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ","transliteration":"Rabbi ij\'alni muqima as-salah","translation":"My Lord, make me an establisher of prayer","reference":"Qur\'an 14:40","resource":"https://quran.com/14/40"},{"name":"Peaceful home","arabic":"رَبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا","transliteration":"Rabbi anzilni munzalan mubaraka","translation":"My Lord, let me land at a blessed landing place","reference":"Qur\'an 23:29","resource":"https://quran.com/23/29"},{"name":"Righteous hearts","arabic":"رَبَّنَا لَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا","transliteration":"Rabbana la taj\'al fi qulubina ghillan","translation":"Our Lord, do not place in our hearts any rancor","reference":"Qur\'an 59:10","resource":"https://quran.com/59/10"}]},{"title":"Provision & Charity","items":[{"name":"Good provision","arabic":"رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ","transliteration":"Rabbi inni lima anzalta ilayya min khayrin faqir","translation":"My Lord, I am in need of whatever good You send down to me","reference":"Qur\'an 28:24","resource":"https://quran.com/28/24"},{"name":"Blessed wealth","arabic":"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً","transliteration":"Rabbana atina fid-dunya hasanah","translation":"Our Lord, give us good in this world","reference":"Qur\'an 2:201","resource":"https://quran.com/2/201"},{"name":"Accepted deeds","arabic":"رَبَّنَا تَقَبَّلْ مِنَّا","transliteration":"Rabbana taqabbal minna","translation":"Our Lord, accept from us","reference":"Qur\'an 2:127","resource":"https://quran.com/2/127"},{"name":"Protection for the needy","arabic":"رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ","transliteration":"Rabbana isrif \'anna \'adhaba jahannam","translation":"Our Lord, turn away from us the punishment of Hell","reference":"Qur\'an 25:65","resource":"https://quran.com/25/65"},{"name":"Guidance and mercy","arabic":"رَبَّنَا هَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً","transliteration":"Rabbana hab lana min ladunka rahmah","translation":"Our Lord, grant us mercy from Yourself","reference":"Qur\'an 18:10","resource":"https://quran.com/18/10"},{"name":"Steadfast faith","arabic":"رَبَّنَا عَلَيْكَ تَوَكَّلْنَا","transliteration":"Rabbana \'alayka tawakkalna","translation":"Our Lord, upon You we rely","reference":"Qur\'an 10:85","resource":"https://quran.com/10/85"}]}]},"shorts":{"section_title":"Ramadan Short Clips & Reminders","subtitle":"Quick, inspiring clips grouped by theme. Tap any card to watch.","highlights_title":"Quick highlights","highlights":[{"title":"Ramadan is coming","description":"A quick reminder to prepare your heart and schedule.","duration":"Under 1 min","tag":"Preparation","link":"https://www.youtube.com/shorts/HRHR66dGphk","thumbnail":"https://i.ytimg.com/vi/HRHR66dGphk/hqdefault.jpg"},{"title":"Which one are you this Ramadan?","description":"A short reflection on personal goals.","duration":"Under 1 min","tag":"Reflection","link":"https://www.youtube.com/shorts/ubK3uJzcS6k","thumbnail":"https://i.ytimg.com/vi/ubK3uJzcS6k/hqdefault.jpg"},{"title":"Ramadan Mubarak dua","description":"Short dua to share blessings in the month.","duration":"Under 1 min","tag":"Dua","link":"https://www.youtube.com/shorts/V3VN1lkfrjM","thumbnail":"https://i.ytimg.com/vi/V3VN1lkfrjM/hqdefault.jpg"},{"title":"Shortest fasting times","description":"A quick look at shorter fasting windows by region.","duration":"Under 1 min","tag":"Fasting","link":"https://www.youtube.com/shorts/xX74aNqVf28","thumbnail":"https://i.ytimg.com/vi/xX74aNqVf28/hqdefault.jpg"}],"groups":[{"title":"Quran & Taraweeh","items":[{"title":"Ramadan reminder","description":"Keep the Quran close and hearts soft.","duration":"Under 1 min","tag":"Quran","link":"https://www.youtube.com/shorts/nOG_AO74gFE","thumbnail":"https://i.ytimg.com/vi/nOG_AO74gFE/hqdefault.jpg"},{"title":"Quran in Ramadan","description":"Quick motivation to recite more.","duration":"Under 1 min","tag":"Quran","link":"https://www.youtube.com/watch?v=_P32u0x2v_w","thumbnail":"https://i.ytimg.com/vi/_P32u0x2v_w/hqdefault.jpg"},{"title":"Fast Taraweeh","description":"A short reminder about nightly prayers.","duration":"Under 1 min","tag":"Taraweeh","link":"https://www.youtube.com/shorts/sTyXJo_O9zI","thumbnail":"https://i.ytimg.com/vi/sTyXJo_O9zI/hqdefault.jpg"}]},{"title":"Duas & Laylat al-Qadr","items":[{"title":"Ramadan dua","description":"A brief dua to recite in the month.","duration":"Under 1 min","tag":"Dua","link":"https://www.youtube.com/shorts/yBHKEwH89Co","thumbnail":"https://i.ytimg.com/vi/yBHKEwH89Co/hqdefault.jpg"},{"title":"Authentic dua at iftar","description":"Iftar dua reminder.","duration":"Under 1 min","tag":"Iftar","link":"https://www.youtube.com/shorts/O1z666oaa0U","thumbnail":"https://i.ytimg.com/vi/O1z666oaa0U/hqdefault.jpg"},{"title":"Laylat al-Qadr dua","description":"What to say on the Night of Power.","duration":"Under 1 min","tag":"Laylat al-Qadr","link":"https://www.youtube.com/shorts/lmnZZVZKuIY","thumbnail":"https://i.ytimg.com/vi/lmnZZVZKuIY/hqdefault.jpg"}]},{"title":"Suhoor & Charity","items":[{"title":"Eating suhoor in Ramadan","description":"A lighthearted look at suhoor routines.","duration":"Under 1 min","tag":"Suhoor","link":"https://www.youtube.com/shorts/2kyjR_uMnRw","thumbnail":"https://i.ytimg.com/vi/2kyjR_uMnRw/hqdefault.jpg"},{"title":"DIY Sadaqah box","description":"A creative charity idea for families.","duration":"Under 1 min","tag":"Charity","link":"https://www.youtube.com/shorts/Ycfzl4NjkmI","thumbnail":"https://i.ytimg.com/vi/Ycfzl4NjkmI/hqdefault.jpg"}]}]},"platform_resources":{"section_title":"Apps & Learning Resources","subtitle":"Choose the platform that suits your learning style.","cards":[{"title":"Mobile","items":[{"label":"Muslim Pro (Prayer times, Quran, Qibla)","link":"https://www.muslimpro.com/"},{"label":"Quran.com App","link":"https://quran.com/apps"},{"label":"Bayyinah TV","link":"https://bayyinahtv.com/"}]},{"title":"Web","items":[{"label":"Quran.com","link":"https://quran.com/"},{"label":"Bayyinah TV","link":"https://bayyinahtv.com/"},{"label":"SeekersGuidance","link":"https://seekersguidance.org/"}]},{"title":"General","items":[{"label":"Local masjid courses","link":"https://www.google.com/maps/search/masjid+near+me"},{"label":"Ramadan reflection playlists","link":"https://www.youtube.com/results?search_query=ramadan+reflection+playlist"},{"label":"Community study circles","link":"https://www.google.com/search?q=islamic+study+circle+near+me"}]}]},"faq":{"section_title":"Frequently Asked Questions","subtitle":"Mainstream Sunni guidance commonly shared in North American masajid.","items":[{"question":"When does Ramadan 2026 start?","answer":"Most North American calendars project the first fast on February 17, 2026, with the first Taraweeh night on February 16, 2026. Local moon sighting can shift this by a day, so confirm with your local masjid."},{"question":"What time does the daily fast begin and end?","answer":"Fasting is from true dawn (Fajr) until sunset (Maghrib). Follow your local prayer timetable for your exact city times."},{"question":"Who is exempt from fasting?","answer":"Children before puberty, the ill, travelers, pregnant or nursing women, and those menstruating are exempt. Missed fasts are made up later when possible; ask a local scholar about fidya or kaffarah in your situation."},{"question":"What breaks the fast?","answer":"Eating or drinking, sexual relations, intentional vomiting, and menstrual or postpartum bleeding break the fast. If you eat or drink out of forgetfulness, the fast remains valid according to most Sunni opinions."},{"question":"How can I make the most of the last 10 nights?","answer":"Prioritize night prayer, Quran, dua, and charity, and focus on the odd nights (21, 23, 25, 27, 29) for Laylat al-Qadr. Many people adjust sleep schedules or take time off to focus on worship."}]},"tools_calculators":{"section_title":"Tools & Calculators","subtitle":"Direct access to Islamic Connect tools.","tools":[{"title":"Zakat Calculator","description":"Estimate your zakat with a guided calculator.","link":"/zakat","icon":"fa-calculator"},{"title":"Prayer Timetable","description":"Find local prayer times and schedules.","link":"/prayer","icon":"fa-mosque"},{"title":"Date Converter","description":"Convert Gregorian and Hijri dates quickly.","link":"/date","icon":"fa-calendar-alt"}]}}');

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