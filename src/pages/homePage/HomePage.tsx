import React, { useEffect } from "react";
import MatchupForm from "../../components/matchups/matchupForm/MatchupForm";
import NavBar from "../../components/navBar/NavBar";
import "./HomePage.css";
import { useCookies } from "react-cookie";
import { DeckDisplay } from "../../types/MatchupModels";
import { getUserDeckDisplay } from "../../apiCalls/users/getUserDeckDisplay";
import { useAppDispatch } from "../../hooks/hooks";

export default function HomePage() {
  const [userCookies] = useCookies(["user"]);
  const user = userCookies["user"]?.payload;

  const [userDeckDisplays, setUserDeckDisplays] = React.useState<DeckDisplay[]>(
    []
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getUserDeckDisplay(user))
        .unwrap() // Unwrap is used to extract the payload from the fulfilled action
        .then((deckDisplays) => setUserDeckDisplays(deckDisplays))
        .catch((error) =>
          console.error("Failed to fetch user deck displays:", error)
        );
    }
  }, [user, dispatch]);

  if (!user) {
    return (
      <div className="App">
        <div className="navigation">
          <NavBar />
        </div>

        {/* TODO: Create a fun log in component */}
        <div>Please log in to view content.</div>
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
