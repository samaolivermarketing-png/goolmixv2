const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');

const images = [
    { name: 'concretoconvencional.jpeg', maxWidth: 1200 },
    { name: 'hero.png', maxWidth: 1920 },
    { name: 'responsabilidade.jpg', maxWidth: 1200 },
    { name: 'bomba.jpg', maxWidth: 1200 },
    { name: 'GoolMixConcreto.png', maxWidth: 500 }
];

async function compress() {
    console.log(`Assets directory: ${assetsDir}`);
    for (const img of images) {
        const inputPath = path.join(assetsDir, img.name);
        if (!fs.existsSync(inputPath)) {
            console.log(`Skipping ${img.name} - not found`);
            continue;
        }

        const ext = path.extname(img.name);
        const baseName = path.basename(img.name, ext);
        const outputPath = path.join(assetsDir, `${baseName}.webp`);

        console.log(`Compressing ${img.name} -> ${baseName}.webp...`);
        try {
            const info = await sharp(inputPath)
                .resize({ width: img.maxWidth, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(outputPath);

            const oldSize = fs.statSync(inputPath).size / 1024 / 1024;
            const newSize = info.size / 1024 / 1024;
            console.log(`Done! ${img.name}: ${oldSize.toFixed(2)}MB -> ${newSize.toFixed(2)}MB (${info.width}x${info.height})`);
        } catch (err) {
            console.error(`Error compressing ${img.name}:`, err);
        }
    }
}

compress();
