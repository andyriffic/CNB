import { Player } from '../../providers/PlayersProvider';

export type Coordinates = { x: number; y: number };

export type RacingTrackLane = {
  coordinates: Coordinates;
};

export type RacingTrackSegment = {
  lanes: RacingTrackLane[];
};

export type RacingPlayer = {
  player: Player;
  segment: RacingTrackSegment;
  lane: number;
  movesRemaining: number;
  isMoving: boolean;
};

export type RacingTrack = {
  segments: RacingTrackSegment[];
  boardBackgroundImage: any;
  widthPx: number;
  heightPx: number;
};
