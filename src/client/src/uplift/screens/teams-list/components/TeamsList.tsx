import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { PlayersView } from './PlayerView';
import { TeamsContext } from '../../../contexts/TeamsProvider';

const Container = styled.div`
  padding: 40px;
`;

const ListContainer = styled.div`
`;

const TeamDetailsItemContainer = styled.div``;

export const TeamsList = () => {
  const { allTeamDetails, loading } = useContext(TeamsContext);
  return (
    <React.Fragment>
      {loading ? (
        <LoadingSpinner text="Loading teams..." />
      ) : (
          <Container>
            <ListContainer className="margins-off">
              {allTeamDetails
                .filter(teamDetails => teamDetails.team.tags.includes('tournament'))
                .map((teamDetails, index) => (
                  <TeamDetailsItemContainer key={teamDetails.team.id}>
                    <h2 style={{ marginBottom: '0' }}>{teamDetails.team.name}</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0' }} className="margins-off">
                      {teamDetails.map((player, index) => <PlayersView key={player.id} index={index} player={player} />)}
                    </div>
                  </TeamDetailsItemContainer>
                ))}
            </ListContainer>
          </Container>
        )}
    </React.Fragment>
  );
};
