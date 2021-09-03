import { isFeatureEnabled } from '../../../featureToggle';
import { GameBoardPlayer } from './providers/GameBoardProvider';

export type BoardCoordinates = [number, number];

export enum BOARD_CELL_TYPE {
  NORMAL = 0,
  SAFE = 1,
  DANGER = 2,
  END = 3,
}

export type GameBoardCell = {
  number: number;
  coordinates: BoardCoordinates;
  type: BOARD_CELL_TYPE;
  linkedCellIndex?: number | number[];
  fairy?: boolean;
  mustStop?: boolean;
  facingDirection: 'left' | 'right';
};

export type GameBoardCellWithPlayers = {
  players: GameBoardPlayer[];
} & GameBoardCell;

export type GameBoard = {
  cells: GameBoardCell[];
};
