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
import NewYearBackgroundImg3 from '../../../images/3background.jpg'

const MatchupsContainer = styled.div`
  width: 95%;
  padding: 40px 0;
  margin: 0 auto;
`;

const NewYearBackground3 = styled.div`
  background-image:url(${NewYearBackgroundImg3});
  background-size: 100% 100%;
  height:100vh;
  color: #ff9d76;
  `


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

  const resetPlayer = () => {
    setSelectedMatchupId('');
    setSelectedPlayer(undefined);
  };

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
      <NewYearBackground3>  
        <MatchupsContainer>
          {gameFinished && (
            <PlayerGameResult
              matchup={currentMatchup}
              teamId={selectedTeamId}
              backToMatchups={resetPlayer}
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
          </NewYearBackground3>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
