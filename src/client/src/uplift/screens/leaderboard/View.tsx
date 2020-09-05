import React from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { useGroupedStatsWithRanking } from '../../hooks/useGroupedStatsWithRanking';
import { usePlayerStats2020 } from '../../hooks/usePlayerStats2020';
import { usePlayerSnakesAndLaddersStats } from '../../hooks/usePlayerSnakesAndLaddersStats';
import { StatsGroup } from './StatsGroup';
import { usePlayerStatsAllTime } from '../../hooks/usePlayerStatsAllTIme';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100vh;
`;

const StatsContainer = styled.div`
  width: 50%;
  padding: 20px 20px 50px;
  background-color: #f78bd1;

  &:nth-child(even) {
    background-color: #d2082d;
  }
`;

type Props = {
  maxPlacing?: number;
} & RouteComponentProps;

export default ({ maxPlacing }: Props) => {
  const [groupStatsAllTime] = useGroupedStatsWithRanking(usePlayerStatsAllTime);
  const [groupStats2020] = useGroupedStatsWithRanking(usePlayerStats2020);
  const [groupStatsSnakesAndLadders] = useGroupedStatsWithRanking(
    usePlayerSnakesAndLaddersStats
  );

  return (
    <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
      <GameSettingsDrawer />
      <Container className="margins-off">
        <StatsContainer>
          <StatsGroup
            maxPlacing={maxPlacing}
            title={`All Time ${maxPlacing ? `top ${maxPlacing}` : ''}`}
            groupedStatsWithRanking={groupStatsAllTime}
          />
        </StatsContainer>
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
            title={`🍭 Candyland ${maxPlacing ? `top ${maxPlacing}` : ''}`}
            groupedStatsWithRanking={groupStatsSnakesAndLadders}
          />
        </StatsContainer>
      </Container>
    </FullPageScreenLayout>
  );
};
