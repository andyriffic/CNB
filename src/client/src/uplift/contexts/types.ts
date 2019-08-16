export type SoundService = {
  load: () => void;
  stopAll: () => void;
  play: (soundKey: string) => void;
  playForDuration: (soundKey: string, seconds: number) => void;
};
