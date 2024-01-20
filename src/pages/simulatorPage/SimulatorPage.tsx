import React, { useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import { allDecksConstant } from "../../constants/allDecks";
import TournamentSimulator from "../../components/tournamentSimulator/TournamentSimulator";
import { useCookies } from "react-cookie";

export default function SimulatorPage() {
  const initialDecks = allDecksConstant.map((deck) => deck.value);
  // const [selectedDecks, setSelectedDecks] = useState<string[]>(initialDecks);
  const [userCookies] = useCookies(["user"]);
  const user = userCookies["user"]?.payload;

  if (!user) {
    return (
      <div>
        <div className="navigation">
          <NavBar />
        </div>

        {/* TODO: Create a fun log in component */}
        <div>Please log in to view content.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="navigation">
        <NavBar />
      </div>

      <div className="bento-box">
        <TournamentSimulator user={user} />
      </div>
    </div>
  );
}
