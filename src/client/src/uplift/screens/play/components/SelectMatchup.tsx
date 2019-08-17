import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Player, PlayersContext } from '../../../contexts/PlayersProvider';
import { LoadingSpinner } from '../../../components/loading-spinner';
import {
  MatchupContext,
  MatchupForPlayer,
  GAME_STATUS,
} from '../../../contexts/MatchupProvider';
import { GameThemeContext } from '../../../contexts/ThemeProvider';

const MatchupContainer = styled.div`
  border: 2px solid ${props => props.theme.primaryTextColor};
  padding: 10px;
  border-radius: 8px;
  font-size: 1.8rem;
`;

const TeamName = styled.span<{ highlighted?: boolean }>`
  color: ${props =>
    props.highlighted ? props.theme.featureBackgroundColor : 'inherit'};
  font-size: 1.8rem;
`;

type SelectMatchupProps = {
  player: Player;
  selectMatchup: (matchupId: string, teamId: string) => void;
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

export const SelectMatchup = ({
  player,
  selectMatchup,
}: SelectMatchupProps) => {
  const {
    subscribeToMatchupsForPlayer,
    matchupsByPlayerId,
    subscribeToMatchup,
  } = useContext(MatchupContext);

  const {setTheme} = useContext(GameThemeContext);

  useEffect(() => {
    subscribeToMatchupsForPlayer(player.id);
    // TODO: unsubscribe on unmount
  }, []);

  return (
    <div>
      <div>
        <h3>Games ready for you...</h3>
        {!matchupsByPlayerId[player.id] && (
          <LoadingSpinner text="Finding your matchups..." />
        )}
        {matchupsByPlayerId[player.id] &&
          matchupsByPlayerId[player.id]
            .filter(readyToPlayFilter)
            .map(matchup => (
              <MatchupContainer
                key={matchup.id}
                onClick={() => {
                  subscribeToMatchup(matchup.id);
                  setTheme('rock-paper-scissors');
                  selectMatchup(matchup.id, matchup.playerTeamId);
                }}
              >
                <TeamName
                  highlighted={matchup.teams[0].id === matchup.playerTeamId}
                >
                  {matchup.teams[0].name}
                </TeamName>{' '}
                vs{' '}
                <TeamName
                  highlighted={matchup.teams[1].id === matchup.playerTeamId}
                >
                  {matchup.teams[1].name}
                </TeamName>{' '}
                ✅
              </MatchupContainer>
            ))}
      </div>
      <div>
        <h3>Matchups you're in but not ready yet</h3>
        {matchupsByPlayerId[player.id] &&
          matchupsByPlayerId[player.id]
            .filter(notReadyToPlayFilter)
            .map(matchup => (
              <MatchupContainer key={matchup.id}>
                <TeamName
                  highlighted={matchup.teams[0].id === matchup.playerTeamId}
                >
                  {matchup.teams[0].name}
                </TeamName>{' '}
                vs{' '}
                <TeamName
                  highlighted={matchup.teams[1].id === matchup.playerTeamId}
                >
                  {matchup.teams[1].name}
                </TeamName>{' '}
                ⚠️
              </MatchupContainer>
            ))}
      </div>
    </div>
  );
};
