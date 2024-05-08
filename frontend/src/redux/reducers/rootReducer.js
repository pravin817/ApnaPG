import { combineReducers } from "redux";
import handleUser from "../reducers/userReducer";
import roomReducer from "./roomReducer";
import reservationsReducer from "./reservationsReducer";

const rootReducer = combineReducers({
  user: handleUser,
  room: roomReducer,
  reservations: reservationsReducer,
});

export default rootReducer;
