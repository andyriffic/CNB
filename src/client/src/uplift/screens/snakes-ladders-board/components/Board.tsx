import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameBoard } from '../types';
import { BoardCell } from './BoardCell';
import { BoardPlayer, ANIMATION_TIMEOUT_MS } from './BoardPlayer';
import { GameBoardContext } from '../GameBoardContext';

const BoardContainer = styled.div<{
  boardImage: any;
  width: number;
  height: number;
}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: transparent url(${props => props.boardImage}) no-repeat top left;
  background-size: contain;
  position: relative;
  margin: 0 auto;
`;

type Props = {
  board: GameBoard;
  boardImage: any;
  width: number;
  height: number;
};

export const Board = ({ board, boardImage, width, height }: Props) => {
  const { players, startMovePlayer, movePlayer, onArrivedInCell } = useContext(
    GameBoardContext
  );

  useEffect(() => {
    const movingPlayers = players.filter(p => p.moving);
    movingPlayers.forEach((p, i) => {
      setTimeout(() => movePlayer(p), ANIMATION_TIMEOUT_MS);
    });
  }, [players]);

  return (
    <BoardContainer
      className="margins-off"
      boardImage={boardImage}
      width={width}
      height={height}
    >
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
