import { all } from "redux-saga/effects";
import playerSaga from "../../components/playerDetails/saga";

export function* mainSaga() {
    yield all([
        playerSaga()
    ]);
}