import { useMemo } from 'react';
import { GasGame, useGasProvider } from '../../../../providers/GasProvider';

export function useGasGame(gameId: string): { game: GasGame | undefined } {
  const { gasGames } = useGasProvider();

  const game = useMemo(() => {
    if (!gasGames) {
      return;
    }

    return gasGames.find(g => g.id === gameId);
  }, [gasGames]);

  return {
    game,
  };
}
