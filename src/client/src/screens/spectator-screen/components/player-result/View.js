/* @flow */
import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import Switch from '../../../../components/switch';

import TranslatedPlayerName from '../../../../components/translated-player-name';
import GameThemeContext from '../../../../contexts/GameThemeContext';

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
    font-size: 1rem;
    color: #20253f;
    text-align: center;
`;

const getCharacter = (characterMapping, move, isWinner) => {
  return (
    <Switch>
      {Object.keys(characterMapping).map(key => {
        const CharacterComponent = characterMapping[key];
        return <CharacterComponent key={key} showIf={move === key} height={50} width={50} loser={!isWinner}/>;
      })}
    </Switch>
  );
}

const getLosingAnimation = (animationMapping, isWinner, isDraw, otherPlayersMove, isLeft) => {
  return (
    <Switch>
      {Object.keys(animationMapping).map(key => {
        const AnimatedComponent = animationMapping[key];
        return (
        <AnimatedComponent key={key} showIf={!isWinner && !isDraw && otherPlayersMove === key}
          animationDelay={losingAnimationDelay}
          isLeft={isLeft}/>
        );
      })}
    </Switch>
  );
}


const PlayerResult = ( {player, isWinner, isDraw, otherPlayersMove, isLeft}: Props ) => {

  const theme = useContext(GameThemeContext);
  const characterMapping = theme.characters.characterMapping;
  const animationMapping = theme.characters.winningAnimationMapping;

  return (
    <React.Fragment>
      <Container>
        <Title>
          <TranslatedPlayerName playerName={ player.name } />
        </Title>
        <CharacterPosition>
          <InitialCharacterAnimaton>{ getCharacter(characterMapping, player.move, true) }</InitialCharacterAnimaton>
          <ResultCharacterAnimation>{ getCharacter(characterMapping, player.move, isWinner) }</ResultCharacterAnimation>
          <AnimatedLoss>{ getLosingAnimation(animationMapping, isWinner, isDraw, otherPlayersMove, isLeft) }</AnimatedLoss>
        </CharacterPosition>
      </Container>
    </React.Fragment>
  )
}

export default PlayerResult;
