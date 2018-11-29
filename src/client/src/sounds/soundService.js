import {Howl} from 'howler';
import cowboySound from './cowboy-win.mp3';
import ninjaSound from './ninja-win.mp3';
import bearSound from './bear-win.wav';
import drawSound from './draw.mp3';
import pointsSound from './points.mp3';
import waitingSound from './waiting-music-loop.mp3';
import countdownBlip from './countdown-blip.wav';

const winnerSoundMapping = {
  cowboy: cowboySound,
  ninja: ninjaSound,
  bear: bearSound,
};

export const SOUND_KEYS = {
  WAITING_MUSIC: 'WAITING_MUSIC',
  POINTS_INCREASE: 'POINTS_INCREASE',
  COUNTDOWN_BLIP: 'COUNTDOWN_BLIP',
};

export class SoundService {

  _sounds = {};
  _resumableSoundKeys = []; //Sounds that can be played when music is toggled back on
  _musicEnabled: false;

  constructor(musicEnabled) {
    this._musicEnabled = musicEnabled;

    //Pre-load sounds
    this._sounds[SOUND_KEYS.WAITING_MUSIC] = {
      resumeable: true,
      sound: new Howl({
        src: [waitingSound],
        loop: true,
        volume: 0.6,
      }),
    };

    this._sounds[SOUND_KEYS.POINTS_INCREASE] = {
      sound: new Howl({ src: [pointsSound] }),
    };

    this._sounds[SOUND_KEYS.COUNTDOWN_BLIP] = {
      sound: new Howl({ src: [countdownBlip] }),
    };

  }

  setMusicEnabled(enabled) {
    this._musicEnabled = enabled;


    if (enabled) {
      this._resumableSoundKeys.forEach((soundKey) => {
        this._sounds[soundKey].sound.play();
      });
    }


    if (!enabled) {
      Object.keys(this._sounds).forEach((soundKey) => {
        this._sounds[soundKey].sound.stop();
      });
    }
  }

  play(soundKey, forceIfStillPlaying = false) {

    //Place sound in resumable sounds in case music gets turned on
    if (this._sounds[soundKey].resumeable && !this._resumableSoundKeys.includes(soundKey)) {
      this._resumableSoundKeys = [...this._resumableSoundKeys, soundKey];
    }

    if (!this._musicEnabled) {
      return;
    }

    if (!forceIfStillPlaying && this._sounds[soundKey].sound.playing()) {
      return;
    }

    this._sounds[soundKey].sound.play();
  }

  stop(soundKey) {
    this._resumableSoundKeys = this._resumableSoundKeys.filter((key) => key !== soundKey);
    this._sounds[soundKey].sound.stop();
  }

}

//TODO: move this into class above
export const getWinningSound = (move, isDraw) => {

  const soundFile = isDraw ? drawSound : winnerSoundMapping[move];

  return new Howl({
    src: [soundFile],
  });

};
