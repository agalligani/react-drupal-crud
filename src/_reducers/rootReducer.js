/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import posts from "./postReducer";
import user from "./userReducer";

export default combineReducers({
  alertReducer,
  posts,
  user,
});
