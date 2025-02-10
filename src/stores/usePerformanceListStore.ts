import { create } from "zustand";

interface PerformanceListState {
  selectedCategory: string;
  currentPage: number;

  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

export const usePerformanceListStore = create<PerformanceListState>((set) => ({
  selectedCategory: "전체",
  currentPage: 1,

  setSelectedCategory: (category) =>
    set({ selectedCategory: category, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
