import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countMatchups } from '../../apiCalls/matchups/countMatchups';
import { RootState } from '../../data/store';
import { CredentialResponse } from '@react-oauth/google';
import { selectMatchupCount } from '../../redux/MatchupCountSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Matchup } from '../../types/MatchupModels';
import { getMatchups } from '../../apiCalls/matchups/getMatchups';

interface CountComponentProps {
  selectedDecks: string[],
  user: CredentialResponse,
}

export default function CountMatchups({ selectedDecks, user }: CountComponentProps) {
  const [count, setCount] = useState<number>(0);
  const matchups: Matchup[] = useAppSelector((state) => state.matchupReducer.matchups);
  const dispatch = useAppDispatch();

  if(matchups.length == 0) {
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
    <div>
      <p>Matchup Count: </p>
      <p>{count}</p>
    </div>
  );
};