import sharp from 'sharp';
import { existsSync, unlinkSync, statSync } from 'fs';
import path from 'path';

const assetsDir = './src/assets';

const tasks = [
    // Comprimir a imagem ENORME de 8.7 MB → WebP de ~150 KB
    {
        input: `${assetsDir}/concretoconvencional.jpeg`,
        output: `${assetsDir}/concretoconvencional-opt.webp`,
        options: { width: 1200, quality: 75 },
        format: 'webp',
    },
    // Comprimir bomba.jpg → WebP
    {
        input: `${assetsDir}/bomba.jpg`,
        output: `${assetsDir}/bomba-opt.webp`,
        options: { width: 1200, quality: 75 },
        format: 'webp',
    },
    // Comprimir hero.jpg → WebP
    {
        input: `${assetsDir}/hero.jpg`,
        output: `${assetsDir}/hero-opt.webp`,
        options: { width: 1920, quality: 75 },
        format: 'webp',
    },
    // Comprimir responsabilidade.jpg → WebP
    {
        input: `${assetsDir}/responsabilidade.jpg`,
        output: `${assetsDir}/responsabilidade-opt.webp`,
        options: { width: 1200, quality: 75 },
        format: 'webp',
    },
    // Comprimir logo PNG → WebP
    {
        input: `${assetsDir}/GoolMixConcreto.png`,
        output: `${assetsDir}/GoolMixConcreto-opt.webp`,
        options: { width: 400, quality: 80 },
        format: 'webp',
    },
];

function formatBytes(bytes) {
    return (bytes / 1024).toFixed(1) + ' KB';
}

async function optimizeImages() {
    console.log('🚀 Otimizando imagens...\n');

    for (const task of tasks) {
        if (!existsSync(task.input)) {
            console.log(`⚠️  Arquivo não encontrado: ${task.input}`);
            continue;
        }

        const inputSize = statSync(task.input).size;

        let sharpInstance = sharp(task.input).resize({ width: task.options.width, withoutEnlargement: true });

        if (task.format === 'webp') {
            sharpInstance = sharpInstance.webp({ quality: task.options.quality });
        }

        await sharpInstance.toFile(task.output);

        const outputSize = statSync(task.output).size;
        const savings = ((1 - outputSize / inputSize) * 100).toFixed(0);

        console.log(`✅ ${path.basename(task.input)}`);
        console.log(`   ${formatBytes(inputSize)} → ${formatBytes(outputSize)} (${savings}% menor)\n`);
    }

    console.log('✨ Compressão concluída!');
    console.log('\n⚠️  Lembre de atualizar os imports nos componentes React para usar os arquivos -opt.webp');
}

optimizeImages().catch(console.error);
