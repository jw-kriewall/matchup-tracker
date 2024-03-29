import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import TablePage from "./pages/tablePage/TablePage";
import SimulatorPage from "./pages/simulatorPage/SimulatorPage";
import SessionManagement from "./components/sessionManagement/SessionManagement";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SessionManagement>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/data" element={<TablePage />} />
              <Route path="/simulator" element={<SimulatorPage />} />
            </Routes>
          </BrowserRouter>
        </SessionManagement>
      </ThemeProvider>
    </>
  );
}

export default App;
