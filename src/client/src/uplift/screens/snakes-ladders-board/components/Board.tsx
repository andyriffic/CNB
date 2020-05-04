import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import boardImage from './board-green.jpg';
import { GameBoard } from '../board';
import { BoardCell } from './BoardCell';
import { BoardPlayer, ANIMATION_TIMEOUT_MS } from './BoardPlayer';
import { GameBoardContext } from '../GameBoardContext';
import { getPlayerAttributeValue } from '../../../utils/player';

const BoardContainer = styled.div`
  width: 800px;
  height: 580px;
  background: transparent url(${boardImage}) no-repeat top left;
  background-size: contain;
  position: relative;
`;

type Props = {
  board: GameBoard;
};

export const Board = ({ board }: Props) => {
  const { players, startMovePlayer, movePlayer, onArrivedInCell } = useContext(
    GameBoardContext
  );

  console.log('----GAME PLAYERS----', players);
  useEffect(() => {
    const movingPlayers = players.filter(p => p.moving);
    movingPlayers.forEach((p, i) => {
      setTimeout(() => movePlayer(p), ANIMATION_TIMEOUT_MS);
    });
  }, [players]);

  return (
    <BoardContainer className="margins-off">
      {board.cells.map(cell => (
        <BoardCell key={cell.number} cell={cell} />
      ))}
      {players.map(boardPlayer => {
        const cell = board.cells[boardPlayer.boardCellIndex];
        return (
          <BoardPlayer
            key={`${boardPlayer.player.name}`}
            cell={cell}
            movesRemaining={boardPlayer.movesRemaining}
            offset={boardPlayer.positionOffset}
            player={boardPlayer.player}
            onClick={() => {
              startMovePlayer(boardPlayer);
              // movePlayer(boardPlayer);
            }}
            inLead={boardPlayer.inLead}
            onArrived={() => onArrivedInCell(boardPlayer, board)}
            boardPlayer={boardPlayer}
            moving={boardPlayer.moving}
          />
        );
      })}
    </BoardContainer>
  );
};
