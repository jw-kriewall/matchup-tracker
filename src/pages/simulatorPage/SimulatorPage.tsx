import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { ALL_DECKS_CONSTANT } from "../../constants/allDecks";
import TournamentSimulator from "../../components/tournamentSimulator/TournamentSimulator";
import { useCookies } from "react-cookie";
import "./SimulatorPage.css";
import PublicFaq from "../../components/publicFaq/PublicFaq";

export default function SimulatorPage() {
  const initialDecks = ALL_DECKS_CONSTANT.map((deck) => deck.value);
  // const [selectedDecks, setSelectedDecks] = useState<string[]>(initialDecks);
  const [userCookies] = useCookies(["user"]);
  const user = userCookies["user"]?.payload;

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
          <TournamentSimulator user={user} filteredDecks={initialDecks} />
        </div>
      </div>
    </div>
  );
}
