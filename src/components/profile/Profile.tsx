import { Avatar, Box, IconButton } from "@mui/material";
import { CredentialResponse } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import XIcon from "@mui/icons-material/X";
import LogoutButton from "../login/LogoutButton";
import jwt_decode from "jwt-decode";
import { DecodedJwtToken } from "../../types/DecodedJwtToken";

export function Profile() {
	const [userCookies] = useCookies(["user"]);
	const user: CredentialResponse = userCookies["user"]?.payload;
	let userPicture = "";

	if (user && user.credential) {
		let decodedToken: DecodedJwtToken | null = null;
		decodedToken = jwt_decode<DecodedJwtToken>(user.credential);

		userPicture = decodedToken.picture;
	}

	const handleClick = () => {
		console.log(userPicture);
	};

	return (
		<>
			<IconButton onClick={handleClick}>
                <Avatar alt="User Pic" src={userPicture}/>
			</IconButton>

			
		</>
	);
}


{/* <LogoutButton /> */}
