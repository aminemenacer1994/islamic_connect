"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_TasbeehComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TasbeehComponent',
  setup() {
    // State
    const count = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const targetCount = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(33);
    const selectedDhikr = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1);
    const currentTime = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(new Date());
    const showSettings = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const soundEnabled = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    const hapticEnabled = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(true);
    const selectedTheme = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('Light');
    const currentLanguage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      code: 'en',
      name: 'English'
    });
    const sessionActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const sessionStartTime = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const voiceInputActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const guidedSessionActive = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
    const selectedGuidedSession = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(1);
    const guidedTimeRemaining = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const guidedTimer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const todayTotal = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const todaySessions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const todayTimeSpent = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const recentHistory = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const calendarDays = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const currentMonth = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(new Date());
    const alertMessage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const alertType = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('alert-success');
    const newDua = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      arabic: '',
      transliteration: '',
      translation: '',
      defaultCount: 33,
      description: ''
    });
    const selectedDay = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const dayHistory = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    const touchStartX = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const touchStartY = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const touchEndX = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const touchEndY = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(0);
    const tooltipTrigger = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const collapsedSections = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({
      dhikrGuide: false,
      progressTracking: false,
      dailyQuote: false,
      guidedSession: false,
      recentHistory: false
    });
    const deletingDuaId = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);
    const deletingDuaName = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('');
    const isDeleting = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(false);

    // Languages
    const languages = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([{
      code: 'en',
      name: 'English'
    }, {
      code: 'ar',
      name: 'العربية'
    }, {
      code: 'ur',
      name: 'اردو'
    }, {
      code: 'tr',
      name: 'Türkçe'
    }, {
      code: 'id',
      name: 'Bahasa Indonesia'
    }]);

    // Translations
    const translations = {
      en: {
        settings: 'Settings',
        theme: 'Theme',
        soundEnabled: 'Sound',
        hapticEnabled: 'Haptic Feedback',
        targetCount: 'Target Count',
        counter: 'Dhikr Counter',
        count: 'Count',
        reset: 'Reset',
        pause: 'Pause',
        resume: 'Resume',
        complete: 'Complete',
        voiceInput: 'Voice Input',
        dailyQuote: 'Daily Inspiration',
        progressTracking: 'Progress Tracking',
        totalToday: 'Total Today',
        sessions: 'Sessions',
        timeSpent: 'Time Spent',
        guidedSession: 'Guided Session',
        startGuided: 'Start Session',
        stopGuided: 'Stop Session',
        recentHistory: 'Recent History',
        noHistory: 'No history yet',
        dhikrGuide: 'Dhikr Guide',
        dhikrGuideText: 'Learn about the significance of each Dhikr and how to perform them correctly.',
        targetReached: 'Target Reached!',
        resetConfirm: 'Would you like to reset the counter?',
        addCustomDua: 'Add Custom Dua',
        arabicText: 'Arabic Text',
        transliteration: 'Transliteration',
        translation: 'Translation',
        defaultCount: 'Default Count',
        description: 'Description',
        addDua: 'Add Dua',
        customDuas: 'Custom Duas',
        noCustomDuas: 'No custom duas yet. Add one above!',
        noDescription: 'No description provided',
        delete: 'Delete',
        cancel: 'Cancel',
        deleting: 'Deleting...',
        deleteDuaTitle: 'Delete Custom Dua',
        deleteConfirm: 'Are you sure you want to delete "{name}"?',
        deleteDuaAria: 'Delete {name}',
        duaDeleted: 'Custom Dua deleted successfully',
        dayDetails: 'Day Details',
        noActivity: 'No activity for this day',
        close: 'Close',
        swipeRight: 'Swiped right to increment (+1)',
        swipeLeft: 'Swiped left to decrement (-1)',
        swipeUp: 'Swiped up to reset',
        swipeInstructions: 'Swipe Right: +1 | Swipe Left: -1 | Swipe Up: Reset'
      },
      ar: {
        settings: 'الإعدادات',
        theme: 'المظهر',
        soundEnabled: 'الصوت',
        hapticEnabled: 'الاهتزاز',
        targetCount: 'العدد المستهدف',
        counter: 'عداد الذكر',
        count: 'عد',
        reset: 'إعادة تعيين',
        pause: 'إيقاف مؤقت',
        resume: 'استكمال',
        complete: 'مكتمل',
        voiceInput: 'الإدخال الصوتي',
        dailyQuote: 'الإلهام اليومي',
        progressTracking: 'تتبع التقدم',
        totalToday: 'المجموع اليوم',
        sessions: 'الجلسات',
        timeSpent: 'الوقت المستغرق',
        guidedSession: 'جلسة موجهة',
        startGuided: 'بدء الجلسة',
        stopGuided: 'إيقاف الجلسة',
        recentHistory: 'التاريخ الحديث',
        noHistory: 'لا يوجد تاريخ بعد',
        dhikrGuide: 'دليل الذكر',
        dhikrGuideText: 'تعرف على أهمية كل ذكر وكيفية أدائه بشكل صحيح.',
        targetReached: 'تم الوصول إلى الهدف!',
        resetConfirm: 'هل ترغب في إعادة تعيين العداد؟',
        addCustomDua: 'إضافة دعاء مخصص',
        arabicText: 'النص العربي',
        transliteration: 'التفريغ الصوتي',
        translation: 'الترجمة',
        defaultCount: 'العدد الافتراضي',
        description: 'الوصف',
        addDua: 'إضافة دعاء',
        customDuas: 'الأدعية المخصصة',
        noCustomDuas: 'لا توجد أدعية مخصصة بعد. أضف واحدًا أعلاه!',
        noDescription: 'لم يتم تقديم وصف',
        delete: 'حذف',
        cancel: 'إلغاء',
        deleting: 'جارٍ الحذف...',
        deleteDuaTitle: 'حذف الدعاء المخصص',
        deleteConfirm: 'هل أنت متأكد من حذف "{name}"؟',
        deleteDuaAria: 'حذف {name}',
        duaDeleted: 'تم حذف الدعاء المخصص بنجاح',
        dayDetails: 'تفاصيل اليوم',
        noActivity: 'لا توجد أنشطة لهذا اليوم',
        close: 'إغلاق',
        swipeRight: 'تم السحب لليمين للزيادة (+1)',
        swipeLeft: 'تم السحب لليسار للنقصان (-1)',
        swipeUp: 'تم السحب للأعلى لإعادة التعيين',
        swipeInstructions: 'السحب لليمين: +1 | السحب لليسار: -1 | السحب للأعلى: إعادة تعيين'
      }
      // Add translations for other languages (ur, tr, id) as needed
    };

    // Dhikr Presets
    const dhikrPresets = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([{
      id: 1,
      arabic: 'سُبْحَانَ اللهِ',
      transliteration: 'SubhanAllah',
      translation: 'Glory be to Allah',
      defaultCount: 33,
      description: 'Praising Allah by declaring His glory, typically recited 33 times after prayers.',
      isCustom: false
    }, {
      id: 2,
      arabic: 'الْحَمْدُ لِلّهِ',
      transliteration: 'Alhamdulillah',
      translation: 'All praise is due to Allah',
      defaultCount: 33,
      description: 'Expressing gratitude to Allah, recited 33 times after prayers.',
      isCustom: false
    }, {
      id: 3,
      arabic: 'اللهُ أَكْبَرُ',
      transliteration: 'Allahu Akbar',
      translation: 'Allah is the Greatest',
      defaultCount: 34,
      description: 'Proclaiming Allah’s greatness, recited 34 times after prayers.',
      isCustom: false
    }, {
      id: 4,
      arabic: 'لَا إِلٰهَ إِلَّا اللهُ',
      transliteration: 'La ilaha illa Allah',
      translation: 'There is no god but Allah',
      defaultCount: 100,
      description: 'Affirming the oneness of Allah, often recited 100 times.',
      isCustom: false
    }, {
      id: 5,
      arabic: 'أَسْتَغْفِرُ اللهَ',
      transliteration: 'Astaghfirullah',
      translation: 'I seek forgiveness from Allah',
      defaultCount: 100,
      description: 'Seeking Allah’s forgiveness, commonly recited 100 times.',
      isCustom: false
    }]);

    // Themes
    const themes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([{
      name: 'Light',
      background: '#f8f9fa',
      cardBg: '#ffffff',
      text: '#212529',
      accent: '#0db691'
    }, {
      name: 'Dark',
      background: '#1a1a1a',
      cardBg: '#2d2d2d',
      text: '#ffffff',
      accent: '#0db691'
    }, {
      name: 'Islamic Green',
      background: '#0f4c3a',
      cardBg: '#1a5f4a',
      text: '#ffffff',
      accent: '#0db691'
    }]);

    // Guided Sessions
    const guidedSessions = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([{
      id: 1,
      name: 'Morning Dhikr',
      duration: 10,
      dhikrs: [1, 2, 3]
    }, {
      id: 2,
      name: 'Evening Dhikr',
      duration: 15,
      dhikrs: [4, 5, 1]
    }, {
      id: 3,
      name: 'Quick Session',
      duration: 5,
      dhikrs: [1, 2]
    }]);

    // Daily Quotes
    const dailyQuotes = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([{
      text: 'Remember Allah and Allah will remember you.',
      source: 'Quran 2:152'
    }, {
      text: 'The remembrance of Allah is the greatest.',
      source: 'Quran 29:45'
    }, {
      text: 'In the remembrance of Allah do hearts find rest.',
      source: 'Quran 13:28'
    }]);

    // Computed Properties
    const currentDhikr = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return dhikrPresets.value.find(d => d.id === selectedDhikr.value) || dhikrPresets.value[0];
    });
    const customDuas = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return dhikrPresets.value.filter(d => d.isCustom);
    });
    const progressPercentage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return targetCount.value > 0 ? Math.min(count.value / targetCount.value * 100, 100) : 0;
    });
    const currentTheme = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return themes.value.find(t => t.name === selectedTheme.value) || themes.value[0];
    });
    const dailyQuote = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const today = new Date().getDate();
      return dailyQuotes.value[today % dailyQuotes.value.length];
    });
    const guidedProgress = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      const currentSession = guidedSessions.value.find(s => s.id === selectedGuidedSession.value);
      if (!currentSession) return 0;
      const totalTime = currentSession.duration * 60;
      return (totalTime - guidedTimeRemaining.value) / totalTime * 100;
    });
    const currentMonthYear = (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {
      return currentMonth.value.toLocaleString('default', {
        month: 'long',
        year: 'numeric'
      });
    });

    // Methods
    const t = (key, params = {}) => {
      var _translations$current;
      let text = ((_translations$current = translations[currentLanguage.value.code]) === null || _translations$current === void 0 ? void 0 : _translations$current[key]) || translations.en[key] || key;
      if (params) {
        Object.keys(params).forEach(param => {
          text = text.replace(`{${param}}`, params[param]);
        });
      }
      return text;
    };
    const formatTime = date => {
      return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    };
    const formatDate = date => {
      return new Date(date).toLocaleDateString();
    };
    const formatDuration = seconds => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };
    const formatGuidedTime = seconds => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };
    const showAlert = (message, type = 'alert-success') => {
      alertMessage.value = message;
      alertType.value = type;
      setTimeout(() => {
        alertMessage.value = '';
      }, 3000);
    };
    const increment = () => {
      count.value++;
      todayTotal.value++;
      if (soundEnabled.value) playSound();
      if (hapticEnabled.value) triggerHaptic();
      if (count.value >= targetCount.value) onTargetReached();
      saveProgress();
    };
    const decrement = () => {
      if (count.value > 0) {
        count.value--;
        todayTotal.value = Math.max(0, todayTotal.value - 1);
        if (soundEnabled.value) playSound();
        if (hapticEnabled.value) triggerHaptic();
        saveProgress();
      }
    };
    const reset = () => {
      if (count.value > 0) saveToHistory();
      count.value = 0;
      saveProgress();
      showAlert('Counter reset', 'alert-info');
    };
    const loadDhikr = () => {
      const dhikr = currentDhikr.value;
      if (dhikr && dhikr.defaultCount) {
        targetCount.value = dhikr.defaultCount;
      }
      count.value = 0;
      saveProgress();
    };
    const changeLanguage = langCode => {
      const lang = languages.value.find(l => l.code === langCode);
      if (lang) {
        currentLanguage.value = lang;
        saveSettings();
        showAlert(`Language changed to ${lang.name}`, 'alert-success');
      }
    };
    const applyTheme = () => {
      saveSettings();
      showAlert(`Theme changed to ${selectedTheme.value}`, 'alert-success');
    };
    const addCustomDua = () => {
      if (newDua.value.arabic && newDua.value.transliteration && newDua.value.translation && newDua.value.defaultCount) {
        const newId = Math.max(...dhikrPresets.value.map(d => d.id), 0) + 1;
        dhikrPresets.value.push({
          id: newId,
          arabic: newDua.value.arabic,
          transliteration: newDua.value.transliteration,
          translation: newDua.value.translation,
          defaultCount: newDua.value.defaultCount,
          description: newDua.value.description || 'Custom Dua added by user.',
          isCustom: true
        });
        saveDhikrs();
        selectedDhikr.value = newId;
        loadDhikr();
        newDua.value = {
          arabic: '',
          transliteration: '',
          translation: '',
          defaultCount: 33,
          description: ''
        };
        showAlert('Custom Dua added successfully', 'alert-success');
      } else {
        showAlert('Please fill all required fields', 'alert-danger');
      }
    };
    const openDeleteModal = id => {
      const dua = dhikrPresets.value.find(d => d.id === id);
      if (dua) {
        deletingDuaId.value = id;
        deletingDuaName.value = dua.transliteration;
        const modal = new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(document.getElementById('deleteDuaModal'));
        modal.show();
      } else {
        showAlert('Dua not found', 'alert-danger');
      }
    };
    const confirmDeleteDua = () => {
      isDeleting.value = true;
      setTimeout(() => {
        // Simulate async operation
        const id = deletingDuaId.value;
        dhikrPresets.value = dhikrPresets.value.filter(d => d.id !== id);
        saveDhikrs();
        if (selectedDhikr.value === id) {
          var _dhikrPresets$value$;
          selectedDhikr.value = ((_dhikrPresets$value$ = dhikrPresets.value[0]) === null || _dhikrPresets$value$ === void 0 ? void 0 : _dhikrPresets$value$.id) || 1;
          loadDhikr();
        }
        isDeleting.value = false;
        deletingDuaId.value = null;
        deletingDuaName.value = '';
        showAlert(t('duaDeleted'), 'alert-success');
        const modal = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(document.getElementById('deleteDuaModal'));
        modal.hide();
      }, 500); // Short delay for UX
    };
    const toggleSession = () => {
      if (sessionActive.value) {
        if (sessionStartTime.value) {
          todayTimeSpent.value += Math.floor((Date.now() - sessionStartTime.value) / 1000);
        }
        sessionActive.value = false;
        sessionStartTime.value = null;
        showAlert('Session paused', 'alert-info');
      } else {
        sessionActive.value = true;
        sessionStartTime.value = Date.now();
        if (todaySessions.value === 0 || !sessionStartTime.value) {
          todaySessions.value++;
        }
        showAlert('Session resumed', 'alert-success');
      }
      saveProgress();
    };
    const toggleVoiceInput = () => {
      if (!voiceInputActive.value) {
        startVoiceRecognition();
      } else {
        stopVoiceRecognition();
      }
    };
    const startVoiceRecognition = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = currentLanguage.value.code === 'ar' ? 'ar-SA' : 'en-US';
        recognition.onstart = () => {
          voiceInputActive.value = true;
          showAlert('Voice input started. Say "count", "reset", "pause", or "resume".', 'alert-success');
        };
        recognition.onresult = event => {
          const result = event.results[event.results.length - 1][0].transcript.toLowerCase();
          if (result.includes('count') || result.includes('counter') || result.includes('one')) {
            increment();
            showAlert('Count incremented via voice', 'alert-success');
          } else if (result.includes('reset')) {
            reset();
            showAlert('Counter reset via voice', 'alert-info');
          } else if (result.includes('pause')) {
            if (sessionActive.value) {
              toggleSession();
            }
          } else if (result.includes('resume')) {
            if (!sessionActive.value) {
              toggleSession();
            }
          }
        };
        recognition.onerror = event => {
          voiceInputActive.value = false;
          showAlert(`Voice input error: ${event.error}`, 'alert-danger');
        };
        recognition.onend = () => {
          voiceInputActive.value = false;
          showAlert('Voice input stopped', 'alert-info');
        };
        recognition.start();
      } else {
        showAlert('Voice recognition not supported in this browser', 'alert-danger');
      }
    };
    const stopVoiceRecognition = () => {
      voiceInputActive.value = false;
      showAlert('Voice input stopped', 'alert-info');
    };
    const startGuidedSession = () => {
      const session = guidedSessions.value.find(s => s.id === selectedGuidedSession.value);
      if (session) {
        guidedSessionActive.value = true;
        guidedTimeRemaining.value = session.duration * 60;
        guidedTimer.value = setInterval(() => {
          guidedTimeRemaining.value--;
          if (guidedTimeRemaining.value <= 0) {
            stopGuidedSession();
          }
        }, 1000);
        handleGuidedSession();
        showAlert('Guided session started', 'alert-success');
      }
    };
    const stopGuidedSession = () => {
      guidedSessionActive.value = false;
      if (guidedTimer.value) {
        clearInterval(guidedTimer.value);
        guidedTimer.value = null;
      }
      guidedTimeRemaining.value = 0;
      showAlert('Guided session stopped', 'alert-info');
    };
    const onTargetReached = () => {
      if (soundEnabled.value) playCompletionSound();
      if (hapticEnabled.value) triggerHaptic();
      showAlert(t('targetReached'), 'alert-success');
      updateCalendar();
      setTimeout(() => {
        if (confirm(t('resetConfirm'))) {
          reset();
        }
      }, 500);
    };
    const playSound = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    };
    const playCompletionSound = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const frequencies = [523, 659, 784];
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.frequency.value = freq;
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
        }, index * 100);
      });
    };
    const triggerHaptic = () => {
      if ('vibrate' in navigator) navigator.vibrate(50);
    };
    const saveProgress = () => {
      const progress = {
        count: count.value,
        targetCount: targetCount.value,
        selectedDhikr: selectedDhikr.value,
        todayTotal: todayTotal.value,
        todaySessions: todaySessions.value,
        todayTimeSpent: todayTimeSpent.value,
        date: new Date().toDateString(),
        calendarDays: calendarDays.value
      };
      localStorage.setItem('tasbihProgress', JSON.stringify(progress));
    };
    const loadProgress = () => {
      const saved = localStorage.getItem('tasbihProgress');
      if (saved) {
        const progress = JSON.parse(saved);
        if (progress.date === new Date().toDateString()) {
          count.value = progress.count || 0;
          targetCount.value = progress.targetCount || 33;
          selectedDhikr.value = progress.selectedDhikr || 1;
          todayTotal.value = progress.todayTotal || 0;
          todaySessions.value = progress.todaySessions || 0;
          todayTimeSpent.value = progress.todayTimeSpent || 0;
          calendarDays.value = progress.calendarDays || generateCalendarDays();
        } else {
          resetDailyProgress();
        }
      } else {
        generateCalendarDays();
      }
    };
    const saveSettings = () => {
      const settings = {
        soundEnabled: soundEnabled.value,
        hapticEnabled: hapticEnabled.value,
        selectedTheme: selectedTheme.value,
        currentLanguage: currentLanguage.value,
        collapsedSections: collapsedSections.value
      };
      localStorage.setItem('tasbihSettings', JSON.stringify(settings));
    };
    const loadSettings = () => {
      const saved = localStorage.getItem('tasbihSettings');
      if (saved) {
        var _settings$soundEnable, _settings$hapticEnabl;
        const settings = JSON.parse(saved);
        soundEnabled.value = (_settings$soundEnable = settings.soundEnabled) !== null && _settings$soundEnable !== void 0 ? _settings$soundEnable : true;
        hapticEnabled.value = (_settings$hapticEnabl = settings.hapticEnabled) !== null && _settings$hapticEnabl !== void 0 ? _settings$hapticEnabl : true;
        selectedTheme.value = settings.selectedTheme || 'Light';
        currentLanguage.value = settings.currentLanguage || {
          code: 'en',
          name: 'English'
        };
        collapsedSections.value = settings.collapsedSections || {
          dhikrGuide: false,
          progressTracking: false,
          dailyQuote: false,
          guidedSession: false,
          recentHistory: false
        };
      }
    };
    const saveDhikrs = () => {
      localStorage.setItem('tasbihDhikrs', JSON.stringify(dhikrPresets.value));
    };
    const loadDhikrs = () => {
      const saved = localStorage.getItem('tasbihDhikrs');
      if (saved) {
        const savedDhikrs = JSON.parse(saved);
        dhikrPresets.value = [...dhikrPresets.value.filter(d => !d.isCustom), ...savedDhikrs.filter(d => d.isCustom)];
      }
    };
    const saveToHistory = () => {
      const entry = {
        id: Date.now(),
        dhikr: currentDhikr.value.transliteration,
        count: count.value,
        date: new Date(),
        targetReached: count.value >= targetCount.value
      };
      recentHistory.value.unshift(entry);
      if (recentHistory.value.length > 20) {
        recentHistory.value = recentHistory.value.slice(0, 20);
      }
      localStorage.setItem('tasbihHistory', JSON.stringify(recentHistory.value));
    };
    const loadHistory = () => {
      const saved = localStorage.getItem('tasbihHistory');
      if (saved) {
        recentHistory.value = JSON.parse(saved);
      }
    };
    const clearHistory = () => {
      recentHistory.value = [];
      localStorage.removeItem('tasbihHistory');
      showAlert('History cleared', 'alert-info');
    };
    const generateCalendarDays = () => {
      const days = [];
      const year = currentMonth.value.getFullYear();
      const month = currentMonth.value.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDay = firstDay.getDay();
      const totalDays = lastDay.getDate();
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startDay - 1; i >= 0; i--) {
        days.push({
          date: new Date(year, month - 1, prevMonthLastDay - i).toDateString(),
          day: prevMonthLastDay - i,
          completed: false,
          isCurrentMonth: false
        });
      }
      for (let i = 1; i <= totalDays; i++) {
        const date = new Date(year, month, i);
        days.push({
          date: date.toDateString(),
          day: i,
          completed: false,
          isCurrentMonth: true
        });
      }
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i).toDateString(),
          day: i,
          completed: false,
          isCurrentMonth: false
        });
      }
      const saved = localStorage.getItem('tasbihProgress');
      if (saved) {
        const progress = JSON.parse(saved);
        if (progress.calendarDays) {
          progress.calendarDays.forEach(savedDay => {
            const day = days.find(d => d.date === savedDay.date);
            if (day) day.completed = savedDay.completed;
          });
        }
      }
      calendarDays.value = days;
      saveProgress();
    };
    const prevMonth = () => {
      currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1);
      generateCalendarDays();
    };
    const nextMonth = () => {
      currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1);
      generateCalendarDays();
    };
    const updateCalendar = () => {
      const today = new Date().toDateString();
      const day = calendarDays.value.find(d => d.date === today);
      if (day) {
        day.completed = true;
        showAlert('Daily target marked as completed', 'alert-success');
        saveProgress();
      }
    };
    const showDayDetails = date => {
      selectedDay.value = date;
      dayHistory.value = recentHistory.value.filter(h => new Date(h.date).toDateString() === date);
      const modal = new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(document.getElementById('dayDetailsModal'));
      modal.show();
    };
    const resetDailyProgress = () => {
      todayTotal.value = 0;
      todaySessions.value = 0;
      todayTimeSpent.value = 0;
      count.value = 0;
      generateCalendarDays();
      saveProgress();
    };
    const toggleSection = section => {
      collapsedSections.value[section] = !collapsedSections.value[section];
      saveSettings();
    };
    const handleGuidedSession = () => {
      const session = guidedSessions.value.find(s => s.id === selectedGuidedSession.value);
      if (session && session.dhikrs) {
        const sequence = session.dhikrs;
        let index = 0;
        const interval = setInterval(() => {
          if (guidedSessionActive.value && index < sequence.length) {
            selectedDhikr.value = sequence[index];
            loadDhikr();
            count.value = 0;
            showAlert(`Now reciting ${dhikrPresets.value.find(d => d.id === sequence[index]).transliteration}`, 'alert-info');
            index++;
          } else {
            clearInterval(interval);
          }
        }, 5000);
      }
    };
    const handleTouchStart = event => {
      touchStartX.value = event.changedTouches[0].screenX;
      touchStartY.value = event.changedTouches[0].screenY;
    };
    const handleTouchEnd = event => {
      touchEndX.value = event.changedTouches[0].screenX;
      touchEndY.value = event.changedTouches[0].screenY;
      handleSwipe();
    };
    const handleSwipe = () => {
      const swipeXDistance = touchEndX.value - touchStartX.value;
      const swipeYDistance = touchEndY.value - touchStartY.value;
      const minSwipeDistance = 50;
      const isHorizontalSwipe = Math.abs(swipeXDistance) > Math.abs(swipeYDistance);
      const isVerticalSwipe = Math.abs(swipeYDistance) > Math.abs(swipeXDistance);
      if (isHorizontalSwipe && Math.abs(swipeXDistance) > minSwipeDistance) {
        if (swipeXDistance > 0) {
          increment();
          showAlert(t('swipeRight'), 'alert-success');
        } else {
          decrement();
          showAlert(t('swipeLeft'), 'alert-warning');
        }
      } else if (isVerticalSwipe && Math.abs(swipeYDistance) > minSwipeDistance && swipeYDistance < 0) {
        reset();
        showAlert(t('swipeUp'), 'alert-info');
      }
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
      const clockInterval = setInterval(() => {
        currentTime.value = new Date();
      }, 1000);
      loadSettings();
      loadProgress();
      loadHistory();
      loadDhikrs();
      loadDhikr();
      if (tooltipTrigger.value) {
        new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Tooltip(tooltipTrigger.value, {
          placement: 'top',
          trigger: 'hover'
        });
      }
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(() => {
        clearInterval(clockInterval);
        if (guidedTimer.value) {
          clearInterval(guidedTimer.value);
        }
      });
    });
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.watch)(sessionActive, newVal => {
      if (newVal) {
        sessionStartTime.value = Date.now();
      } else if (sessionStartTime.value) {
        todayTimeSpent.value += Math.floor((Date.now() - sessionStartTime.value) / 1000);
        sessionStartTime.value = null;
        saveProgress();
      }
    });
    return {
      count,
      targetCount,
      selectedDhikr,
      currentTime,
      showSettings,
      soundEnabled,
      hapticEnabled,
      selectedTheme,
      currentLanguage,
      sessionActive,
      voiceInputActive,
      guidedSessionActive,
      selectedGuidedSession,
      guidedTimeRemaining,
      todayTotal,
      todaySessions,
      todayTimeSpent,
      recentHistory,
      calendarDays,
      currentMonth,
      alertMessage,
      alertType,
      newDua,
      selectedDay,
      dayHistory,
      languages,
      dhikrPresets,
      themes,
      guidedSessions,
      currentDhikr,
      customDuas,
      progressPercentage,
      currentTheme,
      dailyQuote,
      guidedProgress,
      currentMonthYear,
      tooltipTrigger,
      collapsedSections,
      deletingDuaId,
      deletingDuaName,
      isDeleting,
      t,
      formatTime,
      formatDate,
      formatDuration,
      formatGuidedTime,
      increment,
      decrement,
      reset,
      loadDhikr,
      changeLanguage,
      applyTheme,
      addCustomDua,
      openDeleteModal,
      confirmDeleteDua,
      toggleSession,
      toggleVoiceInput,
      startGuidedSession,
      stopGuidedSession,
      clearHistory,
      prevMonth,
      nextMonth,
      showDayDetails,
      toggleSection,
      handleTouchStart,
      handleTouchEnd,
      deletingId: null,
      deletingName: '',
      deleteType: '',
      isDeleting: false
    };
  },
  methods: {
    openDeleteModal(id, type) {
      this.deleteType = type;
      if (type === 'dua') {
        const dua = this.customDuas.find(d => d.id === id);
        this.deletingId = id;
        this.deletingName = dua ? dua.transliteration : '';
      } else {
        const entry = this.recentHistory.find(e => e.id === id);
        this.deletingId = id;
        this.deletingName = entry ? entry.dhikr : '';
      }
      const modal = new bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal(document.getElementById('deleteModal'));
      modal.show();
    },
    confirmDelete() {
      this.isDeleting = true;
      if (this.deleteType === 'dua') {
        this.confirmDeleteDua();
      } else {
        this.deleteHistoryEntry();
      }
    },
    deleteHistoryEntry() {
      this.recentHistory = this.recentHistory.filter(entry => entry.id !== this.deletingId);
      localStorage.setItem('recentHistory', JSON.stringify(this.recentHistory));
      this.isDeleting = false;
      this.deletingId = null;
      this.deletingName = '';
      this.deleteType = '';
      const modal = bootstrap__WEBPACK_IMPORTED_MODULE_1__.Modal.getInstance(document.getElementById('deleteModal'));
      modal.hide();
      this.showAlert(this.t('historyDeleted'), 'success');
    },
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = `alert-${type}`;
      setTimeout(() => {
        this.alertMessage = '';
        this.alertType = '';
      }, 3000);
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=template&id=1c15337c&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=template&id=1c15337c&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  key: 0,
  class: "alert alert-dismissible fade show position-fixed top-0 end-0 m-3 alert-success",
  role: "alert",
  style: {
    "z-index": "2000"
  }
};
const _hoisted_2 = {
  class: "navbar navbar-expand-lg shadow-sm sticky-top",
  style: {
    backgroundColor: 'var(--primary-color)'
  }
};
const _hoisted_3 = {
  class: "container"
};
const _hoisted_4 = {
  class: "d-flex align-items-center"
};
const _hoisted_5 = {
  class: "text-white me-3 d-none d-md-block fs-5"
};
const _hoisted_6 = {
  class: "dropdown"
};
const _hoisted_7 = {
  class: "btn btn-outline-light rounded-3 btn-sm dropdown-toggle",
  "data-bs-toggle": "dropdown",
  title: "Language",
  "aria-label": "Select Language"
};
const _hoisted_8 = {
  class: "dropdown-menu dropdown-menu-end"
};
const _hoisted_9 = ["onClick"];
const _hoisted_10 = {
  class: "container py-3"
};
const _hoisted_11 = {
  key: 0,
  class: "mb-3"
};
const _hoisted_12 = {
  class: "card shadow-sm border-0 rounded-3 primary-card"
};
const _hoisted_13 = {
  class: "card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center"
};
const _hoisted_14 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_15 = {
  class: "card-body p-3"
};
const _hoisted_16 = {
  class: "row g-2"
};
const _hoisted_17 = {
  class: "col-md-4"
};
const _hoisted_18 = {
  class: "form-label fw-medium"
};
const _hoisted_19 = ["value"];
const _hoisted_20 = {
  class: "col-md-4"
};
const _hoisted_21 = {
  class: "form-label fw-medium"
};
const _hoisted_22 = {
  class: "form-check form-switch"
};
const _hoisted_23 = {
  class: "form-check-label",
  for: "soundSwitch"
};
const _hoisted_24 = {
  class: "col-md-4"
};
const _hoisted_25 = {
  class: "form-label fw-medium"
};
const _hoisted_26 = {
  class: "form-check form-switch"
};
const _hoisted_27 = {
  class: "form-check-label",
  for: "hapticSwitch"
};
const _hoisted_28 = {
  class: "mt-3"
};
const _hoisted_29 = {
  class: "mb-2 fw-semibold"
};
const _hoisted_30 = {
  class: "row g-2"
};
const _hoisted_31 = {
  class: "col-md-6"
};
const _hoisted_32 = ["placeholder"];
const _hoisted_33 = {
  class: "col-md-6"
};
const _hoisted_34 = ["placeholder"];
const _hoisted_35 = {
  class: "col-md-6"
};
const _hoisted_36 = ["placeholder"];
const _hoisted_37 = {
  class: "col-md-6"
};
const _hoisted_38 = ["placeholder"];
const _hoisted_39 = {
  class: "col-12"
};
const _hoisted_40 = ["placeholder"];
const _hoisted_41 = {
  class: "col-12"
};
const _hoisted_42 = {
  type: "submit",
  class: "btn btn-success rounded-3",
  "aria-label": "Add Custom Dua"
};
const _hoisted_43 = {
  class: "mt-3"
};
const _hoisted_44 = {
  class: "mb-2 fw-semibold"
};
const _hoisted_45 = {
  key: 0,
  class: "custom-duas-list"
};
const _hoisted_46 = {
  class: "card-body d-flex justify-content-between align-items-center p-2"
};
const _hoisted_47 = {
  class: "arabic-text fs-5"
};
const _hoisted_48 = {
  class: "text-muted small"
};
const _hoisted_49 = {
  class: "text-muted smaller mt-1"
};
const _hoisted_50 = ["onClick", "disabled", "aria-label", "title"];
const _hoisted_51 = {
  key: 0,
  class: "spinner-border spinner-border-sm ms-1",
  role: "status"
};
const _hoisted_52 = {
  class: "visually-hidden"
};
const _hoisted_53 = {
  key: 1,
  class: "text-muted text-center p-2 bg-light rounded-3"
};
const _hoisted_54 = {
  class: "row g-3"
};
const _hoisted_55 = {
  class: "col-lg-8"
};
const _hoisted_56 = {
  class: "card shadow-sm border-0 rounded-3 h-100 primary-card",
  style: {
    "border-top": "4px solid var(--primary-color)"
  }
};
const _hoisted_57 = {
  class: "card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center"
};
const _hoisted_58 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_59 = ["title"];
const _hoisted_60 = {
  class: "card-body p-3"
};
const _hoisted_61 = {
  class: "mb-3"
};
const _hoisted_62 = {
  class: "section-title mb-2 fw-semibold text-start text-uppercase small",
  style: {
    "color": "var(--primary-color)"
  }
};
const _hoisted_63 = {
  class: "row g-2"
};
const _hoisted_64 = {
  class: "col-md-8"
};
const _hoisted_65 = ["value"];
const _hoisted_66 = {
  class: "col-md-4"
};
const _hoisted_67 = ["placeholder"];
const _hoisted_68 = {
  class: "mb-3"
};
const _hoisted_69 = {
  class: "section-title mb-2 fw-semibold text-start text-uppercase small",
  style: {
    "color": "var(--primary-color)"
  }
};
const _hoisted_70 = {
  class: "p-3 rounded-3",
  style: {
    "background-color": "#f8f9fa",
    "border-left": "4px solid var(--primary-color)"
  }
};
const _hoisted_71 = {
  class: "arabic-text mb-2 fs-1 fw-semibold",
  style: {
    "color": "var(--primary-dark)"
  }
};
const _hoisted_72 = {
  class: "h4 mb-1 fw-medium text-dark"
};
const _hoisted_73 = {
  class: "text-muted mb-0 fs-5"
};
const _hoisted_74 = {
  class: "mb-3"
};
const _hoisted_75 = {
  class: "section-title mb-2 fw-semibold text-start text-uppercase small",
  style: {
    "color": "var(--primary-color)"
  }
};
const _hoisted_76 = {
  class: "counter-section position-relative bg-light rounded-3 p-3 border border-light"
};
const _hoisted_77 = {
  class: "display-1 fw-semibold text-center mb-2",
  style: {
    "color": "var(--primary-color)"
  }
};
const _hoisted_78 = {
  class: "d-flex justify-content-between small fw-semibold mb-1",
  style: {
    "color": "var(--primary-color)"
  }
};
const _hoisted_79 = {
  class: "progress",
  style: {
    "height": "10px",
    "border-radius": "5px",
    "background-color": "#e9ecef"
  }
};
const _hoisted_80 = {
  class: "mb-2"
};
const _hoisted_81 = {
  class: "section-title mb-2 fw-semibold text-start text-uppercase small",
  style: {
    "color": "var(--primary-color)"
  }
};
const _hoisted_82 = {
  class: "d-flex justify-content-center gap-2 flex-wrap"
};
const _hoisted_83 = {
  class: "col-lg-4"
};
const _hoisted_84 = {
  class: "card shadow-sm border-0 rounded-3 mb-3 primary-card",
  style: {
    "border-top": "4px solid var(--primary-color)"
  }
};
const _hoisted_85 = ["aria-expanded"];
const _hoisted_86 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_87 = ["title"];
const _hoisted_88 = {
  id: "progressTrackingBody",
  class: "card-body p-3 collapse show"
};
const _hoisted_89 = {
  class: "calendar mb-3"
};
const _hoisted_90 = {
  class: "calendar-header mb-2 d-flex justify-content-between align-items-center"
};
const _hoisted_91 = {
  class: "fw-semibold fs-5"
};
const _hoisted_92 = {
  class: "calendar-grid"
};
const _hoisted_93 = ["onClick", "aria-label"];
const _hoisted_94 = {
  class: "mt-2"
};
const _hoisted_95 = {
  class: "d-flex justify-content-between mb-2 fs-6"
};
const _hoisted_96 = {
  class: "badge bg-success fs-6 px-2 py-1"
};
const _hoisted_97 = {
  class: "d-flex justify-content-between mb-2 fs-6"
};
const _hoisted_98 = {
  class: "badge bg-secondary fs-6 px-2 py-1"
};
const _hoisted_99 = {
  class: "d-flex justify-content-between fs-6"
};
const _hoisted_100 = {
  class: "badge bg-secondary fs-6 px-2 py-1"
};
const _hoisted_101 = {
  class: "card shadow-sm border-0 rounded-3 mb-3 secondary-card"
};
const _hoisted_102 = ["aria-expanded"];
const _hoisted_103 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_104 = ["title"];
const _hoisted_105 = {
  key: 0
};
const _hoisted_106 = ["value"];
const _hoisted_107 = {
  key: 1,
  class: "text-center"
};
const _hoisted_108 = {
  class: "mb-2"
};
const _hoisted_109 = {
  class: "h5"
};
const _hoisted_110 = {
  class: "progress",
  style: {
    "height": "12px",
    "border-radius": "6px"
  }
};
const _hoisted_111 = {
  class: "card shadow-sm border-0 rounded-3 mb-3 secondary-card"
};
const _hoisted_112 = ["aria-expanded"];
const _hoisted_113 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_114 = ["title"];
const _hoisted_115 = {
  class: "blockquote text-center mb-0"
};
const _hoisted_116 = {
  class: "mb-1 fs-6"
};
const _hoisted_117 = {
  class: "blockquote-footer"
};
const _hoisted_118 = {
  class: "card shadow-sm border-0 rounded-3 mb-3 secondary-card"
};
const _hoisted_119 = ["aria-expanded"];
const _hoisted_120 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_121 = {
  class: "d-flex align-items-center"
};
const _hoisted_122 = ["title"];
const _hoisted_123 = {
  class: "d-block"
};
const _hoisted_124 = {
  class: "text-muted"
};
const _hoisted_125 = {
  class: "d-flex align-items-center"
};
const _hoisted_126 = {
  class: "badge bg-success me-2"
};
const _hoisted_127 = ["onClick", "disabled", "aria-label", "title"];
const _hoisted_128 = {
  key: 0,
  class: "spinner-border spinner-border-sm ms-1",
  role: "status"
};
const _hoisted_129 = {
  class: "visually-hidden"
};
const _hoisted_130 = {
  key: 0,
  class: "text-muted text-center"
};
const _hoisted_131 = {
  class: "card shadow-sm border-0 rounded-3 mb-3 secondary-card"
};
const _hoisted_132 = ["aria-expanded"];
const _hoisted_133 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_134 = ["title"];
const _hoisted_135 = {
  class: "text-muted dhikr-guide-text fs-6"
};
const _hoisted_136 = {
  class: "list-unstyled dhikr-guide-list"
};
const _hoisted_137 = {
  class: "arabic-text"
};
const _hoisted_138 = {
  class: "modal fade",
  id: "dayDetailsModal",
  tabindex: "-1",
  "aria-labelledby": "dayDetailsModalLabel",
  "aria-hidden": "true"
};
const _hoisted_139 = {
  class: "modal-dialog modal-dialog-centered"
};
const _hoisted_140 = {
  class: "modal-content rounded-3"
};
const _hoisted_141 = {
  class: "card-header grey-header"
};
const _hoisted_142 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_143 = {
  class: "card-body p-3"
};
const _hoisted_144 = {
  key: 0
};
const _hoisted_145 = {
  class: "d-block text-muted"
};
const _hoisted_146 = {
  class: "badge bg-success"
};
const _hoisted_147 = {
  key: 1,
  class: "text-muted text-center"
};
const _hoisted_148 = {
  class: "modal-footer"
};
const _hoisted_149 = {
  type: "button",
  class: "btn btn-secondary rounded-3",
  "data-bs-dismiss": "modal",
  "aria-label": "Close Modal"
};
const _hoisted_150 = {
  class: "modal fade",
  id: "deleteModal",
  tabindex: "-1",
  "aria-labelledby": "deleteModalLabel",
  "aria-hidden": "true"
};
const _hoisted_151 = {
  class: "modal-dialog modal-dialog-centered"
};
const _hoisted_152 = {
  class: "modal-content rounded-3"
};
const _hoisted_153 = {
  class: "card-header grey-header"
};
const _hoisted_154 = {
  class: "mb-0 fw-semibold text-dark"
};
const _hoisted_155 = {
  class: "card-body p-3"
};
const _hoisted_156 = {
  class: "modal-footer"
};
const _hoisted_157 = {
  type: "button",
  class: "btn btn-secondary rounded-3",
  "data-bs-dismiss": "modal",
  "aria-label": "Cancel Deletion"
};
const _hoisted_158 = ["disabled"];
const _hoisted_159 = {
  key: 0,
  class: "spinner-border spinner-border-sm me-2",
  role: "status"
};
const _hoisted_160 = {
  class: "visually-hidden"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    class: "tasbih-app min-vh-100",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      backgroundColor: $setup.currentTheme.background
    }),
    onTouchstart: _cache[34] || (_cache[34] = (...args) => $setup.handleTouchStart && $setup.handleTouchStart(...args)),
    onTouchend: _cache[35] || (_cache[35] = (...args) => $setup.handleTouchEnd && $setup.handleTouchEnd(...args))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Alert for Notifications "), $setup.alertMessage ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.alertMessage) + " ", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    onClick: _cache[0] || (_cache[0] = $event => $setup.alertMessage = ''),
    "aria-label": "Close"
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Navigation Bar "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[37] || (_cache[37] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    class: "navbar-brand text-white fw-bold fs-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-person-arms-up me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Tasbih Counter ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatTime($setup.currentTime)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-light rounded-3 btn-sm me-2",
    onClick: _cache[1] || (_cache[1] = $event => $setup.showSettings = !$setup.showSettings),
    title: "Settings",
    "aria-label": "Toggle Settings"
  }, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentLanguage.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_8, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.languages, lang => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: lang.code
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      class: "dropdown-item text-center",
      onClick: $event => $setup.changeLanguage(lang.code),
      href: "#"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(lang.name), 9 /* TEXT, PROPS */, _hoisted_9)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Settings Panel "), $setup.showSettings ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("section", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_14, [_cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gear-fill me-2",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('settings')), 1 /* TEXT */)]), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "collapse-icon d-none",
    "aria-hidden": "true"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('theme')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select rounded-3",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $setup.selectedTheme = $event),
    onChange: _cache[3] || (_cache[3] = (...args) => $setup.applyTheme && $setup.applyTheme(...args)),
    "aria-label": "Select Theme"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.themes, theme => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: theme.name,
      value: theme.name
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(theme.name), 9 /* TEXT, PROPS */, _hoisted_19);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.selectedTheme]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('soundEnabled')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "checkbox",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $setup.soundEnabled = $event),
    id: "soundSwitch",
    "aria-label": "Toggle Sound"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $setup.soundEnabled]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('soundEnabled')), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('hapticEnabled')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "checkbox",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $setup.hapticEnabled = $event),
    id: "hapticSwitch",
    "aria-label": "Toggle Haptic Feedback"
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $setup.hapticEnabled]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('hapticEnabled')), 1 /* TEXT */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('addCustomDua')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("form", {
    onSubmit: _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $setup.addCustomDua && $setup.addCustomDua(...args), ["prevent"]))
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control rounded-3",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $setup.newDua.arabic = $event),
    placeholder: $setup.t('arabicText'),
    required: "",
    "aria-label": "Arabic Text"
  }, null, 8 /* PROPS */, _hoisted_32), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.newDua.arabic]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control rounded-3",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $setup.newDua.transliteration = $event),
    placeholder: $setup.t('transliteration'),
    required: "",
    "aria-label": "Transliteration"
  }, null, 8 /* PROPS */, _hoisted_34), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.newDua.transliteration]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    class: "form-control rounded-3",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $setup.newDua.translation = $event),
    placeholder: $setup.t('translation'),
    required: "",
    "aria-label": "Translation"
  }, null, 8 /* PROPS */, _hoisted_36), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.newDua.translation]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: "form-control rounded-3",
    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $setup.newDua.defaultCount = $event),
    placeholder: $setup.t('defaultCount'),
    min: "1",
    required: "",
    "aria-label": "Default Count"
  }, null, 8 /* PROPS */, _hoisted_38), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.newDua.defaultCount, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    class: "form-control rounded-3",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $setup.newDua.description = $event),
    placeholder: $setup.t('description'),
    rows: "3",
    "aria-label": "Description"
  }, null, 8 /* PROPS */, _hoisted_40), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.newDua.description]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_42, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('addDua')), 1 /* TEXT */)])])], 32 /* NEED_HYDRATION */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_44, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('customDuas')), 1 /* TEXT */), $setup.customDuas.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_45, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.customDuas, dhikr => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: dhikr.id,
      class: "card mb-2 shadow-sm border-0 rounded-3"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.transliteration) + " | " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.translation), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.description || $setup.t('noDescription')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-danger btn-sm rounded-circle",
      onClick: $event => $options.openDeleteModal(dhikr.id, 'dua'),
      disabled: $setup.isDeleting,
      "aria-label": $setup.t('deleteDuaAria', {
        name: dhikr.transliteration
      }),
      title: $setup.t('deleteDuaAria', {
        name: dhikr.transliteration
      })
    }, [_cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash"
    }, null, -1 /* CACHED */)), $setup.isDeleting && $setup.deletingDuaId === dhikr.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('deleting')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_50)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_53, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('noCustomDuas')), 1 /* TEXT */))])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Main Column (Counter and Dhikr Selection) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_55, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Counter Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_57, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_58, [_cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-counter me-2",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('counter')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "bi bi-info-circle fs-4 cursor-pointer ms-auto",
    style: {
      "color": "var(--primary-color)"
    },
    "data-bs-toggle": "tooltip",
    title: $setup.t('swipeInstructions'),
    ref: "tooltipTrigger",
    "aria-label": "Swipe Instructions"
  }, null, 8 /* PROPS */, _hoisted_59)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dhikr Selection "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_62, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-bookmark-fill me-2"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('dhikrSelection')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_63, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select form-select-lg rounded-3",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => $setup.selectedDhikr = $event),
    onChange: _cache[13] || (_cache[13] = (...args) => $setup.loadDhikr && $setup.loadDhikr(...args)),
    "aria-label": "Select Dhikr"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.dhikrPresets, dhikr => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: dhikr.id,
      value: dhikr.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.arabic) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.transliteration), 9 /* TEXT, PROPS */, _hoisted_65);
  }), 128 /* KEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.selectedDhikr]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: "form-control form-control-lg rounded-3",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $setup.targetCount = $event),
    placeholder: $setup.t('targetCount'),
    min: "1",
    "aria-label": "Target Count"
  }, null, 8 /* PROPS */, _hoisted_67), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $setup.targetCount]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Current Dhikr "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_69, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-text-paragraph me-2"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('currentDhikr')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_71, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentDhikr.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_72, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentDhikr.transliteration), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_73, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentDhikr.translation), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Counter Display and Progress "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_75, [_cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-counter me-2"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('progress')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-link p-0 position-absolute start-0 top-50 translate-middle-y",
    onClick: _cache[15] || (_cache[15] = (...args) => _ctx.prevCounter && _ctx.prevCounter(...args)),
    "aria-label": "Previous Counter"
  }, [...(_cache[45] || (_cache[45] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-left fs-3",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-link p-0 position-absolute end-0 top-50 translate-middle-y",
    onClick: _cache[16] || (_cache[16] = (...args) => _ctx.nextCounter && _ctx.nextCounter(...args)),
    "aria-label": "Next Counter"
  }, [...(_cache[46] || (_cache[46] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-right fs-3",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.count), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('progress')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.progressPercentage.toFixed(1)) + "%", 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $setup.progressPercentage + '%',
      backgroundColor: 'var(--primary-color)'
    })
  }, null, 4 /* STYLE */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_80, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_81, [_cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-sliders me-2"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('actions')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_82, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-success btn-lg rounded-3 px-4 py-2 fw-semibold",
    onClick: _cache[17] || (_cache[17] = (...args) => $setup.increment && $setup.increment(...args)),
    "aria-label": "Increment Count"
  }, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg me-1"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('count')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-secondary btn-lg rounded-3 px-3 py-2 fw-semibold",
    onClick: _cache[18] || (_cache[18] = (...args) => $setup.reset && $setup.reset(...args)),
    "aria-label": "Reset Counter"
  }, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-repeat me-1"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('reset')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-success btn-lg rounded-3 px-3 py-2 fw-semibold",
    onClick: _cache[19] || (_cache[19] = (...args) => $setup.toggleSession && $setup.toggleSession(...args)),
    "aria-label": "Toggle Session"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bi", $setup.sessionActive ? 'bi-pause' : 'bi-play'])
  }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.sessionActive ? $setup.t('pause') : $setup.t('resume')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-success btn-lg rounded-3 px-3 py-2 fw-semibold",
    onClick: _cache[20] || (_cache[20] = (...args) => $setup.toggleVoiceInput && $setup.toggleVoiceInput(...args)),
    "aria-label": "Toggle Voice Input"
  }, [_cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-mic me-1"
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('voiceInput')), 1 /* TEXT */)])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sidebar Column (Progress and Secondary Features) "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_83, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Progress Tracking Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_84, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer",
    onClick: _cache[21] || (_cache[21] = $event => $setup.toggleSection('progressTracking')),
    "data-bs-toggle": "collapse",
    "data-bs-target": "#progressTrackingBody",
    "aria-expanded": !$setup.collapsedSections.progressTracking,
    "aria-controls": "progressTrackingBody"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_86, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-calendar-check-fill me-2",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('progressTracking')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["collapse-icon bi", $setup.collapsedSections.progressTracking ? 'bi-chevron-down' : 'bi-chevron-up']),
    style: {
      "color": "#6c757d"
    },
    "data-bs-toggle": "tooltip",
    title: $setup.collapsedSections.progressTracking ? $setup.t('expand') : $setup.t('collapse'),
    "aria-label": "Toggle Progress Tracking"
  }, null, 10 /* CLASS, PROPS */, _hoisted_87)], 8 /* PROPS */, _hoisted_85), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-outline-secondary rounded-3",
    onClick: _cache[22] || (_cache[22] = (...args) => $setup.prevMonth && $setup.prevMonth(...args)),
    "aria-label": "Previous Month"
  }, [...(_cache[52] || (_cache[52] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-left"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_91, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.currentMonthYear), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-outline-secondary rounded-3",
    onClick: _cache[23] || (_cache[23] = (...args) => $setup.nextMonth && $setup.nextMonth(...args)),
    "aria-label": "Next Month"
  }, [...(_cache[53] || (_cache[53] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-chevron-right"
  }, null, -1 /* CACHED */)]))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_92, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.calendarDays, day => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: day.date,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["calendar-day", {
        completed: day.completed,
        'text-muted': !day.isCurrentMonth
      }]),
      onClick: $event => $setup.showDayDetails(day.date),
      role: "button",
      "aria-label": 'View details for ' + day.day
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.day), 11 /* TEXT, CLASS, PROPS */, _hoisted_93);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_95, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('totalToday')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_96, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.todayTotal), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_97, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('sessions')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_98, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.todaySessions), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_99, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('timeSpent')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_100, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatDuration($setup.todayTimeSpent)), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Guided Session Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_101, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer",
    onClick: _cache[24] || (_cache[24] = $event => $setup.toggleSection('guidedSession')),
    "data-bs-toggle": "collapse",
    "data-bs-target": "#guidedSessionBody",
    "aria-expanded": !$setup.collapsedSections.guidedSession,
    "aria-controls": "guidedSessionBody"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_103, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-play-circle-fill me-2",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('guidedSession')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["collapse-icon bi", $setup.collapsedSections.guidedSession ? 'bi-chevron-down' : 'bi-chevron-up']),
    style: {
      "color": "#6c757d"
    },
    "data-bs-toggle": "tooltip",
    title: $setup.collapsedSections.guidedSession ? $setup.t('expand') : $setup.t('collapse'),
    "aria-label": "Toggle Guided Session"
  }, null, 10 /* CLASS, PROPS */, _hoisted_104)], 8 /* PROPS */, _hoisted_102), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "guidedSessionBody",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["card-body p-2 collapse", {
      show: !$setup.collapsedSections.guidedSession
    }])
  }, [!$setup.guidedSessionActive ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_105, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    class: "form-select mb-2 rounded-3",
    "onUpdate:modelValue": _cache[25] || (_cache[25] = $event => $setup.selectedGuidedSession = $event),
    "aria-label": "Select Guided Session"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.guidedSessions, session => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: session.id,
      value: session.id
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(session.name) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(session.duration) + "min) ", 9 /* TEXT, PROPS */, _hoisted_106);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $setup.selectedGuidedSession]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-success w-100 rounded-3",
    onClick: _cache[26] || (_cache[26] = (...args) => $setup.startGuidedSession && $setup.startGuidedSession(...args)),
    "aria-label": "Start Guided Session"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('startGuided')), 1 /* TEXT */)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_107, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_108, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_109, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatGuidedTime($setup.guidedTimeRemaining)), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_110, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $setup.guidedProgress + '%',
      backgroundColor: 'var(--primary-color)'
    })
  }, null, 4 /* STYLE */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-outline-danger rounded-3",
    onClick: _cache[27] || (_cache[27] = (...args) => $setup.stopGuidedSession && $setup.stopGuidedSession(...args)),
    "aria-label": "Stop Guided Session"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('stopGuided')), 1 /* TEXT */)]))], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Daily Quote Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_111, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer",
    onClick: _cache[28] || (_cache[28] = $event => $setup.toggleSection('dailyQuote')),
    "data-bs-toggle": "collapse",
    "data-bs-target": "#dailyQuoteBody",
    "aria-expanded": !$setup.collapsedSections.dailyQuote,
    "aria-controls": "dailyQuoteBody"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_113, [_cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-quote me-2",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('dailyQuote')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["collapse-icon bi", $setup.collapsedSections.dailyQuote ? 'bi-chevron-down' : 'bi-chevron-up']),
    style: {
      "color": "#6c757d"
    },
    "data-bs-toggle": "tooltip",
    title: $setup.collapsedSections.dailyQuote ? $setup.t('expand') : $setup.t('collapse'),
    "aria-label": "Toggle Daily Quote"
  }, null, 10 /* CLASS, PROPS */, _hoisted_114)], 8 /* PROPS */, _hoisted_112), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "dailyQuoteBody",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["card-body p-2 collapse", {
      show: !$setup.collapsedSections.dailyQuote
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("blockquote", _hoisted_115, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_116, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.dailyQuote.text), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", _hoisted_117, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.dailyQuote.source), 1 /* TEXT */)])], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Recent History Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_118, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer",
    onClick: _cache[30] || (_cache[30] = $event => $setup.toggleSection('recentHistory')),
    "data-bs-toggle": "collapse",
    "data-bs-target": "#recentHistoryBody",
    "aria-expanded": !$setup.collapsedSections.recentHistory,
    "aria-controls": "recentHistoryBody"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_120, [_cache[56] || (_cache[56] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-clock-history me-2",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('recentHistory')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_121, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-sm btn-outline-danger rounded-3 me-2",
    onClick: _cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)((...args) => $setup.clearHistory && $setup.clearHistory(...args), ["stop"])),
    "aria-label": "Clear All History"
  }, [...(_cache[57] || (_cache[57] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-trash"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["collapse-icon bi", $setup.collapsedSections.recentHistory ? 'bi-chevron-down' : 'bi-chevron-up']),
    style: {
      "color": "#6c757d"
    },
    "data-bs-toggle": "tooltip",
    title: $setup.collapsedSections.recentHistory ? $setup.t('expand') : $setup.t('collapse'),
    "aria-label": "Toggle Recent History"
  }, null, 10 /* CLASS, PROPS */, _hoisted_122)])], 8 /* PROPS */, _hoisted_119), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "recentHistoryBody",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["card-body p-2 collapse", {
      show: !$setup.collapsedSections.recentHistory
    }])
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.recentHistory, entry => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: entry.id,
      class: "d-flex justify-content-between align-items-center mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_123, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.dhikr), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_124, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatDate(entry.date)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_125, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_126, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.count), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-outline-danger btn-sm rounded-circle",
      onClick: $event => $options.openDeleteModal(entry.id, 'history'),
      disabled: $setup.isDeleting,
      "aria-label": $setup.t('deleteHistoryAria', {
        name: entry.dhikr
      }),
      title: $setup.t('deleteHistoryAria', {
        name: entry.dhikr
      })
    }, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-trash"
    }, null, -1 /* CACHED */)), $setup.isDeleting && $setup.deletingId === entry.id ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_128, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_129, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('deleting')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_127)])]);
  }), 128 /* KEYED_FRAGMENT */)), $setup.recentHistory.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_130, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('noHistory')), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 2 /* CLASS */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Dhikr Guide Card "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_131, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "card-header grey-header rounded-top-3 d-flex justify-content-between align-items-center cursor-pointer",
    onClick: _cache[31] || (_cache[31] = $event => $setup.toggleSection('dhikrGuide')),
    "data-bs-toggle": "collapse",
    "data-bs-target": "#dhikrGuideBody",
    "aria-expanded": !$setup.collapsedSections.dhikrGuide,
    "aria-controls": "dhikrGuideBody"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", _hoisted_133, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-book-fill me-2",
    style: {
      "color": "var(--primary-color)"
    }
  }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('dhikrGuide')), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["collapse-icon bi", $setup.collapsedSections.dhikrGuide ? 'bi-chevron-down' : 'bi-chevron-up']),
    style: {
      "color": "#6c757d"
    },
    "data-bs-toggle": "tooltip",
    title: $setup.collapsedSections.dhikrGuide ? $setup.t('expand') : $setup.t('collapse'),
    "aria-label": "Toggle Dhikr Guide"
  }, null, 10 /* CLASS, PROPS */, _hoisted_134)], 8 /* PROPS */, _hoisted_132), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    id: "dhikrGuideBody",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["card-body p-2 collapse", {
      show: !$setup.collapsedSections.dhikrGuide
    }])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_135, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('dhikrGuideText')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_136, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.dhikrPresets, dhikr => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: dhikr.id,
      class: "mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_137, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.arabic), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.transliteration) + "): " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(dhikr.description), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])], 2 /* CLASS */)])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Floating Action Button "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "fab d-lg-none",
    onClick: _cache[32] || (_cache[32] = (...args) => $setup.increment && $setup.increment(...args)),
    title: "Increment Count",
    "aria-label": "Increment Count"
  }, [...(_cache[60] || (_cache[60] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-lg"
  }, null, -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Day Details Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_138, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_139, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_140, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_141, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_142, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('dayDetails')) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.selectedDay), 1 /* TEXT */), _cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_143, [$setup.dayHistory.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_144, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($setup.dayHistory, entry => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: entry.id,
      class: "d-flex justify-content-between align-items-center mb-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.dhikr), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_145, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatDate(entry.date)) + " " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.formatTime(entry.date)), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_146, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.count), 1 /* TEXT */)]);
  }), 128 /* KEYED_FRAGMENT */))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_147, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('noActivity')), 1 /* TEXT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_148, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_149, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('close')), 1 /* TEXT */)])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Delete Confirmation Modal "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_150, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_151, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_152, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_153, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_154, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.deleteType === 'dua' ? $setup.t('deleteDuaTitle') : $setup.t('deleteHistoryTitle')), 1 /* TEXT */), _cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_155, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.deleteType === 'dua' ? $setup.t('deleteConfirm', {
    name: $setup.deletingName
  }) : $setup.t('deleteHistoryConfirm', {
    name: $setup.deletingName
  })), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_156, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_157, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('cancel')), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "btn btn-danger rounded-3",
    onClick: _cache[33] || (_cache[33] = (...args) => $options.confirmDelete && $options.confirmDelete(...args)),
    disabled: $setup.isDeleting,
    "aria-label": "Confirm Deletion"
  }, [$setup.isDeleting ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_159, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_160, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('deleting')), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($setup.t('delete')), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_158)])])])])])], 36 /* STYLE, NEED_HYDRATION */);
}

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Amiri:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;500;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n[data-v-1c15337c]:root {\n  --primary-color: #0db691;\n  --primary-dark: #0a9974;\n  --fab-color: #28a745;\n  --fab-dark: #218838;\n  --header-bg: rgba(13, 182, 145, 0.05);\n  --header-border: rgba(13, 182, 145, 0.2);\n}\n.tasbih-app[data-v-1c15337c] {\n  font-family: 'Inter', 'Amiri', 'Noto Sans Arabic', sans-serif;\n  background: linear-gradient(to bottom, #f0f9f7, #f0f0f8);\n}\n.arabic-text[data-v-1c15337c] {\n  font-family: 'Amiri', 'Noto Sans Arabic', serif;\n  font-weight: 600;\n  line-height: 2.2;\n  font-size: 1.1em;\n}\n.fab[data-v-1c15337c] {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  width: 60px;\n  height: 60px;\n  font-size: 2rem;\n  background: linear-gradient(135deg, var(--fab-color), var(--fab-dark));\n  color: white;\n  border-radius: 50%;\n  box-shadow: 0 4px 16px rgba(40, 167, 69, 0.4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n}\n.fab[data-v-1c15337c]:hover {\n  background: linear-gradient(135deg, var(--fab-dark), var(--fab-color));\n  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.6);\n}\n.btn-circle[data-v-1c15337c] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  font-size: 1.25rem;\n  box-shadow: 0 4px 8px rgba(13, 182, 145, 0.3);\n}\n.btn-circle[data-v-1c15337c]:hover {\n  box-shadow: 0 6px 12px rgba(13, 182, 145, 0.5);\n}\n.digital-counter[data-v-1c15337c] {\n  font-family: 'Orbitron', 'Roboto Mono', monospace;\n  font-size: 7rem;\n  letter-spacing: 2px;\n  text-shadow: 0 2px 8px rgba(13, 182, 145, 0.3);\n  background: linear-gradient(to right, var(--primary-color), var(--primary-dark));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  padding: 10px 20px;\n  border-radius: 10px;\n  display: inline-block;\n}\n.dhikr-guide-text[data-v-1c15337c] {\n  line-height: 1.8;\n  padding: 0.75rem;\n  margin-bottom: 1rem;\n}\n.dhikr-guide-list[data-v-1c15337c] {\n  line-height: 1.8;\n  padding-left: 0.5rem;\n}\n.dhikr-guide-list li[data-v-1c15337c] {\n  margin-bottom: 1rem;\n}\n.swipe-arrow[data-v-1c15337c] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 1.5rem;\n  color: rgba(13, 182, 145, 0.5);\n}\n.swipe-arrow[data-v-1c15337c]:hover {\n  color: var(--primary-color);\n}\n.swipe-arrow-left[data-v-1c15337c] {\n  left: 10px;\n}\n.swipe-arrow-right[data-v-1c15337c] {\n  right: 10px;\n}\n.calendar-header[data-v-1c15337c] {\n  font-size: 1rem;\n}\n.calendar-grid[data-v-1c15337c] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 6px;\n  padding: 10px;\n}\n.calendar-day[data-v-1c15337c] {\n  padding: 10px;\n  text-align: center;\n  border-radius: 8px;\n  background-color: #e9ecef;\n  font-size: 1rem;\n  cursor: pointer;\n}\n.calendar-day.completed[data-v-1c15337c] {\n  background-color: var(--primary-color);\n  color: white;\n}\n.calendar-day[data-v-1c15337c]:hover {\n  background-color: #d1d5db;\n}\n.primary-card[data-v-1c15337c] {\n  border-radius: 16px;\n  background: white;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n  border: 1px solid #e9ecef;\n}\n.primary-card[data-v-1c15337c]:hover {\n  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);\n}\n.secondary-card[data-v-1c15337c] {\n  border-radius: 12px;\n  background: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e9ecef;\n}\n.secondary-card[data-v-1c15337c]:hover {\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);\n}\n.card-header[data-v-1c15337c] {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid var(--header-border);\n}\n.colored-header[data-v-1c15337c] {\n  background-color: var(--header-bg);\n}\n.card-header h5[data-v-1c15337c],\n.card-header h6[data-v-1c15337c] {\n  margin: 0;\n  line-height: 1.4;\n}\n.collapse-icon[data-v-1c15337c] {\n  font-size: 1.25rem;\n  color: #6c757d;\n  padding: 0.5rem;\n  border-radius: 50%;\n  margin-left: auto;\n}\n.collapse-icon[data-v-1c15337c]:hover {\n  background-color: rgba(13, 182, 145, 0.1);\n  color: var(--primary-color);\n}\n.btn[data-v-1c15337c] {\n  border-radius: 8px;\n  padding: 0.75rem 1.5rem;\n}\n.btn[data-v-1c15337c]:hover {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.btn[data-v-1c15337c]:active {\n  box-shadow: none;\n}\n.btn-success[data-v-1c15337c] {\n  background-color: var(--primary-color);\n  border-color: var(--primary-color);\n}\n.btn-success[data-v-1c15337c]:hover {\n  background-color: var(--primary-dark);\n  border-color: var(--primary-dark);\n}\n.btn-outline-success[data-v-1c15337c] {\n  border-color: var(--primary-color);\n  color: var(--primary-color);\n}\n.btn-outline-success[data-v-1c15337c]:hover {\n  background-color: var(--primary-color);\n  color: white;\n}\n.form-control[data-v-1c15337c],\n.form-select[data-v-1c15337c] {\n  border-radius: 8px;\n  border: 2px solid #e9ecef;\n  padding: 0.75rem;\n}\n.form-control[data-v-1c15337c]:focus,\n.form-select[data-v-1c15337c]:focus {\n  border-color: var(--primary-color);\n  box-shadow: 0 0 0 0.25rem rgba(13, 182, 145, 0.25);\n}\n.navbar[data-v-1c15337c] {\n  backdrop-filter: blur(10px);\n  background: var(--primary-color);\n}\n.dropdown-menu[data-v-1c15337c] {\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);\n  border: none;\n}\n.badge.bg-success[data-v-1c15337c] {\n  background-color: var(--primary-color) !important;\n}\n.badge.bg-info[data-v-1c15337c] {\n  background-color: #6c757d !important;\n}\n.modal-content[data-v-1c15337c] {\n  border-radius: 12px;\n  border: none;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);\n}\n.custom-duas-list .card[data-v-1c15337c] {\n  border-radius: 10px;\n}\n.custom-duas-list .card[data-v-1c15337c]:hover {\n  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);\n}\n.btn-outline-danger.rounded-circle[data-v-1c15337c] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  border-width: 2px;\n}\n.btn-outline-danger.rounded-circle[data-v-1c15337c]:hover {\n  background-color: #dc3545;\n  color: white;\n}\n.btn-outline-danger[data-v-1c15337c]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.smaller[data-v-1c15337c] {\n  font-size: 0.85rem;\n  line-height: 1.4;\n}\n@media (max-width: 768px) {\n.digital-counter[data-v-1c15337c] {\n    font-size: 2.5rem;\n}\n.arabic-text[data-v-1c15337c] {\n    font-size: 1.6rem !important;\n}\n.card-body[data-v-1c15337c] {\n    padding: 1rem;\n}\n.card-header[data-v-1c15337c] {\n    padding: 0.75rem 1rem;\n}\n.btn-circle[data-v-1c15337c] {\n    width: 50px;\n    height: 50px;\n    font-size: 1rem;\n}\n.calendar-day[data-v-1c15337c] {\n    padding: 6px;\n    font-size: 0.85rem;\n}\n.swipe-arrow[data-v-1c15337c] {\n    font-size: 1rem;\n}\n.btn-outline-danger.rounded-circle[data-v-1c15337c] {\n    width: 36px;\n    height: 36px;\n    font-size: 0.9rem;\n}\n.custom-duas-list .card-body[data-v-1c15337c] {\n    flex-direction: column;\n    align-items: flex-start;\n}\n.custom-duas-list .btn[data-v-1c15337c] {\n    margin-top: 0.5rem;\n    align-self: flex-end;\n}\n.primary-card[data-v-1c15337c] {\n    border-radius: 12px;\n}\n.primary-card .card-header h5[data-v-1c15337c] {\n    font-size: 1.25rem;\n}\n.secondary-card .card-header h6[data-v-1c15337c] {\n    font-size: 1rem;\n}\n.form-select-lg[data-v-1c15337c],\n  .form-control-lg[data-v-1c15337c] {\n    font-size: 1rem !important;\n    padding: 0.5rem !important;\n}\n.btn-lg[data-v-1c15337c] {\n    font-size: 1rem !important;\n    padding: 0.5rem 1rem !important;\n}\n.collapse-icon[data-v-1c15337c] {\n    font-size: 1rem;\n    padding: 0.4rem;\n}\n.fab[data-v-1c15337c] {\n    width: 56px;\n    height: 56px;\n    font-size: 1.5rem;\n}\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/laravel-mix/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TasbeehComponent_vue_vue_type_style_index_0_id_1c15337c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_laravel_mix_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TasbeehComponent_vue_vue_type_style_index_0_id_1c15337c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TasbeehComponent_vue_vue_type_style_index_0_id_1c15337c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/TasbeehComponent.vue":
/*!******************************************************!*\
  !*** ./resources/js/components/TasbeehComponent.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TasbeehComponent_vue_vue_type_template_id_1c15337c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TasbeehComponent.vue?vue&type=template&id=1c15337c&scoped=true */ "./resources/js/components/TasbeehComponent.vue?vue&type=template&id=1c15337c&scoped=true");
/* harmony import */ var _TasbeehComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TasbeehComponent.vue?vue&type=script&lang=js */ "./resources/js/components/TasbeehComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _TasbeehComponent_vue_vue_type_style_index_0_id_1c15337c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css */ "./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_TasbeehComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_TasbeehComponent_vue_vue_type_template_id_1c15337c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-1c15337c"],['__file',"resources/js/components/TasbeehComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/TasbeehComponent.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./resources/js/components/TasbeehComponent.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TasbeehComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TasbeehComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TasbeehComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TasbeehComponent_vue_vue_type_style_index_0_id_1c15337c_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css */ "./node_modules/laravel-mix/node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=style&index=0&id=1c15337c&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/TasbeehComponent.vue?vue&type=template&id=1c15337c&scoped=true":
/*!************************************************************************************************!*\
  !*** ./resources/js/components/TasbeehComponent.vue?vue&type=template&id=1c15337c&scoped=true ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TasbeehComponent_vue_vue_type_template_id_1c15337c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_TasbeehComponent_vue_vue_type_template_id_1c15337c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./TasbeehComponent.vue?vue&type=template&id=1c15337c&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/TasbeehComponent.vue?vue&type=template&id=1c15337c&scoped=true");


/***/ })

}]);