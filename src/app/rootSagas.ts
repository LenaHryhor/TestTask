import { all } from "redux-saga/effects";
import operatorsSagas from "../features/operators/operatorsSagas";

const rootSaga = function* () {
    yield all([
        operatorsSagas(),
    ]);
};

export default rootSaga;