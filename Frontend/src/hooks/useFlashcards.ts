import { useState, useEffect, useCallback } from "react";
import CardService from "../services/flashcardService";

interface Card {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  // Add other properties as needed
}

export const useGetAllCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await CardService.getAllCards();
        setCards(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  return { cards, loading, error };
};

export const useGetCardById = (id: number) => {
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await CardService.getCardById(id);
        setCard(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCard();
  }, [id]);

  return { card, loading, error };
};

export const useAddCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addCard = useCallback(async (cardData: Omit<Card, "id">) => {
    setLoading(true);
    try {
      const data = await CardService.addCard(cardData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setLoading(false);
      throw err;
    }
  }, []);

  return { addCard, loading, error };
};

export const useUpdateCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateCard = useCallback(
    async (id: number, cardData: Partial<Card>) => {
      setLoading(true);
      try {
        const data = await CardService.updateCard(id, cardData);
        setLoading(false);
        return data;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
        throw err;
      }
    },
    []
  );

  return { updateCard, loading, error };
};

export const useDeleteCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCard = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const data = await CardService.deleteCard(id);
      setLoading(false);
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setLoading(false);
      throw err;
    }
  }, []);

  return { deleteCard, loading, error };
};

export const useGetCardsByCategory = (categoryId: number) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CardService.getCardsByCategory(categoryId);
      setCards(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      fetchCards();
    }
  }, [categoryId, fetchCards]);

  const refetch = useCallback(() => {
    if (categoryId) {
      fetchCards();
    }
  }, [categoryId, fetchCards]);

  return { cards, loading, error, refetch };
};
