import { useContext, useEffect, useRef, useState } from 'react';
import {
  Player,
  PlayersContext,
} from '../../../../uplift/contexts/PlayersProvider';

type UsePlayerSelector = {
  hasLoaded: boolean;
  getNextPlayer: () => Player | undefined;
};

export const usePlayerSelector = () => {
  const { allPlayers } = useContext(PlayersContext);
  const hasLoaded = useRef(false);
  const orderedPlayers = useRef<Player[]>([]);

  useEffect(() => {
    if (allPlayers.length && !hasLoaded.current) {
      hasLoaded.current = true;
      orderedPlayers.current = [...allPlayers];
    }
  }, [allPlayers, hasLoaded]);

  const result: UsePlayerSelector = {
    hasLoaded: hasLoaded.current,
    getNextPlayer: () => {
      if (!hasLoaded.current) {
        return;
      }
      const player = orderedPlayers.current[0];
      orderedPlayers.current = orderedPlayers.current.filter(
        p => p.id !== player.id
      );
      return player;
    },
  };

  return result;
};
