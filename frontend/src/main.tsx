import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Design System & Modular Stylesheets
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/homepage.css";
import "./styles/products.css";
import "./styles/authentication.css";
import "./styles/cart.css";
import "./styles/admin.css";
import "./styles/responsive.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
