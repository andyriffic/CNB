import React from 'react';
import styled from 'styled-components';
import { slideInUpAnimation } from '../../../../uplift/components/animations';
import { GasCard, GasPlayer } from '../../../providers/GasProvider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const StatsItem = styled.div`
  border: 2px solid white;
  padding: 4px;
  text-align: center;
`;

const StatsTitle = styled.div`
  font-size: 0.4rem;
  text-transform: uppercase;
`;

const StatsValue = styled.div`
  font-size: 0.8rem;
  font-family: ${({ theme }) => theme.fontFamily.numbers};
`;

type Props = {
  gasPlayer: GasPlayer;
};

function renderStat(title: string, value: number): JSX.Element {
  return (
    <StatsItem>
      <StatsTitle>{title}</StatsTitle>
      <StatsValue>{value}</StatsValue>
    </StatsItem>
  );
}

export function PlayerStatsSummary({ gasPlayer }: Props): JSX.Element {
  return (
    <Container>
      {renderStat('Total Presses', gasPlayer.totalPresses)}
      {renderStat('Total Points', gasPlayer.points)}
      {renderStat('Bonus Points', gasPlayer.guesses.correctGuessCount)}
    </Container>
  );
}
