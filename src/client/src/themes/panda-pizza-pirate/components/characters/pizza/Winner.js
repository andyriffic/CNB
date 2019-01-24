/* @flow */
import React from 'react';
import styled from 'styled-components';
import image from './pizza.png';

const StyledNinja = styled.img`
  height: 100%;
  width: 100%;
`;

const Winner = () => {
  return <StyledNinja src={image} alt="Piece-o-pizza" />;
};

export default Winner;
