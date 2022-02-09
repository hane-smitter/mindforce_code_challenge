import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import "@fontsource/roboto";
import { StyledEngineProvider } from "@mui/material/styles";

import store from "./redux/store";
import App from "./App";

ReactDom.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>,
  document.getElementById("root")
);