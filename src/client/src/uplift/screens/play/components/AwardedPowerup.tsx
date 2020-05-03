import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Player } from '../../../contexts/PlayersProvider';
import { getPlayerPowerups } from '../../../utils/player';
import { PowerupBadge } from '../../../components/PowerupBadge';
import { Heading } from '../../../../components/form/radio-select/styles';
import { MainHeading } from '../../../components/Heading';

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
