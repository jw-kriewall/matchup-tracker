import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../hooks/hooks";
import { loginAction } from "../../actions/userActions";
import { getUserRole } from "../../apiCalls/users/getUserRole";
import { getMatchups } from "../../apiCalls/matchups/getMatchups";
import { useCookies } from "react-cookie";

export default function GoogleLoginButton({ closeModal }: any) {
  const dispatch = useAppDispatch();
  const [, setCookie] = useCookies(["userRole"]);
  const [, setUserCookie] = useCookies(["user"]);

  // const [userCookies] = useCookies(["user"]);
  //const user = useCookies["user"]?.payload;

  const onSuccess = async (res: CredentialResponse) => {
    // console.log("Google login Successful! Current user: ", res);
    //@TODO: remove localStorage user................
    //localStorage.setItem("user", JSON.stringify(res));
    

    try {
      const user = await dispatch(loginAction(res));
      const userJSON = JSON.stringify(user);

      let role = await dispatch(getUserRole(res));
      setCookie("userRole", role, { path: "/", maxAge: 3600 });
      setUserCookie("user", userJSON, { path: "/", maxAge: 3600 });

      dispatch(getMatchups(res));
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
