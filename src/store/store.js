import { createStore, applyMiddleware,compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { mainReducer } from "./reducer/mainReducer";
import { mainSaga } from "./saga/mainSaga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(mainSaga);

export default store;