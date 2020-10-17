import React, { FC } from 'react';
import styled from 'styled-components';
import cliffEdgeImage from '../assets/cliff-edge.png';

const Cliff = styled.img``;

export const CliffEdge: FC = () => {
  return <Cliff src={cliffEdgeImage} />;
};
