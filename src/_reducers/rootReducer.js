/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from "redux";
import posts from "./postReducer";
import user from "./userReducer";

export default combineReducers({
  posts,
  user,
});
