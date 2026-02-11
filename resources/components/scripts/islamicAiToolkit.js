export const QUESTION_BANK_STORAGE_KEY = 'islamic-connect:verified-question-bank';
export const QUESTION_BANK_META_STORAGE_KEY = 'islamic-connect:verified-question-bank-meta';
export const DEFAULT_QUESTION_COUNT = 10000;
export const DEFAULT_BATCH_SIZE = 1000;

export const FREE_ISLAMIC_APIS = {
  quranCom: {
    name: 'Quran.com API',
    baseURL: 'https://api.quran.com/api/v4',
    endpoints: {
      chapters: '/chapters',
      versesByChapter: '/verses/by_chapter/{chapter_number}',
      verseByKey: '/verses/by_key/{verse_key}',
      search: '/search/{query}?size=20&page=1',
      translations: '/resources/translations',
      tafsirs: '/resources/tafsirs',
      recitations: '/resources/recitations',
    },
    keyRequired: false,
  },
  alQuranCloud: {
    name: 'Alquran.cloud',
    baseURL: 'https://api.alquran.cloud/v1',
    endpoints: {
      quran: '/quran/{edition}',
      surah: '/surah/{surah}/{edition}',
      ayah: '/ayah/{surah}:{ayah}/{edition}',
      search: '/search/{query}/{edition}',
    },
    keyRequired: false,
  },
  quranGading: {
    name: 'Quran Gading API',
    baseURL: 'https://api.quran.gading.dev',
    endpoints: {
      surah: '/surah/{surah_number}',
      ayah: '/surah/{surah_number}/{ayah_number}',
      search: '/search?q={query}',
      juz: '/juz/{juz_number}',
    },
    keyRequired: false,
  },
  quranEnc: {
    name: 'QuranEnc API',
    baseURL: 'https://quranenc.com/api/v1',
    endpoints: {
      translations: '/translations/list',
      translationAyah: '/translation/aya/{translation_key}/{surah_number}/{ayah_number}',
      tafsirAyah: '/translation/aya/{tafsir_key}/{surah_number}/{ayah_number}',
    },
    keyRequired: false,
  },
  sunnah: {
    name: 'Sunnah.com API',
    baseURL: 'https://api.sunnah.com/v1',
    endpoints: {
      collections: '/collections',
      books: '/collections/{collection}/books',
      hadiths: '/collections/{collection}/books/{book}/hadiths',
      hadith: '/collections/{collection}/hadiths/{hadithNumber}',
      search: '/search?query={query}&collection={collection}',
    },
    keyRequired: true,
  },
  hadithJson: {
    name: 'Hadith JSON (GitHub, Islamic Network)',
    baseURL: 'https://raw.githubusercontent.com/islamic-network/hadith-json/main',
    endpoints: {
      bukhari: '/bukhari.json',
      muslim: '/muslim.json',
      abudawud: '/abudawud.json',
      tirmidhi: '/tirmidhi.json',
      nasai: '/nasai.json',
      ibnmajah: '/ibnmajah.json',
      malik: '/malik.json',
    },
    keyRequired: false,
  },
  hadithJsonExtended: {
    name: 'Hadith JSON (GitHub, AhmedBaset)',
    baseURL: 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book/the_9_books',
    endpoints: {
      bukhari: '/bukhari.json',
      muslim: '/muslim.json',
      abudawud: '/abudawud.json',
      tirmidhi: '/tirmidhi.json',
      nasai: '/nasai.json',
      ibnmajah: '/ibnmajah.json',
    },
    keyRequired: false,
  },
  aladhan: {
    name: 'Aladhan API',
    baseURL: 'https://api.aladhan.com/v1',
    endpoints: {
      timings: '/timings/{date}?latitude={lat}&longitude={lng}&method={method}',
      calendar: '/calendar/{month}/{year}?latitude={lat}&longitude={lng}',
      qibla: '/qibla/{lat}/{lng}',
      gToH: '/gToH/{date}',
      hToG: '/hToG/{date}',
    },
    keyRequired: false,
  },
};

const BASE_CATEGORY_COUNTS = {
  quran: 3000,
  hadith: 2500,
  fiqh: 2000,
  aqidah: 1500,
  seerah: 1000,
  history: 500,
  edge: 1000,
};

const QURAN_TOPICS = [
  'Allah', 'Prophet Muhammad', 'angels', 'holy books', 'day of judgment',
  'paradise', 'hell', 'patience', 'prayer', 'fasting', 'zakat', 'hajj',
  'charity', 'honesty', 'justice', 'mercy', 'forgiveness', 'repentance',
  'gratitude', 'trust', 'sincerity', 'humility', 'parents', 'orphans',
  'poor', 'knowledge', 'wisdom', 'death', 'wealth', 'business ethics',
  'marriage', 'divorce', 'inheritance', 'cleanliness', 'modesty',
  'peace', 'reconciliation', 'community', 'leadership', 'rights',
  'responsibilities', 'creation', 'morality', 'speech', 'reflection',
  'quran recitation', 'memorization', 'night prayer', 'dhikr', 'dua',
  'ramadan', 'umrah', 'sacrifice',
];

const FIQH_TOPICS = [
  'purification', 'wudu', 'ghusl', 'tayammum', 'menstruation',
  'prayer times', 'adhan', 'iqamah', 'salah conditions', 'salah pillars',
  'congregational prayer', 'friday prayer', 'eid prayer', 'funeral prayer',
  'voluntary prayers', 'fasting conditions', 'ramadan', 'zakat calculation',
  'zakat recipients', 'hajj pillars', 'hajj types', 'umrah', 'sacrifice',
  'aqiqah', 'marriage contract', 'divorce types', 'iddah', 'inheritance shares',
  'business transactions', 'leasing', 'insurance', 'food regulations',
  'slaughtering', 'clothing', 'medical treatment', 'funeral rites',
];

const AQIDAH_TOPICS = [
  'tawheed', 'shirk', 'rububiyyah', 'uluhiyyah', 'asma was-sifaat',
  'faith', 'iman', 'kufr', 'nifaq', 'qadar', 'predestination',
  'prophethood', 'miracles', 'angels', 'jinn', 'heaven', 'hell',
  'grave punishment', 'resurrection', 'reckoning', 'intercession',
  'companions', 'ahl al-bayt', 'ummah', 'unity', 'innovation',
  'ijtihad', 'taqlid', 'consensus', 'analogy',
];

const SEERAH_TOPICS = [
  'birth', 'childhood', 'revelation', 'first Muslims', 'persecution',
  'migration to Abyssinia', 'isra and miraj', 'migration to Medina',
  'constitution of Medina', 'battles', 'treaties', 'conquest of Mecca',
  'farewell pilgrimage', 'death', 'character', 'family', 'companions',
  'justice', 'mercy', 'leadership', 'teaching methods', 'social reforms',
];

const HISTORY_EVENTS = [
  'Rightly Guided Caliphs', 'Battle of Badr', 'Battle of Uhud',
  'Battle of the Trench', 'Treaty of Hudaybiyyah', 'Conquest of Mecca',
  'Year of the Elephant', 'First Revelation', 'Migration to Medina',
  'Year of Sorrow', 'Night Journey', 'Farewell Pilgrimage',
  'Early Muslim Community', 'Spread of Islam', 'Islamic Golden Age',
  'Muslim Spain', 'Ottoman Empire', 'Mughal Empire', 'Abbasid Caliphate',
  'Umayyad Caliphate', 'Companions of the Prophet', 'Mothers of the Believers',
];

const MODERN_TOPICS = [
  'cryptocurrency', 'online trading', 'stock market', 'insurance', 'banking',
  'loans', 'mortgages', 'organ donation', 'euthanasia', 'abortion',
  'social media', 'online privacy', 'AI ethics', 'online business',
  'e-commerce', 'vaccines', 'mental health', 'climate change',
  'political participation', 'voting', 'interfaith marriage',
  'modern fashion', 'cosmetic surgery', 'music', 'movies', 'games',
  'sports betting', 'yoga', 'meditation',
];

const QURAN_TEMPLATES = [
  'What does the Quran say about {topic}?',
  'Find Quran verses about {topic}.',
  'How does the Quran address {topic}?',
  'Mention Quranic verses on {topic}.',
  'Explain the Quranic view on {topic}.',
];

const HADITH_TEMPLATES = [
  'Hadith about {topic}.',
  'Authentic hadith regarding {topic}.',
  'What did Prophet Muhammad say about {topic}?',
  'Find hadith on {topic}.',
  'Prophetic guidance on {topic}.',
];

const FIQH_TEMPLATES = [
  'How to perform {act}?',
  'Rules of {act}.',
  'Conditions for {act}.',
  'What invalidates {act}?',
  'Explain {act} in Islam.',
];

const AQIDAH_TEMPLATES = [
  'What is {concept} in Islam?',
  'Explain {concept}.',
  'Islamic belief about {concept}.',
  'Evidence for {concept}.',
  'Importance of {concept}.',
];

const SEERAH_TEMPLATES = [
  'Tell me about {event}.',
  'What happened during {event}?',
  'Explain {event} in the Prophet life.',
  'Significance of {event}.',
  'Lessons from {event}.',
];

const EDGE_TEMPLATES = [
  {
    question: 'Is {topic} halal or haram?',
    type: 'modern',
    expected: 'defer',
    keywords: ['consult', 'scholar', 'context'],
  },
  {
    question: 'Islamic ruling on {topic}.',
    type: 'modern',
    expected: 'multi-source',
    keywords: ['scholars', 'differ', 'opinions'],
  },
  {
    question: 'How to handle {topic} as a Muslim?',
    type: 'modern',
    expected: 'principles',
    keywords: ['islamic principles', 'ethics', 'values'],
  },
  {
    question: 'Specific ruling for my situation: {topic}.',
    type: 'defer',
    expected: 'defer',
    keywords: ['personal', 'consult', 'qualified'],
  },
  {
    question: 'Is my {topic} valid?',
    type: 'defer',
    expected: 'defer',
    keywords: ['specific', 'consult', 'scholar'],
  },
  {
    question: 'Predict {topic} using Islamic texts.',
    type: 'reject',
    expected: 'reject',
    keywords: ['forbidden', 'unknown', 'Allah'],
  },
  {
    question: 'Give me a fatwa about {topic}.',
    type: 'reject',
    expected: 'reject',
    keywords: ['fatwa', 'scholar', 'qualified'],
  },
];

export class IslamicQuestionGenerator {
  constructor() {
    this.baseCategoryCounts = { ...BASE_CATEGORY_COUNTS };
  }

  generateQuestions(count = DEFAULT_QUESTION_COUNT) {
    const target = Number.isFinite(count) && count > 0 ? Math.floor(count) : DEFAULT_QUESTION_COUNT;
    const categories = this.scaleCategoryCounts(target);
    const questions = [];
    const idCounter = { value: 1 };

    this.addQuranQuestions(questions, categories.quran, idCounter);
    this.addHadithQuestions(questions, categories.hadith, idCounter);
    this.addFiqhQuestions(questions, categories.fiqh, idCounter);
    this.addAqidahQuestions(questions, categories.aqidah, idCounter);
    this.addSeerahQuestions(questions, categories.seerah, idCounter);
    this.addHistoryQuestions(questions, categories.history, idCounter);
    this.addEdgeCaseQuestions(questions, categories.edge);

    const shuffled = this.shuffleArray(questions);
    return shuffled.slice(0, target);
  }

  scaleCategoryCounts(targetCount) {
    const sourceTotal = Object.values(this.baseCategoryCounts).reduce((sum, value) => sum + value, 0);
    const entries = Object.entries(this.baseCategoryCounts);
    const scaled = {};
    let allocated = 0;

    entries.forEach(([name, baseCount], index) => {
      if (index === entries.length - 1) {
        scaled[name] = Math.max(0, targetCount - allocated);
      } else {
        const count = Math.floor((baseCount / sourceTotal) * targetCount);
        scaled[name] = count;
        allocated += count;
      }
    });

    return scaled;
  }

  addQuranQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(QURAN_TOPICS);
      const template = this.getRandomItem(QURAN_TEMPLATES);
      const difficulty = this.getRandomDifficulty();

      questions.push({
        id: `Q${String(idCounter.value).padStart(5, '0')}`,
        category: 'quran',
        subcategory: this.getQuranSubcategory(topic),
        question: template.replace('{topic}', topic),
        difficulty,
        expectedSources: ['quran'],
        minVerses: difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3,
        verificationLevel: 'high',
        tags: [topic, 'quran', this.getRandomEdition()],
        metadata: {
          createdAt: new Date().toISOString(),
          priority: this.getPriority(difficulty),
        },
      });
      idCounter.value += 1;
    }
  }

  addHadithQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(QURAN_TOPICS);
      const template = this.getRandomItem(HADITH_TEMPLATES);
      const collection = this.getRandomCollection();
      const difficulty = this.getRandomDifficulty();

      questions.push({
        id: `H${String(idCounter.value).padStart(5, '0')}`,
        category: 'hadith',
        subcategory: collection,
        question: template.replace('{topic}', topic),
        difficulty,
        expectedSources: ['hadith'],
        requiredCollection: collection,
        minHadiths: 1,
        verificationLevel: 'high',
        tags: [topic, 'hadith', collection],
        metadata: {
          grade: this.getRandomGrade(),
          collection,
        },
      });
      idCounter.value += 1;
    }
  }

  addFiqhQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(FIQH_TOPICS);
      const template = this.getRandomItem(FIQH_TEMPLATES);
      const school = this.getRandomSchool();

      questions.push({
        id: `F${String(idCounter.value).padStart(5, '0')}`,
        category: 'fiqh',
        subcategory: topic,
        question: template.replace('{act}', topic),
        difficulty: 'medium',
        expectedSources: ['quran', 'hadith'],
        schoolOfThought: school,
        requiresStepByStep: true,
        verificationLevel: 'medium',
        tags: [topic, 'fiqh', school],
        metadata: {
          school,
          requiresConditions: true,
        },
      });
      idCounter.value += 1;
    }
  }

  addAqidahQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(AQIDAH_TOPICS);
      const template = this.getRandomItem(AQIDAH_TEMPLATES);

      questions.push({
        id: `A${String(idCounter.value).padStart(5, '0')}`,
        category: 'aqidah',
        subcategory: 'creed',
        question: template.replace('{concept}', topic),
        difficulty: 'medium',
        expectedSources: ['quran', 'hadith'],
        expectedComponents: this.getExpectedComponents(topic),
        verificationLevel: 'high',
        tags: [topic, 'aqidah', 'creed'],
        metadata: {
          coreBelief: true,
          requiresEvidence: true,
        },
      });
      idCounter.value += 1;
    }
  }

  addSeerahQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const topic = this.getRandomItem(SEERAH_TOPICS);
      const template = this.getRandomItem(SEERAH_TEMPLATES);

      questions.push({
        id: `S${String(idCounter.value).padStart(5, '0')}`,
        category: 'seerah',
        subcategory: 'prophetic_life',
        question: template.replace('{event}', topic),
        difficulty: 'easy',
        expectedSources: ['seerah', 'history'],
        verificationLevel: 'medium',
        tags: [topic, 'seerah', 'prophet'],
        metadata: {
          historical: true,
          requiresContext: true,
        },
      });
      idCounter.value += 1;
    }
  }

  addHistoryQuestions(questions, count, idCounter) {
    for (let i = 0; i < count; i += 1) {
      const event = this.getRandomItem(HISTORY_EVENTS);
      const difficulty = this.getRandomDifficulty();
      questions.push({
        id: `R${String(idCounter.value).padStart(5, '0')}`,
        category: 'history',
        subcategory: 'islamic_history',
        question: `Tell me about ${event}.`,
        difficulty,
        expectedSources: ['history', 'seerah'],
        verificationLevel: 'medium',
        tags: [event.toLowerCase().replace(/\s+/g, '_'), 'history'],
        metadata: {
          historicalPeriod: this.getHistoricalPeriod(event),
          requiresDates: true,
        },
      });
      idCounter.value += 1;
    }
  }

  addEdgeCaseQuestions(questions, count) {
    for (let i = 0; i < count; i += 1) {
      const template = this.getRandomItem(EDGE_TEMPLATES);
      const topic = this.getRandomItem(MODERN_TOPICS);
      questions.push({
        id: `E${String(i + 1).padStart(5, '0')}`,
        category: 'edge_case',
        subcategory: template.type,
        question: template.question.replace('{topic}', topic),
        difficulty: 'hard',
        expectedResponse: template.expected,
        expectedKeywords: template.keywords,
        verificationLevel: 'requires_human',
        tags: [topic, 'modern', 'contemporary'],
        metadata: {
          requiresScholarlyInput: true,
          cautionLevel: 'high',
        },
      });
    }
  }

  getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  getRandomDifficulty() {
    const random = Math.random();
    if (random < 0.6) return 'easy';
    if (random < 0.9) return 'medium';
    return 'hard';
  }

  getRandomCollection() {
    const collections = ['bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah'];
    return this.getRandomItem(collections);
  }

  getRandomSchool() {
    const schools = ['hanafi', 'shafi', 'maliki', 'hanbali'];
    return this.getRandomItem(schools);
  }

  getRandomEdition() {
    const editions = ['quran-uthmani', 'quran-simple', 'en.sahih', 'en.pickthall', 'en.yusufali'];
    return this.getRandomItem(editions);
  }

  getRandomGrade() {
    const grades = ['sahih', 'hasan', 'daif'];
    return this.getRandomItem(grades);
  }

  getQuranSubcategory(topic) {
    const themes = {
      allah: 'divinity',
      prayer: 'worship',
      charity: 'social',
      justice: 'ethics',
      knowledge: 'education',
      patience: 'character',
    };
    return themes[String(topic || '').toLowerCase()] || 'general';
  }

  getExpectedComponents(topic) {
    const components = {
      tawheed: ['rububiyyah', 'uluhiyyah', 'asma was-sifaat'],
      iman: ['Allah', 'angels', 'books', 'prophets', 'day of judgment', 'qadar'],
      prophethood: ['messengers', 'miracles', 'infallibility', 'finality'],
    };
    return components[String(topic || '').toLowerCase()] || [];
  }

  getHistoricalPeriod(event) {
    const periods = {
      'Rightly Guided Caliphs': '632-661 CE',
      'Battle of Badr': '624 CE',
      'Conquest of Mecca': '630 CE',
      'Islamic Golden Age': '8th-14th century',
    };
    return periods[event] || 'Various';
  }

  getPriority(difficulty) {
    const priorities = { easy: 1, medium: 2, hard: 3 };
    return priorities[difficulty] || 2;
  }

  shuffleArray(array) {
    const cloned = [...array];
    for (let i = cloned.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
  }
}

export function chunkQuestionBatches(questions, batchSize = DEFAULT_BATCH_SIZE) {
  if (!Array.isArray(questions) || !questions.length) {
    return [];
  }
  const normalizedBatchSize = Math.max(1, Number(batchSize) || DEFAULT_BATCH_SIZE);
  const batches = [];
  for (let i = 0; i < questions.length; i += normalizedBatchSize) {
    batches.push(questions.slice(i, i + normalizedBatchSize));
  }
  return batches;
}

export function loadQuestionBankFromStorage(storage = null) {
  if (!storage) {
    return [];
  }
  try {
    const parsed = JSON.parse(storage.getItem(QUESTION_BANK_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function saveQuestionBankToStorage(questions, storage = null) {
  if (!storage) {
    return false;
  }
  try {
    storage.setItem(QUESTION_BANK_STORAGE_KEY, JSON.stringify(questions));
    storage.setItem(
      QUESTION_BANK_META_STORAGE_KEY,
      JSON.stringify({
        count: Array.isArray(questions) ? questions.length : 0,
        generatedAt: new Date().toISOString(),
      }),
    );
    return true;
  } catch (error) {
    return false;
  }
}

export function ensureQuestionBank({
  generator,
  count = DEFAULT_QUESTION_COUNT,
  storage = null,
} = {}) {
  if (!generator || typeof generator.generateQuestions !== 'function') {
    return [];
  }
  const existing = loadQuestionBankFromStorage(storage);
  if (existing.length >= count) {
    return existing;
  }
  const questions = generator.generateQuestions(count);
  saveQuestionBankToStorage(questions, storage);
  return questions;
}
