export type Plan = "free" | "pro";

export type StyleType = "simple" | "detailed" | "kawaii";

export type DifficultyLevel = "easy" | "normal" | "hard";

export type GenerationStatus = "pending" | "processing" | "completed" | "failed";

export interface GenerationResult {
  id: string;
  imageUrl: string;
  watermarkedImageUrl: string | null;
  pdfUrl: string | null;
  prompt: string;
  style: StyleType;
  difficulty: DifficultyLevel;
  status: GenerationStatus;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string | null;
  plan: Plan;
  stripeCustomerId: string | null;
  credits: number;
  freeCountMonth: number;
  freeCountResetAt: Date | null;
}

export interface PlanDefinition {
  id: string;
  name: string;
  nameJa: string;
  price: number;
  priceLabel: string;
  features: string[];
  generationsPerMonth: number | null;
  hasWatermark: boolean;
  stripePriceId: string | null;
}

export interface StyleDefinition {
  id: StyleType;
  name: string;
  nameJa: string;
  description: string;
  icon: string;
}

export interface DifficultyDefinition {
  id: DifficultyLevel;
  name: string;
  nameJa: string;
  description: string;
}

export interface CategoryDefinition {
  id: string;
  nameJa: string;
  description: string;
  count: number;
}
