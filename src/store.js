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
  "+": "bg-yellow-300 dark:bg-indigo-800",
}

const colors = {
  "+": "bg-yellow-300 dark:bg-indigo-800",
  "*": "bg-yellow-300 dark:bg-indigo-800",
  "s": "bg-green-300 dark:bg-green-700",
}

export const useColorStore = create(persist(
  (set, get) => ({
    explain: false,
    getColors: () => {
      return get().explain ? colors : simpleColors
    },
    setExplain: (b) => {
      set(produce(draft => {
        draft.explain = b
      }))
    },
  }), {
    name: "color-storage",
  },
))
