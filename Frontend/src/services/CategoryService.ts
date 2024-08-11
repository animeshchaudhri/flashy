const BASE_URL = import.meta.env.VITE_SOME_KEY2;

async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
}

async function getCategoryById(id: number) {
  const response = await fetch(`${BASE_URL}/categories/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
}

async function addCategory(categoryData: any) {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    throw new Error("Failed to add category");
  }
  return response.json();
}

async function updateCategory(id: number, categoryData: any) {
  const response = await fetch(`${BASE_URL}/categories/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });
  if (!response.ok) {
    throw new Error("Failed to update category");
  }
  return response.json();
}

async function deleteCategory(id: number) {
  const response = await fetch(`${BASE_URL}/categories/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
  return response.json();
}

const CategoryService = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryService;
