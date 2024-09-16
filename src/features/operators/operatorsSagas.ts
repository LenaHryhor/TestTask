import {all, call, put, takeLatest} from 'redux-saga/effects';
import {fetchOperatorAddons, fetchOperators} from "./operatorsAPI";
import {getOperators, getOperatorsError, getOperatorsSuccess} from "./operatorsDataSlice";
import {Operator, OperatorAddon} from "./types";

function* fetchOperatorsData() {
    try {
        const [operators, operatorAddons]: [Operator[], OperatorAddon[]] = yield all([
            call(fetchOperators),
            call(fetchOperatorAddons),
        ]);

        yield put(getOperatorsSuccess({operators, operatorAddons}));
    } catch (error) {
        yield put(getOperatorsError());
    }
}

function* watchGetOperators() {
    yield takeLatest(getOperators, fetchOperatorsData);
}

export default function* operatorsSagas() {
    yield all([
        watchGetOperators(),
    ]);
}