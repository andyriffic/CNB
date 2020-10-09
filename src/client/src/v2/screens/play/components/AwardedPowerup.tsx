import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MainHeading } from '../../../../uplift/components/Heading';
import { PowerupBadge } from '../../../../uplift/components/PowerupBadge';
import { getPlayerPowerups } from '../../../../uplift/utils/player';
import { Player } from '../../../providers/PlayersProvider';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: steelblue;
  z-index: 999;
  text-align: center;
`;

const AwardContainer = styled.div`
  padding: 50px 0;
`;

type Props = {
  player: Player;
};

export const AwardedPowerup = ({ player }: Props) => {
  const [awardedPowerUp, setAwardedPowerUp] = useState('');
  const existingPowerUps = useRef(getPlayerPowerups(player.tags));

  useEffect(() => {
    const newPowerUps = getPlayerPowerups(player.tags);
    if (
      newPowerUps['DOUBLE_POINTS'] > existingPowerUps.current['DOUBLE_POINTS']
    ) {
      setAwardedPowerUp('DOUBLE_POINTS');
    }
    if (
      newPowerUps['POINT_STEALER'] > existingPowerUps.current['POINT_STEALER']
    ) {
      setAwardedPowerUp('POINT_STEALER');
    }
    if (newPowerUps['SHORT_FUSE'] > existingPowerUps.current['SHORT_FUSE']) {
      setAwardedPowerUp('SHORT_FUSE');
    }
    existingPowerUps.current = newPowerUps;
  }, [player]);

  return awardedPowerUp ? (
    <Container onClick={() => setAwardedPowerUp('')}>
      <AwardContainer>
        <MainHeading>You got a Powerup!</MainHeading>
        <PowerupBadge powerupName={awardedPowerUp} />{' '}
      </AwardContainer>
    </Container>
  ) : null;
};
