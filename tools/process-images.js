const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../assets/img/source');
const outDir = path.join(__dirname, '../assets/img');

const dishes = [
  { in: 'plat-agneau-orig.jpg', out: 'plat-agneau', widths: [700, 1200], quality: 72 },
  { in: 'plat-canard-orig.jpg', out: 'plat-canard', widths: [700, 1200], quality: 72 },
  { in: 'entree-cepe-orig.jpg', out: 'entree-cepe', widths: [700, 1200], quality: 72 },
  { in: 'dessert-chocolat-orig.jpg', out: 'dessert-chocolat', widths: [700, 1200], quality: 72 },
  { in: 'plat-volaille-orig.jpg', out: 'plat-volaille', widths: [700, 1200], quality: 72 },
  { in: 'plat-veau-orig.jpg', out: 'plat-veau', widths: [700, 1000], quality: 72 },
  { in: 'plat-bar-orig.jpg', out: 'plat-bar', widths: [700, 1200], quality: 72 },
  { in: 'plat-pintade-orig.jpg', out: 'plat-pintade', widths: [700, 1200], quality: 72 },
  { in: 'entree-foiegras-orig.jpg', out: 'entree-foiegras', widths: [700, 1200], quality: 72 },
  { in: 'dessert-coco-orig.jpg', out: 'dessert-coco', widths: [700, 1200], quality: 72 },
  { in: 'entree-panais-orig.jpg', out: 'entree-panais', widths: [700, 1200], quality: 72 },
  { in: 'dessert-ananas-orig.jpg', out: 'dessert-ananas', widths: [700, 1000], quality: 72 },
  { in: 'plat-tourteau-orig.jpg', out: 'plat-tourteau', widths: [700, 1000], quality: 72 },
  { in: 'plat-boeuf-orig.jpg', out: 'plat-boeuf', widths: [700, 1000], quality: 72 },
  { in: 'plat-tatin-canard-orig.jpg', out: 'plat-tatin-canard', widths: [700, 1200], quality: 72 },
  { in: 'cocktail-mangue-orig.jpg', out: 'cocktail-mangue', widths: [700, 1200], quality: 72 },
  { in: 'cocktail-gambas-orig.jpg', out: 'cocktail-gambas', widths: [700, 1000], quality: 72 },
  { in: 'cocktail-stjacques-orig.jpg', out: 'cocktail-stjacques', widths: [700, 1000], quality: 72 },
  { in: 'cocktail-tatin-orig.jpg', out: 'cocktail-tatin', widths: [700, 1200], quality: 70 },
  { in: 'cocktail-betterave-orig.jpg', out: 'cocktail-betterave', widths: [700, 1200], quality: 72 },
  { in: 'cocktail-croque-orig.jpg', out: 'cocktail-croque', widths: [700, 1200], quality: 72 },
  { in: 'cocktail-sable-orig.jpg', out: 'cocktail-sable', widths: [700, 1200], quality: 72 },
  { in: 'plateau-repas-orig.jpg', out: 'plateau-repas', widths: [700, 1200], quality: 72 },
  { in: 'cocktail-samoussas-orig.jpg', out: 'cocktail-samoussas', widths: [700, 1200], quality: 72 },
  { in: 'cocktail-oeuf-orig.jpg', out: 'cocktail-oeuf', widths: [700, 1200], quality: 72 },
];

async function run() {
  for (const job of dishes) {
    const inputPath = path.join(srcDir, job.in);
    if (!fs.existsSync(inputPath)) { console.log('SKIP missing', job.in); continue; }
    for (const w of job.widths) {
      const outPath = path.join(outDir, `${job.out}-${w}.webp`);
      await sharp(inputPath).resize({ width: w }).webp({ quality: job.quality }).toFile(outPath);
      console.log('wrote', outPath);
    }
  }

  // Hero — dark carrot/heirloom tomato editorial shot, wide crop
  for (const w of [900, 1600, 2400]) {
    await sharp(path.join(srcDir, 'chef-photo-wide.png')).resize({ width: w }).webp({ quality: 68 }).toFile(path.join(outDir, `hero-${w}.webp`));
    console.log('wrote hero-' + w + '.webp');
  }

  // About / atelier photo
  for (const w of [600, 900]) {
    await sharp(path.join(srcDir, 'cooking.jpg')).resize({ width: w }).webp({ quality: 78 }).toFile(path.join(outDir, `atelier-${w}.webp`));
    console.log('wrote atelier-' + w + '.webp');
  }

  // Logo
  await sharp(path.join(srcDir, 'logo.png')).resize({ width: 260 }).png({ quality: 90 }).toFile(path.join(outDir, 'logo.png'));
  console.log('wrote logo.png');
}

run().catch(e => { console.error(e); process.exit(1); });
