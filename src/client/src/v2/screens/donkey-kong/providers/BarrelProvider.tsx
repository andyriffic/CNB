import React, { ReactNode, useState } from 'react';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { GameBoardPlayer } from '../providers/GameBoardProvider';
import { GameBoard } from '../types';
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
    const targetPlayers = boardPlayers.filter(p => p.boardCellIndex >= 1);
    if (!targetPlayers.length) return;

    const targetPlayer: GameBoardPlayer = selectRandomOneOf(targetPlayers);

    const targetCell = board.cells.find(
      c => c.number === targetPlayer.boardCellIndex
    );

    if (!targetCell) return;

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
            .filter(p => p.boardCellIndex > 0)
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

          const maxBarrels = 6;
          const minBarrels = 1;

          const totalBarrels = Math.min(
            Math.max(
              Math.floor(uniqueSquares.size / 5) +
                Math.floor(maxPlayerIndex / 10),
              minBarrels
            ),
            maxBarrels
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
              p => p.boardCellIndex === throwBarrelProps.barrel.targetCellIndex
            )
            .map<GameBoardPlayer>(p => ({
              ...p,
              boardCellIndex: Math.max(
                p.boardCellIndex - selectRandomOneOf([1, 2, 3]),
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
