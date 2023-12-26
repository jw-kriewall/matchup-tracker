import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/homePage/HomePage";
import TablePage from "./pages/tablePage/TablePage";
import { useAppDispatch } from "./hooks/hooks";
import { logoutAction } from "./actions/userActions";

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const signOutTimeStr: string | null = localStorage.getItem('signOutTime');

		if (signOutTimeStr) {
			const signOutTime: number = parseInt(signOutTimeStr, 10);
			const currentTime: number = new Date().getTime();
			const timeRemaining: number = signOutTime - currentTime;

			if (timeRemaining > 0) {
				// Set a timeout to sign the user out after the remaining time
				setTimeout(() => dispatch(logoutAction()), timeRemaining);
			} else {
				dispatch(logoutAction());
				window.location.reload();
			}
		}
	}, []);

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
