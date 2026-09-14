/**
 * Production SEO & AEO Build-Time Validator
 * Validates canonical URLs, title lengths, meta descriptions, OpenGraph,
 * Twitter Cards, single H1 rule, image alt attributes, Schema.org JSON-LD,
 * robots.txt, and sitemap.xml.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('Running Production SEO & AEO Validation...\n');

let errorCount = 0;
let warningCount = 0;

function pass(msg) {
  console.log(`PASS: ${msg}`);
}

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  errorCount++;
}

function warn(msg) {
  console.warn(`WARN: ${msg}`);
  warningCount++;
}

// 1. Inspect HTML File (Check dist first, then root)
const htmlPath = fs.existsSync(path.join(rootDir, 'dist', 'index.html'))
  ? path.join(rootDir, 'dist', 'index.html')
  : path.join(rootDir, 'index.html');

if (!fs.existsSync(htmlPath)) {
  fail(`Target HTML file not found at ${htmlPath}`);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// 2. Title Tag Check
const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
if (!titleMatch || !titleMatch[1].trim()) {
  fail('Missing <title> tag in <head>');
} else {
  const title = titleMatch[1].trim();
  if (title.length >= 30 && title.length <= 65) {
    pass(`Title tag optimal (${title.length} chars): "${title}"`);
  } else {
    warn(`Title length is ${title.length} chars (recommended: 30-60 chars): "${title}"`);
  }
}

// 3. Meta Description Check
const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) ||
  html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
if (!descMatch || !descMatch[1].trim()) {
  fail('Missing <meta name="description"> tag');
} else {
  const desc = descMatch[1].trim();
  if (desc.length >= 100 && desc.length <= 170) {
    pass(`Meta description optimal (${desc.length} chars): "${desc.slice(0, 60)}..."`);
  } else {
    warn(`Meta description length is ${desc.length} chars (recommended: 110-160 chars)`);
  }
}

// 4. Canonical URL Check
const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
  html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
if (!canonicalMatch || !canonicalMatch[1].trim()) {
  fail('Missing canonical URL tag');
} else {
  const canonical = canonicalMatch[1].trim();
  if (canonical.startsWith('https://')) {
    pass(`Valid HTTPS canonical URL: ${canonical}`);
  } else {
    fail(`Canonical URL must use secure HTTPS: ${canonical}`);
  }
}

// 5. Robots Meta Tag Check
const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
if (!robotsMatch) {
  warn('Missing <meta name="robots"> tag');
} else {
  const robots = robotsMatch[1];
  if (robots.includes('index') && robots.includes('follow')) {
    pass(`Robots meta directives permit indexing: "${robots}"`);
  } else {
    fail(`Robots meta tag blocking indexing: "${robots}"`);
  }
}

// 6. Open Graph & Twitter Cards
const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
if (ogImage && ogImage[1].startsWith('https://')) {
  pass(`Absolute HTTPS OpenGraph image: ${ogImage[1]}`);
} else {
  fail('OpenGraph image missing or not an absolute HTTPS URL');
}

const twitterCard = html.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']*)["']/i);
if (twitterCard) {
  pass(`Twitter Card type declared: "${twitterCard[1]}"`);
} else {
  fail('Missing twitter:card meta tag');
}

// 7. Single H1 Rule
const h1Matches = html.match(/<h1[\s>]/gi) || [];
if (h1Matches.length === 1) {
  pass('Semantic Heading Hierarchy: Exactly one <h1> element present');
} else if (h1Matches.length === 0) {
  fail('No <h1> element found on page');
} else {
  fail(`Found ${h1Matches.length} <h1> elements (expected exactly 1)`);
}

// 8. Image Alt Attributes
const imgRegex = /<img\b([^>]*)>/gi;
let totalImgs = 0;
let missingAlt = 0;
let match;
while ((match = imgRegex.exec(html)) !== null) {
  totalImgs++;
  const attrs = match[1];
  if (!attrs.includes('alt=') || /alt=["']\s*["']/.test(attrs)) {
    missingAlt++;
  }
}

if (missingAlt === 0 && totalImgs > 0) {
  pass(`All ${totalImgs} images have valid alt text`);
} else if (missingAlt > 0) {
  fail(`${missingAlt} out of ${totalImgs} images missing descriptive alt text`);
}

// 9. Schema.org JSON-LD Verification
const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
let jsonLdFound = 0;
let jsonLdValid = 0;
while ((match = jsonLdRegex.exec(html)) !== null) {
  jsonLdFound++;
  try {
    const data = JSON.parse(match[1]);
    if (data['@context'] === 'https://schema.org') {
      jsonLdValid++;
      pass('Valid Schema.org JSON-LD structure detected');
    }
  } catch (err) {
    fail(`Invalid JSON in application/ld+json: ${err.message}`);
  }
}

if (jsonLdFound === 0) {
  fail('No Schema.org JSON-LD script found');
}

// 10. Check robots.txt
const robotsPath = fs.existsSync(path.join(rootDir, 'dist', 'robots.txt'))
  ? path.join(rootDir, 'dist', 'robots.txt')
  : path.join(rootDir, 'public', 'robots.txt');

if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf8');
  if (content.includes('Sitemap:') && content.includes('Allow: /')) {
    pass('Production robots.txt verified with Sitemap declaration');
  } else {
    fail('robots.txt missing Sitemap declaration or Allow directive');
  }
} else {
  fail('robots.txt does not exist in public or dist');
}

// 11. Check sitemap.xml
const sitemapPath = fs.existsSync(path.join(rootDir, 'dist', 'sitemap.xml'))
  ? path.join(rootDir, 'dist', 'sitemap.xml')
  : path.join(rootDir, 'public', 'sitemap.xml');

if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  if (content.includes('<loc>https://kalaiyazhagan.in/</loc>') && content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    pass('Production sitemap.xml verified with canonical URL');
  } else {
    fail('sitemap.xml missing canonical URL or proper XML namespace');
  }
} else {
  fail('sitemap.xml does not exist in public or dist');
}

console.log(`\n========================================`);
if (errorCount === 0) {
  console.log(` ALL SEO CHECKS PASSED (${warningCount} warnings)`);
  process.exit(0);
} else {
  console.error(`SEO VALIDATION FAILED WITH ${errorCount} ERRORS`);
  process.exit(1);
}
