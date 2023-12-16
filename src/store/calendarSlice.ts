import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CalendarSlice {
  days: string[];
}

const initialState: CalendarSlice = {
  days: ['2012-12-24', '2012-12-25'],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMonth: (state: CalendarSlice, action: PayloadAction<string[]>) => {
      const payload = action.payload;
      state.days = payload;
    },
  },
});
