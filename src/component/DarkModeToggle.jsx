import classNames from "classnames"

export function DarkModeToggle() {
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
    "mb-6")
  const handleChange = (e) => {
    if (!e.target.value) {
      return
    }
    if (e.target.value === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <select className={classes} onChange={handleChange}>
      <option className="p-1" value="light">Light</option>
      <option className="p-1" value="dark">Dark</option>
    </select>
  )
}
