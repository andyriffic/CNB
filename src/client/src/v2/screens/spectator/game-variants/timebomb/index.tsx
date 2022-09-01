import React, { useEffect, useRef, useState } from 'react';
import View from './View';
import {
  useMatchupProvider,
  Matchup,
  Team,
} from '../../../../providers/MatchupProvider';
import { useTimedGameState } from '../../hooks/useTimedGameState';
import { Player } from '../../../../../uplift/contexts/PlayersProvider';
import { getPlayerSnakesAndLaddersMoves } from '../../../../../uplift/utils/player';
import { useSoundGameState } from '../../hooks/useSoundGameState';
import { usePlayersProvider } from '../../../../providers/PlayersProvider';
import { useSoundProvider } from '../../../../providers/SoundProvider';
import {
  isFeatureEnabled,
  isPersistantFeatureEnabled,
} from '../../../../../featureToggle';
import { DebugPlayerMove } from '../../components/DebugPlayerMove';
import { PositionedArea } from '../../../../components/PositionedArea';

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

export const TimebombGameScreen = ({
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
  const { play } = useSoundProvider();
  useSoundGameState(
    timedGameState.gamePhase,
    timedGameState.game,
    timedGameState.timebomb,
    play
  );

  useEffect(() => {
    const updatedPoints = getPlayerPoints(allPlayers, matchup.teams);
    setPlayerPoints(updatedPoints);
  }, [allPlayers, matchup]);

  if (timedGameState.game) {
    return (
      <>
        {/* <button onClick={startNewGame}>new game</button> */}
        {isPersistantFeatureEnabled('cnb-debug') && (
          <PositionedArea position={{ top: 10, left: 0 }}>
            <DebugPlayerMove matchup={matchup} />
          </PositionedArea>
        )}
        <View {...timedGameState} game={timedGameState.game} />
      </>
    );
  }

  return null;
};
