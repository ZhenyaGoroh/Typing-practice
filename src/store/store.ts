import { create } from "zustand"

interface UseState {
  text: string
  setText: (newText: string) => void
}

export const useState = create<UseState>((set) => ({
  text: "",
  setText: (newText: string) => set(() => ({ text: newText })),
}))
