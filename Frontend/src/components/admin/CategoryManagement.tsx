import React, { useState } from "react";
import {
  useAddCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../hooks/Category";
import { Category, CategoryManagementProps } from "../../utils/constants";

const CategoryManagement: React.FC<CategoryManagementProps> = ({
  categories,
  onSelectCategory,
  refetchCategories,
}) => {
  const { addCategory, loading: addCategoryLoading } = useAddCategory();
  const { updateCategory, loading: updateCategoryLoading } =
    useUpdateCategory();
  const { deleteCategory, loading: deleteCategoryLoading } =
    useDeleteCategory();

  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editedName, setEditedName] = useState("");

  const handleAddCategory = async () => {
    try {
      await addCategory({ name: newCategory });
      setNewCategory("");
      refetchCategories();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleUpdateCategory = async (category: Category) => {
    try {
      await updateCategory(category.id, { name: editedName });
      setEditingCategory(null);
      setEditedName("");
      refetchCategories();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      refetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setEditedName(category.name);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl text-white font-semibold mb-2">
        Category Management
      </h2>
      <div className="text-right">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name"
          className="p-2 border rounded mr-2"
          required
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleAddCategory}
          disabled={addCategoryLoading || !newCategory.trim()}
        >
          {addCategoryLoading ? "Adding..." : "Add Category"}
        </button>
      </div>
      <ul className="flex flex-col gap-3 mt-3">
        {categories.map((category) => (
          <li
            key={category.id}
            className="mb-2 p-2 border gap-4 rounded flex text-white items-center justify-between"
          >
            {editingCategory?.id === category.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="p-1 border rounded text-black"
              />
            ) : (
              <span>{category.name}</span>
            )}
            <div>
              <button
                onClick={() => onSelectCategory(category)}
                className="bg-green-500 text-white p-1 rounded mr-2"
              >
                Select
              </button>
              {editingCategory?.id === category.id ? (
                <>
                  <button
                    onClick={() => handleUpdateCategory(category)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                    disabled={updateCategoryLoading || !editedName.trim()}
                  >
                    {updateCategoryLoading ? "Updating..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="bg-gray-500 text-white p-1 rounded mr-2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => startEditing(category)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="bg-red-500 text-white p-1 rounded"
                disabled={deleteCategoryLoading}
              >
                {deleteCategoryLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
