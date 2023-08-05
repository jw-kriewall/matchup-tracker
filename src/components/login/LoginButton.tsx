import { GoogleLogin } from '@react-oauth/google';
import { useStore } from 'react-redux';
import { StandardAction } from '../../types/StandardAction';



export default function LoginButton() {

    // const dispatch = useDispatch();
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
                onError={() => console.log('Login failed')}
                // cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
            />
    
    )
}