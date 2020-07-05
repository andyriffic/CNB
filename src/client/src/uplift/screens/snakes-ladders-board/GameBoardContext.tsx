import React, { useState, useEffect, ReactNode, useContext } from 'react';
import { Player, PlayersContext } from '../../contexts/PlayersProvider';
import { getPlayerAttributeValue } from '../../utils/player';
import { GameBoard, BOARD_CELL_TYPE } from './board';
import { SoundService } from '../../contexts/types';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { JUNGLE_SOUND_KEYS, SOUND_KEYS } from '../../../sounds/SoundService';
import { selectRandomOneOf } from '../../utils/random';

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
  players: GameBoardPlayer[];
  startMovePlayer: (gameBoardPlayer: GameBoardPlayer) => void;
  movePlayer: (gameBoardPlayer: GameBoardPlayer) => void;
  onArrivedInCell: (
    gameBoardPlayer: GameBoardPlayer,
    gameBoard: GameBoard
  ) => void;
};

const initialValue: GameBoardService = {
  players: [],
  startMovePlayer: () => {},
  movePlayer: () => {},
  onArrivedInCell: () => {},
};

export const getBoardPlayers = (
  allPlayers: Player[],
  winningCellIndex: number
): GameBoardPlayer[] => {
  const eligiblePlayers = allPlayers.filter(player =>
    player.tags.includes('sl_participant')
  );

  const boardPlayers: GameBoardPlayer[] = eligiblePlayers.map(player => {
    const boardCellIndex = parseInt(
      getPlayerAttributeValue(player.tags, 'sl_cell', '0')
    );
    return {
      player,
      positionOffset: 0,
      boardCellIndex,
      movesRemaining: parseInt(
        getPlayerAttributeValue(player.tags, 'sl_moves', '0')
      ),
      inLead: false,
      isWinner: player.tags.includes('sl_winner'),
      moving: player.tags.includes('sl_moving'),
    };
  });

  return boardPlayers;
};

export const GameBoardContext = React.createContext<GameBoardService>(
  initialValue
);

export const GameBoardProvider = ({
  children,
  board,
}: {
  children: ReactNode;
  board: GameBoard;
}) => {
  const { allPlayers, updatePlayer } = useContext(PlayersContext);
  const [boardPlayers, setBoardPlayers] = useState<GameBoardPlayer[]>([]);
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    console.log('---GameBoardContext---', allPlayers);

    if (allPlayers.length) {
      const initialBoardPlayers = getBoardPlayers(
        allPlayers,
        board.cells.length - 1
      );

      // Get counts of players in each cell
      const cellPlayerCounts = initialBoardPlayers.reduce(
        (acc: { [key: string]: number }, boardPlayer) => {
          if (!acc[boardPlayer.boardCellIndex]) {
            acc[boardPlayer.boardCellIndex] = 1;
          } else {
            acc[boardPlayer.boardCellIndex] =
              acc[boardPlayer.boardCellIndex] + 1;
          }

          return acc;
        },
        {}
      );

      // Just get cells that have multiple players
      const cellsWithMultiplePlayers = Object.keys(cellPlayerCounts).reduce(
        (acc: { [key: string]: number }, cellIndex) => {
          if (cellPlayerCounts[cellIndex] > 1) {
            acc[cellIndex] = cellPlayerCounts[cellIndex];
          }
          return acc;
        },
        {}
      );

      // Update players position offset if there are multiple players in a cell
      Object.keys(cellsWithMultiplePlayers).forEach(cellIndex => {
        const playersInCell = initialBoardPlayers.filter(
          p => p.boardCellIndex === parseInt(cellIndex)
        );

        if (playersInCell.length !== cellsWithMultiplePlayers[cellIndex]) {
          console.warn(
            `Mismatch between players in cell and assigning index ${playersInCell.length}/${cellsWithMultiplePlayers[cellIndex]}`
          );
          return;
        }

        playersInCell.forEach((player, index) => {
          player.positionOffset = index; // Naughty mutation 😅
        });
      });

      // Find leading player(s)
      const maxCell = initialBoardPlayers.reduce((acc: number, boardPlayer) => {
        return Math.max(acc, boardPlayer.boardCellIndex);
      }, 0);

      initialBoardPlayers.forEach(boardPlayer => {
        boardPlayer.inLead =
          maxCell > 0 && boardPlayer.boardCellIndex === maxCell;
      });

      console.log('---cellsWithMultiplePlayers---', cellsWithMultiplePlayers);

      setBoardPlayers(initialBoardPlayers);
    }
  }, [allPlayers]);

  return (
    <GameBoardContext.Provider
      value={{
        ...initialValue,
        players: boardPlayers,
        startMovePlayer: gameBoardPlayer => {
          const playerTags = gameBoardPlayer.player.tags.filter(
            t => t !== 'sl_moving'
          );

          updatePlayer(gameBoardPlayer.player.id, [...playerTags, 'sl_moving']);
        },
        movePlayer: gameBoardPlayer => {
          if (!gameBoardPlayer.movesRemaining) {
            updatePlayer(
              gameBoardPlayer.player.id,
              gameBoardPlayer.player.tags.filter(t => t !== 'sl_moving')
            );
            return;
          }
          //soundService.stop(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);
          soundService.play(JUNGLE_SOUND_KEYS.MOVE, true);

          const destinationCellIndex = Math.min(
            gameBoardPlayer.boardCellIndex + 1,
            board.cells.length - 1
          );
          const playerTags = gameBoardPlayer.player.tags
            .filter(t => !t.startsWith('sl_moves:'))
            .filter(t => !t.startsWith('sl_cell:'));

          updatePlayer(gameBoardPlayer.player.id, [
            ...playerTags,
            `sl_moves:${gameBoardPlayer.movesRemaining - 1}`,
            `sl_cell:${destinationCellIndex}`,
          ]);
        },
        onArrivedInCell: (gameBoardPlayer, gameBoard) => {
          const cell = gameBoard.cells[gameBoardPlayer.boardCellIndex];

          if (cell.type === BOARD_CELL_TYPE.END) {
            updatePlayer(gameBoardPlayer.player.id, [
              ...gameBoardPlayer.player.tags.filter(t => t !== 'sl_winner'),
              'sl_winner',
            ]);
            return;
          }

          if (!cell.linkedCellIndex) {
            // soundService.play(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);
            return;
          }

          const destinationCellIndex = cell.linkedCellIndex;
          const playerTags = gameBoardPlayer.player.tags.filter(
            t => !t.startsWith('sl_cell:')
          );

          if (cell.type === BOARD_CELL_TYPE.LADDER) {
            soundService.play(JUNGLE_SOUND_KEYS.LADDER_UP);
          } else if (cell.type === BOARD_CELL_TYPE.SNAKE) {
            soundService.play(JUNGLE_SOUND_KEYS.SNAKE_DOWN);
          }

          const newTags = [`sl_cell:${destinationCellIndex}`];

          updatePlayer(gameBoardPlayer.player.id, [...playerTags, ...newTags]);

          // setTimeout(() => {
          //   soundService.play(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);
          // }, 2000);
        },
      }}
    >
      {children}
    </GameBoardContext.Provider>
  );
};
