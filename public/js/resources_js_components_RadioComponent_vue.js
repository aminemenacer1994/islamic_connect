"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_RadioComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=script&setup=true&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=script&setup=true&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var hls_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hls.js */ "./node_modules/hls.js/dist/hls.mjs");
/* harmony import */ var _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/bookmarkAuth */ "./resources/js/utils/bookmarkAuth.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




const RADIO_THEME_STORAGE_KEY = 'radioThemeMode';
const RADIO_DARK_BG = '#232529';
const RECITER_IMAGE_PLACEHOLDER = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
const PLAY_BUTTON_STYLE_ACTIVE = 'width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#10b981,#06b6ac);display:inline-flex;align-items:center;justify-content:center;border:none;box-shadow:0 10px 22px rgba(6,182,172,.25);transition:transform .12s ease, box-shadow .12s ease;position:relative;overflow:hidden';
const PLAY_BUTTON_STYLE_DISABLED = 'width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#94a3b8,#64748b);display:inline-flex;align-items:center;justify-content:center;border:none;box-shadow:none;transition:transform .12s ease, box-shadow .12s ease;position:relative;overflow:hidden';
const STATION_PROBE_TIMEOUT_MS = 4000;
const STATION_PROBE_CONCURRENCY = 5;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'RadioComponent',
  setup(__props, {
    expose: __expose
  }) {
    __expose();
    const isRadioDark = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const hlsInstancesByStationId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.markRaw)(new Map());
    const hlsTriedByStationId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({});
    const onGlobalThemeChange = event => {
      var _event$detail;
      if (typeof document === 'undefined') return;
      if (!document.body || !document.body.classList.contains('radio-route-page')) return;
      const isDark = !!(event !== null && event !== void 0 && (_event$detail = event.detail) !== null && _event$detail !== void 0 && _event$detail.isDark);
      isRadioDark.value = isDark;
      applyRadioThemePreference(isDark);
    };
    const destroyHlsForStation = id => {
      const existing = hlsInstancesByStationId.get(id);
      if (!existing) return;
      try {
        existing.destroy();
      } catch (_) {}
      hlsInstancesByStationId.delete(id);
    };
    const isNotSupportedPlaybackError = error => {
      if (!error) return false;
      if ((error === null || error === void 0 ? void 0 : error.name) === 'NotSupportedError') return true;
      const message = String((error === null || error === void 0 ? void 0 : error.message) || '');
      return message.toLowerCase().includes('no supported source');
    };
    const tryHlsPlayback = async (id, url) => {
      if (!url || typeof url !== 'string') return false;
      if (typeof document === 'undefined') return false;
      const audio = getAudioForStation(id);
      if (!audio) return false;
      if (!hls_js__WEBPACK_IMPORTED_MODULE_2__["default"].isSupported()) return false;
      destroyHlsForStation(id);
      hlsTriedByStationId[id] = true;
      return await new Promise(resolve => {
        let resolved = false;
        const finish = ok => {
          if (resolved) return;
          resolved = true;
          resolve(!!ok);
        };
        const timeout = window.setTimeout(() => finish(false), 9000);
        const hls = new hls_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
          enableWorker: true,
          lowLatencyMode: false
        });
        hlsInstancesByStationId.set(id, hls);
        const onFatalError = () => {
          window.clearTimeout(timeout);
          destroyHlsForStation(id);
          finish(false);
        };
        hls.on(hls_js__WEBPACK_IMPORTED_MODULE_2__["default"].Events.ERROR, (_evt, data) => {
          if (data !== null && data !== void 0 && data.fatal) onFatalError();
        });
        hls.on(hls_js__WEBPACK_IMPORTED_MODULE_2__["default"].Events.MEDIA_ATTACHED, () => {
          try {
            hls.loadSource(url);
          } catch (_) {
            onFatalError();
          }
        });
        hls.on(hls_js__WEBPACK_IMPORTED_MODULE_2__["default"].Events.MANIFEST_PARSED, async () => {
          try {
            await audio.play();
            window.clearTimeout(timeout);
            finish(true);
          } catch (_) {
            onFatalError();
          }
        });
        try {
          hls.attachMedia(audio);
        } catch (_) {
          onFatalError();
        }
      });
    };
    const prefersDarkColorScheme = () => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };
    const resolveInitialRadioTheme = () => {
      if (typeof window === 'undefined') return false;
      try {
        const stored = window.localStorage.getItem(RADIO_THEME_STORAGE_KEY);
        if (stored === 'dark') return true;
        if (stored === 'light') return false;
        return prefersDarkColorScheme();
      } catch (_) {
        return prefersDarkColorScheme();
      }
    };
    const applyRadioThemePreference = toDark => {
      if (typeof document === 'undefined') return;
      if (!document.body || !document.body.classList.contains('radio-route-page')) return;
      const theme = toDark ? 'dark' : 'light';
      const root = document.documentElement;
      const body = document.body;
      root.classList.toggle('dark-mode', !!toDark);
      root.setAttribute('data-bs-theme', theme);
      root.setAttribute('data-theme', theme);
      root.style.colorScheme = theme;
      root.style.backgroundColor = toDark ? RADIO_DARK_BG : '';
      body.classList.toggle('dark-mode', !!toDark);
      body.setAttribute('data-bs-theme', theme);
      body.setAttribute('data-theme', theme);
      body.style.colorScheme = theme;
      body.style.backgroundColor = toDark ? RADIO_DARK_BG : '';
    };
    const toggleRadioTheme = () => {
      if (typeof window !== 'undefined' && window.IC_THEME && typeof window.IC_THEME.toggle === 'function') {
        window.IC_THEME.toggle();
        return;
      }
      const next = !isRadioDark.value;
      isRadioDark.value = next;
      applyRadioThemePreference(next);
      try {
        window.localStorage.setItem(RADIO_THEME_STORAGE_KEY, next ? 'dark' : 'light');
      } catch (_) {}
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      const initial = resolveInitialRadioTheme();
      isRadioDark.value = initial;
      applyRadioThemePreference(initial);
      try {
        window.addEventListener('ic-theme-change', onGlobalThemeChange);
      } catch (_) {}
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
      try {
        window.removeEventListener('ic-theme-change', onGlobalThemeChange);
      } catch (_) {}
      try {
        hlsInstancesByStationId.forEach(hls => {
          try {
            hls.destroy();
          } catch (_) {}
        });
      } catch (_) {}
      hlsInstancesByStationId.clear();
    });
    const storageUserId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)((0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__.resolveClientUserId)());
    const isAuthenticated = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(!!storageUserId.value);
    const loginWarnings = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({});
    const warningTimers = {};
    const selectedStationForInfo = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const sanitizeName = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const simplifyReciterName = (value = '') => value.replace(/\b(radio|live|quran|station|channel|fm|fatwa|translation|tafsir|lecture)\b/gi, ' ').replace(/\s+/g, ' ').trim();
    const normalizeOnlineState = value => {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') return value !== 0;
      if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (['0', 'false', 'offline', 'off', 'down', 'inactive', 'disconnected'].includes(normalized)) {
          return false;
        }
        if (['1', 'true', 'online', 'on', 'up', 'active', 'live', 'connected'].includes(normalized)) {
          return true;
        }
      }
      return null;
    };
    const buildReciterImageUrl = (name = '') => {
      const seed = encodeURIComponent(name || 'quran-radio');
      return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundType=gradientLinear`;
    };
    const isGeneratedOrPlaceholderImage = (url = '') => {
      if (!url || typeof url !== 'string') return true;
      return url.includes('api.dicebear.com') || url === RECITER_IMAGE_PLACEHOLDER;
    };
    const isRealFaceImage = (url = '') => !isGeneratedOrPlaceholderImage(url);
    const imageLookupCache = new Map();
    const reciterWikipediaTitles = (0,vue__WEBPACK_IMPORTED_MODULE_0__.markRaw)({
      'mishary rashid alafasy': ['Mishary_Rashid_Alafasy'],
      'yasser al dosari': ['Yasser_Al-Dosari'],
      'abdul basit abdul samad': ["Abdul_Basit_'Abd_us-Samad"],
      'saad al ghamdi': ['Saad_Al-Ghamdi'],
      'maher al muaiqly': ['Maher_Al_Muaiqly'],
      'abdul rahman al sudais': ['Abdul-Rahman_Al-Sudais'],
      'saud al shuraim': ['Saud_Al-Shuraim'],
      'ahmad al ajmi': ['Ahmed_bin_Ali_Al-Ajmi'],
      'mahmoud khalil al hussary': ['Mahmoud_Khalil_Al-Hussary'],
      'nasser al qatami': ['Nasser_Al-Qatami'],
      'ali jaber': ['Ali_Jaber'],
      'muhammad al luhaidan': ['Muhammad_Al-Luhaidan']
    });
    const buildWikipediaTitleCandidates = (name = '') => {
      const normalized = sanitizeName(name);
      return reciterWikipediaTitles[normalized] || [];
    };
    const fetchWikipediaImage = async title => {
      var _data$thumbnail, _data$originalimage;
      const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      });
      if (!response.ok) return '';
      const data = await response.json();
      return (data === null || data === void 0 || (_data$thumbnail = data.thumbnail) === null || _data$thumbnail === void 0 ? void 0 : _data$thumbnail.source) || (data === null || data === void 0 || (_data$originalimage = data.originalimage) === null || _data$originalimage === void 0 ? void 0 : _data$originalimage.source) || '';
    };
    const fetchWikipediaImageFromSearch = async query => {
      var _data$query, _pages$;
      const params = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: query,
        gsrlimit: '1',
        prop: 'pageimages',
        piprop: 'thumbnail',
        pithumbsize: '600',
        format: 'json',
        origin: '*'
      });
      const endpoint = `https://en.wikipedia.org/w/api.php?${params.toString()}`;
      const response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      });
      if (!response.ok) return '';
      const data = await response.json();
      const pages = data !== null && data !== void 0 && (_data$query = data.query) !== null && _data$query !== void 0 && _data$query.pages ? Object.values(data.query.pages) : [];
      return ((_pages$ = pages[0]) === null || _pages$ === void 0 || (_pages$ = _pages$.thumbnail) === null || _pages$ === void 0 ? void 0 : _pages$.source) || '';
    };
    const resolveImamImageUrl = async (name = '') => {
      const cleanName = simplifyReciterName(name);
      const key = sanitizeName(cleanName || name);
      if (!key) return buildReciterImageUrl(name);
      if (imageLookupCache.has(key)) return imageLookupCache.get(key);
      const searchQueries = [`${cleanName} quran reciter`, `${cleanName} imam`, cleanName].filter(Boolean);
      for (const query of searchQueries) {
        try {
          const imageUrl = await fetchWikipediaImageFromSearch(query);
          if (imageUrl) {
            imageLookupCache.set(key, imageUrl);
            return imageUrl;
          }
        } catch (error) {
          // keep trying next query
        }
      }
      const titles = buildWikipediaTitleCandidates(cleanName || name);
      for (const title of titles) {
        try {
          const imageUrl = await fetchWikipediaImage(title);
          if (imageUrl) {
            imageLookupCache.set(key, imageUrl);
            return imageUrl;
          }
        } catch (error) {
          // keep trying next candidate title
        }
      }
      const fallbackImage = buildReciterImageUrl(cleanName || name);
      imageLookupCache.set(key, fallbackImage);
      return fallbackImage;
    };
    const imamProfileIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.markRaw)({
      'mishary rashid alafasy': {
        imageUrl: buildReciterImageUrl('Mishary Rashid Alafasy'),
        shortInfo: 'Kuwaiti reciter known for clear articulation and balanced murattal flow.',
        longInfo: 'Mishary Rashid Alafasy is widely recognized for precise tajwid and a steady pace that supports memorization and attentive listening. His recitation style is often used by students who want consistent rhythm and clear pronunciation.'
      },
      'yasser al dosari': {
        imageUrl: buildReciterImageUrl('Yasser Al-Dosari'),
        shortInfo: 'Saudi reciter with emotive, reflective delivery.',
        longInfo: 'Yasser Al-Dosari is known for expressive recitation that blends clarity with emotional depth. His station is often preferred for reflective listening and focused revision sessions.'
      },
      'abdul basit abdul samad': {
        imageUrl: buildReciterImageUrl('Abdul Basit Abdul Samad'),
        shortInfo: 'Legendary Egyptian reciter with a classic mujawwad tradition.',
        longInfo: 'Abdul Basit Abdul Samad remains one of the most influential Qur an reciters globally. His powerful breath control and distinct tonal style shaped generations of recitation practice.'
      },
      'saad al ghamdi': {
        imageUrl: buildReciterImageUrl('Saad Al-Ghamdi'),
        shortInfo: 'Saudi reciter known for smooth pacing and classroom-friendly style.',
        longInfo: 'Saad Al-Ghamdi is frequently chosen for daily review and repetition because his recitation is stable and easy to follow over longer sessions.'
      },
      'maher al muaiqly': {
        imageUrl: buildReciterImageUrl('Maher Al-Muaiqly'),
        shortInfo: 'Saudi imam with measured, calm, and highly structured recitation.',
        longInfo: 'Maher Al-Muaiqly is known for balanced tempo and clean articulation. Many learners use his recordings to support tajwid correction and consistent memorization cycles.'
      },
      'abdul rahman al sudais': {
        imageUrl: buildReciterImageUrl('Abdul Rahman Al-Sudais'),
        shortInfo: 'Makkah imam with recognizable tone and strong cadence.',
        longInfo: 'Abdul Rahman Al-Sudais is globally recognized through his leadership in the Haram. His recitation style emphasizes strong cadence and clear phrase boundaries.'
      },
      'saud al shuraim': {
        imageUrl: buildReciterImageUrl('Saud Al-Shuraim'),
        shortInfo: 'Saudi reciter with deliberate timing and well-marked stops.',
        longInfo: 'Saud Al-Shuraim is known for disciplined pacing and a recitation pattern that helps listeners identify waqf points and verse structure.'
      },
      'ahmad al ajmi': {
        imageUrl: buildReciterImageUrl('Ahmad Al-Ajmi'),
        shortInfo: 'Saudi reciter with soft, melodic murattal delivery.',
        longInfo: 'Ahmad Al-Ajmi is appreciated for a calm voice profile and smooth transitions, making his station useful for both passive listening and active review.'
      },
      'mahmoud khalil al hussary': {
        imageUrl: buildReciterImageUrl('Mahmoud Khalil Al-Hussary'),
        shortInfo: 'Egyptian master reciter famous for tajwid precision.',
        longInfo: 'Mahmoud Khalil Al-Hussary is often used as a reference for tajwid accuracy. His recitation is methodical and widely trusted for pronunciation training.'
      },
      'nasser al qatami': {
        imageUrl: buildReciterImageUrl('Nasser Al Qatami'),
        shortInfo: 'Saudi reciter with strong vocal texture and clear rhythm.',
        longInfo: 'Nasser Al-Qatami combines clear rhythm with expressive tone, making his station suitable for users who prefer energetic yet controlled delivery.'
      },
      'ali jaber': {
        imageUrl: buildReciterImageUrl('Ali Jaber'),
        shortInfo: 'Classic Makkah style with composed and dignified cadence.',
        longInfo: 'Ali Jaber remains highly respected for his elegant, measured recitation style. His recordings are often revisited for traditional cadence and clarity.'
      },
      'muhammad al luhaidan': {
        imageUrl: buildReciterImageUrl('Muhammad Al-Luhaidan'),
        shortInfo: 'Saudi reciter with reflective tone and balanced tempo.',
        longInfo: 'Muhammad Al-Luhaidan is known for reflective pacing and smooth tonal movement across longer passages, useful for sustained listening sessions.'
      }
    });
    const alquranMetaByIdentifier = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    const alquranMetaByName = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    const defaultPopularReciters = (0,vue__WEBPACK_IMPORTED_MODULE_0__.markRaw)([{
      id: 1,
      name: 'Mishary Rashid Alafasy',
      url: 'https://qurango.net/radio/mishary_alafasy',
      fallbackUrl: 'https://backup.qurango.net/mishary_alafasy.mp3',
      style: 'Murattal',
      country: 'Kuwait',
      imageUrl: buildReciterImageUrl('Mishary Rashid Alafasy'),
      imageLoaded: true
    }, {
      id: 2,
      name: 'Yasser Al-Dosari',
      url: 'https://qurango.net/radio/yasser_aldosari',
      fallbackUrl: 'https://backup.qurango.net/yasser_aldosari.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Yasser Al-Dosari'),
      imageLoaded: true
    }, {
      id: 6,
      name: 'Abdul Basit Abdul Samad',
      url: 'https://qurango.net/radio/abdulbasit_abdulsamad_mujawwad',
      fallbackUrl: 'https://backup.qurango.net/abdulbasit_abdulsamad.mp3',
      style: 'Mujawwad',
      country: 'Egypt',
      imageUrl: buildReciterImageUrl('Abdul Basit Abdul Samad'),
      imageLoaded: true
    }, {
      id: 3,
      name: 'Saad Al-Ghamdi',
      url: 'https://qurango.net/radio/saad_alghamdi',
      fallbackUrl: 'https://backup.qurango.net/saad_alghamdi.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Saad Al-Ghamdi'),
      imageLoaded: true
    }, {
      id: 4,
      name: 'Maher Al-Muaiqly',
      url: 'https://qurango.net/radio/maher_almuaiqly',
      fallbackUrl: 'https://backup.qurango.net/maher_almuaiqly.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Maher Al-Muaiqly'),
      imageLoaded: true
    }, {
      id: 5,
      name: 'Abdul Rahman Al-Sudais',
      url: 'https://qurango.net/radio/abdurrahman_alsudais',
      fallbackUrl: 'https://backup.qurango.net/abdurrahman_alsudais.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Abdul Rahman Al-Sudais'),
      imageLoaded: true
    }, {
      id: 7,
      name: 'Saud Al-Shuraim',
      url: 'https://qurango.net/radio/saud_alshuraim',
      fallbackUrl: 'https://backup.qurango.net/saud_alshuraim.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Saud Al-Shuraim'),
      imageLoaded: true
    }, {
      id: 8,
      name: 'Ahmad Al-Ajmi',
      url: 'https://qurango.net/radio/ahmad_alajmi',
      fallbackUrl: 'https://backup.qurango.net/ahmad_alajmi.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Ahmad Al-Ajmi'),
      imageLoaded: true
    }, {
      id: 9,
      name: 'Mahmoud Khalil Al-Hussary',
      url: 'https://qurango.net/radio/mahmoud_khalil_alhussary',
      fallbackUrl: 'https://backup.qurango.net/mahmoud_khalil_alhussary.mp3',
      style: 'Murattal',
      country: 'Egypt',
      imageUrl: buildReciterImageUrl('Mahmoud Khalil Al-Hussary'),
      imageLoaded: true
    }, {
      id: 10,
      name: 'Nasser Al Qatami',
      url: 'https://qurango.net/radio/nasser_alqatami',
      fallbackUrl: 'https://backup.qurango.net/nasser_alqatami.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Nasser Al Qatami'),
      imageLoaded: true
    }, {
      id: 11,
      name: 'Ali Jaber',
      url: 'https://qurango.net/radio/ali_jaber',
      fallbackUrl: 'https://backup.qurango.net/ali_jaber.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Ali Jaber'),
      imageLoaded: true
    }, {
      id: 12,
      name: 'Muhammad Al-Luhaidan',
      url: 'https://qurango.net/radio/muhammad_alluhaidan',
      fallbackUrl: 'https://backup.qurango.net/muhammad_alluhaidan.mp3',
      style: 'Murattal',
      country: 'Saudi Arabia',
      imageUrl: buildReciterImageUrl('Muhammad Al-Luhaidan'),
      imageLoaded: true
    }]);

    // State
    const showSuggestions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const filteredSuggestions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const highlightIndex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(-1);
    const searchQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const selectedCategory = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('All Categories');
    // Infinite scroll state
    const itemsPerPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(8);
    const itemsToShow = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(itemsPerPage.value);
    const isLoadingMore = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const infiniteScrollSentinel = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const audioMountForId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null); // only mount audio element for active station
    let observer = null;
    const stations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const filteredStations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const currentAudio = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const volumes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({}); // Per-station volume
    const likedStations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const recentlyPlayed = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const showLiked = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const showRecentlyPlayed = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const currentTimes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    const durations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    const playingStates = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    const playbackErrors = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    const isLoading = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const fetchError = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const currentPlayingStationId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const audioRefs = (0,vue__WEBPACK_IMPORTED_MODULE_0__.reactive)({});
    const viewMode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('grid'); // 'grid' or 'list'
    const sortBy = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('default'); // 'default', 'name_asc', 'name_desc', 'listeners_desc'
    let listenerInterval = null;
    const audioPlayerJustOpened = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const focusedStationId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const liveAnnouncement = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const stationAvailabilityChecks = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    const stationProbeRunId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const findStationById = id => {
      const normalizedId = Number(id);
      return stations.value.find(station => Number(station.id) === normalizedId) || likedStations.value.find(station => Number(station.id) === normalizedId) || recentlyPlayed.value.find(station => Number(station.id) === normalizedId) || defaultPopularReciters.find(station => Number(station.id) === normalizedId) || null;
    };
    const resolveStation = stationOrId => {
      if (stationOrId && typeof stationOrId === 'object') {
        return findStationById(stationOrId.id) || stationOrId;
      }
      return findStationById(stationOrId);
    };
    const applyOnlineStateToList = (list, id, isOnline) => {
      if (!Array.isArray(list)) return;
      const normalizedId = Number(id);
      const station = list.find(item => Number(item === null || item === void 0 ? void 0 : item.id) === normalizedId);
      if (station) station.online = isOnline;
    };
    const setStationOnlineState = (id, isOnline) => {
      applyOnlineStateToList(stations.value, id, isOnline);
      applyOnlineStateToList(likedStations.value, id, isOnline);
      applyOnlineStateToList(recentlyPlayed.value, id, isOnline);
      if (selectedStationForInfo.value && Number(selectedStationForInfo.value.id) === Number(id)) {
        selectedStationForInfo.value = _objectSpread(_objectSpread({}, selectedStationForInfo.value), {}, {
          online: isOnline
        });
      }
    };
    const isStationOffline = stationOrId => {
      var _resolveStation;
      return normalizeOnlineState((_resolveStation = resolveStation(stationOrId)) === null || _resolveStation === void 0 ? void 0 : _resolveStation.online) === false;
    };
    const isStationOnline = stationOrId => {
      var _resolveStation2;
      return normalizeOnlineState((_resolveStation2 = resolveStation(stationOrId)) === null || _resolveStation2 === void 0 ? void 0 : _resolveStation2.online) === true;
    };
    const isStationStatusPending = stationOrId => {
      const station = resolveStation(stationOrId);
      return !!station && !!stationAvailabilityChecks.value[station.id];
    };
    const isStationPlayable = stationOrId => {
      const station = resolveStation(stationOrId);
      if (!(station !== null && station !== void 0 && station.url)) return false;
      if (isStationStatusPending(station)) return false;
      return isStationOnline(station);
    };
    const playButtonStyle = stationOrId => isStationPlayable(stationOrId) ? PLAY_BUTTON_STYLE_ACTIVE : PLAY_BUTTON_STYLE_DISABLED;
    const getPlayButtonTitle = stationOrId => {
      const station = resolveStation(stationOrId);
      if (!(station !== null && station !== void 0 && station.url)) return 'Station stream is unavailable';
      if (isStationStatusPending(station)) return 'Checking station status...';
      if (isStationOffline(station)) return 'Station is offline';
      if (!isStationOnline(station)) return 'Checking station status...';
      return '';
    };
    const probeStreamUrl = (url, timeoutMs = STATION_PROBE_TIMEOUT_MS) => new Promise(resolve => {
      if (!url || typeof url !== 'string') {
        resolve(false);
        return;
      }
      const probeAudio = new Audio();
      let settled = false;
      let timeoutId = null;
      const finish = isOnline => {
        if (settled) return;
        settled = true;
        if (timeoutId) clearTimeout(timeoutId);
        probeAudio.removeEventListener('loadedmetadata', onReady);
        probeAudio.removeEventListener('canplay', onReady);
        probeAudio.removeEventListener('canplaythrough', onReady);
        probeAudio.removeEventListener('error', onError);
        try {
          probeAudio.pause();
          probeAudio.src = '';
          probeAudio.load();
        } catch (_unused) {
          // ignore cleanup errors
        }
        resolve(isOnline);
      };
      const onReady = () => finish(true);
      const onError = () => finish(false);
      timeoutId = setTimeout(() => finish(false), timeoutMs);
      probeAudio.preload = 'metadata';
      probeAudio.addEventListener('loadedmetadata', onReady);
      probeAudio.addEventListener('canplay', onReady);
      probeAudio.addEventListener('canplaythrough', onReady);
      probeAudio.addEventListener('error', onError);
      try {
        probeAudio.src = url;
        probeAudio.load();
      } catch (_unused2) {
        finish(false);
      }
    });
    const probeStationAvailability = async station => {
      if (!(station !== null && station !== void 0 && station.url)) return false;
      const primaryIsOnline = await probeStreamUrl(station.url);
      if (primaryIsOnline) return true;
      if (station.fallbackUrl) {
        return probeStreamUrl(station.fallbackUrl);
      }
      return false;
    };
    const probeStationsAvailability = async (stationList = []) => {
      const runId = ++stationProbeRunId.value;
      stationAvailabilityChecks.value = {};
      const uniqueStations = [];
      const seenIds = new Set();
      stationList.forEach(station => {
        if (!(station !== null && station !== void 0 && station.id) || !(station !== null && station !== void 0 && station.url)) return;
        const normalizedId = Number(station.id);
        if (seenIds.has(normalizedId)) return;
        seenIds.add(normalizedId);
        uniqueStations.push(station);
      });
      if (!uniqueStations.length) return;
      let cursor = 0;
      const workers = Array.from({
        length: Math.min(STATION_PROBE_CONCURRENCY, uniqueStations.length)
      }, async () => {
        while (cursor < uniqueStations.length) {
          const station = uniqueStations[cursor++];
          if (!station || stationProbeRunId.value !== runId) return;
          stationAvailabilityChecks.value[station.id] = true;
          const isOnline = await probeStationAvailability(station);
          if (stationProbeRunId.value !== runId) return;
          setStationOnlineState(station.id, isOnline);
          delete stationAvailabilityChecks.value[station.id];
        }
      });
      await Promise.all(workers);
      if (stationProbeRunId.value === runId) {
        stationAvailabilityChecks.value = {};
      }
    };

    // Cached search helpers
    const lowerSearchQuery = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => searchQuery.value.trim().toLowerCase());
    const searchRegex = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const raw = searchQuery.value || '';
      if (!raw) return null;
      // Keep previous behavior: use raw query in regex (case-insensitive)
      try {
        return new RegExp(`(${raw})`, 'gi');
      } catch (_unused3) {
        return null;
      }
    });

    // Keyboard navigation helpers
    const onStationKeydown = (id, event) => {
      const key = event.key;
      // Activate
      if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        togglePlay(id);
        return;
      }
      // Like/Unlike
      if (key.toLowerCase() === 'l') {
        event.preventDefault();
        const station = stations.value.find(s => s.id === id) || visibleStations.value.find(s => s.id === id);
        if (station) toggleLike(station);
        return;
      }
      // Mute/Unmute current if same station
      if (key.toLowerCase() === 'm' && currentPlayingStationId.value) {
        event.preventDefault();
        toggleMute(currentPlayingStationId.value);
        return;
      }
      // Focus movement
      if (['ArrowDown', 'ArrowRight'].includes(key)) {
        event.preventDefault();
        focusStationByOffset(id, +1);
      } else if (['ArrowUp', 'ArrowLeft'].includes(key)) {
        event.preventDefault();
        focusStationByOffset(id, -1);
      } else if (key === 'Home') {
        event.preventDefault();
        focusStationByIndex(0);
      } else if (key === 'End') {
        event.preventDefault();
        const nodes = getStationNodes();
        if (nodes.length) nodes[nodes.length - 1].focus();
      }
    };
    const getStationNodes = () => {
      return Array.from(document.querySelectorAll('[data-station-id]'));
    };
    const focusStationByOffset = (currentId, delta) => {
      const nodes = getStationNodes();
      const idx = nodes.findIndex(n => String(n.getAttribute('data-station-id')) === String(currentId));
      if (idx === -1) return;
      let next = idx + delta;
      if (next < 0) next = 0;
      if (next >= nodes.length) next = nodes.length - 1;
      const nextNode = nodes[next];
      nextNode === null || nextNode === void 0 || nextNode.focus();
      const attrId = nextNode === null || nextNode === void 0 ? void 0 : nextNode.getAttribute('data-station-id');
      if (attrId) focusedStationId.value = Number(attrId);
    };
    const focusStationByIndex = index => {
      const nodes = getStationNodes();
      if (!nodes.length) return;
      const i = Math.max(0, Math.min(index, nodes.length - 1));
      const node = nodes[i];
      node.focus();
      const attrId = node.getAttribute('data-station-id');
      if (attrId) focusedStationId.value = Number(attrId);
    };

    // (moved below) Keep roving tabindex aligned with data

    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      // Initialize focus after stations load
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
        if (visibleStations.value.length && !focusedStationId.value) {
          focusedStationId.value = visibleStations.value[0].id;
        }
      });
    });

    // Computed
    const sortedStations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      // Avoid extra array cloning when default sort
      if (sortBy.value === 'default') return filteredStations.value;
      const stationsToSort = [...filteredStations.value];
      switch (sortBy.value) {
        case 'name_asc':
          return stationsToSort.sort((a, b) => a.name.localeCompare(b.name));
        case 'name_desc':
          return stationsToSort.sort((a, b) => b.name.localeCompare(a.name));
        case 'listeners_desc':
          return stationsToSort.sort((a, b) => (b.listeners || 0) - (a.listeners || 0));
        default:
          return stationsToSort;
      }
    });
    const visibleStations = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => sortedStations.value.slice(0, itemsToShow.value));
    const allLoaded = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => itemsToShow.value >= sortedStations.value.length);

    // Keep roving tabindex aligned with data
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(visibleStations, list => {
      const ids = list.map(s => s.id);
      if (!ids.length) return;
      if (!focusedStationId.value || !ids.includes(focusedStationId.value)) {
        focusedStationId.value = ids[0];
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => focusStationByIndex(0));
      }
    });
    const availableCategories = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => [...new Set(stations.value.map(station => station.category || 'Recitation'))]);
    const currentlyPlayingStation = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      if (!currentPlayingStationId.value) return null;
      return stations.value.find(s => s.id === currentPlayingStationId.value);
    });
    const selectedStationLongInfo = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const station = selectedStationForInfo.value;
      if (!station) return '';
      return station.longInfo || station.shortInfo || 'Biography is not available yet for this reciter.';
    });

    // Infinite scroll helpers
    const loadMore = () => {
      if (isLoadingMore.value) return;
      if (itemsToShow.value >= sortedStations.value.length) {
        if (observer) observer.disconnect();
        return;
      }
      isLoadingMore.value = true;
      setTimeout(() => {
        itemsToShow.value = Math.min(itemsToShow.value + itemsPerPage.value, sortedStations.value.length);
        isLoadingMore.value = false;
        if (itemsToShow.value >= sortedStations.value.length && observer) observer.disconnect();
      }, 120);
    };
    const setupObserver = async () => {
      await (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)();
      if (!infiniteScrollSentinel.value) return;
      if (observer) observer.disconnect();
      observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          loadMore();
        }
      }, {
        root: null,
        rootMargin: '0px 0px 400px 0px',
        threshold: 0
      });
      observer.observe(infiniteScrollSentinel.value);
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(sortedStations, () => {
      itemsToShow.value = itemsPerPage.value;
      setupObserver();
      // if current playing is no longer in the list view, keep audio mounted but ensure ref remains
    });

    // Methods
    const getAudioForStation = id => audioRefs[id];
    const isFilterOpen = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true); // Start open by default (or false if you prefer collapsed)
    const showAdvancedFilters = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

    // Optional: computed to show active filter count
    const hasActiveFilters = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return searchQuery.value || selectedCategory.value !== 'All Categories' || sortBy.value !== 'default';
    });
    const hasAdvancedFiltersActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return selectedCategory.value !== 'All Categories' || sortBy.value !== 'default';
    });
    const activeFilterCount = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      let count = 0;
      if (searchQuery.value) count++;
      if (selectedCategory.value !== 'All Categories') count++;
      if (sortBy.value !== 'default') count++;
      return count;
    });
    const closePlayer = () => {
      if (currentPlayingStationId.value) {
        destroyHlsForStation(currentPlayingStationId.value);
        const audio = getAudioForStation(currentPlayingStationId.value);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        playingStates.value[currentPlayingStationId.value] = false;
        currentAudio.value = null;
        currentPlayingStationId.value = null;
        audioMountForId.value = null;
      }
    };
    const initializeAudio = async id => {
      if (audioMountForId.value !== id) {
        if (currentPlayingStationId.value && currentPlayingStationId.value !== id) {
          destroyHlsForStation(currentPlayingStationId.value);
        }
        audioMountForId.value = id;
        await (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)();
      }
      const audio = getAudioForStation(id);
      if (audio) {
        destroyHlsForStation(id);
      }
      if (audio && !audio.src) {
        const station = defaultPopularReciters.find(s => s.id === id) || stations.value.find(s => s.id === id);
        if (station) {
          audio.src = station.url;
        }
      }
    };
    const resolveProfile = name => {
      const normalized = sanitizeName(name);
      if (!normalized) return null;
      if (imamProfileIndex[normalized]) return imamProfileIndex[normalized];
      const foundKey = Object.keys(imamProfileIndex).find(key => normalized.includes(key) || key.includes(normalized));
      return foundKey ? imamProfileIndex[foundKey] : null;
    };
    const resolveAlquranMeta = station => {
      const normalized = sanitizeName(station.name);
      if (!normalized) return null;
      if (alquranMetaByName.value[normalized]) return alquranMetaByName.value[normalized];
      const foundKey = Object.keys(alquranMetaByName.value).find(key => normalized.includes(key) || key.includes(normalized));
      return foundKey ? alquranMetaByName.value[foundKey] : null;
    };
    const enrichStation = station => {
      const profile = resolveProfile(station.name);
      const meta = resolveAlquranMeta(station);
      const primaryImage = typeof station.imageUrl === 'string' && station.imageUrl.startsWith('http') ? station.imageUrl : (profile === null || profile === void 0 ? void 0 : profile.imageUrl) || buildReciterImageUrl();
      const metadata = {
        source: 'Quran Radio',
        identifier: ((meta === null || meta === void 0 ? void 0 : meta.identifier) || 'reciter').replace(/^ar\./i, ''),
        language: (meta === null || meta === void 0 ? void 0 : meta.language) || 'ar',
        format: (meta === null || meta === void 0 ? void 0 : meta.format) || 'audio',
        type: (meta === null || meta === void 0 ? void 0 : meta.type) || station.category || 'recitation'
      };
      return _objectSpread(_objectSpread({}, station), {}, {
        online: normalizeOnlineState(station.online),
        imageUrl: primaryImage || buildReciterImageUrl(),
        shortInfo: (profile === null || profile === void 0 ? void 0 : profile.shortInfo) || station.shortInfo || '',
        longInfo: (profile === null || profile === void 0 ? void 0 : profile.longInfo) || station.longInfo || '',
        metadata
      });
    };
    const dedupeStationsByReciterName = (stationList = []) => {
      const bestByName = new Map();
      stationList.forEach(station => {
        if (!(station !== null && station !== void 0 && station.name)) return;
        const key = sanitizeName(simplifyReciterName(station.name) || station.name);
        if (!key) return;
        const current = bestByName.get(key);
        if (!current) {
          bestByName.set(key, station);
          return;
        }
        const score = entry => {
          const hasRealFace = isRealFaceImage(entry === null || entry === void 0 ? void 0 : entry.imageUrl) ? 1000 : 0;
          const hasValidUrl = isValidUrl(entry === null || entry === void 0 ? void 0 : entry.url) ? 100 : 0;
          const listenerScore = Number((entry === null || entry === void 0 ? void 0 : entry.listeners) || 0);
          return hasRealFace + hasValidUrl + listenerScore;
        };
        if (score(station) > score(current)) {
          bestByName.set(key, station);
        }
      });
      return Array.from(bestByName.values());
    };
    const hydrateStationImages = async (stationList = []) => {
      const batchSize = 6;
      for (let i = 0; i < stationList.length; i += batchSize) {
        const batch = stationList.slice(i, i + batchSize);
        await Promise.all(batch.map(async station => {
          if (!(station !== null && station !== void 0 && station.name)) return;
          const resolvedImage = await resolveImamImageUrl(station.name);
          if (resolvedImage) station.imageUrl = resolvedImage;
        }));
      }
      return stationList.filter(station => isRealFaceImage(station === null || station === void 0 ? void 0 : station.imageUrl));
    };
    const hydrateStationImagesInBackground = (stationList = []) => {
      if (!Array.isArray(stationList) || !stationList.length) return;
      setTimeout(() => {
        hydrateStationImages(stationList).then(faceStations => {
          const faceOnlyStations = dedupeStationsByReciterName(Array.isArray(faceStations) ? faceStations : []);
          stations.value = faceOnlyStations;
          runSearch();
          likedStations.value = likedStations.value.filter(s => faceOnlyStations.some(station => station.id === s.id));
          recentlyPlayed.value = recentlyPlayed.value.filter(s => faceOnlyStations.some(station => station.id === s.id));
        }).catch(() => {});
      }, 0);
    };
    const fetchAlquranReciterMetadata = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/edition/format/audio');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        const editions = Array.isArray(payload === null || payload === void 0 ? void 0 : payload.data) ? payload.data : [];
        const identifierMap = {};
        const nameMap = {};
        editions.forEach(edition => {
          if (!(edition !== null && edition !== void 0 && edition.identifier)) return;
          const item = {
            identifier: edition.identifier,
            englishName: edition.englishName || edition.name || 'Unknown',
            language: edition.language || 'ar',
            format: edition.format || 'audio',
            type: edition.type || 'recitation'
          };
          identifierMap[item.identifier] = item;
          const nameKey = sanitizeName(item.englishName);
          if (nameKey && !nameMap[nameKey]) {
            nameMap[nameKey] = item;
          }
        });
        alquranMetaByIdentifier.value = identifierMap;
        alquranMetaByName.value = nameMap;
      } catch (error) {
        console.warn('Unable to fetch reciter metadata', error);
      }
    };
    const openStationInfo = async station => {
      const enriched = enrichStation(station);
      selectedStationForInfo.value = _objectSpread(_objectSpread({}, enriched), {}, {
        longInfo: enriched.longInfo || enriched.shortInfo || 'Biography is not available yet for this reciter.'
      });
      const resolvedImage = await resolveImamImageUrl(enriched.name);
      if (!resolvedImage) return;
      station.imageUrl = resolvedImage;
      if (selectedStationForInfo.value && selectedStationForInfo.value.id === station.id) {
        selectedStationForInfo.value = _objectSpread(_objectSpread({}, selectedStationForInfo.value), {}, {
          imageUrl: resolvedImage
        });
      }
    };
    const closeStationInfo = () => {
      selectedStationForInfo.value = null;
    };
    const onGlobalKeydown = event => {
      if (event.key === 'Escape' && selectedStationForInfo.value) {
        closeStationInfo();
      }
    };
    const handleStationImageError = station => {
      const generatedFallback = buildReciterImageUrl((station === null || station === void 0 ? void 0 : station.name) || '');
      station.imageUrl = (station === null || station === void 0 ? void 0 : station.imageUrl) === generatedFallback ? RECITER_IMAGE_PLACEHOLDER : generatedFallback;
    };
    const pauseAllAudio = () => {
      if (currentAudio.value) {
        // Find id of current audio
        let currentId = null;
        for (const id in audioRefs) {
          if (audioRefs[id] === currentAudio.value) {
            currentId = id;
            break;
          }
        }
        if (currentId) {
          currentAudio.value.pause();
          currentAudio.value.currentTime = 0;
          playingStates.value[currentId] = false;
          playbackErrors.value[currentId] = null;
          currentPlayingStationId.value = null;
        }
        currentAudio.value = null;
      }
      // Ensure all playing states are reset
      Object.keys(playingStates.value).forEach(id => {
        if (playingStates.value[id]) {
          const audio = getAudioForStation(id);
          if (audio) audio.pause();
          playingStates.value[id] = false;
        }
      });
    };
    const isPlaying = id => !!playingStates.value[id];
    const applyVolume = id => {
      const audio = getAudioForStation(id);
      if (audio && volumes.value[id] !== undefined) {
        audio.volume = volumes.value[id] / 100;
      }
    };
    const addToRecentlyPlayed = id => {
      if (!isAuthenticated.value) return;
      const station = defaultPopularReciters.find(s => s.id === id) || stations.value.find(s => s.id === id);
      if (!station) return;
      recentlyPlayed.value = recentlyPlayed.value.filter(s => s.id !== id);
      recentlyPlayed.value.unshift(_objectSpread(_objectSpread({}, station), {}, {
        lastPlayed: new Date().toISOString()
      }));
      if (recentlyPlayed.value.length > 10) recentlyPlayed.value.pop();
      saveRecentlyPlayed();
    };
    const togglePlay = async (id, {
      force: _force = false
    } = {}) => {
      const station = findStationById(id);
      if (!station) return;
      if (!_force && !isStationPlayable(station)) {
        if (isStationOffline(station)) {
          playbackErrors.value[id] = 'This station is currently offline.';
          setStationOnlineState(id, false);
        } else if (isStationStatusPending(station) || !isStationOnline(station)) {
          playbackErrors.value[id] = 'Station status is being checked. Please try again in a moment.';
        } else {
          playbackErrors.value[id] = 'This station is currently unavailable. Please try again later.';
        }
        return;
      }
      await initializeAudio(id);
      const audio = getAudioForStation(id);
      if (!audio) {
        console.error(`No audio element found for station ${id}`);
        playbackErrors.value[id] = 'This station is currently unavailable. Please try again later.';
        return;
      }
      if (isPlaying(id)) {
        audio.pause();
        playingStates.value[id] = false;
        return;
      }

      // If we are playing another station, pause it.
      if (currentPlayingStationId.value && currentPlayingStationId.value !== id) {
        const oldAudio = getAudioForStation(currentPlayingStationId.value);
        if (oldAudio) {
          oldAudio.pause();
          playingStates.value[currentPlayingStationId.value] = false;
        }
        // switch mount to new station
        if (audioMountForId.value !== id) {
          audioMountForId.value = id;
          await (0,vue__WEBPACK_IMPORTED_MODULE_0__.nextTick)();
        }
      }
      try {
        await audio.play();
        playingStates.value[id] = true;
        currentAudio.value = audio;
        currentPlayingStationId.value = id;
        playbackErrors.value[id] = null;
        setStationOnlineState(id, true);
        addToRecentlyPlayed(id);
        applyVolume(id);
      } catch (error) {
        console.error(`Playback failed for station ${id}:`, error);
        playingStates.value[id] = false;
        if (isNotSupportedPlaybackError(error) && !hlsTriedByStationId[id]) {
          const ok = await tryHlsPlayback(id, station === null || station === void 0 ? void 0 : station.url);
          if (ok) {
            playingStates.value[id] = true;
            currentAudio.value = getAudioForStation(id);
            currentPlayingStationId.value = id;
            playbackErrors.value[id] = null;
            setStationOnlineState(id, true);
            addToRecentlyPlayed(id);
            applyVolume(id);
            return;
          }
        }
        playbackErrors.value[id] = 'This station is currently unavailable. Please try again later.';
        setStationOnlineState(id, false);
        if (station !== null && station !== void 0 && station.fallbackUrl) {
          console.log(`Trying fallback URL for station ${id}`);
          destroyHlsForStation(id);
          hlsTriedByStationId[id] = false;
          audio.src = station.fallbackUrl;
          try {
            await audio.play();
            playingStates.value[id] = true;
            currentAudio.value = audio;
            currentPlayingStationId.value = id;
            playbackErrors.value[id] = null;
            setStationOnlineState(id, true);
            addToRecentlyPlayed(id);
            applyVolume(id);
          } catch (fallbackError) {
            console.error(`Fallback playback failed for station ${id}:`, fallbackError);
            if (isNotSupportedPlaybackError(fallbackError) && !hlsTriedByStationId[id]) {
              const ok = await tryHlsPlayback(id, station === null || station === void 0 ? void 0 : station.fallbackUrl);
              if (ok) {
                playingStates.value[id] = true;
                currentAudio.value = getAudioForStation(id);
                currentPlayingStationId.value = id;
                playbackErrors.value[id] = null;
                setStationOnlineState(id, true);
                addToRecentlyPlayed(id);
                applyVolume(id);
                return;
              }
            }
            playbackErrors.value[id] = 'The audio stream is not supported by your browser.';
            setStationOnlineState(id, false);
          }
        }
      }
    };
    const fetchStations = async () => {
      isLoading.value = true;
      fetchError.value = null;
      try {
        const response = await fetch('https://mp3quran.net/api/v3/radios?language=eng');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        const apiStations = data.radios.map(radio => {
          var _ref, _ref2, _ref3, _radio$online;
          return {
            id: radio.id + 1000,
            name: radio.name,
            url: radio.url,
            online: normalizeOnlineState((_ref = (_ref2 = (_ref3 = (_radio$online = radio.online) !== null && _radio$online !== void 0 ? _radio$online : radio.status) !== null && _ref3 !== void 0 ? _ref3 : radio.isLive) !== null && _ref2 !== void 0 ? _ref2 : radio.is_live) !== null && _ref !== void 0 ? _ref : radio.live),
            category: radio.category || assignCategory(radio.name),
            imageUrl: radio.image || buildReciterImageUrl(radio.name),
            imageLoaded: true,
            listeners: Math.floor(Math.random() * (1500 - 50) + 50) // Simulated listeners
          };
        }).map(enrichStation);

        // Prefer API stream URLs for popular reciters when names match (qurango links frequently break / block playback).
        const stationKey = (name = '') => sanitizeName(simplifyReciterName(name) || name);
        const apiByKey = new Map();
        apiStations.forEach(station => {
          const key = stationKey((station === null || station === void 0 ? void 0 : station.name) || '');
          if (!key || apiByKey.has(key)) return;
          apiByKey.set(key, station);
        });
        const resolveApiMatch = defaultStation => {
          const key = stationKey((defaultStation === null || defaultStation === void 0 ? void 0 : defaultStation.name) || '');
          if (!key) return null;
          const direct = apiByKey.get(key);
          if (direct) return direct;
          // fallback: partial match when APIs include "Radio ..." prefixes
          for (const apiStation of apiByKey.values()) {
            const apiKey = stationKey((apiStation === null || apiStation === void 0 ? void 0 : apiStation.name) || '');
            if (!apiKey) continue;
            if (apiKey.includes(key) || key.includes(apiKey)) return apiStation;
          }
          return null;
        };
        const popularStationsMerged = defaultPopularReciters.map(station => {
          const apiMatch = resolveApiMatch(station);
          if (apiMatch !== null && apiMatch !== void 0 && apiMatch.url && isValidUrl(apiMatch.url)) {
            return _objectSpread(_objectSpread({}, station), {}, {
              url: apiMatch.url,
              // keep fallbackUrl if provided; otherwise use the previous url as fallback
              fallbackUrl: station.fallbackUrl || station.url
            });
          }
          return station;
        });
        const defaultStationsWithListeners = popularStationsMerged.map(station => _objectSpread(_objectSpread({}, station), {}, {
          listeners: Math.floor(Math.random() * (2500 - 200) + 200) // Higher listener count for popular ones
        })).map(enrichStation);
        stations.value = dedupeStationsByReciterName([...defaultStationsWithListeners, ...apiStations.filter(apiStation => !defaultStationsWithListeners.some(pr => pr.id === apiStation.id))].filter(station => isValidUrl(station.url)));
        filteredStations.value = stations.value;
        probeStationsAvailability(stations.value).catch(() => {});
        initializeVolumes();
        loadLikedStations();
        loadRecentlyPlayed();
        hydrateStationImagesInBackground(stations.value);
        fetchAlquranReciterMetadata().catch(() => {});
      } catch (error) {
        console.error('Failed to fetch stations:', error);
        fetchError.value = 'Failed to load stations. Using default reciters.';
        stations.value = dedupeStationsByReciterName([...defaultPopularReciters].map(enrichStation).filter(station => isValidUrl(station.url)));
        filteredStations.value = stations.value;
        probeStationsAvailability(stations.value).catch(() => {});
        initializeVolumes();
        hydrateStationImagesInBackground(stations.value);
        fetchAlquranReciterMetadata().catch(() => {});
      } finally {
        isLoading.value = false;
      }
    };
    const isValidUrl = url => {
      try {
        new URL(url);
        return true;
      } catch (_unused4) {
        console.warn(`Invalid URL: ${url}`);
        return false;
      }
    };
    const assignCategory = name => {
      name = name.toLowerCase();
      if (name.includes('translation') || name.includes('translate')) return 'Translation';
      if (name.includes('biography') || name.includes('seerah')) return 'Biography';
      if (name.includes('fatwa') || name.includes('ruling')) return 'Fatwa';
      return 'Recitation';
    };
    const selectSuggestion = name => {
      searchQuery.value = name;
      filteredSuggestions.value = [];
      showSuggestions.value = false;
      handleSearch();
    };
    const hideSuggestions = () => {
      setTimeout(() => {
        showSuggestions.value = false;
        highlightIndex.value = -1;
      }, 200);
    };
    const handleKeydown = event => {
      if (!showSuggestions.value || !filteredSuggestions.value.length) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        highlightIndex.value = (highlightIndex.value + 1) % filteredSuggestions.value.length;
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        highlightIndex.value = (highlightIndex.value - 1 + filteredSuggestions.value.length) % filteredSuggestions.value.length;
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (highlightIndex.value >= 0 && filteredSuggestions.value[highlightIndex.value]) {
          selectSuggestion(filteredSuggestions.value[highlightIndex.value].name);
        }
      } else if (event.key === 'Escape') {
        showSuggestions.value = false;
        highlightIndex.value = -1;
      }
    };

    // Debounced search to reduce re-computations while typing
    let searchDebounce = null;
    const handleSearch = () => {
      if (searchDebounce) clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        runSearch();
      }, 180);
    };

    // Keep filters in sync with same debounce
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(selectedCategory, () => handleSearch());
    const runSearch = () => {
      highlightIndex.value = -1;
      if (lowerSearchQuery.value.length >= 2) {
        const q = lowerSearchQuery.value;
        filteredSuggestions.value = stations.value.filter(station => station.name.toLowerCase().includes(q)).slice(0, 5);
        showSuggestions.value = true;
      } else {
        filteredSuggestions.value = [];
        showSuggestions.value = false;
      }

      // Reset visible window for new results
      itemsToShow.value = itemsPerPage.value;
      const query = lowerSearchQuery.value;
      filteredStations.value = stations.value.filter(station => {
        const matchesName = query ? station.name.toLowerCase().includes(query) : true;
        const matchesCategory = selectedCategory.value === 'All Categories' || station.category === selectedCategory.value;
        return matchesName && matchesCategory;
      });
    };
    const clearSearch = () => {
      if (!searchQuery.value) return;
      searchQuery.value = '';
      filteredSuggestions.value = [];
      showSuggestions.value = false;
      highlightIndex.value = -1;
      handleSearch();
    };
    const clearAllFilters = () => {
      searchQuery.value = '';
      selectedCategory.value = 'All Categories';
      sortBy.value = 'default';
      filteredSuggestions.value = [];
      showSuggestions.value = false;
      highlightIndex.value = -1;
      handleSearch();
    };
    const highlightSearch = name => {
      const rx = searchRegex.value;
      if (!rx) return name;
      return name.replace(rx, '<mark style="background:#0db691;color:white">$1</mark>');
    };
    const handlePlay = async (id, event) => {
      // Pause only the currently playing audio if different
      if (currentPlayingStationId.value && currentPlayingStationId.value !== id) {
        const prevAudio = audioRefs[currentPlayingStationId.value];
        if (prevAudio && prevAudio !== event.target) {
          prevAudio.pause();
          playingStates.value[currentPlayingStationId.value] = false;
        }
      }
      currentAudio.value = event.target;
      currentPlayingStationId.value = id;
      playingStates.value[id] = true;
      playbackErrors.value[id] = null;
      setStationOnlineState(id, true);
      addToRecentlyPlayed(id);
      applyVolume(id);
      try {
        await currentAudio.value.play();
      } catch (error) {
        console.error(`Playback failed for station ${id}:`, error);
        playbackErrors.value[id] = 'This station is currently unavailable. Please try again later.';
        playingStates.value[id] = false;
        currentAudio.value = null;
        currentPlayingStationId.value = null;
      }
      const played = stations.value.find(s => s.id === id) || defaultPopularReciters.find(s => s.id === id);
      if (played) liveAnnouncement.value = `Playing ${played.name}`;
    };
    const handlePause = id => {
      playingStates.value[id] = false;
      const st = stations.value.find(s => s.id === id) || defaultPopularReciters.find(s => s.id === id);
      if (st) liveAnnouncement.value = `Paused ${st.name}`;
    };
    const handleAudioError = async (stationId, event) => {
      const error = event.target.error;
      let errorMessage = "Failed to load audio.";
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            if (!hlsTriedByStationId[stationId]) {
              const station = findStationById(stationId);
              const ok = await tryHlsPlayback(stationId, (station === null || station === void 0 ? void 0 : station.url) || '');
              if (ok) {
                playbackErrors.value[stationId] = null;
                setStationOnlineState(stationId, true);
                playingStates.value[stationId] = true;
                currentAudio.value = getAudioForStation(stationId);
                currentPlayingStationId.value = stationId;
                applyVolume(stationId);
                return;
              }
            }
            errorMessage = "The audio format is not supported by your browser.";
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = "A network error occurred. Please check your connection.";
            break;
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = "Playback was aborted.";
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = "An error occurred while decoding the audio.";
            break;
          default:
            errorMessage = 'This station is currently unavailable. Please try again later.';
        }
      }
      playbackErrors.value[stationId] = errorMessage;
      setStationOnlineState(stationId, false);
      console.error(`Audio error for station ${stationId}:`, error);
    };
    const getStationStatus = id => {
      const station = findStationById(id);
      if (!(station !== null && station !== void 0 && station.url)) {
        return {
          text: 'Offline',
          class: 'bg-danger'
        };
      }
      if (isStationStatusPending(station)) {
        return {
          text: 'Checking...',
          class: 'bg-secondary'
        };
      }
      if (isStationOffline(station)) {
        return {
          text: 'Offline',
          class: 'bg-danger'
        };
      }
      if (playbackErrors.value[id]) {
        return {
          text: 'Offline',
          class: 'bg-danger'
        };
      }
      if (isPlaying(id)) {
        return {
          text: 'Live',
          class: 'bg-theme-teal text-dark'
        };
      }
      if (normalizeOnlineState(station.online) === null) {
        return {
          text: 'Checking...',
          class: 'bg-secondary'
        };
      }
      return {
        text: 'Online',
        class: 'bg-theme-teal text-dark'
      };
    };
    const isLive = id => isNaN(durations.value[id]) || durations.value[id] === Infinity;
    const updateTime = id => {
      const audio = getAudioForStation(id);
      if (audio && isPlaying(id)) {
        currentTimes.value[id] = audio.currentTime;
      }
    };
    const updateDuration = id => {
      const audio = getAudioForStation(id);
      if (audio) {
        durations.value[id] = audio.duration || Infinity;
      }
    };
    const seek = (event, id) => {
      const audio = getAudioForStation(id);
      if (audio && !isLive(id)) {
        const value = parseFloat(event.target.value);
        audio.currentTime = value;
        currentTimes.value[id] = value;
      }
    };
    const formatTime = seconds => {
      if (isNaN(seconds) || seconds === Infinity) return 'Live';
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    const setVolume = (event, id) => {
      const volume = parseFloat(event.target.value);
      volumes.value[id] = volume;
      const audio = getAudioForStation(id);
      if (audio) {
        audio.volume = volume / 100;
      }
      localStorage.setItem(`volume-${id}`, volume);
      if (event.target instanceof HTMLElement) {
        event.target.style.setProperty('--volume-level', `${volume}%`);
      }
    };
    const toggleMute = id => {
      const newVolume = volumes.value[id] === 0 ? 50 : 0;
      volumes.value[id] = newVolume;
      applyVolume(id);
      localStorage.setItem(`volume-${id}`, newVolume);
    };
    const initializeVolumes = () => {
      stations.value.forEach(station => {
        const savedVolume = localStorage.getItem(`volume-${station.id}`);
        volumes.value[station.id] = savedVolume ? parseFloat(savedVolume) : 50;
      });
    };
    const showLoginWarning = station => {
      const stationId = station === null || station === void 0 ? void 0 : station.id;
      if (!stationId) return;
      loginWarnings[stationId] = 'Please log in to save this station.';
      if (warningTimers[stationId]) clearTimeout(warningTimers[stationId]);
      warningTimers[stationId] = setTimeout(() => {
        delete loginWarnings[stationId];
        delete warningTimers[stationId];
      }, 5000);
    };
    const toggleLike = station => {
      if (!isAuthenticated.value) {
        showLoginWarning(station);
        return;
      }
      const index = likedStations.value.findIndex(s => s.id === station.id);
      if (index === -1) {
        likedStations.value.push(station);
      } else {
        likedStations.value.splice(index, 1);
      }
      saveLikedStations();
    };
    const isLiked = id => likedStations.value.some(s => s.id === id);
    const loadLikedStations = () => {
      if (!isAuthenticated.value) {
        likedStations.value = [];
        return;
      }
      axios__WEBPACK_IMPORTED_MODULE_1__["default"].get('/api/preferences/liked_reciters').then(response => {
        var _response$data;
        const liked = Array.isArray((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.value) ? response.data.value : [];
        const stationById = new Map(stations.value.map(station => [Number(station.id), station]));
        likedStations.value = liked.map(savedStation => stationById.get(Number(savedStation === null || savedStation === void 0 ? void 0 : savedStation.id))).filter(Boolean);
      }).catch(() => {
        likedStations.value = [];
      });
    };
    const loadRecentlyPlayed = () => {
      if (!isAuthenticated.value) {
        recentlyPlayed.value = [];
        return;
      }
      axios__WEBPACK_IMPORTED_MODULE_1__["default"].get('/api/preferences/reciter_recent').then(response => {
        var _response$data2;
        const recent = Array.isArray((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.value) ? response.data.value : [];
        const stationById = new Map(stations.value.map(station => [Number(station.id), station]));
        recentlyPlayed.value = recent.map(savedStation => stationById.get(Number(savedStation === null || savedStation === void 0 ? void 0 : savedStation.id))).filter(Boolean);
      }).catch(() => {
        recentlyPlayed.value = [];
      });
    };
    const saveLikedStations = () => {
      if (!isAuthenticated.value) return;
      axios__WEBPACK_IMPORTED_MODULE_1__["default"].put('/api/preferences/liked_reciters', {
        value: likedStations.value
      }).catch(() => {});
    };
    const saveRecentlyPlayed = () => {
      if (!isAuthenticated.value) return;
      axios__WEBPACK_IMPORTED_MODULE_1__["default"].put('/api/preferences/reciter_recent', {
        value: recentlyPlayed.value
      }).catch(() => {});
    };
    const resolveStorageScope = async () => {
      const resolvedId = await (0,_utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__.fetchUserIdFromApi)();
      storageUserId.value = resolvedId;
      isAuthenticated.value = !!resolvedId;
      loadLikedStations();
      loadRecentlyPlayed();
    };
    const retryPlayback = id => {
      playbackErrors.value[id] = null;
      togglePlay(id, {
        force: true
      });
    };

    // Removed pagination handlers (replaced by infinite scroll)

    const updateListenerCounts = () => {
      // Update only visible items to reduce DOM churn
      visibleStations.value.forEach(station => {
        const change = Math.floor(Math.random() * 10) - 5; // Fluctuate by -5 to +4
        station.listeners = Math.max(0, (station.listeners || 0) + change);
      });
    };
    const stopPlayback = () => {
      if (currentPlayingStationId.value) {
        const audio = getAudioForStation(currentPlayingStationId.value);
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
          playingStates.value[currentPlayingStationId.value] = false;
        }
      }
    };
    const previousStation = () => {
      if (!currentPlayingStationId.value) return;

      // Get the current filtered stations
      const currentStations = sortedStations.value;
      const currentIndex = currentStations.findIndex(station => station.id === currentPlayingStationId.value);
      if (currentIndex === -1) return;

      // Move backward to the first playable station (wrap once)
      for (let step = 1; step <= currentStations.length; step += 1) {
        const prevIndex = (currentIndex - step + currentStations.length) % currentStations.length;
        const prevStation = currentStations[prevIndex];
        if (prevStation && isStationPlayable(prevStation)) {
          togglePlay(prevStation.id);
          return;
        }
      }
    };
    const nextStation = () => {
      if (!currentPlayingStationId.value) return;

      // Get the current filtered stations
      const currentStations = sortedStations.value;
      const currentIndex = currentStations.findIndex(station => station.id === currentPlayingStationId.value);
      if (currentIndex === -1) return;

      // Move forward to the first playable station (wrap once)
      for (let step = 1; step <= currentStations.length; step += 1) {
        const nextIndex = (currentIndex + step) % currentStations.length;
        const candidate = currentStations[nextIndex];
        if (candidate && isStationPlayable(candidate)) {
          togglePlay(candidate.id);
          return;
        }
      }
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      resolveStorageScope();
      fetchStations();
      window.addEventListener('keydown', onGlobalKeydown);
      // Initialize infinite scroll observer after initial fetch completes
      // A slight delay ensures the sentinel is in the DOM
      setTimeout(() => setupObserver(), 0);
      listenerInterval = setInterval(updateListenerCounts, 5000); // Update every 5 seconds
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount)(() => {
      clearInterval(listenerInterval);
      window.removeEventListener('keydown', onGlobalKeydown);
      Object.values(warningTimers).forEach(timerId => clearTimeout(timerId));
      if (observer) observer.disconnect();
    });
    const handleAudioPlayerClick = event => {
      // Prevent closing if the audio player was just opened
      if (audioPlayerJustOpened.value) {
        audioPlayerJustOpened.value = false;
        return;
      }

      // Close audio player when clicking on the backdrop
      closeAudioPlayer();
    };
    const playAudio = index => {
      // ... existing code ...
      showAudioPlayer = true;

      // Set flag to prevent immediate dismissal
      audioPlayerJustOpened.value = true;

      // Clear the flag after a short delay
      setTimeout(() => {
        audioPlayerJustOpened.value = false;
      }, 300);
    };
    const __returned__ = {
      RADIO_THEME_STORAGE_KEY,
      RADIO_DARK_BG,
      isRadioDark,
      hlsInstancesByStationId,
      hlsTriedByStationId,
      onGlobalThemeChange,
      destroyHlsForStation,
      isNotSupportedPlaybackError,
      tryHlsPlayback,
      prefersDarkColorScheme,
      resolveInitialRadioTheme,
      applyRadioThemePreference,
      toggleRadioTheme,
      storageUserId,
      isAuthenticated,
      loginWarnings,
      warningTimers,
      selectedStationForInfo,
      sanitizeName,
      simplifyReciterName,
      normalizeOnlineState,
      RECITER_IMAGE_PLACEHOLDER,
      buildReciterImageUrl,
      isGeneratedOrPlaceholderImage,
      isRealFaceImage,
      imageLookupCache,
      reciterWikipediaTitles,
      buildWikipediaTitleCandidates,
      fetchWikipediaImage,
      fetchWikipediaImageFromSearch,
      resolveImamImageUrl,
      imamProfileIndex,
      alquranMetaByIdentifier,
      alquranMetaByName,
      defaultPopularReciters,
      showSuggestions,
      filteredSuggestions,
      highlightIndex,
      searchQuery,
      selectedCategory,
      itemsPerPage,
      itemsToShow,
      isLoadingMore,
      infiniteScrollSentinel,
      audioMountForId,
      get observer() {
        return observer;
      },
      set observer(v) {
        observer = v;
      },
      stations,
      filteredStations,
      currentAudio,
      volumes,
      likedStations,
      recentlyPlayed,
      showLiked,
      showRecentlyPlayed,
      currentTimes,
      durations,
      playingStates,
      playbackErrors,
      isLoading,
      fetchError,
      currentPlayingStationId,
      audioRefs,
      viewMode,
      sortBy,
      get listenerInterval() {
        return listenerInterval;
      },
      set listenerInterval(v) {
        listenerInterval = v;
      },
      audioPlayerJustOpened,
      focusedStationId,
      liveAnnouncement,
      stationAvailabilityChecks,
      stationProbeRunId,
      PLAY_BUTTON_STYLE_ACTIVE,
      PLAY_BUTTON_STYLE_DISABLED,
      STATION_PROBE_TIMEOUT_MS,
      STATION_PROBE_CONCURRENCY,
      findStationById,
      resolveStation,
      applyOnlineStateToList,
      setStationOnlineState,
      isStationOffline,
      isStationOnline,
      isStationStatusPending,
      isStationPlayable,
      playButtonStyle,
      getPlayButtonTitle,
      probeStreamUrl,
      probeStationAvailability,
      probeStationsAvailability,
      lowerSearchQuery,
      searchRegex,
      onStationKeydown,
      getStationNodes,
      focusStationByOffset,
      focusStationByIndex,
      sortedStations,
      visibleStations,
      allLoaded,
      availableCategories,
      currentlyPlayingStation,
      selectedStationLongInfo,
      loadMore,
      setupObserver,
      getAudioForStation,
      isFilterOpen,
      showAdvancedFilters,
      hasActiveFilters,
      hasAdvancedFiltersActive,
      activeFilterCount,
      closePlayer,
      initializeAudio,
      resolveProfile,
      resolveAlquranMeta,
      enrichStation,
      dedupeStationsByReciterName,
      hydrateStationImages,
      hydrateStationImagesInBackground,
      fetchAlquranReciterMetadata,
      openStationInfo,
      closeStationInfo,
      onGlobalKeydown,
      handleStationImageError,
      pauseAllAudio,
      isPlaying,
      applyVolume,
      addToRecentlyPlayed,
      togglePlay,
      fetchStations,
      isValidUrl,
      assignCategory,
      selectSuggestion,
      hideSuggestions,
      handleKeydown,
      get searchDebounce() {
        return searchDebounce;
      },
      set searchDebounce(v) {
        searchDebounce = v;
      },
      handleSearch,
      runSearch,
      clearSearch,
      clearAllFilters,
      highlightSearch,
      handlePlay,
      handlePause,
      handleAudioError,
      getStationStatus,
      isLive,
      updateTime,
      updateDuration,
      seek,
      formatTime,
      setVolume,
      toggleMute,
      initializeVolumes,
      showLoginWarning,
      toggleLike,
      isLiked,
      loadLikedStations,
      loadRecentlyPlayed,
      saveLikedStations,
      saveRecentlyPlayed,
      resolveStorageScope,
      retryPlayback,
      updateListenerCounts,
      stopPlayback,
      previousStation,
      nextStation,
      handleAudioPlayerClick,
      playAudio,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref,
      computed: vue__WEBPACK_IMPORTED_MODULE_0__.computed,
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      reactive: vue__WEBPACK_IMPORTED_MODULE_0__.reactive,
      nextTick: vue__WEBPACK_IMPORTED_MODULE_0__.nextTick,
      onBeforeUnmount: vue__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount,
      watch: vue__WEBPACK_IMPORTED_MODULE_0__.watch,
      markRaw: vue__WEBPACK_IMPORTED_MODULE_0__.markRaw,
      get axios() {
        return axios__WEBPACK_IMPORTED_MODULE_1__["default"];
      },
      get Hls() {
        return hls_js__WEBPACK_IMPORTED_MODULE_2__["default"];
      },
      get fetchUserIdFromApi() {
        return _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__.fetchUserIdFromApi;
      },
      get resolveClientUserId() {
        return _utils_bookmarkAuth__WEBPACK_IMPORTED_MODULE_3__.resolveClientUserId;
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RadioComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RadioComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_RadioComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_RadioComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/RadioComponent.vue */ "./resources/components/vue/RadioComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=template&id=6812f7c8&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=template&id=6812f7c8&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "radio-page"
};
const _hoisted_2 = {
  class: "container py-5 radio-shell"
};
const _hoisted_3 = {
  class: "radio-theme-toggle"
};
const _hoisted_4 = ["aria-pressed", "aria-label"];
const _hoisted_5 = {
  class: "radio-theme-label"
};
const _hoisted_6 = {
  class: "mb-4",
  role: "search",
  "aria-label": "Search and filter stations"
};
const _hoisted_7 = {
  class: "fixed-footer mb-4 border-md filters-panel"
};
const _hoisted_8 = ["aria-expanded"];
const _hoisted_9 = {
  class: "d-flex align-items-center gap-2 filter-meta"
};
const _hoisted_10 = {
  key: 0,
  class: "badge bg-primary rounded-pill filter-badge"
};
const _hoisted_11 = ["aria-expanded", "title", "aria-label"];
const _hoisted_12 = {
  class: "filter-chevron",
  "aria-hidden": "true"
};
const _hoisted_13 = {
  id: "filter-panel",
  class: "filter-panel-body"
};
const _hoisted_14 = {
  class: "row g-2 align-items-end"
};
const _hoisted_15 = {
  class: "col-12"
};
const _hoisted_16 = {
  class: "search-input-wrap"
};
const _hoisted_17 = {
  key: 0,
  class: "search-suggestions",
  role: "listbox",
  "aria-label": "Suggested reciters"
};
const _hoisted_18 = ["onClick"];
const _hoisted_19 = {
  id: "advanced-filter-panel",
  class: "row g-2 mt-1 advanced-filter-grid"
};
const _hoisted_20 = {
  class: "col-12 d-flex justify-content-end"
};
const _hoisted_21 = {
  class: "col-md-6"
};
const _hoisted_22 = {
  class: "select-wrap"
};
const _hoisted_23 = ["value"];
const _hoisted_24 = {
  class: "col-md-6"
};
const _hoisted_25 = {
  class: "select-wrap"
};
const _hoisted_26 = {
  key: 0,
  class: "mb-5"
};
const _hoisted_27 = ["aria-expanded"];
const _hoisted_28 = {
  key: 0,
  class: "section-animate",
  id: "liked-stations"
};
const _hoisted_29 = {
  class: "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
};
const _hoisted_30 = ["id", "aria-labelledby"];
const _hoisted_31 = {
  class: "d-flex justify-content-between align-items-start p-4 card-teal station-content"
};
const _hoisted_32 = {
  class: "station-info d-flex align-items-start gap-3"
};
const _hoisted_33 = ["src", "alt", "onError"];
const _hoisted_34 = {
  key: 0,
  class: "alert alert-warning station-login-warning",
  role: "alert"
};
const _hoisted_35 = ["id", "innerHTML"];
const _hoisted_36 = {
  key: 1,
  class: "text-muted mb-1 fs-sm recitation-meta"
};
const _hoisted_37 = {
  key: 0
};
const _hoisted_38 = {
  key: 1,
  class: "ms-1"
};
const _hoisted_39 = {
  key: 2,
  class: "mb-0 station-short-info"
};
const _hoisted_40 = {
  class: "station-meta-line mt-2 mb-0"
};
const _hoisted_41 = {
  class: "ms-2"
};
const _hoisted_42 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_43 = ["onClick", "aria-label", "disabled", "title"];
const _hoisted_44 = ["onClick", "aria-label", "title"];
const _hoisted_45 = ["onClick", "aria-label"];
const _hoisted_46 = {
  class: "audio-player d-none"
};
const _hoisted_47 = ["src", "onPlay", "onPause", "onTimeupdate", "onLoadedmetadata", "aria-label"];
const _hoisted_48 = {
  key: 0,
  class: "text-danger fs-6 p-3 d-flex align-items-center gap-2",
  role: "alert"
};
const _hoisted_49 = ["onClick"];
const _hoisted_50 = {
  id: "reciters",
  class: "mb-5"
};
const _hoisted_51 = {
  class: "d-flex justify-content-between align-items-center mb-4"
};
const _hoisted_52 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_53 = {
  key: 0,
  class: "text-center my-4",
  "aria-live": "polite"
};
const _hoisted_54 = {
  key: 1,
  class: "alert alert-danger",
  role: "alert"
};
const _hoisted_55 = {
  key: 2
};
const _hoisted_56 = {
  key: 0,
  class: "row",
  role: "list",
  "aria-label": "Stations"
};
const _hoisted_57 = ["id", "tabindex", "aria-labelledby", "data-station-id", "onKeydown", "onFocus"];
const _hoisted_58 = {
  class: "card-body"
};
const _hoisted_59 = {
  key: 0,
  class: "alert alert-warning station-login-warning",
  role: "alert"
};
const _hoisted_60 = {
  class: "d-flex align-items-start gap-3"
};
const _hoisted_61 = ["src", "alt", "onError"];
const _hoisted_62 = {
  class: "flex-grow-1"
};
const _hoisted_63 = {
  class: "d-flex justify-content-between align-items-start"
};
const _hoisted_64 = ["id", "innerHTML"];
const _hoisted_65 = {
  key: 0,
  class: "text-muted mb-1 fs-sm recitation-meta"
};
const _hoisted_66 = {
  key: 0
};
const _hoisted_67 = {
  key: 1,
  class: "ms-1"
};
const _hoisted_68 = {
  key: 1,
  class: "station-short-info mb-2"
};
const _hoisted_69 = {
  class: "station-meta-line mb-2"
};
const _hoisted_70 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_71 = ["onClick", "aria-label", "aria-pressed"];
const _hoisted_72 = ["onClick", "aria-label"];
const _hoisted_73 = {
  class: "d-flex align-items-center justify-content-between"
};
const _hoisted_74 = {
  class: "d-flex align-items-center gap-2 fs-sm station-meta-line"
};
const _hoisted_75 = ["title"];
const _hoisted_76 = {
  key: 0,
  class: "fw-semibold"
};
const _hoisted_77 = ["onClick", "aria-label", "aria-pressed", "disabled", "title"];
const _hoisted_78 = {
  class: "audio-player d-none"
};
const _hoisted_79 = ["src", "onPlay", "onPause", "onTimeupdate", "onLoadedmetadata", "onError", "aria-label"];
const _hoisted_80 = {
  key: 1,
  class: "text-danger fs-6 mt-2 d-flex align-items-center gap-2",
  role: "alert"
};
const _hoisted_81 = ["onClick"];
const _hoisted_82 = {
  class: "list-container view-list",
  role: "list",
  "aria-label": "Stations"
};
const _hoisted_83 = ["id", "tabindex", "aria-labelledby", "data-station-id", "onKeydown", "onFocus"];
const _hoisted_84 = {
  class: "card-body"
};
const _hoisted_85 = {
  key: 0,
  class: "alert alert-warning station-login-warning",
  role: "alert"
};
const _hoisted_86 = {
  class: "d-flex align-items-start gap-3"
};
const _hoisted_87 = ["src", "alt", "onError"];
const _hoisted_88 = {
  class: "flex-grow-1"
};
const _hoisted_89 = {
  class: "d-flex justify-content-between align-items-start"
};
const _hoisted_90 = ["id", "innerHTML"];
const _hoisted_91 = {
  key: 0,
  class: "text-muted mb-1 fs-sm recitation-meta"
};
const _hoisted_92 = {
  key: 0
};
const _hoisted_93 = {
  key: 1,
  class: "ms-1"
};
const _hoisted_94 = {
  key: 1,
  class: "station-short-info mb-2"
};
const _hoisted_95 = {
  class: "station-meta-line mb-2"
};
const _hoisted_96 = {
  class: "d-flex align-items-center gap-2"
};
const _hoisted_97 = ["onClick", "aria-label", "aria-pressed"];
const _hoisted_98 = ["onClick", "aria-label"];
const _hoisted_99 = {
  class: "d-flex align-items-center justify-content-between mt-2"
};
const _hoisted_100 = {
  class: "d-flex align-items-center gap-2 fs-sm station-meta-line"
};
const _hoisted_101 = ["title"];
const _hoisted_102 = {
  key: 0,
  class: "fw-semibold"
};
const _hoisted_103 = ["onClick", "aria-label", "aria-pressed", "disabled", "title"];
const _hoisted_104 = {
  class: "audio-player d-none"
};
const _hoisted_105 = ["src", "onPlay", "onPause", "onTimeupdate", "onLoadedmetadata", "onError", "aria-label"];
const _hoisted_106 = {
  key: 1,
  class: "text-danger fs-6 mt-2 d-flex align-items-center gap-2",
  role: "alert"
};
const _hoisted_107 = ["onClick"];
const _hoisted_108 = {
  key: 2,
  ref: "infiniteScrollSentinel",
  class: "infinite-sentinel d-flex justify-content-center my-3",
  "aria-hidden": "true"
};
const _hoisted_109 = {
  key: 0,
  class: "spinner-border text-theme-teal",
  role: "status",
  style: {
    "width": "2rem",
    "height": "2rem"
  }
};
const _hoisted_110 = ["aria-label"];
const _hoisted_111 = {
  class: "d-flex align-items-start justify-content-between gap-3 mb-3"
};
const _hoisted_112 = {
  class: "d-flex align-items-start gap-3"
};
const _hoisted_113 = ["src", "alt"];
const _hoisted_114 = {
  class: "mb-1"
};
const _hoisted_115 = {
  key: 0,
  class: "text-muted mb-2 recitation-meta"
};
const _hoisted_116 = {
  key: 0
};
const _hoisted_117 = {
  key: 1,
  class: "ms-1"
};
const _hoisted_118 = {
  class: "station-meta-line mb-0"
};
const _hoisted_119 = {
  class: "mb-0 imam-long-info"
};
const _hoisted_120 = {
  key: 0,
  class: "global-audio-player shadow-lg",
  role: "region",
  "aria-label": "Global audio player",
  "aria-live": "polite",
  style: 'position:fixed;left:0;right:0;bottom:0;padding:1.1rem 1.6rem;background:linear-gradient(180deg,#1d2f2a,#132520);border-top:1px solid rgba(255,255,255,.08);border-radius:18px 18px 0 0;box-shadow:0 -12px 34px rgba(0,0,0,.38);z-index:1000'
};
const _hoisted_121 = {
  class: "d-flex align-items-center",
  style: {
    "flex": "1 1 0px",
    "justify-content": "flex-start"
  }
};
const _hoisted_122 = {
  class: "mb-0 fw-bold text-white",
  style: {
    "font-size": "1.1rem",
    "font-weight": "600",
    "letter-spacing": "0.4px"
  }
};
const _hoisted_123 = {
  class: "text-white-50",
  style: {
    "letter-spacing": "0.4px"
  }
};
const _hoisted_124 = {
  class: "d-flex align-items-center",
  style: {
    "flex": "2 1 0px",
    "justify-content": "center"
  }
};
const _hoisted_125 = ["aria-label", "aria-pressed", "disabled", "title"];
const _hoisted_126 = {
  class: "progress-bar-container flex-grow-1 mx-4"
};
const _hoisted_127 = ["max", "value", "disabled", "aria-label"];
const _hoisted_128 = {
  class: "d-flex align-items-center",
  style: {
    "flex": "1 1 0px",
    "justify-content": "flex-end"
  }
};
const _hoisted_129 = ["aria-label", "aria-pressed"];
const _hoisted_130 = ["aria-label"];
const _hoisted_131 = {
  class: "visually-hidden",
  role: "status",
  "aria-live": "polite"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [ false ? (0) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), _cache[65] || (_cache[65] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "row justify-content-center text-center mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "col-lg-10 col-xl-10"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-5 fw-bold",
    style: {
      "color": "#0b1320",
      "letter-spacing": "-.02em",
      "margin-bottom": ".25rem"
    }
  }, "The World of Quranic Recitation"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead mb-2 mt-1",
    style: {
      "color": "#475569",
      "margin": "0 auto"
    }
  }, "Discover live Quranic reciters, Biographies, Fatwas and Translations stations from renowned reciters worldwide.")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Search Bar and Category Dropdown "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex justify-content-between align-items-center gap-2 cursor-pointer filter-header",
    onClick: _cache[3] || (_cache[3] = $event => $setup.isFilterOpen = !$setup.isFilterOpen),
    role: "button",
    "aria-expanded": $setup.isFilterOpen,
    "aria-controls": 'filter-panel',
    tabindex: "0",
    onKeydown: [_cache[4] || (_cache[4] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $setup.isFilterOpen = !$setup.isFilterOpen, ["prevent"]), ["enter"])), _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $setup.isFilterOpen = !$setup.isFilterOpen, ["prevent"]), ["space"]))]
  }, [_cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "d-flex align-items-center gap-2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "filter-header-icon",
    "aria-hidden": "true"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-sliders2"
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "filter-title mb-0"
  }, "Find Stations")])], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [$setup.hasActiveFilters ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.activeFilterCount) + " active ", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["advanced-toggle-btn advanced-toggle-icon", {
      'is-active': $setup.hasAdvancedFiltersActive || $setup.showAdvancedFilters
    }]),
    onClick: _cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $setup.showAdvancedFilters = !$setup.showAdvancedFilters, ["stop"])),
    onKeydown: [_cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $setup.showAdvancedFilters = !$setup.showAdvancedFilters, ["stop", "prevent"]), ["enter"])), _cache[2] || (_cache[2] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $setup.showAdvancedFilters = !$setup.showAdvancedFilters, ["stop", "prevent"]), ["space"]))],
    "aria-expanded": $setup.showAdvancedFilters,
    "aria-controls": "advanced-filter-panel",
    title: $setup.showAdvancedFilters ? 'Hide advanced filters' : 'Show advanced filters',
    "aria-label": $setup.showAdvancedFilters ? 'Hide advanced filters' : 'Show advanced filters'
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.showAdvancedFilters ? 'bi bi-funnel-fill' : 'bi bi-funnel')
  }, null, 2 /* CLASS */)], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_11), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)($setup.isFilterOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down')
  }, null, 2 /* CLASS */)])])], 40 /* PROPS, NEED_HYDRATION */, _hoisted_8), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "slide-fade",
    persisted: ""
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[36] || (_cache[36] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
      for: "reciterSearch",
      class: "form-label fw-semibold text-dark mb-1 filter-label"
    }, " Search by Name ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "search-input-icon",
      "aria-hidden": "true"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-search"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $setup.searchQuery = $event),
      onInput: $setup.handleSearch,
      onKeydown: $setup.handleKeydown,
      onFocus: _cache[7] || (_cache[7] = $event => $setup.showSuggestions = $setup.lowerSearchQuery.length >= 2 && $setup.filteredSuggestions.length > 0),
      onBlur: $setup.hideSuggestions,
      id: "reciterSearch",
      type: "text",
      class: "form-control filter-input filter-input-search",
      placeholder: "Search reciter...",
      "aria-label": "Search reciters by name"
    }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.searchQuery]]), $setup.searchQuery ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      type: "button",
      class: "search-clear-btn",
      onClick: $setup.clearSearch,
      "aria-label": "Clear search query"
    }, [...(_cache[33] || (_cache[33] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-lg"
    }, null, -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $setup.showSuggestions && $setup.filteredSuggestions.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_17, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.filteredSuggestions, (suggestion, index) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: `${suggestion.id}-${suggestion.name}`,
        type: "button",
        class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["search-suggestion-item", {
          active: index === $setup.highlightIndex
        }]),
        onMousedown: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(() => {}, ["prevent"])),
        onClick: $event => $setup.selectSuggestion(suggestion.name)
      }, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-broadcast-pin",
        "aria-hidden": "true"
      }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(suggestion.name), 1 /* TEXT */)], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_18);
    }), 128 /* KEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
      name: "slide-fade",
      persisted: ""
    }, {
      default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [$setup.hasActiveFilters ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
        key: 0,
        type: "button",
        class: "filter-reset-btn",
        onClick: $setup.clearAllFilters
      }, " Reset ")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        for: "reciterCategory",
        class: "form-label fw-semibold text-dark mb-1 filter-label"
      }, " Category ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "select-icon",
        "aria-hidden": "true"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-tags"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $setup.selectedCategory = $event),
        onChange: $setup.handleSearch,
        id: "reciterCategory",
        class: "form-select filter-select filter-select-with-icon",
        "aria-label": "Select a category"
      }, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "All Categories"
      }, "All Categories", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.availableCategories, category => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
          key: category,
          value: category
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category), 9 /* TEXT, PROPS */, _hoisted_23);
      }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.selectedCategory]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
        for: "sortBy",
        class: "form-label fw-semibold text-dark mb-1 filter-label"
      }, " Sort By ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "select-icon",
        "aria-hidden": "true"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-sort-down"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
        "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $setup.sortBy = $event),
        id: "sortBy",
        class: "form-select filter-select filter-select-with-icon",
        "aria-label": "Sort stations"
      }, [...(_cache[40] || (_cache[40] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "default"
      }, "Default", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "name_asc"
      }, "Name (A-Z)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "name_desc"
      }, "Name (Z-A)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: "listeners_desc"
      }, "Most Listeners", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.sortBy]])])])], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.showAdvancedFilters]])]),
      _: 1 /* STABLE */
    })], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $setup.isFilterOpen]])]),
    _: 1 /* STABLE */
  })])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Liked Stations Section "), $setup.likedStations.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[11] || (_cache[11] = $event => $setup.showLiked = !$setup.showLiked),
    type: "button",
    class: "favorite-section-toggle fw-bold mb-3 fs-4",
    "aria-expanded": $setup.showLiked,
    "aria-controls": `liked-stations`
  }, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    style: {
      "display": "inline-flex",
      "border-radius": "50%",
      "align-items": "center",
      "justify-content": "center",
      "color": "#0bb39a"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-heart-fill"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Favorite Stations (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.likedStations.length) + ") ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$setup.showLiked ? 'bi bi-chevron-up' : 'bi bi-chevron-down', "ms-1"])
  }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_27), $setup.showLiked ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.likedStations, station => {
    var _$setup$currentAudio;
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: station.id,
      class: "col"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: 'station-' + station.id,
      role: "article",
      "aria-labelledby": 'station-title-' + station.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
        'active-card': ((_$setup$currentAudio = $setup.currentAudio) === null || _$setup$currentAudio === void 0 ? void 0 : _$setup$currentAudio.src) === station.url
      }, 'station-card-focusable']),
      tabindex: "0",
      style: {
        "border-radius": "20px",
        "background": "#ffffff",
        "border": "1px solid rgba(6,182,172,.18)",
        "box-shadow": "0 6px 14px rgba(0,0,0,.06)",
        "transition": "transform .12s ease, box-shadow .12s ease"
      },
      onMouseenter: _cache[14] || (_cache[14] = $event => {
        $event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.22)';
        $event.currentTarget.style.transform = 'translateY(-2px)';
      }),
      onMouseleave: _cache[15] || (_cache[15] = $event => {
        $event.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,.06)';
        $event.currentTarget.style.transform = '';
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: station.imageUrl,
      alt: `${station.name} image`,
      class: "station-avatar",
      loading: "lazy",
      decoding: "async",
      onError: $event => $setup.handleStationImageError(station)
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_33), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [$setup.loginWarnings[station.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_34, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-shield-lock-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.loginWarnings[station.id]), 1 /* TEXT */), _cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "station-login-cta",
      href: "/login"
    }, "Log in", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "card-title station-title mb-1 fw-bold",
      id: 'station-title-' + station.id,
      innerHTML: $setup.highlightSearch(station.name),
      style: {
        "color": "#0b1320"
      }
    }, null, 8 /* PROPS */, _hoisted_35), station.category || station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_36, [station.category ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_37, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.category), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.category && station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_38, "·")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: 2,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        'ms-1': station.category
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.country), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.shortInfo ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.shortInfo), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_40, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-headphones me-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.listeners || 0) + " listeners ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_41, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getStationStatus(station.id).text), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $setup.togglePlay(station.id),
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["control-btn play-pause p-0", {
        'is-offline': $setup.isStationOffline(station)
      }]),
      "aria-label": $setup.isPlaying(station.id) ? 'Pause ' + station.name : 'Play ' + station.name,
      disabled: !$setup.isStationPlayable(station),
      title: $setup.getPlayButtonTitle(station),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.playButtonStyle(station)),
      onMouseenter: _cache[12] || (_cache[12] = $event => {
        $event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.32)';
        $event.currentTarget.style.transform = 'translateY(-1px)';
      }),
      onMouseleave: _cache[13] || (_cache[13] = $event => {
        $event.currentTarget.style.boxShadow = '0 10px 22px rgba(6,182,172,.25)';
        $event.currentTarget.style.transform = '';
      })
    }, [...(_cache[47] || (_cache[47] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-fill text-white",
      style: {
        "font-size": "1.4rem"
      }
    }, null, -1 /* CACHED */)]))], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_43), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-icon like-button p-2",
      onClick: $event => $setup.toggleLike(station),
      "aria-label": $setup.isLiked(station.id) ? 'Unlike ' + station.name : 'Like ' + station.name,
      title: $setup.isLiked(station.id) ? 'Unlike' : 'Like',
      style: {
        "border-radius": "12px",
        "border": "1px solid #e2e8f0",
        "box-shadow": "0 2px 6px rgba(0,0,0,.04)"
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
        'bi-heart-fill text-danger': $setup.isLiked(station.id),
        'bi-heart': !$setup.isLiked(station.id)
      }, "like-icon fs-5"])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_44), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-icon station-info-btn p-2",
      onClick: $event => $setup.openStationInfo(station),
      "aria-label": `More info about ${station.name}`,
      title: "More info"
    }, [...(_cache[48] || (_cache[48] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-info-circle"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_45), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("audio", {
      ref_for: true,
      ref: el => $setup.audioRefs[station.id] = el,
      src: station.url,
      onPlay: $event => $setup.handlePlay(station.id, $event),
      onPause: $event => $setup.handlePause(station.id),
      onTimeupdate: $event => $setup.updateTime(station.id),
      onLoadedmetadata: $event => $setup.updateDuration(station.id),
      "aria-label": 'Audio stream for ' + station.name
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_47)])])]), $setup.playbackErrors[station.id] && $setup.currentPlayingStationId === station.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.playbackErrors[station.id]) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-danger",
      onClick: $event => $setup.retryPlayback(station.id),
      "aria-label": "Retry playback"
    }, "Retry", 8 /* PROPS */, _hoisted_49)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_30)]);
  }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" All Reciters Stations "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_51, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
    class: "fw-bold fs-3 text-dark"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
    src: "images/art.png",
    width: "30",
    height: "30",
    loading: "lazy",
    decoding: "async",
    alt: "decorative",
    class: "mb-1"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Reciter Stations:")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[16] || (_cache[16] = $event => $setup.viewMode = 'grid'),
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-outline-dark", {
      active: $setup.viewMode === 'grid'
    }]),
    "aria-label": "Grid View"
  }, [...(_cache[50] || (_cache[50] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-grid-fill"
  }, null, -1 /* CACHED */)]))], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[17] || (_cache[17] = $event => $setup.viewMode = 'list'),
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["btn btn-outline-dark", {
      active: $setup.viewMode === 'list'
    }]),
    "aria-label": "List View"
  }, [...(_cache[51] || (_cache[51] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-list-ul"
  }, null, -1 /* CACHED */)]))], 2 /* CLASS */)])]), $setup.isLoading ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, [...(_cache[53] || (_cache[53] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "spinner-border text-primary",
    role: "status",
    "aria-label": "Loading"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading stations...")], -1 /* CACHED */)]))])) : $setup.fetchError ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.fetchError) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-outline-danger ms-2",
    onClick: $setup.fetchStations,
    "aria-label": "Retry loading stations"
  }, "Retry")])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Grid View "), $setup.viewMode === 'grid' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_56, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.visibleStations, station => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: station.id,
      class: "col-md-4 mb-4"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["station-list-item card-teal h-100", {
        'active-card': $setup.currentPlayingStationId === station.id
      }]),
      style: {
        "border-radius": "20px",
        "border": "1px solid rgba(6,182,172,.18)",
        "box-shadow": "0 6px 14px rgba(0,0,0,.06)",
        "transition": "transform .12s ease, box-shadow .12s ease"
      },
      onMouseenter: _cache[20] || (_cache[20] = $event => {
        $event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.22)';
        $event.currentTarget.style.transform = 'translateY(-2px)';
      }),
      onMouseleave: _cache[21] || (_cache[21] = $event => {
        $event.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,.06)';
        $event.currentTarget.style.transform = '';
      }),
      id: 'station-' + station.id,
      role: "listitem",
      tabindex: $setup.focusedStationId === station.id ? 0 : -1,
      "aria-labelledby": 'station-title-' + station.id,
      "data-station-id": station.id,
      onKeydown: $event => $setup.onStationKeydown(station.id, $event),
      onFocus: $event => $setup.focusedStationId = station.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_58, [$setup.loginWarnings[station.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_59, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-shield-lock-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.loginWarnings[station.id]), 1 /* TEXT */), _cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "station-login-cta",
      href: "/login"
    }, "Log in", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: station.imageUrl,
      alt: `${station.name} image`,
      class: "station-avatar",
      loading: "lazy",
      decoding: "async",
      onError: $event => $setup.handleStationImageError(station)
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_61), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "card-title station-title mb-1 fw-semibold",
      id: 'station-title-' + station.id,
      innerHTML: $setup.highlightSearch(station.name)
    }, null, 8 /* PROPS */, _hoisted_64), station.category || station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_65, [station.category ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_66, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.category), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.category && station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_67, "·")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: 2,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        'ms-1': station.category
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.country), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.shortInfo ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_68, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.shortInfo), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_69, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.style || 'Murattal'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-icon like-button p-2",
      onClick: $event => $setup.toggleLike(station),
      "aria-label": $setup.isLiked(station.id) ? 'Unlike station' : 'Like station',
      "aria-pressed": $setup.isLiked(station.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$setup.isLiked(station.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart', "like-icon fs-5"])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_71), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-icon station-info-btn p-2",
      onClick: $event => $setup.openStationInfo(station),
      "aria-label": `More info about ${station.name}`,
      title: "More info"
    }, [...(_cache[56] || (_cache[56] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-info-circle"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_72)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      title: `${station.listeners} listeners`
    }, [_cache[57] || (_cache[57] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-headphones me-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.listeners), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_75), $setup.currentPlayingStationId === station.id && $setup.isPlaying(station.id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_76, "Now Playing")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getStationStatus(station.id).text), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $setup.togglePlay(station.id),
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["control-btn play-pause p-0", {
        'is-offline': $setup.isStationOffline(station)
      }]),
      "aria-label": $setup.isPlaying(station.id) ? 'Pause playback' : 'Play playback',
      "aria-pressed": $setup.isPlaying(station.id),
      disabled: !$setup.isStationPlayable(station),
      title: $setup.getPlayButtonTitle(station),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.playButtonStyle(station)),
      onMouseenter: _cache[18] || (_cache[18] = $event => {
        $event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.32)';
        $event.currentTarget.style.transform = 'translateY(-1px)';
      }),
      onMouseleave: _cache[19] || (_cache[19] = $event => {
        $event.currentTarget.style.boxShadow = '0 10px 22px rgba(6,182,172,.25)';
        $event.currentTarget.style.transform = '';
      })
    }, [...(_cache[58] || (_cache[58] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-fill text-white",
      style: {
        "font-size": "1.4rem"
      }
    }, null, -1 /* CACHED */)]))], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_77)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [$setup.audioMountForId === station.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("audio", {
      key: 0,
      ref_for: true,
      ref: el => $setup.audioRefs[station.id] = el,
      src: station.url,
      onPlay: $event => $setup.handlePlay(station.id, $event),
      onPause: $event => $setup.handlePause(station.id),
      onTimeupdate: $event => $setup.updateTime(station.id),
      onLoadedmetadata: $event => $setup.updateDuration(station.id),
      onError: $event => $setup.handleAudioError(station.id, $event),
      "aria-label": 'Audio stream for ' + station.name
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_79)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $setup.playbackErrors[station.id] && $setup.currentPlayingStationId === station.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.playbackErrors[station.id]) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-danger",
      onClick: $event => $setup.retryPlayback(station.id),
      "aria-label": "Retry playback"
    }, "Retry", 8 /* PROPS */, _hoisted_81)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_57)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    key: 1
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" List View "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.visibleStations, station => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: station.id,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["station-list-item", {
        'active-card': $setup.currentPlayingStationId === station.id
      }]),
      style: {
        "border-radius": "20px",
        "background": "#ffffff",
        "border": "1px solid rgba(6,182,172,.18)",
        "box-shadow": "0 6px 14px rgba(0,0,0,.06)",
        "transition": "transform .12s ease, box-shadow .12s ease"
      },
      onMouseenter: _cache[24] || (_cache[24] = $event => {
        $event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.22)';
        $event.currentTarget.style.transform = 'translateY(-2px)';
      }),
      onMouseleave: _cache[25] || (_cache[25] = $event => {
        $event.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,.06)';
        $event.currentTarget.style.transform = '';
      }),
      id: 'station-' + station.id,
      role: "listitem",
      tabindex: $setup.focusedStationId === station.id ? 0 : -1,
      "aria-labelledby": 'station-title-' + station.id,
      "data-station-id": station.id,
      onKeydown: $event => $setup.onStationKeydown(station.id, $event),
      onFocus: $event => $setup.focusedStationId = station.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [$setup.loginWarnings[station.id] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_85, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-shield-lock-fill",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.loginWarnings[station.id]), 1 /* TEXT */), _cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "station-login-cta",
      href: "/login"
    }, "Log in", -1 /* CACHED */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: station.imageUrl,
      alt: `${station.name} image`,
      class: "station-avatar",
      loading: "lazy",
      decoding: "async",
      onError: $event => $setup.handleStationImageError(station)
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_87), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: "card-title station-title mb-1 fw-semibold",
      id: 'station-title-' + station.id,
      innerHTML: $setup.highlightSearch(station.name)
    }, null, 8 /* PROPS */, _hoisted_90), station.category || station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_91, [station.category ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_92, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.category), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.category && station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_93, "·")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: 2,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        'ms-1': station.category
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.country), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), station.shortInfo ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_94, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.shortInfo), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_95, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.style || 'Murattal'), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_96, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-icon like-button p-2",
      onClick: $event => $setup.toggleLike(station),
      "aria-label": $setup.isLiked(station.id) ? 'Unlike station' : 'Like station',
      "aria-pressed": $setup.isLiked(station.id)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$setup.isLiked(station.id) ? 'bi bi-heart-fill text-danger' : 'bi bi-heart', "like-icon fs-5"])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_97), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-icon station-info-btn p-2",
      onClick: $event => $setup.openStationInfo(station),
      "aria-label": `More info about ${station.name}`,
      title: "More info"
    }, [...(_cache[61] || (_cache[61] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-info-circle"
    }, null, -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_98)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_100, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      title: `${station.listeners} listeners`
    }, [_cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-headphones me-1",
      "aria-hidden": "true"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(station.listeners), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_101), $setup.currentPlayingStationId === station.id && $setup.isPlaying(station.id) ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_102, "Now Playing")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.getStationStatus(station.id).text), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $event => $setup.togglePlay(station.id),
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["control-btn play-pause p-0", {
        'is-offline': $setup.isStationOffline(station)
      }]),
      "aria-label": $setup.isPlaying(station.id) ? 'Pause playback' : 'Play playback',
      "aria-pressed": $setup.isPlaying(station.id),
      disabled: !$setup.isStationPlayable(station),
      title: $setup.getPlayButtonTitle(station),
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($setup.playButtonStyle(station)),
      onMouseenter: _cache[22] || (_cache[22] = $event => {
        $event.currentTarget.style.boxShadow = '0 14px 28px rgba(6,182,172,.32)';
        $event.currentTarget.style.transform = 'translateY(-1px)';
      }),
      onMouseleave: _cache[23] || (_cache[23] = $event => {
        $event.currentTarget.style.boxShadow = '0 10px 22px rgba(6,182,172,.25)';
        $event.currentTarget.style.transform = '';
      })
    }, [...(_cache[63] || (_cache[63] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-play-fill text-white",
      style: {
        "font-size": "1.4rem"
      }
    }, null, -1 /* CACHED */)]))], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_103)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_104, [$setup.audioMountForId === station.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("audio", {
      key: 0,
      ref_for: true,
      ref: el => $setup.audioRefs[station.id] = el,
      src: station.url,
      onPlay: $event => $setup.handlePlay(station.id, $event),
      onPause: $event => $setup.handlePause(station.id),
      onTimeupdate: $event => $setup.updateTime(station.id),
      onLoadedmetadata: $event => $setup.updateDuration(station.id),
      onError: $event => $setup.handleAudioError(station.id, $event),
      "aria-label": 'Audio stream for ' + station.name
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_105)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), $setup.playbackErrors[station.id] && $setup.currentPlayingStationId === station.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_106, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.playbackErrors[station.id]) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-danger",
      onClick: $event => $setup.retryPlayback(station.id),
      "aria-label": "Retry playback"
    }, "Retry", 8 /* PROPS */, _hoisted_107)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_83);
  }), 128 /* KEYED_FRAGMENT */))])], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Infinite Scroll Sentinel "), !$setup.allLoaded ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_108, [$setup.isLoadingMore ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_109, [...(_cache[64] || (_cache[64] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "visually-hidden"
  }, "Loading more...", -1 /* CACHED */)]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.selectedStationForInfo ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: 0,
      class: "imam-modal-backdrop",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($setup.closeStationInfo, ["self"])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "imam-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": `About ${$setup.selectedStationForInfo.name}`
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_112, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: $setup.selectedStationForInfo.imageUrl,
      alt: `${$setup.selectedStationForInfo.name} image`,
      class: "station-avatar station-avatar-lg",
      onError: _cache[26] || (_cache[26] = $event => $setup.handleStationImageError($setup.selectedStationForInfo))
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_113), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", _hoisted_114, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedStationForInfo.name), 1 /* TEXT */), $setup.selectedStationForInfo.category || $setup.selectedStationForInfo.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_115, [$setup.selectedStationForInfo.category ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_116, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedStationForInfo.category), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.selectedStationForInfo.category && $setup.selectedStationForInfo.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_117, "·")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $setup.selectedStationForInfo.country ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: 2,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)({
        'ms-1': $setup.selectedStationForInfo.category
      })
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedStationForInfo.country), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_118, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedStationForInfo.style || 'Murattal'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-sm btn-outline-secondary",
      onClick: $setup.closeStationInfo,
      "aria-label": "Close imam details"
    }, [...(_cache[66] || (_cache[66] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-lg"
    }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_119, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedStationLongInfo), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_110)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Global Audio Player "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "global-audio-player"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$setup.currentlyPlayingStation ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_120, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_121, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_122, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentlyPlayingStation.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_123, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentlyPlayingStation.category || 'Recitation'), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_124, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $setup.previousStation,
      class: "control-btn mx-2",
      title: "Previous Station"
    }, [...(_cache[67] || (_cache[67] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-rewind-fill text-white"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: _cache[27] || (_cache[27] = $event => $setup.togglePlay($setup.currentPlayingStationId)),
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["control-btn play-pause fs-2 mx-2", {
        'is-offline': $setup.currentPlayingStationId && !$setup.isStationPlayable($setup.currentPlayingStationId)
      }]),
      "aria-label": $setup.isPlaying($setup.currentPlayingStationId) ? 'Pause playback' : 'Play playback',
      "aria-pressed": $setup.isPlaying($setup.currentPlayingStationId),
      disabled: $setup.currentPlayingStationId && !$setup.isStationPlayable($setup.currentPlayingStationId),
      title: $setup.currentPlayingStationId ? $setup.getPlayButtonTitle($setup.currentPlayingStationId) : ''
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi text-white", $setup.isPlaying($setup.currentPlayingStationId) ? 'bi-pause-fill' : 'bi-play-fill'])
    }, null, 2 /* CLASS */)], 10 /* CLASS, PROPS */, _hoisted_125), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $setup.nextStation,
      class: "control-btn mx-2",
      title: "Next Station"
    }, [...(_cache[68] || (_cache[68] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-fast-forward-fill text-white"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $setup.stopPlayback,
      class: "control-btn mx-2",
      title: "Stop"
    }, [...(_cache[69] || (_cache[69] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-stop-fill text-white"
    }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_126, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "range",
      min: "0",
      max: $setup.durations[$setup.currentPlayingStationId] || 100,
      value: $setup.currentTimes[$setup.currentPlayingStationId] || 0,
      onInput: _cache[28] || (_cache[28] = $event => $setup.seek($event, $setup.currentPlayingStationId)),
      class: "progress-bar",
      disabled: $setup.isLive($setup.currentPlayingStationId),
      "aria-label": 'Seek bar for ' + $setup.currentlyPlayingStation.name
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_127)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: _cache[29] || (_cache[29] = $event => $setup.toggleMute($setup.currentPlayingStationId)),
      class: "control-btn",
      "aria-label": $setup.volumes[$setup.currentPlayingStationId] === 0 ? 'Unmute audio' : 'Mute audio',
      "aria-pressed": $setup.volumes[$setup.currentPlayingStationId] === 0
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi fs-4 text-white", `bi-volume-${$setup.volumes[$setup.currentPlayingStationId] > 50 ? 'up' : $setup.volumes[$setup.currentPlayingStationId] > 0 ? 'down' : 'mute'}-fill`])
    }, null, 2 /* CLASS */)], 8 /* PROPS */, _hoisted_129), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      type: "range",
      min: "0",
      max: "100",
      "onUpdate:modelValue": _cache[30] || (_cache[30] = $event => $setup.volumes[$setup.currentPlayingStationId] = $event),
      onInput: _cache[31] || (_cache[31] = $event => $setup.setVolume($event, $setup.currentPlayingStationId)),
      class: "volume-slider mx-3",
      "aria-label": 'Volume control for ' + $setup.currentlyPlayingStation.name
    }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_130), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.volumes[$setup.currentPlayingStationId], void 0, {
      number: true
    }]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: $setup.closePlayer,
      class: "control-btn ms-4",
      title: "Close player"
    }, [...(_cache[70] || (_cache[70] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-x-lg fs-5 text-white"
    }, null, -1 /* CACHED */)]))])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Live region for announcing play/pause changes "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_131, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.liveAnnouncement), 1 /* TEXT */)]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=style&index=0&id=6812f7c8&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=style&index=0&id=6812f7c8&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=style&index=1&id=6812f7c8&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=style&index=1&id=6812f7c8&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/RadioComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/components/vue/RadioComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RadioComponent_vue_vue_type_template_id_6812f7c8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RadioComponent.vue?vue&type=template&id=6812f7c8&scoped=true */ "./resources/components/vue/RadioComponent.vue?vue&type=template&id=6812f7c8&scoped=true");
/* harmony import */ var _RadioComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RadioComponent.vue?vue&type=script&setup=true&lang=js */ "./resources/components/vue/RadioComponent.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _RadioComponent_vue_vue_type_style_index_0_id_6812f7c8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RadioComponent.vue?vue&type=style&index=0&id=6812f7c8&scoped=true&lang=css */ "./resources/components/vue/RadioComponent.vue?vue&type=style&index=0&id=6812f7c8&scoped=true&lang=css");
/* harmony import */ var _RadioComponent_vue_vue_type_style_index_1_id_6812f7c8_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RadioComponent.vue?vue&type=style&index=1&id=6812f7c8&lang=css */ "./resources/components/vue/RadioComponent.vue?vue&type=style&index=1&id=6812f7c8&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;



const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_RadioComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_RadioComponent_vue_vue_type_template_id_6812f7c8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-6812f7c8"],['__file',"resources/components/vue/RadioComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/RadioComponent.vue?vue&type=script&setup=true&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/components/vue/RadioComponent.vue?vue&type=script&setup=true&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RadioComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RadioComponent_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RadioComponent.vue?vue&type=script&setup=true&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/RadioComponent.vue?vue&type=style&index=0&id=6812f7c8&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/components/vue/RadioComponent.vue?vue&type=style&index=0&id=6812f7c8&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RadioComponent_vue_vue_type_style_index_0_id_6812f7c8_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RadioComponent.vue?vue&type=style&index=0&id=6812f7c8&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=style&index=0&id=6812f7c8&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/RadioComponent.vue?vue&type=style&index=1&id=6812f7c8&lang=css":
/*!*************************************************************************************************!*\
  !*** ./resources/components/vue/RadioComponent.vue?vue&type=style&index=1&id=6812f7c8&lang=css ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RadioComponent_vue_vue_type_style_index_1_id_6812f7c8_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RadioComponent.vue?vue&type=style&index=1&id=6812f7c8&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=style&index=1&id=6812f7c8&lang=css");


/***/ }),

/***/ "./resources/components/vue/RadioComponent.vue?vue&type=template&id=6812f7c8&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/RadioComponent.vue?vue&type=template&id=6812f7c8&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RadioComponent_vue_vue_type_template_id_6812f7c8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RadioComponent_vue_vue_type_template_id_6812f7c8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RadioComponent.vue?vue&type=template&id=6812f7c8&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/RadioComponent.vue?vue&type=template&id=6812f7c8&scoped=true");


/***/ }),

/***/ "./resources/js/components/RadioComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/RadioComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RadioComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RadioComponent.vue?vue&type=script&lang=js */ "./resources/js/components/RadioComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_RadioComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/RadioComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/RadioComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/RadioComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RadioComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_RadioComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./RadioComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/RadioComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/utils/bookmarkAuth.js":
/*!********************************************!*\
  !*** ./resources/js/utils/bookmarkAuth.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchUserIdFromApi: () => (/* binding */ fetchUserIdFromApi),
/* harmony export */   resolveClientUserId: () => (/* binding */ resolveClientUserId)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");

const USER_META_SELECTOR = 'meta[name="user"]';
function parseId(value) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  if (!normalized) return null;
  const asNumber = Number(normalized);
  return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : normalized;
}
function resolveClientUserId() {
  var _window, _document$body, _document$body2;
  if (typeof window === 'undefined') {
    return null;
  }
  if ((_window = window) !== null && _window !== void 0 && (_window = _window.Laravel) !== null && _window !== void 0 && _window.userId) {
    return parseId(window.Laravel.userId);
  }
  const meta = document.querySelector(USER_META_SELECTOR);
  const metaValue = parseId(meta === null || meta === void 0 ? void 0 : meta.getAttribute('content'));
  if (metaValue) {
    return metaValue;
  }
  const datasetValue = parseId(((_document$body = document.body) === null || _document$body === void 0 || (_document$body = _document$body.dataset) === null || _document$body === void 0 ? void 0 : _document$body.userId) || ((_document$body2 = document.body) === null || _document$body2 === void 0 || (_document$body2 = _document$body2.dataset) === null || _document$body2 === void 0 ? void 0 : _document$body2.user));
  if (datasetValue) {
    return datasetValue;
  }
  return null;
}
async function fetchUserIdFromApi() {
  const localId = resolveClientUserId();
  if (localId) {
    return localId;
  }
  try {
    var _response$data;
    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get('/api/userId');
    const apiValue = parseId((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.userId);
    if (apiValue) {
      return apiValue;
    }
  } catch (error) {
    // swallow; helper should not break callers
  }
  return null;
}

/***/ })

}]);