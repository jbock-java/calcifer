import classNames from "classnames"
import {
  getFerien,
} from "../data/ferien"
import {
  useEffect,
} from "react"
import {
  create,
} from "zustand"
import {
  persist,
} from "zustand/middleware"

const useDatasetStore = create(persist(
  (set) => ({
    value: "2024",
    setValue: (value) => set(() => ({value})),
  }), {
    name: "dataset-storage",
  },
))

export function Menu({setCalendarData}) {
  let value = useDatasetStore(state => state.value)
  let setValue = useDatasetStore(state => state.setValue)
  useEffect(() => {
    setCalendarData({
      year: value,
      highlight: getFerien("niedersachsen", value).join("\n"),
    })
  }, [value, setCalendarData])
  const classes = classNames(
    "p-1",
    "text-black",
    "dark:text-white",
    "bg-white",
    "dark:bg-black",
    "border",
    "border-black",
    "dark:border-white",
    "pl-2",
    "mb-6",
  )

  const handleChange = (e) => {
    if (!e.target.value) {
      return
    }
    setValue(e.target.value)
  }

  return (
    <select className={classes} onChange={handleChange} value={value}>
      <option className="p-1" value=""></option>
      <option className="p-1" value="2024">2024</option>
      <option className="p-1" value="2024u">2024u</option>
      <option className="p-1" value="2025">2025</option>
    </select>
  )
}
