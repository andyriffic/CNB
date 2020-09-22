import { Howler, Howl, HowlOptions } from 'howler';
import { SoundMap, soundMap } from './soundMap';

export const play = (
  soundKey: keyof SoundMap,
  options: HowlOptions = {},
  sprite?: string
): Howl => {
  const sound = new Howl({
    src: [soundMap[soundKey]],
    ...options,
  });

  sound.play(sprite);
  return sound;
};
