import { useAuth } from "@clerk/react";
import { useCartStore } from "../store/cart";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { useState } from "react";

function useCart() {
  const { getToken } = useAuth();

  const items = useCartStore((s) => s.products);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);


  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const {
    data,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch("/api/products"),
    enabled: items.length > 0,
  });

  const products = data?.products ?? [];
  const byIds = new Map(products.map((p) => [p.id, p]));

  const lines = items.map((line) => ({
    line,
    product: byIds.get(line.id) ?? null,
  }));

  const total = lines.reduce((sum, { line, product: p }) => {
    if (!p) return sum;
    return sum + p.price * line.quantity;
  }, 0);

  async function checkout() {
    setCheckoutLoading(true);

    const body = {
      items: items.map((i) => ({
        id: i.id,
        quantity: i.quantity,
      })),
    };

    const res = await apiFetch("/api/checkout", {
      getToken,
      method: "POST",
      body,
    });

    if (res?.checkoutUrl) {
      window.location.href = res.checkoutUrl;
      return;
    }

    setCheckoutLoading(false);
  }

  return {
    items,
    setQuantity,
    removeFromCart,
    productsLoading,
    productsError,
    lines,
    total,
    checkout,
    checkoutLoading,
  };
}

export default useCart;
