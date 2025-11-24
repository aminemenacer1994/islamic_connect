const MAX_META_DESCRIPTION_LENGTH = 155;
const DEFAULT_META_TITLE_SUFFIX = ' · Islamic Connect Dua';

const slugify = value => {
  if (!value) return '';
  return value
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const normalizeDescription = (value = '', fallback = '') => {
  const normalized = (value || fallback)
    .toString()
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized) {
    return fallback;
  }
  if (normalized.length <= MAX_META_DESCRIPTION_LENGTH) {
    return normalized;
  }
  return `${normalized.slice(0, MAX_META_DESCRIPTION_LENGTH - 3)}...`;
};

const escapeAttribute = value => (value || '').toString().replace(/"/g, '&quot;');

const createDuaMetadata = (collection = {}, options = {}) => {
  const {
    metaTitleSuffix = DEFAULT_META_TITLE_SUFFIX,
    metaDescriptionFallback = 'Discover Islamic duas with Arabic, transliteration, and translation.',
    assignSlugToDua = false,
    defaultOgImage = 'https://islamicconnect.com/images/banner-photo-1200.webp',
  } = options;
  const categories = Array.isArray(collection.categories) ? collection.categories : [];
  const usedSlugs = new Set();
  const metadata = [];

  categories.forEach(category => {
    const categoryId = category.id;
    const categoryName = category.name || 'Islamic Dua';
    (Array.isArray(category.duas) ? category.duas : []).forEach((dua, index) => {
      const rawId = dua.originalId ?? dua.id ?? index + 1;
      const base = dua.title || dua.translation || dua.arabic || categoryName;
      const candidate = slugify(base) || `dua-${categoryId}-${rawId}`;
      let slug = candidate;
      let suffix = 1;
      while (usedSlugs.has(slug)) {
        suffix += 1;
        slug = `${candidate}-${suffix}`;
      }
      usedSlugs.add(slug);

      const reference = dua.reference || categoryName;
      const descriptionParts = [dua.translation, dua.arabic, reference].filter(Boolean);
      let metaDescription = normalizeDescription(descriptionParts.join(' · '), metaDescriptionFallback);
      if (!metaDescription) {
        metaDescription = metaDescriptionFallback;
      }

      const metaTitle = escapeAttribute(`${base}${metaTitleSuffix}`);

      if (assignSlugToDua && typeof dua === 'object') {
        dua.slug = slug;
      }

      const ogImage = dua.ogImage || defaultOgImage;
      metadata.push({
        slug,
        title: base,
        metaTitle,
        metaDescription: escapeAttribute(metaDescription),
        categoryId,
        categoryName,
        duaId: rawId,
        reference,
        ogImage,
        ogImageAlt: dua.ogImageAlt || `${base} Dua`,
      });
    });
  });

  return metadata;
};

module.exports = {
  slugify,
  createDuaMetadata,
};
