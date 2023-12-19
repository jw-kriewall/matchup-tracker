import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./components/pages/HomePage";
import TablePage from "./components/pages/TablePage";

//const clientId = "946171427391-9q1lkna1ibpgq49g2fivl8m2edg6304a.apps.googleusercontent.com";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/data" element={<TablePage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
