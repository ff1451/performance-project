import { create } from "zustand";

interface CalendarState {
  currentYear: number;
  currentMonth: number;
  selectedDate: string | null;

  setCurrentYear: (year: number) => void;
  setCurrentMonth: (month: number) => void;
  setSelectedDate: (date: string | null) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  selectedDate: null,

  setCurrentYear: (year) => set({ currentYear: year }),
  setCurrentMonth: (month) => set({ currentMonth: month }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
