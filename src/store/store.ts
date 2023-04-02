import { create } from "zustand"

interface State {
  text: string
  line: number
}

interface Action {
  setText: (newText: string) => void
}

export const useStore = create<State & Action>((set) => ({
  text: "",
  line: 0,
  setText: (newText: string) => set(() => ({ text: newText })),
}))
