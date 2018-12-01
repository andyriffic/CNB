/* @flow */
import React from 'react';
import styled from 'styled-components';
import image from './ninja-xmas.jpg'

const StyledNinja = styled.img`
  height: ${props=> props.height}px;
  width: ${props=> props.width}px;
`;

type Props = {
}

const Winner = () => {
  const size = 130;

  return (
    <StyledNinja src={image} width={`${size}px`} height={`${size}px`} alt="Ninja Santa"/>
  );
}

export default Winner;
