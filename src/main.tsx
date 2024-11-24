import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/bill-splitting-app">
      <App />
      <ToastContainer position="top-right" autoClose={1500} />
    </BrowserRouter>
  </React.StrictMode>
);
