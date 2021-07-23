import React from 'react';
import styled from 'styled-components';
import { useMobLeaderboard } from '../../../providers/MobLeaderboardProvider';

const Container = styled.div`
  position: absolute;
  left: 0;
  border: 2px solid black;
  border-left: 0;
`;

const TopRoundContainer = styled.div`
  position: absolute;
  left: 0;
  border: 2px solid black;
  border-left: 0;
  border-radius: 0 8px 8px 0;
  display: flex;
`;

const TopRoundDescription = styled.div`
  background-color: white;
  color: black;
  font-size: ${({ theme }) => theme.fontSize.small};
  width: 80px;
  padding: 6px;
`;

const TopRoundPlayers = styled.div`
  width: 80px;
`;

const TopMobRound = (): JSX.Element => {
  return (
    <TopRoundContainer>
      <TopRoundDescription>Beat 12 players in 2 rounds</TopRoundDescription>
      <TopRoundPlayers />
    </TopRoundContainer>
  );
};

export const MobLeaders = (): JSX.Element | null => {
  const { topMainPlayerStats } = useMobLeaderboard();

  if (!topMainPlayerStats) return null;

  return (
    <Container>
      <h3>Top mob players</h3>
      <TopMobRound />
    </Container>
  );
};
