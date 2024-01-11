import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CalendarData {
  year: string;
  highlight: string;
}

interface CalendarSlice {
  calendarData: CalendarData;
}

const initialState: CalendarSlice = {
  calendarData: {
    year: '2024',
    highlight: '2024-02-03\n2024-02-04\n2024-03-01_2024-03-10',
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
