import { Button } from "@mui/material";
import { logoutAction } from "../../actions/userActions";
import { useAppDispatch } from "../../hooks/hooks";

export default function LogoutButton() {
	const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutAction());
        // dispatch(resetMatchups());
        // should I be doing something different here?
        window.location.reload();

        // dispatch(logoutAction())
        //     .then(() => {
        //         // The action has completed
        //         window.location.reload();
        //     })
        //     .catch((error) => {
        //         // Handle any errors
        //     });
    }

    return(
        <Button color="inherit" onClick={() => handleLogout()}>
			Logout
		</Button>
    )
}