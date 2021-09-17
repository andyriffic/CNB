import { Player } from '../../providers/PlayersProvider';

export type Coordinates = { x: number; y: number };

export type RacingTrackSection = {
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

export type RacingPlayer = {
  player: Player;
  movesRemaining: number;
  isMoving: boolean;
  position: RacingTrackPosition;
};

export type RacingTrack = {
  sections: RacingTrackSection[];
  boardBackgroundImage: any;
  widthPx: number;
  heightPx: number;
};
