import { Howl } from 'howler';
import drawSound from './draw.mp3';
import pointsSound from './points.mp3';
import playerEnter from './player-enter.wav';
import gameStart from './game-start-2.wav';
import bonusPointsEnter from './bonus-points-enter.wav';
import resultPlayerEnter from './result-player-enter-2.wav';
import vs from './vs.wav';
import fight from './go.ogg';
import powerUpWin from './power-up-win.mp3';
import awardTrophy from './trophy-jingle.ogg';
import pokeball from './pokeball.wav';
import scoreboardMusic from './scoreboard.mp3';
import elevatorMusic from './elevator-bossanova.mp3';
import collectPoint from './collect-point.mp3';
import winnerStamp from './stamp.wav';
import hadouken from './hadouken.mp3';
import iLikeToMoveIt from './i_like_to_move_it.mp3';
import scream01 from './scream-01.mp3';
import scream02 from './scream-02.wav';
import scream03 from './scream-03.wav';
import scream04 from './scream-04.wav';
import trumpet from './trumpet.wav';
import drumroll from './drumroll.wav';
import biteDust from './bites-the-dust.mp3';

export const SOUND_KEYS = {
  WAITING_MUSIC: 'WAITING_MUSIC',
  POINTS_INCREASE: 'POINTS_INCREASE',
  COLLECT_POINTS: 'COLLECT_POINTS',
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
  POKEBALL: 'POKEBALL',
  SCOREBOARD_MUSIC: 'SCOREBOARD_MUSIC',
  ELEVATOR_MUSIC: 'ELEVATOR_MUSIC',
  STAMP: 'STAMP',
  HADOUKEN: 'HADOUKEN',
  MOVE_IT_MUSIC: 'MOVE_IT_MUSIC',
  SCREAM_01: 'SCREAM_01',
  SCREAM_02: 'SCREAM_02',
  SCREAM_03: 'SCREAM_03',
  SCREAM_04: 'SCREAM_04',
  PLAYER_JOINED_GAME: 'PLAYER_JOINED_GAME',
  DRUMROLL: 'DRUMROLL',
  ANOTHER_ONE_BITES_THE_DUST: 'ANOTHER_ONE_BITES_THE_DUST',
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

  loadScoreboard() {
    if (this._loaded) {
      return;
    }

    this._loaded = true;

    this._sounds[SOUND_KEYS.SCOREBOARD_MUSIC] = {
      resumeable: true,
      sound: new Howl({
        src: [scoreboardMusic],
        loop: true,
      }),
    };
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

      this._sounds[SOUND_KEYS.ELEVATOR_MUSIC] = {
        resumeable: true,
        sound: new Howl({
          src: [elevatorMusic],
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

      this._sounds[SOUND_KEYS.POKEBALL] = {
        sound: new Howl({ src: [pokeball] }),
      };

      this._sounds[SOUND_KEYS.COLLECT_POINTS] = {
        sound: new Howl({ src: [collectPoint] }),
      };

      this._sounds[SOUND_KEYS.STAMP] = {
        sound: new Howl({ src: [winnerStamp] }),
      };

      this._sounds[SOUND_KEYS.HADOUKEN] = {
        sound: new Howl({ src: [hadouken] }),
        preload: true,
      };

      this._sounds[SOUND_KEYS.MOVE_IT_MUSIC] = {
        sound: new Howl({ src: [iLikeToMoveIt] }),
      };

      this._sounds[SOUND_KEYS.SCREAM_01] = {
        sound: new Howl({ src: [scream01] }),
      };

      this._sounds[SOUND_KEYS.SCREAM_02] = {
        sound: new Howl({ src: [scream02] }),
      };

      this._sounds[SOUND_KEYS.SCREAM_03] = {
        sound: new Howl({ src: [scream03] }),
      };

      this._sounds[SOUND_KEYS.SCREAM_04] = {
        sound: new Howl({ src: [scream04] }),
      };

      this._sounds[SOUND_KEYS.PLAYER_JOINED_GAME] = {
        sound: new Howl({ src: [trumpet] }),
      };

      this._sounds[SOUND_KEYS.DRUMROLL] = {
        sound: new Howl({ src: [drumroll] }),
      };

      this._sounds[SOUND_KEYS.ANOTHER_ONE_BITES_THE_DUST] = {
        sound: new Howl({ src: [biteDust] }),
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
      return false;
    }

    if (!forceIfStillPlaying && this._sounds[soundKey].sound.playing()) {
      return false;
    }

    this._sounds[soundKey].sound.play();
    return true;
  }

  playForDuration(soundKey, milliseconds) {
    const FADE_MILLISECONDS = 2000;
    const timeoutDuration = Math.max(0, milliseconds - FADE_MILLISECONDS);

    if (this.play(soundKey)) {
      setTimeout(() => {
        this._sounds[soundKey].sound.fade(1, 0, 2000);
      }, timeoutDuration);
    }
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
