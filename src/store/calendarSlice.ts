import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CalendarSlice {
  year: number;
  highlight: Set<string>;
}

const initialState: CalendarSlice = {
  year: 2024,
  highlight: new Set(['2024-02-03', '2024-02-04']),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setYear: (state: CalendarSlice, action: PayloadAction<number>) => {
      const payload = action.payload;
      state.year = payload;
    },
  },
});
