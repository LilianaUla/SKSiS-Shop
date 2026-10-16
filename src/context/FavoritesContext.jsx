import { createContext, useContext, useState, useEffect } from 'react';

const FAV_KEY = 'local_favorites';
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(FAV_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(items));
  }, [items]);

  const isFavorite = (id) => items.some((i) => i.id === id);

  const toggle = async (product) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === product.id)) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const remove = async (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ items, toggle, isFavorite, remove, loading: false }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}