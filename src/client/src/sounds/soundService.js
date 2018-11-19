
import { Howl } from 'howler';
import cowboySound from './cowboy-win.mp3';
import ninjaSound from './ninja-win.mp3';
import bearSound from './bear-win.mp3';
import pointsSound from './points.mp3';
import waitingSound from './waiting-music-loop.mp3';
import { isFeatureEnabled, FEATURE_WAITING_MUSIC } from '../featureToggle';

const winnerSoundMapping = {
    cowboy: cowboySound,
    ninja: ninjaSound,
    bear: bearSound,
};

export const getWinningSound = (move) => {

    const sound = new Howl({
        src: [winnerSoundMapping[move]]
    });

    return sound;
};

export const getWaitingSound = () => {
 
    if (!isFeatureEnabled(FEATURE_WAITING_MUSIC)) {
        return {
            play: () => undefined,
            stop: () => undefined,
            playing: () => true,
        }
    }

   var sound = new Howl({
        src: [waitingSound],
        loop: true,
        volume: 0.6,
      });

      return sound;
};

export const playPointsSound = (numPoints) => {
  const sound = new Howl({
    src: [pointsSound]
  });

  for (let i = 0; i < numPoints; i++) {
    setTimeout(() => {sound.play();}, i * 600);
  }
};
