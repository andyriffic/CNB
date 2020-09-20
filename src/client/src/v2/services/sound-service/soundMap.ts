import ssb4_result from './sounds/ssb4_result.mp3';
import super_smash_bros_4 from './sounds/super_smash_bros_4.mp3';

export type SoundMap = {
  WaitForMoves: any;
  PlayerMoved: any;
};

export const soundMap: SoundMap = {
  WaitForMoves: super_smash_bros_4,
  PlayerMoved: ssb4_result,
};
