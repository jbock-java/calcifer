import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CalendarSlice {
  start: string;
  highlight: string[];
}

const initialState: CalendarSlice = {
  start: '2024-01-01',
  highlight: ['2024-02-03', '2024-02-04'],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setStart: (state: CalendarSlice, action: PayloadAction<string>) => {
      const payload = action.payload;
      state.start = payload;
    },
  },
});
