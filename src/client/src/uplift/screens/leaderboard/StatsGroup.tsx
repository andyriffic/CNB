import React from 'react';
import styled, { css } from 'styled-components';
import { PlayerStatsRecordWithRanking } from '../../types';
import { MainHeading } from '../../components/Heading';
import { getOrdinal } from '../../utils/ordinal';
import { fadeInRightAnimation } from '../../components/animations';
import { StatsGraph } from './StatsGraph';

const Container = styled.div``;

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

const RankName = styled.a`
  width: 25%;
  color: #754f44;
  font-size: 0.8rem;
  display: block;
  text-decoration: none;

  transition: all 200ms ease-in-out;

  &:hover {
    color: #ba3f1d;
    transform: scale(1.2);
  }
`;

const RankStats = styled.div`
  width: 60%;
`;

const PositionMedal = styled.span`
  font-size: 1rem;
`;

const placeOrdinalOverride = [
  <PositionMedal>🥇</PositionMedal>,
  <PositionMedal>🥈</PositionMedal>,
  <PositionMedal>🥉</PositionMedal>,
];

type Props = {
  title: string;
  groupedStatsWithRanking: PlayerStatsRecordWithRanking[][] | undefined;
  maxPlacing?: number;
};

export const StatsGroup = ({
  title,
  groupedStatsWithRanking,
  maxPlacing,
}: Props) => {
  return (
    <Container className="margins-off">
      <MainHeading>{title}</MainHeading>
      <RankingList>
        {groupedStatsWithRanking &&
          groupedStatsWithRanking
            .filter((s, i) => !maxPlacing || i <= maxPlacing - 1)
            .map((rankGroup, i) =>
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
                    <RankName href={`/player/profile/${player.player_name}`}>
                      {player.player_name}
                    </RankName>
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
  );
};
