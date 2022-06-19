import { ComponentPropsWithoutRef, ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  padding: 0.3em 1.2em;
  margin: 0 0.1em 0.1em 0;
  border: 0.16em solid rgba(255, 255, 255, 0);
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  color: #ffffff;
  background-color: #f14ebd;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  font-size: 2rem;
  text-transform: uppercase;

  &:hover {
    border-color: rgba(255, 255, 255, 1);
  }
`;

type Props = {
  children: ReactNode;
} & HTMLButtonElement;

export function UiButton({
  children,
  ...otherProps
}: ComponentPropsWithoutRef<any & Props>) {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
}
