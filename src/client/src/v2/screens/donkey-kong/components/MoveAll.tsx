import React from 'react';
import { useGameBoardProvider } from '../providers/GameBoardProvider';
import { Button } from '../../../components/ui/buttons';

export const MoveAll = () => {
  const { moveAllPlayers } = useGameBoardProvider();

  return (
    <div style={{ position: 'absolute', top: '0', left: '0' }}>
      <Button onClick={moveAllPlayers}>MOVE</Button>
    </div>
  );
};
