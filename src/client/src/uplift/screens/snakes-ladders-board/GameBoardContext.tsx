import React, { useState, useEffect, ReactNode, useContext } from 'react';
import { Player, PlayersContext } from '../../contexts/PlayersProvider';
import { getPlayerAttributeValue } from '../../utils/player';
import { GameBoard, BOARD_CELL_TYPE } from './board';
import { SoundService } from '../../contexts/types';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { JUNGLE_SOUND_KEYS, SOUND_KEYS } from '../../../sounds/SoundService';
import { selectRandomOneOf } from '../../utils/random';

type GameBoardPlayer = {
  player: Player;
  boardCellIndex: number;
  movesRemaining: number;
  positionOffset: number;
  inLead: boolean;
};

type GameBoardService = {
  players: GameBoardPlayer[];
  movePlayer: (gameBoardPlayer: GameBoardPlayer) => void;
  onArrivedInCell: (
    gameBoardPlayer: GameBoardPlayer,
    gameBoard: GameBoard
  ) => void;
};

const initialValue: GameBoardService = {
  players: [],
  movePlayer: () => {},
  onArrivedInCell: () => {},
};

export const GameBoardContext = React.createContext<GameBoardService>(
  initialValue
);

export const GameBoardProvider = ({ children }: { children: ReactNode }) => {
  const { allPlayers, updatePlayer } = useContext(PlayersContext);
  const [boardPlayers, setBoardPlayers] = useState<GameBoardPlayer[]>([]);
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    console.log('---GameBoardContext---', allPlayers);

    if (allPlayers.length) {
      const eligiblePlayers = allPlayers.filter(player =>
        player.tags.includes('sl_participant')
      );

      const initialBoardPlayers: GameBoardPlayer[] = eligiblePlayers.map(
        player => ({
          player,
          positionOffset: 0,
          boardCellIndex: parseInt(
            getPlayerAttributeValue(player.tags, 'sl_cell', '0')
          ),
          movesRemaining: parseInt(
            getPlayerAttributeValue(player.tags, 'sl_moves', '0')
          ),
          inLead: false,
        })
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
        movePlayer: gameBoardPlayer => {
          if (!gameBoardPlayer.movesRemaining) {
            return;
          }
          soundService.stop(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);
          soundService.play(JUNGLE_SOUND_KEYS.MOVE);

          const destinationCellIndex =
            gameBoardPlayer.boardCellIndex + gameBoardPlayer.movesRemaining;
          const playerTags = gameBoardPlayer.player.tags
            .filter(t => !t.startsWith('sl_moves:'))
            .filter(t => !t.startsWith('sl_cell:'));

          updatePlayer(gameBoardPlayer.player.id, [
            ...playerTags,
            'sl_moves:0',
            `sl_cell:${destinationCellIndex}`,
          ]);
        },
        onArrivedInCell: (gameBoardPlayer, gameBoard) => {
          const cell = gameBoard.cells[gameBoardPlayer.boardCellIndex];
          if (!cell.linkedCellIndex) {
            soundService.play(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);
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

          updatePlayer(gameBoardPlayer.player.id, [
            ...playerTags,
            `sl_cell:${destinationCellIndex}`,
          ]);

          setTimeout(() => {
            soundService.play(JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC);
          }, 2000);
        },
      }}
    >
      {children}
    </GameBoardContext.Provider>
  );
};
