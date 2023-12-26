import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { getMatchups } from '../../apiCalls/matchups/getMatchups';
import { useAppDispatch } from '../../hooks/hooks';
import { loginAction } from '../../actions/userActions';

export default function GoogleLoginButton({closeModal}: any) {
    const dispatch = useAppDispatch();

    const onSuccess = (res: CredentialResponse) => {
        console.log("Google login Successful! Current user: " + JSON.stringify(res))
        localStorage.setItem("user", JSON.stringify(res))

        dispatch(loginAction(res));
        dispatch(getMatchups(res));
        //@TODO: Logout timer....
        const signOutTime = new Date().getTime() + (60 * 60 * 1000);
        localStorage.setItem('signOutTime', signOutTime.toString());
        closeModal();
    }
    const onError = (res: any) => {
        console.log("Login Failed Res: " + JSON.stringify(res))
        throw res
    }
    return(
    
            <GoogleLogin
                // clientId={clientId}
                // buttonText="Login"
                // useOneTap={true}
                onSuccess={onSuccess}
                onError={() => onError}
                // cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
            />
    
    )
}