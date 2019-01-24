import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ScoreboardContext from '../../../../contexts/ScoreboardContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import GameSoundContext from '../../../../contexts/GameSoundContext';

const rubberBandAnimation = keyframes`
  0% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  30% {
    -webkit-transform: scaleX(1.25) scaleY(0.75);
    -ms-transform: scaleX(1.25) scaleY(0.75);
    transform: scaleX(1.25) scaleY(0.75);
  }

  40% {
    -webkit-transform: scaleX(0.75) scaleY(1.25);
    -ms-transform: scaleX(0.75) scaleY(1.25);
    transform: scaleX(0.75) scaleY(1.25);
  }

  60% {
    -webkit-transform: scaleX(1.15) scaleY(0.85);
    -ms-transform: scaleX(1.15) scaleY(0.85);
    transform: scaleX(1.15) scaleY(0.85);
  }

  100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
`;

const sonar = keyframes`
  0% {transform: scale(.9); opacity:1;}
  100% {transform: scale(2);opacity: 0;}
`;

const pulse = keyframes`
  0% {transform: scale(1);}
  20% {transform: scale(1.4); }
  50% {transform: scale(.9);}
  80% {transform: scale(1.2);}
  100% {transform: scale(1);}
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'Changa One', cursive;
`;

const Badge = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  background: #ff0000;
  cursor: default;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  height: 40px;
  line-height: 1.55;
  margin-top: 0;
  margin-left: 0;
  border: 3px solid #fff;
  text-align: center;
  display: inline-block;
  width: 40px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  animation: ${pulse} 1.5s infinite;

  &:after {
    content: '';
    border: 2px solid rgba(255, 0, 0, 0.5);
    opacity: 0;
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    animation: ${sonar} 1.5s infinite;
  }
`;

const Score = styled.div`
  font-size: ${props => (props.isBonus ? '1rem' : '3rem')};
  text-align: center;

  &.updated {
    animation: ${rubberBandAnimation} 1s linear;
  }
`;

const View = ({ playerKey }) => {
  const [value, setValue] = useState(null);
  const [incremented, setIncremented] = useState(null);
  const [updated, setUpdated] = useState(false);
  const soundService = useContext(GameSoundContext);
  const scores = useContext(ScoreboardContext);

  if (!scores || !playerKey) return null;

  const playerScore = scores[playerKey];

  if (!playerScore) return null;

  useEffect(() => {
    if (playerScore.value === value) {
      return;
    }

    setValue(playerScore.value);

    if (value !== null) {
      const totalPointsAwarded = playerScore.value - value;
      setIncremented(totalPointsAwarded);
      for (let i = 0; i < totalPointsAwarded; i++) {
        setTimeout(() => {
          soundService.play(SOUND_KEYS.POINTS_INCREASE, true);
        }, i * 600);
      }
      setUpdated(true);
    }
  });

  return (
    <Container>
      {incremented && incremented > 0 && <Badge>+{incremented}</Badge>}
      <Score
        isBonus={playerKey === 'BONUS'}
        className={updated ? 'updated' : ''}
      >
        {playerScore.value}
      </Score>
    </Container>
  );
};

export default View;
