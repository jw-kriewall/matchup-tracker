import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/homePage/HomePage";
import TablePage from "./pages/tablePage/TablePage";
import SessionManagement from "./components/sessionManagement/SessionManagement";

function App() {
	return (
		<>
			<SessionManagement>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/data" element={<TablePage />} />
					</Routes>
				</BrowserRouter>
			</SessionManagement>
		</>
	);
}

export default App;
