import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { SelectPlayer } from './components/SelectPlayer';
import { SelectMatchup } from './components/SelectMatchup';
import { SelectMove } from './components/SelectMove';
import { MatchupContext, GAME_STATUS } from '../../contexts/MatchupProvider';
import { PlayerGameResult } from './components/PlayerGameResult';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameThemeContext } from '../../contexts/ThemeProvider';
import { PlayerSelector } from './components/PlayerSelector';

const MatchupsContainer = styled.div`
  width: 95%;
  padding: 40px 0;
  margin: 0 auto;
`;

export default ({  }: RouteComponentProps) => {
  const { setTheme } = useContext(GameThemeContext);
  const { currentMatchup } = useContext(MatchupContext);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [selectedMatchupId, setSelectedMatchupId] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');

  const readyToMakeMove = !!(
    selectedMatchupId &&
    selectedTeamId &&
    selectedPlayer
  );

  const gameFinished = !!(
    selectedMatchupId &&
    currentMatchup &&
    currentMatchup.gameInProgress &&
    currentMatchup.gameInProgress.status === GAME_STATUS.Finished
  );

  useEffect(() => {
    if (!selectedMatchupId) {
      setTheme('');
    }
  }, [selectedPlayer, selectedMatchupId, selectedTeamId]);

  const returnToMatchups = () => {
    setSelectedMatchupId('');
  };

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
        <MatchupsContainer>
          {gameFinished && (
            <PlayerGameResult
              matchup={currentMatchup}
              teamId={selectedTeamId}
              backToMatchups={returnToMatchups}
            />
          )}
          {!gameFinished && (
            <React.Fragment>
              <PlayerSelector
                selectedPlayer={selectedPlayer}
                selectPlayer={player => {
                  setSelectedMatchupId('');
                  setSelectedTeamId('');
                  setSelectedPlayer(player);
                }}
              />
              {selectedPlayer && !readyToMakeMove && (
                <SelectMatchup
                  player={selectedPlayer}
                  selectMatchup={(matchupId, teamId) => {
                    setSelectedMatchupId(matchupId);
                    setSelectedTeamId(teamId);
                  }}
                />
              )}
              {readyToMakeMove && (
                <SelectMove
                  matchupId={selectedMatchupId}
                  teamId={selectedTeamId}
                  player={selectedPlayer!}
                />
              )}
            </React.Fragment>
          )}
        </MatchupsContainer>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
