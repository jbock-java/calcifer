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
  "s": "bg-yellow-300 dark:bg-indigo-800",
  "*": "bg-green-300 dark:bg-green-700",
  "+": "bg-violet-200 dark:bg-fuchsia-800",
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
