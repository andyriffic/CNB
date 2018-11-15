import React, { useContext, useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ScoreboardContext from '../../../../contexts/ScoreboardContext';

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

const Score = styled.div`
  font-size: 3rem;
  text-align: center;

  &.updated {
    animation: ${rubberBandAnimation} 1s linear;
  }
`;

const View = ( { playerKey } ) => {

  const [value, setValue] = useState(null);
  const [updated, setUpdated] = useState(false);
  const scores = useContext(ScoreboardContext);

  if (!scores || !playerKey) return null;

  const playerScore = scores[playerKey];

  if (!playerScore) return null;

  useEffect(() => {
    if (playerScore.value === value) {
      return;
    };

    setValue(playerScore.value);

    if (value !== null) {
      setUpdated(true);
    }
  })

  return (<Score className={ updated ? 'updated' : ''}>{playerScore.value}</Score>);
}

export default View;
