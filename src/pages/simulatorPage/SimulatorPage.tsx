import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import TournamentSimulator from "../../components/tournamentSimulator/TournamentSimulator";
import { useCookies } from "react-cookie";
import "./SimulatorPage.css";
import PublicFaq from "../../components/publicFaq/PublicFaq";
import { getDecksForFormat } from "../../components/shared/getDecksForFormat";

export default function SimulatorPage() {
  const [cookies] = useCookies(["format"]);
  const initialDecks = getDecksForFormat(cookies.format).map((deck) => deck.value);
  // const [selectedDecks, setSelectedDecks] = useState<string[]>(initialDecks);
  const [userCookies] = useCookies(["user"]);
  const user = userCookies["user"];

  if (!user) {
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
          <TournamentSimulator user={user} filteredDecks={initialDecks} format={cookies.format} />
        </div>
      </div>
    </div>
  );
}
