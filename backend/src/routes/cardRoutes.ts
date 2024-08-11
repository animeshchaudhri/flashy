import express from "express";
import {
  getAllCards,
  getCardById,
  addCard,
  updateCard,
  deleteCard,
  getCardsByCategoryId,
} from "../controllers/cardController";

const router = express.Router();

router.get("/", getAllCards);
router.get("/:id", getCardById);
router.post("/", addCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

router.get("/category/:categoryId", getCardsByCategoryId);

export default router;
