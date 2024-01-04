import React, { useEffect, useRef, useState } from 'react';
import { CredentialResponse } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Matchup } from '../../../types/MatchupModels';
import { getMatchups } from '../../../apiCalls/matchups/getMatchups';
import './CountMatchups.css';
import { useSpring, animated } from 'react-spring';

interface CountComponentProps {
  selectedDecks: string[],
  user: CredentialResponse,
}

export default function CountMatchups({ selectedDecks, user }: CountComponentProps) {
  const [count, setCount] = useState<number>(0);
  const previousCountRef = useRef<number>(0);
  const matchups: Matchup[] = useAppSelector((state) => state.matchupReducer.matchups);
  const props = useSpring({ number: count, from: { number: previousCountRef.current } });

  const dispatch = useAppDispatch();

  // if (matchups.length === 0) {
  //   dispatch(getMatchups(user));
  // }

  useEffect(() => {
    const countMatchups = () => {
      let matchupCount = matchups.filter(matchup =>
        selectedDecks.includes(matchup.playerOneDeck.name) &&
        selectedDecks.includes(matchup.playerTwoDeck.name)
      ).length;
      setCount(matchupCount);
    };
    countMatchups();
    previousCountRef.current = count;
  }, [selectedDecks, matchups, count]);

  return (
    <div className="matchup-count-display">
      <span>Matchup Count</span>
      <animated.div className={count > previousCountRef.current ? 'increase-animation' : count < previousCountRef.current ? 'decrease-animation' : ''}>
        {props.number.to(n => n.toFixed(0))}
      </animated.div>
    </div>
  );
};