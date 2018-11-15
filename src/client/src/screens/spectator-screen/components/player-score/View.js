import React, { useContext } from 'react';
import styled from 'styled-components';
import ScoreboardContext from '../../../../contexts/ScoreboardContext';

const Score = styled.div`
  font-size: 3rem;
`;

const View = ( { playerKey } ) => {

  const scores = useContext(ScoreboardContext);

  if (!scores || !playerKey) return null;

  const playerScore = scores[playerKey];

  if (!playerScore) return null;

  return (<Score>{playerScore.value}</Score>);
}

export default View;
