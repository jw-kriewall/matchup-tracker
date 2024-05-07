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
import { DeckDisplay } from "../../types/MatchupModels";

export default function SimulatorPage() {
  const dispatch = useAppDispatch();
  
  const [cookies] = useCookies(["user", "format"]);
  const userToken = cookies.user;
  const format = cookies.format;

  const userDeckDisplays = useSelector(selectUserDeckDisplays);
  const decks: DeckDisplay[] = getDecksForFormat(format);
  const allDecks = decks.concat(userDeckDisplays).map(deck => deck.value).sort((a, b) => a.localeCompare(b));

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
          <TournamentSimulator userToken={userToken} filteredDecks={allDecks} format={cookies.format} />
        </div>
      </div>
    </div>
  );
}
