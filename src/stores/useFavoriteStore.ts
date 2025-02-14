import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Performance } from "@/types/performance";

interface FavoriteState {
  favorites: Record<string, Performance[]>;
  toggleFavorite: (userEmail: string, performance: Performance) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      favorites: {},

      toggleFavorite: (userEmail, performance) => {
        set((state) => {
          const userFavorites = state.favorites[userEmail] || [];
          const isAlreadyFavorite = userFavorites.some(
            (fav) => fav.id === performance.id
          );

          const updatedFavorites = isAlreadyFavorite
            ? userFavorites.filter((fav) => fav.id !== performance.id)
            : [...userFavorites, performance];

          return {
            favorites: { ...state.favorites, [userEmail]: updatedFavorites },
          };
        });
      },
    }),
    { name: "favorite-storage" }
  )
);
