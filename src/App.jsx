import { DayOfWeek, LocalDate, Month } from "@js-joda/core"
import { useEffect, useState } from "react"
import { CalendarMonth } from "./cal/CalendarMonth"
import { calendarSlice } from "./store/calendarSlice"
import { useDispatch, useSelector } from "react-redux"
import Menu from "./component/Menu.jsx"
import DarkModeToggle from "./component/DarkModeToggle.jsx"

export const App = () => {
	let calendarData = useSelector(store => store.calendar.calendarData)
	let year = calendarData.year.substring(0, 4)
	let highlight = calendarData.highlight
	let [currentYear, setCurrentYear] = useState(year)
	let [currentHighlight, setCurrentHighlight] = useState(highlight)
	useEffect(() => {
		setCurrentHighlight(highlight)
		setCurrentYear(String(year))
	}, [year, highlight])
	let dispatch = useDispatch()
	let months = createMonths(year)
	let updateHl = (e) => {
		e.preventDefault()
		dispatch(calendarSlice.actions.setCalendarData({
			year: currentYear,
			highlight: currentHighlight,
		}))
	}
	let hl = getHighlight(highlight)
	return (
		<div className="">
			<div className="mx-8 mt-4 mb-32">
				<div className="flex gap-3">
					<Menu />
					<DarkModeToggle />
				</div>
				<div className="grid grid-cols-[auto_auto_auto] gap-x-16 gap-y-8 place-content-start">{
					months.map(month => <CalendarMonth
						highlight={hl}
						key={'m-' + year + '-' + month.month.value()}
						month={month} />)
				}</div>
				<form onSubmit={(e) => updateHl(e)}>
					<input type="text"
						className="mt-8 border-2 w-16 p-1 text-black bg-white dark:text-white dark:bg-black"
						onChange={e => setCurrentYear(e.target.value)}
						value={currentYear} />
					<textarea
						className="mt-4 mb-6 p-1 w-full border-2 h-48 text-black bg-white dark:text-white dark:bg-black"
						onChange={e => setCurrentHighlight(e.target.value)}
						value={currentHighlight} />
					<button type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">OK</button>
				</form>
			</div>
		</div>)
}

const createMonths = (year) => {
	let kw = getFirstKw(year)
	let months = Month.values()
	let result = []
	for (let month of months) {
		let weeks = createWeeks(kw, year, month)
		result.push({ month, weeks })
		let lastWeek = weeks[weeks.length - 1]
		kw = lastWeek.kw
		if (lastWeek.days[lastWeek.days.length - 1].day) {
			kw++
		}
	}
	return result
}

const createWeeks = (startKw, year, month) => {
	let result = []
	let daysInMonth = getDaysInMonth(year, month)
	let date = 1
	let kw = startKw
	while (true) {
		let days = []
		let daysOfWeek = DayOfWeek.values()
		let anyDaysInWeek = false
		for (let dayOfWeek of daysOfWeek) {
			if (daysInMonth.has(dayOfWeek.value() + "-" + date)) {
				days.push({ day: LocalDate.of(Number(year), month.value(), date) })
				date++
				anyDaysInWeek = true
			} else {
				days.push({})
			}
		}
		if (anyDaysInWeek) {
			result.push({ kw, days })
			kw++
		} else {
			return result
		}
	}
}

const getDaysInMonth = (year, month) => {
	let result = new Set()
	let d = LocalDate.of(Number(year), month.value(), 1)
	while (d.month() === month) {
		result.add(d.dayOfWeek().value() + "-" + d.dayOfMonth())
		d = d.plusDays(1)
	}
	return result
}

const getFirstKw = (year) => {
	let d = LocalDate.of(Number(year), Month.JANUARY, 1)
	switch (d.dayOfWeek()) {
		case DayOfWeek.FRIDAY:
		case DayOfWeek.SATURDAY:
		case DayOfWeek.SUNDAY:
			return 0
		default:
			return 1
	}
}

const getHighlight = (highlight) => {
	let result = new Set()
	let tokens = highlight.split(/\s+/)
	for (let token of tokens) {
		let [von, bis] = token.split("_")
		result.add(von)
		if (bis) {
			let d = LocalDate.parse(von).plusDays(1)
			let b = LocalDate.parse(bis)
			while (!d.isAfter(b)) {
				result.add(d.toString())
				d = d.plusDays(1)
			}
		}
	}
	return result
}
