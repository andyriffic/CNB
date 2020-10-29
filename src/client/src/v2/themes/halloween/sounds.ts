import { SoundMap } from '../../providers/SoundProvider';
import defaultSounds from '../default/sounds';
import creepyPiano from './sounds/creepy_piano.mp3';
import halloweenAngryBird from './sounds/halloween_angry_bird.mp3';
import halloweenMusic from './sounds/halloween_music.mp3';
import screamingSheep from './sounds/screaming_sheep.mp3';
import ghostLaugh from './sounds/ghost_laugh.mp3';
import ghostsAndGoblins from './sounds/ghosts_n_goblins.mp3';
import ghost from './sounds/ghost.mp3';
import funeralMarch from './sounds/funeral_march.mp3';

const soundMap: SoundMap = {
  ...defaultSounds,
  WaitForPlayersToJoin: halloweenAngryBird,
  PlayerJoinedGame: ghostLaugh,
  SwitchPlayer: screamingSheep,
  RoundStart: ghost,
  WaitForMoves: halloweenMusic,
  PlayerMoved: screamingSheep,
  GameOver: funeralMarch,
};

export default soundMap;
