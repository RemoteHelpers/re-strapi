import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StateContext } from "./context/StateContext";

import "./index.scss";

ReactDOM.render(
  <StateContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateContext>,
  document.getElementById("root")
);
