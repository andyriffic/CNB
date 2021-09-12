import React, { useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import { GameBoardProvider } from './providers/GameBoardProvider';

import { board } from './boards/test';
import { usePlayersProvider } from '../../providers/PlayersProvider';

export const GameEngineScreen = ({  }: RouteComponentProps) => {
  const { allPlayers } = usePlayersProvider();

  const participatingPlayers = useMemo(
    () => allPlayers.filter(p => p.tags.includes('game_participant')),
    [allPlayers]
  );

  if (!participatingPlayers.length) {
    return <p>Loading...</p>;
  }

  return (
    <GameBoardProvider
      gameBoard={board}
      participatingPlayers={participatingPlayers}
    >
      <View />
    </GameBoardProvider>
  );
};
