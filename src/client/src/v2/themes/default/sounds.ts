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
import powerMode from './sounds/power_mode.mp3';
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
import killBillThemeSlow from './sounds/kill_bill_theme_slow.mp3';
import slideWhistle from './sounds/slide_whistle_sms.mp3';
import tickTock from './sounds/tick_tock.mp3';
import msgAlert24 from './sounds/24_msg_alert.mp3';
import meh from './sounds/meh.mp3';
import whatever from './sounds/whatever.mp3';
import phew from './sounds/phew.mp3';
import engineRev from './sounds/engine_rev.mp3';
import carHorn from './sounds/car_horn.mp3';
import balloonDeflate from './sounds/balloon_deflate.mp3';
import balloonPopSound from './sounds/balloon_pop_sound_loud.mp3';
import airInflate from './sounds/air_inflate.mp3';
import fall from './sounds/fall.mp3';
import popGoesTheWeasal from './sounds/pop_goes_the_weasal.mp3';
import pacmanGhost from './sounds/pacman_ghost.mp3';
import pacmanFruit from './sounds/pacman_fruit.mp3';
import pacmanMove from './sounds/pacman_move.mp3';
import pokemonWhosThat from './sounds/pokemon-whos-that.mp3';
import pokemonReceivedItem from './sounds/pokemon-received-an-item.mp3';
import snakeHiss from './sounds/zodiac/snake_hiss.mp3';
import mouse from './sounds/zodiac/mouse.mp3';
import tiger from './sounds/zodiac/tiger.mp3';
import horse from './sounds/zodiac/horse.mp3';
import monkey from './sounds/zodiac/monkey.mp3';
import dogBark from './sounds/zodiac/dog.mp3';
import sheep from './sounds/zodiac/sheep.mp3';
import taunt from './sounds/taunt.mp3';
import wuuheeCute from './sounds/wuuhee_cute.mp3';
import rheb from './sounds/rheb.mp3';
import patheticSob from './sounds/pathetic_sob.mp3';
import manScream from './sounds/man-scream-7049.mp3';
import smackAaaOh from './sounds/smack_aaa_oh.mp3';

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
  SnakesAndLaddersMove: pokemonSnapSoSo,
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
  MobWinsMusic: killBillThemeSlow,
  MugWinsMusic: fanfare,
  MugChosen: killBillSms2,
  MobLoseLife: slideWhistle,
  MobWin_1: hooray,
  MobWin_2: woohoo,
  MobWin_3: yippee,
  MobDraw_1: meh,
  MobDraw_2: whatever,
  MobDraw_3: phew,
  MobLose_1: scream1,
  MobLose_2: scream2,
  MobLose_3: scream3,
  MobStart: killBillSms1,
  CountdownTimerStart: tickTock,
  CountdownTimerWarning: msgAlert24,
  RacingEngineRev: engineRev,
  RacingCarHorn: carHorn,
  GasCloudPress: airInflate,
  GasCloudGameBackgroundMusic: popGoesTheWeasal,
  GasCloudExplode01: balloonPopSound,
  GasCloudExplode02: balloonDeflate,
  GasPlayNumberCard: fastGesture,
  GasPlaySkipCard: wuuheeCute,
  GasPlayReverseCard: taunt,
  GasPlayRiskCard: fall,
  GasPlaySurvivedRisk: phew,
  GasWinner: fanfare,
  GasPlayerDie1: rheb,
  GasPlayerDie2: patheticSob,
  GasPlayerDie3: manScream,
  GasBoomerang: smackAaaOh,
  PacManMovePlayer: pacmanFruit,
  PacManMovePacman: pacmanMove,
  PacmanEatGhost: pacmanGhost,
  WhosThanIntro: pokemonWhosThat,
  WhosThatReveal: pokemonReceivedItem,
  zodiac_snake: snakeHiss,
  zodiac_rat: mouse,
  zodiac_dog: dogBark,
  zodiac_horse: horse,
  zodiac_monkey: monkey,
  zodiac_tiger: tiger,
  zodiac_sheep: sheep,
};

export default soundMap;
