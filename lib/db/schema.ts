import {
  sqliteTable,
  text,
  integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// ── better-auth tables ──────────────────────────────────────────────

export const user = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  // custom fields
  plan: text("plan").default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  credits: integer("credits").default(0),
  freeCountMonth: integer("free_count_month").default(0),
  freeCountResetAt: integer("free_count_reset_at", { mode: "timestamp" }),
});

export const session = sqliteTable("session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable("account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const verification = sqliteTable("verification", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

// ── application tables ──────────────────────────────────────────────

export const generation = sqliteTable("generation", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  prompt: text("prompt").notNull(),
  style: text("style").notNull(),
  difficulty: text("difficulty").notNull(),
  status: text("status").notNull().default("pending"),
  imageKey: text("image_key"),
  watermarkedImageKey: text("watermarked_image_key"),
  pdfKey: text("pdf_key"),
  imageUrl: text("image_url"),
  watermarkedImageUrl: text("watermarked_image_url"),
  pdfUrl: text("pdf_url"),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const payment = sqliteTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  stripePaymentId: text("stripe_payment_id"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("jpy"),
  status: text("status").notNull(),
  type: text("type").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

export const seoPage = sqliteTable("seo_page", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  category: text("category").notNull(),
  theme: text("theme").notNull(),
  titleJa: text("title_ja").notNull(),
  descriptionJa: text("description_ja").notNull(),
  prompt: text("prompt").notNull(),
  imageKey: text("image_key"),
  imageUrl: text("image_url"),
  createdAt: integer("created_at", { mode: "timestamp" }),
});

// ── relations ───────────────────────────────────────────────────────

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  generations: many(generation),
  payments: many(payment),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const generationRelations = relations(generation, ({ one }) => ({
  user: one(user, {
    fields: [generation.userId],
    references: [user.id],
  }),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
  user: one(user, {
    fields: [payment.userId],
    references: [user.id],
  }),
}));
