import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import GameThemeContext from '../../../../../../contexts/GameThemeContext';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SpeechBubble = styled.p`
  opacity: 0;
  margin: 0;
  padding: 10px;
  border: 2px solid black;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 2px;  
  font-size: 0.5rem;
  width: 38vw;
  z-index: 1;

  animation: ${fadeIn} 500ms linear 12s 1 forwards;

  ${props => (props.isLeft ? 'right: -31vw;' : 'left: -31vw;')}  

  span {
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    ${props => (props.isLeft ? 'left: 1px;' : 'right: 1px;')}
    width: 0;
    height: 0;
    display: block;
    width: 15px;
    height: 15px;
    background-color: white;
    border: 2px solid black;
    border-top: 0;
    border-right: 0;
    transform: ${props =>
      props.isLeft ? 'rotate(-24deg);' : 'rotate(-60deg);'}
`;

const View = ({player, isWinner, isLeft}) => {  
  if (!isWinner) {
    return null;
  }
  const theme = useContext(GameThemeContext);

  return (
    <SpeechBubble isLeft={isLeft}>
      <span>{theme.characters.winningPhrases[player.move][0].english}</span>
      <span>{theme.characters.winningPhrases[player.move][0].chinese}</span>
    </SpeechBubble>
  );
};

export default View;
