import {Howl} from 'howler';
import drawSound from './draw.mp3';
import pointsSound from './points.mp3';

export const SOUND_KEYS = {
  WAITING_MUSIC: 'WAITING_MUSIC',
  POINTS_INCREASE: 'POINTS_INCREASE',
  COUNTDOWN_BLIP: 'COUNTDOWN_BLIP',
};

export class SoundService {

  _theme: null;
  _sounds = {};
  _resumableSoundKeys = []; //Sounds that can be played when music is toggled back on
  _musicEnabled: false;

  constructor(theme, musicEnabled = false) {
    if (!theme) { throw new Error('Sound Service requires a theme'); }
    this._theme = theme;
    this._musicEnabled = musicEnabled;

    //Pre-load sounds
    this._sounds[SOUND_KEYS.WAITING_MUSIC] = {
      resumeable: true,
      sound: new Howl({
        src: [theme.sounds.waitingMusic],
        loop: true,
        volume: 0.6,
      }),
    };

    this._sounds[SOUND_KEYS.POINTS_INCREASE] = {
      sound: new Howl({ src: [pointsSound] }),
    };

    this._sounds[SOUND_KEYS.COUNTDOWN_BLIP] = {
      sound: new Howl({ src: [theme.sounds.countdownBeep] }),
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

  playWinningSound(winningMove, isDraw,) {
    //TODO: not convinced this is the way to do winning sound but here just to get refactoring into SoundServce
    const soundFile = isDraw ? drawSound : this._theme.characters.winningSoundMapping[winningMove];
    const sound = new Howl({
      src: [soundFile],
    });

    sound.play();
  }

}
