import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Howl, HowlOptions } from 'howler';
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
  PlayerJoinedMob: any;
  FastestFinger: any;
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
  SnakesAndLaddersWinner: any;
  DonkeyKongThrowBarrel: any;
  DonkeyKongCreateBarrel: any;
  DonkeyKongExplodeBarrel: any;
  DonkeyKongAngry: any;
  DonkeyKongGameOver: any;
  ChoseMobMusic: any;
  MobWaitingMovesMusic: any;
  MugWinsMusic: any;
  MobWinsMusic: any;
  MobLoseLife: any;
  MobWin_1: any;
  MobWin_2: any;
  MobWin_3: any;
  MobDraw_1: any;
  MobDraw_2: any;
  MobDraw_3: any;
  MobLose_1: any;
  MobLose_2: any;
  MobLose_3: any;
  MugChosen: any;
  MobStart: any;
  CountdownTimerStart: any;
  CountdownTimerWarning: any;
  RacingEngineRev: any;
  RacingCarHorn: any;
  GasCloudPress: any;
  GasCloudGameBackgroundMusic: any;
  GasCloudExplode01: any;
  GasCloudExplode02: any;
  GasPlayNumberCard: any;
  GasPlayReverseCard: any;
  GasPlaySkipCard: any;
  GasPlayRiskCard: any;
  GasPlaySurvivedRisk: any;
  GasWinner: any;
  GasPlayerDie1: any;
  GasPlayerDie2: any;
  GasPlayerDie3: any;
  GasBoomerang: any;
  PacManMovePlayer: any;
  PacManMovePacman: any;
  PacmanEatGhost: any;
  WhosThanIntro: any;
  WhosThatReveal: any;
  zodiac_snake: any;
  zodiac_rat: any;
  zodiac_dog: any;
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

  const play = useCallback(
    (soundKey: keyof SoundMap, options: HowlOptions = {}, sprite) => {
      if (!soundMap) {
        return new Howl({});
      }
      const sound = new Howl({
        src: [soundMap[soundKey]],
        volume: 0.2,
        ...options,
      });

      sound.play(sprite);
      return sound;
    },
    [soundMap]
  );

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
        play,
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

export function useSoundHelper() {}
