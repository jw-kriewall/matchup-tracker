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
import { DecodedJwtToken } from "../../types/DecodedJwtToken";
import jwt_decode from "jwt-decode";
import { Button } from "@mui/material";

export default function GoogleLoginButton({ closeModal }: any) {
	// const dispatch = useAppDispatch();
	// const [cookies, setCookie] = useCookies(["userRole", "user", "format"]);

	// const onSuccess = async (res: CredentialResponse) => {
	//   // console.log("Google login Successful! Current user: ", res);
	//   try {
	//     const user = await dispatch(loginAction(res));
	//     const userJSON = JSON.stringify(user);

	//     let role = await dispatch(getUserRole(res));
	//     setCookie("userRole", role, { path: "/", maxAge: 3600 });
	//     setCookie("user", userJSON, { path: "/", maxAge: 3600 });

	//     if(!cookies.format) {
	//       setCookie("format", "BRS-TEF", { path: "/", maxAge: 3600 * 24 * 30 }); // Max Age: 30 days
	//     }

	//     dispatch(getMatchups({ user: res, format: cookies.format }));
	//     closeModal();
	//   } catch (error) {
	//     console.error("Error in login process: ", error);
	//   }
	// };

	// const onError = (error: any) => {
	//   console.error("Login Failed: ", error);
	// };

	// return (
	//   <GoogleLogin
	//     // clientId={clientId}
	//     // buttonText="Login"
	//     // useOneTap={true}
	//     onSuccess={onSuccess}
	//     onError={() => onError}
	//     // cookiePolicy={'single_host_origin'}
	//     // isSignedIn={true}
	//   />
	// );

	const apiUrl = process.env.REACT_APP_API_URL;
	const version = process.env.REACT_APP_API_VERSION;

	const dispatch = useAppDispatch();
	const [cookies, setCookie] = useCookies(["userRole", "user", "format"]);
	const [error, setError] = useState<String>("");

	const login = useGoogleLogin({
		onSuccess: async (credentialResponse) => {
			console.log(credentialResponse);
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
							body: JSON.stringify({ code: credentialResponse.code }),
						}
					);
					const data: GoogleDataJson = await response.json();
					console.log("DATA: " + JSON.stringify(data));

					if (!response.ok) {
						throw new Error("Failed to login");
					}

					// const token: DecodedJwtToken = jwt_decode(data.id_token);
					// Assuming the server response includes user information, roles, etc.
					const user = await dispatch(loginAction(data));
					const userJSON = JSON.stringify(user.payload);
					let role = await dispatch(getUserRole(data));

					setCookie("userRole", role, { path: "/", maxAge: 3600 });
					setCookie("user", userJSON, { path: "/", maxAge: 3600 });

					if (!cookies.format) {
						setCookie("format", "BRS-TEF", {
							path: "/",
							maxAge: 3600 * 24 * 30,
						}); // Max Age: 30 days
					}

					dispatch(getMatchups({ user: data, format: cookies.format }));
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
			<Button onClick={() => login()}>Login with Google</Button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}
