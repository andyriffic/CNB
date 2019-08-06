import React, { useContext } from 'react';
import styled from 'styled-components';
import { PlayersContext } from '../../../contexts/PlayersProvider';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { PlayersView } from './PlayerView';

const Container = styled.div`
  width: 95%;
  height: 90vh;
  padding: 50px;
  margin: 0 auto;
  overflow-y: scroll;
`;

const PlayerListContainer = styled.div`
  display: grid;
  grid-template-columns: 25fr 25fr 25fr 25fr;
  grid-column-gap: 10px;
  grid-row-gap: 25px;
`;

const PlayerItemContainer = styled.div``;

export const PlayersList = () => {
  const { allPlayers, loadingPlayers } = useContext(PlayersContext);
  return (
    <React.Fragment>
      {loadingPlayers ? (
        <LoadingSpinner text="Loading players..." />
      ) : (
        <Container>
          <PlayerListContainer className="margins-off">
            {allPlayers
              .filter(player => player.tags.includes('tournament'))
              .map((player, index) => (
                <PlayerItemContainer key={player.id}>
                  <PlayersView player={player} index={index} />
                </PlayerItemContainer>
              ))}
          </PlayerListContainer>
        </Container>
      )}
    </React.Fragment>
  );
};
