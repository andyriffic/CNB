import React, { useEffect, useRef, useState, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import rockImage from './move_rock.png';
import paperImage from './move_paper.png';
import scissorsImage from './move_scissors.png';
import mysteryImage from './move_mystery.png';
import { bounceAnimation } from '../../../uplift/components/animations';

const Container = styled.div`
  width: 10vw;
  height: 10vw;
`;

const MoveIcon = styled.div<{ moving: boolean }>`
  font-size: 3rem;
  color: ${({ theme }) => theme.color.text01};
  ${({ moving }) =>
    moving &&
    css`
      animation: ${bounceAnimation} 500ms 0s 3;
    `}
`;

const MoveImage = styled.img`
  width: 100%;
  height: 100%;
`;

const dummyThemeMoves: { [key: string]: ReactNode } = {
  A: <MoveImage src={rockImage} />,
  B: <MoveImage src={paperImage} />,
  C: <MoveImage src={scissorsImage} />,
};

type Props = {
  moveId?: string;
  revealed?: boolean;
  onComplete?: () => void;
};

export const PlayerMove = ({ moveId, revealed = false, onComplete }: Props) => {
  const revealTimeout = useRef<NodeJS.Timeout | undefined>();
  const [revealing, setRevealing] = useState(false);
  const [showMove, setShowMove] = useState(false);

  useEffect(() => {
    if (revealed && !revealTimeout.current) {
      setRevealing(true);
      revealTimeout.current = setTimeout(() => {
        setRevealing(false);
        setShowMove(true);
      }, 1500);
    } else {
      setShowMove(false);
    }
  }, [revealed]);

  useEffect(() => {
    if (showMove) {
      setTimeout(() => {
        onComplete && onComplete();
        revealTimeout.current = undefined;
      }, 2000);
    }
  }, [showMove]);

  return (
    <Container>
      <MoveIcon moving={revealing}>
        {(showMove && (moveId && dummyThemeMoves[moveId])) || (
          <MoveImage src={mysteryImage} />
        )}
      </MoveIcon>
    </Container>
  );
};
