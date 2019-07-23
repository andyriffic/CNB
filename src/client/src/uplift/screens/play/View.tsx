import React, { useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { SelectPlayer } from './components/SelectPlayer';
import { SelectMatchup } from './components/SelectMatchup';
import { SelectMove } from './components/SelectMove';

const MatchupsContainer = styled.div`
  width: 95%;
  padding: 40px 0;
  margin: 0 auto;
`;

export default ({  }: RouteComponentProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [selectedMatchupId, setSelectedMatchupId] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');

  const readyToMakeMove = !!(selectedMatchupId && selectedTeamId);

  return (
    <PlayersProvider>
      <FullPageLayout pageTitle="" alignTop={true}>
        <MatchupsContainer>
          <SelectPlayer
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
              playerId={selectedPlayer ? selectedPlayer.id : ''}
            />
          )}
        </MatchupsContainer>
      </FullPageLayout>
    </PlayersProvider>
  );
};
