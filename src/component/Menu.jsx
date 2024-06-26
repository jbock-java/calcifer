import classNames from "classnames"
import { getFerien } from "../data/ferien"
import { calendarSlice } from "../store/calendarSlice"
import { useDispatch } from "react-redux"

export default function Menu() {
	const dispatch = useDispatch()
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
		dispatch(calendarSlice.actions.setCalendarData({
			year: e.target.value,
			highlight: getFerien("niedersachsen", e.target.value).join("\n"),
		}))
	}

	return (
		<select className={classes} onChange={handleChange}>
			<option className="p-1" value=""></option>
			<option className="p-1" value="2024">2024</option>
			<option className="p-1" value="2024u">2024u</option>
			<option className="p-1" value="2025">2025</option>
		</select>
	)
}
