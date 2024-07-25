import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SelectedAuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const initialState = {
  isAuthenticated: false,
};

export const useAuthStore = create<SelectedAuthState>()(
  persist(
    (set) => ({
      ...initialState,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
