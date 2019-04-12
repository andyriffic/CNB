/* @flow */
import React from 'react';
import styled from 'styled-components';
import image from './easter-egg.png';

const StyledCowboy = styled.img`
  height: 100%;
  width: 100%;
`;

type Props = {};

const Winner = ({ height, width }: Props) => {
  return <StyledCowboy src={image} />;
};

export default Winner;
