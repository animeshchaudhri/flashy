import { useCallback, useEffect, useState } from "react";

import { Category } from "../utils/constants";
import CategoryService from "../services/CategoryService";

export const useGetAllCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};

export const useGetCategoryById = (id: number) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await CategoryService.getCategoryById(id);
        setCategory(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCategory();
  }, [id]);

  return { category, loading, error };
};

export const useAddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addCategory = useCallback(
    async (categoryData: Omit<Category, "id">) => {
      setLoading(true);
      try {
        const data = await CategoryService.addCategory(categoryData);
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

  return { addCategory, loading, error };
};

export const useUpdateCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateCategory = useCallback(
    async (id: number, categoryData: Partial<Category>) => {
      setLoading(true);
      try {
        const data = await CategoryService.updateCategory(id, categoryData);
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

  return { updateCategory, loading, error };
};

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteCategory = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const data = await CategoryService.deleteCategory(id);
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

  return { deleteCategory, loading, error };
};
