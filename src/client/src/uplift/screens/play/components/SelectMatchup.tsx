import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Player, PlayersContext } from '../../../contexts/PlayersProvider';
import { LoadingSpinner } from '../../../components/loading-spinner';
import {
  MatchupContext,
  MatchupForPlayer,
  GAME_STATUS,
} from '../../../contexts/MatchupProvider';

type SelectMatchupProps = {
  player: Player;
};

const readyToPlayFilter = (matchup: MatchupForPlayer) => {
  return (
    !!matchup.gameInProgress &&
    matchup.gameInProgress.status !== GAME_STATUS.Finished
  );
};

const notReadyToPlayFilter = (matchup: MatchupForPlayer) => {
  return (
    !matchup.gameInProgress ||
    matchup.gameInProgress.status === GAME_STATUS.Finished
  );
};

export const SelectMatchup = ({ player }: SelectMatchupProps) => {
  const { subscribeToMatchupsForPlayer, matchupsByPlayerId } = useContext(
    MatchupContext
  );

  useEffect(() => {
    subscribeToMatchupsForPlayer(player.id);
    // TODO: unsubscribe on unmount
  }, []);
  return (
    <div>
      <div>
        <h3>Games ready for you...</h3>
        {matchupsByPlayerId[player.id] &&
          matchupsByPlayerId[player.id]
            .filter(readyToPlayFilter)
            .map(matchup => (
              <p key={matchup.id}>
                {matchup.teams[0].name} vs {matchup.teams[1].name} ✅
              </p>
            ))}
      </div>
      <div>
        <h3>Matchups you're in but not ready yet</h3>
        {matchupsByPlayerId[player.id] &&
          matchupsByPlayerId[player.id]
            .filter(notReadyToPlayFilter)
            .map(matchup => (
              <p key={matchup.id}>
                {matchup.teams[0].name} vs {matchup.teams[1].name} ⚠️
              </p>
            ))}
      </div>
    </div>
  );
};
