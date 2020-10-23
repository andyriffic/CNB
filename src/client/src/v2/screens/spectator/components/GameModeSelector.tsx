import React, { useRef } from 'react';
import { GameModeType } from '..';
import { selectRandomOneOf } from '../../../../uplift/utils/random';
import { SplashText } from '../../../components/SplashText';

const availableGameModes: GameModeType[] = ['Tug-o-war', 'Timebomb'];

type Props = {
  onGameModeSelected: (gameMode: GameModeType) => void;
};

export const GameModeSelector = ({ onGameModeSelected }: Props) => {
  const gameMode = useRef<GameModeType>(selectRandomOneOf(availableGameModes));
  return (
    <SplashText
      onComplete={() => {
        onGameModeSelected(gameMode.current);
      }}
    >
      You're playing {gameMode.current}!
    </SplashText>
  );
};
