export type SoundService = {
  load: () => void;
  stop: (soundKey: string) => void;
  stopAll: () => void;
  play: (soundKey: string, forceIfStillPlaying?: boolean) => void;
  playForDuration: (soundKey: string, seconds: number) => void;
};
