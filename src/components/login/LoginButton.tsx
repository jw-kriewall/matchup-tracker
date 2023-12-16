import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { getMatchups } from '../../apiCalls/getMatchups';
import { useAppDispatch } from '../../hooks/hooks';
import { loginAction } from '../../actions/userActions';

export default function LoginButton({closeModal}: any) {

    const dispatch = useAppDispatch();

    const onSuccess = (res: CredentialResponse) => {
        console.log("Login Successful! Current user: " + JSON.stringify(res))
        localStorage.setItem("user", JSON.stringify(res))

        dispatch(loginAction(res));
        dispatch(getMatchups(res));
        
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