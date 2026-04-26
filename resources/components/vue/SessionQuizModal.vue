<template>
  <Teleport to="body">
    <Transition name="sq-fade">
      <div v-if="isOpen" class="sq" role="dialog" aria-modal="true" :aria-label="title" @click.self.prevent>
        <div ref="card" class="sq__card" tabindex="-1">
          <header class="sq__hd">
            <div class="sq__hdRow">
              <div class="sq__hdCopy">
                <div class="sq__kicker">Session quiz</div>
                <h2 class="sq__title">{{ title }}</h2>
              </div>

              <button type="button" class="sq__close" aria-label="Close quiz" @click="close">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
                </svg>
              </button>
            </div>

            <div class="sq__meta">
              <div class="sq__bar" aria-hidden="true"><div class="sq__barFill" :style="{ width: progress + '%' }"></div></div>
              <div class="sq__metaRow">
                <div class="sq__count">
                  <span class="sq__countStrong">Card {{ qNumber }}</span>
                  <span class="sq__countMuted">of {{ total }}</span>
                </div>
                <button
                  type="button"
                  class="sq__timer"
                  :class="{ 'is-on': timerOn }"
                  :aria-pressed="timerOn ? 'true' : 'false'"
                  @click="toggleTimer"
                  title="Toggle timer"
                >
                  <span class="sq__timerLabel">Timer</span>
                  <span class="sq__timerValue">{{ timerOn ? timeLeftFmt : 'Off' }}</span>
                </button>
              </div>
            </div>
          </header>

          <main class="sq__bd">
            <Transition :name="slideName">
              <section :key="viewKey" class="sq__panel">
                <div v-if="state === 'loading'" class="sq__loading" role="status" aria-live="polite">
                  <span class="sq__spinner" aria-hidden="true"></span>
                  <div>
                    <div class="sq__loadingTitle">Preparing your quiz...</div>
                    <div class="sq__loadingSub">Flashcards are generated from the ayahs you just practiced.</div>
                  </div>
                </div>

                <div v-else-if="state === 'error'" class="sq__error" role="alert">
                  <div class="sq__errorTitle">Quiz could not be generated.</div>
                  <div class="sq__errorSub">{{ error }}</div>
                </div>

                <div v-else-if="state === 'complete'" class="sq__complete">
                  <div class="sq__score">
                    <div class="sq__scoreLabel">Your score</div>
                    <div class="sq__scoreValue">
                      <span class="sq__scoreStrong">{{ correct }}</span><span class="sq__scoreMuted">/ {{ total }}</span>
                      <span class="sq__scorePct">({{ scorePct }}%)</span>
                    </div>
                    <div class="sq__scoreNote">
                      <span v-if="scorePct === 100" class="sq__perfect">Perfect memorisation.</span>
                      <span v-else-if="scorePct >= 80">Strong retention.</span>
                      <span v-else>Keep reviewing. Consistency wins.</span>
                    </div>
                  </div>

                  <div class="sq__break">
                    <div class="sq__breakTitle">By ayah</div>
                    <div class="sq__breakGrid">
                      <div v-for="row in breakdown" :key="row.ayah" class="sq__breakRow" :class="{ 'is-weak': row.wrong > 0 }">
                        <div class="sq__breakAyah">Ayah {{ row.ayah }}</div>
                        <div class="sq__breakPills">
                          <span class="sq__pill is-good">{{ row.correct }} correct</span>
                          <span class="sq__pill is-bad">{{ row.wrong }} needs review</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="scorePct < 70 && weakAyahs.length" class="sq__recommend">
                    <div class="sq__recommendTitle">Recommended</div>
                    <div class="sq__recommendSub">Review these ayahs again:</div>
                    <div class="sq__chips">
                      <span v-for="n in weakAyahs" :key="`weak-${n}`" class="sq__chip">Ayah {{ n }}</span>
                    </div>
                  </div>

                  <div class="sq__actions">
                    <button type="button" class="sqBtn sqBtn--primary" :disabled="saving" @click="save">
                      <span v-if="saving">Saving...</span><span v-else>Save quiz results</span>
                    </button>
                    <button type="button" class="sqBtn sqBtn--ghost" :disabled="wrong === 0" @click="retakeWrong">Review mistakes</button>
                  </div>
                </div>

                <!-- FLASHCARD MODE -->
                <div v-else-if="currentCard" class="sq__flashcard">
                  <div class="sq__qHead">
                    <div class="sq__type">
                      <span class="sq__typePill">Flashcard</span>
                      <span class="sq__typeMeta">Ayah {{ currentCard.ayahNumber }}</span>
                    </div>
                    <div class="sq__diff" v-if="currentCard.diff">{{ currentCard.diff }}</div>
                  </div>

                  <div class="sq__flipContainer">
                    <div class="sq__flipCard" :class="{ 'is-flipped': isFlipped }" @click="flipCard">
                      <div class="sq__flipFront">
                        <p class="sq__arabicLarge" dir="rtl" lang="ar">{{ currentCard.arabicText }}</p>
                        <div class="sq__flipHint">Tap to reveal translation</div>
                      </div>
                      <div class="sq__flipBack">
                        <div class="sq__translation">
                          <div class="sq__transLabel">Translation</div>
                          <p class="sq__transText">{{ currentCard.translation }}</p>
                        </div>
                        <div v-if="currentCard.wordMeanings" class="sq__wordMeanings">
                          <div class="sq__transLabel">Word meanings</div>
                          <p class="sq__transText">{{ currentCard.wordMeanings }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="isFlipped && !currentCard.answered" class="sq__selfMark">
                    <div class="sq__selfMarkLabel">How well did you know this ayah?</div>
                    <div class="sq__selfMarkBtns">
                      <button type="button" class="sqBtn sqBtn--mark is-hard" @click="markCard('hard')">
                        <span>🔄 Need Review</span>
                      </button>
                      <button type="button" class="sqBtn sqBtn--mark is-good" @click="markCard('good')">
                        <span>✅ Knew It</span>
                      </button>
                    </div>
                  </div>

                  <div v-if="currentCard.answered" class="sq__feedback" :class="{ 'is-ok': currentCard.correct, 'is-bad': !currentCard.correct }">
                    <div class="sq__fbTitle">{{ currentCard.correct ? 'Memorised!' : 'Need more practice.' }}</div>
                  </div>
                </div>
              </section>
            </Transition>
          </main>

          <footer v-if="state === 'quiz'" class="sq__ft">
            <button type="button" class="sqBtn sqBtn--ghost" :disabled="cardIdx <= 0" @click="prevCard">Previous</button>
            <div class="sq__dots" aria-label="Card navigation">
              <button
                v-for="(c, i) in cards"
                :key="`d-${c.id}`"
                type="button"
                class="sq__dot"
                :class="dotClass(c, i)"
                :aria-current="i === cardIdx ? 'true' : 'false'"
                :aria-label="`Go to card ${i + 1}`"
                @click="jumpToCard(i)"
              ></button>
            </div>
            <button type="button" class="sqBtn sqBtn--primary" :disabled="!currentCard?.answered" @click="nextCard">
              {{ cardIdx + 1 >= cards.length ? 'Finish' : 'Next' }}
            </button>
          </footer>
        </div>
      </div>
    </Transition>

    <Transition name="sq-toast">
      <div v-if="toast.on" class="sqToast" role="status" aria-live="polite" aria-atomic="true">
        <div class="sqToast__card">
          <span class="sqToast__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span class="sqToast__text">{{ toast.text }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  session: { type: Object, required: true },
  isOpen: { type: Boolean, required: true }
})
const emit = defineEmits(['close', 'save', 'retake'])

const state = ref('loading')
const error = ref('')
const cards = ref([])
const cardIdx = ref(0)
const dir = ref('next')
const quizId = ref('')
const startedAt = ref(0)
const savedAt = ref(0)
const saving = ref(false)
const isFlipped = ref(false)

const timerOn = ref(true)
const timeLeft = ref(0)
let tHandle = null

const toast = ref({ on: false, text: 'Quiz saved.' })
let toastHandle = null

const cardEl = ref(null)

const sessionInfo = computed(() => normalizeSession(props.session))
const total = computed(() => cards.value.length || 0)
const currentCard = computed(() => cards.value[cardIdx.value] || null)
const canClose = computed(() => true)

const title = computed(() => {
  const s = sessionInfo.value
  const surah = s.surahName ? s.surahName : (s.surahNumber ? `Surah ${s.surahNumber}` : 'Session')
  const range = s.rangeStart && s.rangeEnd ? `${s.rangeStart}-${s.rangeEnd}` : ''
  return range ? `${surah} · ${range}` : surah
})

const qNumber = computed(() => state.value === 'quiz' ? clamp(cardIdx.value + 1, 1, Math.max(1, total.value)) : total.value)
const progress = computed(() => {
  if (state.value === 'complete') return 100
  const t = total.value
  if (!t) return 0
  const answered = cards.value.filter(c => c && c.answered).length
  return clamp(Math.round((answered / t) * 100), 0, 100)
})

const timeLeftFmt = computed(() => {
  const s = Math.max(0, Number(timeLeft.value || 0))
  const mm = Math.floor(s / 60)
  const ss = s % 60
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
})

const slideName = computed(() => dir.value === 'prev' ? 'sq-slide-prev' : 'sq-slide-next')
const viewKey = computed(() => {
  if (state.value !== 'quiz') return `${state.value}-${quizId.value || 'q'}`
  return currentCard.value?.id || `c-${cardIdx.value}`
})

const correct = computed(() => cards.value.filter(c => c && c.answered && c.correct).length)
const wrong = computed(() => cards.value.filter(c => c && c.answered && !c.correct).length)
const scorePct = computed(() => total.value ? Math.round((correct.value / total.value) * 100) : 0)

const breakdown = computed(() => {
  const map = new Map()
  for (const c of cards.value) {
    if (!c || !c.answered) continue
    const n = Number(c.ayahNumber || 0)
    if (!n) continue
    if (!map.has(n)) map.set(n, { ayah: n, correct: 0, wrong: 0 })
    const row = map.get(n)
    if (c.correct) row.correct += 1
    else row.wrong += 1
  }
  return [...map.values()].sort((a, b) => a.ayah - b.ayah)
})

const weakAyahs = computed(() =>
  breakdown.value
    .filter(r => r.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong || a.ayah - b.ayah)
    .map(r => r.ayah)
)

watch(() => props.isOpen, open => (open ? openQuiz() : cleanup(false)), { immediate: true })
watch(() => props.session, () => { if (props.isOpen) openQuiz() })
onBeforeUnmount(() => cleanup(true))

function openQuiz() {
  const s = sessionInfo.value
  if (!s?.ayahs?.length) {
    state.value = 'error'
    error.value = 'Missing ayah data for this session. Pass `session.ayahsPracticed` with Arabic text to generate the quiz.'
    return
  }

  state.value = 'loading'
  error.value = ''
  savedAt.value = 0
  isFlipped.value = false

  const d = loadDraft(s)
  if (d?.cards?.length) {
    quizId.value = d.quizId || id('quiz')
    startedAt.value = Number(d.startedAt || Date.now()) || Date.now()
    timerOn.value = d.timerOn !== false
    cards.value = d.cards
    cardIdx.value = clampIndex(Number(d.cardIdx || 0), cards.value.length)
    timeLeft.value = Number(d.timeLeft || 0) || timerSeconds(cards.value.length)
    state.value = d.state === 'complete' ? 'complete' : 'quiz'
  } else {
    quizId.value = id('quiz')
    startedAt.value = Date.now()
    timerOn.value = timerPref()
    cards.value = buildFlashcards(s)
    cardIdx.value = 0
    timeLeft.value = timerSeconds(cards.value.length)
    state.value = 'quiz'
    persistDraft()
  }

  if (state.value === 'quiz' && allAnswered()) {
    state.value = 'complete'
    stopTimer()
    persistDraft()
    celebrateComplete()
  }

  if (props.isOpen) {
    lock(true)
    keys(true)
    startTimer()
    nextTick(() => { try { cardEl.value?.focus?.() } catch (_) {} })
    if (state.value === 'complete') celebrateComplete()
  }
}

function cleanup(unmount) {
  keys(false)
  stopTimer()
  lock(false)
  if (autoNextHandle) {
    clearTimeout(autoNextHandle)
    autoNextHandle = null
  }
  toast.value.on = false
  if (toastHandle) {
    clearTimeout(toastHandle)
    toastHandle = null
  }
  if (unmount) cards.value = []
}

function close() {
  cleanup(false)
  emit('close')
}

let autoNextHandle = null
function scheduleAutoNext() {
  if (autoNextHandle) clearTimeout(autoNextHandle)
  autoNextHandle = setTimeout(() => {
    autoNextHandle = null
    if (state.value !== 'quiz') return
    if (!currentCard.value?.answered) return
    nextCard()
  }, 800)
}

function lock(on) {
  if (typeof document === 'undefined') return
  try { document.documentElement.classList.toggle('sqLock', !!on) } catch (_) {}
}

function keys(on) {
  if (typeof window === 'undefined') return
  const opt = { capture: true }
  if (on) window.addEventListener('keydown', onKey, opt)
  else window.removeEventListener('keydown', onKey, opt)
}

function onKey(e) {
  if (!props.isOpen) return
  if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    e.stopPropagation()
    if (state.value === 'complete') {
      if (!saving.value) save()
      return
    }
    if (state.value === 'quiz' && currentCard.value && !currentCard.value.answered && !isFlipped.value) {
      flipCard()
    }
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    if (state.value === 'quiz' && cardIdx.value > 0) prevCard()
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault()
    if (state.value === 'quiz' && currentCard.value?.answered && cardIdx.value + 1 < cards.value.length) nextCard()
    else if (state.value === 'quiz' && currentCard.value?.answered && cardIdx.value + 1 >= cards.value.length) nextCard()
  }
}

function flipCard() {
  if (!currentCard.value || currentCard.value.answered) return
  isFlipped.value = !isFlipped.value
}

function markCard(rating) {
  const card = currentCard.value
  if (!card || card.answered) return
  card.answered = true
  card.correct = rating === 'good'
  card.rating = rating
  isFlipped.value = false
  persistDraft()

  if (card.correct) {
    playDing()
    confettiMicro()
  }

  if (allAnswered()) {
    state.value = 'complete'
    stopTimer()
    persistDraft()
    celebrateComplete()
    return
  }
  scheduleAutoNext()
}

function playDing() {
  try {
    const audio = new Audio('data:audio/wav;base64,U3RlYWx0aCBzb3VuZCBub3QgYXZhaWxhYmxl')
    audio.volume = 0.2
    audio.play().catch(() => {})
  } catch (_) {}
}

function toggleTimer() {
  timerOn.value = !timerOn.value
  try { localStorage.setItem('ic_memo_quiz_timer_v1', timerOn.value ? '1' : '0') } catch (_) {}
  if (timerOn.value) {
    if (!timeLeft.value) timeLeft.value = timerSeconds(total.value)
    startTimer()
  } else {
    stopTimer()
  }
  persistDraft()
}

function timerPref() {
  if (typeof window === 'undefined') return true
  try {
    const v = localStorage.getItem('ic_memo_quiz_timer_v1')
    return v == null ? true : v !== '0'
  } catch (_) {
    return true
  }
}

function startTimer() {
  stopTimer()
  if (!timerOn.value || state.value !== 'quiz' || timeLeft.value <= 0) return
  tHandle = setInterval(() => {
    if (!props.isOpen || state.value !== 'quiz' || !timerOn.value) return
    timeLeft.value = Math.max(0, Number(timeLeft.value || 0) - 1)
    if (timeLeft.value % 10 === 0) persistDraft()
    if (timeLeft.value <= 0) stopTimer()
  }, 1000)
}

function stopTimer() {
  if (tHandle) {
    clearInterval(tHandle)
    tHandle = null
  }
}

function timerSeconds(qCount) {
  return clamp(Math.round(clamp(qCount * 45, 180, 900)), 60, 3600)
}

function prevCard() {
  if (state.value !== 'quiz') return
  isFlipped.value = false
  dir.value = 'prev'
  cardIdx.value = clampIndex(cardIdx.value - 1, total.value)
  persistDraft()
}

function nextCard() {
  if (state.value !== 'quiz') return
  isFlipped.value = false
  dir.value = 'next'
  if (cardIdx.value + 1 >= total.value) {
    state.value = 'complete'
    stopTimer()
    persistDraft()
    celebrateComplete()
    return
  }
  cardIdx.value = clampIndex(cardIdx.value + 1, total.value)
  persistDraft()
}

function jumpToCard(i) {
  if (state.value !== 'quiz') return
  isFlipped.value = false
  const n = clampIndex(i, total.value)
  if (n === cardIdx.value) return
  dir.value = n < cardIdx.value ? 'prev' : 'next'
  cardIdx.value = n
  persistDraft()
}

function dotClass(card, i) {
  return {
    'is-a': i === cardIdx.value,
    'is-ans': card.answered,
    'is-ok': card.answered && card.correct,
    'is-bad': card.answered && !card.correct
  }
}

function allAnswered() {
  return cards.value.length > 0 && cards.value.every(c => c && c.answered)
}

function save() {
  const s = sessionInfo.value
  if (!s || saving.value || !allAnswered()) return
  saving.value = true

  const res = buildResult({
    quizId: quizId.value || id('quiz'),
    session: s,
    cards: cards.value,
    startedAt: startedAt.value || Date.now(),
    endedAt: Date.now()
  })

  try {
    persistHistory(res)
    patchSessionHistory(res)
    clearDraft(s)
  } catch (_) {}

  savedAt.value = Date.now()
  toast.value = { on: true, text: 'Quiz saved.' }
  if (toastHandle) clearTimeout(toastHandle)
  toastHandle = setTimeout(() => { toast.value.on = false }, 2200)

  emit('save', res)
  setTimeout(() => {
    saving.value = false
    emit('close')
  }, 650)
}

function retakeWrong() {
  if (!wrong.value) return
  const s = sessionInfo.value
  if (!s) return

  const wrongAyahs = new Set(
    cards.value
      .filter(c => c?.answered && !c.correct)
      .map(c => Number(c.ayahNumber || 0))
      .filter(n => n > 0)
  )
  const focus = { ...s, ayahs: s.ayahs.filter(a => wrongAyahs.has(Number(a.ayahNumber || 0))) }

  quizId.value = id('quiz')
  startedAt.value = Date.now()
  savedAt.value = 0
  state.value = 'quiz'
  cards.value = buildFlashcards(focus)
  cardIdx.value = 0
  timeLeft.value = timerSeconds(cards.value.length)
  persistDraft()
  startTimer()

  emit('retake', { sessionId: s.sessionId, quizId: quizId.value, ayahNumbers: [...wrongAyahs] })
}

function buildFlashcards(s) {
  const ayahs = (s.ayahs || []).filter(a => a?.ayahNumber && a?.arabicText)
  const shuffled = shuffle([...ayahs])
  return shuffled.map((a, i) => ({
    id: id('card'),
    ayahNumber: Number(a.ayahNumber),
    arabicText: String(a.arabicText || '').trim(),
    translation: String(a.translationText || '').trim(),
    wordMeanings: a.wordMeanings || '',
    diff: a.mastery >= 0.8 ? 'Mastered' : (a.mastery < 0.5 ? 'Learning' : 'Reviewing'),
    answered: false,
    correct: null,
    rating: null
  }))
}

function buildResult({ quizId: quizIdValue, session, cards: cardList, startedAt: startedAtValue, endedAt }) {
  const cs = Array.isArray(cardList) ? cardList : []
  const totalQuestions = cs.length
  const correctAnswers = cs.filter(c => c?.answered && c.correct).length
  const scorePercent = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0
  const timeSpentSeconds = Math.max(0, Math.round((Number(endedAt || 0) - Number(startedAtValue || 0)) / 1000))
  const mistakesByAyah = {}
  for (const c of cs) {
    const n = Number(c?.ayahNumber || 0)
    if (!n) continue
    if (!mistakesByAyah[n]) mistakesByAyah[n] = 0
    if (c.answered && !c.correct) mistakesByAyah[n] += 1
  }
  return {
    version: 2,
    quizId: String(quizIdValue || id('quiz')),
    sessionId: String(session?.sessionId || ''),
    savedAt: Date.now(),
    date: session?.date || Date.now(),
    surahNumber: Number(session?.surahNumber || 0) || 0,
    surahName: session?.surahName || '',
    rangeStart: Number(session?.rangeStart || 0) || 0,
    rangeEnd: Number(session?.rangeEnd || 0) || 0,
    totalQuestions,
    correctAnswers,
    scorePercent,
    timeSpentSeconds,
    mistakesByAyah,
    cards: cs.map(c => ({
      id: c.id,
      ayahNumber: c.ayahNumber,
      arabicText: c.arabicText,
      translation: c.translation,
      userRating: c.rating,
      isCorrect: c.correct
    }))
  }
}

function normalizeSession(src) {
  const s = (src && typeof src === 'object') ? src : {}
  const sessionId = String(s.id || s.sessionId || s.session_id || '').trim() || id('session')
  const surahNumber = Number(s.surahNumber || s.surah || s.sessionConfig?.surahNumber || 0) || 0
  const surahName = String(s.surahName || s.surah_name || s.sessionConfig?.surahName || '').trim()
  const rangeStart = Number(s.rangeStart || s.startAyah || s.sessionConfig?.rangeStart || s.ayahRange?.start || 0) || 0
  const rangeEnd = Number(s.rangeEnd || s.endAyah || s.sessionConfig?.rangeEnd || s.ayahRange?.end || 0) || 0
  const date = s.date || s.endedAt || s.startedAt || Date.now()

  const raw =
    (Array.isArray(s.ayahsPracticed) && s.ayahsPracticed) ||
    (Array.isArray(s.practicedAyahs) && s.practicedAyahs) ||
    (Array.isArray(s.ayahs) && s.ayahs) ||
    []
  const ayahs = raw.map(it => normPractice(it, s)).filter(Boolean).sort((a, b) => a.ayahNumber - b.ayahNumber)

  return { sessionId, date, surahNumber, surahName, rangeStart, rangeEnd, ayahs }
}

function normPractice(it, session) {
  if (!it || typeof it !== 'object') return null
  const ayahNumber = Number(it.ayahNumber || it.ayah || it.verseNumber || it.number || 0) || 0
  if (!ayahNumber) return null
  const arabicText =
    String(it.arabicText || it.arabic || it.text || it.ayahText || it.verseText || it.textArabic || '').trim() ||
    String(session?.ayahTextMap?.[ayahNumber] || '').trim()
  if (!arabicText) return null
  const translationText = String(it.translation || it.translationText || it.english || it.textTranslation || '').trim()
  const wordMeanings = it.wordMeanings || it.word_meanings || ''
  const attempts = clamp(Number(it.attempts || it.attemptCount || it.tries || it.totalAttempts || 0) || 0, 0, 999)
  const correctValue = resolveCorrect(it, attempts)
  const safeAttempts = Math.max(1, attempts || (typeof it.isCorrect === 'boolean' ? 1 : 1))
  const mastery = clamp(correctValue / safeAttempts, 0, 1)
  return { ayahNumber, arabicText, translationText, wordMeanings, mastery }
}

function resolveCorrect(it, attempts) {
  const v = it.correctCount ?? it.correctAttempts ?? it.correct
  if (typeof v === 'number') return clamp(v, 0, Math.max(1, attempts || 1))
  if (typeof v === 'boolean') return v ? Math.max(1, attempts || 1) : 0
  if (typeof it.isCorrect === 'boolean') return it.isCorrect ? Math.max(1, attempts || 1) : 0
  return 0
}

function scopeId() {
  if (typeof window === 'undefined') return 'local'
  const k = 'ic_memo_quiz_scope_v1'
  try {
    const ex = localStorage.getItem(k)
    if (ex) return ex
    const created = id('scope').replace(/[^a-zA-Z0-9_-]/g, '')
    localStorage.setItem(k, created)
    return created
  } catch (_) {
    return 'local'
  }
}

function dKey(s) {
  return `ic_memo_quiz_draft_v2_${scopeId()}_${String(s.sessionId || 'session').replace(/[^a-zA-Z0-9_-]/g, '')}`
}

function loadDraft(s) {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(dKey(s))
    if (!raw) return null
    const d = JSON.parse(raw)
    if (!d || d.v !== 2 || String(d.sessionId || '') !== String(s.sessionId || '')) return null
    return d
  } catch (_) {
    return null
  }
}

function persistDraft() {
  const s = sessionInfo.value
  if (!s || typeof window === 'undefined') return
  const payload = {
    v: 2,
    sessionId: s.sessionId,
    quizId: quizId.value,
    state: state.value,
    startedAt: startedAt.value,
    cardIdx: cardIdx.value,
    timerOn: timerOn.value,
    timeLeft: timeLeft.value,
    cards: cards.value,
    updatedAt: Date.now()
  }
  try { localStorage.setItem(dKey(s), JSON.stringify(payload)) } catch (_) {}
}

function clearDraft(s) {
  if (typeof window !== 'undefined') {
    try { localStorage.removeItem(dKey(s)) } catch (_) {}
  }
}

function persistHistory(res) {
  if (typeof window === 'undefined') return
  const key = `ic_memo_quiz_history_v2_${scopeId()}`
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : null
    const entries = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.entries) ? parsed.entries : [])
    const next = [res, ...entries.filter(e => String(e?.quizId || '') !== String(res.quizId || ''))].slice(0, 250)
    localStorage.setItem(key, JSON.stringify({ version: 2, updatedAt: Date.now(), entries: next }))
  } catch (_) {}
}

function patchSessionHistory(res) {
  if (typeof window === 'undefined') return
  const sid = String(res?.sessionId || '')
  if (!sid) return
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i)
      if (!k || !k.startsWith('ic_memorisation_session_history_v1')) continue
      const raw = localStorage.getItem(k)
      if (!raw) continue
      let parsed = null
      try { parsed = JSON.parse(raw) } catch (_) {}
      const entries = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.entries) ? parsed.entries : null)
      if (!entries) continue
      const updated = entries.map(e => (
        String(e?.id || '') === sid
          ? {
              ...e,
              quizResult: {
                quizId: res.quizId,
                scorePercent: res.scorePercent,
                correctAnswers: res.correctAnswers,
                totalQuestions: res.totalQuestions,
                savedAt: res.savedAt,
                mistakesByAyah: res.mistakesByAyah
              }
            }
          : e
      ))
      localStorage.setItem(
        k,
        JSON.stringify({
          ...(parsed && typeof parsed === 'object' ? parsed : {}),
          version: parsed?.version || 1,
          updatedAt: Date.now(),
          entries: updated
        })
      )
      return
    }
  } catch (_) {}
}

function prefersReduced() {
  try { return window?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches } catch (_) { return false }
}

function confettiMicro() {
  if (prefersReduced()) return
  try {
    import('https://cdn.jsdelivr.net/npm/canvas-confetti@1/+esm').then(module => {
      const confetti = module.default || module
      confetti({ particleCount: 28, spread: 48, origin: { y: 0.65 }, colors: ['#0f766e', '#d6aa56', '#1b8f7e'], startVelocity: 14, decay: 0.85 })
    })
  } catch (_) {}
}

function celebrateComplete() {
  if (prefersReduced()) return
  if (scorePct.value >= 80) {
    try {
      import('https://cdn.jsdelivr.net/npm/canvas-confetti@1/+esm').then(module => {
        const confetti = module.default || module
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#0f766e', '#d6aa56', '#2d9c84', '#e8c468'], startVelocity: 18, decay: 0.9 })
        setTimeout(() => {
          confetti({ particleCount: 40, spread: 45, origin: { y: 0.5, x: 0.3 }, colors: ['#d6aa56'], startVelocity: 12 })
          confetti({ particleCount: 40, spread: 45, origin: { y: 0.5, x: 0.7 }, colors: ['#0f766e'], startVelocity: 12 })
        }, 160)
      })
    } catch (_) {}
  }
}

function clampIndex(i, len) {
  len = Math.max(0, Number(len || 0))
  if (!len) return 0
  i = Number(i || 0)
  if (!Number.isFinite(i)) return 0
  return Math.max(0, Math.min(len - 1, Math.round(i)))
}

function clamp(v, a, b) {
  v = Number(v)
  if (!Number.isFinite(v)) return a
  return Math.max(a, Math.min(b, v))
}

function shuffle(arr) {
  const a = Array.isArray(arr) ? arr.slice() : []
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }
  return a
}

function id(p) {
  p = String(p || 'id').replace(/[^a-zA-Z0-9_-]/g, '')
  try {
    if (window?.crypto?.randomUUID) return `${p}-${window.crypto.randomUUID()}`
  } catch (_) {}
  return `${p}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
</script>

<style scoped>
:global(.sqLock) { overflow: hidden !important; }

.sq { position: fixed; inset: 0; z-index: 99999; display: grid; place-items: center; padding: 1rem; background: rgba(7, 11, 10, 0.52); backdrop-filter: blur(8px); }
.sq__card { width: min(700px, 100%); max-height: min(92vh, 860px); background: linear-gradient(180deg, #fff 0%, #fffdf8 100%); border-radius: 24px; border: 1px solid rgba(214, 170, 86, 0.22); box-shadow: 0 40px 120px rgba(10, 18, 16, 0.33), 0 12px 32px rgba(10, 18, 16, 0.18); overflow: hidden; outline: none; display: flex; flex-direction: column; }

.sq__hd { padding: 1.1rem 1.1rem 0.95rem; background: radial-gradient(900px 340px at 50% -20%, rgba(15, 118, 110, 0.14), transparent 62%), radial-gradient(720px 260px at 10% 0%, rgba(214, 170, 86, 0.16), transparent 70%), linear-gradient(180deg, #fdfdfb 0%, #f6fbf8 100%); }
.sq__hdRow { display: flex; align-items: flex-start; justify-content: space-between; gap: .8rem; }
.sq__kicker { font-size: .78rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: rgba(15, 118, 110, .86); }
.sq__title { margin: .2rem 0 0; font-size: 1.22rem; line-height: 1.15; font-weight: 900; color: #0b2f2a; }
.sq__close { width: 40px; height: 40px; border-radius: 12px; border: 1px solid rgba(15, 118, 110, .18); background: rgba(255,255,255,.84); color: #111827; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(10,18,16,.12); transition: transform .16s ease, box-shadow .16s ease; }
.sq__close svg { width: 20px; height: 20px; }
.sq__close:hover { transform: translateY(-1px); box-shadow: 0 14px 26px rgba(10,18,16,.16); }
.sq__close:focus-visible { outline: 3px solid rgba(15, 118, 110, .28); outline-offset: 2px; }

.sq__meta { margin-top: .95rem; }
.sq__bar { height: 10px; border-radius: 999px; background: rgba(15,118,110,.12); overflow: hidden; }
.sq__barFill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #0f766e 0%, #1b8f7e 35%, #d6aa56 100%); transition: width .24s ease; }
.sq__metaRow { margin-top: .85rem; display: flex; align-items: center; justify-content: space-between; gap: .8rem; }
.sq__count { font-size: .92rem; color: rgba(11,47,42,.9); }
.sq__countStrong { font-weight: 900; }
.sq__countMuted { margin-left: .35rem; opacity: .8; }
.sq__timer { border: 1px solid rgba(15,118,110,.18); background: rgba(255,255,255,.78); border-radius: 999px; padding: .38rem .62rem .38rem .75rem; display: inline-flex; align-items: center; gap: .55rem; color: rgba(11,47,42,.9); box-shadow: 0 10px 22px rgba(10,18,16,.08); transition: transform .16s ease, box-shadow .16s ease; }
.sq__timer:hover { transform: translateY(-1px); box-shadow: 0 14px 26px rgba(10,18,16,.12); }
.sq__timer:focus-visible { outline: 3px solid rgba(15,118,110,.28); outline-offset: 2px; }
.sq__timerLabel { font-size: .78rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; opacity: .85; }
.sq__timerValue { font-weight: 900; font-variant-numeric: tabular-nums; }

.sq__bd { padding: 1.05rem 1.1rem 1.1rem; background: linear-gradient(180deg, #fff 0%, #fdfdfb 100%); flex: 1 1 auto; overflow: auto; }
.sq__panel { min-height: 460px; }

.sq__loading { display: flex; gap: .9rem; align-items: center; padding: 1.05rem; border-radius: 18px; background: rgba(15,118,110,.06); border: 1px solid rgba(15,118,110,.12); }
.sq__spinner { width: 34px; height: 34px; border-radius: 999px; border: 3px solid rgba(15,118,110,.18); border-top-color: rgba(15,118,110,.78); animation: sqSpin .9s linear infinite; }
@keyframes sqSpin { to { transform: rotate(360deg); } }
.sq__loadingTitle { font-weight: 900; color: rgba(11,47,42,.92); }
.sq__loadingSub { font-size: .9rem; color: rgba(11,47,42,.72); }

.sq__error { padding: 1.1rem; border-radius: 18px; background: rgba(185,28,28,.06); border: 1px solid rgba(185,28,28,.18); color: rgba(127,29,29,.92); }
.sq__errorTitle { font-weight: 900; margin-bottom: .35rem; }
.sq__errorSub { opacity: .88; }

/* FLASHCARD STYLES */
.sq__flashcard { display: flex; flex-direction: column; gap: 1.25rem; }
.sq__qHead { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: .25rem; }
.sq__type { display: flex; align-items: baseline; gap: .65rem; flex-wrap: wrap; }
.sq__typePill { display: inline-flex; padding: .38rem .68rem; border-radius: 999px; font-weight: 900; font-size: .84rem; color: rgba(11,47,42,.9); background: rgba(15,118,110,.1); border: 1px solid rgba(15,118,110,.16); }
.sq__typeMeta { font-size: .92rem; color: rgba(11,47,42,.78); font-weight: 900; }
.sq__diff { font-size: .85rem; color: rgba(11,47,42,.75); text-align: right; }

.sq__flipContainer { perspective: 1400px; margin: 0.5rem 0; }
.sq__flipCard { position: relative; width: 100%; min-height: 320px; cursor: pointer; transition: transform 0.35s cubic-bezier(0.2, 0.85, 0.4, 1); transform-style: preserve-3d; border-radius: 28px; }
.sq__flipCard.is-flipped { transform: rotateY(180deg); }
.sq__flipFront, .sq__flipBack { position: absolute; width: 100%; min-height: 320px; backface-visibility: hidden; border-radius: 28px; padding: 1.8rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box; background: radial-gradient(900px 420px at 50% 30%, rgba(15, 118, 110, 0.08), transparent 78%), linear-gradient(145deg, #fefdf9 0%, #fffdf5 100%); border: 1px solid rgba(214, 170, 86, 0.28); box-shadow: 0 32px 56px rgba(10, 18, 16, 0.14); }
.sq__flipBack { transform: rotateY(180deg); background: radial-gradient(900px 480px at 50% 20%, rgba(214, 170, 86, 0.06), transparent 80%), linear-gradient(145deg, #fffaf0 0%, #fef8ea 100%); }
.sq__arabicLarge { font-size: 2rem; line-height: 3rem; font-weight: 800; text-align: center; margin: 0 0 1.25rem; font-family: "Amiri", "Scheherazade New", "Noto Naskh Arabic", serif; color: rgba(7, 26, 23, 0.96); }
.sq__flipHint { font-size: 0.82rem; color: rgba(15, 118, 110, 0.72); font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; margin-top: 1rem; }
.sq__translation { margin-bottom: 1rem; width: 100%; }
.sq__wordMeanings { width: 100%; margin-top: 0.5rem; padding-top: 0.75rem; border-top: 1px dashed rgba(214, 170, 86, 0.35); }
.sq__transLabel { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(15, 118, 110, 0.7); margin-bottom: 0.5rem; }
.sq__transText { font-size: 1rem; line-height: 1.5; color: rgba(11, 47, 42, 0.88); margin: 0; }

.sq__selfMark { margin-top: 1.2rem; padding: 1rem 1rem 0.2rem; border-radius: 28px; background: rgba(15, 118, 110, 0.05); text-align: center; }
.sq__selfMarkLabel { font-weight: 800; font-size: 0.9rem; color: rgba(11, 47, 42, 0.85); margin-bottom: 0.85rem; }
.sq__selfMarkBtns { display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap; }
.sqBtn--mark { padding: 0.7rem 1.4rem; border-radius: 60px; font-weight: 800; transition: transform 0.12s ease, box-shadow 0.12s ease; }
.sqBtn--mark.is-hard { background: rgba(185, 28, 28, 0.12); border-color: rgba(185, 28, 28, 0.28); color: rgba(127, 29, 29, 0.95); }
.sqBtn--mark.is-good { background: rgba(22, 163, 74, 0.12); border-color: rgba(22, 163, 74, 0.32); color: rgba(21, 84, 58, 0.95); }
.sqBtn--mark:hover { transform: translateY(-2px); }

.sq__feedback { margin-top: 1rem; padding: 0.85rem 0.95rem; border-radius: 24px; border: 1px solid rgba(15, 118, 110, 0.14); background: rgba(15, 118, 110, 0.06); }
.sq__feedback.is-ok { border-color: rgba(22, 163, 74, 0.32); background: rgba(22, 163, 74, 0.08); }
.sq__feedback.is-bad { border-color: rgba(185, 28, 28, 0.22); background: rgba(185, 28, 28, 0.06); }
.sq__fbTitle { font-weight: 900; }

.sq__complete { display: grid; gap: 1rem; }
.sq__score { padding: 1.1rem; border-radius: 22px; border: 1px solid rgba(15,118,110,.12); background: rgba(15,118,110,.06); }
.sq__scoreLabel { font-size: .85rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; color: rgba(15,118,110,.85); }
.sq__scoreValue { margin-top: .5rem; font-size: 1.35rem; font-weight: 900; color: rgba(11,47,42,.95); }
.sq__scoreStrong { font-size: 1.65rem; }
.sq__scoreMuted { opacity: .75; }
.sq__scorePct { margin-left: .45rem; color: rgba(15,118,110,.9); }
.sq__scoreNote { margin-top: .4rem; color: rgba(11,47,42,.75); }
.sq__perfect { font-weight: 900; color: rgba(15,118,110,.95); }

.sq__breakTitle { font-weight: 900; color: rgba(11,47,42,.9); }
.sq__breakGrid { margin-top: .6rem; display: grid; gap: .65rem; }
.sq__breakRow { padding: .85rem; border-radius: 18px; border: 1px solid rgba(15,118,110,.12); background: rgba(255,255,255,.9); display: flex; align-items: center; justify-content: space-between; gap: .75rem; flex-wrap: wrap; }
.sq__breakRow.is-weak { border-color: rgba(185,28,28,.18); background: rgba(185,28,28,.04); }
.sq__breakAyah { font-weight: 900; color: rgba(11,47,42,.92); }
.sq__breakPills { display: inline-flex; gap: .45rem; flex-wrap: wrap; justify-content: flex-end; }
.sq__pill { display: inline-flex; align-items: center; padding: .26rem .55rem; border-radius: 999px; font-weight: 900; font-size: .82rem; border: 1px solid transparent; }
.sq__pill.is-good { background: rgba(22,163,74,.1); border-color: rgba(22,163,74,.2); color: rgba(22,101,52,.92); }
.sq__pill.is-bad { background: rgba(185,28,28,.08); border-color: rgba(185,28,28,.18); color: rgba(127,29,29,.9); }

.sq__recommend { padding: 1rem; border-radius: 22px; border: 1px solid rgba(214,170,86,.22); background: rgba(214,170,86,.08); }
.sq__recommendTitle { font-weight: 900; color: rgba(11,47,42,.9); }
.sq__recommendSub { margin-top: .35rem; color: rgba(11,47,42,.75); }
.sq__chips { margin-top: .6rem; display: flex; flex-wrap: wrap; gap: .45rem; }
.sq__chip { padding: .32rem .55rem; border-radius: 999px; background: rgba(255,255,255,.8); border: 1px solid rgba(214,170,86,.22); font-weight: 900; color: rgba(11,47,42,.88); }

.sq__actions { display: flex; gap: .7rem; flex-wrap: wrap; justify-content: flex-end; }

.sq__ft { padding: .85rem 1.1rem 1.05rem; display: flex; align-items: center; justify-content: space-between; gap: .9rem; background: linear-gradient(180deg, #fdfdfb 0%, #f6fbf8 100%); border-top: 1px solid rgba(15,118,110,.08); flex: 0 0 auto; }
.sq__dots { display: flex; align-items: center; justify-content: center; gap: .45rem; flex-wrap: wrap; min-width: 160px; }
.sq__dot { width: 12px; height: 12px; border-radius: 999px; border: 1px solid rgba(15,118,110,.28); background: rgba(15,118,110,.1); transition: transform .16s ease, background .16s ease, border-color .16s ease; }
.sq__dot:hover { transform: translateY(-1px) scale(1.08); }
.sq__dot.is-a { background: rgba(15,118,110,.58); border-color: rgba(15,118,110,.7); }
.sq__dot.is-ok { background: rgba(22,163,74,.55); border-color: rgba(22,163,74,.75); }
.sq__dot.is-bad { background: rgba(185,28,28,.5); border-color: rgba(185,28,28,.7); }

.sqBtn { border: 1px solid transparent; border-radius: 16px; padding: .75rem .95rem; font-weight: 900; letter-spacing: .01em; transition: transform .16s ease, box-shadow .16s ease, background .16s ease, border-color .16s ease; user-select: none; cursor: pointer; background: rgba(255,255,255,.86); }
.sqBtn:focus-visible { outline: 3px solid rgba(15,118,110,.26); outline-offset: 2px; }
.sqBtn:disabled { opacity: .6; cursor: not-allowed; transform: none !important; }
.sqBtn--primary { color: #fff; background: linear-gradient(180deg, #0f766e 0%, #0b5f58 100%); box-shadow: 0 18px 34px rgba(15,118,110,.22); border: none; }
.sqBtn--primary:hover:enabled { transform: translateY(-1px); box-shadow: 0 22px 40px rgba(15,118,110,.26); }
.sqBtn--ghost { color: rgba(11,47,42,.92); background: rgba(255,255,255,.86); border-color: rgba(15,118,110,.18); box-shadow: 0 14px 26px rgba(10,18,16,.08); }
.sqBtn--ghost:hover:enabled { transform: translateY(-1px); box-shadow: 0 18px 30px rgba(10,18,16,.12); border-color: rgba(15,118,110,.28); }

.sqToast { position: fixed; left: 0; right: 0; bottom: 1.1rem; z-index: 100000; display: flex; justify-content: center; padding: 0 1rem; pointer-events: none; }
.sqToast__card { pointer-events: auto; display: inline-flex; align-items: center; gap: .55rem; padding: .85rem 1rem; border-radius: 18px; background: rgba(15,118,110,.92); color: #fff; box-shadow: 0 20px 48px rgba(15,118,110,.28); }
.sqToast__icon { width: 22px; height: 22px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,.18); }
.sqToast__icon svg { width: 16px; height: 16px; }
.sqToast__text { font-weight: 900; }

.sq-fade-enter-active, .sq-fade-leave-active { transition: opacity .28s ease; }
.sq-fade-enter-from, .sq-fade-leave-to { opacity: 0; }
.sq-fade-enter-active .sq__card, .sq-fade-leave-active .sq__card { transition: transform .28s ease, opacity .28s ease; }
.sq-fade-enter-from .sq__card { transform: scale(.95); opacity: 0; }
.sq-fade-leave-to .sq__card { transform: scale(.97); opacity: 0; }

.sq-slide-next-enter-active, .sq-slide-next-leave-active, .sq-slide-prev-enter-active, .sq-slide-prev-leave-active { transition: transform .22s ease, opacity .22s ease; }
.sq-slide-next-enter-from { transform: translateX(14px); opacity: 0; }
.sq-slide-next-leave-to { transform: translateX(-14px); opacity: 0; }
.sq-slide-prev-enter-from { transform: translateX(-14px); opacity: 0; }
.sq-slide-prev-leave-to { transform: translateX(14px); opacity: 0; }

.sq-toast-enter-active, .sq-toast-leave-active { transition: transform .22s ease, opacity .22s ease; }
.sq-toast-enter-from, .sq-toast-leave-to { transform: translateY(12px); opacity: 0; }

@media (max-width: 640px) {
  .sq { padding: .85rem; }
  .sq__hd, .sq__bd, .sq__ft { padding-left: 1rem; padding-right: 1rem; }
  .sq__panel { min-height: 480px; }
  .sq__arabicLarge { font-size: 1.6rem; line-height: 2.4rem; }
  .sq__title { font-size: 1.12rem; }
  .sq__flipFront, .sq__flipBack { min-height: 280px; padding: 1.2rem; }
}

@media (prefers-reduced-motion: reduce) {
  .sq__barFill, .sq__flipCard, .sqBtn, .sq__dot, .sq__close, .sq__timer { transition: none !important; }
  .sq__spinner { animation: none !important; }
  .sq__flipCard { transform: none !important; }
  .sq__flipCard.is-flipped { transform: none !important; }
}
</style>