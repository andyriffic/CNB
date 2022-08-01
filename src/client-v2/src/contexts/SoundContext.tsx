import React, { ReactNode, useCallback } from 'react';
import { Howl, Howler } from 'howler';
import { SoundMap } from '../types/SoundMap';
import { defaultSounds } from '../themes/default/sounds';

export type PlaySound = (soundKey: keyof SoundMap) => Howl;

type SoundService = {
  play: PlaySound;
};

const SoundContext = React.createContext<SoundService | undefined>(undefined);

Howler.volume(0.2);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const play = useCallback((soundKey: keyof SoundMap): Howl => {
    const sound = new Howl({
      src: [defaultSounds[soundKey]],
    });

    sound.play();
    return sound;
  }, []);

  return (
    <SoundContext.Provider
      value={{
        play,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export function useSound() {
  const context = React.useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundProvider must be used within a SoundProvider');
  }
  return context;
}

export function useSoundHelper() {}
