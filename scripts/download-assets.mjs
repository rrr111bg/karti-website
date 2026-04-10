#!/usr/bin/env node
// Downloads Solluna homepage assets into /public. Viewport-only constraint:
// requests each image at width=1440 so nothing exceeds 2000px on either side.
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

const ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const PUB_IMG = path.join(ROOT, 'public/images');
const PUB_VID = path.join(ROOT, 'public/videos');
const PUB_SEO = path.join(ROOT, 'public/seo');
for (const d of [PUB_IMG, PUB_VID, PUB_SEO]) fs.mkdirSync(d, { recursive: true });

// Raw image URL stems (Shopify CDN); we cap width at 1440 in the request.
const IMAGES = [
  'Solluna_Detoxy_pdp.jpg',
  'Kimberly-Hidden-Power.jpg',
  'Feel_Good_Podcast_with_Kimberly_Snyder_New_Art.png',
  'Practical-Enlightenment-Meditation.jpg',
  'Recipes.jpg',
  'Desktop-Logo-New.svg',
  'Four-Cornerstones_27bd0338-903c-4348-85c0-a87da68bddd3.png',
  'Food.png',
  'Body.png',
  'Spiritual_Growth.png',
  'Emotional-Wellbeing.png',
  'Icon-1.svg', 'Icon-2.svg', 'Icon-3.svg', 'Icon-4.svg',
  'Icon-5.svg', 'Icon-6.svg', 'Icon-7.svg',
  'New_Detoxy_Collections.png',
  'Digestive_Enzyme_Shopify_Images.png',
  'Feel_Good_Starter.png',
  'Glowing_Greens_Powder.png',
  'gut-health-main.png',
  'Detox_NourishBundle.png',
  'Detoxy_2026_New_Look_and_Previous_Look_Side_By_Side.png',
  'Resized-SBO-Bottle.png',
  'Solluna_Probiotics_33dc5035-4145-4eeb-bef7-3f9ff18f9562.png',
  'Carrot.jpg',
  'Ellipse_58-min.png',
  'Our-Story-Kimberly.jpg',
  'Our-Story-2.jpg',
  'Hidden-Power-Five-Hearts.jpg',
  'kimberly-snyder-book-chilla-gorilla-flat-cover_1.jpg',
  'Kimberly-Speaking-at-Five-Hearts-Launch-Party-copy.webp',
  'nyt-bestseller-badge_1-min.png',
  'Rectangle_3320-min.jpg', 'Rectangle_3321-min.jpg', 'Rectangle_3322-min.jpg',
  'Rectangle_3323-min.jpg', 'Rectangle_3324-min.jpg', 'Rectangle_3325-min.jpg',
  'Rectangle_3326-min.jpg', 'Rectangle_3327-min.jpg',
  'Main-Icon-New.png',
  'Footer-Logo-New.svg',
  'Solluna-Glowing-Greens-Powder.jpg',
  'Solluna-Header-Kimberly-Snyder.jpg',
  'Glowing-Greens-Powder-Product.jpg',
  'Kimberly-GGP.jpg',
  'Kimberly-GGP-1.jpg',
];

const ARTICLES = [
  'glowing-greens-powder_E2_84_A2-smoothie-recipe-2160-x-2160-2-e1758815004169_52a0f31f-26ab-4106-ba85-24fb35ce1c38.png',
  'vitality-life-force-smoothie_ed1331bc-d781-441d-9071-93c05ebf41f3.png',
  'super-greens-peppermint-patties-1_487e10dd-ae1c-49f0-9554-dadf75c0a8c7.png',
  'glowing-greens-powder_C2_AE-smoothie-recipe-2160-x-2160--e1730309612631.png',
  'bigstock-Healthy-Weight-2210408_ff629641-a573-410b-b99d-15582e303a06.jpg',
  '1033_1a918e72-a388-402e-b5d0-03e00e20669f.jpg',
  'Cortisol.png',
  'A-colorful-presentation-of-healthy-fermented-foods-on-a-table_square-scaled-e1753285786435.jpg',
];

const SEO = [
  { name: 'favicon.png', url: 'https://mysolluna.com/cdn/shop/files/favicon-solluna_88d888be-240a-4ddf-b364-ddbdf57c43d5.png?crop=center&height=32&v=1770421836&width=32' },
];

const VIDEOS = [
  { name: 'hero-overlay.mp4', url: 'https://mysolluna.com/cdn/shop/videos/c/vp/f7d2a67957ce42b0bc7c344c9e294e7b/f7d2a67957ce42b0bc7c344c9e294e7b.HD-1080p-4.8Mbps-33845355.mp4?v=0' },
];

const cdn = (name, articles = false) => {
  const cap = 1440;
  const ext = name.split('.').pop().toLowerCase();
  const passthroughExts = new Set(['svg', 'gif']);
  const base = articles ? 'articles' : 'files';
  if (passthroughExts.has(ext)) return `https://mysolluna.com/cdn/shop/${base}/${name}`;
  return `https://mysolluna.com/cdn/shop/${base}/${name}?width=${cap}`;
};

async function download(url, destPath) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 Clone/1.0' } });
    if (!res.ok) {
      console.warn(`! ${res.status} ${url}`);
      return false;
    }
    await pipeline(res.body, fs.createWriteStream(destPath));
    console.log(`\u2713 ${path.basename(destPath)}`);
    return true;
  } catch (e) {
    console.warn(`! error ${url}: ${e.message}`);
    return false;
  }
}

async function batch(items, concurrency = 4) {
  const queue = [...items];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const item = queue.shift();
      if (!item) break;
      await download(item.url, item.dest);
    }
  });
  await Promise.all(workers);
}

const tasks = [];
for (const name of IMAGES) tasks.push({ url: cdn(name), dest: path.join(PUB_IMG, name) });
for (const name of ARTICLES) tasks.push({ url: cdn(name, true), dest: path.join(PUB_IMG, name) });
for (const { name, url } of SEO) tasks.push({ url, dest: path.join(PUB_SEO, name) });
for (const { name, url } of VIDEOS) tasks.push({ url, dest: path.join(PUB_VID, name) });

await batch(tasks, 6);
console.log(`done. ${tasks.length} files attempted.`);
