import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Matchup } from '../../../types/MatchupModels';
import { useSpring, animated } from 'react-spring';
import { getMatchups } from '../../../apiCalls/matchups/getMatchups';
import './CountMatchups.css';
import { useCookies } from 'react-cookie';
import { GoogleDataJson } from '../../../types/GoogleDataJson';

interface CountComponentProps {
  selectedDecks: string[],
  user: string,
}

export default function CountMatchups({ selectedDecks, user }: CountComponentProps) {
  const [count, setCount] = useState<number>(0);
  const [cookies] = useCookies(["format"]);
  const previousCountRef = useRef<number>(0);
  const matchups: Matchup[] = useAppSelector((state) => state.matchupReducer.matchups);
  const props = useSpring({ number: count, from: { number: previousCountRef.current } });
  const dispatch = useAppDispatch();

  //@TODO: Does this need to make a call every time the component is navigated to? Can getMatchups simply be set and persist on refresh?
  useEffect(() => {
    if (matchups.length === 0) {
      dispatch(getMatchups({ userToken: user, format: cookies.format }));
    }
  }, [dispatch, user, cookies.format, matchups.length]);

  useEffect(() => {
    const countMatchups = () => {
      let matchupCount = matchups.length
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