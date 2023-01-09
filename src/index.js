import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import AuthProvider from "./context/auth";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
