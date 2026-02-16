"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { user, generation } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getUserProfile() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const [userData] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id))
    .limit(1);

  return userData || null;
}

export async function getUserGenerations(limit = 20) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return [];

  return db
    .select()
    .from(generation)
    .where(eq(generation.userId, session.user.id))
    .orderBy(desc(generation.createdAt))
    .limit(limit);
}
