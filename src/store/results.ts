import { create } from "zustand"

interface IResult {
  id: string
  wpm: number
  seconds: number
  minutes: number
  mistakes: number
  text: string
}

interface State {
  results: IResult[]
}

interface Action {
  addResult: (newResult: IResult) => void
  removeResult: (resultId: string) => void
}

export const useResults = create<State & Action>((set) => ({
  results: (() => {
    const storedResults = localStorage.getItem("results")
    return storedResults !== null ? JSON.parse(storedResults) : []
  })(),
  addResult: (newResult: IResult) =>
    set((state) => ({ results: [...state.results, newResult] })),
  removeResult: (resultId: string) =>
    set((state) => ({
      results: state.results.filter((result) => result.id !== resultId),
    })),
}))
