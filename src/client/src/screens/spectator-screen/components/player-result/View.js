/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

import Switch from '../../../../components/switch';

import BearImage from '../../../../components/characters/bear';
import NinjaImage from '../../../../components/characters/ninja';
import CowboyImage from '../../../../components/characters/cowboy';

type Props = {
  player: Object,
  isWinner: boolean,
}

const zoomIn = keyframes`
  0% {
    transform: scale(.1, .1);
  }
  60% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;


const Container = styled.div`
  background-color: #ffb758;
  height: 200px;
  width: 200px;
`;

const CharacterPosition = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const CharacterContainer = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  height: 100%;
  width: 100%;
`;

const InitialCharacterAnimaton = styled(CharacterContainer)`
  animation: ${zoomIn} 1s linear 1 forwards;
`;

const ResultCharacterAnimation = styled(CharacterContainer)`
  opacity: 0;
  animation: ${fadeIn} 1s linear 2.5s 1 forwards;
`;

const Title = styled.div`
    margin: 0;
    padding: 5px 0;
    font-size: 1.5rem;
    color: #20253f;
    text-align: center;
`;

const getCharacter = (move, isWinner) => {
  return (
    <Switch>
      <BearImage showIf={move==='bear'} height={50} width={50} loser={!isWinner} />
      <NinjaImage showIf={move==='ninja'} height={50} width={50} loser={!isWinner} />
      <CowboyImage showIf={move==='cowboy'} height={50} width={50} loser={!isWinner} />
    </Switch>
  );
}


const PlayerResult = ( {player, isWinner}: Props ) => {
  return (
    <React.Fragment>
      <Container>
        <Title>{ player.name }</Title>
        <CharacterPosition>
          <InitialCharacterAnimaton>{ getCharacter(player.move, true) }</InitialCharacterAnimaton>
          <ResultCharacterAnimation>{ getCharacter(player.move, isWinner) }</ResultCharacterAnimation>
        </CharacterPosition>
      </Container>
    </React.Fragment>
  )
}

export default PlayerResult;
