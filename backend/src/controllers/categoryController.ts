import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { categories, cards } from "../models/schema";
import { eq } from "drizzle-orm";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategories = await db.select().from(categories);
    res.json(allCategories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, parseInt(id)));
    if (category.length === 0) {
      res.status(404).json({ error: "Category not found" });
    } else {
      const categoryCards = await db
        .select()
        .from(cards)
        .where(eq(cards.categoryId, parseInt(id)));
      res.json({ ...category[0], cards: categoryCards });
    }
  } catch (error) {
    next(error);
  }
};

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description } = req.body;
  try {
    const newCategory = await db
      .insert(categories)
      .values({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await db
      .update(categories)
      .set({ name, description })
      .where(eq(categories.id, parseInt(id)));
    res.json({ message: "Category updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await db.delete(categories).where(eq(categories.id, parseInt(id)));
    await db.delete(cards).where(eq(cards.categoryId, parseInt(id)));
    res.json({ message: "Category and associated cards deleted successfully" });
  } catch (error) {
    next(error);
  }
};
