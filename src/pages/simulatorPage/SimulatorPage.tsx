import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import TournamentSimulator from "../../components/tournamentSimulator/TournamentSimulator";
import { useCookies } from "react-cookie";
import "./SimulatorPage.css";
import PublicFaq from "../../components/publicFaq/PublicFaq";
import { getDecksForFormat } from "../../components/shared/getDecksForFormat";
import { useSelector } from "react-redux";
import { selectUserDeckDisplays } from "../../redux/DeckDisplaySlice";

export default function SimulatorPage() {
  const [cookies] = useCookies(["format"]);
  const initialDecks = getDecksForFormat(cookies.format).map((deck) => deck.value);
  // const [selectedDecks, setSelectedDecks] = useState<string[]>(initialDecks);
  const [userCookies] = useCookies(["user"]);
  const userToken = userCookies["user"];

  const userDeckDisplays = useSelector(selectUserDeckDisplays);

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
          <TournamentSimulator userToken={userToken} filteredDecks={initialDecks.concat(userDeckDisplays.map(deck => deck.label)).sort((a, b) => a.localeCompare(b))} format={cookies.format} />
        </div>
      </div>
    </div>
  );
}
