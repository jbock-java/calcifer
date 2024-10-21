import {
  create,
} from "zustand"
import {
  produce,
} from "immer"
import {
  persist,
} from "zustand/middleware"

const simpleColors = {
  "*": "bg-yellow-300 dark:bg-indigo-800",
}

const ferienColors = {
  "*": "bg-yellow-300 dark:bg-indigo-800",
  "s": "bg-green-300 dark:bg-green-700",
}

export const useColorStore = create(persist(
  (set, get) => ({
    ferien: false,
    getColors: () => {
      return get().ferien ? ferienColors : simpleColors
    },
    setFerien: (b) => {
      set(produce(draft => {
        draft.ferien = b
      }))
    },
  }), {
    name: "color-storage",
  },
))
