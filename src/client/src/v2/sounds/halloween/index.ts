import { SoundMap } from '../../providers/SoundProvider';
import defaultSounds from '../default';
import creepyPiano from './assets/creepy_piano.mp3';
import halloweenAngryBird from './assets/halloween_angry_bird.mp3';
import halloweenMusic from './assets/halloween_music.mp3';
import screamingSheep from './assets/screaming_sheep.mp3';
import ghostLaugh from './assets/ghost_laugh.mp3';
import ghostsAndGoblins from './assets/ghosts_n_goblins.mp3';
import ghost from './assets/ghost.mp3';
import funeralMarch from './assets/funeral_march.mp3';

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
