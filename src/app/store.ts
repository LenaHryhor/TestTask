import {configureStore} from '@reduxjs/toolkit';
import operatorsDataReducer from "../features/operators/operatorsDataSlice";

export const store = configureStore({
    reducer:
        {
            operatorsData: operatorsDataReducer,
        },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
