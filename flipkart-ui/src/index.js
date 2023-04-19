/*
 * Author: Ruchitesh Malukani
 * Modified By: Ruchitesh Malukani
 * Last Modified: Wednesday, 5th April 2023
 * -----
 * Copyright (c) 2023 Ruchitesh Malukani
 */
import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import oidcConfig from "./services/oidcConfig";

export const KeycloakContext = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
