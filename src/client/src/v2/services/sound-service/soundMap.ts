import ssb4_result from './sounds/ssb4_result.mp3';
import super_smash_bros_4 from './sounds/super_smash_bros_4.mp3';
import winner from './sounds/winner.mp3';
import grabMissionSuccess from './sounds/grab_mission_success.mp3';
import timebombTicking from './sounds/time_bomb_sms.mp3';
import explosion from './sounds/explosion.mp3';
import trackAndField from './sounds/track_and_field.mp3';
import boingBoing from './sounds/boing_boing.mp3';
import characterSelect from './sounds/character_select.mp3';
import missionFalied from './sounds/mission_failed.mp3';

export type SoundMap = {
  WaitForMoves: any;
  PlayerMoved: any;
  RoundStart: any;
  ShowMoves: any;
  ShowBasePoints: any;
  FinalPointsAllocated: any;
  Winner: any;
  Draw: any;
  TimebombTicking: any;
  TimebombExploded: any;
};

export const soundMap: SoundMap = {
  WaitForMoves: super_smash_bros_4,
  PlayerMoved: ssb4_result,
  RoundStart: trackAndField,
  ShowMoves: boingBoing,
  ShowBasePoints: grabMissionSuccess,
  FinalPointsAllocated: characterSelect,
  Winner: winner,
  Draw: missionFalied,
  TimebombTicking: timebombTicking,
  TimebombExploded: explosion,
};
