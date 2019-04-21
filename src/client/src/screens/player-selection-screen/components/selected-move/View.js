import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageSubTitle } from '../../../styled';
import GameThemeContext from '../../../../contexts/GameThemeContext';
import PowerUpBadge from '../../../../components/power-up-badges';
import PlayerAvatar from '../../../../components/player-avatar';

const Container = styled.div`
  position: relative;
`;

const PowerUpContainer = styled.div`
  width: 30vmin;
  height: 30vmin;
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
`;

const AvatarContainer = styled.div`
  width: 30vmin;
  height: 30vmin;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const View = ({ selectedMove, title, loser, selectedPowerUp, avatar }) => {
  const theme = useContext(GameThemeContext);
  const Component = theme.characters.selectMoveMapping[selectedMove];
  return (
    <Container>
      <PageSubTitle>{title}</PageSubTitle>
      <Component selected loser={loser} />
      <PowerUpContainer>
        <PowerUpBadge type={selectedPowerUp} bigText />
      </PowerUpContainer>
      <AvatarContainer>
        <PlayerAvatar avatar={avatar} />
      </AvatarContainer>
    </Container>
  );
};

export default View;
