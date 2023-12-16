import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice } from './calendarSlice';

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
    }
});

// https://react-redux.js.org/using-react-redux/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
