import { create } from 'zustand'

interface WordsStore {
  words: Word[]
  toggle: (word: Word) => void
  onClear: () => void
}

export const useWords = create<WordsStore>()((set) => ({
  words: [],
  toggle: (word: Word) =>
    set((state) => {
      if (state.words.some((w) => w.id === word.id)) {
        return { words: state.words.filter((w) => w.id !== word.id) }
      } else {
        return { words: [...state.words, word] }
      }
    }),
  onClear: () => set({ words: [] }),
}))
