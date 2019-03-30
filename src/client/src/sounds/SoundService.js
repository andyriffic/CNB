import { Howl } from 'howler';
import drawSound from './draw.mp3';
import pointsSound from './points.mp3';
import playerEnter from './player-enter.wav';
import gameStart from './game-start-2.wav';
import bonusPointsEnter from './bonus-points-enter.wav';
import resultPlayerEnter from './result-player-enter-2.wav';
import vs from './vs.wav';
import fight from './fight.wav';
import powerUpWin from './power-up-win.mp3';
import awardTrophy from './trophy-jingle.ogg';

export const SOUND_KEYS = {
  WAITING_MUSIC: 'WAITING_MUSIC',
  POINTS_INCREASE: 'POINTS_INCREASE',
  COUNTDOWN_BLIP: 'COUNTDOWN_BLIP',
  PLAYER_MOVED_SELECTED: 'PLAYER_MOVED_SELECTED',
  DRAW: 'DRAW',
  PLAYER_ENTER: 'PLAYER_ENTER',
  GAME_START: 'GAME_START',
  BONUS_POINTS_ENTER: 'BONUS_POINTS_ENTER',
  RESULT_PLAYER_ENTER: 'RESULT_PLAYER_ENTER',
  VS: 'VS',
  FIGHT: 'FIGHT',
  POWER_UP_WIN: 'POWER_UP_WIN',
  AWARD_TROPHY: 'AWARD_TROPHY',
};

export class SoundService {
  _theme = null;
  _sounds = {};
  _resumableSoundKeys = []; // Sounds that can be played when music is toggled back on
  _musicEnabled = false;

  constructor(theme, musicEnabled = false) {
    if (!theme) {
      throw new Error('Sound Service requires a theme');
    }
    this._theme = theme;
    this._loaded = false;
    this._musicEnabled = musicEnabled;
  }

  load() {
    if (!this._loaded) {
      this._loaded = true;
      // Pre-load sounds
      this._sounds[SOUND_KEYS.WAITING_MUSIC] = {
        resumeable: true,
        sound: new Howl({
          src: [this._theme.sounds.waitingMusic],
          loop: true,
          volume: 0.6,
        }),
      };

      this._sounds[SOUND_KEYS.POINTS_INCREASE] = {
        sound: new Howl({
          src: [pointsSound],
        }),
      };

      this._sounds[SOUND_KEYS.COUNTDOWN_BLIP] = {
        sound: new Howl({
          src: [this._theme.sounds.countdownBeep],
        }),
      };

      this._sounds[SOUND_KEYS.PLAYER_MOVED_SELECTED] = {
        sound: new Howl({
          src: [this._theme.sounds.playerMoveSelected],
        }),
      };

      this._sounds[SOUND_KEYS.DRAW] = {
        sound: new Howl({ src: [drawSound] }),
      };

      this._sounds[SOUND_KEYS.PLAYER_ENTER] = {
        sound: new Howl({ src: [playerEnter] }),
      };

      this._sounds[SOUND_KEYS.GAME_START] = {
        sound: new Howl({ src: [gameStart] }),
      };

      this._sounds[SOUND_KEYS.BONUS_POINTS_ENTER] = {
        sound: new Howl({ src: [bonusPointsEnter] }),
      };

      this._sounds[SOUND_KEYS.RESULT_PLAYER_ENTER] = {
        sound: new Howl({ src: [resultPlayerEnter] }),
      };

      this._sounds[SOUND_KEYS.VS] = {
        sound: new Howl({ src: [vs] }),
      };

      this._sounds[SOUND_KEYS.FIGHT] = {
        sound: new Howl({ src: [fight] }),
      };

      this._sounds[SOUND_KEYS.POWER_UP_WIN] = {
        sound: new Howl({ src: [powerUpWin] }),
      };

      this._sounds[SOUND_KEYS.AWARD_TROPHY] = {
        sound: new Howl({ src: [awardTrophy] }),
      };

      // Pre-load winning sounds
      Object.keys(this._theme.characters.winningSoundMapping).forEach(key => {
        this._sounds[key] = {
          sound: new Howl({
            src: [this._theme.characters.winningSoundMapping[key]],
          }),
          resumeable: true,
        };
      });
    }
  }

  setMusicEnabled(enabled) {
    this._musicEnabled = enabled;

    if (enabled) {
      this._resumableSoundKeys.forEach(soundKey => {
        this._sounds[soundKey].sound.play();
      });
    }

    if (!enabled) {
      Object.keys(this._sounds).forEach(soundKey => {
        this._sounds[soundKey].sound.stop();
      });
    }
  }

  play(soundKey, forceIfStillPlaying = false) {
    // Place sound in resumable sounds in case music gets turned on
    if (
      this._sounds[soundKey].resumeable &&
      !this._resumableSoundKeys.includes(soundKey)
    ) {
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
    this._resumableSoundKeys = this._resumableSoundKeys.filter(
      key => key !== soundKey
    );
    this._sounds[soundKey].sound.stop();
  }

  stopAll() {
    Object.keys(this._sounds).forEach(key => {
      this._sounds[key].sound.stop();
    });
  }

  playWinningSound(winningMove, isDraw) {
    const soundKey = isDraw ? SOUND_KEYS.DRAW : winningMove;
    this.play(soundKey);
  }
}
