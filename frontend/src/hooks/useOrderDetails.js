import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { apiFetch } from "../lib/api";

export function useOrderDetails() {
  const { id } = useParams();
  const { getToken } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => apiFetch(`/api/orders/${id}`, { getToken }),
    enabled: Boolean(id),
  });

  const order = data?.order ?? null;
  const items = data?.items ?? [];
  const paid = order?.status === "paid";

  return {
    isLoading,
    order,
    items,
    paid,
    id,
    error,
  };
}
