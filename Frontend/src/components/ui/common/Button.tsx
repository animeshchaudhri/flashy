import { motion } from "framer-motion";

type ButtonProps = {
  onClick: () => void;
  text: string;
};

function Button({ onClick, text }: ButtonProps) {
  return (
    <>
      <motion.button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {text}
        {/* Button content */}
      </motion.button>
    </>
  );
}

export default Button;
