import { Player, PlayersContext } from '../../contexts/PlayersProvider';
import { useContext, useState, useEffect } from 'react';

export const usePlayer = (playerId: string | null) => {
  const { allPlayers } = useContext(PlayersContext);
  const [player, setPlayer] = useState<Player | undefined>(
    allPlayers.find(p => p.id === playerId)
  );

  useEffect(() => {
    setPlayer(allPlayers.find(p => p.id === playerId));
  }, [allPlayers]);

  return player;
};
