import { isFeatureEnabled } from '../../../featureToggle';
import { GameBoardPlayer } from './providers/GameBoardProvider';

export type BoardCoordinates = [number, number];

export enum BOARD_CELL_TYPE {
  NORMAL = 0,
  SNAKE = 1,
  LADDER = 2,
  WORMHOLE = 3,
  END = 4,
}

export type GameBoardCell = {
  number: number;
  coordinates: BoardCoordinates;
  type: BOARD_CELL_TYPE;
  linkedCellIndex?: number | number[];
  fairy?: boolean;
  mustStop?: boolean;
};

export type GameBoardCellWithPlayers = {
  players: GameBoardPlayer[];
} & GameBoardCell;

export type GameBoard = {
  cells: GameBoardCell[];
};
