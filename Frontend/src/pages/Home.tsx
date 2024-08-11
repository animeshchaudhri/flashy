import React from "react";
import { FlashcardItem } from "../components/ui/Cards/FlashCard";
import CategoryItem from "../components/ui/Cards/CategoryCard";
import { useGetAllCategories } from "../hooks/Category";
import Loading from "../components/ui/Loading";
import { featuredFlashcards } from "../utils/constants";

const HomePage: React.FC = () => {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refetch: fetchCategories,
  } = useGetAllCategories();

  if (categoriesLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (categoriesError) {
    fetchCategories();
    return <div>Error: {categoriesError}</div>;
  }
  const icons = ["🧠", "🧮", "🧪", "📚", "🌍", "🏛️"];
  const categoriesWithIcons = categories.map((category, index) => ({
    ...category,
    icon: icons[index % icons.length],
    uniqueKey: `category-${index}`,
  }));

  return (
    <div>
      <h1 className="text-4xl font-bold text-white text-center">
        Welcome to the Flashy
      </h1>
      <p className="text-center text-white mt-4">
        This is a platform to create, share, and study flashcards.
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoriesWithIcons.map((category) => (
            <CategoryItem key={category.uniqueKey} {...category} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl text-white font-semibold mb-4">
          Featured Flashcards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFlashcards.map((flashcard) => (
            <FlashcardItem
              key={flashcard.id || `flashcard-${flashcard.title}`}
              {...flashcard}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
