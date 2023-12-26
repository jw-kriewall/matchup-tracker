import { GoogleLogout } from 'react-google-login';

//@TODO: Remove client id here.
const clientId = "946171427391-9q1lkna1ibpgq49g2fivl8m2edg6304a.apps.googleusercontent.com";

export default function Logout() {
    const onSuccess = () => {
        // userAuth/logout
        console.log("Logout successful!");
    }
    
    return(
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}