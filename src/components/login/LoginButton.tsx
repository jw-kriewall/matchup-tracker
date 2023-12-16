import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useStore } from 'react-redux';
import { StandardAction } from '../../types/StandardAction';
import { getMatchups } from '../../apiCalls/getMatchups';
import { DecodedJwtToken } from '../../types/DecodedJwtToken';
import jwt_decode from 'jwt-decode';
import { OAuth2Response } from '../../types/OAuth2Response';
import { useAppDispatch } from '../../hooks/hooks';
import { loginAction } from '../../actions/userActions';
import { User } from '../../types/Matchup';

export default function LoginButton() {

    const dispatch = useAppDispatch();

    const onSuccess = (res: CredentialResponse) => {
        console.log("Login Successful! Current user: " + JSON.stringify(res))
        localStorage.setItem("user", JSON.stringify(res))

        dispatch(loginAction(res));
        dispatch(getMatchups(res));
        
        // TODO: close modal
    }
    const onError = (res: any) => {
        console.log("Login Failed Res: " + JSON.stringify(res))
    }
    return(
    
            <GoogleLogin
                // clientId={clientId}
                // buttonText="Login"
                onSuccess={onSuccess}
                onError={() => onError}
                // cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
            />
    
    )
}