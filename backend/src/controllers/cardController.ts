import { Request, Response, NextFunction } from "express";
import { db } from "../config/database";
import { cards } from "../models/schema";
import { eq } from "drizzle-orm";

export const getAllCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCards = await db.select().from(cards);
    res.json(allCards);
  } catch (error) {
    next(error);
  }
};

export const getCardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const card = await db
      .select()
      .from(cards)
      .where(eq(cards.id, parseInt(id)));
    if (card.length === 0) {
      res.status(404).json({ error: "Card not found" });
    } else {
      res.json(card[0]);
    }
  } catch (error) {
    next(error);
  }
};

export const addCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, categoryId } = req.body;
  try {
    const newCard = await db
      .insert(cards)
      .values({ title, description, categoryId });
    res.status(201).json(newCard);
  } catch (error) {
    next(error);
  }
};

export const updateCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { title, description, categoryId } = req.body;
  try {
    await db
      .update(cards)
      .set({ title, description, categoryId })
      .where(eq(cards.id, parseInt(id)));
    res.json({ message: "Card updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await db.delete(cards).where(eq(cards.id, parseInt(id)));
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCardsByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    const categoryCards = await db
      .select()
      .from(cards)
      .where(eq(cards.categoryId, parseInt(categoryId)));

    if (categoryCards.length === 0) {
      res.status(404).json({ message: "No cards found for this category" });
    } else {
      res.json(categoryCards);
    }
  } catch (error) {
    next(error);
  }
};
