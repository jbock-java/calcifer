import { createSlice } from "@reduxjs/toolkit"

export const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		calendarData: {
			year: "2024",
			highlight: "2024-02-03\n2024-02-04\n2024-03-01_2024-03-10",
		},
	},
	reducers: {
		setCalendarData: (state, action) => {
			let payload = action.payload
			state.calendarData = payload
		},
	},
});
