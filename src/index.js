import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { configureStore, saveToLocalStorage } from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
