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
                  <span class="sq__countStrong">Question {{ qNumber }}</span>
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
                    <div class="sq__loadingSub">Questions are generated from the ayahs you just practiced.</div>
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
                      <span v-if="scorePct === 100" class="sq__perfect">Perfect.</span>
                      <span v-else-if="scorePct >= 80">Strong session.</span>
                      <span v-else>Keep going. Consistency wins.</span>
                    </div>
                  </div>

                  <div class="sq__break">
                    <div class="sq__breakTitle">By ayah</div>
                    <div class="sq__breakGrid">
                      <div v-for="row in breakdown" :key="row.ayah" class="sq__breakRow" :class="{ 'is-weak': row.wrong > 0 }">
                        <div class="sq__breakAyah">Ayah {{ row.ayah }}</div>
                        <div class="sq__breakPills">
                          <span class="sq__pill is-good">{{ row.correct }} correct</span>
                          <span class="sq__pill is-bad">{{ row.wrong }} wrong</span>
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

                <div v-else-if="currentQ" class="sq__quiz">
                  <div class="sq__qHead">
                    <div class="sq__type">
                      <span class="sq__typePill" :title="typeHelp">{{ typeLabel }}</span>
                      <span class="sq__typeMeta">Ayah {{ currentQ.ayahNumber }}</span>
                    </div>
                    <div class="sq__diff" v-if="currentQ.diff">{{ currentQ.diff }}</div>
                  </div>

                  <div class="sq__instr">{{ instruction }}</div>

                  <div v-if="currentQ.type === 'fill'" class="sq__textBox">
                    <p class="sq__arabic" dir="rtl" lang="ar">
                      <template v-for="(p, i) in currentQ.parts" :key="`p-${currentQ.id}-${i}`">
                        <span v-if="p.blank" class="sq__blank">_____</span>
                        <span v-else>{{ p.t }}</span>
                        <span aria-hidden="true">&nbsp;</span>
                      </template>
                    </p>
                    <p v-if="currentQ.hint" class="sq__hint"><span class="sq__hintLabel">Hint</span>{{ currentQ.hint }}</p>
                  </div>

                  <div v-else-if="currentQ.type === 'match'" class="sq__textBox">
                    <p class="sq__arabic" dir="rtl" lang="ar">{{ currentQ.arabicText }}</p>
                    <p v-if="currentQ.hint" class="sq__hint"><span class="sq__hintLabel">Hint</span>{{ currentQ.hint }}</p>
                  </div>

                  <div v-else class="sq__reciteBox">
                    <div class="sq__recTitle">Recite from memory</div>
                    <div class="sq__recSub">Press record, recite the ayah, then stop. We will check your recitation.</div>
                    <div class="sq__recBtns">
                      <button type="button" class="sqBtn sqBtn--primary" :class="{ 'is-rec': isRec }" :disabled="currentQ.answered || recBusy" @click="toggleRec">
                        {{ isRec ? 'Stop recording' : 'Record recitation' }}
                      </button>
                      <button v-if="recUnavailable" type="button" class="sqBtn sqBtn--ghost" :disabled="currentQ.answered" @click="skipRec">I can't record</button>
                    </div>
                    <div v-if="currentQ.recStatus" class="sq__recStatus" :class="`is-${currentQ.recStatus}`">
                      <span v-if="currentQ.recStatus === 'rec'">Recording...</span>
                      <span v-else-if="currentQ.recStatus === 'tx'">Transcribing...</span>
                      <span v-else-if="currentQ.recStatus === 'chk'">Checking...</span>
                      <span v-else-if="currentQ.recStatus === 'err'">{{ currentQ.recErr || 'Recitation could not be checked.' }}</span>
                      <span v-else-if="currentQ.recStatus === 'done'">Checked.</span>
                    </div>
                    <div v-if="currentQ.user && currentQ.type === 'recite'" class="sq__recResult">
                      <div class="sq__recLabel">Transcription</div>
                      <div class="sq__recText">{{ currentQ.user }}</div>
                      <div v-if="typeof currentQ.matchScore === 'number'" class="sq__recScore">Match: {{ Math.round(currentQ.matchScore * 100) }}%</div>
                    </div>
                    <div
                      v-if="currentQ.answered && currentQ.type === 'recite'"
                      class="sq__recVerdict"
                      :class="{ 'is-good': currentQ.correct, 'is-bad': currentQ.correct === false }"
                      role="status"
                      aria-live="polite"
                    >
                      <span v-if="currentQ.correct">Correct.</span><span v-else>Needs review.</span>
                    </div>
                    <div v-if="currentQ.answered && currentQ.type === 'recite' && currentQ.correct === false" class="sq__recExpected">
                      <div class="sq__recLabel">Correct text</div>
                      <div class="sq__arabicSmall" dir="rtl" lang="ar">{{ currentQ.arabicText }}</div>
                    </div>
                    <p v-if="currentQ.hint" class="sq__hint"><span class="sq__hintLabel">Hint</span>{{ currentQ.hint }}</p>
                  </div>

                  <div v-if="currentQ.type !== 'recite'" class="sq__choices">
                    <button
                      v-for="o in currentQ.options"
                      :key="`${currentQ.id}-${String(o.v)}`"
                      type="button"
                      class="sq__choice"
                      :class="choiceClass(o.v)"
                      :disabled="currentQ.answered"
                      @click="pick(o.v)"
                    >
                      <span class="sq__choiceText" :dir="currentQ.type === 'fill' ? 'rtl' : 'ltr'">
                        <span v-if="currentQ.type === 'match'">Ayah {{ o.l }}</span><span v-else>{{ o.l }}</span>
                      </span>
                      <span v-if="currentQ.answered && o.v === currentQ.correctAnswer" class="sq__mark is-ok" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </span>
                      <span v-else-if="currentQ.answered && o.v === currentQ.user && currentQ.correct === false" class="sq__mark is-bad" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false"><path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
                      </span>
                    </button>

                    <div v-if="currentQ.answered" class="sq__feedback" :class="{ 'is-ok': currentQ.correct, 'is-bad': currentQ.correct === false }" role="status" aria-live="polite">
                      <div class="sq__fbTitle">{{ currentQ.correct ? 'Correct.' : 'Not quite.' }}</div>
                      <div v-if="currentQ.correct === false" class="sq__fbSub">Correct answer: <span class="sq__fbAns" dir="rtl">{{ currentQ.correctLabel }}</span></div>
                    </div>
                  </div>
                </div>
              </section>
            </Transition>
          </main>

          <footer v-if="state === 'quiz' && currentQ" class="sq__ft">
            <button type="button" class="sqBtn sqBtn--ghost" :disabled="idx <= 0" @click="prev">Previous</button>
            <div class="sq__dots" aria-label="Question navigation">
              <button
                v-for="(q, i) in questions"
                :key="`d-${q.id}`"
                type="button"
                class="sq__dot"
                :class="dotClass(q, i)"
                :aria-current="i === idx ? 'true' : 'false'"
                :aria-label="`Go to question ${i + 1}`"
                @click="jump(i)"
              ></button>
            </div>
            <button type="button" class="sqBtn sqBtn--primary" :disabled="!currentQ.answered" @click="next">
              {{ idx + 1 >= questions.length ? 'Finish' : 'Next' }}
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
const questions = ref([])
const idx = ref(0)
const dir = ref('next')
const quizId = ref('')
const startedAt = ref(0)
const savedAt = ref(0)
const saving = ref(false)

const timerOn = ref(true)
const timeLeft = ref(0)
let tHandle = null

const toast = ref({ on: false, text: 'Quiz saved.' })
let toastHandle = null

const card = ref(null)

const ENV = (typeof process !== 'undefined' && process.env) ? process.env : {}
const HF_TOKEN = (() => {
  // Keep tokens out of git: read from env/localStorage/window at runtime.
  // localStorage keys you can set:
  // - ic_hf_api_token
  // - ic_hf_token
  const fromEnv =
    ENV.HF_API_KEY ||
    ENV.HUGGINGFACE_API_TOKEN ||
    ENV.MIX_HUGGINGFACE_API_RECITATION_TOKEN ||
    ENV.MIX_HUGGINGFACE_API_TOKEN ||
    ENV.MIX_HUGGINGFACE_API_TOKEN ||
    ENV.MIX_HF_API_TOKEN ||
    ENV.HUGGINGFACE_API_RECITATION_TOKEN ||
    ENV.VUE_APP_HUGGINGFACE_API_TOKEN ||
    ''
  if (fromEnv) return String(fromEnv)
  try {
    const ls =
      localStorage.getItem('ic_hf_api_token') ||
      localStorage.getItem('ic_hf_token') ||
      ''
    if (ls) return String(ls)
  } catch (_) {}
  try {
    const w = (typeof window !== 'undefined') ? window : null
    const token = w && (w.__HF_API_TOKEN__ || w.__HF_TOKEN__)
    if (token) return String(token)
  } catch (_) {}
  return ''
})()
const WHISPER_MODEL = 'openai/whisper-large-v3'

const sessionInfo = computed(() => normalizeSession(props.session))
const total = computed(() => questions.value.length || 0)
const currentQ = computed(() => questions.value[idx.value] || null)
const canClose = computed(() => true)

const title = computed(() => {
  const s = sessionInfo.value
  const surah = s.surahName ? s.surahName : (s.surahNumber ? `Surah ${s.surahNumber}` : 'Session')
  const range = s.rangeStart && s.rangeEnd ? `${s.rangeStart}-${s.rangeEnd}` : ''
  return range ? `${surah} · ${range}` : surah
})

const qNumber = computed(() => state.value === 'quiz' ? clamp(idx.value + 1, 1, Math.max(1, total.value)) : total.value)
const progress = computed(() => {
  if (state.value === 'complete') return 100
  const t = total.value
  if (!t) return 0
  const answered = questions.value.filter(q => q && q.answered).length
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
  return currentQ.value?.id || `q-${idx.value}`
})

const correct = computed(() => questions.value.filter(q => q && q.answered && q.correct).length)
const wrong = computed(() => questions.value.filter(q => q && q.answered && q.correct === false).length)
const scorePct = computed(() => total.value ? Math.round((correct.value / total.value) * 100) : 0)

const breakdown = computed(() => {
  const map = new Map()
  for (const q of questions.value) {
    if (!q || !q.answered) continue
    const n = Number(q.ayahNumber || 0)
    if (!n) continue
    if (!map.has(n)) map.set(n, { ayah: n, correct: 0, wrong: 0 })
    const row = map.get(n)
    if (q.correct) row.correct += 1
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

const typeLabel = computed(() => {
  const q = currentQ.value
  if (!q) return ''
  if (q.type === 'fill') return 'Fill in the blank'
  if (q.type === 'match') return 'Match the ayah'
  return 'Recite from memory'
})

const typeHelp = computed(() => {
  const q = currentQ.value
  if (!q) return ''
  if (q.type === 'fill') return 'Choose the missing phrase from the options.'
  if (q.type === 'match') return 'Pick the correct ayah number for this text.'
  return 'Record yourself reciting, then we compare the transcription.'
})

const instruction = computed(() => {
  const q = currentQ.value
  if (!q) return ''
  if (q.type === 'fill') return 'Pick the missing phrase.'
  if (q.type === 'match') return 'Select the correct ayah number.'
  return 'Recite clearly and naturally.'
})

let stream = null
let recorder = null
let chunks = []
let autoStop = null
const recQid = ref('')
const recUnavailable = computed(() => {
  if (typeof window === 'undefined') return true
  const MR = window.MediaRecorder
  return !MR || !navigator?.mediaDevices?.getUserMedia
})
const recBusy = computed(() => {
  const q = currentQ.value
  return !!q && q.type === 'recite' && (q.recStatus === 'rec' || q.recStatus === 'tx' || q.recStatus === 'chk')
})
const isRec = computed(() => {
  const q = currentQ.value
  return !!q && q.type === 'recite' && q.recStatus === 'rec' && recQid.value === q.id
})

watch(() => props.isOpen, open => (open ? openQuiz() : cleanup(false)), { immediate: true })
watch(() => props.session, () => { if (props.isOpen) openQuiz() })
onBeforeUnmount(() => cleanup(true))

function openQuiz () {
  const s = sessionInfo.value
  if (!s?.ayahs?.length) {
    state.value = 'error'
    error.value = 'Missing ayah data for this session. Pass `session.ayahsPracticed` with Arabic text to generate the quiz.'
    return
  }

  state.value = 'loading'
  error.value = ''
  savedAt.value = 0

  const d = loadDraft(s)
  if (d?.questions?.length) {
    quizId.value = d.quizId || id('quiz')
    startedAt.value = Number(d.startedAt || Date.now()) || Date.now()
    timerOn.value = d.timerOn !== false
    questions.value = d.questions
    idx.value = clampIndex(Number(d.idx || 0), questions.value.length)
    timeLeft.value = Number(d.timeLeft || 0) || timerSeconds(questions.value.length)
    state.value = d.state === 'complete' ? 'complete' : 'quiz'
  } else {
    quizId.value = id('quiz')
    startedAt.value = Date.now()
    timerOn.value = timerPref()
    questions.value = buildQuestions(s)
    idx.value = 0
    timeLeft.value = timerSeconds(questions.value.length)
    state.value = 'quiz'
    persistDraft()
  }

  if (state.value === 'quiz' && allAnswered()) {
    state.value = 'complete'
    stopTimer()
  }

  if (props.isOpen) {
    lock(true)
    keys(true)
    startTimer()
    nextTick(() => { try { card.value?.focus?.() } catch (_) {} })
    if (state.value === 'complete') celebrateComplete()
  }
}

function cleanup (unmount) {
  keys(false)
  stopTimer()
  lock(false)
  stopRec()
  if (autoNextHandle) {
    clearTimeout(autoNextHandle)
    autoNextHandle = null
  }
  toast.value.on = false
  if (toastHandle) {
    clearTimeout(toastHandle)
    toastHandle = null
  }
  if (unmount) questions.value = []
}

function close () {
  cleanup(false)
  emit('close')
}

let autoNextHandle = null
function scheduleAutoNext () {
  if (autoNextHandle) clearTimeout(autoNextHandle)
  // Give time for the user to see green/red feedback, then move on.
  autoNextHandle = setTimeout(() => {
    autoNextHandle = null
    if (state.value !== 'quiz') return
    if (!currentQ.value?.answered) return
    next()
  }, 520)
}

function lock (on) {
  if (typeof document === 'undefined') return
  try { document.documentElement.classList.toggle('sqLock', !!on) } catch (_) {}
}

function keys (on) {
  if (typeof window === 'undefined') return
  const opt = { capture: true }
  if (on) window.addEventListener('keydown', onKey, opt)
  else window.removeEventListener('keydown', onKey, opt)
}

function onKey (e) {
  if (!props.isOpen) return
  if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  if (e.key === 'Enter') {
    e.preventDefault()
    e.stopPropagation()
    if (state.value === 'complete') {
      if (!saving.value) save()
      return
    }
    if (state.value !== 'quiz') return
    if (!currentQ.value?.answered) return
    next()
  }
}

function toggleTimer () {
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

function timerPref () {
  if (typeof window === 'undefined') return true
  try {
    const v = localStorage.getItem('ic_memo_quiz_timer_v1')
    return v == null ? true : v !== '0'
  } catch (_) {
    return true
  }
}

function startTimer () {
  stopTimer()
  if (!timerOn.value || state.value !== 'quiz' || timeLeft.value <= 0) return
  tHandle = setInterval(() => {
    if (!props.isOpen || state.value !== 'quiz' || !timerOn.value) return
    timeLeft.value = Math.max(0, Number(timeLeft.value || 0) - 1)
    if (timeLeft.value % 10 === 0) persistDraft()
    if (timeLeft.value <= 0) stopTimer()
  }, 1000)
}

function stopTimer () {
  if (tHandle) {
    clearInterval(tHandle)
    tHandle = null
  }
}

function timerSeconds (qCount) {
  return clamp(Math.round(clamp(qCount * 45, 180, 900)), 60, 3600)
}

function prev () {
  if (state.value !== 'quiz') return
  stopRec()
  dir.value = 'prev'
  idx.value = clampIndex(idx.value - 1, total.value)
  persistDraft()
}

function next () {
  if (state.value !== 'quiz') return
  stopRec()
  dir.value = 'next'
  if (idx.value + 1 >= total.value) {
    state.value = 'complete'
    stopTimer()
    persistDraft()
    celebrateComplete()
    return
  }
  idx.value = clampIndex(idx.value + 1, total.value)
  persistDraft()
}

function jump (i) {
  if (state.value !== 'quiz') return
  stopRec()
  const n = clampIndex(i, total.value)
  if (n === idx.value) return
  dir.value = n < idx.value ? 'prev' : 'next'
  idx.value = n
  persistDraft()
}

function pick (val) {
  const q = currentQ.value
  if (!q || q.answered) return
  q.user = val
  q.answered = true
  q.correct = eq(val, q.correctAnswer)
  if (q.correct) confettiMicro()
  persistDraft()
  if (allAnswered()) {
    state.value = 'complete'
    stopTimer()
    persistDraft()
    celebrateComplete()
    return
  }
  scheduleAutoNext()
}

function choiceClass (val) {
  const q = currentQ.value
  if (!q) return {}
  const ans = !!q.answered
  const isOk = ans && eq(val, q.correctAnswer)
  const isPick = ans && eq(val, q.user)
  return { 'is-ok': isOk, 'is-bad': isPick && !q.correct, 'is-dim': ans && !isOk && !isPick }
}

function dotClass (q, i) {
  return { 'is-a': i === idx.value, 'is-ans': q.answered, 'is-ok': q.answered && q.correct, 'is-bad': q.answered && q.correct === false }
}

function allAnswered () {
  return questions.value.length > 0 && questions.value.every(q => q && q.answered)
}

function save () {
  const s = sessionInfo.value
  if (!s || saving.value || !allAnswered()) return
  saving.value = true

  const res = buildResult({
    quizId: quizId.value || id('quiz'),
    session: s,
    questions: questions.value,
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

function retakeWrong () {
  if (!wrong.value) return
  const s = sessionInfo.value
  if (!s) return

  const wrongAyahs = new Set(
    questions.value
      .filter(q => q?.answered && q.correct === false)
      .map(q => Number(q.ayahNumber || 0))
      .filter(n => n > 0)
  )
  const focus = { ...s, ayahs: s.ayahs.filter(a => wrongAyahs.has(Number(a.ayahNumber || 0))) }

  quizId.value = id('quiz')
  startedAt.value = Date.now()
  savedAt.value = 0
  state.value = 'quiz'
  questions.value = buildQuestions(focus)
  idx.value = 0
  timeLeft.value = timerSeconds(questions.value.length)
  persistDraft()
  startTimer()

  emit('retake', { sessionId: s.sessionId, quizId: quizId.value, ayahNumbers: [...wrongAyahs] })
}

async function toggleRec () {
  const q = currentQ.value
  if (!q || q.type !== 'recite' || q.answered) return
  if (isRec.value) {
    stopRec()
    return
  }
  await startRec(q)
}

function skipRec () {
  const q = currentQ.value
  if (!q || q.type !== 'recite' || q.answered) return
  q.user = 'Skipped (no microphone)'
  q.answered = true
  q.correct = false
  q.matchScore = 0
  q.recStatus = 'done'
  persistDraft()
  if (allAnswered()) {
    state.value = 'complete'
    stopTimer()
    persistDraft()
    celebrateComplete()
    return
  }
  scheduleAutoNext()
}

async function startRec (q) {
  if (recUnavailable.value) {
    q.recStatus = 'err'
    q.recErr = 'Microphone recording is not supported on this device/browser.'
    persistDraft()
    return
  }
  stopRec()
  q.recErr = ''
  q.recStatus = 'rec'
  recQid.value = q.id
  chunks = []

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const MR = window.MediaRecorder
    const mime = pickMime(MR, ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'video/mp4'])
    recorder = mime ? new MR(stream, { mimeType: mime }) : new MR(stream)
    recorder.ondataavailable = ev => { if (ev?.data?.size) chunks.push(ev.data) }
    recorder.onstop = async () => {
      const parts = chunks.slice()
      chunks = []
      const target = findQ(recQid.value)
      recQid.value = ''
      stopTracks()
      if (!target || target.type !== 'recite') return
      if (!parts.length) {
        target.recStatus = 'err'
        target.recErr = 'No audio captured.'
        persistDraft()
        return
      }
      const blob = new Blob(parts, { type: recorder?.mimeType || 'audio/webm' })
      await transcribeAndCheck(target, blob)
    }
    recorder.start(250)
    if (autoStop) clearTimeout(autoStop)
    autoStop = setTimeout(() => { if (isRec.value) stopRec() }, 22000)
  } catch (_) {
    q.recStatus = 'err'
    q.recErr = 'Could not access microphone. Check browser permissions.'
    recQid.value = ''
    stopRec()
    persistDraft()
  }
}

function stopRec () {
  if (autoStop) {
    clearTimeout(autoStop)
    autoStop = null
  }
  try { if (recorder && recorder.state !== 'inactive') recorder.stop() } catch (_) {}
  if (recorder && recorder.state === 'inactive') stopTracks()
  recorder = null
}

function stopTracks () {
  try { stream?.getTracks?.().forEach(t => { try { t.stop() } catch (_) {} }) } catch (_) {}
  stream = null
}

function pickMime (MR, candidates) {
  if (!MR?.isTypeSupported) return ''
  for (const c of candidates) {
    try {
      if (MR.isTypeSupported(c)) return c
    } catch (_) {}
  }
  return ''
}

function findQ (idValue) {
  return questions.value.find(q => String(q?.id || '') === String(idValue || '')) || null
}

async function transcribeAndCheck (q, blob) {
  q.recStatus = 'tx'
  q.recErr = ''
  persistDraft()
  try {
    const text = await whisper(blob)
    q.user = text || '(No transcription)'
    q.recStatus = 'chk'
    persistDraft()

    const exp = norm(q.arabicText || '')
    const act = norm(text || '')
    const score = matchScore(exp, act)
    q.matchScore = score
    q.answered = true
    q.correct = score >= 0.75
    q.recStatus = 'done'
    if (q.correct) confettiMicro()
    persistDraft()
    if (allAnswered()) {
      state.value = 'complete'
      stopTimer()
      persistDraft()
      celebrateComplete()
      return
    }
    scheduleAutoNext()
  } catch (err) {
    q.recStatus = 'err'
    q.recErr = err?.message || 'Transcription failed.'
    persistDraft()
  }
}

async function whisper (blob) {
  const url = '/api/quran/recitation/transcribe'
  const attempt = async retry => {
    const form = new FormData()
    form.append('audio', blob, `recitation-${Date.now()}.webm`)
    form.append('model', WHISPER_MODEL)
    const r = await fetch(url, {
      method: 'POST',
      body: form,
      credentials: 'same-origin'
    })
    let data = null
    try { data = await r.json() } catch (_) {}
    if (!r.ok) {
      const msg = (data && (data.error || data.message)) || `Transcription failed (${r.status}).`
      const loading = (r.status === 503 || r.status === 429) && data && typeof data.estimated_time === 'number'
      if (loading && retry < 1) {
        const wait = clamp(Math.round((Number(data.estimated_time || 0) + 0.35) * 1000), 800, 7000)
        await new Promise(resolve => setTimeout(resolve, wait))
        return attempt(retry + 1)
      }
      throw new Error(msg)
    }
    const text =
      typeof data === 'string'
        ? data
        : typeof data?.text === 'string'
          ? data.text
          : typeof data?.[0]?.text === 'string'
            ? data[0].text
            : ''
    return String(text || '').trim()
  }
  return attempt(0)
}

function scopeId () {
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

function dKey (s) {
  return `ic_memo_quiz_draft_v1_${scopeId()}_${String(s.sessionId || 'session').replace(/[^a-zA-Z0-9_-]/g, '')}`
}

function loadDraft (s) {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(dKey(s))
    if (!raw) return null
    const d = JSON.parse(raw)
    if (!d || d.v !== 1 || String(d.sessionId || '') !== String(s.sessionId || '')) return null
    return d
  } catch (_) {
    return null
  }
}

function persistDraft () {
  const s = sessionInfo.value
  if (!s || typeof window === 'undefined') return
  const payload = {
    v: 1,
    sessionId: s.sessionId,
    quizId: quizId.value,
    state: state.value,
    startedAt: startedAt.value,
    idx: idx.value,
    timerOn: timerOn.value,
    timeLeft: timeLeft.value,
    questions: questions.value,
    updatedAt: Date.now()
  }
  try { localStorage.setItem(dKey(s), JSON.stringify(payload)) } catch (_) {}
}

function clearDraft (s) {
  if (typeof window !== 'undefined') {
    try { localStorage.removeItem(dKey(s)) } catch (_) {}
  }
}

function persistHistory (res) {
  if (typeof window === 'undefined') return
  const key = `ic_memo_quiz_history_v1_${scopeId()}`
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : null
    const entries = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.entries) ? parsed.entries : [])
    const next = [res, ...entries.filter(e => String(e?.quizId || '') !== String(res.quizId || ''))].slice(0, 250)
    localStorage.setItem(key, JSON.stringify({ version: 1, updatedAt: Date.now(), entries: next }))
  } catch (_) {}
}

function patchSessionHistory (res) {
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

function buildQuestions (s) {
  const ayahs = (s.ayahs || []).filter(a => a?.ayahNumber && a?.arabicText)
  const n = ayahs.length
  const totalQ = Math.max(n, Math.min(10, n * 2))

  const types = typeCounts(totalQ)
  const typeList = shuffle([
    ...Array(types.fill).fill('fill'),
    ...Array(types.match).fill('match'),
    ...Array(types.recite).fill('recite')
  ])

  const base = ayahs.map(a => Number(a.ayahNumber))
  const rem = Math.max(0, totalQ - base.length)
  const extra = []
  for (let i = 0; i < rem; i += 1) {
    const picked = wPick(ayahs, a => (a.mistakes ? 2 : 1)) || ayahs[0]
    extra.push(Number(picked?.ayahNumber || ayahs[0].ayahNumber))
  }
  const targets = [...base, ...extra].slice(0, totalQ)

  return targets.map((num, i) => {
    const a = ayahs.find(x => Number(x.ayahNumber) === Number(num)) || ayahs[0]
    const t = typeList[i] || 'fill'
    if (t === 'match') return qMatch(s, a, ayahs)
    if (t === 'recite') return qRecite(s, a)
    return qFill(s, a, ayahs)
  })
}

function typeCounts (t) {
  t = Math.max(1, Number(t || 0))
  let fill = Math.round(t * 0.6)
  let match = Math.round(t * 0.2)
  let recite = t - fill - match
  if (t >= 5) {
    fill = Math.max(1, fill)
    match = Math.max(1, match)
    recite = Math.max(1, recite)
    const sum = fill + match + recite
    if (sum !== t) fill = Math.max(1, fill + (t - sum))
  } else {
    match = Math.min(match, t - 1)
    recite = Math.min(recite, t - 1 - match)
    fill = t - match - recite
  }
  return { fill, match, recite }
}

function qFill (s, a, all) {
  const arabic = String(a.arabicText || '').trim()
  const words = tok(arabic)
  const mastery = clamp(Number(a.mastery ?? 0.6), 0, 1)
  const len = clamp(mastery >= 0.8 ? 3 : mastery < 0.5 ? 1 : 2, 1, Math.min(3, Math.max(1, words.length)))
  const start = rand(0, Math.max(0, words.length - len))
  const correctPhrase = words.slice(start, start + len).join(' ')
  const parts = [
    ...words.slice(0, start).map(t => ({ t, blank: false })),
    { t: '', blank: true },
    ...words.slice(start + len).map(t => ({ t, blank: false }))
  ]
  const distract = distractPhrases(correctPhrase, len, Number(a.ayahNumber), all)
  const opts = shuffle([{ v: correctPhrase, l: correctPhrase }, ...distract.map(p => ({ v: p, l: p }))]).slice(0, 4)
  return {
    id: id('q'),
    type: 'fill',
    ayahNumber: Number(a.ayahNumber),
    arabicText: arabic,
    parts,
    options: opts,
    correctAnswer: correctPhrase,
    correctLabel: correctPhrase,
    answered: false,
    correct: null,
    user: null,
    diff: mastery >= 0.8 ? 'Hard' : (mastery < 0.5 ? 'Easy' : 'Medium'),
    hint: mastery < 0.5 ? String(a.translationText || '').trim() : ''
  }
}

function qMatch (s, a, all) {
  const arabic = String(a.arabicText || '').trim()
  const mastery = clamp(Number(a.mastery ?? 0.6), 0, 1)
  const num = Number(a.ayahNumber)
  const pool = uniq([...all.map(x => Number(x.ayahNumber)).filter(n => n > 0 && n !== num), ...rangePool(s, num)])
  const picked = shuffle(pool).slice(0, 3)
  const optsN = uniq([num, ...picked])
  while (optsN.length < 4) {
    const f = pool[rand(0, Math.max(0, pool.length - 1))] || (num + optsN.length)
    if (!optsN.includes(f)) optsN.push(f)
    if (optsN.length > 8) break
  }
  const opts = shuffle(optsN).slice(0, 4).map(n => ({ v: n, l: n }))
  return {
    id: id('q'),
    type: 'match',
    ayahNumber: num,
    arabicText: arabic,
    options: opts,
    correctAnswer: num,
    correctLabel: String(num),
    answered: false,
    correct: null,
    user: null,
    diff: mastery >= 0.8 ? 'Hard' : (mastery < 0.5 ? 'Easy' : 'Medium'),
    hint: mastery < 0.5 ? String(a.translationText || '').trim() : ''
  }
}

function qRecite (s, a) {
  const arabic = String(a.arabicText || '').trim()
  const mastery = clamp(Number(a.mastery ?? 0.6), 0, 1)
  return {
    id: id('q'),
    type: 'recite',
    ayahNumber: Number(a.ayahNumber),
    arabicText: arabic,
    options: [],
    correctAnswer: norm(arabic),
    correctLabel: arabic,
    answered: false,
    correct: null,
    user: null,
    diff: mastery >= 0.8 ? 'Hard' : (mastery < 0.5 ? 'Easy' : 'Medium'),
    hint: mastery < 0.5 ? String(a.translationText || '').trim() : '',
    recStatus: '',
    recErr: '',
    matchScore: null
  }
}

function rangePool (s, exclude) {
  const a = Number(s.rangeStart || 0)
  const b = Number(s.rangeEnd || 0)
  if (a > 0 && b >= a && b - a <= 240) {
    const out = []
    for (let n = a; n <= b; n += 1) if (n !== exclude) out.push(n)
    return out
  }
  return []
}

function distractPhrases (correct, len, targetAyah, all) {
  const want = 3
  const out = []
  const target = String(correct || '').trim()
  const sources = (all || []).filter(x => Number(x?.ayahNumber || 0) !== Number(targetAyah || 0))
  const pickFrom = sources.length ? sources : (all || [])
  for (let tries = 0; tries < 40 && out.length < want; tries += 1) {
    const src = pickFrom[rand(0, Math.max(0, pickFrom.length - 1))]
    const w = tok(String(src?.arabicText || '').trim())
    if (!w.length) continue
    const l = clamp(len, 1, Math.min(len, w.length))
    const st = rand(0, Math.max(0, w.length - l))
    const phrase = w.slice(st, st + l).join(' ').trim()
    if (!phrase || phrase === target || out.includes(phrase)) continue
    out.push(phrase)
  }
  while (out.length < want) {
    const tokens = tok(target)
    const fb = shuffle(tokens).slice(0, Math.max(1, Math.min(len, tokens.length))).join(' ') || `Option ${out.length + 1}`
    if (fb !== target && !out.includes(fb)) out.push(fb)
    else out.push(`Option ${out.length + 1}`)
  }
  return out.slice(0, want)
}

function buildResult ({ quizId: quizIdValue, session, questions: questionList, startedAt: startedAtValue, endedAt }) {
  const qs = Array.isArray(questionList) ? questionList : []
  const totalQuestions = qs.length
  const correctAnswers = qs.filter(q => q?.answered && q.correct).length
  const scorePercent = totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0
  const timeSpentSeconds = Math.max(0, Math.round((Number(endedAt || 0) - Number(startedAtValue || 0)) / 1000))
  const mistakesByAyah = {}
  for (const q of qs) {
    const n = Number(q?.ayahNumber || 0)
    if (!n) continue
    if (!mistakesByAyah[n]) mistakesByAyah[n] = 0
    if (q.answered && q.correct === false) mistakesByAyah[n] += 1
  }
  return {
    version: 1,
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
    questions: qs.map(q => ({
      id: q.id,
      type: q.type,
      ayahNumber: q.ayahNumber,
      diff: q.diff || '',
      arabicText: q.arabicText || '',
      parts: q.parts || null,
      options: Array.isArray(q.options) ? q.options.map(o => ({ v: o.v, l: o.l })) : [],
      correctAnswer: q.correctAnswer,
      userAnswer: q.user,
      isCorrect: q.correct,
      matchScore: typeof q.matchScore === 'number' ? q.matchScore : null
    }))
  }
}

function normalizeSession (src) {
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

function normPractice (it, session) {
  if (!it || typeof it !== 'object') return null
  const ayahNumber = Number(it.ayahNumber || it.ayah || it.verseNumber || it.number || 0) || 0
  if (!ayahNumber) return null
  const arabicText =
    String(it.arabicText || it.arabic || it.text || it.ayahText || it.verseText || it.textArabic || '').trim() ||
    String(session?.ayahTextMap?.[ayahNumber] || '').trim()
  if (!arabicText) return null
  const translationText = String(it.translation || it.translationText || it.english || it.textTranslation || '').trim()
  const attempts = clamp(Number(it.attempts || it.attemptCount || it.tries || it.totalAttempts || 0) || 0, 0, 999)
  const correctValue = resolveCorrect(it, attempts)
  const safeAttempts = Math.max(1, attempts || (typeof it.isCorrect === 'boolean' ? 1 : 1))
  const mastery = clamp(correctValue / safeAttempts, 0, 1)
  const mistakes = (attempts > 0 && correctValue < attempts) || !!it.hadMistakes || !!it.mistake
  return { ayahNumber, arabicText, translationText, mastery, mistakes }
}

function resolveCorrect (it, attempts) {
  const v = it.correctCount ?? it.correctAttempts ?? it.correct
  if (typeof v === 'number') return clamp(v, 0, Math.max(1, attempts || 1))
  if (typeof v === 'boolean') return v ? Math.max(1, attempts || 1) : 0
  if (typeof it.isCorrect === 'boolean') return it.isCorrect ? Math.max(1, attempts || 1) : 0
  return 0
}

function tok (t) {
  return String(t || '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean)
}

function norm (t) {
  return String(t || '')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/\u0640/g, '')
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF0-9A-Za-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function matchScore (exp, act) {
  const e = norm(exp).split(' ').filter(Boolean)
  const a = norm(act).split(' ').filter(Boolean)
  if (!e.length || !a.length) return 0
  const set = new Set(e)
  let hit = 0
  for (const t of a) if (set.has(t)) hit += 1
  return clamp(hit / e.length, 0, 1)
}

function prefersReduced () {
  try { return window?.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches } catch (_) { return false }
}

function ensureConfetti () {
  return Promise.resolve(null)
}

function confettiMicro () {
  // Confetti removed: keep quiz feedback quiet and premium.
}

function celebrateComplete () {
  // Confetti removed: keep quiz completion quiet and premium.
}

function eq (a, b) {
  return (typeof a === 'number' || typeof b === 'number') ? Number(a) === Number(b) : String(a) === String(b)
}

function clampIndex (i, len) {
  len = Math.max(0, Number(len || 0))
  if (!len) return 0
  i = Number(i || 0)
  if (!Number.isFinite(i)) return 0
  return Math.max(0, Math.min(len - 1, Math.round(i)))
}

function clamp (v, a, b) {
  v = Number(v)
  if (!Number.isFinite(v)) return a
  return Math.max(a, Math.min(b, v))
}

function rand (a, b) {
  a = Math.ceil(Number(a || 0))
  b = Math.floor(Number(b || 0))
  if (b <= a) return a
  return Math.floor(a + Math.random() * (b - a + 1))
}

function shuffle (arr) {
  const a = Array.isArray(arr) ? arr.slice() : []
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = a[i]
    a[i] = a[j]
    a[j] = t
  }
  return a
}

function uniq (arr) {
  const out = []
  const seen = new Set()
  for (const v of (Array.isArray(arr) ? arr : [])) {
    const n = Number(v)
    if (!Number.isFinite(n) || n <= 0 || seen.has(n)) continue
    seen.add(n)
    out.push(n)
  }
  return out
}

function wPick (items, wfn) {
  const list = Array.isArray(items) ? items : []
  if (!list.length) return null
  const ws = list.map(x => Math.max(0, Number(wfn(x) || 0)))
  const sum = ws.reduce((s, w) => s + w, 0)
  if (sum <= 0) return list[0]
  let r = Math.random() * sum
  for (let i = 0; i < list.length; i += 1) {
    r -= ws[i]
    if (r <= 0) return list[i]
  }
  return list[list.length - 1]
}

function id (p) {
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
.sq__panel { min-height: 420px; }

.sq__loading { display: flex; gap: .9rem; align-items: center; padding: 1.05rem; border-radius: 18px; background: rgba(15,118,110,.06); border: 1px solid rgba(15,118,110,.12); }
.sq__spinner { width: 34px; height: 34px; border-radius: 999px; border: 3px solid rgba(15,118,110,.18); border-top-color: rgba(15,118,110,.78); animation: sqSpin .9s linear infinite; }
@keyframes sqSpin { to { transform: rotate(360deg); } }
.sq__loadingTitle { font-weight: 900; color: rgba(11,47,42,.92); }
.sq__loadingSub { font-size: .9rem; color: rgba(11,47,42,.72); }

.sq__error { padding: 1.1rem; border-radius: 18px; background: rgba(185,28,28,.06); border: 1px solid rgba(185,28,28,.18); color: rgba(127,29,29,.92); }
.sq__errorTitle { font-weight: 900; margin-bottom: .35rem; }
.sq__errorSub { opacity: .88; }

.sq__qHead { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: .7rem; }
.sq__type { display: flex; align-items: baseline; gap: .65rem; flex-wrap: wrap; }
.sq__typePill { display: inline-flex; padding: .38rem .68rem; border-radius: 999px; font-weight: 900; font-size: .84rem; color: rgba(11,47,42,.9); background: rgba(15,118,110,.1); border: 1px solid rgba(15,118,110,.16); }
.sq__typeMeta { font-size: .92rem; color: rgba(11,47,42,.78); font-weight: 900; }
.sq__diff { font-size: .85rem; color: rgba(11,47,42,.75); text-align: right; }
.sq__instr { margin: 0 0 .85rem; color: rgba(11,47,42,.72); font-weight: 700; }

.sq__textBox, .sq__reciteBox { padding: 1rem; border-radius: 20px; background: rgba(15,118,110,.05); border: 1px solid rgba(15,118,110,.12); }
.sq__arabic { margin: 0; font-size: 1.65rem; line-height: 2.55rem; font-weight: 700; color: rgba(7,26,23,.95); font-family: "Amiri","Scheherazade New","Noto Naskh Arabic",serif; }
.sq__arabicSmall { font-family: "Amiri","Scheherazade New","Noto Naskh Arabic",serif; font-weight: 800; font-size: 1.3rem; line-height: 2.1rem; color: rgba(7,26,23,.94); }
.sq__blank { display: inline-flex; align-items: center; justify-content: center; min-width: 84px; padding: .1rem .55rem; border-radius: 10px; background: rgba(214,170,86,.16); border: 1px dashed rgba(214,170,86,.5); color: rgba(11,47,42,.9); transform: translateY(-1px); }
.sq__hint { margin: .75rem 0 0; padding: .65rem .75rem; border-radius: 16px; background: rgba(214,170,86,.08); border: 1px solid rgba(214,170,86,.18); color: rgba(11,47,42,.85); font-size: .92rem; }
.sq__hintLabel { display: inline-block; font-weight: 900; margin-right: .5rem; letter-spacing: .02em; }

.sq__choices { margin-top: 1rem; display: grid; gap: .65rem; }
.sq__choice { width: 100%; text-align: left; border-radius: 18px; padding: .95rem 1rem; border: 1px solid rgba(15,118,110,.14); background: rgba(255,255,255,.95); box-shadow: 0 14px 26px rgba(10,18,16,.08); display: flex; align-items: center; justify-content: space-between; gap: .75rem; transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease, background .16s ease; }
.sq__choice:hover:enabled { transform: translateY(-1px); box-shadow: 0 18px 32px rgba(10,18,16,.12); border-color: rgba(15,118,110,.28); }
.sq__choice:focus-visible { outline: 3px solid rgba(15,118,110,.26); outline-offset: 2px; }
.sq__choice.is-dim { opacity: .65; box-shadow: 0 10px 20px rgba(10,18,16,.06); }
.sq__choice.is-ok { border-color: rgba(22,163,74,.38); background: rgba(22,163,74,.08); }
.sq__choice.is-bad { border-color: rgba(185,28,28,.38); background: rgba(185,28,28,.06); animation: sqShake .24s ease; }
@keyframes sqShake { 0%{transform:translateX(0)} 30%{transform:translateX(-6px)} 60%{transform:translateX(6px)} 100%{transform:translateX(0)} }
.sq__choiceText { font-weight: 800; color: rgba(11,47,42,.92); font-size: 1rem; line-height: 1.3; }
.sq__mark { width: 28px; height: 28px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; }
.sq__mark svg { width: 18px; height: 18px; }
.sq__mark.is-ok { color: #166534; background: rgba(22,163,74,.14); }
.sq__mark.is-bad { color: #7f1d1d; background: rgba(185,28,28,.12); }

.sq__feedback { margin-top: .8rem; padding: .85rem .95rem; border-radius: 18px; border: 1px solid rgba(15,118,110,.14); background: rgba(15,118,110,.06); color: rgba(11,47,42,.9); }
.sq__feedback.is-bad { border-color: rgba(185,28,28,.2); background: rgba(185,28,28,.06); }
.sq__fbTitle { font-weight: 900; }
.sq__fbSub { margin-top: .35rem; opacity: .85; }
.sq__fbAns { font-weight: 900; }

.sq__ft { padding: .85rem 1.1rem 1.05rem; display: flex; align-items: center; justify-content: space-between; gap: .9rem; background: linear-gradient(180deg, #fdfdfb 0%, #f6fbf8 100%); border-top: 1px solid rgba(15,118,110,.08); flex: 0 0 auto; }
.sq__dots { display: flex; align-items: center; justify-content: center; gap: .45rem; flex-wrap: wrap; min-width: 160px; }
.sq__dot { width: 12px; height: 12px; border-radius: 999px; border: 1px solid rgba(15,118,110,.28); background: rgba(15,118,110,.1); box-shadow: 0 8px 18px rgba(10,18,16,.06); transition: transform .16s ease, background .16s ease, border-color .16s ease; }
.sq__dot:hover { transform: translateY(-1px) scale(1.08); }
.sq__dot.is-a { background: rgba(15,118,110,.58); border-color: rgba(15,118,110,.7); }
.sq__dot.is-ok { background: rgba(22,163,74,.55); border-color: rgba(22,163,74,.75); }
.sq__dot.is-bad { background: rgba(185,28,28,.5); border-color: rgba(185,28,28,.7); }

.sqBtn { border: 1px solid transparent; border-radius: 16px; padding: .75rem .95rem; font-weight: 900; letter-spacing: .01em; transition: transform .16s ease, box-shadow .16s ease, background .16s ease, border-color .16s ease; user-select: none; }
.sqBtn:focus-visible { outline: 3px solid rgba(15,118,110,.26); outline-offset: 2px; }
.sqBtn:disabled { opacity: .6; cursor: not-allowed; transform: none !important; }
.sqBtn--primary { color: #fff; background: linear-gradient(180deg, #0f766e 0%, #0b5f58 100%); box-shadow: 0 18px 34px rgba(15,118,110,.22); border-color: rgba(15,118,110,.25); }
.sqBtn--primary:hover:enabled { transform: translateY(-1px); box-shadow: 0 22px 40px rgba(15,118,110,.26); }
.sqBtn--ghost { color: rgba(11,47,42,.92); background: rgba(255,255,255,.86); border-color: rgba(15,118,110,.18); box-shadow: 0 14px 26px rgba(10,18,16,.08); }
.sqBtn--ghost:hover:enabled { transform: translateY(-1px); box-shadow: 0 18px 30px rgba(10,18,16,.12); border-color: rgba(15,118,110,.28); }
.sqBtn.is-rec { background: linear-gradient(180deg, #b91c1c 0%, #7f1d1d 100%) !important; box-shadow: 0 14px 28px rgba(185,28,28,.22) !important; }

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
.sq__breakRow { padding: .85rem; border-radius: 18px; border: 1px solid rgba(15,118,110,.12); background: rgba(255,255,255,.9); display: flex; align-items: center; justify-content: space-between; gap: .75rem; }
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

.sq__recTitle { font-weight: 900; font-size: 1.1rem; color: rgba(11,47,42,.95); }
.sq__recSub { margin-top: .35rem; color: rgba(11,47,42,.72); font-size: .92rem; }
.sq__recBtns { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: .9rem; }
.sq__recStatus { margin-top: .9rem; font-size: .92rem; color: rgba(11,47,42,.75); }
.sq__recStatus.is-err { color: rgba(127,29,29,.92); }
.sq__recResult { margin-top: .9rem; padding: .75rem; border-radius: 16px; background: rgba(255,255,255,.7); border: 1px solid rgba(15,118,110,.12); }
.sq__recLabel { font-weight: 900; color: rgba(11,47,42,.9); margin-bottom: .35rem; }
.sq__recText { color: rgba(11,47,42,.82); font-size: .95rem; line-height: 1.45; }
.sq__recScore { margin-top: .45rem; font-weight: 900; color: rgba(15,118,110,.9); font-variant-numeric: tabular-nums; }
.sq__recVerdict { margin-top: .75rem; padding: .65rem .75rem; border-radius: 16px; border: 1px solid rgba(15,118,110,.14); background: rgba(15,118,110,.06); color: rgba(11,47,42,.9); font-weight: 900; }
.sq__recVerdict.is-bad { border-color: rgba(185,28,28,.2); background: rgba(185,28,28,.06); color: rgba(127,29,29,.9); }
.sq__recExpected { margin-top: .75rem; padding: .75rem; border-radius: 16px; border: 1px solid rgba(214,170,86,.2); background: rgba(214,170,86,.08); }

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
  .sq__panel { min-height: 460px; }
  .sq__arabic { font-size: 1.5rem; line-height: 2.35rem; }
  .sq__title { font-size: 1.12rem; }
}

@media (prefers-reduced-motion: reduce) {
  .sq__barFill, .sq__choice, .sqBtn, .sq__dot, .sq__close, .sq__timer { transition: none !important; }
  .sq__spinner { animation: none !important; }
}
</style>
