import { Player } from '../../providers/PlayersProvider';

export type Coordinates = { x: number; y: number };

export type RacingTrackSection = {
  rotationDegrees: number;
  lanes: RacingTrackLane[];
};

export type RacingTrackLane = {
  squares: RackingTrackSquare[];
};

export type RackingTrackSquare = {
  coordinates: Coordinates;
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
};

export type RacingTrack = {
  sections: RacingTrackSection[];
  boardBackgroundImage: any;
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
  movesRemaining: number;
};
