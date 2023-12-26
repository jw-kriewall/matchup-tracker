import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { getMatchups } from '../../apiCalls/matchups/getMatchups';
import { useAppDispatch } from '../../hooks/hooks';
import { loginAction, logoutAction } from '../../actions/userActions';

export default function GoogleLoginButton({closeModal}: any) {
    const dispatch = useAppDispatch();

    const onSuccess = (res: CredentialResponse) => {
        console.log("Google login Successful! Current user: " + JSON.stringify(res))
        localStorage.setItem("user", JSON.stringify(res))

        dispatch(loginAction(res));
        dispatch(getMatchups(res));

        const loginTime = new Date().getTime();

        const checkInterval = setInterval(() => {
            const currentTime = new Date().getTime();

            if (currentTime - loginTime >=  60 * 60 * 1000) {
                dispatch(logoutAction());
                clearInterval(checkInterval);
                window.location.href = "/";
            }
        }, 1000);

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