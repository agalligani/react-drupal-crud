import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MainNav from "./components/MainNav/MainNav";
import { configureStore, saveToLocalStorage } from "./store";
import { Provider } from "react-redux";

const store = configureStore();
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
