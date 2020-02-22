import React from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { useGroupedStatsWithRanking } from '../../hooks/useGroupedStatsWithRanking';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { usePlayerSnakesAndLaddersStats } from '../../hooks/usePlayerSnakesAndLaddersStats';
import { StatsGroup } from './StatsGroup';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
`;

const StatsContainer = styled.div`
  width: 50%;
  padding: 20px 20px 50px;
  &:last-child {
    background-color: #3d4a3e;
  }
`;

type Props = {
  maxPlacing?: number;
} & RouteComponentProps;

export default ({ maxPlacing }: Props) => {
  const [groupStats2020] = useGroupedStatsWithRanking(usePlayerStats);
  const [groupStatsSnakesAndLadders] = useGroupedStatsWithRanking(
    usePlayerSnakesAndLaddersStats
  );

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
        <GameSettingsDrawer />
        <Container className="margins-off">
          <StatsContainer>
            <StatsGroup
              maxPlacing={maxPlacing}
              title={`2020 ${maxPlacing ? `top ${maxPlacing}` : ''}`}
              groupedStatsWithRanking={groupStats2020}
            />
          </StatsContainer>
          <StatsContainer>
            <StatsGroup
              maxPlacing={maxPlacing}
              title={`Snakes & Ladders ${
                maxPlacing ? `top ${maxPlacing}` : ''
              }`}
              groupedStatsWithRanking={groupStatsSnakesAndLadders}
            />
          </StatsContainer>
        </Container>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
