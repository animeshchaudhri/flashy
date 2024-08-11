import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Button from "../ui/common/Button";
import Flashcard from "../ui/Cards/Flash";
import { useNavigate } from "react-router-dom";
import { useGetCardsByCategory } from "../../hooks/useFlashcards";


export default function UserCards({ id }: { id: number }) {
  const { cards, loading, error } = useGetCardsByCategory(id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProgress = localStorage.getItem(`cardProgress_${id}`);
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`cardProgress_${id}`, JSON.stringify(progress));
  }, [progress, id]);

  const incrementGlobalAnswer = (correct: boolean) => {
    const key = correct ? "globalCorrectAnswers" : "globalIncorrectAnswers";
    const currentValue = parseInt(localStorage.getItem(key) || "0", 10);
    localStorage.setItem(key, (currentValue + 1).toString());
  };

  const handleAnswer = (correct: boolean) => {
    if (!cards.length) return;
    setProgress((prev) => ({ ...prev, [cards[currentIndex].id]: correct }));
    incrementGlobalAnswer(correct);
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const backy = () => {
    navigate("/");
  };

  if (loading)
    return <div className="text-center py-8 text-white">Loading cards...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!id)
    return (
      <div className="text-center py-8 text-white">No category ID provided</div>
    );
  if (!cards.length)
    return (
      <div className="text-center py-8 text-white">
        No cards found for this category.
      </div>
    );

  const currentCard = cards[currentIndex];
  return (
    <>
      <div>
        <Button onClick={backy} text="back" />
      </div>
      <div className="flex flex-col items-center p-8 max-w-2xl mx-auto text-white">
        <h1 className="text-3xl font-bold mb-4">Flashcards</h1>
        <p className="mb-6">Category ID: {id}</p>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Flashcard
            card={currentCard}
            onAnswer={handleAnswer}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />
        </motion.div>
        <div className="flex justify-between w-80 mb-6">
          <Button onClick={handlePrevious} text="Previous" />
          <Button onClick={handleNext} text="Next" />
        </div>
        <div className="text-lg font-semibold">
          Progress: {Object.values(progress).filter(Boolean).length} /{" "}
          {cards.length}
        </div>
      </div>
    </>
  );
}
