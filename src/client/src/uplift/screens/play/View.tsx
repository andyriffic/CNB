import React, { useState } from 'react';
import styled from 'styled-components';
import FullPageLayout from '../../../components/page-layout/FullPage';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { SelectPlayer } from './components/SelectPlayer';
import { SelectMatchup } from './components/SelectMatchup';

const MatchupsContainer = styled.div`
  width: 95%;
  padding: 40px 0;
  margin: 0 auto;
`;

export default ({  }: RouteComponentProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  return (
    <PlayersProvider>
      <FullPageLayout pageTitle="" alignTop={true}>
        <MatchupsContainer>
          <SelectPlayer
            selectedPlayer={selectedPlayer}
            selectPlayer={setSelectedPlayer}
          />
          {selectedPlayer && <SelectMatchup player={selectedPlayer} />}
        </MatchupsContainer>
      </FullPageLayout>
    </PlayersProvider>
  );
};
