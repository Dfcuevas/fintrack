import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { users } from "@/db/schema";

export async function getOrCreateUser() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser)
    throw new Error("No autenticado o no se pudo obtener el usuario de Clerk");

  const existing = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.clerkUserId, userId),
  });

  if (existing) return existing;

  const [newUser] = await db
    .insert(users)
    .values({
      clerkUserId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      currency: "COP",
    })
    .returning();
  return newUser;
}
