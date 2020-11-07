import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { PlayerEdit } from './PlayerEdit';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PlayerContainer = styled.div`
  border: 1px solid black;
  flex-basis: 220px;
`;

export const PlayerEditList = () => {
  const { allPlayers, subscribeToPlayers } = usePlayersProvider();

  useEffect(() => {
    subscribeToPlayers();
  }, []);

  return (
    <Container className="margins-off">
      {allPlayers &&
        allPlayers.map(player => (
          <PlayerContainer key={player.id}>
            <PlayerEdit player={player} />
          </PlayerContainer>
        ))}
    </Container>
  );
};
