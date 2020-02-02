import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import boardImage from './board.jpg';
import { GameBoard } from '../board';
import { BoardCell } from './BoardCell';
import { BoardPlayer } from './BoardPlayer';
import { GameBoardContext } from '../GameBoardContext';

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
  const { players, movePlayer, onArrivedInCell } = useContext(GameBoardContext);

  console.log('----GAME PLAYERS----', players);

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
              movePlayer(boardPlayer);
            }}
            onArrived={() => onArrivedInCell(boardPlayer, board)}
          />
        );
      })}
    </BoardContainer>
  );
};
