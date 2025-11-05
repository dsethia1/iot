import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Library = {
  id: number;
  name: string;
  availableSeats: number;
  totalSeats: number;
  distance: string;
  image: string;
};

type FavoritesContextType = {
  favorites: Library[];
  toggle: (lib: Library) => void;
  has: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = '@studyspace:favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Library[]>([]);

  useEffect(() => {
    // load from storage
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setFavorites(JSON.parse(raw));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites]);

  function has(id: number) {
    return favorites.some((f) => f.id === id);
  }

  function toggle(lib: Library) {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === lib.id);
      if (exists) return prev.filter((p) => p.id !== lib.id);
      return [lib, ...prev];
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, has }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}

export default FavoritesProvider;
