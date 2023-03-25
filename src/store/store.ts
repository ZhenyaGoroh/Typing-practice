import { create } from "zustand"

export const useState = create((set) => ({
  text: "",
  setText: (newText: string) => set(() => ({ text: newText })),
}))
