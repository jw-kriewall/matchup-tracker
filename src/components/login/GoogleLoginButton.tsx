import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../hooks/hooks";
import { loginAction } from "../../actions/userActions";
import { getUserRole } from "../../apiCalls/users/getUserRole";
import { getMatchups } from "../../apiCalls/matchups/getMatchups";
import { useCookies } from "react-cookie";

export default function GoogleLoginButton({ closeModal }: any) {
  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies(["userRole", "user", "format"]);

  const onSuccess = async (res: CredentialResponse) => {
    console.log("Google login Successful! Current user: ", res);
    try {
      const user = await dispatch(loginAction(res));
      const userJSON = JSON.stringify(user);

      let role = await dispatch(getUserRole(res));
      setCookie("userRole", role, { path: "/", maxAge: 3600 });
      setCookie("user", userJSON, { path: "/", maxAge: 3600 });

      if(!cookies.format) {
        setCookie("format", "BRS-TEF", { path: "/", maxAge: 3600 * 24 * 30 }); // Max Age: 30 days
      }

      dispatch(getMatchups({ user: res, format: cookies.format }));
      closeModal();
    } catch (error) {
      console.error("Error in login process: ", error);
    }
  };

  const onError = (error: any) => {
    console.error("Login Failed: ", error);
  };

  return (
    <GoogleLogin
      // clientId={clientId}
      // buttonText="Login"
      // useOneTap={true}
      onSuccess={onSuccess}
      onError={() => onError}
      // cookiePolicy={'single_host_origin'}
      // isSignedIn={true}
    />
  );
}
