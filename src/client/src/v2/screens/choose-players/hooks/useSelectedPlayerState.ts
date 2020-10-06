import { useEffect, useState } from 'react';
import { Player } from '../../../../uplift/contexts/PlayersProvider';
import { UsePlayerSelector } from './usePlayerSelector';

export type UseSelectedPlayerState = {
  players: [Player | undefined, Player | undefined];
  nextPlayer: [() => Player | undefined, () => Player | undefined];
};

export const useSelectedPlayerState = (
  playerSelector: UsePlayerSelector
): UseSelectedPlayerState => {
  const [player1, setPlayer1] = useState(() => playerSelector.getNextPlayer());
  const [player2, setPlayer2] = useState(() => playerSelector.getNextPlayer());

  useEffect(() => {
    if (!playerSelector.hasLoaded) {
      return;
    }
    if (!player1) {
      setPlayer1(playerSelector.getNextPlayer());
    }
    if (!player2) {
      setPlayer2(playerSelector.getNextPlayer());
    }
  }, [playerSelector.hasLoaded, player1]);

  const result: UseSelectedPlayerState = {
    players: [player1, player2],
    nextPlayer: [
      () => {
        const player = playerSelector.getNextPlayer();
        if (!player) {
          return;
        }
        setPlayer1(player);
        return player;
      },
      () => {
        const player = playerSelector.getNextPlayer();
        if (!player) {
          return;
        }
        setPlayer2(player);
        return player;
      },
    ],
  };

  return result;
};
