import { SoundMap } from '../../providers/SoundProvider';
import defaultSounds from '../default';
import creepyPiano from './assets/creepy_piano.mp3';
import halloweenAngryBird from './assets/halloween_angry_bird.mp3';
import halloweenMusic from './assets/halloween_music.mp3';

const soundMap: SoundMap = {
  ...defaultSounds,
  WaitForPlayersToJoin: halloweenAngryBird,
  WaitForMoves: halloweenMusic,
};

export default soundMap;
