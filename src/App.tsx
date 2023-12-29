import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import TablePage from "./pages/tablePage/TablePage";
import SessionManagement from "./components/sessionManagement/SessionManagement";
// import {
// 	ThemeProvider,
// 	createMuiTheme,
// 	makeStyles,
// } from "@mui/core/styles";

// const theme = createMuiTheme();

// const useStyles = makeStyles((theme: any) => {
// 	root: {
// 		// some CSS that accesses the theme
// 	}
// });

function App() {
	return (
		<>
			{/* <ThemeProvider theme={theme}> */}
				<SessionManagement>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/data" element={<TablePage />} />
						</Routes>
					</BrowserRouter>
				</SessionManagement>
			{/* </ThemeProvider> */}
		</>
	);
}

export default App;
