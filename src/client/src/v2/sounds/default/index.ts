import { SoundMap } from '../../providers/SoundProvider';
import ssb4_result from './assets/ssb4_result.mp3';
import super_smash_bros_2 from './assets/super_smash_bros_2.mp3';
import super_smash_bros_4 from './assets/super_smash_bros_4.mp3';
import winner from './assets/winner.mp3';
import grabMissionSuccess from './assets/grab_mission_success.mp3';
import timebombTicking from './assets/time_bomb_sms.mp3';
import explosion from './assets/explosion.mp3';
import trackAndField from './assets/track_and_field.mp3';
import pokemonSnapSoSo from './assets/pokemon_snap_so_so.mp3';
import boingBoing from './assets/boing_boing.mp3';
import characterSelect from './assets/character_select.mp3';
import missionFalied from './assets/mission_failed.mp3';
import gameOverTune from './assets/game_over_tune.mp3';
import fastGesture from './assets/fast_gesture.mp3';
import marioJump from './assets/mario_jump.mp3';
import cry from './assets/cry.mp3';
import fanfareSms from './assets/fanfare_sms.mp3';
import spinningHeart from './assets/spinning_heart.mp3';
import spinningHeartReverse from './assets/spinning_heart_reverse.mp3';
import manGrunt from './assets/man_grunt.mp3';
import fallWithImpact from './assets/fall_with_impact.mp3';

const soundMap: SoundMap = {
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
  PullRope: manGrunt,
  Fall: fallWithImpact,
  SnakesAndLaddersMove: marioJump,
  SnakesAndLaddersSnake: cry,
  SnakesAndLaddersLadder: fanfareSms,
  SnakesAndLaddersWormholeIn: spinningHeart,
  SnakesAndLaddersWormholeOut: spinningHeartReverse,
};

export default soundMap;
