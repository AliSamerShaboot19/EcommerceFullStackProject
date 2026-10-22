import { useAuth } from "@clerk/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "../lib/api";

export function useAdminProducts() {
  const { getToken, isSignedIn } = useAuth();
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/me", { getToken }),
    enabled: isSignedIn,
  });

  const isAdmin = meData?.user?.role === "admin";

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => apiFetch("/api/admin/products", { getToken }),
    enabled: isSignedIn && isAdmin,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ body, id }) => {
      if (id) {
        return apiFetch(`/api/admin/products/${id}`, {
          getToken,
          method: "PATCH",
          body,
        });
      }
      return apiFetch("/api/admin/products", {
        getToken,
        method: "POST",
        body,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
      setOpenModal(false);
      setEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (productId) =>
      apiFetch(`/api/admin/products/${productId}`, {
        getToken,
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-categories"] });
    },
    onError: (er) => {
      window.alert(er.message || "Delete failed");
    },
  });

  return {
    getToken,
    isSignedIn,
    meData,
    openModal,
    setOpenModal,
    editing,
    setEditing,
    products: data?.products ?? [],
    isLoading,
    saveMutation,
    deleteMutation,
  };
}
