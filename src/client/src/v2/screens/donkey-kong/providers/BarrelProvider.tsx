import React, { ReactNode, useState } from 'react';
import {
  selectRandomOneOf,
  selectWeightedRandomOneOf,
  WeightedItem,
} from '../../../../uplift/utils/random';
import { GameBoardPlayer } from '../providers/GameBoardProvider';
import { BOARD_CELL_TYPE, GameBoard } from '../types';
import { useGameBoardProvider } from './GameBoardProvider';

export const throwSpeed = 1500;
const barrellStartingPositions: [number, number][] = [
  [180, 150],
  [230, 150],
  [280, 150],
  [180, 100],
  [230, 100],
  [280, 100],
];

export enum BarrelState {
  WAITING = 'waiting',
  THROWING = 'throwing',
  EXPLODED = 'exploded',
}

export type ThrowBarrelResult = {
  barrel: Barrel;
  allBarrels: Barrel[];
  gameBoardPlayers: GameBoardPlayer[];
};

export type Barrel = {
  id: number;
  state: BarrelState;
  coordinates: [number, number];
  targetCellIndex?: number;
};

type BarrelService = {
  addBarrel: (barrel: Barrel, barrels: Barrel[]) => Barrel[];
  createBarrels: () => Barrel[];
  throwBarrel: (throwBarrelProps: ThrowBarrelResult) => ThrowBarrelResult;
  explodeBarrel: (throwBarrelProps: ThrowBarrelResult) => ThrowBarrelResult;
  removeBarrel: (barrel: Barrel, allBarrels: Barrel[]) => Barrel[];
  barrels: Barrel[];
};

const BarrelContext = React.createContext<BarrelService | undefined>(undefined);

const createBarrel = (
  id: number,
  startingCoordinates: [number, number][]
): Barrel => {
  const newBarrel = {
    id,
    state: BarrelState.WAITING,
    coordinates: startingCoordinates[id] || startingCoordinates[0],
  };

  return newBarrel;
};

export const BarrelProvider = ({
  children,
  board,
}: {
  children: ReactNode;
  board: GameBoard;
}) => {
  const [barrels, setBarrels] = useState<Barrel[]>([]);
  const { gameBoardPlayers, putPlayerInSquare } = useGameBoardProvider();

  const throwBarrelToCell = (
    barrel: Barrel,
    board: GameBoard,
    boardPlayers: GameBoardPlayer[]
  ): Barrel | undefined => {
    const allDangerSquaresOccupied = boardPlayers
      .filter(
        p => board.cells[p.boardCellIndex].type === BOARD_CELL_TYPE.DANGER
      )
      .map(p => p.boardCellIndex);

    const allNormalSquaresOccupied = boardPlayers
      .filter(
        p => board.cells[p.boardCellIndex].type === BOARD_CELL_TYPE.NORMAL
      )
      .map(p => p.boardCellIndex);

    if (!(allDangerSquaresOccupied.length || allNormalSquaresOccupied.length)) {
      return;
    }

    const targetPlayerSquares =
      allDangerSquaresOccupied.length > 0
        ? allDangerSquaresOccupied
        : allNormalSquaresOccupied;

    const uniqueSquaresIndex = new Set(targetPlayerSquares);
    console.log('Throwing barrel: Unique Cells', uniqueSquaresIndex);

    const weightedSquares = Array.from(uniqueSquaresIndex).map<
      WeightedItem<number>
    >(squareIndex => ({
      item: squareIndex,
      weight: Math.floor(squareIndex / 5) || 1,
    }));

    console.log('Barrel weights', weightedSquares);

    const targetCellIndex = selectWeightedRandomOneOf(weightedSquares);
    const targetCell = board.cells[targetCellIndex];

    return {
      ...barrel,
      state: BarrelState.THROWING,
      coordinates: targetCell.coordinates,
      targetCellIndex: targetCell.number,
    };
  };

  return (
    <BarrelContext.Provider
      value={{
        addBarrel: (barrel, _barrels) => {
          const allBarrels = [..._barrels, barrel];
          setBarrels(allBarrels);
          return allBarrels;
        },
        createBarrels: () => {
          const allSquareNumbersOccupied = gameBoardPlayers
            .filter(
              p =>
                board.cells[p.boardCellIndex].type === BOARD_CELL_TYPE.NORMAL ||
                board.cells[p.boardCellIndex].type === BOARD_CELL_TYPE.DANGER
            )
            .map(p => p.boardCellIndex);

          const uniqueSquares = new Set(allSquareNumbersOccupied);

          console.log(
            'BARREL DEBUG',
            allSquareNumbersOccupied,
            uniqueSquares,
            uniqueSquares.size
          );

          const maxPlayerIndex = gameBoardPlayers.reduce<number>(
            (acc, p) => (p.boardCellIndex > acc ? p.boardCellIndex : acc),
            0
          );

          const MAX_BARRELS = 6;
          const MIN_BARRELS = 2;
          const PLAYERS_ON_BOARD_PER_BARREL = 8;
          const PLAYER_MAX_POSITION_PER_BARREL = 10;

          const totalBarrels = Math.min(
            Math.max(
              Math.floor(uniqueSquares.size / PLAYERS_ON_BOARD_PER_BARREL) +
                Math.floor(maxPlayerIndex / PLAYER_MAX_POSITION_PER_BARREL),
              MIN_BARRELS
            ),
            MAX_BARRELS
          );

          console.log('total barrels', totalBarrels);

          const barrels = [...Array(totalBarrels)].map<Barrel>((_, i) => {
            return createBarrel(i, barrellStartingPositions);
          });
          console.log('created barrels', barrels);
          return barrels;
        },
        throwBarrel: throwBarrelProps => {
          const thrownBarrel = throwBarrelToCell(
            throwBarrelProps.barrel,
            board,
            throwBarrelProps.gameBoardPlayers
          );
          if (!thrownBarrel) return throwBarrelProps;

          const updatedBarrels = throwBarrelProps.allBarrels.map(b =>
            b.id === throwBarrelProps.barrel.id ? thrownBarrel : b
          );
          setBarrels(updatedBarrels);
          return {
            barrel: thrownBarrel,
            allBarrels: updatedBarrels,
            gameBoardPlayers: throwBarrelProps.gameBoardPlayers,
          };
        },
        explodeBarrel: throwBarrelProps => {
          const explodedBarrel = {
            ...throwBarrelProps.barrel,
            state: BarrelState.EXPLODED,
          };
          console.log('EXPLODING BARREL', explodedBarrel);
          const explodedPlayers = throwBarrelProps.gameBoardPlayers
            .filter(
              p =>
                !p.immunity &&
                p.boardCellIndex === throwBarrelProps.barrel.targetCellIndex
            )
            .map<GameBoardPlayer>(p => ({
              ...p,
              boardCellIndex: Math.max(
                p.boardCellIndex - selectRandomOneOf([2, 3, 4]),
                0
              ),
            }));
          console.log('EXPLODED PLAYERS', explodedPlayers);
          const updatedPlayers = putPlayerInSquare(
            explodedPlayers,
            throwBarrelProps.gameBoardPlayers
          );
          const updatedBarrels = throwBarrelProps.allBarrels.map(b =>
            b.id === throwBarrelProps.barrel.id ? explodedBarrel : b
          );
          setBarrels(updatedBarrels);
          return {
            barrel: explodedBarrel,
            allBarrels: updatedBarrels,
            gameBoardPlayers: updatedPlayers,
          };
        },
        removeBarrel: (barrel, allBarrels) => {
          const updatedBarrels = allBarrels.filter(b => b.id !== barrel.id);
          setBarrels(updatedBarrels);
          return updatedBarrels;
        },
        barrels,
      }}
    >
      {children}
    </BarrelContext.Provider>
  );
};

export function useBarrelProvider() {
  const context = React.useContext(BarrelContext);
  if (context === undefined) {
    throw new Error('useBarrelProvider must be used within a BarrelContext');
  }
  return context;
}
