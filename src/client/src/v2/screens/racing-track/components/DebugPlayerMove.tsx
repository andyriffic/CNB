import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GameBoardService } from '../providers/GameBoardProvider';
import { GamePlayer } from '../types';

const Container = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
`;

type Props = {
  gameBoardService: GameBoardService;
};

export const DebugPlayerMove = ({ gameBoardService }: Props): JSX.Element => {
  const [autoMove, setAutoMove] = useState(false);

  useEffect(() => {
    if (gameBoardService.allPlayersMoved || !autoMove) {
      return;
    }
    const interval = setInterval(() => {
      gameBoardService.autoMovePlayer();
    }, 500);
    return () => clearInterval(interval);
  }, [autoMove, gameBoardService.allPlayersMoved]);

  // useEffect(() => {
  //   if (!gameBoardService.movingPlayer) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     console.log('MOVING PLAYER');
  //     gameBoardService.moveSelectedPlayer();
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, [gameBoardService.movingPlayer]);

  return (
    <Container>
      <button onClick={() => setAutoMove(true)}>Move All Players</button>
      {gameBoardService.gamePlayers.map(gp => (
        <div key={gp.player.id}>{gp.player.name}</div>
      ))}
    </Container>
  );
};
