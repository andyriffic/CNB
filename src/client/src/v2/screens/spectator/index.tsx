import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Matchup, useMatchupProvider } from '../../providers/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { useMoveThemeProvider } from '../../providers/MoveThemeProvider';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { TimebombGameScreen } from './game-variants/timebomb';
import { TugoWarGameScreen } from './game-variants/tug-o-war';
import { SuperSupriseGameScreen } from './game-variants/super-suprise';
import { selectRandomOneOf } from '../../../uplift/utils/random';

type Props = {
  matchupId: string;
} & RouteComponentProps;

export type GameModeType = 'Tug-o-war' | 'Timebomb' | 'Super-suprise';
const availableGameModes: GameModeType[] = [
  'Timebomb',
  'Tug-o-war',
  'Super-suprise',
];

const renderGameView = (
  gameMode: GameModeType,
  matchup: Matchup,
  startNewGame: () => void,
  resolveGame: () => void
) => {
  switch (gameMode) {
    case 'Tug-o-war':
      return (
        <TugoWarGameScreen
          matchup={matchup}
          startNewGame={startNewGame}
          resolveGame={resolveGame}
        />
      );
    case 'Super-suprise':
      return (
        <SuperSupriseGameScreen
          matchup={matchup}
          startNewGame={startNewGame}
          resolveGame={resolveGame}
        />
      );
    default:
      return (
        <TimebombGameScreen
          matchup={matchup}
          startNewGame={startNewGame}
          resolveGame={resolveGame}
        />
      );
  }
};

export const ScreenWithMatchup = ({ matchupId }: Props) => {
  const createdGame = useRef(false);
  const { allPlayers } = usePlayersProvider();
  const {
    subscribeToMatchup,
    currentMatchup,
    startGameForMatchup,
    playGameForMatchup,
  } = useMatchupProvider();
  const { setTheme } = useMoveThemeProvider();

  useEffect(() => {
    subscribeToMatchup(matchupId);
  }, []);

  useEffect(() => {
    if (!currentMatchup || createdGame.current) {
      return;
    }
    setTheme(currentMatchup.themeId);
    if (!currentMatchup.gameInProgress) {
      createdGame.current = true;
      startGameForMatchup(matchupId, selectRandomOneOf(availableGameModes));
    }
  }, [currentMatchup]);

  if (!(currentMatchup && currentMatchup.gameInProgress && allPlayers.length)) {
    return <LoadingSpinner text="Loading game" />;
  }

  return renderGameView(
    currentMatchup.gameInProgress!.playMode as GameModeType,
    currentMatchup,
    () => startGameForMatchup(currentMatchup.id),
    () => playGameForMatchup(currentMatchup.id)
  );
};
