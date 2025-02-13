import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  nickname: string;
}
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, nickname: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    //영속성? 새로고침 이후에도 로그인 상태 유지
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (email, nickname) =>
        set({ isLoggedIn: true, user: { email, nickname } }),
      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    { name: "auth-storage" } // localStorage에 "auth-storage"라는 키로 저장
  )
);
