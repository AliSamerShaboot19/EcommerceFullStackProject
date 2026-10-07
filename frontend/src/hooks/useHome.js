import { apiFetch } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export default function useHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category")?.trim() ?? "";

  const setCategory = (category) => {
    const next = new URLSearchParams(searchParams);
    if (!category) {
      next.delete("category");
    } else {
      next.set("category", category.trim());
    }
    setSearchParams(next, { replace: true });
  };

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => apiFetch(`/api/products/categories`),
  });

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () =>
      apiFetch(
        category
          ? `/api/products?category=${encodeURIComponent(category)}`
          : `/api/products`
      ),
  });

  const categories = categoriesData ?? [];
  const products = productsData?.products ?? [];
  const categoriesChipsLoading = isLoadingCategories && categories.length === 0;

  return {
    categories,
    setCategory,
    category,
    products,
    categoriesChipsLoading,
    isLoadingCategories,
    isLoadingProducts,
    error,
  };
}
