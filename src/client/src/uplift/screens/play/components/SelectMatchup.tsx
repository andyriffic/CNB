import React, { useContext, useEffect, useState } from 'react';
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
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  font-size: 1.8rem;
`;

const TeamName = styled.span<{ highlighted?: boolean }>`
  color: ${props =>
    props.highlighted ? props.theme.primaryTextColor : 'inherit'};
  font-size: 1.8rem;
`;

const MatchupStatusText = styled.p<{ type: 'GOOD' | 'WARN' }>`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => (props.type === 'GOOD' ? '#28A745' : '#FFC105')};
  text-transform: uppercase;
  margin: 0;
  padding: 0;
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

  const { setTheme } = useContext(GameThemeContext);
  const [waitingForMatchup, setWaitingForMatchup] = useState(true);
  const [readyMatchups, setReadyMatchups] = useState<
    MatchupForPlayer[] | undefined
  >();

  useEffect(() => {
    subscribeToMatchupsForPlayer(player.id);
    // TODO: unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!matchupsByPlayerId[player.id]) {
      return;
    }

    const matchupsReady = matchupsByPlayerId[player.id].filter(
      readyToPlayFilter
    );

    if (!matchupsReady.length) {
      return;
    }

    setWaitingForMatchup(false);

    if (matchupsReady.length === 1) {
      subscribeToMatchup(matchupsReady[0].id);
      setTheme(matchupsReady[0].themeId);
      selectMatchup(matchupsReady[0].id, matchupsReady[0].playerTeamId);
    } else {
      setReadyMatchups(matchupsReady);
    }
  }, [matchupsByPlayerId]);

  return (
    <div>
      <div>
        <h3>Your matchups</h3>
        {waitingForMatchup && (
          <LoadingSpinner text="Waiting for your game..." />
        )}
        {!waitingForMatchup &&
          readyMatchups &&
          readyMatchups.map(matchup => (
            <MatchupContainer
              key={matchup.id}
              onClick={() => {
                subscribeToMatchup(matchup.id);
                setTheme(matchup.themeId);
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
              <MatchupStatusText type="GOOD">Ready to play</MatchupStatusText>
            </MatchupContainer>
          ))}
      </div>
    </div>
  );
};
