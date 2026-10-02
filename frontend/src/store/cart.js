import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      products: [],
      addToCart: (productId, qty = 1) => {
        const products = [...get().products];
        const i = products.findIndex((p) => p.id === productId);
        if (i >= 0) {
          products[i] = {
            ...products[i],
            quantity: products[i].quantity + qty,
          };
        } else {
          products.push({ id: productId, quantity: qty });
        }
        set({ products });
      },
      removeFromCart: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        })),
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ products: get().products.filter((p) => p.id !== productId) });
          return;
        }
        const products = get().products.map((p) =>
          p.id === productId ? { ...p, quantity } : p
        );
        set({ products });
      },
      clear() {
        set({ products: [] });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
