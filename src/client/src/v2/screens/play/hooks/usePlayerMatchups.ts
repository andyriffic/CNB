import { useState, useEffect } from 'react';
import {
  MatchupForPlayer,
  useMatchupProvider,
} from '../../../providers/MatchupProvider';

export const usePlayerMatchups = (playerId: string) => {
  const {
    matchupsByPlayerId,
    subscribeToMatchupsForPlayer,
  } = useMatchupProvider();
  const [playerMatchups, setPlayerMatchups] = useState<
    MatchupForPlayer[] | undefined
  >(matchupsByPlayerId[playerId]);

  useEffect(() => {
    subscribeToMatchupsForPlayer(playerId);
  }, []);

  useEffect(() => {
    setPlayerMatchups(matchupsByPlayerId[playerId]);
  }, [matchupsByPlayerId]);

  return playerMatchups;
};
