import { useParams } from "react-router";
import { apiFetch } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export function useProductPage() {
  const { slug } = useParams();
  console.log(slug)

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => apiFetch(`/api/products/${slug}`),
  });

  return {
    slug,
    product: data?.product ?? null,
    isLoading,
    error,
  };
}
