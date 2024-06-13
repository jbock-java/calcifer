import { configureStore } from "@reduxjs/toolkit"
import { calendarSlice } from "./calendarSlice"

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
    }
})
