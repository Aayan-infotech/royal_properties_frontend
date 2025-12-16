import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { AlertProvider } from "./context/alertContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <HeroUIProvider locale="en-US">
        <App />
      </HeroUIProvider>
    </AlertProvider>
  </React.StrictMode>
);
