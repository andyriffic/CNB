import React from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { MainHeading } from '../../components/Heading';
import { useGroupedStatsWithRanking } from '../../hooks/useGroupedStatsWithRanking';
import { getOrdinal } from '../../utils/ordinal';
import { StatsGraph } from './StatsGraph';
import { fadeInRightAnimation } from '../../components/animations';

const Container = styled.div`
  width: 790px;
  margin: 0 auto 50px auto;
`;

const RankingList = styled.div``;
const RankItem = styled.div<{ index: number }>`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fbf6d9;
  border-radius: 8px;
  ${props =>
    css`
      animation: ${fadeInRightAnimation} 400ms ${props.index * 200}ms
        ease-in-out both;
    `}
`;

const RankPosition = styled.div`
  font-family: 'Changa One', cursive;
  width: 15%;
  color: #ec7357;
  white-space: nowrap;
`;

const RankName = styled.div`
  width: 25%;
  color: #754f44;
`;

const RankStats = styled.div`
  width: 60%;
`;

const PositionMedal = styled.span`
  font-size: 1.6rem;
`;

const placeOrdinalOverride = [
  <PositionMedal>🥇</PositionMedal>,
  <PositionMedal>🥈</PositionMedal>,
  <PositionMedal>🥉</PositionMedal>,
];

export default ({ navigate }: RouteComponentProps) => {
  const [groupedStatsWithRanking] = useGroupedStatsWithRanking();

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
        <GameSettingsDrawer />
        <Container>
          <MainHeading>Leaderboard 2020</MainHeading>
          <RankingList>
            {groupedStatsWithRanking &&
              groupedStatsWithRanking.map((rankGroup, i) =>
                rankGroup.map(player => {
                  const equalPosition = groupedStatsWithRanking[i].length > 1;
                  return (
                    <RankItem
                      key={player.player_name}
                      className="margins-off"
                      index={i}
                    >
                      <RankPosition>
                        {placeOrdinalOverride[i] || getOrdinal(i + 1)}
                        {equalPosition && '='}
                      </RankPosition>
                      <RankName>{player.player_name}</RankName>
                      <RankStats>
                        <StatsGraph
                          wins={player.times_won}
                          draws={player.times_drawn}
                          losses={player.times_lost}
                        />
                      </RankStats>
                    </RankItem>
                  );
                })
              )}
          </RankingList>
        </Container>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
