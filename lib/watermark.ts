import sharp from "sharp";

export async function addWatermark(imageBuffer: Buffer): Promise<Buffer> {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const width = metadata.width || 1024;
  const height = metadata.height || 1024;

  const svgOverlay = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="watermark" patternUnits="userSpaceOnUse" width="400" height="300" patternTransform="rotate(-30)">
          <text x="10" y="150" font-family="sans-serif" font-size="36" fill="rgba(150,150,150,0.35)" font-weight="bold">
            ぬりえAI サンプル
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#watermark)" />
    </svg>
  `;

  return image
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();
}
