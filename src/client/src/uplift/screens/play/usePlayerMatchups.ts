import { Player } from '../../contexts/PlayersProvider';
import { useContext, useState, useEffect } from 'react';
import {
  MatchupContext,
  MatchupForPlayer,
} from '../../contexts/MatchupProvider';

export const usePlayerMatchups = (playerId: string) => {
  const { matchupsByPlayerId, subscribeToMatchupsForPlayer } = useContext(
    MatchupContext
  );
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
