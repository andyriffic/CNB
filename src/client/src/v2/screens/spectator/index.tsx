import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import View from './View';
import {
  useMatchupProvider,
  Matchup,
  Team,
} from '../../providers/MatchupProvider';
import { LoadingSpinner } from '../../../uplift/components/loading-spinner';
import { useTimedGameState } from './hooks/useTimedGameState';
import { Player } from '../../../uplift/contexts/PlayersProvider';
import { getPlayerSnakesAndLaddersMoves } from '../../../uplift/utils/player';
import { useMoveThemeProvider } from '../../providers/MoveThemeProvider';
import { useSoundGameState } from './hooks/useSoundGameState';
import { usePlayersProvider } from '../../providers/PlayersProvider';

const getPlayerPoints = (
  allPlayers: Player[],
  teams: [Team, Team]
): [number, number] => {
  const player1Id = teams[0].id.startsWith('instant-team-')
    ? teams[0].id.split('-')[2]
    : undefined;

  const player1 = player1Id
    ? allPlayers.find(p => p.id === player1Id)
    : undefined;
  const player1Points = player1
    ? getPlayerSnakesAndLaddersMoves(player1.tags)
    : 0;

  const player2Id = teams[1].id.startsWith('instant-team-')
    ? teams[1].id.split('-')[2]
    : undefined;

  const player2 = player2Id
    ? allPlayers.find(p => p.id === player2Id)
    : undefined;
  const player2Points = player2
    ? getPlayerSnakesAndLaddersMoves(player2.tags)
    : 0;

  return [player1Points, player2Points];
};

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

  console.log('LOAD SPECTATOR', currentMatchup);

  if (!currentMatchup || !currentMatchup.gameInProgress || !allPlayers.length) {
    return <LoadingSpinner />;
  }

  return (
    <Screen
      matchup={currentMatchup}
      startNewGame={() => startGameForMatchup(currentMatchup.id, 'Timebomb')}
      resolveGame={() => playGameForMatchup(currentMatchup.id)}
    />
  );
};

const Screen = ({
  matchup,
  startNewGame,
  resolveGame,
}: {
  matchup: Matchup;
  startNewGame: () => void;
  resolveGame: () => void;
}) => {
  const { allPlayers, triggerUpdate } = usePlayersProvider();
  const [playerPoints, setPlayerPoints] = useState<[number, number]>(
    getPlayerPoints(allPlayers, matchup.teams)
  );
  const timedGameState = useTimedGameState(
    matchup,
    playerPoints,
    startNewGame,
    resolveGame,
    triggerUpdate
  );
  useSoundGameState(
    timedGameState.gamePhase,
    timedGameState.game,
    timedGameState.timebomb
  );

  useEffect(() => {
    const updatedPoints = getPlayerPoints(allPlayers, matchup.teams);
    setPlayerPoints(updatedPoints);
  }, [allPlayers, matchup]);

  if (timedGameState.game) {
    return (
      <>
        {/* <button onClick={startNewGame}>new game</button> */}
        <View {...timedGameState} game={timedGameState.game} />
      </>
    );
  }

  return null;
};
