import React, { ReactNode, useEffect, useState } from 'react';
import { Howl, HowlOptions, Howler } from 'howler';
import { useThemeComponents } from './hooks/useThemeComponents';
import { LoadingSpinner } from '../../uplift/components/loading-spinner';

export type SoundMap = {
  WaitForMoves: any;
  PlayerMoved: any;
  RoundStart: any;
  ShowMoves: any;
  ShowBasePoints: any;
  FinalPointsAllocated: any;
  Winner: any;
  Draw: any;
  TimebombTicking: any;
  TimebombExploded: any;
  GameOver: any;
  WaitForPlayersToJoin: any;
  PlayerJoinedGame: any;
  SwitchPlayer: any;
  PullRope: any;
  Fall: any;
  PowerMode: any;
  ShowPrizeSelection: any;
  SelectPrizePoints: any;
  SelectPrizeEmpty: any;
  SelectPrizeGameOver: any;
  SnakesAndLaddersMove: any;
  SnakesAndLaddersSnake: any;
  SnakesAndLaddersLadder: any;
  SnakesAndLaddersWormholeIn: any;
  SnakesAndLaddersWormholeOut: any;
};

export type PlaySound = (
  soundKey: keyof SoundMap,
  options?: HowlOptions,
  sprite?: string
) => Howl;

type SoundService = {
  play: PlaySound;
};

const SoundContext = React.createContext<SoundService | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundMap, setSoundMap] = useState<SoundMap | undefined>(undefined);
  const themeComponents = useThemeComponents();

  useEffect(() => {
    console.log('SOUNDS', themeComponents);

    if (!themeComponents) {
      return;
    }
    setSoundMap(themeComponents.sounds);
  }, [themeComponents]);

  if (!soundMap) {
    return <LoadingSpinner text="Loading sound" />;
  }

  return (
    <SoundContext.Provider
      value={{
        play: (soundKey, options = {}, sprite) => {
          const sound = new Howl({
            src: [soundMap[soundKey]],
            ...options,
          });

          sound.play(sprite);
          return sound;
        },
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export function useSoundProvider() {
  const context = React.useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundProvider must be used within a SoundProvider');
  }
  return context;
}
