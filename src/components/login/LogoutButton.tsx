import { Button } from "@mui/material";
import { resetMatchups } from "../../actions/matchupActions";
import { logoutAction } from "../../actions/userActions";
import { useAppDispatch } from "../../hooks/hooks";

export default function LogoutButton() {
	const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutAction());
        dispatch(resetMatchups());
    }

    return(
        <Button color="inherit" onClick={() => handleLogout()}>
			Logout
		</Button>
    )
}