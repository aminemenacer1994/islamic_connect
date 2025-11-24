const { createDuaMetadata } = require('../resources/js/utils/duaSlugs');
const duaCollection = require('../resources/js/duaCollection.json');

const metadata = createDuaMetadata(
  { categories: duaCollection.categories || [] },
  { assignSlugToDua: false }
);

module.exports = metadata.map(entry => ({
  slug: entry.slug,
  title: entry.metaTitle,
  description: entry.metaDescription,
  articleTitle: entry.title,
  canonical: `https://islamicconnect.com/dua/${entry.slug}/`,
  ogImage: entry.ogImage,
  ogImageAlt: entry.ogImageAlt,
  reference: entry.reference,
}));
