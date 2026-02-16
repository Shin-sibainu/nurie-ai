import { GoogleGenAI } from "@google/genai";
import type { StyleType, DifficultyLevel } from "@/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const IMAGE_MODEL = "gemini-3-pro-image-preview";

const stylePrompts: Record<StyleType, string> = {
  simple:
    "Use thick, bold outlines with minimal details. Large simple shapes that are easy to color. Suitable for young children.",
  detailed:
    "Use thin, precise outlines with rich details and intricate patterns. Many small areas to color. Suitable for older children and adults.",
  kawaii:
    "Use rounded, cute outlines with a kawaii (cute Japanese) aesthetic. Soft curves, big eyes on characters, and playful shapes.",
};

const difficultyPrompts: Record<DifficultyLevel, string> = {
  easy: "Very simple composition with 5-10 large areas to color. Minimal background elements. Perfect for toddlers and preschoolers (ages 2-5).",
  normal:
    "Moderate composition with 15-25 areas to color. Some background elements and medium-sized details. Suitable for elementary school children (ages 6-10).",
  hard: "Complex composition with 30+ areas to color. Rich background, fine details, and intricate patterns. Designed for adults and advanced colorists.",
};

function buildPrompt(
  theme: string,
  style: StyleType,
  difficulty: DifficultyLevel
): string {
  return `Generate a coloring page (塗り絵) illustration with the following specifications:

Theme: ${theme}

Style: ${stylePrompts[style]}

Difficulty: ${difficultyPrompts[difficulty]}

IMPORTANT REQUIREMENTS:
- The image MUST be a black and white line drawing on a pure white background
- NO filled/shaded areas - only outlines
- NO gray tones or gradients - only black lines on white
- Clear, clean lines suitable for printing on paper
- The drawing should fill most of the image area
- No text or watermarks in the image
- Output as a high-quality image suitable for printing at A4 size`;
}

export async function generateColoringPage(
  theme: string,
  style: StyleType,
  difficulty: DifficultyLevel
): Promise<Buffer> {
  const prompt = buildPrompt(theme, style, difficulty);

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseModalities: ["IMAGE", "TEXT"],
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error("No response from Gemini API");
  }

  for (const part of parts) {
    if (part.inlineData?.data) {
      return Buffer.from(part.inlineData.data, "base64");
    }
  }

  throw new Error("No image generated from Gemini API");
}

export async function convertPhotoToColoring(
  photoBuffer: Buffer,
  mimeType: string
): Promise<Buffer> {
  const base64Photo = photoBuffer.toString("base64");

  const prompt = `Convert this photograph into a coloring page (塗り絵) line drawing.

IMPORTANT REQUIREMENTS:
- Convert to black and white line drawing ONLY
- Trace the main outlines of objects in the photo
- NO filled/shaded areas - only outlines
- NO gray tones or gradients - only black lines on pure white background
- Simplify complex details while keeping recognizable shapes
- Clean, clear lines suitable for printing
- The drawing should maintain the composition of the original photo
- Output as a high-quality image suitable for printing at A4 size`;

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { data: base64Photo, mimeType } },
          { text: prompt },
        ],
      },
    ],
    config: {
      responseModalities: ["IMAGE", "TEXT"],
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error("No response from Gemini API");
  }

  for (const part of parts) {
    if (part.inlineData?.data) {
      return Buffer.from(part.inlineData.data, "base64");
    }
  }

  throw new Error("No image generated from Gemini API");
}
