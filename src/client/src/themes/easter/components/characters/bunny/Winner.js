import React from 'react';
import styled from 'styled-components';
import image from './bunny.png';

const StyledNinja = styled.img`
  height: 100%;
  width: 100%;
`;

const Winner = () => {
  return <StyledNinja src={image} alt="Easter Bunny" />;
};

export default Winner;
