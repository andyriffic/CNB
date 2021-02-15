import React from 'react';
import styled, { css } from 'styled-components';
import {
  fadeInAnimation,
  fadeInLeftAnimation,
  fadeInRightAnimation,
} from '../../../uplift/components/animations';
import { Medal } from '../../../uplift/components/Medal';
import { PlayerStatsRecordWithRanking } from '../../../uplift/types';
import { getOrdinal } from '../../../uplift/utils/ordinal';
import { PlayerAvatar } from '../../components/player-avatar';
import { FeatureText } from '../../components/ui/Atoms';
import { Player } from '../../providers/PlayersProvider';
import { SubStatItem } from './SubStatItem';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 10px;
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
  player: Player;
};

export const PlayerStatsProfile = ({
  playerStats,
  position,
  player,
}: Props) => {
  return (
    <Container>
      <AvatarContainer>
        <PlayerAvatar player={player} size="large" />
        {/* <RankPositionContainer>
          <Medal>{position !== undefined ? getOrdinal(position) : ''}</Medal>
        </RankPositionContainer> */}
      </AvatarContainer>
      <StatsContainer className="margins-off">
        <PlayerName>
          <FeatureText>{playerStats.player_name}</FeatureText>
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
