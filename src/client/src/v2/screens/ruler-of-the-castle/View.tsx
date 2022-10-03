import React from 'react';
import styled from 'styled-components';
import { SplashText } from '../../components/SplashText';
import backgroundImage from './castle-background.jpg';
import { CastleUiPlayer } from './CastleUiPlayer';
import { useCastleState } from './useCastleState';

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Background = styled.div`
  background-size: cover;
  width: 1536px;
  height: 854px;
  background-image: url(${backgroundImage});
  overflow: hidden; /* change to hidden once debugging done */
  position: relative;
`;

const View = () => {
  const castleState = useCastleState();

  return (
    <Container>
      <Background>
        {castleState.attackingPlayer && (
          <CastleUiPlayer castlePlayer={castleState.attackingPlayer} />
        )}
        {castleState.defendingPlayer && (
          <CastleUiPlayer castlePlayer={castleState.defendingPlayer} />
        )}
      </Background>
      {castleState.attackingPlayer && castleState.attackingPlayer.player && (
        <SplashText>
          {castleState.attackingPlayer.player.name} approaches!
        </SplashText>
      )}
    </Container>
  );
};

export default View;
