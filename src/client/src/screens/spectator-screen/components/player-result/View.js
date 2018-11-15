/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

import Switch from '../../../../components/switch';

import BearImage from '../../../../components/characters/bear';
import NinjaImage from '../../../../components/characters/ninja';
import CowboyImage from '../../../../components/characters/cowboy';

import NinjaWinning from '../../../../components/winning-animations/ninja';
import BearWinning from '../../../../components/winning-animations/bear';
import CowboyWinning from '../../../../components/winning-animations/cowboy';

type Props = {
  player: Object,
  isWinner: boolean,
}

const initialAnimationDelay = 0;
const resultAnimationDelay = 1;
const losingAnimationDelay = resultAnimationDelay;

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

const AnimatedLoss = styled.div`
  position: absolute;
  height: 50%;
  width: 100%;
  opacity: 0;
  animation: ${fadeIn} 1s linear ${losingAnimationDelay}s 1 forwards;
`;

const InitialCharacterAnimaton = styled(CharacterContainer)`
  animation: ${zoomIn} 1s linear ${initialAnimationDelay}s 1 forwards;
`;

const ResultCharacterAnimation = styled(CharacterContainer)`
  opacity: 0;
  animation: ${fadeIn} 1s linear ${resultAnimationDelay}s 1 forwards;
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

const getLosingAnimation = (isWinner, isDraw, otherPlayersMove) => {
  return (
    <Switch>
      <CowboyWinning showIf={!isWinner && !isDraw && otherPlayersMove === 'cowboy'} animationDelay={losingAnimationDelay}/>
      <NinjaWinning showIf={!isWinner && !isDraw && otherPlayersMove === 'ninja'} animationDelay={losingAnimationDelay}/>
      <BearWinning showIf={!isWinner && !isDraw && otherPlayersMove === 'bear'} animationDelay={losingAnimationDelay}/>
    </Switch>
  );
}


const PlayerResult = ( {player, isWinner, isDraw, otherPlayersMove}: Props ) => {
  return (
    <React.Fragment>
      <Container>
        <Title>{ player.name }</Title>
        <CharacterPosition>
          <InitialCharacterAnimaton>{ getCharacter(player.move, true) }</InitialCharacterAnimaton>
          <ResultCharacterAnimation>{ getCharacter(player.move, isWinner) }</ResultCharacterAnimation>
          <AnimatedLoss>{ getLosingAnimation(isWinner, isDraw, otherPlayersMove) }</AnimatedLoss>
        </CharacterPosition>
      </Container>
    </React.Fragment>
  )
}

export default PlayerResult;
