import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
    );
  }
  .front {
    display: block;
    position: relative;
    padding: 12px 42px;
    border-radius: 12px;
    color: white;
    background: hsl(345deg 100% 47%);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  &:hover {
    filter: brightness(110%);
  }
  &:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  &:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
  &:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  &:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

type Props = {
  children: ReactNode;
} & HTMLButtonElement;

export function PressableButton({
  children,
  ...otherProps
}: ComponentPropsWithoutRef<any & Props>): JSX.Element {
  return (
    <Container {...otherProps}>
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">{children}</span>
    </Container>
  );
}
