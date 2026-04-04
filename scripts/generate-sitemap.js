import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const DOMAIN = 'https://prashant.sh';

function extractSlugs(dir, prefix) {
  const mdDir = path.join(rootDir, 'src', 'data', dir);
  if (!fs.existsSync(mdDir)) return [];
  return fs.readdirSync(mdDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const content = fs.readFileSync(path.join(mdDir, f), 'utf-8');
      const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)/);
      const slug = slugMatch ? slugMatch[1].trim() : f.replace('.md', '');
      return `${DOMAIN}/${prefix}/${slug}`;
    });
}

const staticPages = [
  { url: `${DOMAIN}/`, priority: '1.0', changefreq: 'weekly' },
  { url: `${DOMAIN}/blog`, priority: '0.8', changefreq: 'weekly' },
  { url: `${DOMAIN}/projects`, priority: '0.8', changefreq: 'monthly' },
  { url: `${DOMAIN}/papers`, priority: '0.8', changefreq: 'monthly' },
];

const blogUrls = extractSlugs('blog', 'blog').map(url => ({ url, priority: '0.6', changefreq: 'monthly' }));
const projectUrls = extractSlugs('projects', 'projects').map(url => ({ url, priority: '0.6', changefreq: 'monthly' }));
const paperUrls = extractSlugs('papers', 'papers').map(url => ({ url, priority: '0.6', changefreq: 'yearly' }));

const allUrls = [...staticPages, ...blogUrls, ...projectUrls, ...paperUrls];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, priority, changefreq }) => `  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(outPath, sitemap);
console.log(`Sitemap generated: ${allUrls.length} URLs → ${outPath}`);
