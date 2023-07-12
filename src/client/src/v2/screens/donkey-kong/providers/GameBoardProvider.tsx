import React, { ReactNode, useEffect, useState } from 'react';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { PLAYER_MOVE_ANIMATION_TIMEOUT_MS } from '../components/BoardPlayer';
import { useGameBoardCells } from '../hooks/useGameBoardCells';
import {
  MovePlayerGroup,
  useGameBoardPlayers,
} from '../hooks/useGameBoardPlayers';
import { GameBoard, GameBoardCell, GameBoardCellWithPlayers } from '../types';

export type GameBoardPlayer = {
  player: Player;
  boardCellIndex: number;
  movesRemaining: number;
  positionOffset: number;
  inLead: boolean;
  isWinner: boolean;
  moving: boolean;
  immunity: boolean;
};

type GameBoardService = {
  gameBoard: GameBoard;
  gameBoardPlayers: GameBoardPlayer[];
  cellsWithPlayers: GameBoardCellWithPlayers[];
  landedInCell: (gameBoardPlayer: GameBoardPlayer, cell: GameBoardCell) => void;
  savePlayer: (gameBoardPlayer: GameBoardPlayer) => void;
  moveAllPlayers: () => Promise<void>;
  putPlayerInSquare: (
    players: GameBoardPlayer[],
    existingPlayers: GameBoardPlayer[]
  ) => GameBoardPlayer[];
};

const GameBoardContext = React.createContext<GameBoardService | undefined>(
  undefined
);

export const GameBoardProvider = ({
  children,
  board,
  team,
}: {
  children: ReactNode;
  board: GameBoard;
  team: string | undefined;
}) => {
  const { updatePlayer } = usePlayersProvider();
  const {
    gameBoardPlayers,
    putPlayerInSquare,
    movePlayerToNextSquare,
    landedInCell,
  } = useGameBoardPlayers(board, team);
  const cellsWithPlayers = useGameBoardCells(board, gameBoardPlayers);
  const { play } = useSoundProvider();

  const autoMoveAllPlayers = (): Promise<void> => {
    return new Promise(finishedMovingAllPlayers => {
      const playersToMove = gameBoardPlayers.filter(p => p.movesRemaining > 0);

      console.log('PLAYERS TO MOVE', playersToMove);

      const movePlayerWithDelay = (movePlayerGroup: MovePlayerGroup) => {
        return new Promise<GameBoardPlayer[]>(res => {
          console.log('MOVING PLAYER', movePlayerGroup.updatedPlayer);

          play('SnakesAndLaddersMove');
          const updatedPlayerResult = movePlayerToNextSquare(movePlayerGroup);

          if (updatedPlayerResult.updatedPlayer.movesRemaining === 0) {
            console.log(
              'FINISHED MOVING PLAYER',
              updatedPlayerResult.updatedPlayer
            );
            setTimeout(() => res(updatedPlayerResult.allPlayers), 500);
          } else {
            setTimeout(() => {
              console.log('DELAYED MOVE PLAYER');
              movePlayerWithDelay(updatedPlayerResult).then(updatedPlayers =>
                res(updatedPlayers)
              );
            }, PLAYER_MOVE_ANIMATION_TIMEOUT_MS + 100);
          }
        });
      };

      const delayedMoves = playersToMove.map(
        updatedPlayer => (allPlayers: GameBoardPlayer[]) =>
          movePlayerWithDelay({ updatedPlayer, allPlayers })
      );

      console.log('DELAYED MOVES', delayedMoves);
      delayedMoves
        .reduce(
          (p, delayedMove) =>
            p.then(updatedPlayers => delayedMove(updatedPlayers)),
          Promise.resolve(gameBoardPlayers)
        )
        .then(() => finishedMovingAllPlayers());
    });

    // Promise.all(playersToMove.map(p => movePlayerWithDelay(p)));
  };

  return (
    <GameBoardContext.Provider
      value={{
        gameBoard: board,
        gameBoardPlayers,
        putPlayerInSquare,
        cellsWithPlayers,
        savePlayer: gameBoardPlayer => {
          const playerTags = gameBoardPlayer.player.tags
            .filter(t => t !== 'kong_immunity')
            .filter(t => !t.startsWith('sl_moves:'))
            .filter(t => !t.startsWith('sl_cell:'));

          const updatedTags = [
            ...playerTags,
            'sl_moves:0',
            `sl_cell:${gameBoardPlayer.boardCellIndex}`,
          ];

          updatePlayer(gameBoardPlayer.player.id, updatedTags);
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
        moveAllPlayers: autoMoveAllPlayers,
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
