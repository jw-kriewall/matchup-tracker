import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/homePage/HomePage";
import TablePage from "./pages/tablePage/TablePage";
import { useAppDispatch } from "./hooks/hooks";
import { logoutAction } from "./actions/userActions";
import useUser from "./hooks/userHook";

function App() {

	// const dispatch = useAppDispatch();
	// const user = useUser();

	// useEffect(() => {
	// 	const checkUserLoggedIn = () => {
	// 		// Replace isLoggedIn with your actual logic to check if the user is logged in.
	// 		// This might be a check to local storage, cookies, or your Redux state.
	// 		const isLoggedIn = user?.credential
	// 		if (!isLoggedIn) {
	// 			dispatch(logoutAction());
	// 			// Optional: redirect to login page
	// 		}
	// 	};

	// 	// Set the interval to check every second
	// 	const interval = setInterval(checkUserLoggedIn, 1000);

	// 	// Clear the interval on cleanup
	// 	return () => clearInterval(interval);
	// }, [dispatch]);

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
