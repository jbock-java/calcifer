import {
  useEffect,
} from "react"
import {
  twJoin,
} from "tailwind-merge"
import {
  create,
} from "zustand"
import {
  persist,
} from "zustand/middleware"

const useToggleStore = create(persist(
  (set) => ({
    value: "light",
    setValue: (value) => set(() => ({value})),
  }), {
    name: "dark-storage",
  },
))

export function DarkModeToggle() {
  let value = useToggleStore(state => state.value)
  let setValue = useToggleStore(state => state.setValue)
  useEffect(() => {
    if (value === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [value])
  const classes = twJoin(
    "p-1",
    "text-black",
    "dark:text-white",
    "bg-white",
    "dark:bg-black",
    "border",
    "border-black",
    "dark:border-white",
    "pl-2",
  )
  const handleChange = (e) => {
    if (!e.target.value) {
      return
    }
    setValue(e.target.value)
  }

  return (
    <select className={classes} onChange={handleChange} value={value}>
      <option className="p-1" value="light">Light</option>
      <option className="p-1" value="dark">Dark</option>
    </select>
  )
}
