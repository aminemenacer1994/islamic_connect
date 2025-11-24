const fs = require('fs');
const path = require('path');
const { createDuaMetadata } = require('../resources/js/utils/duaSlugs');

const duaCollection = require('../resources/js/duaCollection.json');
const metadata = createDuaMetadata({ categories: duaCollection.categories || [] }, {
  assignSlugToDua: false,
});

const siteUrl = (process.env.SITE_URL || 'https://islamicconnect.com').replace(/\/$/, '');
const lastmod = new Date().toISOString().split('T')[0];

const urls = metadata.map(entry => `
  <url>
    <loc>${siteUrl}/dua/${entry.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.65</priority>
  </url>
`).join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const sitemapPath = path.resolve(__dirname, '../public/sitemap-dua-pages.xml');
fs.writeFileSync(sitemapPath, xml.trim() + '\n', 'utf8');
console.log(`✅ Generated sitemap for ${metadata.length} duas at ${sitemapPath}`);
