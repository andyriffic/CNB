/* @flow */
import React from 'react';
import styled from 'styled-components';
import image from './pirate.png';

const StyledBear = styled.img`
  height: 100%;
  width: 100%
`;

type Props = {
}

const Winner = ( { height, width }: Props ) => {
  return (
    <StyledBear src={image} />
  );
}

export default Winner;
