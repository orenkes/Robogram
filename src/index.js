import React from "react";
import ReactDOM from "react-dom";
import { GlobalProvider } from "./state/GlobalContext";

import App from "./view/App";

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById("root")
);
