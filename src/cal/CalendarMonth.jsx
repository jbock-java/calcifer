import {
  twJoin,
} from "tailwind-merge"

const grey = "text-slate-400"

export const CalendarMonth = ({year, month, highlight}) => {
  const monthName = new Date(Number(year), month.month.value() - 1, 15).toLocaleString("de", { month: "long" })
  const classes = twJoin(
    "text-black",
    "dark:text-white",
    "font-mono",
    "w-fit",
    "grid",
    "gap-x-2",
    "grid-cols-8",
  )
  return (
    <div>
      <div className={classes}>
        <div></div>
        <div className="col-span-7"><pre> {monthName} {year}</pre></div>
        <div></div>
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map(d => (
          <div key={"hd-" + d} className={twJoin(grey, "justify-self-end")}>{d}</div>
        ))}
        {month.weeks.map(week =>
          <CalendarWeek
            key={"w-" + year + "-" + week.kw}
            year={year}
            week={week} highlight={highlight} />)}
      </div>
    </div>)
}

const CalendarWeek = ({ year, week, highlight }) => {
  const days = []
  for (let i = 0; i < week.days.length; i++) {
    const key = year + "-" + week.kw + "-" + i
    days.push(<CalendarDay key={key} day={week.days[i]} highlight={highlight} />)
  }
  return <>
    <div className={grey}>{String(week.kw).padStart(2, "0")}</div>
    {days}
  </>
}

const CalendarDay = ({ day, highlight }) => {
  if (!day.day) {
    return <div />
  }
  const hl = highlight.has(day.day.toString())
  const classes = twJoin(
    "px-1",
    "justify-self-end",
    hl && "bg-yellow-300",
    hl && "dark:bg-indigo-800",
  )
  const text = String(day.day?.dayOfMonth()).padStart(2, " ")
  return (
    <div className={classes}><pre>{text}</pre></div>
  )
}
