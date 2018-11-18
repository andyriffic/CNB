
import { Howl } from 'howler';
import cowboySound from './cowboy-win.mp3';
import ninjaSound from './ninja-win.mp3';
import bearSound from './bear-win.mp3';
import waitingSound from './waiting-music-loop.mp3';

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
}

export const getWaitingSound = () => {
    var sound = new Howl({
        src: [waitingSound],
        loop: true,
        volume: 0.6,
      });

      return sound;
}