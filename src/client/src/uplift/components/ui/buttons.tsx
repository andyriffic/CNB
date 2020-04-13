import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import styled from 'styled-components';
import tinyColor from 'tinycolor2';

const StyledButton = styled.button`
  transition: background-color 200ms ease-in-out, transform 200ms ease-in-out;
  padding: 0.75em 1.4em;
  cursor: pointer;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  background-color: #f7b004;
  border: 0;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  font-size: 0.7rem;
  &:hover {
    box-shadow: inset 0 -0.6em 0 -0.5em rgba(0, 0, 0, 0.17);
    background-color: ${tinyColor('#F7B004')
      .darken(15)
      .toString()};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: ${tinyColor('#F7B004')
      .darken(15)
      .toString()};
    color: rgba(255, 255, 255, 0.6);
  }
`;

type Props = {
  children: ReactNode;
  styleType?: 'primary' | 'secondary';
} & HTMLButtonElement;

export const Button = ({
  children,
  styleType,
  ...otherProps
}: ComponentPropsWithoutRef<any & Props>) => {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
};
