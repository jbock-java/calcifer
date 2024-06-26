import classNames from "classnames"
import { useSelector } from "react-redux"

const grey = "text-slate-400"

export const CalendarMonth = ({ month, highlight }) => {
	const calendarData = useSelector(store => store.calendar.calendarData)
	const year = calendarData.year.substring(0, 4)
	const monthName = new Date(Number(year), month.month.value() - 1, 15).toLocaleString("de", { month: "long" })
	const classes = classNames(
		"text-black",
		"dark:text-white",
		"font-mono",
		"w-fit",
		"grid",
		"gap-x-2",
		"grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto]",
	)
	const dayHeader = []
	for (const d of ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]) {
		dayHeader.push(<div key={"hd-" + d} className={classNames(grey, "justify-self-end")}>{d}</div>)
	}
	return (
		<div>
			<div className={classes}>
				<div></div>
				<div className="col-span-7"><pre> {monthName} {year}</pre></div>
				<div></div>
				<>{dayHeader}</>
				{month.weeks.map(week =>
					<CalendarWeek key={"w-" + year + "-" + week.kw} week={week} highlight={highlight} />)}
			</div>
		</div>)
}

const CalendarWeek = ({ week, highlight }) => {
	const calendarData = useSelector(store => store.calendar.calendarData)
	const year = calendarData.year
	const days = []
	for (let i = 0; i < week.days.length; i++) {
		const key = year + "-" + week.kw + "-" + i
		days.push(<CalendarDay key={key} day={week.days[i]} highlight={highlight} />)
	}
	return (
		<>
			<div className={grey}>{String(week.kw).padStart(2, "0")}</div>
			{days}
		</>)
}

const CalendarDay = ({ day, highlight }) => {
	if (!day.day) {
		return <div />
	}
	const hl = highlight.has(day.day.toString())
	const classes = classNames(
		"px-1",
		"justify-self-end",
		hl && "bg-yellow-300",
		hl && "dark:bg-indigo-800",
	)
	const text = String(day.day?.dayOfMonth()).padStart(2, " ")
	return <div className={classes}><pre>{text}</pre></div>
}
