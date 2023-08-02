import { GoogleLogin } from 'react-google-login';

// spring.security.oauth2.client.registration.google.clientSecret=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
const clientId = "946171427391-9q1lkna1ibpgq49g2fivl8m2edg6304a.apps.googleusercontent.com";

export default function Login() {
    const onSuccess = (res) => {
        console.log("Login Successful! Current user: " + res.profileObj)
    }
    const onFailure = (res) => {
        console.log("Login Failed Res: " + res)
    }
    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}