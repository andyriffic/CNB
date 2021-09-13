import React, { useEffect } from 'react';
import styled from 'styled-components';
import { GameScreen } from '../../components/ui/GameScreen';
import { BoardBackground } from './components/BoardBackground';

import { BoardCell } from './components/BoardCell';
import { BoardPlayer } from './components/BoardPlayer';
import { DebugPlayerMove } from './components/DebugPlayerMove';
import { useGameBoard } from './providers/GameBoardProvider';

const Container = styled.div`
  margin: 0 auto;
`;

const View = () => {
  const gameBoardService = useGameBoard();

  return (
    <GameScreen scrollable={false}>
      <DebugPlayerMove gameBoardService={gameBoardService} />
      <Container>
        <BoardBackground board={gameBoardService.gameBoard}>
          {gameBoardService.gameBoard.cells.map(cell => (
            <BoardCell key={cell.number} cell={cell} />
          ))}
          {gameBoardService.gamePlayers.map(gamePlayer => (
            <BoardPlayer key={gamePlayer.player.id} gamePlayer={gamePlayer} />
          ))}
        </BoardBackground>
      </Container>
    </GameScreen>
  );
};

export default View;
