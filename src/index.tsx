/* eslint-disable no-console */
/* eslint-disable import/no-duplicates */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StateContext } from "./context/StateContext";

ReactDOM.render(
  <StateContext>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </StateContext>,
  document.getElementById("root")
);
