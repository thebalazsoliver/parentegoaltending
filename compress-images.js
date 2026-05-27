import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "public/images";
const outputDir = "public/images/optimized";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();

  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const inputPath = path.join(inputDir, file);
  const outputName = path.basename(file, ext) + ".webp";
  const outputPath = path.join(outputDir, outputName);

  await sharp(inputPath)
    .resize({
      width: 1400,
      withoutEnlargement: true,
    })
    .webp({
      quality: 75,
    })
    .toFile(outputPath);

  console.log(`Compressed: ${file} -> ${outputName}`);
}