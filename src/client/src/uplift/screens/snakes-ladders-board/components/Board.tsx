import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import boardImage from './board.jpg';
import { GameBoard, GameBoardCell } from '../board';
import { BoardCell } from './BoardCell';
import { BoardPlayer } from './BoardPlayer';
import { GameBoardContext, GameBoardPlayer } from '../GameBoardContext';

const BoardContainer = styled.div`
  width: 800px;
  height: 580px;
  background: transparent url(${boardImage}) no-repeat top left;
  background-size: contain;
  position: relative;
`;

type PlayersInTransit = {
  [key: string]: GameBoardCell;
};

type Props = {
  board: GameBoard;
};

export const Board = ({ board }: Props) => {
  const { players, movePlayer, onArrivedInCell } = useContext(GameBoardContext);
  const [playersInTransit, setPlayerInTransit] = useState<PlayersInTransit>({});

  const tempMoveToCell = (
    playerId: string,
    currentCellIndex: number,
    destinationCellIndex: number,
    onComplete: () => void
  ) => {
    if (currentCellIndex === destinationCellIndex) {
      onComplete();
      return;
    }

    const newIndex = currentCellIndex + 1;

    setPlayerInTransit({
      ...playersInTransit,
      [playerId]: board.cells[newIndex],
    });
    setTimeout(() => {
      tempMoveToCell(playerId, newIndex, destinationCellIndex, onComplete);
    }, 1000);
  };

  const transitPlayer = (
    boardPlayer: GameBoardPlayer,
    onComplete: () => void
  ) => {
    const destinationCellIndex = Math.min(
      boardPlayer.boardCellIndex + boardPlayer.movesRemaining,
      board.cells.length - 1
    );

    tempMoveToCell(
      boardPlayer.player.id,
      boardPlayer.boardCellIndex,
      destinationCellIndex,
      onComplete
    );
  };

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
            cell={
              playersInTransit[boardPlayer.player.id] === undefined
                ? cell
                : playersInTransit[boardPlayer.player.id]
            }
            movesRemaining={boardPlayer.movesRemaining}
            offset={
              playersInTransit[boardPlayer.player.id] === undefined
                ? boardPlayer.positionOffset
                : 0
            }
            player={boardPlayer.player}
            onClick={() => {
              transitPlayer(boardPlayer, () => {
                movePlayer(boardPlayer);
              });
            }}
            inLead={boardPlayer.inLead}
            onArrived={() => {
              const playersInTransitCopy = {
                ...playersInTransit,
              };
              delete playersInTransit[boardPlayer.player.id];
              setPlayerInTransit(playersInTransitCopy);

              onArrivedInCell(boardPlayer, board);
            }}
            boardPlayer={boardPlayer}
          />
        );
      })}
    </BoardContainer>
  );
};
