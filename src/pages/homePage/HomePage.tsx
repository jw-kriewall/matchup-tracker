import React, { useEffect } from "react";
import MatchupForm from "../../components/matchups/matchupForm/MatchupForm";
import PublicFaq from "../../components/publicFaq/PublicFaq";
import NavBar from "../../components/navBar/NavBar";
import { useCookies } from "react-cookie";
import { DeckDisplay } from "../../types/MatchupModels";
import { getUserDeckDisplay } from "../../apiCalls/users/getUserDeckDisplay";
import { useAppDispatch } from "../../hooks/hooks";
import "./HomePage.css";
import { GoogleDataJson } from "../../types/GoogleDataJson";

export default function HomePage() {
  const [userCookies] = useCookies(["user"]);
  const user: GoogleDataJson = userCookies["user"];

  const [userDeckDisplays, setUserDeckDisplays] = React.useState<DeckDisplay[]>(
    []
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // @TODO: persist this if possible. Currently calling the api everytime the home page is hit.
    if (user && userDeckDisplays.length === 0) {
      dispatch(getUserDeckDisplay(user))
        .unwrap() // Unwrap is used to extract the payload from the fulfilled action
        .then((deckDisplays) => setUserDeckDisplays(deckDisplays))
        .catch((error) =>
          console.error("Failed to fetch user deck displays:", error)
        );
    }
  }, [user, dispatch, userDeckDisplays.length]);

  if (!user) {
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
