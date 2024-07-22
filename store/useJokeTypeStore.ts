import { create } from "zustand";

interface SelectedJokeTypeState {
  jokeType: string;
  setJokeType: (jokeType: string) => void;
}

const initialState = {
  jokeType: "general",
};

export const useJokeTypeStore = create<SelectedJokeTypeState>((set) => ({
  ...initialState,
  setJokeType: (jokeType) => set({ jokeType }),
}));
