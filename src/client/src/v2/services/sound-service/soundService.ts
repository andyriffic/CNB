import { Howler, Howl, HowlOptions } from 'howler';
import { SoundMap, soundMap } from './soundMap';

const preloadSounds = () => {};

export const play = (
  soundKey: keyof SoundMap,
  options: HowlOptions = {}
): Howl => {
  const sound = new Howl({
    src: [soundMap[soundKey]],
    ...options,
  });

  sound.play();
  return sound;
};
