import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlashcardProps {
  card: {
    id: number;
    title: string;
    description: string;
  };
  onAnswer: (correct: boolean) => void;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  card,
  onAnswer,
  isFlipped,
  onFlip,
}) => {
  return (
    <div className="w-80 h-56 perspective-1000 cursor-pointer" onClick={onFlip}>
      <AnimatePresence initial={false} mode="wait">
        {!isFlipped ? (
          <motion.div
            key="front"
            className="w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center p-6"
            initial={{ rotateY: 90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: 90 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-center text-black">
              {card.title}
            </h2>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            className="w-full h-full bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-6"
            initial={{ rotateY: -90 }}
            animate={{ rotateY: 0 }}
            exit={{ rotateY: -90 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg text-center mb-4 text-black">
              {card.description}
            </p>
            <div className="flex space-x-4">
              <motion.button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAnswer(true);
                }}
              >
                Correct
              </motion.button>
              <motion.button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAnswer(false);
                }}
              >
                Incorrect
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Flashcard;
