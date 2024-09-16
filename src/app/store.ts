import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import operatorsDataReducer from "../features/operators/operatorsDataSlice";
import rootSaga from "./rootSagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:
        {
            operatorsData: operatorsDataReducer,
        },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
