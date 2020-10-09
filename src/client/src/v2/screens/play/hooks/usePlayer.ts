import { useState, useEffect } from 'react';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';

export const usePlayer = (playerId: string | null) => {
  const { allPlayers } = usePlayersProvider();
  const [player, setPlayer] = useState<Player | undefined>(
    allPlayers.find(p => p.id === playerId)
  );

  useEffect(() => {
    setPlayer(allPlayers.find(p => p.id === playerId));
  }, [allPlayers]);

  return player;
};
