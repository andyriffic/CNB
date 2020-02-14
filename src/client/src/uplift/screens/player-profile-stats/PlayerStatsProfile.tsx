import React from 'react';
import styled, { css } from 'styled-components';
import { PlayerStatsRecordWithRanking } from '../../types';
import { PlayerStatsAvatar } from './PlayerStatsAvatar';
import { SubStatItem } from './SubStatItem';
import { MainHeading } from '../../components/Heading';
import {
  fadeInLeftAnimation,
  fadeInRightAnimation,
  fadeInAnimation,
} from '../../components/animations';
import { Medal } from '../../components/Medal';
import { getOrdinal } from '../../utils/ordinal';

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-right: 50px;
  animation: ${fadeInLeftAnimation} ease-in 500ms 1s both;
`;

const StatsContainer = styled.div``;

const RankPositionContainer = styled.div`
  display: flex;
  width: 180px;
  height: 180px;
  position: absolute;
  bottom: -90px;
  left: 60px;
  animation: ${fadeInAnimation} ease-in-out 400ms 5.5s both;
`;

const StatsItemContainer = styled.div<{ index: number }>`
  ${props =>
    css`
      animation: ${fadeInRightAnimation} ease-in 500ms ${props.index + 2}s both;
    `};
`;

const PlayerName = styled.div`
  font-size: 2rem;
  animation: ${fadeInLeftAnimation} ease-in 500ms 1s both;
`;

type Props = {
  playerStats: PlayerStatsRecordWithRanking;
  position?: number;
};

export const PlayerStatsProfile = ({ playerStats, position }: Props) => {
  return (
    <Container>
      <AvatarContainer>
        <PlayerStatsAvatar name={playerStats.player_name} />
        <RankPositionContainer>
          <Medal>{position !== undefined ? getOrdinal(position) : ''}</Medal>
        </RankPositionContainer>
      </AvatarContainer>
      <StatsContainer className="margins-off">
        <PlayerName>
          <MainHeading>{playerStats.player_name}</MainHeading>
        </PlayerName>
        <div>
          <StatsItemContainer index={0}>
            <SubStatItem
              title="Wins"
              value={playerStats.times_won}
              type="wins"
            />
          </StatsItemContainer>
          <StatsItemContainer index={1}>
            {' '}
            <SubStatItem
              title="Draws"
              value={playerStats.times_drawn}
              type="draws"
            />
          </StatsItemContainer>
          <StatsItemContainer index={2}>
            <SubStatItem
              title="Losses"
              value={playerStats.times_lost}
              type="losses"
            />
          </StatsItemContainer>
        </div>
      </StatsContainer>
    </Container>
  );
};
