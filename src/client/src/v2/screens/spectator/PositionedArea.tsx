import React from 'react';
import styled from 'styled-components';

export type RelativePosition = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};

const Container = styled.div<RelativePosition>`
  position: absolute;
  will-change: top, left, bottom, right;
  ${({ top }) => top !== undefined && `top: ${top}%;`}
  ${({ left }) => left !== undefined && `left: ${left}%;`}
  ${({ bottom }) => bottom !== undefined && `bottom: ${bottom}%;`}
  ${({ right }) => right !== undefined && `right: ${right}%;`}
  transition: all 500ms linear;
`;

type Props = {
  children: React.ReactNode;
  position: RelativePosition;
};

export const PositionedArea = ({ children, position }: Props) => {
  return <Container {...position}>{children}</Container>;
};
