import React, { useEffect, useState } from 'react';
import { CredentialResponse } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Matchup } from '../../../types/MatchupModels';
import { getMatchups } from '../../../apiCalls/matchups/getMatchups';
import './CountMatchups.css';

interface CountComponentProps {
  selectedDecks: string[],
  user: CredentialResponse,
}

export default function CountMatchups({ selectedDecks, user }: CountComponentProps) {
  const [count, setCount] = useState<number>(0);
  const matchups: Matchup[] = useAppSelector((state) => state.matchupReducer.matchups);
  const dispatch = useAppDispatch();

  if(matchups.length === 0) {
    dispatch(getMatchups(user));
  }

  useEffect(() => {
    const countMatchups = () => {
      let matchupCount = matchups.filter(matchup =>
        selectedDecks.includes(matchup.playerOneDeck.name) &&
        selectedDecks.includes(matchup.playerTwoDeck.name)
      ).length;
      setCount(matchupCount);
    };
    countMatchups();
  }, [selectedDecks, matchups]);

  return (
    <div className="matchup-count-display">
      <span>Matchup Count:</span>
      <div>{count}</div>
    </div>
  );
};