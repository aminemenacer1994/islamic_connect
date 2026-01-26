"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_components_vue_CalendarComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Non-reactive constants
const EVENTS_MAP = {
  '1-1': ['Islamic New Year'],
  '1-10': ['Day of Ashura'],
  '3-12': ['Mawlid al-Nabi'],
  '9-1': ['Beginning of Ramadan'],
  '9-27': ['Laylat al-Qadr'],
  '10-1': ['Eid al-Fitr'],
  '12-10': ['Eid al-Adha'],
  '12-18': ['Day of Arafah']
};
const GREGORIAN_SHORT = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    const currentDate = new Date();
    const todayISO = new Date().toISOString().split('T')[0];
    const yearRange = Array.from({
      length: 21
    }, (_, i) => 1440 + i);
    return {
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      islamicMonths: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'],
      calendarData: [],
      yearRange,
      loading: false,
      selectedDay: null,
      prayerTimes: null,
      todayISO,
      prayerLoading: false,
      // Caches
      calendarCache: Object.create(null),
      // key: YYYY-M -> days[]
      prayerCache: Object.create(null),
      // key: YYYY-MM-DD -> timings
      // Debounce/schedule fetch
      fetchTimerId: null,
      gregorianShort: GREGORIAN_SHORT,
      focusIndex: 0,
      nextStepMinimized: false
    };
  },
  computed: {
    calendarWeeks() {
      if (!this.calendarData.length) return [];
      const weeks = [];
      let week = [];
      const firstDay = new Date(this.calendarData[0].gregorian.date);
      const startingDay = firstDay.getDay();
      for (let i = 0; i < startingDay; i++) {
        week.push(null);
      }
      this.calendarData.forEach((day, index) => {
        const dayEvents = this.getEventsForDay(day.hijri.day, day.hijri.month.number);
        week.push(_objectSpread(_objectSpread({}, day), {}, {
          isCurrentMonth: true,
          events: dayEvents
        }));
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      });
      if (week.length) {
        while (week.length < 7) {
          week.push(null);
        }
        weeks.push(week);
      }
      return weeks;
    }
  },
  methods: {
    toggleNextStepMinimized() {
      this.nextStepMinimized = !this.nextStepMinimized;
    },
    cellCount() {
      return this.calendarWeeks.length * 7;
    },
    flatIndexOf(weekIndex, dayIndex) {
      return weekIndex * 7 + dayIndex;
    },
    computeTabIndex(weekIndex, dayIndex, day) {
      if (!day) return -1;
      const idx = this.flatIndexOf(weekIndex, dayIndex);
      return this.focusIndex === idx ? 0 : -1;
    },
    setFocusIndex(newIndex) {
      const total = this.cellCount();
      this.focusIndex = Math.max(0, Math.min(total - 1, newIndex));
      this.$nextTick(() => {
        const cells = this.$refs.cells;
        if (cells && cells[this.focusIndex] && typeof cells[this.focusIndex].focus === 'function') {
          cells[this.focusIndex].focus();
        }
      });
    },
    moveBy(delta) {
      this.setFocusIndex(this.focusIndex + delta);
    },
    onGridKeydown(e) {
      const key = e.key;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown', 'Enter', ' '].includes(key)) {
        e.preventDefault();
      }
      switch (key) {
        case 'ArrowLeft':
          this.moveBy(-1);
          break;
        case 'ArrowRight':
          this.moveBy(1);
          break;
        case 'ArrowUp':
          this.moveBy(-7);
          break;
        case 'ArrowDown':
          this.moveBy(7);
          break;
        case 'Home':
          {
            const rowStart = Math.floor(this.focusIndex / 7) * 7;
            this.setFocusIndex(rowStart);
            break;
          }
        case 'End':
          {
            const rowStart = Math.floor(this.focusIndex / 7) * 7;
            const rowEnd = Math.min(this.cellCount() - 1, rowStart + 6);
            this.setFocusIndex(rowEnd);
            break;
          }
        case 'PageUp':
          this.previousMonth();
          this.$nextTick(() => this.setFocusIndex(0));
          break;
        case 'PageDown':
          this.nextMonth();
          this.$nextTick(() => this.setFocusIndex(0));
          break;
        case 'Enter':
        case ' ':
          {
            const cells = this.$refs.cells || [];
            const el = cells[this.focusIndex];
            if (el) el.click();
            break;
          }
      }
    },
    dayAriaLabel(day) {
      if (!day) return 'Empty';
      const hijriName = this.islamicMonths[day.hijri.month.number - 1] || '';
      return `${day.hijri.day} ${hijriName} ${day.hijri.year} AH, ${day.gregorian.day} ${day.gregorian.month.en} ${day.gregorian.year}`;
    },
    scheduleFetch() {
      if (this.fetchTimerId) clearTimeout(this.fetchTimerId);
      this.fetchTimerId = setTimeout(() => {
        this.fetchCalendarData();
      }, 150);
    },
    async fetchCalendarData() {
      this.loading = true;
      try {
        const key = `${this.currentYear}-${this.currentMonth + 1}`;
        if (this.calendarCache[key]) {
          this.calendarData = this.calendarCache[key];
        } else {
          const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${this.currentMonth + 1}/${this.currentYear}?adjustment=0`);
          const data = await response.json();
          this.calendarData = data.data;
          this.calendarCache[key] = data.data;
        }
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        this.calculateLocalCalendar();
      } finally {
        this.loading = false;
        this.$nextTick(() => this.setFocusIndex(0));
      }
    },
    calculateLocalCalendar() {
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      this.calendarData = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(this.currentYear, this.currentMonth, day);
        this.calendarData.push({
          gregorian: {
            date: date.toISOString().split('T')[0],
            day: day.toString(),
            month: {
              en: this.getMonthName(this.currentMonth)
            },
            year: this.currentYear.toString()
          },
          hijri: {
            day: (day % 30 + 1).toString(),
            // Approximation
            month: {
              number: (this.currentMonth + 1) % 12 || 12
            },
            year: (this.currentYear - 579).toString() // Approximation
          }
        });
      }
    },
    getMonthName(index) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[index];
    },
    getEventsForDay(day, month) {
      const key = `${Number(month)}-${Number(day)}`;
      return EVENTS_MAP[key] || [];
    },
    isCurrentDay(day) {
      if (!day) return false;
      return day.gregorian.date === this.todayISO;
    },
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
      this.fetchCalendarData();
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
      this.fetchCalendarData();
    },
    async showDayDetails(day) {
      if (!day) return;
      this.selectedDay = day;
      const dateKey = day.gregorian.date;
      try {
        this.prayerLoading = true;
        if (this.prayerCache[dateKey]) {
          this.prayerTimes = this.prayerCache[dateKey];
        } else {
          const response = await fetch(`https://api.aladhan.com/v1/timings/${dateKey}?latitude=51.508515&longitude=-0.1254872&method=2`);
          const data = await response.json();
          this.prayerTimes = data.data.timings;
          this.prayerCache[dateKey] = data.data.timings;
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        this.prayerTimes = null;
      } finally {
        this.prayerLoading = false;
      }
    }
  },
  mounted() {
    this.fetchCalendarData();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=template&id=926e7816&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=template&id=926e7816&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "islamic-calendar-container container-fluid py-5",
  role: "main",
  "aria-labelledby": "calendar-title"
};
const _hoisted_2 = {
  class: "calendar-header"
};
const _hoisted_3 = {
  class: "container",
  style: {
    "padding": "10px"
  }
};
const _hoisted_4 = {
  class: "mx-auto mb-4 next-step-card"
};
const _hoisted_5 = ["title", "aria-label"];
const _hoisted_6 = {
  class: "d-flex align-items-start gap-3 text-start"
};
const _hoisted_7 = {
  class: "flex-grow-1"
};
const _hoisted_8 = {
  class: "mb-2 d-inline-flex align-items-center gap-1 next-step-teaser"
};
const _hoisted_9 = {
  class: "mb-3 next-step-text"
};
const _hoisted_10 = {
  class: "d-flex flex-wrap gap-2"
};
const _hoisted_11 = {
  class: "calendar-controls container action-row action-row--spaced align-items-center flex-wrap gap-3 mb-4"
};
const _hoisted_12 = {
  class: "action-row__item text-center text-md-start"
};
const _hoisted_13 = {
  class: "action-row__item calendar-control__selectors d-flex flex-wrap gap-2 justify-content-center"
};
const _hoisted_14 = ["value"];
const _hoisted_15 = ["value"];
const _hoisted_16 = {
  class: "action-row__item text-center text-md-end"
};
const _hoisted_17 = {
  key: 0,
  class: "text-center my-3"
};
const _hoisted_18 = {
  class: "calendar-grid"
};
const _hoisted_19 = {
  class: "calendar-weekdays row g-0 text-center fw-semibold border-bottom",
  role: "row",
  "aria-label": "Weekday headers"
};
const _hoisted_20 = ["tabindex", "aria-selected", "aria-label", "onClick"];
const _hoisted_21 = {
  key: 0,
  class: "day-content"
};
const _hoisted_22 = {
  class: "fs-5 fw-bold"
};
const _hoisted_23 = {
  class: "text-muted small"
};
const _hoisted_24 = {
  key: 0,
  class: "badge bg-success mt-1"
};
const _hoisted_25 = {
  key: 1,
  class: "event-indicator position-absolute top-0 end-0 p-1"
};
const _hoisted_26 = {
  key: 0,
  class: "modal fade show d-block modal-backdrop-soft",
  tabindex: "-1",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "day-details-title"
};
const _hoisted_27 = {
  class: "modal-dialog modal-dialog-centered modal-xl"
};
const _hoisted_28 = {
  class: "modal-content"
};
const _hoisted_29 = {
  class: "modal-header"
};
const _hoisted_30 = {
  id: "day-details-title",
  class: "modal-title fw-bold"
};
const _hoisted_31 = {
  class: "modal-body"
};
const _hoisted_32 = {
  class: "text-muted mb-3"
};
const _hoisted_33 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_34 = {
  class: "list-group"
};
const _hoisted_35 = {
  key: 1,
  class: "text-center my-2"
};
const _hoisted_36 = {
  key: 2,
  class: "prayer-times"
};
const _hoisted_37 = {
  class: "row"
};
const _hoisted_38 = {
  class: "prayer-time d-flex justify-content-between"
};
const _hoisted_39 = {
  class: "fw-semibold"
};
const _hoisted_40 = {
  class: "modal-footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _$data$selectedDay$ev;
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("main", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    id: "calendar-title",
    class: "text-center fw-bold display-5 mb-4"
  }, "Islamic Hijri Calendar", -1 /* CACHED */)), _cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center container mb-3 lead"
  }, " The Islamic Hijri Calendar is a lunar calendar used by Muslims to determine religious events like Ramadan, Eid, and Hajj. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    title: $data.nextStepMinimized ? 'Restore' : 'Minimize',
    "aria-label": $data.nextStepMinimized ? 'Restore next step' : 'Minimize next step',
    onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleNextStepMinimized && $options.toggleNextStepMinimized(...args)),
    class: "next-step-toggle"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["fas", $data.nextStepMinimized ? 'fa-expand-alt' : 'fa-compress-alt']),
    "aria-hidden": "true"
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_5), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "flex-shrink-0 mt-1"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "next-step-icon-circle",
    role: "img",
    "aria-label": "Gentle date converter guide"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-clock",
    "aria-hidden": "true"
  })])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "mb-2 fw-semibold text-uppercase next-step-eyebrow"
  }, " NEXT STEP ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Minimized teaser "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [...(_cache[10] || (_cache[10] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/date",
    class: "fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 next-step-link",
    "aria-label": "Open the Prayer Times companion"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Convert Date "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-arrow-up-right-from-square next-step-link-icon",
    "aria-hidden": "true"
  })], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_9, [...(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Converted a date? Keep this Hijri calendar close for nearby events and prayer-friendly context. Reopen the ", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/date",
    class: "fw-semibold text-decoration-none next-step-link",
    "aria-label": "Reopen the converter"
  }, "Date converter", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" whenever you need another exact match. ", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [...(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "/date",
    class: "btn btn-sm fw-semibold text-white px-3 py-2 d-inline-flex align-items-center next-step-cta"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, "Open Hijri Date Converter"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "fas fa-exchange-alt text-white ms-2",
    "aria-hidden": "true"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Open the accessible Prayer Times experience")], -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$data.nextStepMinimized]])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[1] || (_cache[1] = (...args) => $options.previousMonth && $options.previousMonth(...args)),
    class: "premium-action-button premium-action-button--outline"
  }, [...(_cache[15] || (_cache[15] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-left",
    "aria-hidden": "true"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__label"
  }, "Previous Month", -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.currentMonth = $event),
    onChange: _cache[3] || (_cache[3] = (...args) => $options.scheduleFetch && $options.scheduleFetch(...args)),
    class: "form-select"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.islamicMonths, (month, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      value: index,
      key: month
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(month), 9 /* TEXT, PROPS */, _hoisted_14);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.currentMonth]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.currentYear = $event),
    onChange: _cache[5] || (_cache[5] = (...args) => $options.scheduleFetch && $options.scheduleFetch(...args)),
    class: "form-select"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.yearRange, year => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      value: year,
      key: year
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(year) + " AH ", 9 /* TEXT, PROPS */, _hoisted_15);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.currentYear]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[6] || (_cache[6] = (...args) => $options.nextMonth && $options.nextMonth(...args)),
    class: "premium-action-button premium-action-button--outline"
  }, [...(_cache[16] || (_cache[16] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-right",
    "aria-hidden": "true"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__label"
  }, "Next Month", -1 /* CACHED */)]))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Loading Indicator "), $data.loading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_17, [...(_cache[17] || (_cache[17] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Weekdays Header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.weekdays, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: day,
      class: "col py-2 bg-light"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Calendar Days "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "calendar-days",
    role: "grid",
    "aria-labelledby": 'calendar-title',
    onKeydown: _cache[7] || (_cache[7] = (...args) => $options.onGridKeydown && $options.onGridKeydown(...args)),
    ref: "grid"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.calendarWeeks, (week, weekIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: weekIndex,
      class: "row g-0 calendar-week",
      role: "row"
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(week, (day, dayIndex) => {
      var _day$events;
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: day ? day.gregorian.date : 'empty-' + weekIndex + '-' + dayIndex,
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["col calendar-day border text-center py-3 position-relative", {
          'bg-info-subtle': $options.isCurrentDay(day),
          'text-muted': !day || !day.isCurrentMonth,
          'bg-light': dayIndex === 5 || dayIndex === 6,
          'islamic-event': day && day.events && day.events.length > 0
        }]),
        role: "gridcell",
        tabindex: $options.computeTabIndex(weekIndex, dayIndex, day),
        "aria-selected": $options.isCurrentDay(day) ? 'true' : 'false',
        "aria-label": $options.dayAriaLabel(day),
        onClick: $event => $options.showDayDetails(day),
        ref_for: true,
        ref: "cells"
      }, [day ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.hijri.day), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.gregorian.day) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.gregorianShort[day.gregorian.month.en] || day.gregorian.month.en), 1 /* TEXT */), $options.isCurrentDay(day) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, "Today")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (_day$events = day.events) !== null && _day$events !== void 0 && _day$events.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [...(_cache[20] || (_cache[20] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-star-fill text-warning"
      }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 10 /* CLASS, PROPS */, _hoisted_20);
    }), 128 /* KEYED_FRAGMENT */))]);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Day Details Modal "), $data.selectedDay ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedDay.hijri.day) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.islamicMonths[$data.selectedDay.hijri.month.number - 1]) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedDay.hijri.year) + " AH ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "aria-label": "Close day details",
    onClick: _cache[8] || (_cache[8] = $event => $data.selectedDay = null)
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_32, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedDay.gregorian.day) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedDay.gregorian.month.en) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedDay.gregorian.year), 1 /* TEXT */), (_$data$selectedDay$ev = $data.selectedDay.events) !== null && _$data$selectedDay$ev !== void 0 && _$data$selectedDay$ev.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Islamic Events:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_34, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.selectedDay.events, (event, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: index,
      class: "list-group-item"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.prayerLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-success",
    role: "status"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading...")], -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.prayerTimes ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_36, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", null, "Prayer Times:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.prayerTimes, (time, name) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "col-6",
      key: name
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(name) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(time), 1 /* TEXT */)])]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-secondary",
    onClick: _cache[9] || (_cache[9] = $event => $data.selectedDay = null)
  }, "Close")])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=style&index=0&id=926e7816&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=style&index=0&id=926e7816&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/CalendarComponent.vue":
/*!********************************************************!*\
  !*** ./resources/components/vue/CalendarComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CalendarComponent_vue_vue_type_template_id_926e7816_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CalendarComponent.vue?vue&type=template&id=926e7816&scoped=true */ "./resources/components/vue/CalendarComponent.vue?vue&type=template&id=926e7816&scoped=true");
/* harmony import */ var _CalendarComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CalendarComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/CalendarComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _CalendarComponent_vue_vue_type_style_index_0_id_926e7816_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CalendarComponent.vue?vue&type=style&index=0&id=926e7816&scoped=true&lang=css */ "./resources/components/vue/CalendarComponent.vue?vue&type=style&index=0&id=926e7816&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_CalendarComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CalendarComponent_vue_vue_type_template_id_926e7816_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-926e7816"],['__file',"resources/components/vue/CalendarComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/CalendarComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/components/vue/CalendarComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CalendarComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CalendarComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CalendarComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/CalendarComponent.vue?vue&type=style&index=0&id=926e7816&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/components/vue/CalendarComponent.vue?vue&type=style&index=0&id=926e7816&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CalendarComponent_vue_vue_type_style_index_0_id_926e7816_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CalendarComponent.vue?vue&type=style&index=0&id=926e7816&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=style&index=0&id=926e7816&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/CalendarComponent.vue?vue&type=template&id=926e7816&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/components/vue/CalendarComponent.vue?vue&type=template&id=926e7816&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CalendarComponent_vue_vue_type_template_id_926e7816_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CalendarComponent_vue_vue_type_template_id_926e7816_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CalendarComponent.vue?vue&type=template&id=926e7816&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/CalendarComponent.vue?vue&type=template&id=926e7816&scoped=true");


/***/ })

}]);