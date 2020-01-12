import React from 'react';
import styled, { css } from 'styled-components';
import { PlayerStatsRecord } from '../../types';
import { PlayerStatsAvatar } from './PlayerStatsAvatar';
import { SubStatItem } from './SubStatItem';
import { MainHeading } from '../../components/Heading';
import {
  fadeInLeftAnimation,
  fadeInRightAnimation,
} from '../../components/animations';

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: flex-end;
`;

const AvatarContainer = styled.div`
  margin-right: 50px;
  animation: ${fadeInLeftAnimation} ease-in 500ms 1s both;
`;

const StatsContainer = styled.div``;

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
  playerStats: PlayerStatsRecord;
};

export const PlayerStatsProfile = ({ playerStats }: Props) => {
  return (
    <Container>
      <AvatarContainer>
        <PlayerStatsAvatar name={playerStats.player_name} />
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
