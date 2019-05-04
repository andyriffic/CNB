import React from 'react';
import styled from 'styled-components';
import RainbowText from './rainbow-text';

const StyledLink = styled.a`
  font-size: 0.8rem;
  text-decoration: none;
  padding: 20px 0;
  display: inline-block;
`;

export const FancyLink = ({ children, ...props }) => {
  return (
    <StyledLink {...props}>
      <RainbowText>{children}</RainbowText>
    </StyledLink>
  );
};
