import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CalendarData {
  year: number;
  highlight: string;
}

interface CalendarSlice {
  calendarData: CalendarData;
}

const initialState: CalendarSlice = {
  calendarData: {
    year: 2024,
    highlight: '2024-02-03 2024-02-04',
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarData: (state: CalendarSlice, action: PayloadAction<CalendarData>) => {
      const payload = action.payload;
      state.calendarData = payload;
    },
  },
});
