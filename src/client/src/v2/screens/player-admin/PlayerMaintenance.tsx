import React, { useState } from 'react';
import styled from 'styled-components';
import { usePlayersProvider } from '../../providers/PlayersProvider';
import { usePlayerMaintenance } from './usePlayerMainentance';

const Container = styled.div`
  padding: 5px;
`;

export const PlayerMaintenance = () => {
  const { setAllRacersRandomMoves } = usePlayerMaintenance();

  return (
    <Container className="margins-off">
      <fieldset>
        <button type="button" onClick={setAllRacersRandomMoves}>
          Set random racing moves
        </button>
      </fieldset>
    </Container>
  );
};
