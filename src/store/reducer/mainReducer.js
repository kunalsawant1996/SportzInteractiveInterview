import { combineReducers } from "redux";
import playerReducer from "../../components/playerDetails/reducer";

export const mainReducer = combineReducers({
  playerDetails: playerReducer
});
