import { RacingTrackType } from './types';

export const defaultTrackBehaviour = (moves: number = 1): RacingTrackType => {
  return {
    type: 'default',
    sound: 'RacingEngineRev',
    behaviour: player => {
      return {
        movesRemaining: player.movesRemaining - moves,
      };
    },
  };
};

export const rockTrackBehaviour: RacingTrackType = {
  type: 'rock',
  sound: 'TimebombExploded',
  behaviour: () => {
    return {
      movesRemaining: 0,
    };
  },
};

export const boostTrackBehaviour = (boostMoves: number): RacingTrackType => {
  return {
    type: 'boost',
    sound: 'SelectPrizePoints',
    context: boostMoves,
    behaviour: player => {
      return {
        movesRemaining: player.movesRemaining + boostMoves,
      };
    },
  };
};

export const obstacleTrackBehaviour: RacingTrackType = {
  type: 'obstacle',
  behaviour: () => {
    return {
      movesRemaining: 0,
    };
  },
};
