/*
 * src/store.js
 */

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import rootReducer from "./_reducers/rootReducer";

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const configureStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk, logger)
  );
};

export { configureStore, saveToLocalStorage };
