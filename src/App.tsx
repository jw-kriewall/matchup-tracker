import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import TablePage from "./pages/TablePage";

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
