import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice } from './calendarSlice';

export const store = configureStore({
    reducer: {
        routing: calendarSlice.reducer,
    }
});

// https://redux-toolkit.js.org/tutorials/typescript
// https://react-redux.js.org/using-react-redux/usage-with-typescript

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

