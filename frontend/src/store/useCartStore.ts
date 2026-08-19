import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//estado global persistente. se o cliente der F5 na página, o carrinho não será perdido.

export interface CartItem {
  id: string; // ID do Produto
  nome: string;
  preco: number;
  quantidade: number;
  observacao?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantidade: i.quantidade + newItem.quantidade } : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      updateQuantity: (id, quantidade) => {
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantidade } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.preco * item.quantidade, 0);
      },
    }),
    {
      name: 'delivery-cart-storage', // Chave no localStorage
    }
  )
);