import React from 'react';
import styled from 'styled-components';
import { SpectatorMove } from '../../../contexts/MatchupProvider';
import { PlayerSnakesAndLaddersMoves } from './PlayerSnakesAndLaddersMoves';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #b67b65;
`;

const TeamContainer = styled.div`
  flex: 1;
`;

export const PlayerSnakesAndLaddersMovesContainer = ({
  moves,
}: {
  moves: [SpectatorMove, SpectatorMove];
}) => {
  return (
    <Container className="margins-off">
      <TeamContainer>
        <PlayerSnakesAndLaddersMoves playerId={moves[0].playerId} />
      </TeamContainer>
      <TeamContainer>
        <PlayerSnakesAndLaddersMoves playerId={moves[1].playerId} />
      </TeamContainer>
    </Container>
  );
};
