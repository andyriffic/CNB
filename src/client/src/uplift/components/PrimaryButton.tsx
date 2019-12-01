import React, { ButtonHTMLAttributes, ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  transition: background-color 200ms ease-in-out, transform 400ms ease-in-out;
  font-family: 'Mountains of Christmas', cursive;
  padding: 0.75em 1.4em;
  cursor: pointer;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  background-color: #378b29;
  border: 0;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  font-size: 1rem;
  &:hover {
    box-shadow: inset 0 -0.6em 0 -0.5em rgba(0, 0, 0, 0.17);
    background-color: #1b4514;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #c6bdb6;
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const PrimaryButton = ({
  children,
  ...otherProps
}: ComponentPropsWithoutRef<any & HTMLButtonElement>) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};
