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
  position: fixed;
  top: 1vw;
  width: 40vw;
  left: 30vw;
  text-align: center;
  font-size: 0.7rem;
  z-index: 1;

  animation: ${fadeIn} 500ms linear 10s 1 forwards;

  span {
    display: block;
  }

  img {
    width: 100%;
    max-height: 35vmin;
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
      props.isLeft ? 'rotate(-24deg);' : 'rotate(-60deg);'};
  }
`;

const getRandomSaying = sayings => {
  const randomIndex = Math.floor(Math.random() * sayings.length);
  return sayings[randomIndex];
};

const View = ({ player, isWinner, isLeft }) => {
  if (!isWinner) {
    return null;
  }
  const theme = useContext(GameThemeContext);

  const phrase = getRandomSaying(theme.characters.winningPhrases[player.move]);

  if (!phrase.imageUrl) {
    return null;
  }

  return (
    <SpeechBubble isLeft={isLeft}>
      <img src={phrase.imageUrl} />
    </SpeechBubble>
  );
};

export default View;
