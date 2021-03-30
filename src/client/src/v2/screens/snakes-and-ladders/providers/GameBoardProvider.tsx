import React, { ReactNode, useEffect, useState } from 'react';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { useGameBoardCells } from '../hooks/useGameBoardCells';
import { useGameBoardPlayers } from '../hooks/useGameBoardPlayers';
import { GameBoard, GameBoardCell, GameBoardCellWithPlayers } from '../types';

export type GameBoardPlayer = {
  player: Player;
  boardCellIndex: number;
  movesRemaining: number;
  positionOffset: number;
  inLead: boolean;
  isWinner: boolean;
  moving: boolean;
};

type GameBoardService = {
  gameBoard: GameBoard;
  gameBoardPlayers: GameBoardPlayer[];
  cellsWithPlayers: GameBoardCellWithPlayers[];
  movePlayer: (gameBoardPlayer: GameBoardPlayer) => void;
  landedInCell: (gameBoardPlayer: GameBoardPlayer, cell: GameBoardCell) => void;
};

const GameBoardContext = React.createContext<GameBoardService | undefined>(
  undefined
);

export const GameBoardProvider = ({
  children,
  board,
}: {
  children: ReactNode;
  board: GameBoard;
}) => {
  const { updatePlayer } = usePlayersProvider();
  const {
    gameBoardPlayers,
    movePlayerToNextSquare,
    landedInCell,
  } = useGameBoardPlayers(board);
  const cellsWithPlayers = useGameBoardCells(board, gameBoardPlayers);

  return (
    <GameBoardContext.Provider
      value={{
        gameBoard: board,
        gameBoardPlayers,
        cellsWithPlayers,
        movePlayer: gameBoardPlayer => {
          movePlayerToNextSquare(gameBoardPlayer);
        },
        landedInCell: (gameBoardPlayer, cell) => {
          const playerFinalRestingPlace = landedInCell(gameBoardPlayer, cell);

          const playerTags = playerFinalRestingPlace.player.tags
            .filter(t => !t.startsWith('sl_moves:'))
            .filter(t => !t.startsWith('sl_cell:'));

          updatePlayer(playerFinalRestingPlace.player.id, [
            ...playerTags,
            'sl_moves:0',
            `sl_cell:${playerFinalRestingPlace.boardCellIndex}`,
          ]);
        },
      }}
    >
      {children}
    </GameBoardContext.Provider>
  );
};

export function useGameBoardProvider() {
  const context = React.useContext(GameBoardContext);
  if (context === undefined) {
    throw new Error(
      'useGameBoardProvider must be used within a GameBoardContext'
    );
  }
  return context;
}
