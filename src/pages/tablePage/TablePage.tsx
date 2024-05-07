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
import { useSelector } from "react-redux";
import { selectUserDeckDisplays } from "../../redux/DeckDisplaySlice";

export default function TablePage() {
  const [cookies] = useCookies(["format"]);
  const allDecks: DeckDisplay[] = getDecksForFormat(cookies.format);
  const [selectedDecks, setSelectedDecks] = useState<string[]>([]);
  const [userCookies] = useCookies(["user"]);
  const userToken: string = userCookies["user"];

  const userDeckDisplays = useSelector(selectUserDeckDisplays);
  // .concat(userDeckDisplays.map(deck => deck.label)).sort((a, b) => a.localeCompare(b)))

  useEffect(() => {
    const decks: DeckDisplay[] = getDecksForFormat(cookies.format);
    const initialDecks = decks.map((deck) => deck.value);
    setSelectedDecks(initialDecks);
  }, [cookies.format]);

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

      <div className="bento-box">
        <div className="left-column">
          <div className="matchup-count">
            <CountMatchups selectedDecks={selectedDecks} user={userToken} />
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
          {/* @TODO: Fix this */}
          <DataTable selectedDecks={selectedDecks.concat(userDeckDisplays.map(deck => deck.label)).sort((a, b) => a.localeCompare(b))} userToken={userToken} format={cookies.format}/>
        </div>
      </div>
    </div>
  );
}
