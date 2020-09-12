import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ANIMATION_DURATION_MILLISECONDS = 500;

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
transition: all ${ANIMATION_DURATION_MILLISECONDS}ms linear;
`;

type Props = {
  children: React.ReactNode;
  position: RelativePosition;
  onMoveComplete?: () => void;
};

export const PositionedArea = ({
  children,
  position,
  onMoveComplete,
}: Props) => {
  const originalPosition = useRef(position);

  useEffect(() => {
    if (
      onMoveComplete &&
      (originalPosition.current.left !== position.left ||
        originalPosition.current.right !== position.right ||
        originalPosition.current.top !== position.top ||
        originalPosition.current.bottom !== position.bottom)
    ) {
      originalPosition.current = position;
      setTimeout(() => {
        onMoveComplete();
      }, ANIMATION_DURATION_MILLISECONDS);
    }
  }, [position]);

  return <Container {...position}>{children}</Container>;
};
