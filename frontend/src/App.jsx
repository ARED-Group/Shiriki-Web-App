//App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Components/i18n";
import AppRoutes from "./Routes/routes";
import { TimeProvider } from "./context/WifiTimeContext";

function App() {
  return (
    <TimeProvider>
      <div className="App bg-slate-800 h-screen ">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </TimeProvider>
  );
}

export default App;
