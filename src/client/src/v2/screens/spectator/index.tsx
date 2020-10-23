import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Matchup, useMatchupProvider } from '../../providers/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { useMoveThemeProvider } from '../../providers/MoveThemeProvider';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { TimebombGameScreen } from './game-variants/timebomb';
import { TugoWarGameScreen } from './game-variants/tug-o-war';
import { GameModeSelector } from './components/GameModeSelector';
import { GameScreen } from '../../components/ui/GameScreen';

type Props = {
  matchupId: string;
} & RouteComponentProps;

export type GameModeType = 'Tug-o-war' | 'Timebomb';

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
  const [gameMode, setGameMode] = useState<GameModeType | undefined>();
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
    if (!currentMatchup || createdGame.current || !gameMode) {
      return;
    }
    setTheme(currentMatchup.themeId);
    if (!currentMatchup.gameInProgress) {
      createdGame.current = true;
      startGameForMatchup(matchupId, gameMode);
    }
  }, [currentMatchup, gameMode]);

  if (!(currentMatchup && allPlayers.length)) {
    return <LoadingSpinner />;
  }

  if (!currentMatchup.gameInProgress) {
    return (
      <GameScreen scrollable={false}>
        <GameModeSelector onGameModeSelected={setGameMode} />
      </GameScreen>
    );
  }

  return renderGameView(
    gameMode || (currentMatchup.gameInProgress.playMode as GameModeType),
    currentMatchup,
    () => startGameForMatchup(currentMatchup.id, gameMode),
    () => playGameForMatchup(currentMatchup.id)
  );
};
