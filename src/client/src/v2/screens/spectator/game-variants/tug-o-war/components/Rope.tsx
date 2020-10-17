import React, { FC } from 'react';
import styled from 'styled-components';
import ropeImage from '../assets/rope.png';

const RopeBackground = styled.div`
  width: 50vw;
  height: 2vw;
  background: transparent url(${ropeImage}) repeat-x center center;
  background-size: contain;
`;

export const Rope: FC = () => {
  return <RopeBackground />;
};
