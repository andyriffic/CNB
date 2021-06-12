import { SoundMap } from '../../providers/SoundProvider';
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
import manGrunt from './sounds/man_grunt.mp3';
import fallWithImpact from './sounds/fall_with_impact.mp3';
import aww from './sounds/aww.mp3';
import powerMode from './sounds/loz_link_get_powerup.mp3';
import eightBitFall from './sounds/8bit_fall.wav';
import flipPop from './sounds/flip-pop.wav';
import barrelBlast from './sounds/barrel_blast.mp3';
import donkeyKongColeco from './sounds/donkey_kong_coleco.mp3';
import roar from './sounds/roar.mp3';
import fanfare from './sounds/fanfare.mp3';
import hooray from './sounds/hooray.mp3';
import woohoo from './sounds/woohoo.mp3';
import yippee from './sounds/mario64_yippee.mp3';
import scream1 from './sounds/screaming_ben.mp3';
import scream2 from './sounds/screaming_sheep.mp3';
import scream3 from './sounds/wilhelm_scream.mp3';
import killBillSms1 from './sounds/kill_bill_sms_1.mp3';
import killBillSms2 from './sounds/kill_bill_sms_2.mp3';
import introduction from './sounds/introduction.mp3';

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
  PlayerJoinedMob: flipPop,
  FastestFinger: powerMode,
  SwitchPlayer: fastGesture,
  PullRope: manGrunt,
  Fall: fallWithImpact,
  PowerMode: powerMode,
  ShowPrizeSelection: grabMissionSuccess,
  SelectPrizePoints: winner,
  SelectPrizeEmpty: missionFalied,
  SelectPrizeGameOver: aww,
  SnakesAndLaddersMove: marioJump,
  SnakesAndLaddersSnake: cry,
  SnakesAndLaddersLadder: fanfareSms,
  SnakesAndLaddersWormholeIn: spinningHeart,
  SnakesAndLaddersWormholeOut: spinningHeartReverse,
  SnakesAndLaddersWinner: fanfare,
  DonkeyKongThrowBarrel: eightBitFall,
  DonkeyKongCreateBarrel: flipPop,
  DonkeyKongExplodeBarrel: barrelBlast,
  DonkeyKongAngry: roar,
  DonkeyKongGameOver: donkeyKongColeco,
  ChoseMobMusic: introduction,
  MobWaitingMovesMusic: introduction,
  MugChosen: killBillSms2,
  MobWin_1: hooray,
  MobWin_2: woohoo,
  MobWin_3: yippee,
  MobLose_1: scream1,
  MobLose_2: scream2,
  MobLose_3: scream3,
  MobStart: killBillSms1,
};

export default soundMap;
