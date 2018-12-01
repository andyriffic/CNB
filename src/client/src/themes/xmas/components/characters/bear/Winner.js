/* @flow */
import React from 'react';
import styled from 'styled-components';
import image from './ebenezer-claws.jpg';

const StyledBear = styled.img`
`;

type Props = {
}

const Winner = ( { height, width }: Props ) => {
  return (
    <StyledBear src={image} width="130px" height="130px" />
  );
}

export default Winner;
