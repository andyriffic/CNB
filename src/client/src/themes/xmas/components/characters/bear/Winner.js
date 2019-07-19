import React from 'react';
import styled from 'styled-components';
import image from './ebenezer-claws.png';

const StyledBear = styled.img``;

const Winner = ({ height, width }) => {
  return <StyledBear src={image} width="130px" height="130px" />;
};

export default Winner;
