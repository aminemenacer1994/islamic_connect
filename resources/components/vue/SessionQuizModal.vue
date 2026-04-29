<template>
  <Teleport to="body">
    <Transition name="sq-fade">
      <div
        v-if="isOpen"
        class="sq"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <section ref="cardEl" class="sq__card" tabindex="-1">
          <header class="sq__header">
            <div>
              <p class="sq__kicker">Bismillah · Session quiz</p>
              <h2 class="sq__title">{{ title }}</h2>
            </div>
            <button type="button" class="sq__close" aria-label="Close quiz" :disabled="saving" @click="close">
              <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
          </header>

          <div class="sq__progress">
            <span class="sq__progressText">{{ progressLabel }}</span>
            <div class="sq__bar" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
              <span :style="{ width: `${progress}%` }"></span>
            </div>
          </div>

          <main class="sq__body">
            <div v-if="state === 'error'" class="sq__notice is-error" role="alert">
              {{ error }}
            </div>

            <div v-else-if="state === 'complete'" class="sq__complete">
              <div class="sq__score">
                <span>Score</span>
                <strong>{{ correctCount }}/{{ total }}</strong>
                <small>{{ scorePct }}%</small>
              </div>
              <div v-if="weakAyahs.length" class="sq__weak">
                <strong>Needs review</strong>
                <span v-for="ayah in weakAyahs" :key="`weak-${ayah}`">Ayah {{ ayah }}</span>
              </div>
              <p class="sq__completeNote">
                Alhamdulillah. Your result is saved to your memorisation plan, and weak ayahs are ready for review.
              </p>
              <p class="sq__completeNext mb-0">
                Next: save this result, then open review and practice the ayahs marked for review.
              </p>
              <div v-if="weakAyahs.length" class="sq__actions sq__actions--center">
                <button type="button" class="sqBtn sqBtn--soft" :disabled="saving" @click="retakeWeakAyahs">
                  Review mistakes
                </button>
              </div>
            </div>

            <article v-else-if="currentQuestion" class="sq__question">
              <div class="sq__questionHead">
                <span class="sq__type">{{ typeLabel(currentQuestion.type) }}</span>
                <span>Ayah {{ currentQuestion.ayahNumber }}</span>
              </div>

              <template v-if="currentQuestion.type === 'flashcard'">
                <button
                  type="button"
                  class="sq__flashcard"
                  :class="{ 'is-flipped': isFlipped }"
                  :disabled="saving"
                  @click="isFlipped = !isFlipped"
                >
                  <span v-if="!isFlipped" class="sq__arabic" dir="rtl" lang="ar">
                    {{ currentQuestion.arabicText }}
                  </span>
                  <span v-else class="sq__translation">
                    {{ currentQuestion.translation || 'No translation available for this ayah.' }}
                  </span>
                </button>
                <div v-if="isFlipped && !currentQuestion.answered" class="sq__actions">
                  <button type="button" class="sqBtn sqBtn--soft" :disabled="saving" @click="answerCurrent(false)">Need review</button>
                  <button type="button" class="sqBtn sqBtn--primary" :disabled="saving" @click="answerCurrent(true)">Knew it</button>
                </div>
              </template>

              <template v-else>
                <div class="sq__prompt">
                  <p v-if="currentQuestion.type === 'fill'" class="sq__arabic" dir="rtl" lang="ar">
                    {{ currentQuestion.promptText }}
                  </p>
                  <template v-else>
                    <p class="sq__arabic" dir="rtl" lang="ar">{{ currentQuestion.arabicText }}</p>
                    <p class="sq__hint">{{ currentQuestion.hint }}</p>
                  </template>
                </div>

                <div class="sq__choices" role="group" :aria-label="`Question ${questionNumber} choices`">
                  <button
                    v-for="option in currentQuestion.options"
                    :key="`${currentQuestion.id}-${option.value}`"
                    type="button"
                    class="sq__choice"
                    :class="choiceClass(option)"
                    :disabled="currentQuestion.answered || saving"
                    @click="answerCurrent(option.value === currentQuestion.correctAnswer, option.value)"
                  >
                    <span :dir="currentQuestion.type === 'fill' ? 'rtl' : 'ltr'">{{ option.label }}</span>
                  </button>
                </div>
              </template>

              <div
                v-if="currentQuestion.answered"
                class="sq__feedback"
                :class="{ 'is-good': currentQuestion.correct, 'is-bad': !currentQuestion.correct }"
              >
                {{ currentQuestion.correct ? 'Correct' : 'Needs review' }}
              </div>
            </article>
          </main>

          <footer class="sq__footer">
            <button type="button" class="sqBtn sqBtn--ghost" :disabled="saving || state !== 'quiz' || questionIndex === 0" @click="previousQuestion">
              Previous
            </button>
            <div v-if="state === 'quiz'" class="sq__dots" aria-label="Quiz navigation">
              <button
                v-for="(question, index) in questions"
                :key="`dot-${question.id}`"
                type="button"
                class="sq__dot"
                :class="{ 'is-active': index === questionIndex, 'is-done': question.answered, 'is-wrong': question.answered && !question.correct }"
                :aria-label="`Go to question ${index + 1} (${question.answered ? (question.correct ? 'answered correctly' : 'needs review') : 'not answered'})`"
                :disabled="saving"
                @click="jumpToQuestion(index)"
              ></button>
            </div>
            <button
              v-if="state === 'complete'"
              type="button"
              class="sqBtn sqBtn--primary"
              :disabled="saving"
              @click="save"
            >
              {{ saving ? 'Saving...' : 'Save result' }}
            </button>
            <button
              v-else
              type="button"
              class="sqBtn sqBtn--primary"
              :disabled="saving || !currentQuestion?.answered"
              @click="nextQuestion"
            >
              {{ questionIndex + 1 >= total ? 'Finish' : 'Next' }}
            </button>
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { trackEventOnce } from '../scripts/memorisationTracking'

const MAX_QUESTIONS = 6

const props = defineProps({
  session: { type: Object, required: true },
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close', 'save', 'retake'])

const state = ref('quiz')
const error = ref('')
const questions = ref([])
const questionIndex = ref(0)
const isFlipped = ref(false)
const saving = ref(false)
const quizId = ref('')
const startedAt = ref(0)
const cardEl = ref(null)
// Final UI lock: once saving starts, freeze quiz interactions so result
// emission, draft cleanup, and modal teardown stay single-path and consistent.
const isInteractionLocked = computed(() => saving.value)

const sessionInfo = computed(() => normalizeSession(props.session))
const currentQuestion = computed(() => questions.value[questionIndex.value] || null)
const total = computed(() => questions.value.length)
const questionNumber = computed(() => total.value ? questionIndex.value + 1 : 0)
const correctCount = computed(() => questions.value.filter(q => q.answered && q.correct).length)
const answeredCount = computed(() => questions.value.filter(q => q.answered).length)
const scorePct = computed(() => total.value ? Math.round((correctCount.value / total.value) * 100) : 0)
const progress = computed(() => {
  if (state.value === 'complete') return 100
  return total.value ? Math.round((answeredCount.value / total.value) * 100) : 0
})

const progressLabel = computed(() => {
  if (state.value === 'complete') return 'Complete'
  return `Question ${Math.max(questionNumber.value, 1)} of ${Math.max(total.value, 1)}`
})

const title = computed(() => {
  const session = sessionInfo.value
  const surah = session.surahName || (session.surahNumber ? `Surah ${session.surahNumber}` : 'Memorisation')
  const range = session.rangeStart && session.rangeEnd ? `${session.rangeStart}-${session.rangeEnd}` : ''
  return range ? `${surah} · Ayah ${range}` : surah
})

const weakAyahs = computed(() => {
  const set = new Set()
  questions.value.forEach(question => {
    if (question.answered && !question.correct && question.ayahNumber) {
      set.add(Number(question.ayahNumber))
    }
  })
  return Array.from(set).sort((a, b) => a - b)
})

watch(() => props.isOpen, open => {
  if (open) openQuiz()
  else cleanup()
}, { immediate: true })

watch(() => props.session, () => {
  if (props.isOpen) openQuiz()
})

onBeforeUnmount(cleanup)

watch(state, (next) => {
  if (next !== 'complete') return
  // Fires once per quiz id (retakes get a new quizId).
  trackEventOnce(
    'quiz_completed',
    {
      sessionId: sessionInfo.value.sessionId,
      surahNumber: sessionInfo.value.surahNumber,
      rangeStart: sessionInfo.value.rangeStart,
      rangeEnd: sessionInfo.value.rangeEnd,
      correct: correctCount.value,
      total: total.value
    },
    { dedupeKey: `quiz_completed:${quizId.value || sessionInfo.value.sessionId}` }
  )
})

function openQuiz() {
  const session = sessionInfo.value
  questions.value = []
  questionIndex.value = 0
  isFlipped.value = false
  saving.value = false
  if (!session.ayahs.length) {
    state.value = 'error'
    error.value = 'No ayah text was available for this session.'
    clearDraft()
    lockPage(true)
    nextTick(() => cardEl.value?.focus?.())
    return
  }

  quizId.value = id('quiz')
  startedAt.value = Date.now()
  questions.value = buildQuestions(session)
  questionIndex.value = 0
  isFlipped.value = false
  saving.value = false
  state.value = questions.value.length ? 'quiz' : 'error'
  error.value = questions.value.length ? '' : 'Quiz could not be generated for this session.'
  persistDraft()
  lockPage(true)
  nextTick(() => cardEl.value?.focus?.())
}

function cleanup() {
  questions.value = []
  questionIndex.value = 0
  isFlipped.value = false
  saving.value = false
  lockPage(false)
}

function close() {
  if (isInteractionLocked.value) return
  cleanup()
  emit('close')
}

function previousQuestion() {
  if (isInteractionLocked.value || state.value !== 'quiz') return
  questionIndex.value = clamp(questionIndex.value - 1, 0, Math.max(total.value - 1, 0))
  isFlipped.value = false
  persistDraft()
}

function nextQuestion() {
  if (isInteractionLocked.value || state.value !== 'quiz') return
  if (!currentQuestion.value?.answered) return
  if (questionIndex.value + 1 >= total.value) {
    state.value = 'complete'
    persistDraft()
    return
  }
  questionIndex.value += 1
  isFlipped.value = false
  persistDraft()
}

function jumpToQuestion(index) {
  if (isInteractionLocked.value || state.value !== 'quiz') return
  questionIndex.value = clamp(index, 0, Math.max(total.value - 1, 0))
  isFlipped.value = false
  persistDraft()
}

function answerCurrent(correct, selectedAnswer = null) {
  if (isInteractionLocked.value || state.value !== 'quiz') return
  const question = currentQuestion.value
  if (!question || question.answered) return
  question.answered = true
  question.correct = !!correct
  question.selectedAnswer = selectedAnswer
  question.rating = correct ? 'good' : 'hard'
  persistDraft()
}

function choiceClass(option) {
  const question = currentQuestion.value
  if (!question?.answered) return {}
  const isCorrect = option.value === question.correctAnswer
  const isSelected = option.value === question.selectedAnswer
  return {
    'is-correct': isCorrect,
    'is-wrong': isSelected && !isCorrect
  }
}

function save() {
  if (saving.value || !total.value) return
  saving.value = true
  const result = buildResult()
  persistHistory(result)
  clearDraft()
  emit('save', result)
  setTimeout(() => {
    saving.value = false
    close()
  }, 300)
}

function retakeWeakAyahs() {
  if (isInteractionLocked.value || state.value !== 'complete') return
  const weakSet = new Set(weakAyahs.value.map(Number))
  if (!weakSet.size) return
  const session = {
    ...sessionInfo.value,
    ayahs: sessionInfo.value.ayahs.filter(ayah => weakSet.has(Number(ayah.ayahNumber || 0)))
  }
  quizId.value = id('quiz')
  startedAt.value = Date.now()
  questions.value = buildQuestions(session)
  questionIndex.value = 0
  isFlipped.value = false
  state.value = questions.value.length ? 'quiz' : 'complete'
  persistDraft()
  emit('retake', {
    sessionId: session.sessionId,
    quizId: quizId.value,
    ayahNumbers: Array.from(weakSet).sort((a, b) => a - b)
  })
}

function buildQuestions(session) {
  const ayahs = shuffle(session.ayahs).slice(0, Math.max(MAX_QUESTIONS, session.ayahs.length))
  const built = []

  ayahs.forEach((ayah, index) => {
    if (built.length >= MAX_QUESTIONS) return
    const type = index % 3 === 0 ? 'flashcard' : index % 3 === 1 ? 'fill' : 'multiple'
    const question = type === 'fill'
      ? buildFillQuestion(ayah, session.ayahs)
      : type === 'multiple'
        ? buildMultipleQuestion(ayah, session.ayahs)
        : buildFlashcardQuestion(ayah)
    if (question) built.push(question)
  })

  if (built.length < Math.min(MAX_QUESTIONS, session.ayahs.length)) {
    session.ayahs.forEach(ayah => {
      if (built.length >= MAX_QUESTIONS) return
      if (built.some(question => question.type === 'flashcard' && question.ayahNumber === ayah.ayahNumber)) return
      built.push(buildFlashcardQuestion(ayah))
    })
  }

  return built.filter(Boolean).slice(0, MAX_QUESTIONS)
}

function buildFlashcardQuestion(ayah) {
  return baseQuestion('flashcard', ayah, {
    correctAnswer: 'self',
    options: []
  })
}

function buildFillQuestion(ayah, allAyahs) {
  const words = tokenizeArabic(ayah.arabicText)
  if (words.length < 3) return buildFlashcardQuestion(ayah)
  const blankIndex = Math.min(words.length - 1, Math.max(1, Math.floor(words.length / 2)))
  const correctWord = words[blankIndex]
  const promptText = words.map((word, index) => index === blankIndex ? '_____' : word).join(' ')
  const distractors = unique(
    allAyahs.flatMap(item => tokenizeArabic(item.arabicText)).filter(word => word !== correctWord)
  ).slice(0, 12)
  return baseQuestion('fill', ayah, {
    promptText,
    correctAnswer: correctWord,
    options: shuffle([correctWord, ...shuffle(distractors).slice(0, 3)])
      .map(value => ({ value, label: value }))
  })
}

function buildMultipleQuestion(ayah, allAyahs) {
  const otherAyahs = allAyahs.filter(item => Number(item.ayahNumber) !== Number(ayah.ayahNumber))
  const options = shuffle([ayah, ...shuffle(otherAyahs).slice(0, 3)])
    .map(item => ({
      value: Number(item.ayahNumber),
      label: `Ayah ${Number(item.ayahNumber)}`
    }))
  return baseQuestion('multiple', ayah, {
    correctAnswer: Number(ayah.ayahNumber),
    hint: 'Which ayah number is this?',
    options
  })
}

function baseQuestion(type, ayah, extra = {}) {
  return {
    id: id('q'),
    type,
    ayahNumber: Number(ayah.ayahNumber || 0),
    arabicText: ayah.arabicText || '',
    translation: ayah.translationText || ayah.translation || '',
    answered: false,
    correct: false,
    selectedAnswer: null,
    rating: '',
    ...extra
  }
}

function buildResult() {
  const session = sessionInfo.value
  const endedAt = Date.now()
  const mistakesByAyah = {}
  questions.value.forEach(question => {
    const ayahNumber = Number(question.ayahNumber || 0)
    if (!ayahNumber) return
    if (!mistakesByAyah[ayahNumber]) mistakesByAyah[ayahNumber] = 0
    if (!question.correct) mistakesByAyah[ayahNumber] += 1
  })

  return {
    version: 3,
    quizId: quizId.value || id('quiz'),
    sessionId: session.sessionId,
    savedAt: Date.now(),
    startedAt: startedAt.value,
    endedAt,
    date: session.date,
    surahNumber: session.surahNumber,
    surahName: session.surahName,
    rangeStart: session.rangeStart,
    rangeEnd: session.rangeEnd,
    totalQuestions: total.value,
    correctAnswers: correctCount.value,
    scorePercent: scorePct.value,
    timeSpentSeconds: Math.max(0, Math.round((endedAt - Number(startedAt.value || endedAt)) / 1000)),
    mistakesByAyah,
    cards: questions.value.map(question => ({
      id: question.id,
      type: question.type,
      ayahNumber: question.ayahNumber,
      arabicText: question.arabicText,
      translation: question.translation,
      selectedAnswer: question.selectedAnswer,
      correctAnswer: question.correctAnswer,
      userRating: question.rating,
      isCorrect: !!question.correct
    }))
  }
}

function normalizeSession(src) {
  const source = src && typeof src === 'object' ? src : {}
  const rawAyahs =
    (Array.isArray(source.ayahsPracticed) && source.ayahsPracticed) ||
    (Array.isArray(source.practicedAyahs) && source.practicedAyahs) ||
    (Array.isArray(source.ayahs) && source.ayahs) ||
    []

  const ayahs = rawAyahs.map(item => normalizeAyah(item, source)).filter(Boolean)
  return {
    sessionId: String(source.id || source.sessionId || source.session_id || id('session')),
    date: source.date || source.endedAt || source.startedAt || Date.now(),
    surahNumber: Number(source.surahNumber || source.surah || source.sessionConfig?.surahNumber || 0) || 0,
    surahName: String(source.surahName || source.surah_name || source.sessionConfig?.surahName || '').trim(),
    rangeStart: Number(source.rangeStart || source.startAyah || source.sessionConfig?.rangeStart || 0) || 0,
    rangeEnd: Number(source.rangeEnd || source.endAyah || source.sessionConfig?.rangeEnd || 0) || 0,
    ayahs
  }
}

function normalizeAyah(item, session) {
  if (!item || typeof item !== 'object') return null
  const ayahNumber = Number(item.ayahNumber || item.ayah || item.verseNumber || item.number || 0) || 0
  if (!ayahNumber) return null
  const arabicText = String(
    item.arabicText ||
    item.arabic ||
    item.text ||
    item.ayahText ||
    item.verseText ||
    session?.ayahTextMap?.[ayahNumber] ||
    ''
  ).trim()
  if (!arabicText) return null
  return {
    ayahNumber,
    arabicText,
    translationText: String(item.translationText || item.translation || item.english || item.textTranslation || '').trim()
  }
}

function persistHistory(result) {
  if (typeof window === 'undefined') return
  try {
    const key = `ic_memo_quiz_history_v3_${scopeId()}`
    const raw = localStorage.getItem(key)
    const parsed = raw ? safeParse(raw) : null
    const entries = Array.isArray(parsed?.entries) ? parsed.entries : []
    const next = [result, ...entries.filter(entry => entry.quizId !== result.quizId)].slice(0, 250)
    localStorage.setItem(key, JSON.stringify({ version: 3, updatedAt: Date.now(), entries: next }))
    patchSessionHistory(result)
  } catch (_) {}
}

function patchSessionHistory(result) {
  if (typeof window === 'undefined') return
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index)
      if (!key || !key.startsWith('ic_memorisation_session_history_v1')) continue
      const raw = localStorage.getItem(key)
      if (!raw) continue
      const parsed = safeParse(raw)
      const entries = Array.isArray(parsed?.entries) ? parsed.entries : Array.isArray(parsed) ? parsed : []
      const nextEntries = entries.map(entry => String(entry?.id || '') === String(result.sessionId || '')
        ? { ...entry, quizResult: result }
        : entry
      )
      localStorage.setItem(key, JSON.stringify({ ...(parsed || {}), entries: nextEntries, updatedAt: Date.now() }))
    }
  } catch (_) {}
}

function draftKey() {
  const session = sessionInfo.value
  return `ic_memo_quiz_draft_v3_${scopeId()}_${String(session.sessionId || 'session').replace(/[^a-zA-Z0-9_-]/g, '')}`
}

function persistDraft() {
  if (typeof window === 'undefined' || !questions.value.length) return
  try {
    localStorage.setItem(draftKey(), JSON.stringify({
      version: 3,
      quizId: quizId.value,
      questionIndex: questionIndex.value,
      questions: questions.value,
      state: state.value,
      updatedAt: Date.now()
    }))
  } catch (_) {}
}

function clearDraft() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(draftKey())
  } catch (_) {}
}

function typeLabel(type) {
  if (type === 'fill') return 'Fill in the blank'
  if (type === 'multiple') return 'Multiple choice'
  return 'Flashcard'
}

function tokenizeArabic(text) {
  return String(text || '')
    .replace(/[۞۩.,;:!?()[\]{}"“”]/g, ' ')
    .split(/\s+/)
    .map(word => word.trim())
    .filter(Boolean)
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)))
}

function shuffle(values) {
  const copy = Array.isArray(values) ? values.slice() : []
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = copy[index]
    copy[index] = copy[swapIndex]
    copy[swapIndex] = current
  }
  return copy
}

function clamp(value, min, max) {
  const number = Number(value)
  if (!Number.isFinite(number)) return min
  return Math.max(min, Math.min(max, Math.round(number)))
}

function safeParse(value) {
  try {
    return JSON.parse(value)
  } catch (_) {
    return null
  }
}

function scopeId() {
  if (typeof window === 'undefined') return 'local'
  try {
    return String(window?.Laravel?.userId || localStorage.getItem('ic_memo_quiz_scope_v1') || 'local')
  } catch (_) {
    return 'local'
  }
}

function id(prefix) {
  const safePrefix = String(prefix || 'id').replace(/[^a-zA-Z0-9_-]/g, '')
  try {
    if (window?.crypto?.randomUUID) return `${safePrefix}-${window.crypto.randomUUID()}`
  } catch (_) {}
  return `${safePrefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function lockPage(locked) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('sqLock', !!locked)
}
</script>

<style scoped>
:global(.sqLock) {
  overflow: hidden !important;
}

.sq {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(7, 18, 17, 0.56);
  backdrop-filter: blur(8px);
}

.sq__card {
  width: min(720px, 100%);
  max-height: min(92vh, 860px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #12231f;
  border: 1px solid rgba(15, 118, 110, 0.18);
  border-radius: 12px;
  box-shadow: 0 28px 90px rgba(6, 24, 22, 0.28);
  outline: none;
}

.sq__header,
.sq__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.72rem;
  padding: 0.88rem 0.95rem;
  background: #f7fbf9;
}

.sq__header {
  border-bottom: 1px solid rgba(15, 118, 110, 0.12);
}

.sq__footer {
  border-top: 1px solid rgba(15, 118, 110, 0.12);
  flex-wrap: wrap;
}

.sq__kicker {
  margin: 0 0 0.2rem;
  color: #0f766e;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sq__title {
  margin: 0;
  font-size: 1.18rem;
  line-height: 1.2;
  font-weight: 850;
  overflow-wrap: anywhere;
}

.sq__close {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(15, 118, 110, 0.18);
  border-radius: 8px;
  background: #ffffff;
  color: #12231f;
}

.sq__progress {
  padding: 0.72rem 0.95rem 0;
}

.sq__progressText {
  display: block;
  margin-bottom: 0.45rem;
  color: #536862;
  font-size: 0.86rem;
  font-weight: 750;
}

.sq__bar {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.1);
}

.sq__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0f766e, #d6aa56);
  transition: width 0.2s ease;
}

.sq__body {
  flex: 1;
  overflow: auto;
  padding: 0.9rem 0.95rem;
}

.sq__notice,
.sq__question,
.sq__complete {
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: 10px;
  background: #ffffff;
  padding: 1rem;
}

.sq__notice.is-error {
  border-color: rgba(185, 28, 28, 0.22);
  background: #fff6f6;
  color: #991b1b;
}

.sq__questionHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  margin-bottom: 1rem;
  color: #536862;
  font-size: 0.9rem;
  font-weight: 750;
}

.sq__type {
  color: #0f766e;
}

.sq__arabic {
  font-family: 'Uthmanic Hafs', 'Amiri Quran', 'Traditional Arabic', 'Noto Naskh Arabic', serif;
  font-size: clamp(1.55rem, 3vw, 2.25rem);
  line-height: 2.25;
  font-weight: 400;
  letter-spacing: 0;
  text-align: right;
}

.sq__flashcard {
  width: 100%;
  min-height: 240px;
  border: 1px solid rgba(15, 118, 110, 0.16);
  border-radius: 10px;
  background: #f8fcfa;
  color: inherit;
  padding: 1.1rem;
  transition: transform 0.18s ease, border-color 0.18s ease;
}

.sq__flashcard:hover {
  border-color: rgba(15, 118, 110, 0.36);
  transform: translateY(-1px);
}

.sq__translation {
  display: block;
  color: #263c36;
  font-size: 1.02rem;
  line-height: 1.65;
  text-align: left;
}

.sq__prompt {
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  background: #f8fcfa;
}

.sq__hint {
  margin: 0;
  color: #536862;
  font-size: 0.92rem;
}

.sq__choices {
  display: grid;
  gap: 0.55rem;
}

.sq__choice {
  min-height: 46px;
  border: 1px solid rgba(15, 118, 110, 0.16);
  border-radius: 8px;
  background: #ffffff;
  color: #12231f;
  padding: 0.65rem 0.75rem;
  text-align: left;
  font-weight: 700;
  transition: border-color 0.14s ease, background-color 0.14s ease, transform 0.14s ease;
}

.sq__choice:hover:not(:disabled),
.sq__choice:focus-visible,
.sq__close:focus-visible,
.sqBtn:focus-visible {
  outline: 3px solid rgba(15, 118, 110, 0.22);
  outline-offset: 2px;
}

.sq__choice:hover:not(:disabled) {
  transform: translateY(-1px);
}

.sq__choice.is-correct {
  border-color: rgba(22, 163, 74, 0.5);
  background: #ecfdf3;
}

.sq__choice.is-wrong {
  border-color: rgba(220, 38, 38, 0.44);
  background: #fff1f1;
}

.sq__feedback {
  margin-top: 0.85rem;
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  font-weight: 800;
}

.sq__feedback.is-good {
  color: #166534;
  background: #ecfdf3;
}

.sq__feedback.is-bad {
  color: #991b1b;
  background: #fff1f1;
}

.sq__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.55rem;
  margin-top: 0.85rem;
  flex-wrap: wrap;
}

.sq__actions--center {
  justify-content: center;
}

.sqBtn {
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid rgba(15, 118, 110, 0.16);
  padding: 0.55rem 0.85rem;
  font-weight: 800;
  max-width: 100%;
}

.sqBtn:disabled,
.sq__choice:disabled {
  opacity: 0.62;
  cursor: not-allowed;
}

.sqBtn--primary {
  background: #0f766e;
  border-color: #0f766e;
  color: #ffffff;
  box-shadow: 0 8px 16px rgba(15, 118, 110, 0.2);
}

.sqBtn--soft,
.sqBtn--ghost {
  background: #ffffff;
  color: #0f766e;
}

.sq__dots {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  flex: 1 1 160px;
  flex-wrap: wrap;
  min-width: 0;
}

.sq__dot {
  width: 10px;
  height: 10px;
  border: 2px solid transparent;
  border-radius: 999px;
  background: #cbd5d0;
}

.sq__dot.is-active {
  background: #0f766e;
  transform: scale(1.15);
}

.sq__dot.is-done {
  background: #16a34a;
  border-color: #14532d;
}

.sq__dot.is-wrong {
  background: #dc2626;
  border-color: #7f1d1d;
}

.sq__dot:focus-visible {
  outline: 2px solid rgba(15, 118, 110, 0.4);
  outline-offset: 2px;
}

.sq__score {
  display: grid;
  gap: 0.25rem;
  justify-items: center;
  padding: 1.2rem;
  border-radius: 10px;
  background: #f8fcfa;
}

.sq__score strong {
  font-size: 2rem;
  color: #0f766e;
}

.sq__weak {
  display: flex;
  gap: 0.45rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.9rem;
}

.sq__weak span {
  border-radius: 999px;
  background: #fff1f1;
  color: #991b1b;
  padding: 0.25rem 0.55rem;
  font-size: 0.84rem;
  font-weight: 800;
}

.sq__completeNote {
  margin: 0.9rem 0 0;
  color: #536862;
  text-align: center;
}

.sq__completeNext {
  margin-top: 0.55rem;
  color: #0f4f47;
  text-align: center;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.45;
}

.sq-fade-enter-active,
.sq-fade-leave-active {
  transition: opacity 0.16s ease;
}

.sq-fade-enter-from,
.sq-fade-leave-to {
  opacity: 0;
}

@media (max-width: 560px) {
  .sq {
    padding: 0.55rem;
  }

  .sq__card {
    max-height: min(94vh, 100%);
  }

  .sq__header,
  .sq__footer {
    padding: 0.8rem;
  }

  .sq__footer {
    flex-wrap: wrap;
  }

  .sq__dots {
    order: -1;
    width: 100%;
  }

  .sq__footer > .sqBtn {
    flex: 1 1 calc(50% - 0.36rem);
  }

  .sq__questionHead {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
