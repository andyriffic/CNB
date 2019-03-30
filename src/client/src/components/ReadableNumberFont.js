import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  font-family: 'Changa One', cursive;
`;

export const ReadableNumberFont = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
