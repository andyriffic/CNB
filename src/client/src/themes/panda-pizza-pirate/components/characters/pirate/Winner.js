import React from 'react';
import styled from 'styled-components';
import image from './pirate.png';

const StyledBear = styled.img`
  height: 100%;
  width: 100%;
`;

const Winner = ({ height, width }) => {
  return <StyledBear src={image} />;
};

export default Winner;
