import React, { useEffect } from "react";
import MatchupForm from "../../components/matchups/matchupForm/MatchupForm";
import PublicFaq from "../../components/publicFaq/PublicFaq";
import NavBar from "../../components/navBar/NavBar";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getUserDeckDisplay } from "../../apiCalls/deckDisplay/getUserDeckDisplay";
import "./HomePage.css";
import { useSelector } from "react-redux";
import { selectUserDeckDisplays } from "../../redux/DeckDisplaySlice";

export default function HomePage() {
  const [userCookies] = useCookies(["user"]);
  const userToken: string = userCookies["user"];
  const [cookies] = useCookies(["format"]);
  const dispatch = useAppDispatch();

  const userDeckDisplays = useSelector(selectUserDeckDisplays);

  useEffect(() => {
    if (userToken && userDeckDisplays.length === 0) {
      const format: string = cookies.format;
      dispatch(getUserDeckDisplay({ userToken, format }))
        .catch((error) => console.error("Failed to fetch user deck displays:", error));
    }
  }, [userToken, dispatch, userDeckDisplays.length, cookies.format]);

  if (!userToken) {
    return (
      <div>
        <div className="navigation">
          <NavBar />
        </div>
        <PublicFaq />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="navigation">
        <NavBar />
      </div>
      <div className="matchup-form">
        <MatchupForm userDeckDisplays={userDeckDisplays} />
      </div>
    </div>
  );
}
