import { Howler, Howl } from 'howler';
import drawSound from './draw.mp3';
import scoreboardMusic from './scoreboard.mp3';
// import elevatorMusic from './elevator-bossanova.mp3';
import collectPoint from './collect-point.mp3';
import winnerStamp from './stamp.wav';
import hadouken from './hadouken.mp3';
import awardTrophy from './trophy-jingle.ogg';
import scream01 from './scream-01.mp3';
import scream02 from './scream-02.wav';
import scream03 from './scream-03.wav';
import scream04 from './scream-04.wav';
import drumroll from './drumroll.wav';
import digital from './digital.wav';
import puff from './puff.mp3';
// import biteDust from './bites-the-dust.mp3';
// import radiantMusicLoop from './radiant.mp4';
import yay from './yay.wav';
import crowdCheer from './crowd-cheer.mp3';
// import explosion from './explosion.mp3';
import ticking from './ticking.wav';
// import fuse from './gasp.wav';
import slideFallWhistle from './jungle-bird.mp3';
import moveAttachWhoosh from './move-attach-whoosh.flac';
import moveLose from './punch.mp3';
import intenseMusicLoop from './intense-music-loop.mp3';
import cough from './cough.mp3';
import slurp from './slurp.mp3';
import death from './death.mp3';

import jungleLadderUp from './jungle-ladder-up.mp3';
import jungleBackgroundMusic from './jungle-background-music.mp3';
import jungleSnakeDown from './jungle-sad-trombone.mp3';
import jungleZoom from './jungle-zoom-away.mp3';
import jungleAmbience from './jungle-ambiance.mp3';
import jungleRattle from './jungle-rattle.mp3';
import jungleVictory from './jungle-victory.mp3';

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
  INTENSE_MUSIC: 'INTENSE_MUSIC',
  CROWD_CHEER: 'CROWD_CHEER',
  EXPLOSION: 'EXPLOSION',
  TICKING: 'TICKING',
  FUSE: 'FUSE',
  SLIDE_FALL_WHISTLE: 'SLIDE_FALL_WHISTLE',
  ZAP: 'ZAP',
  PUFF: 'PUFF',
  MOVE_ATTACH_WHOOSH: 'MOVE_ATTACH_WHOOSH',
  MOVE_LOSE: 'MOVE_LOSE',
  RATTLE: 'RATTLE',
};

export const JUNGLE_SOUND_KEYS = {
  SNAKE_DOWN: 'SNAKE_DOWN',
  LADDER_UP: 'LADDER_UP',
  MOVE: 'MOVE',
  BACKGROUND_MUSIC: 'BACKGROUND_MUSIC',
  AMBIENCE: 'AMBIENCE',
  VICTORY: 'VICTORY',
};

export class SoundService {
  _theme = null;
  _sounds = {};
  _resumableSoundKeys = []; // Sounds that can be played when music is toggled back on
  _musicEnabled = false;
  _loadedJungle = false;

  constructor(theme, musicEnabled = false) {
    if (!theme) {
      throw new Error('Sound Service requires a theme');
    }
    this._theme = theme;
    this._loaded = false;
    this._loadedJungle = false;
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

  loadJungle() {
    if (this._loadedJungle) {
      return;
    }

    this._loadedJungle = true;

    this._sounds[JUNGLE_SOUND_KEYS.BACKGROUND_MUSIC] = {
      resumeable: true,
      sound: new Howl({
        src: [jungleBackgroundMusic],
        loop: true,
      }),
    };

    this._sounds[JUNGLE_SOUND_KEYS.AMBIENCE] = {
      resumeable: true,
      sound: new Howl({
        src: [jungleAmbience],
        loop: true,
      }),
    };

    this._sounds[JUNGLE_SOUND_KEYS.LADDER_UP] = {
      sound: new Howl({ src: [jungleLadderUp] }),
    };

    this._sounds[JUNGLE_SOUND_KEYS.SNAKE_DOWN] = {
      sound: new Howl({ src: [jungleSnakeDown] }),
    };

    this._sounds[JUNGLE_SOUND_KEYS.MOVE] = {
      sound: new Howl({ src: [jungleZoom] }),
    };

    this._sounds[JUNGLE_SOUND_KEYS.VICTORY] = {
      sound: new Howl({ src: [jungleVictory] }),
    };
  }

  load() {
    if (!this._loaded) {
      this._loaded = true;
      // Pre-load sounds

      this._sounds[SOUND_KEYS.INTENSE_MUSIC] = {
        resumeable: true,
        sound: new Howl({
          src: [intenseMusicLoop],
          loop: true,
        }),
      };

      // this._sounds[SOUND_KEYS.ELEVATOR_MUSIC] = {
      //   resumeable: true,
      //   sound: new Howl({
      //     src: [elevatorMusic],
      //     loop: true,
      //     volume: 0.6,
      //   }),
      // };

      this._sounds[SOUND_KEYS.RATTLE] = {
        sound: new Howl({ src: [jungleRattle] }),
      };

      this._sounds[SOUND_KEYS.SLIDE_FALL_WHISTLE] = {
        sound: new Howl({ src: [slideFallWhistle] }),
      };

      this._sounds[SOUND_KEYS.DRAW] = {
        sound: new Howl({ src: [drawSound] }),
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

      // this._sounds[SOUND_KEYS.MOVE_IT_MUSIC] = {
      //   sound: new Howl({ src: [iLikeToMoveIt] }),
      // };

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
        sound: new Howl({ src: [cough] }),
      };

      this._sounds[SOUND_KEYS.DRUMROLL] = {
        sound: new Howl({ src: [drumroll] }),
      };

      this._sounds[SOUND_KEYS.ANOTHER_ONE_BITES_THE_DUST] = {
        sound: new Howl({ src: [yay] }),
      };

      this._sounds[SOUND_KEYS.AWARD_TROPHY] = {
        sound: new Howl({ src: [awardTrophy], volume: 0.4 }),
      };

      this._sounds[SOUND_KEYS.CROWD_CHEER] = {
        sound: new Howl({ src: [crowdCheer] }),
      };

      this._sounds[SOUND_KEYS.EXPLOSION] = {
        sound: new Howl({ src: [death] }),
      };

      this._sounds[SOUND_KEYS.TICKING] = {
        sound: new Howl({ src: [ticking], loop: true, volume: 0.6 }),
      };

      this._sounds[SOUND_KEYS.FUSE] = {
        sound: new Howl({ src: [slurp] }),
      };

      this._sounds[SOUND_KEYS.ZAP] = {
        sound: new Howl({ src: [digital] }),
      };

      this._sounds[SOUND_KEYS.PUFF] = {
        sound: new Howl({ src: [puff] }),
      };

      this._sounds[SOUND_KEYS.MOVE_ATTACH_WHOOSH] = {
        sound: new Howl({ src: [moveAttachWhoosh] }),
      };

      this._sounds[SOUND_KEYS.MOVE_LOSE] = {
        sound: new Howl({ src: [moveLose] }),
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

  setVolume(volume) {
    Howler.volume(volume);
  }

  setMusicEnabled(enabled) {
    if (enabled === this._musicEnabled) {
      return;
    }
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
    if (!this._sounds[soundKey]) {
      return;
    }

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
        setTimeout(() => {
          this.stop(soundKey);
          this._sounds[soundKey].sound.volume(1);
        }, 2000);
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
