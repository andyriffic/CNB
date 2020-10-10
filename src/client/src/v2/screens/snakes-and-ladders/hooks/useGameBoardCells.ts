import { useState, useEffect } from 'react';
import { GameBoardPlayer } from '../providers/GameBoardProvider';
import { GameBoard, GameBoardCellWithPlayers } from '../types';

const getPlayersOnCells = (
  board: GameBoard,
  gameBoardPlayers: GameBoardPlayer[]
): GameBoardCellWithPlayers[] => {
  return board.cells.map(cell => {
    return {
      ...cell,
      players: gameBoardPlayers.filter(p => p.boardCellIndex === cell.number),
    };
  });
};

export const useGameBoardCells = (
  board: GameBoard,
  gameBoardPlayers: GameBoardPlayer[]
): GameBoardCellWithPlayers[] => {
  const [cellsWithPlayers, setCellsWithPlayers] = useState<
    GameBoardCellWithPlayers[]
  >(getPlayersOnCells(board, gameBoardPlayers));

  useEffect(() => {
    setCellsWithPlayers(getPlayersOnCells(board, gameBoardPlayers));
  }, [gameBoardPlayers, board]);

  return cellsWithPlayers;
};
