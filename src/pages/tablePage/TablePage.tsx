import React, { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import DeckFilter from "../../components/deckFilter/DeckFilter";
import NavBar from "../../components/navBar/NavBar";
import CountMatchups from "../../components/matchups/countMatchups/CountMatchups";
import { useCookies } from "react-cookie";
import "./TablePage.css";
import PublicFaq from "../../components/publicFaq/PublicFaq";
import { DeckDisplay } from "../../types/MatchupModels";
import { getDecksForFormat } from "../../components/shared/getDecksForFormat";

export default function TablePage() {
  const [cookies] = useCookies(["format"]);
  const allDecks: DeckDisplay[] = getDecksForFormat(cookies.format);
  // const allDecks = decks.map((deck) => deck.value);
  const [selectedDecks, setSelectedDecks] = useState<string[]>([]);
  const [userCookies] = useCookies(["user"]);
  const user = userCookies["user"]?.payload;

  useEffect(() => {
    const decks: DeckDisplay[] = getDecksForFormat(cookies.format);
    const initialDecks = decks.map((deck) => deck.value);
    setSelectedDecks(initialDecks);
  }, [cookies.format]);

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

      <div className="bento-box">
        <div className="left-column">
          <div className="matchup-count">
            <CountMatchups selectedDecks={selectedDecks} user={user} />
          </div>
          <div className="deck-filter">
            <DeckFilter
              selectedDecks={selectedDecks}
              onSelectedDecksChange={setSelectedDecks}
              allDecks={allDecks.map(deck => deck.value)}
            />
          </div>
        </div>
        <div className="data-table">
          <DataTable selectedDecks={selectedDecks} user={user} format={cookies.format}/>
        </div>
      </div>
    </div>
  );
}
