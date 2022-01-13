import React, { useMemo } from 'react';
import { Button } from '../../../components/ui/buttons';
import { GasGame, useGasProvider } from '../../../providers/GasProvider';

type Props = {
  playerId: string;
  onGameSelected: (gameId: string) => void;
};

export const GasGameSelectionList = ({ playerId, onGameSelected }: Props) => {
  const { gasGames } = useGasProvider();

  const playerGasGames = useMemo<GasGame[]>(
    () =>
      gasGames
        ? gasGames.filter(g => g.allPlayers.find(p => p.player.id === playerId))
        : [],
    [gasGames]
  );

  if (!playerGasGames.length) {
    return null;
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Active Ballon Games</h3>
      {playerGasGames.map(g => (
        <div key={g.id}>
          <Button
            style={{ width: '100%', padding: '30px' }}
            onClick={() => onGameSelected(g.id)}
          >
            {g.id}
          </Button>
        </div>
      ))}
    </div>
  );
};
