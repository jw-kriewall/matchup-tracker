import {
	useGoogleLogin,
} from "@react-oauth/google";
import { useAppDispatch } from "../../hooks/hooks";
import { loginAction } from "../../actions/userActions";
import { getUserRole } from "../../apiCalls/users/getUserRole";
import { getMatchups } from "../../apiCalls/matchups/getMatchups";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { GoogleDataJson } from "../../types/GoogleDataJson";
import { Button } from "@mui/material";

export default function GoogleLoginButton({ closeModal }: any) {
	const apiUrl = process.env.REACT_APP_API_URL;
	const version = process.env.REACT_APP_API_VERSION;

	const dispatch = useAppDispatch();
	const [cookies, setCookie] = useCookies(["userRole", "user", "format", "refresh-token"]);
	const [error, setError] = useState<String>("");

	const login = useGoogleLogin({
		onSuccess: async (credentialResponse) => {
			if (credentialResponse.code) {
				try {
					// Send the code to the server
					const response = await fetch(
						`${apiUrl}/api/${version}/code-for-tokens`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							// credentials: 'include',
							body: JSON.stringify({ code: credentialResponse.code }),
						}
					);
					
					if (!response.ok) {
						throw new Error("Failed to login");
					}
					
					const data: GoogleDataJson = await response.json();

					const user = await dispatch(loginAction(data.id_token));
					const userJSON = JSON.stringify(user.payload);
					let role = await dispatch(getUserRole(data.id_token));

					setCookie("userRole", role.payload, { path: "/", maxAge: 3600 });
					setCookie("user", userJSON, { path: "/", maxAge: 3600 });
					setCookie("refresh-token", data.refresh_token, { path: "/", maxAge: 3600 * 24 * 30 });

					if (!cookies.format) {
						setCookie("format", "BRS-SCR", {
							path: "/",
							maxAge: 3600 * 24 * 30,
						}); // Max Age: 30 days
					}

					dispatch(getMatchups({ userToken: data.id_token, format: cookies.format }));
					closeModal();
				} catch (error) {
					console.error("Login Error", error);
					setError("Login failed. Please try again.");
				}
			}
		},
		onError: () => {
			console.log("Login Failed");
			setError("Login failed. Please try again!");
		},
		flow: "auth-code",
	});

	return (
		<div>
			<Button variant="outlined" onClick={() => login()}>Login with Google</Button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}
