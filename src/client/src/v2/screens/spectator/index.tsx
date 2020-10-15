import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useMatchupProvider } from '../../providers/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { useMoveThemeProvider } from '../../providers/MoveThemeProvider';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { TimebombGameScreen } from './game-variants/timebomb';

type Props = {
  matchupId: string;
} & RouteComponentProps;

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
      startGameForMatchup(matchupId, 'Timebomb');
    }
  }, [currentMatchup]);

  if (!currentMatchup || !currentMatchup.gameInProgress || !allPlayers.length) {
    return <LoadingSpinner />;
  }

  return (
    <TimebombGameScreen
      matchup={currentMatchup}
      startNewGame={() => startGameForMatchup(currentMatchup.id, 'Timebomb')}
      resolveGame={() => playGameForMatchup(currentMatchup.id)}
    />
  );
};
