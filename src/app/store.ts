import {configureStore} from '@reduxjs/toolkit';
import ordersTableReducer from "../features/operators/ordersTableSlice";

export const store = configureStore({
    reducer:
        {
            ordersTable: ordersTableReducer,
        },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
