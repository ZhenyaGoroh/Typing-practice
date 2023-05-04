import { create } from "zustand"

interface State {
  text: string
  resultStatus: boolean
}

interface Action {
  setText: (newText: string) => void
  toggleResultStatus: () => void
}

export const useStore = create<State & Action>((set) => ({
  text: "",
  char: 0,
  resultStatus: false,
  setText: (newText: string) => set(() => ({ text: newText })),
  toggleResultStatus: () =>
    set((state) => ({ resultStatus: !state.resultStatus })),
}))
