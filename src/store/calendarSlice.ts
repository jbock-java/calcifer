import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CalendarSlice {
  currentMonth: string;
}

const initialState: CalendarSlice = {
  currentMonth: "2023-10",
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMonth: (state: CalendarSlice, action: PayloadAction<string>) => {
      state.currentMonth = action.payload;
    },
  },
});
