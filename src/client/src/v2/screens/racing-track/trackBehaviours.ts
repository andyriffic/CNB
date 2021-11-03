import { RacingTrackType } from './types';

export const defaultTrackBehaviour: RacingTrackType = {
  type: 'default',
  sound: 'RacingEngineRev',
  behaviour: player => {
    return {
      movesRemaining: player.movesRemaining - 1,
    };
  },
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
