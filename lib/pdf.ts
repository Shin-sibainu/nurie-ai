import { PDFDocument } from "pdf-lib";

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const MARGIN = 40;

export async function generatePdf(imageBuffer: Buffer): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

  // PNG/JPEG両対応: マジックバイトで判定
  const isPng = imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50;
  const embeddedImage = isPng
    ? await pdfDoc.embedPng(imageBuffer)
    : await pdfDoc.embedJpg(imageBuffer);
  const { width: imgWidth, height: imgHeight } = embeddedImage.scale(1);

  const availableWidth = A4_WIDTH - MARGIN * 2;
  const availableHeight = A4_HEIGHT - MARGIN * 2;

  const scale = Math.min(
    availableWidth / imgWidth,
    availableHeight / imgHeight
  );

  const scaledWidth = imgWidth * scale;
  const scaledHeight = imgHeight * scale;

  const x = (A4_WIDTH - scaledWidth) / 2;
  const y = (A4_HEIGHT - scaledHeight) / 2;

  page.drawImage(embeddedImage, {
    x,
    y,
    width: scaledWidth,
    height: scaledHeight,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
