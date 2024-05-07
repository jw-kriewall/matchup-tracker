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
import { getUserDeckDisplay } from "../../apiCalls/deckDisplay/getUserDeckDisplay";
import { useAppDispatch } from "../../hooks/hooks";

export default function TablePage() {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(["format"]);
  const [selectedDecks, setSelectedDecks] = useState<string[]>([]);
  const [userCookies] = useCookies(["user"]);
  const userToken: string = userCookies["user"];
  const format: string = cookies.format;

  const userDeckDisplays = useSelector(selectUserDeckDisplays);

  const decks: DeckDisplay[] = getDecksForFormat(format);

  useEffect(() => {
    if (userToken && userDeckDisplays.length === 0) {
      const format: string = cookies.format;
      dispatch(getUserDeckDisplay({ userToken, format }))
        .catch((error) => console.error("Failed to fetch user deck displays:", error));
    }
  
    const initialDecks = decks.map(deck => deck.value).concat(userDeckDisplays.map(deck => deck.value));
    initialDecks.sort((a, b) => a.localeCompare(b));
    setSelectedDecks(initialDecks);
    console.log(initialDecks)
  }, [cookies.format, decks, dispatch, userDeckDisplays, userToken]);

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
          {/* @TODO: Filter on x axis and y axis */}
          {/* <div className="deck-filter">
            <DeckFilter
              selectedDecks={selectedDecks}
              onSelectedDecksChange={setSelectedDecks}
              allDecks={allDecks.map(deck => deck.value)}
            />
          </div> */}
        </div>
        <div className="data-table">
          <DataTable selectedDecks={selectedDecks} userToken={userToken} format={cookies.format}/>
        </div>
      </div>
    </div>
  );
}
