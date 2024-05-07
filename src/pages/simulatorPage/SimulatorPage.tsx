import React, { useEffect, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import TournamentSimulator from "../../components/tournamentSimulator/TournamentSimulator";
import { useCookies } from "react-cookie";
import "./SimulatorPage.css";
import PublicFaq from "../../components/publicFaq/PublicFaq";
import { getDecksForFormat } from "../../components/shared/getDecksForFormat";
import { useSelector } from "react-redux";
import { selectUserDeckDisplays } from "../../redux/DeckDisplaySlice";
import { getUserDeckDisplay } from "../../apiCalls/deckDisplay/getUserDeckDisplay";
import { useAppDispatch } from "../../hooks/hooks";

export default function SimulatorPage() {
  const userDeckDisplays = useSelector(selectUserDeckDisplays);
  const dispatch = useAppDispatch();
  
  const [cookies] = useCookies(["user", "format"]);
  const userToken = cookies.user;
  const format = cookies.format;

  useEffect(() => {
    if(userToken && userDeckDisplays.length === 0) {
      dispatch(getUserDeckDisplay({ userToken, format}))
      .catch((error) => console.error("Failed to fetch user deck displays:", error));
    }
  }, [userToken, dispatch, userDeckDisplays.length, format]);

  const initialDecks = getDecksForFormat(format).map(deck => deck.value)
    .concat(userDeckDisplays.map(deck => deck.label))
    .sort((a, b) => a.localeCompare(b));

  if (!userToken) {
    return (
      <div>
        <div className="navigation">
          <NavBar />
        </div>
        <PublicFaq/>
      </div>
    );
  }

  return (
    <div>
      <div className="navigation">
        <NavBar />
      </div>

      <div className="bento-box-sim">
        <div className="data-table-sim">
          <TournamentSimulator userToken={userToken} filteredDecks={initialDecks} format={cookies.format} />
        </div>
      </div>
    </div>
  );
}
