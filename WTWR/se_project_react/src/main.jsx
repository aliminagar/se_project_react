import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // or whatever your main CSS file is
import App from "./components/App/App"; // adjust path if needed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      basename={
        import.meta.env.MODE === "production" ? "/se_project_react" : "/"
      }
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
