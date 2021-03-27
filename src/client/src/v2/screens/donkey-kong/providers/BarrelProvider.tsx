import React, { ReactNode, useState } from 'react';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { GameBoardPlayer } from '../../snakes-and-ladders/providers/GameBoardProvider';
import { GameBoard } from '../types';
import { useGameBoardProvider } from './GameBoardProvider';

export const throwSpeed = 1500;

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
  createBarrel: () => void;
  throwBarrel: (barrel: Barrel) => Barrel | undefined;
  explodeBarrel: (barrel: Barrel) => Barrel;
  removeBarrel: (barrel: Barrel) => void;
  barrels: Barrel[];
};

const BarrelContext = React.createContext<BarrelService | undefined>(undefined);

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
    const targetPlayer: GameBoardPlayer = selectRandomOneOf(
      boardPlayers.filter(p => p.boardCellIndex > 1)
    );
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
        createBarrel: () => {
          setBarrels([
            ...barrels,
            {
              id: barrels.length,
              state: BarrelState.WAITING,
              coordinates: [300, 150],
            },
          ]);
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
