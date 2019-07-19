import React from 'react';
import styled from 'styled-components';
import image from './panda.png';

const StyledCowboy = styled.img`
  height: 100%;
  width: 100%;
`;

const Winner = ({ height, width }) => {
  return <StyledCowboy src={image} />;
};

export default Winner;
