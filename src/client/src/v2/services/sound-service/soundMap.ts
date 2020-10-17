import ssb4_result from './sounds/ssb4_result.mp3';
import super_smash_bros_2 from './sounds/super_smash_bros_2.mp3';
import super_smash_bros_4 from './sounds/super_smash_bros_4.mp3';
import winner from './sounds/winner.mp3';
import grabMissionSuccess from './sounds/grab_mission_success.mp3';
import timebombTicking from './sounds/time_bomb_sms.mp3';
import explosion from './sounds/explosion.mp3';
import trackAndField from './sounds/track_and_field.mp3';
import pokemonSnapSoSo from './sounds/pokemon_snap_so_so.mp3';
import boingBoing from './sounds/boing_boing.mp3';
import characterSelect from './sounds/character_select.mp3';
import missionFalied from './sounds/mission_failed.mp3';
import gameOverTune from './sounds/game_over_tune.mp3';
import fastGesture from './sounds/fast_gesture.mp3';
import marioJump from './sounds/mario_jump.mp3';
import cry from './sounds/cry.mp3';
import fanfareSms from './sounds/fanfare_sms.mp3';
import spinningHeart from './sounds/spinning_heart.mp3';
import spinningHeartReverse from './sounds/spinning_heart_reverse.mp3';
import longGrunt from './sounds/long_grunt.wav';
import fall from './sounds/fall.mp3';

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
  GameOver: any;
  WaitForPlayersToJoin: any;
  PlayerJoinedGame: any;
  SwitchPlayer: any;
  PullRope: any;
  Fall: any;
  SnakesAndLaddersMove: any;
  SnakesAndLaddersSnake: any;
  SnakesAndLaddersLadder: any;
  SnakesAndLaddersWormholeIn: any;
  SnakesAndLaddersWormholeOut: any;
};

export const soundMap: SoundMap = {
  WaitForMoves: super_smash_bros_4,
  PlayerMoved: ssb4_result,
  RoundStart: trackAndField,
  ShowMoves: boingBoing,
  ShowBasePoints: grabMissionSuccess,
  FinalPointsAllocated: grabMissionSuccess,
  Winner: winner,
  Draw: missionFalied,
  TimebombTicking: timebombTicking,
  TimebombExploded: explosion,
  GameOver: gameOverTune,
  WaitForPlayersToJoin: super_smash_bros_2,
  PlayerJoinedGame: ssb4_result,
  SwitchPlayer: fastGesture,
  PullRope: longGrunt,
  Fall: fall,
  SnakesAndLaddersMove: marioJump,
  SnakesAndLaddersSnake: cry,
  SnakesAndLaddersLadder: fanfareSms,
  SnakesAndLaddersWormholeIn: spinningHeart,
  SnakesAndLaddersWormholeOut: spinningHeartReverse,
};
