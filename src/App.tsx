import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Box, CssBaseline } from "@mui/material";
import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter />
      {/* <ModalComponent /> */}
    </div>
  );
}

export default App;
