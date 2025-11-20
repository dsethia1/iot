import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

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

// Use a new key so that on first run after this change favorites start empty
// (previously saved favorites under the old key will be ignored).
const STORAGE_KEY = '@studyspace:favorites_v2';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Library[]>([]);

  useEffect(() => {
    // load from storage
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as any[];
            // Normalize stored favorites: ensure id is a number and required fields exist
            const normalized = parsed
              .map((p) => ({
                id: typeof p.id === 'string' ? Number(p.id) : p.id,
                name: p.name ?? p.title ?? 'Untitled',
                availableSeats: Number(p.availableSeats ?? p.available ?? 0),
                totalSeats: Number(p.totalSeats ?? 0),
                distance: p.distance ?? '0.0 mi',
                image: p.image ?? p.img ?? '',
              }))
              .filter((p) => typeof p.id === 'number' && !Number.isNaN(p.id));

            setFavorites(normalized);
          } catch (e) {
            // if stored data is malformed, reset to empty to avoid showing everything as saved
            setFavorites([]);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites]);

  function has(id: number) {
    return favorites.some((f) => Number(f.id) === Number(id));
  }

  function toggle(lib: Library) {
    setFavorites((prev) => {
      const idNum = Number(lib.id);
      const exists = prev.some((p) => Number(p.id) === idNum);
      if (exists) return prev.filter((p) => Number(p.id) !== idNum);
      // ensure the saved item follows the normalized shape
      const toSave: Library = {
        id: idNum,
        name: lib.name ?? 'Untitled',
        availableSeats: Number(lib.availableSeats ?? 0),
        totalSeats: Number(lib.totalSeats ?? 0),
        distance: lib.distance ?? '0.0 mi',
        image: lib.image ?? '',
      };
      return [toSave, ...prev];
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
