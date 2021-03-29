import React, { ReactNode, useState } from 'react';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { GameBoardPlayer } from '../../snakes-and-ladders/providers/GameBoardProvider';
import { GameBoard } from '../types';
import { useGameBoardProvider } from './GameBoardProvider';

export const throwSpeed = 1500;
const barrellStartingPositions: [number, number][] = [
  [280, 150],
  [330, 150],
  [280, 100],
  [330, 100],
];

export enum BarrelState {
  WAITING = 'waiting',
  THROWING = 'throwing',
  EXPLODED = 'exploded',
}

export type Barrel = {
  id: number;
  state: BarrelState;
  coordinates: [number, number];
  targetCellIndex?: number;
};

type BarrelService = {
  addBarrel: (barrel: Barrel, barrels: Barrel[]) => Barrel[];
  createBarrels: () => Barrel[];
  throwBarrel: (barrel: Barrel) => Barrel | undefined;
  explodeBarrel: (barrel: Barrel) => Barrel;
  removeBarrel: (barrel: Barrel) => void;
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
    const targetPlayers = boardPlayers.filter(p => p.boardCellIndex > 1);
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
          const numberOfPlayersOnBoard = gameBoardPlayers.filter(
            p => p.boardCellIndex > 0
          ).length;
          const maxPlayerIndex = gameBoardPlayers.reduce<number>(
            (acc, p) => (p.boardCellIndex > acc ? p.boardCellIndex : acc),
            0
          );

          const maxBarrels = 5;
          const minBarrels = 1;

          const totalBarrels = Math.min(
            Math.max(
              Math.floor(numberOfPlayersOnBoard / 5) +
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
        throwBarrel: barrel => {
          const thrownBarrel = throwBarrelToCell(
            barrel,
            board,
            gameBoardPlayers
          );
          if (!thrownBarrel) return;
          setBarrels(barrels.map(b => (b.id === barrel.id ? thrownBarrel : b)));
          return thrownBarrel;
        },
        explodeBarrel: barrel => {
          const explodedBarrel = {
            ...barrel,
            state: BarrelState.EXPLODED,
          };
          console.log('EXPLODING BARREL', barrel);
          const explodedPlayers = gameBoardPlayers
            .filter(p => p.boardCellIndex === barrel.targetCellIndex)
            .map<GameBoardPlayer>(p => ({
              ...p,
              boardCellIndex: Math.max(
                p.boardCellIndex - selectRandomOneOf([1, 2, 3]),
                0
              ),
            }));
          console.log('EXPLODED PLAYERS', explodedPlayers);
          putPlayerInSquare(explodedPlayers);
          setBarrels(
            barrels.map(b => (b.id === barrel.id ? explodedBarrel : b))
          );
          return explodedBarrel;
        },
        removeBarrel: barrel => {
          setBarrels(barrels.filter(b => b.id !== barrel.id));
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
