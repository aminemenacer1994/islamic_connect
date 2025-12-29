import { defineComponent, defineAsyncComponent } from 'vue'
import roadmapData from './data/roadmap.json'
import quizzesData from './data/quizzes.json'
import faqChapters from './data/faqs.json'
import commonQuestionsData from './data/commonQuestions.json'
import premiumResources from './data/premiumResources.json'
import duasData from './data/duas.json'
import homeworkData from './data/homework.json'
import missionsData from './data/missions.json'
import onboardingData from './data/onboarding.json'
import chapterDosDonts from './data/chapterDosDonts.json'
import chapterKeyInsights from './data/keyInsights.json'
import chapterGuidance from './data/chapterGuidance.json'
import chapterToneFocus from './data/chapterToneFocus.json'
import chapterGuidedPathway from './data/chapterGuidedPathway.json'
import chapterGentleStart from './data/chapterGentleStart.json'
import chapterSectionStats from './data/chapterSectionStats.json'
import chapterLessonOverview from './data/chapterLessonOverview.json'
import chapterResources from './data/chapterResources.json'
import nextStepPrompts from './data/nextStepPrompts.json'
import chapterPlanGuides from './data/chapterPlanGuides.json'
import { jsPDF } from 'jspdf'

const normalizeJson = (value) => {
  if (value && Array.isArray(value)) return value
  if (value && value.default && Array.isArray(value.default)) return value.default
  return []
}

const VIDEO_ACCENT_PAIRS = [
  { primary: '#0f766e', secondary: '#5eead4' },
  { primary: '#1d4ed8', secondary: '#a5b4fc' },
  { primary: '#7c2d12', secondary: '#fb923c' },
  { primary: '#1e3a8a', secondary: '#3b82f6' },
  { primary: '#047857', secondary: '#34d399' },
  { primary: '#4c1d95', secondary: '#c084fc' }
]

const VIDEO_TAG_RULES = [
  {
    tag: 'Family Struggle',
    keywords: ['family', 'parent', 'parents', 'mother', 'father', 'children', 'kids', 'sister', 'brother', 'pressure', 'shame']
  },
  {
    tag: 'Ex-Christian',
    keywords: ['christian', 'jesus', 'bible', 'church', 'catholic', 'protestant', 'faith', 'christianity']
  },
  {
    tag: 'Funny',
    keywords: ['funny', 'comedy', 'comedian', 'laugh', 'humor', 'stand up', 'stand-up']
  },
  {
    tag: 'Quick Win',
    keywords: ['quick', 'short', 'minutes', '2 minutes', '3 minutes', 'mini', 'fast', 'brief', '90 seconds']
  },
  {
    tag: 'Community',
    keywords: ['community', 'tribe', 'friends', 'circle', 'mosque', 'support']
  },
  {
    tag: 'Faith Journey',
    keywords: ['revert', 'convert', 'conversion', 'shahada', 'journey to islam', 'found islam', 'embraced islam']
  },
  {
    tag: 'Inspiration',
    keywords: ['inspiring', 'hope', 'resilience', 'strength', 'courage', 'powerful']
  }
]

const MIN_STORIES_FOR_FILTERS = 20
const DURATION_FILTERS = [
  { value: 'all', label: 'All durations' },
  { value: 'short', label: 'Short (< 2.5 min)' },
  { value: 'medium', label: 'Medium (2.5 - 4 min)' },
  { value: 'long', label: 'Long (> 4 min)' }
]
const GENDER_FILTERS = [
  { value: 'all', label: 'All genders' },
  { value: 'female', label: 'Female stories' },
  { value: 'male', label: 'Male stories' },
  { value: 'other', label: 'Other' }
]
const BACKGROUND_TAG_PRIORITY = ['Ex-Christian', 'Family Struggle', 'Faith Journey', 'Inspiration', 'Community', 'Funny', 'Quick Win']

const FEMALE_KEYWORDS = ['she', 'her', 'woman', 'women', 'sister', 'mom', 'mother', 'girl', 'lady', 'daughter', 'female']
const MALE_KEYWORDS = ['he', 'his', 'man', 'men', 'brother', 'dad', 'father', 'boy', 'guy', 'husband', 'male']

const DEFAULT_DAILY_CHALLENGES = [
  {
    id: 'insight-note',
    title: 'Challenge one',
    description: '* Morning: Recite "Lā ilāha illallāh" 100 times with reflection. Noon: Learn one Name of Allāh and reflect on it throughout the day.'
  },
  {
    id: 'share-moment',
    title: 'Challenge two',
    description: 'Afternoon: Spot 3 signs of Allāhs Lordship around you. Evening: Purify one intention before an act of worship.'
  },
  {
    id: 'routine-tie',
    title: 'Challenge three',
    description: 'Night: Recite Ayat al-Kursī (2:255) before sleep – the greatest āyah on Tawheed.'
  }
]

const createChapterToolEntry = ({ loader, ...config }) => {
  let loadPromise
  const loadModule = () => {
    if (!loadPromise) {
      loadPromise = loader()
    }
    return loadPromise
  }

  return {
    ...config,
    component: defineAsyncComponent({
      loader: loadModule,
      suspensible: true
    }),
    preload: loadModule
  }
}

const CHAPTER_TOOL_MAP = {
  4: createChapterToolEntry({
    title: 'Surah Explorer',
    description: 'Search the Qur’an text and recitations without leaving the chapter.',
    icon: 'bi-menu-book',
    loader: () => import('./SuratComponent.vue'),
    route: '/surat'
  }),
  5: createChapterToolEntry({
    title: 'Seerah Timeline',
    description: 'Trace the Prophet ﷺ’s story while the lessons stay anchored.',
    icon: 'bi-people-fill',
    loader: () => import('./MissionComponent.vue'),
    route: '/mission'
  }),
  6: createChapterToolEntry({
    title: 'Prayer Calendar',
    description: 'Review the upcoming Salah schedule and special nights.',
    icon: 'bi-calendar3',
    loader: () => import('./CalendarComponent.vue'),
    route: '/calendar'
  }),
  7: createChapterToolEntry({
    title: 'Dua & Dhikr Suite',
    description: 'Access curated duas and reminders while studying the Dua chapter.',
    icon: 'bi-heart',
    loader: () => import('./DuaComponent.vue'),
    route: '/dua'
  })
}

const CONFETTI_EXCLUDED_CHAPTERS = new Set([9])

const shouldCelebrateChapter = (chapterId) => {
  if (chapterId == null) return true
  return !CONFETTI_EXCLUDED_CHAPTERS.has(chapterId)
}

const videoTagCache = new WeakMap()
const videoGenderCache = new WeakMap()
const videoDurationCache = new WeakMap()
const videoUrlIdCache = new Map()

const REVERTS_GUIDE_STEPS = [
  {
    title: 'Start with the roadmap',
    description:
      'Scan the pills to understand the chapter flow completed lessons glow teal, the next gate glows gold, and locked chapters are gently dimmed.',
    actions: [
      'Tap the chapter you want to revisit to refresh context before diving back in.',
      'Use the completion badges to remind yourself how much you have already accomplished.'
    ],
    notes: 'Remember: unlocking a new chapter is simply a matter of feeling ready; the progress bar keeps you honest with milestones.'
  },
  {
    title: 'Refine your tone & pace',
    description:
      'The right column curates tone cues, guided prompts, and next-step reminders so every repetition feels intentionally paced.',
    actions: [
      'Set your breathing with the tone prompt and note whether you need space to pause or a rhythm to steady.',
      'Bookmark any reflection that resonates so it surfaces in your next gentle review.'
    ],
    notes: 'Switch between “slow listen” and “active reflection” modes to keep the experience varied.'
  },
  {
    title: 'Use layered lesson insights',
    description:
      'Each lesson contains an overview, highlight capsules, family-friendly dos/don’ts, and guided pathways that map practice to real life.',
    actions: [
      'Open the highlight cards to see the “why” behind each concept.',
      'Pin a key insight to keep it visible while you work through exercises or mission prompts.'
    ],
    notes: 'Look for the encouragement badges these spotlight resilient reverts and remind you that struggle is part of the story.'
  },
  {
    title: 'Tap into the sharing & media toolkit',
    description:
      'Play short revert stories, copy or share summaries, and keep the reflections alive with dua cards and guided clips.',
    actions: [
      'Use the share buttons to send a single lesson card or the entire overview to a friend or mentor.',
      'Queue the guided clips as a “reset” track when you need a calming pause mid-study.'
    ],
    notes: 'The copy action also captures the tone you selected, so teammates understand how you want to be supported.'
  },
  {
    title: 'Capture progress and reflect',
    description:
      'Mark steps complete, celebrate confetti milestones, and document what you learned to keep the momentum going.',
    actions: [
      'Use the gentle-start toggles to confirm that each soft landing moment has been honored.',
      'When you finish a chapter, share what moved you in the reflection modal to lock it into memory.'
    ],
    notes: 'Confetti triggers are subtle; the real celebration is the new insight you can carry forward.'
  }
]

const TROUBLESHOOTING_GUIDES = [
  {
    title: 'Chapters are locked',
    description: 'The next lessons open up once you finish the quiz for this chapter.',
    steps: [
      'Choose at least two correct answers before you leave the quiz.',
      'Wait a few seconds so the Next Chapter button can turn on.',
      'Still locked? Refresh the page and go through the chapter again.'
    ]
  },
  {
    title: 'Reflections not saving',
    description: 'Your thoughts stay right here so you can return to them anytime.',
    steps: [
      'Type your reflection before you tap Save.',
      'Switch to regular browsing (not private) so the note can stay.',
      'Want a fresh start? Tap “Create new note” and save again.'
    ]
  },
  {
    title: 'Video or clips won’t play',
    description: 'Videos might wait for you to let the page know you are ready.',
    steps: [
      'Tap anywhere on the page so it knows you are there.',
      'Turn off high-contrast or reduced motion settings while the clip plays.',
      'If it still freezes, refresh the page and try again.'
    ]
  }
]

const getConfettiScale = () => {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1400) return 0.55
  if (window.innerWidth >= 1024) return 0.7
  return 1
}

const scaleConfettiConfig = (config) => {
  const scale = getConfettiScale()
  if (scale === 1) return config
  return {
    ...config,
    particleCount: Math.max(12, Math.round(config.particleCount * scale)),
    spread: Math.max(50, config.spread * (0.8 + scale / 1.25)),
    startVelocity: Math.max(40, config.startVelocity * (0.8 + scale / 2))
  }
}

// FULL-SCREEN EPIC CONFETTI
const fullScreenConfetti = (confettiFn) => {
  if (!confettiFn) return

  // Left shower
  confettiFn(scaleConfettiConfig({
    particleCount: 100,
    spread: 80,
    origin: { x: 0, y: 0.6 },
    drift: 1.5,
    startVelocity: 50,
    gravity: 0.7,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }))

  // Right shower
  confettiFn(scaleConfettiConfig({
    particleCount: 100,
    spread: 80,
    origin: { x: 1, y: 0.6 },
    drift: -1.5,
    startVelocity: 50,
    gravity: 0.7,
    scalar: 1.2,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }))

  // Big center explosion
  confettiFn(scaleConfettiConfig({
    particleCount: 150,
    spread: 120,
    origin: { x: 0.5, y: 0.5 },
    startVelocity: 60,
    scalar: 1.4,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#86efac', '#d1fae5', '#ffffff'],
    shapes: ['square', 'circle'],
    zIndex: 10000,
    disableForReducedMotion: false
  }))
}

const FINAL_CHAPTER_ID = roadmapData.length

const celebrateFinalChapter = (confettiFn) => {
  if (!confettiFn) return
  const bursts = [
    {
      particleCount: 220,
      spread: 200,
      startVelocity: 70,
      scalar: 1.5,
      colors: ['#facc15', '#fb923c', '#f472b6', '#38bdf8', '#22d3ee', '#a855f7']
    },
    {
      particleCount: 180,
      spread: 160,
      startVelocity: 50,
      drift: 0.5,
      colors: ['#34d399', '#a5b4fc', '#fcd34d', '#fb7185']
    },
    {
      particleCount: 140,
      spread: 190,
      startVelocity: 80,
      scalar: 1.6,
      colors: ['#0ea5e9', '#f97316', '#10b981']
    }
  ]

  bursts.forEach(config => {
    confettiFn(scaleConfettiConfig({
      ...config,
      origin: { x: Math.random(), y: Math.random() * 0.6 },
      shapes: ['square', 'circle'],
      zIndex: 10000,
      disableForReducedMotion: false
    }))
  })
}

export default defineComponent({
  name: 'App',

  data() {
    return {
      roadmapData: normalizeJson(roadmapData),
      chapterLessons: normalizeJson(chapterLessonOverview),
      chapterResources: normalizeJson(chapterResources),
      faqChapters: normalizeJson(faqChapters),
      commonQuestionChapters: normalizeJson(commonQuestionsData),
      premiumResources: normalizeJson(premiumResources),
      quizzes: normalizeJson(quizzesData),
      missions: normalizeJson(missionsData),
      duas: normalizeJson(duasData),
      dosDontsChapters: normalizeJson(chapterDosDonts),
      chapterKeyInsights: normalizeJson(chapterKeyInsights),
      guidanceTemplates: normalizeJson(chapterGuidance),
      toneFocusEntries: normalizeJson(chapterToneFocus),
      guidedPathways: normalizeJson(chapterGuidedPathway),
      chapterGentleStarts: normalizeJson(chapterGentleStart),
      sectionStatsByChapter: normalizeJson(chapterSectionStats),
      chapterPlanGuides: normalizeJson(chapterPlanGuides),
      flexiblePlanTracks: [],
      flexibleChapterNotes: [],
      homework: normalizeJson(homeworkData),
      dailyMicroChallenges: {},
      flexibleTracksRequest: null,
      flexibleNotesRequest: null,
      dailyChallengesRequest: null,
      chapterVideos: [],
      chapterVideoMap: {},
      lessonMap: {},
      missionMap: {},
      duasMap: {},
      quizMap: {},
      homeworkMap: {},
      homeworkCache: {},
      homeworkSliceCache: {},
      chapterQuizPassed: false,
      quizQuestions: [],
      currentQuestionIndex: 0,
      quizStatus: null,
      quizFeedback: '',
      selectedOption: null,
      quizCorrectCount: 0,
      quizRequiredCorrect: 2,
      mobileNavOpen: false,
      maxStepReached: 1,
      selectedPill: 1,
      showSuccessAlert: false,
      successMessage: '',
      isWaitingForNext: false,
      faqAccordionState: 0,
      commonAccordionState: 0,
      showResourceModal: false,
      activeResource: null,
      showVideoModal: false,
      showHelpModal: false,
      showCompletionModal: false,
      nextPhaseAmountMinor: 199,
      helpGuideSteps: REVERTS_GUIDE_STEPS,
      shareFriendStatus: '',
      onboarding: normalizeJson(onboardingData),
      resourceCopyStatus: '',
      confettiPromise: null,
      confettiLauncher: null,
      lessonShareStatus: '',
      duaShareStatus: '',
      overviewFontScale: 1,
      duaFontScale: 1,
      globalFontScale: 1,
      lessonOverviewRead: {},
      curatedHighlightCompletion: {},
      sectionVisibility: {},
      cardVisibility: {},
      copyAlertMessage: '',
      copyAlertType: 'info',
      showCopyAlert: false,
      copyAlertTimeout: null,
      lastIncorrectExplanation: null,
      activeVideoId: null,
      secondarySectionsReady: false,
      guidanceCardCache: {},
      lessonDepartmentsCache: {},
      homeworkVisibleCount: 4,
      faqDisplayLimit: 4,
      commonFaqDisplayLimit: 4,
      reduceMotionEnabled: false,
      motionMediaQuery: null,
      motionMediaListener: null,
      previewDesktopMediaQuery: null,
      previewDesktopListener: null,
      previewAutoplayEnabled: false,
      currentStreakDays: 0,
      lastStreakDateKey: '',
      dailyChallengeStatus: {},
      dailyChallengeDate: '',
      confettiEnabled: false,
      clipPlayerId: null,
      previewVideoId: null,
      gentleStepCompletion: {},
      videoSearchTerm: '',
      videoDurationFilter: 'all',
      videoGenderFilter: 'all',
      videoBackgroundFilter: 'all',
      durationFilters: DURATION_FILTERS,
      showScrollFab: false,
      genderFilters: GENDER_FILTERS,
      showVideoFilters: true,
      reflectionNotes: {},
      reflectionInput: '',
      reflectionStatus: '',
      successAlertTimeout: null,
      troubleshootingGuides: TROUBLESHOOTING_GUIDES,
      sessionId: '',
      sessionReturning: false,
      previousSessionChapter: null,
      sessionBannerVisible: false,
      touchPlaybackTriggered: false,
      touchPlaybackTimer: null,
      scrollTopRetryTimer: null
    }
  },

  computed: {
    currentLesson() {
      return this.lessonMap[this.selectedPill] || this.chapterLessons[0]
    },
    currentChapterKeyInsights() {
      const chapterId = this.currentLesson?.chapterId
      return this.chapterKeyInsights.find(entry => entry.chapterId === chapterId) || null
    },
    insightsToShow() {
      return this.currentChapterKeyInsights?.keyInsights?.length
        ? this.currentChapterKeyInsights.keyInsights
        : this.currentLesson?.keyInsights || []
    },
    currentLessonOverview() {
      const chapterId = this.normalizeChapterId()
      if (chapterId == null) return null
      return this.chapterLessons.find(entry => entry.chapterId === chapterId) || null
    },
    currentChapterResources() {
      const chapterId = this.currentLesson?.chapterId
      if (chapterId == null) return null
      return this.chapterResources.find(entry => entry.chapterId === chapterId) || null
    },
    currentChapterPlans() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.chapterPlanGuides.find(guide => guide.chapterId === chapterId)
      return entry?.plans || []
    },
    isCurrentLessonOverviewRead() {
      const chapterId = this.currentLesson?.chapterId
      return Boolean(chapterId && this.lessonOverviewRead[chapterId])
    },
    overviewSections() {
      return this.currentLessonOverview?.overview || []
    },
    overviewSectionsWithKeys() {
      return this.overviewSections.map((section, index) => ({
        ...section,
        toggleKey: this.sectionToggleId('overview', section, index)
      }))
    },
    lessonSectionsWithKeys() {
      const sections = this.currentLesson?.sections || []
      return sections.map((section, index) => ({
        ...section,
        toggleKey: this.sectionToggleId('lesson', section, index)
      }))
    },
    quizHintExplanation() {
      return this.lastIncorrectExplanation?.text || this.currentQuestion?.explanation || ''
    },
    quizHintSectionId() {
      if (this.lastIncorrectExplanation?.sectionId) {
        return this.lastIncorrectExplanation.sectionId
      }
      const question = this.currentQuestion
      if (!question) return ''
      const sectionIndex = question.sectionIndex ?? 0
      const section = this.currentLesson?.sections?.[sectionIndex]
      return section ? `section-${this.selectedPill}-${sectionIndex}` : ''
    },
    chapterCommonPanels() {
      const chapterId = this.normalizeChapterId()
      if (chapterId == null) return []
      const chapter = this.commonQuestionChapters.find(entry => entry.chapterId === chapterId)
      return chapter?.faqs || []
    },
    chapterFaqPanels() {
      const chapterId = this.normalizeChapterId()
      if (chapterId == null) return []
      const chapter = this.faqChapters.find(entry => entry.chapterId === chapterId)
      return chapter?.faqs || []
    },
    progressPercentage() {
      return ((this.maxStepReached - 1) / this.roadmapData.length) * 100
    },
    dailyChallenges() {
      this.ensureDailyMicroChallengesLoaded()
      const chapterId = this.currentLesson?.chapterId
      const prompts = this.dailyMicroChallenges[chapterId] || DEFAULT_DAILY_CHALLENGES
      return prompts.map(prompt => {
        const key = this.dailyChallengeStorageKey(prompt.id, chapterId)
        return {
          ...prompt,
          storageKey: key,
          completed: Boolean(this.dailyChallengeStatus[key])
        }
      })
    },
    dailyChallengeProgressPercent() {
      const total = this.dailyChallenges.length
      if (!total) return 0
      const completed = this.dailyChallenges.filter(challenge => challenge.completed).length
      return Math.round((completed / total) * 100)
    },
    dailyChallengeCompletionLabel() {
      const total = this.dailyChallenges.length
      if (!total) return 'Micro-challenges are loading'
      const completed = this.dailyChallenges.filter(challenge => challenge.completed).length
      if (completed === total) return 'All challenges marked complete today'
      return `${completed}/${total} completed`
    },
    dailyChallengeCompletionCount() {
      return this.dailyChallenges.filter(challenge => challenge.completed).length
    },
    currentReflectionNote() {
      const chapterId = this.currentLesson?.chapterId
      return chapterId ? this.reflectionNotes[chapterId] || '' : ''
    },
    completedChapters() {
      return this.maxStepReached - 1
    },
    totalChapters() {
      return this.roadmapData.length
    },
    currentMission() {
      return this.missionMap[this.selectedPill] || this.missions[0]
    },
    currentDuas() {
      return this.duasMap[this.selectedPill] || []
    },
    currentQuizData() {
      return this.quizMap[this.selectedPill] || []
    },
    currentQuestion() {
      return this.quizQuestions[this.currentQuestionIndex]
    },
    currentHomework() {
      return this.getHomeworkContentForChapter(this.selectedPill)
    },
    visibleHomework() {
      return this.getVisibleHomeworkForChapter(this.selectedPill, this.homeworkVisibleCount)
    },
    homeworkMoreAvailable() {
      return this.currentHomework.length > this.homeworkVisibleCount
    },
    visibleFaqPanels() {
      return this.chapterFaqPanels.slice(0, this.faqDisplayLimit)
    },
    visibleCommonPanels() {
      return this.chapterCommonPanels.slice(0, this.commonFaqDisplayLimit)
    },
    faqHasMore() {
      return this.chapterFaqPanels.length > this.faqDisplayLimit
    },
    commonFaqHasMore() {
      return this.chapterCommonPanels.length > this.commonFaqDisplayLimit
    },
    chapterTool() {
      return CHAPTER_TOOL_MAP[this.selectedPill] || null
    },
    chapterToolComponent() {
      return this.chapterTool?.component || null
    },
    guidanceCards() {
      const chapterId = this.currentLesson?.chapterId
      if (!chapterId) return []
      if (!this.guidanceCardCache[chapterId]) {
        this.guidanceCardCache[chapterId] = this.generateGuidanceCards(chapterId)
      }
      return this.guidanceCardCache[chapterId]
    },
    currentToneFocusText() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.toneFocusEntries.find(item => item.chapterId === chapterId)
      return entry?.toneFocus || ''
    },
    guidedPathwayCards() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.guidedPathways.find(item => item.chapterId === chapterId)
      return entry?.pathway || this.guidanceCards
    },
    currentFlexibleTracks() {
      this.ensureFlexiblePlanTracksLoaded()
      const chapterId = this.currentLesson?.chapterId
      return this.flexiblePlanTracks.find(entry => entry.chapterId === chapterId)?.tracks || []
    },
    currentFlexibleNote() {
      this.ensureFlexibleChapterNotesLoaded()
      const chapterId = this.currentLesson?.chapterId
      return this.flexibleChapterNotes.find(item => item.chapterId === chapterId) || null
    },
    currentGentleStartSteps() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.chapterGentleStarts.find(item => item.chapterId === chapterId)
      return entry?.steps || this.currentOnboardingSteps
    },
    gentleStartProgress() {
      const steps = this.currentGentleStartSteps || []
      const total = steps.length
      if (!total) return { total: 0, completed: 0, percent: 0 }
      const completed = steps.reduce((count, _, index) => count + (this.isGentleStepCompleted(index) ? 1 : 0), 0)
      const percent = total ? Math.round((completed / total) * 100) : 0
      return { total, completed, percent }
    },
    sectionStatsMap() {
      const chapterId = this.currentLesson?.chapterId
      const entry = this.sectionStatsByChapter.find(item => item.chapterId === chapterId)
      return entry?.sectionStats || []
    },
    motivationalMessage() {
      return this.chapterQuizPassed
        ? `Chapter ${this.selectedPill} cleared your growing understanding is inviting others to join.`
        : `You're working through Chapter ${this.selectedPill}. Stay curious, every insight builds momentum.`
    },
    motivationalHint() {
      return this.chapterQuizPassed
        ? 'Celebrate the milestone, then absorb the next lesson with the same warmth.'
        : 'Take a few deep breaths, revisit a favorite dua, and keep exploring.'
    },
    alertClass() {
      return this.copyAlertType === 'success' ? 'alert-success' :
        this.copyAlertType === 'danger' ? 'alert-danger' : 'alert-info'
    },
    iconClass() {
      return this.copyAlertType === 'danger' ? 'bi bi-exclamation-triangle-fill text-danger' : 'bi bi-clipboard-check-fill text-teal'
    },
    nextChapterPreview() {
      const nextId = this.selectedPill + 1
      if (nextId > this.roadmapData.length) return null
      const nextChapter = this.roadmapData.find(c => c.id === nextId)
      if (!nextChapter) return null
      const lessonPreview = this.chapterLessons.find(l => l.chapterId === nextId)
      return {
        id: nextChapter.id,
        title: lessonPreview?.title || nextChapter.title,
        track: nextChapter.description,
        snippet: lessonPreview?.summary || nextChapter.description
      }
    }
    ,
    quizProgressLabel() {
      return `${this.quizCorrectCount}/${this.quizRequiredCorrect} correct answers`
    },
    quizStageLabel() {
      if (!this.currentQuestion) return 'Quiz ready'
      return `Question ${this.currentQuestionIndex + 1} / ${this.quizQuestions.length}`
    },
    quizMomentumPercent() {
      const total = this.quizQuestions.length
      if (!total) return 0
      const stageValue = this.currentQuestionIndex + (this.quizStatus === 'correct' ? 1 : 0)
      return Math.min(100, Math.round((stageValue / total) * 100))
    },
    currentQuizSectionTitle() {
      const question = this.currentQuestion
      if (!question) return 'Guided insights'
      const sectionIndex = question.sectionIndex ?? 0
      const section = this.currentLesson?.sections?.[sectionIndex]
      return section?.title || section?.heading || this.currentLesson?.title || 'Guided insights'
    }
    ,
    lessonDepartments() {
      const chapterId = this.currentLesson?.chapterId
      if (!chapterId) return []
      if (!this.lessonDepartmentsCache[chapterId]) {
        this.lessonDepartmentsCache[chapterId] = this.generateLessonDepartments(chapterId)
      }
      return this.lessonDepartmentsCache[chapterId]
    }

    ,
    currentDosDonts() {
      const chapterId = this.currentLesson?.chapterId
      return this.dosDontsChapters.find(entry => entry.chapterId === chapterId) || null
    }

    ,
    chapterVideoEntry() {
      const chapterId = this.currentLesson?.chapterId
      return this.chapterVideoMap[chapterId] || null
    }

    ,
    revertStories() {
      return this.chapterVideoEntry?.revertStories || this.chapterVideoEntry?.videos || []
    }
    ,
    hasStoryFilters() {
      return this.revertStories.length >= MIN_STORIES_FOR_FILTERS
    }
    ,
    filteredRevertStories() {
      const stories = this.revertStories || []
      const term = this.videoSearchTerm.trim().toLowerCase()
      return stories.filter(video => {
        const text = `${video.title || ''} ${video.description || ''}`.toLowerCase()
        if (term && !text.includes(term)) return false
        if (this.videoDurationFilter !== 'all') {
          const seconds = this.getVideoDurationSeconds(video)
          if (seconds <= 0) return false
          if (this.videoDurationFilter === 'short' && seconds >= 150) return false
          if (this.videoDurationFilter === 'medium' && (seconds < 150 || seconds > 240)) return false
          if (this.videoDurationFilter === 'long' && seconds <= 240) return false
        }
        if (this.videoGenderFilter !== 'all') {
          const gender = this.deriveVideoGender(video)
          if (gender !== this.videoGenderFilter) return false
        }
        if (this.videoBackgroundFilter !== 'all') {
          const tags = this.videoTags(video)
          if (!tags.includes(this.videoBackgroundFilter)) return false
        }
        return true
      })
    }
    ,
    backgroundFilterOptions() {
      const tags = new Set()
      this.revertStories.forEach(video => {
        this.videoTags(video).forEach(tag => {
          if (tag) tags.add(tag)
        })
      })
      const orderedTags = Array.from(tags).sort((a, b) => {
        const aIndex = BACKGROUND_TAG_PRIORITY.indexOf(a)
        const bIndex = BACKGROUND_TAG_PRIORITY.indexOf(b)
        if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
      return [{ value: 'all', label: 'All backgrounds' }, ...orderedTags.map(tag => ({ value: tag, label: tag }))]
    }
    ,
    revertStoriesPreview() {
      return this.revertStories.slice(0, 4)
    }
    ,
    pathwayClips() {
      return this.chapterVideoEntry?.pathwayClips || []
    },
    currentOnboardingSteps() {
      const chapterId = this.normalizeChapterId()
      if (chapterId == null) return []
      return this.onboarding.find(o => o.chapterId === chapterId)?.steps || []
    },
    nextPhaseFlexibleStripeUrl() {
      const envUrl = (typeof process !== 'undefined' && process.env && process.env.MIX_STRIPE_NEXT_PHASE_FLEX_URL)
        ? process.env.MIX_STRIPE_NEXT_PHASE_FLEX_URL
        : null
      const donateUrl = (typeof process !== 'undefined' && process.env && process.env.MIX_STRIPE_DONATE_URL)
        ? process.env.MIX_STRIPE_DONATE_URL
        : null
      const appConfigUrl = (typeof window !== 'undefined' && window.appConfig && window.appConfig.stripeNextPhaseFlexibleUrl)
        ? window.appConfig.stripeNextPhaseFlexibleUrl
        : null
      if (envUrl) return envUrl
      if (appConfigUrl) return appConfigUrl
      if (donateUrl) return donateUrl
      return 'https://donate.stripe.com/6oE5kY84oc3q7fy145'
    },
    nextPhaseStripeUrl() {
      const envUrl = (typeof process !== 'undefined' && process.env && process.env.MIX_STRIPE_NEXT_PHASE_URL)
        ? process.env.MIX_STRIPE_NEXT_PHASE_URL
        : null
      const appConfigUrl = (typeof window !== 'undefined' && window.appConfig && window.appConfig.stripeNextPhaseUrl)
        ? window.appConfig.stripeNextPhaseUrl
        : null
      if (envUrl) return envUrl
      if (appConfigUrl) return appConfigUrl
      return `https://donate.stripe.com/6oE5kY84oc3q7fy145?amount=${this.nextPhaseAmountMinor}`
    }
  },

  watch: {
    selectedPill() {
      // Reload the chapter experience whenever navigation moves to another pill.
      this.chapterQuizPassed = false
      this.resetQuizSet()
      this.faqAccordionState = null
      this.commonAccordionState = null
      this.activeVideoId = null
      this.homeworkVisibleCount = 4
      this.faqDisplayLimit = 4
      this.commonFaqDisplayLimit = 4
      this.sectionVisibility = {}
      this.cardVisibility = {}
      this.prepareSecondarySections()
      this.syncReflectionInput()
      this.scheduleChapterToolPreload(this.selectedPill)
      this.scheduleChapterToolPreload(this.selectedPill + 1)
      this.$nextTick(() => {
        this.scrollToTop()
        this.scheduleScrollTopRetry()
      })
    },
    chapterQuizPassed(newVal, oldVal) {
      // Celebrate quiz completion with confetti if global settings allow it.
      if (!this.confettiEnabled) return
      if (newVal && !oldVal) {
        this.launchMicroConfetti()
      }
    },
    // Celebrate finishing the curated micro-challenges for the day.
    dailyChallengeCompletionCount(newVal, oldVal) {
      if (!this.confettiEnabled) return
      const total = this.dailyChallenges.length
      if (total > 0 && newVal === total && (!oldVal || oldVal < total)) {
        this.launchMicroConfetti()
      }
    },
    // Reward streak milestones to keep the momentum visually engaging.
    currentStreakDays(newVal, oldVal) {
      if (!this.confettiEnabled) return
      if (newVal >= 3 && (oldVal || 0) < 3) {
        this.launchMicroConfetti()
      }
    },
    showVideoModal(newVal) {
      if (newVal) {
        this.resetVideoFilters()
        this.showVideoFilters = true
      }
    },
    lessonOverviewRead: {
      handler(value) {
        if (typeof window === 'undefined') return
        try {
          localStorage.setItem('lessonOverviewRead', JSON.stringify(value || {}))
        } catch (err) {
          console.error('Unable to persist lesson overview read state', err)
        }
      },
      deep: true
    },
    curatedHighlightCompletion: {
      handler(value) {
        if (typeof window === 'undefined') return
        try {
          localStorage.setItem('curatedHighlightCompletion', JSON.stringify(value || {}))
        } catch (err) {
          console.error('Unable to persist curated highlight state', err)
        }
      },
      deep: true
    }
  },

  created() {
    this.buildLookupMaps()
    this.loadChapterVideos()
  },

    mounted() {
      const saved = localStorage.getItem('maxStepReached')
      if (saved) {
        const value = parseInt(saved, 10)
        this.maxStepReached = value
        this.selectedPill = value
      }
      this.resetQuizSet()
      this.syncStreakFromStorage()
      this.syncDailyChallenges()
      this.loadGentleStepCompletion()
      this.loadReflectionNotes()
      this.loadLessonOverviewRead()
      this.loadCuratedHighlightCompletion()
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      this.scrollToTop({ behavior: 'auto' })
      this.prepareSecondarySections()
      this.ensureConfettiScript()
      this.initializeMotionPreference()
      this.initializePreviewAutoplayPreference()
      this.scheduleChapterToolPreload(this.selectedPill)
      this.scheduleChapterToolPreload(this.selectedPill + 1)

      window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0)
      })
    window.addEventListener('scroll', this.updateScrollFab, { passive: true })
    this.updateScrollFab()
    this.$nextTick(() => {
      this.confettiEnabled = true
    })
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.updateScrollFab)
    this.teardownMotionPreference()
    this.teardownPreviewAutoplayPreference()
    if (this.scrollTopRetryTimer) {
      clearTimeout(this.scrollTopRetryTimer)
      this.scrollTopRetryTimer = null
    }
    if (this.touchPlaybackTimer) {
      clearTimeout(this.touchPlaybackTimer)
      this.touchPlaybackTimer = null
    }
  },

  methods: {
    ensureConfettiScript() {
      if (this.confettiPromise) return this.confettiPromise
      if (typeof window === 'undefined') {
        this.confettiPromise = Promise.resolve()
        return this.confettiPromise
      }
      if (window.confetti) {
        this.setupConfettiLauncher()
        this.confettiPromise = Promise.resolve()
        return this.confettiPromise
      }
      this.confettiPromise = new Promise(resolve => {
        // Injects the confetti bundle on demand so we only pay for it when needed.
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js'
        script.onload = () => {
          console.log('Confetti loaded & ready!')
          this.setupConfettiLauncher()
          resolve()
        }
        script.onerror = () => resolve()
        document.head.appendChild(script)
      })
      return this.confettiPromise
    },
    launchMicroConfetti() {
      // Skip celebration when the user prefers reduced motion.
      if (this.reduceMotionEnabled) return
      const chapterId = this.currentLesson?.chapterId
      if (!shouldCelebrateChapter(chapterId)) return
      this.ensureConfettiScript().then(() => {
        this.setupConfettiLauncher()
        const confettiFn = this.confettiLauncher || window.confetti
        if (!confettiFn) return
        fullScreenConfetti(confettiFn)
      })
    },

    preloadChapterTool(chapterId) {
      const tool = CHAPTER_TOOL_MAP[chapterId]
      if (!tool?.preload) return
      tool.preload().catch(() => {})
    },

    scheduleChapterToolPreload(chapterId) {
      if (!chapterId) return
      const run = () => this.preloadChapterTool(chapterId)
      if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(run, { timeout: 1000 })
      } else {
        setTimeout(run, 150)
      }
    },

    updateScrollFab() {
      if (typeof window === 'undefined') {
        this.showScrollFab = false
        return
      }
      const doc = document.documentElement
      const scrollableHeight = doc.scrollHeight - window.innerHeight
      if (scrollableHeight <= 0) {
        this.showScrollFab = false
        return
      }
      this.showScrollFab = window.scrollY / scrollableHeight > (1 / 6)
    },

    /**
     * Resets the scroll position again after the initial navigation to cooperate with any
     * late DOM changes (e.g., accordion expansion or video loading) that might push the
     * viewport downward.
     */
    scheduleScrollTopRetry(delay = 220) {
      if (typeof window === 'undefined') return
      if (this.scrollTopRetryTimer) {
        clearTimeout(this.scrollTopRetryTimer)
      }
      this.scrollTopRetryTimer = window.setTimeout(() => {
        this.scrollToTop({ behavior: 'auto' })
        this.scrollTopRetryTimer = null
      }, delay)
    },

    initializeMotionPreference() {
      if (typeof window === 'undefined' || !('matchMedia' in window)) return
      const query = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handler = (event) => {
        this.reduceMotionEnabled = event.matches
      }
      this.motionMediaQuery = query
      this.motionMediaListener = handler
      this.reduceMotionEnabled = query.matches
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', handler)
      } else if (typeof query.addListener === 'function') {
        query.addListener(handler)
      }
    },

    initializePreviewAutoplayPreference() {
      if (typeof window === 'undefined' || !('matchMedia' in window)) return
      const query = window.matchMedia('(min-width: 992px)')
      const handler = (event) => {
        this.previewAutoplayEnabled = event.matches
      }
      this.previewDesktopMediaQuery = query
      this.previewDesktopListener = handler
      this.previewAutoplayEnabled = query.matches
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', handler)
      } else if (typeof query.addListener === 'function') {
        query.addListener(handler)
      }
    },

    teardownMotionPreference() {
      if (!this.motionMediaQuery || !this.motionMediaListener) return
      if (typeof this.motionMediaQuery.removeEventListener === 'function') {
        this.motionMediaQuery.removeEventListener('change', this.motionMediaListener)
      } else if (typeof this.motionMediaQuery.removeListener === 'function') {
        this.motionMediaQuery.removeListener(this.motionMediaListener)
      }
      this.motionMediaQuery = null
      this.motionMediaListener = null
    },

    teardownPreviewAutoplayPreference() {
      if (!this.previewDesktopMediaQuery || !this.previewDesktopListener) return
      if (typeof this.previewDesktopMediaQuery.removeEventListener === 'function') {
        this.previewDesktopMediaQuery.removeEventListener('change', this.previewDesktopListener)
      } else if (typeof this.previewDesktopMediaQuery.removeListener === 'function') {
        this.previewDesktopMediaQuery.removeListener(this.previewDesktopListener)
      }
      this.previewDesktopMediaQuery = null
      this.previewDesktopListener = null
    },

    setupConfettiLauncher() {
      if (this.confettiLauncher) return
      if (typeof window === 'undefined' || !window.confetti) return
      const canvas = this.$refs.confettiCanvas
      if (!canvas) return
      this.confettiLauncher = window.confetti.create(canvas, {
        resize: true,
        useWorker: true,
        disableForReducedMotion: false
      })
    },

    triggerConfetti(isFinalChapter, options = {}) {
      const { skipScroll = false, celebrationChapterId = null } = options
      const chapterId = celebrationChapterId ?? this.currentLesson?.chapterId ?? this.selectedPill
      if (!shouldCelebrateChapter(chapterId)) return
      if (!skipScroll) {
        this.scrollToTop()
      }
      this.ensureConfettiScript().then(() => {
        this.setupConfettiLauncher()
        const confettiFn = this.confettiLauncher || window.confetti
        if (!confettiFn) return
        if (isFinalChapter) {
          celebrateFinalChapter(confettiFn)
          setTimeout(() => celebrateFinalChapter(confettiFn), 600)
        } else {
          fullScreenConfetti(confettiFn)
          setTimeout(() => fullScreenConfetti(confettiFn), 400)
        }
      })
    },

    buildLookupMaps() {
      this.lessonMap = this.chapterLessons.reduce((map, lesson) => {
        if (lesson?.chapterId != null) map[lesson.chapterId] = lesson
        return map
      }, {})
      this.missionMap = this.missions.reduce((map, mission) => {
        if (mission?.chapterId != null) map[mission.chapterId] = mission
        return map
      }, {})
      this.duasMap = this.duas.reduce((map, dua) => {
        if (dua?.chapterId != null) map[dua.chapterId] = dua.duas || []
        return map
      }, {})
      this.quizMap = this.quizzes.reduce((map, quiz) => {
        if (quiz?.chapterId != null) map[quiz.chapterId] = quiz.questions || []
        return map
      }, {})
      this.homeworkMap = this.homework.reduce((map, task) => {
        if (task?.chapterId != null) map[task.chapterId] = task.homework || []
        return map
      }, {})
      this.resetHomeworkCache()
    },

    // Lazy-loads chapter videos to avoid bloating the initial bundle.
    async loadChapterVideos() {
      try {
        const module = await import('./data/chapterVideos.json')
        const chapters = normalizeJson(module)
        this.chapterVideos = chapters
        this.chapterVideoMap = chapters.reduce((map, record) => {
          if (record?.chapterId != null) {
            map[record.chapterId] = record
          }
          return map
        }, {})
      } catch (error) {
        console.error('Unable to load chapter videos', error)
      }
    },

    // Cache homework slices per chapter to avoid recomputing on repeated renders.
    resetHomeworkCache() {
      this.homeworkCache = {}
      this.homeworkSliceCache = {}
    },
    getHomeworkContentForChapter(chapterId) {
      if (!chapterId) return []
      if (!this.homeworkCache[chapterId]) {
        this.homeworkCache[chapterId] = this.homeworkMap[chapterId] || []
      }
      return this.homeworkCache[chapterId]
    },
    getVisibleHomeworkForChapter(chapterId, visibleCount) {
      const tasks = this.getHomeworkContentForChapter(chapterId)
      if (!visibleCount || visibleCount >= tasks.length) {
        return tasks
      }
      if (!this.homeworkSliceCache[chapterId]) {
        this.homeworkSliceCache[chapterId] = {}
      }
      const sliceCache = this.homeworkSliceCache[chapterId]
      if (!sliceCache[visibleCount]) {
        sliceCache[visibleCount] = tasks.slice(0, visibleCount)
      }
      return sliceCache[visibleCount]
    },

    // Lazy-load additional chapter resources only when the user opens those cards.
    ensureFlexiblePlanTracksLoaded() {
      if (this.flexibleTracksRequest) return this.flexibleTracksRequest
      this.flexibleTracksRequest = import('./date/flexiblePlanTracks.json')
        .then(module => {
          this.flexiblePlanTracks = normalizeJson(module)
        })
        .catch(error => {
          console.error('Unable to load flexible plan tracks', error)
        })
      return this.flexibleTracksRequest
    },
    ensureFlexibleChapterNotesLoaded() {
      if (this.flexibleNotesRequest) return this.flexibleNotesRequest
      this.flexibleNotesRequest = import('./date/flexibleChapterNotes.json')
        .then(module => {
          this.flexibleChapterNotes = normalizeJson(module)
        })
        .catch(error => {
          console.error('Unable to load flexible chapter notes', error)
        })
      return this.flexibleNotesRequest
    },
    ensureDailyMicroChallengesLoaded() {
      if (this.dailyChallengesRequest) return this.dailyChallengesRequest
      this.dailyChallengesRequest = import('./date/dailyMicroChallenges.json')
        .then(module => {
          this.dailyMicroChallenges = module?.default || module || {}
        })
        .catch(error => {
          console.error('Unable to load daily micro challenges', error)
        })
      return this.dailyChallengesRequest
    },
    updateStreakRecord() {
      if (typeof window === 'undefined') return
      const todayKey = this.getTodayDateKey()
      if (!todayKey) return
      let nextStreak = 1
      if (this.lastStreakDateKey === todayKey && this.currentStreakDays > 0) {
        nextStreak = this.currentStreakDays
      } else if (this.lastStreakDateKey) {
        const today = new Date(todayKey)
        const last = new Date(this.lastStreakDateKey)
        const diffDays = Math.round((today - last) / (24 * 60 * 60 * 1000))
        if (diffDays === 1) {
          nextStreak = Math.max(this.currentStreakDays, 1) + 1
        } else {
          nextStreak = 1
        }
      } else if (this.currentStreakDays > 0) {
        nextStreak = this.currentStreakDays + 1
      }
      this.currentStreakDays = Math.max(1, nextStreak)
      this.lastStreakDateKey = todayKey
      localStorage.setItem('streakDays', this.currentStreakDays.toString())
      localStorage.setItem('lastStreakDate', todayKey)
    },
    getTodayDateKey() {
      if (typeof window === 'undefined') return ''
      return new Date().toISOString().split('T')[0]
    },
    syncStreakFromStorage() {
      if (typeof window === 'undefined') return
      const stored = Number(localStorage.getItem('streakDays') || 0)
      this.currentStreakDays = Number.isFinite(stored) ? stored : 0
      this.lastStreakDateKey = localStorage.getItem('lastStreakDate') || ''
    },
    syncDailyChallenges() {
      if (typeof window === 'undefined') return
      const todayKey = this.getTodayDateKey()
      const storedDate = localStorage.getItem('dailyChallengeDate') || ''
      if (storedDate !== todayKey) {
        this.dailyChallengeStatus = {}
        this.dailyChallengeDate = todayKey
        localStorage.setItem('dailyChallengeDate', todayKey)
        localStorage.setItem('dailyChallengeStatus', JSON.stringify({}))
        return
      }
      let storedStatus = {}
      try {
        storedStatus = JSON.parse(localStorage.getItem('dailyChallengeStatus') || '{}')
      } catch {
        storedStatus = {}
      }
      this.dailyChallengeStatus = storedStatus
      this.dailyChallengeDate = storedDate || todayKey
    },
    toggleChallenge(storageKey) {
      if (typeof window === 'undefined') return
      const todayKey = this.getTodayDateKey()
      if (this.dailyChallengeDate !== todayKey) {
        this.dailyChallengeStatus = {}
      }
      const nextValue = !this.dailyChallengeStatus[storageKey]
      this.dailyChallengeStatus = {
        ...this.dailyChallengeStatus,
        [storageKey]: nextValue
      }
      this.dailyChallengeDate = todayKey
      localStorage.setItem('dailyChallengeStatus', JSON.stringify(this.dailyChallengeStatus))
      localStorage.setItem('dailyChallengeDate', todayKey)
    },
    dailyChallengeStorageKey(promptId, chapterId = this.currentLesson?.chapterId) {
      if (chapterId == null) return promptId
      return `${chapterId}-${promptId}`
    },
    gentleStepCompletionKey(chapterId, stepIndex) {
      if (chapterId == null) return null
      return `gentle-${chapterId}-${stepIndex}`
    },
    isGentleStepCompleted(stepIndex) {
      const chapterId = this.currentLesson?.chapterId
      const key = this.gentleStepCompletionKey(chapterId, stepIndex)
      return Boolean(key && this.gentleStepCompletion[key])
    },
    toggleGentleStepCompletion(stepIndex) {
      const chapterId = this.currentLesson?.chapterId
      const key = this.gentleStepCompletionKey(chapterId, stepIndex)
      if (!key) return
      const nextValue = !this.gentleStepCompletion[key]
      this.gentleStepCompletion = {
        ...this.gentleStepCompletion,
        [key]: nextValue
      }
      this.persistGentleStepCompletion()
    },
    persistGentleStepCompletion() {
      if (typeof window === 'undefined') return
      localStorage.setItem('gentleStepCompletion', JSON.stringify(this.gentleStepCompletion))
    },
    loadGentleStepCompletion() {
      if (typeof window === 'undefined') return
      try {
        const stored = JSON.parse(localStorage.getItem('gentleStepCompletion') || '{}')
        this.gentleStepCompletion = stored
      } catch {
        this.gentleStepCompletion = {}
      }
    },
    loadReflectionNotes() {
      if (typeof window === 'undefined') return
      try {
        const stored = JSON.parse(localStorage.getItem('reflectionNotes') || '{}')
        this.reflectionNotes = stored
      } catch {
        this.reflectionNotes = {}
      }
      this.syncReflectionInput()
    },
    loadLessonOverviewRead() {
      if (typeof window === 'undefined') return
      try {
        const stored = JSON.parse(localStorage.getItem('lessonOverviewRead') || '{}')
        this.lessonOverviewRead = stored
      } catch {
        this.lessonOverviewRead = {}
      }
    },
    loadCuratedHighlightCompletion() {
      if (typeof window === 'undefined') return
      try {
        const stored = JSON.parse(localStorage.getItem('curatedHighlightCompletion') || '{}')
        this.curatedHighlightCompletion = stored
      } catch {
        this.curatedHighlightCompletion = {}
      }
    },
    syncReflectionInput() {
      const chapterId = this.currentLesson?.chapterId
      if (!chapterId) {
        this.reflectionInput = ''
        return
      }
      this.reflectionInput = this.reflectionNotes[chapterId] || ''
    },
    createNewReflectionNote() {
      this.reflectionInput = ''
      this.reflectionStatus = 'Create a fresh note'
      setTimeout(() => {
        this.reflectionStatus = ''
      }, 2200)
    },
    clearReflectionNote() {
      this.reflectionInput = ''
      this.saveReflectionNote()
    },
    saveReflectionNote() {
      const chapterId = this.currentLesson?.chapterId
      if (!chapterId) return
      const text = this.reflectionInput.trim()
      const nextNotes = { ...this.reflectionNotes }
      if (text) {
        nextNotes[chapterId] = text
      } else {
        delete nextNotes[chapterId]
      }
      this.reflectionNotes = nextNotes
      if (typeof window !== 'undefined') {
        localStorage.setItem('reflectionNotes', JSON.stringify(nextNotes))
      }
      this.reflectionStatus = text ? 'Saved for this chapter' : 'Reflection cleared'
      setTimeout(() => {
        this.reflectionStatus = ''
      }, 2800)
    },
    prepareSecondarySections() {
      this.secondarySectionsReady = false
      if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
        window.requestAnimationFrame(() => {
          this.secondarySectionsReady = true
        })
      } else {
        this.secondarySectionsReady = true
      }
    },
    loadMoreHomework() {
      if (!this.currentHomework.length) return
      this.homeworkVisibleCount = Math.min(this.currentHomework.length, this.homeworkVisibleCount + 4)
    },
    expandFaq(section) {
      if (section === 'common') {
        this.commonFaqDisplayLimit = this.chapterCommonPanels.length
      } else {
        this.faqDisplayLimit = this.chapterFaqPanels.length
      }
    },
    generateGuidanceCards(chapterId) {
      const template = this.guidanceTemplates.find(entry => entry.chapterId === chapterId)
      if (template?.cards?.length) return template.cards
      const lesson = this.lessonMap[chapterId]
      if (!lesson) return []
      const cards = [
        {
          step: '01',
          title: 'Absorb the Story',
          description: `Read through ${lesson.sections?.length || 0} featured sections and soak in the core ideas`,
          action: 'Bookmark key paragraphs and jot down a quick insight'
        },
        {
          step: '02',
          title: 'Internalize Duas & Insights',
          description: lesson.keyInsights?.length ? `Let the ${lesson.keyInsights.length} insights guide your practice` : 'Use the duas to keep the message close to your heart',
          action: lesson.keyInsights?.length ? 'Recite aloud and note how each insight applies today' : 'Practice the duas before sleep'
        },
        {
          step: '03',
          title: 'Take the Quiz',
          description: 'Answer one vibrant question to unlock the next chapter and prove mastery',
          action: 'Choose the right option then scroll to “Next Chapter”'
        }
      ]
      const hasDuas = (this.duasMap[chapterId] || []).length > 0
      if (!hasDuas) {
        cards[1].description = 'Use the glossary, resources, and mission to keep the lesson alive'
        cards[1].action = 'Pin a phrase that resonated most'
      }
      return cards
    },
    generateLessonDepartments(chapterId) {
      const lesson = this.lessonMap[chapterId]
      if (!lesson) return []
      const sections = lesson.sections || []
      if (!sections.length) return []
      const icons = ['bi-gem', 'bi-heart', 'bi-lightbulb', 'bi-book', 'bi-graph-up']
      return sections.slice(0, 3).map((section, index) => ({
        name: section.title.split(' ').slice(0, 2).join(' '),
        summary: section.title,
        detail: section.deepDive?.title || 'Integrated across insights, duas, and missions.',
        icon: icons[index % icons.length]
      }))
    },
    normalizeChapterId(value = this.selectedPill) {
      const numeric = Number(value)
      return Number.isFinite(numeric) ? numeric : null
    },

    toggleMobileNav() {
      this.mobileNavOpen = !this.mobileNavOpen
    },

    selectPill(id) {
      const chapterId = Number(id)
      if (!Number.isFinite(chapterId)) return
      if (chapterId <= this.maxStepReached) {
        this.selectedPill = chapterId
        this.scrollToTop()
      }
      this.mobileNavOpen = false
    },
    openChapterToolNewTab() {
      const tool = this.chapterTool
      if (!tool?.route || typeof window === 'undefined') return
      window.open(tool.route, '_blank', 'noopener,noreferrer')
    },
    stepStatusLabel(step) {
      if (step.id < this.maxStepReached) return 'Completed'
      if (step.id === this.maxStepReached) return 'In progress'
      return 'Locked'
    },

    sectionStatsFor(title) {
      return this.sectionStatsMap.find(entry => entry.title === title)?.stats || []
    },

    sectionToggleId(prefix = 'section', section = {}, index = 0) {
      const heading = section?.heading || section?.title || `section-${index + 1}`
      const label = `${heading}`.toLowerCase()
      const slug = label
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-+|-+$)/g, '')
      const suffix = slug || index
      return `${prefix}-${this.selectedPill}-${suffix}`
    },
    isSectionVisible(sectionKey) {
      if (!sectionKey) return true
      if (Object.prototype.hasOwnProperty.call(this.sectionVisibility, sectionKey)) {
        return Boolean(this.sectionVisibility[sectionKey])
      }
      return true
    },
    toggleSectionVisibility(sectionKey) {
      if (!sectionKey) return
      const currentlyVisible = this.isSectionVisible(sectionKey)
      this.sectionVisibility = {
        ...this.sectionVisibility,
        [sectionKey]: !currentlyVisible
      }
    },

    isCardVisible(cardKey) {
      if (!cardKey) return true
      if (Object.prototype.hasOwnProperty.call(this.cardVisibility, cardKey)) {
        return Boolean(this.cardVisibility[cardKey])
      }
      return true
    },
    toggleCardVisibility(cardKey) {
      if (!cardKey) return
      const currentlyVisible = this.isCardVisible(cardKey)
      this.cardVisibility = {
        ...this.cardVisibility,
        [cardKey]: !currentlyVisible
      }
    },
    toggleVideoFilters() {
      this.showVideoFilters = !this.showVideoFilters
    },
    toggleLessonOverviewRead() {
      const chapterId = this.currentLesson?.chapterId
      if (!chapterId) return
      const nextValue = !Boolean(this.lessonOverviewRead[chapterId])
      this.lessonOverviewRead = {
        ...this.lessonOverviewRead,
        [chapterId]: nextValue
      }
      const message = nextValue ? 'Lesson overview marked as read.' : 'Lesson overview unmarked.'
      this.showSuccessFeedback(message, { duration: 4000 })
    },
    toggleCuratedHighlightCompletion(planId, index, planTitle = '', totalHighlights = 0) {
      if (!planId || index == null) return
      const key = `${planId}-${index}`
      const nextState = {
        ...this.curatedHighlightCompletion,
        [key]: !Boolean(this.curatedHighlightCompletion[key])
      }
      const completed = Boolean(nextState[key])
      this.curatedHighlightCompletion = nextState
      if (!completed || totalHighlights <= 0) return

      const allComplete = Array.from({ length: totalHighlights }, (_, idx) =>
        Boolean(nextState[`${planId}-${idx}`])
      ).every(Boolean)

      if (allComplete) {
        const title = planTitle || 'plan'
        this.showSuccessFeedback(`Congratulations! "${title}" is complete.`, {
          duration: 5000,
          confetti: true,
          skipScroll: true
        })
      }
    },
    isCuratedHighlightCompleted(planId, index) {
      if (!planId || index == null) return false
      const key = `${planId}-${index}`
      return Boolean(this.curatedHighlightCompletion[key])
    },
    showSuccessFeedback(message = '', options = {}) {
      const { duration = 4000, confetti = false, skipScroll = false } = options
      this.successMessage = message
      this.showSuccessAlert = true
      if (this.successAlertTimeout) {
        clearTimeout(this.successAlertTimeout)
        this.successAlertTimeout = null
      }
      if (confetti) {
        this.$nextTick(() => this.triggerConfetti(false, { skipScroll }))
      }
      this.successAlertTimeout = setTimeout(() => {
        this.showSuccessAlert = false
        this.successAlertTimeout = null
      }, duration)
    },

    toggleAccordion(section, index) {
      const stateKey = section === 'faq' ? 'faqAccordionState' : 'commonAccordionState'
      this[stateKey] = this[stateKey] === index ? null : index
    },

    isAccordionOpen(section, index) {
      const stateKey = section === 'faq' ? 'faqAccordionState' : 'commonAccordionState'
      const state = this[stateKey]
      if (state === null) return false
      if (typeof state === 'number') {
        return state === index
      }
      return index === 0
    },

    formatVideoUrl(url, autoplay = false, muted = false) {
      if (!url) return ''
      let embedUrl = url
      if (url.includes('watch?v=')) {
        embedUrl = url.replace('watch?v=', 'embed/')
      } else if (url.includes('youtu.be/')) {
        embedUrl = url.replace('youtu.be/', 'www.youtube.com/embed/')
      }
      const [base, query = ''] = embedUrl.split('?')
      const params = new URLSearchParams(query)
      params.set('rel', '0')
      params.set('modestbranding', '1')
      params.set('playsinline', '1')
      if (autoplay) {
        params.set('autoplay', '1')
      }
      if (muted) {
        params.set('mute', '1')
      }
      return `${base}?${params.toString()}`
    },
    shouldAutoplayVideo() {
      // Force autoplay for every video experience regardless of motion prefs.
      return true
    },
    startPreview(video) {
      if (this.isPlayingVideo(video) || this.isClipPlaying(video)) return
      const id = this.getVideoId(video?.url)
      if (!id) return
      this.previewVideoId = id
    },
    stopPreview() {
      this.previewVideoId = null
    },
    playVideo(video) {
      const id = this.getVideoId(video?.url)
      if (!id) return
      this.stopPreview()
      this.clipPlayerId = null
      this.activeVideoId = this.activeVideoId === id ? null : id
    },
    playClip(clip) {
      const id = this.getVideoId(clip?.url)
      if (!id) return
      this.stopPreview()
      this.activeVideoId = null
      this.clipPlayerId = this.clipPlayerId === id ? null : id
    },
    handleVideoCardClick(video) {
      if (this.touchPlaybackTriggered) {
        this.touchPlaybackTriggered = false
        if (this.touchPlaybackTimer) {
          clearTimeout(this.touchPlaybackTimer)
          this.touchPlaybackTimer = null
        }
        return
      }
      this.playVideo(video)
    },
    handleVideoCardTouch(video) {
      if (this.touchPlaybackTimer) {
        clearTimeout(this.touchPlaybackTimer)
      }
      this.touchPlaybackTriggered = true
      this.playVideo(video)
      const timerTarget = typeof window !== 'undefined' ? window : globalThis
      this.touchPlaybackTimer = timerTarget.setTimeout(() => {
        this.touchPlaybackTriggered = false
        this.touchPlaybackTimer = null
      }, 800)
    },
    isClipPlaying(clip) {
      const id = this.getVideoId(clip?.url)
      return Boolean(id && this.clipPlayerId === id)
    },
    isClipPreviewing(clip) {
      const id = this.getVideoId(clip?.url)
      return Boolean(id && this.previewVideoId === id && this.clipPlayerId !== id)
    },
    isVideoPreviewing(video) {
      const id = this.getVideoId(video?.url)
      return Boolean(
        id &&
        this.previewVideoId === id &&
        this.activeVideoId !== id &&
        this.clipPlayerId !== id
      )
    },
    isPlayingVideo(video) {
      const id = this.getVideoId(video?.url)
      return Boolean(id && this.activeVideoId === id)
    },
    getVideoId(url) {
      if (!url) return null
      const normalizedUrl = url.trim()
      if (!normalizedUrl) return null
      if (videoUrlIdCache.has(normalizedUrl)) {
        return videoUrlIdCache.get(normalizedUrl)
      }
      const match = normalizedUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)
      const id = match ? match[1] : null
      videoUrlIdCache.set(normalizedUrl, id)
      return id
    },
    youTubeThumbnailUrls(video) {
      const videoId = this.getVideoId(video?.url)
      if (!videoId) return []
      return [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      ]
    },
    thumbnailStyle(video) {
      const thumbnails = this.youTubeThumbnailUrls(video)
      const baseStyle = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
      if (thumbnails.length) {
        const overlay = 'linear-gradient(180deg, rgba(5, 150, 105, 0.25), rgba(5, 23, 42, 0))'
        return {
          ...baseStyle,
          backgroundImage: [overlay, ...thumbnails.map(url => `url(${url})`)].join(', ')
        }
      }
      const accent = this.videoAccentPair(video)
      return {
        ...baseStyle,
        backgroundImage: `linear-gradient(145deg, ${accent.primary}, ${accent.secondary}), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 45%)`
      }
    },
    videoAccentPair(video) {
      const palette = VIDEO_ACCENT_PAIRS
      const index = this.hashString(video?.title) % palette.length
      return palette[index]
    },
    hashString(value) {
      if (!value) return 0
      let hash = 0
      for (let i = 0; i < value.length; i++) {
        hash = (hash << 5) - hash + value.charCodeAt(i)
        hash |= 0
      }
      return Math.abs(hash)
    },
    videoTags(video, fallbackTag = 'Revert Story') {
      if (!video) return []
      if (videoTagCache.has(video)) return videoTagCache.get(video)
      const explicitTags = (video.tags || []).filter(Boolean)
      if (explicitTags.length) {
        videoTagCache.set(video, explicitTags)
        return explicitTags
      }
      const text = `${video.title || ''} ${video.description || ''}`.toLowerCase()
      const matches = []
      const seen = new Set()
      for (const rule of VIDEO_TAG_RULES) {
        if (matches.length >= 2) break
        if (seen.has(rule.tag)) continue
        const keywordFound = rule.keywords.some(keyword => text.includes(keyword))
        if (keywordFound) {
          matches.push(rule.tag)
          seen.add(rule.tag)
        }
      }
      const resolved = matches.length ? matches : [fallbackTag]
      videoTagCache.set(video, resolved)
      return resolved
    },

    parseDurationInSeconds(duration) {
      if (!duration) return 0
      const cleaned = `${duration}`.replace(/[^\d:]/g, '').trim()
      if (!cleaned) return 0
      const parts = cleaned.split(':').map(segment => Number(segment.trim()))
      if (parts.some(part => Number.isNaN(part))) return 0
      return parts.reduce((total, part) => total * 60 + part, 0)
    },
    getVideoDurationSeconds(video) {
      if (!video) return 0
      if (videoDurationCache.has(video)) return videoDurationCache.get(video)
      const seconds = this.parseDurationInSeconds(video.duration)
      videoDurationCache.set(video, seconds)
      return seconds
    },
    deriveVideoGender(video) {
      if (!video) return 'other'
      if (videoGenderCache.has(video)) return videoGenderCache.get(video)
      const text = `${video.title || ''} ${video.description || ''}`.toLowerCase()
      let gender = 'other'
      if (FEMALE_KEYWORDS.some(keyword => text.includes(keyword))) {
        gender = 'female'
      } else if (MALE_KEYWORDS.some(keyword => text.includes(keyword))) {
        gender = 'male'
      }
      videoGenderCache.set(video, gender)
      return gender
    },

    completeAndNext() {
      const nextId = this.selectedPill + 1
      const isFinalChapter = this.selectedPill === FINAL_CHAPTER_ID

      if (nextId > this.maxStepReached) {
        this.maxStepReached = nextId
        localStorage.setItem('maxStepReached', nextId.toString())
        this.updateStreakRecord()

        const chapter = this.roadmapData.find(c => c.id === this.selectedPill)
        this.successMessage = isFinalChapter
          ? `You’ve completed the final chapter, “${chapter?.title || 'Chapter'}”! Keep practicing the insights and share them with others.`
          : `"${chapter?.title || 'Chapter'}" chapter has been completed successfully!`

        this.showSuccessAlert = true
        this.isWaitingForNext = true
        if (isFinalChapter) {
          this.showCompletionModal = true
        }

        // FULL-SCREEN CONFETTI PARTY!
        const celebratingChapterId = this.selectedPill
        this.$nextTick(() => {
          this.triggerConfetti(isFinalChapter, { celebrationChapterId: celebratingChapterId })
        })

        // Auto hide toast
        setTimeout(() => {
          this.showSuccessAlert = false
          setTimeout(() => { this.isWaitingForNext = false }, 3000)
        }, 6000)
      }

      if (isFinalChapter) {
        setTimeout(() => {
          this.selectedPill = 1
          this.chapterQuizPassed = false
        }, 900)
      } else if (nextId <= this.roadmapData.length) {
        this.selectedPill = nextId
        this.chapterQuizPassed = false
      }
    },
    retryQuiz() {
      this.resetQuizSet()
      this.quizFeedback = ''
      this.quizStatus = null
      this.selectedOption = null
    },
    openResource(resource) {
      this.activeResource = resource
      this.showResourceModal = true
    },
    closeResourceModal() {
      this.showResourceModal = false
      this.activeResource = null
    }
    ,
    closeVideoModal() {
      this.showVideoModal = false
    }
    ,
    resetVideoFilters() {
      this.videoSearchTerm = ''
      this.videoDurationFilter = 'all'
      this.videoGenderFilter = 'all'
      this.videoBackgroundFilter = 'all'
    }
    ,
    openHelpModal() {
      this.showHelpModal = true
    },
    closeHelpModal() {
      this.showHelpModal = false
    },
    closeCompletionModal() {
      this.showCompletionModal = false
    }
    ,
    // Randomizes the quiz payload so each attempt feels fresh.
    resetQuizSet() {
      const base = this.currentQuizData.map(question => ({
        ...question,
        options: this.shuffleArray(question.options || [])
      }))
      this.quizQuestions = this.shuffleArray(base)
      this.currentQuestionIndex = 0
      this.quizStatus = null
      this.quizFeedback = ''
      this.quizCorrectCount = 0
      this.chapterQuizPassed = false
    },
    advanceQuestion() {
      if (!this.quizQuestions.length) return
      this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.quizQuestions.length
      this.quizStatus = null
      this.selectedOption = null
      this.lastIncorrectExplanation = null
    },
    scrollToNextButton() {
      const nextBtn = document.querySelector('.next-btn')
      if (nextBtn) {
        nextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    },
    scrollToTop({ behavior = 'smooth' } = {}) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior })
      }
      const lessonSection = document.querySelector('.revert-content section')
      if (lessonSection && typeof lessonSection.scrollTo === 'function') {
        lessonSection.scrollTo({ top: 0, behavior })
      }
    },
    copyResourceLink() {
      const link = this.activeResource?.link
      if (!link) return
      navigator.clipboard?.writeText(link)
        .then(() => {
          this.resourceCopyStatus = 'Link copied!'
          this.triggerCopyAlert('Resource link copied!', 'success')
          setTimeout(() => { this.resourceCopyStatus = '' }, 2500)
        })
        .catch(() => {
          this.resourceCopyStatus = 'Unable to copy; please use your browser.'
          setTimeout(() => { this.resourceCopyStatus = '' }, 4000)
      })
    },
    getShareLink() {
      if (typeof window === 'undefined') return ''
      return `${window.location.origin}${window.location.pathname}`
    },
    openWhatsappShare(text) {
      if (!text) return
      if (typeof window === 'undefined') return
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
      window.open(shareUrl, '_blank')
    },
    getPrintableDocument(title, body) {
      const now = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
      const duaItems = body.split('\n').filter(Boolean).map(line => {
        const matches = line.match(/(.+)\s\((.+)\)$/)
        if (matches) {
          return `<div class="dua-card"><strong>${matches[1]}</strong><span class="english">(${matches[2]})</span></div>`
        }
        return `<div class="dua-card">${line}</div>`
      }).join('')
      return `
        <html>
          <head>
            <title>${title}</title>
            <style>
              :root {
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                color: #0f172a;
              }
              body {
                margin: 0;
                padding: 24px;
                background: #f8fafc;
              }
              header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid rgba(15, 23, 42, 0.12);
                padding-bottom: 0.5rem;
              }
              header h1 {
                margin: 0;
                font-size: 1.6rem;
              }
              .date-label {
                font-size: 0.9rem;
                color: #475467;
              }
              .dua-list {
                list-style: none;
                padding: 0;
                margin: 0;
                line-height: 1.6;
                font-size: 1.05rem;
              }
              .dua-card {
                margin-bottom: 1rem;
              }
              .dua-card span.english {
                display: block;
                color: #475467;
                font-size: 0.95rem;
              }
              .footer-note {
                margin-top: 2rem;
                font-size: 0.85rem;
                color: #94a3b8;
              }
            </style>
          </head>
          <body>
            <header>
              <h1>${title}</h1>
              <div class="date-label">${now}</div>
            </header>
            <div class="dua-list">
              ${duaItems}
            </div>
            <p class="footer-note">Content from Islamic Connect · www.islamic-connect.com</p>
          </body>
        </html>
      `
    },

    printContent(title, body) {
      if (typeof window === 'undefined' || typeof document === 'undefined') return
      const printWindow = window.open('', '_blank')
      if (!printWindow) return
      const html = this.getPrintableDocument(title, body)
      printWindow.document.write(html)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    },
    changeScale(target, delta, min, max) {
      this[target] = Math.min(max, Math.max(min, this[target] + delta))
    },
    increaseOverviewFontSize() {
      this.changeScale('overviewFontScale', 0.1, 0.8, 1.6)
    },
    decreaseOverviewFontSize() {
      this.changeScale('overviewFontScale', -0.1, 0.8, 1.6)
    },
    increaseDuaFontSize() {
      this.changeScale('duaFontScale', 0.1, 0.8, 1.6)
    },
    decreaseDuaFontSize() {
      this.changeScale('duaFontScale', -0.1, 0.8, 1.6)
    },
    increaseGlobalFont() {
      this.globalFontScale = Math.min(1.3, this.globalFontScale + 0.05)
    },
    decreaseGlobalFont() {
      this.globalFontScale = Math.max(0.85, this.globalFontScale - 0.05)
    },
    setShareStatus(type, message) {
      if (type === 'lesson') {
        this.lessonShareStatus = message
        setTimeout(() => { this.lessonShareStatus = '' }, 3000)
      } else if (type === 'dua') {
        this.duaShareStatus = message
        setTimeout(() => { this.duaShareStatus = '' }, 3000)
      }
    },
    copyTextToClipboard(text) {
      if (!text || typeof document === 'undefined') return Promise.reject()
      if (navigator.clipboard?.writeText) {
        return navigator.clipboard.writeText(text)
      }
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      textarea.setSelectionRange(0, 99999)
      const successful = document.execCommand('copy')
      document.body.removeChild(textarea)
      return successful ? Promise.resolve() : Promise.reject()
    },
    triggerCopyAlert(message, type = 'info') {
      if (this.copyAlertTimeout) {
        clearTimeout(this.copyAlertTimeout)
      }
      this.copyAlertMessage = message
      this.copyAlertType = type
      this.showCopyAlert = true
      this.copyAlertTimeout = setTimeout(() => {
        this.showCopyAlert = false
        this.copyAlertMessage = ''
        this.copyAlertTimeout = null
      }, 3000)
    },
    getLessonOverviewText() {
      const lesson = this.currentLesson
      if (!lesson) return ''
      const summary = lesson.summary?.trim() || 'Read slowly, ask questions, and pause between each section.'
      return `Lesson Overview: ${lesson.title}\n${summary}\nExplore more on Islamic Connect: ${this.getShareLink()}`
    },
    shareLessonOverview() {
      this.openWhatsappShare(this.getLessonOverviewText())
    },
    copyLessonOverview() {
      const text = this.getLessonOverviewText()
      this.copyTextToClipboard(text)
        .then(() => {
          this.setShareStatus('lesson', 'Lesson overview copied!')
          this.triggerCopyAlert('Lesson overview copied!', 'success')
        })
        .catch(() => {
          this.setShareStatus('lesson', 'Unable to copy.')
        })
    },
    printLessonOverview() {
      this.printContent('Lesson Overview', this.getLessonOverviewText())
    },
    getDuasText() {
      if (!this.currentDuas.length) return ''
      return this.currentDuas
        .map(dua => `${dua.arabic} (${dua.english})`)
        .join('\n')
    },
    shareDuas() {
      const message = `Duas to carry from ${this.currentLesson?.title || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`
      this.openWhatsappShare(message)
    },
    copyDuas() {
      const text = `Duas to carry from ${this.currentLesson?.title || 'this lesson'}:\n${this.getDuasText()}\n${this.getShareLink()}`
      this.copyTextToClipboard(text)
        .then(() => {
          this.setShareStatus('dua', 'Duas copied to clipboard!')
          this.triggerCopyAlert('Duas copied to clipboard!', 'success')
        })
        .catch(() => {
          this.setShareStatus('dua', 'Unable to copy.')
        })
    },
    printDuas() {
      const text = this.getDuasText()
      this.printContent('Duas to Carry', text)
    },
    copyShareLink() {
      const link = this.getShareLink()
      if (!link) return
      this.copyTextToClipboard(link)
        .then(() => {
          this.shareFriendStatus = 'Link copied! Send it so a friend can join.'
          this.triggerCopyAlert('Lesson link copied!', 'success')
          setTimeout(() => { this.shareFriendStatus = '' }, 3000)
        })
        .catch(() => {
          this.shareFriendStatus = 'Unable to copy; please use your browser directly.'
          setTimeout(() => { this.shareFriendStatus = '' }, 4000)
        })
    },
    formatPlanMessage(plan) {
      const chapterTitle = this.currentLesson?.title || 'this chapter'
      const highlights = plan.highlights?.map((item, index) => `${index + 1}. ${item}`).join('\n') || ''
      return `${plan.title} (${plan.duration}) for ${chapterTitle}\n${plan.description}\n\nHighlights:\n${highlights}`
    },
    sharePlan(plan) {
      const message = this.formatPlanMessage(plan)
      this.openWhatsappShare(message)
    },
    copyPlan(plan) {
      const message = this.formatPlanMessage(plan)
      this.copyTextToClipboard(message)
        .then(() => {
          this.triggerCopyAlert('Plan copied to clipboard!', 'success')
        })
        .catch(() => {
          this.triggerCopyAlert('Unable to copy the plan.', 'danger')
        })
    },
    executePlanPrint(plan) {
      const title = `${plan.title} • ${this.currentLesson?.title || 'Chapter'}`
      const body = this.formatPlanMessage(plan)
      this.printContent(title, body)
    },
    printPlan(plan) {
      this.executePlanPrint(plan)
    },
    downloadPlanAsPdf(plan) {
      try {
        const doc = new jsPDF({ unit: 'pt', format: 'letter' })
        const margin = 40
        const pageHeight = doc.internal.pageSize.getHeight()
        let cursorY = 50

        const addText = (text, fontSize = 12, fontStyle = 'normal') => {
          doc.setFontSize(fontSize)
          doc.setFont('helvetica', fontStyle)
          const lines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - margin * 2)
          const lineHeight = fontSize + 4
          const heightNeeded = lines.length * lineHeight
          if (cursorY + heightNeeded > pageHeight - margin) {
            doc.addPage()
            cursorY = margin
          }
          doc.text(lines, margin, cursorY)
          cursorY += heightNeeded + 12
        }

        const titleText = `${plan.title} • ${this.currentLesson?.title || 'Chapter'}`
        addText(titleText, 18, 'bold')
        addText(plan.description, 12, 'normal')

        plan.highlights?.forEach((line, index) => {
          const text = `${index + 1}. ${line}`
          addText(text, 11, 'normal')
        })

        const slug = (this.currentLesson?.title || 'chapter')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-+$/, '')
        doc.save(`${plan.planId}-${slug || 'plan'}.pdf`)
      } catch (error) {
        console.error('Unable to create PDF', error)
        this.triggerCopyAlert('Unable to download the plan right now.', 'danger')
      }
    },
    shuffleArray(arr) {
      return arr.slice().sort(() => Math.random() - 0.5)
    },
    scrollToSection(target) {
      this.$nextTick(() => {
        if (typeof target === 'string') {
          const el = document.getElementById(target)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
          }
          this.scrollToTop()
          return
        }
        const cards = document.querySelectorAll('.guidance-card .guidance-card-item')
        if (cards[target]) {
          cards[target].scrollIntoView({ behavior: 'smooth', block: 'center' })
        } else {
          this.scrollToTop()
        }
      })
    },
    answerQuiz(option) {
      const question = this.currentQuestion
      if (!question) return
      const correct = option === question.answer
      this.quizStatus = correct ? 'correct' : 'incorrect'
      this.selectedOption = option
      if (correct) {
        this.quizCorrectCount++
        this.lastIncorrectExplanation = null
        if (this.quizCorrectCount >= this.quizRequiredCorrect) {
          this.chapterQuizPassed = true
          this.quizFeedback = 'Nicely done! The Next Chapter button is activated.'
          this.$nextTick(() => {
            this.scrollToNextButton()
          })
        } else {
          this.quizFeedback = `Great! ${this.quizCorrectCount}/${this.quizRequiredCorrect} saved ${this.quizRequiredCorrect - this.quizCorrectCount} to go.`
          setTimeout(() => {
            this.advanceQuestion()
          }, 700)
        }
      } else {
        this.quizFeedback = 'Not quite, try another option.'
        const sectionIndex = question.sectionIndex ?? 0
        const section = this.currentLesson?.sections?.[sectionIndex]
        const sectionId = section ? `section-${this.selectedPill}-${sectionIndex}` : ''
        const explanation = question.explanation || ''
        if (explanation) {
          this.lastIncorrectExplanation = {
            text: explanation,
            sectionId
          }
        } else {
          this.lastIncorrectExplanation = null
        }
      }
    }
  },
})
