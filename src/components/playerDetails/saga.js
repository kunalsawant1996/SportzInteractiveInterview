import { put, all, call, takeLatest } from "redux-saga/effects";
import { requestDetails } from '../../helpers/client.interceptor';
import { urls } from '../../helpers/urls';
import { playerSuccess, playerError} from "./actions";
import { PLAYER_REQUESTING  } from "../../constants.js";

//player API call
function playerCall() {
  return requestDetails('get', urls.PLAYER_URL);
}

// player Worker
function* playerWorker() {
  try {
    let response = yield call(playerCall);
    response = response.data;
    yield put(playerSuccess(response));
    // yield call(browserRedirect, '/');
  } catch (err) {
    yield put(playerError(err));
  }
}

// player Watcher
export default function* playerSaga() {
  yield all([
    takeLatest(PLAYER_REQUESTING, playerWorker),
  ]);
}