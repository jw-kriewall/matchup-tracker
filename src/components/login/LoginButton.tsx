import { GoogleLogin } from '@react-oauth/google';
import { useStore } from 'react-redux';
import { StandardAction } from '../../types/StandardAction';
import { getMatchups } from '../../apiCalls/getMatchups';
import { DecodedJwtToken } from '../../types/DecodedJwtToken';
import jwt_decode from 'jwt-decode';
import { OAuth2Response } from '../../types/OAuth2Response';
import { useAppDispatch } from '../../hooks/hooks';


export default function LoginButton() {

    const store = useStore();
    // const userState = useSelector((state) => state.user); 

    const onSuccess = (res: any) => {
        console.log("Login Successful! Current user: " + JSON.stringify(res))
        localStorage.setItem("user", JSON.stringify(res))
        
        let action: StandardAction = { 
            type: "LOGIN", 
            payload: res
        }

        store.dispatch(action);
    
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