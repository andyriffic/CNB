import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { fadeOutUpAnimation } from '../../../../uplift/components/animations';

const ANIMATION_DURATION_MS = 2500;

const Container = styled.div`
  text-align: center;
  animation: ${fadeOutUpAnimation} ${ANIMATION_DURATION_MS}ms 1 forwards;
`;

type Props = {
  points: number;
};

export function PlayerBonusPoints({ points }: Props): JSX.Element | null {
  const [show, setShow] = useState(false);
  const previousPoints = useRef(points);

  useEffect(() => {
    if (points !== previousPoints.current) {
      previousPoints.current = points;
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, ANIMATION_DURATION_MS);
    }
  }, [points]);

  return show ? <Container>🎉</Container> : null;
}
