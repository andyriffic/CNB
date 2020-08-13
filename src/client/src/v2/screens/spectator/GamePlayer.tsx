import React from 'react';
import styled from 'styled-components';
import { SOCKETS_ENDPOINT } from '../../../environment';

const PlayerImage = styled.img`
  width: 12vw;
  height: 18vw;
`;

type Props = {
  imageUrl: string;
};

export const GamePlayer = ({ imageUrl }: Props) => {
  return <PlayerImage src={`${SOCKETS_ENDPOINT}${imageUrl}`} />;
};
