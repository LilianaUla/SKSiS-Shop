import { createContext, useContext, useState, useEffect } from 'react';

const CART_KEY = 'local_cart';
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      
      // ✅ ЗАЩИТА: Принудительно делаем цену и количество числами при загрузке из localStorage
      return parsed.map(item => ({
        ...item,
        price: Number(item.price) || 0,
        qty: Number(item.qty) || 1
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const add = async (product, qty = 1, size = 's') => {
    // ✅ ЗАЩИТА: Преобразуем цену и количество в числа перед добавлением
    const safePrice = Number(product.price) || 0;
    const safeQty = Number(qty) || 1;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size ? { ...i, qty: i.qty + safeQty } : i
        );
      }
      return [...prev, { ...product, price: safePrice, qty: safeQty, size }];
    });
  };

  const remove = async (id, size) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const changeQty = async (id, size, qty) => {
    const safeQty = Number(qty);
    if (safeQty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: safeQty } : i))
    );
  };

  const clear = async () => setItems([]);

  // ✅ ИСПРАВЛЕНИЕ: Считаем сумму, явно преобразуя значения в числа
  const total = items.reduce((sum, i) => {
    const price = Number(i.price) || 0;
    const qty = Number(i.qty) || 0;
    return sum + price * qty;
  }, 0);

  // ✅ ИСПРАВЛЕНИЕ: Считаем количество товаров
  const count = items.reduce((sum, i) => {
    const qty = Number(i.qty) || 0;
    return sum + qty;
  }, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, changeQty, clear, total, count, loading: false }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}