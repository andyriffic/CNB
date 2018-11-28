import {Howl} from 'howler';
import cowboySound from './cowboy-win.mp3';
import ninjaSound from './ninja-win.mp3';
import bearSound from './bear-win.mp3';
import drawSound from './draw.mp3';
import pointsSound from './points.mp3';
import waitingSound from './waiting-music-loop.mp3';
import {isFeatureEnabled, FEATURE_WAITING_MUSIC} from '../featureToggle';

const winnerSoundMapping = {
  cowboy: cowboySound,
  ninja: ninjaSound,
  bear: bearSound,
};

export const SOUND_KEYS = {
  WAITING_MUSIC: 'WAITING_MUSIC',
};

export class SoundService {

  _sounds = {};
  _musicEnabled: false;

  constructor(musicEnabled) {
    this._musicEnabled = musicEnabled;

    //Pre-load sounds
    this._sounds[SOUND_KEYS.WAITING_MUSIC] = new Howl({
      src: [waitingSound],
      loop: true,
      volume: 0.6,
    });
  }

  setMusicEnabled(enabled) {
    this._musicEnabled = enabled;

    if (!enabled) {
      Object.keys(this._sounds).forEach((soundKey) => {
        this._sounds[soundKey].stop();
      })
    }
  }

  play(soundKey) {
    if (!this._musicEnabled) {
      return;
    }

    if (this._sounds[soundKey].playing()) {
      return;
    }

    this._sounds[soundKey].play();
  }

  stop(soundKey) {
    this._sounds[soundKey].stop();
  }

}

export const getWinningSound = (move, isDraw) => {

  const soundFile = isDraw ? drawSound : winnerSoundMapping[move];

  return new Howl({
    src: [soundFile],
  });

};

export const playPointsSound = (numPoints) => {
  const sound = new Howl({
    src: [pointsSound],
  });

  for (let i = 0; i < numPoints; i++) {
    setTimeout(() => {
      sound.play();
    }, i * 600);
  }
};
