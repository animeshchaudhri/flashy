import React, { useState } from "react";
import { useGetAllCategories } from "../../hooks/Category";
import CategoryManagement from "../../components/admin/CategoryManagement";
import FlashcardManagement from "../../components/admin/FlashcardManagement";
import Loading from "../../components/ui/Loading";

interface Category {
  id: number;
  name: string;
}

const AdminDashboard: React.FC = () => {
  const {categories,loading: categoriesLoading,error: categoriesError,refetch: refetchCategories, } = useGetAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  if (categoriesLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (categoriesError) return <div>Error: {categoriesError}</div>;

  const handleBackButton = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="p-4">
      {selectedCategory ? (
        <>
          <button
            onClick={handleBackButton}
            className="bg-gray-500 text-white p-2 rounded mb-4"
          >
            Back to Categories
          </button>
          <FlashcardManagement category={selectedCategory} />
        </>
      ) : (
        <CategoryManagement
          categories={categories}
          onSelectCategory={setSelectedCategory}
          refetchCategories={refetchCategories}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
