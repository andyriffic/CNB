import React from 'react';
import styled, { keyframes } from 'styled-components';

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
  top: -10vmin;  
  font-size: 0.7rem;
  width: 38vw;
  z-index: 1;

  animation: ${fadeIn} 500ms linear 10s 1 forwards;

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

// Temp hack fix. Component re-renders on some parent state updates.
// Make this deterministic by getting unique saying per day
const getSayingForDate = sayings => {
  // Just grab the remainder if you divide the current date by total sayings, this will give unique array index per day
  // Don't trust my maths so wrap in try/catch just in case
  try {
    const date = new Date().getDate();
    const index = date % sayings.length;
    return sayings[index];
  } catch {
    return sayings[0];
  }
};

const View = ({ player, isWinner, isLeft, theme }) => {
  if (!isWinner) {
    return null;
  }
  const phrase = getSayingForDate(theme.characters.winningPhrases[player.move]);

  if (!phrase.english) {
    return null;
  }

  return (
    <SpeechBubble isLeft={isLeft}>
      <span>{phrase.english}</span>
      <span>{phrase.chinese}</span>
    </SpeechBubble>
  );
};

export default View;
