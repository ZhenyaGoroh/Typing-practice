import { create } from "zustand"

interface State {
  text: string
}

interface Action {
  setText: (newText: string) => void
}

export const useStore = create<State & Action>((set) => ({
  text: "",
  char: 0,
  setText: (newText: string) => set(() => ({ text: newText })),
}))
