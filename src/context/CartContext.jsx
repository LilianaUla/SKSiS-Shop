import { createContext, useContext, useState, useEffect } from 'react';

const CART_KEY = 'local_cart';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const add = async (product, qty = 1, size = 's') => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty, size }];
    });
  };

  const remove = async (id, size) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const changeQty = async (id, size, qty) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty } : i))
    );
  };

  const clear = async () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, changeQty, clear, total, count, loading: false }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}