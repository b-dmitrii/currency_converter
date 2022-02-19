import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createAPI from "./api/api";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./components/store/reducer";

import App from "./components/app/app";

import "./index.scss";

const api = createAPI();

const store = createStore(
  reducer,
  compose(applyMiddleware(thunk.withExtraArgument(api)))
);
console.log(store);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(`root`)
);
