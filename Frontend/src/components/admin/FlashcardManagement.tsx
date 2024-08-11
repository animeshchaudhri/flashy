import React, { useState, useEffect } from "react";
import {
  useAddCard,
  useUpdateCard,
  useDeleteCard,
  useGetCardsByCategory,
} from "../../hooks/useFlashcards";
import Loading from "../ui/Loading";
import generateFlashcardContent from "./generateFlashcardContent";

interface Card {
  id: number;
  title: string;
  description: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const FlashcardManagement: React.FC<{ category: Category }> = ({
  category,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    cards: fetchedCards,
    loading,
    error,
    refetch: refetchCards,
  } = useGetCardsByCategory(category.id);
  const { addCard } = useAddCard();
  const { updateCard } = useUpdateCard();
  const { deleteCard } = useDeleteCard();

  useEffect(() => {
    if (fetchedCards) {
      setCards(fetchedCards);
    }
  }, [fetchedCards]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCard) {
      const updatedCard = await updateCard(editingCard.id, {
        title,
        description,
      });
      if (updatedCard && fetchedCards) {
        refetchCards();
      }
      setEditingCard(null);
    } else {
      const newCard = await addCard({
        title,
        description,
        categoryId: category.id,
      });

      if (fetchedCards && newCard) {
        refetchCards();
      }
    }
    setTitle("");
    setDescription("");
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
    setTitle(card.title);
    setDescription(card.description);
  };

  const handleDelete = async (id: number) => {
    await deleteCard(id);
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const content = await generateFlashcardContent(category.name);
      setTitle(content.title);
      setDescription(content.description);
    } catch (error) {
      console.error("Error generating flashcard content:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl text-white font-bold mb-4">
        Flashcards for {category.name}
      </h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Question"
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Answer"
          className="p-2 border rounded mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          {editingCard ? "Update" : "Add"} Flashcard
        </button>
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="bg-green-500 text-white p-2 rounded"
        >
          {isGenerating ? "Generating..." : "Generate AI Content"}
        </button>
      </form>

      <ul>
        {cards.map((card, index) => (
          <li key={index} className="mb-2 p-2 border rounded">
            <h3 className="font-semibold text-white">{card.title}</h3>
            <p className="text-white">{card.description}</p>
            <button
              onClick={() => handleEdit(card)}
              className="bg-yellow-500 text-white p-1 rounded mr-2 mt-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(card.id)}
              className="bg-red-500 text-white p-1 rounded mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashcardManagement;
