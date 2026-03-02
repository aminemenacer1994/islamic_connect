import { ref } from 'vue';

const DEFAULT_TAGS = [
  'anxiety',
  'grief',
  'gratitude',
  'patience',
  'guidance',
  'stress',
  'fear',
  'loss',
  'hope',
  'forgiveness',
];

const EMOTION_MAP = {
  anxiety: [
    'anxious',
    'anxiety',
    'worried',
    'worry',
    'nervous',
    'panic',
    'restless',
    'uneasy',
    'overthinking',
  ],
  stress: [
    'stress',
    'stressed',
    'pressure',
    'overwhelmed',
    'burnout',
    'deadline',
    'exam',
    'exams',
    'workload',
    'hardship',
    'difficulty',
    'burden',
  ],
  fear: [
    'fear',
    'afraid',
    'scared',
    'frightened',
    'terrified',
    'unsafe',
    'danger',
  ],
  grief: [
    'grief',
    'grieving',
    'sad',
    'sorrow',
    'heartbroken',
    'depressed',
    'crying',
  ],
  loss: [
    'loss',
    'lost',
    'death',
    'passed away',
    'mourning',
    'bereavement',
  ],
  gratitude: [
    'grateful',
    'gratitude',
    'thankful',
    'blessed',
    'appreciate',
    'alhamdulillah',
  ],
  patience: ['patience', 'patient', 'sabr', 'endure', 'enduring', 'waiting'],
  guidance: ['guidance', 'guide', 'direction', 'hidayah', 'confused', 'uncertain'],
  hope: ['hope', 'hopeful', 'hopeless', 'despair', 'relief', 'optimistic'],
  forgiveness: ['forgive', 'forgiveness', 'repent', 'repentance', 'guilt', 'sin', 'mistake'],
};

const STOPWORDS = new Set([
  'i', 'im', "i'm", 'me', 'my', 'mine', 'we', 'our', 'you', 'your',
  'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'the', 'a', 'an', 'and', 'or', 'to', 'for', 'of', 'in', 'on', 'at', 'with', 'from', 'by',
  'it', 'this', 'that', 'these', 'those', 'very', 'really', 'just', 'lot', 'about',
]);

const TAG_CATEGORY_HINTS = {
  anxiety: ['protection', 'ease', 'distress', 'patience'],
  stress: ['ease', 'distress', 'patience', 'strength'],
  fear: ['protection', 'night', 'morning', 'evening'],
  grief: ['distress', 'patience', 'strength'],
  loss: ['patience', 'parents', 'distress'],
  gratitude: ['praising', 'joy', 'food', 'good etiquette'],
  patience: ['patience', 'strength', 'ease'],
  guidance: ['guidance', 'prayer', 'night', 'morning', 'evening'],
  hope: ['ease', 'guidance', 'forgiveness', 'strength'],
  forgiveness: ['forgiveness', 'night', 'prayer'],
};

function normalizeText(value = '') {
  return String(value || '').toLowerCase();
}

function unique(arr = []) {
  return Array.from(new Set(arr));
}

function flattenDuas(duaCollection = { categories: [] }) {
  const categories = Array.isArray(duaCollection?.categories) ? duaCollection.categories : [];
  const output = [];

  categories.forEach((category) => {
    (category.duas || []).forEach((dua, index) => {
      output.push({
        id: `${category.id || 'cat'}-${dua.id || index + 1}`,
        categoryId: category.id,
        categoryName: category.name || 'Dua Section',
        title: dua.title || '',
        arabic: dua.arabic || '',
        transliteration: dua.transliteration || '',
        translation: dua.translation || '',
        reference: dua.reference || '',
        tags: Array.isArray(dua.tags) ? dua.tags.map((tag) => normalizeText(tag)) : [],
      });
    });
  });

  return output;
}

function matchEmotionTags(input = '') {
  const text = normalizeText(input);
  const tags = new Set();

  if (!text.trim()) return [];

  Object.entries(EMOTION_MAP).forEach(([tag, words]) => {
    if (words.some((word) => text.includes(word))) {
      tags.add(tag);
    }
  });

  DEFAULT_TAGS.forEach((tag) => {
    if (text.includes(tag)) tags.add(tag);
  });

  if (!tags.size) {
    // Safe fallback for open-ended emotional prompts.
    tags.add('guidance');
    tags.add('hope');
  }

  return Array.from(tags);
}

function extractSearchTokens(input = '') {
  return unique(
    normalizeText(input)
      .replace(/[^a-z0-9\s']/g, ' ')
      .split(/\s+/)
      .map((w) => w.trim())
      .filter((w) => w.length >= 3 && !STOPWORDS.has(w))
  );
}

function scoreDua(dua, matchedTags, searchTokens) {
  if (!dua || !Array.isArray(dua.tags) || !dua.tags.length) {
    return { score: 0, tagHits: 0, keywordHits: 0, tokenHits: 0, categoryHits: 0 };
  }

  const text = normalizeText(
    `${dua.title || ''} ${dua.translation || ''} ${dua.reference || ''} ${dua.categoryName || ''}`
  );
  const category = normalizeText(dua.categoryName || '');
  const duaTags = new Set(dua.tags.map(normalizeText));

  let score = 0;
  let tagHits = 0;
  let keywordHits = 0;
  let tokenHits = 0;
  let categoryHits = 0;

  matchedTags.forEach((tag) => {
    if (duaTags.has(tag)) {
      tagHits += 1;
      score += 6;
    }
  });

  if (!tagHits) {
    return { score: 0, tagHits: 0, keywordHits: 0, tokenHits: 0, categoryHits: 0 };
  }

  // Boost if dua text itself uses emotion keywords.
  matchedTags.forEach((tag) => {
    const words = EMOTION_MAP[tag] || [];
    if (words.some((word) => text.includes(word))) {
      keywordHits += 1;
      score += 3;
    }
  });

  // Boost direct query-token overlaps.
  searchTokens.forEach((token) => {
    if (text.includes(token)) {
      tokenHits += 1;
      score += 2;
    }
  });

  // Light category hint boost.
  matchedTags.forEach((tag) => {
    const hints = TAG_CATEGORY_HINTS[tag] || [];
    if (hints.some((hint) => category.includes(hint))) {
      categoryHits += 1;
      score += 2;
    }
  });

  return { score, tagHits, keywordHits, tokenHits, categoryHits };
}

export function useDuaRecommender(duaCollection) {
  const matchedDuas = ref([]);
  const matchedKeywords = ref([]);
  const loading = ref(false);
  const error = ref('');

  const localDuas = flattenDuas(duaCollection);

  const clearResults = () => {
    matchedDuas.value = [];
    matchedKeywords.value = [];
    error.value = '';
  };

  const recommend = async (userInput = '') => {
    const text = String(userInput || '').trim();
    if (!text) {
      clearResults();
      error.value = 'Please describe how you feel to get recommendations.';
      return;
    }

    error.value = '';
    loading.value = true;

    try {
      const keywords = matchEmotionTags(text);
      matchedKeywords.value = keywords;
      const tokens = extractSearchTokens(text);

      let ranked = localDuas
        .map((dua) => {
          const metrics = scoreDua(dua, keywords, tokens);
          return {
            dua,
            ...metrics,
          };
        })
        .filter((entry) => entry.score > 0)
        .filter((entry) => {
          // Require extra evidence beyond broad tag-only matches.
          const hasSupportSignal = entry.keywordHits > 0 || entry.tokenHits > 0 || entry.categoryHits > 0;
          if (tokens.length >= 2) return hasSupportSignal;
          return hasSupportSignal || entry.tagHits >= 2;
        })
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          if (b.keywordHits !== a.keywordHits) return b.keywordHits - a.keywordHits;
          if (b.tokenHits !== a.tokenHits) return b.tokenHits - a.tokenHits;
          return a.dua.title.localeCompare(b.dua.title);
        });

      // Keep recommender focused on strongest matches only.
      const capped = ranked.slice(0, 8);
      matchedDuas.value = capped.map((entry) => entry.dua);

      if (!matchedDuas.value.length) {
        error.value = 'No recommendations found. Try another feeling or phrase.';
      }
    } catch (err) {
      error.value = err?.message || 'Unable to fetch recommendations right now.';
    } finally {
      loading.value = false;
    }
  };

  return {
    matchedDuas,
    matchedKeywords,
    loading,
    error,
    recommend,
    clearResults,
  };
}
