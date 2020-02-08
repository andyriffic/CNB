import React, { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  transition: background-color 300ms ease-in-out;
  font-family: 'Rammetto One', cursive;
  padding: 0.75em 1.4em;
  cursor: pointer;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  background-color: #ff00ff;
  border: 0;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  font-size: 0.7rem;
  &:hover {
    box-shadow: inset 0 -0.6em 0 -0.5em rgba(0, 0, 0, 0.17);
    background-color: #ffff00;
  }
`;

export const SecondaryButton = ({
  children,
  ...otherProps
}: ComponentPropsWithoutRef<any & HTMLButtonElement>) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};
