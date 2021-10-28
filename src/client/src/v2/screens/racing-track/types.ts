import { Player } from '../../providers/PlayersProvider';

export type Coordinates = { x: number; y: number };

export type RacingTrackSection = {
  rotationDegrees: number;
  catchupBonusMoves?: number;
  crossesFinishLine?: boolean;
  lanes: RacingTrackLane[];
};

export type RacingTrackLane = {
  squares: RackingTrackSquare[];
};

export type RacingTrackSquareType = 'rock';

export type RackingTrackSquare = {
  coordinates: Coordinates;
  type?: RacingTrackSquareType;
};

export type RacingTrackPosition = {
  sectionIndex: number;
  laneIndex: number;
  squareIndex: number;
};

export type RacingCarStyles = 'sports' | 'bubble' | 'formula-1';

export type RacingPlayer = {
  player: Player;
  movesRemaining: number;
  isMoving: boolean;
  position: RacingTrackPosition;
  blocked: boolean;
  passedAnotherRacer: boolean;
  carColor: string;
  carStyle: RacingCarStyles;
  gotBonusMoves: boolean;
  currentLap: number;
  finishPosition?: number;
};

export type RacingTrack = {
  id: string;
  sections: RacingTrackSection[];
  boardBackgroundImage: any;
  totalLaps: number;
  widthPx: number;
  heightPx: number;
};

export type RacerHistoryRecordsByDay = {
  date: string;
  history: RacerHistoryRecord[];
};

export type RacerHistoryRecord = {
  playerId: string;
  position: RacingTrackPosition;
  blocked: boolean;
  gotBonusMoves?: boolean;
  movesRemaining: number;
  finishPosition?: number;
  currentLap?: number;
};
