import React, { useEffect } from "react";
import MatchupForm from "../../components/matchups/matchupForm/MatchupForm";
import PublicFaq from "../../components/publicFaq/PublicFaq";
import NavBar from "../../components/navBar/NavBar";
import { useCookies } from "react-cookie";
import { DeckDisplay } from "../../types/MatchupModels";
import { getUserDeckDisplay } from "../../apiCalls/users/getUserDeckDisplay";
import { useAppDispatch } from "../../hooks/hooks";
import "./HomePage.css";

export default function HomePage() {
  const [userCookies] = useCookies(["user"]);
  const userToken: string = userCookies["user"];
  const [cookies, setCookie] = useCookies(["userRole", "user", "format", "refresh-token"]);

  const [userDeckDisplays, setUserDeckDisplays] = React.useState<DeckDisplay[]>(
    []
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // @TODO: persist this if possible. Currently calling the api every time the home page is hit.
    if (userToken && userDeckDisplays.length === 0) {
      const format: string = cookies.format
      dispatch(getUserDeckDisplay({userToken, format}))
        .unwrap() // Unwrap is used to extract the payload from the fulfilled action
        .then((deckDisplays) => setUserDeckDisplays(deckDisplays))
        .catch((error) =>
          console.error("Failed to fetch user deck displays:", error)
        );
    }
  }, [userToken, dispatch, userDeckDisplays.length]);

  if (!userToken) {
    return (
      <div >
        <div className="navigation">
          <NavBar />
        </div>
        <PublicFaq/>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="navigation">
        <NavBar />
      </div>

      {/* {userRole === "admin" ? <h1>admin</h1> : <h1>user</h1>} */}

      <div className="matchup-form">
        <MatchupForm userDeckDisplays={userDeckDisplays}/>
      </div>
    </div>
  );
}
