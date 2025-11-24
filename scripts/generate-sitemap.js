const fs = require('fs');
const path = require('path');
const duas = require('../build/duas');

const base = 'https://islamicconnect.com';
const urls = duas.map(d => `${base}/dua/${d.slug}/`);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`;

const outputDir = path.join(__dirname, '..', 'dist');
fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf8');
console.log(`sitemap.xml written to ${outputPath}`);
