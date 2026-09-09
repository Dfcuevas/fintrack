import { categories } from "@/db/schema";
import { db } from "./db";
import { InferSelectModel } from "drizzle-orm";

export type Category = InferSelectModel<typeof categories>

export const getAllCategories = async (userId: string): Promise<Category[]> => {
  return db.query.categories.findMany({
    where: (categories, { eq }) => eq(categories.userId, userId),
  });
};
