/* @flow */
import React from 'react';
import styled from 'styled-components';
import image from './cowboy.png';

const StyledCowboy = styled.img`
`;

type Props = {
}

const Winner = ( { height, width }: Props ) => {
  return (
    <StyledCowboy src={image} width="130px" height="130px" />
  );
}

export default Winner;
