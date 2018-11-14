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

const fadeInFadeOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {opacity: 1;}
  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;


const Container = styled.div`
  border: 1px solid black;
  height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const CharacterContainer = styled.div`
  opacity: 0;
`;

const InitialCharacterAnimaton = styled(CharacterContainer)`
  animation: ${fadeInFadeOut} 5s linear 1 forwards;
`;

const ResultCharacterAnimation = styled(CharacterContainer)`
  animation: ${fadeIn} 2s linear 6s 1 forwards;
`;

const CenteredText = styled.span`
  align-self: center;
`;

const getCharacter = (move, isWinner) => {
  console.log(move, isWinner);
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
        <InitialCharacterAnimaton>{ getCharacter(player.move, true) }</InitialCharacterAnimaton>
        <ResultCharacterAnimation>{ getCharacter(player.move, isWinner) }</ResultCharacterAnimation>
        <CenteredText>{ player.name }</CenteredText>
      </Container>
    </React.Fragment>
  )
}

export default PlayerResult;
