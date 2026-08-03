import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { categories, users } from "@/db/schema";
import { DEFAULT_CATEGORIES } from "./default-categories";

type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function seedDefaultCategories(tx: DbTransaction, userId: string) {
  await tx.insert(categories).values(
    DEFAULT_CATEGORIES.map((category) => ({
      ...category,
      userId,
      isDefault: true,
    })),
  );
}

export async function getOrCreateUser() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser)
    throw new Error("No autenticado o no se pudo obtener el usuario de Clerk");

  const existing = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerkUserId, userId),
  });

  if (existing) return existing;

  return db.transaction(async (tx) => {
    const [newUser] = await tx
      .insert(users)
      .values({
        clerkUserId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
        currency: "COP",
      })
      .returning();

    await seedDefaultCategories(tx, newUser.id);

    return newUser;
  });
}

export async function queryCategories(userId: string) {
  return db.query.categories.findMany({
    where: (categories, { eq }) => eq(categories.userId, userId),
  });
}
